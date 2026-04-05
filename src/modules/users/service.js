const repository = require("./repository");

exports.getUsers = async (page, limit) => {

 const offset = (page - 1) * limit;

 const users =
 await repository.getUsers(
  limit,
  offset
 );

 const total =
 await repository.countUsers();

 return {

  data: users,

  meta: {

   total,

   page,

   pages:
   Math.ceil(total / limit)

  }

 };

};


exports.updateRole = async (id, role) => {

 return await repository.updateRole(
  id,
  role
 );

};


exports.updateStatus = async (id, status) => {

 return await repository.updateStatus(
  id,
  status
 );

};


exports.getMe = async id => {

 return await repository.getMe(id);

};