/* eslint-disable */

// https://vuejs.org/guide/extras/reactivity-transform.html#typescript-integration
/// <reference types="vue/macros-global" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined
    VUE_ROUTER_BASE: string | undefined
  }
}
