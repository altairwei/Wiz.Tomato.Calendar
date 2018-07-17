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
/******/ 	var hotCurrentHash = "f77f130ecd127704544b"; // eslint-disable-line no-unused-vars
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
/* harmony import */ var _components_Modal_EventModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Modal/EventModal */ "./src/components/Modal/EventModal.js");





class App extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowingEvent: false,
            isEditingEvent: false,
            isCreatingEvent: false,
            clickedArgs: null,
            editingEvent: null,
            selectedRange: null
        };
        this.handleEventClick = this.handleEventClick.bind(this);
        this.handlePopoverHide = this.handlePopoverHide.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleEventEdit = this.handleEventEdit.bind(this);
    }

    handleEventClick(event, jsEvent, view) {
        this.setState({
            isShowingEvent: true,
            clickedArgs: { event, jsEvent, view }
        });
    }

    handlePopoverHide() {
        this.setState({
            isShowingEvent: false
        });
    }

    handleSelect(start, end, jsEvent, view) {
        this.setState({
            isCreatingEvent: true,
            selectedRange: { start, end, jsEvent, view }
        });
    }

    handleEventEdit(event) {
        this.setState({
            isEditingEvent: true,
            editingEvent: event
        });
    }

    handleModalClose() {
        //TODO: 触发fullcalendar unselect
        this.setState({
            isEditingEvent: false,
            isCreatingEvent: false
        });
    }

    render() {
        const shouldShow = this.state.isEditingEvent || this.state.isCreatingEvent;
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'div',
            { id: 'wiz-tomato-calendar' },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Calendar_Calendar__WEBPACK_IMPORTED_MODULE_1__["default"], { key: 1, onEventClick: this.handleEventClick, onSelect: this.handleSelect }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Modal_EventModal__WEBPACK_IMPORTED_MODULE_3__["default"], {
                show: shouldShow,
                onModalClose: this.handleModalClose
            }),
            this.state.isShowingEvent && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_EventPopover_EventPopover__WEBPACK_IMPORTED_MODULE_2__["default"], {
                onPopoverHide: this.handlePopoverHide,
                key: this.state.clickedArgs.event.id,
                event: this.state.clickedArgs.event,
                reference: this.state.clickedArgs.jsEvent.target,
                onEditBtnClick: this.handleEventEdit
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _EventPopover_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EventPopover.css */ "./src/components/EventPopover/EventPopover.css");
/* harmony import */ var _EventPopover_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_EventPopover_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var popper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! popper.js */ "./node_modules/popper.js/dist/esm/popper.js");
/* harmony import */ var _PopoverTitleInput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PopoverTitleInput */ "./src/components/EventPopover/PopoverTitleInput.js");
/* harmony import */ var _PopoverToolbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PopoverToolbar */ "./src/components/EventPopover/PopoverToolbar.js");
/* harmony import */ var _models_EventHandles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../models/EventHandles */ "./src/models/EventHandles.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/_react-bootstrap@0.32.1@react-bootstrap/es/index.js");
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
                that.props.onPopoverHide();
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
                    this.props.onEditBtnClick(this.props.event);
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/_react-bootstrap@0.32.1@react-bootstrap/es/index.js");



class AutoFormGroup extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {

    render() {
        const isHorizontal = this.props.horizontal;
        if (isHorizontal) {
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["FormGroup"],
                { controlId: this.props.id },
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
                { controlId: this.props.id },
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

/***/ "./src/components/Form/ColorInput.js":
/*!*******************************************!*\
  !*** ./src/components/Form/ColorInput.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ColorInput; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/_react-dom@16.4.1@react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/_react-bootstrap@0.32.1@react-bootstrap/es/index.js");
/* harmony import */ var huebee_dist_huebee_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! huebee/dist/huebee.css */ "./node_modules/huebee/dist/huebee.css");
/* harmony import */ var huebee_dist_huebee_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(huebee_dist_huebee_css__WEBPACK_IMPORTED_MODULE_3__);



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
        let colorValue;
        if (typeof jsEventOrValue == 'object') {
            this.setState({ value: jsEventOrValue.target.value });
            colorValue = jsEventOrValue.target.value;
        } else if (typeof jsEventOrValue == 'string') {
            this.setState({ value: jsEventOrValue });
            colorValue = jsEventOrValue;
        }
        this.props.onChange(colorValue);
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/_react-bootstrap@0.32.1@react-bootstrap/es/index.js");
/* harmony import */ var _ColorInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ColorInput */ "./src/components/Form/ColorInput.js");
/* harmony import */ var _AutoFormGroup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AutoFormGroup */ "./src/components/Form/AutoFormGroup.js");





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
            _AutoFormGroup__WEBPACK_IMPORTED_MODULE_3__["default"],
            this.props,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ColorInput__WEBPACK_IMPORTED_MODULE_2__["default"], {
                value: this.props.value //hex色彩值
                , readOnly: this.props.readOnly,
                onChange: this.handleChange
            })
        );
    }
}

/***/ }),

/***/ "./src/components/Form/DateTimeInput.js":
/*!**********************************************!*\
  !*** ./src/components/Form/DateTimeInput.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DateTimeInput; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/_react-bootstrap@0.32.1@react-bootstrap/es/index.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var bootstrap_js_collapse__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bootstrap/js/collapse */ "./node_modules/bootstrap/js/collapse.js");
/* harmony import */ var bootstrap_js_collapse__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bootstrap_js_collapse__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var bootstrap_js_transition__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bootstrap/js/transition */ "./node_modules/bootstrap/js/transition.js");
/* harmony import */ var bootstrap_js_transition__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(bootstrap_js_transition__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var eonasdan_bootstrap_datetimepicker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! eonasdan-bootstrap-datetimepicker */ "./node_modules/eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js");
/* harmony import */ var eonasdan_bootstrap_datetimepicker__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(eonasdan_bootstrap_datetimepicker__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var eonasdan_bootstrap_datetimepicker_build_css_bootstrap_datetimepicker_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css */ "./node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css");
/* harmony import */ var eonasdan_bootstrap_datetimepicker_build_css_bootstrap_datetimepicker_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(eonasdan_bootstrap_datetimepicker_build_css_bootstrap_datetimepicker_css__WEBPACK_IMPORTED_MODULE_6__);








class DateTimeInput extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const dateValue = e.date.format('YYYY-MM-DD HH:mm:ss');
        this.setState({ value: dateValue });
        // 传递
        this.props.onDateTimeChange(dateValue);
    }

    componentDidMount() {
        // 初始化组件
        if (this.props.readOnly) this.el.readOnly = true;
        this.$el = $(this.el).datetimepicker({
            showTodayButton: true,
            locale: 'zh-cn',
            format: 'YYYY-MM-DD HH:mm:ss'
        });
        this.$el.on("dp.change", this.handleChange);
        //
        this.instance = this.$el.data("DateTimePicker");
        // 初始化值
        this.instance.date(this.props.value);
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/_react-dom@16.4.1@react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/_react-bootstrap@0.32.1@react-bootstrap/es/index.js");
/* harmony import */ var _AutoFormGroup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AutoFormGroup */ "./src/components/Form/AutoFormGroup.js");
/* harmony import */ var _DateTimeInput__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DateTimeInput */ "./src/components/Form/DateTimeInput.js");






class DateTimePickerGroup extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
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
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            _AutoFormGroup__WEBPACK_IMPORTED_MODULE_3__["default"],
            this.props,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DateTimeInput__WEBPACK_IMPORTED_MODULE_4__["default"], this.props)
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/_react-bootstrap@0.32.1@react-bootstrap/es/index.js");
/* harmony import */ var _TitleInputGroup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TitleInputGroup */ "./src/components/Form/TitleInputGroup.js");
/* harmony import */ var _DateTimePickerGroup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DateTimePickerGroup */ "./src/components/Form/DateTimePickerGroup.js");





class EventDetailForm extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.title
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {}

    render() {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"],
            null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TitleInputGroup__WEBPACK_IMPORTED_MODULE_2__["default"], { id: 'tc-editpage-eventtitle' }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"],
                null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"],
                    { sm: 6 },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DateTimePickerGroup__WEBPACK_IMPORTED_MODULE_3__["default"], {
                        label: '\u5F00\u59CB\u65E5\u671F',
                        value: '2018-07-17 09:00:00',
                        onDateTimeChange: () => {} })
                ),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"],
                    { sm: 6 },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DateTimePickerGroup__WEBPACK_IMPORTED_MODULE_3__["default"], {
                        label: '\u7ED3\u675F\u65E5\u671F',
                        value: '2018-07-17 09:00:00',
                        onDateTimeChange: () => {} })
                )
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/_react-bootstrap@0.32.1@react-bootstrap/es/index.js");
/* harmony import */ var _AutoFormGroup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AutoFormGroup */ "./src/components/Form/AutoFormGroup.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





class TitleInputGroup extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.title
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {}

    render() {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            _AutoFormGroup__WEBPACK_IMPORTED_MODULE_2__["default"],
            _extends({ label: '\u6807\u9898' }, this.props),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["FormControl"], {
                type: 'text',
                value: this.state.value,
                placeholder: '\u8BF7\u8F93\u5165\u6807\u9898',
                onChange: this.handleChange
            })
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventModal; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/_react-bootstrap@0.32.1@react-bootstrap/es/index.js");
/* harmony import */ var _Form_EventDetailForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Form/EventDetailForm */ "./src/components/Form/EventDetailForm.js");




class EventModal extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {

    render() {
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
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                            react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Header,
                            {
                                style: { borderBottom: 'none', padding: '0' } },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                                react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Nav"],
                                { bsStyle: 'tabs',
                                    style: { padding: '15px 15px 0 15px' } },
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["CloseButton"], {
                                    onClick: this.props.onModalClose
                                }),
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
                            )
                        ),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                            react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Body,
                            null,
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                                react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Tab"].Content,
                                { animation: true },
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                                    react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Tab"].Pane,
                                    { eventKey: '1' },
                                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Form_EventDetailForm__WEBPACK_IMPORTED_MODULE_2__["default"], null)
                                ),
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                                    react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Tab"].Pane,
                                    { eventKey: '2' },
                                    'Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.'
                                )
                            )
                        )
                    )
                )
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Footer,
                null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"],
                    null,
                    '\u8FD9\u662F\u4E00\u4E2A\u6309\u94AE'
                )
            )
        );
    }
}

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

    onCreateBtnClick(start, end, jsEvent, view, formNode) {
        const title = jquery__WEBPACK_IMPORTED_MODULE_0___default()(formNode).find('#tc-createpage-eventtitle').val();
        const color = jquery__WEBPACK_IMPORTED_MODULE_0___default()(formNode).find('#tc-createpage-eventcolor').val();
        new _WizEventDataLoader__WEBPACK_IMPORTED_MODULE_1__["default"]().createEvent({ start, end, jsEvent, view }, { title, color }); // 这一步耗时
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQ2FsZW5kYXIvQ2FsZW5kYXIuY3NzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0V2ZW50UG9wb3Zlci9FdmVudFBvcG92ZXIuY3NzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0V2ZW50UG9wb3Zlci9Qb3BvdmVyVGl0bGVJbnB1dC5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZSBzeW5jIF5cXC5cXC8uKiQiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9DYWxlbmRhci9DYWxlbmRhci5jc3M/Y2ExNCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9DYWxlbmRhci9DYWxlbmRhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9DYWxlbmRhci9GdWxsQ2FsZW5kYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRXZlbnRQb3BvdmVyL0V2ZW50UG9wb3Zlci5jc3M/NTg1ZiIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9FdmVudFBvcG92ZXIvRXZlbnRQb3BvdmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0V2ZW50UG9wb3Zlci9Qb3BvdmVyVGl0bGVJbnB1dC5jc3M/M2UzNiIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9FdmVudFBvcG92ZXIvUG9wb3ZlclRpdGxlSW5wdXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRXZlbnRQb3BvdmVyL1BvcG92ZXJUb29sYmFyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0Zvcm0vQXV0b0Zvcm1Hcm91cC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Gb3JtL0NvbG9ySW5wdXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRm9ybS9Db2xvclBpY2tlckdyb3VwLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0Zvcm0vRGF0ZVRpbWVJbnB1dC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Gb3JtL0RhdGVUaW1lUGlja2VyR3JvdXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRm9ybS9FdmVudERldGFpbEZvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRm9ybS9UaXRsZUlucHV0R3JvdXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvTW9kYWwvRXZlbnRNb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguY3NzP2Q4YzMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9tb2RlbHMvQ2FsZW5kYXJFdmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWxzL0V2ZW50SGFuZGxlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWxzL1dpekV2ZW50RGF0YUxvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvQ29uZmlnLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9XaXpJbnRlcmZhY2UuanMiXSwibmFtZXMiOlsiQXBwIiwiUmVhY3QiLCJDb21wb25lbnQiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwic3RhdGUiLCJpc1Nob3dpbmdFdmVudCIsImlzRWRpdGluZ0V2ZW50IiwiaXNDcmVhdGluZ0V2ZW50IiwiY2xpY2tlZEFyZ3MiLCJlZGl0aW5nRXZlbnQiLCJzZWxlY3RlZFJhbmdlIiwiaGFuZGxlRXZlbnRDbGljayIsImJpbmQiLCJoYW5kbGVQb3BvdmVySGlkZSIsImhhbmRsZVNlbGVjdCIsImhhbmRsZU1vZGFsQ2xvc2UiLCJoYW5kbGVFdmVudEVkaXQiLCJldmVudCIsImpzRXZlbnQiLCJ2aWV3Iiwic2V0U3RhdGUiLCJzdGFydCIsImVuZCIsInJlbmRlciIsInNob3VsZFNob3ciLCJpZCIsInRhcmdldCIsIkNhbGVuZGFyIiwiZXZlbnRzIiwiZGF0YUxvYWRlciIsImNhbGVuZGFyIiwiaGFuZGxlRnVsbENhbGVuZGFyUmVuZGVyIiwib25WaWV3UmVuZGVyIiwib25FdmVudFJlbmRlciIsIm9uRXZlbnREcm9wIiwib25FdmVudFJlc2l6ZSIsImVsIiwiZWxlbWVudCIsIiRjYWxlbmRhciIsIiQiLCJldmVudFNvdXJjZXMiLCJnZXRFdmVudFNvdXJjZXMiLCJmdWxsQ2FsZW5kYXIiLCJpIiwibGVuZ3RoIiwiZGVsdGEiLCJyZXZlcnRGdW5jIiwidWkiLCJ1cGRhdGVFdmVudERhdGFPbkRyb3AiLCJ1cGRhdGVFdmVudERhdGFPblJlc2l6ZSIsImV2ZW50T2JqIiwiJGVsIiwicmdiU3RyaW5nIiwiY3NzIiwicmdiQXJyYXkiLCJleGVjIiwiaHNsIiwicmdiMmhzbCIsImxpZ2h0bmVzcyIsIk1hdGgiLCJjb3MiLCJQSSIsInRleHRDb2xvciIsImlzQ29tcGxldGUiLCJwYXJzZUludCIsImNvbXBsZXRlIiwiYWRkQ2xhc3MiLCJjb21wb25lbnREaWRNb3VudCIsImxlZnQiLCJjZW50ZXIiLCJyaWdodCIsInRvZGF5IiwibW9udGgiLCJ3ZWVrIiwiZGF5IiwibGlzdCIsImFnZW5kYSIsIm1pblRpbWUiLCJzbG90TGFiZWxGb3JtYXQiLCJvblNlbGVjdCIsIm9uRXZlbnRDbGljayIsInIiLCJnIiwiYiIsIk0iLCJtYXgiLCJtIiwibWluIiwiQyIsIkwiLCJTIiwiYWJzIiwiaCIsIkgiLCJwYXJzZUZsb2F0IiwiRnVsbGNhbGVuZGFyT2JqZWN0TWFwcGVyIiwiZ2V0U2V0dGluZ3MiLCJwcm9wZXJ0aWVzIiwibmV3U2V0dGluZ3MiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsIkZ1bGxDYWxlbmRhciIsImpxIiwibm9Db25mbGljdCIsImZ1bGxjYWxlbmRhck9iamVjdE1hcHBlciIsImluc3RhbmNlIiwiZGF0ZSIsIkRhdGUiLCJvbkZ1bGxDYWxlbmRhclJlbmRlciIsIm9iamVjdE1hcHBlclNldHRpbmdzIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIm5leHRQcm9wcyIsIkV2ZW50UG9wb3ZlciIsInBvcHBlck5vZGUiLCJwb3BwZXJJbnN0YW5jZSIsImV2ZW50SGFuZGxlcyIsIm5ld0V2ZW50RGF0YSIsImF1dG9IaWRlIiwiaGFuZGxlRGF0ZVRpbWVDaGFuZ2UiLCJoYW5kbGVUaXRsZUNoYW5nZSIsImhhbmRsZUNvbG9yQ2hhbmdlIiwiaGFuZGxlQnRuQ2xpY2siLCJlIiwicmVmZXJlbmNlIiwiaXMiLCJoYXMiLCJoaWRlIiwidGhhdCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwib25Qb3BvdmVySGlkZSIsInNob3ciLCJmYWRlSW4iLCJuZXdUaXRsZSIsInZhbHVlIiwicHJldlN0YXRlIiwiT2JqZWN0IiwiY3JlYXRlIiwidGl0bGUiLCJjb2xvclZhbHVlIiwibmV3Q29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJidG5UeXBlIiwic3BsaXQiLCJoYW5kbGVOYW1lIiwidGhlbiIsInJldCIsIm9uRWRpdEJ0bkNsaWNrIiwicGxhY2VtZW50IiwibW9kaWZpZXJzIiwiYXJyb3ciLCJkb2N1bWVudCIsIm9mZiIsIm9uIiwiY29tcG9uZW50RGlkVXBkYXRlIiwicHJldlByb3BzIiwic25hcHNob3QiLCJzaG91bGRDb21wb25lbnRVcGRhdGUiLCJuZXh0U3RhdGUiLCJ1cGRhdGUiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImV2ZW50U3RhcnQiLCJmb3JtYXQiLCJlbmFibGVTYXZlQnRuIiwiZGlzcGxheSIsImRpdiIsIkV2ZW50VGl0bGVJbnB1dCIsImV2ZW50VGl0bGUiLCJoYW5kbGVDaGFuZ2UiLCJvblRpdGxlQ2hhbmdlIiwidGFyZ2V0Rm9ybSIsIlBvcG92ZXJUb29sYmFyIiwib25CdG5DbGljayIsIkF1dG9Gb3JtR3JvdXAiLCJpc0hvcml6b250YWwiLCJob3Jpem9udGFsIiwibGFiZWwiLCJjaGlsZHJlbiIsIkh1ZWJlZSIsInJlcXVpcmUiLCJDb2xvcklucHV0IiwianNFdmVudE9yVmFsdWUiLCJvbkNoYW5nZSIsImh1ZWJlZUluc3RhbmNlIiwic3RhdGljT3BlbiIsInNldFRleHQiLCJzZXRCR0NvbG9yIiwiaHVlcyIsImh1ZTAiLCJzaGFkZXMiLCJzYXR1cmF0aW9ucyIsIm5vdGF0aW9uIiwiY2xhc3NOYW1lIiwiY3VzdG9tQ29sb3JzIiwic2V0Q29sb3IiLCJDb2xvclBpY2tlckdyb3VwIiwib25Db2xvckNoYW5nZSIsInJlYWRPbmx5IiwiRGF0ZVRpbWVJbnB1dCIsImRhdGVWYWx1ZSIsIm9uRGF0ZVRpbWVDaGFuZ2UiLCJkYXRldGltZXBpY2tlciIsInNob3dUb2RheUJ1dHRvbiIsImxvY2FsZSIsImRhdGEiLCJkZXN0cm95IiwiRGF0ZVRpbWVQaWNrZXJHcm91cCIsImlucHV0IiwiUmVhY3RET00iLCJmaW5kRE9NTm9kZSIsImlucHV0Rm9ybUNvbnRyb2wiLCJFdmVudERldGFpbEZvcm0iLCJUaXRsZUlucHV0R3JvdXAiLCJFdmVudE1vZGFsIiwib25Nb2RhbENsb3NlIiwiYm9yZGVyQm90dG9tIiwicGFkZGluZyIsImdldEVsZW1lbnRCeUlkIiwiQ2FsZW5kYXJFdmVudCIsIkVycm9yIiwidHlwZSIsIl9jaGVja0RhdGFUeXBlIiwiX2NyZWF0ZSIsImRvYyIsImdfZGIiLCJEb2N1bWVudEZyb21HVUlEIiwiR2V0UGFyYW1WYWx1ZSIsIm1vbWVudCIsIkRhdGVDcmVhdGVkIiwiR1VJRCIsIlRpdGxlIiwiRGF0ZU1vZGlmaWVkIiwiY29uc29sZSIsImVycm9yIiwiYmtDb2xvciIsImFsbERheSIsImRhdGVDb21wbGV0ZWQiLCJycHRSdWxlIiwicnB0RW5kIiwiX0luZm8iLCJfcGFyc2VJbmZvIiwiQ0FMRU5EQVJfSU5GTyIsIl9FeHRyYUluZm8iLCJDQUxFTkRBUl9FWFRSQUlORk8iLCJfZ2V0RGVmYXVsdEV4dHJhSW5mbyIsImd1aWQiLCJDQUxFTkRBUl9TVEFSVCIsIkNBTEVOREFSX0VORCIsImNpIiwiQ29uZmlnIiwiY29sb3JJdGVtcyIsImluZGV4T2YiLCJDb21wbGV0ZSIsIkRhdGVDb21wbGV0ZWQiLCJDQUxFTkRBUl9SRUNVUlJFTkNFIiwiQ0FMRU5EQVJfRU5EUkVDVVJSRU5DRSIsImhhc1RpbWUiLCJjcmVhdGVkIiwidXBkYXRlZCIsIl91cGRhdGUiLCJvYmpDbGFzcyIsIkdVSURfUmVnRXhyIiwiU3RyaW5nIiwidGVzdCIsIkluZm9TdHJpbmciLCJJbmZvT2JqZWN0IiwiSW5mb0FycmF5IiwiZm9yRWFjaCIsIml0ZW0iLCJpbmRleCIsImFyciIsInBhaXIiLCJfc3RyaW5naWZ5SW5mbyIsIkluZm9PYmplY3RLZXlzQXJyYXkiLCJrZXlzIiwic2luZ2xlSW5mbyIsInB1c2giLCJqb2luIiwicmVwbGFjZSIsIl91cGRhdGVJbmZvIiwiX3VwZGF0ZUV4dHJhSW5mbyIsIkV4dHJhSW5mb09iamVjdCIsIl9nZXRFdmVudEh0bWwiLCJjb250ZW50IiwiaHRtbFRleHQiLCJnZW5lcmF0ZVJlcGVhdEV2ZW50cyIsImV2ZW50U291cmNlIiwiZGF5QXJyYXkiLCJfZ2V0UmVuZGVyUmVwZWF0RGF5IiwibmV3RXZlbnQiLCJ0b0Z1bGxDYWxlbmRhckV2ZW50IiwiYWRkIiwiZGlmZiIsInJlZ2V4IiwiY291bnQiLCJjdXJXZWVrRGF5IiwicmVzdWx0cyIsImludGVyV2VlayIsIm51bWJlciIsIl9nZXRXZWVrbHlSZXBlYXREYXkiLCJwZXJSdWxlIiwiX2dldFBlclJlcGVhdERheXMiLCJpbnRlcldlZWtzIiwidmlld1N0YXJ0Iiwidmlld0VuZCIsImludGVydmFsV2Vla3MiLCJ3ZWVrZGF5cyIsIm5ld0V2ZW50U3RhcnREYXRlIiwic2V0IiwiZ2V0IiwiaXNTYW1lIiwiaXNCZWZvcmUiLCJwZXJSdWxlTWFwIiwic3BsaWNlIiwiZmluZEluZGV4IiwidG9XaXpFdmVudERhdGEiLCJhZGRUb0Z1bGxDYWxlbmRhciIsIl9zYXZlQWxsUHJvcCIsInN0YXJ0U3RyIiwiZW5kU3RyIiwiX3NldFBhcmFtVmFsdWUiLCJTZXRQYXJhbVZhbHVlIiwiX2NyZWF0ZVdpekV2ZW50RG9jIiwibG9jYXRpb24iLCJvYmpGb2xkZXIiLCJHZXRGb2xkZXJCeUxvY2F0aW9uIiwidGVtcEh0bWwiLCJnX2NtbiIsIkdldEFUZW1wRmlsZU5hbWUiLCJTYXZlVGV4dFRvRmlsZSIsIkNyZWF0ZURvY3VtZW50MiIsIkNoYW5nZVRpdGxlQW5kRmlsZU5hbWUiLCJVcGRhdGVEb2N1bWVudDYiLCJBZGRUb0NhbGVuZGFyIiwic2F2ZVRvV2l6RXZlbnREb2MiLCJwcm9wIiwiZ3VpZFJlZ2V4IiwiaXNXaXpEb2NFeGlzdCIsImRlbGV0ZUV2ZW50RGF0YSIsImlzRGVsZXRlRG9jIiwiUmVtb3ZlRnJvbUNhbGVuZGFyIiwiRGVsZXRlIiwicmVmZXRjaERhdGEiLCJyZWZyZXNoRXZlbnQiLCJGb3JtSGFuZGxlcyIsIm9uQ3JlYXRlQnRuQ2xpY2siLCJmb3JtTm9kZSIsImZpbmQiLCJ2YWwiLCJjb2xvciIsImNyZWF0ZUV2ZW50IiwibW9kYWwiLCJvblNhdmVCdG5DbGljayIsIm9uQ29tcGxldGVCdG5DbGljayIsIm9uRGVsZXRlRGF0YUJ0bkNsaWNrIiwiV2l6Q29uZmlybSIsIm9uRGVsZXRlRG9jQnRuQ2xpY2siLCJvbkVkaXRPcmlnaW5CdG5DbGljayIsIm9iakRhdGFiYXNlIiwib2JqQ29tbW9uIiwiRWRpdENhbGVuZGFyRXZlbnQiLCJvbk9wZW5Eb2NCdG5DbGljayIsIm9ialdpbmRvdyIsIlZpZXdEb2N1bWVudCIsIldpekV2ZW50RGF0YUxvYWRlciIsIkRhdGFiYXNlIiwidXNlck5hbWUiLCJVc2VyTmFtZSIsImdlbmVyYWxFdmVudFNvdXJjZSIsIl9nZXRBbGxPcmlnaW5hbEV2ZW50IiwicmVwZWF0RXZlbnRTb3VyY2VzIiwiX2dldEFsbFJlcGVhdEV2ZW50IiwiY29uY2F0Iiwic3FsIiwiYW5kMSIsImFuZDIiLCJEb2N1bWVudHNEYXRhRnJvbVNRTCIsIm9iaiIsIkpTT04iLCJwYXJzZSIsIkFycmF5IiwiaXNBcnJheSIsImVyciIsInJlcGVhdEV2ZW50cyIsImxvZyIsIl91cGRhdGVEb2NNb2RpZnlEYXRlIiwibm93Iiwic2V0U2Vjb25kcyIsImdldFNlY29uZHMiLCJfZDJzIiwiZHQiLCJnZXRGdWxsWWVhciIsImZvcm1hdEludFRvRGF0ZVN0cmluZyIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsImdldEhvdXJzIiwiZ2V0TWludXRlcyIsImV2ZW50RW5kU3RyIiwic2VsZWN0aW9uRGF0YSIsInVzZXJJbnB1dHMiLCJfZ2V0V2l6RXZlbnQiLCJFdmVudENvbGxlY3Rpb24iLCJHZXRDYWxlbmRhckV2ZW50czIiLCJnZXRSZW5kZXJSZXBlYXREYXkiLCJfczJkIiwiZ19ldmVudFN0YXJ0IiwiZ19yZXBlYXRSdWxlIiwiZ2V0V2Vla2x5UmVwZWF0RGF5IiwiY2hhckF0IiwiZ2V0RGF5IiwiaW50ZXIiLCJfaW50ZXJEYXlzIiwiZ2V0TW9udGhseVJlcGVhdERheSIsImdldFllYXJseVJlcGVhdERheSIsImdldENoaW5lc2VSZXBlYXREYXkiLCJkYXlzIiwic3Vic3RyIiwiaXNDaHJvbWUiLCJnX2lzQ2hyb21lIiwidWEiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJ0b0xvd2VyQ2FzZSIsIm4iLCJjaGVja0FuZEFkZFN0ckxlbmd0aCIsInN0ciIsImNvbG9yQ291bnQiLCJXaXpFeHBsb3JlckFwcCIsIndpbmRvdyIsImV4dGVybmFsIiwiV2l6RXhwbG9yZXJXaW5kb3ciLCJXaW5kb3ciLCJXaXpEYXRhYmFzZSIsIldpekNvbW1vblVJIiwiQ3JlYXRlV2l6T2JqZWN0IiwibXNnIiwiU2hvd01lc3NhZ2UiLCJXaXpBbGVydCIsIldpekJ1YmJsZU1lc3NhZ2UiLCJkZWxheSIsImFwcFBhdGgiLCJHZXRTcGVjaWFsRm9sZGVyIiwid2l6U2hlbGxGaWxlTmFtZSIsImRsbEZpbGVOYW1lIiwicGFyYW1zIiwiUnVuRXhlIiwiV2l6U2hlbGwiLCJkbGxFeHBvcnRGdW5jIiwid2l6RXhlIiwicnVuU2NyaXB0RmlsZSIsInNjcmlwdEZpbGVOYW1lIiwic2NyaXB0UGFyYW1zIiwid2l6QnViYmxlTWVzc2FnZSIsImdldFdpekludGVyZmFjZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQVEsb0JBQW9CO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQWlCLDRCQUE0QjtBQUM3QztBQUNBO0FBQ0EsMEJBQWtCLDJCQUEyQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLGVBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQSxzREFBOEM7QUFDOUM7QUFDQTtBQUNBLG9DQUE0QjtBQUM1QixxQ0FBNkI7QUFDN0IseUNBQWlDOztBQUVqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQTZCO0FBQzdCLHFDQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsNkJBQXFCLGdCQUFnQjtBQUNyQztBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxhQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBCQUFrQiw4QkFBOEI7QUFDaEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLGVBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQW9CLDJCQUEyQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBbUIsY0FBYztBQUNqQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQWdCLEtBQUs7QUFDckI7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBZ0IsWUFBWTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFjLDRCQUE0QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZSw0QkFBNEI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBZSw0QkFBNEI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUFpQix1Q0FBdUM7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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RVg3YixnQkFBWTBiLFdBQVosRUFBeUJJLGFBQXpCLEVBQXdDSCxNQUF4QyxFQUFnRDtBQUM1QztBQUNBLGNBQU1KLFVBQVVQLFlBQVlRLGdCQUFaLENBQTZCLFNBQTdCLENBQWhCO0FBQ0EsYUFBS0QsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsYUFBS1EsTUFBTCxHQUFjUixVQUFVLFNBQXhCO0FBQ0EsYUFBS0csV0FBTCxHQUFtQkEsY0FBY0gsVUFBVUcsV0FBeEIsR0FBc0NILFVBQVUsbUJBQW5FO0FBQ0EsYUFBS08sYUFBTCxHQUFxQkEsaUJBQWlCLGdCQUF0QztBQUNBLGFBQUtILE1BQUwsR0FBY0EsTUFBZDtBQUNIOztBQUVESyxrQkFBY0MsY0FBZCxFQUE4QkMsWUFBOUIsRUFBNEM7QUFDeEMsY0FBTVAsU0FBVSxJQUFHLEtBQUtKLE9BQUwsR0FBZSxtQkFBb0Isb0NBQW1DVSxjQUFlLElBQUdDLFlBQWEsRUFBeEg7QUFDQWxCLG9CQUFZWSxNQUFaLENBQW1CLEtBQUtHLE1BQXhCLEVBQWdDSixNQUFoQyxFQUF3QyxLQUF4QztBQUNIOztBQUVEUSxxQkFBaUIxVCxLQUFqQixFQUF3QnlTLEdBQXhCLEVBQTZCdEYsUUFBUSxTQUFyQyxFQUFnRDBGLFFBQVEsR0FBeEQsRUFBNkQ7QUFDekRELHlCQUFpQjVTLEtBQWpCLEVBQXdCeVMsR0FBeEIsRUFBNkJ0RixLQUE3QixFQUFvQzBGLEtBQXBDO0FBQ0g7O0FBRUQsV0FBT2MsZUFBUCxHQUF5QjtBQUNyQixlQUFPO0FBQ0gxQiwwQkFERyxFQUNhRyxpQkFEYixFQUNnQ0UsV0FEaEMsRUFDNkNDO0FBRDdDLFNBQVA7QUFHSDtBQXpCVSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cbiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7XG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHR9XG4gXHR2YXIgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2sgPSB3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdO1xuIFx0d2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXSA9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gd2VicGFja0hvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdFx0aWYgKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHR9IDtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XG4gXHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuIFx0XHRzY3JpcHQuY2hhcnNldCA9IFwidXRmLThcIjtcbiBcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIjtcbiBcdFx0O1xuIFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdChyZXF1ZXN0VGltZW91dCkge1xuIFx0XHRyZXF1ZXN0VGltZW91dCA9IHJlcXVlc3RUaW1lb3V0IHx8IDEwMDAwO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0aWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xuIFx0XHRcdH1cbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiBcdFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xuIFx0XHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcbiBcdFx0XHRcdHJlcXVlc3QudGltZW91dCA9IHJlcXVlc3RUaW1lb3V0O1xuIFx0XHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuIFx0XHRcdFx0aWYgKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XG4gXHRcdFx0XHRcdC8vIHRpbWVvdXRcbiBcdFx0XHRcdFx0cmVqZWN0KFxuIFx0XHRcdFx0XHRcdG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIHRpbWVkIG91dC5cIilcbiBcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xuIFx0XHRcdFx0XHQvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG4gXHRcdFx0XHRcdHJlc29sdmUoKTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XG4gXHRcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcbiBcdFx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIGZhaWxlZC5cIikpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0Ly8gc3VjY2Vzc1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuIFx0XHRcdFx0XHRcdHJlamVjdChlKTtcbiBcdFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0cmVzb2x2ZSh1cGRhdGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcImY3N2YxMzBlY2QxMjc3MDQ1NDRiXCI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0aWYgKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiBcdFx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuIFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcbiBcdFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuIFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcbiBcdFx0XHRcdFx0XHRyZXF1ZXN0ICtcbiBcdFx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuIFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHQpO1xuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XG4gXHRcdH07XG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH0sXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9O1xuIFx0XHRmb3IgKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwiZVwiICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcInRcIlxuIFx0XHRcdCkge1xuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInJlYWR5XCIpIGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR0aHJvdyBlcnI7XG4gXHRcdFx0fSk7XG5cbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XG4gXHRcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xuIFx0XHRcdFx0XHRpZiAoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdFx0Zm4udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdFx0aWYgKG1vZGUgJiAxKSB2YWx1ZSA9IGZuKHZhbHVlKTtcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy50KHZhbHVlLCBtb2RlICYgfjEpO1xuIFx0XHR9O1xuIFx0XHRyZXR1cm4gZm47XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBob3QgPSB7XG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcblxuIFx0XHRcdC8vIE1vZHVsZSBBUElcbiBcdFx0XHRhY3RpdmU6IHRydWUsXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGRlcCA9PT0gXCJ1bmRlZmluZWRcIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0XHRlbHNlIGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0fSxcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgZGVwID09PSBcInVuZGVmaW5lZFwiKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAraWQgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdH1cbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XG4gXHRcdFx0aWYgKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHRmb3IodmFyIGNodW5rSWQgaW4gaW5zdGFsbGVkQ2h1bmtzKVxuIFx0XHRcdHtcbiBcdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbG9uZS1ibG9ja3NcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCkubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmICghbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCkgY29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdClcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm90IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwiaW5kZXhcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goW1wiLi9zcmMvaW5kZXguanNcIixcInZlbmRvclwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxyXFxuLyog5pel5Y6G5pW05L2T5qC35byPXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuI2NhbGVuZGFyLWNvbnRhaW5lciB7XFxyXFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gICAgdG9wOiAwO1xcclxcbiAgICBsZWZ0OiA4cHg7XFxyXFxuICAgIHJpZ2h0OiA4cHg7XFxyXFxuICAgIGJvdHRvbTogOHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZmMtaGVhZGVyLXRvb2xiYXIge1xcclxcbiAgICAvKlxcclxcbiAgICB0aGUgY2FsZW5kYXIgd2lsbCBiZSBidXR0aW5nIHVwIGFnYWluc3QgdGhlIGVkZ2VzLFxcclxcbiAgICBidXQgbGV0J3Mgc2Nvb3QgaW4gdGhlIGhlYWRlcidzIGJ1dHRvbnNcXHJcXG4gICAgKi9cXHJcXG4gICAgcGFkZGluZy10b3A6IDE0cHg7XFxyXFxuICAgIHBhZGRpbmctbGVmdDogMDtcXHJcXG4gICAgcGFkZGluZy1yaWdodDogMDtcXHJcXG59XFxyXFxuXFxyXFxuLyog5LqL5Lu25riy5p+TXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuLnRjLWNvbXBsZXRlIHtcXHJcXG4gICAgb3BhY2l0eTogMC4zO1xcclxcblxcclxcbn1cXHJcXG5cXHJcXG4udGMtY29tcGxldGUgPiAuZmMtY29udGVudCB7XFxyXFxuICAgIHRleHQtZGVjb3JhdGlvbjogbGluZS10aHJvdWdoICFpbXBvcnRhbnQ7XFxyXFxufVxcclxcblxcclxcbi50Yy1jb21wbGV0ZTpob3ZlciB7XFxyXFxuICAgIG9wYWNpdHk6IDE7XFxyXFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLyogUG9wb3ZlciDnu4Tku7bmoLflvI9cXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG5cXHJcXG4vKiBQb3BvdmVyIOWuueWZqOWPiuWumuS9jVxcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcblxcclxcbi50Yy1wb3BvdmVyIHtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICBiYWNrZ3JvdW5kOiAjRkZGO1xcclxcbiAgICBjb2xvcjogYmxhY2s7XFxyXFxuICAgIHdpZHRoOiBhdXRvO1xcclxcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMik7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcXHJcXG4gICAgYm94LXNoYWRvdzogMCAycHggNHB4IHJnYmEoMCwgMCwgMCwgLjIpO1xcclxcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3ZlciAuYXJyb3cge1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgICB3aWR0aDogMjBweDtcXHJcXG4gICAgaGVpZ2h0OiAxMHB4O1xcclxcbiAgICBtYXJnaW46IDAgNnB4O1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3ZlciAuYXJyb3c6OmJlZm9yZSwgLnRjLXBvcG92ZXIgLmFycm93OjphZnRlciB7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcclxcbiAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xcclxcbiAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xcclxcbn1cXHJcXG5cXHJcXG4vKiB0b3Ag5pS+572u5qC35byPXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJ0b3BcXFwiXSB7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwidG9wXFxcIl0gLmFycm93IHtcXHJcXG4gICAgYm90dG9tOiBjYWxjKCgxMHB4ICsgMXB4KSAqIC0xKTtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJ0b3BcXFwiXSAuYXJyb3c6OmJlZm9yZSxcXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInRvcFxcXCJdIC5hcnJvdzo6YWZ0ZXIge1xcclxcbiAgICBib3JkZXItd2lkdGg6IDEwcHggMTBweCAwO1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInRvcFxcXCJdIC5hcnJvdzo6YmVmb3JlIHtcXHJcXG4gICAgYm90dG9tOiAwO1xcclxcbiAgICBib3JkZXItdG9wLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMjUpO1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInRvcFxcXCJdIC5hcnJvdzo6YWZ0ZXIge1xcclxcbiAgICBib3R0b206IDFweDtcXHJcXG4gICAgYm9yZGVyLXRvcC1jb2xvcjogI2ZmZjtcXHJcXG59XFxyXFxuXFxyXFxuLyogcmlnaHQg5pS+572u5qC35byPXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJyaWdodFxcXCJdIHtcXHJcXG4gICAgbWFyZ2luLWxlZnQ6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwicmlnaHRcXFwiXSAuYXJyb3cge1xcclxcbiAgICBsZWZ0OiBjYWxjKCgxMHB4ICsgMXB4KSAqIC0xKTtcXHJcXG4gICAgd2lkdGg6IDEwcHg7XFxyXFxuICAgIGhlaWdodDogMjBweDtcXHJcXG4gICAgbWFyZ2luOiA2cHggMDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJyaWdodFxcXCJdIC5hcnJvdzo6YmVmb3JlLFxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwicmlnaHRcXFwiXSAuYXJyb3c6OmFmdGVyIHtcXHJcXG4gICAgYm9yZGVyLXdpZHRoOiAxMHB4IDEwcHggMTBweCAwO1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInJpZ2h0XFxcIl0gLmFycm93OjpiZWZvcmUge1xcclxcbiAgICBsZWZ0OiAwO1xcclxcbiAgICBib3JkZXItcmlnaHQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSk7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwicmlnaHRcXFwiXSAuYXJyb3c6OmFmdGVyIHtcXHJcXG4gICAgbGVmdDogMXB4O1xcclxcbiAgICBib3JkZXItcmlnaHQtY29sb3I6ICNmZmY7XFxyXFxufVxcclxcblxcclxcbi8qIGJvdHRvbSDmlL7nva7moLflvI9cXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImJvdHRvbVxcXCJdIHtcXHJcXG4gICAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJib3R0b21cXFwiXSAuYXJyb3cge1xcclxcbiAgICB0b3A6IGNhbGMoKDEwcHggKyAxcHgpICogLTEpO1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImJvdHRvbVxcXCJdIC5hcnJvdzo6YmVmb3JlLFxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwiYm90dG9tXFxcIl0gLmFycm93OjphZnRlciB7XFxyXFxuICAgIGJvcmRlci13aWR0aDogMCAxMHB4IDEwcHggMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJib3R0b21cXFwiXSAuYXJyb3c6OmJlZm9yZSB7XFxyXFxuICAgIHRvcDogMDtcXHJcXG4gICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KTtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJib3R0b21cXFwiXSAuYXJyb3c6OmFmdGVyIHtcXHJcXG4gICAgdG9wOiAxcHg7XFxyXFxuICAgIGJvcmRlci1ib3R0b20tY29sb3I6ICNmN2Y3Zjc7IC8q6L+Z6YeM5Li65LqG5LiT6Zeo6YCC6YWN5pyJ5qCH6aKY6IOM5pmv55qEUG9wb3ZlciovXFxyXFxufVxcclxcblxcclxcbi8qIGxlZnQg5pS+572u5qC35byPXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJsZWZ0XFxcIl0ge1xcclxcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwibGVmdFxcXCJdIC5hcnJvdyB7XFxyXFxuICAgIHJpZ2h0OiBjYWxjKCgxMHB4ICsgMXB4KSAqIC0xKTtcXHJcXG4gICAgd2lkdGg6IDEwcHg7XFxyXFxuICAgIGhlaWdodDogMjBweDtcXHJcXG4gICAgbWFyZ2luOiA2cHggMDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJsZWZ0XFxcIl0gLmFycm93OjpiZWZvcmUsXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJsZWZ0XFxcIl0gLmFycm93OjphZnRlciB7XFxyXFxuICAgIGJvcmRlci13aWR0aDogMTBweCAwIDEwcHggMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJsZWZ0XFxcIl0gLmFycm93OjpiZWZvcmUge1xcclxcbiAgICByaWdodDogMDtcXHJcXG4gICAgYm9yZGVyLWxlZnQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSk7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwibGVmdFxcXCJdIC5hcnJvdzo6YWZ0ZXIge1xcclxcbiAgICByaWdodDogMXB4O1xcclxcbiAgICBib3JkZXItbGVmdC1jb2xvcjogI2ZmZjtcXHJcXG59XFxyXFxuXFxyXFxuLyogQ29udGVudCDmoIfpopjlkozlhoXlrrlcXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG5cXHJcXG4udGMtcG9wb3Zlci1oZWFkZXIge1xcclxcbiAgICBwYWRkaW5nOiAuNXJlbSAuNzVyZW07XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IDA7XFxyXFxuICAgIGZvbnQtc2l6ZTogMXJlbTtcXHJcXG4gICAgY29sb3I6IGluaGVyaXQ7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmN2Y3Zjc7XFxyXFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZWJlYmViO1xcclxcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA2cHg7XFxyXFxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA2cHg7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyLWJvZHkge1xcclxcbiAgICBwYWRkaW5nOiAxMHB4IDE1cHg7XFxyXFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiI3RjLWVkaXRwb3BwZXItZXZlbnR0aXRsZSB7XFxyXFxuICAgIGJvcmRlci13aWR0aDogMXB4O1xcclxcbiAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXHJcXG4gICAgcGFkZGluZzogMDtcXHJcXG4gICAgbWFyZ2luOiAwO1xcclxcbiAgICBmb250LXNpemU6IDEuMmVtO1xcclxcbiAgICBmb250LXdlaWdodDogYm9sZDtcXHJcXG59XFxyXFxuXFxyXFxuI3RjLWVkaXRwb3BwZXItZXZlbnR0aXRsZTpmb2N1cyxcXHJcXG4jdGMtZWRpdHBvcHBlci1ldmVudHRpdGxlOmhvdmVyIHtcXHJcXG4gICAgb3V0bGluZTogbm9uZTtcXHJcXG4gICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogYmxhY2s7IFxcclxcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcImh0bWwsIGJvZHkge1xcclxcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcclxcbiAgICBmb250LXNpemU6IDE0cHg7XFxyXFxufVxcclxcblxcclxcbjpmb2N1cyB7XFxyXFxuICAgIG91dGxpbmU6bm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLyogRm9udHMuY3NzIC0tIOi3qOW5s+WPsOS4reaWh+Wtl+S9k+ino+WGs+aWueahiFxcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG4uZm9udC1oZWkge2ZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBcXFwiTm90byBTYW5zXFxcIiwgXFxcIkhlbHZldGljYSBOZXVlXFxcIiwgSGVsdmV0aWNhLCBcXFwiTmltYnVzIFNhbnMgTFxcXCIsIEFyaWFsLCBcXFwiTGliZXJhdGlvbiBTYW5zXFxcIiwgXFxcIlBpbmdGYW5nIFNDXFxcIiwgXFxcIkhpcmFnaW5vIFNhbnMgR0JcXFwiLCBcXFwiTm90byBTYW5zIENKSyBTQ1xcXCIsIFxcXCJTb3VyY2UgSGFuIFNhbnMgU0NcXFwiLCBcXFwiU291cmNlIEhhbiBTYW5zIENOXFxcIiwgXFxcIk1pY3Jvc29mdCBZYUhlaVxcXCIsIFxcXCJXZW5xdWFueWkgTWljcm8gSGVpXFxcIiwgXFxcIldlblF1YW5ZaSBaZW4gSGVpXFxcIiwgXFxcIlNUIEhlaXRpXFxcIiwgU2ltSGVpLCBcXFwiV2VuUXVhbllpIFplbiBIZWkgU2hhcnBcXFwiLCBzYW5zLXNlcmlmO31cXHJcXG4uZm9udC1rYWkge2ZvbnQtZmFtaWx5OiBCYXNrZXJ2aWxsZSwgR2VvcmdpYSwgXFxcIkxpYmVyYXRpb24gU2VyaWZcXFwiLCBcXFwiS2FpdGkgU0NcXFwiLCBTVEthaXRpLCBcXFwiQVIgUEwgVUthaSBDTlxcXCIsIFxcXCJBUiBQTCBVS2FpIEhLXFxcIiwgXFxcIkFSIFBMIFVLYWkgVFdcXFwiLCBcXFwiQVIgUEwgVUthaSBUVyBNQkVcXFwiLCBcXFwiQVIgUEwgS2FpdGlNIEdCXFxcIiwgS2FpVGksIEthaVRpX0dCMjMxMiwgREZLYWktU0IsIFxcXCJUVy1LYWlcXFwiLCBzZXJpZjt9XFxyXFxuLmZvbnQtc29uZyB7Zm9udC1mYW1pbHk6IEdlb3JnaWEsIFxcXCJOaW1idXMgUm9tYW4gTm85IExcXFwiLCBcXFwiU29uZ3RpIFNDXFxcIiwgXFxcIk5vdG8gU2VyaWYgQ0pLIFNDXFxcIiwgXFxcIlNvdXJjZSBIYW4gU2VyaWYgU0NcXFwiLCBcXFwiU291cmNlIEhhbiBTZXJpZiBDTlxcXCIsIFNUU29uZywgXFxcIkFSIFBMIE5ldyBTdW5nXFxcIiwgXFxcIkFSIFBMIFN1bmd0aUwgR0JcXFwiLCBOU2ltU3VuLCBTaW1TdW4sIFxcXCJUVy1TdW5nXFxcIiwgXFxcIldlblF1YW5ZaSBCaXRtYXAgU29uZ1xcXCIsIFxcXCJBUiBQTCBVTWluZyBDTlxcXCIsIFxcXCJBUiBQTCBVTWluZyBIS1xcXCIsIFxcXCJBUiBQTCBVTWluZyBUV1xcXCIsIFxcXCJBUiBQTCBVTWluZyBUVyBNQkVcXFwiLCBQTWluZ0xpVSwgTWluZ0xpVSwgc2VyaWY7fVxcclxcbi5mb250LWZhbmctc29uZyB7Zm9udC1mYW1pbHk6IEJhc2tlcnZpbGxlLCBcXFwiVGltZXMgTmV3IFJvbWFuXFxcIiwgXFxcIkxpYmVyYXRpb24gU2VyaWZcXFwiLCBTVEZhbmdzb25nLCBGYW5nU29uZywgRmFuZ1NvbmdfR0IyMzEyLCBcXFwiQ1dURVgtRlxcXCIsIHNlcmlmO31cXHJcXG5cXHJcXG4vKiDkuLTml7bmlL7nva5cXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG5cXHJcXG4udWktYnV0dG9uLWljb24tb25seS5zcGxpdGJ1dHRvbi1zZWxlY3Qge1xcclxcbiAgICB3aWR0aDogMWVtO1xcclxcbn1cXHJcXG5cXHJcXG5hW2RhdGEtZ290b10ge1xcclxcbiAgICBjb2xvcjogIzAwMDtcXHJcXG59XFxyXFxuXFxyXFxuLyogQm9vdHN0cmFwIDQg57uE5Lu25qC35byPXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuXFxyXFxuLyog6KGo5Y2VXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuLmNvbC1mb3JtLWxhYmVsIHtcXHJcXG4gICAgcGFkZGluZy10b3A6IGNhbGMoLjM3NXJlbSArIDFweCk7XFxyXFxuICAgIHBhZGRpbmctYm90dG9tOiBjYWxjKC4zNzVyZW0gKyAxcHgpO1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xcclxcbiAgICBmb250LXNpemU6IGluaGVyaXQ7XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiAxLjU7XFxyXFxufVxcclxcblxcclxcbi5pbnB1dC1ncm91cC1hZGRvbiB7XFxyXFxuICBib3JkZXItbGVmdC13aWR0aDogMDtcXHJcXG4gIGJvcmRlci1yaWdodC13aWR0aDogMDtcXHJcXG59XFxyXFxuLmlucHV0LWdyb3VwLWFkZG9uOmZpcnN0LWNoaWxkIHtcXHJcXG4gIGJvcmRlci1sZWZ0LXdpZHRoOiAxcHg7XFxyXFxufVxcclxcbi5pbnB1dC1ncm91cC1hZGRvbjpsYXN0LWNoaWxkIHtcXHJcXG4gIGJvcmRlci1yaWdodC13aWR0aDogMXB4O1xcclxcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJ2YXIgbWFwID0ge1xuXHRcIi4vYWZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FmLmpzXCIsXG5cdFwiLi9hZi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYWYuanNcIixcblx0XCIuL2FyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci5qc1wiLFxuXHRcIi4vYXItZHpcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWR6LmpzXCIsXG5cdFwiLi9hci1kei5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItZHouanNcIixcblx0XCIuL2FyLWt3XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1rdy5qc1wiLFxuXHRcIi4vYXIta3cuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWt3LmpzXCIsXG5cdFwiLi9hci1seVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItbHkuanNcIixcblx0XCIuL2FyLWx5LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1seS5qc1wiLFxuXHRcIi4vYXItbWFcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLW1hLmpzXCIsXG5cdFwiLi9hci1tYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItbWEuanNcIixcblx0XCIuL2FyLXNhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1zYS5qc1wiLFxuXHRcIi4vYXItc2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLXNhLmpzXCIsXG5cdFwiLi9hci10blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItdG4uanNcIixcblx0XCIuL2FyLXRuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci10bi5qc1wiLFxuXHRcIi4vYXIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLmpzXCIsXG5cdFwiLi9helwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXouanNcIixcblx0XCIuL2F6LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hei5qc1wiLFxuXHRcIi4vYmVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JlLmpzXCIsXG5cdFwiLi9iZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYmUuanNcIixcblx0XCIuL2JnXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iZy5qc1wiLFxuXHRcIi4vYmcuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JnLmpzXCIsXG5cdFwiLi9ibVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm0uanNcIixcblx0XCIuL2JtLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ibS5qc1wiLFxuXHRcIi4vYm5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JuLmpzXCIsXG5cdFwiLi9ibi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm4uanNcIixcblx0XCIuL2JvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iby5qc1wiLFxuXHRcIi4vYm8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JvLmpzXCIsXG5cdFwiLi9iclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYnIuanNcIixcblx0XCIuL2JyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ici5qc1wiLFxuXHRcIi4vYnNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JzLmpzXCIsXG5cdFwiLi9icy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYnMuanNcIixcblx0XCIuL2NhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jYS5qc1wiLFxuXHRcIi4vY2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2NhLmpzXCIsXG5cdFwiLi9jc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3MuanNcIixcblx0XCIuL2NzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jcy5qc1wiLFxuXHRcIi4vY3ZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2N2LmpzXCIsXG5cdFwiLi9jdi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3YuanNcIixcblx0XCIuL2N5XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jeS5qc1wiLFxuXHRcIi4vY3kuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2N5LmpzXCIsXG5cdFwiLi9kYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGEuanNcIixcblx0XCIuL2RhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kYS5qc1wiLFxuXHRcIi4vZGVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLmpzXCIsXG5cdFwiLi9kZS1hdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUtYXQuanNcIixcblx0XCIuL2RlLWF0LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS1hdC5qc1wiLFxuXHRcIi4vZGUtY2hcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLWNoLmpzXCIsXG5cdFwiLi9kZS1jaC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUtY2guanNcIixcblx0XCIuL2RlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS5qc1wiLFxuXHRcIi4vZHZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2R2LmpzXCIsXG5cdFwiLi9kdi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZHYuanNcIixcblx0XCIuL2VsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbC5qc1wiLFxuXHRcIi4vZWwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VsLmpzXCIsXG5cdFwiLi9lbi1hdVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tYXUuanNcIixcblx0XCIuL2VuLWF1LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1hdS5qc1wiLFxuXHRcIi4vZW4tY2FcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWNhLmpzXCIsXG5cdFwiLi9lbi1jYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tY2EuanNcIixcblx0XCIuL2VuLWdiXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1nYi5qc1wiLFxuXHRcIi4vZW4tZ2IuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWdiLmpzXCIsXG5cdFwiLi9lbi1pZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4taWUuanNcIixcblx0XCIuL2VuLWllLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1pZS5qc1wiLFxuXHRcIi4vZW4taWxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWlsLmpzXCIsXG5cdFwiLi9lbi1pbC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4taWwuanNcIixcblx0XCIuL2VuLW56XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1uei5qc1wiLFxuXHRcIi4vZW4tbnouanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLW56LmpzXCIsXG5cdFwiLi9lb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW8uanNcIixcblx0XCIuL2VvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lby5qc1wiLFxuXHRcIi4vZXNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLmpzXCIsXG5cdFwiLi9lcy1kb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMtZG8uanNcIixcblx0XCIuL2VzLWRvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy1kby5qc1wiLFxuXHRcIi4vZXMtdXNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLXVzLmpzXCIsXG5cdFwiLi9lcy11cy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMtdXMuanNcIixcblx0XCIuL2VzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy5qc1wiLFxuXHRcIi4vZXRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2V0LmpzXCIsXG5cdFwiLi9ldC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXQuanNcIixcblx0XCIuL2V1XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ldS5qc1wiLFxuXHRcIi4vZXUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2V1LmpzXCIsXG5cdFwiLi9mYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZmEuanNcIixcblx0XCIuL2ZhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mYS5qc1wiLFxuXHRcIi4vZmlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZpLmpzXCIsXG5cdFwiLi9maS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZmkuanNcIixcblx0XCIuL2ZvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mby5qc1wiLFxuXHRcIi4vZm8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZvLmpzXCIsXG5cdFwiLi9mclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnIuanNcIixcblx0XCIuL2ZyLWNhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci1jYS5qc1wiLFxuXHRcIi4vZnItY2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLWNhLmpzXCIsXG5cdFwiLi9mci1jaFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnItY2guanNcIixcblx0XCIuL2ZyLWNoLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci1jaC5qc1wiLFxuXHRcIi4vZnIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLmpzXCIsXG5cdFwiLi9meVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnkuanNcIixcblx0XCIuL2Z5LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9meS5qc1wiLFxuXHRcIi4vZ2RcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dkLmpzXCIsXG5cdFwiLi9nZC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ2QuanNcIixcblx0XCIuL2dsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nbC5qc1wiLFxuXHRcIi4vZ2wuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dsLmpzXCIsXG5cdFwiLi9nb20tbGF0blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ29tLWxhdG4uanNcIixcblx0XCIuL2dvbS1sYXRuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nb20tbGF0bi5qc1wiLFxuXHRcIi4vZ3VcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2d1LmpzXCIsXG5cdFwiLi9ndS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ3UuanNcIixcblx0XCIuL2hlXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oZS5qc1wiLFxuXHRcIi4vaGUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hlLmpzXCIsXG5cdFwiLi9oaVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaGkuanNcIixcblx0XCIuL2hpLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oaS5qc1wiLFxuXHRcIi4vaHJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hyLmpzXCIsXG5cdFwiLi9oci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHIuanNcIixcblx0XCIuL2h1XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9odS5qc1wiLFxuXHRcIi4vaHUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2h1LmpzXCIsXG5cdFwiLi9oeS1hbVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHktYW0uanNcIixcblx0XCIuL2h5LWFtLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oeS1hbS5qc1wiLFxuXHRcIi4vaWRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2lkLmpzXCIsXG5cdFwiLi9pZC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaWQuanNcIixcblx0XCIuL2lzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pcy5qc1wiLFxuXHRcIi4vaXMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2lzLmpzXCIsXG5cdFwiLi9pdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaXQuanNcIixcblx0XCIuL2l0LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pdC5qc1wiLFxuXHRcIi4vamFcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2phLmpzXCIsXG5cdFwiLi9qYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvamEuanNcIixcblx0XCIuL2p2XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9qdi5qc1wiLFxuXHRcIi4vanYuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2p2LmpzXCIsXG5cdFwiLi9rYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva2EuanNcIixcblx0XCIuL2thLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rYS5qc1wiLFxuXHRcIi4va2tcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2trLmpzXCIsXG5cdFwiLi9ray5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva2suanNcIixcblx0XCIuL2ttXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rbS5qc1wiLFxuXHRcIi4va20uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ttLmpzXCIsXG5cdFwiLi9rblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva24uanNcIixcblx0XCIuL2tuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rbi5qc1wiLFxuXHRcIi4va29cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2tvLmpzXCIsXG5cdFwiLi9rby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva28uanNcIixcblx0XCIuL2t5XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9reS5qc1wiLFxuXHRcIi4va3kuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2t5LmpzXCIsXG5cdFwiLi9sYlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbGIuanNcIixcblx0XCIuL2xiLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sYi5qc1wiLFxuXHRcIi4vbG9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2xvLmpzXCIsXG5cdFwiLi9sby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbG8uanNcIixcblx0XCIuL2x0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sdC5qc1wiLFxuXHRcIi4vbHQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2x0LmpzXCIsXG5cdFwiLi9sdlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbHYuanNcIixcblx0XCIuL2x2LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sdi5qc1wiLFxuXHRcIi4vbWVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21lLmpzXCIsXG5cdFwiLi9tZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWUuanNcIixcblx0XCIuL21pXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9taS5qc1wiLFxuXHRcIi4vbWkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21pLmpzXCIsXG5cdFwiLi9ta1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWsuanNcIixcblx0XCIuL21rLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tay5qc1wiLFxuXHRcIi4vbWxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21sLmpzXCIsXG5cdFwiLi9tbC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWwuanNcIixcblx0XCIuL21uXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tbi5qc1wiLFxuXHRcIi4vbW4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21uLmpzXCIsXG5cdFwiLi9tclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXIuanNcIixcblx0XCIuL21yLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tci5qc1wiLFxuXHRcIi4vbXNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21zLmpzXCIsXG5cdFwiLi9tcy1teVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXMtbXkuanNcIixcblx0XCIuL21zLW15LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tcy1teS5qc1wiLFxuXHRcIi4vbXMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21zLmpzXCIsXG5cdFwiLi9tdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXQuanNcIixcblx0XCIuL210LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tdC5qc1wiLFxuXHRcIi4vbXlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL215LmpzXCIsXG5cdFwiLi9teS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXkuanNcIixcblx0XCIuL25iXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9uYi5qc1wiLFxuXHRcIi4vbmIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25iLmpzXCIsXG5cdFwiLi9uZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmUuanNcIixcblx0XCIuL25lLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9uZS5qc1wiLFxuXHRcIi4vbmxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25sLmpzXCIsXG5cdFwiLi9ubC1iZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmwtYmUuanNcIixcblx0XCIuL25sLWJlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubC1iZS5qc1wiLFxuXHRcIi4vbmwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25sLmpzXCIsXG5cdFwiLi9ublwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbm4uanNcIixcblx0XCIuL25uLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubi5qc1wiLFxuXHRcIi4vcGEtaW5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3BhLWluLmpzXCIsXG5cdFwiLi9wYS1pbi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcGEtaW4uanNcIixcblx0XCIuL3BsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wbC5qc1wiLFxuXHRcIi4vcGwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3BsLmpzXCIsXG5cdFwiLi9wdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcHQuanNcIixcblx0XCIuL3B0LWJyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wdC1ici5qc1wiLFxuXHRcIi4vcHQtYnIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3B0LWJyLmpzXCIsXG5cdFwiLi9wdC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcHQuanNcIixcblx0XCIuL3JvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9yby5qc1wiLFxuXHRcIi4vcm8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3JvLmpzXCIsXG5cdFwiLi9ydVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcnUuanNcIixcblx0XCIuL3J1LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ydS5qc1wiLFxuXHRcIi4vc2RcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NkLmpzXCIsXG5cdFwiLi9zZC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2QuanNcIixcblx0XCIuL3NlXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zZS5qc1wiLFxuXHRcIi4vc2UuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NlLmpzXCIsXG5cdFwiLi9zaVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2kuanNcIixcblx0XCIuL3NpLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zaS5qc1wiLFxuXHRcIi4vc2tcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NrLmpzXCIsXG5cdFwiLi9zay5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2suanNcIixcblx0XCIuL3NsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zbC5qc1wiLFxuXHRcIi4vc2wuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NsLmpzXCIsXG5cdFwiLi9zcVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3EuanNcIixcblx0XCIuL3NxLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zcS5qc1wiLFxuXHRcIi4vc3JcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NyLmpzXCIsXG5cdFwiLi9zci1jeXJsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zci1jeXJsLmpzXCIsXG5cdFwiLi9zci1jeXJsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zci1jeXJsLmpzXCIsXG5cdFwiLi9zci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3IuanNcIixcblx0XCIuL3NzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zcy5qc1wiLFxuXHRcIi4vc3MuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NzLmpzXCIsXG5cdFwiLi9zdlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3YuanNcIixcblx0XCIuL3N2LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zdi5qc1wiLFxuXHRcIi4vc3dcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3N3LmpzXCIsXG5cdFwiLi9zdy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3cuanNcIixcblx0XCIuL3RhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90YS5qc1wiLFxuXHRcIi4vdGEuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RhLmpzXCIsXG5cdFwiLi90ZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGUuanNcIixcblx0XCIuL3RlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ZS5qc1wiLFxuXHRcIi4vdGV0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ZXQuanNcIixcblx0XCIuL3RldC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGV0LmpzXCIsXG5cdFwiLi90Z1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGcuanNcIixcblx0XCIuL3RnLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90Zy5qc1wiLFxuXHRcIi4vdGhcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RoLmpzXCIsXG5cdFwiLi90aC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGguanNcIixcblx0XCIuL3RsLXBoXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90bC1waC5qc1wiLFxuXHRcIi4vdGwtcGguanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RsLXBoLmpzXCIsXG5cdFwiLi90bGhcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RsaC5qc1wiLFxuXHRcIi4vdGxoLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90bGguanNcIixcblx0XCIuL3RyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ci5qc1wiLFxuXHRcIi4vdHIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RyLmpzXCIsXG5cdFwiLi90emxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3R6bC5qc1wiLFxuXHRcIi4vdHpsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90emwuanNcIixcblx0XCIuL3R6bVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHptLmpzXCIsXG5cdFwiLi90em0tbGF0blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHptLWxhdG4uanNcIixcblx0XCIuL3R6bS1sYXRuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90em0tbGF0bi5qc1wiLFxuXHRcIi4vdHptLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90em0uanNcIixcblx0XCIuL3VnLWNuXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91Zy1jbi5qc1wiLFxuXHRcIi4vdWctY24uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VnLWNuLmpzXCIsXG5cdFwiLi91a1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdWsuanNcIixcblx0XCIuL3VrLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ay5qc1wiLFxuXHRcIi4vdXJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VyLmpzXCIsXG5cdFwiLi91ci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXIuanNcIixcblx0XCIuL3V6XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ei5qc1wiLFxuXHRcIi4vdXotbGF0blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXotbGF0bi5qc1wiLFxuXHRcIi4vdXotbGF0bi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXotbGF0bi5qc1wiLFxuXHRcIi4vdXouanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3V6LmpzXCIsXG5cdFwiLi92aVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdmkuanNcIixcblx0XCIuL3ZpLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS92aS5qc1wiLFxuXHRcIi4veC1wc2V1ZG9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3gtcHNldWRvLmpzXCIsXG5cdFwiLi94LXBzZXVkby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUveC1wc2V1ZG8uanNcIixcblx0XCIuL3lvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS95by5qc1wiLFxuXHRcIi4veW8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3lvLmpzXCIsXG5cdFwiLi96aC1jblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtY24uanNcIixcblx0XCIuL3poLWNuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC1jbi5qc1wiLFxuXHRcIi4vemgtaGtcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLWhrLmpzXCIsXG5cdFwiLi96aC1oay5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtaGsuanNcIixcblx0XCIuL3poLXR3XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC10dy5qc1wiLFxuXHRcIi4vemgtdHcuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLXR3LmpzXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHZhciBpZCA9IG1hcFtyZXFdO1xuXHRpZighKGlkICsgMSkpIHsgLy8gY2hlY2sgZm9yIG51bWJlciBvciBzdHJpbmdcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIGlkO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZSBzeW5jIHJlY3Vyc2l2ZSBeXFxcXC5cXFxcLy4qJFwiOyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBDYWxlbmRhciBmcm9tICcuL2NvbXBvbmVudHMvQ2FsZW5kYXIvQ2FsZW5kYXInO1xyXG5pbXBvcnQgRXZlbnRQb3BvdmVyIGZyb20gJy4vY29tcG9uZW50cy9FdmVudFBvcG92ZXIvRXZlbnRQb3BvdmVyJztcclxuaW1wb3J0IEV2ZW50TW9kYWwgZnJvbSAnLi9jb21wb25lbnRzL01vZGFsL0V2ZW50TW9kYWwnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgaXNTaG93aW5nRXZlbnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBpc0VkaXRpbmdFdmVudDogZmFsc2UsXHJcbiAgICAgICAgICAgIGlzQ3JlYXRpbmdFdmVudDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNsaWNrZWRBcmdzOiBudWxsLFxyXG4gICAgICAgICAgICBlZGl0aW5nRXZlbnQ6IG51bGwsXHJcbiAgICAgICAgICAgIHNlbGVjdGVkUmFuZ2U6IG51bGxcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5oYW5kbGVFdmVudENsaWNrID0gdGhpcy5oYW5kbGVFdmVudENsaWNrLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVQb3BvdmVySGlkZSA9IHRoaXMuaGFuZGxlUG9wb3ZlckhpZGUuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZVNlbGVjdCA9IHRoaXMuaGFuZGxlU2VsZWN0LmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVNb2RhbENsb3NlID0gdGhpcy5oYW5kbGVNb2RhbENsb3NlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVFdmVudEVkaXQgPSB0aGlzLmhhbmRsZUV2ZW50RWRpdC5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUV2ZW50Q2xpY2soIGV2ZW50LCBqc0V2ZW50LCB2aWV3ICkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBpc1Nob3dpbmdFdmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgY2xpY2tlZEFyZ3M6IHsgZXZlbnQsIGpzRXZlbnQsIHZpZXcgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlUG9wb3ZlckhpZGUoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGlzU2hvd2luZ0V2ZW50OiBmYWxzZVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlU2VsZWN0KCBzdGFydCwgZW5kLCBqc0V2ZW50LCB2aWV3ICkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBpc0NyZWF0aW5nRXZlbnQ6IHRydWUsXHJcbiAgICAgICAgICAgIHNlbGVjdGVkUmFuZ2U6IHtzdGFydCwgZW5kLCBqc0V2ZW50LCB2aWV3fVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlRXZlbnRFZGl0KGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGlzRWRpdGluZ0V2ZW50OiB0cnVlLFxyXG4gICAgICAgICAgICBlZGl0aW5nRXZlbnQ6IGV2ZW50XHJcbiAgICAgICAgfSkgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZU1vZGFsQ2xvc2UoKSB7XHJcbiAgICAgICAgLy9UT0RPOiDop6blj5FmdWxsY2FsZW5kYXIgdW5zZWxlY3RcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgaXNFZGl0aW5nRXZlbnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBpc0NyZWF0aW5nRXZlbnQ6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHNob3VsZFNob3cgPSB0aGlzLnN0YXRlLmlzRWRpdGluZ0V2ZW50IHx8IHRoaXMuc3RhdGUuaXNDcmVhdGluZ0V2ZW50O1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgaWQ9J3dpei10b21hdG8tY2FsZW5kYXInID5cclxuICAgICAgICAgICAgICAgIDxDYWxlbmRhciBrZXk9ezF9IG9uRXZlbnRDbGljayA9IHt0aGlzLmhhbmRsZUV2ZW50Q2xpY2t9IG9uU2VsZWN0PXt0aGlzLmhhbmRsZVNlbGVjdH0vPlxyXG4gICAgICAgICAgICAgICAgPEV2ZW50TW9kYWwgXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvdz17c2hvdWxkU2hvd30gXHJcbiAgICAgICAgICAgICAgICAgICAgb25Nb2RhbENsb3NlPXt0aGlzLmhhbmRsZU1vZGFsQ2xvc2V9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuaXNTaG93aW5nRXZlbnQgJiYgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxFdmVudFBvcG92ZXIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblBvcG92ZXJIaWRlPXt0aGlzLmhhbmRsZVBvcG92ZXJIaWRlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXt0aGlzLnN0YXRlLmNsaWNrZWRBcmdzLmV2ZW50LmlkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQgPSB7dGhpcy5zdGF0ZS5jbGlja2VkQXJncy5ldmVudH0gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZlcmVuY2UgPSB7dGhpcy5zdGF0ZS5jbGlja2VkQXJncy5qc0V2ZW50LnRhcmdldH0gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkVkaXRCdG5DbGljaz17dGhpcy5oYW5kbGVFdmVudEVkaXR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+IFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vQ2FsZW5kYXIuY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL0NhbGVuZGFyLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vQ2FsZW5kYXIuY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCBGdWxsQ2FsZW5kYXIgZnJvbSAnLi9GdWxsQ2FsZW5kYXInO1xyXG5pbXBvcnQgJ2Z1bGxjYWxlbmRhci1yZWFjdHdyYXBwZXIvZGlzdC9jc3MvZnVsbGNhbGVuZGFyLm1pbi5jc3MnO1xyXG5pbXBvcnQgJy4vQ2FsZW5kYXIuY3NzJztcclxuaW1wb3J0IFdpekV2ZW50RGF0YUxvYWRlciBmcm9tICcuLi8uLi9tb2RlbHMvV2l6RXZlbnREYXRhTG9hZGVyJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FsZW5kYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgZXZlbnRzOiBbXVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmRhdGFMb2FkZXIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY2FsZW5kYXIgPSBudWxsO1xyXG4gICAgICAgIC8v57uR5a6a5Y+l5p+EXHJcbiAgICAgICAgdGhpcy5oYW5kbGVGdWxsQ2FsZW5kYXJSZW5kZXIgPSB0aGlzLmhhbmRsZUZ1bGxDYWxlbmRhclJlbmRlci5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMub25WaWV3UmVuZGVyID0gdGhpcy5vblZpZXdSZW5kZXIuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLm9uRXZlbnRSZW5kZXIgPSB0aGlzLm9uRXZlbnRSZW5kZXIuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLm9uRXZlbnREcm9wID0gdGhpcy5vbkV2ZW50RHJvcC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMub25FdmVudFJlc2l6ZSA9IHRoaXMub25FdmVudFJlc2l6ZS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOS6i+S7tuWPpeafhFxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgaGFuZGxlRnVsbENhbGVuZGFyUmVuZGVyKGVsKSB7XHJcbiAgICAgICAgLy8gRnVsbENhbGVuZGFyIOa4suafk+S5i+WJjeaJp+ihjOatpOWPpeafhO+8jOS8oOWFpURPTVxyXG4gICAgICAgIHRoaXMuY2FsZW5kYXIgPSBlbDtcclxuICAgICAgICB0aGlzLmRhdGFMb2FkZXIgPSBuZXcgV2l6RXZlbnREYXRhTG9hZGVyKHRoaXMuY2FsZW5kYXIpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVmlld1JlbmRlciggdmlldywgZWxlbWVudCApIHtcclxuICAgICAgICAvLyDliLfmlrDop4blm77vvIzph43mlrDojrflj5bml6Xljobkuovku7ZcclxuICAgICAgICBjb25zdCAkY2FsZW5kYXIgPSAkKHRoaXMuY2FsZW5kYXIpO1xyXG4gICAgICAgIGNvbnN0IGV2ZW50U291cmNlcyA9IHRoaXMuZGF0YUxvYWRlci5nZXRFdmVudFNvdXJjZXMoIHZpZXcsIGVsZW1lbnQgKTtcclxuICAgICAgICAkY2FsZW5kYXIuZnVsbENhbGVuZGFyKCdyZW1vdmVFdmVudHMnKTtcclxuICAgICAgICBmb3IgKGxldCBpPTAgOyBpIDwgZXZlbnRTb3VyY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICRjYWxlbmRhci5mdWxsQ2FsZW5kYXIoJ2FkZEV2ZW50U291cmNlJywgZXZlbnRTb3VyY2VzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25FdmVudERyb3AoIGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXcgKSB7XHJcbiAgICAgICAgaWYgKGV2ZW50LmlkKXtcclxuICAgICAgICAgICAgdGhpcy5kYXRhTG9hZGVyLnVwZGF0ZUV2ZW50RGF0YU9uRHJvcChldmVudCwgZGVsdGEsIHJldmVydEZ1bmMsIGpzRXZlbnQsIHVpLCB2aWV3KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldmVydEZ1bmMoKTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBvbkV2ZW50UmVzaXplKCBldmVudCwgZGVsdGEsIHJldmVydEZ1bmMsIGpzRXZlbnQsIHVpLCB2aWV3ICkge1xyXG4gICAgICAgIGlmIChldmVudC5pZCl7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YUxvYWRlci51cGRhdGVFdmVudERhdGFPblJlc2l6ZShldmVudCwgZGVsdGEsIHJldmVydEZ1bmMsIGpzRXZlbnQsIHVpLCB2aWV3KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXZlcnRGdW5jKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRXZlbnRSZW5kZXIoIGV2ZW50T2JqLCAkZWwgKSB7XHJcbiAgICAgICAgLy8g6K6+572u5paH5pys6aKc6ImyXHJcbiAgICAgICAgY29uc3QgcmdiU3RyaW5nID0gJGVsLmNzcygnYmFja2dyb3VuZC1jb2xvcicpO1xyXG4gICAgICAgIGNvbnN0IHJnYkFycmF5ID0gL15yZ2JcXCgoXFxkKiksIChcXGQqKSwgKFxcZCopXFwpJC8uZXhlYyhyZ2JTdHJpbmcpO1xyXG4gICAgICAgIGlmIChyZ2JBcnJheSkge1xyXG4gICAgICAgICAgICBjb25zdCBoc2wgPSByZ2IyaHNsKHJnYkFycmF5WzFdLCByZ2JBcnJheVsyXSwgcmdiQXJyYXlbM10pO1xyXG4gICAgICAgICAgICBjb25zdCBsaWdodG5lc3MgPSBoc2xbMl0gLSBNYXRoLmNvcyggKGhzbFswXSs3MCkgLyAxODAqTWF0aC5QSSApICogMC4xNTtcclxuICAgICAgICAgICAgY29uc3QgdGV4dENvbG9yID0gbGlnaHRuZXNzID4gMC41ID8gJyMyMjInIDogJ3doaXRlJztcclxuICAgICAgICAgICAgJGVsLmNzcygnY29sb3InLCB0ZXh0Q29sb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDlhYPntKDlt7Lnu4/muLLmn5PvvIzlj6/kv67mlLnlhYPntKBcclxuICAgICAgICBjb25zdCBpc0NvbXBsZXRlID0gcGFyc2VJbnQoZXZlbnRPYmouY29tcGxldGUpID09IDU7XHJcbiAgICAgICAgaWYgKCBpc0NvbXBsZXRlICkge1xyXG4gICAgICAgICAgICAvLyDmoLflvI9cclxuICAgICAgICAgICAgJGVsLmFkZENsYXNzKCd0Yy1jb21wbGV0ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICBcclxuICAgIH1cclxuIFxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiuvue9ruS6i+S7tuWPpeafhFxyXG4gICAgICAgICAqIOWboOS4umZ1bGxjYWxlbmRhci1yZWFjdFdyYXBwZXLnmoTlrp7njrDmmK/nm7TmjqXov5Tlm548ZGl2IGlkPSdmdWxsY2FsZW5kYXInPjwvZGl2PlxyXG4gICAgICAgICAqIOW5tuS4lOiwg+eUqCQoJyNmdWxsY2FsZW5kYXInKS5mdWxsY2FsZW5kYXIodGhpcy5wcm9wcynov5vooYzmnoTlu7rvvIzlm6DmraRSZWFjdOW5tuayoeaciVxyXG4gICAgICAgICAqIOeuoeeQhkZ1bGxDYWxlbmRhcueKtuaAgeWSjOa4suafk+eahOiDveWKm+OAguaJgOS7peebtOaOpeWcqOiuvue9ruS4reWBmuWlvWNhbGxiYWNr77yM6K6p5o+S5Lu26Ieq5oiR566h55CG44CCXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBpZD1cImNhbGVuZGFyLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgPEZ1bGxDYWxlbmRhciBvbkZ1bGxDYWxlbmRhclJlbmRlciA9IHt0aGlzLmhhbmRsZUZ1bGxDYWxlbmRhclJlbmRlcn1cclxuICAgICAgICAgICAgICAgICAgICAvLyDln7rmnKzphY3nva5cclxuICAgICAgICAgICAgICAgICAgICBpZCA9IFwiY2FsZW5kYXJcIlxyXG4gICAgICAgICAgICAgICAgICAgIHRoZW1lU3lzdGVtID0gJ3N0YW5kYXJkJ1xyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodCA9ICdwYXJlbnQnXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyID0ge3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogJ3ByZXYsbmV4dCx0b2RheScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbnRlcjogJ3RpdGxlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6ICdtb250aCxhZ2VuZGFXZWVrLGFnZW5kYURheSxsaXN0V2VlaydcclxuICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOS4reaWh+WMllxyXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvblRleHQgPSB7e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2RheTogJ+S7iuWkqScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnRoOiAn5pyIJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2VlazogJ+WRqCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheTogJ+aXpScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3Q6ICfooagnXHJcbiAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICBtb250aE5hbWVzID0ge1tcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzHmnIgnLCAnMuaciCcsICcz5pyIJywgJzTmnIgnLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzXmnIgnLCAnNuaciCcsICc35pyIJywgJzjmnIgnLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgJznmnIgnLCAnMTDmnIgnLCAnMTHmnIgnLCAnMTLmnIgnXHJcbiAgICAgICAgICAgICAgICAgICAgXX1cclxuICAgICAgICAgICAgICAgICAgICBtb250aE5hbWVzU2hvcnQgPSB7W1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnMeaciCcsICcy5pyIJywgJzPmnIgnLCAnNOaciCcsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnNeaciCcsICc25pyIJywgJzfmnIgnLCAnOOaciCcsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnOeaciCcsICcxMOaciCcsICcxMeaciCcsICcxMuaciCdcclxuICAgICAgICAgICAgICAgICAgICBdfVxyXG4gICAgICAgICAgICAgICAgICAgIGRheU5hbWVzID0ge1tcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ+WRqOaXpScsICflkajkuIAnLCAn5ZGo5LqMJywgJ+WRqOS4iScsICflkajlm5snLCAn5ZGo5LqUJywgJ+WRqOWFrSdcclxuICAgICAgICAgICAgICAgICAgICBdfVxyXG4gICAgICAgICAgICAgICAgICAgIGRheU5hbWVzU2hvcnQgPSB7W1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAn5ZGo5pelJywgJ+WRqOS4gCcsICflkajkuownLCAn5ZGo5LiJJywgJ+WRqOWbmycsICflkajkupQnLCAn5ZGo5YWtJ1xyXG4gICAgICAgICAgICAgICAgICAgIF19XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsRGF5VGV4dCA9ICflhajlpKknXHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6K6+572u6KeG5Zu+XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZpZXcgPSAnYWdlbmRhV2VlaydcclxuICAgICAgICAgICAgICAgICAgICBub3dJbmRpY2F0b3IgPSB7dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICBmaXJzdERheSA9IHsxfVxyXG4gICAgICAgICAgICAgICAgICAgIHZpZXdzID0ge3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWdlbmRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5UaW1lOiBcIjA4OjAwOjAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbG90TGFiZWxGb3JtYXQ6ICdoKDptbSkgYSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICBuYXZMaW5rcz0ge3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsRGF5RGVmYXVsdCA9IHtmYWxzZX1cclxuICAgICAgICAgICAgICAgICAgICBldmVudExpbWl0PSB7dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICAvLyDorr7nva7kuovku7ZcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RhYmxlID0ge3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0SGVscGVyID0ge3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdGFibGUgPSB7dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICBmb3JjZUV2ZW50RHVyYXRpb24gPSB7dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICAvLyDorr7nva5VSVxyXG4gICAgICAgICAgICAgICAgICAgIHVuc2VsZWN0Q2FuY2VsID0gJy5tb2RhbCAqJ1xyXG4gICAgICAgICAgICAgICAgICAgIGRyYWdPcGFjaXR5ID0ge3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJtb250aFwiOiAuNSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhZ2VuZGFXZWVrXCI6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWdlbmRhRGF5XCI6IDFcclxuICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOiuvue9ruWPpeafhFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdCA9IHt0aGlzLnByb3BzLm9uU2VsZWN0fVxyXG4gICAgICAgICAgICAgICAgICAgIHZpZXdSZW5kZXIgPSB7dGhpcy5vblZpZXdSZW5kZXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRSZW5kZXIgPSB7dGhpcy5vbkV2ZW50UmVuZGVyfVxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50Q2xpY2sgPSB7dGhpcy5wcm9wcy5vbkV2ZW50Q2xpY2t9XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnREcm9wID0ge3RoaXMub25FdmVudERyb3B9XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRSZXNpemUgPSB7dGhpcy5vbkV2ZW50UmVzaXplfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmdiMmhzbChyLCBnLCBiKSB7XHJcbiAgICByIC89IDI1NTsgZyAvPSAyNTU7IGIgLz0gMjU1O1xyXG5cclxuICAgIHZhciBNID0gTWF0aC5tYXgociwgZywgYik7XHJcbiAgICB2YXIgbSA9IE1hdGgubWluKHIsIGcsIGIpO1xyXG4gICAgdmFyIEMgPSBNIC0gbTtcclxuICAgIHZhciBMID0gMC41KihNICsgbSk7XHJcbiAgICB2YXIgUyA9IChDID09PSAwKSA/IDAgOiBDLygxLU1hdGguYWJzKDIqTC0xKSk7XHJcblxyXG4gICAgdmFyIGg7XHJcbiAgICBpZiAoQyA9PT0gMCkgaCA9IDA7IC8vIHNwZWMnZCBhcyB1bmRlZmluZWQsIGJ1dCB1c3VhbGx5IHNldCB0byAwXHJcbiAgICBlbHNlIGlmIChNID09PSByKSBoID0gKChnLWIpL0MpICUgNjtcclxuICAgIGVsc2UgaWYgKE0gPT09IGcpIGggPSAoKGItcikvQykgKyAyO1xyXG4gICAgZWxzZSBpZiAoTSA9PT0gYikgaCA9ICgoci1nKS9DKSArIDQ7XHJcblxyXG4gICAgdmFyIEggPSA2MCAqIGg7XHJcblxyXG4gICAgLy8g5YiG5Yir5pivaHVlLCBzYXQsIGx1bVxyXG4gICAgcmV0dXJuIFtILCBwYXJzZUZsb2F0KFMpLCBwYXJzZUZsb2F0KEwpXTtcclxufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAkIGZyb20gXCJqcXVlcnlcIjtcclxuaW1wb3J0IGZ1bGxDYWxlbmRhciBmcm9tIFwiZnVsbGNhbGVuZGFyXCI7XHJcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuXHJcbmNsYXNzIEZ1bGxjYWxlbmRhck9iamVjdE1hcHBlcntcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cclxuXHR9XHJcblxyXG5cdGdldFNldHRpbmdzKHByb3BlcnRpZXMpe1xyXG5cdFx0bGV0IG5ld1NldHRpbmdzID0ge307XHJcblx0XHRmb3IgKGNvbnN0IGtleSBpbiBwcm9wZXJ0aWVzKSB7XHJcbiAgICAgIFx0XHRpZiAocHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgXHRcdG5ld1NldHRpbmdzW2tleV0gPSBwcm9wZXJ0aWVzW2tleV07XHJcbiAgICAgIFx0XHR9XHJcbiAgICBcdH1cclxuICAgIFx0cmV0dXJuIG5ld1NldHRpbmdzO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnVsbENhbGVuZGFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0dGhpcy5qcSA9ICQubm9Db25mbGljdCgpO1xyXG5cdFx0dGhpcy5mdWxsY2FsZW5kYXJPYmplY3RNYXBwZXIgPSBuZXcgRnVsbGNhbGVuZGFyT2JqZWN0TWFwcGVyKCk7XHJcblx0XHR0aGlzLmluc3RhbmNlID0gbnVsbDtcclxuXHRcdHRoaXMuZGF0ZSA9IG5ldyBEYXRlKCk7XHJcblx0fVxyXG5cclxuXHRjb21wb25lbnREaWRNb3VudCgpe1xyXG5cdFx0dGhpcy5wcm9wcy5vbkZ1bGxDYWxlbmRhclJlbmRlcih0aGlzLmVsKTtcclxuXHRcdGNvbnN0IG9iamVjdE1hcHBlclNldHRpbmdzID0gdGhpcy5mdWxsY2FsZW5kYXJPYmplY3RNYXBwZXIuZ2V0U2V0dGluZ3ModGhpcy5wcm9wcyk7XHJcblx0XHR0aGlzLmluc3RhbmNlID0gdGhpcy5qcSh0aGlzLmVsKS5mdWxsQ2FsZW5kYXIob2JqZWN0TWFwcGVyU2V0dGluZ3MpO1xyXG5cdH1cclxuXHJcbiAgXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyl7XHJcblx0XHQgIFxyXG5cdH1cclxuXHJcblx0cmVuZGVyKCl7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBpZD0nY2FsZW5kYXInIHJlZj17IGVsID0+IHRoaXMuZWwgPSBlbCB9PjwvZGl2PlxyXG5cdFx0KVxyXG5cdH1cclxufSIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL0V2ZW50UG9wb3Zlci5jc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vRXZlbnRQb3BvdmVyLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vRXZlbnRQb3BvdmVyLmNzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAnLi9FdmVudFBvcG92ZXIuY3NzJztcclxuaW1wb3J0IFBvcHBlciBmcm9tICdwb3BwZXIuanMnO1xyXG5pbXBvcnQgUG9wb3ZlclRpdGxlSW5wdXQgZnJvbSAnLi9Qb3BvdmVyVGl0bGVJbnB1dCc7XHJcbmltcG9ydCBQb3BvdmVyVG9vbGJhciBmcm9tICcuL1BvcG92ZXJUb29sYmFyJztcclxuaW1wb3J0IEV2ZW50SGFuZGxlcyBmcm9tICcuLi8uLi9tb2RlbHMvRXZlbnRIYW5kbGVzJztcclxuaW1wb3J0IHsgRm9ybSwgR2x5cGhpY29uIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcclxuaW1wb3J0IERhdGVUaW1lUGlja2VyR3JvdXAgZnJvbSAnLi4vRm9ybS9EYXRlVGltZVBpY2tlckdyb3VwJztcclxuaW1wb3J0IENvbG9yUGlja2VyR3JvdXAgZnJvbSAnLi4vRm9ybS9Db2xvclBpY2tlckdyb3VwJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50UG9wb3ZlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnBvcHBlck5vZGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucG9wcGVySW5zdGFuY2UgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZXZlbnRIYW5kbGVzID0gbmV3IEV2ZW50SGFuZGxlcygpO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgbmV3RXZlbnREYXRhOiB7fVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDnu5Hlrprkuovku7ZcclxuICAgICAgICB0aGlzLmF1dG9IaWRlID0gdGhpcy5hdXRvSGlkZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlRGF0ZVRpbWVDaGFuZ2UgPSB0aGlzLmhhbmRsZURhdGVUaW1lQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVUaXRsZUNoYW5nZSA9IHRoaXMuaGFuZGxlVGl0bGVDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUNvbG9yQ2hhbmdlID0gdGhpcy5oYW5kbGVDb2xvckNoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQnRuQ2xpY2sgPSB0aGlzLmhhbmRsZUJ0bkNsaWNrLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5Yqo55S75pWI5p6cXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICBhdXRvSGlkZShlKSB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAvLyDkuI3mmK/ml6Xljobkuovku7blhYPntKBcclxuICAgICAgICAgICAgISQodGhpcy5wcm9wcy5yZWZlcmVuY2UpLmlzKGUudGFyZ2V0KSAmJlxyXG4gICAgICAgICAgICAvLyDkuZ/kuI3mmK/lrZDlhYPntKBcclxuICAgICAgICAgICAgJCh0aGlzLnByb3BzLnJlZmVyZW5jZSkuaGFzKGUudGFyZ2V0KS5sZW5ndGggPT09IDAgJiZcclxuICAgICAgICAgICAgLy8g5LiN5pivcG9wcGVy5YWD57SgXHJcbiAgICAgICAgICAgICEkKHRoaXMucG9wcGVyTm9kZSkuaXMoZS50YXJnZXQpICYmXHJcbiAgICAgICAgICAgIC8vIOS5n+S4jeaYr+WtkOWFg+e0oFxyXG4gICAgICAgICAgICAkKHRoaXMucG9wcGVyTm9kZSkuaGFzKGUudGFyZ2V0KS5sZW5ndGggPT09IDBcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhpZGUoKSB7XHJcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XHJcbiAgICAgICAgICAgICQodGhhdC5wb3BwZXJOb2RlKS5oaWRlKDAsIG51bGwsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnByb3BzLm9uUG9wb3ZlckhpZGUoKTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzaG93KCkge1xyXG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xyXG4gICAgICAgICAgICAkKHRoYXQucG9wcGVyTm9kZSkuZmFkZUluKDM1MCwgbnVsbCwgcmVzb2x2ZSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyDkuovku7blj6Xmn4RcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIGhhbmRsZVRpdGxlQ2hhbmdlKGUpIHtcclxuICAgICAgICAvL+WCqOWtmOWIsOWwhuaWsOeahOWAvOWCqOWtmG5ld0V2ZW50RGF0YemHjO+8jOW9k+S/neWtmOaXtuajgOe0om5ld0V2ZW50RGF0YeWIl+ihqFxyXG4gICAgICAgIGNvbnN0IG5ld1RpdGxlID0gZS50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShmdW5jdGlvbihwcmV2U3RhdGUsIHByb3BzKSB7XHJcbiAgICAgICAgICAgIC8v5ou36LSd5YmN5LiA5Liq5a+56LGhXHJcbiAgICAgICAgICAgIGNvbnN0IG5ld0V2ZW50RGF0YSA9IE9iamVjdC5jcmVhdGUocHJldlN0YXRlLm5ld0V2ZW50RGF0YSk7XHJcbiAgICAgICAgICAgIG5ld0V2ZW50RGF0YS50aXRsZSA9IG5ld1RpdGxlO1xyXG4gICAgICAgICAgICByZXR1cm4geyBuZXdFdmVudERhdGEgfTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNvbG9yQ2hhbmdlKGNvbG9yVmFsdWUpIHtcclxuICAgICAgICBjb25zdCBuZXdDb2xvciA9IGNvbG9yVmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShmdW5jdGlvbihwcmV2U3RhdGUsIHByb3BzKSB7XHJcbiAgICAgICAgICAgIC8v5ou36LSd5YmN5LiA5Liq5a+56LGhXHJcbiAgICAgICAgICAgIGNvbnN0IG5ld0V2ZW50RGF0YSA9IE9iamVjdC5jcmVhdGUocHJldlN0YXRlLm5ld0V2ZW50RGF0YSk7XHJcbiAgICAgICAgICAgIG5ld0V2ZW50RGF0YS5iYWNrZ3JvdW5kQ29sb3IgPSBuZXdDb2xvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHsgbmV3RXZlbnREYXRhIH07XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVEYXRlVGltZUNoYW5nZShlKSB7XHJcbiAgICAgICAgLy/mmoLml7bkuI3lhYHorrjmm7TmlLlcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVCdG5DbGljayhlKSB7XHJcbiAgICAgICAgY29uc3QgaWQgPSBlLnRhcmdldC5pZDtcclxuICAgICAgICBjb25zdCBidG5UeXBlID0gaWQuc3BsaXQoJy0nKVsyXTtcclxuICAgICAgICBjb25zdCBoYW5kbGVOYW1lID0gYG9uJHtidG5UeXBlfUJ0bkNsaWNrYFxyXG4gICAgICAgIHRoaXMuaGlkZSgpLnRoZW4oIChyZXQpID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoKGhhbmRsZU5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ29uRWRpdEJ0bkNsaWNrJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uRWRpdEJ0bkNsaWNrKHRoaXMucHJvcHMuZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50SGFuZGxlc1toYW5kbGVOYW1lXSh0aGlzLnByb3BzLmV2ZW50LCB0aGlzLnN0YXRlLm5ld0V2ZW50RGF0YSlcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOeUn+WRveWRqOacn1xyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgLy8g5Yid5aeL5YyW57uE5Lu2XHJcbiAgICAgICAgdGhpcy5wb3BwZXJJbnN0YW5jZSA9IG5ldyBQb3BwZXIodGhpcy5wcm9wcy5yZWZlcmVuY2UsIHRoaXMucG9wcGVyTm9kZSwge1xyXG5cdFx0XHRwbGFjZW1lbnQ6ICdhdXRvJyxcclxuXHRcdFx0bW9kaWZpZXJzOiB7XHJcblx0XHRcdFx0YXJyb3c6IHtcclxuXHRcdFx0XHQgIGVsZW1lbnQ6ICcuYXJyb3cnXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0fSk7XHJcbiAgICAgICAgLy8g6K6+572u6Ieq5Yqo6ZqQ6JePXHJcbiAgICAgICAgJChkb2N1bWVudCkub2ZmKCdjbGljaycsIHRoaXMuYXV0b0hpZGUpLm9uKCdjbGljaycsIHRoaXMuYXV0b0hpZGUpO1xyXG4gICAgICAgIC8vIOaYvuekulxyXG4gICAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSwgc25hcHNob3QpIHtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xyXG4gICAgICAgIC8vIOW9k+abtOaWsOWxnuaAp+aXtuaJjeinpuWPkeWKqOeUu+aViOaenFxyXG4gICAgICAgIGlmICggbmV4dFByb3BzICE9IHRoaXMucHJvcHMgKSB7XHJcbiAgICAgICAgICAgIC8vIOiuvue9ruabtOaWsOaXtueahOWKqOeUu1xyXG4gICAgICAgICAgICB0aGlzLmhpZGUoKS50aGVuKCAocmV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL+abtOaWsOWumuS9jVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3BwZXJJbnN0YW5jZS5yZWZlcmVuY2UgPSBuZXh0UHJvcHMucmVmZXJlbmNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3BwZXJJbnN0YW5jZS51cGRhdGUoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5zaG93KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgICQoZG9jdW1lbnQpLm9mZignY2xpY2snLCB0aGlzLmF1dG9IaWRlKVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCBldmVudFN0YXJ0ID0gdGhpcy5wcm9wcy5ldmVudC5zdGFydC5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuICAgICAgICBjb25zdCBjb2xvclZhbHVlID0gdGhpcy5wcm9wcy5ldmVudC5iYWNrZ3JvdW5kQ29sb3I7XHJcbiAgICAgICAgY29uc3QgZW5hYmxlU2F2ZUJ0biA9ICEhdGhpcy5zdGF0ZS5uZXdFdmVudERhdGEudGl0bGUgfHwgISF0aGlzLnN0YXRlLm5ld0V2ZW50RGF0YS5iYWNrZ3JvdW5kQ29sb3I7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0Yy1wb3BvdmVyXCJcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e2Rpc3BsYXk6ICdub25lJ319XHJcbiAgICAgICAgICAgICAgICAgICAgcmVmPXsoZGl2KSA9PiB0aGlzLnBvcHBlck5vZGUgPSBkaXZ9ID5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXJyb3dcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGMtcG9wb3Zlci1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8UG9wb3ZlclRpdGxlSW5wdXQgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleT17dGhpcy5wcm9wcy5ldmVudC5pZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRUaXRsZT17dGhpcy5wcm9wcy5ldmVudC50aXRsZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25UaXRsZUNoYW5nZT17dGhpcy5oYW5kbGVUaXRsZUNoYW5nZX0gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEZvcm09J3RjLXBvcG92ZXItZXZlbnQtZWRpdEZvcm0nIC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGMtcG9wb3Zlci1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm0gaG9yaXpvbnRhbCBpZD0ndGMtcG9wb3Zlci1ldmVudC1lZGl0Rm9ybSc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxEYXRlVGltZVBpY2tlckdyb3VwIGhvcml6b250YWwgcmVhZE9ubHkgaWQgPSAndGMtZWRpdHBvcHBlci1ldmVudGRhdGUnIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9ezxpIGNsYXNzTmFtZT0nZmFyIGZhLWNhbGVuZGFyLWFsdCBmYS1sZycgLz59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17ZXZlbnRTdGFydH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRGF0ZVRpbWVDaGFuZ2U9e3RoaXMuaGFuZGxlRGF0ZVRpbWVDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxDb2xvclBpY2tlckdyb3VwIGhvcml6b250YWwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e3RoaXMucHJvcHMuZXZlbnQuaWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD0ndGMtZWRpdHBvcHBlci1ldmVudGNvbG9yJyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPXs8aSBjbGFzc05hbWU9J2ZhcyBmYS1wYWludC1icnVzaCBmYS1sZycgLz59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Y29sb3JWYWx1ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29sb3JDaGFuZ2U9e3RoaXMuaGFuZGxlQ29sb3JDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9Gb3JtPlxyXG4gICAgICAgICAgICAgICAgICAgIDxQb3BvdmVyVG9vbGJhclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZT17dGhpcy5wcm9wcy5ldmVudC5jb21wbGV0ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlU2F2ZUJ0bj17ZW5hYmxlU2F2ZUJ0bn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25CdG5DbGljaz17dGhpcy5oYW5kbGVCdG5DbGlja31cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9Qb3BvdmVyVGl0bGVJbnB1dC5jc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vUG9wb3ZlclRpdGxlSW5wdXQuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9Qb3BvdmVyVGl0bGVJbnB1dC5jc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgJy4vUG9wb3ZlclRpdGxlSW5wdXQuY3NzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50VGl0bGVJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgLy/liJ3lp4vljJbnirbmgIFcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5wcm9wcy5ldmVudFRpdGxlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2UgPSB0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNoYW5nZShlKSB7XHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogZS50YXJnZXQudmFsdWV9KVxyXG4gICAgICAgIC8v5bCG5LqL5Lu25Lyg6YCS5LiK5Y67XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblRpdGxlQ2hhbmdlKGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInRjLWVkaXRwb3BwZXItZXZlbnR0aXRsZVwiIFxyXG4gICAgICAgICAgICAgICAgaHRtbEZvcj17dGhpcy5wcm9wcy50YXJnZXRGb3JtfVxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdldmVudHRpdGxlJ1xyXG4gICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9XHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgeyBCdXR0b24sIEJ1dHRvbkdyb3VwLCBCdXR0b25Ub29sYmFyLCBTcGxpdEJ1dHRvbiwgRHJvcGRvd25CdXR0b24sIE1lbnVJdGVtIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcG92ZXJUb29sYmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgLy9cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8QnV0dG9uVG9vbGJhcj5cclxuICAgICAgICAgICAgICAgIDxCdXR0b25Hcm91cD5cclxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGlkPSd0Yy1lZGl0cG9wcGVyLVNhdmUnIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQnRuQ2xpY2t9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshdGhpcy5wcm9wcy5lbmFibGVTYXZlQnRufT5cclxuICAgICAgICAgICAgICAgICAgICAgICAg5L+d5a2YXHJcbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBpZD0ndGMtZWRpdHBvcHBlci1Db21wbGV0ZSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5vbkJ0bkNsaWNrfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3BhcnNlSW50KHRoaXMucHJvcHMuY29tcGxldGUpID09IDUgPyAn5oGi5aSNJyA6ICflrozmiJAnfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b24gaWQ9J3RjLWVkaXRwb3BwZXItRWRpdCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5vbkJ0bkNsaWNrfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAg57yW6L6RXHJcbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPFNwbGl0QnV0dG9uIHB1bGxSaWdodCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9J+WIoOmZpCcgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkPSd0Yy1lZGl0cG9wcGVyLURlbGV0ZURhdGEnIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQnRuQ2xpY2t9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8TWVudUl0ZW0gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudEtleT1cIjFcIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPSd0Yy1lZGl0cG9wcGVyLU9wZW5Eb2MnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQnRuQ2xpY2t9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAg5omT5byA5rqQ5paH5qGjXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTWVudUl0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxNZW51SXRlbSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50S2V5PVwiMlwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9J3RjLWVkaXRwb3BwZXItRGVsZXRlRG9jJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5vbkJ0bkNsaWNrfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIOWIoOmZpOa6kOaWh+aho1xyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L01lbnVJdGVtPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvU3BsaXRCdXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L0J1dHRvbkdyb3VwPlxyXG4gICAgICAgICAgICA8L0J1dHRvblRvb2xiYXI+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgRm9ybUdyb3VwLCBDb250cm9sTGFiZWwsIENvbH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1dG9Gb3JtR3JvdXAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCBpc0hvcml6b250YWwgPSB0aGlzLnByb3BzLmhvcml6b250YWw7XHJcbiAgICAgICAgaWYgKGlzSG9yaXpvbnRhbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPEZvcm1Hcm91cCBjb250cm9sSWQ9e3RoaXMucHJvcHMuaWR9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxDb2wgY29tcG9uZW50Q2xhc3M9e0NvbnRyb2xMYWJlbH0gc209ezJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJlbH1cclxuICAgICAgICAgICAgICAgICAgICA8L0NvbD5cclxuICAgICAgICAgICAgICAgICAgICA8Q29sIHNtPXsxMH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG4gICAgICAgICAgICAgICAgICAgIDwvQ29sPlxyXG4gICAgICAgICAgICAgICAgPC9Gb3JtR3JvdXA+XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPEZvcm1Hcm91cCBjb250cm9sSWQ9e3RoaXMucHJvcHMuaWR9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxDb250cm9sTGFiZWw+e3RoaXMucHJvcHMubGFiZWx9PC9Db250cm9sTGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XHJcbiAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCwgQ29udHJvbExhYmVsLCBDb2wsIEZvcm1Db250cm9sIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcclxuY29uc3QgSHVlYmVlID0gcmVxdWlyZSgnaHVlYmVlL2Rpc3QvaHVlYmVlLnBrZ2QnKTsgXHJcbmltcG9ydCAnaHVlYmVlL2Rpc3QvaHVlYmVlLmNzcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xvcklucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLnZhbHVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlID0gdGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDaGFuZ2UoanNFdmVudE9yVmFsdWUpIHtcclxuICAgICAgICBsZXQgY29sb3JWYWx1ZTtcclxuICAgICAgICBpZiAoIHR5cGVvZiBqc0V2ZW50T3JWYWx1ZSA9PSAnb2JqZWN0JyApIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IGpzRXZlbnRPclZhbHVlLnRhcmdldC52YWx1ZX0pO1xyXG4gICAgICAgICAgICBjb2xvclZhbHVlID0ganNFdmVudE9yVmFsdWUudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIHR5cGVvZiBqc0V2ZW50T3JWYWx1ZSA9PSAnc3RyaW5nJyApIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IGpzRXZlbnRPclZhbHVlfSk7XHJcbiAgICAgICAgICAgIGNvbG9yVmFsdWUgPSBqc0V2ZW50T3JWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShjb2xvclZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvL1RPRE86IOagueaNrumlseWSjOW6puiuoeeul+Wtl+S9k+minOiJslxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIC8vIOWIneWni+WMlue7hOS7tlxyXG4gICAgICAgIHRoaXMuaHVlYmVlSW5zdGFuY2UgPSBuZXcgSHVlYmVlKHRoaXMuZWwsIHtcclxuICAgICAgICAgICAgc3RhdGljT3BlbjogZmFsc2UsIC8vIERpc3BsYXlzIG9wZW4gYW5kIHN0YXlzIG9wZW4uIFxyXG4gICAgICAgICAgICBzZXRUZXh0OiB0cnVlLCAvLyBTZXRzIGVsZW1lbnRz4oCZIHRleHQgdG8gY29sb3IuIOWwhuWOn+Wni+eahOaWh+acrOiuvue9ruiuvue9ruaIkOminOiJsuWAvC5cclxuICAgICAgICAgICAgc2V0QkdDb2xvcjogdHJ1ZSwgLy8gU2V0cyBlbGVtZW50c+KAmSBiYWNrZ3JvdW5kIGNvbG9yIHRvIGNvbG9yLlxyXG4gICAgICAgICAgICBodWVzOiAxMiwgLy8gTnVtYmVyIG9mIGh1ZXMgb2YgdGhlIGNvbG9yIGdyaWQuIEh1ZXMgYXJlIHNsaWNlcyBvZiB0aGUgY29sb3Igd2hlZWwuXHJcbiAgICAgICAgICAgIGh1ZTA6IDAsIC8vIFRoZSBmaXJzdCBodWUgb2YgdGhlIGNvbG9yIGdyaWQuIFxyXG4gICAgICAgICAgICBzaGFkZXM6IDUsIC8vIE51bWJlciBvZiBzaGFkZXMgb2YgY29sb3JzIGFuZCBzaGFkZXMgb2YgZ3JheSBiZXR3ZWVuIHdoaXRlIGFuZCBibGFjay4gXHJcbiAgICAgICAgICAgIHNhdHVyYXRpb25zOiAyLCAvLyBOdW1iZXIgb2Ygc2V0cyBvZiBzYXR1cmF0aW9uIG9mIHRoZSBjb2xvciBncmlkLlxyXG4gICAgICAgICAgICBub3RhdGlvbjogJ2hleCcsIC8vIFRleHQgc3ludGF4IG9mIGNvbG9ycyB2YWx1ZXMuXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZTogbnVsbCwgLy8gQ2xhc3MgYWRkZWQgdG8gSHVlYmVlIGVsZW1lbnQuIFVzZWZ1bCBmb3IgQ1NTLlxyXG4gICAgICAgICAgICBjdXN0b21Db2xvcnM6IFsgXHJcbiAgICAgICAgICAgICAgICAnIzMyQ0QzMicsICcjNTQ4NEVEJywgJyNBNEJERkUnLCBcclxuICAgICAgICAgICAgICAgICcjNDZENkRCJywgJyM3QUU3QkYnLCAnIzUxQjc0OScsXHJcbiAgICAgICAgICAgICAgICAnI0ZCRDc1QicsICcjRkZCODc4JywgJyNGRjg4N0MnLCBcclxuICAgICAgICAgICAgICAgICcjREMyMTI3JywgJyNEQkFERkYnLCAnI0UxRTFFMSdcdFxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy/liJ3lp4vljJbpopzoibJcclxuICAgICAgICB0aGlzLmh1ZWJlZUluc3RhbmNlLnNldENvbG9yKHRoaXMucHJvcHMudmFsdWUpO1xyXG4gICAgICAgIC8v55uR5ZCsaHVlYmVl6aKc6Imy6YCJ5oupXHJcbiAgICAgICAgdGhpcy5odWViZWVJbnN0YW5jZS5vbiggJ2NoYW5nZScsIHRoaXMuaGFuZGxlQ2hhbmdlKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcclxuICAgICAgICAvLyDmiYvliqjmm7TmlrB2YWx1ZVxyXG4gICAgICAgIHRoaXMuaHVlYmVlSW5zdGFuY2Uuc2V0Q29sb3IodGhpcy5zdGF0ZS52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgLy/ms6jmhI/vvIxodWViZWXmsqHmnIlkZXN0cm9555qE5pa55rOVXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9J2Zvcm0tY29udHJvbCcgXHJcbiAgICAgICAgICAgICAgICByZWY9e2VsID0+IHRoaXMuZWwgPSBlbH1cclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX0gLy/nm5HlkKzplK7nm5jovpPlhaVcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICApXHJcblxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgRm9ybUdyb3VwLCBDb250cm9sTGFiZWwsIENvbH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcclxuaW1wb3J0IENvbG9ySW5wdXQgZnJvbSAnLi9Db2xvcklucHV0JztcclxuaW1wb3J0IEF1dG9Gb3JtR3JvdXAgZnJvbSAnLi9BdXRvRm9ybUdyb3VwJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbG9yUGlja2VyR3JvdXAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2UgPSB0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNoYW5nZShjb2xvclZhbHVlKSB7XHJcbiAgICAgICAgLy/lkJHkuIrkvKDpgJJcclxuICAgICAgICB0aGlzLnByb3BzLm9uQ29sb3JDaGFuZ2UoY29sb3JWYWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxBdXRvRm9ybUdyb3VwIHsuLi50aGlzLnByb3BzfT5cclxuICAgICAgICAgICAgICAgIDxDb2xvcklucHV0IFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLnZhbHVlfSAvL2hleOiJsuW9qeWAvFxyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXt0aGlzLnByb3BzLnJlYWRPbmx5fVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvQXV0b0Zvcm1Hcm91cD4gICAgICAgICAgICBcclxuICAgICAgICApXHJcblxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgRm9ybUdyb3VwLCBDb250cm9sTGFiZWwsIENvbCwgRm9ybUNvbnRyb2wgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5pbXBvcnQgJ21vbWVudCc7XHJcbmltcG9ydCAnYm9vdHN0cmFwL2pzL2NvbGxhcHNlJztcclxuaW1wb3J0ICdib290c3RyYXAvanMvdHJhbnNpdGlvbic7XHJcbmltcG9ydCAnZW9uYXNkYW4tYm9vdHN0cmFwLWRhdGV0aW1lcGlja2VyJztcclxuaW1wb3J0ICdlb25hc2Rhbi1ib290c3RyYXAtZGF0ZXRpbWVwaWNrZXIvYnVpbGQvY3NzL2Jvb3RzdHJhcC1kYXRldGltZXBpY2tlci5jc3MnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0ZVRpbWVJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5wcm9wcy52YWx1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZSA9IHRoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQ2hhbmdlKGUpIHtcclxuICAgICAgICBjb25zdCBkYXRlVmFsdWUgPSBlLmRhdGUuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJylcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogZGF0ZVZhbHVlfSk7XHJcbiAgICAgICAgLy8g5Lyg6YCSXHJcbiAgICAgICAgdGhpcy5wcm9wcy5vbkRhdGVUaW1lQ2hhbmdlKGRhdGVWYWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgLy8g5Yid5aeL5YyW57uE5Lu2XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucmVhZE9ubHkpIHRoaXMuZWwucmVhZE9ubHkgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuJGVsID0gJCh0aGlzLmVsKS5kYXRldGltZXBpY2tlcih7XHJcbiAgICAgICAgICAgIHNob3dUb2RheUJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgbG9jYWxlOiAnemgtY24nLFxyXG4gICAgICAgICAgICBmb3JtYXQ6ICdZWVlZLU1NLUREIEhIOm1tOnNzJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuJGVsLm9uKFwiZHAuY2hhbmdlXCIsIHRoaXMuaGFuZGxlQ2hhbmdlKVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZSA9IHRoaXMuJGVsLmRhdGEoXCJEYXRlVGltZVBpY2tlclwiKTtcclxuICAgICAgICAvLyDliJ3lp4vljJblgLxcclxuICAgICAgICB0aGlzLmluc3RhbmNlLmRhdGUodGhpcy5wcm9wcy52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xyXG4gICAgICAgIC8vIOaJi+WKqOabtOaWsHZhbHVlXHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5kYXRlKHRoaXMuc3RhdGUudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIC8vIGRlc3Ryb3lcclxuICAgICAgICB0aGlzLmluc3RhbmNlLmRlc3Ryb3koKTtcclxuICAgICAgICB0aGlzLiRlbC5vZmYoXCJkcC5jaGFuZ2VcIiwgdGhpcy5oYW5kbGVDaGFuZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnIFxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdmb3JtLWNvbnRyb2wnIFxyXG4gICAgICAgICAgICAgICAgcmVmPXtlbCA9PiB0aGlzLmVsID0gZWx9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKVxyXG5cclxuICAgIH1cclxufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIENvbnRyb2xMYWJlbCwgQ29sLCBGb3JtQ29udHJvbCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcbmltcG9ydCBBdXRvRm9ybUdyb3VwIGZyb20gJy4vQXV0b0Zvcm1Hcm91cCc7XHJcbmltcG9ydCBEYXRlVGltZUlucHV0IGZyb20gJy4vRGF0ZVRpbWVJbnB1dCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRlVGltZVBpY2tlckdyb3VwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIC8vIOWIneWni+WMlue7hOS7tlxyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLmlucHV0Rm9ybUNvbnRyb2wpO1xyXG4gICAgICAgICQodGhpcy5pbnB1dCkuZGF0ZXRpbWVwaWNrZXIoe1xyXG4gICAgICAgICAgICBmb3JtYXQ6ICdZWVlZLU1NLUREIEhIOm1tOnNzJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8QXV0b0Zvcm1Hcm91cCB7Li4udGhpcy5wcm9wc30+XHJcbiAgICAgICAgICAgICAgICA8RGF0ZVRpbWVJbnB1dCB7Li4udGhpcy5wcm9wc30gLz5cclxuICAgICAgICAgICAgPC9BdXRvRm9ybUdyb3VwPiAgICAgICAgICAgIFxyXG4gICAgICAgIClcclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBSb3csIENvbCwgRm9ybSwgRm9ybUdyb3VwLCBDb250cm9sTGFiZWwgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5pbXBvcnQgVGl0bGVJbnB1dEdyb3VwIGZyb20gJy4vVGl0bGVJbnB1dEdyb3VwJztcclxuaW1wb3J0IERhdGVUaW1lUGlja2VyR3JvdXAgZnJvbSAnLi9EYXRlVGltZVBpY2tlckdyb3VwJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnREZXRhaWxGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5wcm9wcy50aXRsZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2UgPSB0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNoYW5nZShlKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8Rm9ybT5cclxuICAgICAgICAgICAgICAgIDxUaXRsZUlucHV0R3JvdXAgaWQ9XCJ0Yy1lZGl0cGFnZS1ldmVudHRpdGxlXCIvPlxyXG4gICAgICAgICAgICAgICAgPFJvdz5cclxuICAgICAgICAgICAgICAgICAgICA8Q29sIHNtPXs2fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPERhdGVUaW1lUGlja2VyR3JvdXAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIuW8gOWni+aXpeacn1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT1cIjIwMTgtMDctMTcgMDk6MDA6MDBcIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRGF0ZVRpbWVDaGFuZ2U9eygpID0+IHt9fSAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L0NvbD5cclxuICAgICAgICAgICAgICAgICAgICA8Q29sIHNtPXs2fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPERhdGVUaW1lUGlja2VyR3JvdXAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIue7k+adn+aXpeacn1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT1cIjIwMTgtMDctMTcgMDk6MDA6MDBcIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRGF0ZVRpbWVDaGFuZ2U9eygpID0+IHt9fSAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L0NvbD5cclxuICAgICAgICAgICAgICAgIDwvUm93PlxyXG4gICAgICAgICAgICA8L0Zvcm0+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcclxuaW1wb3J0IEF1dG9Gb3JtR3JvdXAgZnJvbSAnLi9BdXRvRm9ybUdyb3VwJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpdGxlSW5wdXRHcm91cCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMucHJvcHMudGl0bGVcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlID0gdGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDaGFuZ2UoZSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEF1dG9Gb3JtR3JvdXAgbGFiZWw9XCLmoIfpophcIiB7Li4udGhpcy5wcm9wc30+XHJcbiAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xcclxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9XHJcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCLor7fovpPlhaXmoIfpophcIlxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvQXV0b0Zvcm1Hcm91cD5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgTW9kYWwsIE5hdiwgTmF2SXRlbSwgVGFicywgVGFiLCBCdXR0b24sIFJvdywgQ29sLCBDbG9zZUJ1dHRvbiB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcbmltcG9ydCBFdmVudERldGFpbEZyb20gZnJvbSAnLi4vRm9ybS9FdmVudERldGFpbEZvcm0nXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudE1vZGFsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPE1vZGFsIHNob3c9e3RoaXMucHJvcHMuc2hvd30gb25IaWRlPXt0aGlzLnByb3BzLm9uTW9kYWxDbG9zZX0+XHJcbiAgICAgICAgICAgICAgICA8VGFiLkNvbnRhaW5lciBpZD1cInRhYnMtd2l0aC1kcm9wZG93blwiIGRlZmF1bHRBY3RpdmVLZXk9XCIxXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPFJvdyBjbGFzc05hbWU9XCJjbGVhcmZpeFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q29sIHNtPXsxMn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TW9kYWwuSGVhZGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tib3JkZXJCb3R0b206ICdub25lJywgcGFkZGluZzogJzAnfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPE5hdiBic1N0eWxlPVwidGFic1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7cGFkZGluZzogJzE1cHggMTVweCAwIDE1cHgnfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDbG9zZUJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5vbk1vZGFsQ2xvc2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxOYXZJdGVtIGV2ZW50S2V5PVwiMVwiIGhyZWY9XCIjdGMtcmVwZWF0Zm9ybVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg5pel56iL57yW6L6RXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmF2SXRlbT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPE5hdkl0ZW0gZXZlbnRLZXk9XCIyXCIgaHJlZj1cIiN0Yy1yZXBlYXRmb3JtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDph43lpI3op4TliJlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYXZJdGVtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmF2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Nb2RhbC5IZWFkZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TW9kYWwuQm9keT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGFiLkNvbnRlbnQgYW5pbWF0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGFiLlBhbmUgZXZlbnRLZXk9XCIxXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RXZlbnREZXRhaWxGcm9tIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVGFiLlBhbmU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUYWIuUGFuZSBldmVudEtleT1cIjJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFlbmVhbiBsYWNpbmlhIGJpYmVuZHVtIG51bGxhIHNlZCBjb25zZWN0ZXR1ci4gUHJhZXNlbnQgY29tbW9kb1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc3VzIG1hZ25hLCB2ZWwgc2NlbGVyaXNxdWUgbmlzbCBjb25zZWN0ZXR1ciBldC4gRG9uZWMgc2VkIG9kaW9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1aS4gRG9uZWMgdWxsYW1jb3JwZXIgbnVsbGEgbm9uIG1ldHVzIGF1Y3RvciBmcmluZ2lsbGEuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVGFiLlBhbmU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9UYWIuQ29udGVudD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTW9kYWwuQm9keT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9Db2w+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9Sb3c+XHJcbiAgICAgICAgICAgICAgICA8L1RhYi5Db250YWluZXI+XHJcbiAgICAgICAgICAgICAgICA8TW9kYWwuRm9vdGVyPlxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b24gPui/meaYr+S4gOS4quaMiemSrjwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9Nb2RhbC5Gb290ZXI+XHJcbiAgICAgICAgICAgIDwvTW9kYWw+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vaW5kZXguY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL2luZGV4LmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vaW5kZXguY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCAnZnVsbGNhbGVuZGFyLXJlYWN0d3JhcHBlci9kaXN0L2Nzcy9mdWxsY2FsZW5kYXIubWluLmNzcydcclxuaW1wb3J0ICdib290c3RyYXAvZGlzdC9jc3MvYm9vdHN0cmFwLmNzcyc7XHJcbmltcG9ydCAnYm9vdHN0cmFwL2Rpc3QvY3NzL2Jvb3RzdHJhcC10aGVtZS5jc3MnO1xyXG5pbXBvcnQgJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1mcmVlL2Nzcy9hbGwuY3NzJ1xyXG5pbXBvcnQgQXBwIGZyb20gJy4vQXBwJztcclxuaW1wb3J0ICcuL2luZGV4LmNzcyc7XHJcblxyXG5SZWFjdERPTS5yZW5kZXIoPEFwcCAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSk7XHJcblxyXG4vKlxyXG4kKGZ1bmN0aW9uKCl7XHJcbiAgICAvLyDlrprkuYnlj5jph49cclxuXHRjb25zdCBkYXRhTG9hZGVyID0gbmV3IFdpekV2ZW50RGF0YUxvYWRlcigpO1xyXG5cdGxldCBnX2VkaXRQb3BwZXIsIGdfY3JlYXRlTW9kYWwsIGdfZWRpdE1vZGFsO1xyXG5cclxuICAgIGNvbnN0IGNhbGVuZGFyID0gJCgnI2NhbGVuZGFyJykuZnVsbENhbGVuZGFyKHtcclxuXHRcdHRoZW1lU3lzdGVtOiAnc3RhbmRhcmQnLFxyXG5cdFx0aGVpZ2h0OiAncGFyZW50JyxcclxuXHRcdGhlYWRlcjoge1xyXG5cdFx0XHRsZWZ0OiAncHJldixuZXh0LHRvZGF5JyxcclxuXHRcdFx0Y2VudGVyOiAndGl0bGUnLFxyXG5cdFx0XHRyaWdodDogJ21vbnRoLGFnZW5kYVdlZWssYWdlbmRhRGF5LGxpc3RXZWVrJ1xyXG5cdFx0fSxcclxuXHRcdHZpZXdzOiB7XHJcblx0XHRcdG1vbnRoOiB7XHJcblx0XHRcdFx0Ly90aXRsZUZvcm1hdDogZ19sb2NfdGl0bGVmb3JtYXRfbW9udGgsIC8vdmFyIGdfbG9jX3RpdGxlZm9ybWF0X21vbnRoID0gXCJNTU1NIHl5eXlcIjtcclxuXHRcdFx0fSxcclxuXHRcdFx0YWdlbmRhOiB7XHJcblx0XHRcdFx0bWluVGltZTogXCIwODowMDowMFwiLFxyXG5cdFx0XHRcdHNsb3RMYWJlbEZvcm1hdDogJ2goOm1tKSBhJ1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRsaXN0V2Vlazoge1xyXG5cclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdG5hdkxpbmtzOiB0cnVlLFxyXG5cdFx0YWxsRGF5RGVmYXVsdDogZmFsc2UsXHJcblx0XHRkZWZhdWx0VmlldzogJ2FnZW5kYVdlZWsnLFxyXG5cdFx0ZXZlbnRMaW1pdDogdHJ1ZSxcclxuXHRcdGJ1dHRvblRleHQ6IHtcclxuXHRcdFx0dG9kYXk6ICfku4rlpKknLFxyXG5cdFx0XHRtb250aDogJ+aciCcsXHJcblx0XHRcdHdlZWs6ICflkagnLFxyXG5cdFx0XHRkYXk6ICfml6UnLFxyXG5cdFx0XHRsaXN0OiAn6KGoJ1xyXG4gICAgICAgIH0sXHJcblx0XHRtb250aE5hbWVzOiBbXHJcbiAgICAgICAgICAgICcx5pyIJywgJzLmnIgnLCAnM+aciCcsICc05pyIJywgXHJcbiAgICAgICAgICAgICc15pyIJywgJzbmnIgnLCAnN+aciCcsICc45pyIJywgXHJcbiAgICAgICAgICAgICc55pyIJywgJzEw5pyIJywgJzEx5pyIJywgJzEy5pyIJ1xyXG4gICAgICAgIF0sXHJcblx0XHRtb250aE5hbWVzU2hvcnQ6IFtcclxuICAgICAgICAgICAgJzHmnIgnLCAnMuaciCcsICcz5pyIJywgJzTmnIgnLCBcclxuICAgICAgICAgICAgJzXmnIgnLCAnNuaciCcsICc35pyIJywgJzjmnIgnLCBcclxuICAgICAgICAgICAgJznmnIgnLCAnMTDmnIgnLCAnMTHmnIgnLCAnMTLmnIgnXHJcbiAgICAgICAgXSxcclxuXHRcdGRheU5hbWVzOiBbXHJcbiAgICAgICAgICAgICflkajml6UnLCAn5ZGo5LiAJywgJ+WRqOS6jCcsICflkajkuIknLCAn5ZGo5ZubJywgJ+WRqOS6lCcsICflkajlha0nXHJcbiAgICAgICAgXSxcclxuXHRcdGRheU5hbWVzU2hvcnQ6IFtcclxuICAgICAgICAgICAgJ+WRqOaXpScsICflkajkuIAnLCAn5ZGo5LqMJywgJ+WRqOS4iScsICflkajlm5snLCAn5ZGo5LqUJywgJ+WRqOWFrSdcclxuICAgICAgICBdLFxyXG5cdFx0c2VsZWN0YWJsZTogdHJ1ZSxcclxuXHRcdHNlbGVjdEhlbHBlcjogdHJ1ZSxcclxuXHRcdHVuc2VsZWN0Q2FuY2VsOiAnLm1vZGFsIConLFxyXG5cdFx0YWxsRGF5VGV4dDogJ+WFqOWkqScsXHJcblx0XHRub3dJbmRpY2F0b3I6IHRydWUsXHJcblx0XHRmb3JjZUV2ZW50RHVyYXRpb246IHRydWUsXHJcblx0XHRmaXJzdERheTogMSwgLy8g56ys5LiA5aSp5piv5ZGo5LiA6L+Y5piv5ZGo5aSp77yM5LiOZGF0ZXBpY2tlcuW/hemhu+ebuOWQjFxyXG5cdFx0ZHJhZ09wYWNpdHk6IHtcclxuXHRcdFx0XCJtb250aFwiOiAuNSxcclxuXHRcdFx0XCJhZ2VuZGFXZWVrXCI6IDEsXHJcblx0XHRcdFwiYWdlbmRhRGF5XCI6IDFcclxuXHRcdH0sXHJcblx0XHRlZGl0YWJsZTogdHJ1ZSxcclxuXHJcblx0XHQvLyDliLfmlrDop4blm77vvIzph43mlrDojrflj5bml6Xljobkuovku7ZcclxuXHRcdHZpZXdSZW5kZXI6IGZ1bmN0aW9uKCB2aWV3LCBlbGVtZW50ICkge1xyXG5cdFx0XHQvL1RPRE86IOaEn+iniei/meagt+mAoOaIkOaAp+iDveS4iueahOaNn+Wkse+8jOaYr+WQpuacieabtOWlveeahOaWueazle+8n1xyXG5cdFx0XHRjb25zdCBjYWxlbmRhciA9ICQoJyNjYWxlbmRhcicpO1xyXG5cdFx0XHRjb25zdCBldmVudFNvdXJjZXMgPSBkYXRhTG9hZGVyLmdldEV2ZW50U291cmNlcyggdmlldywgZWxlbWVudCApO1xyXG5cdFx0XHRjYWxlbmRhci5mdWxsQ2FsZW5kYXIoJ3JlbW92ZUV2ZW50cycpO1xyXG5cdFx0XHRmb3IgKGxldCBpPTAgOyBpIDwgZXZlbnRTb3VyY2VzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0Y2FsZW5kYXIuZnVsbENhbGVuZGFyKCdhZGRFdmVudFNvdXJjZScsIGV2ZW50U291cmNlc1tpXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHR9LFxyXG5cclxuXHRcdC8vIOmAieaLqeWKqOS9nOinpuWPkeeahOS6i+S7tuWPpeafhO+8jOWumuS5ieS6huS4gOS4qmNhbGxiYWNrXHJcblx0XHRzZWxlY3Q6IGZ1bmN0aW9uKHN0YXJ0LCBlbmQsIGpzRXZlbnQsIHZpZXcpe1xyXG5cdFx0XHQvLyDlvLnlh7rigJzliJvlu7rml6Xljobkuovku7bigJ3nqpflj6NcclxuXHRcdFx0Ly8g5Yik5pat5piv5ZCm5riy5p+TXHJcblx0XHRcdC8vVE9ETzog5oOz5Yqe5rOV5LiN6KaB55So5YWo5bGA5Y+Y6YePXHJcblx0XHRcdGlmICggIXdpbmRvdy5nX2NyZWF0ZU1vZGFsICkgbmV3IEV2ZW50Q3JlYXRlTW9kYWwoe3N0YXJ0LCBlbmQsIGpzRXZlbnQsIHZpZXd9KTtcclxuXHRcdFx0Ly8g5Lyg6YCS5Y+C5pWwXHJcblx0XHRcdHdpbmRvdy5nX2NyZWF0ZU1vZGFsLnVwZGF0ZSh7c3RhcnQsIGVuZCwganNFdmVudCwgdmlld30pO1xyXG5cdFx0XHR3aW5kb3cuZ19jcmVhdGVNb2RhbC5zaG93KCk7XHJcblx0XHR9LFxyXG5cclxuXHRcdGV2ZW50RHJhZ1N0YXJ0OiBmdW5jdGlvbiggZXZlbnQsIGpzRXZlbnQsIHVpLCB2aWV3ICkgeyB9LFxyXG5cdFx0ZXZlbnREcmFnU3RvcDogZnVuY3Rpb24oIGV2ZW50LCBqc0V2ZW50LCB1aSwgdmlldyApIHsgfSxcclxuXHJcblx0XHQvLyDml6Xljobkuovku7bmi5bliqggZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlld1xyXG5cdFx0ZXZlbnREcm9wOiBmdW5jdGlvbihldmVudCwgZGVsdGEsIHJldmVydEZ1bmMsIGpzRXZlbnQsIHVpLCB2aWV3KXtcclxuXHRcdFx0aWYgKGV2ZW50LmlkKXtcclxuXHRcdFx0XHRkYXRhTG9hZGVyLnVwZGF0ZUV2ZW50RGF0YU9uRHJvcChldmVudCwgZGVsdGEsIHJldmVydEZ1bmMsIGpzRXZlbnQsIHVpLCB2aWV3KVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldmVydEZ1bmMoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHJcblx0XHQvLyDml6Xljobkuovku7bml6XmnJ/ojIPlm7Tph43nva5cclxuXHRcdGV2ZW50UmVzaXplOiBmdW5jdGlvbihldmVudCwgZGVsdGEsIHJldmVydEZ1bmMsIGpzRXZlbnQsIHVpLCB2aWV3KXtcclxuXHRcdFx0aWYgKGV2ZW50LmlkKXtcclxuXHRcdFx0XHRkYXRhTG9hZGVyLnVwZGF0ZUV2ZW50RGF0YU9uUmVzaXplKGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXcpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldmVydEZ1bmMoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHJcblx0XHRldmVudFJlbmRlcjogZnVuY3Rpb24oZXZlbnRPYmosICRlbCkge1xyXG5cdFx0XHQvLyDlhYPntKDlt7Lnu4/muLLmn5PvvIzlj6/kv67mlLnlhYPntKBcclxuXHRcdFx0Y29uc3QgaXNDb21wbGV0ZSA9IHBhcnNlSW50KGV2ZW50T2JqLmNvbXBsZXRlKSA9PSA1O1xyXG5cdFx0XHRpZiAoIGlzQ29tcGxldGUgKSB7XHJcblx0XHRcdFx0Ly8g5qC35byPXHJcblx0XHRcdFx0JGVsLmFkZENsYXNzKCd0Yy1jb21wbGV0ZScpO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0fSxcclxuXHJcblx0XHQvLyDml6Xljobkuovku7bngrnlh7vlkI7kuovku7blj6Xmn4RcclxuXHRcdGV2ZW50Q2xpY2s6IGZ1bmN0aW9uKCBldmVudCwganNFdmVudCwgdmlldyApIHtcclxuXHRcdFx0Ly8gdGhpcyDmjIflkJHljIXoo7nkuovku7bnmoQ8YT7lhYPntKBcclxuXHJcblx0XHRcdC8vIOWIpOaWreaYr+WQpuW3sue7j+a4suafk+W8ueeql1xyXG5cdFx0XHRpZiAoICFnX2VkaXRQb3BwZXIgKSB7XHJcblx0XHRcdFx0Z19lZGl0UG9wcGVyID0gcmVuZGVyRWRpdFBvcHBlcih7XHJcblx0XHRcdFx0XHQnZXZlbnQnOiBldmVudCxcclxuXHRcdFx0XHRcdCdqc0V2ZW50JzoganNFdmVudCxcclxuXHRcdFx0XHRcdCd2aWV3Jzogdmlld1xyXG5cdFx0XHRcdH0sIHRoaXMpLkV2ZW50UG9wb3Zlcignc2hvdycpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdC8vIOabtOaWsHJlZmVyZW5jZVxyXG5cdFx0XHRcdGdfZWRpdFBvcHBlci5FdmVudFBvcG92ZXIoJ29wdGlvbicsIHtcclxuXHRcdFx0XHRcdGFyZ3M6IHtcclxuXHRcdFx0XHRcdFx0J2V2ZW50JzogZXZlbnQsXHJcblx0XHRcdFx0XHRcdCdqc0V2ZW50JzoganNFdmVudCxcclxuXHRcdFx0XHRcdFx0J3ZpZXcnOiB2aWV3XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0dGl0bGU6IGV2ZW50LnRpdGxlLFxyXG5cdFx0XHRcdFx0cmVmZXJlbmNlOiB0aGlzXHJcblx0XHRcdFx0fSkuRXZlbnRQb3BvdmVyKCd1cGRhdGUnKS5FdmVudFBvcG92ZXIoJ3Nob3cnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHRcdFxyXG5cdH0pXHJcbn0pXHJcbiovIiwiaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5pbXBvcnQgJ2Z1bGxjYWxlbmRhcic7XHJcbmltcG9ydCB7IFdpekRhdGFiYXNlIGFzIGdfZGIsIFdpekNvbW1vblVJIGFzIGdfY21ufSBmcm9tICcuLi91dGlscy9XaXpJbnRlcmZhY2UnO1xyXG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uL3V0aWxzL0NvbmZpZyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYWxlbmRhckV2ZW50IHtcclxuXHQvKipcclxuICAgICAqIOWIm+W7uuS4gOS4qumAmueUqOaXpeeoiy5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gZGF0YSDljp/lp4vmlbDmja7nsbvlnovvvIzlj6/ku6XmmK8gV2l6RXZlbnQsIEZ1bGxDYWxlbmRhckV2ZW50IOS7peWPiiBHVUlELlxyXG4gICAgICovXHJcblx0Y29uc3RydWN0b3IoIGRhdGEsIGNhbGVuZGFyICkge1xyXG5cdFx0aWYgKCFnX2RiKSB0aHJvdyBuZXcgRXJyb3IoJ0lXaXpEYXRhYmFzZSBpcyBub3QgdmFsaWQuJyk7XHJcblx0XHR0aGlzLiRjYWxlbmRhciA9IGNhbGVuZGFyID8gJChjYWxlbmRhcikgOiAkKCcjY2FsZW5kYXInKTtcclxuXHRcdGNvbnN0IHR5cGUgPSB0aGlzLl9jaGVja0RhdGFUeXBlKGRhdGEpO1xyXG5cdFx0c3dpdGNoICggdHlwZSApIHtcclxuXHRcdFx0Y2FzZSBcIldpekV2ZW50XCI6XHJcblx0XHRcdGNhc2UgXCJGdWxsQ2FsZW5kYXJFdmVudFwiOlxyXG5cdFx0XHRcdHRoaXMuX2NyZWF0ZShkYXRhLCB0eXBlKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBcIkdVSURcIjpcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0Ly9UT0RPOiDojrflvpdXaXpFdmVudOaVsOaNru+8jOW5tuWIm+W7uuWvueixoVxyXG5cdFx0XHRcdFx0Y29uc3QgZG9jID0gZ19kYi5Eb2N1bWVudEZyb21HVUlEKGRhdGEpO1xyXG5cdFx0XHRcdFx0Y29uc3QgbmV3RXZlbnREYXRhID0ge1xyXG5cdFx0XHRcdFx0XHRcIkNBTEVOREFSX0VORFwiIDogZG9jLkdldFBhcmFtVmFsdWUoJ0NBTEVOREFSX0VORCcpLFxyXG5cdFx0XHRcdFx0XHRcIkNBTEVOREFSX0lORk9cIiA6IGRvYy5HZXRQYXJhbVZhbHVlKCdDQUxFTkRBUl9JTkZPJyksXHJcblx0XHRcdFx0XHRcdFwiQ0FMRU5EQVJfRVhUUkFJTkZPXCIgOiBkb2MuR2V0UGFyYW1WYWx1ZSgnQ0FMRU5EQVJfRVhUUkFJTkZPJyksXHJcblx0XHRcdFx0XHRcdFwiQ0FMRU5EQVJfU1RBUlRcIiA6IGRvYy5HZXRQYXJhbVZhbHVlKCdDQUxFTkRBUl9TVEFSVCcpLFxyXG5cdFx0XHRcdFx0XHRcIkNBTEVOREFSX1JFQ1VSUkVOQ0VcIiA6IGRvYy5HZXRQYXJhbVZhbHVlKCdDQUxFTkRBUl9SRUNVUlJFTkNFJyksXHJcblx0XHRcdFx0XHRcdFwiQ0FMRU5EQVJfRU5EUkVDVVJSRU5DRVwiIDogZG9jLkdldFBhcmFtVmFsdWUoJ0NBTEVOREFSX0VORFJFQ1VSUkVOQ0UnKSxcclxuXHRcdFx0XHRcdFx0XCJjcmVhdGVkXCIgOiBtb21lbnQoZG9jLkRhdGVDcmVhdGVkKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKSxcclxuXHRcdFx0XHRcdFx0XCJndWlkXCIgOiBkb2MuR1VJRCxcclxuXHRcdFx0XHRcdFx0XCJ0aXRsZVwiIDogZG9jLlRpdGxlLFxyXG5cdFx0XHRcdFx0XHRcInVwZGF0ZWRcIiA6IG1vbWVudChkb2MuRGF0ZU1vZGlmaWVkKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0dGhpcy5fY3JlYXRlKG5ld0V2ZW50RGF0YSwgJ1dpekV2ZW50Jyk7XHJcblx0XHRcdFx0fSBjYXRjaCAoZSkgeyBjb25zb2xlLmVycm9yKGUpOyB9XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0X2NyZWF0ZShkYXRhLCB0eXBlKSB7XHJcblx0XHRsZXQgc3RhcnQsIGVuZCwgaWQsIGJrQ29sb3IsIGFsbERheSwgY29tcGxldGUsIGRhdGVDb21wbGV0ZWQsIHJwdFJ1bGUsIHJwdEVuZDtcclxuXHRcdHN3aXRjaCAodHlwZSkge1xyXG5cdFx0XHRjYXNlIFwiR1VJRFwiOlxyXG5cdFx0XHRjYXNlIFwiV2l6RXZlbnRcIjpcclxuXHRcdFx0XHR0aGlzLl9JbmZvID0gdGhpcy5fcGFyc2VJbmZvKGRhdGEuQ0FMRU5EQVJfSU5GTyk7XHJcblx0XHRcdFx0dGhpcy5fRXh0cmFJbmZvID0gZGF0YS5DQUxFTkRBUl9FWFRSQUlORk8gPyB0aGlzLl9wYXJzZUluZm8oZGF0YS5DQUxFTkRBUl9FWFRSQUlORk8pIDogdGhpcy5fZ2V0RGVmYXVsdEV4dHJhSW5mbygpO1xyXG5cdFx0XHRcdC8vIOe7n+S4gOWPmOmHj1xyXG5cdFx0XHRcdGlkID0gZGF0YS5ndWlkO1xyXG5cdFx0XHRcdHN0YXJ0ID0gZGF0YS5DQUxFTkRBUl9TVEFSVDtcclxuXHRcdFx0XHRlbmQgPSBkYXRhLkNBTEVOREFSX0VORDtcclxuXHRcdFx0XHQvLyDliKTmlq3mmK/lkKbnlKjmiLfoh6rlrprkuYnog4zmma/oibLvvIzlkJHkuIvlhbzlrrnljp/niYjml6XljoZcclxuXHRcdFx0XHRia0NvbG9yID0gdGhpcy5fSW5mby5jaSA/ICggcGFyc2VJbnQodGhpcy5fSW5mby5jaSkgPT0gMCA/IHRoaXMuX0luZm8uYiA6IENvbmZpZy5jb2xvckl0ZW1zW3RoaXMuX0luZm8uY2ldLmNvbG9yVmFsdWUgKSA6IHRoaXMuX0luZm8uYjtcclxuXHRcdFx0XHRhbGxEYXkgPSBkYXRhLkNBTEVOREFSX0VORC5pbmRleE9mKFwiMjM6NTk6NTlcIikgIT0gLTEgPyB0cnVlIDogZmFsc2U7XHJcblx0XHRcdFx0Y29tcGxldGUgPSB0aGlzLl9FeHRyYUluZm8uQ29tcGxldGU7XHJcblx0XHRcdFx0ZGF0ZUNvbXBsZXRlZCA9IHRoaXMuX0V4dHJhSW5mby5EYXRlQ29tcGxldGVkO1xyXG5cdFx0XHRcdC8vIOmHjeWkjeS6i+S7tlxyXG5cdFx0XHRcdHJwdFJ1bGUgPSBkYXRhLkNBTEVOREFSX1JFQ1VSUkVOQ0U7XHJcblx0XHRcdFx0cnB0RW5kID0gZGF0YS5DQUxFTkRBUl9FTkRSRUNVUlJFTkNFO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIFwiRnVsbENhbGVuZGFyRXZlbnRcIjpcclxuXHRcdFx0XHRpZCA9IGRhdGEuaWQ7XHJcblx0XHRcdFx0c3RhcnQgPSBkYXRhLnN0YXJ0O1xyXG5cdFx0XHRcdGVuZCA9IGRhdGEuZW5kO1xyXG5cdFx0XHRcdGJrQ29sb3IgPSBkYXRhLmJhY2tncm91bmRDb2xvcjtcclxuXHRcdFx0XHRhbGxEYXkgPSBkYXRhLmFsbERheSA/IGRhdGEuYWxsRGF5IDogISQuZnVsbENhbGVuZGFyLm1vbWVudChkYXRhLnN0YXJ0KS5oYXNUaW1lKCk7XHJcblx0XHRcdFx0Y29tcGxldGUgPSBkYXRhLmNvbXBsZXRlIHx8IDA7XHJcblx0XHRcdFx0ZGF0ZUNvbXBsZXRlZCA9IGRhdGEuZGF0ZUNvbXBsZXRlZCB8fCAnJztcclxuXHRcdFx0XHRycHRSdWxlID0gZGF0YS5ycHRSdWxlO1xyXG5cdFx0XHRcdHJwdEVuZCA9IGRhdGEucnB0RW5kXHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGlkZW50aWZ5IGRhdGEgdHlwZS4nKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHRcdC8vIOWfuuacrOS/oeaBr1xyXG5cdFx0dGhpcy5pZCA9IGlkO1xyXG5cdFx0dGhpcy50aXRsZSA9IGRhdGEudGl0bGU7XHJcblx0XHQvLyDml7bpl7Tkv6Hmga9cclxuXHRcdHRoaXMuYWxsRGF5ID0gYWxsRGF5O1xyXG5cdFx0Ly8g5rOo5oSP77yBc3RhcnQvZW5kIOWPr+iDveaYr21vbWVudOWvueixoeaIluiAhXN0cu+8jOaJgOS7peS4gOW+i+WFiOi9rOaNouaIkG1vbWVudOWGjeagvOW8j+WMlui+k+WHulxyXG5cdFx0dGhpcy5zdGFydCA9IGFsbERheSA/IG1vbWVudChzdGFydCkuZm9ybWF0KFwiWVlZWS1NTS1ERFwiKSA6IG1vbWVudChzdGFydCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHR0aGlzLmVuZCA9IGFsbERheSA/IG1vbWVudChlbmQpLmZvcm1hdChcIllZWVktTU0tRERcIikgOiBtb21lbnQoZW5kKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdHRoaXMuY3JlYXRlZCA9IGRhdGEuY3JlYXRlZCA/IGRhdGEuY3JlYXRlZCA6IG1vbWVudChzdGFydCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHR0aGlzLnVwZGF0ZWQgPSBkYXRhLnVwZGF0ZWQgPyBkYXRhLnVwZGF0ZWQgOiBtb21lbnQoKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdC8vIOiuvue9ruS/oeaBr1xyXG5cdFx0dGhpcy50ZXh0Q29sb3IgPSAnYmxhY2snO1xyXG5cdFx0dGhpcy5iYWNrZ3JvdW5kQ29sb3IgPSBia0NvbG9yO1xyXG5cdFx0dGhpcy5jb21wbGV0ZSA9IGNvbXBsZXRlO1xyXG5cdFx0dGhpcy5kYXRlQ29tcGxldGVkID0gZGF0ZUNvbXBsZXRlZDtcclxuXHRcdC8vIOmHjeWkjeS6i+S7tlxyXG5cdFx0dGhpcy5ycHRSdWxlID0gcnB0UnVsZTtcclxuXHRcdHRoaXMucnB0RW5kID0gcnB0RW5kO1xyXG5cdFx0Ly9cclxuXHRcdHRoaXMuX3VwZGF0ZSgpO1xyXG5cdH1cclxuXHJcblx0X2NoZWNrRGF0YVR5cGUoZGF0YSkge1xyXG5cdFx0Y29uc3Qgb2JqQ2xhc3MgPSBkYXRhLmNvbnN0cnVjdG9yO1xyXG4gICAgICAgIGNvbnN0IEdVSURfUmVnRXhyID0gL15bMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfSQvaTtcclxuICAgICAgICBsZXQgdHlwZTtcclxuICAgICAgICBzd2l0Y2ggKG9iakNsYXNzKSB7XHJcbiAgICAgICAgICAgIGNhc2UgU3RyaW5nOlxyXG4gICAgICAgICAgICAgICAgaWYgKCBHVUlEX1JlZ0V4ci50ZXN0KGRhdGEpICkgdHlwZSA9IFwiR1VJRFwiO1xyXG4gICAgICAgICAgICAgICAgZWxzZSB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZGF0YSwgY2Fubm90IGNyZWF0ZSBDYWxlbmRhckV2ZW50IG9iamVjdC4nKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIE9iamVjdDpcclxuXHRcdFx0XHRpZiAoIGRhdGEuQ0FMRU5EQVJfSU5GTyAmJiBkYXRhLnRpdGxlICkgeyBcclxuXHRcdFx0XHRcdHR5cGUgPSAnV2l6RXZlbnQnO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAoIGRhdGEuc3RhcnQgJiYgZGF0YS50aXRsZSApIHtcclxuXHRcdFx0XHRcdHR5cGUgPSAnRnVsbENhbGVuZGFyRXZlbnQnO1xyXG5cdFx0XHRcdH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHlwZTtcclxuXHR9O1xyXG5cclxuXHRfcGFyc2VJbmZvKEluZm9TdHJpbmcpIHtcclxuXHRcdGNvbnN0IEluZm9PYmplY3QgPSB7fTtcclxuXHRcdC8vIOaLhuino0NBTEVOREFSX0lORk9cclxuXHRcdGNvbnN0IEluZm9BcnJheSA9IEluZm9TdHJpbmcuc3BsaXQoJy8nKTtcclxuXHRcdEluZm9BcnJheS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0sIGluZGV4LCBhcnIpe1xyXG5cdFx0XHRjb25zdCBwYWlyID0gaXRlbS5zcGxpdCgnPScpO1xyXG5cdFx0XHRJbmZvT2JqZWN0W3BhaXJbMF1dID0gcGFpclsxXTtcclxuXHRcdH0pO1xyXG5cdFx0Ly8g5aSE55CG6aKc6Imy5YC8XHJcblx0XHRpZiAoIEluZm9PYmplY3QuYiApIEluZm9PYmplY3QuYiA9ICcjJyArIEluZm9PYmplY3QuYjtcclxuXHJcblx0XHRyZXR1cm4gSW5mb09iamVjdDtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuICAgICAqIOWwhiBJbmZvIOWvueixoeW6j+WIl+WMli5cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbSW5mb09iamVjdD1dIOaPkOS+myBJbmZvIOWvueixoe+8jOm7mOiupOS4umB0aGlzLl9JbmZvYC5cclxuICAgICAqIEByZXR1cm4ge1N0cmluZ30g6L+U5Zue55So5LqOSW5mb+WvueixoeWtl+espuS4si5cclxuICAgICAqL1xyXG5cdF9zdHJpbmdpZnlJbmZvKCBJbmZvT2JqZWN0ID0gdGhpcy5fSW5mbyApIHtcclxuXHRcdGlmICggIUluZm9PYmplY3QgKSByZXR1cm4gJyc7XHJcblx0XHRjb25zdCBJbmZvQXJyYXkgPSBbXTtcclxuXHRcdGNvbnN0IEluZm9PYmplY3RLZXlzQXJyYXkgPSBPYmplY3Qua2V5cyhJbmZvT2JqZWN0KTtcclxuXHRcdEluZm9PYmplY3RLZXlzQXJyYXkuZm9yRWFjaChmdW5jdGlvbihpdGVtLCBpbmRleCwgYXJyKXtcclxuXHRcdFx0Y29uc3Qgc2luZ2xlSW5mbyA9IGAke2l0ZW19PSR7SW5mb09iamVjdFtpdGVtXX1gO1xyXG5cdFx0XHRJbmZvQXJyYXkucHVzaChzaW5nbGVJbmZvKTtcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIEluZm9BcnJheS5qb2luKCcvJykucmVwbGFjZSgnIycsICcnKTtcclxuXHR9O1xyXG5cclxuXHRfdXBkYXRlKCkge1xyXG5cdFx0dGhpcy5fdXBkYXRlSW5mbygpO1xyXG5cdFx0dGhpcy5fdXBkYXRlRXh0cmFJbmZvKCk7XHJcblx0fTtcclxuXHJcblx0X3VwZGF0ZUluZm8oKSB7XHJcblx0XHRjb25zdCB0aGF0ID0gdGhpcztcclxuXHRcdGNvbnN0IEluZm9PYmplY3QgPSB7XHJcblx0XHRcdCdiJzogbnVsbCwgLy/og4zmma/oibJoZXjlgLxcclxuXHRcdFx0J3InOiAnLTEnLCAvL+aPkOmGkuaWueW8j1xyXG5cdFx0XHQnYyc6ICcwJywgLy/nu5PmnZ/mj5DphpLkv6Hmga9cclxuXHRcdFx0J2NpJzogMCAvL+iDjOaZr+iJsklE77yM6buY6K6kIDAg6KGo56S66IOM5pmv5Li655So5oi36Ieq5a6a5LmJXHJcblx0XHR9O1xyXG5cdFx0Ly8g5pu05paw6IOM5pmv6ImyJ2InXHJcblx0XHRJbmZvT2JqZWN0WydiJ10gPSB0aGlzLmJhY2tncm91bmRDb2xvci5yZXBsYWNlKCcjJywgJycpO1xyXG5cdFx0Ly8g5pu05paw6aKc6Imy5oyH5pWwJ2NpJ1xyXG5cdFx0Q29uZmlnLmNvbG9ySXRlbXMuZm9yRWFjaChmdW5jdGlvbihpdGVtLCBpbmRleCwgYXJyKXtcclxuXHRcdFx0aWYgKCBpdGVtLmNvbG9yVmFsdWUgPT0gIHRoYXQuYmFja2dyb3VuZENvbG9yICkge1xyXG5cdFx0XHRcdC8vIOW9k+aXpeeoi+iDjOaZr+iJsuS4juiJsuihqOWMuemFjeaXtuWImeeUqCBjb2xvciBpZGV4IOadpeWCqOWtmO+8iOWFvOWuueWOn+eJiOaXpeWOhuaPkuS7tu+8iVxyXG5cdFx0XHRcdEluZm9PYmplY3RbJ2NpJ10gPSBpbmRleDtcclxuXHRcdFx0fTtcclxuXHRcdH0pO1xyXG5cdFx0Ly8g5bqU55So5pu05pawXHJcblx0XHR0aGlzLl9JbmZvID0gSW5mb09iamVjdDtcclxuXHR9O1xyXG5cclxuXHRfZ2V0RGVmYXVsdEV4dHJhSW5mbygpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdCdDb21wbGV0ZSc6IDAsIC8vXHJcblx0XHRcdCdEYXRlQ29tcGxldGVkJzogJycsIC8vIElTTyDmoIflh4bml6XmnJ/lrZfnrKbkuLIgWVlZWS1NTS1ERCAwMDowMDowMFxyXG5cdFx0XHQnUHJpb3InOiAwXHJcblx0XHR9O1xyXG5cdH07XHJcblxyXG5cdF91cGRhdGVFeHRyYUluZm8oKSB7XHJcblx0XHRjb25zdCBFeHRyYUluZm9PYmplY3QgPSB7XHJcblx0XHRcdCdDb21wbGV0ZSc6IDAsXHJcblx0XHRcdCdEYXRlQ29tcGxldGVkJzogJycsXHJcblx0XHRcdCdQcmlvcic6IDBcclxuXHRcdH07XHJcblx0XHRFeHRyYUluZm9PYmplY3RbJ0NvbXBsZXRlJ10gPSB0aGlzLmNvbXBsZXRlO1xyXG5cdFx0RXh0cmFJbmZvT2JqZWN0WydEYXRlQ29tcGxldGVkJ10gPSB0aGlzLmRhdGVDb21wbGV0ZWQ7XHJcblx0XHR0aGlzLl9FeHRyYUluZm8gPSBFeHRyYUluZm9PYmplY3Q7XHJcblx0fTtcclxuXHJcblx0X2dldEV2ZW50SHRtbCh0aXRsZSA9IHRoaXMudGl0bGUsIGNvbnRlbnQgPSAnJyl7XHJcblx0XHRjb25zdCBodG1sVGV4dCA9IFxyXG5cdFx0XHRgPGh0bWw+XHJcblx0XHRcdFx0PGhlYWQ+XHJcblx0XHRcdFx0XHQ8bWV0YSBodHRwLWVxdWl2PVwiQ29udGVudC1UeXBlXCIgY29udGVudD1cInRleHQvaHRtbDsgY2hhcnNldD11bmljb2RlXCI+XHJcblx0XHRcdFx0XHQ8dGl0bGU+JHt0aXRsZX08L3RpdGxlPiBcclxuXHRcdFx0XHQ8L2hlYWQ+XHJcblx0XHRcdFx0PGJvZHk+XHJcblx0XHRcdFx0XHQ8IS0tV2l6SHRtbENvbnRlbnRCZWdpbi0tPlxyXG5cdFx0XHRcdFx0PGRpdj4ke2NvbnRlbnR9PC9kaXY+XHJcblx0XHRcdFx0XHQ8IS0tV2l6SHRtbENvbnRlbnRFbmQtLT5cclxuXHRcdFx0XHQ8L2JvZHk+XHJcblx0XHRcdDwvaHRtbD5gO1xyXG5cdFxyXG5cdFx0ICByZXR1cm4gaHRtbFRleHRcclxuXHR9O1xyXG5cclxuXHQvKipcclxuICAgICAqIOagueaNruaXpeeoi+eahOmHjeWkjeinhOWImeeUn+aIkCBGdWxsQ2FsZW5kYXIgZXZlbnRTb3VyY2UuXHJcblx0ICogQHBhcmFtIHtTdHJpbmd9IHN0YXJ0IOafpeivoui1t+Wni++8jElTTyDmoIflh4bml6XmnJ/lrZfnrKbkuLIuXHJcblx0ICogQHBhcmFtIHtTdHJpbmd9IGVuZCDmn6Xor6Lnu5PmnZ/vvIxJU08g5qCH5YeG5pel5pyf5a2X56ym5LiyLlxyXG4gICAgICogQHJldHVybnMge09iamVjdH0gZXZlbnRTb3VyY2UuXHJcbiAgICAgKi9cclxuXHRnZW5lcmF0ZVJlcGVhdEV2ZW50cyhzdGFydCwgZW5kKSB7XHJcblx0XHRpZiAoICF0aGlzLnJwdFJ1bGUgKSB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBmaW5kIENhbGVuZGFyRXZlbnQgcmVwZWF0IHJ1bGUuJyk7XHJcblx0XHRjb25zdCBldmVudFNvdXJjZSA9IHtcclxuXHRcdFx0aWQ6IHRoaXMuaWQsXHJcblx0XHRcdGV2ZW50czogW11cclxuXHRcdH1cclxuXHRcdC8v5qC55o2ucnB0UnVsZeeUn+aIkOmHjeWkjeaXpeacn++8jOW5tueUn+aIkOS6i+S7tlxyXG5cdFx0Y29uc3QgZGF5QXJyYXkgPSB0aGlzLl9nZXRSZW5kZXJSZXBlYXREYXkoc3RhcnQsIGVuZCk7XHJcblx0XHRmb3IgKCBsZXQgZGF5IG9mIGRheUFycmF5ICkge1xyXG5cdFx0XHQvLyBkYXkg5piv5LiA5LiqTW9tZW505pel5pyf5a+56LGhXHJcblx0XHRcdGNvbnN0IG5ld0V2ZW50ID0gdGhpcy50b0Z1bGxDYWxlbmRhckV2ZW50KCk7XHJcblx0XHRcdG5ld0V2ZW50LnN0YXJ0ID0gZGF5LmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHRuZXdFdmVudC5lbmQgPSBtb21lbnQobmV3RXZlbnQuZW5kKS5hZGQoIGRheS5kaWZmKCBtb21lbnQodGhpcy5zdGFydCkgKSApLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHRldmVudFNvdXJjZS5ldmVudHMucHVzaChuZXdFdmVudCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGV2ZW50U291cmNlO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG4gICAgICog5qC55o2u6KeE5YiZ55Sf5oiQ5pel5pyf5pWw57uEXHJcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0W119IOWMheWQq+S4gOezu+WIl2BNb21lbnRg5pel5pyf5a+56LGh55qE5pWw57uELlxyXG4gICAgICovXHJcblx0X2dldFJlbmRlclJlcGVhdERheShzdGFydCwgZW5kKSB7XHJcblx0XHRjb25zdCBycHRSdWxlID0gdGhpcy5ycHRSdWxlO1xyXG5cdFx0bGV0IGRheUFycmF5O1xyXG5cdFx0bGV0IHJlZ2V4O1xyXG5cdFx0Y29uc29sZS5jb3VudChycHRSdWxlKTtcclxuXHRcdGlmICggKHJlZ2V4ID0gL15FdmVyeShcXGQpP1dlZWtzPyhcXGQqKSQvKS50ZXN0KHJwdFJ1bGUpICkge1xyXG5cdFx0XHQvLyDmr49bMTIzNF3lkahbNzEyMzQ1Nl1cclxuXHRcdFx0Y29uc3QgY3VyV2Vla0RheSA9IG1vbWVudCh0aGlzLnN0YXJ0KS5kYXkoKTtcclxuXHRcdFx0Y29uc3QgcmVzdWx0cyA9IHJlZ2V4LmV4ZWMocnB0UnVsZSk7XHJcblx0XHRcdGNvbnN0IGludGVyV2VlayA9IHJlc3VsdHNbMV07XHJcblx0XHRcdGNvbnN0IG51bWJlciA9IHJlc3VsdHNbMl0gfHwgYCR7Y3VyV2Vla0RheX1gO1xyXG5cdFx0XHRkYXlBcnJheSA9IHRoaXMuX2dldFdlZWtseVJlcGVhdERheShudW1iZXIsIHN0YXJ0LCBlbmQsIGludGVyV2Vlayk7XHJcblxyXG5cdFx0fSBlbHNlIGlmICggKHJlZ2V4ID0gL15FdmVyeVdlZWtkYXkoXFxkKikkLykudGVzdChycHRSdWxlKSApIHtcclxuXHRcdFx0Ly8g5q+P5Liq5bel5L2c5pelRXZlcnlXZWVrZGF5MTM1XHJcblx0XHRcdGNvbnN0IHJlc3VsdHMgPSByZWdleC5leGVjKHJwdFJ1bGUpO1xyXG5cdFx0XHRjb25zdCBudW1iZXIgPSByZXN1bHRzWzFdIHx8ICcxMjM0NSc7XHJcblx0XHRcdGRheUFycmF5ID0gdGhpcy5fZ2V0V2Vla2x5UmVwZWF0RGF5KG51bWJlciwgc3RhcnQsIGVuZCk7XHJcblxyXG5cdFx0fSBlbHNlIGlmICggKHJlZ2V4ID0gL0RhaWx5fFdlZWtseXxNb250aGx5fFllYXJseS8pLnRlc3QocnB0UnVsZSkgKSB7XHJcblx0XHRcdC8vIERhaWx5fFdlZWtseXxNb250aGx5fFllYXJseVxyXG5cdFx0XHRjb25zdCBwZXJSdWxlID0gcmVnZXguZXhlYyhycHRSdWxlKVswXVxyXG5cdFx0XHRkYXlBcnJheSA9IHRoaXMuX2dldFBlclJlcGVhdERheXMoc3RhcnQsIGVuZCwgcGVyUnVsZSk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBkYXlBcnJheTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuICAgICAqIOagueaNruavj+WRqOinhOWImeeUn+aIkOaXpeacn+aVsOe7hFxyXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBudW1iZXIg5pW05pWw5a2X56ym5Liy6KGo56S655qE6KeE5YiZ77ybXHJcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0W119IOWMheWQq+S4gOezu+WIl01vbWVudOaXpeacn+WvueixoeeahOaVsOe7hC5cclxuICAgICAqL1xyXG5cdF9nZXRXZWVrbHlSZXBlYXREYXkobnVtYmVyLCBzdGFydCwgZW5kLCBpbnRlcldlZWtzID0gJzEnKSB7XHJcblx0XHQvL+i/lOWbnlt7c3RhcnQsIGVuZH0sIHtzdGFydCwgZW5kfSwge3N0YXJ0LCBlbmR9XVxyXG5cdFx0Ly/ogIPomZHmuLLmn5PojIPlm7TvvIzku6Xlj4rnu5PmnZ/lvqrnjq/nmoTml6XmnJ9cclxuXHRcdGNvbnN0IHZpZXdTdGFydCA9IG1vbWVudCh0aGlzLnN0YXJ0KTtcclxuXHRcdGNvbnN0IHZpZXdFbmQgPSBtb21lbnQoZW5kKTtcclxuXHRcdGNvbnN0IHJwdEVuZCA9IHRoaXMucnB0RW5kID8gbW9tZW50KHRoaXMucnB0RW5kKSA6IHZpZXdFbmQ7XHJcblx0XHRsZXQgZGF5QXJyYXkgPSBbXTtcclxuXHRcdGNvbnN0IGludGVydmFsV2Vla3MgPSBpbnRlcldlZWtzID8gcGFyc2VJbnQoaW50ZXJXZWVrcykgOiAxO1xyXG5cdFx0Y29uc3Qgd2Vla2RheXMgPSBudW1iZXIucmVwbGFjZSgnNycsICcwJykuc3BsaXQoJycpOyAvL+WRqOaXpTB+NuWRqOWFrVxyXG5cdFx0Zm9yICggbGV0IGRheSBvZiB3ZWVrZGF5cyApIHtcclxuXHRcdFx0Ly9cclxuXHRcdFx0bGV0IGN1cldlZWtEYXkgPSBwYXJzZUludChkYXkpLCBuZXdFdmVudFN0YXJ0RGF0ZSA9IG1vbWVudCh2aWV3U3RhcnQpO1xyXG5cdFx0XHRkbyB7XHJcblx0XHRcdFx0Ly8g5Yib5bu65pawTW9tZW505a+56LGhXHJcblx0XHRcdFx0bmV3RXZlbnRTdGFydERhdGUgPSBtb21lbnQodmlld1N0YXJ0KS5kYXkoY3VyV2Vla0RheSk7XHJcblx0XHRcdFx0Ly8g5qC55o2u5pel56iL6K6+572udGltZSBwYXJ0XHJcblx0XHRcdFx0Y29uc3QgZXZlbnRTdGFydCA9IG1vbWVudCh0aGlzLnN0YXJ0KVxyXG5cdFx0XHRcdG5ld0V2ZW50U3RhcnREYXRlLnNldCh7XHJcblx0XHRcdFx0XHQnaG91cic6IGV2ZW50U3RhcnQuZ2V0KCdob3VyJyksXHJcblx0XHRcdFx0XHQnbWludXRlJzogZXZlbnRTdGFydC5nZXQoJ21pbnV0ZScpLFxyXG5cdFx0XHRcdFx0J3NlY29uZCc6IGV2ZW50U3RhcnQuZ2V0KCdzZWNvbmQnKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0Ly8g6YG/5YWN5Yid5aeL6YeN5aSN5riy5p+TXHJcblx0XHRcdFx0aWYgKCAhbmV3RXZlbnRTdGFydERhdGUuaXNTYW1lKCBldmVudFN0YXJ0ICkgKSBkYXlBcnJheS5wdXNoKCBtb21lbnQobmV3RXZlbnRTdGFydERhdGUpICk7XHJcblx0XHRcdFx0Ly8g6ZqU5aSa5bCR5ZGo6YeN5aSNXHJcblx0XHRcdFx0Y3VyV2Vla0RheSArPSA3KmludGVydmFsV2Vla3M7XHJcblx0XHRcdFx0Ly9jb25zb2xlLmxvZyggbW9tZW50KG5ld0V2ZW50U3RhcnREYXRlKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKSApO1xyXG5cdFx0XHR9IHdoaWxlICggbW9tZW50KHZpZXdTdGFydCkuZGF5KGN1cldlZWtEYXkgKyA3ICkuaXNCZWZvcmUoIHZpZXdFbmQgKSBcclxuXHRcdFx0XHRcdFx0JiYgbW9tZW50KHZpZXdTdGFydCkuZGF5KGN1cldlZWtEYXkgKyA3ICkuaXNCZWZvcmUoIHJwdEVuZCApICApXHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gZGF5QXJyYXk7XHJcblx0fTtcclxuXHJcblx0X2dldFBlclJlcGVhdERheXMoc3RhcnQsIGVuZCwgcGVyUnVsZSkge1xyXG5cdFx0Y29uc3QgcGVyUnVsZU1hcCA9IHtcclxuXHRcdFx0J0RhaWx5JzogJ2RheXMnLFxyXG5cdFx0XHQnV2Vla2x5JyA6ICd3ZWVrcycsXHJcblx0XHRcdCdNb250aGx5JyA6ICdtb250aHMnLFxyXG5cdFx0XHQnWWVhcmx5JyA6ICd5ZWFycydcclxuXHRcdH07XHJcblx0XHRjb25zdCB2aWV3U3RhcnQgPSBtb21lbnQodGhpcy5zdGFydCk7XHJcblx0XHRjb25zdCB2aWV3RW5kID0gbW9tZW50KGVuZCk7XHJcblx0XHRjb25zdCBycHRFbmQgPSB0aGlzLnJwdEVuZCA/IG1vbWVudCh0aGlzLnJwdEVuZCkgOiB2aWV3RW5kO1xyXG5cdFx0bGV0IGRheUFycmF5ID0gW107XHJcblx0XHRjb25zdCBldmVudFN0YXJ0ID0gbW9tZW50KHRoaXMuc3RhcnQpXHJcblx0XHRkbyB7XHJcblx0XHRcdC8vIOWinuWKoOS4gOS4quaciFxyXG5cdFx0XHRldmVudFN0YXJ0LmFkZCgxLCBwZXJSdWxlTWFwW3BlclJ1bGVdKTtcclxuXHRcdFx0ZGF5QXJyYXkucHVzaCggbW9tZW50KGV2ZW50U3RhcnQpICk7XHJcblx0XHR9IHdoaWxlICggZXZlbnRTdGFydC5pc0JlZm9yZSggdmlld0VuZCApICYmIGV2ZW50U3RhcnQuaXNCZWZvcmUoIHJwdEVuZCApICk7XHJcblxyXG5cdFx0cmV0dXJuIGRheUFycmF5O1xyXG5cdH1cclxuXHJcblx0dG9GdWxsQ2FsZW5kYXJFdmVudCgpIHtcclxuXHRcdC8vIOazqOaEj+aWueazlei/lOWbnueahOWPquaYr0Z1bGxDYWxlbmRhckV2ZW5055qE5pWw5o2u57G75Z6L77yM5bm25LiN5pivZXZlbnTlr7nosaFcclxuXHRcdGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cdFx0Y29uc3QgbmV3RXZlbnQgPSB7fTtcclxuXHRcdGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzKTtcclxuXHRcdC8vIOWOu+mZpOmdnuW/heimgeWxnuaAp1xyXG5cdFx0a2V5cy5zcGxpY2UoIGtleXMuZmluZEluZGV4KCAoaSkgPT4gaSA9PSAnX0luZm8nICksIDEpO1xyXG5cdFx0a2V5cy5zcGxpY2UoIGtleXMuZmluZEluZGV4KCAoaSkgPT4gaSA9PSAnX0V4dHJhSW5mbycgKSwgMSk7XHJcblx0XHQvLyDmtYXmi7fotJ0sIOS4jei/h+S4u+imgeWxnuaAp+mDveaYr+WfuuacrOaVsOaNruexu+Wei++8jOaJgOS7peS4jeWtmOWcqOW8leeUqOmXrumimFxyXG5cdFx0a2V5cy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0sIGluZGV4LCBhcnIpe1xyXG5cdFx0XHRuZXdFdmVudFtpdGVtXSA9IHRoYXRbaXRlbV07XHJcblx0XHR9KTtcclxuXHRcdHJldHVybiBuZXdFdmVudDtcclxuXHR9O1xyXG5cclxuXHR0b1dpekV2ZW50RGF0YSgpIHtcclxuXHRcdHRoaXMuX3VwZGF0ZSgpO1xyXG5cdFx0Y29uc3QgbmV3RXZlbnQgPSB7fTtcclxuXHRcdG5ld0V2ZW50LnRpdGxlID0gdGhpcy50aXRsZTtcclxuXHRcdG5ld0V2ZW50Lmd1aWQgPSB0aGlzLmlkO1xyXG5cdFx0bmV3RXZlbnQuQ0FMRU5EQVJfU1RBUlQgPSB0aGlzLmFsbERheSA/IG1vbWVudCh0aGlzLnN0YXJ0KS5mb3JtYXQoJ1lZWVktTU0tREQgMDA6MDA6MDAnKSA6IHRoaXMuc3RhcnQ7XHJcblx0XHRuZXdFdmVudC5DQUxFTkRBUl9FTkQgPSB0aGlzLmFsbERheSA/IG1vbWVudCh0aGlzLmVuZCkuZm9ybWF0KCdZWVlZLU1NLUREIDIzOjU5OjU5JykgOiB0aGlzLmVuZDtcclxuXHRcdG5ld0V2ZW50LkNBTEVOREFSX0lORk8gPSB0aGlzLl9zdHJpbmdpZnlJbmZvKHRoaXMuX0luZm8pO1xyXG5cdFx0bmV3RXZlbnQuQ0FMRU5EQVJfRVhUUkFJTkZPID0gdGhpcy5fc3RyaW5naWZ5SW5mbyh0aGlzLl9FeHRyYUluZm8pO1xyXG5cdFx0bmV3RXZlbnQuY3JlYXRlZCA9IHRoaXMuY3JlYXRlZDtcclxuXHRcdG5ld0V2ZW50LnVwZGF0ZWQgPSB0aGlzLnVwZGF0ZWQ7XHJcblx0XHRyZXR1cm4gbmV3RXZlbnQ7XHJcblx0fTtcclxuXHJcblx0YWRkVG9GdWxsQ2FsZW5kYXIoKSB7XHJcblx0XHQvL1RPRE86IOWwhuiHqui6q+a3u+WKoOWIsEZ1bGxDYWxlbmRhclxyXG5cdFx0dGhpcy4kY2FsZW5kYXIuZnVsbENhbGVuZGFyKCAnYWRkRXZlbnRTb3VyY2UnLCB7XHJcblx0XHRcdGV2ZW50czogW1xyXG5cdFx0XHRcdHRoaXMudG9GdWxsQ2FsZW5kYXJFdmVudCgpXHJcblx0XHRcdF1cclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdF9zYXZlQWxsUHJvcCgpIHtcclxuXHRcdC8vVE9ETzog5L+d5a2Y5YWo6YOo5pWw5o2u5YyF5ousVGl0bGVcclxuXHRcdC8vIOabtOaWsOS6i+S7tuaWh+aho+aVsOaNrlxyXG5cdFx0Y29uc3QgZG9jID0gZ19kYi5Eb2N1bWVudEZyb21HVUlEKHRoaXMuaWQpO1xyXG5cdFx0Ly8g5L+d5a2Y5qCH6aKYXHJcblx0XHRkb2MuVGl0bGUgPSB0aGlzLnRpdGxlO1xyXG5cdFx0Ly8g5L+d5a2Y5pe26Ze05pWw5o2uXHJcblx0XHRpZiAoIHRoaXMuYWxsRGF5ICkge1xyXG5cdFx0XHRsZXQgc3RhcnRTdHIgPSBtb21lbnQodGhpcy5zdGFydCkuc2V0KHsnaCc6IDAsICdtJzogMCwgJ3MnOiAwfSkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRcdGxldCBlbmRTdHIgPSBtb21lbnQodGhpcy5lbmQpLnNldCh7J2gnOiAyMywgJ20nOiA1OSwgJ3MnOiA1OX0pLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9TVEFSVFwiLCBzdGFydFN0cik7XHJcblx0XHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX0VORFwiLCBlbmRTdHIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bGV0IHN0YXJ0U3RyID0gbW9tZW50KHRoaXMuc3RhcnQpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHRsZXQgZW5kU3RyID0gbW9tZW50KHRoaXMuZW5kKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfU1RBUlRcIiwgc3RhcnRTdHIpO1xyXG5cdFx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9FTkRcIiwgZW5kU3RyKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyDkv53lrZggQ0FMRU5EQVJfSU5GT1xyXG5cdFx0dGhpcy5fdXBkYXRlKCk7XHJcblx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9JTkZPXCIsIHRoaXMuX3N0cmluZ2lmeUluZm8odGhpcy5fSW5mbykpO1xyXG5cdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfRVhUUkFJTkZPXCIsIHRoaXMuX3N0cmluZ2lmeUluZm8odGhpcy5fRXh0cmFJbmZvKSk7XHJcblx0fTtcclxuXHJcblx0Ly8g6K6+572u5paH5qGj5bGe5oCn5YC8XHJcblx0X3NldFBhcmFtVmFsdWUoZG9jLCBrZXksIHZhbHVlKSB7XHJcblx0XHRpZiAoIWRvYykgcmV0dXJuIGZhbHNlO1xyXG5cdFx0ZG9jLlNldFBhcmFtVmFsdWUoa2V5LCB2YWx1ZSk7XHJcblx0fTtcclxuXHJcblx0X2NyZWF0ZVdpekV2ZW50RG9jKCkge1xyXG5cdFx0Ly9UT0RPOiDkv53lrZjlhajpg6jmlbDmja7ljIXmi6xUaXRsZVxyXG5cdFx0Ly8g5Yib5bu6V2l6RG9jXHJcblx0XHRjb25zdCBsb2NhdGlvbiA9IGBNeSBFdmVudHMvJHsgbW9tZW50KHRoaXMuc3RhcnQpLmZvcm1hdCgnWVlZWS1NTScpIH0vYDtcclxuXHRcdGNvbnN0IG9iakZvbGRlciA9IGdfZGIuR2V0Rm9sZGVyQnlMb2NhdGlvbihsb2NhdGlvbiwgdHJ1ZSk7XHJcblx0XHRjb25zdCB0ZW1wSHRtbCA9IGdfY21uLkdldEFUZW1wRmlsZU5hbWUoJy5odG1sJyk7XHJcblx0XHRjb25zdCBodG1sVGV4dCA9IHRoaXMuX2dldEV2ZW50SHRtbCh0aGlzLnRpdGxlLCAnJyk7XHJcblx0XHRnX2Ntbi5TYXZlVGV4dFRvRmlsZSh0ZW1wSHRtbCwgaHRtbFRleHQsICd1bmljb2RlJyk7XHJcblx0XHRjb25zdCBkb2MgPSBvYmpGb2xkZXIuQ3JlYXRlRG9jdW1lbnQyKHRoaXMudGl0bGUsIFwiXCIpO1xyXG5cdFx0ZG9jLkNoYW5nZVRpdGxlQW5kRmlsZU5hbWUodGhpcy50aXRsZSk7XHJcblx0XHRkb2MuVXBkYXRlRG9jdW1lbnQ2KHRlbXBIdG1sLCB0ZW1wSHRtbCwgMHgyMik7XHJcblx0XHQvLyDorr7nva7moIfnrb5cclxuXHRcdC8vaWYgKCB0YWdzICkgZG9jLlNldFRhZ3NUZXh0Mih0YWdzLCBcIkNhbGVuZGFyXCIpO1xyXG5cdFx0Ly8g5bCG5L+h5oGv57yW56CB5YiwV2l6RG9j5bGe5oCn5Lit5Y67XHJcblx0XHRjb25zdCBuZXdFdmVudCA9IHRoaXMudG9XaXpFdmVudERhdGEoKTtcclxuXHRcdGRvYy5BZGRUb0NhbGVuZGFyKG5ld0V2ZW50LkNBTEVOREFSX1NUQVJULCBuZXdFdmVudC5DQUxFTkRBUl9FTkQsIG5ld0V2ZW50LkNBTEVOREFSX0lORk8pO1xyXG5cdFx0Ly8gY2hhbmdlIGRhdGFiYXNlXHJcblx0XHRkb2MudHlwZSA9IFwiZXZlbnRcIjtcclxuXHRcdC8vXHJcblx0XHR0aGlzLmlkID0gZG9jLkdVSUQ7XHJcblx0fVxyXG5cclxuXHRzYXZlVG9XaXpFdmVudERvYyggcHJvcCA9ICdhbGwnICkge1xyXG5cdFx0aWYgKCFnX2RiIHx8ICFnX2NtbikgdGhyb3cgbmV3IEVycm9yKCdJV2l6RGF0YWJhc2Ugb3IgSVdpekNvbW1vblVJIGlzIG5vdCB2YWxpZC4nKTtcclxuXHRcdC8v5qOA5p+l5paH5qGj5piv5ZCm5a2Y5ZyoXHJcblx0XHRjb25zdCBndWlkUmVnZXggPSAvXlswLTlhLWZdezh9LVswLTlhLWZdezR9LVsxLTVdWzAtOWEtZl17M30tWzg5YWJdWzAtOWEtZl17M30tWzAtOWEtZl17MTJ9JC9pO1xyXG5cdFx0Y29uc3QgaXNXaXpEb2NFeGlzdCA9IGd1aWRSZWdleC50ZXN0KHRoaXMuaWQpO1xyXG5cdFx0Ly8g5Yib5bu65oiW6ICF5pu05paw5paH5qGjXHJcblx0XHRpZiAoIGlzV2l6RG9jRXhpc3QgKSB7XHJcblx0XHRcdC8vIOagueaNruaMh+S7pOabtOaWsOWGheWuuVxyXG5cdFx0XHR0aGlzLl9zYXZlQWxsUHJvcCgpO1xyXG5cdFx0XHQvLyDmm7TmlrBGdWxsQ2FsZW5kYXJcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdC8vIOWIm+W7uuaWsOeahOS6i+S7tuaWh+aho1xyXG5cdFx0XHR0aGlzLl9jcmVhdGVXaXpFdmVudERvYygpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0fTtcclxuXHJcblx0ZGVsZXRlRXZlbnREYXRhKCBpc0RlbGV0ZURvYyA9IGZhbHNlICl7XHJcblx0XHRsZXQgZG9jID0gZ19kYi5Eb2N1bWVudEZyb21HVUlEKHRoaXMuaWQpO1xyXG5cdFx0aWYgKCFkb2MpIHRocm93IG5ldyBFcnJvcignQ2FuIG5vdCBmaW5kIEV2ZW50IHJlbGF0ZWQgV2l6RG9jdW1lbnQuJylcclxuXHRcdC8vIOenu+mZpEZ1bGxDYWxlbmRhcuS6i+S7tlxyXG5cdFx0dGhpcy4kY2FsZW5kYXIuZnVsbENhbGVuZGFyKCdyZW1vdmVFdmVudHMnLCB0aGlzLmlkKTtcclxuXHRcdC8vIOenu+mZpOaXpeWOhuaVsOaNrlxyXG5cdFx0ZG9jLlJlbW92ZUZyb21DYWxlbmRhcigpO1xyXG5cdFx0Ly8g5Yig6Zmk5paH5qGjXHJcblx0XHRpZiAoIGlzRGVsZXRlRG9jICkgZG9jLkRlbGV0ZSgpO1xyXG5cdH1cclxuXHJcblx0cmVmZXRjaERhdGEoKSB7XHJcblx0XHQvL1RPRE86IOmHjeaVsOaNruW6k+mHjeaWsOiOt+WPluaVsOaNruabtOaWsOWunuS+i1xyXG5cdH07XHJcblxyXG5cdHJlZnJlc2hFdmVudChldmVudCkge1xyXG5cdFx0Ly9UT0RPOiDlupTor6Xoh6rliqjpgY3ljoblubbkv67mlLnlsZ7mgKdcclxuXHRcdGlmICggZXZlbnQgKSB7XHJcblx0XHRcdC8vIOmHjeaWsOa4suafk0Z1bGxDYWxlbmRhcuS6i+S7tlxyXG5cdFx0XHRldmVudC50aXRsZSA9IHRoaXMudGl0bGU7XHJcblx0XHRcdGV2ZW50LmJhY2tncm91bmRDb2xvciA9IHRoaXMuYmFja2dyb3VuZENvbG9yO1xyXG5cdFx0XHR0aGlzLiRjYWxlbmRhci5mdWxsQ2FsZW5kYXIoJ3VwZGF0ZUV2ZW50JywgZXZlbnQpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Ly/nlKguZnVsbENhbGVuZGFyKCDigJhjbGllbnRFdmVudHPigJkgWywgaWRPckZpbHRlciBdICkgLT4gQXJyYXkg6I635Y+W5rqQ5pWw5o2u5LuO6ICM5pu05pawXHJcblx0XHRcdC8vVE9ETzog6YGN5Y6G5bm25a+75om+R1VJROWMuemFjeeahOS6i+S7tlxyXG5cdFx0fVxyXG5cdH1cclxuXHJcbn0iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xyXG5pbXBvcnQgV2l6RXZlbnREYXRhTG9hZGVyIGZyb20gJy4vV2l6RXZlbnREYXRhTG9hZGVyJztcclxuaW1wb3J0IENhbGVuZGFyRXZlbnQgZnJvbSAnLi9DYWxlbmRhckV2ZW50JztcclxuaW1wb3J0IHsgV2l6Q29uZmlybSwgV2l6Q29tbW9uVUkgYXMgb2JqQ29tbW9uLCBXaXpEYXRhYmFzZSBhcyBvYmpEYXRhYmFzZSwgV2l6RXhwbG9yZXJXaW5kb3cgYXMgb2JqV2luZG93IH0gZnJvbSAnLi4vdXRpbHMvV2l6SW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1IYW5kbGVzIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuJGNhbGVuZGFyID0gJCgnI2NhbGVuZGFyJylcclxuICAgIH07XHJcblxyXG4gICAgb25DcmVhdGVCdG5DbGljayhzdGFydCwgZW5kLCBqc0V2ZW50LCB2aWV3LCBmb3JtTm9kZSkge1xyXG4gICAgICAgIGNvbnN0IHRpdGxlID0gJChmb3JtTm9kZSkuZmluZCgnI3RjLWNyZWF0ZXBhZ2UtZXZlbnR0aXRsZScpLnZhbCgpO1xyXG4gICAgICAgIGNvbnN0IGNvbG9yID0gJChmb3JtTm9kZSkuZmluZCgnI3RjLWNyZWF0ZXBhZ2UtZXZlbnRjb2xvcicpLnZhbCgpO1xyXG4gICAgICAgIG5ldyBXaXpFdmVudERhdGFMb2FkZXIoKS5jcmVhdGVFdmVudCh7c3RhcnQsIGVuZCwganNFdmVudCwgdmlld30sIHt0aXRsZSwgY29sb3J9KTsgLy8g6L+Z5LiA5q2l6ICX5pe2XHJcbiAgICAgICAgJChmb3JtTm9kZSkubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAkKCcjY2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoJ3Vuc2VsZWN0Jyk7XHJcbiAgICB9O1xyXG5cclxuICAgIG9uU2F2ZUJ0bkNsaWNrKGV2ZW50LCBuZXdFdmVudERhdGEpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IHByb3AgaW4gbmV3RXZlbnREYXRhKSB7XHJcbiAgICAgICAgICAgIGV2ZW50W3Byb3BdID0gbmV3RXZlbnREYXRhW3Byb3BdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOmHjeaWsOa4suafk1xyXG4gICAgICAgIHRoaXMuJGNhbGVuZGFyLmZ1bGxDYWxlbmRhciggJ3VwZGF0ZUV2ZW50JywgZXZlbnQgKTtcclxuICAgICAgICAvLyDkv67mlLnmupDmlbDmja5cclxuICAgICAgICBjb25zdCBuZXdFdmVudCA9IG5ldyBDYWxlbmRhckV2ZW50KGV2ZW50KTtcclxuICAgICAgICBuZXdFdmVudC5zYXZlVG9XaXpFdmVudERvYygpO1xyXG4gICAgfTtcclxuXHJcbiAgICBvbkNvbXBsZXRlQnRuQ2xpY2soZXZlbnQpIHtcclxuICAgICAgICAvLyDkv67mlLnmlbDmja5cclxuICAgICAgICBjb25zdCBpc0NvbXBsZXRlID0gcGFyc2VJbnQoZXZlbnQuY29tcGxldGUpID09IDU7XHJcbiAgICAgICAgaWYgKCBpc0NvbXBsZXRlICkge1xyXG4gICAgICAgICAgICBldmVudC5jb21wbGV0ZSA9ICcwJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBldmVudC5jb21wbGV0ZSA9ICc1JztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5L+d5a2Y5pWw5o2uXHJcbiAgICAgICAgY29uc3QgbmV3RXZlbnQgPSBuZXcgQ2FsZW5kYXJFdmVudChldmVudCk7XHJcbiAgICAgICAgbmV3RXZlbnQuc2F2ZVRvV2l6RXZlbnREb2MoKTtcclxuICAgICAgICAvLyDph43mlrDmuLLmn5NcclxuICAgICAgICB0aGlzLiRjYWxlbmRhci5mdWxsQ2FsZW5kYXIoICd1cGRhdGVFdmVudCcsIGV2ZW50ICk7XHJcbiAgICB9O1xyXG5cclxuICAgIG9uRGVsZXRlRGF0YUJ0bkNsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCBXaXpDb25maXJtKFwi56Gu5a6a6KaB5Yig6Zmk6K+l5pel56iL77yfXCIsICfnlarojITliqnnkIYnKSApIHtcclxuICAgICAgICAgICAgLy8g5Yig6Zmk5pel56iLXHJcbiAgICAgICAgICAgIGxldCBuZXdFdmVudCA9IG5ldyBDYWxlbmRhckV2ZW50KGV2ZW50KTtcclxuICAgICAgICAgICAgbmV3RXZlbnQuZGVsZXRlRXZlbnREYXRhKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIG9uRGVsZXRlRG9jQnRuQ2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoIFdpekNvbmZpcm0oXCLnoa7lrpropoHliKDpmaTor6Xml6XnqIvmupDmlofmoaPvvJ9cXG7jgIznoa7lrprjgI3lsIbkvJrlr7zoh7Tnm7jlhbPnrJTorrDooqvliKDpmaTvvIFcIiwgJ+eVquiMhOWKqeeQhicpICkge1xyXG4gICAgICAgICAgICBsZXQgbmV3RXZlbnQgPSBuZXcgQ2FsZW5kYXJFdmVudChldmVudCk7XHJcbiAgICAgICAgICAgIG5ld0V2ZW50LmRlbGV0ZUV2ZW50RGF0YSh0cnVlKTtcclxuICAgICAgICB9XHRcclxuICAgIH07XHJcblxyXG4gICAgb25FZGl0T3JpZ2luQnRuQ2xpY2soZXZlbnQpIHtcclxuICAgICAgICBjb25zdCBkb2MgPSBvYmpEYXRhYmFzZS5Eb2N1bWVudEZyb21HVUlEKGV2ZW50LmlkKTtcclxuICAgICAgICBvYmpDb21tb24uRWRpdENhbGVuZGFyRXZlbnQoZG9jKTtcclxuICAgIH07XHJcblxyXG4gICAgb25PcGVuRG9jQnRuQ2xpY2soZXZlbnQpIHtcclxuICAgICAgICBjb25zdCBkb2MgPSBvYmpEYXRhYmFzZS5Eb2N1bWVudEZyb21HVUlEKGV2ZW50LmlkKTtcclxuICAgICAgICBvYmpXaW5kb3cuVmlld0RvY3VtZW50KGRvYywgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgV2l6RGF0YWJhc2UgYXMgb2JqRGF0YWJhc2UgfSBmcm9tICcuLi91dGlscy9XaXpJbnRlcmZhY2UnO1xyXG5pbXBvcnQgQ2FsZW5kYXJFdmVudCBmcm9tICcuL0NhbGVuZGFyRXZlbnQnO1xyXG5cclxuLyog5pWw5o2u6I635Y+WXHJcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuLyoqIOivpeexu+S4jldpem5vdGXnmoRXaXpEYXRhYmFzZeaOpeWPo+S6pOaNouS/oeaBr++8jOiOt+WPluaVsOaNriAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXaXpFdmVudERhdGFMb2FkZXIge1xyXG5cdC8qKlxyXG4gICAgICog5Yib6YCg5LiA5Liq5LqL5Lu25pWw5o2u5Yqg6L295ZmoLlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBzdGFydCDmn6Xor6Lotbflp4vml6XmnJ/vvIxJU0/moIflh4bml6XmnJ/lrZfnrKbkuLIuXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGVuZCDmn6Xor6LmiKroh7Pml6XmnJ/vvIxJU0/moIflh4bml6XmnJ/lrZfnrKbkuLIuXHJcbiAgICAgKi9cclxuXHRjb25zdHJ1Y3RvcihjYWxlbmRhcikge1xyXG5cdFx0aWYgKCFvYmpEYXRhYmFzZSkgdGhyb3cgbmV3IEVycm9yKCdXaXpEYXRhYmFzZSBub3QgdmFsaWQgIScpO1xyXG5cdFx0dGhpcy5EYXRhYmFzZSA9IG9iakRhdGFiYXNlO1xyXG5cdFx0dGhpcy51c2VyTmFtZSA9IG9iakRhdGFiYXNlLlVzZXJOYW1lO1xyXG5cdFx0dGhpcy4kY2FsZW5kYXIgPSAkKGNhbGVuZGFyKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuICAgICAqIOiOt+W+l+a4suafk+WQjueahOaJgOaciUZ1bGxDYWxlbmRhcuS6i+S7ti5cclxuXHQgKiBAcGFyYW0ge29iamVjdH0gdmlldyBpcyB0aGUgVmlldyBPYmplY3Qgb2YgRnVsbENhbGVuZGFyIGZvciB0aGUgbmV3IHZpZXcuXHJcblx0ICogQHBhcmFtIHtvYmplY3R9IGVsZW1lbnQgaXMgYSBqUXVlcnkgZWxlbWVudCBmb3IgdGhlIGNvbnRhaW5lciBvZiB0aGUgbmV3IHZpZXcuXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3RbXX0g6L+U5Zue55So5LqORnVsbENhbGVuZGFyIOa4suafk+eahCBldmVudFNvdXJjZXMg5pWw57uELlxyXG4gICAgICovXHJcblx0Z2V0RXZlbnRTb3VyY2VzKCB2aWV3LCBlbGVtZW50ICl7XHJcblx0XHRjb25zdCB2aWV3U3RhcnQgPSB2aWV3LnN0YXJ0LmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0Y29uc3Qgdmlld0VuZCA9IHZpZXcuZW5kLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0bGV0IGV2ZW50U291cmNlcyA9IFtdO1xyXG5cdFx0Ly/ojrflj5bmma7pgJrml6XnqItcclxuXHRcdGNvbnN0IGdlbmVyYWxFdmVudFNvdXJjZSA9IHtcclxuXHRcdFx0dHlwZTogJ2dlbmVyYWxFdmVudHMnLFxyXG5cdFx0XHQvL2V2ZW50czogdGhpcy5fZ2V0QWxsT3JpZ2luYWxFdmVudChbXSwgdGhpcy5fZDJzKGN1cnJlbnRWaWV3LnN0YXJ0LnRvRGF0ZSgpKSwgdGhpcy5fZDJzKGN1cnJlbnRWaWV3LmVuZC50b0RhdGUoKSkpXHJcblx0XHRcdGV2ZW50czogdGhpcy5fZ2V0QWxsT3JpZ2luYWxFdmVudCh2aWV3U3RhcnQsIHZpZXdFbmQpXHJcblx0XHR9XHJcblx0XHRldmVudFNvdXJjZXMucHVzaChnZW5lcmFsRXZlbnRTb3VyY2UpO1xyXG5cdFx0XHJcblx0XHQvL1RPRE86IOiOt+WPlumHjeWkjeaXpeeoi1xyXG5cdFx0Y29uc3QgcmVwZWF0RXZlbnRTb3VyY2VzID0gdGhpcy5fZ2V0QWxsUmVwZWF0RXZlbnQodmlld1N0YXJ0LCB2aWV3RW5kKTtcclxuXHRcdGV2ZW50U291cmNlcyA9IGV2ZW50U291cmNlcy5jb25jYXQocmVwZWF0RXZlbnRTb3VyY2VzKTtcclxuXHRcdC8vXHJcblx0XHRyZXR1cm4gZXZlbnRTb3VyY2VzO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG4gICAgICog5LuOV2l6RGF0YWJhc2XkuK3ojrflj5bmiYDmnInmlbDmja7mlofmoaMuXHJcblx0ICogQHBhcmFtIHthcnJheX0gZXZlbnRzIOWIneWni+S6i+S7tuaVsOe7hC5cclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gc3RhcnQgSVNP5qCH5YeG5pel5pyf5a2X56ym5LiyLlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBlbmQgSVNP5qCH5YeG5pel5pyf5a2X56ym5LiyLlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0W119IOi/lOWbnueUqOS6jkZ1bGxDYWxlbmRhcua4suafk+eahOS6i+S7tuaVsOe7hC5cclxuICAgICAqL1xyXG5cdF9nZXRBbGxPcmlnaW5hbEV2ZW50KHN0YXJ0LCBlbmQpe1xyXG5cdFx0Y29uc3QgZXZlbnRzID0gW107XHJcblx0XHRsZXQgc3FsID0gYERPQ1VNRU5UX0xPQ0FUSU9OIG5vdCBsaWtlICcvRGVsZXRlZCBJdGVtcy8lJyBhbmQgKEtCX0dVSUQgaXMgbnVsbCBvciBLQl9HVUlEID0gJycpYDtcclxuXHRcdGxldCBhbmQxID0gYCBhbmQgRE9DVU1FTlRfR1VJRCBpbiAoc2VsZWN0IERPQ1VNRU5UX0dVSUQgZnJvbSBXSVpfRE9DVU1FTlRfUEFSQU0gd2hlcmUgUEFSQU1fTkFNRSA9ICdDQUxFTkRBUl9TVEFSVCcgIGFuZCAgUEFSQU1fVkFMVUUgPD0gJyR7ZW5kfScgKWA7XHJcblx0XHRsZXQgYW5kMiA9IGAgYW5kIERPQ1VNRU5UX0dVSUQgaW4gKHNlbGVjdCBET0NVTUVOVF9HVUlEIGZyb20gV0laX0RPQ1VNRU5UX1BBUkFNIHdoZXJlIFBBUkFNX05BTUUgPSAnQ0FMRU5EQVJfRU5EJyAgYW5kICBQQVJBTV9WQUxVRSA+PSAnJHtzdGFydH0nIClgO1xyXG5cdFx0aWYgKHN0YXJ0KSBzcWwgKz0gYW5kMjtcclxuXHRcdGlmIChlbmQpIHNxbCArPSBhbmQxO1xyXG5cdFx0aWYgKG9iakRhdGFiYXNlLkRvY3VtZW50c0RhdGFGcm9tU1FMKSB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0Y29uc3QgZGF0YSA9IG9iakRhdGFiYXNlLkRvY3VtZW50c0RhdGFGcm9tU1FMKHNxbCk7XHJcblx0XHRcdFx0aWYgKCAhZGF0YSApIHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRjb25zdCBvYmogPSBKU09OLnBhcnNlKGRhdGEpO1xyXG5cdFx0XHRcdGlmICggIW9iaiB8fCAhQXJyYXkuaXNBcnJheShvYmopICkgcmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgaSArKykge1xyXG5cdFx0XHRcdFx0ZXZlbnRzLnB1c2goXHJcblx0XHRcdFx0XHRcdG5ldyBDYWxlbmRhckV2ZW50KG9ialtpXSwgdGhpcy4kY2FsZW5kYXIpLnRvRnVsbENhbGVuZGFyRXZlbnQoKVxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0cmV0dXJuIGV2ZW50cztcclxuXHRcdFx0fVxyXG5cdFx0XHRjYXRjaChlcnIpIHtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKGVycik7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdEb2N1bWVudHNEYXRhRnJvbVNRTCBtZXRob2Qgb2YgV2l6RGF0YWJhc2Ugbm90IGV4aXN0IScpO1xyXG5cdFx0XHQvKlxyXG5cdFx0XHRsZXQgZG9jQ29sbGV0aW9uID0gb2JqRGF0YWJhc2UuRG9jdW1lbnRzRnJvbVNRTChzcWwpO1xyXG5cdFx0XHQvL1xyXG5cdFx0XHRpZiAoZG9jQ29sbGV0aW9uICYmIGRvY0NvbGxldGlvbi5Db3VudCl7XHJcblx0XHRcdFx0bGV0IGRvYztcclxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGRvY0NvbGxldGlvbi5Db3VudDsgKysgaSl7XHJcblx0XHRcdFx0XHRkb2MgPSBkb2NDb2xsZXRpb24uSXRlbShpKTtcclxuXHRcdFx0XHRcdGxldCBldmVudE9iaiA9IF9ldmVudE9iamVjdChfbmV3UHNldWRvRG9jKGRvYykpO1xyXG5cdFx0XHRcdFx0aWYgKGV2ZW50T2JqKVxyXG5cdFx0XHRcdFx0XHRldmVudHMucHVzaChldmVudE9iaik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBldmVudHM7XHJcblx0XHRcdH1cclxuXHRcdFx0Ki9cdFx0XHJcblx0XHR9XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG4gICAgICog5LuOV2l6RGF0YWJhc2XkuK3ojrflj5bmiYDmnInlvqrnjq/ph43lpI3kuovku7YuXHJcblx0ICog5LuO5Yib5bu65LqL5Lu255qE5pel5pyf5byA5aeL5YiwRU5EUkVDVVJSRU5DRee7k+adn1xyXG4gICAgICogQHJldHVybiB7T2JqZWN0W119IOi/lOWbnueUqOS6jkZ1bGxDYWxlbmRhcua4suafk+eahCBldmVudFNvdXJjZSDmlbDnu4QuXHJcbiAgICAgKi9cclxuXHRfZ2V0QWxsUmVwZWF0RXZlbnQoc3RhcnQsIGVuZCl7XHJcblx0XHRjb25zdCByZXBlYXRFdmVudHMgPSBbXTtcclxuXHRcdGNvbnN0IHNxbCA9IFwiRE9DVU1FTlRfTE9DQVRJT04gbm90IGxpa2UgJy9EZWxldGVkIEl0ZW1zLyUnIGFuZCAoS0JfR1VJRCBpcyBudWxsIG9yIEtCX0dVSUQgPSAnJykgYW5kIFwiICsgXHJcblx0XHRcdFx0XHRcIkRPQ1VNRU5UX0dVSUQgaW4gKHNlbGVjdCBET0NVTUVOVF9HVUlEIGZyb20gV0laX0RPQ1VNRU5UX1BBUkFNIHdoZXJlIFBBUkFNX05BTUU9J0NBTEVOREFSX1JFQ1VSUkVOQ0UnKVwiO1xyXG5cclxuXHRcdGNvbnN0IGRhdGEgPSBvYmpEYXRhYmFzZS5Eb2N1bWVudHNEYXRhRnJvbVNRTChzcWwpO1xyXG5cdFx0Y29uc29sZS5sb2coZGF0YSlcclxuXHRcdGlmICggIWRhdGEgKSByZXR1cm4gZmFsc2U7XHJcblx0XHRcclxuXHRcdGNvbnN0IG9iaiA9IEpTT04ucGFyc2UoZGF0YSk7XHJcblx0XHRpZiAoICFvYmogfHwgIUFycmF5LmlzQXJyYXkob2JqKSApIHJldHVybiBmYWxzZTtcclxuXHRcdFxyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpICsrKSB7XHJcblx0XHRcdHJlcGVhdEV2ZW50cy5wdXNoKFxyXG5cdFx0XHRcdG5ldyBDYWxlbmRhckV2ZW50KG9ialtpXSwgdGhpcy4kY2FsZW5kYXIpLmdlbmVyYXRlUmVwZWF0RXZlbnRzKHN0YXJ0LCBlbmQpXHJcblx0XHRcdClcclxuXHRcdH1cclxuXHRcdHJldHVybiByZXBlYXRFdmVudHM7XHJcblx0XHRcclxuXHR9O1xyXG5cclxuXHQvLyDml6Xljobkuovku7bmi5bliqjlkI7mm7TmlrDmlbDmja5cclxuXHR1cGRhdGVFdmVudERhdGFPbkRyb3AoZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldyl7XHJcblx0XHQvLyBDYWxsIGhhc1RpbWUgb24gdGhlIGV2ZW504oCZcyBzdGFydC9lbmQgdG8gc2VlIGlmIGl0IGhhcyBiZWVuIGRyb3BwZWQgaW4gYSB0aW1lZCBvciBhbGwtZGF5IGFyZWEuXHJcblx0XHRjb25zdCBhbGxEYXkgPSAhZXZlbnQuc3RhcnQuaGFzVGltZSgpO1xyXG5cdFx0Ly8g6I635Y+W5LqL5Lu25paH5qGj5pe26Ze05pWw5o2uXHJcblx0XHRjb25zdCBkb2MgPSBvYmpEYXRhYmFzZS5Eb2N1bWVudEZyb21HVUlEKGV2ZW50LmlkKTtcclxuXHRcdC8vIOabtOaWsOaVsOaNrlxyXG5cdFx0aWYgKCBhbGxEYXkgKSB7XHJcblx0XHRcdGNvbnN0IHN0YXJ0U3RyID0gZXZlbnQuc3RhcnQuc2V0KHsnaCc6IDAsICdtJzogMCwgJ3MnOiAwfSkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRcdGNvbnN0IGVuZFN0ciA9IGV2ZW50LmVuZC5zZXQoeydoJzogMjMsICdtJzogNTksICdzJzogNTl9KS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfU1RBUlRcIiwgc3RhcnRTdHIpO1xyXG5cdFx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9FTkRcIiwgZW5kU3RyKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvbnN0IHN0YXJ0U3RyID0gZXZlbnQuc3RhcnQuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRcdGNvbnN0IGVuZFN0ciA9IGV2ZW50LmVuZC5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfU1RBUlRcIiwgc3RhcnRTdHIpO1xyXG5cdFx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9FTkRcIiwgZW5kU3RyKTtcclxuXHRcdH1cclxuXHRcdC8vVE9ETzog5pu05pawQ0FMRU5EQVJfUkVDVVJSRU5DReaVsOaNrlxyXG5cdFx0Ly8gXHJcblx0XHR0aGlzLl91cGRhdGVEb2NNb2RpZnlEYXRlKGRvYyk7XHJcblx0fTtcclxuXHJcblx0Ly8g6K6+572u5paH5qGj5bGe5oCn5YC8XHJcblx0X3NldFBhcmFtVmFsdWUoZG9jLCBrZXksIHZhbHVlKSB7XHJcblx0XHRpZiAoIWRvYykgcmV0dXJuIGZhbHNlO1xyXG5cdFx0ZG9jLlNldFBhcmFtVmFsdWUoa2V5LCB2YWx1ZSk7XHJcblx0fTtcclxuXHJcblx0Ly8g5pu05pawV2l6RG9j5L+u5pS55pe26Ze0XHJcblx0X3VwZGF0ZURvY01vZGlmeURhdGUoZG9jKXtcclxuXHRcdGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XHJcblx0XHRpZiAoIWRvYykgcmV0dXJuIGZhbHNlO1xyXG5cdFx0bm93LnNldFNlY29uZHMoKG5vdy5nZXRTZWNvbmRzKCkgKyAxKSAlIDYwKTtcclxuXHRcdGRvYy5EYXRlTW9kaWZpZWQgPSB0aGlzLl9kMnMobm93KTtcclxuXHR9O1xyXG5cclxuXHQvLyDlsIbml6XmnJ/lr7nosaHovazljJbkuLrlrZfnrKbkuLJcclxuXHQvL1RPRE86IOiAg+iZkeS+nei1lm1vbWVudOadpeeugOWMlui9rOaNoui/h+eoi1xyXG5cdF9kMnMoZHQpe1xyXG5cdFx0Y29uc3QgcmV0ID0gZHQuZ2V0RnVsbFllYXIoKSArIFwiLVwiICsgXHJcblx0XHRcdFx0XHRmb3JtYXRJbnRUb0RhdGVTdHJpbmcoZHQuZ2V0TW9udGgoKSArIDEpICsgXCItXCIgKyBcclxuXHRcdFx0XHRcdGZvcm1hdEludFRvRGF0ZVN0cmluZyhkdC5nZXREYXRlKCkpICsgXCIgXCIgKyBcclxuXHRcdFx0XHRcdGZvcm1hdEludFRvRGF0ZVN0cmluZyhkdC5nZXRIb3VycygpKSsgXCI6XCIgKyBcclxuXHRcdFx0XHRcdGZvcm1hdEludFRvRGF0ZVN0cmluZyhkdC5nZXRNaW51dGVzKCkpICsgXCI6XCIgKyBcclxuXHRcdFx0XHRcdGZvcm1hdEludFRvRGF0ZVN0cmluZyhkdC5nZXRTZWNvbmRzKCkpO1xyXG5cdFx0cmV0dXJuIHJldDtcclxuXHR9O1xyXG5cclxuXHQvLyDml6Xljobml7bpl7Tph43nva7ml7bpl7TojIPlm7TlkI7mm7TmlrDmlbDmja5cclxuXHR1cGRhdGVFdmVudERhdGFPblJlc2l6ZShldmVudCwgZGVsdGEsIHJldmVydEZ1bmMsIGpzRXZlbnQsIHVpLCB2aWV3KXtcclxuXHRcdGNvbnN0IGFsbERheSA9IGV2ZW50LnN0YXJ0Lmhhc1RpbWUoKSA/IGZhbHNlIDogdHJ1ZTtcclxuXHRcdC8vIOiOt+W+l+S6i+S7tuaWh+aho+aXtumXtOaVsOaNrlxyXG5cdFx0Y29uc3QgZG9jID0gb2JqRGF0YWJhc2UuRG9jdW1lbnRGcm9tR1VJRChldmVudC5pZCk7XHJcblx0XHQvLyDorqHnrpfmm7TmlLnlkI7nmoTnu5PmnZ/ml7bpl7RcclxuXHRcdGNvbnN0IGV2ZW50RW5kU3RyID0gZXZlbnQuZW5kLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0Ly8g5pu05paw5paH5qGj5pWw5o2uXHJcblx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9FTkRcIiwgZXZlbnRFbmRTdHIpO1xyXG5cdFx0dGhpcy5fdXBkYXRlRG9jTW9kaWZ5RGF0ZShkb2MpO1xyXG5cdH07XHJcblxyXG5cdC8vIOWIm+W7uuS6i+S7tiBzdGFydCwgZW5kLCBqc0V2ZW50LCB2aWV3XHJcblx0LyoqXHJcbiAgICAgKiDliJvlu7rkuovku7YuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IHNlbGVjdGlvbkRhdGEgRnVsbENhbGVuZGFyIOS8oOWFpeeahOaVsOaNri5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gc2VsZWN0aW9uRGF0YS5zdGFydCBNb21lbnQg57G75pel5pyf5a+56LGhLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBzZWxlY3Rpb25EYXRhLmVuZCBNb21lbnQg57G75pel5pyf5a+56LGhLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBzZWxlY3Rpb25EYXRhLmpzRXZlbnQgbmF0aXZlIEphdmFTY3JpcHQg5LqL5Lu2LlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBzZWxlY3Rpb25EYXRhLnZpZXcgRnVsbENhbGVuZGFyIOinhuWbvuWvueixoS5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gdXNlcklucHV0cyDnlKjmiLfkvKDlhaXnmoTlhbbku5bkv6Hmga8uXHJcbiAgICAgKiBUT0RPOiDor6Xmlrnms5Xlj6/ku6XmlL7nva7liLBDYWxlbmRhckV2ZW5055qE6Z2Z5oCB5pa55rOV5LiKXHJcbiAgICAgKi9cclxuXHRjcmVhdGVFdmVudChzZWxlY3Rpb25EYXRhLCB1c2VySW5wdXRzKXtcclxuXHRcdHRyeSB7XHJcblx0XHRcdC8vIOiOt+WPlueUqOaIt+iuvue9rlxyXG5cdFx0XHRjb25zdCBuZXdFdmVudCA9IG5ldyBDYWxlbmRhckV2ZW50KHtcclxuXHRcdFx0XHR0aXRsZTogdXNlcklucHV0cy50aXRsZSA/IHVzZXJJbnB1dHMudGl0bGUgOiAn5peg5qCH6aKYJyxcclxuXHRcdFx0XHRzdGFydDogc2VsZWN0aW9uRGF0YS5zdGFydCxcclxuXHRcdFx0XHRlbmQ6IHNlbGVjdGlvbkRhdGEuZW5kLFxyXG5cdFx0XHRcdGFsbERheTogc2VsZWN0aW9uRGF0YS5zdGFydC5oYXNUaW1lKCkgJiYgc2VsZWN0aW9uRGF0YS5lbmQuaGFzVGltZSgpID8gZmFsc2UgOiB0cnVlLFxyXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogdXNlcklucHV0cy5jb2xvciA/IHVzZXJJbnB1dHMuY29sb3IgOiAnIzMyQ0QzMicsXHJcblx0XHRcdH0sIHRoaXMuJGNhbGVuZGFyKTtcclxuXHRcdFx0Ly8g5L+d5a2Y5bm25riy5p+T5LqL5Lu2XHJcblx0XHRcdG5ld0V2ZW50LnNhdmVUb1dpekV2ZW50RG9jKCk7XHJcblx0XHRcdG5ld0V2ZW50LnJlZmV0Y2hEYXRhKCk7XHJcblx0XHRcdG5ld0V2ZW50LmFkZFRvRnVsbENhbGVuZGFyKCk7XHJcblx0XHR9IGNhdGNoIChlKSB7Y29uc29sZS5sb2coZSl9XHJcblx0fVxyXG5cclxufVxyXG5cclxuXHJcbi8vIFRPRE86IOmHjeWGmeiOt+WPluaVsOaNrueahOaWueW8j1xyXG5mdW5jdGlvbiBfZ2V0V2l6RXZlbnQoc3RhcnQsIGVuZCkge1xyXG5cdC8vVE9ETzpcclxuXHRsZXQgZXZlbnRzID0gW107XHJcblx0bGV0IEV2ZW50Q29sbGVjdGlvbiA9IG9iakRhdGFiYXNlLkdldENhbGVuZGFyRXZlbnRzMihzdGFydCwgZW5kKTtcclxuXHRyZXR1cm4gZXZlbnRzXHJcbn1cclxuXHJcbi8vIOiOt+W+l+a4suafk+WQjueahOmHjeWkjeaXpeacn1xyXG5mdW5jdGlvbiBnZXRSZW5kZXJSZXBlYXREYXkoKXtcclxuXHR2YXIgZGF5QXJyYXkgPSBuZXcgQXJyYXkoKTtcclxuXHR2YXIgZXZlbnRTdGFydCA9IG5ldyBEYXRlKF9zMmQoZ19ldmVudFN0YXJ0KSk7XHJcblx0XHRcclxuXHRzd2l0Y2ggKGdfcmVwZWF0UnVsZSl7XHJcbiAgICAgICAgICAgIGNhc2UgXCJFdmVyeVdlZWsxXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJFdmVyeVdlZWsyXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJFdmVyeVdlZWszXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJFdmVyeVdlZWs0XCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJFdmVyeVdlZWs1XCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJFdmVyeVdlZWs2XCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJFdmVyeVdlZWs3XCI6XHJcblx0XHRcdFx0Z2V0V2Vla2x5UmVwZWF0RGF5KGRheUFycmF5LCBbZ19yZXBlYXRSdWxlLmNoYXJBdCg5KV0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJFdmVyeVdlZWtkYXlcIjpcclxuXHRcdFx0XHRnZXRXZWVrbHlSZXBlYXREYXkoZGF5QXJyYXksIFsxLCAyLCAzLCA0LCA1XSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2Vla2RheTEzNVwiOlxyXG5cdFx0XHRcdGdldFdlZWtseVJlcGVhdERheShkYXlBcnJheSwgWzEsIDMsIDVdKTtcclxuXHRcdFx0XHRicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2Vla2RheTI0XCI6XHJcblx0XHRcdFx0Z2V0V2Vla2x5UmVwZWF0RGF5KGRheUFycmF5LCBbMiwgNF0pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnlXZWVrZGF5NjdcIjpcclxuXHRcdFx0XHRnZXRXZWVrbHlSZXBlYXREYXkoZGF5QXJyYXksIFs2LCA3XSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJEYWlseVwiOlxyXG5cdFx0XHRcdGdldFdlZWtseVJlcGVhdERheShkYXlBcnJheSwgWzEsIDIsIDMsIDQsIDUsIDYsIDddKTtcclxuXHRcdFx0XHRicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIldlZWtseVwiOi8vIOavj+WRqFxyXG5cdFx0XHRcdGdldFdlZWtseVJlcGVhdERheShkYXlBcnJheSwgW2V2ZW50U3RhcnQuZ2V0RGF5KCldKTtcclxuXHRcdFx0XHRicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5MldlZWtzXCI6XHJcblx0XHRcdFx0Z2V0V2Vla2x5UmVwZWF0RGF5KGRheUFycmF5LCBbZXZlbnRTdGFydC5nZXREYXkoKV0pO1xyXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGF5QXJyYXkubGVuZ3RoOyArKyBpKXtcclxuXHRcdFx0XHRcdHZhciBpbnRlciA9IF9pbnRlckRheXMoX2QycyhldmVudFN0YXJ0KSwgX2QycyhkYXlBcnJheVtpXVswXSkpO1xyXG5cdFx0XHRcdFx0aWYgKChwYXJzZUZsb2F0KChpbnRlci0xKS83LjApICUgMikgIT0gMCApe1xyXG5cdFx0XHRcdFx0XHRkYXlBcnJheS5zcGxpY2UoaSwgMSk7XHJcblx0XHRcdFx0XHRcdGkgLS07XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiTW9udGhseVwiOlxyXG5cdFx0XHRcdGdldE1vbnRobHlSZXBlYXREYXkoZGF5QXJyYXkpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiWWVhcmx5XCI6XHJcblx0XHRcdFx0Z2V0WWVhcmx5UmVwZWF0RGF5KGRheUFycmF5KTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Ly8gVE9ETzog5rGJ5a2X6ZyA6KaB6ICD6JmRXHJcbiAgICAgICAgICAgIGNhc2UgXCJDaGluZXNlTW9udGhseVwiOlxyXG4gICAgICAgICAgICAgICAgZ2V0Q2hpbmVzZVJlcGVhdERheShkYXlBcnJheSwgJ+aciCcpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiQ2hpbmVzZVllYXJseVwiOlxyXG4gICAgICAgICAgICAgICAgZ2V0Q2hpbmVzZVJlcGVhdERheShkYXlBcnJheSwgJ+WOhicpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0OntcclxuXHRcdFx0XHRpZiAoZ19yZXBlYXRSdWxlLmluZGV4T2YoXCJFdmVyeVdlZWtcIikgPT0gMCl7XHJcblx0XHRcdFx0XHR2YXIgZGF5cyA9IGdfcmVwZWF0UnVsZS5zdWJzdHIoXCJFdmVyeVdlZWtcIi5sZW5ndGgpLnNwbGl0KCcnKTtcclxuXHRcdFx0XHRcdGdldFdlZWtseVJlcGVhdERheShkYXlBcnJheSwgZGF5cyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG5cdHJldHVybiBkYXlBcnJheTtcclxufVxyXG5cclxuXHJcbi8qIOaVsOaNruiOt+WPllxyXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcblxyXG4vKiDmnYLpobnlkozlt6XlhbdcclxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG4vLyDliKTmlq3lhoXmoLhcclxuZnVuY3Rpb24gaXNDaHJvbWUoKSB7XHJcblx0aWYgKGdfaXNDaHJvbWUpIHJldHVybiBnX2lzQ2hyb21lO1xyXG5cdC8vXHJcblx0dmFyIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xyXG5cdGdfaXNDaHJvbWUgPSB1YS5pbmRleE9mKCdjaHJvbWUnKSAhPSAtMTtcclxuXHQvL1xyXG5cdHJldHVybiBnX2lzQ2hyb21lO1xyXG59XHJcblxyXG4vLyDlsIbmlbTmlbDovazmjaLmiJDml6XmnJ/lrZfnrKbkuLJcclxuZnVuY3Rpb24gZm9ybWF0SW50VG9EYXRlU3RyaW5nKG4pe1xyXG5cdFx0XHJcblx0cmV0dXJuIG4gPCAxMCA/ICcwJyArIG4gOiBuO1xyXG59XHJcblxyXG4vLyDmo4Dmn6Xlj4rlop7liqDmlbDlgLzlrZfnrKbkuLLplb/luqbvvIzkvovlpoLvvJonMicgLT4gJzAyJ1xyXG5mdW5jdGlvbiBjaGVja0FuZEFkZFN0ckxlbmd0aChzdHIpIHtcclxuXHRpZiAoc3RyLmxlbmd0aCA8IDIpIHtcclxuXHRcdHJldHVybiAnMCcgKyBzdHI7XHJcblx0fSBlbHNlIHtcclxuXHRcdHJldHVybiBzdHI7XHJcblx0fVxyXG59XHJcblxyXG4vLyDlsIblrZfnrKbkuLLovazljJbkuLrml6XmnJ/lr7nosaFcclxuZnVuY3Rpb24gX3MyZChzdHIpe1xyXG5cdGlmICghc3RyKVxyXG5cdFx0cmV0dXJuICcnO1xyXG5cdHZhciBkYXRlID0gbmV3IERhdGUoc3RyLnN1YnN0cigwLCA0KSxcclxuXHRcdFx0XHRcdHN0ci5zdWJzdHIoNSwgMikgLSAxLFxyXG5cdFx0XHRcdFx0c3RyLnN1YnN0cig4LCAzKSxcclxuXHRcdFx0XHRcdHN0ci5zdWJzdHIoMTEsIDIpLFxyXG5cdFx0XHRcdFx0c3RyLnN1YnN0cigxNCwgMiksXHJcblx0XHRcdFx0XHRzdHIuc3Vic3RyKDE3LCAyKVxyXG5cdFx0XHRcdFx0KTtcdFx0XHJcblx0cmV0dXJuIGRhdGU7XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgY29sb3JDb3VudDogMTIsXHJcbiAgICBjb2xvckl0ZW1zOiBbXHJcbiAgICAgICAgeyBcImNvbG9yVmFsdWVcIjogXCIjMzJDRDMyXCIsIFwiY29sb3JOYW1lXCI6ICfmqYTmpoTnu78nIH0sXHJcbiAgICAgICAgeyBcImNvbG9yVmFsdWVcIjogXCIjNTQ4NEVEXCIsIFwiY29sb3JOYW1lXCI6ICflrp3nn7Pok50nIH0sXHJcbiAgICAgICAgeyBcImNvbG9yVmFsdWVcIjogXCIjQTRCREZFXCIsIFwiY29sb3JOYW1lXCI6ICfok53oibInIH0sXHJcbiAgICAgICAgeyBcImNvbG9yVmFsdWVcIjogXCIjNDZENkRCXCIsIFwiY29sb3JOYW1lXCI6ICfpnZLnu7/oibInIH0sXHJcbiAgICAgICAgeyBcImNvbG9yVmFsdWVcIjogXCIjN0FFN0JGXCIsIFwiY29sb3JOYW1lXCI6ICfnu7/oibInIH0sXHJcbiAgICAgICAgeyBcImNvbG9yVmFsdWVcIjogXCIjNTFCNzQ5XCIsIFwiY29sb3JOYW1lXCI6ICfmuIXmlrDnu78nIH0sXHJcbiAgICAgICAgeyBcImNvbG9yVmFsdWVcIjogXCIjRkJENzVCXCIsIFwiY29sb3JOYW1lXCI6ICfpu4ToibInIH0sXHJcbiAgICAgICAgeyBcImNvbG9yVmFsdWVcIjogXCIjRkZCODc4XCIsIFwiY29sb3JOYW1lXCI6ICfmqZjoibInIH0sXHJcbiAgICAgICAgeyBcImNvbG9yVmFsdWVcIjogXCIjRkY4ODdDXCIsIFwiY29sb3JOYW1lXCI6ICfnuqLoibInIH0sXHJcbiAgICAgICAgeyBcImNvbG9yVmFsdWVcIjogXCIjREMyMTI3XCIsIFwiY29sb3JOYW1lXCI6ICflpaLljY7nuqInIH0sXHJcbiAgICAgICAgeyBcImNvbG9yVmFsdWVcIjogXCIjREJBREZGXCIsIFwiY29sb3JOYW1lXCI6ICfntKvoibInIH0sXHJcbiAgICAgICAgeyBcImNvbG9yVmFsdWVcIjogXCIjRTFFMUUxXCIsIFwiY29sb3JOYW1lXCI6ICfngbDoibInIH1cclxuICAgIF0sXHJcblxyXG59IiwiLy9UT0RPOiDliKTmlq13aW5kb3cuZXh0ZXJuYWzmmK/lkKbkuLpXaXpIdG1sRWRpdG9yQXBwXHJcbmNvbnN0IFdpekV4cGxvcmVyQXBwID0gd2luZG93LmV4dGVybmFsO1xyXG5jb25zdCBXaXpFeHBsb3JlcldpbmRvdyA9IFdpekV4cGxvcmVyQXBwLldpbmRvdztcclxuY29uc3QgV2l6RGF0YWJhc2UgPSBXaXpFeHBsb3JlckFwcC5EYXRhYmFzZTtcclxuY29uc3QgV2l6Q29tbW9uVUkgPSBXaXpFeHBsb3JlckFwcC5DcmVhdGVXaXpPYmplY3QoXCJXaXpLTUNvbnRyb2xzLldpekNvbW1vblVJXCIpO1xyXG5cclxuZnVuY3Rpb24gV2l6Q29uZmlybShtc2csIHRpdGxlKSB7XHJcbiAgICByZXR1cm4gV2l6RXhwbG9yZXJXaW5kb3cuU2hvd01lc3NhZ2UobXNnLCB0aXRsZSwgMHgwMDAwMDAyMCB8IDB4MDAwMDAwMDEpID09IDE7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIFdpekFsZXJ0KG1zZykge1xyXG4gICAgV2l6RXhwbG9yZXJXaW5kb3cuU2hvd01lc3NhZ2UobXNnLCBcIntwfVwiLCAweDAwMDAwMDQwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gV2l6QnViYmxlTWVzc2FnZSh0aXRsZSwgbXNnLCBjb2xvciA9ICcjRkZGQTlEJywgZGVsYXkgPSAnMycpIHtcclxuICAgIGNvbnN0IGFwcFBhdGggPSBXaXpDb21tb25VSS5HZXRTcGVjaWFsRm9sZGVyKFwiQXBwUGF0aFwiKTtcclxuICAgIC8vXHJcbiAgICBjb25zdCB3aXpTaGVsbEZpbGVOYW1lID0gYXBwUGF0aCArIFwiV2l6LmV4ZVwiO1xyXG4gICAgY29uc3QgZGxsRmlsZU5hbWUgPSBhcHBQYXRoICsgXCJXaXpUb29scy5kbGxcIjtcclxuICAgIC8vXHJcbiAgICBjb25zdCBwYXJhbXMgPSBgXCIke2RsbEZpbGVOYW1lfVwiIFdpelRvb2xzU2hvd0J1YmJsZVdpbmRvdzJFeCAvVGl0bGU9JHt0aXRsZX0gL0xpbmtUZXh0PSR7bXNnfSAvTGlua1VSTD1AIC9Db2xvcj0ke2NvbG9yfSAvRGVsYXk9JHtkZWxheX1gO1xyXG4gICAgLy9cclxuICAgIFdpekNvbW1vblVJLlJ1bkV4ZSh3aXpTaGVsbEZpbGVOYW1lLCBwYXJhbXMsIGZhbHNlKTtcclxufVxyXG5cclxuY2xhc3MgV2l6U2hlbGwge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGRsbEZpbGVOYW1lLCBkbGxFeHBvcnRGdW5jLCBwYXJhbXMpIHtcclxuICAgICAgICAvL+S9v+eUqGRsbOWvvOWHuuWHveaVsO+8jOWkp+mDqOWIhuWFpeWPguaXtuWRveS7pOihjOaWueW8j++8jOWFt+S9k+WPguaVsOayoeacieivtOaYju+8jOaciemcgOimgeiBlOezu+W8gOWPkeS6uuWRmFxyXG4gICAgICAgIGNvbnN0IGFwcFBhdGggPSBXaXpDb21tb25VSS5HZXRTcGVjaWFsRm9sZGVyKFwiQXBwUGF0aFwiKTtcclxuICAgICAgICB0aGlzLmFwcFBhdGggPSBhcHBQYXRoXHJcbiAgICAgICAgdGhpcy53aXpFeGUgPSBhcHBQYXRoICsgXCJXaXouZXhlXCI7XHJcbiAgICAgICAgdGhpcy5kbGxGaWxlTmFtZSA9IGRsbEZpbGVOYW1lID8gYXBwUGF0aCArIGRsbEZpbGVOYW1lIDogYXBwUGF0aCArICdXaXpLTUNvbnRyb2xzLmRsbCc7XHJcbiAgICAgICAgdGhpcy5kbGxFeHBvcnRGdW5jID0gZGxsRXhwb3J0RnVuYyB8fCAnV2l6S01SdW5TY3JpcHQnO1xyXG4gICAgICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xyXG4gICAgfVxyXG5cclxuICAgIHJ1blNjcmlwdEZpbGUoc2NyaXB0RmlsZU5hbWUsIHNjcmlwdFBhcmFtcykge1xyXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IGBcIiR7dGhpcy5hcHBQYXRoICsgJ1dpektNQ29udHJvbHMuZGxsJ31cIiBXaXpLTVJ1blNjcmlwdCAvU2NyaXB0RmlsZU5hbWU9JHtzY3JpcHRGaWxlTmFtZX0gJHtzY3JpcHRQYXJhbXN9YDtcclxuICAgICAgICBXaXpDb21tb25VSS5SdW5FeGUodGhpcy53aXpFeGUsIHBhcmFtcywgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHdpekJ1YmJsZU1lc3NhZ2UodGl0bGUsIG1zZywgY29sb3IgPSAnI0ZGRkE5RCcsIGRlbGF5ID0gJzMnKSB7XHJcbiAgICAgICAgV2l6QnViYmxlTWVzc2FnZSh0aXRsZSwgbXNnLCBjb2xvciwgZGVsYXkpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXRXaXpJbnRlcmZhY2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgV2l6RXhwbG9yZXJBcHAsIFdpekV4cGxvcmVyV2luZG93LCBXaXpEYXRhYmFzZSwgV2l6Q29tbW9uVUlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFxyXG4gICAgV2l6RXhwbG9yZXJBcHAsIFxyXG4gICAgV2l6RXhwbG9yZXJXaW5kb3csIFxyXG4gICAgV2l6RGF0YWJhc2UsIFxyXG4gICAgV2l6Q29tbW9uVUksIFxyXG4gICAgV2l6Q29uZmlybSwgXHJcbiAgICBXaXpBbGVydCwgXHJcbiAgICBXaXpCdWJibGVNZXNzYWdlLCBcclxuICAgIFdpelNoZWxsIFxyXG59O1xyXG4iXSwic291cmNlUm9vdCI6IiJ9