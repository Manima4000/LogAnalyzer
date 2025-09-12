export const isXssAttempt = (input: string): boolean => {
  const suspiciousSubstrings = [
    '<script',
    'javascript:',
    'onerror=',
    'onload=',
    'onmouseover=',
    'document.cookie',
    'window.location',
    'eval(',
    'alert('
  ];

  const patterns = [
    /<script\b[^>]*>/i,                 
    /<.*?\bon\w+=["']?.*?["']?/i,        // pega eventos como onerror, onload etc.
    /javascript:/i,
    /eval\((.*?)\)/i,
    /alert\((.*?)\)/i
  ];

  const normalizedInput = input.toLowerCase();

  return (
    suspiciousSubstrings.some(sub => normalizedInput.includes(sub)) ||
    patterns.some(regex => regex.test(input))
  );
};