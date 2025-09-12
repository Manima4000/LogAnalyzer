export const isSqlInjectionAttempt = (input: string): boolean => {
  const patterns = [
    /('|")\s*or\s*('|")?\d+('|")?\s*=\s*\d+/i,
    /--/,
    /;.*drop\s+table/i,
    /union\s+select/i,
    /xp_cmdshell/i,
    /\bOR\b\s+\d+=\d+/i,
    /' OR '1'='1/i,
    /admin' --/i,
  ];

  const suspiciousSubstrings = [
    'DROP TABLE',
    'UNION SELECT',
    'XP_CMDSHELL',
    "' OR '1'='1",
    'admin\' --',
    '--',
    ';--',
    'OR 1=1',
    'OR TRUE',
    'AND FALSE',
    'sleep(',
    'pg_sleep('
  ];

  const normalizedInput = input.toUpperCase();

  return (
    patterns.some(regex => regex.test(input)) ||
    suspiciousSubstrings.some(sub => normalizedInput.includes(sub.toUpperCase()))
  );
};

