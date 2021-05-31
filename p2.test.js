const startPromise = require('./src/p2');
const Nodo =require('./src/models/Nodo');

test('resolviendo problema 2', ()=>{
    expect.assertions(1);
    return startPromise().then(element => expect(element).toEqual(expect.any(Nodo)));
});