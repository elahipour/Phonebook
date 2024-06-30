function getItems() {
  const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  return contacts;
}

function editContact(
  contactId,
  setContacts,
  editContactElem,
  setEditable,
  editable,
  popupRef,
  styles
) {
  const spans =
    editContactElem.current.parentElement.querySelectorAll("div>h4>p>span");
  const contacts = [...getItems()];

  popupRef.current.innerHTML = "";

  if (editable) {
    for (let i = 1; i <= 4; i++) {
      spans[i].setAttribute("contenteditable", true);
      spans[i].style.borderBottom = "1px dashed black";
      spans[i].style.carret = "orange";
      spans[i].style.outline = "none";
    }
  } else {
    popupRef.current.className = styles.popupError;
    const spanFirstName = spans[1].innerText;
    const spanLastName = spans[2].innerText;
    const spanEmail = spans[3].innerText;
    const spanMobile = spans[4].innerText;
    if (!formValidation(spanFirstName, "firstname")) {
      popupRef.current.innerHTML = "&nbsp;&nbsp;invalid firstname&nbsp;&nbsp;";
      return;
    }
    if (!formValidation(spanLastName, "lastname")) {
      popupRef.current.innerHTML = "&nbsp;&nbsp;invalid lastname&nbsp;&nbsp;";
      return;
    }
    if (!formValidation(spanEmail, "email")) {
      popupRef.current.innerHTML = "&nbsp;&nbsp;invalid email&nbsp;&nbsp;";
      return;
    }
    if (!formValidation(spanMobile, "mobile")) {
      popupRef.current.innerHTML = "&nbsp;&nbsp;invalid mobile&nbsp;&nbsp;";
      return;
    }

    const newContact = {
      id: contactId,
      firstname: spanFirstName,
      lastname: spanLastName,
      email: spanEmail,
      mobile: spanMobile,
    };
    contacts.splice(contactId - 1, 1, newContact);
    setContacts(contacts);

    for (let i = 1; i <= 4; i++) {
      spans[i].style.borderBottom = "none";
      spans[i].setAttribute("contenteditable", false);
    }
  }
  setEditable((editable) => !editable);
}

function removeContact(id, setContacts) {
  const contacts = getItems();
  const index = contacts.findIndex((item) => item.id === id);
  const lastContactIndex = contacts.length - 1;
  contacts.splice(index, 1);
  for (let i = id; i <= lastContactIndex; i++) {
    contacts[i - 1]["id"] = i;
  }
  localStorage.setItem("contacts", JSON.stringify(contacts));

  setContacts([...contacts]);
}

function formValidation(targetInput, targetField) {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const mobileNumberRegex = /^0\d{10}$/;
  const firstNameRegex = /^[a-z,_]{3,20}$/;
  const lastNameRegex = /^[a-z,_]{2,35}$/;
  let emailInput;
  let firstnameInput;
  let lastnameInput;
  let mobileInput;
  if (targetField === "firstname") {
    firstnameInput = firstNameRegex.test(targetInput.toLowerCase());
    return firstnameInput;
  }
  if (targetField === "lastname") {
    lastnameInput = lastNameRegex.test(targetInput.toLowerCase());
    return lastnameInput;
  }
  if (targetField === "email") {
    emailInput = emailRegex.test(targetInput);
    const emailInputLen = targetInput.length < 35;
    return emailInput && emailInputLen;
  }
  if (targetField === "mobile") {
    mobileInput = mobileNumberRegex.test(targetInput);
    return mobileInput;
  }
}
function searchContact(contacts, input) {
  const newContacts = contacts.filter(
    (contact) =>
      contact.firstname.toLowerCase().includes(input.toLowerCase()) ||
      contact.lastname.toLowerCase().includes(input.toLowerCase()) ||
      contact.mobile.toLowerCase().includes(input.toLowerCase())
  );
  return newContacts;
}
export { getItems, editContact, removeContact, formValidation, searchContact };
