import User from "./User";

export default interface UserRepository {
  save(user: User): Promise<void>;
  getByEmail(email: string): Promise<User>;
}

export class UserRepositoryMemory implements UserRepository {
  static instance: UserRepositoryMemory;
  users: User[] = [];

  private constructor() {}

  static getInstance() {
    if (!UserRepositoryMemory.instance) {
      UserRepositoryMemory.instance = new UserRepositoryMemory();
    }
    return UserRepositoryMemory.instance;
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
  }

  async getByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
}
