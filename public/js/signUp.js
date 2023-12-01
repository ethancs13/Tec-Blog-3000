const signUpFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#userSignUp").value.trim();
  const email = document.querySelector("#emailSignUp").value.trim();
  const password = document.querySelector("#passwordSignUp").value.trim();

  if (name && email && password) {
    try {
      const res = await fetch("/api/users/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      });

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

document
  .querySelector(".signUpForm")
  .addEventListener("submit", signUpFormHandler);