export default abstract class Loan {
  abstract rate: number;

  constructor(
    readonly loanId: string,
    readonly amount: number,
    readonly income: number,
    readonly installments: number,
    readonly type: string,
  ) {}
}

export class MortgageLoan extends Loan {
  rate = 10;

  constructor(
    loanId: string,
    amount: number,
    income: number,
    installments: number,
  ) {
    super(loanId, amount, income, installments, "mortgage");
  }
}
