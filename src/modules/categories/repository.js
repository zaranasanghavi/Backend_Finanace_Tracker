const db = require("../../config/db");


exports.createCategory = async data => {

 const result = await db.query(

  `INSERT INTO categories (name, type)
   VALUES ($1,$2)
   RETURNING *`,

  [data.name, data.type]

 );

 return result.rows[0];

};


exports.getCategories = async () => {

 const result = await db.query(

  `SELECT *
   FROM categories
   WHERE deleted_at IS NULL
   ORDER BY created_at DESC`

 );

 return result.rows;

};


exports.updateCategory = async (id, data) => {

 const result = await db.query(

  `UPDATE categories
   SET name=$1, type=$2
   WHERE id=$3
   AND deleted_at IS NULL
   RETURNING *`,

  [data.name, data.type, id]

 );

 return result.rows[0];

};


exports.deleteCategory = async id => {

 await db.query(

  `DELETE FROM categories
   WHERE id=$1`,

  [id]

);
};