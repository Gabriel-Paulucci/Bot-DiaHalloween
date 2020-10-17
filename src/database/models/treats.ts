import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "./player";

@Entity('treats')
export class Treat extends BaseEntity {
    @PrimaryGeneratedColumn('increment', {
        type: 'integer'
    })
    id!: number

    @Column({
        type: 'integer',
        nullable: false,
        default: 0
    })
    lollipops!: number

    @Column({
        type: 'integer',
        nullable: false,
        default: 0
    })
    candys!: number

    @Column({
        type: 'integer',
        nullable: false,
        default: 0
    })
    chocolateBars!: number

    @OneToMany(() => Player, x => x.treat)
    players!: Player[]
}