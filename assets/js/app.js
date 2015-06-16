/*
---

name: ViewController

description: ViewController to manage to do list

authors: Régis Lutter

requires:

provides:
	- ListController
	- EditController

*/

if (!window.ViewController) window.ViewController = {};

var todoList = new Moobile.List();
var todoItem = null;

// Page to list the tasks
var ListController = new Class({

    Extends: Moobile.ViewController,

    addButton: null,
    prevButton: null,

    loadView: function() {
        this.view = Moobile.View.at('templates/views/list-todo.html');

        // Add button in navigation bar
        this.navigationBarItem = this.view.getChildComponent('navigation-bar').getItem();
        this.addButton = new Moobile.Button();
        this.addButton.setLabel('Add');
        this.addButton.addEvent('tap', this.bound('onAddTap'));
        this.navigationBarItem.addRightButton(this.addButton);

        // List of todo
        todoList.addEvent('select', this.bound('onEditTap'));
        this.view.addChildComponent(todoList);
    },

    onAddTap: function() {
        this.getViewControllerStack().pushViewController(new AddController(), new Moobile.ViewTransition.Slide);
    },

    onEditTap: function(item) {
        todoItem = item;
        todoList.clearSelectedItem();
        this.getViewControllerStack().pushViewController(new EditController(), new Moobile.ViewTransition.Slide);
    }

});

// Page to add a task
var AddController = new Class({

    Extends: Moobile.ViewController,

    backButton: null,
    saveButton: null,
    todoName: null,

    loadView: function() {
        this.view = Moobile.View.at('templates/views/add-todo.html');
        this.navigationBarItem = this.view.getChildComponent('navigation-bar').getItem();

        // Input element
        this.todoName = new Moobile.Component('<input type="text" />', null, 'todo-name');
        this.view.addChildComponent(this.todoName);

        // Cancel button
        this.backButton = new Moobile.Button();
        this.backButton.setLabel('Cancel');
        this.backButton.setStyle('back');
        this.backButton.addEvent('tap', this.bound('onBackTap'));
        this.navigationBarItem.addLeftButton(this.backButton);

        // Save button
        this.saveButton = new Moobile.Button();
        this.saveButton.setLabel('Save');
        this.saveButton.setStyle('active');
        this.saveButton.addEvent('tap', this.bound('onSaveTap'));
        this.navigationBarItem.addRightButton(this.saveButton);
    },

    onBackTap: function() {
        this.getParentViewController().popViewController();
    },

    onSaveTap: function() {
        var todoItem = new Moobile.ListItem();
        todoItem.setLabel(this.todoName.getElement().value);
        todoList.addItem(todoItem);
        this.getParentViewController().popViewController();
    }
});

// Page to edit a task
var EditController = new Class({

    Extends: Moobile.ViewController,

    backButton: null,
    saveButton: null,
    deleteButton: null,
    todoName: null,

    loadView: function() {
        this.view = Moobile.View.at('templates/views/edit-todo.html');
        this.navigationBarItem = this.view.getChildComponent('navigation-bar').getItem();

        // Input element
        this.todoName = new Moobile.Component('<input type="text" />', null, 'todo-name');
        this.todoName.getElement().value = todoItem.getLabel().getText();
        this.view.addChildComponent(this.todoName);

        // Cancel button
        this.backButton = new Moobile.Button();
        this.backButton.setLabel('Cancel');
        this.backButton.setStyle('back');
        this.backButton.addEvent('tap', this.bound('onBackTap'));
        this.navigationBarItem.addLeftButton(this.backButton);

        // Save button
        this.saveButton = new Moobile.Button();
        this.saveButton.setLabel('Save');
        this.saveButton.setStyle('active');
        this.saveButton.addEvent('tap', this.bound('onSaveTap'));
        this.navigationBarItem.addRightButton(this.saveButton);

        // Delete button
        this.deleteButton = new Moobile.Button();
        this.deleteButton.setLabel('Delete');
        this.deleteButton.addClass('warning');
        this.deleteButton.addEvent('tap', this.bound('onDeleteTap'));
        this.view.addChildComponent(this.deleteButton);
    },

    onBackTap: function() {
        todoItem = null;
        this.getParentViewController().popViewController();
    },

    onSaveTap: function() {
        todoItem.setLabel(this.todoName.getElement().value);
        this.getParentViewController().popViewController();
    },

    onDeleteTap: function() {
        todoList.removeItem(todoItem);
        this.getParentViewController().popViewController();
    }
});

var viewControllerStack = new Moobile.ViewControllerStack();
viewControllerStack.pushViewController(new ListController());