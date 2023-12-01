const update_handler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector("#userTitleEdit").value.trim();
    const post_content = document.querySelector("#userBodyEdit").value.trim();
  
    // Need to target the number in the URL, so we split it using / to target the 2nd group which is the number
    const post_id = window.location.pathname.split("/")[2];
    console.log(post_id);
  
    if (title && post_content) {
      try {
        // Use template literal to fetch different post_id numbers
        const res = await fetch(`/api/posts/edit/${post_id}`, {
          method: "PUT",
          body: JSON.stringify({ title, post_content }),
          headers: { "Content-Type": "application/json" },
        });
  
        console.log(res);
  
        // If response is ok, redirect to dashboard otherwise throw alert
        if (res.ok) {
          document.location.replace("/dashboard");
        } else {
          alert("Failed to edit post, please try again.");
        }
      } catch (err) {
        res.status(500).json(err);
        alert("Something went wrong, please try again.");
      }
    }
  };
  
  // Applies event listener to editForm class on edit.handlebars
  document.querySelector(".editForm").addEventListener("submit", update_handler);