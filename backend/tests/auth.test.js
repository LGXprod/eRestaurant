const axios = require("axios");
const queryString = require("querystring");
const faker = require("faker");
const { internet } = require("faker");

async function registerAndLogin(correctLogin) {
  beforeEach(() => {
    jest.resetModules();
  });

  for (let i = 1; i <= 10; i++) {
    it(`Sample patient ${i}`, async () => {
      const sampleCustomer = {
        username: faker.internet.userName(),
        password: faker.internet.password(),
        fName: faker.name.firstName(),
        sName: faker.name.lastName(),
        email: faker.internet.email(),
        mobileNum: faker.phone.phoneNumber(),
        role: "customer",
      };

      await axios
        .post(
          "http://localhost:5000/Registration",
          queryString.stringify(sampleCustomer)
        )
        .then((res) => console.log(res.status));

      await axios
        .post(
          "http://localhost:5000/Login",
          queryString.stringify({
            username: `${sampleCustomer.username}${
              correctLogin ? "" : Math.random().toString(36).substr(2, 5)
            }`,
            password: `${sampleCustomer.password}${
              correctLogin ? "" : Math.random().toString(36).substr(2, 5)
            }`,
          })
        )
        .then((res) => expect(res.data).toHaveProperty("auth", correctLogin));
    });
  }
}

describe("Register customer then login with correct details", async () => registerAndLogin(true));

describe("Register customer then login with incorrect details", async () => registerAndLogin(false));

// test("Register customer service employee", async () => {});

// test("Register chef", async () => {});

// test("Register management", async () => {});
