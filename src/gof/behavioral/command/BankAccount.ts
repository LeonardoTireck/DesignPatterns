import Transaction from "./Transaction";

export default class BankAccount {
  transactions: Transaction[] = [];
  constructor(readonly id: number) {}

  debit(amount: number) {
    this.transactions.push(new Transaction("debit", amount));
  }

  credit(amount: number) {
    this.transactions.push(new Transaction("credit", amount));
  }

  getBalance() {
    let balance = 0;
    for (const transaction of this.transactions) {
      if (transaction.type === "credit") balance += transaction.amount;
      if (transaction.type === "debit") balance -= transaction.amount;
    }
    return balance;
  }
}
