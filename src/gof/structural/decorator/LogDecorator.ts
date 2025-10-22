import Usecase from "./Usecase";

export default class LogDecorator implements Usecase {
  constructor(readonly useCase: Usecase) {}

  async execute(input: any): Promise<any> {
    console.log(
      "LogDecorator:\n" + "Calling:\n",
      this.useCase,
      "\nWith:\n",
      input,
    );
    return await this.useCase.execute(input);
  }
}
