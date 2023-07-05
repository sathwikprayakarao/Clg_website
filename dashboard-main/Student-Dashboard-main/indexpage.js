//import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaKfL3DsdN3CkRqIFMyzweyeY6M9KVvXU",
  authDomain: "department-databse.firebaseapp.com",
  projectId: "department-databse",
  storageBucket: "department-databse.appspot.com",
  messagingSenderId: "285287729299",
  appId: "1:285287729299:web:ac28a6f9669b5bb899e566"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Set up our register function
function register() {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value
  //Department_names = document.getElementById('Department_names').value
  //milk_before_cereal = document.getElementById('milk_before_cereal').value
  // Validate input fields
  /*if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
  }
  if (validate_field(full_name) == false || validate_field(Department_names) == false || validate_field(milk_before_cereal) == false) {
    alert('One or More Extra Fields is Outta Line!!')
    return
  }*/
  var user_data = {
    email : email,
    full_name : full_name,
    //Department_names : Department_names,
    //milk_before_cereal : milk_before_cereal,
    last_login : Date.now()
  }

  // Push to Firebase Database
  firebase.database().ref('users/').set(user_data)
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    //var user = auth.currentUser

    // Add this user to Firebase Database
    //var database_ref = database.ref()

    // Create User data
    var user_data = {
      email : email,
      full_name : full_name,
      //Department_names : Department_names,
      //milk_before_cereal : milk_before_cereal,
      last_login : Date.now()
    }

    // Push to Firebase Database
    firebase.database().ref('users/').set(user_data)

    // Dne
    alert('User Created!!')
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

// Set up our login function
function login () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)

    // DOne
    alert('User Logged In!!')

  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}




// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/.test(str);
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}
 
function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}