export function manageSave() {
  const editor = document.getElementById('editor');
  const prompt = document.getElementById('prompt');
  const saveToFileBtn = document.getElementById('save-to-file');

  function makeTextFile(text) {
    const title = 'PROMPT: ' + prompt.innerText + '\n';
    const date = new Date().toLocaleDateString() + '\n\n';
    const data = new Blob([title, date, text], { type: 'text/plain' });

    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    const textFile = window.URL.createObjectURL(data);

    return textFile;
  };

  function handleSaveTextToFile() {
    const date = new Date();
    const fileName = `prompt-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    const textFile = makeTextFile(editor.value);

    const link = document.createElement('a');
    link.href = textFile;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  saveToFileBtn.addEventListener('click', handleSaveTextToFile);
};