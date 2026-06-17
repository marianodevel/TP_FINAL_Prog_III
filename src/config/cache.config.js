import apicache from "apicache";

const cache = apicache.middleware;
const { clear } = apicache;

apicache.options({
  statusCodes: {
    include: [200, 201],
  },
  debug: process.env.NODE_ENV === "development",
});

export { cache, clear };
