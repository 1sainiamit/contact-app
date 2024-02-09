import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { FaSearchengin } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { db } from "./config/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import ContactCard from "./components/ContactCard";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclose from "./hooks/useDisclose";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoContactFound from "./components/NoContactFound";

const App = () => {
  const [contacts, setContacts] = useState([]);

  const { isOpen, onClose, onOpen } = useDisclose();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");

        onSnapshot(contactsRef, (snapshot) => {
          const contactsList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactsList);
          return contactsList;
        });
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, "contacts");

    onSnapshot(contactsRef, (snapshot) => {
      const contactsList = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactsList.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );

      setContacts(filteredContacts);
      return filteredContacts;
    });
  };

  return (
    <>
      <div className="max-w-[370px] mx-auto px-4">
        <Navbar />

        <div className="flex">
          <div className="flex flex-grow relative items-center">
            <FaSearchengin className="ml-6 absolute text-blue-400 text-2xl" />
            <input
              onChange={filterContacts}
              type="text"
              className="flex-grow h-9 rounded border border-yellow-500 bg-transparent
          text-white mx-4 pl-10"
            />
          </div>
          <IoMdPersonAdd
            onClick={onOpen}
            className="mr-5 cursor-pointer text-4xl text-blue-400"
          />
        </div>

        <div className="mt-4 gap-3 flex flex-col">
          {contacts.length <= 0 ? (
            <NoContactFound />
          ) : (
            contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>
      <AddAndUpdateContact onClose={onClose} isOpen={isOpen} />
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default App;
