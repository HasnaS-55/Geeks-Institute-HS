import psycopg2
import requests
import random

# Database configuration
DB_CONFIG = {
    "host": "localhost",
    "database": "your_database_name",
    "user": "your_username",
    "password": "your_password"
}

def fetch_random_countries():
    try:
        response = requests.get("https://restcountries.com/v3.1/all")
        response.raise_for_status()
        all_countries = response.json()
        return random.sample(all_countries, 10)
    except requests.RequestException as e:
        print(f"Error fetching countries: {e}")
        return None

def insert_countries(countries):
    conn = None
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        cursor = conn.cursor()
        
        for country in countries:
            # Handle cases where some data might be missing
            name = country.get('name', {}).get('common', 'Unknown')
            capital = country.get('capital', ['Unknown'])[0] if country.get('capital') else 'Unknown'
            flag = country.get('flags', {}).get('png', '')
            subregion = country.get('subregion', 'Unknown')
            population = country.get('population', 0)
            
            cursor.execute(
                "INSERT INTO countries (name, capital, flag, subregion, population) VALUES (%s, %s, %s, %s, %s)",
                (name, capital, flag, subregion, population)
            )
        
        conn.commit()
        print(f"Successfully inserted {len(countries)} countries")
        
    except (Exception, psycopg2.DatabaseError) as error:
        print(f"Database error: {error}")
    finally:
        if conn:
            cursor.close()
            conn.close()

def main():
    countries = fetch_random_countries()
    if countries:
        insert_countries(countries)

if __name__ == "__main__":
    main()