import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "./player";

@Entity('treats')
export class Treat {
    @PrimaryGeneratedColumn('increment', {
        type: 'integer'
    })
    id!: number

    @OneToMany(() => Player, x => x.treat.id)
    players!: Player[]
}