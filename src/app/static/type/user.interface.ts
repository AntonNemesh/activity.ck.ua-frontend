export interface IUserResponse {
  user: IUser;
}

export interface IUser {
  name: string;
  avatar: string;
}

export interface IUserActivity {
  visited_places: IObjectActivity[];
  favorite_places: IObjectActivity[];
  user_places: IObjectActivity[];
  user_events: IObjectActivity[];
  scheduled_events: IObjectActivity[];
}

export interface IObjectActivity {
  id: number;
  category_id: string;
  name: string;
  main_photo: string;
}
