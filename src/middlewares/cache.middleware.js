import apicache from "apicache";
import { cache as apicacheMiddleware, clear } from "../config/cache.config.js";

// Middleware de caché con grupo asociado
export const cache = (duration, group) => {
  return apicacheMiddleware(duration, null, {
    appendKey: (req) => group,
  });
};

// Middleware de invalidación — se aplica DESPUÉS del controller
export const clearCache = (group) => {
  return (req, res, next) => {
    const originalJson = res.json.bind(res);

    res.json = (body) => {
      // Solo invalida si la respuesta fue exitosa
      if (res.statusCode >= 200 && res.statusCode < 300) {
        clear(group);
      }
      return originalJson(body);
    };

    next();
  };
};
