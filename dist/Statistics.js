function filterValue(transaction) {
    return transaction.valor !== null;
}
export default class Statistics {
    transactions;
    total;
    constructor(transactions) {
        this.transactions = transactions;
        this.total = this.getTotal();
    }
    getTotal() {
        return this.transactions.filter(filterValue).reduce((acc, cur) => acc + cur.valor, 0);
    }
}
//# sourceMappingURL=Statistics.js.map