const signup_handler = async (event) => {
    event.preventDefault();
  
    // Looks for username email and password id's
    const name = document.querySelector("#userSignUp").value.trim();
    const email = document.querySelector("#emailSignUp").value.trim();
    const password = document.querySelector("#passwordSignUp").value.trim();
  
    // if they exist, send fetch request to
    if (name && email && password) {
      try {
        const res = await fetch("/api/users/signup", {
          method: "POST",
          body: JSON.stringify({ name, email, password }),
          headers: { "Content-Type": "application/json" },
        });
  
        // If response is ok, redirect to homepage otherwise throw alert
        if (res.ok) {
          document.location.replace("/");
        } else {
          alert("Failed to sign up, please try again.");
        }
      } catch (err) {
        res.status(500).json(err);
        alert("Something went wrong, please try again.");
      }
    }
  };
  
  // Applies event listener to signUpForm class on signup.handlebars
  document
    .querySelector(".signUpForm")
    .addEventListener("submit", signup_handler);