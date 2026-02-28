import { z } from "zod";

const UserInputSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  age: z.number().int().min(18)
});

type UserInput = z.infer<typeof UserInputSchema>;

type ErrorCode =
  | "INVALID_ID"
  | "INVALID_EMAIL"
  | "UNDERAGE"
  | "UNKNOWN_INPUT";

  function validateUserInput(
  input: unknown
):
  | { ok: true; value: UserInput }
  | { ok: false; code: ErrorCode } {

  const result = UserInputSchema.safeParse(input);

  if (result.success) {
    return { ok: true, value: result.data };
  }

  const issue = result.error.issues[0];

  switch (issue.path[0]) {
    case "id":
      return { ok: false, code: "INVALID_ID" };
    case "email":
      return { ok: false, code: "INVALID_EMAIL" };
    case "age":
      return { ok: false, code: "UNDERAGE" };
    default:
      return { ok: false, code: "UNKNOWN_INPUT" };
  }
}


const valid = {
  id: crypto.randomUUID(),
  email: "alice@example.com",
  age: 25
};

console.log(validateUserInput(valid));