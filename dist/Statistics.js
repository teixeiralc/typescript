import countBy from './utils/countBy.js';
function filterValue(transaction) {
    return transaction.valor !== null;
}
export default class Statistics {
    transactions;
    total;
    payment;
    status;
    salesByDay;
    bestDay;
    constructor(transactions) {
        this.transactions = transactions;
        this.total = this.getTotal();
        this.payment = this.getPayment();
        this.status = this.getStatus();
        this.salesByDay = this.getSalesByDay();
        this.bestDay = this.getBestDay();
    }
    getTotal() {
        return this.transactions.filter(filterValue).reduce((acc, cur) => acc + cur.valor, 0);
    }
    getPayment() {
        return countBy(this.transactions.map(({ formaDePagamento }) => formaDePagamento));
    }
    getStatus() {
        return countBy(this.transactions.map(({ status }) => status));
    }
    getSalesByDay() {
        const week = {
            ['Domingo']: 0,
            ['Segunda']: 0,
            ['Terça']: 0,
            ['Quarta']: 0,
            ['Quinta']: 0,
            ['Sexta']: 0,
            ['Sábado']: 0,
        };
        for (let i = 0; i < this.transactions.length; i++) {
            const day = this.transactions[i].data.getDay();
            if (day === 0)
                week['Domingo'] += 1;
            if (day === 1)
                week['Segunda'] += 1;
            if (day === 2)
                week['Terça'] += 1;
            if (day === 3)
                week['Quarta'] += 1;
            if (day === 4)
                week['Quinta'] += 1;
            if (day === 5)
                week['Sexta'] += 1;
            if (day === 6)
                week['Sábado'] += 1;
        }
        return week;
    }
    getBestDay() {
        return Object.entries(this.salesByDay).sort((a, b) => {
            return b[1] - a[1];
        })[0];
    }
}
//# sourceMappingURL=Statistics.js.map