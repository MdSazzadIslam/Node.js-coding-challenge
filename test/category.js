"use strict";
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

const should = chai.should();

let loginDetails = {
  email: "ecom@gmail.com",
  password: "12345678",
};
let token = "",
  category = {};
chai.use(chaiHttp);
describe("*********** Category ***********", () => {
  /*
   * Test the /POST route
   */
  describe("/POST login", () => {
    it("it should GET token", (done) => {
      chai
        .request(server)
        .post("/api/v1/ecom/user/login")
        .send(loginDetails)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          res.body.should.have.property("token");
          token = res.body.token;
          done();
        });
    });
  });

  /*
   * Test the /GET route
   */
  describe("/GET category", () => {
    it("it should GET all the categories", (done) => {
      chai
        .request(server)
        .get("/api/v1/ecom/category")
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          done();
        });
    });
  });

  describe("/POST category", () => {
    it("it should NOT POST a category without name and code", (done) => {
      chai
        .request(server)
        .post("/api/v1/ecom/category/create")
        .set("Authorization", `Bearer ${token}`)
        .send(category)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a("object");
          done();
        });
    });

    it("it should post a category", (done) => {
      category = {
        name: "Mobile Accessories",
        code: "ma-0001",
      };
      chai
        .request(server)
        .post("/api/v1/ecom/category/create")
        .set("Authorization", `Bearer ${token}`)
        .send(category)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an("object");
          done();
        });
    });

    it("it should NOT POST a category that already exists", (done) => {
      chai
        .request(server)
        .post("/api/v1/ecom/category/create")
        .set("Authorization", `Bearer ${token}`)
        .send(category)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  /**
   * Test Get/:id
   */
  describe("GET/:id category", () => {
    it("it should get a single category", (done) => {
      const id = "610204bc9ac51e02887498e4";
      chai
        .request(server)
        .get(`/api/v1/ecom/category/${id}`)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          done();
        });
    });
  });
});
