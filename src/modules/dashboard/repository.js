const db = require("../../config/db");


exports.getSummary = async (userId = null) => {

 let query = `
 SELECT
  SUM(CASE WHEN type='income' THEN amount ELSE 0 END) income,
  SUM(CASE WHEN type='expense' THEN amount ELSE 0 END) expense
 FROM financial_records
 WHERE deleted_at IS NULL
 `;

 let values = [];

 if (userId) {
  query += " AND user_id=$1";
  values.push(userId);
 }

 const result = await db.query(query, values);

 return result.rows[0];
};




exports.getCategoryTotals = async (userId = null) => {

 let query = `
 SELECT c.name,
  SUM(fr.amount) total
 FROM financial_records fr
 JOIN categories c
 ON fr.category_id = c.id
 WHERE fr.deleted_at IS NULL
 `;

 let values = [];

 if (userId) {
  query += " AND fr.user_id=$1";
  values.push(userId);
 }

 query += `
 GROUP BY c.name
 ORDER BY total DESC
 `;

 const result = await db.query(query, values);

 return result.rows;
};




exports.getMonthlyTrends = async (userId = null) => {

 let query = `
 SELECT
  TO_CHAR(record_date,'YYYY-MM') AS month,

  SUM(CASE
   WHEN type='income'
   THEN amount ELSE 0 END) income,

  SUM(CASE
   WHEN type='expense'
   THEN amount ELSE 0 END) expense

 FROM financial_records

 WHERE deleted_at IS NULL
 `;

 let values = [];

 if (userId) {
  query += " AND user_id=$1";
  values.push(userId);
 }

 query += `
 GROUP BY TO_CHAR(record_date,'YYYY-MM')
 ORDER BY TO_CHAR(record_date,'YYYY-MM')
 `;

 const result = await db.query(query, values);

 return result.rows;
};




exports.getRecentRecords = async (userId = null, limit = 10) => {

 let query = `
 SELECT *
 FROM financial_records
 WHERE deleted_at IS NULL
 `;

 let values = [];

 if (userId) {
  query += " AND user_id=$1";
  values.push(userId);
 }

 query += `
 ORDER BY created_at DESC
 LIMIT $${values.length + 1}
 `;

 values.push(limit);

 const result = await db.query(query, values);

 return result.rows;
};