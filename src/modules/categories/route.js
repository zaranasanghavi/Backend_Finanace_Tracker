const router = require("express").Router();

const controller =
require("./controller");

const authMiddleware =
require("../../middlewares/auth.middleware");

const rbac =
require("../../middlewares/rbac.middleware");


router.post(
 "/",
 authMiddleware,
 rbac("admin"),
 controller.createCategory
);


router.get(
 "/",
 authMiddleware,
 rbac("analyst","admin"),
 controller.getCategories
);


router.patch(
 "/:id",
 authMiddleware,
 rbac("admin"),
 controller.updateCategory
);


router.delete(
 "/:id",
 authMiddleware,
 rbac("admin"),
 controller.deleteCategory
);


module.exports = router;