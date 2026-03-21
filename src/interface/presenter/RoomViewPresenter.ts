import type { Room } from "../../domain/entities/Room/Room.js";

export type RoomViewData = {
    id: string;
    name: string;
    capacity: number;
    statusLabel: string;
};

export const toRoomViewData = (room: Room): RoomViewData => ({
    id: room.id.getValue(),
    name: room.name,
    capacity: room.capacity,
    statusLabel: room.roomStatus === "Available" ? "利用可能" : "利用不可",
});
