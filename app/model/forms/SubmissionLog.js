Ext.define('UI.model.forms.SubmissionLog', {
    extend: 'Ext.data.Model',
    idProperty: 'id',    
    fields: [
        { name: 'id', type: 'string' },
        { name: 'submissionId', type: 'string' },
        { name: 'action', type: 'string' },
        { name: 'actionDate', type: 'date' },
        { name: 'actionBy', type: 'string' },
        { name: 'status', type: 'string' },
        { name: 'description', type: 'string' }
    ]
});