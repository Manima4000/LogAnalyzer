import { isSqlInjectionAttempt } from './sqlInjectionAttempt';
import { isXssAttempt } from './xssAtempt';

export interface Detector {
  name: string;
  description: string;
  detect: (input: string) => boolean;
}

export const sqlInjectionDetector: Detector = {
    name: 'SQL Injection',
    description: 'Detecta tentativas de injeção de SQL em entradas de usuário.',
    detect: isSqlInjectionAttempt
}

export const xssDetector: Detector = {
    name: 'XSS Attack',
    description: 'Detecta tentativas de Cross-Site Scripting (XSS) em entradas de usuário.',
    detect: isXssAttempt
}


export const detectors: Detector[] = [
    sqlInjectionDetector,
    xssDetector
];
