import request from "supertest";
import app from "server";

describe("Trailer endpoint", () => {
  test("should return a trailer url", async (done) => {
    const result = await request(app)
    .get("/trailer?url=https://content.viaplay.se/pc-se/film/arrival-2016");
    expect(result.statusCode).toBe(200);
    expect(result.body.trailerUrl).toEqual("https://www.youtube.com/watch?v=tFMo3UJ4B4g");
    done();
  });
  test("should respond with 404", async (done) => {
    const result = await request(app).get("/trailer?url=https://content.viaplay.se/pc-se/film/arrival-201");
    expect(result.statusCode).toBe(404);
    done();
  });
  test("should respond with 404", async (done) => {
    const result = await request(app).get("/trailer?url=");
    expect(result.statusCode).toBe(404);
    done();
  });
  test("should respond with 404", async (done) => {
    const result = await request(app).get("/trailer");
    expect(result.statusCode).toBe(404);
    done();
  });
  test("should rate limit and respond with 429", async (done) => {
    const req = request(app);
    // Make first request
    const result = await req.get("/trailer?url=https://content.viaplay.se/pc-se/film/arrival-2016");
    expect(result.statusCode).toBe(200);
    // Make second request
    const secondResult = await req.get("/trailer?url=https://content.viaplay.se/pc-se/film/arrival-2016");
    expect(secondResult.statusCode).toBe(429);
    done();
  });
});
