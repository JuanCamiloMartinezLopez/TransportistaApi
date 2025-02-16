export interface DatabaseInterface {
  initializeConnection(): Promise<void>;
  checkConnection(): Promise<void>;
  connection(): any;
}
