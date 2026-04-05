const router = require("express").Router();

const controller =
require("./controller");

const authMiddleware =
require("../../middlewares/auth.middleware");

const rbac =
require("../../middlewares/rbac.middleware");


router.get(
 "/summary",
 authMiddleware,
 rbac("analyst","admin"),
 controller.getSummary
);


router.get(
 "/by-category",
 authMiddleware,
 rbac("analyst","admin"),
 controller.getCategoryTotals
);


router.get(
 "/trends",
 authMiddleware,
 rbac("analyst","admin"),
 controller.getMonthlyTrends
);


router.get(
 "/recent",
 authMiddleware,
 rbac("analyst","admin"),
 controller.getRecentRecords
);


module.exports = router;