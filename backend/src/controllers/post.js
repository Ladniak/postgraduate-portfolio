import Post from '../db/models/post.js';

export const getAll = async (req, res) => {
  try {
    const posts = await Post.find().populate({
      path: 'user',
      select: ['name', 'avatarUrl'],
    });
    res.status(201).json({
      status: 201,
      message: 'Successfully return all posts!',
      posts,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Posts is not found!',
      error,
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    if (!postId) {
      return res.status(400).json({
        message: 'Post ID is required!',
      });
    }
    const doc = await Post.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: +1 } },
      { returnDocument: 'after' },
    ).populate({
      path: 'user',
      select: ['name', 'avatarUrl'],
    });

    if (!doc) {
      return res.status(404).json({
        message: 'Post not found!',
      });
    }
    res.status(201).json({
      status: 201,
      message: 'Successfully return one posts!',
      doc,
      postId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: 'Failed to retrieve post by ID!',
      error,
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new Post({
      title: req.body.title,
      text: req.body.text,
      files: req.files ? req.files.map((file) => file.path) : [],
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });

    const post = await doc.save();

    console.log('Saved post:', post);
    res.status(201).json({
      status: 201,
      message: 'Successfully created a post!',
      post,
    });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({
      status: 500,
      message: 'Post is not created!',
      error,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    // const post = await Post.findById(postId);

    if (!postId) {
      return res.status(400).json({
        message: 'Post ID is required!',
      });
    }

    // if (post.user.toString() !== req.userId.toString()) {
    //   return res.status(403).json({
    //     message: 'You do not have permission to delete this post!',
    //   });
    // }

    const deletedPost = await Post.findOneAndDelete({ _id: postId });

    if (!deletedPost) {
      return res.status(404).json({
        message: 'Post not found!',
      });
    }

    res.status(200).json({
      message: 'Post successfully removed!',
      post: deletedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to remove post!',
      error,
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await Post.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        files: req.files ? req.files.map((file) => file.path) : [],
        imageUrl: req.body.imageUrl,
        user: req.userId,
      },
    );
    res.status(200).json({
      message: 'Post successfully update!',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to update post!',
      error,
    });
  }
};
