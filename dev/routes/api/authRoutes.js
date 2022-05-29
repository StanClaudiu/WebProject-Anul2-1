import { Router } from "../../vendor/index.js";
import { AuthController, AdminPageController } from "../../controllers/index.js";

const authRoutes = new Router();

authRoutes.post(`/api/v1/register`, AuthController.register);
authRoutes.post(`/api/v1/login`, AuthController.login);
authRoutes.get(`/api/v1/logout`, AuthController.logout);

authRoutes.post(`/api/v1/courses`, AdminPageController.create);
authRoutes.post(`/api/v1/courses/delete`, AdminPageController.delete);

export default authRoutes