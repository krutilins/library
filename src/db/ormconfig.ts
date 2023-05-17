import { typeOrmConfigService } from 'src/common/typeorm/typeorm-config.service';
import { DataSource, DataSourceOptions } from 'typeorm';

const options = typeOrmConfigService.createTypeOrmOptions();
export const dataSourceOptions: DataSourceOptions = {
  ...options,
} as DataSourceOptions;

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
