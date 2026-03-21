import type { Request, Response } from "express";
import { renderToString } from "preact-render-to-string";
import type { CreateUser } from "../../usecase/CreateUser.js";
import type { DeleteUser } from "../../usecase/DeleteUser.js";
import { UserId } from "../../domain/entities/User/UserId.js";
import { UsersPage } from "../views/UsersPage.js";

export class UserViewController {
    constructor(
        private readonly createUser: CreateUser,
        private readonly deleteUser: DeleteUser,
    ) {}

    async index(_req: Request, res: Response): Promise<void> {
        const html = renderToString(<UsersPage />);
        res.send(`<!DOCTYPE html>${html}`);
    }

    async create(req: Request, res: Response): Promise<void> {
        const { name, email } = req.body as { name: string; email: string };
        await this.createUser.execute(name, email);
        res.redirect("/users");
    }

    async remove(req: Request, res: Response): Promise<void> {
        const { id } = req.body as { id: string };
        await this.deleteUser.execute(new UserId(id));
        res.redirect("/users");
    }
}
