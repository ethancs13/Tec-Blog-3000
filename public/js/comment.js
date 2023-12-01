const addCommentHandler = async (event) => {
    event.preventDefault();
  
    const comment_content = document
      .querySelector("#commentContent")
      .value.trim();
  
    const post_id = window.location.pathname.split("/")[2];
  
    try {
      const res = await fetch(`/api/comments/`, {
        method: "POST",
        body: JSON.stringify({ comment_content, post_id }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (res.ok) {
        document.location.replace(`/posts/${post_id}`);
      } else {
        alert("Failed to add comment, please try again.");
      }
    } catch (err) {
      res.status(500).json(err);
      alert("Something went wrong, please try again.");
    }
  };
  
  document
    .querySelector(".commentForm")
    .addEventListener("submit", addCommentHandler);