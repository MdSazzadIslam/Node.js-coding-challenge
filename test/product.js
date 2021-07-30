"use strict";
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

let loginDetails = {
  email: "ecom@gmail.com",
  password: "12345678",
};
let token = "",
  product = {};
chai.use(chaiHttp);
describe("*********** Product ***********", () => {
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
  describe("/GET product", () => {
    it("it should GET all the products", (done) => {
      chai
        .request(server)
        .get("/api/v1/ecom/product")
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          done();
        });
    });
  });

  describe("/POST product", () => {
    it("it should NOT POST a product without name, code etc.", (done) => {
      chai
        .request(server)
        .post("/api/v1/ecom/product/create")
        .set("Authorization", `Bearer ${token}`)
        .send(product)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a("object");
          done();
        });
    });

    it("it should post a product", (done) => {
      product = new Product({
        title: "Apple iPad Pro 12.9",
        name: "Apple iPad Pro 12.9",
        code: "ai-0001",
        categoryId: "610204bc9ac51e02887498e4",
        subCategoryId: "610206a7c42a6c0ad8eedb91",
        brand: "Apple",
        description: "Apple iPad Pro 12.9",
        qty: 10,
        price: 120000,
      });
      chai
        .request(server)
        .post("/api/v1/ecom/product/create")
        .set("Authorization", `Bearer ${token}`)
        .send(product)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an("object");
          done();
        });
    });
  });

  /**
   * Test Get/:id
   */
  describe("GET/:id product", () => {
    it("it should get a single product", (done) => {
      const id = "6102b5a0c9a8e82e9c5a56be";
      chai
        .request(server)
        .get(`/api/v1/ecom/product/${id}`)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          done();
        });
    });
  });
});
