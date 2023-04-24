import fetchData from './fetchData.js';
async function handleData() {
    const data = await fetchData('https://api.origamid.dev/json/transacoes.json');
    if (data) {
        data.forEach((item) => item['Valor (R$)']);
    }
}
handleData();
//# sourceMappingURL=script.js.map