import 'jest-preset-angular/setup-jest';

HTMLCanvasElement.prototype.getContext = jest.fn();
window.matchMedia = jest.fn(() => ({ matches: 100 } as unknown as MediaQueryList));
