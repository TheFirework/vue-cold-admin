// declare module '*.vue' {
//   import { DefineComponent } from 'vue'
//   const Component: DefineComponent<{}, {}, any>
//   export default Component
// }
declare module '*.vue' {
  import { defineComponent } from 'vue'
  const Component: ReturnType<typeof defineComponent>
  export default Component
}
