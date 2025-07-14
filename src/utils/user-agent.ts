export type UserAgent = 'mac' | 'windows' | 'other';

export function getUserAgent(): UserAgent {
  const platform = window.navigator.platform.toLowerCase() ?? '';
  const userAgent = window.navigator.userAgent.toLowerCase() ?? '';

  if (platform.includes('mac') || userAgent.includes('macintosh')) {
    return 'mac';
  }

  if (platform.includes('win') || userAgent.includes('windows')) {
    return 'windows';
  }

  return 'other';
}
