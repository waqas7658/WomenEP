import React, { useEffect, useState } from "react";
import api from "../../Utils/ChatApi";
import axios from "axios";
import { BASEURL } from "../../Utils/BaseUrl";

const ContactList = ({ selectContact }) => {
  const [contacts, setContacts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  console.log(contacts);
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.post(`${BASEURL}/api/chat/getContacts`, {
          userId: user.id,
        });
        setContacts(response.data.contacts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="contact-list">
      {contacts.map((contact) => (
        <div key={contact._id} onClick={() => selectContact(contact)}>
          {contact.username}
        </div>
      ))}
    </div>
  );
};

export default ContactList;
