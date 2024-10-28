import {Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {PageSection} from "./page-section.entity";
import {User} from "../../auth/user/user.entity";

export enum PageType {
  HOME = 'home',
  USER = 'user'
}

@Entity('PAGES')
@Index(['entry', 'user'], {unique: true})
export class Page {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({nullable: true})
  entry?: number;

  @Column({type: 'enum', enum: PageType, default: PageType.USER})
  page_type: PageType;

  @Column()
  title: string;

  @Column({nullable: true})
  subtitle?: string;

  @Column({nullable: true})
  header?: string;

  @OneToMany(() => PageSection, pageSection => pageSection.page, {eager: true, cascade: ['insert', 'update']})
  sections: PageSection[];

  @Column({nullable: true})
  footer?: string;

  @ManyToOne(() => User, user => user.pages, {nullable: true, cascade: ['insert', 'update']})
  user?: User;
}
