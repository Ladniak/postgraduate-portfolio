import jwt from 'jsonwebtoken';
import brypt from 'bcrypt';
import User from '../db/models/user.js';

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await brypt.genSalt(10);
    const passwordHash = await brypt.hash(password, salt);

    const doc = new User({
      name: req.body.name,
      email: req.body.email,
      passwordHash,
      avatarUrl: req.body.avatarUrl,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d',
      },
    );

    res.status(201).json({
      status: 201,
      message: 'Successfully created a user!',
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: 'Error',
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({
        message: 'Not Found!',
      });
    }

    const isValidPass = await brypt.compare(
      req.body.password,
      user._doc.passwordHash,
    );

    if (!isValidPass) {
      return res.status(400).json({
        message: 'Mistake with login or password!',
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d',
      },
    );

    res.status(201).json({
      status: 201,
      message: 'Login is successfull!',
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: 'Error with login!',
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found!',
      });
    }

    res.status(201).json({
      status: 201,
      message: 'Get me is successfull!',
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: 'Error',
    });
  }
};
