const { z } = require("zod");

exports.roleSchema = z.object({

 role: z.enum([
  "viewer",
  "analyst",
  "admin"
 ])

});


exports.statusSchema = z.object({

 status: z.enum([
  "active",
  "inactive"
 ])

});