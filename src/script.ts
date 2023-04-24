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

import fetchData from './fetchData.js';

type TPaymentMethods = 'Cartão de Crédito' | 'Boleto';
type TTransactionStatus = 'Paga' | 'Recusada pela operadora de cartão' | 'Aguardando pagamento' | 'Estornada';

interface ITransactionAPI {
  Nome: string;
  ID: number;
  Status: TTransactionStatus;
  Data: string;
  Email: string;
  ['Valor (R$)']: string;
  ['Cliente Novo']: number;
  ['Forma de Pagamento']: TPaymentMethods;
}

async function handleData() {
  const data = await fetchData<ITransactionAPI[]>('https://api.origamid.dev/json/transacoes.json');
  if (data) {
    data.forEach((item) => item['Valor (R$)']);
  }
}
handleData();
