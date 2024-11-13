let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

function removeDays() {
    let daysElements = document.getElementById("days");
    while (daysElements.hasChildNodes()) {
        daysElements.removeChild(daysElements.firstChild)
    }
}

function appendDays(date, isInactive, isHoliday, isToday) {
    let daysElements = document.getElementById("days");
    let newDay = document.createElement("li");
    newDay.appendChild(document.createTextNode(date))
    if (isInactive) {
        newDay.setAttribute("class", "inactive")
    }
    if (isHoliday) {
        newDay.setAttribute("class", "holiday")
    }
    if (isToday) {
        newDay.setAttribute("class", "today")
    }
    daysElements.appendChild(newDay);
}

function renderCalendar(year, month) {
    // render active month and year
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    document.getElementById("active-month").innerText = months[month] + " " + year

    // get first day on this month. ex: sunday = 0, saturday => 6
    let firstDayThisMonth = new Date(year, month, 1).getDay()

    // get last date on this month. ex: November => 30, December => 31
    const lastDateThisMonth = new Date(year, month + 1, 0).getDate()

    // get last date on previous month.
    const lastDatePrevMonth = new Date(year, month, 0).getDate()

    // get last day on this month
    let lastDayThisMonth = new Date(year, month + 1, 0).getDay()

    // get today date

    // convert sunday index (0) to 7
    if (firstDayThisMonth == 0) {
        firstDayThisMonth = 7
    }
    // render last dates from previous month
    const firstRenderDatePrevMonth = lastDatePrevMonth - (firstDayThisMonth - 2)
    for (i = firstRenderDatePrevMonth; i <= lastDatePrevMonth; i++) {
        appendDays(i, true)
    }

    // render active date on this month
    for (i = 1; i <= lastDateThisMonth; i++) {
        if (currentDate.getDate() == i && month == currentDate.getMonth() && year == currentDate.getFullYear()) {
            appendDays(i, false, false, true)
        } else {
            appendDays(i)
        }
    }

    // convert sunday index (0) to 7
    if (lastDayThisMonth == 0) {
        lastDayThisMonth = 7
    }
    // rendering several days at the beginning of next month
    for (i = 1; i <= 7 - lastDayThisMonth; i++) {
        appendDays(i, true)
    }
}

// first render calendar
removeDays();
renderCalendar(currentYear, currentMonth);

// next arrow functions
let nextArrow = document.getElementById("next-month")
nextArrow.onclick = function () {
    if (currentMonth == 11) {
        currentMonth = 0;
        currentYear += 1;
    } else {
        currentMonth += 1;
    }

    removeDays()
    renderCalendar(currentYear, currentMonth);
}

// prev arrow functions
let prevArrow = document.getElementById("prev-month")
prevArrow.onclick = function () {
    if (currentMonth == 0) {
        currentMonth = 11;
        currentYear -= 1;
    } else {
        currentMonth -= 1;
    }

    removeDays()
    renderCalendar(currentYear, currentMonth);
}
