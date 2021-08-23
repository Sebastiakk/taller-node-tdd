module.exports = {
  type: 'sqlite',
  database: ':memory:',
  dropSchema: true,
  synchronize: true,
  logging: false,
  entities: ['dist/db/entidades/*{.ts,.js}'],
};
