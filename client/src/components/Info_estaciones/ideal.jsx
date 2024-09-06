import React from 'react';
import Layout from './layaout';
import Estaciones from './estaciones';
import Ventana_clima from './venta_clima';

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/6qeVI0TjzC0
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

export default function Ideal() {
  return (
    <div className="bg-white dark:bg-gray-950 text-gray-950 dark:text-white">
      <Layout>
       <Estaciones></Estaciones>
        <Ventana_clima></Ventana_clima>
      </Layout>
    </div>
  )
}