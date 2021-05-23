export function manageWordCount() {
  const editor = document.getElementById('editor');
  const currentWordCountDisplay = document.getElementById('wordcount');
  const saveWordCountTargetBtn = document.getElementById('wc-save');
  const wordCountTargetInput = document.getElementById('wc-target-input');
  const wordCountTargetContainer = document.getElementById('wordcount-target');
  const wordCountProgressContainer = document.getElementById('wordcount-progress');
  const wordCountProgressBar = document.getElementById('wordcount-progress-bar');

  function handleSaveWordCountTarget() {
    persistWordCountTarget();
    setTargetWordCountFromStorage();
  };

  function persistWordCountTarget() {
    localStorage.setItem('wn-wc-target', wordCountTargetInput.value);
  };

  function updateWordCount() {
    const words = editor.value.replace(/\n/g, ' ').split(' ').filter(w => w.length);
    currentWordCountDisplay.innerText = words.length;
  };

  function setTargetWordCountFromStorage() {
    const target = localStorage.getItem('wn-wc-target');
    if (target) {
      wordCountProgressContainer.classList.remove('hidden');
      wordCountTargetContainer.classList.add('hidden');
    }
  };

  function handleEditorChange() {
    updateWordCount();
  };

  // set preferences
  setTargetWordCountFromStorage();

  // setup
  updateWordCount();
  editor.focus();

  // event listeners
  editor.addEventListener('input', handleEditorChange);
  saveWordCountTargetBtn.addEventListener('click', handleSaveWordCountTarget);
};