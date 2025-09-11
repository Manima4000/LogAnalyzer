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

  return patterns.some((regex) => regex.test(input));
};
