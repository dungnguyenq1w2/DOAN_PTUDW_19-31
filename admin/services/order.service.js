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
  let orders = [];
  try {
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
    // } else {
    //   orders = [];
    // }
  } catch (error) {
    console.log(error);
    orders = [];
  }
  return orders;
};

const getProductRanking = async () => {
  let rankResults = [];
  // let orders = [];
  try {
    // rankResults = await orderModel.find().populate([
    //   {
    //     path: "wares.cake",
    //     model: "Cake",
    //     populate: { path: "category", model: "Category" },
    //   },
    // ]);
    const orders = await orderModel.find();
    let arrTemp = [];
    for (const order of orders)
    {
      arrTemp.push(...order.wares)
    }
    let frequency = [];
    for (const ware of arrTemp)
    {
      if (frequency[ware.cake.toString()] !== undefined)
        frequency[ware.cake.toString()] += ware.quantity;
      else
        frequency[ware.cake.toString()] = ware.quantity;
    }
    // let temp = frequency;
    // keysSorted = Object.keys(frequency).sort(function(a,b){return list[b]-list[a]})
    // frequency.sort();
    let keys = Object.keys(frequency);
    let values = Object.values(frequency);
    // console.log(frequency);
    // console.log(arrTemp);
    for (let i = 0; i < keys.length; i++)
    {
      rankResults.push({
        cake: keys[i],
        quantity: values[i],
      });
    }
    // console.log(temp);
    rankResults.sort((a, b) => b.quantity - a.quantity);
    // console.log(temp);
    for (const t of rankResults) {
      const cake = await cakeModel.findById(t.cake).populate([{path:"category",model:"Category"}]);
      t.cake = cake;
    }
    // for (const t of rankResults) {
    //   const cake = await cakeModel.findById(t.cake).lean();
    //   const { name } = await categoryModel.findById(cake.category.toString()).lean();
    //   cake.category = name;
    //   t.cake = cake;
    // }

  } catch (err) {
    console.log(err);
    rankResults = [];
    // temp = [];
  }
  return rankResults;
};
module.exports = {
  getRetrieveOrders,
  getProductRanking,
};
