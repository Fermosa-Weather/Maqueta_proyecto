from flask import Flask, jsonify
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

# Función para obtener el HTML de la página
def get_html(url):
    response = requests.get(url)
    return response.text

# Función para extraer las imágenes
def parse_images(page_number):
    BASE_URL = f"https://www.noticiasformosa.com.ar/page/{page_number}/?s=temperatura"
    htmldata = get_html(BASE_URL)
    soup = BeautifulSoup(htmldata, 'html.parser')
    
    # Encuentra el contenedor de las miniaturas
    container = soup.find_all('div', class_='thumbnail-container')

    image_sources = []
    for div in container:
        # Encuentra la imagen dentro del contenedor
        img_tag = div.find('img')
        if img_tag:
            # Cambia el enfoque a data-src y src
            src = img_tag.get('data-src') or img_tag.get('src')
            if src and "jeg-empty" not in src:  # Ignora las imágenes vacías
                image_sources.append(src)

    return image_sources

# Ruta de la API para obtener las imágenes
@app.route('/api/news/<int:page_number>', methods=['GET'])
def get_images(page_number):
    images = parse_images(page_number)  # Llama a la función que obtiene las imágenes
    return jsonify(images)  # Devuelve las imágenes en formato JSON

if __name__ == '__main__':
    app.run(port=5000, debug=True)
