DROP DATABASE IF EXISTS rps_db;

CREATE DATABASE blogger;

use rps_db;

insert into opponents(github, wins, losses, createdAt, updatedAt)
values("onijimbo",0,0,current_timestamp(), current_timestamp());

insert into opponents(github, wins, losses, createdAt, updatedAt)
values("VioletShirokuma",0,0,current_timestamp(), current_timestamp());

insert into opponents(github, wins, losses, createdAt, updatedAt)
values("lupemls",0,0,current_timestamp(), current_timestamp());

insert into opponents(github, wins, losses, createdAt, updatedAt)
values("greiven",0,0,current_timestamp(), current_timestamp());

select * from opponets;