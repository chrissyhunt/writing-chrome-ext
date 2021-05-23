export function manageWordCount() {
  const editor = document.getElementById('editor');
  const currentWordCountDisplay = document.getElementById('wordcount');

  function getWordCount(rawText) {
    const words = rawText.replace(/\n/g, ' ').split(' ').filter(w => w.length);
    return words ? words.length : 0;
  };

  function updateWordCountDisplay() {
    currentWordCountDisplay.innerText = getWordCount(editor.value);
  };

  function handleEditorChange() {
    updateWordCountDisplay();
  };

  // setup
  updateWordCountDisplay();
  editor.focus();

  // event listeners
  editor.addEventListener('input', handleEditorChange);
};