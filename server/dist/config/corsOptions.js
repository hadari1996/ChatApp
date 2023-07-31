"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorsOptions = void 0;
const allowedOrigins_1 = require("./allowedOrigins");
exports.CorsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins_1.allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    Credential: true,
    optionsSuccessStatus: 200,
};
//# sourceMappingURL=corsOptions.js.map