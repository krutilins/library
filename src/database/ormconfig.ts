import { typeOrmConfigService } from 'src/providers/typeorm/typeorm-config.service';
import { DataSource, DataSourceOptions } from 'typeorm';

const options = typeOrmConfigService.createTypeOrmOptions();
export const dataSourceOptions: DataSourceOptions = {
  ...options,
  host: 'localhost',
} as DataSourceOptions;

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
