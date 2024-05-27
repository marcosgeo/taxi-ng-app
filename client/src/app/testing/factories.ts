import * as faker from 'faker';

import { User } from '../services/auth.service';

export const createFakeUser = (data?: Partial<User>): User => {
  return Object.assign(
    {
      id: faker.datatype.uuid(),
      username: faker.internet.email(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      group: 'rider',
      photo: faker.image.imageUrl(),
    },
    data
  );
};
