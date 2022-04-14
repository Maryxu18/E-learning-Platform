const Company = {
  CompId: "",
};

export function setCompID({ CompId }: { CompId: string }) {
  Company.CompId = CompId;
}
export function getCompID() {
  return Company.CompId;
}
