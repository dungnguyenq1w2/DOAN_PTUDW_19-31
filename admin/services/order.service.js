const orderModel = require("../models/order.model");
const orderDetailModel = require("../models/orderDetail.model");

const getRetrieveOrders = async (start, end) => {
  const pipeline = [];

  pipeline.push({
    $lookup: {
      from: "orders",
      localField: "order",
      foreignField: "_id",
      as: "order",
    },
    $unwind: "$order",
    $lookup: {
      from: "cakes",
      localField: "cake",
      foreignField: "_id",
      as: "cake",
    },
    $unwind: "$cake",
    $lookup: {
      from: "categories",
      localField: "category",
      foreignField: "_id",
      as: "category",
    },
    $unwind: "$category",
    $lookup: {
      from: "users",
      localField: "orderer",
      foreignField: "_id",
      as: "orderer",
    },
    $unwind: "$orderer",
  });

  if (start !== undefined && start !== "") {
    pipeline.push({
      createdAt: {
        $gte: new Date(start),
      },
    });
  }
  if (end !== undefined && end !== "") {
    pipeline.push({
      createdAt: {
        $lt: new Date(end),
      },
    });
  }

  // const pipeline2 = [];
  // if (start !== undefined && start !== "") {
  //   pipeline2.push({
  //     createdAt: {
  //       $gte: new Date(start),
  //     },
  //   });
  // }
  // if (end !== undefined && end !== "") {
  //   pipeline2.push({
  //     createdAt: {
  //       $lt: new Date(end),
  //     },
  //   });
  // }
  let orders;
  try {
    orders = await orderDetailModel.aggregate(pipeline);
    // .populate([{ path: "order" }, { path: "cake" }, { path: "category" }])
    // .find(pipeline2);
  } catch (error) {
    console.log(error);
    orders = [];
  }

  return orders;
};

module.exports = {
  getRetrieveOrders,
};
