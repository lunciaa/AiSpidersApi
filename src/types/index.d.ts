import { IUserSchema } from "./schemas";

export {}

declare global {
  namespace Express {
    interface User extends IUserSchema {}

    interface Request extends ExpressRequest {
      user?: User;
      test: string;
    }

  }
}

