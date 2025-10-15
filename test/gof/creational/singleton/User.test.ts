import User from "../../../../src/gof/creational/singleton/User";

test("Deve gerar um erro quando chamar passwordMatch com senha invalida", function () {
  const userInput = {
    name: "John Doe",
    email: "john@doe.com",
    password: "123456",
  };
  const user = User.create(userInput.name, userInput.email, userInput.password);
  expect(() => user.passwordMatch("wrongpassword")).toThrow(
    new Error("Invalid credentials"),
  );
});
