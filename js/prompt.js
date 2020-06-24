var Sentencer = require('sentencer');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

var sillyPrompts = [
  "Once upon a time, {{ an_actor }} walked out of the house to find {{ a_noun }}.",
  "Long ago, {{ an_actor }}...",
  "It was raining, and the {{ actor }} was sad.",
  "If she could just reach the {{ noun }}, it would be the best day EVER.",
];

var seriousPrompts = [
  "Write about a time when you couldn't be with someone you loved.",
  "Describe your first kiss.",
  "All the little things you remember about the best summer of your life.",
  "Your first memory.",
  "What word do you hate the most?",
  "What word do you love the most?",
  "Describe your favorite item of clothing.",
  "Imagine the life your favorite possession had before it came to you.",
  "Imagine one moment when your mother felt exactly like you do right now.",
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

function getPromptSentence(pref) {
  switch (pref) {
    case 'silly': {
      var randomIndex = getRandomInt(sillyPrompts.length);
      var sentence = Sentencer.make(sillyPrompts[randomIndex]);
      return sentence;
    }
    case 'serious': {
      var randomIndex = getRandomInt(seriousPrompts.length);
      var sentence = Sentencer.make(seriousPrompts[randomIndex]);
      return sentence;
    }
    case 'all':
    default: {
      var randomIndex = getRandomInt(allPrompts.length);
      var sentence = Sentencer.make(allPrompts[randomIndex]);
      return sentence;
    }
  }
};

document.addEventListener('DOMContentLoaded', function() {
  var editor = document.getElementById('editor');
  var placeholder = document.getElementById('placeholder');
  var promptTypeRadios = document.querySelectorAll('input[name="prompt-type"]');
  var getPromptBtn = document.getElementById('get-prompt');

  function handleEditorFocus() {
    if (placeholder) {
      editor.removeChild(placeholder);
      editor.focus();
    }
  };
  
  function handleEditorBlur() {
    if (editor.innerHTML) {
      console.log(editor.innerHTML)
    } else {
      var placeholderContent = '<span id="placeholder">Just start typing... <span class="blinking-cursor">|</span></span>';
      editor.appendChild(placeholderContent);
    }
  };

  function persistPromptPreference() {
    localStorage.setItem('wn-prompt-pref', this.value);
  }

  function setPromptPreferenceFromStorage() {
    var pref = localStorage.getItem('wn-prompt-pref');
    if (pref) {
      document.querySelector(`input[value=${pref}]`).setAttribute('checked', true);
    } else {
      document.querySelector('input[value=all').setAttribute('checked', true);
    }
  }

  function refreshPrompt() {
    var preference = localStorage.getItem('wn-prompt-pref');
    var promptSentence = getPromptSentence(preference);
    var prompt = document.getElementById('prompt');
    prompt.innerHTML = promptSentence;
  }

  // get saved preferences
  setPromptPreferenceFromStorage();

  // set up prompt
  refreshPrompt();

  // persist prompt preference
  for (i = 0; i < promptTypeRadios.length; i++) {
    promptTypeRadios[i].addEventListener('click', persistPromptPreference);
  }
  editor.addEventListener('focus', handleEditorFocus);
  editor.addEventListener('blur', handleEditorBlur);
  getPromptBtn.addEventListener('click', refreshPrompt);
});