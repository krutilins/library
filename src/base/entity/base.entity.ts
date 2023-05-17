import { PrimaryGeneratedColumn, ObjectLiteral } from 'typeorm';

export abstract class BaseEntity implements ObjectLiteral {
  @PrimaryGeneratedColumn()
  id: number;
}
