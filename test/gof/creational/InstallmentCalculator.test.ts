import { SACInstallmentCalculator } from "../../../gof/creational/abstract_factory/InstallmentCalculator";
import { MortgageLoan } from "../../../gof/creational/abstract_factory/Loan";

test("Deve calcular as parcelas utilizando SAC", function () {
  const installmentCalculator = new SACInstallmentCalculator();
  const loan = MortgageLoan.create(100000, 10000, 240);
  const installments = installmentCalculator.calculate(loan);
  expect(installments).toHaveLength(240);
});
