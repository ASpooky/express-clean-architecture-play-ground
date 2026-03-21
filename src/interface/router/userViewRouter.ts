import { Router } from "express";
import type { UserViewController } from "../controller/UserViewController.js";

export const createUserViewRouter = (controller: UserViewController) => {
    const router = Router();
    router.get("/", (req, res) => controller.index(req, res));
    router.post("/create", (req, res) => controller.create(req, res));
    router.post("/delete", (req, res) => controller.remove(req, res));
    return router;
};
