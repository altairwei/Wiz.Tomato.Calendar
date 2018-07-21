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
/******/ 	var hotCurrentHash = "02c4e99959daa72337d9"; // eslint-disable-line no-unused-vars
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
                backgroundColor = eventData.backgroundColor,
                rptRule = eventData.rptRule;

            var moment = this.fullCalendar.moment.bind(this.fullCalendar);
            // 处理日程数据
            start = moment(start), end = moment(end);
            allDay = !(start.hasTime() && end.hasTime());
            // 新建日程
            var newEvent = new _CalendarEvent2.default({
                title: title || '无标题',
                backgroundColor: backgroundColor || '#32CD32',
                start: start, end: end, allDay: allDay, rptRule: rptRule
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

var _RepeatRuleSelectGroup = __webpack_require__(/*! ./RepeatRuleSelectGroup */ "./src/components/Form/RepeatRuleSelectGroup.js");

var _RepeatRuleSelectGroup2 = _interopRequireDefault(_RepeatRuleSelectGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function EventRepeatForm(props) {

    return _react2.default.createElement(
        _reactBootstrap.Form,
        { horizontal: true },
        _react2.default.createElement(_RepeatRuleSelectGroup2.default, { horizontal: true,
            label: '\u91CD\u590D\u89C4\u5219',
            rptRule: props.rptRule,
            onRptRuleChange: props.onRptRuleChange
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
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(/*! react-bootstrap */ "./node_modules/_react-bootstrap@0.32.1@react-bootstrap/es/index.js");

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

        var rptRuleComps = _this.splitRptRule(_this.props.rptRule);
        _this.state = {
            rptRule: _this.props.rptRule,
            rptBaseRule: '',
            rptWeekdays: [],
            disableWeekdaySelect: true,
            disabledOptions: []
        };
        $.extend(_this.state, rptRuleComps);
        //
        _this.handleRptBaseRuleChange = _this.handleRptBaseRuleChange.bind(_this);
        _this.handleWeekdayChange = _this.handleWeekdayChange.bind(_this);
        return _this;
    }

    _createClass(EventRepeatForm, [{
        key: 'splitRptRule',
        value: function splitRptRule(rptRule) {
            var regex = void 0,
                rptRuleComps = void 0;
            if ((regex = /^Every(\d)?Weeks?(\d*)$/).test(rptRule)) {
                // 每[1234]周[7123456]
                var results = regex.exec(rptRule);
                var interWeek = results[1];
                var weekdays = results[2].split('');
                rptRuleComps = {
                    rptBaseRule: 'Every' + interWeek + 'Week',
                    rptWeekdays: weekdays,
                    disableWeekdaySelect: false
                };
            } else if ((regex = /^EveryWeekday(\d*)$/).test(rptRule)) {
                // 每个工作日EveryWeekday135
                var _results = regex.exec(rptRule);
                var _weekdays = _results[1] || '12345';
                rptRuleComps = {
                    rptBaseRule: 'EveryWeekday',
                    rptWeekdays: _weekdays,
                    disableWeekdaySelect: false,
                    disabledOptions: [6, 7]
                };
            } else if ((regex = /Daily|Weekly|Monthly|Yearly/).test(rptRule)) {
                // Daily|Weekly|Monthly|Yearly
                var perRule = regex.exec(rptRule)[0];
                rptRuleComps = {
                    rptBaseRule: perRule,
                    rptWeekdays: [],
                    disableWeekdaySelect: true
                };
            } else {
                rptRuleComps = {
                    rptBaseRule: 'none',
                    rptWeekdays: [],
                    disableWeekdaySelect: true
                };
            }

            return rptRuleComps;
        }
    }, {
        key: 'handleRptBaseRuleChange',
        value: function handleRptBaseRuleChange(newSelection) {
            switch (newSelection) {
                case 'EveryWeek':
                case 'Every2Week':
                    this.setState({
                        rptBaseRule: newSelection,
                        disableWeekdaySelect: false,
                        disabledOptions: []
                    });
                    break;
                case 'EveryWeekday':
                    this.setState({
                        rptBaseRule: newSelection,
                        disableWeekdaySelect: false,
                        disabledOptions: [6, 7]
                    });
                    break;
                default:
                    this.setState({
                        rptBaseRule: newSelection,
                        disableWeekdaySelect: true
                    });
                    break;
            }
            var newRptRule = newSelection;
            this.props.onRptRuleChange(newRptRule);
        }
    }, {
        key: 'handleWeekdayChange',
        value: function handleWeekdayChange(newSelection) {
            this.setState({
                rptWeekdays: newSelection
            });
            var newRptRule = this.state.rptBaseRule + newSelection.join('');
            this.props.onRptRuleChange(newRptRule);
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
                                value: this.state.rptBaseRule,
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
                                    '\u6BCF\u4E00\u4E2A\u661F\u671F'
                                ),
                                _react2.default.createElement(
                                    'option',
                                    { value: 'Every2Week' },
                                    '\u6BCF\u4E24\u4E2A\u661F\u671F'
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
                                title: '\u9009\u62E9\u91CD\u590D\u7684\u661F\u671F',
                                width: '80%',
                                value: this.state.rptWeekdays,
                                disabled: this.state.disableWeekdaySelect,
                                disabledOptions: this.state.disabledOptions,
                                onSelectionChange: this.handleWeekdayChange
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

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
            // 触发组件周期
            var newSelection = this.instance.val();
            this.setState({
                value: newSelection
            });
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
                disabled = _props.disabled,
                _props$disabledOption = _props.disabledOptions,
                disabledOptions = _props$disabledOption === undefined ? [] : _props$disabledOption;
            // 初始化组件

            this.$el = $(this.el);
            this.$el.prop('title', title);
            this.$el.prop('multiple', multiple);
            this.$el.prop('disabled', disabled);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = disabledOptions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var day = _step.value;

                    this.$el.find('option[value=\'' + day + '\']').prop('disabled', true);
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

            this.$el.selectpicker({
                style: 'btn-default',
                width: width
            });
            // 获取插件实例
            this.instance = this.$el.data('selectpicker');
            // 设置初始值
            this.instance.val(this.props.value);
            // 绑定change事件
            this.$el.on("changed.bs.select", this.handleChange);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState, snapshot) {
            var _props2 = this.props,
                disabled = _props2.disabled,
                _props2$disabledOptio = _props2.disabledOptions,
                disabledOptions = _props2$disabledOptio === undefined ? [] : _props2$disabledOptio;
            // 禁用插件

            this.$el.prop('disabled', disabled);
            if (disabled) this.$el.val('');
            // 禁用选项
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = disabledOptions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var day = _step2.value;

                    this.$el.find('option[value=\'' + day + '\']').prop('disabled', true);
                }
                // 更新组件
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

            this.instance.refresh();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
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
            backgroundColor: '',
            rptRule: 'none'
            //
        };_this.handleTitleChange = _this.handleTitleChange.bind(_this);
        _this.handleStartChange = _this.handleStartChange.bind(_this);
        _this.handleEndChange = _this.handleEndChange.bind(_this);
        _this.handleColorChange = _this.handleColorChange.bind(_this);
        _this.handleEventCreate = _this.handleEventCreate.bind(_this);
        //
        _this.handleRptRuleChange = _this.handleRptRuleChange.bind(_this);
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
        key: 'handleRptRuleChange',
        value: function handleRptRuleChange(newRptRule) {
            this.setState({
                rptRule: newRptRule
            });
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
                            rptRule: 'none',
                            onRptRuleChange: this.handleRptRuleChange
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
        _this2.handleRptRuleChange = _this2.handleRptRuleChange.bind(_this2);
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
        key: 'handleRptRuleChange',
        value: function handleRptRuleChange(newRptRule) {
            this.setState(function (prevState, props) {
                var newEventData = $.extend({}, prevState.newEventData);
                newEventData.rptRule = newRptRule;
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
                        _react2.default.createElement(_EventRepeatForm2.default, {
                            rptRule: event.rptRule,
                            onRptRuleChange: this.handleRptRuleChange
                        })
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
			this.rptRule = rptRule || 'none';
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
			console.log(rptRule);
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
			// 保存全部数据包括Title
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQ2FsZW5kYXIvQ2FsZW5kYXIuY3NzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0V2ZW50UG9wb3Zlci9FdmVudFBvcG92ZXIuY3NzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0V2ZW50UG9wb3Zlci9Qb3BvdmVyVGl0bGVJbnB1dC5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZSBzeW5jIF5cXC5cXC8uKiQiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9DYWxlbmRhci9DYWxlbmRhci5jc3M/Y2ExNCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9DYWxlbmRhci9DYWxlbmRhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9DYWxlbmRhci9GdWxsQ2FsZW5kYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRXZlbnRQb3BvdmVyL0V2ZW50UG9wb3Zlci5jc3M/NTg1ZiIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9FdmVudFBvcG92ZXIvRXZlbnRQb3BvdmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0V2ZW50UG9wb3Zlci9Qb3BvdmVyVGl0bGVJbnB1dC5jc3M/M2UzNiIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9FdmVudFBvcG92ZXIvUG9wb3ZlclRpdGxlSW5wdXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRXZlbnRQb3BvdmVyL1BvcG92ZXJUb29sYmFyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0Zvcm0vQXV0b0Zvcm1Hcm91cC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Gb3JtL0NvbG9yUGlja2VyR3JvdXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRm9ybS9EYXRlVGltZVBpY2tlckdyb3VwLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0Zvcm0vRXZlbnREZXRhaWxGb3JtLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0Zvcm0vRXZlbnRSZXBlYXRGb3JtLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0Zvcm0vUmVwZWF0UnVsZVNlbGVjdEdyb3VwLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0Zvcm0vU2VsZWN0UGlja2VyR3JvdXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRm9ybS9UaXRsZUlucHV0R3JvdXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvTW9kYWwvRXZlbnRDcmVhdGVNb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Nb2RhbC9FdmVudEVkaXRNb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Nb2RhbC9FdmVudE1vZGFsLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5jc3M/ZDhjMyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVscy9DYWxlbmRhckV2ZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9tb2RlbHMvV2l6RXZlbnREYXRhTG9hZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9Db25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL1dpekludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvdXRpbHMuanMiXSwibmFtZXMiOlsiQXBwIiwicHJvcHMiLCJkYXRhTG9hZGVyIiwiV2l6RXZlbnREYXRhTG9hZGVyIiwic3RhdGUiLCJpc1Nob3dpbmdFdmVudCIsImlzRWRpdGluZ0V2ZW50IiwiaXNDcmVhdGluZ0V2ZW50IiwiY2xpY2tlZEFyZ3MiLCJlZGl0aW5nRXZlbnQiLCJzZWxlY3RlZFJhbmdlIiwiaGFuZGxlQ2FsZW5kYXJSZW5kZXIiLCJiaW5kIiwiaGFuZGxlRXZlbnRDbGljayIsImhhbmRsZVZpZXdSZW5kZXIiLCJoYW5kbGVFdmVudERyb3AiLCJoYW5kbGVFdmVudFJlc2l6ZSIsImhhbmRsZUV2ZW50UmVuZGVyIiwiaGFuZGxlUG9wb3ZlckhpZGUiLCJoYW5kbGVEYXRlU2VsZWN0IiwiaGFuZGxlTW9kYWxDbG9zZSIsImhhbmRsZUV2ZW50Q3JlYXRlIiwiaGFuZGxlRXZlbnRTYXZlIiwiaGFuZGxlRXZlbnRFZGl0IiwiaGFuZGxlRXZlbnRDb21wbGV0ZSIsImhhbmRsZUV2ZW50RGVsZXRlRGF0YSIsImhhbmRsZUV2ZW50RGVsZXRlRG9jIiwiaGFuZGxlRXZlbnRPcGVuRG9jIiwiaGFuZGxlRXZlbnRFZGl0T3JpZ2luRGF0YSIsImVsIiwiY2FsZW5kYXIiLCJldmVudCIsImpzRXZlbnQiLCJ2aWV3IiwiYXJncyIsInNldFN0YXRlIiwiZWxlbWVudCIsIiRjYWxlbmRhciIsIiQiLCJldmVudFNvdXJjZXMiLCJnZXRFdmVudFNvdXJjZXMiLCJmdWxsQ2FsZW5kYXIiLCJpIiwibGVuZ3RoIiwiZGVsdGEiLCJyZXZlcnRGdW5jIiwidWkiLCJpZCIsInVwZGF0ZUV2ZW50RGF0YU9uRHJvcCIsInVwZGF0ZUV2ZW50RGF0YU9uUmVzaXplIiwiZXZlbnRPYmoiLCIkZWwiLCJyZ2JTdHJpbmciLCJjc3MiLCJyZ2JBcnJheSIsImV4ZWMiLCJoc2wiLCJsaWdodG5lc3MiLCJNYXRoIiwiY29zIiwiUEkiLCJ0ZXh0Q29sb3IiLCJpc0NvbXBsZXRlIiwicGFyc2VJbnQiLCJjb21wbGV0ZSIsImFkZENsYXNzIiwic3RhcnQiLCJlbmQiLCJldmVudERhdGEiLCJhbGxEYXkiLCJ0aXRsZSIsImJhY2tncm91bmRDb2xvciIsInJwdFJ1bGUiLCJtb21lbnQiLCJoYXNUaW1lIiwibmV3RXZlbnQiLCJDYWxlbmRhckV2ZW50Iiwic2F2ZVRvV2l6RXZlbnREb2MiLCJldmVudHMiLCJ0b0Z1bGxDYWxlbmRhckV2ZW50IiwibmV3RXZlbnREYXRhIiwicHJvcCIsImRlbGV0ZUV2ZW50RGF0YSIsImRvYyIsIm9iakRhdGFiYXNlIiwiRG9jdW1lbnRGcm9tR1VJRCIsIm9ialdpbmRvdyIsIlZpZXdEb2N1bWVudCIsIm9iakNvbW1vbiIsIkVkaXRDYWxlbmRhckV2ZW50IiwicGFnZVgiLCJ0YXJnZXQiLCJSZWFjdCIsIkNvbXBvbmVudCIsIkNhbGVuZGFyIiwiaGFuZGxlRnVsbENhbGVuZGFyUmVuZGVyIiwib25DYWxlbmRhclJlbmRlciIsImxlZnQiLCJjZW50ZXIiLCJyaWdodCIsInRvZGF5IiwibW9udGgiLCJ3ZWVrIiwiZGF5IiwibGlzdCIsImFnZW5kYSIsIm1pblRpbWUiLCJzbG90TGFiZWxGb3JtYXQiLCJvblNlbGVjdCIsIm9uVmlld1JlbmRlciIsIm9uRXZlbnRSZW5kZXIiLCJvbkV2ZW50Q2xpY2siLCJvbkV2ZW50RHJvcCIsIm9uRXZlbnRSZXNpemUiLCJGdWxsY2FsZW5kYXJPYmplY3RNYXBwZXIiLCJwcm9wZXJ0aWVzIiwibmV3U2V0dGluZ3MiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsIkZ1bGxDYWxlbmRhciIsImpxIiwibm9Db25mbGljdCIsImZ1bGxjYWxlbmRhck9iamVjdE1hcHBlciIsImluc3RhbmNlIiwiZGF0ZSIsIkRhdGUiLCJvbkZ1bGxDYWxlbmRhclJlbmRlciIsIm9iamVjdE1hcHBlclNldHRpbmdzIiwiZ2V0U2V0dGluZ3MiLCJFdmVudFBvcG92ZXIiLCJwb3BwZXJOb2RlIiwicG9wcGVySW5zdGFuY2UiLCJhdXRvSGlkZSIsImhhbmRsZURhdGVUaW1lQ2hhbmdlIiwiaGFuZGxlVGl0bGVDaGFuZ2UiLCJoYW5kbGVDb2xvckNoYW5nZSIsImhhbmRsZUJ0bkNsaWNrIiwiZSIsInJlZmVyZW5jZSIsImlzIiwiaGFzIiwiaGlkZSIsInRoYXQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9uUG9wb3ZlckhpZGUiLCJmYWRlSW4iLCJuZXdUaXRsZSIsInZhbHVlIiwicHJldlN0YXRlIiwiZXh0ZW5kIiwiY29sb3JWYWx1ZSIsIm5ld0NvbG9yIiwiYnRuVHlwZSIsInNwbGl0IiwiaGFuZGxlTmFtZSIsInRoZW4iLCJyZXQiLCJQb3BwZXIiLCJwbGFjZW1lbnQiLCJtb2RpZmllcnMiLCJhcnJvdyIsImRvY3VtZW50Iiwib2ZmIiwib24iLCJzaG93IiwicHJldlByb3BzIiwic25hcHNob3QiLCJuZXh0UHJvcHMiLCJuZXh0U3RhdGUiLCJ1cGRhdGUiLCJkZXN0cm95IiwiZXZlbnRTdGFydCIsImZvcm1hdCIsImVuYWJsZVNhdmVCdG4iLCJkaXNwbGF5IiwiZGl2IiwiRXZlbnRUaXRsZUlucHV0IiwiZXZlbnRUaXRsZSIsImhhbmRsZUNoYW5nZSIsIm9uVGl0bGVDaGFuZ2UiLCJ0YXJnZXRGb3JtIiwiUG9wb3ZlclRvb2xiYXIiLCJvbkJ0bkNsaWNrIiwiQXV0b0Zvcm1Hcm91cCIsImlzSG9yaXpvbnRhbCIsImhvcml6b250YWwiLCJjb250cm9sSWQiLCJDb250cm9sTGFiZWwiLCJsYWJlbCIsImNoaWxkcmVuIiwiSHVlYmVlIiwicmVxdWlyZSIsIkNvbG9ySW5wdXQiLCJqc0V2ZW50T3JWYWx1ZSIsIm5ld0NvbG9yVmFsdWUiLCJvbkNvbG9yQ2hhbmdlIiwiaHVlYmVlSW5zdGFuY2UiLCJzdGF0aWNPcGVuIiwic2V0VGV4dCIsInNldEJHQ29sb3IiLCJodWVzIiwiaHVlMCIsInNoYWRlcyIsInNhdHVyYXRpb25zIiwibm90YXRpb24iLCJjbGFzc05hbWUiLCJjdXN0b21Db2xvcnMiLCJzZXRDb2xvciIsIkNvbG9yUGlja2VyR3JvdXAiLCJEYXRlVGltZUlucHV0IiwibmV3RGF0ZVZhbHVlIiwib25EYXRlVGltZUNoYW5nZSIsInJlYWRPbmx5IiwiZGF0ZXRpbWVwaWNrZXIiLCJzaG93VG9kYXlCdXR0b24iLCJsb2NhbGUiLCJkYXRhIiwiRGF0ZVRpbWVQaWNrZXJHcm91cCIsIkV2ZW50RGV0YWlsRm9ybSIsImhhbmRsZVN0YXJ0Q2hhbmdlIiwib25TdGFydENoYW5nZSIsImhhbmRsZUVuZENoYW5nZSIsIm9uRW5kQ2hhbmdlIiwib25Db2xvcmNoYW5nZSIsIkV2ZW50UmVwZWF0Rm9ybSIsIm9uUnB0UnVsZUNoYW5nZSIsInJwdFJ1bGVDb21wcyIsInNwbGl0UnB0UnVsZSIsInJwdEJhc2VSdWxlIiwicnB0V2Vla2RheXMiLCJkaXNhYmxlV2Vla2RheVNlbGVjdCIsImRpc2FibGVkT3B0aW9ucyIsImhhbmRsZVJwdEJhc2VSdWxlQ2hhbmdlIiwiaGFuZGxlV2Vla2RheUNoYW5nZSIsInJlZ2V4IiwidGVzdCIsInJlc3VsdHMiLCJpbnRlcldlZWsiLCJ3ZWVrZGF5cyIsInBlclJ1bGUiLCJuZXdTZWxlY3Rpb24iLCJuZXdScHRSdWxlIiwiam9pbiIsIlNlbGVjdFBpY2tlckdyb3VwIiwiU2VsZWN0UGlja2VyIiwiY2xpY2tlZEluZGV4IiwibmV3VmFsdWUiLCJvbGRWYWx1ZSIsInZhbCIsIm9uU2VsZWN0aW9uQ2hhbmdlIiwid2lkdGgiLCJtdWx0aXBsZSIsImRpc2FibGVkIiwiZmluZCIsInNlbGVjdHBpY2tlciIsInN0eWxlIiwicmVmcmVzaCIsIlRpdGxlSW5wdXRHcm91cCIsImF1dG9Gb2N1cyIsIkV2ZW50Q3JlYXRlTW9kYWwiLCJoYW5kbGVScHRSdWxlQ2hhbmdlIiwib25FdmVudENyZWF0ZSIsIm9uTW9kYWxDbG9zZSIsIk1vZGFsVG9vbGJhciIsInRleHRBbGlnbiIsIkV2ZW50RWRpdE1vZGFsIiwiaXNFbXB0eU9iamVjdCIsIk5hdkhlYWRlciIsImJvcmRlckJvdHRvbSIsInBhZGRpbmciLCJUYWJCb2R5IiwiVG9vbGJhckZvb3RlciIsIkV2ZW50TW9kYWwiLCJDaGlsZHJlbiIsImZvckVhY2giLCJ0aGlzQXJnIiwibmFtZSIsInR5cGUiLCJSZWFjdERPTSIsInJlbmRlciIsImdldEVsZW1lbnRCeUlkIiwiZ19kYiIsIkVycm9yIiwiX2NoZWNrRGF0YVR5cGUiLCJfY3JlYXRlIiwiR2V0UGFyYW1WYWx1ZSIsIkRhdGVDcmVhdGVkIiwiR1VJRCIsIlRpdGxlIiwiRGF0ZU1vZGlmaWVkIiwiY29uc29sZSIsImVycm9yIiwiYmtDb2xvciIsImRhdGVDb21wbGV0ZWQiLCJycHRFbmQiLCJfSW5mbyIsIl9wYXJzZUluZm8iLCJDQUxFTkRBUl9JTkZPIiwiX0V4dHJhSW5mbyIsIkNBTEVOREFSX0VYVFJBSU5GTyIsIl9nZXREZWZhdWx0RXh0cmFJbmZvIiwiZ3VpZCIsIkNBTEVOREFSX1NUQVJUIiwiQ0FMRU5EQVJfRU5EIiwiY2kiLCJiIiwiQ29uZmlnIiwiY29sb3JJdGVtcyIsImluZGV4T2YiLCJDb21wbGV0ZSIsIkRhdGVDb21wbGV0ZWQiLCJDQUxFTkRBUl9SRUNVUlJFTkNFIiwiQ0FMRU5EQVJfRU5EUkVDVVJSRU5DRSIsImNyZWF0ZWQiLCJ1cGRhdGVkIiwiX3VwZGF0ZSIsIm9iakNsYXNzIiwiY29uc3RydWN0b3IiLCJHVUlEX1JlZ0V4ciIsIlN0cmluZyIsIk9iamVjdCIsIkluZm9TdHJpbmciLCJJbmZvT2JqZWN0IiwiSW5mb0FycmF5IiwiaXRlbSIsImluZGV4IiwiYXJyIiwicGFpciIsIkluZm9PYmplY3RLZXlzQXJyYXkiLCJrZXlzIiwic2luZ2xlSW5mbyIsInB1c2giLCJyZXBsYWNlIiwiX3VwZGF0ZUluZm8iLCJfdXBkYXRlRXh0cmFJbmZvIiwiRXh0cmFJbmZvT2JqZWN0IiwiY29udGVudCIsImh0bWxUZXh0IiwiZXZlbnRTb3VyY2UiLCJkYXlBcnJheSIsIl9nZXRSZW5kZXJSZXBlYXREYXkiLCJhZGQiLCJkaWZmIiwibG9nIiwiY3VyV2Vla0RheSIsIm51bWJlciIsIl9nZXRXZWVrbHlSZXBlYXREYXkiLCJfZ2V0UGVyUmVwZWF0RGF5cyIsImludGVyV2Vla3MiLCJ2aWV3U3RhcnQiLCJ2aWV3RW5kIiwiaW50ZXJ2YWxXZWVrcyIsIm5ld0V2ZW50U3RhcnREYXRlIiwic2V0IiwiZ2V0IiwiaXNTYW1lIiwiaXNCZWZvcmUiLCJwZXJSdWxlTWFwIiwiX3N0cmluZ2lmeUluZm8iLCJzdGFydFN0ciIsImVuZFN0ciIsIl9zZXRQYXJhbVZhbHVlIiwiU2V0UGFyYW1WYWx1ZSIsImxvY2F0aW9uIiwib2JqRm9sZGVyIiwiR2V0Rm9sZGVyQnlMb2NhdGlvbiIsInRlbXBIdG1sIiwiZ19jbW4iLCJHZXRBVGVtcEZpbGVOYW1lIiwiX2dldEV2ZW50SHRtbCIsIlNhdmVUZXh0VG9GaWxlIiwiQ3JlYXRlRG9jdW1lbnQyIiwiQ2hhbmdlVGl0bGVBbmRGaWxlTmFtZSIsIlVwZGF0ZURvY3VtZW50NiIsInRvV2l6RXZlbnREYXRhIiwiQWRkVG9DYWxlbmRhciIsImd1aWRSZWdleCIsImlzV2l6RG9jRXhpc3QiLCJfc2F2ZUFsbFByb3AiLCJfY3JlYXRlV2l6RXZlbnREb2MiLCJpc0RlbGV0ZURvYyIsIlJlbW92ZUZyb21DYWxlbmRhciIsIkRlbGV0ZSIsIkRhdGFiYXNlIiwidXNlck5hbWUiLCJVc2VyTmFtZSIsImdlbmVyYWxFdmVudFNvdXJjZSIsIl9nZXRBbGxPcmlnaW5hbEV2ZW50IiwicmVwZWF0RXZlbnRTb3VyY2VzIiwiX2dldEFsbFJlcGVhdEV2ZW50IiwiY29uY2F0Iiwic3FsIiwiYW5kMSIsImFuZDIiLCJEb2N1bWVudHNEYXRhRnJvbVNRTCIsIm9iaiIsIkpTT04iLCJwYXJzZSIsIkFycmF5IiwiaXNBcnJheSIsImVyciIsInJlcGVhdEV2ZW50cyIsImdlbmVyYXRlUmVwZWF0RXZlbnRzIiwiX3VwZGF0ZURvY01vZGlmeURhdGUiLCJub3ciLCJzZXRTZWNvbmRzIiwiZ2V0U2Vjb25kcyIsIl9kMnMiLCJkdCIsImdldEZ1bGxZZWFyIiwiZm9ybWF0SW50VG9EYXRlU3RyaW5nIiwiZ2V0TW9udGgiLCJnZXREYXRlIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZXZlbnRFbmRTdHIiLCJzZWxlY3Rpb25EYXRhIiwidXNlcklucHV0cyIsImNvbG9yIiwicmVmZXRjaERhdGEiLCJfZ2V0V2l6RXZlbnQiLCJFdmVudENvbGxlY3Rpb24iLCJHZXRDYWxlbmRhckV2ZW50czIiLCJnZXRSZW5kZXJSZXBlYXREYXkiLCJfczJkIiwiZ19ldmVudFN0YXJ0IiwiZ19yZXBlYXRSdWxlIiwiZ2V0V2Vla2x5UmVwZWF0RGF5IiwiY2hhckF0IiwiZ2V0RGF5IiwiaW50ZXIiLCJfaW50ZXJEYXlzIiwicGFyc2VGbG9hdCIsInNwbGljZSIsImdldE1vbnRobHlSZXBlYXREYXkiLCJnZXRZZWFybHlSZXBlYXREYXkiLCJnZXRDaGluZXNlUmVwZWF0RGF5IiwiZGF5cyIsInN1YnN0ciIsImlzQ2hyb21lIiwiZ19pc0Nocm9tZSIsInVhIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwidG9Mb3dlckNhc2UiLCJuIiwiY2hlY2tBbmRBZGRTdHJMZW5ndGgiLCJzdHIiLCJjb2xvckNvdW50IiwiV2l6RXhwbG9yZXJBcHAiLCJ3aW5kb3ciLCJleHRlcm5hbCIsIldpekV4cGxvcmVyV2luZG93IiwiV2luZG93IiwiV2l6RGF0YWJhc2UiLCJXaXpDb21tb25VSSIsIkNyZWF0ZVdpek9iamVjdCIsIldpekNvbmZpcm0iLCJtc2ciLCJTaG93TWVzc2FnZSIsIldpekFsZXJ0IiwiV2l6QnViYmxlTWVzc2FnZSIsImRlbGF5IiwiYXBwUGF0aCIsIkdldFNwZWNpYWxGb2xkZXIiLCJ3aXpTaGVsbEZpbGVOYW1lIiwiZGxsRmlsZU5hbWUiLCJwYXJhbXMiLCJSdW5FeGUiLCJXaXpTaGVsbCIsImRsbEV4cG9ydEZ1bmMiLCJ3aXpFeGUiLCJzY3JpcHRGaWxlTmFtZSIsInNjcmlwdFBhcmFtcyIsInJnYjJoc2wiLCJyIiwiZyIsIk0iLCJtYXgiLCJtIiwibWluIiwiQyIsIkwiLCJTIiwiYWJzIiwiaCIsIkgiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFRLG9CQUFvQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFD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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFaLEdBQWdCQSxLQUFHLElBQUV6YSxLQUFLNGEsR0FBTCxDQUFTLElBQUVGLENBQUYsR0FBSSxDQUFiLENBQUwsQ0FBeEI7O0FBRUEsUUFBSUcsQ0FBSjtBQUNBLFFBQUlKLE1BQU0sQ0FBVixFQUFhSSxJQUFJLENBQUosQ0FBYixDQUFvQjtBQUFwQixTQUNLLElBQUlSLE1BQU1GLENBQVYsRUFBYVUsSUFBSyxDQUFDVCxJQUFFM0ssQ0FBSCxJQUFNZ0wsQ0FBUCxHQUFZLENBQWhCLENBQWIsS0FDQSxJQUFJSixNQUFNRCxDQUFWLEVBQWFTLElBQUssQ0FBQ3BMLElBQUUwSyxDQUFILElBQU1NLENBQVAsR0FBWSxDQUFoQixDQUFiLEtBQ0EsSUFBSUosTUFBTTVLLENBQVYsRUFBYW9MLElBQUssQ0FBQ1YsSUFBRUMsQ0FBSCxJQUFNSyxDQUFQLEdBQVksQ0FBaEI7O0FBRWxCLFFBQUlLLElBQUksS0FBS0QsQ0FBYjs7QUFFQTtBQUNBLFdBQU8sQ0FBQ0MsQ0FBRCxFQUFJdEQsV0FBV21ELENBQVgsQ0FBSixFQUFtQm5ELFdBQVdrRCxDQUFYLENBQW5CLENBQVA7QUFDSDs7UUFFUVIsTyxHQUFBQSxPIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuIFx0ZnVuY3Rpb24gaG90RGlzcG9zZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdH1cbiBcdHZhciBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayA9IHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl07XG4gXHR3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdID0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0XHRpZiAocGFyZW50SG90VXBkYXRlQ2FsbGJhY2spIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdH0gO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHR2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcbiBcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gXHRcdHNjcmlwdC5jaGFyc2V0ID0gXCJ1dGYtOFwiO1xuIFx0XHRzY3JpcHQuc3JjID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc1wiO1xuIFx0XHQ7XG4gXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZE1hbmlmZXN0KHJlcXVlc3RUaW1lb3V0KSB7XG4gXHRcdHJlcXVlc3RUaW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQgfHwgMTAwMDA7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydFwiKSk7XG4gXHRcdFx0fVxuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuIFx0XHRcdFx0dmFyIHJlcXVlc3RQYXRoID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc29uXCI7XG4gXHRcdFx0XHRyZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgcmVxdWVzdFBhdGgsIHRydWUpO1xuIFx0XHRcdFx0cmVxdWVzdC50aW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQ7XG4gXHRcdFx0XHRyZXF1ZXN0LnNlbmQobnVsbCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KGVycik7XG4gXHRcdFx0fVxuIFx0XHRcdHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSByZXR1cm47XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5zdGF0dXMgPT09IDApIHtcbiBcdFx0XHRcdFx0Ly8gdGltZW91dFxuIFx0XHRcdFx0XHRyZWplY3QoXG4gXHRcdFx0XHRcdFx0bmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgdGltZWQgb3V0LlwiKVxuIFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gNDA0KSB7XG4gXHRcdFx0XHRcdC8vIG5vIHVwZGF0ZSBhdmFpbGFibGVcbiBcdFx0XHRcdFx0cmVzb2x2ZSgpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyAhPT0gMjAwICYmIHJlcXVlc3Quc3RhdHVzICE9PSAzMDQpIHtcbiBcdFx0XHRcdFx0Ly8gb3RoZXIgZmFpbHVyZVxuIFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgZmFpbGVkLlwiKSk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHQvLyBzdWNjZXNzXG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0dmFyIHVwZGF0ZSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG4gXHRcdFx0XHRcdFx0cmVqZWN0KGUpO1xuIFx0XHRcdFx0XHRcdHJldHVybjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRyZXNvbHZlKHVwZGF0ZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdHZhciBob3RBcHBseU9uVXBkYXRlID0gdHJ1ZTtcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiMDJjNGU5OTk1OWRhYTcyMzM3ZDlcIjsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdFJlcXVlc3RUaW1lb3V0ID0gMTAwMDA7XG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcbiBcdHZhciBob3RDdXJyZW50Q2hpbGRNb2R1bGU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50cyA9IFtdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHNUZW1wID0gW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRpZiAoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuIFx0XHRcdGlmIChtZS5ob3QuYWN0aXZlKSB7XG4gXHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuIFx0XHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpID09PSAtMSkge1xuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgK1xuIFx0XHRcdFx0XHRcdHJlcXVlc3QgK1xuIFx0XHRcdFx0XHRcdFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdCk7XG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcbiBcdFx0fTtcbiBcdFx0dmFyIE9iamVjdEZhY3RvcnkgPSBmdW5jdGlvbiBPYmplY3RGYWN0b3J5KG5hbWUpIHtcbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xuIFx0XHRcdFx0fSxcbiBcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiBcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH07XG4gXHRcdGZvciAodmFyIG5hbWUgaW4gX193ZWJwYWNrX3JlcXVpcmVfXykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfX3dlYnBhY2tfcmVxdWlyZV9fLCBuYW1lKSAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJlXCIgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwidFwiXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIE9iamVjdEZhY3RvcnkobmFtZSkpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRmbi5lID0gZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicmVhZHlcIikgaG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkKS50aGVuKGZpbmlzaENodW5rTG9hZGluZywgZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcbiBcdFx0XHRcdHRocm93IGVycjtcbiBcdFx0XHR9KTtcblxuIFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcbiBcdFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XG4gXHRcdFx0XHRcdGlmICghaG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XG4gXHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9O1xuIFx0XHRmbi50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0XHRpZiAobW9kZSAmIDEpIHZhbHVlID0gZm4odmFsdWUpO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnQodmFsdWUsIG1vZGUgJiB+MSk7XG4gXHRcdH07XG4gXHRcdHJldHVybiBmbjtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIGhvdCA9IHtcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXG4gXHRcdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuIFx0XHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuIFx0XHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuIFx0XHRcdF9tYWluOiBob3RDdXJyZW50Q2hpbGRNb2R1bGUgIT09IG1vZHVsZUlkLFxuXG4gXHRcdFx0Ly8gTW9kdWxlIEFQSVxuIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgZGVwID09PSBcInVuZGVmaW5lZFwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBkZXAgPT09IFwidW5kZWZpbmVkXCIpIGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG4gXHRcdFx0fSxcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvLyBNYW5hZ2VtZW50IEFQSVxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXG4gXHRcdFx0c3RhdHVzOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRpZiAoIWwpIHJldHVybiBob3RTdGF0dXM7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3RTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG4gXHRcdH07XG4gXHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcbiBcdFx0cmV0dXJuIGhvdDtcbiBcdH1cblxuIFx0dmFyIGhvdFN0YXR1c0hhbmRsZXJzID0gW107XG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XG5cbiBcdGZ1bmN0aW9uIGhvdFNldFN0YXR1cyhuZXdTdGF0dXMpIHtcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xuIFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcbiBcdH1cblxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90QXZhaWxhYmxlRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3REZWZlcnJlZDtcblxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XG4gXHRcdHZhciBpc051bWJlciA9ICtpZCArIFwiXCIgPT09IGlkO1xuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHkpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcbiBcdFx0fVxuIFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xuIFx0XHRyZXR1cm4gaG90RG93bmxvYWRNYW5pZmVzdChob3RSZXF1ZXN0VGltZW91dCkudGhlbihmdW5jdGlvbih1cGRhdGUpIHtcbiBcdFx0XHRpZiAoIXVwZGF0ZSkge1xuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0XHRcdHJldHVybiBudWxsO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdEF2YWlsYWJsZUZpbGVzTWFwID0gdXBkYXRlLmM7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xuXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0aG90RGVmZXJyZWQgPSB7XG4gXHRcdFx0XHRcdHJlc29sdmU6IHJlc29sdmUsXG4gXHRcdFx0XHRcdHJlamVjdDogcmVqZWN0XG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdGZvcih2YXIgY2h1bmtJZCBpbiBpbnN0YWxsZWRDaHVua3MpXG4gXHRcdFx0e1xuIFx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nID09PSAwICYmXG4gXHRcdFx0XHRob3RXYWl0aW5nRmlsZXMgPT09IDBcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxuIFx0XHRcdHJldHVybjtcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcbiBcdFx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmICgtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XG4gXHRcdGlmICghZGVmZXJyZWQpIHJldHVybjtcbiBcdFx0aWYgKGhvdEFwcGx5T25VcGRhdGUpIHtcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xuIFx0XHRcdC8vIGF2b2lkIHRyaWdnZXJpbmcgdW5jYXVnaHQgZXhjZXB0aW9uIHdhcm5pbmcgaW4gQ2hyb21lLlxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKVxuIFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcbiBcdFx0XHRcdH0pXG4gXHRcdFx0XHQudGhlbihcbiBcdFx0XHRcdFx0ZnVuY3Rpb24ocmVzdWx0KSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuIFx0XHRcdFx0XHR9LFxuIFx0XHRcdFx0XHRmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0KTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKVxuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiBcdFx0dmFyIGNiO1xuIFx0XHR2YXIgaTtcbiBcdFx0dmFyIGo7XG4gXHRcdHZhciBtb2R1bGU7XG4gXHRcdHZhciBtb2R1bGVJZDtcblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKHVwZGF0ZU1vZHVsZUlkKSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKS5tYXAoZnVuY3Rpb24oaWQpIHtcbiBcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdGNoYWluOiBbaWRdLFxuIFx0XHRcdFx0XHRpZDogaWRcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRcdHZhciBxdWV1ZUl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcbiBcdFx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKCFtb2R1bGUgfHwgbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fbWFpbikge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0aWYgKCFwYXJlbnQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2goe1xuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0aWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cblxuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHR0eXBlOiBcImFjY2VwdGVkXCIsXG4gXHRcdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcbiBcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzOiBvdXRkYXRlZERlcGVuZGVuY2llc1xuIFx0XHRcdH07XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XG4gXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XG4gXHRcdFx0XHRpZiAoYS5pbmRleE9mKGl0ZW0pID09PSAtMSkgYS5wdXNoKGl0ZW0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcblxuIFx0XHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKCkge1xuIFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVzdWx0Lm1vZHVsZUlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiXG4gXHRcdFx0KTtcbiBcdFx0fTtcblxuIFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xuIFx0XHRcdFx0LyoqIEB0eXBlIHtUT0RPfSAqL1xuIFx0XHRcdFx0dmFyIHJlc3VsdDtcbiBcdFx0XHRcdGlmIChob3RVcGRhdGVbaWRdKSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogaWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdC8qKiBAdHlwZSB7RXJyb3J8ZmFsc2V9ICovXG4gXHRcdFx0XHR2YXIgYWJvcnRFcnJvciA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBjaGFpbkluZm8gPSBcIlwiO1xuIFx0XHRcdFx0aWYgKHJlc3VsdC5jaGFpbikge1xuIFx0XHRcdFx0XHRjaGFpbkluZm8gPSBcIlxcblVwZGF0ZSBwcm9wYWdhdGlvbjogXCIgKyByZXN1bHQuY2hhaW4uam9pbihcIiAtPiBcIik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzd2l0Y2ggKHJlc3VsdC50eXBlKSB7XG4gXHRcdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdFwiIGluIFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucGFyZW50SWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcInVuYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblVuYWNjZXB0ZWQpIG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIgKyBjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uQWNjZXB0ZWQpIG9wdGlvbnMub25BY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGlzcG9zZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRpc3Bvc2VkKSBvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0Rpc3Bvc2UgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRkZWZhdWx0OlxuIFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhjZXB0aW9uIHR5cGUgXCIgKyByZXN1bHQudHlwZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoYWJvcnRFcnJvcikge1xuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcbiBcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvQXBwbHkpIHtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHRcdFx0XHRmb3IgKG1vZHVsZUlkIGluIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdFx0XHRcdGlmIChcbiBcdFx0XHRcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0XHRcdFx0KVxuIFx0XHRcdFx0XHRcdCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQoXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSxcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXVxuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0Rpc3Bvc2UpIHtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cbiBcdFx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbaV07XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiZcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0KVxuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0XHR9KTtcbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xuIFx0XHRPYmplY3Qua2V5cyhob3RBdmFpbGFibGVGaWxlc01hcCkuZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdID09PSBmYWxzZSkge1xuIFx0XHRcdFx0aG90RGlzcG9zZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0fSk7XG5cbiBcdFx0dmFyIGlkeDtcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG4gXHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRpZiAoIW1vZHVsZSkgY29udGludWU7XG5cbiBcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG4gXHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRjYiA9IGRpc3Bvc2VIYW5kbGVyc1tqXTtcbiBcdFx0XHRcdGNiKGRhdGEpO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF0gPSBkYXRhO1xuXG4gXHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcbiBcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXG4gXHRcdFx0ZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxuIFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcbiBcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkge1xuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXG4gXHRcdHZhciBkZXBlbmRlbmN5O1xuIFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG4gXHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG4gXHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3QgaW4gXCJhcHBseVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xuXG4gXHRcdGhvdEN1cnJlbnRIYXNoID0gaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldO1xuIFx0XHRcdFx0XHRcdGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG4gXHRcdFx0XHRcdFx0aWYgKGNiKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzLmluZGV4T2YoY2IpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRjYiA9IGNhbGxiYWNrc1tpXTtcbiBcdFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdFx0Y2IobW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuIFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV0sXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXG4gXHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjI7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcbiBcdFx0aWYgKGVycm9yKSB7XG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuIFx0XHR9XG5cbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiBcdFx0XHRyZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJpbmRleFwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGhvdDogaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSxcbiBcdFx0XHRwYXJlbnRzOiAoaG90Q3VycmVudFBhcmVudHNUZW1wID0gaG90Q3VycmVudFBhcmVudHMsIGhvdEN1cnJlbnRQYXJlbnRzID0gW10sIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCksXG4gXHRcdFx0Y2hpbGRyZW46IFtdXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbXCIuL3NyYy9pbmRleC5qc1wiLFwidmVuZG9yXCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXHJcXG4vKiDml6XljobmlbTkvZPmoLflvI9cXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG4jY2FsZW5kYXItY29udGFpbmVyIHtcXHJcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcclxcbiAgICB0b3A6IDA7XFxyXFxuICAgIGxlZnQ6IDhweDtcXHJcXG4gICAgcmlnaHQ6IDhweDtcXHJcXG4gICAgYm90dG9tOiA4cHg7XFxyXFxufVxcclxcblxcclxcbi5mYy1oZWFkZXItdG9vbGJhciB7XFxyXFxuICAgIC8qXFxyXFxuICAgIHRoZSBjYWxlbmRhciB3aWxsIGJlIGJ1dHRpbmcgdXAgYWdhaW5zdCB0aGUgZWRnZXMsXFxyXFxuICAgIGJ1dCBsZXQncyBzY29vdCBpbiB0aGUgaGVhZGVyJ3MgYnV0dG9uc1xcclxcbiAgICAqL1xcclxcbiAgICBwYWRkaW5nLXRvcDogMTRweDtcXHJcXG4gICAgcGFkZGluZy1sZWZ0OiAwO1xcclxcbiAgICBwYWRkaW5nLXJpZ2h0OiAwO1xcclxcbn1cXHJcXG5cXHJcXG4vKiDkuovku7bmuLLmn5NcXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG4udGMtY29tcGxldGUge1xcclxcbiAgICBvcGFjaXR5OiAwLjM7XFxyXFxuXFxyXFxufVxcclxcblxcclxcbi50Yy1jb21wbGV0ZSA+IC5mYy1jb250ZW50LFxcclxcbi50Yy1jb21wbGV0ZSA+IC5mYy1jb250ZW50ID4gLmZjLXRpbWUsXFxyXFxuLnRjLWNvbXBsZXRlID4gLmZjLWNvbnRlbnQgPiAuZmMtdGl0bGVcXHJcXG57XFxyXFxuICAgIHRleHQtZGVjb3JhdGlvbjogbGluZS10aHJvdWdoICFpbXBvcnRhbnQ7XFxyXFxufVxcclxcblxcclxcbi50Yy1jb21wbGV0ZTpob3ZlciB7XFxyXFxuICAgIG9wYWNpdHk6IDE7XFxyXFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLyogUG9wb3ZlciDnu4Tku7bmoLflvI9cXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG5cXHJcXG4vKiBQb3BvdmVyIOWuueWZqOWPiuWumuS9jVxcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcblxcclxcbi50Yy1wb3BvdmVyIHtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICBiYWNrZ3JvdW5kOiAjRkZGO1xcclxcbiAgICBjb2xvcjogYmxhY2s7XFxyXFxuICAgIHdpZHRoOiBhdXRvO1xcclxcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMik7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcXHJcXG4gICAgYm94LXNoYWRvdzogMCAycHggNHB4IHJnYmEoMCwgMCwgMCwgLjIpO1xcclxcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3ZlciAuYXJyb3cge1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgICB3aWR0aDogMjBweDtcXHJcXG4gICAgaGVpZ2h0OiAxMHB4O1xcclxcbiAgICBtYXJnaW46IDAgNnB4O1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3ZlciAuYXJyb3c6OmJlZm9yZSwgLnRjLXBvcG92ZXIgLmFycm93OjphZnRlciB7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcclxcbiAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xcclxcbiAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xcclxcbn1cXHJcXG5cXHJcXG4vKiB0b3Ag5pS+572u5qC35byPXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJ0b3BcXFwiXSB7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwidG9wXFxcIl0gLmFycm93IHtcXHJcXG4gICAgYm90dG9tOiBjYWxjKCgxMHB4ICsgMXB4KSAqIC0xKTtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJ0b3BcXFwiXSAuYXJyb3c6OmJlZm9yZSxcXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInRvcFxcXCJdIC5hcnJvdzo6YWZ0ZXIge1xcclxcbiAgICBib3JkZXItd2lkdGg6IDEwcHggMTBweCAwO1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInRvcFxcXCJdIC5hcnJvdzo6YmVmb3JlIHtcXHJcXG4gICAgYm90dG9tOiAwO1xcclxcbiAgICBib3JkZXItdG9wLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMjUpO1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInRvcFxcXCJdIC5hcnJvdzo6YWZ0ZXIge1xcclxcbiAgICBib3R0b206IDFweDtcXHJcXG4gICAgYm9yZGVyLXRvcC1jb2xvcjogI2ZmZjtcXHJcXG59XFxyXFxuXFxyXFxuLyogcmlnaHQg5pS+572u5qC35byPXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJyaWdodFxcXCJdIHtcXHJcXG4gICAgbWFyZ2luLWxlZnQ6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwicmlnaHRcXFwiXSAuYXJyb3cge1xcclxcbiAgICBsZWZ0OiBjYWxjKCgxMHB4ICsgMXB4KSAqIC0xKTtcXHJcXG4gICAgd2lkdGg6IDEwcHg7XFxyXFxuICAgIGhlaWdodDogMjBweDtcXHJcXG4gICAgbWFyZ2luOiA2cHggMDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJyaWdodFxcXCJdIC5hcnJvdzo6YmVmb3JlLFxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwicmlnaHRcXFwiXSAuYXJyb3c6OmFmdGVyIHtcXHJcXG4gICAgYm9yZGVyLXdpZHRoOiAxMHB4IDEwcHggMTBweCAwO1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInJpZ2h0XFxcIl0gLmFycm93OjpiZWZvcmUge1xcclxcbiAgICBsZWZ0OiAwO1xcclxcbiAgICBib3JkZXItcmlnaHQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSk7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwicmlnaHRcXFwiXSAuYXJyb3c6OmFmdGVyIHtcXHJcXG4gICAgbGVmdDogMXB4O1xcclxcbiAgICBib3JkZXItcmlnaHQtY29sb3I6ICNmZmY7XFxyXFxufVxcclxcblxcclxcbi8qIGJvdHRvbSDmlL7nva7moLflvI9cXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImJvdHRvbVxcXCJdIHtcXHJcXG4gICAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJib3R0b21cXFwiXSAuYXJyb3cge1xcclxcbiAgICB0b3A6IGNhbGMoKDEwcHggKyAxcHgpICogLTEpO1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImJvdHRvbVxcXCJdIC5hcnJvdzo6YmVmb3JlLFxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwiYm90dG9tXFxcIl0gLmFycm93OjphZnRlciB7XFxyXFxuICAgIGJvcmRlci13aWR0aDogMCAxMHB4IDEwcHggMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJib3R0b21cXFwiXSAuYXJyb3c6OmJlZm9yZSB7XFxyXFxuICAgIHRvcDogMDtcXHJcXG4gICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KTtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJib3R0b21cXFwiXSAuYXJyb3c6OmFmdGVyIHtcXHJcXG4gICAgdG9wOiAxcHg7XFxyXFxuICAgIGJvcmRlci1ib3R0b20tY29sb3I6ICNmN2Y3Zjc7IC8q6L+Z6YeM5Li65LqG5LiT6Zeo6YCC6YWN5pyJ5qCH6aKY6IOM5pmv55qEUG9wb3ZlciovXFxyXFxufVxcclxcblxcclxcbi8qIGxlZnQg5pS+572u5qC35byPXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJsZWZ0XFxcIl0ge1xcclxcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwibGVmdFxcXCJdIC5hcnJvdyB7XFxyXFxuICAgIHJpZ2h0OiBjYWxjKCgxMHB4ICsgMXB4KSAqIC0xKTtcXHJcXG4gICAgd2lkdGg6IDEwcHg7XFxyXFxuICAgIGhlaWdodDogMjBweDtcXHJcXG4gICAgbWFyZ2luOiA2cHggMDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJsZWZ0XFxcIl0gLmFycm93OjpiZWZvcmUsXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJsZWZ0XFxcIl0gLmFycm93OjphZnRlciB7XFxyXFxuICAgIGJvcmRlci13aWR0aDogMTBweCAwIDEwcHggMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJsZWZ0XFxcIl0gLmFycm93OjpiZWZvcmUge1xcclxcbiAgICByaWdodDogMDtcXHJcXG4gICAgYm9yZGVyLWxlZnQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSk7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwibGVmdFxcXCJdIC5hcnJvdzo6YWZ0ZXIge1xcclxcbiAgICByaWdodDogMXB4O1xcclxcbiAgICBib3JkZXItbGVmdC1jb2xvcjogI2ZmZjtcXHJcXG59XFxyXFxuXFxyXFxuLyogQ29udGVudCDmoIfpopjlkozlhoXlrrlcXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG5cXHJcXG4udGMtcG9wb3Zlci1oZWFkZXIge1xcclxcbiAgICBwYWRkaW5nOiAuNXJlbSAuNzVyZW07XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IDA7XFxyXFxuICAgIGZvbnQtc2l6ZTogMXJlbTtcXHJcXG4gICAgY29sb3I6IGluaGVyaXQ7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmN2Y3Zjc7XFxyXFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZWJlYmViO1xcclxcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA2cHg7XFxyXFxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA2cHg7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyLWJvZHkge1xcclxcbiAgICBwYWRkaW5nOiAxMHB4IDE1cHg7XFxyXFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiI3RjLWVkaXRwb3BwZXItZXZlbnR0aXRsZSB7XFxyXFxuICAgIGJvcmRlci13aWR0aDogMXB4O1xcclxcbiAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXHJcXG4gICAgcGFkZGluZzogMDtcXHJcXG4gICAgbWFyZ2luOiAwO1xcclxcbiAgICBmb250LXNpemU6IDEuMmVtO1xcclxcbiAgICBmb250LXdlaWdodDogYm9sZDtcXHJcXG59XFxyXFxuXFxyXFxuI3RjLWVkaXRwb3BwZXItZXZlbnR0aXRsZTpmb2N1cyxcXHJcXG4jdGMtZWRpdHBvcHBlci1ldmVudHRpdGxlOmhvdmVyIHtcXHJcXG4gICAgb3V0bGluZTogbm9uZTtcXHJcXG4gICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogYmxhY2s7IFxcclxcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcImh0bWwsIGJvZHkge1xcclxcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcclxcbiAgICBmb250LXNpemU6IDE0cHg7XFxyXFxufVxcclxcblxcclxcbjpmb2N1cyB7XFxyXFxuICAgIG91dGxpbmU6bm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLyogRm9udHMuY3NzIC0tIOi3qOW5s+WPsOS4reaWh+Wtl+S9k+ino+WGs+aWueahiFxcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG4uZm9udC1oZWkge2ZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBcXFwiTm90byBTYW5zXFxcIiwgXFxcIkhlbHZldGljYSBOZXVlXFxcIiwgSGVsdmV0aWNhLCBcXFwiTmltYnVzIFNhbnMgTFxcXCIsIEFyaWFsLCBcXFwiTGliZXJhdGlvbiBTYW5zXFxcIiwgXFxcIlBpbmdGYW5nIFNDXFxcIiwgXFxcIkhpcmFnaW5vIFNhbnMgR0JcXFwiLCBcXFwiTm90byBTYW5zIENKSyBTQ1xcXCIsIFxcXCJTb3VyY2UgSGFuIFNhbnMgU0NcXFwiLCBcXFwiU291cmNlIEhhbiBTYW5zIENOXFxcIiwgXFxcIk1pY3Jvc29mdCBZYUhlaVxcXCIsIFxcXCJXZW5xdWFueWkgTWljcm8gSGVpXFxcIiwgXFxcIldlblF1YW5ZaSBaZW4gSGVpXFxcIiwgXFxcIlNUIEhlaXRpXFxcIiwgU2ltSGVpLCBcXFwiV2VuUXVhbllpIFplbiBIZWkgU2hhcnBcXFwiLCBzYW5zLXNlcmlmO31cXHJcXG4uZm9udC1rYWkge2ZvbnQtZmFtaWx5OiBCYXNrZXJ2aWxsZSwgR2VvcmdpYSwgXFxcIkxpYmVyYXRpb24gU2VyaWZcXFwiLCBcXFwiS2FpdGkgU0NcXFwiLCBTVEthaXRpLCBcXFwiQVIgUEwgVUthaSBDTlxcXCIsIFxcXCJBUiBQTCBVS2FpIEhLXFxcIiwgXFxcIkFSIFBMIFVLYWkgVFdcXFwiLCBcXFwiQVIgUEwgVUthaSBUVyBNQkVcXFwiLCBcXFwiQVIgUEwgS2FpdGlNIEdCXFxcIiwgS2FpVGksIEthaVRpX0dCMjMxMiwgREZLYWktU0IsIFxcXCJUVy1LYWlcXFwiLCBzZXJpZjt9XFxyXFxuLmZvbnQtc29uZyB7Zm9udC1mYW1pbHk6IEdlb3JnaWEsIFxcXCJOaW1idXMgUm9tYW4gTm85IExcXFwiLCBcXFwiU29uZ3RpIFNDXFxcIiwgXFxcIk5vdG8gU2VyaWYgQ0pLIFNDXFxcIiwgXFxcIlNvdXJjZSBIYW4gU2VyaWYgU0NcXFwiLCBcXFwiU291cmNlIEhhbiBTZXJpZiBDTlxcXCIsIFNUU29uZywgXFxcIkFSIFBMIE5ldyBTdW5nXFxcIiwgXFxcIkFSIFBMIFN1bmd0aUwgR0JcXFwiLCBOU2ltU3VuLCBTaW1TdW4sIFxcXCJUVy1TdW5nXFxcIiwgXFxcIldlblF1YW5ZaSBCaXRtYXAgU29uZ1xcXCIsIFxcXCJBUiBQTCBVTWluZyBDTlxcXCIsIFxcXCJBUiBQTCBVTWluZyBIS1xcXCIsIFxcXCJBUiBQTCBVTWluZyBUV1xcXCIsIFxcXCJBUiBQTCBVTWluZyBUVyBNQkVcXFwiLCBQTWluZ0xpVSwgTWluZ0xpVSwgc2VyaWY7fVxcclxcbi5mb250LWZhbmctc29uZyB7Zm9udC1mYW1pbHk6IEJhc2tlcnZpbGxlLCBcXFwiVGltZXMgTmV3IFJvbWFuXFxcIiwgXFxcIkxpYmVyYXRpb24gU2VyaWZcXFwiLCBTVEZhbmdzb25nLCBGYW5nU29uZywgRmFuZ1NvbmdfR0IyMzEyLCBcXFwiQ1dURVgtRlxcXCIsIHNlcmlmO31cXHJcXG5cXHJcXG4vKiDkuLTml7bmlL7nva5cXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG5cXHJcXG4udWktYnV0dG9uLWljb24tb25seS5zcGxpdGJ1dHRvbi1zZWxlY3Qge1xcclxcbiAgICB3aWR0aDogMWVtO1xcclxcbn1cXHJcXG5cXHJcXG5hW2RhdGEtZ290b10ge1xcclxcbiAgICBjb2xvcjogIzAwMDtcXHJcXG59XFxyXFxuXFxyXFxuLyogQm9vdHN0cmFwIDQg57uE5Lu25qC35byPXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuXFxyXFxuLyog6KGo5Y2VXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuLmNvbC1mb3JtLWxhYmVsIHtcXHJcXG4gICAgcGFkZGluZy10b3A6IGNhbGMoLjM3NXJlbSArIDFweCk7XFxyXFxuICAgIHBhZGRpbmctYm90dG9tOiBjYWxjKC4zNzVyZW0gKyAxcHgpO1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xcclxcbiAgICBmb250LXNpemU6IGluaGVyaXQ7XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiAxLjU7XFxyXFxufVxcclxcblxcclxcbi5pbnB1dC1ncm91cC1hZGRvbiB7XFxyXFxuICBib3JkZXItbGVmdC13aWR0aDogMDtcXHJcXG4gIGJvcmRlci1yaWdodC13aWR0aDogMDtcXHJcXG59XFxyXFxuLmlucHV0LWdyb3VwLWFkZG9uOmZpcnN0LWNoaWxkIHtcXHJcXG4gIGJvcmRlci1sZWZ0LXdpZHRoOiAxcHg7XFxyXFxufVxcclxcbi5pbnB1dC1ncm91cC1hZGRvbjpsYXN0LWNoaWxkIHtcXHJcXG4gIGJvcmRlci1yaWdodC13aWR0aDogMXB4O1xcclxcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJ2YXIgbWFwID0ge1xuXHRcIi4vYWZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FmLmpzXCIsXG5cdFwiLi9hZi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYWYuanNcIixcblx0XCIuL2FyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci5qc1wiLFxuXHRcIi4vYXItZHpcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWR6LmpzXCIsXG5cdFwiLi9hci1kei5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItZHouanNcIixcblx0XCIuL2FyLWt3XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1rdy5qc1wiLFxuXHRcIi4vYXIta3cuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWt3LmpzXCIsXG5cdFwiLi9hci1seVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItbHkuanNcIixcblx0XCIuL2FyLWx5LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1seS5qc1wiLFxuXHRcIi4vYXItbWFcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLW1hLmpzXCIsXG5cdFwiLi9hci1tYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItbWEuanNcIixcblx0XCIuL2FyLXNhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1zYS5qc1wiLFxuXHRcIi4vYXItc2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLXNhLmpzXCIsXG5cdFwiLi9hci10blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItdG4uanNcIixcblx0XCIuL2FyLXRuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci10bi5qc1wiLFxuXHRcIi4vYXIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLmpzXCIsXG5cdFwiLi9helwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXouanNcIixcblx0XCIuL2F6LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hei5qc1wiLFxuXHRcIi4vYmVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JlLmpzXCIsXG5cdFwiLi9iZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYmUuanNcIixcblx0XCIuL2JnXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iZy5qc1wiLFxuXHRcIi4vYmcuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JnLmpzXCIsXG5cdFwiLi9ibVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm0uanNcIixcblx0XCIuL2JtLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ibS5qc1wiLFxuXHRcIi4vYm5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JuLmpzXCIsXG5cdFwiLi9ibi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm4uanNcIixcblx0XCIuL2JvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iby5qc1wiLFxuXHRcIi4vYm8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JvLmpzXCIsXG5cdFwiLi9iclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYnIuanNcIixcblx0XCIuL2JyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ici5qc1wiLFxuXHRcIi4vYnNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JzLmpzXCIsXG5cdFwiLi9icy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYnMuanNcIixcblx0XCIuL2NhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jYS5qc1wiLFxuXHRcIi4vY2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2NhLmpzXCIsXG5cdFwiLi9jc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3MuanNcIixcblx0XCIuL2NzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jcy5qc1wiLFxuXHRcIi4vY3ZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2N2LmpzXCIsXG5cdFwiLi9jdi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3YuanNcIixcblx0XCIuL2N5XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jeS5qc1wiLFxuXHRcIi4vY3kuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2N5LmpzXCIsXG5cdFwiLi9kYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGEuanNcIixcblx0XCIuL2RhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kYS5qc1wiLFxuXHRcIi4vZGVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLmpzXCIsXG5cdFwiLi9kZS1hdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUtYXQuanNcIixcblx0XCIuL2RlLWF0LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS1hdC5qc1wiLFxuXHRcIi4vZGUtY2hcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLWNoLmpzXCIsXG5cdFwiLi9kZS1jaC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUtY2guanNcIixcblx0XCIuL2RlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS5qc1wiLFxuXHRcIi4vZHZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2R2LmpzXCIsXG5cdFwiLi9kdi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZHYuanNcIixcblx0XCIuL2VsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbC5qc1wiLFxuXHRcIi4vZWwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VsLmpzXCIsXG5cdFwiLi9lbi1hdVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tYXUuanNcIixcblx0XCIuL2VuLWF1LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1hdS5qc1wiLFxuXHRcIi4vZW4tY2FcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWNhLmpzXCIsXG5cdFwiLi9lbi1jYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tY2EuanNcIixcblx0XCIuL2VuLWdiXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1nYi5qc1wiLFxuXHRcIi4vZW4tZ2IuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWdiLmpzXCIsXG5cdFwiLi9lbi1pZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4taWUuanNcIixcblx0XCIuL2VuLWllLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1pZS5qc1wiLFxuXHRcIi4vZW4taWxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWlsLmpzXCIsXG5cdFwiLi9lbi1pbC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4taWwuanNcIixcblx0XCIuL2VuLW56XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1uei5qc1wiLFxuXHRcIi4vZW4tbnouanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLW56LmpzXCIsXG5cdFwiLi9lb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW8uanNcIixcblx0XCIuL2VvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lby5qc1wiLFxuXHRcIi4vZXNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLmpzXCIsXG5cdFwiLi9lcy1kb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMtZG8uanNcIixcblx0XCIuL2VzLWRvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy1kby5qc1wiLFxuXHRcIi4vZXMtdXNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLXVzLmpzXCIsXG5cdFwiLi9lcy11cy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMtdXMuanNcIixcblx0XCIuL2VzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy5qc1wiLFxuXHRcIi4vZXRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2V0LmpzXCIsXG5cdFwiLi9ldC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXQuanNcIixcblx0XCIuL2V1XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ldS5qc1wiLFxuXHRcIi4vZXUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2V1LmpzXCIsXG5cdFwiLi9mYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZmEuanNcIixcblx0XCIuL2ZhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mYS5qc1wiLFxuXHRcIi4vZmlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZpLmpzXCIsXG5cdFwiLi9maS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZmkuanNcIixcblx0XCIuL2ZvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mby5qc1wiLFxuXHRcIi4vZm8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZvLmpzXCIsXG5cdFwiLi9mclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnIuanNcIixcblx0XCIuL2ZyLWNhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci1jYS5qc1wiLFxuXHRcIi4vZnItY2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLWNhLmpzXCIsXG5cdFwiLi9mci1jaFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnItY2guanNcIixcblx0XCIuL2ZyLWNoLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci1jaC5qc1wiLFxuXHRcIi4vZnIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLmpzXCIsXG5cdFwiLi9meVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnkuanNcIixcblx0XCIuL2Z5LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9meS5qc1wiLFxuXHRcIi4vZ2RcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dkLmpzXCIsXG5cdFwiLi9nZC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ2QuanNcIixcblx0XCIuL2dsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nbC5qc1wiLFxuXHRcIi4vZ2wuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dsLmpzXCIsXG5cdFwiLi9nb20tbGF0blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ29tLWxhdG4uanNcIixcblx0XCIuL2dvbS1sYXRuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nb20tbGF0bi5qc1wiLFxuXHRcIi4vZ3VcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2d1LmpzXCIsXG5cdFwiLi9ndS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ3UuanNcIixcblx0XCIuL2hlXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oZS5qc1wiLFxuXHRcIi4vaGUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hlLmpzXCIsXG5cdFwiLi9oaVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaGkuanNcIixcblx0XCIuL2hpLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oaS5qc1wiLFxuXHRcIi4vaHJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hyLmpzXCIsXG5cdFwiLi9oci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHIuanNcIixcblx0XCIuL2h1XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9odS5qc1wiLFxuXHRcIi4vaHUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2h1LmpzXCIsXG5cdFwiLi9oeS1hbVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHktYW0uanNcIixcblx0XCIuL2h5LWFtLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oeS1hbS5qc1wiLFxuXHRcIi4vaWRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2lkLmpzXCIsXG5cdFwiLi9pZC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaWQuanNcIixcblx0XCIuL2lzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pcy5qc1wiLFxuXHRcIi4vaXMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2lzLmpzXCIsXG5cdFwiLi9pdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaXQuanNcIixcblx0XCIuL2l0LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pdC5qc1wiLFxuXHRcIi4vamFcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2phLmpzXCIsXG5cdFwiLi9qYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvamEuanNcIixcblx0XCIuL2p2XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9qdi5qc1wiLFxuXHRcIi4vanYuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2p2LmpzXCIsXG5cdFwiLi9rYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva2EuanNcIixcblx0XCIuL2thLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rYS5qc1wiLFxuXHRcIi4va2tcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2trLmpzXCIsXG5cdFwiLi9ray5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva2suanNcIixcblx0XCIuL2ttXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rbS5qc1wiLFxuXHRcIi4va20uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ttLmpzXCIsXG5cdFwiLi9rblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva24uanNcIixcblx0XCIuL2tuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rbi5qc1wiLFxuXHRcIi4va29cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2tvLmpzXCIsXG5cdFwiLi9rby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva28uanNcIixcblx0XCIuL2t5XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9reS5qc1wiLFxuXHRcIi4va3kuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2t5LmpzXCIsXG5cdFwiLi9sYlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbGIuanNcIixcblx0XCIuL2xiLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sYi5qc1wiLFxuXHRcIi4vbG9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2xvLmpzXCIsXG5cdFwiLi9sby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbG8uanNcIixcblx0XCIuL2x0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sdC5qc1wiLFxuXHRcIi4vbHQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2x0LmpzXCIsXG5cdFwiLi9sdlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbHYuanNcIixcblx0XCIuL2x2LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sdi5qc1wiLFxuXHRcIi4vbWVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21lLmpzXCIsXG5cdFwiLi9tZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWUuanNcIixcblx0XCIuL21pXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9taS5qc1wiLFxuXHRcIi4vbWkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21pLmpzXCIsXG5cdFwiLi9ta1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWsuanNcIixcblx0XCIuL21rLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tay5qc1wiLFxuXHRcIi4vbWxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21sLmpzXCIsXG5cdFwiLi9tbC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWwuanNcIixcblx0XCIuL21uXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tbi5qc1wiLFxuXHRcIi4vbW4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21uLmpzXCIsXG5cdFwiLi9tclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXIuanNcIixcblx0XCIuL21yLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tci5qc1wiLFxuXHRcIi4vbXNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21zLmpzXCIsXG5cdFwiLi9tcy1teVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXMtbXkuanNcIixcblx0XCIuL21zLW15LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tcy1teS5qc1wiLFxuXHRcIi4vbXMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21zLmpzXCIsXG5cdFwiLi9tdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXQuanNcIixcblx0XCIuL210LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tdC5qc1wiLFxuXHRcIi4vbXlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL215LmpzXCIsXG5cdFwiLi9teS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXkuanNcIixcblx0XCIuL25iXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9uYi5qc1wiLFxuXHRcIi4vbmIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25iLmpzXCIsXG5cdFwiLi9uZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmUuanNcIixcblx0XCIuL25lLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9uZS5qc1wiLFxuXHRcIi4vbmxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25sLmpzXCIsXG5cdFwiLi9ubC1iZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmwtYmUuanNcIixcblx0XCIuL25sLWJlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubC1iZS5qc1wiLFxuXHRcIi4vbmwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25sLmpzXCIsXG5cdFwiLi9ublwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbm4uanNcIixcblx0XCIuL25uLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubi5qc1wiLFxuXHRcIi4vcGEtaW5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3BhLWluLmpzXCIsXG5cdFwiLi9wYS1pbi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcGEtaW4uanNcIixcblx0XCIuL3BsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wbC5qc1wiLFxuXHRcIi4vcGwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3BsLmpzXCIsXG5cdFwiLi9wdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcHQuanNcIixcblx0XCIuL3B0LWJyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wdC1ici5qc1wiLFxuXHRcIi4vcHQtYnIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3B0LWJyLmpzXCIsXG5cdFwiLi9wdC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcHQuanNcIixcblx0XCIuL3JvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9yby5qc1wiLFxuXHRcIi4vcm8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3JvLmpzXCIsXG5cdFwiLi9ydVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcnUuanNcIixcblx0XCIuL3J1LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ydS5qc1wiLFxuXHRcIi4vc2RcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NkLmpzXCIsXG5cdFwiLi9zZC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2QuanNcIixcblx0XCIuL3NlXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zZS5qc1wiLFxuXHRcIi4vc2UuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NlLmpzXCIsXG5cdFwiLi9zaVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2kuanNcIixcblx0XCIuL3NpLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zaS5qc1wiLFxuXHRcIi4vc2tcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NrLmpzXCIsXG5cdFwiLi9zay5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2suanNcIixcblx0XCIuL3NsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zbC5qc1wiLFxuXHRcIi4vc2wuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NsLmpzXCIsXG5cdFwiLi9zcVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3EuanNcIixcblx0XCIuL3NxLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zcS5qc1wiLFxuXHRcIi4vc3JcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NyLmpzXCIsXG5cdFwiLi9zci1jeXJsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zci1jeXJsLmpzXCIsXG5cdFwiLi9zci1jeXJsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zci1jeXJsLmpzXCIsXG5cdFwiLi9zci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3IuanNcIixcblx0XCIuL3NzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zcy5qc1wiLFxuXHRcIi4vc3MuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NzLmpzXCIsXG5cdFwiLi9zdlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3YuanNcIixcblx0XCIuL3N2LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zdi5qc1wiLFxuXHRcIi4vc3dcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3N3LmpzXCIsXG5cdFwiLi9zdy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3cuanNcIixcblx0XCIuL3RhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90YS5qc1wiLFxuXHRcIi4vdGEuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RhLmpzXCIsXG5cdFwiLi90ZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGUuanNcIixcblx0XCIuL3RlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ZS5qc1wiLFxuXHRcIi4vdGV0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ZXQuanNcIixcblx0XCIuL3RldC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGV0LmpzXCIsXG5cdFwiLi90Z1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGcuanNcIixcblx0XCIuL3RnLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90Zy5qc1wiLFxuXHRcIi4vdGhcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RoLmpzXCIsXG5cdFwiLi90aC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGguanNcIixcblx0XCIuL3RsLXBoXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90bC1waC5qc1wiLFxuXHRcIi4vdGwtcGguanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RsLXBoLmpzXCIsXG5cdFwiLi90bGhcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RsaC5qc1wiLFxuXHRcIi4vdGxoLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90bGguanNcIixcblx0XCIuL3RyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ci5qc1wiLFxuXHRcIi4vdHIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RyLmpzXCIsXG5cdFwiLi90emxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3R6bC5qc1wiLFxuXHRcIi4vdHpsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90emwuanNcIixcblx0XCIuL3R6bVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHptLmpzXCIsXG5cdFwiLi90em0tbGF0blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHptLWxhdG4uanNcIixcblx0XCIuL3R6bS1sYXRuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90em0tbGF0bi5qc1wiLFxuXHRcIi4vdHptLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90em0uanNcIixcblx0XCIuL3VnLWNuXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91Zy1jbi5qc1wiLFxuXHRcIi4vdWctY24uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VnLWNuLmpzXCIsXG5cdFwiLi91a1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdWsuanNcIixcblx0XCIuL3VrLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ay5qc1wiLFxuXHRcIi4vdXJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VyLmpzXCIsXG5cdFwiLi91ci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXIuanNcIixcblx0XCIuL3V6XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ei5qc1wiLFxuXHRcIi4vdXotbGF0blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXotbGF0bi5qc1wiLFxuXHRcIi4vdXotbGF0bi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXotbGF0bi5qc1wiLFxuXHRcIi4vdXouanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3V6LmpzXCIsXG5cdFwiLi92aVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdmkuanNcIixcblx0XCIuL3ZpLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS92aS5qc1wiLFxuXHRcIi4veC1wc2V1ZG9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3gtcHNldWRvLmpzXCIsXG5cdFwiLi94LXBzZXVkby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUveC1wc2V1ZG8uanNcIixcblx0XCIuL3lvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS95by5qc1wiLFxuXHRcIi4veW8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3lvLmpzXCIsXG5cdFwiLi96aC1jblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtY24uanNcIixcblx0XCIuL3poLWNuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC1jbi5qc1wiLFxuXHRcIi4vemgtaGtcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLWhrLmpzXCIsXG5cdFwiLi96aC1oay5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtaGsuanNcIixcblx0XCIuL3poLXR3XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC10dy5qc1wiLFxuXHRcIi4vemgtdHcuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLXR3LmpzXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHZhciBpZCA9IG1hcFtyZXFdO1xuXHRpZighKGlkICsgMSkpIHsgLy8gY2hlY2sgZm9yIG51bWJlciBvciBzdHJpbmdcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIGlkO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZSBzeW5jIHJlY3Vyc2l2ZSBeXFxcXC5cXFxcLy4qJFwiOyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBDYWxlbmRhciBmcm9tICcuL2NvbXBvbmVudHMvQ2FsZW5kYXIvQ2FsZW5kYXInO1xyXG5pbXBvcnQgV2l6RXZlbnREYXRhTG9hZGVyIGZyb20gJy4vbW9kZWxzL1dpekV2ZW50RGF0YUxvYWRlcic7XHJcbmltcG9ydCBDYWxlbmRhckV2ZW50IGZyb20gJy4vbW9kZWxzL0NhbGVuZGFyRXZlbnQnO1xyXG5pbXBvcnQgRXZlbnRQb3BvdmVyIGZyb20gJy4vY29tcG9uZW50cy9FdmVudFBvcG92ZXIvRXZlbnRQb3BvdmVyJztcclxuaW1wb3J0IEV2ZW50Q3JlYXRlTW9kYWwgZnJvbSAnLi9jb21wb25lbnRzL01vZGFsL0V2ZW50Q3JlYXRlTW9kYWwnO1xyXG5pbXBvcnQgRXZlbnRFZGl0TW9kYWwgZnJvbSAnLi9jb21wb25lbnRzL01vZGFsL0V2ZW50RWRpdE1vZGFsJztcclxuaW1wb3J0IHsgcmdiMmhzbCB9IGZyb20gJy4vdXRpbHMvdXRpbHMnO1xyXG5pbXBvcnQgeyBXaXpDb25maXJtLCBXaXpEYXRhYmFzZSBhcyBvYmpEYXRhYmFzZSwgV2l6RXhwbG9yZXJXaW5kb3cgYXMgb2JqV2luZG93IH0gZnJvbSAnLi91dGlscy9XaXpJbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuZGF0YUxvYWRlciA9IG5ldyBXaXpFdmVudERhdGFMb2FkZXIoKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGlzU2hvd2luZ0V2ZW50OiBmYWxzZSxcclxuICAgICAgICAgICAgaXNFZGl0aW5nRXZlbnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBpc0NyZWF0aW5nRXZlbnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBjbGlja2VkQXJnczogbnVsbCxcclxuICAgICAgICAgICAgZWRpdGluZ0V2ZW50OiBudWxsLFxyXG4gICAgICAgICAgICBzZWxlY3RlZFJhbmdlOiBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5oYW5kbGVDYWxlbmRhclJlbmRlciA9IHRoaXMuaGFuZGxlQ2FsZW5kYXJSZW5kZXIuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUV2ZW50Q2xpY2sgPSB0aGlzLmhhbmRsZUV2ZW50Q2xpY2suYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZVZpZXdSZW5kZXIgPSB0aGlzLmhhbmRsZVZpZXdSZW5kZXIuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUV2ZW50RHJvcCA9IHRoaXMuaGFuZGxlRXZlbnREcm9wLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVFdmVudFJlc2l6ZSA9IHRoaXMuaGFuZGxlRXZlbnRSZXNpemUuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUV2ZW50UmVuZGVyID0gdGhpcy5oYW5kbGVFdmVudFJlbmRlci5iaW5kKHRoaXMpO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5oYW5kbGVQb3BvdmVySGlkZSA9IHRoaXMuaGFuZGxlUG9wb3ZlckhpZGUuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZURhdGVTZWxlY3QgPSB0aGlzLmhhbmRsZURhdGVTZWxlY3QuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZU1vZGFsQ2xvc2UgPSB0aGlzLmhhbmRsZU1vZGFsQ2xvc2UuYmluZCh0aGlzKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuaGFuZGxlRXZlbnRDcmVhdGUgPSB0aGlzLmhhbmRsZUV2ZW50Q3JlYXRlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVFdmVudFNhdmUgPSB0aGlzLmhhbmRsZUV2ZW50U2F2ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlRXZlbnRFZGl0ID0gdGhpcy5oYW5kbGVFdmVudEVkaXQuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUV2ZW50Q29tcGxldGUgPSB0aGlzLmhhbmRsZUV2ZW50Q29tcGxldGUuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUV2ZW50RGVsZXRlRGF0YSA9IHRoaXMuaGFuZGxlRXZlbnREZWxldGVEYXRhLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVFdmVudERlbGV0ZURvYyA9IHRoaXMuaGFuZGxlRXZlbnREZWxldGVEb2MuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUV2ZW50T3BlbkRvYyA9IHRoaXMuaGFuZGxlRXZlbnRPcGVuRG9jLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVFdmVudEVkaXRPcmlnaW5EYXRhID0gdGhpcy5oYW5kbGVFdmVudEVkaXRPcmlnaW5EYXRhLmJpbmQodGhpcyk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLy8g5aSE55CGRnVsbENhbGVuZGFy5LqL5Lu2XHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICBoYW5kbGVDYWxlbmRhclJlbmRlcihlbCkge1xyXG4gICAgICAgIC8vIOiOt+W+l0RPTeWFg+e0oOeUqOS6juaTjeS9nEZ1bGxDYWxlbmRhclxyXG4gICAgICAgIHRoaXMuY2FsZW5kYXIgPSBlbDtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVFdmVudENsaWNrKCBldmVudCwganNFdmVudCwgdmlldyApIHtcclxuICAgICAgICBjb25zdCBhcmdzID0geyBldmVudCwganNFdmVudCwgdmlldyB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGlzU2hvd2luZ0V2ZW50OiB0cnVlLFxyXG4gICAgICAgICAgICBjbGlja2VkQXJnczogYXJnc1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlVmlld1JlbmRlciggdmlldywgZWxlbWVudCApIHtcclxuICAgICAgICAvLyDliLfmlrDop4blm77vvIzph43mlrDojrflj5bml6Xljobkuovku7ZcclxuICAgICAgICBjb25zdCAkY2FsZW5kYXIgPSAkKHRoaXMuY2FsZW5kYXIpO1xyXG4gICAgICAgIGNvbnN0IGV2ZW50U291cmNlcyA9IHRoaXMuZGF0YUxvYWRlci5nZXRFdmVudFNvdXJjZXMoIHZpZXcsIGVsZW1lbnQgKTtcclxuICAgICAgICAkY2FsZW5kYXIuZnVsbENhbGVuZGFyKCdyZW1vdmVFdmVudHMnKTtcclxuICAgICAgICBmb3IgKGxldCBpPTAgOyBpIDwgZXZlbnRTb3VyY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICRjYWxlbmRhci5mdWxsQ2FsZW5kYXIoJ2FkZEV2ZW50U291cmNlJywgZXZlbnRTb3VyY2VzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlRXZlbnREcm9wKCBldmVudCwgZGVsdGEsIHJldmVydEZ1bmMsIGpzRXZlbnQsIHVpLCB2aWV3ICkge1xyXG4gICAgICAgIGlmIChldmVudC5pZCl7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YUxvYWRlci51cGRhdGVFdmVudERhdGFPbkRyb3AoZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXZlcnRGdW5jKCk7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlRXZlbnRSZXNpemUoIGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXcgKSB7XHJcbiAgICAgICAgaWYgKGV2ZW50LmlkKXtcclxuICAgICAgICAgICAgdGhpcy5kYXRhTG9hZGVyLnVwZGF0ZUV2ZW50RGF0YU9uUmVzaXplKGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldmVydEZ1bmMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlRXZlbnRSZW5kZXIoIGV2ZW50T2JqLCAkZWwgKSB7XHJcbiAgICAgICAgLy8g6K6+572u5paH5pys6aKc6ImyXHJcbiAgICAgICAgY29uc3QgcmdiU3RyaW5nID0gJGVsLmNzcygnYmFja2dyb3VuZC1jb2xvcicpO1xyXG4gICAgICAgIGNvbnN0IHJnYkFycmF5ID0gL15yZ2JcXCgoXFxkKiksIChcXGQqKSwgKFxcZCopXFwpJC8uZXhlYyhyZ2JTdHJpbmcpO1xyXG4gICAgICAgIGlmIChyZ2JBcnJheSkge1xyXG4gICAgICAgICAgICBjb25zdCBoc2wgPSByZ2IyaHNsKHJnYkFycmF5WzFdLCByZ2JBcnJheVsyXSwgcmdiQXJyYXlbM10pO1xyXG4gICAgICAgICAgICBjb25zdCBsaWdodG5lc3MgPSBoc2xbMl0gLSBNYXRoLmNvcyggKGhzbFswXSs3MCkgLyAxODAqTWF0aC5QSSApICogMC4xNTtcclxuICAgICAgICAgICAgY29uc3QgdGV4dENvbG9yID0gbGlnaHRuZXNzID4gMC41ID8gJyMyMjInIDogJ3doaXRlJztcclxuICAgICAgICAgICAgJGVsLmNzcygnY29sb3InLCB0ZXh0Q29sb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDlhYPntKDlt7Lnu4/muLLmn5PvvIzlj6/kv67mlLnlhYPntKBcclxuICAgICAgICBjb25zdCBpc0NvbXBsZXRlID0gcGFyc2VJbnQoZXZlbnRPYmouY29tcGxldGUpID09IDU7XHJcbiAgICAgICAgaWYgKCBpc0NvbXBsZXRlICkge1xyXG4gICAgICAgICAgICAvLyDmoLflvI9cclxuICAgICAgICAgICAgJGVsLmFkZENsYXNzKCd0Yy1jb21wbGV0ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDlpITnkIbnlKjmiLfkuovku7ZcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIGhhbmRsZVBvcG92ZXJIaWRlKCkge1xyXG4gICAgICAgIC8v5q+P5qyh5Ye6546w6YO95riy5p+T5LiA5Liq5paw55qEUG9wb3ZlclxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBpc1Nob3dpbmdFdmVudDogZmFsc2VcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZURhdGVTZWxlY3QoIHN0YXJ0LCBlbmQsIGpzRXZlbnQsIHZpZXcgKSB7XHJcbiAgICAgICAgY29uc3QgYXJncyA9IHtzdGFydCwgZW5kLCBqc0V2ZW50LCB2aWV3fTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgaXNDcmVhdGluZ0V2ZW50OiB0cnVlLFxyXG4gICAgICAgICAgICBzZWxlY3RlZFJhbmdlOiBhcmdzXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVNb2RhbENsb3NlKCkge1xyXG4gICAgICAgIGNvbnN0ICRjYWxlbmRhciA9ICQodGhpcy5jYWxlbmRhcik7XHJcbiAgICAgICAgJGNhbGVuZGFyLmZ1bGxDYWxlbmRhcigndW5zZWxlY3QnKVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGlzRWRpdGluZ0V2ZW50OiBmYWxzZSxcclxuICAgICAgICAgICAgaXNDcmVhdGluZ0V2ZW50OiBmYWxzZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOWkhOeQhuaMiemSruWKn+iDvVxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgaGFuZGxlRXZlbnRDcmVhdGUoZXZlbnREYXRhKSB7XHJcbiAgICAgICAgbGV0IHsgc3RhcnQsIGVuZCwgYWxsRGF5LCB0aXRsZSwgYmFja2dyb3VuZENvbG9yLCBycHRSdWxlIH0gPSBldmVudERhdGE7XHJcbiAgICAgICAgY29uc3QgbW9tZW50ID0gdGhpcy5mdWxsQ2FsZW5kYXIubW9tZW50LmJpbmQodGhpcy5mdWxsQ2FsZW5kYXIpO1xyXG4gICAgICAgIC8vIOWkhOeQhuaXpeeoi+aVsOaNrlxyXG4gICAgICAgIHN0YXJ0ID0gbW9tZW50KHN0YXJ0KSwgZW5kID0gbW9tZW50KGVuZCk7XHJcbiAgICAgICAgYWxsRGF5ID0gISggc3RhcnQuaGFzVGltZSgpICYmIGVuZC5oYXNUaW1lKCkgKTtcclxuICAgICAgICAvLyDmlrDlu7rml6XnqItcclxuICAgICAgICBjb25zdCBuZXdFdmVudCA9IG5ldyBDYWxlbmRhckV2ZW50KHtcclxuICAgICAgICAgICAgdGl0bGU6IHRpdGxlIHx8ICfml6DmoIfpopgnLCBcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBiYWNrZ3JvdW5kQ29sb3IgfHwgJyMzMkNEMzInLFxyXG4gICAgICAgICAgICBzdGFydCwgZW5kLCBhbGxEYXksIHJwdFJ1bGVcclxuICAgICAgICB9KTtcclxuICAgICAgICBuZXdFdmVudC5zYXZlVG9XaXpFdmVudERvYygpO1xyXG4gICAgICAgIC8vIOa3u+WKoOWIsOaXpeWOhlxyXG5cdFx0JCh0aGlzLmNhbGVuZGFyKS5mdWxsQ2FsZW5kYXIoICdhZGRFdmVudFNvdXJjZScsIHtcclxuXHRcdFx0ZXZlbnRzOiBbXHJcblx0XHRcdFx0bmV3RXZlbnQudG9GdWxsQ2FsZW5kYXJFdmVudCgpXHJcblx0XHRcdF1cclxuXHRcdH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUV2ZW50U2F2ZShldmVudCwgbmV3RXZlbnREYXRhKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBwcm9wIGluIG5ld0V2ZW50RGF0YSkge1xyXG4gICAgICAgICAgICBldmVudFtwcm9wXSA9IG5ld0V2ZW50RGF0YVtwcm9wXVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBuZXdFdmVudCA9IG5ldyBDYWxlbmRhckV2ZW50KGV2ZW50KTtcclxuICAgICAgICBuZXdFdmVudC5zYXZlVG9XaXpFdmVudERvYygpO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgJCh0aGlzLmNhbGVuZGFyKS5mdWxsQ2FsZW5kYXIoICd1cGRhdGVFdmVudCcsIGV2ZW50ICk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlRXZlbnRDb21wbGV0ZShldmVudCkge1xyXG4gICAgICAgIC8vIOS/ruaUueaVsOaNrlxyXG4gICAgICAgIGNvbnN0IGlzQ29tcGxldGUgPSBwYXJzZUludChldmVudC5jb21wbGV0ZSkgPT0gNTtcclxuICAgICAgICBpZiAoIGlzQ29tcGxldGUgKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LmNvbXBsZXRlID0gJzAnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGV2ZW50LmNvbXBsZXRlID0gJzUnO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDkv53lrZjmlbDmja5cclxuICAgICAgICBjb25zdCBuZXdFdmVudCA9IG5ldyBDYWxlbmRhckV2ZW50KGV2ZW50KTtcclxuICAgICAgICBuZXdFdmVudC5zYXZlVG9XaXpFdmVudERvYygpO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgJCh0aGlzLmNhbGVuZGFyKS5mdWxsQ2FsZW5kYXIoICd1cGRhdGVFdmVudCcsIGV2ZW50ICk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlRXZlbnRFZGl0KGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGlzRWRpdGluZ0V2ZW50OiB0cnVlLFxyXG4gICAgICAgICAgICBlZGl0aW5nRXZlbnQ6IGV2ZW50XHJcbiAgICAgICAgfSkgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUV2ZW50RGVsZXRlRGF0YShldmVudCkge1xyXG4gICAgICAgIGlmICggV2l6Q29uZmlybShcIuehruWumuimgeWIoOmZpOivpeaXpeeoi++8n1wiLCAn55Wq6IyE5Yqp55CGJykgKSB7XHJcbiAgICAgICAgICAgIC8vIOWIoOmZpOaXpeeoi1xyXG4gICAgICAgICAgICBsZXQgbmV3RXZlbnQgPSBuZXcgQ2FsZW5kYXJFdmVudChldmVudCk7XHJcbiAgICAgICAgICAgIG5ld0V2ZW50LmRlbGV0ZUV2ZW50RGF0YShmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cdFx0JCh0aGlzLmNhbGVuZGFyKS5mdWxsQ2FsZW5kYXIoJ3JlbW92ZUV2ZW50cycsIGV2ZW50LmlkKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVFdmVudERlbGV0ZURvYyhldmVudCkge1xyXG4gICAgICAgIGlmICggV2l6Q29uZmlybShcIuehruWumuimgeWIoOmZpOivpeaXpeeoi+a6kOaWh+aho++8n1xcbuOAjOehruWumuOAjeWwhuS8muWvvOiHtOebuOWFs+eslOiusOiiq+WIoOmZpO+8gVwiLCAn55Wq6IyE5Yqp55CGJykgKSB7XHJcbiAgICAgICAgICAgIGxldCBuZXdFdmVudCA9IG5ldyBDYWxlbmRhckV2ZW50KGV2ZW50KTtcclxuICAgICAgICAgICAgbmV3RXZlbnQuZGVsZXRlRXZlbnREYXRhKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkKHRoaXMuY2FsZW5kYXIpLmZ1bGxDYWxlbmRhcigncmVtb3ZlRXZlbnRzJywgZXZlbnQuaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUV2ZW50T3BlbkRvYyhldmVudCkge1xyXG4gICAgICAgIGNvbnN0IGRvYyA9IG9iakRhdGFiYXNlLkRvY3VtZW50RnJvbUdVSUQoZXZlbnQuaWQpO1xyXG4gICAgICAgIG9ialdpbmRvdy5WaWV3RG9jdW1lbnQoZG9jLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVFdmVudEVkaXRPcmlnaW5EYXRhKGV2ZW50KSB7XHJcbiAgICAgICAgY29uc3QgZG9jID0gb2JqRGF0YWJhc2UuRG9jdW1lbnRGcm9tR1VJRChldmVudC5pZCk7XHJcbiAgICAgICAgb2JqQ29tbW9uLkVkaXRDYWxlbmRhckV2ZW50KGRvYyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g55Sf5ZG95ZGo5pyfXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICB0aGlzLmZ1bGxDYWxlbmRhciA9ICQodGhpcy5jYWxlbmRhcikuZnVsbENhbGVuZGFyKCdnZXRDYWxlbmRhcicpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBpZD0nd2l6LXRvbWF0by1jYWxlbmRhcicgPlxyXG4gICAgICAgICAgICAgICAgPENhbGVuZGFyIFxyXG4gICAgICAgICAgICAgICAgICAgIG9uRXZlbnRDbGljaz17dGhpcy5oYW5kbGVFdmVudENsaWNrfSBcclxuICAgICAgICAgICAgICAgICAgICBvblZpZXdSZW5kZXI9e3RoaXMuaGFuZGxlVmlld1JlbmRlcn1cclxuICAgICAgICAgICAgICAgICAgICBvbkV2ZW50RHJvcD17dGhpcy5oYW5kbGVFdmVudERyb3B9XHJcbiAgICAgICAgICAgICAgICAgICAgb25FdmVudFJlc2l6ZT17dGhpcy5oYW5kbGVFdmVudFJlc2l6ZX1cclxuICAgICAgICAgICAgICAgICAgICBvbkV2ZW50UmVuZGVyPXt0aGlzLmhhbmRsZUV2ZW50UmVuZGVyfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLmhhbmRsZURhdGVTZWxlY3R9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DYWxlbmRhclJlbmRlcj17dGhpcy5oYW5kbGVDYWxlbmRhclJlbmRlcn1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgISF0aGlzLnN0YXRlLnNlbGVjdGVkUmFuZ2UgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgPEV2ZW50Q3JlYXRlTW9kYWwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9eydjcmVhdGUnICsgdGhpcy5zdGF0ZS5zZWxlY3RlZFJhbmdlLmpzRXZlbnQucGFnZVh9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93PXt0aGlzLnN0YXRlLmlzQ3JlYXRpbmdFdmVudH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uTW9kYWxDbG9zZT17dGhpcy5oYW5kbGVNb2RhbENsb3NlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsZW5kYXI9e3RoaXMuY2FsZW5kYXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0NyZWF0aW5nRXZlbnQ9e3RoaXMuc3RhdGUuaXNDcmVhdGluZ0V2ZW50fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRSYW5nZT17dGhpcy5zdGF0ZS5zZWxlY3RlZFJhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25FdmVudENyZWF0ZT17dGhpcy5oYW5kbGVFdmVudENyZWF0ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAhIXRoaXMuc3RhdGUuZWRpdGluZ0V2ZW50ICYmIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8RXZlbnRFZGl0TW9kYWwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9eydlZGl0JyArIHRoaXMuc3RhdGUuZWRpdGluZ0V2ZW50LmlkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvdz17dGhpcy5zdGF0ZS5pc0VkaXRpbmdFdmVudH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uTW9kYWxDbG9zZT17dGhpcy5oYW5kbGVNb2RhbENsb3NlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdGluZ0V2ZW50PXt0aGlzLnN0YXRlLmVkaXRpbmdFdmVudH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkV2ZW50U2F2ZT17dGhpcy5oYW5kbGVFdmVudFNhdmV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkV2ZW50Q29tcGxldGU9e3RoaXMuaGFuZGxlRXZlbnRDb21wbGV0ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRXZlbnREZWxldGVEYXRhPXt0aGlzLmhhbmRsZUV2ZW50RGVsZXRlRGF0YX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRXZlbnREZWxldGVEb2M9e3RoaXMuaGFuZGxlRXZlbnREZWxldGVEb2N9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkV2ZW50T3BlbkRvYz17dGhpcy5oYW5kbGVFdmVudE9wZW5Eb2N9ICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkV2ZW50RWRpdE9yaWdpbkRhdGE9e3RoaXMuaGFuZGxlRXZlbnRFZGl0T3JpZ2luRGF0YX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAhIXRoaXMuc3RhdGUuaXNTaG93aW5nRXZlbnQgJiYgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxFdmVudFBvcG92ZXIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9eydwb3BvdmVyJyArIHRoaXMuc3RhdGUuY2xpY2tlZEFyZ3MuZXZlbnQuaWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudD17dGhpcy5zdGF0ZS5jbGlja2VkQXJncy5ldmVudH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZmVyZW5jZT17dGhpcy5zdGF0ZS5jbGlja2VkQXJncy5qc0V2ZW50LnRhcmdldH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uUG9wb3ZlckhpZGU9e3RoaXMuaGFuZGxlUG9wb3ZlckhpZGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25FdmVudFNhdmU9e3RoaXMuaGFuZGxlRXZlbnRTYXZlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25FdmVudENvbXBsZXRlPXt0aGlzLmhhbmRsZUV2ZW50Q29tcGxldGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkV2ZW50RWRpdD17dGhpcy5oYW5kbGVFdmVudEVkaXR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkV2ZW50RGVsZXRlRGF0YT17dGhpcy5oYW5kbGVFdmVudERlbGV0ZURhdGF9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkV2ZW50RGVsZXRlRG9jPXt0aGlzLmhhbmRsZUV2ZW50RGVsZXRlRG9jfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25FdmVudE9wZW5Eb2M9e3RoaXMuaGFuZGxlRXZlbnRPcGVuRG9jfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPiBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuIiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vQ2FsZW5kYXIuY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL0NhbGVuZGFyLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vQ2FsZW5kYXIuY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEZ1bGxDYWxlbmRhciBmcm9tICcuL0Z1bGxDYWxlbmRhcic7XHJcbmltcG9ydCAnZnVsbGNhbGVuZGFyLXJlYWN0d3JhcHBlci9kaXN0L2Nzcy9mdWxsY2FsZW5kYXIubWluLmNzcyc7XHJcbmltcG9ydCAnLi9DYWxlbmRhci5jc3MnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FsZW5kYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgZXZlbnRzOiBbXVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNhbGVuZGFyID0gbnVsbDtcclxuICAgICAgICAvL+e7keWumuWPpeafhFxyXG4gICAgICAgIHRoaXMuaGFuZGxlRnVsbENhbGVuZGFyUmVuZGVyID0gdGhpcy5oYW5kbGVGdWxsQ2FsZW5kYXJSZW5kZXIuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDkuovku7blj6Xmn4RcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIGhhbmRsZUZ1bGxDYWxlbmRhclJlbmRlcihlbCkge1xyXG4gICAgICAgIC8vIEZ1bGxDYWxlbmRhciDmuLLmn5PkuYvliY3miafooYzmraTlj6Xmn4TvvIzkvKDlhaVET01cclxuICAgICAgICB0aGlzLmNhbGVuZGFyID0gZWw7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNhbGVuZGFyUmVuZGVyKGVsKTtcclxuICAgIH1cclxuIFxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiuvue9ruS6i+S7tuWPpeafhFxyXG4gICAgICAgICAqIOWboOS4umZ1bGxjYWxlbmRhci1yZWFjdFdyYXBwZXLnmoTlrp7njrDmmK/nm7TmjqXov5Tlm548ZGl2IGlkPSdmdWxsY2FsZW5kYXInPjwvZGl2PlxyXG4gICAgICAgICAqIOW5tuS4lOiwg+eUqCQoJyNmdWxsY2FsZW5kYXInKS5mdWxsY2FsZW5kYXIodGhpcy5wcm9wcynov5vooYzmnoTlu7rvvIzlm6DmraRSZWFjdOW5tuayoeaciVxyXG4gICAgICAgICAqIOeuoeeQhkZ1bGxDYWxlbmRhcueKtuaAgeWSjOa4suafk+eahOiDveWKm+OAguaJgOS7peebtOaOpeWcqOiuvue9ruS4reWBmuWlvWNhbGxiYWNr77yM6K6p5o+S5Lu26Ieq5oiR566h55CG44CCXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBpZD1cImNhbGVuZGFyLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgPEZ1bGxDYWxlbmRhciBvbkZ1bGxDYWxlbmRhclJlbmRlciA9IHt0aGlzLmhhbmRsZUZ1bGxDYWxlbmRhclJlbmRlcn1cclxuICAgICAgICAgICAgICAgICAgICAvLyDln7rmnKzphY3nva5cclxuICAgICAgICAgICAgICAgICAgICBpZCA9IFwiY2FsZW5kYXJcIlxyXG4gICAgICAgICAgICAgICAgICAgIHRoZW1lU3lzdGVtID0gJ3N0YW5kYXJkJ1xyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodCA9ICdwYXJlbnQnXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyID0ge3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogJ3ByZXYsbmV4dCx0b2RheScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbnRlcjogJ3RpdGxlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6ICdtb250aCxhZ2VuZGFXZWVrLGFnZW5kYURheSxsaXN0V2VlaydcclxuICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOS4reaWh+WMllxyXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvblRleHQgPSB7e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2RheTogJ+S7iuWkqScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnRoOiAn5pyIJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2VlazogJ+WRqCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheTogJ+aXpScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3Q6ICfooagnXHJcbiAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICBtb250aE5hbWVzID0ge1tcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzHmnIgnLCAnMuaciCcsICcz5pyIJywgJzTmnIgnLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzXmnIgnLCAnNuaciCcsICc35pyIJywgJzjmnIgnLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgJznmnIgnLCAnMTDmnIgnLCAnMTHmnIgnLCAnMTLmnIgnXHJcbiAgICAgICAgICAgICAgICAgICAgXX1cclxuICAgICAgICAgICAgICAgICAgICBtb250aE5hbWVzU2hvcnQgPSB7W1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnMeaciCcsICcy5pyIJywgJzPmnIgnLCAnNOaciCcsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnNeaciCcsICc25pyIJywgJzfmnIgnLCAnOOaciCcsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnOeaciCcsICcxMOaciCcsICcxMeaciCcsICcxMuaciCdcclxuICAgICAgICAgICAgICAgICAgICBdfVxyXG4gICAgICAgICAgICAgICAgICAgIGRheU5hbWVzID0ge1tcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ+WRqOaXpScsICflkajkuIAnLCAn5ZGo5LqMJywgJ+WRqOS4iScsICflkajlm5snLCAn5ZGo5LqUJywgJ+WRqOWFrSdcclxuICAgICAgICAgICAgICAgICAgICBdfVxyXG4gICAgICAgICAgICAgICAgICAgIGRheU5hbWVzU2hvcnQgPSB7W1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAn5ZGo5pelJywgJ+WRqOS4gCcsICflkajkuownLCAn5ZGo5LiJJywgJ+WRqOWbmycsICflkajkupQnLCAn5ZGo5YWtJ1xyXG4gICAgICAgICAgICAgICAgICAgIF19XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsRGF5VGV4dCA9ICflhajlpKknXHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6K6+572u6KeG5Zu+XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZpZXcgPSAnYWdlbmRhV2VlaydcclxuICAgICAgICAgICAgICAgICAgICBub3dJbmRpY2F0b3IgPSB7dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICBmaXJzdERheSA9IHsxfVxyXG4gICAgICAgICAgICAgICAgICAgIHZpZXdzID0ge3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWdlbmRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5UaW1lOiBcIjA4OjAwOjAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbG90TGFiZWxGb3JtYXQ6ICdoKDptbSkgYSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICBuYXZMaW5rcz0ge3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsRGF5RGVmYXVsdCA9IHtmYWxzZX1cclxuICAgICAgICAgICAgICAgICAgICBldmVudExpbWl0PSB7dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICAvLyDorr7nva7kuovku7ZcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RhYmxlID0ge3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0SGVscGVyID0ge3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdGFibGUgPSB7dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICBmb3JjZUV2ZW50RHVyYXRpb24gPSB7dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICAvLyDorr7nva5VSVxyXG4gICAgICAgICAgICAgICAgICAgIHVuc2VsZWN0Q2FuY2VsID0gJy5tb2RhbCAqJ1xyXG4gICAgICAgICAgICAgICAgICAgIGRyYWdPcGFjaXR5ID0ge3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJtb250aFwiOiAuNSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhZ2VuZGFXZWVrXCI6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWdlbmRhRGF5XCI6IDFcclxuICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOiuvue9ruWPpeafhFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdCA9IHt0aGlzLnByb3BzLm9uU2VsZWN0fVxyXG4gICAgICAgICAgICAgICAgICAgIHZpZXdSZW5kZXIgPSB7dGhpcy5wcm9wcy5vblZpZXdSZW5kZXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRSZW5kZXIgPSB7dGhpcy5wcm9wcy5vbkV2ZW50UmVuZGVyfVxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50Q2xpY2sgPSB7dGhpcy5wcm9wcy5vbkV2ZW50Q2xpY2t9XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnREcm9wID0ge3RoaXMucHJvcHMub25FdmVudERyb3B9XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRSZXNpemUgPSB7dGhpcy5wcm9wcy5vbkV2ZW50UmVzaXplfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAkIGZyb20gXCJqcXVlcnlcIjtcclxuaW1wb3J0ICdmdWxsY2FsZW5kYXInO1xyXG5pbXBvcnQgJ21vbWVudCc7XHJcblxyXG5jbGFzcyBGdWxsY2FsZW5kYXJPYmplY3RNYXBwZXJ7XHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHJcblx0fVxyXG5cclxuXHRnZXRTZXR0aW5ncyhwcm9wZXJ0aWVzKXtcclxuXHRcdGxldCBuZXdTZXR0aW5ncyA9IHt9O1xyXG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gcHJvcGVydGllcykge1xyXG4gICAgICBcdFx0aWYgKHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgIFx0XHRuZXdTZXR0aW5nc1trZXldID0gcHJvcGVydGllc1trZXldO1xyXG4gICAgICBcdFx0fVxyXG4gICAgXHR9XHJcbiAgICBcdHJldHVybiBuZXdTZXR0aW5ncztcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZ1bGxDYWxlbmRhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMuanEgPSAkLm5vQ29uZmxpY3QoKTtcclxuXHRcdHRoaXMuZnVsbGNhbGVuZGFyT2JqZWN0TWFwcGVyID0gbmV3IEZ1bGxjYWxlbmRhck9iamVjdE1hcHBlcigpO1xyXG5cdFx0dGhpcy5pbnN0YW5jZSA9IG51bGw7XHJcblx0XHR0aGlzLmRhdGUgPSBuZXcgRGF0ZSgpO1xyXG5cdH1cclxuXHJcblx0Y29tcG9uZW50RGlkTW91bnQoKXtcclxuXHRcdHRoaXMucHJvcHMub25GdWxsQ2FsZW5kYXJSZW5kZXIodGhpcy5lbCk7XHJcblx0XHRjb25zdCBvYmplY3RNYXBwZXJTZXR0aW5ncyA9IHRoaXMuZnVsbGNhbGVuZGFyT2JqZWN0TWFwcGVyLmdldFNldHRpbmdzKHRoaXMucHJvcHMpO1xyXG5cdFx0dGhpcy5pbnN0YW5jZSA9IHRoaXMuanEodGhpcy5lbCkuZnVsbENhbGVuZGFyKG9iamVjdE1hcHBlclNldHRpbmdzKTtcclxuXHR9XHJcblxyXG5cdHJlbmRlcigpe1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgaWQ9J2NhbGVuZGFyJyByZWY9eyBlbCA9PiB0aGlzLmVsID0gZWwgfT48L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9FdmVudFBvcG92ZXIuY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL0V2ZW50UG9wb3Zlci5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL0V2ZW50UG9wb3Zlci5jc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgJy4vRXZlbnRQb3BvdmVyLmNzcyc7XHJcbmltcG9ydCBQb3BwZXIgZnJvbSAncG9wcGVyLmpzJztcclxuaW1wb3J0IFBvcG92ZXJUaXRsZUlucHV0IGZyb20gJy4vUG9wb3ZlclRpdGxlSW5wdXQnO1xyXG5pbXBvcnQgUG9wb3ZlclRvb2xiYXIgZnJvbSAnLi9Qb3BvdmVyVG9vbGJhcic7XHJcbmltcG9ydCB7IEZvcm0sIEdseXBoaWNvbiB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcbmltcG9ydCBEYXRlVGltZVBpY2tlckdyb3VwIGZyb20gJy4uL0Zvcm0vRGF0ZVRpbWVQaWNrZXJHcm91cCc7XHJcbmltcG9ydCBDb2xvclBpY2tlckdyb3VwIGZyb20gJy4uL0Zvcm0vQ29sb3JQaWNrZXJHcm91cCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudFBvcG92ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5wb3BwZXJOb2RlID0gbnVsbDtcclxuICAgICAgICB0aGlzLnBvcHBlckluc3RhbmNlID0gbnVsbDtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIG5ld0V2ZW50RGF0YToge31cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g57uR5a6a5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5hdXRvSGlkZSA9IHRoaXMuYXV0b0hpZGUuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZURhdGVUaW1lQ2hhbmdlID0gdGhpcy5oYW5kbGVEYXRlVGltZUNoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlVGl0bGVDaGFuZ2UgPSB0aGlzLmhhbmRsZVRpdGxlQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVDb2xvckNoYW5nZSA9IHRoaXMuaGFuZGxlQ29sb3JDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUJ0bkNsaWNrID0gdGhpcy5oYW5kbGVCdG5DbGljay5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOWKqOeUu+aViOaenFxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgYXV0b0hpZGUoZSkge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgLy8g5LiN5piv5pel5Y6G5LqL5Lu25YWD57SgXHJcbiAgICAgICAgICAgICEkKHRoaXMucHJvcHMucmVmZXJlbmNlKS5pcyhlLnRhcmdldCkgJiZcclxuICAgICAgICAgICAgLy8g5Lmf5LiN5piv5a2Q5YWD57SgXHJcbiAgICAgICAgICAgICQodGhpcy5wcm9wcy5yZWZlcmVuY2UpLmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwICYmXHJcbiAgICAgICAgICAgIC8vIOS4jeaYr3BvcHBlcuWFg+e0oFxyXG4gICAgICAgICAgICAhJCh0aGlzLnBvcHBlck5vZGUpLmlzKGUudGFyZ2V0KSAmJlxyXG4gICAgICAgICAgICAvLyDkuZ/kuI3mmK/lrZDlhYPntKBcclxuICAgICAgICAgICAgJCh0aGlzLnBvcHBlck5vZGUpLmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoaWRlKCkge1xyXG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xyXG4gICAgICAgICAgICAkKHRoYXQucG9wcGVyTm9kZSkuaGlkZSgwLCBudWxsLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgdGhhdC5wcm9wcy5vblBvcG92ZXJIaWRlKCk7IC8vVE9ETzog5Lqk55Sx54i25YWD57Sg5Y246L296K+l57uE5Lu25a6e5L6L77yM5oSf6KeJ6L+Z6YeM5LiN5aalXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc2hvdygpIHtcclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcclxuICAgICAgICAgICAgJCh0aGF0LnBvcHBlck5vZGUpLmZhZGVJbigzNTAsIG51bGwsIHJlc29sdmUpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8g5LqL5Lu25Y+l5p+EXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICBoYW5kbGVUaXRsZUNoYW5nZShlKSB7XHJcbiAgICAgICAgLy/lgqjlrZjliLDlsIbmlrDnmoTlgLzlgqjlrZhuZXdFdmVudERhdGHph4zvvIzlvZPkv53lrZjml7bmo4DntKJuZXdFdmVudERhdGHliJfooahcclxuICAgICAgICBjb25zdCBuZXdUaXRsZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoZnVuY3Rpb24ocHJldlN0YXRlLCBwcm9wcykge1xyXG4gICAgICAgICAgICAvL+aLt+i0neWJjeS4gOS4quWvueixoVxyXG4gICAgICAgICAgICBjb25zdCBuZXdFdmVudERhdGEgPSAkLmV4dGVuZCh7fSwgcHJldlN0YXRlLm5ld0V2ZW50RGF0YSlcclxuICAgICAgICAgICAgbmV3RXZlbnREYXRhLnRpdGxlID0gbmV3VGl0bGU7XHJcbiAgICAgICAgICAgIHJldHVybiB7IG5ld0V2ZW50RGF0YSB9O1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQ29sb3JDaGFuZ2UoY29sb3JWYWx1ZSkge1xyXG4gICAgICAgIGNvbnN0IG5ld0NvbG9yID0gY29sb3JWYWx1ZTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKGZ1bmN0aW9uKHByZXZTdGF0ZSwgcHJvcHMpIHtcclxuICAgICAgICAgICAgLy/mi7fotJ3liY3kuIDkuKrlr7nosaFcclxuICAgICAgICAgICAgY29uc3QgbmV3RXZlbnREYXRhID0gJC5leHRlbmQoe30sIHByZXZTdGF0ZS5uZXdFdmVudERhdGEpXHJcbiAgICAgICAgICAgIG5ld0V2ZW50RGF0YS5iYWNrZ3JvdW5kQ29sb3IgPSBuZXdDb2xvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHsgbmV3RXZlbnREYXRhIH07XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVEYXRlVGltZUNoYW5nZShlKSB7XHJcbiAgICAgICAgLy/mmoLml7bkuI3lhYHorrjmm7TmlLlcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVCdG5DbGljayhlKSB7XHJcbiAgICAgICAgY29uc3QgaWQgPSBlLnRhcmdldC5pZDtcclxuICAgICAgICBjb25zdCBidG5UeXBlID0gaWQuc3BsaXQoJy0nKVsyXTtcclxuICAgICAgICBjb25zdCBoYW5kbGVOYW1lID0gYG9uRXZlbnQke2J0blR5cGV9YDtcclxuICAgICAgICB0aGlzLmhpZGUoKS50aGVuKCAocmV0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHNbaGFuZGxlTmFtZV0odGhpcy5wcm9wcy5ldmVudCwgdGhpcy5zdGF0ZS5uZXdFdmVudERhdGEpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8g55Sf5ZG95ZGo5pyfXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICAvLyDliJ3lp4vljJbnu4Tku7ZcclxuICAgICAgICB0aGlzLnBvcHBlckluc3RhbmNlID0gbmV3IFBvcHBlcih0aGlzLnByb3BzLnJlZmVyZW5jZSwgdGhpcy5wb3BwZXJOb2RlLCB7XHJcblx0XHRcdHBsYWNlbWVudDogJ2F1dG8nLFxyXG5cdFx0XHRtb2RpZmllcnM6IHtcclxuXHRcdFx0XHRhcnJvdzoge1xyXG5cdFx0XHRcdCAgZWxlbWVudDogJy5hcnJvdydcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHR9KTtcclxuICAgICAgICAvLyDorr7nva7oh6rliqjpmpDol49cclxuICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ2NsaWNrJywgdGhpcy5hdXRvSGlkZSkub24oJ2NsaWNrJywgdGhpcy5hdXRvSGlkZSk7XHJcbiAgICAgICAgLy8g5pi+56S6XHJcbiAgICAgICAgdGhpcy5zaG93KCk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlLCBzbmFwc2hvdCkge1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5zaG93KCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XHJcbiAgICAgICAgLy8g5b2T5pu05paw5bGe5oCn5pe25omN6Kem5Y+R5Yqo55S75pWI5p6cXHJcbiAgICAgICAgaWYgKCBuZXh0UHJvcHMgIT0gdGhpcy5wcm9wcyApIHtcclxuICAgICAgICAgICAgLy8g6K6+572u5pu05paw5pe255qE5Yqo55S7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpLnRoZW4oIChyZXQpID0+IHtcclxuICAgICAgICAgICAgICAgIC8v5pu05paw5a6a5L2NXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvcHBlckluc3RhbmNlLnJlZmVyZW5jZSA9IG5leHRQcm9wcy5yZWZlcmVuY2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvcHBlckluc3RhbmNlLnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLnNob3coKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgJChkb2N1bWVudCkub2ZmKCdjbGljaycsIHRoaXMuYXV0b0hpZGUpO1xyXG4gICAgICAgIHRoaXMucG9wcGVySW5zdGFuY2UuZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCBldmVudFN0YXJ0ID0gdGhpcy5wcm9wcy5ldmVudC5zdGFydC5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuICAgICAgICBjb25zdCBjb2xvclZhbHVlID0gdGhpcy5wcm9wcy5ldmVudC5iYWNrZ3JvdW5kQ29sb3I7XHJcbiAgICAgICAgY29uc3QgZW5hYmxlU2F2ZUJ0biA9ICEhdGhpcy5zdGF0ZS5uZXdFdmVudERhdGEudGl0bGUgfHwgISF0aGlzLnN0YXRlLm5ld0V2ZW50RGF0YS5iYWNrZ3JvdW5kQ29sb3I7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0Yy1wb3BvdmVyXCJcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e2Rpc3BsYXk6ICdub25lJ319XHJcbiAgICAgICAgICAgICAgICAgICAgcmVmPXsoZGl2KSA9PiB0aGlzLnBvcHBlck5vZGUgPSBkaXZ9ID5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXJyb3dcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGMtcG9wb3Zlci1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8UG9wb3ZlclRpdGxlSW5wdXQgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleT17J3RpdGxlJyArIHRoaXMucHJvcHMuZXZlbnQuaWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50VGl0bGU9e3RoaXMucHJvcHMuZXZlbnQudGl0bGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uVGl0bGVDaGFuZ2U9e3RoaXMuaGFuZGxlVGl0bGVDaGFuZ2V9IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRGb3JtPSd0Yy1wb3BvdmVyLWV2ZW50LWVkaXRGb3JtJyAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRjLXBvcG92ZXItYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxGb3JtIGhvcml6b250YWwgaWQ9J3RjLXBvcG92ZXItZXZlbnQtZWRpdEZvcm0nPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8RGF0ZVRpbWVQaWNrZXJHcm91cCBob3Jpem9udGFsIHJlYWRPbmx5IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbElkPSAndGMtZWRpdHBvcHBlci1ldmVudGRhdGUnIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9ezxpIGNsYXNzTmFtZT0nZmFyIGZhLWNhbGVuZGFyLWFsdCBmYS1sZycgLz59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17ZXZlbnRTdGFydH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRGF0ZVRpbWVDaGFuZ2U9e3RoaXMuaGFuZGxlRGF0ZVRpbWVDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxDb2xvclBpY2tlckdyb3VwIGhvcml6b250YWwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9eydiYWNrZ3JvdW5kQ29sb3InICsgdGhpcy5wcm9wcy5ldmVudC5pZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xJZD0ndGMtZWRpdHBvcHBlci1ldmVudGNvbG9yJyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPXs8aSBjbGFzc05hbWU9J2ZhcyBmYS1wYWludC1icnVzaCBmYS1sZycgLz59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Y29sb3JWYWx1ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29sb3JDaGFuZ2U9e3RoaXMuaGFuZGxlQ29sb3JDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9Gb3JtPlxyXG4gICAgICAgICAgICAgICAgICAgIDxQb3BvdmVyVG9vbGJhclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZT17dGhpcy5wcm9wcy5ldmVudC5jb21wbGV0ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlU2F2ZUJ0bj17ZW5hYmxlU2F2ZUJ0bn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25CdG5DbGljaz17dGhpcy5oYW5kbGVCdG5DbGlja31cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9Qb3BvdmVyVGl0bGVJbnB1dC5jc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vUG9wb3ZlclRpdGxlSW5wdXQuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9Qb3BvdmVyVGl0bGVJbnB1dC5jc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgJy4vUG9wb3ZlclRpdGxlSW5wdXQuY3NzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50VGl0bGVJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgLy/liJ3lp4vljJbnirbmgIFcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5wcm9wcy5ldmVudFRpdGxlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2UgPSB0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNoYW5nZShlKSB7XHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogZS50YXJnZXQudmFsdWV9KVxyXG4gICAgICAgIC8v5bCG5LqL5Lu25Lyg6YCS5LiK5Y67XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblRpdGxlQ2hhbmdlKGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInRjLWVkaXRwb3BwZXItZXZlbnR0aXRsZVwiIFxyXG4gICAgICAgICAgICAgICAgaHRtbEZvcj17dGhpcy5wcm9wcy50YXJnZXRGb3JtfVxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdldmVudHRpdGxlJ1xyXG4gICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9XHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgeyBCdXR0b24sIEJ1dHRvbkdyb3VwLCBCdXR0b25Ub29sYmFyLCBTcGxpdEJ1dHRvbiwgRHJvcGRvd24sIE1lbnVJdGVtIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcG92ZXJUb29sYmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgLy9cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8QnV0dG9uVG9vbGJhcj5cclxuICAgICAgICAgICAgICAgIDxCdXR0b25Hcm91cD5cclxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGlkPSd0Yy1lZGl0cG9wcGVyLVNhdmUnIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQnRuQ2xpY2t9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshdGhpcy5wcm9wcy5lbmFibGVTYXZlQnRufT5cclxuICAgICAgICAgICAgICAgICAgICAgICAg5L+d5a2YXHJcbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBpZD0ndGMtZWRpdHBvcHBlci1Db21wbGV0ZSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5vbkJ0bkNsaWNrfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3BhcnNlSW50KHRoaXMucHJvcHMuY29tcGxldGUpID09IDUgPyAn5oGi5aSNJyA6ICflrozmiJAnfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b24gaWQ9J3RjLWVkaXRwb3BwZXItRWRpdCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5vbkJ0bkNsaWNrfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAg57yW6L6RXHJcbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBpZD0ndGMtZWRpdHBvcHBlci1EZWxldGVEYXRhJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQnRuQ2xpY2t9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICDliKDpmaRcclxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIDxEcm9wZG93biBpZD0ndGMtZWRpdHBvcHBlci1leHRyYScgcHVsbFJpZ2h0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8RHJvcGRvd24uVG9nZ2xlIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxEcm9wZG93bi5NZW51PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPE1lbnVJdGVtIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50S2V5PVwiMVwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPSd0Yy1lZGl0cG9wcGVyLU9wZW5Eb2MnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5vbkJ0bkNsaWNrfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDmiZPlvIDmupDmlofmoaNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTWVudUl0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TWVudUl0ZW0gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRLZXk9XCIyXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9J3RjLWVkaXRwb3BwZXItRGVsZXRlRG9jJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25CdG5DbGlja30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg5Yig6Zmk5rqQ5paH5qGjXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L01lbnVJdGVtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0Ryb3Bkb3duLk1lbnU+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9Ecm9wZG93bj5cclxuICAgICAgICAgICAgICAgIDwvQnV0dG9uR3JvdXA+XHJcbiAgICAgICAgICAgIDwvQnV0dG9uVG9vbGJhcj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIENvbnRyb2xMYWJlbCwgQ29sfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXV0b0Zvcm1Hcm91cCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IGlzSG9yaXpvbnRhbCA9IHRoaXMucHJvcHMuaG9yaXpvbnRhbDtcclxuICAgICAgICBpZiAoaXNIb3Jpem9udGFsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8Rm9ybUdyb3VwIGNvbnRyb2xJZD17dGhpcy5wcm9wcy5jb250cm9sSWR9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxDb2wgY29tcG9uZW50Q2xhc3M9e0NvbnRyb2xMYWJlbH0gc209ezJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJlbH1cclxuICAgICAgICAgICAgICAgICAgICA8L0NvbD5cclxuICAgICAgICAgICAgICAgICAgICA8Q29sIHNtPXsxMH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG4gICAgICAgICAgICAgICAgICAgIDwvQ29sPlxyXG4gICAgICAgICAgICAgICAgPC9Gb3JtR3JvdXA+XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPEZvcm1Hcm91cCBjb250cm9sSWQ9e3RoaXMucHJvcHMuY29udHJvbElkfT5cclxuICAgICAgICAgICAgICAgICAgICA8Q29udHJvbExhYmVsPnt0aGlzLnByb3BzLmxhYmVsfTwvQ29udHJvbExhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG4gICAgICAgICAgICAgICAgPC9Gb3JtR3JvdXA+ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBBdXRvRm9ybUdyb3VwIGZyb20gJy4vQXV0b0Zvcm1Hcm91cCc7XHJcbmNvbnN0IEh1ZWJlZSA9IHJlcXVpcmUoJ2h1ZWJlZS9kaXN0L2h1ZWJlZS5wa2dkJyk7IFxyXG5pbXBvcnQgJ2h1ZWJlZS9kaXN0L2h1ZWJlZS5jc3MnO1xyXG5cclxuY2xhc3MgQ29sb3JJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5wcm9wcy52YWx1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZSA9IHRoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQ2hhbmdlKGpzRXZlbnRPclZhbHVlKSB7XHJcbiAgICAgICAgbGV0IG5ld0NvbG9yVmFsdWU7XHJcbiAgICAgICAgaWYgKCB0eXBlb2YganNFdmVudE9yVmFsdWUgPT0gJ29iamVjdCcgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBqc0V2ZW50T3JWYWx1ZS50YXJnZXQudmFsdWV9KTtcclxuICAgICAgICAgICAgbmV3Q29sb3JWYWx1ZSA9IGpzRXZlbnRPclZhbHVlLnRhcmdldC52YWx1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKCB0eXBlb2YganNFdmVudE9yVmFsdWUgPT0gJ3N0cmluZycgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBqc0V2ZW50T3JWYWx1ZX0pO1xyXG4gICAgICAgICAgICBuZXdDb2xvclZhbHVlID0ganNFdmVudE9yVmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucHJvcHMub25Db2xvckNoYW5nZShuZXdDb2xvclZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvL1RPRE86IOagueaNrumlseWSjOW6puiuoeeul+Wtl+S9k+minOiJslxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIC8vIOWIneWni+WMlue7hOS7tlxyXG4gICAgICAgIHRoaXMuaHVlYmVlSW5zdGFuY2UgPSBuZXcgSHVlYmVlKHRoaXMuZWwsIHtcclxuICAgICAgICAgICAgc3RhdGljT3BlbjogZmFsc2UsIC8vIERpc3BsYXlzIG9wZW4gYW5kIHN0YXlzIG9wZW4uIFxyXG4gICAgICAgICAgICBzZXRUZXh0OiB0cnVlLCAvLyBTZXRzIGVsZW1lbnRz4oCZIHRleHQgdG8gY29sb3IuIOWwhuWOn+Wni+eahOaWh+acrOiuvue9ruiuvue9ruaIkOminOiJsuWAvC5cclxuICAgICAgICAgICAgc2V0QkdDb2xvcjogdHJ1ZSwgLy8gU2V0cyBlbGVtZW50c+KAmSBiYWNrZ3JvdW5kIGNvbG9yIHRvIGNvbG9yLlxyXG4gICAgICAgICAgICBodWVzOiAxMiwgLy8gTnVtYmVyIG9mIGh1ZXMgb2YgdGhlIGNvbG9yIGdyaWQuIEh1ZXMgYXJlIHNsaWNlcyBvZiB0aGUgY29sb3Igd2hlZWwuXHJcbiAgICAgICAgICAgIGh1ZTA6IDAsIC8vIFRoZSBmaXJzdCBodWUgb2YgdGhlIGNvbG9yIGdyaWQuIFxyXG4gICAgICAgICAgICBzaGFkZXM6IDUsIC8vIE51bWJlciBvZiBzaGFkZXMgb2YgY29sb3JzIGFuZCBzaGFkZXMgb2YgZ3JheSBiZXR3ZWVuIHdoaXRlIGFuZCBibGFjay4gXHJcbiAgICAgICAgICAgIHNhdHVyYXRpb25zOiAyLCAvLyBOdW1iZXIgb2Ygc2V0cyBvZiBzYXR1cmF0aW9uIG9mIHRoZSBjb2xvciBncmlkLlxyXG4gICAgICAgICAgICBub3RhdGlvbjogJ2hleCcsIC8vIFRleHQgc3ludGF4IG9mIGNvbG9ycyB2YWx1ZXMuXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZTogbnVsbCwgLy8gQ2xhc3MgYWRkZWQgdG8gSHVlYmVlIGVsZW1lbnQuIFVzZWZ1bCBmb3IgQ1NTLlxyXG4gICAgICAgICAgICBjdXN0b21Db2xvcnM6IFsgXHJcbiAgICAgICAgICAgICAgICAnIzMyQ0QzMicsICcjNTQ4NEVEJywgJyNBNEJERkUnLCBcclxuICAgICAgICAgICAgICAgICcjNDZENkRCJywgJyM3QUU3QkYnLCAnIzUxQjc0OScsXHJcbiAgICAgICAgICAgICAgICAnI0ZCRDc1QicsICcjRkZCODc4JywgJyNGRjg4N0MnLCBcclxuICAgICAgICAgICAgICAgICcjREMyMTI3JywgJyNEQkFERkYnLCAnI0UxRTFFMSdcdFxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy/liJ3lp4vljJbpopzoibJcclxuICAgICAgICB0aGlzLmh1ZWJlZUluc3RhbmNlLnNldENvbG9yKHRoaXMucHJvcHMudmFsdWUpO1xyXG4gICAgICAgIC8v55uR5ZCsaHVlYmVl6aKc6Imy6YCJ5oupXHJcbiAgICAgICAgdGhpcy5odWViZWVJbnN0YW5jZS5vbiggJ2NoYW5nZScsIHRoaXMuaGFuZGxlQ2hhbmdlKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcclxuICAgICAgICAvLyDmiYvliqjmm7TmlrB2YWx1ZVxyXG4gICAgICAgIHRoaXMuaHVlYmVlSW5zdGFuY2Uuc2V0Q29sb3IodGhpcy5zdGF0ZS52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgLy/ms6jmhI/vvIxodWViZWXmsqHmnIlkZXN0cm9555qE5pa55rOVXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9J2Zvcm0tY29udHJvbCcgXHJcbiAgICAgICAgICAgICAgICByZWY9e2VsID0+IHRoaXMuZWwgPSBlbH1cclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX0gLy/nm5HlkKzplK7nm5jovpPlhaVcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICApXHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xvclBpY2tlckdyb3VwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlID0gdGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDaGFuZ2UoY29sb3JWYWx1ZSkge1xyXG4gICAgICAgIC8v5ZCR5LiK5Lyg6YCSXHJcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNvbG9yQ2hhbmdlKGNvbG9yVmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7IGhvcml6b250YWwsIGNvbnRyb2xJZCwgbGFiZWx9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8QXV0b0Zvcm1Hcm91cCB7Li4ueyBob3Jpem9udGFsLCBjb250cm9sSWQsIGxhYmVsIH19PlxyXG4gICAgICAgICAgICAgICAgPENvbG9ySW5wdXQgey4uLnRoaXMucHJvcHN9Lz5cclxuICAgICAgICAgICAgPC9BdXRvRm9ybUdyb3VwPlxyXG4gICAgICAgIClcclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IHsgRm9ybUdyb3VwLCBDb250cm9sTGFiZWwsIENvbCwgRm9ybUNvbnRyb2wgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5pbXBvcnQgQXV0b0Zvcm1Hcm91cCBmcm9tICcuL0F1dG9Gb3JtR3JvdXAnO1xyXG5pbXBvcnQgJ21vbWVudCc7XHJcbmltcG9ydCAnYm9vdHN0cmFwL2pzL2NvbGxhcHNlJztcclxuaW1wb3J0ICdib290c3RyYXAvanMvdHJhbnNpdGlvbic7XHJcbmltcG9ydCAnZW9uYXNkYW4tYm9vdHN0cmFwLWRhdGV0aW1lcGlja2VyJztcclxuaW1wb3J0ICdlb25hc2Rhbi1ib290c3RyYXAtZGF0ZXRpbWVwaWNrZXIvYnVpbGQvY3NzL2Jvb3RzdHJhcC1kYXRldGltZXBpY2tlci5jc3MnO1xyXG5cclxuY2xhc3MgRGF0ZVRpbWVJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5wcm9wcy52YWx1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZSA9IHRoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQ2hhbmdlKGUpIHsgXHJcbiAgICAgICAgY29uc3QgbmV3RGF0ZVZhbHVlID0gZS5kYXRlLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IG5ld0RhdGVWYWx1ZX0pO1xyXG4gICAgICAgIC8vIOS8oOmAklxyXG4gICAgICAgIHRoaXMucHJvcHMub25EYXRlVGltZUNoYW5nZShuZXdEYXRlVmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIC8vIOWIneWni+WMlue7hOS7tlxyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJlYWRPbmx5KSB0aGlzLmVsLnJlYWRPbmx5ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLiRlbCA9ICQodGhpcy5lbCkuZGF0ZXRpbWVwaWNrZXIoe1xyXG4gICAgICAgICAgICBzaG93VG9kYXlCdXR0b246IHRydWUsXHJcbiAgICAgICAgICAgIGxvY2FsZTogJ3poLWNuJyxcclxuICAgICAgICAgICAgZm9ybWF0OiAnWVlZWS1NTS1ERCBISDptbTpzcydcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuaW5zdGFuY2UgPSB0aGlzLiRlbC5kYXRhKFwiRGF0ZVRpbWVQaWNrZXJcIik7XHJcbiAgICAgICAgLy8g5Yid5aeL5YyW5YC8XHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5kYXRlKHRoaXMucHJvcHMudmFsdWUpO1xyXG4gICAgICAgIC8vIOe7keWummNoYW5nZeS6i+S7tlxyXG4gICAgICAgIC8vIOaUvuWcqOWIneWni+WMluWQjui/m+ihjOe7keWumu+8jOmBv+WFjeWIneWni+WMlui/h+eoi+inpuWPkWNoYW5nZeS6i+S7tlxyXG4gICAgICAgIHRoaXMuJGVsLm9uKFwiZHAuY2hhbmdlXCIsIHRoaXMuaGFuZGxlQ2hhbmdlKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XHJcbiAgICAgICAgLy8g5omL5Yqo5pu05pawdmFsdWVcclxuICAgICAgICB0aGlzLmluc3RhbmNlLmRhdGUodGhpcy5zdGF0ZS52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgLy8gZGVzdHJveVxyXG4gICAgICAgIHRoaXMuaW5zdGFuY2UuZGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMuJGVsLm9mZihcImRwLmNoYW5nZVwiLCB0aGlzLmhhbmRsZUNoYW5nZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9J2Zvcm0tY29udHJvbCcgXHJcbiAgICAgICAgICAgICAgICByZWY9e2VsID0+IHRoaXMuZWwgPSBlbH1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICApXHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRlVGltZVBpY2tlckdyb3VwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7IGhvcml6b250YWwsIGNvbnRyb2xJZCwgbGFiZWx9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8QXV0b0Zvcm1Hcm91cCB7Li4ueyBob3Jpem9udGFsLCBjb250cm9sSWQsIGxhYmVsIH19PlxyXG4gICAgICAgICAgICAgICAgPERhdGVUaW1lSW5wdXQgey4uLnRoaXMucHJvcHN9IC8+XHJcbiAgICAgICAgICAgIDwvQXV0b0Zvcm1Hcm91cD4gICAgICAgICAgICBcclxuICAgICAgICApXHJcblxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgUm93LCBDb2wsIEZvcm0sIEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wsIENvbnRyb2xMYWJlbCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcbmltcG9ydCBUaXRsZUlucHV0R3JvdXAgZnJvbSAnLi9UaXRsZUlucHV0R3JvdXAnO1xyXG5pbXBvcnQgRGF0ZVRpbWVQaWNrZXJHcm91cCBmcm9tICcuL0RhdGVUaW1lUGlja2VyR3JvdXAnO1xyXG5pbXBvcnQgQ29sb3JQaWNrZXJHcm91cCBmcm9tICcuL0NvbG9yUGlja2VyR3JvdXAnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRXZlbnREZXRhaWxGb3JtKHByb3BzKSB7XHJcblxyXG4gICAgY29uc3QgaGFuZGxlVGl0bGVDaGFuZ2UgPSBwcm9wcy5vblRpdGxlQ2hhbmdlO1xyXG4gICAgY29uc3QgaGFuZGxlU3RhcnRDaGFuZ2UgPSBwcm9wcy5vblN0YXJ0Q2hhbmdlO1xyXG4gICAgY29uc3QgaGFuZGxlRW5kQ2hhbmdlID0gcHJvcHMub25FbmRDaGFuZ2U7XHJcbiAgICBjb25zdCBoYW5kbGVDb2xvckNoYW5nZSA9IHByb3BzLm9uQ29sb3JjaGFuZ2U7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8Rm9ybT5cclxuICAgICAgICAgICAgPFRpdGxlSW5wdXRHcm91cCBcclxuICAgICAgICAgICAgICAgIGF1dG9Gb2N1c1xyXG4gICAgICAgICAgICAgICAgY29udHJvbElkPVwidGMtY3JlYXRlcGFnZS1ldmVudHRpdGxlXCJcclxuICAgICAgICAgICAgICAgIGxhYmVsPVwi5qCH6aKYXCJcclxuICAgICAgICAgICAgICAgIHZhbHVlPXtwcm9wcy5ldmVudFRpdGxlfSBcclxuICAgICAgICAgICAgICAgIG9uVGl0bGVDaGFuZ2U9e2hhbmRsZVRpdGxlQ2hhbmdlfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8Um93PlxyXG4gICAgICAgICAgICAgICAgPENvbCBzbT17Nn0+XHJcbiAgICAgICAgICAgICAgICAgICAgPERhdGVUaW1lUGlja2VyR3JvdXAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xJZD1cInRjLWNyZWF0ZXBhZ2UtZXZlbnRzdGFydFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwi5byA5aeL5pel5pyfXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3Byb3BzLnN0YXJ0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkRhdGVUaW1lQ2hhbmdlPXtoYW5kbGVTdGFydENoYW5nZX0gIC8+XHJcbiAgICAgICAgICAgICAgICA8L0NvbD5cclxuICAgICAgICAgICAgICAgIDxDb2wgc209ezZ9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxEYXRlVGltZVBpY2tlckdyb3VwIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sSWQ9XCJ0Yy1jcmVhdGVwYWdlLWV2ZW50ZW5kXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCLnu5PmnZ/ml6XmnJ9cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17cHJvcHMuZW5kfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkRhdGVUaW1lQ2hhbmdlPXtoYW5kbGVFbmRDaGFuZ2V9ICAvPlxyXG4gICAgICAgICAgICAgICAgPC9Db2w+XHJcbiAgICAgICAgICAgIDwvUm93PlxyXG4gICAgICAgICAgICA8Um93PlxyXG4gICAgICAgICAgICAgICAgPENvbCBzbT17Nn0+XHJcbiAgICAgICAgICAgICAgICAgICAgPENvbG9yUGlja2VyR3JvdXAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xJZD1cInRjLWNyZWF0ZXBhZ2UtZXZlbnRjb2xvclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwi6Imy5b2pXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3Byb3BzLmJhY2tncm91bmRDb2xvcn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25Db2xvckNoYW5nZT17aGFuZGxlQ29sb3JDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDwvQ29sPlxyXG4gICAgICAgICAgICAgICAgPENvbCBzbT17Nn0+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm1Hcm91cCBjb250cm9sSWQ9XCJ0Yy1jcmVhdGVwYWdlLWV2ZW50dGFnc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q29udHJvbExhYmVsPuagh+etvjwvQ29udHJvbExhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2wgcmVhZE9ubHkvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvRm9ybUdyb3VwPiAgICAgXHJcbiAgICAgICAgICAgICAgICA8L0NvbD5cclxuICAgICAgICAgICAgPC9Sb3c+XHJcbiAgICAgICAgICAgIDxGb3JtR3JvdXAgY29udHJvbElkPVwidGMtY3JlYXRlcGFnZS1ldmVudHJlbWFya1wiPlxyXG4gICAgICAgICAgICAgICAgPENvbnRyb2xMYWJlbD7lpIfms6g8L0NvbnRyb2xMYWJlbD5cclxuICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbCByZWFkT25seSBjb21wb25lbnRDbGFzcz1cInRleHRhcmVhXCIgLz5cclxuICAgICAgICAgICAgPC9Gb3JtR3JvdXA+XHJcbiAgICAgICAgPC9Gb3JtPlxyXG4gICAgKVxyXG59XHJcblxyXG4vKlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudERldGFpbEZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIC8v55Sx54i257uE5Lu26LSf6LSj5aSE55CG5pWw5o2uXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IGhhbmRsZVRpdGxlQ2hhbmdlID0gdGhpcy5wcm9wcy5vblRpdGxlQ2hhbmdlO1xyXG4gICAgICAgIGNvbnN0IGhhbmRsZVN0YXJ0Q2hhbmdlID0gdGhpcy5wcm9wcy5vblN0YXJ0Q2hhbmdlO1xyXG4gICAgICAgIGNvbnN0IGhhbmRsZUVuZENoYW5nZSA9IHRoaXMucHJvcHMub25FbmRDaGFuZ2U7XHJcbiAgICAgICAgY29uc3QgaGFuZGxlQ29sb3JDaGFuZ2UgPSB0aGlzLnByb3BzLm9uQ29sb3JjaGFuZ2U7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEZvcm0+XHJcbiAgICAgICAgICAgICAgICA8VGl0bGVJbnB1dEdyb3VwIFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Gb2N1c1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xJZD1cInRjLWNyZWF0ZXBhZ2UtZXZlbnR0aXRsZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCLmoIfpophcIlxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLmV2ZW50VGl0bGV9IFxyXG4gICAgICAgICAgICAgICAgICAgIG9uVGl0bGVDaGFuZ2U9e2hhbmRsZVRpdGxlQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDxSb3c+XHJcbiAgICAgICAgICAgICAgICAgICAgPENvbCBzbT17Nn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxEYXRlVGltZVBpY2tlckdyb3VwIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbElkPVwidGMtY3JlYXRlcGFnZS1ldmVudHN0YXJ0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwi5byA5aeL5pel5pyfXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLnN0YXJ0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25EYXRlVGltZUNoYW5nZT17aGFuZGxlU3RhcnRDaGFuZ2V9ICAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvQ29sPlxyXG4gICAgICAgICAgICAgICAgICAgIDxDb2wgc209ezZ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8RGF0ZVRpbWVQaWNrZXJHcm91cCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xJZD1cInRjLWNyZWF0ZXBhZ2UtZXZlbnRlbmRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCLnu5PmnZ/ml6XmnJ9cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMuZW5kfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25EYXRlVGltZUNoYW5nZT17aGFuZGxlRW5kQ2hhbmdlfSAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L0NvbD5cclxuICAgICAgICAgICAgICAgIDwvUm93PlxyXG4gICAgICAgICAgICAgICAgPFJvdz5cclxuICAgICAgICAgICAgICAgICAgICA8Q29sIHNtPXs2fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbG9yUGlja2VyR3JvdXAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sSWQ9XCJ0Yy1jcmVhdGVwYWdlLWV2ZW50Y29sb3JcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCLoibLlvalcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMuYmFja2dyb3VuZENvbG9yfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Db2xvckNoYW5nZT17aGFuZGxlQ29sb3JDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9Db2w+XHJcbiAgICAgICAgICAgICAgICAgICAgPENvbCBzbT17Nn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtR3JvdXAgY29udHJvbElkPVwidGMtY3JlYXRlcGFnZS1ldmVudHRhZ3NcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDb250cm9sTGFiZWw+5qCH562+PC9Db250cm9sTGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2wgcmVhZE9ubHkvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD4gICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIDwvQ29sPlxyXG4gICAgICAgICAgICAgICAgPC9Sb3c+XHJcbiAgICAgICAgICAgICAgICA8Rm9ybUdyb3VwIGNvbnRyb2xJZD1cInRjLWNyZWF0ZXBhZ2UtZXZlbnRyZW1hcmtcIj5cclxuICAgICAgICAgICAgICAgICAgICA8Q29udHJvbExhYmVsPuWkh+azqDwvQ29udHJvbExhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbCByZWFkT25seSBjb21wb25lbnRDbGFzcz1cInRleHRhcmVhXCIgLz5cclxuICAgICAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxyXG4gICAgICAgICAgICA8L0Zvcm0+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxufVxyXG4qLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFJvdywgQ29sLCBGb3JtLCBGb3JtR3JvdXAsIEZvcm1Db250cm9sLCBDb250cm9sTGFiZWwgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5pbXBvcnQgUmVwZWF0UnVsZVNlbGVjdEdyb3VwIGZyb20gJy4vUmVwZWF0UnVsZVNlbGVjdEdyb3VwJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEV2ZW50UmVwZWF0Rm9ybShwcm9wcykge1xyXG4gICAgXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxGb3JtIGhvcml6b250YWw+XHJcbiAgICAgICAgICAgIDxSZXBlYXRSdWxlU2VsZWN0R3JvdXAgaG9yaXpvbnRhbFxyXG4gICAgICAgICAgICAgICAgbGFiZWw9XCLph43lpI3op4TliJlcIlxyXG4gICAgICAgICAgICAgICAgcnB0UnVsZT17cHJvcHMucnB0UnVsZX1cclxuICAgICAgICAgICAgICAgIG9uUnB0UnVsZUNoYW5nZT17cHJvcHMub25ScHRSdWxlQ2hhbmdlfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgIDwvRm9ybT5cclxuICAgIClcclxufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFJvdywgQ29sLCBGb3JtLCBGb3JtR3JvdXAsIEZvcm1Db250cm9sLCBDb250cm9sTGFiZWwgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5pbXBvcnQge1NlbGVjdFBpY2tlcn0gZnJvbSAnLi9TZWxlY3RQaWNrZXJHcm91cCc7XHJcbmltcG9ydCBBdXRvRm9ybUdyb3VwIGZyb20gICcuL0F1dG9Gb3JtR3JvdXAnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRSZXBlYXRGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIGNvbnN0IHJwdFJ1bGVDb21wcyA9IHRoaXMuc3BsaXRScHRSdWxlKHRoaXMucHJvcHMucnB0UnVsZSk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgcnB0UnVsZTogdGhpcy5wcm9wcy5ycHRSdWxlLFxyXG4gICAgICAgICAgICBycHRCYXNlUnVsZTogJycsXHJcbiAgICAgICAgICAgIHJwdFdlZWtkYXlzOiBbXSxcclxuICAgICAgICAgICAgZGlzYWJsZVdlZWtkYXlTZWxlY3Q6IHRydWUsXHJcbiAgICAgICAgICAgIGRpc2FibGVkT3B0aW9uczogW11cclxuICAgICAgICB9XHJcbiAgICAgICAgJC5leHRlbmQodGhpcy5zdGF0ZSwgcnB0UnVsZUNvbXBzKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuaGFuZGxlUnB0QmFzZVJ1bGVDaGFuZ2UgPSB0aGlzLmhhbmRsZVJwdEJhc2VSdWxlQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVXZWVrZGF5Q2hhbmdlID0gdGhpcy5oYW5kbGVXZWVrZGF5Q2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgc3BsaXRScHRSdWxlKHJwdFJ1bGUpIHtcclxuXHRcdGxldCByZWdleCwgcnB0UnVsZUNvbXBzO1xyXG5cdFx0aWYgKCAocmVnZXggPSAvXkV2ZXJ5KFxcZCk/V2Vla3M/KFxcZCopJC8pLnRlc3QocnB0UnVsZSkgKSB7XHJcblx0XHRcdC8vIOavj1sxMjM0XeWRqFs3MTIzNDU2XVxyXG5cdFx0XHRjb25zdCByZXN1bHRzID0gcmVnZXguZXhlYyhycHRSdWxlKTtcclxuXHRcdFx0Y29uc3QgaW50ZXJXZWVrID0gcmVzdWx0c1sxXTtcclxuXHRcdFx0Y29uc3Qgd2Vla2RheXMgPSByZXN1bHRzWzJdLnNwbGl0KCcnKTtcclxuICAgICAgICAgICAgcnB0UnVsZUNvbXBzID0ge1xyXG4gICAgICAgICAgICAgICAgcnB0QmFzZVJ1bGU6IGBFdmVyeSR7aW50ZXJXZWVrfVdlZWtgLFxyXG4gICAgICAgICAgICAgICAgcnB0V2Vla2RheXM6IHdlZWtkYXlzLFxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZVdlZWtkYXlTZWxlY3Q6IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuXHRcdH0gZWxzZSBpZiAoIChyZWdleCA9IC9eRXZlcnlXZWVrZGF5KFxcZCopJC8pLnRlc3QocnB0UnVsZSkgKSB7XHJcblx0XHRcdC8vIOavj+S4quW3peS9nOaXpUV2ZXJ5V2Vla2RheTEzNVxyXG5cdFx0XHRjb25zdCByZXN1bHRzID0gcmVnZXguZXhlYyhycHRSdWxlKTtcclxuXHRcdFx0Y29uc3Qgd2Vla2RheXMgPSByZXN1bHRzWzFdIHx8ICcxMjM0NSc7XHJcbiAgICAgICAgICAgIHJwdFJ1bGVDb21wcyA9IHtcclxuICAgICAgICAgICAgICAgIHJwdEJhc2VSdWxlOiBgRXZlcnlXZWVrZGF5YCxcclxuICAgICAgICAgICAgICAgIHJwdFdlZWtkYXlzOiB3ZWVrZGF5cyxcclxuICAgICAgICAgICAgICAgIGRpc2FibGVXZWVrZGF5U2VsZWN0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGRpc2FibGVkT3B0aW9uczogWzYsIDddXHJcbiAgICAgICAgICAgIH1cclxuXHRcdH0gZWxzZSBpZiAoIChyZWdleCA9IC9EYWlseXxXZWVrbHl8TW9udGhseXxZZWFybHkvKS50ZXN0KHJwdFJ1bGUpICkge1xyXG5cdFx0XHQvLyBEYWlseXxXZWVrbHl8TW9udGhseXxZZWFybHlcclxuXHRcdFx0Y29uc3QgcGVyUnVsZSA9IHJlZ2V4LmV4ZWMocnB0UnVsZSlbMF1cclxuICAgICAgICAgICAgcnB0UnVsZUNvbXBzID0ge1xyXG4gICAgICAgICAgICAgICAgcnB0QmFzZVJ1bGU6IHBlclJ1bGUsXHJcbiAgICAgICAgICAgICAgICBycHRXZWVrZGF5czogW10sXHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlV2Vla2RheVNlbGVjdDogdHJ1ZSxcclxuICAgICAgICAgICAgfVxyXG5cdFx0fSBlbHNlIHtcclxuICAgICAgICAgICAgcnB0UnVsZUNvbXBzID0ge1xyXG4gICAgICAgICAgICAgICAgcnB0QmFzZVJ1bGU6ICdub25lJyxcclxuICAgICAgICAgICAgICAgIHJwdFdlZWtkYXlzOiBbXSxcclxuICAgICAgICAgICAgICAgIGRpc2FibGVXZWVrZGF5U2VsZWN0OiB0cnVlLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHRcdHJldHVybiBycHRSdWxlQ29tcHM7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlUnB0QmFzZVJ1bGVDaGFuZ2UobmV3U2VsZWN0aW9uKSB7XHJcbiAgICAgICAgc3dpdGNoKG5ld1NlbGVjdGlvbikge1xyXG4gICAgICAgICAgICBjYXNlICdFdmVyeVdlZWsnOlxyXG4gICAgICAgICAgICBjYXNlICdFdmVyeTJXZWVrJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJwdEJhc2VSdWxlOiBuZXdTZWxlY3Rpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZVdlZWtkYXlTZWxlY3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkT3B0aW9uczogW11cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnRXZlcnlXZWVrZGF5JzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJwdEJhc2VSdWxlOiBuZXdTZWxlY3Rpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZVdlZWtkYXlTZWxlY3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkT3B0aW9uczogWzYsIDddXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBycHRCYXNlUnVsZTogbmV3U2VsZWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVXZWVrZGF5U2VsZWN0OiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbmV3UnB0UnVsZSA9IG5ld1NlbGVjdGlvbjtcclxuICAgICAgICB0aGlzLnByb3BzLm9uUnB0UnVsZUNoYW5nZShuZXdScHRSdWxlKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVXZWVrZGF5Q2hhbmdlKG5ld1NlbGVjdGlvbikge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBycHRXZWVrZGF5czogbmV3U2VsZWN0aW9uLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgY29uc3QgbmV3UnB0UnVsZSA9IHRoaXMuc3RhdGUucnB0QmFzZVJ1bGUgKyBuZXdTZWxlY3Rpb24uam9pbignJyk7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblJwdFJ1bGVDaGFuZ2UobmV3UnB0UnVsZSlcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgeyBob3Jpem9udGFsLCBjb250cm9sSWQsIGxhYmVsIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxBdXRvRm9ybUdyb3VwIHsuLi57IGhvcml6b250YWwsIGNvbnRyb2xJZCwgbGFiZWwgfX0+XHJcbiAgICAgICAgICAgICAgICA8Um93PlxyXG4gICAgICAgICAgICAgICAgICAgIDxDb2wgc209ezR9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8U2VsZWN0UGlja2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIuivt+mAieaLqemHjeWkjeinhOWImVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5ycHRCYXNlUnVsZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoPVwiYXV0b1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdGlvbkNoYW5nZT17dGhpcy5oYW5kbGVScHRCYXNlUnVsZUNoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIm5vbmVcIj7kuI3ph43lpI08L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRncm91cCBsYWJlbD1cIueugOWNleinhOWImVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJEYWlseVwiPuavj+aXpTwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJXZWVrbHlcIj7mr4/lkag8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiTW9udGhseVwiPuavj+aciDwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJZZWFybHlcIj7mr4/lubQ8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvb3B0Z3JvdXA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0Z3JvdXAgbGFiZWw9XCLlpI3lkIjop4TliJlcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiRXZlcnlXZWVrXCI+5q+P5LiA5Liq5pif5pyfPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkV2ZXJ5MldlZWtcIj7mr4/kuKTkuKrmmJ/mnJ88L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiRXZlcnlXZWVrZGF5XCI+5q+P5Liq5bel5L2c5pelPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L29wdGdyb3VwPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L1NlbGVjdFBpY2tlcj5cclxuICAgICAgICAgICAgICAgICAgICA8L0NvbD5cclxuICAgICAgICAgICAgICAgICAgICA8Q29sIHNtPXs4fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPFNlbGVjdFBpY2tlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGlwbGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwi6YCJ5oup6YeN5aSN55qE5pif5pyfXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoPVwiODAlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnJwdFdlZWtkYXlzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuc3RhdGUuZGlzYWJsZVdlZWtkYXlTZWxlY3R9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZE9wdGlvbnM9e3RoaXMuc3RhdGUuZGlzYWJsZWRPcHRpb25zfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Rpb25DaGFuZ2U9e3RoaXMuaGFuZGxlV2Vla2RheUNoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjFcIj7mmJ/mnJ/kuIA8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIyXCI+5pif5pyf5LqMPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiM1wiPuaYn+acn+S4iTwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjRcIj7mmJ/mnJ/lm5s8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCI1XCI+5pif5pyf5LqUPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiNlwiPuaYn+acn+WFrTwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjdcIj7mmJ/mnJ/ml6U8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9TZWxlY3RQaWNrZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9Db2w+XHJcbiAgICAgICAgICAgICAgICA8L1Jvdz5cclxuICAgICAgICAgICAgPC9BdXRvRm9ybUdyb3VwPiAgICAgIFxyXG4gICAgICAgIClcclxuICAgIH1cclxufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFJvdywgQ29sLCBGb3JtLCBGb3JtR3JvdXAsIEZvcm1Db250cm9sLCBDb250cm9sTGFiZWwgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5pbXBvcnQgQXV0b0Zvcm1Hcm91cCBmcm9tICcuL0F1dG9Gb3JtR3JvdXAnO1xyXG5pbXBvcnQgJ2Jvb3RzdHJhcC9qcy9kcm9wZG93bic7XHJcbmltcG9ydCAnYm9vdHN0cmFwLXNlbGVjdCc7XHJcbmltcG9ydCAnYm9vdHN0cmFwLXNlbGVjdC9kaXN0L2Nzcy9ib290c3RyYXAtc2VsZWN0LmNzcydcclxuXHJcbmV4cG9ydCBjbGFzcyBTZWxlY3RQaWNrZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMucHJvcHMudmFsdWVcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2UgPSB0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNoYW5nZShlLCBjbGlja2VkSW5kZXgsIG5ld1ZhbHVlLCBvbGRWYWx1ZSkgeyBcclxuICAgICAgICAvLyDop6blj5Hnu4Tku7blkajmnJ9cclxuICAgICAgICBjb25zdCBuZXdTZWxlY3Rpb24gPSB0aGlzLmluc3RhbmNlLnZhbCgpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICB2YWx1ZTogbmV3U2VsZWN0aW9uXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8g5Lyg6YCSXHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdGlvbkNoYW5nZShuZXdTZWxlY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIGNvbnN0IHsgdGl0bGUgPSAnJywgd2lkdGggPSBmYWxzZSwgbXVsdGlwbGUsIGRpc2FibGVkLCBkaXNhYmxlZE9wdGlvbnMgPSBbXSB9ID0gdGhpcy5wcm9wc1xyXG4gICAgICAgIC8vIOWIneWni+WMlue7hOS7tlxyXG4gICAgICAgIHRoaXMuJGVsID0gJCh0aGlzLmVsKTtcclxuICAgICAgICB0aGlzLiRlbC5wcm9wKCd0aXRsZScsIHRpdGxlKTtcclxuICAgICAgICB0aGlzLiRlbC5wcm9wKCdtdWx0aXBsZScsIG11bHRpcGxlKTtcclxuICAgICAgICB0aGlzLiRlbC5wcm9wKCdkaXNhYmxlZCcsIGRpc2FibGVkKTtcclxuICAgICAgICBmb3IgKGNvbnN0IGRheSBvZiBkaXNhYmxlZE9wdGlvbnMpIHtcclxuICAgICAgICAgICAgdGhpcy4kZWwuZmluZChgb3B0aW9uW3ZhbHVlPScke2RheX0nXWApLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuJGVsLnNlbGVjdHBpY2tlcih7XHJcbiAgICAgICAgICAgIHN0eWxlOiAnYnRuLWRlZmF1bHQnLFxyXG4gICAgICAgICAgICB3aWR0aFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIOiOt+WPluaPkuS7tuWunuS+i1xyXG4gICAgICAgIHRoaXMuaW5zdGFuY2UgPSB0aGlzLiRlbC5kYXRhKCdzZWxlY3RwaWNrZXInKTtcclxuICAgICAgICAvLyDorr7nva7liJ3lp4vlgLxcclxuICAgICAgICB0aGlzLmluc3RhbmNlLnZhbCh0aGlzLnByb3BzLnZhbHVlKTtcclxuICAgICAgICAvLyDnu5HlrppjaGFuZ2Xkuovku7ZcclxuICAgICAgICB0aGlzLiRlbC5vbihcImNoYW5nZWQuYnMuc2VsZWN0XCIsIHRoaXMuaGFuZGxlQ2hhbmdlKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUsIHNuYXBzaG90KSB7XHJcbiAgICAgICAgY29uc3QgeyBkaXNhYmxlZCwgZGlzYWJsZWRPcHRpb25zID0gW10gfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgLy8g56aB55So5o+S5Lu2XHJcbiAgICAgICAgdGhpcy4kZWwucHJvcCgnZGlzYWJsZWQnLCBkaXNhYmxlZCk7XHJcbiAgICAgICAgaWYgKGRpc2FibGVkKSB0aGlzLiRlbC52YWwoJycpO1xyXG4gICAgICAgIC8vIOemgeeUqOmAiemhuVxyXG4gICAgICAgIGZvciAoY29uc3QgZGF5IG9mIGRpc2FibGVkT3B0aW9ucykge1xyXG4gICAgICAgICAgICB0aGlzLiRlbC5maW5kKGBvcHRpb25bdmFsdWU9JyR7ZGF5fSddYCkucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5pu05paw57uE5Lu2XHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5yZWZyZXNoKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuaW5zdGFuY2UuZGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMuJGVsLm9mZihcImNoYW5nZWQuYnMuc2VsZWN0XCIsIHRoaXMuaGFuZGxlQ2hhbmdlKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxzZWxlY3QgcmVmPXtlbCA9PiB0aGlzLmVsID0gZWx9PlxyXG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG4gICAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBcclxuICAgICAgICApXHJcbiAgICB9ICAgXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFNlbGVjdFBpY2tlckdyb3VwKHByb3BzKSB7XHJcbiAgICBjb25zdCB7IGhvcml6b250YWwsIGNvbnRyb2xJZCwgbGFiZWwgfSA9IHByb3BzO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8QXV0b0Zvcm1Hcm91cCB7Li4ueyBob3Jpem9udGFsLCBjb250cm9sSWQsIGxhYmVsIH19PlxyXG4gICAgICAgICAgICA8U2VsZWN0UGlja2VyIHsuLi5wcm9wc30gPlxyXG4gICAgICAgICAgICAgICAge3Byb3BzLmNoaWxkcmVufVxyXG4gICAgICAgICAgICA8L1NlbGVjdFBpY2tlcj5cclxuICAgICAgICA8L0F1dG9Gb3JtR3JvdXA+ICAgICAgXHJcbiAgICApXHJcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcbmltcG9ydCBBdXRvRm9ybUdyb3VwIGZyb20gJy4vQXV0b0Zvcm1Hcm91cCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaXRsZUlucHV0R3JvdXAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMucHJvcHMudmFsdWVcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZSA9IHRoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQ2hhbmdlKGUpIHtcclxuICAgICAgICBjb25zdCBuZXdUaXRsZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICB2YWx1ZTogbmV3VGl0bGVcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnByb3BzLm9uVGl0bGVDaGFuZ2UobmV3VGl0bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7IGhvcml6b250YWwsIGNvbnRyb2xJZCwgbGFiZWx9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8QXV0b0Zvcm1Hcm91cCB7Li4ueyBob3Jpem9udGFsLCBjb250cm9sSWQsIGxhYmVsIH19PlxyXG4gICAgICAgICAgICAgICAgPEZvcm1Db250cm9sXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0ZvY3VzPXt0aGlzLnByb3BzLmF1dG9Gb2N1c31cclxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9XHJcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCLor7fovpPlhaXmoIfpophcIlxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvQXV0b0Zvcm1Hcm91cD5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgTmF2SXRlbSwgVGFiLCBCdXR0b24gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5pbXBvcnQgRXZlbnREZXRhaWxGcm9tIGZyb20gJy4uL0Zvcm0vRXZlbnREZXRhaWxGb3JtJztcclxuaW1wb3J0IEV2ZW50UmVwZWF0Rm9ybSBmcm9tICcuLi9Gb3JtL0V2ZW50UmVwZWF0Rm9ybSc7XHJcbmltcG9ydCBFdmVudE1vZGFsIGZyb20gJy4vRXZlbnRNb2RhbCc7XHJcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50Q3JlYXRlTW9kYWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgdGl0bGU6ICcnLFxyXG4gICAgICAgICAgICBzdGFydDogdGhpcy5wcm9wcy5zZWxlY3RlZFJhbmdlLnN0YXJ0LmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpLFxyXG4gICAgICAgICAgICBlbmQ6IHRoaXMucHJvcHMuc2VsZWN0ZWRSYW5nZS5lbmQuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyksXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJycsXHJcbiAgICAgICAgICAgIHJwdFJ1bGU6ICdub25lJ1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuaGFuZGxlVGl0bGVDaGFuZ2UgPSB0aGlzLmhhbmRsZVRpdGxlQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVTdGFydENoYW5nZSA9IHRoaXMuaGFuZGxlU3RhcnRDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUVuZENoYW5nZSA9IHRoaXMuaGFuZGxlRW5kQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVDb2xvckNoYW5nZSA9IHRoaXMuaGFuZGxlQ29sb3JDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUV2ZW50Q3JlYXRlID0gdGhpcy5oYW5kbGVFdmVudENyZWF0ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5oYW5kbGVScHRSdWxlQ2hhbmdlID0gdGhpcy5oYW5kbGVScHRSdWxlQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlVGl0bGVDaGFuZ2UobmV3VGl0bGUpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgdGl0bGU6IG5ld1RpdGxlXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVTdGFydENoYW5nZShuZXdEYXRlVmFsdWUpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgc3RhcnQ6IG5ld0RhdGVWYWx1ZVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlRW5kQ2hhbmdlKG5ld0RhdGVWYWx1ZSkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBlbmQ6IG5ld0RhdGVWYWx1ZVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQ29sb3JDaGFuZ2UobmV3Q29sb3JWYWx1ZSkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IG5ld0NvbG9yVmFsdWVcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVJwdFJ1bGVDaGFuZ2UobmV3UnB0UnVsZSkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBycHRSdWxlOiBuZXdScHRSdWxlXHJcbiAgICAgICAgfSlcclxuICAgIH0gICAgXHJcblxyXG4gICAgaGFuZGxlRXZlbnRDcmVhdGUoKSB7XHJcbiAgICAgICAgLy8g5omT5YyF5pWw5o2uXHJcbiAgICAgICAgY29uc3QgZXZlbnREYXRhID0gJC5leHRlbmQoe30sIHRoaXMuc3RhdGUpO1xyXG4gICAgICAgIHRoaXMucHJvcHMub25FdmVudENyZWF0ZShldmVudERhdGEpO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5wcm9wcy5vbk1vZGFsQ2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgeyBzaG93LCBvbk1vZGFsQ2xvc2UgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgcmV0dXJuICggXHJcbiAgICAgICAgICAgIDxFdmVudE1vZGFsIHsuLi57c2hvdywgb25Nb2RhbENsb3NlfX0+XHJcbiAgICAgICAgICAgICAgICA8RXZlbnRNb2RhbC5OYXZIZWFkZXIgey4uLntvbk1vZGFsQ2xvc2V9fT5cclxuICAgICAgICAgICAgICAgICAgICA8TmF2SXRlbSBldmVudEtleT1cIjFcIiA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIOaXpeeoi+e8lui+kVxyXG4gICAgICAgICAgICAgICAgICAgIDwvTmF2SXRlbT5cclxuICAgICAgICAgICAgICAgICAgICA8TmF2SXRlbSBldmVudEtleT1cIjJcIiA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIOmHjeWkjeinhOWImVxyXG4gICAgICAgICAgICAgICAgICAgIDwvTmF2SXRlbT5cclxuICAgICAgICAgICAgICAgIDwvRXZlbnRNb2RhbC5OYXZIZWFkZXI+XHJcbiAgICAgICAgICAgICAgICA8RXZlbnRNb2RhbC5UYWJCb2R5PlxyXG4gICAgICAgICAgICAgICAgICAgIDxUYWIuUGFuZSBldmVudEtleT1cIjFcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEV2ZW50RGV0YWlsRnJvbSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50VGl0bGU9e3RoaXMuc3RhdGUudGl0bGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydD17dGhpcy5zdGF0ZS5zdGFydH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZD17dGhpcy5zdGF0ZS5lbmR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I9e3RoaXMuc3RhdGUuYmFja2dyb3VuZENvbG9yfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/kuovku7blj6Xmn4RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uVGl0bGVDaGFuZ2U9e3RoaXMuaGFuZGxlVGl0bGVDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblN0YXJ0Q2hhbmdlPXt0aGlzLmhhbmRsZVN0YXJ0Q2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25FbmRDaGFuZ2U9e3RoaXMuaGFuZGxlRW5kQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Db2xvcmNoYW5nZT17dGhpcy5oYW5kbGVDb2xvckNoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L1RhYi5QYW5lPlxyXG4gICAgICAgICAgICAgICAgICAgIDxUYWIuUGFuZSBldmVudEtleT1cIjJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEV2ZW50UmVwZWF0Rm9ybSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJwdFJ1bGU9J25vbmUnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblJwdFJ1bGVDaGFuZ2U9e3RoaXMuaGFuZGxlUnB0UnVsZUNoYW5nZX0gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9UYWIuUGFuZT5cclxuICAgICAgICAgICAgICAgIDwvRXZlbnRNb2RhbC5UYWJCb2R5PlxyXG4gICAgICAgICAgICAgICAgPEV2ZW50TW9kYWwuVG9vbGJhckZvb3Rlcj5cclxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBic1N0eWxlPVwic3VjY2Vzc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlRXZlbnRDcmVhdGV9XHJcbiAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICDliJvlu7pcclxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMucHJvcHMub25Nb2RhbENsb3NlfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAg5Y+W5raIXHJcbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L0V2ZW50TW9kYWwuVG9vbGJhckZvb3Rlcj5cclxuICAgICAgICAgICAgPC9FdmVudE1vZGFsPlxyXG4gICAgICAgIClcclxuICAgIH1cclxufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IE5hdkl0ZW0sIFRhYiwgQnV0dG9uLCBCdXR0b25Hcm91cCwgRHJvcGRvd24sIE1lbnVJdGVtLCBSb3csIENvbCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcbmltcG9ydCBFdmVudERldGFpbEZyb20gZnJvbSAnLi4vRm9ybS9FdmVudERldGFpbEZvcm0nO1xyXG5pbXBvcnQgRXZlbnRSZXBlYXRGb3JtIGZyb20gJy4uL0Zvcm0vRXZlbnRSZXBlYXRGb3JtJztcclxuaW1wb3J0IEV2ZW50TW9kYWwgZnJvbSAnLi9FdmVudE1vZGFsJztcclxuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5cclxuY2xhc3MgTW9kYWxUb29sYmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPFJvdz5cclxuICAgICAgICAgICAgICAgIDxDb2wgc209ezd9IHN0eWxlPXt7dGV4dEFsaWduOiAnbGVmdCd9fT5cclxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uR3JvdXA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gaWQ9J3RjLWVkaXRwYWdlLVNhdmUnIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnNTdHlsZT1cImRhbmdlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQnRuQ2xpY2t9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IXRoaXMucHJvcHMuZW5hYmxlU2F2ZUJ0bn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICDkv53lrZhcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gaWQ9J3RjLWVkaXRwYWdlLUNvbXBsZXRlJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5vbkJ0bkNsaWNrfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwYXJzZUludCh0aGlzLnByb3BzLmNvbXBsZXRlKSA9PSA1ID8gJ+aBouWkjScgOiAn5a6M5oiQJ31cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD0ndGMtZWRpdHBhZ2UtRGVsZXRlRGF0YSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25CdG5DbGlja30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICDliKDpmaRcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD0ndGMtZWRpdHBhZ2UtRGVsZXRlRG9jJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5vbkJ0bkNsaWNrfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIOWIoOmZpOa6kOaWh+aho1xyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPERyb3Bkb3duIGlkPSd0Yy1lZGl0cGFnZS1leHRyYScgcHVsbFJpZ2h0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPERyb3Bkb3duLlRvZ2dsZSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPERyb3Bkb3duLk1lbnU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPE1lbnVJdGVtIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudEtleT1cIjFcIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9J3RjLWVkaXRwYWdlLU9wZW5Eb2MnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25CdG5DbGlja30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOaJk+W8gOa6kOaWh+aho1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTWVudUl0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPE1lbnVJdGVtIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudEtleT1cIjJcIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9J3RjLWVkaXRwYWdlLUVkaXRPcmlnaW5EYXRhJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQnRuQ2xpY2t9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDnvJbovpHmupDmlbDmja5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L01lbnVJdGVtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Ecm9wZG93bi5NZW51PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0Ryb3Bkb3duPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uR3JvdXA+XHJcbiAgICAgICAgICAgICAgICA8L0NvbD5cclxuICAgICAgICAgICAgICAgIDxDb2wgc209ezJ9IHNtT2Zmc2V0PXszfT5cclxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMucHJvcHMub25Nb2RhbENsb3NlfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAg5Y+W5raIXHJcbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L0NvbD5cclxuICAgICAgICAgICAgPC9Sb3c+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRFZGl0TW9kYWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBuZXdFdmVudERhdGE6IHt9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5oYW5kbGVUaXRsZUNoYW5nZSA9IHRoaXMuaGFuZGxlVGl0bGVDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZVN0YXJ0Q2hhbmdlID0gdGhpcy5oYW5kbGVTdGFydENoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlRW5kQ2hhbmdlID0gdGhpcy5oYW5kbGVFbmRDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUNvbG9yQ2hhbmdlID0gdGhpcy5oYW5kbGVDb2xvckNoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlUnB0UnVsZUNoYW5nZSA9IHRoaXMuaGFuZGxlUnB0UnVsZUNoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQnRuQ2xpY2sgPSB0aGlzLmhhbmRsZUJ0bkNsaWNrLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlVGl0bGVDaGFuZ2UobmV3VGl0bGUpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKGZ1bmN0aW9uKHByZXZTdGF0ZSwgcHJvcHMpIHtcclxuICAgICAgICAgICAgY29uc3QgbmV3RXZlbnREYXRhID0gJC5leHRlbmQoe30sIHByZXZTdGF0ZS5uZXdFdmVudERhdGEpXHJcbiAgICAgICAgICAgIG5ld0V2ZW50RGF0YS50aXRsZSA9IG5ld1RpdGxlO1xyXG4gICAgICAgICAgICByZXR1cm4geyBuZXdFdmVudERhdGEgfTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVN0YXJ0Q2hhbmdlKG5ld0RhdGVWYWx1ZSkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoZnVuY3Rpb24ocHJldlN0YXRlLCBwcm9wcykge1xyXG4gICAgICAgICAgICBjb25zdCBuZXdFdmVudERhdGEgPSAkLmV4dGVuZCh7fSwgcHJldlN0YXRlLm5ld0V2ZW50RGF0YSlcclxuICAgICAgICAgICAgbmV3RXZlbnREYXRhLnN0YXJ0ID0gbmV3RGF0ZVZhbHVlO1xyXG4gICAgICAgICAgICByZXR1cm4geyBuZXdFdmVudERhdGEgfTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUVuZENoYW5nZShuZXdEYXRlVmFsdWUpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKGZ1bmN0aW9uKHByZXZTdGF0ZSwgcHJvcHMpIHtcclxuICAgICAgICAgICAgY29uc3QgbmV3RXZlbnREYXRhID0gJC5leHRlbmQoe30sIHByZXZTdGF0ZS5uZXdFdmVudERhdGEpXHJcbiAgICAgICAgICAgIG5ld0V2ZW50RGF0YS5lbmQgPSBuZXdEYXRlVmFsdWU7XHJcbiAgICAgICAgICAgIHJldHVybiB7IG5ld0V2ZW50RGF0YSB9O1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQ29sb3JDaGFuZ2UobmV3Q29sb3JWYWx1ZSkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoZnVuY3Rpb24ocHJldlN0YXRlLCBwcm9wcykge1xyXG4gICAgICAgICAgICBjb25zdCBuZXdFdmVudERhdGEgPSAkLmV4dGVuZCh7fSwgcHJldlN0YXRlLm5ld0V2ZW50RGF0YSlcclxuICAgICAgICAgICAgbmV3RXZlbnREYXRhLmJhY2tncm91bmRDb2xvciA9IG5ld0NvbG9yVmFsdWU7XHJcbiAgICAgICAgICAgIHJldHVybiB7IG5ld0V2ZW50RGF0YSB9O1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlUnB0UnVsZUNoYW5nZShuZXdScHRSdWxlKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShmdW5jdGlvbihwcmV2U3RhdGUsIHByb3BzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld0V2ZW50RGF0YSA9ICQuZXh0ZW5kKHt9LCBwcmV2U3RhdGUubmV3RXZlbnREYXRhKVxyXG4gICAgICAgICAgICBuZXdFdmVudERhdGEucnB0UnVsZSA9IG5ld1JwdFJ1bGU7XHJcbiAgICAgICAgICAgIHJldHVybiB7IG5ld0V2ZW50RGF0YSB9O1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQnRuQ2xpY2soZSkge1xyXG4gICAgICAgIGNvbnN0IGlkID0gZS50YXJnZXQuaWQ7XHJcbiAgICAgICAgY29uc3QgYnRuVHlwZSA9IGlkLnNwbGl0KCctJylbMl07XHJcbiAgICAgICAgY29uc3QgaGFuZGxlTmFtZSA9IGBvbkV2ZW50JHtidG5UeXBlfWA7XHJcbiAgICAgICAgdGhpcy5wcm9wc1toYW5kbGVOYW1lXSh0aGlzLnByb3BzLmVkaXRpbmdFdmVudCwgdGhpcy5zdGF0ZS5uZXdFdmVudERhdGEpO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5wcm9wcy5vbk1vZGFsQ2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgeyBzaG93LCBvbk1vZGFsQ2xvc2UgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgZXZlbnQgPSB0aGlzLnByb3BzLmVkaXRpbmdFdmVudDtcclxuICAgICAgICBjb25zdCBlbmFibGVTYXZlQnRuID0gISQuaXNFbXB0eU9iamVjdCh0aGlzLnN0YXRlLm5ld0V2ZW50RGF0YSk7XHJcbiAgICAgICAgcmV0dXJuICggXHJcbiAgICAgICAgICAgIDxFdmVudE1vZGFsIHsuLi57c2hvdywgb25Nb2RhbENsb3NlfX0+XHJcbiAgICAgICAgICAgICAgICA8RXZlbnRNb2RhbC5OYXZIZWFkZXIgey4uLntvbk1vZGFsQ2xvc2V9fT5cclxuICAgICAgICAgICAgICAgICAgICA8TmF2SXRlbSBldmVudEtleT1cIjFcIiA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIOaXpeeoi+e8lui+kVxyXG4gICAgICAgICAgICAgICAgICAgIDwvTmF2SXRlbT5cclxuICAgICAgICAgICAgICAgICAgICA8TmF2SXRlbSBldmVudEtleT1cIjJcIiA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIOmHjeWkjeinhOWImVxyXG4gICAgICAgICAgICAgICAgICAgIDwvTmF2SXRlbT5cclxuICAgICAgICAgICAgICAgIDwvRXZlbnRNb2RhbC5OYXZIZWFkZXI+XHJcbiAgICAgICAgICAgICAgICA8RXZlbnRNb2RhbC5UYWJCb2R5PlxyXG4gICAgICAgICAgICAgICAgICAgIDxUYWIuUGFuZSBldmVudEtleT1cIjFcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEV2ZW50RGV0YWlsRnJvbSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5Lyg5YWl5pel56iL5bGe5oCnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9eydlZGl0JyArIGV2ZW50LmlkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRUaXRsZT17ZXZlbnQudGl0bGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydD17ZXZlbnQuc3RhcnQuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQ9e2V2ZW50LmVuZC5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcj17ZXZlbnQuYmFja2dyb3VuZENvbG9yfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGU9e2V2ZW50LmNvbXBsZXRlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/kuovku7blj6Xmn4RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uVGl0bGVDaGFuZ2U9e3RoaXMuaGFuZGxlVGl0bGVDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblN0YXJ0Q2hhbmdlPXt0aGlzLmhhbmRsZVN0YXJ0Q2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25FbmRDaGFuZ2U9e3RoaXMuaGFuZGxlRW5kQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Db2xvcmNoYW5nZT17dGhpcy5oYW5kbGVDb2xvckNoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L1RhYi5QYW5lPlxyXG4gICAgICAgICAgICAgICAgICAgIDxUYWIuUGFuZSBldmVudEtleT1cIjJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEV2ZW50UmVwZWF0Rm9ybSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJwdFJ1bGU9e2V2ZW50LnJwdFJ1bGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblJwdFJ1bGVDaGFuZ2U9e3RoaXMuaGFuZGxlUnB0UnVsZUNoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L1RhYi5QYW5lPlxyXG4gICAgICAgICAgICAgICAgPC9FdmVudE1vZGFsLlRhYkJvZHk+XHJcbiAgICAgICAgICAgICAgICA8RXZlbnRNb2RhbC5Ub29sYmFyRm9vdGVyPlxyXG4gICAgICAgICAgICAgICAgICAgIDxNb2RhbFRvb2xiYXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlU2F2ZUJ0bj17ZW5hYmxlU2F2ZUJ0bn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGU9e3RoaXMuc3RhdGUuY29tcGxldGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQnRuQ2xpY2s9e3RoaXMuaGFuZGxlQnRuQ2xpY2t9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uTW9kYWxDbG9zZT17b25Nb2RhbENsb3NlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPC9FdmVudE1vZGFsLlRvb2xiYXJGb290ZXI+XHJcbiAgICAgICAgICAgIDwvRXZlbnRNb2RhbD5cclxuICAgICAgICApXHJcbiAgICB9ICAgIFxyXG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgTW9kYWwsIE5hdiwgVGFiLCBSb3csIENvbCwgQ2xvc2VCdXR0b24gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5cclxuY2xhc3MgTmF2SGVhZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIC8vdGhpcy5wcm9wcy5jaGlsZHJlbiDmjqXlj5cgPE5hdkl0ZW0gLz5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8TW9kYWwuSGVhZGVyXHJcbiAgICAgICAgICAgICAgICBzdHlsZT17e2JvcmRlckJvdHRvbTogJ25vbmUnLCBwYWRkaW5nOiAnMCd9fT5cclxuICAgICAgICAgICAgICAgIDxOYXYgYnNTdHlsZT1cInRhYnNcIlxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7cGFkZGluZzogJzE1cHggMTVweCAwIDE1cHgnfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPENsb3NlQnV0dG9uIG9uQ2xpY2s9e3RoaXMucHJvcHMub25Nb2RhbENsb3NlfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG4gICAgICAgICAgICAgICAgPC9OYXY+XHJcbiAgICAgICAgICAgIDwvTW9kYWwuSGVhZGVyPlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgVGFiQm9keSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICAvL3RoaXMucHJvcHMuY2hpbGRyZW4g5o6l5Y+XIDxUYWIuUGFuZSAvPlxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxNb2RhbC5Cb2R5PlxyXG4gICAgICAgICAgICAgICAgPFRhYi5Db250ZW50IGFuaW1hdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuICAgICAgICAgICAgICAgIDwvVGFiLkNvbnRlbnQ+XHJcbiAgICAgICAgICAgIDwvTW9kYWwuQm9keT4gICAgICAgICAgICBcclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFRvb2xiYXJGb290ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxNb2RhbC5Gb290ZXI+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuICAgICAgICAgICAgPC9Nb2RhbC5Gb290ZXI+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBFdmVudE1vZGFsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgTmF2SGVhZGVyLCBUYWJCb2R5LCBUb29sYmFyRm9vdGVyO1xyXG4gICAgICAgIFJlYWN0LkNoaWxkcmVuLmZvckVhY2godGhpcy5wcm9wcy5jaGlsZHJlbiwgKHRoaXNBcmcpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IHRoaXNBcmcudHlwZS5uYW1lO1xyXG4gICAgICAgICAgICBpZiAoIG5hbWUgPT0gJ05hdkhlYWRlcicgKSB7XHJcbiAgICAgICAgICAgICAgICBOYXZIZWFkZXIgPSB0aGlzQXJnO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBuYW1lID09ICdUYWJCb2R5JyApIHtcclxuICAgICAgICAgICAgICAgIFRhYkJvZHkgPSB0aGlzQXJnO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBuYW1lID09ICdUb29sYmFyRm9vdGVyJyApIHtcclxuICAgICAgICAgICAgICAgIFRvb2xiYXJGb290ZXIgPSB0aGlzQXJnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPE1vZGFsIHNob3c9e3RoaXMucHJvcHMuc2hvd30gb25IaWRlPXt0aGlzLnByb3BzLm9uTW9kYWxDbG9zZX0+IFxyXG4gICAgICAgICAgICAgICAgPFRhYi5Db250YWluZXIgaWQ9XCJ0YWJzLXdpdGgtZHJvcGRvd25cIiBkZWZhdWx0QWN0aXZlS2V5PVwiMVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxSb3cgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbCBzbT17MTJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBOYXZIZWFkZXIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBUYWJCb2R5IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9Db2w+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9Sb3c+XHJcbiAgICAgICAgICAgICAgICA8L1RhYi5Db250YWluZXI+XHJcbiAgICAgICAgICAgICAgICB7IFRvb2xiYXJGb290ZXIgfVxyXG4gICAgICAgICAgICA8L01vZGFsPlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuRXZlbnRNb2RhbC5OYXZIZWFkZXIgPSBOYXZIZWFkZXI7XHJcbkV2ZW50TW9kYWwuVGFiQm9keSA9IFRhYkJvZHk7XHJcbkV2ZW50TW9kYWwuVG9vbGJhckZvb3RlciA9IFRvb2xiYXJGb290ZXI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFdmVudE1vZGFsOyIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL2luZGV4LmNzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9pbmRleC5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL2luZGV4LmNzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgJ2Z1bGxjYWxlbmRhci1yZWFjdHdyYXBwZXIvZGlzdC9jc3MvZnVsbGNhbGVuZGFyLm1pbi5jc3MnXHJcbmltcG9ydCAnYm9vdHN0cmFwL2Rpc3QvY3NzL2Jvb3RzdHJhcC5jc3MnO1xyXG5pbXBvcnQgJ2Jvb3RzdHJhcC9kaXN0L2Nzcy9ib290c3RyYXAtdGhlbWUuY3NzJztcclxuaW1wb3J0ICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtZnJlZS9jc3MvYWxsLmNzcyc7XHJcbmltcG9ydCBBcHAgZnJvbSAnLi9BcHAnO1xyXG5pbXBvcnQgJy4vaW5kZXguY3NzJztcclxuXHJcblJlYWN0RE9NLnJlbmRlcig8QXBwIC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpKTtcclxuXHJcbi8qXHJcbiQoZnVuY3Rpb24oKXtcclxuICAgIC8vIOWumuS5ieWPmOmHj1xyXG5cdGNvbnN0IGRhdGFMb2FkZXIgPSBuZXcgV2l6RXZlbnREYXRhTG9hZGVyKCk7XHJcblx0bGV0IGdfZWRpdFBvcHBlciwgZ19jcmVhdGVNb2RhbCwgZ19lZGl0TW9kYWw7XHJcblxyXG4gICAgY29uc3QgY2FsZW5kYXIgPSAkKCcjY2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoe1xyXG5cdFx0dGhlbWVTeXN0ZW06ICdzdGFuZGFyZCcsXHJcblx0XHRoZWlnaHQ6ICdwYXJlbnQnLFxyXG5cdFx0aGVhZGVyOiB7XHJcblx0XHRcdGxlZnQ6ICdwcmV2LG5leHQsdG9kYXknLFxyXG5cdFx0XHRjZW50ZXI6ICd0aXRsZScsXHJcblx0XHRcdHJpZ2h0OiAnbW9udGgsYWdlbmRhV2VlayxhZ2VuZGFEYXksbGlzdFdlZWsnXHJcblx0XHR9LFxyXG5cdFx0dmlld3M6IHtcclxuXHRcdFx0bW9udGg6IHtcclxuXHRcdFx0XHQvL3RpdGxlRm9ybWF0OiBnX2xvY190aXRsZWZvcm1hdF9tb250aCwgLy92YXIgZ19sb2NfdGl0bGVmb3JtYXRfbW9udGggPSBcIk1NTU0geXl5eVwiO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRhZ2VuZGE6IHtcclxuXHRcdFx0XHRtaW5UaW1lOiBcIjA4OjAwOjAwXCIsXHJcblx0XHRcdFx0c2xvdExhYmVsRm9ybWF0OiAnaCg6bW0pIGEnXHJcblx0XHRcdH0sXHJcblx0XHRcdGxpc3RXZWVrOiB7XHJcblxyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0bmF2TGlua3M6IHRydWUsXHJcblx0XHRhbGxEYXlEZWZhdWx0OiBmYWxzZSxcclxuXHRcdGRlZmF1bHRWaWV3OiAnYWdlbmRhV2VlaycsXHJcblx0XHRldmVudExpbWl0OiB0cnVlLFxyXG5cdFx0YnV0dG9uVGV4dDoge1xyXG5cdFx0XHR0b2RheTogJ+S7iuWkqScsXHJcblx0XHRcdG1vbnRoOiAn5pyIJyxcclxuXHRcdFx0d2VlazogJ+WRqCcsXHJcblx0XHRcdGRheTogJ+aXpScsXHJcblx0XHRcdGxpc3Q6ICfooagnXHJcbiAgICAgICAgfSxcclxuXHRcdG1vbnRoTmFtZXM6IFtcclxuICAgICAgICAgICAgJzHmnIgnLCAnMuaciCcsICcz5pyIJywgJzTmnIgnLCBcclxuICAgICAgICAgICAgJzXmnIgnLCAnNuaciCcsICc35pyIJywgJzjmnIgnLCBcclxuICAgICAgICAgICAgJznmnIgnLCAnMTDmnIgnLCAnMTHmnIgnLCAnMTLmnIgnXHJcbiAgICAgICAgXSxcclxuXHRcdG1vbnRoTmFtZXNTaG9ydDogW1xyXG4gICAgICAgICAgICAnMeaciCcsICcy5pyIJywgJzPmnIgnLCAnNOaciCcsIFxyXG4gICAgICAgICAgICAnNeaciCcsICc25pyIJywgJzfmnIgnLCAnOOaciCcsIFxyXG4gICAgICAgICAgICAnOeaciCcsICcxMOaciCcsICcxMeaciCcsICcxMuaciCdcclxuICAgICAgICBdLFxyXG5cdFx0ZGF5TmFtZXM6IFtcclxuICAgICAgICAgICAgJ+WRqOaXpScsICflkajkuIAnLCAn5ZGo5LqMJywgJ+WRqOS4iScsICflkajlm5snLCAn5ZGo5LqUJywgJ+WRqOWFrSdcclxuICAgICAgICBdLFxyXG5cdFx0ZGF5TmFtZXNTaG9ydDogW1xyXG4gICAgICAgICAgICAn5ZGo5pelJywgJ+WRqOS4gCcsICflkajkuownLCAn5ZGo5LiJJywgJ+WRqOWbmycsICflkajkupQnLCAn5ZGo5YWtJ1xyXG4gICAgICAgIF0sXHJcblx0XHRzZWxlY3RhYmxlOiB0cnVlLFxyXG5cdFx0c2VsZWN0SGVscGVyOiB0cnVlLFxyXG5cdFx0dW5zZWxlY3RDYW5jZWw6ICcubW9kYWwgKicsXHJcblx0XHRhbGxEYXlUZXh0OiAn5YWo5aSpJyxcclxuXHRcdG5vd0luZGljYXRvcjogdHJ1ZSxcclxuXHRcdGZvcmNlRXZlbnREdXJhdGlvbjogdHJ1ZSxcclxuXHRcdGZpcnN0RGF5OiAxLCAvLyDnrKzkuIDlpKnmmK/lkajkuIDov5jmmK/lkajlpKnvvIzkuI5kYXRlcGlja2Vy5b+F6aG755u45ZCMXHJcblx0XHRkcmFnT3BhY2l0eToge1xyXG5cdFx0XHRcIm1vbnRoXCI6IC41LFxyXG5cdFx0XHRcImFnZW5kYVdlZWtcIjogMSxcclxuXHRcdFx0XCJhZ2VuZGFEYXlcIjogMVxyXG5cdFx0fSxcclxuXHRcdGVkaXRhYmxlOiB0cnVlLFxyXG5cclxuXHRcdC8vIOWIt+aWsOinhuWbvu+8jOmHjeaWsOiOt+WPluaXpeWOhuS6i+S7tlxyXG5cdFx0dmlld1JlbmRlcjogZnVuY3Rpb24oIHZpZXcsIGVsZW1lbnQgKSB7XHJcblx0XHRcdC8vVE9ETzog5oSf6KeJ6L+Z5qC36YCg5oiQ5oCn6IO95LiK55qE5o2f5aSx77yM5piv5ZCm5pyJ5pu05aW955qE5pa55rOV77yfXHJcblx0XHRcdGNvbnN0IGNhbGVuZGFyID0gJCgnI2NhbGVuZGFyJyk7XHJcblx0XHRcdGNvbnN0IGV2ZW50U291cmNlcyA9IGRhdGFMb2FkZXIuZ2V0RXZlbnRTb3VyY2VzKCB2aWV3LCBlbGVtZW50ICk7XHJcblx0XHRcdGNhbGVuZGFyLmZ1bGxDYWxlbmRhcigncmVtb3ZlRXZlbnRzJyk7XHJcblx0XHRcdGZvciAobGV0IGk9MCA7IGkgPCBldmVudFNvdXJjZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRjYWxlbmRhci5mdWxsQ2FsZW5kYXIoJ2FkZEV2ZW50U291cmNlJywgZXZlbnRTb3VyY2VzW2ldKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8g6YCJ5oup5Yqo5L2c6Kem5Y+R55qE5LqL5Lu25Y+l5p+E77yM5a6a5LmJ5LqG5LiA5LiqY2FsbGJhY2tcclxuXHRcdHNlbGVjdDogZnVuY3Rpb24oc3RhcnQsIGVuZCwganNFdmVudCwgdmlldyl7XHJcblx0XHRcdC8vIOW8ueWHuuKAnOWIm+W7uuaXpeWOhuS6i+S7tuKAneeql+WPo1xyXG5cdFx0XHQvLyDliKTmlq3mmK/lkKbmuLLmn5NcclxuXHRcdFx0Ly9UT0RPOiDmg7Plip7ms5XkuI3opoHnlKjlhajlsYDlj5jph49cclxuXHRcdFx0aWYgKCAhd2luZG93LmdfY3JlYXRlTW9kYWwgKSBuZXcgRXZlbnRDcmVhdGVNb2RhbCh7c3RhcnQsIGVuZCwganNFdmVudCwgdmlld30pO1xyXG5cdFx0XHQvLyDkvKDpgJLlj4LmlbBcclxuXHRcdFx0d2luZG93LmdfY3JlYXRlTW9kYWwudXBkYXRlKHtzdGFydCwgZW5kLCBqc0V2ZW50LCB2aWV3fSk7XHJcblx0XHRcdHdpbmRvdy5nX2NyZWF0ZU1vZGFsLnNob3coKTtcclxuXHRcdH0sXHJcblxyXG5cdFx0ZXZlbnREcmFnU3RhcnQ6IGZ1bmN0aW9uKCBldmVudCwganNFdmVudCwgdWksIHZpZXcgKSB7IH0sXHJcblx0XHRldmVudERyYWdTdG9wOiBmdW5jdGlvbiggZXZlbnQsIGpzRXZlbnQsIHVpLCB2aWV3ICkgeyB9LFxyXG5cclxuXHRcdC8vIOaXpeWOhuS6i+S7tuaLluWKqCBldmVudCwgZGVsdGEsIHJldmVydEZ1bmMsIGpzRXZlbnQsIHVpLCB2aWV3XHJcblx0XHRldmVudERyb3A6IGZ1bmN0aW9uKGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXcpe1xyXG5cdFx0XHRpZiAoZXZlbnQuaWQpe1xyXG5cdFx0XHRcdGRhdGFMb2FkZXIudXBkYXRlRXZlbnREYXRhT25Ecm9wKGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXcpXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV2ZXJ0RnVuYygpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cclxuXHRcdC8vIOaXpeWOhuS6i+S7tuaXpeacn+iMg+WbtOmHjee9rlxyXG5cdFx0ZXZlbnRSZXNpemU6IGZ1bmN0aW9uKGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXcpe1xyXG5cdFx0XHRpZiAoZXZlbnQuaWQpe1xyXG5cdFx0XHRcdGRhdGFMb2FkZXIudXBkYXRlRXZlbnREYXRhT25SZXNpemUoZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV2ZXJ0RnVuYygpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cclxuXHRcdGV2ZW50UmVuZGVyOiBmdW5jdGlvbihldmVudE9iaiwgJGVsKSB7XHJcblx0XHRcdC8vIOWFg+e0oOW3sue7j+a4suafk++8jOWPr+S/ruaUueWFg+e0oFxyXG5cdFx0XHRjb25zdCBpc0NvbXBsZXRlID0gcGFyc2VJbnQoZXZlbnRPYmouY29tcGxldGUpID09IDU7XHJcblx0XHRcdGlmICggaXNDb21wbGV0ZSApIHtcclxuXHRcdFx0XHQvLyDmoLflvI9cclxuXHRcdFx0XHQkZWwuYWRkQ2xhc3MoJ3RjLWNvbXBsZXRlJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHR9LFxyXG5cclxuXHRcdC8vIOaXpeWOhuS6i+S7tueCueWHu+WQjuS6i+S7tuWPpeafhFxyXG5cdFx0ZXZlbnRDbGljazogZnVuY3Rpb24oIGV2ZW50LCBqc0V2ZW50LCB2aWV3ICkge1xyXG5cdFx0XHQvLyB0aGlzIOaMh+WQkeWMheijueS6i+S7tueahDxhPuWFg+e0oFxyXG5cclxuXHRcdFx0Ly8g5Yik5pat5piv5ZCm5bey57uP5riy5p+T5by556qXXHJcblx0XHRcdGlmICggIWdfZWRpdFBvcHBlciApIHtcclxuXHRcdFx0XHRnX2VkaXRQb3BwZXIgPSByZW5kZXJFZGl0UG9wcGVyKHtcclxuXHRcdFx0XHRcdCdldmVudCc6IGV2ZW50LFxyXG5cdFx0XHRcdFx0J2pzRXZlbnQnOiBqc0V2ZW50LFxyXG5cdFx0XHRcdFx0J3ZpZXcnOiB2aWV3XHJcblx0XHRcdFx0fSwgdGhpcykuRXZlbnRQb3BvdmVyKCdzaG93Jyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Ly8g5pu05pawcmVmZXJlbmNlXHJcblx0XHRcdFx0Z19lZGl0UG9wcGVyLkV2ZW50UG9wb3Zlcignb3B0aW9uJywge1xyXG5cdFx0XHRcdFx0YXJnczoge1xyXG5cdFx0XHRcdFx0XHQnZXZlbnQnOiBldmVudCxcclxuXHRcdFx0XHRcdFx0J2pzRXZlbnQnOiBqc0V2ZW50LFxyXG5cdFx0XHRcdFx0XHQndmlldyc6IHZpZXdcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR0aXRsZTogZXZlbnQudGl0bGUsXHJcblx0XHRcdFx0XHRyZWZlcmVuY2U6IHRoaXNcclxuXHRcdFx0XHR9KS5FdmVudFBvcG92ZXIoJ3VwZGF0ZScpLkV2ZW50UG9wb3Zlcignc2hvdycpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cdFx0XHJcblx0fSlcclxufSlcclxuKi8iLCJpbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcbmltcG9ydCAnZnVsbGNhbGVuZGFyJztcclxuaW1wb3J0IHsgV2l6RGF0YWJhc2UgYXMgZ19kYiwgV2l6Q29tbW9uVUkgYXMgZ19jbW59IGZyb20gJy4uL3V0aWxzL1dpekludGVyZmFjZSc7XHJcbmltcG9ydCBDb25maWcgZnJvbSAnLi4vdXRpbHMvQ29uZmlnJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbGVuZGFyRXZlbnQge1xyXG5cdC8qKlxyXG4gICAgICog5Yib5bu65LiA5Liq6YCa55So5pel56iLLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIOWOn+Wni+aVsOaNruexu+Wei++8jOWPr+S7peaYryBXaXpFdmVudCwgRnVsbENhbGVuZGFyRXZlbnQg5Lul5Y+KIEdVSUQuXHJcbiAgICAgKi9cclxuXHRjb25zdHJ1Y3RvciggZGF0YSwgY2FsZW5kYXIgKSB7XHJcblx0XHRpZiAoIWdfZGIpIHRocm93IG5ldyBFcnJvcignSVdpekRhdGFiYXNlIGlzIG5vdCB2YWxpZC4nKTtcclxuXHRcdGNvbnN0IHR5cGUgPSB0aGlzLl9jaGVja0RhdGFUeXBlKGRhdGEpO1xyXG5cdFx0c3dpdGNoICggdHlwZSApIHtcclxuXHRcdFx0Y2FzZSBcIldpekV2ZW50XCI6XHJcblx0XHRcdGNhc2UgXCJGdWxsQ2FsZW5kYXJFdmVudFwiOlxyXG5cdFx0XHRcdHRoaXMuX2NyZWF0ZShkYXRhLCB0eXBlKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBcIkdVSURcIjpcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0Ly9UT0RPOiDojrflvpdXaXpFdmVudOaVsOaNru+8jOW5tuWIm+W7uuWvueixoVxyXG5cdFx0XHRcdFx0Y29uc3QgZG9jID0gZ19kYi5Eb2N1bWVudEZyb21HVUlEKGRhdGEpO1xyXG5cdFx0XHRcdFx0Y29uc3QgbmV3RXZlbnREYXRhID0ge1xyXG5cdFx0XHRcdFx0XHRcIkNBTEVOREFSX0VORFwiIDogZG9jLkdldFBhcmFtVmFsdWUoJ0NBTEVOREFSX0VORCcpLFxyXG5cdFx0XHRcdFx0XHRcIkNBTEVOREFSX0lORk9cIiA6IGRvYy5HZXRQYXJhbVZhbHVlKCdDQUxFTkRBUl9JTkZPJyksXHJcblx0XHRcdFx0XHRcdFwiQ0FMRU5EQVJfRVhUUkFJTkZPXCIgOiBkb2MuR2V0UGFyYW1WYWx1ZSgnQ0FMRU5EQVJfRVhUUkFJTkZPJyksXHJcblx0XHRcdFx0XHRcdFwiQ0FMRU5EQVJfU1RBUlRcIiA6IGRvYy5HZXRQYXJhbVZhbHVlKCdDQUxFTkRBUl9TVEFSVCcpLFxyXG5cdFx0XHRcdFx0XHRcIkNBTEVOREFSX1JFQ1VSUkVOQ0VcIiA6IGRvYy5HZXRQYXJhbVZhbHVlKCdDQUxFTkRBUl9SRUNVUlJFTkNFJyksXHJcblx0XHRcdFx0XHRcdFwiQ0FMRU5EQVJfRU5EUkVDVVJSRU5DRVwiIDogZG9jLkdldFBhcmFtVmFsdWUoJ0NBTEVOREFSX0VORFJFQ1VSUkVOQ0UnKSxcclxuXHRcdFx0XHRcdFx0XCJjcmVhdGVkXCIgOiBtb21lbnQoZG9jLkRhdGVDcmVhdGVkKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKSxcclxuXHRcdFx0XHRcdFx0XCJndWlkXCIgOiBkb2MuR1VJRCxcclxuXHRcdFx0XHRcdFx0XCJ0aXRsZVwiIDogZG9jLlRpdGxlLFxyXG5cdFx0XHRcdFx0XHRcInVwZGF0ZWRcIiA6IG1vbWVudChkb2MuRGF0ZU1vZGlmaWVkKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0dGhpcy5fY3JlYXRlKG5ld0V2ZW50RGF0YSwgJ1dpekV2ZW50Jyk7XHJcblx0XHRcdFx0fSBjYXRjaCAoZSkgeyBjb25zb2xlLmVycm9yKGUpOyB9XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0X2NyZWF0ZShkYXRhLCB0eXBlKSB7XHJcblx0XHRsZXQgc3RhcnQsIGVuZCwgaWQsIGJrQ29sb3IsIGFsbERheSwgY29tcGxldGUsIGRhdGVDb21wbGV0ZWQsIHJwdFJ1bGUsIHJwdEVuZDtcclxuXHRcdHN3aXRjaCAodHlwZSkge1xyXG5cdFx0XHRjYXNlIFwiR1VJRFwiOlxyXG5cdFx0XHRjYXNlIFwiV2l6RXZlbnRcIjpcclxuXHRcdFx0XHR0aGlzLl9JbmZvID0gdGhpcy5fcGFyc2VJbmZvKGRhdGEuQ0FMRU5EQVJfSU5GTyk7XHJcblx0XHRcdFx0dGhpcy5fRXh0cmFJbmZvID0gZGF0YS5DQUxFTkRBUl9FWFRSQUlORk8gPyB0aGlzLl9wYXJzZUluZm8oZGF0YS5DQUxFTkRBUl9FWFRSQUlORk8pIDogdGhpcy5fZ2V0RGVmYXVsdEV4dHJhSW5mbygpO1xyXG5cdFx0XHRcdC8vIOe7n+S4gOWPmOmHj1xyXG5cdFx0XHRcdGlkID0gZGF0YS5ndWlkO1xyXG5cdFx0XHRcdHN0YXJ0ID0gZGF0YS5DQUxFTkRBUl9TVEFSVDtcclxuXHRcdFx0XHRlbmQgPSBkYXRhLkNBTEVOREFSX0VORDtcclxuXHRcdFx0XHQvLyDliKTmlq3mmK/lkKbnlKjmiLfoh6rlrprkuYnog4zmma/oibLvvIzlkJHkuIvlhbzlrrnljp/niYjml6XljoZcclxuXHRcdFx0XHRia0NvbG9yID0gdGhpcy5fSW5mby5jaSA/ICggcGFyc2VJbnQodGhpcy5fSW5mby5jaSkgPT0gMCA/IHRoaXMuX0luZm8uYiA6IENvbmZpZy5jb2xvckl0ZW1zW3RoaXMuX0luZm8uY2ldLmNvbG9yVmFsdWUgKSA6IHRoaXMuX0luZm8uYjtcclxuXHRcdFx0XHRhbGxEYXkgPSBkYXRhLkNBTEVOREFSX0VORC5pbmRleE9mKFwiMjM6NTk6NTlcIikgIT0gLTEgPyB0cnVlIDogZmFsc2U7XHJcblx0XHRcdFx0Y29tcGxldGUgPSB0aGlzLl9FeHRyYUluZm8uQ29tcGxldGU7XHJcblx0XHRcdFx0ZGF0ZUNvbXBsZXRlZCA9IHRoaXMuX0V4dHJhSW5mby5EYXRlQ29tcGxldGVkO1xyXG5cdFx0XHRcdC8vIOmHjeWkjeS6i+S7tlxyXG5cdFx0XHRcdHJwdFJ1bGUgPSBkYXRhLkNBTEVOREFSX1JFQ1VSUkVOQ0U7XHJcblx0XHRcdFx0cnB0RW5kID0gZGF0YS5DQUxFTkRBUl9FTkRSRUNVUlJFTkNFO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIFwiRnVsbENhbGVuZGFyRXZlbnRcIjpcclxuXHRcdFx0XHRpZCA9IGRhdGEuaWQ7XHJcblx0XHRcdFx0c3RhcnQgPSBkYXRhLnN0YXJ0O1xyXG5cdFx0XHRcdGVuZCA9IGRhdGEuZW5kO1xyXG5cdFx0XHRcdGJrQ29sb3IgPSBkYXRhLmJhY2tncm91bmRDb2xvcjtcclxuXHRcdFx0XHRhbGxEYXkgPSBkYXRhLmFsbERheSA/IGRhdGEuYWxsRGF5IDogISQuZnVsbENhbGVuZGFyLm1vbWVudChkYXRhLnN0YXJ0KS5oYXNUaW1lKCk7XHJcblx0XHRcdFx0Y29tcGxldGUgPSBkYXRhLmNvbXBsZXRlIHx8IDA7XHJcblx0XHRcdFx0ZGF0ZUNvbXBsZXRlZCA9IGRhdGEuZGF0ZUNvbXBsZXRlZCB8fCAnJztcclxuXHRcdFx0XHRycHRSdWxlID0gZGF0YS5ycHRSdWxlO1xyXG5cdFx0XHRcdHJwdEVuZCA9IGRhdGEucnB0RW5kXHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGlkZW50aWZ5IGRhdGEgdHlwZS4nKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHRcdC8vIOWfuuacrOS/oeaBr1xyXG5cdFx0dGhpcy5pZCA9IGlkO1xyXG5cdFx0dGhpcy50aXRsZSA9IGRhdGEudGl0bGU7XHJcblx0XHQvLyDml7bpl7Tkv6Hmga9cclxuXHRcdHRoaXMuYWxsRGF5ID0gYWxsRGF5O1xyXG5cdFx0Ly8g5rOo5oSP77yBc3RhcnQvZW5kIOWPr+iDveaYr21vbWVudOWvueixoeaIluiAhXN0cu+8jOaJgOS7peS4gOW+i+WFiOi9rOaNouaIkG1vbWVudOWGjeagvOW8j+WMlui+k+WHulxyXG5cdFx0dGhpcy5zdGFydCA9IGFsbERheSA/IG1vbWVudChzdGFydCkuZm9ybWF0KFwiWVlZWS1NTS1ERFwiKSA6IG1vbWVudChzdGFydCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHR0aGlzLmVuZCA9IGFsbERheSA/IG1vbWVudChlbmQpLmZvcm1hdChcIllZWVktTU0tRERcIikgOiBtb21lbnQoZW5kKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdHRoaXMuY3JlYXRlZCA9IGRhdGEuY3JlYXRlZCA/IGRhdGEuY3JlYXRlZCA6IG1vbWVudChzdGFydCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHR0aGlzLnVwZGF0ZWQgPSBkYXRhLnVwZGF0ZWQgPyBkYXRhLnVwZGF0ZWQgOiBtb21lbnQoKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdC8vIOiuvue9ruS/oeaBr1xyXG5cdFx0dGhpcy50ZXh0Q29sb3IgPSAnYmxhY2snO1xyXG5cdFx0dGhpcy5iYWNrZ3JvdW5kQ29sb3IgPSBia0NvbG9yO1xyXG5cdFx0dGhpcy5jb21wbGV0ZSA9IGNvbXBsZXRlO1xyXG5cdFx0dGhpcy5kYXRlQ29tcGxldGVkID0gZGF0ZUNvbXBsZXRlZDtcclxuXHRcdC8vIOmHjeWkjeS6i+S7tlxyXG5cdFx0dGhpcy5ycHRSdWxlID0gcnB0UnVsZSB8fCAnbm9uZSc7XHJcblx0XHR0aGlzLnJwdEVuZCA9IHJwdEVuZDtcclxuXHRcdC8vXHJcblx0XHR0aGlzLl91cGRhdGUoKTtcclxuXHR9XHJcblxyXG5cdF9jaGVja0RhdGFUeXBlKGRhdGEpIHtcclxuXHRcdGNvbnN0IG9iakNsYXNzID0gZGF0YS5jb25zdHJ1Y3RvcjtcclxuICAgICAgICBjb25zdCBHVUlEX1JlZ0V4ciA9IC9eWzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtNV1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn0kL2k7XHJcbiAgICAgICAgbGV0IHR5cGU7XHJcbiAgICAgICAgc3dpdGNoIChvYmpDbGFzcykge1xyXG4gICAgICAgICAgICBjYXNlIFN0cmluZzpcclxuICAgICAgICAgICAgICAgIGlmICggR1VJRF9SZWdFeHIudGVzdChkYXRhKSApIHR5cGUgPSBcIkdVSURcIjtcclxuICAgICAgICAgICAgICAgIGVsc2UgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGRhdGEsIGNhbm5vdCBjcmVhdGUgQ2FsZW5kYXJFdmVudCBvYmplY3QuJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBPYmplY3Q6XHJcblx0XHRcdFx0aWYgKCBkYXRhLkNBTEVOREFSX0lORk8gJiYgZGF0YS50aXRsZSApIHsgXHJcblx0XHRcdFx0XHR0eXBlID0gJ1dpekV2ZW50JztcclxuXHRcdFx0XHR9IGVsc2UgaWYgKCBkYXRhLnN0YXJ0ICYmIGRhdGEudGl0bGUgKSB7XHJcblx0XHRcdFx0XHR0eXBlID0gJ0Z1bGxDYWxlbmRhckV2ZW50JztcclxuXHRcdFx0XHR9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHR5cGU7XHJcblx0fTtcclxuXHJcblx0X3BhcnNlSW5mbyhJbmZvU3RyaW5nKSB7XHJcblx0XHRjb25zdCBJbmZvT2JqZWN0ID0ge307XHJcblx0XHQvLyDmi4bop6NDQUxFTkRBUl9JTkZPXHJcblx0XHRjb25zdCBJbmZvQXJyYXkgPSBJbmZvU3RyaW5nLnNwbGl0KCcvJyk7XHJcblx0XHRJbmZvQXJyYXkuZm9yRWFjaChmdW5jdGlvbihpdGVtLCBpbmRleCwgYXJyKXtcclxuXHRcdFx0Y29uc3QgcGFpciA9IGl0ZW0uc3BsaXQoJz0nKTtcclxuXHRcdFx0SW5mb09iamVjdFtwYWlyWzBdXSA9IHBhaXJbMV07XHJcblx0XHR9KTtcclxuXHRcdC8vIOWkhOeQhuminOiJsuWAvFxyXG5cdFx0aWYgKCBJbmZvT2JqZWN0LmIgKSBJbmZvT2JqZWN0LmIgPSAnIycgKyBJbmZvT2JqZWN0LmI7XHJcblxyXG5cdFx0cmV0dXJuIEluZm9PYmplY3Q7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcbiAgICAgKiDlsIYgSW5mbyDlr7nosaHluo/liJfljJYuXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gW0luZm9PYmplY3Q9XSDmj5DkvpsgSW5mbyDlr7nosaHvvIzpu5jorqTkuLpgdGhpcy5fSW5mb2AuXHJcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IOi/lOWbnueUqOS6jkluZm/lr7nosaHlrZfnrKbkuLIuXHJcbiAgICAgKi9cclxuXHRfc3RyaW5naWZ5SW5mbyggSW5mb09iamVjdCA9IHRoaXMuX0luZm8gKSB7XHJcblx0XHRpZiAoICFJbmZvT2JqZWN0ICkgcmV0dXJuICcnO1xyXG5cdFx0Y29uc3QgSW5mb0FycmF5ID0gW107XHJcblx0XHRjb25zdCBJbmZvT2JqZWN0S2V5c0FycmF5ID0gT2JqZWN0LmtleXMoSW5mb09iamVjdCk7XHJcblx0XHRJbmZvT2JqZWN0S2V5c0FycmF5LmZvckVhY2goZnVuY3Rpb24oaXRlbSwgaW5kZXgsIGFycil7XHJcblx0XHRcdGNvbnN0IHNpbmdsZUluZm8gPSBgJHtpdGVtfT0ke0luZm9PYmplY3RbaXRlbV19YDtcclxuXHRcdFx0SW5mb0FycmF5LnB1c2goc2luZ2xlSW5mbyk7XHJcblx0XHR9KTtcclxuXHRcdHJldHVybiBJbmZvQXJyYXkuam9pbignLycpLnJlcGxhY2UoJyMnLCAnJyk7XHJcblx0fTtcclxuXHJcblx0X3VwZGF0ZSgpIHtcclxuXHRcdHRoaXMuX3VwZGF0ZUluZm8oKTtcclxuXHRcdHRoaXMuX3VwZGF0ZUV4dHJhSW5mbygpO1xyXG5cdH07XHJcblxyXG5cdF91cGRhdGVJbmZvKCkge1xyXG5cdFx0Y29uc3QgdGhhdCA9IHRoaXM7XHJcblx0XHRjb25zdCBJbmZvT2JqZWN0ID0ge1xyXG5cdFx0XHQnYic6IG51bGwsIC8v6IOM5pmv6ImyaGV45YC8XHJcblx0XHRcdCdyJzogJy0xJywgLy/mj5DphpLmlrnlvI9cclxuXHRcdFx0J2MnOiAnMCcsIC8v57uT5p2f5o+Q6YaS5L+h5oGvXHJcblx0XHRcdCdjaSc6IDAgLy/og4zmma/oibJJRO+8jOm7mOiupCAwIOihqOekuuiDjOaZr+S4uueUqOaIt+iHquWumuS5iVxyXG5cdFx0fTtcclxuXHRcdC8vIOabtOaWsOiDjOaZr+iJsidiJ1xyXG5cdFx0SW5mb09iamVjdFsnYiddID0gdGhpcy5iYWNrZ3JvdW5kQ29sb3IucmVwbGFjZSgnIycsICcnKTtcclxuXHRcdC8vIOabtOaWsOminOiJsuaMh+aVsCdjaSdcclxuXHRcdENvbmZpZy5jb2xvckl0ZW1zLmZvckVhY2goZnVuY3Rpb24oaXRlbSwgaW5kZXgsIGFycil7XHJcblx0XHRcdGlmICggaXRlbS5jb2xvclZhbHVlID09ICB0aGF0LmJhY2tncm91bmRDb2xvciApIHtcclxuXHRcdFx0XHQvLyDlvZPml6XnqIvog4zmma/oibLkuI7oibLooajljLnphY3ml7bliJnnlKggY29sb3IgaWRleCDmnaXlgqjlrZjvvIjlhbzlrrnljp/niYjml6Xljobmj5Lku7bvvIlcclxuXHRcdFx0XHRJbmZvT2JqZWN0WydjaSddID0gaW5kZXg7XHJcblx0XHRcdH07XHJcblx0XHR9KTtcclxuXHRcdC8vIOW6lOeUqOabtOaWsFxyXG5cdFx0dGhpcy5fSW5mbyA9IEluZm9PYmplY3Q7XHJcblx0fTtcclxuXHJcblx0X2dldERlZmF1bHRFeHRyYUluZm8oKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHQnQ29tcGxldGUnOiAwLCAvL1xyXG5cdFx0XHQnRGF0ZUNvbXBsZXRlZCc6ICcnLCAvLyBJU08g5qCH5YeG5pel5pyf5a2X56ym5LiyIFlZWVktTU0tREQgMDA6MDA6MDBcclxuXHRcdFx0J1ByaW9yJzogMFxyXG5cdFx0fTtcclxuXHR9O1xyXG5cclxuXHRfdXBkYXRlRXh0cmFJbmZvKCkge1xyXG5cdFx0Y29uc3QgRXh0cmFJbmZvT2JqZWN0ID0ge1xyXG5cdFx0XHQnQ29tcGxldGUnOiAwLFxyXG5cdFx0XHQnRGF0ZUNvbXBsZXRlZCc6ICcnLFxyXG5cdFx0XHQnUHJpb3InOiAwXHJcblx0XHR9O1xyXG5cdFx0RXh0cmFJbmZvT2JqZWN0WydDb21wbGV0ZSddID0gdGhpcy5jb21wbGV0ZTtcclxuXHRcdEV4dHJhSW5mb09iamVjdFsnRGF0ZUNvbXBsZXRlZCddID0gdGhpcy5kYXRlQ29tcGxldGVkO1xyXG5cdFx0dGhpcy5fRXh0cmFJbmZvID0gRXh0cmFJbmZvT2JqZWN0O1xyXG5cdH07XHJcblxyXG5cdF9nZXRFdmVudEh0bWwodGl0bGUgPSB0aGlzLnRpdGxlLCBjb250ZW50ID0gJycpe1xyXG5cdFx0Y29uc3QgaHRtbFRleHQgPSBcclxuXHRcdFx0YDxodG1sPlxyXG5cdFx0XHRcdDxoZWFkPlxyXG5cdFx0XHRcdFx0PG1ldGEgaHR0cC1lcXVpdj1cIkNvbnRlbnQtVHlwZVwiIGNvbnRlbnQ9XCJ0ZXh0L2h0bWw7IGNoYXJzZXQ9dW5pY29kZVwiPlxyXG5cdFx0XHRcdFx0PHRpdGxlPiR7dGl0bGV9PC90aXRsZT4gXHJcblx0XHRcdFx0PC9oZWFkPlxyXG5cdFx0XHRcdDxib2R5PlxyXG5cdFx0XHRcdFx0PCEtLVdpekh0bWxDb250ZW50QmVnaW4tLT5cclxuXHRcdFx0XHRcdDxkaXY+JHtjb250ZW50fTwvZGl2PlxyXG5cdFx0XHRcdFx0PCEtLVdpekh0bWxDb250ZW50RW5kLS0+XHJcblx0XHRcdFx0PC9ib2R5PlxyXG5cdFx0XHQ8L2h0bWw+YDtcclxuXHRcclxuXHRcdCAgcmV0dXJuIGh0bWxUZXh0XHJcblx0fTtcclxuXHJcblx0LyoqXHJcbiAgICAgKiDmoLnmja7ml6XnqIvnmoTph43lpI3op4TliJnnlJ/miJAgRnVsbENhbGVuZGFyIGV2ZW50U291cmNlLlxyXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBzdGFydCDmn6Xor6Lotbflp4vvvIxJU08g5qCH5YeG5pel5pyf5a2X56ym5LiyLlxyXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBlbmQg5p+l6K+i57uT5p2f77yMSVNPIOagh+WHhuaXpeacn+Wtl+espuS4si5cclxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IGV2ZW50U291cmNlLlxyXG4gICAgICovXHJcblx0Z2VuZXJhdGVSZXBlYXRFdmVudHMoc3RhcnQsIGVuZCkge1xyXG5cdFx0aWYgKCAhdGhpcy5ycHRSdWxlICkgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgZmluZCBDYWxlbmRhckV2ZW50IHJlcGVhdCBydWxlLicpO1xyXG5cdFx0Y29uc3QgZXZlbnRTb3VyY2UgPSB7XHJcblx0XHRcdGlkOiB0aGlzLmlkLFxyXG5cdFx0XHRldmVudHM6IFtdXHJcblx0XHR9XHJcblx0XHQvL+agueaNrnJwdFJ1bGXnlJ/miJDph43lpI3ml6XmnJ/vvIzlubbnlJ/miJDkuovku7ZcclxuXHRcdGNvbnN0IGRheUFycmF5ID0gdGhpcy5fZ2V0UmVuZGVyUmVwZWF0RGF5KHN0YXJ0LCBlbmQpO1xyXG5cdFx0Zm9yICggbGV0IGRheSBvZiBkYXlBcnJheSApIHtcclxuXHRcdFx0Ly8gZGF5IOaYr+S4gOS4qk1vbWVudOaXpeacn+WvueixoVxyXG5cdFx0XHRjb25zdCBuZXdFdmVudCA9IHRoaXMudG9GdWxsQ2FsZW5kYXJFdmVudCgpO1xyXG5cdFx0XHRuZXdFdmVudC5zdGFydCA9IGRheS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0bmV3RXZlbnQuZW5kID0gbW9tZW50KG5ld0V2ZW50LmVuZCkuYWRkKCBkYXkuZGlmZiggbW9tZW50KHRoaXMuc3RhcnQpICkgKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0ZXZlbnRTb3VyY2UuZXZlbnRzLnB1c2gobmV3RXZlbnQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBldmVudFNvdXJjZTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuICAgICAqIOagueaNruinhOWImeeUn+aIkOaXpeacn+aVsOe7hFxyXG4gICAgICogQHJldHVybnMge09iamVjdFtdfSDljIXlkKvkuIDns7vliJdgTW9tZW50YOaXpeacn+WvueixoeeahOaVsOe7hC5cclxuICAgICAqL1xyXG5cdF9nZXRSZW5kZXJSZXBlYXREYXkoc3RhcnQsIGVuZCkge1xyXG5cdFx0Y29uc3QgcnB0UnVsZSA9IHRoaXMucnB0UnVsZTtcclxuXHRcdGxldCBkYXlBcnJheTtcclxuXHRcdGxldCByZWdleDtcclxuXHRcdGNvbnNvbGUubG9nKHJwdFJ1bGUpO1xyXG5cdFx0aWYgKCAocmVnZXggPSAvXkV2ZXJ5KFxcZCk/V2Vla3M/KFxcZCopJC8pLnRlc3QocnB0UnVsZSkgKSB7XHJcblx0XHRcdC8vIOavj1sxMjM0XeWRqFs3MTIzNDU2XVxyXG5cdFx0XHRjb25zdCBjdXJXZWVrRGF5ID0gbW9tZW50KHRoaXMuc3RhcnQpLmRheSgpO1xyXG5cdFx0XHRjb25zdCByZXN1bHRzID0gcmVnZXguZXhlYyhycHRSdWxlKTtcclxuXHRcdFx0Y29uc3QgaW50ZXJXZWVrID0gcmVzdWx0c1sxXTtcclxuXHRcdFx0Y29uc3QgbnVtYmVyID0gcmVzdWx0c1syXSB8fCBgJHtjdXJXZWVrRGF5fWA7XHJcblx0XHRcdGRheUFycmF5ID0gdGhpcy5fZ2V0V2Vla2x5UmVwZWF0RGF5KG51bWJlciwgc3RhcnQsIGVuZCwgaW50ZXJXZWVrKTtcclxuXHJcblx0XHR9IGVsc2UgaWYgKCAocmVnZXggPSAvXkV2ZXJ5V2Vla2RheShcXGQqKSQvKS50ZXN0KHJwdFJ1bGUpICkge1xyXG5cdFx0XHQvLyDmr4/kuKrlt6XkvZzml6VFdmVyeVdlZWtkYXkxMzVcclxuXHRcdFx0Y29uc3QgcmVzdWx0cyA9IHJlZ2V4LmV4ZWMocnB0UnVsZSk7XHJcblx0XHRcdGNvbnN0IG51bWJlciA9IHJlc3VsdHNbMV0gfHwgJzEyMzQ1JztcclxuXHRcdFx0ZGF5QXJyYXkgPSB0aGlzLl9nZXRXZWVrbHlSZXBlYXREYXkobnVtYmVyLCBzdGFydCwgZW5kKTtcclxuXHJcblx0XHR9IGVsc2UgaWYgKCAocmVnZXggPSAvRGFpbHl8V2Vla2x5fE1vbnRobHl8WWVhcmx5LykudGVzdChycHRSdWxlKSApIHtcclxuXHRcdFx0Ly8gRGFpbHl8V2Vla2x5fE1vbnRobHl8WWVhcmx5XHJcblx0XHRcdGNvbnN0IHBlclJ1bGUgPSByZWdleC5leGVjKHJwdFJ1bGUpWzBdXHJcblx0XHRcdGRheUFycmF5ID0gdGhpcy5fZ2V0UGVyUmVwZWF0RGF5cyhzdGFydCwgZW5kLCBwZXJSdWxlKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGRheUFycmF5O1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG4gICAgICog5qC55o2u5q+P5ZGo6KeE5YiZ55Sf5oiQ5pel5pyf5pWw57uEXHJcblx0ICogQHBhcmFtIHtTdHJpbmd9IG51bWJlciDmlbTmlbDlrZfnrKbkuLLooajnpLrnmoTop4TliJnvvJtcclxuICAgICAqIEByZXR1cm5zIHtPYmplY3RbXX0g5YyF5ZCr5LiA57O75YiXTW9tZW505pel5pyf5a+56LGh55qE5pWw57uELlxyXG4gICAgICovXHJcblx0X2dldFdlZWtseVJlcGVhdERheShudW1iZXIsIHN0YXJ0LCBlbmQsIGludGVyV2Vla3MgPSAnMScpIHtcclxuXHRcdC8v6L+U5ZueW3tzdGFydCwgZW5kfSwge3N0YXJ0LCBlbmR9LCB7c3RhcnQsIGVuZH1dXHJcblx0XHQvL+iAg+iZkea4suafk+iMg+WbtO+8jOS7peWPiue7k+adn+W+queOr+eahOaXpeacn1xyXG5cdFx0Y29uc3Qgdmlld1N0YXJ0ID0gbW9tZW50KHRoaXMuc3RhcnQpO1xyXG5cdFx0Y29uc3Qgdmlld0VuZCA9IG1vbWVudChlbmQpO1xyXG5cdFx0Y29uc3QgcnB0RW5kID0gdGhpcy5ycHRFbmQgPyBtb21lbnQodGhpcy5ycHRFbmQpIDogdmlld0VuZDtcclxuXHRcdGxldCBkYXlBcnJheSA9IFtdO1xyXG5cdFx0Y29uc3QgaW50ZXJ2YWxXZWVrcyA9IGludGVyV2Vla3MgPyBwYXJzZUludChpbnRlcldlZWtzKSA6IDE7XHJcblx0XHRjb25zdCB3ZWVrZGF5cyA9IG51bWJlci5yZXBsYWNlKCc3JywgJzAnKS5zcGxpdCgnJyk7IC8v5ZGo5pelMH425ZGo5YWtXHJcblx0XHRmb3IgKCBsZXQgZGF5IG9mIHdlZWtkYXlzICkge1xyXG5cdFx0XHQvL1xyXG5cdFx0XHRsZXQgY3VyV2Vla0RheSA9IHBhcnNlSW50KGRheSksIG5ld0V2ZW50U3RhcnREYXRlID0gbW9tZW50KHZpZXdTdGFydCk7XHJcblx0XHRcdGRvIHtcclxuXHRcdFx0XHQvLyDliJvlu7rmlrBNb21lbnTlr7nosaFcclxuXHRcdFx0XHRuZXdFdmVudFN0YXJ0RGF0ZSA9IG1vbWVudCh2aWV3U3RhcnQpLmRheShjdXJXZWVrRGF5KTtcclxuXHRcdFx0XHQvLyDmoLnmja7ml6XnqIvorr7nva50aW1lIHBhcnRcclxuXHRcdFx0XHRjb25zdCBldmVudFN0YXJ0ID0gbW9tZW50KHRoaXMuc3RhcnQpXHJcblx0XHRcdFx0bmV3RXZlbnRTdGFydERhdGUuc2V0KHtcclxuXHRcdFx0XHRcdCdob3VyJzogZXZlbnRTdGFydC5nZXQoJ2hvdXInKSxcclxuXHRcdFx0XHRcdCdtaW51dGUnOiBldmVudFN0YXJ0LmdldCgnbWludXRlJyksXHJcblx0XHRcdFx0XHQnc2Vjb25kJzogZXZlbnRTdGFydC5nZXQoJ3NlY29uZCcpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQvLyDpgb/lhY3liJ3lp4vph43lpI3muLLmn5NcclxuXHRcdFx0XHRpZiAoICFuZXdFdmVudFN0YXJ0RGF0ZS5pc1NhbWUoIGV2ZW50U3RhcnQgKSApIGRheUFycmF5LnB1c2goIG1vbWVudChuZXdFdmVudFN0YXJ0RGF0ZSkgKTtcclxuXHRcdFx0XHQvLyDpmpTlpJrlsJHlkajph43lpI1cclxuXHRcdFx0XHRjdXJXZWVrRGF5ICs9IDcqaW50ZXJ2YWxXZWVrcztcclxuXHRcdFx0XHQvL2NvbnNvbGUubG9nKCBtb21lbnQobmV3RXZlbnRTdGFydERhdGUpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpICk7XHJcblx0XHRcdH0gd2hpbGUgKCBtb21lbnQodmlld1N0YXJ0KS5kYXkoY3VyV2Vla0RheSArIDcgKS5pc0JlZm9yZSggdmlld0VuZCApIFxyXG5cdFx0XHRcdFx0XHQmJiBtb21lbnQodmlld1N0YXJ0KS5kYXkoY3VyV2Vla0RheSArIDcgKS5pc0JlZm9yZSggcnB0RW5kICkgIClcclxuXHRcdFx0XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiBkYXlBcnJheTtcclxuXHR9O1xyXG5cclxuXHRfZ2V0UGVyUmVwZWF0RGF5cyhzdGFydCwgZW5kLCBwZXJSdWxlKSB7XHJcblx0XHRjb25zdCBwZXJSdWxlTWFwID0ge1xyXG5cdFx0XHQnRGFpbHknOiAnZGF5cycsXHJcblx0XHRcdCdXZWVrbHknIDogJ3dlZWtzJyxcclxuXHRcdFx0J01vbnRobHknIDogJ21vbnRocycsXHJcblx0XHRcdCdZZWFybHknIDogJ3llYXJzJ1xyXG5cdFx0fTtcclxuXHRcdGNvbnN0IHZpZXdTdGFydCA9IG1vbWVudCh0aGlzLnN0YXJ0KTtcclxuXHRcdGNvbnN0IHZpZXdFbmQgPSBtb21lbnQoZW5kKTtcclxuXHRcdGNvbnN0IHJwdEVuZCA9IHRoaXMucnB0RW5kID8gbW9tZW50KHRoaXMucnB0RW5kKSA6IHZpZXdFbmQ7XHJcblx0XHRsZXQgZGF5QXJyYXkgPSBbXTtcclxuXHRcdGNvbnN0IGV2ZW50U3RhcnQgPSBtb21lbnQodGhpcy5zdGFydClcclxuXHRcdGRvIHtcclxuXHRcdFx0Ly8g5aKe5Yqg5LiA5Liq5pyIXHJcblx0XHRcdGV2ZW50U3RhcnQuYWRkKDEsIHBlclJ1bGVNYXBbcGVyUnVsZV0pO1xyXG5cdFx0XHRkYXlBcnJheS5wdXNoKCBtb21lbnQoZXZlbnRTdGFydCkgKTtcclxuXHRcdH0gd2hpbGUgKCBldmVudFN0YXJ0LmlzQmVmb3JlKCB2aWV3RW5kICkgJiYgZXZlbnRTdGFydC5pc0JlZm9yZSggcnB0RW5kICkgKTtcclxuXHJcblx0XHRyZXR1cm4gZGF5QXJyYXk7XHJcblx0fVxyXG5cclxuXHR0b0Z1bGxDYWxlbmRhckV2ZW50KCkge1xyXG5cdFx0Y29uc3QgbmV3RXZlbnQgPSAkLmV4dGVuZCh7fSwgdGhpcyk7XHJcblx0XHQvLyDliKDpmaTml6DlhbPmlbDmja5cclxuXHRcdGRlbGV0ZSBuZXdFdmVudC5fSW5mbztcclxuXHRcdGRlbGV0ZSBuZXdFdmVudC5fRXh0cmFJbmZvO1xyXG5cdFx0cmV0dXJuIG5ld0V2ZW50O1xyXG5cdH07XHJcblxyXG5cdHRvV2l6RXZlbnREYXRhKCkge1xyXG5cdFx0dGhpcy5fdXBkYXRlKCk7XHJcblx0XHRjb25zdCBuZXdFdmVudCA9IHt9O1xyXG5cdFx0bmV3RXZlbnQudGl0bGUgPSB0aGlzLnRpdGxlO1xyXG5cdFx0bmV3RXZlbnQuZ3VpZCA9IHRoaXMuaWQ7XHJcblx0XHRuZXdFdmVudC5DQUxFTkRBUl9TVEFSVCA9IHRoaXMuYWxsRGF5ID8gbW9tZW50KHRoaXMuc3RhcnQpLmZvcm1hdCgnWVlZWS1NTS1ERCAwMDowMDowMCcpIDogdGhpcy5zdGFydDtcclxuXHRcdG5ld0V2ZW50LkNBTEVOREFSX0VORCA9IHRoaXMuYWxsRGF5ID8gbW9tZW50KHRoaXMuZW5kKS5mb3JtYXQoJ1lZWVktTU0tREQgMjM6NTk6NTknKSA6IHRoaXMuZW5kO1xyXG5cdFx0bmV3RXZlbnQuQ0FMRU5EQVJfSU5GTyA9IHRoaXMuX3N0cmluZ2lmeUluZm8odGhpcy5fSW5mbyk7XHJcblx0XHRuZXdFdmVudC5DQUxFTkRBUl9FWFRSQUlORk8gPSB0aGlzLl9zdHJpbmdpZnlJbmZvKHRoaXMuX0V4dHJhSW5mbyk7XHJcblx0XHRuZXdFdmVudC5jcmVhdGVkID0gdGhpcy5jcmVhdGVkO1xyXG5cdFx0bmV3RXZlbnQudXBkYXRlZCA9IHRoaXMudXBkYXRlZDtcclxuXHRcdHJldHVybiBuZXdFdmVudDtcclxuXHR9O1xyXG5cclxuXHRfc2F2ZUFsbFByb3AoKSB7XHJcblx0XHQvL1RPRE86IOS/neWtmOWFqOmDqOaVsOaNruWMheaLrFRpdGxlXHJcblx0XHQvLyDmm7TmlrDkuovku7bmlofmoaPmlbDmja5cclxuXHRcdGNvbnN0IGRvYyA9IGdfZGIuRG9jdW1lbnRGcm9tR1VJRCh0aGlzLmlkKTtcclxuXHRcdC8vIOS/neWtmOagh+mimFxyXG5cdFx0ZG9jLlRpdGxlID0gdGhpcy50aXRsZTtcclxuXHRcdC8vIOS/neWtmOaXtumXtOaVsOaNrlxyXG5cdFx0aWYgKCB0aGlzLmFsbERheSApIHtcclxuXHRcdFx0bGV0IHN0YXJ0U3RyID0gbW9tZW50KHRoaXMuc3RhcnQpLnNldCh7J2gnOiAwLCAnbSc6IDAsICdzJzogMH0pLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHRsZXQgZW5kU3RyID0gbW9tZW50KHRoaXMuZW5kKS5zZXQoeydoJzogMjMsICdtJzogNTksICdzJzogNTl9KS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfU1RBUlRcIiwgc3RhcnRTdHIpO1xyXG5cdFx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9FTkRcIiwgZW5kU3RyKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGxldCBzdGFydFN0ciA9IG1vbWVudCh0aGlzLnN0YXJ0KS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0bGV0IGVuZFN0ciA9IG1vbWVudCh0aGlzLmVuZCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX1NUQVJUXCIsIHN0YXJ0U3RyKTtcclxuXHRcdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfRU5EXCIsIGVuZFN0cik7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8g5L+d5a2YIENBTEVOREFSX0lORk9cclxuXHRcdHRoaXMuX3VwZGF0ZSgpO1xyXG5cdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfSU5GT1wiLCB0aGlzLl9zdHJpbmdpZnlJbmZvKHRoaXMuX0luZm8pKTtcclxuXHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX0VYVFJBSU5GT1wiLCB0aGlzLl9zdHJpbmdpZnlJbmZvKHRoaXMuX0V4dHJhSW5mbykpO1xyXG5cdH07XHJcblxyXG5cdC8vIOiuvue9ruaWh+aho+WxnuaAp+WAvFxyXG5cdF9zZXRQYXJhbVZhbHVlKGRvYywga2V5LCB2YWx1ZSkge1xyXG5cdFx0aWYgKCFkb2MpIHJldHVybiBmYWxzZTtcclxuXHRcdGRvYy5TZXRQYXJhbVZhbHVlKGtleSwgdmFsdWUpO1xyXG5cdH07XHJcblxyXG5cdF9jcmVhdGVXaXpFdmVudERvYygpIHtcclxuXHRcdC8vIOS/neWtmOWFqOmDqOaVsOaNruWMheaLrFRpdGxlXHJcblx0XHQvLyDliJvlu7pXaXpEb2NcclxuXHRcdGNvbnN0IGxvY2F0aW9uID0gYE15IEV2ZW50cy8keyBtb21lbnQodGhpcy5zdGFydCkuZm9ybWF0KCdZWVlZLU1NJykgfS9gO1xyXG5cdFx0Y29uc3Qgb2JqRm9sZGVyID0gZ19kYi5HZXRGb2xkZXJCeUxvY2F0aW9uKGxvY2F0aW9uLCB0cnVlKTtcclxuXHRcdGNvbnN0IHRlbXBIdG1sID0gZ19jbW4uR2V0QVRlbXBGaWxlTmFtZSgnLmh0bWwnKTtcclxuXHRcdGNvbnN0IGh0bWxUZXh0ID0gdGhpcy5fZ2V0RXZlbnRIdG1sKHRoaXMudGl0bGUsICcnKTtcclxuXHRcdGdfY21uLlNhdmVUZXh0VG9GaWxlKHRlbXBIdG1sLCBodG1sVGV4dCwgJ3VuaWNvZGUnKTtcclxuXHRcdGNvbnN0IGRvYyA9IG9iakZvbGRlci5DcmVhdGVEb2N1bWVudDIodGhpcy50aXRsZSwgXCJcIik7XHJcblx0XHRkb2MuQ2hhbmdlVGl0bGVBbmRGaWxlTmFtZSh0aGlzLnRpdGxlKTtcclxuXHRcdGRvYy5VcGRhdGVEb2N1bWVudDYodGVtcEh0bWwsIHRlbXBIdG1sLCAweDIyKTtcclxuXHRcdC8vIOiuvue9ruagh+etvlxyXG5cdFx0Ly9pZiAoIHRhZ3MgKSBkb2MuU2V0VGFnc1RleHQyKHRhZ3MsIFwiQ2FsZW5kYXJcIik7XHJcblx0XHQvLyDlsIbkv6Hmga/nvJbnoIHliLBXaXpEb2PlsZ7mgKfkuK3ljrtcclxuXHRcdGNvbnN0IG5ld0V2ZW50ID0gdGhpcy50b1dpekV2ZW50RGF0YSgpO1xyXG5cdFx0ZG9jLkFkZFRvQ2FsZW5kYXIobmV3RXZlbnQuQ0FMRU5EQVJfU1RBUlQsIG5ld0V2ZW50LkNBTEVOREFSX0VORCwgbmV3RXZlbnQuQ0FMRU5EQVJfSU5GTyk7XHJcblx0XHQvLyBjaGFuZ2UgZGF0YWJhc2VcclxuXHRcdGRvYy50eXBlID0gXCJldmVudFwiO1xyXG5cdFx0Ly9cclxuXHRcdHRoaXMuaWQgPSBkb2MuR1VJRDtcclxuXHR9XHJcblxyXG5cdHNhdmVUb1dpekV2ZW50RG9jKCBwcm9wID0gJ2FsbCcgKSB7XHJcblx0XHRpZiAoIWdfZGIgfHwgIWdfY21uKSB0aHJvdyBuZXcgRXJyb3IoJ0lXaXpEYXRhYmFzZSBvciBJV2l6Q29tbW9uVUkgaXMgbm90IHZhbGlkLicpO1xyXG5cdFx0Ly/mo4Dmn6XmlofmoaPmmK/lkKblrZjlnKhcclxuXHRcdGNvbnN0IGd1aWRSZWdleCA9IC9eWzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtNV1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn0kL2k7XHJcblx0XHRjb25zdCBpc1dpekRvY0V4aXN0ID0gZ3VpZFJlZ2V4LnRlc3QodGhpcy5pZCk7XHJcblx0XHQvLyDliJvlu7rmiJbogIXmm7TmlrDmlofmoaNcclxuXHRcdGlmICggaXNXaXpEb2NFeGlzdCApIHtcclxuXHRcdFx0Ly8g5qC55o2u5oyH5Luk5pu05paw5YaF5a65XHJcblx0XHRcdHRoaXMuX3NhdmVBbGxQcm9wKCk7XHJcblx0XHRcdC8vIOabtOaWsEZ1bGxDYWxlbmRhclxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Ly8g5Yib5bu65paw55qE5LqL5Lu25paH5qGjXHJcblx0XHRcdHRoaXMuX2NyZWF0ZVdpekV2ZW50RG9jKCk7XHJcblx0XHR9XHJcblx0XHRcclxuXHR9O1xyXG5cclxuXHRkZWxldGVFdmVudERhdGEoIGlzRGVsZXRlRG9jID0gZmFsc2UgKXtcclxuXHRcdGNvbnN0IGRvYyA9IGdfZGIuRG9jdW1lbnRGcm9tR1VJRCh0aGlzLmlkKTtcclxuXHRcdGlmICghZG9jKSB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgZmluZCBFdmVudCByZWxhdGVkIFdpekRvY3VtZW50LicpXHJcblx0XHQvLyDnp7vpmaTml6XljobmlbDmja5cclxuXHRcdGRvYy5SZW1vdmVGcm9tQ2FsZW5kYXIoKTtcclxuXHRcdC8vIOWIoOmZpOaWh+aho1xyXG5cdFx0aWYgKCBpc0RlbGV0ZURvYyApIGRvYy5EZWxldGUoKTtcclxuXHR9XHJcblxyXG59IiwiaW1wb3J0IHsgV2l6RGF0YWJhc2UgYXMgb2JqRGF0YWJhc2UgfSBmcm9tICcuLi91dGlscy9XaXpJbnRlcmZhY2UnO1xyXG5pbXBvcnQgQ2FsZW5kYXJFdmVudCBmcm9tICcuL0NhbGVuZGFyRXZlbnQnO1xyXG5cclxuLyog5pWw5o2u6I635Y+WXHJcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuLyoqIOivpeexu+S4jldpem5vdGXnmoRXaXpEYXRhYmFzZeaOpeWPo+S6pOaNouS/oeaBr++8jOiOt+WPluaVsOaNriAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXaXpFdmVudERhdGFMb2FkZXIge1xyXG5cclxuXHQvKipcclxuICAgICAqIOWIm+mAoOS4gOS4quS6i+S7tuaVsOaNruWKoOi9veWZqC5cclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gc3RhcnQg5p+l6K+i6LW35aeL5pel5pyf77yMSVNP5qCH5YeG5pel5pyf5a2X56ym5LiyLlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBlbmQg5p+l6K+i5oiq6Iez5pel5pyf77yMSVNP5qCH5YeG5pel5pyf5a2X56ym5LiyLlxyXG4gICAgICovXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRpZiAoIW9iakRhdGFiYXNlKSB0aHJvdyBuZXcgRXJyb3IoJ1dpekRhdGFiYXNlIG5vdCB2YWxpZCAhJyk7XHJcblx0XHR0aGlzLkRhdGFiYXNlID0gb2JqRGF0YWJhc2U7XHJcblx0XHR0aGlzLnVzZXJOYW1lID0gb2JqRGF0YWJhc2UuVXNlck5hbWU7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcbiAgICAgKiDojrflvpfmuLLmn5PlkI7nmoTmiYDmnIlGdWxsQ2FsZW5kYXLkuovku7YuXHJcblx0ICogQHBhcmFtIHtvYmplY3R9IHZpZXcgaXMgdGhlIFZpZXcgT2JqZWN0IG9mIEZ1bGxDYWxlbmRhciBmb3IgdGhlIG5ldyB2aWV3LlxyXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBlbGVtZW50IGlzIGEgalF1ZXJ5IGVsZW1lbnQgZm9yIHRoZSBjb250YWluZXIgb2YgdGhlIG5ldyB2aWV3LlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0W119IOi/lOWbnueUqOS6jkZ1bGxDYWxlbmRhciDmuLLmn5PnmoQgZXZlbnRTb3VyY2VzIOaVsOe7hC5cclxuICAgICAqL1xyXG5cdGdldEV2ZW50U291cmNlcyggdmlldywgZWxlbWVudCApe1xyXG5cdFx0Y29uc3Qgdmlld1N0YXJ0ID0gdmlldy5zdGFydC5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdGNvbnN0IHZpZXdFbmQgPSB2aWV3LmVuZC5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdGxldCBldmVudFNvdXJjZXMgPSBbXTtcclxuXHRcdC8v6I635Y+W5pmu6YCa5pel56iLXHJcblx0XHRjb25zdCBnZW5lcmFsRXZlbnRTb3VyY2UgPSB7XHJcblx0XHRcdHR5cGU6ICdnZW5lcmFsRXZlbnRzJyxcclxuXHRcdFx0Ly9ldmVudHM6IHRoaXMuX2dldEFsbE9yaWdpbmFsRXZlbnQoW10sIHRoaXMuX2QycyhjdXJyZW50Vmlldy5zdGFydC50b0RhdGUoKSksIHRoaXMuX2QycyhjdXJyZW50Vmlldy5lbmQudG9EYXRlKCkpKVxyXG5cdFx0XHRldmVudHM6IHRoaXMuX2dldEFsbE9yaWdpbmFsRXZlbnQodmlld1N0YXJ0LCB2aWV3RW5kKVxyXG5cdFx0fVxyXG5cdFx0ZXZlbnRTb3VyY2VzLnB1c2goZ2VuZXJhbEV2ZW50U291cmNlKTtcclxuXHRcdFxyXG5cdFx0Ly9UT0RPOiDojrflj5bph43lpI3ml6XnqItcclxuXHRcdGNvbnN0IHJlcGVhdEV2ZW50U291cmNlcyA9IHRoaXMuX2dldEFsbFJlcGVhdEV2ZW50KHZpZXdTdGFydCwgdmlld0VuZCk7XHJcblx0XHRldmVudFNvdXJjZXMgPSBldmVudFNvdXJjZXMuY29uY2F0KHJlcGVhdEV2ZW50U291cmNlcyk7XHJcblx0XHQvL1xyXG5cdFx0cmV0dXJuIGV2ZW50U291cmNlcztcclxuXHR9O1xyXG5cclxuXHQvKipcclxuICAgICAqIOS7jldpekRhdGFiYXNl5Lit6I635Y+W5omA5pyJ5pWw5o2u5paH5qGjLlxyXG5cdCAqIEBwYXJhbSB7YXJyYXl9IGV2ZW50cyDliJ3lp4vkuovku7bmlbDnu4QuXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHN0YXJ0IElTT+agh+WHhuaXpeacn+Wtl+espuS4si5cclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZW5kIElTT+agh+WHhuaXpeacn+Wtl+espuS4si5cclxuICAgICAqIEByZXR1cm4ge09iamVjdFtdfSDov5Tlm57nlKjkuo5GdWxsQ2FsZW5kYXLmuLLmn5PnmoTkuovku7bmlbDnu4QuXHJcbiAgICAgKi9cclxuXHRfZ2V0QWxsT3JpZ2luYWxFdmVudChzdGFydCwgZW5kKXtcclxuXHRcdGNvbnN0IGV2ZW50cyA9IFtdO1xyXG5cdFx0bGV0IHNxbCA9IGBET0NVTUVOVF9MT0NBVElPTiBub3QgbGlrZSAnL0RlbGV0ZWQgSXRlbXMvJScgYW5kIChLQl9HVUlEIGlzIG51bGwgb3IgS0JfR1VJRCA9ICcnKWA7XHJcblx0XHRsZXQgYW5kMSA9IGAgYW5kIERPQ1VNRU5UX0dVSUQgaW4gKHNlbGVjdCBET0NVTUVOVF9HVUlEIGZyb20gV0laX0RPQ1VNRU5UX1BBUkFNIHdoZXJlIFBBUkFNX05BTUUgPSAnQ0FMRU5EQVJfU1RBUlQnICBhbmQgIFBBUkFNX1ZBTFVFIDw9ICcke2VuZH0nIClgO1xyXG5cdFx0bGV0IGFuZDIgPSBgIGFuZCBET0NVTUVOVF9HVUlEIGluIChzZWxlY3QgRE9DVU1FTlRfR1VJRCBmcm9tIFdJWl9ET0NVTUVOVF9QQVJBTSB3aGVyZSBQQVJBTV9OQU1FID0gJ0NBTEVOREFSX0VORCcgIGFuZCAgUEFSQU1fVkFMVUUgPj0gJyR7c3RhcnR9JyApYDtcclxuXHRcdGlmIChzdGFydCkgc3FsICs9IGFuZDI7XHJcblx0XHRpZiAoZW5kKSBzcWwgKz0gYW5kMTtcclxuXHRcdGlmIChvYmpEYXRhYmFzZS5Eb2N1bWVudHNEYXRhRnJvbVNRTCkge1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdGNvbnN0IGRhdGEgPSBvYmpEYXRhYmFzZS5Eb2N1bWVudHNEYXRhRnJvbVNRTChzcWwpO1xyXG5cdFx0XHRcdGlmICggIWRhdGEgKSByZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0Y29uc3Qgb2JqID0gSlNPTi5wYXJzZShkYXRhKTtcclxuXHRcdFx0XHRpZiAoICFvYmogfHwgIUFycmF5LmlzQXJyYXkob2JqKSApIHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkgKyspIHtcclxuXHRcdFx0XHRcdGV2ZW50cy5wdXNoKFxyXG5cdFx0XHRcdFx0XHRuZXcgQ2FsZW5kYXJFdmVudChvYmpbaV0pLnRvRnVsbENhbGVuZGFyRXZlbnQoKVxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0cmV0dXJuIGV2ZW50cztcclxuXHRcdFx0fVxyXG5cdFx0XHRjYXRjaChlcnIpIHtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKGVycik7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdEb2N1bWVudHNEYXRhRnJvbVNRTCBtZXRob2Qgb2YgV2l6RGF0YWJhc2Ugbm90IGV4aXN0IScpO1xyXG5cdFx0XHQvKlxyXG5cdFx0XHRsZXQgZG9jQ29sbGV0aW9uID0gb2JqRGF0YWJhc2UuRG9jdW1lbnRzRnJvbVNRTChzcWwpO1xyXG5cdFx0XHQvL1xyXG5cdFx0XHRpZiAoZG9jQ29sbGV0aW9uICYmIGRvY0NvbGxldGlvbi5Db3VudCl7XHJcblx0XHRcdFx0bGV0IGRvYztcclxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGRvY0NvbGxldGlvbi5Db3VudDsgKysgaSl7XHJcblx0XHRcdFx0XHRkb2MgPSBkb2NDb2xsZXRpb24uSXRlbShpKTtcclxuXHRcdFx0XHRcdGxldCBldmVudE9iaiA9IF9ldmVudE9iamVjdChfbmV3UHNldWRvRG9jKGRvYykpO1xyXG5cdFx0XHRcdFx0aWYgKGV2ZW50T2JqKVxyXG5cdFx0XHRcdFx0XHRldmVudHMucHVzaChldmVudE9iaik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBldmVudHM7XHJcblx0XHRcdH1cclxuXHRcdFx0Ki9cdFx0XHJcblx0XHR9XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG4gICAgICog5LuOV2l6RGF0YWJhc2XkuK3ojrflj5bmiYDmnInlvqrnjq/ph43lpI3kuovku7YuXHJcblx0ICog5LuO5Yib5bu65LqL5Lu255qE5pel5pyf5byA5aeL5YiwRU5EUkVDVVJSRU5DRee7k+adn1xyXG4gICAgICogQHJldHVybiB7T2JqZWN0W119IOi/lOWbnueUqOS6jkZ1bGxDYWxlbmRhcua4suafk+eahCBldmVudFNvdXJjZSDmlbDnu4QuXHJcbiAgICAgKi9cclxuXHRfZ2V0QWxsUmVwZWF0RXZlbnQoc3RhcnQsIGVuZCl7XHJcblx0XHRjb25zdCByZXBlYXRFdmVudHMgPSBbXTtcclxuXHRcdGNvbnN0IHNxbCA9IFwiRE9DVU1FTlRfTE9DQVRJT04gbm90IGxpa2UgJy9EZWxldGVkIEl0ZW1zLyUnIGFuZCAoS0JfR1VJRCBpcyBudWxsIG9yIEtCX0dVSUQgPSAnJykgYW5kIFwiICsgXHJcblx0XHRcdFx0XHRcIkRPQ1VNRU5UX0dVSUQgaW4gKHNlbGVjdCBET0NVTUVOVF9HVUlEIGZyb20gV0laX0RPQ1VNRU5UX1BBUkFNIHdoZXJlIFBBUkFNX05BTUU9J0NBTEVOREFSX1JFQ1VSUkVOQ0UnKVwiO1xyXG5cclxuXHRcdGNvbnN0IGRhdGEgPSBvYmpEYXRhYmFzZS5Eb2N1bWVudHNEYXRhRnJvbVNRTChzcWwpO1xyXG5cdFx0Y29uc29sZS5sb2coZGF0YSlcclxuXHRcdGlmICggIWRhdGEgKSByZXR1cm4gZmFsc2U7XHJcblx0XHRcclxuXHRcdGNvbnN0IG9iaiA9IEpTT04ucGFyc2UoZGF0YSk7XHJcblx0XHRpZiAoICFvYmogfHwgIUFycmF5LmlzQXJyYXkob2JqKSApIHJldHVybiBmYWxzZTtcclxuXHRcdFxyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpICsrKSB7XHJcblx0XHRcdHJlcGVhdEV2ZW50cy5wdXNoKFxyXG5cdFx0XHRcdG5ldyBDYWxlbmRhckV2ZW50KG9ialtpXSkuZ2VuZXJhdGVSZXBlYXRFdmVudHMoc3RhcnQsIGVuZClcclxuXHRcdFx0KVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlcGVhdEV2ZW50cztcclxuXHRcdFxyXG5cdH07XHJcblxyXG5cdC8vIOaXpeWOhuS6i+S7tuaLluWKqOWQjuabtOaWsOaVsOaNrlxyXG5cdHVwZGF0ZUV2ZW50RGF0YU9uRHJvcChldmVudCwgZGVsdGEsIHJldmVydEZ1bmMsIGpzRXZlbnQsIHVpLCB2aWV3KXtcclxuXHRcdC8vIENhbGwgaGFzVGltZSBvbiB0aGUgZXZlbnTigJlzIHN0YXJ0L2VuZCB0byBzZWUgaWYgaXQgaGFzIGJlZW4gZHJvcHBlZCBpbiBhIHRpbWVkIG9yIGFsbC1kYXkgYXJlYS5cclxuXHRcdGNvbnN0IGFsbERheSA9ICFldmVudC5zdGFydC5oYXNUaW1lKCk7XHJcblx0XHQvLyDojrflj5bkuovku7bmlofmoaPml7bpl7TmlbDmja5cclxuXHRcdGNvbnN0IGRvYyA9IG9iakRhdGFiYXNlLkRvY3VtZW50RnJvbUdVSUQoZXZlbnQuaWQpO1xyXG5cdFx0Ly8g5pu05paw5pWw5o2uXHJcblx0XHRpZiAoIGFsbERheSApIHtcclxuXHRcdFx0Y29uc3Qgc3RhcnRTdHIgPSBldmVudC5zdGFydC5zZXQoeydoJzogMCwgJ20nOiAwLCAncyc6IDB9KS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0Y29uc3QgZW5kU3RyID0gZXZlbnQuZW5kLnNldCh7J2gnOiAyMywgJ20nOiA1OSwgJ3MnOiA1OX0pLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9TVEFSVFwiLCBzdGFydFN0cik7XHJcblx0XHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX0VORFwiLCBlbmRTdHIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc3Qgc3RhcnRTdHIgPSBldmVudC5zdGFydC5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0Y29uc3QgZW5kU3RyID0gZXZlbnQuZW5kLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9TVEFSVFwiLCBzdGFydFN0cik7XHJcblx0XHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX0VORFwiLCBlbmRTdHIpO1xyXG5cdFx0fVxyXG5cdFx0Ly9UT0RPOiDmm7TmlrBDQUxFTkRBUl9SRUNVUlJFTkNF5pWw5o2uXHJcblx0XHQvLyBcclxuXHRcdHRoaXMuX3VwZGF0ZURvY01vZGlmeURhdGUoZG9jKTtcclxuXHR9O1xyXG5cclxuXHQvLyDorr7nva7mlofmoaPlsZ7mgKflgLxcclxuXHRfc2V0UGFyYW1WYWx1ZShkb2MsIGtleSwgdmFsdWUpIHtcclxuXHRcdGlmICghZG9jKSByZXR1cm4gZmFsc2U7XHJcblx0XHRkb2MuU2V0UGFyYW1WYWx1ZShrZXksIHZhbHVlKTtcclxuXHR9O1xyXG5cclxuXHQvLyDmm7TmlrBXaXpEb2Pkv67mlLnml7bpl7RcclxuXHRfdXBkYXRlRG9jTW9kaWZ5RGF0ZShkb2Mpe1xyXG5cdFx0Y29uc3Qgbm93ID0gbmV3IERhdGUoKTtcclxuXHRcdGlmICghZG9jKSByZXR1cm4gZmFsc2U7XHJcblx0XHRub3cuc2V0U2Vjb25kcygobm93LmdldFNlY29uZHMoKSArIDEpICUgNjApO1xyXG5cdFx0ZG9jLkRhdGVNb2RpZmllZCA9IHRoaXMuX2Qycyhub3cpO1xyXG5cdH07XHJcblxyXG5cdC8vIOWwhuaXpeacn+Wvueixoei9rOWMluS4uuWtl+espuS4slxyXG5cdC8vVE9ETzog6ICD6JmR5L6d6LWWbW9tZW505p2l566A5YyW6L2s5o2i6L+H56iLXHJcblx0X2QycyhkdCl7XHJcblx0XHRjb25zdCByZXQgPSBkdC5nZXRGdWxsWWVhcigpICsgXCItXCIgKyBcclxuXHRcdFx0XHRcdGZvcm1hdEludFRvRGF0ZVN0cmluZyhkdC5nZXRNb250aCgpICsgMSkgKyBcIi1cIiArIFxyXG5cdFx0XHRcdFx0Zm9ybWF0SW50VG9EYXRlU3RyaW5nKGR0LmdldERhdGUoKSkgKyBcIiBcIiArIFxyXG5cdFx0XHRcdFx0Zm9ybWF0SW50VG9EYXRlU3RyaW5nKGR0LmdldEhvdXJzKCkpKyBcIjpcIiArIFxyXG5cdFx0XHRcdFx0Zm9ybWF0SW50VG9EYXRlU3RyaW5nKGR0LmdldE1pbnV0ZXMoKSkgKyBcIjpcIiArIFxyXG5cdFx0XHRcdFx0Zm9ybWF0SW50VG9EYXRlU3RyaW5nKGR0LmdldFNlY29uZHMoKSk7XHJcblx0XHRyZXR1cm4gcmV0O1xyXG5cdH07XHJcblxyXG5cdC8vIOaXpeWOhuaXtumXtOmHjee9ruaXtumXtOiMg+WbtOWQjuabtOaWsOaVsOaNrlxyXG5cdHVwZGF0ZUV2ZW50RGF0YU9uUmVzaXplKGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXcpe1xyXG5cdFx0Y29uc3QgYWxsRGF5ID0gZXZlbnQuc3RhcnQuaGFzVGltZSgpID8gZmFsc2UgOiB0cnVlO1xyXG5cdFx0Ly8g6I635b6X5LqL5Lu25paH5qGj5pe26Ze05pWw5o2uXHJcblx0XHRjb25zdCBkb2MgPSBvYmpEYXRhYmFzZS5Eb2N1bWVudEZyb21HVUlEKGV2ZW50LmlkKTtcclxuXHRcdC8vIOiuoeeul+abtOaUueWQjueahOe7k+adn+aXtumXtFxyXG5cdFx0Y29uc3QgZXZlbnRFbmRTdHIgPSBldmVudC5lbmQuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHQvLyDmm7TmlrDmlofmoaPmlbDmja5cclxuXHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX0VORFwiLCBldmVudEVuZFN0cik7XHJcblx0XHR0aGlzLl91cGRhdGVEb2NNb2RpZnlEYXRlKGRvYyk7XHJcblx0fTtcclxuXHJcblx0Ly8g5Yib5bu65LqL5Lu2IHN0YXJ0LCBlbmQsIGpzRXZlbnQsIHZpZXdcclxuXHQvKipcclxuICAgICAqIOWIm+W7uuS6i+S7ti5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gc2VsZWN0aW9uRGF0YSBGdWxsQ2FsZW5kYXIg5Lyg5YWl55qE5pWw5o2uLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBzZWxlY3Rpb25EYXRhLnN0YXJ0IE1vbWVudCDnsbvml6XmnJ/lr7nosaEuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IHNlbGVjdGlvbkRhdGEuZW5kIE1vbWVudCDnsbvml6XmnJ/lr7nosaEuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IHNlbGVjdGlvbkRhdGEuanNFdmVudCBuYXRpdmUgSmF2YVNjcmlwdCDkuovku7YuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IHNlbGVjdGlvbkRhdGEudmlldyBGdWxsQ2FsZW5kYXIg6KeG5Zu+5a+56LGhLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSB1c2VySW5wdXRzIOeUqOaIt+S8oOWFpeeahOWFtuS7luS/oeaBry5cclxuICAgICAqIFRPRE86IOivpeaWueazleWPr+S7peaUvue9ruWIsENhbGVuZGFyRXZlbnTnmoTpnZnmgIHmlrnms5XkuIpcclxuICAgICAqL1xyXG5cdGNyZWF0ZUV2ZW50KHNlbGVjdGlvbkRhdGEsIHVzZXJJbnB1dHMpe1xyXG5cdFx0Ly8g6I635Y+W55So5oi36K6+572uXHJcblx0XHRjb25zdCBuZXdFdmVudCA9IG5ldyBDYWxlbmRhckV2ZW50KHtcclxuXHRcdFx0dGl0bGU6IHVzZXJJbnB1dHMudGl0bGUgPyB1c2VySW5wdXRzLnRpdGxlIDogJ+aXoOagh+mimCcsXHJcblx0XHRcdHN0YXJ0OiBzZWxlY3Rpb25EYXRhLnN0YXJ0LFxyXG5cdFx0XHRlbmQ6IHNlbGVjdGlvbkRhdGEuZW5kLFxyXG5cdFx0XHRhbGxEYXk6IHNlbGVjdGlvbkRhdGEuc3RhcnQuaGFzVGltZSgpICYmIHNlbGVjdGlvbkRhdGEuZW5kLmhhc1RpbWUoKSA/IGZhbHNlIDogdHJ1ZSxcclxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiB1c2VySW5wdXRzLmNvbG9yID8gdXNlcklucHV0cy5jb2xvciA6ICcjMzJDRDMyJyxcclxuXHRcdH0pO1xyXG5cdFx0Ly8g5L+d5a2Y5bm25riy5p+T5LqL5Lu2XHJcblx0XHRuZXdFdmVudC5zYXZlVG9XaXpFdmVudERvYygpO1xyXG5cdFx0bmV3RXZlbnQucmVmZXRjaERhdGEoKTtcclxuXHRcdHJldHVybiBuZXdFdmVudDtcclxuXHR9XHJcblxyXG59XHJcblxyXG5cclxuLy8gVE9ETzog6YeN5YaZ6I635Y+W5pWw5o2u55qE5pa55byPXHJcbmZ1bmN0aW9uIF9nZXRXaXpFdmVudChzdGFydCwgZW5kKSB7XHJcblx0Ly9UT0RPOlxyXG5cdGxldCBldmVudHMgPSBbXTtcclxuXHRsZXQgRXZlbnRDb2xsZWN0aW9uID0gb2JqRGF0YWJhc2UuR2V0Q2FsZW5kYXJFdmVudHMyKHN0YXJ0LCBlbmQpO1xyXG5cdHJldHVybiBldmVudHNcclxufVxyXG5cclxuLy8g6I635b6X5riy5p+T5ZCO55qE6YeN5aSN5pel5pyfXHJcbmZ1bmN0aW9uIGdldFJlbmRlclJlcGVhdERheSgpe1xyXG5cdHZhciBkYXlBcnJheSA9IG5ldyBBcnJheSgpO1xyXG5cdHZhciBldmVudFN0YXJ0ID0gbmV3IERhdGUoX3MyZChnX2V2ZW50U3RhcnQpKTtcclxuXHRcdFxyXG5cdHN3aXRjaCAoZ19yZXBlYXRSdWxlKXtcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazFcIjpcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazJcIjpcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazNcIjpcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazRcIjpcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazVcIjpcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazZcIjpcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazdcIjpcclxuXHRcdFx0XHRnZXRXZWVrbHlSZXBlYXREYXkoZGF5QXJyYXksIFtnX3JlcGVhdFJ1bGUuY2hhckF0KDkpXSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2Vla2RheVwiOlxyXG5cdFx0XHRcdGdldFdlZWtseVJlcGVhdERheShkYXlBcnJheSwgWzEsIDIsIDMsIDQsIDVdKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnlXZWVrZGF5MTM1XCI6XHJcblx0XHRcdFx0Z2V0V2Vla2x5UmVwZWF0RGF5KGRheUFycmF5LCBbMSwgMywgNV0pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnlXZWVrZGF5MjRcIjpcclxuXHRcdFx0XHRnZXRXZWVrbHlSZXBlYXREYXkoZGF5QXJyYXksIFsyLCA0XSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJFdmVyeVdlZWtkYXk2N1wiOlxyXG5cdFx0XHRcdGdldFdlZWtseVJlcGVhdERheShkYXlBcnJheSwgWzYsIDddKTtcclxuXHRcdFx0XHRicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkRhaWx5XCI6XHJcblx0XHRcdFx0Z2V0V2Vla2x5UmVwZWF0RGF5KGRheUFycmF5LCBbMSwgMiwgMywgNCwgNSwgNiwgN10pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiV2Vla2x5XCI6Ly8g5q+P5ZGoXHJcblx0XHRcdFx0Z2V0V2Vla2x5UmVwZWF0RGF5KGRheUFycmF5LCBbZXZlbnRTdGFydC5nZXREYXkoKV0pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnkyV2Vla3NcIjpcclxuXHRcdFx0XHRnZXRXZWVrbHlSZXBlYXREYXkoZGF5QXJyYXksIFtldmVudFN0YXJ0LmdldERheSgpXSk7XHJcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkYXlBcnJheS5sZW5ndGg7ICsrIGkpe1xyXG5cdFx0XHRcdFx0dmFyIGludGVyID0gX2ludGVyRGF5cyhfZDJzKGV2ZW50U3RhcnQpLCBfZDJzKGRheUFycmF5W2ldWzBdKSk7XHJcblx0XHRcdFx0XHRpZiAoKHBhcnNlRmxvYXQoKGludGVyLTEpLzcuMCkgJSAyKSAhPSAwICl7XHJcblx0XHRcdFx0XHRcdGRheUFycmF5LnNwbGljZShpLCAxKTtcclxuXHRcdFx0XHRcdFx0aSAtLTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJNb250aGx5XCI6XHJcblx0XHRcdFx0Z2V0TW9udGhseVJlcGVhdERheShkYXlBcnJheSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJZZWFybHlcIjpcclxuXHRcdFx0XHRnZXRZZWFybHlSZXBlYXREYXkoZGF5QXJyYXkpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHQvLyBUT0RPOiDmsYnlrZfpnIDopoHogIPomZFcclxuICAgICAgICAgICAgY2FzZSBcIkNoaW5lc2VNb250aGx5XCI6XHJcbiAgICAgICAgICAgICAgICBnZXRDaGluZXNlUmVwZWF0RGF5KGRheUFycmF5LCAn5pyIJyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJDaGluZXNlWWVhcmx5XCI6XHJcbiAgICAgICAgICAgICAgICBnZXRDaGluZXNlUmVwZWF0RGF5KGRheUFycmF5LCAn5Y6GJyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGRlZmF1bHQ6e1xyXG5cdFx0XHRcdGlmIChnX3JlcGVhdFJ1bGUuaW5kZXhPZihcIkV2ZXJ5V2Vla1wiKSA9PSAwKXtcclxuXHRcdFx0XHRcdHZhciBkYXlzID0gZ19yZXBlYXRSdWxlLnN1YnN0cihcIkV2ZXJ5V2Vla1wiLmxlbmd0aCkuc3BsaXQoJycpO1xyXG5cdFx0XHRcdFx0Z2V0V2Vla2x5UmVwZWF0RGF5KGRheUFycmF5LCBkYXlzKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcblx0cmV0dXJuIGRheUFycmF5O1xyXG59XHJcblxyXG5cclxuLyog5pWw5o2u6I635Y+WXHJcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuXHJcbi8qIOadgumhueWSjOW3peWFt1xyXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcbi8vIOWIpOaWreWGheaguFxyXG5mdW5jdGlvbiBpc0Nocm9tZSgpIHtcclxuXHRpZiAoZ19pc0Nocm9tZSkgcmV0dXJuIGdfaXNDaHJvbWU7XHJcblx0Ly9cclxuXHR2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7XHJcblx0Z19pc0Nocm9tZSA9IHVhLmluZGV4T2YoJ2Nocm9tZScpICE9IC0xO1xyXG5cdC8vXHJcblx0cmV0dXJuIGdfaXNDaHJvbWU7XHJcbn1cclxuXHJcbi8vIOWwhuaVtOaVsOi9rOaNouaIkOaXpeacn+Wtl+espuS4slxyXG5mdW5jdGlvbiBmb3JtYXRJbnRUb0RhdGVTdHJpbmcobil7XHJcblx0XHRcclxuXHRyZXR1cm4gbiA8IDEwID8gJzAnICsgbiA6IG47XHJcbn1cclxuXHJcbi8vIOajgOafpeWPiuWinuWKoOaVsOWAvOWtl+espuS4sumVv+W6pu+8jOS+i+Wmgu+8micyJyAtPiAnMDInXHJcbmZ1bmN0aW9uIGNoZWNrQW5kQWRkU3RyTGVuZ3RoKHN0cikge1xyXG5cdGlmIChzdHIubGVuZ3RoIDwgMikge1xyXG5cdFx0cmV0dXJuICcwJyArIHN0cjtcclxuXHR9IGVsc2Uge1xyXG5cdFx0cmV0dXJuIHN0cjtcclxuXHR9XHJcbn1cclxuXHJcbi8vIOWwhuWtl+espuS4sui9rOWMluS4uuaXpeacn+WvueixoVxyXG5mdW5jdGlvbiBfczJkKHN0cil7XHJcblx0aWYgKCFzdHIpXHJcblx0XHRyZXR1cm4gJyc7XHJcblx0dmFyIGRhdGUgPSBuZXcgRGF0ZShzdHIuc3Vic3RyKDAsIDQpLFxyXG5cdFx0XHRcdFx0c3RyLnN1YnN0cig1LCAyKSAtIDEsXHJcblx0XHRcdFx0XHRzdHIuc3Vic3RyKDgsIDMpLFxyXG5cdFx0XHRcdFx0c3RyLnN1YnN0cigxMSwgMiksXHJcblx0XHRcdFx0XHRzdHIuc3Vic3RyKDE0LCAyKSxcclxuXHRcdFx0XHRcdHN0ci5zdWJzdHIoMTcsIDIpXHJcblx0XHRcdFx0XHQpO1x0XHRcclxuXHRyZXR1cm4gZGF0ZTtcclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBjb2xvckNvdW50OiAxMixcclxuICAgIGNvbG9ySXRlbXM6IFtcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiMzMkNEMzJcIiwgXCJjb2xvck5hbWVcIjogJ+aphOamhOe7vycgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiM1NDg0RURcIiwgXCJjb2xvck5hbWVcIjogJ+Wuneefs+iTnScgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNBNEJERkVcIiwgXCJjb2xvck5hbWVcIjogJ+iTneiJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiM0NkQ2REJcIiwgXCJjb2xvck5hbWVcIjogJ+mdkue7v+iJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiM3QUU3QkZcIiwgXCJjb2xvck5hbWVcIjogJ+e7v+iJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiM1MUI3NDlcIiwgXCJjb2xvck5hbWVcIjogJ+a4heaWsOe7vycgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNGQkQ3NUJcIiwgXCJjb2xvck5hbWVcIjogJ+m7hOiJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNGRkI4NzhcIiwgXCJjb2xvck5hbWVcIjogJ+apmOiJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNGRjg4N0NcIiwgXCJjb2xvck5hbWVcIjogJ+e6ouiJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNEQzIxMjdcIiwgXCJjb2xvck5hbWVcIjogJ+WlouWNjue6oicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNEQkFERkZcIiwgXCJjb2xvck5hbWVcIjogJ+e0q+iJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNFMUUxRTFcIiwgXCJjb2xvck5hbWVcIjogJ+eBsOiJsicgfVxyXG4gICAgXSxcclxuXHJcbn0iLCIvL1RPRE86IOWIpOaWrXdpbmRvdy5leHRlcm5hbOaYr+WQpuS4uldpekh0bWxFZGl0b3JBcHBcclxuY29uc3QgV2l6RXhwbG9yZXJBcHAgPSB3aW5kb3cuZXh0ZXJuYWw7XHJcbmNvbnN0IFdpekV4cGxvcmVyV2luZG93ID0gV2l6RXhwbG9yZXJBcHAuV2luZG93O1xyXG5jb25zdCBXaXpEYXRhYmFzZSA9IFdpekV4cGxvcmVyQXBwLkRhdGFiYXNlO1xyXG5jb25zdCBXaXpDb21tb25VSSA9IFdpekV4cGxvcmVyQXBwLkNyZWF0ZVdpek9iamVjdChcIldpektNQ29udHJvbHMuV2l6Q29tbW9uVUlcIik7XHJcblxyXG5mdW5jdGlvbiBXaXpDb25maXJtKG1zZywgdGl0bGUpIHtcclxuICAgIHJldHVybiBXaXpFeHBsb3JlcldpbmRvdy5TaG93TWVzc2FnZShtc2csIHRpdGxlLCAweDAwMDAwMDIwIHwgMHgwMDAwMDAwMSkgPT0gMTtcclxufVxyXG5cclxuZnVuY3Rpb24gV2l6QWxlcnQobXNnKSB7XHJcbiAgICBXaXpFeHBsb3JlcldpbmRvdy5TaG93TWVzc2FnZShtc2csIFwie3B9XCIsIDB4MDAwMDAwNDApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBXaXpCdWJibGVNZXNzYWdlKHRpdGxlLCBtc2csIGNvbG9yID0gJyNGRkZBOUQnLCBkZWxheSA9ICczJykge1xyXG4gICAgY29uc3QgYXBwUGF0aCA9IFdpekNvbW1vblVJLkdldFNwZWNpYWxGb2xkZXIoXCJBcHBQYXRoXCIpO1xyXG4gICAgLy9cclxuICAgIGNvbnN0IHdpelNoZWxsRmlsZU5hbWUgPSBhcHBQYXRoICsgXCJXaXouZXhlXCI7XHJcbiAgICBjb25zdCBkbGxGaWxlTmFtZSA9IGFwcFBhdGggKyBcIldpelRvb2xzLmRsbFwiO1xyXG4gICAgLy9cclxuICAgIGNvbnN0IHBhcmFtcyA9IGBcIiR7ZGxsRmlsZU5hbWV9XCIgV2l6VG9vbHNTaG93QnViYmxlV2luZG93MkV4IC9UaXRsZT0ke3RpdGxlfSAvTGlua1RleHQ9JHttc2d9IC9MaW5rVVJMPUAgL0NvbG9yPSR7Y29sb3J9IC9EZWxheT0ke2RlbGF5fWA7XHJcbiAgICAvL1xyXG4gICAgV2l6Q29tbW9uVUkuUnVuRXhlKHdpelNoZWxsRmlsZU5hbWUsIHBhcmFtcywgZmFsc2UpO1xyXG59XHJcblxyXG5jbGFzcyBXaXpTaGVsbCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZGxsRmlsZU5hbWUsIGRsbEV4cG9ydEZ1bmMsIHBhcmFtcykge1xyXG4gICAgICAgIC8v5L2/55SoZGxs5a+85Ye65Ye95pWw77yM5aSn6YOo5YiG5YWl5Y+C5pe25ZG95Luk6KGM5pa55byP77yM5YW35L2T5Y+C5pWw5rKh5pyJ6K+05piO77yM5pyJ6ZyA6KaB6IGU57O75byA5Y+R5Lq65ZGYXHJcbiAgICAgICAgY29uc3QgYXBwUGF0aCA9IFdpekNvbW1vblVJLkdldFNwZWNpYWxGb2xkZXIoXCJBcHBQYXRoXCIpO1xyXG4gICAgICAgIHRoaXMuYXBwUGF0aCA9IGFwcFBhdGhcclxuICAgICAgICB0aGlzLndpekV4ZSA9IGFwcFBhdGggKyBcIldpei5leGVcIjtcclxuICAgICAgICB0aGlzLmRsbEZpbGVOYW1lID0gZGxsRmlsZU5hbWUgPyBhcHBQYXRoICsgZGxsRmlsZU5hbWUgOiBhcHBQYXRoICsgJ1dpektNQ29udHJvbHMuZGxsJztcclxuICAgICAgICB0aGlzLmRsbEV4cG9ydEZ1bmMgPSBkbGxFeHBvcnRGdW5jIHx8ICdXaXpLTVJ1blNjcmlwdCc7XHJcbiAgICAgICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7XHJcbiAgICB9XHJcblxyXG4gICAgcnVuU2NyaXB0RmlsZShzY3JpcHRGaWxlTmFtZSwgc2NyaXB0UGFyYW1zKSB7XHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0gYFwiJHt0aGlzLmFwcFBhdGggKyAnV2l6S01Db250cm9scy5kbGwnfVwiIFdpektNUnVuU2NyaXB0IC9TY3JpcHRGaWxlTmFtZT0ke3NjcmlwdEZpbGVOYW1lfSAke3NjcmlwdFBhcmFtc31gO1xyXG4gICAgICAgIFdpekNvbW1vblVJLlJ1bkV4ZSh0aGlzLndpekV4ZSwgcGFyYW1zLCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgd2l6QnViYmxlTWVzc2FnZSh0aXRsZSwgbXNnLCBjb2xvciA9ICcjRkZGQTlEJywgZGVsYXkgPSAnMycpIHtcclxuICAgICAgICBXaXpCdWJibGVNZXNzYWdlKHRpdGxlLCBtc2csIGNvbG9yLCBkZWxheSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldFdpekludGVyZmFjZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBXaXpFeHBsb3JlckFwcCwgV2l6RXhwbG9yZXJXaW5kb3csIFdpekRhdGFiYXNlLCBXaXpDb21tb25VSVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgXHJcbiAgICBXaXpFeHBsb3JlckFwcCwgXHJcbiAgICBXaXpFeHBsb3JlcldpbmRvdywgXHJcbiAgICBXaXpEYXRhYmFzZSwgXHJcbiAgICBXaXpDb21tb25VSSwgXHJcbiAgICBXaXpDb25maXJtLCBcclxuICAgIFdpekFsZXJ0LCBcclxuICAgIFdpekJ1YmJsZU1lc3NhZ2UsIFxyXG4gICAgV2l6U2hlbGwgXHJcbn07XHJcbiIsImZ1bmN0aW9uIHJnYjJoc2wociwgZywgYikge1xyXG4gICAgciAvPSAyNTU7IGcgLz0gMjU1OyBiIC89IDI1NTtcclxuXHJcbiAgICB2YXIgTSA9IE1hdGgubWF4KHIsIGcsIGIpO1xyXG4gICAgdmFyIG0gPSBNYXRoLm1pbihyLCBnLCBiKTtcclxuICAgIHZhciBDID0gTSAtIG07XHJcbiAgICB2YXIgTCA9IDAuNSooTSArIG0pO1xyXG4gICAgdmFyIFMgPSAoQyA9PT0gMCkgPyAwIDogQy8oMS1NYXRoLmFicygyKkwtMSkpO1xyXG5cclxuICAgIHZhciBoO1xyXG4gICAgaWYgKEMgPT09IDApIGggPSAwOyAvLyBzcGVjJ2QgYXMgdW5kZWZpbmVkLCBidXQgdXN1YWxseSBzZXQgdG8gMFxyXG4gICAgZWxzZSBpZiAoTSA9PT0gcikgaCA9ICgoZy1iKS9DKSAlIDY7XHJcbiAgICBlbHNlIGlmIChNID09PSBnKSBoID0gKChiLXIpL0MpICsgMjtcclxuICAgIGVsc2UgaWYgKE0gPT09IGIpIGggPSAoKHItZykvQykgKyA0O1xyXG5cclxuICAgIHZhciBIID0gNjAgKiBoO1xyXG5cclxuICAgIC8vIOWIhuWIq+aYr2h1ZSwgc2F0LCBsdW1cclxuICAgIHJldHVybiBbSCwgcGFyc2VGbG9hdChTKSwgcGFyc2VGbG9hdChMKV07XHJcbn1cclxuXHJcbmV4cG9ydCB7IHJnYjJoc2wgfSJdLCJzb3VyY2VSb290IjoiIn0=