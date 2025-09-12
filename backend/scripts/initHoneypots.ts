import HoneypotConfig from '../models/HoneypotConfig';
import { honeypotDefinitions } from '../config/honeypot_config';
import { initializeHoneypot } from '../services/honeypotManager';

export async function setupHoneypots(adminUserId: number) {
  for (const def of honeypotDefinitions) {
    const existing = await HoneypotConfig.findByPk(def.port);

    if (existing) {
      await existing.update({ banner: def.banner, enabled: def.enabled });
    } else {
      await HoneypotConfig.create(def);
    }

    if (def.enabled) {
      await initializeHoneypot(def.port, adminUserId);
    }
  }
}