import { Express, Request, Response } from "express";
import validateResource from "./middleware/validateResource";
import { createUserSchema } from "./schema/user.schema";
import { createSessionSchema } from "./schema/session.schema";
import requireUser from "./middleware/requireUser";
import deserializeUser from "./middleware/deseriaizeUser";
import { registerUser } from "./controller/session/user.controller";
import {
  createUserSession,
  deleteUserSession,
} from "./controller/session/session.controller";
import { createPlaceHandler } from "./controller/places/places.controller";
import { createPlaceSchema } from "./schema/place.schema";
import {
  addFriendHandler,
  getFriends,
  removeFriendHandler,
  getFriendsCitiesPlacesHandler,
} from "./controller/friends/friends.controller";
import { createFriendSchema } from "./schema/friend.schema";
import { createSearchUserSchema } from "./schema/searchUser.schema";
import  { sendAllSearchedUsers } from "./controller/searchUser/searchUser.controller";

function routes(app: Express) {
  app.get("/healthCheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.post("/register", validateResource(createUserSchema), registerUser);
  app.post("/login", validateResource(createSessionSchema), createUserSession);
  app.delete("/logout", deserializeUser, requireUser, deleteUserSession);

  //places
  app.post(
    "/add/place",
    deserializeUser,
    requireUser,
    validateResource(createPlaceSchema),
    createPlaceHandler
  );
  app.get(
    "/friendsCitiesPlaces",
    deserializeUser,
    requireUser,
    getFriendsCitiesPlacesHandler
  );

  //friends
  app.get("/my/friends", deserializeUser, requireUser, getFriends);
  app.delete(
    "/remove/friend",
    validateResource(createFriendSchema),
    deserializeUser,
    requireUser,
    removeFriendHandler
  );
  app.post(
    "/add/friend",
    validateResource(createFriendSchema),
    deserializeUser,
    requireUser,
    addFriendHandler
  );
  // Searched user
  app.post(
    "/searched/user",
    validateResource(createSearchUserSchema),
    deserializeUser,
    requireUser,
    sendAllSearchedUsers
  );
}

export default routes;
