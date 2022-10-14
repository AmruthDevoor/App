import ApiManager from './ApiManager';

export const user_Profile = async data => {

  try {
    const result = await ApiManager('/updateMobileUserProfile', {
      method: 'PUT',
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
