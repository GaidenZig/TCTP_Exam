/**
 * Problema número 2.
 * 
 * Genera un script/algoritmo/función que sea capaz de transformar los datos de input-p2.csv
 * en un arból de estructura similar al problema de p1 utilizando la estructura de Nodo.js
 */

/**
 * Se utilizaron las siguientes librerias como: fs para tomar archivos, path para facilitar la ubicación del archivo al script 
 * y csv-parser para transformar una fila en el archivo csv a formato json.
 */
const csv = require("csv-parser");
const fs = require('fs');
const path = require('path');
const Nodo = require("./models/Nodo");
const { data } = require("./p1");

var csvPath = path.join(__dirname, 'lib', 'input-p2.csv');

/**
 * Esta función agrega los datos de la fila actual en el archivo csv, dentro del Nodo raiz segun la información de la fila, de manera ordenada
 * y recursiva siguiendo la secuencia de columnas de izquierda a derecha.
 * 
 * @param {Array} toFind Arreglo que representa basicamente cada columna con su valor según la fila, algo como: [{columna_Nombre : valor_Según_Fila}, {...} ...]
 * @param {Nodo} findPool Es el Nodo raiz que se va actualizando por fila, en el archivo csv, leida.
 * @returns {Number} de momento no estoy seguro si debo retornar o no para salir de la recursión una ves terminada la función.
 */
let recursiveFunction = function(toFind, findPool){
    if(!(toFind=== undefined || toFind.length === 0)){
        let objToThePool = {};
        let checkObj = findPool.hijos.find(e => e.nombre == Object.values(toFind[0])[0])

        if(checkObj == undefined){
            objToThePool=new Nodo(Object.values(toFind[0])[0],Object.keys(toFind[0])[0]);
            findPool.hijos.push(objToThePool);
        }else{
            objToThePool=checkObj;
        }
        toFind.splice(0,1)
        recursiveFunction(toFind, objToThePool);
    }else{
        return 0;
    }
};

/**
 * Se lee un archivo csv a partir de un "path" y se requirió de utilizar una promesa para manejar el resultado 
 * del evento 'end' en el stream creado mediante "fs.createReadStream()", Además hay que explicar que para tratar 
 * cada fila del archivo csv mediante la funcion recursiva "recursiveFunction()" correctamente se decidió transformar 
 * cada valor de columna en la fila a un objeto dentro de un array.
 * 
 * @param {string} filepath Es la ruta que apunta al archivo csv.
 */
const readFile = async (filepath) => {
    const data = new Nodo("root", "Raíz");
    return new Promise(function (resolve, reject){
        fs.createReadStream(filepath)
        .pipe(csv())
        .on('data', (row) => {
            let keyValueArr=[];
            for(const [key, value] of Object.entries(row)){
                let obj={};
                obj[key] = value;
                keyValueArr.push(obj);
            }
            recursiveFunction(keyValueArr,data);
        })
        .on('end', ()=>{
            resolve(data);
        });
    });
}

/**
 * Esta función utiliza "readFile()" de manera asíncrona para retornar el valor devuelto por el stream al momento de
 * terminar la lectura del archivo.
 * 
 * @returns {Nodo} promesa de un arbol de objetos "Nodo" a partir del archivo csv.
 */
const startPromise = async function(){
    const result = await readFile(csvPath);
    return result;
}

module.exports = startPromise;
