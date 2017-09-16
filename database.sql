CREATE TABLE to_do_list (
    id SERIAL PRIMARY KEY,
    item varchar(200),
    status BOOLEAN DEFAULT FALSE
);


