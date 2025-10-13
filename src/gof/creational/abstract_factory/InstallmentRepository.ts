import Installment from "./Installment";

export default interface InstallmentRepository {
  save(installment: Installment): Promise<void>;
  listByLoanId(loanId: string): Promise<Installment[]>;
}

export class InstallmentRepositoryMemory implements InstallmentRepository {
  static instance: InstallmentRepository;
  installments: Installment[];

  private constructor() {
    this.installments = [];
  }

  async save(installment: Installment): Promise<void> {
    this.installments.push(installment);
  }
  async listByLoanId(loanId: string): Promise<Installment[]> {
    const installment = this.installments.filter(
      (installment: Installment) => installment.loanId === loanId,
    );
    return installment;
  }
  static getInstance() {
    if (!InstallmentRepositoryMemory.instance) {
      InstallmentRepositoryMemory.instance = new InstallmentRepositoryMemory();
    }
    return InstallmentRepositoryMemory.instance;
  }
}
