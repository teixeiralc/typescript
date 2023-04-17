"use strict";
// 1 - Faça um fetch das vendas: https://api.origamid.dev/json/vendas.json
// 2 - Defina o tipo/interface de cada venda (tuple)
// 3 - Some o total das vendas e mostre na tela
async function fetchSales() {
    const response = await fetch('https://api.origamid.dev/json/vendas.json');
    const data = await response.json();
    sumSales(data);
}
function sumSales(data) {
    const sum = data.reduce((acc, cur) => {
        return acc + cur[1];
    }, 0);
    console.log(sum);
}
fetchSales();
