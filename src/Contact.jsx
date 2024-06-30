import React, { useRef, useState } from "react";
import { removeContact,editContact } from "./helpers";
import styles from './assets/contact.module.css';
import nameIcon from './assets/images/fieldIcons/name.png'
import emailIcon from './assets/images/fieldIcons/email.png'
import phoneIcon from './assets/images/fieldIcons/phone.png'
function Contact({id, firstname, lastname, email, mobile,setContacts }) {
  const [editable,setEditable]=useState(true);
const popupRef=useRef();
  const editContactRef=useRef();
  return (
    <li>
      <div ref={editContactRef}>
        <h4><p><span>{id}</span></p></h4>
        <h4><img src={nameIcon} alt="firstname" /><p><span>{firstname}</span></p></h4>
        <h4><img src={nameIcon} alt="firstname" /><p><span>{lastname}</span></p></h4>
        <h4><img src={emailIcon} alt="firstname" /><p><span>{email}</span></p></h4>
        <h4><img src={phoneIcon} alt="firstname" /><p><span>{mobile}</span></p></h4>
        <div>
          <span onClick={()=>editContact(id,setContacts,editContactRef,setEditable,editable,popupRef,styles)}>&#9998;</span>
          &nbsp;&nbsp;&nbsp;
          <span onClick={()=>removeContact(id,setContacts)}>&times;</span>
        </div>
      <div ref={popupRef} className={styles.popupError}></div>
      </div>
    </li>
  );
}

export default Contact;
