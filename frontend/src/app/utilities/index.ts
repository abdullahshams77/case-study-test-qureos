export * from './http';

export function trailingSlash(site: string) {
    return site.replace(/\/$/, '');
  }