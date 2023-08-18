export default function userRepository(repository) {
  const findByProperty = (params) => repository.findByProperty(params);
  const add = (user) => repository.add(user);
  return {
    findByProperty,
    add,
  };
}
