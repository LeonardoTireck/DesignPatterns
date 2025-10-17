import Driver from "../../../../src/gof/structural/bridge/Driver";
import Passenger from "../../../../src/gof/structural/bridge/Passenger";

test("Deve criar uma conta de usuario do tipo passageiro", function () {
  const account = new Passenger(
    "John Doe",
    "john.doe@gmail.com",
    "11111111111",
    "JOHN DOE",
    "1111 1111 1111 1111",
    "08/28",
    "123",
    "123456",
  );
  expect(account.name).toBe("John Doe");
  expect(account.email).toBe("john.doe@gmail.com");
});

test("Nao deve criar uma conta de usuario do tipo passageiro com o nome invalido", function () {
  expect(
    () =>
      new Passenger(
        "John",
        "john.doe@gmail.com",
        "11111111111",
        "JOHN DOE",
        "1111 1111 1111 1111",
        "08/28",
        "123",
        "123456",
      ),
  ).toThrow(new Error("Invalid name"));
});

test("Nao deve criar uma conta de usuario do tipo passageiro com o email invalido", function () {
  expect(
    () =>
      new Passenger(
        "John Dow",
        "john.doe@gmail",
        "11111111111",
        "JOHN DOE",
        "1111 1111 1111 1111",
        "08/28",
        "123",
        "123456",
      ),
  ).toThrow(new Error("Invalid email"));
});

test("Nao deve criar uma conta de usuario do tipo passageiro com o documento invalido", function () {
  expect(
    () =>
      new Passenger(
        "John Dow",
        "john.doe@gmail.com",
        "111111111",
        "JOHN DOE",
        "1111 1111 1111 1111",
        "08/28",
        "123",
        "123456",
      ),
  ).toThrow(new Error("Invalid document"));
});

test("Nao deve criar uma conta de usuario do tipo passageiro com o cvv invalido", function () {
  expect(
    () =>
      new Passenger(
        "John Dow",
        "john.doe@gmail.com",
        "11111111111",
        "JOHN DOE",
        "1111 1111 1111 1111",
        "08/28",
        "12",
        "123456",
      ),
  ).toThrow(new Error("Invalid cvv"));
});

test("Deve criar uma conta de usuario do tipo motorista", function () {
  const account = new Driver(
    "John Doe",
    "john.doe@gmail.com",
    "11111111111",
    "AAA9999",
    "123456",
    "sha1",
  );
  expect(account.name).toBe("John Doe");
  expect(account.email).toBe("john.doe@gmail.com");
});

test("Nao deve criar uma conta de usuario do tipo motorista com a placa do carro invalida", function () {
  expect(
    () =>
      new Driver(
        "John Doe",
        "john.doe@gmail.com",
        "11111111111",
        "AAA99",
        "123456",
        "sha1",
      ),
  ).toThrow(new Error("Invalid car plate"));
});

test("Deve valid a senha armazenada em texto plano de uma conta de usuario do tipo passageiro", function () {
  const account = new Passenger(
    "John Doe",
    "john.doe@gmail.com",
    "11111111111",
    "JOHN DOE",
    "1111 1111 1111 1111",
    "08/28",
    "123",
    "123456",
    "plaintext",
  );
  expect(account.passwordMatches("123456")).toBe(true);
});

test("Deve valid a senha armazenada em sha1 de uma conta de usuario do tipo passageiro", function () {
  const account = new Passenger(
    "John Doe",
    "john.doe@gmail.com",
    "11111111111",
    "JOHN DOE",
    "1111 1111 1111 1111",
    "08/28",
    "123",
    "123456",
    "sha1",
  );
  expect(account.passwordMatches("123456")).toBe(true);
});

test("Nao deve criar uma senha com tipo errado", function () {
  expect(
    () =>
      new Passenger(
        "John Doe",
        "john.doe@gmail.com",
        "11111111111",
        "JOHN DOE",
        "1111 1111 1111 1111",
        "08/28",
        "123",
        "123456",
        "non-existing-passwordType",
      ),
  ).toThrow(new Error("Invalid password type"));
});
