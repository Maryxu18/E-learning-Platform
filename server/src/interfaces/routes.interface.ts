import App from "@/app";
import { Router } from "express";

interface Route {
  path?: string;
  router: Router;
  initHelpers?(app: App);
}

export default Route;
