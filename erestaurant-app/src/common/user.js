import Cookies from "universal-cookie";

function getUserInfo(userState) {
  return new Promise(async (resolve, reject) => {
    const cookies = new Cookies();
    const res = await fetch(
      `/User?session_id=${encodeURIComponent(cookies.get("Session id"))}`,
      {
        method: "GET",
      }
    );

    if (res.status !== 404) {
      res
        .json()
        .then((userInfo) => {
          console.log("t", userInfo);
          if (userState != null) userState(userInfo); 
          resolve(true);
        })
        .catch((err) =>
          reject({
            success: false,
            err,
          })
        );
    } else {
      cookies.remove("Session id");
      resolve(false);
    }
  });
}

export { getUserInfo };
