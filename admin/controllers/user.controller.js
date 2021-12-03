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
  res.render('user/create', { title: 'User - Admin', which: 'user' });
};

const postCreateUser = async (req, res, next) => {

};

const getUpdateUser = async (req, res, next) => {
  const { userId } = req.params;

  const user = await userService.getRetrieveUserById(userId);

  res.render('user/update', { title: 'User - Admin', which: 'user', user });
};

const putUpdateUser = async (req, res, next) => {

};

const deleteUser = async (req, res, next) => {
  const { userId } = req.params;

  await userService.deleteUser(userId);

  res.redirect('/users');
};

module.exports = {
  getRetrieveUsers,
  getCreateUser,
  postCreateUser,
  getUpdateUser,
  putUpdateUser,
  deleteUser
};