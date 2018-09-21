Ext.define('UI.model.forms.UserForm', {
    extend: 'Ext.data.Model',
    idProperty: 'id',    
    fields: [
        { name: 'id', type: 'string' },
        { name: 'fullName', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'loginName', type: 'string' },
        { name: 'status', type: 'string' }

    ]
});