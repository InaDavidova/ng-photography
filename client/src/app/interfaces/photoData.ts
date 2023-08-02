export interface IPost {
  title: string;
  location: string;
  description: string;
  image: string;
  owner: string;
  _id?: string;
}

export interface IPostResponse {
  _id: string;
  title: string;
  location: string;
  description: string;
  image: string;
  likes: string[];
  owner: {
    username: string;
    email: string;
    posts: IPost[];
    _id: string;
  };
}
