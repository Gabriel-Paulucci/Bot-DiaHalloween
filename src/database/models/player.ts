import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @Column({
        type: 'integer',
        nullable: false,
        default: true
    })
    trickOrTreat!: boolean

    @Column({
        type: 'text',
        nullable: false,
        default: new Date(0).toISOString()
    })
    trickOrTreatTime!: number

    @ManyToOne(() => Guild, x => x.players)
    guild!: Guild

    @ManyToOne(() => User, x => x.players)
    user!: User

    @ManyToOne(() => Trick, x => x.players)
    trick!: Trick

    @ManyToOne(() => Treat, x => x.players)
    treat!: Treat
}
