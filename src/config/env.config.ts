import { environment } from '../environments/environment';

export interface AppEnvConfig {
  production: boolean;
  urlLogin: string;
  urlViajes: string;
}

export const ENV_CONFIG: AppEnvConfig = {
  production: environment.production,
  urlLogin: environment.urlLogin,
  urlViajes: environment.urlViajes
};