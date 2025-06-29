select * from language;


select f.title, f.description, l.name from film f left join language l on f.language_id = l.language_id ;

SELECT f.title, f.description, l.name FROM film f RIGHT JOIN language l ON f.language_id = l.language_id;


CREATE TABLE new_film (
    id SERIAL PRIMARY KEY,  
    name VARCHAR(100) NOT NULL  
);


INSERT INTO new_film (name) VALUES
('The Shawshank Redemption'),
('The Godfather'),
('Pulp Fiction'),
('The Dark Knight'),
('Fight Club'),
('Forrest Gump'),
('Inception');


CREATE TABLE customer_review (
    review_id SERIAL PRIMARY KEY,
    film_id INTEGER NOT NULL REFERENCES new_film(id) ON DELETE CASCADE,
    language_id INTEGER NOT NULL REFERENCES language(language_id),
    title VARCHAR(100) NOT NULL,
    score INTEGER CHECK (score BETWEEN 1 AND 10),
    review_text TEXT,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO customer_review (film_id, language_id, title, score, review_text)
VALUES
(1, 1, 'Masterpiece of cinema', 10, 'This film redefined what prison dramas could be. Tim Robbins and Morgan Freeman deliver career-best performances.'),
(2, 1, 'The perfect crime saga', 9, 'Marlon Brando is mesmerizing as Don Corleone. The baptism scene remains one of the greatest juxtapositions in film history.');

DELETE FROM new_film WHERE id = 2;




