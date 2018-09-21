Ext.define('UI.view.forms.admin.user.UserList', {
    extend: 'UI.view.forms.AbstractGrid',
    xtype: 'form-user-list',
    controller: 'form-user-list',
    viewModel: 'form-user-list',
    closable:false,
    requires: [
        'UI.view.forms.admin.user.UserFormController'
    ],
    listeners: {
        rowdblclick: 'onRowDoubleClicked'
    },
    plugins: [ 
        'gridfilters',
    ],
    initComponent: function() {
        var me = this;
        me.initStore();
        me.buildColumns();
        me.callParent(arguments);
    },
    initStore: function() {
        var me = this;
        me.store = {
            type: 'userForm'
        }
    },
    buildColumns:function(){ 
		var me = this;
		me.columns = [{
            xtype: 'rownumberer'
        },  {
            text		: 'NAME',
            dataIndex	: 'fullName',
            width 		: '24%',
            menuDisabled: true,
            sortable	: true,

        }, {
            text		: 'EMAIL',
            dataIndex	: 'email',
            width 		: '24%',
            menuDisabled: true,
            sortable	: true
        }, {
            text		: 'LOGIN NAME',
            dataIndex	: 'loginName',
            width 		: '24%',
            menuDisabled: true,
            sortable	: true
        }, {
            text		: 'STATUS',
            dataIndex	: 'status',
            width 		: '24%',
            menuDisabled: true,
            sortable	: true
        }];
	}
});