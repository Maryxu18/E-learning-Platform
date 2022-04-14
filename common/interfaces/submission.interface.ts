export default interface Submission {
  _id: string;
  companyId: string;
  deliverableId: string;
  fileId: string;
  fileName: string;
  grade: number;
  feedback: string;
  onTime: boolean;
  isGraded: boolean;
  graderId: string;
}
