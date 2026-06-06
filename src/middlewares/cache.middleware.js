import apicache from "apicache";

apicache.options({
  statusCodes: {
    include: [200],
  },
  debug: process.env.NODE_ENV === "development",
});

export const cache = (duration) => apicache.middleware(duration);
