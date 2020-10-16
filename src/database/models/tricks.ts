import { BaseEntity, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "./player";

@Entity('tricks')
export class Trick extends BaseEntity {
    @PrimaryGeneratedColumn('increment', {
        type: 'integer'
    })
    id!: number

    @OneToMany(() => Player, x => x.trick)
    players!: Player[]
}
