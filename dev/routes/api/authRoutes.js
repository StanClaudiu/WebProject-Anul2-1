import { Router } from "../../vendor/index.js";
import { AuthController, AdminPageController, MyGardenPageController } from "../../controllers/index.js";

const authRoutes = new Router();

authRoutes.post(`/api/v1/register`, AuthController.register);
authRoutes.post(`/api/v1/login`, AuthController.login);
authRoutes.get(`/api/v1/logout`, AuthController.logout);

authRoutes.post(`/api/v1/courses`, AdminPageController.create);
authRoutes.post(`/api/v1/courses/delete`, AdminPageController.delete);
authRoutes.get(`/api/v1/courses/read`, AdminPageController.read);
authRoutes.post(`/api/v1/courses/update`, AdminPageController.update);

///-----AdminPageController

authRoutes.get(`/api/v1/myGarden/read`, MyGardenPageController.read);
authRoutes.post(`/api/v1/myGarden`,MyGardenPageController.create);
authRoutes.get(`/api/v1/myGarden/del`,MyGardenPageController.del);

///--myGardn

export default authRoutes