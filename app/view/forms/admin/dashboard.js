Ext.define('UI.view.forms.admin.dashboard', {
    extend: 'Ext.tab.Panel',
    xtype: 'framed-tabs',
    
    frame: true,
    height: 300,
    defaults: {
        bodyPadding: 10,
        scrollable: true
    },
    items: [{
        title: 'User',
        xtype:'form-user-list'
    }, {
        title: 'Role',
        html:"Hello tab 1"
    },{
        title: 'Right',
        html:"Hello tab right"
    }],

});