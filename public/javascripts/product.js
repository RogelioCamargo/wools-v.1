const openCreateProductFormButton = document.querySelector(
  "#open-create-product-form"
);
const cancelCreateProductFormButton = document.querySelector(
  "#cancel-create-warehouse-form"
);
const createProductForm = document.querySelector("#create-product-form");

openCreateProductFormButton.addEventListener("click", () => {
  openCreateProductFormButton.style.display = "none";
  createProductForm.classList.remove("hide");
});

cancelCreateProductFormButton.addEventListener("click", () => {
  createProductForm.classList.add("hide");
  openCreateProductFormButton.style.display = "flex";
});

const deleteProductButton = document.querySelectorAll(".delete-product-button");
deleteProductButton.forEach((button) => {
  const pid = button.value;
  button.addEventListener("click", () => {
    fetch(`/products/${pid}`, {
      method: "DELETE",
    }).then((response) => {
      window.location.reload();
    });
  });
});
