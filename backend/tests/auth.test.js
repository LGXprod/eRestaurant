const axios = require("axios");
const queryString = require("querystring");
const faker = require("faker");

test("Register customer then login", async () => {
  await axios
    .post(
      "http://localhost:5000/Registration",
      queryString.stringify({
        username: faker.internet.userName(),
        password: faker.internet.password(),
        fName: faker.name.firstName(),
        sName: faker.name.lastName(),
        email: faker.internet.email(),
        phoneNum: faker.phone.phoneNumber(),
        role: "customer",
      })
    )
    .then((res) => console.log(res.status))
    .catch((err) => console.log(err));

  await axios
    .post(
      "http://localhost:5000/Login",
      queryString.stringify({
        username: "testUsername",
        password: "egrgre",
      })
    )
    .then((res) => expect(res.data).toEqual({ auth: false }));
});

test("Register customer service employee", async () => {});

test("Register chef", async () => {});

test("Register management", async () => {});
