// Legacy auth stubs - customize with real implementations
export async function comparePasswords(password: string, hash: string): Promise<boolean> {
  // TODO: Replace with bcrypt.compare or equivalent
  return password === hash
}

export function signToken(userId: string): string {
  // TODO: Replace with actual JWT signing
  return Buffer.from(userId).toString('base64')
}

export async function verifyToken(token: string): Promise<string | null> {
  // TODO: Replace with actual JWT verification
  return token || null
}

export function hashPassword(password: string): string {
  // TODO: Replace with bcrypt.hash
  return password
}
