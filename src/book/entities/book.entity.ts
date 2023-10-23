import { ApiProperty } from '@nestjs/swagger';

export class BookClass {
  @ApiProperty({ example: '1', description: 'Unique id from 1' })
  id: number;
  @ApiProperty({ example: 'bad medicine', description: 'Some name' })
  name: string;
  @ApiProperty({ example: 'true', description: 'published or not' })
  published: boolean;
}