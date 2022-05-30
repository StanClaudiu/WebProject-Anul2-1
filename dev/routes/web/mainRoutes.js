import { Router } from "../../vendor/index.js";
import { PagesController, AdminPageController, CoursePageController } from "../../controllers/index.js";
import { UserMiddleware, AdminMiddleware } from "../../middlewares/index.js"

const mainRoutes = new Router();

//pages routes

mainRoutes.get(`/main`, PagesController.landingPage);
mainRoutes.get(`/course`, CoursePageController.view, UserMiddleware);
mainRoutes.get(`/courses`, PagesController.coursesPage, UserMiddleware);
mainRoutes.get(`/leaderboard`, PagesController.leaderboardPage, UserMiddleware);
mainRoutes.get(`/myGarden`, PagesController.myGardenPage, UserMiddleware);
mainRoutes.get(`/adminPage`, AdminPageController.view, AdminMiddleware);

mainRoutes.get(`/favicon.ico`, PagesController.favicon);

export default mainRoutes