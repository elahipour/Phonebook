import { useEffect, useRef, useState } from "react";
import { getItems } from "./helpers";
import ContactList from "./ContactList";
import styles from "./assets/contact-form.module.css";
import searchIcon from './assets/images/search.png'
import { formValidation } from "./helpers";

function Contacts() {
  const [contacts, setContacts] = useState([...getItems()]);
  const emptyFieldError = useRef();
  const [search, setSearch] = useState("");
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
    setSearch("")
  }, [contacts]);
  const [form, setForm] = useState({
    id: 0,
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
  });
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [name]: value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    emptyFieldError.current.className =
      form.firstname && form.lastname && form.email && form.mobile
        ? styles.isNotEmpty
        : styles.isEmpty;
    setContacts([...getItems()]);
    const newId =
      contacts.length > 0
        ? Math.max(...contacts.map((contact) => contact.id)) + 1
        : 1;
    if (
      formValidation(form.firstname, "firstname") &&
      formValidation(form.lastname, "lastname") &&
      formValidation(form.email, "email") &&
      formValidation(form.mobile, "mobile")
    ) {
      const newForm = { ...form, id: newId };
      setContacts([...contacts, newForm]);
      setForm({ id: 0, firstname: "", lastname: "", email: "", mobile: "" });
    }
  }
  return (
    <div className={styles.wrapper}>
      <div ref={emptyFieldError} className={styles.isNotEmpty}>
        Do not leave the fields empty
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.container}>
          <div>
            <input
              type="text"
              placeholder="firstname"
              name="firstname"
              value={form.firstname}
              onChange={handleChange}
            />
            <span
              className={`${
                formValidation(form.firstname, "firstname")
                  ? styles.successAnim
                  : styles.failedAnim
              }`}
            >
              {form.firstname && !formValidation(form.firstname, "firstname")
                ? "invalid firstname"
                : !form.firstname
                ? ""
                : "✔"}
            </span>
          </div>
          <div>
            <input
              type="text"
              placeholder="lastname"
              name="lastname"
              value={form.lastname}
              onChange={handleChange}
            />
            <span
              className={`${
                formValidation(form.lastname, "lastname")
                  ? styles.successAnim
                  : styles.failedAnim
              }`}
            >
              {form.lastname && !formValidation(form.lastname, "lastname")
                ? "invalid lastname"
                : !form.lastname
                ? ""
                : "✔"}
            </span>
          </div>
          <div>
            <input
              type="text"
              placeholder="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            <span
              className={`${
                formValidation(form.email, "email")
                  ? styles.successAnim
                  : styles.failedAnim
              }`}
            >
              {form.email && !formValidation(form.email, "email")
                ? "invalid email"
                : !form.email
                ? ""
                : "✔"}
            </span>
          </div>
          <div>
            <input
              type="text"
              placeholder="mobile number"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
            />
            <span
              className={`${
                formValidation(form.mobile, "mobile")
                  ? styles.successAnim
                  : styles.failedAnim
              }`}
            >
              {form.mobile && !formValidation(form.mobile, "mobile")
                ? "invalid phone number"
                : !form.mobile
                ? ""
                : "✔"}
            </span>
          </div>
        </div>
        <div>
          <button type="submit">Add To List</button>
        </div>
      </form>
      {/* <div>
      </div> */}
      {contacts.length > 3 ? (
        <div className={styles.searchDiv}>
          <img src={searchIcon} alt="search" />
          <input
            type="text"
            className={styles.searchContact}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Search Contact"
          />
        </div>
      ) : null}
      <ContactList
        search={search}
        contacts={contacts}
        setContacts={setContacts}
      />
    </div>
  );
}

export default Contacts;
