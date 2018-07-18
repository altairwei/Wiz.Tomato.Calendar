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
/******/ 	var hotCurrentHash = "e959a6e6bdfcc8fa0b29"; // eslint-disable-line no-unused-vars
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
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return App; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Calendar_Calendar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Calendar/Calendar */ "./src/components/Calendar/Calendar.js");
/* harmony import */ var _components_EventPopover_EventPopover__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/EventPopover/EventPopover */ "./src/components/EventPopover/EventPopover.js");
/* harmony import */ var _components_Modal_EventModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Modal/EventModal */ "./src/components/Modal/EventModal.js");
/* harmony import */ var _components_Modal_EventCreateModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/Modal/EventCreateModal */ "./src/components/Modal/EventCreateModal.js");






class App extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    constructor(props) {
        super(props);
        //
        this.state = {
            isShowingEvent: false,
            isEditingEvent: false,
            isCreatingEvent: false,
            clickedArgs: null,
            editingEvent: null,
            selectedRange: null
            //
        };this.handleCalendarRender = this.handleCalendarRender.bind(this);
        this.handleEventClick = this.handleEventClick.bind(this);
        this.handlePopoverHide = this.handlePopoverHide.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleEventEdit = this.handleEventEdit.bind(this);
    }

    handleCalendarRender(el) {
        this.calendar = el;
    }

    handleEventClick(event, jsEvent, view) {
        const args = { event, jsEvent, view };
        this.setState({
            isShowingEvent: true,
            clickedArgs: args
        });
    }

    handlePopoverHide() {
        //每次出现都渲染一个新的Popover
        this.setState({
            isShowingEvent: false
        });
    }

    handleSelect(start, end, jsEvent, view) {
        const args = { start, end, jsEvent, view };
        this.setState({
            isCreatingEvent: true,
            selectedRange: args
        });
    }

    handleEventEdit(event) {
        this.setState({
            isEditingEvent: true,
            editingEvent: event
        });
    }

    handleModalClose() {
        const $calendar = $(this.calendar);
        $calendar.fullCalendar('unselect');
        //
        this.setState({
            isEditingEvent: false,
            isCreatingEvent: false
        });
    }

    render() {

        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'div',
            { id: 'wiz-tomato-calendar' },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Calendar_Calendar__WEBPACK_IMPORTED_MODULE_1__["default"], {
                onEventClick: this.handleEventClick,
                onSelect: this.handleSelect,
                onCalendarRender: this.handleCalendarRender
            }),
            !!this.state.selectedRange && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Modal_EventCreateModal__WEBPACK_IMPORTED_MODULE_4__["default"], {
                key: this.state.selectedRange.jsEvent.pageX,
                show: this.state.isCreatingEvent,
                onModalClose: this.handleModalClose,
                isCreatingEvent: this.state.isCreatingEvent,
                selectedRange: this.state.selectedRange
            }),
            !!this.state.isShowingEvent && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_EventPopover_EventPopover__WEBPACK_IMPORTED_MODULE_2__["default"], {
                key: this.state.clickedArgs.event.id,
                event: this.state.clickedArgs.event,
                reference: this.state.clickedArgs.jsEvent.target,
                onEditBtnClick: this.handleEventEdit,
                onPopoverHide: this.handlePopoverHide
            })
        );
    }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _FullCalendar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FullCalendar */ "./src/components/Calendar/FullCalendar.js");
/* harmony import */ var fullcalendar_reactwrapper_dist_css_fullcalendar_min_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! fullcalendar-reactwrapper/dist/css/fullcalendar.min.css */ "./node_modules/fullcalendar-reactwrapper/dist/css/fullcalendar.min.css");
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
        this.handleFullCalendarRender = this.handleFullCalendarRender.bind(this);
        this.onViewRender = this.onViewRender.bind(this);
        this.onEventRender = this.onEventRender.bind(this);
        this.onEventDrop = this.onEventDrop.bind(this);
        this.onEventResize = this.onEventResize.bind(this);
    }

    // 事件句柄
    // ------------------------------------------------------------

    handleFullCalendarRender(el) {
        // FullCalendar 渲染之前执行此句柄，传入DOM
        this.calendar = el;
        this.dataLoader = new _models_WizEventDataLoader__WEBPACK_IMPORTED_MODULE_5__["default"](this.calendar);
        this.props.onCalendarRender(el);
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

    onEventDrop(event, delta, revertFunc, jsEvent, ui, view) {
        if (event.id) {
            this.dataLoader.updateEventDataOnDrop(event, delta, revertFunc, jsEvent, ui, view);
        } else {
            revertFunc();
        }
    }

    onEventResize(event, delta, revertFunc, jsEvent, ui, view) {
        if (event.id) {
            this.dataLoader.updateEventDataOnResize(event, delta, revertFunc, jsEvent, ui, view);
        } else {
            revertFunc();
        }
    }

    onEventRender(eventObj, $el) {
        // 设置文本颜色
        const rgbString = $el.css('background-color');
        const rgbArray = /^rgb\((\d*), (\d*), (\d*)\)$/.exec(rgbString);
        if (rgbArray) {
            const hsl = rgb2hsl(rgbArray[1], rgbArray[2], rgbArray[3]);
            const lightness = hsl[2] - Math.cos((hsl[0] + 70) / 180 * Math.PI) * 0.15;
            const textColor = lightness > 0.5 ? '#222' : 'white';
            $el.css('color', textColor);
        }
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
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_FullCalendar__WEBPACK_IMPORTED_MODULE_2__["default"], { onFullCalendarRender: this.handleFullCalendarRender
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
                , select: this.props.onSelect,
                viewRender: this.onViewRender,
                eventRender: this.onEventRender,
                eventClick: this.props.onEventClick,
                eventDrop: this.onEventDrop,
                eventResize: this.onEventResize
            })
        );
    }
}

function rgb2hsl(r, g, b) {
    r /= 255;g /= 255;b /= 255;

    var M = Math.max(r, g, b);
    var m = Math.min(r, g, b);
    var C = M - m;
    var L = 0.5 * (M + m);
    var S = C === 0 ? 0 : C / (1 - Math.abs(2 * L - 1));

    var h;
    if (C === 0) h = 0; // spec'd as undefined, but usually set to 0
    else if (M === r) h = (g - b) / C % 6;else if (M === g) h = (b - r) / C + 2;else if (M === b) h = (r - g) / C + 4;

    var H = 60 * h;

    // 分别是hue, sat, lum
    return [H, parseFloat(S), parseFloat(L)];
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
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
		this.instance = null;
		this.date = new Date();
	}

	componentDidMount() {
		this.props.onFullCalendarRender(this.el);
		const objectMapperSettings = this.fullcalendarObjectMapper.getSettings(this.props);
		this.instance = this.jq(this.el).fullCalendar(objectMapperSettings);
	}

	componentWillReceiveProps(nextProps) {}

	render() {

		return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { id: "calendar", ref: el => this.el = el });
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _EventPopover_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EventPopover.css */ "./src/components/EventPopover/EventPopover.css");
/* harmony import */ var _EventPopover_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_EventPopover_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var popper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! popper.js */ "./node_modules/popper.js/dist/esm/popper.js");
/* harmony import */ var _PopoverTitleInput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PopoverTitleInput */ "./src/components/EventPopover/PopoverTitleInput.js");
/* harmony import */ var _PopoverToolbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PopoverToolbar */ "./src/components/EventPopover/PopoverToolbar.js");
/* harmony import */ var _models_EventHandles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../models/EventHandles */ "./src/models/EventHandles.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");
/* harmony import */ var _Form_DateTimePickerGroup__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Form/DateTimePickerGroup */ "./src/components/Form/DateTimePickerGroup.js");
/* harmony import */ var _Form_ColorPickerGroup__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Form/ColorPickerGroup */ "./src/components/Form/ColorPickerGroup.js");










class EventPopover extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    constructor(props) {
        super(props);
        this.popperNode = null;
        this.popperInstance = null;
        this.eventHandles = new _models_EventHandles__WEBPACK_IMPORTED_MODULE_5__["default"]();
        //
        this.state = {
            newEventData: {}
            // 绑定事件
        };this.autoHide = this.autoHide.bind(this);
        this.handleDateTimeChange = this.handleDateTimeChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);
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
            $(that.popperNode).hide(0, null, function () {
                that.props.onPopoverHide(); //TODO: 交由父元素卸载该组件实例，感觉这里不妥
                resolve();
            });
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

    handleColorChange(colorValue) {
        const newColor = colorValue;
        this.setState(function (prevState, props) {
            //拷贝前一个对象
            const newEventData = Object.create(prevState.newEventData);
            newEventData.backgroundColor = newColor;
            return { newEventData };
        });
    }

    handleDateTimeChange(e) {
        //暂时不允许更改
    }

    handleBtnClick(e) {
        const id = e.target.id;
        const btnType = id.split('-')[2];
        const handleName = `on${btnType}BtnClick`;
        this.hide().then(ret => {
            switch (handleName) {
                case 'onEditBtnClick':
                    this.props.onEditBtnClick(this.props.event); //交由父元素
                    break;
                default:
                    this.eventHandles[handleName](this.props.event, this.state.newEventData);
                    break;
            }
        });
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

    componentWillUnmount() {
        $(document).off('click', this.autoHide);
        this.popperInstance.destroy();
    }

    render() {
        const eventStart = this.props.event.start.format('YYYY-MM-DD HH:mm:ss');
        const colorValue = this.props.event.backgroundColor;
        const enableSaveBtn = !!this.state.newEventData.title || !!this.state.newEventData.backgroundColor;
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
                    key: this.props.event.id,
                    eventTitle: this.props.event.title,
                    onTitleChange: this.handleTitleChange,
                    targetForm: 'tc-popover-event-editForm' })
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'div',
                { className: 'tc-popover-body' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"],
                    { horizontal: true, id: 'tc-popover-event-editForm' },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Form_DateTimePickerGroup__WEBPACK_IMPORTED_MODULE_7__["default"], { horizontal: true, readOnly: true, id: 'tc-editpopper-eventdate',
                        label: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('i', { className: 'far fa-calendar-alt fa-lg' }),
                        value: eventStart,
                        onDateTimeChange: this.handleDateTimeChange
                    }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Form_ColorPickerGroup__WEBPACK_IMPORTED_MODULE_8__["default"], { horizontal: true,
                        key: this.props.event.id,
                        id: 'tc-editpopper-eventcolor',
                        label: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('i', { className: 'fas fa-paint-brush fa-lg' }),
                        value: colorValue,
                        onColorChange: this.handleColorChange
                    })
                ),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PopoverToolbar__WEBPACK_IMPORTED_MODULE_4__["default"], {
                    complete: this.props.event.complete,
                    enableSaveBtn: enableSaveBtn,
                    onBtnClick: this.handleBtnClick
                })
            )
        );
    }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _PopoverTitleInput_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PopoverTitleInput.css */ "./src/components/EventPopover/PopoverTitleInput.css");
/* harmony import */ var _PopoverTitleInput_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_PopoverTitleInput_css__WEBPACK_IMPORTED_MODULE_1__);



class EventTitleInput extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {

    constructor(props) {
        super(props);
        //初始化状态
        this.state = {
            value: this.props.eventTitle
            //
        };this.handleChange = this.handleChange.bind(this);
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");




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
                    { id: 'tc-editpopper-Save',
                        onClick: this.props.onBtnClick,
                        disabled: !this.props.enableSaveBtn },
                    '\u4FDD\u5B58'
                ),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"],
                    { id: 'tc-editpopper-Complete',
                        onClick: this.props.onBtnClick },
                    parseInt(this.props.complete) == 5 ? '恢复' : '完成'
                ),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"],
                    { id: 'tc-editpopper-Edit',
                        onClick: this.props.onBtnClick },
                    '\u7F16\u8F91'
                ),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["SplitButton"],
                    { pullRight: true,
                        title: '\u5220\u9664',
                        id: 'tc-editpopper-DeleteData',
                        onClick: this.props.onBtnClick },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                        react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["MenuItem"],
                        {
                            eventKey: '1',
                            id: 'tc-editpopper-OpenDoc',
                            onClick: this.props.onBtnClick },
                        '\u6253\u5F00\u6E90\u6587\u6863'
                    ),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                        react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["MenuItem"],
                        {
                            eventKey: '2',
                            id: 'tc-editpopper-DeleteDoc',
                            onClick: this.props.onBtnClick },
                        '\u5220\u9664\u6E90\u6587\u6863'
                    )
                )
            )
        );
    }
}

/***/ }),

/***/ "./src/components/Form/AutoFormGroup.js":
/*!**********************************************!*\
  !*** ./src/components/Form/AutoFormGroup.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AutoFormGroup; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");



class AutoFormGroup extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {

    render() {
        const isHorizontal = this.props.horizontal;
        if (isHorizontal) {
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["FormGroup"],
                { controlId: this.props.controlId },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"],
                    { componentClass: react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["ControlLabel"], sm: 2 },
                    this.props.label
                ),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"],
                    { sm: 10 },
                    this.props.children
                )
            );
        } else {
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["FormGroup"],
                { controlId: this.props.controlId },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["ControlLabel"],
                    null,
                    this.props.label
                ),
                this.props.children
            );
        }
    }
}

/***/ }),

/***/ "./src/components/Form/ColorPickerGroup.js":
/*!*************************************************!*\
  !*** ./src/components/Form/ColorPickerGroup.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ColorPickerGroup; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AutoFormGroup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AutoFormGroup */ "./src/components/Form/AutoFormGroup.js");
/* harmony import */ var huebee_dist_huebee_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! huebee/dist/huebee.css */ "./node_modules/huebee/dist/huebee.css");
/* harmony import */ var huebee_dist_huebee_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(huebee_dist_huebee_css__WEBPACK_IMPORTED_MODULE_2__);


const Huebee = __webpack_require__(/*! huebee/dist/huebee.pkgd */ "./node_modules/huebee/dist/huebee.pkgd.js");


class ColorInput extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(jsEventOrValue) {
        let newColorValue;
        if (typeof jsEventOrValue == 'object') {
            this.setState({ value: jsEventOrValue.target.value });
            newColorValue = jsEventOrValue.target.value;
        } else if (typeof jsEventOrValue == 'string') {
            this.setState({ value: jsEventOrValue });
            newColorValue = jsEventOrValue;
        }
        this.props.onColorChange(newColorValue);
    }

    //TODO: 根据饱和度计算字体颜色

    componentDidMount() {
        // 初始化组件
        this.huebeeInstance = new Huebee(this.el, {
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
        //初始化颜色
        this.huebeeInstance.setColor(this.props.value);
        //监听huebee颜色选择
        this.huebeeInstance.on('change', this.handleChange);
    }

    componentDidUpdate(prevProps) {
        // 手动更新value
        this.huebeeInstance.setColor(this.state.value);
    }

    componentWillUnmount() {
        //注意，huebee没有destroy的方法
    }

    render() {

        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('input', { type: 'text',
            className: 'form-control',
            ref: el => this.el = el,
            onChange: this.handleChange //监听键盘输入
        });
    }
}

class ColorPickerGroup extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(colorValue) {
        //向上传递
        this.props.onColorChange(colorValue);
    }

    render() {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            _AutoFormGroup__WEBPACK_IMPORTED_MODULE_1__["default"],
            this.props,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ColorInput, this.props)
        );
    }
}

/***/ }),

/***/ "./src/components/Form/DateTimePickerGroup.js":
/*!****************************************************!*\
  !*** ./src/components/Form/DateTimePickerGroup.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DateTimePickerGroup; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");
/* harmony import */ var _AutoFormGroup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AutoFormGroup */ "./src/components/Form/AutoFormGroup.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var bootstrap_js_collapse__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! bootstrap/js/collapse */ "./node_modules/bootstrap/js/collapse.js");
/* harmony import */ var bootstrap_js_collapse__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(bootstrap_js_collapse__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var bootstrap_js_transition__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! bootstrap/js/transition */ "./node_modules/bootstrap/js/transition.js");
/* harmony import */ var bootstrap_js_transition__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(bootstrap_js_transition__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var eonasdan_bootstrap_datetimepicker__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! eonasdan-bootstrap-datetimepicker */ "./node_modules/eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js");
/* harmony import */ var eonasdan_bootstrap_datetimepicker__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(eonasdan_bootstrap_datetimepicker__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var eonasdan_bootstrap_datetimepicker_build_css_bootstrap_datetimepicker_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css */ "./node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css");
/* harmony import */ var eonasdan_bootstrap_datetimepicker_build_css_bootstrap_datetimepicker_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(eonasdan_bootstrap_datetimepicker_build_css_bootstrap_datetimepicker_css__WEBPACK_IMPORTED_MODULE_8__);










class DateTimeInput extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const newDateValue = e.date.format('YYYY-MM-DD HH:mm:ss');
        this.setState({ value: newDateValue });
        // 传递
        this.props.onDateTimeChange(newDateValue);
    }

    componentDidMount() {
        // 初始化组件
        if (this.props.readOnly) this.el.readOnly = true;
        this.$el = $(this.el).datetimepicker({
            showTodayButton: true,
            locale: 'zh-cn',
            format: 'YYYY-MM-DD HH:mm:ss'
        });
        //
        this.instance = this.$el.data("DateTimePicker");
        // 初始化值
        this.instance.date(this.props.value);
        // 绑定change事件
        // 放在初始化后进行绑定，避免初始化过程触发change事件
        this.$el.on("dp.change", this.handleChange);
    }

    componentDidUpdate(prevProps) {
        // 手动更新value
        this.instance.date(this.state.value);
    }

    componentWillUnmount() {
        // destroy
        this.instance.destroy();
        this.$el.off("dp.change", this.handleChange);
    }

    render() {

        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('input', { type: 'text',
            className: 'form-control',
            ref: el => this.el = el
        });
    }
}

class DateTimePickerGroup extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            _AutoFormGroup__WEBPACK_IMPORTED_MODULE_3__["default"],
            this.props,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DateTimeInput, this.props)
        );
    }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/components/Form/EventDetailForm.js":
/*!************************************************!*\
  !*** ./src/components/Form/EventDetailForm.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventDetailForm; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");
/* harmony import */ var _TitleInputGroup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TitleInputGroup */ "./src/components/Form/TitleInputGroup.js");
/* harmony import */ var _DateTimePickerGroup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DateTimePickerGroup */ "./src/components/Form/DateTimePickerGroup.js");
/* harmony import */ var _ColorPickerGroup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ColorPickerGroup */ "./src/components/Form/ColorPickerGroup.js");






class EventDetailForm extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {

    constructor(props) {
        super(props);
        //由父组件负责处理数据
    }

    render() {
        const handleTitleChange = this.props.onTitleChange;
        const handleStartChange = this.props.onStartChange;
        const handleEndChange = this.props.onEndChange;
        const handleColorChange = this.props.onColorchange;
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"],
            null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TitleInputGroup__WEBPACK_IMPORTED_MODULE_2__["default"], {
                autoFocus: true,
                controlId: 'tc-createpage-eventtitle',
                value: this.props.eventTitle,
                onTitleChange: handleTitleChange
            }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"],
                null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"],
                    { sm: 6 },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DateTimePickerGroup__WEBPACK_IMPORTED_MODULE_3__["default"], {
                        controlId: 'tc-createpage-eventstart',
                        label: '\u5F00\u59CB\u65E5\u671F',
                        value: this.props.start,
                        onDateTimeChange: handleStartChange })
                ),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"],
                    { sm: 6 },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DateTimePickerGroup__WEBPACK_IMPORTED_MODULE_3__["default"], {
                        controlId: 'tc-createpage-eventend',
                        label: '\u7ED3\u675F\u65E5\u671F',
                        value: this.props.end,
                        onDateTimeChange: handleEndChange })
                )
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"],
                null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"],
                    { sm: 6 },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ColorPickerGroup__WEBPACK_IMPORTED_MODULE_4__["default"], {
                        controlId: 'tc-createpage-eventcolor',
                        label: '\u8272\u5F69',
                        value: this.props.backgroundColor,
                        onColorChange: handleColorChange
                    })
                ),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"],
                    { sm: 6 },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                        react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["FormGroup"],
                        { controlId: 'tc-createpage-eventtags' },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                            react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["ControlLabel"],
                            null,
                            '\u6807\u7B7E'
                        ),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["FormControl"], { readOnly: true })
                    )
                )
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["FormGroup"],
                { controlId: 'tc-createpage-eventremark' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["ControlLabel"],
                    null,
                    '\u5907\u6CE8'
                ),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["FormControl"], { readOnly: true, componentClass: 'textarea' })
            )
        );
    }

}

/***/ }),

/***/ "./src/components/Form/TitleInputGroup.js":
/*!************************************************!*\
  !*** ./src/components/Form/TitleInputGroup.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TitleInputGroup; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");
/* harmony import */ var _AutoFormGroup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AutoFormGroup */ "./src/components/Form/AutoFormGroup.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





class TitleInputGroup extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {

    constructor(props) {
        super(props);
        //
        this.state = {
            value: this.props.value
            //
        };this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const newTitle = e.target.value;
        this.setState({
            value: newTitle
        });
        this.props.onTitleChange(newTitle);
    }

    render() {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            _AutoFormGroup__WEBPACK_IMPORTED_MODULE_2__["default"],
            _extends({ label: '\u6807\u9898' }, this.props),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["FormControl"], _extends({}, this.props, {
                type: 'text',
                value: this.state.value,
                placeholder: '\u8BF7\u8F93\u5165\u6807\u9898',
                onChange: this.handleChange
            }))
        );
    }

}

/***/ }),

/***/ "./src/components/Modal/EventCreateModal.js":
/*!**************************************************!*\
  !*** ./src/components/Modal/EventCreateModal.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventCreateModal; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");
/* harmony import */ var _Form_EventDetailForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Form/EventDetailForm */ "./src/components/Form/EventDetailForm.js");
/* harmony import */ var _EventModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EventModal */ "./src/components/Modal/EventModal.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _models_EventHandles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../models/EventHandles */ "./src/models/EventHandles.js");







class EventCreateModal extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {

    constructor(props) {
        super(props);
        this.eventHandles = new _models_EventHandles__WEBPACK_IMPORTED_MODULE_5__["default"]();
        //
        this.state = {
            title: '',
            start: this.props.selectedRange.start.format('YYYY-MM-DD HH:mm:ss'),
            end: this.props.selectedRange.end.format('YYYY-MM-DD HH:mm:ss'),
            backgroundColor: ''
            //
        };this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleStartChange = this.handleStartChange.bind(this);
        this.handleEndChange = this.handleEndChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleEventCreate = this.handleEventCreate.bind(this);
    }

    handleTitleChange(newTitle) {
        this.setState({
            title: newTitle
        });
    }

    handleStartChange(newDateValue) {
        this.setState({
            start: newDateValue
        });
    }

    handleEndChange(newDateValue) {
        this.setState({
            end: newDateValue
        });
    }

    handleColorChange(newColorValue) {
        this.setState({
            backgroundColor: newColorValue
        });
    }

    handleEventCreate() {
        this.eventHandles.onCreateBtnClick(this.state);
        this.props.onModalClose();
    }

    render() {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            _EventModal__WEBPACK_IMPORTED_MODULE_3__["default"],
            this.props,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                _EventModal__WEBPACK_IMPORTED_MODULE_3__["default"].NavHeader,
                this.props,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NavItem"],
                    { eventKey: '1', href: '#tc-repeatform' },
                    '\u65E5\u7A0B\u7F16\u8F91'
                ),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NavItem"],
                    { eventKey: '2', href: '#tc-repeatform' },
                    '\u91CD\u590D\u89C4\u5219'
                )
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                _EventModal__WEBPACK_IMPORTED_MODULE_3__["default"].TabBody,
                this.props,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Tab"].Pane,
                    { eventKey: '1' },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Form_EventDetailForm__WEBPACK_IMPORTED_MODULE_2__["default"], {
                        eventTitle: this.state.title,
                        start: this.state.start,
                        end: this.state.end,
                        backgroundColor: this.state.backgroundColor
                        //事件句柄
                        , onTitleChange: this.handleTitleChange,
                        onStartChange: this.handleStartChange,
                        onEndChange: this.handleEndChange,
                        onColorchange: this.handleColorChange
                    })
                ),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Tab"].Pane,
                    { eventKey: '2' },
                    'Tab 1 content'
                )
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                _EventModal__WEBPACK_IMPORTED_MODULE_3__["default"].ToolbarFooter,
                null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"],
                    {
                        bsStyle: 'success',
                        onClick: this.handleEventCreate
                    },
                    '\u521B\u5EFA'
                ),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"],
                    { onClick: this.props.onModalClose },
                    '\u53D6\u6D88'
                )
            )
        );
    }
}

/***/ }),

/***/ "./src/components/Modal/EventModal.js":
/*!********************************************!*\
  !*** ./src/components/Modal/EventModal.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");
/* harmony import */ var _Form_EventDetailForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Form/EventDetailForm */ "./src/components/Form/EventDetailForm.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);





class NavHeader extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    //this.props.children 接受 <NavItem />
    render() {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Header,
            {
                style: { borderBottom: 'none', padding: '0' } },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Nav"],
                { bsStyle: 'tabs',
                    style: { padding: '15px 15px 0 15px' } },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["CloseButton"], { onClick: this.props.onModalClose }),
                this.props.children
            )
        );
    }
}

class TabBody extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    //this.props.children 接受 <Tab.Pane />
    render() {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Body,
            null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Tab"].Content,
                { animation: true },
                this.props.children
            )
        );
    }
}

class ToolbarFooter extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    render() {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Footer,
            null,
            this.props.children
        );
    }
}

class EventModal extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    render() {
        let NavHeader, TabBody, ToolbarFooter;
        react__WEBPACK_IMPORTED_MODULE_0___default.a.Children.forEach(this.props.children, thisArg => {
            const name = thisArg.type.name;
            if (name == 'NavHeader') {
                NavHeader = thisArg;
            } else if (name == 'TabBody') {
                TabBody = thisArg;
            } else if (name == 'ToolbarFooter') {
                ToolbarFooter = thisArg;
            }
        });

        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"],
            { show: this.props.show, onHide: this.props.onModalClose },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Tab"].Container,
                { id: 'tabs-with-dropdown', defaultActiveKey: '1' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"],
                    { className: 'clearfix' },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                        react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"],
                        { sm: 12 },
                        NavHeader,
                        TabBody
                    )
                )
            ),
            ToolbarFooter
        );
    }
}

EventModal.NavHeader = NavHeader;
EventModal.TabBody = TabBody;
EventModal.ToolbarFooter = ToolbarFooter;

/* harmony default export */ __webpack_exports__["default"] = (EventModal);

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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var fullcalendar_reactwrapper_dist_css_fullcalendar_min_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fullcalendar-reactwrapper/dist/css/fullcalendar.min.css */ "./node_modules/fullcalendar-reactwrapper/dist/css/fullcalendar.min.css");
/* harmony import */ var fullcalendar_reactwrapper_dist_css_fullcalendar_min_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fullcalendar_reactwrapper_dist_css_fullcalendar_min_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.css */ "./node_modules/bootstrap/dist/css/bootstrap.css");
/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var bootstrap_dist_css_bootstrap_theme_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap-theme.css */ "./node_modules/bootstrap/dist/css/bootstrap-theme.css");
/* harmony import */ var bootstrap_dist_css_bootstrap_theme_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_theme_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _fortawesome_fontawesome_free_css_all_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/fontawesome-free/css/all.css */ "./node_modules/@fortawesome/fontawesome-free/css/all.css");
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
		this.$calendar = calendar ? $(calendar) : $('#calendar');
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
/* harmony import */ var _WizEventDataLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WizEventDataLoader */ "./src/models/WizEventDataLoader.js");
/* harmony import */ var _CalendarEvent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CalendarEvent */ "./src/models/CalendarEvent.js");
/* harmony import */ var _utils_WizInterface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/WizInterface */ "./src/utils/WizInterface.js");





class FormHandles {
    constructor() {
        this.$calendar = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#calendar');
    }

    onCreateBtnClick(data) {
        const fullCalendar = this.$calendar.fullCalendar('getCalendar');
        const moment = fullCalendar.moment.bind(fullCalendar);
        const title = data.title;
        const color = data.backgroundColor;
        const start = moment(data.start);
        const end = moment(data.end);
        // 获取用户设置
        const newEvent = new _CalendarEvent__WEBPACK_IMPORTED_MODULE_2__["default"]({
            title: title || '无标题',
            start: start,
            end: end,
            allDay: start.hasTime() && end.hasTime() ? false : true,
            backgroundColor: color ? color : '#32CD32'
        }, this.$calendar);
        // 保存并渲染事件
        newEvent.saveToWizEventDoc();
        newEvent.refetchData();
        newEvent.addToFullCalendar();
    }

    onSaveBtnClick(event, newEventData) {
        for (const prop in newEventData) {
            event[prop] = newEventData[prop];
        }
        // 重新渲染
        this.$calendar.fullCalendar('updateEvent', event);
        // 修改源数据
        const newEvent = new _CalendarEvent__WEBPACK_IMPORTED_MODULE_2__["default"](event);
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
        const newEvent = new _CalendarEvent__WEBPACK_IMPORTED_MODULE_2__["default"](event);
        newEvent.saveToWizEventDoc();
        // 重新渲染
        this.$calendar.fullCalendar('updateEvent', event);
    }

    onDeleteDataBtnClick(event) {
        if (Object(_utils_WizInterface__WEBPACK_IMPORTED_MODULE_3__["WizConfirm"])("确定要删除该日程？", '番茄助理')) {
            // 删除日程
            let newEvent = new _CalendarEvent__WEBPACK_IMPORTED_MODULE_2__["default"](event);
            newEvent.deleteEventData(false);
        }
    }

    onDeleteDocBtnClick(event) {
        if (Object(_utils_WizInterface__WEBPACK_IMPORTED_MODULE_3__["WizConfirm"])("确定要删除该日程源文档？\n「确定」将会导致相关笔记被删除！", '番茄助理')) {
            let newEvent = new _CalendarEvent__WEBPACK_IMPORTED_MODULE_2__["default"](event);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQ2FsZW5kYXIvQ2FsZW5kYXIuY3NzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0V2ZW50UG9wb3Zlci9FdmVudFBvcG92ZXIuY3NzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0V2ZW50UG9wb3Zlci9Qb3BvdmVyVGl0bGVJbnB1dC5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZSBzeW5jIF5cXC5cXC8uKiQiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9DYWxlbmRhci9DYWxlbmRhci5jc3M/Y2ExNCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9DYWxlbmRhci9DYWxlbmRhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9DYWxlbmRhci9GdWxsQ2FsZW5kYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRXZlbnRQb3BvdmVyL0V2ZW50UG9wb3Zlci5jc3M/NTg1ZiIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9FdmVudFBvcG92ZXIvRXZlbnRQb3BvdmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0V2ZW50UG9wb3Zlci9Qb3BvdmVyVGl0bGVJbnB1dC5jc3M/M2UzNiIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9FdmVudFBvcG92ZXIvUG9wb3ZlclRpdGxlSW5wdXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRXZlbnRQb3BvdmVyL1BvcG92ZXJUb29sYmFyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0Zvcm0vQXV0b0Zvcm1Hcm91cC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Gb3JtL0NvbG9yUGlja2VyR3JvdXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRm9ybS9EYXRlVGltZVBpY2tlckdyb3VwLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0Zvcm0vRXZlbnREZXRhaWxGb3JtLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0Zvcm0vVGl0bGVJbnB1dEdyb3VwLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL01vZGFsL0V2ZW50Q3JlYXRlTW9kYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvTW9kYWwvRXZlbnRNb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguY3NzP2Q4YzMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9tb2RlbHMvQ2FsZW5kYXJFdmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWxzL0V2ZW50SGFuZGxlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWxzL1dpekV2ZW50RGF0YUxvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvQ29uZmlnLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9XaXpJbnRlcmZhY2UuanMiXSwibmFtZXMiOlsiQXBwIiwiUmVhY3QiLCJDb21wb25lbnQiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwic3RhdGUiLCJpc1Nob3dpbmdFdmVudCIsImlzRWRpdGluZ0V2ZW50IiwiaXNDcmVhdGluZ0V2ZW50IiwiY2xpY2tlZEFyZ3MiLCJlZGl0aW5nRXZlbnQiLCJzZWxlY3RlZFJhbmdlIiwiaGFuZGxlQ2FsZW5kYXJSZW5kZXIiLCJiaW5kIiwiaGFuZGxlRXZlbnRDbGljayIsImhhbmRsZVBvcG92ZXJIaWRlIiwiaGFuZGxlU2VsZWN0IiwiaGFuZGxlTW9kYWxDbG9zZSIsImhhbmRsZUV2ZW50RWRpdCIsImVsIiwiY2FsZW5kYXIiLCJldmVudCIsImpzRXZlbnQiLCJ2aWV3IiwiYXJncyIsInNldFN0YXRlIiwic3RhcnQiLCJlbmQiLCIkY2FsZW5kYXIiLCIkIiwiZnVsbENhbGVuZGFyIiwicmVuZGVyIiwicGFnZVgiLCJpZCIsInRhcmdldCIsIkNhbGVuZGFyIiwiZXZlbnRzIiwiZGF0YUxvYWRlciIsImhhbmRsZUZ1bGxDYWxlbmRhclJlbmRlciIsIm9uVmlld1JlbmRlciIsIm9uRXZlbnRSZW5kZXIiLCJvbkV2ZW50RHJvcCIsIm9uRXZlbnRSZXNpemUiLCJvbkNhbGVuZGFyUmVuZGVyIiwiZWxlbWVudCIsImV2ZW50U291cmNlcyIsImdldEV2ZW50U291cmNlcyIsImkiLCJsZW5ndGgiLCJkZWx0YSIsInJldmVydEZ1bmMiLCJ1aSIsInVwZGF0ZUV2ZW50RGF0YU9uRHJvcCIsInVwZGF0ZUV2ZW50RGF0YU9uUmVzaXplIiwiZXZlbnRPYmoiLCIkZWwiLCJyZ2JTdHJpbmciLCJjc3MiLCJyZ2JBcnJheSIsImV4ZWMiLCJoc2wiLCJyZ2IyaHNsIiwibGlnaHRuZXNzIiwiTWF0aCIsImNvcyIsIlBJIiwidGV4dENvbG9yIiwiaXNDb21wbGV0ZSIsInBhcnNlSW50IiwiY29tcGxldGUiLCJhZGRDbGFzcyIsImNvbXBvbmVudERpZE1vdW50IiwibGVmdCIsImNlbnRlciIsInJpZ2h0IiwidG9kYXkiLCJtb250aCIsIndlZWsiLCJkYXkiLCJsaXN0IiwiYWdlbmRhIiwibWluVGltZSIsInNsb3RMYWJlbEZvcm1hdCIsIm9uU2VsZWN0Iiwib25FdmVudENsaWNrIiwiciIsImciLCJiIiwiTSIsIm1heCIsIm0iLCJtaW4iLCJDIiwiTCIsIlMiLCJhYnMiLCJoIiwiSCIsInBhcnNlRmxvYXQiLCJGdWxsY2FsZW5kYXJPYmplY3RNYXBwZXIiLCJnZXRTZXR0aW5ncyIsInByb3BlcnRpZXMiLCJuZXdTZXR0aW5ncyIsImtleSIsImhhc093blByb3BlcnR5IiwiRnVsbENhbGVuZGFyIiwianEiLCJub0NvbmZsaWN0IiwiZnVsbGNhbGVuZGFyT2JqZWN0TWFwcGVyIiwiaW5zdGFuY2UiLCJkYXRlIiwiRGF0ZSIsIm9uRnVsbENhbGVuZGFyUmVuZGVyIiwib2JqZWN0TWFwcGVyU2V0dGluZ3MiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwiRXZlbnRQb3BvdmVyIiwicG9wcGVyTm9kZSIsInBvcHBlckluc3RhbmNlIiwiZXZlbnRIYW5kbGVzIiwibmV3RXZlbnREYXRhIiwiYXV0b0hpZGUiLCJoYW5kbGVEYXRlVGltZUNoYW5nZSIsImhhbmRsZVRpdGxlQ2hhbmdlIiwiaGFuZGxlQ29sb3JDaGFuZ2UiLCJoYW5kbGVCdG5DbGljayIsImUiLCJyZWZlcmVuY2UiLCJpcyIsImhhcyIsImhpZGUiLCJ0aGF0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJvblBvcG92ZXJIaWRlIiwic2hvdyIsImZhZGVJbiIsIm5ld1RpdGxlIiwidmFsdWUiLCJwcmV2U3RhdGUiLCJPYmplY3QiLCJjcmVhdGUiLCJ0aXRsZSIsImNvbG9yVmFsdWUiLCJuZXdDb2xvciIsImJhY2tncm91bmRDb2xvciIsImJ0blR5cGUiLCJzcGxpdCIsImhhbmRsZU5hbWUiLCJ0aGVuIiwicmV0Iiwib25FZGl0QnRuQ2xpY2siLCJwbGFjZW1lbnQiLCJtb2RpZmllcnMiLCJhcnJvdyIsImRvY3VtZW50Iiwib2ZmIiwib24iLCJjb21wb25lbnREaWRVcGRhdGUiLCJwcmV2UHJvcHMiLCJzbmFwc2hvdCIsInNob3VsZENvbXBvbmVudFVwZGF0ZSIsIm5leHRTdGF0ZSIsInVwZGF0ZSIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwiZGVzdHJveSIsImV2ZW50U3RhcnQiLCJmb3JtYXQiLCJlbmFibGVTYXZlQnRuIiwiZGlzcGxheSIsImRpdiIsIkV2ZW50VGl0bGVJbnB1dCIsImV2ZW50VGl0bGUiLCJoYW5kbGVDaGFuZ2UiLCJvblRpdGxlQ2hhbmdlIiwidGFyZ2V0Rm9ybSIsIlBvcG92ZXJUb29sYmFyIiwib25CdG5DbGljayIsIkF1dG9Gb3JtR3JvdXAiLCJpc0hvcml6b250YWwiLCJob3Jpem9udGFsIiwiY29udHJvbElkIiwibGFiZWwiLCJjaGlsZHJlbiIsIkh1ZWJlZSIsInJlcXVpcmUiLCJDb2xvcklucHV0IiwianNFdmVudE9yVmFsdWUiLCJuZXdDb2xvclZhbHVlIiwib25Db2xvckNoYW5nZSIsImh1ZWJlZUluc3RhbmNlIiwic3RhdGljT3BlbiIsInNldFRleHQiLCJzZXRCR0NvbG9yIiwiaHVlcyIsImh1ZTAiLCJzaGFkZXMiLCJzYXR1cmF0aW9ucyIsIm5vdGF0aW9uIiwiY2xhc3NOYW1lIiwiY3VzdG9tQ29sb3JzIiwic2V0Q29sb3IiLCJDb2xvclBpY2tlckdyb3VwIiwiRGF0ZVRpbWVJbnB1dCIsIm5ld0RhdGVWYWx1ZSIsIm9uRGF0ZVRpbWVDaGFuZ2UiLCJyZWFkT25seSIsImRhdGV0aW1lcGlja2VyIiwic2hvd1RvZGF5QnV0dG9uIiwibG9jYWxlIiwiZGF0YSIsIkRhdGVUaW1lUGlja2VyR3JvdXAiLCJFdmVudERldGFpbEZvcm0iLCJoYW5kbGVTdGFydENoYW5nZSIsIm9uU3RhcnRDaGFuZ2UiLCJoYW5kbGVFbmRDaGFuZ2UiLCJvbkVuZENoYW5nZSIsIm9uQ29sb3JjaGFuZ2UiLCJUaXRsZUlucHV0R3JvdXAiLCJFdmVudENyZWF0ZU1vZGFsIiwiaGFuZGxlRXZlbnRDcmVhdGUiLCJvbkNyZWF0ZUJ0bkNsaWNrIiwib25Nb2RhbENsb3NlIiwiTmF2SGVhZGVyIiwiYm9yZGVyQm90dG9tIiwicGFkZGluZyIsIlRhYkJvZHkiLCJUb29sYmFyRm9vdGVyIiwiRXZlbnRNb2RhbCIsIkNoaWxkcmVuIiwiZm9yRWFjaCIsInRoaXNBcmciLCJuYW1lIiwidHlwZSIsIlJlYWN0RE9NIiwiZ2V0RWxlbWVudEJ5SWQiLCJDYWxlbmRhckV2ZW50IiwiRXJyb3IiLCJfY2hlY2tEYXRhVHlwZSIsIl9jcmVhdGUiLCJkb2MiLCJnX2RiIiwiRG9jdW1lbnRGcm9tR1VJRCIsIkdldFBhcmFtVmFsdWUiLCJtb21lbnQiLCJEYXRlQ3JlYXRlZCIsIkdVSUQiLCJUaXRsZSIsIkRhdGVNb2RpZmllZCIsImNvbnNvbGUiLCJlcnJvciIsImJrQ29sb3IiLCJhbGxEYXkiLCJkYXRlQ29tcGxldGVkIiwicnB0UnVsZSIsInJwdEVuZCIsIl9JbmZvIiwiX3BhcnNlSW5mbyIsIkNBTEVOREFSX0lORk8iLCJfRXh0cmFJbmZvIiwiQ0FMRU5EQVJfRVhUUkFJTkZPIiwiX2dldERlZmF1bHRFeHRyYUluZm8iLCJndWlkIiwiQ0FMRU5EQVJfU1RBUlQiLCJDQUxFTkRBUl9FTkQiLCJjaSIsIkNvbmZpZyIsImNvbG9ySXRlbXMiLCJpbmRleE9mIiwiQ29tcGxldGUiLCJEYXRlQ29tcGxldGVkIiwiQ0FMRU5EQVJfUkVDVVJSRU5DRSIsIkNBTEVOREFSX0VORFJFQ1VSUkVOQ0UiLCJoYXNUaW1lIiwiY3JlYXRlZCIsInVwZGF0ZWQiLCJfdXBkYXRlIiwib2JqQ2xhc3MiLCJHVUlEX1JlZ0V4ciIsIlN0cmluZyIsInRlc3QiLCJJbmZvU3RyaW5nIiwiSW5mb09iamVjdCIsIkluZm9BcnJheSIsIml0ZW0iLCJpbmRleCIsImFyciIsInBhaXIiLCJfc3RyaW5naWZ5SW5mbyIsIkluZm9PYmplY3RLZXlzQXJyYXkiLCJrZXlzIiwic2luZ2xlSW5mbyIsInB1c2giLCJqb2luIiwicmVwbGFjZSIsIl91cGRhdGVJbmZvIiwiX3VwZGF0ZUV4dHJhSW5mbyIsIkV4dHJhSW5mb09iamVjdCIsIl9nZXRFdmVudEh0bWwiLCJjb250ZW50IiwiaHRtbFRleHQiLCJnZW5lcmF0ZVJlcGVhdEV2ZW50cyIsImV2ZW50U291cmNlIiwiZGF5QXJyYXkiLCJfZ2V0UmVuZGVyUmVwZWF0RGF5IiwibmV3RXZlbnQiLCJ0b0Z1bGxDYWxlbmRhckV2ZW50IiwiYWRkIiwiZGlmZiIsInJlZ2V4IiwiY291bnQiLCJjdXJXZWVrRGF5IiwicmVzdWx0cyIsImludGVyV2VlayIsIm51bWJlciIsIl9nZXRXZWVrbHlSZXBlYXREYXkiLCJwZXJSdWxlIiwiX2dldFBlclJlcGVhdERheXMiLCJpbnRlcldlZWtzIiwidmlld1N0YXJ0Iiwidmlld0VuZCIsImludGVydmFsV2Vla3MiLCJ3ZWVrZGF5cyIsIm5ld0V2ZW50U3RhcnREYXRlIiwic2V0IiwiZ2V0IiwiaXNTYW1lIiwiaXNCZWZvcmUiLCJwZXJSdWxlTWFwIiwic3BsaWNlIiwiZmluZEluZGV4IiwidG9XaXpFdmVudERhdGEiLCJhZGRUb0Z1bGxDYWxlbmRhciIsIl9zYXZlQWxsUHJvcCIsInN0YXJ0U3RyIiwiZW5kU3RyIiwiX3NldFBhcmFtVmFsdWUiLCJTZXRQYXJhbVZhbHVlIiwiX2NyZWF0ZVdpekV2ZW50RG9jIiwibG9jYXRpb24iLCJvYmpGb2xkZXIiLCJHZXRGb2xkZXJCeUxvY2F0aW9uIiwidGVtcEh0bWwiLCJnX2NtbiIsIkdldEFUZW1wRmlsZU5hbWUiLCJTYXZlVGV4dFRvRmlsZSIsIkNyZWF0ZURvY3VtZW50MiIsIkNoYW5nZVRpdGxlQW5kRmlsZU5hbWUiLCJVcGRhdGVEb2N1bWVudDYiLCJBZGRUb0NhbGVuZGFyIiwic2F2ZVRvV2l6RXZlbnREb2MiLCJwcm9wIiwiZ3VpZFJlZ2V4IiwiaXNXaXpEb2NFeGlzdCIsImRlbGV0ZUV2ZW50RGF0YSIsImlzRGVsZXRlRG9jIiwiUmVtb3ZlRnJvbUNhbGVuZGFyIiwiRGVsZXRlIiwicmVmZXRjaERhdGEiLCJyZWZyZXNoRXZlbnQiLCJGb3JtSGFuZGxlcyIsImNvbG9yIiwib25TYXZlQnRuQ2xpY2siLCJvbkNvbXBsZXRlQnRuQ2xpY2siLCJvbkRlbGV0ZURhdGFCdG5DbGljayIsIldpekNvbmZpcm0iLCJvbkRlbGV0ZURvY0J0bkNsaWNrIiwib25FZGl0T3JpZ2luQnRuQ2xpY2siLCJvYmpEYXRhYmFzZSIsIm9iakNvbW1vbiIsIkVkaXRDYWxlbmRhckV2ZW50Iiwib25PcGVuRG9jQnRuQ2xpY2siLCJvYmpXaW5kb3ciLCJWaWV3RG9jdW1lbnQiLCJXaXpFdmVudERhdGFMb2FkZXIiLCJEYXRhYmFzZSIsInVzZXJOYW1lIiwiVXNlck5hbWUiLCJnZW5lcmFsRXZlbnRTb3VyY2UiLCJfZ2V0QWxsT3JpZ2luYWxFdmVudCIsInJlcGVhdEV2ZW50U291cmNlcyIsIl9nZXRBbGxSZXBlYXRFdmVudCIsImNvbmNhdCIsInNxbCIsImFuZDEiLCJhbmQyIiwiRG9jdW1lbnRzRGF0YUZyb21TUUwiLCJvYmoiLCJKU09OIiwicGFyc2UiLCJBcnJheSIsImlzQXJyYXkiLCJlcnIiLCJyZXBlYXRFdmVudHMiLCJsb2ciLCJfdXBkYXRlRG9jTW9kaWZ5RGF0ZSIsIm5vdyIsInNldFNlY29uZHMiLCJnZXRTZWNvbmRzIiwiX2QycyIsImR0IiwiZ2V0RnVsbFllYXIiLCJmb3JtYXRJbnRUb0RhdGVTdHJpbmciLCJnZXRNb250aCIsImdldERhdGUiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJldmVudEVuZFN0ciIsImNyZWF0ZUV2ZW50Iiwic2VsZWN0aW9uRGF0YSIsInVzZXJJbnB1dHMiLCJfZ2V0V2l6RXZlbnQiLCJFdmVudENvbGxlY3Rpb24iLCJHZXRDYWxlbmRhckV2ZW50czIiLCJnZXRSZW5kZXJSZXBlYXREYXkiLCJfczJkIiwiZ19ldmVudFN0YXJ0IiwiZ19yZXBlYXRSdWxlIiwiZ2V0V2Vla2x5UmVwZWF0RGF5IiwiY2hhckF0IiwiZ2V0RGF5IiwiaW50ZXIiLCJfaW50ZXJEYXlzIiwiZ2V0TW9udGhseVJlcGVhdERheSIsImdldFllYXJseVJlcGVhdERheSIsImdldENoaW5lc2VSZXBlYXREYXkiLCJkYXlzIiwic3Vic3RyIiwiaXNDaHJvbWUiLCJnX2lzQ2hyb21lIiwidWEiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJ0b0xvd2VyQ2FzZSIsIm4iLCJjaGVja0FuZEFkZFN0ckxlbmd0aCIsInN0ciIsImNvbG9yQ291bnQiLCJXaXpFeHBsb3JlckFwcCIsIndpbmRvdyIsImV4dGVybmFsIiwiV2l6RXhwbG9yZXJXaW5kb3ciLCJXaW5kb3ciLCJXaXpEYXRhYmFzZSIsIldpekNvbW1vblVJIiwiQ3JlYXRlV2l6T2JqZWN0IiwibXNnIiwiU2hvd01lc3NhZ2UiLCJXaXpBbGVydCIsIldpekJ1YmJsZU1lc3NhZ2UiLCJkZWxheSIsImFwcFBhdGgiLCJHZXRTcGVjaWFsRm9sZGVyIiwid2l6U2hlbGxGaWxlTmFtZSIsImRsbEZpbGVOYW1lIiwicGFyYW1zIiwiUnVuRXhlIiwiV2l6U2hlbGwiLCJkbGxFeHBvcnRGdW5jIiwid2l6RXhlIiwicnVuU2NyaXB0RmlsZSIsInNjcmlwdEZpbGVOYW1lIiwic2NyaXB0UGFyYW1zIiwid2l6QnViYmxlTWVzc2FnZSIsImdldFdpekludGVyZmFjZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQVEsb0JBQW9CO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQWlCLDRCQUE0QjtBQUM3QztBQUNBO0FBQ0EsMEJBQWtCLDJCQUEyQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLGVBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQSxzREFBOEM7QUFDOUM7QUFDQTtBQUNBLG9DQUE0QjtBQUM1QixxQ0FBNkI7QUFDN0IseUNBQWlDOztBQUVqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQTZCO0FBQzdCLHFDQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsNkJBQXFCLGdCQUFnQjtBQUNyQztBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxhQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBCQUFrQiw4QkFBOEI7QUFDaEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLGVBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQW9CLDJCQUEyQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBbUIsY0FBYztBQUNqQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQWdCLEtBQUs7QUFDckI7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBZ0IsWUFBWTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFjLDRCQUE0QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZSw0QkFBNEI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBZSw0QkFBNEI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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O0FBQ0gxQiwwQkFERyxFQUNhRyxpQkFEYixFQUNnQ0UsV0FEaEMsRUFDNkNDO0FBRDdDLFNBQVA7QUFHSDtBQXpCVSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cbiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7XG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHR9XG4gXHR2YXIgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2sgPSB3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdO1xuIFx0d2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXSA9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gd2VicGFja0hvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdFx0aWYgKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHR9IDtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XG4gXHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuIFx0XHRzY3JpcHQuY2hhcnNldCA9IFwidXRmLThcIjtcbiBcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIjtcbiBcdFx0O1xuIFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdChyZXF1ZXN0VGltZW91dCkge1xuIFx0XHRyZXF1ZXN0VGltZW91dCA9IHJlcXVlc3RUaW1lb3V0IHx8IDEwMDAwO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0aWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xuIFx0XHRcdH1cbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiBcdFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xuIFx0XHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcbiBcdFx0XHRcdHJlcXVlc3QudGltZW91dCA9IHJlcXVlc3RUaW1lb3V0O1xuIFx0XHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuIFx0XHRcdFx0aWYgKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XG4gXHRcdFx0XHRcdC8vIHRpbWVvdXRcbiBcdFx0XHRcdFx0cmVqZWN0KFxuIFx0XHRcdFx0XHRcdG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIHRpbWVkIG91dC5cIilcbiBcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xuIFx0XHRcdFx0XHQvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG4gXHRcdFx0XHRcdHJlc29sdmUoKTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XG4gXHRcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcbiBcdFx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIGZhaWxlZC5cIikpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0Ly8gc3VjY2Vzc1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuIFx0XHRcdFx0XHRcdHJlamVjdChlKTtcbiBcdFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0cmVzb2x2ZSh1cGRhdGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcImU5NTlhNmU2YmRmY2M4ZmEwYjI5XCI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0aWYgKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiBcdFx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuIFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcbiBcdFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuIFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcbiBcdFx0XHRcdFx0XHRyZXF1ZXN0ICtcbiBcdFx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuIFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHQpO1xuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XG4gXHRcdH07XG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH0sXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9O1xuIFx0XHRmb3IgKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwiZVwiICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcInRcIlxuIFx0XHRcdCkge1xuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInJlYWR5XCIpIGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR0aHJvdyBlcnI7XG4gXHRcdFx0fSk7XG5cbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XG4gXHRcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xuIFx0XHRcdFx0XHRpZiAoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdFx0Zm4udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdFx0aWYgKG1vZGUgJiAxKSB2YWx1ZSA9IGZuKHZhbHVlKTtcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy50KHZhbHVlLCBtb2RlICYgfjEpO1xuIFx0XHR9O1xuIFx0XHRyZXR1cm4gZm47XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBob3QgPSB7XG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcblxuIFx0XHRcdC8vIE1vZHVsZSBBUElcbiBcdFx0XHRhY3RpdmU6IHRydWUsXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGRlcCA9PT0gXCJ1bmRlZmluZWRcIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0XHRlbHNlIGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0fSxcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgZGVwID09PSBcInVuZGVmaW5lZFwiKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAraWQgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdH1cbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XG4gXHRcdFx0aWYgKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHRmb3IodmFyIGNodW5rSWQgaW4gaW5zdGFsbGVkQ2h1bmtzKVxuIFx0XHRcdHtcbiBcdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbG9uZS1ibG9ja3NcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCkubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmICghbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCkgY29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdClcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm90IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwiaW5kZXhcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goW1wiLi9zcmMvaW5kZXguanNcIixcInZlbmRvclwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxyXFxuLyog5pel5Y6G5pW05L2T5qC35byPXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuI2NhbGVuZGFyLWNvbnRhaW5lciB7XFxyXFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gICAgdG9wOiAwO1xcclxcbiAgICBsZWZ0OiA4cHg7XFxyXFxuICAgIHJpZ2h0OiA4cHg7XFxyXFxuICAgIGJvdHRvbTogOHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZmMtaGVhZGVyLXRvb2xiYXIge1xcclxcbiAgICAvKlxcclxcbiAgICB0aGUgY2FsZW5kYXIgd2lsbCBiZSBidXR0aW5nIHVwIGFnYWluc3QgdGhlIGVkZ2VzLFxcclxcbiAgICBidXQgbGV0J3Mgc2Nvb3QgaW4gdGhlIGhlYWRlcidzIGJ1dHRvbnNcXHJcXG4gICAgKi9cXHJcXG4gICAgcGFkZGluZy10b3A6IDE0cHg7XFxyXFxuICAgIHBhZGRpbmctbGVmdDogMDtcXHJcXG4gICAgcGFkZGluZy1yaWdodDogMDtcXHJcXG59XFxyXFxuXFxyXFxuLyog5LqL5Lu25riy5p+TXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuLnRjLWNvbXBsZXRlIHtcXHJcXG4gICAgb3BhY2l0eTogMC4zO1xcclxcblxcclxcbn1cXHJcXG5cXHJcXG4udGMtY29tcGxldGUgPiAuZmMtY29udGVudCB7XFxyXFxuICAgIHRleHQtZGVjb3JhdGlvbjogbGluZS10aHJvdWdoICFpbXBvcnRhbnQ7XFxyXFxufVxcclxcblxcclxcbi50Yy1jb21wbGV0ZTpob3ZlciB7XFxyXFxuICAgIG9wYWNpdHk6IDE7XFxyXFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLyogUG9wb3ZlciDnu4Tku7bmoLflvI9cXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG5cXHJcXG4vKiBQb3BvdmVyIOWuueWZqOWPiuWumuS9jVxcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcblxcclxcbi50Yy1wb3BvdmVyIHtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICBiYWNrZ3JvdW5kOiAjRkZGO1xcclxcbiAgICBjb2xvcjogYmxhY2s7XFxyXFxuICAgIHdpZHRoOiBhdXRvO1xcclxcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMik7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcXHJcXG4gICAgYm94LXNoYWRvdzogMCAycHggNHB4IHJnYmEoMCwgMCwgMCwgLjIpO1xcclxcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3ZlciAuYXJyb3cge1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgICB3aWR0aDogMjBweDtcXHJcXG4gICAgaGVpZ2h0OiAxMHB4O1xcclxcbiAgICBtYXJnaW46IDAgNnB4O1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3ZlciAuYXJyb3c6OmJlZm9yZSwgLnRjLXBvcG92ZXIgLmFycm93OjphZnRlciB7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcclxcbiAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xcclxcbiAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xcclxcbn1cXHJcXG5cXHJcXG4vKiB0b3Ag5pS+572u5qC35byPXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJ0b3BcXFwiXSB7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwidG9wXFxcIl0gLmFycm93IHtcXHJcXG4gICAgYm90dG9tOiBjYWxjKCgxMHB4ICsgMXB4KSAqIC0xKTtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJ0b3BcXFwiXSAuYXJyb3c6OmJlZm9yZSxcXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInRvcFxcXCJdIC5hcnJvdzo6YWZ0ZXIge1xcclxcbiAgICBib3JkZXItd2lkdGg6IDEwcHggMTBweCAwO1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInRvcFxcXCJdIC5hcnJvdzo6YmVmb3JlIHtcXHJcXG4gICAgYm90dG9tOiAwO1xcclxcbiAgICBib3JkZXItdG9wLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMjUpO1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInRvcFxcXCJdIC5hcnJvdzo6YWZ0ZXIge1xcclxcbiAgICBib3R0b206IDFweDtcXHJcXG4gICAgYm9yZGVyLXRvcC1jb2xvcjogI2ZmZjtcXHJcXG59XFxyXFxuXFxyXFxuLyogcmlnaHQg5pS+572u5qC35byPXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJyaWdodFxcXCJdIHtcXHJcXG4gICAgbWFyZ2luLWxlZnQ6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwicmlnaHRcXFwiXSAuYXJyb3cge1xcclxcbiAgICBsZWZ0OiBjYWxjKCgxMHB4ICsgMXB4KSAqIC0xKTtcXHJcXG4gICAgd2lkdGg6IDEwcHg7XFxyXFxuICAgIGhlaWdodDogMjBweDtcXHJcXG4gICAgbWFyZ2luOiA2cHggMDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJyaWdodFxcXCJdIC5hcnJvdzo6YmVmb3JlLFxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwicmlnaHRcXFwiXSAuYXJyb3c6OmFmdGVyIHtcXHJcXG4gICAgYm9yZGVyLXdpZHRoOiAxMHB4IDEwcHggMTBweCAwO1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInJpZ2h0XFxcIl0gLmFycm93OjpiZWZvcmUge1xcclxcbiAgICBsZWZ0OiAwO1xcclxcbiAgICBib3JkZXItcmlnaHQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSk7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwicmlnaHRcXFwiXSAuYXJyb3c6OmFmdGVyIHtcXHJcXG4gICAgbGVmdDogMXB4O1xcclxcbiAgICBib3JkZXItcmlnaHQtY29sb3I6ICNmZmY7XFxyXFxufVxcclxcblxcclxcbi8qIGJvdHRvbSDmlL7nva7moLflvI9cXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImJvdHRvbVxcXCJdIHtcXHJcXG4gICAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJib3R0b21cXFwiXSAuYXJyb3cge1xcclxcbiAgICB0b3A6IGNhbGMoKDEwcHggKyAxcHgpICogLTEpO1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImJvdHRvbVxcXCJdIC5hcnJvdzo6YmVmb3JlLFxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwiYm90dG9tXFxcIl0gLmFycm93OjphZnRlciB7XFxyXFxuICAgIGJvcmRlci13aWR0aDogMCAxMHB4IDEwcHggMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJib3R0b21cXFwiXSAuYXJyb3c6OmJlZm9yZSB7XFxyXFxuICAgIHRvcDogMDtcXHJcXG4gICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KTtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJib3R0b21cXFwiXSAuYXJyb3c6OmFmdGVyIHtcXHJcXG4gICAgdG9wOiAxcHg7XFxyXFxuICAgIGJvcmRlci1ib3R0b20tY29sb3I6ICNmN2Y3Zjc7IC8q6L+Z6YeM5Li65LqG5LiT6Zeo6YCC6YWN5pyJ5qCH6aKY6IOM5pmv55qEUG9wb3ZlciovXFxyXFxufVxcclxcblxcclxcbi8qIGxlZnQg5pS+572u5qC35byPXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJsZWZ0XFxcIl0ge1xcclxcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwibGVmdFxcXCJdIC5hcnJvdyB7XFxyXFxuICAgIHJpZ2h0OiBjYWxjKCgxMHB4ICsgMXB4KSAqIC0xKTtcXHJcXG4gICAgd2lkdGg6IDEwcHg7XFxyXFxuICAgIGhlaWdodDogMjBweDtcXHJcXG4gICAgbWFyZ2luOiA2cHggMDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJsZWZ0XFxcIl0gLmFycm93OjpiZWZvcmUsXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJsZWZ0XFxcIl0gLmFycm93OjphZnRlciB7XFxyXFxuICAgIGJvcmRlci13aWR0aDogMTBweCAwIDEwcHggMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJsZWZ0XFxcIl0gLmFycm93OjpiZWZvcmUge1xcclxcbiAgICByaWdodDogMDtcXHJcXG4gICAgYm9yZGVyLWxlZnQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSk7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwibGVmdFxcXCJdIC5hcnJvdzo6YWZ0ZXIge1xcclxcbiAgICByaWdodDogMXB4O1xcclxcbiAgICBib3JkZXItbGVmdC1jb2xvcjogI2ZmZjtcXHJcXG59XFxyXFxuXFxyXFxuLyogQ29udGVudCDmoIfpopjlkozlhoXlrrlcXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG5cXHJcXG4udGMtcG9wb3Zlci1oZWFkZXIge1xcclxcbiAgICBwYWRkaW5nOiAuNXJlbSAuNzVyZW07XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IDA7XFxyXFxuICAgIGZvbnQtc2l6ZTogMXJlbTtcXHJcXG4gICAgY29sb3I6IGluaGVyaXQ7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmN2Y3Zjc7XFxyXFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZWJlYmViO1xcclxcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA2cHg7XFxyXFxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA2cHg7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyLWJvZHkge1xcclxcbiAgICBwYWRkaW5nOiAxMHB4IDE1cHg7XFxyXFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiI3RjLWVkaXRwb3BwZXItZXZlbnR0aXRsZSB7XFxyXFxuICAgIGJvcmRlci13aWR0aDogMXB4O1xcclxcbiAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXHJcXG4gICAgcGFkZGluZzogMDtcXHJcXG4gICAgbWFyZ2luOiAwO1xcclxcbiAgICBmb250LXNpemU6IDEuMmVtO1xcclxcbiAgICBmb250LXdlaWdodDogYm9sZDtcXHJcXG59XFxyXFxuXFxyXFxuI3RjLWVkaXRwb3BwZXItZXZlbnR0aXRsZTpmb2N1cyxcXHJcXG4jdGMtZWRpdHBvcHBlci1ldmVudHRpdGxlOmhvdmVyIHtcXHJcXG4gICAgb3V0bGluZTogbm9uZTtcXHJcXG4gICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogYmxhY2s7IFxcclxcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcImh0bWwsIGJvZHkge1xcclxcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcclxcbiAgICBmb250LXNpemU6IDE0cHg7XFxyXFxufVxcclxcblxcclxcbjpmb2N1cyB7XFxyXFxuICAgIG91dGxpbmU6bm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLyogRm9udHMuY3NzIC0tIOi3qOW5s+WPsOS4reaWh+Wtl+S9k+ino+WGs+aWueahiFxcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG4uZm9udC1oZWkge2ZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBcXFwiTm90byBTYW5zXFxcIiwgXFxcIkhlbHZldGljYSBOZXVlXFxcIiwgSGVsdmV0aWNhLCBcXFwiTmltYnVzIFNhbnMgTFxcXCIsIEFyaWFsLCBcXFwiTGliZXJhdGlvbiBTYW5zXFxcIiwgXFxcIlBpbmdGYW5nIFNDXFxcIiwgXFxcIkhpcmFnaW5vIFNhbnMgR0JcXFwiLCBcXFwiTm90byBTYW5zIENKSyBTQ1xcXCIsIFxcXCJTb3VyY2UgSGFuIFNhbnMgU0NcXFwiLCBcXFwiU291cmNlIEhhbiBTYW5zIENOXFxcIiwgXFxcIk1pY3Jvc29mdCBZYUhlaVxcXCIsIFxcXCJXZW5xdWFueWkgTWljcm8gSGVpXFxcIiwgXFxcIldlblF1YW5ZaSBaZW4gSGVpXFxcIiwgXFxcIlNUIEhlaXRpXFxcIiwgU2ltSGVpLCBcXFwiV2VuUXVhbllpIFplbiBIZWkgU2hhcnBcXFwiLCBzYW5zLXNlcmlmO31cXHJcXG4uZm9udC1rYWkge2ZvbnQtZmFtaWx5OiBCYXNrZXJ2aWxsZSwgR2VvcmdpYSwgXFxcIkxpYmVyYXRpb24gU2VyaWZcXFwiLCBcXFwiS2FpdGkgU0NcXFwiLCBTVEthaXRpLCBcXFwiQVIgUEwgVUthaSBDTlxcXCIsIFxcXCJBUiBQTCBVS2FpIEhLXFxcIiwgXFxcIkFSIFBMIFVLYWkgVFdcXFwiLCBcXFwiQVIgUEwgVUthaSBUVyBNQkVcXFwiLCBcXFwiQVIgUEwgS2FpdGlNIEdCXFxcIiwgS2FpVGksIEthaVRpX0dCMjMxMiwgREZLYWktU0IsIFxcXCJUVy1LYWlcXFwiLCBzZXJpZjt9XFxyXFxuLmZvbnQtc29uZyB7Zm9udC1mYW1pbHk6IEdlb3JnaWEsIFxcXCJOaW1idXMgUm9tYW4gTm85IExcXFwiLCBcXFwiU29uZ3RpIFNDXFxcIiwgXFxcIk5vdG8gU2VyaWYgQ0pLIFNDXFxcIiwgXFxcIlNvdXJjZSBIYW4gU2VyaWYgU0NcXFwiLCBcXFwiU291cmNlIEhhbiBTZXJpZiBDTlxcXCIsIFNUU29uZywgXFxcIkFSIFBMIE5ldyBTdW5nXFxcIiwgXFxcIkFSIFBMIFN1bmd0aUwgR0JcXFwiLCBOU2ltU3VuLCBTaW1TdW4sIFxcXCJUVy1TdW5nXFxcIiwgXFxcIldlblF1YW5ZaSBCaXRtYXAgU29uZ1xcXCIsIFxcXCJBUiBQTCBVTWluZyBDTlxcXCIsIFxcXCJBUiBQTCBVTWluZyBIS1xcXCIsIFxcXCJBUiBQTCBVTWluZyBUV1xcXCIsIFxcXCJBUiBQTCBVTWluZyBUVyBNQkVcXFwiLCBQTWluZ0xpVSwgTWluZ0xpVSwgc2VyaWY7fVxcclxcbi5mb250LWZhbmctc29uZyB7Zm9udC1mYW1pbHk6IEJhc2tlcnZpbGxlLCBcXFwiVGltZXMgTmV3IFJvbWFuXFxcIiwgXFxcIkxpYmVyYXRpb24gU2VyaWZcXFwiLCBTVEZhbmdzb25nLCBGYW5nU29uZywgRmFuZ1NvbmdfR0IyMzEyLCBcXFwiQ1dURVgtRlxcXCIsIHNlcmlmO31cXHJcXG5cXHJcXG4vKiDkuLTml7bmlL7nva5cXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG5cXHJcXG4udWktYnV0dG9uLWljb24tb25seS5zcGxpdGJ1dHRvbi1zZWxlY3Qge1xcclxcbiAgICB3aWR0aDogMWVtO1xcclxcbn1cXHJcXG5cXHJcXG5hW2RhdGEtZ290b10ge1xcclxcbiAgICBjb2xvcjogIzAwMDtcXHJcXG59XFxyXFxuXFxyXFxuLyogQm9vdHN0cmFwIDQg57uE5Lu25qC35byPXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuXFxyXFxuLyog6KGo5Y2VXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuLmNvbC1mb3JtLWxhYmVsIHtcXHJcXG4gICAgcGFkZGluZy10b3A6IGNhbGMoLjM3NXJlbSArIDFweCk7XFxyXFxuICAgIHBhZGRpbmctYm90dG9tOiBjYWxjKC4zNzVyZW0gKyAxcHgpO1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xcclxcbiAgICBmb250LXNpemU6IGluaGVyaXQ7XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiAxLjU7XFxyXFxufVxcclxcblxcclxcbi5pbnB1dC1ncm91cC1hZGRvbiB7XFxyXFxuICBib3JkZXItbGVmdC13aWR0aDogMDtcXHJcXG4gIGJvcmRlci1yaWdodC13aWR0aDogMDtcXHJcXG59XFxyXFxuLmlucHV0LWdyb3VwLWFkZG9uOmZpcnN0LWNoaWxkIHtcXHJcXG4gIGJvcmRlci1sZWZ0LXdpZHRoOiAxcHg7XFxyXFxufVxcclxcbi5pbnB1dC1ncm91cC1hZGRvbjpsYXN0LWNoaWxkIHtcXHJcXG4gIGJvcmRlci1yaWdodC13aWR0aDogMXB4O1xcclxcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJ2YXIgbWFwID0ge1xuXHRcIi4vYWZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FmLmpzXCIsXG5cdFwiLi9hZi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYWYuanNcIixcblx0XCIuL2FyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci5qc1wiLFxuXHRcIi4vYXItZHpcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWR6LmpzXCIsXG5cdFwiLi9hci1kei5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItZHouanNcIixcblx0XCIuL2FyLWt3XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1rdy5qc1wiLFxuXHRcIi4vYXIta3cuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWt3LmpzXCIsXG5cdFwiLi9hci1seVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItbHkuanNcIixcblx0XCIuL2FyLWx5LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1seS5qc1wiLFxuXHRcIi4vYXItbWFcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLW1hLmpzXCIsXG5cdFwiLi9hci1tYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItbWEuanNcIixcblx0XCIuL2FyLXNhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1zYS5qc1wiLFxuXHRcIi4vYXItc2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLXNhLmpzXCIsXG5cdFwiLi9hci10blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItdG4uanNcIixcblx0XCIuL2FyLXRuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci10bi5qc1wiLFxuXHRcIi4vYXIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLmpzXCIsXG5cdFwiLi9helwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXouanNcIixcblx0XCIuL2F6LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hei5qc1wiLFxuXHRcIi4vYmVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JlLmpzXCIsXG5cdFwiLi9iZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYmUuanNcIixcblx0XCIuL2JnXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iZy5qc1wiLFxuXHRcIi4vYmcuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JnLmpzXCIsXG5cdFwiLi9ibVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm0uanNcIixcblx0XCIuL2JtLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ibS5qc1wiLFxuXHRcIi4vYm5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JuLmpzXCIsXG5cdFwiLi9ibi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm4uanNcIixcblx0XCIuL2JvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iby5qc1wiLFxuXHRcIi4vYm8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JvLmpzXCIsXG5cdFwiLi9iclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYnIuanNcIixcblx0XCIuL2JyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ici5qc1wiLFxuXHRcIi4vYnNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JzLmpzXCIsXG5cdFwiLi9icy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYnMuanNcIixcblx0XCIuL2NhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jYS5qc1wiLFxuXHRcIi4vY2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2NhLmpzXCIsXG5cdFwiLi9jc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3MuanNcIixcblx0XCIuL2NzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jcy5qc1wiLFxuXHRcIi4vY3ZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2N2LmpzXCIsXG5cdFwiLi9jdi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3YuanNcIixcblx0XCIuL2N5XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jeS5qc1wiLFxuXHRcIi4vY3kuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2N5LmpzXCIsXG5cdFwiLi9kYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGEuanNcIixcblx0XCIuL2RhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kYS5qc1wiLFxuXHRcIi4vZGVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLmpzXCIsXG5cdFwiLi9kZS1hdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUtYXQuanNcIixcblx0XCIuL2RlLWF0LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS1hdC5qc1wiLFxuXHRcIi4vZGUtY2hcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLWNoLmpzXCIsXG5cdFwiLi9kZS1jaC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUtY2guanNcIixcblx0XCIuL2RlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS5qc1wiLFxuXHRcIi4vZHZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2R2LmpzXCIsXG5cdFwiLi9kdi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZHYuanNcIixcblx0XCIuL2VsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbC5qc1wiLFxuXHRcIi4vZWwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VsLmpzXCIsXG5cdFwiLi9lbi1hdVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tYXUuanNcIixcblx0XCIuL2VuLWF1LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1hdS5qc1wiLFxuXHRcIi4vZW4tY2FcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWNhLmpzXCIsXG5cdFwiLi9lbi1jYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tY2EuanNcIixcblx0XCIuL2VuLWdiXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1nYi5qc1wiLFxuXHRcIi4vZW4tZ2IuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWdiLmpzXCIsXG5cdFwiLi9lbi1pZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4taWUuanNcIixcblx0XCIuL2VuLWllLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1pZS5qc1wiLFxuXHRcIi4vZW4taWxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWlsLmpzXCIsXG5cdFwiLi9lbi1pbC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4taWwuanNcIixcblx0XCIuL2VuLW56XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1uei5qc1wiLFxuXHRcIi4vZW4tbnouanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLW56LmpzXCIsXG5cdFwiLi9lb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW8uanNcIixcblx0XCIuL2VvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lby5qc1wiLFxuXHRcIi4vZXNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLmpzXCIsXG5cdFwiLi9lcy1kb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMtZG8uanNcIixcblx0XCIuL2VzLWRvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy1kby5qc1wiLFxuXHRcIi4vZXMtdXNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLXVzLmpzXCIsXG5cdFwiLi9lcy11cy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMtdXMuanNcIixcblx0XCIuL2VzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy5qc1wiLFxuXHRcIi4vZXRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2V0LmpzXCIsXG5cdFwiLi9ldC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXQuanNcIixcblx0XCIuL2V1XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ldS5qc1wiLFxuXHRcIi4vZXUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2V1LmpzXCIsXG5cdFwiLi9mYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZmEuanNcIixcblx0XCIuL2ZhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mYS5qc1wiLFxuXHRcIi4vZmlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZpLmpzXCIsXG5cdFwiLi9maS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZmkuanNcIixcblx0XCIuL2ZvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mby5qc1wiLFxuXHRcIi4vZm8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZvLmpzXCIsXG5cdFwiLi9mclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnIuanNcIixcblx0XCIuL2ZyLWNhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci1jYS5qc1wiLFxuXHRcIi4vZnItY2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLWNhLmpzXCIsXG5cdFwiLi9mci1jaFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnItY2guanNcIixcblx0XCIuL2ZyLWNoLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci1jaC5qc1wiLFxuXHRcIi4vZnIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLmpzXCIsXG5cdFwiLi9meVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnkuanNcIixcblx0XCIuL2Z5LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9meS5qc1wiLFxuXHRcIi4vZ2RcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dkLmpzXCIsXG5cdFwiLi9nZC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ2QuanNcIixcblx0XCIuL2dsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nbC5qc1wiLFxuXHRcIi4vZ2wuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dsLmpzXCIsXG5cdFwiLi9nb20tbGF0blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ29tLWxhdG4uanNcIixcblx0XCIuL2dvbS1sYXRuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nb20tbGF0bi5qc1wiLFxuXHRcIi4vZ3VcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2d1LmpzXCIsXG5cdFwiLi9ndS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ3UuanNcIixcblx0XCIuL2hlXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oZS5qc1wiLFxuXHRcIi4vaGUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hlLmpzXCIsXG5cdFwiLi9oaVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaGkuanNcIixcblx0XCIuL2hpLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oaS5qc1wiLFxuXHRcIi4vaHJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hyLmpzXCIsXG5cdFwiLi9oci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHIuanNcIixcblx0XCIuL2h1XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9odS5qc1wiLFxuXHRcIi4vaHUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2h1LmpzXCIsXG5cdFwiLi9oeS1hbVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHktYW0uanNcIixcblx0XCIuL2h5LWFtLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oeS1hbS5qc1wiLFxuXHRcIi4vaWRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2lkLmpzXCIsXG5cdFwiLi9pZC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaWQuanNcIixcblx0XCIuL2lzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pcy5qc1wiLFxuXHRcIi4vaXMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2lzLmpzXCIsXG5cdFwiLi9pdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaXQuanNcIixcblx0XCIuL2l0LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pdC5qc1wiLFxuXHRcIi4vamFcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2phLmpzXCIsXG5cdFwiLi9qYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvamEuanNcIixcblx0XCIuL2p2XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9qdi5qc1wiLFxuXHRcIi4vanYuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2p2LmpzXCIsXG5cdFwiLi9rYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva2EuanNcIixcblx0XCIuL2thLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rYS5qc1wiLFxuXHRcIi4va2tcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2trLmpzXCIsXG5cdFwiLi9ray5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva2suanNcIixcblx0XCIuL2ttXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rbS5qc1wiLFxuXHRcIi4va20uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ttLmpzXCIsXG5cdFwiLi9rblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva24uanNcIixcblx0XCIuL2tuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rbi5qc1wiLFxuXHRcIi4va29cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2tvLmpzXCIsXG5cdFwiLi9rby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva28uanNcIixcblx0XCIuL2t5XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9reS5qc1wiLFxuXHRcIi4va3kuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2t5LmpzXCIsXG5cdFwiLi9sYlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbGIuanNcIixcblx0XCIuL2xiLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sYi5qc1wiLFxuXHRcIi4vbG9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2xvLmpzXCIsXG5cdFwiLi9sby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbG8uanNcIixcblx0XCIuL2x0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sdC5qc1wiLFxuXHRcIi4vbHQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2x0LmpzXCIsXG5cdFwiLi9sdlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbHYuanNcIixcblx0XCIuL2x2LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sdi5qc1wiLFxuXHRcIi4vbWVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21lLmpzXCIsXG5cdFwiLi9tZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWUuanNcIixcblx0XCIuL21pXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9taS5qc1wiLFxuXHRcIi4vbWkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21pLmpzXCIsXG5cdFwiLi9ta1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWsuanNcIixcblx0XCIuL21rLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tay5qc1wiLFxuXHRcIi4vbWxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21sLmpzXCIsXG5cdFwiLi9tbC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWwuanNcIixcblx0XCIuL21uXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tbi5qc1wiLFxuXHRcIi4vbW4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21uLmpzXCIsXG5cdFwiLi9tclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXIuanNcIixcblx0XCIuL21yLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tci5qc1wiLFxuXHRcIi4vbXNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21zLmpzXCIsXG5cdFwiLi9tcy1teVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXMtbXkuanNcIixcblx0XCIuL21zLW15LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tcy1teS5qc1wiLFxuXHRcIi4vbXMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21zLmpzXCIsXG5cdFwiLi9tdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXQuanNcIixcblx0XCIuL210LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tdC5qc1wiLFxuXHRcIi4vbXlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL215LmpzXCIsXG5cdFwiLi9teS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXkuanNcIixcblx0XCIuL25iXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9uYi5qc1wiLFxuXHRcIi4vbmIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25iLmpzXCIsXG5cdFwiLi9uZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmUuanNcIixcblx0XCIuL25lLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9uZS5qc1wiLFxuXHRcIi4vbmxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25sLmpzXCIsXG5cdFwiLi9ubC1iZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmwtYmUuanNcIixcblx0XCIuL25sLWJlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubC1iZS5qc1wiLFxuXHRcIi4vbmwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25sLmpzXCIsXG5cdFwiLi9ublwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbm4uanNcIixcblx0XCIuL25uLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubi5qc1wiLFxuXHRcIi4vcGEtaW5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3BhLWluLmpzXCIsXG5cdFwiLi9wYS1pbi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcGEtaW4uanNcIixcblx0XCIuL3BsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wbC5qc1wiLFxuXHRcIi4vcGwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3BsLmpzXCIsXG5cdFwiLi9wdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcHQuanNcIixcblx0XCIuL3B0LWJyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wdC1ici5qc1wiLFxuXHRcIi4vcHQtYnIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3B0LWJyLmpzXCIsXG5cdFwiLi9wdC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcHQuanNcIixcblx0XCIuL3JvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9yby5qc1wiLFxuXHRcIi4vcm8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3JvLmpzXCIsXG5cdFwiLi9ydVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcnUuanNcIixcblx0XCIuL3J1LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ydS5qc1wiLFxuXHRcIi4vc2RcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NkLmpzXCIsXG5cdFwiLi9zZC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2QuanNcIixcblx0XCIuL3NlXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zZS5qc1wiLFxuXHRcIi4vc2UuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NlLmpzXCIsXG5cdFwiLi9zaVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2kuanNcIixcblx0XCIuL3NpLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zaS5qc1wiLFxuXHRcIi4vc2tcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NrLmpzXCIsXG5cdFwiLi9zay5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2suanNcIixcblx0XCIuL3NsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zbC5qc1wiLFxuXHRcIi4vc2wuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NsLmpzXCIsXG5cdFwiLi9zcVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3EuanNcIixcblx0XCIuL3NxLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zcS5qc1wiLFxuXHRcIi4vc3JcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NyLmpzXCIsXG5cdFwiLi9zci1jeXJsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zci1jeXJsLmpzXCIsXG5cdFwiLi9zci1jeXJsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zci1jeXJsLmpzXCIsXG5cdFwiLi9zci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3IuanNcIixcblx0XCIuL3NzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zcy5qc1wiLFxuXHRcIi4vc3MuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NzLmpzXCIsXG5cdFwiLi9zdlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3YuanNcIixcblx0XCIuL3N2LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zdi5qc1wiLFxuXHRcIi4vc3dcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3N3LmpzXCIsXG5cdFwiLi9zdy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3cuanNcIixcblx0XCIuL3RhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90YS5qc1wiLFxuXHRcIi4vdGEuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RhLmpzXCIsXG5cdFwiLi90ZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGUuanNcIixcblx0XCIuL3RlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ZS5qc1wiLFxuXHRcIi4vdGV0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ZXQuanNcIixcblx0XCIuL3RldC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGV0LmpzXCIsXG5cdFwiLi90Z1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGcuanNcIixcblx0XCIuL3RnLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90Zy5qc1wiLFxuXHRcIi4vdGhcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RoLmpzXCIsXG5cdFwiLi90aC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGguanNcIixcblx0XCIuL3RsLXBoXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90bC1waC5qc1wiLFxuXHRcIi4vdGwtcGguanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RsLXBoLmpzXCIsXG5cdFwiLi90bGhcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RsaC5qc1wiLFxuXHRcIi4vdGxoLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90bGguanNcIixcblx0XCIuL3RyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ci5qc1wiLFxuXHRcIi4vdHIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RyLmpzXCIsXG5cdFwiLi90emxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3R6bC5qc1wiLFxuXHRcIi4vdHpsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90emwuanNcIixcblx0XCIuL3R6bVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHptLmpzXCIsXG5cdFwiLi90em0tbGF0blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHptLWxhdG4uanNcIixcblx0XCIuL3R6bS1sYXRuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90em0tbGF0bi5qc1wiLFxuXHRcIi4vdHptLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90em0uanNcIixcblx0XCIuL3VnLWNuXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91Zy1jbi5qc1wiLFxuXHRcIi4vdWctY24uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VnLWNuLmpzXCIsXG5cdFwiLi91a1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdWsuanNcIixcblx0XCIuL3VrLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ay5qc1wiLFxuXHRcIi4vdXJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VyLmpzXCIsXG5cdFwiLi91ci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXIuanNcIixcblx0XCIuL3V6XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ei5qc1wiLFxuXHRcIi4vdXotbGF0blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXotbGF0bi5qc1wiLFxuXHRcIi4vdXotbGF0bi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXotbGF0bi5qc1wiLFxuXHRcIi4vdXouanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3V6LmpzXCIsXG5cdFwiLi92aVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdmkuanNcIixcblx0XCIuL3ZpLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS92aS5qc1wiLFxuXHRcIi4veC1wc2V1ZG9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3gtcHNldWRvLmpzXCIsXG5cdFwiLi94LXBzZXVkby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUveC1wc2V1ZG8uanNcIixcblx0XCIuL3lvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS95by5qc1wiLFxuXHRcIi4veW8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3lvLmpzXCIsXG5cdFwiLi96aC1jblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtY24uanNcIixcblx0XCIuL3poLWNuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC1jbi5qc1wiLFxuXHRcIi4vemgtaGtcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLWhrLmpzXCIsXG5cdFwiLi96aC1oay5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtaGsuanNcIixcblx0XCIuL3poLXR3XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC10dy5qc1wiLFxuXHRcIi4vemgtdHcuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLXR3LmpzXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHZhciBpZCA9IG1hcFtyZXFdO1xuXHRpZighKGlkICsgMSkpIHsgLy8gY2hlY2sgZm9yIG51bWJlciBvciBzdHJpbmdcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIGlkO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZSBzeW5jIHJlY3Vyc2l2ZSBeXFxcXC5cXFxcLy4qJFwiOyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBDYWxlbmRhciBmcm9tICcuL2NvbXBvbmVudHMvQ2FsZW5kYXIvQ2FsZW5kYXInO1xyXG5pbXBvcnQgRXZlbnRQb3BvdmVyIGZyb20gJy4vY29tcG9uZW50cy9FdmVudFBvcG92ZXIvRXZlbnRQb3BvdmVyJztcclxuaW1wb3J0IEV2ZW50TW9kYWwgZnJvbSAnLi9jb21wb25lbnRzL01vZGFsL0V2ZW50TW9kYWwnO1xyXG5pbXBvcnQgRXZlbnRDcmVhdE1vZGFsIGZyb20gJy4vY29tcG9uZW50cy9Nb2RhbC9FdmVudENyZWF0ZU1vZGFsJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgaXNTaG93aW5nRXZlbnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBpc0VkaXRpbmdFdmVudDogZmFsc2UsXHJcbiAgICAgICAgICAgIGlzQ3JlYXRpbmdFdmVudDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNsaWNrZWRBcmdzOiBudWxsLFxyXG4gICAgICAgICAgICBlZGl0aW5nRXZlbnQ6IG51bGwsXHJcbiAgICAgICAgICAgIHNlbGVjdGVkUmFuZ2U6IG51bGxcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLmhhbmRsZUNhbGVuZGFyUmVuZGVyID0gdGhpcy5oYW5kbGVDYWxlbmRhclJlbmRlci5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlRXZlbnRDbGljayA9IHRoaXMuaGFuZGxlRXZlbnRDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlUG9wb3ZlckhpZGUgPSB0aGlzLmhhbmRsZVBvcG92ZXJIaWRlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVTZWxlY3QgPSB0aGlzLmhhbmRsZVNlbGVjdC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlTW9kYWxDbG9zZSA9IHRoaXMuaGFuZGxlTW9kYWxDbG9zZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlRXZlbnRFZGl0ID0gdGhpcy5oYW5kbGVFdmVudEVkaXQuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDYWxlbmRhclJlbmRlcihlbCkge1xyXG4gICAgICAgIHRoaXMuY2FsZW5kYXIgPSBlbDtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVFdmVudENsaWNrKCBldmVudCwganNFdmVudCwgdmlldyApIHtcclxuICAgICAgICBjb25zdCBhcmdzID0geyBldmVudCwganNFdmVudCwgdmlldyB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGlzU2hvd2luZ0V2ZW50OiB0cnVlLFxyXG4gICAgICAgICAgICBjbGlja2VkQXJnczogYXJnc1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlUG9wb3ZlckhpZGUoKSB7XHJcbiAgICAgICAgLy/mr4/mrKHlh7rnjrDpg73muLLmn5PkuIDkuKrmlrDnmoRQb3BvdmVyXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGlzU2hvd2luZ0V2ZW50OiBmYWxzZVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlU2VsZWN0KCBzdGFydCwgZW5kLCBqc0V2ZW50LCB2aWV3ICkge1xyXG4gICAgICAgIGNvbnN0IGFyZ3MgPSB7c3RhcnQsIGVuZCwganNFdmVudCwgdmlld307XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGlzQ3JlYXRpbmdFdmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgc2VsZWN0ZWRSYW5nZTogYXJnc1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlRXZlbnRFZGl0KGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGlzRWRpdGluZ0V2ZW50OiB0cnVlLFxyXG4gICAgICAgICAgICBlZGl0aW5nRXZlbnQ6IGV2ZW50XHJcbiAgICAgICAgfSkgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZU1vZGFsQ2xvc2UoKSB7XHJcbiAgICAgICAgY29uc3QgJGNhbGVuZGFyID0gJCh0aGlzLmNhbGVuZGFyKTtcclxuICAgICAgICAkY2FsZW5kYXIuZnVsbENhbGVuZGFyKCd1bnNlbGVjdCcpXHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgaXNFZGl0aW5nRXZlbnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBpc0NyZWF0aW5nRXZlbnQ6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGlkPSd3aXotdG9tYXRvLWNhbGVuZGFyJyA+XHJcbiAgICAgICAgICAgICAgICA8Q2FsZW5kYXIgXHJcbiAgICAgICAgICAgICAgICAgICAgb25FdmVudENsaWNrPXt0aGlzLmhhbmRsZUV2ZW50Q2xpY2t9IFxyXG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLmhhbmRsZVNlbGVjdH1cclxuICAgICAgICAgICAgICAgICAgICBvbkNhbGVuZGFyUmVuZGVyPXt0aGlzLmhhbmRsZUNhbGVuZGFyUmVuZGVyfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAhIXRoaXMuc3RhdGUuc2VsZWN0ZWRSYW5nZSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8RXZlbnRDcmVhdE1vZGFsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXt0aGlzLnN0YXRlLnNlbGVjdGVkUmFuZ2UuanNFdmVudC5wYWdlWH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3c9e3RoaXMuc3RhdGUuaXNDcmVhdGluZ0V2ZW50fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Nb2RhbENsb3NlPXt0aGlzLmhhbmRsZU1vZGFsQ2xvc2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0NyZWF0aW5nRXZlbnQ9e3RoaXMuc3RhdGUuaXNDcmVhdGluZ0V2ZW50fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRSYW5nZT17dGhpcy5zdGF0ZS5zZWxlY3RlZFJhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICEhdGhpcy5zdGF0ZS5pc1Nob3dpbmdFdmVudCAmJiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgPEV2ZW50UG9wb3ZlciBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17dGhpcy5zdGF0ZS5jbGlja2VkQXJncy5ldmVudC5pZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50PXt0aGlzLnN0YXRlLmNsaWNrZWRBcmdzLmV2ZW50fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmZXJlbmNlPXt0aGlzLnN0YXRlLmNsaWNrZWRBcmdzLmpzRXZlbnQudGFyZ2V0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25FZGl0QnRuQ2xpY2s9e3RoaXMuaGFuZGxlRXZlbnRFZGl0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Qb3BvdmVySGlkZT17dGhpcy5oYW5kbGVQb3BvdmVySGlkZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz4gXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9DYWxlbmRhci5jc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vQ2FsZW5kYXIuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9DYWxlbmRhci5jc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IEZ1bGxDYWxlbmRhciBmcm9tICcuL0Z1bGxDYWxlbmRhcic7XHJcbmltcG9ydCAnZnVsbGNhbGVuZGFyLXJlYWN0d3JhcHBlci9kaXN0L2Nzcy9mdWxsY2FsZW5kYXIubWluLmNzcyc7XHJcbmltcG9ydCAnLi9DYWxlbmRhci5jc3MnO1xyXG5pbXBvcnQgV2l6RXZlbnREYXRhTG9hZGVyIGZyb20gJy4uLy4uL21vZGVscy9XaXpFdmVudERhdGFMb2FkZXInXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYWxlbmRhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBldmVudHM6IFtdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGF0YUxvYWRlciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jYWxlbmRhciA9IG51bGw7XHJcbiAgICAgICAgLy/nu5Hlrprlj6Xmn4RcclxuICAgICAgICB0aGlzLmhhbmRsZUZ1bGxDYWxlbmRhclJlbmRlciA9IHRoaXMuaGFuZGxlRnVsbENhbGVuZGFyUmVuZGVyLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5vblZpZXdSZW5kZXIgPSB0aGlzLm9uVmlld1JlbmRlci5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMub25FdmVudFJlbmRlciA9IHRoaXMub25FdmVudFJlbmRlci5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMub25FdmVudERyb3AgPSB0aGlzLm9uRXZlbnREcm9wLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5vbkV2ZW50UmVzaXplID0gdGhpcy5vbkV2ZW50UmVzaXplLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5LqL5Lu25Y+l5p+EXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICBoYW5kbGVGdWxsQ2FsZW5kYXJSZW5kZXIoZWwpIHtcclxuICAgICAgICAvLyBGdWxsQ2FsZW5kYXIg5riy5p+T5LmL5YmN5omn6KGM5q2k5Y+l5p+E77yM5Lyg5YWlRE9NXHJcbiAgICAgICAgdGhpcy5jYWxlbmRhciA9IGVsO1xyXG4gICAgICAgIHRoaXMuZGF0YUxvYWRlciA9IG5ldyBXaXpFdmVudERhdGFMb2FkZXIodGhpcy5jYWxlbmRhcik7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNhbGVuZGFyUmVuZGVyKGVsKTtcclxuICAgIH1cclxuXHJcbiAgICBvblZpZXdSZW5kZXIoIHZpZXcsIGVsZW1lbnQgKSB7XHJcbiAgICAgICAgLy8g5Yi35paw6KeG5Zu+77yM6YeN5paw6I635Y+W5pel5Y6G5LqL5Lu2XHJcbiAgICAgICAgY29uc3QgJGNhbGVuZGFyID0gJCh0aGlzLmNhbGVuZGFyKTtcclxuICAgICAgICBjb25zdCBldmVudFNvdXJjZXMgPSB0aGlzLmRhdGFMb2FkZXIuZ2V0RXZlbnRTb3VyY2VzKCB2aWV3LCBlbGVtZW50ICk7XHJcbiAgICAgICAgJGNhbGVuZGFyLmZ1bGxDYWxlbmRhcigncmVtb3ZlRXZlbnRzJyk7XHJcbiAgICAgICAgZm9yIChsZXQgaT0wIDsgaSA8IGV2ZW50U291cmNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAkY2FsZW5kYXIuZnVsbENhbGVuZGFyKCdhZGRFdmVudFNvdXJjZScsIGV2ZW50U291cmNlc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRXZlbnREcm9wKCBldmVudCwgZGVsdGEsIHJldmVydEZ1bmMsIGpzRXZlbnQsIHVpLCB2aWV3ICkge1xyXG4gICAgICAgIGlmIChldmVudC5pZCl7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YUxvYWRlci51cGRhdGVFdmVudERhdGFPbkRyb3AoZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXZlcnRGdW5jKCk7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgb25FdmVudFJlc2l6ZSggZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldyApIHtcclxuICAgICAgICBpZiAoZXZlbnQuaWQpe1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFMb2FkZXIudXBkYXRlRXZlbnREYXRhT25SZXNpemUoZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV2ZXJ0RnVuYygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkV2ZW50UmVuZGVyKCBldmVudE9iaiwgJGVsICkge1xyXG4gICAgICAgIC8vIOiuvue9ruaWh+acrOminOiJslxyXG4gICAgICAgIGNvbnN0IHJnYlN0cmluZyA9ICRlbC5jc3MoJ2JhY2tncm91bmQtY29sb3InKTtcclxuICAgICAgICBjb25zdCByZ2JBcnJheSA9IC9ecmdiXFwoKFxcZCopLCAoXFxkKiksIChcXGQqKVxcKSQvLmV4ZWMocmdiU3RyaW5nKTtcclxuICAgICAgICBpZiAocmdiQXJyYXkpIHtcclxuICAgICAgICAgICAgY29uc3QgaHNsID0gcmdiMmhzbChyZ2JBcnJheVsxXSwgcmdiQXJyYXlbMl0sIHJnYkFycmF5WzNdKTtcclxuICAgICAgICAgICAgY29uc3QgbGlnaHRuZXNzID0gaHNsWzJdIC0gTWF0aC5jb3MoIChoc2xbMF0rNzApIC8gMTgwKk1hdGguUEkgKSAqIDAuMTU7XHJcbiAgICAgICAgICAgIGNvbnN0IHRleHRDb2xvciA9IGxpZ2h0bmVzcyA+IDAuNSA/ICcjMjIyJyA6ICd3aGl0ZSc7XHJcbiAgICAgICAgICAgICRlbC5jc3MoJ2NvbG9yJywgdGV4dENvbG9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5YWD57Sg5bey57uP5riy5p+T77yM5Y+v5L+u5pS55YWD57SgXHJcbiAgICAgICAgY29uc3QgaXNDb21wbGV0ZSA9IHBhcnNlSW50KGV2ZW50T2JqLmNvbXBsZXRlKSA9PSA1O1xyXG4gICAgICAgIGlmICggaXNDb21wbGV0ZSApIHtcclxuICAgICAgICAgICAgLy8g5qC35byPXHJcbiAgICAgICAgICAgICRlbC5hZGRDbGFzcygndGMtY29tcGxldGUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiBcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDorr7nva7kuovku7blj6Xmn4RcclxuICAgICAgICAgKiDlm6DkuLpmdWxsY2FsZW5kYXItcmVhY3RXcmFwcGVy55qE5a6e546w5piv55u05o6l6L+U5ZuePGRpdiBpZD0nZnVsbGNhbGVuZGFyJz48L2Rpdj5cclxuICAgICAgICAgKiDlubbkuJTosIPnlKgkKCcjZnVsbGNhbGVuZGFyJykuZnVsbGNhbGVuZGFyKHRoaXMucHJvcHMp6L+b6KGM5p6E5bu677yM5Zug5q2kUmVhY3TlubbmsqHmnIlcclxuICAgICAgICAgKiDnrqHnkIZGdWxsQ2FsZW5kYXLnirbmgIHlkozmuLLmn5PnmoTog73lipvjgILmiYDku6Xnm7TmjqXlnKjorr7nva7kuK3lgZrlpb1jYWxsYmFja++8jOiuqeaPkuS7tuiHquaIkeeuoeeQhuOAglxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJjYWxlbmRhci1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgIDxGdWxsQ2FsZW5kYXIgb25GdWxsQ2FsZW5kYXJSZW5kZXIgPSB7dGhpcy5oYW5kbGVGdWxsQ2FsZW5kYXJSZW5kZXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5Z+65pys6YWN572uXHJcbiAgICAgICAgICAgICAgICAgICAgaWQgPSBcImNhbGVuZGFyXCJcclxuICAgICAgICAgICAgICAgICAgICB0aGVtZVN5c3RlbSA9ICdzdGFuZGFyZCdcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQgPSAncGFyZW50J1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlciA9IHt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6ICdwcmV2LG5leHQsdG9kYXknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjZW50ZXI6ICd0aXRsZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAnbW9udGgsYWdlbmRhV2VlayxhZ2VuZGFEYXksbGlzdFdlZWsnXHJcbiAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAvLyDkuK3mlofljJZcclxuICAgICAgICAgICAgICAgICAgICBidXR0b25UZXh0ID0ge3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9kYXk6ICfku4rlpKknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aDogJ+aciCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlZWs6ICflkagnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXk6ICfml6UnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0OiAn6KGoJ1xyXG4gICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgbW9udGhOYW1lcyA9IHtbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcx5pyIJywgJzLmnIgnLCAnM+aciCcsICc05pyIJywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc15pyIJywgJzbmnIgnLCAnN+aciCcsICc45pyIJywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc55pyIJywgJzEw5pyIJywgJzEx5pyIJywgJzEy5pyIJ1xyXG4gICAgICAgICAgICAgICAgICAgIF19XHJcbiAgICAgICAgICAgICAgICAgICAgbW9udGhOYW1lc1Nob3J0ID0ge1tcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzHmnIgnLCAnMuaciCcsICcz5pyIJywgJzTmnIgnLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzXmnIgnLCAnNuaciCcsICc35pyIJywgJzjmnIgnLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgJznmnIgnLCAnMTDmnIgnLCAnMTHmnIgnLCAnMTLmnIgnXHJcbiAgICAgICAgICAgICAgICAgICAgXX1cclxuICAgICAgICAgICAgICAgICAgICBkYXlOYW1lcyA9IHtbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICflkajml6UnLCAn5ZGo5LiAJywgJ+WRqOS6jCcsICflkajkuIknLCAn5ZGo5ZubJywgJ+WRqOS6lCcsICflkajlha0nXHJcbiAgICAgICAgICAgICAgICAgICAgXX1cclxuICAgICAgICAgICAgICAgICAgICBkYXlOYW1lc1Nob3J0ID0ge1tcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ+WRqOaXpScsICflkajkuIAnLCAn5ZGo5LqMJywgJ+WRqOS4iScsICflkajlm5snLCAn5ZGo5LqUJywgJ+WRqOWFrSdcclxuICAgICAgICAgICAgICAgICAgICBdfVxyXG4gICAgICAgICAgICAgICAgICAgIGFsbERheVRleHQgPSAn5YWo5aSpJ1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOiuvue9ruinhuWbvlxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWaWV3ID0gJ2FnZW5kYVdlZWsnXHJcbiAgICAgICAgICAgICAgICAgICAgbm93SW5kaWNhdG9yID0ge3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3REYXkgPSB7MX1cclxuICAgICAgICAgICAgICAgICAgICB2aWV3cyA9IHt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFnZW5kYToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluVGltZTogXCIwODowMDowMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xvdExhYmVsRm9ybWF0OiAnaCg6bW0pIGEnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgbmF2TGlua3M9IHt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgIGFsbERheURlZmF1bHQgPSB7ZmFsc2V9XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRMaW1pdD0ge3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6K6+572u5LqL5Lu2XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0YWJsZSA9IHt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdEhlbHBlciA9IHt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRhYmxlID0ge3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yY2VFdmVudER1cmF0aW9uID0ge3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6K6+572uVUlcclxuICAgICAgICAgICAgICAgICAgICB1bnNlbGVjdENhbmNlbCA9ICcubW9kYWwgKidcclxuICAgICAgICAgICAgICAgICAgICBkcmFnT3BhY2l0eSA9IHt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibW9udGhcIjogLjUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWdlbmRhV2Vla1wiOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFnZW5kYURheVwiOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAvLyDorr7nva7lj6Xmn4RcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3QgPSB7dGhpcy5wcm9wcy5vblNlbGVjdH1cclxuICAgICAgICAgICAgICAgICAgICB2aWV3UmVuZGVyID0ge3RoaXMub25WaWV3UmVuZGVyfVxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50UmVuZGVyID0ge3RoaXMub25FdmVudFJlbmRlcn1cclxuICAgICAgICAgICAgICAgICAgICBldmVudENsaWNrID0ge3RoaXMucHJvcHMub25FdmVudENsaWNrfVxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50RHJvcCA9IHt0aGlzLm9uRXZlbnREcm9wfVxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50UmVzaXplID0ge3RoaXMub25FdmVudFJlc2l6ZX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJnYjJoc2wociwgZywgYikge1xyXG4gICAgciAvPSAyNTU7IGcgLz0gMjU1OyBiIC89IDI1NTtcclxuXHJcbiAgICB2YXIgTSA9IE1hdGgubWF4KHIsIGcsIGIpO1xyXG4gICAgdmFyIG0gPSBNYXRoLm1pbihyLCBnLCBiKTtcclxuICAgIHZhciBDID0gTSAtIG07XHJcbiAgICB2YXIgTCA9IDAuNSooTSArIG0pO1xyXG4gICAgdmFyIFMgPSAoQyA9PT0gMCkgPyAwIDogQy8oMS1NYXRoLmFicygyKkwtMSkpO1xyXG5cclxuICAgIHZhciBoO1xyXG4gICAgaWYgKEMgPT09IDApIGggPSAwOyAvLyBzcGVjJ2QgYXMgdW5kZWZpbmVkLCBidXQgdXN1YWxseSBzZXQgdG8gMFxyXG4gICAgZWxzZSBpZiAoTSA9PT0gcikgaCA9ICgoZy1iKS9DKSAlIDY7XHJcbiAgICBlbHNlIGlmIChNID09PSBnKSBoID0gKChiLXIpL0MpICsgMjtcclxuICAgIGVsc2UgaWYgKE0gPT09IGIpIGggPSAoKHItZykvQykgKyA0O1xyXG5cclxuICAgIHZhciBIID0gNjAgKiBoO1xyXG5cclxuICAgIC8vIOWIhuWIq+aYr2h1ZSwgc2F0LCBsdW1cclxuICAgIHJldHVybiBbSCwgcGFyc2VGbG9hdChTKSwgcGFyc2VGbG9hdChMKV07XHJcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgJCBmcm9tIFwianF1ZXJ5XCI7XHJcbmltcG9ydCBmdWxsQ2FsZW5kYXIgZnJvbSBcImZ1bGxjYWxlbmRhclwiO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcblxyXG5jbGFzcyBGdWxsY2FsZW5kYXJPYmplY3RNYXBwZXJ7XHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHJcblx0fVxyXG5cclxuXHRnZXRTZXR0aW5ncyhwcm9wZXJ0aWVzKXtcclxuXHRcdGxldCBuZXdTZXR0aW5ncyA9IHt9O1xyXG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gcHJvcGVydGllcykge1xyXG4gICAgICBcdFx0aWYgKHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgIFx0XHRuZXdTZXR0aW5nc1trZXldID0gcHJvcGVydGllc1trZXldO1xyXG4gICAgICBcdFx0fVxyXG4gICAgXHR9XHJcbiAgICBcdHJldHVybiBuZXdTZXR0aW5ncztcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZ1bGxDYWxlbmRhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMuanEgPSAkLm5vQ29uZmxpY3QoKTtcclxuXHRcdHRoaXMuZnVsbGNhbGVuZGFyT2JqZWN0TWFwcGVyID0gbmV3IEZ1bGxjYWxlbmRhck9iamVjdE1hcHBlcigpO1xyXG5cdFx0dGhpcy5pbnN0YW5jZSA9IG51bGw7XHJcblx0XHR0aGlzLmRhdGUgPSBuZXcgRGF0ZSgpO1xyXG5cdH1cclxuXHJcblx0Y29tcG9uZW50RGlkTW91bnQoKXtcclxuXHRcdHRoaXMucHJvcHMub25GdWxsQ2FsZW5kYXJSZW5kZXIodGhpcy5lbCk7XHJcblx0XHRjb25zdCBvYmplY3RNYXBwZXJTZXR0aW5ncyA9IHRoaXMuZnVsbGNhbGVuZGFyT2JqZWN0TWFwcGVyLmdldFNldHRpbmdzKHRoaXMucHJvcHMpO1xyXG5cdFx0dGhpcy5pbnN0YW5jZSA9IHRoaXMuanEodGhpcy5lbCkuZnVsbENhbGVuZGFyKG9iamVjdE1hcHBlclNldHRpbmdzKTtcclxuXHR9XHJcblxyXG4gIFx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xyXG5cdFx0ICBcclxuXHR9XHJcblxyXG5cdHJlbmRlcigpe1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgaWQ9J2NhbGVuZGFyJyByZWY9eyBlbCA9PiB0aGlzLmVsID0gZWwgfT48L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9FdmVudFBvcG92ZXIuY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL0V2ZW50UG9wb3Zlci5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL0V2ZW50UG9wb3Zlci5jc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgJy4vRXZlbnRQb3BvdmVyLmNzcyc7XHJcbmltcG9ydCBQb3BwZXIgZnJvbSAncG9wcGVyLmpzJztcclxuaW1wb3J0IFBvcG92ZXJUaXRsZUlucHV0IGZyb20gJy4vUG9wb3ZlclRpdGxlSW5wdXQnO1xyXG5pbXBvcnQgUG9wb3ZlclRvb2xiYXIgZnJvbSAnLi9Qb3BvdmVyVG9vbGJhcic7XHJcbmltcG9ydCBFdmVudEhhbmRsZXMgZnJvbSAnLi4vLi4vbW9kZWxzL0V2ZW50SGFuZGxlcyc7XHJcbmltcG9ydCB7IEZvcm0sIEdseXBoaWNvbiB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcbmltcG9ydCBEYXRlVGltZVBpY2tlckdyb3VwIGZyb20gJy4uL0Zvcm0vRGF0ZVRpbWVQaWNrZXJHcm91cCc7XHJcbmltcG9ydCBDb2xvclBpY2tlckdyb3VwIGZyb20gJy4uL0Zvcm0vQ29sb3JQaWNrZXJHcm91cCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudFBvcG92ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5wb3BwZXJOb2RlID0gbnVsbDtcclxuICAgICAgICB0aGlzLnBvcHBlckluc3RhbmNlID0gbnVsbDtcclxuICAgICAgICB0aGlzLmV2ZW50SGFuZGxlcyA9IG5ldyBFdmVudEhhbmRsZXMoKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIG5ld0V2ZW50RGF0YToge31cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g57uR5a6a5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5hdXRvSGlkZSA9IHRoaXMuYXV0b0hpZGUuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZURhdGVUaW1lQ2hhbmdlID0gdGhpcy5oYW5kbGVEYXRlVGltZUNoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlVGl0bGVDaGFuZ2UgPSB0aGlzLmhhbmRsZVRpdGxlQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVDb2xvckNoYW5nZSA9IHRoaXMuaGFuZGxlQ29sb3JDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUJ0bkNsaWNrID0gdGhpcy5oYW5kbGVCdG5DbGljay5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOWKqOeUu+aViOaenFxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgYXV0b0hpZGUoZSkge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgLy8g5LiN5piv5pel5Y6G5LqL5Lu25YWD57SgXHJcbiAgICAgICAgICAgICEkKHRoaXMucHJvcHMucmVmZXJlbmNlKS5pcyhlLnRhcmdldCkgJiZcclxuICAgICAgICAgICAgLy8g5Lmf5LiN5piv5a2Q5YWD57SgXHJcbiAgICAgICAgICAgICQodGhpcy5wcm9wcy5yZWZlcmVuY2UpLmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwICYmXHJcbiAgICAgICAgICAgIC8vIOS4jeaYr3BvcHBlcuWFg+e0oFxyXG4gICAgICAgICAgICAhJCh0aGlzLnBvcHBlck5vZGUpLmlzKGUudGFyZ2V0KSAmJlxyXG4gICAgICAgICAgICAvLyDkuZ/kuI3mmK/lrZDlhYPntKBcclxuICAgICAgICAgICAgJCh0aGlzLnBvcHBlck5vZGUpLmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoaWRlKCkge1xyXG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xyXG4gICAgICAgICAgICAkKHRoYXQucG9wcGVyTm9kZSkuaGlkZSgwLCBudWxsLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgdGhhdC5wcm9wcy5vblBvcG92ZXJIaWRlKCk7IC8vVE9ETzog5Lqk55Sx54i25YWD57Sg5Y246L296K+l57uE5Lu25a6e5L6L77yM5oSf6KeJ6L+Z6YeM5LiN5aalXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc2hvdygpIHtcclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcclxuICAgICAgICAgICAgJCh0aGF0LnBvcHBlck5vZGUpLmZhZGVJbigzNTAsIG51bGwsIHJlc29sdmUpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8g5LqL5Lu25Y+l5p+EXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICBoYW5kbGVUaXRsZUNoYW5nZShlKSB7XHJcbiAgICAgICAgLy/lgqjlrZjliLDlsIbmlrDnmoTlgLzlgqjlrZhuZXdFdmVudERhdGHph4zvvIzlvZPkv53lrZjml7bmo4DntKJuZXdFdmVudERhdGHliJfooahcclxuICAgICAgICBjb25zdCBuZXdUaXRsZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoZnVuY3Rpb24ocHJldlN0YXRlLCBwcm9wcykge1xyXG4gICAgICAgICAgICAvL+aLt+i0neWJjeS4gOS4quWvueixoVxyXG4gICAgICAgICAgICBjb25zdCBuZXdFdmVudERhdGEgPSBPYmplY3QuY3JlYXRlKHByZXZTdGF0ZS5uZXdFdmVudERhdGEpO1xyXG4gICAgICAgICAgICBuZXdFdmVudERhdGEudGl0bGUgPSBuZXdUaXRsZTtcclxuICAgICAgICAgICAgcmV0dXJuIHsgbmV3RXZlbnREYXRhIH07XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDb2xvckNoYW5nZShjb2xvclZhbHVlKSB7XHJcbiAgICAgICAgY29uc3QgbmV3Q29sb3IgPSBjb2xvclZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoZnVuY3Rpb24ocHJldlN0YXRlLCBwcm9wcykge1xyXG4gICAgICAgICAgICAvL+aLt+i0neWJjeS4gOS4quWvueixoVxyXG4gICAgICAgICAgICBjb25zdCBuZXdFdmVudERhdGEgPSBPYmplY3QuY3JlYXRlKHByZXZTdGF0ZS5uZXdFdmVudERhdGEpO1xyXG4gICAgICAgICAgICBuZXdFdmVudERhdGEuYmFja2dyb3VuZENvbG9yID0gbmV3Q29sb3I7XHJcbiAgICAgICAgICAgIHJldHVybiB7IG5ld0V2ZW50RGF0YSB9O1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlRGF0ZVRpbWVDaGFuZ2UoZSkge1xyXG4gICAgICAgIC8v5pqC5pe25LiN5YWB6K645pu05pS5XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQnRuQ2xpY2soZSkge1xyXG4gICAgICAgIGNvbnN0IGlkID0gZS50YXJnZXQuaWQ7XHJcbiAgICAgICAgY29uc3QgYnRuVHlwZSA9IGlkLnNwbGl0KCctJylbMl07XHJcbiAgICAgICAgY29uc3QgaGFuZGxlTmFtZSA9IGBvbiR7YnRuVHlwZX1CdG5DbGlja2BcclxuICAgICAgICB0aGlzLmhpZGUoKS50aGVuKCAocmV0KSA9PiB7XHJcbiAgICAgICAgICAgIHN3aXRjaChoYW5kbGVOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdvbkVkaXRCdG5DbGljayc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkVkaXRCdG5DbGljayh0aGlzLnByb3BzLmV2ZW50KTsgLy/kuqTnlLHniLblhYPntKBcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudEhhbmRsZXNbaGFuZGxlTmFtZV0odGhpcy5wcm9wcy5ldmVudCwgdGhpcy5zdGF0ZS5uZXdFdmVudERhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyDnlJ/lkb3lkajmnJ9cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIC8vIOWIneWni+WMlue7hOS7tlxyXG4gICAgICAgIHRoaXMucG9wcGVySW5zdGFuY2UgPSBuZXcgUG9wcGVyKHRoaXMucHJvcHMucmVmZXJlbmNlLCB0aGlzLnBvcHBlck5vZGUsIHtcclxuXHRcdFx0cGxhY2VtZW50OiAnYXV0bycsXHJcblx0XHRcdG1vZGlmaWVyczoge1xyXG5cdFx0XHRcdGFycm93OiB7XHJcblx0XHRcdFx0ICBlbGVtZW50OiAnLmFycm93J1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdH0pO1xyXG4gICAgICAgIC8vIOiuvue9ruiHquWKqOmakOiXj1xyXG4gICAgICAgICQoZG9jdW1lbnQpLm9mZignY2xpY2snLCB0aGlzLmF1dG9IaWRlKS5vbignY2xpY2snLCB0aGlzLmF1dG9IaWRlKTtcclxuICAgICAgICAvLyDmmL7npLpcclxuICAgICAgICB0aGlzLnNob3coKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUsIHNuYXBzaG90KSB7XHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLnNob3coKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcclxuICAgICAgICAvLyDlvZPmm7TmlrDlsZ7mgKfml7bmiY3op6blj5HliqjnlLvmlYjmnpxcclxuICAgICAgICBpZiAoIG5leHRQcm9wcyAhPSB0aGlzLnByb3BzICkge1xyXG4gICAgICAgICAgICAvLyDorr7nva7mm7TmlrDml7bnmoTliqjnlLtcclxuICAgICAgICAgICAgdGhpcy5oaWRlKCkudGhlbiggKHJldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy/mm7TmlrDlrprkvY1cclxuICAgICAgICAgICAgICAgIHRoaXMucG9wcGVySW5zdGFuY2UucmVmZXJlbmNlID0gbmV4dFByb3BzLnJlZmVyZW5jZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9wcGVySW5zdGFuY2UudXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ2NsaWNrJywgdGhpcy5hdXRvSGlkZSk7XHJcbiAgICAgICAgdGhpcy5wb3BwZXJJbnN0YW5jZS5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IGV2ZW50U3RhcnQgPSB0aGlzLnByb3BzLmV2ZW50LnN0YXJ0LmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG4gICAgICAgIGNvbnN0IGNvbG9yVmFsdWUgPSB0aGlzLnByb3BzLmV2ZW50LmJhY2tncm91bmRDb2xvcjtcclxuICAgICAgICBjb25zdCBlbmFibGVTYXZlQnRuID0gISF0aGlzLnN0YXRlLm5ld0V2ZW50RGF0YS50aXRsZSB8fCAhIXRoaXMuc3RhdGUubmV3RXZlbnREYXRhLmJhY2tncm91bmRDb2xvcjtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRjLXBvcG92ZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7ZGlzcGxheTogJ25vbmUnfX1cclxuICAgICAgICAgICAgICAgICAgICByZWY9eyhkaXYpID0+IHRoaXMucG9wcGVyTm9kZSA9IGRpdn0gPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhcnJvd1wiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0Yy1wb3BvdmVyLWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxQb3BvdmVyVGl0bGVJbnB1dCBcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXt0aGlzLnByb3BzLmV2ZW50LmlkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudFRpdGxlPXt0aGlzLnByb3BzLmV2ZW50LnRpdGxlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvblRpdGxlQ2hhbmdlPXt0aGlzLmhhbmRsZVRpdGxlQ2hhbmdlfSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Rm9ybT0ndGMtcG9wb3Zlci1ldmVudC1lZGl0Rm9ybScgLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0Yy1wb3BvdmVyLWJvZHlcIj5cclxuICAgICAgICAgICAgICAgICAgICA8Rm9ybSBob3Jpem9udGFsIGlkPSd0Yy1wb3BvdmVyLWV2ZW50LWVkaXRGb3JtJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPERhdGVUaW1lUGlja2VyR3JvdXAgaG9yaXpvbnRhbCByZWFkT25seSBpZCA9ICd0Yy1lZGl0cG9wcGVyLWV2ZW50ZGF0ZScgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD17PGkgY2xhc3NOYW1lPSdmYXIgZmEtY2FsZW5kYXItYWx0IGZhLWxnJyAvPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtldmVudFN0YXJ0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25EYXRlVGltZUNoYW5nZT17dGhpcy5oYW5kbGVEYXRlVGltZUNoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbG9yUGlja2VyR3JvdXAgaG9yaXpvbnRhbCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17dGhpcy5wcm9wcy5ldmVudC5pZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPSd0Yy1lZGl0cG9wcGVyLWV2ZW50Y29sb3InIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9ezxpIGNsYXNzTmFtZT0nZmFzIGZhLXBhaW50LWJydXNoIGZhLWxnJyAvPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtjb2xvclZhbHVlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Db2xvckNoYW5nZT17dGhpcy5oYW5kbGVDb2xvckNoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L0Zvcm0+XHJcbiAgICAgICAgICAgICAgICAgICAgPFBvcG92ZXJUb29sYmFyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlPXt0aGlzLnByb3BzLmV2ZW50LmNvbXBsZXRlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVTYXZlQnRuPXtlbmFibGVTYXZlQnRufVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkJ0bkNsaWNrPXt0aGlzLmhhbmRsZUJ0bkNsaWNrfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL1BvcG92ZXJUaXRsZUlucHV0LmNzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9Qb3BvdmVyVGl0bGVJbnB1dC5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL1BvcG92ZXJUaXRsZUlucHV0LmNzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAnLi9Qb3BvdmVyVGl0bGVJbnB1dC5jc3MnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRUaXRsZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICAvL+WIneWni+WMlueKtuaAgVxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLmV2ZW50VGl0bGVcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZSA9IHRoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQ2hhbmdlKGUpIHtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBlLnRhcmdldC52YWx1ZX0pXHJcbiAgICAgICAgLy/lsIbkuovku7bkvKDpgJLkuIrljrtcclxuICAgICAgICB0aGlzLnByb3BzLm9uVGl0bGVDaGFuZ2UoZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwidGMtZWRpdHBvcHBlci1ldmVudHRpdGxlXCIgXHJcbiAgICAgICAgICAgICAgICBodG1sRm9yPXt0aGlzLnByb3BzLnRhcmdldEZvcm19XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9J2V2ZW50dGl0bGUnXHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCB7IEJ1dHRvbiwgQnV0dG9uR3JvdXAsIEJ1dHRvblRvb2xiYXIsIFNwbGl0QnV0dG9uLCBEcm9wZG93bkJ1dHRvbiwgTWVudUl0ZW0gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wb3ZlclRvb2xiYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxCdXR0b25Ub29sYmFyPlxyXG4gICAgICAgICAgICAgICAgPEJ1dHRvbkdyb3VwPlxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b24gaWQ9J3RjLWVkaXRwb3BwZXItU2F2ZScgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25CdG5DbGlja31cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyF0aGlzLnByb3BzLmVuYWJsZVNhdmVCdG59PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICDkv53lrZhcclxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGlkPSd0Yy1lZGl0cG9wcGVyLUNvbXBsZXRlJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQnRuQ2xpY2t9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7cGFyc2VJbnQodGhpcy5wcm9wcy5jb21wbGV0ZSkgPT0gNSA/ICfmgaLlpI0nIDogJ+WujOaIkCd9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBpZD0ndGMtZWRpdHBvcHBlci1FZGl0J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQnRuQ2xpY2t9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICDnvJbovpFcclxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8U3BsaXRCdXR0b24gcHVsbFJpZ2h0IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT0n5Yig6ZmkJyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ9J3RjLWVkaXRwb3BwZXItRGVsZXRlRGF0YScgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25CdG5DbGlja30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxNZW51SXRlbSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50S2V5PVwiMVwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9J3RjLWVkaXRwb3BwZXItT3BlbkRvYydcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25CdG5DbGlja30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICDmiZPlvIDmupDmlofmoaNcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9NZW51SXRlbT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPE1lbnVJdGVtIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRLZXk9XCIyXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD0ndGMtZWRpdHBvcHBlci1EZWxldGVEb2MnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQnRuQ2xpY2t9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAg5Yig6Zmk5rqQ5paH5qGjXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTWVudUl0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9TcGxpdEJ1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvQnV0dG9uR3JvdXA+XHJcbiAgICAgICAgICAgIDwvQnV0dG9uVG9vbGJhcj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIENvbnRyb2xMYWJlbCwgQ29sfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXV0b0Zvcm1Hcm91cCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IGlzSG9yaXpvbnRhbCA9IHRoaXMucHJvcHMuaG9yaXpvbnRhbDtcclxuICAgICAgICBpZiAoaXNIb3Jpem9udGFsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8Rm9ybUdyb3VwIGNvbnRyb2xJZD17dGhpcy5wcm9wcy5jb250cm9sSWR9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxDb2wgY29tcG9uZW50Q2xhc3M9e0NvbnRyb2xMYWJlbH0gc209ezJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJlbH1cclxuICAgICAgICAgICAgICAgICAgICA8L0NvbD5cclxuICAgICAgICAgICAgICAgICAgICA8Q29sIHNtPXsxMH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG4gICAgICAgICAgICAgICAgICAgIDwvQ29sPlxyXG4gICAgICAgICAgICAgICAgPC9Gb3JtR3JvdXA+XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPEZvcm1Hcm91cCBjb250cm9sSWQ9e3RoaXMucHJvcHMuY29udHJvbElkfT5cclxuICAgICAgICAgICAgICAgICAgICA8Q29udHJvbExhYmVsPnt0aGlzLnByb3BzLmxhYmVsfTwvQ29udHJvbExhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG4gICAgICAgICAgICAgICAgPC9Gb3JtR3JvdXA+ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBBdXRvRm9ybUdyb3VwIGZyb20gJy4vQXV0b0Zvcm1Hcm91cCc7XHJcbmNvbnN0IEh1ZWJlZSA9IHJlcXVpcmUoJ2h1ZWJlZS9kaXN0L2h1ZWJlZS5wa2dkJyk7IFxyXG5pbXBvcnQgJ2h1ZWJlZS9kaXN0L2h1ZWJlZS5jc3MnO1xyXG5cclxuY2xhc3MgQ29sb3JJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5wcm9wcy52YWx1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZSA9IHRoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQ2hhbmdlKGpzRXZlbnRPclZhbHVlKSB7XHJcbiAgICAgICAgbGV0IG5ld0NvbG9yVmFsdWU7XHJcbiAgICAgICAgaWYgKCB0eXBlb2YganNFdmVudE9yVmFsdWUgPT0gJ29iamVjdCcgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBqc0V2ZW50T3JWYWx1ZS50YXJnZXQudmFsdWV9KTtcclxuICAgICAgICAgICAgbmV3Q29sb3JWYWx1ZSA9IGpzRXZlbnRPclZhbHVlLnRhcmdldC52YWx1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKCB0eXBlb2YganNFdmVudE9yVmFsdWUgPT0gJ3N0cmluZycgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBqc0V2ZW50T3JWYWx1ZX0pO1xyXG4gICAgICAgICAgICBuZXdDb2xvclZhbHVlID0ganNFdmVudE9yVmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucHJvcHMub25Db2xvckNoYW5nZShuZXdDb2xvclZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvL1RPRE86IOagueaNrumlseWSjOW6puiuoeeul+Wtl+S9k+minOiJslxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIC8vIOWIneWni+WMlue7hOS7tlxyXG4gICAgICAgIHRoaXMuaHVlYmVlSW5zdGFuY2UgPSBuZXcgSHVlYmVlKHRoaXMuZWwsIHtcclxuICAgICAgICAgICAgc3RhdGljT3BlbjogZmFsc2UsIC8vIERpc3BsYXlzIG9wZW4gYW5kIHN0YXlzIG9wZW4uIFxyXG4gICAgICAgICAgICBzZXRUZXh0OiB0cnVlLCAvLyBTZXRzIGVsZW1lbnRz4oCZIHRleHQgdG8gY29sb3IuIOWwhuWOn+Wni+eahOaWh+acrOiuvue9ruiuvue9ruaIkOminOiJsuWAvC5cclxuICAgICAgICAgICAgc2V0QkdDb2xvcjogdHJ1ZSwgLy8gU2V0cyBlbGVtZW50c+KAmSBiYWNrZ3JvdW5kIGNvbG9yIHRvIGNvbG9yLlxyXG4gICAgICAgICAgICBodWVzOiAxMiwgLy8gTnVtYmVyIG9mIGh1ZXMgb2YgdGhlIGNvbG9yIGdyaWQuIEh1ZXMgYXJlIHNsaWNlcyBvZiB0aGUgY29sb3Igd2hlZWwuXHJcbiAgICAgICAgICAgIGh1ZTA6IDAsIC8vIFRoZSBmaXJzdCBodWUgb2YgdGhlIGNvbG9yIGdyaWQuIFxyXG4gICAgICAgICAgICBzaGFkZXM6IDUsIC8vIE51bWJlciBvZiBzaGFkZXMgb2YgY29sb3JzIGFuZCBzaGFkZXMgb2YgZ3JheSBiZXR3ZWVuIHdoaXRlIGFuZCBibGFjay4gXHJcbiAgICAgICAgICAgIHNhdHVyYXRpb25zOiAyLCAvLyBOdW1iZXIgb2Ygc2V0cyBvZiBzYXR1cmF0aW9uIG9mIHRoZSBjb2xvciBncmlkLlxyXG4gICAgICAgICAgICBub3RhdGlvbjogJ2hleCcsIC8vIFRleHQgc3ludGF4IG9mIGNvbG9ycyB2YWx1ZXMuXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZTogbnVsbCwgLy8gQ2xhc3MgYWRkZWQgdG8gSHVlYmVlIGVsZW1lbnQuIFVzZWZ1bCBmb3IgQ1NTLlxyXG4gICAgICAgICAgICBjdXN0b21Db2xvcnM6IFsgXHJcbiAgICAgICAgICAgICAgICAnIzMyQ0QzMicsICcjNTQ4NEVEJywgJyNBNEJERkUnLCBcclxuICAgICAgICAgICAgICAgICcjNDZENkRCJywgJyM3QUU3QkYnLCAnIzUxQjc0OScsXHJcbiAgICAgICAgICAgICAgICAnI0ZCRDc1QicsICcjRkZCODc4JywgJyNGRjg4N0MnLCBcclxuICAgICAgICAgICAgICAgICcjREMyMTI3JywgJyNEQkFERkYnLCAnI0UxRTFFMSdcdFxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy/liJ3lp4vljJbpopzoibJcclxuICAgICAgICB0aGlzLmh1ZWJlZUluc3RhbmNlLnNldENvbG9yKHRoaXMucHJvcHMudmFsdWUpO1xyXG4gICAgICAgIC8v55uR5ZCsaHVlYmVl6aKc6Imy6YCJ5oupXHJcbiAgICAgICAgdGhpcy5odWViZWVJbnN0YW5jZS5vbiggJ2NoYW5nZScsIHRoaXMuaGFuZGxlQ2hhbmdlKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcclxuICAgICAgICAvLyDmiYvliqjmm7TmlrB2YWx1ZVxyXG4gICAgICAgIHRoaXMuaHVlYmVlSW5zdGFuY2Uuc2V0Q29sb3IodGhpcy5zdGF0ZS52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgLy/ms6jmhI/vvIxodWViZWXmsqHmnIlkZXN0cm9555qE5pa55rOVXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9J2Zvcm0tY29udHJvbCcgXHJcbiAgICAgICAgICAgICAgICByZWY9e2VsID0+IHRoaXMuZWwgPSBlbH1cclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX0gLy/nm5HlkKzplK7nm5jovpPlhaVcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICApXHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xvclBpY2tlckdyb3VwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlID0gdGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDaGFuZ2UoY29sb3JWYWx1ZSkge1xyXG4gICAgICAgIC8v5ZCR5LiK5Lyg6YCSXHJcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNvbG9yQ2hhbmdlKGNvbG9yVmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8QXV0b0Zvcm1Hcm91cCB7Li4udGhpcy5wcm9wc30+XHJcbiAgICAgICAgICAgICAgICA8Q29sb3JJbnB1dCB7Li4udGhpcy5wcm9wc30vPlxyXG4gICAgICAgICAgICA8L0F1dG9Gb3JtR3JvdXA+XHJcbiAgICAgICAgKVxyXG5cclxuICAgIH1cclxufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIENvbnRyb2xMYWJlbCwgQ29sLCBGb3JtQ29udHJvbCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcbmltcG9ydCBBdXRvRm9ybUdyb3VwIGZyb20gJy4vQXV0b0Zvcm1Hcm91cCc7XHJcbmltcG9ydCAnbW9tZW50JztcclxuaW1wb3J0ICdib290c3RyYXAvanMvY29sbGFwc2UnO1xyXG5pbXBvcnQgJ2Jvb3RzdHJhcC9qcy90cmFuc2l0aW9uJztcclxuaW1wb3J0ICdlb25hc2Rhbi1ib290c3RyYXAtZGF0ZXRpbWVwaWNrZXInO1xyXG5pbXBvcnQgJ2VvbmFzZGFuLWJvb3RzdHJhcC1kYXRldGltZXBpY2tlci9idWlsZC9jc3MvYm9vdHN0cmFwLWRhdGV0aW1lcGlja2VyLmNzcyc7XHJcblxyXG5jbGFzcyBEYXRlVGltZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLnZhbHVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlID0gdGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDaGFuZ2UoZSkgeyBcclxuICAgICAgICBjb25zdCBuZXdEYXRlVmFsdWUgPSBlLmRhdGUuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJylcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogbmV3RGF0ZVZhbHVlfSk7XHJcbiAgICAgICAgLy8g5Lyg6YCSXHJcbiAgICAgICAgdGhpcy5wcm9wcy5vbkRhdGVUaW1lQ2hhbmdlKG5ld0RhdGVWYWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgLy8g5Yid5aeL5YyW57uE5Lu2XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucmVhZE9ubHkpIHRoaXMuZWwucmVhZE9ubHkgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuJGVsID0gJCh0aGlzLmVsKS5kYXRldGltZXBpY2tlcih7XHJcbiAgICAgICAgICAgIHNob3dUb2RheUJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgbG9jYWxlOiAnemgtY24nLFxyXG4gICAgICAgICAgICBmb3JtYXQ6ICdZWVlZLU1NLUREIEhIOm1tOnNzJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZSA9IHRoaXMuJGVsLmRhdGEoXCJEYXRlVGltZVBpY2tlclwiKTtcclxuICAgICAgICAvLyDliJ3lp4vljJblgLxcclxuICAgICAgICB0aGlzLmluc3RhbmNlLmRhdGUodGhpcy5wcm9wcy52YWx1ZSk7XHJcbiAgICAgICAgLy8g57uR5a6aY2hhbmdl5LqL5Lu2XHJcbiAgICAgICAgLy8g5pS+5Zyo5Yid5aeL5YyW5ZCO6L+b6KGM57uR5a6a77yM6YG/5YWN5Yid5aeL5YyW6L+H56iL6Kem5Y+RY2hhbmdl5LqL5Lu2XHJcbiAgICAgICAgdGhpcy4kZWwub24oXCJkcC5jaGFuZ2VcIiwgdGhpcy5oYW5kbGVDaGFuZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcclxuICAgICAgICAvLyDmiYvliqjmm7TmlrB2YWx1ZVxyXG4gICAgICAgIHRoaXMuaW5zdGFuY2UuZGF0ZSh0aGlzLnN0YXRlLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICAvLyBkZXN0cm95XHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5kZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy4kZWwub2ZmKFwiZHAuY2hhbmdlXCIsIHRoaXMuaGFuZGxlQ2hhbmdlKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0nZm9ybS1jb250cm9sJyBcclxuICAgICAgICAgICAgICAgIHJlZj17ZWwgPT4gdGhpcy5lbCA9IGVsfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgIClcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGVUaW1lUGlja2VyR3JvdXAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxBdXRvRm9ybUdyb3VwIHsuLi50aGlzLnByb3BzfT5cclxuICAgICAgICAgICAgICAgIDxEYXRlVGltZUlucHV0IHsuLi50aGlzLnByb3BzfSAvPlxyXG4gICAgICAgICAgICA8L0F1dG9Gb3JtR3JvdXA+ICAgICAgICAgICAgXHJcbiAgICAgICAgKVxyXG5cclxuICAgIH1cclxufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFJvdywgQ29sLCBGb3JtLCBGb3JtR3JvdXAsIEZvcm1Db250cm9sLCBDb250cm9sTGFiZWwgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5pbXBvcnQgVGl0bGVJbnB1dEdyb3VwIGZyb20gJy4vVGl0bGVJbnB1dEdyb3VwJztcclxuaW1wb3J0IERhdGVUaW1lUGlja2VyR3JvdXAgZnJvbSAnLi9EYXRlVGltZVBpY2tlckdyb3VwJztcclxuaW1wb3J0IENvbG9yUGlja2VyR3JvdXAgZnJvbSAnLi9Db2xvclBpY2tlckdyb3VwJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50RGV0YWlsRm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgLy/nlLHniLbnu4Tku7botJ/otKPlpITnkIbmlbDmja5cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgaGFuZGxlVGl0bGVDaGFuZ2UgPSB0aGlzLnByb3BzLm9uVGl0bGVDaGFuZ2U7XHJcbiAgICAgICAgY29uc3QgaGFuZGxlU3RhcnRDaGFuZ2UgPSB0aGlzLnByb3BzLm9uU3RhcnRDaGFuZ2U7XHJcbiAgICAgICAgY29uc3QgaGFuZGxlRW5kQ2hhbmdlID0gdGhpcy5wcm9wcy5vbkVuZENoYW5nZTtcclxuICAgICAgICBjb25zdCBoYW5kbGVDb2xvckNoYW5nZSA9IHRoaXMucHJvcHMub25Db2xvcmNoYW5nZTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8Rm9ybT5cclxuICAgICAgICAgICAgICAgIDxUaXRsZUlucHV0R3JvdXAgXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0ZvY3VzXHJcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbElkPVwidGMtY3JlYXRlcGFnZS1ldmVudHRpdGxlXCJcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5ldmVudFRpdGxlfSBcclxuICAgICAgICAgICAgICAgICAgICBvblRpdGxlQ2hhbmdlPXtoYW5kbGVUaXRsZUNoYW5nZX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8Um93PlxyXG4gICAgICAgICAgICAgICAgICAgIDxDb2wgc209ezZ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8RGF0ZVRpbWVQaWNrZXJHcm91cCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xJZD1cInRjLWNyZWF0ZXBhZ2UtZXZlbnRzdGFydFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIuW8gOWni+aXpeacn1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5zdGFydH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRGF0ZVRpbWVDaGFuZ2U9e2hhbmRsZVN0YXJ0Q2hhbmdlfSAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L0NvbD5cclxuICAgICAgICAgICAgICAgICAgICA8Q29sIHNtPXs2fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPERhdGVUaW1lUGlja2VyR3JvdXAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sSWQ9XCJ0Yy1jcmVhdGVwYWdlLWV2ZW50ZW5kXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwi57uT5p2f5pel5pyfXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLmVuZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRGF0ZVRpbWVDaGFuZ2U9e2hhbmRsZUVuZENoYW5nZX0gIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9Db2w+XHJcbiAgICAgICAgICAgICAgICA8L1Jvdz5cclxuICAgICAgICAgICAgICAgIDxSb3c+XHJcbiAgICAgICAgICAgICAgICAgICAgPENvbCBzbT17Nn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxDb2xvclBpY2tlckdyb3VwIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbElkPVwidGMtY3JlYXRlcGFnZS1ldmVudGNvbG9yXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwi6Imy5b2pXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLmJhY2tncm91bmRDb2xvcn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29sb3JDaGFuZ2U9e2hhbmRsZUNvbG9yQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvQ29sPlxyXG4gICAgICAgICAgICAgICAgICAgIDxDb2wgc209ezZ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUdyb3VwIGNvbnRyb2xJZD1cInRjLWNyZWF0ZXBhZ2UtZXZlbnR0YWdzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q29udHJvbExhYmVsPuagh+etvjwvQ29udHJvbExhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sIHJlYWRPbmx5Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9Gb3JtR3JvdXA+ICAgICBcclxuICAgICAgICAgICAgICAgICAgICA8L0NvbD5cclxuICAgICAgICAgICAgICAgIDwvUm93PlxyXG4gICAgICAgICAgICAgICAgPEZvcm1Hcm91cCBjb250cm9sSWQ9XCJ0Yy1jcmVhdGVwYWdlLWV2ZW50cmVtYXJrXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPENvbnRyb2xMYWJlbD7lpIfms6g8L0NvbnRyb2xMYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2wgcmVhZE9ubHkgY29tcG9uZW50Q2xhc3M9XCJ0ZXh0YXJlYVwiIC8+XHJcbiAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cclxuICAgICAgICAgICAgPC9Gb3JtPlxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcbmltcG9ydCBBdXRvRm9ybUdyb3VwIGZyb20gJy4vQXV0b0Zvcm1Hcm91cCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaXRsZUlucHV0R3JvdXAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMucHJvcHMudmFsdWVcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZSA9IHRoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQ2hhbmdlKGUpIHtcclxuICAgICAgICBjb25zdCBuZXdUaXRsZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICB2YWx1ZTogbmV3VGl0bGVcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnByb3BzLm9uVGl0bGVDaGFuZ2UobmV3VGl0bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8QXV0b0Zvcm1Hcm91cCBsYWJlbD1cIuagh+mimFwiIHsuLi50aGlzLnByb3BzfT5cclxuICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbFxyXG4gICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cclxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIuivt+i+k+WFpeagh+mimFwiXHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9BdXRvRm9ybUdyb3VwPlxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBOYXZJdGVtLCBUYWIsIEJ1dHRvbiwgQnV0dG9uVG9vbGJhciB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcbmltcG9ydCBFdmVudERldGFpbEZyb20gZnJvbSAnLi4vRm9ybS9FdmVudERldGFpbEZvcm0nO1xyXG5pbXBvcnQgRXZlbnRNb2RhbCBmcm9tICcuL0V2ZW50TW9kYWwnXHJcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuaW1wb3J0IEV2ZW50SGFuZGxlcyBmcm9tICcuLi8uLi9tb2RlbHMvRXZlbnRIYW5kbGVzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRDcmVhdGVNb2RhbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5ldmVudEhhbmRsZXMgPSBuZXcgRXZlbnRIYW5kbGVzKCk7XHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICB0aXRsZTogJycsXHJcbiAgICAgICAgICAgIHN0YXJ0OiB0aGlzLnByb3BzLnNlbGVjdGVkUmFuZ2Uuc3RhcnQuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyksXHJcbiAgICAgICAgICAgIGVuZDogdGhpcy5wcm9wcy5zZWxlY3RlZFJhbmdlLmVuZC5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKSxcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnJ1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuaGFuZGxlVGl0bGVDaGFuZ2UgPSB0aGlzLmhhbmRsZVRpdGxlQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVTdGFydENoYW5nZSA9IHRoaXMuaGFuZGxlU3RhcnRDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUVuZENoYW5nZSA9IHRoaXMuaGFuZGxlRW5kQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVDb2xvckNoYW5nZSA9IHRoaXMuaGFuZGxlQ29sb3JDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUV2ZW50Q3JlYXRlID0gdGhpcy5oYW5kbGVFdmVudENyZWF0ZS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVRpdGxlQ2hhbmdlKG5ld1RpdGxlKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIHRpdGxlOiBuZXdUaXRsZVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlU3RhcnRDaGFuZ2UobmV3RGF0ZVZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIHN0YXJ0OiBuZXdEYXRlVmFsdWVcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUVuZENoYW5nZShuZXdEYXRlVmFsdWUpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgZW5kOiBuZXdEYXRlVmFsdWVcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNvbG9yQ2hhbmdlKG5ld0NvbG9yVmFsdWUpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBuZXdDb2xvclZhbHVlXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVFdmVudENyZWF0ZSgpIHtcclxuICAgICAgICB0aGlzLmV2ZW50SGFuZGxlcy5vbkNyZWF0ZUJ0bkNsaWNrKHRoaXMuc3RhdGUpO1xyXG4gICAgICAgIHRoaXMucHJvcHMub25Nb2RhbENsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxFdmVudE1vZGFsIHsuLi50aGlzLnByb3BzfT5cclxuICAgICAgICAgICAgICAgIDxFdmVudE1vZGFsLk5hdkhlYWRlciB7Li4udGhpcy5wcm9wc30+XHJcbiAgICAgICAgICAgICAgICAgICAgPE5hdkl0ZW0gZXZlbnRLZXk9XCIxXCIgaHJlZj1cIiN0Yy1yZXBlYXRmb3JtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIOaXpeeoi+e8lui+kVxyXG4gICAgICAgICAgICAgICAgICAgIDwvTmF2SXRlbT5cclxuICAgICAgICAgICAgICAgICAgICA8TmF2SXRlbSBldmVudEtleT1cIjJcIiBocmVmPVwiI3RjLXJlcGVhdGZvcm1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAg6YeN5aSN6KeE5YiZXHJcbiAgICAgICAgICAgICAgICAgICAgPC9OYXZJdGVtPlxyXG4gICAgICAgICAgICAgICAgPC9FdmVudE1vZGFsLk5hdkhlYWRlcj5cclxuICAgICAgICAgICAgICAgIDxFdmVudE1vZGFsLlRhYkJvZHkgey4uLnRoaXMucHJvcHN9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxUYWIuUGFuZSBldmVudEtleT1cIjFcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEV2ZW50RGV0YWlsRnJvbSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50VGl0bGU9e3RoaXMuc3RhdGUudGl0bGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydD17dGhpcy5zdGF0ZS5zdGFydH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZD17dGhpcy5zdGF0ZS5lbmR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I9e3RoaXMuc3RhdGUuYmFja2dyb3VuZENvbG9yfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/kuovku7blj6Xmn4RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uVGl0bGVDaGFuZ2U9e3RoaXMuaGFuZGxlVGl0bGVDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblN0YXJ0Q2hhbmdlPXt0aGlzLmhhbmRsZVN0YXJ0Q2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25FbmRDaGFuZ2U9e3RoaXMuaGFuZGxlRW5kQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Db2xvcmNoYW5nZT17dGhpcy5oYW5kbGVDb2xvckNoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L1RhYi5QYW5lPlxyXG4gICAgICAgICAgICAgICAgICAgIDxUYWIuUGFuZSBldmVudEtleT1cIjJcIj5UYWIgMSBjb250ZW50PC9UYWIuUGFuZT5cclxuICAgICAgICAgICAgICAgIDwvRXZlbnRNb2RhbC5UYWJCb2R5PlxyXG4gICAgICAgICAgICAgICAgPEV2ZW50TW9kYWwuVG9vbGJhckZvb3Rlcj5cclxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBic1N0eWxlPVwic3VjY2Vzc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlRXZlbnRDcmVhdGV9XHJcbiAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICDliJvlu7pcclxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMucHJvcHMub25Nb2RhbENsb3NlfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAg5Y+W5raIXHJcbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L0V2ZW50TW9kYWwuVG9vbGJhckZvb3Rlcj5cclxuICAgICAgICAgICAgPC9FdmVudE1vZGFsPlxyXG4gICAgICAgIClcclxuICAgIH1cclxufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IE1vZGFsLCBOYXYsIE5hdkl0ZW0sIFRhYnMsIFRhYiwgQnV0dG9uLCBSb3csIENvbCwgQ2xvc2VCdXR0b24gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5pbXBvcnQgRXZlbnREZXRhaWxGcm9tIGZyb20gJy4uL0Zvcm0vRXZlbnREZXRhaWxGb3JtJztcclxuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5cclxuY2xhc3MgTmF2SGVhZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIC8vdGhpcy5wcm9wcy5jaGlsZHJlbiDmjqXlj5cgPE5hdkl0ZW0gLz5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8TW9kYWwuSGVhZGVyXHJcbiAgICAgICAgICAgICAgICBzdHlsZT17e2JvcmRlckJvdHRvbTogJ25vbmUnLCBwYWRkaW5nOiAnMCd9fT5cclxuICAgICAgICAgICAgICAgIDxOYXYgYnNTdHlsZT1cInRhYnNcIlxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7cGFkZGluZzogJzE1cHggMTVweCAwIDE1cHgnfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPENsb3NlQnV0dG9uIG9uQ2xpY2s9e3RoaXMucHJvcHMub25Nb2RhbENsb3NlfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG4gICAgICAgICAgICAgICAgPC9OYXY+XHJcbiAgICAgICAgICAgIDwvTW9kYWwuSGVhZGVyPlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgVGFiQm9keSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICAvL3RoaXMucHJvcHMuY2hpbGRyZW4g5o6l5Y+XIDxUYWIuUGFuZSAvPlxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxNb2RhbC5Cb2R5PlxyXG4gICAgICAgICAgICAgICAgPFRhYi5Db250ZW50IGFuaW1hdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuICAgICAgICAgICAgICAgIDwvVGFiLkNvbnRlbnQ+XHJcbiAgICAgICAgICAgIDwvTW9kYWwuQm9keT4gICAgICAgICAgICBcclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFRvb2xiYXJGb290ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxNb2RhbC5Gb290ZXI+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuICAgICAgICAgICAgPC9Nb2RhbC5Gb290ZXI+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBFdmVudE1vZGFsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgTmF2SGVhZGVyLCBUYWJCb2R5LCBUb29sYmFyRm9vdGVyO1xyXG4gICAgICAgIFJlYWN0LkNoaWxkcmVuLmZvckVhY2godGhpcy5wcm9wcy5jaGlsZHJlbiwgKHRoaXNBcmcpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IHRoaXNBcmcudHlwZS5uYW1lO1xyXG4gICAgICAgICAgICBpZiAoIG5hbWUgPT0gJ05hdkhlYWRlcicgKSB7XHJcbiAgICAgICAgICAgICAgICBOYXZIZWFkZXIgPSB0aGlzQXJnO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBuYW1lID09ICdUYWJCb2R5JyApIHtcclxuICAgICAgICAgICAgICAgIFRhYkJvZHkgPSB0aGlzQXJnO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBuYW1lID09ICdUb29sYmFyRm9vdGVyJyApIHtcclxuICAgICAgICAgICAgICAgIFRvb2xiYXJGb290ZXIgPSB0aGlzQXJnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPE1vZGFsIHNob3c9e3RoaXMucHJvcHMuc2hvd30gb25IaWRlPXt0aGlzLnByb3BzLm9uTW9kYWxDbG9zZX0+IFxyXG4gICAgICAgICAgICAgICAgPFRhYi5Db250YWluZXIgaWQ9XCJ0YWJzLXdpdGgtZHJvcGRvd25cIiBkZWZhdWx0QWN0aXZlS2V5PVwiMVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxSb3cgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbCBzbT17MTJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBOYXZIZWFkZXIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBUYWJCb2R5IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9Db2w+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9Sb3c+XHJcbiAgICAgICAgICAgICAgICA8L1RhYi5Db250YWluZXI+XHJcbiAgICAgICAgICAgICAgICB7IFRvb2xiYXJGb290ZXIgfVxyXG4gICAgICAgICAgICA8L01vZGFsPlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuRXZlbnRNb2RhbC5OYXZIZWFkZXIgPSBOYXZIZWFkZXI7XHJcbkV2ZW50TW9kYWwuVGFiQm9keSA9IFRhYkJvZHk7XHJcbkV2ZW50TW9kYWwuVG9vbGJhckZvb3RlciA9IFRvb2xiYXJGb290ZXI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFdmVudE1vZGFsOyIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL2luZGV4LmNzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9pbmRleC5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL2luZGV4LmNzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgJ2Z1bGxjYWxlbmRhci1yZWFjdHdyYXBwZXIvZGlzdC9jc3MvZnVsbGNhbGVuZGFyLm1pbi5jc3MnXHJcbmltcG9ydCAnYm9vdHN0cmFwL2Rpc3QvY3NzL2Jvb3RzdHJhcC5jc3MnO1xyXG5pbXBvcnQgJ2Jvb3RzdHJhcC9kaXN0L2Nzcy9ib290c3RyYXAtdGhlbWUuY3NzJztcclxuaW1wb3J0ICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtZnJlZS9jc3MvYWxsLmNzcydcclxuaW1wb3J0IEFwcCBmcm9tICcuL0FwcCc7XHJcbmltcG9ydCAnLi9pbmRleC5jc3MnO1xyXG5cclxuUmVhY3RET00ucmVuZGVyKDxBcHAgLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JykpO1xyXG5cclxuLypcclxuJChmdW5jdGlvbigpe1xyXG4gICAgLy8g5a6a5LmJ5Y+Y6YePXHJcblx0Y29uc3QgZGF0YUxvYWRlciA9IG5ldyBXaXpFdmVudERhdGFMb2FkZXIoKTtcclxuXHRsZXQgZ19lZGl0UG9wcGVyLCBnX2NyZWF0ZU1vZGFsLCBnX2VkaXRNb2RhbDtcclxuXHJcbiAgICBjb25zdCBjYWxlbmRhciA9ICQoJyNjYWxlbmRhcicpLmZ1bGxDYWxlbmRhcih7XHJcblx0XHR0aGVtZVN5c3RlbTogJ3N0YW5kYXJkJyxcclxuXHRcdGhlaWdodDogJ3BhcmVudCcsXHJcblx0XHRoZWFkZXI6IHtcclxuXHRcdFx0bGVmdDogJ3ByZXYsbmV4dCx0b2RheScsXHJcblx0XHRcdGNlbnRlcjogJ3RpdGxlJyxcclxuXHRcdFx0cmlnaHQ6ICdtb250aCxhZ2VuZGFXZWVrLGFnZW5kYURheSxsaXN0V2VlaydcclxuXHRcdH0sXHJcblx0XHR2aWV3czoge1xyXG5cdFx0XHRtb250aDoge1xyXG5cdFx0XHRcdC8vdGl0bGVGb3JtYXQ6IGdfbG9jX3RpdGxlZm9ybWF0X21vbnRoLCAvL3ZhciBnX2xvY190aXRsZWZvcm1hdF9tb250aCA9IFwiTU1NTSB5eXl5XCI7XHJcblx0XHRcdH0sXHJcblx0XHRcdGFnZW5kYToge1xyXG5cdFx0XHRcdG1pblRpbWU6IFwiMDg6MDA6MDBcIixcclxuXHRcdFx0XHRzbG90TGFiZWxGb3JtYXQ6ICdoKDptbSkgYSdcclxuXHRcdFx0fSxcclxuXHRcdFx0bGlzdFdlZWs6IHtcclxuXHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRuYXZMaW5rczogdHJ1ZSxcclxuXHRcdGFsbERheURlZmF1bHQ6IGZhbHNlLFxyXG5cdFx0ZGVmYXVsdFZpZXc6ICdhZ2VuZGFXZWVrJyxcclxuXHRcdGV2ZW50TGltaXQ6IHRydWUsXHJcblx0XHRidXR0b25UZXh0OiB7XHJcblx0XHRcdHRvZGF5OiAn5LuK5aSpJyxcclxuXHRcdFx0bW9udGg6ICfmnIgnLFxyXG5cdFx0XHR3ZWVrOiAn5ZGoJyxcclxuXHRcdFx0ZGF5OiAn5pelJyxcclxuXHRcdFx0bGlzdDogJ+ihqCdcclxuICAgICAgICB9LFxyXG5cdFx0bW9udGhOYW1lczogW1xyXG4gICAgICAgICAgICAnMeaciCcsICcy5pyIJywgJzPmnIgnLCAnNOaciCcsIFxyXG4gICAgICAgICAgICAnNeaciCcsICc25pyIJywgJzfmnIgnLCAnOOaciCcsIFxyXG4gICAgICAgICAgICAnOeaciCcsICcxMOaciCcsICcxMeaciCcsICcxMuaciCdcclxuICAgICAgICBdLFxyXG5cdFx0bW9udGhOYW1lc1Nob3J0OiBbXHJcbiAgICAgICAgICAgICcx5pyIJywgJzLmnIgnLCAnM+aciCcsICc05pyIJywgXHJcbiAgICAgICAgICAgICc15pyIJywgJzbmnIgnLCAnN+aciCcsICc45pyIJywgXHJcbiAgICAgICAgICAgICc55pyIJywgJzEw5pyIJywgJzEx5pyIJywgJzEy5pyIJ1xyXG4gICAgICAgIF0sXHJcblx0XHRkYXlOYW1lczogW1xyXG4gICAgICAgICAgICAn5ZGo5pelJywgJ+WRqOS4gCcsICflkajkuownLCAn5ZGo5LiJJywgJ+WRqOWbmycsICflkajkupQnLCAn5ZGo5YWtJ1xyXG4gICAgICAgIF0sXHJcblx0XHRkYXlOYW1lc1Nob3J0OiBbXHJcbiAgICAgICAgICAgICflkajml6UnLCAn5ZGo5LiAJywgJ+WRqOS6jCcsICflkajkuIknLCAn5ZGo5ZubJywgJ+WRqOS6lCcsICflkajlha0nXHJcbiAgICAgICAgXSxcclxuXHRcdHNlbGVjdGFibGU6IHRydWUsXHJcblx0XHRzZWxlY3RIZWxwZXI6IHRydWUsXHJcblx0XHR1bnNlbGVjdENhbmNlbDogJy5tb2RhbCAqJyxcclxuXHRcdGFsbERheVRleHQ6ICflhajlpKknLFxyXG5cdFx0bm93SW5kaWNhdG9yOiB0cnVlLFxyXG5cdFx0Zm9yY2VFdmVudER1cmF0aW9uOiB0cnVlLFxyXG5cdFx0Zmlyc3REYXk6IDEsIC8vIOesrOS4gOWkqeaYr+WRqOS4gOi/mOaYr+WRqOWkqe+8jOS4jmRhdGVwaWNrZXLlv4Xpobvnm7jlkIxcclxuXHRcdGRyYWdPcGFjaXR5OiB7XHJcblx0XHRcdFwibW9udGhcIjogLjUsXHJcblx0XHRcdFwiYWdlbmRhV2Vla1wiOiAxLFxyXG5cdFx0XHRcImFnZW5kYURheVwiOiAxXHJcblx0XHR9LFxyXG5cdFx0ZWRpdGFibGU6IHRydWUsXHJcblxyXG5cdFx0Ly8g5Yi35paw6KeG5Zu+77yM6YeN5paw6I635Y+W5pel5Y6G5LqL5Lu2XHJcblx0XHR2aWV3UmVuZGVyOiBmdW5jdGlvbiggdmlldywgZWxlbWVudCApIHtcclxuXHRcdFx0Ly9UT0RPOiDmhJ/op4nov5nmoLfpgKDmiJDmgKfog73kuIrnmoTmjZ/lpLHvvIzmmK/lkKbmnInmm7Tlpb3nmoTmlrnms5XvvJ9cclxuXHRcdFx0Y29uc3QgY2FsZW5kYXIgPSAkKCcjY2FsZW5kYXInKTtcclxuXHRcdFx0Y29uc3QgZXZlbnRTb3VyY2VzID0gZGF0YUxvYWRlci5nZXRFdmVudFNvdXJjZXMoIHZpZXcsIGVsZW1lbnQgKTtcclxuXHRcdFx0Y2FsZW5kYXIuZnVsbENhbGVuZGFyKCdyZW1vdmVFdmVudHMnKTtcclxuXHRcdFx0Zm9yIChsZXQgaT0wIDsgaSA8IGV2ZW50U291cmNlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGNhbGVuZGFyLmZ1bGxDYWxlbmRhcignYWRkRXZlbnRTb3VyY2UnLCBldmVudFNvdXJjZXNbaV0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0fSxcclxuXHJcblx0XHQvLyDpgInmi6nliqjkvZzop6blj5HnmoTkuovku7blj6Xmn4TvvIzlrprkuYnkuobkuIDkuKpjYWxsYmFja1xyXG5cdFx0c2VsZWN0OiBmdW5jdGlvbihzdGFydCwgZW5kLCBqc0V2ZW50LCB2aWV3KXtcclxuXHRcdFx0Ly8g5by55Ye64oCc5Yib5bu65pel5Y6G5LqL5Lu24oCd56qX5Y+jXHJcblx0XHRcdC8vIOWIpOaWreaYr+WQpua4suafk1xyXG5cdFx0XHQvL1RPRE86IOaDs+WKnuazleS4jeimgeeUqOWFqOWxgOWPmOmHj1xyXG5cdFx0XHRpZiAoICF3aW5kb3cuZ19jcmVhdGVNb2RhbCApIG5ldyBFdmVudENyZWF0ZU1vZGFsKHtzdGFydCwgZW5kLCBqc0V2ZW50LCB2aWV3fSk7XHJcblx0XHRcdC8vIOS8oOmAkuWPguaVsFxyXG5cdFx0XHR3aW5kb3cuZ19jcmVhdGVNb2RhbC51cGRhdGUoe3N0YXJ0LCBlbmQsIGpzRXZlbnQsIHZpZXd9KTtcclxuXHRcdFx0d2luZG93LmdfY3JlYXRlTW9kYWwuc2hvdygpO1xyXG5cdFx0fSxcclxuXHJcblx0XHRldmVudERyYWdTdGFydDogZnVuY3Rpb24oIGV2ZW50LCBqc0V2ZW50LCB1aSwgdmlldyApIHsgfSxcclxuXHRcdGV2ZW50RHJhZ1N0b3A6IGZ1bmN0aW9uKCBldmVudCwganNFdmVudCwgdWksIHZpZXcgKSB7IH0sXHJcblxyXG5cdFx0Ly8g5pel5Y6G5LqL5Lu25ouW5YqoIGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXdcclxuXHRcdGV2ZW50RHJvcDogZnVuY3Rpb24oZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldyl7XHJcblx0XHRcdGlmIChldmVudC5pZCl7XHJcblx0XHRcdFx0ZGF0YUxvYWRlci51cGRhdGVFdmVudERhdGFPbkRyb3AoZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldylcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXZlcnRGdW5jKCk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8g5pel5Y6G5LqL5Lu25pel5pyf6IyD5Zu06YeN572uXHJcblx0XHRldmVudFJlc2l6ZTogZnVuY3Rpb24oZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldyl7XHJcblx0XHRcdGlmIChldmVudC5pZCl7XHJcblx0XHRcdFx0ZGF0YUxvYWRlci51cGRhdGVFdmVudERhdGFPblJlc2l6ZShldmVudCwgZGVsdGEsIHJldmVydEZ1bmMsIGpzRXZlbnQsIHVpLCB2aWV3KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXZlcnRGdW5jKCk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblxyXG5cdFx0ZXZlbnRSZW5kZXI6IGZ1bmN0aW9uKGV2ZW50T2JqLCAkZWwpIHtcclxuXHRcdFx0Ly8g5YWD57Sg5bey57uP5riy5p+T77yM5Y+v5L+u5pS55YWD57SgXHJcblx0XHRcdGNvbnN0IGlzQ29tcGxldGUgPSBwYXJzZUludChldmVudE9iai5jb21wbGV0ZSkgPT0gNTtcclxuXHRcdFx0aWYgKCBpc0NvbXBsZXRlICkge1xyXG5cdFx0XHRcdC8vIOagt+W8j1xyXG5cdFx0XHRcdCRlbC5hZGRDbGFzcygndGMtY29tcGxldGUnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8g5pel5Y6G5LqL5Lu254K55Ye75ZCO5LqL5Lu25Y+l5p+EXHJcblx0XHRldmVudENsaWNrOiBmdW5jdGlvbiggZXZlbnQsIGpzRXZlbnQsIHZpZXcgKSB7XHJcblx0XHRcdC8vIHRoaXMg5oyH5ZCR5YyF6KO55LqL5Lu255qEPGE+5YWD57SgXHJcblxyXG5cdFx0XHQvLyDliKTmlq3mmK/lkKblt7Lnu4/muLLmn5PlvLnnqpdcclxuXHRcdFx0aWYgKCAhZ19lZGl0UG9wcGVyICkge1xyXG5cdFx0XHRcdGdfZWRpdFBvcHBlciA9IHJlbmRlckVkaXRQb3BwZXIoe1xyXG5cdFx0XHRcdFx0J2V2ZW50JzogZXZlbnQsXHJcblx0XHRcdFx0XHQnanNFdmVudCc6IGpzRXZlbnQsXHJcblx0XHRcdFx0XHQndmlldyc6IHZpZXdcclxuXHRcdFx0XHR9LCB0aGlzKS5FdmVudFBvcG92ZXIoJ3Nob3cnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyDmm7TmlrByZWZlcmVuY2VcclxuXHRcdFx0XHRnX2VkaXRQb3BwZXIuRXZlbnRQb3BvdmVyKCdvcHRpb24nLCB7XHJcblx0XHRcdFx0XHRhcmdzOiB7XHJcblx0XHRcdFx0XHRcdCdldmVudCc6IGV2ZW50LFxyXG5cdFx0XHRcdFx0XHQnanNFdmVudCc6IGpzRXZlbnQsXHJcblx0XHRcdFx0XHRcdCd2aWV3Jzogdmlld1xyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHRpdGxlOiBldmVudC50aXRsZSxcclxuXHRcdFx0XHRcdHJlZmVyZW5jZTogdGhpc1xyXG5cdFx0XHRcdH0pLkV2ZW50UG9wb3ZlcigndXBkYXRlJykuRXZlbnRQb3BvdmVyKCdzaG93Jyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblx0XHRcclxuXHR9KVxyXG59KVxyXG4qLyIsImltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuaW1wb3J0ICdmdWxsY2FsZW5kYXInO1xyXG5pbXBvcnQgeyBXaXpEYXRhYmFzZSBhcyBnX2RiLCBXaXpDb21tb25VSSBhcyBnX2Ntbn0gZnJvbSAnLi4vdXRpbHMvV2l6SW50ZXJmYWNlJztcclxuaW1wb3J0IENvbmZpZyBmcm9tICcuLi91dGlscy9Db25maWcnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FsZW5kYXJFdmVudCB7XHJcblx0LyoqXHJcbiAgICAgKiDliJvlu7rkuIDkuKrpgJrnlKjml6XnqIsuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IGRhdGEg5Y6f5aeL5pWw5o2u57G75Z6L77yM5Y+v5Lul5pivIFdpekV2ZW50LCBGdWxsQ2FsZW5kYXJFdmVudCDku6Xlj4ogR1VJRC5cclxuICAgICAqL1xyXG5cdGNvbnN0cnVjdG9yKCBkYXRhLCBjYWxlbmRhciApIHtcclxuXHRcdGlmICghZ19kYikgdGhyb3cgbmV3IEVycm9yKCdJV2l6RGF0YWJhc2UgaXMgbm90IHZhbGlkLicpO1xyXG5cdFx0dGhpcy4kY2FsZW5kYXIgPSBjYWxlbmRhciA/ICQoY2FsZW5kYXIpIDogJCgnI2NhbGVuZGFyJyk7XHJcblx0XHRjb25zdCB0eXBlID0gdGhpcy5fY2hlY2tEYXRhVHlwZShkYXRhKTtcclxuXHRcdHN3aXRjaCAoIHR5cGUgKSB7XHJcblx0XHRcdGNhc2UgXCJXaXpFdmVudFwiOlxyXG5cdFx0XHRjYXNlIFwiRnVsbENhbGVuZGFyRXZlbnRcIjpcclxuXHRcdFx0XHR0aGlzLl9jcmVhdGUoZGF0YSwgdHlwZSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgXCJHVUlEXCI6XHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdC8vVE9ETzog6I635b6XV2l6RXZlbnTmlbDmja7vvIzlubbliJvlu7rlr7nosaFcclxuXHRcdFx0XHRcdGNvbnN0IGRvYyA9IGdfZGIuRG9jdW1lbnRGcm9tR1VJRChkYXRhKTtcclxuXHRcdFx0XHRcdGNvbnN0IG5ld0V2ZW50RGF0YSA9IHtcclxuXHRcdFx0XHRcdFx0XCJDQUxFTkRBUl9FTkRcIiA6IGRvYy5HZXRQYXJhbVZhbHVlKCdDQUxFTkRBUl9FTkQnKSxcclxuXHRcdFx0XHRcdFx0XCJDQUxFTkRBUl9JTkZPXCIgOiBkb2MuR2V0UGFyYW1WYWx1ZSgnQ0FMRU5EQVJfSU5GTycpLFxyXG5cdFx0XHRcdFx0XHRcIkNBTEVOREFSX0VYVFJBSU5GT1wiIDogZG9jLkdldFBhcmFtVmFsdWUoJ0NBTEVOREFSX0VYVFJBSU5GTycpLFxyXG5cdFx0XHRcdFx0XHRcIkNBTEVOREFSX1NUQVJUXCIgOiBkb2MuR2V0UGFyYW1WYWx1ZSgnQ0FMRU5EQVJfU1RBUlQnKSxcclxuXHRcdFx0XHRcdFx0XCJDQUxFTkRBUl9SRUNVUlJFTkNFXCIgOiBkb2MuR2V0UGFyYW1WYWx1ZSgnQ0FMRU5EQVJfUkVDVVJSRU5DRScpLFxyXG5cdFx0XHRcdFx0XHRcIkNBTEVOREFSX0VORFJFQ1VSUkVOQ0VcIiA6IGRvYy5HZXRQYXJhbVZhbHVlKCdDQUxFTkRBUl9FTkRSRUNVUlJFTkNFJyksXHJcblx0XHRcdFx0XHRcdFwiY3JlYXRlZFwiIDogbW9tZW50KGRvYy5EYXRlQ3JlYXRlZCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyksXHJcblx0XHRcdFx0XHRcdFwiZ3VpZFwiIDogZG9jLkdVSUQsXHJcblx0XHRcdFx0XHRcdFwidGl0bGVcIiA6IGRvYy5UaXRsZSxcclxuXHRcdFx0XHRcdFx0XCJ1cGRhdGVkXCIgOiBtb21lbnQoZG9jLkRhdGVNb2RpZmllZCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJylcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHRoaXMuX2NyZWF0ZShuZXdFdmVudERhdGEsICdXaXpFdmVudCcpO1xyXG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHsgY29uc29sZS5lcnJvcihlKTsgfVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdF9jcmVhdGUoZGF0YSwgdHlwZSkge1xyXG5cdFx0bGV0IHN0YXJ0LCBlbmQsIGlkLCBia0NvbG9yLCBhbGxEYXksIGNvbXBsZXRlLCBkYXRlQ29tcGxldGVkLCBycHRSdWxlLCBycHRFbmQ7XHJcblx0XHRzd2l0Y2ggKHR5cGUpIHtcclxuXHRcdFx0Y2FzZSBcIkdVSURcIjpcclxuXHRcdFx0Y2FzZSBcIldpekV2ZW50XCI6XHJcblx0XHRcdFx0dGhpcy5fSW5mbyA9IHRoaXMuX3BhcnNlSW5mbyhkYXRhLkNBTEVOREFSX0lORk8pO1xyXG5cdFx0XHRcdHRoaXMuX0V4dHJhSW5mbyA9IGRhdGEuQ0FMRU5EQVJfRVhUUkFJTkZPID8gdGhpcy5fcGFyc2VJbmZvKGRhdGEuQ0FMRU5EQVJfRVhUUkFJTkZPKSA6IHRoaXMuX2dldERlZmF1bHRFeHRyYUluZm8oKTtcclxuXHRcdFx0XHQvLyDnu5/kuIDlj5jph49cclxuXHRcdFx0XHRpZCA9IGRhdGEuZ3VpZDtcclxuXHRcdFx0XHRzdGFydCA9IGRhdGEuQ0FMRU5EQVJfU1RBUlQ7XHJcblx0XHRcdFx0ZW5kID0gZGF0YS5DQUxFTkRBUl9FTkQ7XHJcblx0XHRcdFx0Ly8g5Yik5pat5piv5ZCm55So5oi36Ieq5a6a5LmJ6IOM5pmv6Imy77yM5ZCR5LiL5YW85a655Y6f54mI5pel5Y6GXHJcblx0XHRcdFx0YmtDb2xvciA9IHRoaXMuX0luZm8uY2kgPyAoIHBhcnNlSW50KHRoaXMuX0luZm8uY2kpID09IDAgPyB0aGlzLl9JbmZvLmIgOiBDb25maWcuY29sb3JJdGVtc1t0aGlzLl9JbmZvLmNpXS5jb2xvclZhbHVlICkgOiB0aGlzLl9JbmZvLmI7XHJcblx0XHRcdFx0YWxsRGF5ID0gZGF0YS5DQUxFTkRBUl9FTkQuaW5kZXhPZihcIjIzOjU5OjU5XCIpICE9IC0xID8gdHJ1ZSA6IGZhbHNlO1xyXG5cdFx0XHRcdGNvbXBsZXRlID0gdGhpcy5fRXh0cmFJbmZvLkNvbXBsZXRlO1xyXG5cdFx0XHRcdGRhdGVDb21wbGV0ZWQgPSB0aGlzLl9FeHRyYUluZm8uRGF0ZUNvbXBsZXRlZDtcclxuXHRcdFx0XHQvLyDph43lpI3kuovku7ZcclxuXHRcdFx0XHRycHRSdWxlID0gZGF0YS5DQUxFTkRBUl9SRUNVUlJFTkNFO1xyXG5cdFx0XHRcdHJwdEVuZCA9IGRhdGEuQ0FMRU5EQVJfRU5EUkVDVVJSRU5DRTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBcIkZ1bGxDYWxlbmRhckV2ZW50XCI6XHJcblx0XHRcdFx0aWQgPSBkYXRhLmlkO1xyXG5cdFx0XHRcdHN0YXJ0ID0gZGF0YS5zdGFydDtcclxuXHRcdFx0XHRlbmQgPSBkYXRhLmVuZDtcclxuXHRcdFx0XHRia0NvbG9yID0gZGF0YS5iYWNrZ3JvdW5kQ29sb3I7XHJcblx0XHRcdFx0YWxsRGF5ID0gZGF0YS5hbGxEYXkgPyBkYXRhLmFsbERheSA6ICEkLmZ1bGxDYWxlbmRhci5tb21lbnQoZGF0YS5zdGFydCkuaGFzVGltZSgpO1xyXG5cdFx0XHRcdGNvbXBsZXRlID0gZGF0YS5jb21wbGV0ZSB8fCAwO1xyXG5cdFx0XHRcdGRhdGVDb21wbGV0ZWQgPSBkYXRhLmRhdGVDb21wbGV0ZWQgfHwgJyc7XHJcblx0XHRcdFx0cnB0UnVsZSA9IGRhdGEucnB0UnVsZTtcclxuXHRcdFx0XHRycHRFbmQgPSBkYXRhLnJwdEVuZFxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignQ2FuIG5vdCBpZGVudGlmeSBkYXRhIHR5cGUuJyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0XHQvLyDln7rmnKzkv6Hmga9cclxuXHRcdHRoaXMuaWQgPSBpZDtcclxuXHRcdHRoaXMudGl0bGUgPSBkYXRhLnRpdGxlO1xyXG5cdFx0Ly8g5pe26Ze05L+h5oGvXHJcblx0XHR0aGlzLmFsbERheSA9IGFsbERheTtcclxuXHRcdC8vIOazqOaEj++8gXN0YXJ0L2VuZCDlj6/og73mmK9tb21lbnTlr7nosaHmiJbogIVzdHLvvIzmiYDku6XkuIDlvovlhYjovazmjaLmiJBtb21lbnTlho3moLzlvI/ljJbovpPlh7pcclxuXHRcdHRoaXMuc3RhcnQgPSBhbGxEYXkgPyBtb21lbnQoc3RhcnQpLmZvcm1hdChcIllZWVktTU0tRERcIikgOiBtb21lbnQoc3RhcnQpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0dGhpcy5lbmQgPSBhbGxEYXkgPyBtb21lbnQoZW5kKS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpIDogbW9tZW50KGVuZCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHR0aGlzLmNyZWF0ZWQgPSBkYXRhLmNyZWF0ZWQgPyBkYXRhLmNyZWF0ZWQgOiBtb21lbnQoc3RhcnQpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0dGhpcy51cGRhdGVkID0gZGF0YS51cGRhdGVkID8gZGF0YS51cGRhdGVkIDogbW9tZW50KCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHQvLyDorr7nva7kv6Hmga9cclxuXHRcdHRoaXMudGV4dENvbG9yID0gJ2JsYWNrJztcclxuXHRcdHRoaXMuYmFja2dyb3VuZENvbG9yID0gYmtDb2xvcjtcclxuXHRcdHRoaXMuY29tcGxldGUgPSBjb21wbGV0ZTtcclxuXHRcdHRoaXMuZGF0ZUNvbXBsZXRlZCA9IGRhdGVDb21wbGV0ZWQ7XHJcblx0XHQvLyDph43lpI3kuovku7ZcclxuXHRcdHRoaXMucnB0UnVsZSA9IHJwdFJ1bGU7XHJcblx0XHR0aGlzLnJwdEVuZCA9IHJwdEVuZDtcclxuXHRcdC8vXHJcblx0XHR0aGlzLl91cGRhdGUoKTtcclxuXHR9XHJcblxyXG5cdF9jaGVja0RhdGFUeXBlKGRhdGEpIHtcclxuXHRcdGNvbnN0IG9iakNsYXNzID0gZGF0YS5jb25zdHJ1Y3RvcjtcclxuICAgICAgICBjb25zdCBHVUlEX1JlZ0V4ciA9IC9eWzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtNV1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn0kL2k7XHJcbiAgICAgICAgbGV0IHR5cGU7XHJcbiAgICAgICAgc3dpdGNoIChvYmpDbGFzcykge1xyXG4gICAgICAgICAgICBjYXNlIFN0cmluZzpcclxuICAgICAgICAgICAgICAgIGlmICggR1VJRF9SZWdFeHIudGVzdChkYXRhKSApIHR5cGUgPSBcIkdVSURcIjtcclxuICAgICAgICAgICAgICAgIGVsc2UgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGRhdGEsIGNhbm5vdCBjcmVhdGUgQ2FsZW5kYXJFdmVudCBvYmplY3QuJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBPYmplY3Q6XHJcblx0XHRcdFx0aWYgKCBkYXRhLkNBTEVOREFSX0lORk8gJiYgZGF0YS50aXRsZSApIHsgXHJcblx0XHRcdFx0XHR0eXBlID0gJ1dpekV2ZW50JztcclxuXHRcdFx0XHR9IGVsc2UgaWYgKCBkYXRhLnN0YXJ0ICYmIGRhdGEudGl0bGUgKSB7XHJcblx0XHRcdFx0XHR0eXBlID0gJ0Z1bGxDYWxlbmRhckV2ZW50JztcclxuXHRcdFx0XHR9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHR5cGU7XHJcblx0fTtcclxuXHJcblx0X3BhcnNlSW5mbyhJbmZvU3RyaW5nKSB7XHJcblx0XHRjb25zdCBJbmZvT2JqZWN0ID0ge307XHJcblx0XHQvLyDmi4bop6NDQUxFTkRBUl9JTkZPXHJcblx0XHRjb25zdCBJbmZvQXJyYXkgPSBJbmZvU3RyaW5nLnNwbGl0KCcvJyk7XHJcblx0XHRJbmZvQXJyYXkuZm9yRWFjaChmdW5jdGlvbihpdGVtLCBpbmRleCwgYXJyKXtcclxuXHRcdFx0Y29uc3QgcGFpciA9IGl0ZW0uc3BsaXQoJz0nKTtcclxuXHRcdFx0SW5mb09iamVjdFtwYWlyWzBdXSA9IHBhaXJbMV07XHJcblx0XHR9KTtcclxuXHRcdC8vIOWkhOeQhuminOiJsuWAvFxyXG5cdFx0aWYgKCBJbmZvT2JqZWN0LmIgKSBJbmZvT2JqZWN0LmIgPSAnIycgKyBJbmZvT2JqZWN0LmI7XHJcblxyXG5cdFx0cmV0dXJuIEluZm9PYmplY3Q7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcbiAgICAgKiDlsIYgSW5mbyDlr7nosaHluo/liJfljJYuXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gW0luZm9PYmplY3Q9XSDmj5DkvpsgSW5mbyDlr7nosaHvvIzpu5jorqTkuLpgdGhpcy5fSW5mb2AuXHJcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IOi/lOWbnueUqOS6jkluZm/lr7nosaHlrZfnrKbkuLIuXHJcbiAgICAgKi9cclxuXHRfc3RyaW5naWZ5SW5mbyggSW5mb09iamVjdCA9IHRoaXMuX0luZm8gKSB7XHJcblx0XHRpZiAoICFJbmZvT2JqZWN0ICkgcmV0dXJuICcnO1xyXG5cdFx0Y29uc3QgSW5mb0FycmF5ID0gW107XHJcblx0XHRjb25zdCBJbmZvT2JqZWN0S2V5c0FycmF5ID0gT2JqZWN0LmtleXMoSW5mb09iamVjdCk7XHJcblx0XHRJbmZvT2JqZWN0S2V5c0FycmF5LmZvckVhY2goZnVuY3Rpb24oaXRlbSwgaW5kZXgsIGFycil7XHJcblx0XHRcdGNvbnN0IHNpbmdsZUluZm8gPSBgJHtpdGVtfT0ke0luZm9PYmplY3RbaXRlbV19YDtcclxuXHRcdFx0SW5mb0FycmF5LnB1c2goc2luZ2xlSW5mbyk7XHJcblx0XHR9KTtcclxuXHRcdHJldHVybiBJbmZvQXJyYXkuam9pbignLycpLnJlcGxhY2UoJyMnLCAnJyk7XHJcblx0fTtcclxuXHJcblx0X3VwZGF0ZSgpIHtcclxuXHRcdHRoaXMuX3VwZGF0ZUluZm8oKTtcclxuXHRcdHRoaXMuX3VwZGF0ZUV4dHJhSW5mbygpO1xyXG5cdH07XHJcblxyXG5cdF91cGRhdGVJbmZvKCkge1xyXG5cdFx0Y29uc3QgdGhhdCA9IHRoaXM7XHJcblx0XHRjb25zdCBJbmZvT2JqZWN0ID0ge1xyXG5cdFx0XHQnYic6IG51bGwsIC8v6IOM5pmv6ImyaGV45YC8XHJcblx0XHRcdCdyJzogJy0xJywgLy/mj5DphpLmlrnlvI9cclxuXHRcdFx0J2MnOiAnMCcsIC8v57uT5p2f5o+Q6YaS5L+h5oGvXHJcblx0XHRcdCdjaSc6IDAgLy/og4zmma/oibJJRO+8jOm7mOiupCAwIOihqOekuuiDjOaZr+S4uueUqOaIt+iHquWumuS5iVxyXG5cdFx0fTtcclxuXHRcdC8vIOabtOaWsOiDjOaZr+iJsidiJ1xyXG5cdFx0SW5mb09iamVjdFsnYiddID0gdGhpcy5iYWNrZ3JvdW5kQ29sb3IucmVwbGFjZSgnIycsICcnKTtcclxuXHRcdC8vIOabtOaWsOminOiJsuaMh+aVsCdjaSdcclxuXHRcdENvbmZpZy5jb2xvckl0ZW1zLmZvckVhY2goZnVuY3Rpb24oaXRlbSwgaW5kZXgsIGFycil7XHJcblx0XHRcdGlmICggaXRlbS5jb2xvclZhbHVlID09ICB0aGF0LmJhY2tncm91bmRDb2xvciApIHtcclxuXHRcdFx0XHQvLyDlvZPml6XnqIvog4zmma/oibLkuI7oibLooajljLnphY3ml7bliJnnlKggY29sb3IgaWRleCDmnaXlgqjlrZjvvIjlhbzlrrnljp/niYjml6Xljobmj5Lku7bvvIlcclxuXHRcdFx0XHRJbmZvT2JqZWN0WydjaSddID0gaW5kZXg7XHJcblx0XHRcdH07XHJcblx0XHR9KTtcclxuXHRcdC8vIOW6lOeUqOabtOaWsFxyXG5cdFx0dGhpcy5fSW5mbyA9IEluZm9PYmplY3Q7XHJcblx0fTtcclxuXHJcblx0X2dldERlZmF1bHRFeHRyYUluZm8oKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHQnQ29tcGxldGUnOiAwLCAvL1xyXG5cdFx0XHQnRGF0ZUNvbXBsZXRlZCc6ICcnLCAvLyBJU08g5qCH5YeG5pel5pyf5a2X56ym5LiyIFlZWVktTU0tREQgMDA6MDA6MDBcclxuXHRcdFx0J1ByaW9yJzogMFxyXG5cdFx0fTtcclxuXHR9O1xyXG5cclxuXHRfdXBkYXRlRXh0cmFJbmZvKCkge1xyXG5cdFx0Y29uc3QgRXh0cmFJbmZvT2JqZWN0ID0ge1xyXG5cdFx0XHQnQ29tcGxldGUnOiAwLFxyXG5cdFx0XHQnRGF0ZUNvbXBsZXRlZCc6ICcnLFxyXG5cdFx0XHQnUHJpb3InOiAwXHJcblx0XHR9O1xyXG5cdFx0RXh0cmFJbmZvT2JqZWN0WydDb21wbGV0ZSddID0gdGhpcy5jb21wbGV0ZTtcclxuXHRcdEV4dHJhSW5mb09iamVjdFsnRGF0ZUNvbXBsZXRlZCddID0gdGhpcy5kYXRlQ29tcGxldGVkO1xyXG5cdFx0dGhpcy5fRXh0cmFJbmZvID0gRXh0cmFJbmZvT2JqZWN0O1xyXG5cdH07XHJcblxyXG5cdF9nZXRFdmVudEh0bWwodGl0bGUgPSB0aGlzLnRpdGxlLCBjb250ZW50ID0gJycpe1xyXG5cdFx0Y29uc3QgaHRtbFRleHQgPSBcclxuXHRcdFx0YDxodG1sPlxyXG5cdFx0XHRcdDxoZWFkPlxyXG5cdFx0XHRcdFx0PG1ldGEgaHR0cC1lcXVpdj1cIkNvbnRlbnQtVHlwZVwiIGNvbnRlbnQ9XCJ0ZXh0L2h0bWw7IGNoYXJzZXQ9dW5pY29kZVwiPlxyXG5cdFx0XHRcdFx0PHRpdGxlPiR7dGl0bGV9PC90aXRsZT4gXHJcblx0XHRcdFx0PC9oZWFkPlxyXG5cdFx0XHRcdDxib2R5PlxyXG5cdFx0XHRcdFx0PCEtLVdpekh0bWxDb250ZW50QmVnaW4tLT5cclxuXHRcdFx0XHRcdDxkaXY+JHtjb250ZW50fTwvZGl2PlxyXG5cdFx0XHRcdFx0PCEtLVdpekh0bWxDb250ZW50RW5kLS0+XHJcblx0XHRcdFx0PC9ib2R5PlxyXG5cdFx0XHQ8L2h0bWw+YDtcclxuXHRcclxuXHRcdCAgcmV0dXJuIGh0bWxUZXh0XHJcblx0fTtcclxuXHJcblx0LyoqXHJcbiAgICAgKiDmoLnmja7ml6XnqIvnmoTph43lpI3op4TliJnnlJ/miJAgRnVsbENhbGVuZGFyIGV2ZW50U291cmNlLlxyXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBzdGFydCDmn6Xor6Lotbflp4vvvIxJU08g5qCH5YeG5pel5pyf5a2X56ym5LiyLlxyXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBlbmQg5p+l6K+i57uT5p2f77yMSVNPIOagh+WHhuaXpeacn+Wtl+espuS4si5cclxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IGV2ZW50U291cmNlLlxyXG4gICAgICovXHJcblx0Z2VuZXJhdGVSZXBlYXRFdmVudHMoc3RhcnQsIGVuZCkge1xyXG5cdFx0aWYgKCAhdGhpcy5ycHRSdWxlICkgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgZmluZCBDYWxlbmRhckV2ZW50IHJlcGVhdCBydWxlLicpO1xyXG5cdFx0Y29uc3QgZXZlbnRTb3VyY2UgPSB7XHJcblx0XHRcdGlkOiB0aGlzLmlkLFxyXG5cdFx0XHRldmVudHM6IFtdXHJcblx0XHR9XHJcblx0XHQvL+agueaNrnJwdFJ1bGXnlJ/miJDph43lpI3ml6XmnJ/vvIzlubbnlJ/miJDkuovku7ZcclxuXHRcdGNvbnN0IGRheUFycmF5ID0gdGhpcy5fZ2V0UmVuZGVyUmVwZWF0RGF5KHN0YXJ0LCBlbmQpO1xyXG5cdFx0Zm9yICggbGV0IGRheSBvZiBkYXlBcnJheSApIHtcclxuXHRcdFx0Ly8gZGF5IOaYr+S4gOS4qk1vbWVudOaXpeacn+WvueixoVxyXG5cdFx0XHRjb25zdCBuZXdFdmVudCA9IHRoaXMudG9GdWxsQ2FsZW5kYXJFdmVudCgpO1xyXG5cdFx0XHRuZXdFdmVudC5zdGFydCA9IGRheS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0bmV3RXZlbnQuZW5kID0gbW9tZW50KG5ld0V2ZW50LmVuZCkuYWRkKCBkYXkuZGlmZiggbW9tZW50KHRoaXMuc3RhcnQpICkgKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0ZXZlbnRTb3VyY2UuZXZlbnRzLnB1c2gobmV3RXZlbnQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBldmVudFNvdXJjZTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuICAgICAqIOagueaNruinhOWImeeUn+aIkOaXpeacn+aVsOe7hFxyXG4gICAgICogQHJldHVybnMge09iamVjdFtdfSDljIXlkKvkuIDns7vliJdgTW9tZW50YOaXpeacn+WvueixoeeahOaVsOe7hC5cclxuICAgICAqL1xyXG5cdF9nZXRSZW5kZXJSZXBlYXREYXkoc3RhcnQsIGVuZCkge1xyXG5cdFx0Y29uc3QgcnB0UnVsZSA9IHRoaXMucnB0UnVsZTtcclxuXHRcdGxldCBkYXlBcnJheTtcclxuXHRcdGxldCByZWdleDtcclxuXHRcdGNvbnNvbGUuY291bnQocnB0UnVsZSk7XHJcblx0XHRpZiAoIChyZWdleCA9IC9eRXZlcnkoXFxkKT9XZWVrcz8oXFxkKikkLykudGVzdChycHRSdWxlKSApIHtcclxuXHRcdFx0Ly8g5q+PWzEyMzRd5ZGoWzcxMjM0NTZdXHJcblx0XHRcdGNvbnN0IGN1cldlZWtEYXkgPSBtb21lbnQodGhpcy5zdGFydCkuZGF5KCk7XHJcblx0XHRcdGNvbnN0IHJlc3VsdHMgPSByZWdleC5leGVjKHJwdFJ1bGUpO1xyXG5cdFx0XHRjb25zdCBpbnRlcldlZWsgPSByZXN1bHRzWzFdO1xyXG5cdFx0XHRjb25zdCBudW1iZXIgPSByZXN1bHRzWzJdIHx8IGAke2N1cldlZWtEYXl9YDtcclxuXHRcdFx0ZGF5QXJyYXkgPSB0aGlzLl9nZXRXZWVrbHlSZXBlYXREYXkobnVtYmVyLCBzdGFydCwgZW5kLCBpbnRlcldlZWspO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoIChyZWdleCA9IC9eRXZlcnlXZWVrZGF5KFxcZCopJC8pLnRlc3QocnB0UnVsZSkgKSB7XHJcblx0XHRcdC8vIOavj+S4quW3peS9nOaXpUV2ZXJ5V2Vla2RheTEzNVxyXG5cdFx0XHRjb25zdCByZXN1bHRzID0gcmVnZXguZXhlYyhycHRSdWxlKTtcclxuXHRcdFx0Y29uc3QgbnVtYmVyID0gcmVzdWx0c1sxXSB8fCAnMTIzNDUnO1xyXG5cdFx0XHRkYXlBcnJheSA9IHRoaXMuX2dldFdlZWtseVJlcGVhdERheShudW1iZXIsIHN0YXJ0LCBlbmQpO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoIChyZWdleCA9IC9EYWlseXxXZWVrbHl8TW9udGhseXxZZWFybHkvKS50ZXN0KHJwdFJ1bGUpICkge1xyXG5cdFx0XHQvLyBEYWlseXxXZWVrbHl8TW9udGhseXxZZWFybHlcclxuXHRcdFx0Y29uc3QgcGVyUnVsZSA9IHJlZ2V4LmV4ZWMocnB0UnVsZSlbMF1cclxuXHRcdFx0ZGF5QXJyYXkgPSB0aGlzLl9nZXRQZXJSZXBlYXREYXlzKHN0YXJ0LCBlbmQsIHBlclJ1bGUpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZGF5QXJyYXk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcbiAgICAgKiDmoLnmja7mr4/lkajop4TliJnnlJ/miJDml6XmnJ/mlbDnu4RcclxuXHQgKiBAcGFyYW0ge1N0cmluZ30gbnVtYmVyIOaVtOaVsOWtl+espuS4suihqOekuueahOinhOWIme+8m1xyXG4gICAgICogQHJldHVybnMge09iamVjdFtdfSDljIXlkKvkuIDns7vliJdNb21lbnTml6XmnJ/lr7nosaHnmoTmlbDnu4QuXHJcbiAgICAgKi9cclxuXHRfZ2V0V2Vla2x5UmVwZWF0RGF5KG51bWJlciwgc3RhcnQsIGVuZCwgaW50ZXJXZWVrcyA9ICcxJykge1xyXG5cdFx0Ly/ov5Tlm55be3N0YXJ0LCBlbmR9LCB7c3RhcnQsIGVuZH0sIHtzdGFydCwgZW5kfV1cclxuXHRcdC8v6ICD6JmR5riy5p+T6IyD5Zu077yM5Lul5Y+K57uT5p2f5b6q546v55qE5pel5pyfXHJcblx0XHRjb25zdCB2aWV3U3RhcnQgPSBtb21lbnQodGhpcy5zdGFydCk7XHJcblx0XHRjb25zdCB2aWV3RW5kID0gbW9tZW50KGVuZCk7XHJcblx0XHRjb25zdCBycHRFbmQgPSB0aGlzLnJwdEVuZCA/IG1vbWVudCh0aGlzLnJwdEVuZCkgOiB2aWV3RW5kO1xyXG5cdFx0bGV0IGRheUFycmF5ID0gW107XHJcblx0XHRjb25zdCBpbnRlcnZhbFdlZWtzID0gaW50ZXJXZWVrcyA/IHBhcnNlSW50KGludGVyV2Vla3MpIDogMTtcclxuXHRcdGNvbnN0IHdlZWtkYXlzID0gbnVtYmVyLnJlcGxhY2UoJzcnLCAnMCcpLnNwbGl0KCcnKTsgLy/lkajml6Uwfjblkajlha1cclxuXHRcdGZvciAoIGxldCBkYXkgb2Ygd2Vla2RheXMgKSB7XHJcblx0XHRcdC8vXHJcblx0XHRcdGxldCBjdXJXZWVrRGF5ID0gcGFyc2VJbnQoZGF5KSwgbmV3RXZlbnRTdGFydERhdGUgPSBtb21lbnQodmlld1N0YXJ0KTtcclxuXHRcdFx0ZG8ge1xyXG5cdFx0XHRcdC8vIOWIm+W7uuaWsE1vbWVudOWvueixoVxyXG5cdFx0XHRcdG5ld0V2ZW50U3RhcnREYXRlID0gbW9tZW50KHZpZXdTdGFydCkuZGF5KGN1cldlZWtEYXkpO1xyXG5cdFx0XHRcdC8vIOagueaNruaXpeeoi+iuvue9rnRpbWUgcGFydFxyXG5cdFx0XHRcdGNvbnN0IGV2ZW50U3RhcnQgPSBtb21lbnQodGhpcy5zdGFydClcclxuXHRcdFx0XHRuZXdFdmVudFN0YXJ0RGF0ZS5zZXQoe1xyXG5cdFx0XHRcdFx0J2hvdXInOiBldmVudFN0YXJ0LmdldCgnaG91cicpLFxyXG5cdFx0XHRcdFx0J21pbnV0ZSc6IGV2ZW50U3RhcnQuZ2V0KCdtaW51dGUnKSxcclxuXHRcdFx0XHRcdCdzZWNvbmQnOiBldmVudFN0YXJ0LmdldCgnc2Vjb25kJylcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC8vIOmBv+WFjeWIneWni+mHjeWkjea4suafk1xyXG5cdFx0XHRcdGlmICggIW5ld0V2ZW50U3RhcnREYXRlLmlzU2FtZSggZXZlbnRTdGFydCApICkgZGF5QXJyYXkucHVzaCggbW9tZW50KG5ld0V2ZW50U3RhcnREYXRlKSApO1xyXG5cdFx0XHRcdC8vIOmalOWkmuWwkeWRqOmHjeWkjVxyXG5cdFx0XHRcdGN1cldlZWtEYXkgKz0gNyppbnRlcnZhbFdlZWtzO1xyXG5cdFx0XHRcdC8vY29uc29sZS5sb2coIG1vbWVudChuZXdFdmVudFN0YXJ0RGF0ZSkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJykgKTtcclxuXHRcdFx0fSB3aGlsZSAoIG1vbWVudCh2aWV3U3RhcnQpLmRheShjdXJXZWVrRGF5ICsgNyApLmlzQmVmb3JlKCB2aWV3RW5kICkgXHJcblx0XHRcdFx0XHRcdCYmIG1vbWVudCh2aWV3U3RhcnQpLmRheShjdXJXZWVrRGF5ICsgNyApLmlzQmVmb3JlKCBycHRFbmQgKSAgKVxyXG5cdFx0XHRcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIGRheUFycmF5O1xyXG5cdH07XHJcblxyXG5cdF9nZXRQZXJSZXBlYXREYXlzKHN0YXJ0LCBlbmQsIHBlclJ1bGUpIHtcclxuXHRcdGNvbnN0IHBlclJ1bGVNYXAgPSB7XHJcblx0XHRcdCdEYWlseSc6ICdkYXlzJyxcclxuXHRcdFx0J1dlZWtseScgOiAnd2Vla3MnLFxyXG5cdFx0XHQnTW9udGhseScgOiAnbW9udGhzJyxcclxuXHRcdFx0J1llYXJseScgOiAneWVhcnMnXHJcblx0XHR9O1xyXG5cdFx0Y29uc3Qgdmlld1N0YXJ0ID0gbW9tZW50KHRoaXMuc3RhcnQpO1xyXG5cdFx0Y29uc3Qgdmlld0VuZCA9IG1vbWVudChlbmQpO1xyXG5cdFx0Y29uc3QgcnB0RW5kID0gdGhpcy5ycHRFbmQgPyBtb21lbnQodGhpcy5ycHRFbmQpIDogdmlld0VuZDtcclxuXHRcdGxldCBkYXlBcnJheSA9IFtdO1xyXG5cdFx0Y29uc3QgZXZlbnRTdGFydCA9IG1vbWVudCh0aGlzLnN0YXJ0KVxyXG5cdFx0ZG8ge1xyXG5cdFx0XHQvLyDlop7liqDkuIDkuKrmnIhcclxuXHRcdFx0ZXZlbnRTdGFydC5hZGQoMSwgcGVyUnVsZU1hcFtwZXJSdWxlXSk7XHJcblx0XHRcdGRheUFycmF5LnB1c2goIG1vbWVudChldmVudFN0YXJ0KSApO1xyXG5cdFx0fSB3aGlsZSAoIGV2ZW50U3RhcnQuaXNCZWZvcmUoIHZpZXdFbmQgKSAmJiBldmVudFN0YXJ0LmlzQmVmb3JlKCBycHRFbmQgKSApO1xyXG5cclxuXHRcdHJldHVybiBkYXlBcnJheTtcclxuXHR9XHJcblxyXG5cdHRvRnVsbENhbGVuZGFyRXZlbnQoKSB7XHJcblx0XHQvLyDms6jmhI/mlrnms5Xov5Tlm57nmoTlj6rmmK9GdWxsQ2FsZW5kYXJFdmVudOeahOaVsOaNruexu+Wei++8jOW5tuS4jeaYr2V2ZW505a+56LGhXHJcblx0XHRjb25zdCB0aGF0ID0gdGhpcztcclxuXHRcdGNvbnN0IG5ld0V2ZW50ID0ge307XHJcblx0XHRjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGhpcyk7XHJcblx0XHQvLyDljrvpmaTpnZ7lv4XopoHlsZ7mgKdcclxuXHRcdGtleXMuc3BsaWNlKCBrZXlzLmZpbmRJbmRleCggKGkpID0+IGkgPT0gJ19JbmZvJyApLCAxKTtcclxuXHRcdGtleXMuc3BsaWNlKCBrZXlzLmZpbmRJbmRleCggKGkpID0+IGkgPT0gJ19FeHRyYUluZm8nICksIDEpO1xyXG5cdFx0Ly8g5rWF5ou36LSdLCDkuI3ov4fkuLvopoHlsZ7mgKfpg73mmK/ln7rmnKzmlbDmja7nsbvlnovvvIzmiYDku6XkuI3lrZjlnKjlvJXnlKjpl67pophcclxuXHRcdGtleXMuZm9yRWFjaChmdW5jdGlvbihpdGVtLCBpbmRleCwgYXJyKXtcclxuXHRcdFx0bmV3RXZlbnRbaXRlbV0gPSB0aGF0W2l0ZW1dO1xyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gbmV3RXZlbnQ7XHJcblx0fTtcclxuXHJcblx0dG9XaXpFdmVudERhdGEoKSB7XHJcblx0XHR0aGlzLl91cGRhdGUoKTtcclxuXHRcdGNvbnN0IG5ld0V2ZW50ID0ge307XHJcblx0XHRuZXdFdmVudC50aXRsZSA9IHRoaXMudGl0bGU7XHJcblx0XHRuZXdFdmVudC5ndWlkID0gdGhpcy5pZDtcclxuXHRcdG5ld0V2ZW50LkNBTEVOREFSX1NUQVJUID0gdGhpcy5hbGxEYXkgPyBtb21lbnQodGhpcy5zdGFydCkuZm9ybWF0KCdZWVlZLU1NLUREIDAwOjAwOjAwJykgOiB0aGlzLnN0YXJ0O1xyXG5cdFx0bmV3RXZlbnQuQ0FMRU5EQVJfRU5EID0gdGhpcy5hbGxEYXkgPyBtb21lbnQodGhpcy5lbmQpLmZvcm1hdCgnWVlZWS1NTS1ERCAyMzo1OTo1OScpIDogdGhpcy5lbmQ7XHJcblx0XHRuZXdFdmVudC5DQUxFTkRBUl9JTkZPID0gdGhpcy5fc3RyaW5naWZ5SW5mbyh0aGlzLl9JbmZvKTtcclxuXHRcdG5ld0V2ZW50LkNBTEVOREFSX0VYVFJBSU5GTyA9IHRoaXMuX3N0cmluZ2lmeUluZm8odGhpcy5fRXh0cmFJbmZvKTtcclxuXHRcdG5ld0V2ZW50LmNyZWF0ZWQgPSB0aGlzLmNyZWF0ZWQ7XHJcblx0XHRuZXdFdmVudC51cGRhdGVkID0gdGhpcy51cGRhdGVkO1xyXG5cdFx0cmV0dXJuIG5ld0V2ZW50O1xyXG5cdH07XHJcblxyXG5cdGFkZFRvRnVsbENhbGVuZGFyKCkge1xyXG5cdFx0Ly9UT0RPOiDlsIboh6rouqvmt7vliqDliLBGdWxsQ2FsZW5kYXJcclxuXHRcdHRoaXMuJGNhbGVuZGFyLmZ1bGxDYWxlbmRhciggJ2FkZEV2ZW50U291cmNlJywge1xyXG5cdFx0XHRldmVudHM6IFtcclxuXHRcdFx0XHR0aGlzLnRvRnVsbENhbGVuZGFyRXZlbnQoKVxyXG5cdFx0XHRdXHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRfc2F2ZUFsbFByb3AoKSB7XHJcblx0XHQvL1RPRE86IOS/neWtmOWFqOmDqOaVsOaNruWMheaLrFRpdGxlXHJcblx0XHQvLyDmm7TmlrDkuovku7bmlofmoaPmlbDmja5cclxuXHRcdGNvbnN0IGRvYyA9IGdfZGIuRG9jdW1lbnRGcm9tR1VJRCh0aGlzLmlkKTtcclxuXHRcdC8vIOS/neWtmOagh+mimFxyXG5cdFx0ZG9jLlRpdGxlID0gdGhpcy50aXRsZTtcclxuXHRcdC8vIOS/neWtmOaXtumXtOaVsOaNrlxyXG5cdFx0aWYgKCB0aGlzLmFsbERheSApIHtcclxuXHRcdFx0bGV0IHN0YXJ0U3RyID0gbW9tZW50KHRoaXMuc3RhcnQpLnNldCh7J2gnOiAwLCAnbSc6IDAsICdzJzogMH0pLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHRsZXQgZW5kU3RyID0gbW9tZW50KHRoaXMuZW5kKS5zZXQoeydoJzogMjMsICdtJzogNTksICdzJzogNTl9KS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfU1RBUlRcIiwgc3RhcnRTdHIpO1xyXG5cdFx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9FTkRcIiwgZW5kU3RyKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGxldCBzdGFydFN0ciA9IG1vbWVudCh0aGlzLnN0YXJ0KS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0bGV0IGVuZFN0ciA9IG1vbWVudCh0aGlzLmVuZCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX1NUQVJUXCIsIHN0YXJ0U3RyKTtcclxuXHRcdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfRU5EXCIsIGVuZFN0cik7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8g5L+d5a2YIENBTEVOREFSX0lORk9cclxuXHRcdHRoaXMuX3VwZGF0ZSgpO1xyXG5cdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfSU5GT1wiLCB0aGlzLl9zdHJpbmdpZnlJbmZvKHRoaXMuX0luZm8pKTtcclxuXHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX0VYVFJBSU5GT1wiLCB0aGlzLl9zdHJpbmdpZnlJbmZvKHRoaXMuX0V4dHJhSW5mbykpO1xyXG5cdH07XHJcblxyXG5cdC8vIOiuvue9ruaWh+aho+WxnuaAp+WAvFxyXG5cdF9zZXRQYXJhbVZhbHVlKGRvYywga2V5LCB2YWx1ZSkge1xyXG5cdFx0aWYgKCFkb2MpIHJldHVybiBmYWxzZTtcclxuXHRcdGRvYy5TZXRQYXJhbVZhbHVlKGtleSwgdmFsdWUpO1xyXG5cdH07XHJcblxyXG5cdF9jcmVhdGVXaXpFdmVudERvYygpIHtcclxuXHRcdC8vVE9ETzog5L+d5a2Y5YWo6YOo5pWw5o2u5YyF5ousVGl0bGVcclxuXHRcdC8vIOWIm+W7uldpekRvY1xyXG5cdFx0Y29uc3QgbG9jYXRpb24gPSBgTXkgRXZlbnRzLyR7IG1vbWVudCh0aGlzLnN0YXJ0KS5mb3JtYXQoJ1lZWVktTU0nKSB9L2A7XHJcblx0XHRjb25zdCBvYmpGb2xkZXIgPSBnX2RiLkdldEZvbGRlckJ5TG9jYXRpb24obG9jYXRpb24sIHRydWUpO1xyXG5cdFx0Y29uc3QgdGVtcEh0bWwgPSBnX2Ntbi5HZXRBVGVtcEZpbGVOYW1lKCcuaHRtbCcpO1xyXG5cdFx0Y29uc3QgaHRtbFRleHQgPSB0aGlzLl9nZXRFdmVudEh0bWwodGhpcy50aXRsZSwgJycpO1xyXG5cdFx0Z19jbW4uU2F2ZVRleHRUb0ZpbGUodGVtcEh0bWwsIGh0bWxUZXh0LCAndW5pY29kZScpO1xyXG5cdFx0Y29uc3QgZG9jID0gb2JqRm9sZGVyLkNyZWF0ZURvY3VtZW50Mih0aGlzLnRpdGxlLCBcIlwiKTtcclxuXHRcdGRvYy5DaGFuZ2VUaXRsZUFuZEZpbGVOYW1lKHRoaXMudGl0bGUpO1xyXG5cdFx0ZG9jLlVwZGF0ZURvY3VtZW50Nih0ZW1wSHRtbCwgdGVtcEh0bWwsIDB4MjIpO1xyXG5cdFx0Ly8g6K6+572u5qCH562+XHJcblx0XHQvL2lmICggdGFncyApIGRvYy5TZXRUYWdzVGV4dDIodGFncywgXCJDYWxlbmRhclwiKTtcclxuXHRcdC8vIOWwhuS/oeaBr+e8lueggeWIsFdpekRvY+WxnuaAp+S4reWOu1xyXG5cdFx0Y29uc3QgbmV3RXZlbnQgPSB0aGlzLnRvV2l6RXZlbnREYXRhKCk7XHJcblx0XHRkb2MuQWRkVG9DYWxlbmRhcihuZXdFdmVudC5DQUxFTkRBUl9TVEFSVCwgbmV3RXZlbnQuQ0FMRU5EQVJfRU5ELCBuZXdFdmVudC5DQUxFTkRBUl9JTkZPKTtcclxuXHRcdC8vIGNoYW5nZSBkYXRhYmFzZVxyXG5cdFx0ZG9jLnR5cGUgPSBcImV2ZW50XCI7XHJcblx0XHQvL1xyXG5cdFx0dGhpcy5pZCA9IGRvYy5HVUlEO1xyXG5cdH1cclxuXHJcblx0c2F2ZVRvV2l6RXZlbnREb2MoIHByb3AgPSAnYWxsJyApIHtcclxuXHRcdGlmICghZ19kYiB8fCAhZ19jbW4pIHRocm93IG5ldyBFcnJvcignSVdpekRhdGFiYXNlIG9yIElXaXpDb21tb25VSSBpcyBub3QgdmFsaWQuJyk7XHJcblx0XHQvL+ajgOafpeaWh+aho+aYr+WQpuWtmOWcqFxyXG5cdFx0Y29uc3QgZ3VpZFJlZ2V4ID0gL15bMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfSQvaTtcclxuXHRcdGNvbnN0IGlzV2l6RG9jRXhpc3QgPSBndWlkUmVnZXgudGVzdCh0aGlzLmlkKTtcclxuXHRcdC8vIOWIm+W7uuaIluiAheabtOaWsOaWh+aho1xyXG5cdFx0aWYgKCBpc1dpekRvY0V4aXN0ICkge1xyXG5cdFx0XHQvLyDmoLnmja7mjIfku6Tmm7TmlrDlhoXlrrlcclxuXHRcdFx0dGhpcy5fc2F2ZUFsbFByb3AoKTtcclxuXHRcdFx0Ly8g5pu05pawRnVsbENhbGVuZGFyXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQvLyDliJvlu7rmlrDnmoTkuovku7bmlofmoaNcclxuXHRcdFx0dGhpcy5fY3JlYXRlV2l6RXZlbnREb2MoKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdH07XHJcblxyXG5cdGRlbGV0ZUV2ZW50RGF0YSggaXNEZWxldGVEb2MgPSBmYWxzZSApe1xyXG5cdFx0bGV0IGRvYyA9IGdfZGIuRG9jdW1lbnRGcm9tR1VJRCh0aGlzLmlkKTtcclxuXHRcdGlmICghZG9jKSB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgZmluZCBFdmVudCByZWxhdGVkIFdpekRvY3VtZW50LicpXHJcblx0XHQvLyDnp7vpmaRGdWxsQ2FsZW5kYXLkuovku7ZcclxuXHRcdHRoaXMuJGNhbGVuZGFyLmZ1bGxDYWxlbmRhcigncmVtb3ZlRXZlbnRzJywgdGhpcy5pZCk7XHJcblx0XHQvLyDnp7vpmaTml6XljobmlbDmja5cclxuXHRcdGRvYy5SZW1vdmVGcm9tQ2FsZW5kYXIoKTtcclxuXHRcdC8vIOWIoOmZpOaWh+aho1xyXG5cdFx0aWYgKCBpc0RlbGV0ZURvYyApIGRvYy5EZWxldGUoKTtcclxuXHR9XHJcblxyXG5cdHJlZmV0Y2hEYXRhKCkge1xyXG5cdFx0Ly9UT0RPOiDph43mlbDmja7lupPph43mlrDojrflj5bmlbDmja7mm7TmlrDlrp7kvotcclxuXHR9O1xyXG5cclxuXHRyZWZyZXNoRXZlbnQoZXZlbnQpIHtcclxuXHRcdC8vVE9ETzog5bqU6K+l6Ieq5Yqo6YGN5Y6G5bm25L+u5pS55bGe5oCnXHJcblx0XHRpZiAoIGV2ZW50ICkge1xyXG5cdFx0XHQvLyDph43mlrDmuLLmn5NGdWxsQ2FsZW5kYXLkuovku7ZcclxuXHRcdFx0ZXZlbnQudGl0bGUgPSB0aGlzLnRpdGxlO1xyXG5cdFx0XHRldmVudC5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmJhY2tncm91bmRDb2xvcjtcclxuXHRcdFx0dGhpcy4kY2FsZW5kYXIuZnVsbENhbGVuZGFyKCd1cGRhdGVFdmVudCcsIGV2ZW50KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdC8v55SoLmZ1bGxDYWxlbmRhcigg4oCYY2xpZW50RXZlbnRz4oCZIFssIGlkT3JGaWx0ZXIgXSApIC0+IEFycmF5IOiOt+WPlua6kOaVsOaNruS7juiAjOabtOaWsFxyXG5cdFx0XHQvL1RPRE86IOmBjeWOhuW5tuWvu+aJvkdVSUTljLnphY3nmoTkuovku7ZcclxuXHRcdH1cclxuXHR9XHJcblxyXG59IiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcclxuaW1wb3J0IFdpekV2ZW50RGF0YUxvYWRlciBmcm9tICcuL1dpekV2ZW50RGF0YUxvYWRlcic7XHJcbmltcG9ydCBDYWxlbmRhckV2ZW50IGZyb20gJy4vQ2FsZW5kYXJFdmVudCc7XHJcbmltcG9ydCB7IFdpekNvbmZpcm0sIFdpekNvbW1vblVJIGFzIG9iakNvbW1vbiwgV2l6RGF0YWJhc2UgYXMgb2JqRGF0YWJhc2UsIFdpekV4cGxvcmVyV2luZG93IGFzIG9ialdpbmRvdyB9IGZyb20gJy4uL3V0aWxzL1dpekludGVyZmFjZSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtSGFuZGxlcyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLiRjYWxlbmRhciA9ICQoJyNjYWxlbmRhcicpXHJcbiAgICB9O1xyXG5cclxuICAgIG9uQ3JlYXRlQnRuQ2xpY2soZGF0YSkge1xyXG4gICAgICAgIGNvbnN0IGZ1bGxDYWxlbmRhciA9IHRoaXMuJGNhbGVuZGFyLmZ1bGxDYWxlbmRhcignZ2V0Q2FsZW5kYXInKTtcclxuICAgICAgICBjb25zdCBtb21lbnQgPSBmdWxsQ2FsZW5kYXIubW9tZW50LmJpbmQoZnVsbENhbGVuZGFyKTtcclxuICAgICAgICBjb25zdCB0aXRsZSA9IGRhdGEudGl0bGU7XHJcbiAgICAgICAgY29uc3QgY29sb3IgPSBkYXRhLmJhY2tncm91bmRDb2xvcjtcclxuICAgICAgICBjb25zdCBzdGFydCA9IG1vbWVudChkYXRhLnN0YXJ0KTtcclxuICAgICAgICBjb25zdCBlbmQgPSBtb21lbnQoZGF0YS5lbmQpO1xyXG4gICAgICAgIC8vIOiOt+WPlueUqOaIt+iuvue9rlxyXG4gICAgICAgIGNvbnN0IG5ld0V2ZW50ID0gbmV3IENhbGVuZGFyRXZlbnQoe1xyXG4gICAgICAgICAgICB0aXRsZTogdGl0bGUgfHwgJ+aXoOagh+mimCcsXHJcbiAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcclxuICAgICAgICAgICAgZW5kOiBlbmQsXHJcbiAgICAgICAgICAgIGFsbERheTogc3RhcnQuaGFzVGltZSgpICYmIGVuZC5oYXNUaW1lKCkgPyBmYWxzZSA6IHRydWUsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogY29sb3IgPyBjb2xvciA6ICcjMzJDRDMyJyxcclxuICAgICAgICB9LCB0aGlzLiRjYWxlbmRhcik7XHJcbiAgICAgICAgLy8g5L+d5a2Y5bm25riy5p+T5LqL5Lu2XHJcbiAgICAgICAgbmV3RXZlbnQuc2F2ZVRvV2l6RXZlbnREb2MoKTtcclxuICAgICAgICBuZXdFdmVudC5yZWZldGNoRGF0YSgpO1xyXG4gICAgICAgIG5ld0V2ZW50LmFkZFRvRnVsbENhbGVuZGFyKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIG9uU2F2ZUJ0bkNsaWNrKGV2ZW50LCBuZXdFdmVudERhdGEpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IHByb3AgaW4gbmV3RXZlbnREYXRhKSB7XHJcbiAgICAgICAgICAgIGV2ZW50W3Byb3BdID0gbmV3RXZlbnREYXRhW3Byb3BdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOmHjeaWsOa4suafk1xyXG4gICAgICAgIHRoaXMuJGNhbGVuZGFyLmZ1bGxDYWxlbmRhciggJ3VwZGF0ZUV2ZW50JywgZXZlbnQgKTtcclxuICAgICAgICAvLyDkv67mlLnmupDmlbDmja5cclxuICAgICAgICBjb25zdCBuZXdFdmVudCA9IG5ldyBDYWxlbmRhckV2ZW50KGV2ZW50KTtcclxuICAgICAgICBuZXdFdmVudC5zYXZlVG9XaXpFdmVudERvYygpO1xyXG4gICAgfTtcclxuXHJcbiAgICBvbkNvbXBsZXRlQnRuQ2xpY2soZXZlbnQpIHtcclxuICAgICAgICAvLyDkv67mlLnmlbDmja5cclxuICAgICAgICBjb25zdCBpc0NvbXBsZXRlID0gcGFyc2VJbnQoZXZlbnQuY29tcGxldGUpID09IDU7XHJcbiAgICAgICAgaWYgKCBpc0NvbXBsZXRlICkge1xyXG4gICAgICAgICAgICBldmVudC5jb21wbGV0ZSA9ICcwJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBldmVudC5jb21wbGV0ZSA9ICc1JztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5L+d5a2Y5pWw5o2uXHJcbiAgICAgICAgY29uc3QgbmV3RXZlbnQgPSBuZXcgQ2FsZW5kYXJFdmVudChldmVudCk7XHJcbiAgICAgICAgbmV3RXZlbnQuc2F2ZVRvV2l6RXZlbnREb2MoKTtcclxuICAgICAgICAvLyDph43mlrDmuLLmn5NcclxuICAgICAgICB0aGlzLiRjYWxlbmRhci5mdWxsQ2FsZW5kYXIoICd1cGRhdGVFdmVudCcsIGV2ZW50ICk7XHJcbiAgICB9O1xyXG5cclxuICAgIG9uRGVsZXRlRGF0YUJ0bkNsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCBXaXpDb25maXJtKFwi56Gu5a6a6KaB5Yig6Zmk6K+l5pel56iL77yfXCIsICfnlarojITliqnnkIYnKSApIHtcclxuICAgICAgICAgICAgLy8g5Yig6Zmk5pel56iLXHJcbiAgICAgICAgICAgIGxldCBuZXdFdmVudCA9IG5ldyBDYWxlbmRhckV2ZW50KGV2ZW50KTtcclxuICAgICAgICAgICAgbmV3RXZlbnQuZGVsZXRlRXZlbnREYXRhKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIG9uRGVsZXRlRG9jQnRuQ2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoIFdpekNvbmZpcm0oXCLnoa7lrpropoHliKDpmaTor6Xml6XnqIvmupDmlofmoaPvvJ9cXG7jgIznoa7lrprjgI3lsIbkvJrlr7zoh7Tnm7jlhbPnrJTorrDooqvliKDpmaTvvIFcIiwgJ+eVquiMhOWKqeeQhicpICkge1xyXG4gICAgICAgICAgICBsZXQgbmV3RXZlbnQgPSBuZXcgQ2FsZW5kYXJFdmVudChldmVudCk7XHJcbiAgICAgICAgICAgIG5ld0V2ZW50LmRlbGV0ZUV2ZW50RGF0YSh0cnVlKTtcclxuICAgICAgICB9XHRcclxuICAgIH07XHJcblxyXG4gICAgb25FZGl0T3JpZ2luQnRuQ2xpY2soZXZlbnQpIHtcclxuICAgICAgICBjb25zdCBkb2MgPSBvYmpEYXRhYmFzZS5Eb2N1bWVudEZyb21HVUlEKGV2ZW50LmlkKTtcclxuICAgICAgICBvYmpDb21tb24uRWRpdENhbGVuZGFyRXZlbnQoZG9jKTtcclxuICAgIH07XHJcblxyXG4gICAgb25PcGVuRG9jQnRuQ2xpY2soZXZlbnQpIHtcclxuICAgICAgICBjb25zdCBkb2MgPSBvYmpEYXRhYmFzZS5Eb2N1bWVudEZyb21HVUlEKGV2ZW50LmlkKTtcclxuICAgICAgICBvYmpXaW5kb3cuVmlld0RvY3VtZW50KGRvYywgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgV2l6RGF0YWJhc2UgYXMgb2JqRGF0YWJhc2UgfSBmcm9tICcuLi91dGlscy9XaXpJbnRlcmZhY2UnO1xyXG5pbXBvcnQgQ2FsZW5kYXJFdmVudCBmcm9tICcuL0NhbGVuZGFyRXZlbnQnO1xyXG5cclxuLyog5pWw5o2u6I635Y+WXHJcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuLyoqIOivpeexu+S4jldpem5vdGXnmoRXaXpEYXRhYmFzZeaOpeWPo+S6pOaNouS/oeaBr++8jOiOt+WPluaVsOaNriAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXaXpFdmVudERhdGFMb2FkZXIge1xyXG5cdC8qKlxyXG4gICAgICog5Yib6YCg5LiA5Liq5LqL5Lu25pWw5o2u5Yqg6L295ZmoLlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBzdGFydCDmn6Xor6Lotbflp4vml6XmnJ/vvIxJU0/moIflh4bml6XmnJ/lrZfnrKbkuLIuXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGVuZCDmn6Xor6LmiKroh7Pml6XmnJ/vvIxJU0/moIflh4bml6XmnJ/lrZfnrKbkuLIuXHJcbiAgICAgKi9cclxuXHRjb25zdHJ1Y3RvcihjYWxlbmRhcikge1xyXG5cdFx0aWYgKCFvYmpEYXRhYmFzZSkgdGhyb3cgbmV3IEVycm9yKCdXaXpEYXRhYmFzZSBub3QgdmFsaWQgIScpO1xyXG5cdFx0dGhpcy5EYXRhYmFzZSA9IG9iakRhdGFiYXNlO1xyXG5cdFx0dGhpcy51c2VyTmFtZSA9IG9iakRhdGFiYXNlLlVzZXJOYW1lO1xyXG5cdFx0dGhpcy4kY2FsZW5kYXIgPSAkKGNhbGVuZGFyKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuICAgICAqIOiOt+W+l+a4suafk+WQjueahOaJgOaciUZ1bGxDYWxlbmRhcuS6i+S7ti5cclxuXHQgKiBAcGFyYW0ge29iamVjdH0gdmlldyBpcyB0aGUgVmlldyBPYmplY3Qgb2YgRnVsbENhbGVuZGFyIGZvciB0aGUgbmV3IHZpZXcuXHJcblx0ICogQHBhcmFtIHtvYmplY3R9IGVsZW1lbnQgaXMgYSBqUXVlcnkgZWxlbWVudCBmb3IgdGhlIGNvbnRhaW5lciBvZiB0aGUgbmV3IHZpZXcuXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3RbXX0g6L+U5Zue55So5LqORnVsbENhbGVuZGFyIOa4suafk+eahCBldmVudFNvdXJjZXMg5pWw57uELlxyXG4gICAgICovXHJcblx0Z2V0RXZlbnRTb3VyY2VzKCB2aWV3LCBlbGVtZW50ICl7XHJcblx0XHRjb25zdCB2aWV3U3RhcnQgPSB2aWV3LnN0YXJ0LmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0Y29uc3Qgdmlld0VuZCA9IHZpZXcuZW5kLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0bGV0IGV2ZW50U291cmNlcyA9IFtdO1xyXG5cdFx0Ly/ojrflj5bmma7pgJrml6XnqItcclxuXHRcdGNvbnN0IGdlbmVyYWxFdmVudFNvdXJjZSA9IHtcclxuXHRcdFx0dHlwZTogJ2dlbmVyYWxFdmVudHMnLFxyXG5cdFx0XHQvL2V2ZW50czogdGhpcy5fZ2V0QWxsT3JpZ2luYWxFdmVudChbXSwgdGhpcy5fZDJzKGN1cnJlbnRWaWV3LnN0YXJ0LnRvRGF0ZSgpKSwgdGhpcy5fZDJzKGN1cnJlbnRWaWV3LmVuZC50b0RhdGUoKSkpXHJcblx0XHRcdGV2ZW50czogdGhpcy5fZ2V0QWxsT3JpZ2luYWxFdmVudCh2aWV3U3RhcnQsIHZpZXdFbmQpXHJcblx0XHR9XHJcblx0XHRldmVudFNvdXJjZXMucHVzaChnZW5lcmFsRXZlbnRTb3VyY2UpO1xyXG5cdFx0XHJcblx0XHQvL1RPRE86IOiOt+WPlumHjeWkjeaXpeeoi1xyXG5cdFx0Y29uc3QgcmVwZWF0RXZlbnRTb3VyY2VzID0gdGhpcy5fZ2V0QWxsUmVwZWF0RXZlbnQodmlld1N0YXJ0LCB2aWV3RW5kKTtcclxuXHRcdGV2ZW50U291cmNlcyA9IGV2ZW50U291cmNlcy5jb25jYXQocmVwZWF0RXZlbnRTb3VyY2VzKTtcclxuXHRcdC8vXHJcblx0XHRyZXR1cm4gZXZlbnRTb3VyY2VzO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG4gICAgICog5LuOV2l6RGF0YWJhc2XkuK3ojrflj5bmiYDmnInmlbDmja7mlofmoaMuXHJcblx0ICogQHBhcmFtIHthcnJheX0gZXZlbnRzIOWIneWni+S6i+S7tuaVsOe7hC5cclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gc3RhcnQgSVNP5qCH5YeG5pel5pyf5a2X56ym5LiyLlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBlbmQgSVNP5qCH5YeG5pel5pyf5a2X56ym5LiyLlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0W119IOi/lOWbnueUqOS6jkZ1bGxDYWxlbmRhcua4suafk+eahOS6i+S7tuaVsOe7hC5cclxuICAgICAqL1xyXG5cdF9nZXRBbGxPcmlnaW5hbEV2ZW50KHN0YXJ0LCBlbmQpe1xyXG5cdFx0Y29uc3QgZXZlbnRzID0gW107XHJcblx0XHRsZXQgc3FsID0gYERPQ1VNRU5UX0xPQ0FUSU9OIG5vdCBsaWtlICcvRGVsZXRlZCBJdGVtcy8lJyBhbmQgKEtCX0dVSUQgaXMgbnVsbCBvciBLQl9HVUlEID0gJycpYDtcclxuXHRcdGxldCBhbmQxID0gYCBhbmQgRE9DVU1FTlRfR1VJRCBpbiAoc2VsZWN0IERPQ1VNRU5UX0dVSUQgZnJvbSBXSVpfRE9DVU1FTlRfUEFSQU0gd2hlcmUgUEFSQU1fTkFNRSA9ICdDQUxFTkRBUl9TVEFSVCcgIGFuZCAgUEFSQU1fVkFMVUUgPD0gJyR7ZW5kfScgKWA7XHJcblx0XHRsZXQgYW5kMiA9IGAgYW5kIERPQ1VNRU5UX0dVSUQgaW4gKHNlbGVjdCBET0NVTUVOVF9HVUlEIGZyb20gV0laX0RPQ1VNRU5UX1BBUkFNIHdoZXJlIFBBUkFNX05BTUUgPSAnQ0FMRU5EQVJfRU5EJyAgYW5kICBQQVJBTV9WQUxVRSA+PSAnJHtzdGFydH0nIClgO1xyXG5cdFx0aWYgKHN0YXJ0KSBzcWwgKz0gYW5kMjtcclxuXHRcdGlmIChlbmQpIHNxbCArPSBhbmQxO1xyXG5cdFx0aWYgKG9iakRhdGFiYXNlLkRvY3VtZW50c0RhdGFGcm9tU1FMKSB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0Y29uc3QgZGF0YSA9IG9iakRhdGFiYXNlLkRvY3VtZW50c0RhdGFGcm9tU1FMKHNxbCk7XHJcblx0XHRcdFx0aWYgKCAhZGF0YSApIHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRjb25zdCBvYmogPSBKU09OLnBhcnNlKGRhdGEpO1xyXG5cdFx0XHRcdGlmICggIW9iaiB8fCAhQXJyYXkuaXNBcnJheShvYmopICkgcmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgaSArKykge1xyXG5cdFx0XHRcdFx0ZXZlbnRzLnB1c2goXHJcblx0XHRcdFx0XHRcdG5ldyBDYWxlbmRhckV2ZW50KG9ialtpXSwgdGhpcy4kY2FsZW5kYXIpLnRvRnVsbENhbGVuZGFyRXZlbnQoKVxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0cmV0dXJuIGV2ZW50cztcclxuXHRcdFx0fVxyXG5cdFx0XHRjYXRjaChlcnIpIHtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKGVycik7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdEb2N1bWVudHNEYXRhRnJvbVNRTCBtZXRob2Qgb2YgV2l6RGF0YWJhc2Ugbm90IGV4aXN0IScpO1xyXG5cdFx0XHQvKlxyXG5cdFx0XHRsZXQgZG9jQ29sbGV0aW9uID0gb2JqRGF0YWJhc2UuRG9jdW1lbnRzRnJvbVNRTChzcWwpO1xyXG5cdFx0XHQvL1xyXG5cdFx0XHRpZiAoZG9jQ29sbGV0aW9uICYmIGRvY0NvbGxldGlvbi5Db3VudCl7XHJcblx0XHRcdFx0bGV0IGRvYztcclxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGRvY0NvbGxldGlvbi5Db3VudDsgKysgaSl7XHJcblx0XHRcdFx0XHRkb2MgPSBkb2NDb2xsZXRpb24uSXRlbShpKTtcclxuXHRcdFx0XHRcdGxldCBldmVudE9iaiA9IF9ldmVudE9iamVjdChfbmV3UHNldWRvRG9jKGRvYykpO1xyXG5cdFx0XHRcdFx0aWYgKGV2ZW50T2JqKVxyXG5cdFx0XHRcdFx0XHRldmVudHMucHVzaChldmVudE9iaik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBldmVudHM7XHJcblx0XHRcdH1cclxuXHRcdFx0Ki9cdFx0XHJcblx0XHR9XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG4gICAgICog5LuOV2l6RGF0YWJhc2XkuK3ojrflj5bmiYDmnInlvqrnjq/ph43lpI3kuovku7YuXHJcblx0ICog5LuO5Yib5bu65LqL5Lu255qE5pel5pyf5byA5aeL5YiwRU5EUkVDVVJSRU5DRee7k+adn1xyXG4gICAgICogQHJldHVybiB7T2JqZWN0W119IOi/lOWbnueUqOS6jkZ1bGxDYWxlbmRhcua4suafk+eahCBldmVudFNvdXJjZSDmlbDnu4QuXHJcbiAgICAgKi9cclxuXHRfZ2V0QWxsUmVwZWF0RXZlbnQoc3RhcnQsIGVuZCl7XHJcblx0XHRjb25zdCByZXBlYXRFdmVudHMgPSBbXTtcclxuXHRcdGNvbnN0IHNxbCA9IFwiRE9DVU1FTlRfTE9DQVRJT04gbm90IGxpa2UgJy9EZWxldGVkIEl0ZW1zLyUnIGFuZCAoS0JfR1VJRCBpcyBudWxsIG9yIEtCX0dVSUQgPSAnJykgYW5kIFwiICsgXHJcblx0XHRcdFx0XHRcIkRPQ1VNRU5UX0dVSUQgaW4gKHNlbGVjdCBET0NVTUVOVF9HVUlEIGZyb20gV0laX0RPQ1VNRU5UX1BBUkFNIHdoZXJlIFBBUkFNX05BTUU9J0NBTEVOREFSX1JFQ1VSUkVOQ0UnKVwiO1xyXG5cclxuXHRcdGNvbnN0IGRhdGEgPSBvYmpEYXRhYmFzZS5Eb2N1bWVudHNEYXRhRnJvbVNRTChzcWwpO1xyXG5cdFx0Y29uc29sZS5sb2coZGF0YSlcclxuXHRcdGlmICggIWRhdGEgKSByZXR1cm4gZmFsc2U7XHJcblx0XHRcclxuXHRcdGNvbnN0IG9iaiA9IEpTT04ucGFyc2UoZGF0YSk7XHJcblx0XHRpZiAoICFvYmogfHwgIUFycmF5LmlzQXJyYXkob2JqKSApIHJldHVybiBmYWxzZTtcclxuXHRcdFxyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpICsrKSB7XHJcblx0XHRcdHJlcGVhdEV2ZW50cy5wdXNoKFxyXG5cdFx0XHRcdG5ldyBDYWxlbmRhckV2ZW50KG9ialtpXSwgdGhpcy4kY2FsZW5kYXIpLmdlbmVyYXRlUmVwZWF0RXZlbnRzKHN0YXJ0LCBlbmQpXHJcblx0XHRcdClcclxuXHRcdH1cclxuXHRcdHJldHVybiByZXBlYXRFdmVudHM7XHJcblx0XHRcclxuXHR9O1xyXG5cclxuXHQvLyDml6Xljobkuovku7bmi5bliqjlkI7mm7TmlrDmlbDmja5cclxuXHR1cGRhdGVFdmVudERhdGFPbkRyb3AoZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldyl7XHJcblx0XHQvLyBDYWxsIGhhc1RpbWUgb24gdGhlIGV2ZW504oCZcyBzdGFydC9lbmQgdG8gc2VlIGlmIGl0IGhhcyBiZWVuIGRyb3BwZWQgaW4gYSB0aW1lZCBvciBhbGwtZGF5IGFyZWEuXHJcblx0XHRjb25zdCBhbGxEYXkgPSAhZXZlbnQuc3RhcnQuaGFzVGltZSgpO1xyXG5cdFx0Ly8g6I635Y+W5LqL5Lu25paH5qGj5pe26Ze05pWw5o2uXHJcblx0XHRjb25zdCBkb2MgPSBvYmpEYXRhYmFzZS5Eb2N1bWVudEZyb21HVUlEKGV2ZW50LmlkKTtcclxuXHRcdC8vIOabtOaWsOaVsOaNrlxyXG5cdFx0aWYgKCBhbGxEYXkgKSB7XHJcblx0XHRcdGNvbnN0IHN0YXJ0U3RyID0gZXZlbnQuc3RhcnQuc2V0KHsnaCc6IDAsICdtJzogMCwgJ3MnOiAwfSkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRcdGNvbnN0IGVuZFN0ciA9IGV2ZW50LmVuZC5zZXQoeydoJzogMjMsICdtJzogNTksICdzJzogNTl9KS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfU1RBUlRcIiwgc3RhcnRTdHIpO1xyXG5cdFx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9FTkRcIiwgZW5kU3RyKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvbnN0IHN0YXJ0U3RyID0gZXZlbnQuc3RhcnQuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRcdGNvbnN0IGVuZFN0ciA9IGV2ZW50LmVuZC5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfU1RBUlRcIiwgc3RhcnRTdHIpO1xyXG5cdFx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9FTkRcIiwgZW5kU3RyKTtcclxuXHRcdH1cclxuXHRcdC8vVE9ETzog5pu05pawQ0FMRU5EQVJfUkVDVVJSRU5DReaVsOaNrlxyXG5cdFx0Ly8gXHJcblx0XHR0aGlzLl91cGRhdGVEb2NNb2RpZnlEYXRlKGRvYyk7XHJcblx0fTtcclxuXHJcblx0Ly8g6K6+572u5paH5qGj5bGe5oCn5YC8XHJcblx0X3NldFBhcmFtVmFsdWUoZG9jLCBrZXksIHZhbHVlKSB7XHJcblx0XHRpZiAoIWRvYykgcmV0dXJuIGZhbHNlO1xyXG5cdFx0ZG9jLlNldFBhcmFtVmFsdWUoa2V5LCB2YWx1ZSk7XHJcblx0fTtcclxuXHJcblx0Ly8g5pu05pawV2l6RG9j5L+u5pS55pe26Ze0XHJcblx0X3VwZGF0ZURvY01vZGlmeURhdGUoZG9jKXtcclxuXHRcdGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XHJcblx0XHRpZiAoIWRvYykgcmV0dXJuIGZhbHNlO1xyXG5cdFx0bm93LnNldFNlY29uZHMoKG5vdy5nZXRTZWNvbmRzKCkgKyAxKSAlIDYwKTtcclxuXHRcdGRvYy5EYXRlTW9kaWZpZWQgPSB0aGlzLl9kMnMobm93KTtcclxuXHR9O1xyXG5cclxuXHQvLyDlsIbml6XmnJ/lr7nosaHovazljJbkuLrlrZfnrKbkuLJcclxuXHQvL1RPRE86IOiAg+iZkeS+nei1lm1vbWVudOadpeeugOWMlui9rOaNoui/h+eoi1xyXG5cdF9kMnMoZHQpe1xyXG5cdFx0Y29uc3QgcmV0ID0gZHQuZ2V0RnVsbFllYXIoKSArIFwiLVwiICsgXHJcblx0XHRcdFx0XHRmb3JtYXRJbnRUb0RhdGVTdHJpbmcoZHQuZ2V0TW9udGgoKSArIDEpICsgXCItXCIgKyBcclxuXHRcdFx0XHRcdGZvcm1hdEludFRvRGF0ZVN0cmluZyhkdC5nZXREYXRlKCkpICsgXCIgXCIgKyBcclxuXHRcdFx0XHRcdGZvcm1hdEludFRvRGF0ZVN0cmluZyhkdC5nZXRIb3VycygpKSsgXCI6XCIgKyBcclxuXHRcdFx0XHRcdGZvcm1hdEludFRvRGF0ZVN0cmluZyhkdC5nZXRNaW51dGVzKCkpICsgXCI6XCIgKyBcclxuXHRcdFx0XHRcdGZvcm1hdEludFRvRGF0ZVN0cmluZyhkdC5nZXRTZWNvbmRzKCkpO1xyXG5cdFx0cmV0dXJuIHJldDtcclxuXHR9O1xyXG5cclxuXHQvLyDml6Xljobml7bpl7Tph43nva7ml7bpl7TojIPlm7TlkI7mm7TmlrDmlbDmja5cclxuXHR1cGRhdGVFdmVudERhdGFPblJlc2l6ZShldmVudCwgZGVsdGEsIHJldmVydEZ1bmMsIGpzRXZlbnQsIHVpLCB2aWV3KXtcclxuXHRcdGNvbnN0IGFsbERheSA9IGV2ZW50LnN0YXJ0Lmhhc1RpbWUoKSA/IGZhbHNlIDogdHJ1ZTtcclxuXHRcdC8vIOiOt+W+l+S6i+S7tuaWh+aho+aXtumXtOaVsOaNrlxyXG5cdFx0Y29uc3QgZG9jID0gb2JqRGF0YWJhc2UuRG9jdW1lbnRGcm9tR1VJRChldmVudC5pZCk7XHJcblx0XHQvLyDorqHnrpfmm7TmlLnlkI7nmoTnu5PmnZ/ml7bpl7RcclxuXHRcdGNvbnN0IGV2ZW50RW5kU3RyID0gZXZlbnQuZW5kLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0Ly8g5pu05paw5paH5qGj5pWw5o2uXHJcblx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9FTkRcIiwgZXZlbnRFbmRTdHIpO1xyXG5cdFx0dGhpcy5fdXBkYXRlRG9jTW9kaWZ5RGF0ZShkb2MpO1xyXG5cdH07XHJcblxyXG5cdC8vIOWIm+W7uuS6i+S7tiBzdGFydCwgZW5kLCBqc0V2ZW50LCB2aWV3XHJcblx0LyoqXHJcbiAgICAgKiDliJvlu7rkuovku7YuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IHNlbGVjdGlvbkRhdGEgRnVsbENhbGVuZGFyIOS8oOWFpeeahOaVsOaNri5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gc2VsZWN0aW9uRGF0YS5zdGFydCBNb21lbnQg57G75pel5pyf5a+56LGhLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBzZWxlY3Rpb25EYXRhLmVuZCBNb21lbnQg57G75pel5pyf5a+56LGhLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBzZWxlY3Rpb25EYXRhLmpzRXZlbnQgbmF0aXZlIEphdmFTY3JpcHQg5LqL5Lu2LlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBzZWxlY3Rpb25EYXRhLnZpZXcgRnVsbENhbGVuZGFyIOinhuWbvuWvueixoS5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gdXNlcklucHV0cyDnlKjmiLfkvKDlhaXnmoTlhbbku5bkv6Hmga8uXHJcbiAgICAgKiBUT0RPOiDor6Xmlrnms5Xlj6/ku6XmlL7nva7liLBDYWxlbmRhckV2ZW5055qE6Z2Z5oCB5pa55rOV5LiKXHJcbiAgICAgKi9cclxuXHRjcmVhdGVFdmVudChzZWxlY3Rpb25EYXRhLCB1c2VySW5wdXRzKXtcclxuXHRcdHRyeSB7XHJcblx0XHRcdC8vIOiOt+WPlueUqOaIt+iuvue9rlxyXG5cdFx0XHRjb25zdCBuZXdFdmVudCA9IG5ldyBDYWxlbmRhckV2ZW50KHtcclxuXHRcdFx0XHR0aXRsZTogdXNlcklucHV0cy50aXRsZSA/IHVzZXJJbnB1dHMudGl0bGUgOiAn5peg5qCH6aKYJyxcclxuXHRcdFx0XHRzdGFydDogc2VsZWN0aW9uRGF0YS5zdGFydCxcclxuXHRcdFx0XHRlbmQ6IHNlbGVjdGlvbkRhdGEuZW5kLFxyXG5cdFx0XHRcdGFsbERheTogc2VsZWN0aW9uRGF0YS5zdGFydC5oYXNUaW1lKCkgJiYgc2VsZWN0aW9uRGF0YS5lbmQuaGFzVGltZSgpID8gZmFsc2UgOiB0cnVlLFxyXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogdXNlcklucHV0cy5jb2xvciA/IHVzZXJJbnB1dHMuY29sb3IgOiAnIzMyQ0QzMicsXHJcblx0XHRcdH0sIHRoaXMuJGNhbGVuZGFyKTtcclxuXHRcdFx0Ly8g5L+d5a2Y5bm25riy5p+T5LqL5Lu2XHJcblx0XHRcdG5ld0V2ZW50LnNhdmVUb1dpekV2ZW50RG9jKCk7XHJcblx0XHRcdG5ld0V2ZW50LnJlZmV0Y2hEYXRhKCk7XHJcblx0XHRcdG5ld0V2ZW50LmFkZFRvRnVsbENhbGVuZGFyKCk7XHJcblx0XHR9IGNhdGNoIChlKSB7Y29uc29sZS5sb2coZSl9XHJcblx0fVxyXG5cclxufVxyXG5cclxuXHJcbi8vIFRPRE86IOmHjeWGmeiOt+WPluaVsOaNrueahOaWueW8j1xyXG5mdW5jdGlvbiBfZ2V0V2l6RXZlbnQoc3RhcnQsIGVuZCkge1xyXG5cdC8vVE9ETzpcclxuXHRsZXQgZXZlbnRzID0gW107XHJcblx0bGV0IEV2ZW50Q29sbGVjdGlvbiA9IG9iakRhdGFiYXNlLkdldENhbGVuZGFyRXZlbnRzMihzdGFydCwgZW5kKTtcclxuXHRyZXR1cm4gZXZlbnRzXHJcbn1cclxuXHJcbi8vIOiOt+W+l+a4suafk+WQjueahOmHjeWkjeaXpeacn1xyXG5mdW5jdGlvbiBnZXRSZW5kZXJSZXBlYXREYXkoKXtcclxuXHR2YXIgZGF5QXJyYXkgPSBuZXcgQXJyYXkoKTtcclxuXHR2YXIgZXZlbnRTdGFydCA9IG5ldyBEYXRlKF9zMmQoZ19ldmVudFN0YXJ0KSk7XHJcblx0XHRcclxuXHRzd2l0Y2ggKGdfcmVwZWF0UnVsZSl7XHJcbiAgICAgICAgICAgIGNhc2UgXCJFdmVyeVdlZWsxXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJFdmVyeVdlZWsyXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJFdmVyeVdlZWszXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJFdmVyeVdlZWs0XCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJFdmVyeVdlZWs1XCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJFdmVyeVdlZWs2XCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJFdmVyeVdlZWs3XCI6XHJcblx0XHRcdFx0Z2V0V2Vla2x5UmVwZWF0RGF5KGRheUFycmF5LCBbZ19yZXBlYXRSdWxlLmNoYXJBdCg5KV0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJFdmVyeVdlZWtkYXlcIjpcclxuXHRcdFx0XHRnZXRXZWVrbHlSZXBlYXREYXkoZGF5QXJyYXksIFsxLCAyLCAzLCA0LCA1XSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2Vla2RheTEzNVwiOlxyXG5cdFx0XHRcdGdldFdlZWtseVJlcGVhdERheShkYXlBcnJheSwgWzEsIDMsIDVdKTtcclxuXHRcdFx0XHRicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2Vla2RheTI0XCI6XHJcblx0XHRcdFx0Z2V0V2Vla2x5UmVwZWF0RGF5KGRheUFycmF5LCBbMiwgNF0pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnlXZWVrZGF5NjdcIjpcclxuXHRcdFx0XHRnZXRXZWVrbHlSZXBlYXREYXkoZGF5QXJyYXksIFs2LCA3XSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJEYWlseVwiOlxyXG5cdFx0XHRcdGdldFdlZWtseVJlcGVhdERheShkYXlBcnJheSwgWzEsIDIsIDMsIDQsIDUsIDYsIDddKTtcclxuXHRcdFx0XHRicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIldlZWtseVwiOi8vIOavj+WRqFxyXG5cdFx0XHRcdGdldFdlZWtseVJlcGVhdERheShkYXlBcnJheSwgW2V2ZW50U3RhcnQuZ2V0RGF5KCldKTtcclxuXHRcdFx0XHRicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5MldlZWtzXCI6XHJcblx0XHRcdFx0Z2V0V2Vla2x5UmVwZWF0RGF5KGRheUFycmF5LCBbZXZlbnRTdGFydC5nZXREYXkoKV0pO1xyXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGF5QXJyYXkubGVuZ3RoOyArKyBpKXtcclxuXHRcdFx0XHRcdHZhciBpbnRlciA9IF9pbnRlckRheXMoX2QycyhldmVudFN0YXJ0KSwgX2QycyhkYXlBcnJheVtpXVswXSkpO1xyXG5cdFx0XHRcdFx0aWYgKChwYXJzZUZsb2F0KChpbnRlci0xKS83LjApICUgMikgIT0gMCApe1xyXG5cdFx0XHRcdFx0XHRkYXlBcnJheS5zcGxpY2UoaSwgMSk7XHJcblx0XHRcdFx0XHRcdGkgLS07XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiTW9udGhseVwiOlxyXG5cdFx0XHRcdGdldE1vbnRobHlSZXBlYXREYXkoZGF5QXJyYXkpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiWWVhcmx5XCI6XHJcblx0XHRcdFx0Z2V0WWVhcmx5UmVwZWF0RGF5KGRheUFycmF5KTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Ly8gVE9ETzog5rGJ5a2X6ZyA6KaB6ICD6JmRXHJcbiAgICAgICAgICAgIGNhc2UgXCJDaGluZXNlTW9udGhseVwiOlxyXG4gICAgICAgICAgICAgICAgZ2V0Q2hpbmVzZVJlcGVhdERheShkYXlBcnJheSwgJ+aciCcpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiQ2hpbmVzZVllYXJseVwiOlxyXG4gICAgICAgICAgICAgICAgZ2V0Q2hpbmVzZVJlcGVhdERheShkYXlBcnJheSwgJ+WOhicpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0OntcclxuXHRcdFx0XHRpZiAoZ19yZXBlYXRSdWxlLmluZGV4T2YoXCJFdmVyeVdlZWtcIikgPT0gMCl7XHJcblx0XHRcdFx0XHR2YXIgZGF5cyA9IGdfcmVwZWF0UnVsZS5zdWJzdHIoXCJFdmVyeVdlZWtcIi5sZW5ndGgpLnNwbGl0KCcnKTtcclxuXHRcdFx0XHRcdGdldFdlZWtseVJlcGVhdERheShkYXlBcnJheSwgZGF5cyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG5cdHJldHVybiBkYXlBcnJheTtcclxufVxyXG5cclxuXHJcbi8qIOaVsOaNruiOt+WPllxyXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcblxyXG4vKiDmnYLpobnlkozlt6XlhbdcclxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG4vLyDliKTmlq3lhoXmoLhcclxuZnVuY3Rpb24gaXNDaHJvbWUoKSB7XHJcblx0aWYgKGdfaXNDaHJvbWUpIHJldHVybiBnX2lzQ2hyb21lO1xyXG5cdC8vXHJcblx0dmFyIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xyXG5cdGdfaXNDaHJvbWUgPSB1YS5pbmRleE9mKCdjaHJvbWUnKSAhPSAtMTtcclxuXHQvL1xyXG5cdHJldHVybiBnX2lzQ2hyb21lO1xyXG59XHJcblxyXG4vLyDlsIbmlbTmlbDovazmjaLmiJDml6XmnJ/lrZfnrKbkuLJcclxuZnVuY3Rpb24gZm9ybWF0SW50VG9EYXRlU3RyaW5nKG4pe1xyXG5cdFx0XHJcblx0cmV0dXJuIG4gPCAxMCA/ICcwJyArIG4gOiBuO1xyXG59XHJcblxyXG4vLyDmo4Dmn6Xlj4rlop7liqDmlbDlgLzlrZfnrKbkuLLplb/luqbvvIzkvovlpoLvvJonMicgLT4gJzAyJ1xyXG5mdW5jdGlvbiBjaGVja0FuZEFkZFN0ckxlbmd0aChzdHIpIHtcclxuXHRpZiAoc3RyLmxlbmd0aCA8IDIpIHtcclxuXHRcdHJldHVybiAnMCcgKyBzdHI7XHJcblx0fSBlbHNlIHtcclxuXHRcdHJldHVybiBzdHI7XHJcblx0fVxyXG59XHJcblxyXG4vLyDlsIblrZfnrKbkuLLovazljJbkuLrml6XmnJ/lr7nosaFcclxuZnVuY3Rpb24gX3MyZChzdHIpe1xyXG5cdGlmICghc3RyKVxyXG5cdFx0cmV0dXJuICcnO1xyXG5cdHZhciBkYXRlID0gbmV3IERhdGUoc3RyLnN1YnN0cigwLCA0KSxcclxuXHRcdFx0XHRcdHN0ci5zdWJzdHIoNSwgMikgLSAxLFxyXG5cdFx0XHRcdFx0c3RyLnN1YnN0cig4LCAzKSxcclxuXHRcdFx0XHRcdHN0ci5zdWJzdHIoMTEsIDIpLFxyXG5cdFx0XHRcdFx0c3RyLnN1YnN0cigxNCwgMiksXHJcblx0XHRcdFx0XHRzdHIuc3Vic3RyKDE3LCAyKVxyXG5cdFx0XHRcdFx0KTtcdFx0XHJcblx0cmV0dXJuIGRhdGU7XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgY29sb3JDb3VudDogMTIsXHJcbiAgICBjb2xvckl0ZW1zOiBbXHJcbiAgICAgICAgeyBcImNvbG9yVmFsdWVcIjogXCIjMzJDRDMyXCIsIFwiY29sb3JOYW1lXCI6ICfmqYTmpoTnu78nIH0sXHJcbiAgICAgICAgeyBcImNvbG9yVmFsdWVcIjogXCIjNTQ4NEVEXCIsIFwiY29sb3JOYW1lXCI6ICflrp3nn7Pok50nIH0sXHJcbiAgICAgICAgeyBcImNvbG9yVmFsdWVcIjogXCIjQTRCREZFXCIsIFwiY29sb3JOYW1lXCI6ICfok53oibInIH0sXHJcbiAgICAgICAgeyBcImNvbG9yVmFsdWVcIjogXCIjNDZENkRCXCIsIFwiY29sb3JOYW1lXCI6ICfpnZLnu7/oibInIH0sXHJcbiAgICAgICAgeyBcImNvbG9yVmFsdWVcIjogXCIjN0FFN0JGXCIsIFwiY29sb3JOYW1lXCI6ICfnu7/oibInIH0sXHJcbiAgICAgICAgeyBcImNvbG9yVmFsdWVcIjogXCIjNTFCNzQ5XCIsIFwiY29sb3JOYW1lXCI6ICfmuIXmlrDnu78nIH0sXHJcbiAgICAgICAgeyBcImNvbG9yVmFsdWVcIjogXCIjRkJENzVCXCIsIFwiY29sb3JOYW1lXCI6ICfpu4ToibInIH0sXHJcbiAgICAgICAgeyBcImNvbG9yVmFsdWVcIjogXCIjRkZCODc4XCIsIFwiY29sb3JOYW1lXCI6ICfmqZjoibInIH0sXHJcbiAgICAgICAgeyBcImNvbG9yVmFsdWVcIjogXCIjRkY4ODdDXCIsIFwiY29sb3JOYW1lXCI6ICfnuqLoibInIH0sXHJcbiAgICAgICAgeyBcImNvbG9yVmFsdWVcIjogXCIjREMyMTI3XCIsIFwiY29sb3JOYW1lXCI6ICflpaLljY7nuqInIH0sXHJcbiAgICAgICAgeyBcImNvbG9yVmFsdWVcIjogXCIjREJBREZGXCIsIFwiY29sb3JOYW1lXCI6ICfntKvoibInIH0sXHJcbiAgICAgICAgeyBcImNvbG9yVmFsdWVcIjogXCIjRTFFMUUxXCIsIFwiY29sb3JOYW1lXCI6ICfngbDoibInIH1cclxuICAgIF0sXHJcblxyXG59IiwiLy9UT0RPOiDliKTmlq13aW5kb3cuZXh0ZXJuYWzmmK/lkKbkuLpXaXpIdG1sRWRpdG9yQXBwXHJcbmNvbnN0IFdpekV4cGxvcmVyQXBwID0gd2luZG93LmV4dGVybmFsO1xyXG5jb25zdCBXaXpFeHBsb3JlcldpbmRvdyA9IFdpekV4cGxvcmVyQXBwLldpbmRvdztcclxuY29uc3QgV2l6RGF0YWJhc2UgPSBXaXpFeHBsb3JlckFwcC5EYXRhYmFzZTtcclxuY29uc3QgV2l6Q29tbW9uVUkgPSBXaXpFeHBsb3JlckFwcC5DcmVhdGVXaXpPYmplY3QoXCJXaXpLTUNvbnRyb2xzLldpekNvbW1vblVJXCIpO1xyXG5cclxuZnVuY3Rpb24gV2l6Q29uZmlybShtc2csIHRpdGxlKSB7XHJcbiAgICByZXR1cm4gV2l6RXhwbG9yZXJXaW5kb3cuU2hvd01lc3NhZ2UobXNnLCB0aXRsZSwgMHgwMDAwMDAyMCB8IDB4MDAwMDAwMDEpID09IDE7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIFdpekFsZXJ0KG1zZykge1xyXG4gICAgV2l6RXhwbG9yZXJXaW5kb3cuU2hvd01lc3NhZ2UobXNnLCBcIntwfVwiLCAweDAwMDAwMDQwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gV2l6QnViYmxlTWVzc2FnZSh0aXRsZSwgbXNnLCBjb2xvciA9ICcjRkZGQTlEJywgZGVsYXkgPSAnMycpIHtcclxuICAgIGNvbnN0IGFwcFBhdGggPSBXaXpDb21tb25VSS5HZXRTcGVjaWFsRm9sZGVyKFwiQXBwUGF0aFwiKTtcclxuICAgIC8vXHJcbiAgICBjb25zdCB3aXpTaGVsbEZpbGVOYW1lID0gYXBwUGF0aCArIFwiV2l6LmV4ZVwiO1xyXG4gICAgY29uc3QgZGxsRmlsZU5hbWUgPSBhcHBQYXRoICsgXCJXaXpUb29scy5kbGxcIjtcclxuICAgIC8vXHJcbiAgICBjb25zdCBwYXJhbXMgPSBgXCIke2RsbEZpbGVOYW1lfVwiIFdpelRvb2xzU2hvd0J1YmJsZVdpbmRvdzJFeCAvVGl0bGU9JHt0aXRsZX0gL0xpbmtUZXh0PSR7bXNnfSAvTGlua1VSTD1AIC9Db2xvcj0ke2NvbG9yfSAvRGVsYXk9JHtkZWxheX1gO1xyXG4gICAgLy9cclxuICAgIFdpekNvbW1vblVJLlJ1bkV4ZSh3aXpTaGVsbEZpbGVOYW1lLCBwYXJhbXMsIGZhbHNlKTtcclxufVxyXG5cclxuY2xhc3MgV2l6U2hlbGwge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGRsbEZpbGVOYW1lLCBkbGxFeHBvcnRGdW5jLCBwYXJhbXMpIHtcclxuICAgICAgICAvL+S9v+eUqGRsbOWvvOWHuuWHveaVsO+8jOWkp+mDqOWIhuWFpeWPguaXtuWRveS7pOihjOaWueW8j++8jOWFt+S9k+WPguaVsOayoeacieivtOaYju+8jOaciemcgOimgeiBlOezu+W8gOWPkeS6uuWRmFxyXG4gICAgICAgIGNvbnN0IGFwcFBhdGggPSBXaXpDb21tb25VSS5HZXRTcGVjaWFsRm9sZGVyKFwiQXBwUGF0aFwiKTtcclxuICAgICAgICB0aGlzLmFwcFBhdGggPSBhcHBQYXRoXHJcbiAgICAgICAgdGhpcy53aXpFeGUgPSBhcHBQYXRoICsgXCJXaXouZXhlXCI7XHJcbiAgICAgICAgdGhpcy5kbGxGaWxlTmFtZSA9IGRsbEZpbGVOYW1lID8gYXBwUGF0aCArIGRsbEZpbGVOYW1lIDogYXBwUGF0aCArICdXaXpLTUNvbnRyb2xzLmRsbCc7XHJcbiAgICAgICAgdGhpcy5kbGxFeHBvcnRGdW5jID0gZGxsRXhwb3J0RnVuYyB8fCAnV2l6S01SdW5TY3JpcHQnO1xyXG4gICAgICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xyXG4gICAgfVxyXG5cclxuICAgIHJ1blNjcmlwdEZpbGUoc2NyaXB0RmlsZU5hbWUsIHNjcmlwdFBhcmFtcykge1xyXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IGBcIiR7dGhpcy5hcHBQYXRoICsgJ1dpektNQ29udHJvbHMuZGxsJ31cIiBXaXpLTVJ1blNjcmlwdCAvU2NyaXB0RmlsZU5hbWU9JHtzY3JpcHRGaWxlTmFtZX0gJHtzY3JpcHRQYXJhbXN9YDtcclxuICAgICAgICBXaXpDb21tb25VSS5SdW5FeGUodGhpcy53aXpFeGUsIHBhcmFtcywgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHdpekJ1YmJsZU1lc3NhZ2UodGl0bGUsIG1zZywgY29sb3IgPSAnI0ZGRkE5RCcsIGRlbGF5ID0gJzMnKSB7XHJcbiAgICAgICAgV2l6QnViYmxlTWVzc2FnZSh0aXRsZSwgbXNnLCBjb2xvciwgZGVsYXkpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXRXaXpJbnRlcmZhY2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgV2l6RXhwbG9yZXJBcHAsIFdpekV4cGxvcmVyV2luZG93LCBXaXpEYXRhYmFzZSwgV2l6Q29tbW9uVUlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFxyXG4gICAgV2l6RXhwbG9yZXJBcHAsIFxyXG4gICAgV2l6RXhwbG9yZXJXaW5kb3csIFxyXG4gICAgV2l6RGF0YWJhc2UsIFxyXG4gICAgV2l6Q29tbW9uVUksIFxyXG4gICAgV2l6Q29uZmlybSwgXHJcbiAgICBXaXpBbGVydCwgXHJcbiAgICBXaXpCdWJibGVNZXNzYWdlLCBcclxuICAgIFdpelNoZWxsIFxyXG59O1xyXG4iXSwic291cmNlUm9vdCI6IiJ9