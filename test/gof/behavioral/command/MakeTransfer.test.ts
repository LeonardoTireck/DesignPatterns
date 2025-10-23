import BankAccount from "../../../../src/gof/behavioral/command/BankAccount";
import { BankAccountRepositoryMemory } from "../../../../src/gof/behavioral/command/BankAccountRepository";
import GetBalance from "../../../../src/gof/behavioral/command/GetBalance";
import MakeTransfer from "../../../../src/gof/behavioral/command/MakeTransfer";

test("Deve fazer uma transferencia bancaria entre duas contas", async function () {
  const bankAccountRepository = new BankAccountRepositoryMemory();
  await bankAccountRepository.save(new BankAccount(1));
  await bankAccountRepository.save(new BankAccount(2));
  const makeTransfer = new MakeTransfer(bankAccountRepository);
  const input = {
    fromBankAccount: 1,
    toBankAccount: 2,
    amount: 100,
  };
  const outputMakeTransfer = await makeTransfer.execute(input);
  const getBalance = new GetBalance(bankAccountRepository);
  const outputGetBalanceFromAccount = await getBalance.execute(
    input.fromBankAccount,
  );
  const outputGetBalanceToAccount = await getBalance.execute(
    input.toBankAccount,
  );
  expect(outputGetBalanceFromAccount.balance).toBe(-100);
  expect(outputGetBalanceToAccount.balance).toBe(100);
  expect(outputMakeTransfer).toBeDefined();
  expect(outputMakeTransfer.transactionId).toBeDefined();
});
