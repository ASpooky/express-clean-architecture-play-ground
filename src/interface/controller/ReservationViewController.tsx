import type { Request, Response } from "express";
import { renderToString } from "preact-render-to-string";
import type { ReserveRoom } from "../../usecase/ReserveRoom.js";
import type { CancelReservation } from "../../usecase/CancelReservation.js";
import type { ChangeReservationTime } from "../../usecase/ChangeReservationTime.js";
import type { GetUserReservations } from "../../usecase/GetUserReservations.js";
import type { GetAllUsers } from "../../usecase/GetAllUsers.js";
import type { GetAllRooms } from "../../usecase/GetAllRooms.js";
import { UserId } from "../../domain/entities/User/UserId.js";
import { ReservationId } from "../../domain/entities/Reservation/ReservationId.js";
import { toReservationViewData } from "../presenter/ReservationViewPresenter.js";
import { toUserViewData } from "../presenter/UserViewPresenter.js";
import { toRoomViewData } from "../presenter/RoomViewPresenter.js";
import { ReservationsPage } from "../views/ReservationsPage.js";

export class ReservationViewController {
    constructor(
        private readonly reserveRoom: ReserveRoom,
        private readonly cancelReservation: CancelReservation,
        private readonly changeReservationTime: ChangeReservationTime,
        private readonly getUserReservations: GetUserReservations,
        private readonly getAllUsers: GetAllUsers,
        private readonly getAllRooms: GetAllRooms,
    ) {}

    async index(req: Request, res: Response): Promise<void> {
        const { userId } = req.query as { userId?: string };
        const [reservations, users, rooms] = await Promise.all([
            userId
                ? this.getUserReservations.execute(new UserId(userId)).then((r) => r.map(toReservationViewData))
                : Promise.resolve([]),
            this.getAllUsers.execute().then((u) => u.map(toUserViewData)),
            this.getAllRooms.execute().then((r) => r.map(toRoomViewData)),
        ]);
        const html = renderToString(
            <ReservationsPage reservations={reservations} lookupUserId={userId ?? ""} users={users} rooms={rooms} />,
        );
        res.send(`<!DOCTYPE html>${html}`);
    }

    async create(req: Request, res: Response): Promise<void> {
        const { userId, roomId, startTime, endTime } = req.body as {
            userId: string;
            roomId: string;
            startTime: string;
            endTime: string;
        };
        await this.reserveRoom.execute(userId, roomId, new Date(startTime), new Date(endTime));
        res.redirect("/reservations");
    }

    async cancel(req: Request, res: Response): Promise<void> {
        const reservationId = new ReservationId(req.params["id"]!);
        await this.cancelReservation.execute(reservationId);
        res.redirect("back");
    }

    async changeTime(req: Request, res: Response): Promise<void> {
        const { id, startTime, endTime } = req.body as {
            id: string;
            startTime: string;
            endTime: string;
        };
        await this.changeReservationTime.execute(
            new ReservationId(id),
            new Date(startTime),
            new Date(endTime),
        );
        res.redirect("/reservations");
    }
}
