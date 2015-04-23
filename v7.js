var Firebase = require('firebase')
var fb = new Firebase("https://mobilefriendly.firebaseio.com/");


fb.orderByChild("result").limitToFirst(5).on('child_added', function(snapshot){
//       console.log(snapshot.val())

  if ( snapshot.val().result === "") {

    console.log(snapshot.val())

    }
});
  