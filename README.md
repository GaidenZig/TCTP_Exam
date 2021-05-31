# Notas
Hay disponibles 3 comandos para probar de distintas maneras los ejercicios, además de algunas explicaciones generales:
- [Ejecucion con Node js](#local)
- [Ejecución con un servidor web](#web)
- [Ejecución con jest](#jest)
- [explicaciones generales](#generales)

<a name="local"></a>
## _Ejecución con node js_
Para ejecutar las funciones correspondientes a los problemas en consola:

`$ npm install`

`$ npm start`

con esto los resultados se mostrarán en el terminal, pero los elementos de los arreglos de cada función podrían no mostrarse completos (no se utilizó JSON.stringify para modificar esto debido a que algunos resultados son demaciado grandes).

<a name="web"></a>
## _Ejecución con un servidor web_
Se utilizó el modulo express para configurar un servidor básico en el puerto 3000 de localhost, que pueda devolver todas las respuestas como un documento json al navegador, se accede a el con:

`$ npm install`

`$ npm run startWeb`

Sugiero que si utilizan esta opción lo mejor es instalar algun formateador de Json para su navegador ya que se mostrarán los datos como un texto plano al entrar en "localhost:3000/".

La implementación de este servidor en caso de querer revisarlo se encuentra en el archivo web.js

<a name="jest"></a>
## _Ejecución con jest_
Este modo es mas que nada para ver que tanto se tardan las funciones en ejecutarce, sin embargo se pueden modificar los archivos *.test.js en la raíz para probar diversos tipos de casos de prueba.

`$ npm install `

`$ npm install -D`

`$ npm run test`

<a name ="generales"></a>
## _Explicaciones generales_
1. Las funciones que resuelven los problemas están en los mismos archivos p1.js y p2.js dentro de src
2. Si bien se plantean problematicas a resolver, no se especifica el tipo de valor a devolver para cada una, por lo que me tomé la libertad de deducir el tipo de valor a devolver mas eficiente según mi criterio.
3. La idea de relorganizar los archivos del examen práctico clonado fue utilizada en pro de ofrecer un metodo "sencillo" para mostrar los resultados,  como con los comandos del package.json.
4. Si desean ir modificando los archivos al utilizar el servidor en tiempo de ejecución, utilizen nodemon con:

    `$ npm install -D`

    `$ npm run startWebDev`

### librerias/modulos utilizadas.
- csv-parser: Utilizado para transformar cada fila del archivo csv a un Objeto manejable en javascript.
- express: Utilizado para levantar un servidor básico y así poder leer con mas detalle los resultados en formato json en un navegador.
- jest: modulo para testeo.
- nodemon: Utilizado para modificar archivos mientras el servidor está funcionando y así reiniciar "automágicamente" el servidor.