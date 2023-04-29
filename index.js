// Your code here

//function createEmployeeRecord 
function createEmployeeRecord(employee){
    const timeInEvents = [];
    const timeOutEvents = [];
    return{
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: timeInEvents,
        timeOutEvents: timeOutEvents
    };
}

//employee Records: converts nested array into employee record
function createEmployeeRecords(employees){
    const employeeArrayRecords = [];
    employees.forEach(element => {
        employeeArrayRecords.push(createEmployeeRecord(element))
    });
    return(employeeArrayRecords);
}

// it adds a timeIn event Object to an employee's record of 
//timeInEvents when provided an employee record and Date/Time 
//String and returns the updated record
function createTimeInEvent(employeeRec, dateStamp){
    const tempDate = dateStamp.split(" ");
    
    const timeEventIn = {
        type: "TimeIn",
        hour: parseInt(tempDate[1]),
        date: tempDate[0]
    };

    employeeRec.timeInEvents.push(timeEventIn);
    return(employeeRec);
}

//timeOut event Object to an employee's record of timeOutEvents when provided 
//an employee record and Date/Time String and returns the updated record
//has a function called createTimeOutEvent:

function createTimeOutEvent(employeRec, datestamp){
    const dateTimeSplit = datestamp.split(" ");

    const timeEventout = {
        type: "TimeOut",
        hour: parseInt(dateTimeSplit[1]),
        date: dateTimeSplit[0]
    }
    employeRec.timeOutEvents.push(timeEventout)
    return employeRec;
}

// Given an employee record with a date-matched timeInEvent and timeOutEvent
//hoursWorkedOnDate calculates the hours worked when given an employee 
//record and a date:

function hoursWorkedOnDate(employeeRec, dateIn){
    let timeIn,timeOut;
    employeeRec.timeInEvents.forEach(i => {
        if(i["date"] === dateIn){
            timeIn = i["hour"];
        }
    })
    employeeRec.timeOutEvents.forEach(i => {
        if(i["date"] === dateIn){;
            timeOut = i["hour"]
        }
    })

    return((timeOut - timeIn) / 100);
}

// Given an employee record with a date-matched timeInEvent and timeOutEvent
//wagesEarnedOnDate multiplies the hours worked by the employee's rate per hour:
function wagesEarnedOnDate(employeRec, date){
    return (
        employeRec.payPerHour * hoursWorkedOnDate(employeRec, date)
        );
}

//Given an employee record with MULTIPLE date-matched timeInEvent and timeOutEvent
//allWagesFor aggregates all the dates' wages and adds them together:
function allWagesFor(employeeRec){
    let wage = 0;
    employeeRec.timeInEvents.forEach(dates =>{
        wage += wagesEarnedOnDate(employeeRec, dates["date"])
    })
    return(wage);
}

//Given an array of multiple employees
//calculatePayroll aggregates all the dates' wages and adds them together:
function calculatePayroll(arrayOfEmployeeObj){
    let allWages = 0;
    arrayOfEmployeeObj.forEach(employees => {
        employees.timeInEvents.forEach(dates =>{
            allWages += wagesEarnedOnDate(employees, dates["date"])
        })
    })
    return(allWages)
}