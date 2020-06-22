var Sentencer = require('sentencer');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

var sillyPrompts = [
  "Once upon a time, {{ an_actor }} walked out of the house to find {{ a_noun }}.",
  "One time, long ago, {{ an_actor }}...",
];

var seriousPrompts = [
  "Write about a time when you couldn't be with someone you loved.",
];

var allPrompts = sillyPrompts.concat(seriousPrompts);

var actors = [
  'man',
  'woman',
  'boy',
  'girl',
  'robot',
  'android',
  'magical unicorn',
  'princess',
  'dragon',
  'puppy',
  'kitten',
  'frog that was secretly a prince',
];

function getActor() {
  var randomIndex = getRandomInt(actors.length);
  return actors[randomIndex];
};

function getOne(getFn) {
  var vowels = ['a', 'e', 'i', 'o', 'u'];
  var item = getFn();
  if (vowels.includes(item[0])) {
    item = 'an ' + item;
  } else {
    item = 'a ' + item;
  }
  return item;
}

Sentencer.configure({
  actions: {
    actor: getActor,
    an_actor: function() {
      return getOne(getActor);
    },
  }
});

function getPromptSentence() {
  var sentence = Sentencer.make("Once upon a time, {{ an_actor }} walked out of the house to find {{ a_noun }}.");
  return sentence;
};

function handleEditorFocus() {
  var editor = document.getElementById('editor');
  var placeholder = document.getElementById('placeholder');
  if (placeholder) {
    editor.removeChild(placeholder);
    editor.focus();
  }
};

function handleEditorBlur() {
  var editor = document.getElementById('editor');
  if (editor.innerHTML) {
    console.log(editor.innerHTML)
  } else {
    var placeholder = '<span id="placeholder">Just start typing... <span class="blinking-cursor">|</span></span>';
    editor.appendChild(placeholder);
  }
};

document.addEventListener('DOMContentLoaded', function() {
  // set up prompt
  var promptSentence = getPromptSentence();
  var prompt = document.getElementById('prompt');
  prompt.innerHTML = promptSentence;

  var editor = document.getElementById('editor');
  editor.addEventListener('focus', handleEditorFocus);
  editor.addEventListener('blur', handleEditorBlur);
});