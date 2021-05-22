import { getPromptSentence } from './prompt.js';

document.addEventListener('DOMContentLoaded', function() {
  const editor = document.getElementById('editor');
  const promptTypeRadios = document.querySelectorAll('input[name="prompt-type"]');
  const getPromptBtn = document.getElementById('get-prompt');
  const wordCount = document.getElementById('wordcount');
  const saveToEmailBtn = document.getElementById('save-to-email');
  const rememberEmail =  document.getElementById('remember-email');
  const prompt = document.getElementById('prompt');

  function updateWordCount() {
    const words = editor.innerText.replace(/\n/g, ' ').split(' ').filter(w => w.length);
    wordCount.innerText = words.length;
  };

  function persistPromptPreference() {
    localStorage.setItem('wn-prompt-pref', this.value);
  };

  function setPromptPreferenceFromStorage() {
    const pref = localStorage.getItem('wn-prompt-pref');
    if (pref) {
      document.querySelector(`input[value=${pref}]`).setAttribute('checked', true);
    } else {
      document.querySelector('input[value=all]').setAttribute('checked', true);
    }
  };

  function setEmailFromStorage() {
    const email = localStorage.getItem('wn-email');
    if (email) {
      const emailInput = document.getElementById('email');
      emailInput.value = email;
      rememberEmail.setAttribute('checked', true);
    }
  };

  function refreshPrompt() {
    const preference = localStorage.getItem('wn-prompt-pref');
    const promptSentence = getPromptSentence(preference);
    prompt.innerHTML = promptSentence;
  };

  function handleRememberEmail() {
    const targetEmail = document.getElementById('email').value;
    if (rememberEmail.checked && targetEmail) {
      localStorage.setItem('wn-email', targetEmail);
    } else if (!rememberEmail.checked) {
      localStorage.removeItem('wn-email');
    }
  }

  function handleEditorChange() {
    updateWordCount();
  };

  function processStringForEmail(rawValue) {
    let processedValue = rawValue.replace(/(<([^>]+)>)/ig, '%0D%0A');
    processedValue = processedValue.replace(/ /ig, '%20');
    return processedValue;
  }

  function handleSaveToEmail() {
    // get email values
    const targetEmail = document.getElementById('email').value;
    const emailSubject = new Date().toLocaleDateString() + ': ' + processStringForEmail(prompt.innerHTML);
    const emailBody = processStringForEmail(editor.innerHTML);

    // create email content and simulate click
    const emailLink = document.createElement('a');
    emailLink.setAttribute('href', `mailto:${targetEmail}?subject=${emailSubject}&body=${emailBody}`);
    emailLink.setAttribute('id', 'hiddenEmailBtn');
    emailLink.setAttribute('target', '_blank');
    emailLink.classList.add('hidden');
    document.body.appendChild(emailLink);
    const hiddenEmailBtn = document.getElementById('hiddenEmailBtn');
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
  for (let i = 0; i < promptTypeRadios.length; i++) {
    promptTypeRadios[i].addEventListener('click', persistPromptPreference);
  }

  // event listeners
  editor.addEventListener('input', handleEditorChange);
  getPromptBtn.addEventListener('click', refreshPrompt);
  saveToEmailBtn.addEventListener('click', handleSaveToEmail);
  rememberEmail.addEventListener('change', handleRememberEmail);
});