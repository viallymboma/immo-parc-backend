import { Test, TestingModule } from '@nestjs/testing';
import { TaskAssignmentController } from './task-assignment.controller';

describe('TaskAssignmentController', () => {
  let controller: TaskAssignmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskAssignmentController],
    }).compile();

    controller = module.get<TaskAssignmentController>(TaskAssignmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
