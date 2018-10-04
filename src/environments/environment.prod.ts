import { Environment as BaseEnvironment } from '@mr/ngx-utils';

export const environment: BaseEnvironment = {
  production: true,
  apiUrl: 'http://localhost:3001',
};

export type Environment = Readonly<typeof environment>;
