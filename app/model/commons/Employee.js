Ext.define('UI.model.commons.Employee', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        { name: 'id', type: 'string' },
        { name: 'login', type: 'string' },
        { name: 'empNo', type: 'string' },
        { name: 'position', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'phone', type: 'string' },
        { name: 'ext', type: 'string' },
        { name: 'deptName', type: 'string' },
        { name: 'firstName', type: 'string' },
        { name: 'lastName', type: 'string' },
        { name: 'status', type: 'string' }
     
    ]
});
