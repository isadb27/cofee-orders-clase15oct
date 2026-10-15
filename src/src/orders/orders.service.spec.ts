import {
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { OrderRulesService } from './order-rules.service';
import { OrdersService } from './orders.service';
import { describe, jest, beforeEach } from '@jest/globals';

describe('OrdersService', () => {
  let service: OrdersService;

  const repositoryMock = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    countBy: jest.fn(),
  };

  const orderRulesServiceMock = {
    ensureCanBeMarkedAsReady: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleRef = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(OrderEntity),
          useValue: repositoryMock,
        },
        {
          provide: OrderRulesService,
          useValue: orderRulesServiceMock,
        },
      ],
    }).compile();

    service = moduleRef.get(OrdersService);
  });
});