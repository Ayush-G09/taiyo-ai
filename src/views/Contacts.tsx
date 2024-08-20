import { faAdd, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Button from "../components/Button";
import Modal from "../components/Modal";
import InputField from "../components/InputField";
import { useDispatch, useSelector } from "react-redux";
import { Contact } from "../store/types";
import { RootState } from "../store/store";
import { addContact, removeContact, updateContact } from "../store/actions";

type State = {
  contactModal: boolean;
  firstName: { value: string; error: boolean };
  lastName: { value: string; error: boolean };
  status: { value: string; error: boolean };
  modalType: "add" | "edit" | "delete";
  id: string;
};

function Contacts() {
  const [state, setState] = useState<State>({
    contactModal: false,
    firstName: { value: "", error: false },
    lastName: { value: "", error: false },
    status: { value: "", error: false },
    modalType: "add",
    id: "",
  });

  const contacts = useSelector((state: RootState) => state.contact.contacts);
  const dispatch = useDispatch();

  const handleSaveContact = () => {
    if (state.firstName.value) {
      if (state.lastName.value) {
        if (state.status.value) {
          const newContact: Contact = {
            id: Math.floor(10000000 + Math.random() * 90000000).toString(),
            firstName: state.firstName.value,
            lastName: state.lastName.value,
            status: state.status.value,
          };
          dispatch(addContact(newContact));
          setState((prev) => ({
            ...prev,
            firstName: { value: "", error: false },
            lastName: { value: "", error: false },
            status: { value: "", error: false },
            contactModal: false,
          }));
        } else {
          setState((prev) => ({
            ...prev,
            lastName: { ...prev.lastName, error: false },
            status: { ...prev.status, error: true },
          }));
        }
      } else {
        setState((prev) => ({
          ...prev,
          firstName: { ...prev.firstName, error: false },
          lastName: { ...prev.lastName, error: true },
        }));
      }
    } else {
      setState((prev) => ({
        ...prev,
        firstName: { ...prev.firstName, error: true },
      }));
    }
  };

  const handleSaveEdittedContact = () => {
    if (state.firstName.value) {
      if (state.lastName.value) {
        if (state.status.value) {
          const updatedContact = {
            id: state.id,
            contact: {
              firstName: state.firstName.value,
              lastName: state.lastName.value,
              status: state.status.value,
            },
          };
          dispatch(updateContact(updatedContact));
          setState((prev) => ({
            ...prev,
            firstName: { value: "", error: false },
            lastName: { value: "", error: false },
            status: { value: "", error: false },
            contactModal: false,
          }));
        } else {
          setState((prev) => ({
            ...prev,
            lastName: { ...prev.lastName, error: false },
            status: { ...prev.status, error: true },
          }));
        }
      } else {
        setState((prev) => ({
          ...prev,
          firstName: { ...prev.firstName, error: false },
          lastName: { ...prev.lastName, error: true },
        }));
      }
    } else {
      setState((prev) => ({
        ...prev,
        firstName: { ...prev.firstName, error: true },
      }));
    }
  };

  const handleDeleteContact = () => {
    dispatch(removeContact(state.id));
    setState((prev) => ({ ...prev, contactModal: false }));
  };

  return (
    <React.Fragment>
      <div className="w-full h-full overflow-hidden overflow-y-scroll scrollbar-hide">
        <div className="w-full h-[10%] xl:h-[9%] flex items-center pl-10">
          <Button
            onClick={() =>
              setState((prev) => ({
                ...prev,
                modalType: "add",
                contactModal: true,
              }))
            }
            placeholder="Add Contact"
            icon={<FontAwesomeIcon icon={faAdd} />}
            sx="h-[60%]"
          />
        </div>
        {contacts.length ? (
          <div className="w-full p-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:gird-cols-4 gap-y-5">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="w-[300px] h-fit p-5 flex flex-col bg-[#26252B] rounded-xl gap-5"
              >
                <div className="w-full flex items-center justify-between gap-5">
                  <label className="text-lg font-bold text-white">
                    {contact.firstName + " " + contact.lastName}
                  </label>
                  <FontAwesomeIcon icon={faPhone} className="text-green-500" />
                </div>
                <label
                  className={`${
                    contact.status === "InActive"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {contact.status}
                </label>
                <div className="w-full flex items-center gap-5">
                  <Button
                    sx={"w-[30%] h-8"}
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        modalType: "edit",
                        contactModal: true,
                        firstName: {
                          ...prev.firstName,
                          value: contact.firstName,
                        },
                        lastName: { ...prev.lastName, value: contact.lastName },
                        status: { ...prev.status, value: contact.status },
                        id: contact.id,
                      }))
                    }
                    placeholder="Edit"
                  />
                  <Button
                    sx={"w-[30%] h-8 bg-red-500 hover:bg-red-400"}
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        modalType: "delete",
                        contactModal: true,
                        id: contact.id,
                      }))
                    }
                    placeholder="Delete"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-[90%] flex items-center justify-center flex-col gap-10">
            <FontAwesomeIcon
              icon={faPhone}
              className="text-green-500 w-10 h-10"
            />
            <label className="text-white text-xl font-bold">
              No contacts found!
            </label>
          </div>
        )}
      </div>
      {state.contactModal && (
        <Modal
          sx="w-4/5 md:w-3/5 lg:w-2/5"
          onClose={() => setState((prev) => ({ ...prev, contactModal: false }))}
        >
          {state.modalType === "delete" ? (
            <div className="w-full flex flex-col gap-5">
              <label className="text-lg font-semibold text-white">
                Are you sure ?
              </label>
              <label className="text-base font-normal text-white">
                Delete this contact
              </label>
              <div className="w-full flex items-center gap-5">
                <Button
                  sx={"w-[30%] h-8 bg-green-500 hover:bg-green-400"}
                  onClick={handleDeleteContact}
                  placeholder="Delete"
                />
                <Button
                  sx={"w-[30%] h-8 bg-red-500 hover:bg-red-400"}
                  onClick={() =>
                    setState((prev) => ({ ...prev, contactModal: false }))
                  }
                  placeholder="Cancel"
                />
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col gap-5">
              <label className="text-lg font-semibold text-white">
                {state.modalType === "add" ? "Add new contact" : "Edit contact"}
              </label>
              <div className="w-full flex flex-col justify-center gap-1">
                <label>First Name</label>
                <div className="w-full h-10">
                  <InputField
                    placeholder={"Eg: Ayush"}
                    type={"text"}
                    value={state.firstName.value}
                    onChange={(v) =>
                      setState((prev) => ({
                        ...prev,
                        firstName: { ...prev.firstName, value: v },
                      }))
                    }
                  />
                </div>
                {state.firstName.error && (
                  <label className="text-red-500 text-sm">
                    First name is required*
                  </label>
                )}
              </div>
              <div className="w-full flex flex-col justify-center gap-1">
                <label>Last Name</label>
                <div className="w-full h-10">
                  <InputField
                    placeholder={"Eg: Gokhle"}
                    type={"text"}
                    value={state.lastName.value}
                    onChange={(v) =>
                      setState((prev) => ({
                        ...prev,
                        lastName: { ...prev.lastName, value: v },
                      }))
                    }
                  />
                </div>
                {state.lastName.error && (
                  <label className="text-red-500 text-sm">
                    Last name is required*
                  </label>
                )}
              </div>
              <div className="w-full flex flex-col justify-center gap-1">
                <label>Status</label>
                <div className="flex gap-10">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-full">
                      <InputField
                        placeholder=""
                        checked={state.status.value === "Active"}
                        name="active"
                        type={"radio"}
                        value={"Active"}
                        onChange={(v) =>
                          setState((prev) => ({
                            ...prev,
                            status: { ...prev.status, value: v },
                          }))
                        }
                      />
                    </div>
                    <label className="text-green-500 font-semibold text-base">
                      Active
                    </label>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-full">
                      <InputField
                        placeholder=""
                        checked={state.status.value === "InActive"}
                        name="active"
                        type={"radio"}
                        value={"InActive"}
                        onChange={(v) =>
                          setState((prev) => ({
                            ...prev,
                            status: { ...prev.status, value: v },
                          }))
                        }
                      />
                    </div>
                    <label className="text-red-500 font-semibold text-base">
                      InActive
                    </label>
                  </div>
                </div>
                {state.status.error && (
                  <label className="text-red-500 text-sm">
                    Status is required*
                  </label>
                )}
              </div>
              <Button
                sx={"h-10 mt-5"}
                onClick={
                  state.modalType === "add"
                    ? handleSaveContact
                    : handleSaveEdittedContact
                }
                placeholder={
                  state.modalType === "add"
                    ? "Save Contact"
                    : "Save Edited Contact"
                }
              />
            </div>
          )}
        </Modal>
      )}
    </React.Fragment>
  );
}

export default Contacts;
