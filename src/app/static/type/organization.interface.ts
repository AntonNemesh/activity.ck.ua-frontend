export interface IOrganization {
  id: number;
  name: string;
  phones: string[];
  email: string;
  approved: boolean;
}

export interface IProposeOrganization {
  name: string;
  email: string;
  phones: string[];
}
