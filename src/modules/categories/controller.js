const service = require("./service");

const {

 createCategorySchema,
 updateCategorySchema

} = require("./validation");


exports.createCategory = async (req,res,next)=>{

 try{

 createCategorySchema.parse(req.body);

 const result =
 await service.createCategory(req.body);

 res.status(201).json(result);

 }

 catch(err){

 next(err);

 }

};


exports.getCategories = async (req,res,next)=>{

 try{

 const result =
 await service.getCategories();

 res.json(result);

 }

 catch(err){

 next(err);

 }

};


exports.updateCategory = async (req,res,next)=>{

 try{

 updateCategorySchema.parse(req.body);

 const result =
 await service.updateCategory(

  req.params.id,
  req.body

 );

 res.json(result);

 }

 catch(err){

 next(err);

 }

};


exports.deleteCategory = async (req,res,next)=>{

 try{

 await service.deleteCategory(

  req.params.id

 );

 res.json({

  message:"Category deleted"

 });

 }

 catch(err){

 next(err);

 }

};