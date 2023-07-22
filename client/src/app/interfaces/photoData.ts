export interface IPost {
  id: string;
  title: string;
  location:string;
  description:string;
  image: string;
  likes: string[];
  ownerId: string;
}
// title: {
//   type: String,
//   required: true
// },
// location: {
//   type: String,
//   required: true
// },
// description: {
//   type: String,
//   required: true
// },
// image: {
//   type: String,
//   required: true
// },
// likes: [{
//   type: ObjectId,
//   ref: "User"
// }],
// ownerId: {
//   type: ObjectId,
//   ref: "User"
// },