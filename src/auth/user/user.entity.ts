import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Page} from "../../content/page/page.entity";

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

    @Column({unique: true})
    home_path: string;

    @Column()
    next_entry: number;

    @OneToMany(() => Page, page => page.user, {eager: true, cascade: ['insert', 'update']})
    pages: Page[];
}
