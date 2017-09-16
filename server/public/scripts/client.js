console.log('js');

$(document).ready(onReady);

var completeButton = '';

function onReady() {
    console.log('jQuery loaded.');
    $('#addItemButton').on('click', addItem);
    $('#toDoListBody').on('click', '.deleteButton', removeItem);
    $('#toDoListBody').on('click', '.markIncomplete', toggleComplete);
    $('#toDoListBody').on('click', '.markComplete', toggleComplete);
    getItems();
}

function addItem() {
    var itemToAdd = $('#itemToAdd').val();
    var objectToSend = {
        item: itemToAdd
    };
    $.ajax({
        url: '/toDoList',
        type: 'POST',
        data: objectToSend,
        success: function (data) {
            console.log('addItem() is logging success! -> ', data);
            getItems();
        }
    });
    $('#itemToAdd').val(""); // clears input after submit
}

function appendItems(data) {
    // console.log('loggin data inside appendItems() -> ', data);
    $('#toDoListBody').empty();
    for (var i = 0; i < data.length; i++){
        var id = data[i].id;
        var item = data[i].item;
        var status = data[i].status;
        // var rowClass = 'incomplete';
        completeButtonToggle(status);
        backgroundColorToggle(status);
        // console.log('loggin id, item, & status inside appendItems() -> ', id, item, status);
        if (status == true) {
            $('#toDoListBody').append('<tr data-id="' + id 
            + '" data-status="' + status
            + '" class="' + rowClass 
            + '"><td>' + item 
            + '</td><td>' + completeButton 
            + '</td><td><button class="btn btn-danger deleteButton">Delete</button></td>');
        } else if (status == false) {
            $('#toDoListBody').prepend('<tr data-id="' + id 
            + '" data-status="' + status
            + '" class="' + rowClass 
            + '"><td>' + item 
            + '</td><td>' + completeButton 
            + '</td><td><button class="btn btn-danger deleteButton">Delete</button></td>');
        }
        // HARD MODE IDEA:
        // create an if loop based on status
        // if completed, then append to DOM
        // if incomple, then prepend command to DOM.


    }
}

function backgroundColorToggle (params) {
    if (params == true) {
        rowClass = 'complete';
    } else if (params == false) {
        rowClass = 'incomplete';
    } else {
        console.log('Error in completeButtonToggle()');
    } 
}

function completeButtonToggle (data) {
    if (data == false) {
        completeButton = '<button class="btn btn-success markComplete">Mark Complete</button>';
    } else if (data == true) {
        // completeButton = 'Completed!' <-- Filler text I no longer need
        completeButton = '<button class="btn btn-warning markIncomplete">Mark Incomplete</button>';
    } else {
        console.log('Error in completeButtonToggle()');
    }
}

function getItems() {
    $.ajax({
        url: '/toDoList',
        type: 'GET',
        success: function (data) {
            // console.log('logging response inside getItems() -> ', data);
          appendItems(data);
        } // end success
      }); //end ajax
}

function removeItem() {
    var confirmation = confirm("Do you REALLY want to delete this task?");
    if (confirmation == true) {
    var itemToRemove = $(this).closest('tr').data();
    console.log('logging itemToRemove -> ', itemToRemove);
    $.ajax({
        url:'/toDoList/' + itemToRemove.id,
        type: 'DELETE',
        data: itemToRemove,
        success: function(response) {
        //   console.log('deleting item in removeItem() -> ', itemToRemove);    
          getItems(); 
        } // end success
      }); //end ajax
    } else {
        return;
    }
}

function toggleComplete() {
    var itemToMarkComplete = $(this).closest('tr').data();
    console.log('logging itemToMarkComplete -> ', itemToMarkComplete);
    
    $.ajax({
        url: '/toDoList/' + itemToMarkComplete.id,
        type: 'PUT',
        data: itemToMarkComplete,
        success: function(data) {
            console.log('SUCCESS in markComplete', data);
            getItems();
        }
    });
}