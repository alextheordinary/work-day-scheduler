// Variables
var currentDay = moment(); // moment variable for day display
var currentHour = moment().format("k"); // current hour in military time

// Element selectors
var currentDayEl = $("#currentDay");

// Functions

// Build out time blocks. Set labels to each hour. Apply past, present, future classes based on time comparison. Add a textarea to each timeblock. Fill textarea with any data from local storage for that hour. Add save button. Add event listener to each save button to save that textarea to localstorage.

function buildTimeBlocks() {
    // i = 9 is 9am in military time. 18 is 6pm in military time. 9am-5pm working hours
    for (i = 9; i < 18; i++) {
        createTimeBlockRow(i);
    }
}


// Create a time block row and append it to the container

function createTimeBlockRow(kTime) {
    // Elements to be added
    var containerEl = $(".container");
    containerEl.append("<div class='row'></div>");
    var rowEl = $(".row").last();
    rowEl.append("<div class= 'hour'></div>");
    var hourEl = rowEl.children(".hour");
    rowEl.append("<div class='time-block'></div>");
    var timeBlockEl = rowEl.children(".time-block");
    timeBlockEl.append("<textarea></textarea>") ;
    var textAreaEl = timeBlockEl.children("textarea");
    rowEl.append("<button class= 'saveBtn'><i class='bi bi-save'></i></button>");
    var saveBtnEl = rowEl.children(".saveBtn");
    

    // Setting the label for the hour class item and storing the k time in a data-attribute in the row
    hourEl.text(moment(kTime, "k").format("hA"));
    rowEl.attr("data-kHour", kTime);

    // Setting the class of the time block based on current hour

    if (currentHour == kTime) {
        timeBlockEl.addClass("present");
    } else if (currentHour > kTime) {
        timeBlockEl.addClass("past");
    } else {
        timeBlockEl.addClass("future");
    }

    // Set textarea text to local storage value
    textAreaEl.text(retrieveTask(kTime));

    // Add event listener to save button
    saveBtnEl.on("click", saveTask);
}

// Display today's date in the currentDayEl

function displayCalendarDate() {
    currentDayEl.text(currentDay.format("dddd, MMMM Do, YYYY"));
}

// Retrieve task from local storage for a given k time

function retrieveTask(kTime) {
    var storedTask = JSON.parse(localStorage.getItem(kTime + "-task"));
    var taskText = "";
    if (storedTask !== null) {
        taskText = storedTask;
    }
    return taskText;
}

// Save function task to local storage for a given k time.

function saveTask(event) {
    var parentRowEl = $(event.target).parents(".row");
    var kTime = parentRowEl.attr("data-kHour");
    var taskText = parentRowEl.find("textarea").val();
    localStorage.setItem(kTime + "-task", JSON.stringify(taskText));
}

// Main body
displayCalendarDate();
buildTimeBlocks();


