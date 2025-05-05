document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }

  if (event.target.dataset.type === "update") {
    const id = event.target.dataset.id;
    const newTitle = prompt("Введите новое название: ", "");

    if (newTitle !== null && newTitle.trim() !== "") {
      update(id, newTitle).then(() => {
        const titleElement = event.target.closest("li").firstChild;

        if (titleElement) {
          titleElement.textContent = newTitle;
        }
      });
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, {
    method: "DELETE",
  });
}

async function update(id, title) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
}
