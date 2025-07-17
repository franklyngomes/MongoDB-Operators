const fs = require("fs").promises;
const fsSync = require("fs");
const path = require("path");
const RestaurantModel = require("../model/RestaurantModel");

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
      const data = await RestaurantModel.find(
        {},
        { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }
      );
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
      const data = await RestaurantModel.find(
        {},
        { restaurant_id: 1, name: 1, borough: 1, cuisine: 1, _id: 0 }
      );
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
      const data = await RestaurantModel.find(
        {},
        { restaurant_id: 1, name: 1, borough: 1, "address.zipcode": 1, _id: 0 }
      );
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
      const data = await RestaurantModel.find({ borough: "Bronx" });
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
      const data = await RestaurantModel.find({ borough: "Bronx" }).limit(5);
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
      const data = await RestaurantModel.find({ borough: "Bronx" })
        .skip(5)
        .limit(5);
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
  //8. Write a MongoDB query to find the restaurants who achieved a score more than 90.
  async Eight(req, res) {
    try {
      const data = await RestaurantModel.find({
        grades: { $elemMatch: { score: { $gt: 90 } } },
      });
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
  //9. Write a MongoDB query to find the restaurants that achieved a score, more than 80 but less than 100.
  async Nine(req, res) {
    try {
      const data = await RestaurantModel.find({
        grades: { $elemMatch: { score: { $gt: 80, $lt: 90 } } },
      });
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
  //10. Write a MongoDB query to find the restaurants which locate in latitude value less than -95.754168.
  async Ten(req, res) {
    try {
      const data = await RestaurantModel.find({
        "address.coord": { $lt: -95.754168 },
      });
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
  // /11. Write a MongoDB query to find the restaurants that do not prepare any cuisine of 'American' and their grade score more than 70 and latitude less than -65.754168.
  async Eleven(req, res) {
    try {
      const data = await RestaurantModel.find({
        $and: [
          { cuisine: { $ne: "American " } },
          { "grades.score": { $gt: 70 } },
          { "address.coord": { $lt: -65.754168 } },
        ],
      });
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
  //12. Write a MongoDB query to find the restaurants which do not prepare any cuisine of 'American' and achieved a score more than 70 and located in the longitude less than -65.754168.
  // Note : Do this query without using $and operator.
  async Twelve(req, res) {
    try {
      const data = await RestaurantModel.find({
        cuisine: { $ne: "American " },
        "grades.score": { $gt: 70 },
        "address.coord": { $lt: -65.754168 },
      });
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
  //13. Write a MongoDB query to find the restaurants which do not prepare any cuisine of 'American' and achieved a grade point 'A' not belongs to the borough Brooklyn. The document must be displayed according to the cuisine in descending order.
  async Thirteen(req, res) {
    try {
      const data = await RestaurantModel.find({
        cuisine: { $ne: "American " },
        "grades.grade": { $eq: "A" },
        borough: { $ne: "Brooklyn" },
      }).sort({ cuisine: -1 });
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
  //14. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which contain 'Wil' as first three letters for its name.
  async Fourteen(req, res) {
    try {
      const data = await RestaurantModel.find(
        { name: { $regex: /^Wil/ } },
        { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }
      );
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
  //15. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which contain 'ces' as last three letters for its name.
  async Fifteen(req, res) {
    try {
      const data = await RestaurantModel.find(
        { name: { $regex: /ces$/ } },
        { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }
      );
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
  //16. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which contain 'Reg' as three letters somewhere in its name.
  async Sixteen(req, res) {
    try {
      const data = await RestaurantModel.find(
        { name: { $regex: /Reg/ } },
        { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }
      );
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
  //17. Write a MongoDB query to find the restaurants which belong to the borough Bronx and prepared either American or Chinese dish.
  async Seventeen(req, res) {
    try {
      const data = await RestaurantModel.find({
        borough: "Bronx",
        $or: [{ cuisine: "American " }, { cuisine: "Chinese" }],
      });
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
  //18. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which belong to the borough Staten Island or Queens or Bronxor Brooklyn.
   async Eighteen(req, res) {
    try {
      const data = await RestaurantModel.find({$or: [{borough: "Staten Island"}, {borough: "Queens"}, {borough: "Bronx"}, {borough: "Brooklyn"}]}, {restaurant_id: 1, name: 1, borough: 1, cuisine: 1 });
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
  //19. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which are not belonging to the borough Staten Island or Queens or Bronx or Brooklyn.
  async Nineteen(req, res) {
    try {
      const data = await RestaurantModel.find({$and: [{borough: {$ne: "Staten Island"}}, {borough: {$ne: "Queens"}}, {borough: {$ne: "Bronx"}}, {borough: {$ne: "Brooklyn"}}]}, {restaurant_id: 1, name: 1, borough: 1, cuisine: 1 });
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
  //20. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which achieved a score which is not more than 10.
  async Twenty(req, res) {
    try {
      const data = await RestaurantModel.find({"grades.score": {$lte: 10}}, {restaurant_id: 1, name: 1, borough: 1, cuisine: 1 });
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
  //21. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which prepared dish except 'American' and 'Chinees' or restaurant's name begins with letter 'Wil'.
  async TwentyOne(req, res) {
    try {
      const data = await RestaurantModel.find({$or: [{$and: [{cuisine: {$ne: "American "}}, {cuisine: {$ne: "Chinese"}}]}, {name: {$regex: /^Wil/}}]}, {restaurant_id: 1, name: 1, borough: 1, cuisine: 1 });
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
  //22. Write a MongoDB query to find the restaurant Id, name, and grades for those restaurants which achieved a grade of "A" and scored 11 on an ISODate "2014-08-11T00:00:00Z" among many of survey dates..
  async TwentyTwo(req, res) {
    try {
      const data = await RestaurantModel.find({grades: {$elemMatch: {date: new Date("2014-08-11T00:00:00Z"), grade: "A", score: 11}}}, {restaurant_id: 1, name: 1, grades: 1 });
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
  //23. Write a MongoDB query to find the restaurant Id, name and grades for those restaurants where the 2nd element of grades array contains a grade of "A" and score 9 on an ISODate "2014-08-11T00:00:00Z".
  async TwentyThree(req, res) {
    try {
      const data = await RestaurantModel.find({"grades.1.date": new Date("2014-08-11T00:00:00Z"), "grades.1.grade": "A", "grades.1.score": 9}, {restaurant_id: 1, name: 1, grades: 1 });
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
  //24. Write a MongoDB query to find the restaurant Id, name, address and geographical location for those restaurants where 2nd element of coord array contains a value which is more than 42 and upto 52.
  async TwentyFour(req, res) {
    try {
      const data = await RestaurantModel.find({$and: [{"address.coord.1": {$gt: 42}}, {"address.coord.1":{$lte: 52}}]},{restaurant_id: 1, name: 1, address: 1 });
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
  //25. Write a MongoDB query to arrange the name of the restaurants in ascending order along with all the columns.
  async TwentyFive(req, res) {
    try {
      const data = await RestaurantModel.find().sort({name: 1});
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
  //26. Write a MongoDB query to arrange the name of the restaurants in descending along with all the columns
  async TwentySix(req, res) {
    try {
      const data = await RestaurantModel.find().sort({name: -1});
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
  //27. Write a MongoDB query to arranged the name of the cuisine in ascending order and for that same cuisine borough should be in descending order.
  async TwentySeven(req, res) {
    try {
      const data = await RestaurantModel.find().sort({"cuisine": 1, "borough": -1});
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
  //28. Write a MongoDB query to know whether all the addresses contains the street or not.
  async TwentyEight(req, res) {
    try {
      const data = await RestaurantModel.find({address: {$exists: "street"}});
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
  //29. Write a MongoDB query which will select all documents in the restaurants collection where the coord field value is Double.
  async TwentyNine(req, res) {
    try {
      const data = await RestaurantModel.find({"address.coord": {$type: 1}});
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
  //30. Write a MongoDB query which will select the restaurant Id, name and grades for those restaurants which returns 0 as a remainder after dividing the score by 7.
   async Thirty(req, res) {
    try {
      const data = await RestaurantModel.find({"grades.score": {$mod: [7,0]}}, {restaurant_id: 1, name: 1, grades: 1});
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
  //31. Write a MongoDB query to find the restaurant name, borough, longitude and attitude and cuisine for those restaurants which contains 'mon' as three letters somewhere in its name.
  async ThirtyOne(req, res) {
    try {
      const data = await RestaurantModel.find({name: {$regex: /mon/}}, {restaurant_id: 1, name: 1, "address.coord": 1, borough: 1});
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
  //32. Write a MongoDB query to find the restaurant name, borough, longitude and latitude and cuisine for those restaurants which contain 'Mad' as first three letters of its name.
   async ThirtyTwo(req, res) {
    try {
      const data = await RestaurantModel.find({name: {$regex: /^Mad/}}, {restaurant_id: 1, name: 1, "address.coord": 1, borough: 1});
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
  //33. Write a MongoDB query to find the restaurants that have at least one grade with a score of less than 5.
  async ThirtyThree(req, res) {
    try {
      const data = await RestaurantModel.find({"grades.score": {$lt: 5}});
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
  //34. Write a MongoDB query to find the restaurants that have at least one grade with a score of less than 5 and that are located in the borough of Manhattan.
  async ThirtyFour(req, res) {
    try {
      const data = await RestaurantModel.find({$and: [{"grades.score": {$lt: 5}}, {borough: "Manhattan"}]});
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
  //35. Write a MongoDB query to find the restaurants that have at least one grade with a score of less than 5 and that are located in the borough of Manhattan or Brooklyn.
  async ThirtyFive(req, res) {
    try {
      const data = await RestaurantModel.find({$and: [{"grades.score": {$lt: 5}}, {$or: [{borough: "Manhattan"}, {borough: "Brooklyn"}]}]});
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
  //36. Write a MongoDB query to find the restaurants that have at least one grade with a score of less than 5 and that are located in the borough of Manhattan or Brooklyn, and their cuisine is not American.
  async ThirtySix(req, res) {
    try {
      const data = await RestaurantModel.find({$and: [{"grades.score": {$lt: 5}}, {$or: [{borough: "Manhattan"}, {borough: "Brooklyn"}]}, {cuisine: {$ne: "American "}}]});
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
  //37. Write a MongoDB query to find the restaurants that have at least one grade with a score of less than 5 and that are located in the borough of Manhattan or Brooklyn, and their cuisine is not American or Chinese.
  async ThirtySeven(req, res) {
    try {
      const data = await RestaurantModel.find({$and: [{"grades.score": {$lt: 5}}, {$or: [{borough: "Manhattan"}, {borough: "Brooklyn"}]}, {$and: [{cuisine: {$ne: "American "}}, {cuisine: {$ne: "Chinese"}}]}]});
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
  // /38. Write a MongoDB query to find the restaurants that have a grade with a score of 2 and a grade with a score of 6.
   async ThirtyEight(req, res) {
    try {
      const data = await RestaurantModel.find({$and: [{"grades.score" : {$eq: 2}}, {"grades.score" : {$eq: 6}}]});
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
  //39. Write a MongoDB query to find the restaurants that have a grade with a score of 2 and a grade with a score of 6 and are located in the borough of Manhattan.
  async ThirtyNine(req, res) {
    try {
      const data = await RestaurantModel.find({$and: [{"grades.score" : {$eq: 2}}, {"grades.score" : {$eq: 6}},{borough: "Manhattan"}]});
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
  //40. Write a MongoDB query to find the restaurants that have a grade with a score of 2 and a grade with a score of 6 and are located in the borough of Manhattan or Brooklyn.
  async Forty(req, res) {
    try {
      const data = await RestaurantModel.find({$and: [{"grades.score" : {$eq: 2}}, {"grades.score" : {$eq: 6}},{$or: [{borough: "Manhattan"},{borough: "Brooklyn"}]}]});
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
  //41. Write a MongoDB query to find the restaurants that have a grade with a score of 2 and a grade with a score of 6 and are located in the borough of Manhattan or Brooklyn, and their cuisine is not American.
   async FortyOne(req, res) {
    try {
      const data = await RestaurantModel.find({$and: [{grades: {$elemMatch: {score: 2}}}, {grades: {$elemMatch: {score: 6}}},{borough: {$in: ["Brooklyn", "Manhattan"]}},{cuisine: {$nin: ["American "]}}]});
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
  //42. Write a MongoDB query to find the restaurants that have a grade with a score of 2 and a grade with a score of 6 and are located in the borough of Manhattan or Brooklyn, and their cuisine is not American or Chinese.
  async FortyTwo(req, res) {
    try {
      const data = await RestaurantModel.find({$and: [{grades: {$elemMatch: {score: 2}}}, {grades: {$elemMatch: {score: 6}}},{borough: {$in: ["Brooklyn", "Manhattan"]}},{cuisine: {$nin: ["American ", "Chinese"]}}]});
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
  //43. Write a MongoDB query to find the restaurants that have a grade with a score of 2 or a grade with a score of 6.
   async FortyThree(req, res) {
    try {
      const data = await RestaurantModel.find({$and: [{grades: {$elemMatch: {score: 2}}}, {grades: {$elemMatch: {score: 6}}}]});
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
  //44. Write a MongoDB query to find the restaurants that have a grade with a score of 2 or a grade with a score of 6 and are located in the borough of Manhattan.
   async FortyFour(req, res) {
    try {
      const data = await RestaurantModel.find({$and: [{grades: {$elemMatch: {score: 2}}}, {grades: {$elemMatch: {score: 6}}}, {borough: {$in: ["Manhattan"]}}]});
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
  //45. Write a MongoDB query to find the restaurants that have a grade with a score of 2 or a grade with a score of 6 and are located in the borough of Manhattan or Brooklyn.
  async FortyFive(req, res) {
    try {
      const data = await RestaurantModel.find({$and: [{grades: {$elemMatch: {score: 2}}}, {grades: {$elemMatch: {score: 6}}}, {borough: {$in: ["Manhattan", "Brooklyn"]}}]});
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
  //46. Write a MongoDB query to find the restaurants that have a grade with a score of 2 or a grade with a score of 6 and are located in the borough of Manhattan or Brooklyn, and their cuisine is not American.
   async FortySix(req, res) {
    try {
      const data = await RestaurantModel.find({$and: [{grades: {$elemMatch: {score: 2}}}, {grades: {$elemMatch: {score: 6}}}, {borough: {$in: ["Manhattan", "Brooklyn"]}}, {cuisine: {$nin: ["American "]}}]});
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
  //47. Write a MongoDB query to find the restaurants that have a grade with a score of 2 or a grade with a score of 6 and are located in the borough of Manhattan or Brooklyn, and their cuisine is not American or Chinese.
  async FortySeven(req, res) {
    try {
      const data = await RestaurantModel.find({$and: [{grades: {$elemMatch: {score: 2}}}, {grades: {$elemMatch: {score: 6}}}, {borough: {$in: ["Manhattan", "Brooklyn"]}}, {cuisine: {$nin: ["American ", "Chinese"]}}]});
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
  //48. Write a MongoDB query to find the restaurants that have all grades with a score greater than 5.
   async FortyEight(req, res) {
    try {
      const data = await RestaurantModel.find({$and: [{grades: {$elemMatch: {score: {$gt: 5}}}}]});
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
  //49. Write a MongoDB query to find the restaurants that have all grades with a score greater than 5 and are located in the borough of Manhattan.
  async FortyNine(req, res) {
    try {
      const data = await RestaurantModel.find({$and: [{grades: {$elemMatch: {score: {$gt: 5}}}}, {borough: {$in: ["Manhattan"]}}]});
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
  //50. Write a MongoDB query to find the restaurants that have all grades with a score greater than 5 and are located in the borough of Manhattan or Brooklyn.
  async Fifty(req, res) {
    try {
      const data = await RestaurantModel.find({$and: [{grades: {$elemMatch: {score: {$gt: 5}}}}, {borough: {$in: ["Manhattan", "Brooklyn"]}}]});
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
  //51. Write a MongoDB query to find the average score for each restaurant.
  
}
module.exports = new RestaurantController();
