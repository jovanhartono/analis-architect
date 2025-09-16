import * as migration_20250916_071023 from './20250916_071023';

export const migrations = [
  {
    up: migration_20250916_071023.up,
    down: migration_20250916_071023.down,
    name: '20250916_071023'
  },
];
