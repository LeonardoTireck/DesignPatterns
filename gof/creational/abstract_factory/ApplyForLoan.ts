import { SACInstallmentCalculator } from "./InstallmentCalculator";
import InstallmentRepository from "./InstallmentRepository";
import { MortgageLoan } from "./Loan";
import LoanFactory from "./LoanFactory";
import LoanRepository from "./LoanRepository";
import RepositoryFactory from "./RepositoryFactory";

export default class ApplyForLoan {
  loanRepository: LoanRepository;
  installmentRepository: InstallmentRepository;

  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly loanFactory: LoanFactory,
  ) {
    this.loanRepository = repositoryFactory.createLoanRepository();
    this.installmentRepository =
      repositoryFactory.createInstallmentRepository();
  }

  async execute(input: Input): Promise<Output> {
    const loan = this.loanFactory.createLoan(
      input.amount,
      input.income,
      input.installments,
    );
    const installmentCalculator =
      this.loanFactory.createInstallmentCalculator();
    const installments = installmentCalculator.calculate(loan);
    await this.loanRepository.save(loan);
    for (const installment of installments) {
      await this.installmentRepository.save(installment);
    }
    return {
      loanId: loan.loanId,
    };
  }
}

interface Input {
  amount: number;
  income: number;
  installments: number;
}
interface Output {
  loanId: string;
}
