process.env["NODE_CONFIG_DIR"] = __dirname + "/configs";

import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import mongoose from "mongoose";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { dbConnection } from "@databases";
import Routes from "@interfaces/routes.interface";
import errorMiddleware from "@middlewares/error.middleware";
import { logger, stream } from "@utils/logger";
import * as GridFSStorage from "multer-gridfs-storage";
import multer from "multer";

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;
  public storage;
  public uploader: multer.Multer;
  public routes: Routes[];

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || "development";

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    if (this.env !== "production") {
      mongoose.set("debug", true);
    }
    const connection: Promise<typeof mongoose> = mongoose.connect(
      dbConnection.url,
      dbConnection.options
    );
    connection.then(
      (con) => {
        logger.info(`Connected to DB: ${dbConnection.url}`);
        return con;
      },
      (err) => {
        logger.error(`Error connecting to DB at '${dbConnection.url}': ${err}`);
      }
    );
    this.storage = new GridFSStorage.GridFsStorage({
      db: connection,
      file: (req, file) => {
        return {
          filename: Date.now() + "-" + file.originalname,
          bucketName: "submissions",
        };
      },
    });
    this.uploader = multer({ storage: this.storage });
  }

  private initializeMiddlewares() {
    if (this.env === "production") {
      this.app.use(morgan("combined", { stream }));
      this.app.use(cors({ origin: "localhost", credentials: true }));
    } else {
      this.app.use(morgan("dev", { stream }));
      this.app.use(cors({ origin: true, credentials: true }));
    }

    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    this.routes = routes;
    routes.forEach((route) => {
      this.app.use("/", route.router);
      if (route.initHelpers) route.initHelpers(this);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: "REST API",
          version: "1.0.0",
          description: "Example docs",
        },
      },
      apis: ["swagger.yaml"],
    };

    const specs = swaggerJSDoc(options);
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
