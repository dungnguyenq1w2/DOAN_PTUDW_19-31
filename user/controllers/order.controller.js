const orderService = require('../services/order.service');

const postCheckOut = async (req, res) => {
  const order = await orderService.postCheckOut(req.user, req.body);

  if (order) {
    res.status(201).json({ msg: 'success' });
  }
  else {
    res.status(500).json({ msg: 'failed' });
  }
};

module.exports = {
  postCheckOut
};