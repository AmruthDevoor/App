import ApiManager from './ApiManager';

export const user_reset = async data => {

  try {
    const result = await ApiManager('/resetPassword', {
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
