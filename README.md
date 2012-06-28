Implementation Details
======================

The application runs on the latest published versions of Ember and Ember Data, both compiled from master on the 27th og June 2012. 

feed.json and Ember Data
------------------------
Feed.json is read when the application enters the state indexState. This feed consists of a list of activities with a sideloaded reference property. 

When feed.json is properly loaded the contents is grouped and placed insie the RadiumApp.ActivityCategoryController. This controller will group the activities by date, kind and tag, the logic for which is located inside the addActivity function. This controller is also used to filter the contents based on a user-initiated selection. 

Models
------
The application consists of a couple of central model objects. RadiumApp.Activity represents Activities as they are loaded from the feed.json file. RadumApp.Activity is linked to a single reference object, which in turn is linked to one of the referenced data types. 

The model hierarchy is set up this way in order to support using Ember Data for the complete data-fetching and storage facilities. 

Activities are manually grouped into RadiumApp.ActivityCategory models. This model is used to group activities into dates, kind and tags. A more permanent solution might be to extend Ember Data to build in group-by functionality, or to build in extra controllers that can handle this grouping more seamlessly that it does today. 

To be able to link RadiumApp.Activity models with the referenced object via the reference property, I have implemented a small "hack" into the Ember Data Adapter on lines 11-15 inside main.js in order to assign each reference a unique ID. This method would not work when fetching new activities from feed.json. A more robust way to handle this might be to use the referenced objects ID as the reference ID. 

There is probably a better way to implement link between the Activity and its referenced object, but I couldn't find any obvious ways to implement this with the current state of Ember Data. 

Views and Templates
-------------------

There is a seperate view for each type of view. Each view is rendered using a seperate Handlebars Template. 

As it stands now, every template is defined within the app.js file using the Ember.TEMPLATE['templateName'] = { ...} notation. The reason they are in app.js is to be able to support Firefox, as Firefox fails to load the templates before the JavaScript code if they are placed within index.html. 

Hopefully, Ember will support putting the templates inside their own files in the long run, which is a feature that SproutCore supports, where the view can reference a file name where the Template code is contained. 

Controllers
-----------
The Application is built up using three controllers. One to keep and sort the Activities as they are loaded from the feed.json file, one to store the different types of kinds that the application can filter on, as well as a controller to keep each group of activity. 

The RadiumApp.ActivityCategoryController supports filtering via the filterString property and the filterStringObserver observer-method. This could probably be done via the standard filtering capabilities of the ArrayController, but I didn't have time to investigate if filtering goes hand-in-hand with the new sorting functionality of the new SortableMixin. 

Twitter Bootstrap
------------------
As it stands right now, the application looks sort of half-decent. I am unfamiliar with Twitter Bootstrap, and I did not have time to read up and integrate Twitter Bootstrap for more than the actual icons for the activity items. After a rough read at the Twitter Bootstrap website, integration seems fairly straight forward though. 

Endless Scrolling
-----------------

I didn't have time to finish the endless scrolling functionality for this version. 