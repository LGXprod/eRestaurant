## Dine Out RESTful API Documentation

**Login User**
----
  Returns JSON with an auth and session_id property.

* **URL:** /Login

* **Method:** `POST`

* **Data Params:**

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

**Register User**
----
Returns JSON with an auth and session_id property.

* **URL:** /Registration

* **Method:** `POST`

* **Data Params:**

  * **Headers:**
    * Content-type: application/x-www-form-urlencoded
  * **Body:**
    * username
    * password

* **Success Response:**

  * **Code:** 200 <br />
    **Content (customer):** 
    ```
    { 
      username: ______, 
      password: ______,
      fName: ______,
      sName: ______,
      email: ______,
      mobileNum: ______,
      role: ______
    }
    ```
    
    **OR**
    
    **Content (staff):** 
    ```
    { 
      customerProps,
      TFN: ______,
      accountName: ______,
      accountNum: ______,
      BSB: ______
    }
    ```
 
* **Error Response:**

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ message : "Invalid or missing props" }`

* **Sample Call:**

  ```
  async function registerUser() {
    const res = await fetch("/Registration", {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      body: queryString.stringify(formData),
    });

    if (res.status === 200) {
      setIsUser(checkLogin(formData.username, formData.password));
    }
  }
  ```
 
 **Make Booking**
----
  Creates a booking document in the database.

* **URL:** /Booking

* **Method:** `POST`

* **Data Params:**

  * **Headers:**
    * Content-type: application/x-www-form-urlencoded
  * **Body:**
    * customer_id
    * table_id
    * date

* **Success Response:**

  * **Code:** 200 <br />
 
* **Error Response:**

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ message : "Invalid or missing props" }`

* **Sample Call:**

 **Delete Booking**
----
  Removes a booking document from the database.

* **URL:** /Booking

* **Method:** `DELETE`

* **URL Params:**
  
  * **booking_id**

* **Success Response:**
  
  **Successful Update:**

  * **Code:** 200 <br />
 
  **Unsuccessful Update:**
 
  * **Code:** 401 <br />
 
* **Error Response:**

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ message : "Invalid or missing props" }`

* **Sample Call:**


**Find Booking**
----
  Gets bookings at a given time or date.

* **URL:** /Booking

* **Method:** `GET`

* **URL Params:**
  
  * **date**
  
  * **check_time**

* **Success Response:**

  * **Code:** 200 <br />
  **Content:** `bookings array'
 
* **Error Response:**

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ message : "Invalid or missing props" }`

* **Sample Call:**
