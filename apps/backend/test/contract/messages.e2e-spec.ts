import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('Localization API (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /messages/:locale (200 OK for valid locale)', () => {
    return request(app.getHttpServer())
      .get('/messages/en')
      .expect(200)
      .expect((res) => {
        // Expect a JSON object with string values
        expect(typeof res.body).toBe('object');
        expect(res.body).not.toBeNull();
        for (const key in res.body) {
          expect(typeof res.body[key]).toBe('string');
        }
      });
  });

  it('GET /messages/:locale (404 Not Found for invalid locale)', () => {
    return request(app.getHttpServer())
      .get('/messages/xx') // Assuming 'xx' is an invalid locale
      .expect(404);
  });
});
