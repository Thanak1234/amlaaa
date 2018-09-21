Ext.define('UI.view.form.SIR.SIRListController', {
    extend: 'UI.view.form.AbstractGridController',
    alias: 'controller.form-sir-list',
    actionUrl: Configuration.baseUrl + 'api/v1/sirform',
    onVoidClicked: function(el) {
        var me = this,
        viewmodel = me.getViewModel(),
        selection = viewmodel.get('selectedRecord'),
        id = selection.getId();
        Ext.MessageBox.show({
            title: 'Confirmation',
            msg: 'Do you want to void this record?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.WARNING,
            fn: function (bt) {
                if(bt == 'yes') {
                    me.getView().mask("Voiding...");
                    Ext.Ajax.request({
                        method: 'GET',
                        url: Configuration.baseUrl + 'api/v1/sirform/void/' + id,
                        success: function(response, request) {  
                            me.onRefreshClicked();                          
                            me.getView().unmask();
                        },
                        failure: function(response, request) {
                            me.getView().unmask();
                        }
                    });
                }
            }
        });
    },
    onReviewClicked: function(el) {
        var me = this,
        viewmodel = me.getViewModel(),
        selection = viewmodel.get('selectedRecord'),
        id = selection.getId();
        Ext.MessageBox.show({
            title: 'Confirmation',
            msg: 'Do you want to make record as reviewed?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.WARNING,
            fn: function (bt) {
                if(bt == 'yes') {
                    me.getView().mask("Marking as reviewed...");
                    Ext.Ajax.request({
                        method: 'GET',
                        url: Configuration.baseUrl + 'api/v1/sirform/reviewed/' + id,
                        success: function(response, request) {  
                            me.onRefreshClicked();                          
                            me.getView().unmask();
                        },
                        failure: function(response, request) {
                            me.getView().unmask();
                        }
                    });
                }
            }
        });
    },
    onCopyToSTRClicked: function(el) {
        var me = this,
        viewmodel = me.getViewModel(),
        selection = viewmodel.get('selectedRecord'),
        id = selection.getId();
        Ext.MessageBox.show({
            title: 'Confirmation',
            msg: 'Do you want to copy this record as STR?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.WARNING,
            fn: function (bt) {
                if(bt == 'yes') {
                    me.getView().mask("Copying...");
                    Ext.Ajax.request({
                        method: 'GET',
                        url: Configuration.baseUrl + 'api/v1/sirform/copy/' + id,
                        success: function(response, request) {  
                            me.onRefreshClicked();                          
                            me.getView().unmask();
                        },
                        failure: function(response, request) {
                            me.getView().unmask();
                        }
                    });
                }
            }
        });
    },
    onRemoveClicked: function(el) {
        var me = this,
        viewmodel = me.getViewModel(),
        selection = viewmodel.get('selectedRecord'),
        id = selection.getId();
        Ext.MessageBox.show({
            title: 'Confirmation',
            msg: 'Do you want to remove this record?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.WARNING,
            fn: function (bt) {
                if(bt == 'yes') {
                    me.getView().mask("Removing...");
                    Ext.Ajax.request({
                        method: 'GET',
                        url: Configuration.baseUrl + 'api/v1/sirform/delete/' + id,
                        success: function(response, request) {  
                            me.onRefreshClicked();                          
                            me.getView().unmask();
                        },
                        failure: function(response, request) {
                            me.getView().unmask();
                        }
                    });
                }
            }
        });
    },
    onNewClicked: function(el) {
        var me = this;
        me.routeTo('SIR Form (New Form)', 'form-sir', 'UI.view.forms.SIR.SIRForm', {
            state: 'new',
            record: null,
            mainCtlr: me
        });
    },
    onModifiedClicked: function(el) {
        var me = this,
        viewmodel = me.getViewModel(),
        selection = viewmodel.get('selectedRecord');
        var formNo = selection.get('sirNo');
        me.routeTo(Ext.String.format('SIR Form(Edit:{0})', formNo), ('modification-' + formNo.toLowerCase()), 'UI.view.forms.SIR.SIRForm', {
            state: 'edit',
            record: selection,
            readonly: false,
            mainCtlr: me
        });
    },
    onPreviewClicked: function(el) {
        var me = this,
        viewmodel = me.getViewModel(),
        selection = viewmodel.get('selectedRecord');
        var formNo = selection.get('sirNo');
        me.routeTo(Ext.String.format('SIR Form(View:{0})', formNo), ('preview-' + formNo.toLowerCase()), 'UI.view.forms.SIR.SIRForm', {
            state: 'view',
            record: selection,
            readonly: true,
            mainCtlr: me
        });
    },        
    onRowDoubleClicked: function(el) {
        this.onPreviewClicked(el);
    }
});