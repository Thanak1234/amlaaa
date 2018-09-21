Ext.define('UI.view.form.STR.STRListController', {
    extend: 'UI.view.form.AbstractGridController',
    alias: 'controller.form-str-list',
    actionUrl: Configuration.baseUrl + 'api/v1/strform',
    onModifiedClicked: function(el) {
        var me = this,
        viewmodel = me.getViewModel(),
        selection = viewmodel.get('selectedRecord');
        var formNo = selection.get('strNo');
        this.routeTo(Ext.String.format('STR Form(Edit:{0})', formNo), ('modification-' + formNo.toLowerCase()), 'UI.view.forms.STR.STRForm', {
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
        var formNo = selection.get('strNo');
        this.routeTo(Ext.String.format('STR Form(View:{0})', formNo), ('preview-' + formNo.toLowerCase()), 'UI.view.forms.STR.STRForm', {
            state: 'view',
            record: selection,
            readonly: true,
            mainCtlr: me
        });
    },        
    onRowDoubleClicked: function(el) {
        this.onPreviewClicked(el);
    },
    clearData: function(form) {
        var me = this,
        view = me.getView(),
        viewmodel = view.getViewModel();
        form.reset();    
    }
});