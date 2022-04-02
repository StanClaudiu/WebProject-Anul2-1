import { Router } from "../../vendor/router.js";
import { AdminController } from "../../controllers/adminController.js";

const mainRoutes = new Router();

mainRoutes.post(`/api/logout`, AdminController.addNotification);
mainRoutes.delete(`/api/logout`, AdminController.deleteNotification);
mainRoutes.patch(`/api/logout`, AdminController.modifyCar);

export default mainRoutes