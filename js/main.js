import { managePrompt } from './prompt.js';
import { manageWordCount } from './wordcount.js';
import { manageSave } from './save.js';

document.addEventListener('DOMContentLoaded', function() {
  const year = document.getElementById('year');
  year.innerText = new Date().getFullYear();

  manageSave();
  managePrompt();
  manageWordCount();
});