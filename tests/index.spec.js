import app from '../src/app';
import request from 'supertest';

describe('GET /tasks', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.status).toBe(200);
  });

  test('should respond with an array', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe('POST /tasks', () => {
  const newTask = { title: 'do 50 push ups', description: 'health' };

  describe('given a title and description', () => {
    test('should respond with a 201 status code', async () => {
      const response = await request(app).post('/tasks').send(newTask);
      expect(response.status).toBe(201);
    });

    test('should have a content-type application/json', async () => {
      const response = await request(app).post('/tasks').send(newTask);
      expect(response.headers['content-type']).toEqual(
        expect.stringContaining('json')
      );
    });

    test('should respond with a json object containing a new task with an id', async () => {
      const response = await request(app).post('/tasks').send(newTask);
      expect(response.body.id).toBeDefined();
    });
  });

  describe('when title and description is missing', () => {
    test('should respond with a 400 status code', async () => {
      const fields = [
        {},
        { title: '' },
        { title: 'hello, world!' },
        { description: '' },
        { description: 'hello, world!' },
      ];
      for (const body of fields) {
        const response = await request(app).post('/tasks').send(body);
        expect(response.status).toBe(400);
      }
    });
  });
});
