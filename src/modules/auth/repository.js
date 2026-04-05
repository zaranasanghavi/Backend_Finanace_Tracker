const db = require("../../config/db");

exports.findUserByEmail = async email => {

 const result = await db.query(

  `SELECT * FROM users
   WHERE email=$1`,

  [email]

 );

 return result.rows[0];

};
exports.findUserById = async (id) => {
  const result = await db.query(
    `SELECT id, name, email, role FROM users WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};

exports.createUser = async (
 name,
 email,
 passwordHash
) => {

 const result = await db.query(

  `INSERT INTO users
   (name,email,password_hash)

   VALUES ($1,$2,$3)

   RETURNING id,email,role`,

  [name,email,passwordHash]

 );

 return result.rows[0];

};


exports.storeRefreshToken = async (

 userId,
 refreshToken,
 userAgent,
 ipAddress,
 expiresAt

) => {

 await db.query(

  `INSERT INTO sessions
  (user_id,refresh_token,user_agent,
   ip_address,expires_at)

  VALUES ($1,$2,$3,$4,$5)`,

  [
   userId,
   refreshToken,
   userAgent,
   ipAddress,
   expiresAt
  ]

 );

};


exports.deleteRefreshToken = async token => {

 await db.query(

  `DELETE FROM sessions
   WHERE refresh_token=$1`,

  [token]

 );

};


exports.findRefreshToken = async token => {

 const result = await db.query(

  `SELECT * FROM sessions
   WHERE refresh_token=$1`,

  [token]

 );

 return result.rows[0];

};
