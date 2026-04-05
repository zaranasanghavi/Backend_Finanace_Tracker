const service = require("./service");

const {

 createRecordSchema,
 updateRecordSchema

} = require("./validation");


exports.createRecord = async (req,res,next)=>{

 try{

 createRecordSchema.parse(req.body);

 const result =

 await service.createRecord(

  req.body,
  req.user.id

 );

 res.status(201).json(result);

 }

 catch(err){

 next(err);

 }

};


exports.getRecords = async (req,res,next)=>{

 try{

 const page =
 parseInt(req.query.page)||1;

 const limit =
 parseInt(req.query.limit)||10;


 const filters = {

  type:req.query.type,

  category_id:req.query.category_id,

  startDate:req.query.startDate,

  endDate:req.query.endDate

 };


 const result =

 await service.getRecords(

  filters,
  page,
  limit

 );

 res.json(result);

 }

 catch(err){

 next(err);

 }

};


exports.getRecordById = async (req,res,next)=>{

 try{

 const result =

 await service.getRecordById(
  req.params.id
 );

 res.json(result);

 }

 catch(err){

 next(err);

 }

};


exports.updateRecord = async (req,res,next)=>{

 try{

 updateRecordSchema.parse(req.body);

 const result =

 await service.updateRecord(

  req.params.id,
  req.body

 );

 res.json(result);

 }

 catch(err){

 next(err);

 }

};


exports.deleteRecord = async (req,res,next)=>{

 try{

 await service.deleteRecord(
  req.params.id
 );

 res.json({
  message:"Record deleted"
 });

 }

 catch(err){

 next(err);

 }

};