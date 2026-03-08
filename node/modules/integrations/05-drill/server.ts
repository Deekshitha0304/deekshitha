import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// create mock server
export const server = setupServer(...handlers);