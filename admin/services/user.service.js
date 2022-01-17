const userModel = require("../models/user.model");

const uploadFileHelper = require("../helpers/uploadFile.helper");
const paginationHelper = require("../helpers/pagination.helper");
const hashPasswordHelper = require("../helpers/hashPassword.helper");

const { ITEM_PER_PAGE } = require("../bin/const");

const getRetrieveUsers = async (page, search, sort, role) => {
  const pipeline = [];

  pipeline.push({
    $match: { "state.value": { $ne: "deleted" } },
  });

  if (search !== undefined) {
    pipeline.push({
      $match: {
        $text: {
          $search: search,
        },
      },
    });
  }

  if (sort !== undefined && sort !== "Default sorting") {
    pipeline.push({
      $sort: { [sort]: 1 },
    });
  }

  if (role !== undefined && role !== "all") {
    pipeline.push({
      $match: { roles: role },
    });
  }
  // .find({ roles: "admin" })

  let users;
  try {
    users = await userModel
      .aggregate(pipeline)
      .skip((page - 1) * ITEM_PER_PAGE)
      .limit(ITEM_PER_PAGE);
  } catch (error) {
    console.log(error);
    users = [];
  }

  pipeline.push({
    $count: "numUsers",
  });

  let numUsers;
  try {
    [{ numUsers }] = await userModel.aggregate(pipeline);
  } catch (error) {
    console.log(error);
    numUsers = 0;
  }

  const pagination = paginationHelper(numUsers, page);

  return { users, pagination };
};

const getRetrieveUserById = async (userId) => {
  try {
    const user = await userModel.findById(userId);

    return user;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const postCreateUser = async (req) => {
  const { phone, password, name, state, role, email } = req.body;

  try {
    const { _id: userId } = await userModel.create({
      name,
      phone,
      email,
      password,
      roles: [role],
      "state.value": state,
    });

    if (req.file) {
      const signedUrl = await uploadFileHelper(req);

      await userModel.findByIdAndUpdate(userId, { avatar: signedUrl });
    }

    return userId;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const putUpdateUser = async (req) => {
  const { userId } = req.params;
  const { phone, password, name, state, role, email } = req.body;

  const preparedUser = {
    name,
    phone,
    email,
    roles: [role],
    "state.value": state,
  };
  if (password !== "") {
    preparedUser.password = await hashPasswordHelper(password);
  }

  try {
    if (req.file) {
      preparedUser.avatar = await uploadFileHelper(req);
    }
    const user = await userModel.findByIdAndUpdate(userId, preparedUser);

    return user;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteUser = async (userId) => {
  try {
    await userModel.findByIdAndUpdate(userId, { "state.value": "deleted" });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const putLockUser = async (userId) => {
  try {
    const user = await userModel.findById(userId);

    let updatedUser;
    if (user.state.value === "active") {
      updatedUser = await userModel.findByIdAndUpdate(
        userId,
        { "state.value": "inactive" },
        { new: true }
      );
    } else if (user.state.value === "inactive") {
      updatedUser = await userModel.findByIdAndUpdate(
        userId,
        { "state.value": "active" },
        { new: true }
      );
    } else {
    }

    return updatedUser.state.value;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  getRetrieveUsers,
  getRetrieveUserById,
  postCreateUser,
  putUpdateUser,
  deleteUser,
  putLockUser,
};
