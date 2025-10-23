import crypto from "crypto";
import BankAccountRepository from "./BankAccountRepository";
import TransferCommand from "./TransferCommand";

export default class MakeTransfer {
  constructor(readonly bankAccountRespository: BankAccountRepository) {}

  async execute(input: Input): Promise<Output> {
    const fromAccount = await this.bankAccountRespository.getById(
      input.fromBankAccount,
    );
    const toAccount = await this.bankAccountRespository.getById(
      input.toBankAccount,
    );
    if (!fromAccount || !toAccount) {
      throw new Error("Account not found");
    }
    const transferCommand = new TransferCommand(
      fromAccount,
      toAccount,
      input.amount,
    );
    transferCommand.execute();
    await this.bankAccountRespository.update(fromAccount);
    await this.bankAccountRespository.update(toAccount);
    const transactionId = crypto.randomUUID();
    return {
      transactionId,
    };
  }
}

type Input = {
  fromBankAccount: number;
  toBankAccount: number;
  amount: number;
};

type Output = {
  transactionId: string;
};
