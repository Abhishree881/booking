import { Client } from 'stytch';
import * as stytch from 'stytch';

export const stytchClient = new Client({
  project_id: process.env.STYTCH_PROJECT_ID,
  secret: process.env.STYTCH_SECRET,
  env: process.env.STYTCH_ENV === "test" ? stytch.envs.test : stytch.envs.live, 
});

// creating stytch client for authentication