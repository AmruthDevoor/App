import ApiManager from './ApiManager';

export const user_Registration = async data => {
 
  try {
    const result = await ApiManager('/registerMobileUser', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      data: data,
    });
    return result;
  } catch (error) {
    return error.response.data;
  }
};
