import { Router } from "../../vendor/index.js";
import { PagesController, AuthController } from "../../controllers/index.js";

const mainRoutes = new Router();

//pages routes

mainRoutes.get(`/main`, PagesController.landingPage);
mainRoutes.get(`/course`, PagesController.coursePage);
mainRoutes.get(`/courses`, PagesController.coursesPage);
mainRoutes.get(`/leaderboard`, PagesController.leaderboardPage);
mainRoutes.get(`/favicon.ico`, PagesController.favicon);

//authenticatio routes

mainRoutes.post(`/register`, AuthController.register);
mainRoutes.post(`/login`, AuthController.login);


export default mainRoutes