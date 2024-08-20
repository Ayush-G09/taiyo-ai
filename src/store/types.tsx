export type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  status: string;
};

export type State = {
  name: string;
  contacts: Contact[];
};
