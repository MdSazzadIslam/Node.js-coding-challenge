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
  subcategory = {};
chai.use(chaiHttp);
describe("*********** SubCategory ***********", () => {
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
  describe("/GET subCategory", () => {
    it("it should GET all the subcategories", (done) => {
      chai
        .request(server)
        .get("/api/v1/ecom/subcategory")
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          done();
        });
    });
  });

  describe("/POST subcategory", () => {
    it("it should NOT POST a subcategory without name and code", (done) => {
      chai
        .request(server)
        .post("/api/v1/ecom/subcategory/create")
        .set("Authorization", `Bearer ${token}`)
        .send(subcategory)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a("object");
          done();
        });
    });

    it("it should post a subcategory", (done) => {
      subcategory = {
        name: "I Phones",
        code: "ip-0001",
        categoryId: "610204bc9ac51e02887498e4",
      };
      chai
        .request(server)
        .post("/api/v1/ecom/subcategory/create")
        .set("Authorization", `Bearer ${token}`)
        .send(subcategory)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an("object");
          done();
        });
    });

    it("it should NOT POST a subcategory that already exists", (done) => {
      chai
        .request(server)
        .post("/api/v1/ecom/subcategory/create")
        .set("Authorization", `Bearer ${token}`)
        .send(subcategory)
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
  describe("GET/:id subcategory", () => {
    it("it should get a single subcategory", (done) => {
      const id = "610206a7c42a6c0ad8eedb91";
      chai
        .request(server)
        .get(`/api/v1/ecom/subcategory/${id}`)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          done();
        });
    });
  });
});
