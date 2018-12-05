import config from '@/config';
// import { authHeader } from '../_helpers';

const storage = config.userStorage;

function logout() {
  // remove user from local storage to log user out
  storage.removeItem('user');
}

function handleLoginResponse(response) {
  console.log('#### handle login resp >>', response);
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  };

  return fetch(`${config.baseUrl}/users/authenticate`, requestOptions)
    .then(handleLoginResponse)
    .then(({ user }) => {
      // login successful if there's a jwt token in the response
      if (user.token) {
        // store user details and jwt token in local storage
        // to keep user logged in between page refreshes
        storage.setItem('user', JSON.stringify(user));
      }
      return user;
    });
}


function getAll() {
  const requestOptions = {
    method: 'GET',
    // headers: authHeader(),
  };

  return fetch(`${config.baseUrl}/users`, requestOptions).then(handleLoginResponse);
}

function getCurrentUser() {
  return storage.getItem('user');
}

function isLoggedIn() {
  if (getCurrentUser()) { return true; }
  return false;
}

export default {
  login,
  logout,
  getAll,
  getCurrentUser,
  isLoggedIn,
};
