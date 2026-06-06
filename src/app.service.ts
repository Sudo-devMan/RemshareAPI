import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): {message: string, note: string} {
    return {message: "Welcome to RemShare", note: "You probably shouldn't be here, but if you are, ftsek :)"};
  }
}
