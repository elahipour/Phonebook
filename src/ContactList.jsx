import Contact from "./Contact";
import styles from './assets/contact-list.module.css'
import { searchContact } from "./helpers";
function ContactList({contacts ,setContacts,search}) {
    return (
    <div className={styles.contactlist_wrapper}>
        <ul>
            {
               search ? 
              searchContact(contacts,search).map(contact=>
                <Contact key={contact.id} {...contact} setContacts={setContacts}/>
                 )
               : contacts.map(contact=>
               <Contact key={contact.id} {...contact} setContacts={setContacts}/>
                )
            }
        </ul>
    </div>
  )
}

export default ContactList