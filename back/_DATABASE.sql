drop table IF EXISTS PLAYERS_MATCHES;
drop table IF EXISTS PLAYERS;
drop table IF EXISTS MATCHES;

create table IF NOT EXISTS PLAYERS  (
account_id bigint unsigned,
personaname text,
avatarfull text,
loccountrycode varchar(2) ,
primary key(account_id)
)CHARACTER SET utf8 COLLATE utf8_general_ci;

create table IF NOT EXISTS MATCHES  (
match_id bigint unsigned,
start_time bigint unsigned,
cluster varchar(20) ,
dire_score tinyint,
radiant_score tinyint,
duration MEDIUMINT,
primary key(match_id)
)CHARACTER SET utf8 COLLATE utf8_general_ci;

create table IF NOT EXISTS PLAYERS_MATCHES  (
account_id  bigint unsigned,
match_id  bigint unsigned,
assists int unsigned,
deaths int unsigned,
denies int unsigned,
gold_per_min int unsigned,
hero_damage int unsigned,
hero_healing int unsigned,
kills int unsigned,
last_hits int unsigned,
net_worth int unsigned,
tower_damage int unsigned,
xp_per_min int unsigned,
win tinyint unsigned,
ability_0 SMALLINT,
ability_1 SMALLINT,
ability_2 SMALLINT,
ability_3 SMALLINT,
Hero_level tinyint,
team tinyint,
leaver_status tinyint,
aghanims_scepter tinyint,
aghanims_shard tinyint,
backpack_0 SMALLINT,
backpack_1 SMALLINT,
backpack_2 SMALLINT,
item_0 SMALLINT,
item_1 SMALLINT,
item_2 SMALLINT,
item_3 SMALLINT,
item_4 SMALLINT,
item_5 SMALLINT,
item_neutral SMALLINT,
moonshard tinyint,
hero_id SMALLINT,
player_slot SMALLINT,
primary key(account_id,match_id)
)CHARACTER SET utf8 COLLATE utf8_general_ci;

alter table PLAYERS_MATCHES add foreign key(account_id) references PLAYERS(account_id) ON DELETE CASCADE;
alter table PLAYERS_MATCHES add foreign key(match_id) references MATCHES(match_id) ON DELETE CASCADE;
