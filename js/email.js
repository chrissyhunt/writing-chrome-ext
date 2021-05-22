export function manageEmail() {
  const editor = document.getElementById('editor');
  const prompt = document.getElementById('prompt');
  const saveToEmailBtn = document.getElementById('save-to-email');
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
  rememberEmail.addEventListener('change', handleRememberEmail);
};