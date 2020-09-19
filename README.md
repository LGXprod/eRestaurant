## Dine Out RESTful API Documentation

**Login User**
----
  Returns JSON with an auth and session_id property.

* **URL:** /Login

* **Method:** `POST`

* **Data Params**

  * **Headers:**
    * Content-type: application/x-www-form-urlencoded
  * **Body:**
    * username
    * password

* **Success Response:**
  
  **Valid User:**

  * **Code:** 200 <br />
    **Content:** `{ id : true, session_id: ______ }`
 
  **Invalid User:**
 
  * **Code:** 200 <br />
    **Content:** `{ id : false }`
 
* **Error Response:**

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ message : "Invalid or missing props" }`

* **Sample Call:**

  ```
  async function checkLogin(username, password) {
    const response = await fetch("/Login", {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      body: queryString.stringify({
        username: username,
        password: password,
      }),
    });

    response
      .json()
      .then((res) => {
        if (res.auth) {
          // any other logic when logging in a user
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        // handle error
      });
  }
  ```
