//This creates the namespace for our Ember application. In this case HS
RadiumApp = Ember.Application.create({
	ready: function() {
		this._super();
		
		//var frontPages = HS.store.findAll(HS.PageModel);
		//HS.PagesController.set('roots',frontPages);
	}
});

//Removing the Camelcase-to-dash convention from Ember Data
DS.Model.reopen({
  namingConvention: {
	keyToJSONKey: function(key) {
	  return key;
	},

	foreignKey: function(key) {
	  return key;
	}
  }
});

Ember.TEMPLATES['activityViewtemplate'] = Ember.Handlebars.compile('' +
    '{{view Ember.Select classNames="floatRight" viewName="Filter" contentBinding="RadiumApp.KindListController" prompt="Filter by Kind" selectionBinding="RadiumApp.ActivityCategoryController.filterString" optionLabelPath="content.label" optionValuePath="content.value"}}<br />' +
    '{{#each content}}' +
        '<div class="activityDateContent">' +
            '<h1>{{formattedDate}}</h1>' +
            '{{#each activityGroups}}' +
                '{{view RadiumApp.fistLevelActivityGroupView contentBinding="this"}}' +
            '{{/each}}' +
        '</div>' +
    '{{/each}}'
);

Ember.TEMPLATES['firstLevelActivityGroupTemplate'] = Ember.Handlebars.compile('' +
    '{{#if isDatebook}}' +
        '<div class="datebookContents">' +
            '{{#each activityGroups}}' +
                '{{view RadiumApp.activityGroupDatebookView contentBinding="this"}}' +
            '{{/each}}' +
        '</div>' +
    '{{else}}' +
        '<div class="historicalContents">' +
            '{{#each activityGroups}}' +
                '{{view RadiumApp.activityGroupHistoricalView contentBinding="this"}}' +
            '{{/each}}' +
        '</div>' +
    '{{/if}}'
);

Ember.TEMPLATES['activityGroupDatebookTemplate'] = Ember.Handlebars.compile('' +
    '{{#if categoryIsGrouped}}' +
        '{{view RadiumApp.datebookGroupedActivityView contentBinding="view.content"}}' +
    '{{else}}' +
        '{{#each activities}}' +
            '<i {{bindAttr class="headlineIcon"}}></i> {{headlineTitle}}<br />' +
        '{{/each}}' +
    '{{/if}}'
);

Ember.TEMPLATES['datebookGroupedActivityTemplate'] = Ember.Handlebars.compile('' +
    '{{view RadiumApp.datebookGroupedActivityHeadlineView contentBinding="view.content"}}' +

    '{{#if isExpanded}}' +
        '{{#each activities}}' +
            '<div><span style="margin-left: 24px;"></span> <i {{bindAttr class="headlineIcon"}}></i> {{headlineTitle}}</div>' +
        '{{/each}}' +
    '{{/if}}'
);

Ember.TEMPLATES['datebookGroupedActivityHeadlineTemplate'] = Ember.Handlebars.compile('' +
    '{{#if isExpanded}}' +
        '<span class="downArrow"></span>' +
    '{{else}}' +
        '<span class="rightArrow"></span>' +
    '{{/if}}' +
    ' {{numActivities}} {{kind}}s'
);

Ember.TEMPLATES['activityGroupHistoricalTemplate'] = Ember.Handlebars.compile('' +
    '{{#if categoryIsGrouped}}' +
        '{{numActivities}} {{kind}}s {{tag}}<br />' +
    '{{else}}' +
        '{{#each activities}}' +
            '<i {{bindAttr class="headlineIcon"}}></i> {{headlineTitle}}<br />' +
        '{{/each}}' +
    '{{/if}}'
);


