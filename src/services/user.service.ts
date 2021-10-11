import { omit } from "lodash";

//checks email and password
//if password is correct, it returns the user object
//if password is inccorect, returns false

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  //get user by email
  const user = await userModel.findOne({ email });

  //if user does not exists, return false
  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  //if password is not valid, return false
  if (!isValid) {
    return false;
  }

  return omit(user.toJSON(), "password");
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query);
}
