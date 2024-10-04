from flask import Flask, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)

# Función para obtener el contenido HTML de la página
def get_html(url):
    response = requests.get(url)
    return response.text

# Función para extraer los artículos con la clase específica
def parse_articles(page_number):
    BASE_URL = f"https://www.noticiasformosa.com.ar/page/{page_number}/?s=temperatura"
    htmldata = get_html(BASE_URL)
    soup = BeautifulSoup(htmldata, 'html.parser')
    
    # Encontrar el contenedor principal
    container = soup.find('div', class_='jeg_block_container')

    if not container:
        print(f"No se encontró el contenedor en la página {page_number}.")
        return []

    # Encontrar todos los artículos con la clase "jeg_post_excerpt" dentro del contenedor
    articles_html = container.find_all('div', class_='jeg_post_excerpt')

    if not articles_html:
        print(f"No se encontraron artículos en la página {page_number}.")
        return []

    articles = []

    # Recorrer cada artículo encontrado
    for article_html in articles_html:
        article = {
            'title': '',
            'description': '',
            'image': ''
        }
        
        # Extraer el título
        title_tag = article_html.find_previous('h3', class_='jeg_post_title')
        if title_tag:
            article['title'] = title_tag.get_text(strip=True)

        # Extraer la descripción
        article['description'] = article_html.get_text(strip=True)

        # Extraer la imagen
        image_tag = article_html.find_previous('div', class_='jeg_thumb').find('img')
        if image_tag:
            article['image'] = image_tag['src']

        # Agregar el artículo al array de artículos
        articles.append(article)
    
    return articles

# Función para iterar sobre varias páginas y obtener los artículos
def scrape_all_articles():
    page_number = 1
    all_articles = []

    while page_number <= 2:  # Extraer artículos de las dos primeras páginas
        articles_data = parse_articles(page_number)
        if not articles_data:  # Si no se encontraron artículos, salir del bucle
            break
        all_articles.extend(articles_data)  # Agregar artículos encontrados a la lista total
        page_number += 1  # Incrementar el número de página

    return all_articles

# Ruta de la API para obtener las noticias
@app.route('/api/news', methods=['GET'])
def get_news():
    articles = scrape_all_articles()  # Llamar a la función que obtiene los artículos
    return jsonify(articles)  # Devolver los artículos en formato JSON

# Iniciar el servidor
if __name__ == '__main__':
    app.run(port=5000, debug=True)
