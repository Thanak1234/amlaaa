Ext.define('UI.store.forms.SubmissionLog', {
    extend: 'Ext.data.Store',    
    alias: 'store.submissionLog',         
    model: 'UI.model.forms.SubmissionLog',
    pageSize: 100,
    autoLoad: false,
    proxy: {
    	type: 'rest',        
    	url: Configuration.baseUrl + 'api/v1/submission/logs'
    }
});