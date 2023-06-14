import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // It makes it available for all the modules
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
