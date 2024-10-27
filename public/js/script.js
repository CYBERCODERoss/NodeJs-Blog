document.addEventListener('DOMContentLoaded', function () {

  const allButtons = document.querySelectorAll('.searchBtn');
  const searchBar = document.querySelector('.searchBar');
  const searchInput = document.getElementById('searchInput');
  const searchClose = document.getElementById('searchClose');

  for (var i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener('click', function () {
      searchBar.style.visibility = 'visible';
      searchBar.classList.add('open');
      this.setAttribute('aria-expanded', 'true');
      searchInput.focus();
    });
  }

  searchClose.addEventListener('click', function () {
    searchBar.style.visibility = 'hidden';
    searchBar.classList.remove('open');
    this.setAttribute('aria-expanded', 'false');
  });

  const form = document.querySelector('form');

  form.addEventListener('submit', function (event) {
    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;

    // Basic validation
    if (username.length < 3) {
      alert('Username must be at least 3 characters long.');
      event.preventDefault();
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      event.preventDefault();
    }

    const emailPattern = /.+\@.+\..+/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      event.preventDefault();
    }
  });

  const signupForm = document.getElementById('signup-form');

  signupForm.addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(signupForm);
    const response = await fetch(signupForm.action, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      // Redirect to the login page if successful
      window.location.href = '/admin';
    } else {
      const errorData = await response.json();
      // Show the error message in a popup
      alert(errorData.message); // Display the error message in a popup
    }
  });
});
