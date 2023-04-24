import countBy from './utils/countBy.js';

type TTransactionValue = ITransaction & { valor: number };

function filterValue(transaction: ITransaction): transaction is TTransactionValue {
  return transaction.valor !== null;
}

export default class Statistics {
  private transactions;
  total;
  payment;
  status;

  constructor(transactions: ITransaction[]) {
    this.transactions = transactions;
    this.total = this.getTotal();
    this.payment = this.getPayment();
    this.status = this.getStatus();
  }
  private getTotal() {
    return this.transactions.filter(filterValue).reduce((acc, cur) => acc + cur.valor, 0);
  }
  private getPayment() {
    return countBy(this.transactions.map(({ formaDePagamento }) => formaDePagamento));
  }
  private getStatus() {
    return countBy(this.transactions.map(({ status }) => status));
  }
}
