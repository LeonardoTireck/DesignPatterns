import Login from "../../../../src/gof/creational/singleton/Login";
import Signup from "../../../../src/gof/creational/singleton/Signup";

test("Deve criar uma conta de usuario", async function () {
  const signup = new Signup();
  const login = new Login();
  const inputSignup = {
    name: "John Doe",
    email: "john@doe.com",
    password: "123456",
  };
  await signup.execute(inputSignup);
  const inputLogin = {
    email: "john@doe.com",
    password: "123456",
  };
  const outputLogin = await login.execute(inputLogin);
  expect(outputLogin.success).toBe(true);
});
