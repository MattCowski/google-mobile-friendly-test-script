var Firebase = require('firebase')
var fb = new Firebase("https://mobilefriendly.firebaseio.com/");


var spawn = require('child_process').spawn;


fb.orderByChild("result").limitToFirst(5).on('child_added', function(snapshot){
  if ( snapshot.val().result === "") {
    var ls = spawn('casperjs', ['v5.js', snapshot.val().url]);
    console.log('running casperjs task for '+snapshot.val().url)

    ls.stdout.on('data', function (data) {
//       console.log('stdout: ' + data);
      fb.child(snapshot.key()).update(JSON.parse(data))
    });

    ls.stderr.on('data', function (data) {
      console.log('stderr: ' + data);
    });

    ls.on('close', function (code) {
      if (code !== 0) {
        console.log('child process exited with code ' + code);      
      }
    });
  
  };
  
  
  
});

