import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Guild } from "./guild";
import { Treat } from "./treats";
import { Trick } from "./tricks";
import { User } from "./user";

@Entity('players')
export class Player extends BaseEntity {
    @PrimaryGeneratedColumn('increment', {
        type: 'integer',
        unsigned: true
    })
    id!: number

    @Column({
        type: 'integer',
        nullable: false
    })
    guildId!: number

    @Column({
        type: 'integer',
        nullable: false
    })
    userId!: number
    
    @Column({
        type: 'integer',
        nullable: false
    })
    trickId!: number
    
    @Column({
        type: 'integer',
        nullable: false
    })
    treatId!: number

    @ManyToOne(() => Guild, x => x.players)
    @JoinColumn({
        name: 'guildId'
    })
    guild!: Guild

    @ManyToOne(() => User, x => x.players)
    @JoinColumn({
        name: 'userId'
    })
    user!: User

    @ManyToOne(() => Trick, x => x.players)
    @JoinColumn({
        name: 'trickId'
    })
    trick!: Trick

    @ManyToOne(() => Treat, x => x.players)
    @JoinColumn({
        name: 'treatId'
    })
    treat!: Treat
}
