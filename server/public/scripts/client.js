console.log('js');

$(document).ready(onReady);

var completeButton = '';

function onReady() {
    console.log('jQuery loaded.');
    $('#addItemButton').on('click', addItem);
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
    } else {
        completeButton = '<button class="markComplete">Mark Complete</button>';
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

}
