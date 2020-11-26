declare module 'koa-swig' {
  function render<T>(value: T | render.DefaultSettings): any;
  namespace render {
    interface DefaultSettings {
      autospace: boolean;
      root: string;
      cache: string | boolean;
      ext: string;
      writeBody: boolean;
      memory?: string | boolean;
    }
  }
  export default render;
}
