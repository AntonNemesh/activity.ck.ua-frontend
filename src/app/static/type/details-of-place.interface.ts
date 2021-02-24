export interface IDetailsOfPlace {
  id: number;
  category_id: string;
  type_id: string;
  photos: Array<string>;
  name: string;
  phone: string;
  address: string;
  website: string;
  work_time: string;
  accessibility: boolean;
  dog_friendly: boolean;
  child_friendly: boolean;
  description: string;
  rating: number;
}
