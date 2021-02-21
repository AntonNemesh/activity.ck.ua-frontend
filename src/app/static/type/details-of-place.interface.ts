export interface IDetailsOfPlace {
  id: number;
  categoryId: string;
  photos: Array<string>;
  name: string;
  phone: string;
  address: string;
  webSite: string;
  workTime: string;
  accessibility: boolean;
  dogFriendly: boolean;
  childFriendly: boolean;
  aboutInfo: string;
  rating: number;
}
