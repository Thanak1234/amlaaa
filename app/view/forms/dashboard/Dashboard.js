Ext.define("UI.view.forms.dashboard.Dashboard", {
    extend: "UI.view.commons.UIForm",
    xtype: 'form-dashboard',
    controller: 'form-dashboard',    
    viewModel: 'form-dashboard', 
    title: 'Dashboard',
    iconCls: '',
    scrollable: true, 
    closable: false,    
    initComponent: function() {
        var me = this;
        me.callParent(arguments);
    },
    layout: 'fit',
    bodyPadding: 2,
    items: {    
        bodyStyle: "background-color: #404040; background-image:url(resources/images/background.jpeg) !important; background-repeat:no-repeat; background-position: center center;"
    }
});