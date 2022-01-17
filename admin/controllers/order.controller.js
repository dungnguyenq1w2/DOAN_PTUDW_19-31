const orderService = require("../services/order.service");
const categoryModel = require("../models/category.model");

const getRetrieveOrders = async (req, res, next) => {
  const { originalUrl } = req;
  let url = originalUrl;
  let { start, end, category } = req.query;
  // console.log(start);
  // console.log(end);
  // console.log(category);

  if (url[url.length - 1] !== "?" && url[url.length - 1] !== "&") {
    if (url.includes("?")) {
      url += "&";
    } else {
      url += "?";
    }
  }

  const categories = await categoryModel.find();
  let orders = [];
  orders = await orderService.getRetrieveOrders(start, end, category);
  let rankResults = [];
  rankResults = await orderService.getProductRanking();
  // console.log(rankResults);

  let total = 0;
  for (let order of orders) {
    total += order.total;
  }

  // let
  // const { orders } = await orderService.getRetrieveOrders(start, end);
  // console.log(orders);
  res.render("statistics", {
    title: "Statistics",
    which: "statistics",
    orders,
    total,
    start,
    end,
    category,
    rankResults,
    categories,
    url,
  });
};

module.exports = {
  getRetrieveOrders,
};
