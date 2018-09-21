Ext.define('UI.store.forms.UserForm', {
    extend: 'Ext.data.Store',    
    alias: 'store.userForm',
    model: 'UI.model.forms.UserForm',
    pageSize: 25,
    autoLoad: true,
    remoteSort:true,
    remoteFilter:true,
    proxy: {
    	type: 'rest',        
    	url: Configuration.baseUrl + 'api/v1/userforms',
        reader: {
            type: 'json',
            rootProperty: 'records',
            totalProperty: 'totalRecords'
        }
    }
});