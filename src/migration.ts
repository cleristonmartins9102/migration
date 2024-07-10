import { DataSource } from 'typeorm'

export default new DataSource({
  type: 'postgres',
  host: '127.0.0.1',
  port: 5433,
  username: 'postgres',
  password: 'z`J[$,Ds~<8Iu7Du',
  database: 'afs-deliveries-service',
  entities: [
    'src/infra/entities/**/*.{ts,js}'
  ],
  migrations: ['1720499482104-db.ts']
})
