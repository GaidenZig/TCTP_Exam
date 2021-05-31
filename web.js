const express = require('express');
const app = express();
const { problema1, problema2, problema3, problema4, data} = require('./src/p1');
const startPromise = require('./src/p2');

app.get('/', async (req,res)=>{
    let response = {
        'problema 1.1':problema1(data),
        'problema 1.2':problema2(data,2),
        'problema 1.3':problema3(data),
        'problema 1.4':problema4(data),
        'problema 2': await startPromise().then(e => e)
    }
    res.json(response);
})

app.listen(3000, () => {
    console.log('Servidor en puerto 3000');
});