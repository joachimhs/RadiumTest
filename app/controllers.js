RadiumApp.ActivityCategoryController = Ember.ArrayController.create({
    content: [],
    sortAscending: false,
    sortProperties: ['id'],
    filterString: null,

    filterStringObserver: function() {
        var filterString = this.get('filterString');

        var filteredContent = RadiumApp.ActivityListController.get('arrangedContent');

        if (filterString != null) {
            if (filterString.get('value')) {
                filterString = filterString.get('value');
            }
            filteredContent = filteredContent.filterProperty('kind', filterString);
        }

        this.set('content', []);

        filteredContent.forEach(function(activity) {
            RadiumApp.ActivityCategoryController.addActivity(activity);
        });
    }.observes('filterString'),

    addActivity: function (activity) {
        var foundActivityDate = null;

        this.get('content').forEach(function(activityDate) {
            if (activityDate.get('id') === activity.get('timestampGroupBy')) {
                foundActivityDate = activityDate;
            }
        });

        if (foundActivityDate == null) {
            foundActivityDate = RadiumApp.ActivityCategory.createRecord({'id': activity.get('timestampGroupBy'), activities: []});
            foundActivityDate.set('date', activity.get('timestamp'));
            this.get('content').pushObject(foundActivityDate);

            foundActivityDate.findOrAddActivityGroup('datebook');
            foundActivityDate.findOrAddActivityGroup('historical');
        }

        if (activity.get('tag') === 'scheduled_for') {
            var datebookGroup = foundActivityDate.findOrAddActivityGroup('datebook');
            var kindTagGroup = datebookGroup.findOrAddActivityGroup(activity.get('kind'), activity.get('kind'), activity.get('tag'));
            kindTagGroup.get('activities').pushObject(activity);
        } else {
            var historicalGroup = foundActivityDate.findOrAddActivityGroup('historical');
            var kindTagGroup = historicalGroup.findOrAddActivityGroup(activity.get('kind') + ' ' + activity.get('tag'), activity.get('kind'), activity.get('tag'));
            kindTagGroup.get('activities').pushObject(activity);
        }
    }
});

RadiumApp.KindListController = Ember.ArrayController.create({
    content: [],

    init: function() {
        this.get('content').pushObject(RadiumApp.KindModel.create({"value": "call_list", "label": "Call List"}));
        this.get('content').pushObject(RadiumApp.KindModel.create({"value": "campaign", "label": "Campaign"}));
        this.get('content').pushObject(RadiumApp.KindModel.create({"value": "contact", "label": "Contact"}));
        this.get('content').pushObject(RadiumApp.KindModel.create({"value": "deal", "label": "Deal"}));
        this.get('content').pushObject(RadiumApp.KindModel.create({"value": "email", "label": "Email"}));
        this.get('content').pushObject(RadiumApp.KindModel.create({"value": "invitation", "label": "Invitation"}));
        this.get('content').pushObject(RadiumApp.KindModel.create({"value": "meeting", "label": "Meeting"}));
        this.get('content').pushObject(RadiumApp.KindModel.create({"value": "note", "label": "Note"}));
        this.get('content').pushObject(RadiumApp.KindModel.create({"value": "phone_call", "label": "Phone call"}));
        this.get('content').pushObject(RadiumApp.KindModel.create({"value": "sms", "label": "SMS"}));
        this.get('content').pushObject(RadiumApp.KindModel.create({"value": "todo", "label": "Todo"}));
    }
})

RadiumApp.ActivityListController = Ember.ArrayController.create({
    content: [],
    sortAscending: false,
    sortProperties: ['timestampSort', 'tag', 'kind'],

    groupActivities: function() {
        var content = this.get('content');
        content.forEach(function(activity) {
            RadiumApp.ActivityCategoryController.addActivity(activity);
        })
    }
});