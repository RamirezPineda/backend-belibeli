import { Bcrypt } from '@/auth/utils';

import type { UserCreateDto } from '@/users/dto';
import { EnumRole } from '@/users/models/user.model';
import { UserRepository } from '@/users/repositories/user.repository';

import { CategoryRepository } from '@/categories/repositories/category.repository';
import { CategoryCreateDto } from '@/categories/dto';

export class SeedService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async seed() {
    await this.users();
    await this.categories();
  }

  private async users() {
    const password = await Bcrypt.encryptPassword('12345678');
    const userAdmin = {
      email: 'ramirezpineda@gmail.com',
      name: 'Ricky Roy Ramirez Pineda',
      password,
      role: EnumRole.ADMIN,
    };
    const newUser: UserCreateDto = {
      email: 'john@gmail.com',
      name: 'John Doe',
      password,
    };
    await Promise.all([
      this.userRepository.create(userAdmin),
      this.userRepository.create(newUser),
    ]);
  }

  private async categories() {
    const tshirts: CategoryCreateDto = {
      name: 'T-Shirts',
      description: 'This is a description',
    };
    const tshirtImg =
      'https://res.cloudinary.com/dwn7fonh6/image/upload/v1715909768/portfolio/ecommerce/categories/tshirt_hhtlsj.png';

    await this.categoryRepository.create(tshirts, tshirtImg);

    const jackets: CategoryCreateDto = {
      name: 'Jackets',
      description: 'This is a description',
    };
    const jacketImg =
      'https://res.cloudinary.com/dwn7fonh6/image/upload/v1715910111/portfolio/ecommerce/categories/jacket_dapiaw.png';

    await this.categoryRepository.create(jackets, jacketImg);

    const shirts: CategoryCreateDto = {
      name: 'Shirt',
      description: 'This is a description',
    };
    const shirtImg =
      'https://res.cloudinary.com/dwn7fonh6/image/upload/v1715910291/portfolio/ecommerce/categories/shirt_tfqp7w.png';

    await this.categoryRepository.create(shirts, shirtImg);

    const jeans: CategoryCreateDto = {
      name: 'Jeans',
      description: 'This is a description',
    };
    const jeanImg =
      'https://res.cloudinary.com/dwn7fonh6/image/upload/v1715910353/portfolio/ecommerce/categories/pants_ugjrtx.png';

    await this.categoryRepository.create(jeans, jeanImg);

    const bags: CategoryCreateDto = {
      name: 'Bags',
      description: 'This is a description',
    };
    const bagImg =
      'https://res.cloudinary.com/dwn7fonh6/image/upload/v1715910411/portfolio/ecommerce/categories/bag_a2zydp.png';

    await this.categoryRepository.create(bags, bagImg);

    const shoes: CategoryCreateDto = {
      name: 'Shoes',
      description: 'This is a description',
    };
    const shoeImg =
      'https://res.cloudinary.com/dwn7fonh6/image/upload/v1715910469/portfolio/ecommerce/categories/shoe_dxzz0l.png';

    await this.categoryRepository.create(shoes, shoeImg);

    const wallets: CategoryCreateDto = {
      name: 'Wallets',
      description: 'This is a description',
    };
    const walletImg =
      'https://res.cloudinary.com/dwn7fonh6/image/upload/v1715910477/portfolio/ecommerce/categories/wallet_et7vyq.png';

    await this.categoryRepository.create(wallets, walletImg);

    const caps: CategoryCreateDto = {
      name: 'Wallets',
      description: 'This is a description',
    };
    const capImg =
      'https://res.cloudinary.com/dwn7fonh6/image/upload/v1715910560/portfolio/ecommerce/categories/cap_otwgrz.png';

    await this.categoryRepository.create(caps, capImg);
  }
}
