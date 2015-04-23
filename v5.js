var casper = require('casper').create();
var x = require('casper').selectXPath;
var fs = require('fs');

casper.renderJSON = function(what) {
    return this.echo(JSON.stringify(what, null, '  '));
};
var links = [casper.cli.get(0)]
var mobileLinks = []
var newLink = {foo:'bar'}

casper.start().eachThen(links, function(response) {
  var newUrl = response.data; 
  this.thenOpen('https://www.google.com/webmasters/tools/mobile-friendly/?url='+response.data, function(response) {
//     console.log('Opened', response.url);

    this.waitForSelector('.result-container', function then(){

//       this.captureSelector('/'+(response.url).toString()+".png", '.result-container');
//       this.captureSelector('yoursitelist.png', '.result-container');
//       this.echo(this.fetchText('.mobile-friendly-banner'));
      var newLink = {url:newUrl, result:this.fetchText('.mobile-friendly-banner')};
    this.echo(JSON.stringify(newLink))

//       mobileLinks.push(newLink);
    }, function onTimeout(){
          this.echo(JSON.stringify({result:'timeout', url:newUrl}))

    }, 90000)
  });
});



casper.run(function() {
//     this.echo('So the whole suite ended.');
    this.exit(); // <--- don't forget me!
});

