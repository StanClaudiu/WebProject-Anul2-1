import { Router } from "../../vendor/index.js";
import { PagesController } from "../../controllers/index.js";

const mainRoutes = new Router();

mainRoutes.get(`/main`, PagesController.landingPage);
mainRoutes.get(`/favicon.ico`, PagesController.favicon);


export default mainRoutes