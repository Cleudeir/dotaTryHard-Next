
SELECT * FROM PLAYERS JOIN
(SELECT account_id,
match_id,
ROUND(AVG(assists),0) AS assists, 
ROUND(AVG(kills),0) AS kills,
ROUND(AVG(deaths),0) AS deaths,
ROUND(AVG(denies),0) AS denies,
ROUND(AVG(gold_per_min),0) AS gold_per_min,
ROUND(AVG(hero_damage),0) AS hero_damage,
ROUND(AVG(hero_healing),0) AS hero_healing,
ROUND(AVG(last_hits),0) AS last_hits,
ROUND(AVG(net_worth),0) AS net_worth,
ROUND(AVG(tower_damage),0) AS tower_damage,
ROUND(AVG(xp_per_min),0) AS xp_per_min,
SUM(win) AS win,
COUNT(account_id) AS matches
FROM PLAYERS_MATCHES      
GROUP BY account_id
HAVING matches > 10 and account_id != 4294967295
ORDER BY matches desc
) as tabela      
on tabela.account_id = PLAYERS.account_id
join (select match_id, cluster from MATCHES) 
as tab on tab.match_id = tabela.match_id
where cluster in("BRAZIL","ARGENTINA");

SELECT * FROM dotaTryHard.PLAYERS_MATCHES
where account_id = 4294967295;

SELECT 
ROUND(AVG(assists),0) AS assists, 
ROUND(AVG(kills),0) AS kills,
ROUND(AVG(deaths),0) AS deaths,
ROUND(AVG(denies),0) AS denies,
ROUND(AVG(gold_per_min),0) AS gold_per_min,
ROUND(AVG(hero_damage),0) AS hero_damage,
ROUND(AVG(hero_healing),0) AS hero_healing,
ROUND(AVG(last_hits),0) AS last_hits,
ROUND(AVG(net_worth),0) AS net_worth,
ROUND(AVG(tower_damage),0) AS tower_damage,
ROUND(AVG(xp_per_min),0) AS xp_per_min,
SUM(win) AS win,
SUM(matches) AS matches
FROM 
(SELECT account_id,
match_id,
ROUND(AVG(assists),0) AS assists, 
ROUND(AVG(kills),0) AS kills,
ROUND(AVG(deaths),0) AS deaths,
ROUND(AVG(denies),0) AS denies,
ROUND(AVG(gold_per_min),0) AS gold_per_min,
ROUND(AVG(hero_damage),0) AS hero_damage,
ROUND(AVG(hero_healing),0) AS hero_healing,
ROUND(AVG(last_hits),0) AS last_hits,
ROUND(AVG(net_worth),0) AS net_worth,
ROUND(AVG(tower_damage),0) AS tower_damage,
ROUND(AVG(xp_per_min),0) AS xp_per_min,
SUM(win) AS win,
COUNT(account_id) AS matches
FROM PLAYERS_MATCHES      
GROUP BY account_id
HAVING matches > 1 and account_id != 4294967295
ORDER BY matches desc
) as tabela
join (select match_id, cluster from MATCHES) as tab on tab.match_id = tabela.match_id
where cluster in("BRAZIL","ARGENTINA");

select * from MATCHES
where match_id
in(
(select match_id from
(select
account_id,match_id
from PLAYERS_MATCHES
where account_id = 890211) as tabe)
)
order by start_time desc;

select
*
from PLAYERS_MATCHES
where match_id in(
select match_id from
(
select
account_id,match_id
from PLAYERS_MATCHES
where account_id = 890211) as tabe
);

SELECT match_id from
(SELECT match_id, count(match_id) as qnt FROM PLAYERS_MATCHES WHERE match_id in(
SELECT match_id from 
(SELECT account_id,match_id FROM PLAYERS_MATCHES WHERE account_id = 87683422 LIMIT 0,2000)
as tabe order by match_id
) group by match_id having qnt = 10 order by match_id) as tba;


SELECT account_id from (SELECT account_id,match_id FROM PLAYERS_MATCHES WHERE match_id in(
SELECT match_id from 
(SELECT account_id,match_id FROM PLAYERS_MATCHES WHERE account_id = 87683422 LIMIT 0,2000)
as tabe order by match_id
) group by account_id  order by account_id) as tan LIMIT 0,2000;







      
	
      
      