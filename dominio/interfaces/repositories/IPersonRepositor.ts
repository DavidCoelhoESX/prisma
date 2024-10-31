import { Person, Result } from "../../../@types";

export interface IUserReposiroty {
  createPerson: (person: Person) => Promise<Result>;
  getAllUsers: () => Promise<Person[]>;
  getUserByEmail: (email: string) => Promise<Result>;
  deleteUser: (email: string) => Promise<Result>;
  updateUser: (email: string, userData: Partial<Person>) => Promise<Result>;
}
