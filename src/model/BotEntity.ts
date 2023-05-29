import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Bot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;

  @Column({ length: 100 })
  path: string;

  @Column({ length: 1000 })
  state: string;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
