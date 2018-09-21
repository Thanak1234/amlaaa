Ext.define("UI.view.forms.admin.user.UserForm", {
    extend: "UI.view.forms.AbstractForm",
    xtype: 'form-user',
    requires: [
        'UI.view.forms.admin.user.UserFormController',
        'UI.view.forms.admin.user.UserFormModel'
    ],
    controller: 'form-user',
    scrollable: true,
    viewModel: 'form-user',  
    initComponent: function() {
        var me = this;
        me.callParent(arguments);
    },

    buildInfoItems: function(parent) {
        return [];
    },
});