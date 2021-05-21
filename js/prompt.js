var Sentencer = require('sentencer');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

var sillyPrompts = [
  "Once upon a time, {{ an_actor }} walked out of the house to find {{ a_noun }}.",
  "Long ago, {{ an_actor }}...",
  "It was raining, and the {{ actor }} was sad.",
  "If she could just reach the {{ noun }}, it would be the best day EVER.",
  "{{ a_noun }}, {{ a_noun }}, {{ a_noun }}.",
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

var timePeriods = [
  "Victorian era",
  "Jurassic era",
  "Paleolithic era",
  "Sixties",
  "Seventies",
  "Eightees",
  "Roaring Twenties",
  "Great Depression",
  "Dark Ages",
  "Renaissance",
  "Roman Empire",
  "Classical era",
  "ancient world",
  "prehistoric world",
  "Age of Pharaohs",
];

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

function getEra() {
  var randomIndex = getRandomIndex(timePeriods.length);
  return timePeriods[randomIndex];
};

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
};

Sentencer.configure({
  actions: {
    actor: getActor,
    an_actor: function() {
      return getOne(getActor);
    },
    era: getEra,
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
  var promptTypeRadios = document.querySelectorAll('input[name="prompt-type"]');
  var getPromptBtn = document.getElementById('get-prompt');
  var wordCount = document.getElementById('wordcount');
  var saveToEmailBtn = document.getElementById('save-to-email');
  var rememberEmail =  document.getElementById('remember-email');

  function updateWordCount() {
    var words = editor.innerText.replace(/\n/g, ' ').split(' ').filter(w => w.length);
    wordCount.innerText = words.length;
  };

  function persistPromptPreference() {
    localStorage.setItem('wn-prompt-pref', this.value);
  };

  function setPromptPreferenceFromStorage() {
    var pref = localStorage.getItem('wn-prompt-pref');
    if (pref) {
      document.querySelector(`input[value=${pref}]`).setAttribute('checked', true);
    } else {
      document.querySelector('input[value=all]').setAttribute('checked', true);
    }
  };

  function setEmailFromStorage() {
    var email = localStorage.getItem('wn-email');
    if (email) {
      var emailInput = document.getElementById('email');
      emailInput.value = email;
      rememberEmail.setAttribute('checked', true);
    }
  };

  function refreshPrompt() {
    var preference = localStorage.getItem('wn-prompt-pref');
    var promptSentence = getPromptSentence(preference);
    var prompt = document.getElementById('prompt');
    prompt.innerHTML = promptSentence;
  };

  function handleRememberEmail() {
    var targetEmail = document.getElementById('email').value;
    if (rememberEmail.checked && targetEmail) {
      localStorage.setItem('wn-email', targetEmail);
    } else if (!rememberEmail.checked) {
      localStorage.removeItem('wn-email');
    }
  }

  function handleEditorChange() {
    updateWordCount();
  };

  function handleSaveToEmail() {
    // get email values
    var targetEmail = document.getElementById('email').value;
    var emailBody = editor.innerHTML.replace(/(<([^>]+)>)/ig, '%0D%0A')
    emailBody = emailBody.replace(/ /ig, '%20');

    // create email content and simulate click
    var emailLink = document.createElement('a');
    emailLink.setAttribute('href', `mailto:${targetEmail}?subject=Writing&body=${emailBody}`);
    emailLink.setAttribute('id', 'hiddenEmailBtn');
    emailLink.setAttribute('target', '_blank');
    emailLink.classList.add('hidden');
    document.body.appendChild(emailLink);
    var hiddenEmailBtn = document.getElementById('hiddenEmailBtn');
    hiddenEmailBtn.click();
    document.body.removeChild(hiddenEmailBtn);
  };

  // get saved preferences
  setPromptPreferenceFromStorage();
  setEmailFromStorage();

  // set up prompt
  refreshPrompt();

  // set initial wordcount
  updateWordCount();

  // focus on editor
  editor.focus();

  // persist prompt preference
  for (i = 0; i < promptTypeRadios.length; i++) {
    promptTypeRadios[i].addEventListener('click', persistPromptPreference);
  }

  // event listeners
  editor.addEventListener('input', handleEditorChange);
  getPromptBtn.addEventListener('click', refreshPrompt);
  saveToEmailBtn.addEventListener('click', handleSaveToEmail);
  rememberEmail.addEventListener('change', handleRememberEmail);
});