const service = require("./service");



const {
 registerSchema,
 loginSchema
} = require("./validation");


exports.register = async (req,res,next)=>{

 try{

 registerSchema.parse(req.body);

 const result =
 await service.register(req.body);

 res.status(201).json(result);

 }

 catch(err){

 next(err);

 }

};


exports.login = async (req,res,next)=>{

 try{

 loginSchema.parse(req.body);

 const result =
 await service.login(

  req.body,
  req.headers["user-agent"],
  req.ip

 );

 res.json(result);

 }

 catch(err){

 next(err);

 }

};


exports.refresh = async (req,res,next)=>{

 try{

 const token =
 req.body.refreshToken;

const result = await service.refresh(
 req.body.refreshToken,
 req.headers["user-agent"],
 req.ip
);

 res.json(result);

 }

 catch(err){

 next(err);

 }

};


exports.logout = async (req,res,next)=>{

 try{

 await service.logout(
  req.body.refreshToken
 );

 res.json({
  message:"Logged out"
 });

 }

 catch(err){

 next(err);

 }

};