import { Router } from "express";
import type { ReservationViewController } from "../controller/ReservationViewController.js";

export const createReservationViewRouter = (controller: ReservationViewController) => {
    const router = Router();
    router.get("/", (req, res) => controller.index(req, res));
    router.post("/create", (req, res) => controller.create(req, res));
    router.post("/:id/cancel", (req, res) => controller.cancel(req, res));
    router.post("/change-time", (req, res) => controller.changeTime(req, res));
    return router;
};
