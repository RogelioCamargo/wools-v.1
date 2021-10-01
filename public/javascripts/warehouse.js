const openCreateWarehouseFormButton = document.querySelector(
  "#open-create-warehouse-form"
);
const cancelCreateWarehouseFormButton = document.querySelector(
  "#cancel-create-warehouse-form"
);
const createWarehouseForm = document.querySelector("#create-warehouse-form");

openCreateWarehouseFormButton.addEventListener("click", () => {
  openCreateWarehouseFormButton.style.display = "none";
  createWarehouseForm.classList.remove("hide");
});

cancelCreateWarehouseFormButton.addEventListener("click", () => {
  createWarehouseForm.classList.add("hide");
  openCreateWarehouseFormButton.style.display = "flex";
});

const deleteWarehouseButtons = document.querySelectorAll(
  ".delete-warehouse-button"
);
deleteWarehouseButtons.forEach((button) => {
  const pid = button.value;
  button.addEventListener("click", () => {
    fetch(`/warehouses/${pid}`, {
      method: "DELETE",
    }).then((response) => {
      window.location.reload();
    });
  });
});
