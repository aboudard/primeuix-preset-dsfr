/**
 * jsdom ne fournit pas `ResizeObserver`, utilisé par certains composants
 * PrimeNG (Tabs…) : on le remplace par un objet inerte pour les tests.
 */
class ResizeObserverStub {
  observe(): void {
    /* inerte */
  }
  unobserve(): void {
    /* inerte */
  }
  disconnect(): void {
    /* inerte */
  }
}

globalThis.ResizeObserver ??= ResizeObserverStub;
