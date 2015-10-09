var myVar;
function startTimer() {
  myVar = setInterval(function(){myTimer()},1000);
  timelimit = maxtimelimit;
}
function myTimer() { 
  if (timelimit > 0) { 
    curmin=Math.floor(timelimit/60); 
    cursec=timelimit%60; 
    if (curmin!=0) { curtime=curmin+" minuter och "+cursec+" sekunder kvar"; } 
              else { curtime=cursec+" sekunder kvar"; } 
    $_('timeleft').innerHTML = curtime; 
  } else { 
    $_('timeleft').innerHTML = timelimit+' - Slut på tiden'; 
//    clearInterval(myVar); 
    checkAnswer(); 
  } 
  timelimit--; 
}  

var pos = 0, posn, choice, correct = 0, rscore = 0;
var maxtimelimit = 20, timelimit = maxtimelimit; 

var questions = [
    [ "Vem är äldst?", "Timonov", "Transistorradion", "Fitthasse", "B" ],
    [ "kuk?", "2", "2", "1", "C" ],
    [ "What is 7 x 3?", "1", "2", "2", "A" ],
    [ "What is 8 / 4?", "2", "1", "2", "B" ]
];
var questionOrder = [];
function setQuestionOrder() {
  questionOrder.length = 0;
  for (var i=0; i<questions.length; i++) { questionOrder.push(i); }
  questionOrder.sort(randOrd);   
  pos = 0;  posn = questionOrder[pos];
}

function $_(IDS) { return document.getElementById(IDS); }
function randOrd() { return (Math.round(Math.random())-0.5); }
function renderResults(){
  var test = $_("test");
  test.innerHTML = "<h2>Du fick "+correct+" av "+questions.length+" rätt</h2>";
  $_("test_status").innerHTML = "Klar";
  $_('timeleft').innerHTML = '';
  test.innerHTML += '<button onclick="location.reload()">Gör om testet</a> ';
  setQuestionOrder();
  correct = 0;
  clearInterval(myVar);
  return false;

}
function renderQuestion() {
  var test = $_("test");
  $_("test_status").innerHTML = "Fråga "+(pos+1)+" av "+questions.length;
  if (rscore != 0) { $_("test_status").innerHTML += '<br>Currently: '+(correct/rscore*100).toFixed(0)+'% Rätt'; }
  var question = questions[posn][0];
  var chA = questions[posn][1];
  var chB = questions[posn][2];
  var chC = questions[posn][3];
  test.innerHTML = "<h3>"+question+"</h3>";
  test.innerHTML += "<span><label><input onclick='checkAnswer()' type='radio' name='choices' value='A'> "+chA+"</label></span>";
  test.innerHTML += "<span><label><input onclick='checkAnswer()' type='radio' name='choices' value='B'> "+chB+"</label></span>";
  test.innerHTML += "<span><label><input onclick='checkAnswer()' type='radio' name='choices' value='C'> "+chC+"</label></span>";

  timelimit = maxtimelimit;
  clearInterval(myVar);
  startTimer();
}

function checkAnswer(){
  var choices = document.getElementsByName("choices");
  for (var i=0; i<choices.length; i++) {
    if (choices[i].checked) { choice = choices[i].value; }
  }
  rscore++;
  if (choice == questions[posn][4] && timelimit > 0) { correct++;  } else {
    swal({   
      title: "Här är Alexander",
      text: "Han säger att du svarade fel.",
      imageUrl: "hasse.jpg" });
  }
  pos++;  posn = questionOrder[pos];
  if (pos < questions.length) { renderQuestion(); } else { renderResults();  }

}

window.onload = function() {
  setQuestionOrder();
  renderQuestion();
}

