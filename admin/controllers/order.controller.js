const orderService = require("../services/order.service");

const getRetrieveOrders = async (req, res, next) => {
  const { originalUrl } = req;
  let url = originalUrl;
  let { start, end } = req.query;

  url = url.split("page=")[0];
  if (url[url.length - 1] !== "?" && url[url.length - 1] !== "&") {
    if (url.includes("?")) {
      url += "&";
    } else {
      url += "?";
    }
  }

  const { orders } = await orderService.getRetrieveOrders(start, end);

  res.render("user/statistics", {
    title: "Statistics",
    which: "order",
    orders,
    start,
    end,
    url,
  });
};

module.exports = {
  getRetrieveOrders,
};
