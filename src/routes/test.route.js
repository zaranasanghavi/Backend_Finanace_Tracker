const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/auth.middleware");

router.get(
 "/test",
 authMiddleware,
 (req, res) => {
  res.json({
   message: "Protected route working",
   user: req.user
  });
 }
);
/*
const authMiddleware = require("../src/middlewares/auth.middleware");

app.get("/api/test", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route working",
    user: req.user
  });
});

const rbac = require("../src/middlewares/rbac.middleware.js");

app.get(
 "/admin-test",
 authMiddleware,
 rbac("admin"),
 (req,res)=>{
  res.json({ message: "Admin only" });
 }
);
*/
module.exports = router;