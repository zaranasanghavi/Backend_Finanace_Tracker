const db = require("../../config/db");

exports.getUsers = async (limit, offset) => {

 const result = await db.query(

  `SELECT id,name,email,role,status,created_at
   FROM users
   ORDER BY created_at DESC
   LIMIT $1 OFFSET $2`,

  [limit, offset]

 );

 return result.rows;

};


exports.countUsers = async () => {

 const result = await db.query(
  `SELECT COUNT(*) FROM users`
 );

 return parseInt(result.rows[0].count);

};


exports.updateRole = async (id, role) => {

 const result = await db.query(

  `UPDATE users
   SET role=$1
   WHERE id=$2
   RETURNING id,email,role`,

  [role, id]

 );

 return result.rows[0];

};


exports.updateStatus = async (id, status) => {

 const result = await db.query(

  `UPDATE users
   SET status=$1
   WHERE id=$2
   RETURNING id,email,status`,

  [status, id]

 );

 return result.rows[0];

};


exports.getMe = async id => {

 const result = await db.query(

  `SELECT id,name,email,role,status
   FROM users
   WHERE id=$1`,

  [id]

 );

 return result.rows[0];

};