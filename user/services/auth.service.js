const userModel = require('../models/user.model');

const uploadFileHelper = require('../helpers/uploadFile.helper');
const hashPasswordHelper = require('../helpers/hashPassword.helper');

const getRetrieveUserById = async (userId) => {
  const user = await userModel.findById(userId).lean();

  return user;
};

const getRetrieveUserByEmail = async (email) => {
  const user = await userModel.findOne({ email });

  return user;
};

const postSignUp = async (name, phone, email, password, securityQuestion, securityAnswer) => {
  try {
    const user = await userModel.findOne({ email });

    if (user) {
      throw new Error('Email already in use');
    }

    const newUser = new userModel({
      name,
      phone,
      email,
      password,
      state: {
        security: {
          question: securityQuestion,
          answer: securityAnswer
        }
      }
    });
    const createdUser = await newUser.save();

    return createdUser;
  } catch (error) {
    return error;
  }
};

const putUpdateUser = async (req) => {
  const { userId } = req.params;
  const { name, phone } = req.body;

  try {
    let user = await userModel.findByIdAndUpdate(userId, { name, phone });

    if (req.file) {
      const signedUrl = await uploadFileHelper(req);

      user = await userModel.findByIdAndUpdate(userId, { avatar: signedUrl });
    }
    return user;
  } catch (error) {
    console.log(error);
    return error;
  }
}

const postForgetAccount = async (email, securityQuestion, securityAnswer, newPassword) => {
  try {
    const checkedUser = await userModel.findOne({ email });

    if (checkedUser) {
      if (checkedUser.state.security.question === securityQuestion &&
          checkedUser.state.security.answer === securityAnswer) {
        const hashedPassword = await hashPasswordHelper(newPassword);

        const user = await userModel.findOneAndUpdate({ email }, { password: hashedPassword });

        return user;
      }
    }
  } catch (e) {
    console.log(e);
  }
};

const putChangePassword = async (user, newPassword) => {
  try {
    const hashedPassword = await hashPasswordHelper(newPassword);
    const updatedUser = await userModel.findByIdAndUpdate(user._id.toString(), { password: hashedPassword });

    return updatedUser;
  } catch (e) {
    console.log(e);
  }
}

const postCheckPassword = async (user, password) => {
  try {
    const checkUser = await userModel.findById(user._id.toString());

    const passwordMatch = await checkUser.comparePassword(password);

    return passwordMatch;
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  getRetrieveUserById,
  getRetrieveUserByEmail,
  postSignUp,
  putUpdateUser,
  postForgetAccount,
  putChangePassword,
  postCheckPassword
};