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
/******/ 	var hotCurrentHash = "b635714828fc26fb6edb"; // eslint-disable-line no-unused-vars
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

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

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

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _FullCalendar = __webpack_require__(/*! ./FullCalendar */ "./src/components/Calendar/FullCalendar.js");

var _FullCalendar2 = _interopRequireDefault(_FullCalendar);

__webpack_require__(/*! fullcalendar-reactwrapper/dist/css/fullcalendar.min.css */ "./node_modules/fullcalendar-reactwrapper/dist/css/fullcalendar.min.css");

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

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

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

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

__webpack_require__(/*! ./EventPopover.css */ "./src/components/EventPopover/EventPopover.css");

var _popper = __webpack_require__(/*! popper.js */ "./node_modules/popper.js/dist/esm/popper.js");

var _popper2 = _interopRequireDefault(_popper);

var _PopoverTitleInput = __webpack_require__(/*! ./PopoverTitleInput */ "./src/components/EventPopover/PopoverTitleInput.js");

var _PopoverTitleInput2 = _interopRequireDefault(_PopoverTitleInput);

var _PopoverToolbar = __webpack_require__(/*! ./PopoverToolbar */ "./src/components/EventPopover/PopoverToolbar.js");

var _PopoverToolbar2 = _interopRequireDefault(_PopoverToolbar);

var _reactBootstrap = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");

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

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

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

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactBootstrap = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");

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

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");

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

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

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

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactBootstrap = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");

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

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");

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

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");

var _RepeatRuleSelectGroup = __webpack_require__(/*! ./RepeatRuleSelectGroup */ "./src/components/Form/RepeatRuleSelectGroup.js");

var _RepeatRuleSelectGroup2 = _interopRequireDefault(_RepeatRuleSelectGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function EventRepeatForm(props) {

    return _react2.default.createElement(
        _reactBootstrap.Form,
        { horizontal: true },
        _react2.default.createElement(_RepeatRuleSelectGroup2.default, { horizontal: true,
            label: '\u91CD\u590D\u89C4\u5219',
            rptRule: 'Weekly'
        })
    );
}

/***/ }),

/***/ "./src/components/Form/RepeatRuleSelectGroup.js":
/*!******************************************************!*\
  !*** ./src/components/Form/RepeatRuleSelectGroup.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");

var _SelectPickerGroup = __webpack_require__(/*! ./SelectPickerGroup */ "./src/components/Form/SelectPickerGroup.js");

var _AutoFormGroup = __webpack_require__(/*! ./AutoFormGroup */ "./src/components/Form/AutoFormGroup.js");

var _AutoFormGroup2 = _interopRequireDefault(_AutoFormGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventRepeatForm = function (_React$Component) {
    _inherits(EventRepeatForm, _React$Component);

    function EventRepeatForm(props) {
        _classCallCheck(this, EventRepeatForm);

        var _this = _possibleConstructorReturn(this, (EventRepeatForm.__proto__ || Object.getPrototypeOf(EventRepeatForm)).call(this, props));

        _this.state = {
            rptRule: _this.props.rptRule,
            disableWeekSelect: true
        };
        _this.handleRptBaseRuleChange = _this.handleRptBaseRuleChange.bind(_this);
        _this.handleWeekDayChange = _this.handleWeekDayChange.bind(_this);
        return _this;
    }

    _createClass(EventRepeatForm, [{
        key: 'handleRptBaseRuleChange',
        value: function handleRptBaseRuleChange(newSelection) {
            switch (newSelection) {
                case 'EveryWeek':
                case 'Every2Week':
                    this.setState({
                        disableWeekSelect: false
                    });
                    break;
                default:
                    this.setState({
                        disableWeekSelect: true
                    });
                    break;
            }
        }
    }, {
        key: 'handleWeekDayChange',
        value: function handleWeekDayChange(newSelection) {
            console.log(newSelection);
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
                _react2.default.createElement(
                    _reactBootstrap.Row,
                    null,
                    _react2.default.createElement(
                        _reactBootstrap.Col,
                        { sm: 4 },
                        _react2.default.createElement(
                            _SelectPickerGroup.SelectPicker,
                            {
                                title: '\u8BF7\u9009\u62E9\u91CD\u590D\u89C4\u5219',
                                value: 'Weekly',
                                width: 'auto',
                                onSelectionChange: this.handleRptBaseRuleChange
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
                        )
                    ),
                    _react2.default.createElement(
                        _reactBootstrap.Col,
                        { sm: 8 },
                        _react2.default.createElement(
                            _SelectPickerGroup.SelectPicker,
                            {
                                multiple: true,
                                width: '80%',
                                disabled: this.state.disableWeekSelect,
                                title: '\u9009\u62E9\u91CD\u590D\u7684\u661F\u671F',
                                onSelectionChange: this.handleWeekDayChange
                            },
                            _react2.default.createElement(
                                'option',
                                { value: '1' },
                                '\u661F\u671F\u4E00'
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: '2' },
                                '\u661F\u671F\u4E8C'
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: '3' },
                                '\u661F\u671F\u4E09'
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: '4' },
                                '\u661F\u671F\u56DB'
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: '5' },
                                '\u661F\u671F\u4E94'
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: '6' },
                                '\u661F\u671F\u516D'
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: '7' },
                                '\u661F\u671F\u65E5'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return EventRepeatForm;
}(_react2.default.Component);

exports.default = EventRepeatForm;

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
exports.SelectPicker = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = SelectPickerGroup;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");

var _AutoFormGroup = __webpack_require__(/*! ./AutoFormGroup */ "./src/components/Form/AutoFormGroup.js");

var _AutoFormGroup2 = _interopRequireDefault(_AutoFormGroup);

__webpack_require__(/*! bootstrap/js/dropdown */ "./node_modules/bootstrap/js/dropdown.js");

__webpack_require__(/*! bootstrap-select */ "./node_modules/bootstrap-select/dist/js/bootstrap-select.js");

__webpack_require__(/*! bootstrap-select/dist/css/bootstrap-select.css */ "./node_modules/bootstrap-select/dist/css/bootstrap-select.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectPicker = exports.SelectPicker = function (_React$Component) {
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
            var _props = this.props,
                _props$title = _props.title,
                title = _props$title === undefined ? '' : _props$title,
                _props$width = _props.width,
                width = _props$width === undefined ? false : _props$width,
                multiple = _props.multiple,
                disabled = _props.disabled;
            // 初始化组件

            this.$el = $(this.el);
            this.$el.val(this.props.value);
            this.$el.prop('title', title);
            this.$el.prop('multiple', multiple);
            this.$el.prop('disabled', disabled);
            this.$el.selectpicker({
                style: 'btn-default',
                width: width
            });
            //
            this.instance = this.$el.data('selectpicker');
            // 绑定change事件
            this.$el.on("changed.bs.select", this.handleChange);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState, snapshot) {
            var disabled = this.props.disabled;

            this.$el.prop('disabled', disabled);
            if (disabled) {
                this.$el.val('');
            }
            this.$el.selectpicker('refresh');
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

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");

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

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");

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

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");

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

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");

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


var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");

var _reactDom2 = _interopRequireDefault(_reactDom);

__webpack_require__(/*! fullcalendar-reactwrapper/dist/css/fullcalendar.min.css */ "./node_modules/fullcalendar-reactwrapper/dist/css/fullcalendar.min.css");

__webpack_require__(/*! bootstrap/dist/css/bootstrap.css */ "./node_modules/bootstrap/dist/css/bootstrap.css");

__webpack_require__(/*! bootstrap/dist/css/bootstrap-theme.css */ "./node_modules/bootstrap/dist/css/bootstrap-theme.css");

__webpack_require__(/*! @fortawesome/fontawesome-free/css/all.css */ "./node_modules/@fortawesome/fontawesome-free/css/all.css");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQ2FsZW5kYXIvQ2FsZW5kYXIuY3NzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0V2ZW50UG9wb3Zlci9FdmVudFBvcG92ZXIuY3NzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0V2ZW50UG9wb3Zlci9Qb3BvdmVyVGl0bGVJbnB1dC5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZSBzeW5jIF5cXC5cXC8uKiQiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9DYWxlbmRhci9DYWxlbmRhci5jc3M/Y2ExNCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9DYWxlbmRhci9DYWxlbmRhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9DYWxlbmRhci9GdWxsQ2FsZW5kYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRXZlbnRQb3BvdmVyL0V2ZW50UG9wb3Zlci5jc3M/NTg1ZiIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9FdmVudFBvcG92ZXIvRXZlbnRQb3BvdmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0V2ZW50UG9wb3Zlci9Qb3BvdmVyVGl0bGVJbnB1dC5jc3M/M2UzNiIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9FdmVudFBvcG92ZXIvUG9wb3ZlclRpdGxlSW5wdXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRXZlbnRQb3BvdmVyL1BvcG92ZXJUb29sYmFyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0Zvcm0vQXV0b0Zvcm1Hcm91cC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Gb3JtL0NvbG9yUGlja2VyR3JvdXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRm9ybS9EYXRlVGltZVBpY2tlckdyb3VwLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0Zvcm0vRXZlbnREZXRhaWxGb3JtLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0Zvcm0vRXZlbnRSZXBlYXRGb3JtLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0Zvcm0vUmVwZWF0UnVsZVNlbGVjdEdyb3VwLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0Zvcm0vU2VsZWN0UGlja2VyR3JvdXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRm9ybS9UaXRsZUlucHV0R3JvdXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvTW9kYWwvRXZlbnRDcmVhdGVNb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Nb2RhbC9FdmVudEVkaXRNb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Nb2RhbC9FdmVudE1vZGFsLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5jc3M/ZDhjMyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVscy9DYWxlbmRhckV2ZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9tb2RlbHMvV2l6RXZlbnREYXRhTG9hZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9Db25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL1dpekludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvdXRpbHMuanMiXSwibmFtZXMiOlsiQXBwIiwicHJvcHMiLCJkYXRhTG9hZGVyIiwiV2l6RXZlbnREYXRhTG9hZGVyIiwic3RhdGUiLCJpc1Nob3dpbmdFdmVudCIsImlzRWRpdGluZ0V2ZW50IiwiaXNDcmVhdGluZ0V2ZW50IiwiY2xpY2tlZEFyZ3MiLCJlZGl0aW5nRXZlbnQiLCJzZWxlY3RlZFJhbmdlIiwiaGFuZGxlQ2FsZW5kYXJSZW5kZXIiLCJiaW5kIiwiaGFuZGxlRXZlbnRDbGljayIsImhhbmRsZVZpZXdSZW5kZXIiLCJoYW5kbGVFdmVudERyb3AiLCJoYW5kbGVFdmVudFJlc2l6ZSIsImhhbmRsZUV2ZW50UmVuZGVyIiwiaGFuZGxlUG9wb3ZlckhpZGUiLCJoYW5kbGVEYXRlU2VsZWN0IiwiaGFuZGxlTW9kYWxDbG9zZSIsImhhbmRsZUV2ZW50Q3JlYXRlIiwiaGFuZGxlRXZlbnRTYXZlIiwiaGFuZGxlRXZlbnRFZGl0IiwiaGFuZGxlRXZlbnRDb21wbGV0ZSIsImhhbmRsZUV2ZW50RGVsZXRlRGF0YSIsImhhbmRsZUV2ZW50RGVsZXRlRG9jIiwiaGFuZGxlRXZlbnRPcGVuRG9jIiwiaGFuZGxlRXZlbnRFZGl0T3JpZ2luRGF0YSIsImVsIiwiY2FsZW5kYXIiLCJldmVudCIsImpzRXZlbnQiLCJ2aWV3IiwiYXJncyIsInNldFN0YXRlIiwiZWxlbWVudCIsIiRjYWxlbmRhciIsIiQiLCJldmVudFNvdXJjZXMiLCJnZXRFdmVudFNvdXJjZXMiLCJmdWxsQ2FsZW5kYXIiLCJpIiwibGVuZ3RoIiwiZGVsdGEiLCJyZXZlcnRGdW5jIiwidWkiLCJpZCIsInVwZGF0ZUV2ZW50RGF0YU9uRHJvcCIsInVwZGF0ZUV2ZW50RGF0YU9uUmVzaXplIiwiZXZlbnRPYmoiLCIkZWwiLCJyZ2JTdHJpbmciLCJjc3MiLCJyZ2JBcnJheSIsImV4ZWMiLCJoc2wiLCJsaWdodG5lc3MiLCJNYXRoIiwiY29zIiwiUEkiLCJ0ZXh0Q29sb3IiLCJpc0NvbXBsZXRlIiwicGFyc2VJbnQiLCJjb21wbGV0ZSIsImFkZENsYXNzIiwic3RhcnQiLCJlbmQiLCJldmVudERhdGEiLCJhbGxEYXkiLCJ0aXRsZSIsImJhY2tncm91bmRDb2xvciIsIm1vbWVudCIsImhhc1RpbWUiLCJuZXdFdmVudCIsIkNhbGVuZGFyRXZlbnQiLCJzYXZlVG9XaXpFdmVudERvYyIsImV2ZW50cyIsInRvRnVsbENhbGVuZGFyRXZlbnQiLCJuZXdFdmVudERhdGEiLCJwcm9wIiwiZGVsZXRlRXZlbnREYXRhIiwiZG9jIiwib2JqRGF0YWJhc2UiLCJEb2N1bWVudEZyb21HVUlEIiwib2JqV2luZG93IiwiVmlld0RvY3VtZW50Iiwib2JqQ29tbW9uIiwiRWRpdENhbGVuZGFyRXZlbnQiLCJwYWdlWCIsInRhcmdldCIsIlJlYWN0IiwiQ29tcG9uZW50IiwiQ2FsZW5kYXIiLCJoYW5kbGVGdWxsQ2FsZW5kYXJSZW5kZXIiLCJvbkNhbGVuZGFyUmVuZGVyIiwibGVmdCIsImNlbnRlciIsInJpZ2h0IiwidG9kYXkiLCJtb250aCIsIndlZWsiLCJkYXkiLCJsaXN0IiwiYWdlbmRhIiwibWluVGltZSIsInNsb3RMYWJlbEZvcm1hdCIsIm9uU2VsZWN0Iiwib25WaWV3UmVuZGVyIiwib25FdmVudFJlbmRlciIsIm9uRXZlbnRDbGljayIsIm9uRXZlbnREcm9wIiwib25FdmVudFJlc2l6ZSIsIkZ1bGxjYWxlbmRhck9iamVjdE1hcHBlciIsInByb3BlcnRpZXMiLCJuZXdTZXR0aW5ncyIsImtleSIsImhhc093blByb3BlcnR5IiwiRnVsbENhbGVuZGFyIiwianEiLCJub0NvbmZsaWN0IiwiZnVsbGNhbGVuZGFyT2JqZWN0TWFwcGVyIiwiaW5zdGFuY2UiLCJkYXRlIiwiRGF0ZSIsIm9uRnVsbENhbGVuZGFyUmVuZGVyIiwib2JqZWN0TWFwcGVyU2V0dGluZ3MiLCJnZXRTZXR0aW5ncyIsIkV2ZW50UG9wb3ZlciIsInBvcHBlck5vZGUiLCJwb3BwZXJJbnN0YW5jZSIsImF1dG9IaWRlIiwiaGFuZGxlRGF0ZVRpbWVDaGFuZ2UiLCJoYW5kbGVUaXRsZUNoYW5nZSIsImhhbmRsZUNvbG9yQ2hhbmdlIiwiaGFuZGxlQnRuQ2xpY2siLCJlIiwicmVmZXJlbmNlIiwiaXMiLCJoYXMiLCJoaWRlIiwidGhhdCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwib25Qb3BvdmVySGlkZSIsImZhZGVJbiIsIm5ld1RpdGxlIiwidmFsdWUiLCJwcmV2U3RhdGUiLCJleHRlbmQiLCJjb2xvclZhbHVlIiwibmV3Q29sb3IiLCJidG5UeXBlIiwic3BsaXQiLCJoYW5kbGVOYW1lIiwidGhlbiIsInJldCIsIlBvcHBlciIsInBsYWNlbWVudCIsIm1vZGlmaWVycyIsImFycm93IiwiZG9jdW1lbnQiLCJvZmYiLCJvbiIsInNob3ciLCJwcmV2UHJvcHMiLCJzbmFwc2hvdCIsIm5leHRQcm9wcyIsIm5leHRTdGF0ZSIsInVwZGF0ZSIsImRlc3Ryb3kiLCJldmVudFN0YXJ0IiwiZm9ybWF0IiwiZW5hYmxlU2F2ZUJ0biIsImRpc3BsYXkiLCJkaXYiLCJFdmVudFRpdGxlSW5wdXQiLCJldmVudFRpdGxlIiwiaGFuZGxlQ2hhbmdlIiwib25UaXRsZUNoYW5nZSIsInRhcmdldEZvcm0iLCJQb3BvdmVyVG9vbGJhciIsIm9uQnRuQ2xpY2siLCJBdXRvRm9ybUdyb3VwIiwiaXNIb3Jpem9udGFsIiwiaG9yaXpvbnRhbCIsImNvbnRyb2xJZCIsIkNvbnRyb2xMYWJlbCIsImxhYmVsIiwiY2hpbGRyZW4iLCJIdWViZWUiLCJyZXF1aXJlIiwiQ29sb3JJbnB1dCIsImpzRXZlbnRPclZhbHVlIiwibmV3Q29sb3JWYWx1ZSIsIm9uQ29sb3JDaGFuZ2UiLCJodWViZWVJbnN0YW5jZSIsInN0YXRpY09wZW4iLCJzZXRUZXh0Iiwic2V0QkdDb2xvciIsImh1ZXMiLCJodWUwIiwic2hhZGVzIiwic2F0dXJhdGlvbnMiLCJub3RhdGlvbiIsImNsYXNzTmFtZSIsImN1c3RvbUNvbG9ycyIsInNldENvbG9yIiwiQ29sb3JQaWNrZXJHcm91cCIsIkRhdGVUaW1lSW5wdXQiLCJuZXdEYXRlVmFsdWUiLCJvbkRhdGVUaW1lQ2hhbmdlIiwicmVhZE9ubHkiLCJkYXRldGltZXBpY2tlciIsInNob3dUb2RheUJ1dHRvbiIsImxvY2FsZSIsImRhdGEiLCJEYXRlVGltZVBpY2tlckdyb3VwIiwiRXZlbnREZXRhaWxGb3JtIiwiaGFuZGxlU3RhcnRDaGFuZ2UiLCJvblN0YXJ0Q2hhbmdlIiwiaGFuZGxlRW5kQ2hhbmdlIiwib25FbmRDaGFuZ2UiLCJvbkNvbG9yY2hhbmdlIiwiRXZlbnRSZXBlYXRGb3JtIiwicnB0UnVsZSIsImRpc2FibGVXZWVrU2VsZWN0IiwiaGFuZGxlUnB0QmFzZVJ1bGVDaGFuZ2UiLCJoYW5kbGVXZWVrRGF5Q2hhbmdlIiwibmV3U2VsZWN0aW9uIiwiY29uc29sZSIsImxvZyIsIlNlbGVjdFBpY2tlckdyb3VwIiwiU2VsZWN0UGlja2VyIiwiY2xpY2tlZEluZGV4IiwibmV3VmFsdWUiLCJvbGRWYWx1ZSIsImZpbmQiLCJlcSIsInZhbCIsIm9uU2VsZWN0aW9uQ2hhbmdlIiwid2lkdGgiLCJtdWx0aXBsZSIsImRpc2FibGVkIiwic2VsZWN0cGlja2VyIiwic3R5bGUiLCJUaXRsZUlucHV0R3JvdXAiLCJhdXRvRm9jdXMiLCJFdmVudENyZWF0ZU1vZGFsIiwibmV3UnB0QmFzZVJ1bGUiLCJvbkV2ZW50Q3JlYXRlIiwib25Nb2RhbENsb3NlIiwiTW9kYWxUb29sYmFyIiwidGV4dEFsaWduIiwiRXZlbnRFZGl0TW9kYWwiLCJpc0VtcHR5T2JqZWN0IiwiTmF2SGVhZGVyIiwiYm9yZGVyQm90dG9tIiwicGFkZGluZyIsIlRhYkJvZHkiLCJUb29sYmFyRm9vdGVyIiwiRXZlbnRNb2RhbCIsIkNoaWxkcmVuIiwiZm9yRWFjaCIsInRoaXNBcmciLCJuYW1lIiwidHlwZSIsIlJlYWN0RE9NIiwicmVuZGVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJnX2RiIiwiRXJyb3IiLCJfY2hlY2tEYXRhVHlwZSIsIl9jcmVhdGUiLCJHZXRQYXJhbVZhbHVlIiwiRGF0ZUNyZWF0ZWQiLCJHVUlEIiwiVGl0bGUiLCJEYXRlTW9kaWZpZWQiLCJlcnJvciIsImJrQ29sb3IiLCJkYXRlQ29tcGxldGVkIiwicnB0RW5kIiwiX0luZm8iLCJfcGFyc2VJbmZvIiwiQ0FMRU5EQVJfSU5GTyIsIl9FeHRyYUluZm8iLCJDQUxFTkRBUl9FWFRSQUlORk8iLCJfZ2V0RGVmYXVsdEV4dHJhSW5mbyIsImd1aWQiLCJDQUxFTkRBUl9TVEFSVCIsIkNBTEVOREFSX0VORCIsImNpIiwiYiIsIkNvbmZpZyIsImNvbG9ySXRlbXMiLCJpbmRleE9mIiwiQ29tcGxldGUiLCJEYXRlQ29tcGxldGVkIiwiQ0FMRU5EQVJfUkVDVVJSRU5DRSIsIkNBTEVOREFSX0VORFJFQ1VSUkVOQ0UiLCJjcmVhdGVkIiwidXBkYXRlZCIsIl91cGRhdGUiLCJvYmpDbGFzcyIsImNvbnN0cnVjdG9yIiwiR1VJRF9SZWdFeHIiLCJTdHJpbmciLCJ0ZXN0IiwiT2JqZWN0IiwiSW5mb1N0cmluZyIsIkluZm9PYmplY3QiLCJJbmZvQXJyYXkiLCJpdGVtIiwiaW5kZXgiLCJhcnIiLCJwYWlyIiwiSW5mb09iamVjdEtleXNBcnJheSIsImtleXMiLCJzaW5nbGVJbmZvIiwicHVzaCIsImpvaW4iLCJyZXBsYWNlIiwiX3VwZGF0ZUluZm8iLCJfdXBkYXRlRXh0cmFJbmZvIiwiRXh0cmFJbmZvT2JqZWN0IiwiY29udGVudCIsImh0bWxUZXh0IiwiZXZlbnRTb3VyY2UiLCJkYXlBcnJheSIsIl9nZXRSZW5kZXJSZXBlYXREYXkiLCJhZGQiLCJkaWZmIiwicmVnZXgiLCJjb3VudCIsImN1cldlZWtEYXkiLCJyZXN1bHRzIiwiaW50ZXJXZWVrIiwibnVtYmVyIiwiX2dldFdlZWtseVJlcGVhdERheSIsInBlclJ1bGUiLCJfZ2V0UGVyUmVwZWF0RGF5cyIsImludGVyV2Vla3MiLCJ2aWV3U3RhcnQiLCJ2aWV3RW5kIiwiaW50ZXJ2YWxXZWVrcyIsIndlZWtkYXlzIiwibmV3RXZlbnRTdGFydERhdGUiLCJzZXQiLCJnZXQiLCJpc1NhbWUiLCJpc0JlZm9yZSIsInBlclJ1bGVNYXAiLCJfc3RyaW5naWZ5SW5mbyIsInN0YXJ0U3RyIiwiZW5kU3RyIiwiX3NldFBhcmFtVmFsdWUiLCJTZXRQYXJhbVZhbHVlIiwibG9jYXRpb24iLCJvYmpGb2xkZXIiLCJHZXRGb2xkZXJCeUxvY2F0aW9uIiwidGVtcEh0bWwiLCJnX2NtbiIsIkdldEFUZW1wRmlsZU5hbWUiLCJfZ2V0RXZlbnRIdG1sIiwiU2F2ZVRleHRUb0ZpbGUiLCJDcmVhdGVEb2N1bWVudDIiLCJDaGFuZ2VUaXRsZUFuZEZpbGVOYW1lIiwiVXBkYXRlRG9jdW1lbnQ2IiwidG9XaXpFdmVudERhdGEiLCJBZGRUb0NhbGVuZGFyIiwiZ3VpZFJlZ2V4IiwiaXNXaXpEb2NFeGlzdCIsIl9zYXZlQWxsUHJvcCIsIl9jcmVhdGVXaXpFdmVudERvYyIsImlzRGVsZXRlRG9jIiwiUmVtb3ZlRnJvbUNhbGVuZGFyIiwiRGVsZXRlIiwiRGF0YWJhc2UiLCJ1c2VyTmFtZSIsIlVzZXJOYW1lIiwiZ2VuZXJhbEV2ZW50U291cmNlIiwiX2dldEFsbE9yaWdpbmFsRXZlbnQiLCJyZXBlYXRFdmVudFNvdXJjZXMiLCJfZ2V0QWxsUmVwZWF0RXZlbnQiLCJjb25jYXQiLCJzcWwiLCJhbmQxIiwiYW5kMiIsIkRvY3VtZW50c0RhdGFGcm9tU1FMIiwib2JqIiwiSlNPTiIsInBhcnNlIiwiQXJyYXkiLCJpc0FycmF5IiwiZXJyIiwicmVwZWF0RXZlbnRzIiwiZ2VuZXJhdGVSZXBlYXRFdmVudHMiLCJfdXBkYXRlRG9jTW9kaWZ5RGF0ZSIsIm5vdyIsInNldFNlY29uZHMiLCJnZXRTZWNvbmRzIiwiX2QycyIsImR0IiwiZ2V0RnVsbFllYXIiLCJmb3JtYXRJbnRUb0RhdGVTdHJpbmciLCJnZXRNb250aCIsImdldERhdGUiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJldmVudEVuZFN0ciIsInNlbGVjdGlvbkRhdGEiLCJ1c2VySW5wdXRzIiwiY29sb3IiLCJyZWZldGNoRGF0YSIsIl9nZXRXaXpFdmVudCIsIkV2ZW50Q29sbGVjdGlvbiIsIkdldENhbGVuZGFyRXZlbnRzMiIsImdldFJlbmRlclJlcGVhdERheSIsIl9zMmQiLCJnX2V2ZW50U3RhcnQiLCJnX3JlcGVhdFJ1bGUiLCJnZXRXZWVrbHlSZXBlYXREYXkiLCJjaGFyQXQiLCJnZXREYXkiLCJpbnRlciIsIl9pbnRlckRheXMiLCJwYXJzZUZsb2F0Iiwic3BsaWNlIiwiZ2V0TW9udGhseVJlcGVhdERheSIsImdldFllYXJseVJlcGVhdERheSIsImdldENoaW5lc2VSZXBlYXREYXkiLCJkYXlzIiwic3Vic3RyIiwiaXNDaHJvbWUiLCJnX2lzQ2hyb21lIiwidWEiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJ0b0xvd2VyQ2FzZSIsIm4iLCJjaGVja0FuZEFkZFN0ckxlbmd0aCIsInN0ciIsImNvbG9yQ291bnQiLCJXaXpFeHBsb3JlckFwcCIsIndpbmRvdyIsImV4dGVybmFsIiwiV2l6RXhwbG9yZXJXaW5kb3ciLCJXaW5kb3ciLCJXaXpEYXRhYmFzZSIsIldpekNvbW1vblVJIiwiQ3JlYXRlV2l6T2JqZWN0IiwiV2l6Q29uZmlybSIsIm1zZyIsIlNob3dNZXNzYWdlIiwiV2l6QWxlcnQiLCJXaXpCdWJibGVNZXNzYWdlIiwiZGVsYXkiLCJhcHBQYXRoIiwiR2V0U3BlY2lhbEZvbGRlciIsIndpelNoZWxsRmlsZU5hbWUiLCJkbGxGaWxlTmFtZSIsInBhcmFtcyIsIlJ1bkV4ZSIsIldpelNoZWxsIiwiZGxsRXhwb3J0RnVuYyIsIndpekV4ZSIsInNjcmlwdEZpbGVOYW1lIiwic2NyaXB0UGFyYW1zIiwicmdiMmhzbCIsInIiLCJnIiwiTSIsIm1heCIsIm0iLCJtaW4iLCJDIiwiTCIsIlMiLCJhYnMiLCJoIiwiSCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQVEsb0JBQW9CO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQWlCLDRCQUE0QjtBQUM3QztBQUNBO0FBQ0EsMEJBQWtCLDJCQUEyQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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RUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQW9CLDJCQUEyQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBbUIsY0FBYztBQUNqQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQWdCLEtBQUs7QUFDckI7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBZ0IsWUFBWTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVRQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBRXFCQSxH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LENBQVosR0FBZ0JBLEtBQUcsSUFBRW5hLEtBQUtzYSxHQUFMLENBQVMsSUFBRUYsQ0FBRixHQUFJLENBQWIsQ0FBTCxDQUF4Qjs7QUFFQSxRQUFJRyxDQUFKO0FBQ0EsUUFBSUosTUFBTSxDQUFWLEVBQWFJLElBQUksQ0FBSixDQUFiLENBQW9CO0FBQXBCLFNBQ0ssSUFBSVIsTUFBTUYsQ0FBVixFQUFhVSxJQUFLLENBQUNULElBQUVsTCxDQUFILElBQU11TCxDQUFQLEdBQVksQ0FBaEIsQ0FBYixLQUNBLElBQUlKLE1BQU1ELENBQVYsRUFBYVMsSUFBSyxDQUFDM0wsSUFBRWlMLENBQUgsSUFBTU0sQ0FBUCxHQUFZLENBQWhCLENBQWIsS0FDQSxJQUFJSixNQUFNbkwsQ0FBVixFQUFhMkwsSUFBSyxDQUFDVixJQUFFQyxDQUFILElBQU1LLENBQVAsR0FBWSxDQUFoQjs7QUFFbEIsUUFBSUssSUFBSSxLQUFLRCxDQUFiOztBQUVBO0FBQ0EsV0FBTyxDQUFDQyxDQUFELEVBQUl0RCxXQUFXbUQsQ0FBWCxDQUFKLEVBQW1CbkQsV0FBV2tELENBQVgsQ0FBbkIsQ0FBUDtBQUNIOztRQUVRUixPLEdBQUFBLE8iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG4gXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gd2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHRcdGlmIChwYXJlbnRIb3RVcGRhdGVDYWxsYmFjaykgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0fSA7XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XG4gXHRcdDtcbiBcdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QocmVxdWVzdFRpbWVvdXQpIHtcbiBcdFx0cmVxdWVzdFRpbWVvdXQgPSByZXF1ZXN0VGltZW91dCB8fCAxMDAwMDtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QobmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0XCIpKTtcbiBcdFx0XHR9XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIjtcbiBcdFx0XHRcdHJlcXVlc3Qub3BlbihcIkdFVFwiLCByZXF1ZXN0UGF0aCwgdHJ1ZSk7XG4gXHRcdFx0XHRyZXF1ZXN0LnRpbWVvdXQgPSByZXF1ZXN0VGltZW91dDtcbiBcdFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHJldHVybjtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xuIFx0XHRcdFx0XHQvLyB0aW1lb3V0XG4gXHRcdFx0XHRcdHJlamVjdChcbiBcdFx0XHRcdFx0XHRuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpXG4gXHRcdFx0XHRcdCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcbiBcdFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuIFx0XHRcdFx0XHRyZXNvbHZlKCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xuIFx0XHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXG4gXHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdC8vIHN1Y2Nlc3NcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcbiBcdFx0XHRcdFx0XHRyZWplY3QoZSk7XG4gXHRcdFx0XHRcdFx0cmV0dXJuO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdHJlc29sdmUodXBkYXRlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCJiNjM1NzE0ODI4ZmMyNmZiNmVkYlwiOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90UmVxdWVzdFRpbWVvdXQgPSAxMDAwMDtcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xuIFx0dmFyIGhvdEN1cnJlbnRDaGlsZE1vZHVsZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50c1RlbXAgPSBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmICghbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG4gXHRcdFx0XHRcdFx0cmVxdWVzdCArXG4gXHRcdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0KTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9LFxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fTtcbiBcdFx0Zm9yICh2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcImVcIiAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJ0XCJcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKSBob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0dGhyb3cgZXJyO1xuIFx0XHRcdH0pO1xuXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcbiBcdFx0XHRcdFx0aWYgKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH07XG4gXHRcdGZuLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRcdGlmIChtb2RlICYgMSkgdmFsdWUgPSBmbih2YWx1ZSk7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udCh2YWx1ZSwgbW9kZSAmIH4xKTtcbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBkZXAgPT09IFwidW5kZWZpbmVkXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdFx0ZWxzZSBob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGRlcCA9PT0gXCJ1bmRlZmluZWRcIikgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGlmICghbCkgcmV0dXJuIGhvdFN0YXR1cztcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cbiBcdFx0fTtcbiBcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xuIFx0XHRyZXR1cm4gaG90O1xuIFx0fVxuXG4gXHR2YXIgaG90U3RhdHVzSGFuZGxlcnMgPSBbXTtcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcblxuIFx0ZnVuY3Rpb24gaG90U2V0U3RhdHVzKG5ld1N0YXR1cykge1xuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XG4gXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaG90U3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xuIFx0fVxuXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XG4gXHR2YXIgaG90Q2h1bmtzTG9hZGluZyA9IDA7XG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RBdmFpbGFibGVGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdERlZmVycmVkO1xuXG4gXHQvLyBUaGUgdXBkYXRlIGluZm9cbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcbiBcdFx0dmFyIGlzTnVtYmVyID0gK2lkICsgXCJcIiA9PT0gaWQ7XG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSkge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcImlkbGVcIikge1xuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuIFx0XHR9XG4gXHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XG4gXHRcdHJldHVybiBob3REb3dubG9hZE1hbmlmZXN0KGhvdFJlcXVlc3RUaW1lb3V0KS50aGVuKGZ1bmN0aW9uKHVwZGF0ZSkge1xuIFx0XHRcdGlmICghdXBkYXRlKSB7XG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRcdFx0cmV0dXJuIG51bGw7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90QXZhaWxhYmxlRmlsZXNNYXAgPSB1cGRhdGUuYztcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdXBkYXRlLmg7XG5cbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRob3REZWZlcnJlZCA9IHtcbiBcdFx0XHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcbiBcdFx0XHRcdFx0cmVqZWN0OiByZWplY3RcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0aG90VXBkYXRlID0ge307XG4gXHRcdFx0Zm9yKHZhciBjaHVua0lkIGluIGluc3RhbGxlZENodW5rcylcbiBcdFx0XHR7XG4gXHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWxvbmUtYmxvY2tzXG4gXHRcdFx0XHQvKmdsb2JhbHMgY2h1bmtJZCAqL1xuIFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIgJiZcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiZcbiBcdFx0XHRcdGhvdFdhaXRpbmdGaWxlcyA9PT0gMFxuIFx0XHRcdCkge1xuIFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gcHJvbWlzZTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSB8fCAhaG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0pXG4gXHRcdFx0cmV0dXJuO1xuIFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IGZhbHNlO1xuIFx0XHRmb3IgKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYgKC0taG90V2FpdGluZ0ZpbGVzID09PSAwICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDApIHtcbiBcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzKys7XG4gXHRcdFx0aG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RVcGRhdGVEb3dubG9hZGVkKCkge1xuIFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcbiBcdFx0dmFyIGRlZmVycmVkID0gaG90RGVmZXJyZWQ7XG4gXHRcdGhvdERlZmVycmVkID0gbnVsbDtcbiBcdFx0aWYgKCFkZWZlcnJlZCkgcmV0dXJuO1xuIFx0XHRpZiAoaG90QXBwbHlPblVwZGF0ZSkge1xuIFx0XHRcdC8vIFdyYXAgZGVmZXJyZWQgb2JqZWN0IGluIFByb21pc2UgdG8gbWFyayBpdCBhcyBhIHdlbGwtaGFuZGxlZCBQcm9taXNlIHRvXG4gXHRcdFx0Ly8gYXZvaWQgdHJpZ2dlcmluZyB1bmNhdWdodCBleGNlcHRpb24gd2FybmluZyBpbiBDaHJvbWUuXG4gXHRcdFx0Ly8gU2VlIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ2NTY2NlxuIFx0XHRcdFByb21pc2UucmVzb2x2ZSgpXG4gXHRcdFx0XHQudGhlbihmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIGhvdEFwcGx5KGhvdEFwcGx5T25VcGRhdGUpO1xuIFx0XHRcdFx0fSlcbiBcdFx0XHRcdC50aGVuKFxuIFx0XHRcdFx0XHRmdW5jdGlvbihyZXN1bHQpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XG4gXHRcdFx0XHRcdH0sXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnIpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHQpO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2godG9Nb2R1bGVJZChpZCkpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucykge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcInJlYWR5XCIpXG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xuIFx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuIFx0XHR2YXIgY2I7XG4gXHRcdHZhciBpO1xuIFx0XHR2YXIgajtcbiBcdFx0dmFyIG1vZHVsZTtcbiBcdFx0dmFyIG1vZHVsZUlkO1xuXG4gXHRcdGZ1bmN0aW9uIGdldEFmZmVjdGVkU3R1ZmYodXBkYXRlTW9kdWxlSWQpIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW3VwZGF0ZU1vZHVsZUlkXTtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuIFx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpLm1hcChmdW5jdGlvbihpZCkge1xuIFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0Y2hhaW46IFtpZF0sXG4gXHRcdFx0XHRcdGlkOiBpZFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWVJdGVtLmlkO1xuIFx0XHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1kZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9tYWluKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRpZiAoIXBhcmVudCkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHRcdH07XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcbiBcdFx0XHRcdFx0cXVldWUucHVzaCh7XG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRpZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuXG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcbiBcdFx0XHRcdG1vZHVsZUlkOiB1cGRhdGVNb2R1bGVJZCxcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxuIFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXG4gXHRcdFx0fTtcbiBcdFx0fVxuXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcbiBcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdHZhciBpdGVtID0gYltpXTtcbiBcdFx0XHRcdGlmIChhLmluZGV4T2YoaXRlbSkgPT09IC0xKSBhLnB1c2goaXRlbSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxuIFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xuXG4gXHRcdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUoKSB7XG4gXHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCJcbiBcdFx0XHQpO1xuIFx0XHR9O1xuXG4gXHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XG4gXHRcdFx0XHQvKiogQHR5cGUge1RPRE99ICovXG4gXHRcdFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRcdFx0aWYgKGhvdFVwZGF0ZVtpZF0pIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGVJZCk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJkaXNwb3NlZFwiLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBpZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0LyoqIEB0eXBlIHtFcnJvcnxmYWxzZX0gKi9cbiBcdFx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XG4gXHRcdFx0XHRpZiAocmVzdWx0LmNoYWluKSB7XG4gXHRcdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcbiBcdFx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0XCIgaW4gXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wYXJlbnRJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uVW5hY2NlcHRlZCkgb3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25BY2NlcHRlZCkgb3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGlzcG9zZWQpIG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGRlZmF1bHQ6XG4gXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChhYm9ydEVycm9yKSB7XG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xuIFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoYWJvcnRFcnJvcik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9BcHBseSkge1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0Lm91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdFx0XHRcdGZvciAobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0XHRcdFx0aWYgKFxuIFx0XHRcdFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHRcdFx0XHQpXG4gXHRcdFx0XHRcdFx0KSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG4gXHRcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvRGlzcG9zZSkge1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSAmJlxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHQpXG4gXHRcdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XG4gXHRcdFx0XHRcdG1vZHVsZTogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdGVycm9ySGFuZGxlcjogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHRcdH0pO1xuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG4gXHRcdE9iamVjdC5rZXlzKGhvdEF2YWlsYWJsZUZpbGVzTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gPT09IGZhbHNlKSB7XG4gXHRcdFx0XHRob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHR9KTtcblxuIFx0XHR2YXIgaWR4O1xuIFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcbiBcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdGlmICghbW9kdWxlKSBjb250aW51ZTtcblxuIFx0XHRcdHZhciBkYXRhID0ge307XG5cbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xuIFx0XHRcdFx0Y2IoZGF0YSk7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XG5cbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XG5cbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG4gXHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuIFx0XHRcdFx0aWYgKCFjaGlsZCkgY29udGludWU7XG4gXHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cbiBcdFx0dmFyIGRlcGVuZGVuY3k7XG4gXHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcbiBcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcbiBcdFx0XHRcdFx0XHRpZiAoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdCBpbiBcImFwcGx5XCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiYXBwbHlcIik7XG5cbiBcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxuIFx0XHRmb3IgKG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFwcGxpZWRVcGRhdGUsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xuIFx0XHR2YXIgZXJyb3IgPSBudWxsO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XG4gXHRcdFx0XHRcdFx0Y2IgPSBtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcbiBcdFx0XHRcdFx0XHRpZiAoY2IpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFja3MuaW5kZXhPZihjYikgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGNiID0gY2FsbGJhY2tzW2ldO1xuIFx0XHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0XHRjYihtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XG4gXHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXSxcbiBcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcbiBcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyMjtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxuIFx0XHRpZiAoZXJyb3IpIHtcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gXHRcdH1cblxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuIFx0XHRcdHJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcImluZGV4XCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFtcIi4vc3JjL2luZGV4LmpzXCIsXCJ2ZW5kb3JcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcclxcbi8qIOaXpeWOhuaVtOS9k+agt+W8j1xcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcbiNjYWxlbmRhci1jb250YWluZXIge1xcclxcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICAgIHRvcDogMDtcXHJcXG4gICAgbGVmdDogOHB4O1xcclxcbiAgICByaWdodDogOHB4O1xcclxcbiAgICBib3R0b206IDhweDtcXHJcXG59XFxyXFxuXFxyXFxuLmZjLWhlYWRlci10b29sYmFyIHtcXHJcXG4gICAgLypcXHJcXG4gICAgdGhlIGNhbGVuZGFyIHdpbGwgYmUgYnV0dGluZyB1cCBhZ2FpbnN0IHRoZSBlZGdlcyxcXHJcXG4gICAgYnV0IGxldCdzIHNjb290IGluIHRoZSBoZWFkZXIncyBidXR0b25zXFxyXFxuICAgICovXFxyXFxuICAgIHBhZGRpbmctdG9wOiAxNHB4O1xcclxcbiAgICBwYWRkaW5nLWxlZnQ6IDA7XFxyXFxuICAgIHBhZGRpbmctcmlnaHQ6IDA7XFxyXFxufVxcclxcblxcclxcbi8qIOS6i+S7tua4suafk1xcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcbi50Yy1jb21wbGV0ZSB7XFxyXFxuICAgIG9wYWNpdHk6IDAuMztcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuLnRjLWNvbXBsZXRlID4gLmZjLWNvbnRlbnQsXFxyXFxuLnRjLWNvbXBsZXRlID4gLmZjLWNvbnRlbnQgPiAuZmMtdGltZSxcXHJcXG4udGMtY29tcGxldGUgPiAuZmMtY29udGVudCA+IC5mYy10aXRsZVxcclxcbntcXHJcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBsaW5lLXRocm91Z2ggIWltcG9ydGFudDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLWNvbXBsZXRlOmhvdmVyIHtcXHJcXG4gICAgb3BhY2l0eTogMTtcXHJcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKiBQb3BvdmVyIOe7hOS7tuagt+W8j1xcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcblxcclxcbi8qIFBvcG92ZXIg5a655Zmo5Y+K5a6a5L2NXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuXFxyXFxuLnRjLXBvcG92ZXIge1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGJhY2tncm91bmQ6ICNGRkY7XFxyXFxuICAgIGNvbG9yOiBibGFjaztcXHJcXG4gICAgd2lkdGg6IGF1dG87XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4yKTtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNnB4O1xcclxcbiAgICBib3gtc2hhZG93OiAwIDJweCA0cHggcmdiYSgwLCAwLCAwLCAuMik7XFxyXFxuICAgIHRleHQtYWxpZ246IGxlZnQ7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyIC5hcnJvdyB7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICAgIHdpZHRoOiAyMHB4O1xcclxcbiAgICBoZWlnaHQ6IDEwcHg7XFxyXFxuICAgIG1hcmdpbjogMCA2cHg7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyIC5hcnJvdzo6YmVmb3JlLCAudGMtcG9wb3ZlciAuYXJyb3c6OmFmdGVyIHtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgY29udGVudDogXFxcIlxcXCI7XFxyXFxuICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XFxyXFxuICAgIGJvcmRlci1zdHlsZTogc29saWQ7XFxyXFxufVxcclxcblxcclxcbi8qIHRvcCDmlL7nva7moLflvI9cXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInRvcFxcXCJdIHtcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJ0b3BcXFwiXSAuYXJyb3cge1xcclxcbiAgICBib3R0b206IGNhbGMoKDEwcHggKyAxcHgpICogLTEpO1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInRvcFxcXCJdIC5hcnJvdzo6YmVmb3JlLFxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwidG9wXFxcIl0gLmFycm93OjphZnRlciB7XFxyXFxuICAgIGJvcmRlci13aWR0aDogMTBweCAxMHB4IDA7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwidG9wXFxcIl0gLmFycm93OjpiZWZvcmUge1xcclxcbiAgICBib3R0b206IDA7XFxyXFxuICAgIGJvcmRlci10b3AtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSk7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwidG9wXFxcIl0gLmFycm93OjphZnRlciB7XFxyXFxuICAgIGJvdHRvbTogMXB4O1xcclxcbiAgICBib3JkZXItdG9wLWNvbG9yOiAjZmZmO1xcclxcbn1cXHJcXG5cXHJcXG4vKiByaWdodCDmlL7nva7moLflvI9cXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInJpZ2h0XFxcIl0ge1xcclxcbiAgICBtYXJnaW4tbGVmdDogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJyaWdodFxcXCJdIC5hcnJvdyB7XFxyXFxuICAgIGxlZnQ6IGNhbGMoKDEwcHggKyAxcHgpICogLTEpO1xcclxcbiAgICB3aWR0aDogMTBweDtcXHJcXG4gICAgaGVpZ2h0OiAyMHB4O1xcclxcbiAgICBtYXJnaW46IDZweCAwO1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInJpZ2h0XFxcIl0gLmFycm93OjpiZWZvcmUsXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJyaWdodFxcXCJdIC5hcnJvdzo6YWZ0ZXIge1xcclxcbiAgICBib3JkZXItd2lkdGg6IDEwcHggMTBweCAxMHB4IDA7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwicmlnaHRcXFwiXSAuYXJyb3c6OmJlZm9yZSB7XFxyXFxuICAgIGxlZnQ6IDA7XFxyXFxuICAgIGJvcmRlci1yaWdodC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KTtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJyaWdodFxcXCJdIC5hcnJvdzo6YWZ0ZXIge1xcclxcbiAgICBsZWZ0OiAxcHg7XFxyXFxuICAgIGJvcmRlci1yaWdodC1jb2xvcjogI2ZmZjtcXHJcXG59XFxyXFxuXFxyXFxuLyogYm90dG9tIOaUvue9ruagt+W8j1xcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwiYm90dG9tXFxcIl0ge1xcclxcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImJvdHRvbVxcXCJdIC5hcnJvdyB7XFxyXFxuICAgIHRvcDogY2FsYygoMTBweCArIDFweCkgKiAtMSk7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwiYm90dG9tXFxcIl0gLmFycm93OjpiZWZvcmUsXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJib3R0b21cXFwiXSAuYXJyb3c6OmFmdGVyIHtcXHJcXG4gICAgYm9yZGVyLXdpZHRoOiAwIDEwcHggMTBweCAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImJvdHRvbVxcXCJdIC5hcnJvdzo6YmVmb3JlIHtcXHJcXG4gICAgdG9wOiAwO1xcclxcbiAgICBib3JkZXItYm90dG9tLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMjUpO1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImJvdHRvbVxcXCJdIC5hcnJvdzo6YWZ0ZXIge1xcclxcbiAgICB0b3A6IDFweDtcXHJcXG4gICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogI2Y3ZjdmNzsgLyrov5nph4zkuLrkuobkuJPpl6jpgILphY3mnInmoIfpopjog4zmma/nmoRQb3BvdmVyKi9cXHJcXG59XFxyXFxuXFxyXFxuLyogbGVmdCDmlL7nva7moLflvI9cXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImxlZnRcXFwiXSB7XFxyXFxuICAgIG1hcmdpbi1yaWdodDogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJsZWZ0XFxcIl0gLmFycm93IHtcXHJcXG4gICAgcmlnaHQ6IGNhbGMoKDEwcHggKyAxcHgpICogLTEpO1xcclxcbiAgICB3aWR0aDogMTBweDtcXHJcXG4gICAgaGVpZ2h0OiAyMHB4O1xcclxcbiAgICBtYXJnaW46IDZweCAwO1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImxlZnRcXFwiXSAuYXJyb3c6OmJlZm9yZSxcXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImxlZnRcXFwiXSAuYXJyb3c6OmFmdGVyIHtcXHJcXG4gICAgYm9yZGVyLXdpZHRoOiAxMHB4IDAgMTBweCAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImxlZnRcXFwiXSAuYXJyb3c6OmJlZm9yZSB7XFxyXFxuICAgIHJpZ2h0OiAwO1xcclxcbiAgICBib3JkZXItbGVmdC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KTtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJsZWZ0XFxcIl0gLmFycm93OjphZnRlciB7XFxyXFxuICAgIHJpZ2h0OiAxcHg7XFxyXFxuICAgIGJvcmRlci1sZWZ0LWNvbG9yOiAjZmZmO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBDb250ZW50IOagh+mimOWSjOWGheWuuVxcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcblxcclxcbi50Yy1wb3BvdmVyLWhlYWRlciB7XFxyXFxuICAgIHBhZGRpbmc6IC41cmVtIC43NXJlbTtcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogMDtcXHJcXG4gICAgZm9udC1zaXplOiAxcmVtO1xcclxcbiAgICBjb2xvcjogaW5oZXJpdDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y3ZjdmNztcXHJcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlYmViZWI7XFxyXFxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDZweDtcXHJcXG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDZweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXItYm9keSB7XFxyXFxuICAgIHBhZGRpbmc6IDEwcHggMTVweDtcXHJcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIjdGMtZWRpdHBvcHBlci1ldmVudHRpdGxlIHtcXHJcXG4gICAgYm9yZGVyLXdpZHRoOiAxcHg7XFxyXFxuICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcclxcbiAgICBwYWRkaW5nOiAwO1xcclxcbiAgICBtYXJnaW46IDA7XFxyXFxuICAgIGZvbnQtc2l6ZTogMS4yZW07XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbn1cXHJcXG5cXHJcXG4jdGMtZWRpdHBvcHBlci1ldmVudHRpdGxlOmZvY3VzLFxcclxcbiN0Yy1lZGl0cG9wcGVyLWV2ZW50dGl0bGU6aG92ZXIge1xcclxcbiAgICBvdXRsaW5lOiBub25lO1xcclxcbiAgICBib3JkZXItYm90dG9tLWNvbG9yOiBibGFjazsgXFxyXFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiaHRtbCwgYm9keSB7XFxyXFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxyXFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXHJcXG59XFxyXFxuXFxyXFxuOmZvY3VzIHtcXHJcXG4gICAgb3V0bGluZTpub25lO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBGb250cy5jc3MgLS0g6Leo5bmz5Y+w5Lit5paH5a2X5L2T6Kej5Yaz5pa55qGIXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcbi5mb250LWhlaSB7Zm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIFxcXCJOb3RvIFNhbnNcXFwiLCBcXFwiSGVsdmV0aWNhIE5ldWVcXFwiLCBIZWx2ZXRpY2EsIFxcXCJOaW1idXMgU2FucyBMXFxcIiwgQXJpYWwsIFxcXCJMaWJlcmF0aW9uIFNhbnNcXFwiLCBcXFwiUGluZ0ZhbmcgU0NcXFwiLCBcXFwiSGlyYWdpbm8gU2FucyBHQlxcXCIsIFxcXCJOb3RvIFNhbnMgQ0pLIFNDXFxcIiwgXFxcIlNvdXJjZSBIYW4gU2FucyBTQ1xcXCIsIFxcXCJTb3VyY2UgSGFuIFNhbnMgQ05cXFwiLCBcXFwiTWljcm9zb2Z0IFlhSGVpXFxcIiwgXFxcIldlbnF1YW55aSBNaWNybyBIZWlcXFwiLCBcXFwiV2VuUXVhbllpIFplbiBIZWlcXFwiLCBcXFwiU1QgSGVpdGlcXFwiLCBTaW1IZWksIFxcXCJXZW5RdWFuWWkgWmVuIEhlaSBTaGFycFxcXCIsIHNhbnMtc2VyaWY7fVxcclxcbi5mb250LWthaSB7Zm9udC1mYW1pbHk6IEJhc2tlcnZpbGxlLCBHZW9yZ2lhLCBcXFwiTGliZXJhdGlvbiBTZXJpZlxcXCIsIFxcXCJLYWl0aSBTQ1xcXCIsIFNUS2FpdGksIFxcXCJBUiBQTCBVS2FpIENOXFxcIiwgXFxcIkFSIFBMIFVLYWkgSEtcXFwiLCBcXFwiQVIgUEwgVUthaSBUV1xcXCIsIFxcXCJBUiBQTCBVS2FpIFRXIE1CRVxcXCIsIFxcXCJBUiBQTCBLYWl0aU0gR0JcXFwiLCBLYWlUaSwgS2FpVGlfR0IyMzEyLCBERkthaS1TQiwgXFxcIlRXLUthaVxcXCIsIHNlcmlmO31cXHJcXG4uZm9udC1zb25nIHtmb250LWZhbWlseTogR2VvcmdpYSwgXFxcIk5pbWJ1cyBSb21hbiBObzkgTFxcXCIsIFxcXCJTb25ndGkgU0NcXFwiLCBcXFwiTm90byBTZXJpZiBDSksgU0NcXFwiLCBcXFwiU291cmNlIEhhbiBTZXJpZiBTQ1xcXCIsIFxcXCJTb3VyY2UgSGFuIFNlcmlmIENOXFxcIiwgU1RTb25nLCBcXFwiQVIgUEwgTmV3IFN1bmdcXFwiLCBcXFwiQVIgUEwgU3VuZ3RpTCBHQlxcXCIsIE5TaW1TdW4sIFNpbVN1biwgXFxcIlRXLVN1bmdcXFwiLCBcXFwiV2VuUXVhbllpIEJpdG1hcCBTb25nXFxcIiwgXFxcIkFSIFBMIFVNaW5nIENOXFxcIiwgXFxcIkFSIFBMIFVNaW5nIEhLXFxcIiwgXFxcIkFSIFBMIFVNaW5nIFRXXFxcIiwgXFxcIkFSIFBMIFVNaW5nIFRXIE1CRVxcXCIsIFBNaW5nTGlVLCBNaW5nTGlVLCBzZXJpZjt9XFxyXFxuLmZvbnQtZmFuZy1zb25nIHtmb250LWZhbWlseTogQmFza2VydmlsbGUsIFxcXCJUaW1lcyBOZXcgUm9tYW5cXFwiLCBcXFwiTGliZXJhdGlvbiBTZXJpZlxcXCIsIFNURmFuZ3NvbmcsIEZhbmdTb25nLCBGYW5nU29uZ19HQjIzMTIsIFxcXCJDV1RFWC1GXFxcIiwgc2VyaWY7fVxcclxcblxcclxcbi8qIOS4tOaXtuaUvue9rlxcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcblxcclxcbi51aS1idXR0b24taWNvbi1vbmx5LnNwbGl0YnV0dG9uLXNlbGVjdCB7XFxyXFxuICAgIHdpZHRoOiAxZW07XFxyXFxufVxcclxcblxcclxcbmFbZGF0YS1nb3RvXSB7XFxyXFxuICAgIGNvbG9yOiAjMDAwO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBCb290c3RyYXAgNCDnu4Tku7bmoLflvI9cXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG5cXHJcXG4vKiDooajljZVcXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG4uY29sLWZvcm0tbGFiZWwge1xcclxcbiAgICBwYWRkaW5nLXRvcDogY2FsYyguMzc1cmVtICsgMXB4KTtcXHJcXG4gICAgcGFkZGluZy1ib3R0b206IGNhbGMoLjM3NXJlbSArIDFweCk7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IDA7XFxyXFxuICAgIGZvbnQtc2l6ZTogaW5oZXJpdDtcXHJcXG4gICAgbGluZS1oZWlnaHQ6IDEuNTtcXHJcXG59XFxyXFxuXFxyXFxuLmlucHV0LWdyb3VwLWFkZG9uIHtcXHJcXG4gIGJvcmRlci1sZWZ0LXdpZHRoOiAwO1xcclxcbiAgYm9yZGVyLXJpZ2h0LXdpZHRoOiAwO1xcclxcbn1cXHJcXG4uaW5wdXQtZ3JvdXAtYWRkb246Zmlyc3QtY2hpbGQge1xcclxcbiAgYm9yZGVyLWxlZnQtd2lkdGg6IDFweDtcXHJcXG59XFxyXFxuLmlucHV0LWdyb3VwLWFkZG9uOmxhc3QtY2hpbGQge1xcclxcbiAgYm9yZGVyLXJpZ2h0LXdpZHRoOiAxcHg7XFxyXFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsInZhciBtYXAgPSB7XG5cdFwiLi9hZlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYWYuanNcIixcblx0XCIuL2FmLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hZi5qc1wiLFxuXHRcIi4vYXJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLmpzXCIsXG5cdFwiLi9hci1kelwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItZHouanNcIixcblx0XCIuL2FyLWR6LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1kei5qc1wiLFxuXHRcIi4vYXIta3dcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWt3LmpzXCIsXG5cdFwiLi9hci1rdy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXIta3cuanNcIixcblx0XCIuL2FyLWx5XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1seS5qc1wiLFxuXHRcIi4vYXItbHkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWx5LmpzXCIsXG5cdFwiLi9hci1tYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItbWEuanNcIixcblx0XCIuL2FyLW1hLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1tYS5qc1wiLFxuXHRcIi4vYXItc2FcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLXNhLmpzXCIsXG5cdFwiLi9hci1zYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItc2EuanNcIixcblx0XCIuL2FyLXRuXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci10bi5qc1wiLFxuXHRcIi4vYXItdG4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLXRuLmpzXCIsXG5cdFwiLi9hci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXIuanNcIixcblx0XCIuL2F6XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hei5qc1wiLFxuXHRcIi4vYXouanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2F6LmpzXCIsXG5cdFwiLi9iZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYmUuanNcIixcblx0XCIuL2JlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iZS5qc1wiLFxuXHRcIi4vYmdcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JnLmpzXCIsXG5cdFwiLi9iZy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYmcuanNcIixcblx0XCIuL2JtXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ibS5qc1wiLFxuXHRcIi4vYm0uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JtLmpzXCIsXG5cdFwiLi9iblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm4uanNcIixcblx0XCIuL2JuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ibi5qc1wiLFxuXHRcIi4vYm9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JvLmpzXCIsXG5cdFwiLi9iby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm8uanNcIixcblx0XCIuL2JyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ici5qc1wiLFxuXHRcIi4vYnIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JyLmpzXCIsXG5cdFwiLi9ic1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYnMuanNcIixcblx0XCIuL2JzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9icy5qc1wiLFxuXHRcIi4vY2FcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2NhLmpzXCIsXG5cdFwiLi9jYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY2EuanNcIixcblx0XCIuL2NzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jcy5qc1wiLFxuXHRcIi4vY3MuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2NzLmpzXCIsXG5cdFwiLi9jdlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3YuanNcIixcblx0XCIuL2N2LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jdi5qc1wiLFxuXHRcIi4vY3lcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2N5LmpzXCIsXG5cdFwiLi9jeS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3kuanNcIixcblx0XCIuL2RhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kYS5qc1wiLFxuXHRcIi4vZGEuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RhLmpzXCIsXG5cdFwiLi9kZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUuanNcIixcblx0XCIuL2RlLWF0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS1hdC5qc1wiLFxuXHRcIi4vZGUtYXQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLWF0LmpzXCIsXG5cdFwiLi9kZS1jaFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUtY2guanNcIixcblx0XCIuL2RlLWNoLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS1jaC5qc1wiLFxuXHRcIi4vZGUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLmpzXCIsXG5cdFwiLi9kdlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZHYuanNcIixcblx0XCIuL2R2LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kdi5qc1wiLFxuXHRcIi4vZWxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VsLmpzXCIsXG5cdFwiLi9lbC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZWwuanNcIixcblx0XCIuL2VuLWF1XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1hdS5qc1wiLFxuXHRcIi4vZW4tYXUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWF1LmpzXCIsXG5cdFwiLi9lbi1jYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tY2EuanNcIixcblx0XCIuL2VuLWNhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1jYS5qc1wiLFxuXHRcIi4vZW4tZ2JcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWdiLmpzXCIsXG5cdFwiLi9lbi1nYi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tZ2IuanNcIixcblx0XCIuL2VuLWllXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1pZS5qc1wiLFxuXHRcIi4vZW4taWUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWllLmpzXCIsXG5cdFwiLi9lbi1pbFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4taWwuanNcIixcblx0XCIuL2VuLWlsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1pbC5qc1wiLFxuXHRcIi4vZW4tbnpcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLW56LmpzXCIsXG5cdFwiLi9lbi1uei5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tbnouanNcIixcblx0XCIuL2VvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lby5qc1wiLFxuXHRcIi4vZW8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VvLmpzXCIsXG5cdFwiLi9lc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMuanNcIixcblx0XCIuL2VzLWRvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy1kby5qc1wiLFxuXHRcIi4vZXMtZG8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLWRvLmpzXCIsXG5cdFwiLi9lcy11c1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMtdXMuanNcIixcblx0XCIuL2VzLXVzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy11cy5qc1wiLFxuXHRcIi4vZXMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLmpzXCIsXG5cdFwiLi9ldFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXQuanNcIixcblx0XCIuL2V0LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ldC5qc1wiLFxuXHRcIi4vZXVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2V1LmpzXCIsXG5cdFwiLi9ldS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXUuanNcIixcblx0XCIuL2ZhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mYS5qc1wiLFxuXHRcIi4vZmEuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZhLmpzXCIsXG5cdFwiLi9maVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZmkuanNcIixcblx0XCIuL2ZpLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9maS5qc1wiLFxuXHRcIi4vZm9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZvLmpzXCIsXG5cdFwiLi9mby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZm8uanNcIixcblx0XCIuL2ZyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci5qc1wiLFxuXHRcIi4vZnItY2FcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLWNhLmpzXCIsXG5cdFwiLi9mci1jYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnItY2EuanNcIixcblx0XCIuL2ZyLWNoXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci1jaC5qc1wiLFxuXHRcIi4vZnItY2guanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLWNoLmpzXCIsXG5cdFwiLi9mci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnIuanNcIixcblx0XCIuL2Z5XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9meS5qc1wiLFxuXHRcIi4vZnkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2Z5LmpzXCIsXG5cdFwiLi9nZFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ2QuanNcIixcblx0XCIuL2dkLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nZC5qc1wiLFxuXHRcIi4vZ2xcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dsLmpzXCIsXG5cdFwiLi9nbC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ2wuanNcIixcblx0XCIuL2dvbS1sYXRuXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nb20tbGF0bi5qc1wiLFxuXHRcIi4vZ29tLWxhdG4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dvbS1sYXRuLmpzXCIsXG5cdFwiLi9ndVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ3UuanNcIixcblx0XCIuL2d1LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ndS5qc1wiLFxuXHRcIi4vaGVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hlLmpzXCIsXG5cdFwiLi9oZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaGUuanNcIixcblx0XCIuL2hpXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oaS5qc1wiLFxuXHRcIi4vaGkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hpLmpzXCIsXG5cdFwiLi9oclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHIuanNcIixcblx0XCIuL2hyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oci5qc1wiLFxuXHRcIi4vaHVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2h1LmpzXCIsXG5cdFwiLi9odS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHUuanNcIixcblx0XCIuL2h5LWFtXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oeS1hbS5qc1wiLFxuXHRcIi4vaHktYW0uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2h5LWFtLmpzXCIsXG5cdFwiLi9pZFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaWQuanNcIixcblx0XCIuL2lkLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pZC5qc1wiLFxuXHRcIi4vaXNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2lzLmpzXCIsXG5cdFwiLi9pcy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaXMuanNcIixcblx0XCIuL2l0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pdC5qc1wiLFxuXHRcIi4vaXQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2l0LmpzXCIsXG5cdFwiLi9qYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvamEuanNcIixcblx0XCIuL2phLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9qYS5qc1wiLFxuXHRcIi4vanZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2p2LmpzXCIsXG5cdFwiLi9qdi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvanYuanNcIixcblx0XCIuL2thXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rYS5qc1wiLFxuXHRcIi4va2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2thLmpzXCIsXG5cdFwiLi9ra1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva2suanNcIixcblx0XCIuL2trLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ray5qc1wiLFxuXHRcIi4va21cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ttLmpzXCIsXG5cdFwiLi9rbS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva20uanNcIixcblx0XCIuL2tuXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rbi5qc1wiLFxuXHRcIi4va24uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2tuLmpzXCIsXG5cdFwiLi9rb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva28uanNcIixcblx0XCIuL2tvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rby5qc1wiLFxuXHRcIi4va3lcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2t5LmpzXCIsXG5cdFwiLi9reS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva3kuanNcIixcblx0XCIuL2xiXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sYi5qc1wiLFxuXHRcIi4vbGIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2xiLmpzXCIsXG5cdFwiLi9sb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbG8uanNcIixcblx0XCIuL2xvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sby5qc1wiLFxuXHRcIi4vbHRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2x0LmpzXCIsXG5cdFwiLi9sdC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbHQuanNcIixcblx0XCIuL2x2XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sdi5qc1wiLFxuXHRcIi4vbHYuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2x2LmpzXCIsXG5cdFwiLi9tZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWUuanNcIixcblx0XCIuL21lLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tZS5qc1wiLFxuXHRcIi4vbWlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21pLmpzXCIsXG5cdFwiLi9taS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWkuanNcIixcblx0XCIuL21rXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tay5qc1wiLFxuXHRcIi4vbWsuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21rLmpzXCIsXG5cdFwiLi9tbFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWwuanNcIixcblx0XCIuL21sLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tbC5qc1wiLFxuXHRcIi4vbW5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21uLmpzXCIsXG5cdFwiLi9tbi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbW4uanNcIixcblx0XCIuL21yXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tci5qc1wiLFxuXHRcIi4vbXIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21yLmpzXCIsXG5cdFwiLi9tc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXMuanNcIixcblx0XCIuL21zLW15XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tcy1teS5qc1wiLFxuXHRcIi4vbXMtbXkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21zLW15LmpzXCIsXG5cdFwiLi9tcy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXMuanNcIixcblx0XCIuL210XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tdC5qc1wiLFxuXHRcIi4vbXQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL210LmpzXCIsXG5cdFwiLi9teVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXkuanNcIixcblx0XCIuL215LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9teS5qc1wiLFxuXHRcIi4vbmJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25iLmpzXCIsXG5cdFwiLi9uYi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmIuanNcIixcblx0XCIuL25lXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9uZS5qc1wiLFxuXHRcIi4vbmUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25lLmpzXCIsXG5cdFwiLi9ubFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmwuanNcIixcblx0XCIuL25sLWJlXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubC1iZS5qc1wiLFxuXHRcIi4vbmwtYmUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25sLWJlLmpzXCIsXG5cdFwiLi9ubC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmwuanNcIixcblx0XCIuL25uXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubi5qc1wiLFxuXHRcIi4vbm4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25uLmpzXCIsXG5cdFwiLi9wYS1pblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcGEtaW4uanNcIixcblx0XCIuL3BhLWluLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wYS1pbi5qc1wiLFxuXHRcIi4vcGxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3BsLmpzXCIsXG5cdFwiLi9wbC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcGwuanNcIixcblx0XCIuL3B0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wdC5qc1wiLFxuXHRcIi4vcHQtYnJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3B0LWJyLmpzXCIsXG5cdFwiLi9wdC1ici5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcHQtYnIuanNcIixcblx0XCIuL3B0LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wdC5qc1wiLFxuXHRcIi4vcm9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3JvLmpzXCIsXG5cdFwiLi9yby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcm8uanNcIixcblx0XCIuL3J1XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ydS5qc1wiLFxuXHRcIi4vcnUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3J1LmpzXCIsXG5cdFwiLi9zZFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2QuanNcIixcblx0XCIuL3NkLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zZC5qc1wiLFxuXHRcIi4vc2VcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NlLmpzXCIsXG5cdFwiLi9zZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2UuanNcIixcblx0XCIuL3NpXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zaS5qc1wiLFxuXHRcIi4vc2kuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NpLmpzXCIsXG5cdFwiLi9za1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2suanNcIixcblx0XCIuL3NrLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zay5qc1wiLFxuXHRcIi4vc2xcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NsLmpzXCIsXG5cdFwiLi9zbC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2wuanNcIixcblx0XCIuL3NxXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zcS5qc1wiLFxuXHRcIi4vc3EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NxLmpzXCIsXG5cdFwiLi9zclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3IuanNcIixcblx0XCIuL3NyLWN5cmxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NyLWN5cmwuanNcIixcblx0XCIuL3NyLWN5cmwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NyLWN5cmwuanNcIixcblx0XCIuL3NyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zci5qc1wiLFxuXHRcIi4vc3NcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NzLmpzXCIsXG5cdFwiLi9zcy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3MuanNcIixcblx0XCIuL3N2XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zdi5qc1wiLFxuXHRcIi4vc3YuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3N2LmpzXCIsXG5cdFwiLi9zd1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3cuanNcIixcblx0XCIuL3N3LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zdy5qc1wiLFxuXHRcIi4vdGFcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RhLmpzXCIsXG5cdFwiLi90YS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGEuanNcIixcblx0XCIuL3RlXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ZS5qc1wiLFxuXHRcIi4vdGUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RlLmpzXCIsXG5cdFwiLi90ZXRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RldC5qc1wiLFxuXHRcIi4vdGV0LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ZXQuanNcIixcblx0XCIuL3RnXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90Zy5qc1wiLFxuXHRcIi4vdGcuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RnLmpzXCIsXG5cdFwiLi90aFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGguanNcIixcblx0XCIuL3RoLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90aC5qc1wiLFxuXHRcIi4vdGwtcGhcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RsLXBoLmpzXCIsXG5cdFwiLi90bC1waC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGwtcGguanNcIixcblx0XCIuL3RsaFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGxoLmpzXCIsXG5cdFwiLi90bGguanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RsaC5qc1wiLFxuXHRcIi4vdHJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RyLmpzXCIsXG5cdFwiLi90ci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHIuanNcIixcblx0XCIuL3R6bFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHpsLmpzXCIsXG5cdFwiLi90emwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3R6bC5qc1wiLFxuXHRcIi4vdHptXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90em0uanNcIixcblx0XCIuL3R6bS1sYXRuXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90em0tbGF0bi5qc1wiLFxuXHRcIi4vdHptLWxhdG4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3R6bS1sYXRuLmpzXCIsXG5cdFwiLi90em0uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3R6bS5qc1wiLFxuXHRcIi4vdWctY25cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VnLWNuLmpzXCIsXG5cdFwiLi91Zy1jbi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdWctY24uanNcIixcblx0XCIuL3VrXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ay5qc1wiLFxuXHRcIi4vdWsuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VrLmpzXCIsXG5cdFwiLi91clwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXIuanNcIixcblx0XCIuL3VyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ci5qc1wiLFxuXHRcIi4vdXpcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3V6LmpzXCIsXG5cdFwiLi91ei1sYXRuXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ei1sYXRuLmpzXCIsXG5cdFwiLi91ei1sYXRuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ei1sYXRuLmpzXCIsXG5cdFwiLi91ei5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXouanNcIixcblx0XCIuL3ZpXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS92aS5qc1wiLFxuXHRcIi4vdmkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3ZpLmpzXCIsXG5cdFwiLi94LXBzZXVkb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUveC1wc2V1ZG8uanNcIixcblx0XCIuL3gtcHNldWRvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS94LXBzZXVkby5qc1wiLFxuXHRcIi4veW9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3lvLmpzXCIsXG5cdFwiLi95by5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUveW8uanNcIixcblx0XCIuL3poLWNuXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC1jbi5qc1wiLFxuXHRcIi4vemgtY24uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLWNuLmpzXCIsXG5cdFwiLi96aC1oa1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtaGsuanNcIixcblx0XCIuL3poLWhrLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC1oay5qc1wiLFxuXHRcIi4vemgtdHdcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLXR3LmpzXCIsXG5cdFwiLi96aC10dy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtdHcuanNcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0dmFyIGlkID0gbWFwW3JlcV07XG5cdGlmKCEoaWQgKyAxKSkgeyAvLyBjaGVjayBmb3IgbnVtYmVyIG9yIHN0cmluZ1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRyZXR1cm4gaWQ7XG59XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlIHN5bmMgcmVjdXJzaXZlIF5cXFxcLlxcXFwvLiokXCI7IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IENhbGVuZGFyIGZyb20gJy4vY29tcG9uZW50cy9DYWxlbmRhci9DYWxlbmRhcic7XHJcbmltcG9ydCBXaXpFdmVudERhdGFMb2FkZXIgZnJvbSAnLi9tb2RlbHMvV2l6RXZlbnREYXRhTG9hZGVyJztcclxuaW1wb3J0IENhbGVuZGFyRXZlbnQgZnJvbSAnLi9tb2RlbHMvQ2FsZW5kYXJFdmVudCc7XHJcbmltcG9ydCBFdmVudFBvcG92ZXIgZnJvbSAnLi9jb21wb25lbnRzL0V2ZW50UG9wb3Zlci9FdmVudFBvcG92ZXInO1xyXG5pbXBvcnQgRXZlbnRDcmVhdGVNb2RhbCBmcm9tICcuL2NvbXBvbmVudHMvTW9kYWwvRXZlbnRDcmVhdGVNb2RhbCc7XHJcbmltcG9ydCBFdmVudEVkaXRNb2RhbCBmcm9tICcuL2NvbXBvbmVudHMvTW9kYWwvRXZlbnRFZGl0TW9kYWwnO1xyXG5pbXBvcnQgeyByZ2IyaHNsIH0gZnJvbSAnLi91dGlscy91dGlscyc7XHJcbmltcG9ydCB7IFdpekNvbmZpcm0sIFdpekRhdGFiYXNlIGFzIG9iakRhdGFiYXNlLCBXaXpFeHBsb3JlcldpbmRvdyBhcyBvYmpXaW5kb3cgfSBmcm9tICcuL3V0aWxzL1dpekludGVyZmFjZSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5kYXRhTG9hZGVyID0gbmV3IFdpekV2ZW50RGF0YUxvYWRlcigpO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgaXNTaG93aW5nRXZlbnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBpc0VkaXRpbmdFdmVudDogZmFsc2UsXHJcbiAgICAgICAgICAgIGlzQ3JlYXRpbmdFdmVudDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNsaWNrZWRBcmdzOiBudWxsLFxyXG4gICAgICAgICAgICBlZGl0aW5nRXZlbnQ6IG51bGwsXHJcbiAgICAgICAgICAgIHNlbGVjdGVkUmFuZ2U6IG51bGxcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLmhhbmRsZUNhbGVuZGFyUmVuZGVyID0gdGhpcy5oYW5kbGVDYWxlbmRhclJlbmRlci5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlRXZlbnRDbGljayA9IHRoaXMuaGFuZGxlRXZlbnRDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlVmlld1JlbmRlciA9IHRoaXMuaGFuZGxlVmlld1JlbmRlci5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlRXZlbnREcm9wID0gdGhpcy5oYW5kbGVFdmVudERyb3AuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUV2ZW50UmVzaXplID0gdGhpcy5oYW5kbGVFdmVudFJlc2l6ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlRXZlbnRSZW5kZXIgPSB0aGlzLmhhbmRsZUV2ZW50UmVuZGVyLmJpbmQodGhpcyk7XHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLmhhbmRsZVBvcG92ZXJIaWRlID0gdGhpcy5oYW5kbGVQb3BvdmVySGlkZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlRGF0ZVNlbGVjdCA9IHRoaXMuaGFuZGxlRGF0ZVNlbGVjdC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlTW9kYWxDbG9zZSA9IHRoaXMuaGFuZGxlTW9kYWxDbG9zZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5oYW5kbGVFdmVudENyZWF0ZSA9IHRoaXMuaGFuZGxlRXZlbnRDcmVhdGUuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUV2ZW50U2F2ZSA9IHRoaXMuaGFuZGxlRXZlbnRTYXZlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVFdmVudEVkaXQgPSB0aGlzLmhhbmRsZUV2ZW50RWRpdC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlRXZlbnRDb21wbGV0ZSA9IHRoaXMuaGFuZGxlRXZlbnRDb21wbGV0ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlRXZlbnREZWxldGVEYXRhID0gdGhpcy5oYW5kbGVFdmVudERlbGV0ZURhdGEuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUV2ZW50RGVsZXRlRG9jID0gdGhpcy5oYW5kbGVFdmVudERlbGV0ZURvYy5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlRXZlbnRPcGVuRG9jID0gdGhpcy5oYW5kbGVFdmVudE9wZW5Eb2MuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUV2ZW50RWRpdE9yaWdpbkRhdGEgPSB0aGlzLmhhbmRsZUV2ZW50RWRpdE9yaWdpbkRhdGEuYmluZCh0aGlzKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvLyDlpITnkIZGdWxsQ2FsZW5kYXLkuovku7ZcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIGhhbmRsZUNhbGVuZGFyUmVuZGVyKGVsKSB7XHJcbiAgICAgICAgLy8g6I635b6XRE9N5YWD57Sg55So5LqO5pON5L2cRnVsbENhbGVuZGFyXHJcbiAgICAgICAgdGhpcy5jYWxlbmRhciA9IGVsO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUV2ZW50Q2xpY2soIGV2ZW50LCBqc0V2ZW50LCB2aWV3ICkge1xyXG4gICAgICAgIGNvbnN0IGFyZ3MgPSB7IGV2ZW50LCBqc0V2ZW50LCB2aWV3IH1cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgaXNTaG93aW5nRXZlbnQ6IHRydWUsXHJcbiAgICAgICAgICAgIGNsaWNrZWRBcmdzOiBhcmdzXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVWaWV3UmVuZGVyKCB2aWV3LCBlbGVtZW50ICkge1xyXG4gICAgICAgIC8vIOWIt+aWsOinhuWbvu+8jOmHjeaWsOiOt+WPluaXpeWOhuS6i+S7tlxyXG4gICAgICAgIGNvbnN0ICRjYWxlbmRhciA9ICQodGhpcy5jYWxlbmRhcik7XHJcbiAgICAgICAgY29uc3QgZXZlbnRTb3VyY2VzID0gdGhpcy5kYXRhTG9hZGVyLmdldEV2ZW50U291cmNlcyggdmlldywgZWxlbWVudCApO1xyXG4gICAgICAgICRjYWxlbmRhci5mdWxsQ2FsZW5kYXIoJ3JlbW92ZUV2ZW50cycpO1xyXG4gICAgICAgIGZvciAobGV0IGk9MCA7IGkgPCBldmVudFNvdXJjZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgJGNhbGVuZGFyLmZ1bGxDYWxlbmRhcignYWRkRXZlbnRTb3VyY2UnLCBldmVudFNvdXJjZXNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVFdmVudERyb3AoIGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXcgKSB7XHJcbiAgICAgICAgaWYgKGV2ZW50LmlkKXtcclxuICAgICAgICAgICAgdGhpcy5kYXRhTG9hZGVyLnVwZGF0ZUV2ZW50RGF0YU9uRHJvcChldmVudCwgZGVsdGEsIHJldmVydEZ1bmMsIGpzRXZlbnQsIHVpLCB2aWV3KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldmVydEZ1bmMoKTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVFdmVudFJlc2l6ZSggZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldyApIHtcclxuICAgICAgICBpZiAoZXZlbnQuaWQpe1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFMb2FkZXIudXBkYXRlRXZlbnREYXRhT25SZXNpemUoZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV2ZXJ0RnVuYygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVFdmVudFJlbmRlciggZXZlbnRPYmosICRlbCApIHtcclxuICAgICAgICAvLyDorr7nva7mlofmnKzpopzoibJcclxuICAgICAgICBjb25zdCByZ2JTdHJpbmcgPSAkZWwuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJyk7XHJcbiAgICAgICAgY29uc3QgcmdiQXJyYXkgPSAvXnJnYlxcKChcXGQqKSwgKFxcZCopLCAoXFxkKilcXCkkLy5leGVjKHJnYlN0cmluZyk7XHJcbiAgICAgICAgaWYgKHJnYkFycmF5KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhzbCA9IHJnYjJoc2wocmdiQXJyYXlbMV0sIHJnYkFycmF5WzJdLCByZ2JBcnJheVszXSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpZ2h0bmVzcyA9IGhzbFsyXSAtIE1hdGguY29zKCAoaHNsWzBdKzcwKSAvIDE4MCpNYXRoLlBJICkgKiAwLjE1O1xyXG4gICAgICAgICAgICBjb25zdCB0ZXh0Q29sb3IgPSBsaWdodG5lc3MgPiAwLjUgPyAnIzIyMicgOiAnd2hpdGUnO1xyXG4gICAgICAgICAgICAkZWwuY3NzKCdjb2xvcicsIHRleHRDb2xvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOWFg+e0oOW3sue7j+a4suafk++8jOWPr+S/ruaUueWFg+e0oFxyXG4gICAgICAgIGNvbnN0IGlzQ29tcGxldGUgPSBwYXJzZUludChldmVudE9iai5jb21wbGV0ZSkgPT0gNTtcclxuICAgICAgICBpZiAoIGlzQ29tcGxldGUgKSB7XHJcbiAgICAgICAgICAgIC8vIOagt+W8j1xyXG4gICAgICAgICAgICAkZWwuYWRkQ2xhc3MoJ3RjLWNvbXBsZXRlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOWkhOeQhueUqOaIt+S6i+S7tlxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgaGFuZGxlUG9wb3ZlckhpZGUoKSB7XHJcbiAgICAgICAgLy/mr4/mrKHlh7rnjrDpg73muLLmn5PkuIDkuKrmlrDnmoRQb3BvdmVyXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGlzU2hvd2luZ0V2ZW50OiBmYWxzZVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlRGF0ZVNlbGVjdCggc3RhcnQsIGVuZCwganNFdmVudCwgdmlldyApIHtcclxuICAgICAgICBjb25zdCBhcmdzID0ge3N0YXJ0LCBlbmQsIGpzRXZlbnQsIHZpZXd9O1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBpc0NyZWF0aW5nRXZlbnQ6IHRydWUsXHJcbiAgICAgICAgICAgIHNlbGVjdGVkUmFuZ2U6IGFyZ3NcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZU1vZGFsQ2xvc2UoKSB7XHJcbiAgICAgICAgY29uc3QgJGNhbGVuZGFyID0gJCh0aGlzLmNhbGVuZGFyKTtcclxuICAgICAgICAkY2FsZW5kYXIuZnVsbENhbGVuZGFyKCd1bnNlbGVjdCcpXHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgaXNFZGl0aW5nRXZlbnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBpc0NyZWF0aW5nRXZlbnQ6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5aSE55CG5oyJ6ZKu5Yqf6IO9XHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICBoYW5kbGVFdmVudENyZWF0ZShldmVudERhdGEpIHtcclxuICAgICAgICBsZXQgeyBzdGFydCwgZW5kLCBhbGxEYXksIHRpdGxlLCBiYWNrZ3JvdW5kQ29sb3IgfSA9IGV2ZW50RGF0YTtcclxuICAgICAgICBjb25zdCBtb21lbnQgPSB0aGlzLmZ1bGxDYWxlbmRhci5tb21lbnQuYmluZCh0aGlzLmZ1bGxDYWxlbmRhcik7XHJcbiAgICAgICAgLy8g5aSE55CG5pel56iL5pWw5o2uXHJcbiAgICAgICAgc3RhcnQgPSBtb21lbnQoc3RhcnQpLCBlbmQgPSBtb21lbnQoZW5kKTtcclxuICAgICAgICBhbGxEYXkgPSAhKCBzdGFydC5oYXNUaW1lKCkgJiYgZW5kLmhhc1RpbWUoKSApO1xyXG4gICAgICAgIC8vIOaWsOW7uuaXpeeoi1xyXG4gICAgICAgIGNvbnN0IG5ld0V2ZW50ID0gbmV3IENhbGVuZGFyRXZlbnQoe1xyXG4gICAgICAgICAgICB0aXRsZTogdGl0bGUgfHwgJ+aXoOagh+mimCcsIFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGJhY2tncm91bmRDb2xvciB8fCAnIzMyQ0QzMicsXHJcbiAgICAgICAgICAgIHN0YXJ0LCBlbmQsIGFsbERheVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG5ld0V2ZW50LnNhdmVUb1dpekV2ZW50RG9jKCk7XHJcbiAgICAgICAgLy8g5re75Yqg5Yiw5pel5Y6GXHJcblx0XHQkKHRoaXMuY2FsZW5kYXIpLmZ1bGxDYWxlbmRhciggJ2FkZEV2ZW50U291cmNlJywge1xyXG5cdFx0XHRldmVudHM6IFtcclxuXHRcdFx0XHRuZXdFdmVudC50b0Z1bGxDYWxlbmRhckV2ZW50KClcclxuXHRcdFx0XVxyXG5cdFx0fSk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlRXZlbnRTYXZlKGV2ZW50LCBuZXdFdmVudERhdGEpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IHByb3AgaW4gbmV3RXZlbnREYXRhKSB7XHJcbiAgICAgICAgICAgIGV2ZW50W3Byb3BdID0gbmV3RXZlbnREYXRhW3Byb3BdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG5ld0V2ZW50ID0gbmV3IENhbGVuZGFyRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgIG5ld0V2ZW50LnNhdmVUb1dpekV2ZW50RG9jKCk7XHJcbiAgICAgICAgLy9cclxuICAgICAgICAkKHRoaXMuY2FsZW5kYXIpLmZ1bGxDYWxlbmRhciggJ3VwZGF0ZUV2ZW50JywgZXZlbnQgKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVFdmVudENvbXBsZXRlKGV2ZW50KSB7XHJcbiAgICAgICAgLy8g5L+u5pS55pWw5o2uXHJcbiAgICAgICAgY29uc3QgaXNDb21wbGV0ZSA9IHBhcnNlSW50KGV2ZW50LmNvbXBsZXRlKSA9PSA1O1xyXG4gICAgICAgIGlmICggaXNDb21wbGV0ZSApIHtcclxuICAgICAgICAgICAgZXZlbnQuY29tcGxldGUgPSAnMCc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZXZlbnQuY29tcGxldGUgPSAnNSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOS/neWtmOaVsOaNrlxyXG4gICAgICAgIGNvbnN0IG5ld0V2ZW50ID0gbmV3IENhbGVuZGFyRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgIG5ld0V2ZW50LnNhdmVUb1dpekV2ZW50RG9jKCk7XHJcbiAgICAgICAgLy9cclxuICAgICAgICAkKHRoaXMuY2FsZW5kYXIpLmZ1bGxDYWxlbmRhciggJ3VwZGF0ZUV2ZW50JywgZXZlbnQgKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVFdmVudEVkaXQoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgaXNFZGl0aW5nRXZlbnQ6IHRydWUsXHJcbiAgICAgICAgICAgIGVkaXRpbmdFdmVudDogZXZlbnRcclxuICAgICAgICB9KSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlRXZlbnREZWxldGVEYXRhKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCBXaXpDb25maXJtKFwi56Gu5a6a6KaB5Yig6Zmk6K+l5pel56iL77yfXCIsICfnlarojITliqnnkIYnKSApIHtcclxuICAgICAgICAgICAgLy8g5Yig6Zmk5pel56iLXHJcbiAgICAgICAgICAgIGxldCBuZXdFdmVudCA9IG5ldyBDYWxlbmRhckV2ZW50KGV2ZW50KTtcclxuICAgICAgICAgICAgbmV3RXZlbnQuZGVsZXRlRXZlbnREYXRhKGZhbHNlKTtcclxuICAgICAgICB9XHJcblx0XHQkKHRoaXMuY2FsZW5kYXIpLmZ1bGxDYWxlbmRhcigncmVtb3ZlRXZlbnRzJywgZXZlbnQuaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUV2ZW50RGVsZXRlRG9jKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCBXaXpDb25maXJtKFwi56Gu5a6a6KaB5Yig6Zmk6K+l5pel56iL5rqQ5paH5qGj77yfXFxu44CM56Gu5a6a44CN5bCG5Lya5a+86Ie055u45YWz56yU6K6w6KKr5Yig6Zmk77yBXCIsICfnlarojITliqnnkIYnKSApIHtcclxuICAgICAgICAgICAgbGV0IG5ld0V2ZW50ID0gbmV3IENhbGVuZGFyRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgICAgICBuZXdFdmVudC5kZWxldGVFdmVudERhdGEodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQodGhpcy5jYWxlbmRhcikuZnVsbENhbGVuZGFyKCdyZW1vdmVFdmVudHMnLCBldmVudC5pZCk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlRXZlbnRPcGVuRG9jKGV2ZW50KSB7XHJcbiAgICAgICAgY29uc3QgZG9jID0gb2JqRGF0YWJhc2UuRG9jdW1lbnRGcm9tR1VJRChldmVudC5pZCk7XHJcbiAgICAgICAgb2JqV2luZG93LlZpZXdEb2N1bWVudChkb2MsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUV2ZW50RWRpdE9yaWdpbkRhdGEoZXZlbnQpIHtcclxuICAgICAgICBjb25zdCBkb2MgPSBvYmpEYXRhYmFzZS5Eb2N1bWVudEZyb21HVUlEKGV2ZW50LmlkKTtcclxuICAgICAgICBvYmpDb21tb24uRWRpdENhbGVuZGFyRXZlbnQoZG9jKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDnlJ/lkb3lkajmnJ9cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuZnVsbENhbGVuZGFyID0gJCh0aGlzLmNhbGVuZGFyKS5mdWxsQ2FsZW5kYXIoJ2dldENhbGVuZGFyJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGlkPSd3aXotdG9tYXRvLWNhbGVuZGFyJyA+XHJcbiAgICAgICAgICAgICAgICA8Q2FsZW5kYXIgXHJcbiAgICAgICAgICAgICAgICAgICAgb25FdmVudENsaWNrPXt0aGlzLmhhbmRsZUV2ZW50Q2xpY2t9IFxyXG4gICAgICAgICAgICAgICAgICAgIG9uVmlld1JlbmRlcj17dGhpcy5oYW5kbGVWaWV3UmVuZGVyfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uRXZlbnREcm9wPXt0aGlzLmhhbmRsZUV2ZW50RHJvcH1cclxuICAgICAgICAgICAgICAgICAgICBvbkV2ZW50UmVzaXplPXt0aGlzLmhhbmRsZUV2ZW50UmVzaXplfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uRXZlbnRSZW5kZXI9e3RoaXMuaGFuZGxlRXZlbnRSZW5kZXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9e3RoaXMuaGFuZGxlRGF0ZVNlbGVjdH1cclxuICAgICAgICAgICAgICAgICAgICBvbkNhbGVuZGFyUmVuZGVyPXt0aGlzLmhhbmRsZUNhbGVuZGFyUmVuZGVyfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAhIXRoaXMuc3RhdGUuc2VsZWN0ZWRSYW5nZSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8RXZlbnRDcmVhdGVNb2RhbCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17J2NyZWF0ZScgKyB0aGlzLnN0YXRlLnNlbGVjdGVkUmFuZ2UuanNFdmVudC5wYWdlWH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3c9e3RoaXMuc3RhdGUuaXNDcmVhdGluZ0V2ZW50fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Nb2RhbENsb3NlPXt0aGlzLmhhbmRsZU1vZGFsQ2xvc2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxlbmRhcj17dGhpcy5jYWxlbmRhcn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ3JlYXRpbmdFdmVudD17dGhpcy5zdGF0ZS5pc0NyZWF0aW5nRXZlbnR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFJhbmdlPXt0aGlzLnN0YXRlLnNlbGVjdGVkUmFuZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkV2ZW50Q3JlYXRlPXt0aGlzLmhhbmRsZUV2ZW50Q3JlYXRlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICEhdGhpcy5zdGF0ZS5lZGl0aW5nRXZlbnQgJiYgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxFdmVudEVkaXRNb2RhbCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17J2VkaXQnICsgdGhpcy5zdGF0ZS5lZGl0aW5nRXZlbnQuaWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93PXt0aGlzLnN0YXRlLmlzRWRpdGluZ0V2ZW50fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Nb2RhbENsb3NlPXt0aGlzLmhhbmRsZU1vZGFsQ2xvc2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0aW5nRXZlbnQ9e3RoaXMuc3RhdGUuZWRpdGluZ0V2ZW50fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRXZlbnRTYXZlPXt0aGlzLmhhbmRsZUV2ZW50U2F2ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRXZlbnRDb21wbGV0ZT17dGhpcy5oYW5kbGVFdmVudENvbXBsZXRlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25FdmVudERlbGV0ZURhdGE9e3RoaXMuaGFuZGxlRXZlbnREZWxldGVEYXRhfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25FdmVudERlbGV0ZURvYz17dGhpcy5oYW5kbGVFdmVudERlbGV0ZURvY31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRXZlbnRPcGVuRG9jPXt0aGlzLmhhbmRsZUV2ZW50T3BlbkRvY30gICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRXZlbnRFZGl0T3JpZ2luRGF0YT17dGhpcy5oYW5kbGVFdmVudEVkaXRPcmlnaW5EYXRhfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICEhdGhpcy5zdGF0ZS5pc1Nob3dpbmdFdmVudCAmJiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgPEV2ZW50UG9wb3ZlciBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17J3BvcG92ZXInICsgdGhpcy5zdGF0ZS5jbGlja2VkQXJncy5ldmVudC5pZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50PXt0aGlzLnN0YXRlLmNsaWNrZWRBcmdzLmV2ZW50fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmZXJlbmNlPXt0aGlzLnN0YXRlLmNsaWNrZWRBcmdzLmpzRXZlbnQudGFyZ2V0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Qb3BvdmVySGlkZT17dGhpcy5oYW5kbGVQb3BvdmVySGlkZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkV2ZW50U2F2ZT17dGhpcy5oYW5kbGVFdmVudFNhdmV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkV2ZW50Q29tcGxldGU9e3RoaXMuaGFuZGxlRXZlbnRDb21wbGV0ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRXZlbnRFZGl0PXt0aGlzLmhhbmRsZUV2ZW50RWRpdH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRXZlbnREZWxldGVEYXRhPXt0aGlzLmhhbmRsZUV2ZW50RGVsZXRlRGF0YX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRXZlbnREZWxldGVEb2M9e3RoaXMuaGFuZGxlRXZlbnREZWxldGVEb2N9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkV2ZW50T3BlbkRvYz17dGhpcy5oYW5kbGVFdmVudE9wZW5Eb2N9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+IFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9DYWxlbmRhci5jc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vQ2FsZW5kYXIuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9DYWxlbmRhci5jc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgRnVsbENhbGVuZGFyIGZyb20gJy4vRnVsbENhbGVuZGFyJztcclxuaW1wb3J0ICdmdWxsY2FsZW5kYXItcmVhY3R3cmFwcGVyL2Rpc3QvY3NzL2Z1bGxjYWxlbmRhci5taW4uY3NzJztcclxuaW1wb3J0ICcuL0NhbGVuZGFyLmNzcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYWxlbmRhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBldmVudHM6IFtdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2FsZW5kYXIgPSBudWxsO1xyXG4gICAgICAgIC8v57uR5a6a5Y+l5p+EXHJcbiAgICAgICAgdGhpcy5oYW5kbGVGdWxsQ2FsZW5kYXJSZW5kZXIgPSB0aGlzLmhhbmRsZUZ1bGxDYWxlbmRhclJlbmRlci5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOS6i+S7tuWPpeafhFxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgaGFuZGxlRnVsbENhbGVuZGFyUmVuZGVyKGVsKSB7XHJcbiAgICAgICAgLy8gRnVsbENhbGVuZGFyIOa4suafk+S5i+WJjeaJp+ihjOatpOWPpeafhO+8jOS8oOWFpURPTVxyXG4gICAgICAgIHRoaXMuY2FsZW5kYXIgPSBlbDtcclxuICAgICAgICB0aGlzLnByb3BzLm9uQ2FsZW5kYXJSZW5kZXIoZWwpO1xyXG4gICAgfVxyXG4gXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6K6+572u5LqL5Lu25Y+l5p+EXHJcbiAgICAgICAgICog5Zug5Li6ZnVsbGNhbGVuZGFyLXJlYWN0V3JhcHBlcueahOWunueOsOaYr+ebtOaOpei/lOWbnjxkaXYgaWQ9J2Z1bGxjYWxlbmRhcic+PC9kaXY+XHJcbiAgICAgICAgICog5bm25LiU6LCD55SoJCgnI2Z1bGxjYWxlbmRhcicpLmZ1bGxjYWxlbmRhcih0aGlzLnByb3BzKei/m+ihjOaehOW7uu+8jOWboOatpFJlYWN05bm25rKh5pyJXHJcbiAgICAgICAgICog566h55CGRnVsbENhbGVuZGFy54q25oCB5ZKM5riy5p+T55qE6IO95Yqb44CC5omA5Lul55u05o6l5Zyo6K6+572u5Lit5YGa5aW9Y2FsbGJhY2vvvIzorqnmj5Lku7boh6rmiJHnrqHnkIbjgIJcclxuICAgICAgICAgKi9cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGlkPVwiY2FsZW5kYXItY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICA8RnVsbENhbGVuZGFyIG9uRnVsbENhbGVuZGFyUmVuZGVyID0ge3RoaXMuaGFuZGxlRnVsbENhbGVuZGFyUmVuZGVyfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWfuuacrOmFjee9rlxyXG4gICAgICAgICAgICAgICAgICAgIGlkID0gXCJjYWxlbmRhclwiXHJcbiAgICAgICAgICAgICAgICAgICAgdGhlbWVTeXN0ZW0gPSAnc3RhbmRhcmQnXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0ID0gJ3BhcmVudCdcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXIgPSB7e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAncHJldixuZXh0LHRvZGF5JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2VudGVyOiAndGl0bGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodDogJ21vbnRoLGFnZW5kYVdlZWssYWdlbmRhRGF5LGxpc3RXZWVrJ1xyXG4gICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5Lit5paH5YyWXHJcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uVGV4dCA9IHt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvZGF5OiAn5LuK5aSpJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9udGg6ICfmnIgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWVrOiAn5ZGoJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF5OiAn5pelJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdDogJ+ihqCdcclxuICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgIG1vbnRoTmFtZXMgPSB7W1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnMeaciCcsICcy5pyIJywgJzPmnIgnLCAnNOaciCcsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnNeaciCcsICc25pyIJywgJzfmnIgnLCAnOOaciCcsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnOeaciCcsICcxMOaciCcsICcxMeaciCcsICcxMuaciCdcclxuICAgICAgICAgICAgICAgICAgICBdfVxyXG4gICAgICAgICAgICAgICAgICAgIG1vbnRoTmFtZXNTaG9ydCA9IHtbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcx5pyIJywgJzLmnIgnLCAnM+aciCcsICc05pyIJywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc15pyIJywgJzbmnIgnLCAnN+aciCcsICc45pyIJywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc55pyIJywgJzEw5pyIJywgJzEx5pyIJywgJzEy5pyIJ1xyXG4gICAgICAgICAgICAgICAgICAgIF19XHJcbiAgICAgICAgICAgICAgICAgICAgZGF5TmFtZXMgPSB7W1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAn5ZGo5pelJywgJ+WRqOS4gCcsICflkajkuownLCAn5ZGo5LiJJywgJ+WRqOWbmycsICflkajkupQnLCAn5ZGo5YWtJ1xyXG4gICAgICAgICAgICAgICAgICAgIF19XHJcbiAgICAgICAgICAgICAgICAgICAgZGF5TmFtZXNTaG9ydCA9IHtbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICflkajml6UnLCAn5ZGo5LiAJywgJ+WRqOS6jCcsICflkajkuIknLCAn5ZGo5ZubJywgJ+WRqOS6lCcsICflkajlha0nXHJcbiAgICAgICAgICAgICAgICAgICAgXX1cclxuICAgICAgICAgICAgICAgICAgICBhbGxEYXlUZXh0ID0gJ+WFqOWkqSdcclxuICAgICAgICAgICAgICAgICAgICAvLyDorr7nva7op4blm75cclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmlldyA9ICdhZ2VuZGFXZWVrJ1xyXG4gICAgICAgICAgICAgICAgICAgIG5vd0luZGljYXRvciA9IHt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0RGF5ID0gezF9XHJcbiAgICAgICAgICAgICAgICAgICAgdmlld3MgPSB7e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZ2VuZGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pblRpbWU6IFwiMDg6MDA6MDBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsb3RMYWJlbEZvcm1hdDogJ2goOm1tKSBhJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgIG5hdkxpbmtzPSB7dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICBhbGxEYXlEZWZhdWx0ID0ge2ZhbHNlfVxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50TGltaXQ9IHt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOiuvue9ruS6i+S7tlxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGFibGUgPSB7dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RIZWxwZXIgPSB7dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICBlZGl0YWJsZSA9IHt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgIGZvcmNlRXZlbnREdXJhdGlvbiA9IHt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOiuvue9rlVJXHJcbiAgICAgICAgICAgICAgICAgICAgdW5zZWxlY3RDYW5jZWwgPSAnLm1vZGFsIConXHJcbiAgICAgICAgICAgICAgICAgICAgZHJhZ09wYWNpdHkgPSB7e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm1vbnRoXCI6IC41LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFnZW5kYVdlZWtcIjogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhZ2VuZGFEYXlcIjogMVxyXG4gICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6K6+572u5Y+l5p+EXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ID0ge3RoaXMucHJvcHMub25TZWxlY3R9XHJcbiAgICAgICAgICAgICAgICAgICAgdmlld1JlbmRlciA9IHt0aGlzLnByb3BzLm9uVmlld1JlbmRlcn1cclxuICAgICAgICAgICAgICAgICAgICBldmVudFJlbmRlciA9IHt0aGlzLnByb3BzLm9uRXZlbnRSZW5kZXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRDbGljayA9IHt0aGlzLnByb3BzLm9uRXZlbnRDbGlja31cclxuICAgICAgICAgICAgICAgICAgICBldmVudERyb3AgPSB7dGhpcy5wcm9wcy5vbkV2ZW50RHJvcH1cclxuICAgICAgICAgICAgICAgICAgICBldmVudFJlc2l6ZSA9IHt0aGlzLnByb3BzLm9uRXZlbnRSZXNpemV9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICQgZnJvbSBcImpxdWVyeVwiO1xyXG5pbXBvcnQgJ2Z1bGxjYWxlbmRhcic7XHJcbmltcG9ydCAnbW9tZW50JztcclxuXHJcbmNsYXNzIEZ1bGxjYWxlbmRhck9iamVjdE1hcHBlcntcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cclxuXHR9XHJcblxyXG5cdGdldFNldHRpbmdzKHByb3BlcnRpZXMpe1xyXG5cdFx0bGV0IG5ld1NldHRpbmdzID0ge307XHJcblx0XHRmb3IgKGNvbnN0IGtleSBpbiBwcm9wZXJ0aWVzKSB7XHJcbiAgICAgIFx0XHRpZiAocHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgXHRcdG5ld1NldHRpbmdzW2tleV0gPSBwcm9wZXJ0aWVzW2tleV07XHJcbiAgICAgIFx0XHR9XHJcbiAgICBcdH1cclxuICAgIFx0cmV0dXJuIG5ld1NldHRpbmdzO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnVsbENhbGVuZGFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0dGhpcy5qcSA9ICQubm9Db25mbGljdCgpO1xyXG5cdFx0dGhpcy5mdWxsY2FsZW5kYXJPYmplY3RNYXBwZXIgPSBuZXcgRnVsbGNhbGVuZGFyT2JqZWN0TWFwcGVyKCk7XHJcblx0XHR0aGlzLmluc3RhbmNlID0gbnVsbDtcclxuXHRcdHRoaXMuZGF0ZSA9IG5ldyBEYXRlKCk7XHJcblx0fVxyXG5cclxuXHRjb21wb25lbnREaWRNb3VudCgpe1xyXG5cdFx0dGhpcy5wcm9wcy5vbkZ1bGxDYWxlbmRhclJlbmRlcih0aGlzLmVsKTtcclxuXHRcdGNvbnN0IG9iamVjdE1hcHBlclNldHRpbmdzID0gdGhpcy5mdWxsY2FsZW5kYXJPYmplY3RNYXBwZXIuZ2V0U2V0dGluZ3ModGhpcy5wcm9wcyk7XHJcblx0XHR0aGlzLmluc3RhbmNlID0gdGhpcy5qcSh0aGlzLmVsKS5mdWxsQ2FsZW5kYXIob2JqZWN0TWFwcGVyU2V0dGluZ3MpO1xyXG5cdH1cclxuXHJcblx0cmVuZGVyKCl7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBpZD0nY2FsZW5kYXInIHJlZj17IGVsID0+IHRoaXMuZWwgPSBlbCB9PjwvZGl2PlxyXG5cdFx0KVxyXG5cdH1cclxufSIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL0V2ZW50UG9wb3Zlci5jc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vRXZlbnRQb3BvdmVyLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vRXZlbnRQb3BvdmVyLmNzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAnLi9FdmVudFBvcG92ZXIuY3NzJztcclxuaW1wb3J0IFBvcHBlciBmcm9tICdwb3BwZXIuanMnO1xyXG5pbXBvcnQgUG9wb3ZlclRpdGxlSW5wdXQgZnJvbSAnLi9Qb3BvdmVyVGl0bGVJbnB1dCc7XHJcbmltcG9ydCBQb3BvdmVyVG9vbGJhciBmcm9tICcuL1BvcG92ZXJUb29sYmFyJztcclxuaW1wb3J0IHsgRm9ybSwgR2x5cGhpY29uIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcclxuaW1wb3J0IERhdGVUaW1lUGlja2VyR3JvdXAgZnJvbSAnLi4vRm9ybS9EYXRlVGltZVBpY2tlckdyb3VwJztcclxuaW1wb3J0IENvbG9yUGlja2VyR3JvdXAgZnJvbSAnLi4vRm9ybS9Db2xvclBpY2tlckdyb3VwJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50UG9wb3ZlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnBvcHBlck5vZGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucG9wcGVySW5zdGFuY2UgPSBudWxsO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgbmV3RXZlbnREYXRhOiB7fVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDnu5Hlrprkuovku7ZcclxuICAgICAgICB0aGlzLmF1dG9IaWRlID0gdGhpcy5hdXRvSGlkZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlRGF0ZVRpbWVDaGFuZ2UgPSB0aGlzLmhhbmRsZURhdGVUaW1lQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVUaXRsZUNoYW5nZSA9IHRoaXMuaGFuZGxlVGl0bGVDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUNvbG9yQ2hhbmdlID0gdGhpcy5oYW5kbGVDb2xvckNoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQnRuQ2xpY2sgPSB0aGlzLmhhbmRsZUJ0bkNsaWNrLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5Yqo55S75pWI5p6cXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICBhdXRvSGlkZShlKSB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAvLyDkuI3mmK/ml6Xljobkuovku7blhYPntKBcclxuICAgICAgICAgICAgISQodGhpcy5wcm9wcy5yZWZlcmVuY2UpLmlzKGUudGFyZ2V0KSAmJlxyXG4gICAgICAgICAgICAvLyDkuZ/kuI3mmK/lrZDlhYPntKBcclxuICAgICAgICAgICAgJCh0aGlzLnByb3BzLnJlZmVyZW5jZSkuaGFzKGUudGFyZ2V0KS5sZW5ndGggPT09IDAgJiZcclxuICAgICAgICAgICAgLy8g5LiN5pivcG9wcGVy5YWD57SgXHJcbiAgICAgICAgICAgICEkKHRoaXMucG9wcGVyTm9kZSkuaXMoZS50YXJnZXQpICYmXHJcbiAgICAgICAgICAgIC8vIOS5n+S4jeaYr+WtkOWFg+e0oFxyXG4gICAgICAgICAgICAkKHRoaXMucG9wcGVyTm9kZSkuaGFzKGUudGFyZ2V0KS5sZW5ndGggPT09IDBcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhpZGUoKSB7XHJcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XHJcbiAgICAgICAgICAgICQodGhhdC5wb3BwZXJOb2RlKS5oaWRlKDAsIG51bGwsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnByb3BzLm9uUG9wb3ZlckhpZGUoKTsgLy9UT0RPOiDkuqTnlLHniLblhYPntKDljbjovb3or6Xnu4Tku7blrp7kvovvvIzmhJ/op4nov5nph4zkuI3lpqVcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzaG93KCkge1xyXG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xyXG4gICAgICAgICAgICAkKHRoYXQucG9wcGVyTm9kZSkuZmFkZUluKDM1MCwgbnVsbCwgcmVzb2x2ZSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyDkuovku7blj6Xmn4RcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIGhhbmRsZVRpdGxlQ2hhbmdlKGUpIHtcclxuICAgICAgICAvL+WCqOWtmOWIsOWwhuaWsOeahOWAvOWCqOWtmG5ld0V2ZW50RGF0YemHjO+8jOW9k+S/neWtmOaXtuajgOe0om5ld0V2ZW50RGF0YeWIl+ihqFxyXG4gICAgICAgIGNvbnN0IG5ld1RpdGxlID0gZS50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShmdW5jdGlvbihwcmV2U3RhdGUsIHByb3BzKSB7XHJcbiAgICAgICAgICAgIC8v5ou36LSd5YmN5LiA5Liq5a+56LGhXHJcbiAgICAgICAgICAgIGNvbnN0IG5ld0V2ZW50RGF0YSA9ICQuZXh0ZW5kKHt9LCBwcmV2U3RhdGUubmV3RXZlbnREYXRhKVxyXG4gICAgICAgICAgICBuZXdFdmVudERhdGEudGl0bGUgPSBuZXdUaXRsZTtcclxuICAgICAgICAgICAgcmV0dXJuIHsgbmV3RXZlbnREYXRhIH07XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDb2xvckNoYW5nZShjb2xvclZhbHVlKSB7XHJcbiAgICAgICAgY29uc3QgbmV3Q29sb3IgPSBjb2xvclZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoZnVuY3Rpb24ocHJldlN0YXRlLCBwcm9wcykge1xyXG4gICAgICAgICAgICAvL+aLt+i0neWJjeS4gOS4quWvueixoVxyXG4gICAgICAgICAgICBjb25zdCBuZXdFdmVudERhdGEgPSAkLmV4dGVuZCh7fSwgcHJldlN0YXRlLm5ld0V2ZW50RGF0YSlcclxuICAgICAgICAgICAgbmV3RXZlbnREYXRhLmJhY2tncm91bmRDb2xvciA9IG5ld0NvbG9yO1xyXG4gICAgICAgICAgICByZXR1cm4geyBuZXdFdmVudERhdGEgfTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZURhdGVUaW1lQ2hhbmdlKGUpIHtcclxuICAgICAgICAvL+aaguaXtuS4jeWFgeiuuOabtOaUuVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUJ0bkNsaWNrKGUpIHtcclxuICAgICAgICBjb25zdCBpZCA9IGUudGFyZ2V0LmlkO1xyXG4gICAgICAgIGNvbnN0IGJ0blR5cGUgPSBpZC5zcGxpdCgnLScpWzJdO1xyXG4gICAgICAgIGNvbnN0IGhhbmRsZU5hbWUgPSBgb25FdmVudCR7YnRuVHlwZX1gO1xyXG4gICAgICAgIHRoaXMuaGlkZSgpLnRoZW4oIChyZXQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wc1toYW5kbGVOYW1lXSh0aGlzLnByb3BzLmV2ZW50LCB0aGlzLnN0YXRlLm5ld0V2ZW50RGF0YSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyDnlJ/lkb3lkajmnJ9cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIC8vIOWIneWni+WMlue7hOS7tlxyXG4gICAgICAgIHRoaXMucG9wcGVySW5zdGFuY2UgPSBuZXcgUG9wcGVyKHRoaXMucHJvcHMucmVmZXJlbmNlLCB0aGlzLnBvcHBlck5vZGUsIHtcclxuXHRcdFx0cGxhY2VtZW50OiAnYXV0bycsXHJcblx0XHRcdG1vZGlmaWVyczoge1xyXG5cdFx0XHRcdGFycm93OiB7XHJcblx0XHRcdFx0ICBlbGVtZW50OiAnLmFycm93J1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdH0pO1xyXG4gICAgICAgIC8vIOiuvue9ruiHquWKqOmakOiXj1xyXG4gICAgICAgICQoZG9jdW1lbnQpLm9mZignY2xpY2snLCB0aGlzLmF1dG9IaWRlKS5vbignY2xpY2snLCB0aGlzLmF1dG9IaWRlKTtcclxuICAgICAgICAvLyDmmL7npLpcclxuICAgICAgICB0aGlzLnNob3coKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUsIHNuYXBzaG90KSB7XHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLnNob3coKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcclxuICAgICAgICAvLyDlvZPmm7TmlrDlsZ7mgKfml7bmiY3op6blj5HliqjnlLvmlYjmnpxcclxuICAgICAgICBpZiAoIG5leHRQcm9wcyAhPSB0aGlzLnByb3BzICkge1xyXG4gICAgICAgICAgICAvLyDorr7nva7mm7TmlrDml7bnmoTliqjnlLtcclxuICAgICAgICAgICAgdGhpcy5oaWRlKCkudGhlbiggKHJldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy/mm7TmlrDlrprkvY1cclxuICAgICAgICAgICAgICAgIHRoaXMucG9wcGVySW5zdGFuY2UucmVmZXJlbmNlID0gbmV4dFByb3BzLnJlZmVyZW5jZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9wcGVySW5zdGFuY2UudXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ2NsaWNrJywgdGhpcy5hdXRvSGlkZSk7XHJcbiAgICAgICAgdGhpcy5wb3BwZXJJbnN0YW5jZS5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IGV2ZW50U3RhcnQgPSB0aGlzLnByb3BzLmV2ZW50LnN0YXJ0LmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG4gICAgICAgIGNvbnN0IGNvbG9yVmFsdWUgPSB0aGlzLnByb3BzLmV2ZW50LmJhY2tncm91bmRDb2xvcjtcclxuICAgICAgICBjb25zdCBlbmFibGVTYXZlQnRuID0gISF0aGlzLnN0YXRlLm5ld0V2ZW50RGF0YS50aXRsZSB8fCAhIXRoaXMuc3RhdGUubmV3RXZlbnREYXRhLmJhY2tncm91bmRDb2xvcjtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRjLXBvcG92ZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7ZGlzcGxheTogJ25vbmUnfX1cclxuICAgICAgICAgICAgICAgICAgICByZWY9eyhkaXYpID0+IHRoaXMucG9wcGVyTm9kZSA9IGRpdn0gPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhcnJvd1wiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0Yy1wb3BvdmVyLWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxQb3BvdmVyVGl0bGVJbnB1dCBcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXsndGl0bGUnICsgdGhpcy5wcm9wcy5ldmVudC5pZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRUaXRsZT17dGhpcy5wcm9wcy5ldmVudC50aXRsZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25UaXRsZUNoYW5nZT17dGhpcy5oYW5kbGVUaXRsZUNoYW5nZX0gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEZvcm09J3RjLXBvcG92ZXItZXZlbnQtZWRpdEZvcm0nIC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGMtcG9wb3Zlci1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm0gaG9yaXpvbnRhbCBpZD0ndGMtcG9wb3Zlci1ldmVudC1lZGl0Rm9ybSc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxEYXRlVGltZVBpY2tlckdyb3VwIGhvcml6b250YWwgcmVhZE9ubHkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sSWQ9ICd0Yy1lZGl0cG9wcGVyLWV2ZW50ZGF0ZScgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD17PGkgY2xhc3NOYW1lPSdmYXIgZmEtY2FsZW5kYXItYWx0IGZhLWxnJyAvPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtldmVudFN0YXJ0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25EYXRlVGltZUNoYW5nZT17dGhpcy5oYW5kbGVEYXRlVGltZUNoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbG9yUGlja2VyR3JvdXAgaG9yaXpvbnRhbCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17J2JhY2tncm91bmRDb2xvcicgKyB0aGlzLnByb3BzLmV2ZW50LmlkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbElkPSd0Yy1lZGl0cG9wcGVyLWV2ZW50Y29sb3InIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9ezxpIGNsYXNzTmFtZT0nZmFzIGZhLXBhaW50LWJydXNoIGZhLWxnJyAvPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtjb2xvclZhbHVlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Db2xvckNoYW5nZT17dGhpcy5oYW5kbGVDb2xvckNoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L0Zvcm0+XHJcbiAgICAgICAgICAgICAgICAgICAgPFBvcG92ZXJUb29sYmFyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlPXt0aGlzLnByb3BzLmV2ZW50LmNvbXBsZXRlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVTYXZlQnRuPXtlbmFibGVTYXZlQnRufVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkJ0bkNsaWNrPXt0aGlzLmhhbmRsZUJ0bkNsaWNrfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL1BvcG92ZXJUaXRsZUlucHV0LmNzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9Qb3BvdmVyVGl0bGVJbnB1dC5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL1BvcG92ZXJUaXRsZUlucHV0LmNzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAnLi9Qb3BvdmVyVGl0bGVJbnB1dC5jc3MnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRUaXRsZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICAvL+WIneWni+WMlueKtuaAgVxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLmV2ZW50VGl0bGVcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZSA9IHRoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQ2hhbmdlKGUpIHtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBlLnRhcmdldC52YWx1ZX0pXHJcbiAgICAgICAgLy/lsIbkuovku7bkvKDpgJLkuIrljrtcclxuICAgICAgICB0aGlzLnByb3BzLm9uVGl0bGVDaGFuZ2UoZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwidGMtZWRpdHBvcHBlci1ldmVudHRpdGxlXCIgXHJcbiAgICAgICAgICAgICAgICBodG1sRm9yPXt0aGlzLnByb3BzLnRhcmdldEZvcm19XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9J2V2ZW50dGl0bGUnXHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCB7IEJ1dHRvbiwgQnV0dG9uR3JvdXAsIEJ1dHRvblRvb2xiYXIsIFNwbGl0QnV0dG9uLCBEcm9wZG93biwgTWVudUl0ZW0gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wb3ZlclRvb2xiYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxCdXR0b25Ub29sYmFyPlxyXG4gICAgICAgICAgICAgICAgPEJ1dHRvbkdyb3VwPlxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b24gaWQ9J3RjLWVkaXRwb3BwZXItU2F2ZScgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25CdG5DbGlja31cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyF0aGlzLnByb3BzLmVuYWJsZVNhdmVCdG59PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICDkv53lrZhcclxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGlkPSd0Yy1lZGl0cG9wcGVyLUNvbXBsZXRlJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQnRuQ2xpY2t9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7cGFyc2VJbnQodGhpcy5wcm9wcy5jb21wbGV0ZSkgPT0gNSA/ICfmgaLlpI0nIDogJ+WujOaIkCd9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBpZD0ndGMtZWRpdHBvcHBlci1FZGl0J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQnRuQ2xpY2t9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICDnvJbovpFcclxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGlkPSd0Yy1lZGl0cG9wcGVyLURlbGV0ZURhdGEnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25CdG5DbGlja30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIOWIoOmZpFxyXG4gICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgPERyb3Bkb3duIGlkPSd0Yy1lZGl0cG9wcGVyLWV4dHJhJyBwdWxsUmlnaHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxEcm9wZG93bi5Ub2dnbGUgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPERyb3Bkb3duLk1lbnU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TWVudUl0ZW0gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRLZXk9XCIxXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9J3RjLWVkaXRwb3BwZXItT3BlbkRvYydcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQnRuQ2xpY2t9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOaJk+W8gOa6kOaWh+aho1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9NZW51SXRlbT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxNZW51SXRlbSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudEtleT1cIjJcIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD0ndGMtZWRpdHBvcHBlci1EZWxldGVEb2MnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5vbkJ0bkNsaWNrfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDliKDpmaTmupDmlofmoaNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTWVudUl0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvRHJvcGRvd24uTWVudT5cclxuICAgICAgICAgICAgICAgICAgICA8L0Ryb3Bkb3duPlxyXG4gICAgICAgICAgICAgICAgPC9CdXR0b25Hcm91cD5cclxuICAgICAgICAgICAgPC9CdXR0b25Ub29sYmFyPlxyXG4gICAgICAgIClcclxuICAgIH1cclxufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCwgQ29udHJvbExhYmVsLCBDb2x9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdXRvRm9ybUdyb3VwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgaXNIb3Jpem9udGFsID0gdGhpcy5wcm9wcy5ob3Jpem9udGFsO1xyXG4gICAgICAgIGlmIChpc0hvcml6b250YWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxGb3JtR3JvdXAgY29udHJvbElkPXt0aGlzLnByb3BzLmNvbnRyb2xJZH0+XHJcbiAgICAgICAgICAgICAgICAgICAgPENvbCBjb21wb25lbnRDbGFzcz17Q29udHJvbExhYmVsfSBzbT17Mn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxhYmVsfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvQ29sPlxyXG4gICAgICAgICAgICAgICAgICAgIDxDb2wgc209ezEwfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XHJcbiAgICAgICAgICAgICAgICAgICAgPC9Db2w+XHJcbiAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8Rm9ybUdyb3VwIGNvbnRyb2xJZD17dGhpcy5wcm9wcy5jb250cm9sSWR9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxDb250cm9sTGFiZWw+e3RoaXMucHJvcHMubGFiZWx9PC9Db250cm9sTGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XHJcbiAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEF1dG9Gb3JtR3JvdXAgZnJvbSAnLi9BdXRvRm9ybUdyb3VwJztcclxuY29uc3QgSHVlYmVlID0gcmVxdWlyZSgnaHVlYmVlL2Rpc3QvaHVlYmVlLnBrZ2QnKTsgXHJcbmltcG9ydCAnaHVlYmVlL2Rpc3QvaHVlYmVlLmNzcyc7XHJcblxyXG5jbGFzcyBDb2xvcklucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLnZhbHVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlID0gdGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDaGFuZ2UoanNFdmVudE9yVmFsdWUpIHtcclxuICAgICAgICBsZXQgbmV3Q29sb3JWYWx1ZTtcclxuICAgICAgICBpZiAoIHR5cGVvZiBqc0V2ZW50T3JWYWx1ZSA9PSAnb2JqZWN0JyApIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IGpzRXZlbnRPclZhbHVlLnRhcmdldC52YWx1ZX0pO1xyXG4gICAgICAgICAgICBuZXdDb2xvclZhbHVlID0ganNFdmVudE9yVmFsdWUudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIHR5cGVvZiBqc0V2ZW50T3JWYWx1ZSA9PSAnc3RyaW5nJyApIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IGpzRXZlbnRPclZhbHVlfSk7XHJcbiAgICAgICAgICAgIG5ld0NvbG9yVmFsdWUgPSBqc0V2ZW50T3JWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNvbG9yQ2hhbmdlKG5ld0NvbG9yVmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vVE9ETzog5qC55o2u6aWx5ZKM5bqm6K6h566X5a2X5L2T6aKc6ImyXHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgLy8g5Yid5aeL5YyW57uE5Lu2XHJcbiAgICAgICAgdGhpcy5odWViZWVJbnN0YW5jZSA9IG5ldyBIdWViZWUodGhpcy5lbCwge1xyXG4gICAgICAgICAgICBzdGF0aWNPcGVuOiBmYWxzZSwgLy8gRGlzcGxheXMgb3BlbiBhbmQgc3RheXMgb3Blbi4gXHJcbiAgICAgICAgICAgIHNldFRleHQ6IHRydWUsIC8vIFNldHMgZWxlbWVudHPigJkgdGV4dCB0byBjb2xvci4g5bCG5Y6f5aeL55qE5paH5pys6K6+572u6K6+572u5oiQ6aKc6Imy5YC8LlxyXG4gICAgICAgICAgICBzZXRCR0NvbG9yOiB0cnVlLCAvLyBTZXRzIGVsZW1lbnRz4oCZIGJhY2tncm91bmQgY29sb3IgdG8gY29sb3IuXHJcbiAgICAgICAgICAgIGh1ZXM6IDEyLCAvLyBOdW1iZXIgb2YgaHVlcyBvZiB0aGUgY29sb3IgZ3JpZC4gSHVlcyBhcmUgc2xpY2VzIG9mIHRoZSBjb2xvciB3aGVlbC5cclxuICAgICAgICAgICAgaHVlMDogMCwgLy8gVGhlIGZpcnN0IGh1ZSBvZiB0aGUgY29sb3IgZ3JpZC4gXHJcbiAgICAgICAgICAgIHNoYWRlczogNSwgLy8gTnVtYmVyIG9mIHNoYWRlcyBvZiBjb2xvcnMgYW5kIHNoYWRlcyBvZiBncmF5IGJldHdlZW4gd2hpdGUgYW5kIGJsYWNrLiBcclxuICAgICAgICAgICAgc2F0dXJhdGlvbnM6IDIsIC8vIE51bWJlciBvZiBzZXRzIG9mIHNhdHVyYXRpb24gb2YgdGhlIGNvbG9yIGdyaWQuXHJcbiAgICAgICAgICAgIG5vdGF0aW9uOiAnaGV4JywgLy8gVGV4dCBzeW50YXggb2YgY29sb3JzIHZhbHVlcy5cclxuICAgICAgICAgICAgY2xhc3NOYW1lOiBudWxsLCAvLyBDbGFzcyBhZGRlZCB0byBIdWViZWUgZWxlbWVudC4gVXNlZnVsIGZvciBDU1MuXHJcbiAgICAgICAgICAgIGN1c3RvbUNvbG9yczogWyBcclxuICAgICAgICAgICAgICAgICcjMzJDRDMyJywgJyM1NDg0RUQnLCAnI0E0QkRGRScsIFxyXG4gICAgICAgICAgICAgICAgJyM0NkQ2REInLCAnIzdBRTdCRicsICcjNTFCNzQ5JyxcclxuICAgICAgICAgICAgICAgICcjRkJENzVCJywgJyNGRkI4NzgnLCAnI0ZGODg3QycsIFxyXG4gICAgICAgICAgICAgICAgJyNEQzIxMjcnLCAnI0RCQURGRicsICcjRTFFMUUxJ1x0XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvL+WIneWni+WMluminOiJslxyXG4gICAgICAgIHRoaXMuaHVlYmVlSW5zdGFuY2Uuc2V0Q29sb3IodGhpcy5wcm9wcy52YWx1ZSk7XHJcbiAgICAgICAgLy/nm5HlkKxodWViZWXpopzoibLpgInmi6lcclxuICAgICAgICB0aGlzLmh1ZWJlZUluc3RhbmNlLm9uKCAnY2hhbmdlJywgdGhpcy5oYW5kbGVDaGFuZ2UpXHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xyXG4gICAgICAgIC8vIOaJi+WKqOabtOaWsHZhbHVlXHJcbiAgICAgICAgdGhpcy5odWViZWVJbnN0YW5jZS5zZXRDb2xvcih0aGlzLnN0YXRlLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICAvL+azqOaEj++8jGh1ZWJlZeayoeaciWRlc3Ryb3nnmoTmlrnms5VcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0nZm9ybS1jb250cm9sJyBcclxuICAgICAgICAgICAgICAgIHJlZj17ZWwgPT4gdGhpcy5lbCA9IGVsfVxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfSAvL+ebkeWQrOmUruebmOi+k+WFpVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgIClcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbG9yUGlja2VyR3JvdXAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2UgPSB0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNoYW5nZShjb2xvclZhbHVlKSB7XHJcbiAgICAgICAgLy/lkJHkuIrkvKDpgJJcclxuICAgICAgICB0aGlzLnByb3BzLm9uQ29sb3JDaGFuZ2UoY29sb3JWYWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHsgaG9yaXpvbnRhbCwgY29udHJvbElkLCBsYWJlbH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxBdXRvRm9ybUdyb3VwIHsuLi57IGhvcml6b250YWwsIGNvbnRyb2xJZCwgbGFiZWwgfX0+XHJcbiAgICAgICAgICAgICAgICA8Q29sb3JJbnB1dCB7Li4udGhpcy5wcm9wc30vPlxyXG4gICAgICAgICAgICA8L0F1dG9Gb3JtR3JvdXA+XHJcbiAgICAgICAgKVxyXG5cclxuICAgIH1cclxufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIENvbnRyb2xMYWJlbCwgQ29sLCBGb3JtQ29udHJvbCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcbmltcG9ydCBBdXRvRm9ybUdyb3VwIGZyb20gJy4vQXV0b0Zvcm1Hcm91cCc7XHJcbmltcG9ydCAnbW9tZW50JztcclxuaW1wb3J0ICdib290c3RyYXAvanMvY29sbGFwc2UnO1xyXG5pbXBvcnQgJ2Jvb3RzdHJhcC9qcy90cmFuc2l0aW9uJztcclxuaW1wb3J0ICdlb25hc2Rhbi1ib290c3RyYXAtZGF0ZXRpbWVwaWNrZXInO1xyXG5pbXBvcnQgJ2VvbmFzZGFuLWJvb3RzdHJhcC1kYXRldGltZXBpY2tlci9idWlsZC9jc3MvYm9vdHN0cmFwLWRhdGV0aW1lcGlja2VyLmNzcyc7XHJcblxyXG5jbGFzcyBEYXRlVGltZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLnZhbHVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlID0gdGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDaGFuZ2UoZSkgeyBcclxuICAgICAgICBjb25zdCBuZXdEYXRlVmFsdWUgPSBlLmRhdGUuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJylcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogbmV3RGF0ZVZhbHVlfSk7XHJcbiAgICAgICAgLy8g5Lyg6YCSXHJcbiAgICAgICAgdGhpcy5wcm9wcy5vbkRhdGVUaW1lQ2hhbmdlKG5ld0RhdGVWYWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgLy8g5Yid5aeL5YyW57uE5Lu2XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucmVhZE9ubHkpIHRoaXMuZWwucmVhZE9ubHkgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuJGVsID0gJCh0aGlzLmVsKS5kYXRldGltZXBpY2tlcih7XHJcbiAgICAgICAgICAgIHNob3dUb2RheUJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgbG9jYWxlOiAnemgtY24nLFxyXG4gICAgICAgICAgICBmb3JtYXQ6ICdZWVlZLU1NLUREIEhIOm1tOnNzJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZSA9IHRoaXMuJGVsLmRhdGEoXCJEYXRlVGltZVBpY2tlclwiKTtcclxuICAgICAgICAvLyDliJ3lp4vljJblgLxcclxuICAgICAgICB0aGlzLmluc3RhbmNlLmRhdGUodGhpcy5wcm9wcy52YWx1ZSk7XHJcbiAgICAgICAgLy8g57uR5a6aY2hhbmdl5LqL5Lu2XHJcbiAgICAgICAgLy8g5pS+5Zyo5Yid5aeL5YyW5ZCO6L+b6KGM57uR5a6a77yM6YG/5YWN5Yid5aeL5YyW6L+H56iL6Kem5Y+RY2hhbmdl5LqL5Lu2XHJcbiAgICAgICAgdGhpcy4kZWwub24oXCJkcC5jaGFuZ2VcIiwgdGhpcy5oYW5kbGVDaGFuZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcclxuICAgICAgICAvLyDmiYvliqjmm7TmlrB2YWx1ZVxyXG4gICAgICAgIHRoaXMuaW5zdGFuY2UuZGF0ZSh0aGlzLnN0YXRlLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICAvLyBkZXN0cm95XHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5kZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy4kZWwub2ZmKFwiZHAuY2hhbmdlXCIsIHRoaXMuaGFuZGxlQ2hhbmdlKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0nZm9ybS1jb250cm9sJyBcclxuICAgICAgICAgICAgICAgIHJlZj17ZWwgPT4gdGhpcy5lbCA9IGVsfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgIClcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGVUaW1lUGlja2VyR3JvdXAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHsgaG9yaXpvbnRhbCwgY29udHJvbElkLCBsYWJlbH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxBdXRvRm9ybUdyb3VwIHsuLi57IGhvcml6b250YWwsIGNvbnRyb2xJZCwgbGFiZWwgfX0+XHJcbiAgICAgICAgICAgICAgICA8RGF0ZVRpbWVJbnB1dCB7Li4udGhpcy5wcm9wc30gLz5cclxuICAgICAgICAgICAgPC9BdXRvRm9ybUdyb3VwPiAgICAgICAgICAgIFxyXG4gICAgICAgIClcclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBSb3csIENvbCwgRm9ybSwgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgQ29udHJvbExhYmVsIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcclxuaW1wb3J0IFRpdGxlSW5wdXRHcm91cCBmcm9tICcuL1RpdGxlSW5wdXRHcm91cCc7XHJcbmltcG9ydCBEYXRlVGltZVBpY2tlckdyb3VwIGZyb20gJy4vRGF0ZVRpbWVQaWNrZXJHcm91cCc7XHJcbmltcG9ydCBDb2xvclBpY2tlckdyb3VwIGZyb20gJy4vQ29sb3JQaWNrZXJHcm91cCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBFdmVudERldGFpbEZvcm0ocHJvcHMpIHtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVUaXRsZUNoYW5nZSA9IHByb3BzLm9uVGl0bGVDaGFuZ2U7XHJcbiAgICBjb25zdCBoYW5kbGVTdGFydENoYW5nZSA9IHByb3BzLm9uU3RhcnRDaGFuZ2U7XHJcbiAgICBjb25zdCBoYW5kbGVFbmRDaGFuZ2UgPSBwcm9wcy5vbkVuZENoYW5nZTtcclxuICAgIGNvbnN0IGhhbmRsZUNvbG9yQ2hhbmdlID0gcHJvcHMub25Db2xvcmNoYW5nZTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxGb3JtPlxyXG4gICAgICAgICAgICA8VGl0bGVJbnB1dEdyb3VwIFxyXG4gICAgICAgICAgICAgICAgYXV0b0ZvY3VzXHJcbiAgICAgICAgICAgICAgICBjb250cm9sSWQ9XCJ0Yy1jcmVhdGVwYWdlLWV2ZW50dGl0bGVcIlxyXG4gICAgICAgICAgICAgICAgbGFiZWw9XCLmoIfpophcIlxyXG4gICAgICAgICAgICAgICAgdmFsdWU9e3Byb3BzLmV2ZW50VGl0bGV9IFxyXG4gICAgICAgICAgICAgICAgb25UaXRsZUNoYW5nZT17aGFuZGxlVGl0bGVDaGFuZ2V9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxSb3c+XHJcbiAgICAgICAgICAgICAgICA8Q29sIHNtPXs2fT5cclxuICAgICAgICAgICAgICAgICAgICA8RGF0ZVRpbWVQaWNrZXJHcm91cCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbElkPVwidGMtY3JlYXRlcGFnZS1ldmVudHN0YXJ0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCLlvIDlp4vml6XmnJ9cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17cHJvcHMuc3RhcnR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRGF0ZVRpbWVDaGFuZ2U9e2hhbmRsZVN0YXJ0Q2hhbmdlfSAgLz5cclxuICAgICAgICAgICAgICAgIDwvQ29sPlxyXG4gICAgICAgICAgICAgICAgPENvbCBzbT17Nn0+XHJcbiAgICAgICAgICAgICAgICAgICAgPERhdGVUaW1lUGlja2VyR3JvdXAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xJZD1cInRjLWNyZWF0ZXBhZ2UtZXZlbnRlbmRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIue7k+adn+aXpeacn1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwcm9wcy5lbmR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRGF0ZVRpbWVDaGFuZ2U9e2hhbmRsZUVuZENoYW5nZX0gIC8+XHJcbiAgICAgICAgICAgICAgICA8L0NvbD5cclxuICAgICAgICAgICAgPC9Sb3c+XHJcbiAgICAgICAgICAgIDxSb3c+XHJcbiAgICAgICAgICAgICAgICA8Q29sIHNtPXs2fT5cclxuICAgICAgICAgICAgICAgICAgICA8Q29sb3JQaWNrZXJHcm91cCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbElkPVwidGMtY3JlYXRlcGFnZS1ldmVudGNvbG9yXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCLoibLlvalcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17cHJvcHMuYmFja2dyb3VuZENvbG9yfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNvbG9yQ2hhbmdlPXtoYW5kbGVDb2xvckNoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPC9Db2w+XHJcbiAgICAgICAgICAgICAgICA8Q29sIHNtPXs2fT5cclxuICAgICAgICAgICAgICAgICAgICA8Rm9ybUdyb3VwIGNvbnRyb2xJZD1cInRjLWNyZWF0ZXBhZ2UtZXZlbnR0YWdzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxDb250cm9sTGFiZWw+5qCH562+PC9Db250cm9sTGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbCByZWFkT25seS8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9Gb3JtR3JvdXA+ICAgICBcclxuICAgICAgICAgICAgICAgIDwvQ29sPlxyXG4gICAgICAgICAgICA8L1Jvdz5cclxuICAgICAgICAgICAgPEZvcm1Hcm91cCBjb250cm9sSWQ9XCJ0Yy1jcmVhdGVwYWdlLWV2ZW50cmVtYXJrXCI+XHJcbiAgICAgICAgICAgICAgICA8Q29udHJvbExhYmVsPuWkh+azqDwvQ29udHJvbExhYmVsPlxyXG4gICAgICAgICAgICAgICAgPEZvcm1Db250cm9sIHJlYWRPbmx5IGNvbXBvbmVudENsYXNzPVwidGV4dGFyZWFcIiAvPlxyXG4gICAgICAgICAgICA8L0Zvcm1Hcm91cD5cclxuICAgICAgICA8L0Zvcm0+XHJcbiAgICApXHJcbn1cclxuXHJcbi8qXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50RGV0YWlsRm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgLy/nlLHniLbnu4Tku7botJ/otKPlpITnkIbmlbDmja5cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgaGFuZGxlVGl0bGVDaGFuZ2UgPSB0aGlzLnByb3BzLm9uVGl0bGVDaGFuZ2U7XHJcbiAgICAgICAgY29uc3QgaGFuZGxlU3RhcnRDaGFuZ2UgPSB0aGlzLnByb3BzLm9uU3RhcnRDaGFuZ2U7XHJcbiAgICAgICAgY29uc3QgaGFuZGxlRW5kQ2hhbmdlID0gdGhpcy5wcm9wcy5vbkVuZENoYW5nZTtcclxuICAgICAgICBjb25zdCBoYW5kbGVDb2xvckNoYW5nZSA9IHRoaXMucHJvcHMub25Db2xvcmNoYW5nZTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8Rm9ybT5cclxuICAgICAgICAgICAgICAgIDxUaXRsZUlucHV0R3JvdXAgXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0ZvY3VzXHJcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbElkPVwidGMtY3JlYXRlcGFnZS1ldmVudHRpdGxlXCJcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIuagh+mimFwiXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMuZXZlbnRUaXRsZX0gXHJcbiAgICAgICAgICAgICAgICAgICAgb25UaXRsZUNoYW5nZT17aGFuZGxlVGl0bGVDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPFJvdz5cclxuICAgICAgICAgICAgICAgICAgICA8Q29sIHNtPXs2fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPERhdGVUaW1lUGlja2VyR3JvdXAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sSWQ9XCJ0Yy1jcmVhdGVwYWdlLWV2ZW50c3RhcnRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCLlvIDlp4vml6XmnJ9cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMuc3RhcnR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRhdGVUaW1lQ2hhbmdlPXtoYW5kbGVTdGFydENoYW5nZX0gIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9Db2w+XHJcbiAgICAgICAgICAgICAgICAgICAgPENvbCBzbT17Nn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxEYXRlVGltZVBpY2tlckdyb3VwIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbElkPVwidGMtY3JlYXRlcGFnZS1ldmVudGVuZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIue7k+adn+aXpeacn1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5lbmR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRhdGVUaW1lQ2hhbmdlPXtoYW5kbGVFbmRDaGFuZ2V9ICAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvQ29sPlxyXG4gICAgICAgICAgICAgICAgPC9Sb3c+XHJcbiAgICAgICAgICAgICAgICA8Um93PlxyXG4gICAgICAgICAgICAgICAgICAgIDxDb2wgc209ezZ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q29sb3JQaWNrZXJHcm91cCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xJZD1cInRjLWNyZWF0ZXBhZ2UtZXZlbnRjb2xvclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIuiJsuW9qVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5iYWNrZ3JvdW5kQ29sb3J9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNvbG9yQ2hhbmdlPXtoYW5kbGVDb2xvckNoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L0NvbD5cclxuICAgICAgICAgICAgICAgICAgICA8Q29sIHNtPXs2fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Hcm91cCBjb250cm9sSWQ9XCJ0Yy1jcmVhdGVwYWdlLWV2ZW50dGFnc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENvbnRyb2xMYWJlbD7moIfnrb48L0NvbnRyb2xMYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbCByZWFkT25seS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvRm9ybUdyb3VwPiAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgPC9Db2w+XHJcbiAgICAgICAgICAgICAgICA8L1Jvdz5cclxuICAgICAgICAgICAgICAgIDxGb3JtR3JvdXAgY29udHJvbElkPVwidGMtY3JlYXRlcGFnZS1ldmVudHJlbWFya1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxDb250cm9sTGFiZWw+5aSH5rOoPC9Db250cm9sTGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sIHJlYWRPbmx5IGNvbXBvbmVudENsYXNzPVwidGV4dGFyZWFcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9Gb3JtR3JvdXA+XHJcbiAgICAgICAgICAgIDwvRm9ybT5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG59XHJcbiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgUm93LCBDb2wsIEZvcm0sIEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wsIENvbnRyb2xMYWJlbCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcbmltcG9ydCBSZXBlYXRSdWxlU2VsZWN0R3JvdXAgZnJvbSAnLi9SZXBlYXRSdWxlU2VsZWN0R3JvdXAnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRXZlbnRSZXBlYXRGb3JtKHByb3BzKSB7XHJcbiAgICBcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPEZvcm0gaG9yaXpvbnRhbD5cclxuICAgICAgICAgICAgPFJlcGVhdFJ1bGVTZWxlY3RHcm91cCBob3Jpem9udGFsXHJcbiAgICAgICAgICAgICAgICBsYWJlbD1cIumHjeWkjeinhOWImVwiXHJcbiAgICAgICAgICAgICAgICBycHRSdWxlPVwiV2Vla2x5XCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICA8L0Zvcm0+XHJcbiAgICApXHJcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBSb3csIENvbCwgRm9ybSwgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgQ29udHJvbExhYmVsIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcclxuaW1wb3J0IHtTZWxlY3RQaWNrZXJ9IGZyb20gJy4vU2VsZWN0UGlja2VyR3JvdXAnO1xyXG5pbXBvcnQgQXV0b0Zvcm1Hcm91cCBmcm9tICAnLi9BdXRvRm9ybUdyb3VwJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50UmVwZWF0Rm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBycHRSdWxlOiB0aGlzLnByb3BzLnJwdFJ1bGUsXHJcbiAgICAgICAgICAgIGRpc2FibGVXZWVrU2VsZWN0OiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaGFuZGxlUnB0QmFzZVJ1bGVDaGFuZ2UgPSB0aGlzLmhhbmRsZVJwdEJhc2VSdWxlQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVXZWVrRGF5Q2hhbmdlID0gdGhpcy5oYW5kbGVXZWVrRGF5Q2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlUnB0QmFzZVJ1bGVDaGFuZ2UobmV3U2VsZWN0aW9uKSB7XHJcbiAgICAgICAgc3dpdGNoKG5ld1NlbGVjdGlvbikge1xyXG4gICAgICAgICAgICBjYXNlICdFdmVyeVdlZWsnOlxyXG4gICAgICAgICAgICBjYXNlICdFdmVyeTJXZWVrJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVXZWVrU2VsZWN0OiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZVdlZWtTZWxlY3Q6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVXZWVrRGF5Q2hhbmdlKG5ld1NlbGVjdGlvbikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG5ld1NlbGVjdGlvbilcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgeyBob3Jpem9udGFsLCBjb250cm9sSWQsIGxhYmVsIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxBdXRvRm9ybUdyb3VwIHsuLi57IGhvcml6b250YWwsIGNvbnRyb2xJZCwgbGFiZWwgfX0+XHJcbiAgICAgICAgICAgICAgICA8Um93PlxyXG4gICAgICAgICAgICAgICAgICAgIDxDb2wgc209ezR9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8U2VsZWN0UGlja2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIuivt+mAieaLqemHjeWkjeinhOWImVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT1cIldlZWtseVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aD1cImF1dG9cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Rpb25DaGFuZ2U9e3RoaXMuaGFuZGxlUnB0QmFzZVJ1bGVDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJub25lXCI+5LiN6YeN5aSNPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0Z3JvdXAgbGFiZWw9XCLnroDljZXop4TliJlcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiRGFpbHlcIj7mr4/ml6U8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiV2Vla2x5XCI+5q+P5ZGoPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIk1vbnRobHlcIj7mr4/mnIg8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiWWVhcmx5XCI+5q+P5bm0PC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L29wdGdyb3VwPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGdyb3VwIGxhYmVsPVwi5aSN5ZCI6KeE5YiZXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkV2ZXJ5V2Vla1wiPuavj+S4gOS4quaYn+acn+WHoDwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJFdmVyeTJXZWVrXCI+5q+P5Lik5Liq5pif5pyf5YegPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkV2ZXJ5V2Vla2RheVwiPuavj+S4quW3peS9nOaXpTwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9vcHRncm91cD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9TZWxlY3RQaWNrZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9Db2w+XHJcbiAgICAgICAgICAgICAgICAgICAgPENvbCBzbT17OH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxTZWxlY3RQaWNrZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpcGxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aD1cIjgwJVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5zdGF0ZS5kaXNhYmxlV2Vla1NlbGVjdH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwi6YCJ5oup6YeN5aSN55qE5pif5pyfXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0aW9uQ2hhbmdlPXt0aGlzLmhhbmRsZVdlZWtEYXlDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIxXCI+5pif5pyf5LiAPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiMlwiPuaYn+acn+S6jDwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjNcIj7mmJ/mnJ/kuIk8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCI0XCI+5pif5pyf5ZubPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiNVwiPuaYn+acn+S6lDwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjZcIj7mmJ/mnJ/lha08L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCI3XCI+5pif5pyf5pelPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvU2VsZWN0UGlja2VyPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvQ29sPlxyXG4gICAgICAgICAgICAgICAgPC9Sb3c+XHJcbiAgICAgICAgICAgIDwvQXV0b0Zvcm1Hcm91cD4gICAgICBcclxuICAgICAgICApXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBSb3csIENvbCwgRm9ybSwgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgQ29udHJvbExhYmVsIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcclxuaW1wb3J0IEF1dG9Gb3JtR3JvdXAgZnJvbSAnLi9BdXRvRm9ybUdyb3VwJztcclxuaW1wb3J0ICdib290c3RyYXAvanMvZHJvcGRvd24nO1xyXG5pbXBvcnQgJ2Jvb3RzdHJhcC1zZWxlY3QnO1xyXG5pbXBvcnQgJ2Jvb3RzdHJhcC1zZWxlY3QvZGlzdC9jc3MvYm9vdHN0cmFwLXNlbGVjdC5jc3MnXHJcblxyXG5leHBvcnQgY2xhc3MgU2VsZWN0UGlja2VyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLnZhbHVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlID0gdGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDaGFuZ2UoZSwgY2xpY2tlZEluZGV4LCBuZXdWYWx1ZSwgb2xkVmFsdWUpIHsgXHJcbiAgICAgICAgY29uc3QgbmV3U2VsZWN0aW9uID0gdGhpcy4kZWwuZmluZCgnb3B0aW9uJykuZXEoY2xpY2tlZEluZGV4KS52YWwoKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogbmV3U2VsZWN0aW9ufSk7XHJcbiAgICAgICAgLy8g5Lyg6YCSXHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdGlvbkNoYW5nZShuZXdTZWxlY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIGNvbnN0IHsgdGl0bGUgPSAnJywgd2lkdGggPSBmYWxzZSwgbXVsdGlwbGUsIGRpc2FibGVkIH0gPSB0aGlzLnByb3BzXHJcbiAgICAgICAgLy8g5Yid5aeL5YyW57uE5Lu2XHJcbiAgICAgICAgdGhpcy4kZWwgPSAkKHRoaXMuZWwpO1xyXG4gICAgICAgIHRoaXMuJGVsLnZhbCh0aGlzLnByb3BzLnZhbHVlKTtcclxuICAgICAgICB0aGlzLiRlbC5wcm9wKCd0aXRsZScsIHRpdGxlKTtcclxuICAgICAgICB0aGlzLiRlbC5wcm9wKCdtdWx0aXBsZScsIG11bHRpcGxlKTtcclxuICAgICAgICB0aGlzLiRlbC5wcm9wKCdkaXNhYmxlZCcsIGRpc2FibGVkKTtcclxuICAgICAgICB0aGlzLiRlbC5zZWxlY3RwaWNrZXIoe1xyXG4gICAgICAgICAgICBzdHlsZTogJ2J0bi1kZWZhdWx0JyxcclxuICAgICAgICAgICAgd2lkdGhcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuaW5zdGFuY2UgPSB0aGlzLiRlbC5kYXRhKCdzZWxlY3RwaWNrZXInKTtcclxuICAgICAgICAvLyDnu5HlrppjaGFuZ2Xkuovku7ZcclxuICAgICAgICB0aGlzLiRlbC5vbihcImNoYW5nZWQuYnMuc2VsZWN0XCIsIHRoaXMuaGFuZGxlQ2hhbmdlKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUsIHNuYXBzaG90KSB7XHJcbiAgICAgICAgY29uc3Qge2Rpc2FibGVkfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgdGhpcy4kZWwucHJvcCgnZGlzYWJsZWQnLCBkaXNhYmxlZCk7XHJcbiAgICAgICAgaWYgKGRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGVsLnZhbCgnJylcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy4kZWwuc2VsZWN0cGlja2VyKCdyZWZyZXNoJyk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIC8vIGRlc3Ryb3lcclxuICAgICAgICB0aGlzLmluc3RhbmNlLmRlc3Ryb3koKTtcclxuICAgICAgICB0aGlzLiRlbC5vZmYoXCJjaGFuZ2VkLmJzLnNlbGVjdFwiLCB0aGlzLmhhbmRsZUNoYW5nZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICA8c2VsZWN0IHJlZj17ZWwgPT4gdGhpcy5lbCA9IGVsfT5cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgKVxyXG4gICAgfSAgIFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTZWxlY3RQaWNrZXJHcm91cChwcm9wcykge1xyXG4gICAgY29uc3QgeyBob3Jpem9udGFsLCBjb250cm9sSWQsIGxhYmVsIH0gPSBwcm9wcztcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPEF1dG9Gb3JtR3JvdXAgey4uLnsgaG9yaXpvbnRhbCwgY29udHJvbElkLCBsYWJlbCB9fT5cclxuICAgICAgICAgICAgPFNlbGVjdFBpY2tlciB7Li4ucHJvcHN9ID5cclxuICAgICAgICAgICAgICAgIHtwcm9wcy5jaGlsZHJlbn1cclxuICAgICAgICAgICAgPC9TZWxlY3RQaWNrZXI+XHJcbiAgICAgICAgPC9BdXRvRm9ybUdyb3VwPiAgICAgIFxyXG4gICAgKVxyXG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5pbXBvcnQgQXV0b0Zvcm1Hcm91cCBmcm9tICcuL0F1dG9Gb3JtR3JvdXAnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGl0bGVJbnB1dEdyb3VwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLnZhbHVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2UgPSB0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNoYW5nZShlKSB7XHJcbiAgICAgICAgY29uc3QgbmV3VGl0bGUgPSBlLnRhcmdldC52YWx1ZTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgdmFsdWU6IG5ld1RpdGxlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblRpdGxlQ2hhbmdlKG5ld1RpdGxlKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgeyBob3Jpem9udGFsLCBjb250cm9sSWQsIGxhYmVsfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEF1dG9Gb3JtR3JvdXAgey4uLnsgaG9yaXpvbnRhbCwgY29udHJvbElkLCBsYWJlbCB9fT5cclxuICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Gb2N1cz17dGhpcy5wcm9wcy5hdXRvRm9jdXN9XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfVxyXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwi6K+36L6T5YWl5qCH6aKYXCJcclxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L0F1dG9Gb3JtR3JvdXA+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IE5hdkl0ZW0sIFRhYiwgQnV0dG9uIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcclxuaW1wb3J0IEV2ZW50RGV0YWlsRnJvbSBmcm9tICcuLi9Gb3JtL0V2ZW50RGV0YWlsRm9ybSc7XHJcbmltcG9ydCBFdmVudFJlcGVhdEZvcm0gZnJvbSAnLi4vRm9ybS9FdmVudFJlcGVhdEZvcm0nO1xyXG5pbXBvcnQgRXZlbnRNb2RhbCBmcm9tICcuL0V2ZW50TW9kYWwnO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudENyZWF0ZU1vZGFsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnJyxcclxuICAgICAgICAgICAgc3RhcnQ6IHRoaXMucHJvcHMuc2VsZWN0ZWRSYW5nZS5zdGFydC5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKSxcclxuICAgICAgICAgICAgZW5kOiB0aGlzLnByb3BzLnNlbGVjdGVkUmFuZ2UuZW5kLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5oYW5kbGVUaXRsZUNoYW5nZSA9IHRoaXMuaGFuZGxlVGl0bGVDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZVN0YXJ0Q2hhbmdlID0gdGhpcy5oYW5kbGVTdGFydENoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlRW5kQ2hhbmdlID0gdGhpcy5oYW5kbGVFbmRDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUNvbG9yQ2hhbmdlID0gdGhpcy5oYW5kbGVDb2xvckNoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlRXZlbnRDcmVhdGUgPSB0aGlzLmhhbmRsZUV2ZW50Q3JlYXRlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLmhhbmRsZVJwdEJhc2VSdWxlQ2hhbmdlID0gdGhpcy5oYW5kbGVScHRCYXNlUnVsZUNoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVRpdGxlQ2hhbmdlKG5ld1RpdGxlKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIHRpdGxlOiBuZXdUaXRsZVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlU3RhcnRDaGFuZ2UobmV3RGF0ZVZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIHN0YXJ0OiBuZXdEYXRlVmFsdWVcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUVuZENoYW5nZShuZXdEYXRlVmFsdWUpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgZW5kOiBuZXdEYXRlVmFsdWVcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNvbG9yQ2hhbmdlKG5ld0NvbG9yVmFsdWUpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBuZXdDb2xvclZhbHVlXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVScHRCYXNlUnVsZUNoYW5nZShuZXdScHRCYXNlUnVsZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG5ld1JwdEJhc2VSdWxlKVxyXG4gICAgfSAgICBcclxuXHJcbiAgICBoYW5kbGVFdmVudENyZWF0ZSgpIHtcclxuICAgICAgICAvLyDmiZPljIXmlbDmja5cclxuICAgICAgICBjb25zdCBldmVudERhdGEgPSAkLmV4dGVuZCh7fSwgdGhpcy5zdGF0ZSk7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vbkV2ZW50Q3JlYXRlKGV2ZW50RGF0YSk7XHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLnByb3BzLm9uTW9kYWxDbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7IHNob3csIG9uTW9kYWxDbG9zZSB9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICByZXR1cm4gKCBcclxuICAgICAgICAgICAgPEV2ZW50TW9kYWwgey4uLntzaG93LCBvbk1vZGFsQ2xvc2V9fT5cclxuICAgICAgICAgICAgICAgIDxFdmVudE1vZGFsLk5hdkhlYWRlciB7Li4ue29uTW9kYWxDbG9zZX19PlxyXG4gICAgICAgICAgICAgICAgICAgIDxOYXZJdGVtIGV2ZW50S2V5PVwiMVwiID5cclxuICAgICAgICAgICAgICAgICAgICAgICAg5pel56iL57yW6L6RXHJcbiAgICAgICAgICAgICAgICAgICAgPC9OYXZJdGVtPlxyXG4gICAgICAgICAgICAgICAgICAgIDxOYXZJdGVtIGV2ZW50S2V5PVwiMlwiID5cclxuICAgICAgICAgICAgICAgICAgICAgICAg6YeN5aSN6KeE5YiZXHJcbiAgICAgICAgICAgICAgICAgICAgPC9OYXZJdGVtPlxyXG4gICAgICAgICAgICAgICAgPC9FdmVudE1vZGFsLk5hdkhlYWRlcj5cclxuICAgICAgICAgICAgICAgIDxFdmVudE1vZGFsLlRhYkJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgPFRhYi5QYW5lIGV2ZW50S2V5PVwiMVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8RXZlbnREZXRhaWxGcm9tIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRUaXRsZT17dGhpcy5zdGF0ZS50aXRsZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0PXt0aGlzLnN0YXRlLnN0YXJ0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kPXt0aGlzLnN0YXRlLmVuZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcj17dGhpcy5zdGF0ZS5iYWNrZ3JvdW5kQ29sb3J9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+S6i+S7tuWPpeafhFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25UaXRsZUNoYW5nZT17dGhpcy5oYW5kbGVUaXRsZUNoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU3RhcnRDaGFuZ2U9e3RoaXMuaGFuZGxlU3RhcnRDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkVuZENoYW5nZT17dGhpcy5oYW5kbGVFbmRDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNvbG9yY2hhbmdlPXt0aGlzLmhhbmRsZUNvbG9yQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvVGFiLlBhbmU+XHJcbiAgICAgICAgICAgICAgICAgICAgPFRhYi5QYW5lIGV2ZW50S2V5PVwiMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8RXZlbnRSZXBlYXRGb3JtIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnB0QmFzZVJ1bGU9J1dlZWtseSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uUnB0QmFzZVJ1bGVDaGFuZ2U9e3RoaXMuaGFuZGxlUnB0QmFzZVJ1bGVDaGFuZ2V9ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvVGFiLlBhbmU+XHJcbiAgICAgICAgICAgICAgICA8L0V2ZW50TW9kYWwuVGFiQm9keT5cclxuICAgICAgICAgICAgICAgIDxFdmVudE1vZGFsLlRvb2xiYXJGb290ZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnNTdHlsZT1cInN1Y2Nlc3NcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUV2ZW50Q3JlYXRlfVxyXG4gICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAg5Yib5bu6XHJcbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXt0aGlzLnByb3BzLm9uTW9kYWxDbG9zZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIOWPlua2iFxyXG4gICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9FdmVudE1vZGFsLlRvb2xiYXJGb290ZXI+XHJcbiAgICAgICAgICAgIDwvRXZlbnRNb2RhbD5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBOYXZJdGVtLCBUYWIsIEJ1dHRvbiwgQnV0dG9uR3JvdXAsIERyb3Bkb3duLCBNZW51SXRlbSwgUm93LCBDb2wgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5pbXBvcnQgRXZlbnREZXRhaWxGcm9tIGZyb20gJy4uL0Zvcm0vRXZlbnREZXRhaWxGb3JtJztcclxuaW1wb3J0IEV2ZW50UmVwZWF0Rm9ybSBmcm9tICcuLi9Gb3JtL0V2ZW50UmVwZWF0Rm9ybSc7XHJcbmltcG9ydCBFdmVudE1vZGFsIGZyb20gJy4vRXZlbnRNb2RhbCc7XHJcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuXHJcbmNsYXNzIE1vZGFsVG9vbGJhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxSb3c+XHJcbiAgICAgICAgICAgICAgICA8Q29sIHNtPXs3fSBzdHlsZT17e3RleHRBbGlnbjogJ2xlZnQnfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbkdyb3VwPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGlkPSd0Yy1lZGl0cGFnZS1TYXZlJyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJzU3R5bGU9XCJkYW5nZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5vbkJ0bkNsaWNrfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyF0aGlzLnByb3BzLmVuYWJsZVNhdmVCdG59PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAg5L+d5a2YXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGlkPSd0Yy1lZGl0cGFnZS1Db21wbGV0ZSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25CdG5DbGlja30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cGFyc2VJbnQodGhpcy5wcm9wcy5jb21wbGV0ZSkgPT0gNSA/ICfmgaLlpI0nIDogJ+WujOaIkCd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9J3RjLWVkaXRwYWdlLURlbGV0ZURhdGEnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQnRuQ2xpY2t9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAg5Yig6ZmkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9J3RjLWVkaXRwYWdlLURlbGV0ZURvYydcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25CdG5DbGlja30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICDliKDpmaTmupDmlofmoaNcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxEcm9wZG93biBpZD0ndGMtZWRpdHBhZ2UtZXh0cmEnIHB1bGxSaWdodD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEcm9wZG93bi5Ub2dnbGUgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEcm9wZG93bi5NZW51PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxNZW51SXRlbSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRLZXk9XCIxXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPSd0Yy1lZGl0cGFnZS1PcGVuRG9jJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQnRuQ2xpY2t9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDmiZPlvIDmupDmlofmoaNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L01lbnVJdGVtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxNZW51SXRlbSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRLZXk9XCIyXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPSd0Yy1lZGl0cGFnZS1FZGl0T3JpZ2luRGF0YSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5vbkJ0bkNsaWNrfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg57yW6L6R5rqQ5pWw5o2uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9NZW51SXRlbT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRHJvcGRvd24uTWVudT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9Ecm9wZG93bj5cclxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbkdyb3VwPlxyXG4gICAgICAgICAgICAgICAgPC9Db2w+XHJcbiAgICAgICAgICAgICAgICA8Q29sIHNtPXsyfSBzbU9mZnNldD17M30+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXt0aGlzLnByb3BzLm9uTW9kYWxDbG9zZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIOWPlua2iFxyXG4gICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9Db2w+XHJcbiAgICAgICAgICAgIDwvUm93PlxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50RWRpdE1vZGFsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgbmV3RXZlbnREYXRhOiB7fVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuaGFuZGxlVGl0bGVDaGFuZ2UgPSB0aGlzLmhhbmRsZVRpdGxlQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVTdGFydENoYW5nZSA9IHRoaXMuaGFuZGxlU3RhcnRDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUVuZENoYW5nZSA9IHRoaXMuaGFuZGxlRW5kQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVDb2xvckNoYW5nZSA9IHRoaXMuaGFuZGxlQ29sb3JDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUJ0bkNsaWNrID0gdGhpcy5oYW5kbGVCdG5DbGljay5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVRpdGxlQ2hhbmdlKG5ld1RpdGxlKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShmdW5jdGlvbihwcmV2U3RhdGUsIHByb3BzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld0V2ZW50RGF0YSA9ICQuZXh0ZW5kKHt9LCBwcmV2U3RhdGUubmV3RXZlbnREYXRhKVxyXG4gICAgICAgICAgICBuZXdFdmVudERhdGEudGl0bGUgPSBuZXdUaXRsZTtcclxuICAgICAgICAgICAgcmV0dXJuIHsgbmV3RXZlbnREYXRhIH07XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVTdGFydENoYW5nZShuZXdEYXRlVmFsdWUpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKGZ1bmN0aW9uKHByZXZTdGF0ZSwgcHJvcHMpIHtcclxuICAgICAgICAgICAgY29uc3QgbmV3RXZlbnREYXRhID0gJC5leHRlbmQoe30sIHByZXZTdGF0ZS5uZXdFdmVudERhdGEpXHJcbiAgICAgICAgICAgIG5ld0V2ZW50RGF0YS5zdGFydCA9IG5ld0RhdGVWYWx1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIHsgbmV3RXZlbnREYXRhIH07XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVFbmRDaGFuZ2UobmV3RGF0ZVZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShmdW5jdGlvbihwcmV2U3RhdGUsIHByb3BzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld0V2ZW50RGF0YSA9ICQuZXh0ZW5kKHt9LCBwcmV2U3RhdGUubmV3RXZlbnREYXRhKVxyXG4gICAgICAgICAgICBuZXdFdmVudERhdGEuZW5kID0gbmV3RGF0ZVZhbHVlO1xyXG4gICAgICAgICAgICByZXR1cm4geyBuZXdFdmVudERhdGEgfTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNvbG9yQ2hhbmdlKG5ld0NvbG9yVmFsdWUpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKGZ1bmN0aW9uKHByZXZTdGF0ZSwgcHJvcHMpIHtcclxuICAgICAgICAgICAgY29uc3QgbmV3RXZlbnREYXRhID0gJC5leHRlbmQoe30sIHByZXZTdGF0ZS5uZXdFdmVudERhdGEpXHJcbiAgICAgICAgICAgIG5ld0V2ZW50RGF0YS5iYWNrZ3JvdW5kQ29sb3IgPSBuZXdDb2xvclZhbHVlO1xyXG4gICAgICAgICAgICByZXR1cm4geyBuZXdFdmVudERhdGEgfTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUJ0bkNsaWNrKGUpIHtcclxuICAgICAgICBjb25zdCBpZCA9IGUudGFyZ2V0LmlkO1xyXG4gICAgICAgIGNvbnN0IGJ0blR5cGUgPSBpZC5zcGxpdCgnLScpWzJdO1xyXG4gICAgICAgIGNvbnN0IGhhbmRsZU5hbWUgPSBgb25FdmVudCR7YnRuVHlwZX1gO1xyXG4gICAgICAgIHRoaXMucHJvcHNbaGFuZGxlTmFtZV0odGhpcy5wcm9wcy5lZGl0aW5nRXZlbnQsIHRoaXMuc3RhdGUubmV3RXZlbnREYXRhKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMucHJvcHMub25Nb2RhbENsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHsgc2hvdywgb25Nb2RhbENsb3NlIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IGV2ZW50ID0gdGhpcy5wcm9wcy5lZGl0aW5nRXZlbnQ7XHJcbiAgICAgICAgY29uc3QgZW5hYmxlU2F2ZUJ0biA9ICEkLmlzRW1wdHlPYmplY3QodGhpcy5zdGF0ZS5uZXdFdmVudERhdGEpO1xyXG4gICAgICAgIHJldHVybiAoIFxyXG4gICAgICAgICAgICA8RXZlbnRNb2RhbCB7Li4ue3Nob3csIG9uTW9kYWxDbG9zZX19PlxyXG4gICAgICAgICAgICAgICAgPEV2ZW50TW9kYWwuTmF2SGVhZGVyIHsuLi57b25Nb2RhbENsb3NlfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPE5hdkl0ZW0gZXZlbnRLZXk9XCIxXCIgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICDml6XnqIvnvJbovpFcclxuICAgICAgICAgICAgICAgICAgICA8L05hdkl0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgPE5hdkl0ZW0gZXZlbnRLZXk9XCIyXCIgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICDph43lpI3op4TliJlcclxuICAgICAgICAgICAgICAgICAgICA8L05hdkl0ZW0+XHJcbiAgICAgICAgICAgICAgICA8L0V2ZW50TW9kYWwuTmF2SGVhZGVyPlxyXG4gICAgICAgICAgICAgICAgPEV2ZW50TW9kYWwuVGFiQm9keT5cclxuICAgICAgICAgICAgICAgICAgICA8VGFiLlBhbmUgZXZlbnRLZXk9XCIxXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxFdmVudERldGFpbEZyb20gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+S8oOWFpeaXpeeoi+WxnuaAp1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXsnZWRpdCcgKyBldmVudC5pZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50VGl0bGU9e2V2ZW50LnRpdGxlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ9e2V2ZW50LnN0YXJ0LmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kPXtldmVudC5lbmQuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I9e2V2ZW50LmJhY2tncm91bmRDb2xvcn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlPXtldmVudC5jb21wbGV0ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5LqL5Lu25Y+l5p+EXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblRpdGxlQ2hhbmdlPXt0aGlzLmhhbmRsZVRpdGxlQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TdGFydENoYW5nZT17dGhpcy5oYW5kbGVTdGFydENoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRW5kQ2hhbmdlPXt0aGlzLmhhbmRsZUVuZENoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29sb3JjaGFuZ2U9e3RoaXMuaGFuZGxlQ29sb3JDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9UYWIuUGFuZT5cclxuICAgICAgICAgICAgICAgICAgICA8VGFiLlBhbmUgZXZlbnRLZXk9XCIyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxFdmVudFJlcGVhdEZvcm0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8L1RhYi5QYW5lPlxyXG4gICAgICAgICAgICAgICAgPC9FdmVudE1vZGFsLlRhYkJvZHk+XHJcbiAgICAgICAgICAgICAgICA8RXZlbnRNb2RhbC5Ub29sYmFyRm9vdGVyPlxyXG4gICAgICAgICAgICAgICAgICAgIDxNb2RhbFRvb2xiYXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlU2F2ZUJ0bj17ZW5hYmxlU2F2ZUJ0bn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGU9e3RoaXMuc3RhdGUuY29tcGxldGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQnRuQ2xpY2s9e3RoaXMuaGFuZGxlQnRuQ2xpY2t9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uTW9kYWxDbG9zZT17b25Nb2RhbENsb3NlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPC9FdmVudE1vZGFsLlRvb2xiYXJGb290ZXI+XHJcbiAgICAgICAgICAgIDwvRXZlbnRNb2RhbD5cclxuICAgICAgICApXHJcbiAgICB9ICAgIFxyXG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgTW9kYWwsIE5hdiwgVGFiLCBSb3csIENvbCwgQ2xvc2VCdXR0b24gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5cclxuY2xhc3MgTmF2SGVhZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIC8vdGhpcy5wcm9wcy5jaGlsZHJlbiDmjqXlj5cgPE5hdkl0ZW0gLz5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8TW9kYWwuSGVhZGVyXHJcbiAgICAgICAgICAgICAgICBzdHlsZT17e2JvcmRlckJvdHRvbTogJ25vbmUnLCBwYWRkaW5nOiAnMCd9fT5cclxuICAgICAgICAgICAgICAgIDxOYXYgYnNTdHlsZT1cInRhYnNcIlxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7cGFkZGluZzogJzE1cHggMTVweCAwIDE1cHgnfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPENsb3NlQnV0dG9uIG9uQ2xpY2s9e3RoaXMucHJvcHMub25Nb2RhbENsb3NlfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG4gICAgICAgICAgICAgICAgPC9OYXY+XHJcbiAgICAgICAgICAgIDwvTW9kYWwuSGVhZGVyPlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgVGFiQm9keSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICAvL3RoaXMucHJvcHMuY2hpbGRyZW4g5o6l5Y+XIDxUYWIuUGFuZSAvPlxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxNb2RhbC5Cb2R5PlxyXG4gICAgICAgICAgICAgICAgPFRhYi5Db250ZW50IGFuaW1hdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuICAgICAgICAgICAgICAgIDwvVGFiLkNvbnRlbnQ+XHJcbiAgICAgICAgICAgIDwvTW9kYWwuQm9keT4gICAgICAgICAgICBcclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFRvb2xiYXJGb290ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxNb2RhbC5Gb290ZXI+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuICAgICAgICAgICAgPC9Nb2RhbC5Gb290ZXI+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBFdmVudE1vZGFsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgTmF2SGVhZGVyLCBUYWJCb2R5LCBUb29sYmFyRm9vdGVyO1xyXG4gICAgICAgIFJlYWN0LkNoaWxkcmVuLmZvckVhY2godGhpcy5wcm9wcy5jaGlsZHJlbiwgKHRoaXNBcmcpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IHRoaXNBcmcudHlwZS5uYW1lO1xyXG4gICAgICAgICAgICBpZiAoIG5hbWUgPT0gJ05hdkhlYWRlcicgKSB7XHJcbiAgICAgICAgICAgICAgICBOYXZIZWFkZXIgPSB0aGlzQXJnO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBuYW1lID09ICdUYWJCb2R5JyApIHtcclxuICAgICAgICAgICAgICAgIFRhYkJvZHkgPSB0aGlzQXJnO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBuYW1lID09ICdUb29sYmFyRm9vdGVyJyApIHtcclxuICAgICAgICAgICAgICAgIFRvb2xiYXJGb290ZXIgPSB0aGlzQXJnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPE1vZGFsIHNob3c9e3RoaXMucHJvcHMuc2hvd30gb25IaWRlPXt0aGlzLnByb3BzLm9uTW9kYWxDbG9zZX0+IFxyXG4gICAgICAgICAgICAgICAgPFRhYi5Db250YWluZXIgaWQ9XCJ0YWJzLXdpdGgtZHJvcGRvd25cIiBkZWZhdWx0QWN0aXZlS2V5PVwiMVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxSb3cgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbCBzbT17MTJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBOYXZIZWFkZXIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBUYWJCb2R5IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9Db2w+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9Sb3c+XHJcbiAgICAgICAgICAgICAgICA8L1RhYi5Db250YWluZXI+XHJcbiAgICAgICAgICAgICAgICB7IFRvb2xiYXJGb290ZXIgfVxyXG4gICAgICAgICAgICA8L01vZGFsPlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuRXZlbnRNb2RhbC5OYXZIZWFkZXIgPSBOYXZIZWFkZXI7XHJcbkV2ZW50TW9kYWwuVGFiQm9keSA9IFRhYkJvZHk7XHJcbkV2ZW50TW9kYWwuVG9vbGJhckZvb3RlciA9IFRvb2xiYXJGb290ZXI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFdmVudE1vZGFsOyIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL2luZGV4LmNzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9pbmRleC5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL2luZGV4LmNzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgJ2Z1bGxjYWxlbmRhci1yZWFjdHdyYXBwZXIvZGlzdC9jc3MvZnVsbGNhbGVuZGFyLm1pbi5jc3MnXHJcbmltcG9ydCAnYm9vdHN0cmFwL2Rpc3QvY3NzL2Jvb3RzdHJhcC5jc3MnO1xyXG5pbXBvcnQgJ2Jvb3RzdHJhcC9kaXN0L2Nzcy9ib290c3RyYXAtdGhlbWUuY3NzJztcclxuaW1wb3J0ICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtZnJlZS9jc3MvYWxsLmNzcyc7XHJcbmltcG9ydCBBcHAgZnJvbSAnLi9BcHAnO1xyXG5pbXBvcnQgJy4vaW5kZXguY3NzJztcclxuXHJcblJlYWN0RE9NLnJlbmRlcig8QXBwIC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpKTtcclxuXHJcbi8qXHJcbiQoZnVuY3Rpb24oKXtcclxuICAgIC8vIOWumuS5ieWPmOmHj1xyXG5cdGNvbnN0IGRhdGFMb2FkZXIgPSBuZXcgV2l6RXZlbnREYXRhTG9hZGVyKCk7XHJcblx0bGV0IGdfZWRpdFBvcHBlciwgZ19jcmVhdGVNb2RhbCwgZ19lZGl0TW9kYWw7XHJcblxyXG4gICAgY29uc3QgY2FsZW5kYXIgPSAkKCcjY2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoe1xyXG5cdFx0dGhlbWVTeXN0ZW06ICdzdGFuZGFyZCcsXHJcblx0XHRoZWlnaHQ6ICdwYXJlbnQnLFxyXG5cdFx0aGVhZGVyOiB7XHJcblx0XHRcdGxlZnQ6ICdwcmV2LG5leHQsdG9kYXknLFxyXG5cdFx0XHRjZW50ZXI6ICd0aXRsZScsXHJcblx0XHRcdHJpZ2h0OiAnbW9udGgsYWdlbmRhV2VlayxhZ2VuZGFEYXksbGlzdFdlZWsnXHJcblx0XHR9LFxyXG5cdFx0dmlld3M6IHtcclxuXHRcdFx0bW9udGg6IHtcclxuXHRcdFx0XHQvL3RpdGxlRm9ybWF0OiBnX2xvY190aXRsZWZvcm1hdF9tb250aCwgLy92YXIgZ19sb2NfdGl0bGVmb3JtYXRfbW9udGggPSBcIk1NTU0geXl5eVwiO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRhZ2VuZGE6IHtcclxuXHRcdFx0XHRtaW5UaW1lOiBcIjA4OjAwOjAwXCIsXHJcblx0XHRcdFx0c2xvdExhYmVsRm9ybWF0OiAnaCg6bW0pIGEnXHJcblx0XHRcdH0sXHJcblx0XHRcdGxpc3RXZWVrOiB7XHJcblxyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0bmF2TGlua3M6IHRydWUsXHJcblx0XHRhbGxEYXlEZWZhdWx0OiBmYWxzZSxcclxuXHRcdGRlZmF1bHRWaWV3OiAnYWdlbmRhV2VlaycsXHJcblx0XHRldmVudExpbWl0OiB0cnVlLFxyXG5cdFx0YnV0dG9uVGV4dDoge1xyXG5cdFx0XHR0b2RheTogJ+S7iuWkqScsXHJcblx0XHRcdG1vbnRoOiAn5pyIJyxcclxuXHRcdFx0d2VlazogJ+WRqCcsXHJcblx0XHRcdGRheTogJ+aXpScsXHJcblx0XHRcdGxpc3Q6ICfooagnXHJcbiAgICAgICAgfSxcclxuXHRcdG1vbnRoTmFtZXM6IFtcclxuICAgICAgICAgICAgJzHmnIgnLCAnMuaciCcsICcz5pyIJywgJzTmnIgnLCBcclxuICAgICAgICAgICAgJzXmnIgnLCAnNuaciCcsICc35pyIJywgJzjmnIgnLCBcclxuICAgICAgICAgICAgJznmnIgnLCAnMTDmnIgnLCAnMTHmnIgnLCAnMTLmnIgnXHJcbiAgICAgICAgXSxcclxuXHRcdG1vbnRoTmFtZXNTaG9ydDogW1xyXG4gICAgICAgICAgICAnMeaciCcsICcy5pyIJywgJzPmnIgnLCAnNOaciCcsIFxyXG4gICAgICAgICAgICAnNeaciCcsICc25pyIJywgJzfmnIgnLCAnOOaciCcsIFxyXG4gICAgICAgICAgICAnOeaciCcsICcxMOaciCcsICcxMeaciCcsICcxMuaciCdcclxuICAgICAgICBdLFxyXG5cdFx0ZGF5TmFtZXM6IFtcclxuICAgICAgICAgICAgJ+WRqOaXpScsICflkajkuIAnLCAn5ZGo5LqMJywgJ+WRqOS4iScsICflkajlm5snLCAn5ZGo5LqUJywgJ+WRqOWFrSdcclxuICAgICAgICBdLFxyXG5cdFx0ZGF5TmFtZXNTaG9ydDogW1xyXG4gICAgICAgICAgICAn5ZGo5pelJywgJ+WRqOS4gCcsICflkajkuownLCAn5ZGo5LiJJywgJ+WRqOWbmycsICflkajkupQnLCAn5ZGo5YWtJ1xyXG4gICAgICAgIF0sXHJcblx0XHRzZWxlY3RhYmxlOiB0cnVlLFxyXG5cdFx0c2VsZWN0SGVscGVyOiB0cnVlLFxyXG5cdFx0dW5zZWxlY3RDYW5jZWw6ICcubW9kYWwgKicsXHJcblx0XHRhbGxEYXlUZXh0OiAn5YWo5aSpJyxcclxuXHRcdG5vd0luZGljYXRvcjogdHJ1ZSxcclxuXHRcdGZvcmNlRXZlbnREdXJhdGlvbjogdHJ1ZSxcclxuXHRcdGZpcnN0RGF5OiAxLCAvLyDnrKzkuIDlpKnmmK/lkajkuIDov5jmmK/lkajlpKnvvIzkuI5kYXRlcGlja2Vy5b+F6aG755u45ZCMXHJcblx0XHRkcmFnT3BhY2l0eToge1xyXG5cdFx0XHRcIm1vbnRoXCI6IC41LFxyXG5cdFx0XHRcImFnZW5kYVdlZWtcIjogMSxcclxuXHRcdFx0XCJhZ2VuZGFEYXlcIjogMVxyXG5cdFx0fSxcclxuXHRcdGVkaXRhYmxlOiB0cnVlLFxyXG5cclxuXHRcdC8vIOWIt+aWsOinhuWbvu+8jOmHjeaWsOiOt+WPluaXpeWOhuS6i+S7tlxyXG5cdFx0dmlld1JlbmRlcjogZnVuY3Rpb24oIHZpZXcsIGVsZW1lbnQgKSB7XHJcblx0XHRcdC8vVE9ETzog5oSf6KeJ6L+Z5qC36YCg5oiQ5oCn6IO95LiK55qE5o2f5aSx77yM5piv5ZCm5pyJ5pu05aW955qE5pa55rOV77yfXHJcblx0XHRcdGNvbnN0IGNhbGVuZGFyID0gJCgnI2NhbGVuZGFyJyk7XHJcblx0XHRcdGNvbnN0IGV2ZW50U291cmNlcyA9IGRhdGFMb2FkZXIuZ2V0RXZlbnRTb3VyY2VzKCB2aWV3LCBlbGVtZW50ICk7XHJcblx0XHRcdGNhbGVuZGFyLmZ1bGxDYWxlbmRhcigncmVtb3ZlRXZlbnRzJyk7XHJcblx0XHRcdGZvciAobGV0IGk9MCA7IGkgPCBldmVudFNvdXJjZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRjYWxlbmRhci5mdWxsQ2FsZW5kYXIoJ2FkZEV2ZW50U291cmNlJywgZXZlbnRTb3VyY2VzW2ldKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8g6YCJ5oup5Yqo5L2c6Kem5Y+R55qE5LqL5Lu25Y+l5p+E77yM5a6a5LmJ5LqG5LiA5LiqY2FsbGJhY2tcclxuXHRcdHNlbGVjdDogZnVuY3Rpb24oc3RhcnQsIGVuZCwganNFdmVudCwgdmlldyl7XHJcblx0XHRcdC8vIOW8ueWHuuKAnOWIm+W7uuaXpeWOhuS6i+S7tuKAneeql+WPo1xyXG5cdFx0XHQvLyDliKTmlq3mmK/lkKbmuLLmn5NcclxuXHRcdFx0Ly9UT0RPOiDmg7Plip7ms5XkuI3opoHnlKjlhajlsYDlj5jph49cclxuXHRcdFx0aWYgKCAhd2luZG93LmdfY3JlYXRlTW9kYWwgKSBuZXcgRXZlbnRDcmVhdGVNb2RhbCh7c3RhcnQsIGVuZCwganNFdmVudCwgdmlld30pO1xyXG5cdFx0XHQvLyDkvKDpgJLlj4LmlbBcclxuXHRcdFx0d2luZG93LmdfY3JlYXRlTW9kYWwudXBkYXRlKHtzdGFydCwgZW5kLCBqc0V2ZW50LCB2aWV3fSk7XHJcblx0XHRcdHdpbmRvdy5nX2NyZWF0ZU1vZGFsLnNob3coKTtcclxuXHRcdH0sXHJcblxyXG5cdFx0ZXZlbnREcmFnU3RhcnQ6IGZ1bmN0aW9uKCBldmVudCwganNFdmVudCwgdWksIHZpZXcgKSB7IH0sXHJcblx0XHRldmVudERyYWdTdG9wOiBmdW5jdGlvbiggZXZlbnQsIGpzRXZlbnQsIHVpLCB2aWV3ICkgeyB9LFxyXG5cclxuXHRcdC8vIOaXpeWOhuS6i+S7tuaLluWKqCBldmVudCwgZGVsdGEsIHJldmVydEZ1bmMsIGpzRXZlbnQsIHVpLCB2aWV3XHJcblx0XHRldmVudERyb3A6IGZ1bmN0aW9uKGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXcpe1xyXG5cdFx0XHRpZiAoZXZlbnQuaWQpe1xyXG5cdFx0XHRcdGRhdGFMb2FkZXIudXBkYXRlRXZlbnREYXRhT25Ecm9wKGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXcpXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV2ZXJ0RnVuYygpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cclxuXHRcdC8vIOaXpeWOhuS6i+S7tuaXpeacn+iMg+WbtOmHjee9rlxyXG5cdFx0ZXZlbnRSZXNpemU6IGZ1bmN0aW9uKGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXcpe1xyXG5cdFx0XHRpZiAoZXZlbnQuaWQpe1xyXG5cdFx0XHRcdGRhdGFMb2FkZXIudXBkYXRlRXZlbnREYXRhT25SZXNpemUoZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV2ZXJ0RnVuYygpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cclxuXHRcdGV2ZW50UmVuZGVyOiBmdW5jdGlvbihldmVudE9iaiwgJGVsKSB7XHJcblx0XHRcdC8vIOWFg+e0oOW3sue7j+a4suafk++8jOWPr+S/ruaUueWFg+e0oFxyXG5cdFx0XHRjb25zdCBpc0NvbXBsZXRlID0gcGFyc2VJbnQoZXZlbnRPYmouY29tcGxldGUpID09IDU7XHJcblx0XHRcdGlmICggaXNDb21wbGV0ZSApIHtcclxuXHRcdFx0XHQvLyDmoLflvI9cclxuXHRcdFx0XHQkZWwuYWRkQ2xhc3MoJ3RjLWNvbXBsZXRlJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHR9LFxyXG5cclxuXHRcdC8vIOaXpeWOhuS6i+S7tueCueWHu+WQjuS6i+S7tuWPpeafhFxyXG5cdFx0ZXZlbnRDbGljazogZnVuY3Rpb24oIGV2ZW50LCBqc0V2ZW50LCB2aWV3ICkge1xyXG5cdFx0XHQvLyB0aGlzIOaMh+WQkeWMheijueS6i+S7tueahDxhPuWFg+e0oFxyXG5cclxuXHRcdFx0Ly8g5Yik5pat5piv5ZCm5bey57uP5riy5p+T5by556qXXHJcblx0XHRcdGlmICggIWdfZWRpdFBvcHBlciApIHtcclxuXHRcdFx0XHRnX2VkaXRQb3BwZXIgPSByZW5kZXJFZGl0UG9wcGVyKHtcclxuXHRcdFx0XHRcdCdldmVudCc6IGV2ZW50LFxyXG5cdFx0XHRcdFx0J2pzRXZlbnQnOiBqc0V2ZW50LFxyXG5cdFx0XHRcdFx0J3ZpZXcnOiB2aWV3XHJcblx0XHRcdFx0fSwgdGhpcykuRXZlbnRQb3BvdmVyKCdzaG93Jyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Ly8g5pu05pawcmVmZXJlbmNlXHJcblx0XHRcdFx0Z19lZGl0UG9wcGVyLkV2ZW50UG9wb3Zlcignb3B0aW9uJywge1xyXG5cdFx0XHRcdFx0YXJnczoge1xyXG5cdFx0XHRcdFx0XHQnZXZlbnQnOiBldmVudCxcclxuXHRcdFx0XHRcdFx0J2pzRXZlbnQnOiBqc0V2ZW50LFxyXG5cdFx0XHRcdFx0XHQndmlldyc6IHZpZXdcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR0aXRsZTogZXZlbnQudGl0bGUsXHJcblx0XHRcdFx0XHRyZWZlcmVuY2U6IHRoaXNcclxuXHRcdFx0XHR9KS5FdmVudFBvcG92ZXIoJ3VwZGF0ZScpLkV2ZW50UG9wb3Zlcignc2hvdycpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cdFx0XHJcblx0fSlcclxufSlcclxuKi8iLCJpbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcbmltcG9ydCAnZnVsbGNhbGVuZGFyJztcclxuaW1wb3J0IHsgV2l6RGF0YWJhc2UgYXMgZ19kYiwgV2l6Q29tbW9uVUkgYXMgZ19jbW59IGZyb20gJy4uL3V0aWxzL1dpekludGVyZmFjZSc7XHJcbmltcG9ydCBDb25maWcgZnJvbSAnLi4vdXRpbHMvQ29uZmlnJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbGVuZGFyRXZlbnQge1xyXG5cdC8qKlxyXG4gICAgICog5Yib5bu65LiA5Liq6YCa55So5pel56iLLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIOWOn+Wni+aVsOaNruexu+Wei++8jOWPr+S7peaYryBXaXpFdmVudCwgRnVsbENhbGVuZGFyRXZlbnQg5Lul5Y+KIEdVSUQuXHJcbiAgICAgKi9cclxuXHRjb25zdHJ1Y3RvciggZGF0YSwgY2FsZW5kYXIgKSB7XHJcblx0XHRpZiAoIWdfZGIpIHRocm93IG5ldyBFcnJvcignSVdpekRhdGFiYXNlIGlzIG5vdCB2YWxpZC4nKTtcclxuXHRcdGNvbnN0IHR5cGUgPSB0aGlzLl9jaGVja0RhdGFUeXBlKGRhdGEpO1xyXG5cdFx0c3dpdGNoICggdHlwZSApIHtcclxuXHRcdFx0Y2FzZSBcIldpekV2ZW50XCI6XHJcblx0XHRcdGNhc2UgXCJGdWxsQ2FsZW5kYXJFdmVudFwiOlxyXG5cdFx0XHRcdHRoaXMuX2NyZWF0ZShkYXRhLCB0eXBlKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBcIkdVSURcIjpcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0Ly9UT0RPOiDojrflvpdXaXpFdmVudOaVsOaNru+8jOW5tuWIm+W7uuWvueixoVxyXG5cdFx0XHRcdFx0Y29uc3QgZG9jID0gZ19kYi5Eb2N1bWVudEZyb21HVUlEKGRhdGEpO1xyXG5cdFx0XHRcdFx0Y29uc3QgbmV3RXZlbnREYXRhID0ge1xyXG5cdFx0XHRcdFx0XHRcIkNBTEVOREFSX0VORFwiIDogZG9jLkdldFBhcmFtVmFsdWUoJ0NBTEVOREFSX0VORCcpLFxyXG5cdFx0XHRcdFx0XHRcIkNBTEVOREFSX0lORk9cIiA6IGRvYy5HZXRQYXJhbVZhbHVlKCdDQUxFTkRBUl9JTkZPJyksXHJcblx0XHRcdFx0XHRcdFwiQ0FMRU5EQVJfRVhUUkFJTkZPXCIgOiBkb2MuR2V0UGFyYW1WYWx1ZSgnQ0FMRU5EQVJfRVhUUkFJTkZPJyksXHJcblx0XHRcdFx0XHRcdFwiQ0FMRU5EQVJfU1RBUlRcIiA6IGRvYy5HZXRQYXJhbVZhbHVlKCdDQUxFTkRBUl9TVEFSVCcpLFxyXG5cdFx0XHRcdFx0XHRcIkNBTEVOREFSX1JFQ1VSUkVOQ0VcIiA6IGRvYy5HZXRQYXJhbVZhbHVlKCdDQUxFTkRBUl9SRUNVUlJFTkNFJyksXHJcblx0XHRcdFx0XHRcdFwiQ0FMRU5EQVJfRU5EUkVDVVJSRU5DRVwiIDogZG9jLkdldFBhcmFtVmFsdWUoJ0NBTEVOREFSX0VORFJFQ1VSUkVOQ0UnKSxcclxuXHRcdFx0XHRcdFx0XCJjcmVhdGVkXCIgOiBtb21lbnQoZG9jLkRhdGVDcmVhdGVkKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKSxcclxuXHRcdFx0XHRcdFx0XCJndWlkXCIgOiBkb2MuR1VJRCxcclxuXHRcdFx0XHRcdFx0XCJ0aXRsZVwiIDogZG9jLlRpdGxlLFxyXG5cdFx0XHRcdFx0XHRcInVwZGF0ZWRcIiA6IG1vbWVudChkb2MuRGF0ZU1vZGlmaWVkKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0dGhpcy5fY3JlYXRlKG5ld0V2ZW50RGF0YSwgJ1dpekV2ZW50Jyk7XHJcblx0XHRcdFx0fSBjYXRjaCAoZSkgeyBjb25zb2xlLmVycm9yKGUpOyB9XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0X2NyZWF0ZShkYXRhLCB0eXBlKSB7XHJcblx0XHRsZXQgc3RhcnQsIGVuZCwgaWQsIGJrQ29sb3IsIGFsbERheSwgY29tcGxldGUsIGRhdGVDb21wbGV0ZWQsIHJwdFJ1bGUsIHJwdEVuZDtcclxuXHRcdHN3aXRjaCAodHlwZSkge1xyXG5cdFx0XHRjYXNlIFwiR1VJRFwiOlxyXG5cdFx0XHRjYXNlIFwiV2l6RXZlbnRcIjpcclxuXHRcdFx0XHR0aGlzLl9JbmZvID0gdGhpcy5fcGFyc2VJbmZvKGRhdGEuQ0FMRU5EQVJfSU5GTyk7XHJcblx0XHRcdFx0dGhpcy5fRXh0cmFJbmZvID0gZGF0YS5DQUxFTkRBUl9FWFRSQUlORk8gPyB0aGlzLl9wYXJzZUluZm8oZGF0YS5DQUxFTkRBUl9FWFRSQUlORk8pIDogdGhpcy5fZ2V0RGVmYXVsdEV4dHJhSW5mbygpO1xyXG5cdFx0XHRcdC8vIOe7n+S4gOWPmOmHj1xyXG5cdFx0XHRcdGlkID0gZGF0YS5ndWlkO1xyXG5cdFx0XHRcdHN0YXJ0ID0gZGF0YS5DQUxFTkRBUl9TVEFSVDtcclxuXHRcdFx0XHRlbmQgPSBkYXRhLkNBTEVOREFSX0VORDtcclxuXHRcdFx0XHQvLyDliKTmlq3mmK/lkKbnlKjmiLfoh6rlrprkuYnog4zmma/oibLvvIzlkJHkuIvlhbzlrrnljp/niYjml6XljoZcclxuXHRcdFx0XHRia0NvbG9yID0gdGhpcy5fSW5mby5jaSA/ICggcGFyc2VJbnQodGhpcy5fSW5mby5jaSkgPT0gMCA/IHRoaXMuX0luZm8uYiA6IENvbmZpZy5jb2xvckl0ZW1zW3RoaXMuX0luZm8uY2ldLmNvbG9yVmFsdWUgKSA6IHRoaXMuX0luZm8uYjtcclxuXHRcdFx0XHRhbGxEYXkgPSBkYXRhLkNBTEVOREFSX0VORC5pbmRleE9mKFwiMjM6NTk6NTlcIikgIT0gLTEgPyB0cnVlIDogZmFsc2U7XHJcblx0XHRcdFx0Y29tcGxldGUgPSB0aGlzLl9FeHRyYUluZm8uQ29tcGxldGU7XHJcblx0XHRcdFx0ZGF0ZUNvbXBsZXRlZCA9IHRoaXMuX0V4dHJhSW5mby5EYXRlQ29tcGxldGVkO1xyXG5cdFx0XHRcdC8vIOmHjeWkjeS6i+S7tlxyXG5cdFx0XHRcdHJwdFJ1bGUgPSBkYXRhLkNBTEVOREFSX1JFQ1VSUkVOQ0U7XHJcblx0XHRcdFx0cnB0RW5kID0gZGF0YS5DQUxFTkRBUl9FTkRSRUNVUlJFTkNFO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIFwiRnVsbENhbGVuZGFyRXZlbnRcIjpcclxuXHRcdFx0XHRpZCA9IGRhdGEuaWQ7XHJcblx0XHRcdFx0c3RhcnQgPSBkYXRhLnN0YXJ0O1xyXG5cdFx0XHRcdGVuZCA9IGRhdGEuZW5kO1xyXG5cdFx0XHRcdGJrQ29sb3IgPSBkYXRhLmJhY2tncm91bmRDb2xvcjtcclxuXHRcdFx0XHRhbGxEYXkgPSBkYXRhLmFsbERheSA/IGRhdGEuYWxsRGF5IDogISQuZnVsbENhbGVuZGFyLm1vbWVudChkYXRhLnN0YXJ0KS5oYXNUaW1lKCk7XHJcblx0XHRcdFx0Y29tcGxldGUgPSBkYXRhLmNvbXBsZXRlIHx8IDA7XHJcblx0XHRcdFx0ZGF0ZUNvbXBsZXRlZCA9IGRhdGEuZGF0ZUNvbXBsZXRlZCB8fCAnJztcclxuXHRcdFx0XHRycHRSdWxlID0gZGF0YS5ycHRSdWxlO1xyXG5cdFx0XHRcdHJwdEVuZCA9IGRhdGEucnB0RW5kXHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGlkZW50aWZ5IGRhdGEgdHlwZS4nKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHRcdC8vIOWfuuacrOS/oeaBr1xyXG5cdFx0dGhpcy5pZCA9IGlkO1xyXG5cdFx0dGhpcy50aXRsZSA9IGRhdGEudGl0bGU7XHJcblx0XHQvLyDml7bpl7Tkv6Hmga9cclxuXHRcdHRoaXMuYWxsRGF5ID0gYWxsRGF5O1xyXG5cdFx0Ly8g5rOo5oSP77yBc3RhcnQvZW5kIOWPr+iDveaYr21vbWVudOWvueixoeaIluiAhXN0cu+8jOaJgOS7peS4gOW+i+WFiOi9rOaNouaIkG1vbWVudOWGjeagvOW8j+WMlui+k+WHulxyXG5cdFx0dGhpcy5zdGFydCA9IGFsbERheSA/IG1vbWVudChzdGFydCkuZm9ybWF0KFwiWVlZWS1NTS1ERFwiKSA6IG1vbWVudChzdGFydCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHR0aGlzLmVuZCA9IGFsbERheSA/IG1vbWVudChlbmQpLmZvcm1hdChcIllZWVktTU0tRERcIikgOiBtb21lbnQoZW5kKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdHRoaXMuY3JlYXRlZCA9IGRhdGEuY3JlYXRlZCA/IGRhdGEuY3JlYXRlZCA6IG1vbWVudChzdGFydCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHR0aGlzLnVwZGF0ZWQgPSBkYXRhLnVwZGF0ZWQgPyBkYXRhLnVwZGF0ZWQgOiBtb21lbnQoKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdC8vIOiuvue9ruS/oeaBr1xyXG5cdFx0dGhpcy50ZXh0Q29sb3IgPSAnYmxhY2snO1xyXG5cdFx0dGhpcy5iYWNrZ3JvdW5kQ29sb3IgPSBia0NvbG9yO1xyXG5cdFx0dGhpcy5jb21wbGV0ZSA9IGNvbXBsZXRlO1xyXG5cdFx0dGhpcy5kYXRlQ29tcGxldGVkID0gZGF0ZUNvbXBsZXRlZDtcclxuXHRcdC8vIOmHjeWkjeS6i+S7tlxyXG5cdFx0dGhpcy5ycHRSdWxlID0gcnB0UnVsZTtcclxuXHRcdHRoaXMucnB0RW5kID0gcnB0RW5kO1xyXG5cdFx0Ly9cclxuXHRcdHRoaXMuX3VwZGF0ZSgpO1xyXG5cdH1cclxuXHJcblx0X2NoZWNrRGF0YVR5cGUoZGF0YSkge1xyXG5cdFx0Y29uc3Qgb2JqQ2xhc3MgPSBkYXRhLmNvbnN0cnVjdG9yO1xyXG4gICAgICAgIGNvbnN0IEdVSURfUmVnRXhyID0gL15bMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfSQvaTtcclxuICAgICAgICBsZXQgdHlwZTtcclxuICAgICAgICBzd2l0Y2ggKG9iakNsYXNzKSB7XHJcbiAgICAgICAgICAgIGNhc2UgU3RyaW5nOlxyXG4gICAgICAgICAgICAgICAgaWYgKCBHVUlEX1JlZ0V4ci50ZXN0KGRhdGEpICkgdHlwZSA9IFwiR1VJRFwiO1xyXG4gICAgICAgICAgICAgICAgZWxzZSB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZGF0YSwgY2Fubm90IGNyZWF0ZSBDYWxlbmRhckV2ZW50IG9iamVjdC4nKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIE9iamVjdDpcclxuXHRcdFx0XHRpZiAoIGRhdGEuQ0FMRU5EQVJfSU5GTyAmJiBkYXRhLnRpdGxlICkgeyBcclxuXHRcdFx0XHRcdHR5cGUgPSAnV2l6RXZlbnQnO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAoIGRhdGEuc3RhcnQgJiYgZGF0YS50aXRsZSApIHtcclxuXHRcdFx0XHRcdHR5cGUgPSAnRnVsbENhbGVuZGFyRXZlbnQnO1xyXG5cdFx0XHRcdH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHlwZTtcclxuXHR9O1xyXG5cclxuXHRfcGFyc2VJbmZvKEluZm9TdHJpbmcpIHtcclxuXHRcdGNvbnN0IEluZm9PYmplY3QgPSB7fTtcclxuXHRcdC8vIOaLhuino0NBTEVOREFSX0lORk9cclxuXHRcdGNvbnN0IEluZm9BcnJheSA9IEluZm9TdHJpbmcuc3BsaXQoJy8nKTtcclxuXHRcdEluZm9BcnJheS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0sIGluZGV4LCBhcnIpe1xyXG5cdFx0XHRjb25zdCBwYWlyID0gaXRlbS5zcGxpdCgnPScpO1xyXG5cdFx0XHRJbmZvT2JqZWN0W3BhaXJbMF1dID0gcGFpclsxXTtcclxuXHRcdH0pO1xyXG5cdFx0Ly8g5aSE55CG6aKc6Imy5YC8XHJcblx0XHRpZiAoIEluZm9PYmplY3QuYiApIEluZm9PYmplY3QuYiA9ICcjJyArIEluZm9PYmplY3QuYjtcclxuXHJcblx0XHRyZXR1cm4gSW5mb09iamVjdDtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuICAgICAqIOWwhiBJbmZvIOWvueixoeW6j+WIl+WMli5cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbSW5mb09iamVjdD1dIOaPkOS+myBJbmZvIOWvueixoe+8jOm7mOiupOS4umB0aGlzLl9JbmZvYC5cclxuICAgICAqIEByZXR1cm4ge1N0cmluZ30g6L+U5Zue55So5LqOSW5mb+WvueixoeWtl+espuS4si5cclxuICAgICAqL1xyXG5cdF9zdHJpbmdpZnlJbmZvKCBJbmZvT2JqZWN0ID0gdGhpcy5fSW5mbyApIHtcclxuXHRcdGlmICggIUluZm9PYmplY3QgKSByZXR1cm4gJyc7XHJcblx0XHRjb25zdCBJbmZvQXJyYXkgPSBbXTtcclxuXHRcdGNvbnN0IEluZm9PYmplY3RLZXlzQXJyYXkgPSBPYmplY3Qua2V5cyhJbmZvT2JqZWN0KTtcclxuXHRcdEluZm9PYmplY3RLZXlzQXJyYXkuZm9yRWFjaChmdW5jdGlvbihpdGVtLCBpbmRleCwgYXJyKXtcclxuXHRcdFx0Y29uc3Qgc2luZ2xlSW5mbyA9IGAke2l0ZW19PSR7SW5mb09iamVjdFtpdGVtXX1gO1xyXG5cdFx0XHRJbmZvQXJyYXkucHVzaChzaW5nbGVJbmZvKTtcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIEluZm9BcnJheS5qb2luKCcvJykucmVwbGFjZSgnIycsICcnKTtcclxuXHR9O1xyXG5cclxuXHRfdXBkYXRlKCkge1xyXG5cdFx0dGhpcy5fdXBkYXRlSW5mbygpO1xyXG5cdFx0dGhpcy5fdXBkYXRlRXh0cmFJbmZvKCk7XHJcblx0fTtcclxuXHJcblx0X3VwZGF0ZUluZm8oKSB7XHJcblx0XHRjb25zdCB0aGF0ID0gdGhpcztcclxuXHRcdGNvbnN0IEluZm9PYmplY3QgPSB7XHJcblx0XHRcdCdiJzogbnVsbCwgLy/og4zmma/oibJoZXjlgLxcclxuXHRcdFx0J3InOiAnLTEnLCAvL+aPkOmGkuaWueW8j1xyXG5cdFx0XHQnYyc6ICcwJywgLy/nu5PmnZ/mj5DphpLkv6Hmga9cclxuXHRcdFx0J2NpJzogMCAvL+iDjOaZr+iJsklE77yM6buY6K6kIDAg6KGo56S66IOM5pmv5Li655So5oi36Ieq5a6a5LmJXHJcblx0XHR9O1xyXG5cdFx0Ly8g5pu05paw6IOM5pmv6ImyJ2InXHJcblx0XHRJbmZvT2JqZWN0WydiJ10gPSB0aGlzLmJhY2tncm91bmRDb2xvci5yZXBsYWNlKCcjJywgJycpO1xyXG5cdFx0Ly8g5pu05paw6aKc6Imy5oyH5pWwJ2NpJ1xyXG5cdFx0Q29uZmlnLmNvbG9ySXRlbXMuZm9yRWFjaChmdW5jdGlvbihpdGVtLCBpbmRleCwgYXJyKXtcclxuXHRcdFx0aWYgKCBpdGVtLmNvbG9yVmFsdWUgPT0gIHRoYXQuYmFja2dyb3VuZENvbG9yICkge1xyXG5cdFx0XHRcdC8vIOW9k+aXpeeoi+iDjOaZr+iJsuS4juiJsuihqOWMuemFjeaXtuWImeeUqCBjb2xvciBpZGV4IOadpeWCqOWtmO+8iOWFvOWuueWOn+eJiOaXpeWOhuaPkuS7tu+8iVxyXG5cdFx0XHRcdEluZm9PYmplY3RbJ2NpJ10gPSBpbmRleDtcclxuXHRcdFx0fTtcclxuXHRcdH0pO1xyXG5cdFx0Ly8g5bqU55So5pu05pawXHJcblx0XHR0aGlzLl9JbmZvID0gSW5mb09iamVjdDtcclxuXHR9O1xyXG5cclxuXHRfZ2V0RGVmYXVsdEV4dHJhSW5mbygpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdCdDb21wbGV0ZSc6IDAsIC8vXHJcblx0XHRcdCdEYXRlQ29tcGxldGVkJzogJycsIC8vIElTTyDmoIflh4bml6XmnJ/lrZfnrKbkuLIgWVlZWS1NTS1ERCAwMDowMDowMFxyXG5cdFx0XHQnUHJpb3InOiAwXHJcblx0XHR9O1xyXG5cdH07XHJcblxyXG5cdF91cGRhdGVFeHRyYUluZm8oKSB7XHJcblx0XHRjb25zdCBFeHRyYUluZm9PYmplY3QgPSB7XHJcblx0XHRcdCdDb21wbGV0ZSc6IDAsXHJcblx0XHRcdCdEYXRlQ29tcGxldGVkJzogJycsXHJcblx0XHRcdCdQcmlvcic6IDBcclxuXHRcdH07XHJcblx0XHRFeHRyYUluZm9PYmplY3RbJ0NvbXBsZXRlJ10gPSB0aGlzLmNvbXBsZXRlO1xyXG5cdFx0RXh0cmFJbmZvT2JqZWN0WydEYXRlQ29tcGxldGVkJ10gPSB0aGlzLmRhdGVDb21wbGV0ZWQ7XHJcblx0XHR0aGlzLl9FeHRyYUluZm8gPSBFeHRyYUluZm9PYmplY3Q7XHJcblx0fTtcclxuXHJcblx0X2dldEV2ZW50SHRtbCh0aXRsZSA9IHRoaXMudGl0bGUsIGNvbnRlbnQgPSAnJyl7XHJcblx0XHRjb25zdCBodG1sVGV4dCA9IFxyXG5cdFx0XHRgPGh0bWw+XHJcblx0XHRcdFx0PGhlYWQ+XHJcblx0XHRcdFx0XHQ8bWV0YSBodHRwLWVxdWl2PVwiQ29udGVudC1UeXBlXCIgY29udGVudD1cInRleHQvaHRtbDsgY2hhcnNldD11bmljb2RlXCI+XHJcblx0XHRcdFx0XHQ8dGl0bGU+JHt0aXRsZX08L3RpdGxlPiBcclxuXHRcdFx0XHQ8L2hlYWQ+XHJcblx0XHRcdFx0PGJvZHk+XHJcblx0XHRcdFx0XHQ8IS0tV2l6SHRtbENvbnRlbnRCZWdpbi0tPlxyXG5cdFx0XHRcdFx0PGRpdj4ke2NvbnRlbnR9PC9kaXY+XHJcblx0XHRcdFx0XHQ8IS0tV2l6SHRtbENvbnRlbnRFbmQtLT5cclxuXHRcdFx0XHQ8L2JvZHk+XHJcblx0XHRcdDwvaHRtbD5gO1xyXG5cdFxyXG5cdFx0ICByZXR1cm4gaHRtbFRleHRcclxuXHR9O1xyXG5cclxuXHQvKipcclxuICAgICAqIOagueaNruaXpeeoi+eahOmHjeWkjeinhOWImeeUn+aIkCBGdWxsQ2FsZW5kYXIgZXZlbnRTb3VyY2UuXHJcblx0ICogQHBhcmFtIHtTdHJpbmd9IHN0YXJ0IOafpeivoui1t+Wni++8jElTTyDmoIflh4bml6XmnJ/lrZfnrKbkuLIuXHJcblx0ICogQHBhcmFtIHtTdHJpbmd9IGVuZCDmn6Xor6Lnu5PmnZ/vvIxJU08g5qCH5YeG5pel5pyf5a2X56ym5LiyLlxyXG4gICAgICogQHJldHVybnMge09iamVjdH0gZXZlbnRTb3VyY2UuXHJcbiAgICAgKi9cclxuXHRnZW5lcmF0ZVJlcGVhdEV2ZW50cyhzdGFydCwgZW5kKSB7XHJcblx0XHRpZiAoICF0aGlzLnJwdFJ1bGUgKSB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBmaW5kIENhbGVuZGFyRXZlbnQgcmVwZWF0IHJ1bGUuJyk7XHJcblx0XHRjb25zdCBldmVudFNvdXJjZSA9IHtcclxuXHRcdFx0aWQ6IHRoaXMuaWQsXHJcblx0XHRcdGV2ZW50czogW11cclxuXHRcdH1cclxuXHRcdC8v5qC55o2ucnB0UnVsZeeUn+aIkOmHjeWkjeaXpeacn++8jOW5tueUn+aIkOS6i+S7tlxyXG5cdFx0Y29uc3QgZGF5QXJyYXkgPSB0aGlzLl9nZXRSZW5kZXJSZXBlYXREYXkoc3RhcnQsIGVuZCk7XHJcblx0XHRmb3IgKCBsZXQgZGF5IG9mIGRheUFycmF5ICkge1xyXG5cdFx0XHQvLyBkYXkg5piv5LiA5LiqTW9tZW505pel5pyf5a+56LGhXHJcblx0XHRcdGNvbnN0IG5ld0V2ZW50ID0gdGhpcy50b0Z1bGxDYWxlbmRhckV2ZW50KCk7XHJcblx0XHRcdG5ld0V2ZW50LnN0YXJ0ID0gZGF5LmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHRuZXdFdmVudC5lbmQgPSBtb21lbnQobmV3RXZlbnQuZW5kKS5hZGQoIGRheS5kaWZmKCBtb21lbnQodGhpcy5zdGFydCkgKSApLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHRldmVudFNvdXJjZS5ldmVudHMucHVzaChuZXdFdmVudCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGV2ZW50U291cmNlO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG4gICAgICog5qC55o2u6KeE5YiZ55Sf5oiQ5pel5pyf5pWw57uEXHJcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0W119IOWMheWQq+S4gOezu+WIl2BNb21lbnRg5pel5pyf5a+56LGh55qE5pWw57uELlxyXG4gICAgICovXHJcblx0X2dldFJlbmRlclJlcGVhdERheShzdGFydCwgZW5kKSB7XHJcblx0XHRjb25zdCBycHRSdWxlID0gdGhpcy5ycHRSdWxlO1xyXG5cdFx0bGV0IGRheUFycmF5O1xyXG5cdFx0bGV0IHJlZ2V4O1xyXG5cdFx0Y29uc29sZS5jb3VudChycHRSdWxlKTtcclxuXHRcdGlmICggKHJlZ2V4ID0gL15FdmVyeShcXGQpP1dlZWtzPyhcXGQqKSQvKS50ZXN0KHJwdFJ1bGUpICkge1xyXG5cdFx0XHQvLyDmr49bMTIzNF3lkahbNzEyMzQ1Nl1cclxuXHRcdFx0Y29uc3QgY3VyV2Vla0RheSA9IG1vbWVudCh0aGlzLnN0YXJ0KS5kYXkoKTtcclxuXHRcdFx0Y29uc3QgcmVzdWx0cyA9IHJlZ2V4LmV4ZWMocnB0UnVsZSk7XHJcblx0XHRcdGNvbnN0IGludGVyV2VlayA9IHJlc3VsdHNbMV07XHJcblx0XHRcdGNvbnN0IG51bWJlciA9IHJlc3VsdHNbMl0gfHwgYCR7Y3VyV2Vla0RheX1gO1xyXG5cdFx0XHRkYXlBcnJheSA9IHRoaXMuX2dldFdlZWtseVJlcGVhdERheShudW1iZXIsIHN0YXJ0LCBlbmQsIGludGVyV2Vlayk7XHJcblxyXG5cdFx0fSBlbHNlIGlmICggKHJlZ2V4ID0gL15FdmVyeVdlZWtkYXkoXFxkKikkLykudGVzdChycHRSdWxlKSApIHtcclxuXHRcdFx0Ly8g5q+P5Liq5bel5L2c5pelRXZlcnlXZWVrZGF5MTM1XHJcblx0XHRcdGNvbnN0IHJlc3VsdHMgPSByZWdleC5leGVjKHJwdFJ1bGUpO1xyXG5cdFx0XHRjb25zdCBudW1iZXIgPSByZXN1bHRzWzFdIHx8ICcxMjM0NSc7XHJcblx0XHRcdGRheUFycmF5ID0gdGhpcy5fZ2V0V2Vla2x5UmVwZWF0RGF5KG51bWJlciwgc3RhcnQsIGVuZCk7XHJcblxyXG5cdFx0fSBlbHNlIGlmICggKHJlZ2V4ID0gL0RhaWx5fFdlZWtseXxNb250aGx5fFllYXJseS8pLnRlc3QocnB0UnVsZSkgKSB7XHJcblx0XHRcdC8vIERhaWx5fFdlZWtseXxNb250aGx5fFllYXJseVxyXG5cdFx0XHRjb25zdCBwZXJSdWxlID0gcmVnZXguZXhlYyhycHRSdWxlKVswXVxyXG5cdFx0XHRkYXlBcnJheSA9IHRoaXMuX2dldFBlclJlcGVhdERheXMoc3RhcnQsIGVuZCwgcGVyUnVsZSk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBkYXlBcnJheTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuICAgICAqIOagueaNruavj+WRqOinhOWImeeUn+aIkOaXpeacn+aVsOe7hFxyXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBudW1iZXIg5pW05pWw5a2X56ym5Liy6KGo56S655qE6KeE5YiZ77ybXHJcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0W119IOWMheWQq+S4gOezu+WIl01vbWVudOaXpeacn+WvueixoeeahOaVsOe7hC5cclxuICAgICAqL1xyXG5cdF9nZXRXZWVrbHlSZXBlYXREYXkobnVtYmVyLCBzdGFydCwgZW5kLCBpbnRlcldlZWtzID0gJzEnKSB7XHJcblx0XHQvL+i/lOWbnlt7c3RhcnQsIGVuZH0sIHtzdGFydCwgZW5kfSwge3N0YXJ0LCBlbmR9XVxyXG5cdFx0Ly/ogIPomZHmuLLmn5PojIPlm7TvvIzku6Xlj4rnu5PmnZ/lvqrnjq/nmoTml6XmnJ9cclxuXHRcdGNvbnN0IHZpZXdTdGFydCA9IG1vbWVudCh0aGlzLnN0YXJ0KTtcclxuXHRcdGNvbnN0IHZpZXdFbmQgPSBtb21lbnQoZW5kKTtcclxuXHRcdGNvbnN0IHJwdEVuZCA9IHRoaXMucnB0RW5kID8gbW9tZW50KHRoaXMucnB0RW5kKSA6IHZpZXdFbmQ7XHJcblx0XHRsZXQgZGF5QXJyYXkgPSBbXTtcclxuXHRcdGNvbnN0IGludGVydmFsV2Vla3MgPSBpbnRlcldlZWtzID8gcGFyc2VJbnQoaW50ZXJXZWVrcykgOiAxO1xyXG5cdFx0Y29uc3Qgd2Vla2RheXMgPSBudW1iZXIucmVwbGFjZSgnNycsICcwJykuc3BsaXQoJycpOyAvL+WRqOaXpTB+NuWRqOWFrVxyXG5cdFx0Zm9yICggbGV0IGRheSBvZiB3ZWVrZGF5cyApIHtcclxuXHRcdFx0Ly9cclxuXHRcdFx0bGV0IGN1cldlZWtEYXkgPSBwYXJzZUludChkYXkpLCBuZXdFdmVudFN0YXJ0RGF0ZSA9IG1vbWVudCh2aWV3U3RhcnQpO1xyXG5cdFx0XHRkbyB7XHJcblx0XHRcdFx0Ly8g5Yib5bu65pawTW9tZW505a+56LGhXHJcblx0XHRcdFx0bmV3RXZlbnRTdGFydERhdGUgPSBtb21lbnQodmlld1N0YXJ0KS5kYXkoY3VyV2Vla0RheSk7XHJcblx0XHRcdFx0Ly8g5qC55o2u5pel56iL6K6+572udGltZSBwYXJ0XHJcblx0XHRcdFx0Y29uc3QgZXZlbnRTdGFydCA9IG1vbWVudCh0aGlzLnN0YXJ0KVxyXG5cdFx0XHRcdG5ld0V2ZW50U3RhcnREYXRlLnNldCh7XHJcblx0XHRcdFx0XHQnaG91cic6IGV2ZW50U3RhcnQuZ2V0KCdob3VyJyksXHJcblx0XHRcdFx0XHQnbWludXRlJzogZXZlbnRTdGFydC5nZXQoJ21pbnV0ZScpLFxyXG5cdFx0XHRcdFx0J3NlY29uZCc6IGV2ZW50U3RhcnQuZ2V0KCdzZWNvbmQnKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0Ly8g6YG/5YWN5Yid5aeL6YeN5aSN5riy5p+TXHJcblx0XHRcdFx0aWYgKCAhbmV3RXZlbnRTdGFydERhdGUuaXNTYW1lKCBldmVudFN0YXJ0ICkgKSBkYXlBcnJheS5wdXNoKCBtb21lbnQobmV3RXZlbnRTdGFydERhdGUpICk7XHJcblx0XHRcdFx0Ly8g6ZqU5aSa5bCR5ZGo6YeN5aSNXHJcblx0XHRcdFx0Y3VyV2Vla0RheSArPSA3KmludGVydmFsV2Vla3M7XHJcblx0XHRcdFx0Ly9jb25zb2xlLmxvZyggbW9tZW50KG5ld0V2ZW50U3RhcnREYXRlKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKSApO1xyXG5cdFx0XHR9IHdoaWxlICggbW9tZW50KHZpZXdTdGFydCkuZGF5KGN1cldlZWtEYXkgKyA3ICkuaXNCZWZvcmUoIHZpZXdFbmQgKSBcclxuXHRcdFx0XHRcdFx0JiYgbW9tZW50KHZpZXdTdGFydCkuZGF5KGN1cldlZWtEYXkgKyA3ICkuaXNCZWZvcmUoIHJwdEVuZCApICApXHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gZGF5QXJyYXk7XHJcblx0fTtcclxuXHJcblx0X2dldFBlclJlcGVhdERheXMoc3RhcnQsIGVuZCwgcGVyUnVsZSkge1xyXG5cdFx0Y29uc3QgcGVyUnVsZU1hcCA9IHtcclxuXHRcdFx0J0RhaWx5JzogJ2RheXMnLFxyXG5cdFx0XHQnV2Vla2x5JyA6ICd3ZWVrcycsXHJcblx0XHRcdCdNb250aGx5JyA6ICdtb250aHMnLFxyXG5cdFx0XHQnWWVhcmx5JyA6ICd5ZWFycydcclxuXHRcdH07XHJcblx0XHRjb25zdCB2aWV3U3RhcnQgPSBtb21lbnQodGhpcy5zdGFydCk7XHJcblx0XHRjb25zdCB2aWV3RW5kID0gbW9tZW50KGVuZCk7XHJcblx0XHRjb25zdCBycHRFbmQgPSB0aGlzLnJwdEVuZCA/IG1vbWVudCh0aGlzLnJwdEVuZCkgOiB2aWV3RW5kO1xyXG5cdFx0bGV0IGRheUFycmF5ID0gW107XHJcblx0XHRjb25zdCBldmVudFN0YXJ0ID0gbW9tZW50KHRoaXMuc3RhcnQpXHJcblx0XHRkbyB7XHJcblx0XHRcdC8vIOWinuWKoOS4gOS4quaciFxyXG5cdFx0XHRldmVudFN0YXJ0LmFkZCgxLCBwZXJSdWxlTWFwW3BlclJ1bGVdKTtcclxuXHRcdFx0ZGF5QXJyYXkucHVzaCggbW9tZW50KGV2ZW50U3RhcnQpICk7XHJcblx0XHR9IHdoaWxlICggZXZlbnRTdGFydC5pc0JlZm9yZSggdmlld0VuZCApICYmIGV2ZW50U3RhcnQuaXNCZWZvcmUoIHJwdEVuZCApICk7XHJcblxyXG5cdFx0cmV0dXJuIGRheUFycmF5O1xyXG5cdH1cclxuXHJcblx0dG9GdWxsQ2FsZW5kYXJFdmVudCgpIHtcclxuXHRcdGNvbnN0IG5ld0V2ZW50ID0gJC5leHRlbmQoe30sIHRoaXMpO1xyXG5cdFx0Ly8g5Yig6Zmk5peg5YWz5pWw5o2uXHJcblx0XHRkZWxldGUgbmV3RXZlbnQuX0luZm87XHJcblx0XHRkZWxldGUgbmV3RXZlbnQuX0V4dHJhSW5mbztcclxuXHRcdHJldHVybiBuZXdFdmVudDtcclxuXHR9O1xyXG5cclxuXHR0b1dpekV2ZW50RGF0YSgpIHtcclxuXHRcdHRoaXMuX3VwZGF0ZSgpO1xyXG5cdFx0Y29uc3QgbmV3RXZlbnQgPSB7fTtcclxuXHRcdG5ld0V2ZW50LnRpdGxlID0gdGhpcy50aXRsZTtcclxuXHRcdG5ld0V2ZW50Lmd1aWQgPSB0aGlzLmlkO1xyXG5cdFx0bmV3RXZlbnQuQ0FMRU5EQVJfU1RBUlQgPSB0aGlzLmFsbERheSA/IG1vbWVudCh0aGlzLnN0YXJ0KS5mb3JtYXQoJ1lZWVktTU0tREQgMDA6MDA6MDAnKSA6IHRoaXMuc3RhcnQ7XHJcblx0XHRuZXdFdmVudC5DQUxFTkRBUl9FTkQgPSB0aGlzLmFsbERheSA/IG1vbWVudCh0aGlzLmVuZCkuZm9ybWF0KCdZWVlZLU1NLUREIDIzOjU5OjU5JykgOiB0aGlzLmVuZDtcclxuXHRcdG5ld0V2ZW50LkNBTEVOREFSX0lORk8gPSB0aGlzLl9zdHJpbmdpZnlJbmZvKHRoaXMuX0luZm8pO1xyXG5cdFx0bmV3RXZlbnQuQ0FMRU5EQVJfRVhUUkFJTkZPID0gdGhpcy5fc3RyaW5naWZ5SW5mbyh0aGlzLl9FeHRyYUluZm8pO1xyXG5cdFx0bmV3RXZlbnQuY3JlYXRlZCA9IHRoaXMuY3JlYXRlZDtcclxuXHRcdG5ld0V2ZW50LnVwZGF0ZWQgPSB0aGlzLnVwZGF0ZWQ7XHJcblx0XHRyZXR1cm4gbmV3RXZlbnQ7XHJcblx0fTtcclxuXHJcblx0X3NhdmVBbGxQcm9wKCkge1xyXG5cdFx0Ly9UT0RPOiDkv53lrZjlhajpg6jmlbDmja7ljIXmi6xUaXRsZVxyXG5cdFx0Ly8g5pu05paw5LqL5Lu25paH5qGj5pWw5o2uXHJcblx0XHRjb25zdCBkb2MgPSBnX2RiLkRvY3VtZW50RnJvbUdVSUQodGhpcy5pZCk7XHJcblx0XHQvLyDkv53lrZjmoIfpophcclxuXHRcdGRvYy5UaXRsZSA9IHRoaXMudGl0bGU7XHJcblx0XHQvLyDkv53lrZjml7bpl7TmlbDmja5cclxuXHRcdGlmICggdGhpcy5hbGxEYXkgKSB7XHJcblx0XHRcdGxldCBzdGFydFN0ciA9IG1vbWVudCh0aGlzLnN0YXJ0KS5zZXQoeydoJzogMCwgJ20nOiAwLCAncyc6IDB9KS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0bGV0IGVuZFN0ciA9IG1vbWVudCh0aGlzLmVuZCkuc2V0KHsnaCc6IDIzLCAnbSc6IDU5LCAncyc6IDU5fSkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX1NUQVJUXCIsIHN0YXJ0U3RyKTtcclxuXHRcdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfRU5EXCIsIGVuZFN0cik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRsZXQgc3RhcnRTdHIgPSBtb21lbnQodGhpcy5zdGFydCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRcdGxldCBlbmRTdHIgPSBtb21lbnQodGhpcy5lbmQpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9TVEFSVFwiLCBzdGFydFN0cik7XHJcblx0XHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX0VORFwiLCBlbmRTdHIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIOS/neWtmCBDQUxFTkRBUl9JTkZPXHJcblx0XHR0aGlzLl91cGRhdGUoKTtcclxuXHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX0lORk9cIiwgdGhpcy5fc3RyaW5naWZ5SW5mbyh0aGlzLl9JbmZvKSk7XHJcblx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9FWFRSQUlORk9cIiwgdGhpcy5fc3RyaW5naWZ5SW5mbyh0aGlzLl9FeHRyYUluZm8pKTtcclxuXHR9O1xyXG5cclxuXHQvLyDorr7nva7mlofmoaPlsZ7mgKflgLxcclxuXHRfc2V0UGFyYW1WYWx1ZShkb2MsIGtleSwgdmFsdWUpIHtcclxuXHRcdGlmICghZG9jKSByZXR1cm4gZmFsc2U7XHJcblx0XHRkb2MuU2V0UGFyYW1WYWx1ZShrZXksIHZhbHVlKTtcclxuXHR9O1xyXG5cclxuXHRfY3JlYXRlV2l6RXZlbnREb2MoKSB7XHJcblx0XHQvL1RPRE86IOS/neWtmOWFqOmDqOaVsOaNruWMheaLrFRpdGxlXHJcblx0XHQvLyDliJvlu7pXaXpEb2NcclxuXHRcdGNvbnN0IGxvY2F0aW9uID0gYE15IEV2ZW50cy8keyBtb21lbnQodGhpcy5zdGFydCkuZm9ybWF0KCdZWVlZLU1NJykgfS9gO1xyXG5cdFx0Y29uc3Qgb2JqRm9sZGVyID0gZ19kYi5HZXRGb2xkZXJCeUxvY2F0aW9uKGxvY2F0aW9uLCB0cnVlKTtcclxuXHRcdGNvbnN0IHRlbXBIdG1sID0gZ19jbW4uR2V0QVRlbXBGaWxlTmFtZSgnLmh0bWwnKTtcclxuXHRcdGNvbnN0IGh0bWxUZXh0ID0gdGhpcy5fZ2V0RXZlbnRIdG1sKHRoaXMudGl0bGUsICcnKTtcclxuXHRcdGdfY21uLlNhdmVUZXh0VG9GaWxlKHRlbXBIdG1sLCBodG1sVGV4dCwgJ3VuaWNvZGUnKTtcclxuXHRcdGNvbnN0IGRvYyA9IG9iakZvbGRlci5DcmVhdGVEb2N1bWVudDIodGhpcy50aXRsZSwgXCJcIik7XHJcblx0XHRkb2MuQ2hhbmdlVGl0bGVBbmRGaWxlTmFtZSh0aGlzLnRpdGxlKTtcclxuXHRcdGRvYy5VcGRhdGVEb2N1bWVudDYodGVtcEh0bWwsIHRlbXBIdG1sLCAweDIyKTtcclxuXHRcdC8vIOiuvue9ruagh+etvlxyXG5cdFx0Ly9pZiAoIHRhZ3MgKSBkb2MuU2V0VGFnc1RleHQyKHRhZ3MsIFwiQ2FsZW5kYXJcIik7XHJcblx0XHQvLyDlsIbkv6Hmga/nvJbnoIHliLBXaXpEb2PlsZ7mgKfkuK3ljrtcclxuXHRcdGNvbnN0IG5ld0V2ZW50ID0gdGhpcy50b1dpekV2ZW50RGF0YSgpO1xyXG5cdFx0ZG9jLkFkZFRvQ2FsZW5kYXIobmV3RXZlbnQuQ0FMRU5EQVJfU1RBUlQsIG5ld0V2ZW50LkNBTEVOREFSX0VORCwgbmV3RXZlbnQuQ0FMRU5EQVJfSU5GTyk7XHJcblx0XHQvLyBjaGFuZ2UgZGF0YWJhc2VcclxuXHRcdGRvYy50eXBlID0gXCJldmVudFwiO1xyXG5cdFx0Ly9cclxuXHRcdHRoaXMuaWQgPSBkb2MuR1VJRDtcclxuXHR9XHJcblxyXG5cdHNhdmVUb1dpekV2ZW50RG9jKCBwcm9wID0gJ2FsbCcgKSB7XHJcblx0XHRpZiAoIWdfZGIgfHwgIWdfY21uKSB0aHJvdyBuZXcgRXJyb3IoJ0lXaXpEYXRhYmFzZSBvciBJV2l6Q29tbW9uVUkgaXMgbm90IHZhbGlkLicpO1xyXG5cdFx0Ly/mo4Dmn6XmlofmoaPmmK/lkKblrZjlnKhcclxuXHRcdGNvbnN0IGd1aWRSZWdleCA9IC9eWzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtNV1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn0kL2k7XHJcblx0XHRjb25zdCBpc1dpekRvY0V4aXN0ID0gZ3VpZFJlZ2V4LnRlc3QodGhpcy5pZCk7XHJcblx0XHQvLyDliJvlu7rmiJbogIXmm7TmlrDmlofmoaNcclxuXHRcdGlmICggaXNXaXpEb2NFeGlzdCApIHtcclxuXHRcdFx0Ly8g5qC55o2u5oyH5Luk5pu05paw5YaF5a65XHJcblx0XHRcdHRoaXMuX3NhdmVBbGxQcm9wKCk7XHJcblx0XHRcdC8vIOabtOaWsEZ1bGxDYWxlbmRhclxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Ly8g5Yib5bu65paw55qE5LqL5Lu25paH5qGjXHJcblx0XHRcdHRoaXMuX2NyZWF0ZVdpekV2ZW50RG9jKCk7XHJcblx0XHR9XHJcblx0XHRcclxuXHR9O1xyXG5cclxuXHRkZWxldGVFdmVudERhdGEoIGlzRGVsZXRlRG9jID0gZmFsc2UgKXtcclxuXHRcdGNvbnN0IGRvYyA9IGdfZGIuRG9jdW1lbnRGcm9tR1VJRCh0aGlzLmlkKTtcclxuXHRcdGlmICghZG9jKSB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgZmluZCBFdmVudCByZWxhdGVkIFdpekRvY3VtZW50LicpXHJcblx0XHQvLyDnp7vpmaTml6XljobmlbDmja5cclxuXHRcdGRvYy5SZW1vdmVGcm9tQ2FsZW5kYXIoKTtcclxuXHRcdC8vIOWIoOmZpOaWh+aho1xyXG5cdFx0aWYgKCBpc0RlbGV0ZURvYyApIGRvYy5EZWxldGUoKTtcclxuXHR9XHJcblxyXG59IiwiaW1wb3J0IHsgV2l6RGF0YWJhc2UgYXMgb2JqRGF0YWJhc2UgfSBmcm9tICcuLi91dGlscy9XaXpJbnRlcmZhY2UnO1xyXG5pbXBvcnQgQ2FsZW5kYXJFdmVudCBmcm9tICcuL0NhbGVuZGFyRXZlbnQnO1xyXG5cclxuLyog5pWw5o2u6I635Y+WXHJcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuLyoqIOivpeexu+S4jldpem5vdGXnmoRXaXpEYXRhYmFzZeaOpeWPo+S6pOaNouS/oeaBr++8jOiOt+WPluaVsOaNriAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXaXpFdmVudERhdGFMb2FkZXIge1xyXG5cclxuXHQvKipcclxuICAgICAqIOWIm+mAoOS4gOS4quS6i+S7tuaVsOaNruWKoOi9veWZqC5cclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gc3RhcnQg5p+l6K+i6LW35aeL5pel5pyf77yMSVNP5qCH5YeG5pel5pyf5a2X56ym5LiyLlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBlbmQg5p+l6K+i5oiq6Iez5pel5pyf77yMSVNP5qCH5YeG5pel5pyf5a2X56ym5LiyLlxyXG4gICAgICovXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRpZiAoIW9iakRhdGFiYXNlKSB0aHJvdyBuZXcgRXJyb3IoJ1dpekRhdGFiYXNlIG5vdCB2YWxpZCAhJyk7XHJcblx0XHR0aGlzLkRhdGFiYXNlID0gb2JqRGF0YWJhc2U7XHJcblx0XHR0aGlzLnVzZXJOYW1lID0gb2JqRGF0YWJhc2UuVXNlck5hbWU7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcbiAgICAgKiDojrflvpfmuLLmn5PlkI7nmoTmiYDmnIlGdWxsQ2FsZW5kYXLkuovku7YuXHJcblx0ICogQHBhcmFtIHtvYmplY3R9IHZpZXcgaXMgdGhlIFZpZXcgT2JqZWN0IG9mIEZ1bGxDYWxlbmRhciBmb3IgdGhlIG5ldyB2aWV3LlxyXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBlbGVtZW50IGlzIGEgalF1ZXJ5IGVsZW1lbnQgZm9yIHRoZSBjb250YWluZXIgb2YgdGhlIG5ldyB2aWV3LlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0W119IOi/lOWbnueUqOS6jkZ1bGxDYWxlbmRhciDmuLLmn5PnmoQgZXZlbnRTb3VyY2VzIOaVsOe7hC5cclxuICAgICAqL1xyXG5cdGdldEV2ZW50U291cmNlcyggdmlldywgZWxlbWVudCApe1xyXG5cdFx0Y29uc3Qgdmlld1N0YXJ0ID0gdmlldy5zdGFydC5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdGNvbnN0IHZpZXdFbmQgPSB2aWV3LmVuZC5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdGxldCBldmVudFNvdXJjZXMgPSBbXTtcclxuXHRcdC8v6I635Y+W5pmu6YCa5pel56iLXHJcblx0XHRjb25zdCBnZW5lcmFsRXZlbnRTb3VyY2UgPSB7XHJcblx0XHRcdHR5cGU6ICdnZW5lcmFsRXZlbnRzJyxcclxuXHRcdFx0Ly9ldmVudHM6IHRoaXMuX2dldEFsbE9yaWdpbmFsRXZlbnQoW10sIHRoaXMuX2QycyhjdXJyZW50Vmlldy5zdGFydC50b0RhdGUoKSksIHRoaXMuX2QycyhjdXJyZW50Vmlldy5lbmQudG9EYXRlKCkpKVxyXG5cdFx0XHRldmVudHM6IHRoaXMuX2dldEFsbE9yaWdpbmFsRXZlbnQodmlld1N0YXJ0LCB2aWV3RW5kKVxyXG5cdFx0fVxyXG5cdFx0ZXZlbnRTb3VyY2VzLnB1c2goZ2VuZXJhbEV2ZW50U291cmNlKTtcclxuXHRcdFxyXG5cdFx0Ly9UT0RPOiDojrflj5bph43lpI3ml6XnqItcclxuXHRcdGNvbnN0IHJlcGVhdEV2ZW50U291cmNlcyA9IHRoaXMuX2dldEFsbFJlcGVhdEV2ZW50KHZpZXdTdGFydCwgdmlld0VuZCk7XHJcblx0XHRldmVudFNvdXJjZXMgPSBldmVudFNvdXJjZXMuY29uY2F0KHJlcGVhdEV2ZW50U291cmNlcyk7XHJcblx0XHQvL1xyXG5cdFx0cmV0dXJuIGV2ZW50U291cmNlcztcclxuXHR9O1xyXG5cclxuXHQvKipcclxuICAgICAqIOS7jldpekRhdGFiYXNl5Lit6I635Y+W5omA5pyJ5pWw5o2u5paH5qGjLlxyXG5cdCAqIEBwYXJhbSB7YXJyYXl9IGV2ZW50cyDliJ3lp4vkuovku7bmlbDnu4QuXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHN0YXJ0IElTT+agh+WHhuaXpeacn+Wtl+espuS4si5cclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZW5kIElTT+agh+WHhuaXpeacn+Wtl+espuS4si5cclxuICAgICAqIEByZXR1cm4ge09iamVjdFtdfSDov5Tlm57nlKjkuo5GdWxsQ2FsZW5kYXLmuLLmn5PnmoTkuovku7bmlbDnu4QuXHJcbiAgICAgKi9cclxuXHRfZ2V0QWxsT3JpZ2luYWxFdmVudChzdGFydCwgZW5kKXtcclxuXHRcdGNvbnN0IGV2ZW50cyA9IFtdO1xyXG5cdFx0bGV0IHNxbCA9IGBET0NVTUVOVF9MT0NBVElPTiBub3QgbGlrZSAnL0RlbGV0ZWQgSXRlbXMvJScgYW5kIChLQl9HVUlEIGlzIG51bGwgb3IgS0JfR1VJRCA9ICcnKWA7XHJcblx0XHRsZXQgYW5kMSA9IGAgYW5kIERPQ1VNRU5UX0dVSUQgaW4gKHNlbGVjdCBET0NVTUVOVF9HVUlEIGZyb20gV0laX0RPQ1VNRU5UX1BBUkFNIHdoZXJlIFBBUkFNX05BTUUgPSAnQ0FMRU5EQVJfU1RBUlQnICBhbmQgIFBBUkFNX1ZBTFVFIDw9ICcke2VuZH0nIClgO1xyXG5cdFx0bGV0IGFuZDIgPSBgIGFuZCBET0NVTUVOVF9HVUlEIGluIChzZWxlY3QgRE9DVU1FTlRfR1VJRCBmcm9tIFdJWl9ET0NVTUVOVF9QQVJBTSB3aGVyZSBQQVJBTV9OQU1FID0gJ0NBTEVOREFSX0VORCcgIGFuZCAgUEFSQU1fVkFMVUUgPj0gJyR7c3RhcnR9JyApYDtcclxuXHRcdGlmIChzdGFydCkgc3FsICs9IGFuZDI7XHJcblx0XHRpZiAoZW5kKSBzcWwgKz0gYW5kMTtcclxuXHRcdGlmIChvYmpEYXRhYmFzZS5Eb2N1bWVudHNEYXRhRnJvbVNRTCkge1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdGNvbnN0IGRhdGEgPSBvYmpEYXRhYmFzZS5Eb2N1bWVudHNEYXRhRnJvbVNRTChzcWwpO1xyXG5cdFx0XHRcdGlmICggIWRhdGEgKSByZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0Y29uc3Qgb2JqID0gSlNPTi5wYXJzZShkYXRhKTtcclxuXHRcdFx0XHRpZiAoICFvYmogfHwgIUFycmF5LmlzQXJyYXkob2JqKSApIHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkgKyspIHtcclxuXHRcdFx0XHRcdGV2ZW50cy5wdXNoKFxyXG5cdFx0XHRcdFx0XHRuZXcgQ2FsZW5kYXJFdmVudChvYmpbaV0pLnRvRnVsbENhbGVuZGFyRXZlbnQoKVxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0cmV0dXJuIGV2ZW50cztcclxuXHRcdFx0fVxyXG5cdFx0XHRjYXRjaChlcnIpIHtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKGVycik7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdEb2N1bWVudHNEYXRhRnJvbVNRTCBtZXRob2Qgb2YgV2l6RGF0YWJhc2Ugbm90IGV4aXN0IScpO1xyXG5cdFx0XHQvKlxyXG5cdFx0XHRsZXQgZG9jQ29sbGV0aW9uID0gb2JqRGF0YWJhc2UuRG9jdW1lbnRzRnJvbVNRTChzcWwpO1xyXG5cdFx0XHQvL1xyXG5cdFx0XHRpZiAoZG9jQ29sbGV0aW9uICYmIGRvY0NvbGxldGlvbi5Db3VudCl7XHJcblx0XHRcdFx0bGV0IGRvYztcclxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGRvY0NvbGxldGlvbi5Db3VudDsgKysgaSl7XHJcblx0XHRcdFx0XHRkb2MgPSBkb2NDb2xsZXRpb24uSXRlbShpKTtcclxuXHRcdFx0XHRcdGxldCBldmVudE9iaiA9IF9ldmVudE9iamVjdChfbmV3UHNldWRvRG9jKGRvYykpO1xyXG5cdFx0XHRcdFx0aWYgKGV2ZW50T2JqKVxyXG5cdFx0XHRcdFx0XHRldmVudHMucHVzaChldmVudE9iaik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBldmVudHM7XHJcblx0XHRcdH1cclxuXHRcdFx0Ki9cdFx0XHJcblx0XHR9XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG4gICAgICog5LuOV2l6RGF0YWJhc2XkuK3ojrflj5bmiYDmnInlvqrnjq/ph43lpI3kuovku7YuXHJcblx0ICog5LuO5Yib5bu65LqL5Lu255qE5pel5pyf5byA5aeL5YiwRU5EUkVDVVJSRU5DRee7k+adn1xyXG4gICAgICogQHJldHVybiB7T2JqZWN0W119IOi/lOWbnueUqOS6jkZ1bGxDYWxlbmRhcua4suafk+eahCBldmVudFNvdXJjZSDmlbDnu4QuXHJcbiAgICAgKi9cclxuXHRfZ2V0QWxsUmVwZWF0RXZlbnQoc3RhcnQsIGVuZCl7XHJcblx0XHRjb25zdCByZXBlYXRFdmVudHMgPSBbXTtcclxuXHRcdGNvbnN0IHNxbCA9IFwiRE9DVU1FTlRfTE9DQVRJT04gbm90IGxpa2UgJy9EZWxldGVkIEl0ZW1zLyUnIGFuZCAoS0JfR1VJRCBpcyBudWxsIG9yIEtCX0dVSUQgPSAnJykgYW5kIFwiICsgXHJcblx0XHRcdFx0XHRcIkRPQ1VNRU5UX0dVSUQgaW4gKHNlbGVjdCBET0NVTUVOVF9HVUlEIGZyb20gV0laX0RPQ1VNRU5UX1BBUkFNIHdoZXJlIFBBUkFNX05BTUU9J0NBTEVOREFSX1JFQ1VSUkVOQ0UnKVwiO1xyXG5cclxuXHRcdGNvbnN0IGRhdGEgPSBvYmpEYXRhYmFzZS5Eb2N1bWVudHNEYXRhRnJvbVNRTChzcWwpO1xyXG5cdFx0Y29uc29sZS5sb2coZGF0YSlcclxuXHRcdGlmICggIWRhdGEgKSByZXR1cm4gZmFsc2U7XHJcblx0XHRcclxuXHRcdGNvbnN0IG9iaiA9IEpTT04ucGFyc2UoZGF0YSk7XHJcblx0XHRpZiAoICFvYmogfHwgIUFycmF5LmlzQXJyYXkob2JqKSApIHJldHVybiBmYWxzZTtcclxuXHRcdFxyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpICsrKSB7XHJcblx0XHRcdHJlcGVhdEV2ZW50cy5wdXNoKFxyXG5cdFx0XHRcdG5ldyBDYWxlbmRhckV2ZW50KG9ialtpXSkuZ2VuZXJhdGVSZXBlYXRFdmVudHMoc3RhcnQsIGVuZClcclxuXHRcdFx0KVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlcGVhdEV2ZW50cztcclxuXHRcdFxyXG5cdH07XHJcblxyXG5cdC8vIOaXpeWOhuS6i+S7tuaLluWKqOWQjuabtOaWsOaVsOaNrlxyXG5cdHVwZGF0ZUV2ZW50RGF0YU9uRHJvcChldmVudCwgZGVsdGEsIHJldmVydEZ1bmMsIGpzRXZlbnQsIHVpLCB2aWV3KXtcclxuXHRcdC8vIENhbGwgaGFzVGltZSBvbiB0aGUgZXZlbnTigJlzIHN0YXJ0L2VuZCB0byBzZWUgaWYgaXQgaGFzIGJlZW4gZHJvcHBlZCBpbiBhIHRpbWVkIG9yIGFsbC1kYXkgYXJlYS5cclxuXHRcdGNvbnN0IGFsbERheSA9ICFldmVudC5zdGFydC5oYXNUaW1lKCk7XHJcblx0XHQvLyDojrflj5bkuovku7bmlofmoaPml7bpl7TmlbDmja5cclxuXHRcdGNvbnN0IGRvYyA9IG9iakRhdGFiYXNlLkRvY3VtZW50RnJvbUdVSUQoZXZlbnQuaWQpO1xyXG5cdFx0Ly8g5pu05paw5pWw5o2uXHJcblx0XHRpZiAoIGFsbERheSApIHtcclxuXHRcdFx0Y29uc3Qgc3RhcnRTdHIgPSBldmVudC5zdGFydC5zZXQoeydoJzogMCwgJ20nOiAwLCAncyc6IDB9KS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0Y29uc3QgZW5kU3RyID0gZXZlbnQuZW5kLnNldCh7J2gnOiAyMywgJ20nOiA1OSwgJ3MnOiA1OX0pLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9TVEFSVFwiLCBzdGFydFN0cik7XHJcblx0XHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX0VORFwiLCBlbmRTdHIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc3Qgc3RhcnRTdHIgPSBldmVudC5zdGFydC5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0Y29uc3QgZW5kU3RyID0gZXZlbnQuZW5kLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9TVEFSVFwiLCBzdGFydFN0cik7XHJcblx0XHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX0VORFwiLCBlbmRTdHIpO1xyXG5cdFx0fVxyXG5cdFx0Ly9UT0RPOiDmm7TmlrBDQUxFTkRBUl9SRUNVUlJFTkNF5pWw5o2uXHJcblx0XHQvLyBcclxuXHRcdHRoaXMuX3VwZGF0ZURvY01vZGlmeURhdGUoZG9jKTtcclxuXHR9O1xyXG5cclxuXHQvLyDorr7nva7mlofmoaPlsZ7mgKflgLxcclxuXHRfc2V0UGFyYW1WYWx1ZShkb2MsIGtleSwgdmFsdWUpIHtcclxuXHRcdGlmICghZG9jKSByZXR1cm4gZmFsc2U7XHJcblx0XHRkb2MuU2V0UGFyYW1WYWx1ZShrZXksIHZhbHVlKTtcclxuXHR9O1xyXG5cclxuXHQvLyDmm7TmlrBXaXpEb2Pkv67mlLnml7bpl7RcclxuXHRfdXBkYXRlRG9jTW9kaWZ5RGF0ZShkb2Mpe1xyXG5cdFx0Y29uc3Qgbm93ID0gbmV3IERhdGUoKTtcclxuXHRcdGlmICghZG9jKSByZXR1cm4gZmFsc2U7XHJcblx0XHRub3cuc2V0U2Vjb25kcygobm93LmdldFNlY29uZHMoKSArIDEpICUgNjApO1xyXG5cdFx0ZG9jLkRhdGVNb2RpZmllZCA9IHRoaXMuX2Qycyhub3cpO1xyXG5cdH07XHJcblxyXG5cdC8vIOWwhuaXpeacn+Wvueixoei9rOWMluS4uuWtl+espuS4slxyXG5cdC8vVE9ETzog6ICD6JmR5L6d6LWWbW9tZW505p2l566A5YyW6L2s5o2i6L+H56iLXHJcblx0X2QycyhkdCl7XHJcblx0XHRjb25zdCByZXQgPSBkdC5nZXRGdWxsWWVhcigpICsgXCItXCIgKyBcclxuXHRcdFx0XHRcdGZvcm1hdEludFRvRGF0ZVN0cmluZyhkdC5nZXRNb250aCgpICsgMSkgKyBcIi1cIiArIFxyXG5cdFx0XHRcdFx0Zm9ybWF0SW50VG9EYXRlU3RyaW5nKGR0LmdldERhdGUoKSkgKyBcIiBcIiArIFxyXG5cdFx0XHRcdFx0Zm9ybWF0SW50VG9EYXRlU3RyaW5nKGR0LmdldEhvdXJzKCkpKyBcIjpcIiArIFxyXG5cdFx0XHRcdFx0Zm9ybWF0SW50VG9EYXRlU3RyaW5nKGR0LmdldE1pbnV0ZXMoKSkgKyBcIjpcIiArIFxyXG5cdFx0XHRcdFx0Zm9ybWF0SW50VG9EYXRlU3RyaW5nKGR0LmdldFNlY29uZHMoKSk7XHJcblx0XHRyZXR1cm4gcmV0O1xyXG5cdH07XHJcblxyXG5cdC8vIOaXpeWOhuaXtumXtOmHjee9ruaXtumXtOiMg+WbtOWQjuabtOaWsOaVsOaNrlxyXG5cdHVwZGF0ZUV2ZW50RGF0YU9uUmVzaXplKGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXcpe1xyXG5cdFx0Y29uc3QgYWxsRGF5ID0gZXZlbnQuc3RhcnQuaGFzVGltZSgpID8gZmFsc2UgOiB0cnVlO1xyXG5cdFx0Ly8g6I635b6X5LqL5Lu25paH5qGj5pe26Ze05pWw5o2uXHJcblx0XHRjb25zdCBkb2MgPSBvYmpEYXRhYmFzZS5Eb2N1bWVudEZyb21HVUlEKGV2ZW50LmlkKTtcclxuXHRcdC8vIOiuoeeul+abtOaUueWQjueahOe7k+adn+aXtumXtFxyXG5cdFx0Y29uc3QgZXZlbnRFbmRTdHIgPSBldmVudC5lbmQuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHQvLyDmm7TmlrDmlofmoaPmlbDmja5cclxuXHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX0VORFwiLCBldmVudEVuZFN0cik7XHJcblx0XHR0aGlzLl91cGRhdGVEb2NNb2RpZnlEYXRlKGRvYyk7XHJcblx0fTtcclxuXHJcblx0Ly8g5Yib5bu65LqL5Lu2IHN0YXJ0LCBlbmQsIGpzRXZlbnQsIHZpZXdcclxuXHQvKipcclxuICAgICAqIOWIm+W7uuS6i+S7ti5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gc2VsZWN0aW9uRGF0YSBGdWxsQ2FsZW5kYXIg5Lyg5YWl55qE5pWw5o2uLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBzZWxlY3Rpb25EYXRhLnN0YXJ0IE1vbWVudCDnsbvml6XmnJ/lr7nosaEuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IHNlbGVjdGlvbkRhdGEuZW5kIE1vbWVudCDnsbvml6XmnJ/lr7nosaEuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IHNlbGVjdGlvbkRhdGEuanNFdmVudCBuYXRpdmUgSmF2YVNjcmlwdCDkuovku7YuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IHNlbGVjdGlvbkRhdGEudmlldyBGdWxsQ2FsZW5kYXIg6KeG5Zu+5a+56LGhLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSB1c2VySW5wdXRzIOeUqOaIt+S8oOWFpeeahOWFtuS7luS/oeaBry5cclxuICAgICAqIFRPRE86IOivpeaWueazleWPr+S7peaUvue9ruWIsENhbGVuZGFyRXZlbnTnmoTpnZnmgIHmlrnms5XkuIpcclxuICAgICAqL1xyXG5cdGNyZWF0ZUV2ZW50KHNlbGVjdGlvbkRhdGEsIHVzZXJJbnB1dHMpe1xyXG5cdFx0Ly8g6I635Y+W55So5oi36K6+572uXHJcblx0XHRjb25zdCBuZXdFdmVudCA9IG5ldyBDYWxlbmRhckV2ZW50KHtcclxuXHRcdFx0dGl0bGU6IHVzZXJJbnB1dHMudGl0bGUgPyB1c2VySW5wdXRzLnRpdGxlIDogJ+aXoOagh+mimCcsXHJcblx0XHRcdHN0YXJ0OiBzZWxlY3Rpb25EYXRhLnN0YXJ0LFxyXG5cdFx0XHRlbmQ6IHNlbGVjdGlvbkRhdGEuZW5kLFxyXG5cdFx0XHRhbGxEYXk6IHNlbGVjdGlvbkRhdGEuc3RhcnQuaGFzVGltZSgpICYmIHNlbGVjdGlvbkRhdGEuZW5kLmhhc1RpbWUoKSA/IGZhbHNlIDogdHJ1ZSxcclxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiB1c2VySW5wdXRzLmNvbG9yID8gdXNlcklucHV0cy5jb2xvciA6ICcjMzJDRDMyJyxcclxuXHRcdH0pO1xyXG5cdFx0Ly8g5L+d5a2Y5bm25riy5p+T5LqL5Lu2XHJcblx0XHRuZXdFdmVudC5zYXZlVG9XaXpFdmVudERvYygpO1xyXG5cdFx0bmV3RXZlbnQucmVmZXRjaERhdGEoKTtcclxuXHRcdHJldHVybiBuZXdFdmVudDtcclxuXHR9XHJcblxyXG59XHJcblxyXG5cclxuLy8gVE9ETzog6YeN5YaZ6I635Y+W5pWw5o2u55qE5pa55byPXHJcbmZ1bmN0aW9uIF9nZXRXaXpFdmVudChzdGFydCwgZW5kKSB7XHJcblx0Ly9UT0RPOlxyXG5cdGxldCBldmVudHMgPSBbXTtcclxuXHRsZXQgRXZlbnRDb2xsZWN0aW9uID0gb2JqRGF0YWJhc2UuR2V0Q2FsZW5kYXJFdmVudHMyKHN0YXJ0LCBlbmQpO1xyXG5cdHJldHVybiBldmVudHNcclxufVxyXG5cclxuLy8g6I635b6X5riy5p+T5ZCO55qE6YeN5aSN5pel5pyfXHJcbmZ1bmN0aW9uIGdldFJlbmRlclJlcGVhdERheSgpe1xyXG5cdHZhciBkYXlBcnJheSA9IG5ldyBBcnJheSgpO1xyXG5cdHZhciBldmVudFN0YXJ0ID0gbmV3IERhdGUoX3MyZChnX2V2ZW50U3RhcnQpKTtcclxuXHRcdFxyXG5cdHN3aXRjaCAoZ19yZXBlYXRSdWxlKXtcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazFcIjpcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazJcIjpcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazNcIjpcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazRcIjpcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazVcIjpcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazZcIjpcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazdcIjpcclxuXHRcdFx0XHRnZXRXZWVrbHlSZXBlYXREYXkoZGF5QXJyYXksIFtnX3JlcGVhdFJ1bGUuY2hhckF0KDkpXSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2Vla2RheVwiOlxyXG5cdFx0XHRcdGdldFdlZWtseVJlcGVhdERheShkYXlBcnJheSwgWzEsIDIsIDMsIDQsIDVdKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnlXZWVrZGF5MTM1XCI6XHJcblx0XHRcdFx0Z2V0V2Vla2x5UmVwZWF0RGF5KGRheUFycmF5LCBbMSwgMywgNV0pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnlXZWVrZGF5MjRcIjpcclxuXHRcdFx0XHRnZXRXZWVrbHlSZXBlYXREYXkoZGF5QXJyYXksIFsyLCA0XSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJFdmVyeVdlZWtkYXk2N1wiOlxyXG5cdFx0XHRcdGdldFdlZWtseVJlcGVhdERheShkYXlBcnJheSwgWzYsIDddKTtcclxuXHRcdFx0XHRicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkRhaWx5XCI6XHJcblx0XHRcdFx0Z2V0V2Vla2x5UmVwZWF0RGF5KGRheUFycmF5LCBbMSwgMiwgMywgNCwgNSwgNiwgN10pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiV2Vla2x5XCI6Ly8g5q+P5ZGoXHJcblx0XHRcdFx0Z2V0V2Vla2x5UmVwZWF0RGF5KGRheUFycmF5LCBbZXZlbnRTdGFydC5nZXREYXkoKV0pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnkyV2Vla3NcIjpcclxuXHRcdFx0XHRnZXRXZWVrbHlSZXBlYXREYXkoZGF5QXJyYXksIFtldmVudFN0YXJ0LmdldERheSgpXSk7XHJcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkYXlBcnJheS5sZW5ndGg7ICsrIGkpe1xyXG5cdFx0XHRcdFx0dmFyIGludGVyID0gX2ludGVyRGF5cyhfZDJzKGV2ZW50U3RhcnQpLCBfZDJzKGRheUFycmF5W2ldWzBdKSk7XHJcblx0XHRcdFx0XHRpZiAoKHBhcnNlRmxvYXQoKGludGVyLTEpLzcuMCkgJSAyKSAhPSAwICl7XHJcblx0XHRcdFx0XHRcdGRheUFycmF5LnNwbGljZShpLCAxKTtcclxuXHRcdFx0XHRcdFx0aSAtLTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJNb250aGx5XCI6XHJcblx0XHRcdFx0Z2V0TW9udGhseVJlcGVhdERheShkYXlBcnJheSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJZZWFybHlcIjpcclxuXHRcdFx0XHRnZXRZZWFybHlSZXBlYXREYXkoZGF5QXJyYXkpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHQvLyBUT0RPOiDmsYnlrZfpnIDopoHogIPomZFcclxuICAgICAgICAgICAgY2FzZSBcIkNoaW5lc2VNb250aGx5XCI6XHJcbiAgICAgICAgICAgICAgICBnZXRDaGluZXNlUmVwZWF0RGF5KGRheUFycmF5LCAn5pyIJyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJDaGluZXNlWWVhcmx5XCI6XHJcbiAgICAgICAgICAgICAgICBnZXRDaGluZXNlUmVwZWF0RGF5KGRheUFycmF5LCAn5Y6GJyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGRlZmF1bHQ6e1xyXG5cdFx0XHRcdGlmIChnX3JlcGVhdFJ1bGUuaW5kZXhPZihcIkV2ZXJ5V2Vla1wiKSA9PSAwKXtcclxuXHRcdFx0XHRcdHZhciBkYXlzID0gZ19yZXBlYXRSdWxlLnN1YnN0cihcIkV2ZXJ5V2Vla1wiLmxlbmd0aCkuc3BsaXQoJycpO1xyXG5cdFx0XHRcdFx0Z2V0V2Vla2x5UmVwZWF0RGF5KGRheUFycmF5LCBkYXlzKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcblx0cmV0dXJuIGRheUFycmF5O1xyXG59XHJcblxyXG5cclxuLyog5pWw5o2u6I635Y+WXHJcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuXHJcbi8qIOadgumhueWSjOW3peWFt1xyXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcbi8vIOWIpOaWreWGheaguFxyXG5mdW5jdGlvbiBpc0Nocm9tZSgpIHtcclxuXHRpZiAoZ19pc0Nocm9tZSkgcmV0dXJuIGdfaXNDaHJvbWU7XHJcblx0Ly9cclxuXHR2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7XHJcblx0Z19pc0Nocm9tZSA9IHVhLmluZGV4T2YoJ2Nocm9tZScpICE9IC0xO1xyXG5cdC8vXHJcblx0cmV0dXJuIGdfaXNDaHJvbWU7XHJcbn1cclxuXHJcbi8vIOWwhuaVtOaVsOi9rOaNouaIkOaXpeacn+Wtl+espuS4slxyXG5mdW5jdGlvbiBmb3JtYXRJbnRUb0RhdGVTdHJpbmcobil7XHJcblx0XHRcclxuXHRyZXR1cm4gbiA8IDEwID8gJzAnICsgbiA6IG47XHJcbn1cclxuXHJcbi8vIOajgOafpeWPiuWinuWKoOaVsOWAvOWtl+espuS4sumVv+W6pu+8jOS+i+Wmgu+8micyJyAtPiAnMDInXHJcbmZ1bmN0aW9uIGNoZWNrQW5kQWRkU3RyTGVuZ3RoKHN0cikge1xyXG5cdGlmIChzdHIubGVuZ3RoIDwgMikge1xyXG5cdFx0cmV0dXJuICcwJyArIHN0cjtcclxuXHR9IGVsc2Uge1xyXG5cdFx0cmV0dXJuIHN0cjtcclxuXHR9XHJcbn1cclxuXHJcbi8vIOWwhuWtl+espuS4sui9rOWMluS4uuaXpeacn+WvueixoVxyXG5mdW5jdGlvbiBfczJkKHN0cil7XHJcblx0aWYgKCFzdHIpXHJcblx0XHRyZXR1cm4gJyc7XHJcblx0dmFyIGRhdGUgPSBuZXcgRGF0ZShzdHIuc3Vic3RyKDAsIDQpLFxyXG5cdFx0XHRcdFx0c3RyLnN1YnN0cig1LCAyKSAtIDEsXHJcblx0XHRcdFx0XHRzdHIuc3Vic3RyKDgsIDMpLFxyXG5cdFx0XHRcdFx0c3RyLnN1YnN0cigxMSwgMiksXHJcblx0XHRcdFx0XHRzdHIuc3Vic3RyKDE0LCAyKSxcclxuXHRcdFx0XHRcdHN0ci5zdWJzdHIoMTcsIDIpXHJcblx0XHRcdFx0XHQpO1x0XHRcclxuXHRyZXR1cm4gZGF0ZTtcclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBjb2xvckNvdW50OiAxMixcclxuICAgIGNvbG9ySXRlbXM6IFtcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiMzMkNEMzJcIiwgXCJjb2xvck5hbWVcIjogJ+aphOamhOe7vycgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiM1NDg0RURcIiwgXCJjb2xvck5hbWVcIjogJ+Wuneefs+iTnScgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNBNEJERkVcIiwgXCJjb2xvck5hbWVcIjogJ+iTneiJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiM0NkQ2REJcIiwgXCJjb2xvck5hbWVcIjogJ+mdkue7v+iJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiM3QUU3QkZcIiwgXCJjb2xvck5hbWVcIjogJ+e7v+iJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiM1MUI3NDlcIiwgXCJjb2xvck5hbWVcIjogJ+a4heaWsOe7vycgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNGQkQ3NUJcIiwgXCJjb2xvck5hbWVcIjogJ+m7hOiJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNGRkI4NzhcIiwgXCJjb2xvck5hbWVcIjogJ+apmOiJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNGRjg4N0NcIiwgXCJjb2xvck5hbWVcIjogJ+e6ouiJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNEQzIxMjdcIiwgXCJjb2xvck5hbWVcIjogJ+WlouWNjue6oicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNEQkFERkZcIiwgXCJjb2xvck5hbWVcIjogJ+e0q+iJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNFMUUxRTFcIiwgXCJjb2xvck5hbWVcIjogJ+eBsOiJsicgfVxyXG4gICAgXSxcclxuXHJcbn0iLCIvL1RPRE86IOWIpOaWrXdpbmRvdy5leHRlcm5hbOaYr+WQpuS4uldpekh0bWxFZGl0b3JBcHBcclxuY29uc3QgV2l6RXhwbG9yZXJBcHAgPSB3aW5kb3cuZXh0ZXJuYWw7XHJcbmNvbnN0IFdpekV4cGxvcmVyV2luZG93ID0gV2l6RXhwbG9yZXJBcHAuV2luZG93O1xyXG5jb25zdCBXaXpEYXRhYmFzZSA9IFdpekV4cGxvcmVyQXBwLkRhdGFiYXNlO1xyXG5jb25zdCBXaXpDb21tb25VSSA9IFdpekV4cGxvcmVyQXBwLkNyZWF0ZVdpek9iamVjdChcIldpektNQ29udHJvbHMuV2l6Q29tbW9uVUlcIik7XHJcblxyXG5mdW5jdGlvbiBXaXpDb25maXJtKG1zZywgdGl0bGUpIHtcclxuICAgIHJldHVybiBXaXpFeHBsb3JlcldpbmRvdy5TaG93TWVzc2FnZShtc2csIHRpdGxlLCAweDAwMDAwMDIwIHwgMHgwMDAwMDAwMSkgPT0gMTtcclxufVxyXG5cclxuZnVuY3Rpb24gV2l6QWxlcnQobXNnKSB7XHJcbiAgICBXaXpFeHBsb3JlcldpbmRvdy5TaG93TWVzc2FnZShtc2csIFwie3B9XCIsIDB4MDAwMDAwNDApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBXaXpCdWJibGVNZXNzYWdlKHRpdGxlLCBtc2csIGNvbG9yID0gJyNGRkZBOUQnLCBkZWxheSA9ICczJykge1xyXG4gICAgY29uc3QgYXBwUGF0aCA9IFdpekNvbW1vblVJLkdldFNwZWNpYWxGb2xkZXIoXCJBcHBQYXRoXCIpO1xyXG4gICAgLy9cclxuICAgIGNvbnN0IHdpelNoZWxsRmlsZU5hbWUgPSBhcHBQYXRoICsgXCJXaXouZXhlXCI7XHJcbiAgICBjb25zdCBkbGxGaWxlTmFtZSA9IGFwcFBhdGggKyBcIldpelRvb2xzLmRsbFwiO1xyXG4gICAgLy9cclxuICAgIGNvbnN0IHBhcmFtcyA9IGBcIiR7ZGxsRmlsZU5hbWV9XCIgV2l6VG9vbHNTaG93QnViYmxlV2luZG93MkV4IC9UaXRsZT0ke3RpdGxlfSAvTGlua1RleHQ9JHttc2d9IC9MaW5rVVJMPUAgL0NvbG9yPSR7Y29sb3J9IC9EZWxheT0ke2RlbGF5fWA7XHJcbiAgICAvL1xyXG4gICAgV2l6Q29tbW9uVUkuUnVuRXhlKHdpelNoZWxsRmlsZU5hbWUsIHBhcmFtcywgZmFsc2UpO1xyXG59XHJcblxyXG5jbGFzcyBXaXpTaGVsbCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZGxsRmlsZU5hbWUsIGRsbEV4cG9ydEZ1bmMsIHBhcmFtcykge1xyXG4gICAgICAgIC8v5L2/55SoZGxs5a+85Ye65Ye95pWw77yM5aSn6YOo5YiG5YWl5Y+C5pe25ZG95Luk6KGM5pa55byP77yM5YW35L2T5Y+C5pWw5rKh5pyJ6K+05piO77yM5pyJ6ZyA6KaB6IGU57O75byA5Y+R5Lq65ZGYXHJcbiAgICAgICAgY29uc3QgYXBwUGF0aCA9IFdpekNvbW1vblVJLkdldFNwZWNpYWxGb2xkZXIoXCJBcHBQYXRoXCIpO1xyXG4gICAgICAgIHRoaXMuYXBwUGF0aCA9IGFwcFBhdGhcclxuICAgICAgICB0aGlzLndpekV4ZSA9IGFwcFBhdGggKyBcIldpei5leGVcIjtcclxuICAgICAgICB0aGlzLmRsbEZpbGVOYW1lID0gZGxsRmlsZU5hbWUgPyBhcHBQYXRoICsgZGxsRmlsZU5hbWUgOiBhcHBQYXRoICsgJ1dpektNQ29udHJvbHMuZGxsJztcclxuICAgICAgICB0aGlzLmRsbEV4cG9ydEZ1bmMgPSBkbGxFeHBvcnRGdW5jIHx8ICdXaXpLTVJ1blNjcmlwdCc7XHJcbiAgICAgICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7XHJcbiAgICB9XHJcblxyXG4gICAgcnVuU2NyaXB0RmlsZShzY3JpcHRGaWxlTmFtZSwgc2NyaXB0UGFyYW1zKSB7XHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0gYFwiJHt0aGlzLmFwcFBhdGggKyAnV2l6S01Db250cm9scy5kbGwnfVwiIFdpektNUnVuU2NyaXB0IC9TY3JpcHRGaWxlTmFtZT0ke3NjcmlwdEZpbGVOYW1lfSAke3NjcmlwdFBhcmFtc31gO1xyXG4gICAgICAgIFdpekNvbW1vblVJLlJ1bkV4ZSh0aGlzLndpekV4ZSwgcGFyYW1zLCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgd2l6QnViYmxlTWVzc2FnZSh0aXRsZSwgbXNnLCBjb2xvciA9ICcjRkZGQTlEJywgZGVsYXkgPSAnMycpIHtcclxuICAgICAgICBXaXpCdWJibGVNZXNzYWdlKHRpdGxlLCBtc2csIGNvbG9yLCBkZWxheSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldFdpekludGVyZmFjZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBXaXpFeHBsb3JlckFwcCwgV2l6RXhwbG9yZXJXaW5kb3csIFdpekRhdGFiYXNlLCBXaXpDb21tb25VSVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgXHJcbiAgICBXaXpFeHBsb3JlckFwcCwgXHJcbiAgICBXaXpFeHBsb3JlcldpbmRvdywgXHJcbiAgICBXaXpEYXRhYmFzZSwgXHJcbiAgICBXaXpDb21tb25VSSwgXHJcbiAgICBXaXpDb25maXJtLCBcclxuICAgIFdpekFsZXJ0LCBcclxuICAgIFdpekJ1YmJsZU1lc3NhZ2UsIFxyXG4gICAgV2l6U2hlbGwgXHJcbn07XHJcbiIsImZ1bmN0aW9uIHJnYjJoc2wociwgZywgYikge1xyXG4gICAgciAvPSAyNTU7IGcgLz0gMjU1OyBiIC89IDI1NTtcclxuXHJcbiAgICB2YXIgTSA9IE1hdGgubWF4KHIsIGcsIGIpO1xyXG4gICAgdmFyIG0gPSBNYXRoLm1pbihyLCBnLCBiKTtcclxuICAgIHZhciBDID0gTSAtIG07XHJcbiAgICB2YXIgTCA9IDAuNSooTSArIG0pO1xyXG4gICAgdmFyIFMgPSAoQyA9PT0gMCkgPyAwIDogQy8oMS1NYXRoLmFicygyKkwtMSkpO1xyXG5cclxuICAgIHZhciBoO1xyXG4gICAgaWYgKEMgPT09IDApIGggPSAwOyAvLyBzcGVjJ2QgYXMgdW5kZWZpbmVkLCBidXQgdXN1YWxseSBzZXQgdG8gMFxyXG4gICAgZWxzZSBpZiAoTSA9PT0gcikgaCA9ICgoZy1iKS9DKSAlIDY7XHJcbiAgICBlbHNlIGlmIChNID09PSBnKSBoID0gKChiLXIpL0MpICsgMjtcclxuICAgIGVsc2UgaWYgKE0gPT09IGIpIGggPSAoKHItZykvQykgKyA0O1xyXG5cclxuICAgIHZhciBIID0gNjAgKiBoO1xyXG5cclxuICAgIC8vIOWIhuWIq+aYr2h1ZSwgc2F0LCBsdW1cclxuICAgIHJldHVybiBbSCwgcGFyc2VGbG9hdChTKSwgcGFyc2VGbG9hdChMKV07XHJcbn1cclxuXHJcbmV4cG9ydCB7IHJnYjJoc2wgfSJdLCJzb3VyY2VSb290IjoiIn0=