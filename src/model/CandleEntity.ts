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

  @Column("float")
  open: number;

  @Column("float")
  high: number;

  @Column("float")
  low: number;

  @Column("float")
  close: number;

  @Column("float")
  volume: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @ManyToOne(() => Coin, (coin) => coin.id)
  coin: number;
}
