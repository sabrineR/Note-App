import db from "../models/index.js";
const UserModel = db.users;
export default function userRepositoryMysqlDB() {
  const findByProperty = ({ username }) => {
    return UserModel.findOne({
      where: { username: username },
    });
  };
  const add = (userEntity) => {
    return UserModel.create({
      username: userEntity.getUserName(),
      password: userEntity.getPassword(),
    });
  };
  return {
    findByProperty,
    add,
  };
}
