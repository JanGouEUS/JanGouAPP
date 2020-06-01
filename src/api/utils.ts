export function fetch_POST_json(url, body) {
  return fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body),
  }).then((response) => {
    console.log(response);
    return response.json();
  });
}

export function fetch_POST(url, body) {
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((response) => console.log(response));
}

export function fetch_POST_auth(url, body, auth) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + auth,
    },
    body: JSON.stringify(body),
  });
}

export function fetch_PUT_auth(url, body, auth) {
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + auth,
    },
    body: JSON.stringify(body),
  });
}

export function fetch_GET_auth(url, auth) {
  return fetch(url, {
    method: 'GET',
    headers: {Authorization: 'Bearer ' + auth},
  });
}

export const errors = {
  error_string: 'Something bad happened',
};
