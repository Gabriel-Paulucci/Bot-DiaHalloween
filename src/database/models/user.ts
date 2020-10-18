import { BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "./player";

@Entity('users')
@Index(['discordId'], {
    unique: true 
})
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
