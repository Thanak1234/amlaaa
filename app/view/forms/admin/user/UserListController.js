Ext.define('UI.view.forms.admin.user.UserListController', {
    extend: 'UI.view.form.AbstractGridController',
    alias: 'controller.form-user-list',
    actionUrl: Configuration.baseUrl + 'api/v1/userform',
    onNewClicked: function(el) {
        let me = this,
        view = me.getView();
        let win = Ext.create('UI.view.forms.admin.user.UserNewDialog', {
            animateTarget: el, 
            mainCtrl: me,
            mainView: view
        });
        win.show();
    },
    onModifiedClicked: function(el) {

    },

    onRowDoubleClicked: function(el) {
        this.onPreviewClicked(el);
    },

    clearData: function(form) {
        this.getReferences().empId.onClearClick();
    },

    onPreviewClicked: function(el) {
        let me = this,
            viewModel = me.getViewModel(),
            selection = viewModel.get('selectedRecord');
        let win = Ext.create('UI.view.forms.admin.user.UserNewDialog', {
            record: selection,
            readonly: true,
            mainCtlr: me
        });
        win.show();
    },

    onSaveClicked: function (el) {
        let me = this;
        viewmodel = me.getViewModel();
        let data = viewmodel.get('selectedEmployee').getData();
        let jsonData = {
            loginName: data.login,
            email: data.email,
            fullName: data.name
        };
        me.clearData();
        me.getView().mask("Saving...");
        Ext.Ajax.request({
            method: 'POST',
            url: Configuration.baseUrl + 'api/v1/user/save',
            jsonData: jsonData,
            success: function(response, request) {
                me.clearData();
                me.getView().unmask();
            },
            failure: function(response, request) {
                me.getView().unmask();
            }
        });
    }
});