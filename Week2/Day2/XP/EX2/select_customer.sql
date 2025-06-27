select *
from customer;
select concat(first_name, ' ', last_name) as full_name
from customer;
select distinct create_date,
    count(*) as number_of_account
from customer
group by create_date;
select *
from customer
order by first_name DESC;
select film_id,
    title,
    description,
    release_year,
    rental_rate
from film
order by rental_rate asc;
select address,
    phone
from address
where district = 'Texas';
select *
from film
where film_id between 15 and 150;
select film_id,
    title,
    description,
    rental_duration,
    rental_rate
from film
where title = 'African Egg';
select film_id,
    title,
    description,
    rental_duration,
    rental_rate
from film
where title ilike 'Af%';
select title,
    replacement_cost
from film
order by replacement_cost ASC
limit 10;
select title,
    replacement_cost
from film
order by replacement_cost ASC
limit 10 offset 10;
select c.customer_id as customer_id,
    c.first_name,
    c.last_name,
    p.amount,
    p.payment_date
from customer c
    inner join payment p on c.customer_id = p.customer_id
order by customer_id ASC;
select distinct coalesce(i.film_id::text, 'not in iventory'),
    f.title
from inventory i
    right join film f on f.film_id = i.film_id
where i.film_id is null;
select co.country,
    c.city
from city c
    inner join country co on co.country_id = c.country_id
order by co.country asc;
select c.customer_id,
    concat(c.first_name, ' ', c.last_name) as name,
    p.amount
from payment p
    inner join customer c on c.customer_id = p.customer_id
order by p.staff_id asc;