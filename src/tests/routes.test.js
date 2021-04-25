import request from "supertest";
import app from "server";

describe("Trailer endpoint", () => {
  test("should return a trailer url", async (done) => {
    const result = await request(app)
      .get("/trailer?url=https://content.viaplay.se/pc-se/film/arrival-2016")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(result.body.trailerUrl).toEqual("https://www.youtube.com/watch?v=tFMo3UJ4B4g");
    done();
  });
  test("should respond with 404", async (done) => {
    await request(app).get("/trailer?url=https://content.viaplay.se/pc-se/film/arrival-201")
      .expect("Content-Type", /json/)
      .expect(404);
    done();
  });
  test("should respond with 400", async (done) => {
    const result = await request(app).get("/trailer?url=")
      .expect("Content-Type", /json/)
      .expect(400);
    expect(result.body.error).toEqual("\"url\" is not allowed to be empty");
    done();
  });
  test("should respond with 400", async (done) => {
    const result = await request(app).get("/trailer")
      .expect("Content-Type", /json/)
      .expect(400);
    expect(result.body.error).toEqual("\"url\" is required");
    done();
  });
  test("should rate limit and respond with 429", async (done) => {
    const req = request(app);
    // Make first request
    const result = await req.get("/trailer?url=https://content.viaplay.se/pc-se/film/arrival-2016")
      .expect("Content-Type", /json/)
      .expect(200);
    // Make second request
    const secondResult = await req.get("/trailer?url=https://content.viaplay.se/pc-se/film/arrival-2016")
      .expect("Content-Type", /json/)
      .expect(429);
    done();
  });
});
