const service = require("./service");

const {
 roleSchema,
 statusSchema
} = require("./validation");


exports.getUsers =
async (req, res, next) => {

 try {

  const page =
  parseInt(req.query.page) || 1;

  const limit =
  parseInt(req.query.limit) || 10;

  const result =
  await service.getUsers(
   page,
   limit
  );

  res.json(result);

 } catch (err) {

  next(err);

 }

};


exports.updateRole =
async (req, res, next) => {

 try {

  roleSchema.parse(req.body);

  const result =
  await service.updateRole(

   req.params.id,
   req.body.role

  );

  res.json(result);

 } catch (err) {

  next(err);

 }

};


exports.updateStatus =
async (req, res, next) => {

 try {

  statusSchema.parse(req.body);

  const result =
  await service.updateStatus(

   req.params.id,
   req.body.status

  );

  res.json(result);

 } catch (err) {

  next(err);

 }

};


exports.getMe =
async (req, res, next) => {

 try {

  const result =
  await service.getMe(
   req.user.id
  );

  res.json(result);

 } catch (err) {

  next(err);

 }

};