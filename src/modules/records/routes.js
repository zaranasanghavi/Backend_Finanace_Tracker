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
 controller.createRecord
);


router.get(
 "/",
 authMiddleware,
 rbac("analyst","admin", "viewer"),
 controller.getRecords
);


router.get(
 "/:id",
 authMiddleware,
 rbac("analyst","admin", "viewer"),
 controller.getRecordById
);


router.patch(
 "/:id",
 authMiddleware,
 rbac("admin"),
 controller.updateRecord
);


router.delete(
 "/:id",
 authMiddleware,
 rbac("admin"),
 controller.deleteRecord
);


module.exports = router;