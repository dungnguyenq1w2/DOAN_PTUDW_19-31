const userService = require('../services/user.service');

const getRetrieveUsers = async (req, res, next) => {
  const { originalUrl } = req;
  let url = originalUrl;
  let { page, search, sort } = req.query;

  if (page === undefined) {
    page = 1;
  }

  url = url.split('page=')[0];
  if (url[url.length - 1] !== '?' && url[url.length - 1] !== '&') {
    if (url.includes('?')) {
      url += '&';
    } else {
      url += '?';
    }
  }

  const { users, pagination } = await userService.getRetrieveUsers(page, search, sort);

  res.render('user/index', {
    title: 'Users List',
    which: 'user',
    users,
    pagination,
    search,
    sort,
    url
  });
};

const getCreateUser = async (req, res, next) => {
  res.render('user/create', { title: 'User', which: 'user' });
};

const postCreateUser = async (req, res, next) => {
  await userService.postCreateUser(req);

  res.redirect('/users');
};

const getUpdateUser = async (req, res, next) => {
  const { userId } = req.params;

  const editingUser = await userService.getRetrieveUserById(userId);

  res.render('user/update', { title: 'User', which: 'user', editingUser });
};

const putUpdateUser = async (req, res, next) => {
  await userService.putUpdateUser(req);

  res.redirect('/users');
};

const deleteUser = async (req, res, next) => {
  const { userId } = req.params;

  await userService.deleteUser(userId);

  res.redirect('/users');
};

const putLockUser = async (req, res) => {
  const { userId } = req.params;

  const newState = await userService.putLockUser(userId);

  if (newState !== undefined) {
    res.status(200).json({ msg: 'success', newState });
  }
  else {
    res.status(404).json({ msg: 'failed' });
  }
};

module.exports = {
  getRetrieveUsers,
  getCreateUser,
  postCreateUser,
  getUpdateUser,
  putUpdateUser,
  deleteUser,
  putLockUser
};