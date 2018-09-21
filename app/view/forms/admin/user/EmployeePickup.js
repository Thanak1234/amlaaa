Ext.define("UI.view.forms.admin.user.EmployeePickup", {
    extend: "Ext.form.field.ComboBox",
    xtype: 'employeePickup',
    controller: "employeepickup",
    store: {
        type: 'employee'
    },
    displayField: 'name',
    valueField  : 'id',
    typeAhead   : true,
    employeeEditable: false,
    changeOnly: false,
    queryMode: 'remote',
    minChars: 2,
    pageSize: 20,
    forceSelection: true,
    listConfig  : {
        minWidth: 400,
        resizable: true,
        loadingText: 'Searching...',
        emptyText: 'No matching posts found.',
        itemSelector: '.search-item',


    },
    listeners: {
        beforequery: 'onEmployeePickupChanged',
        afterrender: function (combo) {
            var form = combo.up('form');
            combo.init(form);
            combo.getTrigger('clear').hide();            
            combo.updateLayout();
        }
    },
    triggers: {
        clear: {
            weight: 1,
            cls: Ext.baseCSSPrefix + 'form-clear-trigger',
            hidden: true,
            handler: 'onClearClick',
            scope: 'this'
        },
        
    },
    init: function(form) {
       
            Ext.Ajax.request({
                url: Configuration.baseUrl + 'api/v1/employees',
                method: 'GET',
                success: function(res, req) {
                    var playerSelection = JSON.parse(res.responseText);
                    //var model = Ext.create('UI.model.commons.Employee', playerSelection);
                    var trigger = me.getTrigger('clear');
                    trigger.hide();
                }
            });
        
    },
    initComponent: function () {
        var me = this;
      //  this.pickerId = this.getId() + "_picker";
        this.callParent(arguments);
    },

    onClearClick: function () {
        var me = this;

        if (me.disabled) {
            return;
        }
        me.clearValue();
        me.setRawValue(null);
        me.getTrigger('clear').hide();
        me.value = null;
        me.afterClear(me);
        me.updateLayout();
        me.fireEvent('clear', me);
    },
    afterClear: function(combo){

    },
    /* override extjs combo method */
    updateValue: function () {
        var me = this,
            selectedRecords = me.valueCollection.getRange();

        var data = selectedRecords[0] ? selectedRecords[0].data : null;

        if (selectedRecords.length > 0) {
            me.getTrigger('clear').show();
            // me.getTrigger('add').hide();
            me.updateLayout();
            me.callParent();
        }
    },
    setReadOnly: function (value) {
        var me = this,
            old = me.readOnly;

        me.callParent(arguments);
        if (value != old) {
            this.readOnly = value;
            me.updateLayout();
        }

        if (this.readOnly || this.changeOnly) {
            me.getTrigger('add').hide();
        }
        this.getTrigger('clear').hide();
    },

});
