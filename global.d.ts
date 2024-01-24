// global.d.ts
declare global {
  namespace NodeJS {
    interface Global {
      __DEV__: boolean;
    }
  }
}

export {};
