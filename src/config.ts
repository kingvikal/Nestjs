export default{
    aws: {
    AWS_S3_BUCKET_NAME: 'AWS_S3_BUCKET_NAME',
    Access_Key_ID: 'Access_Key_ID',
    Secret_Access_Key:'topSecret51',
    cdnUrl: 'cdnUrl',
  },
  dbConfig: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'agro_nepal_app',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  },
}