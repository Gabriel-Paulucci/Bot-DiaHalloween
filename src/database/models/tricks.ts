import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "./player";

@Entity('tricks')
export class Trick {
    @PrimaryGeneratedColumn('increment', {
        type: 'integer'
    })
    id!: number

    @OneToMany(() => Player, x => x.trick.id)
    players!: Player[]
}
