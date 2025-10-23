import BankAccountRepository from "./BankAccountRepository";

export default class GetBalance {
  constructor(readonly bankAccountRespository: BankAccountRepository) {}

  async execute(bankAccountId: number): Promise<Output> {
    const account = await this.bankAccountRespository.getById(bankAccountId);
    if (!account) throw new Error("Account not found");

    return {
      balance: account.getBalance(),
    };
  }
}

type Output = {
  balance: number;
};
