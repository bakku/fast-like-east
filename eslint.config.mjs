import pluginVue from "eslint-plugin-vue";
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from "@vue/eslint-config-typescript";
import prettierConfig from "@vue/eslint-config-prettier";

export default [
  ...defineConfigWithVueTs([
    pluginVue.configs["flat/recommended"],
    vueTsConfigs.recommended,
  ]),
  prettierConfig,
];
