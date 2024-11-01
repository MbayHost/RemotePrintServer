export function detectPlatform(): 'windows' | 'android' | 'web' {
  const userAgent = navigator.userAgent.toLowerCase();
  
  if (userAgent.includes('windows')) {
    return 'windows';
  }
  
  if (userAgent.includes('android')) {
    return 'android';
  }
  
  return 'web';
}