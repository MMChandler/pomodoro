/*This code is designed to display a timer that counts down from the selected time to 0, followed by a five minute break timer.
Author: Michael M. Chandler, December 2015. 
Audio clip for chime courtesy of username skowm_001 at freesound.org.*/
var timerInterval; 
var timerMinutes = 25; 
var timerSeconds = 0;  
var sessionCount = 0;
var workHTML = "<i class='fa fa-paperclip' id='paperclip''>&nbsp</i>&nbspWork";
var breakHTML = "<i class='fa fa-coffee' id='coffee'>&nbsp</i>&nbspBreak";
var defaultHTML = "<i class='fa fa-coffee' id='coffee'>&nbsp</i>&nbsp<i class='fa fa-paperclip' id='paperclip''>&nbsp</i>&nbsp";
//CLOCK||||||||||||||||||||||||||||||
var timeNow = setInterval(function(){
  displayCurrentTime();}, 1000);
function displayCurrentTime() {
  var dateTimeNow = new Date();
  document.getElementById("timeNow").innerHTML = dateTimeNow.toLocaleTimeString();
}//END clock
//BEGIN MAIN PAGE FUNCTIONS========================================= 
//flash the timer's seperator colon:
(function blink() {$('#seperator').fadeOut(700).fadeIn(700, blink);})();//END flash
///add 5 min: ||||||||||||||||||||||||||||||
function addFive() {
 parseInt(document.getElementById("minutes").innerHTML);
  timerMinutes += 5;
  document.getElementById("minutes").innerHTML = timerMinutes;
}//END +5
///Subtract 5 min ||||||||||||||||||||||||||
function subtractFive() {
 parseInt(document.getElementById("minutes").innerHTML);
  if (timerMinutes >= 5) {
    timerMinutes -= 5;
    document.getElementById("minutes").innerHTML = timerMinutes;
  }
}//END -5
//||||||||| RESET |||||||||||||||||||||||||||
//Reset the timer to the default value of 25m:
function resetTimer() {
  document.getElementById("start").disabled = false;
  document.getElementById("minutes").innerHTML = "25";
  document.getElementById("seconds").innerHTML = "00";
  document.getElementById("status").innerHTML = "Work Time";
  document.getElementById("statusIcon").innerHTML = defaultHTML;
  //sessionCount = 1;
  work = true;
  timerMinutes = 25;
  timerSeconds = 0;
  clearInterval(timerInterval);
  //document.getElementById("status").innerHTML = "Work Time";
}//END reset

//||||||| TIMER |||||||||||||||||||||||||||||
//Handles both work & break timing.
document.getElementById("start").onclick = function(){
  timerInterval = setInterval(function(){startTimer();}, 1000);
  startTimer();
}
var work = true; 
function startTimer(){
  document.getElementById("start").disabled = true;
  //document.getElementById("statusIcon").innerHTML = workHTML;
  if (work===true){
    document.getElementById("status").innerHTML = "Work Time";
    document.getElementById("statusIcon").innerHTML = workHTML;
  }else {
    document.getElementById("status").innerHTML = "Break Time";
    document.getElementById("statusIcon").innnerHTML = breakHTML;
  }
 timerMinutes = parseInt(document.getElementById("minutes").innerHTML);
  if (timerSeconds === 0 && timerMinutes === 0){
    //sessionCount++;
    document.getElementById("chime").cloneNode(true).play();
    if (work == true){
      work = false;
      document.getElementById("status").innerHTML = "Break Time";
      document.getElementById("statusIcon").innerHTML = breakHTML;
      timerMinutes = 4;
      timerSeconds = 60;
    }else {
      work = true;
      document.getElementById("status").innerHTML = "Work Time";
      document.getElementById("statusIcon").innerHTML = workHTML;
      timerMinutes = 24;
      timerSeconds = 60;
          }
    document.getElementById("seconds").innerHTML = timerSeconds;
    document.getElementById("minutes").innerHTML = timerMinutes;
    timerSeconds--;
  }else if (timerSeconds === 0){
    timerMinutes--;
    timerSeconds = 59;
    document.getElementById("minutes").innerHTML = timerMinutes;
    document.getElementById("seconds").innerHTML = timerSeconds;
    
  }else{
    timerSeconds--;
    if (timerSeconds > 9){
    document.getElementById("seconds").innerHTML = timerSeconds;
    }else {
      document.getElementById("seconds").innerHTML = "0" + timerSeconds;
    }
  }
}//END 

