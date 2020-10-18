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

    res
      .json()
      .then((userInfo) => {
        console.log("t", userInfo)
        userState(userInfo);
      })
      .catch((err) =>
        reject({
          success: false,
          err,
        })
      );
  });
}

export {getUserInfo};