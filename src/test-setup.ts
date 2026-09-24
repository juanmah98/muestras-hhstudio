/**
 * Global test setup.
 *
 * jsdom implements neither matchMedia nor IntersectionObserver, and it leaves
 * scrollIntoView unimplemented on Element. Every demo page touches all three
 * from ngAfterViewInit, so without these shims every spec that runs change
 * detection dies inside the page's animation setup instead of testing the page.
 */
const createMediaQueryList = (query: string): MediaQueryList =>
  ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  }) as unknown as MediaQueryList;

/**
 * Never invokes the callback. The pages use the observer to kick off GSAP
 * timelines, and jsdom has no layout engine, so firing it would only animate
 * values that no assertion can observe. Observe/unobserve stay inert.
 */
class NoopIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin = '';
  readonly scrollMargin = '';
  readonly thresholds: ReadonlyArray<number> = [];

  constructor(
    // Kept so callers can pass one; the callback is deliberately never called.
    _callback: IntersectionObserverCallback,
    _options?: IntersectionObserverInit,
  ) {}

  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

if (typeof window !== 'undefined') {
  if (typeof window.matchMedia !== 'function') {
    window.matchMedia = createMediaQueryList as typeof window.matchMedia;
  }

  if (typeof globalThis.IntersectionObserver === 'undefined') {
    globalThis.IntersectionObserver =
      NoopIntersectionObserver as unknown as typeof IntersectionObserver;
  }

  if (typeof Element !== 'undefined' && !Element.prototype.scrollIntoView) {
    Element.prototype.scrollIntoView = () => undefined;
  }

  window.scrollTo = (() => undefined) as typeof window.scrollTo;
}
