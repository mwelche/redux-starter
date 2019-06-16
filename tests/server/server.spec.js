import request from 'supertest';
import runServer from '../../app/server';

// Inspired by http://glebbahmutov.com/blog/how-to-correctly-unit-test-express-server/

describe('server', () => {
  let server;

  beforeEach((done) => {
    process.env.PORT = 30000;
    server = runServer(() => done());
  });

  afterEach((done) => {
    server.close(done);
  });

  it('serves favicon.ico', (done) => {
    request(server)
      .get('/favicon.ico')
      .expect(200, done);
  });

  it('responds to /', (done) => {
    request(server)
      .get('/')
      .expect(200, done);
  });

  it('responds to /create-video', (done) => {
    request(server)
      .get('/create-video')
      .expect(200, done);
  });

  // it('responds with 404 to unexisting routes', (done) => {
  //   request(server)
  //     .get('/foo/bar')
  //     .expect(404, done);
  // });
});
