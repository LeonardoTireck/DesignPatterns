import currency from "currency.js";
import Installment from "./Installment";
import Loan from "./Loan";

export default interface InstallmentCalculator {
  calculate(loan: Loan): Installment[];
}

export class SACInstallmentCalculator implements InstallmentCalculator {
  calculate(loan: Loan): Installment[] {
    const installments: Installment[] = [];
    let balance = currency(loan.amount);

    return installments;
  }
}
