/*
  Name: taskSchema.test.ts
  Description: Tests for the task schema validation
*/

import { TaskSchema } from "../src/types/taskSchema";

describe('Validating the input fields against taskSchema', () => {
  it('Should not allow title to be empty', () => {
    const result = TaskSchema.safeParse({
      title: '',
    });
    expect(result.success).toBe(false);
  });

  it('Should not allow the title to be more than 50 character', () => {
    const result = TaskSchema.safeParse({
      title: '123456789012345678901234567890123456789012345678901',
    });
    expect(result.success).toBe(false);
  });

  it('Should allow the title to be 50 character', () => {
    const result = TaskSchema.safeParse({
      title: '1234567890123456789012345678901234567890123456789',
    });
    expect(result.success).toBe(true);
  });

  it('Should not allow the description to be more than 255 character', () => {
    const result = TaskSchema.safeParse({
      title: 'title',
      description: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcde',
    });
    expect(result.success).toBe(false);
  });


  it('Should allow the description to be 255 character', () => {
    const result = TaskSchema.safeParse({
      title: 'title',
      description: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ab',
    });
    expect(result.success).toBe(true);
  });
});
