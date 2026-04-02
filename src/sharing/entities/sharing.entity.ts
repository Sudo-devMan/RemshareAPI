import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ShareFile } from "./sharefile.entity";

@Entity()
export class Sharing {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    note: string

    @Column()
    receiverEmail: string

    @Column({nullable: true, default: 'anonymous@no-email.remshare'})
    senderEmail: string

    @Column()
    password: string

    @Column('simple-array')
    files: string[]

    // @OneToMany(() => ShareFile, (file) => file.sharing, { cascade: true })
    // files: ShareFile[]
}
