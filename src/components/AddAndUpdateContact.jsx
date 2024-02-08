import React from "react";
import Modal from "./Modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  email: Yup.string().email("Email is Required").required("Email is Required"),
});

const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      onClose();
      toast.success("Contact Added Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contact);
      onClose();
      toast.success("Contact Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Formik
        validationSchema={contactSchemaValidation}
        initialValues={
          isUpdate
            ? { name: contact.name, email: contact.email }
            : {
                name: "",
                email: "",
              }
        }
        onSubmit={(values) => {
          console.log(values);
          isUpdate ? updateContact(values, contact.id) : addContact(values);
        }}
      >
        <Form className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label className="ml-3" htmlFor="name">
              Name
            </label>
            <Field name="name" className="border-2 border-blue-400 h-8 mx-3" />
            <div className="text-xs text-red-500">
              <ErrorMessage name="name" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="ml-3" htmlFor="email">
              Email
            </label>
            <Field name="email" className="border-2 border-blue-400 h-8 mx-3" />
            <div className="text-xs text-red-500">
              <ErrorMessage name="email" />
            </div>
          </div>
          <button className="px-3 py-1.5 bg-green-400 border-2 border-blue-400 self-end">
            {isUpdate ? "Update" : "Add"} Contact
          </button>
        </Form>
      </Formik>
    </Modal>
  );
};

export default AddAndUpdateContact;
