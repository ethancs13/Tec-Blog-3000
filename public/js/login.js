const loginFormHandler = async (event) => {
  event.preventDefault();
  const name = document.querySelector("#userLogin").value.trim();
  const password = document.querySelector("#passwordLogin").value.trim();

  if (name && password) {
    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ name, password }),
        headers: { "Content-Type": "application/json" },
      });

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

document
  .querySelector(".loginForm")
  .addEventListener("submit", loginFormHandler);