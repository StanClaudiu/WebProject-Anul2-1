import { Router } from "../../vendor/index.js";
import { PagesController } from "../../controllers/index.js";
import { UserMiddleware, AdminMiddleware } from "../../middlewares/index.js"

const mainRoutes = new Router();

//pages routes

mainRoutes.get(`/main`, PagesController.landingPage);
mainRoutes.get(`/course`, PagesController.coursePage, UserMiddleware);
mainRoutes.get(`/courses`, PagesController.coursesPage, UserMiddleware);
mainRoutes.get(`/leaderboard`, PagesController.leaderboardPage, UserMiddleware);
mainRoutes.get(`/myGarden`, PagesController.myGardenPage, UserMiddleware);
mainRoutes.get(`/adminPage`,PagesController.adminPage, AdminMiddleware);

mainRoutes.get(`/favicon.ico`, PagesController.favicon);

mainRoutes.get(`/test`, PagesController.test);

export default mainRoutes