console.log("trying to start server..");
process.env["NODE_CONFIG_DIR"] = __dirname + "/configs";

import "dotenv/config";
import App from "@/app";
import AuthRoute from "@routes/auth.route";
import IndexRoute from "@routes/index.route";
import UsersRoute from "@routes/users.route";
import ParticipantRoute from "@routes/participant.route";
import PartnerRoute from "@routes/partner.route";
import CompanyRoute from "@routes/company.route";
import validateEnv from "@utils/validateEnv";
import MediaRoute from "./routes/media.route";
import DeliverableRoute from "./routes/deliverable.route";
import MentorRoute from "@routes/mentor.route";
import CommentRoute from "./routes/comment.route";
import MessageRoute from "./routes/message.route";

import PostRoute from "./routes/post.route";

try {
  validateEnv();
  const app = new App([
    new MentorRoute(),
    new IndexRoute(),
    new UsersRoute(),
    new AuthRoute(),
    new PartnerRoute(),
    new MentorRoute(),
    new ParticipantRoute(),
    new MentorRoute(),
    new MediaRoute(),
    new PostRoute(),
    new DeliverableRoute(),
    new CompanyRoute(),
    new CommentRoute(),
    new MessageRoute(),
  ]);
  app.listen();
} catch (error) {
  console.error(error);
}
