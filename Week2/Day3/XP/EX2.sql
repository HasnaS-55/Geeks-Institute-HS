UPDATE film SET language_id = 2  WHERE film_id IN (1, 5, 10);


--The customer table typically has these foreign keys: store_id references store(store_id) address_id references address(address_id)

DROP TABLE customer_review;

SELECT COUNT(*) FROM rental WHERE return_date IS NULL;


SELECT f.title, f.rental_rate FROM film f JOIN inventory i ON f.film_id = i.film_id JOIN rental r ON i.inventory_id = r.inventory_id
WHERE r.return_date IS NULL ORDER BY f.rental_rate DESC LIMIT 30;


SELECT f.title, f.description FROM film f JOIN film_actor fa ON f.film_id = fa.film_id JOIN actor a ON fa.actor_id = a.actor_id
WHERE a.first_name = 'PENELOPE' AND a.last_name = 'MONROE' AND f.description LIKE '%sumo%';


SELECT title, length, rating FROM film WHERE rating = 'R' AND length < 60;


SELECT f.title, p.amount, r.rental_date, r.return_date FROM customer c
JOIN rental r ON c.customer_id = r.customer_id
JOIN payment p ON r.rental_id = p.rental_id
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE c.first_name = 'MATTHEW'  AND c.last_name = 'MAHAN' AND p.amount > 4.00 AND r.return_date BETWEEN '2005-07-28' AND '2005-08-01';


SELECT f.title, f.description, f.replacement_cost FROM customer c
JOIN rental r ON c.customer_id = r.customer_id
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE c.first_name = 'MATTHEW' AND c.last_name = 'MAHAN' AND (f.title LIKE '%boat%' OR f.description LIKE '%boat%')
ORDER BY f.replacement_cost DESC LIMIT 1;

