import { Client } from 'stytch';
import * as stytch from 'stytch';

export const stytchClient = new Client({
  project_id: "project-test-e0090fcb-3bc7-44e4-8112-7f6978fa682b",
  secret: "secret-test-YT-zdL1pXZ8TTN4Ijx4rOtrc79QN4mdPcFc=",
  env: stytch.envs.live, 
});