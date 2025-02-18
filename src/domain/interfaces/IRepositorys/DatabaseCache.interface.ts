export interface DatabaseCache {
  setValue(key: string, value: string): Promise<void>;
  getValue(key: string): Promise<string | null>;
}
