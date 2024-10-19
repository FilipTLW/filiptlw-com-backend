import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

export enum LoginType {
    GITHUB = 'github'
}

@Entity('USERS')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({type: 'enum', enum: LoginType})
    login_type: LoginType;

    @Column()
    external_id: string;

    @Column({default: false})
    superuser: boolean;

    @Column({default: ''})
    refresh_token: string;
}
