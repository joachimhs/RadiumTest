RadiumApp.router = Ember.Router.create({
    rootElement: '#emberArea',
    initialState: 'indexState',

    indexState: Ember.ViewState.extend({
        enter: function(sm) {
            this._super(sm);

            if (window.console) console.log('enter: /');

            var activities = RadiumApp.store.findAll(RadiumApp.Activity);
            RadiumApp.ActivityListController.set('content', activities);


        },

        view: Ember.View.extend({
            elementId: 'activityMainArea',
            templateName: 'activityViewtemplate',
            contentBinding: 'RadiumApp.ActivityCategoryController.arrangedContent'
        })
    })
});

RadiumApp.routes = Em.Object.create({
	currentRoute: null,
	
	gotoRoute: function(routeParams) {
		if (window.console) console.log('HS.routes gotoRoute. page: ' + routeParams.page + " subpage: " + routeParams.subpage + " id: " + routeParams.id);

        RadiumApp.router.goToState('indexState');
	}
});

SC.routes.add(":page", RadiumApp.routes, 'gotoRoute');
SC.routes.add(":page/:subpage/:id", RadiumApp.routes, 'gotoRoute');
SC.routes.add(":page/:id", RadiumApp.routes, 'gotoRoute');