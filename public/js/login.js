const login_handler = async (event) => {
    event.preventDefault();
  
    // Looks for username and password user these id's
    const name = document.querySelector("#userLogin").value.trim();
    const password = document.querySelector("#passwordLogin").value.trim();
  
    // If they exist, send a fetch request to the database to log them in, otherwise go to homepage
    if (name && password) {
      try {
        const res = await fetch("/api/users/login", {
          method: "POST",
          body: JSON.stringify({ name, password }),
          headers: { "Content-Type": "application/json" },
        });
  
        console.log(res);
        // If response is ok, redirect to homepage otherwise throw alert
        if (res.ok) {
          document.location.replace("/");
        } else {
          alert("Failed to log in, please try again.");
        }
      } catch (err) {
        res.status(500).json(err);
        alert("Something went wrong, please try again.");
      }
    }
  };
  
  // Applies event listener to loginForm class on login.handlebars
  document
    .querySelector(".loginForm")
    .addEventListener("submit", login_handler);