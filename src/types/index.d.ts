import { IUserSchema } from "./schemas";

export {}

declare global {

  namespace NodeJS {
    interface ProcessEnv {
      ACCESS_TOKEN_SECRET: string
      REFRESH_TOKEN_SECRET: string
      SSL_KEY: string
      SSL_CERT: string
      COOKIES_SECRET: string
      CSRF_SECRET: string
      SESSION_SECRET: string
    }
  }

  namespace Express {
    interface User extends IUserSchema {}

    interface Request extends ExpressRequest {
      user?: User;
      csrfToken: () => string
    }

  }
}

