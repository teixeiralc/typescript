// 1 - Acesse os dados da api: https://api.origamid.dev/json/transacoes.json
// 2 - Mostre em uma tabela os dados de cada transação.
// 3 - Calcule:
// 3.1 - Soma total dos valores
// 3.2 - Transações por meio de pagamento.
// 3.3 - Transações por status.
// 3.4 - Total de vendas por dia da semana.
// 3.5 - Dia da semana com mais vendas.
// 4 - Mostre as estatísticas na tela.
// 5 - Organize o código em pequenos módulos.
// 6 - Normalize os dados da API se achar necessário.

import Statistics from './Statistics.js';
import fetchData from './fetchData.js';
import normalizeTransaction from './normalizeTransaction.js';
import { ICountList } from './utils/countBy.js';

function fillTable(transactions: ITransaction[]): void {
  const table = document.querySelector('#transactions tbody');
  if (!table) return;
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

function fillList(list: ICountList, containerId: string): void {
  const containerEl = document.getElementById(containerId);
  if (containerEl) {
    Object.keys(list).forEach((key) => {
      containerEl.innerHTML += `
        <p>${key}: ${list[key]}<p>
      `;
    });
  }
}

function fillStatistics(transactions: ITransaction[]): void {
  const data = new Statistics(transactions);
  const totalEl = document.querySelector<HTMLElement>('#total span');
  if (totalEl) {
    totalEl.innerText = data.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
  fillList(data.payment, 'payment');
  fillList(data.status, 'status');
}

async function handleData() {
  const data = await fetchData<ITransactionAPI[]>('https://api.origamid.dev/json/transacoes.json');
  if (!data) return;
  const transactions = data.map(normalizeTransaction);
  fillTable(transactions);
  fillStatistics(transactions);
}

handleData();
