export function manageEmail() {
  const editor = document.getElementById('editor');
  const prompt = document.getElementById('prompt');
  const saveToEmailBtn = document.getElementById('save-to-email');
  const saveToFileBtn = document.getElementById('save-to-file');
  const rememberEmail =  document.getElementById('remember-email');

  function setEmailFromStorage() {
    const email = localStorage.getItem('wn-email');
    if (email) {
      const emailInput = document.getElementById('email');
      emailInput.value = email;
      rememberEmail.setAttribute('checked', true);
    }
  };

  function handleRememberEmail() {
    const targetEmail = document.getElementById('email').value;
    if (rememberEmail.checked && targetEmail) {
      localStorage.setItem('wn-email', targetEmail);
    } else if (!rememberEmail.checked) {
      localStorage.removeItem('wn-email');
    }
  };

  function processRawValueForEmail(rawValue) {
    let processedValue = rawValue.replace(/(<([^>]+)>)|\n/ig, '%0D%0A');
    processedValue = processedValue.replace(/ /ig, '%20');
    return processedValue;
  };

  function makeTextFile(text) {
    const title = prompt.innerText + '\n';
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

  function handleSaveToEmail() {
    // get email values
    const targetEmail = document.getElementById('email').value;
    const emailSubject = new Date().toLocaleDateString() + ': ' + processRawValueForEmail(prompt.innerHTML);
    const emailBody = processRawValueForEmail(editor.value);

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
  setEmailFromStorage();

  // event listeners
  saveToEmailBtn.addEventListener('click', handleSaveToEmail);
  saveToFileBtn.addEventListener('click', handleSaveTextToFile);
  rememberEmail.addEventListener('change', handleRememberEmail);
};