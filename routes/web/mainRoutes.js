import { Router } from "../../vendor/index.js";
import { PagesController } from "../../controllers/index.js";

const mainRoutes = new Router();

mainRoutes.get(`/main`, PagesController.landingPage);

export default mainRoutes