const repository = require("./repository");


exports.createCategory = async body => {

 const category =
 await repository.createCategory(body);

 if (!category)

  throw {
   statusCode: 400,
   message: "Category creation failed"
  };

 return category;

};


exports.getCategories = async () => {

 const categories =
 await repository.getCategories();

 return categories;

};


exports.updateCategory = async (id, body) => {

 const category =
 await repository.updateCategory(id, body);

 if (!category)

  throw {
   statusCode: 404,
   message: "Category not found"
  };

 return category;

};

exports.deleteCategory = async id => {

 const deleted =
 await repository.deleteCategory(id);

 if (!deleted)

  throw {
   statusCode: 404,
   message: "Category not found or already deleted"
  };

};