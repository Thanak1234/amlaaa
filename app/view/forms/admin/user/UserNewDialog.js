Ext.define("UI.view.forms.admin.user.UserNewDialog", {
    extend: "UI.view.commons.AbstractWindow",
    xtype: 'new-user-dialog', 
    title: 'New User',
    controller: "form-user-list",
    viewModel:{
        data:{
            readonly: true,
            selectedEmployee: {}
        }
    },
    modal: true,
    layout: 'vbox',
    width: 700,
    height: 330,
    bodyPadding: 10,    
    defaults: {
        border:false,
        anchor: '100%',
        width:'100%'
    },
    fbar: [ {
            itemId: 'card-next',
            text: 'Cancel',
            handler: function(){
                this.up().up().close();
            }
        }, {
            itemId: 'card-save',
            text: 'Save',
            handler: 'onSaveClicked', 
        }
    ],
    items: [
        {
            xtype: 'employeePickup', 
            fieldLabel: 'Employee:',
            allowBlank: false,
            reference:'empId',
            editable: true,
            bind: {
                selection: '{selectedEmployee}',
                value: '{formInfo.Id}',
            }
        },
      
       {
        xtype:'textfield',
        fieldLabel:'Email',
        bind:{
            value: '{selectedEmployee.email}',
            readOnly: '{readonly}'
        }
        },{
            xtype:'textfield',
            fieldLabel:'Login Name',
            bind:{
                value: '{selectedEmployee.login}',
                readOnly: '{readonly}'
            }
        },{
            xtype:'combo',
            fieldLabel:'Status',
            store:['Active','Inactive'],
            bind:{
                value: '{selectedEmployee.status}',
                readOnly: '{readonly}'
            }
        }
    ]
});