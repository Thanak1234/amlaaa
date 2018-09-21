Ext.define('UI.view.forms.admin.user.UserFormController', {
    extend: 'UI.view.form.AbstractFormController',
    alias: 'controller.form-user',
    actionUrl: Configuration.baseUrl + 'api/v1/userform/save',
    init: function() {
        this.bindCtrFormNo();
        this.clearOthers();
    },
    clearData: function(form) {
        var me = this,
        view = me.getView(),
        viewmodel = view.getViewModel();    
    },

});