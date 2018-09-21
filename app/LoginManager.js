/**
 * This class manages the login process.
 */
Ext.define('UI.LoginManager', {
    config: {
        /**
         * @cfg {Class} model
         * The model class from which to create the "user" record from the login.
         */
        model: null,

        /**
         * @cfg {Ext.data.Session} session
         */
        session: null
    },

    constructor: function (config) {
        this.initConfig(config);
    },

    applyModel: function(model) {
        return model && Ext.data.schema.Schema.lookupEntity(model);
    },

    login: function(options) {
        Ext.Ajax.request({
            url: Configuration.baseUrl +  'auth/login',
            method: 'POST',
            jsonData: options.data,
            scope: this,
            callback: this.onLoginReturn,
            original: options
        });
    },
    
    onLoginReturn: function(options, success, response) {
        options = options.original;
        var session = this.getSession();        
        if (success) {
            var username = options.data.username;
            var auth = JSON.parse(response.responseText);
            setCookie('token', auth.token, 1);
            setCookie('username', username, 1);
            Configuration.token = auth.token;
            Configuration.username = username;
            Ext.callback(options.success, options.scope, {});
        } else {
            Ext.callback(options.failure, options.scope, [response]);
        }        
    }
});
