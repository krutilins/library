export function mapFromArray<T>(arr: T[], key: keyof T): Map<number, T> {
  return arr.reduce((acc, item) => acc.set(item[key], item), new Map());
}
