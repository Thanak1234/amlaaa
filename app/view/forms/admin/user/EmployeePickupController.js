Ext.define('UI.view.forms.admin.user.EmployeePickupController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employeepickup',
    onEmployeePickupChanged: function (queryPlan, eOpts) {
        let me = this,
        v = me.getView();
        if (!queryPlan.query) {
            queryPlan.query = v.rawValue;
        }
    }
});
