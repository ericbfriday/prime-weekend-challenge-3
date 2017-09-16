# CRUD Up Pet Hotel

Your team has started a new business in Uptown for pet-enthusiasts that also need to vacation without their beloved pets.

As an MVP (Minimum Viable Product), you will create an application that allows the user to:

|  CRUD | What?  | REST | SQL |
|-------|--------|------|-----|
| **C**reate | Add/check in a pet| POST | INSERT|
| **R**ead | View all pets |  GET | SELECT |
| **U**pate | Update a pet's info| PUT | UPDATE |
| **D**elete |Remove a pet | DELETE | DELETE |

IMPORTANT: Please include a `database.sql` file in your submitted Git repo that has all the queries you used to create your database and tables.

## Implementation Details
### Database Table
Create a database of the pets with their check-in and check-out dates. Don't forget to add your primary key!

_Columns_

* id
* pet name
* breed
* color
* checked-in (boolean w/ Default of false)

### View
MVP of this app will have one view for Pets.

* Read all pets from the database and display them on the DOM. Use bootstrap to style the page a bit.
* Add new pets to the database.
* Add button to each row for removing pets from the database. 
* Add a button to each row for check-in/check-out. 
	* If the pet is checked-in (true in db) the button on the view should read 'Check Out'. Clicking this button should toggle the boolean to false in the database. 
	* If the pet is checked-out (false in the db) the button on the view should read 'Check In'. Clicking this button should toggle the boolean to true in the database.

## Hard Mode
* Add edit/update buttons to each row to allow for all fields to be editable and when update is clicked the new information is stored for that pet. You can forgo the edit button and just make the fields clickable to reveal a input box. This will require some front end work. 
	* For the update, just like with delete, you will need the Primary Key (pet id) to locate which pet is being updated. Try to make the server side API look like this: `PUT /pets/:id` with a body containing new form fields. 
* Based on the the checked in or out boolean, use css/bootstrap to color the rows differently based on whether the pet is still checked in to the hotel.
* Add checked-in and checked-out date columns. You can re-create your table or investigate `ALTER TABLE` syntax. Working with dates can be tricky. The date string collected on the DOM has to be recognized by the database. 
	* Change the functionality of the 'Check Out' button to insert the current date when 'Check Out' is clicked into the checked-out column in the database.
	* Once the pet has been checked out, disallow them from being toggled checked-in again. 