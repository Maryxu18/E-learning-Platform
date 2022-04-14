import { User } from "../../../common/interfaces/users.interface";
export const getUserByid = (userId: string) => {
  return fetch("http://localhost:3000/users/id" + userId)
    .then((r) => r.json())
    .then((data) => data.data as Promise<User>);
};
