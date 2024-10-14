from flask import Flask, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
import json

app = Flask(__name__)
CORS(app)

FILE_PATH = './noticia.json'

# Función para obtener el contenido HTML de la página
def get_html(url):
    response = requests.get(url)
    return response.text

# Función para extraer los artículos con la clase específica
def parse_articles(page_number):
    BASE_URL = f"https://agenfor.com.ar/?s=temperatura"
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
            'image': '',
            'url': ''  # Agregar un campo para la URL
        }
        
        # Extraer el título y la URL
        title_tag = article_html.find_previous('h3', class_='jeg_post_title')
        if title_tag:
            article['title'] = title_tag.get_text(strip=True)
            link_tag = title_tag.find('a')  # Encontrar la etiqueta <a> para obtener el href
            if link_tag:
                article['url'] = link_tag['href']  # Guardar el href como URL

        # Extraer la descripción
        article['description'] = article_html.get_text(strip=True)

        # Extraer la imagen
        thumbnail_container = article_html.find_previous('div', class_='jeg_thumb')
        if thumbnail_container:
            img_tag = thumbnail_container.find('img')
            if img_tag:
                # Cambia el enfoque a data-src y src
                src = img_tag.get('data-src') or img_tag.get('src')
                if src and "jeg-empty" not in src:  # Ignora las imágenes vacías
                    article['image'] = src

        # Agregar el artículo al array de artículos
        articles.append(article)
    
    return articles

# Función para iterar sobre varias páginas y obtener los artículos
def scrape_all_articles():
    page_number = 1
    all_articles = []

    while page_number < 2:  # Extraer artículos de las dos primeras páginas
        articles_data = parse_articles(page_number)
        if not articles_data:  # Si no se encontraron artículos, salir del bucle
            break
        all_articles.extend(articles_data)  # Agregar artículos encontrados a la lista total
        page_number += 1  # Incrementar el número de página

    return all_articles

# Función para enviar los artículos a la API de Express
def send_articles_to_express(articles):
    # Guardar los artículos en el archivo JSON
    with open(FILE_PATH, 'w') as f:
        json.dump(articles, f, indent=2)  # Guardar directamente los artículos en el JSON

# Ruta de la API para obtener las noticias
@app.route('/api/news', methods=['GET'])
def get_news():
    articles = scrape_all_articles()  # Llamar a la función que obtiene los artículos
    send_articles_to_express(articles)  # Enviar los artículos a la API de Express
    return jsonify(articles)  # Devolver los artículos en formato JSON

# Iniciar el servidor
if __name__ == '__main__':
    app.run(port=5000, debug=True)
