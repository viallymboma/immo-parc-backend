import { Test, TestingModule } from '@nestjs/testing';
import { TaskAssignmentService } from './task-assignment.service';

describe('TaskAssignmentService', () => {
  let service: TaskAssignmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskAssignmentService],
    }).compile();

    service = module.get<TaskAssignmentService>(TaskAssignmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
