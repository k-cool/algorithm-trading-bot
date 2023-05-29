import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Candle } from "./CandleEntity";

@Entity()
export class Coin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 3 })
  ticker: string;

  @Column({ length: 20 })
  enName: string;

  @Column({ length: 20 })
  koName: string;

  @OneToMany(() => Candle, (candle) => candle.coin)
  candleId: Candle[];

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
