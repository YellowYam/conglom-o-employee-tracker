const bcrypt = require('bcrypt');               //Importing the NPM bcrypt package.
const saltRounds = 10;                          //We are setting salt rounds, higher is safer.
const myPlaintextPassword = ''; //Unprotected password
const hash = "$2b$10$pipQC4y8evva8jf3thP3q./Bb87l7nP9EqF7aMBJel6ZpoDzFJzmu";


/* Here we are getting the hashed password from the callback,
we can save that hash in the database */
  bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
   //save the hash in the db
  err ? console.error(err) : console.log(hash);
 });

/* Here we can compare the hashed password after we get it from
the database with the plaintext password */

// https://www.codespot.org/hashing-passwords-in-nodejs/