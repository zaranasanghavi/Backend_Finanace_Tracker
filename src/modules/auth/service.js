const repository = require("./repository");
const AppError = require("../../utils/Apperror.js");
const {
 hashPassword,
 comparePassword
} = require("../../utils/hash");

const {
 generateAccessToken,
 generateRefreshToken
} = require("../../utils/jwt");


exports.register = async body => {

 const existingUser =
 await repository.findUserByEmail(
  body.email
 );

 if (existingUser)
  throw new AppError("Email already exists", 400);


 const hashed =
 await hashPassword(body.password);


 const user =
 await repository.createUser(

  body.name,
  body.email,
  hashed

 );


 return user;

};


exports.login = async (

 body,
 userAgent,
 ipAddress

) => {

 const user =
 await repository.findUserByEmail(
  body.email
 );

 if (!user)
  throw new AppError("User not found", 404);


 const match =
 await comparePassword(

  body.password,
  user.password_hash

 );

 if (!match)
  throw new AppError("Invalid credentials", 401);


 const payload = {

  id: user.id,
  role: user.role

 };


 const accessToken =
 generateAccessToken(payload);


 const refreshToken =
 generateRefreshToken(payload);


 const expiresAt =
 new Date(Date.now() + 7*24*60*60*1000);


 await repository.storeRefreshToken(

  user.id,
  refreshToken,
  userAgent,
  ipAddress,
  expiresAt

 );


 return {

  accessToken,
  refreshToken

 };

};


const jwt = require("jsonwebtoken");

exports.refresh = async (token, userAgent, ipAddress) => {

 try {

  const decoded = jwt.verify(
   token,
   process.env.JWT_REFRESH_SECRET
  );

  const session =
   await repository.findRefreshToken(token);

  if (!session)
   throw new AppError("Invalid session", 401);

  if (new Date(session.expires_at) < new Date())
   throw new AppError("Session expired", 401);

  await repository.deleteRefreshToken(token);

  const user =
   await repository.findUserById(decoded.id);

  if (!user)
   throw new AppError("User not found", 404);

  const payload = {
   id: user.id,
   role: user.role
  };

  const newAccessToken =
   generateAccessToken(payload);

  const newRefreshToken =
   generateRefreshToken(payload);

  const expiresAt =
   new Date(Date.now() + 7*24*60*60*1000);

  await repository.storeRefreshToken(
   payload.id,
   newRefreshToken,
   userAgent,
   ipAddress,
   expiresAt
  );

  return {
   accessToken: newAccessToken,
   refreshToken: newRefreshToken
  };

 } catch (err) {
  throw new AppError("Token expired or invalid", 401);
 }
};


exports.logout = async token => {

 await repository.deleteRefreshToken(
  token

 );

};
