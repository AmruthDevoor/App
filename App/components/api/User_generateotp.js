import ApiManager from './ApiManager';

export const user_generateotp = async data => {

  try {
    const result = await ApiManager('/generateOtp', {
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
