Ext.define('UI.view.form.submission.SubmissionController', {
    extend: 'UI.view.commons.UIFormController',
    alias: 'controller.forms-submission',
    onVoidClicked: function(el) {
        var me = this,
        viewmodel = me.getViewModel(),
        selection = viewmodel.get('selectedRow');        
        Ext.MessageBox.show({
            title: 'Confirmation',
            msg: 'Do you want to void?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.WARNING,
            fn: function (bt) {
                if (bt == 'yes') {
                    me.getView().mask("Verying...");
                    var data = selection.getData();
                    Ext.Ajax.request({
                        method: 'POST',
                        url: Configuration.baseUrl + 'api/v1/submission/void',
                        jsonData: data,
                        success: function(response, request) {
                            var errors = JSON.parse(response.responseText);
                            me.onRefreshClicked();
                            me.disableButtons(true, true, true, true);                           
                            me.showToast('Void successfully.');
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
    onVerificationClicked: function(el) {
        var me = this,
        viewmodel = me.getViewModel(),
        selection = viewmodel.get('selectedRow');        
        Ext.MessageBox.show({
            title: 'Confirmation',
            msg: 'Do you want to verify?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            fn: function (bt) {
                if (bt == 'yes') {
                    me.getView().mask("Verying...");
                    var data = selection.getData();
                    Ext.Ajax.request({
                        method: 'POST',
                        url: Configuration.baseUrl + 'api/v1/submission/verification',
                        jsonData: data,
                        success: function(response, request) {
                            var errors = JSON.parse(response.responseText);
                            if(!me.isValid(errors)) {
                                Ext.MessageBox.show({
                                    title: 'Validation',
                                    msg: me.renderMessageError(errors),
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.ERROR
                                });
                                me.onRefreshClicked();
                                me.showToast('Verification fail.');
                            } else {
                                me.onRefreshClicked();
                                me.disableButtons(true, true, true, true);                           
                                me.showToast('Verification successfully.');
                                Ext.MessageBox.show({
                                    title: 'Validation',
                                    msg: 'Verification successfully.',
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.INFO
                                });
                            }
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
    renderMessageError: function(errors) {
        var messages = [];
        var n = 1;
        for(var i=0; i < errors.length; i++) {
            var message = errors[i];
            if(message !== '') {
                messages.push(Ext.String.format('{0}. {1}', n, message))
                n = n + 1;
            }
        }

        return messages;
    },
    isValid: function(errors) {
        var i = 0;
        var valid = true;
        for(i=0; i<errors.length; i++) {
            var e = errors[i];
            if(e !== '') {
                valid = false;
                break;
            }
        }
        return valid;
    },
    onSendClicked: function(el) {
        var me = this,
        viewmodel = me.getViewModel(),
        selection = viewmodel.get('selectedRow'),
        submissionId = selection.get('id'),
        formType = selection.get('formType');
        Ext.MessageBox.show({
            title: 'Confirmation',
            msg: 'Do you want to send?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            fn: function (bt) {
                if (bt == 'yes') {
                    me.getView().mask("Sending...");
                    Ext.Ajax.request({
                        method: 'GET',
                        url: Configuration.baseUrl + 'api/v1/submission/send',
                        params: {
                            submissionId: submissionId,
                            formType: formType
                        },
                        success: function(response, request) { 
                            var errors = JSON.parse(response.responseText);
                            if(errors && errors.length > 0) {
                                Ext.MessageBox.show({
                                    title: 'Validation',
                                    msg: errors,
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.ERROR
                                });
                                me.onRefreshClicked();
                                me.showToast('Verification fail.');
                            } else {
                                me.onRefreshClicked();
                                me.disableButtons(true, true, true, true);                           
                                me.showToast('Form sent successfully.')
                            }
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
    onSubmissionRowClicked: function(el, record) {
        var me = this,
        viewmodel = me.getViewModel(),
        actionType = record.get('actionType');
        switch(actionType) {
            case 'Download':
            case 'Verification':
            case 'Save': {
                me.disableButtons(false, false, false, false);
                break;
            }
            case 'Void': {
                me.disableButtons(true, true, true, true);
                break;
            }
            case 'Sent': {
                me.disableButtons(true, true, false, true);
                break;
            }
        }
        me.loadMultiAndSingleData();
    },
    loadMultiAndSingleData: function() {
        var me = this,
        viewmodel = me.getViewModel(),
        refs = me.getReferences(),
        selection = viewmodel.get('selectedRow'),
        multiTransaction = refs.multiTransaction,
        singleTransaction = refs.singleTransaction,
        submissionLog = refs.submissionLog,
        jsonData = selection.getData(),
        formType = selection.get('formType');        

        multiTransaction.setFormType(formType);
        singleTransaction.setFormType(formType);

        Ext.Ajax.request({
            method: 'POST',
            url: Configuration.baseUrl + 'api/v1/submission/single',
            jsonData: jsonData,
            success: function(response, request) {                            
                var records = JSON.parse(response.responseText);
                singleTransaction.getStore().removeAll();
                singleTransaction.getStore().add(records);
            },
            failure: function(response, request) {
                console.log(response);
            }
        });

        Ext.Ajax.request({
            method: 'POST',
            url: Configuration.baseUrl + 'api/v1/submission/multi',
            jsonData: jsonData,
            success: function(response, request) {                            
                var records = JSON.parse(response.responseText);
                multiTransaction.getStore().removeAll();
                multiTransaction.getStore().add(records);
            },
            failure: function(response, request) {
                console.log(response);
            }
        });
        var store = submissionLog.getStore();
        store.getProxy().extraParams = {
            submissionId: selection.getId()
        };
        store.load();
    },
    disableButtons: function(voidBtn, verificationBtn, downloadBtn, sendBtn) {
        var me = this,
        viewmodel = me.getViewModel();
        viewmodel.set('disableVoid', voidBtn);
        viewmodel.set('disableVerification', verificationBtn);
        viewmodel.set('disableDownload', downloadBtn);
        viewmodel.set('disableSend', sendBtn);
    },
    onDownloadClicked: function() {
        var me = this,
        viewmodel = me.getViewModel(),
        selection = viewmodel.get('selectedRow');        
        Ext.MessageBox.show({
            title: 'Confirmation',
            msg: 'Do you want to download?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            fn: function (bt) {
                if (bt == 'yes') {
                    me.getView().mask("Downloading...");
                    var data = selection.getData();
                    Ext.Ajax.request({
                        method: 'POST',
                        binary: true,
                        url: Configuration.baseUrl + 'api/v1/submission/download',
                        jsonData: data,
                        success: function(response, request) { 
                            me.createFileDownload(response);
                            me.onRefreshClicked();
                            me.disableButtons(true, true, true, true);                           
                            me.showToast('Download successfully.');
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
    createFileDownload: function(res) {
        var byteArray = new Uint8Array(res.responseBytes);
        var blob = new Blob([byteArray], {type: "application/octet-stream"});
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);        
        var fileName = this.getFormattedTime() + '.zip';      
        link.download = fileName;
        link.click();
    },
    getFormattedTime: function() {
        var today = new Date();
        var y = today.getFullYear();
        var m = today.getMonth();
        var d = today.getDate();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        return y + '-' + m + '-' + d + '-' + h + '-' + m + '-' + s;
    },
    onNewClicked: function(el) {
        var me = this,
        view = me.getView();
        var win = Ext.create('UI.view.forms.submission.SubmissionCriteria', {
            animateTarget: el, 
            mainCtrl: me,
            mainView: view
        });
        win.show();
    },
    onClearFilters: function(el) {
        var me = this,
        refs = me.getReferences(),
        view = refs.submissionList;
        view.filters.clearFilters();
        me.disableButtons(true, true, true, true);
    },
    onRefreshClicked: function(el) {
        var me = this,
        refs = me.getReferences(),
        view = refs.submissionList;
        store = view.getStore();
        store.load();
        me.disableButtons(true, true, true, true);
    },
    onSearchClearClick: function(el) {
        var me = this,
        viewmodel = me.getViewModel();
        viewmodel.set('gridInfo.searchText', '');
        me.onSearchClicked(el);        
    },
    onSearchClicked: function(el) {
        var me = this,
        refs = me.getReferences(),
        view = refs.submissionList;
        viewmodel = me.getViewModel(),
        store = view.getStore(),
        searchText = viewmodel.get('gridInfo.searchText');
        store.getProxy().extraParams = {
            query: searchText
        }
        store.load();
        me.disableButtons(true, true, true, true);
    },
    onSearchTextPress: function(el, e) {
        var me = this;        
        if (e.keyCode == e.ENTER) {
            me.onSearchClicked();
            e.stopEvent();
            me.disableButtons(true, true, true, true);
        }
    }
});