const user = {
  id: "",
  firstName: "",
  lastName: "",
  role: "",
  email: "",
};

export function setID({ userID }: { userID: string }) {
  user.id = userID;
}
export function getID() {
  return user.id;
}

export function setEmail({ email }: { email: string }) {
  user.email = email;
}
export function getEmail() {
  return user.email;
}
export function setFirstName({ firstName }: { firstName: string }) {
  user.firstName = firstName;
}
export function getFirstName() {
  return user.firstName;
}
export function setLastName({ lastName }: { lastName: string }) {
  user.lastName = lastName;
}
export function getLastName() {
  return user.firstName;
}

export function setRole({ role }: { role: string }) {
  user.role = role;
}
export function getRole() {
  return user.role;
}
