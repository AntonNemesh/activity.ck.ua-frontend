export interface IDetailsOfPlace {
  id: number;
  category_id: string;
  photos: Array<string>;
  name: string;
  phone: string;
  address: string;
  web_site: string;
  work_time: string;
  accessibility: boolean;
  dog_friendly: boolean;
  child_friendly: boolean;
  about_info: string;
  rating: number;
}
