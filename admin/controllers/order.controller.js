const orderService = require("../services/order.service");
const categoryModel = require("../models/category.model");

const getRetrieveOrders = async (req, res, next) => {
  const { originalUrl } = req;
  let url = originalUrl;
  let { start, end, category } = req.query;
  console.log(start);
  console.log(end);
  console.log(category);

  // url = url.split("page=")[0];
  if (url[url.length - 1] !== "?" && url[url.length - 1] !== "&") {
    if (url.includes("?")) {
      url += "&";
    } else {
      url += "?";
    }
  }

  let orders = [];
  // if (start !== undefined && end !== undefined) {
  orders = await orderService.getRetrieveOrders(start, end, category);

  let total = 0;
  for (let order of orders) {
    total += order.total;
  }
  // const { orders } = await orderService.getRetrieveOrders(start, end);
  console.log(orders);
  const categories = await categoryModel.find();
  res.render("statistics", {
    title: "Statistics",
    which: "statistics",
    orders,
    total,
    start,
    end,
    category,
    categories,
    url,
  });
};

module.exports = {
  getRetrieveOrders,
};
