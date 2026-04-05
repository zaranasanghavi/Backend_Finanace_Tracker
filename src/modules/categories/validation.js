const { z } = require("zod");


exports.createCategorySchema = z.object({

 name: z.string().min(2),

 type: z.enum(["income","expense"])

});


exports.updateCategorySchema = z.object({

 name: z.string().min(2),

 type: z.enum(["income","expense"])

});