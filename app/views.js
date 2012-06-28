RadiumApp.radiumMainView = Ember.View.extend({
    elementId: 'radiumMainArea',
    templateName: 'radiumMainTemplate'
});

RadiumApp.activityGroupDatebookView = Ember.View.extend({
    templateName: 'activityGroupDatebookTemplate'
});

RadiumApp.datebookGroupedActivityView = Ember.View.extend({
    templateName: 'datebookGroupedActivityTemplate'
});

RadiumApp.datebookGroupedActivityHeadlineView = Ember.View.extend({
    templateName: 'datebookGroupedActivityHeadlineTemplate',
    classNames: ['hand'],

    click: function(evt) {
        this.get('content').set('isExpanded', !this.get('content').get('isExpanded'));
    }
});

RadiumApp.activityGroupHistoricalView = Ember.View.extend({
    templateName: 'activityGroupHistoricalTemplate'
});

RadiumApp.fistLevelActivityGroupView = Ember.View.extend({
    templateName: 'firstLevelActivityGroupTemplate'
});

RadiumApp.nodeArrowView = Ember.View.extend({
    templateName: 'nodeArrowTemplate'
});