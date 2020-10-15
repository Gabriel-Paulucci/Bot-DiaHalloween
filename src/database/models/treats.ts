import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('treats')
export class Treat {
    @PrimaryGeneratedColumn('increment', {
        type: 'integer'
    })
    id!: number
}