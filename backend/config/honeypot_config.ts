// honeypot.config.ts
export const honeypotDefinitions = [
  {
    port: 21,
    banner: 'FTP honeypot ativo',
    enabled: true
  },
  {
    port: 22,
    banner: 'SSH honeypot ativo',
    enabled: true
  },
  {
    port: 23,
    banner: 'Telnet honeypot ativo',
    enabled: false
  },
  {
    port: 80,
    banner: 'HTTP honeypot ativo',
    enabled: true
  },
  {
    port: 443,
    banner: 'HTTPS honeypot ativo',
    enabled: false
  },
  {
    port: 3306,
    banner: 'MySQL honeypot ativo',
    enabled: true
  },
  {
    port: 8080,
    banner: 'Web honeypot ativo',
    enabled: true
  }
];