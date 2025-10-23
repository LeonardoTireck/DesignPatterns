import BankAccount from "../../../../src/gof/behavioral/command/BankAccount";
import TransferCommand from "../../../../src/gof/behavioral/command/TransferCommand";

test("Deve creditar e debitar em duas contas bancarias", function () {
  const bankAccountA = new BankAccount(1);
  const bankAccountB = new BankAccount(2);
  expect(bankAccountA.getBalance()).toBe(0);
  expect(bankAccountB.getBalance()).toBe(0);
  bankAccountA.debit(100);
  bankAccountB.credit(100);
  expect(bankAccountA.getBalance()).toBe(-100);
  expect(bankAccountA.id).toBe(1);
  expect(bankAccountB.id).toBe(2);
});

test("Deve creditar e debitar em duas contas bancarias usando command", function () {
  const bankAccountA = new BankAccount(1);
  const bankAccountB = new BankAccount(2);
  expect(bankAccountA.getBalance()).toBe(0);
  expect(bankAccountB.getBalance()).toBe(0);
  const transferCommand = new TransferCommand(bankAccountA, bankAccountB, 100);
  transferCommand.execute();
  expect(bankAccountA.getBalance()).toBe(-100);
  expect(bankAccountA.id).toBe(1);
  expect(bankAccountB.id).toBe(2);
});
