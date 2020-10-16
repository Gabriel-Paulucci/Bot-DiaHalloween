import { BaseEntity, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "./player";

@Entity('treats')
export class Treat extends BaseEntity {
    @PrimaryGeneratedColumn('increment', {
        type: 'integer'
    })
    id!: number

    @OneToMany(() => Player, x => x.treat)
    players!: Player[]
}