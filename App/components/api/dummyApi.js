export const get_user = async (data) => {
    var userName = data.userName;
    var accessToken = data.accessToken;
    console.warn(userName, accessToken);
  
    const result = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    };
    fetch(
      `https://rowaterplant.cloudjiffy.net/ROWaterPlantTechnician/login/login/v1/getTechnicianProfileByUserName/${userName}`,
      result
    )
      .then((response) => response.json())
      .then((data) => {
        console.warn(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  