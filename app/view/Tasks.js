/*
 * File: app/view/Tasks.js
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

Ext.define('TouchCRUD.view.Tasks', {
    extend: 'Ext.navigation.View',
    alias: 'widget.tasks',

    requires: [
        'Ext.navigation.Bar',
        'Ext.Button',
        'Ext.dataview.List',
        'Ext.XTemplate',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.DatePicker',
        'Ext.picker.Date',
        'Ext.field.Toggle'
    ],

    config: {
        activeItem: '1',
        itemId: 'tasks',
        navigationBar: {
            docked: 'top',
            itemId: 'navBar',
            items: [
                {
                    xtype: 'button',
                    align: 'right',
                    itemId: 'addButton',
                    iconCls: 'add'
                }
            ]
        },
        items: [
            {
                xtype: 'list',
                title: 'Task List',
                itemTpl: [
                    '<div>',
                    '    <tpl if="completed">COMPLETED:</tpl>',
                    '    {priority} -',
                    '    {description}',
                    '    <tpl if="dueDate"> - {dueDate:date}</tpl>',
                    '</div>'
                ],
                store: 'Tasks'
            },
            {
                xtype: 'formpanel',
                itemId: 'form',
                items: [
                    {
                        xtype: 'fieldset',
                        itemId: 'taskFormField',
                        items: [
                            {
                                xtype: 'textfield',
                                label: 'Description',
                                labelWidth: '35%',
                                name: 'description',
                                required: true
                            },
                            {
                                xtype: 'selectfield',
                                label: 'Priority',
                                labelWidth: '35%',
                                name: 'priority',
                                required: true,
                                options: [
                                    {
                                        text: 'Normal',
                                        value: 'Normal'
                                    },
                                    {
                                        text: 'High',
                                        value: 'High'
                                    },
                                    {
                                        text: 'Low',
                                        value: 'Low'
                                    }
                                ],
                                usePicker: true
                            },
                            {
                                xtype: 'datepickerfield',
                                label: 'Due Date',
                                labelWidth: '35%',
                                name: 'dueDate'
                            },
                            {
                                xtype: 'togglefield',
                                label: 'Completed',
                                labelWidth: '35%',
                                name: 'completed'
                            }
                        ]
                    },
                    {
                        xtype: 'button',
                        itemId: 'saveButton',
                        margin: 10,
                        ui: 'action',
                        text: 'Save'
                    },
                    {
                        xtype: 'button',
                        itemId: 'deleteButton',
                        margin: 10,
                        ui: 'decline',
                        text: 'Delete'
                    }
                ]
            }
        ]
    }

});