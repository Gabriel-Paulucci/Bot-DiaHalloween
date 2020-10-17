import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "./player";

@Entity('tricks')
export class Trick extends BaseEntity {
    @PrimaryGeneratedColumn('increment', {
        type: 'integer'
    })
    id!: number

    @Column({
        type: 'integer',
        nullable: false,
        default: 0
    })
    egges!: number

    @Column({
        type: 'integer',
        nullable: false,
        default: 0
    })
    rollsOfPaper!: number

    @OneToMany(() => Player, x => x.trick)
    players!: Player[]
}
