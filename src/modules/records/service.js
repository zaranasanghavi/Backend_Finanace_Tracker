const repository = require("./repository");

const categoryRepo =
require("./repository");





exports.createRecord = async (body, userId) => {

 let categoryId = body.category_id;

 if (!categoryId && body.category) {

  let category =

  await categoryRepo.findByName(

   body.category,
   body.type

  );

  if (!category) {

   category =

   await categoryRepo.createCategory({

    name: body.category,
    type: body.type

   });

  }

  categoryId = category.id;

 }

 return await repository.createRecord({

  ...body,

  category_id: categoryId,

  user_id: userId

 });

};
exports.getRecords = async (

 filters,
 page,
 limit

) => {

 const offset = (page-1)*limit;

 const records =

 await repository.getRecords(

  filters,
  limit,
  offset

 );


 const total =

 await repository.countRecords(
  filters
 );


 return {

  data: records,

  meta: {

   total,
   page,
   pages: Math.ceil(total/limit)

  }

 };

};


exports.getRecordById = async id => {

 const record =
 await repository.getRecordById(id);

 if (!record)
  throw Error("Record not found");

 return record;

};


exports.updateRecord = async (id, body) => {

 return await repository.updateRecord(
  id,
  body
 );

};


exports.deleteRecord = async id => {

 await repository.softDeleteRecord(id);

};