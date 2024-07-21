// Your code here
// createEmployeeRecord
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // createEmployeeRecords
  function createEmployeeRecords(employeeRowData) {
    return employeeRowData.map(createEmployeeRecord);
  }
  
  // createTimeInEvent
  function createTimeInEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date
    });
    return employee;
  }
  
  // createTimeOutEvent
  function createTimeOutEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date
    });
    return employee;
  }
  
  // hoursWorkedOnDate
  function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(e => e.date === date);
    const timeOut = employee.timeOutEvents.find(e => e.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  // wagesEarnedOnDate
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
  }
  
  // allWagesFor
  function allWagesFor(employee) {
    const dates = employee.timeInEvents.map(e => e.date);
    return dates.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
  }
  
  // calculatePayroll
  function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
  }
  
  // Example usage:
  const employeeRecords = createEmployeeRecords([
    ['John', 'Doe', 'Manager', 30],
    ['Jane', 'Smith', 'Developer', 25]
  ]);
  
  employeeRecords.forEach(employee => {
    createTimeInEvent(employee, '2023-01-01 0900');
    createTimeOutEvent(employee, '2023-01-01 1700');
  });
  
  console.log('Total Payroll:', calculatePayroll(employeeRecords))