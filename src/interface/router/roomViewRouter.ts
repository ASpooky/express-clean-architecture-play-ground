import { Router } from "express";
import type { RoomViewController } from "../controller/RoomViewController.js";

export const createRoomViewRouter = (controller: RoomViewController) => {
    const router = Router();
    router.get("/", (req, res) => controller.index(req, res));
    router.post("/create", (req, res) => controller.create(req, res));
    return router;
};
