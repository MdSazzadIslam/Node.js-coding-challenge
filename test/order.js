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
  productId = "",
  order = {};
chai.use(chaiHttp);
describe("*********** order ***********", () => {
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

  describe("/POST order", () => {
    it("it should NOT POST a order without code", (done) => {
      chai
        .request(server)
        .post("/api/v1/ecom/order/create")
        .set("Authorization", `Bearer ${token}`)
        .send(order)
        .end((err, res) => {
          res.should.have.status(500);
          productId = res.body._id;
          res.body.should.be.a("object");
          done();
        });
    });

    it("it should NOT POST a order that not exits", (done) => {
      order = {
        code: "M2100000",
        totalAmt: 13000,
      };
      chai
        .request(server)
        .post("/api/v1/ecom/order/create")
        .set("Authorization", `Bearer ${token}`)
        .send(order)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a("object");
          done();
        });
    });

    it("it should post a order", (done) => {
      order = {
        code: "M21",
        totalAmt: 13000,
      };
      chai
        .request(server)
        .post("/api/v1/ecom/order/create")
        .set("Authorization", `Bearer ${token}`)
        .send(order)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an("object");
          done();
        });
    });
  });
});
