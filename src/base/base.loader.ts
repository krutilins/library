import * as DataLoader from 'dataloader';

import { mapFromArray } from 'src/utils/mapFromArray';
import { BaseEntity } from './entity';
import { BaseService } from './base.service';

export function createBaseLoader<T extends BaseEntity>(
  service: BaseService<T>,
) {
  return new DataLoader<number, T>(async (ids) => {
    const data = await service.findByIds(ids);

    const dataMap = mapFromArray(data, 'id');

    return ids.map((id) => dataMap.get(id));
  });
}
