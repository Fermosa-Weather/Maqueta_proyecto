import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import "./stilos/estadistica.css";
import { Link } from 'react-router-dom';
import { loadGoogleCharts, 
  drawColumnChart_11, drawPieChart_11,  drawLineChart_11,
  drawColumnChart_1, drawPieChart_1,  drawLineChart_1,
  drawLineChart_2, drawColumnChart_2, drawPieChart_2, 
  drawPieChart_3, drawLineChart_3, drawColumnChart_3,
  drawColumnChart_4, drawPieChart_4, drawLineChart_4, } from './components/graficos';

function GeneracionEstadistica() {
  useEffect(() => {
    loadGoogleCharts(drawCharts);
  }, []);

  const drawCharts = () => {
    drawColumnChart_11('column_chart_11');
    drawPieChart_11('pie_chart_11');
    drawLineChart_11('curve_chart_11');

    drawColumnChart_1('column_chart_1');
    drawPieChart_1('pie_chart_1');
    drawLineChart_1('curve_chart_1');

    drawColumnChart_2('column_chart_2');
    drawPieChart_2('pie_chart_2');
    drawLineChart_2('curve_chart_2');

    drawColumnChart_3('column_chart_3');
    drawPieChart_3('pie_chart_3');
    drawLineChart_3('curve_chart_3');

    drawColumnChart_4('column_chart_4');
    drawPieChart_4('pie_chart_4');
    drawLineChart_4('curve_chart_4');
  };

  return (
    <div className="contenedor">
      <div className='header_del_contenedor'>
        <Link to="/estadistica_tiempo_real">Estadística en tiempo real</Link>
        <Link to="/estadistica_corto_plazo">Estadística a corto plazo</Link>
        <Link to="/estadistica_mediano_plazo">Estadística a mediano plazo</Link>
        <Link to="/estadistica_largo_plazo">Estadística a largo plazo</Link>
      </div>

      <h1>Estadística de datos futuros a largo plazo de (9 a 12 dias)</h1>
      <Helmet>
        <script src="https://www.gstatic.com/charts/loader.js"></script>
      </Helmet>

      <select class="form-select" aria-label="Default select example">
      <option value="1">Temperatura</option>
      <option value="2">Humedad</option>
      <option value="3">Precipatacion</option>
      <option value="4">Viento</option>
      </select>

      <div className="contenedor_estadistica">
        <div className="grafico_figura">
          <img src="../src/assets/Estadistica/Estadistica.jpg" alt="Map" />
        </div>
        <div className="grafico_figura">
          <img src="../src/assets/Estadistica/Humedad.jpg" alt="Map" />
        </div>
        <div className="grafico_figura">
          <img src="../src/assets/Estadistica/estadistica_aumento.jpg" alt="Map" />
        </div>
        <div className="grafico_figura">
          <img src="../src/assets/Estadistica/corto_Plazo.jpg" alt="Map" />
        </div>
      </div>

      <h1 className='subtitulo'>Generales:</h1>

 {/* General */}
 <div className="contenedor_estadistica">
        <div id="column_chart_11"></div>
        <div className="grafico_figura">
          <img src="../src/assets/general.jpg" alt="Map" />
        </div>
        <div id="pie_chart_11"></div>
        <div id="temp_table_container">
          <table id="temp_table">
            <thead>
              <tr>
                <th>Indicador</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Temperatura Promedio</td>
                <td id="avg_temp">25</td>
              </tr>
              <tr>
                <td>Temperatura Máxima</td>
                <td id="max_temp">40</td>
              </tr>
              <tr>
                <td>Temperatura Mínima</td>
                <td id="min_temp">3</td>
              </tr>
              <tr>
                <td>Media de Temperatura</td>
                <td id="median_temp">22</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="curve_chart_11"></div>
      </div>

      <h1 className='subtitulo'>Específicas:</h1>

      {/* 1 */}
      <div className="contenedor_estadistica">
        <div id="column_chart_1"></div>
        <div className="grafico_figura">
          <img src="../src/assets/1.jpg" alt="Map" />
        </div>
        <div id="pie_chart_1"></div>
        <div id="temp_table_container">
          <table id="temp_table">
            <thead>
              <tr>
                <th>Indicador</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Temperatura Promedio</td>
                <td id="avg_temp">29</td>
              </tr>
              <tr>
                <td>Temperatura Máxima</td>
                <td id="max_temp">41</td>
              </tr>
              <tr>
                <td>Temperatura Mínima</td>
                <td id="min_temp">0</td>
              </tr>
              <tr>
                <td>Media de Temperatura</td>
                <td id="median_temp">32</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="curve_chart_1"></div>
      </div>

      {/* 2 */}
      <div className="contenedor_estadistica">
        <div id="column_chart_2"></div>
        <div className="grafico_figura">
          <img src="../src/assets/2.jpg" alt="Map" />
        </div>
        <div id="pie_chart_2"></div>
        <div id="temp_table_container">
          <table id="temp_table">
            <thead>
              <tr>
                <th>Indicador</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Temperatura Promedio</td>
                <td id="avg_temp">25</td>
              </tr>
              <tr>
                <td>Temperatura Máxima</td>
                <td id="max_temp">35</td>
              </tr>
              <tr>
                <td>Temperatura Mínima</td>
                <td id="min_temp">15</td>
              </tr>
              <tr>
                <td>Media de Temperatura</td>
                <td id="median_temp">27</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="curve_chart_2"></div>
      </div>

      {/* 3 */}
      <div className="contenedor_estadistica">
        <div id="column_chart_3"></div>
        <div className="grafico_figura">
          <img src="../src/assets/3.jpg" alt="Map" />
        </div>
        <div id="pie_chart_3"></div>
        <div id="temp_table_container">
          <table id="temp_table">
            <thead>
              <tr>
                <th>Indicador</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Temperatura Promedio</td>
                <td id="avg_temp">20</td>
              </tr>
              <tr>
                <td>Temperatura Máxima</td>
                <td id="max_temp">30</td>
              </tr>
              <tr>
                <td>Temperatura Mínima</td>
                <td id="min_temp">10</td>
              </tr>
              <tr>
                <td>Media de Temperatura</td>
                <td id="median_temp">22</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="curve_chart_3"></div>
      </div>

      {/* 4 */}
      <div className="contenedor_estadistica">
        <div id="column_chart_4"></div>
        <div className="grafico_figura">
          <img src="../src/assets/4.jpg" alt="Map" />
        </div>
        <div id="pie_chart_4"></div>
        <div id="temp_table_container">
          <table id="temp_table">
            <thead>
              <tr>
                <th>Indicador</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Temperatura Promedio</td>
                <td id="avg_temp">18</td>
              </tr>
              <tr>
                <td>Temperatura Máxima</td>
                <td id="max_temp">28</td>
              </tr>
              <tr>
                <td>Temperatura Mínima</td>
                <td id="min_temp">8</td>
              </tr>
              <tr>
                <td>Media de Temperatura</td>
                <td id="median_temp">20</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="curve_chart_4"></div>
      </div>

    </div>
  );
}

export default GeneracionEstadistica;
