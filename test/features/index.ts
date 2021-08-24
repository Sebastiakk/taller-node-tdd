import { loadFeature } from 'jest-cucumber';
import { join } from 'path';

export const CUCUMBER_FEATURES = {
  INICIO_SISTEMA: loadFeature(join(__dirname, 'inicio-sistema.feature')),
};
