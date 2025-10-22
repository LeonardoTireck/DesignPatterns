drop schema if exists design_patterns cascade;
create schema design_patterns;

create table design_patterns.room (
    room_id integer,
    category text,
    price numeric,
    status text
);

create table design_patterns.booking (
    code text,
    room_id integer,
    email text,
    checkin_date timestamp,
    checkout_date timestamp,
    duration integer,
    price numeric,
    status text
);

insert into design_patterns.room (room_id, category, price, status) values (1, 'suite', 500, 'available');
insert into design_patterns.room (room_id, category, price, status) values (2, 'suite', 500, 'maintenance');
insert into design_patterns.room (room_id, category, price, status) values (3, 'standard', 400, 'available');
insert into design_patterns.room (room_id, category, price, status) values (4, 'standard', 400, 'available');
