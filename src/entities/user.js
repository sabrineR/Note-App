export default function user(username, password) {
  return {
    getUserName: () => username,
    getPassword: () => password,
  };
}
