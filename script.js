// Load URL parameters on page load
window.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get('type');
  const msg = urlParams.get('msg');

  if (type && msg) {
    switchTab(type);
    document.getElementById('generated-message').textContent = decodeURIComponent(msg);
    document.getElementById('message-display').style.display = 'block';
  }
});

// Tab switching
const tabButtons = document.querySelectorAll('.tab-btn');
tabButtons.forEach(button => {
  button.addEventListener('click', function() {
    const tab = this.getAttribute('data-tab');
    switchTab(tab);
  });
});

function switchTab(tab) {
  // Update active tab button
  tabButtons.forEach(btn => btn.classList.remove('active'));
  document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

  // Update active form
  document.querySelectorAll('.form-container').forEach(form => {
    form.classList.remove('active');
  });
  document.getElementById(`${tab}-form`).classList.add('active');

  // Hide message display
  document.getElementById('message-display').style.display = 'none';
}

// Birthday message generation
function generateBirthdayMessage() {
  const name = document.getElementById('birthday-name').value.trim();
  const age = document.getElementById('birthday-age').value.trim();

  if (!name) {
    alert('Please enter a name');
    return;
  }

  const messages = [
    `Happy ${age ? age + 'th ' : ''}Birthday, ${name}! 🎂 May your day be filled with joy, laughter, and all the things that make you smile. Here's to another year of wonderful memories!`,
    `Wishing you the happiest of birthdays, ${name}! ${age ? `${age} looks amazing on you! ` : ''}May this year bring you endless happiness and success. 🎉`,
    `Happy Birthday to the incredible ${name}! ${age ? `Cheers to ${age} years! ` : ''}May your special day be as wonderful as you are. 🎈`
  ];

  displayMessage(messages[Math.floor(Math.random() * messages.length)], 'birthday');
}

// Anniversary message generation
function generateAnniversaryMessage() {
  const name = document.getElementById('anniversary-name').value.trim();
  const years = document.getElementById('anniversary-years').value.trim();

  if (!name) {
    alert('Please enter a name');
    return;
  }

  const messages = [
    `Happy ${years ? years + ' Year ' : ''}Anniversary, ${name}! 💕 Here's to the beautiful journey you've shared together. May your love continue to grow stronger with each passing day.`,
    `Congratulations on ${years ? years + ' wonderful years' : 'your anniversary'}, ${name}! ❤️ Your love story is truly inspiring. Wishing you many more years of happiness together!`,
    `Happy Anniversary, ${name}! ${years ? `${years} years of love, laughter, and memories! ` : ''}May your bond continue to deepen and your hearts stay forever intertwined. 🌹`
  ];

  displayMessage(messages[Math.floor(Math.random() * messages.length)], 'anniversary');
}

// Achievement message generation
function generateAchievementMessage() {
  const name = document.getElementById('achievement-name').value.trim();
  const achievement = document.getElementById('achievement-text').value.trim();

  if (!name || !achievement) {
    alert('Please enter both name and achievement');
    return;
  }

  const messages = [
    `Congratulations, ${name}! 🎊 Your achievement in ${achievement} is absolutely remarkable. Your hard work and dedication have truly paid off!`,
    `Way to go, ${name}! 🌟 Your success in ${achievement} is well-deserved. Keep reaching for the stars!`,
    `Incredible work, ${name}! 🏆 Your accomplishment in ${achievement} is inspiring. This is just the beginning of your amazing journey!`
  ];

  displayMessage(messages[Math.floor(Math.random() * messages.length)], 'achievement');
}

// Display generated message
function displayMessage(message, type) {
  document.getElementById('generated-message').textContent = message;
  document.getElementById('message-display').style.display = 'block';
  
  // Store current type for sharing
  window.currentMessageType = type;
  
  // Reset copy button
  document.getElementById('share-text').style.display = 'inline';
  document.getElementById('copied-text').style.display = 'none';
}

// Copy shareable link
function copyShareableLink() {
  const message = document.getElementById('generated-message').textContent;
  const type = window.currentMessageType;
  
  const baseUrl = window.location.origin + window.location.pathname;
  const params = new URLSearchParams({
    type: type,
    msg: encodeURIComponent(message)
  });
  const shareableLink = `${baseUrl}?${params.toString()}`;

  // Copy to clipboard
  navigator.clipboard.writeText(shareableLink).then(() => {
    // Show copied confirmation
    document.getElementById('share-text').style.display = 'none';
    document.getElementById('copied-text').style.display = 'inline';

    // Reset after 2 seconds
    setTimeout(() => {
      document.getElementById('share-text').style.display = 'inline';
      document.getElementById('copied-text').style.display = 'none';
    }, 2000);
  }).catch(err => {
    alert('Failed to copy link');
  });
}