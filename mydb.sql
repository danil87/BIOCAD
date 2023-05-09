CREATE TABLE devices(
    id SERIAL PRIMARY KEY,
    name TEXT,
    at_work BOOLEAN,
    img TEXT,
    number TEXT,
    division TEXT
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE favorite_devices(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    device_id INTEGER REFERENCES devices(id)
);

CREATE TABLE works(
   id SERIAL PRIMARY KEY,
   start DATE,
   type_work TEXT,
   works TEXT,
   result TEXT,
   device_id INTEGER REFERENCES devices(id),
   user_id INTEGER REFERENCES users(id)
);