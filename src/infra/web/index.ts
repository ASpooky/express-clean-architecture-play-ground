import express from "express";

import { PostgresPool } from "../postgres/pool.js";
import { UuidGenerator } from "../IdGenerator.js";

import { UserRepository } from "../repositories/UserRepository.js";
import { RoomRepository } from "../repositories/RoomRepository.js";
import { ReservationRepository } from "../repositories/ReservationRepository.js";

import { CreateUser } from "../../usecase/CreateUser.js";
import { DeleteUser } from "../../usecase/DeleteUser.js";
import { GetUserReservations } from "../../usecase/GetUserReservations.js";
import { GetAllUsers } from "../../usecase/GetAllUsers.js";
import { CreateRoom } from "../../usecase/CreateRoom.js";
import { GetAllRooms } from "../../usecase/GetAllRooms.js";
import { ReserveRoom } from "../../usecase/ReserveRoom.js";
import { CancelReservation } from "../../usecase/CancelReservation.js";
import { ChangeReservationTime } from "../../usecase/ChangeReservationTime.js";

import { RoomViewController } from "../../interface/controller/RoomViewController.js";
import { UserViewController } from "../../interface/controller/UserViewController.js";
import { ReservationViewController } from "../../interface/controller/ReservationViewController.js";

import { createRoomViewRouter } from "../../interface/router/roomViewRouter.js";
import { createUserViewRouter } from "../../interface/router/userViewRouter.js";
import { createReservationViewRouter } from "../../interface/router/reservationViewRouter.js";
import { errorHandler } from "../../interface/middleware/errorHandler.js";

// --- Infrastructure ---
const { pool } = new PostgresPool();
const idGenerator = new UuidGenerator();

const userRepo = new UserRepository(pool);
const roomRepo = new RoomRepository(pool);
const reservationRepo = new ReservationRepository(pool);

// --- Use cases ---
const createUser = new CreateUser(userRepo, idGenerator);
const deleteUser = new DeleteUser(userRepo);
const getAllUsers = new GetAllUsers(userRepo);
const getUserReservations = new GetUserReservations(reservationRepo);

const createRoom = new CreateRoom(roomRepo, idGenerator);
const getAllRooms = new GetAllRooms(roomRepo);

const reserveRoom = new ReserveRoom(reservationRepo, userRepo, roomRepo, idGenerator);
const cancelReservation = new CancelReservation(reservationRepo);
const changeReservationTime = new ChangeReservationTime(reservationRepo);

// --- View Controllers ---
const roomViewController = new RoomViewController(createRoom, getAllRooms);
const userViewController = new UserViewController(createUser, deleteUser);
const reservationViewController = new ReservationViewController(
    reserveRoom,
    cancelReservation,
    changeReservationTime,
    getUserReservations,
    getAllUsers,
    getAllRooms,
);

// --- App ---
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/rooms", createRoomViewRouter(roomViewController));
app.use("/users", createUserViewRouter(userViewController));
app.use("/reservations", createReservationViewRouter(reservationViewController));
app.get("/", (_req, res) => res.redirect("/rooms"));

app.use(errorHandler);

const PORT = process.env.PORT ?? 3000;
const HOST = process.env.HOST ?? "localhost";
app.listen(PORT, () => {
    console.log(`Server start ! http://${HOST}:${PORT}`);
});
