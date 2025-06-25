CREATE TABLE actors (
      id SERIAL PRIMARY KEY,
	  first_name VARCHAR(20) NOT NULL,
	  last_name VARCHAR(20) NOT NULL,
	  age DATE NOT NULL,
	  number_oscars SMALLINT DEFAULT 0
);