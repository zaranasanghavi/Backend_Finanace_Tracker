const { z } = require("zod");

exports.createRecordSchema = z.object({

 amount: z.number().positive(),

 type: z.enum(["income", "expense"]),

 category_id: z.string().uuid().optional(),

 category: z.string().min(2).optional(),

 record_date: z.string(),

 notes: z.string().optional()

}).refine(

 data => data.category_id || data.category,

 {
  message: "Either category_id or category is required"
 }

);;


exports.updateRecordSchema = z.object({

 amount: z.number().positive().optional(),

 type: z.enum(["income", "expense"]).optional(),

 category_id: z.string().uuid().optional(),

 record_date: z.string().optional(),

 notes: z.string().optional()

});