import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { db } from "../config/firebase";
import AddAndUpdateContact from "./AddAndUpdateContact";
import useDisclose from "../hooks/useDisclose";
import { toast } from "react-toastify";

const ContactCard = ({ contact }) => {
  const { isOpen, onClose, onOpen } = useDisclose();

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        key={contact.id}
        className="flex ml-4 w-[305px] justify-between rounded-lg bg-green-400 p-2"
      >
        <div className="flex gap-2">
          <img width={25} src="/contact1.svg" />
          <div className="text-white">
            <h2 className="font-medium">{contact.name}</h2>
            <p className="text-sm">{contact.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <img
            className="cursor-pointer"
            onClick={onOpen}
            width={25}
            src="/edit.svg"
          />
          <img
            className="cursor-pointer"
            onClick={() => deleteContact(contact.id)}
            width={25}
            src="/delete.svg"
          />
        </div>
      </div>
      <AddAndUpdateContact
        contact={contact}
        isUpdate
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default ContactCard;
