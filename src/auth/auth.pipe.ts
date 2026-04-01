import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class SignUpValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (!value.username) {
            throw new BadRequestException('username is required')
        }
        if (!value.email) {
            throw new BadRequestException('email is required')
        }
        if (!value.password) {
            throw new BadRequestException('password is required')
        }

        return value
    }
}

// This is useless but at least I found Out a dto is better with the Body decorator 
// having and instance of the ValidationPipe class in it will enforce dto validation
