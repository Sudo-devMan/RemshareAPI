import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Sharing } from "./sharing.entity";

@Entity()
export class ShareFile {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    url: string

    @Column()
    name: string

    @Column()
    type: string

    // @ManyToOne(() => Sharing, (sharing) => sharing.files)
    // sharing: Sharing
}
