const logoutFormHandler = async (event) => {
  event.preventDefault();
  try {
    const res = await fetch("/api/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

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

document.querySelector("#logout").addEventListener("click", logoutFormHandler);