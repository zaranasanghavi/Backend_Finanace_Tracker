const router = require("express").Router();

const controller =
require("./controller");

const authMiddleware =
require("../../middlewares/auth.middleware");

const rbac =
require("../../middlewares/rbac.middleware");


router.get(
 "/",
 authMiddleware,
 rbac("admin"),
 controller.getUsers
);


router.patch(
 "/:id/role",
 authMiddleware,
 rbac("admin"),
 controller.updateRole
);


router.patch(
 "/:id/status",
 authMiddleware,
 rbac("admin"),
 controller.updateStatus
);


router.get(
 "/me",
 authMiddleware,
 controller.getMe
);


module.exports = router;