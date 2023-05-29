import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ActionType } from "./enum/ActionType";
import { TradeType } from "./enum/TradeType";

@Entity()
export class Action {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", name: "type", enum: ActionType })
  type: ActionType;

  @Column({ type: "enum", name: "trade_type", enum: TradeType })
  tradeType: TradeType;

  @Column("float")
  volume: number;

  @Column("float")
  avgPrice: number;

  @Column("float")
  limitPrice: number;

  @Column("float")
  fee: number;

  @Column({ length: 1000 })
  state: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}
