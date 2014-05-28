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
            taskList: 'taskview #taskList',
            taskForm: 'taskform',
            taskDetails: 'taskdetails',
            addButton: 'taskview #addButton',
            editButton: 'taskview #editButton',
            removeButton: 'taskview #removeButton'
        },

        control: {
            "taskview #taskList": {
                select: 'select'
            },
            "taskview #editButton": {
                tap: 'edit'
            },
            "taskview #addButton": {
                tap: 'add'
            },
            "taskview #saveButton": {
                tap: 'save'
            },
            "taskview #removeButton": {
                tap: 'remove'
            },
            "taskview > *": {
                show: 'onNavigate'
            }
        }
    },

    select: function(dataview, record, eOpts) {
        this.getTaskView().push({
            xtype: 'taskdetails',
            title: 'Viewing Task',
            data: record.getData()
        });
    },

    edit: function(target) {
        // Get selected reocrd
        var record = this.getTaskList().getSelection()[0];

        // Show form
        this.getTaskView().push({
            xtype: 'taskform',
            title: 'Edit Task',
            record: record
        });
    },

    add: function(button, e, eOpts) {
        // Remove current selection
        this.getTaskList().deselectAll();

        // Create new record
        var record = Ext.create('model.task');

        // Show form
        this.getTaskView().push({
            xtype: 'taskform',
            title: 'Add Task',
            record: record
        });
    },

    save: function(button, e, eOpts) {
        var form = this.getTaskForm(),
            record = form.getRecord(),
            store = Ext.getStore('Tasks');

        // Update associated record with form values
        form.updateRecord(record);

        // Run validation
        var errors = record.validate();

        // Valid
        if (errors.isValid()) {

            // Add to store if new record
            if (record.phantom) {

                // TODO: Assign the record's ID from data source
                // Normally, this value would be auto-generated,
                // or returned from the server
                var id = store.getData().all.length + 1;
                record.set('id', id);

                // Add to store
                store.add(record);

            }

            // Commit changes
            store.sync();

        }

        // Back to list
        this.getTaskView().reset();

        // Ensure current record is selectd
        // Deleselect current, and prevent event from firing
        this.getTaskList().select(record, false, true);
    },

    remove: function(button, e, eOpts) {
        var me = this,
            title = 'Delete Task',
            message = 'Are you sure you want to delete this task?';

        Ext.Msg.confirm(title, message, function(response) {
            if (response == 'yes') {

        		var store = Ext.getStore('Tasks'),
            record = me.getTaskList().getSelection()[0];

        		store.remove(record);

        		// Back to list view
        		me.getTaskView().reset();

            }
        });
    },

    onNavigate: function(component, eOpts) {
        // Show/hide buttons based on view

        var add = this.getAddButton(),
            edit = this.getEditButton(),
            remove = this.getRemoveButton();

        switch (component.getItemId()) {
            case 'taskList':
                add.show();
                edit.hide();
                remove.hide();
                break;
            case 'taskDetails':
                add.hide();
                edit.show();
                remove.show();
                break;
            case 'taskForm':
                add.hide();
                edit.hide();
                remove.hide();
                break;
        }

    }

});