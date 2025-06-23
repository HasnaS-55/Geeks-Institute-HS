from googletrans import Translator

def translate_french_words():
    french_words = ["Bonjour", "Au revoir", "Bienvenue", "A bientôt"]
    translator = Translator()
    translations = {}
    
    for word in french_words:
        try:
            
            translation = translator.translate(word, src='fr', dest='en')
            translations[word] = translation.text
        except Exception as e:
            print(f"Error translating {word}: {e}")
            translations[word] = "Translation failed"
    
    return translations


french_to_english = translate_french_words()
print(french_to_english)