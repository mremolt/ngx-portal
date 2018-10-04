import { InjectionToken } from '@angular/core';

import { ApiTokenSelector } from './types';

export const API_TOKEN_SELECTOR = new InjectionToken<ApiTokenSelector>('TOKEN_SELECTOR');
