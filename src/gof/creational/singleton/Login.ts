import UserRepository, { UserRepositoryMemory } from "./UserRepository";

export default class Login {
  userRepository: UserRepository;
  // from a design and coupling pov, the fact that we're using a repo instance inside
  // of a use case is a mistake, because it breaks solid principles, making a higher level
  // part of the application (use case) dependent on a lower level part (repo implementation)
  // but this is made to showcase the design pattern singleton in this example.
  constructor() {
    this.userRepository = UserRepositoryMemory.getInstance();
  }

  async execute(input: Input): Promise<Output> {
    const user = await this.userRepository.getByEmail(input.email);
    const success = user.passwordMatch(input.password);
    return { success };
  }
}

type Input = {
  email: string;
  password: string;
};

type Output = {
  success: boolean;
};
