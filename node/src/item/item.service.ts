import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemService {
  private items: Item[] = [];
  private nextId = 1;

  create(createItemDto: CreateItemDto): Item {
    const item: Item = {
      id: this.nextId++,
      ...createItemDto,
    };
    this.items.push(item);
    return item;
  }

  findAll(): Item[] {
    return this.items;
  }

  findOne(id: number): Item {
    const item = this.items.find(item => item.id === id);
    if (!item) {
      throw new Error(`Item with id ${id} not found`);
    }
    return item;
  }

  update(id: number, updateItemDto: UpdateItemDto): Item {
    const item = this.findOne(id);
    Object.assign(item, updateItemDto);
    return item;
  }

  remove(id: number): void {
    const index = this.items.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error(`Item with id ${id} not found`);
    }
    this.items.splice(index, 1);
  }
}
