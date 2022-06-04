import { Router } from "../../vendor/index.js";
import { PagesController, 
         AdminPageController, 
         CoursePageController, 
         CoursesPageController,
         LeaderboardPageController,
         MainPageController } from "../../controllers/index.js";
import { UserMiddleware, AdminMiddleware } from "../../middlewares/index.js"

const mainRoutes = new Router();

//pages routes

mainRoutes.get(`/main`, MainPageController.view);
mainRoutes.get(`/course`, CoursePageController.view, UserMiddleware);
mainRoutes.get(`/courses`, CoursesPageController.view, UserMiddleware);
mainRoutes.get(`/leaderboard`, LeaderboardPageController.view, UserMiddleware);
mainRoutes.get(`/myGarden`, PagesController.myGardenPage, UserMiddleware);
mainRoutes.get(`/adminPage`, AdminPageController.view, AdminMiddleware);

mainRoutes.get(`/favicon.ico`, PagesController.favicon);

export default mainRoutes