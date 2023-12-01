const editFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector("#userTitleEdit").value.trim();
    const post_content = document.querySelector("#userBodyEdit").value.trim();
  
    const post_id = window.location.pathname.split("/")[2];
    console.log(post_id);
  
    if (title && post_content) {
      try {
        const res = await fetch(`/api/posts/edit/${post_id}`, {
          method: "PUT",
          body: JSON.stringify({ title, post_content }),
          headers: { "Content-Type": "application/json" },
        });
  
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
  
  document.querySelector(".editForm").addEventListener("submit", editFormHandler);