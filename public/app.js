document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }

  if (event.target.dataset.type === "update") {
    const $task = event.target.closest("li");
    const id = event.target.dataset.id;
    const title = event.target.dataset.title;
    const initialHtml = $task.innerHTML;

    $task.innerHTML = `
      <input type="text" value="${title}">
      <div>
        <button class="btn btn-success" data-type="save">Сохранить</button>
        <button class="btn btn-danger" data-type="cancel">Отменить</button>
      </div>
    `;

    const taskListener = ({ target }) => {
      if (target.dataset.type === "cancel") {
        $task.innerHTML = initialHtml;
        $task.removeEventListener("click", taskListener);
      }
      if (target.dataset.type === "save") {
        const title = $task.querySelector("input").value;
        update(id, title).then(() => {
          $task.innerHTML = initialHtml;
          $task.firstChild.textContent = title;
          $task.querySelector("[data-type=update]").dataset.title = title;
          $task.removeEventListener("click", taskListener);
        });
      }
    };

    $task.addEventListener("click", taskListener);
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
