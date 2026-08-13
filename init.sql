CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        is_done BOOLEAN NOT NULL DEFAULT false,
        done_hour TIME,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        deleted BOOLEAN NOT NULL DEFAULT false
);