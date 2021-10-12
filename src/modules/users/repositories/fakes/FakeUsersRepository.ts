import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import { v4 } from 'uuid';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: v4(), name, email, password });

    this.users.push(user);

    return user;
  }

  public async findByID(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async save(user: User): Promise<User> {
    const findIndexUser = this.users.findIndex(
      current => current.id === user.id,
    );

    this.users[findIndexUser] = user;

    return this.users[findIndexUser];
  }
}

export default FakeUsersRepository;
