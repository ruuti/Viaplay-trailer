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
  test("should responds with 404", async (done) => {
    const result = await request(app).get("/trailer?url=https://content.viaplay.se/pc-se/film/arrival-201");
    expect(result.statusCode).toBe(404);
    done();
  });
  test("should responds with 404", async (done) => {
    const result = await request(app).get("/trailer?url=");
    expect(result.statusCode).toBe(404);
    done();
  });
  test("should responds with 404", async (done) => {
    const result = await request(app).get("/trailer");
    expect(result.statusCode).toBe(404);
    done();
  });
});
