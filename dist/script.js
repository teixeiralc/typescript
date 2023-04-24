import fetchData from './fetchData.js';
import normalizeTransaction from './normalizeTransaction.js';
function fillTable(transactions) {
    const table = document.querySelector('#transactions tbody');
    if (!table)
        return;
    transactions.forEach((transaction) => {
        table.innerHTML += `
      <tr>
        <td>${transaction.nome}</td>
        <td>${transaction.email}</td>
        <td>R$ ${transaction.moeda}</td>
        <td>${transaction.formaDePagamento}</td>
        <td>${transaction.status}</td>
      </tr>
    `;
    });
}
async function handleData() {
    const data = await fetchData('https://api.origamid.dev/json/transacoes.json');
    if (!data)
        return;
    const transactions = data.map(normalizeTransaction);
    fillTable(transactions);
}
handleData();
//# sourceMappingURL=script.js.map