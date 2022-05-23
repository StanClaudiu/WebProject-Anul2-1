import { Router } from "../../vendor/index.js";
import { AuthController } from "../../controllers/index.js";

const authRoutes = new Router();

authRoutes.post(`/api/v1/register`, AuthController.register);
authRoutes.post(`/api/v1/login`, AuthController.login);
authRoutes.get(`/api/v1/logout`, AuthController.logout);

export default authRoutes