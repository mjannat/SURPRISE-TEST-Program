(function() {
  var questions = [{
    question: "Who invented C Language.?",
    choices: ["Charles Babbage", "Grahambel", " Dennis Ritchie", "Steve Jobs", "No One"],
    correctAnswer: 2
  }, {
    question: " C Language is a successor to which language.?",
    choices: ["FORTRAN", "D Language", "BASIC", "B Language", "PHP"],
    correctAnswer: 3
  }, {
    question: "C is a which level language.?",
    choices: ["Low Level", "High Level", "Low + High", "None"],
    correctAnswer: 0
  }, {
    question: "C is _______ type of programming language.?",
    choices: ["Object Oriented", "Procedural", "Bit level language", "Functional", "Non Procedural"],
    correctAnswer: 1
  }, {
    question: "C language was invented to develop which Operating System.?",
    choices: ["Android", "Linux", "Ubuntu", "Unix", "Windows"],
    correctAnswer: 3
  }];
  
  var qCounter = 0; 
  var qselect = [];
  var quiz = $('#quiz');
  
  displayNext();
  
  $('#next').on('click', function (e) {
    choose();
    
    if (isNaN(qselect[qCounter])) {
      alert('Please select your answer');
    } else {
      qCounter++;
      displayNext();
    }
  });
  
  $('#prev').on('click', function (e) {
    choose();
    qCounter--;
    displayNext();
  });
    $('#start').on('click', function (e) {
    
    qCounter = 0;
    qselect = [];
    displayNext();
    $('#start').hide();
  });
  
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question  ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
    function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<ul>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
    function choose() {
    qselect[qCounter] = +$('input[name="answer"]:checked').val();
  }
    function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(qCounter < questions.length){
        var nextQuestion = createQuestionElement(qCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(qselect[qCounter]))) {
          $('input[value='+qselect[qCounter]+']').prop('checked', true);
        }
                if(qCounter === 1){
          $('#prev').show();
        } else if(qCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var result = 0;
    for (var i = 0; i < qselect.length; i++) {
      if (qselect[i] === questions[i].correctAnswer) {
        result++;
      }
    }
    
    score.append('You got ' + result + ' score out of ' +
                 questions.length + ' questions');
    return score;
  }
})();