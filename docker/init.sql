CREATE TABLE IF NOT EXISTS users (
    id          VARCHAR PRIMARY KEY,
    name        VARCHAR NOT NULL,
    email       VARCHAR NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS rooms (
    id          VARCHAR PRIMARY KEY,
    name        VARCHAR NOT NULL,
    capacity    INTEGER NOT NULL,
    room_status VARCHAR NOT NULL DEFAULT 'Available'
);

CREATE TABLE IF NOT EXISTS reservations (
    id          VARCHAR PRIMARY KEY,
    user_id     VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    room_id     VARCHAR NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    start_time  TIMESTAMPTZ NOT NULL,
    end_time    TIMESTAMPTZ NOT NULL,
    status      VARCHAR NOT NULL DEFAULT 'Confirm'
);
