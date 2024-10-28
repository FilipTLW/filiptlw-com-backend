import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Page} from "./page.entity";

@Entity('PAGE_SECTIONS')
export class PageSection {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Page, page => page.sections)
  page?: Page;

  @Column()
  title: string;

  @Column({length: 4096})
  content: string;
}