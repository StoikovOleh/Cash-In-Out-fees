import { logger } from "../../src/utils/index.js";

// mocking logger to prevent unnecessary logs in the terminal and for the logger ouput testing
beforeAll(() => {
  spyOn(logger, 'error').and.returnValue();
});
