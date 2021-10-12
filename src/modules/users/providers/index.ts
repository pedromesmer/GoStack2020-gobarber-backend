import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCriptHashProvider from './HashProvider/implementations/BcriptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCriptHashProvider);
