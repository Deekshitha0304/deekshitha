import pino from "pino";

const logger = pino({
  level: "info"
});

function createUser(name: string, operationId: string) {
  logger.info({ operationId }, "Creating user");

  const user = {
    id: crypto.randomUUID(),
    name
  };

  saveToDatabase(user, operationId);

  logger.info({ operationId, userId: user.id }, "User created");

  return user;
}


function saveToDatabase(
  user: { id: string; name: string },
  operationId: string
) {
  logger.info(
    { operationId, userId: user.id },
    "Saving user to database"
  );

  // simulate DB write
}

const operationId = crypto.randomUUID();

createUser("Alice", operationId);