const deleteFormHandler = async (event) => {
  event.preventDefault();

  const post_id = window.location.pathname.split("/")[2];
  console.log(post_id);
  try {

    const res = await fetch(`/api/posts/edit/${post_id}`, {
      method: "DELETE",
    });

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

document
  .querySelector("#deleteBtn")
  .addEventListener("click", deleteFormHandler);