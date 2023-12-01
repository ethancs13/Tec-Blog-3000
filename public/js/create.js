const post_handler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector("#title").value.trim();
    const body = document.querySelector("#user").value.trim();
  
    if (title && body) {
      try {
        const res = await fetch("/api/posts/create", {
          method: "POST",
          body: JSON.stringify({ title, body }),
          headers: { "Content-Type": "application/json" },
        });
  
        console.log(res);
  
        // If response 200 (ok), update url to dashboard
        if (res.ok) {
          document.location.replace("/dashboard");
        } else {
          alert("Failed to create post, please try again.");
        }
      } catch (err) {
        res.status(500).json(err);
        alert("Something went wrong.");
      }
    }
  };
  
  // Applies event listener to createForm class on create.handlebars
  document
    .querySelector(".createForm")
    .addEventListener("submit", post_handler);