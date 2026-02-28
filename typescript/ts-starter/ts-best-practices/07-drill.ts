import debug from "debug";

const userTrace = debug("app:users");
const storageTrace = debug("app:repo");

function modifyUserProfile() {
  userTrace("Starting profile update flow");

  persistUserRecord();

  userTrace("Profile update flow completed");
}

function persistUserRecord() {
  storageTrace("Writing user record to database");

  // simulate DB write

  storageTrace("Database write successful");
}

modifyUserProfile();