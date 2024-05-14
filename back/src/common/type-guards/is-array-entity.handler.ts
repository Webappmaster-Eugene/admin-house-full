export function isArrayEntityHandler<TEntity>(Entity: unknown): Entity is TEntity[] {
  if (Array.isArray(Entity)) {
    return true;
  }
}
