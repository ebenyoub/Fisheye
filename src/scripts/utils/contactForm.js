/* eslint-disable no-param-reassign */
const elementsToHide = document.querySelectorAll("body > :not(#contact_modal");
const contactModal = document.querySelector("#contact_modal");
const contactSubmit = document.querySelector(".contact_submit");
const inputs = document.querySelectorAll("input, textarea");

function itemFocus() {
  let tabindex = 4;
  const items = document.querySelectorAll(".item-container");
  const enableFocus = document.querySelectorAll(".focus");
  items.forEach((item) => {
    if (document.body.classList.contains("modal-open")) {
      item.setAttribute("tabindex", -1);
    } else {
      item.setAttribute("tabindex", tabindex);

      item.addEventListener("focus", () => item.classList.add("class", "item-focus"));
      item.addEventListener("blur", () => item.classList.remove("item-focus"));
      tabindex += 1;
    }
  });
  if (document.body.classList.contains("modal-open")) {
    enableFocus.forEach((element) => element.setAttribute("tabindex", "-1"));
  } else {
    let count = 1;
    enableFocus.forEach((element) => {
      element.setAttribute("tabindex", count);
    });
    count += 1;
  }
}

function accessibilityHide() {
  elementsToHide.forEach((element) => {
    element.setAttribute("aria-hidden", "true");
    element.setAttribute("tabindex", "-1");
    itemFocus();
  });
}

function accessibilityShow() {
  elementsToHide.forEach((element) => {
    element.removeAttribute("aria-hidden");
    element.removeAttribute("tabindex");
    itemFocus();
  });
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  document.body.classList.remove("modal-open");
  accessibilityShow();
  modal.style.display = "none";
  const fields = Array.from(document.querySelectorAll("input, textarea"));
  fields.forEach((field) => {
    field.value = "";
    field.style.border = "none";
  });
}

contactModal.addEventListener("click", (e) => {
  if (e.target === contactModal) {
    closeModal();
  }
});

function redField() {
  inputs.forEach((input) => {
    if (!input.checkValidity()) {
      input.style.outline = "2px solid red";
    } else {
      input.style.outline = "none";
    }
  });
}

function checkField() {
  let valid = true;
  inputs.forEach((input) => {
    if (!input.checkValidity()) {
      valid = false;
    }
  });
  return valid;
}

contactSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  redField();
  inputs.forEach((input) => input.addEventListener("blur", redField));
  if (checkField()) {
    // ici on envoie les données au serveur
    closeModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (document.body.classList.contains("modal-open")) {
    if (e.key === "Escape") {
      closeModal();
    }
  }
});

// eslint-disable-next-line no-unused-vars
function displayModal() {
  const modal = document.getElementById("contact_modal");
  document.body.classList.add("modal-open");
  accessibilityHide();
  modal.style.display = "block";
  document.getElementById("firstname").focus();
}
