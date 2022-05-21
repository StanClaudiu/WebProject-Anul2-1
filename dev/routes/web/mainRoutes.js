import { Router } from "../../vendor/index.js";
import { PagesController } from "../../controllers/index.js";

const mainRoutes = new Router();

mainRoutes.get(`/main`, PagesController.landingPage);
mainRoutes.get(`/course`, PagesController.coursePage);
mainRoutes.get(`/courses`, PagesController.coursesPage);
mainRoutes.get(`/leaderboard`, PagesController.leaderboardPage);
mainRoutes.get(`/myGarden`, PagesController.myGardenPage);
mainRoutes.get(`/favicon.ico`, PagesController.favicon);



export default mainRoutes