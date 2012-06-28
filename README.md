Implementation Details
======================

feed.json and Ember Data
------------------------
Feed.json is read when the application enters the state indexState. This feed consists of a list of activities with a sideloaded reference property. 

When feed.json is properly loaded the contents is grouped and placed insie the RadiumApp.ActivityCategoryController. This controller will group the activities by date, kind and tag, the logic for which is located inside the addActivity function. This controller is also used to filter the contents based on a user-initiated selection. 

Models
------
The application consists of a couple of central model objects. RadiumApp.Activity represents Activities as they are loaded from the feed.json file. RadumApp.Activity is linked to a single reference object, which in turn is linked to one of the referenced data types. 

The model hierarchy is set up this way in order to support using Ember Data for the complete data-fetching and storage facilities. 

Activities are grouped into RadiumApp.ActivityCategory models. This model is used to group activities into dates, kind and tags. 

Views and Templates
-------------------

There is a seperate view for each type of view. Each view is rendered using a seperate Handlebars Template

Controllers
-----------
The Application is built up using three controllers. One to keep and sort the Activities as they are loaded from the feed.json file, one to store the different types of kinds that the application can filter on, as well as a controller to keep each group of activity. 