const { userModel, postModel } = require("../models");

function newPost(title, location, description, image, owner) {
  return postModel
    .create({ title, location, description, image, owner })
    .then((post) => {
      return Promise.all([
        userModel.updateOne({ _id: owner }, { $push: { posts: post._id } }),
      ]);
    });
}

function getLatestsPosts(req, res, next) {
  const limit = Number(req.query.limit) || 0;

  postModel
    .find()
    .sort({ created_at: -1 })
    .limit(limit)
    .populate("owner")
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(next);
}

function getPostById(req, res, next) {
  const { postId } = req.params;

  postModel
    .findById(postId)
    .populate("owner")
    .then((post) => res.json(post))
    .catch(next);
}

function createPost(req, res, next) {
  const { _id: userId } = req.user;
  const { title, location, description, image } = req.body;

  newPost(title, location, description, image, userId)
    .then((createdPost) => res.status(200).json(createdPost))
    .catch(next);
}

function editPost(req, res, next) {
  const { postId } = req.params;
  const { title, location, description, image } = req.body;
  const { _id: userId } = req.user;

  // if the userId is not the same as this one of the post, the post will not be updated
  postModel
    .findOneAndUpdate(
      { _id: postId, owner: userId },
      { title, location, description, image },
      { new: true }
    )
    .then((updatedPost) => {
      if (updatedPost) {
        res.status(200).json(updatedPost);
      } else {
        res.status(401).json({ message: `Not allowed!` });
      }
    })
    .catch(next);
}

function deletePost(req, res, next) {
  const { postId } = req.params;
  const { _id: userId } = req.user;

  Promise.all([
    postModel.findOneAndDelete({ _id: postId, userId }),
    userModel.findOneAndUpdate({ _id: userId }, { $pull: { posts: postId } }),
  ])
    .then(([deletedOne, _, __]) => {
      if (deletedOne) {
        res.status(200).json(deletedOne);
      } else {
        res.status(401).json({ message: `Not allowed!` });
      }
    })
    .catch(next);
}

function like(req, res, next) {
  const { postId } = req.params;
  const { _id: userId } = req.user;

  console.log("like");

  postModel
    .updateOne({ _id: postId }, { $addToSet: { likes: userId } }, { new: true })
    .then(() => res.status(200).json({ message: "Liked successful!" }))
    .catch(next);
}

module.exports = {
  getLatestsPosts,
  newPost,
  getPostById,
  createPost,
  editPost,
  deletePost,
  like,
};
