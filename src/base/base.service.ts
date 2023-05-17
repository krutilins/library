import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { BaseEntity } from './entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

type OmitId<T extends { id: number }> = Omit<T, 'id'>;

@Injectable()
export abstract class BaseService<T extends BaseEntity> {
  protected abstract repository: Repository<T>;

  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async findOneById(id: number): Promise<T> {
    const findOptions: FindOptionsWhere<BaseEntity> = { id };
    return await this.repository.findOneBy(findOptions as FindOptionsWhere<T>);
  }

  async create(data: OmitId<T>): Promise<T> {
    const result = this.repository.create(data as T);
    return await this.repository.save(result);
  }

  async findByIds(ids: Readonly<number[]>): Promise<T[]> {
    const findOptions: FindOptionsWhere<BaseEntity> = { id: In(ids) };
    const results = await this.repository.findBy(
      findOptions as FindOptionsWhere<T>,
    );
    return results;
  }

  async update(id: number, data: QueryDeepPartialEntity<T>): Promise<T> {
    await this.repository.update(id, data);
    return this.repository.findOneBy({ id } as FindOptionsWhere<T>);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected > 0;
  }
}
