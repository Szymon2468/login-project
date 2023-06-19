type NameToType = {
  readonly NEXTAUTH_URL: string;
  readonly SECRET: string;
  readonly POSTGRES_USER: string;
  readonly POSTGRES_PASSWORD: string;
  readonly DATABASE_DB: string;
  readonly DATABASE_URL: string;
  readonly SENDGRID_API_KEY: string;
};

export function getEnv<Env extends keyof NameToType>(
  name: Env
): NameToType[Env];

export function getEnv(name: keyof NameToType) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Cannot find environmental variable: ${name}`);
  }

  return value;
}
