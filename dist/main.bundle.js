/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/classes/AudioChannel.js":
/*!*********************************************!*\
  !*** ./src/scripts/classes/AudioChannel.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ "./node_modules/phaser/dist/phaser.js");
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);

class AudioChannel extends phaser__WEBPACK_IMPORTED_MODULE_0__.Sound.HTML5AudioSoundManager {
  get _volumes() {
    return this.settings.get("volumes");
  }

  // volume as desired by user settings
  get desiredVolume() {
    return this._volumes[this.key];
  }

  // takes master vol into account
  get effectiveVolume() {
    return this.audio.master.volume * this.desiredVolume;
  }
  constructor(audioManager, settingKey) {
    super(audioManager.game);
    this.game = audioManager.game;
    this.settings = this.game.settings;
    this.audio = audioManager;
    this.key = settingKey;
  }
  setVolume(val) {
    const volumes = this._volumes;
    val = Math.max(0, Math.min(1, val));
    volumes[this.key] = val;
    this.settings.set("volumes", volumes);
    return this.updateVolume();
  }
  updateVolume() {
    return super.setVolume(this.effectiveVolume);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AudioChannel);

/***/ }),

/***/ "./src/scripts/classes/AudioManager.js":
/*!*********************************************!*\
  !*** ./src/scripts/classes/AudioManager.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AudioChannel_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AudioChannel.js */ "./src/scripts/classes/AudioChannel.js");

class MasterChannel extends _AudioChannel_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  get effectiveVolume() {
    return this.desiredVolume;
  }
  constructor(audioManager) {
    super(audioManager, "master");
  }
  setVolume(val) {
    super.setVolume(val);
    for (const channel of Object.values(this.audio.channels)) channel.updateVolume();
  }
}

/**
 * @class Manages the Audio Managers for this game and allows for easy access to a global play function.
 */
class AudioManager {
  constructor(game, managers = []) {
    this.game = game;
    this.channels = {};
    for (const key of managers) {
      this.channels[key] = new _AudioChannel_js__WEBPACK_IMPORTED_MODULE_0__["default"](this, key);
      this[key] = this.channels[key];
    }
    if (!this.master) this.master = new MasterChannel(this);
    for (const channel of [this.master].concat(Object.values(this.channels))) channel.setVolume(channel.desiredVolume);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AudioManager);

/***/ }),

/***/ "./src/scripts/classes/BingoNumberGenerator.js":
/*!*****************************************************!*\
  !*** ./src/scripts/classes/BingoNumberGenerator.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globals.js */ "./src/scripts/globals.js");
/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_globals_js__WEBPACK_IMPORTED_MODULE_0__);


/**
 * @class Handles the random generation of bingo numbers
 */
class BingoNumberGenerator {
  get B() {
    return new Array(this.maxPerColumn).fill(0).map((x, i) => this.maxPerColumn * 0 + i + 1);
  }
  get I() {
    return new Array(this.maxPerColumn).fill(0).map((x, i) => this.maxPerColumn * 1 + i + 1);
  }
  get N() {
    return new Array(this.maxPerColumn).fill(0).map((x, i) => this.maxPerColumn * 2 + i + 1);
  }
  get G() {
    return new Array(this.maxPerColumn).fill(0).map((x, i) => this.maxPerColumn * 3 + i + 1);
  }
  get O() {
    return new Array(this.maxPerColumn).fill(0).map((x, i) => this.maxPerColumn * 4 + i + 1);
  }

  // eslint-disable-next-line
  getLetter(number) {
    return this.getColumn(number);
  }
  /**
   * @param {number} number - A valid number in the current bingo generator configuration
   * @return {string} - The letter in the "BINGO" column that the number corresponds to
   */
  getColumn(number) {
    // subtract a single fraction so that the last number in this configuration is included
    return _globals_js__WEBPACK_IMPORTED_MODULE_0__.BINGO[Math.floor(number / this.maxPerColumn - 1 / this.maxPerColumn)];
  }

  /**
   * @param {number} [maxPerColumn=15] - The maximum amount of numbers that can be present in a BINGO column
   */
  constructor(maxPerColumn = 15) {
    this.maxPerColumn = maxPerColumn;
    this.max = _globals_js__WEBPACK_IMPORTED_MODULE_0__.BINGO * maxPerColumn;
    this.usedNumbers = [];
  }

  /**
   * @param {string} [column] - If specified, retrieves a number from the desired BINGO column
   * @return {object} - Retrieves a random, not yet called, number from the available pool of Bingo Numbers. Ensures that numbers cannot be duplicate.
   */
  random(column = null) {
    if (this.usedNumbers.length >= this.max) return console.warn("Attempted to retrieve a random() number from a depleted BingoNumberGenerator");
    if (column != null && typeof column === "string") column = column.toUpperCase();else column = _globals_js__WEBPACK_IMPORTED_MODULE_0__.BINGO[Math.floor(Math.random() * _globals_js__WEBPACK_IMPORTED_MODULE_0__.BINGO.length)];
    let number;
    do {
      number = 1 + _globals_js__WEBPACK_IMPORTED_MODULE_0__.BINGO.indexOf(column) * this.maxPerColumn + Math.floor(Math.random() * this.maxPerColumn);
    } while (this.usedNumbers.includes(number));
    this.usedNumbers.push(number);
    return {
      column,
      number
    };
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BingoNumberGenerator);

/***/ }),

/***/ "./src/scripts/classes/ConnectionHandler.js":
/*!**************************************************!*\
  !*** ./src/scripts/classes/ConnectionHandler.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var colyseus_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! colyseus.js */ "./node_modules/colyseus.js/lib/index.js");
/* harmony import */ var _Player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Player.js */ "./src/scripts/classes/Player.js");


class ConnectionHandler {
  constructor(game) {
    this.game = game;
    this.host = window.location.origin.replace("http", "ws");
    this.client = new colyseus_js__WEBPACK_IMPORTED_MODULE_0__.Client(this.host);
    this.match = null;
    this.matchScene = null;
    this.players = new Map();
    try {
      this.player = new _Player_js__WEBPACK_IMPORTED_MODULE_1__["default"](JSON.parse(decodeURIComponent((name =>
      // https://stackoverflow.com/a/15724300/4672263
      {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
      })("user"))));
    } catch (err) {
      this.player = new _Player_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
    }
    console.log(this.player);
  }
  joinOrCreateMatch() {
    return new Promise((resolve, reject) => {
      this.client.joinOrCreate("match", {
        userData: this.player.toJSON()
      }).then(match => {
        this.match = match;
        match.onMessage("client-xp", msg => {
          this.player.xp = msg.xp;
        });
        match.onMessage("match-clients", msg => {
          console.log(msg.players);
          this.players = new Map();
          for (const player of msg.players) this.players.set(player.id, new _Player_js__WEBPACK_IMPORTED_MODULE_1__["default"](player));
          console.log(this.players);
        });
        match.onMessage("match-player-join", msg => {
          console.log(msg.userData);
          if (msg.userData.id === this.player.id) return;
          this.players.set(msg.userData.id, new _Player_js__WEBPACK_IMPORTED_MODULE_1__["default"](msg.userData));
          console.log(this.players);
        });
        match.onMessage("match-player-leave", msg => {
          this.players.delete(msg.userData.id);
          console.log(this.players);
        });
        match.onMessage("match-load", () => {
          // load 'Scene_Match' here
          this.game.scene.stop("Scene_Menu_Lobby");
          this.game.scene.start("Scene_Match", {
            cards: match.state.cards,
            interval: match.state.interval,
            players: this.players,
            match
          });
        });
        match.onMessage("match-start", () => {
          this.matchScene.start();
        });
        match.onMessage("match-ball", msg => {
          if (this.matchScene) this.matchScene.playBall(msg.ball);
        });
        match.onMessage("match-end", () => {
          this.matchScene.end();
        });
        match.onLeave(code => {
          window.alert("This match was abruptly ended due to a server failure. Sorry!");
          this.leaveMatch();
        });
        resolve(match);
      }).catch(reject);
    });
  }
  beginMatch() {
    if (!this.match) return;
    this.match.send("match-host-begin");
  }
  leaveMatch() {
    if (!this.match) return;
    this.match.removeAllListeners();
    this.match.leave();
    this.match = null;
    this.players = null;
    if (this.matchScene) {
      this.matchScene.scene.start("Scene_Menu_Main");
      this.matchScene = null;
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ConnectionHandler);

/***/ }),

/***/ "./src/scripts/classes/Player.js":
/*!***************************************!*\
  !*** ./src/scripts/classes/Player.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var hashids__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hashids */ "./node_modules/hashids/esm/index.js");

const hash = new hashids__WEBPACK_IMPORTED_MODULE_0__["default"]("bingo-bango", 6);
class Player {
  get tag() {
    return `${this.username}#${this.discriminator}`;
  }
  get avatarURL() {
    if (this.provider === "discord") return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.png`;
    return undefined;
  }
  constructor(user = {}) {
    console.log(user);
    this.provider = user.provider || "bingo-bango";
    this.id = user.id || hash.encode(Math.floor(Math.random() * 1000000));
    this.username = user.username || "Guest";
    this.discriminator = user.discriminator || new Array(4).fill(0).reduce(acc => acc += Math.floor(Math.random() * 10).toString(), "");
    this.avatar = user.avatar || "";
    this.xp = user.xp || 0;
  }

  // eslint-disable-next-line
  toJson() {
    return this.toJSON();
  }
  toJSON() {
    return {
      provider: this.provider,
      id: this.id,
      username: this.username,
      discriminator: this.discriminator,
      tag: this.tag,
      avatar: this.avatar
    };
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);

/***/ }),

/***/ "./src/scripts/classes/SettingsManager.js":
/*!************************************************!*\
  !*** ./src/scripts/classes/SettingsManager.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! store */ "./node_modules/store/dist/store.legacy.js");
/* harmony import */ var store__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(store__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var store_plugins_defaults__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! store/plugins/defaults */ "./node_modules/store/plugins/defaults.js");
/* harmony import */ var store_plugins_defaults__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(store_plugins_defaults__WEBPACK_IMPORTED_MODULE_1__);



/**
 * @class A wrapper class that stores and manages Settings.
 */
class SettingsManager extends Map {
  static get DEFAULTS() {
    return {
      "voicepack": "deyan",
      "volumes": {
        master: .5,
        music: .25,
        voice: 1,
        effects: 1
      }
    };
  }
  _composeDefaults() {
    store__WEBPACK_IMPORTED_MODULE_0__.addPlugin(store_plugins_defaults__WEBPACK_IMPORTED_MODULE_1__);
    store__WEBPACK_IMPORTED_MODULE_0__.defaults(SettingsManager.DEFAULTS);
  }
  _populateFromStore() {
    for (const key of Object.keys(SettingsManager.DEFAULTS)) super.set(key, store__WEBPACK_IMPORTED_MODULE_0__.get(key));
  }
  constructor() {
    super();
    this._composeDefaults();
    this._populateFromStore();
  }
  get(key) {
    if (!super.has(key)) {
      const existing = store__WEBPACK_IMPORTED_MODULE_0__.get(key);
      if (existing) super.set(key, existing);
    }
    return super.get(key);
  }
  set(key, val) {
    store__WEBPACK_IMPORTED_MODULE_0__.set(key, val);
    return super.set(key, val);
  }
  delete(key) {
    store__WEBPACK_IMPORTED_MODULE_0__.remove(key);
    return super.delete(key);
  }
  clear() {
    store__WEBPACK_IMPORTED_MODULE_0__.each((val, key) => {
      store__WEBPACK_IMPORTED_MODULE_0__.remove(key);
    });
    return super.clear();
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SettingsManager);

/***/ }),

/***/ "./src/scripts/classes/Voicepack.js":
/*!******************************************!*\
  !*** ./src/scripts/classes/Voicepack.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globals.js */ "./src/scripts/globals.js");
/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_globals_js__WEBPACK_IMPORTED_MODULE_0__);


/*
 * Callout <- Array
 * A Callout is an array that contains variations for a single Callout.
 * If a Callout is requested for "B6", it will return a random sound variation for "B6".
 * To access a specific variation, simply use the index operator on the array
 */
class Callout extends Array {
  constructor(id, column) {
    super();
    this.id = id;
    this.column = column;
  }

  // return a random Variation
  random() {
    return `voice_${this.column.announcer.name}_${this[Math.floor(Math.random() * this.length)]}`;
  }
}

/*
 * Column <- Map
 * A Column represents a letter in the word 'BINGO', with mappings to Callouts.
 * To access a callout: `<Callout>.get(Number)`
 */
class Column extends Map {
  constructor(letter, voicepack) {
    super();
    this.letter = letter;
    this.id = letter;
    this.announcer = voicepack;
  }
}

/*
 * Voicepack <- Map
 * A Voicepack consists of the following structure:
 * Voicepack
 *   .[B|I|N|G|O] = <Column> => {id, <Callout>}
 *   .BINGO = <Callout>
 */
class Voicepack extends Map {
  // define shorthands for the map columns
  get B() {
    return this.get("B");
  }
  get I() {
    return this.get("I");
  }
  get N() {
    return this.get("N");
  }
  get G() {
    return this.get("G");
  }
  get O() {
    return this.get("O");
  }
  get BINGO() {
    return this.get("BINGO");
  }

  // queues all the files for the voicepack to be loaded by Phaser
  preload(load) {
    const loadVariation = variation => {
      const file = `voice_${this.name}_${variation}`;
      load.audio(file, `${this.name}/${variation}.mp3`);
    };

    // BINGO!!!
    for (const variation of this["BINGO"].values()) loadVariation(variation);

    // <Voicepack>["B"] = <Column>
    for (let i = 0; i < _globals_js__WEBPACK_IMPORTED_MODULE_0__.BINGO.length; i++) {
      // <Column>[1] = <Callout>
      for (const callout of this[_globals_js__WEBPACK_IMPORTED_MODULE_0__.BINGO[i]].values()) {
        // <Callout> == <Array>
        // variation will be 'voice_<announcer>.'
        for (const variation of callout) loadVariation(variation);
      }
    }
  }
  constructor(name = "deyan", numbersPerColumn = 15, variations = 3) {
    super();
    this.name = name;
    this.numbersPerColumn = numbersPerColumn;
    this.variations = variations;
    this.set("BINGO", new Callout(-1, new Column("BINGO", this)));
    for (let i = 0; i < variations; i++) this["BINGO"].push(`Bingo_${i.toString().padStart(2, "0")}`);
    for (let i = 0; i < _globals_js__WEBPACK_IMPORTED_MODULE_0__.BINGO.length; i++) {
      const col = _globals_js__WEBPACK_IMPORTED_MODULE_0__.BINGO[i];
      this.set(col, new Column(col, this));

      // start x at the callout number for each BINGO column (i.e. 16 for I)
      for (let x = numbersPerColumn * i + 1; x <= numbersPerColumn * i + numbersPerColumn; x++) {
        const callout = new Callout(x, this[col]);
        this[col].set(x, callout);
        for (let z = 0; z < variations; z++)
        // A filename has the structure of `[B|I|N|G|O]_##_##.mp3`
        callout.push(`${col}_${callout.id.toString().padStart(2, "0")}_${z.toString().padStart(2, "0")}`);
      }
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Voicepack);

/***/ }),

/***/ "./src/scripts/game.js":
/*!*****************************!*\
  !*** ./src/scripts/game.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/polyfill */ "./node_modules/@babel/polyfill/lib/index.js");
/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_polyfill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! phaser */ "./node_modules/phaser/dist/phaser.js");
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var phaser3_rex_plugins_templates_ui_ui_plugin_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! phaser3-rex-plugins/templates/ui/ui-plugin.js */ "./node_modules/phaser3-rex-plugins/templates/ui/ui-plugin.js");
/* harmony import */ var _classes_SettingsManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./classes/SettingsManager.js */ "./src/scripts/classes/SettingsManager.js");
/* harmony import */ var _classes_AudioManager_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./classes/AudioManager.js */ "./src/scripts/classes/AudioManager.js");
/* harmony import */ var _classes_ConnectionHandler_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./classes/ConnectionHandler.js */ "./src/scripts/classes/ConnectionHandler.js");
/* harmony import */ var _classes_Voicepack_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./classes/Voicepack.js */ "./src/scripts/classes/Voicepack.js");
/* harmony import */ var _scenes_Scene_Preload_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./scenes/Scene_Preload.js */ "./src/scripts/scenes/Scene_Preload.js");
/* harmony import */ var _scenes_Scene_Menu_Main_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./scenes/Scene_Menu_Main.js */ "./src/scripts/scenes/Scene_Menu_Main.js");
/* harmony import */ var _scenes_Scene_Menu_Settings_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./scenes/Scene_Menu_Settings.js */ "./src/scripts/scenes/Scene_Menu_Settings.js");
/* harmony import */ var _scenes_Scene_Menu_Leaderboard_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./scenes/Scene_Menu_Leaderboard.js */ "./src/scripts/scenes/Scene_Menu_Leaderboard.js");
/* harmony import */ var _scenes_Scene_Menu_Credits_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./scenes/Scene_Menu_Credits.js */ "./src/scripts/scenes/Scene_Menu_Credits.js");
/* harmony import */ var _scenes_Scene_Menu_Lobbies_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./scenes/Scene_Menu_Lobbies.js */ "./src/scripts/scenes/Scene_Menu_Lobbies.js");
/* harmony import */ var _scenes_Scene_Menu_Lobby_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./scenes/Scene_Menu_Lobby.js */ "./src/scripts/scenes/Scene_Menu_Lobby.js");
/* harmony import */ var _scenes_Scene_Match_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./scenes/Scene_Match.js */ "./src/scripts/scenes/Scene_Match.js");















Array.prototype.contains = function (item) {
  return this.includes(item);
};
Array.prototype.first = function () {
  return this[0];
};
Array.prototype.last = function () {
  return this[this.length - 1];
};
Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};
Array.prototype.shuffle = function () {
  // https://stackoverflow.com/a/12646864
  for (let i = this.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [this[i], this[j]] = [this[j], this[i]];
  }
  return this;
};
class Bingo extends phaser__WEBPACK_IMPORTED_MODULE_1__.Game {
  constructor(anchor = "game-anchor") {
    super({
      type: phaser__WEBPACK_IMPORTED_MODULE_1__.AUTO,
      backgroundColor: "#ffffff",
      audio: {
        disableWebAudio: true
      },
      scale: {
        parent: anchor.replace(/^#/, ""),
        mode: phaser__WEBPACK_IMPORTED_MODULE_1__.Scale.FIT,
        autoCenter: phaser__WEBPACK_IMPORTED_MODULE_1__.Scale.CENTER_BOTH,
        width: 1280,
        height: 720
      },
      scene: [_scenes_Scene_Preload_js__WEBPACK_IMPORTED_MODULE_7__["default"], _scenes_Scene_Menu_Main_js__WEBPACK_IMPORTED_MODULE_8__["default"], _scenes_Scene_Menu_Settings_js__WEBPACK_IMPORTED_MODULE_9__["default"], _scenes_Scene_Menu_Leaderboard_js__WEBPACK_IMPORTED_MODULE_10__["default"], _scenes_Scene_Menu_Credits_js__WEBPACK_IMPORTED_MODULE_11__["default"], _scenes_Scene_Menu_Lobbies_js__WEBPACK_IMPORTED_MODULE_12__["default"], _scenes_Scene_Menu_Lobby_js__WEBPACK_IMPORTED_MODULE_13__["default"], _scenes_Scene_Match_js__WEBPACK_IMPORTED_MODULE_14__["default"]],
      physics: {
        default: "arcade",
        arcade: {
          debug: false,
          gravity: {}
        }
      },
      callbacks: {
        preBoot: game => {
          game.settings = new _classes_SettingsManager_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
          game.audio = new _classes_AudioManager_js__WEBPACK_IMPORTED_MODULE_4__["default"](game, ["music", "voice", "effects"]);
        }
      },
      plugins: {
        scene: [{
          key: "rexUI",
          plugin: phaser3_rex_plugins_templates_ui_ui_plugin_js__WEBPACK_IMPORTED_MODULE_2__["default"],
          mapping: "rexUI"
        }]
      }
    });
    this.xp = 0;
    this.score = 0;
    this.announcer = new _classes_Voicepack_js__WEBPACK_IMPORTED_MODULE_6__["default"]();
    this.connection = new _classes_ConnectionHandler_js__WEBPACK_IMPORTED_MODULE_5__["default"](this);
  }
}
window.addEventListener("load", () => {
  new Bingo("#phaser-game");

  // Disable the RMB context menu in the game
  /*document.getElementById("phaser-game").oncontextmenu = function(e)
  {
  	e.preventDefault();
  	e.stopPropagation();
  };*/
});

/***/ }),

/***/ "./src/scripts/globals.js":
/*!********************************!*\
  !*** ./src/scripts/globals.js ***!
  \********************************/
/***/ ((module) => {

module.exports = {
  BINGO: "BINGO",
  BUTTON_WIDTH: 160
};

/***/ }),

/***/ "./src/scripts/objects/Ball.js":
/*!*************************************!*\
  !*** ./src/scripts/objects/Ball.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ "./node_modules/phaser/dist/phaser.js");
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../globals.js */ "./src/scripts/globals.js");
/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_globals_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _buttons_Button_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./buttons/Button.js */ "./src/scripts/objects/buttons/Button.js");
/* harmony import */ var _buttons_overlays_TextOverlay_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./buttons/overlays/TextOverlay.js */ "./src/scripts/objects/buttons/overlays/TextOverlay.js");




class Ball extends _buttons_Button_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  static preload(load) {
    load.setPath("assets/img/balls/");
    for (let i = 0; i < 5; i++) load.image(`ball_${_globals_js__WEBPACK_IMPORTED_MODULE_1__.BINGO[i]}`, `ball_${_globals_js__WEBPACK_IMPORTED_MODULE_1__.BINGO[i]}.png`);
  }
  constructor(scene, column, number, data = {}) {
    const sampleBall = new phaser__WEBPACK_IMPORTED_MODULE_0__.GameObjects.Image(scene, 0, 0, "ball_B");
    super(Object.assign({
      scene,
      texture: `ball_${column}`,
      overlay: new _buttons_overlays_TextOverlay_js__WEBPACK_IMPORTED_MODULE_3__["default"](scene, number.toString(), {
        y: sampleBall.displayHeight * .14
      })
    }, data));
    this.overlay.text.setStroke("#000", 8);
    this.column = column;
    this.number = number;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ball);

/***/ }),

/***/ "./src/scripts/objects/BallQueue.js":
/*!******************************************!*\
  !*** ./src/scripts/objects/BallQueue.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ "./node_modules/phaser/dist/phaser.js");
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Ball_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ball.js */ "./src/scripts/objects/Ball.js");


class BallQueue extends phaser__WEBPACK_IMPORTED_MODULE_0__.GameObjects.Container {
  static preload(load) {
    load.setPath("assets/img/balls/");
    load.image("bg_ballQueue1", "bg_ballQueue1.png");
  }
  constructor(data) {
    super(data.scene, data.x, data.y);
    this.balls = [];
    this.bg = new phaser__WEBPACK_IMPORTED_MODULE_0__.GameObjects.Image(this.scene, 0, 0, "bg_ballQueue1");
    this.add(this.bg);
  }
  createBall(letter, number) {
    return new _Ball_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.scene, letter, number, {
      y: -this.bg.displayHeight * .6
    });
  }
  push(ball) {
    let oldBall;
    if (this.balls.length === 5) oldBall = this.balls.shift();
    this.remove(oldBall, true);
    this.balls.push(ball);
    this.add(ball);
    this.scene.tweens.add({
      targets: this.balls,
      ease: "Bounce.easeOut",
      y: "+=" + this.bg.displayHeight * .2,
      duration: 3000
    });
  }
  reset() {
    for (const ball of this.balls) ball.destroy();
    this.balls = [];
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BallQueue);

/***/ }),

/***/ "./src/scripts/objects/Card.js":
/*!*************************************!*\
  !*** ./src/scripts/objects/Card.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ "./node_modules/phaser/dist/phaser.js");
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../globals.js */ "./src/scripts/globals.js");
/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_globals_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _classes_BingoNumberGenerator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../classes/BingoNumberGenerator.js */ "./src/scripts/classes/BingoNumberGenerator.js");
/* harmony import */ var _buttons_Button_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./buttons/Button.js */ "./src/scripts/objects/buttons/Button.js");
/* harmony import */ var _CardTile_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CardTile.js */ "./src/scripts/objects/CardTile.js");
/* harmony import */ var _buttons_overlays_ImageOverlay_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./buttons/overlays/ImageOverlay.js */ "./src/scripts/objects/buttons/overlays/ImageOverlay.js");






class Card extends phaser__WEBPACK_IMPORTED_MODULE_0__.GameObjects.Container {
  static preload(load) {
    load.setPath("assets/img/card/");

    // BINGO Tiles
    for (let i = 0; i < 5; i++) load.image(`tile_${_globals_js__WEBPACK_IMPORTED_MODULE_1__.BINGO[i]}`, `tile_${_globals_js__WEBPACK_IMPORTED_MODULE_1__.BINGO[i]}.png`);

    // Button Tile Backgrounds
    for (let i = 0; i < 5; i++) load.image(`bg_tile_${_globals_js__WEBPACK_IMPORTED_MODULE_1__.BINGO[i]}`, `bg_tile_${_globals_js__WEBPACK_IMPORTED_MODULE_1__.BINGO[i]}.png`);
  }
  _generateBingoRow() {
    const BINGO_ROW_START_X = 0 - Math.floor(_globals_js__WEBPACK_IMPORTED_MODULE_1__.BINGO.length / 2) * _globals_js__WEBPACK_IMPORTED_MODULE_1__.BUTTON_WIDTH,
      BINGO_ROW_START_Y = 0;
    for (let i = 0; i < _globals_js__WEBPACK_IMPORTED_MODULE_1__.BINGO.length; i++) {
      const button = new _buttons_Button_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
        scene: this.scene,
        x: BINGO_ROW_START_X + _globals_js__WEBPACK_IMPORTED_MODULE_1__.BUTTON_WIDTH * i,
        y: BINGO_ROW_START_Y,
        texture: `tile_${_globals_js__WEBPACK_IMPORTED_MODULE_1__.BINGO[i]}`
      });
      this.add(button);
      this.buttons.bingo.push(button);
    }
  }
  _generateCardTiles() {
    const ROW_START_X = 0 - Math.floor(_globals_js__WEBPACK_IMPORTED_MODULE_1__.BINGO.length / 2) * _globals_js__WEBPACK_IMPORTED_MODULE_1__.BUTTON_WIDTH,
      ROW_START_Y = _globals_js__WEBPACK_IMPORTED_MODULE_1__.BUTTON_WIDTH;
    for (let x = 0; x < _globals_js__WEBPACK_IMPORTED_MODULE_1__.BINGO.length; x++) {
      const column = _globals_js__WEBPACK_IMPORTED_MODULE_1__.BINGO[x];
      for (let y = 0; y < this.colLength; y++) {
        const {
          number
        } = this.generator.random(column);
        let button;

        // skip (center, center) button
        if (x === Math.floor(_globals_js__WEBPACK_IMPORTED_MODULE_1__.BINGO.length / 2) && y === Math.floor(this.colLength / 2)) {
          button = new _buttons_Button_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
            scene: this.scene,
            x: ROW_START_X + x * _globals_js__WEBPACK_IMPORTED_MODULE_1__.BUTTON_WIDTH,
            y: ROW_START_Y + y * _globals_js__WEBPACK_IMPORTED_MODULE_1__.BUTTON_WIDTH,
            texture: `bg_tile_${_globals_js__WEBPACK_IMPORTED_MODULE_1__.BINGO[x]}`,
            overlay: new _buttons_overlays_ImageOverlay_js__WEBPACK_IMPORTED_MODULE_5__["default"](this.scene, "star").setScale(.8)
          });
        } else {
          button = new _CardTile_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
            card: this,
            scene: this.scene,
            x: ROW_START_X + x * _globals_js__WEBPACK_IMPORTED_MODULE_1__.BUTTON_WIDTH,
            y: ROW_START_Y + y * _globals_js__WEBPACK_IMPORTED_MODULE_1__.BUTTON_WIDTH,
            texture: `bg_tile_${_globals_js__WEBPACK_IMPORTED_MODULE_1__.BINGO[x]}`,
            number
          });
        }
        this.buttons.tiles[column].push(button);
        this.add(button);
      }
    }
  }
  constructor(scene, x, y, colLength = 5) {
    super(scene, x, y);
    this.colLength = colLength;
    this.generator = new _classes_BingoNumberGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this.bingos = {
      columns: [],
      rows: []
    };
    this.buttons = {
      bingo: [],
      tiles: {
        "B": [],
        "I": [],
        "N": [],
        "G": [],
        "O": []
      }
    };
    this._generateBingoRow();
    this._generateCardTiles();
  }
  _getTile(number) {
    for (const column of Object.values(this.buttons.tiles)) {
      const tile = column.find(x => x.number === number);
      if (!tile) continue;
      return tile;
    }
    return null;
  }
  _getTileAt(x, y) {
    console.log(_globals_js__WEBPACK_IMPORTED_MODULE_1__.BINGO[x], y);
    return this.buttons.tiles[_globals_js__WEBPACK_IMPORTED_MODULE_1__.BINGO[x]][y];
  }
  _getCoordinate(number) {
    const column = _globals_js__WEBPACK_IMPORTED_MODULE_1__.BINGO[Math.floor((Math.max(0, number) - 1) / this.generator.maxPerColumn)],
      index = this.buttons.tiles[column].findIndex(tile => tile.number === number);
    if (index === -1) return null;
    return {
      x: _globals_js__WEBPACK_IMPORTED_MODULE_1__.BINGO.indexOf(column),
      y: index
    };
  }
  _determineBingo(tile) {
    const {
      x,
      y
    } = this._getCoordinate(tile.number);
    console.log(x, y);

    // horizontal
    let horizontal = [];
    for (let i = 0; i < this.colLength; i++) {
      const tile = this._getTileAt(i, y);
      if (tile.completed) horizontal.push(tile);
    }

    // vertical
    let vertical = [];
    for (let i = 0; i < this.buttons.bingo.length; i++) {
      const tile = this._getTileAt(x, i);
      if (tile.completed) vertical.push(tile);
    }
    if (horizontal.length === this.buttons.bingo.length) this.bingos.rows.push(y);
    if (vertical.length === this.buttons.bingo.length) this.bingos.columns.push(x);
    return {
      horizontal: horizontal.length === this.colLength ? horizontal : null,
      vertical: vertical.length === this.buttons.bingo.length ? vertical : null
    };
  }

  // returns the amount of bingos achieved
  play(number) {
    const tile = this._getTile(number);

    // number exists as tile on this card
    if (!tile) return console.warn("Attempted to play() a non-existing number on Card");

    // number exists as an active ball in the BallQueue
    if (!this.scene.queue.balls.some(b => b.number === number)) return console.warn("Clicked on a number not present in the BallQueue");
    tile.complete();
    return Object.values(this._determineBingo(tile)).filter(x => x != null).length;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Card);

/***/ }),

/***/ "./src/scripts/objects/CardHolder.js":
/*!*******************************************!*\
  !*** ./src/scripts/objects/CardHolder.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ "./node_modules/phaser/dist/phaser.js");
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../globals.js */ "./src/scripts/globals.js");
/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_globals_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Card_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Card.js */ "./src/scripts/objects/Card.js");



class CardHolder extends phaser__WEBPACK_IMPORTED_MODULE_0__.GameObjects.Container {
  constructor(cardsAmount, scene, x, y) {
    super(scene, x, y);
    this.cards = [];
    const getCardPosition = (amount, padding = 0) => {
      padding /= 2;
      const CARD_WIDTH = _globals_js__WEBPACK_IMPORTED_MODULE_1__.BUTTON_WIDTH * 5 / 2,
        CARD_HEIGHT = _globals_js__WEBPACK_IMPORTED_MODULE_1__.BUTTON_WIDTH * 6 / 2;
      if (amount === 1) return [{
        x: 0,
        y: 0,
        scale: .75
      }];
      if (amount === 2) return [{
        x: 0 - CARD_WIDTH / 2 - padding * 3,
        y: 0,
        scale: .6
      }, {
        x: 0 + CARD_WIDTH / 2 + padding * 3,
        y: 0,
        scale: .6
      }];
      if (amount === 3) return [{
        x: 0 - CARD_WIDTH / 2 - padding,
        y: 0,
        scale: .5
      }, {
        x: 0 + CARD_WIDTH / 2 + padding,
        y: 0,
        scale: .5
      }, {
        x: 0,
        y: CARD_HEIGHT + padding,
        scale: .5
      }];
      if (amount === 4) return [{
        x: 0 - CARD_WIDTH / 2 - padding,
        y: 0,
        scale: .5
      }, {
        x: 0 + CARD_WIDTH / 2 + padding,
        y: 0,
        scale: .5
      }, {
        x: 0 - CARD_WIDTH / 2 - padding,
        y: 0 + CARD_HEIGHT + padding,
        scale: .5
      }, {
        x: 0 + CARD_WIDTH / 2 + padding,
        y: 0 + CARD_HEIGHT + padding,
        scale: .5
      }];
    };
    const layouts = getCardPosition(cardsAmount, 50);
    for (let i = 0; i < cardsAmount; i++) {
      const card = new _Card_js__WEBPACK_IMPORTED_MODULE_2__["default"](this.scene, layouts[i].x, layouts[i].y);
      card.setScale(layouts[i].scale);
      this.add(card);
      this.cards.push(card);
    }
    this.setScale(.6);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CardHolder);

/***/ }),

/***/ "./src/scripts/objects/CardTile.js":
/*!*****************************************!*\
  !*** ./src/scripts/objects/CardTile.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _buttons_Button_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buttons/Button.js */ "./src/scripts/objects/buttons/Button.js");
/* harmony import */ var _buttons_overlays_ImageOverlay_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buttons/overlays/ImageOverlay.js */ "./src/scripts/objects/buttons/overlays/ImageOverlay.js");
/* harmony import */ var _buttons_overlays_TextOverlay_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./buttons/overlays/TextOverlay.js */ "./src/scripts/objects/buttons/overlays/TextOverlay.js");



class CardTile extends _buttons_Button_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  static get BASE_SCORE() {
    return 50;
  }
  constructor(data) {
    super(Object.assign(data, {
      overlay: new _buttons_overlays_TextOverlay_js__WEBPACK_IMPORTED_MODULE_2__["default"](data.scene, data.number.toString(), {
        text: {
          fontSize: 80,
          fontStyle: "bold"
        }
      }),
      defaultButtonHoverEvents: true
    }));
    this.overlay.text.setStroke("#000", 6);
    this.card = data.card;
    this.number = data.number;
    this.completed = false;
    this.on("pointerup", () => {
      console.log(`Clicked on ${this.overlay.text.text}`);
      this.overlay.wobble(.65);
      const bingos = this.card.play(this.number);
      if (bingos > 0) this.scene.bingo();
    });
  }
  complete() {
    this.completed = true;
    this.scene.game.audio.effects.play("audio_button_03");
    this.removeAllListeners();
    this.overlay = new _buttons_overlays_ImageOverlay_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.scene, "star").setScale(.8);
    this.scene.score.tracker.score += CardTile.BASE_SCORE;
    // TODO: Play 'completed' animation on tile
    // TODO: Play 'completed' sound in "effects" channel
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CardTile);

/***/ }),

/***/ "./src/scripts/objects/Confetti.js":
/*!*****************************************!*\
  !*** ./src/scripts/objects/Confetti.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ "./node_modules/phaser/dist/phaser.js");
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);

class Animations extends phaser__WEBPACK_IMPORTED_MODULE_0__.GameObjects.Container {
  constructor(data) {
    super(data.scene, data.x, data.y);
    //ANIMATION
    /*this.anims.create({
    	key:"Confetti",
    	frames:
    	this.anims.generateFrameNames("confetti",
    		{
    			start: 0,
    			end: 59,
    			zeroPad:2,
    			prefix:"confetti_",
    			suffix:".png"
    		}),
    	frameRate:30,
    	repeat:0,
    	hideOnComplete: true,
    });
    this.confetti=this.add.sprite(this.width / 2,this.height / 2,"confetti");
    this.confetti.play("Confetti")*/
  }
  _createConfetti() {
    this.anims.create({
      key: "Confetti",
      frames: this.anims.generateFrameNames("confetti", {
        start: 0,
        end: 59,
        zeroPad: 2,
        prefix: "confetti_",
        suffix: ".png"
      }),
      frameRate: 30,
      repeat: 0,
      hideOnComplete: true
    });
    this.confetti = this.add.sprite(this.width / 2, this.height / 2, "confetti");
    this.confetti.play("Confetti");
  }
  makeAnim(key, frameName) {
    let myArray = [];
    for (var i = 0; i < 58; i++) {
      let fn = frameName + 1 + ".png";
      myArray.push({
        key: key,
        frame: fn
      });
    }
    return myArray;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Animations);

/***/ }),

/***/ "./src/scripts/objects/Leaderboard.js":
/*!********************************************!*\
  !*** ./src/scripts/objects/Leaderboard.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ "./node_modules/phaser/dist/phaser.js");
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _buttons_overlays_TextOverlay_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buttons/overlays/TextOverlay.js */ "./src/scripts/objects/buttons/overlays/TextOverlay.js");


class Leaderboard extends phaser__WEBPACK_IMPORTED_MODULE_0__.GameObjects.Container {
  constructor(data) {
    super(data.scene, data.x, data.y);
    this.scores = {};
    this.name = {};
    this.bg = new phaser__WEBPACK_IMPORTED_MODULE_0__.GameObjects.Image(this.scene, 0, 0, "panel_leaderboard");
    this.add(this.bg);
    this.overlay = new _buttons_overlays_TextOverlay_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.scene, this.score.toString());
    this.overlay.y -= 8;
    this.overlay.text.setOrigin(.05, .35);
    this.add(this.overlay);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Leaderboard);

/***/ }),

/***/ "./src/scripts/objects/Playerlist.js":
/*!*******************************************!*\
  !*** ./src/scripts/objects/Playerlist.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ "./node_modules/phaser/dist/phaser.js");
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var phaser3_rex_plugins_templates_ui_ui_components_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! phaser3-rex-plugins/templates/ui/ui-components.js */ "./node_modules/phaser3-rex-plugins/templates/ui/ui-components.js");
/* harmony import */ var phaser3_rex_plugins_plugins_roundrectangle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! phaser3-rex-plugins/plugins/roundrectangle.js */ "./node_modules/phaser3-rex-plugins/plugins/roundrectangle.js");



class PlayerlistItem extends phaser__WEBPACK_IMPORTED_MODULE_0__.GameObjects.Container {
  constructor(data = {}) {
    super(data.container.playerlist.scene, 0, 0);
    this.container = data.container;
    this.id = data.id;
    this.name = data.name;
    this.text = new phaser__WEBPACK_IMPORTED_MODULE_0__.GameObjects.Text(this.scene, 0, 0, this.name, {
      align: "left",
      fontSize: 32,
      fontStyle: "bold"
    });
    this.text.setStroke("#000", 5).setOrigin(.5);
    this.add(this.text);
    this.image = new phaser__WEBPACK_IMPORTED_MODULE_0__.GameObjects.Image(this.scene, -24, 0, data.texture);
    this.add(this.image);
  }
  destroy() {
    super.destroy();
    const index = this.container.findIndex(p => p.id === this.id);
    if (index === -1) return false;
    return this.container.splice(index, 1);
  }
}
class PlayerContainer extends Array {
  constructor(list) {
    super();
    this.playerlist = list;
  }
  add(player) {
    return new Promise((resolve, reject) => {
      console.log("PlayerContainer.add", player.id, this);
      if (player.provider === "discord") {
        this.playerlist.load.on("loaderror", file => {
          if (file.src === player.avatarURL) reject();
        });
        this.playerlist.load.on("filecomplete", key => {
          if (key !== `avatar_${player.id}`) return;
          const item = new PlayerlistItem({
            container: this,
            x: 0,
            y: 36 * this.length,
            id: player.id,
            name: player.tag,
            texture: key
          });
          this.push(item);
          this.playerlist.update();
          resolve(this.playerlist);
        });
        this.playerlist.load.image(`avatar_${player.id}`, player.avatarURL);
        return this.playerlist.load.start();
      } else {
        const item = new PlayerlistItem({
          container: this,
          x: 0,
          y: 36 * this.length,
          id: player.id,
          name: player.tag,
          texture: "avatar_guest"
        });
        this.push(item);
        this.playerlist.update();
        resolve(this.playerlist);
      }
    });
  }
}
class Playerlist extends phaser__WEBPACK_IMPORTED_MODULE_0__.GameObjects.Container {
  static preload(load) {
    load.setPath("assets/img/UI/");
    // load.image("avatar_guest", "avatar_guest.png");
  }
  update() {
    const sizer = this.panel.getElement("panel");
    sizer.clear(true);
    for (let i = 0; i < this.players.length; i++) {
      if (i !== 0) sizer.addNewLine();

      // rexUI bugs out on adding containers to its custom sizer
      // sizer.add(this.players[i]);
      sizer.add(this.players[i].text);
    }
    this.panel.layout();
  }
  constructor(data) {
    super(data.scene, data.x, data.y);
    this.panel = new phaser3_rex_plugins_templates_ui_ui_components_js__WEBPACK_IMPORTED_MODULE_1__.ScrollablePanel(this.scene, Object.assign({
      width: 250,
      height: 220,
      scrollMode: 0,
      panel: {
        child: new phaser3_rex_plugins_templates_ui_ui_components_js__WEBPACK_IMPORTED_MODULE_1__.FixWidthSizer(data.scene, {
          space: {
            left: 3,
            right: 3,
            top: 3,
            bottom: 3,
            item: 8,
            line: 8
          }
        }),
        mask: {
          padding: 1
        }
      },
      space: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
        panel: 10
      }
    }, data.panel));
    this.add(this.panel.layout());
    this.players = new PlayerContainer(this);
    this.scene.add.existing(this);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Playerlist);

/***/ }),

/***/ "./src/scripts/objects/Scene.js":
/*!**************************************!*\
  !*** ./src/scripts/objects/Scene.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ "./node_modules/phaser/dist/phaser.js");
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _scenes_Scene_Preload_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scenes/Scene_Preload.js */ "./src/scripts/scenes/Scene_Preload.js");


class Scene extends phaser__WEBPACK_IMPORTED_MODULE_0__.Scene {
  static preload(load) {
    // Wallpapers
    load.setPath("/assets/img/wallpapers/");
    _scenes_Scene_Preload_js__WEBPACK_IMPORTED_MODULE_1__["default"].importImageSeries(load, "bg_wallpaper_", 5, "jpg", 0, 2); // bg_wallpaper_00, ...

    // Buttons
    load.setPath("assets/img/buttons/");
    const buttons = ["back", "createLobby", "exit", "icon_resume", "leaderboard", "pause", "play", "resume", "settings", "main_menu", "create_lobby", "join_lobby", "start_game"];
    for (const asset of buttons) load.image(`button_${asset}`, `button_${asset}.png`);
  }
  get width() {
    return this.cameras.main.width;
  }
  get height() {
    return this.cameras.main.height;
  }
  constructor(config) {
    super(config);
    this.key = config.key;
    this.wallpaper = config.wallpaper;
  }
  _generateWallpaper() {
    if (this.wallpaper) {
      if (this.bg) this.bg.destroy();
      this.bg = new phaser__WEBPACK_IMPORTED_MODULE_0__.GameObjects.Image(this, this.width / 2, this.height / 2, typeof this.wallpaper === "boolean" ? `bg_wallpaper_0${Math.floor(Math.random() * 4)}` : this.wallpaper);
      // assuming wallpaper size : 1800 x 1200
      this.bg.setScale(0.7111);
      this.add.existing(this.bg);
    }
  }
  create() {
    this._generateWallpaper();
  }
  resume() {
    this._generateWallpaper();
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Scene);

/***/ }),

/***/ "./src/scripts/objects/SceneButton.js":
/*!********************************************!*\
  !*** ./src/scripts/objects/SceneButton.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _buttons_Button_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buttons/Button.js */ "./src/scripts/objects/buttons/Button.js");

class SceneButton extends _buttons_Button_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(targetScene, data) {
    if (!data.on) data.on = {};
    const cb = data.clickCallback,
      oldEvent = data.on.pointerup;
    data.on.pointerup = pointer => {
      // left mouse button
      if (pointer.button !== 0) return;
      let decision = true;
      if (typeof data.userDecision === "string") decision = window.confirm(data.userDecision.length ? data.userDecision : "Are you sure you want to go back to the previous scene?");
      if (!decision) return;
      if (cb && typeof cb === "function") cb.call(this, pointer);
      if (oldEvent && typeof oldEvent === "function") oldEvent.call(this, pointer);
      data.scene.scene.stop();
      data.scene.scene.start(targetScene, data.sceneData);
    };
    super(Object.assign({
      texture: "button_back"
    }, data));
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SceneButton);

/***/ }),

/***/ "./src/scripts/objects/ScoreBoard.js":
/*!*******************************************!*\
  !*** ./src/scripts/objects/ScoreBoard.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ "./node_modules/phaser/dist/phaser.js");
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);

class ScoreBoard extends phaser__WEBPACK_IMPORTED_MODULE_0__.GameObjects.Container {
  constructor(data) {
    super(data.scene, data.x, data.y);
    this.scores = {};
    this.bg = new phaser__WEBPACK_IMPORTED_MODULE_0__.GameObjects.Image(this.scene, 0, 0, "panel_scoreboard");
    this.add(this.bg);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ScoreBoard);

/***/ }),

/***/ "./src/scripts/objects/ScoreTracker.js":
/*!*********************************************!*\
  !*** ./src/scripts/objects/ScoreTracker.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ "./node_modules/phaser/dist/phaser.js");
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _buttons_overlays_TextOverlay_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buttons/overlays/TextOverlay.js */ "./src/scripts/objects/buttons/overlays/TextOverlay.js");


class ScoreTracker extends phaser__WEBPACK_IMPORTED_MODULE_0__.GameObjects.Container {
  get score() {
    return this._score;
  }
  set score(value) {
    this.scene.connection.match.send("match-score-scored", {
      score: value - this._score
    });
    this._score = Math.max(0, value);
    this.overlay.text.setText(this._score);
  }
  constructor(data) {
    super(data.scene, data.x, data.y);
    this._score = 0;
    this.bg = new phaser__WEBPACK_IMPORTED_MODULE_0__.GameObjects.Image(this.scene, 0, 0, "bg_score");
    this.add(this.bg);
    {
      this.overlay = new _buttons_overlays_TextOverlay_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.scene, this.score.toString());
      this.overlay.y -= 8;
      this.overlay.text.setOrigin(.05, .35);
      this.overlay.text.setStroke("#000", 4);
      this.add(this.overlay);
    }
  }
  valueof() {
    return this.score;
  }
  toString() {
    return this.score.toString();
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ScoreTracker);

/***/ }),

/***/ "./src/scripts/objects/buttons/Button.js":
/*!***********************************************!*\
  !*** ./src/scripts/objects/buttons/Button.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ "./node_modules/phaser/dist/phaser.js");
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _overlays_BaseOverlay_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./overlays/BaseOverlay.js */ "./src/scripts/objects/buttons/overlays/BaseOverlay.js");


class Button extends phaser__WEBPACK_IMPORTED_MODULE_0__.GameObjects.Container {
  static get DEFAULT_HANDLERS() {
    // functions here are bound to the Button they originate from
    return {
      pointerover: function () {
        this.bg.setTint(0XDDDDDD);
      },
      pointerout: function () {
        this.bg.clearTint();
      },
      pointerdown: function () {
        this.bg.setTint(0X777777);
      },
      pointerup: function () {
        this.bg.setTint(0XDDDDDD);
        this.scene.game.audio.effects.play("audio_button_01");
      }
    };
  }
  get overlay() {
    return this._overlay;
  }
  set overlay(value) {
    if (!(value instanceof _overlays_BaseOverlay_js__WEBPACK_IMPORTED_MODULE_1__["default"])) return console.error(new TypeError("Overlay must be a child of BaseOverlay")); // eslint-disable-line

    if (this._overlay != null) this.remove(this._overlay, true);
    this._overlay = value;
    this.add(this._overlay);
    if (this._overlay.image) this._overlay.image.setDisplaySize(this.bg.width * .9, this.bg.height * .9);
  }

  /**
   * @class A default button for anything clickable
   * @param {object} data
   * @param {Phaser.Scene} data.scene
   * @param {number} [data.x] The x coordinate in the scene
   * @param {number} [data.y] The y coordinate in the scene
   * @param {string} data.texture The texture name of the button background
   * @param {object} [data.overlay]
   * @param {ImageOverlay} [data.overlay.image] An Image Overlay, displayed as a separate element on top of the button
   * @param {TextOverlay} [data.overlay.text] A Text Overlay, displayed as a separate element on top of the button
   * @param {object} [data.on]
   * @param {function} [data.on.[event]] Optional event handlers that the Phaser Container listens to
   * @param {bool} [data.defaultButtonHoverEvents] Creates default button event handlers for hovers
   * @param {bool} [data.defaultButtonClickEvents] Creates default button event handlers for clicks
   */
  constructor(data) {
    super(data.scene, data.x, data.y);
    this.scene.add.existing(this);
    this.bg = new phaser__WEBPACK_IMPORTED_MODULE_0__.GameObjects.Image(this.scene, 0, 0, data.texture);
    this.add(this.bg);
    if (data.overlay) this.overlay = data.overlay;
    if (data.on || data.defaultButtonEvents || data.defaultButtonHoverEvents || data.defaultButtonClickEvents) this.setSize(this.bg.width, this.bg.height).setInteractive();

    // register defined event handlers
    for (const [name, handler] of Object.entries(data.on || {})) {
      if (typeof handler === "function") this.on(name, handler);
    }
    const enableHoverEvents = () => {
        this.on("pointerover", Button.DEFAULT_HANDLERS.pointerover);
        this.on("pointerout", Button.DEFAULT_HANDLERS.pointerout);
      },
      enableClickEvents = () => {
        this.on("pointerup", Button.DEFAULT_HANDLERS.pointerup);
        this.on("pointerdown", Button.DEFAULT_HANDLERS.pointerdown);
      },
      enableEvents = () => {
        enableHoverEvents();
        enableClickEvents();
      };
    if (!data.defaultButtonEvents) {
      if (data.defaultButtonHoverEvents) enableHoverEvents();
      if (data.defaultButtonClickEvents) enableClickEvents();
    } else enableEvents();
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Button);

/***/ }),

/***/ "./src/scripts/objects/buttons/overlays/BaseOverlay.js":
/*!*************************************************************!*\
  !*** ./src/scripts/objects/buttons/overlays/BaseOverlay.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ "./node_modules/phaser/dist/phaser.js");
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);

class BaseOverlay extends phaser__WEBPACK_IMPORTED_MODULE_0__.GameObjects.Container {
  constructor(data) {
    if (new.target === BaseOverlay) throw new TypeError("Cannot construct BaseOverlay instances directly");
    super(data.scene, data.x, data.y);
    this.text = null;
    this.image = null;
    this.wobbling = null;
  }
  wobble(duration = 1, loop = 1) {
    if (this.wobbling != null) return console.warn("Cannot wobble while wobbling is active");
    duration = duration / 2 * 1000;
    this.wobbling = this.scene.tweens.add({
      targets: this,
      scale: 1.5,
      ease: phaser__WEBPACK_IMPORTED_MODULE_0__.Math.Easing.Sine.InOut,
      yoyo: true,
      loop,
      duration,
      onComplete: () => {
        this.wobbling = null;
      }
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BaseOverlay);

/***/ }),

/***/ "./src/scripts/objects/buttons/overlays/ImageOverlay.js":
/*!**************************************************************!*\
  !*** ./src/scripts/objects/buttons/overlays/ImageOverlay.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ "./node_modules/phaser/dist/phaser.js");
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BaseOverlay_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseOverlay.js */ "./src/scripts/objects/buttons/overlays/BaseOverlay.js");


class ImageOverlay extends _BaseOverlay_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(scene, texture, data = {
    image: {}
  }) {
    super(Object.assign({
      scene
    }, data));
    this.image = new phaser__WEBPACK_IMPORTED_MODULE_0__.GameObjects.Image(this.scene, 0, 0, texture);
    this.add(this.image);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ImageOverlay);

/***/ }),

/***/ "./src/scripts/objects/buttons/overlays/TextOverlay.js":
/*!*************************************************************!*\
  !*** ./src/scripts/objects/buttons/overlays/TextOverlay.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ "./node_modules/phaser/dist/phaser.js");
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BaseOverlay_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseOverlay.js */ "./src/scripts/objects/buttons/overlays/BaseOverlay.js");


class TextOverlay extends _BaseOverlay_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(scene, text, data = {
    text: {}
  }) {
    super(Object.assign({
      scene
    }, data));
    this.text = new phaser__WEBPACK_IMPORTED_MODULE_0__.GameObjects.Text(this.scene, 0, 0, text, Object.assign({
      align: "center",
      fontSize: 64
    }, data.text)).setOrigin(.5, .5).setResolution(1);
    this.add(this.text);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TextOverlay);

/***/ }),

/***/ "./src/scripts/objects/objects.js":
/*!****************************************!*\
  !*** ./src/scripts/objects/objects.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ball: () => (/* reexport safe */ _Ball_js__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   BallQueue: () => (/* reexport safe */ _BallQueue_js__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   Button: () => (/* reexport safe */ _buttons_Button_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   Card: () => (/* reexport safe */ _Card_js__WEBPACK_IMPORTED_MODULE_8__["default"]),
/* harmony export */   CardHolder: () => (/* reexport safe */ _CardHolder_js__WEBPACK_IMPORTED_MODULE_9__["default"]),
/* harmony export */   Confetti: () => (/* reexport safe */ _Confetti_js__WEBPACK_IMPORTED_MODULE_14__["default"]),
/* harmony export */   Dropdown: () => (/* reexport safe */ _settings_variations_Dropdown_js__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   ImageOverlay: () => (/* reexport safe */ _buttons_overlays_ImageOverlay_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   Leaderboard: () => (/* reexport safe */ _Leaderboard_js__WEBPACK_IMPORTED_MODULE_13__["default"]),
/* harmony export */   Playerlist: () => (/* reexport safe */ _Playerlist_js__WEBPACK_IMPORTED_MODULE_15__["default"]),
/* harmony export */   Scene: () => (/* reexport safe */ _Scene_js__WEBPACK_IMPORTED_MODULE_10__["default"]),
/* harmony export */   ScoreBoard: () => (/* reexport safe */ _ScoreBoard_js__WEBPACK_IMPORTED_MODULE_11__["default"]),
/* harmony export */   ScoreTracker: () => (/* reexport safe */ _ScoreTracker_js__WEBPACK_IMPORTED_MODULE_12__["default"]),
/* harmony export */   Setting: () => (/* reexport safe */ _settings_Setting_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   Slider: () => (/* reexport safe */ _settings_variations_Slider_js__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   TextOverlay: () => (/* reexport safe */ _buttons_overlays_TextOverlay_js__WEBPACK_IMPORTED_MODULE_2__["default"])
/* harmony export */ });
/* harmony import */ var _buttons_Button_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buttons/Button.js */ "./src/scripts/objects/buttons/Button.js");
/* harmony import */ var _buttons_overlays_ImageOverlay_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buttons/overlays/ImageOverlay.js */ "./src/scripts/objects/buttons/overlays/ImageOverlay.js");
/* harmony import */ var _buttons_overlays_TextOverlay_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./buttons/overlays/TextOverlay.js */ "./src/scripts/objects/buttons/overlays/TextOverlay.js");
/* harmony import */ var _settings_Setting_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./settings/Setting.js */ "./src/scripts/objects/settings/Setting.js");
/* harmony import */ var _settings_variations_Dropdown_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./settings/variations/Dropdown.js */ "./src/scripts/objects/settings/variations/Dropdown.js");
/* harmony import */ var _settings_variations_Slider_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./settings/variations/Slider.js */ "./src/scripts/objects/settings/variations/Slider.js");
/* harmony import */ var _Ball_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Ball.js */ "./src/scripts/objects/Ball.js");
/* harmony import */ var _BallQueue_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./BallQueue.js */ "./src/scripts/objects/BallQueue.js");
/* harmony import */ var _Card_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Card.js */ "./src/scripts/objects/Card.js");
/* harmony import */ var _CardHolder_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./CardHolder.js */ "./src/scripts/objects/CardHolder.js");
/* harmony import */ var _Scene_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Scene.js */ "./src/scripts/objects/Scene.js");
/* harmony import */ var _ScoreBoard_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./ScoreBoard.js */ "./src/scripts/objects/ScoreBoard.js");
/* harmony import */ var _ScoreTracker_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./ScoreTracker.js */ "./src/scripts/objects/ScoreTracker.js");
/* harmony import */ var _Leaderboard_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Leaderboard.js */ "./src/scripts/objects/Leaderboard.js");
/* harmony import */ var _Confetti_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Confetti.js */ "./src/scripts/objects/Confetti.js");
/* harmony import */ var _Playerlist_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Playerlist.js */ "./src/scripts/objects/Playerlist.js");


















/***/ }),

/***/ "./src/scripts/objects/settings/Setting.js":
/*!*************************************************!*\
  !*** ./src/scripts/objects/settings/Setting.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ "./node_modules/phaser/dist/phaser.js");
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);

class Setting extends phaser__WEBPACK_IMPORTED_MODULE_0__.GameObjects.Container {
  get value() {
    const settings = this.scene.game.settings;
    return this.subKey ? settings.get(this.key)[this.subKey] : settings.get(this.key);
  }
  set value(x) {
    const settings = this.scene.game.settings;
    if (this.subKey) {
      const val = settings.get(this.key);
      val[this.subKey] = x;
      settings.set(this.key, val);
    } else settings.set(this.key, x);
  }
  constructor(data) {
    super(data.scene, data.x, data.y);
    this.key = data.key.split(".")[0];
    this.subKey = data.subKey || data.key.split(".")[1] || null;
    this.element = null;
    this.valueText = null;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Setting);

/***/ }),

/***/ "./src/scripts/objects/settings/variations/Dropdown.js":
/*!*************************************************************!*\
  !*** ./src/scripts/objects/settings/variations/Dropdown.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ "./node_modules/phaser/dist/phaser.js");
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var phaser3_rex_plugins_templates_ui_ui_components_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! phaser3-rex-plugins/templates/ui/ui-components.js */ "./node_modules/phaser3-rex-plugins/templates/ui/ui-components.js");
/* harmony import */ var _Setting_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Setting.js */ "./src/scripts/objects/settings/Setting.js");
/* harmony import */ var _buttons_Button_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../buttons/Button.js */ "./src/scripts/objects/buttons/Button.js");




class Dropdown extends _Setting_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  static preload(load) {
    load.setPath("assets/img/UI/dropdown/");
    load.image("dropdown_arrow", "arrow.png");
    load.image("dropdown_arrow_white", "arrow_white.png");
    load.image("dropdown_main", "main.png");
    load.image("dropdown_main_hover", "main_hover.png");
    load.image("dropdown_item", "item.png");
    load.image("dropdown_item_hover", "item_hover.png");
    load.image("dropdown_item_last", "item_last.png");
    load.image("dropdown_item_last_hover", "item_last_hover.png");
  }
  get value() {
    return super.value;
  }
  set value(x) {
    super.value = x;
    if (this.valueText) this.valueText.text = x;
  }
  get expanded() {
    return !!this.menu;
  }
  _composeButtonContainer() {
    // instantiate button to get the image dimensions - for positioning the arrow correctly
    let button = new phaser__WEBPACK_IMPORTED_MODULE_0__.GameObjects.Image(this.scene, 0, 0, "dropdown_main"),
      arrow = new phaser__WEBPACK_IMPORTED_MODULE_0__.GameObjects.Image(this.scene, button.displayWidth * .36, 0, "dropdown_arrow");
    const self = this;
    button = new _buttons_Button_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
      scene: this.scene,
      x: 0,
      y: 0,
      texture: "dropdown_main",
      on: {
        pointerover: function () {
          this.bg.setTexture("dropdown_main_hover");
          arrow.setRotation(Math.PI); // Phaser uses rAdIANS FOR SOME REASON
        },
        pointerout: function () {
          this.bg.setTexture("dropdown_main");
          arrow.setRotation(self.expanded ? Math.PI : 0);
        },
        pointerdown: () => {
          if (!this.expanded) this.menu = this._composeMenu();else {
            this.menu.collapse();
            this.menu = null;
          }
        }
      }
    });
    button.add(arrow).setScale(.75).setDepth(100);
    return button;
  }
  _composeMenu() {
    const menu = new phaser3_rex_plugins_templates_ui_ui_components_js__WEBPACK_IMPORTED_MODULE_1__.Menu(this.scene, {
      items: this.choices,
      x: this.x - this.element.displayWidth * .25,
      y: this.y + this.element.displayHeight * .335,
      createButtonCallback: (item, i) => {
        return this.scene.rexUI.add.label({
          background: this.scene.add.image(0, 0, i !== this.choices.length - 1 ? "dropdown_item" : "dropdown_item_last"),
          text: this.scene.add.text(0, 0, item.name, {
            fontFamily: "Arial",
            fontSize: 25
          }).setScale(.75),
          icon: this.scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, item.name === this.value ? 0x85C1E9 : 0xFFFFFF),
          space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,
            icon: 10
          }
        }).setScale(1.5).setDepth(50);
      },
      easeIn: {
        duration: 500,
        orientation: "y"
      },
      easeOut: {
        duration: 100,
        orientation: "y"
      }
    });
    menu.on("button.click", button => {
      this.value = button.text;
      this.menu.collapse();
      this.menu = null;
    }).on("button.over", button => {
      button.children.find(x => x instanceof phaser__WEBPACK_IMPORTED_MODULE_0__.GameObjects.Image).setTexture(this.choices.findIndex(x => x.name === button.text) !== this.choices.length - 1 ? "dropdown_item_hover" : "dropdown_item_last_hover");
    }).on("button.out", button => {
      button.children.find(x => x instanceof phaser__WEBPACK_IMPORTED_MODULE_0__.GameObjects.Image).setTexture(this.choices.findIndex(x => x.name === button.text) !== this.choices.length - 1 ? "dropdown_item" : "dropdown_item_last");
    });
    return menu;
  }
  constructor(data) {
    super(data);
    this.choices = data.choices;

    // main idle button
    this.element = this._composeButtonContainer();
    this.add(this.element);
    this.menu = null;
    let touchCount = 0;
    this.scene.input.on("pointerdown", pointer => {
      if (!this.expanded) return touchCount = 0;
      if (!this.menu.isInTouching(pointer) && ++touchCount % 2 === 0) {
        this.menu.collapse();
        this.menu = null;
      }
    }, this.scene);
    this.valueText = this.scene.add.text(-this.element.displayWidth * .1, -this.element.displayHeight * .075, this.value, {
      fontFamily: "Arial",
      align: "right",
      fontSize: 28,
      fill: "#ffffff"
    });
    this.valueText.setOrigin(.5);
    this.add(this.valueText);
    if (data.title) {
      this.title = this.scene.add.text(-this.element.displayWidth * 1.1, 0, data.title, {
        fontFamily: "Arial",
        align: "left",
        fontSize: 28,
        fill: "#ffffff"
      });
      this.title.setOrigin(.5);
      this.add(this.title);
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dropdown);

/***/ }),

/***/ "./src/scripts/objects/settings/variations/Slider.js":
/*!***********************************************************!*\
  !*** ./src/scripts/objects/settings/variations/Slider.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var phaser3_rex_plugins_templates_ui_ui_components_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser3-rex-plugins/templates/ui/ui-components.js */ "./node_modules/phaser3-rex-plugins/templates/ui/ui-components.js");
/* harmony import */ var _Setting_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Setting.js */ "./src/scripts/objects/settings/Setting.js");


class Slider extends _Setting_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  static preload(load) {
    load.setPath("assets/img/buttons/");
    load.image("slider_knob", "slider.png");
  }
  get value() {
    return super.value;
  }
  set value(x) {
    super.value = x;
    if (this.valueText) this.valueText.text = `${(this.value * 100).toFixed()}%`;
  }
  constructor(data) {
    super(data);
    const config = Object.assign({
      x: data.x,
      y: data.y,
      width: this.width * .4,
      // length
      height: 20,
      // thiccness

      value: this.value,
      // active value
      valuechangeCallback: val =>
      // on change
      {
        this.value = val;
      },
      orientation: "x",
      // "x" or "y" - down or sideways
      input: "drag",
      // "drag" or "click",

      track: this.scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0xFDFEFE),
      // background bar
      indicator: this.scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0x85C1E9),
      // background active bar
      thumb: this.scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0x1A5276) // slider button
    }, data.element);

    // override event when supplied in data to both execute default & custom handlers
    if (data.valuechangeCallback) {
      config.valuechangeCallback = val => {
        this.value = val;
        data.valuechangeCallback(val);
      };
    }
    this.element = new phaser3_rex_plugins_templates_ui_ui_components_js__WEBPACK_IMPORTED_MODULE_0__.Slider(this.scene, config);
    this.element.layout();
    if (data.title) {
      this.title = this.scene.add.text(-data.element.width * .45, -data.element.height * 1.5, data.title, {
        fontFamily: "Arial",
        align: "left",
        fontSize: 28,
        fill: "#ffffff"
      });
      this.title.setOrigin(0, .5);
      this.add(this.title);
    }
    this.valueText = this.scene.add.text(data.element.width * .45, -data.element.height * 1.5, `${(this.value * 100).toFixed()}%`, {
      fontFamily: "Arial",
      align: "right",
      fontSize: 28,
      fill: "#ffffff"
    });
    this.valueText.setOrigin(1, .5);
    this.add(this.valueText);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Slider);

/***/ }),

/***/ "./src/scripts/objects/settings/variations/VolumeSlider.js":
/*!*****************************************************************!*\
  !*** ./src/scripts/objects/settings/variations/VolumeSlider.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Slider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Slider.js */ "./src/scripts/objects/settings/variations/Slider.js");

class VolumeSlider extends _Slider_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(data) {
    super(Object.assign({
      valuechangeCallback: val => {
        const channel = data.key.split(".")[1];
        data.scene.game.audio[channel].setVolume(val);
      }
    }, data));
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VolumeSlider);

/***/ }),

/***/ "./src/scripts/scenes/Scene_Match.js":
/*!*******************************************!*\
  !*** ./src/scripts/scenes/Scene_Match.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _objects_Scene_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../objects/Scene.js */ "./src/scripts/objects/Scene.js");
/* harmony import */ var _objects_CardHolder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../objects/CardHolder.js */ "./src/scripts/objects/CardHolder.js");
/* harmony import */ var _objects_ScoreTracker_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../objects/ScoreTracker.js */ "./src/scripts/objects/ScoreTracker.js");
/* harmony import */ var _objects_ScoreBoard_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../objects/ScoreBoard.js */ "./src/scripts/objects/ScoreBoard.js");
/* harmony import */ var _objects_BallQueue_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../objects/BallQueue.js */ "./src/scripts/objects/BallQueue.js");
/* harmony import */ var _objects_SceneButton_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../objects/SceneButton.js */ "./src/scripts/objects/SceneButton.js");






class Scene_Match extends _objects_Scene_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super({
      key: "Scene_Match",
      wallpaper: true
    });
    this.waitingText = null;
    this.connection = null;
    this.cards = 2;
    this.interval = 7.5;
    this.match = null;
    this.cardHolder = null;
    this.queue = null;
    this.score = {
      tracker: null,
      board: null,
      players: {}
    };
  }
  _createConfetti() {
    this.anims.create({
      key: "Confetti",
      frames: this.anims.generateFrameNames("confetti", {
        start: 0,
        end: 59,
        zeroPad: 2,
        prefix: "confetti_",
        suffix: ".png"
      }),
      frameRate: 30,
      repeat: 0,
      hideOnComplete: true
    });
    this.confetti = this.add.sprite(this.width / 2, this.height / 1, "confetti");
    this.confetti.play("Confetti");
    this.game.audio.effects.play("audio_effects_cheering", {
      volume: .25
    });
  }
  _createCards(layout = 2) {
    this.cardHolder = new _objects_CardHolder_js__WEBPACK_IMPORTED_MODULE_1__["default"](layout, this, this.width * .5, this.height * (layout < 3 ? .25 : .12));
    this.add.existing(this.cardHolder);
  }
  _createScoreTracker() {
    this.score.tracker = new _objects_ScoreTracker_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
      scene: this,
      x: this.width * .88,
      y: this.height * .1
    });
    this.score.tracker.setScale(.65);
    this.add.existing(this.score.tracker);
  }
  _createScoreBoard() {
    /* Scoreboard Panel */
    this.add.image(this.game.renderer.width / 1.14, this.game.renderer.height / 2.1, "panel_scores").setScale(.8);
    this.score.board = this.rexUI.add.scrollablePanel({
      x: this.width * .85,
      y: this.height * .5,
      width: this.width * .2,
      height: this.height * .4,
      scrollMode: 0,
      panel: {
        child: this.rexUI.add.fixWidthSizer({
          align: "right",
          anchor: "center",
          space: {
            left: 5,
            right: 5,
            top: 3,
            bottom: 3,
            item: 8,
            line: 8
          }
        }),
        mask: {
          padding: 1
        }
      },
      space: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
        panel: 10
      }
    }).layout();
    this.updateScores();
  }
  /*
  _createBallCounter()
  {
  	// Ball Counter Panel
  	this.add.image(this.game.renderer.width / 21, this.game.renderer.height / 10, "panel_ball_count")
  		.setScale(0.4);
  	// Ball Counter Text
  	this.add.text({
  		x: this.width / 21,
  		y: this.height / 10,
  		text: "Ball Counter",
  		style: {
  			font: "18px monospace",
  			fill: "#FFFFFF",
  			align: "center"
  		}
  	}).setOrigin(.5);
  }
  */
  _createBallQueue() {
    this.queue = new _objects_BallQueue_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
      scene: this,
      x: this.width * .15,
      y: this.height * .5
    });
    this.queue.setScale(.6);
    this.add.existing(this.queue);
  }
  create(data = {}) {
    super.create(data);
    this.connection = this.game.connection;
    this.connection.matchScene = this;
    this.cards = data.cards;
    this.interval = data.interval;
    this.match = data.match;
    this.score.players = new Map();
    for (const player of this.connection.players.values()) this.score.players.set(player.id, 0);

    // [Button] Exit Match
    this.add.existing(new _objects_SceneButton_js__WEBPACK_IMPORTED_MODULE_5__["default"](null, {
      scene: this,
      x: this.width / 1.12,
      y: this.height / 1.1,
      userDecision: "Are you sure you want to leave the match and return to the menu?",
      defaultButtonEvents: true,
      texture: "button_exit",
      clickCallback: () => {
        this.connection.leaveMatch();
      }
    }).setScale(.5));

    //this._createBallCounter();
    this._createCards(this.cards);
    this._createScoreTracker();
    this._createScoreBoard(this.connection.players);
    this._createBallQueue();
    this.cardHolder.visible = false;
    this.score.tracker.visible = false;
    this.score.board.visible = false;
    this.queue.visible = false;
    (this.waitingText = this.add.text({
      x: this.width * .5,
      y: this.height * .5,
      text: "Waiting for Players...",
      style: {
        fontSize: 42,
        fill: "#FFFFFF",
        align: "center"
      }
    })).setOrigin(.5).setStroke("#fff", 6);
    this.connection.match.onMessage("match-score-update", msg => {
      this.score.players.set(msg.id, msg.score);
      this.updateScores();
    });
    this.connection.match.send("match-ready");
  }
  playBall(ball) {
    this.queue.push(this.queue.createBall(ball.column, ball.number));
    const voicepack = this.game.announcer,
      variation = voicepack[ball.column].get(ball.number).random();
    this.game.audio.voice.play(variation);
  }
  bingo() {
    this.score.tracker.score += 500;
    const voicepack = this.game.announcer;
    this.game.audio.voice.play(voicepack.BINGO.random());
    this._createConfetti();
  }
  updateScores() {
    const sizer = this.score.board.getElement("panel");
    sizer.clear(true);
    for (const [id, score] of this.score.players.entries()) {
      const item = this.add.text(0, 0, `${this.connection.players.get(id).tag}: ${score}`, {
        x: this.width / 1.6,
        y: this.height / 5,
        align: "right",
        fontSize: 18,
        fontStyle: "bold"
      });
      item.setOrigin(.5).setStroke("#000", 5).setDepth(100);
      sizer.add(item);
    }
    this.score.board.layout();
    return this.score.board;
  }
  start() {
    this.waitingText.destroy();
    this.cardHolder.visible = true;
    this.score.tracker.visible = true;
    this.score.board.visible = true;
    this.queue.visible = true;
  }
  end() {
    this.time.delayedCall(5000, () => {
      /* End Panel */
      this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "panel_end");
      this.add.existing(new _objects_SceneButton_js__WEBPACK_IMPORTED_MODULE_5__["default"]("Scene_Menu_Main", {
        scene: this,
        x: this.width * .5,
        y: this.height * .9,
        defaultButtonEvents: true,
        texture: "button_main_menu"
      }).setScale(.5));
      this.make.text({
        x: this.width / 2.4,
        y: this.height / 3.2,
        text: "Name",
        style: {
          font: "30px monospace",
          fill: "#FFFFFF",
          align: "center"
        }
      }).setOrigin(.5);
      this.make.text({
        x: this.width / 1.7,
        y: this.height / 3.2,
        text: "Score",
        style: {
          font: "30px monospace",
          fill: "#FFFFFF",
          align: "center"
        }
      }).setOrigin(.5);
      this.cardHolder.destroy();
      this.score.tracker.destroy();
      this.queue.destroy();
      this.score.board.x = this.width * .5;
      this.score.board.y = this.height * .6;
      this.updateScores();

      // ANIMATION
      this._createConfetti();
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Scene_Match);

/***/ }),

/***/ "./src/scripts/scenes/Scene_Menu_Credits.js":
/*!**************************************************!*\
  !*** ./src/scripts/scenes/Scene_Menu_Credits.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ "./node_modules/phaser/dist/phaser.js");
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _objects_Scene_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../objects/Scene.js */ "./src/scripts/objects/Scene.js");


class Scene_Menu_Credits extends _objects_Scene_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor() {
    super({
      key: "Scene_Menu_Credits",
      wallpaper: true
    });
  }
  create(data = {}) {
    super.create(data);
  }
  update() {}
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Scene_Menu_Credits);

/***/ }),

/***/ "./src/scripts/scenes/Scene_Menu_Leaderboard.js":
/*!******************************************************!*\
  !*** ./src/scripts/scenes/Scene_Menu_Leaderboard.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _objects_Scene_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../objects/Scene.js */ "./src/scripts/objects/Scene.js");
/* harmony import */ var _objects_SceneButton_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../objects/SceneButton.js */ "./src/scripts/objects/SceneButton.js");


class Scene_Menu_Leaderboard extends _objects_Scene_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super({
      key: "Scene_Menu_Leaderboard",
      wallpaper: true
    });
    this.connection = null;
    this.anims = null;
    this.scores = [];
  }
  create(data = {}) {
    super.create(data);
    this.connection = this.game.connection;

    /* Settings Panel */
    this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.50, "panel_leaderboard").setScale(1.3);
    this.make.text({
      x: this.width / 2.8,
      y: this.height / 4,
      text: "Name",
      style: {
        font: "30px monospace",
        fill: "#FFFFFF",
        align: "center"
      }
    }).setOrigin(.5);
    this.make.text({
      x: this.width / 1.6,
      y: this.height / 4,
      text: "Score",
      style: {
        font: "30px monospace",
        fill: "#FFFFFF",
        align: "center"
      }
    }).setOrigin(.5);

    /* Back Button */
    this.add.existing(new _objects_SceneButton_js__WEBPACK_IMPORTED_MODULE_1__["default"]("Scene_Menu_Main", {
      scene: this,
      x: this.width * .1,
      y: this.height * .075,
      defaultButtonEvents: true
    }).setScale(.5));

    //Panel
    const scrollablePanel = this.rexUI.add.scrollablePanel({
      x: this.width / 2,
      y: this.height / 1.65,
      width: this.width * .45,
      height: this.height * .6,
      scrollMode: 0,
      background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, 0x222d2e),
      //0x222d2e

      panel: {
        child: this.rexUI.add.fixWidthSizer({
          align: "center",
          anchor: "center",
          space: {
            left: 3,
            right: 3,
            top: 3,
            bottom: 4,
            item: 8,
            line: 8
          }
        }),
        mask: {
          padding: 1
        }
      },
      space: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
        panel: 10
      }
    }).layout();
    var updatePanel = () => {
      const sizer = scrollablePanel.getElement("panel");
      sizer.clear(true);
      for (const score of this.scores) {
        const item = this.add.text(0, 0, `${score.tag}: ${score.xp}`, {
          align: "center",
          fontSize: 32,
          fontStyle: "bold"
        });
        item.setOrigin(.5).setStroke("#000", 5);
        sizer.add(item);
      }
      scrollablePanel.layout();
      return scrollablePanel;
    };
    if (!this.connection || this.connection && !this.connection.match) return;
    this.connection.match.send("leaderboard-fetch-100");
    this.connection.match.onMessage("leaderboard-100", msg => {
      this.scores = msg.scores;
      updatePanel();
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Scene_Menu_Leaderboard);

/***/ }),

/***/ "./src/scripts/scenes/Scene_Menu_Lobbies.js":
/*!**************************************************!*\
  !*** ./src/scripts/scenes/Scene_Menu_Lobbies.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _objects_Scene_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../objects/Scene.js */ "./src/scripts/objects/Scene.js");
/* harmony import */ var _objects_SceneButton_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../objects/SceneButton.js */ "./src/scripts/objects/SceneButton.js");


class Scene_Menu_Lobbies extends _objects_Scene_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super({
      key: "Scene_Menu_Lobbies",
      wallpaper: true
    });
    this.connection = null;
    this.players = [];
    this.buttons = {
      join_lobby: null,
      create_lobby: null
    };
  }
  create(data = {}) {
    super.create(data);
    this.connection = this.game.connection;

    // [Button] Back
    this.add.existing(new _objects_SceneButton_js__WEBPACK_IMPORTED_MODULE_1__["default"]("Scene_Menu_Main", {
      scene: this,
      x: this.width * .1,
      y: this.height * .075,
      defaultButtonEvents: true
    }).setScale(.5));

    /* Lobbies Panel */
    this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.40, "panel_lobbies").setScale(1);

    // Lobby
    this.add.text({
      x: this.width / 2.7,
      y: this.height / 5,
      text: "Lobby",
      style: {
        font: "25px monospace",
        fill: "#FFFFFF",
        align: "center"
      }
    }).setOrigin(.5);

    // Players
    this.add.text({
      x: this.width / 2,
      y: this.height / 5,
      text: "Players",
      style: {
        font: "25px monospace",
        fill: "#FFFFFF",
        align: "center"
      }
    }).setOrigin(.5);

    // Status
    this.add.text({
      x: this.width / 1.6,
      y: this.height / 5,
      text: "Status",
      style: {
        font: "25px monospace",
        fill: "#FFFFFF",
        align: "center"
      }
    }).setOrigin(.5);

    // Scrollable Panel
    const scrollablePanel = this.rexUI.add.scrollablePanel({
      x: this.width / 2,
      y: this.height / 2.1,
      width: this.width * .33,
      height: this.height * .48,
      scrollMode: 0,
      background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, 0x222d2e),
      panel: {
        child: this.rexUI.add.fixWidthSizer({
          align: "center",
          anchor: "center",
          space: {
            left: 3,
            right: 3,
            top: 3,
            bottom: 3,
            item: 8,
            line: 8
          }
        }),
        mask: {
          padding: 1
        }
      },
      space: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
        panel: 10
      }
    }).layout();
    var updatePanel = () => {
      const sizer = scrollablePanel.getElement("panel");
      sizer.clear(true);
      for (var i = 0; i < this.players.length; i++) {
        const item = this.add.text(0, 0, this.players[i], {
          align: "center",
          fontSize: 32,
          fontStyle: "bold"
        });
        item.setOrigin(.5).setStroke("#000", 5);
        sizer.add(item);
      }
      scrollablePanel.layout();
      return scrollablePanel;
    };

    // [Button] Join Lobby
    this.add.existing(new _objects_SceneButton_js__WEBPACK_IMPORTED_MODULE_1__["default"]("Scene_Menu_Lobby", {
      scene: this,
      x: this.width * .4,
      y: this.height * .8,
      defaultButtonEvents: true,
      texture: "button_join_lobby"
    }).setScale(.5));

    // [Button] Create Lobby
    this.add.existing(new _objects_SceneButton_js__WEBPACK_IMPORTED_MODULE_1__["default"]("Scene_Menu_Lobby", {
      scene: this,
      x: this.width * .6,
      y: this.height * .8,
      defaultButtonEvents: true,
      texture: "button_create_lobby"
    }).setScale(.5));
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Scene_Menu_Lobbies);

/***/ }),

/***/ "./src/scripts/scenes/Scene_Menu_Lobby.js":
/*!************************************************!*\
  !*** ./src/scripts/scenes/Scene_Menu_Lobby.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _objects_Scene_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../objects/Scene.js */ "./src/scripts/objects/Scene.js");
/* harmony import */ var _objects_SceneButton_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../objects/SceneButton.js */ "./src/scripts/objects/SceneButton.js");
/* harmony import */ var _objects_buttons_Button_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../objects/buttons/Button.js */ "./src/scripts/objects/buttons/Button.js");



class Scene_Menu_Lobby extends _objects_Scene_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super({
      key: "Scene_Menu_Lobby",
      wallpaper: true
    });
    this.connection = null;
    this.settings = {
      cards: null,
      interval: null
    };
  }
  _createSettings() {
    const X_CARDS = this.width * .4,
      Y_CARDS = this.height * .4;
    this.add.text(X_CARDS, Y_CARDS - this.height * .05, "Cards", {
      fontSize: 28,
      fontStyle: "bold",
      align: "center"
    }).setOrigin(.5);
    this.settings.cards = this.add.text(X_CARDS, Y_CARDS, "2", {
      fontSize: 32,
      align: "center"
    });
    this.settings.cards.setStroke("#000", 4).setOrigin(.5);
    const X_INTERVAL = this.width * .4,
      Y_INTERVAL = this.height * .6;
    this.add.text(X_INTERVAL, Y_INTERVAL - this.height * .05, "Ball Interval", {
      fontSize: 28,
      fontStyle: "bold",
      align: "center"
    }).setOrigin(.5);
    this.settings.interval = this.add.text(X_INTERVAL, Y_INTERVAL, "7.5", {
      fontSize: 32,
      align: "center"
    });
    this.settings.interval.setStroke("#000", 4).setOrigin(.5);
  }
  create(data = {}) {
    super.create(data);
    this.connection = this.game.connection;

    /* Lobbies Panel Background */
    this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.40, "panel_customLobby_split03").setScale(1);

    // [Button] Back
    this.add.existing(new _objects_SceneButton_js__WEBPACK_IMPORTED_MODULE_1__["default"]("Scene_Menu_Lobbies", {
      scene: this,
      x: this.width * .1,
      y: this.height * .075,
      userDecision: "Are you sure you want to leave the lobby and return to the menu?",
      defaultButtonEvents: true,
      clickCallback: () => {
        this.connection.leaveMatch();
      }
    }).setScale(.5));
    this._createSettings();

    // [Playerlist]
    /*const playerlist = new Playerlist({
    	scene: this,
    	x: this.width / 2, y: this.height / 2,
    	panel: {
    		width: this.height * .5,
    		height: this.height * .75,
    	}
    });*/

    const scrollablePanel = this.rexUI.add.scrollablePanel({
      x: this.width * .61,
      y: this.height * .47,
      width: this.width * .2,
      height: this.height * .45,
      scrollMode: 0,
      background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, 0x222d2e),
      //0x222d2e

      panel: {
        child: this.rexUI.add.fixWidthSizer({
          align: "center",
          anchor: "center",
          space: {
            left: 5,
            right: 5,
            top: 3,
            bottom: 3,
            item: 8,
            line: 8
          }
        }),
        mask: {
          padding: 1
        }
      },
      space: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
        panel: 10
      }
    }).layout();
    var updatePanel = () => {
      const sizer = scrollablePanel.getElement("panel");
      sizer.clear(true);
      for (const player of this.connection.players.values()) {
        const item = this.add.text(0, 0, player.tag, {
          x: this.width / 1.6,
          y: this.height / 5,
          align: "center",
          fontSize: 28,
          fontStyle: "bold"
        });
        item.setOrigin(.5).setStroke("#000", 5);
        sizer.add(item);
      }
      scrollablePanel.layout();
      return scrollablePanel;
    };

    // [Button] Begin Game
    let btnBegin = new _objects_buttons_Button_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
      scene: this,
      x: this.width * .5,
      y: this.height * .85,
      texture: "button_start_game"
    }).setScale(.5);
    btnBegin.bg.setTint(0X777777);
    this.add.existing(btnBegin);
    this.connection.joinOrCreateMatch().then(match => {
      console.log(`Joined match { ${match.id} }`);

      // activate the 'begin game' button if this player becomes host
      match.state.listen("host", hostID => {
        if (hostID !== match.sessionId) return;

        // replace old button with a new, interactive button
        btnBegin.destroy();
        btnBegin = new _objects_buttons_Button_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
          scene: this,
          x: this.width * .5,
          y: this.height * .85,
          texture: "button_start_game",
          defaultButtonEvents: true,
          on: {
            pointerup: () => {
              this.connection.beginMatch();
            }
          }
        }).setScale(.5);
        this.add.existing(btnBegin);
        {
          // Only show buttons if client is host
          const X_CARDS = this.width * .4,
            Y_CARDS = this.height * .4,
            X_INTERVAL = this.width * .4,
            Y_INTERVAL = this.height * .6;

          // Decrease Card value
          new _objects_buttons_Button_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
            scene: this,
            x: X_CARDS - this.width * .02,
            y: Y_CARDS,
            texture: "dropdown_arrow_white",
            defaultButtonEvents: true,
            on: {
              pointerup: () => {
                this.connection.match.send("match-settings-cards", {
                  cards: Math.max(1, Math.min(4, parseInt(this.settings.cards.text) - 1))
                });
              }
            }
          }).setRotation(Math.PI * .5).setScale(.5);

          // Increase Card value
          new _objects_buttons_Button_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
            scene: this,
            x: X_CARDS + this.width * .02,
            y: Y_CARDS,
            texture: "dropdown_arrow_white",
            defaultButtonEvents: true,
            on: {
              pointerup: () => {
                this.connection.match.send("match-settings-cards", {
                  cards: Math.max(1, Math.min(4, parseInt(this.settings.cards.text) + 1))
                });
              }
            }
          }).setRotation(Math.PI * 1.5).setScale(.5);

          // Decrease Interval value
          new _objects_buttons_Button_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
            scene: this,
            x: X_INTERVAL - this.width * .03,
            y: Y_INTERVAL,
            texture: "dropdown_arrow_white",
            defaultButtonEvents: true,
            on: {
              pointerup: () => {
                this.connection.match.send("match-settings-interval", {
                  interval: Math.max(1, Math.min(15, parseFloat(this.settings.interval.text) - .5))
                });
              }
            }
          }).setRotation(Math.PI * .5).setScale(.5);

          // Increase Interval value
          new _objects_buttons_Button_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
            scene: this,
            x: X_INTERVAL + this.width * .03,
            y: Y_INTERVAL,
            texture: "dropdown_arrow_white",
            defaultButtonEvents: true,
            on: {
              pointerup: () => {
                this.connection.match.send("match-settings-interval", {
                  interval: Math.max(1, Math.min(15, parseFloat(this.settings.interval.text) + .5))
                });
              }
            }
          }).setRotation(Math.PI * 1.5).setScale(.5);
        }
      });
      match.state.listen("cards", cards => {
        this.settings.cards.setText(cards.toString());
      });
      match.state.listen("interval", interval => {
        this.settings.interval.setText(interval.toString());
      });

      // event just for this client, triggers on first join
      // to fetch all pre-connected players
      match.onMessage("match-clients", () => {
        updatePanel();
      });

      // triggered whenever a player joins
      match.onMessage("match-player-join", () => {
        updatePanel();
      });

      // triggered whenever a player leaves
      match.onMessage("match-player-leave", () => {
        updatePanel();
      });
    }).catch(console.error);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Scene_Menu_Lobby);

/***/ }),

/***/ "./src/scripts/scenes/Scene_Menu_Main.js":
/*!***********************************************!*\
  !*** ./src/scripts/scenes/Scene_Menu_Main.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _objects_Scene_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../objects/Scene.js */ "./src/scripts/objects/Scene.js");
/* harmony import */ var _objects_buttons_Button_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../objects/buttons/Button.js */ "./src/scripts/objects/buttons/Button.js");


class Scene_Menu_Main extends _objects_Scene_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super({
      key: "Scene_Menu_Main",
      wallpaper: true
    });
    this.buttons = {
      play: null,
      leaderboard: null,
      settings: null
    };
  }
  create(data = {}) {
    super.create(data);

    // FIXME: Plays at full volume until the Settings Scene is loaded. Figure out why and how to fix it.
    this.game.audio.music.play("audio_music_bg_02");

    /* Logo */
    this.add.image(this.game.renderer.width / 1.9, this.game.renderer.height * 0.25, "logo").setScale(0.5);

    /* Buttons */
    for (let i = 0; i < Object.keys(this.buttons).length; i++) {
      const key = Object.keys(this.buttons)[i],
        btn = new _objects_buttons_Button_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
          scene: this,
          x: this.game.renderer.width * .5,
          y: this.game.renderer.height * (.5 + i * .175),
          texture: `button_${key}`,
          defaultButtonEvents: true
        });
      btn.setScale(.69);
      this.add.existing(this.buttons[key] = btn);
    }
    this.buttons.play.on("pointerup", pointer => {
      // left mouse button
      if (pointer.button !== 0) return;

      // this.scene.sleep();
      this.scene.start("Scene_Menu_Lobbies");
    });
    this.buttons.settings.on("pointerup", pointer => {
      // left mouse button
      if (pointer.button !== 0) return;

      // this.scene.sleep();
      this.scene.start("Scene_Menu_Settings");
    });
    this.buttons.leaderboard.on("pointerup", pointer => {
      // left mouse button
      if (pointer.button !== 0) return;

      // this.scene.sleep();
      this.scene.start("Scene_Menu_Leaderboard");
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Scene_Menu_Main);

/***/ }),

/***/ "./src/scripts/scenes/Scene_Menu_Settings.js":
/*!***************************************************!*\
  !*** ./src/scripts/scenes/Scene_Menu_Settings.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _objects_Scene_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../objects/Scene.js */ "./src/scripts/objects/Scene.js");
/* harmony import */ var _objects_SceneButton_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../objects/SceneButton.js */ "./src/scripts/objects/SceneButton.js");
/* harmony import */ var _objects_settings_variations_VolumeSlider_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../objects/settings/variations/VolumeSlider.js */ "./src/scripts/objects/settings/variations/VolumeSlider.js");
/* harmony import */ var _objects_settings_variations_Dropdown_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../objects/settings/variations/Dropdown.js */ "./src/scripts/objects/settings/variations/Dropdown.js");




class Scene_Menu_Settings extends _objects_Scene_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super({
      key: "Scene_Menu_Settings",
      wallpaper: true
    });
  }
  create(data = {}) {
    super.create(data);

    /* Settings Panel SceneButtonground */
    this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.50, "panel_settings").setScale(0.7);

    /* Back Button */
    this.add.existing(new _objects_SceneButton_js__WEBPACK_IMPORTED_MODULE_1__["default"]("Scene_Menu_Main", {
      scene: this,
      x: this.width * .1,
      y: this.height * .075,
      defaultButtonEvents: true
    }).setScale(.5));

    /* Dropdown Menus */

    // voicepack dropdown
    this.add.existing(new _objects_settings_variations_Dropdown_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
      scene: this,
      x: this.width * .6,
      y: this.height * .35,
      key: "voicepack",
      title: "Announcer Pack",
      choices: [{
        name: "Deyan"
      }]
    }));

    /* Volume Sliders */

    const DEFAULTS_SLIDER = {
      scene: this,
      element: {
        width: this.width * .4,
        // length
        height: 20 // thiccness
      }
    };

    // volume-master slider
    this.add.existing(new _objects_settings_variations_VolumeSlider_js__WEBPACK_IMPORTED_MODULE_2__["default"](Object.assign({}, DEFAULTS_SLIDER, {
      x: this.width * .5,
      y: this.height * .5,
      key: "volumes.master",
      title: "Master"
    })));

    // volume-music slider
    this.add.existing(new _objects_settings_variations_VolumeSlider_js__WEBPACK_IMPORTED_MODULE_2__["default"](Object.assign({}, DEFAULTS_SLIDER, {
      x: this.width * .5,
      y: this.height * .6,
      key: "volumes.music",
      title: "Music"
    })));

    // volume-voice slider
    this.add.existing(new _objects_settings_variations_VolumeSlider_js__WEBPACK_IMPORTED_MODULE_2__["default"](Object.assign({}, DEFAULTS_SLIDER, {
      x: this.width * .5,
      y: this.height * .7,
      key: "volumes.voice",
      title: "Announcers"
    })));

    // volume-effects slider
    this.add.existing(new _objects_settings_variations_VolumeSlider_js__WEBPACK_IMPORTED_MODULE_2__["default"](Object.assign({}, DEFAULTS_SLIDER, {
      x: this.width * .5,
      y: this.height * .8,
      key: "volumes.effects",
      title: "Effects"
    })));
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Scene_Menu_Settings);

/***/ }),

/***/ "./src/scripts/scenes/Scene_Preload.js":
/*!*********************************************!*\
  !*** ./src/scripts/scenes/Scene_Preload.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ "./node_modules/phaser/dist/phaser.js");
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _objects_objects_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../objects/objects.js */ "./src/scripts/objects/objects.js");
/* harmony import */ var _classes_Voicepack_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../classes/Voicepack.js */ "./src/scripts/classes/Voicepack.js");



class Scene_Preload extends phaser__WEBPACK_IMPORTED_MODULE_0__.Scene {
  static importImageSeries(load, prefix, amount, ext, start = 0, pad = 2) {
    for (let i = 0; i < amount; i++) {
      const key = prefix + (i + start).toString().padStart(pad, "0");
      load.image(key, `${key}.${ext}`);
    }
  }
  _composeLoadingScreen() {
    const width = this.cameras.main.width,
      height = this.cameras.main.height,
      bar = {
        x: width / 2 - width / 3 * .5,
        y: height / 2 - 50 * .5,
        width: width / 3,
        height: 50
      };
    this.add.image(width / 2, height / 2, "wallpaper_loading").setScale(0.7111);
    this.add.image(width / 2, height / 2, "progressBg_loading").setScale(1.4);

    // actual loading progress bar
    const progressBar = this.add.graphics();
    // bar background
    this.add.graphics().fillStyle(0x00F0FF, 0.8);
    //.fillRect(bar.x, bar.y, bar.width, bar.height);

    // "[x] %"
    const percentText = this.make.text({
      x: width / 2,
      y: height / 2,
      text: "0%",
      style: {
        font: "18px monospace",
        fill: "#000000",
        align: "center"
      }
    }).setOrigin(.5);
    this.load.on("progress", value => {
      percentText.setText((value * 100).toFixed() + "%");
      progressBar.fillStyle(0x00F0FF, 1)
      // TODO: Figure out exact maths to center rect-bar
      .fillRect(bar.x * 1.01, bar.y * 1, bar.width * 0.9 * value, bar.height * .9);
    });

    //overlay for progress bar
    this.add.image(width / 2, height / 2, "progressBar_loading").setScale(1.4);

    // "Loading..." Fix if possible: Text is not showing up
    this.make.text({
      x: this.width / 2,
      y: this.height / 3,
      text: "Loading",
      style: {
        font: "30px monospace",
        fill: "#FFFFFF",
        align: "center"
      }
    }).setOrigin(.5);
  }
  constructor() {
    super({
      key: "Scene_Preload",
      pack: {
        // pre-packing assets needed before the preload event (loading screen)
        files: [{
          type: "image",
          key: "wallpaper_loading",
          url: "/assets/img/wallpapers/bg_wallpaper_00.jpg"
        }, {
          type: "image",
          key: "progressBar_loading",
          url: "/assets/img/UI/progress/bg_progress01.png"
        }, {
          type: "image",
          key: "progressBg_loading",
          url: "/assets/img/UI/progress/bg_progress02.png"
        }]
      }
    });
  }
  preload() {
    this._composeLoadingScreen();
    for (const Class of Object.values(_objects_objects_js__WEBPACK_IMPORTED_MODULE_1__)) {
      if (Class.preload != null) Class.preload(this.load);
    }

    /* ====================
     * ====== IMAGES ======
     * ==================== */
    this.load.setPath("assets/img/");

    /* ========================
     * ====== ANIMATIONS ======
     * ======================== */
    this.load.atlas("confetti", "animations/anim_confetti.png", "animations/anim_confetti.json");

    // Logo
    this.load.image("logo", "logo.png");

    /* UI Assets */

    // Game Elements
    this.load.image("coin", "UI/icons/coin.png");
    this.load.image("coin2", "UI/icons/coin2.png");
    this.load.image("heart", "UI/icons/heart.png");
    this.load.image("star", "UI/icons/star.png");
    this.load.image("bg_score", "UI/bg_score.png");

    // Panels
    this.load.image("panel_customLobby", "UI/panels/bg_panel_customLobby.png");
    this.load.image("panel_customLobby_split", "UI/panels/bg_panel_customLobby_split.png");
    this.load.image("panel_leaderboard", "UI/panels/bg_panel_leaderboard.png");
    this.load.image("panel_lobbies", "UI/panels/bg_panel_lobbies.png");
    this.load.image("panel_lobbies_split", "UI/panels/bg_panel_lobbies_split.png");
    this.load.image("panel_lobby", "UI/panels/bg_panel_lobby.png");
    this.load.image("panel_lobby_split", "UI/panels/bg_panel_lobby_split.png");
    this.load.image("panel_lobby_alt", "UI/panels/bg_panel_lobby_alt.png");
    this.load.image("panel_scoreboard", "UI/panels/bg_panel_scoreboard.png");
    this.load.image("panel_scores", "UI/panels/bg_panel_scores.png");
    this.load.image("panel_settings", "UI/panels/bg_panel_settings01.png");
    this.load.image("panel_end", "UI/panels/bg_game_end.png");
    this.load.image("panel_ball_count", "UI/panels/bg_panel_ball_count.png");
    this.load.image("panel_customLobby_split03", "UI/panels/bg_panel_customLobby03.png");

    // Progress Bars
    this.load.image("progress", "UI/progress/bg_progress.png");
    this.load.image("progress_blue", "UI/progress/bg_progress_blue.png");
    this.load.image("progress_green", "UI/progress/bg_progress_green.png");
    this.load.image("progress_orange", "UI/progress/bg_progress_orange.png");
    this.load.image("progress_purple", "UI/progress/bg_progress_purple.png");
    this.load.image("progress_red", "UI/progress/bg_progress_red.png");

    /* AUDIO */
    this.load.setPath("/assets/audio/");
    this.load.audio("audio_button_01", "buttons/button_01.wav");
    this.load.audio("audio_button_02", "buttons/button_02.wav");
    this.load.audio("audio_button_03", "buttons/button_03.wav");
    this.load.audio("audio_music_bg_01", "music/bg_01.mp3");
    this.load.audio("audio_music_bg_02", "music/bg_02.mp3");
    this.load.audio("audio_effects_cheering", "effects/cheering.mp3");

    // Voicepacks
    this.load.setPath("/assets/audio/voice-packs/");
    new _classes_Voicepack_js__WEBPACK_IMPORTED_MODULE_2__["default"]("deyan").preload(this.load);
  }
  create() {
    this.scene.start("Scene_Menu_Main");
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Scene_Preload);

/***/ }),

/***/ "./webpack/credits.js":
/*!****************************!*\
  !*** ./webpack/credits.js ***!
  \****************************/
/***/ (() => {

/**
 * PLEASE DO NOT REMOVE THIS NOTICE!
 *
 * @template        This Phaser game was built using phaser-project-template-es6 (https://github.com/yandeu/phaser-project-template-es6)
 * @author          Yannick Deubel (https://github.com/yandeu)
 * @copyright       2019 Yannick Deubel
 * @license         {@link https://github.com/yandeu/phaser-project-template-es6/blob/master/LICENSE|MIT License}
 */

// Of course you can remove it if you really want to, but it would be nice if you would leave it there :)

console.log('%c %c %c %c %c Built using phaser-project-template-es6 %c https://github.com/yandeu/phaser-project-template-es6', 'background: #ff0000', 'background: #ffff00', 'background: #00ff00', 'background: #00ffff', 'color: #fff; background: #000000;', 'background: none');

/***/ }),

/***/ "?7267":
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/***/ (() => {

/* (ignored) */

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkphaser_project_template_es6"] = self["webpackChunkphaser_project_template_es6"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["vendors"], () => (__webpack_require__("./src/scripts/game.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors"], () => (__webpack_require__("./webpack/credits.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQzNCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3BoYXNlci1wcm9qZWN0LXRlbXBsYXRlLWVzNi8uL3NyYy9zY3JpcHRzL2NsYXNzZXMvQXVkaW9DaGFubmVsLmpzIiwid2VicGFjazovL3BoYXNlci1wcm9qZWN0LXRlbXBsYXRlLWVzNi8uL3NyYy9zY3JpcHRzL2NsYXNzZXMvQXVkaW9NYW5hZ2VyLmpzIiwid2VicGFjazovL3BoYXNlci1wcm9qZWN0LXRlbXBsYXRlLWVzNi8uL3NyYy9zY3JpcHRzL2NsYXNzZXMvQmluZ29OdW1iZXJHZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vcGhhc2VyLXByb2plY3QtdGVtcGxhdGUtZXM2Ly4vc3JjL3NjcmlwdHMvY2xhc3Nlcy9Db25uZWN0aW9uSGFuZGxlci5qcyIsIndlYnBhY2s6Ly9waGFzZXItcHJvamVjdC10ZW1wbGF0ZS1lczYvLi9zcmMvc2NyaXB0cy9jbGFzc2VzL1BsYXllci5qcyIsIndlYnBhY2s6Ly9waGFzZXItcHJvamVjdC10ZW1wbGF0ZS1lczYvLi9zcmMvc2NyaXB0cy9jbGFzc2VzL1NldHRpbmdzTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9waGFzZXItcHJvamVjdC10ZW1wbGF0ZS1lczYvLi9zcmMvc2NyaXB0cy9jbGFzc2VzL1ZvaWNlcGFjay5qcyIsIndlYnBhY2s6Ly9waGFzZXItcHJvamVjdC10ZW1wbGF0ZS1lczYvLi9zcmMvc2NyaXB0cy9nYW1lLmpzIiwid2VicGFjazovL3BoYXNlci1wcm9qZWN0LXRlbXBsYXRlLWVzNi8uL3NyYy9zY3JpcHRzL2dsb2JhbHMuanMiLCJ3ZWJwYWNrOi8vcGhhc2VyLXByb2plY3QtdGVtcGxhdGUtZXM2Ly4vc3JjL3NjcmlwdHMvb2JqZWN0cy9CYWxsLmpzIiwid2VicGFjazovL3BoYXNlci1wcm9qZWN0LXRlbXBsYXRlLWVzNi8uL3NyYy9zY3JpcHRzL29iamVjdHMvQmFsbFF1ZXVlLmpzIiwid2VicGFjazovL3BoYXNlci1wcm9qZWN0LXRlbXBsYXRlLWVzNi8uL3NyYy9zY3JpcHRzL29iamVjdHMvQ2FyZC5qcyIsIndlYnBhY2s6Ly9waGFzZXItcHJvamVjdC10ZW1wbGF0ZS1lczYvLi9zcmMvc2NyaXB0cy9vYmplY3RzL0NhcmRIb2xkZXIuanMiLCJ3ZWJwYWNrOi8vcGhhc2VyLXByb2plY3QtdGVtcGxhdGUtZXM2Ly4vc3JjL3NjcmlwdHMvb2JqZWN0cy9DYXJkVGlsZS5qcyIsIndlYnBhY2s6Ly9waGFzZXItcHJvamVjdC10ZW1wbGF0ZS1lczYvLi9zcmMvc2NyaXB0cy9vYmplY3RzL0NvbmZldHRpLmpzIiwid2VicGFjazovL3BoYXNlci1wcm9qZWN0LXRlbXBsYXRlLWVzNi8uL3NyYy9zY3JpcHRzL29iamVjdHMvTGVhZGVyYm9hcmQuanMiLCJ3ZWJwYWNrOi8vcGhhc2VyLXByb2plY3QtdGVtcGxhdGUtZXM2Ly4vc3JjL3NjcmlwdHMvb2JqZWN0cy9QbGF5ZXJsaXN0LmpzIiwid2VicGFjazovL3BoYXNlci1wcm9qZWN0LXRlbXBsYXRlLWVzNi8uL3NyYy9zY3JpcHRzL29iamVjdHMvU2NlbmUuanMiLCJ3ZWJwYWNrOi8vcGhhc2VyLXByb2plY3QtdGVtcGxhdGUtZXM2Ly4vc3JjL3NjcmlwdHMvb2JqZWN0cy9TY2VuZUJ1dHRvbi5qcyIsIndlYnBhY2s6Ly9waGFzZXItcHJvamVjdC10ZW1wbGF0ZS1lczYvLi9zcmMvc2NyaXB0cy9vYmplY3RzL1Njb3JlQm9hcmQuanMiLCJ3ZWJwYWNrOi8vcGhhc2VyLXByb2plY3QtdGVtcGxhdGUtZXM2Ly4vc3JjL3NjcmlwdHMvb2JqZWN0cy9TY29yZVRyYWNrZXIuanMiLCJ3ZWJwYWNrOi8vcGhhc2VyLXByb2plY3QtdGVtcGxhdGUtZXM2Ly4vc3JjL3NjcmlwdHMvb2JqZWN0cy9idXR0b25zL0J1dHRvbi5qcyIsIndlYnBhY2s6Ly9waGFzZXItcHJvamVjdC10ZW1wbGF0ZS1lczYvLi9zcmMvc2NyaXB0cy9vYmplY3RzL2J1dHRvbnMvb3ZlcmxheXMvQmFzZU92ZXJsYXkuanMiLCJ3ZWJwYWNrOi8vcGhhc2VyLXByb2plY3QtdGVtcGxhdGUtZXM2Ly4vc3JjL3NjcmlwdHMvb2JqZWN0cy9idXR0b25zL292ZXJsYXlzL0ltYWdlT3ZlcmxheS5qcyIsIndlYnBhY2s6Ly9waGFzZXItcHJvamVjdC10ZW1wbGF0ZS1lczYvLi9zcmMvc2NyaXB0cy9vYmplY3RzL2J1dHRvbnMvb3ZlcmxheXMvVGV4dE92ZXJsYXkuanMiLCJ3ZWJwYWNrOi8vcGhhc2VyLXByb2plY3QtdGVtcGxhdGUtZXM2Ly4vc3JjL3NjcmlwdHMvb2JqZWN0cy9vYmplY3RzLmpzIiwid2VicGFjazovL3BoYXNlci1wcm9qZWN0LXRlbXBsYXRlLWVzNi8uL3NyYy9zY3JpcHRzL29iamVjdHMvc2V0dGluZ3MvU2V0dGluZy5qcyIsIndlYnBhY2s6Ly9waGFzZXItcHJvamVjdC10ZW1wbGF0ZS1lczYvLi9zcmMvc2NyaXB0cy9vYmplY3RzL3NldHRpbmdzL3ZhcmlhdGlvbnMvRHJvcGRvd24uanMiLCJ3ZWJwYWNrOi8vcGhhc2VyLXByb2plY3QtdGVtcGxhdGUtZXM2Ly4vc3JjL3NjcmlwdHMvb2JqZWN0cy9zZXR0aW5ncy92YXJpYXRpb25zL1NsaWRlci5qcyIsIndlYnBhY2s6Ly9waGFzZXItcHJvamVjdC10ZW1wbGF0ZS1lczYvLi9zcmMvc2NyaXB0cy9vYmplY3RzL3NldHRpbmdzL3ZhcmlhdGlvbnMvVm9sdW1lU2xpZGVyLmpzIiwid2VicGFjazovL3BoYXNlci1wcm9qZWN0LXRlbXBsYXRlLWVzNi8uL3NyYy9zY3JpcHRzL3NjZW5lcy9TY2VuZV9NYXRjaC5qcyIsIndlYnBhY2s6Ly9waGFzZXItcHJvamVjdC10ZW1wbGF0ZS1lczYvLi9zcmMvc2NyaXB0cy9zY2VuZXMvU2NlbmVfTWVudV9DcmVkaXRzLmpzIiwid2VicGFjazovL3BoYXNlci1wcm9qZWN0LXRlbXBsYXRlLWVzNi8uL3NyYy9zY3JpcHRzL3NjZW5lcy9TY2VuZV9NZW51X0xlYWRlcmJvYXJkLmpzIiwid2VicGFjazovL3BoYXNlci1wcm9qZWN0LXRlbXBsYXRlLWVzNi8uL3NyYy9zY3JpcHRzL3NjZW5lcy9TY2VuZV9NZW51X0xvYmJpZXMuanMiLCJ3ZWJwYWNrOi8vcGhhc2VyLXByb2plY3QtdGVtcGxhdGUtZXM2Ly4vc3JjL3NjcmlwdHMvc2NlbmVzL1NjZW5lX01lbnVfTG9iYnkuanMiLCJ3ZWJwYWNrOi8vcGhhc2VyLXByb2plY3QtdGVtcGxhdGUtZXM2Ly4vc3JjL3NjcmlwdHMvc2NlbmVzL1NjZW5lX01lbnVfTWFpbi5qcyIsIndlYnBhY2s6Ly9waGFzZXItcHJvamVjdC10ZW1wbGF0ZS1lczYvLi9zcmMvc2NyaXB0cy9zY2VuZXMvU2NlbmVfTWVudV9TZXR0aW5ncy5qcyIsIndlYnBhY2s6Ly9waGFzZXItcHJvamVjdC10ZW1wbGF0ZS1lczYvLi9zcmMvc2NyaXB0cy9zY2VuZXMvU2NlbmVfUHJlbG9hZC5qcyIsIndlYnBhY2s6Ly9waGFzZXItcHJvamVjdC10ZW1wbGF0ZS1lczYvLi93ZWJwYWNrL2NyZWRpdHMuanMiLCJ3ZWJwYWNrOi8vcGhhc2VyLXByb2plY3QtdGVtcGxhdGUtZXM2L2lnbm9yZWR8RDpcXFByb2plY3RzXFxiaW5nby1iYW5nb1xcbm9kZV9tb2R1bGVzXFxAZ2FtZXN0ZGlvXFx3ZWJzb2NrZXRcXGxpYnx3cyIsIndlYnBhY2s6Ly9waGFzZXItcHJvamVjdC10ZW1wbGF0ZS1lczYvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcGhhc2VyLXByb2plY3QtdGVtcGxhdGUtZXM2L3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vcGhhc2VyLXByb2plY3QtdGVtcGxhdGUtZXM2L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3BoYXNlci1wcm9qZWN0LXRlbXBsYXRlLWVzNi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcGhhc2VyLXByb2plY3QtdGVtcGxhdGUtZXM2L3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vcGhhc2VyLXByb2plY3QtdGVtcGxhdGUtZXM2L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcGhhc2VyLXByb2plY3QtdGVtcGxhdGUtZXM2L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcGhhc2VyLXByb2plY3QtdGVtcGxhdGUtZXM2L3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL3BoYXNlci1wcm9qZWN0LXRlbXBsYXRlLWVzNi93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3BoYXNlci1wcm9qZWN0LXRlbXBsYXRlLWVzNi93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vcGhhc2VyLXByb2plY3QtdGVtcGxhdGUtZXM2L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBQaGFzZXIgZnJvbSBcInBoYXNlclwiO1xyXG5cclxuY2xhc3MgQXVkaW9DaGFubmVsIGV4dGVuZHMgUGhhc2VyLlNvdW5kLkhUTUw1QXVkaW9Tb3VuZE1hbmFnZXJcclxue1xyXG5cdGdldCBfdm9sdW1lcygpXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuc2V0dGluZ3MuZ2V0KFwidm9sdW1lc1wiKTtcclxuXHR9XHJcblxyXG5cdC8vIHZvbHVtZSBhcyBkZXNpcmVkIGJ5IHVzZXIgc2V0dGluZ3NcclxuXHRnZXQgZGVzaXJlZFZvbHVtZSgpXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3ZvbHVtZXNbdGhpcy5rZXldO1xyXG5cdH1cclxuXHJcblx0Ly8gdGFrZXMgbWFzdGVyIHZvbCBpbnRvIGFjY291bnRcclxuXHRnZXQgZWZmZWN0aXZlVm9sdW1lKClcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5hdWRpby5tYXN0ZXIudm9sdW1lICogdGhpcy5kZXNpcmVkVm9sdW1lO1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IoYXVkaW9NYW5hZ2VyLCBzZXR0aW5nS2V5KVxyXG5cdHtcclxuXHRcdHN1cGVyKGF1ZGlvTWFuYWdlci5nYW1lKTtcclxuXHJcblx0XHR0aGlzLmdhbWUgPSBhdWRpb01hbmFnZXIuZ2FtZTtcclxuXHRcdHRoaXMuc2V0dGluZ3MgPSB0aGlzLmdhbWUuc2V0dGluZ3M7XHJcblx0XHR0aGlzLmF1ZGlvID0gYXVkaW9NYW5hZ2VyO1xyXG5cdFx0dGhpcy5rZXkgPSBzZXR0aW5nS2V5O1xyXG5cdH1cclxuXHJcblx0c2V0Vm9sdW1lKHZhbClcclxuXHR7XHJcblx0XHRjb25zdCB2b2x1bWVzID0gdGhpcy5fdm9sdW1lcztcclxuXHRcdHZhbCA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIHZhbCkpO1xyXG5cclxuXHRcdHZvbHVtZXNbdGhpcy5rZXldID0gdmFsO1xyXG5cdFx0dGhpcy5zZXR0aW5ncy5zZXQoXCJ2b2x1bWVzXCIsIHZvbHVtZXMpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLnVwZGF0ZVZvbHVtZSgpO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlVm9sdW1lKClcclxuXHR7XHJcblx0XHRyZXR1cm4gc3VwZXIuc2V0Vm9sdW1lKHRoaXMuZWZmZWN0aXZlVm9sdW1lKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEF1ZGlvQ2hhbm5lbDtcclxuIiwiaW1wb3J0IEF1ZGlvQ2hhbm5lbCBmcm9tIFwiLi9BdWRpb0NoYW5uZWwuanNcIjtcclxuXHJcbmNsYXNzIE1hc3RlckNoYW5uZWwgZXh0ZW5kcyBBdWRpb0NoYW5uZWxcclxue1xyXG5cdGdldCBlZmZlY3RpdmVWb2x1bWUoKVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLmRlc2lyZWRWb2x1bWU7XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3RvcihhdWRpb01hbmFnZXIpXHJcblx0e1xyXG5cdFx0c3VwZXIoYXVkaW9NYW5hZ2VyLCBcIm1hc3RlclwiKTtcclxuXHR9XHJcblxyXG5cdHNldFZvbHVtZSh2YWwpXHJcblx0e1xyXG5cdFx0c3VwZXIuc2V0Vm9sdW1lKHZhbCk7XHJcblxyXG5cdFx0Zm9yIChjb25zdCBjaGFubmVsIG9mIE9iamVjdC52YWx1ZXModGhpcy5hdWRpby5jaGFubmVscykpXHJcblx0XHRcdGNoYW5uZWwudXBkYXRlVm9sdW1lKCk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogQGNsYXNzIE1hbmFnZXMgdGhlIEF1ZGlvIE1hbmFnZXJzIGZvciB0aGlzIGdhbWUgYW5kIGFsbG93cyBmb3IgZWFzeSBhY2Nlc3MgdG8gYSBnbG9iYWwgcGxheSBmdW5jdGlvbi5cclxuICovXHJcbmNsYXNzIEF1ZGlvTWFuYWdlclxyXG57XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgbWFuYWdlcnMgPSBbXSlcclxuXHR7XHJcblx0XHR0aGlzLmdhbWUgPSBnYW1lO1xyXG5cdFx0dGhpcy5jaGFubmVscyA9IHt9O1xyXG5cclxuXHRcdGZvciAoY29uc3Qga2V5IG9mIG1hbmFnZXJzKVxyXG5cdFx0e1xyXG5cdFx0XHR0aGlzLmNoYW5uZWxzW2tleV0gPSBuZXcgQXVkaW9DaGFubmVsKHRoaXMsIGtleSk7XHJcblx0XHRcdHRoaXNba2V5XSA9IHRoaXMuY2hhbm5lbHNba2V5XTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIXRoaXMubWFzdGVyKVxyXG5cdFx0XHR0aGlzLm1hc3RlciA9IG5ldyBNYXN0ZXJDaGFubmVsKHRoaXMpO1xyXG5cclxuXHRcdGZvciAoY29uc3QgY2hhbm5lbCBvZiBbIHRoaXMubWFzdGVyIF0uY29uY2F0KE9iamVjdC52YWx1ZXModGhpcy5jaGFubmVscykpKVxyXG5cdFx0XHRjaGFubmVsLnNldFZvbHVtZShjaGFubmVsLmRlc2lyZWRWb2x1bWUpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXVkaW9NYW5hZ2VyO1xyXG4iLCJpbXBvcnQgeyBCSU5HTyB9IGZyb20gXCIuLi9nbG9iYWxzLmpzXCI7XHJcblxyXG4vKipcclxuICogQGNsYXNzIEhhbmRsZXMgdGhlIHJhbmRvbSBnZW5lcmF0aW9uIG9mIGJpbmdvIG51bWJlcnNcclxuICovXHJcbmNsYXNzIEJpbmdvTnVtYmVyR2VuZXJhdG9yXHJcbntcclxuXHRnZXQgQigpXHJcblx0e1xyXG5cdFx0cmV0dXJuIG5ldyBBcnJheSh0aGlzLm1heFBlckNvbHVtbikuZmlsbCgwKS5tYXAoKHgsIGkpID0+IHRoaXMubWF4UGVyQ29sdW1uICogMCArIGkgKyAxKTtcclxuXHR9XHJcblx0Z2V0IEkoKVxyXG5cdHtcclxuXHRcdHJldHVybiBuZXcgQXJyYXkodGhpcy5tYXhQZXJDb2x1bW4pLmZpbGwoMCkubWFwKCh4LCBpKSA9PiB0aGlzLm1heFBlckNvbHVtbiAqIDEgKyBpICsgMSk7XHJcblx0fVxyXG5cdGdldCBOKClcclxuXHR7XHJcblx0XHRyZXR1cm4gbmV3IEFycmF5KHRoaXMubWF4UGVyQ29sdW1uKS5maWxsKDApLm1hcCgoeCwgaSkgPT4gdGhpcy5tYXhQZXJDb2x1bW4gKiAyICsgaSArIDEpO1xyXG5cdH1cclxuXHRnZXQgRygpXHJcblx0e1xyXG5cdFx0cmV0dXJuIG5ldyBBcnJheSh0aGlzLm1heFBlckNvbHVtbikuZmlsbCgwKS5tYXAoKHgsIGkpID0+IHRoaXMubWF4UGVyQ29sdW1uICogMyArIGkgKyAxKTtcclxuXHR9XHJcblx0Z2V0IE8oKVxyXG5cdHtcclxuXHRcdHJldHVybiBuZXcgQXJyYXkodGhpcy5tYXhQZXJDb2x1bW4pLmZpbGwoMCkubWFwKCh4LCBpKSA9PiB0aGlzLm1heFBlckNvbHVtbiAqIDQgKyBpICsgMSk7XHJcblx0fVxyXG5cclxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcclxuXHRnZXRMZXR0ZXIobnVtYmVyKSB7IHJldHVybiB0aGlzLmdldENvbHVtbihudW1iZXIpOyB9XHJcblx0LyoqXHJcblx0ICogQHBhcmFtIHtudW1iZXJ9IG51bWJlciAtIEEgdmFsaWQgbnVtYmVyIGluIHRoZSBjdXJyZW50IGJpbmdvIGdlbmVyYXRvciBjb25maWd1cmF0aW9uXHJcblx0ICogQHJldHVybiB7c3RyaW5nfSAtIFRoZSBsZXR0ZXIgaW4gdGhlIFwiQklOR09cIiBjb2x1bW4gdGhhdCB0aGUgbnVtYmVyIGNvcnJlc3BvbmRzIHRvXHJcblx0ICovXHJcblx0Z2V0Q29sdW1uKG51bWJlcilcclxuXHR7XHJcblx0XHQvLyBzdWJ0cmFjdCBhIHNpbmdsZSBmcmFjdGlvbiBzbyB0aGF0IHRoZSBsYXN0IG51bWJlciBpbiB0aGlzIGNvbmZpZ3VyYXRpb24gaXMgaW5jbHVkZWRcclxuXHRcdHJldHVybiBCSU5HT1tNYXRoLmZsb29yKChudW1iZXIgLyB0aGlzLm1heFBlckNvbHVtbikgLSAoMSAvIHRoaXMubWF4UGVyQ29sdW1uKSldO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHBhcmFtIHtudW1iZXJ9IFttYXhQZXJDb2x1bW49MTVdIC0gVGhlIG1heGltdW0gYW1vdW50IG9mIG51bWJlcnMgdGhhdCBjYW4gYmUgcHJlc2VudCBpbiBhIEJJTkdPIGNvbHVtblxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKG1heFBlckNvbHVtbiA9IDE1KVxyXG5cdHtcclxuXHRcdHRoaXMubWF4UGVyQ29sdW1uID0gbWF4UGVyQ29sdW1uO1xyXG5cdFx0dGhpcy5tYXggPSBCSU5HTyAqIG1heFBlckNvbHVtbjtcclxuXHRcdHRoaXMudXNlZE51bWJlcnMgPSBbXTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBbY29sdW1uXSAtIElmIHNwZWNpZmllZCwgcmV0cmlldmVzIGEgbnVtYmVyIGZyb20gdGhlIGRlc2lyZWQgQklOR08gY29sdW1uXHJcblx0ICogQHJldHVybiB7b2JqZWN0fSAtIFJldHJpZXZlcyBhIHJhbmRvbSwgbm90IHlldCBjYWxsZWQsIG51bWJlciBmcm9tIHRoZSBhdmFpbGFibGUgcG9vbCBvZiBCaW5nbyBOdW1iZXJzLiBFbnN1cmVzIHRoYXQgbnVtYmVycyBjYW5ub3QgYmUgZHVwbGljYXRlLlxyXG5cdCAqL1xyXG5cdHJhbmRvbShjb2x1bW4gPSBudWxsKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLnVzZWROdW1iZXJzLmxlbmd0aCA+PSB0aGlzLm1heClcclxuXHRcdFx0cmV0dXJuIGNvbnNvbGUud2FybihcIkF0dGVtcHRlZCB0byByZXRyaWV2ZSBhIHJhbmRvbSgpIG51bWJlciBmcm9tIGEgZGVwbGV0ZWQgQmluZ29OdW1iZXJHZW5lcmF0b3JcIik7XHJcblxyXG5cdFx0aWYgKGNvbHVtbiAhPSBudWxsICYmICh0eXBlb2YgY29sdW1uKSA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0Y29sdW1uID0gY29sdW1uLnRvVXBwZXJDYXNlKCk7XHJcblx0XHRlbHNlXHJcblx0XHRcdGNvbHVtbiA9IEJJTkdPW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIEJJTkdPLmxlbmd0aCldO1xyXG5cclxuXHRcdGxldCBudW1iZXI7XHJcblx0XHRkb1xyXG5cdFx0e1xyXG5cdFx0XHRudW1iZXIgPSAxICsgKEJJTkdPLmluZGV4T2YoY29sdW1uKSAqIHRoaXMubWF4UGVyQ29sdW1uKSArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMubWF4UGVyQ29sdW1uKTtcclxuXHRcdH0gd2hpbGUgKHRoaXMudXNlZE51bWJlcnMuaW5jbHVkZXMobnVtYmVyKSk7XHJcblxyXG5cdFx0dGhpcy51c2VkTnVtYmVycy5wdXNoKG51bWJlcik7XHJcblx0XHRyZXR1cm4geyBjb2x1bW4sIG51bWJlciB9O1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmluZ29OdW1iZXJHZW5lcmF0b3I7XHJcbiIsImltcG9ydCAqIGFzIENvbHlzZXVzIGZyb20gXCJjb2x5c2V1cy5qc1wiO1xyXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL1BsYXllci5qc1wiO1xyXG5cclxuY2xhc3MgQ29ubmVjdGlvbkhhbmRsZXJcclxue1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUpXHJcblx0e1xyXG5cdFx0dGhpcy5nYW1lID0gZ2FtZTtcclxuXHJcblx0XHR0aGlzLmhvc3QgPSB3aW5kb3cubG9jYXRpb24ub3JpZ2luLnJlcGxhY2UoXCJodHRwXCIsIFwid3NcIik7XHJcblx0XHR0aGlzLmNsaWVudCA9IG5ldyBDb2x5c2V1cy5DbGllbnQodGhpcy5ob3N0KTtcclxuXHJcblx0XHR0aGlzLm1hdGNoID0gbnVsbDtcclxuXHRcdHRoaXMubWF0Y2hTY2VuZSA9IG51bGw7XHJcblx0XHR0aGlzLnBsYXllcnMgPSBuZXcgTWFwKCk7XHJcblxyXG5cdFx0dHJ5XHJcblx0XHR7XHJcblx0XHRcdHRoaXMucGxheWVyID0gbmV3IFBsYXllcihKU09OLnBhcnNlKGRlY29kZVVSSUNvbXBvbmVudCgobmFtZSA9PiAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTU3MjQzMDAvNDY3MjI2M1xyXG5cdFx0XHR7XHJcblx0XHRcdFx0Y29uc3QgdmFsdWUgPSBgOyAke2RvY3VtZW50LmNvb2tpZX1gO1xyXG5cdFx0XHRcdGNvbnN0IHBhcnRzID0gdmFsdWUuc3BsaXQoYDsgJHtuYW1lfT1gKTtcclxuXHRcdFx0XHRpZiAocGFydHMubGVuZ3RoID09PSAyKVxyXG5cdFx0XHRcdFx0cmV0dXJuIHBhcnRzLnBvcCgpLnNwbGl0KFwiO1wiKS5zaGlmdCgpO1xyXG5cdFx0XHR9KShcInVzZXJcIikpKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Y2F0Y2ggKGVycilcclxuXHRcdHtcclxuXHRcdFx0dGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc29sZS5sb2codGhpcy5wbGF5ZXIpO1xyXG5cdH1cclxuXHJcblx0am9pbk9yQ3JlYXRlTWF0Y2goKVxyXG5cdHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PlxyXG5cdFx0e1xyXG5cdFx0XHR0aGlzLmNsaWVudC5qb2luT3JDcmVhdGUoXCJtYXRjaFwiLCB7IHVzZXJEYXRhOiB0aGlzLnBsYXllci50b0pTT04oKSB9KVxyXG5cdFx0XHRcdC50aGVuKG1hdGNoID0+XHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGhpcy5tYXRjaCA9IG1hdGNoO1xyXG5cclxuXHRcdFx0XHRcdG1hdGNoLm9uTWVzc2FnZShcImNsaWVudC14cFwiLCBtc2cgPT5cclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0dGhpcy5wbGF5ZXIueHAgPSBtc2cueHA7XHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRtYXRjaC5vbk1lc3NhZ2UoXCJtYXRjaC1jbGllbnRzXCIsIG1zZyA9PlxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhtc2cucGxheWVycyk7XHJcblx0XHRcdFx0XHRcdHRoaXMucGxheWVycyA9IG5ldyBNYXAoKTtcclxuXHRcdFx0XHRcdFx0Zm9yIChjb25zdCBwbGF5ZXIgb2YgbXNnLnBsYXllcnMpXHJcblx0XHRcdFx0XHRcdFx0dGhpcy5wbGF5ZXJzLnNldChwbGF5ZXIuaWQsIG5ldyBQbGF5ZXIocGxheWVyKSk7XHJcblxyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzLnBsYXllcnMpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0bWF0Y2gub25NZXNzYWdlKFwibWF0Y2gtcGxheWVyLWpvaW5cIiwgbXNnID0+XHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKG1zZy51c2VyRGF0YSk7XHJcblx0XHRcdFx0XHRcdGlmIChtc2cudXNlckRhdGEuaWQgPT09IHRoaXMucGxheWVyLmlkKVxyXG5cdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHJcblx0XHRcdFx0XHRcdHRoaXMucGxheWVycy5zZXQobXNnLnVzZXJEYXRhLmlkLCBuZXcgUGxheWVyKG1zZy51c2VyRGF0YSkpO1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzLnBsYXllcnMpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0bWF0Y2gub25NZXNzYWdlKFwibWF0Y2gtcGxheWVyLWxlYXZlXCIsIG1zZyA9PlxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHR0aGlzLnBsYXllcnMuZGVsZXRlKG1zZy51c2VyRGF0YS5pZCk7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKHRoaXMucGxheWVycyk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRtYXRjaC5vbk1lc3NhZ2UoXCJtYXRjaC1sb2FkXCIsICgpID0+XHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdC8vIGxvYWQgJ1NjZW5lX01hdGNoJyBoZXJlXHJcblx0XHRcdFx0XHRcdHRoaXMuZ2FtZS5zY2VuZS5zdG9wKFwiU2NlbmVfTWVudV9Mb2JieVwiKTtcclxuXHRcdFx0XHRcdFx0dGhpcy5nYW1lLnNjZW5lLnN0YXJ0KFwiU2NlbmVfTWF0Y2hcIiwge1xyXG5cdFx0XHRcdFx0XHRcdGNhcmRzOiBtYXRjaC5zdGF0ZS5jYXJkcyxcclxuXHRcdFx0XHRcdFx0XHRpbnRlcnZhbDogbWF0Y2guc3RhdGUuaW50ZXJ2YWwsXHJcblx0XHRcdFx0XHRcdFx0cGxheWVyczogdGhpcy5wbGF5ZXJzLFxyXG5cdFx0XHRcdFx0XHRcdG1hdGNoXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0bWF0Y2gub25NZXNzYWdlKFwibWF0Y2gtc3RhcnRcIiwgKCkgPT5cclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0dGhpcy5tYXRjaFNjZW5lLnN0YXJ0KCk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRtYXRjaC5vbk1lc3NhZ2UoXCJtYXRjaC1iYWxsXCIsIG1zZyA9PlxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5tYXRjaFNjZW5lKVxyXG5cdFx0XHRcdFx0XHRcdHRoaXMubWF0Y2hTY2VuZS5wbGF5QmFsbChtc2cuYmFsbCk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRtYXRjaC5vbk1lc3NhZ2UoXCJtYXRjaC1lbmRcIiwgKCkgPT5cclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0dGhpcy5tYXRjaFNjZW5lLmVuZCgpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0bWF0Y2gub25MZWF2ZShjb2RlID0+XHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdHdpbmRvdy5hbGVydChcIlRoaXMgbWF0Y2ggd2FzIGFicnVwdGx5IGVuZGVkIGR1ZSB0byBhIHNlcnZlciBmYWlsdXJlLiBTb3JyeSFcIik7XHJcblxyXG5cdFx0XHRcdFx0XHR0aGlzLmxlYXZlTWF0Y2goKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdHJlc29sdmUobWF0Y2gpO1xyXG5cdFx0XHRcdH0pLmNhdGNoKHJlamVjdCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGJlZ2luTWF0Y2goKVxyXG5cdHtcclxuXHRcdGlmICghdGhpcy5tYXRjaClcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMubWF0Y2guc2VuZChcIm1hdGNoLWhvc3QtYmVnaW5cIik7XHJcblx0fVxyXG5cclxuXHRsZWF2ZU1hdGNoKClcclxuXHR7XHJcblx0XHRpZiAoIXRoaXMubWF0Y2gpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLm1hdGNoLnJlbW92ZUFsbExpc3RlbmVycygpO1xyXG5cdFx0dGhpcy5tYXRjaC5sZWF2ZSgpO1xyXG5cdFx0dGhpcy5tYXRjaCA9IG51bGw7XHJcblx0XHR0aGlzLnBsYXllcnMgPSBudWxsO1xyXG5cclxuXHRcdGlmICh0aGlzLm1hdGNoU2NlbmUpXHJcblx0XHR7XHJcblx0XHRcdHRoaXMubWF0Y2hTY2VuZS5zY2VuZS5zdGFydChcIlNjZW5lX01lbnVfTWFpblwiKTtcclxuXHRcdFx0dGhpcy5tYXRjaFNjZW5lID0gbnVsbDtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbm5lY3Rpb25IYW5kbGVyO1xyXG4iLCJpbXBvcnQgSGFzaGlkcyBmcm9tIFwiaGFzaGlkc1wiO1xyXG5jb25zdCBoYXNoID0gbmV3IEhhc2hpZHMoXCJiaW5nby1iYW5nb1wiLCA2KTtcclxuXHJcbmNsYXNzIFBsYXllclxyXG57XHJcblx0Z2V0IHRhZygpXHJcblx0e1xyXG5cdFx0cmV0dXJuIGAke3RoaXMudXNlcm5hbWV9IyR7dGhpcy5kaXNjcmltaW5hdG9yfWA7XHJcblx0fVxyXG5cclxuXHRnZXQgYXZhdGFyVVJMKClcclxuXHR7XHJcblx0XHRpZiAodGhpcy5wcm92aWRlciA9PT0gXCJkaXNjb3JkXCIpXHJcblx0XHRcdHJldHVybiBgaHR0cHM6Ly9jZG4uZGlzY29yZGFwcC5jb20vYXZhdGFycy8ke3RoaXMuaWR9LyR7dGhpcy5hdmF0YXJ9LnBuZ2A7XHJcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IodXNlciA9IHt9KVxyXG5cdHtcclxuXHRcdGNvbnNvbGUubG9nKHVzZXIpO1xyXG5cdFx0dGhpcy5wcm92aWRlciA9IHVzZXIucHJvdmlkZXIgfHwgXCJiaW5nby1iYW5nb1wiO1xyXG5cdFx0dGhpcy5pZCA9IHVzZXIuaWQgfHwgaGFzaC5lbmNvZGUoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDAwMCkpO1xyXG5cdFx0dGhpcy51c2VybmFtZSA9IHVzZXIudXNlcm5hbWUgfHwgXCJHdWVzdFwiO1xyXG5cdFx0dGhpcy5kaXNjcmltaW5hdG9yID0gdXNlci5kaXNjcmltaW5hdG9yIHx8IChuZXcgQXJyYXkoNCkpLmZpbGwoMCkucmVkdWNlKChhY2MpID0+IGFjYyArPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkudG9TdHJpbmcoKSwgXCJcIik7XHJcblx0XHR0aGlzLmF2YXRhciA9IHVzZXIuYXZhdGFyIHx8IFwiXCI7XHJcblx0XHR0aGlzLnhwID0gdXNlci54cCB8fCAwO1xyXG5cdH1cclxuXHJcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcblx0dG9Kc29uKCkgeyByZXR1cm4gdGhpcy50b0pTT04oKTsgfVxyXG5cdHRvSlNPTigpXHJcblx0e1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0cHJvdmlkZXI6IHRoaXMucHJvdmlkZXIsXHJcblx0XHRcdGlkOiB0aGlzLmlkLFxyXG5cdFx0XHR1c2VybmFtZTogdGhpcy51c2VybmFtZSxcclxuXHRcdFx0ZGlzY3JpbWluYXRvcjogdGhpcy5kaXNjcmltaW5hdG9yLFxyXG5cdFx0XHR0YWc6IHRoaXMudGFnLFxyXG5cdFx0XHRhdmF0YXI6IHRoaXMuYXZhdGFyXHJcblx0XHR9O1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xyXG4iLCJpbXBvcnQgKiBhcyBzdG9yZSBmcm9tIFwic3RvcmVcIjtcclxuaW1wb3J0ICogYXMgc3RvcmVEZWZhdWx0cyBmcm9tIFwic3RvcmUvcGx1Z2lucy9kZWZhdWx0c1wiO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBBIHdyYXBwZXIgY2xhc3MgdGhhdCBzdG9yZXMgYW5kIG1hbmFnZXMgU2V0dGluZ3MuXHJcbiAqL1xyXG5jbGFzcyBTZXR0aW5nc01hbmFnZXIgZXh0ZW5kcyBNYXBcclxue1xyXG5cdHN0YXRpYyBnZXQgREVGQVVMVFMoKVxyXG5cdHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdFwidm9pY2VwYWNrXCI6IFwiZGV5YW5cIixcclxuXHRcdFx0XCJ2b2x1bWVzXCI6IHtcclxuXHRcdFx0XHRtYXN0ZXI6IC41LFxyXG5cdFx0XHRcdG11c2ljOiAuMjUsXHJcblx0XHRcdFx0dm9pY2U6IDEsXHJcblx0XHRcdFx0ZWZmZWN0czogMVxyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0X2NvbXBvc2VEZWZhdWx0cygpXHJcblx0e1xyXG5cdFx0c3RvcmUuYWRkUGx1Z2luKHN0b3JlRGVmYXVsdHMpO1xyXG5cdFx0c3RvcmUuZGVmYXVsdHMoU2V0dGluZ3NNYW5hZ2VyLkRFRkFVTFRTKTtcclxuXHR9XHJcblxyXG5cdF9wb3B1bGF0ZUZyb21TdG9yZSgpXHJcblx0e1xyXG5cdFx0Zm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoU2V0dGluZ3NNYW5hZ2VyLkRFRkFVTFRTKSlcclxuXHRcdFx0c3VwZXIuc2V0KGtleSwgc3RvcmUuZ2V0KGtleSkpO1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IoKVxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0dGhpcy5fY29tcG9zZURlZmF1bHRzKCk7XHJcblx0XHR0aGlzLl9wb3B1bGF0ZUZyb21TdG9yZSgpO1xyXG5cdH1cclxuXHJcblx0Z2V0KGtleSlcclxuXHR7XHJcblx0XHRpZiAoIXN1cGVyLmhhcyhrZXkpKVxyXG5cdFx0e1xyXG5cdFx0XHRjb25zdCBleGlzdGluZyA9IHN0b3JlLmdldChrZXkpO1xyXG5cdFx0XHRpZiAoZXhpc3RpbmcpXHJcblx0XHRcdFx0c3VwZXIuc2V0KGtleSwgZXhpc3RpbmcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBzdXBlci5nZXQoa2V5KTtcclxuXHR9XHJcblxyXG5cdHNldChrZXksIHZhbClcclxuXHR7XHJcblx0XHRzdG9yZS5zZXQoa2V5LCB2YWwpO1xyXG5cdFx0cmV0dXJuIHN1cGVyLnNldChrZXksIHZhbCk7XHJcblx0fVxyXG5cclxuXHRkZWxldGUoa2V5KVxyXG5cdHtcclxuXHRcdHN0b3JlLnJlbW92ZShrZXkpO1xyXG5cdFx0cmV0dXJuIHN1cGVyLmRlbGV0ZShrZXkpO1xyXG5cdH1cclxuXHJcblx0Y2xlYXIoKVxyXG5cdHtcclxuXHRcdHN0b3JlLmVhY2goKHZhbCwga2V5KSA9PlxyXG5cdFx0e1xyXG5cdFx0XHRzdG9yZS5yZW1vdmUoa2V5KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiBzdXBlci5jbGVhcigpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2V0dGluZ3NNYW5hZ2VyO1xyXG4iLCJpbXBvcnQgeyBCSU5HTyB9IGZyb20gXCIuLi9nbG9iYWxzLmpzXCI7XHJcblxyXG4vKlxyXG4gKiBDYWxsb3V0IDwtIEFycmF5XHJcbiAqIEEgQ2FsbG91dCBpcyBhbiBhcnJheSB0aGF0IGNvbnRhaW5zIHZhcmlhdGlvbnMgZm9yIGEgc2luZ2xlIENhbGxvdXQuXHJcbiAqIElmIGEgQ2FsbG91dCBpcyByZXF1ZXN0ZWQgZm9yIFwiQjZcIiwgaXQgd2lsbCByZXR1cm4gYSByYW5kb20gc291bmQgdmFyaWF0aW9uIGZvciBcIkI2XCIuXHJcbiAqIFRvIGFjY2VzcyBhIHNwZWNpZmljIHZhcmlhdGlvbiwgc2ltcGx5IHVzZSB0aGUgaW5kZXggb3BlcmF0b3Igb24gdGhlIGFycmF5XHJcbiAqL1xyXG5jbGFzcyBDYWxsb3V0IGV4dGVuZHMgQXJyYXlcclxue1xyXG5cdGNvbnN0cnVjdG9yKGlkLCBjb2x1bW4pXHJcblx0e1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMuaWQgPSBpZDtcclxuXHRcdHRoaXMuY29sdW1uID0gY29sdW1uO1xyXG5cdH1cclxuXHJcblx0Ly8gcmV0dXJuIGEgcmFuZG9tIFZhcmlhdGlvblxyXG5cdHJhbmRvbSgpXHJcblx0e1xyXG5cdFx0cmV0dXJuIGB2b2ljZV8ke3RoaXMuY29sdW1uLmFubm91bmNlci5uYW1lfV8ke3RoaXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5sZW5ndGgpXX1gO1xyXG5cdH1cclxufVxyXG5cclxuLypcclxuICogQ29sdW1uIDwtIE1hcFxyXG4gKiBBIENvbHVtbiByZXByZXNlbnRzIGEgbGV0dGVyIGluIHRoZSB3b3JkICdCSU5HTycsIHdpdGggbWFwcGluZ3MgdG8gQ2FsbG91dHMuXHJcbiAqIFRvIGFjY2VzcyBhIGNhbGxvdXQ6IGA8Q2FsbG91dD4uZ2V0KE51bWJlcilgXHJcbiAqL1xyXG5jbGFzcyBDb2x1bW4gZXh0ZW5kcyBNYXBcclxue1xyXG5cdGNvbnN0cnVjdG9yKGxldHRlciwgdm9pY2VwYWNrKVxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLmxldHRlciA9IGxldHRlcjtcclxuXHRcdHRoaXMuaWQgPSBsZXR0ZXI7XHJcblx0XHR0aGlzLmFubm91bmNlciA9IHZvaWNlcGFjaztcclxuXHR9XHJcbn1cclxuXHJcbi8qXHJcbiAqIFZvaWNlcGFjayA8LSBNYXBcclxuICogQSBWb2ljZXBhY2sgY29uc2lzdHMgb2YgdGhlIGZvbGxvd2luZyBzdHJ1Y3R1cmU6XHJcbiAqIFZvaWNlcGFja1xyXG4gKiAgIC5bQnxJfE58R3xPXSA9IDxDb2x1bW4+ID0+IHtpZCwgPENhbGxvdXQ+fVxyXG4gKiAgIC5CSU5HTyA9IDxDYWxsb3V0PlxyXG4gKi9cclxuY2xhc3MgVm9pY2VwYWNrIGV4dGVuZHMgTWFwXHJcbntcclxuXHQvLyBkZWZpbmUgc2hvcnRoYW5kcyBmb3IgdGhlIG1hcCBjb2x1bW5zXHJcblx0Z2V0IEIoKVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLmdldChcIkJcIik7XHJcblx0fVxyXG5cdGdldCBJKClcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5nZXQoXCJJXCIpO1xyXG5cdH1cclxuXHRnZXQgTigpXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuZ2V0KFwiTlwiKTtcclxuXHR9XHJcblx0Z2V0IEcoKVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLmdldChcIkdcIik7XHJcblx0fVxyXG5cdGdldCBPKClcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5nZXQoXCJPXCIpO1xyXG5cdH1cclxuXHRnZXQgQklOR08oKVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLmdldChcIkJJTkdPXCIpO1xyXG5cdH1cclxuXHJcblx0Ly8gcXVldWVzIGFsbCB0aGUgZmlsZXMgZm9yIHRoZSB2b2ljZXBhY2sgdG8gYmUgbG9hZGVkIGJ5IFBoYXNlclxyXG5cdHByZWxvYWQobG9hZClcclxuXHR7XHJcblx0XHRjb25zdCBsb2FkVmFyaWF0aW9uID0gKHZhcmlhdGlvbikgPT5cclxuXHRcdHtcclxuXHRcdFx0Y29uc3QgZmlsZSA9IGB2b2ljZV8ke3RoaXMubmFtZX1fJHt2YXJpYXRpb259YDtcclxuXHRcdFx0bG9hZC5hdWRpbyhmaWxlLCBgJHt0aGlzLm5hbWV9LyR7dmFyaWF0aW9ufS5tcDNgKTtcclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gQklOR08hISFcclxuXHRcdGZvciAoY29uc3QgdmFyaWF0aW9uIG9mIHRoaXNbXCJCSU5HT1wiXS52YWx1ZXMoKSlcclxuXHRcdFx0bG9hZFZhcmlhdGlvbih2YXJpYXRpb24pO1xyXG5cclxuXHRcdC8vIDxWb2ljZXBhY2s+W1wiQlwiXSA9IDxDb2x1bW4+XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IEJJTkdPLmxlbmd0aDsgaSsrKVxyXG5cdFx0e1xyXG5cdFx0XHQvLyA8Q29sdW1uPlsxXSA9IDxDYWxsb3V0PlxyXG5cdFx0XHRmb3IgKGNvbnN0IGNhbGxvdXQgb2YgdGhpc1tCSU5HT1tpXV0udmFsdWVzKCkpXHJcblx0XHRcdHtcclxuXHRcdFx0XHQvLyA8Q2FsbG91dD4gPT0gPEFycmF5PlxyXG5cdFx0XHRcdC8vIHZhcmlhdGlvbiB3aWxsIGJlICd2b2ljZV88YW5ub3VuY2VyPi4nXHJcblx0XHRcdFx0Zm9yIChjb25zdCB2YXJpYXRpb24gb2YgY2FsbG91dClcclxuXHRcdFx0XHRcdGxvYWRWYXJpYXRpb24odmFyaWF0aW9uKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IobmFtZSA9IFwiZGV5YW5cIiwgbnVtYmVyc1BlckNvbHVtbiA9IDE1LCB2YXJpYXRpb25zID0gMylcclxuXHR7XHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdHRoaXMubmFtZSA9IG5hbWU7XHJcblx0XHR0aGlzLm51bWJlcnNQZXJDb2x1bW4gPSBudW1iZXJzUGVyQ29sdW1uO1xyXG5cdFx0dGhpcy52YXJpYXRpb25zID0gdmFyaWF0aW9ucztcclxuXHJcblx0XHR0aGlzLnNldChcIkJJTkdPXCIsIG5ldyBDYWxsb3V0KC0xLCBuZXcgQ29sdW1uKFwiQklOR09cIiwgdGhpcykpKTtcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdmFyaWF0aW9uczsgaSsrKVxyXG5cdFx0XHR0aGlzW1wiQklOR09cIl0ucHVzaChgQmluZ29fJHtpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgXCIwXCIpfWApO1xyXG5cclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgQklOR08ubGVuZ3RoOyBpKyspXHJcblx0XHR7XHJcblx0XHRcdGNvbnN0IGNvbCA9IEJJTkdPW2ldO1xyXG5cdFx0XHR0aGlzLnNldChjb2wsIG5ldyBDb2x1bW4oY29sLCB0aGlzKSk7XHJcblxyXG5cdFx0XHQvLyBzdGFydCB4IGF0IHRoZSBjYWxsb3V0IG51bWJlciBmb3IgZWFjaCBCSU5HTyBjb2x1bW4gKGkuZS4gMTYgZm9yIEkpXHJcblx0XHRcdGZvciAobGV0IHggPSAobnVtYmVyc1BlckNvbHVtbiAqIGkpICsgMTsgeCA8PSAobnVtYmVyc1BlckNvbHVtbiAqIGkpICsgbnVtYmVyc1BlckNvbHVtbjsgeCsrKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0Y29uc3QgY2FsbG91dCA9IG5ldyBDYWxsb3V0KHgsIHRoaXNbY29sXSk7XHJcblx0XHRcdFx0dGhpc1tjb2xdLnNldCh4LCBjYWxsb3V0KTtcclxuXHJcblx0XHRcdFx0Zm9yIChsZXQgeiA9IDA7IHogPCB2YXJpYXRpb25zOyB6KyspXHJcblx0XHRcdFx0XHQvLyBBIGZpbGVuYW1lIGhhcyB0aGUgc3RydWN0dXJlIG9mIGBbQnxJfE58R3xPXV8jI18jIy5tcDNgXHJcblx0XHRcdFx0XHRjYWxsb3V0LnB1c2goYCR7Y29sfV8ke2NhbGxvdXQuaWQudG9TdHJpbmcoKS5wYWRTdGFydCgyLCBcIjBcIil9XyR7ei50b1N0cmluZygpLnBhZFN0YXJ0KDIsIFwiMFwiKX1gKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVm9pY2VwYWNrO1xyXG4iLCJpbXBvcnQgXCJAYmFiZWwvcG9seWZpbGxcIjtcclxuaW1wb3J0ICogYXMgUGhhc2VyIGZyb20gXCJwaGFzZXJcIjtcclxuaW1wb3J0IFJleFVJUGx1Z2luIGZyb20gXCJwaGFzZXIzLXJleC1wbHVnaW5zL3RlbXBsYXRlcy91aS91aS1wbHVnaW4uanNcIjtcclxuXHJcbmltcG9ydCBTZXR0aW5nc01hbmFnZXIgZnJvbSBcIi4vY2xhc3Nlcy9TZXR0aW5nc01hbmFnZXIuanNcIjtcclxuaW1wb3J0IEF1ZGlvTWFuYWdlciBmcm9tIFwiLi9jbGFzc2VzL0F1ZGlvTWFuYWdlci5qc1wiO1xyXG5pbXBvcnQgQ29ubmVjdGlvbkhhbmRsZXIgZnJvbSBcIi4vY2xhc3Nlcy9Db25uZWN0aW9uSGFuZGxlci5qc1wiO1xyXG5pbXBvcnQgVm9pY2VwYWNrIGZyb20gXCIuL2NsYXNzZXMvVm9pY2VwYWNrLmpzXCI7XHJcblxyXG5pbXBvcnQgU2NlbmVfUHJlbG9hZCBmcm9tIFwiLi9zY2VuZXMvU2NlbmVfUHJlbG9hZC5qc1wiO1xyXG5pbXBvcnQgU2NlbmVfTWVudV9NYWluIGZyb20gXCIuL3NjZW5lcy9TY2VuZV9NZW51X01haW4uanNcIjtcclxuaW1wb3J0IFNjZW5lX01lbnVfU2V0dGluZ3MgZnJvbSBcIi4vc2NlbmVzL1NjZW5lX01lbnVfU2V0dGluZ3MuanNcIjtcclxuaW1wb3J0IFNjZW5lX01lbnVfTGVhZGVyYm9hcmQgZnJvbSBcIi4vc2NlbmVzL1NjZW5lX01lbnVfTGVhZGVyYm9hcmQuanNcIjtcclxuaW1wb3J0IFNjZW5lX01lbnVfQ3JlZGl0cyBmcm9tIFwiLi9zY2VuZXMvU2NlbmVfTWVudV9DcmVkaXRzLmpzXCI7XHJcbmltcG9ydCBTY2VuZV9NZW51X0xvYmJpZXMgZnJvbSBcIi4vc2NlbmVzL1NjZW5lX01lbnVfTG9iYmllcy5qc1wiO1xyXG5pbXBvcnQgU2NlbmVfTWVudV9Mb2JieSBmcm9tIFwiLi9zY2VuZXMvU2NlbmVfTWVudV9Mb2JieS5qc1wiO1xyXG5pbXBvcnQgU2NlbmVfTWF0Y2ggZnJvbSBcIi4vc2NlbmVzL1NjZW5lX01hdGNoLmpzXCI7XHJcblxyXG5BcnJheS5wcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbihpdGVtKVxyXG57XHJcblx0cmV0dXJuIHRoaXMuaW5jbHVkZXMoaXRlbSk7XHJcbn07XHJcbkFycmF5LnByb3RvdHlwZS5maXJzdCA9IGZ1bmN0aW9uKClcclxue1xyXG5cdHJldHVybiB0aGlzWzBdO1xyXG59O1xyXG5BcnJheS5wcm90b3R5cGUubGFzdCA9IGZ1bmN0aW9uKClcclxue1xyXG5cdHJldHVybiB0aGlzW3RoaXMubGVuZ3RoIC0gMV07XHJcbn07XHJcbkFycmF5LnByb3RvdHlwZS5yYW5kb20gPSBmdW5jdGlvbigpXHJcbntcclxuXHRyZXR1cm4gdGhpc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmxlbmd0aCldO1xyXG59O1xyXG5BcnJheS5wcm90b3R5cGUuc2h1ZmZsZSA9IGZ1bmN0aW9uKClcclxue1xyXG5cdC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xMjY0Njg2NFxyXG5cdGZvciAobGV0IGkgPSB0aGlzLmxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pXHJcblx0e1xyXG5cdFx0Y29uc3QgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xyXG5cdFx0W3RoaXNbaV0sIHRoaXNbal1dID0gW3RoaXNbal0sIHRoaXNbaV1dO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5jbGFzcyBCaW5nbyBleHRlbmRzIFBoYXNlci5HYW1lXHJcbntcclxuXHRjb25zdHJ1Y3RvcihhbmNob3IgPSBcImdhbWUtYW5jaG9yXCIpXHJcblx0e1xyXG5cdFx0c3VwZXIoe1xyXG5cdFx0XHR0eXBlOiBQaGFzZXIuQVVUTyxcclxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIiNmZmZmZmZcIixcclxuXHRcdFx0YXVkaW86IHtcclxuXHRcdFx0XHRkaXNhYmxlV2ViQXVkaW86IHRydWVcclxuXHRcdFx0fSxcclxuXHRcdFx0c2NhbGU6IHtcclxuXHRcdFx0XHRwYXJlbnQ6IGFuY2hvci5yZXBsYWNlKC9eIy8sIFwiXCIpLFxyXG5cdFx0XHRcdG1vZGU6IFBoYXNlci5TY2FsZS5GSVQsXHJcblx0XHRcdFx0YXV0b0NlbnRlcjogUGhhc2VyLlNjYWxlLkNFTlRFUl9CT1RILFxyXG5cdFx0XHRcdHdpZHRoOiAxMjgwLFxyXG5cdFx0XHRcdGhlaWdodDogNzIwXHJcblx0XHRcdH0sXHJcblx0XHRcdHNjZW5lOiBbXHJcblx0XHRcdFx0U2NlbmVfUHJlbG9hZCxcclxuXHRcdFx0XHRTY2VuZV9NZW51X01haW4sXHJcblx0XHRcdFx0U2NlbmVfTWVudV9TZXR0aW5ncyxcclxuXHRcdFx0XHRTY2VuZV9NZW51X0xlYWRlcmJvYXJkLFxyXG5cdFx0XHRcdFNjZW5lX01lbnVfQ3JlZGl0cyxcclxuXHRcdFx0XHRTY2VuZV9NZW51X0xvYmJpZXMsXHJcblx0XHRcdFx0U2NlbmVfTWVudV9Mb2JieSxcclxuXHRcdFx0XHRTY2VuZV9NYXRjaFxyXG5cdFx0XHRdLFxyXG5cdFx0XHRwaHlzaWNzOiB7XHJcblx0XHRcdFx0ZGVmYXVsdDogXCJhcmNhZGVcIixcclxuXHRcdFx0XHRhcmNhZGU6IHtcclxuXHRcdFx0XHRcdGRlYnVnOiBmYWxzZSxcclxuXHRcdFx0XHRcdGdyYXZpdHk6IHt9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRjYWxsYmFja3M6IHtcclxuXHRcdFx0XHRwcmVCb290OiAoZ2FtZSkgPT5cclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRnYW1lLnNldHRpbmdzID0gbmV3IFNldHRpbmdzTWFuYWdlcigpO1xyXG5cdFx0XHRcdFx0Z2FtZS5hdWRpbyA9IG5ldyBBdWRpb01hbmFnZXIoZ2FtZSwgWyBcIm11c2ljXCIsIFwidm9pY2VcIiwgXCJlZmZlY3RzXCIgXSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRwbHVnaW5zOiB7XHJcblx0XHRcdFx0c2NlbmU6IFt7XHJcblx0XHRcdFx0XHRrZXk6IFwicmV4VUlcIixcclxuXHRcdFx0XHRcdHBsdWdpbjogUmV4VUlQbHVnaW4sXHJcblx0XHRcdFx0XHRtYXBwaW5nOiBcInJleFVJXCJcclxuXHRcdFx0XHR9XVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLnhwID0gMDtcclxuXHRcdHRoaXMuc2NvcmUgPSAwO1xyXG5cclxuXHRcdHRoaXMuYW5ub3VuY2VyID0gbmV3IFZvaWNlcGFjaygpO1xyXG5cdFx0dGhpcy5jb25uZWN0aW9uID0gbmV3IENvbm5lY3Rpb25IYW5kbGVyKHRoaXMpO1xyXG5cdH1cclxufVxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+XHJcbntcclxuXHRuZXcgQmluZ28oXCIjcGhhc2VyLWdhbWVcIik7XHJcblxyXG5cdC8vIERpc2FibGUgdGhlIFJNQiBjb250ZXh0IG1lbnUgaW4gdGhlIGdhbWVcclxuXHQvKmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGhhc2VyLWdhbWVcIikub25jb250ZXh0bWVudSA9IGZ1bmN0aW9uKGUpXHJcblx0e1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHR9OyovXHJcbn0pO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRCSU5HTzogXCJCSU5HT1wiLFxyXG5cdEJVVFRPTl9XSURUSDogMTYwXHJcbn07XHJcbiIsImltcG9ydCAqIGFzIFBoYXNlciBmcm9tIFwicGhhc2VyXCI7XHJcblxyXG5pbXBvcnQgeyBCSU5HTyB9IGZyb20gXCIuLi9nbG9iYWxzLmpzXCI7XHJcblxyXG5pbXBvcnQgQnV0dG9uIGZyb20gXCIuL2J1dHRvbnMvQnV0dG9uLmpzXCI7XHJcbmltcG9ydCBUZXh0T3ZlcmxheSBmcm9tIFwiLi9idXR0b25zL292ZXJsYXlzL1RleHRPdmVybGF5LmpzXCI7XHJcblxyXG5jbGFzcyBCYWxsIGV4dGVuZHMgQnV0dG9uXHJcbntcclxuXHRzdGF0aWMgcHJlbG9hZChsb2FkKVxyXG5cdHtcclxuXHRcdGxvYWQuc2V0UGF0aChcImFzc2V0cy9pbWcvYmFsbHMvXCIpO1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspXHJcblx0XHRcdGxvYWQuaW1hZ2UoYGJhbGxfJHtCSU5HT1tpXX1gLCBgYmFsbF8ke0JJTkdPW2ldfS5wbmdgKTtcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKHNjZW5lLCBjb2x1bW4sIG51bWJlciwgZGF0YSA9IHt9KVxyXG5cdHtcclxuXHRcdGNvbnN0IHNhbXBsZUJhbGwgPSBuZXcgUGhhc2VyLkdhbWVPYmplY3RzLkltYWdlKHNjZW5lLCAwLCAwLCBcImJhbGxfQlwiKTtcclxuXHRcdHN1cGVyKE9iamVjdC5hc3NpZ24oe1xyXG5cdFx0XHRzY2VuZSxcclxuXHRcdFx0dGV4dHVyZTogYGJhbGxfJHtjb2x1bW59YCxcclxuXHRcdFx0b3ZlcmxheTogbmV3IFRleHRPdmVybGF5KHNjZW5lLCBudW1iZXIudG9TdHJpbmcoKSwge1xyXG5cdFx0XHRcdHk6IHNhbXBsZUJhbGwuZGlzcGxheUhlaWdodCAqIC4xNFxyXG5cdFx0XHR9KVxyXG5cdFx0fSwgZGF0YSkpO1xyXG5cclxuXHRcdHRoaXMub3ZlcmxheS50ZXh0LnNldFN0cm9rZShcIiMwMDBcIiwgOCk7XHJcblxyXG5cdFx0dGhpcy5jb2x1bW4gPSBjb2x1bW47XHJcblx0XHR0aGlzLm51bWJlciA9IG51bWJlcjtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJhbGw7XHJcbiIsImltcG9ydCAqIGFzIFBoYXNlciBmcm9tIFwicGhhc2VyXCI7XHJcblxyXG5pbXBvcnQgQmFsbCBmcm9tIFwiLi9CYWxsLmpzXCI7XHJcblxyXG5jbGFzcyBCYWxsUXVldWUgZXh0ZW5kcyBQaGFzZXIuR2FtZU9iamVjdHMuQ29udGFpbmVyXHJcbntcclxuXHRzdGF0aWMgcHJlbG9hZChsb2FkKVxyXG5cdHtcclxuXHRcdGxvYWQuc2V0UGF0aChcImFzc2V0cy9pbWcvYmFsbHMvXCIpO1xyXG5cdFx0bG9hZC5pbWFnZShcImJnX2JhbGxRdWV1ZTFcIiwgXCJiZ19iYWxsUXVldWUxLnBuZ1wiKTtcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKGRhdGEpXHJcblx0e1xyXG5cdFx0c3VwZXIoZGF0YS5zY2VuZSwgZGF0YS54LCBkYXRhLnkpO1xyXG5cclxuXHRcdHRoaXMuYmFsbHMgPSBbXTtcclxuXHJcblx0XHR0aGlzLmJnID0gbmV3IFBoYXNlci5HYW1lT2JqZWN0cy5JbWFnZSh0aGlzLnNjZW5lLCAwLCAwLCBcImJnX2JhbGxRdWV1ZTFcIik7XHJcblx0XHR0aGlzLmFkZCh0aGlzLmJnKTtcclxuXHR9XHJcblxyXG5cdGNyZWF0ZUJhbGwobGV0dGVyLCBudW1iZXIpXHJcblx0e1xyXG5cdFx0cmV0dXJuIG5ldyBCYWxsKHRoaXMuc2NlbmUsIGxldHRlciwgbnVtYmVyLCB7XHJcblx0XHRcdHk6IC10aGlzLmJnLmRpc3BsYXlIZWlnaHQgKiAuNlxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRwdXNoKGJhbGwpXHJcblx0e1xyXG5cdFx0bGV0IG9sZEJhbGw7XHJcblx0XHRpZiAodGhpcy5iYWxscy5sZW5ndGggPT09IDUpXHJcblx0XHRcdG9sZEJhbGwgPSB0aGlzLmJhbGxzLnNoaWZ0KCk7XHJcblx0XHR0aGlzLnJlbW92ZShvbGRCYWxsLCB0cnVlKTtcclxuXHJcblx0XHR0aGlzLmJhbGxzLnB1c2goYmFsbCk7XHJcblx0XHR0aGlzLmFkZChiYWxsKTtcclxuXHJcblx0XHR0aGlzLnNjZW5lLnR3ZWVucy5hZGQoe1xyXG5cdFx0XHR0YXJnZXRzOiB0aGlzLmJhbGxzLFxyXG5cdFx0XHRlYXNlOiBcIkJvdW5jZS5lYXNlT3V0XCIsXHJcblx0XHRcdHk6IFwiKz1cIiArIHRoaXMuYmcuZGlzcGxheUhlaWdodCAqIC4yLFxyXG5cdFx0XHRkdXJhdGlvbjogMzAwMFxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRyZXNldCgpXHJcblx0e1xyXG5cdFx0Zm9yIChjb25zdCBiYWxsIG9mIHRoaXMuYmFsbHMpXHJcblx0XHRcdGJhbGwuZGVzdHJveSgpO1xyXG5cdFx0dGhpcy5iYWxscyA9IFtdO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmFsbFF1ZXVlO1xyXG4iLCJpbXBvcnQgKiBhcyBQaGFzZXIgZnJvbSBcInBoYXNlclwiO1xyXG5cclxuaW1wb3J0IHsgQklOR08sIEJVVFRPTl9XSURUSCB9IGZyb20gXCIuLi9nbG9iYWxzLmpzXCI7XHJcbmltcG9ydCBCaW5nb051bWJlckdlbmVyYXRvciBmcm9tIFwiLi4vY2xhc3Nlcy9CaW5nb051bWJlckdlbmVyYXRvci5qc1wiO1xyXG5pbXBvcnQgQnV0dG9uIGZyb20gXCIuL2J1dHRvbnMvQnV0dG9uLmpzXCI7XHJcbmltcG9ydCBDYXJkVGlsZSBmcm9tIFwiLi9DYXJkVGlsZS5qc1wiO1xyXG5pbXBvcnQgSW1hZ2VPdmVybGF5IGZyb20gXCIuL2J1dHRvbnMvb3ZlcmxheXMvSW1hZ2VPdmVybGF5LmpzXCI7XHJcblxyXG5jbGFzcyBDYXJkIGV4dGVuZHMgUGhhc2VyLkdhbWVPYmplY3RzLkNvbnRhaW5lclxyXG57XHJcblx0c3RhdGljIHByZWxvYWQobG9hZClcclxuXHR7XHJcblx0XHRsb2FkLnNldFBhdGgoXCJhc3NldHMvaW1nL2NhcmQvXCIpO1xyXG5cclxuXHRcdC8vIEJJTkdPIFRpbGVzXHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKylcclxuXHRcdFx0bG9hZC5pbWFnZShgdGlsZV8ke0JJTkdPW2ldfWAsIGB0aWxlXyR7QklOR09baV19LnBuZ2ApO1xyXG5cclxuXHRcdC8vIEJ1dHRvbiBUaWxlIEJhY2tncm91bmRzXHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKylcclxuXHRcdFx0bG9hZC5pbWFnZShgYmdfdGlsZV8ke0JJTkdPW2ldfWAsIGBiZ190aWxlXyR7QklOR09baV19LnBuZ2ApO1xyXG5cdH1cclxuXHJcblx0X2dlbmVyYXRlQmluZ29Sb3coKVxyXG5cdHtcclxuXHRcdGNvbnN0IEJJTkdPX1JPV19TVEFSVF9YID0gMCAtIChNYXRoLmZsb29yKEJJTkdPLmxlbmd0aCAvIDIpICogQlVUVE9OX1dJRFRIKVxyXG5cdFx0XHQsIEJJTkdPX1JPV19TVEFSVF9ZID0gMDtcclxuXHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IEJJTkdPLmxlbmd0aDsgaSsrKVxyXG5cdFx0e1xyXG5cdFx0XHRjb25zdCBidXR0b24gPSBuZXcgQnV0dG9uKHtcclxuXHRcdFx0XHRzY2VuZTogdGhpcy5zY2VuZSxcclxuXHRcdFx0XHR4OiBCSU5HT19ST1dfU1RBUlRfWCArIChCVVRUT05fV0lEVEggKiBpKSxcclxuXHRcdFx0XHR5OiBCSU5HT19ST1dfU1RBUlRfWSxcclxuXHRcdFx0XHR0ZXh0dXJlOiBgdGlsZV8ke0JJTkdPW2ldfWBcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHR0aGlzLmFkZChidXR0b24pO1xyXG5cdFx0XHR0aGlzLmJ1dHRvbnMuYmluZ28ucHVzaChidXR0b24pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0X2dlbmVyYXRlQ2FyZFRpbGVzKClcclxuXHR7XHJcblx0XHRjb25zdCBST1dfU1RBUlRfWCA9IDAgLSAoTWF0aC5mbG9vcihCSU5HTy5sZW5ndGggLyAyKSAqIEJVVFRPTl9XSURUSClcclxuXHRcdFx0LCBST1dfU1RBUlRfWSA9IEJVVFRPTl9XSURUSDtcclxuXHJcblx0XHRmb3IgKGxldCB4ID0gMDsgeCA8IEJJTkdPLmxlbmd0aDsgeCsrKVxyXG5cdFx0e1xyXG5cdFx0XHRjb25zdCBjb2x1bW4gPSBCSU5HT1t4XTtcclxuXHRcdFx0Zm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmNvbExlbmd0aDsgeSsrKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0Y29uc3QgeyBudW1iZXIgfSA9IHRoaXMuZ2VuZXJhdG9yLnJhbmRvbShjb2x1bW4pO1xyXG5cdFx0XHRcdGxldCBidXR0b247XHJcblxyXG5cdFx0XHRcdC8vIHNraXAgKGNlbnRlciwgY2VudGVyKSBidXR0b25cclxuXHRcdFx0XHRpZiAoeCA9PT0gTWF0aC5mbG9vcihCSU5HTy5sZW5ndGggLyAyKSAmJiB5ID09PSBNYXRoLmZsb29yKHRoaXMuY29sTGVuZ3RoIC8gMikpXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0YnV0dG9uID0gbmV3IEJ1dHRvbih7XHJcblx0XHRcdFx0XHRcdHNjZW5lOiB0aGlzLnNjZW5lLFxyXG5cdFx0XHRcdFx0XHR4OiBST1dfU1RBUlRfWCArICh4ICogQlVUVE9OX1dJRFRIKSxcclxuXHRcdFx0XHRcdFx0eTogUk9XX1NUQVJUX1kgKyAoeSAqIEJVVFRPTl9XSURUSCksXHJcblx0XHRcdFx0XHRcdHRleHR1cmU6IGBiZ190aWxlXyR7QklOR09beF19YCxcclxuXHRcdFx0XHRcdFx0b3ZlcmxheTogbmV3IEltYWdlT3ZlcmxheSh0aGlzLnNjZW5lLCBcInN0YXJcIikuc2V0U2NhbGUoLjgpXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGVsc2VcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRidXR0b24gPSBuZXcgQ2FyZFRpbGUoe1xyXG5cdFx0XHRcdFx0XHRjYXJkOiB0aGlzLFxyXG5cdFx0XHRcdFx0XHRzY2VuZTogdGhpcy5zY2VuZSxcclxuXHRcdFx0XHRcdFx0eDogUk9XX1NUQVJUX1ggKyAoeCAqIEJVVFRPTl9XSURUSCksXHJcblx0XHRcdFx0XHRcdHk6IFJPV19TVEFSVF9ZICsgKHkgKiBCVVRUT05fV0lEVEgpLFxyXG5cdFx0XHRcdFx0XHR0ZXh0dXJlOiBgYmdfdGlsZV8ke0JJTkdPW3hdfWAsXHJcblx0XHRcdFx0XHRcdG51bWJlclxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR0aGlzLmJ1dHRvbnMudGlsZXNbY29sdW1uXS5wdXNoKGJ1dHRvbik7XHJcblx0XHRcdFx0dGhpcy5hZGQoYnV0dG9uKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3Ioc2NlbmUsIHgsIHksIGNvbExlbmd0aCA9IDUpXHJcblx0e1xyXG5cdFx0c3VwZXIoc2NlbmUsIHgsIHkpO1xyXG5cdFx0dGhpcy5jb2xMZW5ndGggPSBjb2xMZW5ndGg7XHJcblxyXG5cdFx0dGhpcy5nZW5lcmF0b3IgPSBuZXcgQmluZ29OdW1iZXJHZW5lcmF0b3IoKTtcclxuXHRcdHRoaXMuYmluZ29zID0ge1xyXG5cdFx0XHRjb2x1bW5zOiBbXSxcclxuXHRcdFx0cm93czogW11cclxuXHRcdH07XHJcblx0XHR0aGlzLmJ1dHRvbnMgPSB7XHJcblx0XHRcdGJpbmdvOiBbXSxcclxuXHRcdFx0dGlsZXM6IHtcclxuXHRcdFx0XHRcIkJcIjogW10sXHJcblx0XHRcdFx0XCJJXCI6IFtdLFxyXG5cdFx0XHRcdFwiTlwiOiBbXSxcclxuXHRcdFx0XHRcIkdcIjogW10sXHJcblx0XHRcdFx0XCJPXCI6IFtdXHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy5fZ2VuZXJhdGVCaW5nb1JvdygpO1xyXG5cdFx0dGhpcy5fZ2VuZXJhdGVDYXJkVGlsZXMoKTtcclxuXHR9XHJcblxyXG5cdF9nZXRUaWxlKG51bWJlcilcclxuXHR7XHJcblx0XHRmb3IgKGNvbnN0IGNvbHVtbiBvZiBPYmplY3QudmFsdWVzKHRoaXMuYnV0dG9ucy50aWxlcykpXHJcblx0XHR7XHJcblx0XHRcdGNvbnN0IHRpbGUgPSBjb2x1bW4uZmluZCh4ID0+IHgubnVtYmVyID09PSBudW1iZXIpO1xyXG5cdFx0XHRpZiAoIXRpbGUpXHJcblx0XHRcdFx0Y29udGludWU7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGlsZTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdF9nZXRUaWxlQXQoeCwgeSlcclxuXHR7XHJcblx0XHRjb25zb2xlLmxvZyhCSU5HT1t4XSwgeSk7XHJcblx0XHRyZXR1cm4gdGhpcy5idXR0b25zLnRpbGVzW0JJTkdPW3hdXVt5XTtcclxuXHR9XHJcblxyXG5cdF9nZXRDb29yZGluYXRlKG51bWJlcilcclxuXHR7XHJcblx0XHRjb25zdCBjb2x1bW4gPSBCSU5HT1tNYXRoLmZsb29yKChNYXRoLm1heCgwLCBudW1iZXIpIC0gMSkgLyB0aGlzLmdlbmVyYXRvci5tYXhQZXJDb2x1bW4pXVxyXG5cdFx0XHQsIGluZGV4ID0gdGhpcy5idXR0b25zLnRpbGVzW2NvbHVtbl0uZmluZEluZGV4KHRpbGUgPT4gdGlsZS5udW1iZXIgPT09IG51bWJlcik7XHJcblxyXG5cdFx0aWYgKGluZGV4ID09PSAtMSlcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0eDogQklOR08uaW5kZXhPZihjb2x1bW4pLFxyXG5cdFx0XHR5OiBpbmRleFxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdF9kZXRlcm1pbmVCaW5nbyh0aWxlKVxyXG5cdHtcclxuXHRcdGNvbnN0IHsgeCwgeSB9ID0gdGhpcy5fZ2V0Q29vcmRpbmF0ZSh0aWxlLm51bWJlcik7XHJcblx0XHRjb25zb2xlLmxvZyh4LCB5KTtcclxuXHJcblx0XHQvLyBob3Jpem9udGFsXHJcblx0XHRsZXQgaG9yaXpvbnRhbCA9IFtdO1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbExlbmd0aDsgaSsrKVxyXG5cdFx0e1xyXG5cdFx0XHRjb25zdCB0aWxlID0gdGhpcy5fZ2V0VGlsZUF0KGksIHkpO1xyXG5cdFx0XHRpZiAodGlsZS5jb21wbGV0ZWQpXHJcblx0XHRcdFx0aG9yaXpvbnRhbC5wdXNoKHRpbGUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIHZlcnRpY2FsXHJcblx0XHRsZXQgdmVydGljYWwgPSBbXTtcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5idXR0b25zLmJpbmdvLmxlbmd0aDsgaSsrKVxyXG5cdFx0e1xyXG5cdFx0XHRjb25zdCB0aWxlID0gdGhpcy5fZ2V0VGlsZUF0KHgsIGkpO1xyXG5cdFx0XHRpZiAodGlsZS5jb21wbGV0ZWQpXHJcblx0XHRcdFx0dmVydGljYWwucHVzaCh0aWxlKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoaG9yaXpvbnRhbC5sZW5ndGggPT09IHRoaXMuYnV0dG9ucy5iaW5nby5sZW5ndGgpXHJcblx0XHRcdHRoaXMuYmluZ29zLnJvd3MucHVzaCh5KTtcclxuXHJcblx0XHRpZiAodmVydGljYWwubGVuZ3RoID09PSB0aGlzLmJ1dHRvbnMuYmluZ28ubGVuZ3RoKVxyXG5cdFx0XHR0aGlzLmJpbmdvcy5jb2x1bW5zLnB1c2goeCk7XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0aG9yaXpvbnRhbDogaG9yaXpvbnRhbC5sZW5ndGggPT09IHRoaXMuY29sTGVuZ3RoID8gaG9yaXpvbnRhbCA6IG51bGwsXHJcblx0XHRcdHZlcnRpY2FsOiB2ZXJ0aWNhbC5sZW5ndGggPT09IHRoaXMuYnV0dG9ucy5iaW5nby5sZW5ndGggPyB2ZXJ0aWNhbCA6IG51bGxcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHQvLyByZXR1cm5zIHRoZSBhbW91bnQgb2YgYmluZ29zIGFjaGlldmVkXHJcblx0cGxheShudW1iZXIpXHJcblx0e1xyXG5cdFx0Y29uc3QgdGlsZSA9IHRoaXMuX2dldFRpbGUobnVtYmVyKTtcclxuXHJcblx0XHQvLyBudW1iZXIgZXhpc3RzIGFzIHRpbGUgb24gdGhpcyBjYXJkXHJcblx0XHRpZiAoIXRpbGUpXHJcblx0XHRcdHJldHVybiBjb25zb2xlLndhcm4oXCJBdHRlbXB0ZWQgdG8gcGxheSgpIGEgbm9uLWV4aXN0aW5nIG51bWJlciBvbiBDYXJkXCIpO1xyXG5cclxuXHRcdC8vIG51bWJlciBleGlzdHMgYXMgYW4gYWN0aXZlIGJhbGwgaW4gdGhlIEJhbGxRdWV1ZVxyXG5cdFx0aWYgKCF0aGlzLnNjZW5lLnF1ZXVlLmJhbGxzLnNvbWUoYiA9PiBiLm51bWJlciA9PT0gbnVtYmVyKSlcclxuXHRcdFx0cmV0dXJuIGNvbnNvbGUud2FybihcIkNsaWNrZWQgb24gYSBudW1iZXIgbm90IHByZXNlbnQgaW4gdGhlIEJhbGxRdWV1ZVwiKTtcclxuXHJcblx0XHR0aWxlLmNvbXBsZXRlKCk7XHJcblx0XHRyZXR1cm4gT2JqZWN0LnZhbHVlcyh0aGlzLl9kZXRlcm1pbmVCaW5nbyh0aWxlKSkuZmlsdGVyKHggPT4geCAhPSBudWxsKS5sZW5ndGg7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDYXJkO1xyXG4iLCJpbXBvcnQgKiBhcyBQaGFzZXIgZnJvbSBcInBoYXNlclwiO1xyXG5cclxuaW1wb3J0IHsgQlVUVE9OX1dJRFRIIH0gZnJvbSBcIi4uL2dsb2JhbHMuanNcIjtcclxuaW1wb3J0IENhcmQgZnJvbSBcIi4vQ2FyZC5qc1wiO1xyXG5cclxuY2xhc3MgQ2FyZEhvbGRlciBleHRlbmRzIFBoYXNlci5HYW1lT2JqZWN0cy5Db250YWluZXJcclxue1xyXG5cdGNvbnN0cnVjdG9yKGNhcmRzQW1vdW50LCBzY2VuZSwgeCwgeSlcclxuXHR7XHJcblx0XHRzdXBlcihzY2VuZSwgeCwgeSk7XHJcblxyXG5cdFx0dGhpcy5jYXJkcyA9IFtdO1xyXG5cdFx0Y29uc3QgZ2V0Q2FyZFBvc2l0aW9uID0gKGFtb3VudCwgcGFkZGluZyA9IDApID0+XHJcblx0XHR7XHJcblx0XHRcdHBhZGRpbmcgLz0gMjtcclxuXHRcdFx0Y29uc3QgQ0FSRF9XSURUSCA9IEJVVFRPTl9XSURUSCAqIDUgLyAyXHJcblx0XHRcdFx0LCBDQVJEX0hFSUdIVCA9IEJVVFRPTl9XSURUSCAqIDYgLyAyO1xyXG5cclxuXHRcdFx0aWYgKGFtb3VudCA9PT0gMSlcclxuXHRcdFx0XHRyZXR1cm4gW3tcclxuXHRcdFx0XHRcdHg6IDAsXHJcblx0XHRcdFx0XHR5OiAwLFxyXG5cdFx0XHRcdFx0c2NhbGU6IC43NVxyXG5cdFx0XHRcdH1dO1xyXG5cclxuXHRcdFx0aWYgKGFtb3VudCA9PT0gMilcclxuXHRcdFx0XHRyZXR1cm4gW1xyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHR4OiAwIC0gKENBUkRfV0lEVEggLyAyKSAtIHBhZGRpbmcgKiAzLFxyXG5cdFx0XHRcdFx0XHR5OiAwLFxyXG5cdFx0XHRcdFx0XHRzY2FsZTogLjZcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdHg6IDAgKyAoQ0FSRF9XSURUSCAvIDIpICsgcGFkZGluZyAqIDMsXHJcblx0XHRcdFx0XHRcdHk6IDAsXHJcblx0XHRcdFx0XHRcdHNjYWxlOiAuNlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdF07XHJcblxyXG5cdFx0XHRpZiAoYW1vdW50ID09PSAzKVxyXG5cdFx0XHRcdHJldHVybiBbXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdHg6IDAgLSAoQ0FSRF9XSURUSCAvIDIpIC0gcGFkZGluZyxcclxuXHRcdFx0XHRcdFx0eTogMCxcclxuXHRcdFx0XHRcdFx0c2NhbGU6IC41XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHR4OiAwICsgKENBUkRfV0lEVEggLyAyKSArIHBhZGRpbmcsXHJcblx0XHRcdFx0XHRcdHk6IDAsXHJcblx0XHRcdFx0XHRcdHNjYWxlOiAuNVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0eDogMCxcclxuXHRcdFx0XHRcdFx0eTogQ0FSRF9IRUlHSFQgKyBwYWRkaW5nLFxyXG5cdFx0XHRcdFx0XHRzY2FsZTogLjVcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRdO1xyXG5cclxuXHRcdFx0aWYgKGFtb3VudCA9PT0gNClcclxuXHRcdFx0XHRyZXR1cm4gW1xyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHR4OiAwIC0gKENBUkRfV0lEVEggLyAyKSAtIHBhZGRpbmcsXHJcblx0XHRcdFx0XHRcdHk6IDAsXHJcblx0XHRcdFx0XHRcdHNjYWxlOiAuNVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0eDogMCArIChDQVJEX1dJRFRIIC8gMikgKyBwYWRkaW5nLFxyXG5cdFx0XHRcdFx0XHR5OiAwLFxyXG5cdFx0XHRcdFx0XHRzY2FsZTogLjVcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdHg6IDAgLSAoQ0FSRF9XSURUSCAvIDIpIC0gcGFkZGluZyxcclxuXHRcdFx0XHRcdFx0eTogMCArIENBUkRfSEVJR0hUICsgcGFkZGluZyxcclxuXHRcdFx0XHRcdFx0c2NhbGU6IC41XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHR4OiAwICsgKENBUkRfV0lEVEggLyAyKSArIHBhZGRpbmcsXHJcblx0XHRcdFx0XHRcdHk6IDAgKyBDQVJEX0hFSUdIVCArIHBhZGRpbmcsXHJcblx0XHRcdFx0XHRcdHNjYWxlOiAuNVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdF07XHJcblx0XHR9O1xyXG5cclxuXHRcdGNvbnN0IGxheW91dHMgPSBnZXRDYXJkUG9zaXRpb24oY2FyZHNBbW91bnQsIDUwKTtcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgY2FyZHNBbW91bnQ7IGkrKylcclxuXHRcdHtcclxuXHRcdFx0Y29uc3QgY2FyZCA9IG5ldyBDYXJkKHRoaXMuc2NlbmUsIGxheW91dHNbaV0ueCwgbGF5b3V0c1tpXS55KTtcclxuXHRcdFx0Y2FyZC5zZXRTY2FsZShsYXlvdXRzW2ldLnNjYWxlKTtcclxuXHJcblx0XHRcdHRoaXMuYWRkKGNhcmQpO1xyXG5cdFx0XHR0aGlzLmNhcmRzLnB1c2goY2FyZCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZXRTY2FsZSguNik7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDYXJkSG9sZGVyO1xyXG4iLCJpbXBvcnQgQnV0dG9uIGZyb20gXCIuL2J1dHRvbnMvQnV0dG9uLmpzXCI7XHJcbmltcG9ydCBJbWFnZU92ZXJsYXkgZnJvbSBcIi4vYnV0dG9ucy9vdmVybGF5cy9JbWFnZU92ZXJsYXkuanNcIjtcclxuaW1wb3J0IFRleHRPdmVybGF5IGZyb20gXCIuL2J1dHRvbnMvb3ZlcmxheXMvVGV4dE92ZXJsYXkuanNcIjtcclxuXHJcbmNsYXNzIENhcmRUaWxlIGV4dGVuZHMgQnV0dG9uXHJcbntcclxuXHRzdGF0aWMgZ2V0IEJBU0VfU0NPUkUoKVxyXG5cdHtcclxuXHRcdHJldHVybiA1MDtcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKGRhdGEpXHJcblx0e1xyXG5cdFx0c3VwZXIoT2JqZWN0LmFzc2lnbihkYXRhLCB7XHJcblx0XHRcdG92ZXJsYXk6IG5ldyBUZXh0T3ZlcmxheShkYXRhLnNjZW5lLCBkYXRhLm51bWJlci50b1N0cmluZygpLCB7XHJcblx0XHRcdFx0dGV4dDoge1xyXG5cdFx0XHRcdFx0Zm9udFNpemU6IDgwLFxyXG5cdFx0XHRcdFx0Zm9udFN0eWxlOiBcImJvbGRcIlxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSksXHJcblx0XHRcdGRlZmF1bHRCdXR0b25Ib3ZlckV2ZW50czogdHJ1ZVxyXG5cdFx0fSkpO1xyXG5cclxuXHRcdHRoaXMub3ZlcmxheS50ZXh0LnNldFN0cm9rZShcIiMwMDBcIiwgNik7XHJcblxyXG5cdFx0dGhpcy5jYXJkID0gZGF0YS5jYXJkO1xyXG5cdFx0dGhpcy5udW1iZXIgPSBkYXRhLm51bWJlcjtcclxuXHRcdHRoaXMuY29tcGxldGVkID0gZmFsc2U7XHJcblxyXG5cdFx0dGhpcy5vbihcInBvaW50ZXJ1cFwiLCAoKSA9PlxyXG5cdFx0e1xyXG5cdFx0XHRjb25zb2xlLmxvZyhgQ2xpY2tlZCBvbiAke3RoaXMub3ZlcmxheS50ZXh0LnRleHR9YCk7XHJcblx0XHRcdHRoaXMub3ZlcmxheS53b2JibGUoLjY1KTtcclxuXHJcblx0XHRcdGNvbnN0IGJpbmdvcyA9IHRoaXMuY2FyZC5wbGF5KHRoaXMubnVtYmVyKTtcclxuXHRcdFx0aWYgKGJpbmdvcyA+IDApXHJcblx0XHRcdFx0dGhpcy5zY2VuZS5iaW5nbygpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRjb21wbGV0ZSgpXHJcblx0e1xyXG5cdFx0dGhpcy5jb21wbGV0ZWQgPSB0cnVlO1xyXG5cdFx0dGhpcy5zY2VuZS5nYW1lLmF1ZGlvLmVmZmVjdHMucGxheShcImF1ZGlvX2J1dHRvbl8wM1wiKTtcclxuXHRcdHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XHJcblx0XHR0aGlzLm92ZXJsYXkgPSBuZXcgSW1hZ2VPdmVybGF5KHRoaXMuc2NlbmUsIFwic3RhclwiKS5zZXRTY2FsZSguOCk7XHJcblx0XHR0aGlzLnNjZW5lLnNjb3JlLnRyYWNrZXIuc2NvcmUgKz0gQ2FyZFRpbGUuQkFTRV9TQ09SRTtcclxuXHRcdC8vIFRPRE86IFBsYXkgJ2NvbXBsZXRlZCcgYW5pbWF0aW9uIG9uIHRpbGVcclxuXHRcdC8vIFRPRE86IFBsYXkgJ2NvbXBsZXRlZCcgc291bmQgaW4gXCJlZmZlY3RzXCIgY2hhbm5lbFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2FyZFRpbGU7XHJcbiIsImltcG9ydCAqIGFzIFBoYXNlciBmcm9tIFwicGhhc2VyXCI7XHJcblxyXG5jbGFzcyBBbmltYXRpb25zIGV4dGVuZHMgUGhhc2VyLkdhbWVPYmplY3RzLkNvbnRhaW5lclxyXG57XHJcblx0Y29uc3RydWN0b3IoZGF0YSlcclxuXHR7XHJcblx0XHRzdXBlcihkYXRhLnNjZW5lLCBkYXRhLngsIGRhdGEueSk7XHJcblx0XHQvL0FOSU1BVElPTlxyXG5cdFx0Lyp0aGlzLmFuaW1zLmNyZWF0ZSh7XHJcblx0XHRcdGtleTpcIkNvbmZldHRpXCIsXHJcblx0XHRcdGZyYW1lczpcclxuXHRcdFx0dGhpcy5hbmltcy5nZW5lcmF0ZUZyYW1lTmFtZXMoXCJjb25mZXR0aVwiLFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHN0YXJ0OiAwLFxyXG5cdFx0XHRcdFx0ZW5kOiA1OSxcclxuXHRcdFx0XHRcdHplcm9QYWQ6MixcclxuXHRcdFx0XHRcdHByZWZpeDpcImNvbmZldHRpX1wiLFxyXG5cdFx0XHRcdFx0c3VmZml4OlwiLnBuZ1wiXHJcblx0XHRcdFx0fSksXHJcblx0XHRcdGZyYW1lUmF0ZTozMCxcclxuXHRcdFx0cmVwZWF0OjAsXHJcblx0XHRcdGhpZGVPbkNvbXBsZXRlOiB0cnVlLFxyXG5cdFx0fSk7XHJcblx0XHR0aGlzLmNvbmZldHRpPXRoaXMuYWRkLnNwcml0ZSh0aGlzLndpZHRoIC8gMix0aGlzLmhlaWdodCAvIDIsXCJjb25mZXR0aVwiKTtcclxuXHRcdHRoaXMuY29uZmV0dGkucGxheShcIkNvbmZldHRpXCIpKi9cclxuXHR9XHJcblx0X2NyZWF0ZUNvbmZldHRpKClcclxuXHR7XHJcblx0XHR0aGlzLmFuaW1zLmNyZWF0ZSh7XHJcblx0XHRcdGtleTogXCJDb25mZXR0aVwiLFxyXG5cdFx0XHRmcmFtZXM6IHRoaXMuYW5pbXMuZ2VuZXJhdGVGcmFtZU5hbWVzKFwiY29uZmV0dGlcIiwge3N0YXJ0OjAsIGVuZDo1OSwgemVyb1BhZDoyLCBwcmVmaXg6XCJjb25mZXR0aV9cIiwgc3VmZml4OlwiLnBuZ1wifSksXHJcblx0XHRcdGZyYW1lUmF0ZTozMCxcclxuXHRcdFx0cmVwZWF0OjAsXHJcblx0XHRcdGhpZGVPbkNvbXBsZXRlOiB0cnVlLFxyXG5cdFx0fSk7XHJcblx0XHR0aGlzLmNvbmZldHRpPXRoaXMuYWRkLnNwcml0ZSh0aGlzLndpZHRoIC8gMix0aGlzLmhlaWdodCAvIDIsXCJjb25mZXR0aVwiKTtcclxuXHRcdHRoaXMuY29uZmV0dGkucGxheShcIkNvbmZldHRpXCIpO1xyXG5cdH1cclxuXHRtYWtlQW5pbShrZXksZnJhbWVOYW1lKVxyXG5cdHtcclxuXHRcdGxldCBteUFycmF5ID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgNTg7IGkrKylcclxuXHRcdHtcclxuXHRcdFx0bGV0IGZuPWZyYW1lTmFtZSArIDEgKyBcIi5wbmdcIjtcclxuXHRcdFx0bXlBcnJheS5wdXNoKHtcclxuXHRcdFx0XHRrZXk6IGtleSxcclxuXHRcdFx0XHRmcmFtZTogZm5cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gbXlBcnJheTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFuaW1hdGlvbnM7XHJcbiIsImltcG9ydCAqIGFzIFBoYXNlciBmcm9tIFwicGhhc2VyXCI7XHJcbmltcG9ydCBUZXh0T3ZlcmxheSBmcm9tIFwiLi9idXR0b25zL292ZXJsYXlzL1RleHRPdmVybGF5LmpzXCI7XHJcblxyXG5jbGFzcyBMZWFkZXJib2FyZCBleHRlbmRzIFBoYXNlci5HYW1lT2JqZWN0cy5Db250YWluZXJcclxue1xyXG5cdGNvbnN0cnVjdG9yKGRhdGEpXHJcblx0e1xyXG5cdFx0c3VwZXIoZGF0YS5zY2VuZSwgZGF0YS54LCBkYXRhLnkpO1xyXG5cclxuXHRcdHRoaXMuc2NvcmVzID0ge307XHJcblx0XHR0aGlzLm5hbWUgPXt9O1xyXG5cdFx0dGhpcy5iZyA9IG5ldyBQaGFzZXIuR2FtZU9iamVjdHMuSW1hZ2UodGhpcy5zY2VuZSwgMCwgMCwgXCJwYW5lbF9sZWFkZXJib2FyZFwiKTtcclxuXHRcdHRoaXMuYWRkKHRoaXMuYmcpO1xyXG5cclxuXHRcdHRoaXMub3ZlcmxheSA9IG5ldyBUZXh0T3ZlcmxheSh0aGlzLnNjZW5lLCB0aGlzLnNjb3JlLnRvU3RyaW5nKCkpO1xyXG5cdFx0dGhpcy5vdmVybGF5LnkgLT0gODtcclxuXHRcdHRoaXMub3ZlcmxheS50ZXh0LnNldE9yaWdpbiguMDUsIC4zNSk7XHJcblx0XHR0aGlzLmFkZCh0aGlzLm92ZXJsYXkpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGVhZGVyYm9hcmQ7XHJcbiIsImltcG9ydCAqIGFzIFBoYXNlciBmcm9tIFwicGhhc2VyXCI7XHJcbmltcG9ydCB7IFNjcm9sbGFibGVQYW5lbCwgRml4V2lkdGhTaXplciB9IGZyb20gXCJwaGFzZXIzLXJleC1wbHVnaW5zL3RlbXBsYXRlcy91aS91aS1jb21wb25lbnRzLmpzXCI7XHJcbmltcG9ydCBSb3VuZFJlY3RhbmdsZSBmcm9tIFwicGhhc2VyMy1yZXgtcGx1Z2lucy9wbHVnaW5zL3JvdW5kcmVjdGFuZ2xlLmpzXCI7XHJcblxyXG5jbGFzcyBQbGF5ZXJsaXN0SXRlbSBleHRlbmRzIFBoYXNlci5HYW1lT2JqZWN0cy5Db250YWluZXJcclxue1xyXG5cdGNvbnN0cnVjdG9yKGRhdGEgPSB7fSlcclxuXHR7XHJcblx0XHRzdXBlcihkYXRhLmNvbnRhaW5lci5wbGF5ZXJsaXN0LnNjZW5lLCAwLCAwKTtcclxuXHJcblx0XHR0aGlzLmNvbnRhaW5lciA9IGRhdGEuY29udGFpbmVyO1xyXG5cdFx0dGhpcy5pZCA9IGRhdGEuaWQ7XHJcblx0XHR0aGlzLm5hbWUgPSBkYXRhLm5hbWU7XHJcblxyXG5cdFx0dGhpcy50ZXh0ID0gbmV3IFBoYXNlci5HYW1lT2JqZWN0cy5UZXh0KHRoaXMuc2NlbmUsIDAsIDAsIHRoaXMubmFtZSwge1xyXG5cdFx0XHRhbGlnbjogXCJsZWZ0XCIsXHJcblx0XHRcdGZvbnRTaXplOiAzMixcclxuXHRcdFx0Zm9udFN0eWxlOiBcImJvbGRcIlxyXG5cdFx0fSk7XHJcblx0XHR0aGlzLnRleHQuc2V0U3Ryb2tlKFwiIzAwMFwiLCA1KVxyXG5cdFx0XHQuc2V0T3JpZ2luKC41KTtcclxuXHRcdHRoaXMuYWRkKHRoaXMudGV4dCk7XHJcblxyXG5cdFx0dGhpcy5pbWFnZSA9IG5ldyBQaGFzZXIuR2FtZU9iamVjdHMuSW1hZ2UodGhpcy5zY2VuZSwgLTI0LCAwLCBkYXRhLnRleHR1cmUpO1xyXG5cdFx0dGhpcy5hZGQodGhpcy5pbWFnZSk7XHJcblx0fVxyXG5cclxuXHRkZXN0cm95KClcclxuXHR7XHJcblx0XHRzdXBlci5kZXN0cm95KCk7XHJcblxyXG5cdFx0Y29uc3QgaW5kZXggPSB0aGlzLmNvbnRhaW5lci5maW5kSW5kZXgocCA9PiBwLmlkID09PSB0aGlzLmlkKTtcclxuXHRcdGlmIChpbmRleCA9PT0gLTEpXHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdHJldHVybiB0aGlzLmNvbnRhaW5lci5zcGxpY2UoaW5kZXgsIDEpO1xyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgUGxheWVyQ29udGFpbmVyIGV4dGVuZHMgQXJyYXlcclxue1xyXG5cdGNvbnN0cnVjdG9yKGxpc3QpXHJcblx0e1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMucGxheWVybGlzdCA9IGxpc3Q7XHJcblx0fVxyXG5cclxuXHRhZGQocGxheWVyKVxyXG5cdHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PlxyXG5cdFx0e1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcIlBsYXllckNvbnRhaW5lci5hZGRcIiwgcGxheWVyLmlkLCB0aGlzKTtcclxuXHRcdFx0aWYgKHBsYXllci5wcm92aWRlciA9PT0gXCJkaXNjb3JkXCIpXHJcblx0XHRcdHtcclxuXHRcdFx0XHR0aGlzLnBsYXllcmxpc3QubG9hZC5vbihcImxvYWRlcnJvclwiLCBmaWxlID0+XHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0aWYgKGZpbGUuc3JjID09PSBwbGF5ZXIuYXZhdGFyVVJMKVxyXG5cdFx0XHRcdFx0XHRyZWplY3QoKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHR0aGlzLnBsYXllcmxpc3QubG9hZC5vbihcImZpbGVjb21wbGV0ZVwiLCBrZXkgPT5cclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRpZiAoa2V5ICE9PSBgYXZhdGFyXyR7cGxheWVyLmlkfWApXHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHJcblx0XHRcdFx0XHRjb25zdCBpdGVtID0gbmV3IFBsYXllcmxpc3RJdGVtKHtcclxuXHRcdFx0XHRcdFx0Y29udGFpbmVyOiB0aGlzLFxyXG5cdFx0XHRcdFx0XHR4OiAwLCB5OiAzNiAqIHRoaXMubGVuZ3RoLFxyXG5cdFx0XHRcdFx0XHRpZDogcGxheWVyLmlkLFxyXG5cdFx0XHRcdFx0XHRuYW1lOiBwbGF5ZXIudGFnLFxyXG5cdFx0XHRcdFx0XHR0ZXh0dXJlOiBrZXlcclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdHRoaXMucHVzaChpdGVtKTtcclxuXHRcdFx0XHRcdHRoaXMucGxheWVybGlzdC51cGRhdGUoKTtcclxuXHJcblx0XHRcdFx0XHRyZXNvbHZlKHRoaXMucGxheWVybGlzdCk7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdHRoaXMucGxheWVybGlzdC5sb2FkLmltYWdlKGBhdmF0YXJfJHtwbGF5ZXIuaWR9YCwgcGxheWVyLmF2YXRhclVSTCk7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMucGxheWVybGlzdC5sb2FkLnN0YXJ0KCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGVsc2VcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGNvbnN0IGl0ZW0gPSBuZXcgUGxheWVybGlzdEl0ZW0oe1xyXG5cdFx0XHRcdFx0Y29udGFpbmVyOiB0aGlzLFxyXG5cdFx0XHRcdFx0eDogMCwgeTogMzYgKiB0aGlzLmxlbmd0aCxcclxuXHRcdFx0XHRcdGlkOiBwbGF5ZXIuaWQsXHJcblx0XHRcdFx0XHRuYW1lOiBwbGF5ZXIudGFnLFxyXG5cdFx0XHRcdFx0dGV4dHVyZTogXCJhdmF0YXJfZ3Vlc3RcIlxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHR0aGlzLnB1c2goaXRlbSk7XHJcblx0XHRcdFx0dGhpcy5wbGF5ZXJsaXN0LnVwZGF0ZSgpO1xyXG5cclxuXHRcdFx0XHRyZXNvbHZlKHRoaXMucGxheWVybGlzdCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgUGxheWVybGlzdCBleHRlbmRzIFBoYXNlci5HYW1lT2JqZWN0cy5Db250YWluZXJcclxue1xyXG5cdHN0YXRpYyBwcmVsb2FkKGxvYWQpXHJcblx0e1xyXG5cdFx0bG9hZC5zZXRQYXRoKFwiYXNzZXRzL2ltZy9VSS9cIik7XHJcblx0XHQvLyBsb2FkLmltYWdlKFwiYXZhdGFyX2d1ZXN0XCIsIFwiYXZhdGFyX2d1ZXN0LnBuZ1wiKTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZSgpXHJcblx0e1xyXG5cdFx0Y29uc3Qgc2l6ZXIgPSB0aGlzLnBhbmVsLmdldEVsZW1lbnQoXCJwYW5lbFwiKTtcclxuXHJcblx0XHRzaXplci5jbGVhcih0cnVlKTtcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wbGF5ZXJzLmxlbmd0aDsgaSsrKVxyXG5cdFx0e1xyXG5cdFx0XHRpZiAoaSAhPT0gMClcclxuXHRcdFx0XHRzaXplci5hZGROZXdMaW5lKCk7XHJcblxyXG5cdFx0XHQvLyByZXhVSSBidWdzIG91dCBvbiBhZGRpbmcgY29udGFpbmVycyB0byBpdHMgY3VzdG9tIHNpemVyXHJcblx0XHRcdC8vIHNpemVyLmFkZCh0aGlzLnBsYXllcnNbaV0pO1xyXG5cdFx0XHRzaXplci5hZGQodGhpcy5wbGF5ZXJzW2ldLnRleHQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMucGFuZWwubGF5b3V0KCk7XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3RvcihkYXRhKVxyXG5cdHtcclxuXHRcdHN1cGVyKGRhdGEuc2NlbmUsIGRhdGEueCwgZGF0YS55KTtcclxuXHJcblx0XHR0aGlzLnBhbmVsID0gbmV3IFNjcm9sbGFibGVQYW5lbCh0aGlzLnNjZW5lLCBPYmplY3QuYXNzaWduKHtcclxuXHRcdFx0d2lkdGg6IDI1MCxcclxuXHRcdFx0aGVpZ2h0OiAyMjAsXHJcblxyXG5cdFx0XHRzY3JvbGxNb2RlOiAwLFxyXG5cclxuXHRcdFx0cGFuZWw6IHtcclxuXHRcdFx0XHRjaGlsZDogbmV3IEZpeFdpZHRoU2l6ZXIoZGF0YS5zY2VuZSwge1xyXG5cdFx0XHRcdFx0c3BhY2U6IHtcclxuXHRcdFx0XHRcdFx0bGVmdDogMyxcclxuXHRcdFx0XHRcdFx0cmlnaHQ6IDMsXHJcblx0XHRcdFx0XHRcdHRvcDogMyxcclxuXHRcdFx0XHRcdFx0Ym90dG9tOiAzLFxyXG5cdFx0XHRcdFx0XHRpdGVtOiA4LFxyXG5cdFx0XHRcdFx0XHRsaW5lOiA4LFxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pLFxyXG5cclxuXHRcdFx0XHRtYXNrOiB7XHJcblx0XHRcdFx0XHRwYWRkaW5nOiAxXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHNwYWNlOiB7XHJcblx0XHRcdFx0bGVmdDogMTAsXHJcblx0XHRcdFx0cmlnaHQ6IDEwLFxyXG5cdFx0XHRcdHRvcDogMTAsXHJcblx0XHRcdFx0Ym90dG9tOiAxMCxcclxuXHJcblx0XHRcdFx0cGFuZWw6IDEwLFxyXG5cdFx0XHR9XHJcblx0XHR9LCBkYXRhLnBhbmVsKSk7XHJcblx0XHR0aGlzLmFkZCh0aGlzLnBhbmVsLmxheW91dCgpKTtcclxuXHJcblx0XHR0aGlzLnBsYXllcnMgPSBuZXcgUGxheWVyQ29udGFpbmVyKHRoaXMpO1xyXG5cclxuXHRcdHRoaXMuc2NlbmUuYWRkLmV4aXN0aW5nKHRoaXMpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGxheWVybGlzdDtcclxuIiwiaW1wb3J0ICogYXMgUGhhc2VyIGZyb20gXCJwaGFzZXJcIjtcclxuXHJcbmltcG9ydCBTY2VuZV9QcmVsb2FkIGZyb20gXCIuLi9zY2VuZXMvU2NlbmVfUHJlbG9hZC5qc1wiO1xyXG5cclxuY2xhc3MgU2NlbmUgZXh0ZW5kcyBQaGFzZXIuU2NlbmVcclxue1xyXG5cdHN0YXRpYyBwcmVsb2FkKGxvYWQpXHJcblx0e1xyXG5cdFx0Ly8gV2FsbHBhcGVyc1xyXG5cdFx0bG9hZC5zZXRQYXRoKFwiL2Fzc2V0cy9pbWcvd2FsbHBhcGVycy9cIik7XHJcblx0XHRTY2VuZV9QcmVsb2FkLmltcG9ydEltYWdlU2VyaWVzKGxvYWQsIFwiYmdfd2FsbHBhcGVyX1wiLCA1LCBcImpwZ1wiLCAwLCAyKTsgLy8gYmdfd2FsbHBhcGVyXzAwLCAuLi5cclxuXHJcblx0XHQvLyBCdXR0b25zXHJcblx0XHRsb2FkLnNldFBhdGgoXCJhc3NldHMvaW1nL2J1dHRvbnMvXCIpO1xyXG5cclxuXHRcdGNvbnN0IGJ1dHRvbnMgPSBbIFwiYmFja1wiLCBcImNyZWF0ZUxvYmJ5XCIsIFwiZXhpdFwiLCBcImljb25fcmVzdW1lXCIsIFwibGVhZGVyYm9hcmRcIiwgXCJwYXVzZVwiLCBcInBsYXlcIiwgXCJyZXN1bWVcIiwgXCJzZXR0aW5nc1wiLCBcIm1haW5fbWVudVwiLCBcImNyZWF0ZV9sb2JieVwiLCBcImpvaW5fbG9iYnlcIiwgXCJzdGFydF9nYW1lXCIgXTtcclxuXHRcdGZvciAoY29uc3QgYXNzZXQgb2YgYnV0dG9ucylcclxuXHRcdFx0bG9hZC5pbWFnZShgYnV0dG9uXyR7YXNzZXR9YCwgYGJ1dHRvbl8ke2Fzc2V0fS5wbmdgKTtcclxuXHR9XHJcblxyXG5cdGdldCB3aWR0aCgpXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuY2FtZXJhcy5tYWluLndpZHRoO1xyXG5cdH1cclxuXHRnZXQgaGVpZ2h0KClcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5jYW1lcmFzLm1haW4uaGVpZ2h0O1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IoY29uZmlnKVxyXG5cdHtcclxuXHRcdHN1cGVyKGNvbmZpZyk7XHJcblx0XHR0aGlzLmtleSA9IGNvbmZpZy5rZXk7XHJcblxyXG5cdFx0dGhpcy53YWxscGFwZXIgPSBjb25maWcud2FsbHBhcGVyO1xyXG5cdH1cclxuXHJcblx0X2dlbmVyYXRlV2FsbHBhcGVyKClcclxuXHR7XHJcblx0XHRpZiAodGhpcy53YWxscGFwZXIpXHJcblx0XHR7XHJcblx0XHRcdGlmICh0aGlzLmJnKVxyXG5cdFx0XHRcdHRoaXMuYmcuZGVzdHJveSgpO1xyXG5cclxuXHRcdFx0dGhpcy5iZyA9IG5ldyBQaGFzZXIuR2FtZU9iamVjdHMuSW1hZ2UodGhpcywgdGhpcy53aWR0aCAvIDIsIHRoaXMuaGVpZ2h0IC8gMiwgKHR5cGVvZiB0aGlzLndhbGxwYXBlciA9PT0gXCJib29sZWFuXCIpID8gYGJnX3dhbGxwYXBlcl8wJHtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA0KX1gIDogdGhpcy53YWxscGFwZXIpO1xyXG5cdFx0XHQvLyBhc3N1bWluZyB3YWxscGFwZXIgc2l6ZSA6IDE4MDAgeCAxMjAwXHJcblx0XHRcdHRoaXMuYmcuc2V0U2NhbGUoMC43MTExKTtcclxuXHRcdFx0dGhpcy5hZGQuZXhpc3RpbmcodGhpcy5iZyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjcmVhdGUoKVxyXG5cdHtcclxuXHRcdHRoaXMuX2dlbmVyYXRlV2FsbHBhcGVyKCk7XHJcblx0fVxyXG5cclxuXHRyZXN1bWUoKVxyXG5cdHtcclxuXHRcdHRoaXMuX2dlbmVyYXRlV2FsbHBhcGVyKCk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTY2VuZTtcclxuIiwiaW1wb3J0IEJ1dHRvbiBmcm9tIFwiLi9idXR0b25zL0J1dHRvbi5qc1wiO1xyXG5cclxuY2xhc3MgU2NlbmVCdXR0b24gZXh0ZW5kcyBCdXR0b25cclxue1xyXG5cdGNvbnN0cnVjdG9yKHRhcmdldFNjZW5lLCBkYXRhKVxyXG5cdHtcclxuXHRcdGlmICghZGF0YS5vbilcclxuXHRcdFx0ZGF0YS5vbiA9IHt9O1xyXG5cclxuXHRcdGNvbnN0IGNiID0gZGF0YS5jbGlja0NhbGxiYWNrXHJcblx0XHRcdCwgb2xkRXZlbnQgPSBkYXRhLm9uLnBvaW50ZXJ1cDtcclxuXHRcdGRhdGEub24ucG9pbnRlcnVwID0gKHBvaW50ZXIpID0+XHJcblx0XHR7XHJcblx0XHRcdC8vIGxlZnQgbW91c2UgYnV0dG9uXHJcblx0XHRcdGlmIChwb2ludGVyLmJ1dHRvbiAhPT0gMClcclxuXHRcdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0XHRsZXQgZGVjaXNpb24gPSB0cnVlO1xyXG5cdFx0XHRpZiAoKHR5cGVvZiBkYXRhLnVzZXJEZWNpc2lvbikgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdFx0ZGVjaXNpb24gPSB3aW5kb3cuY29uZmlybShkYXRhLnVzZXJEZWNpc2lvbi5sZW5ndGggPyBkYXRhLnVzZXJEZWNpc2lvbiA6IFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGdvIGJhY2sgdG8gdGhlIHByZXZpb3VzIHNjZW5lP1wiKTtcclxuXHJcblx0XHRcdGlmICghZGVjaXNpb24pXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdFx0aWYgKGNiICYmICh0eXBlb2YgY2IpID09PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdFx0Y2IuY2FsbCh0aGlzLCBwb2ludGVyKTtcclxuXHJcblx0XHRcdGlmIChvbGRFdmVudCAmJiAodHlwZW9mIG9sZEV2ZW50KSA9PT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHRcdG9sZEV2ZW50LmNhbGwodGhpcywgcG9pbnRlcik7XHJcblxyXG5cdFx0XHRkYXRhLnNjZW5lLnNjZW5lLnN0b3AoKTtcclxuXHRcdFx0ZGF0YS5zY2VuZS5zY2VuZS5zdGFydCh0YXJnZXRTY2VuZSwgZGF0YS5zY2VuZURhdGEpO1xyXG5cdFx0fTtcclxuXHJcblx0XHRzdXBlcihPYmplY3QuYXNzaWduKHtcclxuXHRcdFx0dGV4dHVyZTogXCJidXR0b25fYmFja1wiXHJcblx0XHR9LCBkYXRhKSk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTY2VuZUJ1dHRvbjtcclxuIiwiaW1wb3J0ICogYXMgUGhhc2VyIGZyb20gXCJwaGFzZXJcIjtcclxuXHJcbmNsYXNzIFNjb3JlQm9hcmQgZXh0ZW5kcyBQaGFzZXIuR2FtZU9iamVjdHMuQ29udGFpbmVyXHJcbntcclxuXHRjb25zdHJ1Y3RvcihkYXRhKVxyXG5cdHtcclxuXHRcdHN1cGVyKGRhdGEuc2NlbmUsIGRhdGEueCwgZGF0YS55KTtcclxuXHJcblx0XHR0aGlzLnNjb3JlcyA9IHt9O1xyXG5cclxuXHRcdHRoaXMuYmcgPSBuZXcgUGhhc2VyLkdhbWVPYmplY3RzLkltYWdlKHRoaXMuc2NlbmUsIDAsIDAsIFwicGFuZWxfc2NvcmVib2FyZFwiKTtcclxuXHRcdHRoaXMuYWRkKHRoaXMuYmcpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2NvcmVCb2FyZDtcclxuIiwiaW1wb3J0ICogYXMgUGhhc2VyIGZyb20gXCJwaGFzZXJcIjtcclxuXHJcbmltcG9ydCBUZXh0T3ZlcmxheSBmcm9tIFwiLi9idXR0b25zL292ZXJsYXlzL1RleHRPdmVybGF5LmpzXCI7XHJcblxyXG5jbGFzcyBTY29yZVRyYWNrZXIgZXh0ZW5kcyBQaGFzZXIuR2FtZU9iamVjdHMuQ29udGFpbmVyXHJcbntcclxuXHRnZXQgc2NvcmUoKVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9zY29yZTtcclxuXHR9XHJcblx0c2V0IHNjb3JlKHZhbHVlKVxyXG5cdHtcclxuXHRcdHRoaXMuc2NlbmUuY29ubmVjdGlvbi5tYXRjaC5zZW5kKFwibWF0Y2gtc2NvcmUtc2NvcmVkXCIsIHsgc2NvcmU6IHZhbHVlIC0gdGhpcy5fc2NvcmUgfSk7XHJcblxyXG5cdFx0dGhpcy5fc2NvcmUgPSBNYXRoLm1heCgwLCB2YWx1ZSk7XHJcblx0XHR0aGlzLm92ZXJsYXkudGV4dC5zZXRUZXh0KHRoaXMuX3Njb3JlKTtcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKGRhdGEpXHJcblx0e1xyXG5cdFx0c3VwZXIoZGF0YS5zY2VuZSwgZGF0YS54LCBkYXRhLnkpO1xyXG5cclxuXHRcdHRoaXMuX3Njb3JlID0gMDtcclxuXHJcblx0XHR0aGlzLmJnID0gbmV3IFBoYXNlci5HYW1lT2JqZWN0cy5JbWFnZSh0aGlzLnNjZW5lLCAwLCAwLCBcImJnX3Njb3JlXCIpO1xyXG5cdFx0dGhpcy5hZGQodGhpcy5iZyk7XHJcblxyXG5cdFx0e1xyXG5cdFx0XHR0aGlzLm92ZXJsYXkgPSBuZXcgVGV4dE92ZXJsYXkodGhpcy5zY2VuZSwgdGhpcy5zY29yZS50b1N0cmluZygpKTtcclxuXHRcdFx0dGhpcy5vdmVybGF5LnkgLT0gODtcclxuXHRcdFx0dGhpcy5vdmVybGF5LnRleHQuc2V0T3JpZ2luKC4wNSwgLjM1KTtcclxuXHRcdFx0dGhpcy5vdmVybGF5LnRleHQuc2V0U3Ryb2tlKFwiIzAwMFwiLCA0KTtcclxuXHRcdFx0dGhpcy5hZGQodGhpcy5vdmVybGF5KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHZhbHVlb2YoKVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLnNjb3JlO1xyXG5cdH1cclxuXHJcblx0dG9TdHJpbmcoKVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLnNjb3JlLnRvU3RyaW5nKCk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTY29yZVRyYWNrZXI7XHJcbiIsImltcG9ydCAqIGFzIFBoYXNlciBmcm9tIFwicGhhc2VyXCI7XHJcblxyXG5pbXBvcnQgQmFzZU92ZXJsYXkgZnJvbSBcIi4vb3ZlcmxheXMvQmFzZU92ZXJsYXkuanNcIjtcclxuXHJcbmNsYXNzIEJ1dHRvbiBleHRlbmRzIFBoYXNlci5HYW1lT2JqZWN0cy5Db250YWluZXJcclxue1xyXG5cdHN0YXRpYyBnZXQgREVGQVVMVF9IQU5ETEVSUygpXHJcblx0e1xyXG5cdFx0Ly8gZnVuY3Rpb25zIGhlcmUgYXJlIGJvdW5kIHRvIHRoZSBCdXR0b24gdGhleSBvcmlnaW5hdGUgZnJvbVxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0cG9pbnRlcm92ZXI6IGZ1bmN0aW9uKClcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHRoaXMuYmcuc2V0VGludCgwWERERERERCk7XHJcblx0XHRcdH0sXHJcblx0XHRcdHBvaW50ZXJvdXQ6IGZ1bmN0aW9uKClcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHRoaXMuYmcuY2xlYXJUaW50KCk7XHJcblx0XHRcdH0sXHJcblx0XHRcdHBvaW50ZXJkb3duOiBmdW5jdGlvbigpXHJcblx0XHRcdHtcclxuXHRcdFx0XHR0aGlzLmJnLnNldFRpbnQoMFg3Nzc3NzcpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRwb2ludGVydXA6IGZ1bmN0aW9uKClcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHRoaXMuYmcuc2V0VGludCgwWERERERERCk7XHJcblx0XHRcdFx0dGhpcy5zY2VuZS5nYW1lLmF1ZGlvLmVmZmVjdHMucGxheShcImF1ZGlvX2J1dHRvbl8wMVwiKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGdldCBvdmVybGF5KClcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fb3ZlcmxheTtcclxuXHR9XHJcblx0c2V0IG92ZXJsYXkodmFsdWUpXHJcblx0e1xyXG5cdFx0aWYgKCEodmFsdWUgaW5zdGFuY2VvZiBCYXNlT3ZlcmxheSkpXHJcblx0XHRcdHJldHVybiBjb25zb2xlLmVycm9yKG5ldyBUeXBlRXJyb3IoXCJPdmVybGF5IG11c3QgYmUgYSBjaGlsZCBvZiBCYXNlT3ZlcmxheVwiKSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuXHJcblx0XHRpZiAodGhpcy5fb3ZlcmxheSAhPSBudWxsKVxyXG5cdFx0XHR0aGlzLnJlbW92ZSh0aGlzLl9vdmVybGF5LCB0cnVlKTtcclxuXHJcblx0XHR0aGlzLl9vdmVybGF5ID0gdmFsdWU7XHJcblx0XHR0aGlzLmFkZCh0aGlzLl9vdmVybGF5KTtcclxuXHJcblx0XHRpZiAodGhpcy5fb3ZlcmxheS5pbWFnZSlcclxuXHRcdFx0dGhpcy5fb3ZlcmxheS5pbWFnZS5zZXREaXNwbGF5U2l6ZSh0aGlzLmJnLndpZHRoICogLjksIHRoaXMuYmcuaGVpZ2h0ICogLjkpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQGNsYXNzIEEgZGVmYXVsdCBidXR0b24gZm9yIGFueXRoaW5nIGNsaWNrYWJsZVxyXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhXHJcblx0ICogQHBhcmFtIHtQaGFzZXIuU2NlbmV9IGRhdGEuc2NlbmVcclxuXHQgKiBAcGFyYW0ge251bWJlcn0gW2RhdGEueF0gVGhlIHggY29vcmRpbmF0ZSBpbiB0aGUgc2NlbmVcclxuXHQgKiBAcGFyYW0ge251bWJlcn0gW2RhdGEueV0gVGhlIHkgY29vcmRpbmF0ZSBpbiB0aGUgc2NlbmVcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZGF0YS50ZXh0dXJlIFRoZSB0ZXh0dXJlIG5hbWUgb2YgdGhlIGJ1dHRvbiBiYWNrZ3JvdW5kXHJcblx0ICogQHBhcmFtIHtvYmplY3R9IFtkYXRhLm92ZXJsYXldXHJcblx0ICogQHBhcmFtIHtJbWFnZU92ZXJsYXl9IFtkYXRhLm92ZXJsYXkuaW1hZ2VdIEFuIEltYWdlIE92ZXJsYXksIGRpc3BsYXllZCBhcyBhIHNlcGFyYXRlIGVsZW1lbnQgb24gdG9wIG9mIHRoZSBidXR0b25cclxuXHQgKiBAcGFyYW0ge1RleHRPdmVybGF5fSBbZGF0YS5vdmVybGF5LnRleHRdIEEgVGV4dCBPdmVybGF5LCBkaXNwbGF5ZWQgYXMgYSBzZXBhcmF0ZSBlbGVtZW50IG9uIHRvcCBvZiB0aGUgYnV0dG9uXHJcblx0ICogQHBhcmFtIHtvYmplY3R9IFtkYXRhLm9uXVxyXG5cdCAqIEBwYXJhbSB7ZnVuY3Rpb259IFtkYXRhLm9uLltldmVudF1dIE9wdGlvbmFsIGV2ZW50IGhhbmRsZXJzIHRoYXQgdGhlIFBoYXNlciBDb250YWluZXIgbGlzdGVucyB0b1xyXG5cdCAqIEBwYXJhbSB7Ym9vbH0gW2RhdGEuZGVmYXVsdEJ1dHRvbkhvdmVyRXZlbnRzXSBDcmVhdGVzIGRlZmF1bHQgYnV0dG9uIGV2ZW50IGhhbmRsZXJzIGZvciBob3ZlcnNcclxuXHQgKiBAcGFyYW0ge2Jvb2x9IFtkYXRhLmRlZmF1bHRCdXR0b25DbGlja0V2ZW50c10gQ3JlYXRlcyBkZWZhdWx0IGJ1dHRvbiBldmVudCBoYW5kbGVycyBmb3IgY2xpY2tzXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoZGF0YSlcclxuXHR7XHJcblx0XHRzdXBlcihkYXRhLnNjZW5lLCBkYXRhLngsIGRhdGEueSk7XHJcblx0XHR0aGlzLnNjZW5lLmFkZC5leGlzdGluZyh0aGlzKTtcclxuXHJcblx0XHR0aGlzLmJnID0gbmV3IFBoYXNlci5HYW1lT2JqZWN0cy5JbWFnZSh0aGlzLnNjZW5lLCAwLCAwLCBkYXRhLnRleHR1cmUpO1xyXG5cdFx0dGhpcy5hZGQodGhpcy5iZyk7XHJcblxyXG5cdFx0aWYgKGRhdGEub3ZlcmxheSlcclxuXHRcdFx0dGhpcy5vdmVybGF5ID0gZGF0YS5vdmVybGF5O1xyXG5cclxuXHRcdGlmIChkYXRhLm9uXHJcblx0XHRcdHx8IGRhdGEuZGVmYXVsdEJ1dHRvbkV2ZW50c1xyXG5cdFx0XHR8fCBkYXRhLmRlZmF1bHRCdXR0b25Ib3ZlckV2ZW50c1xyXG5cdFx0XHR8fCBkYXRhLmRlZmF1bHRCdXR0b25DbGlja0V2ZW50cylcclxuXHRcdFx0dGhpcy5zZXRTaXplKHRoaXMuYmcud2lkdGgsIHRoaXMuYmcuaGVpZ2h0KVxyXG5cdFx0XHRcdC5zZXRJbnRlcmFjdGl2ZSgpO1xyXG5cclxuXHRcdC8vIHJlZ2lzdGVyIGRlZmluZWQgZXZlbnQgaGFuZGxlcnNcclxuXHRcdGZvciAoY29uc3QgW25hbWUsIGhhbmRsZXJdIG9mIE9iamVjdC5lbnRyaWVzKGRhdGEub24gfHwge30pKVxyXG5cdFx0e1xyXG5cdFx0XHRpZiAoKHR5cGVvZiBoYW5kbGVyKSA9PT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHRcdHRoaXMub24obmFtZSwgaGFuZGxlcik7XHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc3QgZW5hYmxlSG92ZXJFdmVudHMgPSAoKSA9PlxyXG5cdFx0XHR7XHJcblx0XHRcdFx0dGhpcy5vbihcInBvaW50ZXJvdmVyXCIsIEJ1dHRvbi5ERUZBVUxUX0hBTkRMRVJTLnBvaW50ZXJvdmVyKTtcclxuXHRcdFx0XHR0aGlzLm9uKFwicG9pbnRlcm91dFwiLCBCdXR0b24uREVGQVVMVF9IQU5ETEVSUy5wb2ludGVyb3V0KTtcclxuXHRcdFx0fVxyXG5cdFx0XHQsIGVuYWJsZUNsaWNrRXZlbnRzID0gKCkgPT5cclxuXHRcdFx0e1xyXG5cdFx0XHRcdHRoaXMub24oXCJwb2ludGVydXBcIiwgQnV0dG9uLkRFRkFVTFRfSEFORExFUlMucG9pbnRlcnVwKTtcclxuXHRcdFx0XHR0aGlzLm9uKFwicG9pbnRlcmRvd25cIiwgQnV0dG9uLkRFRkFVTFRfSEFORExFUlMucG9pbnRlcmRvd24pO1xyXG5cdFx0XHR9XHJcblx0XHRcdCwgZW5hYmxlRXZlbnRzID0gKCkgPT5cclxuXHRcdFx0e1xyXG5cdFx0XHRcdGVuYWJsZUhvdmVyRXZlbnRzKCk7XHJcblx0XHRcdFx0ZW5hYmxlQ2xpY2tFdmVudHMoKTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRpZiAoIWRhdGEuZGVmYXVsdEJ1dHRvbkV2ZW50cylcclxuXHRcdHtcclxuXHRcdFx0aWYgKGRhdGEuZGVmYXVsdEJ1dHRvbkhvdmVyRXZlbnRzKVxyXG5cdFx0XHRcdGVuYWJsZUhvdmVyRXZlbnRzKCk7XHJcblxyXG5cdFx0XHRpZiAoZGF0YS5kZWZhdWx0QnV0dG9uQ2xpY2tFdmVudHMpXHJcblx0XHRcdFx0ZW5hYmxlQ2xpY2tFdmVudHMoKTtcclxuXHRcdH1cclxuXHJcblx0XHRlbHNlXHJcblx0XHRcdGVuYWJsZUV2ZW50cygpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uO1xyXG4iLCJpbXBvcnQgKiBhcyBQaGFzZXIgZnJvbSBcInBoYXNlclwiO1xyXG5cclxuY2xhc3MgQmFzZU92ZXJsYXkgZXh0ZW5kcyBQaGFzZXIuR2FtZU9iamVjdHMuQ29udGFpbmVyXHJcbntcclxuXHRjb25zdHJ1Y3RvcihkYXRhKVxyXG5cdHtcclxuXHRcdGlmIChuZXcudGFyZ2V0ID09PSBCYXNlT3ZlcmxheSlcclxuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjb25zdHJ1Y3QgQmFzZU92ZXJsYXkgaW5zdGFuY2VzIGRpcmVjdGx5XCIpO1xyXG5cclxuXHRcdHN1cGVyKGRhdGEuc2NlbmUsIGRhdGEueCwgZGF0YS55KTtcclxuXHJcblx0XHR0aGlzLnRleHQgPSBudWxsO1xyXG5cdFx0dGhpcy5pbWFnZSA9IG51bGw7XHJcblxyXG5cdFx0dGhpcy53b2JibGluZyA9IG51bGw7XHJcblx0fVxyXG5cclxuXHR3b2JibGUoZHVyYXRpb24gPSAxLCBsb29wID0gMSlcclxuXHR7XHJcblx0XHRpZiAodGhpcy53b2JibGluZyAhPSBudWxsKVxyXG5cdFx0XHRyZXR1cm4gY29uc29sZS53YXJuKFwiQ2Fubm90IHdvYmJsZSB3aGlsZSB3b2JibGluZyBpcyBhY3RpdmVcIik7XHJcblxyXG5cdFx0ZHVyYXRpb24gPSBkdXJhdGlvbiAvIDIgKiAxMDAwO1xyXG5cdFx0dGhpcy53b2JibGluZyA9IHRoaXMuc2NlbmUudHdlZW5zLmFkZCh7XHJcblx0XHRcdHRhcmdldHM6IHRoaXMsXHJcblx0XHRcdHNjYWxlOiAxLjUsXHJcblx0XHRcdGVhc2U6IFBoYXNlci5NYXRoLkVhc2luZy5TaW5lLkluT3V0LFxyXG5cdFx0XHR5b3lvOiB0cnVlLFxyXG5cdFx0XHRsb29wLCBkdXJhdGlvbixcclxuXHRcdFx0b25Db21wbGV0ZTogKCkgPT5cclxuXHRcdFx0e1xyXG5cdFx0XHRcdHRoaXMud29iYmxpbmcgPSBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJhc2VPdmVybGF5O1xyXG4iLCJpbXBvcnQgKiBhcyBQaGFzZXIgZnJvbSBcInBoYXNlclwiO1xyXG5cclxuaW1wb3J0IEJhc2VPdmVybGF5IGZyb20gXCIuL0Jhc2VPdmVybGF5LmpzXCI7XHJcblxyXG5jbGFzcyBJbWFnZU92ZXJsYXkgZXh0ZW5kcyBCYXNlT3ZlcmxheVxyXG57XHJcblx0Y29uc3RydWN0b3Ioc2NlbmUsIHRleHR1cmUsIGRhdGEgPSB7IGltYWdlOiB7fSB9KVxyXG5cdHtcclxuXHRcdHN1cGVyKE9iamVjdC5hc3NpZ24oeyBzY2VuZSB9LCBkYXRhKSk7XHJcblxyXG5cdFx0dGhpcy5pbWFnZSA9IG5ldyBQaGFzZXIuR2FtZU9iamVjdHMuSW1hZ2UodGhpcy5zY2VuZSwgMCwgMCwgdGV4dHVyZSk7XHJcblx0XHR0aGlzLmFkZCh0aGlzLmltYWdlKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEltYWdlT3ZlcmxheTtcclxuIiwiaW1wb3J0ICogYXMgUGhhc2VyIGZyb20gXCJwaGFzZXJcIjtcclxuXHJcbmltcG9ydCBCYXNlT3ZlcmxheSBmcm9tIFwiLi9CYXNlT3ZlcmxheS5qc1wiO1xyXG5cclxuY2xhc3MgVGV4dE92ZXJsYXkgZXh0ZW5kcyBCYXNlT3ZlcmxheVxyXG57XHJcblx0Y29uc3RydWN0b3Ioc2NlbmUsIHRleHQsIGRhdGEgPSB7IHRleHQ6IHt9IH0pXHJcblx0e1xyXG5cdFx0c3VwZXIoT2JqZWN0LmFzc2lnbih7IHNjZW5lIH0sIGRhdGEpKTtcclxuXHJcblx0XHR0aGlzLnRleHQgPSBuZXcgUGhhc2VyLkdhbWVPYmplY3RzLlRleHQodGhpcy5zY2VuZSwgMCwgMCwgdGV4dCwgT2JqZWN0LmFzc2lnbih7XHJcblx0XHRcdGFsaWduOiBcImNlbnRlclwiLFxyXG5cdFx0XHRmb250U2l6ZTogNjRcclxuXHRcdH0sIGRhdGEudGV4dCkpXHJcblx0XHRcdC5zZXRPcmlnaW4oLjUsIC41KVxyXG5cdFx0XHQuc2V0UmVzb2x1dGlvbigxKTtcclxuXHRcdHRoaXMuYWRkKHRoaXMudGV4dCk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUZXh0T3ZlcmxheTtcclxuIiwiaW1wb3J0IEJ1dHRvbiBmcm9tIFwiLi9idXR0b25zL0J1dHRvbi5qc1wiO1xyXG5pbXBvcnQgSW1hZ2VPdmVybGF5IGZyb20gXCIuL2J1dHRvbnMvb3ZlcmxheXMvSW1hZ2VPdmVybGF5LmpzXCI7XHJcbmltcG9ydCBUZXh0T3ZlcmxheSBmcm9tIFwiLi9idXR0b25zL292ZXJsYXlzL1RleHRPdmVybGF5LmpzXCI7XHJcblxyXG5pbXBvcnQgU2V0dGluZyBmcm9tIFwiLi9zZXR0aW5ncy9TZXR0aW5nLmpzXCI7XHJcbmltcG9ydCBEcm9wZG93biBmcm9tIFwiLi9zZXR0aW5ncy92YXJpYXRpb25zL0Ryb3Bkb3duLmpzXCI7XHJcbmltcG9ydCBTbGlkZXIgZnJvbSBcIi4vc2V0dGluZ3MvdmFyaWF0aW9ucy9TbGlkZXIuanNcIjtcclxuXHJcbmltcG9ydCBCYWxsIGZyb20gXCIuL0JhbGwuanNcIjtcclxuaW1wb3J0IEJhbGxRdWV1ZSBmcm9tIFwiLi9CYWxsUXVldWUuanNcIjtcclxuaW1wb3J0IENhcmQgZnJvbSBcIi4vQ2FyZC5qc1wiO1xyXG5pbXBvcnQgQ2FyZEhvbGRlciBmcm9tIFwiLi9DYXJkSG9sZGVyLmpzXCI7XHJcbmltcG9ydCBTY2VuZSBmcm9tIFwiLi9TY2VuZS5qc1wiO1xyXG5pbXBvcnQgU2NvcmVCb2FyZCBmcm9tIFwiLi9TY29yZUJvYXJkLmpzXCI7XHJcbmltcG9ydCBTY29yZVRyYWNrZXIgZnJvbSBcIi4vU2NvcmVUcmFja2VyLmpzXCI7XHJcbmltcG9ydCBMZWFkZXJib2FyZCBmcm9tIFwiLi9MZWFkZXJib2FyZC5qc1wiO1xyXG5pbXBvcnQgQ29uZmV0dGkgZnJvbSBcIi4vQ29uZmV0dGkuanNcIjtcclxuaW1wb3J0IFBsYXllcmxpc3QgZnJvbSBcIi4vUGxheWVybGlzdC5qc1wiO1xyXG5cclxuZXhwb3J0IHtcclxuXHRCdXR0b24sXHJcblx0SW1hZ2VPdmVybGF5LFxyXG5cdFRleHRPdmVybGF5LFxyXG5cdFNldHRpbmcsXHJcblx0RHJvcGRvd24sXHJcblx0U2xpZGVyLFxyXG5cdEJhbGwsXHJcblx0QmFsbFF1ZXVlLFxyXG5cdENhcmQsXHJcblx0Q2FyZEhvbGRlcixcclxuXHRTY2VuZSxcclxuXHRTY29yZUJvYXJkLFxyXG5cdFNjb3JlVHJhY2tlcixcclxuXHRMZWFkZXJib2FyZCxcclxuXHRDb25mZXR0aSxcclxuXHRQbGF5ZXJsaXN0XHJcbn07XHJcbiIsImltcG9ydCAqIGFzIFBoYXNlciBmcm9tIFwicGhhc2VyXCI7XHJcblxyXG5jbGFzcyBTZXR0aW5nIGV4dGVuZHMgUGhhc2VyLkdhbWVPYmplY3RzLkNvbnRhaW5lclxyXG57XHJcblx0Z2V0IHZhbHVlKClcclxuXHR7XHJcblx0XHRjb25zdCBzZXR0aW5ncyA9IHRoaXMuc2NlbmUuZ2FtZS5zZXR0aW5ncztcclxuXHRcdHJldHVybiB0aGlzLnN1YktleSA/IHNldHRpbmdzLmdldCh0aGlzLmtleSlbdGhpcy5zdWJLZXldIDogc2V0dGluZ3MuZ2V0KHRoaXMua2V5KTtcclxuXHR9XHJcblx0c2V0IHZhbHVlKHgpXHJcblx0e1xyXG5cdFx0Y29uc3Qgc2V0dGluZ3MgPSB0aGlzLnNjZW5lLmdhbWUuc2V0dGluZ3M7XHJcblx0XHRpZiAodGhpcy5zdWJLZXkpXHJcblx0XHR7XHJcblx0XHRcdGNvbnN0IHZhbCA9IHNldHRpbmdzLmdldCh0aGlzLmtleSk7XHJcblx0XHRcdHZhbFt0aGlzLnN1YktleV0gPSB4O1xyXG5cdFx0XHRzZXR0aW5ncy5zZXQodGhpcy5rZXksIHZhbCk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZWxzZVxyXG5cdFx0XHRzZXR0aW5ncy5zZXQodGhpcy5rZXksIHgpO1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IoZGF0YSlcclxuXHR7XHJcblx0XHRzdXBlcihkYXRhLnNjZW5lLCBkYXRhLngsIGRhdGEueSk7XHJcblxyXG5cdFx0dGhpcy5rZXkgPSBkYXRhLmtleS5zcGxpdChcIi5cIilbMF07XHJcblx0XHR0aGlzLnN1YktleSA9IGRhdGEuc3ViS2V5IHx8IGRhdGEua2V5LnNwbGl0KFwiLlwiKVsxXSB8fCBudWxsO1xyXG5cclxuXHRcdHRoaXMuZWxlbWVudCA9IG51bGw7XHJcblx0XHR0aGlzLnZhbHVlVGV4dCA9IG51bGw7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZXR0aW5nO1xyXG4iLCJpbXBvcnQgKiBhcyBQaGFzZXIgZnJvbSBcInBoYXNlclwiO1xyXG5pbXBvcnQgeyBNZW51IH0gZnJvbSBcInBoYXNlcjMtcmV4LXBsdWdpbnMvdGVtcGxhdGVzL3VpL3VpLWNvbXBvbmVudHMuanNcIjtcclxuXHJcbmltcG9ydCBTZXR0aW5nIGZyb20gXCIuLi9TZXR0aW5nLmpzXCI7XHJcbmltcG9ydCBCdXR0b24gZnJvbSBcIi4uLy4uL2J1dHRvbnMvQnV0dG9uLmpzXCI7XHJcblxyXG5jbGFzcyBEcm9wZG93biBleHRlbmRzIFNldHRpbmdcclxue1xyXG5cdHN0YXRpYyBwcmVsb2FkKGxvYWQpXHJcblx0e1xyXG5cdFx0bG9hZC5zZXRQYXRoKFwiYXNzZXRzL2ltZy9VSS9kcm9wZG93bi9cIik7XHJcblxyXG5cdFx0bG9hZC5pbWFnZShcImRyb3Bkb3duX2Fycm93XCIsIFwiYXJyb3cucG5nXCIpO1xyXG5cdFx0bG9hZC5pbWFnZShcImRyb3Bkb3duX2Fycm93X3doaXRlXCIsIFwiYXJyb3dfd2hpdGUucG5nXCIpO1xyXG5cdFx0bG9hZC5pbWFnZShcImRyb3Bkb3duX21haW5cIiwgXCJtYWluLnBuZ1wiKTtcclxuXHRcdGxvYWQuaW1hZ2UoXCJkcm9wZG93bl9tYWluX2hvdmVyXCIsIFwibWFpbl9ob3Zlci5wbmdcIik7XHJcblx0XHRsb2FkLmltYWdlKFwiZHJvcGRvd25faXRlbVwiLCBcIml0ZW0ucG5nXCIpO1xyXG5cdFx0bG9hZC5pbWFnZShcImRyb3Bkb3duX2l0ZW1faG92ZXJcIiwgXCJpdGVtX2hvdmVyLnBuZ1wiKTtcclxuXHRcdGxvYWQuaW1hZ2UoXCJkcm9wZG93bl9pdGVtX2xhc3RcIiwgXCJpdGVtX2xhc3QucG5nXCIpO1xyXG5cdFx0bG9hZC5pbWFnZShcImRyb3Bkb3duX2l0ZW1fbGFzdF9ob3ZlclwiLCBcIml0ZW1fbGFzdF9ob3Zlci5wbmdcIik7XHJcblx0fVxyXG5cclxuXHRnZXQgdmFsdWUoKVxyXG5cdHtcclxuXHRcdHJldHVybiBzdXBlci52YWx1ZTtcclxuXHR9XHJcblx0c2V0IHZhbHVlKHgpXHJcblx0e1xyXG5cdFx0c3VwZXIudmFsdWUgPSB4O1xyXG5cdFx0aWYgKHRoaXMudmFsdWVUZXh0KVxyXG5cdFx0XHR0aGlzLnZhbHVlVGV4dC50ZXh0ID0geDtcclxuXHR9XHJcblxyXG5cdGdldCBleHBhbmRlZCgpXHJcblx0e1xyXG5cdFx0cmV0dXJuICEhdGhpcy5tZW51O1xyXG5cdH1cclxuXHJcblx0X2NvbXBvc2VCdXR0b25Db250YWluZXIoKVxyXG5cdHtcclxuXHRcdC8vIGluc3RhbnRpYXRlIGJ1dHRvbiB0byBnZXQgdGhlIGltYWdlIGRpbWVuc2lvbnMgLSBmb3IgcG9zaXRpb25pbmcgdGhlIGFycm93IGNvcnJlY3RseVxyXG5cdFx0bGV0IGJ1dHRvbiA9IG5ldyBQaGFzZXIuR2FtZU9iamVjdHMuSW1hZ2UodGhpcy5zY2VuZSwgMCwgMCwgXCJkcm9wZG93bl9tYWluXCIpXHJcblx0XHRcdCwgYXJyb3cgPSBuZXcgUGhhc2VyLkdhbWVPYmplY3RzLkltYWdlKHRoaXMuc2NlbmUsIGJ1dHRvbi5kaXNwbGF5V2lkdGggKiAuMzYsIDAsIFwiZHJvcGRvd25fYXJyb3dcIik7XHJcblxyXG5cdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XHJcblx0XHRidXR0b24gPSBuZXcgQnV0dG9uKHtcclxuXHRcdFx0c2NlbmU6IHRoaXMuc2NlbmUsXHJcblx0XHRcdHg6IDAsXHJcblx0XHRcdHk6IDAsXHJcblx0XHRcdHRleHR1cmU6IFwiZHJvcGRvd25fbWFpblwiLFxyXG5cdFx0XHRvbjoge1xyXG5cdFx0XHRcdHBvaW50ZXJvdmVyOiBmdW5jdGlvbigpXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGhpcy5iZy5zZXRUZXh0dXJlKFwiZHJvcGRvd25fbWFpbl9ob3ZlclwiKTtcclxuXHRcdFx0XHRcdGFycm93LnNldFJvdGF0aW9uKE1hdGguUEkpOyAvLyBQaGFzZXIgdXNlcyByQWRJQU5TIEZPUiBTT01FIFJFQVNPTlxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0cG9pbnRlcm91dDogZnVuY3Rpb24oKVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHRoaXMuYmcuc2V0VGV4dHVyZShcImRyb3Bkb3duX21haW5cIik7XHJcblx0XHRcdFx0XHRhcnJvdy5zZXRSb3RhdGlvbihzZWxmLmV4cGFuZGVkID8gTWF0aC5QSSA6IDApO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0cG9pbnRlcmRvd246ICgpID0+XHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0aWYgKCF0aGlzLmV4cGFuZGVkKVxyXG5cdFx0XHRcdFx0XHR0aGlzLm1lbnUgPSB0aGlzLl9jb21wb3NlTWVudSgpO1xyXG5cdFx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHR0aGlzLm1lbnUuY29sbGFwc2UoKTtcclxuXHRcdFx0XHRcdFx0dGhpcy5tZW51ID0gbnVsbDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdGJ1dHRvbi5hZGQoYXJyb3cpXHJcblx0XHRcdC5zZXRTY2FsZSguNzUpXHJcblx0XHRcdC5zZXREZXB0aCgxMDApO1xyXG5cclxuXHRcdHJldHVybiBidXR0b247XHJcblx0fVxyXG5cclxuXHRfY29tcG9zZU1lbnUoKVxyXG5cdHtcclxuXHRcdGNvbnN0IG1lbnUgPSBuZXcgTWVudSh0aGlzLnNjZW5lLCB7XHJcblx0XHRcdGl0ZW1zOiB0aGlzLmNob2ljZXMsXHJcblxyXG5cdFx0XHR4OiB0aGlzLnggLSAodGhpcy5lbGVtZW50LmRpc3BsYXlXaWR0aCAqIC4yNSksXHJcblx0XHRcdHk6IHRoaXMueSArICh0aGlzLmVsZW1lbnQuZGlzcGxheUhlaWdodCAqIC4zMzUpLFxyXG5cclxuXHRcdFx0Y3JlYXRlQnV0dG9uQ2FsbGJhY2s6IChpdGVtLCBpKSA9PlxyXG5cdFx0XHR7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuc2NlbmUucmV4VUkuYWRkLmxhYmVsKHtcclxuXHRcdFx0XHRcdGJhY2tncm91bmQ6IHRoaXMuc2NlbmUuYWRkLmltYWdlKDAsIDAsIGkgIT09IHRoaXMuY2hvaWNlcy5sZW5ndGggLSAxID8gXCJkcm9wZG93bl9pdGVtXCIgOiBcImRyb3Bkb3duX2l0ZW1fbGFzdFwiKSxcclxuXHRcdFx0XHRcdHRleHQ6IHRoaXMuc2NlbmUuYWRkLnRleHQoMCwgMCwgaXRlbS5uYW1lLCB7XHJcblx0XHRcdFx0XHRcdGZvbnRGYW1pbHk6IFwiQXJpYWxcIixcclxuXHRcdFx0XHRcdFx0Zm9udFNpemU6IDI1XHJcblx0XHRcdFx0XHR9KS5zZXRTY2FsZSguNzUpLFxyXG5cdFx0XHRcdFx0aWNvbjogdGhpcy5zY2VuZS5yZXhVSS5hZGQucm91bmRSZWN0YW5nbGUoMCwgMCwgMCwgMCwgMTAsIChpdGVtLm5hbWUgPT09IHRoaXMudmFsdWUpID8gMHg4NUMxRTkgOiAweEZGRkZGRiksXHJcblx0XHRcdFx0XHRzcGFjZToge1xyXG5cdFx0XHRcdFx0XHRsZWZ0OiAxMCxcclxuXHRcdFx0XHRcdFx0cmlnaHQ6IDEwLFxyXG5cdFx0XHRcdFx0XHR0b3A6IDEwLFxyXG5cdFx0XHRcdFx0XHRib3R0b206IDEwLFxyXG5cdFx0XHRcdFx0XHRpY29uOiAxMFxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0XHQuc2V0U2NhbGUoMS41KVxyXG5cdFx0XHRcdFx0LnNldERlcHRoKDUwKTtcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGVhc2VJbjoge1xyXG5cdFx0XHRcdGR1cmF0aW9uOiA1MDAsXHJcblx0XHRcdFx0b3JpZW50YXRpb246IFwieVwiXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRlYXNlT3V0OiB7XHJcblx0XHRcdFx0ZHVyYXRpb246IDEwMCxcclxuXHRcdFx0XHRvcmllbnRhdGlvbjogXCJ5XCJcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0bWVudVxyXG5cdFx0XHQub24oXCJidXR0b24uY2xpY2tcIiwgKGJ1dHRvbikgPT5cclxuXHRcdFx0e1xyXG5cdFx0XHRcdHRoaXMudmFsdWUgPSBidXR0b24udGV4dDtcclxuXHRcdFx0XHR0aGlzLm1lbnUuY29sbGFwc2UoKTtcclxuXHRcdFx0XHR0aGlzLm1lbnUgPSBudWxsO1xyXG5cdFx0XHR9KVxyXG5cdFx0XHQub24oXCJidXR0b24ub3ZlclwiLCAoYnV0dG9uKSA9PlxyXG5cdFx0XHR7XHJcblx0XHRcdFx0YnV0dG9uLmNoaWxkcmVuLmZpbmQoeCA9PiB4IGluc3RhbmNlb2YgUGhhc2VyLkdhbWVPYmplY3RzLkltYWdlKS5zZXRUZXh0dXJlKCh0aGlzLmNob2ljZXMuZmluZEluZGV4KHggPT4geC5uYW1lID09PSBidXR0b24udGV4dCkgIT09IHRoaXMuY2hvaWNlcy5sZW5ndGggLSAxICkgPyBcImRyb3Bkb3duX2l0ZW1faG92ZXJcIiA6IFwiZHJvcGRvd25faXRlbV9sYXN0X2hvdmVyXCIpO1xyXG5cdFx0XHR9KVxyXG5cdFx0XHQub24oXCJidXR0b24ub3V0XCIsIChidXR0b24pID0+XHJcblx0XHRcdHtcclxuXHRcdFx0XHRidXR0b24uY2hpbGRyZW4uZmluZCh4ID0+IHggaW5zdGFuY2VvZiBQaGFzZXIuR2FtZU9iamVjdHMuSW1hZ2UpLnNldFRleHR1cmUoKHRoaXMuY2hvaWNlcy5maW5kSW5kZXgoeCA9PiB4Lm5hbWUgPT09IGJ1dHRvbi50ZXh0KSAhPT0gdGhpcy5jaG9pY2VzLmxlbmd0aCAtIDEgKSA/IFwiZHJvcGRvd25faXRlbVwiIDogXCJkcm9wZG93bl9pdGVtX2xhc3RcIik7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiBtZW51O1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IoZGF0YSlcclxuXHR7XHJcblx0XHRzdXBlcihkYXRhKTtcclxuXHRcdHRoaXMuY2hvaWNlcyA9IGRhdGEuY2hvaWNlcztcclxuXHJcblx0XHQvLyBtYWluIGlkbGUgYnV0dG9uXHJcblx0XHR0aGlzLmVsZW1lbnQgPSB0aGlzLl9jb21wb3NlQnV0dG9uQ29udGFpbmVyKCk7XHJcblx0XHR0aGlzLmFkZCh0aGlzLmVsZW1lbnQpO1xyXG5cclxuXHRcdHRoaXMubWVudSA9IG51bGw7XHJcblx0XHRsZXQgdG91Y2hDb3VudCA9IDA7XHJcblx0XHR0aGlzLnNjZW5lLmlucHV0Lm9uKFwicG9pbnRlcmRvd25cIiwgKHBvaW50ZXIpID0+XHJcblx0XHR7XHJcblx0XHRcdGlmICghdGhpcy5leHBhbmRlZClcclxuXHRcdFx0XHRyZXR1cm4gdG91Y2hDb3VudCA9IDA7XHJcblxyXG5cdFx0XHRpZiAoIXRoaXMubWVudS5pc0luVG91Y2hpbmcocG9pbnRlcikgJiYgKCsrdG91Y2hDb3VudCAlIDIgPT09IDApKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0dGhpcy5tZW51LmNvbGxhcHNlKCk7XHJcblx0XHRcdFx0dGhpcy5tZW51ID0gbnVsbDtcclxuXHRcdFx0fVxyXG5cdFx0fSwgdGhpcy5zY2VuZSk7XHJcblxyXG5cdFx0dGhpcy52YWx1ZVRleHQgPSB0aGlzLnNjZW5lLmFkZC50ZXh0KC10aGlzLmVsZW1lbnQuZGlzcGxheVdpZHRoICogLjEsIC10aGlzLmVsZW1lbnQuZGlzcGxheUhlaWdodCAqIC4wNzUsIHRoaXMudmFsdWUsIHtcclxuXHRcdFx0Zm9udEZhbWlseTogXCJBcmlhbFwiLFxyXG5cdFx0XHRhbGlnbjogXCJyaWdodFwiLFxyXG5cdFx0XHRmb250U2l6ZTogMjgsXHJcblx0XHRcdGZpbGw6IFwiI2ZmZmZmZlwiXHJcblx0XHR9KTtcclxuXHRcdHRoaXMudmFsdWVUZXh0LnNldE9yaWdpbiguNSk7XHJcblx0XHR0aGlzLmFkZCh0aGlzLnZhbHVlVGV4dCk7XHJcblxyXG5cdFx0aWYgKGRhdGEudGl0bGUpXHJcblx0XHR7XHJcblx0XHRcdHRoaXMudGl0bGUgPSB0aGlzLnNjZW5lLmFkZC50ZXh0KC10aGlzLmVsZW1lbnQuZGlzcGxheVdpZHRoICogMS4xLCAwLCBkYXRhLnRpdGxlLCB7XHJcblx0XHRcdFx0Zm9udEZhbWlseTogXCJBcmlhbFwiLFxyXG5cdFx0XHRcdGFsaWduOiBcImxlZnRcIixcclxuXHRcdFx0XHRmb250U2l6ZTogMjgsXHJcblx0XHRcdFx0ZmlsbDogXCIjZmZmZmZmXCJcclxuXHRcdFx0fSk7XHJcblx0XHRcdHRoaXMudGl0bGUuc2V0T3JpZ2luKC41KTtcclxuXHRcdFx0dGhpcy5hZGQodGhpcy50aXRsZSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEcm9wZG93bjtcclxuIiwiaW1wb3J0IHsgU2xpZGVyIGFzIFJleFNsaWRlciB9IGZyb20gXCJwaGFzZXIzLXJleC1wbHVnaW5zL3RlbXBsYXRlcy91aS91aS1jb21wb25lbnRzLmpzXCI7XHJcblxyXG5pbXBvcnQgU2V0dGluZyBmcm9tIFwiLi4vU2V0dGluZy5qc1wiO1xyXG5cclxuY2xhc3MgU2xpZGVyIGV4dGVuZHMgU2V0dGluZ1xyXG57XHJcblx0c3RhdGljIHByZWxvYWQobG9hZClcclxuXHR7XHJcblx0XHRsb2FkLnNldFBhdGgoXCJhc3NldHMvaW1nL2J1dHRvbnMvXCIpO1xyXG5cdFx0bG9hZC5pbWFnZShcInNsaWRlcl9rbm9iXCIsIFwic2xpZGVyLnBuZ1wiKTtcclxuXHR9XHJcblxyXG5cdGdldCB2YWx1ZSgpXHJcblx0e1xyXG5cdFx0cmV0dXJuIHN1cGVyLnZhbHVlO1xyXG5cdH1cclxuXHRzZXQgdmFsdWUoeClcclxuXHR7XHJcblx0XHRzdXBlci52YWx1ZSA9IHg7XHJcblx0XHRpZiAodGhpcy52YWx1ZVRleHQpXHJcblx0XHRcdHRoaXMudmFsdWVUZXh0LnRleHQgPSBgJHsodGhpcy52YWx1ZSAqIDEwMCkudG9GaXhlZCgpfSVgO1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IoZGF0YSlcclxuXHR7XHJcblx0XHRzdXBlcihkYXRhKTtcclxuXHJcblx0XHRjb25zdCBjb25maWcgPSBPYmplY3QuYXNzaWduKHtcclxuXHRcdFx0eDogZGF0YS54LFxyXG5cdFx0XHR5OiBkYXRhLnksXHJcblxyXG5cdFx0XHR3aWR0aDogdGhpcy53aWR0aCAqIC40LCAvLyBsZW5ndGhcclxuXHRcdFx0aGVpZ2h0OiAyMCwgLy8gdGhpY2NuZXNzXHJcblxyXG5cdFx0XHR2YWx1ZTogdGhpcy52YWx1ZSwgLy8gYWN0aXZlIHZhbHVlXHJcblx0XHRcdHZhbHVlY2hhbmdlQ2FsbGJhY2s6IHZhbCA9PiAvLyBvbiBjaGFuZ2VcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHRoaXMudmFsdWUgPSB2YWw7XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRvcmllbnRhdGlvbjogXCJ4XCIsIC8vIFwieFwiIG9yIFwieVwiIC0gZG93biBvciBzaWRld2F5c1xyXG5cdFx0XHRpbnB1dDogXCJkcmFnXCIsIC8vIFwiZHJhZ1wiIG9yIFwiY2xpY2tcIixcclxuXHJcblx0XHRcdHRyYWNrOiB0aGlzLnNjZW5lLnJleFVJLmFkZC5yb3VuZFJlY3RhbmdsZSgwLCAwLCAwLCAwLCAxMCwgMHhGREZFRkUpLCAvLyBiYWNrZ3JvdW5kIGJhclxyXG5cdFx0XHRpbmRpY2F0b3I6IHRoaXMuc2NlbmUucmV4VUkuYWRkLnJvdW5kUmVjdGFuZ2xlKDAsIDAsIDAsIDAsIDEwLCAweDg1QzFFOSksIC8vIGJhY2tncm91bmQgYWN0aXZlIGJhclxyXG5cdFx0XHR0aHVtYjogdGhpcy5zY2VuZS5yZXhVSS5hZGQucm91bmRSZWN0YW5nbGUoMCwgMCwgMCwgMCwgMjAsIDB4MUE1Mjc2KSwgLy8gc2xpZGVyIGJ1dHRvblxyXG5cdFx0fSwgZGF0YS5lbGVtZW50KTtcclxuXHJcblx0XHQvLyBvdmVycmlkZSBldmVudCB3aGVuIHN1cHBsaWVkIGluIGRhdGEgdG8gYm90aCBleGVjdXRlIGRlZmF1bHQgJiBjdXN0b20gaGFuZGxlcnNcclxuXHRcdGlmIChkYXRhLnZhbHVlY2hhbmdlQ2FsbGJhY2spXHJcblx0XHR7XHJcblx0XHRcdGNvbmZpZy52YWx1ZWNoYW5nZUNhbGxiYWNrID0gKHZhbCkgPT5cclxuXHRcdFx0e1xyXG5cdFx0XHRcdHRoaXMudmFsdWUgPSB2YWw7XHJcblx0XHRcdFx0ZGF0YS52YWx1ZWNoYW5nZUNhbGxiYWNrKHZhbCk7XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5lbGVtZW50ID0gbmV3IFJleFNsaWRlcih0aGlzLnNjZW5lLCBjb25maWcpO1xyXG5cdFx0dGhpcy5lbGVtZW50LmxheW91dCgpO1xyXG5cclxuXHRcdGlmIChkYXRhLnRpdGxlKVxyXG5cdFx0e1xyXG5cdFx0XHR0aGlzLnRpdGxlID0gdGhpcy5zY2VuZS5hZGQudGV4dCgtZGF0YS5lbGVtZW50LndpZHRoICogLjQ1LCAtZGF0YS5lbGVtZW50LmhlaWdodCAqIDEuNSwgZGF0YS50aXRsZSwge1xyXG5cdFx0XHRcdGZvbnRGYW1pbHk6IFwiQXJpYWxcIixcclxuXHRcdFx0XHRhbGlnbjogXCJsZWZ0XCIsXHJcblx0XHRcdFx0Zm9udFNpemU6IDI4LFxyXG5cdFx0XHRcdGZpbGw6IFwiI2ZmZmZmZlwiXHJcblx0XHRcdH0pO1xyXG5cdFx0XHR0aGlzLnRpdGxlLnNldE9yaWdpbigwLCAuNSk7XHJcblx0XHRcdHRoaXMuYWRkKHRoaXMudGl0bGUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMudmFsdWVUZXh0ID0gdGhpcy5zY2VuZS5hZGQudGV4dChkYXRhLmVsZW1lbnQud2lkdGggKiAuNDUsIC1kYXRhLmVsZW1lbnQuaGVpZ2h0ICogMS41LCBgJHsodGhpcy52YWx1ZSAqIDEwMCkudG9GaXhlZCgpfSVgLCB7XHJcblx0XHRcdGZvbnRGYW1pbHk6IFwiQXJpYWxcIixcclxuXHRcdFx0YWxpZ246IFwicmlnaHRcIixcclxuXHRcdFx0Zm9udFNpemU6IDI4LFxyXG5cdFx0XHRmaWxsOiBcIiNmZmZmZmZcIlxyXG5cdFx0fSk7XHJcblx0XHR0aGlzLnZhbHVlVGV4dC5zZXRPcmlnaW4oMSwgLjUpO1xyXG5cdFx0dGhpcy5hZGQodGhpcy52YWx1ZVRleHQpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2xpZGVyO1xyXG4iLCJpbXBvcnQgU2xpZGVyIGZyb20gXCIuL1NsaWRlci5qc1wiO1xyXG5cclxuY2xhc3MgVm9sdW1lU2xpZGVyIGV4dGVuZHMgU2xpZGVyXHJcbntcclxuXHRjb25zdHJ1Y3RvcihkYXRhKVxyXG5cdHtcclxuXHRcdHN1cGVyKE9iamVjdC5hc3NpZ24oe1xyXG5cdFx0XHR2YWx1ZWNoYW5nZUNhbGxiYWNrOiAodmFsKSA9PlxyXG5cdFx0XHR7XHJcblx0XHRcdFx0Y29uc3QgY2hhbm5lbCA9IGRhdGEua2V5LnNwbGl0KFwiLlwiKVsxXTtcclxuXHRcdFx0XHRkYXRhLnNjZW5lLmdhbWUuYXVkaW9bY2hhbm5lbF0uc2V0Vm9sdW1lKHZhbCk7XHJcblx0XHRcdH1cclxuXHRcdH0sIGRhdGEpKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZvbHVtZVNsaWRlcjtcclxuIiwiaW1wb3J0IFNjZW5lIGZyb20gXCIuLi9vYmplY3RzL1NjZW5lLmpzXCI7XHJcbmltcG9ydCBDYXJkSG9sZGVyIGZyb20gXCIuLi9vYmplY3RzL0NhcmRIb2xkZXIuanNcIjtcclxuaW1wb3J0IFNjb3JlVHJhY2tlciBmcm9tIFwiLi4vb2JqZWN0cy9TY29yZVRyYWNrZXIuanNcIjtcclxuaW1wb3J0IFNjb3JlQm9hcmQgZnJvbSBcIi4uL29iamVjdHMvU2NvcmVCb2FyZC5qc1wiO1xyXG5pbXBvcnQgQmFsbFF1ZXVlIGZyb20gXCIuLi9vYmplY3RzL0JhbGxRdWV1ZS5qc1wiO1xyXG5pbXBvcnQgU2NlbmVCdXR0b24gZnJvbSBcIi4uL29iamVjdHMvU2NlbmVCdXR0b24uanNcIjtcclxuXHJcbmNsYXNzIFNjZW5lX01hdGNoIGV4dGVuZHMgU2NlbmVcclxue1xyXG5cdGNvbnN0cnVjdG9yKClcclxuXHR7XHJcblx0XHRzdXBlcih7XHJcblx0XHRcdGtleTogXCJTY2VuZV9NYXRjaFwiLFxyXG5cdFx0XHR3YWxscGFwZXI6IHRydWVcclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMud2FpdGluZ1RleHQgPSBudWxsO1xyXG5cdFx0dGhpcy5jb25uZWN0aW9uID0gbnVsbDtcclxuXHJcblx0XHR0aGlzLmNhcmRzID0gMjtcclxuXHRcdHRoaXMuaW50ZXJ2YWwgPSA3LjU7XHJcblx0XHR0aGlzLm1hdGNoID0gbnVsbDtcclxuXHJcblx0XHR0aGlzLmNhcmRIb2xkZXIgPSBudWxsO1xyXG5cdFx0dGhpcy5xdWV1ZSA9IG51bGw7XHJcblx0XHR0aGlzLnNjb3JlID0ge1xyXG5cdFx0XHR0cmFja2VyOiBudWxsLFxyXG5cdFx0XHRib2FyZDogbnVsbCxcclxuXHRcdFx0cGxheWVyczoge31cclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRfY3JlYXRlQ29uZmV0dGkoKVxyXG5cdHtcclxuXHRcdHRoaXMuYW5pbXMuY3JlYXRlKHtcclxuXHRcdFx0a2V5OiBcIkNvbmZldHRpXCIsXHJcblx0XHRcdGZyYW1lczogdGhpcy5hbmltcy5nZW5lcmF0ZUZyYW1lTmFtZXMoXCJjb25mZXR0aVwiLCB7c3RhcnQ6MCwgZW5kOjU5LCB6ZXJvUGFkOjIsIHByZWZpeDpcImNvbmZldHRpX1wiLCBzdWZmaXg6XCIucG5nXCJ9KSxcclxuXHRcdFx0ZnJhbWVSYXRlOjMwLFxyXG5cdFx0XHRyZXBlYXQ6MCxcclxuXHRcdFx0aGlkZU9uQ29tcGxldGU6IHRydWUsXHJcblx0XHR9KTtcclxuXHRcdHRoaXMuY29uZmV0dGk9dGhpcy5hZGQuc3ByaXRlKHRoaXMud2lkdGggLyAyLHRoaXMuaGVpZ2h0IC8gMSxcImNvbmZldHRpXCIpO1xyXG5cdFx0dGhpcy5jb25mZXR0aS5wbGF5KFwiQ29uZmV0dGlcIik7XHJcblx0XHR0aGlzLmdhbWUuYXVkaW8uZWZmZWN0cy5wbGF5KFwiYXVkaW9fZWZmZWN0c19jaGVlcmluZ1wiLCB7IHZvbHVtZTogLjI1IH0pO1xyXG5cdH1cclxuXHJcblx0X2NyZWF0ZUNhcmRzKGxheW91dCA9IDIpXHJcblx0e1xyXG5cdFx0dGhpcy5jYXJkSG9sZGVyID0gbmV3IENhcmRIb2xkZXIobGF5b3V0LCB0aGlzLCB0aGlzLndpZHRoICogLjUsIHRoaXMuaGVpZ2h0ICogKGxheW91dCA8IDMgPyAuMjUgOiAuMTIpKTtcclxuXHRcdHRoaXMuYWRkLmV4aXN0aW5nKHRoaXMuY2FyZEhvbGRlcik7XHJcblx0fVxyXG5cclxuXHRfY3JlYXRlU2NvcmVUcmFja2VyKClcclxuXHR7XHJcblx0XHR0aGlzLnNjb3JlLnRyYWNrZXIgPSBuZXcgU2NvcmVUcmFja2VyKHtcclxuXHRcdFx0c2NlbmU6IHRoaXMsXHJcblx0XHRcdHg6IHRoaXMud2lkdGggKiAuODgsXHJcblx0XHRcdHk6IHRoaXMuaGVpZ2h0ICogLjFcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5zY29yZS50cmFja2VyLnNldFNjYWxlKC42NSk7XHJcblx0XHR0aGlzLmFkZC5leGlzdGluZyh0aGlzLnNjb3JlLnRyYWNrZXIpO1xyXG5cdH1cclxuXHJcblx0X2NyZWF0ZVNjb3JlQm9hcmQoKVxyXG5cdHtcclxuXHRcdC8qIFNjb3JlYm9hcmQgUGFuZWwgKi9cclxuXHRcdHRoaXMuYWRkLmltYWdlKHRoaXMuZ2FtZS5yZW5kZXJlci53aWR0aCAvIDEuMTQsIHRoaXMuZ2FtZS5yZW5kZXJlci5oZWlnaHQgLyAyLjEsIFwicGFuZWxfc2NvcmVzXCIpXHJcblx0XHRcdC5zZXRTY2FsZSguOCk7XHJcblx0XHR0aGlzLnNjb3JlLmJvYXJkID0gdGhpcy5yZXhVSS5hZGQuc2Nyb2xsYWJsZVBhbmVsKHtcclxuXHRcdFx0eDogdGhpcy53aWR0aCAqIC44NSxcclxuXHRcdFx0eTogdGhpcy5oZWlnaHQgKiAuNSxcclxuXHRcdFx0d2lkdGg6IHRoaXMud2lkdGggKiAuMixcclxuXHRcdFx0aGVpZ2h0OiB0aGlzLmhlaWdodCAqIC40LFxyXG5cclxuXHRcdFx0c2Nyb2xsTW9kZTogMCxcclxuXHJcblx0XHRcdHBhbmVsOiB7XHJcblx0XHRcdFx0Y2hpbGQ6IHRoaXMucmV4VUkuYWRkLmZpeFdpZHRoU2l6ZXIoe1xyXG5cdFx0XHRcdFx0YWxpZ246IFwicmlnaHRcIixcclxuXHRcdFx0XHRcdGFuY2hvcjogXCJjZW50ZXJcIixcclxuXHRcdFx0XHRcdHNwYWNlOiB7XHJcblx0XHRcdFx0XHRcdGxlZnQ6IDUsXHJcblx0XHRcdFx0XHRcdHJpZ2h0OiA1LFxyXG5cdFx0XHRcdFx0XHR0b3A6IDMsXHJcblx0XHRcdFx0XHRcdGJvdHRvbTogMyxcclxuXHRcdFx0XHRcdFx0aXRlbTogOCxcclxuXHRcdFx0XHRcdFx0bGluZTogOCxcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KSxcclxuXHJcblx0XHRcdFx0bWFzazoge1xyXG5cdFx0XHRcdFx0cGFkZGluZzogMVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRzcGFjZToge1xyXG5cdFx0XHRcdGxlZnQ6IDEwLFxyXG5cdFx0XHRcdHJpZ2h0OiAxMCxcclxuXHRcdFx0XHR0b3A6IDEwLFxyXG5cdFx0XHRcdGJvdHRvbTogMTAsXHJcblxyXG5cdFx0XHRcdHBhbmVsOiAxMCxcclxuXHRcdFx0fVxyXG5cdFx0fSkubGF5b3V0KCk7XHJcblx0XHR0aGlzLnVwZGF0ZVNjb3JlcygpO1xyXG5cdH1cclxuXHQvKlxyXG5cdF9jcmVhdGVCYWxsQ291bnRlcigpXHJcblx0e1xyXG5cdFx0Ly8gQmFsbCBDb3VudGVyIFBhbmVsXHJcblx0XHR0aGlzLmFkZC5pbWFnZSh0aGlzLmdhbWUucmVuZGVyZXIud2lkdGggLyAyMSwgdGhpcy5nYW1lLnJlbmRlcmVyLmhlaWdodCAvIDEwLCBcInBhbmVsX2JhbGxfY291bnRcIilcclxuXHRcdFx0LnNldFNjYWxlKDAuNCk7XHJcblx0XHQvLyBCYWxsIENvdW50ZXIgVGV4dFxyXG5cdFx0dGhpcy5hZGQudGV4dCh7XHJcblx0XHRcdHg6IHRoaXMud2lkdGggLyAyMSxcclxuXHRcdFx0eTogdGhpcy5oZWlnaHQgLyAxMCxcclxuXHRcdFx0dGV4dDogXCJCYWxsIENvdW50ZXJcIixcclxuXHRcdFx0c3R5bGU6IHtcclxuXHRcdFx0XHRmb250OiBcIjE4cHggbW9ub3NwYWNlXCIsXHJcblx0XHRcdFx0ZmlsbDogXCIjRkZGRkZGXCIsXHJcblx0XHRcdFx0YWxpZ246IFwiY2VudGVyXCJcclxuXHRcdFx0fVxyXG5cdFx0fSkuc2V0T3JpZ2luKC41KTtcclxuXHR9XHJcblx0Ki9cclxuXHRfY3JlYXRlQmFsbFF1ZXVlKClcclxuXHR7XHJcblx0XHR0aGlzLnF1ZXVlID0gbmV3IEJhbGxRdWV1ZSh7XHJcblx0XHRcdHNjZW5lOiB0aGlzLFxyXG5cdFx0XHR4OiB0aGlzLndpZHRoICogLjE1LFxyXG5cdFx0XHR5OiB0aGlzLmhlaWdodCAqIC41XHJcblx0XHR9KTtcclxuXHRcdHRoaXMucXVldWUuc2V0U2NhbGUoLjYpO1xyXG5cdFx0dGhpcy5hZGQuZXhpc3RpbmcodGhpcy5xdWV1ZSk7XHJcblx0fVxyXG5cclxuXHRjcmVhdGUoZGF0YSA9IHt9KVxyXG5cdHtcclxuXHRcdHN1cGVyLmNyZWF0ZShkYXRhKTtcclxuXHJcblx0XHR0aGlzLmNvbm5lY3Rpb24gPSB0aGlzLmdhbWUuY29ubmVjdGlvbjtcclxuXHRcdHRoaXMuY29ubmVjdGlvbi5tYXRjaFNjZW5lID0gdGhpcztcclxuXHJcblx0XHR0aGlzLmNhcmRzID0gZGF0YS5jYXJkcztcclxuXHRcdHRoaXMuaW50ZXJ2YWwgPSBkYXRhLmludGVydmFsO1xyXG5cdFx0dGhpcy5tYXRjaCA9IGRhdGEubWF0Y2g7XHJcblxyXG5cdFx0dGhpcy5zY29yZS5wbGF5ZXJzID0gbmV3IE1hcCgpO1xyXG5cdFx0Zm9yIChjb25zdCBwbGF5ZXIgb2YgdGhpcy5jb25uZWN0aW9uLnBsYXllcnMudmFsdWVzKCkpXHJcblx0XHRcdHRoaXMuc2NvcmUucGxheWVycy5zZXQocGxheWVyLmlkLCAwKTtcclxuXHJcblx0XHQvLyBbQnV0dG9uXSBFeGl0IE1hdGNoXHJcblx0XHR0aGlzLmFkZC5leGlzdGluZyhuZXcgU2NlbmVCdXR0b24obnVsbCwge1xyXG5cdFx0XHRzY2VuZTogdGhpcyxcclxuXHRcdFx0eDogdGhpcy53aWR0aCAvIDEuMTIsXHJcblx0XHRcdHk6IHRoaXMuaGVpZ2h0IC8gMS4xLFxyXG5cdFx0XHR1c2VyRGVjaXNpb246IFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGxlYXZlIHRoZSBtYXRjaCBhbmQgcmV0dXJuIHRvIHRoZSBtZW51P1wiLFxyXG5cdFx0XHRkZWZhdWx0QnV0dG9uRXZlbnRzOiB0cnVlLFxyXG5cdFx0XHR0ZXh0dXJlOiBcImJ1dHRvbl9leGl0XCIsXHJcblx0XHRcdGNsaWNrQ2FsbGJhY2s6ICgpID0+XHJcblx0XHRcdHtcclxuXHRcdFx0XHR0aGlzLmNvbm5lY3Rpb24ubGVhdmVNYXRjaCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KS5zZXRTY2FsZSguNSkpO1xyXG5cclxuXHRcdC8vdGhpcy5fY3JlYXRlQmFsbENvdW50ZXIoKTtcclxuXHRcdHRoaXMuX2NyZWF0ZUNhcmRzKHRoaXMuY2FyZHMpO1xyXG5cdFx0dGhpcy5fY3JlYXRlU2NvcmVUcmFja2VyKCk7XHJcblx0XHR0aGlzLl9jcmVhdGVTY29yZUJvYXJkKHRoaXMuY29ubmVjdGlvbi5wbGF5ZXJzKTtcclxuXHRcdHRoaXMuX2NyZWF0ZUJhbGxRdWV1ZSgpO1xyXG5cdFx0dGhpcy5jYXJkSG9sZGVyLnZpc2libGUgPSBmYWxzZTtcclxuXHRcdHRoaXMuc2NvcmUudHJhY2tlci52aXNpYmxlID0gZmFsc2U7XHJcblx0XHR0aGlzLnNjb3JlLmJvYXJkLnZpc2libGUgPSBmYWxzZTtcclxuXHRcdHRoaXMucXVldWUudmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuXHRcdCh0aGlzLndhaXRpbmdUZXh0ID0gdGhpcy5hZGQudGV4dCh7XHJcblx0XHRcdHg6IHRoaXMud2lkdGggKiAuNSxcclxuXHRcdFx0eTogdGhpcy5oZWlnaHQgKiAuNSxcclxuXHRcdFx0dGV4dDogXCJXYWl0aW5nIGZvciBQbGF5ZXJzLi4uXCIsXHJcblx0XHRcdHN0eWxlOiB7XHJcblx0XHRcdFx0Zm9udFNpemU6IDQyLFxyXG5cdFx0XHRcdGZpbGw6IFwiI0ZGRkZGRlwiLFxyXG5cdFx0XHRcdGFsaWduOiBcImNlbnRlclwiXHJcblx0XHRcdH1cclxuXHRcdH0pKVxyXG5cdFx0XHQuc2V0T3JpZ2luKC41KVxyXG5cdFx0XHQuc2V0U3Ryb2tlKFwiI2ZmZlwiLCA2KTtcclxuXHJcblx0XHR0aGlzLmNvbm5lY3Rpb24ubWF0Y2gub25NZXNzYWdlKFwibWF0Y2gtc2NvcmUtdXBkYXRlXCIsIG1zZyA9PlxyXG5cdFx0e1xyXG5cdFx0XHR0aGlzLnNjb3JlLnBsYXllcnMuc2V0KG1zZy5pZCwgbXNnLnNjb3JlKTtcclxuXHRcdFx0dGhpcy51cGRhdGVTY29yZXMoKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMuY29ubmVjdGlvbi5tYXRjaC5zZW5kKFwibWF0Y2gtcmVhZHlcIik7XHJcblx0fVxyXG5cclxuXHRwbGF5QmFsbChiYWxsKVxyXG5cdHtcclxuXHRcdHRoaXMucXVldWUucHVzaCh0aGlzLnF1ZXVlLmNyZWF0ZUJhbGwoYmFsbC5jb2x1bW4sIGJhbGwubnVtYmVyKSk7XHJcblxyXG5cdFx0Y29uc3Qgdm9pY2VwYWNrID0gdGhpcy5nYW1lLmFubm91bmNlclxyXG5cdFx0XHQsIHZhcmlhdGlvbiA9IHZvaWNlcGFja1tiYWxsLmNvbHVtbl0uZ2V0KGJhbGwubnVtYmVyKS5yYW5kb20oKTtcclxuXHRcdHRoaXMuZ2FtZS5hdWRpby52b2ljZS5wbGF5KHZhcmlhdGlvbik7XHJcblx0fVxyXG5cclxuXHRiaW5nbygpXHJcblx0e1xyXG5cdFx0dGhpcy5zY29yZS50cmFja2VyLnNjb3JlICs9IDUwMDtcclxuXHJcblx0XHRjb25zdCB2b2ljZXBhY2sgPSB0aGlzLmdhbWUuYW5ub3VuY2VyO1xyXG5cdFx0dGhpcy5nYW1lLmF1ZGlvLnZvaWNlLnBsYXkodm9pY2VwYWNrLkJJTkdPLnJhbmRvbSgpKTtcclxuXHJcblx0XHR0aGlzLl9jcmVhdGVDb25mZXR0aSgpO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlU2NvcmVzKClcclxuXHR7XHJcblx0XHRjb25zdCBzaXplciA9IHRoaXMuc2NvcmUuYm9hcmQuZ2V0RWxlbWVudChcInBhbmVsXCIpO1xyXG5cclxuXHRcdHNpemVyLmNsZWFyKHRydWUpO1xyXG5cdFx0Zm9yIChjb25zdCBbIGlkLCBzY29yZSBdIG9mIHRoaXMuc2NvcmUucGxheWVycy5lbnRyaWVzKCkpXHJcblx0XHR7XHJcblx0XHRcdGNvbnN0IGl0ZW0gPSB0aGlzLmFkZC50ZXh0KDAsIDAsIGAke3RoaXMuY29ubmVjdGlvbi5wbGF5ZXJzLmdldChpZCkudGFnfTogJHtzY29yZX1gLCB7XHJcblx0XHRcdFx0eDogdGhpcy53aWR0aCAvIDEuNixcclxuXHRcdFx0XHR5OiB0aGlzLmhlaWdodCAvIDUsXHJcblx0XHRcdFx0YWxpZ246IFwicmlnaHRcIixcclxuXHRcdFx0XHRmb250U2l6ZTogMTgsXHJcblx0XHRcdFx0Zm9udFN0eWxlOiBcImJvbGRcIlxyXG5cdFx0XHR9KTtcclxuXHRcdFx0aXRlbS5zZXRPcmlnaW4oLjUpXHJcblx0XHRcdFx0LnNldFN0cm9rZShcIiMwMDBcIiwgNSlcclxuXHRcdFx0XHQuc2V0RGVwdGgoMTAwKTtcclxuXHJcblx0XHRcdHNpemVyLmFkZChpdGVtKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNjb3JlLmJvYXJkLmxheW91dCgpO1xyXG5cdFx0cmV0dXJuIHRoaXMuc2NvcmUuYm9hcmQ7XHJcblx0fVxyXG5cclxuXHRzdGFydCgpXHJcblx0e1xyXG5cdFx0dGhpcy53YWl0aW5nVGV4dC5kZXN0cm95KCk7XHJcblxyXG5cdFx0dGhpcy5jYXJkSG9sZGVyLnZpc2libGUgPSB0cnVlO1xyXG5cdFx0dGhpcy5zY29yZS50cmFja2VyLnZpc2libGUgPSB0cnVlO1xyXG5cdFx0dGhpcy5zY29yZS5ib2FyZC52aXNpYmxlID0gdHJ1ZTtcclxuXHRcdHRoaXMucXVldWUudmlzaWJsZSA9IHRydWU7XHJcblx0fVxyXG5cclxuXHRlbmQoKVxyXG5cdHtcclxuXHRcdHRoaXMudGltZS5kZWxheWVkQ2FsbCg1MDAwLCAoKSA9PlxyXG5cdFx0e1xyXG5cdFx0XHQvKiBFbmQgUGFuZWwgKi9cclxuXHRcdFx0dGhpcy5hZGQuaW1hZ2UodGhpcy5nYW1lLnJlbmRlcmVyLndpZHRoIC8gMiwgdGhpcy5nYW1lLnJlbmRlcmVyLmhlaWdodCAvIDIsIFwicGFuZWxfZW5kXCIpO1xyXG5cdFx0XHR0aGlzLmFkZC5leGlzdGluZyhuZXcgU2NlbmVCdXR0b24oXCJTY2VuZV9NZW51X01haW5cIiwge1xyXG5cdFx0XHRcdHNjZW5lOiB0aGlzLFxyXG5cdFx0XHRcdHg6IHRoaXMud2lkdGggKiAuNSxcclxuXHRcdFx0XHR5OiB0aGlzLmhlaWdodCAqIC45LFxyXG5cdFx0XHRcdGRlZmF1bHRCdXR0b25FdmVudHM6IHRydWUsXHJcblx0XHRcdFx0dGV4dHVyZTogXCJidXR0b25fbWFpbl9tZW51XCJcclxuXHRcdFx0fSkuc2V0U2NhbGUoLjUpKTtcclxuXHJcblx0XHRcdHRoaXMubWFrZS50ZXh0KHtcclxuXHRcdFx0XHR4OiB0aGlzLndpZHRoIC8gMi40LFxyXG5cdFx0XHRcdHk6IHRoaXMuaGVpZ2h0IC8gMy4yLFxyXG5cdFx0XHRcdHRleHQ6IFwiTmFtZVwiLFxyXG5cdFx0XHRcdHN0eWxlOiB7XHJcblx0XHRcdFx0XHRmb250OiBcIjMwcHggbW9ub3NwYWNlXCIsXHJcblx0XHRcdFx0XHRmaWxsOiBcIiNGRkZGRkZcIixcclxuXHRcdFx0XHRcdGFsaWduOiBcImNlbnRlclwiXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KS5zZXRPcmlnaW4oLjUpO1xyXG5cclxuXHRcdFx0dGhpcy5tYWtlLnRleHQoe1xyXG5cdFx0XHRcdHg6IHRoaXMud2lkdGggLyAxLjcsXHJcblx0XHRcdFx0eTogdGhpcy5oZWlnaHQgLyAzLjIsXHJcblx0XHRcdFx0dGV4dDogXCJTY29yZVwiLFxyXG5cdFx0XHRcdHN0eWxlOiB7XHJcblx0XHRcdFx0XHRmb250OiBcIjMwcHggbW9ub3NwYWNlXCIsXHJcblx0XHRcdFx0XHRmaWxsOiBcIiNGRkZGRkZcIixcclxuXHRcdFx0XHRcdGFsaWduOiBcImNlbnRlclwiXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KS5zZXRPcmlnaW4oLjUpO1xyXG5cclxuXHRcdFx0dGhpcy5jYXJkSG9sZGVyLmRlc3Ryb3koKTtcclxuXHRcdFx0dGhpcy5zY29yZS50cmFja2VyLmRlc3Ryb3koKTtcclxuXHRcdFx0dGhpcy5xdWV1ZS5kZXN0cm95KCk7XHJcblxyXG5cdFx0XHR0aGlzLnNjb3JlLmJvYXJkLnggPSB0aGlzLndpZHRoICogLjU7XHJcblx0XHRcdHRoaXMuc2NvcmUuYm9hcmQueSA9IHRoaXMuaGVpZ2h0ICogLjY7XHJcblx0XHRcdHRoaXMudXBkYXRlU2NvcmVzKCk7XHJcblxyXG5cdFx0XHQvLyBBTklNQVRJT05cclxuXHRcdFx0dGhpcy5fY3JlYXRlQ29uZmV0dGkoKTtcclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2NlbmVfTWF0Y2g7XHJcbiIsImltcG9ydCAqIGFzIFBoYXNlciBmcm9tIFwicGhhc2VyXCI7XHJcblxyXG5pbXBvcnQgU2NlbmUgZnJvbSBcIi4uL29iamVjdHMvU2NlbmUuanNcIjtcclxuXHJcbmNsYXNzIFNjZW5lX01lbnVfQ3JlZGl0cyBleHRlbmRzIFNjZW5lXHJcbntcclxuXHRjb25zdHJ1Y3RvcigpXHJcblx0e1xyXG5cdFx0c3VwZXIoe1xyXG5cdFx0XHRrZXk6IFwiU2NlbmVfTWVudV9DcmVkaXRzXCIsXHJcblx0XHRcdHdhbGxwYXBlcjogdHJ1ZVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRjcmVhdGUoZGF0YSA9IHt9KVxyXG5cdHtcclxuXHRcdHN1cGVyLmNyZWF0ZShkYXRhKTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZSgpXHJcblx0e1xyXG5cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNjZW5lX01lbnVfQ3JlZGl0cztcclxuIiwiaW1wb3J0IFNjZW5lIGZyb20gXCIuLi9vYmplY3RzL1NjZW5lLmpzXCI7XHJcbmltcG9ydCBTY2VuZUJ1dHRvbiBmcm9tIFwiLi4vb2JqZWN0cy9TY2VuZUJ1dHRvbi5qc1wiO1xyXG5cclxuY2xhc3MgU2NlbmVfTWVudV9MZWFkZXJib2FyZCBleHRlbmRzIFNjZW5lXHJcbntcclxuXHRjb25zdHJ1Y3RvcigpXHJcblx0e1xyXG5cdFx0c3VwZXIoe1xyXG5cdFx0XHRrZXk6IFwiU2NlbmVfTWVudV9MZWFkZXJib2FyZFwiLFxyXG5cdFx0XHR3YWxscGFwZXI6IHRydWVcclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMuY29ubmVjdGlvbiA9IG51bGw7XHJcblxyXG5cdFx0dGhpcy5hbmltcyA9IG51bGw7XHJcblx0XHR0aGlzLnNjb3JlcyA9IFtdO1xyXG5cdH1cclxuXHJcblx0Y3JlYXRlKGRhdGEgPSB7fSlcclxuXHR7XHJcblx0XHRzdXBlci5jcmVhdGUoZGF0YSk7XHJcblxyXG5cdFx0dGhpcy5jb25uZWN0aW9uID0gdGhpcy5nYW1lLmNvbm5lY3Rpb247XHJcblxyXG5cdFx0LyogU2V0dGluZ3MgUGFuZWwgKi9cclxuXHRcdHRoaXMuYWRkLmltYWdlKHRoaXMuZ2FtZS5yZW5kZXJlci53aWR0aCAvIDIsIHRoaXMuZ2FtZS5yZW5kZXJlci5oZWlnaHQgKiAwLjUwLCBcInBhbmVsX2xlYWRlcmJvYXJkXCIpXHJcblx0XHRcdC5zZXRTY2FsZSgxLjMpO1xyXG5cclxuXHRcdHRoaXMubWFrZS50ZXh0KHtcclxuXHRcdFx0eDogdGhpcy53aWR0aCAvIDIuOCxcclxuXHRcdFx0eTogdGhpcy5oZWlnaHQgLyA0LFxyXG5cdFx0XHR0ZXh0OiBcIk5hbWVcIixcclxuXHRcdFx0c3R5bGU6IHtcclxuXHRcdFx0XHRmb250OiBcIjMwcHggbW9ub3NwYWNlXCIsXHJcblx0XHRcdFx0ZmlsbDogXCIjRkZGRkZGXCIsXHJcblx0XHRcdFx0YWxpZ246IFwiY2VudGVyXCJcclxuXHRcdFx0fVxyXG5cdFx0fSkuc2V0T3JpZ2luKC41KTtcclxuXHJcblx0XHR0aGlzLm1ha2UudGV4dCh7XHJcblx0XHRcdHg6IHRoaXMud2lkdGggLyAxLjYsXHJcblx0XHRcdHk6IHRoaXMuaGVpZ2h0IC8gNCxcclxuXHRcdFx0dGV4dDogXCJTY29yZVwiLFxyXG5cdFx0XHRzdHlsZToge1xyXG5cdFx0XHRcdGZvbnQ6IFwiMzBweCBtb25vc3BhY2VcIixcclxuXHRcdFx0XHRmaWxsOiBcIiNGRkZGRkZcIixcclxuXHRcdFx0XHRhbGlnbjogXCJjZW50ZXJcIlxyXG5cdFx0XHR9XHJcblx0XHR9KS5zZXRPcmlnaW4oLjUpO1xyXG5cclxuXHRcdC8qIEJhY2sgQnV0dG9uICovXHJcblx0XHR0aGlzLmFkZC5leGlzdGluZyhuZXcgU2NlbmVCdXR0b24oXCJTY2VuZV9NZW51X01haW5cIiwge1xyXG5cdFx0XHRzY2VuZTogdGhpcyxcclxuXHRcdFx0eDogdGhpcy53aWR0aCAqIC4xLFxyXG5cdFx0XHR5OiB0aGlzLmhlaWdodCAqIC4wNzUsXHJcblx0XHRcdGRlZmF1bHRCdXR0b25FdmVudHM6IHRydWVcclxuXHRcdH0pLnNldFNjYWxlKC41KSk7XHJcblxyXG5cdFx0Ly9QYW5lbFxyXG5cdFx0Y29uc3Qgc2Nyb2xsYWJsZVBhbmVsID0gdGhpcy5yZXhVSS5hZGQuc2Nyb2xsYWJsZVBhbmVsKHtcclxuXHRcdFx0eDogdGhpcy53aWR0aCAvIDIsXHJcblx0XHRcdHk6IHRoaXMuaGVpZ2h0IC8gMS42NSxcclxuXHRcdFx0d2lkdGg6IHRoaXMud2lkdGggKiAuNDUsXHJcblx0XHRcdGhlaWdodDogdGhpcy5oZWlnaHQgKiAuNixcclxuXHJcblx0XHRcdHNjcm9sbE1vZGU6IDAsXHJcblxyXG5cdFx0XHRiYWNrZ3JvdW5kOiB0aGlzLnJleFVJLmFkZC5yb3VuZFJlY3RhbmdsZSgwLCAwLCAyLCAyLCAxMCwgMHgyMjJkMmUpLC8vMHgyMjJkMmVcclxuXHJcblx0XHRcdHBhbmVsOiB7XHJcblx0XHRcdFx0Y2hpbGQ6IHRoaXMucmV4VUkuYWRkLmZpeFdpZHRoU2l6ZXIoe1xyXG5cdFx0XHRcdFx0YWxpZ246IFwiY2VudGVyXCIsXHJcblx0XHRcdFx0XHRhbmNob3I6IFwiY2VudGVyXCIsXHJcblx0XHRcdFx0XHRzcGFjZToge1xyXG5cdFx0XHRcdFx0XHRsZWZ0OiAzLFxyXG5cdFx0XHRcdFx0XHRyaWdodDogMyxcclxuXHRcdFx0XHRcdFx0dG9wOiAzLFxyXG5cdFx0XHRcdFx0XHRib3R0b206IDQsXHJcblx0XHRcdFx0XHRcdGl0ZW06IDgsXHJcblx0XHRcdFx0XHRcdGxpbmU6IDgsXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSksXHJcblxyXG5cdFx0XHRcdG1hc2s6IHtcclxuXHRcdFx0XHRcdHBhZGRpbmc6IDFcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0c3BhY2U6IHtcclxuXHRcdFx0XHRsZWZ0OiAxMCxcclxuXHRcdFx0XHRyaWdodDogMTAsXHJcblx0XHRcdFx0dG9wOiAxMCxcclxuXHRcdFx0XHRib3R0b206IDEwLFxyXG5cclxuXHRcdFx0XHRwYW5lbDogMTAsXHJcblx0XHRcdH1cclxuXHRcdH0pLmxheW91dCgpO1xyXG5cclxuXHRcdHZhciB1cGRhdGVQYW5lbCA9ICgpID0+XHJcblx0XHR7XHJcblx0XHRcdGNvbnN0IHNpemVyID0gc2Nyb2xsYWJsZVBhbmVsLmdldEVsZW1lbnQoXCJwYW5lbFwiKTtcclxuXHJcblx0XHRcdHNpemVyLmNsZWFyKHRydWUpO1xyXG5cdFx0XHRmb3IgKGNvbnN0IHNjb3JlIG9mIHRoaXMuc2NvcmVzKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0Y29uc3QgaXRlbSA9IHRoaXMuYWRkLnRleHQoMCwgMCwgYCR7c2NvcmUudGFnfTogJHtzY29yZS54cH1gLCB7XHJcblx0XHRcdFx0XHRhbGlnbjogXCJjZW50ZXJcIixcclxuXHRcdFx0XHRcdGZvbnRTaXplOiAzMixcclxuXHRcdFx0XHRcdGZvbnRTdHlsZTogXCJib2xkXCJcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRpdGVtLnNldE9yaWdpbiguNSlcclxuXHRcdFx0XHRcdC5zZXRTdHJva2UoXCIjMDAwXCIsIDUpO1xyXG5cclxuXHRcdFx0XHRzaXplci5hZGQoaXRlbSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHNjcm9sbGFibGVQYW5lbC5sYXlvdXQoKTtcclxuXHRcdFx0cmV0dXJuIHNjcm9sbGFibGVQYW5lbDtcclxuXHRcdH07XHJcblxyXG5cdFx0aWYgKCF0aGlzLmNvbm5lY3Rpb24gfHwgKHRoaXMuY29ubmVjdGlvbiAmJiAhdGhpcy5jb25uZWN0aW9uLm1hdGNoKSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuY29ubmVjdGlvbi5tYXRjaC5zZW5kKFwibGVhZGVyYm9hcmQtZmV0Y2gtMTAwXCIpO1xyXG5cdFx0dGhpcy5jb25uZWN0aW9uLm1hdGNoLm9uTWVzc2FnZShcImxlYWRlcmJvYXJkLTEwMFwiLCBtc2cgPT5cclxuXHRcdHtcclxuXHRcdFx0dGhpcy5zY29yZXMgPSBtc2cuc2NvcmVzO1xyXG5cdFx0XHR1cGRhdGVQYW5lbCgpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTY2VuZV9NZW51X0xlYWRlcmJvYXJkO1xyXG4iLCJpbXBvcnQgU2NlbmUgZnJvbSBcIi4uL29iamVjdHMvU2NlbmUuanNcIjtcclxuaW1wb3J0IFNjZW5lQnV0dG9uIGZyb20gXCIuLi9vYmplY3RzL1NjZW5lQnV0dG9uLmpzXCI7XHJcblxyXG5jbGFzcyBTY2VuZV9NZW51X0xvYmJpZXMgZXh0ZW5kcyBTY2VuZVxyXG57XHJcblx0Y29uc3RydWN0b3IoKVxyXG5cdHtcclxuXHRcdHN1cGVyKHtcclxuXHRcdFx0a2V5OiBcIlNjZW5lX01lbnVfTG9iYmllc1wiLFxyXG5cdFx0XHR3YWxscGFwZXI6IHRydWVcclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMuY29ubmVjdGlvbiA9IG51bGw7XHJcblx0XHR0aGlzLnBsYXllcnMgPSBbXTtcclxuXHJcblx0XHR0aGlzLmJ1dHRvbnMgPSB7XHJcblx0XHRcdGpvaW5fbG9iYnk6IG51bGwsXHJcblx0XHRcdGNyZWF0ZV9sb2JieTpudWxsXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0Y3JlYXRlKGRhdGEgPSB7fSlcclxuXHR7XHJcblx0XHRzdXBlci5jcmVhdGUoZGF0YSk7XHJcblxyXG5cdFx0dGhpcy5jb25uZWN0aW9uID0gdGhpcy5nYW1lLmNvbm5lY3Rpb247XHJcblxyXG5cdFx0Ly8gW0J1dHRvbl0gQmFja1xyXG5cdFx0dGhpcy5hZGQuZXhpc3RpbmcobmV3IFNjZW5lQnV0dG9uKFwiU2NlbmVfTWVudV9NYWluXCIsIHtcclxuXHRcdFx0c2NlbmU6IHRoaXMsXHJcblx0XHRcdHg6IHRoaXMud2lkdGggKiAuMSxcclxuXHRcdFx0eTogdGhpcy5oZWlnaHQgKiAuMDc1LFxyXG5cdFx0XHRkZWZhdWx0QnV0dG9uRXZlbnRzOiB0cnVlXHJcblx0XHR9KS5zZXRTY2FsZSguNSkpO1xyXG5cclxuXHRcdC8qIExvYmJpZXMgUGFuZWwgKi9cclxuXHRcdHRoaXMuYWRkLmltYWdlKHRoaXMuZ2FtZS5yZW5kZXJlci53aWR0aCAvIDIsIHRoaXMuZ2FtZS5yZW5kZXJlci5oZWlnaHQgKiAwLjQwLCBcInBhbmVsX2xvYmJpZXNcIilcclxuXHRcdFx0LnNldFNjYWxlKDEpO1xyXG5cclxuXHRcdC8vIExvYmJ5XHJcblx0XHR0aGlzLmFkZC50ZXh0KHtcclxuXHRcdFx0eDogdGhpcy53aWR0aCAvIDIuNyxcclxuXHRcdFx0eTogdGhpcy5oZWlnaHQgLyA1LFxyXG5cdFx0XHR0ZXh0OiBcIkxvYmJ5XCIsXHJcblx0XHRcdHN0eWxlOiB7XHJcblx0XHRcdFx0Zm9udDogXCIyNXB4IG1vbm9zcGFjZVwiLFxyXG5cdFx0XHRcdGZpbGw6IFwiI0ZGRkZGRlwiLFxyXG5cdFx0XHRcdGFsaWduOiBcImNlbnRlclwiXHJcblx0XHRcdH1cclxuXHRcdH0pLnNldE9yaWdpbiguNSk7XHJcblxyXG5cdFx0Ly8gUGxheWVyc1xyXG5cdFx0dGhpcy5hZGQudGV4dCh7XHJcblx0XHRcdHg6IHRoaXMud2lkdGggLyAyLFxyXG5cdFx0XHR5OiB0aGlzLmhlaWdodCAvIDUsXHJcblx0XHRcdHRleHQ6IFwiUGxheWVyc1wiLFxyXG5cdFx0XHRzdHlsZToge1xyXG5cdFx0XHRcdGZvbnQ6IFwiMjVweCBtb25vc3BhY2VcIixcclxuXHRcdFx0XHRmaWxsOiBcIiNGRkZGRkZcIixcclxuXHRcdFx0XHRhbGlnbjogXCJjZW50ZXJcIlxyXG5cdFx0XHR9XHJcblx0XHR9KS5zZXRPcmlnaW4oLjUpO1xyXG5cclxuXHRcdC8vIFN0YXR1c1xyXG5cdFx0dGhpcy5hZGQudGV4dCh7XHJcblx0XHRcdHg6IHRoaXMud2lkdGggLyAxLjYsXHJcblx0XHRcdHk6IHRoaXMuaGVpZ2h0IC8gNSxcclxuXHRcdFx0dGV4dDogXCJTdGF0dXNcIixcclxuXHRcdFx0c3R5bGU6IHtcclxuXHRcdFx0XHRmb250OiBcIjI1cHggbW9ub3NwYWNlXCIsXHJcblx0XHRcdFx0ZmlsbDogXCIjRkZGRkZGXCIsXHJcblx0XHRcdFx0YWxpZ246IFwiY2VudGVyXCJcclxuXHRcdFx0fVxyXG5cdFx0fSkuc2V0T3JpZ2luKC41KTtcclxuXHJcblx0XHQvLyBTY3JvbGxhYmxlIFBhbmVsXHJcblx0XHRjb25zdCBzY3JvbGxhYmxlUGFuZWwgPSB0aGlzLnJleFVJLmFkZC5zY3JvbGxhYmxlUGFuZWwoe1xyXG5cdFx0XHR4OiB0aGlzLndpZHRoIC8gMixcclxuXHRcdFx0eTogdGhpcy5oZWlnaHQgLyAyLjEsXHJcblx0XHRcdHdpZHRoOiB0aGlzLndpZHRoICogLjMzLFxyXG5cdFx0XHRoZWlnaHQ6IHRoaXMuaGVpZ2h0ICogLjQ4LFxyXG5cclxuXHRcdFx0c2Nyb2xsTW9kZTogMCxcclxuXHJcblx0XHRcdGJhY2tncm91bmQ6IHRoaXMucmV4VUkuYWRkLnJvdW5kUmVjdGFuZ2xlKDAsIDAsIDIsIDIsIDEwLCAweDIyMmQyZSksXHJcblxyXG5cdFx0XHRwYW5lbDoge1xyXG5cdFx0XHRcdGNoaWxkOiB0aGlzLnJleFVJLmFkZC5maXhXaWR0aFNpemVyKHtcclxuXHRcdFx0XHRcdGFsaWduOiBcImNlbnRlclwiLFxyXG5cdFx0XHRcdFx0YW5jaG9yOiBcImNlbnRlclwiLFxyXG5cdFx0XHRcdFx0c3BhY2U6IHtcclxuXHRcdFx0XHRcdFx0bGVmdDogMyxcclxuXHRcdFx0XHRcdFx0cmlnaHQ6IDMsXHJcblx0XHRcdFx0XHRcdHRvcDogMyxcclxuXHRcdFx0XHRcdFx0Ym90dG9tOiAzLFxyXG5cdFx0XHRcdFx0XHRpdGVtOiA4LFxyXG5cdFx0XHRcdFx0XHRsaW5lOiA4LFxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pLFxyXG5cclxuXHRcdFx0XHRtYXNrOiB7XHJcblx0XHRcdFx0XHRwYWRkaW5nOiAxXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHNwYWNlOiB7XHJcblx0XHRcdFx0bGVmdDogMTAsXHJcblx0XHRcdFx0cmlnaHQ6IDEwLFxyXG5cdFx0XHRcdHRvcDogMTAsXHJcblx0XHRcdFx0Ym90dG9tOiAxMCxcclxuXHJcblx0XHRcdFx0cGFuZWw6IDEwLFxyXG5cdFx0XHR9XHJcblx0XHR9KS5sYXlvdXQoKTtcclxuXHJcblx0XHR2YXIgdXBkYXRlUGFuZWwgPSAoKSA9PlxyXG5cdFx0e1xyXG5cdFx0XHRjb25zdCBzaXplciA9IHNjcm9sbGFibGVQYW5lbC5nZXRFbGVtZW50KFwicGFuZWxcIik7XHJcblxyXG5cdFx0XHRzaXplci5jbGVhcih0cnVlKTtcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBsYXllcnMubGVuZ3RoOyBpKyspXHJcblx0XHRcdHtcclxuXHRcdFx0XHRjb25zdCBpdGVtID0gdGhpcy5hZGQudGV4dCgwLCAwLCB0aGlzLnBsYXllcnNbaV0sIHtcclxuXHRcdFx0XHRcdGFsaWduOiBcImNlbnRlclwiLFxyXG5cdFx0XHRcdFx0Zm9udFNpemU6IDMyLFxyXG5cdFx0XHRcdFx0Zm9udFN0eWxlOiBcImJvbGRcIlxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdGl0ZW0uc2V0T3JpZ2luKC41KVxyXG5cdFx0XHRcdFx0LnNldFN0cm9rZShcIiMwMDBcIiwgNSk7XHJcblxyXG5cdFx0XHRcdHNpemVyLmFkZChpdGVtKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c2Nyb2xsYWJsZVBhbmVsLmxheW91dCgpO1xyXG5cdFx0XHRyZXR1cm4gc2Nyb2xsYWJsZVBhbmVsO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvLyBbQnV0dG9uXSBKb2luIExvYmJ5XHJcblx0XHR0aGlzLmFkZC5leGlzdGluZyhuZXcgU2NlbmVCdXR0b24oXCJTY2VuZV9NZW51X0xvYmJ5XCIsIHtcclxuXHRcdFx0c2NlbmU6IHRoaXMsXHJcblx0XHRcdHg6IHRoaXMud2lkdGggKiAuNCxcclxuXHRcdFx0eTogdGhpcy5oZWlnaHQgKiAuOCxcclxuXHRcdFx0ZGVmYXVsdEJ1dHRvbkV2ZW50czogdHJ1ZSxcclxuXHRcdFx0dGV4dHVyZTogXCJidXR0b25fam9pbl9sb2JieVwiXHJcblx0XHR9KS5zZXRTY2FsZSguNSkpO1xyXG5cclxuXHRcdC8vIFtCdXR0b25dIENyZWF0ZSBMb2JieVxyXG5cdFx0dGhpcy5hZGQuZXhpc3RpbmcobmV3IFNjZW5lQnV0dG9uKFwiU2NlbmVfTWVudV9Mb2JieVwiLCB7XHJcblx0XHRcdHNjZW5lOiB0aGlzLFxyXG5cdFx0XHR4OiB0aGlzLndpZHRoICogLjYsXHJcblx0XHRcdHk6IHRoaXMuaGVpZ2h0ICogLjgsXHJcblx0XHRcdGRlZmF1bHRCdXR0b25FdmVudHM6IHRydWUsXHJcblx0XHRcdHRleHR1cmU6IFwiYnV0dG9uX2NyZWF0ZV9sb2JieVwiXHJcblx0XHR9KS5zZXRTY2FsZSguNSkpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2NlbmVfTWVudV9Mb2JiaWVzO1xyXG4iLCJpbXBvcnQgU2NlbmUgZnJvbSBcIi4uL29iamVjdHMvU2NlbmUuanNcIjtcclxuaW1wb3J0IFNjZW5lQnV0dG9uIGZyb20gXCIuLi9vYmplY3RzL1NjZW5lQnV0dG9uLmpzXCI7XHJcbmltcG9ydCBCdXR0b24gZnJvbSBcIi4uL29iamVjdHMvYnV0dG9ucy9CdXR0b24uanNcIjtcclxuXHJcbmNsYXNzIFNjZW5lX01lbnVfTG9iYnkgZXh0ZW5kcyBTY2VuZVxyXG57XHJcblx0Y29uc3RydWN0b3IoKVxyXG5cdHtcclxuXHRcdHN1cGVyKHtcclxuXHRcdFx0a2V5OiBcIlNjZW5lX01lbnVfTG9iYnlcIixcclxuXHRcdFx0d2FsbHBhcGVyOiB0cnVlXHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLmNvbm5lY3Rpb24gPSBudWxsO1xyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSB7XHJcblx0XHRcdGNhcmRzOiBudWxsLFxyXG5cdFx0XHRpbnRlcnZhbDogbnVsbFxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdF9jcmVhdGVTZXR0aW5ncygpXHJcblx0e1xyXG5cdFx0Y29uc3QgWF9DQVJEUyA9IHRoaXMud2lkdGggKiAuNCwgWV9DQVJEUyA9IHRoaXMuaGVpZ2h0ICogLjQ7XHJcblx0XHR0aGlzLmFkZC50ZXh0KFhfQ0FSRFMsIFlfQ0FSRFMgLSAodGhpcy5oZWlnaHQgKiAuMDUpLCBcIkNhcmRzXCIsIHtcclxuXHRcdFx0Zm9udFNpemU6IDI4LFxyXG5cdFx0XHRmb250U3R5bGU6IFwiYm9sZFwiLFxyXG5cdFx0XHRhbGlnbjogXCJjZW50ZXJcIlxyXG5cdFx0fSkuc2V0T3JpZ2luKC41KTtcclxuXHRcdHRoaXMuc2V0dGluZ3MuY2FyZHMgPSB0aGlzLmFkZC50ZXh0KFhfQ0FSRFMsIFlfQ0FSRFMsIFwiMlwiLCB7XHJcblx0XHRcdGZvbnRTaXplOiAzMixcclxuXHRcdFx0YWxpZ246IFwiY2VudGVyXCJcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5zZXR0aW5ncy5jYXJkcy5zZXRTdHJva2UoXCIjMDAwXCIsIDQpXHJcblx0XHRcdC5zZXRPcmlnaW4oLjUpO1xyXG5cclxuXHRcdGNvbnN0IFhfSU5URVJWQUwgPSB0aGlzLndpZHRoICogLjQsIFlfSU5URVJWQUwgPSB0aGlzLmhlaWdodCAqIC42O1xyXG5cdFx0dGhpcy5hZGQudGV4dChYX0lOVEVSVkFMLCBZX0lOVEVSVkFMIC0gKHRoaXMuaGVpZ2h0ICogLjA1KSwgXCJCYWxsIEludGVydmFsXCIsIHtcclxuXHRcdFx0Zm9udFNpemU6IDI4LFxyXG5cdFx0XHRmb250U3R5bGU6IFwiYm9sZFwiLFxyXG5cdFx0XHRhbGlnbjogXCJjZW50ZXJcIlxyXG5cdFx0fSkuc2V0T3JpZ2luKC41KTtcclxuXHRcdHRoaXMuc2V0dGluZ3MuaW50ZXJ2YWwgPSB0aGlzLmFkZC50ZXh0KFhfSU5URVJWQUwsIFlfSU5URVJWQUwsIFwiNy41XCIsIHtcclxuXHRcdFx0Zm9udFNpemU6IDMyLFxyXG5cdFx0XHRhbGlnbjogXCJjZW50ZXJcIlxyXG5cdFx0fSk7XHJcblx0XHR0aGlzLnNldHRpbmdzLmludGVydmFsLnNldFN0cm9rZShcIiMwMDBcIiwgNClcclxuXHRcdFx0LnNldE9yaWdpbiguNSk7XHJcblx0fVxyXG5cclxuXHRjcmVhdGUoZGF0YSA9IHt9KVxyXG5cdHtcclxuXHRcdHN1cGVyLmNyZWF0ZShkYXRhKTtcclxuXHJcblx0XHR0aGlzLmNvbm5lY3Rpb24gPSB0aGlzLmdhbWUuY29ubmVjdGlvbjtcclxuXHJcblx0XHQvKiBMb2JiaWVzIFBhbmVsIEJhY2tncm91bmQgKi9cclxuXHRcdHRoaXMuYWRkLmltYWdlKHRoaXMuZ2FtZS5yZW5kZXJlci53aWR0aCAvIDIsIHRoaXMuZ2FtZS5yZW5kZXJlci5oZWlnaHQgKiAwLjQwLCBcInBhbmVsX2N1c3RvbUxvYmJ5X3NwbGl0MDNcIilcclxuXHRcdFx0LnNldFNjYWxlKDEpO1xyXG5cclxuXHRcdC8vIFtCdXR0b25dIEJhY2tcclxuXHRcdHRoaXMuYWRkLmV4aXN0aW5nKG5ldyBTY2VuZUJ1dHRvbihcIlNjZW5lX01lbnVfTG9iYmllc1wiLCB7XHJcblx0XHRcdHNjZW5lOiB0aGlzLFxyXG5cdFx0XHR4OiB0aGlzLndpZHRoICogLjEsXHJcblx0XHRcdHk6IHRoaXMuaGVpZ2h0ICogLjA3NSxcclxuXHRcdFx0dXNlckRlY2lzaW9uOiBcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBsZWF2ZSB0aGUgbG9iYnkgYW5kIHJldHVybiB0byB0aGUgbWVudT9cIixcclxuXHRcdFx0ZGVmYXVsdEJ1dHRvbkV2ZW50czogdHJ1ZSxcclxuXHRcdFx0Y2xpY2tDYWxsYmFjazogKCkgPT5cclxuXHRcdFx0e1xyXG5cdFx0XHRcdHRoaXMuY29ubmVjdGlvbi5sZWF2ZU1hdGNoKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pLnNldFNjYWxlKC41KSk7XHJcblxyXG5cdFx0dGhpcy5fY3JlYXRlU2V0dGluZ3MoKTtcclxuXHJcblx0XHQvLyBbUGxheWVybGlzdF1cclxuXHRcdC8qY29uc3QgcGxheWVybGlzdCA9IG5ldyBQbGF5ZXJsaXN0KHtcclxuXHRcdFx0c2NlbmU6IHRoaXMsXHJcblx0XHRcdHg6IHRoaXMud2lkdGggLyAyLCB5OiB0aGlzLmhlaWdodCAvIDIsXHJcblx0XHRcdHBhbmVsOiB7XHJcblx0XHRcdFx0d2lkdGg6IHRoaXMuaGVpZ2h0ICogLjUsXHJcblx0XHRcdFx0aGVpZ2h0OiB0aGlzLmhlaWdodCAqIC43NSxcclxuXHRcdFx0fVxyXG5cdFx0fSk7Ki9cclxuXHJcblx0XHRjb25zdCBzY3JvbGxhYmxlUGFuZWwgPSB0aGlzLnJleFVJLmFkZC5zY3JvbGxhYmxlUGFuZWwoe1xyXG5cdFx0XHR4OiB0aGlzLndpZHRoICogLjYxLFxyXG5cdFx0XHR5OiB0aGlzLmhlaWdodCAqIC40NyxcclxuXHRcdFx0d2lkdGg6IHRoaXMud2lkdGggKiAuMixcclxuXHRcdFx0aGVpZ2h0OiB0aGlzLmhlaWdodCAqIC40NSxcclxuXHJcblx0XHRcdHNjcm9sbE1vZGU6IDAsXHJcblxyXG5cdFx0XHRiYWNrZ3JvdW5kOiB0aGlzLnJleFVJLmFkZC5yb3VuZFJlY3RhbmdsZSgwLCAwLCAyLCAyLCAxMCwgMHgyMjJkMmUpLC8vMHgyMjJkMmVcclxuXHJcblx0XHRcdHBhbmVsOiB7XHJcblx0XHRcdFx0Y2hpbGQ6IHRoaXMucmV4VUkuYWRkLmZpeFdpZHRoU2l6ZXIoe1xyXG5cdFx0XHRcdFx0YWxpZ246IFwiY2VudGVyXCIsXHJcblx0XHRcdFx0XHRhbmNob3I6IFwiY2VudGVyXCIsXHJcblx0XHRcdFx0XHRzcGFjZToge1xyXG5cdFx0XHRcdFx0XHRsZWZ0OiA1LFxyXG5cdFx0XHRcdFx0XHRyaWdodDogNSxcclxuXHRcdFx0XHRcdFx0dG9wOiAzLFxyXG5cdFx0XHRcdFx0XHRib3R0b206IDMsXHJcblx0XHRcdFx0XHRcdGl0ZW06IDgsXHJcblx0XHRcdFx0XHRcdGxpbmU6IDgsXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSksXHJcblxyXG5cdFx0XHRcdG1hc2s6IHtcclxuXHRcdFx0XHRcdHBhZGRpbmc6IDFcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0c3BhY2U6IHtcclxuXHRcdFx0XHRsZWZ0OiAxMCxcclxuXHRcdFx0XHRyaWdodDogMTAsXHJcblx0XHRcdFx0dG9wOiAxMCxcclxuXHRcdFx0XHRib3R0b206IDEwLFxyXG5cclxuXHRcdFx0XHRwYW5lbDogMTAsXHJcblx0XHRcdH1cclxuXHRcdH0pLmxheW91dCgpO1xyXG5cclxuXHRcdHZhciB1cGRhdGVQYW5lbCA9ICgpID0+XHJcblx0XHR7XHJcblx0XHRcdGNvbnN0IHNpemVyID0gc2Nyb2xsYWJsZVBhbmVsLmdldEVsZW1lbnQoXCJwYW5lbFwiKTtcclxuXHJcblx0XHRcdHNpemVyLmNsZWFyKHRydWUpO1xyXG5cdFx0XHRmb3IgKGNvbnN0IHBsYXllciBvZiB0aGlzLmNvbm5lY3Rpb24ucGxheWVycy52YWx1ZXMoKSlcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGNvbnN0IGl0ZW0gPSB0aGlzLmFkZC50ZXh0KDAsIDAsIHBsYXllci50YWcsIHtcclxuXHRcdFx0XHRcdHg6IHRoaXMud2lkdGggLyAxLjYsXHJcblx0XHRcdFx0XHR5OiB0aGlzLmhlaWdodCAvIDUsXHJcblx0XHRcdFx0XHRhbGlnbjogXCJjZW50ZXJcIixcclxuXHRcdFx0XHRcdGZvbnRTaXplOiAyOCxcclxuXHRcdFx0XHRcdGZvbnRTdHlsZTogXCJib2xkXCJcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRpdGVtLnNldE9yaWdpbiguNSlcclxuXHRcdFx0XHRcdC5zZXRTdHJva2UoXCIjMDAwXCIsIDUpO1xyXG5cclxuXHRcdFx0XHRzaXplci5hZGQoaXRlbSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHNjcm9sbGFibGVQYW5lbC5sYXlvdXQoKTtcclxuXHRcdFx0cmV0dXJuIHNjcm9sbGFibGVQYW5lbDtcclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gW0J1dHRvbl0gQmVnaW4gR2FtZVxyXG5cdFx0bGV0IGJ0bkJlZ2luID0gbmV3IEJ1dHRvbih7XHJcblx0XHRcdHNjZW5lOiB0aGlzLFxyXG5cdFx0XHR4OiB0aGlzLndpZHRoICogLjUsXHJcblx0XHRcdHk6IHRoaXMuaGVpZ2h0ICogLjg1LFxyXG5cdFx0XHR0ZXh0dXJlOiBcImJ1dHRvbl9zdGFydF9nYW1lXCJcclxuXHRcdH0pLnNldFNjYWxlKC41KTtcclxuXHRcdGJ0bkJlZ2luLmJnLnNldFRpbnQoMFg3Nzc3NzcpO1xyXG5cdFx0dGhpcy5hZGQuZXhpc3RpbmcoYnRuQmVnaW4pO1xyXG5cclxuXHRcdHRoaXMuY29ubmVjdGlvbi5qb2luT3JDcmVhdGVNYXRjaCgpXHJcblx0XHRcdC50aGVuKG1hdGNoID0+XHJcblx0XHRcdHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhgSm9pbmVkIG1hdGNoIHsgJHttYXRjaC5pZH0gfWApO1xyXG5cclxuXHRcdFx0XHQvLyBhY3RpdmF0ZSB0aGUgJ2JlZ2luIGdhbWUnIGJ1dHRvbiBpZiB0aGlzIHBsYXllciBiZWNvbWVzIGhvc3RcclxuXHRcdFx0XHRtYXRjaC5zdGF0ZS5saXN0ZW4oXCJob3N0XCIsIGhvc3RJRCA9PlxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGlmIChob3N0SUQgIT09IG1hdGNoLnNlc3Npb25JZClcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdFx0XHRcdC8vIHJlcGxhY2Ugb2xkIGJ1dHRvbiB3aXRoIGEgbmV3LCBpbnRlcmFjdGl2ZSBidXR0b25cclxuXHRcdFx0XHRcdGJ0bkJlZ2luLmRlc3Ryb3koKTtcclxuXHRcdFx0XHRcdGJ0bkJlZ2luID0gbmV3IEJ1dHRvbih7XHJcblx0XHRcdFx0XHRcdHNjZW5lOiB0aGlzLFxyXG5cdFx0XHRcdFx0XHR4OiB0aGlzLndpZHRoICogLjUsXHJcblx0XHRcdFx0XHRcdHk6IHRoaXMuaGVpZ2h0ICogLjg1LFxyXG5cdFx0XHRcdFx0XHR0ZXh0dXJlOiBcImJ1dHRvbl9zdGFydF9nYW1lXCIsXHJcblx0XHRcdFx0XHRcdGRlZmF1bHRCdXR0b25FdmVudHM6IHRydWUsXHJcblx0XHRcdFx0XHRcdG9uOiB7XHJcblx0XHRcdFx0XHRcdFx0cG9pbnRlcnVwOiAoKSA9PlxyXG5cdFx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRcdHRoaXMuY29ubmVjdGlvbi5iZWdpbk1hdGNoKCk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KS5zZXRTY2FsZSguNSk7XHJcblx0XHRcdFx0XHR0aGlzLmFkZC5leGlzdGluZyhidG5CZWdpbik7XHJcblxyXG5cdFx0XHRcdFx0eyAvLyBPbmx5IHNob3cgYnV0dG9ucyBpZiBjbGllbnQgaXMgaG9zdFxyXG5cdFx0XHRcdFx0XHRjb25zdCBYX0NBUkRTID0gdGhpcy53aWR0aCAqIC40LCBZX0NBUkRTID0gdGhpcy5oZWlnaHQgKiAuNFxyXG5cdFx0XHRcdFx0XHRcdCwgWF9JTlRFUlZBTCA9IHRoaXMud2lkdGggKiAuNCwgWV9JTlRFUlZBTCA9IHRoaXMuaGVpZ2h0ICogLjY7XHJcblxyXG5cdFx0XHRcdFx0XHQvLyBEZWNyZWFzZSBDYXJkIHZhbHVlXHJcblx0XHRcdFx0XHRcdG5ldyBCdXR0b24oe1xyXG5cdFx0XHRcdFx0XHRcdHNjZW5lOiB0aGlzLFxyXG5cdFx0XHRcdFx0XHRcdHg6IFhfQ0FSRFMgLSAodGhpcy53aWR0aCAqIC4wMiksIHk6IFlfQ0FSRFMsXHJcblx0XHRcdFx0XHRcdFx0dGV4dHVyZTogXCJkcm9wZG93bl9hcnJvd193aGl0ZVwiLFxyXG5cdFx0XHRcdFx0XHRcdGRlZmF1bHRCdXR0b25FdmVudHM6IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0b246IHtcclxuXHRcdFx0XHRcdFx0XHRcdHBvaW50ZXJ1cDogKCkgPT5cclxuXHRcdFx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5jb25uZWN0aW9uLm1hdGNoLnNlbmQoXCJtYXRjaC1zZXR0aW5ncy1jYXJkc1wiLCB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FyZHM6IE1hdGgubWF4KDEsIE1hdGgubWluKDQsIHBhcnNlSW50KHRoaXMuc2V0dGluZ3MuY2FyZHMudGV4dCkgLSAxKSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9KS5zZXRSb3RhdGlvbihNYXRoLlBJICogLjUpXHJcblx0XHRcdFx0XHRcdFx0LnNldFNjYWxlKC41KTtcclxuXHJcblx0XHRcdFx0XHRcdC8vIEluY3JlYXNlIENhcmQgdmFsdWVcclxuXHRcdFx0XHRcdFx0bmV3IEJ1dHRvbih7XHJcblx0XHRcdFx0XHRcdFx0c2NlbmU6IHRoaXMsXHJcblx0XHRcdFx0XHRcdFx0eDogWF9DQVJEUyArICh0aGlzLndpZHRoICogLjAyKSwgeTogWV9DQVJEUyxcclxuXHRcdFx0XHRcdFx0XHR0ZXh0dXJlOiBcImRyb3Bkb3duX2Fycm93X3doaXRlXCIsXHJcblx0XHRcdFx0XHRcdFx0ZGVmYXVsdEJ1dHRvbkV2ZW50czogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHRvbjoge1xyXG5cdFx0XHRcdFx0XHRcdFx0cG9pbnRlcnVwOiAoKSA9PlxyXG5cdFx0XHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmNvbm5lY3Rpb24ubWF0Y2guc2VuZChcIm1hdGNoLXNldHRpbmdzLWNhcmRzXCIsIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjYXJkczogTWF0aC5tYXgoMSwgTWF0aC5taW4oNCwgcGFyc2VJbnQodGhpcy5zZXR0aW5ncy5jYXJkcy50ZXh0KSArIDEpKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0pLnNldFJvdGF0aW9uKE1hdGguUEkgKiAxLjUpXHJcblx0XHRcdFx0XHRcdFx0LnNldFNjYWxlKC41KTtcclxuXHJcblx0XHRcdFx0XHRcdC8vIERlY3JlYXNlIEludGVydmFsIHZhbHVlXHJcblx0XHRcdFx0XHRcdG5ldyBCdXR0b24oe1xyXG5cdFx0XHRcdFx0XHRcdHNjZW5lOiB0aGlzLFxyXG5cdFx0XHRcdFx0XHRcdHg6IFhfSU5URVJWQUwgLSAodGhpcy53aWR0aCAqIC4wMyksIHk6IFlfSU5URVJWQUwsXHJcblx0XHRcdFx0XHRcdFx0dGV4dHVyZTogXCJkcm9wZG93bl9hcnJvd193aGl0ZVwiLFxyXG5cdFx0XHRcdFx0XHRcdGRlZmF1bHRCdXR0b25FdmVudHM6IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0b246IHtcclxuXHRcdFx0XHRcdFx0XHRcdHBvaW50ZXJ1cDogKCkgPT5cclxuXHRcdFx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5jb25uZWN0aW9uLm1hdGNoLnNlbmQoXCJtYXRjaC1zZXR0aW5ncy1pbnRlcnZhbFwiLCB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aW50ZXJ2YWw6IE1hdGgubWF4KDEsIE1hdGgubWluKDE1LCBwYXJzZUZsb2F0KHRoaXMuc2V0dGluZ3MuaW50ZXJ2YWwudGV4dCkgLSAuNSkpXHJcblx0XHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSkuc2V0Um90YXRpb24oTWF0aC5QSSAqIC41KVxyXG5cdFx0XHRcdFx0XHRcdC5zZXRTY2FsZSguNSk7XHJcblxyXG5cdFx0XHRcdFx0XHQvLyBJbmNyZWFzZSBJbnRlcnZhbCB2YWx1ZVxyXG5cdFx0XHRcdFx0XHRuZXcgQnV0dG9uKHtcclxuXHRcdFx0XHRcdFx0XHRzY2VuZTogdGhpcyxcclxuXHRcdFx0XHRcdFx0XHR4OiBYX0lOVEVSVkFMICsgKHRoaXMud2lkdGggKiAuMDMpLCB5OiBZX0lOVEVSVkFMLFxyXG5cdFx0XHRcdFx0XHRcdHRleHR1cmU6IFwiZHJvcGRvd25fYXJyb3dfd2hpdGVcIixcclxuXHRcdFx0XHRcdFx0XHRkZWZhdWx0QnV0dG9uRXZlbnRzOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdG9uOiB7XHJcblx0XHRcdFx0XHRcdFx0XHRwb2ludGVydXA6ICgpID0+XHJcblx0XHRcdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuY29ubmVjdGlvbi5tYXRjaC5zZW5kKFwibWF0Y2gtc2V0dGluZ3MtaW50ZXJ2YWxcIiwge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGludGVydmFsOiBNYXRoLm1heCgxLCBNYXRoLm1pbigxNSwgcGFyc2VGbG9hdCh0aGlzLnNldHRpbmdzLmludGVydmFsLnRleHQpICsgLjUpKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0pLnNldFJvdGF0aW9uKE1hdGguUEkgKiAxLjUpXHJcblx0XHRcdFx0XHRcdFx0LnNldFNjYWxlKC41KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0bWF0Y2guc3RhdGUubGlzdGVuKFwiY2FyZHNcIiwgY2FyZHMgPT5cclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHR0aGlzLnNldHRpbmdzLmNhcmRzLnNldFRleHQoY2FyZHMudG9TdHJpbmcoKSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0bWF0Y2guc3RhdGUubGlzdGVuKFwiaW50ZXJ2YWxcIiwgaW50ZXJ2YWwgPT5cclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHR0aGlzLnNldHRpbmdzLmludGVydmFsLnNldFRleHQoaW50ZXJ2YWwudG9TdHJpbmcoKSk7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdC8vIGV2ZW50IGp1c3QgZm9yIHRoaXMgY2xpZW50LCB0cmlnZ2VycyBvbiBmaXJzdCBqb2luXHJcblx0XHRcdFx0Ly8gdG8gZmV0Y2ggYWxsIHByZS1jb25uZWN0ZWQgcGxheWVyc1xyXG5cdFx0XHRcdG1hdGNoLm9uTWVzc2FnZShcIm1hdGNoLWNsaWVudHNcIiwgKCkgPT5cclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHR1cGRhdGVQYW5lbCgpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHQvLyB0cmlnZ2VyZWQgd2hlbmV2ZXIgYSBwbGF5ZXIgam9pbnNcclxuXHRcdFx0XHRtYXRjaC5vbk1lc3NhZ2UoXCJtYXRjaC1wbGF5ZXItam9pblwiLCAoKSA9PlxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHVwZGF0ZVBhbmVsKCk7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdC8vIHRyaWdnZXJlZCB3aGVuZXZlciBhIHBsYXllciBsZWF2ZXNcclxuXHRcdFx0XHRtYXRjaC5vbk1lc3NhZ2UoXCJtYXRjaC1wbGF5ZXItbGVhdmVcIiwgKCkgPT5cclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHR1cGRhdGVQYW5lbCgpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KS5jYXRjaChjb25zb2xlLmVycm9yKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNjZW5lX01lbnVfTG9iYnk7XHJcbiIsImltcG9ydCBTY2VuZSBmcm9tIFwiLi4vb2JqZWN0cy9TY2VuZS5qc1wiO1xyXG5pbXBvcnQgQnV0dG9uIGZyb20gXCIuLi9vYmplY3RzL2J1dHRvbnMvQnV0dG9uLmpzXCI7XHJcblxyXG5jbGFzcyBTY2VuZV9NZW51X01haW4gZXh0ZW5kcyBTY2VuZVxyXG57XHJcblx0Y29uc3RydWN0b3IoKVxyXG5cdHtcclxuXHRcdHN1cGVyKHtcclxuXHRcdFx0a2V5OiBcIlNjZW5lX01lbnVfTWFpblwiLFxyXG5cdFx0XHR3YWxscGFwZXI6IHRydWVcclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMuYnV0dG9ucyA9IHtcclxuXHRcdFx0cGxheTogbnVsbCxcclxuXHRcdFx0bGVhZGVyYm9hcmQ6IG51bGwsXHJcblx0XHRcdHNldHRpbmdzOiBudWxsXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0Y3JlYXRlKGRhdGEgPSB7fSlcclxuXHR7XHJcblx0XHRzdXBlci5jcmVhdGUoZGF0YSk7XHJcblxyXG5cdFx0Ly8gRklYTUU6IFBsYXlzIGF0IGZ1bGwgdm9sdW1lIHVudGlsIHRoZSBTZXR0aW5ncyBTY2VuZSBpcyBsb2FkZWQuIEZpZ3VyZSBvdXQgd2h5IGFuZCBob3cgdG8gZml4IGl0LlxyXG5cdFx0dGhpcy5nYW1lLmF1ZGlvLm11c2ljLnBsYXkoXCJhdWRpb19tdXNpY19iZ18wMlwiKTtcclxuXHJcblx0XHQvKiBMb2dvICovXHJcblx0XHR0aGlzLmFkZC5pbWFnZSh0aGlzLmdhbWUucmVuZGVyZXIud2lkdGggLyAxLjksIHRoaXMuZ2FtZS5yZW5kZXJlci5oZWlnaHQgKiAwLjI1LCBcImxvZ29cIikuc2V0U2NhbGUoMC41KTtcclxuXHJcblx0XHQvKiBCdXR0b25zICovXHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IE9iamVjdC5rZXlzKHRoaXMuYnV0dG9ucykubGVuZ3RoOyBpKyspXHJcblx0XHR7XHJcblx0XHRcdGNvbnN0IGtleSA9IE9iamVjdC5rZXlzKHRoaXMuYnV0dG9ucylbaV1cclxuXHRcdFx0XHQsIGJ0biA9IG5ldyBCdXR0b24oe1xyXG5cdFx0XHRcdFx0c2NlbmU6IHRoaXMsXHJcblx0XHRcdFx0XHR4OiB0aGlzLmdhbWUucmVuZGVyZXIud2lkdGggKiAuNSxcclxuXHRcdFx0XHRcdHk6IHRoaXMuZ2FtZS5yZW5kZXJlci5oZWlnaHQgKiAoLjUgKyAoaSAqIC4xNzUpKSxcclxuXHRcdFx0XHRcdHRleHR1cmU6IGBidXR0b25fJHtrZXl9YCxcclxuXHRcdFx0XHRcdGRlZmF1bHRCdXR0b25FdmVudHM6IHRydWVcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdGJ0bi5zZXRTY2FsZSguNjkpO1xyXG5cdFx0XHR0aGlzLmFkZC5leGlzdGluZyh0aGlzLmJ1dHRvbnNba2V5XSA9IGJ0bik7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5idXR0b25zLnBsYXkub24oXCJwb2ludGVydXBcIiwgKHBvaW50ZXIpID0+XHJcblx0XHR7XHJcblx0XHRcdC8vIGxlZnQgbW91c2UgYnV0dG9uXHJcblx0XHRcdGlmIChwb2ludGVyLmJ1dHRvbiAhPT0gMClcclxuXHRcdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0XHQvLyB0aGlzLnNjZW5lLnNsZWVwKCk7XHJcblx0XHRcdHRoaXMuc2NlbmUuc3RhcnQoXCJTY2VuZV9NZW51X0xvYmJpZXNcIik7XHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLmJ1dHRvbnMuc2V0dGluZ3Mub24oXCJwb2ludGVydXBcIiwgKHBvaW50ZXIpID0+XHJcblx0XHR7XHJcblx0XHRcdC8vIGxlZnQgbW91c2UgYnV0dG9uXHJcblx0XHRcdGlmIChwb2ludGVyLmJ1dHRvbiAhPT0gMClcclxuXHRcdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0XHQvLyB0aGlzLnNjZW5lLnNsZWVwKCk7XHJcblx0XHRcdHRoaXMuc2NlbmUuc3RhcnQoXCJTY2VuZV9NZW51X1NldHRpbmdzXCIpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5idXR0b25zLmxlYWRlcmJvYXJkLm9uKFwicG9pbnRlcnVwXCIsIChwb2ludGVyKSA9PlxyXG5cdFx0e1xyXG5cdFx0XHQvLyBsZWZ0IG1vdXNlIGJ1dHRvblxyXG5cdFx0XHRpZiAocG9pbnRlci5idXR0b24gIT09IDApXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdFx0Ly8gdGhpcy5zY2VuZS5zbGVlcCgpO1xyXG5cdFx0XHR0aGlzLnNjZW5lLnN0YXJ0KFwiU2NlbmVfTWVudV9MZWFkZXJib2FyZFwiKTtcclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2NlbmVfTWVudV9NYWluO1xyXG4iLCJpbXBvcnQgU2NlbmUgZnJvbSBcIi4uL29iamVjdHMvU2NlbmUuanNcIjtcclxuaW1wb3J0IFNjZW5lQnV0dG9uIGZyb20gXCIuLi9vYmplY3RzL1NjZW5lQnV0dG9uLmpzXCI7XHJcbmltcG9ydCBWb2x1bWVTbGlkZXIgZnJvbSBcIi4uL29iamVjdHMvc2V0dGluZ3MvdmFyaWF0aW9ucy9Wb2x1bWVTbGlkZXIuanNcIjtcclxuaW1wb3J0IERyb3Bkb3duIGZyb20gXCIuLi9vYmplY3RzL3NldHRpbmdzL3ZhcmlhdGlvbnMvRHJvcGRvd24uanNcIjtcclxuXHJcbmNsYXNzIFNjZW5lX01lbnVfU2V0dGluZ3MgZXh0ZW5kcyBTY2VuZVxyXG57XHJcblx0Y29uc3RydWN0b3IoKVxyXG5cdHtcclxuXHRcdHN1cGVyKHtcclxuXHRcdFx0a2V5OiBcIlNjZW5lX01lbnVfU2V0dGluZ3NcIixcclxuXHRcdFx0d2FsbHBhcGVyOiB0cnVlXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGNyZWF0ZShkYXRhID0ge30pXHJcblx0e1xyXG5cdFx0c3VwZXIuY3JlYXRlKGRhdGEpO1xyXG5cclxuXHRcdC8qIFNldHRpbmdzIFBhbmVsIFNjZW5lQnV0dG9uZ3JvdW5kICovXHJcblx0XHR0aGlzLmFkZC5pbWFnZSh0aGlzLmdhbWUucmVuZGVyZXIud2lkdGggLyAyLCB0aGlzLmdhbWUucmVuZGVyZXIuaGVpZ2h0ICogMC41MCwgXCJwYW5lbF9zZXR0aW5nc1wiKVxyXG5cdFx0XHQuc2V0U2NhbGUoMC43KTtcclxuXHJcblx0XHQvKiBCYWNrIEJ1dHRvbiAqL1xyXG5cdFx0dGhpcy5hZGQuZXhpc3RpbmcobmV3IFNjZW5lQnV0dG9uKFwiU2NlbmVfTWVudV9NYWluXCIsIHtcclxuXHRcdFx0c2NlbmU6IHRoaXMsXHJcblx0XHRcdHg6IHRoaXMud2lkdGggKiAuMSxcclxuXHRcdFx0eTogdGhpcy5oZWlnaHQgKiAuMDc1LFxyXG5cdFx0XHRkZWZhdWx0QnV0dG9uRXZlbnRzOiB0cnVlXHJcblx0XHR9KS5zZXRTY2FsZSguNSkpO1xyXG5cclxuXHRcdC8qIERyb3Bkb3duIE1lbnVzICovXHJcblxyXG5cdFx0Ly8gdm9pY2VwYWNrIGRyb3Bkb3duXHJcblx0XHR0aGlzLmFkZC5leGlzdGluZyhuZXcgRHJvcGRvd24oe1xyXG5cdFx0XHRzY2VuZTogdGhpcyxcclxuXHRcdFx0eDogdGhpcy53aWR0aCAqIC42LFxyXG5cdFx0XHR5OiB0aGlzLmhlaWdodCAqIC4zNSxcclxuXHRcdFx0a2V5OiBcInZvaWNlcGFja1wiLFxyXG5cdFx0XHR0aXRsZTogXCJBbm5vdW5jZXIgUGFja1wiLFxyXG5cdFx0XHRjaG9pY2VzOiBbe1xyXG5cdFx0XHRcdG5hbWU6IFwiRGV5YW5cIlxyXG5cdFx0XHR9XVxyXG5cdFx0fSkpO1xyXG5cclxuXHRcdC8qIFZvbHVtZSBTbGlkZXJzICovXHJcblxyXG5cdFx0Y29uc3QgREVGQVVMVFNfU0xJREVSID0ge1xyXG5cdFx0XHRzY2VuZTogdGhpcyxcclxuXHRcdFx0ZWxlbWVudDoge1xyXG5cdFx0XHRcdHdpZHRoOiB0aGlzLndpZHRoICogLjQsIC8vIGxlbmd0aFxyXG5cdFx0XHRcdGhlaWdodDogMjAsIC8vIHRoaWNjbmVzc1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIHZvbHVtZS1tYXN0ZXIgc2xpZGVyXHJcblx0XHR0aGlzLmFkZC5leGlzdGluZyhuZXcgVm9sdW1lU2xpZGVyKE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRTX1NMSURFUiwge1xyXG5cdFx0XHR4OiB0aGlzLndpZHRoICogLjUsXHJcblx0XHRcdHk6IHRoaXMuaGVpZ2h0ICogLjUsXHJcblx0XHRcdGtleTogXCJ2b2x1bWVzLm1hc3RlclwiLFxyXG5cdFx0XHR0aXRsZTogXCJNYXN0ZXJcIlxyXG5cdFx0fSkpKTtcclxuXHJcblx0XHQvLyB2b2x1bWUtbXVzaWMgc2xpZGVyXHJcblx0XHR0aGlzLmFkZC5leGlzdGluZyhuZXcgVm9sdW1lU2xpZGVyKE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRTX1NMSURFUiwge1xyXG5cdFx0XHR4OiB0aGlzLndpZHRoICogLjUsXHJcblx0XHRcdHk6IHRoaXMuaGVpZ2h0ICogLjYsXHJcblx0XHRcdGtleTogXCJ2b2x1bWVzLm11c2ljXCIsXHJcblx0XHRcdHRpdGxlOiBcIk11c2ljXCJcclxuXHRcdH0pKSk7XHJcblxyXG5cdFx0Ly8gdm9sdW1lLXZvaWNlIHNsaWRlclxyXG5cdFx0dGhpcy5hZGQuZXhpc3RpbmcobmV3IFZvbHVtZVNsaWRlcihPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUU19TTElERVIsIHtcclxuXHRcdFx0eDogdGhpcy53aWR0aCAqIC41LFxyXG5cdFx0XHR5OiB0aGlzLmhlaWdodCAqIC43LFxyXG5cdFx0XHRrZXk6IFwidm9sdW1lcy52b2ljZVwiLFxyXG5cdFx0XHR0aXRsZTogXCJBbm5vdW5jZXJzXCJcclxuXHRcdH0pKSk7XHJcblxyXG5cdFx0Ly8gdm9sdW1lLWVmZmVjdHMgc2xpZGVyXHJcblx0XHR0aGlzLmFkZC5leGlzdGluZyhuZXcgVm9sdW1lU2xpZGVyKE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRTX1NMSURFUiwge1xyXG5cdFx0XHR4OiB0aGlzLndpZHRoICogLjUsXHJcblx0XHRcdHk6IHRoaXMuaGVpZ2h0ICogLjgsXHJcblx0XHRcdGtleTogXCJ2b2x1bWVzLmVmZmVjdHNcIixcclxuXHRcdFx0dGl0bGU6IFwiRWZmZWN0c1wiXHJcblx0XHR9KSkpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2NlbmVfTWVudV9TZXR0aW5ncztcclxuIiwiaW1wb3J0ICogYXMgUGhhc2VyIGZyb20gXCJwaGFzZXJcIjtcclxuXHJcbmltcG9ydCAqIGFzIG9iamVjdHMgZnJvbSBcIi4uL29iamVjdHMvb2JqZWN0cy5qc1wiO1xyXG5pbXBvcnQgVm9pY2VwYWNrIGZyb20gXCIuLi9jbGFzc2VzL1ZvaWNlcGFjay5qc1wiO1xyXG5cclxuY2xhc3MgU2NlbmVfUHJlbG9hZCBleHRlbmRzIFBoYXNlci5TY2VuZVxyXG57XHJcblx0c3RhdGljIGltcG9ydEltYWdlU2VyaWVzKGxvYWQsIHByZWZpeCwgYW1vdW50LCBleHQsIHN0YXJ0ID0gMCwgcGFkID0gMilcclxuXHR7XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGFtb3VudDsgaSsrKVxyXG5cdFx0e1xyXG5cdFx0XHRjb25zdCBrZXkgPSBwcmVmaXggKyAoaSArIHN0YXJ0KS50b1N0cmluZygpLnBhZFN0YXJ0KHBhZCwgXCIwXCIpO1xyXG5cdFx0XHRsb2FkLmltYWdlKGtleSwgYCR7a2V5fS4ke2V4dH1gKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdF9jb21wb3NlTG9hZGluZ1NjcmVlbigpXHJcblx0e1xyXG5cdFx0Y29uc3Qgd2lkdGggPSB0aGlzLmNhbWVyYXMubWFpbi53aWR0aFxyXG5cdFx0XHQsIGhlaWdodCA9IHRoaXMuY2FtZXJhcy5tYWluLmhlaWdodFxyXG5cdFx0XHQsIGJhciA9IHtcclxuXHRcdFx0XHR4OiB3aWR0aCAvIDIgLSAod2lkdGggLyAzICogLjUpLFxyXG5cdFx0XHRcdHk6IGhlaWdodCAvIDIgLSAoNTAgKiAuNSksXHJcblx0XHRcdFx0d2lkdGg6IHdpZHRoIC8gMyxcclxuXHRcdFx0XHRoZWlnaHQ6IDUwXHJcblx0XHRcdH07XHJcblxyXG5cdFx0dGhpcy5hZGQuaW1hZ2Uod2lkdGggLyAyLCBoZWlnaHQgLyAyLCBcIndhbGxwYXBlcl9sb2FkaW5nXCIpXHJcblx0XHRcdC5zZXRTY2FsZSgwLjcxMTEpO1xyXG5cclxuXHRcdHRoaXMuYWRkLmltYWdlKHdpZHRoIC8gMiwgaGVpZ2h0IC8gMiwgXCJwcm9ncmVzc0JnX2xvYWRpbmdcIilcclxuXHRcdFx0LnNldFNjYWxlKDEuNCk7XHJcblxyXG5cdFx0Ly8gYWN0dWFsIGxvYWRpbmcgcHJvZ3Jlc3MgYmFyXHJcblx0XHRjb25zdCBwcm9ncmVzc0JhciA9IHRoaXMuYWRkLmdyYXBoaWNzKCk7XHJcblx0XHQvLyBiYXIgYmFja2dyb3VuZFxyXG5cdFx0dGhpcy5hZGQuZ3JhcGhpY3MoKVxyXG5cdFx0XHQuZmlsbFN0eWxlKDB4MDBGMEZGLCAwLjgpO1xyXG5cdFx0Ly8uZmlsbFJlY3QoYmFyLngsIGJhci55LCBiYXIud2lkdGgsIGJhci5oZWlnaHQpO1xyXG5cclxuXHRcdC8vIFwiW3hdICVcIlxyXG5cdFx0Y29uc3QgcGVyY2VudFRleHQgPSB0aGlzLm1ha2UudGV4dCh7XHJcblx0XHRcdHg6IHdpZHRoIC8gMixcclxuXHRcdFx0eTogaGVpZ2h0IC8gMixcclxuXHRcdFx0dGV4dDogXCIwJVwiLFxyXG5cdFx0XHRzdHlsZToge1xyXG5cdFx0XHRcdGZvbnQ6IFwiMThweCBtb25vc3BhY2VcIixcclxuXHRcdFx0XHRmaWxsOiBcIiMwMDAwMDBcIixcclxuXHRcdFx0XHRhbGlnbjogXCJjZW50ZXJcIlxyXG5cdFx0XHR9XHJcblx0XHR9KS5zZXRPcmlnaW4oLjUpO1xyXG5cdFx0dGhpcy5sb2FkLm9uKFwicHJvZ3Jlc3NcIiwgKHZhbHVlKSA9PlxyXG5cdFx0e1xyXG5cdFx0XHRwZXJjZW50VGV4dC5zZXRUZXh0KCh2YWx1ZSAqIDEwMCkudG9GaXhlZCgpICsgXCIlXCIpO1xyXG5cdFx0XHRwcm9ncmVzc0JhclxyXG5cdFx0XHRcdC5maWxsU3R5bGUoMHgwMEYwRkYsIDEpXHJcblx0XHRcdFx0Ly8gVE9ETzogRmlndXJlIG91dCBleGFjdCBtYXRocyB0byBjZW50ZXIgcmVjdC1iYXJcclxuXHRcdFx0XHQuZmlsbFJlY3QoYmFyLnggKiAxLjAxLCBiYXIueSAqIDEsIGJhci53aWR0aCAqIDAuOSAqIHZhbHVlLCBiYXIuaGVpZ2h0ICogLjkpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly9vdmVybGF5IGZvciBwcm9ncmVzcyBiYXJcclxuXHRcdHRoaXMuYWRkLmltYWdlKHdpZHRoIC8gMiwgaGVpZ2h0IC8gMiwgXCJwcm9ncmVzc0Jhcl9sb2FkaW5nXCIpXHJcblx0XHRcdC5zZXRTY2FsZSgxLjQpO1xyXG5cclxuXHRcdC8vIFwiTG9hZGluZy4uLlwiIEZpeCBpZiBwb3NzaWJsZTogVGV4dCBpcyBub3Qgc2hvd2luZyB1cFxyXG5cdFx0dGhpcy5tYWtlLnRleHQoe1xyXG5cdFx0XHR4OiB0aGlzLndpZHRoIC8yLFxyXG5cdFx0XHR5OiB0aGlzLmhlaWdodCAvIDMsXHJcblx0XHRcdHRleHQ6IFwiTG9hZGluZ1wiLFxyXG5cdFx0XHRzdHlsZToge1xyXG5cdFx0XHRcdGZvbnQ6IFwiMzBweCBtb25vc3BhY2VcIixcclxuXHRcdFx0XHRmaWxsOiBcIiNGRkZGRkZcIixcclxuXHRcdFx0XHRhbGlnbjogXCJjZW50ZXJcIlxyXG5cdFx0XHR9XHJcblx0XHR9KS5zZXRPcmlnaW4oLjUpO1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IoKVxyXG5cdHtcclxuXHRcdHN1cGVyKHtcclxuXHRcdFx0a2V5OiBcIlNjZW5lX1ByZWxvYWRcIixcclxuXHRcdFx0cGFjazoge1xyXG5cdFx0XHRcdC8vIHByZS1wYWNraW5nIGFzc2V0cyBuZWVkZWQgYmVmb3JlIHRoZSBwcmVsb2FkIGV2ZW50IChsb2FkaW5nIHNjcmVlbilcclxuXHRcdFx0XHRmaWxlczogW1xyXG5cdFx0XHRcdFx0eyB0eXBlOiBcImltYWdlXCIsIGtleTogXCJ3YWxscGFwZXJfbG9hZGluZ1wiLCB1cmw6IFwiL2Fzc2V0cy9pbWcvd2FsbHBhcGVycy9iZ193YWxscGFwZXJfMDAuanBnXCIgfSxcclxuXHRcdFx0XHRcdHsgdHlwZTogXCJpbWFnZVwiLCBrZXk6IFwicHJvZ3Jlc3NCYXJfbG9hZGluZ1wiLCB1cmw6IFwiL2Fzc2V0cy9pbWcvVUkvcHJvZ3Jlc3MvYmdfcHJvZ3Jlc3MwMS5wbmdcIiB9LFxyXG5cdFx0XHRcdFx0eyB0eXBlOiBcImltYWdlXCIsIGtleTogXCJwcm9ncmVzc0JnX2xvYWRpbmdcIiwgdXJsOiBcIi9hc3NldHMvaW1nL1VJL3Byb2dyZXNzL2JnX3Byb2dyZXNzMDIucG5nXCIgfVxyXG5cdFx0XHRcdF1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRwcmVsb2FkKClcclxuXHR7XHJcblx0XHR0aGlzLl9jb21wb3NlTG9hZGluZ1NjcmVlbigpO1xyXG5cclxuXHRcdGZvciAoY29uc3QgQ2xhc3Mgb2YgT2JqZWN0LnZhbHVlcyhvYmplY3RzKSlcclxuXHRcdHtcclxuXHRcdFx0aWYgKENsYXNzLnByZWxvYWQgIT0gbnVsbClcclxuXHRcdFx0XHRDbGFzcy5wcmVsb2FkKHRoaXMubG9hZCk7XHJcblx0XHR9XHJcblxyXG5cdFx0LyogPT09PT09PT09PT09PT09PT09PT1cclxuXHRcdCAqID09PT09PSBJTUFHRVMgPT09PT09XHJcblx0XHQgKiA9PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cdFx0dGhpcy5sb2FkLnNldFBhdGgoXCJhc3NldHMvaW1nL1wiKTtcclxuXHJcblx0XHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdCAqID09PT09PSBBTklNQVRJT05TID09PT09PVxyXG5cdFx0ICogPT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblx0XHR0aGlzLmxvYWQuYXRsYXMoXCJjb25mZXR0aVwiLFwiYW5pbWF0aW9ucy9hbmltX2NvbmZldHRpLnBuZ1wiLFwiYW5pbWF0aW9ucy9hbmltX2NvbmZldHRpLmpzb25cIik7XHJcblxyXG5cdFx0Ly8gTG9nb1xyXG5cdFx0dGhpcy5sb2FkLmltYWdlKFwibG9nb1wiLCBcImxvZ28ucG5nXCIpO1xyXG5cclxuXHRcdC8qIFVJIEFzc2V0cyAqL1xyXG5cclxuXHRcdC8vIEdhbWUgRWxlbWVudHNcclxuXHRcdHRoaXMubG9hZC5pbWFnZShcImNvaW5cIiwgXCJVSS9pY29ucy9jb2luLnBuZ1wiKTtcclxuXHRcdHRoaXMubG9hZC5pbWFnZShcImNvaW4yXCIsIFwiVUkvaWNvbnMvY29pbjIucG5nXCIpO1xyXG5cdFx0dGhpcy5sb2FkLmltYWdlKFwiaGVhcnRcIiwgXCJVSS9pY29ucy9oZWFydC5wbmdcIik7XHJcblx0XHR0aGlzLmxvYWQuaW1hZ2UoXCJzdGFyXCIsIFwiVUkvaWNvbnMvc3Rhci5wbmdcIik7XHJcblxyXG5cdFx0dGhpcy5sb2FkLmltYWdlKFwiYmdfc2NvcmVcIiwgXCJVSS9iZ19zY29yZS5wbmdcIik7XHJcblxyXG5cdFx0Ly8gUGFuZWxzXHJcblx0XHR0aGlzLmxvYWQuaW1hZ2UoXCJwYW5lbF9jdXN0b21Mb2JieVwiLCBcIlVJL3BhbmVscy9iZ19wYW5lbF9jdXN0b21Mb2JieS5wbmdcIik7XHJcblx0XHR0aGlzLmxvYWQuaW1hZ2UoXCJwYW5lbF9jdXN0b21Mb2JieV9zcGxpdFwiLCBcIlVJL3BhbmVscy9iZ19wYW5lbF9jdXN0b21Mb2JieV9zcGxpdC5wbmdcIik7XHJcblx0XHR0aGlzLmxvYWQuaW1hZ2UoXCJwYW5lbF9sZWFkZXJib2FyZFwiLCBcIlVJL3BhbmVscy9iZ19wYW5lbF9sZWFkZXJib2FyZC5wbmdcIik7XHJcblx0XHR0aGlzLmxvYWQuaW1hZ2UoXCJwYW5lbF9sb2JiaWVzXCIsIFwiVUkvcGFuZWxzL2JnX3BhbmVsX2xvYmJpZXMucG5nXCIpO1xyXG5cdFx0dGhpcy5sb2FkLmltYWdlKFwicGFuZWxfbG9iYmllc19zcGxpdFwiLCBcIlVJL3BhbmVscy9iZ19wYW5lbF9sb2JiaWVzX3NwbGl0LnBuZ1wiKTtcclxuXHRcdHRoaXMubG9hZC5pbWFnZShcInBhbmVsX2xvYmJ5XCIsIFwiVUkvcGFuZWxzL2JnX3BhbmVsX2xvYmJ5LnBuZ1wiKTtcclxuXHRcdHRoaXMubG9hZC5pbWFnZShcInBhbmVsX2xvYmJ5X3NwbGl0XCIsIFwiVUkvcGFuZWxzL2JnX3BhbmVsX2xvYmJ5X3NwbGl0LnBuZ1wiKTtcclxuXHRcdHRoaXMubG9hZC5pbWFnZShcInBhbmVsX2xvYmJ5X2FsdFwiLCBcIlVJL3BhbmVscy9iZ19wYW5lbF9sb2JieV9hbHQucG5nXCIpO1xyXG5cdFx0dGhpcy5sb2FkLmltYWdlKFwicGFuZWxfc2NvcmVib2FyZFwiLCBcIlVJL3BhbmVscy9iZ19wYW5lbF9zY29yZWJvYXJkLnBuZ1wiKTtcclxuXHRcdHRoaXMubG9hZC5pbWFnZShcInBhbmVsX3Njb3Jlc1wiLCBcIlVJL3BhbmVscy9iZ19wYW5lbF9zY29yZXMucG5nXCIpO1xyXG5cdFx0dGhpcy5sb2FkLmltYWdlKFwicGFuZWxfc2V0dGluZ3NcIiwgXCJVSS9wYW5lbHMvYmdfcGFuZWxfc2V0dGluZ3MwMS5wbmdcIik7XHJcblx0XHR0aGlzLmxvYWQuaW1hZ2UoXCJwYW5lbF9lbmRcIiwgXCJVSS9wYW5lbHMvYmdfZ2FtZV9lbmQucG5nXCIpO1xyXG5cdFx0dGhpcy5sb2FkLmltYWdlKFwicGFuZWxfYmFsbF9jb3VudFwiLCBcIlVJL3BhbmVscy9iZ19wYW5lbF9iYWxsX2NvdW50LnBuZ1wiKTtcclxuXHRcdHRoaXMubG9hZC5pbWFnZShcInBhbmVsX2N1c3RvbUxvYmJ5X3NwbGl0MDNcIiwgXCJVSS9wYW5lbHMvYmdfcGFuZWxfY3VzdG9tTG9iYnkwMy5wbmdcIik7XHJcblxyXG5cdFx0Ly8gUHJvZ3Jlc3MgQmFyc1xyXG5cdFx0dGhpcy5sb2FkLmltYWdlKFwicHJvZ3Jlc3NcIiwgXCJVSS9wcm9ncmVzcy9iZ19wcm9ncmVzcy5wbmdcIik7XHJcblx0XHR0aGlzLmxvYWQuaW1hZ2UoXCJwcm9ncmVzc19ibHVlXCIsIFwiVUkvcHJvZ3Jlc3MvYmdfcHJvZ3Jlc3NfYmx1ZS5wbmdcIik7XHJcblx0XHR0aGlzLmxvYWQuaW1hZ2UoXCJwcm9ncmVzc19ncmVlblwiLCBcIlVJL3Byb2dyZXNzL2JnX3Byb2dyZXNzX2dyZWVuLnBuZ1wiKTtcclxuXHRcdHRoaXMubG9hZC5pbWFnZShcInByb2dyZXNzX29yYW5nZVwiLCBcIlVJL3Byb2dyZXNzL2JnX3Byb2dyZXNzX29yYW5nZS5wbmdcIik7XHJcblx0XHR0aGlzLmxvYWQuaW1hZ2UoXCJwcm9ncmVzc19wdXJwbGVcIiwgXCJVSS9wcm9ncmVzcy9iZ19wcm9ncmVzc19wdXJwbGUucG5nXCIpO1xyXG5cdFx0dGhpcy5sb2FkLmltYWdlKFwicHJvZ3Jlc3NfcmVkXCIsIFwiVUkvcHJvZ3Jlc3MvYmdfcHJvZ3Jlc3NfcmVkLnBuZ1wiKTtcclxuXHJcblx0XHQvKiBBVURJTyAqL1xyXG5cdFx0dGhpcy5sb2FkLnNldFBhdGgoXCIvYXNzZXRzL2F1ZGlvL1wiKTtcclxuXHRcdHRoaXMubG9hZC5hdWRpbyhcImF1ZGlvX2J1dHRvbl8wMVwiLCBcImJ1dHRvbnMvYnV0dG9uXzAxLndhdlwiKTtcclxuXHRcdHRoaXMubG9hZC5hdWRpbyhcImF1ZGlvX2J1dHRvbl8wMlwiLCBcImJ1dHRvbnMvYnV0dG9uXzAyLndhdlwiKTtcclxuXHRcdHRoaXMubG9hZC5hdWRpbyhcImF1ZGlvX2J1dHRvbl8wM1wiLCBcImJ1dHRvbnMvYnV0dG9uXzAzLndhdlwiKTtcclxuXHRcdHRoaXMubG9hZC5hdWRpbyhcImF1ZGlvX211c2ljX2JnXzAxXCIsIFwibXVzaWMvYmdfMDEubXAzXCIpO1xyXG5cdFx0dGhpcy5sb2FkLmF1ZGlvKFwiYXVkaW9fbXVzaWNfYmdfMDJcIiwgXCJtdXNpYy9iZ18wMi5tcDNcIik7XHJcblx0XHR0aGlzLmxvYWQuYXVkaW8oXCJhdWRpb19lZmZlY3RzX2NoZWVyaW5nXCIsIFwiZWZmZWN0cy9jaGVlcmluZy5tcDNcIik7XHJcblxyXG5cdFx0Ly8gVm9pY2VwYWNrc1xyXG5cdFx0dGhpcy5sb2FkLnNldFBhdGgoXCIvYXNzZXRzL2F1ZGlvL3ZvaWNlLXBhY2tzL1wiKTtcclxuXHRcdChuZXcgVm9pY2VwYWNrKFwiZGV5YW5cIikpLnByZWxvYWQodGhpcy5sb2FkKTtcclxuXHR9XHJcblxyXG5cdGNyZWF0ZSgpXHJcblx0e1xyXG5cdFx0dGhpcy5zY2VuZS5zdGFydChcIlNjZW5lX01lbnVfTWFpblwiKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNjZW5lX1ByZWxvYWQ7XHJcbiIsIi8qKlxyXG4gKiBQTEVBU0UgRE8gTk9UIFJFTU9WRSBUSElTIE5PVElDRSFcclxuICpcclxuICogQHRlbXBsYXRlICAgICAgICBUaGlzIFBoYXNlciBnYW1lIHdhcyBidWlsdCB1c2luZyBwaGFzZXItcHJvamVjdC10ZW1wbGF0ZS1lczYgKGh0dHBzOi8vZ2l0aHViLmNvbS95YW5kZXUvcGhhc2VyLXByb2plY3QtdGVtcGxhdGUtZXM2KVxyXG4gKiBAYXV0aG9yICAgICAgICAgIFlhbm5pY2sgRGV1YmVsIChodHRwczovL2dpdGh1Yi5jb20veWFuZGV1KVxyXG4gKiBAY29weXJpZ2h0ICAgICAgIDIwMTkgWWFubmljayBEZXViZWxcclxuICogQGxpY2Vuc2UgICAgICAgICB7QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL3lhbmRldS9waGFzZXItcHJvamVjdC10ZW1wbGF0ZS1lczYvYmxvYi9tYXN0ZXIvTElDRU5TRXxNSVQgTGljZW5zZX1cclxuICovXHJcblxyXG4vLyBPZiBjb3Vyc2UgeW91IGNhbiByZW1vdmUgaXQgaWYgeW91IHJlYWxseSB3YW50IHRvLCBidXQgaXQgd291bGQgYmUgbmljZSBpZiB5b3Ugd291bGQgbGVhdmUgaXQgdGhlcmUgOilcclxuXHJcbmNvbnNvbGUubG9nKFxyXG4gICclYyAlYyAlYyAlYyAlYyBCdWlsdCB1c2luZyBwaGFzZXItcHJvamVjdC10ZW1wbGF0ZS1lczYgJWMgaHR0cHM6Ly9naXRodWIuY29tL3lhbmRldS9waGFzZXItcHJvamVjdC10ZW1wbGF0ZS1lczYnLFxyXG4gICdiYWNrZ3JvdW5kOiAjZmYwMDAwJyxcclxuICAnYmFja2dyb3VuZDogI2ZmZmYwMCcsXHJcbiAgJ2JhY2tncm91bmQ6ICMwMGZmMDAnLFxyXG4gICdiYWNrZ3JvdW5kOiAjMDBmZmZmJyxcclxuICAnY29sb3I6ICNmZmY7IGJhY2tncm91bmQ6ICMwMDAwMDA7JyxcclxuICAnYmFja2dyb3VuZDogbm9uZSdcclxuKVxyXG4iLCIvKiAoaWdub3JlZCkgKi8iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtwaGFzZXJfcHJvamVjdF90ZW1wbGF0ZV9lczZcIl0gPSBzZWxmW1wid2VicGFja0NodW5rcGhhc2VyX3Byb2plY3RfdGVtcGxhdGVfZXM2XCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxuX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9yc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9zY3JpcHRzL2dhbWUuanNcIikpKVxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vd2VicGFjay9jcmVkaXRzLmpzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOlsiUGhhc2VyIiwiQXVkaW9DaGFubmVsIiwiU291bmQiLCJIVE1MNUF1ZGlvU291bmRNYW5hZ2VyIiwiX3ZvbHVtZXMiLCJzZXR0aW5ncyIsImdldCIsImRlc2lyZWRWb2x1bWUiLCJrZXkiLCJlZmZlY3RpdmVWb2x1bWUiLCJhdWRpbyIsIm1hc3RlciIsInZvbHVtZSIsImNvbnN0cnVjdG9yIiwiYXVkaW9NYW5hZ2VyIiwic2V0dGluZ0tleSIsImdhbWUiLCJzZXRWb2x1bWUiLCJ2YWwiLCJ2b2x1bWVzIiwiTWF0aCIsIm1heCIsIm1pbiIsInNldCIsInVwZGF0ZVZvbHVtZSIsIk1hc3RlckNoYW5uZWwiLCJjaGFubmVsIiwiT2JqZWN0IiwidmFsdWVzIiwiY2hhbm5lbHMiLCJBdWRpb01hbmFnZXIiLCJtYW5hZ2VycyIsImNvbmNhdCIsIkJJTkdPIiwiQmluZ29OdW1iZXJHZW5lcmF0b3IiLCJCIiwiQXJyYXkiLCJtYXhQZXJDb2x1bW4iLCJmaWxsIiwibWFwIiwieCIsImkiLCJJIiwiTiIsIkciLCJPIiwiZ2V0TGV0dGVyIiwibnVtYmVyIiwiZ2V0Q29sdW1uIiwiZmxvb3IiLCJ1c2VkTnVtYmVycyIsInJhbmRvbSIsImNvbHVtbiIsImxlbmd0aCIsImNvbnNvbGUiLCJ3YXJuIiwidG9VcHBlckNhc2UiLCJpbmRleE9mIiwiaW5jbHVkZXMiLCJwdXNoIiwiQ29seXNldXMiLCJQbGF5ZXIiLCJDb25uZWN0aW9uSGFuZGxlciIsImhvc3QiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsIm9yaWdpbiIsInJlcGxhY2UiLCJjbGllbnQiLCJDbGllbnQiLCJtYXRjaCIsIm1hdGNoU2NlbmUiLCJwbGF5ZXJzIiwiTWFwIiwicGxheWVyIiwiSlNPTiIsInBhcnNlIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwibmFtZSIsInZhbHVlIiwiZG9jdW1lbnQiLCJjb29raWUiLCJwYXJ0cyIsInNwbGl0IiwicG9wIiwic2hpZnQiLCJlcnIiLCJsb2ciLCJqb2luT3JDcmVhdGVNYXRjaCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwiam9pbk9yQ3JlYXRlIiwidXNlckRhdGEiLCJ0b0pTT04iLCJ0aGVuIiwib25NZXNzYWdlIiwibXNnIiwieHAiLCJpZCIsImRlbGV0ZSIsInNjZW5lIiwic3RvcCIsInN0YXJ0IiwiY2FyZHMiLCJzdGF0ZSIsImludGVydmFsIiwicGxheUJhbGwiLCJiYWxsIiwiZW5kIiwib25MZWF2ZSIsImNvZGUiLCJhbGVydCIsImxlYXZlTWF0Y2giLCJjYXRjaCIsImJlZ2luTWF0Y2giLCJzZW5kIiwicmVtb3ZlQWxsTGlzdGVuZXJzIiwibGVhdmUiLCJIYXNoaWRzIiwiaGFzaCIsInRhZyIsInVzZXJuYW1lIiwiZGlzY3JpbWluYXRvciIsImF2YXRhclVSTCIsInByb3ZpZGVyIiwiYXZhdGFyIiwidW5kZWZpbmVkIiwidXNlciIsImVuY29kZSIsInJlZHVjZSIsImFjYyIsInRvU3RyaW5nIiwidG9Kc29uIiwic3RvcmUiLCJzdG9yZURlZmF1bHRzIiwiU2V0dGluZ3NNYW5hZ2VyIiwiREVGQVVMVFMiLCJtdXNpYyIsInZvaWNlIiwiZWZmZWN0cyIsIl9jb21wb3NlRGVmYXVsdHMiLCJhZGRQbHVnaW4iLCJkZWZhdWx0cyIsIl9wb3B1bGF0ZUZyb21TdG9yZSIsImtleXMiLCJoYXMiLCJleGlzdGluZyIsInJlbW92ZSIsImNsZWFyIiwiZWFjaCIsIkNhbGxvdXQiLCJhbm5vdW5jZXIiLCJDb2x1bW4iLCJsZXR0ZXIiLCJ2b2ljZXBhY2siLCJWb2ljZXBhY2siLCJwcmVsb2FkIiwibG9hZCIsImxvYWRWYXJpYXRpb24iLCJ2YXJpYXRpb24iLCJmaWxlIiwiY2FsbG91dCIsIm51bWJlcnNQZXJDb2x1bW4iLCJ2YXJpYXRpb25zIiwicGFkU3RhcnQiLCJjb2wiLCJ6IiwiUmV4VUlQbHVnaW4iLCJTY2VuZV9QcmVsb2FkIiwiU2NlbmVfTWVudV9NYWluIiwiU2NlbmVfTWVudV9TZXR0aW5ncyIsIlNjZW5lX01lbnVfTGVhZGVyYm9hcmQiLCJTY2VuZV9NZW51X0NyZWRpdHMiLCJTY2VuZV9NZW51X0xvYmJpZXMiLCJTY2VuZV9NZW51X0xvYmJ5IiwiU2NlbmVfTWF0Y2giLCJwcm90b3R5cGUiLCJjb250YWlucyIsIml0ZW0iLCJmaXJzdCIsImxhc3QiLCJzaHVmZmxlIiwiaiIsIkJpbmdvIiwiR2FtZSIsImFuY2hvciIsInR5cGUiLCJBVVRPIiwiYmFja2dyb3VuZENvbG9yIiwiZGlzYWJsZVdlYkF1ZGlvIiwic2NhbGUiLCJwYXJlbnQiLCJtb2RlIiwiU2NhbGUiLCJGSVQiLCJhdXRvQ2VudGVyIiwiQ0VOVEVSX0JPVEgiLCJ3aWR0aCIsImhlaWdodCIsInBoeXNpY3MiLCJkZWZhdWx0IiwiYXJjYWRlIiwiZGVidWciLCJncmF2aXR5IiwiY2FsbGJhY2tzIiwicHJlQm9vdCIsInBsdWdpbnMiLCJwbHVnaW4iLCJtYXBwaW5nIiwic2NvcmUiLCJjb25uZWN0aW9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm1vZHVsZSIsImV4cG9ydHMiLCJCVVRUT05fV0lEVEgiLCJCdXR0b24iLCJUZXh0T3ZlcmxheSIsIkJhbGwiLCJzZXRQYXRoIiwiaW1hZ2UiLCJkYXRhIiwic2FtcGxlQmFsbCIsIkdhbWVPYmplY3RzIiwiSW1hZ2UiLCJhc3NpZ24iLCJ0ZXh0dXJlIiwib3ZlcmxheSIsInkiLCJkaXNwbGF5SGVpZ2h0IiwidGV4dCIsInNldFN0cm9rZSIsIkJhbGxRdWV1ZSIsIkNvbnRhaW5lciIsImJhbGxzIiwiYmciLCJhZGQiLCJjcmVhdGVCYWxsIiwib2xkQmFsbCIsInR3ZWVucyIsInRhcmdldHMiLCJlYXNlIiwiZHVyYXRpb24iLCJyZXNldCIsImRlc3Ryb3kiLCJDYXJkVGlsZSIsIkltYWdlT3ZlcmxheSIsIkNhcmQiLCJfZ2VuZXJhdGVCaW5nb1JvdyIsIkJJTkdPX1JPV19TVEFSVF9YIiwiQklOR09fUk9XX1NUQVJUX1kiLCJidXR0b24iLCJidXR0b25zIiwiYmluZ28iLCJfZ2VuZXJhdGVDYXJkVGlsZXMiLCJST1dfU1RBUlRfWCIsIlJPV19TVEFSVF9ZIiwiY29sTGVuZ3RoIiwiZ2VuZXJhdG9yIiwic2V0U2NhbGUiLCJjYXJkIiwidGlsZXMiLCJiaW5nb3MiLCJjb2x1bW5zIiwicm93cyIsIl9nZXRUaWxlIiwidGlsZSIsImZpbmQiLCJfZ2V0VGlsZUF0IiwiX2dldENvb3JkaW5hdGUiLCJpbmRleCIsImZpbmRJbmRleCIsIl9kZXRlcm1pbmVCaW5nbyIsImhvcml6b250YWwiLCJjb21wbGV0ZWQiLCJ2ZXJ0aWNhbCIsInBsYXkiLCJxdWV1ZSIsInNvbWUiLCJiIiwiY29tcGxldGUiLCJmaWx0ZXIiLCJDYXJkSG9sZGVyIiwiY2FyZHNBbW91bnQiLCJnZXRDYXJkUG9zaXRpb24iLCJhbW91bnQiLCJwYWRkaW5nIiwiQ0FSRF9XSURUSCIsIkNBUkRfSEVJR0hUIiwibGF5b3V0cyIsIkJBU0VfU0NPUkUiLCJmb250U2l6ZSIsImZvbnRTdHlsZSIsImRlZmF1bHRCdXR0b25Ib3ZlckV2ZW50cyIsIm9uIiwid29iYmxlIiwidHJhY2tlciIsIkFuaW1hdGlvbnMiLCJfY3JlYXRlQ29uZmV0dGkiLCJhbmltcyIsImNyZWF0ZSIsImZyYW1lcyIsImdlbmVyYXRlRnJhbWVOYW1lcyIsInplcm9QYWQiLCJwcmVmaXgiLCJzdWZmaXgiLCJmcmFtZVJhdGUiLCJyZXBlYXQiLCJoaWRlT25Db21wbGV0ZSIsImNvbmZldHRpIiwic3ByaXRlIiwibWFrZUFuaW0iLCJmcmFtZU5hbWUiLCJteUFycmF5IiwiZm4iLCJmcmFtZSIsIkxlYWRlcmJvYXJkIiwic2NvcmVzIiwic2V0T3JpZ2luIiwiU2Nyb2xsYWJsZVBhbmVsIiwiRml4V2lkdGhTaXplciIsIlJvdW5kUmVjdGFuZ2xlIiwiUGxheWVybGlzdEl0ZW0iLCJjb250YWluZXIiLCJwbGF5ZXJsaXN0IiwiVGV4dCIsImFsaWduIiwicCIsInNwbGljZSIsIlBsYXllckNvbnRhaW5lciIsImxpc3QiLCJzcmMiLCJ1cGRhdGUiLCJQbGF5ZXJsaXN0Iiwic2l6ZXIiLCJwYW5lbCIsImdldEVsZW1lbnQiLCJhZGROZXdMaW5lIiwibGF5b3V0Iiwic2Nyb2xsTW9kZSIsImNoaWxkIiwic3BhY2UiLCJsZWZ0IiwicmlnaHQiLCJ0b3AiLCJib3R0b20iLCJsaW5lIiwibWFzayIsIlNjZW5lIiwiaW1wb3J0SW1hZ2VTZXJpZXMiLCJhc3NldCIsImNhbWVyYXMiLCJtYWluIiwiY29uZmlnIiwid2FsbHBhcGVyIiwiX2dlbmVyYXRlV2FsbHBhcGVyIiwicmVzdW1lIiwiU2NlbmVCdXR0b24iLCJ0YXJnZXRTY2VuZSIsImNiIiwiY2xpY2tDYWxsYmFjayIsIm9sZEV2ZW50IiwicG9pbnRlcnVwIiwicG9pbnRlciIsImRlY2lzaW9uIiwidXNlckRlY2lzaW9uIiwiY29uZmlybSIsImNhbGwiLCJzY2VuZURhdGEiLCJTY29yZUJvYXJkIiwiU2NvcmVUcmFja2VyIiwiX3Njb3JlIiwic2V0VGV4dCIsInZhbHVlb2YiLCJCYXNlT3ZlcmxheSIsIkRFRkFVTFRfSEFORExFUlMiLCJwb2ludGVyb3ZlciIsInNldFRpbnQiLCJwb2ludGVyb3V0IiwiY2xlYXJUaW50IiwicG9pbnRlcmRvd24iLCJfb3ZlcmxheSIsImVycm9yIiwiVHlwZUVycm9yIiwic2V0RGlzcGxheVNpemUiLCJkZWZhdWx0QnV0dG9uRXZlbnRzIiwiZGVmYXVsdEJ1dHRvbkNsaWNrRXZlbnRzIiwic2V0U2l6ZSIsInNldEludGVyYWN0aXZlIiwiaGFuZGxlciIsImVudHJpZXMiLCJlbmFibGVIb3ZlckV2ZW50cyIsImVuYWJsZUNsaWNrRXZlbnRzIiwiZW5hYmxlRXZlbnRzIiwibmV3IiwidGFyZ2V0Iiwid29iYmxpbmciLCJsb29wIiwiRWFzaW5nIiwiU2luZSIsIkluT3V0IiwieW95byIsIm9uQ29tcGxldGUiLCJzZXRSZXNvbHV0aW9uIiwiU2V0dGluZyIsIkRyb3Bkb3duIiwiU2xpZGVyIiwiQ29uZmV0dGkiLCJzdWJLZXkiLCJlbGVtZW50IiwidmFsdWVUZXh0IiwiTWVudSIsImV4cGFuZGVkIiwibWVudSIsIl9jb21wb3NlQnV0dG9uQ29udGFpbmVyIiwiYXJyb3ciLCJkaXNwbGF5V2lkdGgiLCJzZWxmIiwic2V0VGV4dHVyZSIsInNldFJvdGF0aW9uIiwiUEkiLCJfY29tcG9zZU1lbnUiLCJjb2xsYXBzZSIsInNldERlcHRoIiwiaXRlbXMiLCJjaG9pY2VzIiwiY3JlYXRlQnV0dG9uQ2FsbGJhY2siLCJyZXhVSSIsImxhYmVsIiwiYmFja2dyb3VuZCIsImZvbnRGYW1pbHkiLCJpY29uIiwicm91bmRSZWN0YW5nbGUiLCJlYXNlSW4iLCJvcmllbnRhdGlvbiIsImVhc2VPdXQiLCJjaGlsZHJlbiIsInRvdWNoQ291bnQiLCJpbnB1dCIsImlzSW5Ub3VjaGluZyIsInRpdGxlIiwiUmV4U2xpZGVyIiwidG9GaXhlZCIsInZhbHVlY2hhbmdlQ2FsbGJhY2siLCJ0cmFjayIsImluZGljYXRvciIsInRodW1iIiwiVm9sdW1lU2xpZGVyIiwid2FpdGluZ1RleHQiLCJjYXJkSG9sZGVyIiwiYm9hcmQiLCJfY3JlYXRlQ2FyZHMiLCJfY3JlYXRlU2NvcmVUcmFja2VyIiwiX2NyZWF0ZVNjb3JlQm9hcmQiLCJyZW5kZXJlciIsInNjcm9sbGFibGVQYW5lbCIsImZpeFdpZHRoU2l6ZXIiLCJ1cGRhdGVTY29yZXMiLCJfY3JlYXRlQmFsbFF1ZXVlIiwidmlzaWJsZSIsInN0eWxlIiwidGltZSIsImRlbGF5ZWRDYWxsIiwibWFrZSIsImZvbnQiLCJ1cGRhdGVQYW5lbCIsImpvaW5fbG9iYnkiLCJjcmVhdGVfbG9iYnkiLCJfY3JlYXRlU2V0dGluZ3MiLCJYX0NBUkRTIiwiWV9DQVJEUyIsIlhfSU5URVJWQUwiLCJZX0lOVEVSVkFMIiwiYnRuQmVnaW4iLCJsaXN0ZW4iLCJob3N0SUQiLCJzZXNzaW9uSWQiLCJwYXJzZUludCIsInBhcnNlRmxvYXQiLCJsZWFkZXJib2FyZCIsImJ0biIsIkRFRkFVTFRTX1NMSURFUiIsIm9iamVjdHMiLCJleHQiLCJwYWQiLCJfY29tcG9zZUxvYWRpbmdTY3JlZW4iLCJiYXIiLCJwcm9ncmVzc0JhciIsImdyYXBoaWNzIiwiZmlsbFN0eWxlIiwicGVyY2VudFRleHQiLCJmaWxsUmVjdCIsInBhY2siLCJmaWxlcyIsInVybCIsIkNsYXNzIiwiYXRsYXMiXSwic291cmNlUm9vdCI6IiJ9