import { managePrompt } from './prompt.js';
import { manageEmail } from './email.js';
import { manageWordCount } from './wordcount.js';

document.addEventListener('DOMContentLoaded', function() {
  const year = document.getElementById('year');
  year.innerText = new Date().getFullYear();

  manageEmail();
  managePrompt();
  manageWordCount();
});