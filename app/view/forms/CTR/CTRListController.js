Ext.define('UI.view.form.CTR.CTRListController', {
    extend: 'UI.view.form.AbstractGridController',
    alias: 'controller.form-ctr-list',
    actionUrl: Configuration.baseUrl + 'api/v1/ctrform',
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
                        url: Configuration.baseUrl + 'api/v1/ctrform/void/' + id,
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
                        url: Configuration.baseUrl + 'api/v1/ctrform/delete/' + id,
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
        me.routeTo('Threshold Recording (New Form)', 'form-ctr', 'UI.view.forms.CTR.CTRForm', {
            state: 'new',
            record: null,
            mainCtlr: me
        });
    },
    onModifiedClicked: function(el) {
        var me = this,
        viewmodel = me.getViewModel(),
        selection = viewmodel.get('selectedRecord');
        var formNo = selection.get('formNo');
        me.routeTo(Ext.String.format('Threshold Recording(Edit:{0})', formNo), ('modification-' + formNo.toLowerCase()), 'UI.view.forms.CTR.CTRForm', {
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
        var formNo = selection.get('formNo');
        me.routeTo(Ext.String.format('Threshold Recording(View:{0})', formNo), ('preview-' + formNo.toLowerCase()), 'UI.view.forms.CTR.CTRForm', {
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