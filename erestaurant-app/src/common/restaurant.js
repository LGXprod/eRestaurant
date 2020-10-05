async function getRestaurants(setState, callback) {
  const res = await fetch("/Restaurant", { method: "GET" });

  res
    .json()
    .then((restaurants) => {
      callback(restaurants, setState);
    })
    .catch((err) => console.log(err));
}

export { getRestaurants };
