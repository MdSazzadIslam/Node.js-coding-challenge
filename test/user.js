const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const User = require("../src/models/userMode");
const should = chai.should();

let loginDetails = {
  email: "ecom@gmail.com",
  password: "12345678",
};
let registrationDetails = {
  firstName: "test",
  lastName: "test",
  email: "test@gmail.com",
  password: "12345678",
};
let token = "";
chai.use(chaiHttp);
describe("*********** AUTH ***********", () => {
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
   * Test the /POST route
   */
  describe("/POST register", () => {
    it("it should POST register", (done) => {
      chai
        .request(server)
        .post("/api/v1/ecom/user/registration")
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an("object");
          done();
        });
    });
    it("it should NOT POST a register if email already exists", (done) => {
      chai
        .request(server)
        .post("/api/v1/ecom/user/registration")
        .send(registrationDetails)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  /*
   * Test the /GET route
   */
  describe("/GET users", () => {
    it("it should GET all the users", (done) => {
      chai
        .request(server)
        .get("/api/v1/ecom/user")
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          done();
        });
    });
  });
});
