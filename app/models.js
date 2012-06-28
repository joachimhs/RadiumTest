RadiumApp.ActivityCategory = DS.Model.extend({
    id: DS.attr('string'),
    activities: DS.hasMany('RadiumApp.Activity'),
    activityGroups: DS.hasMany('RadiumApp.ActivityCategory'),
    isExpanded: false,
    kind: DS.attr('string'),
    tag: DS.attr('string'),
    date: DS.attr('date'),

    categoryIsGrouped: function() {
        return this.get('activities').get('length') >= 2;
    }.property('activities').cacheable(),

    numActivities: function() {
        return this.get('activities').get('length');
    }.property('activities').cacheable(),

    isDatebook: function() {
        return this.get('id') === 'datebook';
    }.property('id').cacheable(),

    formattedDate: function() {
        return this.get('date').format("mm/dd/yyyy");
    }.property(),

    addActivityGroup: function(activityGroup) {
        this.get('activityGroups').pushObject(activityGroup);
        activityGroup.set('parentGroup', this);
    },

    findOrAddActivityGroup: function(id, kind, tag) {
        var foundActivityGroup = null;

        this.get('activityGroups').forEach(function(activityGroup) {
            if (activityGroup.get('id') === id) {
                foundActivityGroup = activityGroup;
                return;
            }
        });

        if (foundActivityGroup == null) {
            foundActivityGroup = RadiumApp.ActivityCategory.createRecord({'id': id, activities: []});
            foundActivityGroup.set('kind', kind);
            foundActivityGroup.set('tag', tag);
            this.addActivityGroup(foundActivityGroup);
        }

        return foundActivityGroup;
    }
});

RadiumApp.Activity = DS.Model.extend({
    id: DS.attr('number'),
    created_at: DS.attr('date'),
    updated_at: DS.attr('date'),
    kind: DS.attr('string'),
    tag: DS.attr('string'),
    scheduled: DS.attr('string'),
    timestamp: DS.attr('date'),
    owner: DS.attr('string'),
    reference: DS.belongsTo('RadiumApp.Reference', { embedded: true }),

    headlineTitle: function() {
        var headline = this.get('kind').replace(/_/g,' ') + ' ' + this.get('tag').replace(/_/g,' ') + ' ' + this.getFormattedTime('timestamp');

        if (this.get('reference')){
            headline += ': ' + this.get('reference').get('referenceHeadline');
        }

        return headline;

    }.property(['kind', 'tag', 'created_at']).cacheable(),

    headlineIcon: function() {
        if (this.get('reference') && this.get('reference').get('icon')) {
            return this.get('reference').get('icon');
        }

        else return 'icon-circle-arrow-right';
    }.property('reference'),

    getFormattedDate: function(field) {
        return this.get(field).format("mm/dd/yyyy");
    },

    getFormattedTime: function(field) {
        return this.get(field).format("HH:MM");
    },

    timestampGroupBy: function() {
        return this.get('timestamp').format("yyyymmdd");
    }.property('timestamp').cacheable(),

    timestampSort: function() {
        return this.get('timestamp').format("yyyymmddhhMMss");
    }.property('timestamp').cacheable()
});

RadiumApp.Reference = DS.Model.extend({
    todo: DS.belongsTo('RadiumApp.Todo', { embedded: true }),
    campaign: DS.belongsTo('RadiumApp.Campaign', { embedded: true }),
    phone_call: DS.belongsTo('RadiumApp.PhoneCall', { embedded: true }),
    sms: DS.belongsTo('RadiumApp.SMS', { embedded: true }),
    contact: DS.belongsTo('RadiumApp.Contact', { embedded: true }),
    email: DS.belongsTo('RadiumApp.Email', { embedded: true }),
    invitation: DS.belongsTo('RadiumApp.Invitation', { embedded: true }),
    meeting: DS.belongsTo('RadiumApp.Meeting', { embedded: true }),
    call_list: DS.belongsTo('RadiumApp.CallList', { embedded: true }),
    deal: DS.belongsTo('RadiumApp.Deal', { embedded: true }),
    note: DS.belongsTo('RadiumApp.Note', { embedded: true }),

    referenceHeadline: function() {
        if (this.get('todo')) {
            return this.get('todo').get('description');
        }
        if (this.get('campaign')) {
            return this.get('campaign').get('name');
        }
        if (this.get('phone_call')) {
            return this.get('phone_call').get('outcome');
        }
        if (this.get('sms')) {
            return this.get('sms').get('message');
        }
        if (this.get('contact')) {
            return this.get('contact').get('display_name');
        }
        if (this.get('email')) {
            return this.get('email').get('subject');
        }
        if (this.get('invitation')) {
            return this.get('invitation').get('state');
        }
        if (this.get('meeting')) {
            return this.get('meeting').get('topic') + ' at ' + this.get('meeting').get('location');
        }
        if (this.get('call_list')) {
            return this.get('call_list').get('description');
        }
        if (this.get('deal')) {
            return this.get('deal').get('description');
        }
        if (this.get('note')) {
            return this.get('note').get('message');
        }
    }.property(),

    icon: function() {
        if (this.get('todo')) {
            return this.get('todo').get('icon');
        }
        if (this.get('campaign')) {
            return this.get('campaign').get('icon');
        }
        if (this.get('phone_call')) {
            return this.get('phone_call').get('icon');
        }
        if (this.get('sms')) {
            return this.get('sms').get('icon');
        }
        if (this.get('contact')) {
            return this.get('contact').get('icon');
        }
        if (this.get('email')) {
            return this.get('email').get('icon');
        }
        if (this.get('invitation')) {
            return this.get('invitation').get('icon');
        }
        if (this.get('meeting')) {
            return this.get('meeting').get('icon');
        }
        if (this.get('call_list')) {
            return this.get('call_list').get('icon');
        }
        if (this.get('deal')) {
            return this.get('deal').get('icon');
        }
        if (this.get('note')) {
            return this.get('note').get('icon');
        }
    }.property()
});

RadiumApp.Todo = DS.Model.extend({
    "id": DS.attr('number'),
    "created_at": DS.attr('date'),
    "updated_at": DS.attr('date'),
    "kind": DS.attr('string'),
    "description": DS.attr('string'),
    "finish_by": DS.attr('date'),
    "finished": DS.attr('boolean'),
    "icon": "icon-tasks"
});

RadiumApp.Campaign = DS.Model.extend({
    "id": DS.attr('number'),
    "created_at": DS.attr('date'),
    "updated_at": DS.attr('date'),
    "name": DS.attr('string'),
    "description": DS.attr('string'),
    "ends_at": DS.attr('date'),
    "currency": DS.attr('string'),
    "target": DS.attr('number'),
    "public": DS.attr('boolean'),
    "icon": "icon-time"
});

RadiumApp.PhoneCall = DS.Model.extend({
    "id": DS.attr('number'),
    "created_at": DS.attr('date'),
    "updated_at": DS.attr('date'),
    "outcome": DS.attr('string'),
    "kind": DS.attr('string'),
    "source": DS.attr('string'),
    "started_at": DS.attr('date'),
    "ended_at": DS.attr('date'),
    "transcription_url": DS.attr('string'),
    "recording_url": DS.attr('string'),
    "icon": "icon-user"
});

RadiumApp.SMS = DS.Model.extend({
    "id": DS.attr('number'),
    "created_at": DS.attr('date'),
    "updated_at": DS.attr('date'),
    "message": DS.attr('string'),
    "sent_at": DS.attr('date'),
    "icon": "icon-user"
});

RadiumApp.Contact = DS.Model.extend({
    "id": DS.attr('number'),
    "created_at": DS.attr('date'),
    "updated_at": DS.attr('date'),
    "name": DS.attr('string'),
    "display_name": DS.attr('string'),
    "contacted_at": DS.attr('date'),
    "became_lead_at": DS.attr('date'),
    "became_prospect_at": DS.attr('date'),
    "became_opportunity_at": DS.attr('date'),
    "became_customer_at": DS.attr('date'),
    "became_dead_end_at": DS.attr('date'),
    "status": DS.attr('string'),
    "public": DS.attr('boolean'),
    "source": DS.attr('string'),
    "icon": "icon-user"
});

RadiumApp.Email = DS.Model.extend({
    "id": DS.attr('number'),
    "created_at": DS.attr('date'),
    "updated_at": DS.attr('date'),
    "subject": DS.attr('string'),
    "message": DS.attr('string'),
    "sent_at": DS.attr('date'),
    "icon": "icon-envelope"
});

RadiumApp.Invitation = DS.Model.extend({
    "id": DS.attr('number'),
    "created_at": DS.attr('date'),
    "updated_at": DS.attr('date'),
    "state": DS.attr('string'),
    "hash_key": DS.attr('string'),
    "meeting": DS.attr('number'),
    "icon": "icon-tag"
});

RadiumApp.Meeting = DS.Model.extend({
    "id": DS.attr('number'),
    "created_at": DS.attr('date'),
    "updated_at": DS.attr('date'),
    "topic": DS.attr('string'),
    "location": DS.attr('string'),
    "starts_at": DS.attr('date'),
    "ends_at": DS.attr('date'),
    "icon": "icon-briefcase"
});

RadiumApp.CallList = DS.Model.extend({
    "id": DS.attr('number'),
    "created_at": DS.attr('date'),
    "updated_at": DS.attr('date'),
    "description": DS.attr('string'),
    "finish_by": DS.attr('date'),
    "icon": "icon-user"
})

RadiumApp.Deal = DS.Model.extend({
    "id": DS.attr('number'),
    "created_at": DS.attr('date'),
    "updated_at": DS.attr('date'),
    "description": DS.attr('string'),
    "close_by": DS.attr('date'),
    "state": DS.attr('string'),
    "public": DS.attr('boolean'),
    "icon": "icon-ok"
});

RadiumApp.Note = DS.Model.extend({
    "id": DS.attr('number'),
    "created_at": DS.attr('date'),
    "updated_at": DS.attr('date'),
    "message": DS.attr('string'),
    "icon": "icon-list"
});

RadiumApp.Activity.reopenClass({
    url: '/feed.json'
});

RadiumApp.KindModel = Ember.Object.extend({
    value: null,
    label: null
});