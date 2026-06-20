import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Sharing } from "./sharing.entity";

@Entity()
export class ShareFile {
    @PrimaryGeneratedColumn({ type: 'int' })
    id!: number;

    @Column({ type: 'varchar', nullable: true })
    url!: string | null;

    @Column({ type: 'varchar' })
    name!: string;

    @Column({ type: 'varchar' })
    type!: string;

    // @ManyToOne(() => Sharing, (sharing) => sharing.files, { onDelete: 'CASCADE' })
    // sharing!: Sharing;
}