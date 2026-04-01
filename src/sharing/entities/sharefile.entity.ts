import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Sharing } from "./sharing.entity";

@Entity()
export class ShareFile {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Sharing, (sharing) => sharing.files)
    sharing: Sharing
}
