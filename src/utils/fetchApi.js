export const fetchApi = (apiUrl) => {

  console.log(apiUrl);
  return fetch(apiUrl)
    .then((res) => {
      // if success
      console.log(res);

      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error("Invalid Response");
      }
    })
    .catch((err) => {
      console.log(err);
    });
    
};
