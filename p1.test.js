const { problema1, problema2, problema3, problema4, data} = require('./src/p1');

test('resolviendo problema 1', ()=>{
    expect(problema1(data)).toEqual(expect.any(Array));
});
test('resolviendo petición 2', ()=>{
    expect(problema2(data)).toEqual(expect.any(Array));
});
test('resolviendo peticion 3', ()=>{
    expect(problema3(data)).toEqual(expect.any(Number));
});
test('resolviendo peticion 4', ()=>{
    expect(problema4(data)).toEqual(expect.any(Array));
});