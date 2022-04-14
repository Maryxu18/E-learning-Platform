import config from "config";
import { dbConfig } from "@interfaces/db.interface";

const { host, port_or_auto_prefix, database, user, passwd }: dbConfig =
  config.get("dbConfig");
// const { user, passwd, host_url }: dbConfig = config.get("dbConfig");
const url =
  port_or_auto_prefix === "+srv"
    ? `mongodb${port_or_auto_prefix}://${host}/${database}`
    : `mongodb://${host}:${port_or_auto_prefix}/${database}`;
export const dbConnection = {
  url: url,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    user: user,
    pass: passwd,
  },
};
