import { Module } from '@nestjs/common';
import { AwsService } from './aws.service';
import { AwsController } from './aws.controller';

@Module({
  providers: [AwsService],
  controllers: [AwsController],
  exports: [AwsService]
})
export class AwsModule {}