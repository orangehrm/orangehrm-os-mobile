export const authenticate = (
  instanceUrl: string,
  username: string,
  password: string,
) => {
  const authEndpoint = instanceUrl + '/oauth/issueToken';
  return fetch(authEndpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'password',
      client_id: 'mobile',
      client_secret: 'mobile',
      username,
      password,
    }),
  });
};
