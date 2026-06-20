import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sharing {
    @PrimaryGeneratedColumn({ type: 'int' })
    id!: number;

    @Column({ type: 'text', nullable: true })
    note!: string | null;

    @Column({ type: 'varchar' })
    receiverEmail!: string;

    @Column({ type: 'varchar', nullable: true, default: 'anonymous@no-email.remshare' })
    senderEmail!: string | null;

    @Column({ type: 'varchar' })
    password!: string;

    @Column({ type: 'simple-array' })
    files!: string[];

    @Column({ type: 'varchar' })
    uniqueId!: string;

    @Column({ type: 'varchar', nullable: true, default: 'NO LINK' })
    receiveUrl!: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    // @OneToMany(() => ShareFile, (file) => file.sharing, { cascade: true })
    // files!: ShareFile[];
}