import axios from 'axios';

//im facing a problem with json-server-auth so i will use normal CRUD for login and signup
export const signup = async (username: string, password: string): Promise<{ accessToken: string }> => {
  const response = await axios.post(`http://localhost:3000/users`, {
    username: username,
    password: password,
  });
  return response.data;
};

export const login = async (username: string, password: string): Promise<{ accessToken: string }> => {
  //this should be post but i had a problem with json-server-auth so i used get request
  const response = await axios.get(`http://localhost:3000/users?username=${username}&password=${password}`);
  return response.data;
};
