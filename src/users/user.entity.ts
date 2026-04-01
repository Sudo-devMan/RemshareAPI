
import { IsString } from 'class-validator'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    username: string

    @Column()
    password: string

    @Column({unique: true})
    email: string

    @Column({ default: true })
    isActive: boolean

    @Column({ nullable: true })
    profilePictureUrl: string
}

export class UserBaseDto {
    @IsString()
    username: string

    @IsString()
    email: string

    @IsString()
    profilePictureUrl: string

    @IsString()
    password: string
}
