import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// Bind active mock interception schemas to the test execution process
export const server = setupServer(...handlers);