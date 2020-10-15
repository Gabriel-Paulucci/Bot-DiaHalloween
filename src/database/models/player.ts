import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Guild } from "./guild";
import { Treat } from "./treats";
import { Trick } from "./tricks";
import { User } from "./user";

@Entity('players')
export class Player {
    @PrimaryGeneratedColumn('increment', {
        type: 'integer',
        unsigned: true
    })
    id!: number

    @ManyToOne(() => Guild, x => x.players, {
        nullable: false
    })
    guild!: Guild

    @ManyToOne(() => User, x => x.players, {
        nullable: false
    })
    user!: User

    @ManyToOne(() => Trick, x => x.players, {
        nullable: false
    })
    trick!: Trick

    @ManyToOne(() => Treat, x => x.players, {
        nullable: false
    })
    treat!: Treat
}
