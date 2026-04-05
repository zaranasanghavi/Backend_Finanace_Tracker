const repository = require("./repository");


const resolveScope = (userId, role) => {

 const isPrivileged =
 role === "admin" || role === "analyst";

 return isPrivileged
  ? null
  : userId;

};




exports.getSummary = async (userId, role) => {

 const result =
 await repository.getSummary(
  resolveScope(userId, role)
 );

 return {

  income: result.income || 0,
  expense: result.expense || 0,

  net:
  (result.income || 0)
  -
  (result.expense || 0)

 };

};




exports.getCategoryTotals = async (userId, role) => {

 return await repository.getCategoryTotals(

  resolveScope(userId, role)

 );

};




exports.getMonthlyTrends = async (userId, role) => {

 return await repository.getMonthlyTrends(

  resolveScope(userId, role)

 );

};




exports.getRecentRecords = async (

 userId,
 role,
 limit

) => {

 return await repository.getRecentRecords(

  resolveScope(userId, role),
  limit

 );

};