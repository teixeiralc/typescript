type TTransactionValue = ITransaction & { valor: number };

function filterValue(transaction: ITransaction): transaction is TTransactionValue {
  return transaction.valor !== null;
}

export default class Statistics {
  private transactions;
  total;

  constructor(transactions: ITransaction[]) {
    this.transactions = transactions;
    this.total = this.getTotal();
  }
  private getTotal() {
    return this.transactions.filter(filterValue).reduce((acc, cur) => acc + cur.valor, 0);
  }
}
