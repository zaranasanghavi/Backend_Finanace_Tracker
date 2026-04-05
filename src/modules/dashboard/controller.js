const service = require("./service");


exports.getSummary = async (

 req,
 res,
 next

) => {

 try {

 const result =
 await service.getSummary(
  req.user.id,
  req.user.role
 );

 res.json(result);

 }

 catch (err) {

 next(err);

 }

};



exports.getCategoryTotals = async (

 req,
 res,
 next

) => {

 try {

 const result =
 await service.getCategoryTotals(
  req.user.id,
  req.user.role
 );

 res.json(result);

 }

 catch (err) {

 next(err);

 }

};



exports.getMonthlyTrends = async (

 req,
 res,
 next

) => {

 try {

 const result =
 await service.getMonthlyTrends(
  req.user.id,
  req.user.role
 );

 res.json(result);

 }

 catch (err) {

 next(err);

 }

};



exports.getRecentRecords = async (

 req,
 res,
 next

) => {

 try {

 const limit =
 parseInt(req.query.limit) || 10;

 const result =
 await service.getRecentRecords(

  req.user.id,
  req.user.role,
  limit

 );

 res.json(result);

 }

 catch (err) {

 next(err);

 }

};