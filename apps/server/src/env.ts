import { Config } from "effect";

const BDConfig = Config.all({
  BD_API_TOKEN: Config.nonEmptyString("BD_API_TOKEN"),
  BD_COLLECTOR_ID: Config.option(Config.nonEmptyString("BD_COLLECTOR_ID")),
});

const AppConfig = Config.all({
  BD_CONFIG: BDConfig,
  DB_URL: Config.nonEmptyString("DB_URL"),
});

export { AppConfig, BDConfig };
