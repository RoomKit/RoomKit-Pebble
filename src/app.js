var UI = require('ui');
var ajax = require('ajax');
var Vector2 = require('vector2');

var myAPIKey = '';

// Show splash screen while waiting for data
var splashWindow = new UI.Window();

// Text element to inform user
var text = new UI.Text({
  position: new Vector2(0, 0),
  size: new Vector2(144, 168),
  text:'Loading App',
  font:'GOTHIC_28_BOLD',
  color:'black',
  textOverflow:'wrap',
  textAlign:'center',
	backgroundColor:'white'
});

// Add to splashWindow and show
splashWindow.add(text);
splashWindow.show();

var menuItems = [];
menuItems.push({
  title: "Door - Lock",
  subtitle: "Lock the room door",
  code: "lock_door"
});
menuItems.push({
  title: "Door - Unlock",
  subtitle: "Unlock the room door",
  code: "unlock_door"
});
menuItems.push({
  title: "All Lights - ON",
  subtitle: "Turn on all the lights",
  code: "all_lights_on"
});
menuItems.push({
  title: "All Lights - OFF",
  subtitle: "Turn off all the lights",
  code: "all_lights_off"
});
menuItems.push({
  title: "Front Lights - ON",
  subtitle: "Turn on the front side lights",
  code: "front_lights_on"
});
menuItems.push({
  title: "Front Lights OFF",
  subtitle: "Turn on the front side lights",
  code: "front_lights_off"
});
menuItems.push({
  title: "Back Lights ON",
  subtitle: "Turn on the back side lights",
  code: "back_lights_on"
});
menuItems.push({
  title: "Back Lights OFF",
  subtitle: "Turn off the back side lights",
  code: "back_lights_off"
});

// Construct Menu to show to user
var menu = new UI.Menu({
  sections: [{
    title: 'Room Controller',
    items: menuItems
  }]
});

menu.on('select', function(option) {
   // Create the Card for detailed view
  var device;
  var function_name;
  var args = "";
  var title;
  var flag = false;
  var access_token = '';
  
  if(option.item.code == "lock_door"){
    device = '';
    function_name = 'door';
    args = "lock";
    title = 'Door has been locked';
    flag = true;
  }
  
  if(option.item.code == "unlock_door"){
    device = '';
    function_name = 'door';
    args = "unlock";
    title = 'Door has been unlocked';
    flag = true;
  }  
  
  if(option.item.code == "all_lights_on"){
    device = '';
    function_name = 'all_lights';
    args = "on";
    title = 'All lights are now ON';
    flag = true;
  }
  if(option.item.code == "all_lights_off"){
    device = '';
    function_name = 'all_lights';
    args = "off";
    title = 'All lights are now OFF';
    flag = true;
  }
  if(option.item.code == "front_lights_on"){
    device = '';
    function_name = 'front_lights';
    args = "on";
    title = 'Front lights of the room are now ON';
    flag = true;
  }
  
  if(option.item.code == "front_lights_off"){
    device = '';
    function_name = 'front_lights';
    args = "off";
    title = 'Front lights of the room are now OFF';
    flag = true;
  }
  
  if(option.item.code == "back_lights_on"){
    device = '';
    function_name = 'back_lights';
    args = "on";
    title = 'Back lights of the room are now ON';
    flag = true;
  }
  
  if(option.item.code == "back_lights_off"){
    device = '';
    function_name = 'back_lights';
    args = "off";
    title = 'Back lights of the room are now OFF';
    flag = true;
  }
  if (flag){
    ajax(
      {
        url:'https://api.particle.io/v1/devices/'+ device +'/' + function_name,
        method:'POST',
        data: {
          access_token: access_token,
          args: args
        }
      }, 
      function(data){
        var detailCard = new UI.Card({
          title: title,
          body: data
        });
        detailCard.show();
        setTimeout(function(){
          menu.show();
          detailCard.hide();          
        }, 1000);
      }, 
      function(error){
        console.log(error);
      }
    );
  }
});

// Show the Menu, hide the splash
menu.show();
splashWindow.hide();