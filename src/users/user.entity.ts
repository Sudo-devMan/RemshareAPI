
import { IsString } from 'class-validator'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn({ type: 'int' })
    id!: number;

    @Column({ type: 'varchar', unique: true })
    username!: string;

    @Column({ type: 'varchar' })
    password!: string;

    @Column({ type: 'varchar', unique: true })
    email!: string;

    @Column({ type: 'boolean', default: true })
    isActive!: boolean;

    // Set nullable: true in TypeORM and use string | null in TS
    @Column({ type: 'varchar', nullable: true })
    profilePictureUrl!: string | null;
}
export class UserBaseDto {
    @IsString()
    username!: string

    @IsString()
    email!: string

    @IsString()
    profilePictureUrl!: string

    @IsString()
    password!: string
}
