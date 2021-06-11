declare module 'nuxt' {
  const Nuxt: any
  const Builder: any
  function loadNuxt(obj: any): Promise<any>
  function build(obj: any): any
  export { Nuxt, Builder, loadNuxt, build }
}
