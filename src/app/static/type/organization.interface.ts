export interface IOrganizations {
  approvedOrganizations: IOrganization[];
  proposedOrganizations: IOrganization[];
}

export interface IOrganization {
  id?: number;
  name: string;
  phones?: string[];
  email?: string;
  approved?: boolean;
}
