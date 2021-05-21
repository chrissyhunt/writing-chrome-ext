# "Email Myself" flow

Currently not working -- email body doesn't seem to register newlines. If I can fix that, here's there rest of the code:

```
var saveToEmailBtn = document.getElementById('save-to-email');
var rememberEmail =  document.getElementById('remember-email');

function setEmailFromStorage() {
  var email = localStorage.getItem('wn-email');
  if (email) {
    var emailInput = document.getElementById('email');
    emailInput.value = email;
    rememberEmail.setAttribute('checked', true);
  }
};

function handleRememberEmail() {
  var targetEmail = document.getElementById('email').value;
  if (rememberEmail.checked && targetEmail) {
    localStorage.setItem('wn-email', targetEmail);
  } else if (!rememberEmail.checked) {
    localStorage.removeItem('wn-email');
  }
};

function handleSaveToEmail() {
  // get email values
  var targetEmail = document.getElementById('email').value;
  var emailBody = editor.innerHTML.replace(/(<([^>]+)>)/ig, '%0D%0A')
  emailBody = emailBody.replace(/ /ig, '%20');
  // TODO: Figure out why line breaks don't show up in email

  // create email content and simulate click
  var emailLink = document.createElement('a');
  emailLink.setAttribute('href', `mailto:${targetEmail}?body=${emailBody}`);
  emailLink.setAttribute('id', 'hiddenEmailBtn');
  emailLink.setAttribute('target', '_blank');
  emailLink.classList.add('hidden');
  document.body.appendChild(emailLink);
  var hiddenEmailBtn = document.getElementById('hiddenEmailBtn');
  hiddenEmailBtn.click();
  document.body.removeChild(hiddenEmailBtn);
};

saveToEmailBtn.addEventListener('click', handleSaveToEmail);
rememberEmail.addEventListener('change', handleRememberEmail);
```

In the startup flow, call `setEmailFromStorage()`.

And here's the HTML for the `footer`:

```
<div class="popover popover-top">
  <button class="btn btn-primary">Save My Progress</button>
  <div class="popover-container">
    <div class="card">
      <div class="card-header">
        <h5>Save My Progress</h5>
      </div>
      <div class="card-body">
        <p>Enter your email address to email what you've written to yourself.</p>
        <div class="form-group">
          <input class="form-input" aria-label="Email" type="email" id="email" placeholder="me@myemail.com">
          <label class="form-checkbox">
            <input type="checkbox" id="remember-email">
            <i class="form-icon"></i> Remember my email next time
          </label>
        </div>
      </div>
      <div class="card-footer">
        <button class="btn btn-primary" id="save-to-email">Save</button>
      </div>
    </div>
  </div>
</div>
```