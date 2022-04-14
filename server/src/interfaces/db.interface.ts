export type dbPort = number;
export type dbProtocolPrefix = "+srv";

export interface dbConfig {
  host: string;
  port_or_auto_prefix: dbPort | dbProtocolPrefix;
  database: string;
  user: string;
  passwd: string;
}
