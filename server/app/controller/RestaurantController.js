const fs = require("fs").promises;
const fsSync = require("fs");
const path = require("path")
const RestaurantModel = require("../model/RestaurantModel")

class RestaurantController {
  //1. Write a MongoDB query to display all the documents in the collection restaurants.
  async One(req, res) {
    try {
      const data = await RestaurantModel.find();
      return res.status(200).json({
        status: true,
        message: "Documents fetched successfully",
        data: data,
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  }

  //2. Write a MongoDB query to display the fields restaurant_id, name, borough and cuisine for all the documents in the collection restaurant.
  async Two(req, res) {
    try {
      const data = await RestaurantModel.find({},{"restaurant_id" : 1, "name": 1, "borough": 1,"cuisine": 1});
      return res.status(200).json({
        status: true,
        message: "Documents fetched successfully",
        data: data,
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  }
  //3. Write a MongoDB query to display the fields restaurant_id, name, borough and cuisine, but exclude the field _id for all the documents in the collection restaurant.
  async Three(req, res) {
    try {
      const data = await RestaurantModel.find({},{"restaurant_id" : 1, "name": 1, "borough": 1,"cuisine": 1, "_id": 0});
      return res.status(200).json({
        status: true,
        message: "Documents fetched successfully",
        data: data,
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  }
  //4. Write a MongoDB query to display the fields restaurant_id, name, borough and zip code, but exclude the field _id for all the documents in the collection restaurant.
   async Four(req, res) {
    try {
      const data = await RestaurantModel.find({},{"restaurant_id" : 1, "name": 1, "borough": 1,"address.zipcode": 1, "_id": 0});
      return res.status(200).json({
        status: true,
        message: "Documents fetched successfully",
        data: data,
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  }
  //5. Write a MongoDB query to display all the restaurant which is in the borough Bronx.
  async Five(req, res) {
    try {
      const data = await RestaurantModel.find({"borough": "Bronx"});
      return res.status(200).json({
        status: true,
        message: "Documents fetched successfully",
        data: data,
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  }
  //6. Write a MongoDB query to display the first 5 restaurant which is in the borough Bronx.
  async Six(req, res) {
    try {
      const data = await RestaurantModel.find({"borough": "Bronx"}).limit(5);
      return res.status(200).json({
        status: true,
        message: "Documents fetched successfully",
        data: data,
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  }
  //7.Write a MongoDB query to display the next 5 restaurants after skipping first 5 which are in the borough Bronx.
   async Seven(req, res) {
    try {
      const data = await RestaurantModel.find({"borough": "Bronx"}).skip(5).limit(5);
      return res.status(200).json({
        status: true,
        message: "Documents fetched successfully",
        data: data,
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  }

}
module.exports = new RestaurantController();
