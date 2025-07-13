export async function handlePassword(
  receivedPassword: string,
  condition: Condition,
  userPassword?: string
): Promise<string | boolean> {
  if (condition !== Condition.Verify) {
    const hashedPassword = Bun.password.hashSync(receivedPassword);
    return hashedPassword;
  }

  if (!userPassword) {
    throw new Error("User password to compare is required");
  }

  const isUser = Bun.password.verifySync(receivedPassword, userPassword);
  return isUser;
}

export enum Condition {
  Hash = "hash",
  Verify = "verify",
}
