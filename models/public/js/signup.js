$(document).ready(function() {
    // Getting references to our form and input
    var signUpForm = $("form.signup");
    var usernameInput = $("input#username-input");
    var passwordInput = $("input#password-input");
    var githubInput = $("input#github-input");
  
    // When the signup button is clicked, we validate the username and password are not blank
    signUpForm.on("submit", function(event) {
      event.preventDefault();
      var userData = {
        username: usernameInput.val().trim(),
        password: passwordInput.val().trim(),
        github: githubInput.val().trim()
      };
  
      if (!userData.username || !userData.password || !userData.github) {
        return;
      }
      // If we have an username and password, run the signUpUser function
      signUpUser(userData.username, userData.password, userData.github);
      usernameInput.val("");
      passwordInput.val("");
      githubInput.val("");
    });
  
    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(username, password, github) {
      $.post("/api/signup", {
        username: username,
        password: password,
        github: github
      })
        // eslint-disable-next-line no-unused-vars
        .then(function(data) {
          window.location.replace("/members");
          // If there's an error, handle it by throwing up a bootstrap alert
        })
        .catch(handleLoginErr);
    }
  
    function handleLoginErr(err) {
      console.log(err);
      $("#alert .msg").text(err.responseJSON.name);
      $("#alert").fadeIn(500);
    }
  });