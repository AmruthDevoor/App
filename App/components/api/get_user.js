export const get_user = async (data) => {
    var userName = data.userName;
    var accessToken = data.accessToken;
   
  
    const res = {headers: {"Content-Type": "application/json",Authorization: accessToken}};
  var result= fetch(`wallkinrowaterplant.cloudjiffy.net/rsenterprisestechnician/login/login/v1/getTechnicianProfileByUserName/${userName}
`,
      res).then((response) => response.json())
      .then((data) => {console.warn(data)});

     // return JSON.parse(result);
  
return result;
  };
                                                                                                           