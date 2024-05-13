"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
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
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var socketServer_exports = {};
__export(socketServer_exports, {
  SocketServer: () => SocketServer
});
module.exports = __toCommonJS(socketServer_exports);
var import_shared = require("@rsbuild/shared");
var import_ws = __toESM(require("../../compiled/ws"));
var import_shared2 = require("../provider/shared");
class SocketServer {
  constructor(options) {
    __publicField(this, "wsServer");
    __publicField(this, "sockets", []);
    __publicField(this, "options");
    __publicField(this, "stats");
    __publicField(this, "timer", null);
    this.options = options;
  }
  upgrade(req, sock, head) {
    if (!this.wsServer.shouldHandle(req)) {
      return;
    }
    this.wsServer.handleUpgrade(req, sock, head, (connection) => {
      this.wsServer.emit("connection", connection, req);
    });
  }
  // create socket, install socket handler, bind socket event
  prepare() {
    this.wsServer = new import_ws.default.Server({
      noServer: true,
      path: this.options.client?.path
    });
    this.wsServer.on("error", (err) => {
      import_shared.logger.error(err);
    });
    this.timer = setInterval(() => {
      for (const socket of this.wsServer.clients) {
        const extWs = socket;
        if (!extWs.isAlive) {
          extWs.terminate();
        } else {
          extWs.isAlive = false;
          extWs.ping(() => {
          });
        }
      }
    }, 3e4);
    this.wsServer.on("connection", (socket) => {
      this.onConnect(socket);
    });
  }
  updateStats(stats) {
    this.stats = stats;
    this.sendStats();
  }
  // write message to each socket
  sockWrite(type, data) {
    for (const socket of this.sockets) {
      this.send(socket, JSON.stringify({ type, data }));
    }
  }
  singleWrite(socket, type, data) {
    this.send(socket, JSON.stringify({ type, data }));
  }
  close() {
    for (const socket of this.sockets) {
      socket.close();
    }
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
  onConnect(socket) {
    const connection = socket;
    connection.isAlive = true;
    connection.on("pong", () => {
      connection.isAlive = true;
    });
    if (!connection) {
      return;
    }
    this.sockets.push(connection);
    connection.on("close", () => {
      const idx = this.sockets.indexOf(connection);
      if (idx >= 0) {
        this.sockets.splice(idx, 1);
      }
    });
    if (this.options.hmr || this.options.liveReload) {
      this.singleWrite(connection, "hot");
    }
    if (this.stats) {
      this.sendStats(true);
    }
  }
  // get standard stats
  getStats() {
    const curStats = this.stats;
    if (!curStats) {
      return null;
    }
    const defaultStats = {
      all: false,
      hash: true,
      assets: true,
      warnings: true,
      warningsCount: true,
      errors: true,
      errorsCount: true,
      errorDetails: false,
      children: true
    };
    return curStats.toJson(defaultStats);
  }
  // determine what message should send by stats
  sendStats(force = false) {
    const stats = this.getStats();
    if (!stats) {
      return null;
    }
    const shouldEmit = !force && stats && !stats.errorsCount && stats.assets && stats.assets.every((asset) => !asset.emitted);
    if (shouldEmit) {
      return this.sockWrite("still-ok");
    }
    this.sockWrite("hash", stats.hash);
    if (stats.errorsCount) {
      return this.sockWrite("errors", (0, import_shared2.getAllStatsErrors)(stats));
    }
    if (stats.warningsCount) {
      return this.sockWrite("warnings", (0, import_shared2.getAllStatsWarnings)(stats));
    }
    return this.sockWrite("ok");
  }
  // send message to connecting socket
  send(connection, message) {
    if (connection.readyState !== 1) {
      return;
    }
    connection.send(message);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SocketServer
});
