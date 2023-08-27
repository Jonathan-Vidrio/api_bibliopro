import { Router } from "express";
import { methodsUser as userController } from "../controllers/user.controller";
import { role } from "../middlewares/verifyRole";

// Create Router
const router = Router();

// Routes
router.get("/", role.isAdmin || role.isModerator, userController.getUsers);
router.get("/:id", role.isAdmin || role.isModerator || role.isUser, userController.getUSerById);
router.post("/", role.isAdmin || role.isModerator, userController.addUser);
router.put("/:id", role.isAdmin || role.isModerator, userController.updateUser);
router.put("/disable/:id", role.isAdmin || role.isModerator, userController.disableUser);
router.put("/activate/:id", role.isAdmin || role.isModerator, userController.activateUser);
router.delete("/:id", role.isAdmin, userController.deleteUser);

export default router;