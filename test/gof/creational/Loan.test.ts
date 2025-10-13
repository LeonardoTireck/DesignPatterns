import {
  CarLoan,
  MortgageLoan,
} from "../../../gof/creational/abstract_factory/Loan";

test("Deve criar um financiamento imoviliario", function () {
  const loan = MortgageLoan.create(100000, 10000, 240);
  expect(loan.loanId).toBeDefined();
  expect(loan.amount).toBe(100000);
  expect(loan.income).toBe(10000);
  expect(loan.installments).toBe(240);
});

test("Nao deve criar um financiamento imoviliario com prazo superior a 420 meses", function () {
  expect(() => MortgageLoan.create(100000, 10000, 421)).toThrow(
    new Error("The maximum number of installments for mortage loan is 420."),
  );
});

test("Nao deve criar um financiamento imobiliario caso a parcela seja um valor superior a 25% da renda mensal", function () {
  expect(() => MortgageLoan.create(100000, 3000, 100)).toThrow(
    new Error("The installment amount can't exceed 25% of monthly income."),
  );
});

test("Nao deve criar um financiamento veicular com prazo superior a 60 meses", function () {
  expect(() => CarLoan.create(100000, 3000, 100)).toThrow(
    new Error("The maximum number of installments for car loan is 60."),
  );
});

test("Nao deve criar um financiamento veicular caso a parcela seja um valor superior a 30% da renda mensal", function () {
  expect(() => CarLoan.create(100000, 3000, 60)).toThrow(
    new Error("The installment amount can't exceed 30% of monthly income."),
  );
});
