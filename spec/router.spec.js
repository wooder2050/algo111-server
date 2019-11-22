const chaiHttp = require("chai-http");
const chai = require("chai");
const app = require("../app");
require("dotenv").config();

const dbConnect = require("../models/index");

chai.use(chaiHttp);
const expect = chai.expect;

describe("Test with mongoDB database", function() {
  dbConnect();

  describe("POST /users/chance", function() {
    it("should send update user info", function(done) {
      this.timeout(10000);
      chai
        .request(app)
        .post("/users/chance")
        .send({ chance: 1, name: "재영" })
        .end(function(err, res) {
          if (err) return done(err);
          expect(err).to.be.not.ok;
          expect(res.status).to.equal(200);
          expect(typeof res.body).to.equal("object");
          done();
        });
    });
  });

  describe("POST /users/reload", function() {
    it("should send reload user info", function(done) {
      this.timeout(10000);
      chai
        .request(app)
        .post("/users/reload")
        .send({ name: "재영" })
        .end(function(err, res) {
          if (err) return done(err);
          expect(err).to.be.not.ok;
          expect(res.status).to.equal(200);
          expect(typeof res.body).to.equal("object");
          done();
        });
    });
  });

  describe("POST /users/date", function() {
    it("should send reset user info", function(done) {
      this.timeout(10000);
      chai
        .request(app)
        .post("/users/date")
        .send({ name: "재영" })
        .end(function(err, res) {
          if (err) return done(err);
          expect(err).to.be.not.ok;
          expect(res.status).to.equal(200);
          expect(typeof res.body).to.equal("object");
          done();
        });
    });
  });

  describe("GET /problems", function() {
    it("should send problems info", function(done) {
      this.timeout(10000);
      chai
        .request(app)
        .get("/problems")
        .end(function(err, res) {
          if (err) return done(err);
          expect(err).to.be.not.ok;
          expect(res.status).to.equal(200);
          expect(res.body.problem[0]).to.have.property("Limitations");
          expect(res.body.problem[0]).to.have.property("level");
          expect(res.body.problem[0]).to.have.property("stage");
          expect(res.body.problem[0]).to.have.property("description");
          expect(res.body.problem[0]).to.have.property("title");
          expect(typeof res.body).to.equal("object");
          done();
        });
    });
  });

  describe("GET /problems/:level/:stage", function() {
    const level = "1";
    const stage = "1";
    it("should send problems info", function(done) {
      this.timeout(10000);
      chai
        .request(app)
        .get(`/problems/${level}/${stage}`)
        .end(function(err, res) {
          if (err) return done(err);
          expect(err).to.be.not.ok;
          expect(res.status).to.equal(200);
          expect(res.body.problem).to.have.property("Limitations");
          expect(res.body.problem).to.have.property("level");
          expect(res.body.problem).to.have.property("stage");
          expect(res.body.problem).to.have.property("description");
          expect(res.body.problem).to.have.property("title");
          expect(typeof res.body).to.equal("object");
          done();
        });
    });
  });

  describe("POST problems/check", function() {
    const level = "1";
    const stage = "1";
    const code = "";
    it("should send problems check result", function(done) {
      this.timeout(10000);
      chai
        .request(app)
        .post(`/problems/check`)
        .send({ level: level, stage: stage, code: code })
        .end(function(err, res) {
          if (err) return done(err);
          expect(err).to.be.not.ok;
          expect(res.status).to.equal(401);
          expect(res.body.result[0]).to.have.property("expect");
          expect(res.body.result[0]).to.have.property("your_answer");
          expect(res.body.result[0]).to.have.property("result");
          expect(res.body.result.length).to.equal(2);
          expect(typeof res.body).to.equal("object");
          done();
        });
    });
  });

  describe("POST problems/score", function() {
    const level = "1";
    const stage = "1";
    const code = "";
    const time = "10";
    const userName = "재영";
    it("should send problems score result", function(done) {
      this.timeout(10000);
      chai
        .request(app)
        .post(`/problems/score`)
        .send({
          level: level,
          stage: stage,
          code: code,
          time: time,
          userName: userName
        })
        .end(function(err, res) {
          if (err) return done(err);
          expect(err).to.be.not.ok;
          expect(res.status).to.equal(401);
          expect(res.body.result[0]).to.have.property("expect");
          expect(res.body.result[0]).to.have.property("your_answer");
          expect(res.body.result[0]).to.have.property("result");
          expect(res.body.result.length).to.equal(3);
          expect(res.body.finalCode).to.equal('');
          expect(res.body.time).to.equal(time);
          expect(res.body.btnText).to.equal('다시 풀기');
          expect(typeof res.body).to.equal("object");
          done();
        });
    });
  });
});
