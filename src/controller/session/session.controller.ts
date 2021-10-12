import { Request, Response } from "express";
import { validatePassword } from "../../services/user.service";
import { createSession } from "../../services/session.service";
import { signJwt } from "../../utils/jwt.utils";

//create session on logging
export async function createUserSession(req: Request, res: Response) {
  //validate user passsword
  const user = await validatePassword(req.body);
  if (!user) {
    return res.status(401).send("Invalid email or password");
  }
  //create a session
  const session = await createSession(user.id, req.get("user-agent") || "");

  //create an access token
  const accesToken = signJwt(
    { ...user, session: session.id },
    { expiresIn: process.env.accessTokenTtl } //access token time to live 15 minutes
  );

  //create a refresh token
  const refreshToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: process.env.refreshTokenTtl } //access token time to live 1 year
  );

  //return access and refrsh token

  return res.send({ accesToken, refreshToken });
}

export async function getUserSessionHandler(userId: string, userAgent: string) {
  // const session = await SessionModel.create(user_id: userId, userAgent);
}
