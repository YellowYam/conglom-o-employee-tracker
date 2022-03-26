const { processMenuSelection } = require('./helpers/menuProcessor');
const { loadMainMenu } = require('./helpers/menuLoader');

//Employee Manager Database
const employee_db = "employee_db";

const employeeManagerLogo =
   ",----------------------------------------------------------------------------------------------.\r\n"
  +"|   :::::::::: ::::    ::::  :::::::::  :::         ::::::::  :::   ::: :::::::::: ::::::::::  |\n"                                       
  +"|   :+:        +:+:+: :+:+:+ :+:    :+: :+:        :+:    :+: :+:   :+: :+:        :+:         |\n"
  +"|   +:+        +:+ +:+:+ +:+ +:+    +:+ +:+        +:+    +:+  +:+ +:+  +:+        +:+         |\n"
  +"|   +#++:++#   +#+  +:+  +#+ +#++:++#+  +#+        +#+    +:+   +#++:   +#++:++#   +#++:++#    |\n"
  +"|   +#+        +#+       +#+ +#+        +#+        +#+    +#+    +#+    +#+        +#+         |\n"
  +"|   #+#        #+#       #+# #+#        #+#        #+#    #+#    #+#    #+#        #+#         |\n"
  +"|   ########## ###       ### ###        ##########  ########     ###    ########## ##########  |\n"
  +"|                                                                                              |\n" 
  +"|    ::::    ::::      :::     ::::    :::     :::      ::::::::  :::::::::: :::::::::         |\n"
  +"|    +:+:+: :+:+:+   :+: :+:   :+:+:   :+:   :+: :+:   :+:    :+: :+:        :+:    :+:        |\n"
  +"|    +:+ +:+:+ +:+  +:+   +:+  :+:+:+  +:+  +:+   +:+  +:+        +:+        +:+    +:+        |\n"
  +"|    +#+  +:+  +#+ +#++:++#++: +#+ +:+ +#+ +#++:++#++: :#:        +#++:++#   +#++:++#:         |\n"
  +"|    +#+       +#+ +#+     +#+ +#+  +#+#+# +#+     +#+ +#+   +#+# +#+        +#+    +#+        |\n"
  +"|    #+#       #+# #+#     #+# #+#   #+#+# #+#     #+# #+#    #+# #+#        #+#    #+#        |\n"
  +"|    ###       ### ###     ### ###    #### ###     ###  ########  ########## ###    ###        |\n"
  + "|----------------------------------------------------------------------------------------------'"





function init() {

  //Print logo to console when the console window is the right size
  if( process.stdout.columns >= 96 && process.stdout.rows >= 17){
  console.log(employeeManagerLogo);
  }
  else{
    console.log("EMPLOYEE MANAGER");
  }
 
  //Load main menu
  loadMainMenu()
  .then((data) => {processMenuSelection(data)})  // Processes this information recursively
  .catch(err => console.error(err));
 
}
  

init();

