import crypto from 'crypto'

const JWT_SECRET = process.env.AUTH_SECRET || 'dev-secret-change-in-production'

// Simple JWT-like token (for demo - use proper JWT in prod)
export function signToken(payload: { userId: string; email: string; role: string }): string {
  const data = Buffer.from(JSON.stringify(payload)).toString('base64')
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(data).digest('base64')
  return `${data}.${signature}`
}

export function verifyToken(token: string): { userId: string; email: string; role: string } | null {
  try {
    const [data, signature] = token.split('.')
    const expectedSig = crypto.createHmac('sha256', JWT_SECRET).update(data).digest('base64')
    if (signature !== expectedSig) return null
    return JSON.parse(Buffer.from(data, 'base64').toString())
  } catch {
    return null
  }
}

// Stub for bcrypt comparison (replace with real bcrypt.compare in production)
export async function comparePasswords(password: string, hash: string): Promise<boolean> {
  return password === hash || crypto.createHash('sha256').update(password).digest('hex') === hash
}

export async function hashPassword(password: string): Promise<string> {
  return crypto.createHash('sha256').update(password).digest('hex')
}
