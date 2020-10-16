import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "./player";

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('increment', {
        unsigned: true,
        type: 'integer'
    })
    id!: number

    @Column({
        type: 'text',
        unsigned: true
    })
    discordId!: string
    
    @OneToMany(() => Player, x => x.user)
    players!: Player[]
}
