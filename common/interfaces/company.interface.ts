import Submission from "./submission.interface";
import { User } from "./users.interface";
export interface Company {
  _id: string;
  companyName: string;
  founderName: string;
  website: string;
  industry: string;
  companyType: string;
  aboutUs: string;
  specialties: string;
  users: User[];
  submissions: Submission[];
}
