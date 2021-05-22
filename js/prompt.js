import { getPromptSentence } from './sentencer.js';

export function managePrompt() {
  const promptTypeRadios = document.querySelectorAll('input[name="prompt-type"]');
  const getPromptBtn = document.getElementById('get-prompt');
  const prompt = document.getElementById('prompt');

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

  function refreshPrompt() {
    const preference = localStorage.getItem('wn-prompt-pref');
    const promptSentence = getPromptSentence(preference);
    prompt.innerHTML = promptSentence;
  };

  // get saved preferences
  setPromptPreferenceFromStorage();

  // setup
  refreshPrompt();

  // event listeners
  for (let i = 0; i < promptTypeRadios.length; i++) {
    promptTypeRadios[i].addEventListener('click', persistPromptPreference);
  }
  getPromptBtn.addEventListener('click', refreshPrompt);
};