const axios = require("axios");
const queryString = require("querystring");

test("Register customer then login", async () => {
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
