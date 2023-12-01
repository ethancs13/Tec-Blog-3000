const update_handler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector("#userTitleUpdate").value.trim();
    const post_content = document.querySelector("#userBodyUpdate").value.trim();
  
    // Need to target the number in the URL, so we split it using / to target the 2nd group which is the number
    const post_id = window.location.pathname.split("/")[2];
    console.log(post_id);
  
    if (title && post_content) {
      try {
        // Use template literal to fetch different post_id numbers
        const res = await fetch(`/api/posts/update/${post_id}`, {
          method: "PUT",
          body: JSON.stringify({ title, post_content }),
          headers: { "Content-Type": "application/json" },
        });
  
        console.log(res);
  
        // If response is ok, redirect to dashboard otherwise throw alert
        if (res.ok) {
          document.location.replace("/dashboard");
        } else {
          alert("Failed to update post, please try again.");
        }
      } catch (err) {
        res.status(500).json(err);
        alert("Something went wrong, please try again.");
      }
    }
  };
  
  // Applies event listener to updateForm class on update.handlebars
  document.querySelector(".updateForm").addEventListener("submit", update_handler);