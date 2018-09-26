import { InjectionToken } from '@angular/core';

import { Environment } from '../environments/environment';

export const APP_ENVIRONMENT = new InjectionToken<Environment>('APP_ENVIRONMENT');
