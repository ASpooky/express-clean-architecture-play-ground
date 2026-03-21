import type { Reservation } from "../../domain/entities/Reservation/Reservation.js";

export type ReservationViewData = {
    id: string;
    userId: string;
    roomId: string;
    startTime: string;
    endTime: string;
    statusLabel: string;
    durationMinutes: number;
    canCancel: boolean;
};

export const toReservationViewData = (r: Reservation): ReservationViewData => ({
    id: r.id.getValue(),
    userId: r.userId.getValue(),
    roomId: r.roomId.getValue(),
    startTime: r.startTime.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }),
    endTime: r.endTime.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }),
    statusLabel: r.status === "Confirm" ? "確定" : "キャンセル済",
    durationMinutes: r.getDurationMinutes(),
    canCancel: r.status === "Confirm",
});
