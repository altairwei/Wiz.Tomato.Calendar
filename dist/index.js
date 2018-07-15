/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "f23e690b74bab69ac2e3"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (typeof dep === "undefined") hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (typeof dep === "undefined") hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			{
/******/ 				// eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"index": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/index.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./src/components/Calendar/Calendar.css":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader!./src/components/Calendar/Calendar.css ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\r\n/* 日历整体样式\r\n-------------------------------------------------------------------------*/\r\n#calendar-container {\r\n    position: fixed;\r\n    top: 0;\r\n    left: 8px;\r\n    right: 8px;\r\n    bottom: 8px;\r\n}\r\n\r\n.fc-header-toolbar {\r\n    /*\r\n    the calendar will be butting up against the edges,\r\n    but let's scoot in the header's buttons\r\n    */\r\n    padding-top: 14px;\r\n    padding-left: 0;\r\n    padding-right: 0;\r\n}\r\n\r\n/* 事件渲染\r\n-------------------------------------------------------------------------*/\r\n.tc-complete {\r\n    opacity: 0.3;\r\n\r\n}\r\n\r\n.tc-complete > .fc-content {\r\n    text-decoration: line-through !important;\r\n}\r\n\r\n.tc-complete:hover {\r\n    opacity: 1;\r\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./src/components/EventPopover/EventPopover.css":
/*!********************************************************************************!*\
  !*** ./node_modules/css-loader!./src/components/EventPopover/EventPopover.css ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Popover 组件样式\r\n-------------------------------------------------------------------------*/\r\n\r\n/* Popover 容器及定位\r\n-------------------------------------*/\r\n\r\n.tc-popover {\r\n    position: absolute;\r\n    background: #FFF;\r\n    color: black;\r\n    width: auto;\r\n    border: 1px solid rgba(0, 0, 0, 0.2);\r\n    border-radius: 6px;\r\n    box-shadow: 0 2px 4px rgba(0, 0, 0, .2);\r\n    text-align: left;\r\n}\r\n\r\n.tc-popover .arrow {\r\n    position: absolute;\r\n    display: block;\r\n    width: 20px;\r\n    height: 10px;\r\n    margin: 0 6px;\r\n}\r\n\r\n.tc-popover .arrow::before, .tc-popover .arrow::after {\r\n    position: absolute;\r\n    display: block;\r\n    content: \"\";\r\n    border-color: transparent;\r\n    border-style: solid;\r\n}\r\n\r\n/* top 放置样式\r\n-------------------------------------*/\r\n\r\n.tc-popover[x-placement^=\"top\"] {\r\n    margin-bottom: 10px;\r\n}\r\n\r\n.tc-popover[x-placement^=\"top\"] .arrow {\r\n    bottom: calc((10px + 1px) * -1);\r\n}\r\n\r\n.tc-popover[x-placement^=\"top\"] .arrow::before,\r\n.tc-popover[x-placement^=\"top\"] .arrow::after {\r\n    border-width: 10px 10px 0;\r\n}\r\n\r\n.tc-popover[x-placement^=\"top\"] .arrow::before {\r\n    bottom: 0;\r\n    border-top-color: rgba(0, 0, 0, 0.25);\r\n}\r\n\r\n.tc-popover[x-placement^=\"top\"] .arrow::after {\r\n    bottom: 1px;\r\n    border-top-color: #fff;\r\n}\r\n\r\n/* right 放置样式\r\n-------------------------------------*/\r\n\r\n.tc-popover[x-placement^=\"right\"] {\r\n    margin-left: 10px;\r\n}\r\n\r\n.tc-popover[x-placement^=\"right\"] .arrow {\r\n    left: calc((10px + 1px) * -1);\r\n    width: 10px;\r\n    height: 20px;\r\n    margin: 6px 0;\r\n}\r\n\r\n.tc-popover[x-placement^=\"right\"] .arrow::before,\r\n.tc-popover[x-placement^=\"right\"] .arrow::after {\r\n    border-width: 10px 10px 10px 0;\r\n}\r\n\r\n.tc-popover[x-placement^=\"right\"] .arrow::before {\r\n    left: 0;\r\n    border-right-color: rgba(0, 0, 0, 0.25);\r\n}\r\n\r\n.tc-popover[x-placement^=\"right\"] .arrow::after {\r\n    left: 1px;\r\n    border-right-color: #fff;\r\n}\r\n\r\n/* bottom 放置样式\r\n-------------------------------------*/\r\n\r\n.tc-popover[x-placement^=\"bottom\"] {\r\n    margin-top: 10px;\r\n}\r\n\r\n.tc-popover[x-placement^=\"bottom\"] .arrow {\r\n    top: calc((10px + 1px) * -1);\r\n}\r\n\r\n.tc-popover[x-placement^=\"bottom\"] .arrow::before,\r\n.tc-popover[x-placement^=\"bottom\"] .arrow::after {\r\n    border-width: 0 10px 10px 10px;\r\n}\r\n\r\n.tc-popover[x-placement^=\"bottom\"] .arrow::before {\r\n    top: 0;\r\n    border-bottom-color: rgba(0, 0, 0, 0.25);\r\n}\r\n\r\n.tc-popover[x-placement^=\"bottom\"] .arrow::after {\r\n    top: 1px;\r\n    border-bottom-color: #f7f7f7; /*这里为了专门适配有标题背景的Popover*/\r\n}\r\n\r\n/* left 放置样式\r\n-------------------------------------*/\r\n\r\n.tc-popover[x-placement^=\"left\"] {\r\n    margin-right: 10px;\r\n}\r\n\r\n.tc-popover[x-placement^=\"left\"] .arrow {\r\n    right: calc((10px + 1px) * -1);\r\n    width: 10px;\r\n    height: 20px;\r\n    margin: 6px 0;\r\n}\r\n\r\n.tc-popover[x-placement^=\"left\"] .arrow::before,\r\n.tc-popover[x-placement^=\"left\"] .arrow::after {\r\n    border-width: 10px 0 10px 10px;\r\n}\r\n\r\n.tc-popover[x-placement^=\"left\"] .arrow::before {\r\n    right: 0;\r\n    border-left-color: rgba(0, 0, 0, 0.25);\r\n}\r\n\r\n.tc-popover[x-placement^=\"left\"] .arrow::after {\r\n    right: 1px;\r\n    border-left-color: #fff;\r\n}\r\n\r\n/* Content 标题和内容\r\n-------------------------------------*/\r\n\r\n.tc-popover-header {\r\n    padding: .5rem .75rem;\r\n    margin-bottom: 0;\r\n    font-size: 1rem;\r\n    color: inherit;\r\n    background-color: #f7f7f7;\r\n    border-bottom: 1px solid #ebebeb;\r\n    border-top-left-radius: 6px;\r\n    border-top-right-radius: 6px;\r\n}\r\n\r\n.tc-popover-body {\r\n    padding: 10px 15px;\r\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./src/components/EventPopover/PopoverTitleInput.css":
/*!*************************************************************************************!*\
  !*** ./node_modules/css-loader!./src/components/EventPopover/PopoverTitleInput.css ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#tc-editpopper-eventtitle {\r\n    border-width: 1px;\r\n    border-color: transparent;\r\n    background-color: transparent;\r\n    padding: 0;\r\n    margin: 0;\r\n    font-size: 1.2em;\r\n    font-weight: bold;\r\n}\r\n\r\n#tc-editpopper-eventtitle:focus,\r\n#tc-editpopper-eventtitle:hover {\r\n    outline: none;\r\n    border-bottom-color: black; \r\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./src/index.css":
/*!*************************************************!*\
  !*** ./node_modules/css-loader!./src/index.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "html, body {\r\n    overflow: hidden;\r\n    font-size: 14px;\r\n}\r\n\r\n:focus {\r\n    outline:none;\r\n}\r\n\r\n/* Fonts.css -- 跨平台中文字体解决方案\r\n-----------------------------------------------------------------*/\r\n.font-hei {font-family: -apple-system, \"Noto Sans\", \"Helvetica Neue\", Helvetica, \"Nimbus Sans L\", Arial, \"Liberation Sans\", \"PingFang SC\", \"Hiragino Sans GB\", \"Noto Sans CJK SC\", \"Source Han Sans SC\", \"Source Han Sans CN\", \"Microsoft YaHei\", \"Wenquanyi Micro Hei\", \"WenQuanYi Zen Hei\", \"ST Heiti\", SimHei, \"WenQuanYi Zen Hei Sharp\", sans-serif;}\r\n.font-kai {font-family: Baskerville, Georgia, \"Liberation Serif\", \"Kaiti SC\", STKaiti, \"AR PL UKai CN\", \"AR PL UKai HK\", \"AR PL UKai TW\", \"AR PL UKai TW MBE\", \"AR PL KaitiM GB\", KaiTi, KaiTi_GB2312, DFKai-SB, \"TW-Kai\", serif;}\r\n.font-song {font-family: Georgia, \"Nimbus Roman No9 L\", \"Songti SC\", \"Noto Serif CJK SC\", \"Source Han Serif SC\", \"Source Han Serif CN\", STSong, \"AR PL New Sung\", \"AR PL SungtiL GB\", NSimSun, SimSun, \"TW-Sung\", \"WenQuanYi Bitmap Song\", \"AR PL UMing CN\", \"AR PL UMing HK\", \"AR PL UMing TW\", \"AR PL UMing TW MBE\", PMingLiU, MingLiU, serif;}\r\n.font-fang-song {font-family: Baskerville, \"Times New Roman\", \"Liberation Serif\", STFangsong, FangSong, FangSong_GB2312, \"CWTEX-F\", serif;}\r\n\r\n/* 临时放置\r\n-------------------------------------*/\r\n\r\n.ui-button-icon-only.splitbutton-select {\r\n    width: 1em;\r\n}\r\n\r\na[data-goto] {\r\n    color: #000;\r\n}\r\n\r\n/* Bootstrap 4 组件样式\r\n-------------------------------------------------------------------------*/\r\n\r\n/* 表单\r\n-------------------------------------*/\r\n.col-form-label {\r\n    padding-top: calc(.375rem + 1px);\r\n    padding-bottom: calc(.375rem + 1px);\r\n    margin-bottom: 0;\r\n    font-size: inherit;\r\n    line-height: 1.5;\r\n}\r\n\r\n.input-group-addon {\r\n  border-left-width: 0;\r\n  border-right-width: 0;\r\n}\r\n.input-group-addon:first-child {\r\n  border-left-width: 1px;\r\n}\r\n.input-group-addon:last-child {\r\n  border-right-width: 1px;\r\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!**************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "./node_modules/moment/locale/af.js",
	"./af.js": "./node_modules/moment/locale/af.js",
	"./ar": "./node_modules/moment/locale/ar.js",
	"./ar-dz": "./node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "./node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "./node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "./node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "./node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "./node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "./node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "./node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "./node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "./node_modules/moment/locale/ar-tn.js",
	"./ar.js": "./node_modules/moment/locale/ar.js",
	"./az": "./node_modules/moment/locale/az.js",
	"./az.js": "./node_modules/moment/locale/az.js",
	"./be": "./node_modules/moment/locale/be.js",
	"./be.js": "./node_modules/moment/locale/be.js",
	"./bg": "./node_modules/moment/locale/bg.js",
	"./bg.js": "./node_modules/moment/locale/bg.js",
	"./bm": "./node_modules/moment/locale/bm.js",
	"./bm.js": "./node_modules/moment/locale/bm.js",
	"./bn": "./node_modules/moment/locale/bn.js",
	"./bn.js": "./node_modules/moment/locale/bn.js",
	"./bo": "./node_modules/moment/locale/bo.js",
	"./bo.js": "./node_modules/moment/locale/bo.js",
	"./br": "./node_modules/moment/locale/br.js",
	"./br.js": "./node_modules/moment/locale/br.js",
	"./bs": "./node_modules/moment/locale/bs.js",
	"./bs.js": "./node_modules/moment/locale/bs.js",
	"./ca": "./node_modules/moment/locale/ca.js",
	"./ca.js": "./node_modules/moment/locale/ca.js",
	"./cs": "./node_modules/moment/locale/cs.js",
	"./cs.js": "./node_modules/moment/locale/cs.js",
	"./cv": "./node_modules/moment/locale/cv.js",
	"./cv.js": "./node_modules/moment/locale/cv.js",
	"./cy": "./node_modules/moment/locale/cy.js",
	"./cy.js": "./node_modules/moment/locale/cy.js",
	"./da": "./node_modules/moment/locale/da.js",
	"./da.js": "./node_modules/moment/locale/da.js",
	"./de": "./node_modules/moment/locale/de.js",
	"./de-at": "./node_modules/moment/locale/de-at.js",
	"./de-at.js": "./node_modules/moment/locale/de-at.js",
	"./de-ch": "./node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "./node_modules/moment/locale/de-ch.js",
	"./de.js": "./node_modules/moment/locale/de.js",
	"./dv": "./node_modules/moment/locale/dv.js",
	"./dv.js": "./node_modules/moment/locale/dv.js",
	"./el": "./node_modules/moment/locale/el.js",
	"./el.js": "./node_modules/moment/locale/el.js",
	"./en-au": "./node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/moment/locale/en-ie.js",
	"./en-il": "./node_modules/moment/locale/en-il.js",
	"./en-il.js": "./node_modules/moment/locale/en-il.js",
	"./en-nz": "./node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/moment/locale/en-nz.js",
	"./eo": "./node_modules/moment/locale/eo.js",
	"./eo.js": "./node_modules/moment/locale/eo.js",
	"./es": "./node_modules/moment/locale/es.js",
	"./es-do": "./node_modules/moment/locale/es-do.js",
	"./es-do.js": "./node_modules/moment/locale/es-do.js",
	"./es-us": "./node_modules/moment/locale/es-us.js",
	"./es-us.js": "./node_modules/moment/locale/es-us.js",
	"./es.js": "./node_modules/moment/locale/es.js",
	"./et": "./node_modules/moment/locale/et.js",
	"./et.js": "./node_modules/moment/locale/et.js",
	"./eu": "./node_modules/moment/locale/eu.js",
	"./eu.js": "./node_modules/moment/locale/eu.js",
	"./fa": "./node_modules/moment/locale/fa.js",
	"./fa.js": "./node_modules/moment/locale/fa.js",
	"./fi": "./node_modules/moment/locale/fi.js",
	"./fi.js": "./node_modules/moment/locale/fi.js",
	"./fo": "./node_modules/moment/locale/fo.js",
	"./fo.js": "./node_modules/moment/locale/fo.js",
	"./fr": "./node_modules/moment/locale/fr.js",
	"./fr-ca": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "./node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "./node_modules/moment/locale/fr-ch.js",
	"./fr.js": "./node_modules/moment/locale/fr.js",
	"./fy": "./node_modules/moment/locale/fy.js",
	"./fy.js": "./node_modules/moment/locale/fy.js",
	"./gd": "./node_modules/moment/locale/gd.js",
	"./gd.js": "./node_modules/moment/locale/gd.js",
	"./gl": "./node_modules/moment/locale/gl.js",
	"./gl.js": "./node_modules/moment/locale/gl.js",
	"./gom-latn": "./node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "./node_modules/moment/locale/gom-latn.js",
	"./gu": "./node_modules/moment/locale/gu.js",
	"./gu.js": "./node_modules/moment/locale/gu.js",
	"./he": "./node_modules/moment/locale/he.js",
	"./he.js": "./node_modules/moment/locale/he.js",
	"./hi": "./node_modules/moment/locale/hi.js",
	"./hi.js": "./node_modules/moment/locale/hi.js",
	"./hr": "./node_modules/moment/locale/hr.js",
	"./hr.js": "./node_modules/moment/locale/hr.js",
	"./hu": "./node_modules/moment/locale/hu.js",
	"./hu.js": "./node_modules/moment/locale/hu.js",
	"./hy-am": "./node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "./node_modules/moment/locale/hy-am.js",
	"./id": "./node_modules/moment/locale/id.js",
	"./id.js": "./node_modules/moment/locale/id.js",
	"./is": "./node_modules/moment/locale/is.js",
	"./is.js": "./node_modules/moment/locale/is.js",
	"./it": "./node_modules/moment/locale/it.js",
	"./it.js": "./node_modules/moment/locale/it.js",
	"./ja": "./node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/moment/locale/ja.js",
	"./jv": "./node_modules/moment/locale/jv.js",
	"./jv.js": "./node_modules/moment/locale/jv.js",
	"./ka": "./node_modules/moment/locale/ka.js",
	"./ka.js": "./node_modules/moment/locale/ka.js",
	"./kk": "./node_modules/moment/locale/kk.js",
	"./kk.js": "./node_modules/moment/locale/kk.js",
	"./km": "./node_modules/moment/locale/km.js",
	"./km.js": "./node_modules/moment/locale/km.js",
	"./kn": "./node_modules/moment/locale/kn.js",
	"./kn.js": "./node_modules/moment/locale/kn.js",
	"./ko": "./node_modules/moment/locale/ko.js",
	"./ko.js": "./node_modules/moment/locale/ko.js",
	"./ky": "./node_modules/moment/locale/ky.js",
	"./ky.js": "./node_modules/moment/locale/ky.js",
	"./lb": "./node_modules/moment/locale/lb.js",
	"./lb.js": "./node_modules/moment/locale/lb.js",
	"./lo": "./node_modules/moment/locale/lo.js",
	"./lo.js": "./node_modules/moment/locale/lo.js",
	"./lt": "./node_modules/moment/locale/lt.js",
	"./lt.js": "./node_modules/moment/locale/lt.js",
	"./lv": "./node_modules/moment/locale/lv.js",
	"./lv.js": "./node_modules/moment/locale/lv.js",
	"./me": "./node_modules/moment/locale/me.js",
	"./me.js": "./node_modules/moment/locale/me.js",
	"./mi": "./node_modules/moment/locale/mi.js",
	"./mi.js": "./node_modules/moment/locale/mi.js",
	"./mk": "./node_modules/moment/locale/mk.js",
	"./mk.js": "./node_modules/moment/locale/mk.js",
	"./ml": "./node_modules/moment/locale/ml.js",
	"./ml.js": "./node_modules/moment/locale/ml.js",
	"./mn": "./node_modules/moment/locale/mn.js",
	"./mn.js": "./node_modules/moment/locale/mn.js",
	"./mr": "./node_modules/moment/locale/mr.js",
	"./mr.js": "./node_modules/moment/locale/mr.js",
	"./ms": "./node_modules/moment/locale/ms.js",
	"./ms-my": "./node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "./node_modules/moment/locale/ms-my.js",
	"./ms.js": "./node_modules/moment/locale/ms.js",
	"./mt": "./node_modules/moment/locale/mt.js",
	"./mt.js": "./node_modules/moment/locale/mt.js",
	"./my": "./node_modules/moment/locale/my.js",
	"./my.js": "./node_modules/moment/locale/my.js",
	"./nb": "./node_modules/moment/locale/nb.js",
	"./nb.js": "./node_modules/moment/locale/nb.js",
	"./ne": "./node_modules/moment/locale/ne.js",
	"./ne.js": "./node_modules/moment/locale/ne.js",
	"./nl": "./node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/moment/locale/nl.js",
	"./nn": "./node_modules/moment/locale/nn.js",
	"./nn.js": "./node_modules/moment/locale/nn.js",
	"./pa-in": "./node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "./node_modules/moment/locale/pa-in.js",
	"./pl": "./node_modules/moment/locale/pl.js",
	"./pl.js": "./node_modules/moment/locale/pl.js",
	"./pt": "./node_modules/moment/locale/pt.js",
	"./pt-br": "./node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "./node_modules/moment/locale/pt-br.js",
	"./pt.js": "./node_modules/moment/locale/pt.js",
	"./ro": "./node_modules/moment/locale/ro.js",
	"./ro.js": "./node_modules/moment/locale/ro.js",
	"./ru": "./node_modules/moment/locale/ru.js",
	"./ru.js": "./node_modules/moment/locale/ru.js",
	"./sd": "./node_modules/moment/locale/sd.js",
	"./sd.js": "./node_modules/moment/locale/sd.js",
	"./se": "./node_modules/moment/locale/se.js",
	"./se.js": "./node_modules/moment/locale/se.js",
	"./si": "./node_modules/moment/locale/si.js",
	"./si.js": "./node_modules/moment/locale/si.js",
	"./sk": "./node_modules/moment/locale/sk.js",
	"./sk.js": "./node_modules/moment/locale/sk.js",
	"./sl": "./node_modules/moment/locale/sl.js",
	"./sl.js": "./node_modules/moment/locale/sl.js",
	"./sq": "./node_modules/moment/locale/sq.js",
	"./sq.js": "./node_modules/moment/locale/sq.js",
	"./sr": "./node_modules/moment/locale/sr.js",
	"./sr-cyrl": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "./node_modules/moment/locale/sr.js",
	"./ss": "./node_modules/moment/locale/ss.js",
	"./ss.js": "./node_modules/moment/locale/ss.js",
	"./sv": "./node_modules/moment/locale/sv.js",
	"./sv.js": "./node_modules/moment/locale/sv.js",
	"./sw": "./node_modules/moment/locale/sw.js",
	"./sw.js": "./node_modules/moment/locale/sw.js",
	"./ta": "./node_modules/moment/locale/ta.js",
	"./ta.js": "./node_modules/moment/locale/ta.js",
	"./te": "./node_modules/moment/locale/te.js",
	"./te.js": "./node_modules/moment/locale/te.js",
	"./tet": "./node_modules/moment/locale/tet.js",
	"./tet.js": "./node_modules/moment/locale/tet.js",
	"./tg": "./node_modules/moment/locale/tg.js",
	"./tg.js": "./node_modules/moment/locale/tg.js",
	"./th": "./node_modules/moment/locale/th.js",
	"./th.js": "./node_modules/moment/locale/th.js",
	"./tl-ph": "./node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "./node_modules/moment/locale/tl-ph.js",
	"./tlh": "./node_modules/moment/locale/tlh.js",
	"./tlh.js": "./node_modules/moment/locale/tlh.js",
	"./tr": "./node_modules/moment/locale/tr.js",
	"./tr.js": "./node_modules/moment/locale/tr.js",
	"./tzl": "./node_modules/moment/locale/tzl.js",
	"./tzl.js": "./node_modules/moment/locale/tzl.js",
	"./tzm": "./node_modules/moment/locale/tzm.js",
	"./tzm-latn": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "./node_modules/moment/locale/tzm.js",
	"./ug-cn": "./node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "./node_modules/moment/locale/ug-cn.js",
	"./uk": "./node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/moment/locale/uk.js",
	"./ur": "./node_modules/moment/locale/ur.js",
	"./ur.js": "./node_modules/moment/locale/ur.js",
	"./uz": "./node_modules/moment/locale/uz.js",
	"./uz-latn": "./node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "./node_modules/moment/locale/uz-latn.js",
	"./uz.js": "./node_modules/moment/locale/uz.js",
	"./vi": "./node_modules/moment/locale/vi.js",
	"./vi.js": "./node_modules/moment/locale/vi.js",
	"./x-pseudo": "./node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "./node_modules/moment/locale/x-pseudo.js",
	"./yo": "./node_modules/moment/locale/yo.js",
	"./yo.js": "./node_modules/moment/locale/yo.js",
	"./zh-cn": "./node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "./node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "./node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "./node_modules/moment/locale/zh-hk.js",
	"./zh-tw": "./node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "./node_modules/moment/locale/zh-tw.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return App; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Calendar_Calendar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Calendar/Calendar */ "./src/components/Calendar/Calendar.js");
/* harmony import */ var _components_EventPopover_EventPopover__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/EventPopover/EventPopover */ "./src/components/EventPopover/EventPopover.js");
/* harmony import */ var _utils_WizInterface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/WizInterface */ "./src/utils/WizInterface.js");





class App extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    constructor(props) {
        super(props);
        this.state = {
            clickedEvent: null
        };
        this.handleEventClick = this.handleEventClick.bind(this);
    }

    handleEventClick(event, jsEvent, view) {
        //console.log(event.title, event, jsEvent, view)
        this.setState({
            clickedEventArgs: { event, jsEvent, view }
        });
    }

    render() {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'div',
            { id: 'wiz-tomato-calendar' },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Calendar_Calendar__WEBPACK_IMPORTED_MODULE_1__["default"], { onEventClick: this.handleEventClick }),
            this.state.clickedEventArgs && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_EventPopover_EventPopover__WEBPACK_IMPORTED_MODULE_2__["default"], {
                event: this.state.clickedEventArgs.event,
                reference: this.state.clickedEventArgs.jsEvent.target
            })
        );
    }
}

/***/ }),

/***/ "./src/components/Calendar/Calendar.css":
/*!**********************************************!*\
  !*** ./src/components/Calendar/Calendar.css ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!./Calendar.css */ "./node_modules/css-loader/index.js!./src/components/Calendar/Calendar.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader!./Calendar.css */ "./node_modules/css-loader/index.js!./src/components/Calendar/Calendar.css", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!./Calendar.css */ "./node_modules/css-loader/index.js!./src/components/Calendar/Calendar.css");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	})(__WEBPACK_OUTDATED_DEPENDENCIES__); });

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/components/Calendar/Calendar.js":
/*!*********************************************!*\
  !*** ./src/components/Calendar/Calendar.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Calendar; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/_react-dom@16.4.1@react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _FullCalendar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FullCalendar */ "./src/components/Calendar/FullCalendar.js");
/* harmony import */ var fullcalendar_reactwrapper_dist_css_fullcalendar_min_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! fullcalendar-reactwrapper/dist/css/fullcalendar.min.css */ "./node_modules/_fullcalendar-reactwrapper@1.0.7@fullcalendar-reactwrapper/dist/css/fullcalendar.min.css");
/* harmony import */ var fullcalendar_reactwrapper_dist_css_fullcalendar_min_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(fullcalendar_reactwrapper_dist_css_fullcalendar_min_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Calendar_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Calendar.css */ "./src/components/Calendar/Calendar.css");
/* harmony import */ var _Calendar_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Calendar_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _models_WizEventDataLoader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../models/WizEventDataLoader */ "./src/models/WizEventDataLoader.js");







class Calendar extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        };
        this.dataLoader = null;
        this.calendar = null;
        //绑定句柄
        this.onCalendarRender = this.onCalendarRender.bind(this);
        this.onViewRender = this.onViewRender.bind(this);
        this.onEventRender = this.onEventRender.bind(this);
    }

    onCalendarRender(el) {
        this.calendar = el;
        this.dataLoader = new _models_WizEventDataLoader__WEBPACK_IMPORTED_MODULE_5__["default"](this.calendar);
    }

    onViewRender(view, element) {
        // 刷新视图，重新获取日历事件
        const $calendar = $(this.calendar);
        const eventSources = this.dataLoader.getEventSources(view, element);
        $calendar.fullCalendar('removeEvents');
        for (let i = 0; i < eventSources.length; i++) {
            $calendar.fullCalendar('addEventSource', eventSources[i]);
        }
    }

    onEventRender(eventObj, $el) {
        // 元素已经渲染，可修改元素
        const isComplete = parseInt(eventObj.complete) == 5;
        if (isComplete) {
            // 样式
            $el.addClass('tc-complete');
        }
    }

    componentDidMount() {}

    render() {
        /**
         * 设置事件句柄
         * 因为fullcalendar-reactWrapper的实现是直接返回<div id='fullcalendar'></div>
         * 并且调用$('#fullcalendar').fullcalendar(this.props)进行构建，因此React并没有
         * 管理FullCalendar状态和渲染的能力。所以直接在设置中做好callback，让插件自我管理。
         */
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'div',
            { id: 'calendar-container' },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_FullCalendar__WEBPACK_IMPORTED_MODULE_2__["default"], { calendarRef: this.onCalendarRender
                // 基本配置
                , id: 'calendar',
                themeSystem: 'standard',
                height: 'parent',
                header: {
                    left: 'prev,next,today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay,listWeek'
                }
                // 中文化
                , buttonText: {
                    today: '今天',
                    month: '月',
                    week: '周',
                    day: '日',
                    list: '表'
                },
                monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                dayNames: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
                dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
                allDayText: '\u5168\u5929'
                // 设置视图
                , defaultView: 'agendaWeek',
                nowIndicator: true,
                firstDay: 1,
                views: {
                    agenda: {
                        minTime: "08:00:00",
                        slotLabelFormat: 'h(:mm) a'
                    }
                },
                navLinks: true,
                allDayDefault: false,
                eventLimit: true
                // 设置事件
                , selectable: true,
                selectHelper: true,
                editable: true,
                forceEventDuration: true
                // 设置UI
                , unselectCancel: '.modal *',
                dragOpacity: {
                    "month": .5,
                    "agendaWeek": 1,
                    "agendaDay": 1
                }
                // 设置句柄
                , viewRender: this.onViewRender,
                eventRender: this.onEventRender,
                eventClick: this.props.onEventClick
            })
        );
    }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/components/Calendar/FullCalendar.js":
/*!*************************************************!*\
  !*** ./src/components/Calendar/FullCalendar.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FullCalendar; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var fullcalendar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fullcalendar */ "./node_modules/fullcalendar/dist/fullcalendar.js");
/* harmony import */ var fullcalendar__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fullcalendar__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);





class FullcalendarObjectMapper {
	constructor() {}

	getSettings(properties) {
		let newSettings = {};
		for (const key in properties) {
			if (properties.hasOwnProperty(key)) {
				newSettings[key] = properties[key];
			}
		}
		return newSettings;
	}
}

class FullCalendar extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
	constructor() {
		super();
		this.jq = jquery__WEBPACK_IMPORTED_MODULE_1___default.a.noConflict();
		this.fullcalendarObjectMapper = new FullcalendarObjectMapper();
		this.root = null;
		this.instance = null;
		this.date = new Date();
	}

	componentDidMount() {
		const objectMapperSettings = this.fullcalendarObjectMapper.getSettings(this.props);
		this.instance = this.jq(`#${this.root}`).fullCalendar(objectMapperSettings);
	}

	componentWillReceiveProps(nextProps) {
		/*
  		this.jq(`#${this.root}`).fullCalendar('destroy');
  		const objectMapperSettings = this.fullcalendarObjectMapper.getSettings(nextProps);
    	this.instance = this.jq(`#${this.root}`).fullCalendar(objectMapperSettings);
  */
	}

	render() {
		this.root = this.props.id || 'ID' + this.date.getTime();
		return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { id: this.root, ref: this.props.calendarRef });
	}
}

/***/ }),

/***/ "./src/components/EventPopover/EventPopover.css":
/*!******************************************************!*\
  !*** ./src/components/EventPopover/EventPopover.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!./EventPopover.css */ "./node_modules/css-loader/index.js!./src/components/EventPopover/EventPopover.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader!./EventPopover.css */ "./node_modules/css-loader/index.js!./src/components/EventPopover/EventPopover.css", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!./EventPopover.css */ "./node_modules/css-loader/index.js!./src/components/EventPopover/EventPopover.css");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	})(__WEBPACK_OUTDATED_DEPENDENCIES__); });

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/components/EventPopover/EventPopover.js":
/*!*****************************************************!*\
  !*** ./src/components/EventPopover/EventPopover.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventPopover; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _EventPopover_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EventPopover.css */ "./src/components/EventPopover/EventPopover.css");
/* harmony import */ var _EventPopover_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_EventPopover_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var popper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! popper.js */ "./node_modules/popper.js/dist/esm/popper.js");
/* harmony import */ var _PopoverTitleInput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PopoverTitleInput */ "./src/components/EventPopover/PopoverTitleInput.js");
/* harmony import */ var _PopoverSimpleForm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PopoverSimpleForm */ "./src/components/EventPopover/PopoverSimpleForm.js");
/* harmony import */ var _PopoverToolbar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PopoverToolbar */ "./src/components/EventPopover/PopoverToolbar.js");
/* harmony import */ var _models_EventHandles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../models/EventHandles */ "./src/models/EventHandles.js");








class EventPopover extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    constructor(props) {
        super(props);
        this.popperNode = null;
        this.popperInstance = null;
        this.eventHandles = new _models_EventHandles__WEBPACK_IMPORTED_MODULE_6__["default"]();
        //
        this.state = {
            newEventData: {}
            // 绑定事件
        };this.autoHide = this.autoHide.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSaveBtnClick = this.handleSaveBtnClick.bind(this);
        this.handleCompleteBtnClick = this.handleCompleteBtnClick.bind(this);
        this.handleOpenDocBtnClick = this.handleOpenDocBtnClick.bind(this);
        this.handleDeleteDataBtnClick = this.handleDeleteDataBtnClick.bind(this);
        this.handleDeleteDocBtnClick = this.handleDeleteDocBtnClick.bind(this);
    }

    // 动画效果
    // ------------------------------------------------------------

    autoHide(e) {
        if (
        // 不是日历事件元素
        !$(this.props.reference).is(e.target) &&
        // 也不是子元素
        $(this.props.reference).has(e.target).length === 0 &&
        // 不是popper元素
        !$(this.popperNode).is(e.target) &&
        // 也不是子元素
        $(this.popperNode).has(e.target).length === 0) {
            this.hide();
        }
    }

    hide() {
        const that = this;
        return new Promise(function (resolve, reject) {
            $(that.popperNode).hide(0, null, resolve);
        });
    }

    show() {
        const that = this;
        return new Promise(function (resolve, reject) {
            $(that.popperNode).fadeIn(350, null, resolve);
        });
    }

    // 事件句柄
    // ------------------------------------------------------------

    handleTitleChange(e) {
        //储存到将新的值储存newEventData里，当保存时检索newEventData列表
        const newTitle = e.target.value;
        this.setState(function (prevState, props) {
            //拷贝前一个对象
            const newEventData = Object.create(prevState.newEventData);
            newEventData.title = newTitle;
            return { newEventData };
        });
    }

    handleSaveBtnClick(e) {
        this.hide().then(ret => this.eventHandles.onSaveBtnClick(this.props.event, this.state.newEventData));
    }

    handleCompleteBtnClick(e) {
        this.hide().then(ret => this.eventHandles.onCompleteBtnClick(this.props.event));
    }

    handleOpenDocBtnClick(e) {
        this.hide().then(ret => this.eventHandles.onOpenDocBtnClick(this.props.event));
    }

    handleDeleteDataBtnClick(e) {
        this.hide().then(ret => this.eventHandles.onDeleteDataBtnClick(this.props.event));
    }

    handleDeleteDocBtnClick(e) {
        this.hide().then(ret => this.eventHandles.onDeleteDocBtnClick(this.props.event));
    }

    // 生命周期
    // ------------------------------------------------------------

    componentDidMount() {
        // 初始化组件
        this.popperInstance = new popper_js__WEBPACK_IMPORTED_MODULE_2__["default"](this.props.reference, this.popperNode, {
            placement: 'auto',
            modifiers: {
                arrow: {
                    element: '.arrow'
                }
            }
        });
        // 设置自动隐藏
        $(document).off('click', this.autoHide).on('click', this.autoHide);
        // 显示
        this.show();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //
        this.show();
    }

    shouldComponentUpdate(nextProps, nextState) {
        // 当更新属性时才触发动画效果
        if (nextProps != this.props) {
            // 设置更新时的动画
            this.hide().then(ret => {
                //更新定位
                this.popperInstance.reference = nextProps.reference;
                this.popperInstance.update();
            });
            this.show();
        }

        //
        return true;
    }

    render() {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'div',
            { className: 'tc-popover',
                style: { display: 'none' },
                ref: div => this.popperNode = div },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('div', { className: 'arrow' }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'div',
                { className: 'tc-popover-header' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PopoverTitleInput__WEBPACK_IMPORTED_MODULE_3__["default"], {
                    eventTitle: this.props.event.title,
                    onTitleChange: this.handleTitleChange,
                    targetForm: 'tc-popover-event-editForm' })
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'div',
                { className: 'tc-popover-body' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PopoverSimpleForm__WEBPACK_IMPORTED_MODULE_4__["default"], {
                    id: 'tc-popover-event-editForm',
                    eventStart: this.props.event.start,
                    colorValue: this.props.event.backgroundColor }),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PopoverToolbar__WEBPACK_IMPORTED_MODULE_5__["default"], {
                    enableSaveBtn: !!this.state.newEventData.title,
                    onSaveBtnClick: this.handleSaveBtnClick,
                    onCompleteBtnClick: this.handleCompleteBtnClick,
                    onOpenDocBtnClick: this.handleOpenDocBtnClick,
                    onDeleteDataBtnClick: this.onDeleteDataBtnClick
                })
            )
        );
    }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/components/EventPopover/PopoverSimpleForm.js":
/*!**********************************************************!*\
  !*** ./src/components/EventPopover/PopoverSimpleForm.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventSimpleForm; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/_react-dom@16.4.1@react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/_react-bootstrap@0.32.1@react-bootstrap/es/index.js");
/* harmony import */ var _Form_DateTimePicker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Form/DateTimePicker */ "./src/components/Form/DateTimePicker.js");
/* harmony import */ var _Form_ColorPicker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Form/ColorPicker */ "./src/components/Form/ColorPicker.js");






class EventSimpleForm extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    constructor(props) {
        super(props);
        //
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange() {
        //TODO: 处理数据边跟
    }

    render() {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"],
            { horizontal: true, id: this.props.id },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Form_DateTimePicker__WEBPACK_IMPORTED_MODULE_3__["default"], { readOnly: true, id: 'tc-editpopper-eventdate',
                label: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('i', { className: 'far fa-calendar-alt fa-lg' }),
                value: this.props.eventStart.format('YYYY-MM-DD HH:mm:ss'),
                onInputChange: this.handleInputChange
            }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Form_ColorPicker__WEBPACK_IMPORTED_MODULE_4__["default"], { id: 'tc-editpopper-eventcolor',
                label: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('i', { className: 'fas fa-paint-brush fa-lg' }),
                value: this.props.colorValue,
                onInputChange: this.handleInputChange
            })
        );
    }

}

/***/ }),

/***/ "./src/components/EventPopover/PopoverTitleInput.css":
/*!***********************************************************!*\
  !*** ./src/components/EventPopover/PopoverTitleInput.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!./PopoverTitleInput.css */ "./node_modules/css-loader/index.js!./src/components/EventPopover/PopoverTitleInput.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader!./PopoverTitleInput.css */ "./node_modules/css-loader/index.js!./src/components/EventPopover/PopoverTitleInput.css", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!./PopoverTitleInput.css */ "./node_modules/css-loader/index.js!./src/components/EventPopover/PopoverTitleInput.css");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	})(__WEBPACK_OUTDATED_DEPENDENCIES__); });

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/components/EventPopover/PopoverTitleInput.js":
/*!**********************************************************!*\
  !*** ./src/components/EventPopover/PopoverTitleInput.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventTitleInput; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _PopoverTitleInput_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PopoverTitleInput.css */ "./src/components/EventPopover/PopoverTitleInput.css");
/* harmony import */ var _PopoverTitleInput_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_PopoverTitleInput_css__WEBPACK_IMPORTED_MODULE_1__);



class EventTitleInput extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {

    constructor(props) {
        super(props);
        //初始化状态
        this.state = {
            eventTitle: this.props.eventTitle, //储存原始props.title
            value: this.props.eventTitle //储存受控input的值

            //
        };this.handleChange = this.handleChange.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        /**
         * 如果用EventPopover的状态和句柄管理此组件的话，
         * 当父组件接受的props.event发生改变时，状态无法随之变化
         * 到时候依然要用到此静态方法来更具props更新状态。
         * 所以不如直接在input组件中应用此静态方法，
         * 以避免父组件重新渲染造成的动画效果
         */
        if (props.eventTitle !== state.eventTitle) {
            //当title发生变化时，重新初始化状态
            return {
                eventTitle: props.eventTitle,
                value: props.eventTitle
            };
        }

        return null;
    }

    handleChange(e) {
        //
        this.setState({ value: e.target.value });
        //将事件传递上去
        this.props.onTitleChange(e);
    }

    render() {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('input', { type: 'text', id: 'tc-editpopper-eventtitle',
            htmlFor: this.props.targetForm,
            className: 'eventtitle',
            value: this.state.value,
            onChange: this.handleChange
        });
    }

}

/***/ }),

/***/ "./src/components/EventPopover/PopoverToolbar.js":
/*!*******************************************************!*\
  !*** ./src/components/EventPopover/PopoverToolbar.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PopoverToolbar; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/_react-dom@16.4.1@react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/_react-bootstrap@0.32.1@react-bootstrap/es/index.js");




class PopoverToolbar extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {

    render() {
        //
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["ButtonToolbar"],
            null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["ButtonGroup"],
                null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"],
                    { id: 'tc-editpopper-save',
                        onClick: this.props.onSaveBtnClick,
                        disabled: !this.props.enableSaveBtn },
                    '\u4FDD\u5B58'
                ),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"],
                    { id: 'tc-editpopper-finish',
                        onClick: this.props.onCompleteBtnClick },
                    '\u5B8C\u6210'
                ),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"],
                    { id: 'tc-editpopper-edit' },
                    '\u7F16\u8F91'
                ),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["SplitButton"],
                    { pullRight: true,
                        title: '\u5220\u9664',
                        id: 'tc-editpopper-delete',
                        onClick: this.props.onDeleteDataBtnClick },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                        react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["MenuItem"],
                        {
                            eventKey: '1',
                            id: 'tc-editpopper-openEventDoc',
                            onClick: this.props.onOpenDocBtnClick },
                        '\u6253\u5F00\u6E90\u6587\u6863'
                    ),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                        react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["MenuItem"],
                        {
                            eventKey: '2',
                            id: 'tc-editpopper-deleteEventDoc',
                            onClick: this.props.onDeleteDocBtnClick },
                        '\u5220\u9664\u6E90\u6587\u6863'
                    )
                )
            )
        );
    }
}

/***/ }),

/***/ "./src/components/Form/ColorPicker.js":
/*!********************************************!*\
  !*** ./src/components/Form/ColorPicker.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ColorPicker; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/_react-dom@16.4.1@react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/_react-bootstrap@0.32.1@react-bootstrap/es/index.js");
/* harmony import */ var huebee_dist_huebee_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! huebee/dist/huebee.css */ "./node_modules/huebee/dist/huebee.css");
/* harmony import */ var huebee_dist_huebee_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(huebee_dist_huebee_css__WEBPACK_IMPORTED_MODULE_3__);



const Huebee = __webpack_require__(/*! huebee/dist/huebee.pkgd */ "./node_modules/huebee/dist/huebee.pkgd.js");


// 重写方法以触发change事件
Huebee.prototype.setTexts = function () {
    if (!this.setTextElems) {
        return;
    }
    for (var i = 0; i < this.setTextElems.length; i++) {
        var elem = this.setTextElems[i];
        var property = elem.nodeName == 'INPUT' ? 'value' : 'textContent';
        // 触发change事件
        if (elem.value != this.color) {
            elem[property] = this.color;
            elem.dispatchEvent(new Event('change'));
        }
    }
};

class ColorPicker extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    constructor(props) {
        super(props);
    }

    //TODO: 根据饱和度计算字体颜色

    componentDidMount() {
        // 初始化组件
        this.input = react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.findDOMNode(this.inputFormControl);
        this.huebeeInstance = new Huebee(this.input, {
            staticOpen: false, // Displays open and stays open. 
            setText: true, // Sets elements’ text to color. 将原始的文本设置设置成颜色值.
            setBGColor: true, // Sets elements’ background color to color.
            hues: 12, // Number of hues of the color grid. Hues are slices of the color wheel.
            hue0: 0, // The first hue of the color grid. 
            shades: 5, // Number of shades of colors and shades of gray between white and black. 
            saturations: 2, // Number of sets of saturation of the color grid.
            notation: 'hex', // Text syntax of colors values.
            className: null, // Class added to Huebee element. Useful for CSS.
            customColors: ['#32CD32', '#5484ED', '#A4BDFE', '#46D6DB', '#7AE7BF', '#51B749', '#FBD75B', '#FFB878', '#FF887C', '#DC2127', '#DBADFF', '#E1E1E1']
        });
    }

    render() {
        //TODO: 读取父元素horizontal属性，决定条件渲染
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["FormGroup"],
            { controlId: this.props.id },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"],
                { componentClass: react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["ControlLabel"], sm: 2 },
                this.props.label
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"],
                { sm: 10 },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["FormControl"], { type: 'text',
                    ref: instance => this.inputFormControl = instance,
                    value: this.props.value //hex色彩值
                    , style: { //改变颜色
                        backgroundColor: `${this.props.value}`
                    },
                    readOnly: this.props.readOnly,
                    onChange: this.props.onInputChange
                })
            )
        );
    }
}

/***/ }),

/***/ "./src/components/Form/DateTimePicker.js":
/*!***********************************************!*\
  !*** ./src/components/Form/DateTimePicker.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DateTimePicker; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/_react-dom@16.4.1@react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/_react-bootstrap@0.32.1@react-bootstrap/es/index.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var bootstrap_js_collapse__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bootstrap/js/collapse */ "./node_modules/bootstrap/js/collapse.js");
/* harmony import */ var bootstrap_js_collapse__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(bootstrap_js_collapse__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var bootstrap_js_transition__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! bootstrap/js/transition */ "./node_modules/bootstrap/js/transition.js");
/* harmony import */ var bootstrap_js_transition__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(bootstrap_js_transition__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var eonasdan_bootstrap_datetimepicker__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! eonasdan-bootstrap-datetimepicker */ "./node_modules/eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js");
/* harmony import */ var eonasdan_bootstrap_datetimepicker__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(eonasdan_bootstrap_datetimepicker__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var eonasdan_bootstrap_datetimepicker_build_css_bootstrap_datetimepicker_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css */ "./node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css");
/* harmony import */ var eonasdan_bootstrap_datetimepicker_build_css_bootstrap_datetimepicker_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(eonasdan_bootstrap_datetimepicker_build_css_bootstrap_datetimepicker_css__WEBPACK_IMPORTED_MODULE_7__);









class DateTimePicker extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // 初始化组件
        this.input = react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.findDOMNode(this.inputFormControl);
        $(this.input).datetimepicker({
            format: 'YYYY-MM-DD HH:mm:ss'
        });
    }

    render() {
        //TODO: 读取父元素horizontal属性，决定条件渲染
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["FormGroup"],
            { controlId: this.props.id },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"],
                { componentClass: react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["ControlLabel"], sm: 2 },
                this.props.label
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"],
                { sm: 10 },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["FormControl"], { type: 'text',
                    ref: instance => this.inputFormControl = instance,
                    value: this.props.value,
                    readOnly: this.props.readOnly,
                    onChange: this.props.onInputChange
                })
            )
        );
    }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader!./index.css */ "./node_modules/css-loader/index.js!./src/index.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../node_modules/css-loader!./index.css */ "./node_modules/css-loader/index.js!./src/index.css", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (function() {
		var newContent = __webpack_require__(/*! !../node_modules/css-loader!./index.css */ "./node_modules/css-loader/index.js!./src/index.css");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	})(__WEBPACK_OUTDATED_DEPENDENCIES__); });

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/_react-dom@16.4.1@react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var fullcalendar_reactwrapper_dist_css_fullcalendar_min_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fullcalendar-reactwrapper/dist/css/fullcalendar.min.css */ "./node_modules/_fullcalendar-reactwrapper@1.0.7@fullcalendar-reactwrapper/dist/css/fullcalendar.min.css");
/* harmony import */ var fullcalendar_reactwrapper_dist_css_fullcalendar_min_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fullcalendar_reactwrapper_dist_css_fullcalendar_min_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.css */ "./node_modules/bootstrap/dist/css/bootstrap.css");
/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var bootstrap_dist_css_bootstrap_theme_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap-theme.css */ "./node_modules/bootstrap/dist/css/bootstrap-theme.css");
/* harmony import */ var bootstrap_dist_css_bootstrap_theme_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_theme_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _fortawesome_fontawesome_free_css_all_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/fontawesome-free/css/all.css */ "./node_modules/_@fortawesome_fontawesome-free@5.1.0@@fortawesome/fontawesome-free/css/all.css");
/* harmony import */ var _fortawesome_fontawesome_free_css_all_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_fontawesome_free_css_all_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./App */ "./src/App.js");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./index.css */ "./src/index.css");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_7__);









react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_App__WEBPACK_IMPORTED_MODULE_6__["default"], null), document.getElementById('root'));

/*
$(function(){
    // 定义变量
	const dataLoader = new WizEventDataLoader();
	let g_editPopper, g_createModal, g_editModal;

    const calendar = $('#calendar').fullCalendar({
		themeSystem: 'standard',
		height: 'parent',
		header: {
			left: 'prev,next,today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay,listWeek'
		},
		views: {
			month: {
				//titleFormat: g_loc_titleformat_month, //var g_loc_titleformat_month = "MMMM yyyy";
			},
			agenda: {
				minTime: "08:00:00",
				slotLabelFormat: 'h(:mm) a'
			},
			listWeek: {

			}
		},
		navLinks: true,
		allDayDefault: false,
		defaultView: 'agendaWeek',
		eventLimit: true,
		buttonText: {
			today: '今天',
			month: '月',
			week: '周',
			day: '日',
			list: '表'
        },
		monthNames: [
            '1月', '2月', '3月', '4月', 
            '5月', '6月', '7月', '8月', 
            '9月', '10月', '11月', '12月'
        ],
		monthNamesShort: [
            '1月', '2月', '3月', '4月', 
            '5月', '6月', '7月', '8月', 
            '9月', '10月', '11月', '12月'
        ],
		dayNames: [
            '周日', '周一', '周二', '周三', '周四', '周五', '周六'
        ],
		dayNamesShort: [
            '周日', '周一', '周二', '周三', '周四', '周五', '周六'
        ],
		selectable: true,
		selectHelper: true,
		unselectCancel: '.modal *',
		allDayText: '全天',
		nowIndicator: true,
		forceEventDuration: true,
		firstDay: 1, // 第一天是周一还是周天，与datepicker必须相同
		dragOpacity: {
			"month": .5,
			"agendaWeek": 1,
			"agendaDay": 1
		},
		editable: true,

		// 刷新视图，重新获取日历事件
		viewRender: function( view, element ) {
			//TODO: 感觉这样造成性能上的损失，是否有更好的方法？
			const calendar = $('#calendar');
			const eventSources = dataLoader.getEventSources( view, element );
			calendar.fullCalendar('removeEvents');
			for (let i=0 ; i < eventSources.length; i++) {
				calendar.fullCalendar('addEventSource', eventSources[i]);
			}
			
		},

		// 选择动作触发的事件句柄，定义了一个callback
		select: function(start, end, jsEvent, view){
			// 弹出“创建日历事件”窗口
			// 判断是否渲染
			//TODO: 想办法不要用全局变量
			if ( !window.g_createModal ) new EventCreateModal({start, end, jsEvent, view});
			// 传递参数
			window.g_createModal.update({start, end, jsEvent, view});
			window.g_createModal.show();
		},

		eventDragStart: function( event, jsEvent, ui, view ) { },
		eventDragStop: function( event, jsEvent, ui, view ) { },

		// 日历事件拖动 event, delta, revertFunc, jsEvent, ui, view
		eventDrop: function(event, delta, revertFunc, jsEvent, ui, view){
			if (event.id){
				dataLoader.updateEventDataOnDrop(event, delta, revertFunc, jsEvent, ui, view)
			} else {
				revertFunc();
			}
		},

		// 日历事件日期范围重置
		eventResize: function(event, delta, revertFunc, jsEvent, ui, view){
			if (event.id){
				dataLoader.updateEventDataOnResize(event, delta, revertFunc, jsEvent, ui, view);
			} else {
				revertFunc();
			}
		},

		eventRender: function(eventObj, $el) {
			// 元素已经渲染，可修改元素
			const isComplete = parseInt(eventObj.complete) == 5;
			if ( isComplete ) {
				// 样式
				$el.addClass('tc-complete');
			}
			
		},

		// 日历事件点击后事件句柄
		eventClick: function( event, jsEvent, view ) {
			// this 指向包裹事件的<a>元素

			// 判断是否已经渲染弹窗
			if ( !g_editPopper ) {
				g_editPopper = renderEditPopper({
					'event': event,
					'jsEvent': jsEvent,
					'view': view
				}, this).EventPopover('show');
			} else {
				// 更新reference
				g_editPopper.EventPopover('option', {
					args: {
						'event': event,
						'jsEvent': jsEvent,
						'view': view
					},
					title: event.title,
					reference: this
				}).EventPopover('update').EventPopover('show');
			}

		}
		
	})
})
*/

/***/ }),

/***/ "./src/models/CalendarEvent.js":
/*!*************************************!*\
  !*** ./src/models/CalendarEvent.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CalendarEvent; });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fullcalendar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fullcalendar */ "./node_modules/fullcalendar/dist/fullcalendar.js");
/* harmony import */ var fullcalendar__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fullcalendar__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_WizInterface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/WizInterface */ "./src/utils/WizInterface.js");
/* harmony import */ var _utils_Config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/Config */ "./src/utils/Config.js");





class CalendarEvent {
	/**
     * 创建一个通用日程.
  * @param {Object} data 原始数据类型，可以是 WizEvent, FullCalendarEvent 以及 GUID.
     */
	constructor(data, calendar) {
		if (!_utils_WizInterface__WEBPACK_IMPORTED_MODULE_2__["WizDatabase"]) throw new Error('IWizDatabase is not valid.');
		this.$calendar = $(calendar);
		const type = this._checkDataType(data);
		switch (type) {
			case "WizEvent":
			case "FullCalendarEvent":
				this._create(data, type);
				break;
			case "GUID":
				try {
					//TODO: 获得WizEvent数据，并创建对象
					const doc = _utils_WizInterface__WEBPACK_IMPORTED_MODULE_2__["WizDatabase"].DocumentFromGUID(data);
					const newEventData = {
						"CALENDAR_END": doc.GetParamValue('CALENDAR_END'),
						"CALENDAR_INFO": doc.GetParamValue('CALENDAR_INFO'),
						"CALENDAR_EXTRAINFO": doc.GetParamValue('CALENDAR_EXTRAINFO'),
						"CALENDAR_START": doc.GetParamValue('CALENDAR_START'),
						"CALENDAR_RECURRENCE": doc.GetParamValue('CALENDAR_RECURRENCE'),
						"CALENDAR_ENDRECURRENCE": doc.GetParamValue('CALENDAR_ENDRECURRENCE'),
						"created": moment__WEBPACK_IMPORTED_MODULE_0___default()(doc.DateCreated).format('YYYY-MM-DD HH:mm:ss'),
						"guid": doc.GUID,
						"title": doc.Title,
						"updated": moment__WEBPACK_IMPORTED_MODULE_0___default()(doc.DateModified).format('YYYY-MM-DD HH:mm:ss')
					};
					this._create(newEventData, 'WizEvent');
				} catch (e) {
					console.error(e);
				}
				break;
		}
	}

	_create(data, type) {
		let start, end, id, bkColor, allDay, complete, dateCompleted, rptRule, rptEnd;
		switch (type) {
			case "GUID":
			case "WizEvent":
				this._Info = this._parseInfo(data.CALENDAR_INFO);
				this._ExtraInfo = data.CALENDAR_EXTRAINFO ? this._parseInfo(data.CALENDAR_EXTRAINFO) : this._getDefaultExtraInfo();
				// 统一变量
				id = data.guid;
				start = data.CALENDAR_START;
				end = data.CALENDAR_END;
				// 判断是否用户自定义背景色，向下兼容原版日历
				bkColor = this._Info.ci ? parseInt(this._Info.ci) == 0 ? this._Info.b : _utils_Config__WEBPACK_IMPORTED_MODULE_3__["default"].colorItems[this._Info.ci].colorValue : this._Info.b;
				allDay = data.CALENDAR_END.indexOf("23:59:59") != -1 ? true : false;
				complete = this._ExtraInfo.Complete;
				dateCompleted = this._ExtraInfo.DateCompleted;
				// 重复事件
				rptRule = data.CALENDAR_RECURRENCE;
				rptEnd = data.CALENDAR_ENDRECURRENCE;
				break;
			case "FullCalendarEvent":
				id = data.id;
				start = data.start;
				end = data.end;
				bkColor = data.backgroundColor;
				allDay = data.allDay ? data.allDay : !$.fullCalendar.moment(data.start).hasTime();
				complete = data.complete || 0;
				dateCompleted = data.dateCompleted || '';
				rptRule = data.rptRule;
				rptEnd = data.rptEnd;
				break;
			default:
				throw new Error('Can not identify data type.');
				break;
		}
		// 基本信息
		this.id = id;
		this.title = data.title;
		// 时间信息
		this.allDay = allDay;
		// 注意！start/end 可能是moment对象或者str，所以一律先转换成moment再格式化输出
		this.start = allDay ? moment__WEBPACK_IMPORTED_MODULE_0___default()(start).format("YYYY-MM-DD") : moment__WEBPACK_IMPORTED_MODULE_0___default()(start).format('YYYY-MM-DD HH:mm:ss');
		this.end = allDay ? moment__WEBPACK_IMPORTED_MODULE_0___default()(end).format("YYYY-MM-DD") : moment__WEBPACK_IMPORTED_MODULE_0___default()(end).format('YYYY-MM-DD HH:mm:ss');
		this.created = data.created ? data.created : moment__WEBPACK_IMPORTED_MODULE_0___default()(start).format('YYYY-MM-DD HH:mm:ss');
		this.updated = data.updated ? data.updated : moment__WEBPACK_IMPORTED_MODULE_0___default()().format('YYYY-MM-DD HH:mm:ss');
		// 设置信息
		this.textColor = 'black';
		this.backgroundColor = bkColor;
		this.complete = complete;
		this.dateCompleted = dateCompleted;
		// 重复事件
		this.rptRule = rptRule;
		this.rptEnd = rptEnd;
		//
		this._update();
	}

	_checkDataType(data) {
		const objClass = data.constructor;
		const GUID_RegExr = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
		let type;
		switch (objClass) {
			case String:
				if (GUID_RegExr.test(data)) type = "GUID";else throw new Error('Unknown data, cannot create CalendarEvent object.');
				break;
			case Object:
				if (data.CALENDAR_INFO && data.title) {
					type = 'WizEvent';
				} else if (data.start && data.title) {
					type = 'FullCalendarEvent';
				}
				break;
		}
		return type;
	}

	_parseInfo(InfoString) {
		const InfoObject = {};
		// 拆解CALENDAR_INFO
		const InfoArray = InfoString.split('/');
		InfoArray.forEach(function (item, index, arr) {
			const pair = item.split('=');
			InfoObject[pair[0]] = pair[1];
		});
		// 处理颜色值
		if (InfoObject.b) InfoObject.b = '#' + InfoObject.b;

		return InfoObject;
	}

	/**
     * 将 Info 对象序列化.
  * @private
  * @param {Object} [InfoObject=] 提供 Info 对象，默认为`this._Info`.
     * @return {String} 返回用于Info对象字符串.
     */
	_stringifyInfo(InfoObject = this._Info) {
		if (!InfoObject) return '';
		const InfoArray = [];
		const InfoObjectKeysArray = Object.keys(InfoObject);
		InfoObjectKeysArray.forEach(function (item, index, arr) {
			const singleInfo = `${item}=${InfoObject[item]}`;
			InfoArray.push(singleInfo);
		});
		return InfoArray.join('/').replace('#', '');
	}

	_update() {
		this._updateInfo();
		this._updateExtraInfo();
	}

	_updateInfo() {
		const that = this;
		const InfoObject = {
			'b': null, //背景色hex值
			'r': '-1', //提醒方式
			'c': '0', //结束提醒信息
			'ci': 0 //背景色ID，默认 0 表示背景为用户自定义
		};
		// 更新背景色'b'
		InfoObject['b'] = this.backgroundColor.replace('#', '');
		// 更新颜色指数'ci'
		_utils_Config__WEBPACK_IMPORTED_MODULE_3__["default"].colorItems.forEach(function (item, index, arr) {
			if (item.colorValue == that.backgroundColor) {
				// 当日程背景色与色表匹配时则用 color idex 来储存（兼容原版日历插件）
				InfoObject['ci'] = index;
			};
		});
		// 应用更新
		this._Info = InfoObject;
	}

	_getDefaultExtraInfo() {
		return {
			'Complete': 0, //
			'DateCompleted': '', // ISO 标准日期字符串 YYYY-MM-DD 00:00:00
			'Prior': 0
		};
	}

	_updateExtraInfo() {
		const ExtraInfoObject = {
			'Complete': 0,
			'DateCompleted': '',
			'Prior': 0
		};
		ExtraInfoObject['Complete'] = this.complete;
		ExtraInfoObject['DateCompleted'] = this.dateCompleted;
		this._ExtraInfo = ExtraInfoObject;
	}

	_getEventHtml(title = this.title, content = '') {
		const htmlText = `<html>
				<head>
					<meta http-equiv="Content-Type" content="text/html; charset=unicode">
					<title>${title}</title> 
				</head>
				<body>
					<!--WizHtmlContentBegin-->
					<div>${content}</div>
					<!--WizHtmlContentEnd-->
				</body>
			</html>`;

		return htmlText;
	}

	/**
     * 根据日程的重复规则生成 FullCalendar eventSource.
  * @param {String} start 查询起始，ISO 标准日期字符串.
  * @param {String} end 查询结束，ISO 标准日期字符串.
     * @returns {Object} eventSource.
     */
	generateRepeatEvents(start, end) {
		if (!this.rptRule) throw new Error('Cannot find CalendarEvent repeat rule.');
		const eventSource = {
			id: this.id,
			events: []
			//根据rptRule生成重复日期，并生成事件
		};const dayArray = this._getRenderRepeatDay(start, end);
		for (let day of dayArray) {
			// day 是一个Moment日期对象
			const newEvent = this.toFullCalendarEvent();
			newEvent.start = day.format('YYYY-MM-DD HH:mm:ss');
			newEvent.end = moment__WEBPACK_IMPORTED_MODULE_0___default()(newEvent.end).add(day.diff(moment__WEBPACK_IMPORTED_MODULE_0___default()(this.start))).format('YYYY-MM-DD HH:mm:ss');
			eventSource.events.push(newEvent);
		}

		return eventSource;
	}

	/**
     * 根据规则生成日期数组
     * @returns {Object[]} 包含一系列`Moment`日期对象的数组.
     */
	_getRenderRepeatDay(start, end) {
		const rptRule = this.rptRule;
		let dayArray;
		let regex;
		console.count(rptRule);
		if ((regex = /^Every(\d)?Weeks?(\d*)$/).test(rptRule)) {
			// 每[1234]周[7123456]
			const curWeekDay = moment__WEBPACK_IMPORTED_MODULE_0___default()(this.start).day();
			const results = regex.exec(rptRule);
			const interWeek = results[1];
			const number = results[2] || `${curWeekDay}`;
			dayArray = this._getWeeklyRepeatDay(number, start, end, interWeek);
		} else if ((regex = /^EveryWeekday(\d*)$/).test(rptRule)) {
			// 每个工作日EveryWeekday135
			const results = regex.exec(rptRule);
			const number = results[1] || '12345';
			dayArray = this._getWeeklyRepeatDay(number, start, end);
		} else if ((regex = /Daily|Weekly|Monthly|Yearly/).test(rptRule)) {
			// Daily|Weekly|Monthly|Yearly
			const perRule = regex.exec(rptRule)[0];
			dayArray = this._getPerRepeatDays(start, end, perRule);
		}

		return dayArray;
	}

	/**
     * 根据每周规则生成日期数组
  * @param {String} number 整数字符串表示的规则；
     * @returns {Object[]} 包含一系列Moment日期对象的数组.
     */
	_getWeeklyRepeatDay(number, start, end, interWeeks = '1') {
		//返回[{start, end}, {start, end}, {start, end}]
		//考虑渲染范围，以及结束循环的日期
		const viewStart = moment__WEBPACK_IMPORTED_MODULE_0___default()(this.start);
		const viewEnd = moment__WEBPACK_IMPORTED_MODULE_0___default()(end);
		const rptEnd = this.rptEnd ? moment__WEBPACK_IMPORTED_MODULE_0___default()(this.rptEnd) : viewEnd;
		let dayArray = [];
		const intervalWeeks = interWeeks ? parseInt(interWeeks) : 1;
		const weekdays = number.replace('7', '0').split(''); //周日0~6周六
		for (let day of weekdays) {
			//
			let curWeekDay = parseInt(day),
			    newEventStartDate = moment__WEBPACK_IMPORTED_MODULE_0___default()(viewStart);
			do {
				// 创建新Moment对象
				newEventStartDate = moment__WEBPACK_IMPORTED_MODULE_0___default()(viewStart).day(curWeekDay);
				// 根据日程设置time part
				const eventStart = moment__WEBPACK_IMPORTED_MODULE_0___default()(this.start);
				newEventStartDate.set({
					'hour': eventStart.get('hour'),
					'minute': eventStart.get('minute'),
					'second': eventStart.get('second')
				});
				// 避免初始重复渲染
				if (!newEventStartDate.isSame(eventStart)) dayArray.push(moment__WEBPACK_IMPORTED_MODULE_0___default()(newEventStartDate));
				// 隔多少周重复
				curWeekDay += 7 * intervalWeeks;
				//console.log( moment(newEventStartDate).format('YYYY-MM-DD HH:mm:ss') );
			} while (moment__WEBPACK_IMPORTED_MODULE_0___default()(viewStart).day(curWeekDay + 7).isBefore(viewEnd) && moment__WEBPACK_IMPORTED_MODULE_0___default()(viewStart).day(curWeekDay + 7).isBefore(rptEnd));
		}

		return dayArray;
	}

	_getPerRepeatDays(start, end, perRule) {
		const perRuleMap = {
			'Daily': 'days',
			'Weekly': 'weeks',
			'Monthly': 'months',
			'Yearly': 'years'
		};
		const viewStart = moment__WEBPACK_IMPORTED_MODULE_0___default()(this.start);
		const viewEnd = moment__WEBPACK_IMPORTED_MODULE_0___default()(end);
		const rptEnd = this.rptEnd ? moment__WEBPACK_IMPORTED_MODULE_0___default()(this.rptEnd) : viewEnd;
		let dayArray = [];
		const eventStart = moment__WEBPACK_IMPORTED_MODULE_0___default()(this.start);
		do {
			// 增加一个月
			eventStart.add(1, perRuleMap[perRule]);
			dayArray.push(moment__WEBPACK_IMPORTED_MODULE_0___default()(eventStart));
		} while (eventStart.isBefore(viewEnd) && eventStart.isBefore(rptEnd));

		return dayArray;
	}

	toFullCalendarEvent() {
		// 注意方法返回的只是FullCalendarEvent的数据类型，并不是event对象
		const that = this;
		const newEvent = {};
		const keys = Object.keys(this);
		// 去除非必要属性
		keys.splice(keys.findIndex(i => i == '_Info'), 1);
		keys.splice(keys.findIndex(i => i == '_ExtraInfo'), 1);
		// 浅拷贝, 不过主要属性都是基本数据类型，所以不存在引用问题
		keys.forEach(function (item, index, arr) {
			newEvent[item] = that[item];
		});
		return newEvent;
	}

	toWizEventData() {
		this._update();
		const newEvent = {};
		newEvent.title = this.title;
		newEvent.guid = this.id;
		newEvent.CALENDAR_START = this.allDay ? moment__WEBPACK_IMPORTED_MODULE_0___default()(this.start).format('YYYY-MM-DD 00:00:00') : this.start;
		newEvent.CALENDAR_END = this.allDay ? moment__WEBPACK_IMPORTED_MODULE_0___default()(this.end).format('YYYY-MM-DD 23:59:59') : this.end;
		newEvent.CALENDAR_INFO = this._stringifyInfo(this._Info);
		newEvent.CALENDAR_EXTRAINFO = this._stringifyInfo(this._ExtraInfo);
		newEvent.created = this.created;
		newEvent.updated = this.updated;
		return newEvent;
	}

	addToFullCalendar() {
		//TODO: 将自身添加到FullCalendar
		this.$calendar.fullCalendar('addEventSource', {
			events: [this.toFullCalendarEvent()]
		});
	}

	_saveAllProp() {
		//TODO: 保存全部数据包括Title
		// 更新事件文档数据
		const doc = _utils_WizInterface__WEBPACK_IMPORTED_MODULE_2__["WizDatabase"].DocumentFromGUID(this.id);
		// 保存标题
		doc.Title = this.title;
		// 保存时间数据
		if (this.allDay) {
			let startStr = moment__WEBPACK_IMPORTED_MODULE_0___default()(this.start).set({ 'h': 0, 'm': 0, 's': 0 }).format('YYYY-MM-DD HH:mm:ss');
			let endStr = moment__WEBPACK_IMPORTED_MODULE_0___default()(this.end).set({ 'h': 23, 'm': 59, 's': 59 }).format('YYYY-MM-DD HH:mm:ss');
			this._setParamValue(doc, "CALENDAR_START", startStr);
			this._setParamValue(doc, "CALENDAR_END", endStr);
		} else {
			let startStr = moment__WEBPACK_IMPORTED_MODULE_0___default()(this.start).format('YYYY-MM-DD HH:mm:ss');
			let endStr = moment__WEBPACK_IMPORTED_MODULE_0___default()(this.end).format('YYYY-MM-DD HH:mm:ss');
			this._setParamValue(doc, "CALENDAR_START", startStr);
			this._setParamValue(doc, "CALENDAR_END", endStr);
		}

		// 保存 CALENDAR_INFO
		this._update();
		this._setParamValue(doc, "CALENDAR_INFO", this._stringifyInfo(this._Info));
		this._setParamValue(doc, "CALENDAR_EXTRAINFO", this._stringifyInfo(this._ExtraInfo));
	}

	// 设置文档属性值
	_setParamValue(doc, key, value) {
		if (!doc) return false;
		doc.SetParamValue(key, value);
	}

	_createWizEventDoc() {
		//TODO: 保存全部数据包括Title
		// 创建WizDoc
		const location = `My Events/${moment__WEBPACK_IMPORTED_MODULE_0___default()(this.start).format('YYYY-MM')}/`;
		const objFolder = _utils_WizInterface__WEBPACK_IMPORTED_MODULE_2__["WizDatabase"].GetFolderByLocation(location, true);
		const tempHtml = _utils_WizInterface__WEBPACK_IMPORTED_MODULE_2__["WizCommonUI"].GetATempFileName('.html');
		const htmlText = this._getEventHtml(this.title, '');
		_utils_WizInterface__WEBPACK_IMPORTED_MODULE_2__["WizCommonUI"].SaveTextToFile(tempHtml, htmlText, 'unicode');
		const doc = objFolder.CreateDocument2(this.title, "");
		doc.ChangeTitleAndFileName(this.title);
		doc.UpdateDocument6(tempHtml, tempHtml, 0x22);
		// 设置标签
		//if ( tags ) doc.SetTagsText2(tags, "Calendar");
		// 将信息编码到WizDoc属性中去
		const newEvent = this.toWizEventData();
		doc.AddToCalendar(newEvent.CALENDAR_START, newEvent.CALENDAR_END, newEvent.CALENDAR_INFO);
		// change database
		doc.type = "event";
		//
		this.id = doc.GUID;
	}

	saveToWizEventDoc(prop = 'all') {
		if (!_utils_WizInterface__WEBPACK_IMPORTED_MODULE_2__["WizDatabase"] || !_utils_WizInterface__WEBPACK_IMPORTED_MODULE_2__["WizCommonUI"]) throw new Error('IWizDatabase or IWizCommonUI is not valid.');
		//检查文档是否存在
		const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
		const isWizDocExist = guidRegex.test(this.id);
		// 创建或者更新文档
		if (isWizDocExist) {
			// 根据指令更新内容
			this._saveAllProp();
			// 更新FullCalendar
		} else {
			// 创建新的事件文档
			this._createWizEventDoc();
		}
	}

	deleteEventData(isDeleteDoc = false) {
		let doc = _utils_WizInterface__WEBPACK_IMPORTED_MODULE_2__["WizDatabase"].DocumentFromGUID(this.id);
		if (!doc) throw new Error('Can not find Event related WizDocument.');
		// 移除FullCalendar事件
		this.$calendar.fullCalendar('removeEvents', this.id);
		// 移除日历数据
		doc.RemoveFromCalendar();
		// 删除文档
		if (isDeleteDoc) doc.Delete();
	}

	refetchData() {
		//TODO: 重数据库重新获取数据更新实例
	}

	refreshEvent(event) {
		//TODO: 应该自动遍历并修改属性
		if (event) {
			// 重新渲染FullCalendar事件
			event.title = this.title;
			event.backgroundColor = this.backgroundColor;
			this.$calendar.fullCalendar('updateEvent', event);
		} else {
			//用.fullCalendar( ‘clientEvents’ [, idOrFilter ] ) -> Array 获取源数据从而更新
			//TODO: 遍历并寻找GUID匹配的事件
		}
	}

}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/models/EventHandles.js":
/*!************************************!*\
  !*** ./src/models/EventHandles.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FormHandles; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _models_WizEventDataLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/WizEventDataLoader */ "./src/models/WizEventDataLoader.js");
/* harmony import */ var _models_CalendarEvent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/CalendarEvent */ "./src/models/CalendarEvent.js");
/* harmony import */ var _utils_WizInterface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/WizInterface */ "./src/utils/WizInterface.js");





class FormHandles {
    constructor() {
        this.$calendar = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#calendar');
    }

    onCreateBtnClick(start, end, jsEvent, view, formNode) {
        const title = jquery__WEBPACK_IMPORTED_MODULE_0___default()(formNode).find('#tc-createpage-eventtitle').val();
        const color = jquery__WEBPACK_IMPORTED_MODULE_0___default()(formNode).find('#tc-createpage-eventcolor').val();
        new _models_WizEventDataLoader__WEBPACK_IMPORTED_MODULE_1__["default"]().createEvent({ start, end, jsEvent, view }, { title, color }); // 这一步耗时
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(formNode).modal('hide');
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#calendar').fullCalendar('unselect');
    }

    onSaveBtnClick(event, newEventData) {
        for (const prop in newEventData) {
            event[prop] = newEventData[prop];
        }
        // 重新渲染
        this.$calendar.fullCalendar('updateEvent', event);
        // 修改源数据
        const newEvent = new _models_CalendarEvent__WEBPACK_IMPORTED_MODULE_2__["default"](event);
        newEvent.saveToWizEventDoc();
    }

    onCompleteBtnClick(event) {
        // 修改数据
        const isComplete = parseInt(event.complete) == 5;
        if (isComplete) {
            event.complete = '0';
        } else {
            event.complete = '5';
        }
        // 保存数据
        const newEvent = new _models_CalendarEvent__WEBPACK_IMPORTED_MODULE_2__["default"](event);
        newEvent.saveToWizEventDoc();
        // 重新渲染
        this.$calendar.fullCalendar('updateEvent', event);
    }

    onDeleteDataBtnClick(event) {
        if (Object(_utils_WizInterface__WEBPACK_IMPORTED_MODULE_3__["WizConfirm"])("确定要删除该日程？", '番茄助理')) {
            // 删除日程
            let newEvent = new _models_CalendarEvent__WEBPACK_IMPORTED_MODULE_2__["default"](event);
            newEvent.deleteEventData(false);
        }
    }

    onDeleteDocBtnClick(event) {
        if (Object(_utils_WizInterface__WEBPACK_IMPORTED_MODULE_3__["WizConfirm"])("确定要删除该日程源文档？\n「确定」将会导致相关笔记被删除！", '番茄助理')) {
            let newEvent = new _models_CalendarEvent__WEBPACK_IMPORTED_MODULE_2__["default"](event);
            newEvent.deleteEventData(true);
        }
    }

    onEditOriginBtnClick(event) {
        const doc = _utils_WizInterface__WEBPACK_IMPORTED_MODULE_3__["WizDatabase"].DocumentFromGUID(event.id);
        _utils_WizInterface__WEBPACK_IMPORTED_MODULE_3__["WizCommonUI"].EditCalendarEvent(doc);
    }

    onOpenDocBtnClick(event) {
        const doc = _utils_WizInterface__WEBPACK_IMPORTED_MODULE_3__["WizDatabase"].DocumentFromGUID(event.id);
        _utils_WizInterface__WEBPACK_IMPORTED_MODULE_3__["WizExplorerWindow"].ViewDocument(doc, true);
    }

}

/***/ }),

/***/ "./src/models/WizEventDataLoader.js":
/*!******************************************!*\
  !*** ./src/models/WizEventDataLoader.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WizEventDataLoader; });
/* harmony import */ var _utils_WizInterface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/WizInterface */ "./src/utils/WizInterface.js");
/* harmony import */ var _CalendarEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CalendarEvent */ "./src/models/CalendarEvent.js");



/* 数据获取
----------------------------------------------------------------------------------------------------------------------*/

/** 该类与Wiznote的WizDatabase接口交换信息，获取数据 */
class WizEventDataLoader {
	/**
     * 创造一个事件数据加载器.
  * @param {string} start 查询起始日期，ISO标准日期字符串.
  * @param {string} end 查询截至日期，ISO标准日期字符串.
     */
	constructor(calendar) {
		if (!_utils_WizInterface__WEBPACK_IMPORTED_MODULE_0__["WizDatabase"]) throw new Error('WizDatabase not valid !');
		this.Database = _utils_WizInterface__WEBPACK_IMPORTED_MODULE_0__["WizDatabase"];
		this.userName = _utils_WizInterface__WEBPACK_IMPORTED_MODULE_0__["WizDatabase"].UserName;
		this.$calendar = $(calendar);
	}

	/**
     * 获得渲染后的所有FullCalendar事件.
  * @param {object} view is the View Object of FullCalendar for the new view.
  * @param {object} element is a jQuery element for the container of the new view.
     * @return {Object[]} 返回用于FullCalendar 渲染的 eventSources 数组.
     */
	getEventSources(view, element) {
		const viewStart = view.start.format('YYYY-MM-DD HH:mm:ss');
		const viewEnd = view.end.format('YYYY-MM-DD HH:mm:ss');
		let eventSources = [];
		//获取普通日程
		const generalEventSource = {
			type: 'generalEvents',
			//events: this._getAllOriginalEvent([], this._d2s(currentView.start.toDate()), this._d2s(currentView.end.toDate()))
			events: this._getAllOriginalEvent(viewStart, viewEnd)
		};
		eventSources.push(generalEventSource);

		//TODO: 获取重复日程
		const repeatEventSources = this._getAllRepeatEvent(viewStart, viewEnd);
		eventSources = eventSources.concat(repeatEventSources);
		//
		return eventSources;
	}

	/**
     * 从WizDatabase中获取所有数据文档.
  * @param {array} events 初始事件数组.
  * @param {string} start ISO标准日期字符串.
  * @param {string} end ISO标准日期字符串.
     * @return {Object[]} 返回用于FullCalendar渲染的事件数组.
     */
	_getAllOriginalEvent(start, end) {
		const events = [];
		let sql = `DOCUMENT_LOCATION not like '/Deleted Items/%' and (KB_GUID is null or KB_GUID = '')`;
		let and1 = ` and DOCUMENT_GUID in (select DOCUMENT_GUID from WIZ_DOCUMENT_PARAM where PARAM_NAME = 'CALENDAR_START'  and  PARAM_VALUE <= '${end}' )`;
		let and2 = ` and DOCUMENT_GUID in (select DOCUMENT_GUID from WIZ_DOCUMENT_PARAM where PARAM_NAME = 'CALENDAR_END'  and  PARAM_VALUE >= '${start}' )`;
		if (start) sql += and2;
		if (end) sql += and1;
		if (_utils_WizInterface__WEBPACK_IMPORTED_MODULE_0__["WizDatabase"].DocumentsDataFromSQL) {
			try {
				const data = _utils_WizInterface__WEBPACK_IMPORTED_MODULE_0__["WizDatabase"].DocumentsDataFromSQL(sql);
				if (!data) return false;
				const obj = JSON.parse(data);
				if (!obj || !Array.isArray(obj)) return false;
				for (let i = 0; i < obj.length; i++) {
					events.push(new _CalendarEvent__WEBPACK_IMPORTED_MODULE_1__["default"](obj[i], this.$calendar).toFullCalendarEvent());
				}

				return events;
			} catch (err) {
				console.error(err);
				return false;
			}
		} else {
			throw new Error('DocumentsDataFromSQL method of WizDatabase not exist!');
			/*
   let docColletion = objDatabase.DocumentsFromSQL(sql);
   //
   if (docColletion && docColletion.Count){
   	let doc;
   	for (let i = 0; i < docColletion.Count; ++ i){
   		doc = docColletion.Item(i);
   		let eventObj = _eventObject(_newPseudoDoc(doc));
   		if (eventObj)
   			events.push(eventObj);
   	}
   	return events;
   }
   */
		}
	}

	/**
     * 从WizDatabase中获取所有循环重复事件.
  * 从创建事件的日期开始到ENDRECURRENCE结束
     * @return {Object[]} 返回用于FullCalendar渲染的 eventSource 数组.
     */
	_getAllRepeatEvent(start, end) {
		const repeatEvents = [];
		const sql = "DOCUMENT_LOCATION not like '/Deleted Items/%' and (KB_GUID is null or KB_GUID = '') and " + "DOCUMENT_GUID in (select DOCUMENT_GUID from WIZ_DOCUMENT_PARAM where PARAM_NAME='CALENDAR_RECURRENCE')";

		const data = _utils_WizInterface__WEBPACK_IMPORTED_MODULE_0__["WizDatabase"].DocumentsDataFromSQL(sql);
		console.log(data);
		if (!data) return false;

		const obj = JSON.parse(data);
		if (!obj || !Array.isArray(obj)) return false;

		for (let i = 0; i < obj.length; i++) {
			repeatEvents.push(new _CalendarEvent__WEBPACK_IMPORTED_MODULE_1__["default"](obj[i], this.$calendar).generateRepeatEvents(start, end));
		}
		return repeatEvents;
	}

	// 日历事件拖动后更新数据
	updateEventDataOnDrop(event, delta, revertFunc, jsEvent, ui, view) {
		// Call hasTime on the event’s start/end to see if it has been dropped in a timed or all-day area.
		const allDay = !event.start.hasTime();
		// 获取事件文档时间数据
		const doc = _utils_WizInterface__WEBPACK_IMPORTED_MODULE_0__["WizDatabase"].DocumentFromGUID(event.id);
		// 更新数据
		if (allDay) {
			const startStr = event.start.set({ 'h': 0, 'm': 0, 's': 0 }).format('YYYY-MM-DD HH:mm:ss');
			const endStr = event.end.set({ 'h': 23, 'm': 59, 's': 59 }).format('YYYY-MM-DD HH:mm:ss');
			this._setParamValue(doc, "CALENDAR_START", startStr);
			this._setParamValue(doc, "CALENDAR_END", endStr);
		} else {
			const startStr = event.start.format('YYYY-MM-DD HH:mm:ss');
			const endStr = event.end.format('YYYY-MM-DD HH:mm:ss');
			this._setParamValue(doc, "CALENDAR_START", startStr);
			this._setParamValue(doc, "CALENDAR_END", endStr);
		}
		//TODO: 更新CALENDAR_RECURRENCE数据
		// 
		this._updateDocModifyDate(doc);
	}

	// 设置文档属性值
	_setParamValue(doc, key, value) {
		if (!doc) return false;
		doc.SetParamValue(key, value);
	}

	// 更新WizDoc修改时间
	_updateDocModifyDate(doc) {
		const now = new Date();
		if (!doc) return false;
		now.setSeconds((now.getSeconds() + 1) % 60);
		doc.DateModified = this._d2s(now);
	}

	// 将日期对象转化为字符串
	//TODO: 考虑依赖moment来简化转换过程
	_d2s(dt) {
		const ret = dt.getFullYear() + "-" + formatIntToDateString(dt.getMonth() + 1) + "-" + formatIntToDateString(dt.getDate()) + " " + formatIntToDateString(dt.getHours()) + ":" + formatIntToDateString(dt.getMinutes()) + ":" + formatIntToDateString(dt.getSeconds());
		return ret;
	}

	// 日历时间重置时间范围后更新数据
	updateEventDataOnResize(event, delta, revertFunc, jsEvent, ui, view) {
		const allDay = event.start.hasTime() ? false : true;
		// 获得事件文档时间数据
		const doc = _utils_WizInterface__WEBPACK_IMPORTED_MODULE_0__["WizDatabase"].DocumentFromGUID(event.id);
		// 计算更改后的结束时间
		const eventEndStr = event.end.format('YYYY-MM-DD HH:mm:ss');
		// 更新文档数据
		this._setParamValue(doc, "CALENDAR_END", eventEndStr);
		this._updateDocModifyDate(doc);
	}

	// 创建事件 start, end, jsEvent, view
	/**
     * 创建事件.
  * @param {Object} selectionData FullCalendar 传入的数据.
  * @param {Object} selectionData.start Moment 类日期对象.
  * @param {Object} selectionData.end Moment 类日期对象.
  * @param {Object} selectionData.jsEvent native JavaScript 事件.
  * @param {Object} selectionData.view FullCalendar 视图对象.
  * @param {Object} userInputs 用户传入的其他信息.
     * TODO: 该方法可以放置到CalendarEvent的静态方法上
     */
	createEvent(selectionData, userInputs) {
		try {
			// 获取用户设置
			const newEvent = new _CalendarEvent__WEBPACK_IMPORTED_MODULE_1__["default"]({
				title: userInputs.title ? userInputs.title : '无标题',
				start: selectionData.start,
				end: selectionData.end,
				allDay: selectionData.start.hasTime() && selectionData.end.hasTime() ? false : true,
				backgroundColor: userInputs.color ? userInputs.color : '#32CD32'
			}, this.$calendar);
			// 保存并渲染事件
			newEvent.saveToWizEventDoc();
			newEvent.refetchData();
			newEvent.addToFullCalendar();
		} catch (e) {
			console.log(e);
		}
	}

}

// TODO: 重写获取数据的方式
function _getWizEvent(start, end) {
	//TODO:
	let events = [];
	let EventCollection = _utils_WizInterface__WEBPACK_IMPORTED_MODULE_0__["WizDatabase"].GetCalendarEvents2(start, end);
	return events;
}

// 获得渲染后的重复日期
function getRenderRepeatDay() {
	var dayArray = new Array();
	var eventStart = new Date(_s2d(g_eventStart));

	switch (g_repeatRule) {
		case "EveryWeek1":
		case "EveryWeek2":
		case "EveryWeek3":
		case "EveryWeek4":
		case "EveryWeek5":
		case "EveryWeek6":
		case "EveryWeek7":
			getWeeklyRepeatDay(dayArray, [g_repeatRule.charAt(9)]);
			break;
		case "EveryWeekday":
			getWeeklyRepeatDay(dayArray, [1, 2, 3, 4, 5]);
			break;
		case "EveryWeekday135":
			getWeeklyRepeatDay(dayArray, [1, 3, 5]);
			break;
		case "EveryWeekday24":
			getWeeklyRepeatDay(dayArray, [2, 4]);
			break;
		case "EveryWeekday67":
			getWeeklyRepeatDay(dayArray, [6, 7]);
			break;
		case "Daily":
			getWeeklyRepeatDay(dayArray, [1, 2, 3, 4, 5, 6, 7]);
			break;
		case "Weekly":
			// 每周
			getWeeklyRepeatDay(dayArray, [eventStart.getDay()]);
			break;
		case "Every2Weeks":
			getWeeklyRepeatDay(dayArray, [eventStart.getDay()]);
			for (var i = 0; i < dayArray.length; ++i) {
				var inter = _interDays(_d2s(eventStart), _d2s(dayArray[i][0]));
				if (parseFloat((inter - 1) / 7.0) % 2 != 0) {
					dayArray.splice(i, 1);
					i--;
				}
			}
			break;
		case "Monthly":
			getMonthlyRepeatDay(dayArray);
			break;
		case "Yearly":
			getYearlyRepeatDay(dayArray);
			break;
		// TODO: 汉字需要考虑
		case "ChineseMonthly":
			getChineseRepeatDay(dayArray, '月');
			break;
		case "ChineseYearly":
			getChineseRepeatDay(dayArray, '历');
			break;
		default:
			{
				if (g_repeatRule.indexOf("EveryWeek") == 0) {
					var days = g_repeatRule.substr("EveryWeek".length).split('');
					getWeeklyRepeatDay(dayArray, days);
				}
			}
	}

	return dayArray;
}

/* 数据获取
----------------------------------------------------------------------------------------------------------------------*/

/* 杂项和工具
----------------------------------------------------------------------------------------------------------------------*/

// 判断内核
function isChrome() {
	if (g_isChrome) return g_isChrome;
	//
	var ua = navigator.userAgent.toLowerCase();
	g_isChrome = ua.indexOf('chrome') != -1;
	//
	return g_isChrome;
}

// 将整数转换成日期字符串
function formatIntToDateString(n) {

	return n < 10 ? '0' + n : n;
}

// 检查及增加数值字符串长度，例如：'2' -> '02'
function checkAndAddStrLength(str) {
	if (str.length < 2) {
		return '0' + str;
	} else {
		return str;
	}
}

// 将字符串转化为日期对象
function _s2d(str) {
	if (!str) return '';
	var date = new Date(str.substr(0, 4), str.substr(5, 2) - 1, str.substr(8, 3), str.substr(11, 2), str.substr(14, 2), str.substr(17, 2));
	return date;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/utils/Config.js":
/*!*****************************!*\
  !*** ./src/utils/Config.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
    colorCount: 12,
    colorItems: [{ "colorValue": "#32CD32", "colorName": '橄榄绿' }, { "colorValue": "#5484ED", "colorName": '宝石蓝' }, { "colorValue": "#A4BDFE", "colorName": '蓝色' }, { "colorValue": "#46D6DB", "colorName": '青绿色' }, { "colorValue": "#7AE7BF", "colorName": '绿色' }, { "colorValue": "#51B749", "colorName": '清新绿' }, { "colorValue": "#FBD75B", "colorName": '黄色' }, { "colorValue": "#FFB878", "colorName": '橘色' }, { "colorValue": "#FF887C", "colorName": '红色' }, { "colorValue": "#DC2127", "colorName": '奢华红' }, { "colorValue": "#DBADFF", "colorName": '紫色' }, { "colorValue": "#E1E1E1", "colorName": '灰色' }]

});

/***/ }),

/***/ "./src/utils/WizInterface.js":
/*!***********************************!*\
  !*** ./src/utils/WizInterface.js ***!
  \***********************************/
/*! exports provided: WizExplorerApp, WizExplorerWindow, WizDatabase, WizCommonUI, WizConfirm, WizAlert, WizBubbleMessage, WizShell */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WizExplorerApp", function() { return WizExplorerApp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WizExplorerWindow", function() { return WizExplorerWindow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WizDatabase", function() { return WizDatabase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WizCommonUI", function() { return WizCommonUI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WizConfirm", function() { return WizConfirm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WizAlert", function() { return WizAlert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WizBubbleMessage", function() { return WizBubbleMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WizShell", function() { return WizShell; });
//TODO: 判断window.external是否为WizHtmlEditorApp
const WizExplorerApp = window.external;
const WizExplorerWindow = WizExplorerApp.Window;
const WizDatabase = WizExplorerApp.Database;
const WizCommonUI = WizExplorerApp.CreateWizObject("WizKMControls.WizCommonUI");

function WizConfirm(msg, title) {
    return WizExplorerWindow.ShowMessage(msg, title, 0x00000020 | 0x00000001) == 1;
}

function WizAlert(msg) {
    WizExplorerWindow.ShowMessage(msg, "{p}", 0x00000040);
}

function WizBubbleMessage(title, msg, color = '#FFFA9D', delay = '3') {
    const appPath = WizCommonUI.GetSpecialFolder("AppPath");
    //
    const wizShellFileName = appPath + "Wiz.exe";
    const dllFileName = appPath + "WizTools.dll";
    //
    const params = `"${dllFileName}" WizToolsShowBubbleWindow2Ex /Title=${title} /LinkText=${msg} /LinkURL=@ /Color=${color} /Delay=${delay}`;
    //
    WizCommonUI.RunExe(wizShellFileName, params, false);
}

class WizShell {

    constructor(dllFileName, dllExportFunc, params) {
        //使用dll导出函数，大部分入参时命令行方式，具体参数没有说明，有需要联系开发人员
        const appPath = WizCommonUI.GetSpecialFolder("AppPath");
        this.appPath = appPath;
        this.wizExe = appPath + "Wiz.exe";
        this.dllFileName = dllFileName ? appPath + dllFileName : appPath + 'WizKMControls.dll';
        this.dllExportFunc = dllExportFunc || 'WizKMRunScript';
        this.params = params;
    }

    runScriptFile(scriptFileName, scriptParams) {
        const params = `"${this.appPath + 'WizKMControls.dll'}" WizKMRunScript /ScriptFileName=${scriptFileName} ${scriptParams}`;
        WizCommonUI.RunExe(this.wizExe, params, false);
    }

    wizBubbleMessage(title, msg, color = '#FFFA9D', delay = '3') {
        WizBubbleMessage(title, msg, color, delay);
    }

    static getWizInterface() {
        return {
            WizExplorerApp, WizExplorerWindow, WizDatabase, WizCommonUI
        };
    }
}



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQ2FsZW5kYXIvQ2FsZW5kYXIuY3NzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0V2ZW50UG9wb3Zlci9FdmVudFBvcG92ZXIuY3NzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0V2ZW50UG9wb3Zlci9Qb3BvdmVyVGl0bGVJbnB1dC5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZSBzeW5jIF5cXC5cXC8uKiQiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9DYWxlbmRhci9DYWxlbmRhci5jc3M/Y2ExNCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9DYWxlbmRhci9DYWxlbmRhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9DYWxlbmRhci9GdWxsQ2FsZW5kYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRXZlbnRQb3BvdmVyL0V2ZW50UG9wb3Zlci5jc3M/NTg1ZiIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9FdmVudFBvcG92ZXIvRXZlbnRQb3BvdmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0V2ZW50UG9wb3Zlci9Qb3BvdmVyU2ltcGxlRm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9FdmVudFBvcG92ZXIvUG9wb3ZlclRpdGxlSW5wdXQuY3NzPzNlMzYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRXZlbnRQb3BvdmVyL1BvcG92ZXJUaXRsZUlucHV0LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0V2ZW50UG9wb3Zlci9Qb3BvdmVyVG9vbGJhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Gb3JtL0NvbG9yUGlja2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0Zvcm0vRGF0ZVRpbWVQaWNrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmNzcz9kOGMzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWxzL0NhbGVuZGFyRXZlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVscy9FdmVudEhhbmRsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVscy9XaXpFdmVudERhdGFMb2FkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL0NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvV2l6SW50ZXJmYWNlLmpzIl0sIm5hbWVzIjpbIkFwcCIsIlJlYWN0IiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsInN0YXRlIiwiY2xpY2tlZEV2ZW50IiwiaGFuZGxlRXZlbnRDbGljayIsImJpbmQiLCJldmVudCIsImpzRXZlbnQiLCJ2aWV3Iiwic2V0U3RhdGUiLCJjbGlja2VkRXZlbnRBcmdzIiwicmVuZGVyIiwidGFyZ2V0IiwiQ2FsZW5kYXIiLCJldmVudHMiLCJkYXRhTG9hZGVyIiwiY2FsZW5kYXIiLCJvbkNhbGVuZGFyUmVuZGVyIiwib25WaWV3UmVuZGVyIiwib25FdmVudFJlbmRlciIsImVsIiwiZWxlbWVudCIsIiRjYWxlbmRhciIsIiQiLCJldmVudFNvdXJjZXMiLCJnZXRFdmVudFNvdXJjZXMiLCJmdWxsQ2FsZW5kYXIiLCJpIiwibGVuZ3RoIiwiZXZlbnRPYmoiLCIkZWwiLCJpc0NvbXBsZXRlIiwicGFyc2VJbnQiLCJjb21wbGV0ZSIsImFkZENsYXNzIiwiY29tcG9uZW50RGlkTW91bnQiLCJsZWZ0IiwiY2VudGVyIiwicmlnaHQiLCJ0b2RheSIsIm1vbnRoIiwid2VlayIsImRheSIsImxpc3QiLCJhZ2VuZGEiLCJtaW5UaW1lIiwic2xvdExhYmVsRm9ybWF0Iiwib25FdmVudENsaWNrIiwiRnVsbGNhbGVuZGFyT2JqZWN0TWFwcGVyIiwiZ2V0U2V0dGluZ3MiLCJwcm9wZXJ0aWVzIiwibmV3U2V0dGluZ3MiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsIkZ1bGxDYWxlbmRhciIsImpxIiwibm9Db25mbGljdCIsImZ1bGxjYWxlbmRhck9iamVjdE1hcHBlciIsInJvb3QiLCJpbnN0YW5jZSIsImRhdGUiLCJEYXRlIiwib2JqZWN0TWFwcGVyU2V0dGluZ3MiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwiaWQiLCJnZXRUaW1lIiwiY2FsZW5kYXJSZWYiLCJFdmVudFBvcG92ZXIiLCJwb3BwZXJOb2RlIiwicG9wcGVySW5zdGFuY2UiLCJldmVudEhhbmRsZXMiLCJuZXdFdmVudERhdGEiLCJhdXRvSGlkZSIsImhhbmRsZVRpdGxlQ2hhbmdlIiwiaGFuZGxlU2F2ZUJ0bkNsaWNrIiwiaGFuZGxlQ29tcGxldGVCdG5DbGljayIsImhhbmRsZU9wZW5Eb2NCdG5DbGljayIsImhhbmRsZURlbGV0ZURhdGFCdG5DbGljayIsImhhbmRsZURlbGV0ZURvY0J0bkNsaWNrIiwiZSIsInJlZmVyZW5jZSIsImlzIiwiaGFzIiwiaGlkZSIsInRoYXQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInNob3ciLCJmYWRlSW4iLCJuZXdUaXRsZSIsInZhbHVlIiwicHJldlN0YXRlIiwiT2JqZWN0IiwiY3JlYXRlIiwidGl0bGUiLCJ0aGVuIiwicmV0Iiwib25TYXZlQnRuQ2xpY2siLCJvbkNvbXBsZXRlQnRuQ2xpY2siLCJvbk9wZW5Eb2NCdG5DbGljayIsIm9uRGVsZXRlRGF0YUJ0bkNsaWNrIiwib25EZWxldGVEb2NCdG5DbGljayIsInBsYWNlbWVudCIsIm1vZGlmaWVycyIsImFycm93IiwiZG9jdW1lbnQiLCJvZmYiLCJvbiIsImNvbXBvbmVudERpZFVwZGF0ZSIsInByZXZQcm9wcyIsInNuYXBzaG90Iiwic2hvdWxkQ29tcG9uZW50VXBkYXRlIiwibmV4dFN0YXRlIiwidXBkYXRlIiwiZGlzcGxheSIsImRpdiIsInN0YXJ0IiwiYmFja2dyb3VuZENvbG9yIiwiRXZlbnRTaW1wbGVGb3JtIiwiaGFuZGxlSW5wdXRDaGFuZ2UiLCJldmVudFN0YXJ0IiwiZm9ybWF0IiwiY29sb3JWYWx1ZSIsIkV2ZW50VGl0bGVJbnB1dCIsImV2ZW50VGl0bGUiLCJoYW5kbGVDaGFuZ2UiLCJnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMiLCJvblRpdGxlQ2hhbmdlIiwidGFyZ2V0Rm9ybSIsIlBvcG92ZXJUb29sYmFyIiwiZW5hYmxlU2F2ZUJ0biIsIkh1ZWJlZSIsInJlcXVpcmUiLCJwcm90b3R5cGUiLCJzZXRUZXh0cyIsInNldFRleHRFbGVtcyIsImVsZW0iLCJwcm9wZXJ0eSIsIm5vZGVOYW1lIiwiY29sb3IiLCJkaXNwYXRjaEV2ZW50IiwiRXZlbnQiLCJDb2xvclBpY2tlciIsImlucHV0IiwiUmVhY3RET00iLCJmaW5kRE9NTm9kZSIsImlucHV0Rm9ybUNvbnRyb2wiLCJodWViZWVJbnN0YW5jZSIsInN0YXRpY09wZW4iLCJzZXRUZXh0Iiwic2V0QkdDb2xvciIsImh1ZXMiLCJodWUwIiwic2hhZGVzIiwic2F0dXJhdGlvbnMiLCJub3RhdGlvbiIsImNsYXNzTmFtZSIsImN1c3RvbUNvbG9ycyIsImxhYmVsIiwicmVhZE9ubHkiLCJvbklucHV0Q2hhbmdlIiwiRGF0ZVRpbWVQaWNrZXIiLCJkYXRldGltZXBpY2tlciIsImdldEVsZW1lbnRCeUlkIiwiQ2FsZW5kYXJFdmVudCIsImRhdGEiLCJFcnJvciIsInR5cGUiLCJfY2hlY2tEYXRhVHlwZSIsIl9jcmVhdGUiLCJkb2MiLCJnX2RiIiwiRG9jdW1lbnRGcm9tR1VJRCIsIkdldFBhcmFtVmFsdWUiLCJtb21lbnQiLCJEYXRlQ3JlYXRlZCIsIkdVSUQiLCJUaXRsZSIsIkRhdGVNb2RpZmllZCIsImNvbnNvbGUiLCJlcnJvciIsImVuZCIsImJrQ29sb3IiLCJhbGxEYXkiLCJkYXRlQ29tcGxldGVkIiwicnB0UnVsZSIsInJwdEVuZCIsIl9JbmZvIiwiX3BhcnNlSW5mbyIsIkNBTEVOREFSX0lORk8iLCJfRXh0cmFJbmZvIiwiQ0FMRU5EQVJfRVhUUkFJTkZPIiwiX2dldERlZmF1bHRFeHRyYUluZm8iLCJndWlkIiwiQ0FMRU5EQVJfU1RBUlQiLCJDQUxFTkRBUl9FTkQiLCJjaSIsImIiLCJDb25maWciLCJjb2xvckl0ZW1zIiwiaW5kZXhPZiIsIkNvbXBsZXRlIiwiRGF0ZUNvbXBsZXRlZCIsIkNBTEVOREFSX1JFQ1VSUkVOQ0UiLCJDQUxFTkRBUl9FTkRSRUNVUlJFTkNFIiwiaGFzVGltZSIsImNyZWF0ZWQiLCJ1cGRhdGVkIiwidGV4dENvbG9yIiwiX3VwZGF0ZSIsIm9iakNsYXNzIiwiR1VJRF9SZWdFeHIiLCJTdHJpbmciLCJ0ZXN0IiwiSW5mb1N0cmluZyIsIkluZm9PYmplY3QiLCJJbmZvQXJyYXkiLCJzcGxpdCIsImZvckVhY2giLCJpdGVtIiwiaW5kZXgiLCJhcnIiLCJwYWlyIiwiX3N0cmluZ2lmeUluZm8iLCJJbmZvT2JqZWN0S2V5c0FycmF5Iiwia2V5cyIsInNpbmdsZUluZm8iLCJwdXNoIiwiam9pbiIsInJlcGxhY2UiLCJfdXBkYXRlSW5mbyIsIl91cGRhdGVFeHRyYUluZm8iLCJFeHRyYUluZm9PYmplY3QiLCJfZ2V0RXZlbnRIdG1sIiwiY29udGVudCIsImh0bWxUZXh0IiwiZ2VuZXJhdGVSZXBlYXRFdmVudHMiLCJldmVudFNvdXJjZSIsImRheUFycmF5IiwiX2dldFJlbmRlclJlcGVhdERheSIsIm5ld0V2ZW50IiwidG9GdWxsQ2FsZW5kYXJFdmVudCIsImFkZCIsImRpZmYiLCJyZWdleCIsImNvdW50IiwiY3VyV2Vla0RheSIsInJlc3VsdHMiLCJleGVjIiwiaW50ZXJXZWVrIiwibnVtYmVyIiwiX2dldFdlZWtseVJlcGVhdERheSIsInBlclJ1bGUiLCJfZ2V0UGVyUmVwZWF0RGF5cyIsImludGVyV2Vla3MiLCJ2aWV3U3RhcnQiLCJ2aWV3RW5kIiwiaW50ZXJ2YWxXZWVrcyIsIndlZWtkYXlzIiwibmV3RXZlbnRTdGFydERhdGUiLCJzZXQiLCJnZXQiLCJpc1NhbWUiLCJpc0JlZm9yZSIsInBlclJ1bGVNYXAiLCJzcGxpY2UiLCJmaW5kSW5kZXgiLCJ0b1dpekV2ZW50RGF0YSIsImFkZFRvRnVsbENhbGVuZGFyIiwiX3NhdmVBbGxQcm9wIiwic3RhcnRTdHIiLCJlbmRTdHIiLCJfc2V0UGFyYW1WYWx1ZSIsIlNldFBhcmFtVmFsdWUiLCJfY3JlYXRlV2l6RXZlbnREb2MiLCJsb2NhdGlvbiIsIm9iakZvbGRlciIsIkdldEZvbGRlckJ5TG9jYXRpb24iLCJ0ZW1wSHRtbCIsImdfY21uIiwiR2V0QVRlbXBGaWxlTmFtZSIsIlNhdmVUZXh0VG9GaWxlIiwiQ3JlYXRlRG9jdW1lbnQyIiwiQ2hhbmdlVGl0bGVBbmRGaWxlTmFtZSIsIlVwZGF0ZURvY3VtZW50NiIsIkFkZFRvQ2FsZW5kYXIiLCJzYXZlVG9XaXpFdmVudERvYyIsInByb3AiLCJndWlkUmVnZXgiLCJpc1dpekRvY0V4aXN0IiwiZGVsZXRlRXZlbnREYXRhIiwiaXNEZWxldGVEb2MiLCJSZW1vdmVGcm9tQ2FsZW5kYXIiLCJEZWxldGUiLCJyZWZldGNoRGF0YSIsInJlZnJlc2hFdmVudCIsIkZvcm1IYW5kbGVzIiwib25DcmVhdGVCdG5DbGljayIsImZvcm1Ob2RlIiwiZmluZCIsInZhbCIsImNyZWF0ZUV2ZW50IiwibW9kYWwiLCJXaXpDb25maXJtIiwib25FZGl0T3JpZ2luQnRuQ2xpY2siLCJvYmpEYXRhYmFzZSIsIm9iakNvbW1vbiIsIkVkaXRDYWxlbmRhckV2ZW50Iiwib2JqV2luZG93IiwiVmlld0RvY3VtZW50IiwiV2l6RXZlbnREYXRhTG9hZGVyIiwiRGF0YWJhc2UiLCJ1c2VyTmFtZSIsIlVzZXJOYW1lIiwiZ2VuZXJhbEV2ZW50U291cmNlIiwiX2dldEFsbE9yaWdpbmFsRXZlbnQiLCJyZXBlYXRFdmVudFNvdXJjZXMiLCJfZ2V0QWxsUmVwZWF0RXZlbnQiLCJjb25jYXQiLCJzcWwiLCJhbmQxIiwiYW5kMiIsIkRvY3VtZW50c0RhdGFGcm9tU1FMIiwib2JqIiwiSlNPTiIsInBhcnNlIiwiQXJyYXkiLCJpc0FycmF5IiwiZXJyIiwicmVwZWF0RXZlbnRzIiwibG9nIiwidXBkYXRlRXZlbnREYXRhT25Ecm9wIiwiZGVsdGEiLCJyZXZlcnRGdW5jIiwidWkiLCJfdXBkYXRlRG9jTW9kaWZ5RGF0ZSIsIm5vdyIsInNldFNlY29uZHMiLCJnZXRTZWNvbmRzIiwiX2QycyIsImR0IiwiZ2V0RnVsbFllYXIiLCJmb3JtYXRJbnRUb0RhdGVTdHJpbmciLCJnZXRNb250aCIsImdldERhdGUiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJ1cGRhdGVFdmVudERhdGFPblJlc2l6ZSIsImV2ZW50RW5kU3RyIiwic2VsZWN0aW9uRGF0YSIsInVzZXJJbnB1dHMiLCJfZ2V0V2l6RXZlbnQiLCJFdmVudENvbGxlY3Rpb24iLCJHZXRDYWxlbmRhckV2ZW50czIiLCJnZXRSZW5kZXJSZXBlYXREYXkiLCJfczJkIiwiZ19ldmVudFN0YXJ0IiwiZ19yZXBlYXRSdWxlIiwiZ2V0V2Vla2x5UmVwZWF0RGF5IiwiY2hhckF0IiwiZ2V0RGF5IiwiaW50ZXIiLCJfaW50ZXJEYXlzIiwicGFyc2VGbG9hdCIsImdldE1vbnRobHlSZXBlYXREYXkiLCJnZXRZZWFybHlSZXBlYXREYXkiLCJnZXRDaGluZXNlUmVwZWF0RGF5IiwiZGF5cyIsInN1YnN0ciIsImlzQ2hyb21lIiwiZ19pc0Nocm9tZSIsInVhIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwidG9Mb3dlckNhc2UiLCJuIiwiY2hlY2tBbmRBZGRTdHJMZW5ndGgiLCJzdHIiLCJjb2xvckNvdW50IiwiV2l6RXhwbG9yZXJBcHAiLCJ3aW5kb3ciLCJleHRlcm5hbCIsIldpekV4cGxvcmVyV2luZG93IiwiV2luZG93IiwiV2l6RGF0YWJhc2UiLCJXaXpDb21tb25VSSIsIkNyZWF0ZVdpek9iamVjdCIsIm1zZyIsIlNob3dNZXNzYWdlIiwiV2l6QWxlcnQiLCJXaXpCdWJibGVNZXNzYWdlIiwiZGVsYXkiLCJhcHBQYXRoIiwiR2V0U3BlY2lhbEZvbGRlciIsIndpelNoZWxsRmlsZU5hbWUiLCJkbGxGaWxlTmFtZSIsInBhcmFtcyIsIlJ1bkV4ZSIsIldpelNoZWxsIiwiZGxsRXhwb3J0RnVuYyIsIndpekV4ZSIsInJ1blNjcmlwdEZpbGUiLCJzY3JpcHRGaWxlTmFtZSIsInNjcmlwdFBhcmFtcyIsIndpekJ1YmJsZU1lc3NhZ2UiLCJnZXRXaXpJbnRlcmZhY2UiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFRLG9CQUFvQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUFpQiw0QkFBNEI7QUFDN0M7QUFDQTtBQUNBLDBCQUFrQiwyQkFBMkI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0Esc0RBQThDO0FBQzlDO0FBQ0E7QUFDQSxvQ0FBNEI7QUFDNUIscUNBQTZCO0FBQzdCLHlDQUFpQzs7QUFFakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUE2QjtBQUM3QixxQ0FBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQXFCLGdCQUFnQjtBQUNyQztBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLDZCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxhQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwQkFBa0IsOEJBQThCO0FBQ2hEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUFvQiwyQkFBMkI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkJB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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SDs7QUFFREssa0JBQWNDLGNBQWQsRUFBOEJDLFlBQTlCLEVBQTRDO0FBQ3hDLGNBQU1QLFNBQVUsSUFBRyxLQUFLSixPQUFMLEdBQWUsbUJBQW9CLG9DQUFtQ1UsY0FBZSxJQUFHQyxZQUFhLEVBQXhIO0FBQ0FsQixvQkFBWVksTUFBWixDQUFtQixLQUFLRyxNQUF4QixFQUFnQ0osTUFBaEMsRUFBd0MsS0FBeEM7QUFDSDs7QUFFRFEscUJBQWlCdFQsS0FBakIsRUFBd0JxUyxHQUF4QixFQUE2QnhQLFFBQVEsU0FBckMsRUFBZ0Q0UCxRQUFRLEdBQXhELEVBQTZEO0FBQ3pERCx5QkFBaUJ4UyxLQUFqQixFQUF3QnFTLEdBQXhCLEVBQTZCeFAsS0FBN0IsRUFBb0M0UCxLQUFwQztBQUNIOztBQUVELFdBQU9jLGVBQVAsR0FBeUI7QUFDckIsZUFBTztBQUNIMUIsMEJBREcsRUFDYUcsaUJBRGIsRUFDZ0NFLFdBRGhDLEVBQzZDQztBQUQ3QyxTQUFQO0FBR0g7QUF6QlUiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG4gXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gd2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHRcdGlmIChwYXJlbnRIb3RVcGRhdGVDYWxsYmFjaykgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0fSA7XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XG4gXHRcdDtcbiBcdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QocmVxdWVzdFRpbWVvdXQpIHtcbiBcdFx0cmVxdWVzdFRpbWVvdXQgPSByZXF1ZXN0VGltZW91dCB8fCAxMDAwMDtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QobmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0XCIpKTtcbiBcdFx0XHR9XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIjtcbiBcdFx0XHRcdHJlcXVlc3Qub3BlbihcIkdFVFwiLCByZXF1ZXN0UGF0aCwgdHJ1ZSk7XG4gXHRcdFx0XHRyZXF1ZXN0LnRpbWVvdXQgPSByZXF1ZXN0VGltZW91dDtcbiBcdFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHJldHVybjtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xuIFx0XHRcdFx0XHQvLyB0aW1lb3V0XG4gXHRcdFx0XHRcdHJlamVjdChcbiBcdFx0XHRcdFx0XHRuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpXG4gXHRcdFx0XHRcdCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcbiBcdFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuIFx0XHRcdFx0XHRyZXNvbHZlKCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xuIFx0XHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXG4gXHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdC8vIHN1Y2Nlc3NcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcbiBcdFx0XHRcdFx0XHRyZWplY3QoZSk7XG4gXHRcdFx0XHRcdFx0cmV0dXJuO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdHJlc29sdmUodXBkYXRlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCJmMjNlNjkwYjc0YmFiNjlhYzJlM1wiOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90UmVxdWVzdFRpbWVvdXQgPSAxMDAwMDtcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xuIFx0dmFyIGhvdEN1cnJlbnRDaGlsZE1vZHVsZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50c1RlbXAgPSBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmICghbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG4gXHRcdFx0XHRcdFx0cmVxdWVzdCArXG4gXHRcdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0KTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9LFxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fTtcbiBcdFx0Zm9yICh2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcImVcIiAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJ0XCJcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKSBob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0dGhyb3cgZXJyO1xuIFx0XHRcdH0pO1xuXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcbiBcdFx0XHRcdFx0aWYgKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH07XG4gXHRcdGZuLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRcdGlmIChtb2RlICYgMSkgdmFsdWUgPSBmbih2YWx1ZSk7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udCh2YWx1ZSwgbW9kZSAmIH4xKTtcbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBkZXAgPT09IFwidW5kZWZpbmVkXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdFx0ZWxzZSBob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGRlcCA9PT0gXCJ1bmRlZmluZWRcIikgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGlmICghbCkgcmV0dXJuIGhvdFN0YXR1cztcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cbiBcdFx0fTtcbiBcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xuIFx0XHRyZXR1cm4gaG90O1xuIFx0fVxuXG4gXHR2YXIgaG90U3RhdHVzSGFuZGxlcnMgPSBbXTtcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcblxuIFx0ZnVuY3Rpb24gaG90U2V0U3RhdHVzKG5ld1N0YXR1cykge1xuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XG4gXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaG90U3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xuIFx0fVxuXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XG4gXHR2YXIgaG90Q2h1bmtzTG9hZGluZyA9IDA7XG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RBdmFpbGFibGVGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdERlZmVycmVkO1xuXG4gXHQvLyBUaGUgdXBkYXRlIGluZm9cbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcbiBcdFx0dmFyIGlzTnVtYmVyID0gK2lkICsgXCJcIiA9PT0gaWQ7XG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSkge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcImlkbGVcIikge1xuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuIFx0XHR9XG4gXHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XG4gXHRcdHJldHVybiBob3REb3dubG9hZE1hbmlmZXN0KGhvdFJlcXVlc3RUaW1lb3V0KS50aGVuKGZ1bmN0aW9uKHVwZGF0ZSkge1xuIFx0XHRcdGlmICghdXBkYXRlKSB7XG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRcdFx0cmV0dXJuIG51bGw7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90QXZhaWxhYmxlRmlsZXNNYXAgPSB1cGRhdGUuYztcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdXBkYXRlLmg7XG5cbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRob3REZWZlcnJlZCA9IHtcbiBcdFx0XHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcbiBcdFx0XHRcdFx0cmVqZWN0OiByZWplY3RcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0aG90VXBkYXRlID0ge307XG4gXHRcdFx0Zm9yKHZhciBjaHVua0lkIGluIGluc3RhbGxlZENodW5rcylcbiBcdFx0XHR7XG4gXHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWxvbmUtYmxvY2tzXG4gXHRcdFx0XHQvKmdsb2JhbHMgY2h1bmtJZCAqL1xuIFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIgJiZcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiZcbiBcdFx0XHRcdGhvdFdhaXRpbmdGaWxlcyA9PT0gMFxuIFx0XHRcdCkge1xuIFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gcHJvbWlzZTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSB8fCAhaG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0pXG4gXHRcdFx0cmV0dXJuO1xuIFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IGZhbHNlO1xuIFx0XHRmb3IgKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYgKC0taG90V2FpdGluZ0ZpbGVzID09PSAwICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDApIHtcbiBcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzKys7XG4gXHRcdFx0aG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RVcGRhdGVEb3dubG9hZGVkKCkge1xuIFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcbiBcdFx0dmFyIGRlZmVycmVkID0gaG90RGVmZXJyZWQ7XG4gXHRcdGhvdERlZmVycmVkID0gbnVsbDtcbiBcdFx0aWYgKCFkZWZlcnJlZCkgcmV0dXJuO1xuIFx0XHRpZiAoaG90QXBwbHlPblVwZGF0ZSkge1xuIFx0XHRcdC8vIFdyYXAgZGVmZXJyZWQgb2JqZWN0IGluIFByb21pc2UgdG8gbWFyayBpdCBhcyBhIHdlbGwtaGFuZGxlZCBQcm9taXNlIHRvXG4gXHRcdFx0Ly8gYXZvaWQgdHJpZ2dlcmluZyB1bmNhdWdodCBleGNlcHRpb24gd2FybmluZyBpbiBDaHJvbWUuXG4gXHRcdFx0Ly8gU2VlIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ2NTY2NlxuIFx0XHRcdFByb21pc2UucmVzb2x2ZSgpXG4gXHRcdFx0XHQudGhlbihmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIGhvdEFwcGx5KGhvdEFwcGx5T25VcGRhdGUpO1xuIFx0XHRcdFx0fSlcbiBcdFx0XHRcdC50aGVuKFxuIFx0XHRcdFx0XHRmdW5jdGlvbihyZXN1bHQpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XG4gXHRcdFx0XHRcdH0sXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnIpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHQpO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2godG9Nb2R1bGVJZChpZCkpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucykge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcInJlYWR5XCIpXG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xuIFx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuIFx0XHR2YXIgY2I7XG4gXHRcdHZhciBpO1xuIFx0XHR2YXIgajtcbiBcdFx0dmFyIG1vZHVsZTtcbiBcdFx0dmFyIG1vZHVsZUlkO1xuXG4gXHRcdGZ1bmN0aW9uIGdldEFmZmVjdGVkU3R1ZmYodXBkYXRlTW9kdWxlSWQpIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW3VwZGF0ZU1vZHVsZUlkXTtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuIFx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpLm1hcChmdW5jdGlvbihpZCkge1xuIFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0Y2hhaW46IFtpZF0sXG4gXHRcdFx0XHRcdGlkOiBpZFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWVJdGVtLmlkO1xuIFx0XHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1kZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9tYWluKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRpZiAoIXBhcmVudCkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHRcdH07XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcbiBcdFx0XHRcdFx0cXVldWUucHVzaCh7XG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRpZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuXG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcbiBcdFx0XHRcdG1vZHVsZUlkOiB1cGRhdGVNb2R1bGVJZCxcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxuIFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXG4gXHRcdFx0fTtcbiBcdFx0fVxuXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcbiBcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdHZhciBpdGVtID0gYltpXTtcbiBcdFx0XHRcdGlmIChhLmluZGV4T2YoaXRlbSkgPT09IC0xKSBhLnB1c2goaXRlbSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxuIFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xuXG4gXHRcdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUoKSB7XG4gXHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCJcbiBcdFx0XHQpO1xuIFx0XHR9O1xuXG4gXHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XG4gXHRcdFx0XHQvKiogQHR5cGUge1RPRE99ICovXG4gXHRcdFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRcdFx0aWYgKGhvdFVwZGF0ZVtpZF0pIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGVJZCk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJkaXNwb3NlZFwiLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBpZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0LyoqIEB0eXBlIHtFcnJvcnxmYWxzZX0gKi9cbiBcdFx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XG4gXHRcdFx0XHRpZiAocmVzdWx0LmNoYWluKSB7XG4gXHRcdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcbiBcdFx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0XCIgaW4gXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wYXJlbnRJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uVW5hY2NlcHRlZCkgb3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25BY2NlcHRlZCkgb3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGlzcG9zZWQpIG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGRlZmF1bHQ6XG4gXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChhYm9ydEVycm9yKSB7XG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xuIFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoYWJvcnRFcnJvcik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9BcHBseSkge1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0Lm91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdFx0XHRcdGZvciAobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0XHRcdFx0aWYgKFxuIFx0XHRcdFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHRcdFx0XHQpXG4gXHRcdFx0XHRcdFx0KSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG4gXHRcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvRGlzcG9zZSkge1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSAmJlxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHQpXG4gXHRcdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XG4gXHRcdFx0XHRcdG1vZHVsZTogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdGVycm9ySGFuZGxlcjogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHRcdH0pO1xuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG4gXHRcdE9iamVjdC5rZXlzKGhvdEF2YWlsYWJsZUZpbGVzTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gPT09IGZhbHNlKSB7XG4gXHRcdFx0XHRob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHR9KTtcblxuIFx0XHR2YXIgaWR4O1xuIFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcbiBcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdGlmICghbW9kdWxlKSBjb250aW51ZTtcblxuIFx0XHRcdHZhciBkYXRhID0ge307XG5cbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xuIFx0XHRcdFx0Y2IoZGF0YSk7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XG5cbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XG5cbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG4gXHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuIFx0XHRcdFx0aWYgKCFjaGlsZCkgY29udGludWU7XG4gXHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cbiBcdFx0dmFyIGRlcGVuZGVuY3k7XG4gXHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcbiBcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcbiBcdFx0XHRcdFx0XHRpZiAoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdCBpbiBcImFwcGx5XCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiYXBwbHlcIik7XG5cbiBcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxuIFx0XHRmb3IgKG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFwcGxpZWRVcGRhdGUsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xuIFx0XHR2YXIgZXJyb3IgPSBudWxsO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XG4gXHRcdFx0XHRcdFx0Y2IgPSBtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcbiBcdFx0XHRcdFx0XHRpZiAoY2IpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFja3MuaW5kZXhPZihjYikgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGNiID0gY2FsbGJhY2tzW2ldO1xuIFx0XHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0XHRjYihtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XG4gXHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXSxcbiBcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcbiBcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyMjtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxuIFx0XHRpZiAoZXJyb3IpIHtcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gXHRcdH1cblxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuIFx0XHRcdHJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcImluZGV4XCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFtcIi4vc3JjL2luZGV4LmpzXCIsXCJ2ZW5kb3JcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcclxcbi8qIOaXpeWOhuaVtOS9k+agt+W8j1xcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcbiNjYWxlbmRhci1jb250YWluZXIge1xcclxcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICAgIHRvcDogMDtcXHJcXG4gICAgbGVmdDogOHB4O1xcclxcbiAgICByaWdodDogOHB4O1xcclxcbiAgICBib3R0b206IDhweDtcXHJcXG59XFxyXFxuXFxyXFxuLmZjLWhlYWRlci10b29sYmFyIHtcXHJcXG4gICAgLypcXHJcXG4gICAgdGhlIGNhbGVuZGFyIHdpbGwgYmUgYnV0dGluZyB1cCBhZ2FpbnN0IHRoZSBlZGdlcyxcXHJcXG4gICAgYnV0IGxldCdzIHNjb290IGluIHRoZSBoZWFkZXIncyBidXR0b25zXFxyXFxuICAgICovXFxyXFxuICAgIHBhZGRpbmctdG9wOiAxNHB4O1xcclxcbiAgICBwYWRkaW5nLWxlZnQ6IDA7XFxyXFxuICAgIHBhZGRpbmctcmlnaHQ6IDA7XFxyXFxufVxcclxcblxcclxcbi8qIOS6i+S7tua4suafk1xcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcbi50Yy1jb21wbGV0ZSB7XFxyXFxuICAgIG9wYWNpdHk6IDAuMztcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuLnRjLWNvbXBsZXRlID4gLmZjLWNvbnRlbnQge1xcclxcbiAgICB0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaCAhaW1wb3J0YW50O1xcclxcbn1cXHJcXG5cXHJcXG4udGMtY29tcGxldGU6aG92ZXIge1xcclxcbiAgICBvcGFjaXR5OiAxO1xcclxcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi8qIFBvcG92ZXIg57uE5Lu25qC35byPXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuXFxyXFxuLyogUG9wb3ZlciDlrrnlmajlj4rlrprkvY1cXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG5cXHJcXG4udGMtcG9wb3ZlciB7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgYmFja2dyb3VuZDogI0ZGRjtcXHJcXG4gICAgY29sb3I6IGJsYWNrO1xcclxcbiAgICB3aWR0aDogYXV0bztcXHJcXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjIpO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XFxyXFxuICAgIGJveC1zaGFkb3c6IDAgMnB4IDRweCByZ2JhKDAsIDAsIDAsIC4yKTtcXHJcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXIgLmFycm93IHtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgd2lkdGg6IDIwcHg7XFxyXFxuICAgIGhlaWdodDogMTBweDtcXHJcXG4gICAgbWFyZ2luOiAwIDZweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXIgLmFycm93OjpiZWZvcmUsIC50Yy1wb3BvdmVyIC5hcnJvdzo6YWZ0ZXIge1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgICBjb250ZW50OiBcXFwiXFxcIjtcXHJcXG4gICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcXHJcXG4gICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcXHJcXG59XFxyXFxuXFxyXFxuLyogdG9wIOaUvue9ruagt+W8j1xcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwidG9wXFxcIl0ge1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInRvcFxcXCJdIC5hcnJvdyB7XFxyXFxuICAgIGJvdHRvbTogY2FsYygoMTBweCArIDFweCkgKiAtMSk7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwidG9wXFxcIl0gLmFycm93OjpiZWZvcmUsXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJ0b3BcXFwiXSAuYXJyb3c6OmFmdGVyIHtcXHJcXG4gICAgYm9yZGVyLXdpZHRoOiAxMHB4IDEwcHggMDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJ0b3BcXFwiXSAuYXJyb3c6OmJlZm9yZSB7XFxyXFxuICAgIGJvdHRvbTogMDtcXHJcXG4gICAgYm9yZGVyLXRvcC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KTtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJ0b3BcXFwiXSAuYXJyb3c6OmFmdGVyIHtcXHJcXG4gICAgYm90dG9tOiAxcHg7XFxyXFxuICAgIGJvcmRlci10b3AtY29sb3I6ICNmZmY7XFxyXFxufVxcclxcblxcclxcbi8qIHJpZ2h0IOaUvue9ruagt+W8j1xcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwicmlnaHRcXFwiXSB7XFxyXFxuICAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInJpZ2h0XFxcIl0gLmFycm93IHtcXHJcXG4gICAgbGVmdDogY2FsYygoMTBweCArIDFweCkgKiAtMSk7XFxyXFxuICAgIHdpZHRoOiAxMHB4O1xcclxcbiAgICBoZWlnaHQ6IDIwcHg7XFxyXFxuICAgIG1hcmdpbjogNnB4IDA7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwicmlnaHRcXFwiXSAuYXJyb3c6OmJlZm9yZSxcXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInJpZ2h0XFxcIl0gLmFycm93OjphZnRlciB7XFxyXFxuICAgIGJvcmRlci13aWR0aDogMTBweCAxMHB4IDEwcHggMDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJyaWdodFxcXCJdIC5hcnJvdzo6YmVmb3JlIHtcXHJcXG4gICAgbGVmdDogMDtcXHJcXG4gICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMjUpO1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInJpZ2h0XFxcIl0gLmFycm93OjphZnRlciB7XFxyXFxuICAgIGxlZnQ6IDFweDtcXHJcXG4gICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiAjZmZmO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBib3R0b20g5pS+572u5qC35byPXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJib3R0b21cXFwiXSB7XFxyXFxuICAgIG1hcmdpbi10b3A6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwiYm90dG9tXFxcIl0gLmFycm93IHtcXHJcXG4gICAgdG9wOiBjYWxjKCgxMHB4ICsgMXB4KSAqIC0xKTtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJib3R0b21cXFwiXSAuYXJyb3c6OmJlZm9yZSxcXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImJvdHRvbVxcXCJdIC5hcnJvdzo6YWZ0ZXIge1xcclxcbiAgICBib3JkZXItd2lkdGg6IDAgMTBweCAxMHB4IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwiYm90dG9tXFxcIl0gLmFycm93OjpiZWZvcmUge1xcclxcbiAgICB0b3A6IDA7XFxyXFxuICAgIGJvcmRlci1ib3R0b20tY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSk7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwiYm90dG9tXFxcIl0gLmFycm93OjphZnRlciB7XFxyXFxuICAgIHRvcDogMXB4O1xcclxcbiAgICBib3JkZXItYm90dG9tLWNvbG9yOiAjZjdmN2Y3OyAvKui/memHjOS4uuS6huS4k+mXqOmAgumFjeacieagh+mimOiDjOaZr+eahFBvcG92ZXIqL1xcclxcbn1cXHJcXG5cXHJcXG4vKiBsZWZ0IOaUvue9ruagt+W8j1xcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwibGVmdFxcXCJdIHtcXHJcXG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImxlZnRcXFwiXSAuYXJyb3cge1xcclxcbiAgICByaWdodDogY2FsYygoMTBweCArIDFweCkgKiAtMSk7XFxyXFxuICAgIHdpZHRoOiAxMHB4O1xcclxcbiAgICBoZWlnaHQ6IDIwcHg7XFxyXFxuICAgIG1hcmdpbjogNnB4IDA7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwibGVmdFxcXCJdIC5hcnJvdzo6YmVmb3JlLFxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwibGVmdFxcXCJdIC5hcnJvdzo6YWZ0ZXIge1xcclxcbiAgICBib3JkZXItd2lkdGg6IDEwcHggMCAxMHB4IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwibGVmdFxcXCJdIC5hcnJvdzo6YmVmb3JlIHtcXHJcXG4gICAgcmlnaHQ6IDA7XFxyXFxuICAgIGJvcmRlci1sZWZ0LWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMjUpO1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImxlZnRcXFwiXSAuYXJyb3c6OmFmdGVyIHtcXHJcXG4gICAgcmlnaHQ6IDFweDtcXHJcXG4gICAgYm9yZGVyLWxlZnQtY29sb3I6ICNmZmY7XFxyXFxufVxcclxcblxcclxcbi8qIENvbnRlbnQg5qCH6aKY5ZKM5YaF5a65XFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuXFxyXFxuLnRjLXBvcG92ZXItaGVhZGVyIHtcXHJcXG4gICAgcGFkZGluZzogLjVyZW0gLjc1cmVtO1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xcclxcbiAgICBmb250LXNpemU6IDFyZW07XFxyXFxuICAgIGNvbG9yOiBpbmhlcml0O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjdmN2Y3O1xcclxcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2ViZWJlYjtcXHJcXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNnB4O1xcclxcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNnB4O1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlci1ib2R5IHtcXHJcXG4gICAgcGFkZGluZzogMTBweCAxNXB4O1xcclxcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIiN0Yy1lZGl0cG9wcGVyLWV2ZW50dGl0bGUge1xcclxcbiAgICBib3JkZXItd2lkdGg6IDFweDtcXHJcXG4gICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxyXFxuICAgIHBhZGRpbmc6IDA7XFxyXFxuICAgIG1hcmdpbjogMDtcXHJcXG4gICAgZm9udC1zaXplOiAxLjJlbTtcXHJcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxufVxcclxcblxcclxcbiN0Yy1lZGl0cG9wcGVyLWV2ZW50dGl0bGU6Zm9jdXMsXFxyXFxuI3RjLWVkaXRwb3BwZXItZXZlbnR0aXRsZTpob3ZlciB7XFxyXFxuICAgIG91dGxpbmU6IG5vbmU7XFxyXFxuICAgIGJvcmRlci1ib3R0b20tY29sb3I6IGJsYWNrOyBcXHJcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJodG1sLCBib2R5IHtcXHJcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXHJcXG4gICAgZm9udC1zaXplOiAxNHB4O1xcclxcbn1cXHJcXG5cXHJcXG46Zm9jdXMge1xcclxcbiAgICBvdXRsaW5lOm5vbmU7XFxyXFxufVxcclxcblxcclxcbi8qIEZvbnRzLmNzcyAtLSDot6jlubPlj7DkuK3mloflrZfkvZPop6PlhrPmlrnmoYhcXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuLmZvbnQtaGVpIHtmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgXFxcIk5vdG8gU2Fuc1xcXCIsIFxcXCJIZWx2ZXRpY2EgTmV1ZVxcXCIsIEhlbHZldGljYSwgXFxcIk5pbWJ1cyBTYW5zIExcXFwiLCBBcmlhbCwgXFxcIkxpYmVyYXRpb24gU2Fuc1xcXCIsIFxcXCJQaW5nRmFuZyBTQ1xcXCIsIFxcXCJIaXJhZ2lubyBTYW5zIEdCXFxcIiwgXFxcIk5vdG8gU2FucyBDSksgU0NcXFwiLCBcXFwiU291cmNlIEhhbiBTYW5zIFNDXFxcIiwgXFxcIlNvdXJjZSBIYW4gU2FucyBDTlxcXCIsIFxcXCJNaWNyb3NvZnQgWWFIZWlcXFwiLCBcXFwiV2VucXVhbnlpIE1pY3JvIEhlaVxcXCIsIFxcXCJXZW5RdWFuWWkgWmVuIEhlaVxcXCIsIFxcXCJTVCBIZWl0aVxcXCIsIFNpbUhlaSwgXFxcIldlblF1YW5ZaSBaZW4gSGVpIFNoYXJwXFxcIiwgc2Fucy1zZXJpZjt9XFxyXFxuLmZvbnQta2FpIHtmb250LWZhbWlseTogQmFza2VydmlsbGUsIEdlb3JnaWEsIFxcXCJMaWJlcmF0aW9uIFNlcmlmXFxcIiwgXFxcIkthaXRpIFNDXFxcIiwgU1RLYWl0aSwgXFxcIkFSIFBMIFVLYWkgQ05cXFwiLCBcXFwiQVIgUEwgVUthaSBIS1xcXCIsIFxcXCJBUiBQTCBVS2FpIFRXXFxcIiwgXFxcIkFSIFBMIFVLYWkgVFcgTUJFXFxcIiwgXFxcIkFSIFBMIEthaXRpTSBHQlxcXCIsIEthaVRpLCBLYWlUaV9HQjIzMTIsIERGS2FpLVNCLCBcXFwiVFctS2FpXFxcIiwgc2VyaWY7fVxcclxcbi5mb250LXNvbmcge2ZvbnQtZmFtaWx5OiBHZW9yZ2lhLCBcXFwiTmltYnVzIFJvbWFuIE5vOSBMXFxcIiwgXFxcIlNvbmd0aSBTQ1xcXCIsIFxcXCJOb3RvIFNlcmlmIENKSyBTQ1xcXCIsIFxcXCJTb3VyY2UgSGFuIFNlcmlmIFNDXFxcIiwgXFxcIlNvdXJjZSBIYW4gU2VyaWYgQ05cXFwiLCBTVFNvbmcsIFxcXCJBUiBQTCBOZXcgU3VuZ1xcXCIsIFxcXCJBUiBQTCBTdW5ndGlMIEdCXFxcIiwgTlNpbVN1biwgU2ltU3VuLCBcXFwiVFctU3VuZ1xcXCIsIFxcXCJXZW5RdWFuWWkgQml0bWFwIFNvbmdcXFwiLCBcXFwiQVIgUEwgVU1pbmcgQ05cXFwiLCBcXFwiQVIgUEwgVU1pbmcgSEtcXFwiLCBcXFwiQVIgUEwgVU1pbmcgVFdcXFwiLCBcXFwiQVIgUEwgVU1pbmcgVFcgTUJFXFxcIiwgUE1pbmdMaVUsIE1pbmdMaVUsIHNlcmlmO31cXHJcXG4uZm9udC1mYW5nLXNvbmcge2ZvbnQtZmFtaWx5OiBCYXNrZXJ2aWxsZSwgXFxcIlRpbWVzIE5ldyBSb21hblxcXCIsIFxcXCJMaWJlcmF0aW9uIFNlcmlmXFxcIiwgU1RGYW5nc29uZywgRmFuZ1NvbmcsIEZhbmdTb25nX0dCMjMxMiwgXFxcIkNXVEVYLUZcXFwiLCBzZXJpZjt9XFxyXFxuXFxyXFxuLyog5Li05pe25pS+572uXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuXFxyXFxuLnVpLWJ1dHRvbi1pY29uLW9ubHkuc3BsaXRidXR0b24tc2VsZWN0IHtcXHJcXG4gICAgd2lkdGg6IDFlbTtcXHJcXG59XFxyXFxuXFxyXFxuYVtkYXRhLWdvdG9dIHtcXHJcXG4gICAgY29sb3I6ICMwMDA7XFxyXFxufVxcclxcblxcclxcbi8qIEJvb3RzdHJhcCA0IOe7hOS7tuagt+W8j1xcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcblxcclxcbi8qIOihqOWNlVxcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcbi5jb2wtZm9ybS1sYWJlbCB7XFxyXFxuICAgIHBhZGRpbmctdG9wOiBjYWxjKC4zNzVyZW0gKyAxcHgpO1xcclxcbiAgICBwYWRkaW5nLWJvdHRvbTogY2FsYyguMzc1cmVtICsgMXB4KTtcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogMDtcXHJcXG4gICAgZm9udC1zaXplOiBpbmhlcml0O1xcclxcbiAgICBsaW5lLWhlaWdodDogMS41O1xcclxcbn1cXHJcXG5cXHJcXG4uaW5wdXQtZ3JvdXAtYWRkb24ge1xcclxcbiAgYm9yZGVyLWxlZnQtd2lkdGg6IDA7XFxyXFxuICBib3JkZXItcmlnaHQtd2lkdGg6IDA7XFxyXFxufVxcclxcbi5pbnB1dC1ncm91cC1hZGRvbjpmaXJzdC1jaGlsZCB7XFxyXFxuICBib3JkZXItbGVmdC13aWR0aDogMXB4O1xcclxcbn1cXHJcXG4uaW5wdXQtZ3JvdXAtYWRkb246bGFzdC1jaGlsZCB7XFxyXFxuICBib3JkZXItcmlnaHQtd2lkdGg6IDFweDtcXHJcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwidmFyIG1hcCA9IHtcblx0XCIuL2FmXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hZi5qc1wiLFxuXHRcIi4vYWYuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FmLmpzXCIsXG5cdFwiLi9hclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXIuanNcIixcblx0XCIuL2FyLWR6XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1kei5qc1wiLFxuXHRcIi4vYXItZHouanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWR6LmpzXCIsXG5cdFwiLi9hci1rd1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXIta3cuanNcIixcblx0XCIuL2FyLWt3LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1rdy5qc1wiLFxuXHRcIi4vYXItbHlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWx5LmpzXCIsXG5cdFwiLi9hci1seS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItbHkuanNcIixcblx0XCIuL2FyLW1hXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1tYS5qc1wiLFxuXHRcIi4vYXItbWEuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLW1hLmpzXCIsXG5cdFwiLi9hci1zYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItc2EuanNcIixcblx0XCIuL2FyLXNhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1zYS5qc1wiLFxuXHRcIi4vYXItdG5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLXRuLmpzXCIsXG5cdFwiLi9hci10bi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItdG4uanNcIixcblx0XCIuL2FyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci5qc1wiLFxuXHRcIi4vYXpcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2F6LmpzXCIsXG5cdFwiLi9hei5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXouanNcIixcblx0XCIuL2JlXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iZS5qc1wiLFxuXHRcIi4vYmUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JlLmpzXCIsXG5cdFwiLi9iZ1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYmcuanNcIixcblx0XCIuL2JnLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iZy5qc1wiLFxuXHRcIi4vYm1cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JtLmpzXCIsXG5cdFwiLi9ibS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm0uanNcIixcblx0XCIuL2JuXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ibi5qc1wiLFxuXHRcIi4vYm4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JuLmpzXCIsXG5cdFwiLi9ib1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm8uanNcIixcblx0XCIuL2JvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iby5qc1wiLFxuXHRcIi4vYnJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JyLmpzXCIsXG5cdFwiLi9ici5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYnIuanNcIixcblx0XCIuL2JzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9icy5qc1wiLFxuXHRcIi4vYnMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JzLmpzXCIsXG5cdFwiLi9jYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY2EuanNcIixcblx0XCIuL2NhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jYS5qc1wiLFxuXHRcIi4vY3NcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2NzLmpzXCIsXG5cdFwiLi9jcy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3MuanNcIixcblx0XCIuL2N2XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jdi5qc1wiLFxuXHRcIi4vY3YuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2N2LmpzXCIsXG5cdFwiLi9jeVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3kuanNcIixcblx0XCIuL2N5LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jeS5qc1wiLFxuXHRcIi4vZGFcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RhLmpzXCIsXG5cdFwiLi9kYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGEuanNcIixcblx0XCIuL2RlXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS5qc1wiLFxuXHRcIi4vZGUtYXRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLWF0LmpzXCIsXG5cdFwiLi9kZS1hdC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUtYXQuanNcIixcblx0XCIuL2RlLWNoXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS1jaC5qc1wiLFxuXHRcIi4vZGUtY2guanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLWNoLmpzXCIsXG5cdFwiLi9kZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUuanNcIixcblx0XCIuL2R2XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kdi5qc1wiLFxuXHRcIi4vZHYuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2R2LmpzXCIsXG5cdFwiLi9lbFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZWwuanNcIixcblx0XCIuL2VsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbC5qc1wiLFxuXHRcIi4vZW4tYXVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWF1LmpzXCIsXG5cdFwiLi9lbi1hdS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tYXUuanNcIixcblx0XCIuL2VuLWNhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1jYS5qc1wiLFxuXHRcIi4vZW4tY2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWNhLmpzXCIsXG5cdFwiLi9lbi1nYlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tZ2IuanNcIixcblx0XCIuL2VuLWdiLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1nYi5qc1wiLFxuXHRcIi4vZW4taWVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWllLmpzXCIsXG5cdFwiLi9lbi1pZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4taWUuanNcIixcblx0XCIuL2VuLWlsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1pbC5qc1wiLFxuXHRcIi4vZW4taWwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWlsLmpzXCIsXG5cdFwiLi9lbi1uelwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tbnouanNcIixcblx0XCIuL2VuLW56LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1uei5qc1wiLFxuXHRcIi4vZW9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VvLmpzXCIsXG5cdFwiLi9lby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW8uanNcIixcblx0XCIuL2VzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy5qc1wiLFxuXHRcIi4vZXMtZG9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLWRvLmpzXCIsXG5cdFwiLi9lcy1kby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMtZG8uanNcIixcblx0XCIuL2VzLXVzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy11cy5qc1wiLFxuXHRcIi4vZXMtdXMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLXVzLmpzXCIsXG5cdFwiLi9lcy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMuanNcIixcblx0XCIuL2V0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ldC5qc1wiLFxuXHRcIi4vZXQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2V0LmpzXCIsXG5cdFwiLi9ldVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXUuanNcIixcblx0XCIuL2V1LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ldS5qc1wiLFxuXHRcIi4vZmFcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZhLmpzXCIsXG5cdFwiLi9mYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZmEuanNcIixcblx0XCIuL2ZpXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9maS5qc1wiLFxuXHRcIi4vZmkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZpLmpzXCIsXG5cdFwiLi9mb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZm8uanNcIixcblx0XCIuL2ZvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mby5qc1wiLFxuXHRcIi4vZnJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLmpzXCIsXG5cdFwiLi9mci1jYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnItY2EuanNcIixcblx0XCIuL2ZyLWNhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci1jYS5qc1wiLFxuXHRcIi4vZnItY2hcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLWNoLmpzXCIsXG5cdFwiLi9mci1jaC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnItY2guanNcIixcblx0XCIuL2ZyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci5qc1wiLFxuXHRcIi4vZnlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2Z5LmpzXCIsXG5cdFwiLi9meS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnkuanNcIixcblx0XCIuL2dkXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nZC5qc1wiLFxuXHRcIi4vZ2QuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dkLmpzXCIsXG5cdFwiLi9nbFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ2wuanNcIixcblx0XCIuL2dsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nbC5qc1wiLFxuXHRcIi4vZ29tLWxhdG5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dvbS1sYXRuLmpzXCIsXG5cdFwiLi9nb20tbGF0bi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ29tLWxhdG4uanNcIixcblx0XCIuL2d1XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ndS5qc1wiLFxuXHRcIi4vZ3UuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2d1LmpzXCIsXG5cdFwiLi9oZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaGUuanNcIixcblx0XCIuL2hlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oZS5qc1wiLFxuXHRcIi4vaGlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hpLmpzXCIsXG5cdFwiLi9oaS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaGkuanNcIixcblx0XCIuL2hyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oci5qc1wiLFxuXHRcIi4vaHIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hyLmpzXCIsXG5cdFwiLi9odVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHUuanNcIixcblx0XCIuL2h1LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9odS5qc1wiLFxuXHRcIi4vaHktYW1cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2h5LWFtLmpzXCIsXG5cdFwiLi9oeS1hbS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHktYW0uanNcIixcblx0XCIuL2lkXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pZC5qc1wiLFxuXHRcIi4vaWQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2lkLmpzXCIsXG5cdFwiLi9pc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaXMuanNcIixcblx0XCIuL2lzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pcy5qc1wiLFxuXHRcIi4vaXRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2l0LmpzXCIsXG5cdFwiLi9pdC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaXQuanNcIixcblx0XCIuL2phXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9qYS5qc1wiLFxuXHRcIi4vamEuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2phLmpzXCIsXG5cdFwiLi9qdlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvanYuanNcIixcblx0XCIuL2p2LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9qdi5qc1wiLFxuXHRcIi4va2FcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2thLmpzXCIsXG5cdFwiLi9rYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva2EuanNcIixcblx0XCIuL2trXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ray5qc1wiLFxuXHRcIi4va2suanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2trLmpzXCIsXG5cdFwiLi9rbVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva20uanNcIixcblx0XCIuL2ttLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rbS5qc1wiLFxuXHRcIi4va25cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2tuLmpzXCIsXG5cdFwiLi9rbi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva24uanNcIixcblx0XCIuL2tvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rby5qc1wiLFxuXHRcIi4va28uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2tvLmpzXCIsXG5cdFwiLi9reVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva3kuanNcIixcblx0XCIuL2t5LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9reS5qc1wiLFxuXHRcIi4vbGJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2xiLmpzXCIsXG5cdFwiLi9sYi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbGIuanNcIixcblx0XCIuL2xvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sby5qc1wiLFxuXHRcIi4vbG8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2xvLmpzXCIsXG5cdFwiLi9sdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbHQuanNcIixcblx0XCIuL2x0LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sdC5qc1wiLFxuXHRcIi4vbHZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2x2LmpzXCIsXG5cdFwiLi9sdi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbHYuanNcIixcblx0XCIuL21lXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tZS5qc1wiLFxuXHRcIi4vbWUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21lLmpzXCIsXG5cdFwiLi9taVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWkuanNcIixcblx0XCIuL21pLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9taS5qc1wiLFxuXHRcIi4vbWtcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21rLmpzXCIsXG5cdFwiLi9tay5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWsuanNcIixcblx0XCIuL21sXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tbC5qc1wiLFxuXHRcIi4vbWwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21sLmpzXCIsXG5cdFwiLi9tblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbW4uanNcIixcblx0XCIuL21uLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tbi5qc1wiLFxuXHRcIi4vbXJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21yLmpzXCIsXG5cdFwiLi9tci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXIuanNcIixcblx0XCIuL21zXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tcy5qc1wiLFxuXHRcIi4vbXMtbXlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21zLW15LmpzXCIsXG5cdFwiLi9tcy1teS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXMtbXkuanNcIixcblx0XCIuL21zLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tcy5qc1wiLFxuXHRcIi4vbXRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL210LmpzXCIsXG5cdFwiLi9tdC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXQuanNcIixcblx0XCIuL215XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9teS5qc1wiLFxuXHRcIi4vbXkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL215LmpzXCIsXG5cdFwiLi9uYlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmIuanNcIixcblx0XCIuL25iLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9uYi5qc1wiLFxuXHRcIi4vbmVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25lLmpzXCIsXG5cdFwiLi9uZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmUuanNcIixcblx0XCIuL25sXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubC5qc1wiLFxuXHRcIi4vbmwtYmVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25sLWJlLmpzXCIsXG5cdFwiLi9ubC1iZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmwtYmUuanNcIixcblx0XCIuL25sLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubC5qc1wiLFxuXHRcIi4vbm5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25uLmpzXCIsXG5cdFwiLi9ubi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbm4uanNcIixcblx0XCIuL3BhLWluXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wYS1pbi5qc1wiLFxuXHRcIi4vcGEtaW4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3BhLWluLmpzXCIsXG5cdFwiLi9wbFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcGwuanNcIixcblx0XCIuL3BsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wbC5qc1wiLFxuXHRcIi4vcHRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3B0LmpzXCIsXG5cdFwiLi9wdC1iclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcHQtYnIuanNcIixcblx0XCIuL3B0LWJyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wdC1ici5qc1wiLFxuXHRcIi4vcHQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3B0LmpzXCIsXG5cdFwiLi9yb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcm8uanNcIixcblx0XCIuL3JvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9yby5qc1wiLFxuXHRcIi4vcnVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3J1LmpzXCIsXG5cdFwiLi9ydS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcnUuanNcIixcblx0XCIuL3NkXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zZC5qc1wiLFxuXHRcIi4vc2QuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NkLmpzXCIsXG5cdFwiLi9zZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2UuanNcIixcblx0XCIuL3NlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zZS5qc1wiLFxuXHRcIi4vc2lcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NpLmpzXCIsXG5cdFwiLi9zaS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2kuanNcIixcblx0XCIuL3NrXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zay5qc1wiLFxuXHRcIi4vc2suanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NrLmpzXCIsXG5cdFwiLi9zbFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2wuanNcIixcblx0XCIuL3NsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zbC5qc1wiLFxuXHRcIi4vc3FcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NxLmpzXCIsXG5cdFwiLi9zcS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3EuanNcIixcblx0XCIuL3NyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zci5qc1wiLFxuXHRcIi4vc3ItY3lybFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3ItY3lybC5qc1wiLFxuXHRcIi4vc3ItY3lybC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3ItY3lybC5qc1wiLFxuXHRcIi4vc3IuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NyLmpzXCIsXG5cdFwiLi9zc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3MuanNcIixcblx0XCIuL3NzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zcy5qc1wiLFxuXHRcIi4vc3ZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3N2LmpzXCIsXG5cdFwiLi9zdi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3YuanNcIixcblx0XCIuL3N3XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zdy5qc1wiLFxuXHRcIi4vc3cuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3N3LmpzXCIsXG5cdFwiLi90YVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGEuanNcIixcblx0XCIuL3RhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90YS5qc1wiLFxuXHRcIi4vdGVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RlLmpzXCIsXG5cdFwiLi90ZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGUuanNcIixcblx0XCIuL3RldFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGV0LmpzXCIsXG5cdFwiLi90ZXQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RldC5qc1wiLFxuXHRcIi4vdGdcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RnLmpzXCIsXG5cdFwiLi90Zy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGcuanNcIixcblx0XCIuL3RoXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90aC5qc1wiLFxuXHRcIi4vdGguanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RoLmpzXCIsXG5cdFwiLi90bC1waFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGwtcGguanNcIixcblx0XCIuL3RsLXBoLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90bC1waC5qc1wiLFxuXHRcIi4vdGxoXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90bGguanNcIixcblx0XCIuL3RsaC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGxoLmpzXCIsXG5cdFwiLi90clwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHIuanNcIixcblx0XCIuL3RyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ci5qc1wiLFxuXHRcIi4vdHpsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90emwuanNcIixcblx0XCIuL3R6bC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHpsLmpzXCIsXG5cdFwiLi90em1cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3R6bS5qc1wiLFxuXHRcIi4vdHptLWxhdG5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3R6bS1sYXRuLmpzXCIsXG5cdFwiLi90em0tbGF0bi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHptLWxhdG4uanNcIixcblx0XCIuL3R6bS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHptLmpzXCIsXG5cdFwiLi91Zy1jblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdWctY24uanNcIixcblx0XCIuL3VnLWNuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91Zy1jbi5qc1wiLFxuXHRcIi4vdWtcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VrLmpzXCIsXG5cdFwiLi91ay5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdWsuanNcIixcblx0XCIuL3VyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ci5qc1wiLFxuXHRcIi4vdXIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VyLmpzXCIsXG5cdFwiLi91elwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXouanNcIixcblx0XCIuL3V6LWxhdG5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3V6LWxhdG4uanNcIixcblx0XCIuL3V6LWxhdG4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3V6LWxhdG4uanNcIixcblx0XCIuL3V6LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ei5qc1wiLFxuXHRcIi4vdmlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3ZpLmpzXCIsXG5cdFwiLi92aS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdmkuanNcIixcblx0XCIuL3gtcHNldWRvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS94LXBzZXVkby5qc1wiLFxuXHRcIi4veC1wc2V1ZG8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3gtcHNldWRvLmpzXCIsXG5cdFwiLi95b1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUveW8uanNcIixcblx0XCIuL3lvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS95by5qc1wiLFxuXHRcIi4vemgtY25cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLWNuLmpzXCIsXG5cdFwiLi96aC1jbi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtY24uanNcIixcblx0XCIuL3poLWhrXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC1oay5qc1wiLFxuXHRcIi4vemgtaGsuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLWhrLmpzXCIsXG5cdFwiLi96aC10d1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtdHcuanNcIixcblx0XCIuL3poLXR3LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC10dy5qc1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHR2YXIgaWQgPSBtYXBbcmVxXTtcblx0aWYoIShpZCArIDEpKSB7IC8vIGNoZWNrIGZvciBudW1iZXIgb3Igc3RyaW5nXG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBpZDtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUgc3luYyByZWN1cnNpdmUgXlxcXFwuXFxcXC8uKiRcIjsiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgQ2FsZW5kYXIgZnJvbSAnLi9jb21wb25lbnRzL0NhbGVuZGFyL0NhbGVuZGFyJztcclxuaW1wb3J0IEV2ZW50UG9wb3ZlciBmcm9tICcuL2NvbXBvbmVudHMvRXZlbnRQb3BvdmVyL0V2ZW50UG9wb3Zlcic7XHJcbmltcG9ydCB7IFdpekFsZXJ0IH0gZnJvbSAnLi91dGlscy9XaXpJbnRlcmZhY2UnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgY2xpY2tlZEV2ZW50OiBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaGFuZGxlRXZlbnRDbGljayA9IHRoaXMuaGFuZGxlRXZlbnRDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUV2ZW50Q2xpY2soIGV2ZW50LCBqc0V2ZW50LCB2aWV3ICkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coZXZlbnQudGl0bGUsIGV2ZW50LCBqc0V2ZW50LCB2aWV3KVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBjbGlja2VkRXZlbnRBcmdzOiB7IGV2ZW50LCBqc0V2ZW50LCB2aWV3IH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGlkPSd3aXotdG9tYXRvLWNhbGVuZGFyJyA+XHJcbiAgICAgICAgICAgICAgICA8Q2FsZW5kYXIgb25FdmVudENsaWNrID0ge3RoaXMuaGFuZGxlRXZlbnRDbGlja30gLz5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmNsaWNrZWRFdmVudEFyZ3MgJiYgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxFdmVudFBvcG92ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50ID0ge3RoaXMuc3RhdGUuY2xpY2tlZEV2ZW50QXJncy5ldmVudH0gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZlcmVuY2UgPSB7dGhpcy5zdGF0ZS5jbGlja2VkRXZlbnRBcmdzLmpzRXZlbnQudGFyZ2V0fSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLz4gXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9DYWxlbmRhci5jc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vQ2FsZW5kYXIuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9DYWxlbmRhci5jc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IEZ1bGxDYWxlbmRhciBmcm9tICcuL0Z1bGxDYWxlbmRhcic7XHJcbmltcG9ydCAnZnVsbGNhbGVuZGFyLXJlYWN0d3JhcHBlci9kaXN0L2Nzcy9mdWxsY2FsZW5kYXIubWluLmNzcyc7XHJcbmltcG9ydCAnLi9DYWxlbmRhci5jc3MnO1xyXG5pbXBvcnQgV2l6RXZlbnREYXRhTG9hZGVyIGZyb20gJy4uLy4uL21vZGVscy9XaXpFdmVudERhdGFMb2FkZXInXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYWxlbmRhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBldmVudHM6IFtdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGF0YUxvYWRlciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jYWxlbmRhciA9IG51bGw7XHJcbiAgICAgICAgLy/nu5Hlrprlj6Xmn4RcclxuICAgICAgICB0aGlzLm9uQ2FsZW5kYXJSZW5kZXIgPSB0aGlzLm9uQ2FsZW5kYXJSZW5kZXIuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLm9uVmlld1JlbmRlciA9IHRoaXMub25WaWV3UmVuZGVyLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5vbkV2ZW50UmVuZGVyID0gdGhpcy5vbkV2ZW50UmVuZGVyLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DYWxlbmRhclJlbmRlcihlbCkge1xyXG4gICAgICAgIHRoaXMuY2FsZW5kYXIgPSBlbDtcclxuICAgICAgICB0aGlzLmRhdGFMb2FkZXIgPSBuZXcgV2l6RXZlbnREYXRhTG9hZGVyKHRoaXMuY2FsZW5kYXIpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVmlld1JlbmRlciggdmlldywgZWxlbWVudCApIHtcclxuICAgICAgICAvLyDliLfmlrDop4blm77vvIzph43mlrDojrflj5bml6Xljobkuovku7ZcclxuICAgICAgICBjb25zdCAkY2FsZW5kYXIgPSAkKHRoaXMuY2FsZW5kYXIpO1xyXG4gICAgICAgIGNvbnN0IGV2ZW50U291cmNlcyA9IHRoaXMuZGF0YUxvYWRlci5nZXRFdmVudFNvdXJjZXMoIHZpZXcsIGVsZW1lbnQgKTtcclxuICAgICAgICAkY2FsZW5kYXIuZnVsbENhbGVuZGFyKCdyZW1vdmVFdmVudHMnKTtcclxuICAgICAgICBmb3IgKGxldCBpPTAgOyBpIDwgZXZlbnRTb3VyY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICRjYWxlbmRhci5mdWxsQ2FsZW5kYXIoJ2FkZEV2ZW50U291cmNlJywgZXZlbnRTb3VyY2VzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25FdmVudFJlbmRlciggZXZlbnRPYmosICRlbCApIHtcclxuICAgICAgICAvLyDlhYPntKDlt7Lnu4/muLLmn5PvvIzlj6/kv67mlLnlhYPntKBcclxuICAgICAgICBjb25zdCBpc0NvbXBsZXRlID0gcGFyc2VJbnQoZXZlbnRPYmouY29tcGxldGUpID09IDU7XHJcbiAgICAgICAgaWYgKCBpc0NvbXBsZXRlICkge1xyXG4gICAgICAgICAgICAvLyDmoLflvI9cclxuICAgICAgICAgICAgJGVsLmFkZENsYXNzKCd0Yy1jb21wbGV0ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICBcclxuICAgIH1cclxuIFxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiuvue9ruS6i+S7tuWPpeafhFxyXG4gICAgICAgICAqIOWboOS4umZ1bGxjYWxlbmRhci1yZWFjdFdyYXBwZXLnmoTlrp7njrDmmK/nm7TmjqXov5Tlm548ZGl2IGlkPSdmdWxsY2FsZW5kYXInPjwvZGl2PlxyXG4gICAgICAgICAqIOW5tuS4lOiwg+eUqCQoJyNmdWxsY2FsZW5kYXInKS5mdWxsY2FsZW5kYXIodGhpcy5wcm9wcynov5vooYzmnoTlu7rvvIzlm6DmraRSZWFjdOW5tuayoeaciVxyXG4gICAgICAgICAqIOeuoeeQhkZ1bGxDYWxlbmRhcueKtuaAgeWSjOa4suafk+eahOiDveWKm+OAguaJgOS7peebtOaOpeWcqOiuvue9ruS4reWBmuWlvWNhbGxiYWNr77yM6K6p5o+S5Lu26Ieq5oiR566h55CG44CCXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBpZD1cImNhbGVuZGFyLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgPEZ1bGxDYWxlbmRhciBjYWxlbmRhclJlZj17dGhpcy5vbkNhbGVuZGFyUmVuZGVyfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWfuuacrOmFjee9rlxyXG4gICAgICAgICAgICAgICAgICAgIGlkID0gXCJjYWxlbmRhclwiXHJcbiAgICAgICAgICAgICAgICAgICAgdGhlbWVTeXN0ZW0gPSAnc3RhbmRhcmQnXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0ID0gJ3BhcmVudCdcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXIgPSB7e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAncHJldixuZXh0LHRvZGF5JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2VudGVyOiAndGl0bGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodDogJ21vbnRoLGFnZW5kYVdlZWssYWdlbmRhRGF5LGxpc3RXZWVrJ1xyXG4gICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5Lit5paH5YyWXHJcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uVGV4dCA9IHt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvZGF5OiAn5LuK5aSpJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9udGg6ICfmnIgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWVrOiAn5ZGoJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF5OiAn5pelJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdDogJ+ihqCdcclxuICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgIG1vbnRoTmFtZXMgPSB7W1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnMeaciCcsICcy5pyIJywgJzPmnIgnLCAnNOaciCcsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnNeaciCcsICc25pyIJywgJzfmnIgnLCAnOOaciCcsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnOeaciCcsICcxMOaciCcsICcxMeaciCcsICcxMuaciCdcclxuICAgICAgICAgICAgICAgICAgICBdfVxyXG4gICAgICAgICAgICAgICAgICAgIG1vbnRoTmFtZXNTaG9ydCA9IHtbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcx5pyIJywgJzLmnIgnLCAnM+aciCcsICc05pyIJywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc15pyIJywgJzbmnIgnLCAnN+aciCcsICc45pyIJywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc55pyIJywgJzEw5pyIJywgJzEx5pyIJywgJzEy5pyIJ1xyXG4gICAgICAgICAgICAgICAgICAgIF19XHJcbiAgICAgICAgICAgICAgICAgICAgZGF5TmFtZXMgPSB7W1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAn5ZGo5pelJywgJ+WRqOS4gCcsICflkajkuownLCAn5ZGo5LiJJywgJ+WRqOWbmycsICflkajkupQnLCAn5ZGo5YWtJ1xyXG4gICAgICAgICAgICAgICAgICAgIF19XHJcbiAgICAgICAgICAgICAgICAgICAgZGF5TmFtZXNTaG9ydCA9IHtbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICflkajml6UnLCAn5ZGo5LiAJywgJ+WRqOS6jCcsICflkajkuIknLCAn5ZGo5ZubJywgJ+WRqOS6lCcsICflkajlha0nXHJcbiAgICAgICAgICAgICAgICAgICAgXX1cclxuICAgICAgICAgICAgICAgICAgICBhbGxEYXlUZXh0ID0gJ+WFqOWkqSdcclxuICAgICAgICAgICAgICAgICAgICAvLyDorr7nva7op4blm75cclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmlldyA9ICdhZ2VuZGFXZWVrJ1xyXG4gICAgICAgICAgICAgICAgICAgIG5vd0luZGljYXRvciA9IHt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0RGF5ID0gezF9XHJcbiAgICAgICAgICAgICAgICAgICAgdmlld3MgPSB7e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZ2VuZGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pblRpbWU6IFwiMDg6MDA6MDBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsb3RMYWJlbEZvcm1hdDogJ2goOm1tKSBhJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgIG5hdkxpbmtzPSB7dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICBhbGxEYXlEZWZhdWx0ID0ge2ZhbHNlfVxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50TGltaXQ9IHt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOiuvue9ruS6i+S7tlxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGFibGUgPSB7dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RIZWxwZXIgPSB7dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICBlZGl0YWJsZSA9IHt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgIGZvcmNlRXZlbnREdXJhdGlvbiA9IHt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOiuvue9rlVJXHJcbiAgICAgICAgICAgICAgICAgICAgdW5zZWxlY3RDYW5jZWwgPSAnLm1vZGFsIConXHJcbiAgICAgICAgICAgICAgICAgICAgZHJhZ09wYWNpdHkgPSB7e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm1vbnRoXCI6IC41LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFnZW5kYVdlZWtcIjogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhZ2VuZGFEYXlcIjogMVxyXG4gICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6K6+572u5Y+l5p+EXHJcbiAgICAgICAgICAgICAgICAgICAgdmlld1JlbmRlciA9IHt0aGlzLm9uVmlld1JlbmRlcn1cclxuICAgICAgICAgICAgICAgICAgICBldmVudFJlbmRlciA9IHt0aGlzLm9uRXZlbnRSZW5kZXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRDbGljayA9IHt0aGlzLnByb3BzLm9uRXZlbnRDbGlja31cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgJCBmcm9tIFwianF1ZXJ5XCI7XHJcbmltcG9ydCBmdWxsQ2FsZW5kYXIgZnJvbSBcImZ1bGxjYWxlbmRhclwiO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcblxyXG5jbGFzcyBGdWxsY2FsZW5kYXJPYmplY3RNYXBwZXJ7XHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHJcblx0fVxyXG5cclxuXHRnZXRTZXR0aW5ncyhwcm9wZXJ0aWVzKXtcclxuXHRcdGxldCBuZXdTZXR0aW5ncyA9IHt9O1xyXG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gcHJvcGVydGllcykge1xyXG4gICAgICBcdFx0aWYgKHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgIFx0XHRuZXdTZXR0aW5nc1trZXldID0gcHJvcGVydGllc1trZXldO1xyXG4gICAgICBcdFx0fVxyXG4gICAgXHR9XHJcbiAgICBcdHJldHVybiBuZXdTZXR0aW5ncztcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZ1bGxDYWxlbmRhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMuanEgPSAkLm5vQ29uZmxpY3QoKTtcclxuXHRcdHRoaXMuZnVsbGNhbGVuZGFyT2JqZWN0TWFwcGVyID0gbmV3IEZ1bGxjYWxlbmRhck9iamVjdE1hcHBlcigpO1xyXG5cdFx0dGhpcy5yb290ID0gbnVsbDtcclxuXHRcdHRoaXMuaW5zdGFuY2UgPSBudWxsO1xyXG5cdFx0dGhpcy5kYXRlID0gbmV3IERhdGUoKTtcclxuXHR9XHJcblxyXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XHJcblx0XHRjb25zdCBvYmplY3RNYXBwZXJTZXR0aW5ncyA9IHRoaXMuZnVsbGNhbGVuZGFyT2JqZWN0TWFwcGVyLmdldFNldHRpbmdzKHRoaXMucHJvcHMpO1xyXG5cdFx0dGhpcy5pbnN0YW5jZSA9IHRoaXMuanEoYCMke3RoaXMucm9vdH1gKS5mdWxsQ2FsZW5kYXIob2JqZWN0TWFwcGVyU2V0dGluZ3MpO1xyXG5cdH1cclxuXHJcbiAgXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyl7XHJcblx0XHQvKlxyXG4gIFx0XHR0aGlzLmpxKGAjJHt0aGlzLnJvb3R9YCkuZnVsbENhbGVuZGFyKCdkZXN0cm95Jyk7XHJcbiAgXHRcdGNvbnN0IG9iamVjdE1hcHBlclNldHRpbmdzID0gdGhpcy5mdWxsY2FsZW5kYXJPYmplY3RNYXBwZXIuZ2V0U2V0dGluZ3MobmV4dFByb3BzKTtcclxuICAgIFx0dGhpcy5pbnN0YW5jZSA9IHRoaXMuanEoYCMke3RoaXMucm9vdH1gKS5mdWxsQ2FsZW5kYXIob2JqZWN0TWFwcGVyU2V0dGluZ3MpO1xyXG5cdFx0Ki9cclxuXHR9XHJcblxyXG5cdHJlbmRlcigpe1xyXG5cdFx0dGhpcy5yb290ID0gdGhpcy5wcm9wcy5pZCB8fCAnSUQnICsgdGhpcy5kYXRlLmdldFRpbWUoKTsgXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGlkPXt0aGlzLnJvb3R9IHJlZj17dGhpcy5wcm9wcy5jYWxlbmRhclJlZn0+PC9kaXY+XHJcblx0XHQpXHJcblx0fVxyXG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vRXZlbnRQb3BvdmVyLmNzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9FdmVudFBvcG92ZXIuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9FdmVudFBvcG92ZXIuY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICcuL0V2ZW50UG9wb3Zlci5jc3MnO1xyXG5pbXBvcnQgUG9wcGVyIGZyb20gJ3BvcHBlci5qcyc7XHJcbmltcG9ydCBQb3BvdmVyVGl0bGVJbnB1dCBmcm9tICcuL1BvcG92ZXJUaXRsZUlucHV0JztcclxuaW1wb3J0IFBvcG92ZXJTaW1wbGVGb3JtIGZyb20gJy4vUG9wb3ZlclNpbXBsZUZvcm0nO1xyXG5pbXBvcnQgUG9wb3ZlclRvb2xiYXIgZnJvbSAnLi9Qb3BvdmVyVG9vbGJhcic7XHJcbmltcG9ydCBFdmVudEhhbmRsZXMgZnJvbSAnLi4vLi4vbW9kZWxzL0V2ZW50SGFuZGxlcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudFBvcG92ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5wb3BwZXJOb2RlID0gbnVsbDtcclxuICAgICAgICB0aGlzLnBvcHBlckluc3RhbmNlID0gbnVsbDtcclxuICAgICAgICB0aGlzLmV2ZW50SGFuZGxlcyA9IG5ldyBFdmVudEhhbmRsZXMoKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIG5ld0V2ZW50RGF0YToge31cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g57uR5a6a5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5hdXRvSGlkZSA9IHRoaXMuYXV0b0hpZGUuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZVRpdGxlQ2hhbmdlID0gdGhpcy5oYW5kbGVUaXRsZUNoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlU2F2ZUJ0bkNsaWNrID0gdGhpcy5oYW5kbGVTYXZlQnRuQ2xpY2suYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUNvbXBsZXRlQnRuQ2xpY2sgPSB0aGlzLmhhbmRsZUNvbXBsZXRlQnRuQ2xpY2suYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZU9wZW5Eb2NCdG5DbGljayA9IHRoaXMuaGFuZGxlT3BlbkRvY0J0bkNsaWNrLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVEZWxldGVEYXRhQnRuQ2xpY2sgPSB0aGlzLmhhbmRsZURlbGV0ZURhdGFCdG5DbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlRGVsZXRlRG9jQnRuQ2xpY2sgPSB0aGlzLmhhbmRsZURlbGV0ZURvY0J0bkNsaWNrLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5Yqo55S75pWI5p6cXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICBhdXRvSGlkZShlKSB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAvLyDkuI3mmK/ml6Xljobkuovku7blhYPntKBcclxuICAgICAgICAgICAgISQodGhpcy5wcm9wcy5yZWZlcmVuY2UpLmlzKGUudGFyZ2V0KSAmJlxyXG4gICAgICAgICAgICAvLyDkuZ/kuI3mmK/lrZDlhYPntKBcclxuICAgICAgICAgICAgJCh0aGlzLnByb3BzLnJlZmVyZW5jZSkuaGFzKGUudGFyZ2V0KS5sZW5ndGggPT09IDAgJiZcclxuICAgICAgICAgICAgLy8g5LiN5pivcG9wcGVy5YWD57SgXHJcbiAgICAgICAgICAgICEkKHRoaXMucG9wcGVyTm9kZSkuaXMoZS50YXJnZXQpICYmXHJcbiAgICAgICAgICAgIC8vIOS5n+S4jeaYr+WtkOWFg+e0oFxyXG4gICAgICAgICAgICAkKHRoaXMucG9wcGVyTm9kZSkuaGFzKGUudGFyZ2V0KS5sZW5ndGggPT09IDBcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhpZGUoKSB7XHJcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XHJcbiAgICAgICAgICAgICQodGhhdC5wb3BwZXJOb2RlKS5oaWRlKDAsIG51bGwsIHJlc29sdmUpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc2hvdygpIHtcclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcclxuICAgICAgICAgICAgJCh0aGF0LnBvcHBlck5vZGUpLmZhZGVJbigzNTAsIG51bGwsIHJlc29sdmUpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8g5LqL5Lu25Y+l5p+EXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICBoYW5kbGVUaXRsZUNoYW5nZShlKSB7XHJcbiAgICAgICAgLy/lgqjlrZjliLDlsIbmlrDnmoTlgLzlgqjlrZhuZXdFdmVudERhdGHph4zvvIzlvZPkv53lrZjml7bmo4DntKJuZXdFdmVudERhdGHliJfooahcclxuICAgICAgICBjb25zdCBuZXdUaXRsZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoZnVuY3Rpb24ocHJldlN0YXRlLCBwcm9wcykge1xyXG4gICAgICAgICAgICAvL+aLt+i0neWJjeS4gOS4quWvueixoVxyXG4gICAgICAgICAgICBjb25zdCBuZXdFdmVudERhdGEgPSBPYmplY3QuY3JlYXRlKHByZXZTdGF0ZS5uZXdFdmVudERhdGEpO1xyXG4gICAgICAgICAgICBuZXdFdmVudERhdGEudGl0bGUgPSBuZXdUaXRsZTtcclxuICAgICAgICAgICAgcmV0dXJuIHsgbmV3RXZlbnREYXRhIH07XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVTYXZlQnRuQ2xpY2soZSkge1xyXG4gICAgICAgIHRoaXMuaGlkZSgpLnRoZW4oIFxyXG4gICAgICAgICAgICAocmV0KSA9PiB0aGlzLmV2ZW50SGFuZGxlcy5vblNhdmVCdG5DbGljayh0aGlzLnByb3BzLmV2ZW50LCB0aGlzLnN0YXRlLm5ld0V2ZW50RGF0YSkgXHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNvbXBsZXRlQnRuQ2xpY2soZSkge1xyXG4gICAgICAgIHRoaXMuaGlkZSgpLnRoZW4oXHJcbiAgICAgICAgICAgIChyZXQpID0+IHRoaXMuZXZlbnRIYW5kbGVzLm9uQ29tcGxldGVCdG5DbGljayh0aGlzLnByb3BzLmV2ZW50KSBcclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlT3BlbkRvY0J0bkNsaWNrKGUpIHtcclxuICAgICAgICB0aGlzLmhpZGUoKS50aGVuKFxyXG4gICAgICAgICAgICAocmV0KSA9PiB0aGlzLmV2ZW50SGFuZGxlcy5vbk9wZW5Eb2NCdG5DbGljayh0aGlzLnByb3BzLmV2ZW50KSBcclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlRGVsZXRlRGF0YUJ0bkNsaWNrKGUpIHtcclxuICAgICAgICB0aGlzLmhpZGUoKS50aGVuKFxyXG4gICAgICAgICAgICAocmV0KSA9PiB0aGlzLmV2ZW50SGFuZGxlcy5vbkRlbGV0ZURhdGFCdG5DbGljayh0aGlzLnByb3BzLmV2ZW50KSBcclxuICAgICAgICApICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVEZWxldGVEb2NCdG5DbGljayhlKSB7XHJcbiAgICAgICAgdGhpcy5oaWRlKCkudGhlbihcclxuICAgICAgICAgICAgKHJldCkgPT4gdGhpcy5ldmVudEhhbmRsZXMub25EZWxldGVEb2NCdG5DbGljayh0aGlzLnByb3BzLmV2ZW50KSBcclxuICAgICAgICApICBcclxuICAgIH1cclxuXHJcbiAgICAvLyDnlJ/lkb3lkajmnJ9cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIC8vIOWIneWni+WMlue7hOS7tlxyXG4gICAgICAgIHRoaXMucG9wcGVySW5zdGFuY2UgPSBuZXcgUG9wcGVyKHRoaXMucHJvcHMucmVmZXJlbmNlLCB0aGlzLnBvcHBlck5vZGUsIHtcclxuXHRcdFx0cGxhY2VtZW50OiAnYXV0bycsXHJcblx0XHRcdG1vZGlmaWVyczoge1xyXG5cdFx0XHRcdGFycm93OiB7XHJcblx0XHRcdFx0ICBlbGVtZW50OiAnLmFycm93J1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdH0pO1xyXG4gICAgICAgIC8vIOiuvue9ruiHquWKqOmakOiXj1xyXG4gICAgICAgICQoZG9jdW1lbnQpLm9mZignY2xpY2snLCB0aGlzLmF1dG9IaWRlKS5vbignY2xpY2snLCB0aGlzLmF1dG9IaWRlKTtcclxuICAgICAgICAvLyDmmL7npLpcclxuICAgICAgICB0aGlzLnNob3coKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUsIHNuYXBzaG90KSB7XHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLnNob3coKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcclxuICAgICAgICAvLyDlvZPmm7TmlrDlsZ7mgKfml7bmiY3op6blj5HliqjnlLvmlYjmnpxcclxuICAgICAgICBpZiAoIG5leHRQcm9wcyAhPSB0aGlzLnByb3BzICkge1xyXG4gICAgICAgICAgICAvLyDorr7nva7mm7TmlrDml7bnmoTliqjnlLtcclxuICAgICAgICAgICAgdGhpcy5oaWRlKCkudGhlbiggKHJldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy/mm7TmlrDlrprkvY1cclxuICAgICAgICAgICAgICAgIHRoaXMucG9wcGVySW5zdGFuY2UucmVmZXJlbmNlID0gbmV4dFByb3BzLnJlZmVyZW5jZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9wcGVySW5zdGFuY2UudXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0Yy1wb3BvdmVyXCJcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e2Rpc3BsYXk6ICdub25lJ319XHJcbiAgICAgICAgICAgICAgICAgICAgcmVmPXsoZGl2KSA9PiB0aGlzLnBvcHBlck5vZGUgPSBkaXZ9ID5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXJyb3dcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGMtcG9wb3Zlci1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8UG9wb3ZlclRpdGxlSW5wdXQgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50VGl0bGU9e3RoaXMucHJvcHMuZXZlbnQudGl0bGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uVGl0bGVDaGFuZ2U9e3RoaXMuaGFuZGxlVGl0bGVDaGFuZ2V9IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRGb3JtPSd0Yy1wb3BvdmVyLWV2ZW50LWVkaXRGb3JtJyAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRjLXBvcG92ZXItYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxQb3BvdmVyU2ltcGxlRm9ybSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ9J3RjLXBvcG92ZXItZXZlbnQtZWRpdEZvcm0nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50U3RhcnQ9e3RoaXMucHJvcHMuZXZlbnQuc3RhcnR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yVmFsdWU9e3RoaXMucHJvcHMuZXZlbnQuYmFja2dyb3VuZENvbG9yfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxQb3BvdmVyVG9vbGJhclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVTYXZlQnRuPXshIXRoaXMuc3RhdGUubmV3RXZlbnREYXRhLnRpdGxlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvblNhdmVCdG5DbGljaz17dGhpcy5oYW5kbGVTYXZlQnRuQ2xpY2t9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGVCdG5DbGljaz17dGhpcy5oYW5kbGVDb21wbGV0ZUJ0bkNsaWNrfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbk9wZW5Eb2NCdG5DbGljaz17dGhpcy5oYW5kbGVPcGVuRG9jQnRuQ2xpY2t9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRGVsZXRlRGF0YUJ0bkNsaWNrPXt0aGlzLm9uRGVsZXRlRGF0YUJ0bkNsaWNrfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgeyBGb3JtLCBHbHlwaGljb24gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5pbXBvcnQgRGF0ZVRpbWVQaWNrZXIgZnJvbSAnLi4vRm9ybS9EYXRlVGltZVBpY2tlcic7XHJcbmltcG9ydCBDb2xvclBpY2tlciBmcm9tICcuLi9Gb3JtL0NvbG9yUGlja2VyJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50U2ltcGxlRm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2UgPSB0aGlzLmhhbmRsZUlucHV0Q2hhbmdlLmJpbmQodGhpcyk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUlucHV0Q2hhbmdlKCkge1xyXG4gICAgICAgIC8vVE9ETzog5aSE55CG5pWw5o2u6L656LefXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxGb3JtIGhvcml6b250YWwgaWQ9e3RoaXMucHJvcHMuaWR9PlxyXG4gICAgICAgICAgICAgICAgPERhdGVUaW1lUGlja2VyIHJlYWRPbmx5IGlkID0gJ3RjLWVkaXRwb3BwZXItZXZlbnRkYXRlJyBcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbD17PGkgY2xhc3NOYW1lPSdmYXIgZmEtY2FsZW5kYXItYWx0IGZhLWxnJyAvPn1cclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5ldmVudFN0YXJ0LmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uSW5wdXRDaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXRDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPENvbG9yUGlja2VyIGlkID0gJ3RjLWVkaXRwb3BwZXItZXZlbnRjb2xvcicgXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw9ezxpIGNsYXNzTmFtZT0nZmFzIGZhLXBhaW50LWJydXNoIGZhLWxnJyAvPn1cclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5jb2xvclZhbHVlfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uSW5wdXRDaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXRDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L0Zvcm0+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxufSIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL1BvcG92ZXJUaXRsZUlucHV0LmNzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9Qb3BvdmVyVGl0bGVJbnB1dC5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL1BvcG92ZXJUaXRsZUlucHV0LmNzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAnLi9Qb3BvdmVyVGl0bGVJbnB1dC5jc3MnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRUaXRsZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICAvL+WIneWni+WMlueKtuaAgVxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGV2ZW50VGl0bGU6IHRoaXMucHJvcHMuZXZlbnRUaXRsZSwgLy/lgqjlrZjljp/lp4twcm9wcy50aXRsZVxyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5wcm9wcy5ldmVudFRpdGxlIC8v5YKo5a2Y5Y+X5o6naW5wdXTnmoTlgLxcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZSA9IHRoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyhwcm9wcywgc3RhdGUpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDlpoLmnpznlKhFdmVudFBvcG92ZXLnmoTnirbmgIHlkozlj6Xmn4TnrqHnkIbmraTnu4Tku7bnmoTor53vvIxcclxuICAgICAgICAgKiDlvZPniLbnu4Tku7bmjqXlj5fnmoRwcm9wcy5ldmVudOWPkeeUn+aUueWPmOaXtu+8jOeKtuaAgeaXoOazlemaj+S5i+WPmOWMllxyXG4gICAgICAgICAqIOWIsOaXtuWAmeS+neeEtuimgeeUqOWIsOatpOmdmeaAgeaWueazleadpeabtOWFt3Byb3Bz5pu05paw54q25oCB44CCXHJcbiAgICAgICAgICog5omA5Lul5LiN5aaC55u05o6l5ZyoaW5wdXTnu4Tku7bkuK3lupTnlKjmraTpnZnmgIHmlrnms5XvvIxcclxuICAgICAgICAgKiDku6Xpgb/lhY3niLbnu4Tku7bph43mlrDmuLLmn5PpgKDmiJDnmoTliqjnlLvmlYjmnpxcclxuICAgICAgICAgKi9cclxuICAgICAgICBpZiAoIHByb3BzLmV2ZW50VGl0bGUgIT09IHN0YXRlLmV2ZW50VGl0bGUgKSB7XHJcbiAgICAgICAgICAgIC8v5b2TdGl0bGXlj5HnlJ/lj5jljJbml7bvvIzph43mlrDliJ3lp4vljJbnirbmgIFcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50VGl0bGU6IHByb3BzLmV2ZW50VGl0bGUsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogcHJvcHMuZXZlbnRUaXRsZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQ2hhbmdlKGUpIHtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBlLnRhcmdldC52YWx1ZX0pXHJcbiAgICAgICAgLy/lsIbkuovku7bkvKDpgJLkuIrljrtcclxuICAgICAgICB0aGlzLnByb3BzLm9uVGl0bGVDaGFuZ2UoZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwidGMtZWRpdHBvcHBlci1ldmVudHRpdGxlXCIgXHJcbiAgICAgICAgICAgICAgICBodG1sRm9yPXt0aGlzLnByb3BzLnRhcmdldEZvcm19XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9J2V2ZW50dGl0bGUnXHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCB7IEJ1dHRvbiwgQnV0dG9uR3JvdXAsIEJ1dHRvblRvb2xiYXIsIFNwbGl0QnV0dG9uLCBEcm9wZG93bkJ1dHRvbiwgTWVudUl0ZW0gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wb3ZlclRvb2xiYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxCdXR0b25Ub29sYmFyPlxyXG4gICAgICAgICAgICAgICAgPEJ1dHRvbkdyb3VwPlxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b24gaWQ9J3RjLWVkaXRwb3BwZXItc2F2ZScgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25TYXZlQnRuQ2xpY2t9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshdGhpcy5wcm9wcy5lbmFibGVTYXZlQnRufT5cclxuICAgICAgICAgICAgICAgICAgICAgICAg5L+d5a2YXHJcbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBpZD0ndGMtZWRpdHBvcHBlci1maW5pc2gnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25Db21wbGV0ZUJ0bkNsaWNrfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAg5a6M5oiQXHJcbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBpZD0ndGMtZWRpdHBvcHBlci1lZGl0Jz5cclxuICAgICAgICAgICAgICAgICAgICAgICAg57yW6L6RXHJcbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPFNwbGl0QnV0dG9uIHB1bGxSaWdodCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9J+WIoOmZpCcgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkPSd0Yy1lZGl0cG9wcGVyLWRlbGV0ZScgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25EZWxldGVEYXRhQnRuQ2xpY2t9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8TWVudUl0ZW0gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudEtleT1cIjFcIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPSd0Yy1lZGl0cG9wcGVyLW9wZW5FdmVudERvYydcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25PcGVuRG9jQnRuQ2xpY2t9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAg5omT5byA5rqQ5paH5qGjXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTWVudUl0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxNZW51SXRlbSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50S2V5PVwiMlwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9J3RjLWVkaXRwb3BwZXItZGVsZXRlRXZlbnREb2MnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLm9uRGVsZXRlRG9jQnRuQ2xpY2t9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAg5Yig6Zmk5rqQ5paH5qGjXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTWVudUl0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9TcGxpdEJ1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvQnV0dG9uR3JvdXA+XHJcbiAgICAgICAgICAgIDwvQnV0dG9uVG9vbGJhcj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IHsgRm9ybUdyb3VwLCBDb250cm9sTGFiZWwsIENvbCwgRm9ybUNvbnRyb2wgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5jb25zdCBIdWViZWUgPSByZXF1aXJlKCdodWViZWUvZGlzdC9odWViZWUucGtnZCcpOyBcclxuaW1wb3J0ICdodWViZWUvZGlzdC9odWViZWUuY3NzJztcclxuXHJcbi8vIOmHjeWGmeaWueazleS7peinpuWPkWNoYW5nZeS6i+S7tlxyXG5IdWViZWUucHJvdG90eXBlLnNldFRleHRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAoICF0aGlzLnNldFRleHRFbGVtcyApIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBmb3IgKCB2YXIgaT0wOyBpIDwgdGhpcy5zZXRUZXh0RWxlbXMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgdmFyIGVsZW0gPSB0aGlzLnNldFRleHRFbGVtc1tpXTtcclxuICAgICAgICB2YXIgcHJvcGVydHkgPSBlbGVtLm5vZGVOYW1lID09ICdJTlBVVCcgPyAndmFsdWUnIDogJ3RleHRDb250ZW50JztcclxuICAgICAgICAvLyDop6blj5FjaGFuZ2Xkuovku7ZcclxuICAgICAgICBpZiAoIGVsZW0udmFsdWUgIT0gdGhpcy5jb2xvciApIHtcclxuICAgICAgICAgICAgZWxlbVsgcHJvcGVydHkgXSA9IHRoaXMuY29sb3I7XHJcbiAgICAgICAgICAgIGVsZW0uZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2NoYW5nZScpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xvclBpY2tlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgIH1cclxuXHJcbiAgICAvL1RPRE86IOagueaNrumlseWSjOW6puiuoeeul+Wtl+S9k+minOiJslxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIC8vIOWIneWni+WMlue7hOS7tlxyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLmlucHV0Rm9ybUNvbnRyb2wpO1xyXG4gICAgICAgIHRoaXMuaHVlYmVlSW5zdGFuY2UgPSBuZXcgSHVlYmVlKHRoaXMuaW5wdXQsIHtcclxuICAgICAgICAgICAgc3RhdGljT3BlbjogZmFsc2UsIC8vIERpc3BsYXlzIG9wZW4gYW5kIHN0YXlzIG9wZW4uIFxyXG4gICAgICAgICAgICBzZXRUZXh0OiB0cnVlLCAvLyBTZXRzIGVsZW1lbnRz4oCZIHRleHQgdG8gY29sb3IuIOWwhuWOn+Wni+eahOaWh+acrOiuvue9ruiuvue9ruaIkOminOiJsuWAvC5cclxuICAgICAgICAgICAgc2V0QkdDb2xvcjogdHJ1ZSwgLy8gU2V0cyBlbGVtZW50c+KAmSBiYWNrZ3JvdW5kIGNvbG9yIHRvIGNvbG9yLlxyXG4gICAgICAgICAgICBodWVzOiAxMiwgLy8gTnVtYmVyIG9mIGh1ZXMgb2YgdGhlIGNvbG9yIGdyaWQuIEh1ZXMgYXJlIHNsaWNlcyBvZiB0aGUgY29sb3Igd2hlZWwuXHJcbiAgICAgICAgICAgIGh1ZTA6IDAsIC8vIFRoZSBmaXJzdCBodWUgb2YgdGhlIGNvbG9yIGdyaWQuIFxyXG4gICAgICAgICAgICBzaGFkZXM6IDUsIC8vIE51bWJlciBvZiBzaGFkZXMgb2YgY29sb3JzIGFuZCBzaGFkZXMgb2YgZ3JheSBiZXR3ZWVuIHdoaXRlIGFuZCBibGFjay4gXHJcbiAgICAgICAgICAgIHNhdHVyYXRpb25zOiAyLCAvLyBOdW1iZXIgb2Ygc2V0cyBvZiBzYXR1cmF0aW9uIG9mIHRoZSBjb2xvciBncmlkLlxyXG4gICAgICAgICAgICBub3RhdGlvbjogJ2hleCcsIC8vIFRleHQgc3ludGF4IG9mIGNvbG9ycyB2YWx1ZXMuXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZTogbnVsbCwgLy8gQ2xhc3MgYWRkZWQgdG8gSHVlYmVlIGVsZW1lbnQuIFVzZWZ1bCBmb3IgQ1NTLlxyXG4gICAgICAgICAgICBjdXN0b21Db2xvcnM6IFsgXHJcbiAgICAgICAgICAgICAgICAnIzMyQ0QzMicsICcjNTQ4NEVEJywgJyNBNEJERkUnLCBcclxuICAgICAgICAgICAgICAgICcjNDZENkRCJywgJyM3QUU3QkYnLCAnIzUxQjc0OScsXHJcbiAgICAgICAgICAgICAgICAnI0ZCRDc1QicsICcjRkZCODc4JywgJyNGRjg4N0MnLCBcclxuICAgICAgICAgICAgICAgICcjREMyMTI3JywgJyNEQkFERkYnLCAnI0UxRTFFMSdcdFxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIC8vVE9ETzog6K+75Y+W54i25YWD57SgaG9yaXpvbnRhbOWxnuaAp++8jOWGs+WumuadoeS7tua4suafk1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxGb3JtR3JvdXAgY29udHJvbElkPXt0aGlzLnByb3BzLmlkfT5cclxuICAgICAgICAgICAgICAgIDxDb2wgY29tcG9uZW50Q2xhc3M9e0NvbnRyb2xMYWJlbH0gc209ezJ9PlxyXG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxhYmVsfVxyXG4gICAgICAgICAgICAgICAgPC9Db2w+XHJcbiAgICAgICAgICAgICAgICA8Q29sIHNtPXsxMH0+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXsoaW5zdGFuY2UpID0+IHRoaXMuaW5wdXRGb3JtQ29udHJvbCA9IGluc3RhbmNlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy52YWx1ZX0gLy9oZXjoibLlvanlgLxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLy/mlLnlj5jpopzoibJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogYCR7dGhpcy5wcm9wcy52YWx1ZX1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seT17dGhpcy5wcm9wcy5yZWFkT25seX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMucHJvcHMub25JbnB1dENoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPC9Db2w+XHJcbiAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxyXG4gICAgICAgIClcclxuICAgIH1cclxufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIENvbnRyb2xMYWJlbCwgQ29sLCBGb3JtQ29udHJvbCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcbmltcG9ydCAnbW9tZW50JztcclxuaW1wb3J0ICdib290c3RyYXAvanMvY29sbGFwc2UnO1xyXG5pbXBvcnQgJ2Jvb3RzdHJhcC9qcy90cmFuc2l0aW9uJztcclxuaW1wb3J0ICdlb25hc2Rhbi1ib290c3RyYXAtZGF0ZXRpbWVwaWNrZXInO1xyXG5pbXBvcnQgJ2VvbmFzZGFuLWJvb3RzdHJhcC1kYXRldGltZXBpY2tlci9idWlsZC9jc3MvYm9vdHN0cmFwLWRhdGV0aW1lcGlja2VyLmNzcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRlVGltZVBpY2tlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICAvLyDliJ3lp4vljJbnu4Tku7ZcclxuICAgICAgICB0aGlzLmlucHV0ID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5pbnB1dEZvcm1Db250cm9sKTtcclxuICAgICAgICAkKHRoaXMuaW5wdXQpLmRhdGV0aW1lcGlja2VyKHtcclxuICAgICAgICAgICAgZm9ybWF0OiAnWVlZWS1NTS1ERCBISDptbTpzcydcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgLy9UT0RPOiDor7vlj5bniLblhYPntKBob3Jpem9udGFs5bGe5oCn77yM5Yaz5a6a5p2h5Lu25riy5p+TXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEZvcm1Hcm91cCBjb250cm9sSWQ9e3RoaXMucHJvcHMuaWR9PlxyXG4gICAgICAgICAgICAgICAgPENvbCBjb21wb25lbnRDbGFzcz17Q29udHJvbExhYmVsfSBzbT17Mn0+XHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMubGFiZWx9XHJcbiAgICAgICAgICAgICAgICA8L0NvbD5cclxuICAgICAgICAgICAgICAgIDxDb2wgc209ezEwfT5cclxuICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2wgdHlwZT1cInRleHRcIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXsoaW5zdGFuY2UpID0+IHRoaXMuaW5wdXRGb3JtQ29udHJvbCA9IGluc3RhbmNlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy52YWx1ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9e3RoaXMucHJvcHMucmVhZE9ubHl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLnByb3BzLm9uSW5wdXRDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDwvQ29sPlxyXG4gICAgICAgICAgICA8L0Zvcm1Hcm91cD5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9pbmRleC5jc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vaW5kZXguY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9pbmRleC5jc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0ICdmdWxsY2FsZW5kYXItcmVhY3R3cmFwcGVyL2Rpc3QvY3NzL2Z1bGxjYWxlbmRhci5taW4uY3NzJ1xyXG5pbXBvcnQgJ2Jvb3RzdHJhcC9kaXN0L2Nzcy9ib290c3RyYXAuY3NzJztcclxuaW1wb3J0ICdib290c3RyYXAvZGlzdC9jc3MvYm9vdHN0cmFwLXRoZW1lLmNzcyc7XHJcbmltcG9ydCAnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLWZyZWUvY3NzL2FsbC5jc3MnXHJcbmltcG9ydCBBcHAgZnJvbSAnLi9BcHAnO1xyXG5pbXBvcnQgJy4vaW5kZXguY3NzJztcclxuXHJcblJlYWN0RE9NLnJlbmRlcig8QXBwIC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpKTtcclxuXHJcbi8qXHJcbiQoZnVuY3Rpb24oKXtcclxuICAgIC8vIOWumuS5ieWPmOmHj1xyXG5cdGNvbnN0IGRhdGFMb2FkZXIgPSBuZXcgV2l6RXZlbnREYXRhTG9hZGVyKCk7XHJcblx0bGV0IGdfZWRpdFBvcHBlciwgZ19jcmVhdGVNb2RhbCwgZ19lZGl0TW9kYWw7XHJcblxyXG4gICAgY29uc3QgY2FsZW5kYXIgPSAkKCcjY2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoe1xyXG5cdFx0dGhlbWVTeXN0ZW06ICdzdGFuZGFyZCcsXHJcblx0XHRoZWlnaHQ6ICdwYXJlbnQnLFxyXG5cdFx0aGVhZGVyOiB7XHJcblx0XHRcdGxlZnQ6ICdwcmV2LG5leHQsdG9kYXknLFxyXG5cdFx0XHRjZW50ZXI6ICd0aXRsZScsXHJcblx0XHRcdHJpZ2h0OiAnbW9udGgsYWdlbmRhV2VlayxhZ2VuZGFEYXksbGlzdFdlZWsnXHJcblx0XHR9LFxyXG5cdFx0dmlld3M6IHtcclxuXHRcdFx0bW9udGg6IHtcclxuXHRcdFx0XHQvL3RpdGxlRm9ybWF0OiBnX2xvY190aXRsZWZvcm1hdF9tb250aCwgLy92YXIgZ19sb2NfdGl0bGVmb3JtYXRfbW9udGggPSBcIk1NTU0geXl5eVwiO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRhZ2VuZGE6IHtcclxuXHRcdFx0XHRtaW5UaW1lOiBcIjA4OjAwOjAwXCIsXHJcblx0XHRcdFx0c2xvdExhYmVsRm9ybWF0OiAnaCg6bW0pIGEnXHJcblx0XHRcdH0sXHJcblx0XHRcdGxpc3RXZWVrOiB7XHJcblxyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0bmF2TGlua3M6IHRydWUsXHJcblx0XHRhbGxEYXlEZWZhdWx0OiBmYWxzZSxcclxuXHRcdGRlZmF1bHRWaWV3OiAnYWdlbmRhV2VlaycsXHJcblx0XHRldmVudExpbWl0OiB0cnVlLFxyXG5cdFx0YnV0dG9uVGV4dDoge1xyXG5cdFx0XHR0b2RheTogJ+S7iuWkqScsXHJcblx0XHRcdG1vbnRoOiAn5pyIJyxcclxuXHRcdFx0d2VlazogJ+WRqCcsXHJcblx0XHRcdGRheTogJ+aXpScsXHJcblx0XHRcdGxpc3Q6ICfooagnXHJcbiAgICAgICAgfSxcclxuXHRcdG1vbnRoTmFtZXM6IFtcclxuICAgICAgICAgICAgJzHmnIgnLCAnMuaciCcsICcz5pyIJywgJzTmnIgnLCBcclxuICAgICAgICAgICAgJzXmnIgnLCAnNuaciCcsICc35pyIJywgJzjmnIgnLCBcclxuICAgICAgICAgICAgJznmnIgnLCAnMTDmnIgnLCAnMTHmnIgnLCAnMTLmnIgnXHJcbiAgICAgICAgXSxcclxuXHRcdG1vbnRoTmFtZXNTaG9ydDogW1xyXG4gICAgICAgICAgICAnMeaciCcsICcy5pyIJywgJzPmnIgnLCAnNOaciCcsIFxyXG4gICAgICAgICAgICAnNeaciCcsICc25pyIJywgJzfmnIgnLCAnOOaciCcsIFxyXG4gICAgICAgICAgICAnOeaciCcsICcxMOaciCcsICcxMeaciCcsICcxMuaciCdcclxuICAgICAgICBdLFxyXG5cdFx0ZGF5TmFtZXM6IFtcclxuICAgICAgICAgICAgJ+WRqOaXpScsICflkajkuIAnLCAn5ZGo5LqMJywgJ+WRqOS4iScsICflkajlm5snLCAn5ZGo5LqUJywgJ+WRqOWFrSdcclxuICAgICAgICBdLFxyXG5cdFx0ZGF5TmFtZXNTaG9ydDogW1xyXG4gICAgICAgICAgICAn5ZGo5pelJywgJ+WRqOS4gCcsICflkajkuownLCAn5ZGo5LiJJywgJ+WRqOWbmycsICflkajkupQnLCAn5ZGo5YWtJ1xyXG4gICAgICAgIF0sXHJcblx0XHRzZWxlY3RhYmxlOiB0cnVlLFxyXG5cdFx0c2VsZWN0SGVscGVyOiB0cnVlLFxyXG5cdFx0dW5zZWxlY3RDYW5jZWw6ICcubW9kYWwgKicsXHJcblx0XHRhbGxEYXlUZXh0OiAn5YWo5aSpJyxcclxuXHRcdG5vd0luZGljYXRvcjogdHJ1ZSxcclxuXHRcdGZvcmNlRXZlbnREdXJhdGlvbjogdHJ1ZSxcclxuXHRcdGZpcnN0RGF5OiAxLCAvLyDnrKzkuIDlpKnmmK/lkajkuIDov5jmmK/lkajlpKnvvIzkuI5kYXRlcGlja2Vy5b+F6aG755u45ZCMXHJcblx0XHRkcmFnT3BhY2l0eToge1xyXG5cdFx0XHRcIm1vbnRoXCI6IC41LFxyXG5cdFx0XHRcImFnZW5kYVdlZWtcIjogMSxcclxuXHRcdFx0XCJhZ2VuZGFEYXlcIjogMVxyXG5cdFx0fSxcclxuXHRcdGVkaXRhYmxlOiB0cnVlLFxyXG5cclxuXHRcdC8vIOWIt+aWsOinhuWbvu+8jOmHjeaWsOiOt+WPluaXpeWOhuS6i+S7tlxyXG5cdFx0dmlld1JlbmRlcjogZnVuY3Rpb24oIHZpZXcsIGVsZW1lbnQgKSB7XHJcblx0XHRcdC8vVE9ETzog5oSf6KeJ6L+Z5qC36YCg5oiQ5oCn6IO95LiK55qE5o2f5aSx77yM5piv5ZCm5pyJ5pu05aW955qE5pa55rOV77yfXHJcblx0XHRcdGNvbnN0IGNhbGVuZGFyID0gJCgnI2NhbGVuZGFyJyk7XHJcblx0XHRcdGNvbnN0IGV2ZW50U291cmNlcyA9IGRhdGFMb2FkZXIuZ2V0RXZlbnRTb3VyY2VzKCB2aWV3LCBlbGVtZW50ICk7XHJcblx0XHRcdGNhbGVuZGFyLmZ1bGxDYWxlbmRhcigncmVtb3ZlRXZlbnRzJyk7XHJcblx0XHRcdGZvciAobGV0IGk9MCA7IGkgPCBldmVudFNvdXJjZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRjYWxlbmRhci5mdWxsQ2FsZW5kYXIoJ2FkZEV2ZW50U291cmNlJywgZXZlbnRTb3VyY2VzW2ldKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8g6YCJ5oup5Yqo5L2c6Kem5Y+R55qE5LqL5Lu25Y+l5p+E77yM5a6a5LmJ5LqG5LiA5LiqY2FsbGJhY2tcclxuXHRcdHNlbGVjdDogZnVuY3Rpb24oc3RhcnQsIGVuZCwganNFdmVudCwgdmlldyl7XHJcblx0XHRcdC8vIOW8ueWHuuKAnOWIm+W7uuaXpeWOhuS6i+S7tuKAneeql+WPo1xyXG5cdFx0XHQvLyDliKTmlq3mmK/lkKbmuLLmn5NcclxuXHRcdFx0Ly9UT0RPOiDmg7Plip7ms5XkuI3opoHnlKjlhajlsYDlj5jph49cclxuXHRcdFx0aWYgKCAhd2luZG93LmdfY3JlYXRlTW9kYWwgKSBuZXcgRXZlbnRDcmVhdGVNb2RhbCh7c3RhcnQsIGVuZCwganNFdmVudCwgdmlld30pO1xyXG5cdFx0XHQvLyDkvKDpgJLlj4LmlbBcclxuXHRcdFx0d2luZG93LmdfY3JlYXRlTW9kYWwudXBkYXRlKHtzdGFydCwgZW5kLCBqc0V2ZW50LCB2aWV3fSk7XHJcblx0XHRcdHdpbmRvdy5nX2NyZWF0ZU1vZGFsLnNob3coKTtcclxuXHRcdH0sXHJcblxyXG5cdFx0ZXZlbnREcmFnU3RhcnQ6IGZ1bmN0aW9uKCBldmVudCwganNFdmVudCwgdWksIHZpZXcgKSB7IH0sXHJcblx0XHRldmVudERyYWdTdG9wOiBmdW5jdGlvbiggZXZlbnQsIGpzRXZlbnQsIHVpLCB2aWV3ICkgeyB9LFxyXG5cclxuXHRcdC8vIOaXpeWOhuS6i+S7tuaLluWKqCBldmVudCwgZGVsdGEsIHJldmVydEZ1bmMsIGpzRXZlbnQsIHVpLCB2aWV3XHJcblx0XHRldmVudERyb3A6IGZ1bmN0aW9uKGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXcpe1xyXG5cdFx0XHRpZiAoZXZlbnQuaWQpe1xyXG5cdFx0XHRcdGRhdGFMb2FkZXIudXBkYXRlRXZlbnREYXRhT25Ecm9wKGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXcpXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV2ZXJ0RnVuYygpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cclxuXHRcdC8vIOaXpeWOhuS6i+S7tuaXpeacn+iMg+WbtOmHjee9rlxyXG5cdFx0ZXZlbnRSZXNpemU6IGZ1bmN0aW9uKGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXcpe1xyXG5cdFx0XHRpZiAoZXZlbnQuaWQpe1xyXG5cdFx0XHRcdGRhdGFMb2FkZXIudXBkYXRlRXZlbnREYXRhT25SZXNpemUoZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV2ZXJ0RnVuYygpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cclxuXHRcdGV2ZW50UmVuZGVyOiBmdW5jdGlvbihldmVudE9iaiwgJGVsKSB7XHJcblx0XHRcdC8vIOWFg+e0oOW3sue7j+a4suafk++8jOWPr+S/ruaUueWFg+e0oFxyXG5cdFx0XHRjb25zdCBpc0NvbXBsZXRlID0gcGFyc2VJbnQoZXZlbnRPYmouY29tcGxldGUpID09IDU7XHJcblx0XHRcdGlmICggaXNDb21wbGV0ZSApIHtcclxuXHRcdFx0XHQvLyDmoLflvI9cclxuXHRcdFx0XHQkZWwuYWRkQ2xhc3MoJ3RjLWNvbXBsZXRlJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHR9LFxyXG5cclxuXHRcdC8vIOaXpeWOhuS6i+S7tueCueWHu+WQjuS6i+S7tuWPpeafhFxyXG5cdFx0ZXZlbnRDbGljazogZnVuY3Rpb24oIGV2ZW50LCBqc0V2ZW50LCB2aWV3ICkge1xyXG5cdFx0XHQvLyB0aGlzIOaMh+WQkeWMheijueS6i+S7tueahDxhPuWFg+e0oFxyXG5cclxuXHRcdFx0Ly8g5Yik5pat5piv5ZCm5bey57uP5riy5p+T5by556qXXHJcblx0XHRcdGlmICggIWdfZWRpdFBvcHBlciApIHtcclxuXHRcdFx0XHRnX2VkaXRQb3BwZXIgPSByZW5kZXJFZGl0UG9wcGVyKHtcclxuXHRcdFx0XHRcdCdldmVudCc6IGV2ZW50LFxyXG5cdFx0XHRcdFx0J2pzRXZlbnQnOiBqc0V2ZW50LFxyXG5cdFx0XHRcdFx0J3ZpZXcnOiB2aWV3XHJcblx0XHRcdFx0fSwgdGhpcykuRXZlbnRQb3BvdmVyKCdzaG93Jyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Ly8g5pu05pawcmVmZXJlbmNlXHJcblx0XHRcdFx0Z19lZGl0UG9wcGVyLkV2ZW50UG9wb3Zlcignb3B0aW9uJywge1xyXG5cdFx0XHRcdFx0YXJnczoge1xyXG5cdFx0XHRcdFx0XHQnZXZlbnQnOiBldmVudCxcclxuXHRcdFx0XHRcdFx0J2pzRXZlbnQnOiBqc0V2ZW50LFxyXG5cdFx0XHRcdFx0XHQndmlldyc6IHZpZXdcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR0aXRsZTogZXZlbnQudGl0bGUsXHJcblx0XHRcdFx0XHRyZWZlcmVuY2U6IHRoaXNcclxuXHRcdFx0XHR9KS5FdmVudFBvcG92ZXIoJ3VwZGF0ZScpLkV2ZW50UG9wb3Zlcignc2hvdycpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cdFx0XHJcblx0fSlcclxufSlcclxuKi8iLCJpbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcbmltcG9ydCAnZnVsbGNhbGVuZGFyJztcclxuaW1wb3J0IHsgV2l6RGF0YWJhc2UgYXMgZ19kYiwgV2l6Q29tbW9uVUkgYXMgZ19jbW59IGZyb20gJy4uL3V0aWxzL1dpekludGVyZmFjZSc7XHJcbmltcG9ydCBDb25maWcgZnJvbSAnLi4vdXRpbHMvQ29uZmlnJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbGVuZGFyRXZlbnQge1xyXG5cdC8qKlxyXG4gICAgICog5Yib5bu65LiA5Liq6YCa55So5pel56iLLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIOWOn+Wni+aVsOaNruexu+Wei++8jOWPr+S7peaYryBXaXpFdmVudCwgRnVsbENhbGVuZGFyRXZlbnQg5Lul5Y+KIEdVSUQuXHJcbiAgICAgKi9cclxuXHRjb25zdHJ1Y3RvciggZGF0YSwgY2FsZW5kYXIgKSB7XHJcblx0XHRpZiAoIWdfZGIpIHRocm93IG5ldyBFcnJvcignSVdpekRhdGFiYXNlIGlzIG5vdCB2YWxpZC4nKTtcclxuXHRcdHRoaXMuJGNhbGVuZGFyID0gJChjYWxlbmRhcik7XHJcblx0XHRjb25zdCB0eXBlID0gdGhpcy5fY2hlY2tEYXRhVHlwZShkYXRhKTtcclxuXHRcdHN3aXRjaCAoIHR5cGUgKSB7XHJcblx0XHRcdGNhc2UgXCJXaXpFdmVudFwiOlxyXG5cdFx0XHRjYXNlIFwiRnVsbENhbGVuZGFyRXZlbnRcIjpcclxuXHRcdFx0XHR0aGlzLl9jcmVhdGUoZGF0YSwgdHlwZSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgXCJHVUlEXCI6XHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdC8vVE9ETzog6I635b6XV2l6RXZlbnTmlbDmja7vvIzlubbliJvlu7rlr7nosaFcclxuXHRcdFx0XHRcdGNvbnN0IGRvYyA9IGdfZGIuRG9jdW1lbnRGcm9tR1VJRChkYXRhKTtcclxuXHRcdFx0XHRcdGNvbnN0IG5ld0V2ZW50RGF0YSA9IHtcclxuXHRcdFx0XHRcdFx0XCJDQUxFTkRBUl9FTkRcIiA6IGRvYy5HZXRQYXJhbVZhbHVlKCdDQUxFTkRBUl9FTkQnKSxcclxuXHRcdFx0XHRcdFx0XCJDQUxFTkRBUl9JTkZPXCIgOiBkb2MuR2V0UGFyYW1WYWx1ZSgnQ0FMRU5EQVJfSU5GTycpLFxyXG5cdFx0XHRcdFx0XHRcIkNBTEVOREFSX0VYVFJBSU5GT1wiIDogZG9jLkdldFBhcmFtVmFsdWUoJ0NBTEVOREFSX0VYVFJBSU5GTycpLFxyXG5cdFx0XHRcdFx0XHRcIkNBTEVOREFSX1NUQVJUXCIgOiBkb2MuR2V0UGFyYW1WYWx1ZSgnQ0FMRU5EQVJfU1RBUlQnKSxcclxuXHRcdFx0XHRcdFx0XCJDQUxFTkRBUl9SRUNVUlJFTkNFXCIgOiBkb2MuR2V0UGFyYW1WYWx1ZSgnQ0FMRU5EQVJfUkVDVVJSRU5DRScpLFxyXG5cdFx0XHRcdFx0XHRcIkNBTEVOREFSX0VORFJFQ1VSUkVOQ0VcIiA6IGRvYy5HZXRQYXJhbVZhbHVlKCdDQUxFTkRBUl9FTkRSRUNVUlJFTkNFJyksXHJcblx0XHRcdFx0XHRcdFwiY3JlYXRlZFwiIDogbW9tZW50KGRvYy5EYXRlQ3JlYXRlZCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyksXHJcblx0XHRcdFx0XHRcdFwiZ3VpZFwiIDogZG9jLkdVSUQsXHJcblx0XHRcdFx0XHRcdFwidGl0bGVcIiA6IGRvYy5UaXRsZSxcclxuXHRcdFx0XHRcdFx0XCJ1cGRhdGVkXCIgOiBtb21lbnQoZG9jLkRhdGVNb2RpZmllZCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJylcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHRoaXMuX2NyZWF0ZShuZXdFdmVudERhdGEsICdXaXpFdmVudCcpO1xyXG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHsgY29uc29sZS5lcnJvcihlKTsgfVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdF9jcmVhdGUoZGF0YSwgdHlwZSkge1xyXG5cdFx0bGV0IHN0YXJ0LCBlbmQsIGlkLCBia0NvbG9yLCBhbGxEYXksIGNvbXBsZXRlLCBkYXRlQ29tcGxldGVkLCBycHRSdWxlLCBycHRFbmQ7XHJcblx0XHRzd2l0Y2ggKHR5cGUpIHtcclxuXHRcdFx0Y2FzZSBcIkdVSURcIjpcclxuXHRcdFx0Y2FzZSBcIldpekV2ZW50XCI6XHJcblx0XHRcdFx0dGhpcy5fSW5mbyA9IHRoaXMuX3BhcnNlSW5mbyhkYXRhLkNBTEVOREFSX0lORk8pO1xyXG5cdFx0XHRcdHRoaXMuX0V4dHJhSW5mbyA9IGRhdGEuQ0FMRU5EQVJfRVhUUkFJTkZPID8gdGhpcy5fcGFyc2VJbmZvKGRhdGEuQ0FMRU5EQVJfRVhUUkFJTkZPKSA6IHRoaXMuX2dldERlZmF1bHRFeHRyYUluZm8oKTtcclxuXHRcdFx0XHQvLyDnu5/kuIDlj5jph49cclxuXHRcdFx0XHRpZCA9IGRhdGEuZ3VpZDtcclxuXHRcdFx0XHRzdGFydCA9IGRhdGEuQ0FMRU5EQVJfU1RBUlQ7XHJcblx0XHRcdFx0ZW5kID0gZGF0YS5DQUxFTkRBUl9FTkQ7XHJcblx0XHRcdFx0Ly8g5Yik5pat5piv5ZCm55So5oi36Ieq5a6a5LmJ6IOM5pmv6Imy77yM5ZCR5LiL5YW85a655Y6f54mI5pel5Y6GXHJcblx0XHRcdFx0YmtDb2xvciA9IHRoaXMuX0luZm8uY2kgPyAoIHBhcnNlSW50KHRoaXMuX0luZm8uY2kpID09IDAgPyB0aGlzLl9JbmZvLmIgOiBDb25maWcuY29sb3JJdGVtc1t0aGlzLl9JbmZvLmNpXS5jb2xvclZhbHVlICkgOiB0aGlzLl9JbmZvLmI7XHJcblx0XHRcdFx0YWxsRGF5ID0gZGF0YS5DQUxFTkRBUl9FTkQuaW5kZXhPZihcIjIzOjU5OjU5XCIpICE9IC0xID8gdHJ1ZSA6IGZhbHNlO1xyXG5cdFx0XHRcdGNvbXBsZXRlID0gdGhpcy5fRXh0cmFJbmZvLkNvbXBsZXRlO1xyXG5cdFx0XHRcdGRhdGVDb21wbGV0ZWQgPSB0aGlzLl9FeHRyYUluZm8uRGF0ZUNvbXBsZXRlZDtcclxuXHRcdFx0XHQvLyDph43lpI3kuovku7ZcclxuXHRcdFx0XHRycHRSdWxlID0gZGF0YS5DQUxFTkRBUl9SRUNVUlJFTkNFO1xyXG5cdFx0XHRcdHJwdEVuZCA9IGRhdGEuQ0FMRU5EQVJfRU5EUkVDVVJSRU5DRTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBcIkZ1bGxDYWxlbmRhckV2ZW50XCI6XHJcblx0XHRcdFx0aWQgPSBkYXRhLmlkO1xyXG5cdFx0XHRcdHN0YXJ0ID0gZGF0YS5zdGFydDtcclxuXHRcdFx0XHRlbmQgPSBkYXRhLmVuZDtcclxuXHRcdFx0XHRia0NvbG9yID0gZGF0YS5iYWNrZ3JvdW5kQ29sb3I7XHJcblx0XHRcdFx0YWxsRGF5ID0gZGF0YS5hbGxEYXkgPyBkYXRhLmFsbERheSA6ICEkLmZ1bGxDYWxlbmRhci5tb21lbnQoZGF0YS5zdGFydCkuaGFzVGltZSgpO1xyXG5cdFx0XHRcdGNvbXBsZXRlID0gZGF0YS5jb21wbGV0ZSB8fCAwO1xyXG5cdFx0XHRcdGRhdGVDb21wbGV0ZWQgPSBkYXRhLmRhdGVDb21wbGV0ZWQgfHwgJyc7XHJcblx0XHRcdFx0cnB0UnVsZSA9IGRhdGEucnB0UnVsZTtcclxuXHRcdFx0XHRycHRFbmQgPSBkYXRhLnJwdEVuZFxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignQ2FuIG5vdCBpZGVudGlmeSBkYXRhIHR5cGUuJyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0XHQvLyDln7rmnKzkv6Hmga9cclxuXHRcdHRoaXMuaWQgPSBpZDtcclxuXHRcdHRoaXMudGl0bGUgPSBkYXRhLnRpdGxlO1xyXG5cdFx0Ly8g5pe26Ze05L+h5oGvXHJcblx0XHR0aGlzLmFsbERheSA9IGFsbERheTtcclxuXHRcdC8vIOazqOaEj++8gXN0YXJ0L2VuZCDlj6/og73mmK9tb21lbnTlr7nosaHmiJbogIVzdHLvvIzmiYDku6XkuIDlvovlhYjovazmjaLmiJBtb21lbnTlho3moLzlvI/ljJbovpPlh7pcclxuXHRcdHRoaXMuc3RhcnQgPSBhbGxEYXkgPyBtb21lbnQoc3RhcnQpLmZvcm1hdChcIllZWVktTU0tRERcIikgOiBtb21lbnQoc3RhcnQpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0dGhpcy5lbmQgPSBhbGxEYXkgPyBtb21lbnQoZW5kKS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpIDogbW9tZW50KGVuZCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHR0aGlzLmNyZWF0ZWQgPSBkYXRhLmNyZWF0ZWQgPyBkYXRhLmNyZWF0ZWQgOiBtb21lbnQoc3RhcnQpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0dGhpcy51cGRhdGVkID0gZGF0YS51cGRhdGVkID8gZGF0YS51cGRhdGVkIDogbW9tZW50KCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHQvLyDorr7nva7kv6Hmga9cclxuXHRcdHRoaXMudGV4dENvbG9yID0gJ2JsYWNrJztcclxuXHRcdHRoaXMuYmFja2dyb3VuZENvbG9yID0gYmtDb2xvcjtcclxuXHRcdHRoaXMuY29tcGxldGUgPSBjb21wbGV0ZTtcclxuXHRcdHRoaXMuZGF0ZUNvbXBsZXRlZCA9IGRhdGVDb21wbGV0ZWQ7XHJcblx0XHQvLyDph43lpI3kuovku7ZcclxuXHRcdHRoaXMucnB0UnVsZSA9IHJwdFJ1bGU7XHJcblx0XHR0aGlzLnJwdEVuZCA9IHJwdEVuZDtcclxuXHRcdC8vXHJcblx0XHR0aGlzLl91cGRhdGUoKTtcclxuXHR9XHJcblxyXG5cdF9jaGVja0RhdGFUeXBlKGRhdGEpIHtcclxuXHRcdGNvbnN0IG9iakNsYXNzID0gZGF0YS5jb25zdHJ1Y3RvcjtcclxuICAgICAgICBjb25zdCBHVUlEX1JlZ0V4ciA9IC9eWzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtNV1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn0kL2k7XHJcbiAgICAgICAgbGV0IHR5cGU7XHJcbiAgICAgICAgc3dpdGNoIChvYmpDbGFzcykge1xyXG4gICAgICAgICAgICBjYXNlIFN0cmluZzpcclxuICAgICAgICAgICAgICAgIGlmICggR1VJRF9SZWdFeHIudGVzdChkYXRhKSApIHR5cGUgPSBcIkdVSURcIjtcclxuICAgICAgICAgICAgICAgIGVsc2UgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGRhdGEsIGNhbm5vdCBjcmVhdGUgQ2FsZW5kYXJFdmVudCBvYmplY3QuJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBPYmplY3Q6XHJcblx0XHRcdFx0aWYgKCBkYXRhLkNBTEVOREFSX0lORk8gJiYgZGF0YS50aXRsZSApIHsgXHJcblx0XHRcdFx0XHR0eXBlID0gJ1dpekV2ZW50JztcclxuXHRcdFx0XHR9IGVsc2UgaWYgKCBkYXRhLnN0YXJ0ICYmIGRhdGEudGl0bGUgKSB7XHJcblx0XHRcdFx0XHR0eXBlID0gJ0Z1bGxDYWxlbmRhckV2ZW50JztcclxuXHRcdFx0XHR9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHR5cGU7XHJcblx0fTtcclxuXHJcblx0X3BhcnNlSW5mbyhJbmZvU3RyaW5nKSB7XHJcblx0XHRjb25zdCBJbmZvT2JqZWN0ID0ge307XHJcblx0XHQvLyDmi4bop6NDQUxFTkRBUl9JTkZPXHJcblx0XHRjb25zdCBJbmZvQXJyYXkgPSBJbmZvU3RyaW5nLnNwbGl0KCcvJyk7XHJcblx0XHRJbmZvQXJyYXkuZm9yRWFjaChmdW5jdGlvbihpdGVtLCBpbmRleCwgYXJyKXtcclxuXHRcdFx0Y29uc3QgcGFpciA9IGl0ZW0uc3BsaXQoJz0nKTtcclxuXHRcdFx0SW5mb09iamVjdFtwYWlyWzBdXSA9IHBhaXJbMV07XHJcblx0XHR9KTtcclxuXHRcdC8vIOWkhOeQhuminOiJsuWAvFxyXG5cdFx0aWYgKCBJbmZvT2JqZWN0LmIgKSBJbmZvT2JqZWN0LmIgPSAnIycgKyBJbmZvT2JqZWN0LmI7XHJcblxyXG5cdFx0cmV0dXJuIEluZm9PYmplY3Q7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcbiAgICAgKiDlsIYgSW5mbyDlr7nosaHluo/liJfljJYuXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gW0luZm9PYmplY3Q9XSDmj5DkvpsgSW5mbyDlr7nosaHvvIzpu5jorqTkuLpgdGhpcy5fSW5mb2AuXHJcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IOi/lOWbnueUqOS6jkluZm/lr7nosaHlrZfnrKbkuLIuXHJcbiAgICAgKi9cclxuXHRfc3RyaW5naWZ5SW5mbyggSW5mb09iamVjdCA9IHRoaXMuX0luZm8gKSB7XHJcblx0XHRpZiAoICFJbmZvT2JqZWN0ICkgcmV0dXJuICcnO1xyXG5cdFx0Y29uc3QgSW5mb0FycmF5ID0gW107XHJcblx0XHRjb25zdCBJbmZvT2JqZWN0S2V5c0FycmF5ID0gT2JqZWN0LmtleXMoSW5mb09iamVjdCk7XHJcblx0XHRJbmZvT2JqZWN0S2V5c0FycmF5LmZvckVhY2goZnVuY3Rpb24oaXRlbSwgaW5kZXgsIGFycil7XHJcblx0XHRcdGNvbnN0IHNpbmdsZUluZm8gPSBgJHtpdGVtfT0ke0luZm9PYmplY3RbaXRlbV19YDtcclxuXHRcdFx0SW5mb0FycmF5LnB1c2goc2luZ2xlSW5mbyk7XHJcblx0XHR9KTtcclxuXHRcdHJldHVybiBJbmZvQXJyYXkuam9pbignLycpLnJlcGxhY2UoJyMnLCAnJyk7XHJcblx0fTtcclxuXHJcblx0X3VwZGF0ZSgpIHtcclxuXHRcdHRoaXMuX3VwZGF0ZUluZm8oKTtcclxuXHRcdHRoaXMuX3VwZGF0ZUV4dHJhSW5mbygpO1xyXG5cdH07XHJcblxyXG5cdF91cGRhdGVJbmZvKCkge1xyXG5cdFx0Y29uc3QgdGhhdCA9IHRoaXM7XHJcblx0XHRjb25zdCBJbmZvT2JqZWN0ID0ge1xyXG5cdFx0XHQnYic6IG51bGwsIC8v6IOM5pmv6ImyaGV45YC8XHJcblx0XHRcdCdyJzogJy0xJywgLy/mj5DphpLmlrnlvI9cclxuXHRcdFx0J2MnOiAnMCcsIC8v57uT5p2f5o+Q6YaS5L+h5oGvXHJcblx0XHRcdCdjaSc6IDAgLy/og4zmma/oibJJRO+8jOm7mOiupCAwIOihqOekuuiDjOaZr+S4uueUqOaIt+iHquWumuS5iVxyXG5cdFx0fTtcclxuXHRcdC8vIOabtOaWsOiDjOaZr+iJsidiJ1xyXG5cdFx0SW5mb09iamVjdFsnYiddID0gdGhpcy5iYWNrZ3JvdW5kQ29sb3IucmVwbGFjZSgnIycsICcnKTtcclxuXHRcdC8vIOabtOaWsOminOiJsuaMh+aVsCdjaSdcclxuXHRcdENvbmZpZy5jb2xvckl0ZW1zLmZvckVhY2goZnVuY3Rpb24oaXRlbSwgaW5kZXgsIGFycil7XHJcblx0XHRcdGlmICggaXRlbS5jb2xvclZhbHVlID09ICB0aGF0LmJhY2tncm91bmRDb2xvciApIHtcclxuXHRcdFx0XHQvLyDlvZPml6XnqIvog4zmma/oibLkuI7oibLooajljLnphY3ml7bliJnnlKggY29sb3IgaWRleCDmnaXlgqjlrZjvvIjlhbzlrrnljp/niYjml6Xljobmj5Lku7bvvIlcclxuXHRcdFx0XHRJbmZvT2JqZWN0WydjaSddID0gaW5kZXg7XHJcblx0XHRcdH07XHJcblx0XHR9KTtcclxuXHRcdC8vIOW6lOeUqOabtOaWsFxyXG5cdFx0dGhpcy5fSW5mbyA9IEluZm9PYmplY3Q7XHJcblx0fTtcclxuXHJcblx0X2dldERlZmF1bHRFeHRyYUluZm8oKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHQnQ29tcGxldGUnOiAwLCAvL1xyXG5cdFx0XHQnRGF0ZUNvbXBsZXRlZCc6ICcnLCAvLyBJU08g5qCH5YeG5pel5pyf5a2X56ym5LiyIFlZWVktTU0tREQgMDA6MDA6MDBcclxuXHRcdFx0J1ByaW9yJzogMFxyXG5cdFx0fTtcclxuXHR9O1xyXG5cclxuXHRfdXBkYXRlRXh0cmFJbmZvKCkge1xyXG5cdFx0Y29uc3QgRXh0cmFJbmZvT2JqZWN0ID0ge1xyXG5cdFx0XHQnQ29tcGxldGUnOiAwLFxyXG5cdFx0XHQnRGF0ZUNvbXBsZXRlZCc6ICcnLFxyXG5cdFx0XHQnUHJpb3InOiAwXHJcblx0XHR9O1xyXG5cdFx0RXh0cmFJbmZvT2JqZWN0WydDb21wbGV0ZSddID0gdGhpcy5jb21wbGV0ZTtcclxuXHRcdEV4dHJhSW5mb09iamVjdFsnRGF0ZUNvbXBsZXRlZCddID0gdGhpcy5kYXRlQ29tcGxldGVkO1xyXG5cdFx0dGhpcy5fRXh0cmFJbmZvID0gRXh0cmFJbmZvT2JqZWN0O1xyXG5cdH07XHJcblxyXG5cdF9nZXRFdmVudEh0bWwodGl0bGUgPSB0aGlzLnRpdGxlLCBjb250ZW50ID0gJycpe1xyXG5cdFx0Y29uc3QgaHRtbFRleHQgPSBcclxuXHRcdFx0YDxodG1sPlxyXG5cdFx0XHRcdDxoZWFkPlxyXG5cdFx0XHRcdFx0PG1ldGEgaHR0cC1lcXVpdj1cIkNvbnRlbnQtVHlwZVwiIGNvbnRlbnQ9XCJ0ZXh0L2h0bWw7IGNoYXJzZXQ9dW5pY29kZVwiPlxyXG5cdFx0XHRcdFx0PHRpdGxlPiR7dGl0bGV9PC90aXRsZT4gXHJcblx0XHRcdFx0PC9oZWFkPlxyXG5cdFx0XHRcdDxib2R5PlxyXG5cdFx0XHRcdFx0PCEtLVdpekh0bWxDb250ZW50QmVnaW4tLT5cclxuXHRcdFx0XHRcdDxkaXY+JHtjb250ZW50fTwvZGl2PlxyXG5cdFx0XHRcdFx0PCEtLVdpekh0bWxDb250ZW50RW5kLS0+XHJcblx0XHRcdFx0PC9ib2R5PlxyXG5cdFx0XHQ8L2h0bWw+YDtcclxuXHRcclxuXHRcdCAgcmV0dXJuIGh0bWxUZXh0XHJcblx0fTtcclxuXHJcblx0LyoqXHJcbiAgICAgKiDmoLnmja7ml6XnqIvnmoTph43lpI3op4TliJnnlJ/miJAgRnVsbENhbGVuZGFyIGV2ZW50U291cmNlLlxyXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBzdGFydCDmn6Xor6Lotbflp4vvvIxJU08g5qCH5YeG5pel5pyf5a2X56ym5LiyLlxyXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBlbmQg5p+l6K+i57uT5p2f77yMSVNPIOagh+WHhuaXpeacn+Wtl+espuS4si5cclxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IGV2ZW50U291cmNlLlxyXG4gICAgICovXHJcblx0Z2VuZXJhdGVSZXBlYXRFdmVudHMoc3RhcnQsIGVuZCkge1xyXG5cdFx0aWYgKCAhdGhpcy5ycHRSdWxlICkgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgZmluZCBDYWxlbmRhckV2ZW50IHJlcGVhdCBydWxlLicpO1xyXG5cdFx0Y29uc3QgZXZlbnRTb3VyY2UgPSB7XHJcblx0XHRcdGlkOiB0aGlzLmlkLFxyXG5cdFx0XHRldmVudHM6IFtdXHJcblx0XHR9XHJcblx0XHQvL+agueaNrnJwdFJ1bGXnlJ/miJDph43lpI3ml6XmnJ/vvIzlubbnlJ/miJDkuovku7ZcclxuXHRcdGNvbnN0IGRheUFycmF5ID0gdGhpcy5fZ2V0UmVuZGVyUmVwZWF0RGF5KHN0YXJ0LCBlbmQpO1xyXG5cdFx0Zm9yICggbGV0IGRheSBvZiBkYXlBcnJheSApIHtcclxuXHRcdFx0Ly8gZGF5IOaYr+S4gOS4qk1vbWVudOaXpeacn+WvueixoVxyXG5cdFx0XHRjb25zdCBuZXdFdmVudCA9IHRoaXMudG9GdWxsQ2FsZW5kYXJFdmVudCgpO1xyXG5cdFx0XHRuZXdFdmVudC5zdGFydCA9IGRheS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0bmV3RXZlbnQuZW5kID0gbW9tZW50KG5ld0V2ZW50LmVuZCkuYWRkKCBkYXkuZGlmZiggbW9tZW50KHRoaXMuc3RhcnQpICkgKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0ZXZlbnRTb3VyY2UuZXZlbnRzLnB1c2gobmV3RXZlbnQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBldmVudFNvdXJjZTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuICAgICAqIOagueaNruinhOWImeeUn+aIkOaXpeacn+aVsOe7hFxyXG4gICAgICogQHJldHVybnMge09iamVjdFtdfSDljIXlkKvkuIDns7vliJdgTW9tZW50YOaXpeacn+WvueixoeeahOaVsOe7hC5cclxuICAgICAqL1xyXG5cdF9nZXRSZW5kZXJSZXBlYXREYXkoc3RhcnQsIGVuZCkge1xyXG5cdFx0Y29uc3QgcnB0UnVsZSA9IHRoaXMucnB0UnVsZTtcclxuXHRcdGxldCBkYXlBcnJheTtcclxuXHRcdGxldCByZWdleDtcclxuXHRcdGNvbnNvbGUuY291bnQocnB0UnVsZSk7XHJcblx0XHRpZiAoIChyZWdleCA9IC9eRXZlcnkoXFxkKT9XZWVrcz8oXFxkKikkLykudGVzdChycHRSdWxlKSApIHtcclxuXHRcdFx0Ly8g5q+PWzEyMzRd5ZGoWzcxMjM0NTZdXHJcblx0XHRcdGNvbnN0IGN1cldlZWtEYXkgPSBtb21lbnQodGhpcy5zdGFydCkuZGF5KCk7XHJcblx0XHRcdGNvbnN0IHJlc3VsdHMgPSByZWdleC5leGVjKHJwdFJ1bGUpO1xyXG5cdFx0XHRjb25zdCBpbnRlcldlZWsgPSByZXN1bHRzWzFdO1xyXG5cdFx0XHRjb25zdCBudW1iZXIgPSByZXN1bHRzWzJdIHx8IGAke2N1cldlZWtEYXl9YDtcclxuXHRcdFx0ZGF5QXJyYXkgPSB0aGlzLl9nZXRXZWVrbHlSZXBlYXREYXkobnVtYmVyLCBzdGFydCwgZW5kLCBpbnRlcldlZWspO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoIChyZWdleCA9IC9eRXZlcnlXZWVrZGF5KFxcZCopJC8pLnRlc3QocnB0UnVsZSkgKSB7XHJcblx0XHRcdC8vIOavj+S4quW3peS9nOaXpUV2ZXJ5V2Vla2RheTEzNVxyXG5cdFx0XHRjb25zdCByZXN1bHRzID0gcmVnZXguZXhlYyhycHRSdWxlKTtcclxuXHRcdFx0Y29uc3QgbnVtYmVyID0gcmVzdWx0c1sxXSB8fCAnMTIzNDUnO1xyXG5cdFx0XHRkYXlBcnJheSA9IHRoaXMuX2dldFdlZWtseVJlcGVhdERheShudW1iZXIsIHN0YXJ0LCBlbmQpO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoIChyZWdleCA9IC9EYWlseXxXZWVrbHl8TW9udGhseXxZZWFybHkvKS50ZXN0KHJwdFJ1bGUpICkge1xyXG5cdFx0XHQvLyBEYWlseXxXZWVrbHl8TW9udGhseXxZZWFybHlcclxuXHRcdFx0Y29uc3QgcGVyUnVsZSA9IHJlZ2V4LmV4ZWMocnB0UnVsZSlbMF1cclxuXHRcdFx0ZGF5QXJyYXkgPSB0aGlzLl9nZXRQZXJSZXBlYXREYXlzKHN0YXJ0LCBlbmQsIHBlclJ1bGUpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZGF5QXJyYXk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcbiAgICAgKiDmoLnmja7mr4/lkajop4TliJnnlJ/miJDml6XmnJ/mlbDnu4RcclxuXHQgKiBAcGFyYW0ge1N0cmluZ30gbnVtYmVyIOaVtOaVsOWtl+espuS4suihqOekuueahOinhOWIme+8m1xyXG4gICAgICogQHJldHVybnMge09iamVjdFtdfSDljIXlkKvkuIDns7vliJdNb21lbnTml6XmnJ/lr7nosaHnmoTmlbDnu4QuXHJcbiAgICAgKi9cclxuXHRfZ2V0V2Vla2x5UmVwZWF0RGF5KG51bWJlciwgc3RhcnQsIGVuZCwgaW50ZXJXZWVrcyA9ICcxJykge1xyXG5cdFx0Ly/ov5Tlm55be3N0YXJ0LCBlbmR9LCB7c3RhcnQsIGVuZH0sIHtzdGFydCwgZW5kfV1cclxuXHRcdC8v6ICD6JmR5riy5p+T6IyD5Zu077yM5Lul5Y+K57uT5p2f5b6q546v55qE5pel5pyfXHJcblx0XHRjb25zdCB2aWV3U3RhcnQgPSBtb21lbnQodGhpcy5zdGFydCk7XHJcblx0XHRjb25zdCB2aWV3RW5kID0gbW9tZW50KGVuZCk7XHJcblx0XHRjb25zdCBycHRFbmQgPSB0aGlzLnJwdEVuZCA/IG1vbWVudCh0aGlzLnJwdEVuZCkgOiB2aWV3RW5kO1xyXG5cdFx0bGV0IGRheUFycmF5ID0gW107XHJcblx0XHRjb25zdCBpbnRlcnZhbFdlZWtzID0gaW50ZXJXZWVrcyA/IHBhcnNlSW50KGludGVyV2Vla3MpIDogMTtcclxuXHRcdGNvbnN0IHdlZWtkYXlzID0gbnVtYmVyLnJlcGxhY2UoJzcnLCAnMCcpLnNwbGl0KCcnKTsgLy/lkajml6Uwfjblkajlha1cclxuXHRcdGZvciAoIGxldCBkYXkgb2Ygd2Vla2RheXMgKSB7XHJcblx0XHRcdC8vXHJcblx0XHRcdGxldCBjdXJXZWVrRGF5ID0gcGFyc2VJbnQoZGF5KSwgbmV3RXZlbnRTdGFydERhdGUgPSBtb21lbnQodmlld1N0YXJ0KTtcclxuXHRcdFx0ZG8ge1xyXG5cdFx0XHRcdC8vIOWIm+W7uuaWsE1vbWVudOWvueixoVxyXG5cdFx0XHRcdG5ld0V2ZW50U3RhcnREYXRlID0gbW9tZW50KHZpZXdTdGFydCkuZGF5KGN1cldlZWtEYXkpO1xyXG5cdFx0XHRcdC8vIOagueaNruaXpeeoi+iuvue9rnRpbWUgcGFydFxyXG5cdFx0XHRcdGNvbnN0IGV2ZW50U3RhcnQgPSBtb21lbnQodGhpcy5zdGFydClcclxuXHRcdFx0XHRuZXdFdmVudFN0YXJ0RGF0ZS5zZXQoe1xyXG5cdFx0XHRcdFx0J2hvdXInOiBldmVudFN0YXJ0LmdldCgnaG91cicpLFxyXG5cdFx0XHRcdFx0J21pbnV0ZSc6IGV2ZW50U3RhcnQuZ2V0KCdtaW51dGUnKSxcclxuXHRcdFx0XHRcdCdzZWNvbmQnOiBldmVudFN0YXJ0LmdldCgnc2Vjb25kJylcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC8vIOmBv+WFjeWIneWni+mHjeWkjea4suafk1xyXG5cdFx0XHRcdGlmICggIW5ld0V2ZW50U3RhcnREYXRlLmlzU2FtZSggZXZlbnRTdGFydCApICkgZGF5QXJyYXkucHVzaCggbW9tZW50KG5ld0V2ZW50U3RhcnREYXRlKSApO1xyXG5cdFx0XHRcdC8vIOmalOWkmuWwkeWRqOmHjeWkjVxyXG5cdFx0XHRcdGN1cldlZWtEYXkgKz0gNyppbnRlcnZhbFdlZWtzO1xyXG5cdFx0XHRcdC8vY29uc29sZS5sb2coIG1vbWVudChuZXdFdmVudFN0YXJ0RGF0ZSkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJykgKTtcclxuXHRcdFx0fSB3aGlsZSAoIG1vbWVudCh2aWV3U3RhcnQpLmRheShjdXJXZWVrRGF5ICsgNyApLmlzQmVmb3JlKCB2aWV3RW5kICkgXHJcblx0XHRcdFx0XHRcdCYmIG1vbWVudCh2aWV3U3RhcnQpLmRheShjdXJXZWVrRGF5ICsgNyApLmlzQmVmb3JlKCBycHRFbmQgKSAgKVxyXG5cdFx0XHRcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIGRheUFycmF5O1xyXG5cdH07XHJcblxyXG5cdF9nZXRQZXJSZXBlYXREYXlzKHN0YXJ0LCBlbmQsIHBlclJ1bGUpIHtcclxuXHRcdGNvbnN0IHBlclJ1bGVNYXAgPSB7XHJcblx0XHRcdCdEYWlseSc6ICdkYXlzJyxcclxuXHRcdFx0J1dlZWtseScgOiAnd2Vla3MnLFxyXG5cdFx0XHQnTW9udGhseScgOiAnbW9udGhzJyxcclxuXHRcdFx0J1llYXJseScgOiAneWVhcnMnXHJcblx0XHR9O1xyXG5cdFx0Y29uc3Qgdmlld1N0YXJ0ID0gbW9tZW50KHRoaXMuc3RhcnQpO1xyXG5cdFx0Y29uc3Qgdmlld0VuZCA9IG1vbWVudChlbmQpO1xyXG5cdFx0Y29uc3QgcnB0RW5kID0gdGhpcy5ycHRFbmQgPyBtb21lbnQodGhpcy5ycHRFbmQpIDogdmlld0VuZDtcclxuXHRcdGxldCBkYXlBcnJheSA9IFtdO1xyXG5cdFx0Y29uc3QgZXZlbnRTdGFydCA9IG1vbWVudCh0aGlzLnN0YXJ0KVxyXG5cdFx0ZG8ge1xyXG5cdFx0XHQvLyDlop7liqDkuIDkuKrmnIhcclxuXHRcdFx0ZXZlbnRTdGFydC5hZGQoMSwgcGVyUnVsZU1hcFtwZXJSdWxlXSk7XHJcblx0XHRcdGRheUFycmF5LnB1c2goIG1vbWVudChldmVudFN0YXJ0KSApO1xyXG5cdFx0fSB3aGlsZSAoIGV2ZW50U3RhcnQuaXNCZWZvcmUoIHZpZXdFbmQgKSAmJiBldmVudFN0YXJ0LmlzQmVmb3JlKCBycHRFbmQgKSApO1xyXG5cclxuXHRcdHJldHVybiBkYXlBcnJheTtcclxuXHR9XHJcblxyXG5cdHRvRnVsbENhbGVuZGFyRXZlbnQoKSB7XHJcblx0XHQvLyDms6jmhI/mlrnms5Xov5Tlm57nmoTlj6rmmK9GdWxsQ2FsZW5kYXJFdmVudOeahOaVsOaNruexu+Wei++8jOW5tuS4jeaYr2V2ZW505a+56LGhXHJcblx0XHRjb25zdCB0aGF0ID0gdGhpcztcclxuXHRcdGNvbnN0IG5ld0V2ZW50ID0ge307XHJcblx0XHRjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGhpcyk7XHJcblx0XHQvLyDljrvpmaTpnZ7lv4XopoHlsZ7mgKdcclxuXHRcdGtleXMuc3BsaWNlKCBrZXlzLmZpbmRJbmRleCggKGkpID0+IGkgPT0gJ19JbmZvJyApLCAxKTtcclxuXHRcdGtleXMuc3BsaWNlKCBrZXlzLmZpbmRJbmRleCggKGkpID0+IGkgPT0gJ19FeHRyYUluZm8nICksIDEpO1xyXG5cdFx0Ly8g5rWF5ou36LSdLCDkuI3ov4fkuLvopoHlsZ7mgKfpg73mmK/ln7rmnKzmlbDmja7nsbvlnovvvIzmiYDku6XkuI3lrZjlnKjlvJXnlKjpl67pophcclxuXHRcdGtleXMuZm9yRWFjaChmdW5jdGlvbihpdGVtLCBpbmRleCwgYXJyKXtcclxuXHRcdFx0bmV3RXZlbnRbaXRlbV0gPSB0aGF0W2l0ZW1dO1xyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gbmV3RXZlbnQ7XHJcblx0fTtcclxuXHJcblx0dG9XaXpFdmVudERhdGEoKSB7XHJcblx0XHR0aGlzLl91cGRhdGUoKTtcclxuXHRcdGNvbnN0IG5ld0V2ZW50ID0ge307XHJcblx0XHRuZXdFdmVudC50aXRsZSA9IHRoaXMudGl0bGU7XHJcblx0XHRuZXdFdmVudC5ndWlkID0gdGhpcy5pZDtcclxuXHRcdG5ld0V2ZW50LkNBTEVOREFSX1NUQVJUID0gdGhpcy5hbGxEYXkgPyBtb21lbnQodGhpcy5zdGFydCkuZm9ybWF0KCdZWVlZLU1NLUREIDAwOjAwOjAwJykgOiB0aGlzLnN0YXJ0O1xyXG5cdFx0bmV3RXZlbnQuQ0FMRU5EQVJfRU5EID0gdGhpcy5hbGxEYXkgPyBtb21lbnQodGhpcy5lbmQpLmZvcm1hdCgnWVlZWS1NTS1ERCAyMzo1OTo1OScpIDogdGhpcy5lbmQ7XHJcblx0XHRuZXdFdmVudC5DQUxFTkRBUl9JTkZPID0gdGhpcy5fc3RyaW5naWZ5SW5mbyh0aGlzLl9JbmZvKTtcclxuXHRcdG5ld0V2ZW50LkNBTEVOREFSX0VYVFJBSU5GTyA9IHRoaXMuX3N0cmluZ2lmeUluZm8odGhpcy5fRXh0cmFJbmZvKTtcclxuXHRcdG5ld0V2ZW50LmNyZWF0ZWQgPSB0aGlzLmNyZWF0ZWQ7XHJcblx0XHRuZXdFdmVudC51cGRhdGVkID0gdGhpcy51cGRhdGVkO1xyXG5cdFx0cmV0dXJuIG5ld0V2ZW50O1xyXG5cdH07XHJcblxyXG5cdGFkZFRvRnVsbENhbGVuZGFyKCkge1xyXG5cdFx0Ly9UT0RPOiDlsIboh6rouqvmt7vliqDliLBGdWxsQ2FsZW5kYXJcclxuXHRcdHRoaXMuJGNhbGVuZGFyLmZ1bGxDYWxlbmRhciggJ2FkZEV2ZW50U291cmNlJywge1xyXG5cdFx0XHRldmVudHM6IFtcclxuXHRcdFx0XHR0aGlzLnRvRnVsbENhbGVuZGFyRXZlbnQoKVxyXG5cdFx0XHRdXHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRfc2F2ZUFsbFByb3AoKSB7XHJcblx0XHQvL1RPRE86IOS/neWtmOWFqOmDqOaVsOaNruWMheaLrFRpdGxlXHJcblx0XHQvLyDmm7TmlrDkuovku7bmlofmoaPmlbDmja5cclxuXHRcdGNvbnN0IGRvYyA9IGdfZGIuRG9jdW1lbnRGcm9tR1VJRCh0aGlzLmlkKTtcclxuXHRcdC8vIOS/neWtmOagh+mimFxyXG5cdFx0ZG9jLlRpdGxlID0gdGhpcy50aXRsZTtcclxuXHRcdC8vIOS/neWtmOaXtumXtOaVsOaNrlxyXG5cdFx0aWYgKCB0aGlzLmFsbERheSApIHtcclxuXHRcdFx0bGV0IHN0YXJ0U3RyID0gbW9tZW50KHRoaXMuc3RhcnQpLnNldCh7J2gnOiAwLCAnbSc6IDAsICdzJzogMH0pLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHRsZXQgZW5kU3RyID0gbW9tZW50KHRoaXMuZW5kKS5zZXQoeydoJzogMjMsICdtJzogNTksICdzJzogNTl9KS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfU1RBUlRcIiwgc3RhcnRTdHIpO1xyXG5cdFx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9FTkRcIiwgZW5kU3RyKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGxldCBzdGFydFN0ciA9IG1vbWVudCh0aGlzLnN0YXJ0KS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0bGV0IGVuZFN0ciA9IG1vbWVudCh0aGlzLmVuZCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX1NUQVJUXCIsIHN0YXJ0U3RyKTtcclxuXHRcdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfRU5EXCIsIGVuZFN0cik7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8g5L+d5a2YIENBTEVOREFSX0lORk9cclxuXHRcdHRoaXMuX3VwZGF0ZSgpO1xyXG5cdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfSU5GT1wiLCB0aGlzLl9zdHJpbmdpZnlJbmZvKHRoaXMuX0luZm8pKTtcclxuXHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX0VYVFJBSU5GT1wiLCB0aGlzLl9zdHJpbmdpZnlJbmZvKHRoaXMuX0V4dHJhSW5mbykpO1xyXG5cdH07XHJcblxyXG5cdC8vIOiuvue9ruaWh+aho+WxnuaAp+WAvFxyXG5cdF9zZXRQYXJhbVZhbHVlKGRvYywga2V5LCB2YWx1ZSkge1xyXG5cdFx0aWYgKCFkb2MpIHJldHVybiBmYWxzZTtcclxuXHRcdGRvYy5TZXRQYXJhbVZhbHVlKGtleSwgdmFsdWUpO1xyXG5cdH07XHJcblxyXG5cdF9jcmVhdGVXaXpFdmVudERvYygpIHtcclxuXHRcdC8vVE9ETzog5L+d5a2Y5YWo6YOo5pWw5o2u5YyF5ousVGl0bGVcclxuXHRcdC8vIOWIm+W7uldpekRvY1xyXG5cdFx0Y29uc3QgbG9jYXRpb24gPSBgTXkgRXZlbnRzLyR7IG1vbWVudCh0aGlzLnN0YXJ0KS5mb3JtYXQoJ1lZWVktTU0nKSB9L2A7XHJcblx0XHRjb25zdCBvYmpGb2xkZXIgPSBnX2RiLkdldEZvbGRlckJ5TG9jYXRpb24obG9jYXRpb24sIHRydWUpO1xyXG5cdFx0Y29uc3QgdGVtcEh0bWwgPSBnX2Ntbi5HZXRBVGVtcEZpbGVOYW1lKCcuaHRtbCcpO1xyXG5cdFx0Y29uc3QgaHRtbFRleHQgPSB0aGlzLl9nZXRFdmVudEh0bWwodGhpcy50aXRsZSwgJycpO1xyXG5cdFx0Z19jbW4uU2F2ZVRleHRUb0ZpbGUodGVtcEh0bWwsIGh0bWxUZXh0LCAndW5pY29kZScpO1xyXG5cdFx0Y29uc3QgZG9jID0gb2JqRm9sZGVyLkNyZWF0ZURvY3VtZW50Mih0aGlzLnRpdGxlLCBcIlwiKTtcclxuXHRcdGRvYy5DaGFuZ2VUaXRsZUFuZEZpbGVOYW1lKHRoaXMudGl0bGUpO1xyXG5cdFx0ZG9jLlVwZGF0ZURvY3VtZW50Nih0ZW1wSHRtbCwgdGVtcEh0bWwsIDB4MjIpO1xyXG5cdFx0Ly8g6K6+572u5qCH562+XHJcblx0XHQvL2lmICggdGFncyApIGRvYy5TZXRUYWdzVGV4dDIodGFncywgXCJDYWxlbmRhclwiKTtcclxuXHRcdC8vIOWwhuS/oeaBr+e8lueggeWIsFdpekRvY+WxnuaAp+S4reWOu1xyXG5cdFx0Y29uc3QgbmV3RXZlbnQgPSB0aGlzLnRvV2l6RXZlbnREYXRhKCk7XHJcblx0XHRkb2MuQWRkVG9DYWxlbmRhcihuZXdFdmVudC5DQUxFTkRBUl9TVEFSVCwgbmV3RXZlbnQuQ0FMRU5EQVJfRU5ELCBuZXdFdmVudC5DQUxFTkRBUl9JTkZPKTtcclxuXHRcdC8vIGNoYW5nZSBkYXRhYmFzZVxyXG5cdFx0ZG9jLnR5cGUgPSBcImV2ZW50XCI7XHJcblx0XHQvL1xyXG5cdFx0dGhpcy5pZCA9IGRvYy5HVUlEO1xyXG5cdH1cclxuXHJcblx0c2F2ZVRvV2l6RXZlbnREb2MoIHByb3AgPSAnYWxsJyApIHtcclxuXHRcdGlmICghZ19kYiB8fCAhZ19jbW4pIHRocm93IG5ldyBFcnJvcignSVdpekRhdGFiYXNlIG9yIElXaXpDb21tb25VSSBpcyBub3QgdmFsaWQuJyk7XHJcblx0XHQvL+ajgOafpeaWh+aho+aYr+WQpuWtmOWcqFxyXG5cdFx0Y29uc3QgZ3VpZFJlZ2V4ID0gL15bMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfSQvaTtcclxuXHRcdGNvbnN0IGlzV2l6RG9jRXhpc3QgPSBndWlkUmVnZXgudGVzdCh0aGlzLmlkKTtcclxuXHRcdC8vIOWIm+W7uuaIluiAheabtOaWsOaWh+aho1xyXG5cdFx0aWYgKCBpc1dpekRvY0V4aXN0ICkge1xyXG5cdFx0XHQvLyDmoLnmja7mjIfku6Tmm7TmlrDlhoXlrrlcclxuXHRcdFx0dGhpcy5fc2F2ZUFsbFByb3AoKTtcclxuXHRcdFx0Ly8g5pu05pawRnVsbENhbGVuZGFyXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQvLyDliJvlu7rmlrDnmoTkuovku7bmlofmoaNcclxuXHRcdFx0dGhpcy5fY3JlYXRlV2l6RXZlbnREb2MoKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdH07XHJcblxyXG5cdGRlbGV0ZUV2ZW50RGF0YSggaXNEZWxldGVEb2MgPSBmYWxzZSApe1xyXG5cdFx0bGV0IGRvYyA9IGdfZGIuRG9jdW1lbnRGcm9tR1VJRCh0aGlzLmlkKTtcclxuXHRcdGlmICghZG9jKSB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgZmluZCBFdmVudCByZWxhdGVkIFdpekRvY3VtZW50LicpXHJcblx0XHQvLyDnp7vpmaRGdWxsQ2FsZW5kYXLkuovku7ZcclxuXHRcdHRoaXMuJGNhbGVuZGFyLmZ1bGxDYWxlbmRhcigncmVtb3ZlRXZlbnRzJywgdGhpcy5pZCk7XHJcblx0XHQvLyDnp7vpmaTml6XljobmlbDmja5cclxuXHRcdGRvYy5SZW1vdmVGcm9tQ2FsZW5kYXIoKTtcclxuXHRcdC8vIOWIoOmZpOaWh+aho1xyXG5cdFx0aWYgKCBpc0RlbGV0ZURvYyApIGRvYy5EZWxldGUoKTtcclxuXHR9XHJcblxyXG5cdHJlZmV0Y2hEYXRhKCkge1xyXG5cdFx0Ly9UT0RPOiDph43mlbDmja7lupPph43mlrDojrflj5bmlbDmja7mm7TmlrDlrp7kvotcclxuXHR9O1xyXG5cclxuXHRyZWZyZXNoRXZlbnQoZXZlbnQpIHtcclxuXHRcdC8vVE9ETzog5bqU6K+l6Ieq5Yqo6YGN5Y6G5bm25L+u5pS55bGe5oCnXHJcblx0XHRpZiAoIGV2ZW50ICkge1xyXG5cdFx0XHQvLyDph43mlrDmuLLmn5NGdWxsQ2FsZW5kYXLkuovku7ZcclxuXHRcdFx0ZXZlbnQudGl0bGUgPSB0aGlzLnRpdGxlO1xyXG5cdFx0XHRldmVudC5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmJhY2tncm91bmRDb2xvcjtcclxuXHRcdFx0dGhpcy4kY2FsZW5kYXIuZnVsbENhbGVuZGFyKCd1cGRhdGVFdmVudCcsIGV2ZW50KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdC8v55SoLmZ1bGxDYWxlbmRhcigg4oCYY2xpZW50RXZlbnRz4oCZIFssIGlkT3JGaWx0ZXIgXSApIC0+IEFycmF5IOiOt+WPlua6kOaVsOaNruS7juiAjOabtOaWsFxyXG5cdFx0XHQvL1RPRE86IOmBjeWOhuW5tuWvu+aJvkdVSUTljLnphY3nmoTkuovku7ZcclxuXHRcdH1cclxuXHR9XHJcblxyXG59IiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcclxuaW1wb3J0IFdpekV2ZW50RGF0YUxvYWRlciBmcm9tICcuLi9tb2RlbHMvV2l6RXZlbnREYXRhTG9hZGVyJztcclxuaW1wb3J0IENhbGVuZGFyRXZlbnQgZnJvbSAnLi4vbW9kZWxzL0NhbGVuZGFyRXZlbnQnO1xyXG5pbXBvcnQgeyBXaXpDb25maXJtLCBXaXpDb21tb25VSSBhcyBvYmpDb21tb24sIFdpekRhdGFiYXNlIGFzIG9iakRhdGFiYXNlLCBXaXpFeHBsb3JlcldpbmRvdyBhcyBvYmpXaW5kb3cgfSBmcm9tICcuLi91dGlscy9XaXpJbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybUhhbmRsZXMge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy4kY2FsZW5kYXIgPSAkKCcjY2FsZW5kYXInKVxyXG4gICAgfTtcclxuXHJcbiAgICBvbkNyZWF0ZUJ0bkNsaWNrKHN0YXJ0LCBlbmQsIGpzRXZlbnQsIHZpZXcsIGZvcm1Ob2RlKSB7XHJcbiAgICAgICAgY29uc3QgdGl0bGUgPSAkKGZvcm1Ob2RlKS5maW5kKCcjdGMtY3JlYXRlcGFnZS1ldmVudHRpdGxlJykudmFsKCk7XHJcbiAgICAgICAgY29uc3QgY29sb3IgPSAkKGZvcm1Ob2RlKS5maW5kKCcjdGMtY3JlYXRlcGFnZS1ldmVudGNvbG9yJykudmFsKCk7XHJcbiAgICAgICAgbmV3IFdpekV2ZW50RGF0YUxvYWRlcigpLmNyZWF0ZUV2ZW50KHtzdGFydCwgZW5kLCBqc0V2ZW50LCB2aWV3fSwge3RpdGxlLCBjb2xvcn0pOyAvLyDov5nkuIDmraXogJfml7ZcclxuICAgICAgICAkKGZvcm1Ob2RlKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICQoJyNjYWxlbmRhcicpLmZ1bGxDYWxlbmRhcigndW5zZWxlY3QnKTtcclxuICAgIH07XHJcblxyXG4gICAgb25TYXZlQnRuQ2xpY2soZXZlbnQsIG5ld0V2ZW50RGF0YSkge1xyXG4gICAgICAgIGZvciAoY29uc3QgcHJvcCBpbiBuZXdFdmVudERhdGEpIHtcclxuICAgICAgICAgICAgZXZlbnRbcHJvcF0gPSBuZXdFdmVudERhdGFbcHJvcF1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g6YeN5paw5riy5p+TXHJcbiAgICAgICAgdGhpcy4kY2FsZW5kYXIuZnVsbENhbGVuZGFyKCAndXBkYXRlRXZlbnQnLCBldmVudCApO1xyXG4gICAgICAgIC8vIOS/ruaUuea6kOaVsOaNrlxyXG4gICAgICAgIGNvbnN0IG5ld0V2ZW50ID0gbmV3IENhbGVuZGFyRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgIG5ld0V2ZW50LnNhdmVUb1dpekV2ZW50RG9jKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIG9uQ29tcGxldGVCdG5DbGljayhldmVudCkge1xyXG4gICAgICAgIC8vIOS/ruaUueaVsOaNrlxyXG4gICAgICAgIGNvbnN0IGlzQ29tcGxldGUgPSBwYXJzZUludChldmVudC5jb21wbGV0ZSkgPT0gNTtcclxuICAgICAgICBpZiAoIGlzQ29tcGxldGUgKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LmNvbXBsZXRlID0gJzAnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGV2ZW50LmNvbXBsZXRlID0gJzUnO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDkv53lrZjmlbDmja5cclxuICAgICAgICBjb25zdCBuZXdFdmVudCA9IG5ldyBDYWxlbmRhckV2ZW50KGV2ZW50KTtcclxuICAgICAgICBuZXdFdmVudC5zYXZlVG9XaXpFdmVudERvYygpO1xyXG4gICAgICAgIC8vIOmHjeaWsOa4suafk1xyXG4gICAgICAgIHRoaXMuJGNhbGVuZGFyLmZ1bGxDYWxlbmRhciggJ3VwZGF0ZUV2ZW50JywgZXZlbnQgKTtcclxuICAgIH07XHJcblxyXG4gICAgb25EZWxldGVEYXRhQnRuQ2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoIFdpekNvbmZpcm0oXCLnoa7lrpropoHliKDpmaTor6Xml6XnqIvvvJ9cIiwgJ+eVquiMhOWKqeeQhicpICkge1xyXG4gICAgICAgICAgICAvLyDliKDpmaTml6XnqItcclxuICAgICAgICAgICAgbGV0IG5ld0V2ZW50ID0gbmV3IENhbGVuZGFyRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgICAgICBuZXdFdmVudC5kZWxldGVFdmVudERhdGEoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgb25EZWxldGVEb2NCdG5DbGljayhldmVudCkge1xyXG4gICAgICAgIGlmICggV2l6Q29uZmlybShcIuehruWumuimgeWIoOmZpOivpeaXpeeoi+a6kOaWh+aho++8n1xcbuOAjOehruWumuOAjeWwhuS8muWvvOiHtOebuOWFs+eslOiusOiiq+WIoOmZpO+8gVwiLCAn55Wq6IyE5Yqp55CGJykgKSB7XHJcbiAgICAgICAgICAgIGxldCBuZXdFdmVudCA9IG5ldyBDYWxlbmRhckV2ZW50KGV2ZW50KTtcclxuICAgICAgICAgICAgbmV3RXZlbnQuZGVsZXRlRXZlbnREYXRhKHRydWUpO1xyXG4gICAgICAgIH1cdFxyXG4gICAgfTtcclxuXHJcbiAgICBvbkVkaXRPcmlnaW5CdG5DbGljayhldmVudCkge1xyXG4gICAgICAgIGNvbnN0IGRvYyA9IG9iakRhdGFiYXNlLkRvY3VtZW50RnJvbUdVSUQoZXZlbnQuaWQpO1xyXG4gICAgICAgIG9iakNvbW1vbi5FZGl0Q2FsZW5kYXJFdmVudChkb2MpO1xyXG4gICAgfTtcclxuXHJcbiAgICBvbk9wZW5Eb2NCdG5DbGljayhldmVudCkge1xyXG4gICAgICAgIGNvbnN0IGRvYyA9IG9iakRhdGFiYXNlLkRvY3VtZW50RnJvbUdVSUQoZXZlbnQuaWQpO1xyXG4gICAgICAgIG9ialdpbmRvdy5WaWV3RG9jdW1lbnQoZG9jLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBXaXpEYXRhYmFzZSBhcyBvYmpEYXRhYmFzZSB9IGZyb20gJy4uL3V0aWxzL1dpekludGVyZmFjZSc7XHJcbmltcG9ydCBDYWxlbmRhckV2ZW50IGZyb20gJy4vQ2FsZW5kYXJFdmVudCc7XHJcblxyXG4vKiDmlbDmja7ojrflj5ZcclxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG4vKiog6K+l57G75LiOV2l6bm90ZeeahFdpekRhdGFiYXNl5o6l5Y+j5Lqk5o2i5L+h5oGv77yM6I635Y+W5pWw5o2uICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdpekV2ZW50RGF0YUxvYWRlciB7XHJcblx0LyoqXHJcbiAgICAgKiDliJvpgKDkuIDkuKrkuovku7bmlbDmja7liqDovb3lmaguXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHN0YXJ0IOafpeivoui1t+Wni+aXpeacn++8jElTT+agh+WHhuaXpeacn+Wtl+espuS4si5cclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZW5kIOafpeivouaIquiHs+aXpeacn++8jElTT+agh+WHhuaXpeacn+Wtl+espuS4si5cclxuICAgICAqL1xyXG5cdGNvbnN0cnVjdG9yKGNhbGVuZGFyKSB7XHJcblx0XHRpZiAoIW9iakRhdGFiYXNlKSB0aHJvdyBuZXcgRXJyb3IoJ1dpekRhdGFiYXNlIG5vdCB2YWxpZCAhJyk7XHJcblx0XHR0aGlzLkRhdGFiYXNlID0gb2JqRGF0YWJhc2U7XHJcblx0XHR0aGlzLnVzZXJOYW1lID0gb2JqRGF0YWJhc2UuVXNlck5hbWU7XHJcblx0XHR0aGlzLiRjYWxlbmRhciA9ICQoY2FsZW5kYXIpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG4gICAgICog6I635b6X5riy5p+T5ZCO55qE5omA5pyJRnVsbENhbGVuZGFy5LqL5Lu2LlxyXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSB2aWV3IGlzIHRoZSBWaWV3IE9iamVjdCBvZiBGdWxsQ2FsZW5kYXIgZm9yIHRoZSBuZXcgdmlldy5cclxuXHQgKiBAcGFyYW0ge29iamVjdH0gZWxlbWVudCBpcyBhIGpRdWVyeSBlbGVtZW50IGZvciB0aGUgY29udGFpbmVyIG9mIHRoZSBuZXcgdmlldy5cclxuICAgICAqIEByZXR1cm4ge09iamVjdFtdfSDov5Tlm57nlKjkuo5GdWxsQ2FsZW5kYXIg5riy5p+T55qEIGV2ZW50U291cmNlcyDmlbDnu4QuXHJcbiAgICAgKi9cclxuXHRnZXRFdmVudFNvdXJjZXMoIHZpZXcsIGVsZW1lbnQgKXtcclxuXHRcdGNvbnN0IHZpZXdTdGFydCA9IHZpZXcuc3RhcnQuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRjb25zdCB2aWV3RW5kID0gdmlldy5lbmQuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRsZXQgZXZlbnRTb3VyY2VzID0gW107XHJcblx0XHQvL+iOt+WPluaZrumAmuaXpeeoi1xyXG5cdFx0Y29uc3QgZ2VuZXJhbEV2ZW50U291cmNlID0ge1xyXG5cdFx0XHR0eXBlOiAnZ2VuZXJhbEV2ZW50cycsXHJcblx0XHRcdC8vZXZlbnRzOiB0aGlzLl9nZXRBbGxPcmlnaW5hbEV2ZW50KFtdLCB0aGlzLl9kMnMoY3VycmVudFZpZXcuc3RhcnQudG9EYXRlKCkpLCB0aGlzLl9kMnMoY3VycmVudFZpZXcuZW5kLnRvRGF0ZSgpKSlcclxuXHRcdFx0ZXZlbnRzOiB0aGlzLl9nZXRBbGxPcmlnaW5hbEV2ZW50KHZpZXdTdGFydCwgdmlld0VuZClcclxuXHRcdH1cclxuXHRcdGV2ZW50U291cmNlcy5wdXNoKGdlbmVyYWxFdmVudFNvdXJjZSk7XHJcblx0XHRcclxuXHRcdC8vVE9ETzog6I635Y+W6YeN5aSN5pel56iLXHJcblx0XHRjb25zdCByZXBlYXRFdmVudFNvdXJjZXMgPSB0aGlzLl9nZXRBbGxSZXBlYXRFdmVudCh2aWV3U3RhcnQsIHZpZXdFbmQpO1xyXG5cdFx0ZXZlbnRTb3VyY2VzID0gZXZlbnRTb3VyY2VzLmNvbmNhdChyZXBlYXRFdmVudFNvdXJjZXMpO1xyXG5cdFx0Ly9cclxuXHRcdHJldHVybiBldmVudFNvdXJjZXM7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcbiAgICAgKiDku45XaXpEYXRhYmFzZeS4reiOt+WPluaJgOacieaVsOaNruaWh+ahoy5cclxuXHQgKiBAcGFyYW0ge2FycmF5fSBldmVudHMg5Yid5aeL5LqL5Lu25pWw57uELlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBzdGFydCBJU0/moIflh4bml6XmnJ/lrZfnrKbkuLIuXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGVuZCBJU0/moIflh4bml6XmnJ/lrZfnrKbkuLIuXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3RbXX0g6L+U5Zue55So5LqORnVsbENhbGVuZGFy5riy5p+T55qE5LqL5Lu25pWw57uELlxyXG4gICAgICovXHJcblx0X2dldEFsbE9yaWdpbmFsRXZlbnQoc3RhcnQsIGVuZCl7XHJcblx0XHRjb25zdCBldmVudHMgPSBbXTtcclxuXHRcdGxldCBzcWwgPSBgRE9DVU1FTlRfTE9DQVRJT04gbm90IGxpa2UgJy9EZWxldGVkIEl0ZW1zLyUnIGFuZCAoS0JfR1VJRCBpcyBudWxsIG9yIEtCX0dVSUQgPSAnJylgO1xyXG5cdFx0bGV0IGFuZDEgPSBgIGFuZCBET0NVTUVOVF9HVUlEIGluIChzZWxlY3QgRE9DVU1FTlRfR1VJRCBmcm9tIFdJWl9ET0NVTUVOVF9QQVJBTSB3aGVyZSBQQVJBTV9OQU1FID0gJ0NBTEVOREFSX1NUQVJUJyAgYW5kICBQQVJBTV9WQUxVRSA8PSAnJHtlbmR9JyApYDtcclxuXHRcdGxldCBhbmQyID0gYCBhbmQgRE9DVU1FTlRfR1VJRCBpbiAoc2VsZWN0IERPQ1VNRU5UX0dVSUQgZnJvbSBXSVpfRE9DVU1FTlRfUEFSQU0gd2hlcmUgUEFSQU1fTkFNRSA9ICdDQUxFTkRBUl9FTkQnICBhbmQgIFBBUkFNX1ZBTFVFID49ICcke3N0YXJ0fScgKWA7XHJcblx0XHRpZiAoc3RhcnQpIHNxbCArPSBhbmQyO1xyXG5cdFx0aWYgKGVuZCkgc3FsICs9IGFuZDE7XHJcblx0XHRpZiAob2JqRGF0YWJhc2UuRG9jdW1lbnRzRGF0YUZyb21TUUwpIHtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRjb25zdCBkYXRhID0gb2JqRGF0YWJhc2UuRG9jdW1lbnRzRGF0YUZyb21TUUwoc3FsKTtcclxuXHRcdFx0XHRpZiAoICFkYXRhICkgcmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdGNvbnN0IG9iaiA9IEpTT04ucGFyc2UoZGF0YSk7XHJcblx0XHRcdFx0aWYgKCAhb2JqIHx8ICFBcnJheS5pc0FycmF5KG9iaikgKSByZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpICsrKSB7XHJcblx0XHRcdFx0XHRldmVudHMucHVzaChcclxuXHRcdFx0XHRcdFx0bmV3IENhbGVuZGFyRXZlbnQob2JqW2ldLCB0aGlzLiRjYWxlbmRhcikudG9GdWxsQ2FsZW5kYXJFdmVudCgpXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRcclxuXHRcdFx0XHRyZXR1cm4gZXZlbnRzO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNhdGNoKGVycikge1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0RvY3VtZW50c0RhdGFGcm9tU1FMIG1ldGhvZCBvZiBXaXpEYXRhYmFzZSBub3QgZXhpc3QhJyk7XHJcblx0XHRcdC8qXHJcblx0XHRcdGxldCBkb2NDb2xsZXRpb24gPSBvYmpEYXRhYmFzZS5Eb2N1bWVudHNGcm9tU1FMKHNxbCk7XHJcblx0XHRcdC8vXHJcblx0XHRcdGlmIChkb2NDb2xsZXRpb24gJiYgZG9jQ29sbGV0aW9uLkNvdW50KXtcclxuXHRcdFx0XHRsZXQgZG9jO1xyXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZG9jQ29sbGV0aW9uLkNvdW50OyArKyBpKXtcclxuXHRcdFx0XHRcdGRvYyA9IGRvY0NvbGxldGlvbi5JdGVtKGkpO1xyXG5cdFx0XHRcdFx0bGV0IGV2ZW50T2JqID0gX2V2ZW50T2JqZWN0KF9uZXdQc2V1ZG9Eb2MoZG9jKSk7XHJcblx0XHRcdFx0XHRpZiAoZXZlbnRPYmopXHJcblx0XHRcdFx0XHRcdGV2ZW50cy5wdXNoKGV2ZW50T2JqKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIGV2ZW50cztcclxuXHRcdFx0fVxyXG5cdFx0XHQqL1x0XHRcclxuXHRcdH1cclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcbiAgICAgKiDku45XaXpEYXRhYmFzZeS4reiOt+WPluaJgOacieW+queOr+mHjeWkjeS6i+S7ti5cclxuXHQgKiDku47liJvlu7rkuovku7bnmoTml6XmnJ/lvIDlp4vliLBFTkRSRUNVUlJFTkNF57uT5p2fXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3RbXX0g6L+U5Zue55So5LqORnVsbENhbGVuZGFy5riy5p+T55qEIGV2ZW50U291cmNlIOaVsOe7hC5cclxuICAgICAqL1xyXG5cdF9nZXRBbGxSZXBlYXRFdmVudChzdGFydCwgZW5kKXtcclxuXHRcdGNvbnN0IHJlcGVhdEV2ZW50cyA9IFtdO1xyXG5cdFx0Y29uc3Qgc3FsID0gXCJET0NVTUVOVF9MT0NBVElPTiBub3QgbGlrZSAnL0RlbGV0ZWQgSXRlbXMvJScgYW5kIChLQl9HVUlEIGlzIG51bGwgb3IgS0JfR1VJRCA9ICcnKSBhbmQgXCIgKyBcclxuXHRcdFx0XHRcdFwiRE9DVU1FTlRfR1VJRCBpbiAoc2VsZWN0IERPQ1VNRU5UX0dVSUQgZnJvbSBXSVpfRE9DVU1FTlRfUEFSQU0gd2hlcmUgUEFSQU1fTkFNRT0nQ0FMRU5EQVJfUkVDVVJSRU5DRScpXCI7XHJcblxyXG5cdFx0Y29uc3QgZGF0YSA9IG9iakRhdGFiYXNlLkRvY3VtZW50c0RhdGFGcm9tU1FMKHNxbCk7XHJcblx0XHRjb25zb2xlLmxvZyhkYXRhKVxyXG5cdFx0aWYgKCAhZGF0YSApIHJldHVybiBmYWxzZTtcclxuXHRcdFxyXG5cdFx0Y29uc3Qgb2JqID0gSlNPTi5wYXJzZShkYXRhKTtcclxuXHRcdGlmICggIW9iaiB8fCAhQXJyYXkuaXNBcnJheShvYmopICkgcmV0dXJuIGZhbHNlO1xyXG5cdFx0XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkgKyspIHtcclxuXHRcdFx0cmVwZWF0RXZlbnRzLnB1c2goXHJcblx0XHRcdFx0bmV3IENhbGVuZGFyRXZlbnQob2JqW2ldLCB0aGlzLiRjYWxlbmRhcikuZ2VuZXJhdGVSZXBlYXRFdmVudHMoc3RhcnQsIGVuZClcclxuXHRcdFx0KVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlcGVhdEV2ZW50cztcclxuXHRcdFxyXG5cdH07XHJcblxyXG5cdC8vIOaXpeWOhuS6i+S7tuaLluWKqOWQjuabtOaWsOaVsOaNrlxyXG5cdHVwZGF0ZUV2ZW50RGF0YU9uRHJvcChldmVudCwgZGVsdGEsIHJldmVydEZ1bmMsIGpzRXZlbnQsIHVpLCB2aWV3KXtcclxuXHRcdC8vIENhbGwgaGFzVGltZSBvbiB0aGUgZXZlbnTigJlzIHN0YXJ0L2VuZCB0byBzZWUgaWYgaXQgaGFzIGJlZW4gZHJvcHBlZCBpbiBhIHRpbWVkIG9yIGFsbC1kYXkgYXJlYS5cclxuXHRcdGNvbnN0IGFsbERheSA9ICFldmVudC5zdGFydC5oYXNUaW1lKCk7XHJcblx0XHQvLyDojrflj5bkuovku7bmlofmoaPml7bpl7TmlbDmja5cclxuXHRcdGNvbnN0IGRvYyA9IG9iakRhdGFiYXNlLkRvY3VtZW50RnJvbUdVSUQoZXZlbnQuaWQpO1xyXG5cdFx0Ly8g5pu05paw5pWw5o2uXHJcblx0XHRpZiAoIGFsbERheSApIHtcclxuXHRcdFx0Y29uc3Qgc3RhcnRTdHIgPSBldmVudC5zdGFydC5zZXQoeydoJzogMCwgJ20nOiAwLCAncyc6IDB9KS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0Y29uc3QgZW5kU3RyID0gZXZlbnQuZW5kLnNldCh7J2gnOiAyMywgJ20nOiA1OSwgJ3MnOiA1OX0pLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9TVEFSVFwiLCBzdGFydFN0cik7XHJcblx0XHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX0VORFwiLCBlbmRTdHIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc3Qgc3RhcnRTdHIgPSBldmVudC5zdGFydC5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0Y29uc3QgZW5kU3RyID0gZXZlbnQuZW5kLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9TVEFSVFwiLCBzdGFydFN0cik7XHJcblx0XHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX0VORFwiLCBlbmRTdHIpO1xyXG5cdFx0fVxyXG5cdFx0Ly9UT0RPOiDmm7TmlrBDQUxFTkRBUl9SRUNVUlJFTkNF5pWw5o2uXHJcblx0XHQvLyBcclxuXHRcdHRoaXMuX3VwZGF0ZURvY01vZGlmeURhdGUoZG9jKTtcclxuXHR9O1xyXG5cclxuXHQvLyDorr7nva7mlofmoaPlsZ7mgKflgLxcclxuXHRfc2V0UGFyYW1WYWx1ZShkb2MsIGtleSwgdmFsdWUpIHtcclxuXHRcdGlmICghZG9jKSByZXR1cm4gZmFsc2U7XHJcblx0XHRkb2MuU2V0UGFyYW1WYWx1ZShrZXksIHZhbHVlKTtcclxuXHR9O1xyXG5cclxuXHQvLyDmm7TmlrBXaXpEb2Pkv67mlLnml7bpl7RcclxuXHRfdXBkYXRlRG9jTW9kaWZ5RGF0ZShkb2Mpe1xyXG5cdFx0Y29uc3Qgbm93ID0gbmV3IERhdGUoKTtcclxuXHRcdGlmICghZG9jKSByZXR1cm4gZmFsc2U7XHJcblx0XHRub3cuc2V0U2Vjb25kcygobm93LmdldFNlY29uZHMoKSArIDEpICUgNjApO1xyXG5cdFx0ZG9jLkRhdGVNb2RpZmllZCA9IHRoaXMuX2Qycyhub3cpO1xyXG5cdH07XHJcblxyXG5cdC8vIOWwhuaXpeacn+Wvueixoei9rOWMluS4uuWtl+espuS4slxyXG5cdC8vVE9ETzog6ICD6JmR5L6d6LWWbW9tZW505p2l566A5YyW6L2s5o2i6L+H56iLXHJcblx0X2QycyhkdCl7XHJcblx0XHRjb25zdCByZXQgPSBkdC5nZXRGdWxsWWVhcigpICsgXCItXCIgKyBcclxuXHRcdFx0XHRcdGZvcm1hdEludFRvRGF0ZVN0cmluZyhkdC5nZXRNb250aCgpICsgMSkgKyBcIi1cIiArIFxyXG5cdFx0XHRcdFx0Zm9ybWF0SW50VG9EYXRlU3RyaW5nKGR0LmdldERhdGUoKSkgKyBcIiBcIiArIFxyXG5cdFx0XHRcdFx0Zm9ybWF0SW50VG9EYXRlU3RyaW5nKGR0LmdldEhvdXJzKCkpKyBcIjpcIiArIFxyXG5cdFx0XHRcdFx0Zm9ybWF0SW50VG9EYXRlU3RyaW5nKGR0LmdldE1pbnV0ZXMoKSkgKyBcIjpcIiArIFxyXG5cdFx0XHRcdFx0Zm9ybWF0SW50VG9EYXRlU3RyaW5nKGR0LmdldFNlY29uZHMoKSk7XHJcblx0XHRyZXR1cm4gcmV0O1xyXG5cdH07XHJcblxyXG5cdC8vIOaXpeWOhuaXtumXtOmHjee9ruaXtumXtOiMg+WbtOWQjuabtOaWsOaVsOaNrlxyXG5cdHVwZGF0ZUV2ZW50RGF0YU9uUmVzaXplKGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXcpe1xyXG5cdFx0Y29uc3QgYWxsRGF5ID0gZXZlbnQuc3RhcnQuaGFzVGltZSgpID8gZmFsc2UgOiB0cnVlO1xyXG5cdFx0Ly8g6I635b6X5LqL5Lu25paH5qGj5pe26Ze05pWw5o2uXHJcblx0XHRjb25zdCBkb2MgPSBvYmpEYXRhYmFzZS5Eb2N1bWVudEZyb21HVUlEKGV2ZW50LmlkKTtcclxuXHRcdC8vIOiuoeeul+abtOaUueWQjueahOe7k+adn+aXtumXtFxyXG5cdFx0Y29uc3QgZXZlbnRFbmRTdHIgPSBldmVudC5lbmQuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHQvLyDmm7TmlrDmlofmoaPmlbDmja5cclxuXHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX0VORFwiLCBldmVudEVuZFN0cik7XHJcblx0XHR0aGlzLl91cGRhdGVEb2NNb2RpZnlEYXRlKGRvYyk7XHJcblx0fTtcclxuXHJcblx0Ly8g5Yib5bu65LqL5Lu2IHN0YXJ0LCBlbmQsIGpzRXZlbnQsIHZpZXdcclxuXHQvKipcclxuICAgICAqIOWIm+W7uuS6i+S7ti5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gc2VsZWN0aW9uRGF0YSBGdWxsQ2FsZW5kYXIg5Lyg5YWl55qE5pWw5o2uLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBzZWxlY3Rpb25EYXRhLnN0YXJ0IE1vbWVudCDnsbvml6XmnJ/lr7nosaEuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IHNlbGVjdGlvbkRhdGEuZW5kIE1vbWVudCDnsbvml6XmnJ/lr7nosaEuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IHNlbGVjdGlvbkRhdGEuanNFdmVudCBuYXRpdmUgSmF2YVNjcmlwdCDkuovku7YuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IHNlbGVjdGlvbkRhdGEudmlldyBGdWxsQ2FsZW5kYXIg6KeG5Zu+5a+56LGhLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSB1c2VySW5wdXRzIOeUqOaIt+S8oOWFpeeahOWFtuS7luS/oeaBry5cclxuICAgICAqIFRPRE86IOivpeaWueazleWPr+S7peaUvue9ruWIsENhbGVuZGFyRXZlbnTnmoTpnZnmgIHmlrnms5XkuIpcclxuICAgICAqL1xyXG5cdGNyZWF0ZUV2ZW50KHNlbGVjdGlvbkRhdGEsIHVzZXJJbnB1dHMpe1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Ly8g6I635Y+W55So5oi36K6+572uXHJcblx0XHRcdGNvbnN0IG5ld0V2ZW50ID0gbmV3IENhbGVuZGFyRXZlbnQoe1xyXG5cdFx0XHRcdHRpdGxlOiB1c2VySW5wdXRzLnRpdGxlID8gdXNlcklucHV0cy50aXRsZSA6ICfml6DmoIfpopgnLFxyXG5cdFx0XHRcdHN0YXJ0OiBzZWxlY3Rpb25EYXRhLnN0YXJ0LFxyXG5cdFx0XHRcdGVuZDogc2VsZWN0aW9uRGF0YS5lbmQsXHJcblx0XHRcdFx0YWxsRGF5OiBzZWxlY3Rpb25EYXRhLnN0YXJ0Lmhhc1RpbWUoKSAmJiBzZWxlY3Rpb25EYXRhLmVuZC5oYXNUaW1lKCkgPyBmYWxzZSA6IHRydWUsXHJcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiB1c2VySW5wdXRzLmNvbG9yID8gdXNlcklucHV0cy5jb2xvciA6ICcjMzJDRDMyJyxcclxuXHRcdFx0fSwgdGhpcy4kY2FsZW5kYXIpO1xyXG5cdFx0XHQvLyDkv53lrZjlubbmuLLmn5Pkuovku7ZcclxuXHRcdFx0bmV3RXZlbnQuc2F2ZVRvV2l6RXZlbnREb2MoKTtcclxuXHRcdFx0bmV3RXZlbnQucmVmZXRjaERhdGEoKTtcclxuXHRcdFx0bmV3RXZlbnQuYWRkVG9GdWxsQ2FsZW5kYXIoKTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtjb25zb2xlLmxvZyhlKX1cclxuXHR9XHJcblxyXG59XHJcblxyXG5cclxuLy8gVE9ETzog6YeN5YaZ6I635Y+W5pWw5o2u55qE5pa55byPXHJcbmZ1bmN0aW9uIF9nZXRXaXpFdmVudChzdGFydCwgZW5kKSB7XHJcblx0Ly9UT0RPOlxyXG5cdGxldCBldmVudHMgPSBbXTtcclxuXHRsZXQgRXZlbnRDb2xsZWN0aW9uID0gb2JqRGF0YWJhc2UuR2V0Q2FsZW5kYXJFdmVudHMyKHN0YXJ0LCBlbmQpO1xyXG5cdHJldHVybiBldmVudHNcclxufVxyXG5cclxuLy8g6I635b6X5riy5p+T5ZCO55qE6YeN5aSN5pel5pyfXHJcbmZ1bmN0aW9uIGdldFJlbmRlclJlcGVhdERheSgpe1xyXG5cdHZhciBkYXlBcnJheSA9IG5ldyBBcnJheSgpO1xyXG5cdHZhciBldmVudFN0YXJ0ID0gbmV3IERhdGUoX3MyZChnX2V2ZW50U3RhcnQpKTtcclxuXHRcdFxyXG5cdHN3aXRjaCAoZ19yZXBlYXRSdWxlKXtcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazFcIjpcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazJcIjpcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazNcIjpcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazRcIjpcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazVcIjpcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazZcIjpcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazdcIjpcclxuXHRcdFx0XHRnZXRXZWVrbHlSZXBlYXREYXkoZGF5QXJyYXksIFtnX3JlcGVhdFJ1bGUuY2hhckF0KDkpXSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2Vla2RheVwiOlxyXG5cdFx0XHRcdGdldFdlZWtseVJlcGVhdERheShkYXlBcnJheSwgWzEsIDIsIDMsIDQsIDVdKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnlXZWVrZGF5MTM1XCI6XHJcblx0XHRcdFx0Z2V0V2Vla2x5UmVwZWF0RGF5KGRheUFycmF5LCBbMSwgMywgNV0pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnlXZWVrZGF5MjRcIjpcclxuXHRcdFx0XHRnZXRXZWVrbHlSZXBlYXREYXkoZGF5QXJyYXksIFsyLCA0XSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJFdmVyeVdlZWtkYXk2N1wiOlxyXG5cdFx0XHRcdGdldFdlZWtseVJlcGVhdERheShkYXlBcnJheSwgWzYsIDddKTtcclxuXHRcdFx0XHRicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkRhaWx5XCI6XHJcblx0XHRcdFx0Z2V0V2Vla2x5UmVwZWF0RGF5KGRheUFycmF5LCBbMSwgMiwgMywgNCwgNSwgNiwgN10pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiV2Vla2x5XCI6Ly8g5q+P5ZGoXHJcblx0XHRcdFx0Z2V0V2Vla2x5UmVwZWF0RGF5KGRheUFycmF5LCBbZXZlbnRTdGFydC5nZXREYXkoKV0pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnkyV2Vla3NcIjpcclxuXHRcdFx0XHRnZXRXZWVrbHlSZXBlYXREYXkoZGF5QXJyYXksIFtldmVudFN0YXJ0LmdldERheSgpXSk7XHJcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkYXlBcnJheS5sZW5ndGg7ICsrIGkpe1xyXG5cdFx0XHRcdFx0dmFyIGludGVyID0gX2ludGVyRGF5cyhfZDJzKGV2ZW50U3RhcnQpLCBfZDJzKGRheUFycmF5W2ldWzBdKSk7XHJcblx0XHRcdFx0XHRpZiAoKHBhcnNlRmxvYXQoKGludGVyLTEpLzcuMCkgJSAyKSAhPSAwICl7XHJcblx0XHRcdFx0XHRcdGRheUFycmF5LnNwbGljZShpLCAxKTtcclxuXHRcdFx0XHRcdFx0aSAtLTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJNb250aGx5XCI6XHJcblx0XHRcdFx0Z2V0TW9udGhseVJlcGVhdERheShkYXlBcnJheSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJZZWFybHlcIjpcclxuXHRcdFx0XHRnZXRZZWFybHlSZXBlYXREYXkoZGF5QXJyYXkpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHQvLyBUT0RPOiDmsYnlrZfpnIDopoHogIPomZFcclxuICAgICAgICAgICAgY2FzZSBcIkNoaW5lc2VNb250aGx5XCI6XHJcbiAgICAgICAgICAgICAgICBnZXRDaGluZXNlUmVwZWF0RGF5KGRheUFycmF5LCAn5pyIJyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJDaGluZXNlWWVhcmx5XCI6XHJcbiAgICAgICAgICAgICAgICBnZXRDaGluZXNlUmVwZWF0RGF5KGRheUFycmF5LCAn5Y6GJyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGRlZmF1bHQ6e1xyXG5cdFx0XHRcdGlmIChnX3JlcGVhdFJ1bGUuaW5kZXhPZihcIkV2ZXJ5V2Vla1wiKSA9PSAwKXtcclxuXHRcdFx0XHRcdHZhciBkYXlzID0gZ19yZXBlYXRSdWxlLnN1YnN0cihcIkV2ZXJ5V2Vla1wiLmxlbmd0aCkuc3BsaXQoJycpO1xyXG5cdFx0XHRcdFx0Z2V0V2Vla2x5UmVwZWF0RGF5KGRheUFycmF5LCBkYXlzKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcblx0cmV0dXJuIGRheUFycmF5O1xyXG59XHJcblxyXG5cclxuLyog5pWw5o2u6I635Y+WXHJcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuXHJcbi8qIOadgumhueWSjOW3peWFt1xyXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcbi8vIOWIpOaWreWGheaguFxyXG5mdW5jdGlvbiBpc0Nocm9tZSgpIHtcclxuXHRpZiAoZ19pc0Nocm9tZSkgcmV0dXJuIGdfaXNDaHJvbWU7XHJcblx0Ly9cclxuXHR2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7XHJcblx0Z19pc0Nocm9tZSA9IHVhLmluZGV4T2YoJ2Nocm9tZScpICE9IC0xO1xyXG5cdC8vXHJcblx0cmV0dXJuIGdfaXNDaHJvbWU7XHJcbn1cclxuXHJcbi8vIOWwhuaVtOaVsOi9rOaNouaIkOaXpeacn+Wtl+espuS4slxyXG5mdW5jdGlvbiBmb3JtYXRJbnRUb0RhdGVTdHJpbmcobil7XHJcblx0XHRcclxuXHRyZXR1cm4gbiA8IDEwID8gJzAnICsgbiA6IG47XHJcbn1cclxuXHJcbi8vIOajgOafpeWPiuWinuWKoOaVsOWAvOWtl+espuS4sumVv+W6pu+8jOS+i+Wmgu+8micyJyAtPiAnMDInXHJcbmZ1bmN0aW9uIGNoZWNrQW5kQWRkU3RyTGVuZ3RoKHN0cikge1xyXG5cdGlmIChzdHIubGVuZ3RoIDwgMikge1xyXG5cdFx0cmV0dXJuICcwJyArIHN0cjtcclxuXHR9IGVsc2Uge1xyXG5cdFx0cmV0dXJuIHN0cjtcclxuXHR9XHJcbn1cclxuXHJcbi8vIOWwhuWtl+espuS4sui9rOWMluS4uuaXpeacn+WvueixoVxyXG5mdW5jdGlvbiBfczJkKHN0cil7XHJcblx0aWYgKCFzdHIpXHJcblx0XHRyZXR1cm4gJyc7XHJcblx0dmFyIGRhdGUgPSBuZXcgRGF0ZShzdHIuc3Vic3RyKDAsIDQpLFxyXG5cdFx0XHRcdFx0c3RyLnN1YnN0cig1LCAyKSAtIDEsXHJcblx0XHRcdFx0XHRzdHIuc3Vic3RyKDgsIDMpLFxyXG5cdFx0XHRcdFx0c3RyLnN1YnN0cigxMSwgMiksXHJcblx0XHRcdFx0XHRzdHIuc3Vic3RyKDE0LCAyKSxcclxuXHRcdFx0XHRcdHN0ci5zdWJzdHIoMTcsIDIpXHJcblx0XHRcdFx0XHQpO1x0XHRcclxuXHRyZXR1cm4gZGF0ZTtcclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBjb2xvckNvdW50OiAxMixcclxuICAgIGNvbG9ySXRlbXM6IFtcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiMzMkNEMzJcIiwgXCJjb2xvck5hbWVcIjogJ+aphOamhOe7vycgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiM1NDg0RURcIiwgXCJjb2xvck5hbWVcIjogJ+Wuneefs+iTnScgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNBNEJERkVcIiwgXCJjb2xvck5hbWVcIjogJ+iTneiJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiM0NkQ2REJcIiwgXCJjb2xvck5hbWVcIjogJ+mdkue7v+iJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiM3QUU3QkZcIiwgXCJjb2xvck5hbWVcIjogJ+e7v+iJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiM1MUI3NDlcIiwgXCJjb2xvck5hbWVcIjogJ+a4heaWsOe7vycgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNGQkQ3NUJcIiwgXCJjb2xvck5hbWVcIjogJ+m7hOiJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNGRkI4NzhcIiwgXCJjb2xvck5hbWVcIjogJ+apmOiJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNGRjg4N0NcIiwgXCJjb2xvck5hbWVcIjogJ+e6ouiJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNEQzIxMjdcIiwgXCJjb2xvck5hbWVcIjogJ+WlouWNjue6oicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNEQkFERkZcIiwgXCJjb2xvck5hbWVcIjogJ+e0q+iJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNFMUUxRTFcIiwgXCJjb2xvck5hbWVcIjogJ+eBsOiJsicgfVxyXG4gICAgXSxcclxuXHJcbn0iLCIvL1RPRE86IOWIpOaWrXdpbmRvdy5leHRlcm5hbOaYr+WQpuS4uldpekh0bWxFZGl0b3JBcHBcclxuY29uc3QgV2l6RXhwbG9yZXJBcHAgPSB3aW5kb3cuZXh0ZXJuYWw7XHJcbmNvbnN0IFdpekV4cGxvcmVyV2luZG93ID0gV2l6RXhwbG9yZXJBcHAuV2luZG93O1xyXG5jb25zdCBXaXpEYXRhYmFzZSA9IFdpekV4cGxvcmVyQXBwLkRhdGFiYXNlO1xyXG5jb25zdCBXaXpDb21tb25VSSA9IFdpekV4cGxvcmVyQXBwLkNyZWF0ZVdpek9iamVjdChcIldpektNQ29udHJvbHMuV2l6Q29tbW9uVUlcIik7XHJcblxyXG5mdW5jdGlvbiBXaXpDb25maXJtKG1zZywgdGl0bGUpIHtcclxuICAgIHJldHVybiBXaXpFeHBsb3JlcldpbmRvdy5TaG93TWVzc2FnZShtc2csIHRpdGxlLCAweDAwMDAwMDIwIHwgMHgwMDAwMDAwMSkgPT0gMTtcclxufVxyXG5cclxuZnVuY3Rpb24gV2l6QWxlcnQobXNnKSB7XHJcbiAgICBXaXpFeHBsb3JlcldpbmRvdy5TaG93TWVzc2FnZShtc2csIFwie3B9XCIsIDB4MDAwMDAwNDApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBXaXpCdWJibGVNZXNzYWdlKHRpdGxlLCBtc2csIGNvbG9yID0gJyNGRkZBOUQnLCBkZWxheSA9ICczJykge1xyXG4gICAgY29uc3QgYXBwUGF0aCA9IFdpekNvbW1vblVJLkdldFNwZWNpYWxGb2xkZXIoXCJBcHBQYXRoXCIpO1xyXG4gICAgLy9cclxuICAgIGNvbnN0IHdpelNoZWxsRmlsZU5hbWUgPSBhcHBQYXRoICsgXCJXaXouZXhlXCI7XHJcbiAgICBjb25zdCBkbGxGaWxlTmFtZSA9IGFwcFBhdGggKyBcIldpelRvb2xzLmRsbFwiO1xyXG4gICAgLy9cclxuICAgIGNvbnN0IHBhcmFtcyA9IGBcIiR7ZGxsRmlsZU5hbWV9XCIgV2l6VG9vbHNTaG93QnViYmxlV2luZG93MkV4IC9UaXRsZT0ke3RpdGxlfSAvTGlua1RleHQ9JHttc2d9IC9MaW5rVVJMPUAgL0NvbG9yPSR7Y29sb3J9IC9EZWxheT0ke2RlbGF5fWA7XHJcbiAgICAvL1xyXG4gICAgV2l6Q29tbW9uVUkuUnVuRXhlKHdpelNoZWxsRmlsZU5hbWUsIHBhcmFtcywgZmFsc2UpO1xyXG59XHJcblxyXG5jbGFzcyBXaXpTaGVsbCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZGxsRmlsZU5hbWUsIGRsbEV4cG9ydEZ1bmMsIHBhcmFtcykge1xyXG4gICAgICAgIC8v5L2/55SoZGxs5a+85Ye65Ye95pWw77yM5aSn6YOo5YiG5YWl5Y+C5pe25ZG95Luk6KGM5pa55byP77yM5YW35L2T5Y+C5pWw5rKh5pyJ6K+05piO77yM5pyJ6ZyA6KaB6IGU57O75byA5Y+R5Lq65ZGYXHJcbiAgICAgICAgY29uc3QgYXBwUGF0aCA9IFdpekNvbW1vblVJLkdldFNwZWNpYWxGb2xkZXIoXCJBcHBQYXRoXCIpO1xyXG4gICAgICAgIHRoaXMuYXBwUGF0aCA9IGFwcFBhdGhcclxuICAgICAgICB0aGlzLndpekV4ZSA9IGFwcFBhdGggKyBcIldpei5leGVcIjtcclxuICAgICAgICB0aGlzLmRsbEZpbGVOYW1lID0gZGxsRmlsZU5hbWUgPyBhcHBQYXRoICsgZGxsRmlsZU5hbWUgOiBhcHBQYXRoICsgJ1dpektNQ29udHJvbHMuZGxsJztcclxuICAgICAgICB0aGlzLmRsbEV4cG9ydEZ1bmMgPSBkbGxFeHBvcnRGdW5jIHx8ICdXaXpLTVJ1blNjcmlwdCc7XHJcbiAgICAgICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7XHJcbiAgICB9XHJcblxyXG4gICAgcnVuU2NyaXB0RmlsZShzY3JpcHRGaWxlTmFtZSwgc2NyaXB0UGFyYW1zKSB7XHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0gYFwiJHt0aGlzLmFwcFBhdGggKyAnV2l6S01Db250cm9scy5kbGwnfVwiIFdpektNUnVuU2NyaXB0IC9TY3JpcHRGaWxlTmFtZT0ke3NjcmlwdEZpbGVOYW1lfSAke3NjcmlwdFBhcmFtc31gO1xyXG4gICAgICAgIFdpekNvbW1vblVJLlJ1bkV4ZSh0aGlzLndpekV4ZSwgcGFyYW1zLCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgd2l6QnViYmxlTWVzc2FnZSh0aXRsZSwgbXNnLCBjb2xvciA9ICcjRkZGQTlEJywgZGVsYXkgPSAnMycpIHtcclxuICAgICAgICBXaXpCdWJibGVNZXNzYWdlKHRpdGxlLCBtc2csIGNvbG9yLCBkZWxheSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldFdpekludGVyZmFjZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBXaXpFeHBsb3JlckFwcCwgV2l6RXhwbG9yZXJXaW5kb3csIFdpekRhdGFiYXNlLCBXaXpDb21tb25VSVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgXHJcbiAgICBXaXpFeHBsb3JlckFwcCwgXHJcbiAgICBXaXpFeHBsb3JlcldpbmRvdywgXHJcbiAgICBXaXpEYXRhYmFzZSwgXHJcbiAgICBXaXpDb21tb25VSSwgXHJcbiAgICBXaXpDb25maXJtLCBcclxuICAgIFdpekFsZXJ0LCBcclxuICAgIFdpekJ1YmJsZU1lc3NhZ2UsIFxyXG4gICAgV2l6U2hlbGwgXHJcbn07XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=