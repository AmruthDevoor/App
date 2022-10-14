// export const get_user = async (data) => {
//     var token = data.token;
//     var userName = data.userName;
//     console.warn(data.token);
//     await fetch(
//       `https://virtullearning.cloudjiffy.net/BitStreamIOMobile/mobilelogin/v1/queryMobileUserByUserName/${userName}`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: "Bearer" + token,
//         },
//       }
//     );
  
//     //   try {
//     //     var userName=data.userName;
//     //     var token=data.token
//     //     console.warn(data)
//     //     var A= "Bearer"+ token;
//     //     console.warn(A);
//     //     const headers= {
//     //       'Content-type': 'application/json',
//     //       Authorization: A,
//     //     }
//     //     const result = await ApiManager(`/queryMobileUserByUserName/${userName}`, {
//     //       method: 'GET',
//     //       headers:headers
  
//     //     });
//     //    console.warn(result.data)
//     //     return result;
  
//     //   } catch (error) {
//     //     return error.response.data;
//     //   }
//   };
  