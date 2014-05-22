/*
 * File: app/controller/Tasks.js
 *
 * This file was generated by Sencha Architect version 3.1.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.3.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.3.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('TouchCRUD.controller.Tasks', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            taskView: 'taskview',
            taskFormField: 'taskform #taskFormField',
            addButton: 'taskview #addButton',
            deleteButton: 'taskform #deleteButton'
        },

        control: {
            "mainview #addButton": {
                tap: 'add'
            },
            "list": {
                itemtouchend: 'edit'
            },
            "formpanel #saveButton": {
                tap: 'save'
            },
            "formpanel #deleteButton": {
                tap: 'remove'
            },
            "tasklist": {
                show: 'onTaskListShow'
            }
        }
    },

    add: function(button, e, eOpts) {
        // Navigate to form
        this.getMainView().push({
            xtype: 'formpanel',
            title: 'Add task'
        });

        this.getAddButton().hide();
        this.getDeleteButton().hide();
    },

    edit: function(dataview, index, target, record, e, eOpts) {
        var taskView = this.getTaskView();

        // Navigate to form
        taskView.push({
            xtype: 'taskform',
            title: 'Edit Task'
        });
        this.getAddButton().hide();
        this.getDeleteButton().show();

        var taskFormField = this.getTaskFormField(),
            fields = taskFormField.getFieldsAsArray();

        Ext.each(fields, function(field) {
            var key = field.getName(),
                value = record.get(key);
            field.setValue(value);
        });

        taskView.setRecord(record);

        this.holdSelect = true;
    },

    save: function(button, e, eOpts) {
        // Build up the model's data
        var fields = this.getTaskFormField().getFieldsAsArray(),
            data = {};
        Ext.each(fields, function(field) {
            var key = field.getName(),
                value = field.getValue();
            data[key] = value;
        });

        // Save the model's data
        var mainView = this.getMainView(),
            record = mainView.getRecord(),
            store = Ext.getStore('Tasks');
        if (record) {
            record.set(data);
            mainView.setRecord(null);
        } else {
            store.add(data);
        }
        store.sort();

        // Navigate back to list
        this.getMainView().pop();
    },

    remove: function(button, e, eOpts) {
        var me = this,
            title = 'Delete',
            message = 'Are you sure you want to delete this task?';

        Ext.Msg.confirm(title, message, function(response) {
            if (response == 'yes') {

        		var mainView = me.getMainView(),
        		tasks = Ext.getStore('Tasks'),
        		task = mainView.getRecord();

        		tasks.remove(task);

        		// Navigate back to list
        		mainView.pop();

            }
        });
    },

    onTaskListShow: function(component, eOpts) {
        this.getAddButton().show();
    }

});