/**
 * Problema número 1.
 *
 * Necesitamos que obtengas los datos de ./src/input-p1.json y generes funciones que permitan:
 *
 * 1. Retornar todos los nodos que no tienen hijos.
 * 2. Retornar todos los nodos que contienen una cantidad X (parametrizable) de hijos
 * 3. Contabilizar la cantidad de nodos totales
 * 4. Retornar todas las Sedes con 4° Medio que *SI* poseen la *Oferta Tecnología* en sus *Secciones A*
 */

const data = require("./lib/input-p1.json");

/**
 * evalua el nodo actual en el arbol (json) y lo agrega a un arreglo en params cuando no tiene hijos.
 * 
 * @param {Object} nodo nodo actual en el proceso de recursión.
 * @param {Object} params parametros para la función.
 * @param {String} params.filterProp propiedad en la que se definen los hijos del nodo.
 * @param {Array} params.resultArr arreglo en donde se agregan los nodos que cumplen con la condición.
 */
function ceroHijos(nodo, params){
    if(params != undefined){
        if(nodo[params.filterProp].length < 1){
            params.resultArr.push(nodo);
        }
    }else{
        throw {code:0, msg:'parametros requeridos'};
    }
}

/**
 * Evalua el nodo recibido según la cantidad x (params.x) de hijos que este posea.
 * 
 * @param {Object} nodo nodo en evaluación.
 * @param {Object} params parametros para la evaluación.
 * @param {Number} params.x valor utilizado para la evaluación de los hijos del nodo.
 * @param {Array} params.resultArr arreglo en donde se colocarán los nodos que cumplan la condición.
 * @param {String} params.propiedad esta propiedad se usa para identificar donde estan definidos los hijos de cada nodo(es mejor que sea parametizable para futuros cambios en la estructura del nodo).
 */
function nodosSegunHijos(nodo,params){
    if(params != undefined){
        let x = params['x'];
        let resultArr = params['resultArr'];
        let propiedad = params['propiedad'];

        if(nodo[propiedad].length == x){
            resultArr.push(nodo);
        }
    }else{
        throw {code:0, msg:'parametros requeridos'};
    }
}

/**
 * Función que contea todos los nodos en el árbol (json).
 * 
 * @param {Object} nodo nodo desde el cual comienza la iteración.
 * @param {Object} params parametros para la función.
 * @param {String} params.propiedad propiedad desde la cual se definen los hijos del nodo.
 * @param {Number} params.suma propiedad en donde se lleva el conteo.
 */
function totalNodos(nodo,params) {
    if(params != undefined){
        let propiedad = params['propiedad'];
        params['suma'] += nodo[propiedad].length;
    }else{
        throw {code:0, msg:'parametros requeridos'};
    }
}

/**
 * Recorre un json desde el nodo "doc" para colocar en un arreglo todos los nodos que cumplan con una serie de condiciones en params.
 * este no utiliza la recursividad debido al uso de la función "Array.Prototype.find()", además de necesitar una forma sencilla de "cortar"
 * la iteración en caso de encontrar el nodo o no cumplir con la cadena de condiciones.
 * 
 * El funcionamiento de esta function es como una serie "ands "(&&), es decir no puede cumplir con el ultimo filtro si no cumple con los anteriores.
 * Esto se decidió así debido a la singularidad del problema 4,que no requiere de mas de un tipo de nodo y sus condiciones son parecidas a una cadena de acontecimientos.
 * 
 * @param {Object} doc nodo desde el cual se comienza a filtar los hijos.
 * @param {Object} params parametros de la funcion.
 * @param {Array} params.Filtros arreglo de filtros en forma de "Nodo"(la clase en models) pero solo su nombre y tipo, para condicionar los nodos en la iteración.
 * @param {String} params.propiedad propiedad desde la cual se definen los hijos de un nodo.
 * @param {Object} params.sedeTemp Objeto utilizado para guardar la sede que podría o no cumplir con los filtros, esta se agrega en el arreglo en caso positivo.
 * @param {Array} params.resultArr arreglo en donde se guardan las sedes que cumplen con la condición.
 */
function filtrar(doc,params){
    if(params != undefined){
        doc.hijos.forEach(nodo => {
            let tempObj={};
            params.sedeTemp = nodo;
            let nodoFiltrado = nodo;
            let index = 1; 
            let sedeDisponible=false;
            for (const filtro of params.Filtros) {
                if(tempObj != undefined){
                    tempObj = nodoFiltrado[params.recursiveProp].find(hijo => (hijo.nombre == filtro.nombre) && (hijo.tipo == filtro.tipo));
                    nodoFiltrado = tempObj;
                    if((nodoFiltrado != undefined) && (index == params.Filtros.length)){
                        sedeDisponible = true;
                    }
                }else{
                    sedeDisponible = false;
                    break;
                }
                index++;
            }

            if(sedeDisponible){
                params.resultArr.push(params.sedeTemp);
            }
        })
    }else{
        throw {code:0, msg:'parametros requeridos'};
    }
}

/** 
 * Recorre recursivamente un árbol de Objetos o json complejo.
 * 
 * @param {Object} nodoRaiz nodo desde el cual se comenzara a recorre el árbol.
 * @param {String} propiedad propiedad en la cual se encuentran los "hijos" de cada nodo, esta debe ser la en todos los nodos para que la recursividad funcione. 
 * @param {Function} callback función que se ejecutará en cada nodo, esta siempre recibira el nodo actual como parametro y una serie de parametros utilizados para la preservación y tratamiento de datos a traves de los mismos.
 * @param {callbackParams} callbackParams parametros para utilizar en la función callback.
*/
let treeRecurIteration= function(nodoRaiz, propiedad, callback, callbackParams){
    if(nodoRaiz[propiedad] != undefined || nodoRaiz[propiedad].length > 0){
        nodoRaiz[propiedad].forEach(e=>{
            callback(e, callbackParams);
            treeRecurIteration(e, propiedad,callback,callbackParams);
        });
    }else{
        console.log('hoja encontrada');
        return 0;
    }
}

//estas funciones solo se encargan de simular la "entrada" de los parametros a las funciones descritas anteriormente.
//Todas exepto la del problema 4 utilizan la función recursiva para iterar alrededor del archivo json.
function problema1(doc) {
    let parametros = {filterProp:'hijos',resultArr:[]};
    treeRecurIteration(doc,'hijos',ceroHijos,parametros);
    return parametros['resultArr'];
}

function problema2(doc,x){
    let parametros ={
        'x':x,
        'resultArr':[],
        'propiedad':'hijos'
    };
    treeRecurIteration(doc,'hijos',nodosSegunHijos,parametros);

    return parametros['resultArr'];
}

function problema3(doc) {
    let parametros ={
        'propiedad':'hijos',
        'suma':0
    }
    treeRecurIteration(doc, 'hijos', totalNodos, parametros);
    return parametros['suma'];
}

function problema4(doc){
    let parametros={
        'Filtros':[{nombre:'4 Medio',tipo:'Curso'},{nombre:'A',tipo:'Seccion'},{nombre:'Tecnología',tipo:'Oferta'}],
        'recursiveProp':'hijos',
        'sedeTemp':{},
        'resultArr':[]
    }
    filtrar(doc,parametros);
    return parametros.resultArr;
}

//El export es para poder utilizar estas funciones de manera centralizada en un solo archivo.
module.exports = {problema1, problema2, problema3, problema4, data};