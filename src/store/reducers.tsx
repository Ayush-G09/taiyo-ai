import { createReducer } from "@reduxjs/toolkit";
import {
  deleteAllData,
  addName,
  addContact,
  updateContact,
  removeContact,
} from "./actions";
import { State } from "./types";

const initialState: State = {
  name: "",
  contacts: [],
};

const contactReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(deleteAllData, (state) => {
      state.name = "";
      state.contacts = [];
    })
    .addCase(addName, (state, action) => {
      state.name = action.payload;
    })
    .addCase(addContact, (state, action) => {
      state.contacts.push(action.payload);
    })
    .addCase(updateContact, (state, action) => {
      const { id, contact } = action.payload;
      const index = state.contacts.findIndex((c) => c.id === id);
      if (index !== -1) {
        state.contacts[index] = { ...state.contacts[index], ...contact };
      }
    })
    .addCase(removeContact, (state, action) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
    });
});

export default contactReducer;
