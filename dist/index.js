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
/******/ 	var hotCurrentHash = "5685c4f9bb2d64e6cce0"; // eslint-disable-line no-unused-vars
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
exports.push([module.i, "\r\n/* 日历整体样式\r\n-------------------------------------------------------------------------*/\r\n#calendar-container {\r\n    position: fixed;\r\n    top: 0;\r\n    left: 8px;\r\n    right: 8px;\r\n    bottom: 8px;\r\n}\r\n\r\n.fc-header-toolbar {\r\n    /*\r\n    the calendar will be butting up against the edges,\r\n    but let's scoot in the header's buttons\r\n    */\r\n    padding-top: 14px;\r\n    padding-left: 0;\r\n    padding-right: 0;\r\n}\r\n\r\n/* 事件渲染\r\n-------------------------------------------------------------------------*/\r\n.tc-complete {\r\n    opacity: 0.3;\r\n\r\n}\r\n\r\n.tc-complete > .fc-content,\r\n.tc-complete > .fc-content > .fc-time,\r\n.tc-complete > .fc-content > .fc-title\r\n{\r\n    text-decoration: line-through !important;\r\n}\r\n\r\n.tc-complete:hover {\r\n    opacity: 1;\r\n}", ""]);

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");

var _react2 = _interopRequireDefault(_react);

var _Calendar = __webpack_require__(/*! ./components/Calendar/Calendar */ "./src/components/Calendar/Calendar.js");

var _Calendar2 = _interopRequireDefault(_Calendar);

var _WizEventDataLoader = __webpack_require__(/*! ./models/WizEventDataLoader */ "./src/models/WizEventDataLoader.js");

var _WizEventDataLoader2 = _interopRequireDefault(_WizEventDataLoader);

var _CalendarEvent = __webpack_require__(/*! ./models/CalendarEvent */ "./src/models/CalendarEvent.js");

var _CalendarEvent2 = _interopRequireDefault(_CalendarEvent);

var _EventPopover = __webpack_require__(/*! ./components/EventPopover/EventPopover */ "./src/components/EventPopover/EventPopover.js");

var _EventPopover2 = _interopRequireDefault(_EventPopover);

var _EventCreateModal = __webpack_require__(/*! ./components/Modal/EventCreateModal */ "./src/components/Modal/EventCreateModal.js");

var _EventCreateModal2 = _interopRequireDefault(_EventCreateModal);

var _EventEditModal = __webpack_require__(/*! ./components/Modal/EventEditModal */ "./src/components/Modal/EventEditModal.js");

var _EventEditModal2 = _interopRequireDefault(_EventEditModal);

var _utils = __webpack_require__(/*! ./utils/utils */ "./src/utils/utils.js");

var _WizInterface = __webpack_require__(/*! ./utils/WizInterface */ "./src/utils/WizInterface.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.dataLoader = new _WizEventDataLoader2.default();
        //
        _this.state = {
            isShowingEvent: false,
            isEditingEvent: false,
            isCreatingEvent: false,
            clickedArgs: null,
            editingEvent: null,
            selectedRange: null
            //
        };_this.handleCalendarRender = _this.handleCalendarRender.bind(_this);
        _this.handleEventClick = _this.handleEventClick.bind(_this);
        _this.handleViewRender = _this.handleViewRender.bind(_this);
        _this.handleEventDrop = _this.handleEventDrop.bind(_this);
        _this.handleEventResize = _this.handleEventResize.bind(_this);
        _this.handleEventRender = _this.handleEventRender.bind(_this);
        //
        _this.handlePopoverHide = _this.handlePopoverHide.bind(_this);
        _this.handleDateSelect = _this.handleDateSelect.bind(_this);
        _this.handleModalClose = _this.handleModalClose.bind(_this);
        //
        _this.handleEventCreate = _this.handleEventCreate.bind(_this);
        _this.handleEventSave = _this.handleEventSave.bind(_this);
        _this.handleEventEdit = _this.handleEventEdit.bind(_this);
        _this.handleEventComplete = _this.handleEventComplete.bind(_this);
        _this.handleEventDeleteData = _this.handleEventDeleteData.bind(_this);
        _this.handleEventDeleteDoc = _this.handleEventDeleteDoc.bind(_this);
        _this.handleEventOpenDoc = _this.handleEventOpenDoc.bind(_this);
        _this.handleEventEditOriginData = _this.handleEventEditOriginData.bind(_this);

        return _this;
    }

    // 处理FullCalendar事件
    // ------------------------------------------------------------

    _createClass(App, [{
        key: 'handleCalendarRender',
        value: function handleCalendarRender(el) {
            // 获得DOM元素用于操作FullCalendar
            this.calendar = el;
        }
    }, {
        key: 'handleEventClick',
        value: function handleEventClick(event, jsEvent, view) {
            var args = { event: event, jsEvent: jsEvent, view: view };
            this.setState({
                isShowingEvent: true,
                clickedArgs: args
            });
        }
    }, {
        key: 'handleViewRender',
        value: function handleViewRender(view, element) {
            // 刷新视图，重新获取日历事件
            var $calendar = $(this.calendar);
            var eventSources = this.dataLoader.getEventSources(view, element);
            $calendar.fullCalendar('removeEvents');
            for (var i = 0; i < eventSources.length; i++) {
                $calendar.fullCalendar('addEventSource', eventSources[i]);
            }
        }
    }, {
        key: 'handleEventDrop',
        value: function handleEventDrop(event, delta, revertFunc, jsEvent, ui, view) {
            if (event.id) {
                this.dataLoader.updateEventDataOnDrop(event, delta, revertFunc, jsEvent, ui, view);
            } else {
                revertFunc();
            }
        }
    }, {
        key: 'handleEventResize',
        value: function handleEventResize(event, delta, revertFunc, jsEvent, ui, view) {
            if (event.id) {
                this.dataLoader.updateEventDataOnResize(event, delta, revertFunc, jsEvent, ui, view);
            } else {
                revertFunc();
            }
        }
    }, {
        key: 'handleEventRender',
        value: function handleEventRender(eventObj, $el) {
            // 设置文本颜色
            var rgbString = $el.css('background-color');
            var rgbArray = /^rgb\((\d*), (\d*), (\d*)\)$/.exec(rgbString);
            if (rgbArray) {
                var hsl = (0, _utils.rgb2hsl)(rgbArray[1], rgbArray[2], rgbArray[3]);
                var lightness = hsl[2] - Math.cos((hsl[0] + 70) / 180 * Math.PI) * 0.15;
                var textColor = lightness > 0.5 ? '#222' : 'white';
                $el.css('color', textColor);
            }
            // 元素已经渲染，可修改元素
            var isComplete = parseInt(eventObj.complete) == 5;
            if (isComplete) {
                // 样式
                $el.addClass('tc-complete');
            }
        }

        // 处理用户事件
        // ------------------------------------------------------------

    }, {
        key: 'handlePopoverHide',
        value: function handlePopoverHide() {
            //每次出现都渲染一个新的Popover
            this.setState({
                isShowingEvent: false
            });
        }
    }, {
        key: 'handleDateSelect',
        value: function handleDateSelect(start, end, jsEvent, view) {
            var args = { start: start, end: end, jsEvent: jsEvent, view: view };
            this.setState({
                isCreatingEvent: true,
                selectedRange: args
            });
        }
    }, {
        key: 'handleModalClose',
        value: function handleModalClose() {
            var $calendar = $(this.calendar);
            $calendar.fullCalendar('unselect');
            //
            this.setState({
                isEditingEvent: false,
                isCreatingEvent: false
            });
        }

        // 处理按钮功能
        // ------------------------------------------------------------

    }, {
        key: 'handleEventCreate',
        value: function handleEventCreate(eventData) {
            var start = eventData.start,
                end = eventData.end,
                allDay = eventData.allDay,
                title = eventData.title,
                backgroundColor = eventData.backgroundColor;

            var moment = this.fullCalendar.moment.bind(this.fullCalendar);
            // 处理日程数据
            start = moment(start), end = moment(end);
            allDay = !(start.hasTime() && end.hasTime());
            // 新建日程
            var newEvent = new _CalendarEvent2.default({
                title: title || '无标题',
                backgroundColor: backgroundColor || '#32CD32',
                start: start, end: end, allDay: allDay
            });
            newEvent.saveToWizEventDoc();
            // 添加到日历
            $(this.calendar).fullCalendar('addEventSource', {
                events: [newEvent.toFullCalendarEvent()]
            });
        }
    }, {
        key: 'handleEventSave',
        value: function handleEventSave(event, newEventData) {
            for (var prop in newEventData) {
                event[prop] = newEventData[prop];
            }
            var newEvent = new _CalendarEvent2.default(event);
            newEvent.saveToWizEventDoc();
            //
            $(this.calendar).fullCalendar('updateEvent', event);
        }
    }, {
        key: 'handleEventComplete',
        value: function handleEventComplete(event) {
            // 修改数据
            var isComplete = parseInt(event.complete) == 5;
            if (isComplete) {
                event.complete = '0';
            } else {
                event.complete = '5';
            }
            // 保存数据
            var newEvent = new _CalendarEvent2.default(event);
            newEvent.saveToWizEventDoc();
            //
            $(this.calendar).fullCalendar('updateEvent', event);
        }
    }, {
        key: 'handleEventEdit',
        value: function handleEventEdit(event) {
            this.setState({
                isEditingEvent: true,
                editingEvent: event
            });
        }
    }, {
        key: 'handleEventDeleteData',
        value: function handleEventDeleteData(event) {
            if ((0, _WizInterface.WizConfirm)("确定要删除该日程？", '番茄助理')) {
                // 删除日程
                var newEvent = new _CalendarEvent2.default(event);
                newEvent.deleteEventData(false);
            }
            $(this.calendar).fullCalendar('removeEvents', event.id);
        }
    }, {
        key: 'handleEventDeleteDoc',
        value: function handleEventDeleteDoc(event) {
            if ((0, _WizInterface.WizConfirm)("确定要删除该日程源文档？\n「确定」将会导致相关笔记被删除！", '番茄助理')) {
                var newEvent = new _CalendarEvent2.default(event);
                newEvent.deleteEventData(true);
            }
            $(this.calendar).fullCalendar('removeEvents', event.id);
        }
    }, {
        key: 'handleEventOpenDoc',
        value: function handleEventOpenDoc(event) {
            var doc = _WizInterface.WizDatabase.DocumentFromGUID(event.id);
            _WizInterface.WizExplorerWindow.ViewDocument(doc, true);
        }
    }, {
        key: 'handleEventEditOriginData',
        value: function handleEventEditOriginData(event) {
            var doc = _WizInterface.WizDatabase.DocumentFromGUID(event.id);
            objCommon.EditCalendarEvent(doc);
        }

        // 生命周期
        // ------------------------------------------------------------

    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.fullCalendar = $(this.calendar).fullCalendar('getCalendar');
        }
    }, {
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                'div',
                { id: 'wiz-tomato-calendar' },
                _react2.default.createElement(_Calendar2.default, {
                    onEventClick: this.handleEventClick,
                    onViewRender: this.handleViewRender,
                    onEventDrop: this.handleEventDrop,
                    onEventResize: this.handleEventResize,
                    onEventRender: this.handleEventRender,
                    onSelect: this.handleDateSelect,
                    onCalendarRender: this.handleCalendarRender
                }),
                !!this.state.selectedRange && _react2.default.createElement(_EventCreateModal2.default, {
                    key: 'create' + this.state.selectedRange.jsEvent.pageX,
                    show: this.state.isCreatingEvent,
                    onModalClose: this.handleModalClose,
                    calendar: this.calendar,
                    isCreatingEvent: this.state.isCreatingEvent,
                    selectedRange: this.state.selectedRange,
                    onEventCreate: this.handleEventCreate
                }),
                !!this.state.editingEvent && _react2.default.createElement(_EventEditModal2.default, {
                    key: 'edit' + this.state.editingEvent.id,
                    show: this.state.isEditingEvent,
                    onModalClose: this.handleModalClose,
                    editingEvent: this.state.editingEvent
                    //
                    , onEventSave: this.handleEventSave,
                    onEventComplete: this.handleEventComplete,
                    onEventDeleteData: this.handleEventDeleteData,
                    onEventDeleteDoc: this.handleEventDeleteDoc,
                    onEventOpenDoc: this.handleEventOpenDoc,
                    onEventEditOriginData: this.handleEventEditOriginData
                }),
                !!this.state.isShowingEvent && _react2.default.createElement(_EventPopover2.default, {
                    key: 'popover' + this.state.clickedArgs.event.id,
                    event: this.state.clickedArgs.event,
                    reference: this.state.clickedArgs.jsEvent.target,
                    onPopoverHide: this.handlePopoverHide
                    //
                    , onEventSave: this.handleEventSave,
                    onEventComplete: this.handleEventComplete,
                    onEventEdit: this.handleEventEdit,
                    onEventDeleteData: this.handleEventDeleteData,
                    onEventDeleteDoc: this.handleEventDeleteDoc,
                    onEventOpenDoc: this.handleEventOpenDoc
                })
            );
        }
    }]);

    return App;
}(_react2.default.Component);

exports.default = App;
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");

var _react2 = _interopRequireDefault(_react);

var _FullCalendar = __webpack_require__(/*! ./FullCalendar */ "./src/components/Calendar/FullCalendar.js");

var _FullCalendar2 = _interopRequireDefault(_FullCalendar);

__webpack_require__(/*! fullcalendar-reactwrapper/dist/css/fullcalendar.min.css */ "./node_modules/_fullcalendar-reactwrapper@1.0.7@fullcalendar-reactwrapper/dist/css/fullcalendar.min.css");

__webpack_require__(/*! ./Calendar.css */ "./src/components/Calendar/Calendar.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calendar = function (_React$Component) {
    _inherits(Calendar, _React$Component);

    function Calendar(props) {
        _classCallCheck(this, Calendar);

        var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

        _this.state = {
            events: []
        };
        _this.calendar = null;
        //绑定句柄
        _this.handleFullCalendarRender = _this.handleFullCalendarRender.bind(_this);
        return _this;
    }

    // 事件句柄
    // ------------------------------------------------------------

    _createClass(Calendar, [{
        key: 'handleFullCalendarRender',
        value: function handleFullCalendarRender(el) {
            // FullCalendar 渲染之前执行此句柄，传入DOM
            this.calendar = el;
            this.props.onCalendarRender(el);
        }
    }, {
        key: 'render',
        value: function render() {
            /**
             * 设置事件句柄
             * 因为fullcalendar-reactWrapper的实现是直接返回<div id='fullcalendar'></div>
             * 并且调用$('#fullcalendar').fullcalendar(this.props)进行构建，因此React并没有
             * 管理FullCalendar状态和渲染的能力。所以直接在设置中做好callback，让插件自我管理。
             */
            return _react2.default.createElement(
                'div',
                { id: 'calendar-container' },
                _react2.default.createElement(_FullCalendar2.default, { onFullCalendarRender: this.handleFullCalendarRender
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
                    viewRender: this.props.onViewRender,
                    eventRender: this.props.onEventRender,
                    eventClick: this.props.onEventClick,
                    eventDrop: this.props.onEventDrop,
                    eventResize: this.props.onEventResize
                })
            );
        }
    }]);

    return Calendar;
}(_react2.default.Component);

exports.default = Calendar;

/***/ }),

/***/ "./src/components/Calendar/FullCalendar.js":
/*!*************************************************!*\
  !*** ./src/components/Calendar/FullCalendar.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");

var _react2 = _interopRequireDefault(_react);

var _jquery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

var _jquery2 = _interopRequireDefault(_jquery);

__webpack_require__(/*! fullcalendar */ "./node_modules/fullcalendar/dist/fullcalendar.js");

__webpack_require__(/*! moment */ "./node_modules/moment/moment.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FullcalendarObjectMapper = function () {
	function FullcalendarObjectMapper() {
		_classCallCheck(this, FullcalendarObjectMapper);
	}

	_createClass(FullcalendarObjectMapper, [{
		key: 'getSettings',
		value: function getSettings(properties) {
			var newSettings = {};
			for (var key in properties) {
				if (properties.hasOwnProperty(key)) {
					newSettings[key] = properties[key];
				}
			}
			return newSettings;
		}
	}]);

	return FullcalendarObjectMapper;
}();

var FullCalendar = function (_React$Component) {
	_inherits(FullCalendar, _React$Component);

	function FullCalendar() {
		_classCallCheck(this, FullCalendar);

		var _this = _possibleConstructorReturn(this, (FullCalendar.__proto__ || Object.getPrototypeOf(FullCalendar)).call(this));

		_this.jq = _jquery2.default.noConflict();
		_this.fullcalendarObjectMapper = new FullcalendarObjectMapper();
		_this.instance = null;
		_this.date = new Date();
		return _this;
	}

	_createClass(FullCalendar, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.props.onFullCalendarRender(this.el);
			var objectMapperSettings = this.fullcalendarObjectMapper.getSettings(this.props);
			this.instance = this.jq(this.el).fullCalendar(objectMapperSettings);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			return _react2.default.createElement('div', { id: 'calendar', ref: function ref(el) {
					return _this2.el = el;
				} });
		}
	}]);

	return FullCalendar;
}(_react2.default.Component);

exports.default = FullCalendar;

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");

var _react2 = _interopRequireDefault(_react);

__webpack_require__(/*! ./EventPopover.css */ "./src/components/EventPopover/EventPopover.css");

var _popper = __webpack_require__(/*! popper.js */ "./node_modules/popper.js/dist/esm/popper.js");

var _popper2 = _interopRequireDefault(_popper);

var _PopoverTitleInput = __webpack_require__(/*! ./PopoverTitleInput */ "./src/components/EventPopover/PopoverTitleInput.js");

var _PopoverTitleInput2 = _interopRequireDefault(_PopoverTitleInput);

var _PopoverToolbar = __webpack_require__(/*! ./PopoverToolbar */ "./src/components/EventPopover/PopoverToolbar.js");

var _PopoverToolbar2 = _interopRequireDefault(_PopoverToolbar);

var _reactBootstrap = __webpack_require__(/*! react-bootstrap */ "./node_modules/_react-bootstrap@0.32.1@react-bootstrap/es/index.js");

var _DateTimePickerGroup = __webpack_require__(/*! ../Form/DateTimePickerGroup */ "./src/components/Form/DateTimePickerGroup.js");

var _DateTimePickerGroup2 = _interopRequireDefault(_DateTimePickerGroup);

var _ColorPickerGroup = __webpack_require__(/*! ../Form/ColorPickerGroup */ "./src/components/Form/ColorPickerGroup.js");

var _ColorPickerGroup2 = _interopRequireDefault(_ColorPickerGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventPopover = function (_React$Component) {
    _inherits(EventPopover, _React$Component);

    function EventPopover(props) {
        _classCallCheck(this, EventPopover);

        var _this = _possibleConstructorReturn(this, (EventPopover.__proto__ || Object.getPrototypeOf(EventPopover)).call(this, props));

        _this.popperNode = null;
        _this.popperInstance = null;
        //
        _this.state = {
            newEventData: {}
            // 绑定事件
        };_this.autoHide = _this.autoHide.bind(_this);
        _this.handleDateTimeChange = _this.handleDateTimeChange.bind(_this);
        _this.handleTitleChange = _this.handleTitleChange.bind(_this);
        _this.handleColorChange = _this.handleColorChange.bind(_this);
        _this.handleBtnClick = _this.handleBtnClick.bind(_this);
        return _this;
    }

    // 动画效果
    // ------------------------------------------------------------

    _createClass(EventPopover, [{
        key: 'autoHide',
        value: function autoHide(e) {
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
    }, {
        key: 'hide',
        value: function hide() {
            var that = this;
            return new Promise(function (resolve, reject) {
                $(that.popperNode).hide(0, null, function () {
                    that.props.onPopoverHide(); //TODO: 交由父元素卸载该组件实例，感觉这里不妥
                    resolve();
                });
            });
        }
    }, {
        key: 'show',
        value: function show() {
            var that = this;
            return new Promise(function (resolve, reject) {
                $(that.popperNode).fadeIn(350, null, resolve);
            });
        }

        // 事件句柄
        // ------------------------------------------------------------

    }, {
        key: 'handleTitleChange',
        value: function handleTitleChange(e) {
            //储存到将新的值储存newEventData里，当保存时检索newEventData列表
            var newTitle = e.target.value;
            this.setState(function (prevState, props) {
                //拷贝前一个对象
                var newEventData = $.extend({}, prevState.newEventData);
                newEventData.title = newTitle;
                return { newEventData: newEventData };
            });
        }
    }, {
        key: 'handleColorChange',
        value: function handleColorChange(colorValue) {
            var newColor = colorValue;
            this.setState(function (prevState, props) {
                //拷贝前一个对象
                var newEventData = $.extend({}, prevState.newEventData);
                newEventData.backgroundColor = newColor;
                return { newEventData: newEventData };
            });
        }
    }, {
        key: 'handleDateTimeChange',
        value: function handleDateTimeChange(e) {
            //暂时不允许更改
        }
    }, {
        key: 'handleBtnClick',
        value: function handleBtnClick(e) {
            var _this2 = this;

            var id = e.target.id;
            var btnType = id.split('-')[2];
            var handleName = 'onEvent' + btnType;
            this.hide().then(function (ret) {
                _this2.props[handleName](_this2.props.event, _this2.state.newEventData);
            });
        }

        // 生命周期
        // ------------------------------------------------------------

    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            // 初始化组件
            this.popperInstance = new _popper2.default(this.props.reference, this.popperNode, {
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
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState, snapshot) {
            //
            this.show();
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            var _this3 = this;

            // 当更新属性时才触发动画效果
            if (nextProps != this.props) {
                // 设置更新时的动画
                this.hide().then(function (ret) {
                    //更新定位
                    _this3.popperInstance.reference = nextProps.reference;
                    _this3.popperInstance.update();
                });
                this.show();
            }

            //
            return true;
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            $(document).off('click', this.autoHide);
            this.popperInstance.destroy();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var eventStart = this.props.event.start.format('YYYY-MM-DD HH:mm:ss');
            var colorValue = this.props.event.backgroundColor;
            var enableSaveBtn = !!this.state.newEventData.title || !!this.state.newEventData.backgroundColor;
            return _react2.default.createElement(
                'div',
                { className: 'tc-popover',
                    style: { display: 'none' },
                    ref: function ref(div) {
                        return _this4.popperNode = div;
                    } },
                _react2.default.createElement('div', { className: 'arrow' }),
                _react2.default.createElement(
                    'div',
                    { className: 'tc-popover-header' },
                    _react2.default.createElement(_PopoverTitleInput2.default, {
                        key: 'title' + this.props.event.id,
                        eventTitle: this.props.event.title,
                        onTitleChange: this.handleTitleChange,
                        targetForm: 'tc-popover-event-editForm' })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'tc-popover-body' },
                    _react2.default.createElement(
                        _reactBootstrap.Form,
                        { horizontal: true, id: 'tc-popover-event-editForm' },
                        _react2.default.createElement(_DateTimePickerGroup2.default, { horizontal: true, readOnly: true,
                            controlId: 'tc-editpopper-eventdate',
                            label: _react2.default.createElement('i', { className: 'far fa-calendar-alt fa-lg' }),
                            value: eventStart,
                            onDateTimeChange: this.handleDateTimeChange
                        }),
                        _react2.default.createElement(_ColorPickerGroup2.default, { horizontal: true,
                            key: 'backgroundColor' + this.props.event.id,
                            controlId: 'tc-editpopper-eventcolor',
                            label: _react2.default.createElement('i', { className: 'fas fa-paint-brush fa-lg' }),
                            value: colorValue,
                            onColorChange: this.handleColorChange
                        })
                    ),
                    _react2.default.createElement(_PopoverToolbar2.default, {
                        complete: this.props.event.complete,
                        enableSaveBtn: enableSaveBtn,
                        onBtnClick: this.handleBtnClick
                    })
                )
            );
        }
    }]);

    return EventPopover;
}(_react2.default.Component);

exports.default = EventPopover;
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");

var _react2 = _interopRequireDefault(_react);

__webpack_require__(/*! ./PopoverTitleInput.css */ "./src/components/EventPopover/PopoverTitleInput.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventTitleInput = function (_React$Component) {
    _inherits(EventTitleInput, _React$Component);

    function EventTitleInput(props) {
        _classCallCheck(this, EventTitleInput);

        //初始化状态
        var _this = _possibleConstructorReturn(this, (EventTitleInput.__proto__ || Object.getPrototypeOf(EventTitleInput)).call(this, props));

        _this.state = {
            value: _this.props.eventTitle
            //
        };_this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }

    _createClass(EventTitleInput, [{
        key: 'handleChange',
        value: function handleChange(e) {
            //
            this.setState({ value: e.target.value });
            //将事件传递上去
            this.props.onTitleChange(e);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement('input', { type: 'text', id: 'tc-editpopper-eventtitle',
                htmlFor: this.props.targetForm,
                className: 'eventtitle',
                value: this.state.value,
                onChange: this.handleChange
            });
        }
    }]);

    return EventTitleInput;
}(_react2.default.Component);

exports.default = EventTitleInput;

/***/ }),

/***/ "./src/components/EventPopover/PopoverToolbar.js":
/*!*******************************************************!*\
  !*** ./src/components/EventPopover/PopoverToolbar.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(/*! react-dom */ "./node_modules/_react-dom@16.4.1@react-dom/index.js");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactBootstrap = __webpack_require__(/*! react-bootstrap */ "./node_modules/_react-bootstrap@0.32.1@react-bootstrap/es/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PopoverToolbar = function (_React$Component) {
    _inherits(PopoverToolbar, _React$Component);

    function PopoverToolbar() {
        _classCallCheck(this, PopoverToolbar);

        return _possibleConstructorReturn(this, (PopoverToolbar.__proto__ || Object.getPrototypeOf(PopoverToolbar)).apply(this, arguments));
    }

    _createClass(PopoverToolbar, [{
        key: 'render',
        value: function render() {
            //
            return _react2.default.createElement(
                _reactBootstrap.ButtonToolbar,
                null,
                _react2.default.createElement(
                    _reactBootstrap.ButtonGroup,
                    null,
                    _react2.default.createElement(
                        _reactBootstrap.Button,
                        { id: 'tc-editpopper-Save',
                            onClick: this.props.onBtnClick,
                            disabled: !this.props.enableSaveBtn },
                        '\u4FDD\u5B58'
                    ),
                    _react2.default.createElement(
                        _reactBootstrap.Button,
                        { id: 'tc-editpopper-Complete',
                            onClick: this.props.onBtnClick },
                        parseInt(this.props.complete) == 5 ? '恢复' : '完成'
                    ),
                    _react2.default.createElement(
                        _reactBootstrap.Button,
                        { id: 'tc-editpopper-Edit',
                            onClick: this.props.onBtnClick },
                        '\u7F16\u8F91'
                    ),
                    _react2.default.createElement(
                        _reactBootstrap.Button,
                        { id: 'tc-editpopper-DeleteData',
                            onClick: this.props.onBtnClick },
                        '\u5220\u9664'
                    ),
                    _react2.default.createElement(
                        _reactBootstrap.Dropdown,
                        { id: 'tc-editpopper-extra', pullRight: true },
                        _react2.default.createElement(_reactBootstrap.Dropdown.Toggle, null),
                        _react2.default.createElement(
                            _reactBootstrap.Dropdown.Menu,
                            null,
                            _react2.default.createElement(
                                _reactBootstrap.MenuItem,
                                {
                                    eventKey: '1',
                                    id: 'tc-editpopper-OpenDoc',
                                    onClick: this.props.onBtnClick },
                                '\u6253\u5F00\u6E90\u6587\u6863'
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.MenuItem,
                                {
                                    eventKey: '2',
                                    id: 'tc-editpopper-DeleteDoc',
                                    onClick: this.props.onBtnClick },
                                '\u5220\u9664\u6E90\u6587\u6863'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return PopoverToolbar;
}(_react2.default.Component);

exports.default = PopoverToolbar;

/***/ }),

/***/ "./src/components/Form/AutoFormGroup.js":
/*!**********************************************!*\
  !*** ./src/components/Form/AutoFormGroup.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(/*! react-bootstrap */ "./node_modules/_react-bootstrap@0.32.1@react-bootstrap/es/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AutoFormGroup = function (_React$Component) {
    _inherits(AutoFormGroup, _React$Component);

    function AutoFormGroup() {
        _classCallCheck(this, AutoFormGroup);

        return _possibleConstructorReturn(this, (AutoFormGroup.__proto__ || Object.getPrototypeOf(AutoFormGroup)).apply(this, arguments));
    }

    _createClass(AutoFormGroup, [{
        key: 'render',
        value: function render() {
            var isHorizontal = this.props.horizontal;
            if (isHorizontal) {
                return _react2.default.createElement(
                    _reactBootstrap.FormGroup,
                    { controlId: this.props.controlId },
                    _react2.default.createElement(
                        _reactBootstrap.Col,
                        { componentClass: _reactBootstrap.ControlLabel, sm: 2 },
                        this.props.label
                    ),
                    _react2.default.createElement(
                        _reactBootstrap.Col,
                        { sm: 10 },
                        this.props.children
                    )
                );
            } else {
                return _react2.default.createElement(
                    _reactBootstrap.FormGroup,
                    { controlId: this.props.controlId },
                    _react2.default.createElement(
                        _reactBootstrap.ControlLabel,
                        null,
                        this.props.label
                    ),
                    this.props.children
                );
            }
        }
    }]);

    return AutoFormGroup;
}(_react2.default.Component);

exports.default = AutoFormGroup;

/***/ }),

/***/ "./src/components/Form/ColorPickerGroup.js":
/*!*************************************************!*\
  !*** ./src/components/Form/ColorPickerGroup.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");

var _react2 = _interopRequireDefault(_react);

var _AutoFormGroup = __webpack_require__(/*! ./AutoFormGroup */ "./src/components/Form/AutoFormGroup.js");

var _AutoFormGroup2 = _interopRequireDefault(_AutoFormGroup);

__webpack_require__(/*! huebee/dist/huebee.css */ "./node_modules/huebee/dist/huebee.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Huebee = __webpack_require__(/*! huebee/dist/huebee.pkgd */ "./node_modules/huebee/dist/huebee.pkgd.js");

var ColorInput = function (_React$Component) {
    _inherits(ColorInput, _React$Component);

    function ColorInput(props) {
        _classCallCheck(this, ColorInput);

        var _this = _possibleConstructorReturn(this, (ColorInput.__proto__ || Object.getPrototypeOf(ColorInput)).call(this, props));

        _this.state = {
            value: _this.props.value
        };
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }

    _createClass(ColorInput, [{
        key: 'handleChange',
        value: function handleChange(jsEventOrValue) {
            var newColorValue = void 0;
            if ((typeof jsEventOrValue === 'undefined' ? 'undefined' : _typeof(jsEventOrValue)) == 'object') {
                this.setState({ value: jsEventOrValue.target.value });
                newColorValue = jsEventOrValue.target.value;
            } else if (typeof jsEventOrValue == 'string') {
                this.setState({ value: jsEventOrValue });
                newColorValue = jsEventOrValue;
            }
            this.props.onColorChange(newColorValue);
        }

        //TODO: 根据饱和度计算字体颜色

    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
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
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            // 手动更新value
            this.huebeeInstance.setColor(this.state.value);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            //注意，huebee没有destroy的方法
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement('input', { type: 'text',
                className: 'form-control',
                ref: function ref(el) {
                    return _this2.el = el;
                },
                onChange: this.handleChange //监听键盘输入
            });
        }
    }]);

    return ColorInput;
}(_react2.default.Component);

var ColorPickerGroup = function (_React$Component2) {
    _inherits(ColorPickerGroup, _React$Component2);

    function ColorPickerGroup(props) {
        _classCallCheck(this, ColorPickerGroup);

        var _this3 = _possibleConstructorReturn(this, (ColorPickerGroup.__proto__ || Object.getPrototypeOf(ColorPickerGroup)).call(this, props));

        _this3.handleChange = _this3.handleChange.bind(_this3);
        return _this3;
    }

    _createClass(ColorPickerGroup, [{
        key: 'handleChange',
        value: function handleChange(colorValue) {
            //向上传递
            this.props.onColorChange(colorValue);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                horizontal = _props.horizontal,
                controlId = _props.controlId,
                label = _props.label;

            return _react2.default.createElement(
                _AutoFormGroup2.default,
                { horizontal: horizontal, controlId: controlId, label: label },
                _react2.default.createElement(ColorInput, this.props)
            );
        }
    }]);

    return ColorPickerGroup;
}(_react2.default.Component);

exports.default = ColorPickerGroup;

/***/ }),

/***/ "./src/components/Form/DateTimePickerGroup.js":
/*!****************************************************!*\
  !*** ./src/components/Form/DateTimePickerGroup.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(/*! react-dom */ "./node_modules/_react-dom@16.4.1@react-dom/index.js");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactBootstrap = __webpack_require__(/*! react-bootstrap */ "./node_modules/_react-bootstrap@0.32.1@react-bootstrap/es/index.js");

var _AutoFormGroup = __webpack_require__(/*! ./AutoFormGroup */ "./src/components/Form/AutoFormGroup.js");

var _AutoFormGroup2 = _interopRequireDefault(_AutoFormGroup);

__webpack_require__(/*! moment */ "./node_modules/moment/moment.js");

__webpack_require__(/*! bootstrap/js/collapse */ "./node_modules/bootstrap/js/collapse.js");

__webpack_require__(/*! bootstrap/js/transition */ "./node_modules/bootstrap/js/transition.js");

__webpack_require__(/*! eonasdan-bootstrap-datetimepicker */ "./node_modules/eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js");

__webpack_require__(/*! eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css */ "./node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateTimeInput = function (_React$Component) {
    _inherits(DateTimeInput, _React$Component);

    function DateTimeInput(props) {
        _classCallCheck(this, DateTimeInput);

        var _this = _possibleConstructorReturn(this, (DateTimeInput.__proto__ || Object.getPrototypeOf(DateTimeInput)).call(this, props));

        _this.state = {
            value: _this.props.value
        };
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }

    _createClass(DateTimeInput, [{
        key: 'handleChange',
        value: function handleChange(e) {
            var newDateValue = e.date.format('YYYY-MM-DD HH:mm:ss');
            this.setState({ value: newDateValue });
            // 传递
            this.props.onDateTimeChange(newDateValue);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
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
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            // 手动更新value
            this.instance.date(this.state.value);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            // destroy
            this.instance.destroy();
            this.$el.off("dp.change", this.handleChange);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement('input', { type: 'text',
                className: 'form-control',
                ref: function ref(el) {
                    return _this2.el = el;
                }
            });
        }
    }]);

    return DateTimeInput;
}(_react2.default.Component);

var DateTimePickerGroup = function (_React$Component2) {
    _inherits(DateTimePickerGroup, _React$Component2);

    function DateTimePickerGroup(props) {
        _classCallCheck(this, DateTimePickerGroup);

        return _possibleConstructorReturn(this, (DateTimePickerGroup.__proto__ || Object.getPrototypeOf(DateTimePickerGroup)).call(this, props));
    }

    _createClass(DateTimePickerGroup, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                horizontal = _props.horizontal,
                controlId = _props.controlId,
                label = _props.label;

            return _react2.default.createElement(
                _AutoFormGroup2.default,
                { horizontal: horizontal, controlId: controlId, label: label },
                _react2.default.createElement(DateTimeInput, this.props)
            );
        }
    }]);

    return DateTimePickerGroup;
}(_react2.default.Component);

exports.default = DateTimePickerGroup;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/components/Form/EventDetailForm.js":
/*!************************************************!*\
  !*** ./src/components/Form/EventDetailForm.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = EventDetailForm;

var _react = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(/*! react-bootstrap */ "./node_modules/_react-bootstrap@0.32.1@react-bootstrap/es/index.js");

var _TitleInputGroup = __webpack_require__(/*! ./TitleInputGroup */ "./src/components/Form/TitleInputGroup.js");

var _TitleInputGroup2 = _interopRequireDefault(_TitleInputGroup);

var _DateTimePickerGroup = __webpack_require__(/*! ./DateTimePickerGroup */ "./src/components/Form/DateTimePickerGroup.js");

var _DateTimePickerGroup2 = _interopRequireDefault(_DateTimePickerGroup);

var _ColorPickerGroup = __webpack_require__(/*! ./ColorPickerGroup */ "./src/components/Form/ColorPickerGroup.js");

var _ColorPickerGroup2 = _interopRequireDefault(_ColorPickerGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function EventDetailForm(props) {

    var handleTitleChange = props.onTitleChange;
    var handleStartChange = props.onStartChange;
    var handleEndChange = props.onEndChange;
    var handleColorChange = props.onColorchange;

    return _react2.default.createElement(
        _reactBootstrap.Form,
        null,
        _react2.default.createElement(_TitleInputGroup2.default, {
            autoFocus: true,
            controlId: 'tc-createpage-eventtitle',
            label: '\u6807\u9898',
            value: props.eventTitle,
            onTitleChange: handleTitleChange
        }),
        _react2.default.createElement(
            _reactBootstrap.Row,
            null,
            _react2.default.createElement(
                _reactBootstrap.Col,
                { sm: 6 },
                _react2.default.createElement(_DateTimePickerGroup2.default, {
                    controlId: 'tc-createpage-eventstart',
                    label: '\u5F00\u59CB\u65E5\u671F',
                    value: props.start,
                    onDateTimeChange: handleStartChange })
            ),
            _react2.default.createElement(
                _reactBootstrap.Col,
                { sm: 6 },
                _react2.default.createElement(_DateTimePickerGroup2.default, {
                    controlId: 'tc-createpage-eventend',
                    label: '\u7ED3\u675F\u65E5\u671F',
                    value: props.end,
                    onDateTimeChange: handleEndChange })
            )
        ),
        _react2.default.createElement(
            _reactBootstrap.Row,
            null,
            _react2.default.createElement(
                _reactBootstrap.Col,
                { sm: 6 },
                _react2.default.createElement(_ColorPickerGroup2.default, {
                    controlId: 'tc-createpage-eventcolor',
                    label: '\u8272\u5F69',
                    value: props.backgroundColor,
                    onColorChange: handleColorChange
                })
            ),
            _react2.default.createElement(
                _reactBootstrap.Col,
                { sm: 6 },
                _react2.default.createElement(
                    _reactBootstrap.FormGroup,
                    { controlId: 'tc-createpage-eventtags' },
                    _react2.default.createElement(
                        _reactBootstrap.ControlLabel,
                        null,
                        '\u6807\u7B7E'
                    ),
                    _react2.default.createElement(_reactBootstrap.FormControl, { readOnly: true })
                )
            )
        ),
        _react2.default.createElement(
            _reactBootstrap.FormGroup,
            { controlId: 'tc-createpage-eventremark' },
            _react2.default.createElement(
                _reactBootstrap.ControlLabel,
                null,
                '\u5907\u6CE8'
            ),
            _react2.default.createElement(_reactBootstrap.FormControl, { readOnly: true, componentClass: 'textarea' })
        )
    );
}

/*
export default class EventDetailForm extends React.Component {

    constructor(props) {
        super(props);
        //由父组件负责处理数据
    }

    render() {
        const handleTitleChange = this.props.onTitleChange;
        const handleStartChange = this.props.onStartChange;
        const handleEndChange = this.props.onEndChange;
        const handleColorChange = this.props.onColorchange;
        return (
            <Form>
                <TitleInputGroup 
                    autoFocus
                    controlId="tc-createpage-eventtitle"
                    label="标题"
                    value={this.props.eventTitle} 
                    onTitleChange={handleTitleChange}
                />
                <Row>
                    <Col sm={6}>
                        <DateTimePickerGroup 
                            controlId="tc-createpage-eventstart"
                            label="开始日期"
                            value={this.props.start}
                            onDateTimeChange={handleStartChange}  />
                    </Col>
                    <Col sm={6}>
                        <DateTimePickerGroup 
                            controlId="tc-createpage-eventend"
                            label="结束日期"
                            value={this.props.end}
                            onDateTimeChange={handleEndChange}  />
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <ColorPickerGroup 
                            controlId="tc-createpage-eventcolor"
                            label="色彩"
                            value={this.props.backgroundColor}
                            onColorChange={handleColorChange}
                        />
                    </Col>
                    <Col sm={6}>
                        <FormGroup controlId="tc-createpage-eventtags">
                            <ControlLabel>标签</ControlLabel>
                            <FormControl readOnly/>
                        </FormGroup>     
                    </Col>
                </Row>
                <FormGroup controlId="tc-createpage-eventremark">
                    <ControlLabel>备注</ControlLabel>
                    <FormControl readOnly componentClass="textarea" />
                </FormGroup>
            </Form>
        )
    }

}
*/

/***/ }),

/***/ "./src/components/Form/EventRepeatForm.js":
/*!************************************************!*\
  !*** ./src/components/Form/EventRepeatForm.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = EventRepeatForm;

var _react = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(/*! react-bootstrap */ "./node_modules/_react-bootstrap@0.32.1@react-bootstrap/es/index.js");

var _SelectPickerGroup = __webpack_require__(/*! ./SelectPickerGroup */ "./src/components/Form/SelectPickerGroup.js");

var _SelectPickerGroup2 = _interopRequireDefault(_SelectPickerGroup);

var _WeekCheckboxGroup = __webpack_require__(/*! ./WeekCheckboxGroup */ "./src/components/Form/WeekCheckboxGroup.js");

var _WeekCheckboxGroup2 = _interopRequireDefault(_WeekCheckboxGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function EventRepeatForm(props) {

    return _react2.default.createElement(
        _reactBootstrap.Form,
        { horizontal: true },
        _react2.default.createElement(
            _SelectPickerGroup2.default,
            { horizontal: true,
                controlId: 'tc-rptRule',
                label: '\u91CD\u590D\u89C4\u5219',
                value: props.rptBaseRule,
                onSelectionChange: props.onRptBaseRuleChange
            },
            _react2.default.createElement(
                'option',
                { value: 'none' },
                '\u4E0D\u91CD\u590D'
            ),
            _react2.default.createElement(
                'optgroup',
                { label: '\u7B80\u5355\u89C4\u5219' },
                _react2.default.createElement(
                    'option',
                    { value: 'Daily' },
                    '\u6BCF\u65E5'
                ),
                _react2.default.createElement(
                    'option',
                    { value: 'Weekly' },
                    '\u6BCF\u5468'
                ),
                _react2.default.createElement(
                    'option',
                    { value: 'Monthly' },
                    '\u6BCF\u6708'
                ),
                _react2.default.createElement(
                    'option',
                    { value: 'Yearly' },
                    '\u6BCF\u5E74'
                )
            ),
            _react2.default.createElement(
                'optgroup',
                { label: '\u590D\u5408\u89C4\u5219' },
                _react2.default.createElement(
                    'option',
                    { value: 'EveryWeek' },
                    '\u6BCF\u4E00\u4E2A\u661F\u671F\u51E0'
                ),
                _react2.default.createElement(
                    'option',
                    { value: 'Every2Week' },
                    '\u6BCF\u4E24\u4E2A\u661F\u671F\u51E0'
                ),
                _react2.default.createElement(
                    'option',
                    { value: 'EveryWeekday' },
                    '\u6BCF\u4E2A\u5DE5\u4F5C\u65E5'
                )
            )
        ),
        _react2.default.createElement(_WeekCheckboxGroup2.default, { horizontal: true,
            label: '\u91CD\u590D\u661F\u671F',
            value: '135'
        })
    );
}

/***/ }),

/***/ "./src/components/Form/SelectPickerGroup.js":
/*!**************************************************!*\
  !*** ./src/components/Form/SelectPickerGroup.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = SelectPickerGroup;

var _react = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(/*! react-bootstrap */ "./node_modules/_react-bootstrap@0.32.1@react-bootstrap/es/index.js");

var _AutoFormGroup = __webpack_require__(/*! ./AutoFormGroup */ "./src/components/Form/AutoFormGroup.js");

var _AutoFormGroup2 = _interopRequireDefault(_AutoFormGroup);

__webpack_require__(/*! bootstrap/js/dropdown */ "./node_modules/bootstrap/js/dropdown.js");

__webpack_require__(/*! bootstrap-select */ "./node_modules/bootstrap-select/dist/js/bootstrap-select.js");

__webpack_require__(/*! bootstrap-select/dist/css/bootstrap-select.css */ "./node_modules/bootstrap-select/dist/css/bootstrap-select.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectPicker = function (_React$Component) {
    _inherits(SelectPicker, _React$Component);

    function SelectPicker(props) {
        _classCallCheck(this, SelectPicker);

        var _this = _possibleConstructorReturn(this, (SelectPicker.__proto__ || Object.getPrototypeOf(SelectPicker)).call(this, props));

        _this.state = {
            value: _this.props.value
        };
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }

    _createClass(SelectPicker, [{
        key: 'handleChange',
        value: function handleChange(e, clickedIndex, newValue, oldValue) {
            var newSelection = this.$el.find('option').eq(clickedIndex).val();
            this.setState({ value: newSelection });
            // 传递
            this.props.onSelectionChange(newSelection);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            // 初始化组件
            this.$el = $(this.el).selectpicker({
                style: 'btn-default'
            });
            //
            this.instance = this.$el.data('selectpicker');
            // 初始化值
            this.instance.val(this.props.value);
            // 绑定change事件
            this.$el.on("changed.bs.select", this.handleChange);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            // 手动更新value
            // 插件能自动更新
            //this.instance.val(this.state.value);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            // destroy
            this.instance.destroy();
            this.$el.off("changed.bs.select", this.handleChange);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'select',
                    { ref: function ref(el) {
                            return _this2.el = el;
                        } },
                    this.props.children
                )
            );
        }
    }]);

    return SelectPicker;
}(_react2.default.Component);

function SelectPickerGroup(props) {
    var horizontal = props.horizontal,
        controlId = props.controlId,
        label = props.label;

    return _react2.default.createElement(
        _AutoFormGroup2.default,
        { horizontal: horizontal, controlId: controlId, label: label },
        _react2.default.createElement(
            SelectPicker,
            props,
            props.children
        )
    );
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/components/Form/TitleInputGroup.js":
/*!************************************************!*\
  !*** ./src/components/Form/TitleInputGroup.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(/*! react-bootstrap */ "./node_modules/_react-bootstrap@0.32.1@react-bootstrap/es/index.js");

var _AutoFormGroup = __webpack_require__(/*! ./AutoFormGroup */ "./src/components/Form/AutoFormGroup.js");

var _AutoFormGroup2 = _interopRequireDefault(_AutoFormGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TitleInputGroup = function (_React$Component) {
    _inherits(TitleInputGroup, _React$Component);

    function TitleInputGroup(props) {
        _classCallCheck(this, TitleInputGroup);

        //
        var _this = _possibleConstructorReturn(this, (TitleInputGroup.__proto__ || Object.getPrototypeOf(TitleInputGroup)).call(this, props));

        _this.state = {
            value: _this.props.value
            //
        };_this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }

    _createClass(TitleInputGroup, [{
        key: 'handleChange',
        value: function handleChange(e) {
            var newTitle = e.target.value;
            this.setState({
                value: newTitle
            });
            this.props.onTitleChange(newTitle);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                horizontal = _props.horizontal,
                controlId = _props.controlId,
                label = _props.label;

            return _react2.default.createElement(
                _AutoFormGroup2.default,
                { horizontal: horizontal, controlId: controlId, label: label },
                _react2.default.createElement(_reactBootstrap.FormControl, {
                    autoFocus: this.props.autoFocus,
                    type: 'text',
                    value: this.state.value,
                    placeholder: '\u8BF7\u8F93\u5165\u6807\u9898',
                    onChange: this.handleChange
                })
            );
        }
    }]);

    return TitleInputGroup;
}(_react2.default.Component);

exports.default = TitleInputGroup;

/***/ }),

/***/ "./src/components/Form/WeekCheckboxGroup.js":
/*!**************************************************!*\
  !*** ./src/components/Form/WeekCheckboxGroup.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = WeekCheckboxGroup;

var _react = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");

var _react2 = _interopRequireDefault(_react);

var _AutoFormGroup = __webpack_require__(/*! ./AutoFormGroup */ "./src/components/Form/AutoFormGroup.js");

var _AutoFormGroup2 = _interopRequireDefault(_AutoFormGroup);

__webpack_require__(/*! awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css */ "./node_modules/_awesome-bootstrap-checkbox@0.3.7@awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WeekCheckboxBar = function (_React$Component) {
    _inherits(WeekCheckboxBar, _React$Component);

    function WeekCheckboxBar(props) {
        _classCallCheck(this, WeekCheckboxBar);

        var _this = _possibleConstructorReturn(this, (WeekCheckboxBar.__proto__ || Object.getPrototypeOf(WeekCheckboxBar)).call(this, props));

        _this.state = {
            value: _this.props.value,
            weekDay: []
        };
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleCheckboxClick = _this.handleCheckboxClick.bind(_this);
        return _this;
    }

    _createClass(WeekCheckboxBar, [{
        key: 'handleChange',
        value: function handleChange(e) {
            console.log(this.state);
        }
    }, {
        key: 'handleCheckboxClick',
        value: function handleCheckboxClick(e) {
            var checkbox = e.target;
            this.setState(function (prevState) {
                var weekDay = prevState.weekDay;
                weekDay.push(checkbox.value);
                return { weekDay: weekDay };
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            /*
            // 初始化组件
            this.$el = $(this.el).selectpicker({
                style: 'btn-default'
            });
            //
            this.instance = this.$el.data('selectpicker');
            // 初始化值
            this.instance.val(this.props.value)
            // 绑定change事件
            this.$el.on("changed.bs.select", this.handleChange);
            */
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'checkbox checkbox-inline checkbox-success' },
                    _react2.default.createElement('input', { type: 'checkbox', id: 'checkbox1', value: '1',
                        className: 'styled',
                        onClick: this.handleCheckboxClick,
                        onChange: this.handleChange
                    }),
                    _react2.default.createElement(
                        'label',
                        { htmlFor: 'checkbox1' },
                        ' \u4E00'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'checkbox checkbox-inline' },
                    _react2.default.createElement('input', { type: 'checkbox', id: 'checkbox2', value: '2',
                        onClick: this.handleCheckboxClick,
                        onChange: this.handleChange
                    }),
                    _react2.default.createElement(
                        'label',
                        { htmlFor: 'checkbox2' },
                        ' \u4E8C'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'checkbox checkbox-inline' },
                    _react2.default.createElement('input', { type: 'checkbox', id: 'checkbox3', value: '3',
                        onClick: this.handleCheckboxClick,
                        onChange: this.handleChange
                    }),
                    _react2.default.createElement(
                        'label',
                        { htmlFor: 'checkbox3' },
                        ' \u4E09'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'checkbox checkbox-inline' },
                    _react2.default.createElement('input', { type: 'checkbox', id: 'checkbox4', value: '4',
                        onClick: this.handleCheckboxClick,
                        onChange: this.handleChange
                    }),
                    _react2.default.createElement(
                        'label',
                        { htmlFor: 'checkbox4' },
                        ' \u56DB'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'checkbox checkbox-inline' },
                    _react2.default.createElement('input', { type: 'checkbox', id: 'checkbox5', value: '5',
                        onClick: this.handleCheckboxClick,
                        onChange: this.handleChange
                    }),
                    _react2.default.createElement(
                        'label',
                        { htmlFor: 'checkbox5' },
                        ' \u4E94'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'checkbox checkbox-inline' },
                    _react2.default.createElement('input', { type: 'checkbox', id: 'checkbox6', value: '6',
                        onClick: this.handleCheckboxClick,
                        onChange: this.handleChange
                    }),
                    _react2.default.createElement(
                        'label',
                        { htmlFor: 'checkbox6' },
                        ' \u516D'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'checkbox checkbox-inline' },
                    _react2.default.createElement('input', { type: 'checkbox', id: 'checkbox7', value: '7',
                        onClick: this.handleCheckboxClick,
                        onChange: this.handleChange
                    }),
                    _react2.default.createElement(
                        'label',
                        { htmlFor: 'checkbox7' },
                        ' \u65E5'
                    )
                )
            );
        }
    }]);

    return WeekCheckboxBar;
}(_react2.default.Component);

function WeekCheckboxGroup(props) {
    var horizontal = props.horizontal,
        controlId = props.controlId,
        label = props.label;

    return _react2.default.createElement(
        _AutoFormGroup2.default,
        { horizontal: horizontal, controlId: controlId, label: label },
        _react2.default.createElement(WeekCheckboxBar, props)
    );
}

/***/ }),

/***/ "./src/components/Modal/EventCreateModal.js":
/*!**************************************************!*\
  !*** ./src/components/Modal/EventCreateModal.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(/*! react-bootstrap */ "./node_modules/_react-bootstrap@0.32.1@react-bootstrap/es/index.js");

var _EventDetailForm = __webpack_require__(/*! ../Form/EventDetailForm */ "./src/components/Form/EventDetailForm.js");

var _EventDetailForm2 = _interopRequireDefault(_EventDetailForm);

var _EventRepeatForm = __webpack_require__(/*! ../Form/EventRepeatForm */ "./src/components/Form/EventRepeatForm.js");

var _EventRepeatForm2 = _interopRequireDefault(_EventRepeatForm);

var _EventModal = __webpack_require__(/*! ./EventModal */ "./src/components/Modal/EventModal.js");

var _EventModal2 = _interopRequireDefault(_EventModal);

var _moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventCreateModal = function (_React$Component) {
    _inherits(EventCreateModal, _React$Component);

    function EventCreateModal(props) {
        _classCallCheck(this, EventCreateModal);

        //
        var _this = _possibleConstructorReturn(this, (EventCreateModal.__proto__ || Object.getPrototypeOf(EventCreateModal)).call(this, props));

        _this.state = {
            title: '',
            start: _this.props.selectedRange.start.format('YYYY-MM-DD HH:mm:ss'),
            end: _this.props.selectedRange.end.format('YYYY-MM-DD HH:mm:ss'),
            backgroundColor: ''
            //
        };_this.handleTitleChange = _this.handleTitleChange.bind(_this);
        _this.handleStartChange = _this.handleStartChange.bind(_this);
        _this.handleEndChange = _this.handleEndChange.bind(_this);
        _this.handleColorChange = _this.handleColorChange.bind(_this);
        _this.handleEventCreate = _this.handleEventCreate.bind(_this);
        //
        _this.handleRptBaseRuleChange = _this.handleRptBaseRuleChange.bind(_this);
        return _this;
    }

    _createClass(EventCreateModal, [{
        key: 'handleTitleChange',
        value: function handleTitleChange(newTitle) {
            this.setState({
                title: newTitle
            });
        }
    }, {
        key: 'handleStartChange',
        value: function handleStartChange(newDateValue) {
            this.setState({
                start: newDateValue
            });
        }
    }, {
        key: 'handleEndChange',
        value: function handleEndChange(newDateValue) {
            this.setState({
                end: newDateValue
            });
        }
    }, {
        key: 'handleColorChange',
        value: function handleColorChange(newColorValue) {
            this.setState({
                backgroundColor: newColorValue
            });
        }
    }, {
        key: 'handleRptBaseRuleChange',
        value: function handleRptBaseRuleChange(newRptBaseRule) {
            console.log(newRptBaseRule);
        }
    }, {
        key: 'handleEventCreate',
        value: function handleEventCreate() {
            // 打包数据
            var eventData = $.extend({}, this.state);
            this.props.onEventCreate(eventData);
            //
            this.props.onModalClose();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                show = _props.show,
                onModalClose = _props.onModalClose;

            return _react2.default.createElement(
                _EventModal2.default,
                { show: show, onModalClose: onModalClose },
                _react2.default.createElement(
                    _EventModal2.default.NavHeader,
                    { onModalClose: onModalClose },
                    _react2.default.createElement(
                        _reactBootstrap.NavItem,
                        { eventKey: '1' },
                        '\u65E5\u7A0B\u7F16\u8F91'
                    ),
                    _react2.default.createElement(
                        _reactBootstrap.NavItem,
                        { eventKey: '2' },
                        '\u91CD\u590D\u89C4\u5219'
                    )
                ),
                _react2.default.createElement(
                    _EventModal2.default.TabBody,
                    null,
                    _react2.default.createElement(
                        _reactBootstrap.Tab.Pane,
                        { eventKey: '1' },
                        _react2.default.createElement(_EventDetailForm2.default, {
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
                    _react2.default.createElement(
                        _reactBootstrap.Tab.Pane,
                        { eventKey: '2' },
                        _react2.default.createElement(_EventRepeatForm2.default, {
                            rptBaseRule: 'Weekly',
                            onRptBaseRuleChange: this.handleRptBaseRuleChange
                        })
                    )
                ),
                _react2.default.createElement(
                    _EventModal2.default.ToolbarFooter,
                    null,
                    _react2.default.createElement(
                        _reactBootstrap.Button,
                        {
                            bsStyle: 'success',
                            onClick: this.handleEventCreate
                        },
                        '\u521B\u5EFA'
                    ),
                    _react2.default.createElement(
                        _reactBootstrap.Button,
                        { onClick: this.props.onModalClose },
                        '\u53D6\u6D88'
                    )
                )
            );
        }
    }]);

    return EventCreateModal;
}(_react2.default.Component);

exports.default = EventCreateModal;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/components/Modal/EventEditModal.js":
/*!************************************************!*\
  !*** ./src/components/Modal/EventEditModal.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(/*! react-bootstrap */ "./node_modules/_react-bootstrap@0.32.1@react-bootstrap/es/index.js");

var _EventDetailForm = __webpack_require__(/*! ../Form/EventDetailForm */ "./src/components/Form/EventDetailForm.js");

var _EventDetailForm2 = _interopRequireDefault(_EventDetailForm);

var _EventRepeatForm = __webpack_require__(/*! ../Form/EventRepeatForm */ "./src/components/Form/EventRepeatForm.js");

var _EventRepeatForm2 = _interopRequireDefault(_EventRepeatForm);

var _EventModal = __webpack_require__(/*! ./EventModal */ "./src/components/Modal/EventModal.js");

var _EventModal2 = _interopRequireDefault(_EventModal);

var _moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModalToolbar = function (_React$Component) {
    _inherits(ModalToolbar, _React$Component);

    function ModalToolbar() {
        _classCallCheck(this, ModalToolbar);

        return _possibleConstructorReturn(this, (ModalToolbar.__proto__ || Object.getPrototypeOf(ModalToolbar)).apply(this, arguments));
    }

    _createClass(ModalToolbar, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _reactBootstrap.Row,
                null,
                _react2.default.createElement(
                    _reactBootstrap.Col,
                    { sm: 7, style: { textAlign: 'left' } },
                    _react2.default.createElement(
                        _reactBootstrap.ButtonGroup,
                        null,
                        _react2.default.createElement(
                            _reactBootstrap.Button,
                            { id: 'tc-editpage-Save',
                                bsStyle: 'danger',
                                onClick: this.props.onBtnClick,
                                disabled: !this.props.enableSaveBtn },
                            '\u4FDD\u5B58'
                        ),
                        _react2.default.createElement(
                            _reactBootstrap.Button,
                            { id: 'tc-editpage-Complete',
                                onClick: this.props.onBtnClick },
                            parseInt(this.props.complete) == 5 ? '恢复' : '完成'
                        ),
                        _react2.default.createElement(
                            _reactBootstrap.Button,
                            {
                                id: 'tc-editpage-DeleteData',
                                onClick: this.props.onBtnClick },
                            '\u5220\u9664'
                        ),
                        _react2.default.createElement(
                            _reactBootstrap.Button,
                            {
                                id: 'tc-editpage-DeleteDoc',
                                onClick: this.props.onBtnClick },
                            '\u5220\u9664\u6E90\u6587\u6863'
                        ),
                        _react2.default.createElement(
                            _reactBootstrap.Dropdown,
                            { id: 'tc-editpage-extra', pullRight: true },
                            _react2.default.createElement(_reactBootstrap.Dropdown.Toggle, null),
                            _react2.default.createElement(
                                _reactBootstrap.Dropdown.Menu,
                                null,
                                _react2.default.createElement(
                                    _reactBootstrap.MenuItem,
                                    {
                                        eventKey: '1',
                                        id: 'tc-editpage-OpenDoc',
                                        onClick: this.props.onBtnClick },
                                    '\u6253\u5F00\u6E90\u6587\u6863'
                                ),
                                _react2.default.createElement(
                                    _reactBootstrap.MenuItem,
                                    {
                                        eventKey: '2',
                                        id: 'tc-editpage-EditOriginData',
                                        onClick: this.props.onBtnClick },
                                    '\u7F16\u8F91\u6E90\u6570\u636E'
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    _reactBootstrap.Col,
                    { sm: 2, smOffset: 3 },
                    _react2.default.createElement(
                        _reactBootstrap.Button,
                        { onClick: this.props.onModalClose },
                        '\u53D6\u6D88'
                    )
                )
            );
        }
    }]);

    return ModalToolbar;
}(_react2.default.Component);

var EventEditModal = function (_React$Component2) {
    _inherits(EventEditModal, _React$Component2);

    function EventEditModal(props) {
        _classCallCheck(this, EventEditModal);

        //
        var _this2 = _possibleConstructorReturn(this, (EventEditModal.__proto__ || Object.getPrototypeOf(EventEditModal)).call(this, props));

        _this2.state = {
            newEventData: {}
            //
        };_this2.handleTitleChange = _this2.handleTitleChange.bind(_this2);
        _this2.handleStartChange = _this2.handleStartChange.bind(_this2);
        _this2.handleEndChange = _this2.handleEndChange.bind(_this2);
        _this2.handleColorChange = _this2.handleColorChange.bind(_this2);
        _this2.handleBtnClick = _this2.handleBtnClick.bind(_this2);
        return _this2;
    }

    _createClass(EventEditModal, [{
        key: 'handleTitleChange',
        value: function handleTitleChange(newTitle) {
            this.setState(function (prevState, props) {
                var newEventData = $.extend({}, prevState.newEventData);
                newEventData.title = newTitle;
                return { newEventData: newEventData };
            });
        }
    }, {
        key: 'handleStartChange',
        value: function handleStartChange(newDateValue) {
            this.setState(function (prevState, props) {
                var newEventData = $.extend({}, prevState.newEventData);
                newEventData.start = newDateValue;
                return { newEventData: newEventData };
            });
        }
    }, {
        key: 'handleEndChange',
        value: function handleEndChange(newDateValue) {
            this.setState(function (prevState, props) {
                var newEventData = $.extend({}, prevState.newEventData);
                newEventData.end = newDateValue;
                return { newEventData: newEventData };
            });
        }
    }, {
        key: 'handleColorChange',
        value: function handleColorChange(newColorValue) {
            this.setState(function (prevState, props) {
                var newEventData = $.extend({}, prevState.newEventData);
                newEventData.backgroundColor = newColorValue;
                return { newEventData: newEventData };
            });
        }
    }, {
        key: 'handleBtnClick',
        value: function handleBtnClick(e) {
            var id = e.target.id;
            var btnType = id.split('-')[2];
            var handleName = 'onEvent' + btnType;
            this.props[handleName](this.props.editingEvent, this.state.newEventData);
            //
            this.props.onModalClose();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                show = _props.show,
                onModalClose = _props.onModalClose;

            var event = this.props.editingEvent;
            var enableSaveBtn = !$.isEmptyObject(this.state.newEventData);
            return _react2.default.createElement(
                _EventModal2.default,
                { show: show, onModalClose: onModalClose },
                _react2.default.createElement(
                    _EventModal2.default.NavHeader,
                    { onModalClose: onModalClose },
                    _react2.default.createElement(
                        _reactBootstrap.NavItem,
                        { eventKey: '1' },
                        '\u65E5\u7A0B\u7F16\u8F91'
                    ),
                    _react2.default.createElement(
                        _reactBootstrap.NavItem,
                        { eventKey: '2' },
                        '\u91CD\u590D\u89C4\u5219'
                    )
                ),
                _react2.default.createElement(
                    _EventModal2.default.TabBody,
                    null,
                    _react2.default.createElement(
                        _reactBootstrap.Tab.Pane,
                        { eventKey: '1' },
                        _react2.default.createElement(_EventDetailForm2.default
                        //传入日程属性
                        , { key: 'edit' + event.id,
                            eventTitle: event.title,
                            start: event.start.format('YYYY-MM-DD HH:mm:ss'),
                            end: event.end.format('YYYY-MM-DD HH:mm:ss'),
                            backgroundColor: event.backgroundColor,
                            complete: event.complete
                            //事件句柄
                            , onTitleChange: this.handleTitleChange,
                            onStartChange: this.handleStartChange,
                            onEndChange: this.handleEndChange,
                            onColorchange: this.handleColorChange
                        })
                    ),
                    _react2.default.createElement(
                        _reactBootstrap.Tab.Pane,
                        { eventKey: '2' },
                        _react2.default.createElement(_EventRepeatForm2.default, null)
                    )
                ),
                _react2.default.createElement(
                    _EventModal2.default.ToolbarFooter,
                    null,
                    _react2.default.createElement(ModalToolbar, {
                        enableSaveBtn: enableSaveBtn,
                        complete: this.state.complete,
                        onBtnClick: this.handleBtnClick,
                        onModalClose: onModalClose
                    })
                )
            );
        }
    }]);

    return EventEditModal;
}(_react2.default.Component);

exports.default = EventEditModal;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/components/Modal/EventModal.js":
/*!********************************************!*\
  !*** ./src/components/Modal/EventModal.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(/*! react-bootstrap */ "./node_modules/_react-bootstrap@0.32.1@react-bootstrap/es/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavHeader = function (_React$Component) {
    _inherits(NavHeader, _React$Component);

    function NavHeader() {
        _classCallCheck(this, NavHeader);

        return _possibleConstructorReturn(this, (NavHeader.__proto__ || Object.getPrototypeOf(NavHeader)).apply(this, arguments));
    }

    _createClass(NavHeader, [{
        key: 'render',

        //this.props.children 接受 <NavItem />
        value: function render() {
            return _react2.default.createElement(
                _reactBootstrap.Modal.Header,
                {
                    style: { borderBottom: 'none', padding: '0' } },
                _react2.default.createElement(
                    _reactBootstrap.Nav,
                    { bsStyle: 'tabs',
                        style: { padding: '15px 15px 0 15px' } },
                    _react2.default.createElement(_reactBootstrap.CloseButton, { onClick: this.props.onModalClose }),
                    this.props.children
                )
            );
        }
    }]);

    return NavHeader;
}(_react2.default.Component);

var TabBody = function (_React$Component2) {
    _inherits(TabBody, _React$Component2);

    function TabBody() {
        _classCallCheck(this, TabBody);

        return _possibleConstructorReturn(this, (TabBody.__proto__ || Object.getPrototypeOf(TabBody)).apply(this, arguments));
    }

    _createClass(TabBody, [{
        key: 'render',

        //this.props.children 接受 <Tab.Pane />
        value: function render() {
            return _react2.default.createElement(
                _reactBootstrap.Modal.Body,
                null,
                _react2.default.createElement(
                    _reactBootstrap.Tab.Content,
                    { animation: true },
                    this.props.children
                )
            );
        }
    }]);

    return TabBody;
}(_react2.default.Component);

var ToolbarFooter = function (_React$Component3) {
    _inherits(ToolbarFooter, _React$Component3);

    function ToolbarFooter() {
        _classCallCheck(this, ToolbarFooter);

        return _possibleConstructorReturn(this, (ToolbarFooter.__proto__ || Object.getPrototypeOf(ToolbarFooter)).apply(this, arguments));
    }

    _createClass(ToolbarFooter, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _reactBootstrap.Modal.Footer,
                null,
                this.props.children
            );
        }
    }]);

    return ToolbarFooter;
}(_react2.default.Component);

var EventModal = function (_React$Component4) {
    _inherits(EventModal, _React$Component4);

    function EventModal() {
        _classCallCheck(this, EventModal);

        return _possibleConstructorReturn(this, (EventModal.__proto__ || Object.getPrototypeOf(EventModal)).apply(this, arguments));
    }

    _createClass(EventModal, [{
        key: 'render',
        value: function render() {
            var NavHeader = void 0,
                TabBody = void 0,
                ToolbarFooter = void 0;
            _react2.default.Children.forEach(this.props.children, function (thisArg) {
                var name = thisArg.type.name;
                if (name == 'NavHeader') {
                    NavHeader = thisArg;
                } else if (name == 'TabBody') {
                    TabBody = thisArg;
                } else if (name == 'ToolbarFooter') {
                    ToolbarFooter = thisArg;
                }
            });

            return _react2.default.createElement(
                _reactBootstrap.Modal,
                { show: this.props.show, onHide: this.props.onModalClose },
                _react2.default.createElement(
                    _reactBootstrap.Tab.Container,
                    { id: 'tabs-with-dropdown', defaultActiveKey: '1' },
                    _react2.default.createElement(
                        _reactBootstrap.Row,
                        { className: 'clearfix' },
                        _react2.default.createElement(
                            _reactBootstrap.Col,
                            { sm: 12 },
                            NavHeader,
                            TabBody
                        )
                    )
                ),
                ToolbarFooter
            );
        }
    }]);

    return EventModal;
}(_react2.default.Component);

EventModal.NavHeader = NavHeader;
EventModal.TabBody = TabBody;
EventModal.ToolbarFooter = ToolbarFooter;

exports.default = EventModal;

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(/*! react-dom */ "./node_modules/_react-dom@16.4.1@react-dom/index.js");

var _reactDom2 = _interopRequireDefault(_reactDom);

__webpack_require__(/*! fullcalendar-reactwrapper/dist/css/fullcalendar.min.css */ "./node_modules/_fullcalendar-reactwrapper@1.0.7@fullcalendar-reactwrapper/dist/css/fullcalendar.min.css");

__webpack_require__(/*! bootstrap/dist/css/bootstrap.css */ "./node_modules/bootstrap/dist/css/bootstrap.css");

__webpack_require__(/*! bootstrap/dist/css/bootstrap-theme.css */ "./node_modules/bootstrap/dist/css/bootstrap-theme.css");

__webpack_require__(/*! @fortawesome/fontawesome-free/css/all.css */ "./node_modules/_@fortawesome_fontawesome-free@5.1.0@@fortawesome/fontawesome-free/css/all.css");

var _App = __webpack_require__(/*! ./App */ "./src/App.js");

var _App2 = _interopRequireDefault(_App);

__webpack_require__(/*! ./index.css */ "./src/index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(_App2.default, null), document.getElementById('root'));

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");

var _moment2 = _interopRequireDefault(_moment);

__webpack_require__(/*! fullcalendar */ "./node_modules/fullcalendar/dist/fullcalendar.js");

var _WizInterface = __webpack_require__(/*! ../utils/WizInterface */ "./src/utils/WizInterface.js");

var _Config = __webpack_require__(/*! ../utils/Config */ "./src/utils/Config.js");

var _Config2 = _interopRequireDefault(_Config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CalendarEvent = function () {
	/**
     * 创建一个通用日程.
  * @param {Object} data 原始数据类型，可以是 WizEvent, FullCalendarEvent 以及 GUID.
     */
	function CalendarEvent(data, calendar) {
		_classCallCheck(this, CalendarEvent);

		if (!_WizInterface.WizDatabase) throw new Error('IWizDatabase is not valid.');
		var type = this._checkDataType(data);
		switch (type) {
			case "WizEvent":
			case "FullCalendarEvent":
				this._create(data, type);
				break;
			case "GUID":
				try {
					//TODO: 获得WizEvent数据，并创建对象
					var doc = _WizInterface.WizDatabase.DocumentFromGUID(data);
					var newEventData = {
						"CALENDAR_END": doc.GetParamValue('CALENDAR_END'),
						"CALENDAR_INFO": doc.GetParamValue('CALENDAR_INFO'),
						"CALENDAR_EXTRAINFO": doc.GetParamValue('CALENDAR_EXTRAINFO'),
						"CALENDAR_START": doc.GetParamValue('CALENDAR_START'),
						"CALENDAR_RECURRENCE": doc.GetParamValue('CALENDAR_RECURRENCE'),
						"CALENDAR_ENDRECURRENCE": doc.GetParamValue('CALENDAR_ENDRECURRENCE'),
						"created": (0, _moment2.default)(doc.DateCreated).format('YYYY-MM-DD HH:mm:ss'),
						"guid": doc.GUID,
						"title": doc.Title,
						"updated": (0, _moment2.default)(doc.DateModified).format('YYYY-MM-DD HH:mm:ss')
					};
					this._create(newEventData, 'WizEvent');
				} catch (e) {
					console.error(e);
				}
				break;
		}
	}

	_createClass(CalendarEvent, [{
		key: '_create',
		value: function _create(data, type) {
			var start = void 0,
			    end = void 0,
			    id = void 0,
			    bkColor = void 0,
			    allDay = void 0,
			    complete = void 0,
			    dateCompleted = void 0,
			    rptRule = void 0,
			    rptEnd = void 0;
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
					bkColor = this._Info.ci ? parseInt(this._Info.ci) == 0 ? this._Info.b : _Config2.default.colorItems[this._Info.ci].colorValue : this._Info.b;
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
			this.start = allDay ? (0, _moment2.default)(start).format("YYYY-MM-DD") : (0, _moment2.default)(start).format('YYYY-MM-DD HH:mm:ss');
			this.end = allDay ? (0, _moment2.default)(end).format("YYYY-MM-DD") : (0, _moment2.default)(end).format('YYYY-MM-DD HH:mm:ss');
			this.created = data.created ? data.created : (0, _moment2.default)(start).format('YYYY-MM-DD HH:mm:ss');
			this.updated = data.updated ? data.updated : (0, _moment2.default)().format('YYYY-MM-DD HH:mm:ss');
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
	}, {
		key: '_checkDataType',
		value: function _checkDataType(data) {
			var objClass = data.constructor;
			var GUID_RegExr = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
			var type = void 0;
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
	}, {
		key: '_parseInfo',
		value: function _parseInfo(InfoString) {
			var InfoObject = {};
			// 拆解CALENDAR_INFO
			var InfoArray = InfoString.split('/');
			InfoArray.forEach(function (item, index, arr) {
				var pair = item.split('=');
				InfoObject[pair[0]] = pair[1];
			});
			// 处理颜色值
			if (InfoObject.b) InfoObject.b = '#' + InfoObject.b;

			return InfoObject;
		}
	}, {
		key: '_stringifyInfo',


		/**
      * 将 Info 对象序列化.
   * @private
   * @param {Object} [InfoObject=] 提供 Info 对象，默认为`this._Info`.
      * @return {String} 返回用于Info对象字符串.
      */
		value: function _stringifyInfo() {
			var InfoObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._Info;

			if (!InfoObject) return '';
			var InfoArray = [];
			var InfoObjectKeysArray = Object.keys(InfoObject);
			InfoObjectKeysArray.forEach(function (item, index, arr) {
				var singleInfo = item + '=' + InfoObject[item];
				InfoArray.push(singleInfo);
			});
			return InfoArray.join('/').replace('#', '');
		}
	}, {
		key: '_update',
		value: function _update() {
			this._updateInfo();
			this._updateExtraInfo();
		}
	}, {
		key: '_updateInfo',
		value: function _updateInfo() {
			var that = this;
			var InfoObject = {
				'b': null, //背景色hex值
				'r': '-1', //提醒方式
				'c': '0', //结束提醒信息
				'ci': 0 //背景色ID，默认 0 表示背景为用户自定义
			};
			// 更新背景色'b'
			InfoObject['b'] = this.backgroundColor.replace('#', '');
			// 更新颜色指数'ci'
			_Config2.default.colorItems.forEach(function (item, index, arr) {
				if (item.colorValue == that.backgroundColor) {
					// 当日程背景色与色表匹配时则用 color idex 来储存（兼容原版日历插件）
					InfoObject['ci'] = index;
				};
			});
			// 应用更新
			this._Info = InfoObject;
		}
	}, {
		key: '_getDefaultExtraInfo',
		value: function _getDefaultExtraInfo() {
			return {
				'Complete': 0, //
				'DateCompleted': '', // ISO 标准日期字符串 YYYY-MM-DD 00:00:00
				'Prior': 0
			};
		}
	}, {
		key: '_updateExtraInfo',
		value: function _updateExtraInfo() {
			var ExtraInfoObject = {
				'Complete': 0,
				'DateCompleted': '',
				'Prior': 0
			};
			ExtraInfoObject['Complete'] = this.complete;
			ExtraInfoObject['DateCompleted'] = this.dateCompleted;
			this._ExtraInfo = ExtraInfoObject;
		}
	}, {
		key: '_getEventHtml',
		value: function _getEventHtml() {
			var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.title;
			var content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

			var htmlText = '<html>\n\t\t\t\t<head>\n\t\t\t\t\t<meta http-equiv="Content-Type" content="text/html; charset=unicode">\n\t\t\t\t\t<title>' + title + '</title> \n\t\t\t\t</head>\n\t\t\t\t<body>\n\t\t\t\t\t<!--WizHtmlContentBegin-->\n\t\t\t\t\t<div>' + content + '</div>\n\t\t\t\t\t<!--WizHtmlContentEnd-->\n\t\t\t\t</body>\n\t\t\t</html>';

			return htmlText;
		}
	}, {
		key: 'generateRepeatEvents',


		/**
      * 根据日程的重复规则生成 FullCalendar eventSource.
   * @param {String} start 查询起始，ISO 标准日期字符串.
   * @param {String} end 查询结束，ISO 标准日期字符串.
      * @returns {Object} eventSource.
      */
		value: function generateRepeatEvents(start, end) {
			if (!this.rptRule) throw new Error('Cannot find CalendarEvent repeat rule.');
			var eventSource = {
				id: this.id,
				events: []
				//根据rptRule生成重复日期，并生成事件
			};var dayArray = this._getRenderRepeatDay(start, end);
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = dayArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var day = _step.value;

					// day 是一个Moment日期对象
					var newEvent = this.toFullCalendarEvent();
					newEvent.start = day.format('YYYY-MM-DD HH:mm:ss');
					newEvent.end = (0, _moment2.default)(newEvent.end).add(day.diff((0, _moment2.default)(this.start))).format('YYYY-MM-DD HH:mm:ss');
					eventSource.events.push(newEvent);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return eventSource;
		}
	}, {
		key: '_getRenderRepeatDay',


		/**
      * 根据规则生成日期数组
      * @returns {Object[]} 包含一系列`Moment`日期对象的数组.
      */
		value: function _getRenderRepeatDay(start, end) {
			var rptRule = this.rptRule;
			var dayArray = void 0;
			var regex = void 0;
			console.count(rptRule);
			if ((regex = /^Every(\d)?Weeks?(\d*)$/).test(rptRule)) {
				// 每[1234]周[7123456]
				var curWeekDay = (0, _moment2.default)(this.start).day();
				var results = regex.exec(rptRule);
				var interWeek = results[1];
				var number = results[2] || '' + curWeekDay;
				dayArray = this._getWeeklyRepeatDay(number, start, end, interWeek);
			} else if ((regex = /^EveryWeekday(\d*)$/).test(rptRule)) {
				// 每个工作日EveryWeekday135
				var _results = regex.exec(rptRule);
				var _number = _results[1] || '12345';
				dayArray = this._getWeeklyRepeatDay(_number, start, end);
			} else if ((regex = /Daily|Weekly|Monthly|Yearly/).test(rptRule)) {
				// Daily|Weekly|Monthly|Yearly
				var perRule = regex.exec(rptRule)[0];
				dayArray = this._getPerRepeatDays(start, end, perRule);
			}

			return dayArray;
		}
	}, {
		key: '_getWeeklyRepeatDay',


		/**
      * 根据每周规则生成日期数组
   * @param {String} number 整数字符串表示的规则；
      * @returns {Object[]} 包含一系列Moment日期对象的数组.
      */
		value: function _getWeeklyRepeatDay(number, start, end) {
			var interWeeks = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '1';

			//返回[{start, end}, {start, end}, {start, end}]
			//考虑渲染范围，以及结束循环的日期
			var viewStart = (0, _moment2.default)(this.start);
			var viewEnd = (0, _moment2.default)(end);
			var rptEnd = this.rptEnd ? (0, _moment2.default)(this.rptEnd) : viewEnd;
			var dayArray = [];
			var intervalWeeks = interWeeks ? parseInt(interWeeks) : 1;
			var weekdays = number.replace('7', '0').split(''); //周日0~6周六
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = weekdays[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var day = _step2.value;

					//
					var curWeekDay = parseInt(day),
					    newEventStartDate = (0, _moment2.default)(viewStart);
					do {
						// 创建新Moment对象
						newEventStartDate = (0, _moment2.default)(viewStart).day(curWeekDay);
						// 根据日程设置time part
						var eventStart = (0, _moment2.default)(this.start);
						newEventStartDate.set({
							'hour': eventStart.get('hour'),
							'minute': eventStart.get('minute'),
							'second': eventStart.get('second')
						});
						// 避免初始重复渲染
						if (!newEventStartDate.isSame(eventStart)) dayArray.push((0, _moment2.default)(newEventStartDate));
						// 隔多少周重复
						curWeekDay += 7 * intervalWeeks;
						//console.log( moment(newEventStartDate).format('YYYY-MM-DD HH:mm:ss') );
					} while ((0, _moment2.default)(viewStart).day(curWeekDay + 7).isBefore(viewEnd) && (0, _moment2.default)(viewStart).day(curWeekDay + 7).isBefore(rptEnd));
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			return dayArray;
		}
	}, {
		key: '_getPerRepeatDays',
		value: function _getPerRepeatDays(start, end, perRule) {
			var perRuleMap = {
				'Daily': 'days',
				'Weekly': 'weeks',
				'Monthly': 'months',
				'Yearly': 'years'
			};
			var viewStart = (0, _moment2.default)(this.start);
			var viewEnd = (0, _moment2.default)(end);
			var rptEnd = this.rptEnd ? (0, _moment2.default)(this.rptEnd) : viewEnd;
			var dayArray = [];
			var eventStart = (0, _moment2.default)(this.start);
			do {
				// 增加一个月
				eventStart.add(1, perRuleMap[perRule]);
				dayArray.push((0, _moment2.default)(eventStart));
			} while (eventStart.isBefore(viewEnd) && eventStart.isBefore(rptEnd));

			return dayArray;
		}
	}, {
		key: 'toFullCalendarEvent',
		value: function toFullCalendarEvent() {
			var newEvent = $.extend({}, this);
			// 删除无关数据
			delete newEvent._Info;
			delete newEvent._ExtraInfo;
			return newEvent;
		}
	}, {
		key: 'toWizEventData',
		value: function toWizEventData() {
			this._update();
			var newEvent = {};
			newEvent.title = this.title;
			newEvent.guid = this.id;
			newEvent.CALENDAR_START = this.allDay ? (0, _moment2.default)(this.start).format('YYYY-MM-DD 00:00:00') : this.start;
			newEvent.CALENDAR_END = this.allDay ? (0, _moment2.default)(this.end).format('YYYY-MM-DD 23:59:59') : this.end;
			newEvent.CALENDAR_INFO = this._stringifyInfo(this._Info);
			newEvent.CALENDAR_EXTRAINFO = this._stringifyInfo(this._ExtraInfo);
			newEvent.created = this.created;
			newEvent.updated = this.updated;
			return newEvent;
		}
	}, {
		key: '_saveAllProp',
		value: function _saveAllProp() {
			//TODO: 保存全部数据包括Title
			// 更新事件文档数据
			var doc = _WizInterface.WizDatabase.DocumentFromGUID(this.id);
			// 保存标题
			doc.Title = this.title;
			// 保存时间数据
			if (this.allDay) {
				var startStr = (0, _moment2.default)(this.start).set({ 'h': 0, 'm': 0, 's': 0 }).format('YYYY-MM-DD HH:mm:ss');
				var endStr = (0, _moment2.default)(this.end).set({ 'h': 23, 'm': 59, 's': 59 }).format('YYYY-MM-DD HH:mm:ss');
				this._setParamValue(doc, "CALENDAR_START", startStr);
				this._setParamValue(doc, "CALENDAR_END", endStr);
			} else {
				var _startStr = (0, _moment2.default)(this.start).format('YYYY-MM-DD HH:mm:ss');
				var _endStr = (0, _moment2.default)(this.end).format('YYYY-MM-DD HH:mm:ss');
				this._setParamValue(doc, "CALENDAR_START", _startStr);
				this._setParamValue(doc, "CALENDAR_END", _endStr);
			}

			// 保存 CALENDAR_INFO
			this._update();
			this._setParamValue(doc, "CALENDAR_INFO", this._stringifyInfo(this._Info));
			this._setParamValue(doc, "CALENDAR_EXTRAINFO", this._stringifyInfo(this._ExtraInfo));
		}
	}, {
		key: '_setParamValue',


		// 设置文档属性值
		value: function _setParamValue(doc, key, value) {
			if (!doc) return false;
			doc.SetParamValue(key, value);
		}
	}, {
		key: '_createWizEventDoc',
		value: function _createWizEventDoc() {
			//TODO: 保存全部数据包括Title
			// 创建WizDoc
			var location = 'My Events/' + (0, _moment2.default)(this.start).format('YYYY-MM') + '/';
			var objFolder = _WizInterface.WizDatabase.GetFolderByLocation(location, true);
			var tempHtml = _WizInterface.WizCommonUI.GetATempFileName('.html');
			var htmlText = this._getEventHtml(this.title, '');
			_WizInterface.WizCommonUI.SaveTextToFile(tempHtml, htmlText, 'unicode');
			var doc = objFolder.CreateDocument2(this.title, "");
			doc.ChangeTitleAndFileName(this.title);
			doc.UpdateDocument6(tempHtml, tempHtml, 0x22);
			// 设置标签
			//if ( tags ) doc.SetTagsText2(tags, "Calendar");
			// 将信息编码到WizDoc属性中去
			var newEvent = this.toWizEventData();
			doc.AddToCalendar(newEvent.CALENDAR_START, newEvent.CALENDAR_END, newEvent.CALENDAR_INFO);
			// change database
			doc.type = "event";
			//
			this.id = doc.GUID;
		}
	}, {
		key: 'saveToWizEventDoc',
		value: function saveToWizEventDoc() {
			var prop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'all';

			if (!_WizInterface.WizDatabase || !_WizInterface.WizCommonUI) throw new Error('IWizDatabase or IWizCommonUI is not valid.');
			//检查文档是否存在
			var guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
			var isWizDocExist = guidRegex.test(this.id);
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
	}, {
		key: 'deleteEventData',
		value: function deleteEventData() {
			var isDeleteDoc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

			var doc = _WizInterface.WizDatabase.DocumentFromGUID(this.id);
			if (!doc) throw new Error('Can not find Event related WizDocument.');
			// 移除日历数据
			doc.RemoveFromCalendar();
			// 删除文档
			if (isDeleteDoc) doc.Delete();
		}
	}]);

	return CalendarEvent;
}();

exports.default = CalendarEvent;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/models/WizEventDataLoader.js":
/*!******************************************!*\
  !*** ./src/models/WizEventDataLoader.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _WizInterface = __webpack_require__(/*! ../utils/WizInterface */ "./src/utils/WizInterface.js");

var _CalendarEvent = __webpack_require__(/*! ./CalendarEvent */ "./src/models/CalendarEvent.js");

var _CalendarEvent2 = _interopRequireDefault(_CalendarEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 数据获取
----------------------------------------------------------------------------------------------------------------------*/

/** 该类与Wiznote的WizDatabase接口交换信息，获取数据 */
var WizEventDataLoader = function () {

	/**
     * 创造一个事件数据加载器.
  * @param {string} start 查询起始日期，ISO标准日期字符串.
  * @param {string} end 查询截至日期，ISO标准日期字符串.
     */
	function WizEventDataLoader() {
		_classCallCheck(this, WizEventDataLoader);

		if (!_WizInterface.WizDatabase) throw new Error('WizDatabase not valid !');
		this.Database = _WizInterface.WizDatabase;
		this.userName = _WizInterface.WizDatabase.UserName;
	}

	_createClass(WizEventDataLoader, [{
		key: 'getEventSources',


		/**
      * 获得渲染后的所有FullCalendar事件.
   * @param {object} view is the View Object of FullCalendar for the new view.
   * @param {object} element is a jQuery element for the container of the new view.
      * @return {Object[]} 返回用于FullCalendar 渲染的 eventSources 数组.
      */
		value: function getEventSources(view, element) {
			var viewStart = view.start.format('YYYY-MM-DD HH:mm:ss');
			var viewEnd = view.end.format('YYYY-MM-DD HH:mm:ss');
			var eventSources = [];
			//获取普通日程
			var generalEventSource = {
				type: 'generalEvents',
				//events: this._getAllOriginalEvent([], this._d2s(currentView.start.toDate()), this._d2s(currentView.end.toDate()))
				events: this._getAllOriginalEvent(viewStart, viewEnd)
			};
			eventSources.push(generalEventSource);

			//TODO: 获取重复日程
			var repeatEventSources = this._getAllRepeatEvent(viewStart, viewEnd);
			eventSources = eventSources.concat(repeatEventSources);
			//
			return eventSources;
		}
	}, {
		key: '_getAllOriginalEvent',


		/**
      * 从WizDatabase中获取所有数据文档.
   * @param {array} events 初始事件数组.
   * @param {string} start ISO标准日期字符串.
   * @param {string} end ISO标准日期字符串.
      * @return {Object[]} 返回用于FullCalendar渲染的事件数组.
      */
		value: function _getAllOriginalEvent(start, end) {
			var events = [];
			var sql = 'DOCUMENT_LOCATION not like \'/Deleted Items/%\' and (KB_GUID is null or KB_GUID = \'\')';
			var and1 = ' and DOCUMENT_GUID in (select DOCUMENT_GUID from WIZ_DOCUMENT_PARAM where PARAM_NAME = \'CALENDAR_START\'  and  PARAM_VALUE <= \'' + end + '\' )';
			var and2 = ' and DOCUMENT_GUID in (select DOCUMENT_GUID from WIZ_DOCUMENT_PARAM where PARAM_NAME = \'CALENDAR_END\'  and  PARAM_VALUE >= \'' + start + '\' )';
			if (start) sql += and2;
			if (end) sql += and1;
			if (_WizInterface.WizDatabase.DocumentsDataFromSQL) {
				try {
					var data = _WizInterface.WizDatabase.DocumentsDataFromSQL(sql);
					if (!data) return false;
					var obj = JSON.parse(data);
					if (!obj || !Array.isArray(obj)) return false;
					for (var i = 0; i < obj.length; i++) {
						events.push(new _CalendarEvent2.default(obj[i]).toFullCalendarEvent());
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
	}, {
		key: '_getAllRepeatEvent',


		/**
      * 从WizDatabase中获取所有循环重复事件.
   * 从创建事件的日期开始到ENDRECURRENCE结束
      * @return {Object[]} 返回用于FullCalendar渲染的 eventSource 数组.
      */
		value: function _getAllRepeatEvent(start, end) {
			var repeatEvents = [];
			var sql = "DOCUMENT_LOCATION not like '/Deleted Items/%' and (KB_GUID is null or KB_GUID = '') and " + "DOCUMENT_GUID in (select DOCUMENT_GUID from WIZ_DOCUMENT_PARAM where PARAM_NAME='CALENDAR_RECURRENCE')";

			var data = _WizInterface.WizDatabase.DocumentsDataFromSQL(sql);
			console.log(data);
			if (!data) return false;

			var obj = JSON.parse(data);
			if (!obj || !Array.isArray(obj)) return false;

			for (var i = 0; i < obj.length; i++) {
				repeatEvents.push(new _CalendarEvent2.default(obj[i]).generateRepeatEvents(start, end));
			}
			return repeatEvents;
		}
	}, {
		key: 'updateEventDataOnDrop',


		// 日历事件拖动后更新数据
		value: function updateEventDataOnDrop(event, delta, revertFunc, jsEvent, ui, view) {
			// Call hasTime on the event’s start/end to see if it has been dropped in a timed or all-day area.
			var allDay = !event.start.hasTime();
			// 获取事件文档时间数据
			var doc = _WizInterface.WizDatabase.DocumentFromGUID(event.id);
			// 更新数据
			if (allDay) {
				var startStr = event.start.set({ 'h': 0, 'm': 0, 's': 0 }).format('YYYY-MM-DD HH:mm:ss');
				var endStr = event.end.set({ 'h': 23, 'm': 59, 's': 59 }).format('YYYY-MM-DD HH:mm:ss');
				this._setParamValue(doc, "CALENDAR_START", startStr);
				this._setParamValue(doc, "CALENDAR_END", endStr);
			} else {
				var _startStr = event.start.format('YYYY-MM-DD HH:mm:ss');
				var _endStr = event.end.format('YYYY-MM-DD HH:mm:ss');
				this._setParamValue(doc, "CALENDAR_START", _startStr);
				this._setParamValue(doc, "CALENDAR_END", _endStr);
			}
			//TODO: 更新CALENDAR_RECURRENCE数据
			// 
			this._updateDocModifyDate(doc);
		}
	}, {
		key: '_setParamValue',


		// 设置文档属性值
		value: function _setParamValue(doc, key, value) {
			if (!doc) return false;
			doc.SetParamValue(key, value);
		}
	}, {
		key: '_updateDocModifyDate',


		// 更新WizDoc修改时间
		value: function _updateDocModifyDate(doc) {
			var now = new Date();
			if (!doc) return false;
			now.setSeconds((now.getSeconds() + 1) % 60);
			doc.DateModified = this._d2s(now);
		}
	}, {
		key: '_d2s',


		// 将日期对象转化为字符串
		//TODO: 考虑依赖moment来简化转换过程
		value: function _d2s(dt) {
			var ret = dt.getFullYear() + "-" + formatIntToDateString(dt.getMonth() + 1) + "-" + formatIntToDateString(dt.getDate()) + " " + formatIntToDateString(dt.getHours()) + ":" + formatIntToDateString(dt.getMinutes()) + ":" + formatIntToDateString(dt.getSeconds());
			return ret;
		}
	}, {
		key: 'updateEventDataOnResize',


		// 日历时间重置时间范围后更新数据
		value: function updateEventDataOnResize(event, delta, revertFunc, jsEvent, ui, view) {
			var allDay = event.start.hasTime() ? false : true;
			// 获得事件文档时间数据
			var doc = _WizInterface.WizDatabase.DocumentFromGUID(event.id);
			// 计算更改后的结束时间
			var eventEndStr = event.end.format('YYYY-MM-DD HH:mm:ss');
			// 更新文档数据
			this._setParamValue(doc, "CALENDAR_END", eventEndStr);
			this._updateDocModifyDate(doc);
		}
	}, {
		key: 'createEvent',


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
		value: function createEvent(selectionData, userInputs) {
			// 获取用户设置
			var newEvent = new _CalendarEvent2.default({
				title: userInputs.title ? userInputs.title : '无标题',
				start: selectionData.start,
				end: selectionData.end,
				allDay: selectionData.start.hasTime() && selectionData.end.hasTime() ? false : true,
				backgroundColor: userInputs.color ? userInputs.color : '#32CD32'
			});
			// 保存并渲染事件
			newEvent.saveToWizEventDoc();
			newEvent.refetchData();
			return newEvent;
		}
	}]);

	return WizEventDataLoader;
}();

// TODO: 重写获取数据的方式


exports.default = WizEventDataLoader;
function _getWizEvent(start, end) {
	//TODO:
	var events = [];
	var EventCollection = _WizInterface.WizDatabase.GetCalendarEvents2(start, end);
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

/***/ }),

/***/ "./src/utils/Config.js":
/*!*****************************!*\
  !*** ./src/utils/Config.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    colorCount: 12,
    colorItems: [{ "colorValue": "#32CD32", "colorName": '橄榄绿' }, { "colorValue": "#5484ED", "colorName": '宝石蓝' }, { "colorValue": "#A4BDFE", "colorName": '蓝色' }, { "colorValue": "#46D6DB", "colorName": '青绿色' }, { "colorValue": "#7AE7BF", "colorName": '绿色' }, { "colorValue": "#51B749", "colorName": '清新绿' }, { "colorValue": "#FBD75B", "colorName": '黄色' }, { "colorValue": "#FFB878", "colorName": '橘色' }, { "colorValue": "#FF887C", "colorName": '红色' }, { "colorValue": "#DC2127", "colorName": '奢华红' }, { "colorValue": "#DBADFF", "colorName": '紫色' }, { "colorValue": "#E1E1E1", "colorName": '灰色' }]

};

/***/ }),

/***/ "./src/utils/WizInterface.js":
/*!***********************************!*\
  !*** ./src/utils/WizInterface.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//TODO: 判断window.external是否为WizHtmlEditorApp
var WizExplorerApp = window.external;
var WizExplorerWindow = WizExplorerApp.Window;
var WizDatabase = WizExplorerApp.Database;
var WizCommonUI = WizExplorerApp.CreateWizObject("WizKMControls.WizCommonUI");

function WizConfirm(msg, title) {
    return WizExplorerWindow.ShowMessage(msg, title, 0x00000020 | 0x00000001) == 1;
}

function WizAlert(msg) {
    WizExplorerWindow.ShowMessage(msg, "{p}", 0x00000040);
}

function WizBubbleMessage(title, msg) {
    var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#FFFA9D';
    var delay = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '3';

    var appPath = WizCommonUI.GetSpecialFolder("AppPath");
    //
    var wizShellFileName = appPath + "Wiz.exe";
    var dllFileName = appPath + "WizTools.dll";
    //
    var params = "\"" + dllFileName + "\" WizToolsShowBubbleWindow2Ex /Title=" + title + " /LinkText=" + msg + " /LinkURL=@ /Color=" + color + " /Delay=" + delay;
    //
    WizCommonUI.RunExe(wizShellFileName, params, false);
}

var WizShell = function () {
    function WizShell(dllFileName, dllExportFunc, params) {
        _classCallCheck(this, WizShell);

        //使用dll导出函数，大部分入参时命令行方式，具体参数没有说明，有需要联系开发人员
        var appPath = WizCommonUI.GetSpecialFolder("AppPath");
        this.appPath = appPath;
        this.wizExe = appPath + "Wiz.exe";
        this.dllFileName = dllFileName ? appPath + dllFileName : appPath + 'WizKMControls.dll';
        this.dllExportFunc = dllExportFunc || 'WizKMRunScript';
        this.params = params;
    }

    _createClass(WizShell, [{
        key: "runScriptFile",
        value: function runScriptFile(scriptFileName, scriptParams) {
            var params = "\"" + (this.appPath + 'WizKMControls.dll') + "\" WizKMRunScript /ScriptFileName=" + scriptFileName + " " + scriptParams;
            WizCommonUI.RunExe(this.wizExe, params, false);
        }
    }, {
        key: "wizBubbleMessage",
        value: function wizBubbleMessage(title, msg) {
            var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#FFFA9D';
            var delay = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '3';

            WizBubbleMessage(title, msg, color, delay);
        }
    }], [{
        key: "getWizInterface",
        value: function getWizInterface() {
            return {
                WizExplorerApp: WizExplorerApp, WizExplorerWindow: WizExplorerWindow, WizDatabase: WizDatabase, WizCommonUI: WizCommonUI
            };
        }
    }]);

    return WizShell;
}();

exports.WizExplorerApp = WizExplorerApp;
exports.WizExplorerWindow = WizExplorerWindow;
exports.WizDatabase = WizDatabase;
exports.WizCommonUI = WizCommonUI;
exports.WizConfirm = WizConfirm;
exports.WizAlert = WizAlert;
exports.WizBubbleMessage = WizBubbleMessage;
exports.WizShell = WizShell;

/***/ }),

/***/ "./src/utils/utils.js":
/*!****************************!*\
  !*** ./src/utils/utils.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
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

exports.rgb2hsl = rgb2hsl;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQ2FsZW5kYXIvQ2FsZW5kYXIuY3NzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0V2ZW50UG9wb3Zlci9FdmVudFBvcG92ZXIuY3NzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0V2ZW50UG9wb3Zlci9Qb3BvdmVyVGl0bGVJbnB1dC5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZSBzeW5jIF5cXC5cXC8uKiQiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9DYWxlbmRhci9DYWxlbmRhci5jc3M/Y2ExNCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9DYWxlbmRhci9DYWxlbmRhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9DYWxlbmRhci9GdWxsQ2FsZW5kYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRXZlbnRQb3BvdmVyL0V2ZW50UG9wb3Zlci5jc3M/NTg1ZiIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9FdmVudFBvcG92ZXIvRXZlbnRQb3BvdmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0V2ZW50UG9wb3Zlci9Qb3BvdmVyVGl0bGVJbnB1dC5jc3M/M2UzNiIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9FdmVudFBvcG92ZXIvUG9wb3ZlclRpdGxlSW5wdXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRXZlbnRQb3BvdmVyL1BvcG92ZXJUb29sYmFyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0Zvcm0vQXV0b0Zvcm1Hcm91cC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Gb3JtL0NvbG9yUGlja2VyR3JvdXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRm9ybS9EYXRlVGltZVBpY2tlckdyb3VwLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0Zvcm0vRXZlbnREZXRhaWxGb3JtLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0Zvcm0vRXZlbnRSZXBlYXRGb3JtLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0Zvcm0vU2VsZWN0UGlja2VyR3JvdXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRm9ybS9UaXRsZUlucHV0R3JvdXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRm9ybS9XZWVrQ2hlY2tib3hHcm91cC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Nb2RhbC9FdmVudENyZWF0ZU1vZGFsLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL01vZGFsL0V2ZW50RWRpdE1vZGFsLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL01vZGFsL0V2ZW50TW9kYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmNzcz9kOGMzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWxzL0NhbGVuZGFyRXZlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVscy9XaXpFdmVudERhdGFMb2FkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL0NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvV2l6SW50ZXJmYWNlLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy91dGlscy5qcyJdLCJuYW1lcyI6WyJBcHAiLCJwcm9wcyIsImRhdGFMb2FkZXIiLCJXaXpFdmVudERhdGFMb2FkZXIiLCJzdGF0ZSIsImlzU2hvd2luZ0V2ZW50IiwiaXNFZGl0aW5nRXZlbnQiLCJpc0NyZWF0aW5nRXZlbnQiLCJjbGlja2VkQXJncyIsImVkaXRpbmdFdmVudCIsInNlbGVjdGVkUmFuZ2UiLCJoYW5kbGVDYWxlbmRhclJlbmRlciIsImJpbmQiLCJoYW5kbGVFdmVudENsaWNrIiwiaGFuZGxlVmlld1JlbmRlciIsImhhbmRsZUV2ZW50RHJvcCIsImhhbmRsZUV2ZW50UmVzaXplIiwiaGFuZGxlRXZlbnRSZW5kZXIiLCJoYW5kbGVQb3BvdmVySGlkZSIsImhhbmRsZURhdGVTZWxlY3QiLCJoYW5kbGVNb2RhbENsb3NlIiwiaGFuZGxlRXZlbnRDcmVhdGUiLCJoYW5kbGVFdmVudFNhdmUiLCJoYW5kbGVFdmVudEVkaXQiLCJoYW5kbGVFdmVudENvbXBsZXRlIiwiaGFuZGxlRXZlbnREZWxldGVEYXRhIiwiaGFuZGxlRXZlbnREZWxldGVEb2MiLCJoYW5kbGVFdmVudE9wZW5Eb2MiLCJoYW5kbGVFdmVudEVkaXRPcmlnaW5EYXRhIiwiZWwiLCJjYWxlbmRhciIsImV2ZW50IiwianNFdmVudCIsInZpZXciLCJhcmdzIiwic2V0U3RhdGUiLCJlbGVtZW50IiwiJGNhbGVuZGFyIiwiJCIsImV2ZW50U291cmNlcyIsImdldEV2ZW50U291cmNlcyIsImZ1bGxDYWxlbmRhciIsImkiLCJsZW5ndGgiLCJkZWx0YSIsInJldmVydEZ1bmMiLCJ1aSIsImlkIiwidXBkYXRlRXZlbnREYXRhT25Ecm9wIiwidXBkYXRlRXZlbnREYXRhT25SZXNpemUiLCJldmVudE9iaiIsIiRlbCIsInJnYlN0cmluZyIsImNzcyIsInJnYkFycmF5IiwiZXhlYyIsImhzbCIsImxpZ2h0bmVzcyIsIk1hdGgiLCJjb3MiLCJQSSIsInRleHRDb2xvciIsImlzQ29tcGxldGUiLCJwYXJzZUludCIsImNvbXBsZXRlIiwiYWRkQ2xhc3MiLCJzdGFydCIsImVuZCIsImV2ZW50RGF0YSIsImFsbERheSIsInRpdGxlIiwiYmFja2dyb3VuZENvbG9yIiwibW9tZW50IiwiaGFzVGltZSIsIm5ld0V2ZW50IiwiQ2FsZW5kYXJFdmVudCIsInNhdmVUb1dpekV2ZW50RG9jIiwiZXZlbnRzIiwidG9GdWxsQ2FsZW5kYXJFdmVudCIsIm5ld0V2ZW50RGF0YSIsInByb3AiLCJkZWxldGVFdmVudERhdGEiLCJkb2MiLCJvYmpEYXRhYmFzZSIsIkRvY3VtZW50RnJvbUdVSUQiLCJvYmpXaW5kb3ciLCJWaWV3RG9jdW1lbnQiLCJvYmpDb21tb24iLCJFZGl0Q2FsZW5kYXJFdmVudCIsInBhZ2VYIiwidGFyZ2V0IiwiUmVhY3QiLCJDb21wb25lbnQiLCJDYWxlbmRhciIsImhhbmRsZUZ1bGxDYWxlbmRhclJlbmRlciIsIm9uQ2FsZW5kYXJSZW5kZXIiLCJsZWZ0IiwiY2VudGVyIiwicmlnaHQiLCJ0b2RheSIsIm1vbnRoIiwid2VlayIsImRheSIsImxpc3QiLCJhZ2VuZGEiLCJtaW5UaW1lIiwic2xvdExhYmVsRm9ybWF0Iiwib25TZWxlY3QiLCJvblZpZXdSZW5kZXIiLCJvbkV2ZW50UmVuZGVyIiwib25FdmVudENsaWNrIiwib25FdmVudERyb3AiLCJvbkV2ZW50UmVzaXplIiwiRnVsbGNhbGVuZGFyT2JqZWN0TWFwcGVyIiwicHJvcGVydGllcyIsIm5ld1NldHRpbmdzIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJGdWxsQ2FsZW5kYXIiLCJqcSIsIm5vQ29uZmxpY3QiLCJmdWxsY2FsZW5kYXJPYmplY3RNYXBwZXIiLCJpbnN0YW5jZSIsImRhdGUiLCJEYXRlIiwib25GdWxsQ2FsZW5kYXJSZW5kZXIiLCJvYmplY3RNYXBwZXJTZXR0aW5ncyIsImdldFNldHRpbmdzIiwiRXZlbnRQb3BvdmVyIiwicG9wcGVyTm9kZSIsInBvcHBlckluc3RhbmNlIiwiYXV0b0hpZGUiLCJoYW5kbGVEYXRlVGltZUNoYW5nZSIsImhhbmRsZVRpdGxlQ2hhbmdlIiwiaGFuZGxlQ29sb3JDaGFuZ2UiLCJoYW5kbGVCdG5DbGljayIsImUiLCJyZWZlcmVuY2UiLCJpcyIsImhhcyIsImhpZGUiLCJ0aGF0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJvblBvcG92ZXJIaWRlIiwiZmFkZUluIiwibmV3VGl0bGUiLCJ2YWx1ZSIsInByZXZTdGF0ZSIsImV4dGVuZCIsImNvbG9yVmFsdWUiLCJuZXdDb2xvciIsImJ0blR5cGUiLCJzcGxpdCIsImhhbmRsZU5hbWUiLCJ0aGVuIiwicmV0IiwiUG9wcGVyIiwicGxhY2VtZW50IiwibW9kaWZpZXJzIiwiYXJyb3ciLCJkb2N1bWVudCIsIm9mZiIsIm9uIiwic2hvdyIsInByZXZQcm9wcyIsInNuYXBzaG90IiwibmV4dFByb3BzIiwibmV4dFN0YXRlIiwidXBkYXRlIiwiZGVzdHJveSIsImV2ZW50U3RhcnQiLCJmb3JtYXQiLCJlbmFibGVTYXZlQnRuIiwiZGlzcGxheSIsImRpdiIsIkV2ZW50VGl0bGVJbnB1dCIsImV2ZW50VGl0bGUiLCJoYW5kbGVDaGFuZ2UiLCJvblRpdGxlQ2hhbmdlIiwidGFyZ2V0Rm9ybSIsIlBvcG92ZXJUb29sYmFyIiwib25CdG5DbGljayIsIkF1dG9Gb3JtR3JvdXAiLCJpc0hvcml6b250YWwiLCJob3Jpem9udGFsIiwiY29udHJvbElkIiwiQ29udHJvbExhYmVsIiwibGFiZWwiLCJjaGlsZHJlbiIsIkh1ZWJlZSIsInJlcXVpcmUiLCJDb2xvcklucHV0IiwianNFdmVudE9yVmFsdWUiLCJuZXdDb2xvclZhbHVlIiwib25Db2xvckNoYW5nZSIsImh1ZWJlZUluc3RhbmNlIiwic3RhdGljT3BlbiIsInNldFRleHQiLCJzZXRCR0NvbG9yIiwiaHVlcyIsImh1ZTAiLCJzaGFkZXMiLCJzYXR1cmF0aW9ucyIsIm5vdGF0aW9uIiwiY2xhc3NOYW1lIiwiY3VzdG9tQ29sb3JzIiwic2V0Q29sb3IiLCJDb2xvclBpY2tlckdyb3VwIiwiRGF0ZVRpbWVJbnB1dCIsIm5ld0RhdGVWYWx1ZSIsIm9uRGF0ZVRpbWVDaGFuZ2UiLCJyZWFkT25seSIsImRhdGV0aW1lcGlja2VyIiwic2hvd1RvZGF5QnV0dG9uIiwibG9jYWxlIiwiZGF0YSIsIkRhdGVUaW1lUGlja2VyR3JvdXAiLCJFdmVudERldGFpbEZvcm0iLCJoYW5kbGVTdGFydENoYW5nZSIsIm9uU3RhcnRDaGFuZ2UiLCJoYW5kbGVFbmRDaGFuZ2UiLCJvbkVuZENoYW5nZSIsIm9uQ29sb3JjaGFuZ2UiLCJFdmVudFJlcGVhdEZvcm0iLCJycHRCYXNlUnVsZSIsIm9uUnB0QmFzZVJ1bGVDaGFuZ2UiLCJTZWxlY3RQaWNrZXJHcm91cCIsIlNlbGVjdFBpY2tlciIsImNsaWNrZWRJbmRleCIsIm5ld1ZhbHVlIiwib2xkVmFsdWUiLCJuZXdTZWxlY3Rpb24iLCJmaW5kIiwiZXEiLCJ2YWwiLCJvblNlbGVjdGlvbkNoYW5nZSIsInNlbGVjdHBpY2tlciIsInN0eWxlIiwiVGl0bGVJbnB1dEdyb3VwIiwiYXV0b0ZvY3VzIiwiV2Vla0NoZWNrYm94R3JvdXAiLCJXZWVrQ2hlY2tib3hCYXIiLCJ3ZWVrRGF5IiwiaGFuZGxlQ2hlY2tib3hDbGljayIsImNvbnNvbGUiLCJsb2ciLCJjaGVja2JveCIsInB1c2giLCJFdmVudENyZWF0ZU1vZGFsIiwiaGFuZGxlUnB0QmFzZVJ1bGVDaGFuZ2UiLCJuZXdScHRCYXNlUnVsZSIsIm9uRXZlbnRDcmVhdGUiLCJvbk1vZGFsQ2xvc2UiLCJNb2RhbFRvb2xiYXIiLCJ0ZXh0QWxpZ24iLCJFdmVudEVkaXRNb2RhbCIsImlzRW1wdHlPYmplY3QiLCJOYXZIZWFkZXIiLCJib3JkZXJCb3R0b20iLCJwYWRkaW5nIiwiVGFiQm9keSIsIlRvb2xiYXJGb290ZXIiLCJFdmVudE1vZGFsIiwiQ2hpbGRyZW4iLCJmb3JFYWNoIiwidGhpc0FyZyIsIm5hbWUiLCJ0eXBlIiwiUmVhY3RET00iLCJyZW5kZXIiLCJnZXRFbGVtZW50QnlJZCIsImdfZGIiLCJFcnJvciIsIl9jaGVja0RhdGFUeXBlIiwiX2NyZWF0ZSIsIkdldFBhcmFtVmFsdWUiLCJEYXRlQ3JlYXRlZCIsIkdVSUQiLCJUaXRsZSIsIkRhdGVNb2RpZmllZCIsImVycm9yIiwiYmtDb2xvciIsImRhdGVDb21wbGV0ZWQiLCJycHRSdWxlIiwicnB0RW5kIiwiX0luZm8iLCJfcGFyc2VJbmZvIiwiQ0FMRU5EQVJfSU5GTyIsIl9FeHRyYUluZm8iLCJDQUxFTkRBUl9FWFRSQUlORk8iLCJfZ2V0RGVmYXVsdEV4dHJhSW5mbyIsImd1aWQiLCJDQUxFTkRBUl9TVEFSVCIsIkNBTEVOREFSX0VORCIsImNpIiwiYiIsIkNvbmZpZyIsImNvbG9ySXRlbXMiLCJpbmRleE9mIiwiQ29tcGxldGUiLCJEYXRlQ29tcGxldGVkIiwiQ0FMRU5EQVJfUkVDVVJSRU5DRSIsIkNBTEVOREFSX0VORFJFQ1VSUkVOQ0UiLCJjcmVhdGVkIiwidXBkYXRlZCIsIl91cGRhdGUiLCJvYmpDbGFzcyIsImNvbnN0cnVjdG9yIiwiR1VJRF9SZWdFeHIiLCJTdHJpbmciLCJ0ZXN0IiwiT2JqZWN0IiwiSW5mb1N0cmluZyIsIkluZm9PYmplY3QiLCJJbmZvQXJyYXkiLCJpdGVtIiwiaW5kZXgiLCJhcnIiLCJwYWlyIiwiSW5mb09iamVjdEtleXNBcnJheSIsImtleXMiLCJzaW5nbGVJbmZvIiwiam9pbiIsInJlcGxhY2UiLCJfdXBkYXRlSW5mbyIsIl91cGRhdGVFeHRyYUluZm8iLCJFeHRyYUluZm9PYmplY3QiLCJjb250ZW50IiwiaHRtbFRleHQiLCJldmVudFNvdXJjZSIsImRheUFycmF5IiwiX2dldFJlbmRlclJlcGVhdERheSIsImFkZCIsImRpZmYiLCJyZWdleCIsImNvdW50IiwiY3VyV2Vla0RheSIsInJlc3VsdHMiLCJpbnRlcldlZWsiLCJudW1iZXIiLCJfZ2V0V2Vla2x5UmVwZWF0RGF5IiwicGVyUnVsZSIsIl9nZXRQZXJSZXBlYXREYXlzIiwiaW50ZXJXZWVrcyIsInZpZXdTdGFydCIsInZpZXdFbmQiLCJpbnRlcnZhbFdlZWtzIiwid2Vla2RheXMiLCJuZXdFdmVudFN0YXJ0RGF0ZSIsInNldCIsImdldCIsImlzU2FtZSIsImlzQmVmb3JlIiwicGVyUnVsZU1hcCIsIl9zdHJpbmdpZnlJbmZvIiwic3RhcnRTdHIiLCJlbmRTdHIiLCJfc2V0UGFyYW1WYWx1ZSIsIlNldFBhcmFtVmFsdWUiLCJsb2NhdGlvbiIsIm9iakZvbGRlciIsIkdldEZvbGRlckJ5TG9jYXRpb24iLCJ0ZW1wSHRtbCIsImdfY21uIiwiR2V0QVRlbXBGaWxlTmFtZSIsIl9nZXRFdmVudEh0bWwiLCJTYXZlVGV4dFRvRmlsZSIsIkNyZWF0ZURvY3VtZW50MiIsIkNoYW5nZVRpdGxlQW5kRmlsZU5hbWUiLCJVcGRhdGVEb2N1bWVudDYiLCJ0b1dpekV2ZW50RGF0YSIsIkFkZFRvQ2FsZW5kYXIiLCJndWlkUmVnZXgiLCJpc1dpekRvY0V4aXN0IiwiX3NhdmVBbGxQcm9wIiwiX2NyZWF0ZVdpekV2ZW50RG9jIiwiaXNEZWxldGVEb2MiLCJSZW1vdmVGcm9tQ2FsZW5kYXIiLCJEZWxldGUiLCJEYXRhYmFzZSIsInVzZXJOYW1lIiwiVXNlck5hbWUiLCJnZW5lcmFsRXZlbnRTb3VyY2UiLCJfZ2V0QWxsT3JpZ2luYWxFdmVudCIsInJlcGVhdEV2ZW50U291cmNlcyIsIl9nZXRBbGxSZXBlYXRFdmVudCIsImNvbmNhdCIsInNxbCIsImFuZDEiLCJhbmQyIiwiRG9jdW1lbnRzRGF0YUZyb21TUUwiLCJvYmoiLCJKU09OIiwicGFyc2UiLCJBcnJheSIsImlzQXJyYXkiLCJlcnIiLCJyZXBlYXRFdmVudHMiLCJnZW5lcmF0ZVJlcGVhdEV2ZW50cyIsIl91cGRhdGVEb2NNb2RpZnlEYXRlIiwibm93Iiwic2V0U2Vjb25kcyIsImdldFNlY29uZHMiLCJfZDJzIiwiZHQiLCJnZXRGdWxsWWVhciIsImZvcm1hdEludFRvRGF0ZVN0cmluZyIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsImdldEhvdXJzIiwiZ2V0TWludXRlcyIsImV2ZW50RW5kU3RyIiwic2VsZWN0aW9uRGF0YSIsInVzZXJJbnB1dHMiLCJjb2xvciIsInJlZmV0Y2hEYXRhIiwiX2dldFdpekV2ZW50IiwiRXZlbnRDb2xsZWN0aW9uIiwiR2V0Q2FsZW5kYXJFdmVudHMyIiwiZ2V0UmVuZGVyUmVwZWF0RGF5IiwiX3MyZCIsImdfZXZlbnRTdGFydCIsImdfcmVwZWF0UnVsZSIsImdldFdlZWtseVJlcGVhdERheSIsImNoYXJBdCIsImdldERheSIsImludGVyIiwiX2ludGVyRGF5cyIsInBhcnNlRmxvYXQiLCJzcGxpY2UiLCJnZXRNb250aGx5UmVwZWF0RGF5IiwiZ2V0WWVhcmx5UmVwZWF0RGF5IiwiZ2V0Q2hpbmVzZVJlcGVhdERheSIsImRheXMiLCJzdWJzdHIiLCJpc0Nocm9tZSIsImdfaXNDaHJvbWUiLCJ1YSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsInRvTG93ZXJDYXNlIiwibiIsImNoZWNrQW5kQWRkU3RyTGVuZ3RoIiwic3RyIiwiY29sb3JDb3VudCIsIldpekV4cGxvcmVyQXBwIiwid2luZG93IiwiZXh0ZXJuYWwiLCJXaXpFeHBsb3JlcldpbmRvdyIsIldpbmRvdyIsIldpekRhdGFiYXNlIiwiV2l6Q29tbW9uVUkiLCJDcmVhdGVXaXpPYmplY3QiLCJXaXpDb25maXJtIiwibXNnIiwiU2hvd01lc3NhZ2UiLCJXaXpBbGVydCIsIldpekJ1YmJsZU1lc3NhZ2UiLCJkZWxheSIsImFwcFBhdGgiLCJHZXRTcGVjaWFsRm9sZGVyIiwid2l6U2hlbGxGaWxlTmFtZSIsImRsbEZpbGVOYW1lIiwicGFyYW1zIiwiUnVuRXhlIiwiV2l6U2hlbGwiLCJkbGxFeHBvcnRGdW5jIiwid2l6RXhlIiwic2NyaXB0RmlsZU5hbWUiLCJzY3JpcHRQYXJhbXMiLCJyZ2IyaHNsIiwiciIsImciLCJNIiwibWF4IiwibSIsIm1pbiIsIkMiLCJMIiwiUyIsImFicyIsImgiLCJIIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBUSxvQkFBb0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBaUIsNEJBQTRCO0FBQzdDO0FBQ0E7QUFDQSwwQkFBa0IsMkJBQTJCO0FBQzdD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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNVFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFD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LFdBQVdtRCxDQUFYLENBQUosRUFBbUJuRCxXQUFXa0QsQ0FBWCxDQUFuQixDQUFQO0FBQ0g7O1FBRVFSLE8sR0FBQUEsTyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cbiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7XG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHR9XG4gXHR2YXIgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2sgPSB3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdO1xuIFx0d2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXSA9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gd2VicGFja0hvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdFx0aWYgKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHR9IDtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XG4gXHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuIFx0XHRzY3JpcHQuY2hhcnNldCA9IFwidXRmLThcIjtcbiBcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIjtcbiBcdFx0O1xuIFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdChyZXF1ZXN0VGltZW91dCkge1xuIFx0XHRyZXF1ZXN0VGltZW91dCA9IHJlcXVlc3RUaW1lb3V0IHx8IDEwMDAwO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0aWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xuIFx0XHRcdH1cbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiBcdFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xuIFx0XHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcbiBcdFx0XHRcdHJlcXVlc3QudGltZW91dCA9IHJlcXVlc3RUaW1lb3V0O1xuIFx0XHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuIFx0XHRcdFx0aWYgKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XG4gXHRcdFx0XHRcdC8vIHRpbWVvdXRcbiBcdFx0XHRcdFx0cmVqZWN0KFxuIFx0XHRcdFx0XHRcdG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIHRpbWVkIG91dC5cIilcbiBcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xuIFx0XHRcdFx0XHQvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG4gXHRcdFx0XHRcdHJlc29sdmUoKTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XG4gXHRcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcbiBcdFx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIGZhaWxlZC5cIikpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0Ly8gc3VjY2Vzc1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuIFx0XHRcdFx0XHRcdHJlamVjdChlKTtcbiBcdFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0cmVzb2x2ZSh1cGRhdGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcIjU2ODVjNGY5YmIyZDY0ZTZjY2UwXCI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0aWYgKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiBcdFx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuIFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcbiBcdFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuIFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcbiBcdFx0XHRcdFx0XHRyZXF1ZXN0ICtcbiBcdFx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuIFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHQpO1xuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XG4gXHRcdH07XG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH0sXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9O1xuIFx0XHRmb3IgKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwiZVwiICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcInRcIlxuIFx0XHRcdCkge1xuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInJlYWR5XCIpIGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR0aHJvdyBlcnI7XG4gXHRcdFx0fSk7XG5cbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XG4gXHRcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xuIFx0XHRcdFx0XHRpZiAoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdFx0Zm4udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdFx0aWYgKG1vZGUgJiAxKSB2YWx1ZSA9IGZuKHZhbHVlKTtcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy50KHZhbHVlLCBtb2RlICYgfjEpO1xuIFx0XHR9O1xuIFx0XHRyZXR1cm4gZm47XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBob3QgPSB7XG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcblxuIFx0XHRcdC8vIE1vZHVsZSBBUElcbiBcdFx0XHRhY3RpdmU6IHRydWUsXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGRlcCA9PT0gXCJ1bmRlZmluZWRcIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0XHRlbHNlIGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0fSxcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgZGVwID09PSBcInVuZGVmaW5lZFwiKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAraWQgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdH1cbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XG4gXHRcdFx0aWYgKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHRmb3IodmFyIGNodW5rSWQgaW4gaW5zdGFsbGVkQ2h1bmtzKVxuIFx0XHRcdHtcbiBcdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbG9uZS1ibG9ja3NcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCkubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmICghbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCkgY29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdClcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm90IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwiaW5kZXhcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goW1wiLi9zcmMvaW5kZXguanNcIixcInZlbmRvclwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxyXFxuLyog5pel5Y6G5pW05L2T5qC35byPXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuI2NhbGVuZGFyLWNvbnRhaW5lciB7XFxyXFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gICAgdG9wOiAwO1xcclxcbiAgICBsZWZ0OiA4cHg7XFxyXFxuICAgIHJpZ2h0OiA4cHg7XFxyXFxuICAgIGJvdHRvbTogOHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZmMtaGVhZGVyLXRvb2xiYXIge1xcclxcbiAgICAvKlxcclxcbiAgICB0aGUgY2FsZW5kYXIgd2lsbCBiZSBidXR0aW5nIHVwIGFnYWluc3QgdGhlIGVkZ2VzLFxcclxcbiAgICBidXQgbGV0J3Mgc2Nvb3QgaW4gdGhlIGhlYWRlcidzIGJ1dHRvbnNcXHJcXG4gICAgKi9cXHJcXG4gICAgcGFkZGluZy10b3A6IDE0cHg7XFxyXFxuICAgIHBhZGRpbmctbGVmdDogMDtcXHJcXG4gICAgcGFkZGluZy1yaWdodDogMDtcXHJcXG59XFxyXFxuXFxyXFxuLyog5LqL5Lu25riy5p+TXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuLnRjLWNvbXBsZXRlIHtcXHJcXG4gICAgb3BhY2l0eTogMC4zO1xcclxcblxcclxcbn1cXHJcXG5cXHJcXG4udGMtY29tcGxldGUgPiAuZmMtY29udGVudCxcXHJcXG4udGMtY29tcGxldGUgPiAuZmMtY29udGVudCA+IC5mYy10aW1lLFxcclxcbi50Yy1jb21wbGV0ZSA+IC5mYy1jb250ZW50ID4gLmZjLXRpdGxlXFxyXFxue1xcclxcbiAgICB0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaCAhaW1wb3J0YW50O1xcclxcbn1cXHJcXG5cXHJcXG4udGMtY29tcGxldGU6aG92ZXIge1xcclxcbiAgICBvcGFjaXR5OiAxO1xcclxcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi8qIFBvcG92ZXIg57uE5Lu25qC35byPXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuXFxyXFxuLyogUG9wb3ZlciDlrrnlmajlj4rlrprkvY1cXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG5cXHJcXG4udGMtcG9wb3ZlciB7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgYmFja2dyb3VuZDogI0ZGRjtcXHJcXG4gICAgY29sb3I6IGJsYWNrO1xcclxcbiAgICB3aWR0aDogYXV0bztcXHJcXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjIpO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XFxyXFxuICAgIGJveC1zaGFkb3c6IDAgMnB4IDRweCByZ2JhKDAsIDAsIDAsIC4yKTtcXHJcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXIgLmFycm93IHtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgd2lkdGg6IDIwcHg7XFxyXFxuICAgIGhlaWdodDogMTBweDtcXHJcXG4gICAgbWFyZ2luOiAwIDZweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXIgLmFycm93OjpiZWZvcmUsIC50Yy1wb3BvdmVyIC5hcnJvdzo6YWZ0ZXIge1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgICBjb250ZW50OiBcXFwiXFxcIjtcXHJcXG4gICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcXHJcXG4gICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcXHJcXG59XFxyXFxuXFxyXFxuLyogdG9wIOaUvue9ruagt+W8j1xcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwidG9wXFxcIl0ge1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInRvcFxcXCJdIC5hcnJvdyB7XFxyXFxuICAgIGJvdHRvbTogY2FsYygoMTBweCArIDFweCkgKiAtMSk7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwidG9wXFxcIl0gLmFycm93OjpiZWZvcmUsXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJ0b3BcXFwiXSAuYXJyb3c6OmFmdGVyIHtcXHJcXG4gICAgYm9yZGVyLXdpZHRoOiAxMHB4IDEwcHggMDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJ0b3BcXFwiXSAuYXJyb3c6OmJlZm9yZSB7XFxyXFxuICAgIGJvdHRvbTogMDtcXHJcXG4gICAgYm9yZGVyLXRvcC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KTtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJ0b3BcXFwiXSAuYXJyb3c6OmFmdGVyIHtcXHJcXG4gICAgYm90dG9tOiAxcHg7XFxyXFxuICAgIGJvcmRlci10b3AtY29sb3I6ICNmZmY7XFxyXFxufVxcclxcblxcclxcbi8qIHJpZ2h0IOaUvue9ruagt+W8j1xcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwicmlnaHRcXFwiXSB7XFxyXFxuICAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInJpZ2h0XFxcIl0gLmFycm93IHtcXHJcXG4gICAgbGVmdDogY2FsYygoMTBweCArIDFweCkgKiAtMSk7XFxyXFxuICAgIHdpZHRoOiAxMHB4O1xcclxcbiAgICBoZWlnaHQ6IDIwcHg7XFxyXFxuICAgIG1hcmdpbjogNnB4IDA7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwicmlnaHRcXFwiXSAuYXJyb3c6OmJlZm9yZSxcXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInJpZ2h0XFxcIl0gLmFycm93OjphZnRlciB7XFxyXFxuICAgIGJvcmRlci13aWR0aDogMTBweCAxMHB4IDEwcHggMDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJyaWdodFxcXCJdIC5hcnJvdzo6YmVmb3JlIHtcXHJcXG4gICAgbGVmdDogMDtcXHJcXG4gICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMjUpO1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInJpZ2h0XFxcIl0gLmFycm93OjphZnRlciB7XFxyXFxuICAgIGxlZnQ6IDFweDtcXHJcXG4gICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiAjZmZmO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBib3R0b20g5pS+572u5qC35byPXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJib3R0b21cXFwiXSB7XFxyXFxuICAgIG1hcmdpbi10b3A6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwiYm90dG9tXFxcIl0gLmFycm93IHtcXHJcXG4gICAgdG9wOiBjYWxjKCgxMHB4ICsgMXB4KSAqIC0xKTtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJib3R0b21cXFwiXSAuYXJyb3c6OmJlZm9yZSxcXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImJvdHRvbVxcXCJdIC5hcnJvdzo6YWZ0ZXIge1xcclxcbiAgICBib3JkZXItd2lkdGg6IDAgMTBweCAxMHB4IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwiYm90dG9tXFxcIl0gLmFycm93OjpiZWZvcmUge1xcclxcbiAgICB0b3A6IDA7XFxyXFxuICAgIGJvcmRlci1ib3R0b20tY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSk7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwiYm90dG9tXFxcIl0gLmFycm93OjphZnRlciB7XFxyXFxuICAgIHRvcDogMXB4O1xcclxcbiAgICBib3JkZXItYm90dG9tLWNvbG9yOiAjZjdmN2Y3OyAvKui/memHjOS4uuS6huS4k+mXqOmAgumFjeacieagh+mimOiDjOaZr+eahFBvcG92ZXIqL1xcclxcbn1cXHJcXG5cXHJcXG4vKiBsZWZ0IOaUvue9ruagt+W8j1xcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwibGVmdFxcXCJdIHtcXHJcXG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImxlZnRcXFwiXSAuYXJyb3cge1xcclxcbiAgICByaWdodDogY2FsYygoMTBweCArIDFweCkgKiAtMSk7XFxyXFxuICAgIHdpZHRoOiAxMHB4O1xcclxcbiAgICBoZWlnaHQ6IDIwcHg7XFxyXFxuICAgIG1hcmdpbjogNnB4IDA7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwibGVmdFxcXCJdIC5hcnJvdzo6YmVmb3JlLFxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwibGVmdFxcXCJdIC5hcnJvdzo6YWZ0ZXIge1xcclxcbiAgICBib3JkZXItd2lkdGg6IDEwcHggMCAxMHB4IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwibGVmdFxcXCJdIC5hcnJvdzo6YmVmb3JlIHtcXHJcXG4gICAgcmlnaHQ6IDA7XFxyXFxuICAgIGJvcmRlci1sZWZ0LWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMjUpO1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImxlZnRcXFwiXSAuYXJyb3c6OmFmdGVyIHtcXHJcXG4gICAgcmlnaHQ6IDFweDtcXHJcXG4gICAgYm9yZGVyLWxlZnQtY29sb3I6ICNmZmY7XFxyXFxufVxcclxcblxcclxcbi8qIENvbnRlbnQg5qCH6aKY5ZKM5YaF5a65XFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuXFxyXFxuLnRjLXBvcG92ZXItaGVhZGVyIHtcXHJcXG4gICAgcGFkZGluZzogLjVyZW0gLjc1cmVtO1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xcclxcbiAgICBmb250LXNpemU6IDFyZW07XFxyXFxuICAgIGNvbG9yOiBpbmhlcml0O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjdmN2Y3O1xcclxcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2ViZWJlYjtcXHJcXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNnB4O1xcclxcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNnB4O1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlci1ib2R5IHtcXHJcXG4gICAgcGFkZGluZzogMTBweCAxNXB4O1xcclxcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIiN0Yy1lZGl0cG9wcGVyLWV2ZW50dGl0bGUge1xcclxcbiAgICBib3JkZXItd2lkdGg6IDFweDtcXHJcXG4gICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxyXFxuICAgIHBhZGRpbmc6IDA7XFxyXFxuICAgIG1hcmdpbjogMDtcXHJcXG4gICAgZm9udC1zaXplOiAxLjJlbTtcXHJcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxufVxcclxcblxcclxcbiN0Yy1lZGl0cG9wcGVyLWV2ZW50dGl0bGU6Zm9jdXMsXFxyXFxuI3RjLWVkaXRwb3BwZXItZXZlbnR0aXRsZTpob3ZlciB7XFxyXFxuICAgIG91dGxpbmU6IG5vbmU7XFxyXFxuICAgIGJvcmRlci1ib3R0b20tY29sb3I6IGJsYWNrOyBcXHJcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJodG1sLCBib2R5IHtcXHJcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXHJcXG4gICAgZm9udC1zaXplOiAxNHB4O1xcclxcbn1cXHJcXG5cXHJcXG46Zm9jdXMge1xcclxcbiAgICBvdXRsaW5lOm5vbmU7XFxyXFxufVxcclxcblxcclxcbi8qIEZvbnRzLmNzcyAtLSDot6jlubPlj7DkuK3mloflrZfkvZPop6PlhrPmlrnmoYhcXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuLmZvbnQtaGVpIHtmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgXFxcIk5vdG8gU2Fuc1xcXCIsIFxcXCJIZWx2ZXRpY2EgTmV1ZVxcXCIsIEhlbHZldGljYSwgXFxcIk5pbWJ1cyBTYW5zIExcXFwiLCBBcmlhbCwgXFxcIkxpYmVyYXRpb24gU2Fuc1xcXCIsIFxcXCJQaW5nRmFuZyBTQ1xcXCIsIFxcXCJIaXJhZ2lubyBTYW5zIEdCXFxcIiwgXFxcIk5vdG8gU2FucyBDSksgU0NcXFwiLCBcXFwiU291cmNlIEhhbiBTYW5zIFNDXFxcIiwgXFxcIlNvdXJjZSBIYW4gU2FucyBDTlxcXCIsIFxcXCJNaWNyb3NvZnQgWWFIZWlcXFwiLCBcXFwiV2VucXVhbnlpIE1pY3JvIEhlaVxcXCIsIFxcXCJXZW5RdWFuWWkgWmVuIEhlaVxcXCIsIFxcXCJTVCBIZWl0aVxcXCIsIFNpbUhlaSwgXFxcIldlblF1YW5ZaSBaZW4gSGVpIFNoYXJwXFxcIiwgc2Fucy1zZXJpZjt9XFxyXFxuLmZvbnQta2FpIHtmb250LWZhbWlseTogQmFza2VydmlsbGUsIEdlb3JnaWEsIFxcXCJMaWJlcmF0aW9uIFNlcmlmXFxcIiwgXFxcIkthaXRpIFNDXFxcIiwgU1RLYWl0aSwgXFxcIkFSIFBMIFVLYWkgQ05cXFwiLCBcXFwiQVIgUEwgVUthaSBIS1xcXCIsIFxcXCJBUiBQTCBVS2FpIFRXXFxcIiwgXFxcIkFSIFBMIFVLYWkgVFcgTUJFXFxcIiwgXFxcIkFSIFBMIEthaXRpTSBHQlxcXCIsIEthaVRpLCBLYWlUaV9HQjIzMTIsIERGS2FpLVNCLCBcXFwiVFctS2FpXFxcIiwgc2VyaWY7fVxcclxcbi5mb250LXNvbmcge2ZvbnQtZmFtaWx5OiBHZW9yZ2lhLCBcXFwiTmltYnVzIFJvbWFuIE5vOSBMXFxcIiwgXFxcIlNvbmd0aSBTQ1xcXCIsIFxcXCJOb3RvIFNlcmlmIENKSyBTQ1xcXCIsIFxcXCJTb3VyY2UgSGFuIFNlcmlmIFNDXFxcIiwgXFxcIlNvdXJjZSBIYW4gU2VyaWYgQ05cXFwiLCBTVFNvbmcsIFxcXCJBUiBQTCBOZXcgU3VuZ1xcXCIsIFxcXCJBUiBQTCBTdW5ndGlMIEdCXFxcIiwgTlNpbVN1biwgU2ltU3VuLCBcXFwiVFctU3VuZ1xcXCIsIFxcXCJXZW5RdWFuWWkgQml0bWFwIFNvbmdcXFwiLCBcXFwiQVIgUEwgVU1pbmcgQ05cXFwiLCBcXFwiQVIgUEwgVU1pbmcgSEtcXFwiLCBcXFwiQVIgUEwgVU1pbmcgVFdcXFwiLCBcXFwiQVIgUEwgVU1pbmcgVFcgTUJFXFxcIiwgUE1pbmdMaVUsIE1pbmdMaVUsIHNlcmlmO31cXHJcXG4uZm9udC1mYW5nLXNvbmcge2ZvbnQtZmFtaWx5OiBCYXNrZXJ2aWxsZSwgXFxcIlRpbWVzIE5ldyBSb21hblxcXCIsIFxcXCJMaWJlcmF0aW9uIFNlcmlmXFxcIiwgU1RGYW5nc29uZywgRmFuZ1NvbmcsIEZhbmdTb25nX0dCMjMxMiwgXFxcIkNXVEVYLUZcXFwiLCBzZXJpZjt9XFxyXFxuXFxyXFxuLyog5Li05pe25pS+572uXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuXFxyXFxuLnVpLWJ1dHRvbi1pY29uLW9ubHkuc3BsaXRidXR0b24tc2VsZWN0IHtcXHJcXG4gICAgd2lkdGg6IDFlbTtcXHJcXG59XFxyXFxuXFxyXFxuYVtkYXRhLWdvdG9dIHtcXHJcXG4gICAgY29sb3I6ICMwMDA7XFxyXFxufVxcclxcblxcclxcbi8qIEJvb3RzdHJhcCA0IOe7hOS7tuagt+W8j1xcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcblxcclxcbi8qIOihqOWNlVxcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcbi5jb2wtZm9ybS1sYWJlbCB7XFxyXFxuICAgIHBhZGRpbmctdG9wOiBjYWxjKC4zNzVyZW0gKyAxcHgpO1xcclxcbiAgICBwYWRkaW5nLWJvdHRvbTogY2FsYyguMzc1cmVtICsgMXB4KTtcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogMDtcXHJcXG4gICAgZm9udC1zaXplOiBpbmhlcml0O1xcclxcbiAgICBsaW5lLWhlaWdodDogMS41O1xcclxcbn1cXHJcXG5cXHJcXG4uaW5wdXQtZ3JvdXAtYWRkb24ge1xcclxcbiAgYm9yZGVyLWxlZnQtd2lkdGg6IDA7XFxyXFxuICBib3JkZXItcmlnaHQtd2lkdGg6IDA7XFxyXFxufVxcclxcbi5pbnB1dC1ncm91cC1hZGRvbjpmaXJzdC1jaGlsZCB7XFxyXFxuICBib3JkZXItbGVmdC13aWR0aDogMXB4O1xcclxcbn1cXHJcXG4uaW5wdXQtZ3JvdXAtYWRkb246bGFzdC1jaGlsZCB7XFxyXFxuICBib3JkZXItcmlnaHQtd2lkdGg6IDFweDtcXHJcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwidmFyIG1hcCA9IHtcblx0XCIuL2FmXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hZi5qc1wiLFxuXHRcIi4vYWYuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FmLmpzXCIsXG5cdFwiLi9hclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXIuanNcIixcblx0XCIuL2FyLWR6XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1kei5qc1wiLFxuXHRcIi4vYXItZHouanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWR6LmpzXCIsXG5cdFwiLi9hci1rd1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXIta3cuanNcIixcblx0XCIuL2FyLWt3LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1rdy5qc1wiLFxuXHRcIi4vYXItbHlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWx5LmpzXCIsXG5cdFwiLi9hci1seS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItbHkuanNcIixcblx0XCIuL2FyLW1hXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1tYS5qc1wiLFxuXHRcIi4vYXItbWEuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLW1hLmpzXCIsXG5cdFwiLi9hci1zYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItc2EuanNcIixcblx0XCIuL2FyLXNhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1zYS5qc1wiLFxuXHRcIi4vYXItdG5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLXRuLmpzXCIsXG5cdFwiLi9hci10bi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItdG4uanNcIixcblx0XCIuL2FyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci5qc1wiLFxuXHRcIi4vYXpcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2F6LmpzXCIsXG5cdFwiLi9hei5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXouanNcIixcblx0XCIuL2JlXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iZS5qc1wiLFxuXHRcIi4vYmUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JlLmpzXCIsXG5cdFwiLi9iZ1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYmcuanNcIixcblx0XCIuL2JnLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iZy5qc1wiLFxuXHRcIi4vYm1cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JtLmpzXCIsXG5cdFwiLi9ibS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm0uanNcIixcblx0XCIuL2JuXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ibi5qc1wiLFxuXHRcIi4vYm4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JuLmpzXCIsXG5cdFwiLi9ib1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm8uanNcIixcblx0XCIuL2JvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iby5qc1wiLFxuXHRcIi4vYnJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JyLmpzXCIsXG5cdFwiLi9ici5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYnIuanNcIixcblx0XCIuL2JzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9icy5qc1wiLFxuXHRcIi4vYnMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JzLmpzXCIsXG5cdFwiLi9jYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY2EuanNcIixcblx0XCIuL2NhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jYS5qc1wiLFxuXHRcIi4vY3NcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2NzLmpzXCIsXG5cdFwiLi9jcy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3MuanNcIixcblx0XCIuL2N2XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jdi5qc1wiLFxuXHRcIi4vY3YuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2N2LmpzXCIsXG5cdFwiLi9jeVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3kuanNcIixcblx0XCIuL2N5LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jeS5qc1wiLFxuXHRcIi4vZGFcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RhLmpzXCIsXG5cdFwiLi9kYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGEuanNcIixcblx0XCIuL2RlXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS5qc1wiLFxuXHRcIi4vZGUtYXRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLWF0LmpzXCIsXG5cdFwiLi9kZS1hdC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUtYXQuanNcIixcblx0XCIuL2RlLWNoXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS1jaC5qc1wiLFxuXHRcIi4vZGUtY2guanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLWNoLmpzXCIsXG5cdFwiLi9kZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUuanNcIixcblx0XCIuL2R2XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kdi5qc1wiLFxuXHRcIi4vZHYuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2R2LmpzXCIsXG5cdFwiLi9lbFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZWwuanNcIixcblx0XCIuL2VsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbC5qc1wiLFxuXHRcIi4vZW4tYXVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWF1LmpzXCIsXG5cdFwiLi9lbi1hdS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tYXUuanNcIixcblx0XCIuL2VuLWNhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1jYS5qc1wiLFxuXHRcIi4vZW4tY2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWNhLmpzXCIsXG5cdFwiLi9lbi1nYlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tZ2IuanNcIixcblx0XCIuL2VuLWdiLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1nYi5qc1wiLFxuXHRcIi4vZW4taWVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWllLmpzXCIsXG5cdFwiLi9lbi1pZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4taWUuanNcIixcblx0XCIuL2VuLWlsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1pbC5qc1wiLFxuXHRcIi4vZW4taWwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWlsLmpzXCIsXG5cdFwiLi9lbi1uelwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tbnouanNcIixcblx0XCIuL2VuLW56LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1uei5qc1wiLFxuXHRcIi4vZW9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VvLmpzXCIsXG5cdFwiLi9lby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW8uanNcIixcblx0XCIuL2VzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy5qc1wiLFxuXHRcIi4vZXMtZG9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLWRvLmpzXCIsXG5cdFwiLi9lcy1kby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMtZG8uanNcIixcblx0XCIuL2VzLXVzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy11cy5qc1wiLFxuXHRcIi4vZXMtdXMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLXVzLmpzXCIsXG5cdFwiLi9lcy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMuanNcIixcblx0XCIuL2V0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ldC5qc1wiLFxuXHRcIi4vZXQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2V0LmpzXCIsXG5cdFwiLi9ldVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXUuanNcIixcblx0XCIuL2V1LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ldS5qc1wiLFxuXHRcIi4vZmFcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZhLmpzXCIsXG5cdFwiLi9mYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZmEuanNcIixcblx0XCIuL2ZpXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9maS5qc1wiLFxuXHRcIi4vZmkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZpLmpzXCIsXG5cdFwiLi9mb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZm8uanNcIixcblx0XCIuL2ZvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mby5qc1wiLFxuXHRcIi4vZnJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLmpzXCIsXG5cdFwiLi9mci1jYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnItY2EuanNcIixcblx0XCIuL2ZyLWNhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci1jYS5qc1wiLFxuXHRcIi4vZnItY2hcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLWNoLmpzXCIsXG5cdFwiLi9mci1jaC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnItY2guanNcIixcblx0XCIuL2ZyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci5qc1wiLFxuXHRcIi4vZnlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2Z5LmpzXCIsXG5cdFwiLi9meS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnkuanNcIixcblx0XCIuL2dkXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nZC5qc1wiLFxuXHRcIi4vZ2QuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dkLmpzXCIsXG5cdFwiLi9nbFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ2wuanNcIixcblx0XCIuL2dsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nbC5qc1wiLFxuXHRcIi4vZ29tLWxhdG5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dvbS1sYXRuLmpzXCIsXG5cdFwiLi9nb20tbGF0bi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ29tLWxhdG4uanNcIixcblx0XCIuL2d1XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ndS5qc1wiLFxuXHRcIi4vZ3UuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2d1LmpzXCIsXG5cdFwiLi9oZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaGUuanNcIixcblx0XCIuL2hlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oZS5qc1wiLFxuXHRcIi4vaGlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hpLmpzXCIsXG5cdFwiLi9oaS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaGkuanNcIixcblx0XCIuL2hyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oci5qc1wiLFxuXHRcIi4vaHIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hyLmpzXCIsXG5cdFwiLi9odVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHUuanNcIixcblx0XCIuL2h1LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9odS5qc1wiLFxuXHRcIi4vaHktYW1cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2h5LWFtLmpzXCIsXG5cdFwiLi9oeS1hbS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHktYW0uanNcIixcblx0XCIuL2lkXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pZC5qc1wiLFxuXHRcIi4vaWQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2lkLmpzXCIsXG5cdFwiLi9pc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaXMuanNcIixcblx0XCIuL2lzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pcy5qc1wiLFxuXHRcIi4vaXRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2l0LmpzXCIsXG5cdFwiLi9pdC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaXQuanNcIixcblx0XCIuL2phXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9qYS5qc1wiLFxuXHRcIi4vamEuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2phLmpzXCIsXG5cdFwiLi9qdlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvanYuanNcIixcblx0XCIuL2p2LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9qdi5qc1wiLFxuXHRcIi4va2FcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2thLmpzXCIsXG5cdFwiLi9rYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva2EuanNcIixcblx0XCIuL2trXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ray5qc1wiLFxuXHRcIi4va2suanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2trLmpzXCIsXG5cdFwiLi9rbVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva20uanNcIixcblx0XCIuL2ttLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rbS5qc1wiLFxuXHRcIi4va25cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2tuLmpzXCIsXG5cdFwiLi9rbi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva24uanNcIixcblx0XCIuL2tvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rby5qc1wiLFxuXHRcIi4va28uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2tvLmpzXCIsXG5cdFwiLi9reVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva3kuanNcIixcblx0XCIuL2t5LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9reS5qc1wiLFxuXHRcIi4vbGJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2xiLmpzXCIsXG5cdFwiLi9sYi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbGIuanNcIixcblx0XCIuL2xvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sby5qc1wiLFxuXHRcIi4vbG8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2xvLmpzXCIsXG5cdFwiLi9sdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbHQuanNcIixcblx0XCIuL2x0LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sdC5qc1wiLFxuXHRcIi4vbHZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2x2LmpzXCIsXG5cdFwiLi9sdi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbHYuanNcIixcblx0XCIuL21lXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tZS5qc1wiLFxuXHRcIi4vbWUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21lLmpzXCIsXG5cdFwiLi9taVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWkuanNcIixcblx0XCIuL21pLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9taS5qc1wiLFxuXHRcIi4vbWtcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21rLmpzXCIsXG5cdFwiLi9tay5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWsuanNcIixcblx0XCIuL21sXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tbC5qc1wiLFxuXHRcIi4vbWwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21sLmpzXCIsXG5cdFwiLi9tblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbW4uanNcIixcblx0XCIuL21uLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tbi5qc1wiLFxuXHRcIi4vbXJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21yLmpzXCIsXG5cdFwiLi9tci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXIuanNcIixcblx0XCIuL21zXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tcy5qc1wiLFxuXHRcIi4vbXMtbXlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21zLW15LmpzXCIsXG5cdFwiLi9tcy1teS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXMtbXkuanNcIixcblx0XCIuL21zLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tcy5qc1wiLFxuXHRcIi4vbXRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL210LmpzXCIsXG5cdFwiLi9tdC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXQuanNcIixcblx0XCIuL215XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9teS5qc1wiLFxuXHRcIi4vbXkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL215LmpzXCIsXG5cdFwiLi9uYlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmIuanNcIixcblx0XCIuL25iLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9uYi5qc1wiLFxuXHRcIi4vbmVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25lLmpzXCIsXG5cdFwiLi9uZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmUuanNcIixcblx0XCIuL25sXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubC5qc1wiLFxuXHRcIi4vbmwtYmVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25sLWJlLmpzXCIsXG5cdFwiLi9ubC1iZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmwtYmUuanNcIixcblx0XCIuL25sLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubC5qc1wiLFxuXHRcIi4vbm5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25uLmpzXCIsXG5cdFwiLi9ubi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbm4uanNcIixcblx0XCIuL3BhLWluXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wYS1pbi5qc1wiLFxuXHRcIi4vcGEtaW4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3BhLWluLmpzXCIsXG5cdFwiLi9wbFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcGwuanNcIixcblx0XCIuL3BsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wbC5qc1wiLFxuXHRcIi4vcHRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3B0LmpzXCIsXG5cdFwiLi9wdC1iclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcHQtYnIuanNcIixcblx0XCIuL3B0LWJyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wdC1ici5qc1wiLFxuXHRcIi4vcHQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3B0LmpzXCIsXG5cdFwiLi9yb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcm8uanNcIixcblx0XCIuL3JvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9yby5qc1wiLFxuXHRcIi4vcnVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3J1LmpzXCIsXG5cdFwiLi9ydS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcnUuanNcIixcblx0XCIuL3NkXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zZC5qc1wiLFxuXHRcIi4vc2QuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NkLmpzXCIsXG5cdFwiLi9zZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2UuanNcIixcblx0XCIuL3NlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zZS5qc1wiLFxuXHRcIi4vc2lcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NpLmpzXCIsXG5cdFwiLi9zaS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2kuanNcIixcblx0XCIuL3NrXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zay5qc1wiLFxuXHRcIi4vc2suanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NrLmpzXCIsXG5cdFwiLi9zbFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2wuanNcIixcblx0XCIuL3NsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zbC5qc1wiLFxuXHRcIi4vc3FcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NxLmpzXCIsXG5cdFwiLi9zcS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3EuanNcIixcblx0XCIuL3NyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zci5qc1wiLFxuXHRcIi4vc3ItY3lybFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3ItY3lybC5qc1wiLFxuXHRcIi4vc3ItY3lybC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3ItY3lybC5qc1wiLFxuXHRcIi4vc3IuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NyLmpzXCIsXG5cdFwiLi9zc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3MuanNcIixcblx0XCIuL3NzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zcy5qc1wiLFxuXHRcIi4vc3ZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3N2LmpzXCIsXG5cdFwiLi9zdi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3YuanNcIixcblx0XCIuL3N3XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zdy5qc1wiLFxuXHRcIi4vc3cuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3N3LmpzXCIsXG5cdFwiLi90YVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGEuanNcIixcblx0XCIuL3RhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90YS5qc1wiLFxuXHRcIi4vdGVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RlLmpzXCIsXG5cdFwiLi90ZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGUuanNcIixcblx0XCIuL3RldFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGV0LmpzXCIsXG5cdFwiLi90ZXQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RldC5qc1wiLFxuXHRcIi4vdGdcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RnLmpzXCIsXG5cdFwiLi90Zy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGcuanNcIixcblx0XCIuL3RoXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90aC5qc1wiLFxuXHRcIi4vdGguanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RoLmpzXCIsXG5cdFwiLi90bC1waFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGwtcGguanNcIixcblx0XCIuL3RsLXBoLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90bC1waC5qc1wiLFxuXHRcIi4vdGxoXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90bGguanNcIixcblx0XCIuL3RsaC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGxoLmpzXCIsXG5cdFwiLi90clwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHIuanNcIixcblx0XCIuL3RyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ci5qc1wiLFxuXHRcIi4vdHpsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90emwuanNcIixcblx0XCIuL3R6bC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHpsLmpzXCIsXG5cdFwiLi90em1cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3R6bS5qc1wiLFxuXHRcIi4vdHptLWxhdG5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3R6bS1sYXRuLmpzXCIsXG5cdFwiLi90em0tbGF0bi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHptLWxhdG4uanNcIixcblx0XCIuL3R6bS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHptLmpzXCIsXG5cdFwiLi91Zy1jblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdWctY24uanNcIixcblx0XCIuL3VnLWNuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91Zy1jbi5qc1wiLFxuXHRcIi4vdWtcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VrLmpzXCIsXG5cdFwiLi91ay5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdWsuanNcIixcblx0XCIuL3VyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ci5qc1wiLFxuXHRcIi4vdXIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VyLmpzXCIsXG5cdFwiLi91elwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXouanNcIixcblx0XCIuL3V6LWxhdG5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3V6LWxhdG4uanNcIixcblx0XCIuL3V6LWxhdG4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3V6LWxhdG4uanNcIixcblx0XCIuL3V6LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ei5qc1wiLFxuXHRcIi4vdmlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3ZpLmpzXCIsXG5cdFwiLi92aS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdmkuanNcIixcblx0XCIuL3gtcHNldWRvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS94LXBzZXVkby5qc1wiLFxuXHRcIi4veC1wc2V1ZG8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3gtcHNldWRvLmpzXCIsXG5cdFwiLi95b1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUveW8uanNcIixcblx0XCIuL3lvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS95by5qc1wiLFxuXHRcIi4vemgtY25cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLWNuLmpzXCIsXG5cdFwiLi96aC1jbi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtY24uanNcIixcblx0XCIuL3poLWhrXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC1oay5qc1wiLFxuXHRcIi4vemgtaGsuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLWhrLmpzXCIsXG5cdFwiLi96aC10d1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtdHcuanNcIixcblx0XCIuL3poLXR3LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC10dy5qc1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHR2YXIgaWQgPSBtYXBbcmVxXTtcblx0aWYoIShpZCArIDEpKSB7IC8vIGNoZWNrIGZvciBudW1iZXIgb3Igc3RyaW5nXG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBpZDtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUgc3luYyByZWN1cnNpdmUgXlxcXFwuXFxcXC8uKiRcIjsiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgQ2FsZW5kYXIgZnJvbSAnLi9jb21wb25lbnRzL0NhbGVuZGFyL0NhbGVuZGFyJztcclxuaW1wb3J0IFdpekV2ZW50RGF0YUxvYWRlciBmcm9tICcuL21vZGVscy9XaXpFdmVudERhdGFMb2FkZXInO1xyXG5pbXBvcnQgQ2FsZW5kYXJFdmVudCBmcm9tICcuL21vZGVscy9DYWxlbmRhckV2ZW50JztcclxuaW1wb3J0IEV2ZW50UG9wb3ZlciBmcm9tICcuL2NvbXBvbmVudHMvRXZlbnRQb3BvdmVyL0V2ZW50UG9wb3Zlcic7XHJcbmltcG9ydCBFdmVudENyZWF0ZU1vZGFsIGZyb20gJy4vY29tcG9uZW50cy9Nb2RhbC9FdmVudENyZWF0ZU1vZGFsJztcclxuaW1wb3J0IEV2ZW50RWRpdE1vZGFsIGZyb20gJy4vY29tcG9uZW50cy9Nb2RhbC9FdmVudEVkaXRNb2RhbCc7XHJcbmltcG9ydCB7IHJnYjJoc2wgfSBmcm9tICcuL3V0aWxzL3V0aWxzJztcclxuaW1wb3J0IHsgV2l6Q29uZmlybSwgV2l6RGF0YWJhc2UgYXMgb2JqRGF0YWJhc2UsIFdpekV4cGxvcmVyV2luZG93IGFzIG9ialdpbmRvdyB9IGZyb20gJy4vdXRpbHMvV2l6SW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLmRhdGFMb2FkZXIgPSBuZXcgV2l6RXZlbnREYXRhTG9hZGVyKCk7XHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBpc1Nob3dpbmdFdmVudDogZmFsc2UsXHJcbiAgICAgICAgICAgIGlzRWRpdGluZ0V2ZW50OiBmYWxzZSxcclxuICAgICAgICAgICAgaXNDcmVhdGluZ0V2ZW50OiBmYWxzZSxcclxuICAgICAgICAgICAgY2xpY2tlZEFyZ3M6IG51bGwsXHJcbiAgICAgICAgICAgIGVkaXRpbmdFdmVudDogbnVsbCxcclxuICAgICAgICAgICAgc2VsZWN0ZWRSYW5nZTogbnVsbFxyXG4gICAgICAgIH1cclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQ2FsZW5kYXJSZW5kZXIgPSB0aGlzLmhhbmRsZUNhbGVuZGFyUmVuZGVyLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVFdmVudENsaWNrID0gdGhpcy5oYW5kbGVFdmVudENsaWNrLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVWaWV3UmVuZGVyID0gdGhpcy5oYW5kbGVWaWV3UmVuZGVyLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVFdmVudERyb3AgPSB0aGlzLmhhbmRsZUV2ZW50RHJvcC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlRXZlbnRSZXNpemUgPSB0aGlzLmhhbmRsZUV2ZW50UmVzaXplLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVFdmVudFJlbmRlciA9IHRoaXMuaGFuZGxlRXZlbnRSZW5kZXIuYmluZCh0aGlzKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuaGFuZGxlUG9wb3ZlckhpZGUgPSB0aGlzLmhhbmRsZVBvcG92ZXJIaWRlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVEYXRlU2VsZWN0ID0gdGhpcy5oYW5kbGVEYXRlU2VsZWN0LmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVNb2RhbENsb3NlID0gdGhpcy5oYW5kbGVNb2RhbENsb3NlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLmhhbmRsZUV2ZW50Q3JlYXRlID0gdGhpcy5oYW5kbGVFdmVudENyZWF0ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlRXZlbnRTYXZlID0gdGhpcy5oYW5kbGVFdmVudFNhdmUuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUV2ZW50RWRpdCA9IHRoaXMuaGFuZGxlRXZlbnRFZGl0LmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVFdmVudENvbXBsZXRlID0gdGhpcy5oYW5kbGVFdmVudENvbXBsZXRlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVFdmVudERlbGV0ZURhdGEgPSB0aGlzLmhhbmRsZUV2ZW50RGVsZXRlRGF0YS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlRXZlbnREZWxldGVEb2MgPSB0aGlzLmhhbmRsZUV2ZW50RGVsZXRlRG9jLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVFdmVudE9wZW5Eb2MgPSB0aGlzLmhhbmRsZUV2ZW50T3BlbkRvYy5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlRXZlbnRFZGl0T3JpZ2luRGF0YSA9IHRoaXMuaGFuZGxlRXZlbnRFZGl0T3JpZ2luRGF0YS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8vIOWkhOeQhkZ1bGxDYWxlbmRhcuS6i+S7tlxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgaGFuZGxlQ2FsZW5kYXJSZW5kZXIoZWwpIHtcclxuICAgICAgICAvLyDojrflvpdET03lhYPntKDnlKjkuo7mk43kvZxGdWxsQ2FsZW5kYXJcclxuICAgICAgICB0aGlzLmNhbGVuZGFyID0gZWw7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlRXZlbnRDbGljayggZXZlbnQsIGpzRXZlbnQsIHZpZXcgKSB7XHJcbiAgICAgICAgY29uc3QgYXJncyA9IHsgZXZlbnQsIGpzRXZlbnQsIHZpZXcgfVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBpc1Nob3dpbmdFdmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgY2xpY2tlZEFyZ3M6IGFyZ3NcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVZpZXdSZW5kZXIoIHZpZXcsIGVsZW1lbnQgKSB7XHJcbiAgICAgICAgLy8g5Yi35paw6KeG5Zu+77yM6YeN5paw6I635Y+W5pel5Y6G5LqL5Lu2XHJcbiAgICAgICAgY29uc3QgJGNhbGVuZGFyID0gJCh0aGlzLmNhbGVuZGFyKTtcclxuICAgICAgICBjb25zdCBldmVudFNvdXJjZXMgPSB0aGlzLmRhdGFMb2FkZXIuZ2V0RXZlbnRTb3VyY2VzKCB2aWV3LCBlbGVtZW50ICk7XHJcbiAgICAgICAgJGNhbGVuZGFyLmZ1bGxDYWxlbmRhcigncmVtb3ZlRXZlbnRzJyk7XHJcbiAgICAgICAgZm9yIChsZXQgaT0wIDsgaSA8IGV2ZW50U291cmNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAkY2FsZW5kYXIuZnVsbENhbGVuZGFyKCdhZGRFdmVudFNvdXJjZScsIGV2ZW50U291cmNlc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUV2ZW50RHJvcCggZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldyApIHtcclxuICAgICAgICBpZiAoZXZlbnQuaWQpe1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFMb2FkZXIudXBkYXRlRXZlbnREYXRhT25Ecm9wKGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXcpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV2ZXJ0RnVuYygpO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUV2ZW50UmVzaXplKCBldmVudCwgZGVsdGEsIHJldmVydEZ1bmMsIGpzRXZlbnQsIHVpLCB2aWV3ICkge1xyXG4gICAgICAgIGlmIChldmVudC5pZCl7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YUxvYWRlci51cGRhdGVFdmVudERhdGFPblJlc2l6ZShldmVudCwgZGVsdGEsIHJldmVydEZ1bmMsIGpzRXZlbnQsIHVpLCB2aWV3KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXZlcnRGdW5jKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUV2ZW50UmVuZGVyKCBldmVudE9iaiwgJGVsICkge1xyXG4gICAgICAgIC8vIOiuvue9ruaWh+acrOminOiJslxyXG4gICAgICAgIGNvbnN0IHJnYlN0cmluZyA9ICRlbC5jc3MoJ2JhY2tncm91bmQtY29sb3InKTtcclxuICAgICAgICBjb25zdCByZ2JBcnJheSA9IC9ecmdiXFwoKFxcZCopLCAoXFxkKiksIChcXGQqKVxcKSQvLmV4ZWMocmdiU3RyaW5nKTtcclxuICAgICAgICBpZiAocmdiQXJyYXkpIHtcclxuICAgICAgICAgICAgY29uc3QgaHNsID0gcmdiMmhzbChyZ2JBcnJheVsxXSwgcmdiQXJyYXlbMl0sIHJnYkFycmF5WzNdKTtcclxuICAgICAgICAgICAgY29uc3QgbGlnaHRuZXNzID0gaHNsWzJdIC0gTWF0aC5jb3MoIChoc2xbMF0rNzApIC8gMTgwKk1hdGguUEkgKSAqIDAuMTU7XHJcbiAgICAgICAgICAgIGNvbnN0IHRleHRDb2xvciA9IGxpZ2h0bmVzcyA+IDAuNSA/ICcjMjIyJyA6ICd3aGl0ZSc7XHJcbiAgICAgICAgICAgICRlbC5jc3MoJ2NvbG9yJywgdGV4dENvbG9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5YWD57Sg5bey57uP5riy5p+T77yM5Y+v5L+u5pS55YWD57SgXHJcbiAgICAgICAgY29uc3QgaXNDb21wbGV0ZSA9IHBhcnNlSW50KGV2ZW50T2JqLmNvbXBsZXRlKSA9PSA1O1xyXG4gICAgICAgIGlmICggaXNDb21wbGV0ZSApIHtcclxuICAgICAgICAgICAgLy8g5qC35byPXHJcbiAgICAgICAgICAgICRlbC5hZGRDbGFzcygndGMtY29tcGxldGUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5aSE55CG55So5oi35LqL5Lu2XHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICBoYW5kbGVQb3BvdmVySGlkZSgpIHtcclxuICAgICAgICAvL+avj+asoeWHuueOsOmDvea4suafk+S4gOS4quaWsOeahFBvcG92ZXJcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgaXNTaG93aW5nRXZlbnQ6IGZhbHNlXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVEYXRlU2VsZWN0KCBzdGFydCwgZW5kLCBqc0V2ZW50LCB2aWV3ICkge1xyXG4gICAgICAgIGNvbnN0IGFyZ3MgPSB7c3RhcnQsIGVuZCwganNFdmVudCwgdmlld307XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGlzQ3JlYXRpbmdFdmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgc2VsZWN0ZWRSYW5nZTogYXJnc1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlTW9kYWxDbG9zZSgpIHtcclxuICAgICAgICBjb25zdCAkY2FsZW5kYXIgPSAkKHRoaXMuY2FsZW5kYXIpO1xyXG4gICAgICAgICRjYWxlbmRhci5mdWxsQ2FsZW5kYXIoJ3Vuc2VsZWN0JylcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBpc0VkaXRpbmdFdmVudDogZmFsc2UsXHJcbiAgICAgICAgICAgIGlzQ3JlYXRpbmdFdmVudDogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDlpITnkIbmjInpkq7lip/og71cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIGhhbmRsZUV2ZW50Q3JlYXRlKGV2ZW50RGF0YSkge1xyXG4gICAgICAgIGxldCB7IHN0YXJ0LCBlbmQsIGFsbERheSwgdGl0bGUsIGJhY2tncm91bmRDb2xvciB9ID0gZXZlbnREYXRhO1xyXG4gICAgICAgIGNvbnN0IG1vbWVudCA9IHRoaXMuZnVsbENhbGVuZGFyLm1vbWVudC5iaW5kKHRoaXMuZnVsbENhbGVuZGFyKTtcclxuICAgICAgICAvLyDlpITnkIbml6XnqIvmlbDmja5cclxuICAgICAgICBzdGFydCA9IG1vbWVudChzdGFydCksIGVuZCA9IG1vbWVudChlbmQpO1xyXG4gICAgICAgIGFsbERheSA9ICEoIHN0YXJ0Lmhhc1RpbWUoKSAmJiBlbmQuaGFzVGltZSgpICk7XHJcbiAgICAgICAgLy8g5paw5bu65pel56iLXHJcbiAgICAgICAgY29uc3QgbmV3RXZlbnQgPSBuZXcgQ2FsZW5kYXJFdmVudCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZSB8fCAn5peg5qCH6aKYJywgXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogYmFja2dyb3VuZENvbG9yIHx8ICcjMzJDRDMyJyxcclxuICAgICAgICAgICAgc3RhcnQsIGVuZCwgYWxsRGF5XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbmV3RXZlbnQuc2F2ZVRvV2l6RXZlbnREb2MoKTtcclxuICAgICAgICAvLyDmt7vliqDliLDml6XljoZcclxuXHRcdCQodGhpcy5jYWxlbmRhcikuZnVsbENhbGVuZGFyKCAnYWRkRXZlbnRTb3VyY2UnLCB7XHJcblx0XHRcdGV2ZW50czogW1xyXG5cdFx0XHRcdG5ld0V2ZW50LnRvRnVsbENhbGVuZGFyRXZlbnQoKVxyXG5cdFx0XHRdXHJcblx0XHR9KTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVFdmVudFNhdmUoZXZlbnQsIG5ld0V2ZW50RGF0YSkge1xyXG4gICAgICAgIGZvciAoY29uc3QgcHJvcCBpbiBuZXdFdmVudERhdGEpIHtcclxuICAgICAgICAgICAgZXZlbnRbcHJvcF0gPSBuZXdFdmVudERhdGFbcHJvcF1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbmV3RXZlbnQgPSBuZXcgQ2FsZW5kYXJFdmVudChldmVudCk7XHJcbiAgICAgICAgbmV3RXZlbnQuc2F2ZVRvV2l6RXZlbnREb2MoKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgICQodGhpcy5jYWxlbmRhcikuZnVsbENhbGVuZGFyKCAndXBkYXRlRXZlbnQnLCBldmVudCApO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUV2ZW50Q29tcGxldGUoZXZlbnQpIHtcclxuICAgICAgICAvLyDkv67mlLnmlbDmja5cclxuICAgICAgICBjb25zdCBpc0NvbXBsZXRlID0gcGFyc2VJbnQoZXZlbnQuY29tcGxldGUpID09IDU7XHJcbiAgICAgICAgaWYgKCBpc0NvbXBsZXRlICkge1xyXG4gICAgICAgICAgICBldmVudC5jb21wbGV0ZSA9ICcwJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBldmVudC5jb21wbGV0ZSA9ICc1JztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5L+d5a2Y5pWw5o2uXHJcbiAgICAgICAgY29uc3QgbmV3RXZlbnQgPSBuZXcgQ2FsZW5kYXJFdmVudChldmVudCk7XHJcbiAgICAgICAgbmV3RXZlbnQuc2F2ZVRvV2l6RXZlbnREb2MoKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgICQodGhpcy5jYWxlbmRhcikuZnVsbENhbGVuZGFyKCAndXBkYXRlRXZlbnQnLCBldmVudCApO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUV2ZW50RWRpdChldmVudCkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBpc0VkaXRpbmdFdmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgZWRpdGluZ0V2ZW50OiBldmVudFxyXG4gICAgICAgIH0pICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVFdmVudERlbGV0ZURhdGEoZXZlbnQpIHtcclxuICAgICAgICBpZiAoIFdpekNvbmZpcm0oXCLnoa7lrpropoHliKDpmaTor6Xml6XnqIvvvJ9cIiwgJ+eVquiMhOWKqeeQhicpICkge1xyXG4gICAgICAgICAgICAvLyDliKDpmaTml6XnqItcclxuICAgICAgICAgICAgbGV0IG5ld0V2ZW50ID0gbmV3IENhbGVuZGFyRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgICAgICBuZXdFdmVudC5kZWxldGVFdmVudERhdGEoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHRcdCQodGhpcy5jYWxlbmRhcikuZnVsbENhbGVuZGFyKCdyZW1vdmVFdmVudHMnLCBldmVudC5pZCk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlRXZlbnREZWxldGVEb2MoZXZlbnQpIHtcclxuICAgICAgICBpZiAoIFdpekNvbmZpcm0oXCLnoa7lrpropoHliKDpmaTor6Xml6XnqIvmupDmlofmoaPvvJ9cXG7jgIznoa7lrprjgI3lsIbkvJrlr7zoh7Tnm7jlhbPnrJTorrDooqvliKDpmaTvvIFcIiwgJ+eVquiMhOWKqeeQhicpICkge1xyXG4gICAgICAgICAgICBsZXQgbmV3RXZlbnQgPSBuZXcgQ2FsZW5kYXJFdmVudChldmVudCk7XHJcbiAgICAgICAgICAgIG5ld0V2ZW50LmRlbGV0ZUV2ZW50RGF0YSh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJCh0aGlzLmNhbGVuZGFyKS5mdWxsQ2FsZW5kYXIoJ3JlbW92ZUV2ZW50cycsIGV2ZW50LmlkKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVFdmVudE9wZW5Eb2MoZXZlbnQpIHtcclxuICAgICAgICBjb25zdCBkb2MgPSBvYmpEYXRhYmFzZS5Eb2N1bWVudEZyb21HVUlEKGV2ZW50LmlkKTtcclxuICAgICAgICBvYmpXaW5kb3cuVmlld0RvY3VtZW50KGRvYywgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlRXZlbnRFZGl0T3JpZ2luRGF0YShldmVudCkge1xyXG4gICAgICAgIGNvbnN0IGRvYyA9IG9iakRhdGFiYXNlLkRvY3VtZW50RnJvbUdVSUQoZXZlbnQuaWQpO1xyXG4gICAgICAgIG9iakNvbW1vbi5FZGl0Q2FsZW5kYXJFdmVudChkb2MpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOeUn+WRveWRqOacn1xyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5mdWxsQ2FsZW5kYXIgPSAkKHRoaXMuY2FsZW5kYXIpLmZ1bGxDYWxlbmRhcignZ2V0Q2FsZW5kYXInKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgaWQ9J3dpei10b21hdG8tY2FsZW5kYXInID5cclxuICAgICAgICAgICAgICAgIDxDYWxlbmRhciBcclxuICAgICAgICAgICAgICAgICAgICBvbkV2ZW50Q2xpY2s9e3RoaXMuaGFuZGxlRXZlbnRDbGlja30gXHJcbiAgICAgICAgICAgICAgICAgICAgb25WaWV3UmVuZGVyPXt0aGlzLmhhbmRsZVZpZXdSZW5kZXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgb25FdmVudERyb3A9e3RoaXMuaGFuZGxlRXZlbnREcm9wfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uRXZlbnRSZXNpemU9e3RoaXMuaGFuZGxlRXZlbnRSZXNpemV9XHJcbiAgICAgICAgICAgICAgICAgICAgb25FdmVudFJlbmRlcj17dGhpcy5oYW5kbGVFdmVudFJlbmRlcn1cclxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdD17dGhpcy5oYW5kbGVEYXRlU2VsZWN0fVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2FsZW5kYXJSZW5kZXI9e3RoaXMuaGFuZGxlQ2FsZW5kYXJSZW5kZXJ9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICEhdGhpcy5zdGF0ZS5zZWxlY3RlZFJhbmdlICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxFdmVudENyZWF0ZU1vZGFsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXsnY3JlYXRlJyArIHRoaXMuc3RhdGUuc2VsZWN0ZWRSYW5nZS5qc0V2ZW50LnBhZ2VYfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvdz17dGhpcy5zdGF0ZS5pc0NyZWF0aW5nRXZlbnR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbk1vZGFsQ2xvc2U9e3RoaXMuaGFuZGxlTW9kYWxDbG9zZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGVuZGFyPXt0aGlzLmNhbGVuZGFyfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDcmVhdGluZ0V2ZW50PXt0aGlzLnN0YXRlLmlzQ3JlYXRpbmdFdmVudH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkUmFuZ2U9e3RoaXMuc3RhdGUuc2VsZWN0ZWRSYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRXZlbnRDcmVhdGU9e3RoaXMuaGFuZGxlRXZlbnRDcmVhdGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgISF0aGlzLnN0YXRlLmVkaXRpbmdFdmVudCAmJiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgPEV2ZW50RWRpdE1vZGFsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXsnZWRpdCcgKyB0aGlzLnN0YXRlLmVkaXRpbmdFdmVudC5pZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3c9e3RoaXMuc3RhdGUuaXNFZGl0aW5nRXZlbnR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbk1vZGFsQ2xvc2U9e3RoaXMuaGFuZGxlTW9kYWxDbG9zZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRpbmdFdmVudD17dGhpcy5zdGF0ZS5lZGl0aW5nRXZlbnR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25FdmVudFNhdmU9e3RoaXMuaGFuZGxlRXZlbnRTYXZlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25FdmVudENvbXBsZXRlPXt0aGlzLmhhbmRsZUV2ZW50Q29tcGxldGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkV2ZW50RGVsZXRlRGF0YT17dGhpcy5oYW5kbGVFdmVudERlbGV0ZURhdGF9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkV2ZW50RGVsZXRlRG9jPXt0aGlzLmhhbmRsZUV2ZW50RGVsZXRlRG9jfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25FdmVudE9wZW5Eb2M9e3RoaXMuaGFuZGxlRXZlbnRPcGVuRG9jfSAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25FdmVudEVkaXRPcmlnaW5EYXRhPXt0aGlzLmhhbmRsZUV2ZW50RWRpdE9yaWdpbkRhdGF9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgISF0aGlzLnN0YXRlLmlzU2hvd2luZ0V2ZW50ICYmIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8RXZlbnRQb3BvdmVyIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXsncG9wb3ZlcicgKyB0aGlzLnN0YXRlLmNsaWNrZWRBcmdzLmV2ZW50LmlkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ9e3RoaXMuc3RhdGUuY2xpY2tlZEFyZ3MuZXZlbnR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZlcmVuY2U9e3RoaXMuc3RhdGUuY2xpY2tlZEFyZ3MuanNFdmVudC50YXJnZXR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblBvcG92ZXJIaWRlPXt0aGlzLmhhbmRsZVBvcG92ZXJIaWRlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRXZlbnRTYXZlPXt0aGlzLmhhbmRsZUV2ZW50U2F2ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRXZlbnRDb21wbGV0ZT17dGhpcy5oYW5kbGVFdmVudENvbXBsZXRlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25FdmVudEVkaXQ9e3RoaXMuaGFuZGxlRXZlbnRFZGl0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25FdmVudERlbGV0ZURhdGE9e3RoaXMuaGFuZGxlRXZlbnREZWxldGVEYXRhfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25FdmVudERlbGV0ZURvYz17dGhpcy5oYW5kbGVFdmVudERlbGV0ZURvY31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRXZlbnRPcGVuRG9jPXt0aGlzLmhhbmRsZUV2ZW50T3BlbkRvY31cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz4gXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL0NhbGVuZGFyLmNzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9DYWxlbmRhci5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL0NhbGVuZGFyLmNzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBGdWxsQ2FsZW5kYXIgZnJvbSAnLi9GdWxsQ2FsZW5kYXInO1xyXG5pbXBvcnQgJ2Z1bGxjYWxlbmRhci1yZWFjdHdyYXBwZXIvZGlzdC9jc3MvZnVsbGNhbGVuZGFyLm1pbi5jc3MnO1xyXG5pbXBvcnQgJy4vQ2FsZW5kYXIuY3NzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbGVuZGFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGV2ZW50czogW11cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jYWxlbmRhciA9IG51bGw7XHJcbiAgICAgICAgLy/nu5Hlrprlj6Xmn4RcclxuICAgICAgICB0aGlzLmhhbmRsZUZ1bGxDYWxlbmRhclJlbmRlciA9IHRoaXMuaGFuZGxlRnVsbENhbGVuZGFyUmVuZGVyLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5LqL5Lu25Y+l5p+EXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICBoYW5kbGVGdWxsQ2FsZW5kYXJSZW5kZXIoZWwpIHtcclxuICAgICAgICAvLyBGdWxsQ2FsZW5kYXIg5riy5p+T5LmL5YmN5omn6KGM5q2k5Y+l5p+E77yM5Lyg5YWlRE9NXHJcbiAgICAgICAgdGhpcy5jYWxlbmRhciA9IGVsO1xyXG4gICAgICAgIHRoaXMucHJvcHMub25DYWxlbmRhclJlbmRlcihlbCk7XHJcbiAgICB9XHJcbiBcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDorr7nva7kuovku7blj6Xmn4RcclxuICAgICAgICAgKiDlm6DkuLpmdWxsY2FsZW5kYXItcmVhY3RXcmFwcGVy55qE5a6e546w5piv55u05o6l6L+U5ZuePGRpdiBpZD0nZnVsbGNhbGVuZGFyJz48L2Rpdj5cclxuICAgICAgICAgKiDlubbkuJTosIPnlKgkKCcjZnVsbGNhbGVuZGFyJykuZnVsbGNhbGVuZGFyKHRoaXMucHJvcHMp6L+b6KGM5p6E5bu677yM5Zug5q2kUmVhY3TlubbmsqHmnIlcclxuICAgICAgICAgKiDnrqHnkIZGdWxsQ2FsZW5kYXLnirbmgIHlkozmuLLmn5PnmoTog73lipvjgILmiYDku6Xnm7TmjqXlnKjorr7nva7kuK3lgZrlpb1jYWxsYmFja++8jOiuqeaPkuS7tuiHquaIkeeuoeeQhuOAglxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJjYWxlbmRhci1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgIDxGdWxsQ2FsZW5kYXIgb25GdWxsQ2FsZW5kYXJSZW5kZXIgPSB7dGhpcy5oYW5kbGVGdWxsQ2FsZW5kYXJSZW5kZXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5Z+65pys6YWN572uXHJcbiAgICAgICAgICAgICAgICAgICAgaWQgPSBcImNhbGVuZGFyXCJcclxuICAgICAgICAgICAgICAgICAgICB0aGVtZVN5c3RlbSA9ICdzdGFuZGFyZCdcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQgPSAncGFyZW50J1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlciA9IHt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6ICdwcmV2LG5leHQsdG9kYXknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjZW50ZXI6ICd0aXRsZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAnbW9udGgsYWdlbmRhV2VlayxhZ2VuZGFEYXksbGlzdFdlZWsnXHJcbiAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAvLyDkuK3mlofljJZcclxuICAgICAgICAgICAgICAgICAgICBidXR0b25UZXh0ID0ge3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9kYXk6ICfku4rlpKknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aDogJ+aciCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlZWs6ICflkagnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXk6ICfml6UnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0OiAn6KGoJ1xyXG4gICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgbW9udGhOYW1lcyA9IHtbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcx5pyIJywgJzLmnIgnLCAnM+aciCcsICc05pyIJywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc15pyIJywgJzbmnIgnLCAnN+aciCcsICc45pyIJywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc55pyIJywgJzEw5pyIJywgJzEx5pyIJywgJzEy5pyIJ1xyXG4gICAgICAgICAgICAgICAgICAgIF19XHJcbiAgICAgICAgICAgICAgICAgICAgbW9udGhOYW1lc1Nob3J0ID0ge1tcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzHmnIgnLCAnMuaciCcsICcz5pyIJywgJzTmnIgnLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzXmnIgnLCAnNuaciCcsICc35pyIJywgJzjmnIgnLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgJznmnIgnLCAnMTDmnIgnLCAnMTHmnIgnLCAnMTLmnIgnXHJcbiAgICAgICAgICAgICAgICAgICAgXX1cclxuICAgICAgICAgICAgICAgICAgICBkYXlOYW1lcyA9IHtbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICflkajml6UnLCAn5ZGo5LiAJywgJ+WRqOS6jCcsICflkajkuIknLCAn5ZGo5ZubJywgJ+WRqOS6lCcsICflkajlha0nXHJcbiAgICAgICAgICAgICAgICAgICAgXX1cclxuICAgICAgICAgICAgICAgICAgICBkYXlOYW1lc1Nob3J0ID0ge1tcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ+WRqOaXpScsICflkajkuIAnLCAn5ZGo5LqMJywgJ+WRqOS4iScsICflkajlm5snLCAn5ZGo5LqUJywgJ+WRqOWFrSdcclxuICAgICAgICAgICAgICAgICAgICBdfVxyXG4gICAgICAgICAgICAgICAgICAgIGFsbERheVRleHQgPSAn5YWo5aSpJ1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOiuvue9ruinhuWbvlxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWaWV3ID0gJ2FnZW5kYVdlZWsnXHJcbiAgICAgICAgICAgICAgICAgICAgbm93SW5kaWNhdG9yID0ge3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3REYXkgPSB7MX1cclxuICAgICAgICAgICAgICAgICAgICB2aWV3cyA9IHt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFnZW5kYToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluVGltZTogXCIwODowMDowMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xvdExhYmVsRm9ybWF0OiAnaCg6bW0pIGEnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgbmF2TGlua3M9IHt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgIGFsbERheURlZmF1bHQgPSB7ZmFsc2V9XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRMaW1pdD0ge3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6K6+572u5LqL5Lu2XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0YWJsZSA9IHt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdEhlbHBlciA9IHt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRhYmxlID0ge3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yY2VFdmVudER1cmF0aW9uID0ge3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6K6+572uVUlcclxuICAgICAgICAgICAgICAgICAgICB1bnNlbGVjdENhbmNlbCA9ICcubW9kYWwgKidcclxuICAgICAgICAgICAgICAgICAgICBkcmFnT3BhY2l0eSA9IHt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibW9udGhcIjogLjUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWdlbmRhV2Vla1wiOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFnZW5kYURheVwiOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAvLyDorr7nva7lj6Xmn4RcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3QgPSB7dGhpcy5wcm9wcy5vblNlbGVjdH1cclxuICAgICAgICAgICAgICAgICAgICB2aWV3UmVuZGVyID0ge3RoaXMucHJvcHMub25WaWV3UmVuZGVyfVxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50UmVuZGVyID0ge3RoaXMucHJvcHMub25FdmVudFJlbmRlcn1cclxuICAgICAgICAgICAgICAgICAgICBldmVudENsaWNrID0ge3RoaXMucHJvcHMub25FdmVudENsaWNrfVxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50RHJvcCA9IHt0aGlzLnByb3BzLm9uRXZlbnREcm9wfVxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50UmVzaXplID0ge3RoaXMucHJvcHMub25FdmVudFJlc2l6ZX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgJCBmcm9tIFwianF1ZXJ5XCI7XHJcbmltcG9ydCAnZnVsbGNhbGVuZGFyJztcclxuaW1wb3J0ICdtb21lbnQnO1xyXG5cclxuY2xhc3MgRnVsbGNhbGVuZGFyT2JqZWN0TWFwcGVye1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblxyXG5cdH1cclxuXHJcblx0Z2V0U2V0dGluZ3MocHJvcGVydGllcyl7XHJcblx0XHRsZXQgbmV3U2V0dGluZ3MgPSB7fTtcclxuXHRcdGZvciAoY29uc3Qga2V5IGluIHByb3BlcnRpZXMpIHtcclxuICAgICAgXHRcdGlmIChwcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICBcdFx0bmV3U2V0dGluZ3Nba2V5XSA9IHByb3BlcnRpZXNba2V5XTtcclxuICAgICAgXHRcdH1cclxuICAgIFx0fVxyXG4gICAgXHRyZXR1cm4gbmV3U2V0dGluZ3M7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGdWxsQ2FsZW5kYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLmpxID0gJC5ub0NvbmZsaWN0KCk7XHJcblx0XHR0aGlzLmZ1bGxjYWxlbmRhck9iamVjdE1hcHBlciA9IG5ldyBGdWxsY2FsZW5kYXJPYmplY3RNYXBwZXIoKTtcclxuXHRcdHRoaXMuaW5zdGFuY2UgPSBudWxsO1xyXG5cdFx0dGhpcy5kYXRlID0gbmV3IERhdGUoKTtcclxuXHR9XHJcblxyXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XHJcblx0XHR0aGlzLnByb3BzLm9uRnVsbENhbGVuZGFyUmVuZGVyKHRoaXMuZWwpO1xyXG5cdFx0Y29uc3Qgb2JqZWN0TWFwcGVyU2V0dGluZ3MgPSB0aGlzLmZ1bGxjYWxlbmRhck9iamVjdE1hcHBlci5nZXRTZXR0aW5ncyh0aGlzLnByb3BzKTtcclxuXHRcdHRoaXMuaW5zdGFuY2UgPSB0aGlzLmpxKHRoaXMuZWwpLmZ1bGxDYWxlbmRhcihvYmplY3RNYXBwZXJTZXR0aW5ncyk7XHJcblx0fVxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGlkPSdjYWxlbmRhcicgcmVmPXsgZWwgPT4gdGhpcy5lbCA9IGVsIH0+PC9kaXY+XHJcblx0XHQpXHJcblx0fVxyXG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vRXZlbnRQb3BvdmVyLmNzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9FdmVudFBvcG92ZXIuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9FdmVudFBvcG92ZXIuY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICcuL0V2ZW50UG9wb3Zlci5jc3MnO1xyXG5pbXBvcnQgUG9wcGVyIGZyb20gJ3BvcHBlci5qcyc7XHJcbmltcG9ydCBQb3BvdmVyVGl0bGVJbnB1dCBmcm9tICcuL1BvcG92ZXJUaXRsZUlucHV0JztcclxuaW1wb3J0IFBvcG92ZXJUb29sYmFyIGZyb20gJy4vUG9wb3ZlclRvb2xiYXInO1xyXG5pbXBvcnQgeyBGb3JtLCBHbHlwaGljb24gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5pbXBvcnQgRGF0ZVRpbWVQaWNrZXJHcm91cCBmcm9tICcuLi9Gb3JtL0RhdGVUaW1lUGlja2VyR3JvdXAnO1xyXG5pbXBvcnQgQ29sb3JQaWNrZXJHcm91cCBmcm9tICcuLi9Gb3JtL0NvbG9yUGlja2VyR3JvdXAnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRQb3BvdmVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMucG9wcGVyTm9kZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5wb3BwZXJJbnN0YW5jZSA9IG51bGw7XHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBuZXdFdmVudERhdGE6IHt9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOe7keWumuS6i+S7tlxyXG4gICAgICAgIHRoaXMuYXV0b0hpZGUgPSB0aGlzLmF1dG9IaWRlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVEYXRlVGltZUNoYW5nZSA9IHRoaXMuaGFuZGxlRGF0ZVRpbWVDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZVRpdGxlQ2hhbmdlID0gdGhpcy5oYW5kbGVUaXRsZUNoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQ29sb3JDaGFuZ2UgPSB0aGlzLmhhbmRsZUNvbG9yQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVCdG5DbGljayA9IHRoaXMuaGFuZGxlQnRuQ2xpY2suYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDliqjnlLvmlYjmnpxcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIGF1dG9IaWRlKGUpIHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIC8vIOS4jeaYr+aXpeWOhuS6i+S7tuWFg+e0oFxyXG4gICAgICAgICAgICAhJCh0aGlzLnByb3BzLnJlZmVyZW5jZSkuaXMoZS50YXJnZXQpICYmXHJcbiAgICAgICAgICAgIC8vIOS5n+S4jeaYr+WtkOWFg+e0oFxyXG4gICAgICAgICAgICAkKHRoaXMucHJvcHMucmVmZXJlbmNlKS5oYXMoZS50YXJnZXQpLmxlbmd0aCA9PT0gMCAmJlxyXG4gICAgICAgICAgICAvLyDkuI3mmK9wb3BwZXLlhYPntKBcclxuICAgICAgICAgICAgISQodGhpcy5wb3BwZXJOb2RlKS5pcyhlLnRhcmdldCkgJiZcclxuICAgICAgICAgICAgLy8g5Lmf5LiN5piv5a2Q5YWD57SgXHJcbiAgICAgICAgICAgICQodGhpcy5wb3BwZXJOb2RlKS5oYXMoZS50YXJnZXQpLmxlbmd0aCA9PT0gMFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZSgpIHtcclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcclxuICAgICAgICAgICAgJCh0aGF0LnBvcHBlck5vZGUpLmhpZGUoMCwgbnVsbCwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHRoYXQucHJvcHMub25Qb3BvdmVySGlkZSgpOyAvL1RPRE86IOS6pOeUseeItuWFg+e0oOWNuOi9veivpee7hOS7tuWunuS+i++8jOaEn+iniei/memHjOS4jeWmpVxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHNob3coKSB7XHJcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XHJcbiAgICAgICAgICAgICQodGhhdC5wb3BwZXJOb2RlKS5mYWRlSW4oMzUwLCBudWxsLCByZXNvbHZlKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOS6i+S7tuWPpeafhFxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgaGFuZGxlVGl0bGVDaGFuZ2UoZSkge1xyXG4gICAgICAgIC8v5YKo5a2Y5Yiw5bCG5paw55qE5YC85YKo5a2YbmV3RXZlbnREYXRh6YeM77yM5b2T5L+d5a2Y5pe25qOA57SibmV3RXZlbnREYXRh5YiX6KGoXHJcbiAgICAgICAgY29uc3QgbmV3VGl0bGUgPSBlLnRhcmdldC52YWx1ZTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKGZ1bmN0aW9uKHByZXZTdGF0ZSwgcHJvcHMpIHtcclxuICAgICAgICAgICAgLy/mi7fotJ3liY3kuIDkuKrlr7nosaFcclxuICAgICAgICAgICAgY29uc3QgbmV3RXZlbnREYXRhID0gJC5leHRlbmQoe30sIHByZXZTdGF0ZS5uZXdFdmVudERhdGEpXHJcbiAgICAgICAgICAgIG5ld0V2ZW50RGF0YS50aXRsZSA9IG5ld1RpdGxlO1xyXG4gICAgICAgICAgICByZXR1cm4geyBuZXdFdmVudERhdGEgfTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNvbG9yQ2hhbmdlKGNvbG9yVmFsdWUpIHtcclxuICAgICAgICBjb25zdCBuZXdDb2xvciA9IGNvbG9yVmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShmdW5jdGlvbihwcmV2U3RhdGUsIHByb3BzKSB7XHJcbiAgICAgICAgICAgIC8v5ou36LSd5YmN5LiA5Liq5a+56LGhXHJcbiAgICAgICAgICAgIGNvbnN0IG5ld0V2ZW50RGF0YSA9ICQuZXh0ZW5kKHt9LCBwcmV2U3RhdGUubmV3RXZlbnREYXRhKVxyXG4gICAgICAgICAgICBuZXdFdmVudERhdGEuYmFja2dyb3VuZENvbG9yID0gbmV3Q29sb3I7XHJcbiAgICAgICAgICAgIHJldHVybiB7IG5ld0V2ZW50RGF0YSB9O1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlRGF0ZVRpbWVDaGFuZ2UoZSkge1xyXG4gICAgICAgIC8v5pqC5pe25LiN5YWB6K645pu05pS5XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQnRuQ2xpY2soZSkge1xyXG4gICAgICAgIGNvbnN0IGlkID0gZS50YXJnZXQuaWQ7XHJcbiAgICAgICAgY29uc3QgYnRuVHlwZSA9IGlkLnNwbGl0KCctJylbMl07XHJcbiAgICAgICAgY29uc3QgaGFuZGxlTmFtZSA9IGBvbkV2ZW50JHtidG5UeXBlfWA7XHJcbiAgICAgICAgdGhpcy5oaWRlKCkudGhlbiggKHJldCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzW2hhbmRsZU5hbWVdKHRoaXMucHJvcHMuZXZlbnQsIHRoaXMuc3RhdGUubmV3RXZlbnREYXRhKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOeUn+WRveWRqOacn1xyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgLy8g5Yid5aeL5YyW57uE5Lu2XHJcbiAgICAgICAgdGhpcy5wb3BwZXJJbnN0YW5jZSA9IG5ldyBQb3BwZXIodGhpcy5wcm9wcy5yZWZlcmVuY2UsIHRoaXMucG9wcGVyTm9kZSwge1xyXG5cdFx0XHRwbGFjZW1lbnQ6ICdhdXRvJyxcclxuXHRcdFx0bW9kaWZpZXJzOiB7XHJcblx0XHRcdFx0YXJyb3c6IHtcclxuXHRcdFx0XHQgIGVsZW1lbnQ6ICcuYXJyb3cnXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0fSk7XHJcbiAgICAgICAgLy8g6K6+572u6Ieq5Yqo6ZqQ6JePXHJcbiAgICAgICAgJChkb2N1bWVudCkub2ZmKCdjbGljaycsIHRoaXMuYXV0b0hpZGUpLm9uKCdjbGljaycsIHRoaXMuYXV0b0hpZGUpO1xyXG4gICAgICAgIC8vIOaYvuekulxyXG4gICAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSwgc25hcHNob3QpIHtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xyXG4gICAgICAgIC8vIOW9k+abtOaWsOWxnuaAp+aXtuaJjeinpuWPkeWKqOeUu+aViOaenFxyXG4gICAgICAgIGlmICggbmV4dFByb3BzICE9IHRoaXMucHJvcHMgKSB7XHJcbiAgICAgICAgICAgIC8vIOiuvue9ruabtOaWsOaXtueahOWKqOeUu1xyXG4gICAgICAgICAgICB0aGlzLmhpZGUoKS50aGVuKCAocmV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL+abtOaWsOWumuS9jVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3BwZXJJbnN0YW5jZS5yZWZlcmVuY2UgPSBuZXh0UHJvcHMucmVmZXJlbmNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3BwZXJJbnN0YW5jZS51cGRhdGUoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5zaG93KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgICQoZG9jdW1lbnQpLm9mZignY2xpY2snLCB0aGlzLmF1dG9IaWRlKTtcclxuICAgICAgICB0aGlzLnBvcHBlckluc3RhbmNlLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgZXZlbnRTdGFydCA9IHRoaXMucHJvcHMuZXZlbnQuc3RhcnQuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcbiAgICAgICAgY29uc3QgY29sb3JWYWx1ZSA9IHRoaXMucHJvcHMuZXZlbnQuYmFja2dyb3VuZENvbG9yO1xyXG4gICAgICAgIGNvbnN0IGVuYWJsZVNhdmVCdG4gPSAhIXRoaXMuc3RhdGUubmV3RXZlbnREYXRhLnRpdGxlIHx8ICEhdGhpcy5zdGF0ZS5uZXdFdmVudERhdGEuYmFja2dyb3VuZENvbG9yO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGMtcG9wb3ZlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tkaXNwbGF5OiAnbm9uZSd9fVxyXG4gICAgICAgICAgICAgICAgICAgIHJlZj17KGRpdikgPT4gdGhpcy5wb3BwZXJOb2RlID0gZGl2fSA+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFycm93XCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRjLXBvcG92ZXItaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPFBvcG92ZXJUaXRsZUlucHV0IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9eyd0aXRsZScgKyB0aGlzLnByb3BzLmV2ZW50LmlkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudFRpdGxlPXt0aGlzLnByb3BzLmV2ZW50LnRpdGxlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvblRpdGxlQ2hhbmdlPXt0aGlzLmhhbmRsZVRpdGxlQ2hhbmdlfSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Rm9ybT0ndGMtcG9wb3Zlci1ldmVudC1lZGl0Rm9ybScgLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0Yy1wb3BvdmVyLWJvZHlcIj5cclxuICAgICAgICAgICAgICAgICAgICA8Rm9ybSBob3Jpem9udGFsIGlkPSd0Yy1wb3BvdmVyLWV2ZW50LWVkaXRGb3JtJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPERhdGVUaW1lUGlja2VyR3JvdXAgaG9yaXpvbnRhbCByZWFkT25seSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xJZD0gJ3RjLWVkaXRwb3BwZXItZXZlbnRkYXRlJyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPXs8aSBjbGFzc05hbWU9J2ZhciBmYS1jYWxlbmRhci1hbHQgZmEtbGcnIC8+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2V2ZW50U3RhcnR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRhdGVUaW1lQ2hhbmdlPXt0aGlzLmhhbmRsZURhdGVUaW1lQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q29sb3JQaWNrZXJHcm91cCBob3Jpem9udGFsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXsnYmFja2dyb3VuZENvbG9yJyArIHRoaXMucHJvcHMuZXZlbnQuaWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sSWQ9J3RjLWVkaXRwb3BwZXItZXZlbnRjb2xvcicgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD17PGkgY2xhc3NOYW1lPSdmYXMgZmEtcGFpbnQtYnJ1c2ggZmEtbGcnIC8+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2NvbG9yVmFsdWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNvbG9yQ2hhbmdlPXt0aGlzLmhhbmRsZUNvbG9yQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvRm9ybT5cclxuICAgICAgICAgICAgICAgICAgICA8UG9wb3ZlclRvb2xiYXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGU9e3RoaXMucHJvcHMuZXZlbnQuY29tcGxldGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZVNhdmVCdG49e2VuYWJsZVNhdmVCdG59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQnRuQ2xpY2s9e3RoaXMuaGFuZGxlQnRuQ2xpY2t9XHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vUG9wb3ZlclRpdGxlSW5wdXQuY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL1BvcG92ZXJUaXRsZUlucHV0LmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vUG9wb3ZlclRpdGxlSW5wdXQuY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICcuL1BvcG92ZXJUaXRsZUlucHV0LmNzcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudFRpdGxlSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIC8v5Yid5aeL5YyW54q25oCBXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMucHJvcHMuZXZlbnRUaXRsZVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlID0gdGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDaGFuZ2UoZSkge1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IGUudGFyZ2V0LnZhbHVlfSlcclxuICAgICAgICAvL+WwhuS6i+S7tuS8oOmAkuS4iuWOu1xyXG4gICAgICAgIHRoaXMucHJvcHMub25UaXRsZUNoYW5nZShlKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJ0Yy1lZGl0cG9wcGVyLWV2ZW50dGl0bGVcIiBcclxuICAgICAgICAgICAgICAgIGh0bWxGb3I9e3RoaXMucHJvcHMudGFyZ2V0Rm9ybX1cclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0nZXZlbnR0aXRsZSdcclxuICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfVxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IHsgQnV0dG9uLCBCdXR0b25Hcm91cCwgQnV0dG9uVG9vbGJhciwgU3BsaXRCdXR0b24sIERyb3Bkb3duLCBNZW51SXRlbSB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3BvdmVyVG9vbGJhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEJ1dHRvblRvb2xiYXI+XHJcbiAgICAgICAgICAgICAgICA8QnV0dG9uR3JvdXA+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBpZD0ndGMtZWRpdHBvcHBlci1TYXZlJyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5vbkJ0bkNsaWNrfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IXRoaXMucHJvcHMuZW5hYmxlU2F2ZUJ0bn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIOS/neWtmFxyXG4gICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b24gaWQ9J3RjLWVkaXRwb3BwZXItQ29tcGxldGUnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25CdG5DbGlja30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtwYXJzZUludCh0aGlzLnByb3BzLmNvbXBsZXRlKSA9PSA1ID8gJ+aBouWkjScgOiAn5a6M5oiQJ31cclxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGlkPSd0Yy1lZGl0cG9wcGVyLUVkaXQnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25CdG5DbGlja30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIOe8lui+kVxyXG4gICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b24gaWQ9J3RjLWVkaXRwb3BwZXItRGVsZXRlRGF0YSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5vbkJ0bkNsaWNrfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAg5Yig6ZmkXHJcbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICA8RHJvcGRvd24gaWQ9J3RjLWVkaXRwb3BwZXItZXh0cmEnIHB1bGxSaWdodD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPERyb3Bkb3duLlRvZ2dsZSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8RHJvcGRvd24uTWVudT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxNZW51SXRlbSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudEtleT1cIjFcIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD0ndGMtZWRpdHBvcHBlci1PcGVuRG9jJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25CdG5DbGlja30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg5omT5byA5rqQ5paH5qGjXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L01lbnVJdGVtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPE1lbnVJdGVtIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50S2V5PVwiMlwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPSd0Yy1lZGl0cG9wcGVyLURlbGV0ZURvYydcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQnRuQ2xpY2t9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOWIoOmZpOa6kOaWh+aho1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9NZW51SXRlbT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9Ecm9wZG93bi5NZW51PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvRHJvcGRvd24+XHJcbiAgICAgICAgICAgICAgICA8L0J1dHRvbkdyb3VwPlxyXG4gICAgICAgICAgICA8L0J1dHRvblRvb2xiYXI+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgRm9ybUdyb3VwLCBDb250cm9sTGFiZWwsIENvbH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1dG9Gb3JtR3JvdXAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCBpc0hvcml6b250YWwgPSB0aGlzLnByb3BzLmhvcml6b250YWw7XHJcbiAgICAgICAgaWYgKGlzSG9yaXpvbnRhbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPEZvcm1Hcm91cCBjb250cm9sSWQ9e3RoaXMucHJvcHMuY29udHJvbElkfT5cclxuICAgICAgICAgICAgICAgICAgICA8Q29sIGNvbXBvbmVudENsYXNzPXtDb250cm9sTGFiZWx9IHNtPXsyfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMubGFiZWx9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9Db2w+XHJcbiAgICAgICAgICAgICAgICAgICAgPENvbCBzbT17MTB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuICAgICAgICAgICAgICAgICAgICA8L0NvbD5cclxuICAgICAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxGb3JtR3JvdXAgY29udHJvbElkPXt0aGlzLnByb3BzLmNvbnRyb2xJZH0+XHJcbiAgICAgICAgICAgICAgICAgICAgPENvbnRyb2xMYWJlbD57dGhpcy5wcm9wcy5sYWJlbH08L0NvbnRyb2xMYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuICAgICAgICAgICAgICAgIDwvRm9ybUdyb3VwPiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgQXV0b0Zvcm1Hcm91cCBmcm9tICcuL0F1dG9Gb3JtR3JvdXAnO1xyXG5jb25zdCBIdWViZWUgPSByZXF1aXJlKCdodWViZWUvZGlzdC9odWViZWUucGtnZCcpOyBcclxuaW1wb3J0ICdodWViZWUvZGlzdC9odWViZWUuY3NzJztcclxuXHJcbmNsYXNzIENvbG9ySW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMucHJvcHMudmFsdWVcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2UgPSB0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNoYW5nZShqc0V2ZW50T3JWYWx1ZSkge1xyXG4gICAgICAgIGxldCBuZXdDb2xvclZhbHVlO1xyXG4gICAgICAgIGlmICggdHlwZW9mIGpzRXZlbnRPclZhbHVlID09ICdvYmplY3QnICkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZToganNFdmVudE9yVmFsdWUudGFyZ2V0LnZhbHVlfSk7XHJcbiAgICAgICAgICAgIG5ld0NvbG9yVmFsdWUgPSBqc0V2ZW50T3JWYWx1ZS50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgfSBlbHNlIGlmICggdHlwZW9mIGpzRXZlbnRPclZhbHVlID09ICdzdHJpbmcnICkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZToganNFdmVudE9yVmFsdWV9KTtcclxuICAgICAgICAgICAgbmV3Q29sb3JWYWx1ZSA9IGpzRXZlbnRPclZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnByb3BzLm9uQ29sb3JDaGFuZ2UobmV3Q29sb3JWYWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9UT0RPOiDmoLnmja7ppbHlkozluqborqHnrpflrZfkvZPpopzoibJcclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICAvLyDliJ3lp4vljJbnu4Tku7ZcclxuICAgICAgICB0aGlzLmh1ZWJlZUluc3RhbmNlID0gbmV3IEh1ZWJlZSh0aGlzLmVsLCB7XHJcbiAgICAgICAgICAgIHN0YXRpY09wZW46IGZhbHNlLCAvLyBEaXNwbGF5cyBvcGVuIGFuZCBzdGF5cyBvcGVuLiBcclxuICAgICAgICAgICAgc2V0VGV4dDogdHJ1ZSwgLy8gU2V0cyBlbGVtZW50c+KAmSB0ZXh0IHRvIGNvbG9yLiDlsIbljp/lp4vnmoTmlofmnKzorr7nva7orr7nva7miJDpopzoibLlgLwuXHJcbiAgICAgICAgICAgIHNldEJHQ29sb3I6IHRydWUsIC8vIFNldHMgZWxlbWVudHPigJkgYmFja2dyb3VuZCBjb2xvciB0byBjb2xvci5cclxuICAgICAgICAgICAgaHVlczogMTIsIC8vIE51bWJlciBvZiBodWVzIG9mIHRoZSBjb2xvciBncmlkLiBIdWVzIGFyZSBzbGljZXMgb2YgdGhlIGNvbG9yIHdoZWVsLlxyXG4gICAgICAgICAgICBodWUwOiAwLCAvLyBUaGUgZmlyc3QgaHVlIG9mIHRoZSBjb2xvciBncmlkLiBcclxuICAgICAgICAgICAgc2hhZGVzOiA1LCAvLyBOdW1iZXIgb2Ygc2hhZGVzIG9mIGNvbG9ycyBhbmQgc2hhZGVzIG9mIGdyYXkgYmV0d2VlbiB3aGl0ZSBhbmQgYmxhY2suIFxyXG4gICAgICAgICAgICBzYXR1cmF0aW9uczogMiwgLy8gTnVtYmVyIG9mIHNldHMgb2Ygc2F0dXJhdGlvbiBvZiB0aGUgY29sb3IgZ3JpZC5cclxuICAgICAgICAgICAgbm90YXRpb246ICdoZXgnLCAvLyBUZXh0IHN5bnRheCBvZiBjb2xvcnMgdmFsdWVzLlxyXG4gICAgICAgICAgICBjbGFzc05hbWU6IG51bGwsIC8vIENsYXNzIGFkZGVkIHRvIEh1ZWJlZSBlbGVtZW50LiBVc2VmdWwgZm9yIENTUy5cclxuICAgICAgICAgICAgY3VzdG9tQ29sb3JzOiBbIFxyXG4gICAgICAgICAgICAgICAgJyMzMkNEMzInLCAnIzU0ODRFRCcsICcjQTRCREZFJywgXHJcbiAgICAgICAgICAgICAgICAnIzQ2RDZEQicsICcjN0FFN0JGJywgJyM1MUI3NDknLFxyXG4gICAgICAgICAgICAgICAgJyNGQkQ3NUInLCAnI0ZGQjg3OCcsICcjRkY4ODdDJywgXHJcbiAgICAgICAgICAgICAgICAnI0RDMjEyNycsICcjREJBREZGJywgJyNFMUUxRTEnXHRcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8v5Yid5aeL5YyW6aKc6ImyXHJcbiAgICAgICAgdGhpcy5odWViZWVJbnN0YW5jZS5zZXRDb2xvcih0aGlzLnByb3BzLnZhbHVlKTtcclxuICAgICAgICAvL+ebkeWQrGh1ZWJlZeminOiJsumAieaLqVxyXG4gICAgICAgIHRoaXMuaHVlYmVlSW5zdGFuY2Uub24oICdjaGFuZ2UnLCB0aGlzLmhhbmRsZUNoYW5nZSlcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XHJcbiAgICAgICAgLy8g5omL5Yqo5pu05pawdmFsdWVcclxuICAgICAgICB0aGlzLmh1ZWJlZUluc3RhbmNlLnNldENvbG9yKHRoaXMuc3RhdGUudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIC8v5rOo5oSP77yMaHVlYmVl5rKh5pyJZGVzdHJveeeahOaWueazlVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnIFxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdmb3JtLWNvbnRyb2wnIFxyXG4gICAgICAgICAgICAgICAgcmVmPXtlbCA9PiB0aGlzLmVsID0gZWx9XHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9IC8v55uR5ZCs6ZSu55uY6L6T5YWlXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKVxyXG5cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sb3JQaWNrZXJHcm91cCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZSA9IHRoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQ2hhbmdlKGNvbG9yVmFsdWUpIHtcclxuICAgICAgICAvL+WQkeS4iuS8oOmAklxyXG4gICAgICAgIHRoaXMucHJvcHMub25Db2xvckNoYW5nZShjb2xvclZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgeyBob3Jpem9udGFsLCBjb250cm9sSWQsIGxhYmVsfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEF1dG9Gb3JtR3JvdXAgey4uLnsgaG9yaXpvbnRhbCwgY29udHJvbElkLCBsYWJlbCB9fT5cclxuICAgICAgICAgICAgICAgIDxDb2xvcklucHV0IHsuLi50aGlzLnByb3BzfS8+XHJcbiAgICAgICAgICAgIDwvQXV0b0Zvcm1Hcm91cD5cclxuICAgICAgICApXHJcblxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCwgQ29udHJvbExhYmVsLCBDb2wsIEZvcm1Db250cm9sIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcclxuaW1wb3J0IEF1dG9Gb3JtR3JvdXAgZnJvbSAnLi9BdXRvRm9ybUdyb3VwJztcclxuaW1wb3J0ICdtb21lbnQnO1xyXG5pbXBvcnQgJ2Jvb3RzdHJhcC9qcy9jb2xsYXBzZSc7XHJcbmltcG9ydCAnYm9vdHN0cmFwL2pzL3RyYW5zaXRpb24nO1xyXG5pbXBvcnQgJ2VvbmFzZGFuLWJvb3RzdHJhcC1kYXRldGltZXBpY2tlcic7XHJcbmltcG9ydCAnZW9uYXNkYW4tYm9vdHN0cmFwLWRhdGV0aW1lcGlja2VyL2J1aWxkL2Nzcy9ib290c3RyYXAtZGF0ZXRpbWVwaWNrZXIuY3NzJztcclxuXHJcbmNsYXNzIERhdGVUaW1lSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMucHJvcHMudmFsdWVcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2UgPSB0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNoYW5nZShlKSB7IFxyXG4gICAgICAgIGNvbnN0IG5ld0RhdGVWYWx1ZSA9IGUuZGF0ZS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBuZXdEYXRlVmFsdWV9KTtcclxuICAgICAgICAvLyDkvKDpgJJcclxuICAgICAgICB0aGlzLnByb3BzLm9uRGF0ZVRpbWVDaGFuZ2UobmV3RGF0ZVZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICAvLyDliJ3lp4vljJbnu4Tku7ZcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5yZWFkT25seSkgdGhpcy5lbC5yZWFkT25seSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy4kZWwgPSAkKHRoaXMuZWwpLmRhdGV0aW1lcGlja2VyKHtcclxuICAgICAgICAgICAgc2hvd1RvZGF5QnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICBsb2NhbGU6ICd6aC1jbicsXHJcbiAgICAgICAgICAgIGZvcm1hdDogJ1lZWVktTU0tREQgSEg6bW06c3MnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLmluc3RhbmNlID0gdGhpcy4kZWwuZGF0YShcIkRhdGVUaW1lUGlja2VyXCIpO1xyXG4gICAgICAgIC8vIOWIneWni+WMluWAvFxyXG4gICAgICAgIHRoaXMuaW5zdGFuY2UuZGF0ZSh0aGlzLnByb3BzLnZhbHVlKTtcclxuICAgICAgICAvLyDnu5HlrppjaGFuZ2Xkuovku7ZcclxuICAgICAgICAvLyDmlL7lnKjliJ3lp4vljJblkI7ov5vooYznu5HlrprvvIzpgb/lhY3liJ3lp4vljJbov4fnqIvop6blj5FjaGFuZ2Xkuovku7ZcclxuICAgICAgICB0aGlzLiRlbC5vbihcImRwLmNoYW5nZVwiLCB0aGlzLmhhbmRsZUNoYW5nZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xyXG4gICAgICAgIC8vIOaJi+WKqOabtOaWsHZhbHVlXHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5kYXRlKHRoaXMuc3RhdGUudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIC8vIGRlc3Ryb3lcclxuICAgICAgICB0aGlzLmluc3RhbmNlLmRlc3Ryb3koKTtcclxuICAgICAgICB0aGlzLiRlbC5vZmYoXCJkcC5jaGFuZ2VcIiwgdGhpcy5oYW5kbGVDaGFuZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnIFxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdmb3JtLWNvbnRyb2wnIFxyXG4gICAgICAgICAgICAgICAgcmVmPXtlbCA9PiB0aGlzLmVsID0gZWx9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKVxyXG5cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0ZVRpbWVQaWNrZXJHcm91cCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgeyBob3Jpem9udGFsLCBjb250cm9sSWQsIGxhYmVsfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEF1dG9Gb3JtR3JvdXAgey4uLnsgaG9yaXpvbnRhbCwgY29udHJvbElkLCBsYWJlbCB9fT5cclxuICAgICAgICAgICAgICAgIDxEYXRlVGltZUlucHV0IHsuLi50aGlzLnByb3BzfSAvPlxyXG4gICAgICAgICAgICA8L0F1dG9Gb3JtR3JvdXA+ICAgICAgICAgICAgXHJcbiAgICAgICAgKVxyXG5cclxuICAgIH1cclxufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFJvdywgQ29sLCBGb3JtLCBGb3JtR3JvdXAsIEZvcm1Db250cm9sLCBDb250cm9sTGFiZWwgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5pbXBvcnQgVGl0bGVJbnB1dEdyb3VwIGZyb20gJy4vVGl0bGVJbnB1dEdyb3VwJztcclxuaW1wb3J0IERhdGVUaW1lUGlja2VyR3JvdXAgZnJvbSAnLi9EYXRlVGltZVBpY2tlckdyb3VwJztcclxuaW1wb3J0IENvbG9yUGlja2VyR3JvdXAgZnJvbSAnLi9Db2xvclBpY2tlckdyb3VwJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEV2ZW50RGV0YWlsRm9ybShwcm9wcykge1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZVRpdGxlQ2hhbmdlID0gcHJvcHMub25UaXRsZUNoYW5nZTtcclxuICAgIGNvbnN0IGhhbmRsZVN0YXJ0Q2hhbmdlID0gcHJvcHMub25TdGFydENoYW5nZTtcclxuICAgIGNvbnN0IGhhbmRsZUVuZENoYW5nZSA9IHByb3BzLm9uRW5kQ2hhbmdlO1xyXG4gICAgY29uc3QgaGFuZGxlQ29sb3JDaGFuZ2UgPSBwcm9wcy5vbkNvbG9yY2hhbmdlO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPEZvcm0+XHJcbiAgICAgICAgICAgIDxUaXRsZUlucHV0R3JvdXAgXHJcbiAgICAgICAgICAgICAgICBhdXRvRm9jdXNcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xJZD1cInRjLWNyZWF0ZXBhZ2UtZXZlbnR0aXRsZVwiXHJcbiAgICAgICAgICAgICAgICBsYWJlbD1cIuagh+mimFwiXHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17cHJvcHMuZXZlbnRUaXRsZX0gXHJcbiAgICAgICAgICAgICAgICBvblRpdGxlQ2hhbmdlPXtoYW5kbGVUaXRsZUNoYW5nZX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPFJvdz5cclxuICAgICAgICAgICAgICAgIDxDb2wgc209ezZ9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxEYXRlVGltZVBpY2tlckdyb3VwIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sSWQ9XCJ0Yy1jcmVhdGVwYWdlLWV2ZW50c3RhcnRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIuW8gOWni+aXpeacn1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwcm9wcy5zdGFydH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25EYXRlVGltZUNoYW5nZT17aGFuZGxlU3RhcnRDaGFuZ2V9ICAvPlxyXG4gICAgICAgICAgICAgICAgPC9Db2w+XHJcbiAgICAgICAgICAgICAgICA8Q29sIHNtPXs2fT5cclxuICAgICAgICAgICAgICAgICAgICA8RGF0ZVRpbWVQaWNrZXJHcm91cCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbElkPVwidGMtY3JlYXRlcGFnZS1ldmVudGVuZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwi57uT5p2f5pel5pyfXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3Byb3BzLmVuZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25EYXRlVGltZUNoYW5nZT17aGFuZGxlRW5kQ2hhbmdlfSAgLz5cclxuICAgICAgICAgICAgICAgIDwvQ29sPlxyXG4gICAgICAgICAgICA8L1Jvdz5cclxuICAgICAgICAgICAgPFJvdz5cclxuICAgICAgICAgICAgICAgIDxDb2wgc209ezZ9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxDb2xvclBpY2tlckdyb3VwIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sSWQ9XCJ0Yy1jcmVhdGVwYWdlLWV2ZW50Y29sb3JcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIuiJsuW9qVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwcm9wcy5iYWNrZ3JvdW5kQ29sb3J9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29sb3JDaGFuZ2U9e2hhbmRsZUNvbG9yQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L0NvbD5cclxuICAgICAgICAgICAgICAgIDxDb2wgc209ezZ9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxGb3JtR3JvdXAgY29udHJvbElkPVwidGMtY3JlYXRlcGFnZS1ldmVudHRhZ3NcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbnRyb2xMYWJlbD7moIfnrb48L0NvbnRyb2xMYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sIHJlYWRPbmx5Lz5cclxuICAgICAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD4gICAgIFxyXG4gICAgICAgICAgICAgICAgPC9Db2w+XHJcbiAgICAgICAgICAgIDwvUm93PlxyXG4gICAgICAgICAgICA8Rm9ybUdyb3VwIGNvbnRyb2xJZD1cInRjLWNyZWF0ZXBhZ2UtZXZlbnRyZW1hcmtcIj5cclxuICAgICAgICAgICAgICAgIDxDb250cm9sTGFiZWw+5aSH5rOoPC9Db250cm9sTGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2wgcmVhZE9ubHkgY29tcG9uZW50Q2xhc3M9XCJ0ZXh0YXJlYVwiIC8+XHJcbiAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxyXG4gICAgICAgIDwvRm9ybT5cclxuICAgIClcclxufVxyXG5cclxuLypcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnREZXRhaWxGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICAvL+eUseeItue7hOS7tui0n+i0o+WkhOeQhuaVsOaNrlxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCBoYW5kbGVUaXRsZUNoYW5nZSA9IHRoaXMucHJvcHMub25UaXRsZUNoYW5nZTtcclxuICAgICAgICBjb25zdCBoYW5kbGVTdGFydENoYW5nZSA9IHRoaXMucHJvcHMub25TdGFydENoYW5nZTtcclxuICAgICAgICBjb25zdCBoYW5kbGVFbmRDaGFuZ2UgPSB0aGlzLnByb3BzLm9uRW5kQ2hhbmdlO1xyXG4gICAgICAgIGNvbnN0IGhhbmRsZUNvbG9yQ2hhbmdlID0gdGhpcy5wcm9wcy5vbkNvbG9yY2hhbmdlO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxGb3JtPlxyXG4gICAgICAgICAgICAgICAgPFRpdGxlSW5wdXRHcm91cCBcclxuICAgICAgICAgICAgICAgICAgICBhdXRvRm9jdXNcclxuICAgICAgICAgICAgICAgICAgICBjb250cm9sSWQ9XCJ0Yy1jcmVhdGVwYWdlLWV2ZW50dGl0bGVcIlxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsPVwi5qCH6aKYXCJcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5ldmVudFRpdGxlfSBcclxuICAgICAgICAgICAgICAgICAgICBvblRpdGxlQ2hhbmdlPXtoYW5kbGVUaXRsZUNoYW5nZX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8Um93PlxyXG4gICAgICAgICAgICAgICAgICAgIDxDb2wgc209ezZ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8RGF0ZVRpbWVQaWNrZXJHcm91cCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xJZD1cInRjLWNyZWF0ZXBhZ2UtZXZlbnRzdGFydFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIuW8gOWni+aXpeacn1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5zdGFydH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRGF0ZVRpbWVDaGFuZ2U9e2hhbmRsZVN0YXJ0Q2hhbmdlfSAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L0NvbD5cclxuICAgICAgICAgICAgICAgICAgICA8Q29sIHNtPXs2fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPERhdGVUaW1lUGlja2VyR3JvdXAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sSWQ9XCJ0Yy1jcmVhdGVwYWdlLWV2ZW50ZW5kXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwi57uT5p2f5pel5pyfXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLmVuZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRGF0ZVRpbWVDaGFuZ2U9e2hhbmRsZUVuZENoYW5nZX0gIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9Db2w+XHJcbiAgICAgICAgICAgICAgICA8L1Jvdz5cclxuICAgICAgICAgICAgICAgIDxSb3c+XHJcbiAgICAgICAgICAgICAgICAgICAgPENvbCBzbT17Nn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxDb2xvclBpY2tlckdyb3VwIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbElkPVwidGMtY3JlYXRlcGFnZS1ldmVudGNvbG9yXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwi6Imy5b2pXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLmJhY2tncm91bmRDb2xvcn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29sb3JDaGFuZ2U9e2hhbmRsZUNvbG9yQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvQ29sPlxyXG4gICAgICAgICAgICAgICAgICAgIDxDb2wgc209ezZ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUdyb3VwIGNvbnRyb2xJZD1cInRjLWNyZWF0ZXBhZ2UtZXZlbnR0YWdzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q29udHJvbExhYmVsPuagh+etvjwvQ29udHJvbExhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sIHJlYWRPbmx5Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9Gb3JtR3JvdXA+ICAgICBcclxuICAgICAgICAgICAgICAgICAgICA8L0NvbD5cclxuICAgICAgICAgICAgICAgIDwvUm93PlxyXG4gICAgICAgICAgICAgICAgPEZvcm1Hcm91cCBjb250cm9sSWQ9XCJ0Yy1jcmVhdGVwYWdlLWV2ZW50cmVtYXJrXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPENvbnRyb2xMYWJlbD7lpIfms6g8L0NvbnRyb2xMYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2wgcmVhZE9ubHkgY29tcG9uZW50Q2xhc3M9XCJ0ZXh0YXJlYVwiIC8+XHJcbiAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cclxuICAgICAgICAgICAgPC9Gb3JtPlxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbn1cclxuKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBSb3csIENvbCwgRm9ybSwgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgQ29udHJvbExhYmVsIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcclxuaW1wb3J0IFNlbGVjdFBpY2tlckdyb3VwIGZyb20gJy4vU2VsZWN0UGlja2VyR3JvdXAnO1xyXG5pbXBvcnQgV2Vla0NoZWNrYm94R3JvdXAgZnJvbSAnLi9XZWVrQ2hlY2tib3hHcm91cCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBFdmVudFJlcGVhdEZvcm0ocHJvcHMpIHtcclxuICAgIFxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8Rm9ybSBob3Jpem9udGFsPlxyXG4gICAgICAgICAgICA8U2VsZWN0UGlja2VyR3JvdXAgaG9yaXpvbnRhbFxyXG4gICAgICAgICAgICAgICAgY29udHJvbElkPVwidGMtcnB0UnVsZVwiXHJcbiAgICAgICAgICAgICAgICBsYWJlbD1cIumHjeWkjeinhOWImVwiXHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17cHJvcHMucnB0QmFzZVJ1bGV9XHJcbiAgICAgICAgICAgICAgICBvblNlbGVjdGlvbkNoYW5nZT17cHJvcHMub25ScHRCYXNlUnVsZUNoYW5nZX1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIm5vbmVcIj7kuI3ph43lpI08L29wdGlvbj5cclxuICAgICAgICAgICAgICAgIDxvcHRncm91cCBsYWJlbD1cIueugOWNleinhOWImVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJEYWlseVwiPuavj+aXpTwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJXZWVrbHlcIj7mr4/lkag8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiTW9udGhseVwiPuavj+aciDwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJZZWFybHlcIj7mr4/lubQ8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgIDwvb3B0Z3JvdXA+XHJcbiAgICAgICAgICAgICAgICA8b3B0Z3JvdXAgbGFiZWw9XCLlpI3lkIjop4TliJlcIj5cclxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiRXZlcnlXZWVrXCI+5q+P5LiA5Liq5pif5pyf5YegPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkV2ZXJ5MldlZWtcIj7mr4/kuKTkuKrmmJ/mnJ/lh6A8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiRXZlcnlXZWVrZGF5XCI+5q+P5Liq5bel5L2c5pelPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICA8L29wdGdyb3VwPlxyXG4gICAgICAgICAgICA8L1NlbGVjdFBpY2tlckdyb3VwPlxyXG4gICAgICAgICAgICA8V2Vla0NoZWNrYm94R3JvdXAgaG9yaXpvbnRhbFxyXG4gICAgICAgICAgICAgICAgbGFiZWw9XCLph43lpI3mmJ/mnJ9cIlxyXG4gICAgICAgICAgICAgICAgdmFsdWU9XCIxMzVcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgIDwvRm9ybT5cclxuICAgIClcclxufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFJvdywgQ29sLCBGb3JtLCBGb3JtR3JvdXAsIEZvcm1Db250cm9sLCBDb250cm9sTGFiZWwgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5pbXBvcnQgQXV0b0Zvcm1Hcm91cCBmcm9tICcuL0F1dG9Gb3JtR3JvdXAnO1xyXG5pbXBvcnQgJ2Jvb3RzdHJhcC9qcy9kcm9wZG93bic7XHJcbmltcG9ydCAnYm9vdHN0cmFwLXNlbGVjdCc7XHJcbmltcG9ydCAnYm9vdHN0cmFwLXNlbGVjdC9kaXN0L2Nzcy9ib290c3RyYXAtc2VsZWN0LmNzcydcclxuXHJcbmNsYXNzIFNlbGVjdFBpY2tlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5wcm9wcy52YWx1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZSA9IHRoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQ2hhbmdlKGUsIGNsaWNrZWRJbmRleCwgbmV3VmFsdWUsIG9sZFZhbHVlKSB7IFxyXG4gICAgICAgIGNvbnN0IG5ld1NlbGVjdGlvbiA9IHRoaXMuJGVsLmZpbmQoJ29wdGlvbicpLmVxKGNsaWNrZWRJbmRleCkudmFsKCk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IG5ld1NlbGVjdGlvbn0pO1xyXG4gICAgICAgIC8vIOS8oOmAklxyXG4gICAgICAgIHRoaXMucHJvcHMub25TZWxlY3Rpb25DaGFuZ2UobmV3U2VsZWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICAvLyDliJ3lp4vljJbnu4Tku7ZcclxuICAgICAgICB0aGlzLiRlbCA9ICQodGhpcy5lbCkuc2VsZWN0cGlja2VyKHtcclxuICAgICAgICAgICAgc3R5bGU6ICdidG4tZGVmYXVsdCdcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuaW5zdGFuY2UgPSB0aGlzLiRlbC5kYXRhKCdzZWxlY3RwaWNrZXInKTtcclxuICAgICAgICAvLyDliJ3lp4vljJblgLxcclxuICAgICAgICB0aGlzLmluc3RhbmNlLnZhbCh0aGlzLnByb3BzLnZhbHVlKVxyXG4gICAgICAgIC8vIOe7keWummNoYW5nZeS6i+S7tlxyXG4gICAgICAgIHRoaXMuJGVsLm9uKFwiY2hhbmdlZC5icy5zZWxlY3RcIiwgdGhpcy5oYW5kbGVDaGFuZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcclxuICAgICAgICAvLyDmiYvliqjmm7TmlrB2YWx1ZVxyXG4gICAgICAgIC8vIOaPkuS7tuiDveiHquWKqOabtOaWsFxyXG4gICAgICAgIC8vdGhpcy5pbnN0YW5jZS52YWwodGhpcy5zdGF0ZS52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgLy8gZGVzdHJveVxyXG4gICAgICAgIHRoaXMuaW5zdGFuY2UuZGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMuJGVsLm9mZihcImNoYW5nZWQuYnMuc2VsZWN0XCIsIHRoaXMuaGFuZGxlQ2hhbmdlKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxzZWxlY3QgcmVmPXtlbCA9PiB0aGlzLmVsID0gZWx9PlxyXG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG4gICAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBcclxuICAgICAgICApXHJcbiAgICB9ICAgXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFNlbGVjdFBpY2tlckdyb3VwKHByb3BzKSB7XHJcbiAgICBjb25zdCB7IGhvcml6b250YWwsIGNvbnRyb2xJZCwgbGFiZWwgfSA9IHByb3BzO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8QXV0b0Zvcm1Hcm91cCB7Li4ueyBob3Jpem9udGFsLCBjb250cm9sSWQsIGxhYmVsIH19PlxyXG4gICAgICAgICAgICA8U2VsZWN0UGlja2VyIHsuLi5wcm9wc30gPlxyXG4gICAgICAgICAgICAgICAge3Byb3BzLmNoaWxkcmVufVxyXG4gICAgICAgICAgICA8L1NlbGVjdFBpY2tlcj5cclxuICAgICAgICA8L0F1dG9Gb3JtR3JvdXA+ICAgICAgXHJcbiAgICApXHJcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcbmltcG9ydCBBdXRvRm9ybUdyb3VwIGZyb20gJy4vQXV0b0Zvcm1Hcm91cCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaXRsZUlucHV0R3JvdXAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMucHJvcHMudmFsdWVcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZSA9IHRoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQ2hhbmdlKGUpIHtcclxuICAgICAgICBjb25zdCBuZXdUaXRsZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICB2YWx1ZTogbmV3VGl0bGVcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnByb3BzLm9uVGl0bGVDaGFuZ2UobmV3VGl0bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7IGhvcml6b250YWwsIGNvbnRyb2xJZCwgbGFiZWx9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8QXV0b0Zvcm1Hcm91cCB7Li4ueyBob3Jpem9udGFsLCBjb250cm9sSWQsIGxhYmVsIH19PlxyXG4gICAgICAgICAgICAgICAgPEZvcm1Db250cm9sXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0ZvY3VzPXt0aGlzLnByb3BzLmF1dG9Gb2N1c31cclxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9XHJcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCLor7fovpPlhaXmoIfpophcIlxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvQXV0b0Zvcm1Hcm91cD5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEF1dG9Gb3JtR3JvdXAgZnJvbSAnLi9BdXRvRm9ybUdyb3VwJztcclxuaW1wb3J0ICdhd2Vzb21lLWJvb3RzdHJhcC1jaGVja2JveC9hd2Vzb21lLWJvb3RzdHJhcC1jaGVja2JveC5jc3MnO1xyXG5cclxuY2xhc3MgV2Vla0NoZWNrYm94QmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLnZhbHVlLFxyXG4gICAgICAgICAgICB3ZWVrRGF5OiBbXVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZSA9IHRoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVDaGVja2JveENsaWNrID0gdGhpcy5oYW5kbGVDaGVja2JveENsaWNrLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQ2hhbmdlKGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnN0YXRlKVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNoZWNrYm94Q2xpY2soZSkge1xyXG4gICAgICAgIGNvbnN0IGNoZWNrYm94ID0gZS50YXJnZXQ7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShmdW5jdGlvbihwcmV2U3RhdGUpe1xyXG4gICAgICAgICAgICBjb25zdCB3ZWVrRGF5ID0gcHJldlN0YXRlLndlZWtEYXk7XHJcbiAgICAgICAgICAgIHdlZWtEYXkucHVzaChjaGVja2JveC52YWx1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHdlZWtEYXkgfTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgLy8g5Yid5aeL5YyW57uE5Lu2XHJcbiAgICAgICAgdGhpcy4kZWwgPSAkKHRoaXMuZWwpLnNlbGVjdHBpY2tlcih7XHJcbiAgICAgICAgICAgIHN0eWxlOiAnYnRuLWRlZmF1bHQnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLmluc3RhbmNlID0gdGhpcy4kZWwuZGF0YSgnc2VsZWN0cGlja2VyJyk7XHJcbiAgICAgICAgLy8g5Yid5aeL5YyW5YC8XHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZS52YWwodGhpcy5wcm9wcy52YWx1ZSlcclxuICAgICAgICAvLyDnu5HlrppjaGFuZ2Xkuovku7ZcclxuICAgICAgICB0aGlzLiRlbC5vbihcImNoYW5nZWQuYnMuc2VsZWN0XCIsIHRoaXMuaGFuZGxlQ2hhbmdlKTtcclxuICAgICAgICAqL1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaGVja2JveCBjaGVja2JveC1pbmxpbmUgY2hlY2tib3gtc3VjY2Vzc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cImNoZWNrYm94MVwiIHZhbHVlPVwiMVwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzdHlsZWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNoZWNrYm94Q2xpY2t9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwiY2hlY2tib3gxXCI+IOS4gDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2hlY2tib3ggY2hlY2tib3gtaW5saW5lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiY2hlY2tib3gyXCIgdmFsdWU9XCIyXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2hlY2tib3hDbGlja31cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJjaGVja2JveDJcIj4g5LqMPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaGVja2JveCBjaGVja2JveC1pbmxpbmVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJjaGVja2JveDNcIiB2YWx1ZT1cIjNcIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDaGVja2JveENsaWNrfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cImNoZWNrYm94M1wiPiDkuIk8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoZWNrYm94IGNoZWNrYm94LWlubGluZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cImNoZWNrYm94NFwiIHZhbHVlPVwiNFwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNoZWNrYm94Q2xpY2t9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwiY2hlY2tib3g0XCI+IOWbmzwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2hlY2tib3ggY2hlY2tib3gtaW5saW5lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiY2hlY2tib3g1XCIgdmFsdWU9XCI1XCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2hlY2tib3hDbGlja31cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJjaGVja2JveDVcIj4g5LqUPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaGVja2JveCBjaGVja2JveC1pbmxpbmVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJjaGVja2JveDZcIiB2YWx1ZT1cIjZcIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDaGVja2JveENsaWNrfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cImNoZWNrYm94NlwiPiDlha08L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoZWNrYm94IGNoZWNrYm94LWlubGluZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cImNoZWNrYm94N1wiIHZhbHVlPVwiN1wiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNoZWNrYm94Q2xpY2t9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwiY2hlY2tib3g3XCI+IOaXpTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gV2Vla0NoZWNrYm94R3JvdXAocHJvcHMpIHtcclxuICAgIGNvbnN0IHsgaG9yaXpvbnRhbCwgY29udHJvbElkLCBsYWJlbCB9ID0gcHJvcHM7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxBdXRvRm9ybUdyb3VwIHsuLi57IGhvcml6b250YWwsIGNvbnRyb2xJZCwgbGFiZWwgfX0+XHJcbiAgICAgICAgICAgIDxXZWVrQ2hlY2tib3hCYXIgey4uLnByb3BzfS8+XHJcbiAgICAgICAgPC9BdXRvRm9ybUdyb3VwPiAgICAgIFxyXG4gICAgKVxyXG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgTmF2SXRlbSwgVGFiLCBCdXR0b24gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5pbXBvcnQgRXZlbnREZXRhaWxGcm9tIGZyb20gJy4uL0Zvcm0vRXZlbnREZXRhaWxGb3JtJztcclxuaW1wb3J0IEV2ZW50UmVwZWF0Rm9ybSBmcm9tICcuLi9Gb3JtL0V2ZW50UmVwZWF0Rm9ybSc7XHJcbmltcG9ydCBFdmVudE1vZGFsIGZyb20gJy4vRXZlbnRNb2RhbCc7XHJcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50Q3JlYXRlTW9kYWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgdGl0bGU6ICcnLFxyXG4gICAgICAgICAgICBzdGFydDogdGhpcy5wcm9wcy5zZWxlY3RlZFJhbmdlLnN0YXJ0LmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpLFxyXG4gICAgICAgICAgICBlbmQ6IHRoaXMucHJvcHMuc2VsZWN0ZWRSYW5nZS5lbmQuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyksXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJydcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLmhhbmRsZVRpdGxlQ2hhbmdlID0gdGhpcy5oYW5kbGVUaXRsZUNoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlU3RhcnRDaGFuZ2UgPSB0aGlzLmhhbmRsZVN0YXJ0Q2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVFbmRDaGFuZ2UgPSB0aGlzLmhhbmRsZUVuZENoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQ29sb3JDaGFuZ2UgPSB0aGlzLmhhbmRsZUNvbG9yQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVFdmVudENyZWF0ZSA9IHRoaXMuaGFuZGxlRXZlbnRDcmVhdGUuYmluZCh0aGlzKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuaGFuZGxlUnB0QmFzZVJ1bGVDaGFuZ2UgPSB0aGlzLmhhbmRsZVJwdEJhc2VSdWxlQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlVGl0bGVDaGFuZ2UobmV3VGl0bGUpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgdGl0bGU6IG5ld1RpdGxlXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVTdGFydENoYW5nZShuZXdEYXRlVmFsdWUpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgc3RhcnQ6IG5ld0RhdGVWYWx1ZVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlRW5kQ2hhbmdlKG5ld0RhdGVWYWx1ZSkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBlbmQ6IG5ld0RhdGVWYWx1ZVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQ29sb3JDaGFuZ2UobmV3Q29sb3JWYWx1ZSkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IG5ld0NvbG9yVmFsdWVcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVJwdEJhc2VSdWxlQ2hhbmdlKG5ld1JwdEJhc2VSdWxlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cobmV3UnB0QmFzZVJ1bGUpXHJcbiAgICB9ICAgIFxyXG5cclxuICAgIGhhbmRsZUV2ZW50Q3JlYXRlKCkge1xyXG4gICAgICAgIC8vIOaJk+WMheaVsOaNrlxyXG4gICAgICAgIGNvbnN0IGV2ZW50RGF0YSA9ICQuZXh0ZW5kKHt9LCB0aGlzLnN0YXRlKTtcclxuICAgICAgICB0aGlzLnByb3BzLm9uRXZlbnRDcmVhdGUoZXZlbnREYXRhKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMucHJvcHMub25Nb2RhbENsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHsgc2hvdywgb25Nb2RhbENsb3NlIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiAoIFxyXG4gICAgICAgICAgICA8RXZlbnRNb2RhbCB7Li4ue3Nob3csIG9uTW9kYWxDbG9zZX19PlxyXG4gICAgICAgICAgICAgICAgPEV2ZW50TW9kYWwuTmF2SGVhZGVyIHsuLi57b25Nb2RhbENsb3NlfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPE5hdkl0ZW0gZXZlbnRLZXk9XCIxXCIgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICDml6XnqIvnvJbovpFcclxuICAgICAgICAgICAgICAgICAgICA8L05hdkl0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgPE5hdkl0ZW0gZXZlbnRLZXk9XCIyXCIgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICDph43lpI3op4TliJlcclxuICAgICAgICAgICAgICAgICAgICA8L05hdkl0ZW0+XHJcbiAgICAgICAgICAgICAgICA8L0V2ZW50TW9kYWwuTmF2SGVhZGVyPlxyXG4gICAgICAgICAgICAgICAgPEV2ZW50TW9kYWwuVGFiQm9keT5cclxuICAgICAgICAgICAgICAgICAgICA8VGFiLlBhbmUgZXZlbnRLZXk9XCIxXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxFdmVudERldGFpbEZyb20gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudFRpdGxlPXt0aGlzLnN0YXRlLnRpdGxlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ9e3RoaXMuc3RhdGUuc3RhcnR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQ9e3RoaXMuc3RhdGUuZW5kfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yPXt0aGlzLnN0YXRlLmJhY2tncm91bmRDb2xvcn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5LqL5Lu25Y+l5p+EXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblRpdGxlQ2hhbmdlPXt0aGlzLmhhbmRsZVRpdGxlQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TdGFydENoYW5nZT17dGhpcy5oYW5kbGVTdGFydENoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRW5kQ2hhbmdlPXt0aGlzLmhhbmRsZUVuZENoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29sb3JjaGFuZ2U9e3RoaXMuaGFuZGxlQ29sb3JDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9UYWIuUGFuZT5cclxuICAgICAgICAgICAgICAgICAgICA8VGFiLlBhbmUgZXZlbnRLZXk9XCIyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxFdmVudFJlcGVhdEZvcm0gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBycHRCYXNlUnVsZT0nV2Vla2x5J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25ScHRCYXNlUnVsZUNoYW5nZT17dGhpcy5oYW5kbGVScHRCYXNlUnVsZUNoYW5nZX0gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9UYWIuUGFuZT5cclxuICAgICAgICAgICAgICAgIDwvRXZlbnRNb2RhbC5UYWJCb2R5PlxyXG4gICAgICAgICAgICAgICAgPEV2ZW50TW9kYWwuVG9vbGJhckZvb3Rlcj5cclxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBic1N0eWxlPVwic3VjY2Vzc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlRXZlbnRDcmVhdGV9XHJcbiAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICDliJvlu7pcclxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMucHJvcHMub25Nb2RhbENsb3NlfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAg5Y+W5raIXHJcbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L0V2ZW50TW9kYWwuVG9vbGJhckZvb3Rlcj5cclxuICAgICAgICAgICAgPC9FdmVudE1vZGFsPlxyXG4gICAgICAgIClcclxuICAgIH1cclxufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IE5hdkl0ZW0sIFRhYiwgQnV0dG9uLCBCdXR0b25Hcm91cCwgRHJvcGRvd24sIE1lbnVJdGVtLCBSb3csIENvbCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcbmltcG9ydCBFdmVudERldGFpbEZyb20gZnJvbSAnLi4vRm9ybS9FdmVudERldGFpbEZvcm0nO1xyXG5pbXBvcnQgRXZlbnRSZXBlYXRGb3JtIGZyb20gJy4uL0Zvcm0vRXZlbnRSZXBlYXRGb3JtJztcclxuaW1wb3J0IEV2ZW50TW9kYWwgZnJvbSAnLi9FdmVudE1vZGFsJztcclxuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5cclxuY2xhc3MgTW9kYWxUb29sYmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPFJvdz5cclxuICAgICAgICAgICAgICAgIDxDb2wgc209ezd9IHN0eWxlPXt7dGV4dEFsaWduOiAnbGVmdCd9fT5cclxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uR3JvdXA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gaWQ9J3RjLWVkaXRwYWdlLVNhdmUnIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnNTdHlsZT1cImRhbmdlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQnRuQ2xpY2t9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IXRoaXMucHJvcHMuZW5hYmxlU2F2ZUJ0bn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICDkv53lrZhcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gaWQ9J3RjLWVkaXRwYWdlLUNvbXBsZXRlJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5vbkJ0bkNsaWNrfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwYXJzZUludCh0aGlzLnByb3BzLmNvbXBsZXRlKSA9PSA1ID8gJ+aBouWkjScgOiAn5a6M5oiQJ31cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD0ndGMtZWRpdHBhZ2UtRGVsZXRlRGF0YSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25CdG5DbGlja30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICDliKDpmaRcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD0ndGMtZWRpdHBhZ2UtRGVsZXRlRG9jJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5vbkJ0bkNsaWNrfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIOWIoOmZpOa6kOaWh+aho1xyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPERyb3Bkb3duIGlkPSd0Yy1lZGl0cGFnZS1leHRyYScgcHVsbFJpZ2h0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPERyb3Bkb3duLlRvZ2dsZSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPERyb3Bkb3duLk1lbnU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPE1lbnVJdGVtIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudEtleT1cIjFcIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9J3RjLWVkaXRwYWdlLU9wZW5Eb2MnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25CdG5DbGlja30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOaJk+W8gOa6kOaWh+aho1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTWVudUl0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPE1lbnVJdGVtIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudEtleT1cIjJcIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9J3RjLWVkaXRwYWdlLUVkaXRPcmlnaW5EYXRhJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQnRuQ2xpY2t9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDnvJbovpHmupDmlbDmja5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L01lbnVJdGVtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Ecm9wZG93bi5NZW51PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0Ryb3Bkb3duPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uR3JvdXA+XHJcbiAgICAgICAgICAgICAgICA8L0NvbD5cclxuICAgICAgICAgICAgICAgIDxDb2wgc209ezJ9IHNtT2Zmc2V0PXszfT5cclxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMucHJvcHMub25Nb2RhbENsb3NlfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAg5Y+W5raIXHJcbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L0NvbD5cclxuICAgICAgICAgICAgPC9Sb3c+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRFZGl0TW9kYWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBuZXdFdmVudERhdGE6IHt9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5oYW5kbGVUaXRsZUNoYW5nZSA9IHRoaXMuaGFuZGxlVGl0bGVDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZVN0YXJ0Q2hhbmdlID0gdGhpcy5oYW5kbGVTdGFydENoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlRW5kQ2hhbmdlID0gdGhpcy5oYW5kbGVFbmRDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUNvbG9yQ2hhbmdlID0gdGhpcy5oYW5kbGVDb2xvckNoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQnRuQ2xpY2sgPSB0aGlzLmhhbmRsZUJ0bkNsaWNrLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlVGl0bGVDaGFuZ2UobmV3VGl0bGUpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKGZ1bmN0aW9uKHByZXZTdGF0ZSwgcHJvcHMpIHtcclxuICAgICAgICAgICAgY29uc3QgbmV3RXZlbnREYXRhID0gJC5leHRlbmQoe30sIHByZXZTdGF0ZS5uZXdFdmVudERhdGEpXHJcbiAgICAgICAgICAgIG5ld0V2ZW50RGF0YS50aXRsZSA9IG5ld1RpdGxlO1xyXG4gICAgICAgICAgICByZXR1cm4geyBuZXdFdmVudERhdGEgfTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVN0YXJ0Q2hhbmdlKG5ld0RhdGVWYWx1ZSkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoZnVuY3Rpb24ocHJldlN0YXRlLCBwcm9wcykge1xyXG4gICAgICAgICAgICBjb25zdCBuZXdFdmVudERhdGEgPSAkLmV4dGVuZCh7fSwgcHJldlN0YXRlLm5ld0V2ZW50RGF0YSlcclxuICAgICAgICAgICAgbmV3RXZlbnREYXRhLnN0YXJ0ID0gbmV3RGF0ZVZhbHVlO1xyXG4gICAgICAgICAgICByZXR1cm4geyBuZXdFdmVudERhdGEgfTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUVuZENoYW5nZShuZXdEYXRlVmFsdWUpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKGZ1bmN0aW9uKHByZXZTdGF0ZSwgcHJvcHMpIHtcclxuICAgICAgICAgICAgY29uc3QgbmV3RXZlbnREYXRhID0gJC5leHRlbmQoe30sIHByZXZTdGF0ZS5uZXdFdmVudERhdGEpXHJcbiAgICAgICAgICAgIG5ld0V2ZW50RGF0YS5lbmQgPSBuZXdEYXRlVmFsdWU7XHJcbiAgICAgICAgICAgIHJldHVybiB7IG5ld0V2ZW50RGF0YSB9O1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQ29sb3JDaGFuZ2UobmV3Q29sb3JWYWx1ZSkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoZnVuY3Rpb24ocHJldlN0YXRlLCBwcm9wcykge1xyXG4gICAgICAgICAgICBjb25zdCBuZXdFdmVudERhdGEgPSAkLmV4dGVuZCh7fSwgcHJldlN0YXRlLm5ld0V2ZW50RGF0YSlcclxuICAgICAgICAgICAgbmV3RXZlbnREYXRhLmJhY2tncm91bmRDb2xvciA9IG5ld0NvbG9yVmFsdWU7XHJcbiAgICAgICAgICAgIHJldHVybiB7IG5ld0V2ZW50RGF0YSB9O1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQnRuQ2xpY2soZSkge1xyXG4gICAgICAgIGNvbnN0IGlkID0gZS50YXJnZXQuaWQ7XHJcbiAgICAgICAgY29uc3QgYnRuVHlwZSA9IGlkLnNwbGl0KCctJylbMl07XHJcbiAgICAgICAgY29uc3QgaGFuZGxlTmFtZSA9IGBvbkV2ZW50JHtidG5UeXBlfWA7XHJcbiAgICAgICAgdGhpcy5wcm9wc1toYW5kbGVOYW1lXSh0aGlzLnByb3BzLmVkaXRpbmdFdmVudCwgdGhpcy5zdGF0ZS5uZXdFdmVudERhdGEpO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5wcm9wcy5vbk1vZGFsQ2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgeyBzaG93LCBvbk1vZGFsQ2xvc2UgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgZXZlbnQgPSB0aGlzLnByb3BzLmVkaXRpbmdFdmVudDtcclxuICAgICAgICBjb25zdCBlbmFibGVTYXZlQnRuID0gISQuaXNFbXB0eU9iamVjdCh0aGlzLnN0YXRlLm5ld0V2ZW50RGF0YSk7XHJcbiAgICAgICAgcmV0dXJuICggXHJcbiAgICAgICAgICAgIDxFdmVudE1vZGFsIHsuLi57c2hvdywgb25Nb2RhbENsb3NlfX0+XHJcbiAgICAgICAgICAgICAgICA8RXZlbnRNb2RhbC5OYXZIZWFkZXIgey4uLntvbk1vZGFsQ2xvc2V9fT5cclxuICAgICAgICAgICAgICAgICAgICA8TmF2SXRlbSBldmVudEtleT1cIjFcIiA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIOaXpeeoi+e8lui+kVxyXG4gICAgICAgICAgICAgICAgICAgIDwvTmF2SXRlbT5cclxuICAgICAgICAgICAgICAgICAgICA8TmF2SXRlbSBldmVudEtleT1cIjJcIiA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIOmHjeWkjeinhOWImVxyXG4gICAgICAgICAgICAgICAgICAgIDwvTmF2SXRlbT5cclxuICAgICAgICAgICAgICAgIDwvRXZlbnRNb2RhbC5OYXZIZWFkZXI+XHJcbiAgICAgICAgICAgICAgICA8RXZlbnRNb2RhbC5UYWJCb2R5PlxyXG4gICAgICAgICAgICAgICAgICAgIDxUYWIuUGFuZSBldmVudEtleT1cIjFcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEV2ZW50RGV0YWlsRnJvbSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5Lyg5YWl5pel56iL5bGe5oCnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9eydlZGl0JyArIGV2ZW50LmlkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRUaXRsZT17ZXZlbnQudGl0bGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydD17ZXZlbnQuc3RhcnQuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQ9e2V2ZW50LmVuZC5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcj17ZXZlbnQuYmFja2dyb3VuZENvbG9yfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGU9e2V2ZW50LmNvbXBsZXRlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/kuovku7blj6Xmn4RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uVGl0bGVDaGFuZ2U9e3RoaXMuaGFuZGxlVGl0bGVDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblN0YXJ0Q2hhbmdlPXt0aGlzLmhhbmRsZVN0YXJ0Q2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25FbmRDaGFuZ2U9e3RoaXMuaGFuZGxlRW5kQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Db2xvcmNoYW5nZT17dGhpcy5oYW5kbGVDb2xvckNoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L1RhYi5QYW5lPlxyXG4gICAgICAgICAgICAgICAgICAgIDxUYWIuUGFuZSBldmVudEtleT1cIjJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEV2ZW50UmVwZWF0Rm9ybSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvVGFiLlBhbmU+XHJcbiAgICAgICAgICAgICAgICA8L0V2ZW50TW9kYWwuVGFiQm9keT5cclxuICAgICAgICAgICAgICAgIDxFdmVudE1vZGFsLlRvb2xiYXJGb290ZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgPE1vZGFsVG9vbGJhclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVTYXZlQnRuPXtlbmFibGVTYXZlQnRufVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZT17dGhpcy5zdGF0ZS5jb21wbGV0ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25CdG5DbGljaz17dGhpcy5oYW5kbGVCdG5DbGlja31cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25Nb2RhbENsb3NlPXtvbk1vZGFsQ2xvc2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L0V2ZW50TW9kYWwuVG9vbGJhckZvb3Rlcj5cclxuICAgICAgICAgICAgPC9FdmVudE1vZGFsPlxyXG4gICAgICAgIClcclxuICAgIH0gICAgXHJcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBNb2RhbCwgTmF2LCBUYWIsIFJvdywgQ29sLCBDbG9zZUJ1dHRvbiB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcblxyXG5jbGFzcyBOYXZIZWFkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgLy90aGlzLnByb3BzLmNoaWxkcmVuIOaOpeWPlyA8TmF2SXRlbSAvPlxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxNb2RhbC5IZWFkZXJcclxuICAgICAgICAgICAgICAgIHN0eWxlPXt7Ym9yZGVyQm90dG9tOiAnbm9uZScsIHBhZGRpbmc6ICcwJ319PlxyXG4gICAgICAgICAgICAgICAgPE5hdiBic1N0eWxlPVwidGFic1wiXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3twYWRkaW5nOiAnMTVweCAxNXB4IDAgMTVweCd9fT5cclxuICAgICAgICAgICAgICAgICAgICA8Q2xvc2VCdXR0b24gb25DbGljaz17dGhpcy5wcm9wcy5vbk1vZGFsQ2xvc2V9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XHJcbiAgICAgICAgICAgICAgICA8L05hdj5cclxuICAgICAgICAgICAgPC9Nb2RhbC5IZWFkZXI+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBUYWJCb2R5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIC8vdGhpcy5wcm9wcy5jaGlsZHJlbiDmjqXlj5cgPFRhYi5QYW5lIC8+XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPE1vZGFsLkJvZHk+XHJcbiAgICAgICAgICAgICAgICA8VGFiLkNvbnRlbnQgYW5pbWF0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG4gICAgICAgICAgICAgICAgPC9UYWIuQ29udGVudD5cclxuICAgICAgICAgICAgPC9Nb2RhbC5Cb2R5PiAgICAgICAgICAgIFxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgVG9vbGJhckZvb3RlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPE1vZGFsLkZvb3Rlcj5cclxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG4gICAgICAgICAgICA8L01vZGFsLkZvb3Rlcj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEV2ZW50TW9kYWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCBOYXZIZWFkZXIsIFRhYkJvZHksIFRvb2xiYXJGb290ZXI7XHJcbiAgICAgICAgUmVhY3QuQ2hpbGRyZW4uZm9yRWFjaCh0aGlzLnByb3BzLmNoaWxkcmVuLCAodGhpc0FyZykgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gdGhpc0FyZy50eXBlLm5hbWU7XHJcbiAgICAgICAgICAgIGlmICggbmFtZSA9PSAnTmF2SGVhZGVyJyApIHtcclxuICAgICAgICAgICAgICAgIE5hdkhlYWRlciA9IHRoaXNBcmc7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIG5hbWUgPT0gJ1RhYkJvZHknICkge1xyXG4gICAgICAgICAgICAgICAgVGFiQm9keSA9IHRoaXNBcmc7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIG5hbWUgPT0gJ1Rvb2xiYXJGb290ZXInICkge1xyXG4gICAgICAgICAgICAgICAgVG9vbGJhckZvb3RlciA9IHRoaXNBcmc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8TW9kYWwgc2hvdz17dGhpcy5wcm9wcy5zaG93fSBvbkhpZGU9e3RoaXMucHJvcHMub25Nb2RhbENsb3NlfT4gXHJcbiAgICAgICAgICAgICAgICA8VGFiLkNvbnRhaW5lciBpZD1cInRhYnMtd2l0aC1kcm9wZG93blwiIGRlZmF1bHRBY3RpdmVLZXk9XCIxXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPFJvdyBjbGFzc05hbWU9XCJjbGVhcmZpeFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q29sIHNtPXsxMn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IE5hdkhlYWRlciB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IFRhYkJvZHkgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0NvbD5cclxuICAgICAgICAgICAgICAgICAgICA8L1Jvdz5cclxuICAgICAgICAgICAgICAgIDwvVGFiLkNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgIHsgVG9vbGJhckZvb3RlciB9XHJcbiAgICAgICAgICAgIDwvTW9kYWw+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5FdmVudE1vZGFsLk5hdkhlYWRlciA9IE5hdkhlYWRlcjtcclxuRXZlbnRNb2RhbC5UYWJCb2R5ID0gVGFiQm9keTtcclxuRXZlbnRNb2RhbC5Ub29sYmFyRm9vdGVyID0gVG9vbGJhckZvb3RlcjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV2ZW50TW9kYWw7IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vaW5kZXguY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL2luZGV4LmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vaW5kZXguY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCAnZnVsbGNhbGVuZGFyLXJlYWN0d3JhcHBlci9kaXN0L2Nzcy9mdWxsY2FsZW5kYXIubWluLmNzcydcclxuaW1wb3J0ICdib290c3RyYXAvZGlzdC9jc3MvYm9vdHN0cmFwLmNzcyc7XHJcbmltcG9ydCAnYm9vdHN0cmFwL2Rpc3QvY3NzL2Jvb3RzdHJhcC10aGVtZS5jc3MnO1xyXG5pbXBvcnQgJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1mcmVlL2Nzcy9hbGwuY3NzJztcclxuaW1wb3J0IEFwcCBmcm9tICcuL0FwcCc7XHJcbmltcG9ydCAnLi9pbmRleC5jc3MnO1xyXG5cclxuUmVhY3RET00ucmVuZGVyKDxBcHAgLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JykpO1xyXG5cclxuLypcclxuJChmdW5jdGlvbigpe1xyXG4gICAgLy8g5a6a5LmJ5Y+Y6YePXHJcblx0Y29uc3QgZGF0YUxvYWRlciA9IG5ldyBXaXpFdmVudERhdGFMb2FkZXIoKTtcclxuXHRsZXQgZ19lZGl0UG9wcGVyLCBnX2NyZWF0ZU1vZGFsLCBnX2VkaXRNb2RhbDtcclxuXHJcbiAgICBjb25zdCBjYWxlbmRhciA9ICQoJyNjYWxlbmRhcicpLmZ1bGxDYWxlbmRhcih7XHJcblx0XHR0aGVtZVN5c3RlbTogJ3N0YW5kYXJkJyxcclxuXHRcdGhlaWdodDogJ3BhcmVudCcsXHJcblx0XHRoZWFkZXI6IHtcclxuXHRcdFx0bGVmdDogJ3ByZXYsbmV4dCx0b2RheScsXHJcblx0XHRcdGNlbnRlcjogJ3RpdGxlJyxcclxuXHRcdFx0cmlnaHQ6ICdtb250aCxhZ2VuZGFXZWVrLGFnZW5kYURheSxsaXN0V2VlaydcclxuXHRcdH0sXHJcblx0XHR2aWV3czoge1xyXG5cdFx0XHRtb250aDoge1xyXG5cdFx0XHRcdC8vdGl0bGVGb3JtYXQ6IGdfbG9jX3RpdGxlZm9ybWF0X21vbnRoLCAvL3ZhciBnX2xvY190aXRsZWZvcm1hdF9tb250aCA9IFwiTU1NTSB5eXl5XCI7XHJcblx0XHRcdH0sXHJcblx0XHRcdGFnZW5kYToge1xyXG5cdFx0XHRcdG1pblRpbWU6IFwiMDg6MDA6MDBcIixcclxuXHRcdFx0XHRzbG90TGFiZWxGb3JtYXQ6ICdoKDptbSkgYSdcclxuXHRcdFx0fSxcclxuXHRcdFx0bGlzdFdlZWs6IHtcclxuXHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRuYXZMaW5rczogdHJ1ZSxcclxuXHRcdGFsbERheURlZmF1bHQ6IGZhbHNlLFxyXG5cdFx0ZGVmYXVsdFZpZXc6ICdhZ2VuZGFXZWVrJyxcclxuXHRcdGV2ZW50TGltaXQ6IHRydWUsXHJcblx0XHRidXR0b25UZXh0OiB7XHJcblx0XHRcdHRvZGF5OiAn5LuK5aSpJyxcclxuXHRcdFx0bW9udGg6ICfmnIgnLFxyXG5cdFx0XHR3ZWVrOiAn5ZGoJyxcclxuXHRcdFx0ZGF5OiAn5pelJyxcclxuXHRcdFx0bGlzdDogJ+ihqCdcclxuICAgICAgICB9LFxyXG5cdFx0bW9udGhOYW1lczogW1xyXG4gICAgICAgICAgICAnMeaciCcsICcy5pyIJywgJzPmnIgnLCAnNOaciCcsIFxyXG4gICAgICAgICAgICAnNeaciCcsICc25pyIJywgJzfmnIgnLCAnOOaciCcsIFxyXG4gICAgICAgICAgICAnOeaciCcsICcxMOaciCcsICcxMeaciCcsICcxMuaciCdcclxuICAgICAgICBdLFxyXG5cdFx0bW9udGhOYW1lc1Nob3J0OiBbXHJcbiAgICAgICAgICAgICcx5pyIJywgJzLmnIgnLCAnM+aciCcsICc05pyIJywgXHJcbiAgICAgICAgICAgICc15pyIJywgJzbmnIgnLCAnN+aciCcsICc45pyIJywgXHJcbiAgICAgICAgICAgICc55pyIJywgJzEw5pyIJywgJzEx5pyIJywgJzEy5pyIJ1xyXG4gICAgICAgIF0sXHJcblx0XHRkYXlOYW1lczogW1xyXG4gICAgICAgICAgICAn5ZGo5pelJywgJ+WRqOS4gCcsICflkajkuownLCAn5ZGo5LiJJywgJ+WRqOWbmycsICflkajkupQnLCAn5ZGo5YWtJ1xyXG4gICAgICAgIF0sXHJcblx0XHRkYXlOYW1lc1Nob3J0OiBbXHJcbiAgICAgICAgICAgICflkajml6UnLCAn5ZGo5LiAJywgJ+WRqOS6jCcsICflkajkuIknLCAn5ZGo5ZubJywgJ+WRqOS6lCcsICflkajlha0nXHJcbiAgICAgICAgXSxcclxuXHRcdHNlbGVjdGFibGU6IHRydWUsXHJcblx0XHRzZWxlY3RIZWxwZXI6IHRydWUsXHJcblx0XHR1bnNlbGVjdENhbmNlbDogJy5tb2RhbCAqJyxcclxuXHRcdGFsbERheVRleHQ6ICflhajlpKknLFxyXG5cdFx0bm93SW5kaWNhdG9yOiB0cnVlLFxyXG5cdFx0Zm9yY2VFdmVudER1cmF0aW9uOiB0cnVlLFxyXG5cdFx0Zmlyc3REYXk6IDEsIC8vIOesrOS4gOWkqeaYr+WRqOS4gOi/mOaYr+WRqOWkqe+8jOS4jmRhdGVwaWNrZXLlv4Xpobvnm7jlkIxcclxuXHRcdGRyYWdPcGFjaXR5OiB7XHJcblx0XHRcdFwibW9udGhcIjogLjUsXHJcblx0XHRcdFwiYWdlbmRhV2Vla1wiOiAxLFxyXG5cdFx0XHRcImFnZW5kYURheVwiOiAxXHJcblx0XHR9LFxyXG5cdFx0ZWRpdGFibGU6IHRydWUsXHJcblxyXG5cdFx0Ly8g5Yi35paw6KeG5Zu+77yM6YeN5paw6I635Y+W5pel5Y6G5LqL5Lu2XHJcblx0XHR2aWV3UmVuZGVyOiBmdW5jdGlvbiggdmlldywgZWxlbWVudCApIHtcclxuXHRcdFx0Ly9UT0RPOiDmhJ/op4nov5nmoLfpgKDmiJDmgKfog73kuIrnmoTmjZ/lpLHvvIzmmK/lkKbmnInmm7Tlpb3nmoTmlrnms5XvvJ9cclxuXHRcdFx0Y29uc3QgY2FsZW5kYXIgPSAkKCcjY2FsZW5kYXInKTtcclxuXHRcdFx0Y29uc3QgZXZlbnRTb3VyY2VzID0gZGF0YUxvYWRlci5nZXRFdmVudFNvdXJjZXMoIHZpZXcsIGVsZW1lbnQgKTtcclxuXHRcdFx0Y2FsZW5kYXIuZnVsbENhbGVuZGFyKCdyZW1vdmVFdmVudHMnKTtcclxuXHRcdFx0Zm9yIChsZXQgaT0wIDsgaSA8IGV2ZW50U291cmNlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGNhbGVuZGFyLmZ1bGxDYWxlbmRhcignYWRkRXZlbnRTb3VyY2UnLCBldmVudFNvdXJjZXNbaV0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0fSxcclxuXHJcblx0XHQvLyDpgInmi6nliqjkvZzop6blj5HnmoTkuovku7blj6Xmn4TvvIzlrprkuYnkuobkuIDkuKpjYWxsYmFja1xyXG5cdFx0c2VsZWN0OiBmdW5jdGlvbihzdGFydCwgZW5kLCBqc0V2ZW50LCB2aWV3KXtcclxuXHRcdFx0Ly8g5by55Ye64oCc5Yib5bu65pel5Y6G5LqL5Lu24oCd56qX5Y+jXHJcblx0XHRcdC8vIOWIpOaWreaYr+WQpua4suafk1xyXG5cdFx0XHQvL1RPRE86IOaDs+WKnuazleS4jeimgeeUqOWFqOWxgOWPmOmHj1xyXG5cdFx0XHRpZiAoICF3aW5kb3cuZ19jcmVhdGVNb2RhbCApIG5ldyBFdmVudENyZWF0ZU1vZGFsKHtzdGFydCwgZW5kLCBqc0V2ZW50LCB2aWV3fSk7XHJcblx0XHRcdC8vIOS8oOmAkuWPguaVsFxyXG5cdFx0XHR3aW5kb3cuZ19jcmVhdGVNb2RhbC51cGRhdGUoe3N0YXJ0LCBlbmQsIGpzRXZlbnQsIHZpZXd9KTtcclxuXHRcdFx0d2luZG93LmdfY3JlYXRlTW9kYWwuc2hvdygpO1xyXG5cdFx0fSxcclxuXHJcblx0XHRldmVudERyYWdTdGFydDogZnVuY3Rpb24oIGV2ZW50LCBqc0V2ZW50LCB1aSwgdmlldyApIHsgfSxcclxuXHRcdGV2ZW50RHJhZ1N0b3A6IGZ1bmN0aW9uKCBldmVudCwganNFdmVudCwgdWksIHZpZXcgKSB7IH0sXHJcblxyXG5cdFx0Ly8g5pel5Y6G5LqL5Lu25ouW5YqoIGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXdcclxuXHRcdGV2ZW50RHJvcDogZnVuY3Rpb24oZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldyl7XHJcblx0XHRcdGlmIChldmVudC5pZCl7XHJcblx0XHRcdFx0ZGF0YUxvYWRlci51cGRhdGVFdmVudERhdGFPbkRyb3AoZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldylcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXZlcnRGdW5jKCk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8g5pel5Y6G5LqL5Lu25pel5pyf6IyD5Zu06YeN572uXHJcblx0XHRldmVudFJlc2l6ZTogZnVuY3Rpb24oZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldyl7XHJcblx0XHRcdGlmIChldmVudC5pZCl7XHJcblx0XHRcdFx0ZGF0YUxvYWRlci51cGRhdGVFdmVudERhdGFPblJlc2l6ZShldmVudCwgZGVsdGEsIHJldmVydEZ1bmMsIGpzRXZlbnQsIHVpLCB2aWV3KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXZlcnRGdW5jKCk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblxyXG5cdFx0ZXZlbnRSZW5kZXI6IGZ1bmN0aW9uKGV2ZW50T2JqLCAkZWwpIHtcclxuXHRcdFx0Ly8g5YWD57Sg5bey57uP5riy5p+T77yM5Y+v5L+u5pS55YWD57SgXHJcblx0XHRcdGNvbnN0IGlzQ29tcGxldGUgPSBwYXJzZUludChldmVudE9iai5jb21wbGV0ZSkgPT0gNTtcclxuXHRcdFx0aWYgKCBpc0NvbXBsZXRlICkge1xyXG5cdFx0XHRcdC8vIOagt+W8j1xyXG5cdFx0XHRcdCRlbC5hZGRDbGFzcygndGMtY29tcGxldGUnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8g5pel5Y6G5LqL5Lu254K55Ye75ZCO5LqL5Lu25Y+l5p+EXHJcblx0XHRldmVudENsaWNrOiBmdW5jdGlvbiggZXZlbnQsIGpzRXZlbnQsIHZpZXcgKSB7XHJcblx0XHRcdC8vIHRoaXMg5oyH5ZCR5YyF6KO55LqL5Lu255qEPGE+5YWD57SgXHJcblxyXG5cdFx0XHQvLyDliKTmlq3mmK/lkKblt7Lnu4/muLLmn5PlvLnnqpdcclxuXHRcdFx0aWYgKCAhZ19lZGl0UG9wcGVyICkge1xyXG5cdFx0XHRcdGdfZWRpdFBvcHBlciA9IHJlbmRlckVkaXRQb3BwZXIoe1xyXG5cdFx0XHRcdFx0J2V2ZW50JzogZXZlbnQsXHJcblx0XHRcdFx0XHQnanNFdmVudCc6IGpzRXZlbnQsXHJcblx0XHRcdFx0XHQndmlldyc6IHZpZXdcclxuXHRcdFx0XHR9LCB0aGlzKS5FdmVudFBvcG92ZXIoJ3Nob3cnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyDmm7TmlrByZWZlcmVuY2VcclxuXHRcdFx0XHRnX2VkaXRQb3BwZXIuRXZlbnRQb3BvdmVyKCdvcHRpb24nLCB7XHJcblx0XHRcdFx0XHRhcmdzOiB7XHJcblx0XHRcdFx0XHRcdCdldmVudCc6IGV2ZW50LFxyXG5cdFx0XHRcdFx0XHQnanNFdmVudCc6IGpzRXZlbnQsXHJcblx0XHRcdFx0XHRcdCd2aWV3Jzogdmlld1xyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHRpdGxlOiBldmVudC50aXRsZSxcclxuXHRcdFx0XHRcdHJlZmVyZW5jZTogdGhpc1xyXG5cdFx0XHRcdH0pLkV2ZW50UG9wb3ZlcigndXBkYXRlJykuRXZlbnRQb3BvdmVyKCdzaG93Jyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblx0XHRcclxuXHR9KVxyXG59KVxyXG4qLyIsImltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuaW1wb3J0ICdmdWxsY2FsZW5kYXInO1xyXG5pbXBvcnQgeyBXaXpEYXRhYmFzZSBhcyBnX2RiLCBXaXpDb21tb25VSSBhcyBnX2Ntbn0gZnJvbSAnLi4vdXRpbHMvV2l6SW50ZXJmYWNlJztcclxuaW1wb3J0IENvbmZpZyBmcm9tICcuLi91dGlscy9Db25maWcnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FsZW5kYXJFdmVudCB7XHJcblx0LyoqXHJcbiAgICAgKiDliJvlu7rkuIDkuKrpgJrnlKjml6XnqIsuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IGRhdGEg5Y6f5aeL5pWw5o2u57G75Z6L77yM5Y+v5Lul5pivIFdpekV2ZW50LCBGdWxsQ2FsZW5kYXJFdmVudCDku6Xlj4ogR1VJRC5cclxuICAgICAqL1xyXG5cdGNvbnN0cnVjdG9yKCBkYXRhLCBjYWxlbmRhciApIHtcclxuXHRcdGlmICghZ19kYikgdGhyb3cgbmV3IEVycm9yKCdJV2l6RGF0YWJhc2UgaXMgbm90IHZhbGlkLicpO1xyXG5cdFx0Y29uc3QgdHlwZSA9IHRoaXMuX2NoZWNrRGF0YVR5cGUoZGF0YSk7XHJcblx0XHRzd2l0Y2ggKCB0eXBlICkge1xyXG5cdFx0XHRjYXNlIFwiV2l6RXZlbnRcIjpcclxuXHRcdFx0Y2FzZSBcIkZ1bGxDYWxlbmRhckV2ZW50XCI6XHJcblx0XHRcdFx0dGhpcy5fY3JlYXRlKGRhdGEsIHR5cGUpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIFwiR1VJRFwiOlxyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHQvL1RPRE86IOiOt+W+l1dpekV2ZW505pWw5o2u77yM5bm25Yib5bu65a+56LGhXHJcblx0XHRcdFx0XHRjb25zdCBkb2MgPSBnX2RiLkRvY3VtZW50RnJvbUdVSUQoZGF0YSk7XHJcblx0XHRcdFx0XHRjb25zdCBuZXdFdmVudERhdGEgPSB7XHJcblx0XHRcdFx0XHRcdFwiQ0FMRU5EQVJfRU5EXCIgOiBkb2MuR2V0UGFyYW1WYWx1ZSgnQ0FMRU5EQVJfRU5EJyksXHJcblx0XHRcdFx0XHRcdFwiQ0FMRU5EQVJfSU5GT1wiIDogZG9jLkdldFBhcmFtVmFsdWUoJ0NBTEVOREFSX0lORk8nKSxcclxuXHRcdFx0XHRcdFx0XCJDQUxFTkRBUl9FWFRSQUlORk9cIiA6IGRvYy5HZXRQYXJhbVZhbHVlKCdDQUxFTkRBUl9FWFRSQUlORk8nKSxcclxuXHRcdFx0XHRcdFx0XCJDQUxFTkRBUl9TVEFSVFwiIDogZG9jLkdldFBhcmFtVmFsdWUoJ0NBTEVOREFSX1NUQVJUJyksXHJcblx0XHRcdFx0XHRcdFwiQ0FMRU5EQVJfUkVDVVJSRU5DRVwiIDogZG9jLkdldFBhcmFtVmFsdWUoJ0NBTEVOREFSX1JFQ1VSUkVOQ0UnKSxcclxuXHRcdFx0XHRcdFx0XCJDQUxFTkRBUl9FTkRSRUNVUlJFTkNFXCIgOiBkb2MuR2V0UGFyYW1WYWx1ZSgnQ0FMRU5EQVJfRU5EUkVDVVJSRU5DRScpLFxyXG5cdFx0XHRcdFx0XHRcImNyZWF0ZWRcIiA6IG1vbWVudChkb2MuRGF0ZUNyZWF0ZWQpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpLFxyXG5cdFx0XHRcdFx0XHRcImd1aWRcIiA6IGRvYy5HVUlELFxyXG5cdFx0XHRcdFx0XHRcInRpdGxlXCIgOiBkb2MuVGl0bGUsXHJcblx0XHRcdFx0XHRcdFwidXBkYXRlZFwiIDogbW9tZW50KGRvYy5EYXRlTW9kaWZpZWQpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR0aGlzLl9jcmVhdGUobmV3RXZlbnREYXRhLCAnV2l6RXZlbnQnKTtcclxuXHRcdFx0XHR9IGNhdGNoIChlKSB7IGNvbnNvbGUuZXJyb3IoZSk7IH1cclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRfY3JlYXRlKGRhdGEsIHR5cGUpIHtcclxuXHRcdGxldCBzdGFydCwgZW5kLCBpZCwgYmtDb2xvciwgYWxsRGF5LCBjb21wbGV0ZSwgZGF0ZUNvbXBsZXRlZCwgcnB0UnVsZSwgcnB0RW5kO1xyXG5cdFx0c3dpdGNoICh0eXBlKSB7XHJcblx0XHRcdGNhc2UgXCJHVUlEXCI6XHJcblx0XHRcdGNhc2UgXCJXaXpFdmVudFwiOlxyXG5cdFx0XHRcdHRoaXMuX0luZm8gPSB0aGlzLl9wYXJzZUluZm8oZGF0YS5DQUxFTkRBUl9JTkZPKTtcclxuXHRcdFx0XHR0aGlzLl9FeHRyYUluZm8gPSBkYXRhLkNBTEVOREFSX0VYVFJBSU5GTyA/IHRoaXMuX3BhcnNlSW5mbyhkYXRhLkNBTEVOREFSX0VYVFJBSU5GTykgOiB0aGlzLl9nZXREZWZhdWx0RXh0cmFJbmZvKCk7XHJcblx0XHRcdFx0Ly8g57uf5LiA5Y+Y6YePXHJcblx0XHRcdFx0aWQgPSBkYXRhLmd1aWQ7XHJcblx0XHRcdFx0c3RhcnQgPSBkYXRhLkNBTEVOREFSX1NUQVJUO1xyXG5cdFx0XHRcdGVuZCA9IGRhdGEuQ0FMRU5EQVJfRU5EO1xyXG5cdFx0XHRcdC8vIOWIpOaWreaYr+WQpueUqOaIt+iHquWumuS5ieiDjOaZr+iJsu+8jOWQkeS4i+WFvOWuueWOn+eJiOaXpeWOhlxyXG5cdFx0XHRcdGJrQ29sb3IgPSB0aGlzLl9JbmZvLmNpID8gKCBwYXJzZUludCh0aGlzLl9JbmZvLmNpKSA9PSAwID8gdGhpcy5fSW5mby5iIDogQ29uZmlnLmNvbG9ySXRlbXNbdGhpcy5fSW5mby5jaV0uY29sb3JWYWx1ZSApIDogdGhpcy5fSW5mby5iO1xyXG5cdFx0XHRcdGFsbERheSA9IGRhdGEuQ0FMRU5EQVJfRU5ELmluZGV4T2YoXCIyMzo1OTo1OVwiKSAhPSAtMSA/IHRydWUgOiBmYWxzZTtcclxuXHRcdFx0XHRjb21wbGV0ZSA9IHRoaXMuX0V4dHJhSW5mby5Db21wbGV0ZTtcclxuXHRcdFx0XHRkYXRlQ29tcGxldGVkID0gdGhpcy5fRXh0cmFJbmZvLkRhdGVDb21wbGV0ZWQ7XHJcblx0XHRcdFx0Ly8g6YeN5aSN5LqL5Lu2XHJcblx0XHRcdFx0cnB0UnVsZSA9IGRhdGEuQ0FMRU5EQVJfUkVDVVJSRU5DRTtcclxuXHRcdFx0XHRycHRFbmQgPSBkYXRhLkNBTEVOREFSX0VORFJFQ1VSUkVOQ0U7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgXCJGdWxsQ2FsZW5kYXJFdmVudFwiOlxyXG5cdFx0XHRcdGlkID0gZGF0YS5pZDtcclxuXHRcdFx0XHRzdGFydCA9IGRhdGEuc3RhcnQ7XHJcblx0XHRcdFx0ZW5kID0gZGF0YS5lbmQ7XHJcblx0XHRcdFx0YmtDb2xvciA9IGRhdGEuYmFja2dyb3VuZENvbG9yO1xyXG5cdFx0XHRcdGFsbERheSA9IGRhdGEuYWxsRGF5ID8gZGF0YS5hbGxEYXkgOiAhJC5mdWxsQ2FsZW5kYXIubW9tZW50KGRhdGEuc3RhcnQpLmhhc1RpbWUoKTtcclxuXHRcdFx0XHRjb21wbGV0ZSA9IGRhdGEuY29tcGxldGUgfHwgMDtcclxuXHRcdFx0XHRkYXRlQ29tcGxldGVkID0gZGF0YS5kYXRlQ29tcGxldGVkIHx8ICcnO1xyXG5cdFx0XHRcdHJwdFJ1bGUgPSBkYXRhLnJwdFJ1bGU7XHJcblx0XHRcdFx0cnB0RW5kID0gZGF0YS5ycHRFbmRcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgaWRlbnRpZnkgZGF0YSB0eXBlLicpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdFx0Ly8g5Z+65pys5L+h5oGvXHJcblx0XHR0aGlzLmlkID0gaWQ7XHJcblx0XHR0aGlzLnRpdGxlID0gZGF0YS50aXRsZTtcclxuXHRcdC8vIOaXtumXtOS/oeaBr1xyXG5cdFx0dGhpcy5hbGxEYXkgPSBhbGxEYXk7XHJcblx0XHQvLyDms6jmhI/vvIFzdGFydC9lbmQg5Y+v6IO95pivbW9tZW505a+56LGh5oiW6ICFc3Ry77yM5omA5Lul5LiA5b6L5YWI6L2s5o2i5oiQbW9tZW505YaN5qC85byP5YyW6L6T5Ye6XHJcblx0XHR0aGlzLnN0YXJ0ID0gYWxsRGF5ID8gbW9tZW50KHN0YXJ0KS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpIDogbW9tZW50KHN0YXJ0KS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdHRoaXMuZW5kID0gYWxsRGF5ID8gbW9tZW50KGVuZCkuZm9ybWF0KFwiWVlZWS1NTS1ERFwiKSA6IG1vbWVudChlbmQpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0dGhpcy5jcmVhdGVkID0gZGF0YS5jcmVhdGVkID8gZGF0YS5jcmVhdGVkIDogbW9tZW50KHN0YXJ0KS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdHRoaXMudXBkYXRlZCA9IGRhdGEudXBkYXRlZCA/IGRhdGEudXBkYXRlZCA6IG1vbWVudCgpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0Ly8g6K6+572u5L+h5oGvXHJcblx0XHR0aGlzLnRleHRDb2xvciA9ICdibGFjayc7XHJcblx0XHR0aGlzLmJhY2tncm91bmRDb2xvciA9IGJrQ29sb3I7XHJcblx0XHR0aGlzLmNvbXBsZXRlID0gY29tcGxldGU7XHJcblx0XHR0aGlzLmRhdGVDb21wbGV0ZWQgPSBkYXRlQ29tcGxldGVkO1xyXG5cdFx0Ly8g6YeN5aSN5LqL5Lu2XHJcblx0XHR0aGlzLnJwdFJ1bGUgPSBycHRSdWxlO1xyXG5cdFx0dGhpcy5ycHRFbmQgPSBycHRFbmQ7XHJcblx0XHQvL1xyXG5cdFx0dGhpcy5fdXBkYXRlKCk7XHJcblx0fVxyXG5cclxuXHRfY2hlY2tEYXRhVHlwZShkYXRhKSB7XHJcblx0XHRjb25zdCBvYmpDbGFzcyA9IGRhdGEuY29uc3RydWN0b3I7XHJcbiAgICAgICAgY29uc3QgR1VJRF9SZWdFeHIgPSAvXlswLTlhLWZdezh9LVswLTlhLWZdezR9LVsxLTVdWzAtOWEtZl17M30tWzg5YWJdWzAtOWEtZl17M30tWzAtOWEtZl17MTJ9JC9pO1xyXG4gICAgICAgIGxldCB0eXBlO1xyXG4gICAgICAgIHN3aXRjaCAob2JqQ2xhc3MpIHtcclxuICAgICAgICAgICAgY2FzZSBTdHJpbmc6XHJcbiAgICAgICAgICAgICAgICBpZiAoIEdVSURfUmVnRXhyLnRlc3QoZGF0YSkgKSB0eXBlID0gXCJHVUlEXCI7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHRocm93IG5ldyBFcnJvcignVW5rbm93biBkYXRhLCBjYW5ub3QgY3JlYXRlIENhbGVuZGFyRXZlbnQgb2JqZWN0LicpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgT2JqZWN0OlxyXG5cdFx0XHRcdGlmICggZGF0YS5DQUxFTkRBUl9JTkZPICYmIGRhdGEudGl0bGUgKSB7IFxyXG5cdFx0XHRcdFx0dHlwZSA9ICdXaXpFdmVudCc7XHJcblx0XHRcdFx0fSBlbHNlIGlmICggZGF0YS5zdGFydCAmJiBkYXRhLnRpdGxlICkge1xyXG5cdFx0XHRcdFx0dHlwZSA9ICdGdWxsQ2FsZW5kYXJFdmVudCc7XHJcblx0XHRcdFx0fVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0eXBlO1xyXG5cdH07XHJcblxyXG5cdF9wYXJzZUluZm8oSW5mb1N0cmluZykge1xyXG5cdFx0Y29uc3QgSW5mb09iamVjdCA9IHt9O1xyXG5cdFx0Ly8g5ouG6KejQ0FMRU5EQVJfSU5GT1xyXG5cdFx0Y29uc3QgSW5mb0FycmF5ID0gSW5mb1N0cmluZy5zcGxpdCgnLycpO1xyXG5cdFx0SW5mb0FycmF5LmZvckVhY2goZnVuY3Rpb24oaXRlbSwgaW5kZXgsIGFycil7XHJcblx0XHRcdGNvbnN0IHBhaXIgPSBpdGVtLnNwbGl0KCc9Jyk7XHJcblx0XHRcdEluZm9PYmplY3RbcGFpclswXV0gPSBwYWlyWzFdO1xyXG5cdFx0fSk7XHJcblx0XHQvLyDlpITnkIbpopzoibLlgLxcclxuXHRcdGlmICggSW5mb09iamVjdC5iICkgSW5mb09iamVjdC5iID0gJyMnICsgSW5mb09iamVjdC5iO1xyXG5cclxuXHRcdHJldHVybiBJbmZvT2JqZWN0O1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG4gICAgICog5bCGIEluZm8g5a+56LGh5bqP5YiX5YyWLlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtJbmZvT2JqZWN0PV0g5o+Q5L6bIEluZm8g5a+56LGh77yM6buY6K6k5Li6YHRoaXMuX0luZm9gLlxyXG4gICAgICogQHJldHVybiB7U3RyaW5nfSDov5Tlm57nlKjkuo5JbmZv5a+56LGh5a2X56ym5LiyLlxyXG4gICAgICovXHJcblx0X3N0cmluZ2lmeUluZm8oIEluZm9PYmplY3QgPSB0aGlzLl9JbmZvICkge1xyXG5cdFx0aWYgKCAhSW5mb09iamVjdCApIHJldHVybiAnJztcclxuXHRcdGNvbnN0IEluZm9BcnJheSA9IFtdO1xyXG5cdFx0Y29uc3QgSW5mb09iamVjdEtleXNBcnJheSA9IE9iamVjdC5rZXlzKEluZm9PYmplY3QpO1xyXG5cdFx0SW5mb09iamVjdEtleXNBcnJheS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0sIGluZGV4LCBhcnIpe1xyXG5cdFx0XHRjb25zdCBzaW5nbGVJbmZvID0gYCR7aXRlbX09JHtJbmZvT2JqZWN0W2l0ZW1dfWA7XHJcblx0XHRcdEluZm9BcnJheS5wdXNoKHNpbmdsZUluZm8pO1xyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gSW5mb0FycmF5LmpvaW4oJy8nKS5yZXBsYWNlKCcjJywgJycpO1xyXG5cdH07XHJcblxyXG5cdF91cGRhdGUoKSB7XHJcblx0XHR0aGlzLl91cGRhdGVJbmZvKCk7XHJcblx0XHR0aGlzLl91cGRhdGVFeHRyYUluZm8oKTtcclxuXHR9O1xyXG5cclxuXHRfdXBkYXRlSW5mbygpIHtcclxuXHRcdGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cdFx0Y29uc3QgSW5mb09iamVjdCA9IHtcclxuXHRcdFx0J2InOiBudWxsLCAvL+iDjOaZr+iJsmhleOWAvFxyXG5cdFx0XHQncic6ICctMScsIC8v5o+Q6YaS5pa55byPXHJcblx0XHRcdCdjJzogJzAnLCAvL+e7k+adn+aPkOmGkuS/oeaBr1xyXG5cdFx0XHQnY2knOiAwIC8v6IOM5pmv6ImySUTvvIzpu5jorqQgMCDooajnpLrog4zmma/kuLrnlKjmiLfoh6rlrprkuYlcclxuXHRcdH07XHJcblx0XHQvLyDmm7TmlrDog4zmma/oibInYidcclxuXHRcdEluZm9PYmplY3RbJ2InXSA9IHRoaXMuYmFja2dyb3VuZENvbG9yLnJlcGxhY2UoJyMnLCAnJyk7XHJcblx0XHQvLyDmm7TmlrDpopzoibLmjIfmlbAnY2knXHJcblx0XHRDb25maWcuY29sb3JJdGVtcy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0sIGluZGV4LCBhcnIpe1xyXG5cdFx0XHRpZiAoIGl0ZW0uY29sb3JWYWx1ZSA9PSAgdGhhdC5iYWNrZ3JvdW5kQ29sb3IgKSB7XHJcblx0XHRcdFx0Ly8g5b2T5pel56iL6IOM5pmv6Imy5LiO6Imy6KGo5Yy56YWN5pe25YiZ55SoIGNvbG9yIGlkZXgg5p2l5YKo5a2Y77yI5YW85a655Y6f54mI5pel5Y6G5o+S5Lu277yJXHJcblx0XHRcdFx0SW5mb09iamVjdFsnY2knXSA9IGluZGV4O1xyXG5cdFx0XHR9O1xyXG5cdFx0fSk7XHJcblx0XHQvLyDlupTnlKjmm7TmlrBcclxuXHRcdHRoaXMuX0luZm8gPSBJbmZvT2JqZWN0O1xyXG5cdH07XHJcblxyXG5cdF9nZXREZWZhdWx0RXh0cmFJbmZvKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0J0NvbXBsZXRlJzogMCwgLy9cclxuXHRcdFx0J0RhdGVDb21wbGV0ZWQnOiAnJywgLy8gSVNPIOagh+WHhuaXpeacn+Wtl+espuS4siBZWVlZLU1NLUREIDAwOjAwOjAwXHJcblx0XHRcdCdQcmlvcic6IDBcclxuXHRcdH07XHJcblx0fTtcclxuXHJcblx0X3VwZGF0ZUV4dHJhSW5mbygpIHtcclxuXHRcdGNvbnN0IEV4dHJhSW5mb09iamVjdCA9IHtcclxuXHRcdFx0J0NvbXBsZXRlJzogMCxcclxuXHRcdFx0J0RhdGVDb21wbGV0ZWQnOiAnJyxcclxuXHRcdFx0J1ByaW9yJzogMFxyXG5cdFx0fTtcclxuXHRcdEV4dHJhSW5mb09iamVjdFsnQ29tcGxldGUnXSA9IHRoaXMuY29tcGxldGU7XHJcblx0XHRFeHRyYUluZm9PYmplY3RbJ0RhdGVDb21wbGV0ZWQnXSA9IHRoaXMuZGF0ZUNvbXBsZXRlZDtcclxuXHRcdHRoaXMuX0V4dHJhSW5mbyA9IEV4dHJhSW5mb09iamVjdDtcclxuXHR9O1xyXG5cclxuXHRfZ2V0RXZlbnRIdG1sKHRpdGxlID0gdGhpcy50aXRsZSwgY29udGVudCA9ICcnKXtcclxuXHRcdGNvbnN0IGh0bWxUZXh0ID0gXHJcblx0XHRcdGA8aHRtbD5cclxuXHRcdFx0XHQ8aGVhZD5cclxuXHRcdFx0XHRcdDxtZXRhIGh0dHAtZXF1aXY9XCJDb250ZW50LVR5cGVcIiBjb250ZW50PVwidGV4dC9odG1sOyBjaGFyc2V0PXVuaWNvZGVcIj5cclxuXHRcdFx0XHRcdDx0aXRsZT4ke3RpdGxlfTwvdGl0bGU+IFxyXG5cdFx0XHRcdDwvaGVhZD5cclxuXHRcdFx0XHQ8Ym9keT5cclxuXHRcdFx0XHRcdDwhLS1XaXpIdG1sQ29udGVudEJlZ2luLS0+XHJcblx0XHRcdFx0XHQ8ZGl2PiR7Y29udGVudH08L2Rpdj5cclxuXHRcdFx0XHRcdDwhLS1XaXpIdG1sQ29udGVudEVuZC0tPlxyXG5cdFx0XHRcdDwvYm9keT5cclxuXHRcdFx0PC9odG1sPmA7XHJcblx0XHJcblx0XHQgIHJldHVybiBodG1sVGV4dFxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG4gICAgICog5qC55o2u5pel56iL55qE6YeN5aSN6KeE5YiZ55Sf5oiQIEZ1bGxDYWxlbmRhciBldmVudFNvdXJjZS5cclxuXHQgKiBAcGFyYW0ge1N0cmluZ30gc3RhcnQg5p+l6K+i6LW35aeL77yMSVNPIOagh+WHhuaXpeacn+Wtl+espuS4si5cclxuXHQgKiBAcGFyYW0ge1N0cmluZ30gZW5kIOafpeivoue7k+adn++8jElTTyDmoIflh4bml6XmnJ/lrZfnrKbkuLIuXHJcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBldmVudFNvdXJjZS5cclxuICAgICAqL1xyXG5cdGdlbmVyYXRlUmVwZWF0RXZlbnRzKHN0YXJ0LCBlbmQpIHtcclxuXHRcdGlmICggIXRoaXMucnB0UnVsZSApIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGZpbmQgQ2FsZW5kYXJFdmVudCByZXBlYXQgcnVsZS4nKTtcclxuXHRcdGNvbnN0IGV2ZW50U291cmNlID0ge1xyXG5cdFx0XHRpZDogdGhpcy5pZCxcclxuXHRcdFx0ZXZlbnRzOiBbXVxyXG5cdFx0fVxyXG5cdFx0Ly/moLnmja5ycHRSdWxl55Sf5oiQ6YeN5aSN5pel5pyf77yM5bm255Sf5oiQ5LqL5Lu2XHJcblx0XHRjb25zdCBkYXlBcnJheSA9IHRoaXMuX2dldFJlbmRlclJlcGVhdERheShzdGFydCwgZW5kKTtcclxuXHRcdGZvciAoIGxldCBkYXkgb2YgZGF5QXJyYXkgKSB7XHJcblx0XHRcdC8vIGRheSDmmK/kuIDkuKpNb21lbnTml6XmnJ/lr7nosaFcclxuXHRcdFx0Y29uc3QgbmV3RXZlbnQgPSB0aGlzLnRvRnVsbENhbGVuZGFyRXZlbnQoKTtcclxuXHRcdFx0bmV3RXZlbnQuc3RhcnQgPSBkYXkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRcdG5ld0V2ZW50LmVuZCA9IG1vbWVudChuZXdFdmVudC5lbmQpLmFkZCggZGF5LmRpZmYoIG1vbWVudCh0aGlzLnN0YXJ0KSApICkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRcdGV2ZW50U291cmNlLmV2ZW50cy5wdXNoKG5ld0V2ZW50KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZXZlbnRTb3VyY2U7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcbiAgICAgKiDmoLnmja7op4TliJnnlJ/miJDml6XmnJ/mlbDnu4RcclxuICAgICAqIEByZXR1cm5zIHtPYmplY3RbXX0g5YyF5ZCr5LiA57O75YiXYE1vbWVudGDml6XmnJ/lr7nosaHnmoTmlbDnu4QuXHJcbiAgICAgKi9cclxuXHRfZ2V0UmVuZGVyUmVwZWF0RGF5KHN0YXJ0LCBlbmQpIHtcclxuXHRcdGNvbnN0IHJwdFJ1bGUgPSB0aGlzLnJwdFJ1bGU7XHJcblx0XHRsZXQgZGF5QXJyYXk7XHJcblx0XHRsZXQgcmVnZXg7XHJcblx0XHRjb25zb2xlLmNvdW50KHJwdFJ1bGUpO1xyXG5cdFx0aWYgKCAocmVnZXggPSAvXkV2ZXJ5KFxcZCk/V2Vla3M/KFxcZCopJC8pLnRlc3QocnB0UnVsZSkgKSB7XHJcblx0XHRcdC8vIOavj1sxMjM0XeWRqFs3MTIzNDU2XVxyXG5cdFx0XHRjb25zdCBjdXJXZWVrRGF5ID0gbW9tZW50KHRoaXMuc3RhcnQpLmRheSgpO1xyXG5cdFx0XHRjb25zdCByZXN1bHRzID0gcmVnZXguZXhlYyhycHRSdWxlKTtcclxuXHRcdFx0Y29uc3QgaW50ZXJXZWVrID0gcmVzdWx0c1sxXTtcclxuXHRcdFx0Y29uc3QgbnVtYmVyID0gcmVzdWx0c1syXSB8fCBgJHtjdXJXZWVrRGF5fWA7XHJcblx0XHRcdGRheUFycmF5ID0gdGhpcy5fZ2V0V2Vla2x5UmVwZWF0RGF5KG51bWJlciwgc3RhcnQsIGVuZCwgaW50ZXJXZWVrKTtcclxuXHJcblx0XHR9IGVsc2UgaWYgKCAocmVnZXggPSAvXkV2ZXJ5V2Vla2RheShcXGQqKSQvKS50ZXN0KHJwdFJ1bGUpICkge1xyXG5cdFx0XHQvLyDmr4/kuKrlt6XkvZzml6VFdmVyeVdlZWtkYXkxMzVcclxuXHRcdFx0Y29uc3QgcmVzdWx0cyA9IHJlZ2V4LmV4ZWMocnB0UnVsZSk7XHJcblx0XHRcdGNvbnN0IG51bWJlciA9IHJlc3VsdHNbMV0gfHwgJzEyMzQ1JztcclxuXHRcdFx0ZGF5QXJyYXkgPSB0aGlzLl9nZXRXZWVrbHlSZXBlYXREYXkobnVtYmVyLCBzdGFydCwgZW5kKTtcclxuXHJcblx0XHR9IGVsc2UgaWYgKCAocmVnZXggPSAvRGFpbHl8V2Vla2x5fE1vbnRobHl8WWVhcmx5LykudGVzdChycHRSdWxlKSApIHtcclxuXHRcdFx0Ly8gRGFpbHl8V2Vla2x5fE1vbnRobHl8WWVhcmx5XHJcblx0XHRcdGNvbnN0IHBlclJ1bGUgPSByZWdleC5leGVjKHJwdFJ1bGUpWzBdXHJcblx0XHRcdGRheUFycmF5ID0gdGhpcy5fZ2V0UGVyUmVwZWF0RGF5cyhzdGFydCwgZW5kLCBwZXJSdWxlKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGRheUFycmF5O1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG4gICAgICog5qC55o2u5q+P5ZGo6KeE5YiZ55Sf5oiQ5pel5pyf5pWw57uEXHJcblx0ICogQHBhcmFtIHtTdHJpbmd9IG51bWJlciDmlbTmlbDlrZfnrKbkuLLooajnpLrnmoTop4TliJnvvJtcclxuICAgICAqIEByZXR1cm5zIHtPYmplY3RbXX0g5YyF5ZCr5LiA57O75YiXTW9tZW505pel5pyf5a+56LGh55qE5pWw57uELlxyXG4gICAgICovXHJcblx0X2dldFdlZWtseVJlcGVhdERheShudW1iZXIsIHN0YXJ0LCBlbmQsIGludGVyV2Vla3MgPSAnMScpIHtcclxuXHRcdC8v6L+U5ZueW3tzdGFydCwgZW5kfSwge3N0YXJ0LCBlbmR9LCB7c3RhcnQsIGVuZH1dXHJcblx0XHQvL+iAg+iZkea4suafk+iMg+WbtO+8jOS7peWPiue7k+adn+W+queOr+eahOaXpeacn1xyXG5cdFx0Y29uc3Qgdmlld1N0YXJ0ID0gbW9tZW50KHRoaXMuc3RhcnQpO1xyXG5cdFx0Y29uc3Qgdmlld0VuZCA9IG1vbWVudChlbmQpO1xyXG5cdFx0Y29uc3QgcnB0RW5kID0gdGhpcy5ycHRFbmQgPyBtb21lbnQodGhpcy5ycHRFbmQpIDogdmlld0VuZDtcclxuXHRcdGxldCBkYXlBcnJheSA9IFtdO1xyXG5cdFx0Y29uc3QgaW50ZXJ2YWxXZWVrcyA9IGludGVyV2Vla3MgPyBwYXJzZUludChpbnRlcldlZWtzKSA6IDE7XHJcblx0XHRjb25zdCB3ZWVrZGF5cyA9IG51bWJlci5yZXBsYWNlKCc3JywgJzAnKS5zcGxpdCgnJyk7IC8v5ZGo5pelMH425ZGo5YWtXHJcblx0XHRmb3IgKCBsZXQgZGF5IG9mIHdlZWtkYXlzICkge1xyXG5cdFx0XHQvL1xyXG5cdFx0XHRsZXQgY3VyV2Vla0RheSA9IHBhcnNlSW50KGRheSksIG5ld0V2ZW50U3RhcnREYXRlID0gbW9tZW50KHZpZXdTdGFydCk7XHJcblx0XHRcdGRvIHtcclxuXHRcdFx0XHQvLyDliJvlu7rmlrBNb21lbnTlr7nosaFcclxuXHRcdFx0XHRuZXdFdmVudFN0YXJ0RGF0ZSA9IG1vbWVudCh2aWV3U3RhcnQpLmRheShjdXJXZWVrRGF5KTtcclxuXHRcdFx0XHQvLyDmoLnmja7ml6XnqIvorr7nva50aW1lIHBhcnRcclxuXHRcdFx0XHRjb25zdCBldmVudFN0YXJ0ID0gbW9tZW50KHRoaXMuc3RhcnQpXHJcblx0XHRcdFx0bmV3RXZlbnRTdGFydERhdGUuc2V0KHtcclxuXHRcdFx0XHRcdCdob3VyJzogZXZlbnRTdGFydC5nZXQoJ2hvdXInKSxcclxuXHRcdFx0XHRcdCdtaW51dGUnOiBldmVudFN0YXJ0LmdldCgnbWludXRlJyksXHJcblx0XHRcdFx0XHQnc2Vjb25kJzogZXZlbnRTdGFydC5nZXQoJ3NlY29uZCcpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQvLyDpgb/lhY3liJ3lp4vph43lpI3muLLmn5NcclxuXHRcdFx0XHRpZiAoICFuZXdFdmVudFN0YXJ0RGF0ZS5pc1NhbWUoIGV2ZW50U3RhcnQgKSApIGRheUFycmF5LnB1c2goIG1vbWVudChuZXdFdmVudFN0YXJ0RGF0ZSkgKTtcclxuXHRcdFx0XHQvLyDpmpTlpJrlsJHlkajph43lpI1cclxuXHRcdFx0XHRjdXJXZWVrRGF5ICs9IDcqaW50ZXJ2YWxXZWVrcztcclxuXHRcdFx0XHQvL2NvbnNvbGUubG9nKCBtb21lbnQobmV3RXZlbnRTdGFydERhdGUpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpICk7XHJcblx0XHRcdH0gd2hpbGUgKCBtb21lbnQodmlld1N0YXJ0KS5kYXkoY3VyV2Vla0RheSArIDcgKS5pc0JlZm9yZSggdmlld0VuZCApIFxyXG5cdFx0XHRcdFx0XHQmJiBtb21lbnQodmlld1N0YXJ0KS5kYXkoY3VyV2Vla0RheSArIDcgKS5pc0JlZm9yZSggcnB0RW5kICkgIClcclxuXHRcdFx0XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiBkYXlBcnJheTtcclxuXHR9O1xyXG5cclxuXHRfZ2V0UGVyUmVwZWF0RGF5cyhzdGFydCwgZW5kLCBwZXJSdWxlKSB7XHJcblx0XHRjb25zdCBwZXJSdWxlTWFwID0ge1xyXG5cdFx0XHQnRGFpbHknOiAnZGF5cycsXHJcblx0XHRcdCdXZWVrbHknIDogJ3dlZWtzJyxcclxuXHRcdFx0J01vbnRobHknIDogJ21vbnRocycsXHJcblx0XHRcdCdZZWFybHknIDogJ3llYXJzJ1xyXG5cdFx0fTtcclxuXHRcdGNvbnN0IHZpZXdTdGFydCA9IG1vbWVudCh0aGlzLnN0YXJ0KTtcclxuXHRcdGNvbnN0IHZpZXdFbmQgPSBtb21lbnQoZW5kKTtcclxuXHRcdGNvbnN0IHJwdEVuZCA9IHRoaXMucnB0RW5kID8gbW9tZW50KHRoaXMucnB0RW5kKSA6IHZpZXdFbmQ7XHJcblx0XHRsZXQgZGF5QXJyYXkgPSBbXTtcclxuXHRcdGNvbnN0IGV2ZW50U3RhcnQgPSBtb21lbnQodGhpcy5zdGFydClcclxuXHRcdGRvIHtcclxuXHRcdFx0Ly8g5aKe5Yqg5LiA5Liq5pyIXHJcblx0XHRcdGV2ZW50U3RhcnQuYWRkKDEsIHBlclJ1bGVNYXBbcGVyUnVsZV0pO1xyXG5cdFx0XHRkYXlBcnJheS5wdXNoKCBtb21lbnQoZXZlbnRTdGFydCkgKTtcclxuXHRcdH0gd2hpbGUgKCBldmVudFN0YXJ0LmlzQmVmb3JlKCB2aWV3RW5kICkgJiYgZXZlbnRTdGFydC5pc0JlZm9yZSggcnB0RW5kICkgKTtcclxuXHJcblx0XHRyZXR1cm4gZGF5QXJyYXk7XHJcblx0fVxyXG5cclxuXHR0b0Z1bGxDYWxlbmRhckV2ZW50KCkge1xyXG5cdFx0Y29uc3QgbmV3RXZlbnQgPSAkLmV4dGVuZCh7fSwgdGhpcyk7XHJcblx0XHQvLyDliKDpmaTml6DlhbPmlbDmja5cclxuXHRcdGRlbGV0ZSBuZXdFdmVudC5fSW5mbztcclxuXHRcdGRlbGV0ZSBuZXdFdmVudC5fRXh0cmFJbmZvO1xyXG5cdFx0cmV0dXJuIG5ld0V2ZW50O1xyXG5cdH07XHJcblxyXG5cdHRvV2l6RXZlbnREYXRhKCkge1xyXG5cdFx0dGhpcy5fdXBkYXRlKCk7XHJcblx0XHRjb25zdCBuZXdFdmVudCA9IHt9O1xyXG5cdFx0bmV3RXZlbnQudGl0bGUgPSB0aGlzLnRpdGxlO1xyXG5cdFx0bmV3RXZlbnQuZ3VpZCA9IHRoaXMuaWQ7XHJcblx0XHRuZXdFdmVudC5DQUxFTkRBUl9TVEFSVCA9IHRoaXMuYWxsRGF5ID8gbW9tZW50KHRoaXMuc3RhcnQpLmZvcm1hdCgnWVlZWS1NTS1ERCAwMDowMDowMCcpIDogdGhpcy5zdGFydDtcclxuXHRcdG5ld0V2ZW50LkNBTEVOREFSX0VORCA9IHRoaXMuYWxsRGF5ID8gbW9tZW50KHRoaXMuZW5kKS5mb3JtYXQoJ1lZWVktTU0tREQgMjM6NTk6NTknKSA6IHRoaXMuZW5kO1xyXG5cdFx0bmV3RXZlbnQuQ0FMRU5EQVJfSU5GTyA9IHRoaXMuX3N0cmluZ2lmeUluZm8odGhpcy5fSW5mbyk7XHJcblx0XHRuZXdFdmVudC5DQUxFTkRBUl9FWFRSQUlORk8gPSB0aGlzLl9zdHJpbmdpZnlJbmZvKHRoaXMuX0V4dHJhSW5mbyk7XHJcblx0XHRuZXdFdmVudC5jcmVhdGVkID0gdGhpcy5jcmVhdGVkO1xyXG5cdFx0bmV3RXZlbnQudXBkYXRlZCA9IHRoaXMudXBkYXRlZDtcclxuXHRcdHJldHVybiBuZXdFdmVudDtcclxuXHR9O1xyXG5cclxuXHRfc2F2ZUFsbFByb3AoKSB7XHJcblx0XHQvL1RPRE86IOS/neWtmOWFqOmDqOaVsOaNruWMheaLrFRpdGxlXHJcblx0XHQvLyDmm7TmlrDkuovku7bmlofmoaPmlbDmja5cclxuXHRcdGNvbnN0IGRvYyA9IGdfZGIuRG9jdW1lbnRGcm9tR1VJRCh0aGlzLmlkKTtcclxuXHRcdC8vIOS/neWtmOagh+mimFxyXG5cdFx0ZG9jLlRpdGxlID0gdGhpcy50aXRsZTtcclxuXHRcdC8vIOS/neWtmOaXtumXtOaVsOaNrlxyXG5cdFx0aWYgKCB0aGlzLmFsbERheSApIHtcclxuXHRcdFx0bGV0IHN0YXJ0U3RyID0gbW9tZW50KHRoaXMuc3RhcnQpLnNldCh7J2gnOiAwLCAnbSc6IDAsICdzJzogMH0pLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHRsZXQgZW5kU3RyID0gbW9tZW50KHRoaXMuZW5kKS5zZXQoeydoJzogMjMsICdtJzogNTksICdzJzogNTl9KS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfU1RBUlRcIiwgc3RhcnRTdHIpO1xyXG5cdFx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9FTkRcIiwgZW5kU3RyKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGxldCBzdGFydFN0ciA9IG1vbWVudCh0aGlzLnN0YXJ0KS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0bGV0IGVuZFN0ciA9IG1vbWVudCh0aGlzLmVuZCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX1NUQVJUXCIsIHN0YXJ0U3RyKTtcclxuXHRcdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfRU5EXCIsIGVuZFN0cik7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8g5L+d5a2YIENBTEVOREFSX0lORk9cclxuXHRcdHRoaXMuX3VwZGF0ZSgpO1xyXG5cdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfSU5GT1wiLCB0aGlzLl9zdHJpbmdpZnlJbmZvKHRoaXMuX0luZm8pKTtcclxuXHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX0VYVFJBSU5GT1wiLCB0aGlzLl9zdHJpbmdpZnlJbmZvKHRoaXMuX0V4dHJhSW5mbykpO1xyXG5cdH07XHJcblxyXG5cdC8vIOiuvue9ruaWh+aho+WxnuaAp+WAvFxyXG5cdF9zZXRQYXJhbVZhbHVlKGRvYywga2V5LCB2YWx1ZSkge1xyXG5cdFx0aWYgKCFkb2MpIHJldHVybiBmYWxzZTtcclxuXHRcdGRvYy5TZXRQYXJhbVZhbHVlKGtleSwgdmFsdWUpO1xyXG5cdH07XHJcblxyXG5cdF9jcmVhdGVXaXpFdmVudERvYygpIHtcclxuXHRcdC8vVE9ETzog5L+d5a2Y5YWo6YOo5pWw5o2u5YyF5ousVGl0bGVcclxuXHRcdC8vIOWIm+W7uldpekRvY1xyXG5cdFx0Y29uc3QgbG9jYXRpb24gPSBgTXkgRXZlbnRzLyR7IG1vbWVudCh0aGlzLnN0YXJ0KS5mb3JtYXQoJ1lZWVktTU0nKSB9L2A7XHJcblx0XHRjb25zdCBvYmpGb2xkZXIgPSBnX2RiLkdldEZvbGRlckJ5TG9jYXRpb24obG9jYXRpb24sIHRydWUpO1xyXG5cdFx0Y29uc3QgdGVtcEh0bWwgPSBnX2Ntbi5HZXRBVGVtcEZpbGVOYW1lKCcuaHRtbCcpO1xyXG5cdFx0Y29uc3QgaHRtbFRleHQgPSB0aGlzLl9nZXRFdmVudEh0bWwodGhpcy50aXRsZSwgJycpO1xyXG5cdFx0Z19jbW4uU2F2ZVRleHRUb0ZpbGUodGVtcEh0bWwsIGh0bWxUZXh0LCAndW5pY29kZScpO1xyXG5cdFx0Y29uc3QgZG9jID0gb2JqRm9sZGVyLkNyZWF0ZURvY3VtZW50Mih0aGlzLnRpdGxlLCBcIlwiKTtcclxuXHRcdGRvYy5DaGFuZ2VUaXRsZUFuZEZpbGVOYW1lKHRoaXMudGl0bGUpO1xyXG5cdFx0ZG9jLlVwZGF0ZURvY3VtZW50Nih0ZW1wSHRtbCwgdGVtcEh0bWwsIDB4MjIpO1xyXG5cdFx0Ly8g6K6+572u5qCH562+XHJcblx0XHQvL2lmICggdGFncyApIGRvYy5TZXRUYWdzVGV4dDIodGFncywgXCJDYWxlbmRhclwiKTtcclxuXHRcdC8vIOWwhuS/oeaBr+e8lueggeWIsFdpekRvY+WxnuaAp+S4reWOu1xyXG5cdFx0Y29uc3QgbmV3RXZlbnQgPSB0aGlzLnRvV2l6RXZlbnREYXRhKCk7XHJcblx0XHRkb2MuQWRkVG9DYWxlbmRhcihuZXdFdmVudC5DQUxFTkRBUl9TVEFSVCwgbmV3RXZlbnQuQ0FMRU5EQVJfRU5ELCBuZXdFdmVudC5DQUxFTkRBUl9JTkZPKTtcclxuXHRcdC8vIGNoYW5nZSBkYXRhYmFzZVxyXG5cdFx0ZG9jLnR5cGUgPSBcImV2ZW50XCI7XHJcblx0XHQvL1xyXG5cdFx0dGhpcy5pZCA9IGRvYy5HVUlEO1xyXG5cdH1cclxuXHJcblx0c2F2ZVRvV2l6RXZlbnREb2MoIHByb3AgPSAnYWxsJyApIHtcclxuXHRcdGlmICghZ19kYiB8fCAhZ19jbW4pIHRocm93IG5ldyBFcnJvcignSVdpekRhdGFiYXNlIG9yIElXaXpDb21tb25VSSBpcyBub3QgdmFsaWQuJyk7XHJcblx0XHQvL+ajgOafpeaWh+aho+aYr+WQpuWtmOWcqFxyXG5cdFx0Y29uc3QgZ3VpZFJlZ2V4ID0gL15bMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfSQvaTtcclxuXHRcdGNvbnN0IGlzV2l6RG9jRXhpc3QgPSBndWlkUmVnZXgudGVzdCh0aGlzLmlkKTtcclxuXHRcdC8vIOWIm+W7uuaIluiAheabtOaWsOaWh+aho1xyXG5cdFx0aWYgKCBpc1dpekRvY0V4aXN0ICkge1xyXG5cdFx0XHQvLyDmoLnmja7mjIfku6Tmm7TmlrDlhoXlrrlcclxuXHRcdFx0dGhpcy5fc2F2ZUFsbFByb3AoKTtcclxuXHRcdFx0Ly8g5pu05pawRnVsbENhbGVuZGFyXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQvLyDliJvlu7rmlrDnmoTkuovku7bmlofmoaNcclxuXHRcdFx0dGhpcy5fY3JlYXRlV2l6RXZlbnREb2MoKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdH07XHJcblxyXG5cdGRlbGV0ZUV2ZW50RGF0YSggaXNEZWxldGVEb2MgPSBmYWxzZSApe1xyXG5cdFx0Y29uc3QgZG9jID0gZ19kYi5Eb2N1bWVudEZyb21HVUlEKHRoaXMuaWQpO1xyXG5cdFx0aWYgKCFkb2MpIHRocm93IG5ldyBFcnJvcignQ2FuIG5vdCBmaW5kIEV2ZW50IHJlbGF0ZWQgV2l6RG9jdW1lbnQuJylcclxuXHRcdC8vIOenu+mZpOaXpeWOhuaVsOaNrlxyXG5cdFx0ZG9jLlJlbW92ZUZyb21DYWxlbmRhcigpO1xyXG5cdFx0Ly8g5Yig6Zmk5paH5qGjXHJcblx0XHRpZiAoIGlzRGVsZXRlRG9jICkgZG9jLkRlbGV0ZSgpO1xyXG5cdH1cclxuXHJcbn0iLCJpbXBvcnQgeyBXaXpEYXRhYmFzZSBhcyBvYmpEYXRhYmFzZSB9IGZyb20gJy4uL3V0aWxzL1dpekludGVyZmFjZSc7XHJcbmltcG9ydCBDYWxlbmRhckV2ZW50IGZyb20gJy4vQ2FsZW5kYXJFdmVudCc7XHJcblxyXG4vKiDmlbDmja7ojrflj5ZcclxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG4vKiog6K+l57G75LiOV2l6bm90ZeeahFdpekRhdGFiYXNl5o6l5Y+j5Lqk5o2i5L+h5oGv77yM6I635Y+W5pWw5o2uICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdpekV2ZW50RGF0YUxvYWRlciB7XHJcblxyXG5cdC8qKlxyXG4gICAgICog5Yib6YCg5LiA5Liq5LqL5Lu25pWw5o2u5Yqg6L295ZmoLlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBzdGFydCDmn6Xor6Lotbflp4vml6XmnJ/vvIxJU0/moIflh4bml6XmnJ/lrZfnrKbkuLIuXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGVuZCDmn6Xor6LmiKroh7Pml6XmnJ/vvIxJU0/moIflh4bml6XmnJ/lrZfnrKbkuLIuXHJcbiAgICAgKi9cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdGlmICghb2JqRGF0YWJhc2UpIHRocm93IG5ldyBFcnJvcignV2l6RGF0YWJhc2Ugbm90IHZhbGlkICEnKTtcclxuXHRcdHRoaXMuRGF0YWJhc2UgPSBvYmpEYXRhYmFzZTtcclxuXHRcdHRoaXMudXNlck5hbWUgPSBvYmpEYXRhYmFzZS5Vc2VyTmFtZTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuICAgICAqIOiOt+W+l+a4suafk+WQjueahOaJgOaciUZ1bGxDYWxlbmRhcuS6i+S7ti5cclxuXHQgKiBAcGFyYW0ge29iamVjdH0gdmlldyBpcyB0aGUgVmlldyBPYmplY3Qgb2YgRnVsbENhbGVuZGFyIGZvciB0aGUgbmV3IHZpZXcuXHJcblx0ICogQHBhcmFtIHtvYmplY3R9IGVsZW1lbnQgaXMgYSBqUXVlcnkgZWxlbWVudCBmb3IgdGhlIGNvbnRhaW5lciBvZiB0aGUgbmV3IHZpZXcuXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3RbXX0g6L+U5Zue55So5LqORnVsbENhbGVuZGFyIOa4suafk+eahCBldmVudFNvdXJjZXMg5pWw57uELlxyXG4gICAgICovXHJcblx0Z2V0RXZlbnRTb3VyY2VzKCB2aWV3LCBlbGVtZW50ICl7XHJcblx0XHRjb25zdCB2aWV3U3RhcnQgPSB2aWV3LnN0YXJ0LmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0Y29uc3Qgdmlld0VuZCA9IHZpZXcuZW5kLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0bGV0IGV2ZW50U291cmNlcyA9IFtdO1xyXG5cdFx0Ly/ojrflj5bmma7pgJrml6XnqItcclxuXHRcdGNvbnN0IGdlbmVyYWxFdmVudFNvdXJjZSA9IHtcclxuXHRcdFx0dHlwZTogJ2dlbmVyYWxFdmVudHMnLFxyXG5cdFx0XHQvL2V2ZW50czogdGhpcy5fZ2V0QWxsT3JpZ2luYWxFdmVudChbXSwgdGhpcy5fZDJzKGN1cnJlbnRWaWV3LnN0YXJ0LnRvRGF0ZSgpKSwgdGhpcy5fZDJzKGN1cnJlbnRWaWV3LmVuZC50b0RhdGUoKSkpXHJcblx0XHRcdGV2ZW50czogdGhpcy5fZ2V0QWxsT3JpZ2luYWxFdmVudCh2aWV3U3RhcnQsIHZpZXdFbmQpXHJcblx0XHR9XHJcblx0XHRldmVudFNvdXJjZXMucHVzaChnZW5lcmFsRXZlbnRTb3VyY2UpO1xyXG5cdFx0XHJcblx0XHQvL1RPRE86IOiOt+WPlumHjeWkjeaXpeeoi1xyXG5cdFx0Y29uc3QgcmVwZWF0RXZlbnRTb3VyY2VzID0gdGhpcy5fZ2V0QWxsUmVwZWF0RXZlbnQodmlld1N0YXJ0LCB2aWV3RW5kKTtcclxuXHRcdGV2ZW50U291cmNlcyA9IGV2ZW50U291cmNlcy5jb25jYXQocmVwZWF0RXZlbnRTb3VyY2VzKTtcclxuXHRcdC8vXHJcblx0XHRyZXR1cm4gZXZlbnRTb3VyY2VzO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG4gICAgICog5LuOV2l6RGF0YWJhc2XkuK3ojrflj5bmiYDmnInmlbDmja7mlofmoaMuXHJcblx0ICogQHBhcmFtIHthcnJheX0gZXZlbnRzIOWIneWni+S6i+S7tuaVsOe7hC5cclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gc3RhcnQgSVNP5qCH5YeG5pel5pyf5a2X56ym5LiyLlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBlbmQgSVNP5qCH5YeG5pel5pyf5a2X56ym5LiyLlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0W119IOi/lOWbnueUqOS6jkZ1bGxDYWxlbmRhcua4suafk+eahOS6i+S7tuaVsOe7hC5cclxuICAgICAqL1xyXG5cdF9nZXRBbGxPcmlnaW5hbEV2ZW50KHN0YXJ0LCBlbmQpe1xyXG5cdFx0Y29uc3QgZXZlbnRzID0gW107XHJcblx0XHRsZXQgc3FsID0gYERPQ1VNRU5UX0xPQ0FUSU9OIG5vdCBsaWtlICcvRGVsZXRlZCBJdGVtcy8lJyBhbmQgKEtCX0dVSUQgaXMgbnVsbCBvciBLQl9HVUlEID0gJycpYDtcclxuXHRcdGxldCBhbmQxID0gYCBhbmQgRE9DVU1FTlRfR1VJRCBpbiAoc2VsZWN0IERPQ1VNRU5UX0dVSUQgZnJvbSBXSVpfRE9DVU1FTlRfUEFSQU0gd2hlcmUgUEFSQU1fTkFNRSA9ICdDQUxFTkRBUl9TVEFSVCcgIGFuZCAgUEFSQU1fVkFMVUUgPD0gJyR7ZW5kfScgKWA7XHJcblx0XHRsZXQgYW5kMiA9IGAgYW5kIERPQ1VNRU5UX0dVSUQgaW4gKHNlbGVjdCBET0NVTUVOVF9HVUlEIGZyb20gV0laX0RPQ1VNRU5UX1BBUkFNIHdoZXJlIFBBUkFNX05BTUUgPSAnQ0FMRU5EQVJfRU5EJyAgYW5kICBQQVJBTV9WQUxVRSA+PSAnJHtzdGFydH0nIClgO1xyXG5cdFx0aWYgKHN0YXJ0KSBzcWwgKz0gYW5kMjtcclxuXHRcdGlmIChlbmQpIHNxbCArPSBhbmQxO1xyXG5cdFx0aWYgKG9iakRhdGFiYXNlLkRvY3VtZW50c0RhdGFGcm9tU1FMKSB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0Y29uc3QgZGF0YSA9IG9iakRhdGFiYXNlLkRvY3VtZW50c0RhdGFGcm9tU1FMKHNxbCk7XHJcblx0XHRcdFx0aWYgKCAhZGF0YSApIHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRjb25zdCBvYmogPSBKU09OLnBhcnNlKGRhdGEpO1xyXG5cdFx0XHRcdGlmICggIW9iaiB8fCAhQXJyYXkuaXNBcnJheShvYmopICkgcmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgaSArKykge1xyXG5cdFx0XHRcdFx0ZXZlbnRzLnB1c2goXHJcblx0XHRcdFx0XHRcdG5ldyBDYWxlbmRhckV2ZW50KG9ialtpXSkudG9GdWxsQ2FsZW5kYXJFdmVudCgpXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRcclxuXHRcdFx0XHRyZXR1cm4gZXZlbnRzO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNhdGNoKGVycikge1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0RvY3VtZW50c0RhdGFGcm9tU1FMIG1ldGhvZCBvZiBXaXpEYXRhYmFzZSBub3QgZXhpc3QhJyk7XHJcblx0XHRcdC8qXHJcblx0XHRcdGxldCBkb2NDb2xsZXRpb24gPSBvYmpEYXRhYmFzZS5Eb2N1bWVudHNGcm9tU1FMKHNxbCk7XHJcblx0XHRcdC8vXHJcblx0XHRcdGlmIChkb2NDb2xsZXRpb24gJiYgZG9jQ29sbGV0aW9uLkNvdW50KXtcclxuXHRcdFx0XHRsZXQgZG9jO1xyXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZG9jQ29sbGV0aW9uLkNvdW50OyArKyBpKXtcclxuXHRcdFx0XHRcdGRvYyA9IGRvY0NvbGxldGlvbi5JdGVtKGkpO1xyXG5cdFx0XHRcdFx0bGV0IGV2ZW50T2JqID0gX2V2ZW50T2JqZWN0KF9uZXdQc2V1ZG9Eb2MoZG9jKSk7XHJcblx0XHRcdFx0XHRpZiAoZXZlbnRPYmopXHJcblx0XHRcdFx0XHRcdGV2ZW50cy5wdXNoKGV2ZW50T2JqKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIGV2ZW50cztcclxuXHRcdFx0fVxyXG5cdFx0XHQqL1x0XHRcclxuXHRcdH1cclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcbiAgICAgKiDku45XaXpEYXRhYmFzZeS4reiOt+WPluaJgOacieW+queOr+mHjeWkjeS6i+S7ti5cclxuXHQgKiDku47liJvlu7rkuovku7bnmoTml6XmnJ/lvIDlp4vliLBFTkRSRUNVUlJFTkNF57uT5p2fXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3RbXX0g6L+U5Zue55So5LqORnVsbENhbGVuZGFy5riy5p+T55qEIGV2ZW50U291cmNlIOaVsOe7hC5cclxuICAgICAqL1xyXG5cdF9nZXRBbGxSZXBlYXRFdmVudChzdGFydCwgZW5kKXtcclxuXHRcdGNvbnN0IHJlcGVhdEV2ZW50cyA9IFtdO1xyXG5cdFx0Y29uc3Qgc3FsID0gXCJET0NVTUVOVF9MT0NBVElPTiBub3QgbGlrZSAnL0RlbGV0ZWQgSXRlbXMvJScgYW5kIChLQl9HVUlEIGlzIG51bGwgb3IgS0JfR1VJRCA9ICcnKSBhbmQgXCIgKyBcclxuXHRcdFx0XHRcdFwiRE9DVU1FTlRfR1VJRCBpbiAoc2VsZWN0IERPQ1VNRU5UX0dVSUQgZnJvbSBXSVpfRE9DVU1FTlRfUEFSQU0gd2hlcmUgUEFSQU1fTkFNRT0nQ0FMRU5EQVJfUkVDVVJSRU5DRScpXCI7XHJcblxyXG5cdFx0Y29uc3QgZGF0YSA9IG9iakRhdGFiYXNlLkRvY3VtZW50c0RhdGFGcm9tU1FMKHNxbCk7XHJcblx0XHRjb25zb2xlLmxvZyhkYXRhKVxyXG5cdFx0aWYgKCAhZGF0YSApIHJldHVybiBmYWxzZTtcclxuXHRcdFxyXG5cdFx0Y29uc3Qgb2JqID0gSlNPTi5wYXJzZShkYXRhKTtcclxuXHRcdGlmICggIW9iaiB8fCAhQXJyYXkuaXNBcnJheShvYmopICkgcmV0dXJuIGZhbHNlO1xyXG5cdFx0XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkgKyspIHtcclxuXHRcdFx0cmVwZWF0RXZlbnRzLnB1c2goXHJcblx0XHRcdFx0bmV3IENhbGVuZGFyRXZlbnQob2JqW2ldKS5nZW5lcmF0ZVJlcGVhdEV2ZW50cyhzdGFydCwgZW5kKVxyXG5cdFx0XHQpXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVwZWF0RXZlbnRzO1xyXG5cdFx0XHJcblx0fTtcclxuXHJcblx0Ly8g5pel5Y6G5LqL5Lu25ouW5Yqo5ZCO5pu05paw5pWw5o2uXHJcblx0dXBkYXRlRXZlbnREYXRhT25Ecm9wKGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXcpe1xyXG5cdFx0Ly8gQ2FsbCBoYXNUaW1lIG9uIHRoZSBldmVudOKAmXMgc3RhcnQvZW5kIHRvIHNlZSBpZiBpdCBoYXMgYmVlbiBkcm9wcGVkIGluIGEgdGltZWQgb3IgYWxsLWRheSBhcmVhLlxyXG5cdFx0Y29uc3QgYWxsRGF5ID0gIWV2ZW50LnN0YXJ0Lmhhc1RpbWUoKTtcclxuXHRcdC8vIOiOt+WPluS6i+S7tuaWh+aho+aXtumXtOaVsOaNrlxyXG5cdFx0Y29uc3QgZG9jID0gb2JqRGF0YWJhc2UuRG9jdW1lbnRGcm9tR1VJRChldmVudC5pZCk7XHJcblx0XHQvLyDmm7TmlrDmlbDmja5cclxuXHRcdGlmICggYWxsRGF5ICkge1xyXG5cdFx0XHRjb25zdCBzdGFydFN0ciA9IGV2ZW50LnN0YXJ0LnNldCh7J2gnOiAwLCAnbSc6IDAsICdzJzogMH0pLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHRjb25zdCBlbmRTdHIgPSBldmVudC5lbmQuc2V0KHsnaCc6IDIzLCAnbSc6IDU5LCAncyc6IDU5fSkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX1NUQVJUXCIsIHN0YXJ0U3RyKTtcclxuXHRcdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfRU5EXCIsIGVuZFN0cik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb25zdCBzdGFydFN0ciA9IGV2ZW50LnN0YXJ0LmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHRjb25zdCBlbmRTdHIgPSBldmVudC5lbmQuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX1NUQVJUXCIsIHN0YXJ0U3RyKTtcclxuXHRcdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfRU5EXCIsIGVuZFN0cik7XHJcblx0XHR9XHJcblx0XHQvL1RPRE86IOabtOaWsENBTEVOREFSX1JFQ1VSUkVOQ0XmlbDmja5cclxuXHRcdC8vIFxyXG5cdFx0dGhpcy5fdXBkYXRlRG9jTW9kaWZ5RGF0ZShkb2MpO1xyXG5cdH07XHJcblxyXG5cdC8vIOiuvue9ruaWh+aho+WxnuaAp+WAvFxyXG5cdF9zZXRQYXJhbVZhbHVlKGRvYywga2V5LCB2YWx1ZSkge1xyXG5cdFx0aWYgKCFkb2MpIHJldHVybiBmYWxzZTtcclxuXHRcdGRvYy5TZXRQYXJhbVZhbHVlKGtleSwgdmFsdWUpO1xyXG5cdH07XHJcblxyXG5cdC8vIOabtOaWsFdpekRvY+S/ruaUueaXtumXtFxyXG5cdF91cGRhdGVEb2NNb2RpZnlEYXRlKGRvYyl7XHJcblx0XHRjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xyXG5cdFx0aWYgKCFkb2MpIHJldHVybiBmYWxzZTtcclxuXHRcdG5vdy5zZXRTZWNvbmRzKChub3cuZ2V0U2Vjb25kcygpICsgMSkgJSA2MCk7XHJcblx0XHRkb2MuRGF0ZU1vZGlmaWVkID0gdGhpcy5fZDJzKG5vdyk7XHJcblx0fTtcclxuXHJcblx0Ly8g5bCG5pel5pyf5a+56LGh6L2s5YyW5Li65a2X56ym5LiyXHJcblx0Ly9UT0RPOiDogIPomZHkvp3otZZtb21lbnTmnaXnroDljJbovazmjaLov4fnqItcclxuXHRfZDJzKGR0KXtcclxuXHRcdGNvbnN0IHJldCA9IGR0LmdldEZ1bGxZZWFyKCkgKyBcIi1cIiArIFxyXG5cdFx0XHRcdFx0Zm9ybWF0SW50VG9EYXRlU3RyaW5nKGR0LmdldE1vbnRoKCkgKyAxKSArIFwiLVwiICsgXHJcblx0XHRcdFx0XHRmb3JtYXRJbnRUb0RhdGVTdHJpbmcoZHQuZ2V0RGF0ZSgpKSArIFwiIFwiICsgXHJcblx0XHRcdFx0XHRmb3JtYXRJbnRUb0RhdGVTdHJpbmcoZHQuZ2V0SG91cnMoKSkrIFwiOlwiICsgXHJcblx0XHRcdFx0XHRmb3JtYXRJbnRUb0RhdGVTdHJpbmcoZHQuZ2V0TWludXRlcygpKSArIFwiOlwiICsgXHJcblx0XHRcdFx0XHRmb3JtYXRJbnRUb0RhdGVTdHJpbmcoZHQuZ2V0U2Vjb25kcygpKTtcclxuXHRcdHJldHVybiByZXQ7XHJcblx0fTtcclxuXHJcblx0Ly8g5pel5Y6G5pe26Ze06YeN572u5pe26Ze06IyD5Zu05ZCO5pu05paw5pWw5o2uXHJcblx0dXBkYXRlRXZlbnREYXRhT25SZXNpemUoZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldyl7XHJcblx0XHRjb25zdCBhbGxEYXkgPSBldmVudC5zdGFydC5oYXNUaW1lKCkgPyBmYWxzZSA6IHRydWU7XHJcblx0XHQvLyDojrflvpfkuovku7bmlofmoaPml7bpl7TmlbDmja5cclxuXHRcdGNvbnN0IGRvYyA9IG9iakRhdGFiYXNlLkRvY3VtZW50RnJvbUdVSUQoZXZlbnQuaWQpO1xyXG5cdFx0Ly8g6K6h566X5pu05pS55ZCO55qE57uT5p2f5pe26Ze0XHJcblx0XHRjb25zdCBldmVudEVuZFN0ciA9IGV2ZW50LmVuZC5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdC8vIOabtOaWsOaWh+aho+aVsOaNrlxyXG5cdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfRU5EXCIsIGV2ZW50RW5kU3RyKTtcclxuXHRcdHRoaXMuX3VwZGF0ZURvY01vZGlmeURhdGUoZG9jKTtcclxuXHR9O1xyXG5cclxuXHQvLyDliJvlu7rkuovku7Ygc3RhcnQsIGVuZCwganNFdmVudCwgdmlld1xyXG5cdC8qKlxyXG4gICAgICog5Yib5bu65LqL5Lu2LlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBzZWxlY3Rpb25EYXRhIEZ1bGxDYWxlbmRhciDkvKDlhaXnmoTmlbDmja4uXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IHNlbGVjdGlvbkRhdGEuc3RhcnQgTW9tZW50IOexu+aXpeacn+WvueixoS5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gc2VsZWN0aW9uRGF0YS5lbmQgTW9tZW50IOexu+aXpeacn+WvueixoS5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gc2VsZWN0aW9uRGF0YS5qc0V2ZW50IG5hdGl2ZSBKYXZhU2NyaXB0IOS6i+S7ti5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gc2VsZWN0aW9uRGF0YS52aWV3IEZ1bGxDYWxlbmRhciDop4blm77lr7nosaEuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IHVzZXJJbnB1dHMg55So5oi35Lyg5YWl55qE5YW25LuW5L+h5oGvLlxyXG4gICAgICogVE9ETzog6K+l5pa55rOV5Y+v5Lul5pS+572u5YiwQ2FsZW5kYXJFdmVudOeahOmdmeaAgeaWueazleS4ilxyXG4gICAgICovXHJcblx0Y3JlYXRlRXZlbnQoc2VsZWN0aW9uRGF0YSwgdXNlcklucHV0cyl7XHJcblx0XHQvLyDojrflj5bnlKjmiLforr7nva5cclxuXHRcdGNvbnN0IG5ld0V2ZW50ID0gbmV3IENhbGVuZGFyRXZlbnQoe1xyXG5cdFx0XHR0aXRsZTogdXNlcklucHV0cy50aXRsZSA/IHVzZXJJbnB1dHMudGl0bGUgOiAn5peg5qCH6aKYJyxcclxuXHRcdFx0c3RhcnQ6IHNlbGVjdGlvbkRhdGEuc3RhcnQsXHJcblx0XHRcdGVuZDogc2VsZWN0aW9uRGF0YS5lbmQsXHJcblx0XHRcdGFsbERheTogc2VsZWN0aW9uRGF0YS5zdGFydC5oYXNUaW1lKCkgJiYgc2VsZWN0aW9uRGF0YS5lbmQuaGFzVGltZSgpID8gZmFsc2UgOiB0cnVlLFxyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHVzZXJJbnB1dHMuY29sb3IgPyB1c2VySW5wdXRzLmNvbG9yIDogJyMzMkNEMzInLFxyXG5cdFx0fSk7XHJcblx0XHQvLyDkv53lrZjlubbmuLLmn5Pkuovku7ZcclxuXHRcdG5ld0V2ZW50LnNhdmVUb1dpekV2ZW50RG9jKCk7XHJcblx0XHRuZXdFdmVudC5yZWZldGNoRGF0YSgpO1xyXG5cdFx0cmV0dXJuIG5ld0V2ZW50O1xyXG5cdH1cclxuXHJcbn1cclxuXHJcblxyXG4vLyBUT0RPOiDph43lhpnojrflj5bmlbDmja7nmoTmlrnlvI9cclxuZnVuY3Rpb24gX2dldFdpekV2ZW50KHN0YXJ0LCBlbmQpIHtcclxuXHQvL1RPRE86XHJcblx0bGV0IGV2ZW50cyA9IFtdO1xyXG5cdGxldCBFdmVudENvbGxlY3Rpb24gPSBvYmpEYXRhYmFzZS5HZXRDYWxlbmRhckV2ZW50czIoc3RhcnQsIGVuZCk7XHJcblx0cmV0dXJuIGV2ZW50c1xyXG59XHJcblxyXG4vLyDojrflvpfmuLLmn5PlkI7nmoTph43lpI3ml6XmnJ9cclxuZnVuY3Rpb24gZ2V0UmVuZGVyUmVwZWF0RGF5KCl7XHJcblx0dmFyIGRheUFycmF5ID0gbmV3IEFycmF5KCk7XHJcblx0dmFyIGV2ZW50U3RhcnQgPSBuZXcgRGF0ZShfczJkKGdfZXZlbnRTdGFydCkpO1xyXG5cdFx0XHJcblx0c3dpdGNoIChnX3JlcGVhdFJ1bGUpe1xyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnlXZWVrMVwiOlxyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnlXZWVrMlwiOlxyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnlXZWVrM1wiOlxyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnlXZWVrNFwiOlxyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnlXZWVrNVwiOlxyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnlXZWVrNlwiOlxyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnlXZWVrN1wiOlxyXG5cdFx0XHRcdGdldFdlZWtseVJlcGVhdERheShkYXlBcnJheSwgW2dfcmVwZWF0UnVsZS5jaGFyQXQoOSldKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnlXZWVrZGF5XCI6XHJcblx0XHRcdFx0Z2V0V2Vla2x5UmVwZWF0RGF5KGRheUFycmF5LCBbMSwgMiwgMywgNCwgNV0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJFdmVyeVdlZWtkYXkxMzVcIjpcclxuXHRcdFx0XHRnZXRXZWVrbHlSZXBlYXREYXkoZGF5QXJyYXksIFsxLCAzLCA1XSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJFdmVyeVdlZWtkYXkyNFwiOlxyXG5cdFx0XHRcdGdldFdlZWtseVJlcGVhdERheShkYXlBcnJheSwgWzIsIDRdKTtcclxuXHRcdFx0XHRicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2Vla2RheTY3XCI6XHJcblx0XHRcdFx0Z2V0V2Vla2x5UmVwZWF0RGF5KGRheUFycmF5LCBbNiwgN10pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiRGFpbHlcIjpcclxuXHRcdFx0XHRnZXRXZWVrbHlSZXBlYXREYXkoZGF5QXJyYXksIFsxLCAyLCAzLCA0LCA1LCA2LCA3XSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJXZWVrbHlcIjovLyDmr4/lkahcclxuXHRcdFx0XHRnZXRXZWVrbHlSZXBlYXREYXkoZGF5QXJyYXksIFtldmVudFN0YXJ0LmdldERheSgpXSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJFdmVyeTJXZWVrc1wiOlxyXG5cdFx0XHRcdGdldFdlZWtseVJlcGVhdERheShkYXlBcnJheSwgW2V2ZW50U3RhcnQuZ2V0RGF5KCldKTtcclxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRheUFycmF5Lmxlbmd0aDsgKysgaSl7XHJcblx0XHRcdFx0XHR2YXIgaW50ZXIgPSBfaW50ZXJEYXlzKF9kMnMoZXZlbnRTdGFydCksIF9kMnMoZGF5QXJyYXlbaV1bMF0pKTtcclxuXHRcdFx0XHRcdGlmICgocGFyc2VGbG9hdCgoaW50ZXItMSkvNy4wKSAlIDIpICE9IDAgKXtcclxuXHRcdFx0XHRcdFx0ZGF5QXJyYXkuc3BsaWNlKGksIDEpO1xyXG5cdFx0XHRcdFx0XHRpIC0tO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIk1vbnRobHlcIjpcclxuXHRcdFx0XHRnZXRNb250aGx5UmVwZWF0RGF5KGRheUFycmF5KTtcclxuXHRcdFx0XHRicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIlllYXJseVwiOlxyXG5cdFx0XHRcdGdldFllYXJseVJlcGVhdERheShkYXlBcnJheSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdC8vIFRPRE86IOaxieWtl+mcgOimgeiAg+iZkVxyXG4gICAgICAgICAgICBjYXNlIFwiQ2hpbmVzZU1vbnRobHlcIjpcclxuICAgICAgICAgICAgICAgIGdldENoaW5lc2VSZXBlYXREYXkoZGF5QXJyYXksICfmnIgnKTtcclxuXHRcdFx0XHRicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkNoaW5lc2VZZWFybHlcIjpcclxuICAgICAgICAgICAgICAgIGdldENoaW5lc2VSZXBlYXREYXkoZGF5QXJyYXksICfljoYnKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0ZGVmYXVsdDp7XHJcblx0XHRcdFx0aWYgKGdfcmVwZWF0UnVsZS5pbmRleE9mKFwiRXZlcnlXZWVrXCIpID09IDApe1xyXG5cdFx0XHRcdFx0dmFyIGRheXMgPSBnX3JlcGVhdFJ1bGUuc3Vic3RyKFwiRXZlcnlXZWVrXCIubGVuZ3RoKS5zcGxpdCgnJyk7XHJcblx0XHRcdFx0XHRnZXRXZWVrbHlSZXBlYXREYXkoZGF5QXJyYXksIGRheXMpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuXHRyZXR1cm4gZGF5QXJyYXk7XHJcbn1cclxuXHJcblxyXG4vKiDmlbDmja7ojrflj5ZcclxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG5cclxuLyog5p2C6aG55ZKM5bel5YW3XHJcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuLy8g5Yik5pat5YaF5qC4XHJcbmZ1bmN0aW9uIGlzQ2hyb21lKCkge1xyXG5cdGlmIChnX2lzQ2hyb21lKSByZXR1cm4gZ19pc0Nocm9tZTtcclxuXHQvL1xyXG5cdHZhciB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcclxuXHRnX2lzQ2hyb21lID0gdWEuaW5kZXhPZignY2hyb21lJykgIT0gLTE7XHJcblx0Ly9cclxuXHRyZXR1cm4gZ19pc0Nocm9tZTtcclxufVxyXG5cclxuLy8g5bCG5pW05pWw6L2s5o2i5oiQ5pel5pyf5a2X56ym5LiyXHJcbmZ1bmN0aW9uIGZvcm1hdEludFRvRGF0ZVN0cmluZyhuKXtcclxuXHRcdFxyXG5cdHJldHVybiBuIDwgMTAgPyAnMCcgKyBuIDogbjtcclxufVxyXG5cclxuLy8g5qOA5p+l5Y+K5aKe5Yqg5pWw5YC85a2X56ym5Liy6ZW/5bqm77yM5L6L5aaC77yaJzInIC0+ICcwMidcclxuZnVuY3Rpb24gY2hlY2tBbmRBZGRTdHJMZW5ndGgoc3RyKSB7XHJcblx0aWYgKHN0ci5sZW5ndGggPCAyKSB7XHJcblx0XHRyZXR1cm4gJzAnICsgc3RyO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRyZXR1cm4gc3RyO1xyXG5cdH1cclxufVxyXG5cclxuLy8g5bCG5a2X56ym5Liy6L2s5YyW5Li65pel5pyf5a+56LGhXHJcbmZ1bmN0aW9uIF9zMmQoc3RyKXtcclxuXHRpZiAoIXN0cilcclxuXHRcdHJldHVybiAnJztcclxuXHR2YXIgZGF0ZSA9IG5ldyBEYXRlKHN0ci5zdWJzdHIoMCwgNCksXHJcblx0XHRcdFx0XHRzdHIuc3Vic3RyKDUsIDIpIC0gMSxcclxuXHRcdFx0XHRcdHN0ci5zdWJzdHIoOCwgMyksXHJcblx0XHRcdFx0XHRzdHIuc3Vic3RyKDExLCAyKSxcclxuXHRcdFx0XHRcdHN0ci5zdWJzdHIoMTQsIDIpLFxyXG5cdFx0XHRcdFx0c3RyLnN1YnN0cigxNywgMilcclxuXHRcdFx0XHRcdCk7XHRcdFxyXG5cdHJldHVybiBkYXRlO1xyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGNvbG9yQ291bnQ6IDEyLFxyXG4gICAgY29sb3JJdGVtczogW1xyXG4gICAgICAgIHsgXCJjb2xvclZhbHVlXCI6IFwiIzMyQ0QzMlwiLCBcImNvbG9yTmFtZVwiOiAn5qmE5qaE57u/JyB9LFxyXG4gICAgICAgIHsgXCJjb2xvclZhbHVlXCI6IFwiIzU0ODRFRFwiLCBcImNvbG9yTmFtZVwiOiAn5a6d55+z6JOdJyB9LFxyXG4gICAgICAgIHsgXCJjb2xvclZhbHVlXCI6IFwiI0E0QkRGRVwiLCBcImNvbG9yTmFtZVwiOiAn6JOd6ImyJyB9LFxyXG4gICAgICAgIHsgXCJjb2xvclZhbHVlXCI6IFwiIzQ2RDZEQlwiLCBcImNvbG9yTmFtZVwiOiAn6Z2S57u/6ImyJyB9LFxyXG4gICAgICAgIHsgXCJjb2xvclZhbHVlXCI6IFwiIzdBRTdCRlwiLCBcImNvbG9yTmFtZVwiOiAn57u/6ImyJyB9LFxyXG4gICAgICAgIHsgXCJjb2xvclZhbHVlXCI6IFwiIzUxQjc0OVwiLCBcImNvbG9yTmFtZVwiOiAn5riF5paw57u/JyB9LFxyXG4gICAgICAgIHsgXCJjb2xvclZhbHVlXCI6IFwiI0ZCRDc1QlwiLCBcImNvbG9yTmFtZVwiOiAn6buE6ImyJyB9LFxyXG4gICAgICAgIHsgXCJjb2xvclZhbHVlXCI6IFwiI0ZGQjg3OFwiLCBcImNvbG9yTmFtZVwiOiAn5qmY6ImyJyB9LFxyXG4gICAgICAgIHsgXCJjb2xvclZhbHVlXCI6IFwiI0ZGODg3Q1wiLCBcImNvbG9yTmFtZVwiOiAn57qi6ImyJyB9LFxyXG4gICAgICAgIHsgXCJjb2xvclZhbHVlXCI6IFwiI0RDMjEyN1wiLCBcImNvbG9yTmFtZVwiOiAn5aWi5Y2O57qiJyB9LFxyXG4gICAgICAgIHsgXCJjb2xvclZhbHVlXCI6IFwiI0RCQURGRlwiLCBcImNvbG9yTmFtZVwiOiAn57Sr6ImyJyB9LFxyXG4gICAgICAgIHsgXCJjb2xvclZhbHVlXCI6IFwiI0UxRTFFMVwiLCBcImNvbG9yTmFtZVwiOiAn54Gw6ImyJyB9XHJcbiAgICBdLFxyXG5cclxufSIsIi8vVE9ETzog5Yik5patd2luZG93LmV4dGVybmFs5piv5ZCm5Li6V2l6SHRtbEVkaXRvckFwcFxyXG5jb25zdCBXaXpFeHBsb3JlckFwcCA9IHdpbmRvdy5leHRlcm5hbDtcclxuY29uc3QgV2l6RXhwbG9yZXJXaW5kb3cgPSBXaXpFeHBsb3JlckFwcC5XaW5kb3c7XHJcbmNvbnN0IFdpekRhdGFiYXNlID0gV2l6RXhwbG9yZXJBcHAuRGF0YWJhc2U7XHJcbmNvbnN0IFdpekNvbW1vblVJID0gV2l6RXhwbG9yZXJBcHAuQ3JlYXRlV2l6T2JqZWN0KFwiV2l6S01Db250cm9scy5XaXpDb21tb25VSVwiKTtcclxuXHJcbmZ1bmN0aW9uIFdpekNvbmZpcm0obXNnLCB0aXRsZSkge1xyXG4gICAgcmV0dXJuIFdpekV4cGxvcmVyV2luZG93LlNob3dNZXNzYWdlKG1zZywgdGl0bGUsIDB4MDAwMDAwMjAgfCAweDAwMDAwMDAxKSA9PSAxO1xyXG59XHJcblxyXG5mdW5jdGlvbiBXaXpBbGVydChtc2cpIHtcclxuICAgIFdpekV4cGxvcmVyV2luZG93LlNob3dNZXNzYWdlKG1zZywgXCJ7cH1cIiwgMHgwMDAwMDA0MCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIFdpekJ1YmJsZU1lc3NhZ2UodGl0bGUsIG1zZywgY29sb3IgPSAnI0ZGRkE5RCcsIGRlbGF5ID0gJzMnKSB7XHJcbiAgICBjb25zdCBhcHBQYXRoID0gV2l6Q29tbW9uVUkuR2V0U3BlY2lhbEZvbGRlcihcIkFwcFBhdGhcIik7XHJcbiAgICAvL1xyXG4gICAgY29uc3Qgd2l6U2hlbGxGaWxlTmFtZSA9IGFwcFBhdGggKyBcIldpei5leGVcIjtcclxuICAgIGNvbnN0IGRsbEZpbGVOYW1lID0gYXBwUGF0aCArIFwiV2l6VG9vbHMuZGxsXCI7XHJcbiAgICAvL1xyXG4gICAgY29uc3QgcGFyYW1zID0gYFwiJHtkbGxGaWxlTmFtZX1cIiBXaXpUb29sc1Nob3dCdWJibGVXaW5kb3cyRXggL1RpdGxlPSR7dGl0bGV9IC9MaW5rVGV4dD0ke21zZ30gL0xpbmtVUkw9QCAvQ29sb3I9JHtjb2xvcn0gL0RlbGF5PSR7ZGVsYXl9YDtcclxuICAgIC8vXHJcbiAgICBXaXpDb21tb25VSS5SdW5FeGUod2l6U2hlbGxGaWxlTmFtZSwgcGFyYW1zLCBmYWxzZSk7XHJcbn1cclxuXHJcbmNsYXNzIFdpelNoZWxsIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihkbGxGaWxlTmFtZSwgZGxsRXhwb3J0RnVuYywgcGFyYW1zKSB7XHJcbiAgICAgICAgLy/kvb/nlKhkbGzlr7zlh7rlh73mlbDvvIzlpKfpg6jliIblhaXlj4Lml7blkb3ku6TooYzmlrnlvI/vvIzlhbfkvZPlj4LmlbDmsqHmnInor7TmmI7vvIzmnInpnIDopoHogZTns7vlvIDlj5HkurrlkZhcclxuICAgICAgICBjb25zdCBhcHBQYXRoID0gV2l6Q29tbW9uVUkuR2V0U3BlY2lhbEZvbGRlcihcIkFwcFBhdGhcIik7XHJcbiAgICAgICAgdGhpcy5hcHBQYXRoID0gYXBwUGF0aFxyXG4gICAgICAgIHRoaXMud2l6RXhlID0gYXBwUGF0aCArIFwiV2l6LmV4ZVwiO1xyXG4gICAgICAgIHRoaXMuZGxsRmlsZU5hbWUgPSBkbGxGaWxlTmFtZSA/IGFwcFBhdGggKyBkbGxGaWxlTmFtZSA6IGFwcFBhdGggKyAnV2l6S01Db250cm9scy5kbGwnO1xyXG4gICAgICAgIHRoaXMuZGxsRXhwb3J0RnVuYyA9IGRsbEV4cG9ydEZ1bmMgfHwgJ1dpektNUnVuU2NyaXB0JztcclxuICAgICAgICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcclxuICAgIH1cclxuXHJcbiAgICBydW5TY3JpcHRGaWxlKHNjcmlwdEZpbGVOYW1lLCBzY3JpcHRQYXJhbXMpIHtcclxuICAgICAgICBjb25zdCBwYXJhbXMgPSBgXCIke3RoaXMuYXBwUGF0aCArICdXaXpLTUNvbnRyb2xzLmRsbCd9XCIgV2l6S01SdW5TY3JpcHQgL1NjcmlwdEZpbGVOYW1lPSR7c2NyaXB0RmlsZU5hbWV9ICR7c2NyaXB0UGFyYW1zfWA7XHJcbiAgICAgICAgV2l6Q29tbW9uVUkuUnVuRXhlKHRoaXMud2l6RXhlLCBwYXJhbXMsIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICB3aXpCdWJibGVNZXNzYWdlKHRpdGxlLCBtc2csIGNvbG9yID0gJyNGRkZBOUQnLCBkZWxheSA9ICczJykge1xyXG4gICAgICAgIFdpekJ1YmJsZU1lc3NhZ2UodGl0bGUsIG1zZywgY29sb3IsIGRlbGF5KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0V2l6SW50ZXJmYWNlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFdpekV4cGxvcmVyQXBwLCBXaXpFeHBsb3JlcldpbmRvdywgV2l6RGF0YWJhc2UsIFdpekNvbW1vblVJXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBcclxuICAgIFdpekV4cGxvcmVyQXBwLCBcclxuICAgIFdpekV4cGxvcmVyV2luZG93LCBcclxuICAgIFdpekRhdGFiYXNlLCBcclxuICAgIFdpekNvbW1vblVJLCBcclxuICAgIFdpekNvbmZpcm0sIFxyXG4gICAgV2l6QWxlcnQsIFxyXG4gICAgV2l6QnViYmxlTWVzc2FnZSwgXHJcbiAgICBXaXpTaGVsbCBcclxufTtcclxuIiwiZnVuY3Rpb24gcmdiMmhzbChyLCBnLCBiKSB7XHJcbiAgICByIC89IDI1NTsgZyAvPSAyNTU7IGIgLz0gMjU1O1xyXG5cclxuICAgIHZhciBNID0gTWF0aC5tYXgociwgZywgYik7XHJcbiAgICB2YXIgbSA9IE1hdGgubWluKHIsIGcsIGIpO1xyXG4gICAgdmFyIEMgPSBNIC0gbTtcclxuICAgIHZhciBMID0gMC41KihNICsgbSk7XHJcbiAgICB2YXIgUyA9IChDID09PSAwKSA/IDAgOiBDLygxLU1hdGguYWJzKDIqTC0xKSk7XHJcblxyXG4gICAgdmFyIGg7XHJcbiAgICBpZiAoQyA9PT0gMCkgaCA9IDA7IC8vIHNwZWMnZCBhcyB1bmRlZmluZWQsIGJ1dCB1c3VhbGx5IHNldCB0byAwXHJcbiAgICBlbHNlIGlmIChNID09PSByKSBoID0gKChnLWIpL0MpICUgNjtcclxuICAgIGVsc2UgaWYgKE0gPT09IGcpIGggPSAoKGItcikvQykgKyAyO1xyXG4gICAgZWxzZSBpZiAoTSA9PT0gYikgaCA9ICgoci1nKS9DKSArIDQ7XHJcblxyXG4gICAgdmFyIEggPSA2MCAqIGg7XHJcblxyXG4gICAgLy8g5YiG5Yir5pivaHVlLCBzYXQsIGx1bVxyXG4gICAgcmV0dXJuIFtILCBwYXJzZUZsb2F0KFMpLCBwYXJzZUZsb2F0KEwpXTtcclxufVxyXG5cclxuZXhwb3J0IHsgcmdiMmhzbCB9Il0sInNvdXJjZVJvb3QiOiIifQ==