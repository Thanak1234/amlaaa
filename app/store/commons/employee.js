Ext.define('UI.store.commons.Employee', {
    extend: 'Ext.data.Store',    
    alias: 'store.employee',         
    model: 'UI.model.commons.Employee',
    pageSize: 20,
    autoLoad: false,
    proxy: {
    	type: 'rest',        
    	url: Configuration.baseUrl + 'api/v1/employees',
        reader: {
            type: 'json',
            rootProperty: 'records',
            totalProperty: 'totalRecords'
        }
    }
});