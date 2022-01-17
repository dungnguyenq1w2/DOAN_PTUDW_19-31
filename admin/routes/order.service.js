const orderModel = require("../models/order.model");
// const orderDetailModel = require("../models/orderDetail.model");
const cakeModel = require("../models/cake.model");
const userModel = require("../models/user.model");
const categoryModel = require("../models/category.model");

const getRetrieveOrders = async (start, end, category) => {
  // if (start !== undefined && start !== "") {
  //   console.log(new Date(start));
  //   pipeline.push({
  //     $match: {
  //       createdAt: {
  //         $gte: new Date(start),
  //       },
  //     },
  //   });
  // }
  // if (end !== undefined && end !== "") {
  //   console.log(new Date(end));
  //   pipeline.push({
  //     $match: {
  //       createdAt: {
  //         $lt: new Date(end),
  //       },
  //     },
  //   });
  // }
  if (start == undefined || start === "") {
    start = new Date("2021-1-1");
  }
  if (end == undefined || end === "") {
    end = new Date("2023-1-1");
  }
  let orders;
  try {
    console.log(start + " " + end + " " + category);
    if (category == undefined) {
      orders = await orderModel
        .find({ createdAt: { $gte: start, $lte: end } })
        .populate([
          {
            path: "orderer",
            model: "User",
          },
          {
            path: "wares.cake",
            model: "Cake",
            populate: { path: "category", model: "Category" },
          },
        ]);
      //   {
      //     path: "wares.cake",
      //     model: "Cake",
      //   },
      //   // {
      //   //   path: "wares",
      //   //   populate: { path: "wares.cake", model: "Cake" },
      //   // },
      // ]);
    } else {
      orders = [];
    }
  } catch (error) {
    console.log(error);
    orders = [];
  }
  return orders;
};

module.exports = {
  getRetrieveOrders,
};
