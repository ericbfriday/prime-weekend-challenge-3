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
        $('#toDoListBody').append('<tr data-id="' + id 
        + '" data-status="' + status
        + '" class="' + rowClass 
        + '"><td>' + item 
        + '</td><td>' + completeButton 
        + '</td><td><button class="btn btn-danger deleteButton">Delete</button></td>');
    }
}

function backgroundColorToggle (params) {
    if (params == false) {
        rowClass = 'complete';
    } else if (params == true) {
        rowClass = 'incomplete';
    } else {
        console.log('Error in completeButtonToggle()');
    } 
}

function completeButtonToggle (data) {
    if (data == false) {
        completeButton = '<button class="btn btn-success markIncomplete">Mark Incomplete</button>';
    } else if (data == true) {
        completeButton = '<button class="btn btn-warning markComplete">Mark Complete</button>';
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

function removeItem() {
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
}
