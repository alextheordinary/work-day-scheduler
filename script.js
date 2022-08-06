// Variables
var currentDay = moment() ; // moment variable for day display
var currentHour = moment().format("k") ; // current hour in military time
var hourlyTask = {
    hour: 22,
    task:"Sleep"
}; // object template to store an hourly task. hour stored in military time. name convention is kk-task where k is the military time.



// Element selectors
var currentDayEl = $("#currentDay") ;



// Functions

// Build out time blocks. Set labels to each hour. Apply past, present, future classes based on time comparison. Add a textarea to each timeblock. Fill textarea with any data from local storage for that hour. Add save button. Add event listener to each save button to save that textarea to localstorage.





// Display today's date in the currentDayEl

function displayCalendarDate() {
    currentDayEl.text(currentDay.format("dddd, MMMM Do, YYYY")) ;
}

// Retrieve task from local storage for a given k time

function retrieveTask(kTime) {
    var storedTask = JSON.parse(localStorage.getItem(kTime + "-task"));
    var taskText = "" ;
    if (storedTask !== null) {
       taskText = storedTask;
    }
    return taskText ;
}

// Save task to local storage for a given kk time.

function saveTask(kTime, taskObject) {
    localStorage.setItem(kTime + "-task", JSON.stringify(taskObject)) ;
}









// Main body
displayCalendarDate() ;


