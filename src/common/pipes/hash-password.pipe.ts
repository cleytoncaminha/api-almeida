import { Injectable, PipeTransform } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  constructor(private configService: ConfigService) {}
  async transform(password: string) {
    const salt = this.configService.get('SALT_PASSWORD');

    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  }
}
