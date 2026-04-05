const db = require("../../config/db");


exports.createRecord = async data => {

 const result = await db.query(

  `INSERT INTO financial_records
  (user_id,category_id,type,amount,record_date,notes)

  VALUES ($1,$2,$3,$4,$5,$6)

  RETURNING *`,

  [

   data.user_id,
   data.category_id,
   data.type,
   data.amount,
   data.record_date,
   data.notes

  ]

 );

 return result.rows[0];

};


exports.getRecords = async (filters, limit, offset) => {

 let query = `
  SELECT *
  FROM financial_records
  WHERE deleted_at IS NULL
 `;

 const values = [];
 let index = 1;

 if (filters.type) {
  query += ` AND type=$${index}`;
  values.push(filters.type);
  index++;
 }

 if (filters.category_id) {
  query += ` AND category_id=$${index}`;
  values.push(filters.category_id);
  index++;
 }

 if (filters.startDate) {
  query += ` AND record_date >= $${index}`;
  values.push(filters.startDate);
  index++;
 }

 if (filters.endDate) {
  query += ` AND record_date <= $${index}`;
  values.push(filters.endDate);
  index++;
 }

 // LIMIT
 query += ` LIMIT $${index}`;
 values.push(limit);
 index++;

 // OFFSET
 query += ` OFFSET $${index}`;
 values.push(offset);

 const result = await db.query(query, values);
 return result.rows;
};


exports.countRecords = async (filters) => {

 let query =

 `SELECT COUNT(*)
  FROM financial_records
  WHERE deleted_at IS NULL`;

 const values = [];

 let index = 2;


 if (filters.type) {

  query += ` AND type=$${index++}`;

  values.push(filters.type);

 }


 if (filters.category_id) {

  query += ` AND category_id=$${index++}`;

  values.push(filters.category_id);

 }


 if (filters.startDate) {

  query += ` AND record_date >= $${index++}`;

  values.push(filters.startDate);

 }


 if (filters.endDate) {

  query += ` AND record_date <= $${index++}`;

  values.push(filters.endDate);

 }


 const result = await db.query(query, values);

 return parseInt(result.rows[0].count);

};

exports.findByName = async (name, type) => {

 const result = await db.query(

  `SELECT *
   FROM categories
   WHERE LOWER(name)=LOWER($1)
   AND type=$2`,

  [name, type]

 );

 return result.rows[0];

};


exports.getRecordById = async id => {

 const result = await db.query(

  `SELECT *
   FROM financial_records
   WHERE id=$1
   AND deleted_at IS NULL`,

  [id]

 );

 return result.rows[0];

};


exports.updateRecord = async (id, fields) => {

 const keys = Object.keys(fields);

 const values = Object.values(fields);

 const updates = keys.map(
  (key, i) => `${key}=$${i+2}`
 ).join(",");


 const result = await db.query(

  `UPDATE financial_records
   SET ${updates}
   WHERE id=$1
   RETURNING *`,

  [id, ...values]

 );

 return result.rows[0];

};


exports.softDeleteRecord = async id => {

 await db.query(

  `UPDATE financial_records
   SET deleted_at=NOW()
   WHERE id=$1`,

  [id]

 );

};

exports.createCategory = async (data) => {

 const result = await db.query(
  `INSERT INTO categories (name, type)
   VALUES ($1, $2)
   RETURNING *`,
  [data.name, data.type]
 );

 return result.rows[0];
};