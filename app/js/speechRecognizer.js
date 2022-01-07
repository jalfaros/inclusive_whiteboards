//Variable para que hable
const synth = window.speechSynthesis;
let speaking = true;

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var phrases = [ 'lee la pizarra' , 'leer pizarra', 'leer la pizarra'];
var grammar = '#JSGF V1.0; grammar phrases; public <word> = ' + phrases.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'es-ES';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = '';

  document.body.onclick = function() {
    recognition.start();
    //cardsRead("Hola.");
    console.log('Ready to receive a word command.');
    console.log(listColumns);
  }

  recognition.onresult = function(event) {
    var word = event.results[0][0].transcript;
    console.log(word);
    
    phrases.forEach(element => {
        if (element === word.toLowerCase()){
            readWorkflow();   
        }
    });
    
    //console.log('Confidence: ' + event.results[0][0].confidence);
  }
  
  recognition.onspeechend = function() {
    recognition.stop();
  }
  
  recognition.onnomatch = function(event) {
    diagnostic = "I didn't recognise that word.";
  }
  
  recognition.onerror = function(event) {
    diagnostic = 'Error occurred in recognition: ' + event.error;
  }

  //Function to read columns and cards
const cardsRead = (htmlObj) => {
    console.log('leyendo');

    utter = new SpeechSynthesisUtterance();
    utter.lang = 'es-ES';
    utter.volume = 0.5;
    utter.onend = function() 
    {
        console.log('La lectura ha finalizado');
    }

    utter.text = htmlObj;
    synth.speak(utter);

}

const readWorkflow = ()=> {
  
  //cardsRead('Hola mundo, hola yo me llamo nacho, me gusta mucho jugar play jajaja, hola a todos guapos.')
  listColumns.forEach(({statusName, cards}) => {
    
    cardsRead(`Columna: ${statusName}`);
    if (cards) {
      cards.forEach(({stickyDescription}, i)=>{
        console.log(cards, statusName);
        
        cardsRead(`La columna: ${statusName}, contiene la tarjeta: ${i+1}, con la descripción: ${stickyDescription}.`);

      });
    }
  });
}

const spaceEvent = (e) =>{
  e.preventDefault();
  
  if(e.keyCode === 32) {

    speaking? (
      synth.pause(),
      speaking = false
    ):(
      synth.resume(),
      speaking = true
    )

  }
}

document.body.addEventListener('keyup', spaceEvent, true);