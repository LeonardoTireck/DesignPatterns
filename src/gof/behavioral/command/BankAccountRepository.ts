import BankAccount from "./BankAccount";

export default interface BankAccountRepository {
  save(bankAccount: BankAccount): Promise<void>;
  getById(accountId: number): Promise<BankAccount | undefined>;
  update(bankAccount: BankAccount): Promise<void>;
}

export class BankAccountRepositoryMemory implements BankAccountRepository {
  accounts: BankAccount[] = [];

  async save(bankAccount: BankAccount): Promise<void> {
    this.accounts.push(bankAccount);
  }

  async getById(accountId: number): Promise<BankAccount | undefined> {
    const account = this.accounts.find((a) => a.id === accountId);
    return account;
  }
  async update(bankAccount: BankAccount): Promise<void> {
    let existingAccountIndex = this.accounts.findIndex(
      (a) => a.id === bankAccount.id,
    );
    this.accounts.splice(existingAccountIndex, 1);
    this.accounts.push(bankAccount);
  }
}
