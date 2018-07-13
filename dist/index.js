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
/******/ 	var hotCurrentHash = "da9e29be1b8cce2d5bd3"; // eslint-disable-line no-unused-vars
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
exports.push([module.i, "#calendar-container {\r\n    position: fixed;\r\n    top: 0;\r\n    left: 8px;\r\n    right: 8px;\r\n    bottom: 8px;\r\n}\r\n\r\n.fc-header-toolbar {\r\n    /*\r\n    the calendar will be butting up against the edges,\r\n    but let's scoot in the header's buttons\r\n    */\r\n    padding-top: 14px;\r\n    padding-left: 0;\r\n    padding-right: 0;\r\n}", ""]);

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
exports.push([module.i, "html, body {\r\n    overflow: hidden;\r\n    font-size: 14px;\r\n}\r\n\r\n:focus {\r\n    outline:none;\r\n}\r\n\r\n/* Fonts.css -- 跨平台中文字体解决方案\r\n-----------------------------------------------------------------*/\r\n.font-hei {font-family: -apple-system, \"Noto Sans\", \"Helvetica Neue\", Helvetica, \"Nimbus Sans L\", Arial, \"Liberation Sans\", \"PingFang SC\", \"Hiragino Sans GB\", \"Noto Sans CJK SC\", \"Source Han Sans SC\", \"Source Han Sans CN\", \"Microsoft YaHei\", \"Wenquanyi Micro Hei\", \"WenQuanYi Zen Hei\", \"ST Heiti\", SimHei, \"WenQuanYi Zen Hei Sharp\", sans-serif;}\r\n.font-kai {font-family: Baskerville, Georgia, \"Liberation Serif\", \"Kaiti SC\", STKaiti, \"AR PL UKai CN\", \"AR PL UKai HK\", \"AR PL UKai TW\", \"AR PL UKai TW MBE\", \"AR PL KaitiM GB\", KaiTi, KaiTi_GB2312, DFKai-SB, \"TW-Kai\", serif;}\r\n.font-song {font-family: Georgia, \"Nimbus Roman No9 L\", \"Songti SC\", \"Noto Serif CJK SC\", \"Source Han Serif SC\", \"Source Han Serif CN\", STSong, \"AR PL New Sung\", \"AR PL SungtiL GB\", NSimSun, SimSun, \"TW-Sung\", \"WenQuanYi Bitmap Song\", \"AR PL UMing CN\", \"AR PL UMing HK\", \"AR PL UMing TW\", \"AR PL UMing TW MBE\", PMingLiU, MingLiU, serif;}\r\n.font-fang-song {font-family: Baskerville, \"Times New Roman\", \"Liberation Serif\", STFangsong, FangSong, FangSong_GB2312, \"CWTEX-F\", serif;}\r\n\r\n/* 临时放置\r\n-------------------------------------*/\r\n\r\n.ui-button-icon-only.splitbutton-select {\r\n    width: 1em;\r\n}\r\n\r\na[data-goto] {\r\n    color: #000;\r\n}\r\n\r\n/* Bootstrap 4 组件样式\r\n-------------------------------------------------------------------------*/\r\n\r\n/* 表单\r\n-------------------------------------*/\r\n.col-form-label {\r\n    padding-top: calc(.375rem + 1px);\r\n    padding-bottom: calc(.375rem + 1px);\r\n    margin-bottom: 0;\r\n    font-size: inherit;\r\n    line-height: 1.5;\r\n}\r\n\r\n.input-group-addon {\r\n  border-left-width: 0;\r\n  border-right-width: 0;\r\n}\r\n.input-group-addon:first-child {\r\n  border-left-width: 1px;\r\n}\r\n.input-group-addon:last-child {\r\n  border-right-width: 1px;\r\n}\r\n\r\n/* 事件渲染\r\n-------------------------------------------------------------------------*/\r\n.tc-complete {\r\n    opacity: 0.3;\r\n\r\n}\r\n\r\n.tc-complete > .fc-content {\r\n    text-decoration: line-through !important;\r\n}\r\n\r\n.tc-complete:hover {\r\n    opacity: 1;\r\n}", ""]);

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


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _Calendar = __webpack_require__(/*! ./components/Calendar/Calendar */ "./src/components/Calendar/Calendar.js");

var _Calendar2 = _interopRequireDefault(_Calendar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { id: 'wiz-tomato-calendar' },
        _react2.default.createElement(_Calendar2.default, null)
      );
    }
  }]);

  return App;
}(_react2.default.Component);

exports.default = App;

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
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _FullCalendar = __webpack_require__(/*! ./FullCalendar */ "./src/components/Calendar/FullCalendar.js");

var _FullCalendar2 = _interopRequireDefault(_FullCalendar);

__webpack_require__(/*! fullcalendar-reactwrapper/dist/css/fullcalendar.min.css */ "./node_modules/fullcalendar-reactwrapper/dist/css/fullcalendar.min.css");

__webpack_require__(/*! ./Calendar.css */ "./src/components/Calendar/Calendar.css");

var _WizEventDataLoader = __webpack_require__(/*! ../../models/WizEventDataLoader */ "./src/models/WizEventDataLoader.js");

var _WizEventDataLoader2 = _interopRequireDefault(_WizEventDataLoader);

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
        _this.dataLoader = new _WizEventDataLoader2.default();
        //绑定句柄
        _this.onViewRender = _this.onViewRender.bind(_this);
        return _this;
    }

    _createClass(Calendar, [{
        key: 'onViewRender',
        value: function onViewRender(view, element) {
            var calendar = $('#calendar');
            var eventSources = this.dataLoader.getEventSources(view, element);
            calendar.fullCalendar('removeEvents');
            for (var i = 0; i < eventSources.length; i++) {
                calendar.fullCalendar('addEventSource', eventSources[i]);
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            //$('#calendar').fullCalendar('option', {
            //    viewRender: this.onViewRender
            //});
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { id: 'calendar-container' },
                _react2.default.createElement(_FullCalendar2.default
                // 基本配置
                , { id: 'calendar',
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
                    /**
                     * 设置事件句柄
                     * 因为fullcalendar-reactWrapper的实现是直接返回<div id='fullcalendar'></div>
                     * 并且调用$('#fullcalendar').fullcalendar(this.props)进行构建，因此React并没有
                     * 管理FullCalendar状态和渲染的能力。因此直接在设置中做好callback，让插件自我管理。
                     */
                    , viewRender: this.onViewRender
                })
            );
        }
    }]);

    return Calendar;
}(_react2.default.Component);

exports.default = Calendar;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

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

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _jquery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

var _jquery2 = _interopRequireDefault(_jquery);

var _fullcalendar = __webpack_require__(/*! fullcalendar */ "./node_modules/fullcalendar/dist/fullcalendar.js");

var _fullcalendar2 = _interopRequireDefault(_fullcalendar);

var _moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FullcalendarObjectMapper = function () {
	function FullcalendarObjectMapper() {
		_classCallCheck(this, FullcalendarObjectMapper);
	}

	_createClass(FullcalendarObjectMapper, [{
		key: "getSettings",
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
		_this.root = null;
		_this.instance = null;
		_this.date = new Date();
		return _this;
	}

	_createClass(FullCalendar, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var objectMapperSettings = this.fullcalendarObjectMapper.getSettings(this.props);
			this.instance = this.jq("#" + this.root).fullCalendar(objectMapperSettings);
		}
	}, {
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(nextProps) {
			this.jq("#" + this.root).fullCalendar('destroy');
			var objectMapperSettings = this.fullcalendarObjectMapper.getSettings(nextProps);
			this.instance = this.jq("#" + this.root).fullCalendar(objectMapperSettings);
		}
	}, {
		key: "render",
		value: function render() {
			this.root = this.props.id || 'ID' + this.date.getTime();
			return _react2.default.createElement("div", { id: this.root });
		}
	}]);

	return FullCalendar;
}(_react2.default.Component);

exports.default = FullCalendar;

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


var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");

var _reactDom2 = _interopRequireDefault(_reactDom);

__webpack_require__(/*! fullcalendar-reactwrapper/dist/css/fullcalendar.min.css */ "./node_modules/fullcalendar-reactwrapper/dist/css/fullcalendar.min.css");

__webpack_require__(/*! bootstrap/dist/css/bootstrap.css */ "./node_modules/bootstrap/dist/css/bootstrap.css");

__webpack_require__(/*! bootstrap/dist/css/bootstrap-theme.css */ "./node_modules/bootstrap/dist/css/bootstrap-theme.css");

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
	function CalendarEvent(data) {
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
			// 注意方法返回的只是FullCalendarEvent的数据类型，并不是event对象
			var that = this;
			var newEvent = {};
			var keys = Object.keys(this);
			// 去除非必要属性
			keys.splice(keys.findIndex(function (i) {
				return i == '_Info';
			}), 1);
			keys.splice(keys.findIndex(function (i) {
				return i == '_ExtraInfo';
			}), 1);
			// 浅拷贝, 不过主要属性都是基本数据类型，所以不存在引用问题
			keys.forEach(function (item, index, arr) {
				newEvent[item] = that[item];
			});
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
		key: 'addToFullCalendar',
		value: function addToFullCalendar() {
			//TODO: 将自身添加到FullCalendar
			$('#calendar').fullCalendar('addEventSource', {
				events: [this.toFullCalendarEvent()]
			});
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
			// 移除FullCalendar事件
			$('#calendar').fullCalendar('removeEvents', this.id);
			// 移除日历数据
			doc.RemoveFromCalendar();
			// 删除文档
			if (isDeleteDoc) doc.Delete();
		}
	}, {
		key: 'refetchData',
		value: function refetchData() {
			//TODO: 重数据库重新获取数据更新实例
		}
	}, {
		key: 'refreshEvent',
		value: function refreshEvent(event) {
			//TODO: 应该自动遍历并修改属性
			if (event) {
				// 重新渲染FullCalendar事件
				event.title = this.title;
				event.backgroundColor = this.backgroundColor;
				$('#calendar').fullCalendar('updateEvent', event);
			} else {
				//用.fullCalendar( ‘clientEvents’ [, idOrFilter ] ) -> Array 获取源数据从而更新
				//TODO: 遍历并寻找GUID匹配的事件
			}
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
	function WizEventDataLoader(start, end) {
		_classCallCheck(this, WizEventDataLoader);

		if (!_WizInterface.WizDatabase) throw new Error('WizDatabase not valid !');
		this.Database = _WizInterface.WizDatabase;
		this.userName = _WizInterface.WizDatabase.UserName;
		this.start = start;
		this.end = end;
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
			try {
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
				newEvent.addToFullCalendar();
			} catch (e) {
				console.log(e);
			}
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
    objWindow.ShowMessage(msg, "{p}", 0x00000040);
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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQ2FsZW5kYXIvQ2FsZW5kYXIuY3NzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUgc3luYyBeXFwuXFwvLiokIiwid2VicGFjazovLy8uL3NyYy9BcHAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQ2FsZW5kYXIvQ2FsZW5kYXIuY3NzP2NhMTQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQ2FsZW5kYXIvQ2FsZW5kYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQ2FsZW5kYXIvRnVsbENhbGVuZGFyLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5jc3M/ZDhjMyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVscy9DYWxlbmRhckV2ZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9tb2RlbHMvV2l6RXZlbnREYXRhTG9hZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9Db25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL1dpekludGVyZmFjZS5qcyJdLCJuYW1lcyI6WyJBcHAiLCJwcm9wcyIsIlJlYWN0IiwiQ29tcG9uZW50IiwiQ2FsZW5kYXIiLCJzdGF0ZSIsImV2ZW50cyIsImRhdGFMb2FkZXIiLCJXaXpFdmVudERhdGFMb2FkZXIiLCJvblZpZXdSZW5kZXIiLCJiaW5kIiwidmlldyIsImVsZW1lbnQiLCJjYWxlbmRhciIsIiQiLCJldmVudFNvdXJjZXMiLCJnZXRFdmVudFNvdXJjZXMiLCJmdWxsQ2FsZW5kYXIiLCJpIiwibGVuZ3RoIiwibGVmdCIsImNlbnRlciIsInJpZ2h0IiwidG9kYXkiLCJtb250aCIsIndlZWsiLCJkYXkiLCJsaXN0IiwiYWdlbmRhIiwibWluVGltZSIsInNsb3RMYWJlbEZvcm1hdCIsIkZ1bGxjYWxlbmRhck9iamVjdE1hcHBlciIsInByb3BlcnRpZXMiLCJuZXdTZXR0aW5ncyIsImtleSIsImhhc093blByb3BlcnR5IiwiRnVsbENhbGVuZGFyIiwianEiLCJub0NvbmZsaWN0IiwiZnVsbGNhbGVuZGFyT2JqZWN0TWFwcGVyIiwicm9vdCIsImluc3RhbmNlIiwiZGF0ZSIsIkRhdGUiLCJvYmplY3RNYXBwZXJTZXR0aW5ncyIsImdldFNldHRpbmdzIiwibmV4dFByb3BzIiwiaWQiLCJnZXRUaW1lIiwiUmVhY3RET00iLCJyZW5kZXIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiQ2FsZW5kYXJFdmVudCIsImRhdGEiLCJnX2RiIiwiRXJyb3IiLCJ0eXBlIiwiX2NoZWNrRGF0YVR5cGUiLCJfY3JlYXRlIiwiZG9jIiwiRG9jdW1lbnRGcm9tR1VJRCIsIm5ld0V2ZW50RGF0YSIsIkdldFBhcmFtVmFsdWUiLCJEYXRlQ3JlYXRlZCIsImZvcm1hdCIsIkdVSUQiLCJUaXRsZSIsIkRhdGVNb2RpZmllZCIsImUiLCJjb25zb2xlIiwiZXJyb3IiLCJzdGFydCIsImVuZCIsImJrQ29sb3IiLCJhbGxEYXkiLCJjb21wbGV0ZSIsImRhdGVDb21wbGV0ZWQiLCJycHRSdWxlIiwicnB0RW5kIiwiX0luZm8iLCJfcGFyc2VJbmZvIiwiQ0FMRU5EQVJfSU5GTyIsIl9FeHRyYUluZm8iLCJDQUxFTkRBUl9FWFRSQUlORk8iLCJfZ2V0RGVmYXVsdEV4dHJhSW5mbyIsImd1aWQiLCJDQUxFTkRBUl9TVEFSVCIsIkNBTEVOREFSX0VORCIsImNpIiwicGFyc2VJbnQiLCJiIiwiQ29uZmlnIiwiY29sb3JJdGVtcyIsImNvbG9yVmFsdWUiLCJpbmRleE9mIiwiQ29tcGxldGUiLCJEYXRlQ29tcGxldGVkIiwiQ0FMRU5EQVJfUkVDVVJSRU5DRSIsIkNBTEVOREFSX0VORFJFQ1VSUkVOQ0UiLCJiYWNrZ3JvdW5kQ29sb3IiLCJtb21lbnQiLCJoYXNUaW1lIiwidGl0bGUiLCJjcmVhdGVkIiwidXBkYXRlZCIsInRleHRDb2xvciIsIl91cGRhdGUiLCJvYmpDbGFzcyIsImNvbnN0cnVjdG9yIiwiR1VJRF9SZWdFeHIiLCJTdHJpbmciLCJ0ZXN0IiwiT2JqZWN0IiwiSW5mb1N0cmluZyIsIkluZm9PYmplY3QiLCJJbmZvQXJyYXkiLCJzcGxpdCIsImZvckVhY2giLCJpdGVtIiwiaW5kZXgiLCJhcnIiLCJwYWlyIiwiSW5mb09iamVjdEtleXNBcnJheSIsImtleXMiLCJzaW5nbGVJbmZvIiwicHVzaCIsImpvaW4iLCJyZXBsYWNlIiwiX3VwZGF0ZUluZm8iLCJfdXBkYXRlRXh0cmFJbmZvIiwidGhhdCIsIkV4dHJhSW5mb09iamVjdCIsImNvbnRlbnQiLCJodG1sVGV4dCIsImV2ZW50U291cmNlIiwiZGF5QXJyYXkiLCJfZ2V0UmVuZGVyUmVwZWF0RGF5IiwibmV3RXZlbnQiLCJ0b0Z1bGxDYWxlbmRhckV2ZW50IiwiYWRkIiwiZGlmZiIsInJlZ2V4IiwiY291bnQiLCJjdXJXZWVrRGF5IiwicmVzdWx0cyIsImV4ZWMiLCJpbnRlcldlZWsiLCJudW1iZXIiLCJfZ2V0V2Vla2x5UmVwZWF0RGF5IiwicGVyUnVsZSIsIl9nZXRQZXJSZXBlYXREYXlzIiwiaW50ZXJXZWVrcyIsInZpZXdTdGFydCIsInZpZXdFbmQiLCJpbnRlcnZhbFdlZWtzIiwid2Vla2RheXMiLCJuZXdFdmVudFN0YXJ0RGF0ZSIsImV2ZW50U3RhcnQiLCJzZXQiLCJnZXQiLCJpc1NhbWUiLCJpc0JlZm9yZSIsInBlclJ1bGVNYXAiLCJzcGxpY2UiLCJmaW5kSW5kZXgiLCJfc3RyaW5naWZ5SW5mbyIsInN0YXJ0U3RyIiwiZW5kU3RyIiwiX3NldFBhcmFtVmFsdWUiLCJ2YWx1ZSIsIlNldFBhcmFtVmFsdWUiLCJsb2NhdGlvbiIsIm9iakZvbGRlciIsIkdldEZvbGRlckJ5TG9jYXRpb24iLCJ0ZW1wSHRtbCIsImdfY21uIiwiR2V0QVRlbXBGaWxlTmFtZSIsIl9nZXRFdmVudEh0bWwiLCJTYXZlVGV4dFRvRmlsZSIsIkNyZWF0ZURvY3VtZW50MiIsIkNoYW5nZVRpdGxlQW5kRmlsZU5hbWUiLCJVcGRhdGVEb2N1bWVudDYiLCJ0b1dpekV2ZW50RGF0YSIsIkFkZFRvQ2FsZW5kYXIiLCJwcm9wIiwiZ3VpZFJlZ2V4IiwiaXNXaXpEb2NFeGlzdCIsIl9zYXZlQWxsUHJvcCIsIl9jcmVhdGVXaXpFdmVudERvYyIsImlzRGVsZXRlRG9jIiwiUmVtb3ZlRnJvbUNhbGVuZGFyIiwiRGVsZXRlIiwiZXZlbnQiLCJvYmpEYXRhYmFzZSIsIkRhdGFiYXNlIiwidXNlck5hbWUiLCJVc2VyTmFtZSIsImdlbmVyYWxFdmVudFNvdXJjZSIsIl9nZXRBbGxPcmlnaW5hbEV2ZW50IiwicmVwZWF0RXZlbnRTb3VyY2VzIiwiX2dldEFsbFJlcGVhdEV2ZW50IiwiY29uY2F0Iiwic3FsIiwiYW5kMSIsImFuZDIiLCJEb2N1bWVudHNEYXRhRnJvbVNRTCIsIm9iaiIsIkpTT04iLCJwYXJzZSIsIkFycmF5IiwiaXNBcnJheSIsImVyciIsInJlcGVhdEV2ZW50cyIsImxvZyIsImdlbmVyYXRlUmVwZWF0RXZlbnRzIiwiZGVsdGEiLCJyZXZlcnRGdW5jIiwianNFdmVudCIsInVpIiwiX3VwZGF0ZURvY01vZGlmeURhdGUiLCJub3ciLCJzZXRTZWNvbmRzIiwiZ2V0U2Vjb25kcyIsIl9kMnMiLCJkdCIsInJldCIsImdldEZ1bGxZZWFyIiwiZm9ybWF0SW50VG9EYXRlU3RyaW5nIiwiZ2V0TW9udGgiLCJnZXREYXRlIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZXZlbnRFbmRTdHIiLCJzZWxlY3Rpb25EYXRhIiwidXNlcklucHV0cyIsImNvbG9yIiwic2F2ZVRvV2l6RXZlbnREb2MiLCJyZWZldGNoRGF0YSIsImFkZFRvRnVsbENhbGVuZGFyIiwiX2dldFdpekV2ZW50IiwiRXZlbnRDb2xsZWN0aW9uIiwiR2V0Q2FsZW5kYXJFdmVudHMyIiwiZ2V0UmVuZGVyUmVwZWF0RGF5IiwiX3MyZCIsImdfZXZlbnRTdGFydCIsImdfcmVwZWF0UnVsZSIsImdldFdlZWtseVJlcGVhdERheSIsImNoYXJBdCIsImdldERheSIsImludGVyIiwiX2ludGVyRGF5cyIsInBhcnNlRmxvYXQiLCJnZXRNb250aGx5UmVwZWF0RGF5IiwiZ2V0WWVhcmx5UmVwZWF0RGF5IiwiZ2V0Q2hpbmVzZVJlcGVhdERheSIsImRheXMiLCJzdWJzdHIiLCJpc0Nocm9tZSIsImdfaXNDaHJvbWUiLCJ1YSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsInRvTG93ZXJDYXNlIiwibiIsImNoZWNrQW5kQWRkU3RyTGVuZ3RoIiwic3RyIiwiY29sb3JDb3VudCIsIldpekV4cGxvcmVyQXBwIiwid2luZG93IiwiZXh0ZXJuYWwiLCJXaXpFeHBsb3JlcldpbmRvdyIsIldpbmRvdyIsIldpekRhdGFiYXNlIiwiV2l6Q29tbW9uVUkiLCJDcmVhdGVXaXpPYmplY3QiLCJXaXpDb25maXJtIiwibXNnIiwiU2hvd01lc3NhZ2UiLCJXaXpBbGVydCIsIm9ialdpbmRvdyIsIldpekJ1YmJsZU1lc3NhZ2UiLCJkZWxheSIsImFwcFBhdGgiLCJHZXRTcGVjaWFsRm9sZGVyIiwid2l6U2hlbGxGaWxlTmFtZSIsImRsbEZpbGVOYW1lIiwicGFyYW1zIiwiUnVuRXhlIiwiV2l6U2hlbGwiLCJkbGxFeHBvcnRGdW5jIiwid2l6RXhlIiwic2NyaXB0RmlsZU5hbWUiLCJzY3JpcHRQYXJhbXMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFRLG9CQUFvQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUFpQiw0QkFBNEI7QUFDN0M7QUFDQTtBQUNBLDBCQUFrQiwyQkFBMkI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNVFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsRzs7O0FBQ25CLGVBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxxR0FDWEEs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QUVnQnhMLEssRUFBTzhLLEcsRUFBcUM7QUFBQSxnQkFBaEN6QyxLQUFnQyx1RUFBeEIsU0FBd0I7QUFBQSxnQkFBYjhDLEtBQWEsdUVBQUwsR0FBSzs7QUFDekRELDZCQUFpQmxMLEtBQWpCLEVBQXdCOEssR0FBeEIsRUFBNkJ6QyxLQUE3QixFQUFvQzhDLEtBQXBDO0FBQ0g7OzswQ0FFd0I7QUFDckIsbUJBQU87QUFDSGQsOENBREcsRUFDYUcsb0NBRGIsRUFDZ0NFLHdCQURoQyxFQUM2Q0M7QUFEN0MsYUFBUDtBQUdIOzs7Ozs7UUFJRE4sYyxHQUFBQSxjO1FBQ0FHLGlCLEdBQUFBLGlCO1FBQ0FFLFcsR0FBQUEsVztRQUNBQyxXLEdBQUFBLFc7UUFDQUUsVSxHQUFBQSxVO1FBQ0FHLFEsR0FBQUEsUTtRQUNBRSxnQixHQUFBQSxnQjtRQUNBUSxRLEdBQUFBLFEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG4gXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gd2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHRcdGlmIChwYXJlbnRIb3RVcGRhdGVDYWxsYmFjaykgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0fSA7XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XG4gXHRcdDtcbiBcdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QocmVxdWVzdFRpbWVvdXQpIHtcbiBcdFx0cmVxdWVzdFRpbWVvdXQgPSByZXF1ZXN0VGltZW91dCB8fCAxMDAwMDtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QobmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0XCIpKTtcbiBcdFx0XHR9XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIjtcbiBcdFx0XHRcdHJlcXVlc3Qub3BlbihcIkdFVFwiLCByZXF1ZXN0UGF0aCwgdHJ1ZSk7XG4gXHRcdFx0XHRyZXF1ZXN0LnRpbWVvdXQgPSByZXF1ZXN0VGltZW91dDtcbiBcdFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHJldHVybjtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xuIFx0XHRcdFx0XHQvLyB0aW1lb3V0XG4gXHRcdFx0XHRcdHJlamVjdChcbiBcdFx0XHRcdFx0XHRuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpXG4gXHRcdFx0XHRcdCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcbiBcdFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuIFx0XHRcdFx0XHRyZXNvbHZlKCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xuIFx0XHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXG4gXHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdC8vIHN1Y2Nlc3NcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcbiBcdFx0XHRcdFx0XHRyZWplY3QoZSk7XG4gXHRcdFx0XHRcdFx0cmV0dXJuO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdHJlc29sdmUodXBkYXRlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCJkYTllMjliZTFiOGNjZTJkNWJkM1wiOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90UmVxdWVzdFRpbWVvdXQgPSAxMDAwMDtcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xuIFx0dmFyIGhvdEN1cnJlbnRDaGlsZE1vZHVsZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50c1RlbXAgPSBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmICghbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG4gXHRcdFx0XHRcdFx0cmVxdWVzdCArXG4gXHRcdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0KTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9LFxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fTtcbiBcdFx0Zm9yICh2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcImVcIiAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJ0XCJcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKSBob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0dGhyb3cgZXJyO1xuIFx0XHRcdH0pO1xuXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcbiBcdFx0XHRcdFx0aWYgKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH07XG4gXHRcdGZuLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRcdGlmIChtb2RlICYgMSkgdmFsdWUgPSBmbih2YWx1ZSk7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udCh2YWx1ZSwgbW9kZSAmIH4xKTtcbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBkZXAgPT09IFwidW5kZWZpbmVkXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdFx0ZWxzZSBob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGRlcCA9PT0gXCJ1bmRlZmluZWRcIikgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGlmICghbCkgcmV0dXJuIGhvdFN0YXR1cztcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cbiBcdFx0fTtcbiBcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xuIFx0XHRyZXR1cm4gaG90O1xuIFx0fVxuXG4gXHR2YXIgaG90U3RhdHVzSGFuZGxlcnMgPSBbXTtcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcblxuIFx0ZnVuY3Rpb24gaG90U2V0U3RhdHVzKG5ld1N0YXR1cykge1xuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XG4gXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaG90U3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xuIFx0fVxuXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XG4gXHR2YXIgaG90Q2h1bmtzTG9hZGluZyA9IDA7XG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RBdmFpbGFibGVGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdERlZmVycmVkO1xuXG4gXHQvLyBUaGUgdXBkYXRlIGluZm9cbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcbiBcdFx0dmFyIGlzTnVtYmVyID0gK2lkICsgXCJcIiA9PT0gaWQ7XG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSkge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcImlkbGVcIikge1xuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuIFx0XHR9XG4gXHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XG4gXHRcdHJldHVybiBob3REb3dubG9hZE1hbmlmZXN0KGhvdFJlcXVlc3RUaW1lb3V0KS50aGVuKGZ1bmN0aW9uKHVwZGF0ZSkge1xuIFx0XHRcdGlmICghdXBkYXRlKSB7XG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRcdFx0cmV0dXJuIG51bGw7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90QXZhaWxhYmxlRmlsZXNNYXAgPSB1cGRhdGUuYztcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdXBkYXRlLmg7XG5cbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRob3REZWZlcnJlZCA9IHtcbiBcdFx0XHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcbiBcdFx0XHRcdFx0cmVqZWN0OiByZWplY3RcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0aG90VXBkYXRlID0ge307XG4gXHRcdFx0Zm9yKHZhciBjaHVua0lkIGluIGluc3RhbGxlZENodW5rcylcbiBcdFx0XHR7XG4gXHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWxvbmUtYmxvY2tzXG4gXHRcdFx0XHQvKmdsb2JhbHMgY2h1bmtJZCAqL1xuIFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIgJiZcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiZcbiBcdFx0XHRcdGhvdFdhaXRpbmdGaWxlcyA9PT0gMFxuIFx0XHRcdCkge1xuIFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gcHJvbWlzZTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSB8fCAhaG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0pXG4gXHRcdFx0cmV0dXJuO1xuIFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IGZhbHNlO1xuIFx0XHRmb3IgKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYgKC0taG90V2FpdGluZ0ZpbGVzID09PSAwICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDApIHtcbiBcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzKys7XG4gXHRcdFx0aG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RVcGRhdGVEb3dubG9hZGVkKCkge1xuIFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcbiBcdFx0dmFyIGRlZmVycmVkID0gaG90RGVmZXJyZWQ7XG4gXHRcdGhvdERlZmVycmVkID0gbnVsbDtcbiBcdFx0aWYgKCFkZWZlcnJlZCkgcmV0dXJuO1xuIFx0XHRpZiAoaG90QXBwbHlPblVwZGF0ZSkge1xuIFx0XHRcdC8vIFdyYXAgZGVmZXJyZWQgb2JqZWN0IGluIFByb21pc2UgdG8gbWFyayBpdCBhcyBhIHdlbGwtaGFuZGxlZCBQcm9taXNlIHRvXG4gXHRcdFx0Ly8gYXZvaWQgdHJpZ2dlcmluZyB1bmNhdWdodCBleGNlcHRpb24gd2FybmluZyBpbiBDaHJvbWUuXG4gXHRcdFx0Ly8gU2VlIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ2NTY2NlxuIFx0XHRcdFByb21pc2UucmVzb2x2ZSgpXG4gXHRcdFx0XHQudGhlbihmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIGhvdEFwcGx5KGhvdEFwcGx5T25VcGRhdGUpO1xuIFx0XHRcdFx0fSlcbiBcdFx0XHRcdC50aGVuKFxuIFx0XHRcdFx0XHRmdW5jdGlvbihyZXN1bHQpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XG4gXHRcdFx0XHRcdH0sXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnIpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHQpO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2godG9Nb2R1bGVJZChpZCkpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucykge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcInJlYWR5XCIpXG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xuIFx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuIFx0XHR2YXIgY2I7XG4gXHRcdHZhciBpO1xuIFx0XHR2YXIgajtcbiBcdFx0dmFyIG1vZHVsZTtcbiBcdFx0dmFyIG1vZHVsZUlkO1xuXG4gXHRcdGZ1bmN0aW9uIGdldEFmZmVjdGVkU3R1ZmYodXBkYXRlTW9kdWxlSWQpIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW3VwZGF0ZU1vZHVsZUlkXTtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuIFx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpLm1hcChmdW5jdGlvbihpZCkge1xuIFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0Y2hhaW46IFtpZF0sXG4gXHRcdFx0XHRcdGlkOiBpZFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWVJdGVtLmlkO1xuIFx0XHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1kZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9tYWluKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRpZiAoIXBhcmVudCkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHRcdH07XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcbiBcdFx0XHRcdFx0cXVldWUucHVzaCh7XG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRpZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuXG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcbiBcdFx0XHRcdG1vZHVsZUlkOiB1cGRhdGVNb2R1bGVJZCxcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxuIFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXG4gXHRcdFx0fTtcbiBcdFx0fVxuXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcbiBcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdHZhciBpdGVtID0gYltpXTtcbiBcdFx0XHRcdGlmIChhLmluZGV4T2YoaXRlbSkgPT09IC0xKSBhLnB1c2goaXRlbSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxuIFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xuXG4gXHRcdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUoKSB7XG4gXHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCJcbiBcdFx0XHQpO1xuIFx0XHR9O1xuXG4gXHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XG4gXHRcdFx0XHQvKiogQHR5cGUge1RPRE99ICovXG4gXHRcdFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRcdFx0aWYgKGhvdFVwZGF0ZVtpZF0pIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGVJZCk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJkaXNwb3NlZFwiLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBpZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0LyoqIEB0eXBlIHtFcnJvcnxmYWxzZX0gKi9cbiBcdFx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XG4gXHRcdFx0XHRpZiAocmVzdWx0LmNoYWluKSB7XG4gXHRcdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcbiBcdFx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0XCIgaW4gXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wYXJlbnRJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uVW5hY2NlcHRlZCkgb3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25BY2NlcHRlZCkgb3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGlzcG9zZWQpIG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGRlZmF1bHQ6XG4gXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChhYm9ydEVycm9yKSB7XG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xuIFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoYWJvcnRFcnJvcik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9BcHBseSkge1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0Lm91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdFx0XHRcdGZvciAobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0XHRcdFx0aWYgKFxuIFx0XHRcdFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHRcdFx0XHQpXG4gXHRcdFx0XHRcdFx0KSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG4gXHRcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvRGlzcG9zZSkge1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSAmJlxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHQpXG4gXHRcdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XG4gXHRcdFx0XHRcdG1vZHVsZTogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdGVycm9ySGFuZGxlcjogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHRcdH0pO1xuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG4gXHRcdE9iamVjdC5rZXlzKGhvdEF2YWlsYWJsZUZpbGVzTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gPT09IGZhbHNlKSB7XG4gXHRcdFx0XHRob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHR9KTtcblxuIFx0XHR2YXIgaWR4O1xuIFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcbiBcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdGlmICghbW9kdWxlKSBjb250aW51ZTtcblxuIFx0XHRcdHZhciBkYXRhID0ge307XG5cbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xuIFx0XHRcdFx0Y2IoZGF0YSk7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XG5cbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XG5cbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG4gXHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuIFx0XHRcdFx0aWYgKCFjaGlsZCkgY29udGludWU7XG4gXHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cbiBcdFx0dmFyIGRlcGVuZGVuY3k7XG4gXHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcbiBcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcbiBcdFx0XHRcdFx0XHRpZiAoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdCBpbiBcImFwcGx5XCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiYXBwbHlcIik7XG5cbiBcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxuIFx0XHRmb3IgKG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFwcGxpZWRVcGRhdGUsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xuIFx0XHR2YXIgZXJyb3IgPSBudWxsO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XG4gXHRcdFx0XHRcdFx0Y2IgPSBtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcbiBcdFx0XHRcdFx0XHRpZiAoY2IpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFja3MuaW5kZXhPZihjYikgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGNiID0gY2FsbGJhY2tzW2ldO1xuIFx0XHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0XHRjYihtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XG4gXHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXSxcbiBcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcbiBcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyMjtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxuIFx0XHRpZiAoZXJyb3IpIHtcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gXHRcdH1cblxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuIFx0XHRcdHJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcImluZGV4XCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFtcIi4vc3JjL2luZGV4LmpzXCIsXCJ2ZW5kb3JcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIiNjYWxlbmRhci1jb250YWluZXIge1xcclxcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICAgIHRvcDogMDtcXHJcXG4gICAgbGVmdDogOHB4O1xcclxcbiAgICByaWdodDogOHB4O1xcclxcbiAgICBib3R0b206IDhweDtcXHJcXG59XFxyXFxuXFxyXFxuLmZjLWhlYWRlci10b29sYmFyIHtcXHJcXG4gICAgLypcXHJcXG4gICAgdGhlIGNhbGVuZGFyIHdpbGwgYmUgYnV0dGluZyB1cCBhZ2FpbnN0IHRoZSBlZGdlcyxcXHJcXG4gICAgYnV0IGxldCdzIHNjb290IGluIHRoZSBoZWFkZXIncyBidXR0b25zXFxyXFxuICAgICovXFxyXFxuICAgIHBhZGRpbmctdG9wOiAxNHB4O1xcclxcbiAgICBwYWRkaW5nLWxlZnQ6IDA7XFxyXFxuICAgIHBhZGRpbmctcmlnaHQ6IDA7XFxyXFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiaHRtbCwgYm9keSB7XFxyXFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxyXFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXHJcXG59XFxyXFxuXFxyXFxuOmZvY3VzIHtcXHJcXG4gICAgb3V0bGluZTpub25lO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBGb250cy5jc3MgLS0g6Leo5bmz5Y+w5Lit5paH5a2X5L2T6Kej5Yaz5pa55qGIXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcbi5mb250LWhlaSB7Zm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIFxcXCJOb3RvIFNhbnNcXFwiLCBcXFwiSGVsdmV0aWNhIE5ldWVcXFwiLCBIZWx2ZXRpY2EsIFxcXCJOaW1idXMgU2FucyBMXFxcIiwgQXJpYWwsIFxcXCJMaWJlcmF0aW9uIFNhbnNcXFwiLCBcXFwiUGluZ0ZhbmcgU0NcXFwiLCBcXFwiSGlyYWdpbm8gU2FucyBHQlxcXCIsIFxcXCJOb3RvIFNhbnMgQ0pLIFNDXFxcIiwgXFxcIlNvdXJjZSBIYW4gU2FucyBTQ1xcXCIsIFxcXCJTb3VyY2UgSGFuIFNhbnMgQ05cXFwiLCBcXFwiTWljcm9zb2Z0IFlhSGVpXFxcIiwgXFxcIldlbnF1YW55aSBNaWNybyBIZWlcXFwiLCBcXFwiV2VuUXVhbllpIFplbiBIZWlcXFwiLCBcXFwiU1QgSGVpdGlcXFwiLCBTaW1IZWksIFxcXCJXZW5RdWFuWWkgWmVuIEhlaSBTaGFycFxcXCIsIHNhbnMtc2VyaWY7fVxcclxcbi5mb250LWthaSB7Zm9udC1mYW1pbHk6IEJhc2tlcnZpbGxlLCBHZW9yZ2lhLCBcXFwiTGliZXJhdGlvbiBTZXJpZlxcXCIsIFxcXCJLYWl0aSBTQ1xcXCIsIFNUS2FpdGksIFxcXCJBUiBQTCBVS2FpIENOXFxcIiwgXFxcIkFSIFBMIFVLYWkgSEtcXFwiLCBcXFwiQVIgUEwgVUthaSBUV1xcXCIsIFxcXCJBUiBQTCBVS2FpIFRXIE1CRVxcXCIsIFxcXCJBUiBQTCBLYWl0aU0gR0JcXFwiLCBLYWlUaSwgS2FpVGlfR0IyMzEyLCBERkthaS1TQiwgXFxcIlRXLUthaVxcXCIsIHNlcmlmO31cXHJcXG4uZm9udC1zb25nIHtmb250LWZhbWlseTogR2VvcmdpYSwgXFxcIk5pbWJ1cyBSb21hbiBObzkgTFxcXCIsIFxcXCJTb25ndGkgU0NcXFwiLCBcXFwiTm90byBTZXJpZiBDSksgU0NcXFwiLCBcXFwiU291cmNlIEhhbiBTZXJpZiBTQ1xcXCIsIFxcXCJTb3VyY2UgSGFuIFNlcmlmIENOXFxcIiwgU1RTb25nLCBcXFwiQVIgUEwgTmV3IFN1bmdcXFwiLCBcXFwiQVIgUEwgU3VuZ3RpTCBHQlxcXCIsIE5TaW1TdW4sIFNpbVN1biwgXFxcIlRXLVN1bmdcXFwiLCBcXFwiV2VuUXVhbllpIEJpdG1hcCBTb25nXFxcIiwgXFxcIkFSIFBMIFVNaW5nIENOXFxcIiwgXFxcIkFSIFBMIFVNaW5nIEhLXFxcIiwgXFxcIkFSIFBMIFVNaW5nIFRXXFxcIiwgXFxcIkFSIFBMIFVNaW5nIFRXIE1CRVxcXCIsIFBNaW5nTGlVLCBNaW5nTGlVLCBzZXJpZjt9XFxyXFxuLmZvbnQtZmFuZy1zb25nIHtmb250LWZhbWlseTogQmFza2VydmlsbGUsIFxcXCJUaW1lcyBOZXcgUm9tYW5cXFwiLCBcXFwiTGliZXJhdGlvbiBTZXJpZlxcXCIsIFNURmFuZ3NvbmcsIEZhbmdTb25nLCBGYW5nU29uZ19HQjIzMTIsIFxcXCJDV1RFWC1GXFxcIiwgc2VyaWY7fVxcclxcblxcclxcbi8qIOS4tOaXtuaUvue9rlxcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcblxcclxcbi51aS1idXR0b24taWNvbi1vbmx5LnNwbGl0YnV0dG9uLXNlbGVjdCB7XFxyXFxuICAgIHdpZHRoOiAxZW07XFxyXFxufVxcclxcblxcclxcbmFbZGF0YS1nb3RvXSB7XFxyXFxuICAgIGNvbG9yOiAjMDAwO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBCb290c3RyYXAgNCDnu4Tku7bmoLflvI9cXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG5cXHJcXG4vKiDooajljZVcXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG4uY29sLWZvcm0tbGFiZWwge1xcclxcbiAgICBwYWRkaW5nLXRvcDogY2FsYyguMzc1cmVtICsgMXB4KTtcXHJcXG4gICAgcGFkZGluZy1ib3R0b206IGNhbGMoLjM3NXJlbSArIDFweCk7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IDA7XFxyXFxuICAgIGZvbnQtc2l6ZTogaW5oZXJpdDtcXHJcXG4gICAgbGluZS1oZWlnaHQ6IDEuNTtcXHJcXG59XFxyXFxuXFxyXFxuLmlucHV0LWdyb3VwLWFkZG9uIHtcXHJcXG4gIGJvcmRlci1sZWZ0LXdpZHRoOiAwO1xcclxcbiAgYm9yZGVyLXJpZ2h0LXdpZHRoOiAwO1xcclxcbn1cXHJcXG4uaW5wdXQtZ3JvdXAtYWRkb246Zmlyc3QtY2hpbGQge1xcclxcbiAgYm9yZGVyLWxlZnQtd2lkdGg6IDFweDtcXHJcXG59XFxyXFxuLmlucHV0LWdyb3VwLWFkZG9uOmxhc3QtY2hpbGQge1xcclxcbiAgYm9yZGVyLXJpZ2h0LXdpZHRoOiAxcHg7XFxyXFxufVxcclxcblxcclxcbi8qIOS6i+S7tua4suafk1xcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcbi50Yy1jb21wbGV0ZSB7XFxyXFxuICAgIG9wYWNpdHk6IDAuMztcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuLnRjLWNvbXBsZXRlID4gLmZjLWNvbnRlbnQge1xcclxcbiAgICB0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaCAhaW1wb3J0YW50O1xcclxcbn1cXHJcXG5cXHJcXG4udGMtY29tcGxldGU6aG92ZXIge1xcclxcbiAgICBvcGFjaXR5OiAxO1xcclxcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJ2YXIgbWFwID0ge1xuXHRcIi4vYWZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FmLmpzXCIsXG5cdFwiLi9hZi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYWYuanNcIixcblx0XCIuL2FyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci5qc1wiLFxuXHRcIi4vYXItZHpcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWR6LmpzXCIsXG5cdFwiLi9hci1kei5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItZHouanNcIixcblx0XCIuL2FyLWt3XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1rdy5qc1wiLFxuXHRcIi4vYXIta3cuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWt3LmpzXCIsXG5cdFwiLi9hci1seVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItbHkuanNcIixcblx0XCIuL2FyLWx5LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1seS5qc1wiLFxuXHRcIi4vYXItbWFcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLW1hLmpzXCIsXG5cdFwiLi9hci1tYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItbWEuanNcIixcblx0XCIuL2FyLXNhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1zYS5qc1wiLFxuXHRcIi4vYXItc2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLXNhLmpzXCIsXG5cdFwiLi9hci10blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItdG4uanNcIixcblx0XCIuL2FyLXRuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci10bi5qc1wiLFxuXHRcIi4vYXIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLmpzXCIsXG5cdFwiLi9helwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXouanNcIixcblx0XCIuL2F6LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hei5qc1wiLFxuXHRcIi4vYmVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JlLmpzXCIsXG5cdFwiLi9iZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYmUuanNcIixcblx0XCIuL2JnXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iZy5qc1wiLFxuXHRcIi4vYmcuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JnLmpzXCIsXG5cdFwiLi9ibVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm0uanNcIixcblx0XCIuL2JtLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ibS5qc1wiLFxuXHRcIi4vYm5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JuLmpzXCIsXG5cdFwiLi9ibi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm4uanNcIixcblx0XCIuL2JvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iby5qc1wiLFxuXHRcIi4vYm8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JvLmpzXCIsXG5cdFwiLi9iclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYnIuanNcIixcblx0XCIuL2JyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ici5qc1wiLFxuXHRcIi4vYnNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JzLmpzXCIsXG5cdFwiLi9icy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYnMuanNcIixcblx0XCIuL2NhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jYS5qc1wiLFxuXHRcIi4vY2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2NhLmpzXCIsXG5cdFwiLi9jc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3MuanNcIixcblx0XCIuL2NzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jcy5qc1wiLFxuXHRcIi4vY3ZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2N2LmpzXCIsXG5cdFwiLi9jdi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3YuanNcIixcblx0XCIuL2N5XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jeS5qc1wiLFxuXHRcIi4vY3kuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2N5LmpzXCIsXG5cdFwiLi9kYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGEuanNcIixcblx0XCIuL2RhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kYS5qc1wiLFxuXHRcIi4vZGVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLmpzXCIsXG5cdFwiLi9kZS1hdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUtYXQuanNcIixcblx0XCIuL2RlLWF0LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS1hdC5qc1wiLFxuXHRcIi4vZGUtY2hcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLWNoLmpzXCIsXG5cdFwiLi9kZS1jaC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUtY2guanNcIixcblx0XCIuL2RlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS5qc1wiLFxuXHRcIi4vZHZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2R2LmpzXCIsXG5cdFwiLi9kdi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZHYuanNcIixcblx0XCIuL2VsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbC5qc1wiLFxuXHRcIi4vZWwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VsLmpzXCIsXG5cdFwiLi9lbi1hdVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tYXUuanNcIixcblx0XCIuL2VuLWF1LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1hdS5qc1wiLFxuXHRcIi4vZW4tY2FcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWNhLmpzXCIsXG5cdFwiLi9lbi1jYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tY2EuanNcIixcblx0XCIuL2VuLWdiXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1nYi5qc1wiLFxuXHRcIi4vZW4tZ2IuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWdiLmpzXCIsXG5cdFwiLi9lbi1pZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4taWUuanNcIixcblx0XCIuL2VuLWllLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1pZS5qc1wiLFxuXHRcIi4vZW4taWxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWlsLmpzXCIsXG5cdFwiLi9lbi1pbC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4taWwuanNcIixcblx0XCIuL2VuLW56XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1uei5qc1wiLFxuXHRcIi4vZW4tbnouanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLW56LmpzXCIsXG5cdFwiLi9lb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW8uanNcIixcblx0XCIuL2VvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lby5qc1wiLFxuXHRcIi4vZXNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLmpzXCIsXG5cdFwiLi9lcy1kb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMtZG8uanNcIixcblx0XCIuL2VzLWRvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy1kby5qc1wiLFxuXHRcIi4vZXMtdXNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLXVzLmpzXCIsXG5cdFwiLi9lcy11cy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMtdXMuanNcIixcblx0XCIuL2VzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy5qc1wiLFxuXHRcIi4vZXRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2V0LmpzXCIsXG5cdFwiLi9ldC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXQuanNcIixcblx0XCIuL2V1XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ldS5qc1wiLFxuXHRcIi4vZXUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2V1LmpzXCIsXG5cdFwiLi9mYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZmEuanNcIixcblx0XCIuL2ZhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mYS5qc1wiLFxuXHRcIi4vZmlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZpLmpzXCIsXG5cdFwiLi9maS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZmkuanNcIixcblx0XCIuL2ZvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mby5qc1wiLFxuXHRcIi4vZm8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZvLmpzXCIsXG5cdFwiLi9mclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnIuanNcIixcblx0XCIuL2ZyLWNhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci1jYS5qc1wiLFxuXHRcIi4vZnItY2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLWNhLmpzXCIsXG5cdFwiLi9mci1jaFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnItY2guanNcIixcblx0XCIuL2ZyLWNoLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci1jaC5qc1wiLFxuXHRcIi4vZnIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLmpzXCIsXG5cdFwiLi9meVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnkuanNcIixcblx0XCIuL2Z5LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9meS5qc1wiLFxuXHRcIi4vZ2RcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dkLmpzXCIsXG5cdFwiLi9nZC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ2QuanNcIixcblx0XCIuL2dsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nbC5qc1wiLFxuXHRcIi4vZ2wuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dsLmpzXCIsXG5cdFwiLi9nb20tbGF0blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ29tLWxhdG4uanNcIixcblx0XCIuL2dvbS1sYXRuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nb20tbGF0bi5qc1wiLFxuXHRcIi4vZ3VcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2d1LmpzXCIsXG5cdFwiLi9ndS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ3UuanNcIixcblx0XCIuL2hlXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oZS5qc1wiLFxuXHRcIi4vaGUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hlLmpzXCIsXG5cdFwiLi9oaVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaGkuanNcIixcblx0XCIuL2hpLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oaS5qc1wiLFxuXHRcIi4vaHJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hyLmpzXCIsXG5cdFwiLi9oci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHIuanNcIixcblx0XCIuL2h1XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9odS5qc1wiLFxuXHRcIi4vaHUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2h1LmpzXCIsXG5cdFwiLi9oeS1hbVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHktYW0uanNcIixcblx0XCIuL2h5LWFtLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oeS1hbS5qc1wiLFxuXHRcIi4vaWRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2lkLmpzXCIsXG5cdFwiLi9pZC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaWQuanNcIixcblx0XCIuL2lzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pcy5qc1wiLFxuXHRcIi4vaXMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2lzLmpzXCIsXG5cdFwiLi9pdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaXQuanNcIixcblx0XCIuL2l0LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pdC5qc1wiLFxuXHRcIi4vamFcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2phLmpzXCIsXG5cdFwiLi9qYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvamEuanNcIixcblx0XCIuL2p2XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9qdi5qc1wiLFxuXHRcIi4vanYuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2p2LmpzXCIsXG5cdFwiLi9rYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva2EuanNcIixcblx0XCIuL2thLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rYS5qc1wiLFxuXHRcIi4va2tcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2trLmpzXCIsXG5cdFwiLi9ray5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva2suanNcIixcblx0XCIuL2ttXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rbS5qc1wiLFxuXHRcIi4va20uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ttLmpzXCIsXG5cdFwiLi9rblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva24uanNcIixcblx0XCIuL2tuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rbi5qc1wiLFxuXHRcIi4va29cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2tvLmpzXCIsXG5cdFwiLi9rby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva28uanNcIixcblx0XCIuL2t5XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9reS5qc1wiLFxuXHRcIi4va3kuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2t5LmpzXCIsXG5cdFwiLi9sYlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbGIuanNcIixcblx0XCIuL2xiLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sYi5qc1wiLFxuXHRcIi4vbG9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2xvLmpzXCIsXG5cdFwiLi9sby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbG8uanNcIixcblx0XCIuL2x0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sdC5qc1wiLFxuXHRcIi4vbHQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2x0LmpzXCIsXG5cdFwiLi9sdlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbHYuanNcIixcblx0XCIuL2x2LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sdi5qc1wiLFxuXHRcIi4vbWVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21lLmpzXCIsXG5cdFwiLi9tZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWUuanNcIixcblx0XCIuL21pXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9taS5qc1wiLFxuXHRcIi4vbWkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21pLmpzXCIsXG5cdFwiLi9ta1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWsuanNcIixcblx0XCIuL21rLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tay5qc1wiLFxuXHRcIi4vbWxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21sLmpzXCIsXG5cdFwiLi9tbC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWwuanNcIixcblx0XCIuL21uXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tbi5qc1wiLFxuXHRcIi4vbW4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21uLmpzXCIsXG5cdFwiLi9tclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXIuanNcIixcblx0XCIuL21yLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tci5qc1wiLFxuXHRcIi4vbXNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21zLmpzXCIsXG5cdFwiLi9tcy1teVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXMtbXkuanNcIixcblx0XCIuL21zLW15LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tcy1teS5qc1wiLFxuXHRcIi4vbXMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21zLmpzXCIsXG5cdFwiLi9tdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXQuanNcIixcblx0XCIuL210LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tdC5qc1wiLFxuXHRcIi4vbXlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL215LmpzXCIsXG5cdFwiLi9teS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXkuanNcIixcblx0XCIuL25iXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9uYi5qc1wiLFxuXHRcIi4vbmIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25iLmpzXCIsXG5cdFwiLi9uZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmUuanNcIixcblx0XCIuL25lLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9uZS5qc1wiLFxuXHRcIi4vbmxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25sLmpzXCIsXG5cdFwiLi9ubC1iZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmwtYmUuanNcIixcblx0XCIuL25sLWJlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubC1iZS5qc1wiLFxuXHRcIi4vbmwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25sLmpzXCIsXG5cdFwiLi9ublwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbm4uanNcIixcblx0XCIuL25uLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubi5qc1wiLFxuXHRcIi4vcGEtaW5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3BhLWluLmpzXCIsXG5cdFwiLi9wYS1pbi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcGEtaW4uanNcIixcblx0XCIuL3BsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wbC5qc1wiLFxuXHRcIi4vcGwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3BsLmpzXCIsXG5cdFwiLi9wdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcHQuanNcIixcblx0XCIuL3B0LWJyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wdC1ici5qc1wiLFxuXHRcIi4vcHQtYnIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3B0LWJyLmpzXCIsXG5cdFwiLi9wdC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcHQuanNcIixcblx0XCIuL3JvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9yby5qc1wiLFxuXHRcIi4vcm8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3JvLmpzXCIsXG5cdFwiLi9ydVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcnUuanNcIixcblx0XCIuL3J1LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ydS5qc1wiLFxuXHRcIi4vc2RcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NkLmpzXCIsXG5cdFwiLi9zZC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2QuanNcIixcblx0XCIuL3NlXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zZS5qc1wiLFxuXHRcIi4vc2UuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NlLmpzXCIsXG5cdFwiLi9zaVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2kuanNcIixcblx0XCIuL3NpLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zaS5qc1wiLFxuXHRcIi4vc2tcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NrLmpzXCIsXG5cdFwiLi9zay5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2suanNcIixcblx0XCIuL3NsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zbC5qc1wiLFxuXHRcIi4vc2wuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NsLmpzXCIsXG5cdFwiLi9zcVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3EuanNcIixcblx0XCIuL3NxLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zcS5qc1wiLFxuXHRcIi4vc3JcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NyLmpzXCIsXG5cdFwiLi9zci1jeXJsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zci1jeXJsLmpzXCIsXG5cdFwiLi9zci1jeXJsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zci1jeXJsLmpzXCIsXG5cdFwiLi9zci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3IuanNcIixcblx0XCIuL3NzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zcy5qc1wiLFxuXHRcIi4vc3MuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NzLmpzXCIsXG5cdFwiLi9zdlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3YuanNcIixcblx0XCIuL3N2LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zdi5qc1wiLFxuXHRcIi4vc3dcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3N3LmpzXCIsXG5cdFwiLi9zdy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3cuanNcIixcblx0XCIuL3RhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90YS5qc1wiLFxuXHRcIi4vdGEuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RhLmpzXCIsXG5cdFwiLi90ZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGUuanNcIixcblx0XCIuL3RlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ZS5qc1wiLFxuXHRcIi4vdGV0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ZXQuanNcIixcblx0XCIuL3RldC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGV0LmpzXCIsXG5cdFwiLi90Z1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGcuanNcIixcblx0XCIuL3RnLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90Zy5qc1wiLFxuXHRcIi4vdGhcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RoLmpzXCIsXG5cdFwiLi90aC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGguanNcIixcblx0XCIuL3RsLXBoXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90bC1waC5qc1wiLFxuXHRcIi4vdGwtcGguanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RsLXBoLmpzXCIsXG5cdFwiLi90bGhcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RsaC5qc1wiLFxuXHRcIi4vdGxoLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90bGguanNcIixcblx0XCIuL3RyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ci5qc1wiLFxuXHRcIi4vdHIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RyLmpzXCIsXG5cdFwiLi90emxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3R6bC5qc1wiLFxuXHRcIi4vdHpsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90emwuanNcIixcblx0XCIuL3R6bVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHptLmpzXCIsXG5cdFwiLi90em0tbGF0blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHptLWxhdG4uanNcIixcblx0XCIuL3R6bS1sYXRuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90em0tbGF0bi5qc1wiLFxuXHRcIi4vdHptLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90em0uanNcIixcblx0XCIuL3VnLWNuXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91Zy1jbi5qc1wiLFxuXHRcIi4vdWctY24uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VnLWNuLmpzXCIsXG5cdFwiLi91a1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdWsuanNcIixcblx0XCIuL3VrLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ay5qc1wiLFxuXHRcIi4vdXJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VyLmpzXCIsXG5cdFwiLi91ci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXIuanNcIixcblx0XCIuL3V6XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ei5qc1wiLFxuXHRcIi4vdXotbGF0blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXotbGF0bi5qc1wiLFxuXHRcIi4vdXotbGF0bi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXotbGF0bi5qc1wiLFxuXHRcIi4vdXouanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3V6LmpzXCIsXG5cdFwiLi92aVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdmkuanNcIixcblx0XCIuL3ZpLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS92aS5qc1wiLFxuXHRcIi4veC1wc2V1ZG9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3gtcHNldWRvLmpzXCIsXG5cdFwiLi94LXBzZXVkby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUveC1wc2V1ZG8uanNcIixcblx0XCIuL3lvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS95by5qc1wiLFxuXHRcIi4veW8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3lvLmpzXCIsXG5cdFwiLi96aC1jblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtY24uanNcIixcblx0XCIuL3poLWNuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC1jbi5qc1wiLFxuXHRcIi4vemgtaGtcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLWhrLmpzXCIsXG5cdFwiLi96aC1oay5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtaGsuanNcIixcblx0XCIuL3poLXR3XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC10dy5qc1wiLFxuXHRcIi4vemgtdHcuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLXR3LmpzXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHZhciBpZCA9IG1hcFtyZXFdO1xuXHRpZighKGlkICsgMSkpIHsgLy8gY2hlY2sgZm9yIG51bWJlciBvciBzdHJpbmdcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIGlkO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZSBzeW5jIHJlY3Vyc2l2ZSBeXFxcXC5cXFxcLy4qJFwiOyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBDYWxlbmRhciBmcm9tICcuL2NvbXBvbmVudHMvQ2FsZW5kYXIvQ2FsZW5kYXInO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gIH1cclxuIFxyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBpZD0nd2l6LXRvbWF0by1jYWxlbmRhcicgPlxyXG4gICAgICAgICAgICA8Q2FsZW5kYXIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vQ2FsZW5kYXIuY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL0NhbGVuZGFyLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vQ2FsZW5kYXIuY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEZ1bGxDYWxlbmRhciBmcm9tICcuL0Z1bGxDYWxlbmRhcic7XHJcbmltcG9ydCAnZnVsbGNhbGVuZGFyLXJlYWN0d3JhcHBlci9kaXN0L2Nzcy9mdWxsY2FsZW5kYXIubWluLmNzcyc7XHJcbmltcG9ydCAnLi9DYWxlbmRhci5jc3MnO1xyXG5pbXBvcnQgV2l6RXZlbnREYXRhTG9hZGVyIGZyb20gJy4uLy4uL21vZGVscy9XaXpFdmVudERhdGFMb2FkZXInXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYWxlbmRhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBldmVudHM6IFtdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGF0YUxvYWRlciA9IG5ldyBXaXpFdmVudERhdGFMb2FkZXIoKTtcclxuICAgICAgICAvL+e7keWumuWPpeafhFxyXG4gICAgICAgIHRoaXMub25WaWV3UmVuZGVyID0gdGhpcy5vblZpZXdSZW5kZXIuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBvblZpZXdSZW5kZXIoIHZpZXcsIGVsZW1lbnQgKSB7XHJcbiAgICAgICAgY29uc3QgY2FsZW5kYXIgPSAkKCcjY2FsZW5kYXInKTtcclxuICAgICAgICBjb25zdCBldmVudFNvdXJjZXMgPSB0aGlzLmRhdGFMb2FkZXIuZ2V0RXZlbnRTb3VyY2VzKCB2aWV3LCBlbGVtZW50ICk7XHJcbiAgICAgICAgY2FsZW5kYXIuZnVsbENhbGVuZGFyKCdyZW1vdmVFdmVudHMnKTtcclxuICAgICAgICBmb3IgKGxldCBpPTAgOyBpIDwgZXZlbnRTb3VyY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNhbGVuZGFyLmZ1bGxDYWxlbmRhcignYWRkRXZlbnRTb3VyY2UnLCBldmVudFNvdXJjZXNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICAvLyQoJyNjYWxlbmRhcicpLmZ1bGxDYWxlbmRhcignb3B0aW9uJywge1xyXG4gICAgICAgIC8vICAgIHZpZXdSZW5kZXI6IHRoaXMub25WaWV3UmVuZGVyXHJcbiAgICAgICAgLy99KTtcclxuICAgIH1cclxuIFxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJjYWxlbmRhci1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgIDxGdWxsQ2FsZW5kYXJcclxuICAgICAgICAgICAgICAgICAgICAvLyDln7rmnKzphY3nva5cclxuICAgICAgICAgICAgICAgICAgICBpZCA9IFwiY2FsZW5kYXJcIlxyXG4gICAgICAgICAgICAgICAgICAgIHRoZW1lU3lzdGVtID0gJ3N0YW5kYXJkJ1xyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodCA9ICdwYXJlbnQnXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyID0ge3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogJ3ByZXYsbmV4dCx0b2RheScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbnRlcjogJ3RpdGxlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6ICdtb250aCxhZ2VuZGFXZWVrLGFnZW5kYURheSxsaXN0V2VlaydcclxuICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOS4reaWh+WMllxyXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvblRleHQgPSB7e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2RheTogJ+S7iuWkqScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnRoOiAn5pyIJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2VlazogJ+WRqCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheTogJ+aXpScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3Q6ICfooagnXHJcbiAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICBtb250aE5hbWVzID0ge1tcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzHmnIgnLCAnMuaciCcsICcz5pyIJywgJzTmnIgnLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzXmnIgnLCAnNuaciCcsICc35pyIJywgJzjmnIgnLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgJznmnIgnLCAnMTDmnIgnLCAnMTHmnIgnLCAnMTLmnIgnXHJcbiAgICAgICAgICAgICAgICAgICAgXX1cclxuICAgICAgICAgICAgICAgICAgICBtb250aE5hbWVzU2hvcnQgPSB7W1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnMeaciCcsICcy5pyIJywgJzPmnIgnLCAnNOaciCcsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnNeaciCcsICc25pyIJywgJzfmnIgnLCAnOOaciCcsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnOeaciCcsICcxMOaciCcsICcxMeaciCcsICcxMuaciCdcclxuICAgICAgICAgICAgICAgICAgICBdfVxyXG4gICAgICAgICAgICAgICAgICAgIGRheU5hbWVzID0ge1tcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ+WRqOaXpScsICflkajkuIAnLCAn5ZGo5LqMJywgJ+WRqOS4iScsICflkajlm5snLCAn5ZGo5LqUJywgJ+WRqOWFrSdcclxuICAgICAgICAgICAgICAgICAgICBdfVxyXG4gICAgICAgICAgICAgICAgICAgIGRheU5hbWVzU2hvcnQgPSB7W1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAn5ZGo5pelJywgJ+WRqOS4gCcsICflkajkuownLCAn5ZGo5LiJJywgJ+WRqOWbmycsICflkajkupQnLCAn5ZGo5YWtJ1xyXG4gICAgICAgICAgICAgICAgICAgIF19XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsRGF5VGV4dCA9ICflhajlpKknXHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6K6+572u6KeG5Zu+XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZpZXcgPSAnYWdlbmRhV2VlaydcclxuICAgICAgICAgICAgICAgICAgICBub3dJbmRpY2F0b3IgPSB7dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICBmaXJzdERheSA9IHsxfVxyXG4gICAgICAgICAgICAgICAgICAgIHZpZXdzID0ge3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWdlbmRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5UaW1lOiBcIjA4OjAwOjAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbG90TGFiZWxGb3JtYXQ6ICdoKDptbSkgYSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICBuYXZMaW5rcz0ge3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsRGF5RGVmYXVsdCA9IHtmYWxzZX1cclxuICAgICAgICAgICAgICAgICAgICBldmVudExpbWl0PSB7dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICAvLyDorr7nva7kuovku7ZcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RhYmxlID0ge3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0SGVscGVyID0ge3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdGFibGUgPSB7dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICBmb3JjZUV2ZW50RHVyYXRpb24gPSB7dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICAvLyDorr7nva5VSVxyXG4gICAgICAgICAgICAgICAgICAgIHVuc2VsZWN0Q2FuY2VsID0gJy5tb2RhbCAqJ1xyXG4gICAgICAgICAgICAgICAgICAgIGRyYWdPcGFjaXR5ID0ge3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJtb250aFwiOiAuNSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhZ2VuZGFXZWVrXCI6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWdlbmRhRGF5XCI6IDFcclxuICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICAgICAqIOiuvue9ruS6i+S7tuWPpeafhFxyXG4gICAgICAgICAgICAgICAgICAgICAqIOWboOS4umZ1bGxjYWxlbmRhci1yZWFjdFdyYXBwZXLnmoTlrp7njrDmmK/nm7TmjqXov5Tlm548ZGl2IGlkPSdmdWxsY2FsZW5kYXInPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAqIOW5tuS4lOiwg+eUqCQoJyNmdWxsY2FsZW5kYXInKS5mdWxsY2FsZW5kYXIodGhpcy5wcm9wcynov5vooYzmnoTlu7rvvIzlm6DmraRSZWFjdOW5tuayoeaciVxyXG4gICAgICAgICAgICAgICAgICAgICAqIOeuoeeQhkZ1bGxDYWxlbmRhcueKtuaAgeWSjOa4suafk+eahOiDveWKm+OAguWboOatpOebtOaOpeWcqOiuvue9ruS4reWBmuWlvWNhbGxiYWNr77yM6K6p5o+S5Lu26Ieq5oiR566h55CG44CCXHJcbiAgICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAgICAgdmlld1JlbmRlciA9IHt0aGlzLm9uVmlld1JlbmRlcn1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0ICQgZnJvbSBcImpxdWVyeVwiO1xuaW1wb3J0IGZ1bGxDYWxlbmRhciBmcm9tIFwiZnVsbGNhbGVuZGFyXCI7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5cbmNsYXNzIEZ1bGxjYWxlbmRhck9iamVjdE1hcHBlcntcblx0Y29uc3RydWN0b3IoKXtcblxuXHR9XG5cblx0Z2V0U2V0dGluZ3MocHJvcGVydGllcyl7XG5cdFx0bGV0IG5ld1NldHRpbmdzID0ge307XG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gcHJvcGVydGllcykge1xuICAgICAgXHRcdGlmIChwcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgXHRcdG5ld1NldHRpbmdzW2tleV0gPSBwcm9wZXJ0aWVzW2tleV07XG4gICAgICBcdFx0fVxuICAgIFx0fVxuICAgIFx0cmV0dXJuIG5ld1NldHRpbmdzO1xuXHR9XG59XHRcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnVsbENhbGVuZGFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5qcSA9ICQubm9Db25mbGljdCgpO1xuXHRcdHRoaXMuZnVsbGNhbGVuZGFyT2JqZWN0TWFwcGVyID0gbmV3IEZ1bGxjYWxlbmRhck9iamVjdE1hcHBlcigpO1xuXHRcdHRoaXMucm9vdCA9IG51bGw7XG5cdFx0dGhpcy5pbnN0YW5jZSA9IG51bGw7XG5cdFx0dGhpcy5kYXRlID0gbmV3IERhdGUoKTtcblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0Y29uc3Qgb2JqZWN0TWFwcGVyU2V0dGluZ3MgPSB0aGlzLmZ1bGxjYWxlbmRhck9iamVjdE1hcHBlci5nZXRTZXR0aW5ncyh0aGlzLnByb3BzKTtcblx0XHR0aGlzLmluc3RhbmNlID0gdGhpcy5qcShgIyR7dGhpcy5yb290fWApLmZ1bGxDYWxlbmRhcihvYmplY3RNYXBwZXJTZXR0aW5ncyk7XG5cdH1cblxuICBcdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKXtcbiAgXHRcdHRoaXMuanEoYCMke3RoaXMucm9vdH1gKS5mdWxsQ2FsZW5kYXIoJ2Rlc3Ryb3knKTtcbiAgXHRcdGNvbnN0IG9iamVjdE1hcHBlclNldHRpbmdzID0gdGhpcy5mdWxsY2FsZW5kYXJPYmplY3RNYXBwZXIuZ2V0U2V0dGluZ3MobmV4dFByb3BzKTtcbiAgICBcdHRoaXMuaW5zdGFuY2UgPSB0aGlzLmpxKGAjJHt0aGlzLnJvb3R9YCkuZnVsbENhbGVuZGFyKG9iamVjdE1hcHBlclNldHRpbmdzKTtcbiAgXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0dGhpcy5yb290ID0gdGhpcy5wcm9wcy5pZCB8fCAnSUQnICsgdGhpcy5kYXRlLmdldFRpbWUoKTsgXG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdiBpZD17dGhpcy5yb290fT48L2Rpdj5cblx0XHQpXG5cdH1cbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9pbmRleC5jc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vaW5kZXguY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9pbmRleC5jc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0ICdmdWxsY2FsZW5kYXItcmVhY3R3cmFwcGVyL2Rpc3QvY3NzL2Z1bGxjYWxlbmRhci5taW4uY3NzJ1xyXG5pbXBvcnQgJ2Jvb3RzdHJhcC9kaXN0L2Nzcy9ib290c3RyYXAuY3NzJztcclxuaW1wb3J0ICdib290c3RyYXAvZGlzdC9jc3MvYm9vdHN0cmFwLXRoZW1lLmNzcyc7XHJcbmltcG9ydCBBcHAgZnJvbSAnLi9BcHAnO1xyXG5pbXBvcnQgJy4vaW5kZXguY3NzJztcclxuXHJcblJlYWN0RE9NLnJlbmRlcig8QXBwIC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpKTtcclxuXHJcbi8qXHJcbiQoZnVuY3Rpb24oKXtcclxuICAgIC8vIOWumuS5ieWPmOmHj1xyXG5cdGNvbnN0IGRhdGFMb2FkZXIgPSBuZXcgV2l6RXZlbnREYXRhTG9hZGVyKCk7XHJcblx0bGV0IGdfZWRpdFBvcHBlciwgZ19jcmVhdGVNb2RhbCwgZ19lZGl0TW9kYWw7XHJcblxyXG4gICAgY29uc3QgY2FsZW5kYXIgPSAkKCcjY2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoe1xyXG5cdFx0dGhlbWVTeXN0ZW06ICdzdGFuZGFyZCcsXHJcblx0XHRoZWlnaHQ6ICdwYXJlbnQnLFxyXG5cdFx0aGVhZGVyOiB7XHJcblx0XHRcdGxlZnQ6ICdwcmV2LG5leHQsdG9kYXknLFxyXG5cdFx0XHRjZW50ZXI6ICd0aXRsZScsXHJcblx0XHRcdHJpZ2h0OiAnbW9udGgsYWdlbmRhV2VlayxhZ2VuZGFEYXksbGlzdFdlZWsnXHJcblx0XHR9LFxyXG5cdFx0dmlld3M6IHtcclxuXHRcdFx0bW9udGg6IHtcclxuXHRcdFx0XHQvL3RpdGxlRm9ybWF0OiBnX2xvY190aXRsZWZvcm1hdF9tb250aCwgLy92YXIgZ19sb2NfdGl0bGVmb3JtYXRfbW9udGggPSBcIk1NTU0geXl5eVwiO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRhZ2VuZGE6IHtcclxuXHRcdFx0XHRtaW5UaW1lOiBcIjA4OjAwOjAwXCIsXHJcblx0XHRcdFx0c2xvdExhYmVsRm9ybWF0OiAnaCg6bW0pIGEnXHJcblx0XHRcdH0sXHJcblx0XHRcdGxpc3RXZWVrOiB7XHJcblxyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0bmF2TGlua3M6IHRydWUsXHJcblx0XHRhbGxEYXlEZWZhdWx0OiBmYWxzZSxcclxuXHRcdGRlZmF1bHRWaWV3OiAnYWdlbmRhV2VlaycsXHJcblx0XHRldmVudExpbWl0OiB0cnVlLFxyXG5cdFx0YnV0dG9uVGV4dDoge1xyXG5cdFx0XHR0b2RheTogJ+S7iuWkqScsXHJcblx0XHRcdG1vbnRoOiAn5pyIJyxcclxuXHRcdFx0d2VlazogJ+WRqCcsXHJcblx0XHRcdGRheTogJ+aXpScsXHJcblx0XHRcdGxpc3Q6ICfooagnXHJcbiAgICAgICAgfSxcclxuXHRcdG1vbnRoTmFtZXM6IFtcclxuICAgICAgICAgICAgJzHmnIgnLCAnMuaciCcsICcz5pyIJywgJzTmnIgnLCBcclxuICAgICAgICAgICAgJzXmnIgnLCAnNuaciCcsICc35pyIJywgJzjmnIgnLCBcclxuICAgICAgICAgICAgJznmnIgnLCAnMTDmnIgnLCAnMTHmnIgnLCAnMTLmnIgnXHJcbiAgICAgICAgXSxcclxuXHRcdG1vbnRoTmFtZXNTaG9ydDogW1xyXG4gICAgICAgICAgICAnMeaciCcsICcy5pyIJywgJzPmnIgnLCAnNOaciCcsIFxyXG4gICAgICAgICAgICAnNeaciCcsICc25pyIJywgJzfmnIgnLCAnOOaciCcsIFxyXG4gICAgICAgICAgICAnOeaciCcsICcxMOaciCcsICcxMeaciCcsICcxMuaciCdcclxuICAgICAgICBdLFxyXG5cdFx0ZGF5TmFtZXM6IFtcclxuICAgICAgICAgICAgJ+WRqOaXpScsICflkajkuIAnLCAn5ZGo5LqMJywgJ+WRqOS4iScsICflkajlm5snLCAn5ZGo5LqUJywgJ+WRqOWFrSdcclxuICAgICAgICBdLFxyXG5cdFx0ZGF5TmFtZXNTaG9ydDogW1xyXG4gICAgICAgICAgICAn5ZGo5pelJywgJ+WRqOS4gCcsICflkajkuownLCAn5ZGo5LiJJywgJ+WRqOWbmycsICflkajkupQnLCAn5ZGo5YWtJ1xyXG4gICAgICAgIF0sXHJcblx0XHRzZWxlY3RhYmxlOiB0cnVlLFxyXG5cdFx0c2VsZWN0SGVscGVyOiB0cnVlLFxyXG5cdFx0dW5zZWxlY3RDYW5jZWw6ICcubW9kYWwgKicsXHJcblx0XHRhbGxEYXlUZXh0OiAn5YWo5aSpJyxcclxuXHRcdG5vd0luZGljYXRvcjogdHJ1ZSxcclxuXHRcdGZvcmNlRXZlbnREdXJhdGlvbjogdHJ1ZSxcclxuXHRcdGZpcnN0RGF5OiAxLCAvLyDnrKzkuIDlpKnmmK/lkajkuIDov5jmmK/lkajlpKnvvIzkuI5kYXRlcGlja2Vy5b+F6aG755u45ZCMXHJcblx0XHRkcmFnT3BhY2l0eToge1xyXG5cdFx0XHRcIm1vbnRoXCI6IC41LFxyXG5cdFx0XHRcImFnZW5kYVdlZWtcIjogMSxcclxuXHRcdFx0XCJhZ2VuZGFEYXlcIjogMVxyXG5cdFx0fSxcclxuXHRcdGVkaXRhYmxlOiB0cnVlLFxyXG5cclxuXHRcdC8vIOWIt+aWsOinhuWbvu+8jOmHjeaWsOiOt+WPluaXpeWOhuS6i+S7tlxyXG5cdFx0dmlld1JlbmRlcjogZnVuY3Rpb24oIHZpZXcsIGVsZW1lbnQgKSB7XHJcblx0XHRcdC8vVE9ETzog5oSf6KeJ6L+Z5qC36YCg5oiQ5oCn6IO95LiK55qE5o2f5aSx77yM5piv5ZCm5pyJ5pu05aW955qE5pa55rOV77yfXHJcblx0XHRcdGNvbnN0IGNhbGVuZGFyID0gJCgnI2NhbGVuZGFyJyk7XHJcblx0XHRcdGNvbnN0IGV2ZW50U291cmNlcyA9IGRhdGFMb2FkZXIuZ2V0RXZlbnRTb3VyY2VzKCB2aWV3LCBlbGVtZW50ICk7XHJcblx0XHRcdGNhbGVuZGFyLmZ1bGxDYWxlbmRhcigncmVtb3ZlRXZlbnRzJyk7XHJcblx0XHRcdGZvciAobGV0IGk9MCA7IGkgPCBldmVudFNvdXJjZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRjYWxlbmRhci5mdWxsQ2FsZW5kYXIoJ2FkZEV2ZW50U291cmNlJywgZXZlbnRTb3VyY2VzW2ldKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8g6YCJ5oup5Yqo5L2c6Kem5Y+R55qE5LqL5Lu25Y+l5p+E77yM5a6a5LmJ5LqG5LiA5LiqY2FsbGJhY2tcclxuXHRcdHNlbGVjdDogZnVuY3Rpb24oc3RhcnQsIGVuZCwganNFdmVudCwgdmlldyl7XHJcblx0XHRcdC8vIOW8ueWHuuKAnOWIm+W7uuaXpeWOhuS6i+S7tuKAneeql+WPo1xyXG5cdFx0XHQvLyDliKTmlq3mmK/lkKbmuLLmn5NcclxuXHRcdFx0Ly9UT0RPOiDmg7Plip7ms5XkuI3opoHnlKjlhajlsYDlj5jph49cclxuXHRcdFx0aWYgKCAhd2luZG93LmdfY3JlYXRlTW9kYWwgKSBuZXcgRXZlbnRDcmVhdGVNb2RhbCh7c3RhcnQsIGVuZCwganNFdmVudCwgdmlld30pO1xyXG5cdFx0XHQvLyDkvKDpgJLlj4LmlbBcclxuXHRcdFx0d2luZG93LmdfY3JlYXRlTW9kYWwudXBkYXRlKHtzdGFydCwgZW5kLCBqc0V2ZW50LCB2aWV3fSk7XHJcblx0XHRcdHdpbmRvdy5nX2NyZWF0ZU1vZGFsLnNob3coKTtcclxuXHRcdH0sXHJcblxyXG5cdFx0ZXZlbnREcmFnU3RhcnQ6IGZ1bmN0aW9uKCBldmVudCwganNFdmVudCwgdWksIHZpZXcgKSB7IH0sXHJcblx0XHRldmVudERyYWdTdG9wOiBmdW5jdGlvbiggZXZlbnQsIGpzRXZlbnQsIHVpLCB2aWV3ICkgeyB9LFxyXG5cclxuXHRcdC8vIOaXpeWOhuS6i+S7tuaLluWKqCBldmVudCwgZGVsdGEsIHJldmVydEZ1bmMsIGpzRXZlbnQsIHVpLCB2aWV3XHJcblx0XHRldmVudERyb3A6IGZ1bmN0aW9uKGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXcpe1xyXG5cdFx0XHRpZiAoZXZlbnQuaWQpe1xyXG5cdFx0XHRcdGRhdGFMb2FkZXIudXBkYXRlRXZlbnREYXRhT25Ecm9wKGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXcpXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV2ZXJ0RnVuYygpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cclxuXHRcdC8vIOaXpeWOhuS6i+S7tuaXpeacn+iMg+WbtOmHjee9rlxyXG5cdFx0ZXZlbnRSZXNpemU6IGZ1bmN0aW9uKGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXcpe1xyXG5cdFx0XHRpZiAoZXZlbnQuaWQpe1xyXG5cdFx0XHRcdGRhdGFMb2FkZXIudXBkYXRlRXZlbnREYXRhT25SZXNpemUoZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV2ZXJ0RnVuYygpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cclxuXHRcdGV2ZW50UmVuZGVyOiBmdW5jdGlvbihldmVudE9iaiwgJGVsKSB7XHJcblx0XHRcdC8vIOWFg+e0oOW3sue7j+a4suafk++8jOWPr+S/ruaUueWFg+e0oFxyXG5cdFx0XHRjb25zdCBpc0NvbXBsZXRlID0gcGFyc2VJbnQoZXZlbnRPYmouY29tcGxldGUpID09IDU7XHJcblx0XHRcdGlmICggaXNDb21wbGV0ZSApIHtcclxuXHRcdFx0XHQvLyDmoLflvI9cclxuXHRcdFx0XHQkZWwuYWRkQ2xhc3MoJ3RjLWNvbXBsZXRlJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHR9LFxyXG5cclxuXHRcdC8vIOaXpeWOhuS6i+S7tueCueWHu+WQjuS6i+S7tuWPpeafhFxyXG5cdFx0ZXZlbnRDbGljazogZnVuY3Rpb24oIGV2ZW50LCBqc0V2ZW50LCB2aWV3ICkge1xyXG5cdFx0XHQvLyB0aGlzIOaMh+WQkeWMheijueS6i+S7tueahDxhPuWFg+e0oFxyXG5cclxuXHRcdFx0Ly8g5Yik5pat5piv5ZCm5bey57uP5riy5p+T5by556qXXHJcblx0XHRcdGlmICggIWdfZWRpdFBvcHBlciApIHtcclxuXHRcdFx0XHRnX2VkaXRQb3BwZXIgPSByZW5kZXJFZGl0UG9wcGVyKHtcclxuXHRcdFx0XHRcdCdldmVudCc6IGV2ZW50LFxyXG5cdFx0XHRcdFx0J2pzRXZlbnQnOiBqc0V2ZW50LFxyXG5cdFx0XHRcdFx0J3ZpZXcnOiB2aWV3XHJcblx0XHRcdFx0fSwgdGhpcykuRXZlbnRQb3BvdmVyKCdzaG93Jyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Ly8g5pu05pawcmVmZXJlbmNlXHJcblx0XHRcdFx0Z19lZGl0UG9wcGVyLkV2ZW50UG9wb3Zlcignb3B0aW9uJywge1xyXG5cdFx0XHRcdFx0YXJnczoge1xyXG5cdFx0XHRcdFx0XHQnZXZlbnQnOiBldmVudCxcclxuXHRcdFx0XHRcdFx0J2pzRXZlbnQnOiBqc0V2ZW50LFxyXG5cdFx0XHRcdFx0XHQndmlldyc6IHZpZXdcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR0aXRsZTogZXZlbnQudGl0bGUsXHJcblx0XHRcdFx0XHRyZWZlcmVuY2U6IHRoaXNcclxuXHRcdFx0XHR9KS5FdmVudFBvcG92ZXIoJ3VwZGF0ZScpLkV2ZW50UG9wb3Zlcignc2hvdycpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cdFx0XHJcblx0fSlcclxufSlcclxuKi8iLCJpbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcbmltcG9ydCAnZnVsbGNhbGVuZGFyJztcclxuaW1wb3J0IHsgV2l6RGF0YWJhc2UgYXMgZ19kYiwgV2l6Q29tbW9uVUkgYXMgZ19jbW59IGZyb20gJy4uL3V0aWxzL1dpekludGVyZmFjZSc7XHJcbmltcG9ydCBDb25maWcgZnJvbSAnLi4vdXRpbHMvQ29uZmlnJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbGVuZGFyRXZlbnQge1xyXG5cdC8qKlxyXG4gICAgICog5Yib5bu65LiA5Liq6YCa55So5pel56iLLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIOWOn+Wni+aVsOaNruexu+Wei++8jOWPr+S7peaYryBXaXpFdmVudCwgRnVsbENhbGVuZGFyRXZlbnQg5Lul5Y+KIEdVSUQuXHJcbiAgICAgKi9cclxuXHRjb25zdHJ1Y3RvciggZGF0YSApIHtcclxuXHRcdGlmICghZ19kYikgdGhyb3cgbmV3IEVycm9yKCdJV2l6RGF0YWJhc2UgaXMgbm90IHZhbGlkLicpO1xyXG5cdFx0Y29uc3QgdHlwZSA9IHRoaXMuX2NoZWNrRGF0YVR5cGUoZGF0YSk7XHJcblx0XHRzd2l0Y2ggKCB0eXBlICkge1xyXG5cdFx0XHRjYXNlIFwiV2l6RXZlbnRcIjpcclxuXHRcdFx0Y2FzZSBcIkZ1bGxDYWxlbmRhckV2ZW50XCI6XHJcblx0XHRcdFx0dGhpcy5fY3JlYXRlKGRhdGEsIHR5cGUpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIFwiR1VJRFwiOlxyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHQvL1RPRE86IOiOt+W+l1dpekV2ZW505pWw5o2u77yM5bm25Yib5bu65a+56LGhXHJcblx0XHRcdFx0XHRjb25zdCBkb2MgPSBnX2RiLkRvY3VtZW50RnJvbUdVSUQoZGF0YSk7XHJcblx0XHRcdFx0XHRjb25zdCBuZXdFdmVudERhdGEgPSB7XHJcblx0XHRcdFx0XHRcdFwiQ0FMRU5EQVJfRU5EXCIgOiBkb2MuR2V0UGFyYW1WYWx1ZSgnQ0FMRU5EQVJfRU5EJyksXHJcblx0XHRcdFx0XHRcdFwiQ0FMRU5EQVJfSU5GT1wiIDogZG9jLkdldFBhcmFtVmFsdWUoJ0NBTEVOREFSX0lORk8nKSxcclxuXHRcdFx0XHRcdFx0XCJDQUxFTkRBUl9FWFRSQUlORk9cIiA6IGRvYy5HZXRQYXJhbVZhbHVlKCdDQUxFTkRBUl9FWFRSQUlORk8nKSxcclxuXHRcdFx0XHRcdFx0XCJDQUxFTkRBUl9TVEFSVFwiIDogZG9jLkdldFBhcmFtVmFsdWUoJ0NBTEVOREFSX1NUQVJUJyksXHJcblx0XHRcdFx0XHRcdFwiQ0FMRU5EQVJfUkVDVVJSRU5DRVwiIDogZG9jLkdldFBhcmFtVmFsdWUoJ0NBTEVOREFSX1JFQ1VSUkVOQ0UnKSxcclxuXHRcdFx0XHRcdFx0XCJDQUxFTkRBUl9FTkRSRUNVUlJFTkNFXCIgOiBkb2MuR2V0UGFyYW1WYWx1ZSgnQ0FMRU5EQVJfRU5EUkVDVVJSRU5DRScpLFxyXG5cdFx0XHRcdFx0XHRcImNyZWF0ZWRcIiA6IG1vbWVudChkb2MuRGF0ZUNyZWF0ZWQpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpLFxyXG5cdFx0XHRcdFx0XHRcImd1aWRcIiA6IGRvYy5HVUlELFxyXG5cdFx0XHRcdFx0XHRcInRpdGxlXCIgOiBkb2MuVGl0bGUsXHJcblx0XHRcdFx0XHRcdFwidXBkYXRlZFwiIDogbW9tZW50KGRvYy5EYXRlTW9kaWZpZWQpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR0aGlzLl9jcmVhdGUobmV3RXZlbnREYXRhLCAnV2l6RXZlbnQnKTtcclxuXHRcdFx0XHR9IGNhdGNoIChlKSB7IGNvbnNvbGUuZXJyb3IoZSk7IH1cclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRfY3JlYXRlKGRhdGEsIHR5cGUpIHtcclxuXHRcdGxldCBzdGFydCwgZW5kLCBpZCwgYmtDb2xvciwgYWxsRGF5LCBjb21wbGV0ZSwgZGF0ZUNvbXBsZXRlZCwgcnB0UnVsZSwgcnB0RW5kO1xyXG5cdFx0c3dpdGNoICh0eXBlKSB7XHJcblx0XHRcdGNhc2UgXCJHVUlEXCI6XHJcblx0XHRcdGNhc2UgXCJXaXpFdmVudFwiOlxyXG5cdFx0XHRcdHRoaXMuX0luZm8gPSB0aGlzLl9wYXJzZUluZm8oZGF0YS5DQUxFTkRBUl9JTkZPKTtcclxuXHRcdFx0XHR0aGlzLl9FeHRyYUluZm8gPSBkYXRhLkNBTEVOREFSX0VYVFJBSU5GTyA/IHRoaXMuX3BhcnNlSW5mbyhkYXRhLkNBTEVOREFSX0VYVFJBSU5GTykgOiB0aGlzLl9nZXREZWZhdWx0RXh0cmFJbmZvKCk7XHJcblx0XHRcdFx0Ly8g57uf5LiA5Y+Y6YePXHJcblx0XHRcdFx0aWQgPSBkYXRhLmd1aWQ7XHJcblx0XHRcdFx0c3RhcnQgPSBkYXRhLkNBTEVOREFSX1NUQVJUO1xyXG5cdFx0XHRcdGVuZCA9IGRhdGEuQ0FMRU5EQVJfRU5EO1xyXG5cdFx0XHRcdC8vIOWIpOaWreaYr+WQpueUqOaIt+iHquWumuS5ieiDjOaZr+iJsu+8jOWQkeS4i+WFvOWuueWOn+eJiOaXpeWOhlxyXG5cdFx0XHRcdGJrQ29sb3IgPSB0aGlzLl9JbmZvLmNpID8gKCBwYXJzZUludCh0aGlzLl9JbmZvLmNpKSA9PSAwID8gdGhpcy5fSW5mby5iIDogQ29uZmlnLmNvbG9ySXRlbXNbdGhpcy5fSW5mby5jaV0uY29sb3JWYWx1ZSApIDogdGhpcy5fSW5mby5iO1xyXG5cdFx0XHRcdGFsbERheSA9IGRhdGEuQ0FMRU5EQVJfRU5ELmluZGV4T2YoXCIyMzo1OTo1OVwiKSAhPSAtMSA/IHRydWUgOiBmYWxzZTtcclxuXHRcdFx0XHRjb21wbGV0ZSA9IHRoaXMuX0V4dHJhSW5mby5Db21wbGV0ZTtcclxuXHRcdFx0XHRkYXRlQ29tcGxldGVkID0gdGhpcy5fRXh0cmFJbmZvLkRhdGVDb21wbGV0ZWQ7XHJcblx0XHRcdFx0Ly8g6YeN5aSN5LqL5Lu2XHJcblx0XHRcdFx0cnB0UnVsZSA9IGRhdGEuQ0FMRU5EQVJfUkVDVVJSRU5DRTtcclxuXHRcdFx0XHRycHRFbmQgPSBkYXRhLkNBTEVOREFSX0VORFJFQ1VSUkVOQ0U7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgXCJGdWxsQ2FsZW5kYXJFdmVudFwiOlxyXG5cdFx0XHRcdGlkID0gZGF0YS5pZDtcclxuXHRcdFx0XHRzdGFydCA9IGRhdGEuc3RhcnQ7XHJcblx0XHRcdFx0ZW5kID0gZGF0YS5lbmQ7XHJcblx0XHRcdFx0YmtDb2xvciA9IGRhdGEuYmFja2dyb3VuZENvbG9yO1xyXG5cdFx0XHRcdGFsbERheSA9IGRhdGEuYWxsRGF5ID8gZGF0YS5hbGxEYXkgOiAhJC5mdWxsQ2FsZW5kYXIubW9tZW50KGRhdGEuc3RhcnQpLmhhc1RpbWUoKTtcclxuXHRcdFx0XHRjb21wbGV0ZSA9IGRhdGEuY29tcGxldGUgfHwgMDtcclxuXHRcdFx0XHRkYXRlQ29tcGxldGVkID0gZGF0YS5kYXRlQ29tcGxldGVkIHx8ICcnO1xyXG5cdFx0XHRcdHJwdFJ1bGUgPSBkYXRhLnJwdFJ1bGU7XHJcblx0XHRcdFx0cnB0RW5kID0gZGF0YS5ycHRFbmRcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgaWRlbnRpZnkgZGF0YSB0eXBlLicpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdFx0Ly8g5Z+65pys5L+h5oGvXHJcblx0XHR0aGlzLmlkID0gaWQ7XHJcblx0XHR0aGlzLnRpdGxlID0gZGF0YS50aXRsZTtcclxuXHRcdC8vIOaXtumXtOS/oeaBr1xyXG5cdFx0dGhpcy5hbGxEYXkgPSBhbGxEYXk7XHJcblx0XHQvLyDms6jmhI/vvIFzdGFydC9lbmQg5Y+v6IO95pivbW9tZW505a+56LGh5oiW6ICFc3Ry77yM5omA5Lul5LiA5b6L5YWI6L2s5o2i5oiQbW9tZW505YaN5qC85byP5YyW6L6T5Ye6XHJcblx0XHR0aGlzLnN0YXJ0ID0gYWxsRGF5ID8gbW9tZW50KHN0YXJ0KS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpIDogbW9tZW50KHN0YXJ0KS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdHRoaXMuZW5kID0gYWxsRGF5ID8gbW9tZW50KGVuZCkuZm9ybWF0KFwiWVlZWS1NTS1ERFwiKSA6IG1vbWVudChlbmQpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0dGhpcy5jcmVhdGVkID0gZGF0YS5jcmVhdGVkID8gZGF0YS5jcmVhdGVkIDogbW9tZW50KHN0YXJ0KS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdHRoaXMudXBkYXRlZCA9IGRhdGEudXBkYXRlZCA/IGRhdGEudXBkYXRlZCA6IG1vbWVudCgpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0Ly8g6K6+572u5L+h5oGvXHJcblx0XHR0aGlzLnRleHRDb2xvciA9ICdibGFjayc7XHJcblx0XHR0aGlzLmJhY2tncm91bmRDb2xvciA9IGJrQ29sb3I7XHJcblx0XHR0aGlzLmNvbXBsZXRlID0gY29tcGxldGU7XHJcblx0XHR0aGlzLmRhdGVDb21wbGV0ZWQgPSBkYXRlQ29tcGxldGVkO1xyXG5cdFx0Ly8g6YeN5aSN5LqL5Lu2XHJcblx0XHR0aGlzLnJwdFJ1bGUgPSBycHRSdWxlO1xyXG5cdFx0dGhpcy5ycHRFbmQgPSBycHRFbmQ7XHJcblx0XHQvL1xyXG5cdFx0dGhpcy5fdXBkYXRlKCk7XHJcblx0fVxyXG5cclxuXHRfY2hlY2tEYXRhVHlwZShkYXRhKSB7XHJcblx0XHRjb25zdCBvYmpDbGFzcyA9IGRhdGEuY29uc3RydWN0b3I7XHJcbiAgICAgICAgY29uc3QgR1VJRF9SZWdFeHIgPSAvXlswLTlhLWZdezh9LVswLTlhLWZdezR9LVsxLTVdWzAtOWEtZl17M30tWzg5YWJdWzAtOWEtZl17M30tWzAtOWEtZl17MTJ9JC9pO1xyXG4gICAgICAgIGxldCB0eXBlO1xyXG4gICAgICAgIHN3aXRjaCAob2JqQ2xhc3MpIHtcclxuICAgICAgICAgICAgY2FzZSBTdHJpbmc6XHJcbiAgICAgICAgICAgICAgICBpZiAoIEdVSURfUmVnRXhyLnRlc3QoZGF0YSkgKSB0eXBlID0gXCJHVUlEXCI7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHRocm93IG5ldyBFcnJvcignVW5rbm93biBkYXRhLCBjYW5ub3QgY3JlYXRlIENhbGVuZGFyRXZlbnQgb2JqZWN0LicpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgT2JqZWN0OlxyXG5cdFx0XHRcdGlmICggZGF0YS5DQUxFTkRBUl9JTkZPICYmIGRhdGEudGl0bGUgKSB7IFxyXG5cdFx0XHRcdFx0dHlwZSA9ICdXaXpFdmVudCc7XHJcblx0XHRcdFx0fSBlbHNlIGlmICggZGF0YS5zdGFydCAmJiBkYXRhLnRpdGxlICkge1xyXG5cdFx0XHRcdFx0dHlwZSA9ICdGdWxsQ2FsZW5kYXJFdmVudCc7XHJcblx0XHRcdFx0fVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0eXBlO1xyXG5cdH07XHJcblxyXG5cdF9wYXJzZUluZm8oSW5mb1N0cmluZykge1xyXG5cdFx0Y29uc3QgSW5mb09iamVjdCA9IHt9O1xyXG5cdFx0Ly8g5ouG6KejQ0FMRU5EQVJfSU5GT1xyXG5cdFx0Y29uc3QgSW5mb0FycmF5ID0gSW5mb1N0cmluZy5zcGxpdCgnLycpO1xyXG5cdFx0SW5mb0FycmF5LmZvckVhY2goZnVuY3Rpb24oaXRlbSwgaW5kZXgsIGFycil7XHJcblx0XHRcdGNvbnN0IHBhaXIgPSBpdGVtLnNwbGl0KCc9Jyk7XHJcblx0XHRcdEluZm9PYmplY3RbcGFpclswXV0gPSBwYWlyWzFdO1xyXG5cdFx0fSk7XHJcblx0XHQvLyDlpITnkIbpopzoibLlgLxcclxuXHRcdGlmICggSW5mb09iamVjdC5iICkgSW5mb09iamVjdC5iID0gJyMnICsgSW5mb09iamVjdC5iO1xyXG5cclxuXHRcdHJldHVybiBJbmZvT2JqZWN0O1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG4gICAgICog5bCGIEluZm8g5a+56LGh5bqP5YiX5YyWLlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtJbmZvT2JqZWN0PV0g5o+Q5L6bIEluZm8g5a+56LGh77yM6buY6K6k5Li6YHRoaXMuX0luZm9gLlxyXG4gICAgICogQHJldHVybiB7U3RyaW5nfSDov5Tlm57nlKjkuo5JbmZv5a+56LGh5a2X56ym5LiyLlxyXG4gICAgICovXHJcblx0X3N0cmluZ2lmeUluZm8oIEluZm9PYmplY3QgPSB0aGlzLl9JbmZvICkge1xyXG5cdFx0aWYgKCAhSW5mb09iamVjdCApIHJldHVybiAnJztcclxuXHRcdGNvbnN0IEluZm9BcnJheSA9IFtdO1xyXG5cdFx0Y29uc3QgSW5mb09iamVjdEtleXNBcnJheSA9IE9iamVjdC5rZXlzKEluZm9PYmplY3QpO1xyXG5cdFx0SW5mb09iamVjdEtleXNBcnJheS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0sIGluZGV4LCBhcnIpe1xyXG5cdFx0XHRjb25zdCBzaW5nbGVJbmZvID0gYCR7aXRlbX09JHtJbmZvT2JqZWN0W2l0ZW1dfWA7XHJcblx0XHRcdEluZm9BcnJheS5wdXNoKHNpbmdsZUluZm8pO1xyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gSW5mb0FycmF5LmpvaW4oJy8nKS5yZXBsYWNlKCcjJywgJycpO1xyXG5cdH07XHJcblxyXG5cdF91cGRhdGUoKSB7XHJcblx0XHR0aGlzLl91cGRhdGVJbmZvKCk7XHJcblx0XHR0aGlzLl91cGRhdGVFeHRyYUluZm8oKTtcclxuXHR9O1xyXG5cclxuXHRfdXBkYXRlSW5mbygpIHtcclxuXHRcdGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cdFx0Y29uc3QgSW5mb09iamVjdCA9IHtcclxuXHRcdFx0J2InOiBudWxsLCAvL+iDjOaZr+iJsmhleOWAvFxyXG5cdFx0XHQncic6ICctMScsIC8v5o+Q6YaS5pa55byPXHJcblx0XHRcdCdjJzogJzAnLCAvL+e7k+adn+aPkOmGkuS/oeaBr1xyXG5cdFx0XHQnY2knOiAwIC8v6IOM5pmv6ImySUTvvIzpu5jorqQgMCDooajnpLrog4zmma/kuLrnlKjmiLfoh6rlrprkuYlcclxuXHRcdH07XHJcblx0XHQvLyDmm7TmlrDog4zmma/oibInYidcclxuXHRcdEluZm9PYmplY3RbJ2InXSA9IHRoaXMuYmFja2dyb3VuZENvbG9yLnJlcGxhY2UoJyMnLCAnJyk7XHJcblx0XHQvLyDmm7TmlrDpopzoibLmjIfmlbAnY2knXHJcblx0XHRDb25maWcuY29sb3JJdGVtcy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0sIGluZGV4LCBhcnIpe1xyXG5cdFx0XHRpZiAoIGl0ZW0uY29sb3JWYWx1ZSA9PSAgdGhhdC5iYWNrZ3JvdW5kQ29sb3IgKSB7XHJcblx0XHRcdFx0Ly8g5b2T5pel56iL6IOM5pmv6Imy5LiO6Imy6KGo5Yy56YWN5pe25YiZ55SoIGNvbG9yIGlkZXgg5p2l5YKo5a2Y77yI5YW85a655Y6f54mI5pel5Y6G5o+S5Lu277yJXHJcblx0XHRcdFx0SW5mb09iamVjdFsnY2knXSA9IGluZGV4O1xyXG5cdFx0XHR9O1xyXG5cdFx0fSk7XHJcblx0XHQvLyDlupTnlKjmm7TmlrBcclxuXHRcdHRoaXMuX0luZm8gPSBJbmZvT2JqZWN0O1xyXG5cdH07XHJcblxyXG5cdF9nZXREZWZhdWx0RXh0cmFJbmZvKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0J0NvbXBsZXRlJzogMCwgLy9cclxuXHRcdFx0J0RhdGVDb21wbGV0ZWQnOiAnJywgLy8gSVNPIOagh+WHhuaXpeacn+Wtl+espuS4siBZWVlZLU1NLUREIDAwOjAwOjAwXHJcblx0XHRcdCdQcmlvcic6IDBcclxuXHRcdH07XHJcblx0fTtcclxuXHJcblx0X3VwZGF0ZUV4dHJhSW5mbygpIHtcclxuXHRcdGNvbnN0IEV4dHJhSW5mb09iamVjdCA9IHtcclxuXHRcdFx0J0NvbXBsZXRlJzogMCxcclxuXHRcdFx0J0RhdGVDb21wbGV0ZWQnOiAnJyxcclxuXHRcdFx0J1ByaW9yJzogMFxyXG5cdFx0fTtcclxuXHRcdEV4dHJhSW5mb09iamVjdFsnQ29tcGxldGUnXSA9IHRoaXMuY29tcGxldGU7XHJcblx0XHRFeHRyYUluZm9PYmplY3RbJ0RhdGVDb21wbGV0ZWQnXSA9IHRoaXMuZGF0ZUNvbXBsZXRlZDtcclxuXHRcdHRoaXMuX0V4dHJhSW5mbyA9IEV4dHJhSW5mb09iamVjdDtcclxuXHR9O1xyXG5cclxuXHRfZ2V0RXZlbnRIdG1sKHRpdGxlID0gdGhpcy50aXRsZSwgY29udGVudCA9ICcnKXtcclxuXHRcdGNvbnN0IGh0bWxUZXh0ID0gXHJcblx0XHRcdGA8aHRtbD5cclxuXHRcdFx0XHQ8aGVhZD5cclxuXHRcdFx0XHRcdDxtZXRhIGh0dHAtZXF1aXY9XCJDb250ZW50LVR5cGVcIiBjb250ZW50PVwidGV4dC9odG1sOyBjaGFyc2V0PXVuaWNvZGVcIj5cclxuXHRcdFx0XHRcdDx0aXRsZT4ke3RpdGxlfTwvdGl0bGU+IFxyXG5cdFx0XHRcdDwvaGVhZD5cclxuXHRcdFx0XHQ8Ym9keT5cclxuXHRcdFx0XHRcdDwhLS1XaXpIdG1sQ29udGVudEJlZ2luLS0+XHJcblx0XHRcdFx0XHQ8ZGl2PiR7Y29udGVudH08L2Rpdj5cclxuXHRcdFx0XHRcdDwhLS1XaXpIdG1sQ29udGVudEVuZC0tPlxyXG5cdFx0XHRcdDwvYm9keT5cclxuXHRcdFx0PC9odG1sPmA7XHJcblx0XHJcblx0XHQgIHJldHVybiBodG1sVGV4dFxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG4gICAgICog5qC55o2u5pel56iL55qE6YeN5aSN6KeE5YiZ55Sf5oiQIEZ1bGxDYWxlbmRhciBldmVudFNvdXJjZS5cclxuXHQgKiBAcGFyYW0ge1N0cmluZ30gc3RhcnQg5p+l6K+i6LW35aeL77yMSVNPIOagh+WHhuaXpeacn+Wtl+espuS4si5cclxuXHQgKiBAcGFyYW0ge1N0cmluZ30gZW5kIOafpeivoue7k+adn++8jElTTyDmoIflh4bml6XmnJ/lrZfnrKbkuLIuXHJcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBldmVudFNvdXJjZS5cclxuICAgICAqL1xyXG5cdGdlbmVyYXRlUmVwZWF0RXZlbnRzKHN0YXJ0LCBlbmQpIHtcclxuXHRcdGlmICggIXRoaXMucnB0UnVsZSApIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGZpbmQgQ2FsZW5kYXJFdmVudCByZXBlYXQgcnVsZS4nKTtcclxuXHRcdGNvbnN0IGV2ZW50U291cmNlID0ge1xyXG5cdFx0XHRpZDogdGhpcy5pZCxcclxuXHRcdFx0ZXZlbnRzOiBbXVxyXG5cdFx0fVxyXG5cdFx0Ly/moLnmja5ycHRSdWxl55Sf5oiQ6YeN5aSN5pel5pyf77yM5bm255Sf5oiQ5LqL5Lu2XHJcblx0XHRjb25zdCBkYXlBcnJheSA9IHRoaXMuX2dldFJlbmRlclJlcGVhdERheShzdGFydCwgZW5kKTtcclxuXHRcdGZvciAoIGxldCBkYXkgb2YgZGF5QXJyYXkgKSB7XHJcblx0XHRcdC8vIGRheSDmmK/kuIDkuKpNb21lbnTml6XmnJ/lr7nosaFcclxuXHRcdFx0Y29uc3QgbmV3RXZlbnQgPSB0aGlzLnRvRnVsbENhbGVuZGFyRXZlbnQoKTtcclxuXHRcdFx0bmV3RXZlbnQuc3RhcnQgPSBkYXkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRcdG5ld0V2ZW50LmVuZCA9IG1vbWVudChuZXdFdmVudC5lbmQpLmFkZCggZGF5LmRpZmYoIG1vbWVudCh0aGlzLnN0YXJ0KSApICkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRcdGV2ZW50U291cmNlLmV2ZW50cy5wdXNoKG5ld0V2ZW50KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZXZlbnRTb3VyY2U7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcbiAgICAgKiDmoLnmja7op4TliJnnlJ/miJDml6XmnJ/mlbDnu4RcclxuICAgICAqIEByZXR1cm5zIHtPYmplY3RbXX0g5YyF5ZCr5LiA57O75YiXYE1vbWVudGDml6XmnJ/lr7nosaHnmoTmlbDnu4QuXHJcbiAgICAgKi9cclxuXHRfZ2V0UmVuZGVyUmVwZWF0RGF5KHN0YXJ0LCBlbmQpIHtcclxuXHRcdGNvbnN0IHJwdFJ1bGUgPSB0aGlzLnJwdFJ1bGU7XHJcblx0XHRsZXQgZGF5QXJyYXk7XHJcblx0XHRsZXQgcmVnZXg7XHJcblx0XHRjb25zb2xlLmNvdW50KHJwdFJ1bGUpO1xyXG5cdFx0aWYgKCAocmVnZXggPSAvXkV2ZXJ5KFxcZCk/V2Vla3M/KFxcZCopJC8pLnRlc3QocnB0UnVsZSkgKSB7XHJcblx0XHRcdC8vIOavj1sxMjM0XeWRqFs3MTIzNDU2XVxyXG5cdFx0XHRjb25zdCBjdXJXZWVrRGF5ID0gbW9tZW50KHRoaXMuc3RhcnQpLmRheSgpO1xyXG5cdFx0XHRjb25zdCByZXN1bHRzID0gcmVnZXguZXhlYyhycHRSdWxlKTtcclxuXHRcdFx0Y29uc3QgaW50ZXJXZWVrID0gcmVzdWx0c1sxXTtcclxuXHRcdFx0Y29uc3QgbnVtYmVyID0gcmVzdWx0c1syXSB8fCBgJHtjdXJXZWVrRGF5fWA7XHJcblx0XHRcdGRheUFycmF5ID0gdGhpcy5fZ2V0V2Vla2x5UmVwZWF0RGF5KG51bWJlciwgc3RhcnQsIGVuZCwgaW50ZXJXZWVrKTtcclxuXHJcblx0XHR9IGVsc2UgaWYgKCAocmVnZXggPSAvXkV2ZXJ5V2Vla2RheShcXGQqKSQvKS50ZXN0KHJwdFJ1bGUpICkge1xyXG5cdFx0XHQvLyDmr4/kuKrlt6XkvZzml6VFdmVyeVdlZWtkYXkxMzVcclxuXHRcdFx0Y29uc3QgcmVzdWx0cyA9IHJlZ2V4LmV4ZWMocnB0UnVsZSk7XHJcblx0XHRcdGNvbnN0IG51bWJlciA9IHJlc3VsdHNbMV0gfHwgJzEyMzQ1JztcclxuXHRcdFx0ZGF5QXJyYXkgPSB0aGlzLl9nZXRXZWVrbHlSZXBlYXREYXkobnVtYmVyLCBzdGFydCwgZW5kKTtcclxuXHJcblx0XHR9IGVsc2UgaWYgKCAocmVnZXggPSAvRGFpbHl8V2Vla2x5fE1vbnRobHl8WWVhcmx5LykudGVzdChycHRSdWxlKSApIHtcclxuXHRcdFx0Ly8gRGFpbHl8V2Vla2x5fE1vbnRobHl8WWVhcmx5XHJcblx0XHRcdGNvbnN0IHBlclJ1bGUgPSByZWdleC5leGVjKHJwdFJ1bGUpWzBdXHJcblx0XHRcdGRheUFycmF5ID0gdGhpcy5fZ2V0UGVyUmVwZWF0RGF5cyhzdGFydCwgZW5kLCBwZXJSdWxlKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGRheUFycmF5O1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG4gICAgICog5qC55o2u5q+P5ZGo6KeE5YiZ55Sf5oiQ5pel5pyf5pWw57uEXHJcblx0ICogQHBhcmFtIHtTdHJpbmd9IG51bWJlciDmlbTmlbDlrZfnrKbkuLLooajnpLrnmoTop4TliJnvvJtcclxuICAgICAqIEByZXR1cm5zIHtPYmplY3RbXX0g5YyF5ZCr5LiA57O75YiXTW9tZW505pel5pyf5a+56LGh55qE5pWw57uELlxyXG4gICAgICovXHJcblx0X2dldFdlZWtseVJlcGVhdERheShudW1iZXIsIHN0YXJ0LCBlbmQsIGludGVyV2Vla3MgPSAnMScpIHtcclxuXHRcdC8v6L+U5ZueW3tzdGFydCwgZW5kfSwge3N0YXJ0LCBlbmR9LCB7c3RhcnQsIGVuZH1dXHJcblx0XHQvL+iAg+iZkea4suafk+iMg+WbtO+8jOS7peWPiue7k+adn+W+queOr+eahOaXpeacn1xyXG5cdFx0Y29uc3Qgdmlld1N0YXJ0ID0gbW9tZW50KHRoaXMuc3RhcnQpO1xyXG5cdFx0Y29uc3Qgdmlld0VuZCA9IG1vbWVudChlbmQpO1xyXG5cdFx0Y29uc3QgcnB0RW5kID0gdGhpcy5ycHRFbmQgPyBtb21lbnQodGhpcy5ycHRFbmQpIDogdmlld0VuZDtcclxuXHRcdGxldCBkYXlBcnJheSA9IFtdO1xyXG5cdFx0Y29uc3QgaW50ZXJ2YWxXZWVrcyA9IGludGVyV2Vla3MgPyBwYXJzZUludChpbnRlcldlZWtzKSA6IDE7XHJcblx0XHRjb25zdCB3ZWVrZGF5cyA9IG51bWJlci5yZXBsYWNlKCc3JywgJzAnKS5zcGxpdCgnJyk7IC8v5ZGo5pelMH425ZGo5YWtXHJcblx0XHRmb3IgKCBsZXQgZGF5IG9mIHdlZWtkYXlzICkge1xyXG5cdFx0XHQvL1xyXG5cdFx0XHRsZXQgY3VyV2Vla0RheSA9IHBhcnNlSW50KGRheSksIG5ld0V2ZW50U3RhcnREYXRlID0gbW9tZW50KHZpZXdTdGFydCk7XHJcblx0XHRcdGRvIHtcclxuXHRcdFx0XHQvLyDliJvlu7rmlrBNb21lbnTlr7nosaFcclxuXHRcdFx0XHRuZXdFdmVudFN0YXJ0RGF0ZSA9IG1vbWVudCh2aWV3U3RhcnQpLmRheShjdXJXZWVrRGF5KTtcclxuXHRcdFx0XHQvLyDmoLnmja7ml6XnqIvorr7nva50aW1lIHBhcnRcclxuXHRcdFx0XHRjb25zdCBldmVudFN0YXJ0ID0gbW9tZW50KHRoaXMuc3RhcnQpXHJcblx0XHRcdFx0bmV3RXZlbnRTdGFydERhdGUuc2V0KHtcclxuXHRcdFx0XHRcdCdob3VyJzogZXZlbnRTdGFydC5nZXQoJ2hvdXInKSxcclxuXHRcdFx0XHRcdCdtaW51dGUnOiBldmVudFN0YXJ0LmdldCgnbWludXRlJyksXHJcblx0XHRcdFx0XHQnc2Vjb25kJzogZXZlbnRTdGFydC5nZXQoJ3NlY29uZCcpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQvLyDpgb/lhY3liJ3lp4vph43lpI3muLLmn5NcclxuXHRcdFx0XHRpZiAoICFuZXdFdmVudFN0YXJ0RGF0ZS5pc1NhbWUoIGV2ZW50U3RhcnQgKSApIGRheUFycmF5LnB1c2goIG1vbWVudChuZXdFdmVudFN0YXJ0RGF0ZSkgKTtcclxuXHRcdFx0XHQvLyDpmpTlpJrlsJHlkajph43lpI1cclxuXHRcdFx0XHRjdXJXZWVrRGF5ICs9IDcqaW50ZXJ2YWxXZWVrcztcclxuXHRcdFx0XHQvL2NvbnNvbGUubG9nKCBtb21lbnQobmV3RXZlbnRTdGFydERhdGUpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpICk7XHJcblx0XHRcdH0gd2hpbGUgKCBtb21lbnQodmlld1N0YXJ0KS5kYXkoY3VyV2Vla0RheSArIDcgKS5pc0JlZm9yZSggdmlld0VuZCApIFxyXG5cdFx0XHRcdFx0XHQmJiBtb21lbnQodmlld1N0YXJ0KS5kYXkoY3VyV2Vla0RheSArIDcgKS5pc0JlZm9yZSggcnB0RW5kICkgIClcclxuXHRcdFx0XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiBkYXlBcnJheTtcclxuXHR9O1xyXG5cclxuXHRfZ2V0UGVyUmVwZWF0RGF5cyhzdGFydCwgZW5kLCBwZXJSdWxlKSB7XHJcblx0XHRjb25zdCBwZXJSdWxlTWFwID0ge1xyXG5cdFx0XHQnRGFpbHknOiAnZGF5cycsXHJcblx0XHRcdCdXZWVrbHknIDogJ3dlZWtzJyxcclxuXHRcdFx0J01vbnRobHknIDogJ21vbnRocycsXHJcblx0XHRcdCdZZWFybHknIDogJ3llYXJzJ1xyXG5cdFx0fTtcclxuXHRcdGNvbnN0IHZpZXdTdGFydCA9IG1vbWVudCh0aGlzLnN0YXJ0KTtcclxuXHRcdGNvbnN0IHZpZXdFbmQgPSBtb21lbnQoZW5kKTtcclxuXHRcdGNvbnN0IHJwdEVuZCA9IHRoaXMucnB0RW5kID8gbW9tZW50KHRoaXMucnB0RW5kKSA6IHZpZXdFbmQ7XHJcblx0XHRsZXQgZGF5QXJyYXkgPSBbXTtcclxuXHRcdGNvbnN0IGV2ZW50U3RhcnQgPSBtb21lbnQodGhpcy5zdGFydClcclxuXHRcdGRvIHtcclxuXHRcdFx0Ly8g5aKe5Yqg5LiA5Liq5pyIXHJcblx0XHRcdGV2ZW50U3RhcnQuYWRkKDEsIHBlclJ1bGVNYXBbcGVyUnVsZV0pO1xyXG5cdFx0XHRkYXlBcnJheS5wdXNoKCBtb21lbnQoZXZlbnRTdGFydCkgKTtcclxuXHRcdH0gd2hpbGUgKCBldmVudFN0YXJ0LmlzQmVmb3JlKCB2aWV3RW5kICkgJiYgZXZlbnRTdGFydC5pc0JlZm9yZSggcnB0RW5kICkgKTtcclxuXHJcblx0XHRyZXR1cm4gZGF5QXJyYXk7XHJcblx0fVxyXG5cclxuXHR0b0Z1bGxDYWxlbmRhckV2ZW50KCkge1xyXG5cdFx0Ly8g5rOo5oSP5pa55rOV6L+U5Zue55qE5Y+q5pivRnVsbENhbGVuZGFyRXZlbnTnmoTmlbDmja7nsbvlnovvvIzlubbkuI3mmK9ldmVudOWvueixoVxyXG5cdFx0Y29uc3QgdGhhdCA9IHRoaXM7XHJcblx0XHRjb25zdCBuZXdFdmVudCA9IHt9O1xyXG5cdFx0Y29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMpO1xyXG5cdFx0Ly8g5Y676Zmk6Z2e5b+F6KaB5bGe5oCnXHJcblx0XHRrZXlzLnNwbGljZSgga2V5cy5maW5kSW5kZXgoIChpKSA9PiBpID09ICdfSW5mbycgKSwgMSk7XHJcblx0XHRrZXlzLnNwbGljZSgga2V5cy5maW5kSW5kZXgoIChpKSA9PiBpID09ICdfRXh0cmFJbmZvJyApLCAxKTtcclxuXHRcdC8vIOa1heaLt+i0nSwg5LiN6L+H5Li76KaB5bGe5oCn6YO95piv5Z+65pys5pWw5o2u57G75Z6L77yM5omA5Lul5LiN5a2Y5Zyo5byV55So6Zeu6aKYXHJcblx0XHRrZXlzLmZvckVhY2goZnVuY3Rpb24oaXRlbSwgaW5kZXgsIGFycil7XHJcblx0XHRcdG5ld0V2ZW50W2l0ZW1dID0gdGhhdFtpdGVtXTtcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIG5ld0V2ZW50O1xyXG5cdH07XHJcblxyXG5cdHRvV2l6RXZlbnREYXRhKCkge1xyXG5cdFx0dGhpcy5fdXBkYXRlKCk7XHJcblx0XHRjb25zdCBuZXdFdmVudCA9IHt9O1xyXG5cdFx0bmV3RXZlbnQudGl0bGUgPSB0aGlzLnRpdGxlO1xyXG5cdFx0bmV3RXZlbnQuZ3VpZCA9IHRoaXMuaWQ7XHJcblx0XHRuZXdFdmVudC5DQUxFTkRBUl9TVEFSVCA9IHRoaXMuYWxsRGF5ID8gbW9tZW50KHRoaXMuc3RhcnQpLmZvcm1hdCgnWVlZWS1NTS1ERCAwMDowMDowMCcpIDogdGhpcy5zdGFydDtcclxuXHRcdG5ld0V2ZW50LkNBTEVOREFSX0VORCA9IHRoaXMuYWxsRGF5ID8gbW9tZW50KHRoaXMuZW5kKS5mb3JtYXQoJ1lZWVktTU0tREQgMjM6NTk6NTknKSA6IHRoaXMuZW5kO1xyXG5cdFx0bmV3RXZlbnQuQ0FMRU5EQVJfSU5GTyA9IHRoaXMuX3N0cmluZ2lmeUluZm8odGhpcy5fSW5mbyk7XHJcblx0XHRuZXdFdmVudC5DQUxFTkRBUl9FWFRSQUlORk8gPSB0aGlzLl9zdHJpbmdpZnlJbmZvKHRoaXMuX0V4dHJhSW5mbyk7XHJcblx0XHRuZXdFdmVudC5jcmVhdGVkID0gdGhpcy5jcmVhdGVkO1xyXG5cdFx0bmV3RXZlbnQudXBkYXRlZCA9IHRoaXMudXBkYXRlZDtcclxuXHRcdHJldHVybiBuZXdFdmVudDtcclxuXHR9O1xyXG5cclxuXHRhZGRUb0Z1bGxDYWxlbmRhcigpIHtcclxuXHRcdC8vVE9ETzog5bCG6Ieq6Lqr5re75Yqg5YiwRnVsbENhbGVuZGFyXHJcblx0XHQkKCcjY2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoICdhZGRFdmVudFNvdXJjZScsIHtcclxuXHRcdFx0ZXZlbnRzOiBbXHJcblx0XHRcdFx0dGhpcy50b0Z1bGxDYWxlbmRhckV2ZW50KClcclxuXHRcdFx0XVxyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0X3NhdmVBbGxQcm9wKCkge1xyXG5cdFx0Ly9UT0RPOiDkv53lrZjlhajpg6jmlbDmja7ljIXmi6xUaXRsZVxyXG5cdFx0Ly8g5pu05paw5LqL5Lu25paH5qGj5pWw5o2uXHJcblx0XHRjb25zdCBkb2MgPSBnX2RiLkRvY3VtZW50RnJvbUdVSUQodGhpcy5pZCk7XHJcblx0XHQvLyDkv53lrZjmoIfpophcclxuXHRcdGRvYy5UaXRsZSA9IHRoaXMudGl0bGU7XHJcblx0XHQvLyDkv53lrZjml7bpl7TmlbDmja5cclxuXHRcdGlmICggdGhpcy5hbGxEYXkgKSB7XHJcblx0XHRcdGxldCBzdGFydFN0ciA9IG1vbWVudCh0aGlzLnN0YXJ0KS5zZXQoeydoJzogMCwgJ20nOiAwLCAncyc6IDB9KS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0bGV0IGVuZFN0ciA9IG1vbWVudCh0aGlzLmVuZCkuc2V0KHsnaCc6IDIzLCAnbSc6IDU5LCAncyc6IDU5fSkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX1NUQVJUXCIsIHN0YXJ0U3RyKTtcclxuXHRcdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfRU5EXCIsIGVuZFN0cik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRsZXQgc3RhcnRTdHIgPSBtb21lbnQodGhpcy5zdGFydCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRcdGxldCBlbmRTdHIgPSBtb21lbnQodGhpcy5lbmQpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9TVEFSVFwiLCBzdGFydFN0cik7XHJcblx0XHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX0VORFwiLCBlbmRTdHIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIOS/neWtmCBDQUxFTkRBUl9JTkZPXHJcblx0XHR0aGlzLl91cGRhdGUoKTtcclxuXHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX0lORk9cIiwgdGhpcy5fc3RyaW5naWZ5SW5mbyh0aGlzLl9JbmZvKSk7XHJcblx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9FWFRSQUlORk9cIiwgdGhpcy5fc3RyaW5naWZ5SW5mbyh0aGlzLl9FeHRyYUluZm8pKTtcclxuXHR9O1xyXG5cclxuXHQvLyDorr7nva7mlofmoaPlsZ7mgKflgLxcclxuXHRfc2V0UGFyYW1WYWx1ZShkb2MsIGtleSwgdmFsdWUpIHtcclxuXHRcdGlmICghZG9jKSByZXR1cm4gZmFsc2U7XHJcblx0XHRkb2MuU2V0UGFyYW1WYWx1ZShrZXksIHZhbHVlKTtcclxuXHR9O1xyXG5cclxuXHRfY3JlYXRlV2l6RXZlbnREb2MoKSB7XHJcblx0XHQvL1RPRE86IOS/neWtmOWFqOmDqOaVsOaNruWMheaLrFRpdGxlXHJcblx0XHQvLyDliJvlu7pXaXpEb2NcclxuXHRcdGNvbnN0IGxvY2F0aW9uID0gYE15IEV2ZW50cy8keyBtb21lbnQodGhpcy5zdGFydCkuZm9ybWF0KCdZWVlZLU1NJykgfS9gO1xyXG5cdFx0Y29uc3Qgb2JqRm9sZGVyID0gZ19kYi5HZXRGb2xkZXJCeUxvY2F0aW9uKGxvY2F0aW9uLCB0cnVlKTtcclxuXHRcdGNvbnN0IHRlbXBIdG1sID0gZ19jbW4uR2V0QVRlbXBGaWxlTmFtZSgnLmh0bWwnKTtcclxuXHRcdGNvbnN0IGh0bWxUZXh0ID0gdGhpcy5fZ2V0RXZlbnRIdG1sKHRoaXMudGl0bGUsICcnKTtcclxuXHRcdGdfY21uLlNhdmVUZXh0VG9GaWxlKHRlbXBIdG1sLCBodG1sVGV4dCwgJ3VuaWNvZGUnKTtcclxuXHRcdGNvbnN0IGRvYyA9IG9iakZvbGRlci5DcmVhdGVEb2N1bWVudDIodGhpcy50aXRsZSwgXCJcIik7XHJcblx0XHRkb2MuQ2hhbmdlVGl0bGVBbmRGaWxlTmFtZSh0aGlzLnRpdGxlKTtcclxuXHRcdGRvYy5VcGRhdGVEb2N1bWVudDYodGVtcEh0bWwsIHRlbXBIdG1sLCAweDIyKTtcclxuXHRcdC8vIOiuvue9ruagh+etvlxyXG5cdFx0Ly9pZiAoIHRhZ3MgKSBkb2MuU2V0VGFnc1RleHQyKHRhZ3MsIFwiQ2FsZW5kYXJcIik7XHJcblx0XHQvLyDlsIbkv6Hmga/nvJbnoIHliLBXaXpEb2PlsZ7mgKfkuK3ljrtcclxuXHRcdGNvbnN0IG5ld0V2ZW50ID0gdGhpcy50b1dpekV2ZW50RGF0YSgpO1xyXG5cdFx0ZG9jLkFkZFRvQ2FsZW5kYXIobmV3RXZlbnQuQ0FMRU5EQVJfU1RBUlQsIG5ld0V2ZW50LkNBTEVOREFSX0VORCwgbmV3RXZlbnQuQ0FMRU5EQVJfSU5GTyk7XHJcblx0XHQvLyBjaGFuZ2UgZGF0YWJhc2VcclxuXHRcdGRvYy50eXBlID0gXCJldmVudFwiO1xyXG5cdFx0Ly9cclxuXHRcdHRoaXMuaWQgPSBkb2MuR1VJRDtcclxuXHR9XHJcblxyXG5cdHNhdmVUb1dpekV2ZW50RG9jKCBwcm9wID0gJ2FsbCcgKSB7XHJcblx0XHRpZiAoIWdfZGIgfHwgIWdfY21uKSB0aHJvdyBuZXcgRXJyb3IoJ0lXaXpEYXRhYmFzZSBvciBJV2l6Q29tbW9uVUkgaXMgbm90IHZhbGlkLicpO1xyXG5cdFx0Ly/mo4Dmn6XmlofmoaPmmK/lkKblrZjlnKhcclxuXHRcdGNvbnN0IGd1aWRSZWdleCA9IC9eWzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtNV1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn0kL2k7XHJcblx0XHRjb25zdCBpc1dpekRvY0V4aXN0ID0gZ3VpZFJlZ2V4LnRlc3QodGhpcy5pZCk7XHJcblx0XHQvLyDliJvlu7rmiJbogIXmm7TmlrDmlofmoaNcclxuXHRcdGlmICggaXNXaXpEb2NFeGlzdCApIHtcclxuXHRcdFx0Ly8g5qC55o2u5oyH5Luk5pu05paw5YaF5a65XHJcblx0XHRcdHRoaXMuX3NhdmVBbGxQcm9wKCk7XHJcblx0XHRcdC8vIOabtOaWsEZ1bGxDYWxlbmRhclxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Ly8g5Yib5bu65paw55qE5LqL5Lu25paH5qGjXHJcblx0XHRcdHRoaXMuX2NyZWF0ZVdpekV2ZW50RG9jKCk7XHJcblx0XHR9XHJcblx0XHRcclxuXHR9O1xyXG5cclxuXHRkZWxldGVFdmVudERhdGEoIGlzRGVsZXRlRG9jID0gZmFsc2UgKXtcclxuXHRcdGxldCBkb2MgPSBnX2RiLkRvY3VtZW50RnJvbUdVSUQodGhpcy5pZCk7XHJcblx0XHRpZiAoIWRvYykgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGZpbmQgRXZlbnQgcmVsYXRlZCBXaXpEb2N1bWVudC4nKVxyXG5cdFx0Ly8g56e76ZmkRnVsbENhbGVuZGFy5LqL5Lu2XHJcblx0XHQkKCcjY2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoJ3JlbW92ZUV2ZW50cycsIHRoaXMuaWQpO1xyXG5cdFx0Ly8g56e76Zmk5pel5Y6G5pWw5o2uXHJcblx0XHRkb2MuUmVtb3ZlRnJvbUNhbGVuZGFyKCk7XHJcblx0XHQvLyDliKDpmaTmlofmoaNcclxuXHRcdGlmICggaXNEZWxldGVEb2MgKSBkb2MuRGVsZXRlKCk7XHJcblx0fVxyXG5cclxuXHRyZWZldGNoRGF0YSgpIHtcclxuXHRcdC8vVE9ETzog6YeN5pWw5o2u5bqT6YeN5paw6I635Y+W5pWw5o2u5pu05paw5a6e5L6LXHJcblx0fTtcclxuXHJcblx0cmVmcmVzaEV2ZW50KGV2ZW50KSB7XHJcblx0XHQvL1RPRE86IOW6lOivpeiHquWKqOmBjeWOhuW5tuS/ruaUueWxnuaAp1xyXG5cdFx0aWYgKCBldmVudCApIHtcclxuXHRcdFx0Ly8g6YeN5paw5riy5p+TRnVsbENhbGVuZGFy5LqL5Lu2XHJcblx0XHRcdGV2ZW50LnRpdGxlID0gdGhpcy50aXRsZTtcclxuXHRcdFx0ZXZlbnQuYmFja2dyb3VuZENvbG9yID0gdGhpcy5iYWNrZ3JvdW5kQ29sb3I7XHJcblx0XHRcdCQoJyNjYWxlbmRhcicpLmZ1bGxDYWxlbmRhcigndXBkYXRlRXZlbnQnLCBldmVudCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQvL+eUqC5mdWxsQ2FsZW5kYXIoIOKAmGNsaWVudEV2ZW50c+KAmSBbLCBpZE9yRmlsdGVyIF0gKSAtPiBBcnJheSDojrflj5bmupDmlbDmja7ku47ogIzmm7TmlrBcclxuXHRcdFx0Ly9UT0RPOiDpgY3ljoblubblr7vmib5HVUlE5Yy56YWN55qE5LqL5Lu2XHJcblx0XHR9XHJcblx0fVxyXG5cclxufSIsImltcG9ydCB7IFdpekRhdGFiYXNlIGFzIG9iakRhdGFiYXNlIH0gZnJvbSAnLi4vdXRpbHMvV2l6SW50ZXJmYWNlJztcclxuaW1wb3J0IENhbGVuZGFyRXZlbnQgZnJvbSAnLi9DYWxlbmRhckV2ZW50JztcclxuXHJcbi8qIOaVsOaNruiOt+WPllxyXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcbi8qKiDor6XnsbvkuI5XaXpub3Rl55qEV2l6RGF0YWJhc2XmjqXlj6PkuqTmjaLkv6Hmga/vvIzojrflj5bmlbDmja4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2l6RXZlbnREYXRhTG9hZGVyIHtcclxuXHQvKipcclxuICAgICAqIOWIm+mAoOS4gOS4quS6i+S7tuaVsOaNruWKoOi9veWZqC5cclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gc3RhcnQg5p+l6K+i6LW35aeL5pel5pyf77yMSVNP5qCH5YeG5pel5pyf5a2X56ym5LiyLlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBlbmQg5p+l6K+i5oiq6Iez5pel5pyf77yMSVNP5qCH5YeG5pel5pyf5a2X56ym5LiyLlxyXG4gICAgICovXHJcblx0Y29uc3RydWN0b3Ioc3RhcnQsIGVuZCkge1xyXG5cdFx0aWYgKCFvYmpEYXRhYmFzZSkgdGhyb3cgbmV3IEVycm9yKCdXaXpEYXRhYmFzZSBub3QgdmFsaWQgIScpO1xyXG5cdFx0dGhpcy5EYXRhYmFzZSA9IG9iakRhdGFiYXNlO1xyXG5cdFx0dGhpcy51c2VyTmFtZSA9IG9iakRhdGFiYXNlLlVzZXJOYW1lO1xyXG5cdFx0dGhpcy5zdGFydCA9IHN0YXJ0O1xyXG5cdFx0dGhpcy5lbmQgPSBlbmQ7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcbiAgICAgKiDojrflvpfmuLLmn5PlkI7nmoTmiYDmnIlGdWxsQ2FsZW5kYXLkuovku7YuXHJcblx0ICogQHBhcmFtIHtvYmplY3R9IHZpZXcgaXMgdGhlIFZpZXcgT2JqZWN0IG9mIEZ1bGxDYWxlbmRhciBmb3IgdGhlIG5ldyB2aWV3LlxyXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBlbGVtZW50IGlzIGEgalF1ZXJ5IGVsZW1lbnQgZm9yIHRoZSBjb250YWluZXIgb2YgdGhlIG5ldyB2aWV3LlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0W119IOi/lOWbnueUqOS6jkZ1bGxDYWxlbmRhciDmuLLmn5PnmoQgZXZlbnRTb3VyY2VzIOaVsOe7hC5cclxuICAgICAqL1xyXG5cdGdldEV2ZW50U291cmNlcyggdmlldywgZWxlbWVudCApe1xyXG5cdFx0Y29uc3Qgdmlld1N0YXJ0ID0gdmlldy5zdGFydC5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdGNvbnN0IHZpZXdFbmQgPSB2aWV3LmVuZC5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdGxldCBldmVudFNvdXJjZXMgPSBbXTtcclxuXHRcdC8v6I635Y+W5pmu6YCa5pel56iLXHJcblx0XHRjb25zdCBnZW5lcmFsRXZlbnRTb3VyY2UgPSB7XHJcblx0XHRcdHR5cGU6ICdnZW5lcmFsRXZlbnRzJyxcclxuXHRcdFx0Ly9ldmVudHM6IHRoaXMuX2dldEFsbE9yaWdpbmFsRXZlbnQoW10sIHRoaXMuX2QycyhjdXJyZW50Vmlldy5zdGFydC50b0RhdGUoKSksIHRoaXMuX2QycyhjdXJyZW50Vmlldy5lbmQudG9EYXRlKCkpKVxyXG5cdFx0XHRldmVudHM6IHRoaXMuX2dldEFsbE9yaWdpbmFsRXZlbnQodmlld1N0YXJ0LCB2aWV3RW5kKVxyXG5cdFx0fVxyXG5cdFx0ZXZlbnRTb3VyY2VzLnB1c2goZ2VuZXJhbEV2ZW50U291cmNlKTtcclxuXHRcdFxyXG5cdFx0Ly9UT0RPOiDojrflj5bph43lpI3ml6XnqItcclxuXHRcdGNvbnN0IHJlcGVhdEV2ZW50U291cmNlcyA9IHRoaXMuX2dldEFsbFJlcGVhdEV2ZW50KHZpZXdTdGFydCwgdmlld0VuZCk7XHJcblx0XHRldmVudFNvdXJjZXMgPSBldmVudFNvdXJjZXMuY29uY2F0KHJlcGVhdEV2ZW50U291cmNlcyk7XHJcblx0XHQvL1xyXG5cdFx0cmV0dXJuIGV2ZW50U291cmNlcztcclxuXHR9O1xyXG5cclxuXHQvKipcclxuICAgICAqIOS7jldpekRhdGFiYXNl5Lit6I635Y+W5omA5pyJ5pWw5o2u5paH5qGjLlxyXG5cdCAqIEBwYXJhbSB7YXJyYXl9IGV2ZW50cyDliJ3lp4vkuovku7bmlbDnu4QuXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHN0YXJ0IElTT+agh+WHhuaXpeacn+Wtl+espuS4si5cclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZW5kIElTT+agh+WHhuaXpeacn+Wtl+espuS4si5cclxuICAgICAqIEByZXR1cm4ge09iamVjdFtdfSDov5Tlm57nlKjkuo5GdWxsQ2FsZW5kYXLmuLLmn5PnmoTkuovku7bmlbDnu4QuXHJcbiAgICAgKi9cclxuXHRfZ2V0QWxsT3JpZ2luYWxFdmVudChzdGFydCwgZW5kKXtcclxuXHRcdGNvbnN0IGV2ZW50cyA9IFtdO1xyXG5cdFx0bGV0IHNxbCA9IGBET0NVTUVOVF9MT0NBVElPTiBub3QgbGlrZSAnL0RlbGV0ZWQgSXRlbXMvJScgYW5kIChLQl9HVUlEIGlzIG51bGwgb3IgS0JfR1VJRCA9ICcnKWA7XHJcblx0XHRsZXQgYW5kMSA9IGAgYW5kIERPQ1VNRU5UX0dVSUQgaW4gKHNlbGVjdCBET0NVTUVOVF9HVUlEIGZyb20gV0laX0RPQ1VNRU5UX1BBUkFNIHdoZXJlIFBBUkFNX05BTUUgPSAnQ0FMRU5EQVJfU1RBUlQnICBhbmQgIFBBUkFNX1ZBTFVFIDw9ICcke2VuZH0nIClgO1xyXG5cdFx0bGV0IGFuZDIgPSBgIGFuZCBET0NVTUVOVF9HVUlEIGluIChzZWxlY3QgRE9DVU1FTlRfR1VJRCBmcm9tIFdJWl9ET0NVTUVOVF9QQVJBTSB3aGVyZSBQQVJBTV9OQU1FID0gJ0NBTEVOREFSX0VORCcgIGFuZCAgUEFSQU1fVkFMVUUgPj0gJyR7c3RhcnR9JyApYDtcclxuXHRcdGlmIChzdGFydCkgc3FsICs9IGFuZDI7XHJcblx0XHRpZiAoZW5kKSBzcWwgKz0gYW5kMTtcclxuXHRcdGlmIChvYmpEYXRhYmFzZS5Eb2N1bWVudHNEYXRhRnJvbVNRTCkge1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdGNvbnN0IGRhdGEgPSBvYmpEYXRhYmFzZS5Eb2N1bWVudHNEYXRhRnJvbVNRTChzcWwpO1xyXG5cdFx0XHRcdGlmICggIWRhdGEgKSByZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0Y29uc3Qgb2JqID0gSlNPTi5wYXJzZShkYXRhKTtcclxuXHRcdFx0XHRpZiAoICFvYmogfHwgIUFycmF5LmlzQXJyYXkob2JqKSApIHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkgKyspIHtcclxuXHRcdFx0XHRcdGV2ZW50cy5wdXNoKFxyXG5cdFx0XHRcdFx0XHRuZXcgQ2FsZW5kYXJFdmVudChvYmpbaV0pLnRvRnVsbENhbGVuZGFyRXZlbnQoKVxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0cmV0dXJuIGV2ZW50cztcclxuXHRcdFx0fVxyXG5cdFx0XHRjYXRjaChlcnIpIHtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKGVycik7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdEb2N1bWVudHNEYXRhRnJvbVNRTCBtZXRob2Qgb2YgV2l6RGF0YWJhc2Ugbm90IGV4aXN0IScpO1xyXG5cdFx0XHQvKlxyXG5cdFx0XHRsZXQgZG9jQ29sbGV0aW9uID0gb2JqRGF0YWJhc2UuRG9jdW1lbnRzRnJvbVNRTChzcWwpO1xyXG5cdFx0XHQvL1xyXG5cdFx0XHRpZiAoZG9jQ29sbGV0aW9uICYmIGRvY0NvbGxldGlvbi5Db3VudCl7XHJcblx0XHRcdFx0bGV0IGRvYztcclxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGRvY0NvbGxldGlvbi5Db3VudDsgKysgaSl7XHJcblx0XHRcdFx0XHRkb2MgPSBkb2NDb2xsZXRpb24uSXRlbShpKTtcclxuXHRcdFx0XHRcdGxldCBldmVudE9iaiA9IF9ldmVudE9iamVjdChfbmV3UHNldWRvRG9jKGRvYykpO1xyXG5cdFx0XHRcdFx0aWYgKGV2ZW50T2JqKVxyXG5cdFx0XHRcdFx0XHRldmVudHMucHVzaChldmVudE9iaik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBldmVudHM7XHJcblx0XHRcdH1cclxuXHRcdFx0Ki9cdFx0XHJcblx0XHR9XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG4gICAgICog5LuOV2l6RGF0YWJhc2XkuK3ojrflj5bmiYDmnInlvqrnjq/ph43lpI3kuovku7YuXHJcblx0ICog5LuO5Yib5bu65LqL5Lu255qE5pel5pyf5byA5aeL5YiwRU5EUkVDVVJSRU5DRee7k+adn1xyXG4gICAgICogQHJldHVybiB7T2JqZWN0W119IOi/lOWbnueUqOS6jkZ1bGxDYWxlbmRhcua4suafk+eahCBldmVudFNvdXJjZSDmlbDnu4QuXHJcbiAgICAgKi9cclxuXHRfZ2V0QWxsUmVwZWF0RXZlbnQoc3RhcnQsIGVuZCl7XHJcblx0XHRjb25zdCByZXBlYXRFdmVudHMgPSBbXTtcclxuXHRcdGNvbnN0IHNxbCA9IFwiRE9DVU1FTlRfTE9DQVRJT04gbm90IGxpa2UgJy9EZWxldGVkIEl0ZW1zLyUnIGFuZCAoS0JfR1VJRCBpcyBudWxsIG9yIEtCX0dVSUQgPSAnJykgYW5kIFwiICsgXHJcblx0XHRcdFx0XHRcIkRPQ1VNRU5UX0dVSUQgaW4gKHNlbGVjdCBET0NVTUVOVF9HVUlEIGZyb20gV0laX0RPQ1VNRU5UX1BBUkFNIHdoZXJlIFBBUkFNX05BTUU9J0NBTEVOREFSX1JFQ1VSUkVOQ0UnKVwiO1xyXG5cclxuXHRcdGNvbnN0IGRhdGEgPSBvYmpEYXRhYmFzZS5Eb2N1bWVudHNEYXRhRnJvbVNRTChzcWwpO1xyXG5cdFx0Y29uc29sZS5sb2coZGF0YSlcclxuXHRcdGlmICggIWRhdGEgKSByZXR1cm4gZmFsc2U7XHJcblx0XHRcclxuXHRcdGNvbnN0IG9iaiA9IEpTT04ucGFyc2UoZGF0YSk7XHJcblx0XHRpZiAoICFvYmogfHwgIUFycmF5LmlzQXJyYXkob2JqKSApIHJldHVybiBmYWxzZTtcclxuXHRcdFxyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpICsrKSB7XHJcblx0XHRcdHJlcGVhdEV2ZW50cy5wdXNoKFxyXG5cdFx0XHRcdG5ldyBDYWxlbmRhckV2ZW50KG9ialtpXSkuZ2VuZXJhdGVSZXBlYXRFdmVudHMoc3RhcnQsIGVuZClcclxuXHRcdFx0KVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlcGVhdEV2ZW50cztcclxuXHRcdFxyXG5cdH07XHJcblxyXG5cdC8vIOaXpeWOhuS6i+S7tuaLluWKqOWQjuabtOaWsOaVsOaNrlxyXG5cdHVwZGF0ZUV2ZW50RGF0YU9uRHJvcChldmVudCwgZGVsdGEsIHJldmVydEZ1bmMsIGpzRXZlbnQsIHVpLCB2aWV3KXtcclxuXHRcdC8vIENhbGwgaGFzVGltZSBvbiB0aGUgZXZlbnTigJlzIHN0YXJ0L2VuZCB0byBzZWUgaWYgaXQgaGFzIGJlZW4gZHJvcHBlZCBpbiBhIHRpbWVkIG9yIGFsbC1kYXkgYXJlYS5cclxuXHRcdGNvbnN0IGFsbERheSA9ICFldmVudC5zdGFydC5oYXNUaW1lKCk7XHJcblx0XHQvLyDojrflj5bkuovku7bmlofmoaPml7bpl7TmlbDmja5cclxuXHRcdGNvbnN0IGRvYyA9IG9iakRhdGFiYXNlLkRvY3VtZW50RnJvbUdVSUQoZXZlbnQuaWQpO1xyXG5cdFx0Ly8g5pu05paw5pWw5o2uXHJcblx0XHRpZiAoIGFsbERheSApIHtcclxuXHRcdFx0Y29uc3Qgc3RhcnRTdHIgPSBldmVudC5zdGFydC5zZXQoeydoJzogMCwgJ20nOiAwLCAncyc6IDB9KS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0Y29uc3QgZW5kU3RyID0gZXZlbnQuZW5kLnNldCh7J2gnOiAyMywgJ20nOiA1OSwgJ3MnOiA1OX0pLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9TVEFSVFwiLCBzdGFydFN0cik7XHJcblx0XHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX0VORFwiLCBlbmRTdHIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc3Qgc3RhcnRTdHIgPSBldmVudC5zdGFydC5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0Y29uc3QgZW5kU3RyID0gZXZlbnQuZW5kLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9TVEFSVFwiLCBzdGFydFN0cik7XHJcblx0XHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX0VORFwiLCBlbmRTdHIpO1xyXG5cdFx0fVxyXG5cdFx0Ly9UT0RPOiDmm7TmlrBDQUxFTkRBUl9SRUNVUlJFTkNF5pWw5o2uXHJcblx0XHQvLyBcclxuXHRcdHRoaXMuX3VwZGF0ZURvY01vZGlmeURhdGUoZG9jKTtcclxuXHR9O1xyXG5cclxuXHQvLyDorr7nva7mlofmoaPlsZ7mgKflgLxcclxuXHRfc2V0UGFyYW1WYWx1ZShkb2MsIGtleSwgdmFsdWUpIHtcclxuXHRcdGlmICghZG9jKSByZXR1cm4gZmFsc2U7XHJcblx0XHRkb2MuU2V0UGFyYW1WYWx1ZShrZXksIHZhbHVlKTtcclxuXHR9O1xyXG5cclxuXHQvLyDmm7TmlrBXaXpEb2Pkv67mlLnml7bpl7RcclxuXHRfdXBkYXRlRG9jTW9kaWZ5RGF0ZShkb2Mpe1xyXG5cdFx0Y29uc3Qgbm93ID0gbmV3IERhdGUoKTtcclxuXHRcdGlmICghZG9jKSByZXR1cm4gZmFsc2U7XHJcblx0XHRub3cuc2V0U2Vjb25kcygobm93LmdldFNlY29uZHMoKSArIDEpICUgNjApO1xyXG5cdFx0ZG9jLkRhdGVNb2RpZmllZCA9IHRoaXMuX2Qycyhub3cpO1xyXG5cdH07XHJcblxyXG5cdC8vIOWwhuaXpeacn+Wvueixoei9rOWMluS4uuWtl+espuS4slxyXG5cdC8vVE9ETzog6ICD6JmR5L6d6LWWbW9tZW505p2l566A5YyW6L2s5o2i6L+H56iLXHJcblx0X2QycyhkdCl7XHJcblx0XHRjb25zdCByZXQgPSBkdC5nZXRGdWxsWWVhcigpICsgXCItXCIgKyBcclxuXHRcdFx0XHRcdGZvcm1hdEludFRvRGF0ZVN0cmluZyhkdC5nZXRNb250aCgpICsgMSkgKyBcIi1cIiArIFxyXG5cdFx0XHRcdFx0Zm9ybWF0SW50VG9EYXRlU3RyaW5nKGR0LmdldERhdGUoKSkgKyBcIiBcIiArIFxyXG5cdFx0XHRcdFx0Zm9ybWF0SW50VG9EYXRlU3RyaW5nKGR0LmdldEhvdXJzKCkpKyBcIjpcIiArIFxyXG5cdFx0XHRcdFx0Zm9ybWF0SW50VG9EYXRlU3RyaW5nKGR0LmdldE1pbnV0ZXMoKSkgKyBcIjpcIiArIFxyXG5cdFx0XHRcdFx0Zm9ybWF0SW50VG9EYXRlU3RyaW5nKGR0LmdldFNlY29uZHMoKSk7XHJcblx0XHRyZXR1cm4gcmV0O1xyXG5cdH07XHJcblxyXG5cdC8vIOaXpeWOhuaXtumXtOmHjee9ruaXtumXtOiMg+WbtOWQjuabtOaWsOaVsOaNrlxyXG5cdHVwZGF0ZUV2ZW50RGF0YU9uUmVzaXplKGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXcpe1xyXG5cdFx0Y29uc3QgYWxsRGF5ID0gZXZlbnQuc3RhcnQuaGFzVGltZSgpID8gZmFsc2UgOiB0cnVlO1xyXG5cdFx0Ly8g6I635b6X5LqL5Lu25paH5qGj5pe26Ze05pWw5o2uXHJcblx0XHRjb25zdCBkb2MgPSBvYmpEYXRhYmFzZS5Eb2N1bWVudEZyb21HVUlEKGV2ZW50LmlkKTtcclxuXHRcdC8vIOiuoeeul+abtOaUueWQjueahOe7k+adn+aXtumXtFxyXG5cdFx0Y29uc3QgZXZlbnRFbmRTdHIgPSBldmVudC5lbmQuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHQvLyDmm7TmlrDmlofmoaPmlbDmja5cclxuXHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX0VORFwiLCBldmVudEVuZFN0cik7XHJcblx0XHR0aGlzLl91cGRhdGVEb2NNb2RpZnlEYXRlKGRvYyk7XHJcblx0fTtcclxuXHJcblx0Ly8g5Yib5bu65LqL5Lu2IHN0YXJ0LCBlbmQsIGpzRXZlbnQsIHZpZXdcclxuXHQvKipcclxuICAgICAqIOWIm+W7uuS6i+S7ti5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gc2VsZWN0aW9uRGF0YSBGdWxsQ2FsZW5kYXIg5Lyg5YWl55qE5pWw5o2uLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBzZWxlY3Rpb25EYXRhLnN0YXJ0IE1vbWVudCDnsbvml6XmnJ/lr7nosaEuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IHNlbGVjdGlvbkRhdGEuZW5kIE1vbWVudCDnsbvml6XmnJ/lr7nosaEuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IHNlbGVjdGlvbkRhdGEuanNFdmVudCBuYXRpdmUgSmF2YVNjcmlwdCDkuovku7YuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IHNlbGVjdGlvbkRhdGEudmlldyBGdWxsQ2FsZW5kYXIg6KeG5Zu+5a+56LGhLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSB1c2VySW5wdXRzIOeUqOaIt+S8oOWFpeeahOWFtuS7luS/oeaBry5cclxuICAgICAqIFRPRE86IOivpeaWueazleWPr+S7peaUvue9ruWIsENhbGVuZGFyRXZlbnTnmoTpnZnmgIHmlrnms5XkuIpcclxuICAgICAqL1xyXG5cdGNyZWF0ZUV2ZW50KHNlbGVjdGlvbkRhdGEsIHVzZXJJbnB1dHMpe1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Ly8g6I635Y+W55So5oi36K6+572uXHJcblx0XHRcdGNvbnN0IG5ld0V2ZW50ID0gbmV3IENhbGVuZGFyRXZlbnQoe1xyXG5cdFx0XHRcdHRpdGxlOiB1c2VySW5wdXRzLnRpdGxlID8gdXNlcklucHV0cy50aXRsZSA6ICfml6DmoIfpopgnLFxyXG5cdFx0XHRcdHN0YXJ0OiBzZWxlY3Rpb25EYXRhLnN0YXJ0LFxyXG5cdFx0XHRcdGVuZDogc2VsZWN0aW9uRGF0YS5lbmQsXHJcblx0XHRcdFx0YWxsRGF5OiBzZWxlY3Rpb25EYXRhLnN0YXJ0Lmhhc1RpbWUoKSAmJiBzZWxlY3Rpb25EYXRhLmVuZC5oYXNUaW1lKCkgPyBmYWxzZSA6IHRydWUsXHJcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiB1c2VySW5wdXRzLmNvbG9yID8gdXNlcklucHV0cy5jb2xvciA6ICcjMzJDRDMyJyxcclxuXHRcdFx0fSk7XHJcblx0XHRcdC8vIOS/neWtmOW5tua4suafk+S6i+S7tlxyXG5cdFx0XHRuZXdFdmVudC5zYXZlVG9XaXpFdmVudERvYygpO1xyXG5cdFx0XHRuZXdFdmVudC5yZWZldGNoRGF0YSgpO1xyXG5cdFx0XHRuZXdFdmVudC5hZGRUb0Z1bGxDYWxlbmRhcigpO1xyXG5cdFx0fSBjYXRjaCAoZSkge2NvbnNvbGUubG9nKGUpfVxyXG5cdH1cclxuXHJcbn1cclxuXHJcblxyXG4vLyBUT0RPOiDph43lhpnojrflj5bmlbDmja7nmoTmlrnlvI9cclxuZnVuY3Rpb24gX2dldFdpekV2ZW50KHN0YXJ0LCBlbmQpIHtcclxuXHQvL1RPRE86XHJcblx0bGV0IGV2ZW50cyA9IFtdO1xyXG5cdGxldCBFdmVudENvbGxlY3Rpb24gPSBvYmpEYXRhYmFzZS5HZXRDYWxlbmRhckV2ZW50czIoc3RhcnQsIGVuZCk7XHJcblx0cmV0dXJuIGV2ZW50c1xyXG59XHJcblxyXG4vLyDojrflvpfmuLLmn5PlkI7nmoTph43lpI3ml6XmnJ9cclxuZnVuY3Rpb24gZ2V0UmVuZGVyUmVwZWF0RGF5KCl7XHJcblx0dmFyIGRheUFycmF5ID0gbmV3IEFycmF5KCk7XHJcblx0dmFyIGV2ZW50U3RhcnQgPSBuZXcgRGF0ZShfczJkKGdfZXZlbnRTdGFydCkpO1xyXG5cdFx0XHJcblx0c3dpdGNoIChnX3JlcGVhdFJ1bGUpe1xyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnlXZWVrMVwiOlxyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnlXZWVrMlwiOlxyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnlXZWVrM1wiOlxyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnlXZWVrNFwiOlxyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnlXZWVrNVwiOlxyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnlXZWVrNlwiOlxyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnlXZWVrN1wiOlxyXG5cdFx0XHRcdGdldFdlZWtseVJlcGVhdERheShkYXlBcnJheSwgW2dfcmVwZWF0UnVsZS5jaGFyQXQoOSldKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnlXZWVrZGF5XCI6XHJcblx0XHRcdFx0Z2V0V2Vla2x5UmVwZWF0RGF5KGRheUFycmF5LCBbMSwgMiwgMywgNCwgNV0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJFdmVyeVdlZWtkYXkxMzVcIjpcclxuXHRcdFx0XHRnZXRXZWVrbHlSZXBlYXREYXkoZGF5QXJyYXksIFsxLCAzLCA1XSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJFdmVyeVdlZWtkYXkyNFwiOlxyXG5cdFx0XHRcdGdldFdlZWtseVJlcGVhdERheShkYXlBcnJheSwgWzIsIDRdKTtcclxuXHRcdFx0XHRicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2Vla2RheTY3XCI6XHJcblx0XHRcdFx0Z2V0V2Vla2x5UmVwZWF0RGF5KGRheUFycmF5LCBbNiwgN10pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiRGFpbHlcIjpcclxuXHRcdFx0XHRnZXRXZWVrbHlSZXBlYXREYXkoZGF5QXJyYXksIFsxLCAyLCAzLCA0LCA1LCA2LCA3XSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJXZWVrbHlcIjovLyDmr4/lkahcclxuXHRcdFx0XHRnZXRXZWVrbHlSZXBlYXREYXkoZGF5QXJyYXksIFtldmVudFN0YXJ0LmdldERheSgpXSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJFdmVyeTJXZWVrc1wiOlxyXG5cdFx0XHRcdGdldFdlZWtseVJlcGVhdERheShkYXlBcnJheSwgW2V2ZW50U3RhcnQuZ2V0RGF5KCldKTtcclxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRheUFycmF5Lmxlbmd0aDsgKysgaSl7XHJcblx0XHRcdFx0XHR2YXIgaW50ZXIgPSBfaW50ZXJEYXlzKF9kMnMoZXZlbnRTdGFydCksIF9kMnMoZGF5QXJyYXlbaV1bMF0pKTtcclxuXHRcdFx0XHRcdGlmICgocGFyc2VGbG9hdCgoaW50ZXItMSkvNy4wKSAlIDIpICE9IDAgKXtcclxuXHRcdFx0XHRcdFx0ZGF5QXJyYXkuc3BsaWNlKGksIDEpO1xyXG5cdFx0XHRcdFx0XHRpIC0tO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIk1vbnRobHlcIjpcclxuXHRcdFx0XHRnZXRNb250aGx5UmVwZWF0RGF5KGRheUFycmF5KTtcclxuXHRcdFx0XHRicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIlllYXJseVwiOlxyXG5cdFx0XHRcdGdldFllYXJseVJlcGVhdERheShkYXlBcnJheSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdC8vIFRPRE86IOaxieWtl+mcgOimgeiAg+iZkVxyXG4gICAgICAgICAgICBjYXNlIFwiQ2hpbmVzZU1vbnRobHlcIjpcclxuICAgICAgICAgICAgICAgIGdldENoaW5lc2VSZXBlYXREYXkoZGF5QXJyYXksICfmnIgnKTtcclxuXHRcdFx0XHRicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkNoaW5lc2VZZWFybHlcIjpcclxuICAgICAgICAgICAgICAgIGdldENoaW5lc2VSZXBlYXREYXkoZGF5QXJyYXksICfljoYnKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0ZGVmYXVsdDp7XHJcblx0XHRcdFx0aWYgKGdfcmVwZWF0UnVsZS5pbmRleE9mKFwiRXZlcnlXZWVrXCIpID09IDApe1xyXG5cdFx0XHRcdFx0dmFyIGRheXMgPSBnX3JlcGVhdFJ1bGUuc3Vic3RyKFwiRXZlcnlXZWVrXCIubGVuZ3RoKS5zcGxpdCgnJyk7XHJcblx0XHRcdFx0XHRnZXRXZWVrbHlSZXBlYXREYXkoZGF5QXJyYXksIGRheXMpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuXHRyZXR1cm4gZGF5QXJyYXk7XHJcbn1cclxuXHJcblxyXG4vKiDmlbDmja7ojrflj5ZcclxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG5cclxuLyog5p2C6aG55ZKM5bel5YW3XHJcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuLy8g5Yik5pat5YaF5qC4XHJcbmZ1bmN0aW9uIGlzQ2hyb21lKCkge1xyXG5cdGlmIChnX2lzQ2hyb21lKSByZXR1cm4gZ19pc0Nocm9tZTtcclxuXHQvL1xyXG5cdHZhciB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcclxuXHRnX2lzQ2hyb21lID0gdWEuaW5kZXhPZignY2hyb21lJykgIT0gLTE7XHJcblx0Ly9cclxuXHRyZXR1cm4gZ19pc0Nocm9tZTtcclxufVxyXG5cclxuLy8g5bCG5pW05pWw6L2s5o2i5oiQ5pel5pyf5a2X56ym5LiyXHJcbmZ1bmN0aW9uIGZvcm1hdEludFRvRGF0ZVN0cmluZyhuKXtcclxuXHRcdFxyXG5cdHJldHVybiBuIDwgMTAgPyAnMCcgKyBuIDogbjtcclxufVxyXG5cclxuLy8g5qOA5p+l5Y+K5aKe5Yqg5pWw5YC85a2X56ym5Liy6ZW/5bqm77yM5L6L5aaC77yaJzInIC0+ICcwMidcclxuZnVuY3Rpb24gY2hlY2tBbmRBZGRTdHJMZW5ndGgoc3RyKSB7XHJcblx0aWYgKHN0ci5sZW5ndGggPCAyKSB7XHJcblx0XHRyZXR1cm4gJzAnICsgc3RyO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRyZXR1cm4gc3RyO1xyXG5cdH1cclxufVxyXG5cclxuLy8g5bCG5a2X56ym5Liy6L2s5YyW5Li65pel5pyf5a+56LGhXHJcbmZ1bmN0aW9uIF9zMmQoc3RyKXtcclxuXHRpZiAoIXN0cilcclxuXHRcdHJldHVybiAnJztcclxuXHR2YXIgZGF0ZSA9IG5ldyBEYXRlKHN0ci5zdWJzdHIoMCwgNCksXHJcblx0XHRcdFx0XHRzdHIuc3Vic3RyKDUsIDIpIC0gMSxcclxuXHRcdFx0XHRcdHN0ci5zdWJzdHIoOCwgMyksXHJcblx0XHRcdFx0XHRzdHIuc3Vic3RyKDExLCAyKSxcclxuXHRcdFx0XHRcdHN0ci5zdWJzdHIoMTQsIDIpLFxyXG5cdFx0XHRcdFx0c3RyLnN1YnN0cigxNywgMilcclxuXHRcdFx0XHRcdCk7XHRcdFxyXG5cdHJldHVybiBkYXRlO1xyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGNvbG9yQ291bnQ6IDEyLFxyXG4gICAgY29sb3JJdGVtczogW1xyXG4gICAgICAgIHsgXCJjb2xvclZhbHVlXCI6IFwiIzMyQ0QzMlwiLCBcImNvbG9yTmFtZVwiOiAn5qmE5qaE57u/JyB9LFxyXG4gICAgICAgIHsgXCJjb2xvclZhbHVlXCI6IFwiIzU0ODRFRFwiLCBcImNvbG9yTmFtZVwiOiAn5a6d55+z6JOdJyB9LFxyXG4gICAgICAgIHsgXCJjb2xvclZhbHVlXCI6IFwiI0E0QkRGRVwiLCBcImNvbG9yTmFtZVwiOiAn6JOd6ImyJyB9LFxyXG4gICAgICAgIHsgXCJjb2xvclZhbHVlXCI6IFwiIzQ2RDZEQlwiLCBcImNvbG9yTmFtZVwiOiAn6Z2S57u/6ImyJyB9LFxyXG4gICAgICAgIHsgXCJjb2xvclZhbHVlXCI6IFwiIzdBRTdCRlwiLCBcImNvbG9yTmFtZVwiOiAn57u/6ImyJyB9LFxyXG4gICAgICAgIHsgXCJjb2xvclZhbHVlXCI6IFwiIzUxQjc0OVwiLCBcImNvbG9yTmFtZVwiOiAn5riF5paw57u/JyB9LFxyXG4gICAgICAgIHsgXCJjb2xvclZhbHVlXCI6IFwiI0ZCRDc1QlwiLCBcImNvbG9yTmFtZVwiOiAn6buE6ImyJyB9LFxyXG4gICAgICAgIHsgXCJjb2xvclZhbHVlXCI6IFwiI0ZGQjg3OFwiLCBcImNvbG9yTmFtZVwiOiAn5qmY6ImyJyB9LFxyXG4gICAgICAgIHsgXCJjb2xvclZhbHVlXCI6IFwiI0ZGODg3Q1wiLCBcImNvbG9yTmFtZVwiOiAn57qi6ImyJyB9LFxyXG4gICAgICAgIHsgXCJjb2xvclZhbHVlXCI6IFwiI0RDMjEyN1wiLCBcImNvbG9yTmFtZVwiOiAn5aWi5Y2O57qiJyB9LFxyXG4gICAgICAgIHsgXCJjb2xvclZhbHVlXCI6IFwiI0RCQURGRlwiLCBcImNvbG9yTmFtZVwiOiAn57Sr6ImyJyB9LFxyXG4gICAgICAgIHsgXCJjb2xvclZhbHVlXCI6IFwiI0UxRTFFMVwiLCBcImNvbG9yTmFtZVwiOiAn54Gw6ImyJyB9XHJcbiAgICBdLFxyXG5cclxufSIsIi8vVE9ETzog5Yik5patd2luZG93LmV4dGVybmFs5piv5ZCm5Li6V2l6SHRtbEVkaXRvckFwcFxyXG5jb25zdCBXaXpFeHBsb3JlckFwcCA9IHdpbmRvdy5leHRlcm5hbDtcclxuY29uc3QgV2l6RXhwbG9yZXJXaW5kb3cgPSBXaXpFeHBsb3JlckFwcC5XaW5kb3c7XHJcbmNvbnN0IFdpekRhdGFiYXNlID0gV2l6RXhwbG9yZXJBcHAuRGF0YWJhc2U7XHJcbmNvbnN0IFdpekNvbW1vblVJID0gV2l6RXhwbG9yZXJBcHAuQ3JlYXRlV2l6T2JqZWN0KFwiV2l6S01Db250cm9scy5XaXpDb21tb25VSVwiKTtcclxuXHJcbmZ1bmN0aW9uIFdpekNvbmZpcm0obXNnLCB0aXRsZSkge1xyXG4gICAgcmV0dXJuIFdpekV4cGxvcmVyV2luZG93LlNob3dNZXNzYWdlKG1zZywgdGl0bGUsIDB4MDAwMDAwMjAgfCAweDAwMDAwMDAxKSA9PSAxO1xyXG59XHJcblxyXG5mdW5jdGlvbiBXaXpBbGVydChtc2cpIHtcclxuICAgIG9ialdpbmRvdy5TaG93TWVzc2FnZShtc2csIFwie3B9XCIsIDB4MDAwMDAwNDApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBXaXpCdWJibGVNZXNzYWdlKHRpdGxlLCBtc2csIGNvbG9yID0gJyNGRkZBOUQnLCBkZWxheSA9ICczJykge1xyXG4gICAgY29uc3QgYXBwUGF0aCA9IFdpekNvbW1vblVJLkdldFNwZWNpYWxGb2xkZXIoXCJBcHBQYXRoXCIpO1xyXG4gICAgLy9cclxuICAgIGNvbnN0IHdpelNoZWxsRmlsZU5hbWUgPSBhcHBQYXRoICsgXCJXaXouZXhlXCI7XHJcbiAgICBjb25zdCBkbGxGaWxlTmFtZSA9IGFwcFBhdGggKyBcIldpelRvb2xzLmRsbFwiO1xyXG4gICAgLy9cclxuICAgIGNvbnN0IHBhcmFtcyA9IGBcIiR7ZGxsRmlsZU5hbWV9XCIgV2l6VG9vbHNTaG93QnViYmxlV2luZG93MkV4IC9UaXRsZT0ke3RpdGxlfSAvTGlua1RleHQ9JHttc2d9IC9MaW5rVVJMPUAgL0NvbG9yPSR7Y29sb3J9IC9EZWxheT0ke2RlbGF5fWA7XHJcbiAgICAvL1xyXG4gICAgV2l6Q29tbW9uVUkuUnVuRXhlKHdpelNoZWxsRmlsZU5hbWUsIHBhcmFtcywgZmFsc2UpO1xyXG59XHJcblxyXG5jbGFzcyBXaXpTaGVsbCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZGxsRmlsZU5hbWUsIGRsbEV4cG9ydEZ1bmMsIHBhcmFtcykge1xyXG4gICAgICAgIC8v5L2/55SoZGxs5a+85Ye65Ye95pWw77yM5aSn6YOo5YiG5YWl5Y+C5pe25ZG95Luk6KGM5pa55byP77yM5YW35L2T5Y+C5pWw5rKh5pyJ6K+05piO77yM5pyJ6ZyA6KaB6IGU57O75byA5Y+R5Lq65ZGYXHJcbiAgICAgICAgY29uc3QgYXBwUGF0aCA9IFdpekNvbW1vblVJLkdldFNwZWNpYWxGb2xkZXIoXCJBcHBQYXRoXCIpO1xyXG4gICAgICAgIHRoaXMuYXBwUGF0aCA9IGFwcFBhdGhcclxuICAgICAgICB0aGlzLndpekV4ZSA9IGFwcFBhdGggKyBcIldpei5leGVcIjtcclxuICAgICAgICB0aGlzLmRsbEZpbGVOYW1lID0gZGxsRmlsZU5hbWUgPyBhcHBQYXRoICsgZGxsRmlsZU5hbWUgOiBhcHBQYXRoICsgJ1dpektNQ29udHJvbHMuZGxsJztcclxuICAgICAgICB0aGlzLmRsbEV4cG9ydEZ1bmMgPSBkbGxFeHBvcnRGdW5jIHx8ICdXaXpLTVJ1blNjcmlwdCc7XHJcbiAgICAgICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7XHJcbiAgICB9XHJcblxyXG4gICAgcnVuU2NyaXB0RmlsZShzY3JpcHRGaWxlTmFtZSwgc2NyaXB0UGFyYW1zKSB7XHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0gYFwiJHt0aGlzLmFwcFBhdGggKyAnV2l6S01Db250cm9scy5kbGwnfVwiIFdpektNUnVuU2NyaXB0IC9TY3JpcHRGaWxlTmFtZT0ke3NjcmlwdEZpbGVOYW1lfSAke3NjcmlwdFBhcmFtc31gO1xyXG4gICAgICAgIFdpekNvbW1vblVJLlJ1bkV4ZSh0aGlzLndpekV4ZSwgcGFyYW1zLCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgd2l6QnViYmxlTWVzc2FnZSh0aXRsZSwgbXNnLCBjb2xvciA9ICcjRkZGQTlEJywgZGVsYXkgPSAnMycpIHtcclxuICAgICAgICBXaXpCdWJibGVNZXNzYWdlKHRpdGxlLCBtc2csIGNvbG9yLCBkZWxheSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldFdpekludGVyZmFjZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBXaXpFeHBsb3JlckFwcCwgV2l6RXhwbG9yZXJXaW5kb3csIFdpekRhdGFiYXNlLCBXaXpDb21tb25VSVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgXHJcbiAgICBXaXpFeHBsb3JlckFwcCwgXHJcbiAgICBXaXpFeHBsb3JlcldpbmRvdywgXHJcbiAgICBXaXpEYXRhYmFzZSwgXHJcbiAgICBXaXpDb21tb25VSSwgXHJcbiAgICBXaXpDb25maXJtLCBcclxuICAgIFdpekFsZXJ0LCBcclxuICAgIFdpekJ1YmJsZU1lc3NhZ2UsIFxyXG4gICAgV2l6U2hlbGwgXHJcbn07XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=