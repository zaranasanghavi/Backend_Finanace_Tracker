const repository = require("./repository");
const AppError = require("../../utils/Apperror");
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
  const result = await repository.updateRole(id, role);
  if (!result) throw new AppError("User not found", 404);
  return result;
};

exports.updateStatus = async (id, status) => {

  const result = await repository.updateStatus(
  id,
  status
 );
 if (!result) throw new AppError("User not found", 404);
 return result;

};


exports.getMe = async id => {

 return await repository.getMe(id);

};

const userRepository = require("./repository");

exports.getUserById = async (id) => {
  const user = await userRepository.getUserById(id);
  return user;
};