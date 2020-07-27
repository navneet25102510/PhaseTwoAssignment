// addbutton
var btnAdd=document.getElementById('addbtn');

// function to perform on tasks
function TaskEvent(e)
{
	// check if the event is on input tag ( that is checkbox )
	if(e.target.tagName == 'INPUT')
	{
		//adding line-through
		e.target.parentNode.querySelector('h3').style.textDecoration='line-through';
		// adding to last of the list
		e.target.parentNode.parentNode.appendChild(e.target.parentNode);
		// removing checkbox
		e.target.parentNode.removeChild(e.target.parentNode.querySelector('input'));
	}
	else 	
	{
		// selecting list elemrnt
		var task = e.target.parentNode;
		// removing ( delte button )
		task.parentNode.removeChild(task);			
	}
}
	
/* Adding Barrie Map */
var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: new google.maps.LatLng('44.360959','-79.695421'),
    mapTypeId: google.maps.MapTypeId.ROADMAP
   });
barrie = new google.maps.Marker({
    position: new
    google.maps.LatLng('44.360959','-79.695421'),
    map: map,
});


// Function to create a list item
function CreateListItem(){
	// creating list element
    var task = document.createElement('li');
	// checkbox
    var taskCheckBox = document.createElement('INPUT');
    taskCheckBox.setAttribute('type','checkbox');
	task.appendChild(taskCheckBox);
	
	// h3 tag for name
    var taskNameValue = document.createElement('h3');
    taskNameValue.textContent = document.getElementById('taskname').value;
    task.appendChild(taskNameValue);

	// delete button
    var deleteButton = document.createElement('button');
	deleteButton.textContent = "X Delete";
	deleteButton.setAttribute('class','delete');
	task.appendChild(deleteButton);
	// onclick event triggers
    deleteButton.onclick = TaskEvent;
    taskCheckBox.onclick = TaskEvent;

	// adding to list container ordered list
	document.getElementById('listContainer').prepend(task);
    
}
// onclic event trigger for add button
btnAdd.onclick = CreateListItem;

// Used Fetch API to add tasks from json file
fetch('https://navneet25102510.github.io/PhaseTwoAssignment/tasks.json')
  .then(response => response.json())
  .then(data => addData(data));
  
  // function that accepts json data and parses it's tasks to add data in to-do list
function addData(json) {
	var tasks = json.tasks;
	for(var i=0;i<tasks.length;i++)
	{
		// adding tasks
		document.getElementById('taskname').value = tasks[i];
		CreateListItem()
	}
	// clearing text field
	document.getElementById('taskname').value = "";
}