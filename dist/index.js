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
/******/ 	var hotCurrentHash = "53f6583b7f08747548d3"; // eslint-disable-line no-unused-vars
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

/***/ "./node_modules/css-loader/index.js!./src/components/EventPopover/EventTitleInput.css":
/*!***********************************************************************************!*\
  !*** ./node_modules/css-loader!./src/components/EventPopover/EventTitleInput.css ***!
  \***********************************************************************************/
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
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/_react-dom@16.4.1@react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _EventPopover_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EventPopover.css */ "./src/components/EventPopover/EventPopover.css");
/* harmony import */ var _EventPopover_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_EventPopover_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var popper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! popper.js */ "./node_modules/popper.js/dist/esm/popper.js");
/* harmony import */ var _EventTitleInput__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./EventTitleInput */ "./src/components/EventPopover/EventTitleInput.js");
/* harmony import */ var _EventSimpleForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./EventSimpleForm */ "./src/components/EventPopover/EventSimpleForm.js");







class EventPopover extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    constructor(props) {
        super(props);
        this.popperNode = null;
        this.popperInstance = null;
        // 绑定事件
        this.autoHide = this.autoHide.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }

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

    handleTitleChange() {
        //TODO: 处理事件标题变更，并储存数据
    }

    componentDidMount() {
        // 初始化组件
        this.popperInstance = new popper_js__WEBPACK_IMPORTED_MODULE_3__["default"](this.props.reference, this.popperNode, {
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

    componentWillReceiveProps(nextProps) {
        // 更新定位
        this.hide().then(ret => {
            this.popperInstance.reference = nextProps.reference;
            this.popperInstance.update();
        });
        this.show();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //
        this.show();
    }

    render() {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'div',
            { className: 'tc-popover', role: 'tooltip',
                ref: div => this.popperNode = div, style: { display: 'none' } },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('div', { className: 'arrow' }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'div',
                { className: 'tc-popover-header' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EventTitleInput__WEBPACK_IMPORTED_MODULE_4__["default"], { title: this.props.event.title,
                    onTitleChange: this.handleTitleChange })
            ),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                'div',
                { className: 'tc-popover-body' },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EventSimpleForm__WEBPACK_IMPORTED_MODULE_5__["default"], {
                    eventStart: this.props.event.start,
                    colorValue: this.props.event.backgroundColor
                })
            )
        );
    }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/components/EventPopover/EventSimpleForm.js":
/*!********************************************************!*\
  !*** ./src/components/EventPopover/EventSimpleForm.js ***!
  \********************************************************/
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
            { horizontal: true },
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

/***/ "./src/components/EventPopover/EventTitleInput.css":
/*!*********************************************************!*\
  !*** ./src/components/EventPopover/EventTitleInput.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!./EventTitleInput.css */ "./node_modules/css-loader/index.js!./src/components/EventPopover/EventTitleInput.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader!./EventTitleInput.css */ "./node_modules/css-loader/index.js!./src/components/EventPopover/EventTitleInput.css", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!./EventTitleInput.css */ "./node_modules/css-loader/index.js!./src/components/EventPopover/EventTitleInput.css");

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

/***/ "./src/components/EventPopover/EventTitleInput.js":
/*!********************************************************!*\
  !*** ./src/components/EventPopover/EventTitleInput.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventTitleInput; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _EventTitleInput_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EventTitleInput.css */ "./src/components/EventPopover/EventTitleInput.css");
/* harmony import */ var _EventTitleInput_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_EventTitleInput_css__WEBPACK_IMPORTED_MODULE_1__);



class EventTitleInput extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {

    render() {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('input', { type: 'text', id: 'tc-editpopper-eventtitle',
            className: 'eventtitle',
            value: this.props.title,
            onChange: this.props.onTitleChange
        });
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
                    value: this.props.value,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQ2FsZW5kYXIvQ2FsZW5kYXIuY3NzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0V2ZW50UG9wb3Zlci9FdmVudFBvcG92ZXIuY3NzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0V2ZW50UG9wb3Zlci9FdmVudFRpdGxlSW5wdXQuY3NzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUgc3luYyBeXFwuXFwvLiokIiwid2VicGFjazovLy8uL3NyYy9BcHAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQ2FsZW5kYXIvQ2FsZW5kYXIuY3NzP2NhMTQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQ2FsZW5kYXIvQ2FsZW5kYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQ2FsZW5kYXIvRnVsbENhbGVuZGFyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0V2ZW50UG9wb3Zlci9FdmVudFBvcG92ZXIuY3NzPzU4NWYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRXZlbnRQb3BvdmVyL0V2ZW50UG9wb3Zlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9FdmVudFBvcG92ZXIvRXZlbnRTaW1wbGVGb3JtLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0V2ZW50UG9wb3Zlci9FdmVudFRpdGxlSW5wdXQuY3NzPzZiYjgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRXZlbnRQb3BvdmVyL0V2ZW50VGl0bGVJbnB1dC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Gb3JtL0NvbG9yUGlja2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0Zvcm0vRGF0ZVRpbWVQaWNrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmNzcz9kOGMzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWxzL0NhbGVuZGFyRXZlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVscy9XaXpFdmVudERhdGFMb2FkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL0NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvV2l6SW50ZXJmYWNlLmpzIl0sIm5hbWVzIjpbIkFwcCIsIlJlYWN0IiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsInN0YXRlIiwiY2xpY2tlZEV2ZW50IiwiaGFuZGxlRXZlbnRDbGljayIsImJpbmQiLCJldmVudCIsImpzRXZlbnQiLCJ2aWV3Iiwic2V0U3RhdGUiLCJjbGlja2VkRXZlbnRBcmdzIiwicmVuZGVyIiwidGFyZ2V0IiwiQ2FsZW5kYXIiLCJldmVudHMiLCJkYXRhTG9hZGVyIiwiY2FsZW5kYXIiLCJvbkNhbGVuZGFyUmVuZGVyIiwib25WaWV3UmVuZGVyIiwib25FdmVudFJlbmRlciIsImVsIiwiZWxlbWVudCIsIiRjYWxlbmRhciIsIiQiLCJldmVudFNvdXJjZXMiLCJnZXRFdmVudFNvdXJjZXMiLCJmdWxsQ2FsZW5kYXIiLCJpIiwibGVuZ3RoIiwiZXZlbnRPYmoiLCIkZWwiLCJpc0NvbXBsZXRlIiwicGFyc2VJbnQiLCJjb21wbGV0ZSIsImFkZENsYXNzIiwiY29tcG9uZW50RGlkTW91bnQiLCJsZWZ0IiwiY2VudGVyIiwicmlnaHQiLCJ0b2RheSIsIm1vbnRoIiwid2VlayIsImRheSIsImxpc3QiLCJhZ2VuZGEiLCJtaW5UaW1lIiwic2xvdExhYmVsRm9ybWF0Iiwib25FdmVudENsaWNrIiwiRnVsbGNhbGVuZGFyT2JqZWN0TWFwcGVyIiwiZ2V0U2V0dGluZ3MiLCJwcm9wZXJ0aWVzIiwibmV3U2V0dGluZ3MiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsIkZ1bGxDYWxlbmRhciIsImpxIiwibm9Db25mbGljdCIsImZ1bGxjYWxlbmRhck9iamVjdE1hcHBlciIsInJvb3QiLCJpbnN0YW5jZSIsImRhdGUiLCJEYXRlIiwib2JqZWN0TWFwcGVyU2V0dGluZ3MiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwiaWQiLCJnZXRUaW1lIiwiY2FsZW5kYXJSZWYiLCJFdmVudFBvcG92ZXIiLCJwb3BwZXJOb2RlIiwicG9wcGVySW5zdGFuY2UiLCJhdXRvSGlkZSIsImhhbmRsZVRpdGxlQ2hhbmdlIiwiZSIsInJlZmVyZW5jZSIsImlzIiwiaGFzIiwiaGlkZSIsInRoYXQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInNob3ciLCJmYWRlSW4iLCJwbGFjZW1lbnQiLCJtb2RpZmllcnMiLCJhcnJvdyIsImRvY3VtZW50Iiwib2ZmIiwib24iLCJ0aGVuIiwicmV0IiwidXBkYXRlIiwiY29tcG9uZW50RGlkVXBkYXRlIiwicHJldlByb3BzIiwicHJldlN0YXRlIiwic25hcHNob3QiLCJkaXYiLCJkaXNwbGF5IiwidGl0bGUiLCJzdGFydCIsImJhY2tncm91bmRDb2xvciIsIkV2ZW50U2ltcGxlRm9ybSIsImhhbmRsZUlucHV0Q2hhbmdlIiwiZXZlbnRTdGFydCIsImZvcm1hdCIsImNvbG9yVmFsdWUiLCJFdmVudFRpdGxlSW5wdXQiLCJvblRpdGxlQ2hhbmdlIiwiSHVlYmVlIiwicmVxdWlyZSIsInByb3RvdHlwZSIsInNldFRleHRzIiwic2V0VGV4dEVsZW1zIiwiZWxlbSIsInByb3BlcnR5Iiwibm9kZU5hbWUiLCJ2YWx1ZSIsImNvbG9yIiwiZGlzcGF0Y2hFdmVudCIsIkV2ZW50IiwiQ29sb3JQaWNrZXIiLCJpbnB1dCIsIlJlYWN0RE9NIiwiZmluZERPTU5vZGUiLCJpbnB1dEZvcm1Db250cm9sIiwiaHVlYmVlSW5zdGFuY2UiLCJzdGF0aWNPcGVuIiwic2V0VGV4dCIsInNldEJHQ29sb3IiLCJodWVzIiwiaHVlMCIsInNoYWRlcyIsInNhdHVyYXRpb25zIiwibm90YXRpb24iLCJjbGFzc05hbWUiLCJjdXN0b21Db2xvcnMiLCJsYWJlbCIsInJlYWRPbmx5Iiwib25JbnB1dENoYW5nZSIsIkRhdGVUaW1lUGlja2VyIiwiZGF0ZXRpbWVwaWNrZXIiLCJnZXRFbGVtZW50QnlJZCIsIkNhbGVuZGFyRXZlbnQiLCJkYXRhIiwiRXJyb3IiLCJ0eXBlIiwiX2NoZWNrRGF0YVR5cGUiLCJfY3JlYXRlIiwiZG9jIiwiZ19kYiIsIkRvY3VtZW50RnJvbUdVSUQiLCJuZXdFdmVudERhdGEiLCJHZXRQYXJhbVZhbHVlIiwibW9tZW50IiwiRGF0ZUNyZWF0ZWQiLCJHVUlEIiwiVGl0bGUiLCJEYXRlTW9kaWZpZWQiLCJjb25zb2xlIiwiZXJyb3IiLCJlbmQiLCJia0NvbG9yIiwiYWxsRGF5IiwiZGF0ZUNvbXBsZXRlZCIsInJwdFJ1bGUiLCJycHRFbmQiLCJfSW5mbyIsIl9wYXJzZUluZm8iLCJDQUxFTkRBUl9JTkZPIiwiX0V4dHJhSW5mbyIsIkNBTEVOREFSX0VYVFJBSU5GTyIsIl9nZXREZWZhdWx0RXh0cmFJbmZvIiwiZ3VpZCIsIkNBTEVOREFSX1NUQVJUIiwiQ0FMRU5EQVJfRU5EIiwiY2kiLCJiIiwiQ29uZmlnIiwiY29sb3JJdGVtcyIsImluZGV4T2YiLCJDb21wbGV0ZSIsIkRhdGVDb21wbGV0ZWQiLCJDQUxFTkRBUl9SRUNVUlJFTkNFIiwiQ0FMRU5EQVJfRU5EUkVDVVJSRU5DRSIsImhhc1RpbWUiLCJjcmVhdGVkIiwidXBkYXRlZCIsInRleHRDb2xvciIsIl91cGRhdGUiLCJvYmpDbGFzcyIsIkdVSURfUmVnRXhyIiwiU3RyaW5nIiwidGVzdCIsIk9iamVjdCIsIkluZm9TdHJpbmciLCJJbmZvT2JqZWN0IiwiSW5mb0FycmF5Iiwic3BsaXQiLCJmb3JFYWNoIiwiaXRlbSIsImluZGV4IiwiYXJyIiwicGFpciIsIl9zdHJpbmdpZnlJbmZvIiwiSW5mb09iamVjdEtleXNBcnJheSIsImtleXMiLCJzaW5nbGVJbmZvIiwicHVzaCIsImpvaW4iLCJyZXBsYWNlIiwiX3VwZGF0ZUluZm8iLCJfdXBkYXRlRXh0cmFJbmZvIiwiRXh0cmFJbmZvT2JqZWN0IiwiX2dldEV2ZW50SHRtbCIsImNvbnRlbnQiLCJodG1sVGV4dCIsImdlbmVyYXRlUmVwZWF0RXZlbnRzIiwiZXZlbnRTb3VyY2UiLCJkYXlBcnJheSIsIl9nZXRSZW5kZXJSZXBlYXREYXkiLCJuZXdFdmVudCIsInRvRnVsbENhbGVuZGFyRXZlbnQiLCJhZGQiLCJkaWZmIiwicmVnZXgiLCJjb3VudCIsImN1cldlZWtEYXkiLCJyZXN1bHRzIiwiZXhlYyIsImludGVyV2VlayIsIm51bWJlciIsIl9nZXRXZWVrbHlSZXBlYXREYXkiLCJwZXJSdWxlIiwiX2dldFBlclJlcGVhdERheXMiLCJpbnRlcldlZWtzIiwidmlld1N0YXJ0Iiwidmlld0VuZCIsImludGVydmFsV2Vla3MiLCJ3ZWVrZGF5cyIsIm5ld0V2ZW50U3RhcnREYXRlIiwic2V0IiwiZ2V0IiwiaXNTYW1lIiwiaXNCZWZvcmUiLCJwZXJSdWxlTWFwIiwic3BsaWNlIiwiZmluZEluZGV4IiwidG9XaXpFdmVudERhdGEiLCJhZGRUb0Z1bGxDYWxlbmRhciIsIl9zYXZlQWxsUHJvcCIsInN0YXJ0U3RyIiwiZW5kU3RyIiwiX3NldFBhcmFtVmFsdWUiLCJTZXRQYXJhbVZhbHVlIiwiX2NyZWF0ZVdpekV2ZW50RG9jIiwibG9jYXRpb24iLCJvYmpGb2xkZXIiLCJHZXRGb2xkZXJCeUxvY2F0aW9uIiwidGVtcEh0bWwiLCJnX2NtbiIsIkdldEFUZW1wRmlsZU5hbWUiLCJTYXZlVGV4dFRvRmlsZSIsIkNyZWF0ZURvY3VtZW50MiIsIkNoYW5nZVRpdGxlQW5kRmlsZU5hbWUiLCJVcGRhdGVEb2N1bWVudDYiLCJBZGRUb0NhbGVuZGFyIiwic2F2ZVRvV2l6RXZlbnREb2MiLCJwcm9wIiwiZ3VpZFJlZ2V4IiwiaXNXaXpEb2NFeGlzdCIsImRlbGV0ZUV2ZW50RGF0YSIsImlzRGVsZXRlRG9jIiwiUmVtb3ZlRnJvbUNhbGVuZGFyIiwiRGVsZXRlIiwicmVmZXRjaERhdGEiLCJyZWZyZXNoRXZlbnQiLCJXaXpFdmVudERhdGFMb2FkZXIiLCJEYXRhYmFzZSIsInVzZXJOYW1lIiwib2JqRGF0YWJhc2UiLCJVc2VyTmFtZSIsImdlbmVyYWxFdmVudFNvdXJjZSIsIl9nZXRBbGxPcmlnaW5hbEV2ZW50IiwicmVwZWF0RXZlbnRTb3VyY2VzIiwiX2dldEFsbFJlcGVhdEV2ZW50IiwiY29uY2F0Iiwic3FsIiwiYW5kMSIsImFuZDIiLCJEb2N1bWVudHNEYXRhRnJvbVNRTCIsIm9iaiIsIkpTT04iLCJwYXJzZSIsIkFycmF5IiwiaXNBcnJheSIsImVyciIsInJlcGVhdEV2ZW50cyIsImxvZyIsInVwZGF0ZUV2ZW50RGF0YU9uRHJvcCIsImRlbHRhIiwicmV2ZXJ0RnVuYyIsInVpIiwiX3VwZGF0ZURvY01vZGlmeURhdGUiLCJub3ciLCJzZXRTZWNvbmRzIiwiZ2V0U2Vjb25kcyIsIl9kMnMiLCJkdCIsImdldEZ1bGxZZWFyIiwiZm9ybWF0SW50VG9EYXRlU3RyaW5nIiwiZ2V0TW9udGgiLCJnZXREYXRlIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwidXBkYXRlRXZlbnREYXRhT25SZXNpemUiLCJldmVudEVuZFN0ciIsImNyZWF0ZUV2ZW50Iiwic2VsZWN0aW9uRGF0YSIsInVzZXJJbnB1dHMiLCJfZ2V0V2l6RXZlbnQiLCJFdmVudENvbGxlY3Rpb24iLCJHZXRDYWxlbmRhckV2ZW50czIiLCJnZXRSZW5kZXJSZXBlYXREYXkiLCJfczJkIiwiZ19ldmVudFN0YXJ0IiwiZ19yZXBlYXRSdWxlIiwiZ2V0V2Vla2x5UmVwZWF0RGF5IiwiY2hhckF0IiwiZ2V0RGF5IiwiaW50ZXIiLCJfaW50ZXJEYXlzIiwicGFyc2VGbG9hdCIsImdldE1vbnRobHlSZXBlYXREYXkiLCJnZXRZZWFybHlSZXBlYXREYXkiLCJnZXRDaGluZXNlUmVwZWF0RGF5IiwiZGF5cyIsInN1YnN0ciIsImlzQ2hyb21lIiwiZ19pc0Nocm9tZSIsInVhIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwidG9Mb3dlckNhc2UiLCJuIiwiY2hlY2tBbmRBZGRTdHJMZW5ndGgiLCJzdHIiLCJjb2xvckNvdW50IiwiV2l6RXhwbG9yZXJBcHAiLCJ3aW5kb3ciLCJleHRlcm5hbCIsIldpekV4cGxvcmVyV2luZG93IiwiV2luZG93IiwiV2l6RGF0YWJhc2UiLCJXaXpDb21tb25VSSIsIkNyZWF0ZVdpek9iamVjdCIsIldpekNvbmZpcm0iLCJtc2ciLCJTaG93TWVzc2FnZSIsIldpekFsZXJ0IiwiV2l6QnViYmxlTWVzc2FnZSIsImRlbGF5IiwiYXBwUGF0aCIsIkdldFNwZWNpYWxGb2xkZXIiLCJ3aXpTaGVsbEZpbGVOYW1lIiwiZGxsRmlsZU5hbWUiLCJwYXJhbXMiLCJSdW5FeGUiLCJXaXpTaGVsbCIsImRsbEV4cG9ydEZ1bmMiLCJ3aXpFeGUiLCJydW5TY3JpcHRGaWxlIiwic2NyaXB0RmlsZU5hbWUiLCJzY3JpcHRQYXJhbXMiLCJ3aXpCdWJibGVNZXNzYWdlIiwiZ2V0V2l6SW50ZXJmYWNlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBUSxvQkFBb0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBaUIsNEJBQTRCO0FBQzdDO0FBQ0E7QUFDQSwwQkFBa0IsMkJBQTJCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjs7QUFFQTtBQUNBLHNEQUE4QztBQUM5QztBQUNBO0FBQ0Esb0NBQTRCO0FBQzVCLHFDQUE2QjtBQUM3Qix5Q0FBaUM7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBNkI7QUFDN0IscUNBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSw2QkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQWtCLDhCQUE4QjtBQUNoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QztBQUQ3QyxTQUFQO0FBR0g7QUF6QlUiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG4gXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gd2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHRcdGlmIChwYXJlbnRIb3RVcGRhdGVDYWxsYmFjaykgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0fSA7XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XG4gXHRcdDtcbiBcdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QocmVxdWVzdFRpbWVvdXQpIHtcbiBcdFx0cmVxdWVzdFRpbWVvdXQgPSByZXF1ZXN0VGltZW91dCB8fCAxMDAwMDtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QobmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0XCIpKTtcbiBcdFx0XHR9XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIjtcbiBcdFx0XHRcdHJlcXVlc3Qub3BlbihcIkdFVFwiLCByZXF1ZXN0UGF0aCwgdHJ1ZSk7XG4gXHRcdFx0XHRyZXF1ZXN0LnRpbWVvdXQgPSByZXF1ZXN0VGltZW91dDtcbiBcdFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHJldHVybjtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xuIFx0XHRcdFx0XHQvLyB0aW1lb3V0XG4gXHRcdFx0XHRcdHJlamVjdChcbiBcdFx0XHRcdFx0XHRuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpXG4gXHRcdFx0XHRcdCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcbiBcdFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuIFx0XHRcdFx0XHRyZXNvbHZlKCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xuIFx0XHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXG4gXHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdC8vIHN1Y2Nlc3NcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcbiBcdFx0XHRcdFx0XHRyZWplY3QoZSk7XG4gXHRcdFx0XHRcdFx0cmV0dXJuO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdHJlc29sdmUodXBkYXRlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCI1M2Y2NTgzYjdmMDg3NDc1NDhkM1wiOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90UmVxdWVzdFRpbWVvdXQgPSAxMDAwMDtcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xuIFx0dmFyIGhvdEN1cnJlbnRDaGlsZE1vZHVsZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50c1RlbXAgPSBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmICghbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG4gXHRcdFx0XHRcdFx0cmVxdWVzdCArXG4gXHRcdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0KTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9LFxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fTtcbiBcdFx0Zm9yICh2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcImVcIiAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJ0XCJcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKSBob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0dGhyb3cgZXJyO1xuIFx0XHRcdH0pO1xuXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcbiBcdFx0XHRcdFx0aWYgKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH07XG4gXHRcdGZuLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRcdGlmIChtb2RlICYgMSkgdmFsdWUgPSBmbih2YWx1ZSk7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udCh2YWx1ZSwgbW9kZSAmIH4xKTtcbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBkZXAgPT09IFwidW5kZWZpbmVkXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdFx0ZWxzZSBob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGRlcCA9PT0gXCJ1bmRlZmluZWRcIikgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGlmICghbCkgcmV0dXJuIGhvdFN0YXR1cztcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cbiBcdFx0fTtcbiBcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xuIFx0XHRyZXR1cm4gaG90O1xuIFx0fVxuXG4gXHR2YXIgaG90U3RhdHVzSGFuZGxlcnMgPSBbXTtcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcblxuIFx0ZnVuY3Rpb24gaG90U2V0U3RhdHVzKG5ld1N0YXR1cykge1xuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XG4gXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaG90U3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xuIFx0fVxuXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XG4gXHR2YXIgaG90Q2h1bmtzTG9hZGluZyA9IDA7XG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RBdmFpbGFibGVGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdERlZmVycmVkO1xuXG4gXHQvLyBUaGUgdXBkYXRlIGluZm9cbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcbiBcdFx0dmFyIGlzTnVtYmVyID0gK2lkICsgXCJcIiA9PT0gaWQ7XG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSkge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcImlkbGVcIikge1xuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuIFx0XHR9XG4gXHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XG4gXHRcdHJldHVybiBob3REb3dubG9hZE1hbmlmZXN0KGhvdFJlcXVlc3RUaW1lb3V0KS50aGVuKGZ1bmN0aW9uKHVwZGF0ZSkge1xuIFx0XHRcdGlmICghdXBkYXRlKSB7XG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRcdFx0cmV0dXJuIG51bGw7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90QXZhaWxhYmxlRmlsZXNNYXAgPSB1cGRhdGUuYztcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdXBkYXRlLmg7XG5cbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRob3REZWZlcnJlZCA9IHtcbiBcdFx0XHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcbiBcdFx0XHRcdFx0cmVqZWN0OiByZWplY3RcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0aG90VXBkYXRlID0ge307XG4gXHRcdFx0Zm9yKHZhciBjaHVua0lkIGluIGluc3RhbGxlZENodW5rcylcbiBcdFx0XHR7XG4gXHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWxvbmUtYmxvY2tzXG4gXHRcdFx0XHQvKmdsb2JhbHMgY2h1bmtJZCAqL1xuIFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIgJiZcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiZcbiBcdFx0XHRcdGhvdFdhaXRpbmdGaWxlcyA9PT0gMFxuIFx0XHRcdCkge1xuIFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gcHJvbWlzZTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSB8fCAhaG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0pXG4gXHRcdFx0cmV0dXJuO1xuIFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IGZhbHNlO1xuIFx0XHRmb3IgKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYgKC0taG90V2FpdGluZ0ZpbGVzID09PSAwICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDApIHtcbiBcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzKys7XG4gXHRcdFx0aG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RVcGRhdGVEb3dubG9hZGVkKCkge1xuIFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcbiBcdFx0dmFyIGRlZmVycmVkID0gaG90RGVmZXJyZWQ7XG4gXHRcdGhvdERlZmVycmVkID0gbnVsbDtcbiBcdFx0aWYgKCFkZWZlcnJlZCkgcmV0dXJuO1xuIFx0XHRpZiAoaG90QXBwbHlPblVwZGF0ZSkge1xuIFx0XHRcdC8vIFdyYXAgZGVmZXJyZWQgb2JqZWN0IGluIFByb21pc2UgdG8gbWFyayBpdCBhcyBhIHdlbGwtaGFuZGxlZCBQcm9taXNlIHRvXG4gXHRcdFx0Ly8gYXZvaWQgdHJpZ2dlcmluZyB1bmNhdWdodCBleGNlcHRpb24gd2FybmluZyBpbiBDaHJvbWUuXG4gXHRcdFx0Ly8gU2VlIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ2NTY2NlxuIFx0XHRcdFByb21pc2UucmVzb2x2ZSgpXG4gXHRcdFx0XHQudGhlbihmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIGhvdEFwcGx5KGhvdEFwcGx5T25VcGRhdGUpO1xuIFx0XHRcdFx0fSlcbiBcdFx0XHRcdC50aGVuKFxuIFx0XHRcdFx0XHRmdW5jdGlvbihyZXN1bHQpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XG4gXHRcdFx0XHRcdH0sXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnIpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHQpO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2godG9Nb2R1bGVJZChpZCkpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucykge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcInJlYWR5XCIpXG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xuIFx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuIFx0XHR2YXIgY2I7XG4gXHRcdHZhciBpO1xuIFx0XHR2YXIgajtcbiBcdFx0dmFyIG1vZHVsZTtcbiBcdFx0dmFyIG1vZHVsZUlkO1xuXG4gXHRcdGZ1bmN0aW9uIGdldEFmZmVjdGVkU3R1ZmYodXBkYXRlTW9kdWxlSWQpIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW3VwZGF0ZU1vZHVsZUlkXTtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuIFx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpLm1hcChmdW5jdGlvbihpZCkge1xuIFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0Y2hhaW46IFtpZF0sXG4gXHRcdFx0XHRcdGlkOiBpZFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWVJdGVtLmlkO1xuIFx0XHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1kZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9tYWluKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRpZiAoIXBhcmVudCkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHRcdH07XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcbiBcdFx0XHRcdFx0cXVldWUucHVzaCh7XG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRpZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuXG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcbiBcdFx0XHRcdG1vZHVsZUlkOiB1cGRhdGVNb2R1bGVJZCxcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxuIFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXG4gXHRcdFx0fTtcbiBcdFx0fVxuXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcbiBcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdHZhciBpdGVtID0gYltpXTtcbiBcdFx0XHRcdGlmIChhLmluZGV4T2YoaXRlbSkgPT09IC0xKSBhLnB1c2goaXRlbSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxuIFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xuXG4gXHRcdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUoKSB7XG4gXHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCJcbiBcdFx0XHQpO1xuIFx0XHR9O1xuXG4gXHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XG4gXHRcdFx0XHQvKiogQHR5cGUge1RPRE99ICovXG4gXHRcdFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRcdFx0aWYgKGhvdFVwZGF0ZVtpZF0pIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGVJZCk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJkaXNwb3NlZFwiLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBpZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0LyoqIEB0eXBlIHtFcnJvcnxmYWxzZX0gKi9cbiBcdFx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XG4gXHRcdFx0XHRpZiAocmVzdWx0LmNoYWluKSB7XG4gXHRcdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcbiBcdFx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0XCIgaW4gXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wYXJlbnRJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uVW5hY2NlcHRlZCkgb3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25BY2NlcHRlZCkgb3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGlzcG9zZWQpIG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGRlZmF1bHQ6XG4gXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChhYm9ydEVycm9yKSB7XG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xuIFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoYWJvcnRFcnJvcik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9BcHBseSkge1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0Lm91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdFx0XHRcdGZvciAobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0XHRcdFx0aWYgKFxuIFx0XHRcdFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHRcdFx0XHQpXG4gXHRcdFx0XHRcdFx0KSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG4gXHRcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvRGlzcG9zZSkge1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSAmJlxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHQpXG4gXHRcdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XG4gXHRcdFx0XHRcdG1vZHVsZTogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdGVycm9ySGFuZGxlcjogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHRcdH0pO1xuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG4gXHRcdE9iamVjdC5rZXlzKGhvdEF2YWlsYWJsZUZpbGVzTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gPT09IGZhbHNlKSB7XG4gXHRcdFx0XHRob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHR9KTtcblxuIFx0XHR2YXIgaWR4O1xuIFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcbiBcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdGlmICghbW9kdWxlKSBjb250aW51ZTtcblxuIFx0XHRcdHZhciBkYXRhID0ge307XG5cbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xuIFx0XHRcdFx0Y2IoZGF0YSk7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XG5cbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XG5cbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG4gXHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuIFx0XHRcdFx0aWYgKCFjaGlsZCkgY29udGludWU7XG4gXHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cbiBcdFx0dmFyIGRlcGVuZGVuY3k7XG4gXHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcbiBcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcbiBcdFx0XHRcdFx0XHRpZiAoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdCBpbiBcImFwcGx5XCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiYXBwbHlcIik7XG5cbiBcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxuIFx0XHRmb3IgKG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFwcGxpZWRVcGRhdGUsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xuIFx0XHR2YXIgZXJyb3IgPSBudWxsO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XG4gXHRcdFx0XHRcdFx0Y2IgPSBtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcbiBcdFx0XHRcdFx0XHRpZiAoY2IpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFja3MuaW5kZXhPZihjYikgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGNiID0gY2FsbGJhY2tzW2ldO1xuIFx0XHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0XHRjYihtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XG4gXHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXSxcbiBcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcbiBcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyMjtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxuIFx0XHRpZiAoZXJyb3IpIHtcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gXHRcdH1cblxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuIFx0XHRcdHJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcImluZGV4XCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFtcIi4vc3JjL2luZGV4LmpzXCIsXCJ2ZW5kb3JcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcclxcbi8qIOaXpeWOhuaVtOS9k+agt+W8j1xcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcbiNjYWxlbmRhci1jb250YWluZXIge1xcclxcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICAgIHRvcDogMDtcXHJcXG4gICAgbGVmdDogOHB4O1xcclxcbiAgICByaWdodDogOHB4O1xcclxcbiAgICBib3R0b206IDhweDtcXHJcXG59XFxyXFxuXFxyXFxuLmZjLWhlYWRlci10b29sYmFyIHtcXHJcXG4gICAgLypcXHJcXG4gICAgdGhlIGNhbGVuZGFyIHdpbGwgYmUgYnV0dGluZyB1cCBhZ2FpbnN0IHRoZSBlZGdlcyxcXHJcXG4gICAgYnV0IGxldCdzIHNjb290IGluIHRoZSBoZWFkZXIncyBidXR0b25zXFxyXFxuICAgICovXFxyXFxuICAgIHBhZGRpbmctdG9wOiAxNHB4O1xcclxcbiAgICBwYWRkaW5nLWxlZnQ6IDA7XFxyXFxuICAgIHBhZGRpbmctcmlnaHQ6IDA7XFxyXFxufVxcclxcblxcclxcbi8qIOS6i+S7tua4suafk1xcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcbi50Yy1jb21wbGV0ZSB7XFxyXFxuICAgIG9wYWNpdHk6IDAuMztcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuLnRjLWNvbXBsZXRlID4gLmZjLWNvbnRlbnQge1xcclxcbiAgICB0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaCAhaW1wb3J0YW50O1xcclxcbn1cXHJcXG5cXHJcXG4udGMtY29tcGxldGU6aG92ZXIge1xcclxcbiAgICBvcGFjaXR5OiAxO1xcclxcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi8qIFBvcG92ZXIg57uE5Lu25qC35byPXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuXFxyXFxuLyogUG9wb3ZlciDlrrnlmajlj4rlrprkvY1cXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG5cXHJcXG4udGMtcG9wb3ZlciB7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgYmFja2dyb3VuZDogI0ZGRjtcXHJcXG4gICAgY29sb3I6IGJsYWNrO1xcclxcbiAgICB3aWR0aDogYXV0bztcXHJcXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjIpO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XFxyXFxuICAgIGJveC1zaGFkb3c6IDAgMnB4IDRweCByZ2JhKDAsIDAsIDAsIC4yKTtcXHJcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXIgLmFycm93IHtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgd2lkdGg6IDIwcHg7XFxyXFxuICAgIGhlaWdodDogMTBweDtcXHJcXG4gICAgbWFyZ2luOiAwIDZweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXIgLmFycm93OjpiZWZvcmUsIC50Yy1wb3BvdmVyIC5hcnJvdzo6YWZ0ZXIge1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgICBjb250ZW50OiBcXFwiXFxcIjtcXHJcXG4gICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcXHJcXG4gICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcXHJcXG59XFxyXFxuXFxyXFxuLyogdG9wIOaUvue9ruagt+W8j1xcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwidG9wXFxcIl0ge1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInRvcFxcXCJdIC5hcnJvdyB7XFxyXFxuICAgIGJvdHRvbTogY2FsYygoMTBweCArIDFweCkgKiAtMSk7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwidG9wXFxcIl0gLmFycm93OjpiZWZvcmUsXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJ0b3BcXFwiXSAuYXJyb3c6OmFmdGVyIHtcXHJcXG4gICAgYm9yZGVyLXdpZHRoOiAxMHB4IDEwcHggMDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJ0b3BcXFwiXSAuYXJyb3c6OmJlZm9yZSB7XFxyXFxuICAgIGJvdHRvbTogMDtcXHJcXG4gICAgYm9yZGVyLXRvcC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KTtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJ0b3BcXFwiXSAuYXJyb3c6OmFmdGVyIHtcXHJcXG4gICAgYm90dG9tOiAxcHg7XFxyXFxuICAgIGJvcmRlci10b3AtY29sb3I6ICNmZmY7XFxyXFxufVxcclxcblxcclxcbi8qIHJpZ2h0IOaUvue9ruagt+W8j1xcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwicmlnaHRcXFwiXSB7XFxyXFxuICAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInJpZ2h0XFxcIl0gLmFycm93IHtcXHJcXG4gICAgbGVmdDogY2FsYygoMTBweCArIDFweCkgKiAtMSk7XFxyXFxuICAgIHdpZHRoOiAxMHB4O1xcclxcbiAgICBoZWlnaHQ6IDIwcHg7XFxyXFxuICAgIG1hcmdpbjogNnB4IDA7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwicmlnaHRcXFwiXSAuYXJyb3c6OmJlZm9yZSxcXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInJpZ2h0XFxcIl0gLmFycm93OjphZnRlciB7XFxyXFxuICAgIGJvcmRlci13aWR0aDogMTBweCAxMHB4IDEwcHggMDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJyaWdodFxcXCJdIC5hcnJvdzo6YmVmb3JlIHtcXHJcXG4gICAgbGVmdDogMDtcXHJcXG4gICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMjUpO1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInJpZ2h0XFxcIl0gLmFycm93OjphZnRlciB7XFxyXFxuICAgIGxlZnQ6IDFweDtcXHJcXG4gICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiAjZmZmO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBib3R0b20g5pS+572u5qC35byPXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJib3R0b21cXFwiXSB7XFxyXFxuICAgIG1hcmdpbi10b3A6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwiYm90dG9tXFxcIl0gLmFycm93IHtcXHJcXG4gICAgdG9wOiBjYWxjKCgxMHB4ICsgMXB4KSAqIC0xKTtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJib3R0b21cXFwiXSAuYXJyb3c6OmJlZm9yZSxcXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImJvdHRvbVxcXCJdIC5hcnJvdzo6YWZ0ZXIge1xcclxcbiAgICBib3JkZXItd2lkdGg6IDAgMTBweCAxMHB4IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwiYm90dG9tXFxcIl0gLmFycm93OjpiZWZvcmUge1xcclxcbiAgICB0b3A6IDA7XFxyXFxuICAgIGJvcmRlci1ib3R0b20tY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSk7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwiYm90dG9tXFxcIl0gLmFycm93OjphZnRlciB7XFxyXFxuICAgIHRvcDogMXB4O1xcclxcbiAgICBib3JkZXItYm90dG9tLWNvbG9yOiAjZjdmN2Y3OyAvKui/memHjOS4uuS6huS4k+mXqOmAgumFjeacieagh+mimOiDjOaZr+eahFBvcG92ZXIqL1xcclxcbn1cXHJcXG5cXHJcXG4vKiBsZWZ0IOaUvue9ruagt+W8j1xcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwibGVmdFxcXCJdIHtcXHJcXG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImxlZnRcXFwiXSAuYXJyb3cge1xcclxcbiAgICByaWdodDogY2FsYygoMTBweCArIDFweCkgKiAtMSk7XFxyXFxuICAgIHdpZHRoOiAxMHB4O1xcclxcbiAgICBoZWlnaHQ6IDIwcHg7XFxyXFxuICAgIG1hcmdpbjogNnB4IDA7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwibGVmdFxcXCJdIC5hcnJvdzo6YmVmb3JlLFxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwibGVmdFxcXCJdIC5hcnJvdzo6YWZ0ZXIge1xcclxcbiAgICBib3JkZXItd2lkdGg6IDEwcHggMCAxMHB4IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwibGVmdFxcXCJdIC5hcnJvdzo6YmVmb3JlIHtcXHJcXG4gICAgcmlnaHQ6IDA7XFxyXFxuICAgIGJvcmRlci1sZWZ0LWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMjUpO1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImxlZnRcXFwiXSAuYXJyb3c6OmFmdGVyIHtcXHJcXG4gICAgcmlnaHQ6IDFweDtcXHJcXG4gICAgYm9yZGVyLWxlZnQtY29sb3I6ICNmZmY7XFxyXFxufVxcclxcblxcclxcbi8qIENvbnRlbnQg5qCH6aKY5ZKM5YaF5a65XFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuXFxyXFxuLnRjLXBvcG92ZXItaGVhZGVyIHtcXHJcXG4gICAgcGFkZGluZzogLjVyZW0gLjc1cmVtO1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xcclxcbiAgICBmb250LXNpemU6IDFyZW07XFxyXFxuICAgIGNvbG9yOiBpbmhlcml0O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjdmN2Y3O1xcclxcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2ViZWJlYjtcXHJcXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNnB4O1xcclxcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNnB4O1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlci1ib2R5IHtcXHJcXG4gICAgcGFkZGluZzogMTBweCAxNXB4O1xcclxcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIiN0Yy1lZGl0cG9wcGVyLWV2ZW50dGl0bGUge1xcclxcbiAgICBib3JkZXItd2lkdGg6IDFweDtcXHJcXG4gICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxyXFxuICAgIHBhZGRpbmc6IDA7XFxyXFxuICAgIG1hcmdpbjogMDtcXHJcXG4gICAgZm9udC1zaXplOiAxLjJlbTtcXHJcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxufVxcclxcblxcclxcbiN0Yy1lZGl0cG9wcGVyLWV2ZW50dGl0bGU6Zm9jdXMsXFxyXFxuI3RjLWVkaXRwb3BwZXItZXZlbnR0aXRsZTpob3ZlciB7XFxyXFxuICAgIG91dGxpbmU6IG5vbmU7XFxyXFxuICAgIGJvcmRlci1ib3R0b20tY29sb3I6IGJsYWNrOyBcXHJcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJodG1sLCBib2R5IHtcXHJcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXHJcXG4gICAgZm9udC1zaXplOiAxNHB4O1xcclxcbn1cXHJcXG5cXHJcXG46Zm9jdXMge1xcclxcbiAgICBvdXRsaW5lOm5vbmU7XFxyXFxufVxcclxcblxcclxcbi8qIEZvbnRzLmNzcyAtLSDot6jlubPlj7DkuK3mloflrZfkvZPop6PlhrPmlrnmoYhcXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuLmZvbnQtaGVpIHtmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgXFxcIk5vdG8gU2Fuc1xcXCIsIFxcXCJIZWx2ZXRpY2EgTmV1ZVxcXCIsIEhlbHZldGljYSwgXFxcIk5pbWJ1cyBTYW5zIExcXFwiLCBBcmlhbCwgXFxcIkxpYmVyYXRpb24gU2Fuc1xcXCIsIFxcXCJQaW5nRmFuZyBTQ1xcXCIsIFxcXCJIaXJhZ2lubyBTYW5zIEdCXFxcIiwgXFxcIk5vdG8gU2FucyBDSksgU0NcXFwiLCBcXFwiU291cmNlIEhhbiBTYW5zIFNDXFxcIiwgXFxcIlNvdXJjZSBIYW4gU2FucyBDTlxcXCIsIFxcXCJNaWNyb3NvZnQgWWFIZWlcXFwiLCBcXFwiV2VucXVhbnlpIE1pY3JvIEhlaVxcXCIsIFxcXCJXZW5RdWFuWWkgWmVuIEhlaVxcXCIsIFxcXCJTVCBIZWl0aVxcXCIsIFNpbUhlaSwgXFxcIldlblF1YW5ZaSBaZW4gSGVpIFNoYXJwXFxcIiwgc2Fucy1zZXJpZjt9XFxyXFxuLmZvbnQta2FpIHtmb250LWZhbWlseTogQmFza2VydmlsbGUsIEdlb3JnaWEsIFxcXCJMaWJlcmF0aW9uIFNlcmlmXFxcIiwgXFxcIkthaXRpIFNDXFxcIiwgU1RLYWl0aSwgXFxcIkFSIFBMIFVLYWkgQ05cXFwiLCBcXFwiQVIgUEwgVUthaSBIS1xcXCIsIFxcXCJBUiBQTCBVS2FpIFRXXFxcIiwgXFxcIkFSIFBMIFVLYWkgVFcgTUJFXFxcIiwgXFxcIkFSIFBMIEthaXRpTSBHQlxcXCIsIEthaVRpLCBLYWlUaV9HQjIzMTIsIERGS2FpLVNCLCBcXFwiVFctS2FpXFxcIiwgc2VyaWY7fVxcclxcbi5mb250LXNvbmcge2ZvbnQtZmFtaWx5OiBHZW9yZ2lhLCBcXFwiTmltYnVzIFJvbWFuIE5vOSBMXFxcIiwgXFxcIlNvbmd0aSBTQ1xcXCIsIFxcXCJOb3RvIFNlcmlmIENKSyBTQ1xcXCIsIFxcXCJTb3VyY2UgSGFuIFNlcmlmIFNDXFxcIiwgXFxcIlNvdXJjZSBIYW4gU2VyaWYgQ05cXFwiLCBTVFNvbmcsIFxcXCJBUiBQTCBOZXcgU3VuZ1xcXCIsIFxcXCJBUiBQTCBTdW5ndGlMIEdCXFxcIiwgTlNpbVN1biwgU2ltU3VuLCBcXFwiVFctU3VuZ1xcXCIsIFxcXCJXZW5RdWFuWWkgQml0bWFwIFNvbmdcXFwiLCBcXFwiQVIgUEwgVU1pbmcgQ05cXFwiLCBcXFwiQVIgUEwgVU1pbmcgSEtcXFwiLCBcXFwiQVIgUEwgVU1pbmcgVFdcXFwiLCBcXFwiQVIgUEwgVU1pbmcgVFcgTUJFXFxcIiwgUE1pbmdMaVUsIE1pbmdMaVUsIHNlcmlmO31cXHJcXG4uZm9udC1mYW5nLXNvbmcge2ZvbnQtZmFtaWx5OiBCYXNrZXJ2aWxsZSwgXFxcIlRpbWVzIE5ldyBSb21hblxcXCIsIFxcXCJMaWJlcmF0aW9uIFNlcmlmXFxcIiwgU1RGYW5nc29uZywgRmFuZ1NvbmcsIEZhbmdTb25nX0dCMjMxMiwgXFxcIkNXVEVYLUZcXFwiLCBzZXJpZjt9XFxyXFxuXFxyXFxuLyog5Li05pe25pS+572uXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuXFxyXFxuLnVpLWJ1dHRvbi1pY29uLW9ubHkuc3BsaXRidXR0b24tc2VsZWN0IHtcXHJcXG4gICAgd2lkdGg6IDFlbTtcXHJcXG59XFxyXFxuXFxyXFxuYVtkYXRhLWdvdG9dIHtcXHJcXG4gICAgY29sb3I6ICMwMDA7XFxyXFxufVxcclxcblxcclxcbi8qIEJvb3RzdHJhcCA0IOe7hOS7tuagt+W8j1xcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcblxcclxcbi8qIOihqOWNlVxcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcbi5jb2wtZm9ybS1sYWJlbCB7XFxyXFxuICAgIHBhZGRpbmctdG9wOiBjYWxjKC4zNzVyZW0gKyAxcHgpO1xcclxcbiAgICBwYWRkaW5nLWJvdHRvbTogY2FsYyguMzc1cmVtICsgMXB4KTtcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogMDtcXHJcXG4gICAgZm9udC1zaXplOiBpbmhlcml0O1xcclxcbiAgICBsaW5lLWhlaWdodDogMS41O1xcclxcbn1cXHJcXG5cXHJcXG4uaW5wdXQtZ3JvdXAtYWRkb24ge1xcclxcbiAgYm9yZGVyLWxlZnQtd2lkdGg6IDA7XFxyXFxuICBib3JkZXItcmlnaHQtd2lkdGg6IDA7XFxyXFxufVxcclxcbi5pbnB1dC1ncm91cC1hZGRvbjpmaXJzdC1jaGlsZCB7XFxyXFxuICBib3JkZXItbGVmdC13aWR0aDogMXB4O1xcclxcbn1cXHJcXG4uaW5wdXQtZ3JvdXAtYWRkb246bGFzdC1jaGlsZCB7XFxyXFxuICBib3JkZXItcmlnaHQtd2lkdGg6IDFweDtcXHJcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwidmFyIG1hcCA9IHtcblx0XCIuL2FmXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hZi5qc1wiLFxuXHRcIi4vYWYuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FmLmpzXCIsXG5cdFwiLi9hclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXIuanNcIixcblx0XCIuL2FyLWR6XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1kei5qc1wiLFxuXHRcIi4vYXItZHouanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWR6LmpzXCIsXG5cdFwiLi9hci1rd1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXIta3cuanNcIixcblx0XCIuL2FyLWt3LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1rdy5qc1wiLFxuXHRcIi4vYXItbHlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWx5LmpzXCIsXG5cdFwiLi9hci1seS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItbHkuanNcIixcblx0XCIuL2FyLW1hXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1tYS5qc1wiLFxuXHRcIi4vYXItbWEuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLW1hLmpzXCIsXG5cdFwiLi9hci1zYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItc2EuanNcIixcblx0XCIuL2FyLXNhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1zYS5qc1wiLFxuXHRcIi4vYXItdG5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLXRuLmpzXCIsXG5cdFwiLi9hci10bi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItdG4uanNcIixcblx0XCIuL2FyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci5qc1wiLFxuXHRcIi4vYXpcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2F6LmpzXCIsXG5cdFwiLi9hei5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXouanNcIixcblx0XCIuL2JlXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iZS5qc1wiLFxuXHRcIi4vYmUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JlLmpzXCIsXG5cdFwiLi9iZ1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYmcuanNcIixcblx0XCIuL2JnLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iZy5qc1wiLFxuXHRcIi4vYm1cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JtLmpzXCIsXG5cdFwiLi9ibS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm0uanNcIixcblx0XCIuL2JuXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ibi5qc1wiLFxuXHRcIi4vYm4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JuLmpzXCIsXG5cdFwiLi9ib1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm8uanNcIixcblx0XCIuL2JvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iby5qc1wiLFxuXHRcIi4vYnJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JyLmpzXCIsXG5cdFwiLi9ici5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYnIuanNcIixcblx0XCIuL2JzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9icy5qc1wiLFxuXHRcIi4vYnMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JzLmpzXCIsXG5cdFwiLi9jYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY2EuanNcIixcblx0XCIuL2NhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jYS5qc1wiLFxuXHRcIi4vY3NcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2NzLmpzXCIsXG5cdFwiLi9jcy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3MuanNcIixcblx0XCIuL2N2XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jdi5qc1wiLFxuXHRcIi4vY3YuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2N2LmpzXCIsXG5cdFwiLi9jeVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3kuanNcIixcblx0XCIuL2N5LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jeS5qc1wiLFxuXHRcIi4vZGFcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RhLmpzXCIsXG5cdFwiLi9kYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGEuanNcIixcblx0XCIuL2RlXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS5qc1wiLFxuXHRcIi4vZGUtYXRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLWF0LmpzXCIsXG5cdFwiLi9kZS1hdC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUtYXQuanNcIixcblx0XCIuL2RlLWNoXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS1jaC5qc1wiLFxuXHRcIi4vZGUtY2guanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLWNoLmpzXCIsXG5cdFwiLi9kZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUuanNcIixcblx0XCIuL2R2XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kdi5qc1wiLFxuXHRcIi4vZHYuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2R2LmpzXCIsXG5cdFwiLi9lbFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZWwuanNcIixcblx0XCIuL2VsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbC5qc1wiLFxuXHRcIi4vZW4tYXVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWF1LmpzXCIsXG5cdFwiLi9lbi1hdS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tYXUuanNcIixcblx0XCIuL2VuLWNhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1jYS5qc1wiLFxuXHRcIi4vZW4tY2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWNhLmpzXCIsXG5cdFwiLi9lbi1nYlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tZ2IuanNcIixcblx0XCIuL2VuLWdiLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1nYi5qc1wiLFxuXHRcIi4vZW4taWVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWllLmpzXCIsXG5cdFwiLi9lbi1pZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4taWUuanNcIixcblx0XCIuL2VuLWlsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1pbC5qc1wiLFxuXHRcIi4vZW4taWwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWlsLmpzXCIsXG5cdFwiLi9lbi1uelwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tbnouanNcIixcblx0XCIuL2VuLW56LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1uei5qc1wiLFxuXHRcIi4vZW9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VvLmpzXCIsXG5cdFwiLi9lby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW8uanNcIixcblx0XCIuL2VzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy5qc1wiLFxuXHRcIi4vZXMtZG9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLWRvLmpzXCIsXG5cdFwiLi9lcy1kby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMtZG8uanNcIixcblx0XCIuL2VzLXVzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy11cy5qc1wiLFxuXHRcIi4vZXMtdXMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLXVzLmpzXCIsXG5cdFwiLi9lcy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMuanNcIixcblx0XCIuL2V0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ldC5qc1wiLFxuXHRcIi4vZXQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2V0LmpzXCIsXG5cdFwiLi9ldVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXUuanNcIixcblx0XCIuL2V1LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ldS5qc1wiLFxuXHRcIi4vZmFcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZhLmpzXCIsXG5cdFwiLi9mYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZmEuanNcIixcblx0XCIuL2ZpXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9maS5qc1wiLFxuXHRcIi4vZmkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZpLmpzXCIsXG5cdFwiLi9mb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZm8uanNcIixcblx0XCIuL2ZvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mby5qc1wiLFxuXHRcIi4vZnJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLmpzXCIsXG5cdFwiLi9mci1jYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnItY2EuanNcIixcblx0XCIuL2ZyLWNhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci1jYS5qc1wiLFxuXHRcIi4vZnItY2hcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLWNoLmpzXCIsXG5cdFwiLi9mci1jaC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnItY2guanNcIixcblx0XCIuL2ZyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci5qc1wiLFxuXHRcIi4vZnlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2Z5LmpzXCIsXG5cdFwiLi9meS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnkuanNcIixcblx0XCIuL2dkXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nZC5qc1wiLFxuXHRcIi4vZ2QuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dkLmpzXCIsXG5cdFwiLi9nbFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ2wuanNcIixcblx0XCIuL2dsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nbC5qc1wiLFxuXHRcIi4vZ29tLWxhdG5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dvbS1sYXRuLmpzXCIsXG5cdFwiLi9nb20tbGF0bi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ29tLWxhdG4uanNcIixcblx0XCIuL2d1XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ndS5qc1wiLFxuXHRcIi4vZ3UuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2d1LmpzXCIsXG5cdFwiLi9oZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaGUuanNcIixcblx0XCIuL2hlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oZS5qc1wiLFxuXHRcIi4vaGlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hpLmpzXCIsXG5cdFwiLi9oaS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaGkuanNcIixcblx0XCIuL2hyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oci5qc1wiLFxuXHRcIi4vaHIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hyLmpzXCIsXG5cdFwiLi9odVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHUuanNcIixcblx0XCIuL2h1LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9odS5qc1wiLFxuXHRcIi4vaHktYW1cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2h5LWFtLmpzXCIsXG5cdFwiLi9oeS1hbS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHktYW0uanNcIixcblx0XCIuL2lkXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pZC5qc1wiLFxuXHRcIi4vaWQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2lkLmpzXCIsXG5cdFwiLi9pc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaXMuanNcIixcblx0XCIuL2lzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pcy5qc1wiLFxuXHRcIi4vaXRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2l0LmpzXCIsXG5cdFwiLi9pdC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaXQuanNcIixcblx0XCIuL2phXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9qYS5qc1wiLFxuXHRcIi4vamEuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2phLmpzXCIsXG5cdFwiLi9qdlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvanYuanNcIixcblx0XCIuL2p2LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9qdi5qc1wiLFxuXHRcIi4va2FcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2thLmpzXCIsXG5cdFwiLi9rYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva2EuanNcIixcblx0XCIuL2trXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ray5qc1wiLFxuXHRcIi4va2suanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2trLmpzXCIsXG5cdFwiLi9rbVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva20uanNcIixcblx0XCIuL2ttLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rbS5qc1wiLFxuXHRcIi4va25cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2tuLmpzXCIsXG5cdFwiLi9rbi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva24uanNcIixcblx0XCIuL2tvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rby5qc1wiLFxuXHRcIi4va28uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2tvLmpzXCIsXG5cdFwiLi9reVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva3kuanNcIixcblx0XCIuL2t5LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9reS5qc1wiLFxuXHRcIi4vbGJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2xiLmpzXCIsXG5cdFwiLi9sYi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbGIuanNcIixcblx0XCIuL2xvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sby5qc1wiLFxuXHRcIi4vbG8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2xvLmpzXCIsXG5cdFwiLi9sdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbHQuanNcIixcblx0XCIuL2x0LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sdC5qc1wiLFxuXHRcIi4vbHZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2x2LmpzXCIsXG5cdFwiLi9sdi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbHYuanNcIixcblx0XCIuL21lXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tZS5qc1wiLFxuXHRcIi4vbWUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21lLmpzXCIsXG5cdFwiLi9taVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWkuanNcIixcblx0XCIuL21pLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9taS5qc1wiLFxuXHRcIi4vbWtcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21rLmpzXCIsXG5cdFwiLi9tay5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWsuanNcIixcblx0XCIuL21sXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tbC5qc1wiLFxuXHRcIi4vbWwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21sLmpzXCIsXG5cdFwiLi9tblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbW4uanNcIixcblx0XCIuL21uLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tbi5qc1wiLFxuXHRcIi4vbXJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21yLmpzXCIsXG5cdFwiLi9tci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXIuanNcIixcblx0XCIuL21zXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tcy5qc1wiLFxuXHRcIi4vbXMtbXlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21zLW15LmpzXCIsXG5cdFwiLi9tcy1teS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXMtbXkuanNcIixcblx0XCIuL21zLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tcy5qc1wiLFxuXHRcIi4vbXRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL210LmpzXCIsXG5cdFwiLi9tdC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXQuanNcIixcblx0XCIuL215XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9teS5qc1wiLFxuXHRcIi4vbXkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL215LmpzXCIsXG5cdFwiLi9uYlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmIuanNcIixcblx0XCIuL25iLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9uYi5qc1wiLFxuXHRcIi4vbmVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25lLmpzXCIsXG5cdFwiLi9uZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmUuanNcIixcblx0XCIuL25sXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubC5qc1wiLFxuXHRcIi4vbmwtYmVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25sLWJlLmpzXCIsXG5cdFwiLi9ubC1iZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmwtYmUuanNcIixcblx0XCIuL25sLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubC5qc1wiLFxuXHRcIi4vbm5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25uLmpzXCIsXG5cdFwiLi9ubi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbm4uanNcIixcblx0XCIuL3BhLWluXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wYS1pbi5qc1wiLFxuXHRcIi4vcGEtaW4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3BhLWluLmpzXCIsXG5cdFwiLi9wbFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcGwuanNcIixcblx0XCIuL3BsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wbC5qc1wiLFxuXHRcIi4vcHRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3B0LmpzXCIsXG5cdFwiLi9wdC1iclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcHQtYnIuanNcIixcblx0XCIuL3B0LWJyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wdC1ici5qc1wiLFxuXHRcIi4vcHQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3B0LmpzXCIsXG5cdFwiLi9yb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcm8uanNcIixcblx0XCIuL3JvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9yby5qc1wiLFxuXHRcIi4vcnVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3J1LmpzXCIsXG5cdFwiLi9ydS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcnUuanNcIixcblx0XCIuL3NkXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zZC5qc1wiLFxuXHRcIi4vc2QuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NkLmpzXCIsXG5cdFwiLi9zZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2UuanNcIixcblx0XCIuL3NlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zZS5qc1wiLFxuXHRcIi4vc2lcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NpLmpzXCIsXG5cdFwiLi9zaS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2kuanNcIixcblx0XCIuL3NrXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zay5qc1wiLFxuXHRcIi4vc2suanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NrLmpzXCIsXG5cdFwiLi9zbFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2wuanNcIixcblx0XCIuL3NsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zbC5qc1wiLFxuXHRcIi4vc3FcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NxLmpzXCIsXG5cdFwiLi9zcS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3EuanNcIixcblx0XCIuL3NyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zci5qc1wiLFxuXHRcIi4vc3ItY3lybFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3ItY3lybC5qc1wiLFxuXHRcIi4vc3ItY3lybC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3ItY3lybC5qc1wiLFxuXHRcIi4vc3IuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NyLmpzXCIsXG5cdFwiLi9zc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3MuanNcIixcblx0XCIuL3NzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zcy5qc1wiLFxuXHRcIi4vc3ZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3N2LmpzXCIsXG5cdFwiLi9zdi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3YuanNcIixcblx0XCIuL3N3XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zdy5qc1wiLFxuXHRcIi4vc3cuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3N3LmpzXCIsXG5cdFwiLi90YVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGEuanNcIixcblx0XCIuL3RhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90YS5qc1wiLFxuXHRcIi4vdGVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RlLmpzXCIsXG5cdFwiLi90ZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGUuanNcIixcblx0XCIuL3RldFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGV0LmpzXCIsXG5cdFwiLi90ZXQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RldC5qc1wiLFxuXHRcIi4vdGdcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RnLmpzXCIsXG5cdFwiLi90Zy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGcuanNcIixcblx0XCIuL3RoXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90aC5qc1wiLFxuXHRcIi4vdGguanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RoLmpzXCIsXG5cdFwiLi90bC1waFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGwtcGguanNcIixcblx0XCIuL3RsLXBoLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90bC1waC5qc1wiLFxuXHRcIi4vdGxoXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90bGguanNcIixcblx0XCIuL3RsaC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGxoLmpzXCIsXG5cdFwiLi90clwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHIuanNcIixcblx0XCIuL3RyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ci5qc1wiLFxuXHRcIi4vdHpsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90emwuanNcIixcblx0XCIuL3R6bC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHpsLmpzXCIsXG5cdFwiLi90em1cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3R6bS5qc1wiLFxuXHRcIi4vdHptLWxhdG5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3R6bS1sYXRuLmpzXCIsXG5cdFwiLi90em0tbGF0bi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHptLWxhdG4uanNcIixcblx0XCIuL3R6bS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHptLmpzXCIsXG5cdFwiLi91Zy1jblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdWctY24uanNcIixcblx0XCIuL3VnLWNuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91Zy1jbi5qc1wiLFxuXHRcIi4vdWtcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VrLmpzXCIsXG5cdFwiLi91ay5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdWsuanNcIixcblx0XCIuL3VyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ci5qc1wiLFxuXHRcIi4vdXIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VyLmpzXCIsXG5cdFwiLi91elwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXouanNcIixcblx0XCIuL3V6LWxhdG5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3V6LWxhdG4uanNcIixcblx0XCIuL3V6LWxhdG4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3V6LWxhdG4uanNcIixcblx0XCIuL3V6LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ei5qc1wiLFxuXHRcIi4vdmlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3ZpLmpzXCIsXG5cdFwiLi92aS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdmkuanNcIixcblx0XCIuL3gtcHNldWRvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS94LXBzZXVkby5qc1wiLFxuXHRcIi4veC1wc2V1ZG8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3gtcHNldWRvLmpzXCIsXG5cdFwiLi95b1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUveW8uanNcIixcblx0XCIuL3lvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS95by5qc1wiLFxuXHRcIi4vemgtY25cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLWNuLmpzXCIsXG5cdFwiLi96aC1jbi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtY24uanNcIixcblx0XCIuL3poLWhrXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC1oay5qc1wiLFxuXHRcIi4vemgtaGsuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLWhrLmpzXCIsXG5cdFwiLi96aC10d1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtdHcuanNcIixcblx0XCIuL3poLXR3LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC10dy5qc1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHR2YXIgaWQgPSBtYXBbcmVxXTtcblx0aWYoIShpZCArIDEpKSB7IC8vIGNoZWNrIGZvciBudW1iZXIgb3Igc3RyaW5nXG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBpZDtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUgc3luYyByZWN1cnNpdmUgXlxcXFwuXFxcXC8uKiRcIjsiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgQ2FsZW5kYXIgZnJvbSAnLi9jb21wb25lbnRzL0NhbGVuZGFyL0NhbGVuZGFyJztcclxuaW1wb3J0IEV2ZW50UG9wb3ZlciBmcm9tICcuL2NvbXBvbmVudHMvRXZlbnRQb3BvdmVyL0V2ZW50UG9wb3Zlcic7XHJcbmltcG9ydCB7IFdpekFsZXJ0IH0gZnJvbSAnLi91dGlscy9XaXpJbnRlcmZhY2UnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgY2xpY2tlZEV2ZW50OiBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaGFuZGxlRXZlbnRDbGljayA9IHRoaXMuaGFuZGxlRXZlbnRDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUV2ZW50Q2xpY2soIGV2ZW50LCBqc0V2ZW50LCB2aWV3ICkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coZXZlbnQudGl0bGUsIGV2ZW50LCBqc0V2ZW50LCB2aWV3KVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBjbGlja2VkRXZlbnRBcmdzOiB7IGV2ZW50LCBqc0V2ZW50LCB2aWV3IH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGlkPSd3aXotdG9tYXRvLWNhbGVuZGFyJyA+XHJcbiAgICAgICAgICAgICAgICA8Q2FsZW5kYXIgb25FdmVudENsaWNrID0ge3RoaXMuaGFuZGxlRXZlbnRDbGlja30gLz5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmNsaWNrZWRFdmVudEFyZ3MgJiYgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxFdmVudFBvcG92ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50ID0ge3RoaXMuc3RhdGUuY2xpY2tlZEV2ZW50QXJncy5ldmVudH0gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZlcmVuY2UgPSB7dGhpcy5zdGF0ZS5jbGlja2VkRXZlbnRBcmdzLmpzRXZlbnQudGFyZ2V0fSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLz4gXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9DYWxlbmRhci5jc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vQ2FsZW5kYXIuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9DYWxlbmRhci5jc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IEZ1bGxDYWxlbmRhciBmcm9tICcuL0Z1bGxDYWxlbmRhcic7XHJcbmltcG9ydCAnZnVsbGNhbGVuZGFyLXJlYWN0d3JhcHBlci9kaXN0L2Nzcy9mdWxsY2FsZW5kYXIubWluLmNzcyc7XHJcbmltcG9ydCAnLi9DYWxlbmRhci5jc3MnO1xyXG5pbXBvcnQgV2l6RXZlbnREYXRhTG9hZGVyIGZyb20gJy4uLy4uL21vZGVscy9XaXpFdmVudERhdGFMb2FkZXInXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYWxlbmRhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBldmVudHM6IFtdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGF0YUxvYWRlciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jYWxlbmRhciA9IG51bGw7XHJcbiAgICAgICAgLy/nu5Hlrprlj6Xmn4RcclxuICAgICAgICB0aGlzLm9uQ2FsZW5kYXJSZW5kZXIgPSB0aGlzLm9uQ2FsZW5kYXJSZW5kZXIuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLm9uVmlld1JlbmRlciA9IHRoaXMub25WaWV3UmVuZGVyLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5vbkV2ZW50UmVuZGVyID0gdGhpcy5vbkV2ZW50UmVuZGVyLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DYWxlbmRhclJlbmRlcihlbCkge1xyXG4gICAgICAgIHRoaXMuY2FsZW5kYXIgPSBlbDtcclxuICAgICAgICB0aGlzLmRhdGFMb2FkZXIgPSBuZXcgV2l6RXZlbnREYXRhTG9hZGVyKHRoaXMuY2FsZW5kYXIpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVmlld1JlbmRlciggdmlldywgZWxlbWVudCApIHtcclxuICAgICAgICAvLyDliLfmlrDop4blm77vvIzph43mlrDojrflj5bml6Xljobkuovku7ZcclxuICAgICAgICBjb25zdCAkY2FsZW5kYXIgPSAkKHRoaXMuY2FsZW5kYXIpO1xyXG4gICAgICAgIGNvbnN0IGV2ZW50U291cmNlcyA9IHRoaXMuZGF0YUxvYWRlci5nZXRFdmVudFNvdXJjZXMoIHZpZXcsIGVsZW1lbnQgKTtcclxuICAgICAgICAkY2FsZW5kYXIuZnVsbENhbGVuZGFyKCdyZW1vdmVFdmVudHMnKTtcclxuICAgICAgICBmb3IgKGxldCBpPTAgOyBpIDwgZXZlbnRTb3VyY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICRjYWxlbmRhci5mdWxsQ2FsZW5kYXIoJ2FkZEV2ZW50U291cmNlJywgZXZlbnRTb3VyY2VzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25FdmVudFJlbmRlciggZXZlbnRPYmosICRlbCApIHtcclxuICAgICAgICAvLyDlhYPntKDlt7Lnu4/muLLmn5PvvIzlj6/kv67mlLnlhYPntKBcclxuICAgICAgICBjb25zdCBpc0NvbXBsZXRlID0gcGFyc2VJbnQoZXZlbnRPYmouY29tcGxldGUpID09IDU7XHJcbiAgICAgICAgaWYgKCBpc0NvbXBsZXRlICkge1xyXG4gICAgICAgICAgICAvLyDmoLflvI9cclxuICAgICAgICAgICAgJGVsLmFkZENsYXNzKCd0Yy1jb21wbGV0ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICBcclxuICAgIH1cclxuIFxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiuvue9ruS6i+S7tuWPpeafhFxyXG4gICAgICAgICAqIOWboOS4umZ1bGxjYWxlbmRhci1yZWFjdFdyYXBwZXLnmoTlrp7njrDmmK/nm7TmjqXov5Tlm548ZGl2IGlkPSdmdWxsY2FsZW5kYXInPjwvZGl2PlxyXG4gICAgICAgICAqIOW5tuS4lOiwg+eUqCQoJyNmdWxsY2FsZW5kYXInKS5mdWxsY2FsZW5kYXIodGhpcy5wcm9wcynov5vooYzmnoTlu7rvvIzlm6DmraRSZWFjdOW5tuayoeaciVxyXG4gICAgICAgICAqIOeuoeeQhkZ1bGxDYWxlbmRhcueKtuaAgeWSjOa4suafk+eahOiDveWKm+OAguaJgOS7peebtOaOpeWcqOiuvue9ruS4reWBmuWlvWNhbGxiYWNr77yM6K6p5o+S5Lu26Ieq5oiR566h55CG44CCXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBpZD1cImNhbGVuZGFyLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgPEZ1bGxDYWxlbmRhciBjYWxlbmRhclJlZj17dGhpcy5vbkNhbGVuZGFyUmVuZGVyfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWfuuacrOmFjee9rlxyXG4gICAgICAgICAgICAgICAgICAgIGlkID0gXCJjYWxlbmRhclwiXHJcbiAgICAgICAgICAgICAgICAgICAgdGhlbWVTeXN0ZW0gPSAnc3RhbmRhcmQnXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0ID0gJ3BhcmVudCdcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXIgPSB7e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAncHJldixuZXh0LHRvZGF5JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2VudGVyOiAndGl0bGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodDogJ21vbnRoLGFnZW5kYVdlZWssYWdlbmRhRGF5LGxpc3RXZWVrJ1xyXG4gICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5Lit5paH5YyWXHJcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uVGV4dCA9IHt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvZGF5OiAn5LuK5aSpJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9udGg6ICfmnIgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWVrOiAn5ZGoJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF5OiAn5pelJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdDogJ+ihqCdcclxuICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgIG1vbnRoTmFtZXMgPSB7W1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnMeaciCcsICcy5pyIJywgJzPmnIgnLCAnNOaciCcsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnNeaciCcsICc25pyIJywgJzfmnIgnLCAnOOaciCcsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnOeaciCcsICcxMOaciCcsICcxMeaciCcsICcxMuaciCdcclxuICAgICAgICAgICAgICAgICAgICBdfVxyXG4gICAgICAgICAgICAgICAgICAgIG1vbnRoTmFtZXNTaG9ydCA9IHtbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcx5pyIJywgJzLmnIgnLCAnM+aciCcsICc05pyIJywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc15pyIJywgJzbmnIgnLCAnN+aciCcsICc45pyIJywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc55pyIJywgJzEw5pyIJywgJzEx5pyIJywgJzEy5pyIJ1xyXG4gICAgICAgICAgICAgICAgICAgIF19XHJcbiAgICAgICAgICAgICAgICAgICAgZGF5TmFtZXMgPSB7W1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAn5ZGo5pelJywgJ+WRqOS4gCcsICflkajkuownLCAn5ZGo5LiJJywgJ+WRqOWbmycsICflkajkupQnLCAn5ZGo5YWtJ1xyXG4gICAgICAgICAgICAgICAgICAgIF19XHJcbiAgICAgICAgICAgICAgICAgICAgZGF5TmFtZXNTaG9ydCA9IHtbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICflkajml6UnLCAn5ZGo5LiAJywgJ+WRqOS6jCcsICflkajkuIknLCAn5ZGo5ZubJywgJ+WRqOS6lCcsICflkajlha0nXHJcbiAgICAgICAgICAgICAgICAgICAgXX1cclxuICAgICAgICAgICAgICAgICAgICBhbGxEYXlUZXh0ID0gJ+WFqOWkqSdcclxuICAgICAgICAgICAgICAgICAgICAvLyDorr7nva7op4blm75cclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmlldyA9ICdhZ2VuZGFXZWVrJ1xyXG4gICAgICAgICAgICAgICAgICAgIG5vd0luZGljYXRvciA9IHt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0RGF5ID0gezF9XHJcbiAgICAgICAgICAgICAgICAgICAgdmlld3MgPSB7e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZ2VuZGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pblRpbWU6IFwiMDg6MDA6MDBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsb3RMYWJlbEZvcm1hdDogJ2goOm1tKSBhJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgIG5hdkxpbmtzPSB7dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICBhbGxEYXlEZWZhdWx0ID0ge2ZhbHNlfVxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50TGltaXQ9IHt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOiuvue9ruS6i+S7tlxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGFibGUgPSB7dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RIZWxwZXIgPSB7dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICBlZGl0YWJsZSA9IHt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgIGZvcmNlRXZlbnREdXJhdGlvbiA9IHt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOiuvue9rlVJXHJcbiAgICAgICAgICAgICAgICAgICAgdW5zZWxlY3RDYW5jZWwgPSAnLm1vZGFsIConXHJcbiAgICAgICAgICAgICAgICAgICAgZHJhZ09wYWNpdHkgPSB7e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm1vbnRoXCI6IC41LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFnZW5kYVdlZWtcIjogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhZ2VuZGFEYXlcIjogMVxyXG4gICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6K6+572u5Y+l5p+EXHJcbiAgICAgICAgICAgICAgICAgICAgdmlld1JlbmRlciA9IHt0aGlzLm9uVmlld1JlbmRlcn1cclxuICAgICAgICAgICAgICAgICAgICBldmVudFJlbmRlciA9IHt0aGlzLm9uRXZlbnRSZW5kZXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRDbGljayA9IHt0aGlzLnByb3BzLm9uRXZlbnRDbGlja31cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgJCBmcm9tIFwianF1ZXJ5XCI7XHJcbmltcG9ydCBmdWxsQ2FsZW5kYXIgZnJvbSBcImZ1bGxjYWxlbmRhclwiO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcblxyXG5jbGFzcyBGdWxsY2FsZW5kYXJPYmplY3RNYXBwZXJ7XHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHJcblx0fVxyXG5cclxuXHRnZXRTZXR0aW5ncyhwcm9wZXJ0aWVzKXtcclxuXHRcdGxldCBuZXdTZXR0aW5ncyA9IHt9O1xyXG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gcHJvcGVydGllcykge1xyXG4gICAgICBcdFx0aWYgKHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgIFx0XHRuZXdTZXR0aW5nc1trZXldID0gcHJvcGVydGllc1trZXldO1xyXG4gICAgICBcdFx0fVxyXG4gICAgXHR9XHJcbiAgICBcdHJldHVybiBuZXdTZXR0aW5ncztcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZ1bGxDYWxlbmRhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMuanEgPSAkLm5vQ29uZmxpY3QoKTtcclxuXHRcdHRoaXMuZnVsbGNhbGVuZGFyT2JqZWN0TWFwcGVyID0gbmV3IEZ1bGxjYWxlbmRhck9iamVjdE1hcHBlcigpO1xyXG5cdFx0dGhpcy5yb290ID0gbnVsbDtcclxuXHRcdHRoaXMuaW5zdGFuY2UgPSBudWxsO1xyXG5cdFx0dGhpcy5kYXRlID0gbmV3IERhdGUoKTtcclxuXHR9XHJcblxyXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XHJcblx0XHRjb25zdCBvYmplY3RNYXBwZXJTZXR0aW5ncyA9IHRoaXMuZnVsbGNhbGVuZGFyT2JqZWN0TWFwcGVyLmdldFNldHRpbmdzKHRoaXMucHJvcHMpO1xyXG5cdFx0dGhpcy5pbnN0YW5jZSA9IHRoaXMuanEoYCMke3RoaXMucm9vdH1gKS5mdWxsQ2FsZW5kYXIob2JqZWN0TWFwcGVyU2V0dGluZ3MpO1xyXG5cdH1cclxuXHJcbiAgXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyl7XHJcblx0XHQvKlxyXG4gIFx0XHR0aGlzLmpxKGAjJHt0aGlzLnJvb3R9YCkuZnVsbENhbGVuZGFyKCdkZXN0cm95Jyk7XHJcbiAgXHRcdGNvbnN0IG9iamVjdE1hcHBlclNldHRpbmdzID0gdGhpcy5mdWxsY2FsZW5kYXJPYmplY3RNYXBwZXIuZ2V0U2V0dGluZ3MobmV4dFByb3BzKTtcclxuICAgIFx0dGhpcy5pbnN0YW5jZSA9IHRoaXMuanEoYCMke3RoaXMucm9vdH1gKS5mdWxsQ2FsZW5kYXIob2JqZWN0TWFwcGVyU2V0dGluZ3MpO1xyXG5cdFx0Ki9cclxuXHR9XHJcblxyXG5cdHJlbmRlcigpe1xyXG5cdFx0dGhpcy5yb290ID0gdGhpcy5wcm9wcy5pZCB8fCAnSUQnICsgdGhpcy5kYXRlLmdldFRpbWUoKTsgXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGlkPXt0aGlzLnJvb3R9IHJlZj17dGhpcy5wcm9wcy5jYWxlbmRhclJlZn0+PC9kaXY+XHJcblx0XHQpXHJcblx0fVxyXG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vRXZlbnRQb3BvdmVyLmNzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9FdmVudFBvcG92ZXIuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9FdmVudFBvcG92ZXIuY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCAnLi9FdmVudFBvcG92ZXIuY3NzJztcclxuaW1wb3J0IFBvcHBlciBmcm9tICdwb3BwZXIuanMnO1xyXG5pbXBvcnQgRXZlbnRUaXRsZUlucHV0IGZyb20gJy4vRXZlbnRUaXRsZUlucHV0JztcclxuaW1wb3J0IEV2ZW50U2ltcGxlRm9ybSBmcm9tICcuL0V2ZW50U2ltcGxlRm9ybSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudFBvcG92ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5wb3BwZXJOb2RlID0gbnVsbDtcclxuICAgICAgICB0aGlzLnBvcHBlckluc3RhbmNlID0gbnVsbDtcclxuICAgICAgICAvLyDnu5Hlrprkuovku7ZcclxuICAgICAgICB0aGlzLmF1dG9IaWRlID0gdGhpcy5hdXRvSGlkZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlVGl0bGVDaGFuZ2UgPSB0aGlzLmhhbmRsZVRpdGxlQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgYXV0b0hpZGUoZSkge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgLy8g5LiN5piv5pel5Y6G5LqL5Lu25YWD57SgXHJcbiAgICAgICAgICAgICEkKHRoaXMucHJvcHMucmVmZXJlbmNlKS5pcyhlLnRhcmdldCkgJiZcclxuICAgICAgICAgICAgLy8g5Lmf5LiN5piv5a2Q5YWD57SgXHJcbiAgICAgICAgICAgICQodGhpcy5wcm9wcy5yZWZlcmVuY2UpLmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwICYmXHJcbiAgICAgICAgICAgIC8vIOS4jeaYr3BvcHBlcuWFg+e0oFxyXG4gICAgICAgICAgICAgICAgISQodGhpcy5wb3BwZXJOb2RlKS5pcyhlLnRhcmdldCkgJiZcclxuICAgICAgICAgICAgLy8g5Lmf5LiN5piv5a2Q5YWD57SgXHJcbiAgICAgICAgICAgICQodGhpcy5wb3BwZXJOb2RlKS5oYXMoZS50YXJnZXQpLmxlbmd0aCA9PT0gMFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZSgpIHtcclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcclxuICAgICAgICAgICAgJCh0aGF0LnBvcHBlck5vZGUpLmhpZGUoMCwgbnVsbCwgcmVzb2x2ZSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzaG93KCkge1xyXG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xyXG4gICAgICAgICAgICAkKHRoYXQucG9wcGVyTm9kZSkuZmFkZUluKDM1MCwgbnVsbCwgcmVzb2x2ZSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVUaXRsZUNoYW5nZSgpIHtcclxuICAgICAgICAvL1RPRE86IOWkhOeQhuS6i+S7tuagh+mimOWPmOabtO+8jOW5tuWCqOWtmOaVsOaNrlxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIC8vIOWIneWni+WMlue7hOS7tlxyXG4gICAgICAgIHRoaXMucG9wcGVySW5zdGFuY2UgPSBuZXcgUG9wcGVyKHRoaXMucHJvcHMucmVmZXJlbmNlLCB0aGlzLnBvcHBlck5vZGUsIHtcclxuXHRcdFx0cGxhY2VtZW50OiAnYXV0bycsXHJcblx0XHRcdG1vZGlmaWVyczoge1xyXG5cdFx0XHRcdGFycm93OiB7XHJcblx0XHRcdFx0ICBlbGVtZW50OiAnLmFycm93J1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdH0pO1xyXG4gICAgICAgIC8vIOiuvue9ruiHquWKqOmakOiXj1xyXG4gICAgICAgICQoZG9jdW1lbnQpLm9mZignY2xpY2snLCB0aGlzLmF1dG9IaWRlKS5vbignY2xpY2snLCB0aGlzLmF1dG9IaWRlKTtcclxuICAgICAgICAvLyDmmL7npLpcclxuICAgICAgICB0aGlzLnNob3coKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xyXG4gICAgICAgIC8vIOabtOaWsOWumuS9jVxyXG4gICAgICAgIHRoaXMuaGlkZSgpLnRoZW4oIChyZXQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wb3BwZXJJbnN0YW5jZS5yZWZlcmVuY2UgPSBuZXh0UHJvcHMucmVmZXJlbmNlO1xyXG4gICAgICAgICAgICB0aGlzLnBvcHBlckluc3RhbmNlLnVwZGF0ZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5zaG93KCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSwgc25hcHNob3QpIHtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRjLXBvcG92ZXJcIiByb2xlPVwidG9vbHRpcFwiIFxyXG4gICAgICAgICAgICAgICAgICAgIHJlZj17KGRpdikgPT4gdGhpcy5wb3BwZXJOb2RlID0gZGl2fSBzdHlsZT17e2Rpc3BsYXk6ICdub25lJ319PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhcnJvd1wiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0Yy1wb3BvdmVyLWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxFdmVudFRpdGxlSW5wdXQgdGl0bGU9e3RoaXMucHJvcHMuZXZlbnQudGl0bGV9IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvblRpdGxlQ2hhbmdlPXt0aGlzLmhhbmRsZVRpdGxlQ2hhbmdlfSAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRjLXBvcG92ZXItYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxFdmVudFNpbXBsZUZvcm0gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50U3RhcnQ9e3RoaXMucHJvcHMuZXZlbnQuc3RhcnR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yVmFsdWU9e3RoaXMucHJvcHMuZXZlbnQuYmFja2dyb3VuZENvbG9yfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgeyBGb3JtLCBHbHlwaGljb24gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5pbXBvcnQgRGF0ZVRpbWVQaWNrZXIgZnJvbSAnLi4vRm9ybS9EYXRlVGltZVBpY2tlcic7XHJcbmltcG9ydCBDb2xvclBpY2tlciBmcm9tICcuLi9Gb3JtL0NvbG9yUGlja2VyJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50U2ltcGxlRm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2UgPSB0aGlzLmhhbmRsZUlucHV0Q2hhbmdlLmJpbmQodGhpcyk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUlucHV0Q2hhbmdlKCkge1xyXG4gICAgICAgIC8vVE9ETzog5aSE55CG5pWw5o2u6L656LefXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxGb3JtIGhvcml6b250YWw+XHJcbiAgICAgICAgICAgICAgICA8RGF0ZVRpbWVQaWNrZXIgcmVhZE9ubHkgaWQgPSAndGMtZWRpdHBvcHBlci1ldmVudGRhdGUnIFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsPXs8aSBjbGFzc05hbWU9J2ZhciBmYS1jYWxlbmRhci1hbHQgZmEtbGcnIC8+fVxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLmV2ZW50U3RhcnQuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgb25JbnB1dENoYW5nZT17dGhpcy5oYW5kbGVJbnB1dENoYW5nZX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8Q29sb3JQaWNrZXIgaWQgPSAndGMtZWRpdHBvcHBlci1ldmVudGNvbG9yJyBcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbD17PGkgY2xhc3NOYW1lPSdmYXMgZmEtcGFpbnQtYnJ1c2ggZmEtbGcnIC8+fVxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLmNvbG9yVmFsdWV9XHJcbiAgICAgICAgICAgICAgICAgICAgb25JbnB1dENoYW5nZT17dGhpcy5oYW5kbGVJbnB1dENoYW5nZX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvRm9ybT5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vRXZlbnRUaXRsZUlucHV0LmNzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9FdmVudFRpdGxlSW5wdXQuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9FdmVudFRpdGxlSW5wdXQuY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICcuL0V2ZW50VGl0bGVJbnB1dC5jc3MnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRUaXRsZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGlucHV0IHR5cGUgPSBcInRleHRcIiBpZCA9IFwidGMtZWRpdHBvcHBlci1ldmVudHRpdGxlXCIgXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSAnZXZlbnR0aXRsZSdcclxuICAgICAgICAgICAgICAgIHZhbHVlID0ge3RoaXMucHJvcHMudGl0bGV9IFxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2UgPSB7dGhpcy5wcm9wcy5vblRpdGxlQ2hhbmdlfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IHsgRm9ybUdyb3VwLCBDb250cm9sTGFiZWwsIENvbCwgRm9ybUNvbnRyb2wgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5jb25zdCBIdWViZWUgPSByZXF1aXJlKCdodWViZWUvZGlzdC9odWViZWUucGtnZCcpOyBcclxuaW1wb3J0ICdodWViZWUvZGlzdC9odWViZWUuY3NzJztcclxuXHJcbi8vIOmHjeWGmeaWueazleS7peinpuWPkWNoYW5nZeS6i+S7tlxyXG5IdWViZWUucHJvdG90eXBlLnNldFRleHRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAoICF0aGlzLnNldFRleHRFbGVtcyApIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBmb3IgKCB2YXIgaT0wOyBpIDwgdGhpcy5zZXRUZXh0RWxlbXMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgdmFyIGVsZW0gPSB0aGlzLnNldFRleHRFbGVtc1tpXTtcclxuICAgICAgICB2YXIgcHJvcGVydHkgPSBlbGVtLm5vZGVOYW1lID09ICdJTlBVVCcgPyAndmFsdWUnIDogJ3RleHRDb250ZW50JztcclxuICAgICAgICAvLyDop6blj5FjaGFuZ2Xkuovku7ZcclxuICAgICAgICBpZiAoIGVsZW0udmFsdWUgIT0gdGhpcy5jb2xvciApIHtcclxuICAgICAgICAgICAgZWxlbVsgcHJvcGVydHkgXSA9IHRoaXMuY29sb3I7XHJcbiAgICAgICAgICAgIGVsZW0uZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2NoYW5nZScpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xvclBpY2tlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICAvLyDliJ3lp4vljJbnu4Tku7ZcclxuICAgICAgICB0aGlzLmlucHV0ID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5pbnB1dEZvcm1Db250cm9sKTtcclxuICAgICAgICB0aGlzLmh1ZWJlZUluc3RhbmNlID0gbmV3IEh1ZWJlZSh0aGlzLmlucHV0LCB7XHJcbiAgICAgICAgICAgIHN0YXRpY09wZW46IGZhbHNlLCAvLyBEaXNwbGF5cyBvcGVuIGFuZCBzdGF5cyBvcGVuLiBcclxuICAgICAgICAgICAgc2V0VGV4dDogdHJ1ZSwgLy8gU2V0cyBlbGVtZW50c+KAmSB0ZXh0IHRvIGNvbG9yLiDlsIbljp/lp4vnmoTmlofmnKzorr7nva7orr7nva7miJDpopzoibLlgLwuXHJcbiAgICAgICAgICAgIHNldEJHQ29sb3I6IHRydWUsIC8vIFNldHMgZWxlbWVudHPigJkgYmFja2dyb3VuZCBjb2xvciB0byBjb2xvci5cclxuICAgICAgICAgICAgaHVlczogMTIsIC8vIE51bWJlciBvZiBodWVzIG9mIHRoZSBjb2xvciBncmlkLiBIdWVzIGFyZSBzbGljZXMgb2YgdGhlIGNvbG9yIHdoZWVsLlxyXG4gICAgICAgICAgICBodWUwOiAwLCAvLyBUaGUgZmlyc3QgaHVlIG9mIHRoZSBjb2xvciBncmlkLiBcclxuICAgICAgICAgICAgc2hhZGVzOiA1LCAvLyBOdW1iZXIgb2Ygc2hhZGVzIG9mIGNvbG9ycyBhbmQgc2hhZGVzIG9mIGdyYXkgYmV0d2VlbiB3aGl0ZSBhbmQgYmxhY2suIFxyXG4gICAgICAgICAgICBzYXR1cmF0aW9uczogMiwgLy8gTnVtYmVyIG9mIHNldHMgb2Ygc2F0dXJhdGlvbiBvZiB0aGUgY29sb3IgZ3JpZC5cclxuICAgICAgICAgICAgbm90YXRpb246ICdoZXgnLCAvLyBUZXh0IHN5bnRheCBvZiBjb2xvcnMgdmFsdWVzLlxyXG4gICAgICAgICAgICBjbGFzc05hbWU6IG51bGwsIC8vIENsYXNzIGFkZGVkIHRvIEh1ZWJlZSBlbGVtZW50LiBVc2VmdWwgZm9yIENTUy5cclxuICAgICAgICAgICAgY3VzdG9tQ29sb3JzOiBbIFxyXG4gICAgICAgICAgICAgICAgJyMzMkNEMzInLCAnIzU0ODRFRCcsICcjQTRCREZFJywgXHJcbiAgICAgICAgICAgICAgICAnIzQ2RDZEQicsICcjN0FFN0JGJywgJyM1MUI3NDknLFxyXG4gICAgICAgICAgICAgICAgJyNGQkQ3NUInLCAnI0ZGQjg3OCcsICcjRkY4ODdDJywgXHJcbiAgICAgICAgICAgICAgICAnI0RDMjEyNycsICcjREJBREZGJywgJyNFMUUxRTEnXHRcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICAvL1RPRE86IOivu+WPlueItuWFg+e0oGhvcml6b250YWzlsZ7mgKfvvIzlhrPlrprmnaHku7bmuLLmn5NcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8Rm9ybUdyb3VwIGNvbnRyb2xJZD17dGhpcy5wcm9wcy5pZH0+XHJcbiAgICAgICAgICAgICAgICA8Q29sIGNvbXBvbmVudENsYXNzPXtDb250cm9sTGFiZWx9IHNtPXsyfT5cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJlbH1cclxuICAgICAgICAgICAgICAgIDwvQ29sPlxyXG4gICAgICAgICAgICAgICAgPENvbCBzbT17MTB9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbCB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17KGluc3RhbmNlKSA9PiB0aGlzLmlucHV0Rm9ybUNvbnRyb2wgPSBpbnN0YW5jZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMudmFsdWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXt0aGlzLnByb3BzLnJlYWRPbmx5fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5wcm9wcy5vbklucHV0Q2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L0NvbD5cclxuICAgICAgICAgICAgPC9Gb3JtR3JvdXA+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCwgQ29udHJvbExhYmVsLCBDb2wsIEZvcm1Db250cm9sIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcclxuaW1wb3J0ICdtb21lbnQnO1xyXG5pbXBvcnQgJ2Jvb3RzdHJhcC9qcy9jb2xsYXBzZSc7XHJcbmltcG9ydCAnYm9vdHN0cmFwL2pzL3RyYW5zaXRpb24nO1xyXG5pbXBvcnQgJ2VvbmFzZGFuLWJvb3RzdHJhcC1kYXRldGltZXBpY2tlcic7XHJcbmltcG9ydCAnZW9uYXNkYW4tYm9vdHN0cmFwLWRhdGV0aW1lcGlja2VyL2J1aWxkL2Nzcy9ib290c3RyYXAtZGF0ZXRpbWVwaWNrZXIuY3NzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGVUaW1lUGlja2VyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIC8vIOWIneWni+WMlue7hOS7tlxyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLmlucHV0Rm9ybUNvbnRyb2wpO1xyXG4gICAgICAgICQodGhpcy5pbnB1dCkuZGF0ZXRpbWVwaWNrZXIoe1xyXG4gICAgICAgICAgICBmb3JtYXQ6ICdZWVlZLU1NLUREIEhIOm1tOnNzJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICAvL1RPRE86IOivu+WPlueItuWFg+e0oGhvcml6b250YWzlsZ7mgKfvvIzlhrPlrprmnaHku7bmuLLmn5NcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8Rm9ybUdyb3VwIGNvbnRyb2xJZD17dGhpcy5wcm9wcy5pZH0+XHJcbiAgICAgICAgICAgICAgICA8Q29sIGNvbXBvbmVudENsYXNzPXtDb250cm9sTGFiZWx9IHNtPXsyfT5cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJlbH1cclxuICAgICAgICAgICAgICAgIDwvQ29sPlxyXG4gICAgICAgICAgICAgICAgPENvbCBzbT17MTB9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbCB0eXBlPVwidGV4dFwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWY9eyhpbnN0YW5jZSkgPT4gdGhpcy5pbnB1dEZvcm1Db250cm9sID0gaW5zdGFuY2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLnZhbHVlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seT17dGhpcy5wcm9wcy5yZWFkT25seX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMucHJvcHMub25JbnB1dENoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPC9Db2w+XHJcbiAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxyXG4gICAgICAgIClcclxuICAgIH1cclxufSIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL2luZGV4LmNzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9pbmRleC5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL2luZGV4LmNzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgJ2Z1bGxjYWxlbmRhci1yZWFjdHdyYXBwZXIvZGlzdC9jc3MvZnVsbGNhbGVuZGFyLm1pbi5jc3MnXHJcbmltcG9ydCAnYm9vdHN0cmFwL2Rpc3QvY3NzL2Jvb3RzdHJhcC5jc3MnO1xyXG5pbXBvcnQgJ2Jvb3RzdHJhcC9kaXN0L2Nzcy9ib290c3RyYXAtdGhlbWUuY3NzJztcclxuaW1wb3J0ICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtZnJlZS9jc3MvYWxsLmNzcydcclxuaW1wb3J0IEFwcCBmcm9tICcuL0FwcCc7XHJcbmltcG9ydCAnLi9pbmRleC5jc3MnO1xyXG5cclxuUmVhY3RET00ucmVuZGVyKDxBcHAgLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JykpO1xyXG5cclxuLypcclxuJChmdW5jdGlvbigpe1xyXG4gICAgLy8g5a6a5LmJ5Y+Y6YePXHJcblx0Y29uc3QgZGF0YUxvYWRlciA9IG5ldyBXaXpFdmVudERhdGFMb2FkZXIoKTtcclxuXHRsZXQgZ19lZGl0UG9wcGVyLCBnX2NyZWF0ZU1vZGFsLCBnX2VkaXRNb2RhbDtcclxuXHJcbiAgICBjb25zdCBjYWxlbmRhciA9ICQoJyNjYWxlbmRhcicpLmZ1bGxDYWxlbmRhcih7XHJcblx0XHR0aGVtZVN5c3RlbTogJ3N0YW5kYXJkJyxcclxuXHRcdGhlaWdodDogJ3BhcmVudCcsXHJcblx0XHRoZWFkZXI6IHtcclxuXHRcdFx0bGVmdDogJ3ByZXYsbmV4dCx0b2RheScsXHJcblx0XHRcdGNlbnRlcjogJ3RpdGxlJyxcclxuXHRcdFx0cmlnaHQ6ICdtb250aCxhZ2VuZGFXZWVrLGFnZW5kYURheSxsaXN0V2VlaydcclxuXHRcdH0sXHJcblx0XHR2aWV3czoge1xyXG5cdFx0XHRtb250aDoge1xyXG5cdFx0XHRcdC8vdGl0bGVGb3JtYXQ6IGdfbG9jX3RpdGxlZm9ybWF0X21vbnRoLCAvL3ZhciBnX2xvY190aXRsZWZvcm1hdF9tb250aCA9IFwiTU1NTSB5eXl5XCI7XHJcblx0XHRcdH0sXHJcblx0XHRcdGFnZW5kYToge1xyXG5cdFx0XHRcdG1pblRpbWU6IFwiMDg6MDA6MDBcIixcclxuXHRcdFx0XHRzbG90TGFiZWxGb3JtYXQ6ICdoKDptbSkgYSdcclxuXHRcdFx0fSxcclxuXHRcdFx0bGlzdFdlZWs6IHtcclxuXHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRuYXZMaW5rczogdHJ1ZSxcclxuXHRcdGFsbERheURlZmF1bHQ6IGZhbHNlLFxyXG5cdFx0ZGVmYXVsdFZpZXc6ICdhZ2VuZGFXZWVrJyxcclxuXHRcdGV2ZW50TGltaXQ6IHRydWUsXHJcblx0XHRidXR0b25UZXh0OiB7XHJcblx0XHRcdHRvZGF5OiAn5LuK5aSpJyxcclxuXHRcdFx0bW9udGg6ICfmnIgnLFxyXG5cdFx0XHR3ZWVrOiAn5ZGoJyxcclxuXHRcdFx0ZGF5OiAn5pelJyxcclxuXHRcdFx0bGlzdDogJ+ihqCdcclxuICAgICAgICB9LFxyXG5cdFx0bW9udGhOYW1lczogW1xyXG4gICAgICAgICAgICAnMeaciCcsICcy5pyIJywgJzPmnIgnLCAnNOaciCcsIFxyXG4gICAgICAgICAgICAnNeaciCcsICc25pyIJywgJzfmnIgnLCAnOOaciCcsIFxyXG4gICAgICAgICAgICAnOeaciCcsICcxMOaciCcsICcxMeaciCcsICcxMuaciCdcclxuICAgICAgICBdLFxyXG5cdFx0bW9udGhOYW1lc1Nob3J0OiBbXHJcbiAgICAgICAgICAgICcx5pyIJywgJzLmnIgnLCAnM+aciCcsICc05pyIJywgXHJcbiAgICAgICAgICAgICc15pyIJywgJzbmnIgnLCAnN+aciCcsICc45pyIJywgXHJcbiAgICAgICAgICAgICc55pyIJywgJzEw5pyIJywgJzEx5pyIJywgJzEy5pyIJ1xyXG4gICAgICAgIF0sXHJcblx0XHRkYXlOYW1lczogW1xyXG4gICAgICAgICAgICAn5ZGo5pelJywgJ+WRqOS4gCcsICflkajkuownLCAn5ZGo5LiJJywgJ+WRqOWbmycsICflkajkupQnLCAn5ZGo5YWtJ1xyXG4gICAgICAgIF0sXHJcblx0XHRkYXlOYW1lc1Nob3J0OiBbXHJcbiAgICAgICAgICAgICflkajml6UnLCAn5ZGo5LiAJywgJ+WRqOS6jCcsICflkajkuIknLCAn5ZGo5ZubJywgJ+WRqOS6lCcsICflkajlha0nXHJcbiAgICAgICAgXSxcclxuXHRcdHNlbGVjdGFibGU6IHRydWUsXHJcblx0XHRzZWxlY3RIZWxwZXI6IHRydWUsXHJcblx0XHR1bnNlbGVjdENhbmNlbDogJy5tb2RhbCAqJyxcclxuXHRcdGFsbERheVRleHQ6ICflhajlpKknLFxyXG5cdFx0bm93SW5kaWNhdG9yOiB0cnVlLFxyXG5cdFx0Zm9yY2VFdmVudER1cmF0aW9uOiB0cnVlLFxyXG5cdFx0Zmlyc3REYXk6IDEsIC8vIOesrOS4gOWkqeaYr+WRqOS4gOi/mOaYr+WRqOWkqe+8jOS4jmRhdGVwaWNrZXLlv4Xpobvnm7jlkIxcclxuXHRcdGRyYWdPcGFjaXR5OiB7XHJcblx0XHRcdFwibW9udGhcIjogLjUsXHJcblx0XHRcdFwiYWdlbmRhV2Vla1wiOiAxLFxyXG5cdFx0XHRcImFnZW5kYURheVwiOiAxXHJcblx0XHR9LFxyXG5cdFx0ZWRpdGFibGU6IHRydWUsXHJcblxyXG5cdFx0Ly8g5Yi35paw6KeG5Zu+77yM6YeN5paw6I635Y+W5pel5Y6G5LqL5Lu2XHJcblx0XHR2aWV3UmVuZGVyOiBmdW5jdGlvbiggdmlldywgZWxlbWVudCApIHtcclxuXHRcdFx0Ly9UT0RPOiDmhJ/op4nov5nmoLfpgKDmiJDmgKfog73kuIrnmoTmjZ/lpLHvvIzmmK/lkKbmnInmm7Tlpb3nmoTmlrnms5XvvJ9cclxuXHRcdFx0Y29uc3QgY2FsZW5kYXIgPSAkKCcjY2FsZW5kYXInKTtcclxuXHRcdFx0Y29uc3QgZXZlbnRTb3VyY2VzID0gZGF0YUxvYWRlci5nZXRFdmVudFNvdXJjZXMoIHZpZXcsIGVsZW1lbnQgKTtcclxuXHRcdFx0Y2FsZW5kYXIuZnVsbENhbGVuZGFyKCdyZW1vdmVFdmVudHMnKTtcclxuXHRcdFx0Zm9yIChsZXQgaT0wIDsgaSA8IGV2ZW50U291cmNlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGNhbGVuZGFyLmZ1bGxDYWxlbmRhcignYWRkRXZlbnRTb3VyY2UnLCBldmVudFNvdXJjZXNbaV0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0fSxcclxuXHJcblx0XHQvLyDpgInmi6nliqjkvZzop6blj5HnmoTkuovku7blj6Xmn4TvvIzlrprkuYnkuobkuIDkuKpjYWxsYmFja1xyXG5cdFx0c2VsZWN0OiBmdW5jdGlvbihzdGFydCwgZW5kLCBqc0V2ZW50LCB2aWV3KXtcclxuXHRcdFx0Ly8g5by55Ye64oCc5Yib5bu65pel5Y6G5LqL5Lu24oCd56qX5Y+jXHJcblx0XHRcdC8vIOWIpOaWreaYr+WQpua4suafk1xyXG5cdFx0XHQvL1RPRE86IOaDs+WKnuazleS4jeimgeeUqOWFqOWxgOWPmOmHj1xyXG5cdFx0XHRpZiAoICF3aW5kb3cuZ19jcmVhdGVNb2RhbCApIG5ldyBFdmVudENyZWF0ZU1vZGFsKHtzdGFydCwgZW5kLCBqc0V2ZW50LCB2aWV3fSk7XHJcblx0XHRcdC8vIOS8oOmAkuWPguaVsFxyXG5cdFx0XHR3aW5kb3cuZ19jcmVhdGVNb2RhbC51cGRhdGUoe3N0YXJ0LCBlbmQsIGpzRXZlbnQsIHZpZXd9KTtcclxuXHRcdFx0d2luZG93LmdfY3JlYXRlTW9kYWwuc2hvdygpO1xyXG5cdFx0fSxcclxuXHJcblx0XHRldmVudERyYWdTdGFydDogZnVuY3Rpb24oIGV2ZW50LCBqc0V2ZW50LCB1aSwgdmlldyApIHsgfSxcclxuXHRcdGV2ZW50RHJhZ1N0b3A6IGZ1bmN0aW9uKCBldmVudCwganNFdmVudCwgdWksIHZpZXcgKSB7IH0sXHJcblxyXG5cdFx0Ly8g5pel5Y6G5LqL5Lu25ouW5YqoIGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXdcclxuXHRcdGV2ZW50RHJvcDogZnVuY3Rpb24oZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldyl7XHJcblx0XHRcdGlmIChldmVudC5pZCl7XHJcblx0XHRcdFx0ZGF0YUxvYWRlci51cGRhdGVFdmVudERhdGFPbkRyb3AoZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldylcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXZlcnRGdW5jKCk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8g5pel5Y6G5LqL5Lu25pel5pyf6IyD5Zu06YeN572uXHJcblx0XHRldmVudFJlc2l6ZTogZnVuY3Rpb24oZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldyl7XHJcblx0XHRcdGlmIChldmVudC5pZCl7XHJcblx0XHRcdFx0ZGF0YUxvYWRlci51cGRhdGVFdmVudERhdGFPblJlc2l6ZShldmVudCwgZGVsdGEsIHJldmVydEZ1bmMsIGpzRXZlbnQsIHVpLCB2aWV3KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXZlcnRGdW5jKCk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblxyXG5cdFx0ZXZlbnRSZW5kZXI6IGZ1bmN0aW9uKGV2ZW50T2JqLCAkZWwpIHtcclxuXHRcdFx0Ly8g5YWD57Sg5bey57uP5riy5p+T77yM5Y+v5L+u5pS55YWD57SgXHJcblx0XHRcdGNvbnN0IGlzQ29tcGxldGUgPSBwYXJzZUludChldmVudE9iai5jb21wbGV0ZSkgPT0gNTtcclxuXHRcdFx0aWYgKCBpc0NvbXBsZXRlICkge1xyXG5cdFx0XHRcdC8vIOagt+W8j1xyXG5cdFx0XHRcdCRlbC5hZGRDbGFzcygndGMtY29tcGxldGUnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8g5pel5Y6G5LqL5Lu254K55Ye75ZCO5LqL5Lu25Y+l5p+EXHJcblx0XHRldmVudENsaWNrOiBmdW5jdGlvbiggZXZlbnQsIGpzRXZlbnQsIHZpZXcgKSB7XHJcblx0XHRcdC8vIHRoaXMg5oyH5ZCR5YyF6KO55LqL5Lu255qEPGE+5YWD57SgXHJcblxyXG5cdFx0XHQvLyDliKTmlq3mmK/lkKblt7Lnu4/muLLmn5PlvLnnqpdcclxuXHRcdFx0aWYgKCAhZ19lZGl0UG9wcGVyICkge1xyXG5cdFx0XHRcdGdfZWRpdFBvcHBlciA9IHJlbmRlckVkaXRQb3BwZXIoe1xyXG5cdFx0XHRcdFx0J2V2ZW50JzogZXZlbnQsXHJcblx0XHRcdFx0XHQnanNFdmVudCc6IGpzRXZlbnQsXHJcblx0XHRcdFx0XHQndmlldyc6IHZpZXdcclxuXHRcdFx0XHR9LCB0aGlzKS5FdmVudFBvcG92ZXIoJ3Nob3cnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyDmm7TmlrByZWZlcmVuY2VcclxuXHRcdFx0XHRnX2VkaXRQb3BwZXIuRXZlbnRQb3BvdmVyKCdvcHRpb24nLCB7XHJcblx0XHRcdFx0XHRhcmdzOiB7XHJcblx0XHRcdFx0XHRcdCdldmVudCc6IGV2ZW50LFxyXG5cdFx0XHRcdFx0XHQnanNFdmVudCc6IGpzRXZlbnQsXHJcblx0XHRcdFx0XHRcdCd2aWV3Jzogdmlld1xyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHRpdGxlOiBldmVudC50aXRsZSxcclxuXHRcdFx0XHRcdHJlZmVyZW5jZTogdGhpc1xyXG5cdFx0XHRcdH0pLkV2ZW50UG9wb3ZlcigndXBkYXRlJykuRXZlbnRQb3BvdmVyKCdzaG93Jyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblx0XHRcclxuXHR9KVxyXG59KVxyXG4qLyIsImltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuaW1wb3J0ICdmdWxsY2FsZW5kYXInO1xyXG5pbXBvcnQgeyBXaXpEYXRhYmFzZSBhcyBnX2RiLCBXaXpDb21tb25VSSBhcyBnX2Ntbn0gZnJvbSAnLi4vdXRpbHMvV2l6SW50ZXJmYWNlJztcclxuaW1wb3J0IENvbmZpZyBmcm9tICcuLi91dGlscy9Db25maWcnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FsZW5kYXJFdmVudCB7XHJcblx0LyoqXHJcbiAgICAgKiDliJvlu7rkuIDkuKrpgJrnlKjml6XnqIsuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IGRhdGEg5Y6f5aeL5pWw5o2u57G75Z6L77yM5Y+v5Lul5pivIFdpekV2ZW50LCBGdWxsQ2FsZW5kYXJFdmVudCDku6Xlj4ogR1VJRC5cclxuICAgICAqL1xyXG5cdGNvbnN0cnVjdG9yKCBkYXRhLCBjYWxlbmRhciApIHtcclxuXHRcdGlmICghZ19kYikgdGhyb3cgbmV3IEVycm9yKCdJV2l6RGF0YWJhc2UgaXMgbm90IHZhbGlkLicpO1xyXG5cdFx0dGhpcy4kY2FsZW5kYXIgPSAkKGNhbGVuZGFyKTtcclxuXHRcdGNvbnN0IHR5cGUgPSB0aGlzLl9jaGVja0RhdGFUeXBlKGRhdGEpO1xyXG5cdFx0c3dpdGNoICggdHlwZSApIHtcclxuXHRcdFx0Y2FzZSBcIldpekV2ZW50XCI6XHJcblx0XHRcdGNhc2UgXCJGdWxsQ2FsZW5kYXJFdmVudFwiOlxyXG5cdFx0XHRcdHRoaXMuX2NyZWF0ZShkYXRhLCB0eXBlKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBcIkdVSURcIjpcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0Ly9UT0RPOiDojrflvpdXaXpFdmVudOaVsOaNru+8jOW5tuWIm+W7uuWvueixoVxyXG5cdFx0XHRcdFx0Y29uc3QgZG9jID0gZ19kYi5Eb2N1bWVudEZyb21HVUlEKGRhdGEpO1xyXG5cdFx0XHRcdFx0Y29uc3QgbmV3RXZlbnREYXRhID0ge1xyXG5cdFx0XHRcdFx0XHRcIkNBTEVOREFSX0VORFwiIDogZG9jLkdldFBhcmFtVmFsdWUoJ0NBTEVOREFSX0VORCcpLFxyXG5cdFx0XHRcdFx0XHRcIkNBTEVOREFSX0lORk9cIiA6IGRvYy5HZXRQYXJhbVZhbHVlKCdDQUxFTkRBUl9JTkZPJyksXHJcblx0XHRcdFx0XHRcdFwiQ0FMRU5EQVJfRVhUUkFJTkZPXCIgOiBkb2MuR2V0UGFyYW1WYWx1ZSgnQ0FMRU5EQVJfRVhUUkFJTkZPJyksXHJcblx0XHRcdFx0XHRcdFwiQ0FMRU5EQVJfU1RBUlRcIiA6IGRvYy5HZXRQYXJhbVZhbHVlKCdDQUxFTkRBUl9TVEFSVCcpLFxyXG5cdFx0XHRcdFx0XHRcIkNBTEVOREFSX1JFQ1VSUkVOQ0VcIiA6IGRvYy5HZXRQYXJhbVZhbHVlKCdDQUxFTkRBUl9SRUNVUlJFTkNFJyksXHJcblx0XHRcdFx0XHRcdFwiQ0FMRU5EQVJfRU5EUkVDVVJSRU5DRVwiIDogZG9jLkdldFBhcmFtVmFsdWUoJ0NBTEVOREFSX0VORFJFQ1VSUkVOQ0UnKSxcclxuXHRcdFx0XHRcdFx0XCJjcmVhdGVkXCIgOiBtb21lbnQoZG9jLkRhdGVDcmVhdGVkKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKSxcclxuXHRcdFx0XHRcdFx0XCJndWlkXCIgOiBkb2MuR1VJRCxcclxuXHRcdFx0XHRcdFx0XCJ0aXRsZVwiIDogZG9jLlRpdGxlLFxyXG5cdFx0XHRcdFx0XHRcInVwZGF0ZWRcIiA6IG1vbWVudChkb2MuRGF0ZU1vZGlmaWVkKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0dGhpcy5fY3JlYXRlKG5ld0V2ZW50RGF0YSwgJ1dpekV2ZW50Jyk7XHJcblx0XHRcdFx0fSBjYXRjaCAoZSkgeyBjb25zb2xlLmVycm9yKGUpOyB9XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0X2NyZWF0ZShkYXRhLCB0eXBlKSB7XHJcblx0XHRsZXQgc3RhcnQsIGVuZCwgaWQsIGJrQ29sb3IsIGFsbERheSwgY29tcGxldGUsIGRhdGVDb21wbGV0ZWQsIHJwdFJ1bGUsIHJwdEVuZDtcclxuXHRcdHN3aXRjaCAodHlwZSkge1xyXG5cdFx0XHRjYXNlIFwiR1VJRFwiOlxyXG5cdFx0XHRjYXNlIFwiV2l6RXZlbnRcIjpcclxuXHRcdFx0XHR0aGlzLl9JbmZvID0gdGhpcy5fcGFyc2VJbmZvKGRhdGEuQ0FMRU5EQVJfSU5GTyk7XHJcblx0XHRcdFx0dGhpcy5fRXh0cmFJbmZvID0gZGF0YS5DQUxFTkRBUl9FWFRSQUlORk8gPyB0aGlzLl9wYXJzZUluZm8oZGF0YS5DQUxFTkRBUl9FWFRSQUlORk8pIDogdGhpcy5fZ2V0RGVmYXVsdEV4dHJhSW5mbygpO1xyXG5cdFx0XHRcdC8vIOe7n+S4gOWPmOmHj1xyXG5cdFx0XHRcdGlkID0gZGF0YS5ndWlkO1xyXG5cdFx0XHRcdHN0YXJ0ID0gZGF0YS5DQUxFTkRBUl9TVEFSVDtcclxuXHRcdFx0XHRlbmQgPSBkYXRhLkNBTEVOREFSX0VORDtcclxuXHRcdFx0XHQvLyDliKTmlq3mmK/lkKbnlKjmiLfoh6rlrprkuYnog4zmma/oibLvvIzlkJHkuIvlhbzlrrnljp/niYjml6XljoZcclxuXHRcdFx0XHRia0NvbG9yID0gdGhpcy5fSW5mby5jaSA/ICggcGFyc2VJbnQodGhpcy5fSW5mby5jaSkgPT0gMCA/IHRoaXMuX0luZm8uYiA6IENvbmZpZy5jb2xvckl0ZW1zW3RoaXMuX0luZm8uY2ldLmNvbG9yVmFsdWUgKSA6IHRoaXMuX0luZm8uYjtcclxuXHRcdFx0XHRhbGxEYXkgPSBkYXRhLkNBTEVOREFSX0VORC5pbmRleE9mKFwiMjM6NTk6NTlcIikgIT0gLTEgPyB0cnVlIDogZmFsc2U7XHJcblx0XHRcdFx0Y29tcGxldGUgPSB0aGlzLl9FeHRyYUluZm8uQ29tcGxldGU7XHJcblx0XHRcdFx0ZGF0ZUNvbXBsZXRlZCA9IHRoaXMuX0V4dHJhSW5mby5EYXRlQ29tcGxldGVkO1xyXG5cdFx0XHRcdC8vIOmHjeWkjeS6i+S7tlxyXG5cdFx0XHRcdHJwdFJ1bGUgPSBkYXRhLkNBTEVOREFSX1JFQ1VSUkVOQ0U7XHJcblx0XHRcdFx0cnB0RW5kID0gZGF0YS5DQUxFTkRBUl9FTkRSRUNVUlJFTkNFO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIFwiRnVsbENhbGVuZGFyRXZlbnRcIjpcclxuXHRcdFx0XHRpZCA9IGRhdGEuaWQ7XHJcblx0XHRcdFx0c3RhcnQgPSBkYXRhLnN0YXJ0O1xyXG5cdFx0XHRcdGVuZCA9IGRhdGEuZW5kO1xyXG5cdFx0XHRcdGJrQ29sb3IgPSBkYXRhLmJhY2tncm91bmRDb2xvcjtcclxuXHRcdFx0XHRhbGxEYXkgPSBkYXRhLmFsbERheSA/IGRhdGEuYWxsRGF5IDogISQuZnVsbENhbGVuZGFyLm1vbWVudChkYXRhLnN0YXJ0KS5oYXNUaW1lKCk7XHJcblx0XHRcdFx0Y29tcGxldGUgPSBkYXRhLmNvbXBsZXRlIHx8IDA7XHJcblx0XHRcdFx0ZGF0ZUNvbXBsZXRlZCA9IGRhdGEuZGF0ZUNvbXBsZXRlZCB8fCAnJztcclxuXHRcdFx0XHRycHRSdWxlID0gZGF0YS5ycHRSdWxlO1xyXG5cdFx0XHRcdHJwdEVuZCA9IGRhdGEucnB0RW5kXHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGlkZW50aWZ5IGRhdGEgdHlwZS4nKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHRcdC8vIOWfuuacrOS/oeaBr1xyXG5cdFx0dGhpcy5pZCA9IGlkO1xyXG5cdFx0dGhpcy50aXRsZSA9IGRhdGEudGl0bGU7XHJcblx0XHQvLyDml7bpl7Tkv6Hmga9cclxuXHRcdHRoaXMuYWxsRGF5ID0gYWxsRGF5O1xyXG5cdFx0Ly8g5rOo5oSP77yBc3RhcnQvZW5kIOWPr+iDveaYr21vbWVudOWvueixoeaIluiAhXN0cu+8jOaJgOS7peS4gOW+i+WFiOi9rOaNouaIkG1vbWVudOWGjeagvOW8j+WMlui+k+WHulxyXG5cdFx0dGhpcy5zdGFydCA9IGFsbERheSA/IG1vbWVudChzdGFydCkuZm9ybWF0KFwiWVlZWS1NTS1ERFwiKSA6IG1vbWVudChzdGFydCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHR0aGlzLmVuZCA9IGFsbERheSA/IG1vbWVudChlbmQpLmZvcm1hdChcIllZWVktTU0tRERcIikgOiBtb21lbnQoZW5kKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdHRoaXMuY3JlYXRlZCA9IGRhdGEuY3JlYXRlZCA/IGRhdGEuY3JlYXRlZCA6IG1vbWVudChzdGFydCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHR0aGlzLnVwZGF0ZWQgPSBkYXRhLnVwZGF0ZWQgPyBkYXRhLnVwZGF0ZWQgOiBtb21lbnQoKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdC8vIOiuvue9ruS/oeaBr1xyXG5cdFx0dGhpcy50ZXh0Q29sb3IgPSAnYmxhY2snO1xyXG5cdFx0dGhpcy5iYWNrZ3JvdW5kQ29sb3IgPSBia0NvbG9yO1xyXG5cdFx0dGhpcy5jb21wbGV0ZSA9IGNvbXBsZXRlO1xyXG5cdFx0dGhpcy5kYXRlQ29tcGxldGVkID0gZGF0ZUNvbXBsZXRlZDtcclxuXHRcdC8vIOmHjeWkjeS6i+S7tlxyXG5cdFx0dGhpcy5ycHRSdWxlID0gcnB0UnVsZTtcclxuXHRcdHRoaXMucnB0RW5kID0gcnB0RW5kO1xyXG5cdFx0Ly9cclxuXHRcdHRoaXMuX3VwZGF0ZSgpO1xyXG5cdH1cclxuXHJcblx0X2NoZWNrRGF0YVR5cGUoZGF0YSkge1xyXG5cdFx0Y29uc3Qgb2JqQ2xhc3MgPSBkYXRhLmNvbnN0cnVjdG9yO1xyXG4gICAgICAgIGNvbnN0IEdVSURfUmVnRXhyID0gL15bMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfSQvaTtcclxuICAgICAgICBsZXQgdHlwZTtcclxuICAgICAgICBzd2l0Y2ggKG9iakNsYXNzKSB7XHJcbiAgICAgICAgICAgIGNhc2UgU3RyaW5nOlxyXG4gICAgICAgICAgICAgICAgaWYgKCBHVUlEX1JlZ0V4ci50ZXN0KGRhdGEpICkgdHlwZSA9IFwiR1VJRFwiO1xyXG4gICAgICAgICAgICAgICAgZWxzZSB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZGF0YSwgY2Fubm90IGNyZWF0ZSBDYWxlbmRhckV2ZW50IG9iamVjdC4nKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIE9iamVjdDpcclxuXHRcdFx0XHRpZiAoIGRhdGEuQ0FMRU5EQVJfSU5GTyAmJiBkYXRhLnRpdGxlICkgeyBcclxuXHRcdFx0XHRcdHR5cGUgPSAnV2l6RXZlbnQnO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAoIGRhdGEuc3RhcnQgJiYgZGF0YS50aXRsZSApIHtcclxuXHRcdFx0XHRcdHR5cGUgPSAnRnVsbENhbGVuZGFyRXZlbnQnO1xyXG5cdFx0XHRcdH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHlwZTtcclxuXHR9O1xyXG5cclxuXHRfcGFyc2VJbmZvKEluZm9TdHJpbmcpIHtcclxuXHRcdGNvbnN0IEluZm9PYmplY3QgPSB7fTtcclxuXHRcdC8vIOaLhuino0NBTEVOREFSX0lORk9cclxuXHRcdGNvbnN0IEluZm9BcnJheSA9IEluZm9TdHJpbmcuc3BsaXQoJy8nKTtcclxuXHRcdEluZm9BcnJheS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0sIGluZGV4LCBhcnIpe1xyXG5cdFx0XHRjb25zdCBwYWlyID0gaXRlbS5zcGxpdCgnPScpO1xyXG5cdFx0XHRJbmZvT2JqZWN0W3BhaXJbMF1dID0gcGFpclsxXTtcclxuXHRcdH0pO1xyXG5cdFx0Ly8g5aSE55CG6aKc6Imy5YC8XHJcblx0XHRpZiAoIEluZm9PYmplY3QuYiApIEluZm9PYmplY3QuYiA9ICcjJyArIEluZm9PYmplY3QuYjtcclxuXHJcblx0XHRyZXR1cm4gSW5mb09iamVjdDtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuICAgICAqIOWwhiBJbmZvIOWvueixoeW6j+WIl+WMli5cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbSW5mb09iamVjdD1dIOaPkOS+myBJbmZvIOWvueixoe+8jOm7mOiupOS4umB0aGlzLl9JbmZvYC5cclxuICAgICAqIEByZXR1cm4ge1N0cmluZ30g6L+U5Zue55So5LqOSW5mb+WvueixoeWtl+espuS4si5cclxuICAgICAqL1xyXG5cdF9zdHJpbmdpZnlJbmZvKCBJbmZvT2JqZWN0ID0gdGhpcy5fSW5mbyApIHtcclxuXHRcdGlmICggIUluZm9PYmplY3QgKSByZXR1cm4gJyc7XHJcblx0XHRjb25zdCBJbmZvQXJyYXkgPSBbXTtcclxuXHRcdGNvbnN0IEluZm9PYmplY3RLZXlzQXJyYXkgPSBPYmplY3Qua2V5cyhJbmZvT2JqZWN0KTtcclxuXHRcdEluZm9PYmplY3RLZXlzQXJyYXkuZm9yRWFjaChmdW5jdGlvbihpdGVtLCBpbmRleCwgYXJyKXtcclxuXHRcdFx0Y29uc3Qgc2luZ2xlSW5mbyA9IGAke2l0ZW19PSR7SW5mb09iamVjdFtpdGVtXX1gO1xyXG5cdFx0XHRJbmZvQXJyYXkucHVzaChzaW5nbGVJbmZvKTtcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIEluZm9BcnJheS5qb2luKCcvJykucmVwbGFjZSgnIycsICcnKTtcclxuXHR9O1xyXG5cclxuXHRfdXBkYXRlKCkge1xyXG5cdFx0dGhpcy5fdXBkYXRlSW5mbygpO1xyXG5cdFx0dGhpcy5fdXBkYXRlRXh0cmFJbmZvKCk7XHJcblx0fTtcclxuXHJcblx0X3VwZGF0ZUluZm8oKSB7XHJcblx0XHRjb25zdCB0aGF0ID0gdGhpcztcclxuXHRcdGNvbnN0IEluZm9PYmplY3QgPSB7XHJcblx0XHRcdCdiJzogbnVsbCwgLy/og4zmma/oibJoZXjlgLxcclxuXHRcdFx0J3InOiAnLTEnLCAvL+aPkOmGkuaWueW8j1xyXG5cdFx0XHQnYyc6ICcwJywgLy/nu5PmnZ/mj5DphpLkv6Hmga9cclxuXHRcdFx0J2NpJzogMCAvL+iDjOaZr+iJsklE77yM6buY6K6kIDAg6KGo56S66IOM5pmv5Li655So5oi36Ieq5a6a5LmJXHJcblx0XHR9O1xyXG5cdFx0Ly8g5pu05paw6IOM5pmv6ImyJ2InXHJcblx0XHRJbmZvT2JqZWN0WydiJ10gPSB0aGlzLmJhY2tncm91bmRDb2xvci5yZXBsYWNlKCcjJywgJycpO1xyXG5cdFx0Ly8g5pu05paw6aKc6Imy5oyH5pWwJ2NpJ1xyXG5cdFx0Q29uZmlnLmNvbG9ySXRlbXMuZm9yRWFjaChmdW5jdGlvbihpdGVtLCBpbmRleCwgYXJyKXtcclxuXHRcdFx0aWYgKCBpdGVtLmNvbG9yVmFsdWUgPT0gIHRoYXQuYmFja2dyb3VuZENvbG9yICkge1xyXG5cdFx0XHRcdC8vIOW9k+aXpeeoi+iDjOaZr+iJsuS4juiJsuihqOWMuemFjeaXtuWImeeUqCBjb2xvciBpZGV4IOadpeWCqOWtmO+8iOWFvOWuueWOn+eJiOaXpeWOhuaPkuS7tu+8iVxyXG5cdFx0XHRcdEluZm9PYmplY3RbJ2NpJ10gPSBpbmRleDtcclxuXHRcdFx0fTtcclxuXHRcdH0pO1xyXG5cdFx0Ly8g5bqU55So5pu05pawXHJcblx0XHR0aGlzLl9JbmZvID0gSW5mb09iamVjdDtcclxuXHR9O1xyXG5cclxuXHRfZ2V0RGVmYXVsdEV4dHJhSW5mbygpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdCdDb21wbGV0ZSc6IDAsIC8vXHJcblx0XHRcdCdEYXRlQ29tcGxldGVkJzogJycsIC8vIElTTyDmoIflh4bml6XmnJ/lrZfnrKbkuLIgWVlZWS1NTS1ERCAwMDowMDowMFxyXG5cdFx0XHQnUHJpb3InOiAwXHJcblx0XHR9O1xyXG5cdH07XHJcblxyXG5cdF91cGRhdGVFeHRyYUluZm8oKSB7XHJcblx0XHRjb25zdCBFeHRyYUluZm9PYmplY3QgPSB7XHJcblx0XHRcdCdDb21wbGV0ZSc6IDAsXHJcblx0XHRcdCdEYXRlQ29tcGxldGVkJzogJycsXHJcblx0XHRcdCdQcmlvcic6IDBcclxuXHRcdH07XHJcblx0XHRFeHRyYUluZm9PYmplY3RbJ0NvbXBsZXRlJ10gPSB0aGlzLmNvbXBsZXRlO1xyXG5cdFx0RXh0cmFJbmZvT2JqZWN0WydEYXRlQ29tcGxldGVkJ10gPSB0aGlzLmRhdGVDb21wbGV0ZWQ7XHJcblx0XHR0aGlzLl9FeHRyYUluZm8gPSBFeHRyYUluZm9PYmplY3Q7XHJcblx0fTtcclxuXHJcblx0X2dldEV2ZW50SHRtbCh0aXRsZSA9IHRoaXMudGl0bGUsIGNvbnRlbnQgPSAnJyl7XHJcblx0XHRjb25zdCBodG1sVGV4dCA9IFxyXG5cdFx0XHRgPGh0bWw+XHJcblx0XHRcdFx0PGhlYWQ+XHJcblx0XHRcdFx0XHQ8bWV0YSBodHRwLWVxdWl2PVwiQ29udGVudC1UeXBlXCIgY29udGVudD1cInRleHQvaHRtbDsgY2hhcnNldD11bmljb2RlXCI+XHJcblx0XHRcdFx0XHQ8dGl0bGU+JHt0aXRsZX08L3RpdGxlPiBcclxuXHRcdFx0XHQ8L2hlYWQ+XHJcblx0XHRcdFx0PGJvZHk+XHJcblx0XHRcdFx0XHQ8IS0tV2l6SHRtbENvbnRlbnRCZWdpbi0tPlxyXG5cdFx0XHRcdFx0PGRpdj4ke2NvbnRlbnR9PC9kaXY+XHJcblx0XHRcdFx0XHQ8IS0tV2l6SHRtbENvbnRlbnRFbmQtLT5cclxuXHRcdFx0XHQ8L2JvZHk+XHJcblx0XHRcdDwvaHRtbD5gO1xyXG5cdFxyXG5cdFx0ICByZXR1cm4gaHRtbFRleHRcclxuXHR9O1xyXG5cclxuXHQvKipcclxuICAgICAqIOagueaNruaXpeeoi+eahOmHjeWkjeinhOWImeeUn+aIkCBGdWxsQ2FsZW5kYXIgZXZlbnRTb3VyY2UuXHJcblx0ICogQHBhcmFtIHtTdHJpbmd9IHN0YXJ0IOafpeivoui1t+Wni++8jElTTyDmoIflh4bml6XmnJ/lrZfnrKbkuLIuXHJcblx0ICogQHBhcmFtIHtTdHJpbmd9IGVuZCDmn6Xor6Lnu5PmnZ/vvIxJU08g5qCH5YeG5pel5pyf5a2X56ym5LiyLlxyXG4gICAgICogQHJldHVybnMge09iamVjdH0gZXZlbnRTb3VyY2UuXHJcbiAgICAgKi9cclxuXHRnZW5lcmF0ZVJlcGVhdEV2ZW50cyhzdGFydCwgZW5kKSB7XHJcblx0XHRpZiAoICF0aGlzLnJwdFJ1bGUgKSB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBmaW5kIENhbGVuZGFyRXZlbnQgcmVwZWF0IHJ1bGUuJyk7XHJcblx0XHRjb25zdCBldmVudFNvdXJjZSA9IHtcclxuXHRcdFx0aWQ6IHRoaXMuaWQsXHJcblx0XHRcdGV2ZW50czogW11cclxuXHRcdH1cclxuXHRcdC8v5qC55o2ucnB0UnVsZeeUn+aIkOmHjeWkjeaXpeacn++8jOW5tueUn+aIkOS6i+S7tlxyXG5cdFx0Y29uc3QgZGF5QXJyYXkgPSB0aGlzLl9nZXRSZW5kZXJSZXBlYXREYXkoc3RhcnQsIGVuZCk7XHJcblx0XHRmb3IgKCBsZXQgZGF5IG9mIGRheUFycmF5ICkge1xyXG5cdFx0XHQvLyBkYXkg5piv5LiA5LiqTW9tZW505pel5pyf5a+56LGhXHJcblx0XHRcdGNvbnN0IG5ld0V2ZW50ID0gdGhpcy50b0Z1bGxDYWxlbmRhckV2ZW50KCk7XHJcblx0XHRcdG5ld0V2ZW50LnN0YXJ0ID0gZGF5LmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHRuZXdFdmVudC5lbmQgPSBtb21lbnQobmV3RXZlbnQuZW5kKS5hZGQoIGRheS5kaWZmKCBtb21lbnQodGhpcy5zdGFydCkgKSApLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHRldmVudFNvdXJjZS5ldmVudHMucHVzaChuZXdFdmVudCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGV2ZW50U291cmNlO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG4gICAgICog5qC55o2u6KeE5YiZ55Sf5oiQ5pel5pyf5pWw57uEXHJcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0W119IOWMheWQq+S4gOezu+WIl2BNb21lbnRg5pel5pyf5a+56LGh55qE5pWw57uELlxyXG4gICAgICovXHJcblx0X2dldFJlbmRlclJlcGVhdERheShzdGFydCwgZW5kKSB7XHJcblx0XHRjb25zdCBycHRSdWxlID0gdGhpcy5ycHRSdWxlO1xyXG5cdFx0bGV0IGRheUFycmF5O1xyXG5cdFx0bGV0IHJlZ2V4O1xyXG5cdFx0Y29uc29sZS5jb3VudChycHRSdWxlKTtcclxuXHRcdGlmICggKHJlZ2V4ID0gL15FdmVyeShcXGQpP1dlZWtzPyhcXGQqKSQvKS50ZXN0KHJwdFJ1bGUpICkge1xyXG5cdFx0XHQvLyDmr49bMTIzNF3lkahbNzEyMzQ1Nl1cclxuXHRcdFx0Y29uc3QgY3VyV2Vla0RheSA9IG1vbWVudCh0aGlzLnN0YXJ0KS5kYXkoKTtcclxuXHRcdFx0Y29uc3QgcmVzdWx0cyA9IHJlZ2V4LmV4ZWMocnB0UnVsZSk7XHJcblx0XHRcdGNvbnN0IGludGVyV2VlayA9IHJlc3VsdHNbMV07XHJcblx0XHRcdGNvbnN0IG51bWJlciA9IHJlc3VsdHNbMl0gfHwgYCR7Y3VyV2Vla0RheX1gO1xyXG5cdFx0XHRkYXlBcnJheSA9IHRoaXMuX2dldFdlZWtseVJlcGVhdERheShudW1iZXIsIHN0YXJ0LCBlbmQsIGludGVyV2Vlayk7XHJcblxyXG5cdFx0fSBlbHNlIGlmICggKHJlZ2V4ID0gL15FdmVyeVdlZWtkYXkoXFxkKikkLykudGVzdChycHRSdWxlKSApIHtcclxuXHRcdFx0Ly8g5q+P5Liq5bel5L2c5pelRXZlcnlXZWVrZGF5MTM1XHJcblx0XHRcdGNvbnN0IHJlc3VsdHMgPSByZWdleC5leGVjKHJwdFJ1bGUpO1xyXG5cdFx0XHRjb25zdCBudW1iZXIgPSByZXN1bHRzWzFdIHx8ICcxMjM0NSc7XHJcblx0XHRcdGRheUFycmF5ID0gdGhpcy5fZ2V0V2Vla2x5UmVwZWF0RGF5KG51bWJlciwgc3RhcnQsIGVuZCk7XHJcblxyXG5cdFx0fSBlbHNlIGlmICggKHJlZ2V4ID0gL0RhaWx5fFdlZWtseXxNb250aGx5fFllYXJseS8pLnRlc3QocnB0UnVsZSkgKSB7XHJcblx0XHRcdC8vIERhaWx5fFdlZWtseXxNb250aGx5fFllYXJseVxyXG5cdFx0XHRjb25zdCBwZXJSdWxlID0gcmVnZXguZXhlYyhycHRSdWxlKVswXVxyXG5cdFx0XHRkYXlBcnJheSA9IHRoaXMuX2dldFBlclJlcGVhdERheXMoc3RhcnQsIGVuZCwgcGVyUnVsZSk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBkYXlBcnJheTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuICAgICAqIOagueaNruavj+WRqOinhOWImeeUn+aIkOaXpeacn+aVsOe7hFxyXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBudW1iZXIg5pW05pWw5a2X56ym5Liy6KGo56S655qE6KeE5YiZ77ybXHJcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0W119IOWMheWQq+S4gOezu+WIl01vbWVudOaXpeacn+WvueixoeeahOaVsOe7hC5cclxuICAgICAqL1xyXG5cdF9nZXRXZWVrbHlSZXBlYXREYXkobnVtYmVyLCBzdGFydCwgZW5kLCBpbnRlcldlZWtzID0gJzEnKSB7XHJcblx0XHQvL+i/lOWbnlt7c3RhcnQsIGVuZH0sIHtzdGFydCwgZW5kfSwge3N0YXJ0LCBlbmR9XVxyXG5cdFx0Ly/ogIPomZHmuLLmn5PojIPlm7TvvIzku6Xlj4rnu5PmnZ/lvqrnjq/nmoTml6XmnJ9cclxuXHRcdGNvbnN0IHZpZXdTdGFydCA9IG1vbWVudCh0aGlzLnN0YXJ0KTtcclxuXHRcdGNvbnN0IHZpZXdFbmQgPSBtb21lbnQoZW5kKTtcclxuXHRcdGNvbnN0IHJwdEVuZCA9IHRoaXMucnB0RW5kID8gbW9tZW50KHRoaXMucnB0RW5kKSA6IHZpZXdFbmQ7XHJcblx0XHRsZXQgZGF5QXJyYXkgPSBbXTtcclxuXHRcdGNvbnN0IGludGVydmFsV2Vla3MgPSBpbnRlcldlZWtzID8gcGFyc2VJbnQoaW50ZXJXZWVrcykgOiAxO1xyXG5cdFx0Y29uc3Qgd2Vla2RheXMgPSBudW1iZXIucmVwbGFjZSgnNycsICcwJykuc3BsaXQoJycpOyAvL+WRqOaXpTB+NuWRqOWFrVxyXG5cdFx0Zm9yICggbGV0IGRheSBvZiB3ZWVrZGF5cyApIHtcclxuXHRcdFx0Ly9cclxuXHRcdFx0bGV0IGN1cldlZWtEYXkgPSBwYXJzZUludChkYXkpLCBuZXdFdmVudFN0YXJ0RGF0ZSA9IG1vbWVudCh2aWV3U3RhcnQpO1xyXG5cdFx0XHRkbyB7XHJcblx0XHRcdFx0Ly8g5Yib5bu65pawTW9tZW505a+56LGhXHJcblx0XHRcdFx0bmV3RXZlbnRTdGFydERhdGUgPSBtb21lbnQodmlld1N0YXJ0KS5kYXkoY3VyV2Vla0RheSk7XHJcblx0XHRcdFx0Ly8g5qC55o2u5pel56iL6K6+572udGltZSBwYXJ0XHJcblx0XHRcdFx0Y29uc3QgZXZlbnRTdGFydCA9IG1vbWVudCh0aGlzLnN0YXJ0KVxyXG5cdFx0XHRcdG5ld0V2ZW50U3RhcnREYXRlLnNldCh7XHJcblx0XHRcdFx0XHQnaG91cic6IGV2ZW50U3RhcnQuZ2V0KCdob3VyJyksXHJcblx0XHRcdFx0XHQnbWludXRlJzogZXZlbnRTdGFydC5nZXQoJ21pbnV0ZScpLFxyXG5cdFx0XHRcdFx0J3NlY29uZCc6IGV2ZW50U3RhcnQuZ2V0KCdzZWNvbmQnKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0Ly8g6YG/5YWN5Yid5aeL6YeN5aSN5riy5p+TXHJcblx0XHRcdFx0aWYgKCAhbmV3RXZlbnRTdGFydERhdGUuaXNTYW1lKCBldmVudFN0YXJ0ICkgKSBkYXlBcnJheS5wdXNoKCBtb21lbnQobmV3RXZlbnRTdGFydERhdGUpICk7XHJcblx0XHRcdFx0Ly8g6ZqU5aSa5bCR5ZGo6YeN5aSNXHJcblx0XHRcdFx0Y3VyV2Vla0RheSArPSA3KmludGVydmFsV2Vla3M7XHJcblx0XHRcdFx0Ly9jb25zb2xlLmxvZyggbW9tZW50KG5ld0V2ZW50U3RhcnREYXRlKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKSApO1xyXG5cdFx0XHR9IHdoaWxlICggbW9tZW50KHZpZXdTdGFydCkuZGF5KGN1cldlZWtEYXkgKyA3ICkuaXNCZWZvcmUoIHZpZXdFbmQgKSBcclxuXHRcdFx0XHRcdFx0JiYgbW9tZW50KHZpZXdTdGFydCkuZGF5KGN1cldlZWtEYXkgKyA3ICkuaXNCZWZvcmUoIHJwdEVuZCApICApXHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gZGF5QXJyYXk7XHJcblx0fTtcclxuXHJcblx0X2dldFBlclJlcGVhdERheXMoc3RhcnQsIGVuZCwgcGVyUnVsZSkge1xyXG5cdFx0Y29uc3QgcGVyUnVsZU1hcCA9IHtcclxuXHRcdFx0J0RhaWx5JzogJ2RheXMnLFxyXG5cdFx0XHQnV2Vla2x5JyA6ICd3ZWVrcycsXHJcblx0XHRcdCdNb250aGx5JyA6ICdtb250aHMnLFxyXG5cdFx0XHQnWWVhcmx5JyA6ICd5ZWFycydcclxuXHRcdH07XHJcblx0XHRjb25zdCB2aWV3U3RhcnQgPSBtb21lbnQodGhpcy5zdGFydCk7XHJcblx0XHRjb25zdCB2aWV3RW5kID0gbW9tZW50KGVuZCk7XHJcblx0XHRjb25zdCBycHRFbmQgPSB0aGlzLnJwdEVuZCA/IG1vbWVudCh0aGlzLnJwdEVuZCkgOiB2aWV3RW5kO1xyXG5cdFx0bGV0IGRheUFycmF5ID0gW107XHJcblx0XHRjb25zdCBldmVudFN0YXJ0ID0gbW9tZW50KHRoaXMuc3RhcnQpXHJcblx0XHRkbyB7XHJcblx0XHRcdC8vIOWinuWKoOS4gOS4quaciFxyXG5cdFx0XHRldmVudFN0YXJ0LmFkZCgxLCBwZXJSdWxlTWFwW3BlclJ1bGVdKTtcclxuXHRcdFx0ZGF5QXJyYXkucHVzaCggbW9tZW50KGV2ZW50U3RhcnQpICk7XHJcblx0XHR9IHdoaWxlICggZXZlbnRTdGFydC5pc0JlZm9yZSggdmlld0VuZCApICYmIGV2ZW50U3RhcnQuaXNCZWZvcmUoIHJwdEVuZCApICk7XHJcblxyXG5cdFx0cmV0dXJuIGRheUFycmF5O1xyXG5cdH1cclxuXHJcblx0dG9GdWxsQ2FsZW5kYXJFdmVudCgpIHtcclxuXHRcdC8vIOazqOaEj+aWueazlei/lOWbnueahOWPquaYr0Z1bGxDYWxlbmRhckV2ZW5055qE5pWw5o2u57G75Z6L77yM5bm25LiN5pivZXZlbnTlr7nosaFcclxuXHRcdGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cdFx0Y29uc3QgbmV3RXZlbnQgPSB7fTtcclxuXHRcdGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzKTtcclxuXHRcdC8vIOWOu+mZpOmdnuW/heimgeWxnuaAp1xyXG5cdFx0a2V5cy5zcGxpY2UoIGtleXMuZmluZEluZGV4KCAoaSkgPT4gaSA9PSAnX0luZm8nICksIDEpO1xyXG5cdFx0a2V5cy5zcGxpY2UoIGtleXMuZmluZEluZGV4KCAoaSkgPT4gaSA9PSAnX0V4dHJhSW5mbycgKSwgMSk7XHJcblx0XHQvLyDmtYXmi7fotJ0sIOS4jei/h+S4u+imgeWxnuaAp+mDveaYr+WfuuacrOaVsOaNruexu+Wei++8jOaJgOS7peS4jeWtmOWcqOW8leeUqOmXrumimFxyXG5cdFx0a2V5cy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0sIGluZGV4LCBhcnIpe1xyXG5cdFx0XHRuZXdFdmVudFtpdGVtXSA9IHRoYXRbaXRlbV07XHJcblx0XHR9KTtcclxuXHRcdHJldHVybiBuZXdFdmVudDtcclxuXHR9O1xyXG5cclxuXHR0b1dpekV2ZW50RGF0YSgpIHtcclxuXHRcdHRoaXMuX3VwZGF0ZSgpO1xyXG5cdFx0Y29uc3QgbmV3RXZlbnQgPSB7fTtcclxuXHRcdG5ld0V2ZW50LnRpdGxlID0gdGhpcy50aXRsZTtcclxuXHRcdG5ld0V2ZW50Lmd1aWQgPSB0aGlzLmlkO1xyXG5cdFx0bmV3RXZlbnQuQ0FMRU5EQVJfU1RBUlQgPSB0aGlzLmFsbERheSA/IG1vbWVudCh0aGlzLnN0YXJ0KS5mb3JtYXQoJ1lZWVktTU0tREQgMDA6MDA6MDAnKSA6IHRoaXMuc3RhcnQ7XHJcblx0XHRuZXdFdmVudC5DQUxFTkRBUl9FTkQgPSB0aGlzLmFsbERheSA/IG1vbWVudCh0aGlzLmVuZCkuZm9ybWF0KCdZWVlZLU1NLUREIDIzOjU5OjU5JykgOiB0aGlzLmVuZDtcclxuXHRcdG5ld0V2ZW50LkNBTEVOREFSX0lORk8gPSB0aGlzLl9zdHJpbmdpZnlJbmZvKHRoaXMuX0luZm8pO1xyXG5cdFx0bmV3RXZlbnQuQ0FMRU5EQVJfRVhUUkFJTkZPID0gdGhpcy5fc3RyaW5naWZ5SW5mbyh0aGlzLl9FeHRyYUluZm8pO1xyXG5cdFx0bmV3RXZlbnQuY3JlYXRlZCA9IHRoaXMuY3JlYXRlZDtcclxuXHRcdG5ld0V2ZW50LnVwZGF0ZWQgPSB0aGlzLnVwZGF0ZWQ7XHJcblx0XHRyZXR1cm4gbmV3RXZlbnQ7XHJcblx0fTtcclxuXHJcblx0YWRkVG9GdWxsQ2FsZW5kYXIoKSB7XHJcblx0XHQvL1RPRE86IOWwhuiHqui6q+a3u+WKoOWIsEZ1bGxDYWxlbmRhclxyXG5cdFx0dGhpcy4kY2FsZW5kYXIuZnVsbENhbGVuZGFyKCAnYWRkRXZlbnRTb3VyY2UnLCB7XHJcblx0XHRcdGV2ZW50czogW1xyXG5cdFx0XHRcdHRoaXMudG9GdWxsQ2FsZW5kYXJFdmVudCgpXHJcblx0XHRcdF1cclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdF9zYXZlQWxsUHJvcCgpIHtcclxuXHRcdC8vVE9ETzog5L+d5a2Y5YWo6YOo5pWw5o2u5YyF5ousVGl0bGVcclxuXHRcdC8vIOabtOaWsOS6i+S7tuaWh+aho+aVsOaNrlxyXG5cdFx0Y29uc3QgZG9jID0gZ19kYi5Eb2N1bWVudEZyb21HVUlEKHRoaXMuaWQpO1xyXG5cdFx0Ly8g5L+d5a2Y5qCH6aKYXHJcblx0XHRkb2MuVGl0bGUgPSB0aGlzLnRpdGxlO1xyXG5cdFx0Ly8g5L+d5a2Y5pe26Ze05pWw5o2uXHJcblx0XHRpZiAoIHRoaXMuYWxsRGF5ICkge1xyXG5cdFx0XHRsZXQgc3RhcnRTdHIgPSBtb21lbnQodGhpcy5zdGFydCkuc2V0KHsnaCc6IDAsICdtJzogMCwgJ3MnOiAwfSkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRcdGxldCBlbmRTdHIgPSBtb21lbnQodGhpcy5lbmQpLnNldCh7J2gnOiAyMywgJ20nOiA1OSwgJ3MnOiA1OX0pLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9TVEFSVFwiLCBzdGFydFN0cik7XHJcblx0XHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX0VORFwiLCBlbmRTdHIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bGV0IHN0YXJ0U3RyID0gbW9tZW50KHRoaXMuc3RhcnQpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHRsZXQgZW5kU3RyID0gbW9tZW50KHRoaXMuZW5kKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfU1RBUlRcIiwgc3RhcnRTdHIpO1xyXG5cdFx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9FTkRcIiwgZW5kU3RyKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyDkv53lrZggQ0FMRU5EQVJfSU5GT1xyXG5cdFx0dGhpcy5fdXBkYXRlKCk7XHJcblx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9JTkZPXCIsIHRoaXMuX3N0cmluZ2lmeUluZm8odGhpcy5fSW5mbykpO1xyXG5cdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfRVhUUkFJTkZPXCIsIHRoaXMuX3N0cmluZ2lmeUluZm8odGhpcy5fRXh0cmFJbmZvKSk7XHJcblx0fTtcclxuXHJcblx0Ly8g6K6+572u5paH5qGj5bGe5oCn5YC8XHJcblx0X3NldFBhcmFtVmFsdWUoZG9jLCBrZXksIHZhbHVlKSB7XHJcblx0XHRpZiAoIWRvYykgcmV0dXJuIGZhbHNlO1xyXG5cdFx0ZG9jLlNldFBhcmFtVmFsdWUoa2V5LCB2YWx1ZSk7XHJcblx0fTtcclxuXHJcblx0X2NyZWF0ZVdpekV2ZW50RG9jKCkge1xyXG5cdFx0Ly9UT0RPOiDkv53lrZjlhajpg6jmlbDmja7ljIXmi6xUaXRsZVxyXG5cdFx0Ly8g5Yib5bu6V2l6RG9jXHJcblx0XHRjb25zdCBsb2NhdGlvbiA9IGBNeSBFdmVudHMvJHsgbW9tZW50KHRoaXMuc3RhcnQpLmZvcm1hdCgnWVlZWS1NTScpIH0vYDtcclxuXHRcdGNvbnN0IG9iakZvbGRlciA9IGdfZGIuR2V0Rm9sZGVyQnlMb2NhdGlvbihsb2NhdGlvbiwgdHJ1ZSk7XHJcblx0XHRjb25zdCB0ZW1wSHRtbCA9IGdfY21uLkdldEFUZW1wRmlsZU5hbWUoJy5odG1sJyk7XHJcblx0XHRjb25zdCBodG1sVGV4dCA9IHRoaXMuX2dldEV2ZW50SHRtbCh0aGlzLnRpdGxlLCAnJyk7XHJcblx0XHRnX2Ntbi5TYXZlVGV4dFRvRmlsZSh0ZW1wSHRtbCwgaHRtbFRleHQsICd1bmljb2RlJyk7XHJcblx0XHRjb25zdCBkb2MgPSBvYmpGb2xkZXIuQ3JlYXRlRG9jdW1lbnQyKHRoaXMudGl0bGUsIFwiXCIpO1xyXG5cdFx0ZG9jLkNoYW5nZVRpdGxlQW5kRmlsZU5hbWUodGhpcy50aXRsZSk7XHJcblx0XHRkb2MuVXBkYXRlRG9jdW1lbnQ2KHRlbXBIdG1sLCB0ZW1wSHRtbCwgMHgyMik7XHJcblx0XHQvLyDorr7nva7moIfnrb5cclxuXHRcdC8vaWYgKCB0YWdzICkgZG9jLlNldFRhZ3NUZXh0Mih0YWdzLCBcIkNhbGVuZGFyXCIpO1xyXG5cdFx0Ly8g5bCG5L+h5oGv57yW56CB5YiwV2l6RG9j5bGe5oCn5Lit5Y67XHJcblx0XHRjb25zdCBuZXdFdmVudCA9IHRoaXMudG9XaXpFdmVudERhdGEoKTtcclxuXHRcdGRvYy5BZGRUb0NhbGVuZGFyKG5ld0V2ZW50LkNBTEVOREFSX1NUQVJULCBuZXdFdmVudC5DQUxFTkRBUl9FTkQsIG5ld0V2ZW50LkNBTEVOREFSX0lORk8pO1xyXG5cdFx0Ly8gY2hhbmdlIGRhdGFiYXNlXHJcblx0XHRkb2MudHlwZSA9IFwiZXZlbnRcIjtcclxuXHRcdC8vXHJcblx0XHR0aGlzLmlkID0gZG9jLkdVSUQ7XHJcblx0fVxyXG5cclxuXHRzYXZlVG9XaXpFdmVudERvYyggcHJvcCA9ICdhbGwnICkge1xyXG5cdFx0aWYgKCFnX2RiIHx8ICFnX2NtbikgdGhyb3cgbmV3IEVycm9yKCdJV2l6RGF0YWJhc2Ugb3IgSVdpekNvbW1vblVJIGlzIG5vdCB2YWxpZC4nKTtcclxuXHRcdC8v5qOA5p+l5paH5qGj5piv5ZCm5a2Y5ZyoXHJcblx0XHRjb25zdCBndWlkUmVnZXggPSAvXlswLTlhLWZdezh9LVswLTlhLWZdezR9LVsxLTVdWzAtOWEtZl17M30tWzg5YWJdWzAtOWEtZl17M30tWzAtOWEtZl17MTJ9JC9pO1xyXG5cdFx0Y29uc3QgaXNXaXpEb2NFeGlzdCA9IGd1aWRSZWdleC50ZXN0KHRoaXMuaWQpO1xyXG5cdFx0Ly8g5Yib5bu65oiW6ICF5pu05paw5paH5qGjXHJcblx0XHRpZiAoIGlzV2l6RG9jRXhpc3QgKSB7XHJcblx0XHRcdC8vIOagueaNruaMh+S7pOabtOaWsOWGheWuuVxyXG5cdFx0XHR0aGlzLl9zYXZlQWxsUHJvcCgpO1xyXG5cdFx0XHQvLyDmm7TmlrBGdWxsQ2FsZW5kYXJcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdC8vIOWIm+W7uuaWsOeahOS6i+S7tuaWh+aho1xyXG5cdFx0XHR0aGlzLl9jcmVhdGVXaXpFdmVudERvYygpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0fTtcclxuXHJcblx0ZGVsZXRlRXZlbnREYXRhKCBpc0RlbGV0ZURvYyA9IGZhbHNlICl7XHJcblx0XHRsZXQgZG9jID0gZ19kYi5Eb2N1bWVudEZyb21HVUlEKHRoaXMuaWQpO1xyXG5cdFx0aWYgKCFkb2MpIHRocm93IG5ldyBFcnJvcignQ2FuIG5vdCBmaW5kIEV2ZW50IHJlbGF0ZWQgV2l6RG9jdW1lbnQuJylcclxuXHRcdC8vIOenu+mZpEZ1bGxDYWxlbmRhcuS6i+S7tlxyXG5cdFx0dGhpcy4kY2FsZW5kYXIuZnVsbENhbGVuZGFyKCdyZW1vdmVFdmVudHMnLCB0aGlzLmlkKTtcclxuXHRcdC8vIOenu+mZpOaXpeWOhuaVsOaNrlxyXG5cdFx0ZG9jLlJlbW92ZUZyb21DYWxlbmRhcigpO1xyXG5cdFx0Ly8g5Yig6Zmk5paH5qGjXHJcblx0XHRpZiAoIGlzRGVsZXRlRG9jICkgZG9jLkRlbGV0ZSgpO1xyXG5cdH1cclxuXHJcblx0cmVmZXRjaERhdGEoKSB7XHJcblx0XHQvL1RPRE86IOmHjeaVsOaNruW6k+mHjeaWsOiOt+WPluaVsOaNruabtOaWsOWunuS+i1xyXG5cdH07XHJcblxyXG5cdHJlZnJlc2hFdmVudChldmVudCkge1xyXG5cdFx0Ly9UT0RPOiDlupTor6Xoh6rliqjpgY3ljoblubbkv67mlLnlsZ7mgKdcclxuXHRcdGlmICggZXZlbnQgKSB7XHJcblx0XHRcdC8vIOmHjeaWsOa4suafk0Z1bGxDYWxlbmRhcuS6i+S7tlxyXG5cdFx0XHRldmVudC50aXRsZSA9IHRoaXMudGl0bGU7XHJcblx0XHRcdGV2ZW50LmJhY2tncm91bmRDb2xvciA9IHRoaXMuYmFja2dyb3VuZENvbG9yO1xyXG5cdFx0XHR0aGlzLiRjYWxlbmRhci5mdWxsQ2FsZW5kYXIoJ3VwZGF0ZUV2ZW50JywgZXZlbnQpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Ly/nlKguZnVsbENhbGVuZGFyKCDigJhjbGllbnRFdmVudHPigJkgWywgaWRPckZpbHRlciBdICkgLT4gQXJyYXkg6I635Y+W5rqQ5pWw5o2u5LuO6ICM5pu05pawXHJcblx0XHRcdC8vVE9ETzog6YGN5Y6G5bm25a+75om+R1VJROWMuemFjeeahOS6i+S7tlxyXG5cdFx0fVxyXG5cdH1cclxuXHJcbn0iLCJpbXBvcnQgeyBXaXpEYXRhYmFzZSBhcyBvYmpEYXRhYmFzZSB9IGZyb20gJy4uL3V0aWxzL1dpekludGVyZmFjZSc7XHJcbmltcG9ydCBDYWxlbmRhckV2ZW50IGZyb20gJy4vQ2FsZW5kYXJFdmVudCc7XHJcblxyXG4vKiDmlbDmja7ojrflj5ZcclxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG4vKiog6K+l57G75LiOV2l6bm90ZeeahFdpekRhdGFiYXNl5o6l5Y+j5Lqk5o2i5L+h5oGv77yM6I635Y+W5pWw5o2uICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdpekV2ZW50RGF0YUxvYWRlciB7XHJcblx0LyoqXHJcbiAgICAgKiDliJvpgKDkuIDkuKrkuovku7bmlbDmja7liqDovb3lmaguXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHN0YXJ0IOafpeivoui1t+Wni+aXpeacn++8jElTT+agh+WHhuaXpeacn+Wtl+espuS4si5cclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZW5kIOafpeivouaIquiHs+aXpeacn++8jElTT+agh+WHhuaXpeacn+Wtl+espuS4si5cclxuICAgICAqL1xyXG5cdGNvbnN0cnVjdG9yKGNhbGVuZGFyKSB7XHJcblx0XHRpZiAoIW9iakRhdGFiYXNlKSB0aHJvdyBuZXcgRXJyb3IoJ1dpekRhdGFiYXNlIG5vdCB2YWxpZCAhJyk7XHJcblx0XHR0aGlzLkRhdGFiYXNlID0gb2JqRGF0YWJhc2U7XHJcblx0XHR0aGlzLnVzZXJOYW1lID0gb2JqRGF0YWJhc2UuVXNlck5hbWU7XHJcblx0XHR0aGlzLiRjYWxlbmRhciA9ICQoY2FsZW5kYXIpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG4gICAgICog6I635b6X5riy5p+T5ZCO55qE5omA5pyJRnVsbENhbGVuZGFy5LqL5Lu2LlxyXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSB2aWV3IGlzIHRoZSBWaWV3IE9iamVjdCBvZiBGdWxsQ2FsZW5kYXIgZm9yIHRoZSBuZXcgdmlldy5cclxuXHQgKiBAcGFyYW0ge29iamVjdH0gZWxlbWVudCBpcyBhIGpRdWVyeSBlbGVtZW50IGZvciB0aGUgY29udGFpbmVyIG9mIHRoZSBuZXcgdmlldy5cclxuICAgICAqIEByZXR1cm4ge09iamVjdFtdfSDov5Tlm57nlKjkuo5GdWxsQ2FsZW5kYXIg5riy5p+T55qEIGV2ZW50U291cmNlcyDmlbDnu4QuXHJcbiAgICAgKi9cclxuXHRnZXRFdmVudFNvdXJjZXMoIHZpZXcsIGVsZW1lbnQgKXtcclxuXHRcdGNvbnN0IHZpZXdTdGFydCA9IHZpZXcuc3RhcnQuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRjb25zdCB2aWV3RW5kID0gdmlldy5lbmQuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRsZXQgZXZlbnRTb3VyY2VzID0gW107XHJcblx0XHQvL+iOt+WPluaZrumAmuaXpeeoi1xyXG5cdFx0Y29uc3QgZ2VuZXJhbEV2ZW50U291cmNlID0ge1xyXG5cdFx0XHR0eXBlOiAnZ2VuZXJhbEV2ZW50cycsXHJcblx0XHRcdC8vZXZlbnRzOiB0aGlzLl9nZXRBbGxPcmlnaW5hbEV2ZW50KFtdLCB0aGlzLl9kMnMoY3VycmVudFZpZXcuc3RhcnQudG9EYXRlKCkpLCB0aGlzLl9kMnMoY3VycmVudFZpZXcuZW5kLnRvRGF0ZSgpKSlcclxuXHRcdFx0ZXZlbnRzOiB0aGlzLl9nZXRBbGxPcmlnaW5hbEV2ZW50KHZpZXdTdGFydCwgdmlld0VuZClcclxuXHRcdH1cclxuXHRcdGV2ZW50U291cmNlcy5wdXNoKGdlbmVyYWxFdmVudFNvdXJjZSk7XHJcblx0XHRcclxuXHRcdC8vVE9ETzog6I635Y+W6YeN5aSN5pel56iLXHJcblx0XHRjb25zdCByZXBlYXRFdmVudFNvdXJjZXMgPSB0aGlzLl9nZXRBbGxSZXBlYXRFdmVudCh2aWV3U3RhcnQsIHZpZXdFbmQpO1xyXG5cdFx0ZXZlbnRTb3VyY2VzID0gZXZlbnRTb3VyY2VzLmNvbmNhdChyZXBlYXRFdmVudFNvdXJjZXMpO1xyXG5cdFx0Ly9cclxuXHRcdHJldHVybiBldmVudFNvdXJjZXM7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcbiAgICAgKiDku45XaXpEYXRhYmFzZeS4reiOt+WPluaJgOacieaVsOaNruaWh+ahoy5cclxuXHQgKiBAcGFyYW0ge2FycmF5fSBldmVudHMg5Yid5aeL5LqL5Lu25pWw57uELlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBzdGFydCBJU0/moIflh4bml6XmnJ/lrZfnrKbkuLIuXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGVuZCBJU0/moIflh4bml6XmnJ/lrZfnrKbkuLIuXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3RbXX0g6L+U5Zue55So5LqORnVsbENhbGVuZGFy5riy5p+T55qE5LqL5Lu25pWw57uELlxyXG4gICAgICovXHJcblx0X2dldEFsbE9yaWdpbmFsRXZlbnQoc3RhcnQsIGVuZCl7XHJcblx0XHRjb25zdCBldmVudHMgPSBbXTtcclxuXHRcdGxldCBzcWwgPSBgRE9DVU1FTlRfTE9DQVRJT04gbm90IGxpa2UgJy9EZWxldGVkIEl0ZW1zLyUnIGFuZCAoS0JfR1VJRCBpcyBudWxsIG9yIEtCX0dVSUQgPSAnJylgO1xyXG5cdFx0bGV0IGFuZDEgPSBgIGFuZCBET0NVTUVOVF9HVUlEIGluIChzZWxlY3QgRE9DVU1FTlRfR1VJRCBmcm9tIFdJWl9ET0NVTUVOVF9QQVJBTSB3aGVyZSBQQVJBTV9OQU1FID0gJ0NBTEVOREFSX1NUQVJUJyAgYW5kICBQQVJBTV9WQUxVRSA8PSAnJHtlbmR9JyApYDtcclxuXHRcdGxldCBhbmQyID0gYCBhbmQgRE9DVU1FTlRfR1VJRCBpbiAoc2VsZWN0IERPQ1VNRU5UX0dVSUQgZnJvbSBXSVpfRE9DVU1FTlRfUEFSQU0gd2hlcmUgUEFSQU1fTkFNRSA9ICdDQUxFTkRBUl9FTkQnICBhbmQgIFBBUkFNX1ZBTFVFID49ICcke3N0YXJ0fScgKWA7XHJcblx0XHRpZiAoc3RhcnQpIHNxbCArPSBhbmQyO1xyXG5cdFx0aWYgKGVuZCkgc3FsICs9IGFuZDE7XHJcblx0XHRpZiAob2JqRGF0YWJhc2UuRG9jdW1lbnRzRGF0YUZyb21TUUwpIHtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRjb25zdCBkYXRhID0gb2JqRGF0YWJhc2UuRG9jdW1lbnRzRGF0YUZyb21TUUwoc3FsKTtcclxuXHRcdFx0XHRpZiAoICFkYXRhICkgcmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdGNvbnN0IG9iaiA9IEpTT04ucGFyc2UoZGF0YSk7XHJcblx0XHRcdFx0aWYgKCAhb2JqIHx8ICFBcnJheS5pc0FycmF5KG9iaikgKSByZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpICsrKSB7XHJcblx0XHRcdFx0XHRldmVudHMucHVzaChcclxuXHRcdFx0XHRcdFx0bmV3IENhbGVuZGFyRXZlbnQob2JqW2ldLCB0aGlzLiRjYWxlbmRhcikudG9GdWxsQ2FsZW5kYXJFdmVudCgpXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRcclxuXHRcdFx0XHRyZXR1cm4gZXZlbnRzO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNhdGNoKGVycikge1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0RvY3VtZW50c0RhdGFGcm9tU1FMIG1ldGhvZCBvZiBXaXpEYXRhYmFzZSBub3QgZXhpc3QhJyk7XHJcblx0XHRcdC8qXHJcblx0XHRcdGxldCBkb2NDb2xsZXRpb24gPSBvYmpEYXRhYmFzZS5Eb2N1bWVudHNGcm9tU1FMKHNxbCk7XHJcblx0XHRcdC8vXHJcblx0XHRcdGlmIChkb2NDb2xsZXRpb24gJiYgZG9jQ29sbGV0aW9uLkNvdW50KXtcclxuXHRcdFx0XHRsZXQgZG9jO1xyXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZG9jQ29sbGV0aW9uLkNvdW50OyArKyBpKXtcclxuXHRcdFx0XHRcdGRvYyA9IGRvY0NvbGxldGlvbi5JdGVtKGkpO1xyXG5cdFx0XHRcdFx0bGV0IGV2ZW50T2JqID0gX2V2ZW50T2JqZWN0KF9uZXdQc2V1ZG9Eb2MoZG9jKSk7XHJcblx0XHRcdFx0XHRpZiAoZXZlbnRPYmopXHJcblx0XHRcdFx0XHRcdGV2ZW50cy5wdXNoKGV2ZW50T2JqKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIGV2ZW50cztcclxuXHRcdFx0fVxyXG5cdFx0XHQqL1x0XHRcclxuXHRcdH1cclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcbiAgICAgKiDku45XaXpEYXRhYmFzZeS4reiOt+WPluaJgOacieW+queOr+mHjeWkjeS6i+S7ti5cclxuXHQgKiDku47liJvlu7rkuovku7bnmoTml6XmnJ/lvIDlp4vliLBFTkRSRUNVUlJFTkNF57uT5p2fXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3RbXX0g6L+U5Zue55So5LqORnVsbENhbGVuZGFy5riy5p+T55qEIGV2ZW50U291cmNlIOaVsOe7hC5cclxuICAgICAqL1xyXG5cdF9nZXRBbGxSZXBlYXRFdmVudChzdGFydCwgZW5kKXtcclxuXHRcdGNvbnN0IHJlcGVhdEV2ZW50cyA9IFtdO1xyXG5cdFx0Y29uc3Qgc3FsID0gXCJET0NVTUVOVF9MT0NBVElPTiBub3QgbGlrZSAnL0RlbGV0ZWQgSXRlbXMvJScgYW5kIChLQl9HVUlEIGlzIG51bGwgb3IgS0JfR1VJRCA9ICcnKSBhbmQgXCIgKyBcclxuXHRcdFx0XHRcdFwiRE9DVU1FTlRfR1VJRCBpbiAoc2VsZWN0IERPQ1VNRU5UX0dVSUQgZnJvbSBXSVpfRE9DVU1FTlRfUEFSQU0gd2hlcmUgUEFSQU1fTkFNRT0nQ0FMRU5EQVJfUkVDVVJSRU5DRScpXCI7XHJcblxyXG5cdFx0Y29uc3QgZGF0YSA9IG9iakRhdGFiYXNlLkRvY3VtZW50c0RhdGFGcm9tU1FMKHNxbCk7XHJcblx0XHRjb25zb2xlLmxvZyhkYXRhKVxyXG5cdFx0aWYgKCAhZGF0YSApIHJldHVybiBmYWxzZTtcclxuXHRcdFxyXG5cdFx0Y29uc3Qgb2JqID0gSlNPTi5wYXJzZShkYXRhKTtcclxuXHRcdGlmICggIW9iaiB8fCAhQXJyYXkuaXNBcnJheShvYmopICkgcmV0dXJuIGZhbHNlO1xyXG5cdFx0XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkgKyspIHtcclxuXHRcdFx0cmVwZWF0RXZlbnRzLnB1c2goXHJcblx0XHRcdFx0bmV3IENhbGVuZGFyRXZlbnQob2JqW2ldLCB0aGlzLiRjYWxlbmRhcikuZ2VuZXJhdGVSZXBlYXRFdmVudHMoc3RhcnQsIGVuZClcclxuXHRcdFx0KVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlcGVhdEV2ZW50cztcclxuXHRcdFxyXG5cdH07XHJcblxyXG5cdC8vIOaXpeWOhuS6i+S7tuaLluWKqOWQjuabtOaWsOaVsOaNrlxyXG5cdHVwZGF0ZUV2ZW50RGF0YU9uRHJvcChldmVudCwgZGVsdGEsIHJldmVydEZ1bmMsIGpzRXZlbnQsIHVpLCB2aWV3KXtcclxuXHRcdC8vIENhbGwgaGFzVGltZSBvbiB0aGUgZXZlbnTigJlzIHN0YXJ0L2VuZCB0byBzZWUgaWYgaXQgaGFzIGJlZW4gZHJvcHBlZCBpbiBhIHRpbWVkIG9yIGFsbC1kYXkgYXJlYS5cclxuXHRcdGNvbnN0IGFsbERheSA9ICFldmVudC5zdGFydC5oYXNUaW1lKCk7XHJcblx0XHQvLyDojrflj5bkuovku7bmlofmoaPml7bpl7TmlbDmja5cclxuXHRcdGNvbnN0IGRvYyA9IG9iakRhdGFiYXNlLkRvY3VtZW50RnJvbUdVSUQoZXZlbnQuaWQpO1xyXG5cdFx0Ly8g5pu05paw5pWw5o2uXHJcblx0XHRpZiAoIGFsbERheSApIHtcclxuXHRcdFx0Y29uc3Qgc3RhcnRTdHIgPSBldmVudC5zdGFydC5zZXQoeydoJzogMCwgJ20nOiAwLCAncyc6IDB9KS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0Y29uc3QgZW5kU3RyID0gZXZlbnQuZW5kLnNldCh7J2gnOiAyMywgJ20nOiA1OSwgJ3MnOiA1OX0pLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9TVEFSVFwiLCBzdGFydFN0cik7XHJcblx0XHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX0VORFwiLCBlbmRTdHIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc3Qgc3RhcnRTdHIgPSBldmVudC5zdGFydC5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0Y29uc3QgZW5kU3RyID0gZXZlbnQuZW5kLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9TVEFSVFwiLCBzdGFydFN0cik7XHJcblx0XHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX0VORFwiLCBlbmRTdHIpO1xyXG5cdFx0fVxyXG5cdFx0Ly9UT0RPOiDmm7TmlrBDQUxFTkRBUl9SRUNVUlJFTkNF5pWw5o2uXHJcblx0XHQvLyBcclxuXHRcdHRoaXMuX3VwZGF0ZURvY01vZGlmeURhdGUoZG9jKTtcclxuXHR9O1xyXG5cclxuXHQvLyDorr7nva7mlofmoaPlsZ7mgKflgLxcclxuXHRfc2V0UGFyYW1WYWx1ZShkb2MsIGtleSwgdmFsdWUpIHtcclxuXHRcdGlmICghZG9jKSByZXR1cm4gZmFsc2U7XHJcblx0XHRkb2MuU2V0UGFyYW1WYWx1ZShrZXksIHZhbHVlKTtcclxuXHR9O1xyXG5cclxuXHQvLyDmm7TmlrBXaXpEb2Pkv67mlLnml7bpl7RcclxuXHRfdXBkYXRlRG9jTW9kaWZ5RGF0ZShkb2Mpe1xyXG5cdFx0Y29uc3Qgbm93ID0gbmV3IERhdGUoKTtcclxuXHRcdGlmICghZG9jKSByZXR1cm4gZmFsc2U7XHJcblx0XHRub3cuc2V0U2Vjb25kcygobm93LmdldFNlY29uZHMoKSArIDEpICUgNjApO1xyXG5cdFx0ZG9jLkRhdGVNb2RpZmllZCA9IHRoaXMuX2Qycyhub3cpO1xyXG5cdH07XHJcblxyXG5cdC8vIOWwhuaXpeacn+Wvueixoei9rOWMluS4uuWtl+espuS4slxyXG5cdC8vVE9ETzog6ICD6JmR5L6d6LWWbW9tZW505p2l566A5YyW6L2s5o2i6L+H56iLXHJcblx0X2QycyhkdCl7XHJcblx0XHRjb25zdCByZXQgPSBkdC5nZXRGdWxsWWVhcigpICsgXCItXCIgKyBcclxuXHRcdFx0XHRcdGZvcm1hdEludFRvRGF0ZVN0cmluZyhkdC5nZXRNb250aCgpICsgMSkgKyBcIi1cIiArIFxyXG5cdFx0XHRcdFx0Zm9ybWF0SW50VG9EYXRlU3RyaW5nKGR0LmdldERhdGUoKSkgKyBcIiBcIiArIFxyXG5cdFx0XHRcdFx0Zm9ybWF0SW50VG9EYXRlU3RyaW5nKGR0LmdldEhvdXJzKCkpKyBcIjpcIiArIFxyXG5cdFx0XHRcdFx0Zm9ybWF0SW50VG9EYXRlU3RyaW5nKGR0LmdldE1pbnV0ZXMoKSkgKyBcIjpcIiArIFxyXG5cdFx0XHRcdFx0Zm9ybWF0SW50VG9EYXRlU3RyaW5nKGR0LmdldFNlY29uZHMoKSk7XHJcblx0XHRyZXR1cm4gcmV0O1xyXG5cdH07XHJcblxyXG5cdC8vIOaXpeWOhuaXtumXtOmHjee9ruaXtumXtOiMg+WbtOWQjuabtOaWsOaVsOaNrlxyXG5cdHVwZGF0ZUV2ZW50RGF0YU9uUmVzaXplKGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXcpe1xyXG5cdFx0Y29uc3QgYWxsRGF5ID0gZXZlbnQuc3RhcnQuaGFzVGltZSgpID8gZmFsc2UgOiB0cnVlO1xyXG5cdFx0Ly8g6I635b6X5LqL5Lu25paH5qGj5pe26Ze05pWw5o2uXHJcblx0XHRjb25zdCBkb2MgPSBvYmpEYXRhYmFzZS5Eb2N1bWVudEZyb21HVUlEKGV2ZW50LmlkKTtcclxuXHRcdC8vIOiuoeeul+abtOaUueWQjueahOe7k+adn+aXtumXtFxyXG5cdFx0Y29uc3QgZXZlbnRFbmRTdHIgPSBldmVudC5lbmQuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHQvLyDmm7TmlrDmlofmoaPmlbDmja5cclxuXHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX0VORFwiLCBldmVudEVuZFN0cik7XHJcblx0XHR0aGlzLl91cGRhdGVEb2NNb2RpZnlEYXRlKGRvYyk7XHJcblx0fTtcclxuXHJcblx0Ly8g5Yib5bu65LqL5Lu2IHN0YXJ0LCBlbmQsIGpzRXZlbnQsIHZpZXdcclxuXHQvKipcclxuICAgICAqIOWIm+W7uuS6i+S7ti5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gc2VsZWN0aW9uRGF0YSBGdWxsQ2FsZW5kYXIg5Lyg5YWl55qE5pWw5o2uLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBzZWxlY3Rpb25EYXRhLnN0YXJ0IE1vbWVudCDnsbvml6XmnJ/lr7nosaEuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IHNlbGVjdGlvbkRhdGEuZW5kIE1vbWVudCDnsbvml6XmnJ/lr7nosaEuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IHNlbGVjdGlvbkRhdGEuanNFdmVudCBuYXRpdmUgSmF2YVNjcmlwdCDkuovku7YuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IHNlbGVjdGlvbkRhdGEudmlldyBGdWxsQ2FsZW5kYXIg6KeG5Zu+5a+56LGhLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSB1c2VySW5wdXRzIOeUqOaIt+S8oOWFpeeahOWFtuS7luS/oeaBry5cclxuICAgICAqIFRPRE86IOivpeaWueazleWPr+S7peaUvue9ruWIsENhbGVuZGFyRXZlbnTnmoTpnZnmgIHmlrnms5XkuIpcclxuICAgICAqL1xyXG5cdGNyZWF0ZUV2ZW50KHNlbGVjdGlvbkRhdGEsIHVzZXJJbnB1dHMpe1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Ly8g6I635Y+W55So5oi36K6+572uXHJcblx0XHRcdGNvbnN0IG5ld0V2ZW50ID0gbmV3IENhbGVuZGFyRXZlbnQoe1xyXG5cdFx0XHRcdHRpdGxlOiB1c2VySW5wdXRzLnRpdGxlID8gdXNlcklucHV0cy50aXRsZSA6ICfml6DmoIfpopgnLFxyXG5cdFx0XHRcdHN0YXJ0OiBzZWxlY3Rpb25EYXRhLnN0YXJ0LFxyXG5cdFx0XHRcdGVuZDogc2VsZWN0aW9uRGF0YS5lbmQsXHJcblx0XHRcdFx0YWxsRGF5OiBzZWxlY3Rpb25EYXRhLnN0YXJ0Lmhhc1RpbWUoKSAmJiBzZWxlY3Rpb25EYXRhLmVuZC5oYXNUaW1lKCkgPyBmYWxzZSA6IHRydWUsXHJcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiB1c2VySW5wdXRzLmNvbG9yID8gdXNlcklucHV0cy5jb2xvciA6ICcjMzJDRDMyJyxcclxuXHRcdFx0fSwgdGhpcy4kY2FsZW5kYXIpO1xyXG5cdFx0XHQvLyDkv53lrZjlubbmuLLmn5Pkuovku7ZcclxuXHRcdFx0bmV3RXZlbnQuc2F2ZVRvV2l6RXZlbnREb2MoKTtcclxuXHRcdFx0bmV3RXZlbnQucmVmZXRjaERhdGEoKTtcclxuXHRcdFx0bmV3RXZlbnQuYWRkVG9GdWxsQ2FsZW5kYXIoKTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtjb25zb2xlLmxvZyhlKX1cclxuXHR9XHJcblxyXG59XHJcblxyXG5cclxuLy8gVE9ETzog6YeN5YaZ6I635Y+W5pWw5o2u55qE5pa55byPXHJcbmZ1bmN0aW9uIF9nZXRXaXpFdmVudChzdGFydCwgZW5kKSB7XHJcblx0Ly9UT0RPOlxyXG5cdGxldCBldmVudHMgPSBbXTtcclxuXHRsZXQgRXZlbnRDb2xsZWN0aW9uID0gb2JqRGF0YWJhc2UuR2V0Q2FsZW5kYXJFdmVudHMyKHN0YXJ0LCBlbmQpO1xyXG5cdHJldHVybiBldmVudHNcclxufVxyXG5cclxuLy8g6I635b6X5riy5p+T5ZCO55qE6YeN5aSN5pel5pyfXHJcbmZ1bmN0aW9uIGdldFJlbmRlclJlcGVhdERheSgpe1xyXG5cdHZhciBkYXlBcnJheSA9IG5ldyBBcnJheSgpO1xyXG5cdHZhciBldmVudFN0YXJ0ID0gbmV3IERhdGUoX3MyZChnX2V2ZW50U3RhcnQpKTtcclxuXHRcdFxyXG5cdHN3aXRjaCAoZ19yZXBlYXRSdWxlKXtcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazFcIjpcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazJcIjpcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazNcIjpcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazRcIjpcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazVcIjpcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazZcIjpcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazdcIjpcclxuXHRcdFx0XHRnZXRXZWVrbHlSZXBlYXREYXkoZGF5QXJyYXksIFtnX3JlcGVhdFJ1bGUuY2hhckF0KDkpXSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2Vla2RheVwiOlxyXG5cdFx0XHRcdGdldFdlZWtseVJlcGVhdERheShkYXlBcnJheSwgWzEsIDIsIDMsIDQsIDVdKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnlXZWVrZGF5MTM1XCI6XHJcblx0XHRcdFx0Z2V0V2Vla2x5UmVwZWF0RGF5KGRheUFycmF5LCBbMSwgMywgNV0pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnlXZWVrZGF5MjRcIjpcclxuXHRcdFx0XHRnZXRXZWVrbHlSZXBlYXREYXkoZGF5QXJyYXksIFsyLCA0XSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJFdmVyeVdlZWtkYXk2N1wiOlxyXG5cdFx0XHRcdGdldFdlZWtseVJlcGVhdERheShkYXlBcnJheSwgWzYsIDddKTtcclxuXHRcdFx0XHRicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkRhaWx5XCI6XHJcblx0XHRcdFx0Z2V0V2Vla2x5UmVwZWF0RGF5KGRheUFycmF5LCBbMSwgMiwgMywgNCwgNSwgNiwgN10pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiV2Vla2x5XCI6Ly8g5q+P5ZGoXHJcblx0XHRcdFx0Z2V0V2Vla2x5UmVwZWF0RGF5KGRheUFycmF5LCBbZXZlbnRTdGFydC5nZXREYXkoKV0pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnkyV2Vla3NcIjpcclxuXHRcdFx0XHRnZXRXZWVrbHlSZXBlYXREYXkoZGF5QXJyYXksIFtldmVudFN0YXJ0LmdldERheSgpXSk7XHJcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkYXlBcnJheS5sZW5ndGg7ICsrIGkpe1xyXG5cdFx0XHRcdFx0dmFyIGludGVyID0gX2ludGVyRGF5cyhfZDJzKGV2ZW50U3RhcnQpLCBfZDJzKGRheUFycmF5W2ldWzBdKSk7XHJcblx0XHRcdFx0XHRpZiAoKHBhcnNlRmxvYXQoKGludGVyLTEpLzcuMCkgJSAyKSAhPSAwICl7XHJcblx0XHRcdFx0XHRcdGRheUFycmF5LnNwbGljZShpLCAxKTtcclxuXHRcdFx0XHRcdFx0aSAtLTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJNb250aGx5XCI6XHJcblx0XHRcdFx0Z2V0TW9udGhseVJlcGVhdERheShkYXlBcnJheSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJZZWFybHlcIjpcclxuXHRcdFx0XHRnZXRZZWFybHlSZXBlYXREYXkoZGF5QXJyYXkpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHQvLyBUT0RPOiDmsYnlrZfpnIDopoHogIPomZFcclxuICAgICAgICAgICAgY2FzZSBcIkNoaW5lc2VNb250aGx5XCI6XHJcbiAgICAgICAgICAgICAgICBnZXRDaGluZXNlUmVwZWF0RGF5KGRheUFycmF5LCAn5pyIJyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJDaGluZXNlWWVhcmx5XCI6XHJcbiAgICAgICAgICAgICAgICBnZXRDaGluZXNlUmVwZWF0RGF5KGRheUFycmF5LCAn5Y6GJyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGRlZmF1bHQ6e1xyXG5cdFx0XHRcdGlmIChnX3JlcGVhdFJ1bGUuaW5kZXhPZihcIkV2ZXJ5V2Vla1wiKSA9PSAwKXtcclxuXHRcdFx0XHRcdHZhciBkYXlzID0gZ19yZXBlYXRSdWxlLnN1YnN0cihcIkV2ZXJ5V2Vla1wiLmxlbmd0aCkuc3BsaXQoJycpO1xyXG5cdFx0XHRcdFx0Z2V0V2Vla2x5UmVwZWF0RGF5KGRheUFycmF5LCBkYXlzKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcblx0cmV0dXJuIGRheUFycmF5O1xyXG59XHJcblxyXG5cclxuLyog5pWw5o2u6I635Y+WXHJcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuXHJcbi8qIOadgumhueWSjOW3peWFt1xyXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcbi8vIOWIpOaWreWGheaguFxyXG5mdW5jdGlvbiBpc0Nocm9tZSgpIHtcclxuXHRpZiAoZ19pc0Nocm9tZSkgcmV0dXJuIGdfaXNDaHJvbWU7XHJcblx0Ly9cclxuXHR2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7XHJcblx0Z19pc0Nocm9tZSA9IHVhLmluZGV4T2YoJ2Nocm9tZScpICE9IC0xO1xyXG5cdC8vXHJcblx0cmV0dXJuIGdfaXNDaHJvbWU7XHJcbn1cclxuXHJcbi8vIOWwhuaVtOaVsOi9rOaNouaIkOaXpeacn+Wtl+espuS4slxyXG5mdW5jdGlvbiBmb3JtYXRJbnRUb0RhdGVTdHJpbmcobil7XHJcblx0XHRcclxuXHRyZXR1cm4gbiA8IDEwID8gJzAnICsgbiA6IG47XHJcbn1cclxuXHJcbi8vIOajgOafpeWPiuWinuWKoOaVsOWAvOWtl+espuS4sumVv+W6pu+8jOS+i+Wmgu+8micyJyAtPiAnMDInXHJcbmZ1bmN0aW9uIGNoZWNrQW5kQWRkU3RyTGVuZ3RoKHN0cikge1xyXG5cdGlmIChzdHIubGVuZ3RoIDwgMikge1xyXG5cdFx0cmV0dXJuICcwJyArIHN0cjtcclxuXHR9IGVsc2Uge1xyXG5cdFx0cmV0dXJuIHN0cjtcclxuXHR9XHJcbn1cclxuXHJcbi8vIOWwhuWtl+espuS4sui9rOWMluS4uuaXpeacn+WvueixoVxyXG5mdW5jdGlvbiBfczJkKHN0cil7XHJcblx0aWYgKCFzdHIpXHJcblx0XHRyZXR1cm4gJyc7XHJcblx0dmFyIGRhdGUgPSBuZXcgRGF0ZShzdHIuc3Vic3RyKDAsIDQpLFxyXG5cdFx0XHRcdFx0c3RyLnN1YnN0cig1LCAyKSAtIDEsXHJcblx0XHRcdFx0XHRzdHIuc3Vic3RyKDgsIDMpLFxyXG5cdFx0XHRcdFx0c3RyLnN1YnN0cigxMSwgMiksXHJcblx0XHRcdFx0XHRzdHIuc3Vic3RyKDE0LCAyKSxcclxuXHRcdFx0XHRcdHN0ci5zdWJzdHIoMTcsIDIpXHJcblx0XHRcdFx0XHQpO1x0XHRcclxuXHRyZXR1cm4gZGF0ZTtcclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBjb2xvckNvdW50OiAxMixcclxuICAgIGNvbG9ySXRlbXM6IFtcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiMzMkNEMzJcIiwgXCJjb2xvck5hbWVcIjogJ+aphOamhOe7vycgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiM1NDg0RURcIiwgXCJjb2xvck5hbWVcIjogJ+Wuneefs+iTnScgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNBNEJERkVcIiwgXCJjb2xvck5hbWVcIjogJ+iTneiJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiM0NkQ2REJcIiwgXCJjb2xvck5hbWVcIjogJ+mdkue7v+iJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiM3QUU3QkZcIiwgXCJjb2xvck5hbWVcIjogJ+e7v+iJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiM1MUI3NDlcIiwgXCJjb2xvck5hbWVcIjogJ+a4heaWsOe7vycgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNGQkQ3NUJcIiwgXCJjb2xvck5hbWVcIjogJ+m7hOiJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNGRkI4NzhcIiwgXCJjb2xvck5hbWVcIjogJ+apmOiJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNGRjg4N0NcIiwgXCJjb2xvck5hbWVcIjogJ+e6ouiJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNEQzIxMjdcIiwgXCJjb2xvck5hbWVcIjogJ+WlouWNjue6oicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNEQkFERkZcIiwgXCJjb2xvck5hbWVcIjogJ+e0q+iJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNFMUUxRTFcIiwgXCJjb2xvck5hbWVcIjogJ+eBsOiJsicgfVxyXG4gICAgXSxcclxuXHJcbn0iLCIvL1RPRE86IOWIpOaWrXdpbmRvdy5leHRlcm5hbOaYr+WQpuS4uldpekh0bWxFZGl0b3JBcHBcclxuY29uc3QgV2l6RXhwbG9yZXJBcHAgPSB3aW5kb3cuZXh0ZXJuYWw7XHJcbmNvbnN0IFdpekV4cGxvcmVyV2luZG93ID0gV2l6RXhwbG9yZXJBcHAuV2luZG93O1xyXG5jb25zdCBXaXpEYXRhYmFzZSA9IFdpekV4cGxvcmVyQXBwLkRhdGFiYXNlO1xyXG5jb25zdCBXaXpDb21tb25VSSA9IFdpekV4cGxvcmVyQXBwLkNyZWF0ZVdpek9iamVjdChcIldpektNQ29udHJvbHMuV2l6Q29tbW9uVUlcIik7XHJcblxyXG5mdW5jdGlvbiBXaXpDb25maXJtKG1zZywgdGl0bGUpIHtcclxuICAgIHJldHVybiBXaXpFeHBsb3JlcldpbmRvdy5TaG93TWVzc2FnZShtc2csIHRpdGxlLCAweDAwMDAwMDIwIHwgMHgwMDAwMDAwMSkgPT0gMTtcclxufVxyXG5cclxuZnVuY3Rpb24gV2l6QWxlcnQobXNnKSB7XHJcbiAgICBXaXpFeHBsb3JlcldpbmRvdy5TaG93TWVzc2FnZShtc2csIFwie3B9XCIsIDB4MDAwMDAwNDApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBXaXpCdWJibGVNZXNzYWdlKHRpdGxlLCBtc2csIGNvbG9yID0gJyNGRkZBOUQnLCBkZWxheSA9ICczJykge1xyXG4gICAgY29uc3QgYXBwUGF0aCA9IFdpekNvbW1vblVJLkdldFNwZWNpYWxGb2xkZXIoXCJBcHBQYXRoXCIpO1xyXG4gICAgLy9cclxuICAgIGNvbnN0IHdpelNoZWxsRmlsZU5hbWUgPSBhcHBQYXRoICsgXCJXaXouZXhlXCI7XHJcbiAgICBjb25zdCBkbGxGaWxlTmFtZSA9IGFwcFBhdGggKyBcIldpelRvb2xzLmRsbFwiO1xyXG4gICAgLy9cclxuICAgIGNvbnN0IHBhcmFtcyA9IGBcIiR7ZGxsRmlsZU5hbWV9XCIgV2l6VG9vbHNTaG93QnViYmxlV2luZG93MkV4IC9UaXRsZT0ke3RpdGxlfSAvTGlua1RleHQ9JHttc2d9IC9MaW5rVVJMPUAgL0NvbG9yPSR7Y29sb3J9IC9EZWxheT0ke2RlbGF5fWA7XHJcbiAgICAvL1xyXG4gICAgV2l6Q29tbW9uVUkuUnVuRXhlKHdpelNoZWxsRmlsZU5hbWUsIHBhcmFtcywgZmFsc2UpO1xyXG59XHJcblxyXG5jbGFzcyBXaXpTaGVsbCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZGxsRmlsZU5hbWUsIGRsbEV4cG9ydEZ1bmMsIHBhcmFtcykge1xyXG4gICAgICAgIC8v5L2/55SoZGxs5a+85Ye65Ye95pWw77yM5aSn6YOo5YiG5YWl5Y+C5pe25ZG95Luk6KGM5pa55byP77yM5YW35L2T5Y+C5pWw5rKh5pyJ6K+05piO77yM5pyJ6ZyA6KaB6IGU57O75byA5Y+R5Lq65ZGYXHJcbiAgICAgICAgY29uc3QgYXBwUGF0aCA9IFdpekNvbW1vblVJLkdldFNwZWNpYWxGb2xkZXIoXCJBcHBQYXRoXCIpO1xyXG4gICAgICAgIHRoaXMuYXBwUGF0aCA9IGFwcFBhdGhcclxuICAgICAgICB0aGlzLndpekV4ZSA9IGFwcFBhdGggKyBcIldpei5leGVcIjtcclxuICAgICAgICB0aGlzLmRsbEZpbGVOYW1lID0gZGxsRmlsZU5hbWUgPyBhcHBQYXRoICsgZGxsRmlsZU5hbWUgOiBhcHBQYXRoICsgJ1dpektNQ29udHJvbHMuZGxsJztcclxuICAgICAgICB0aGlzLmRsbEV4cG9ydEZ1bmMgPSBkbGxFeHBvcnRGdW5jIHx8ICdXaXpLTVJ1blNjcmlwdCc7XHJcbiAgICAgICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7XHJcbiAgICB9XHJcblxyXG4gICAgcnVuU2NyaXB0RmlsZShzY3JpcHRGaWxlTmFtZSwgc2NyaXB0UGFyYW1zKSB7XHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0gYFwiJHt0aGlzLmFwcFBhdGggKyAnV2l6S01Db250cm9scy5kbGwnfVwiIFdpektNUnVuU2NyaXB0IC9TY3JpcHRGaWxlTmFtZT0ke3NjcmlwdEZpbGVOYW1lfSAke3NjcmlwdFBhcmFtc31gO1xyXG4gICAgICAgIFdpekNvbW1vblVJLlJ1bkV4ZSh0aGlzLndpekV4ZSwgcGFyYW1zLCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgd2l6QnViYmxlTWVzc2FnZSh0aXRsZSwgbXNnLCBjb2xvciA9ICcjRkZGQTlEJywgZGVsYXkgPSAnMycpIHtcclxuICAgICAgICBXaXpCdWJibGVNZXNzYWdlKHRpdGxlLCBtc2csIGNvbG9yLCBkZWxheSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldFdpekludGVyZmFjZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBXaXpFeHBsb3JlckFwcCwgV2l6RXhwbG9yZXJXaW5kb3csIFdpekRhdGFiYXNlLCBXaXpDb21tb25VSVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgXHJcbiAgICBXaXpFeHBsb3JlckFwcCwgXHJcbiAgICBXaXpFeHBsb3JlcldpbmRvdywgXHJcbiAgICBXaXpEYXRhYmFzZSwgXHJcbiAgICBXaXpDb21tb25VSSwgXHJcbiAgICBXaXpDb25maXJtLCBcclxuICAgIFdpekFsZXJ0LCBcclxuICAgIFdpekJ1YmJsZU1lc3NhZ2UsIFxyXG4gICAgV2l6U2hlbGwgXHJcbn07XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=