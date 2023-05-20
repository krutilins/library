import * as DataLoader from 'dataloader';

import { BaseEntity } from './entity';
import { BaseService } from './base.service';
import { mapFromArray } from 'src/common/helpers';

export function createBaseLoader<T extends BaseEntity>(
  service: BaseService<T>,
): DataLoader<number, T, number> {
  return new DataLoader<number, T>(async (ids) => {
    const data = await service.findByIds(ids);

    const dataMap = mapFromArray(data, 'id');

    return ids.map((id) => dataMap.get(id));
  });
}
