import type { Request, Response } from "express";
import { renderToString } from "preact-render-to-string";
import type { CreateRoom } from "../../usecase/CreateRoom.js";
import type { GetAllRooms } from "../../usecase/GetAllRooms.js";
import { toRoomViewData } from "../presenter/RoomViewPresenter.js";
import { RoomsPage } from "../views/RoomsPage.js";

export class RoomViewController {
    constructor(
        private readonly createRoom: CreateRoom,
        private readonly getAllRooms: GetAllRooms,
    ) {}

    async index(_req: Request, res: Response): Promise<void> {
        const rooms = await this.getAllRooms.execute();
        const html = renderToString(<RoomsPage rooms={rooms.map(toRoomViewData)} />);
        res.send(`<!DOCTYPE html>${html}`);
    }

    async create(req: Request, res: Response): Promise<void> {
        const { name, capacity } = req.body as { name: string; capacity: string };
        await this.createRoom.execute(name, Number(capacity));
        res.redirect("/rooms");
    }
}
