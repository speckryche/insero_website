import crypto from 'crypto';

const SECRET = process.env.LEAD_MAGNET_SECRET || 'insero-lead-magnet-default-secret';
const EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export function generateToken(email: string, guideSlug: string): string {
  const timestamp = Date.now().toString();
  const data = `${email}:${guideSlug}:${timestamp}`;
  const hmac = crypto.createHmac('sha256', SECRET).update(data).digest('hex');
  const payload = Buffer.from(`${timestamp}:${hmac}`).toString('base64url');
  return payload;
}

export function validateToken(token: string, email: string, guideSlug: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64url').toString();
    const [timestamp, hmac] = decoded.split(':');
    if (!timestamp || !hmac) return false;

    // Check expiry
    const ts = parseInt(timestamp, 10);
    if (Date.now() - ts > EXPIRY_MS) return false;

    // Verify HMAC
    const data = `${email}:${guideSlug}:${timestamp}`;
    const expected = crypto.createHmac('sha256', SECRET).update(data).digest('hex');
    return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(expected));
  } catch {
    return false;
  }
}
