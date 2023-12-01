const del_handler = async (event) => {
    event.preventDefault();
  
    // Need to target the number in the URL, so we split it using / to target the 2nd group which is the number
    const post_id = window.location.pathname.split("/")[2];
    console.log(post_id);
    try {
      // Use template literal to fetch specific post_id to delete
      const res = await fetch(`/api/posts/edit/${post_id}`, {
        method: "DELETE",
      });
  
      console.log(res);
  
      // If response is ok, redirect to dashboard otherwise throw alert
      if (res.ok) {
        document.location.replace("/dashboard");
      } else {
        alert("Failed to delete post, please try again.");
      }
    } catch (err) {
      res.status(500).json(err);
      alert("Something went wrong, please try again.");
    }
  };
  
  // Applies event listener to editForm class on edit.handlebars
  document
    .querySelector("#deleteBtn")
    .addEventListener("click", del_handler);