const { processMenuSelection } = require('./helpers/sqlUtilities');
const { loadMainMenu } = require('./helpers/menuLoader');

//MySQL pwd
const pwd = "IntacHATLCha30&!@";
//Employee Manager Database
const employee_db = "employee_db";

const employeeManagerLogo =
  ",------------------------------------------------------------------------------------------------------------------------.\n"
  + "|  _____                       _                                   __  __                                                 |\n"
  + "|  | ____|  _ __ ___    _ __   | |   ___    _   _    ___    ___    |  \\/  |   __ _   _ __     __ _    __ _    ___   _ __  |\n"
  + "|  |  _|   | '_ ` _ \\  | '_ \\  | |  / _ \\  | | | |  / _ \\  / _ \\   | |\\/| |  / _` | | '_ \\   / _` |  / _` |  / _ \\ | '__| |\n"
  + "|  | |___  | | | | | | | |_) | | | | (_) | | |_| | |  __/ |  __/   | |  | | | (_| | | | | | | (_| | | (_| | |  __/ | |    |\n"
  + "|  |_____| |_| |_| |_| | .__/  |_|  \\___/   \\__, |  \\___|  \\___|   |_|  |_|  \\__,_| |_| |_|  \\__,_|  \\__, |  \\___| |_|    |\n"
  + "|                      |_|                  |___/                                                    |___/                |\n"
  + "`-------------------------------------------------------------------------------------------------------------------------'"





function init() {

  //Print logo to console
  console.log(employeeManagerLogo);
 
  //Load main menu
  loadMainMenu()
  .then((data) => {processMenuSelection(data)})  // Processes this information recursively
  .catch(err => console.error(err));
}
  

init();