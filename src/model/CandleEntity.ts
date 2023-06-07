import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Coin } from "./CoinEntity";

@Entity()
export class Candle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("double")
  open: number;

  @Column("double")
  high: number;

  @Column("double")
  low: number;

  @Column("double")
  close: number;

  @Column("double")
  volume: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @ManyToOne(() => Coin, (coin) => coin.id)
  coin: number;
}
