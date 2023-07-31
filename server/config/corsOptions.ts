import { allowedOrigins } from "./allowedOrigins";

export const CorsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },

  Credential: true,
  optionsSuccessStatus: 200,
};