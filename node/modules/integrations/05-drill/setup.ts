import { beforeAll, afterAll, afterEach } from "vitest";
import { server } from "./server";

// start mock server
beforeAll(() => server.listen());

// reset handlers
afterEach(() => server.resetHandlers());

// stop server
afterAll(() => server.close());