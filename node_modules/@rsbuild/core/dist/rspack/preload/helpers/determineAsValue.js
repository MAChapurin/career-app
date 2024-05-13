"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var determineAsValue_exports = {};
__export(determineAsValue_exports, {
  determineAsValue: () => determineAsValue
});
module.exports = __toCommonJS(determineAsValue_exports);
var import_node_path = __toESM(require("node:path"));
var import_node_url = require("node:url");
var import_shared = require("@rsbuild/shared");
/**
 * @license
 * Copyright 2018 Google Inc.
 * https://github.com/vuejs/preload-webpack-plugin/blob/master/src/lib/determine-as-value.js
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function determineAsValue({
  href,
  file
}) {
  const url = new import_node_url.URL(file || href, "https://example.com");
  const extension = import_node_path.default.extname(url.pathname).slice(1);
  if (["css"].includes(extension)) {
    return "style";
  }
  if (import_shared.IMAGE_EXTENSIONS.includes(extension)) {
    return "image";
  }
  if (import_shared.VIDEO_EXTENSIONS.includes(extension)) {
    return "video";
  }
  if (import_shared.AUDIO_EXTENSIONS.includes(extension)) {
    return "audio";
  }
  if (import_shared.FONT_EXTENSIONS.includes(extension)) {
    return "font";
  }
  if (["vtt"].includes(extension)) {
    return "track";
  }
  return "script";
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  determineAsValue
});
