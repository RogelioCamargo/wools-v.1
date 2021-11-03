const openCreateAnnouncementFormButton = document.querySelector(
  "#open-create-announcement-form"
);
const cancelCreateAnnouncementFormButton = document.querySelector(
  "#cancel-create-announcement-form"
);
const createAnnouncementForm = document.querySelector("#create-announcement-form");

openCreateAnnouncementFormButton.addEventListener("click", () => {
  openCreateAnnouncementFormButton.style.display = "none";
  createAnnouncementForm.classList.remove("hide");
});

cancelCreateAnnouncementFormButton.addEventListener("click", () => {
  createAnnouncementForm.classList.add("hide");
  openCreateAnnouncementFormButton.style.display = "flex";
});

const deleteAnnouncementButton = document.querySelectorAll(
  ".delete-announcement-button"
);
deleteAnnouncementButton.forEach((button) => {
  const aid = button.value;
  button.addEventListener("click", () => {
    fetch(`/announcements/${aid}`, {
      method: "DELETE",
    }).then((response) => {
      window.location.reload();
    });
  });
});