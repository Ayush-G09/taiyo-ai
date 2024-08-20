import { createAction } from "@reduxjs/toolkit";
import { Contact } from "./types";

export const deleteAllData = createAction("contact/deleteAllData");
export const addName = createAction<string>("contact/addName");
export const addContact = createAction<Contact>("contact/addContact");
export const updateContact = createAction<{
  id: string;
  contact: Partial<Contact>;
}>("contact/updateContact");
export const removeContact = createAction<string>("contact/removeContact");
