console.log('js');

$(document).ready(onReady);

var completeButton = '';

function onReady() {
    console.log('jQuery loaded.');
    $('#addItemButton').on('click', addItem);
    $('#toDoListBody').on('click', '.deleteButton', removeItem);
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
        completeButtonToggle(status);
        var id = data[i].id;
        var item = data[i].item;
        var status = data[i].status;
        // console.log('loggin id, item, & status inside appendItems() -> ', id, item, status);
        $('#toDoListBody').append('<tr data-id="' + id 
        + '"><td>' + item 
        + '</td><td>' + completeButton 
        + '</td><td><button class="deleteButton">Delete</button></td>');
    }
}

function completeButtonToggle (data) {
    if (data == false) {
        completeButton = '<button class="markIncomplete">Mark Incomplete</button>';
    } else if (data == true) {
        completeButton = '<button class="markComplete">Mark Complete</button>';
    } else {
        console.log('Error in completeButtonToggle()');
        
    }
    // console.log('loggin completeButton inside completeButtonToggle -> ', completeButton);
    
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

function markComplete() {
    
    }

function removeItem() {
    var itemToRemove = $(this).closest('tr').data();
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
