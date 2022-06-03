import { Router } from "../../vendor/index.js";
import { AuthController, 
         AdminPageController, 
         CoursePageController,
         LeaderboardPageController,
         FeedbackController } from "../../controllers/index.js";

const authRoutes = new Router();

authRoutes.post(`/api/v1/register`, AuthController.register);
authRoutes.post(`/api/v1/login`, AuthController.login);
authRoutes.get(`/api/v1/logout`, AuthController.logout);

authRoutes.post(`/api/v1/courses`, AdminPageController.create);
authRoutes.post(`/api/v1/courses/delete`, AdminPageController.delete);
authRoutes.get(`/api/v1/courses/read`, AdminPageController.read);
authRoutes.post(`/api/v1/courses/update`, AdminPageController.update);

authRoutes.post(`/api/v1/course/updateProgress`, CoursePageController.updateProgress);

authRoutes.get(`/api/v1/rssfeed`, LeaderboardPageController.rssFeed)

authRoutes.post(`/api/v1/giveFeedback`, FeedbackController.giveFeedback);

export default authRoutes