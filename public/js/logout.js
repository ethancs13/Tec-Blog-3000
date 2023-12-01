// Logs out user and brings them back to homepage if successful
const logout_handler = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("/api/users/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
  
      // If response is ok, redirect to homepage otherwise throw alert
      if (res.ok) {
        document.location.replace("/");
      } else {
        alert("Failed to log out, please try again.");
      }
    } catch (err) {
      res.status(500).json(err);
      alert("Something went wrong, please try again.");
    }
  };
  
  // Applies event listener to logout id on main.handlebars
  document.querySelector("#logout").addEventListener("click", logout_handler);