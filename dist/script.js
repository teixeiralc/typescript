import Statistics from './Statistics.js';
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
function fillList(list, containerId) {
    const containerEl = document.getElementById(containerId);
    if (containerEl) {
        Object.keys(list).forEach((key) => {
            containerEl.innerHTML += `
        <p>${key}: ${list[key]}<p>
      `;
        });
    }
}
function fillStatistics(transactions) {
    const data = new Statistics(transactions);
    const totalEl = document.querySelector('#total span');
    if (totalEl) {
        totalEl.innerText = data.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
    fillList(data.payment, 'payment');
    fillList(data.status, 'status');
}
async function handleData() {
    const data = await fetchData('https://api.origamid.dev/json/transacoes.json');
    if (!data)
        return;
    const transactions = data.map(normalizeTransaction);
    fillTable(transactions);
    fillStatistics(transactions);
}
handleData();
//# sourceMappingURL=script.js.map