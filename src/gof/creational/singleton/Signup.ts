import User from "./User";
import UserRepository, { UserRepositoryMemory } from "./UserRepository";

export default class Signup {
  userRepository: UserRepository;
  // from a design and coupling pov, the fact that we're using a repo instance inside
  // of a use case is a mistake, because it breaks solid principles, making a higher level
  // part of the application (use case) dependent on a lower level part (repo implementation)
  // but this is made to showcase the design pattern singleton in this example.
  constructor() {
    this.userRepository = UserRepositoryMemory.getInstance();
  }

  async execute(input: Input): Promise<void> {
    const user = User.create(input.name, input.email, input.password);
    await this.userRepository.save(user);
  }
}

type Input = {
  name: string;
  email: string;
  password: string;
};
