import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {PageSection} from "./page-section.entity";

export enum PageType {
  HOME = 'home',
  USER = 'user'
}

@Entity('PAGES')
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'enum', enum: PageType, default: PageType.USER})
  page_type: PageType;

  @Column()
  title: string;

  @Column()
  subtitle?: string;

  @Column()
  header?: string;

  @OneToMany(() => PageSection, pageSection => pageSection.page, {eager: true})
  sections: PageSection[];

  @Column()
  footer?: string;
}
