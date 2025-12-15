export function arrayMove<T>(
  array: T[],
  from: number,
  to: number
): T[] {
  const copy = [...array];
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
}
