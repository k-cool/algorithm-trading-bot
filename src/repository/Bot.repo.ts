import { dataSource } from "../model";
import { Bot } from "../model/BotEntity";

export const botRepository = dataSource.getRepository(Bot).extend({
  // customRepository
});
