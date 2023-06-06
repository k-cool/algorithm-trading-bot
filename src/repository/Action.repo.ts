import { dataSource } from "../model";
import { Action } from "../model/ActionEntity";

export const actionRepository = dataSource.getRepository(Action).extend({
  // customRepository
});
