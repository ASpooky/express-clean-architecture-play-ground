import type { IIdGenerator } from "../usecase/shared/IdGenerator.js";
import { randomUUID } from "node:crypto";

export class UuidGenerator implements IIdGenerator {
    generate(): string {
        return randomUUID();
    }
}
