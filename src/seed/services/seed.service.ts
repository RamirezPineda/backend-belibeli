import { Bcrypt } from '@/auth/utils';

import { EnumRole, User } from '@/users/models/user.model';
import { UserRepository } from '@/users/repositories/user.repository';
import { CategoryRepository } from '@/categories/repositories/category.repository';
import { PackageRepository } from '@/packages/repositories/package.repository';
import { DiscountRepository } from '@/discounts/repositories/discount.repository';

import type { UserCreateDto } from '@/users/dto';
import type { CategoryCreateDto } from '@/categories/dto';
import type { PackageCreateDto } from '@/packages/dto';
import type { DiscountCreateDto } from '@/discounts/dto';
import type { Discount } from '@/discounts/models/discount.model';
import { Package } from '@/packages/models/package.model';

export class SeedService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly packageRepository: PackageRepository,
    private readonly discountRepository: DiscountRepository,
  ) {}

  async seed() {
    await this.users();
    await this.categories();
    await this.packages();
    await this.discounts();
  }

  private async users() {
    const password = await Bcrypt.encryptPassword('12345678');
    const userAdmin = {
      email: 'ramirezpineda@gmail.com',
      name: 'Roy Ramirez Pineda',
      password,
      role: EnumRole.ADMIN,
    };
    const users: UserCreateDto[] = [
      { email: 'john@gmail.com', name: 'John Doe', password },
      { email: 'william@gmail.com', name: 'William Smith', password },
      { email: 'jane@gmail.com', name: 'jane@gmail.com', password },
      { email: 'jordan@gmail.com', name: 'John Doe', password },
      { email: 'lee@gmail.com', name: 'Lee Yang', password },
    ];

    const promises: Promise<User>[] = [];

    users.forEach((user) => {
      promises.push(this.userRepository.create(user));
    });

    await this.userRepository.create(userAdmin);
    await Promise.all([promises]);
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
      name: 'Caps',
      description: 'This is a description',
    };
    const capImg =
      'https://res.cloudinary.com/dwn7fonh6/image/upload/v1715910560/portfolio/ecommerce/categories/cap_otwgrz.png';

    await this.categoryRepository.create(caps, capImg);
  }

  private async packages() {
    const packages: PackageCreateDto[] = [
      { high: 27.8, width: 24.8, length: 4.9, weight: 180 }, // T-Shirts
      { high: 15.5, width: 5.7, length: 25.6, weight: 120 }, // Caps
      { high: 30.2, width: 40.9, length: 5.2, weight: 130 }, // Jeans
      { high: 40.6, width: 100.2, length: 15.8, weight: 150 }, // Bags
      { high: 50.3, width: 80.6, length: 10.4, weight: 160 }, // Jackets
      { high: 20.9, width: 60.1, length: 10.6, weight: 130 }, // Shoes
      { high: 5.7, width: 10.3, length: 1.2, weight: 50 }, // Wallets
    ];

    const promises: Promise<Package>[] = [];

    packages.forEach((packagee) => {
      promises.push(this.packageRepository.createPackage(packagee));
    });

    await Promise.all(promises);
  }

  private async discounts() {
    const discounts: DiscountCreateDto[] = [
      { name: 'Flash Sale', amount: 0.6 },
      { name: 'Special Discount', amount: 0.5 },
      { name: 'Summer Discount', amount: 0.15 },
      { name: 'Winter Discount', amount: 0.15 },
      { name: 'Christmas Discount', amount: 0.25 },
    ];

    const promises: Promise<Discount>[] = [];

    discounts.forEach((discount) => {
      promises.push(this.discountRepository.create(discount));
    });

    await Promise.all(promises);
  }
}
