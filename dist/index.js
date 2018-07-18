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
/******/ 	var hotCurrentHash = "42ca09e551bc86014bdd"; // eslint-disable-line no-unused-vars
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
        };this.handleEventClick = this.handleEventClick.bind(this);
        this.handlePopoverHide = this.handlePopoverHide.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleEventEdit = this.handleEventEdit.bind(this);
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
        //TODO: 触发fullcalendar unselect
        this.setState({
            isEditingEvent: false,
            isCreatingEvent: false
        });
    }

    render() {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'div',
            { id: 'wiz-tomato-calendar' },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Calendar_Calendar__WEBPACK_IMPORTED_MODULE_1__["default"], { key: 1, onEventClick: this.handleEventClick, onSelect: this.handleSelect }),
            !!this.state.selectedRange && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Modal_EventCreateModal__WEBPACK_IMPORTED_MODULE_4__["default"], {
                show: this.state.isCreatingEvent,
                onModalClose: this.handleModalClose,
                isCreatingEvent: this.state.isCreatingEvent,
                selectedRange: this.state.selectedRange
            }),
            this.state.isShowingEvent && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_EventPopover_EventPopover__WEBPACK_IMPORTED_MODULE_2__["default"], {
                key: this.state.clickedArgs.event.id,
                event: this.state.clickedArgs.event,
                reference: this.state.clickedArgs.jsEvent.target,
                onEditBtnClick: this.handleEventEdit,
                onPopoverHide: this.handlePopoverHide
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/_react-dom@16.4.1@react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/_react-bootstrap@0.32.1@react-bootstrap/es/index.js");
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/_react-bootstrap@0.32.1@react-bootstrap/es/index.js");
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
                        value: '',
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
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["FormControl"], null)
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
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["FormControl"], { componentClass: 'textarea' })
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

/***/ "./src/components/Modal/EventCreateModal.js":
/*!**************************************************!*\
  !*** ./src/components/Modal/EventCreateModal.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventCreateModal; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/_react-bootstrap@0.32.1@react-bootstrap/es/index.js");
/* harmony import */ var _Form_EventDetailForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Form/EventDetailForm */ "./src/components/Form/EventDetailForm.js");
/* harmony import */ var _EventModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EventModal */ "./src/components/Modal/EventModal.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);






class EventCreateModal extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {

    constructor(props) {
        super(props);
        //
        //
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleStartChange = this.handleStartChange.bind(this);
        this.handleEndChange = this.handleEndChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
    }

    handleTitleChange(newTitle) {
        console.log(newTitle);
    }

    handleStartChange(newDateValue) {
        console.log(newDateValue);
    }

    handleEndChange(newDateValue) {
        console.log(newDateValue);
    }

    handleColorChange(newColorValue) {
        console.log(newColorValue);
    }

    render() {
        const selectedRange = this.props.selectedRange;
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
                        key: new Date().toISOString() //每次select都重新渲染
                        , eventTitle: '',
                        start: selectedRange.start.format('YYYY-MM-DD HH:mm:ss'),
                        end: selectedRange.end.format('YYYY-MM-DD HH:mm:ss'),
                        onTitleChange: this.handleTitleChange,
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
                '\u8FD9\u91CC\u662Ftoolbar'
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/_react-bootstrap@0.32.1@react-bootstrap/es/index.js");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQ2FsZW5kYXIvQ2FsZW5kYXIuY3NzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0V2ZW50UG9wb3Zlci9FdmVudFBvcG92ZXIuY3NzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0V2ZW50UG9wb3Zlci9Qb3BvdmVyVGl0bGVJbnB1dC5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZSBzeW5jIF5cXC5cXC8uKiQiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9DYWxlbmRhci9DYWxlbmRhci5jc3M/Y2ExNCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9DYWxlbmRhci9DYWxlbmRhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9DYWxlbmRhci9GdWxsQ2FsZW5kYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRXZlbnRQb3BvdmVyL0V2ZW50UG9wb3Zlci5jc3M/NTg1ZiIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9FdmVudFBvcG92ZXIvRXZlbnRQb3BvdmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0V2ZW50UG9wb3Zlci9Qb3BvdmVyVGl0bGVJbnB1dC5jc3M/M2UzNiIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9FdmVudFBvcG92ZXIvUG9wb3ZlclRpdGxlSW5wdXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRXZlbnRQb3BvdmVyL1BvcG92ZXJUb29sYmFyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0Zvcm0vQXV0b0Zvcm1Hcm91cC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Gb3JtL0NvbG9yUGlja2VyR3JvdXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRm9ybS9EYXRlVGltZVBpY2tlckdyb3VwLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0Zvcm0vRXZlbnREZXRhaWxGb3JtLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0Zvcm0vVGl0bGVJbnB1dEdyb3VwLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL01vZGFsL0V2ZW50Q3JlYXRlTW9kYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvTW9kYWwvRXZlbnRNb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguY3NzP2Q4YzMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9tb2RlbHMvQ2FsZW5kYXJFdmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWxzL0V2ZW50SGFuZGxlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWxzL1dpekV2ZW50RGF0YUxvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvQ29uZmlnLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9XaXpJbnRlcmZhY2UuanMiXSwibmFtZXMiOlsiQXBwIiwiUmVhY3QiLCJDb21wb25lbnQiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwic3RhdGUiLCJpc1Nob3dpbmdFdmVudCIsImlzRWRpdGluZ0V2ZW50IiwiaXNDcmVhdGluZ0V2ZW50IiwiY2xpY2tlZEFyZ3MiLCJlZGl0aW5nRXZlbnQiLCJzZWxlY3RlZFJhbmdlIiwiaGFuZGxlRXZlbnRDbGljayIsImJpbmQiLCJoYW5kbGVQb3BvdmVySGlkZSIsImhhbmRsZVNlbGVjdCIsImhhbmRsZU1vZGFsQ2xvc2UiLCJoYW5kbGVFdmVudEVkaXQiLCJldmVudCIsImpzRXZlbnQiLCJ2aWV3IiwiYXJncyIsInNldFN0YXRlIiwic3RhcnQiLCJlbmQiLCJyZW5kZXIiLCJpZCIsInRhcmdldCIsIkNhbGVuZGFyIiwiZXZlbnRzIiwiZGF0YUxvYWRlciIsImNhbGVuZGFyIiwiaGFuZGxlRnVsbENhbGVuZGFyUmVuZGVyIiwib25WaWV3UmVuZGVyIiwib25FdmVudFJlbmRlciIsIm9uRXZlbnREcm9wIiwib25FdmVudFJlc2l6ZSIsImVsIiwiZWxlbWVudCIsIiRjYWxlbmRhciIsIiQiLCJldmVudFNvdXJjZXMiLCJnZXRFdmVudFNvdXJjZXMiLCJmdWxsQ2FsZW5kYXIiLCJpIiwibGVuZ3RoIiwiZGVsdGEiLCJyZXZlcnRGdW5jIiwidWkiLCJ1cGRhdGVFdmVudERhdGFPbkRyb3AiLCJ1cGRhdGVFdmVudERhdGFPblJlc2l6ZSIsImV2ZW50T2JqIiwiJGVsIiwicmdiU3RyaW5nIiwiY3NzIiwicmdiQXJyYXkiLCJleGVjIiwiaHNsIiwicmdiMmhzbCIsImxpZ2h0bmVzcyIsIk1hdGgiLCJjb3MiLCJQSSIsInRleHRDb2xvciIsImlzQ29tcGxldGUiLCJwYXJzZUludCIsImNvbXBsZXRlIiwiYWRkQ2xhc3MiLCJjb21wb25lbnREaWRNb3VudCIsImxlZnQiLCJjZW50ZXIiLCJyaWdodCIsInRvZGF5IiwibW9udGgiLCJ3ZWVrIiwiZGF5IiwibGlzdCIsImFnZW5kYSIsIm1pblRpbWUiLCJzbG90TGFiZWxGb3JtYXQiLCJvblNlbGVjdCIsIm9uRXZlbnRDbGljayIsInIiLCJnIiwiYiIsIk0iLCJtYXgiLCJtIiwibWluIiwiQyIsIkwiLCJTIiwiYWJzIiwiaCIsIkgiLCJwYXJzZUZsb2F0IiwiRnVsbGNhbGVuZGFyT2JqZWN0TWFwcGVyIiwiZ2V0U2V0dGluZ3MiLCJwcm9wZXJ0aWVzIiwibmV3U2V0dGluZ3MiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsIkZ1bGxDYWxlbmRhciIsImpxIiwibm9Db25mbGljdCIsImZ1bGxjYWxlbmRhck9iamVjdE1hcHBlciIsImluc3RhbmNlIiwiZGF0ZSIsIkRhdGUiLCJvbkZ1bGxDYWxlbmRhclJlbmRlciIsIm9iamVjdE1hcHBlclNldHRpbmdzIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIm5leHRQcm9wcyIsIkV2ZW50UG9wb3ZlciIsInBvcHBlck5vZGUiLCJwb3BwZXJJbnN0YW5jZSIsImV2ZW50SGFuZGxlcyIsIm5ld0V2ZW50RGF0YSIsImF1dG9IaWRlIiwiaGFuZGxlRGF0ZVRpbWVDaGFuZ2UiLCJoYW5kbGVUaXRsZUNoYW5nZSIsImhhbmRsZUNvbG9yQ2hhbmdlIiwiaGFuZGxlQnRuQ2xpY2siLCJlIiwicmVmZXJlbmNlIiwiaXMiLCJoYXMiLCJoaWRlIiwidGhhdCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwib25Qb3BvdmVySGlkZSIsInNob3ciLCJmYWRlSW4iLCJuZXdUaXRsZSIsInZhbHVlIiwicHJldlN0YXRlIiwiT2JqZWN0IiwiY3JlYXRlIiwidGl0bGUiLCJjb2xvclZhbHVlIiwibmV3Q29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJidG5UeXBlIiwic3BsaXQiLCJoYW5kbGVOYW1lIiwidGhlbiIsInJldCIsIm9uRWRpdEJ0bkNsaWNrIiwicGxhY2VtZW50IiwibW9kaWZpZXJzIiwiYXJyb3ciLCJkb2N1bWVudCIsIm9mZiIsIm9uIiwiY29tcG9uZW50RGlkVXBkYXRlIiwicHJldlByb3BzIiwic25hcHNob3QiLCJzaG91bGRDb21wb25lbnRVcGRhdGUiLCJuZXh0U3RhdGUiLCJ1cGRhdGUiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImRlc3Ryb3kiLCJldmVudFN0YXJ0IiwiZm9ybWF0IiwiZW5hYmxlU2F2ZUJ0biIsImRpc3BsYXkiLCJkaXYiLCJFdmVudFRpdGxlSW5wdXQiLCJldmVudFRpdGxlIiwiaGFuZGxlQ2hhbmdlIiwib25UaXRsZUNoYW5nZSIsInRhcmdldEZvcm0iLCJQb3BvdmVyVG9vbGJhciIsIm9uQnRuQ2xpY2siLCJBdXRvRm9ybUdyb3VwIiwiaXNIb3Jpem9udGFsIiwiaG9yaXpvbnRhbCIsImNvbnRyb2xJZCIsImxhYmVsIiwiY2hpbGRyZW4iLCJIdWViZWUiLCJyZXF1aXJlIiwiQ29sb3JJbnB1dCIsImpzRXZlbnRPclZhbHVlIiwibmV3Q29sb3JWYWx1ZSIsIm9uQ29sb3JDaGFuZ2UiLCJodWViZWVJbnN0YW5jZSIsInN0YXRpY09wZW4iLCJzZXRUZXh0Iiwic2V0QkdDb2xvciIsImh1ZXMiLCJodWUwIiwic2hhZGVzIiwic2F0dXJhdGlvbnMiLCJub3RhdGlvbiIsImNsYXNzTmFtZSIsImN1c3RvbUNvbG9ycyIsInNldENvbG9yIiwiQ29sb3JQaWNrZXJHcm91cCIsIkRhdGVUaW1lSW5wdXQiLCJuZXdEYXRlVmFsdWUiLCJvbkRhdGVUaW1lQ2hhbmdlIiwicmVhZE9ubHkiLCJkYXRldGltZXBpY2tlciIsInNob3dUb2RheUJ1dHRvbiIsImxvY2FsZSIsImRhdGEiLCJEYXRlVGltZVBpY2tlckdyb3VwIiwiRXZlbnREZXRhaWxGb3JtIiwiaGFuZGxlU3RhcnRDaGFuZ2UiLCJvblN0YXJ0Q2hhbmdlIiwiaGFuZGxlRW5kQ2hhbmdlIiwib25FbmRDaGFuZ2UiLCJvbkNvbG9yY2hhbmdlIiwiVGl0bGVJbnB1dEdyb3VwIiwiRXZlbnRDcmVhdGVNb2RhbCIsImNvbnNvbGUiLCJsb2ciLCJ0b0lTT1N0cmluZyIsIk5hdkhlYWRlciIsImJvcmRlckJvdHRvbSIsInBhZGRpbmciLCJvbk1vZGFsQ2xvc2UiLCJUYWJCb2R5IiwiVG9vbGJhckZvb3RlciIsIkV2ZW50TW9kYWwiLCJDaGlsZHJlbiIsImZvckVhY2giLCJ0aGlzQXJnIiwibmFtZSIsInR5cGUiLCJSZWFjdERPTSIsImdldEVsZW1lbnRCeUlkIiwiQ2FsZW5kYXJFdmVudCIsIkVycm9yIiwiX2NoZWNrRGF0YVR5cGUiLCJfY3JlYXRlIiwiZG9jIiwiZ19kYiIsIkRvY3VtZW50RnJvbUdVSUQiLCJHZXRQYXJhbVZhbHVlIiwibW9tZW50IiwiRGF0ZUNyZWF0ZWQiLCJHVUlEIiwiVGl0bGUiLCJEYXRlTW9kaWZpZWQiLCJlcnJvciIsImJrQ29sb3IiLCJhbGxEYXkiLCJkYXRlQ29tcGxldGVkIiwicnB0UnVsZSIsInJwdEVuZCIsIl9JbmZvIiwiX3BhcnNlSW5mbyIsIkNBTEVOREFSX0lORk8iLCJfRXh0cmFJbmZvIiwiQ0FMRU5EQVJfRVhUUkFJTkZPIiwiX2dldERlZmF1bHRFeHRyYUluZm8iLCJndWlkIiwiQ0FMRU5EQVJfU1RBUlQiLCJDQUxFTkRBUl9FTkQiLCJjaSIsIkNvbmZpZyIsImNvbG9ySXRlbXMiLCJpbmRleE9mIiwiQ29tcGxldGUiLCJEYXRlQ29tcGxldGVkIiwiQ0FMRU5EQVJfUkVDVVJSRU5DRSIsIkNBTEVOREFSX0VORFJFQ1VSUkVOQ0UiLCJoYXNUaW1lIiwiY3JlYXRlZCIsInVwZGF0ZWQiLCJfdXBkYXRlIiwib2JqQ2xhc3MiLCJHVUlEX1JlZ0V4ciIsIlN0cmluZyIsInRlc3QiLCJJbmZvU3RyaW5nIiwiSW5mb09iamVjdCIsIkluZm9BcnJheSIsIml0ZW0iLCJpbmRleCIsImFyciIsInBhaXIiLCJfc3RyaW5naWZ5SW5mbyIsIkluZm9PYmplY3RLZXlzQXJyYXkiLCJrZXlzIiwic2luZ2xlSW5mbyIsInB1c2giLCJqb2luIiwicmVwbGFjZSIsIl91cGRhdGVJbmZvIiwiX3VwZGF0ZUV4dHJhSW5mbyIsIkV4dHJhSW5mb09iamVjdCIsIl9nZXRFdmVudEh0bWwiLCJjb250ZW50IiwiaHRtbFRleHQiLCJnZW5lcmF0ZVJlcGVhdEV2ZW50cyIsImV2ZW50U291cmNlIiwiZGF5QXJyYXkiLCJfZ2V0UmVuZGVyUmVwZWF0RGF5IiwibmV3RXZlbnQiLCJ0b0Z1bGxDYWxlbmRhckV2ZW50IiwiYWRkIiwiZGlmZiIsInJlZ2V4IiwiY291bnQiLCJjdXJXZWVrRGF5IiwicmVzdWx0cyIsImludGVyV2VlayIsIm51bWJlciIsIl9nZXRXZWVrbHlSZXBlYXREYXkiLCJwZXJSdWxlIiwiX2dldFBlclJlcGVhdERheXMiLCJpbnRlcldlZWtzIiwidmlld1N0YXJ0Iiwidmlld0VuZCIsImludGVydmFsV2Vla3MiLCJ3ZWVrZGF5cyIsIm5ld0V2ZW50U3RhcnREYXRlIiwic2V0IiwiZ2V0IiwiaXNTYW1lIiwiaXNCZWZvcmUiLCJwZXJSdWxlTWFwIiwic3BsaWNlIiwiZmluZEluZGV4IiwidG9XaXpFdmVudERhdGEiLCJhZGRUb0Z1bGxDYWxlbmRhciIsIl9zYXZlQWxsUHJvcCIsInN0YXJ0U3RyIiwiZW5kU3RyIiwiX3NldFBhcmFtVmFsdWUiLCJTZXRQYXJhbVZhbHVlIiwiX2NyZWF0ZVdpekV2ZW50RG9jIiwibG9jYXRpb24iLCJvYmpGb2xkZXIiLCJHZXRGb2xkZXJCeUxvY2F0aW9uIiwidGVtcEh0bWwiLCJnX2NtbiIsIkdldEFUZW1wRmlsZU5hbWUiLCJTYXZlVGV4dFRvRmlsZSIsIkNyZWF0ZURvY3VtZW50MiIsIkNoYW5nZVRpdGxlQW5kRmlsZU5hbWUiLCJVcGRhdGVEb2N1bWVudDYiLCJBZGRUb0NhbGVuZGFyIiwic2F2ZVRvV2l6RXZlbnREb2MiLCJwcm9wIiwiZ3VpZFJlZ2V4IiwiaXNXaXpEb2NFeGlzdCIsImRlbGV0ZUV2ZW50RGF0YSIsImlzRGVsZXRlRG9jIiwiUmVtb3ZlRnJvbUNhbGVuZGFyIiwiRGVsZXRlIiwicmVmZXRjaERhdGEiLCJyZWZyZXNoRXZlbnQiLCJGb3JtSGFuZGxlcyIsIm9uQ3JlYXRlQnRuQ2xpY2siLCJmb3JtTm9kZSIsImZpbmQiLCJ2YWwiLCJjb2xvciIsImNyZWF0ZUV2ZW50IiwibW9kYWwiLCJvblNhdmVCdG5DbGljayIsIm9uQ29tcGxldGVCdG5DbGljayIsIm9uRGVsZXRlRGF0YUJ0bkNsaWNrIiwiV2l6Q29uZmlybSIsIm9uRGVsZXRlRG9jQnRuQ2xpY2siLCJvbkVkaXRPcmlnaW5CdG5DbGljayIsIm9iakRhdGFiYXNlIiwib2JqQ29tbW9uIiwiRWRpdENhbGVuZGFyRXZlbnQiLCJvbk9wZW5Eb2NCdG5DbGljayIsIm9ialdpbmRvdyIsIlZpZXdEb2N1bWVudCIsIldpekV2ZW50RGF0YUxvYWRlciIsIkRhdGFiYXNlIiwidXNlck5hbWUiLCJVc2VyTmFtZSIsImdlbmVyYWxFdmVudFNvdXJjZSIsIl9nZXRBbGxPcmlnaW5hbEV2ZW50IiwicmVwZWF0RXZlbnRTb3VyY2VzIiwiX2dldEFsbFJlcGVhdEV2ZW50IiwiY29uY2F0Iiwic3FsIiwiYW5kMSIsImFuZDIiLCJEb2N1bWVudHNEYXRhRnJvbVNRTCIsIm9iaiIsIkpTT04iLCJwYXJzZSIsIkFycmF5IiwiaXNBcnJheSIsImVyciIsInJlcGVhdEV2ZW50cyIsIl91cGRhdGVEb2NNb2RpZnlEYXRlIiwibm93Iiwic2V0U2Vjb25kcyIsImdldFNlY29uZHMiLCJfZDJzIiwiZHQiLCJnZXRGdWxsWWVhciIsImZvcm1hdEludFRvRGF0ZVN0cmluZyIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsImdldEhvdXJzIiwiZ2V0TWludXRlcyIsImV2ZW50RW5kU3RyIiwic2VsZWN0aW9uRGF0YSIsInVzZXJJbnB1dHMiLCJfZ2V0V2l6RXZlbnQiLCJFdmVudENvbGxlY3Rpb24iLCJHZXRDYWxlbmRhckV2ZW50czIiLCJnZXRSZW5kZXJSZXBlYXREYXkiLCJfczJkIiwiZ19ldmVudFN0YXJ0IiwiZ19yZXBlYXRSdWxlIiwiZ2V0V2Vla2x5UmVwZWF0RGF5IiwiY2hhckF0IiwiZ2V0RGF5IiwiaW50ZXIiLCJfaW50ZXJEYXlzIiwiZ2V0TW9udGhseVJlcGVhdERheSIsImdldFllYXJseVJlcGVhdERheSIsImdldENoaW5lc2VSZXBlYXREYXkiLCJkYXlzIiwic3Vic3RyIiwiaXNDaHJvbWUiLCJnX2lzQ2hyb21lIiwidWEiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJ0b0xvd2VyQ2FzZSIsIm4iLCJjaGVja0FuZEFkZFN0ckxlbmd0aCIsInN0ciIsImNvbG9yQ291bnQiLCJXaXpFeHBsb3JlckFwcCIsIndpbmRvdyIsImV4dGVybmFsIiwiV2l6RXhwbG9yZXJXaW5kb3ciLCJXaW5kb3ciLCJXaXpEYXRhYmFzZSIsIldpekNvbW1vblVJIiwiQ3JlYXRlV2l6T2JqZWN0IiwibXNnIiwiU2hvd01lc3NhZ2UiLCJXaXpBbGVydCIsIldpekJ1YmJsZU1lc3NhZ2UiLCJkZWxheSIsImFwcFBhdGgiLCJHZXRTcGVjaWFsRm9sZGVyIiwid2l6U2hlbGxGaWxlTmFtZSIsImRsbEZpbGVOYW1lIiwicGFyYW1zIiwiUnVuRXhlIiwiV2l6U2hlbGwiLCJkbGxFeHBvcnRGdW5jIiwid2l6RXhlIiwicnVuU2NyaXB0RmlsZSIsInNjcmlwdEZpbGVOYW1lIiwic2NyaXB0UGFyYW1zIiwid2l6QnViYmxlTWVzc2FnZSIsImdldFdpekludGVyZmFjZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQVEsb0JBQW9CO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQWlCLDRCQUE0QjtBQUM3QztBQUNBO0FBQ0EsMEJBQWtCLDJCQUEyQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLGVBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQSxzREFBOEM7QUFDOUM7QUFDQTtBQUNBLG9DQUE0QjtBQUM1QixxQ0FBNkI7QUFDN0IseUNBQWlDOztBQUVqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQTZCO0FBQzdCLHFDQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsNkJBQXFCLGdCQUFnQjtBQUNyQztBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxhQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBCQUFrQiw4QkFBOEI7QUFDaEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLGVBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQW9CLDJCQUEyQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBbUIsY0FBYztBQUNqQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQWdCLEtBQUs7QUFDckI7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBZ0IsWUFBWTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFjLDRCQUE0QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZSw0QkFBNEI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBZSw0QkFBNEI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUFpQix1Q0FBdUM7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBaUIsdUNBQXVDO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQWlCLHNCQUFzQjtBQUN2QztBQUNBO0FBQ0E7QUFDQSxnQkFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0JBQWMsd0NBQXdDO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQSw4Q0FBc0MsdUJBQXVCOztBQUU3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUFnQix1QkFBdUI7QUFDdkM7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN0MUJBO0FBQ0E7OztBQUdBO0FBQ0EsOElBQStJLHdCQUF3QixlQUFlLGtCQUFrQixtQkFBbUIsb0JBQW9CLEtBQUssNEJBQTRCLHVKQUF1Six3QkFBd0IseUJBQXlCLEtBQUssZ0hBQWdILHFCQUFxQixTQUFTLG9DQUFvQyxpREFBaUQsS0FBSyw0QkFBNEIsbUJBQW1CLEtBQUs7O0FBRXp2Qjs7Ozs7Ozs7Ozs7O0FDUEE7QUFDQTs7O0FBR0E7QUFDQSwrTUFBZ04sMkJBQTJCLHlCQUF5QixxQkFBcUIsb0JBQW9CLDZDQUE2QywyQkFBMkIsZ0RBQWdELHlCQUF5QixLQUFLLDRCQUE0QiwyQkFBMkIsdUJBQXVCLG9CQUFvQixxQkFBcUIsc0JBQXNCLEtBQUssK0RBQStELDJCQUEyQix1QkFBdUIsc0JBQXNCLGtDQUFrQyw0QkFBNEIsS0FBSyx5R0FBeUcsNEJBQTRCLEtBQUssa0RBQWtELHdDQUF3QyxLQUFLLDhHQUE4RyxrQ0FBa0MsS0FBSywwREFBMEQsa0JBQWtCLDhDQUE4QyxLQUFLLHlEQUF5RCxvQkFBb0IsK0JBQStCLEtBQUssNkdBQTZHLDBCQUEwQixLQUFLLG9EQUFvRCxzQ0FBc0Msb0JBQW9CLHFCQUFxQixzQkFBc0IsS0FBSyxrSEFBa0gsdUNBQXVDLEtBQUssNERBQTRELGdCQUFnQixnREFBZ0QsS0FBSywyREFBMkQsa0JBQWtCLGlDQUFpQyxLQUFLLCtHQUErRyx5QkFBeUIsS0FBSyxxREFBcUQscUNBQXFDLEtBQUssb0hBQW9ILHVDQUF1QyxLQUFLLDZEQUE2RCxlQUFlLGlEQUFpRCxLQUFLLDREQUE0RCxpQkFBaUIscUNBQXFDLCtCQUErQiwyR0FBMkcsMkJBQTJCLEtBQUssbURBQW1ELHVDQUF1QyxvQkFBb0IscUJBQXFCLHNCQUFzQixLQUFLLGdIQUFnSCx1Q0FBdUMsS0FBSywyREFBMkQsaUJBQWlCLCtDQUErQyxLQUFLLDBEQUEwRCxtQkFBbUIsZ0NBQWdDLEtBQUssK0ZBQStGLDhCQUE4Qix5QkFBeUIsd0JBQXdCLHVCQUF1QixrQ0FBa0MseUNBQXlDLG9DQUFvQyxxQ0FBcUMsS0FBSywwQkFBMEIsMkJBQTJCLEtBQUs7O0FBRXZ6SDs7Ozs7Ozs7Ozs7O0FDUEE7QUFDQTs7O0FBR0E7QUFDQSxvREFBcUQsMEJBQTBCLGtDQUFrQyxzQ0FBc0MsbUJBQW1CLGtCQUFrQix5QkFBeUIsMEJBQTBCLEtBQUssNkVBQTZFLHNCQUFzQixtQ0FBbUMsTUFBTTs7QUFFaFk7Ozs7Ozs7Ozs7OztBQ1BBO0FBQ0E7OztBQUdBO0FBQ0EscUNBQXNDLHlCQUF5Qix3QkFBd0IsS0FBSyxnQkFBZ0IscUJBQXFCLEtBQUsseUhBQXlILDBXQUEwVyxlQUFlLHVPQUF1TyxnQkFBZ0IsK1ZBQStWLHFCQUFxQixnSUFBZ0ksMkdBQTJHLG1CQUFtQixLQUFLLHNCQUFzQixvQkFBb0IsS0FBSyx1TEFBdUwseUNBQXlDLDRDQUE0Qyx5QkFBeUIsMkJBQTJCLHlCQUF5QixLQUFLLDRCQUE0QiwyQkFBMkIsNEJBQTRCLEtBQUssb0NBQW9DLDZCQUE2QixLQUFLLG1DQUFtQyw4QkFBOEIsS0FBSzs7QUFFdmxFOzs7Ozs7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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ZTs7QUFFWHhjLGdCQUFZcWMsV0FBWixFQUF5QkksYUFBekIsRUFBd0NILE1BQXhDLEVBQWdEO0FBQzVDO0FBQ0EsY0FBTUosVUFBVVAsWUFBWVEsZ0JBQVosQ0FBNkIsU0FBN0IsQ0FBaEI7QUFDQSxhQUFLRCxPQUFMLEdBQWVBLE9BQWY7QUFDQSxhQUFLUSxNQUFMLEdBQWNSLFVBQVUsU0FBeEI7QUFDQSxhQUFLRyxXQUFMLEdBQW1CQSxjQUFjSCxVQUFVRyxXQUF4QixHQUFzQ0gsVUFBVSxtQkFBbkU7QUFDQSxhQUFLTyxhQUFMLEdBQXFCQSxpQkFBaUIsZ0JBQXRDO0FBQ0EsYUFBS0gsTUFBTCxHQUFjQSxNQUFkO0FBQ0g7O0FBRURLLGtCQUFjQyxjQUFkLEVBQThCQyxZQUE5QixFQUE0QztBQUN4QyxjQUFNUCxTQUFVLElBQUcsS0FBS0osT0FBTCxHQUFlLG1CQUFvQixvQ0FBbUNVLGNBQWUsSUFBR0MsWUFBYSxFQUF4SDtBQUNBbEIsb0JBQVlZLE1BQVosQ0FBbUIsS0FBS0csTUFBeEIsRUFBZ0NKLE1BQWhDLEVBQXdDLEtBQXhDO0FBQ0g7O0FBRURRLHFCQUFpQnJVLEtBQWpCLEVBQXdCb1QsR0FBeEIsRUFBNkJyRixRQUFRLFNBQXJDLEVBQWdEeUYsUUFBUSxHQUF4RCxFQUE2RDtBQUN6REQseUJBQWlCdlQsS0FBakIsRUFBd0JvVCxHQUF4QixFQUE2QnJGLEtBQTdCLEVBQW9DeUYsS0FBcEM7QUFDSDs7QUFFRCxXQUFPYyxlQUFQLEdBQXlCO0FBQ3JCLGVBQU87QUFDSDFCLDBCQURHLEVBQ2FHLGlCQURiLEVBQ2dDRSxXQURoQyxFQUM2Q0M7QUFEN0MsU0FBUDtBQUdIO0FBekJVIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuIFx0ZnVuY3Rpb24gaG90RGlzcG9zZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdH1cbiBcdHZhciBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayA9IHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl07XG4gXHR3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdID0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0XHRpZiAocGFyZW50SG90VXBkYXRlQ2FsbGJhY2spIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdH0gO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHR2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcbiBcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gXHRcdHNjcmlwdC5jaGFyc2V0ID0gXCJ1dGYtOFwiO1xuIFx0XHRzY3JpcHQuc3JjID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc1wiO1xuIFx0XHQ7XG4gXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZE1hbmlmZXN0KHJlcXVlc3RUaW1lb3V0KSB7XG4gXHRcdHJlcXVlc3RUaW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQgfHwgMTAwMDA7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydFwiKSk7XG4gXHRcdFx0fVxuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuIFx0XHRcdFx0dmFyIHJlcXVlc3RQYXRoID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc29uXCI7XG4gXHRcdFx0XHRyZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgcmVxdWVzdFBhdGgsIHRydWUpO1xuIFx0XHRcdFx0cmVxdWVzdC50aW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQ7XG4gXHRcdFx0XHRyZXF1ZXN0LnNlbmQobnVsbCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KGVycik7XG4gXHRcdFx0fVxuIFx0XHRcdHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSByZXR1cm47XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5zdGF0dXMgPT09IDApIHtcbiBcdFx0XHRcdFx0Ly8gdGltZW91dFxuIFx0XHRcdFx0XHRyZWplY3QoXG4gXHRcdFx0XHRcdFx0bmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgdGltZWQgb3V0LlwiKVxuIFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gNDA0KSB7XG4gXHRcdFx0XHRcdC8vIG5vIHVwZGF0ZSBhdmFpbGFibGVcbiBcdFx0XHRcdFx0cmVzb2x2ZSgpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyAhPT0gMjAwICYmIHJlcXVlc3Quc3RhdHVzICE9PSAzMDQpIHtcbiBcdFx0XHRcdFx0Ly8gb3RoZXIgZmFpbHVyZVxuIFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgZmFpbGVkLlwiKSk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHQvLyBzdWNjZXNzXG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0dmFyIHVwZGF0ZSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG4gXHRcdFx0XHRcdFx0cmVqZWN0KGUpO1xuIFx0XHRcdFx0XHRcdHJldHVybjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRyZXNvbHZlKHVwZGF0ZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdHZhciBob3RBcHBseU9uVXBkYXRlID0gdHJ1ZTtcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiNDJjYTA5ZTU1MWJjODYwMTRiZGRcIjsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdFJlcXVlc3RUaW1lb3V0ID0gMTAwMDA7XG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcbiBcdHZhciBob3RDdXJyZW50Q2hpbGRNb2R1bGU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50cyA9IFtdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHNUZW1wID0gW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRpZiAoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuIFx0XHRcdGlmIChtZS5ob3QuYWN0aXZlKSB7XG4gXHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuIFx0XHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpID09PSAtMSkge1xuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgK1xuIFx0XHRcdFx0XHRcdHJlcXVlc3QgK1xuIFx0XHRcdFx0XHRcdFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdCk7XG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcbiBcdFx0fTtcbiBcdFx0dmFyIE9iamVjdEZhY3RvcnkgPSBmdW5jdGlvbiBPYmplY3RGYWN0b3J5KG5hbWUpIHtcbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xuIFx0XHRcdFx0fSxcbiBcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiBcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH07XG4gXHRcdGZvciAodmFyIG5hbWUgaW4gX193ZWJwYWNrX3JlcXVpcmVfXykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfX3dlYnBhY2tfcmVxdWlyZV9fLCBuYW1lKSAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJlXCIgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwidFwiXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIE9iamVjdEZhY3RvcnkobmFtZSkpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRmbi5lID0gZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicmVhZHlcIikgaG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkKS50aGVuKGZpbmlzaENodW5rTG9hZGluZywgZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcbiBcdFx0XHRcdHRocm93IGVycjtcbiBcdFx0XHR9KTtcblxuIFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcbiBcdFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XG4gXHRcdFx0XHRcdGlmICghaG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XG4gXHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9O1xuIFx0XHRmbi50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0XHRpZiAobW9kZSAmIDEpIHZhbHVlID0gZm4odmFsdWUpO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnQodmFsdWUsIG1vZGUgJiB+MSk7XG4gXHRcdH07XG4gXHRcdHJldHVybiBmbjtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIGhvdCA9IHtcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXG4gXHRcdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuIFx0XHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuIFx0XHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuIFx0XHRcdF9tYWluOiBob3RDdXJyZW50Q2hpbGRNb2R1bGUgIT09IG1vZHVsZUlkLFxuXG4gXHRcdFx0Ly8gTW9kdWxlIEFQSVxuIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgZGVwID09PSBcInVuZGVmaW5lZFwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBkZXAgPT09IFwidW5kZWZpbmVkXCIpIGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG4gXHRcdFx0fSxcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvLyBNYW5hZ2VtZW50IEFQSVxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXG4gXHRcdFx0c3RhdHVzOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRpZiAoIWwpIHJldHVybiBob3RTdGF0dXM7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3RTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG4gXHRcdH07XG4gXHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcbiBcdFx0cmV0dXJuIGhvdDtcbiBcdH1cblxuIFx0dmFyIGhvdFN0YXR1c0hhbmRsZXJzID0gW107XG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XG5cbiBcdGZ1bmN0aW9uIGhvdFNldFN0YXR1cyhuZXdTdGF0dXMpIHtcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xuIFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcbiBcdH1cblxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90QXZhaWxhYmxlRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3REZWZlcnJlZDtcblxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XG4gXHRcdHZhciBpc051bWJlciA9ICtpZCArIFwiXCIgPT09IGlkO1xuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHkpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcbiBcdFx0fVxuIFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xuIFx0XHRyZXR1cm4gaG90RG93bmxvYWRNYW5pZmVzdChob3RSZXF1ZXN0VGltZW91dCkudGhlbihmdW5jdGlvbih1cGRhdGUpIHtcbiBcdFx0XHRpZiAoIXVwZGF0ZSkge1xuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0XHRcdHJldHVybiBudWxsO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdEF2YWlsYWJsZUZpbGVzTWFwID0gdXBkYXRlLmM7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xuXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0aG90RGVmZXJyZWQgPSB7XG4gXHRcdFx0XHRcdHJlc29sdmU6IHJlc29sdmUsXG4gXHRcdFx0XHRcdHJlamVjdDogcmVqZWN0XG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdGZvcih2YXIgY2h1bmtJZCBpbiBpbnN0YWxsZWRDaHVua3MpXG4gXHRcdFx0e1xuIFx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nID09PSAwICYmXG4gXHRcdFx0XHRob3RXYWl0aW5nRmlsZXMgPT09IDBcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxuIFx0XHRcdHJldHVybjtcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcbiBcdFx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmICgtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XG4gXHRcdGlmICghZGVmZXJyZWQpIHJldHVybjtcbiBcdFx0aWYgKGhvdEFwcGx5T25VcGRhdGUpIHtcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xuIFx0XHRcdC8vIGF2b2lkIHRyaWdnZXJpbmcgdW5jYXVnaHQgZXhjZXB0aW9uIHdhcm5pbmcgaW4gQ2hyb21lLlxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKVxuIFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcbiBcdFx0XHRcdH0pXG4gXHRcdFx0XHQudGhlbihcbiBcdFx0XHRcdFx0ZnVuY3Rpb24ocmVzdWx0KSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuIFx0XHRcdFx0XHR9LFxuIFx0XHRcdFx0XHRmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0KTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKVxuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiBcdFx0dmFyIGNiO1xuIFx0XHR2YXIgaTtcbiBcdFx0dmFyIGo7XG4gXHRcdHZhciBtb2R1bGU7XG4gXHRcdHZhciBtb2R1bGVJZDtcblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKHVwZGF0ZU1vZHVsZUlkKSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKS5tYXAoZnVuY3Rpb24oaWQpIHtcbiBcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdGNoYWluOiBbaWRdLFxuIFx0XHRcdFx0XHRpZDogaWRcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRcdHZhciBxdWV1ZUl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcbiBcdFx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKCFtb2R1bGUgfHwgbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fbWFpbikge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0aWYgKCFwYXJlbnQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2goe1xuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0aWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cblxuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHR0eXBlOiBcImFjY2VwdGVkXCIsXG4gXHRcdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcbiBcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzOiBvdXRkYXRlZERlcGVuZGVuY2llc1xuIFx0XHRcdH07XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XG4gXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XG4gXHRcdFx0XHRpZiAoYS5pbmRleE9mKGl0ZW0pID09PSAtMSkgYS5wdXNoKGl0ZW0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcblxuIFx0XHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKCkge1xuIFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVzdWx0Lm1vZHVsZUlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiXG4gXHRcdFx0KTtcbiBcdFx0fTtcblxuIFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xuIFx0XHRcdFx0LyoqIEB0eXBlIHtUT0RPfSAqL1xuIFx0XHRcdFx0dmFyIHJlc3VsdDtcbiBcdFx0XHRcdGlmIChob3RVcGRhdGVbaWRdKSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogaWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdC8qKiBAdHlwZSB7RXJyb3J8ZmFsc2V9ICovXG4gXHRcdFx0XHR2YXIgYWJvcnRFcnJvciA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBjaGFpbkluZm8gPSBcIlwiO1xuIFx0XHRcdFx0aWYgKHJlc3VsdC5jaGFpbikge1xuIFx0XHRcdFx0XHRjaGFpbkluZm8gPSBcIlxcblVwZGF0ZSBwcm9wYWdhdGlvbjogXCIgKyByZXN1bHQuY2hhaW4uam9pbihcIiAtPiBcIik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzd2l0Y2ggKHJlc3VsdC50eXBlKSB7XG4gXHRcdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdFwiIGluIFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucGFyZW50SWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcInVuYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblVuYWNjZXB0ZWQpIG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIgKyBjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uQWNjZXB0ZWQpIG9wdGlvbnMub25BY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGlzcG9zZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRpc3Bvc2VkKSBvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0Rpc3Bvc2UgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRkZWZhdWx0OlxuIFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhjZXB0aW9uIHR5cGUgXCIgKyByZXN1bHQudHlwZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoYWJvcnRFcnJvcikge1xuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcbiBcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvQXBwbHkpIHtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHRcdFx0XHRmb3IgKG1vZHVsZUlkIGluIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdFx0XHRcdGlmIChcbiBcdFx0XHRcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0XHRcdFx0KVxuIFx0XHRcdFx0XHRcdCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQoXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSxcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXVxuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0Rpc3Bvc2UpIHtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cbiBcdFx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbaV07XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiZcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0KVxuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0XHR9KTtcbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xuIFx0XHRPYmplY3Qua2V5cyhob3RBdmFpbGFibGVGaWxlc01hcCkuZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdID09PSBmYWxzZSkge1xuIFx0XHRcdFx0aG90RGlzcG9zZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0fSk7XG5cbiBcdFx0dmFyIGlkeDtcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG4gXHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRpZiAoIW1vZHVsZSkgY29udGludWU7XG5cbiBcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG4gXHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRjYiA9IGRpc3Bvc2VIYW5kbGVyc1tqXTtcbiBcdFx0XHRcdGNiKGRhdGEpO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF0gPSBkYXRhO1xuXG4gXHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcbiBcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXG4gXHRcdFx0ZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxuIFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcbiBcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkge1xuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXG4gXHRcdHZhciBkZXBlbmRlbmN5O1xuIFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG4gXHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG4gXHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3QgaW4gXCJhcHBseVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xuXG4gXHRcdGhvdEN1cnJlbnRIYXNoID0gaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldO1xuIFx0XHRcdFx0XHRcdGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG4gXHRcdFx0XHRcdFx0aWYgKGNiKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzLmluZGV4T2YoY2IpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRjYiA9IGNhbGxiYWNrc1tpXTtcbiBcdFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdFx0Y2IobW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuIFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV0sXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXG4gXHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjI7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcbiBcdFx0aWYgKGVycm9yKSB7XG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuIFx0XHR9XG5cbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiBcdFx0XHRyZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJpbmRleFwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGhvdDogaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSxcbiBcdFx0XHRwYXJlbnRzOiAoaG90Q3VycmVudFBhcmVudHNUZW1wID0gaG90Q3VycmVudFBhcmVudHMsIGhvdEN1cnJlbnRQYXJlbnRzID0gW10sIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCksXG4gXHRcdFx0Y2hpbGRyZW46IFtdXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbXCIuL3NyYy9pbmRleC5qc1wiLFwidmVuZG9yXCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXHJcXG4vKiDml6XljobmlbTkvZPmoLflvI9cXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG4jY2FsZW5kYXItY29udGFpbmVyIHtcXHJcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcclxcbiAgICB0b3A6IDA7XFxyXFxuICAgIGxlZnQ6IDhweDtcXHJcXG4gICAgcmlnaHQ6IDhweDtcXHJcXG4gICAgYm90dG9tOiA4cHg7XFxyXFxufVxcclxcblxcclxcbi5mYy1oZWFkZXItdG9vbGJhciB7XFxyXFxuICAgIC8qXFxyXFxuICAgIHRoZSBjYWxlbmRhciB3aWxsIGJlIGJ1dHRpbmcgdXAgYWdhaW5zdCB0aGUgZWRnZXMsXFxyXFxuICAgIGJ1dCBsZXQncyBzY29vdCBpbiB0aGUgaGVhZGVyJ3MgYnV0dG9uc1xcclxcbiAgICAqL1xcclxcbiAgICBwYWRkaW5nLXRvcDogMTRweDtcXHJcXG4gICAgcGFkZGluZy1sZWZ0OiAwO1xcclxcbiAgICBwYWRkaW5nLXJpZ2h0OiAwO1xcclxcbn1cXHJcXG5cXHJcXG4vKiDkuovku7bmuLLmn5NcXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG4udGMtY29tcGxldGUge1xcclxcbiAgICBvcGFjaXR5OiAwLjM7XFxyXFxuXFxyXFxufVxcclxcblxcclxcbi50Yy1jb21wbGV0ZSA+IC5mYy1jb250ZW50IHtcXHJcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBsaW5lLXRocm91Z2ggIWltcG9ydGFudDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLWNvbXBsZXRlOmhvdmVyIHtcXHJcXG4gICAgb3BhY2l0eTogMTtcXHJcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKiBQb3BvdmVyIOe7hOS7tuagt+W8j1xcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcblxcclxcbi8qIFBvcG92ZXIg5a655Zmo5Y+K5a6a5L2NXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuXFxyXFxuLnRjLXBvcG92ZXIge1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGJhY2tncm91bmQ6ICNGRkY7XFxyXFxuICAgIGNvbG9yOiBibGFjaztcXHJcXG4gICAgd2lkdGg6IGF1dG87XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4yKTtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNnB4O1xcclxcbiAgICBib3gtc2hhZG93OiAwIDJweCA0cHggcmdiYSgwLCAwLCAwLCAuMik7XFxyXFxuICAgIHRleHQtYWxpZ246IGxlZnQ7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyIC5hcnJvdyB7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICAgIHdpZHRoOiAyMHB4O1xcclxcbiAgICBoZWlnaHQ6IDEwcHg7XFxyXFxuICAgIG1hcmdpbjogMCA2cHg7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyIC5hcnJvdzo6YmVmb3JlLCAudGMtcG9wb3ZlciAuYXJyb3c6OmFmdGVyIHtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgY29udGVudDogXFxcIlxcXCI7XFxyXFxuICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XFxyXFxuICAgIGJvcmRlci1zdHlsZTogc29saWQ7XFxyXFxufVxcclxcblxcclxcbi8qIHRvcCDmlL7nva7moLflvI9cXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInRvcFxcXCJdIHtcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJ0b3BcXFwiXSAuYXJyb3cge1xcclxcbiAgICBib3R0b206IGNhbGMoKDEwcHggKyAxcHgpICogLTEpO1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInRvcFxcXCJdIC5hcnJvdzo6YmVmb3JlLFxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwidG9wXFxcIl0gLmFycm93OjphZnRlciB7XFxyXFxuICAgIGJvcmRlci13aWR0aDogMTBweCAxMHB4IDA7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwidG9wXFxcIl0gLmFycm93OjpiZWZvcmUge1xcclxcbiAgICBib3R0b206IDA7XFxyXFxuICAgIGJvcmRlci10b3AtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSk7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwidG9wXFxcIl0gLmFycm93OjphZnRlciB7XFxyXFxuICAgIGJvdHRvbTogMXB4O1xcclxcbiAgICBib3JkZXItdG9wLWNvbG9yOiAjZmZmO1xcclxcbn1cXHJcXG5cXHJcXG4vKiByaWdodCDmlL7nva7moLflvI9cXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInJpZ2h0XFxcIl0ge1xcclxcbiAgICBtYXJnaW4tbGVmdDogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJyaWdodFxcXCJdIC5hcnJvdyB7XFxyXFxuICAgIGxlZnQ6IGNhbGMoKDEwcHggKyAxcHgpICogLTEpO1xcclxcbiAgICB3aWR0aDogMTBweDtcXHJcXG4gICAgaGVpZ2h0OiAyMHB4O1xcclxcbiAgICBtYXJnaW46IDZweCAwO1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInJpZ2h0XFxcIl0gLmFycm93OjpiZWZvcmUsXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJyaWdodFxcXCJdIC5hcnJvdzo6YWZ0ZXIge1xcclxcbiAgICBib3JkZXItd2lkdGg6IDEwcHggMTBweCAxMHB4IDA7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwicmlnaHRcXFwiXSAuYXJyb3c6OmJlZm9yZSB7XFxyXFxuICAgIGxlZnQ6IDA7XFxyXFxuICAgIGJvcmRlci1yaWdodC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KTtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJyaWdodFxcXCJdIC5hcnJvdzo6YWZ0ZXIge1xcclxcbiAgICBsZWZ0OiAxcHg7XFxyXFxuICAgIGJvcmRlci1yaWdodC1jb2xvcjogI2ZmZjtcXHJcXG59XFxyXFxuXFxyXFxuLyogYm90dG9tIOaUvue9ruagt+W8j1xcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwiYm90dG9tXFxcIl0ge1xcclxcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImJvdHRvbVxcXCJdIC5hcnJvdyB7XFxyXFxuICAgIHRvcDogY2FsYygoMTBweCArIDFweCkgKiAtMSk7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwiYm90dG9tXFxcIl0gLmFycm93OjpiZWZvcmUsXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJib3R0b21cXFwiXSAuYXJyb3c6OmFmdGVyIHtcXHJcXG4gICAgYm9yZGVyLXdpZHRoOiAwIDEwcHggMTBweCAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImJvdHRvbVxcXCJdIC5hcnJvdzo6YmVmb3JlIHtcXHJcXG4gICAgdG9wOiAwO1xcclxcbiAgICBib3JkZXItYm90dG9tLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMjUpO1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImJvdHRvbVxcXCJdIC5hcnJvdzo6YWZ0ZXIge1xcclxcbiAgICB0b3A6IDFweDtcXHJcXG4gICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogI2Y3ZjdmNzsgLyrov5nph4zkuLrkuobkuJPpl6jpgILphY3mnInmoIfpopjog4zmma/nmoRQb3BvdmVyKi9cXHJcXG59XFxyXFxuXFxyXFxuLyogbGVmdCDmlL7nva7moLflvI9cXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImxlZnRcXFwiXSB7XFxyXFxuICAgIG1hcmdpbi1yaWdodDogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJsZWZ0XFxcIl0gLmFycm93IHtcXHJcXG4gICAgcmlnaHQ6IGNhbGMoKDEwcHggKyAxcHgpICogLTEpO1xcclxcbiAgICB3aWR0aDogMTBweDtcXHJcXG4gICAgaGVpZ2h0OiAyMHB4O1xcclxcbiAgICBtYXJnaW46IDZweCAwO1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImxlZnRcXFwiXSAuYXJyb3c6OmJlZm9yZSxcXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImxlZnRcXFwiXSAuYXJyb3c6OmFmdGVyIHtcXHJcXG4gICAgYm9yZGVyLXdpZHRoOiAxMHB4IDAgMTBweCAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImxlZnRcXFwiXSAuYXJyb3c6OmJlZm9yZSB7XFxyXFxuICAgIHJpZ2h0OiAwO1xcclxcbiAgICBib3JkZXItbGVmdC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KTtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJsZWZ0XFxcIl0gLmFycm93OjphZnRlciB7XFxyXFxuICAgIHJpZ2h0OiAxcHg7XFxyXFxuICAgIGJvcmRlci1sZWZ0LWNvbG9yOiAjZmZmO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBDb250ZW50IOagh+mimOWSjOWGheWuuVxcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcblxcclxcbi50Yy1wb3BvdmVyLWhlYWRlciB7XFxyXFxuICAgIHBhZGRpbmc6IC41cmVtIC43NXJlbTtcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogMDtcXHJcXG4gICAgZm9udC1zaXplOiAxcmVtO1xcclxcbiAgICBjb2xvcjogaW5oZXJpdDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y3ZjdmNztcXHJcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlYmViZWI7XFxyXFxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDZweDtcXHJcXG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDZweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXItYm9keSB7XFxyXFxuICAgIHBhZGRpbmc6IDEwcHggMTVweDtcXHJcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIjdGMtZWRpdHBvcHBlci1ldmVudHRpdGxlIHtcXHJcXG4gICAgYm9yZGVyLXdpZHRoOiAxcHg7XFxyXFxuICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcclxcbiAgICBwYWRkaW5nOiAwO1xcclxcbiAgICBtYXJnaW46IDA7XFxyXFxuICAgIGZvbnQtc2l6ZTogMS4yZW07XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbn1cXHJcXG5cXHJcXG4jdGMtZWRpdHBvcHBlci1ldmVudHRpdGxlOmZvY3VzLFxcclxcbiN0Yy1lZGl0cG9wcGVyLWV2ZW50dGl0bGU6aG92ZXIge1xcclxcbiAgICBvdXRsaW5lOiBub25lO1xcclxcbiAgICBib3JkZXItYm90dG9tLWNvbG9yOiBibGFjazsgXFxyXFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiaHRtbCwgYm9keSB7XFxyXFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxyXFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXHJcXG59XFxyXFxuXFxyXFxuOmZvY3VzIHtcXHJcXG4gICAgb3V0bGluZTpub25lO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBGb250cy5jc3MgLS0g6Leo5bmz5Y+w5Lit5paH5a2X5L2T6Kej5Yaz5pa55qGIXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcbi5mb250LWhlaSB7Zm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIFxcXCJOb3RvIFNhbnNcXFwiLCBcXFwiSGVsdmV0aWNhIE5ldWVcXFwiLCBIZWx2ZXRpY2EsIFxcXCJOaW1idXMgU2FucyBMXFxcIiwgQXJpYWwsIFxcXCJMaWJlcmF0aW9uIFNhbnNcXFwiLCBcXFwiUGluZ0ZhbmcgU0NcXFwiLCBcXFwiSGlyYWdpbm8gU2FucyBHQlxcXCIsIFxcXCJOb3RvIFNhbnMgQ0pLIFNDXFxcIiwgXFxcIlNvdXJjZSBIYW4gU2FucyBTQ1xcXCIsIFxcXCJTb3VyY2UgSGFuIFNhbnMgQ05cXFwiLCBcXFwiTWljcm9zb2Z0IFlhSGVpXFxcIiwgXFxcIldlbnF1YW55aSBNaWNybyBIZWlcXFwiLCBcXFwiV2VuUXVhbllpIFplbiBIZWlcXFwiLCBcXFwiU1QgSGVpdGlcXFwiLCBTaW1IZWksIFxcXCJXZW5RdWFuWWkgWmVuIEhlaSBTaGFycFxcXCIsIHNhbnMtc2VyaWY7fVxcclxcbi5mb250LWthaSB7Zm9udC1mYW1pbHk6IEJhc2tlcnZpbGxlLCBHZW9yZ2lhLCBcXFwiTGliZXJhdGlvbiBTZXJpZlxcXCIsIFxcXCJLYWl0aSBTQ1xcXCIsIFNUS2FpdGksIFxcXCJBUiBQTCBVS2FpIENOXFxcIiwgXFxcIkFSIFBMIFVLYWkgSEtcXFwiLCBcXFwiQVIgUEwgVUthaSBUV1xcXCIsIFxcXCJBUiBQTCBVS2FpIFRXIE1CRVxcXCIsIFxcXCJBUiBQTCBLYWl0aU0gR0JcXFwiLCBLYWlUaSwgS2FpVGlfR0IyMzEyLCBERkthaS1TQiwgXFxcIlRXLUthaVxcXCIsIHNlcmlmO31cXHJcXG4uZm9udC1zb25nIHtmb250LWZhbWlseTogR2VvcmdpYSwgXFxcIk5pbWJ1cyBSb21hbiBObzkgTFxcXCIsIFxcXCJTb25ndGkgU0NcXFwiLCBcXFwiTm90byBTZXJpZiBDSksgU0NcXFwiLCBcXFwiU291cmNlIEhhbiBTZXJpZiBTQ1xcXCIsIFxcXCJTb3VyY2UgSGFuIFNlcmlmIENOXFxcIiwgU1RTb25nLCBcXFwiQVIgUEwgTmV3IFN1bmdcXFwiLCBcXFwiQVIgUEwgU3VuZ3RpTCBHQlxcXCIsIE5TaW1TdW4sIFNpbVN1biwgXFxcIlRXLVN1bmdcXFwiLCBcXFwiV2VuUXVhbllpIEJpdG1hcCBTb25nXFxcIiwgXFxcIkFSIFBMIFVNaW5nIENOXFxcIiwgXFxcIkFSIFBMIFVNaW5nIEhLXFxcIiwgXFxcIkFSIFBMIFVNaW5nIFRXXFxcIiwgXFxcIkFSIFBMIFVNaW5nIFRXIE1CRVxcXCIsIFBNaW5nTGlVLCBNaW5nTGlVLCBzZXJpZjt9XFxyXFxuLmZvbnQtZmFuZy1zb25nIHtmb250LWZhbWlseTogQmFza2VydmlsbGUsIFxcXCJUaW1lcyBOZXcgUm9tYW5cXFwiLCBcXFwiTGliZXJhdGlvbiBTZXJpZlxcXCIsIFNURmFuZ3NvbmcsIEZhbmdTb25nLCBGYW5nU29uZ19HQjIzMTIsIFxcXCJDV1RFWC1GXFxcIiwgc2VyaWY7fVxcclxcblxcclxcbi8qIOS4tOaXtuaUvue9rlxcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcblxcclxcbi51aS1idXR0b24taWNvbi1vbmx5LnNwbGl0YnV0dG9uLXNlbGVjdCB7XFxyXFxuICAgIHdpZHRoOiAxZW07XFxyXFxufVxcclxcblxcclxcbmFbZGF0YS1nb3RvXSB7XFxyXFxuICAgIGNvbG9yOiAjMDAwO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBCb290c3RyYXAgNCDnu4Tku7bmoLflvI9cXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG5cXHJcXG4vKiDooajljZVcXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG4uY29sLWZvcm0tbGFiZWwge1xcclxcbiAgICBwYWRkaW5nLXRvcDogY2FsYyguMzc1cmVtICsgMXB4KTtcXHJcXG4gICAgcGFkZGluZy1ib3R0b206IGNhbGMoLjM3NXJlbSArIDFweCk7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IDA7XFxyXFxuICAgIGZvbnQtc2l6ZTogaW5oZXJpdDtcXHJcXG4gICAgbGluZS1oZWlnaHQ6IDEuNTtcXHJcXG59XFxyXFxuXFxyXFxuLmlucHV0LWdyb3VwLWFkZG9uIHtcXHJcXG4gIGJvcmRlci1sZWZ0LXdpZHRoOiAwO1xcclxcbiAgYm9yZGVyLXJpZ2h0LXdpZHRoOiAwO1xcclxcbn1cXHJcXG4uaW5wdXQtZ3JvdXAtYWRkb246Zmlyc3QtY2hpbGQge1xcclxcbiAgYm9yZGVyLWxlZnQtd2lkdGg6IDFweDtcXHJcXG59XFxyXFxuLmlucHV0LWdyb3VwLWFkZG9uOmxhc3QtY2hpbGQge1xcclxcbiAgYm9yZGVyLXJpZ2h0LXdpZHRoOiAxcHg7XFxyXFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsInZhciBtYXAgPSB7XG5cdFwiLi9hZlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYWYuanNcIixcblx0XCIuL2FmLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hZi5qc1wiLFxuXHRcIi4vYXJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLmpzXCIsXG5cdFwiLi9hci1kelwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItZHouanNcIixcblx0XCIuL2FyLWR6LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1kei5qc1wiLFxuXHRcIi4vYXIta3dcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWt3LmpzXCIsXG5cdFwiLi9hci1rdy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXIta3cuanNcIixcblx0XCIuL2FyLWx5XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1seS5qc1wiLFxuXHRcIi4vYXItbHkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWx5LmpzXCIsXG5cdFwiLi9hci1tYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItbWEuanNcIixcblx0XCIuL2FyLW1hLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1tYS5qc1wiLFxuXHRcIi4vYXItc2FcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLXNhLmpzXCIsXG5cdFwiLi9hci1zYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItc2EuanNcIixcblx0XCIuL2FyLXRuXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci10bi5qc1wiLFxuXHRcIi4vYXItdG4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLXRuLmpzXCIsXG5cdFwiLi9hci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXIuanNcIixcblx0XCIuL2F6XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hei5qc1wiLFxuXHRcIi4vYXouanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2F6LmpzXCIsXG5cdFwiLi9iZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYmUuanNcIixcblx0XCIuL2JlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iZS5qc1wiLFxuXHRcIi4vYmdcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JnLmpzXCIsXG5cdFwiLi9iZy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYmcuanNcIixcblx0XCIuL2JtXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ibS5qc1wiLFxuXHRcIi4vYm0uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JtLmpzXCIsXG5cdFwiLi9iblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm4uanNcIixcblx0XCIuL2JuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ibi5qc1wiLFxuXHRcIi4vYm9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JvLmpzXCIsXG5cdFwiLi9iby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm8uanNcIixcblx0XCIuL2JyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ici5qc1wiLFxuXHRcIi4vYnIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JyLmpzXCIsXG5cdFwiLi9ic1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYnMuanNcIixcblx0XCIuL2JzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9icy5qc1wiLFxuXHRcIi4vY2FcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2NhLmpzXCIsXG5cdFwiLi9jYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY2EuanNcIixcblx0XCIuL2NzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jcy5qc1wiLFxuXHRcIi4vY3MuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2NzLmpzXCIsXG5cdFwiLi9jdlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3YuanNcIixcblx0XCIuL2N2LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jdi5qc1wiLFxuXHRcIi4vY3lcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2N5LmpzXCIsXG5cdFwiLi9jeS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3kuanNcIixcblx0XCIuL2RhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kYS5qc1wiLFxuXHRcIi4vZGEuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RhLmpzXCIsXG5cdFwiLi9kZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUuanNcIixcblx0XCIuL2RlLWF0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS1hdC5qc1wiLFxuXHRcIi4vZGUtYXQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLWF0LmpzXCIsXG5cdFwiLi9kZS1jaFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUtY2guanNcIixcblx0XCIuL2RlLWNoLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS1jaC5qc1wiLFxuXHRcIi4vZGUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLmpzXCIsXG5cdFwiLi9kdlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZHYuanNcIixcblx0XCIuL2R2LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kdi5qc1wiLFxuXHRcIi4vZWxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VsLmpzXCIsXG5cdFwiLi9lbC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZWwuanNcIixcblx0XCIuL2VuLWF1XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1hdS5qc1wiLFxuXHRcIi4vZW4tYXUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWF1LmpzXCIsXG5cdFwiLi9lbi1jYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tY2EuanNcIixcblx0XCIuL2VuLWNhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1jYS5qc1wiLFxuXHRcIi4vZW4tZ2JcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWdiLmpzXCIsXG5cdFwiLi9lbi1nYi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tZ2IuanNcIixcblx0XCIuL2VuLWllXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1pZS5qc1wiLFxuXHRcIi4vZW4taWUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWllLmpzXCIsXG5cdFwiLi9lbi1pbFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4taWwuanNcIixcblx0XCIuL2VuLWlsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1pbC5qc1wiLFxuXHRcIi4vZW4tbnpcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLW56LmpzXCIsXG5cdFwiLi9lbi1uei5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tbnouanNcIixcblx0XCIuL2VvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lby5qc1wiLFxuXHRcIi4vZW8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VvLmpzXCIsXG5cdFwiLi9lc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMuanNcIixcblx0XCIuL2VzLWRvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy1kby5qc1wiLFxuXHRcIi4vZXMtZG8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLWRvLmpzXCIsXG5cdFwiLi9lcy11c1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMtdXMuanNcIixcblx0XCIuL2VzLXVzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy11cy5qc1wiLFxuXHRcIi4vZXMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLmpzXCIsXG5cdFwiLi9ldFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXQuanNcIixcblx0XCIuL2V0LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ldC5qc1wiLFxuXHRcIi4vZXVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2V1LmpzXCIsXG5cdFwiLi9ldS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXUuanNcIixcblx0XCIuL2ZhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mYS5qc1wiLFxuXHRcIi4vZmEuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZhLmpzXCIsXG5cdFwiLi9maVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZmkuanNcIixcblx0XCIuL2ZpLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9maS5qc1wiLFxuXHRcIi4vZm9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZvLmpzXCIsXG5cdFwiLi9mby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZm8uanNcIixcblx0XCIuL2ZyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci5qc1wiLFxuXHRcIi4vZnItY2FcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLWNhLmpzXCIsXG5cdFwiLi9mci1jYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnItY2EuanNcIixcblx0XCIuL2ZyLWNoXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci1jaC5qc1wiLFxuXHRcIi4vZnItY2guanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLWNoLmpzXCIsXG5cdFwiLi9mci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnIuanNcIixcblx0XCIuL2Z5XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9meS5qc1wiLFxuXHRcIi4vZnkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2Z5LmpzXCIsXG5cdFwiLi9nZFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ2QuanNcIixcblx0XCIuL2dkLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nZC5qc1wiLFxuXHRcIi4vZ2xcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dsLmpzXCIsXG5cdFwiLi9nbC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ2wuanNcIixcblx0XCIuL2dvbS1sYXRuXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nb20tbGF0bi5qc1wiLFxuXHRcIi4vZ29tLWxhdG4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dvbS1sYXRuLmpzXCIsXG5cdFwiLi9ndVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ3UuanNcIixcblx0XCIuL2d1LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ndS5qc1wiLFxuXHRcIi4vaGVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hlLmpzXCIsXG5cdFwiLi9oZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaGUuanNcIixcblx0XCIuL2hpXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oaS5qc1wiLFxuXHRcIi4vaGkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hpLmpzXCIsXG5cdFwiLi9oclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHIuanNcIixcblx0XCIuL2hyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oci5qc1wiLFxuXHRcIi4vaHVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2h1LmpzXCIsXG5cdFwiLi9odS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHUuanNcIixcblx0XCIuL2h5LWFtXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oeS1hbS5qc1wiLFxuXHRcIi4vaHktYW0uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2h5LWFtLmpzXCIsXG5cdFwiLi9pZFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaWQuanNcIixcblx0XCIuL2lkLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pZC5qc1wiLFxuXHRcIi4vaXNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2lzLmpzXCIsXG5cdFwiLi9pcy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaXMuanNcIixcblx0XCIuL2l0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pdC5qc1wiLFxuXHRcIi4vaXQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2l0LmpzXCIsXG5cdFwiLi9qYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvamEuanNcIixcblx0XCIuL2phLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9qYS5qc1wiLFxuXHRcIi4vanZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2p2LmpzXCIsXG5cdFwiLi9qdi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvanYuanNcIixcblx0XCIuL2thXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rYS5qc1wiLFxuXHRcIi4va2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2thLmpzXCIsXG5cdFwiLi9ra1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva2suanNcIixcblx0XCIuL2trLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ray5qc1wiLFxuXHRcIi4va21cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ttLmpzXCIsXG5cdFwiLi9rbS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva20uanNcIixcblx0XCIuL2tuXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rbi5qc1wiLFxuXHRcIi4va24uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2tuLmpzXCIsXG5cdFwiLi9rb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva28uanNcIixcblx0XCIuL2tvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rby5qc1wiLFxuXHRcIi4va3lcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2t5LmpzXCIsXG5cdFwiLi9reS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva3kuanNcIixcblx0XCIuL2xiXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sYi5qc1wiLFxuXHRcIi4vbGIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2xiLmpzXCIsXG5cdFwiLi9sb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbG8uanNcIixcblx0XCIuL2xvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sby5qc1wiLFxuXHRcIi4vbHRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2x0LmpzXCIsXG5cdFwiLi9sdC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbHQuanNcIixcblx0XCIuL2x2XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sdi5qc1wiLFxuXHRcIi4vbHYuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2x2LmpzXCIsXG5cdFwiLi9tZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWUuanNcIixcblx0XCIuL21lLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tZS5qc1wiLFxuXHRcIi4vbWlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21pLmpzXCIsXG5cdFwiLi9taS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWkuanNcIixcblx0XCIuL21rXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tay5qc1wiLFxuXHRcIi4vbWsuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21rLmpzXCIsXG5cdFwiLi9tbFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWwuanNcIixcblx0XCIuL21sLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tbC5qc1wiLFxuXHRcIi4vbW5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21uLmpzXCIsXG5cdFwiLi9tbi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbW4uanNcIixcblx0XCIuL21yXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tci5qc1wiLFxuXHRcIi4vbXIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21yLmpzXCIsXG5cdFwiLi9tc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXMuanNcIixcblx0XCIuL21zLW15XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tcy1teS5qc1wiLFxuXHRcIi4vbXMtbXkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21zLW15LmpzXCIsXG5cdFwiLi9tcy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXMuanNcIixcblx0XCIuL210XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tdC5qc1wiLFxuXHRcIi4vbXQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL210LmpzXCIsXG5cdFwiLi9teVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXkuanNcIixcblx0XCIuL215LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9teS5qc1wiLFxuXHRcIi4vbmJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25iLmpzXCIsXG5cdFwiLi9uYi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmIuanNcIixcblx0XCIuL25lXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9uZS5qc1wiLFxuXHRcIi4vbmUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25lLmpzXCIsXG5cdFwiLi9ubFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmwuanNcIixcblx0XCIuL25sLWJlXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubC1iZS5qc1wiLFxuXHRcIi4vbmwtYmUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25sLWJlLmpzXCIsXG5cdFwiLi9ubC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmwuanNcIixcblx0XCIuL25uXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubi5qc1wiLFxuXHRcIi4vbm4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25uLmpzXCIsXG5cdFwiLi9wYS1pblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcGEtaW4uanNcIixcblx0XCIuL3BhLWluLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wYS1pbi5qc1wiLFxuXHRcIi4vcGxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3BsLmpzXCIsXG5cdFwiLi9wbC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcGwuanNcIixcblx0XCIuL3B0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wdC5qc1wiLFxuXHRcIi4vcHQtYnJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3B0LWJyLmpzXCIsXG5cdFwiLi9wdC1ici5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcHQtYnIuanNcIixcblx0XCIuL3B0LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wdC5qc1wiLFxuXHRcIi4vcm9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3JvLmpzXCIsXG5cdFwiLi9yby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcm8uanNcIixcblx0XCIuL3J1XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ydS5qc1wiLFxuXHRcIi4vcnUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3J1LmpzXCIsXG5cdFwiLi9zZFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2QuanNcIixcblx0XCIuL3NkLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zZC5qc1wiLFxuXHRcIi4vc2VcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NlLmpzXCIsXG5cdFwiLi9zZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2UuanNcIixcblx0XCIuL3NpXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zaS5qc1wiLFxuXHRcIi4vc2kuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NpLmpzXCIsXG5cdFwiLi9za1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2suanNcIixcblx0XCIuL3NrLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zay5qc1wiLFxuXHRcIi4vc2xcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NsLmpzXCIsXG5cdFwiLi9zbC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2wuanNcIixcblx0XCIuL3NxXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zcS5qc1wiLFxuXHRcIi4vc3EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NxLmpzXCIsXG5cdFwiLi9zclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3IuanNcIixcblx0XCIuL3NyLWN5cmxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NyLWN5cmwuanNcIixcblx0XCIuL3NyLWN5cmwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NyLWN5cmwuanNcIixcblx0XCIuL3NyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zci5qc1wiLFxuXHRcIi4vc3NcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NzLmpzXCIsXG5cdFwiLi9zcy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3MuanNcIixcblx0XCIuL3N2XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zdi5qc1wiLFxuXHRcIi4vc3YuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3N2LmpzXCIsXG5cdFwiLi9zd1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3cuanNcIixcblx0XCIuL3N3LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zdy5qc1wiLFxuXHRcIi4vdGFcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RhLmpzXCIsXG5cdFwiLi90YS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGEuanNcIixcblx0XCIuL3RlXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ZS5qc1wiLFxuXHRcIi4vdGUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RlLmpzXCIsXG5cdFwiLi90ZXRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RldC5qc1wiLFxuXHRcIi4vdGV0LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ZXQuanNcIixcblx0XCIuL3RnXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90Zy5qc1wiLFxuXHRcIi4vdGcuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RnLmpzXCIsXG5cdFwiLi90aFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGguanNcIixcblx0XCIuL3RoLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90aC5qc1wiLFxuXHRcIi4vdGwtcGhcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RsLXBoLmpzXCIsXG5cdFwiLi90bC1waC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGwtcGguanNcIixcblx0XCIuL3RsaFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGxoLmpzXCIsXG5cdFwiLi90bGguanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RsaC5qc1wiLFxuXHRcIi4vdHJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RyLmpzXCIsXG5cdFwiLi90ci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHIuanNcIixcblx0XCIuL3R6bFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHpsLmpzXCIsXG5cdFwiLi90emwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3R6bC5qc1wiLFxuXHRcIi4vdHptXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90em0uanNcIixcblx0XCIuL3R6bS1sYXRuXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90em0tbGF0bi5qc1wiLFxuXHRcIi4vdHptLWxhdG4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3R6bS1sYXRuLmpzXCIsXG5cdFwiLi90em0uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3R6bS5qc1wiLFxuXHRcIi4vdWctY25cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VnLWNuLmpzXCIsXG5cdFwiLi91Zy1jbi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdWctY24uanNcIixcblx0XCIuL3VrXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ay5qc1wiLFxuXHRcIi4vdWsuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VrLmpzXCIsXG5cdFwiLi91clwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXIuanNcIixcblx0XCIuL3VyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ci5qc1wiLFxuXHRcIi4vdXpcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3V6LmpzXCIsXG5cdFwiLi91ei1sYXRuXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ei1sYXRuLmpzXCIsXG5cdFwiLi91ei1sYXRuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ei1sYXRuLmpzXCIsXG5cdFwiLi91ei5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXouanNcIixcblx0XCIuL3ZpXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS92aS5qc1wiLFxuXHRcIi4vdmkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3ZpLmpzXCIsXG5cdFwiLi94LXBzZXVkb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUveC1wc2V1ZG8uanNcIixcblx0XCIuL3gtcHNldWRvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS94LXBzZXVkby5qc1wiLFxuXHRcIi4veW9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3lvLmpzXCIsXG5cdFwiLi95by5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUveW8uanNcIixcblx0XCIuL3poLWNuXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC1jbi5qc1wiLFxuXHRcIi4vemgtY24uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLWNuLmpzXCIsXG5cdFwiLi96aC1oa1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtaGsuanNcIixcblx0XCIuL3poLWhrLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC1oay5qc1wiLFxuXHRcIi4vemgtdHdcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLXR3LmpzXCIsXG5cdFwiLi96aC10dy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtdHcuanNcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0dmFyIGlkID0gbWFwW3JlcV07XG5cdGlmKCEoaWQgKyAxKSkgeyAvLyBjaGVjayBmb3IgbnVtYmVyIG9yIHN0cmluZ1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRyZXR1cm4gaWQ7XG59XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlIHN5bmMgcmVjdXJzaXZlIF5cXFxcLlxcXFwvLiokXCI7IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IENhbGVuZGFyIGZyb20gJy4vY29tcG9uZW50cy9DYWxlbmRhci9DYWxlbmRhcic7XHJcbmltcG9ydCBFdmVudFBvcG92ZXIgZnJvbSAnLi9jb21wb25lbnRzL0V2ZW50UG9wb3Zlci9FdmVudFBvcG92ZXInO1xyXG5pbXBvcnQgRXZlbnRNb2RhbCBmcm9tICcuL2NvbXBvbmVudHMvTW9kYWwvRXZlbnRNb2RhbCc7XHJcbmltcG9ydCBFdmVudENyZWF0TW9kYWwgZnJvbSAnLi9jb21wb25lbnRzL01vZGFsL0V2ZW50Q3JlYXRlTW9kYWwnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBpc1Nob3dpbmdFdmVudDogZmFsc2UsXHJcbiAgICAgICAgICAgIGlzRWRpdGluZ0V2ZW50OiBmYWxzZSxcclxuICAgICAgICAgICAgaXNDcmVhdGluZ0V2ZW50OiBmYWxzZSxcclxuICAgICAgICAgICAgY2xpY2tlZEFyZ3M6IG51bGwsXHJcbiAgICAgICAgICAgIGVkaXRpbmdFdmVudDogbnVsbCxcclxuICAgICAgICAgICAgc2VsZWN0ZWRSYW5nZTogbnVsbFxyXG4gICAgICAgIH1cclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuaGFuZGxlRXZlbnRDbGljayA9IHRoaXMuaGFuZGxlRXZlbnRDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlUG9wb3ZlckhpZGUgPSB0aGlzLmhhbmRsZVBvcG92ZXJIaWRlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVTZWxlY3QgPSB0aGlzLmhhbmRsZVNlbGVjdC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlTW9kYWxDbG9zZSA9IHRoaXMuaGFuZGxlTW9kYWxDbG9zZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlRXZlbnRFZGl0ID0gdGhpcy5oYW5kbGVFdmVudEVkaXQuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVFdmVudENsaWNrKCBldmVudCwganNFdmVudCwgdmlldyApIHtcclxuICAgICAgICBjb25zdCBhcmdzID0geyBldmVudCwganNFdmVudCwgdmlldyB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGlzU2hvd2luZ0V2ZW50OiB0cnVlLFxyXG4gICAgICAgICAgICBjbGlja2VkQXJnczogYXJnc1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlUG9wb3ZlckhpZGUoKSB7XHJcbiAgICAgICAgLy/mr4/mrKHlh7rnjrDpg73muLLmn5PkuIDkuKrmlrDnmoRQb3BvdmVyXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGlzU2hvd2luZ0V2ZW50OiBmYWxzZVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlU2VsZWN0KCBzdGFydCwgZW5kLCBqc0V2ZW50LCB2aWV3ICkge1xyXG4gICAgICAgIGNvbnN0IGFyZ3MgPSB7c3RhcnQsIGVuZCwganNFdmVudCwgdmlld307XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGlzQ3JlYXRpbmdFdmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgc2VsZWN0ZWRSYW5nZTogYXJnc1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlRXZlbnRFZGl0KGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGlzRWRpdGluZ0V2ZW50OiB0cnVlLFxyXG4gICAgICAgICAgICBlZGl0aW5nRXZlbnQ6IGV2ZW50XHJcbiAgICAgICAgfSkgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZU1vZGFsQ2xvc2UoKSB7XHJcbiAgICAgICAgLy9UT0RPOiDop6blj5FmdWxsY2FsZW5kYXIgdW5zZWxlY3RcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgaXNFZGl0aW5nRXZlbnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBpc0NyZWF0aW5nRXZlbnQ6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgaWQ9J3dpei10b21hdG8tY2FsZW5kYXInID5cclxuICAgICAgICAgICAgICAgIDxDYWxlbmRhciBrZXk9ezF9IG9uRXZlbnRDbGljayA9IHt0aGlzLmhhbmRsZUV2ZW50Q2xpY2t9IG9uU2VsZWN0PXt0aGlzLmhhbmRsZVNlbGVjdH0vPlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICEhdGhpcy5zdGF0ZS5zZWxlY3RlZFJhbmdlICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxFdmVudENyZWF0TW9kYWwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93PXt0aGlzLnN0YXRlLmlzQ3JlYXRpbmdFdmVudH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uTW9kYWxDbG9zZT17dGhpcy5oYW5kbGVNb2RhbENsb3NlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDcmVhdGluZ0V2ZW50PXt0aGlzLnN0YXRlLmlzQ3JlYXRpbmdFdmVudH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkUmFuZ2U9e3RoaXMuc3RhdGUuc2VsZWN0ZWRSYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmlzU2hvd2luZ0V2ZW50ICYmIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8RXZlbnRQb3BvdmVyIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXt0aGlzLnN0YXRlLmNsaWNrZWRBcmdzLmV2ZW50LmlkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ9e3RoaXMuc3RhdGUuY2xpY2tlZEFyZ3MuZXZlbnR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZlcmVuY2U9e3RoaXMuc3RhdGUuY2xpY2tlZEFyZ3MuanNFdmVudC50YXJnZXR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkVkaXRCdG5DbGljaz17dGhpcy5oYW5kbGVFdmVudEVkaXR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblBvcG92ZXJIaWRlPXt0aGlzLmhhbmRsZVBvcG92ZXJIaWRlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPiBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL0NhbGVuZGFyLmNzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9DYWxlbmRhci5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL0NhbGVuZGFyLmNzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgRnVsbENhbGVuZGFyIGZyb20gJy4vRnVsbENhbGVuZGFyJztcclxuaW1wb3J0ICdmdWxsY2FsZW5kYXItcmVhY3R3cmFwcGVyL2Rpc3QvY3NzL2Z1bGxjYWxlbmRhci5taW4uY3NzJztcclxuaW1wb3J0ICcuL0NhbGVuZGFyLmNzcyc7XHJcbmltcG9ydCBXaXpFdmVudERhdGFMb2FkZXIgZnJvbSAnLi4vLi4vbW9kZWxzL1dpekV2ZW50RGF0YUxvYWRlcidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbGVuZGFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGV2ZW50czogW11cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kYXRhTG9hZGVyID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNhbGVuZGFyID0gbnVsbDtcclxuICAgICAgICAvL+e7keWumuWPpeafhFxyXG4gICAgICAgIHRoaXMuaGFuZGxlRnVsbENhbGVuZGFyUmVuZGVyID0gdGhpcy5oYW5kbGVGdWxsQ2FsZW5kYXJSZW5kZXIuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLm9uVmlld1JlbmRlciA9IHRoaXMub25WaWV3UmVuZGVyLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5vbkV2ZW50UmVuZGVyID0gdGhpcy5vbkV2ZW50UmVuZGVyLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5vbkV2ZW50RHJvcCA9IHRoaXMub25FdmVudERyb3AuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLm9uRXZlbnRSZXNpemUgPSB0aGlzLm9uRXZlbnRSZXNpemUuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDkuovku7blj6Xmn4RcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIGhhbmRsZUZ1bGxDYWxlbmRhclJlbmRlcihlbCkge1xyXG4gICAgICAgIC8vIEZ1bGxDYWxlbmRhciDmuLLmn5PkuYvliY3miafooYzmraTlj6Xmn4TvvIzkvKDlhaVET01cclxuICAgICAgICB0aGlzLmNhbGVuZGFyID0gZWw7XHJcbiAgICAgICAgdGhpcy5kYXRhTG9hZGVyID0gbmV3IFdpekV2ZW50RGF0YUxvYWRlcih0aGlzLmNhbGVuZGFyKTtcclxuICAgIH1cclxuXHJcbiAgICBvblZpZXdSZW5kZXIoIHZpZXcsIGVsZW1lbnQgKSB7XHJcbiAgICAgICAgLy8g5Yi35paw6KeG5Zu+77yM6YeN5paw6I635Y+W5pel5Y6G5LqL5Lu2XHJcbiAgICAgICAgY29uc3QgJGNhbGVuZGFyID0gJCh0aGlzLmNhbGVuZGFyKTtcclxuICAgICAgICBjb25zdCBldmVudFNvdXJjZXMgPSB0aGlzLmRhdGFMb2FkZXIuZ2V0RXZlbnRTb3VyY2VzKCB2aWV3LCBlbGVtZW50ICk7XHJcbiAgICAgICAgJGNhbGVuZGFyLmZ1bGxDYWxlbmRhcigncmVtb3ZlRXZlbnRzJyk7XHJcbiAgICAgICAgZm9yIChsZXQgaT0wIDsgaSA8IGV2ZW50U291cmNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAkY2FsZW5kYXIuZnVsbENhbGVuZGFyKCdhZGRFdmVudFNvdXJjZScsIGV2ZW50U291cmNlc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRXZlbnREcm9wKCBldmVudCwgZGVsdGEsIHJldmVydEZ1bmMsIGpzRXZlbnQsIHVpLCB2aWV3ICkge1xyXG4gICAgICAgIGlmIChldmVudC5pZCl7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YUxvYWRlci51cGRhdGVFdmVudERhdGFPbkRyb3AoZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXZlcnRGdW5jKCk7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgb25FdmVudFJlc2l6ZSggZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldyApIHtcclxuICAgICAgICBpZiAoZXZlbnQuaWQpe1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFMb2FkZXIudXBkYXRlRXZlbnREYXRhT25SZXNpemUoZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV2ZXJ0RnVuYygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkV2ZW50UmVuZGVyKCBldmVudE9iaiwgJGVsICkge1xyXG4gICAgICAgIC8vIOiuvue9ruaWh+acrOminOiJslxyXG4gICAgICAgIGNvbnN0IHJnYlN0cmluZyA9ICRlbC5jc3MoJ2JhY2tncm91bmQtY29sb3InKTtcclxuICAgICAgICBjb25zdCByZ2JBcnJheSA9IC9ecmdiXFwoKFxcZCopLCAoXFxkKiksIChcXGQqKVxcKSQvLmV4ZWMocmdiU3RyaW5nKTtcclxuICAgICAgICBpZiAocmdiQXJyYXkpIHtcclxuICAgICAgICAgICAgY29uc3QgaHNsID0gcmdiMmhzbChyZ2JBcnJheVsxXSwgcmdiQXJyYXlbMl0sIHJnYkFycmF5WzNdKTtcclxuICAgICAgICAgICAgY29uc3QgbGlnaHRuZXNzID0gaHNsWzJdIC0gTWF0aC5jb3MoIChoc2xbMF0rNzApIC8gMTgwKk1hdGguUEkgKSAqIDAuMTU7XHJcbiAgICAgICAgICAgIGNvbnN0IHRleHRDb2xvciA9IGxpZ2h0bmVzcyA+IDAuNSA/ICcjMjIyJyA6ICd3aGl0ZSc7XHJcbiAgICAgICAgICAgICRlbC5jc3MoJ2NvbG9yJywgdGV4dENvbG9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5YWD57Sg5bey57uP5riy5p+T77yM5Y+v5L+u5pS55YWD57SgXHJcbiAgICAgICAgY29uc3QgaXNDb21wbGV0ZSA9IHBhcnNlSW50KGV2ZW50T2JqLmNvbXBsZXRlKSA9PSA1O1xyXG4gICAgICAgIGlmICggaXNDb21wbGV0ZSApIHtcclxuICAgICAgICAgICAgLy8g5qC35byPXHJcbiAgICAgICAgICAgICRlbC5hZGRDbGFzcygndGMtY29tcGxldGUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiBcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDorr7nva7kuovku7blj6Xmn4RcclxuICAgICAgICAgKiDlm6DkuLpmdWxsY2FsZW5kYXItcmVhY3RXcmFwcGVy55qE5a6e546w5piv55u05o6l6L+U5ZuePGRpdiBpZD0nZnVsbGNhbGVuZGFyJz48L2Rpdj5cclxuICAgICAgICAgKiDlubbkuJTosIPnlKgkKCcjZnVsbGNhbGVuZGFyJykuZnVsbGNhbGVuZGFyKHRoaXMucHJvcHMp6L+b6KGM5p6E5bu677yM5Zug5q2kUmVhY3TlubbmsqHmnIlcclxuICAgICAgICAgKiDnrqHnkIZGdWxsQ2FsZW5kYXLnirbmgIHlkozmuLLmn5PnmoTog73lipvjgILmiYDku6Xnm7TmjqXlnKjorr7nva7kuK3lgZrlpb1jYWxsYmFja++8jOiuqeaPkuS7tuiHquaIkeeuoeeQhuOAglxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJjYWxlbmRhci1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgIDxGdWxsQ2FsZW5kYXIgb25GdWxsQ2FsZW5kYXJSZW5kZXIgPSB7dGhpcy5oYW5kbGVGdWxsQ2FsZW5kYXJSZW5kZXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5Z+65pys6YWN572uXHJcbiAgICAgICAgICAgICAgICAgICAgaWQgPSBcImNhbGVuZGFyXCJcclxuICAgICAgICAgICAgICAgICAgICB0aGVtZVN5c3RlbSA9ICdzdGFuZGFyZCdcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQgPSAncGFyZW50J1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlciA9IHt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6ICdwcmV2LG5leHQsdG9kYXknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjZW50ZXI6ICd0aXRsZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAnbW9udGgsYWdlbmRhV2VlayxhZ2VuZGFEYXksbGlzdFdlZWsnXHJcbiAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAvLyDkuK3mlofljJZcclxuICAgICAgICAgICAgICAgICAgICBidXR0b25UZXh0ID0ge3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9kYXk6ICfku4rlpKknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aDogJ+aciCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlZWs6ICflkagnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXk6ICfml6UnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0OiAn6KGoJ1xyXG4gICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgbW9udGhOYW1lcyA9IHtbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcx5pyIJywgJzLmnIgnLCAnM+aciCcsICc05pyIJywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc15pyIJywgJzbmnIgnLCAnN+aciCcsICc45pyIJywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc55pyIJywgJzEw5pyIJywgJzEx5pyIJywgJzEy5pyIJ1xyXG4gICAgICAgICAgICAgICAgICAgIF19XHJcbiAgICAgICAgICAgICAgICAgICAgbW9udGhOYW1lc1Nob3J0ID0ge1tcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzHmnIgnLCAnMuaciCcsICcz5pyIJywgJzTmnIgnLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzXmnIgnLCAnNuaciCcsICc35pyIJywgJzjmnIgnLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgJznmnIgnLCAnMTDmnIgnLCAnMTHmnIgnLCAnMTLmnIgnXHJcbiAgICAgICAgICAgICAgICAgICAgXX1cclxuICAgICAgICAgICAgICAgICAgICBkYXlOYW1lcyA9IHtbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICflkajml6UnLCAn5ZGo5LiAJywgJ+WRqOS6jCcsICflkajkuIknLCAn5ZGo5ZubJywgJ+WRqOS6lCcsICflkajlha0nXHJcbiAgICAgICAgICAgICAgICAgICAgXX1cclxuICAgICAgICAgICAgICAgICAgICBkYXlOYW1lc1Nob3J0ID0ge1tcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ+WRqOaXpScsICflkajkuIAnLCAn5ZGo5LqMJywgJ+WRqOS4iScsICflkajlm5snLCAn5ZGo5LqUJywgJ+WRqOWFrSdcclxuICAgICAgICAgICAgICAgICAgICBdfVxyXG4gICAgICAgICAgICAgICAgICAgIGFsbERheVRleHQgPSAn5YWo5aSpJ1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOiuvue9ruinhuWbvlxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWaWV3ID0gJ2FnZW5kYVdlZWsnXHJcbiAgICAgICAgICAgICAgICAgICAgbm93SW5kaWNhdG9yID0ge3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3REYXkgPSB7MX1cclxuICAgICAgICAgICAgICAgICAgICB2aWV3cyA9IHt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFnZW5kYToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluVGltZTogXCIwODowMDowMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xvdExhYmVsRm9ybWF0OiAnaCg6bW0pIGEnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgbmF2TGlua3M9IHt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgIGFsbERheURlZmF1bHQgPSB7ZmFsc2V9XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRMaW1pdD0ge3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6K6+572u5LqL5Lu2XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0YWJsZSA9IHt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdEhlbHBlciA9IHt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRhYmxlID0ge3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yY2VFdmVudER1cmF0aW9uID0ge3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6K6+572uVUlcclxuICAgICAgICAgICAgICAgICAgICB1bnNlbGVjdENhbmNlbCA9ICcubW9kYWwgKidcclxuICAgICAgICAgICAgICAgICAgICBkcmFnT3BhY2l0eSA9IHt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibW9udGhcIjogLjUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWdlbmRhV2Vla1wiOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFnZW5kYURheVwiOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAvLyDorr7nva7lj6Xmn4RcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3QgPSB7dGhpcy5wcm9wcy5vblNlbGVjdH1cclxuICAgICAgICAgICAgICAgICAgICB2aWV3UmVuZGVyID0ge3RoaXMub25WaWV3UmVuZGVyfVxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50UmVuZGVyID0ge3RoaXMub25FdmVudFJlbmRlcn1cclxuICAgICAgICAgICAgICAgICAgICBldmVudENsaWNrID0ge3RoaXMucHJvcHMub25FdmVudENsaWNrfVxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50RHJvcCA9IHt0aGlzLm9uRXZlbnREcm9wfVxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50UmVzaXplID0ge3RoaXMub25FdmVudFJlc2l6ZX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJnYjJoc2wociwgZywgYikge1xyXG4gICAgciAvPSAyNTU7IGcgLz0gMjU1OyBiIC89IDI1NTtcclxuXHJcbiAgICB2YXIgTSA9IE1hdGgubWF4KHIsIGcsIGIpO1xyXG4gICAgdmFyIG0gPSBNYXRoLm1pbihyLCBnLCBiKTtcclxuICAgIHZhciBDID0gTSAtIG07XHJcbiAgICB2YXIgTCA9IDAuNSooTSArIG0pO1xyXG4gICAgdmFyIFMgPSAoQyA9PT0gMCkgPyAwIDogQy8oMS1NYXRoLmFicygyKkwtMSkpO1xyXG5cclxuICAgIHZhciBoO1xyXG4gICAgaWYgKEMgPT09IDApIGggPSAwOyAvLyBzcGVjJ2QgYXMgdW5kZWZpbmVkLCBidXQgdXN1YWxseSBzZXQgdG8gMFxyXG4gICAgZWxzZSBpZiAoTSA9PT0gcikgaCA9ICgoZy1iKS9DKSAlIDY7XHJcbiAgICBlbHNlIGlmIChNID09PSBnKSBoID0gKChiLXIpL0MpICsgMjtcclxuICAgIGVsc2UgaWYgKE0gPT09IGIpIGggPSAoKHItZykvQykgKyA0O1xyXG5cclxuICAgIHZhciBIID0gNjAgKiBoO1xyXG5cclxuICAgIC8vIOWIhuWIq+aYr2h1ZSwgc2F0LCBsdW1cclxuICAgIHJldHVybiBbSCwgcGFyc2VGbG9hdChTKSwgcGFyc2VGbG9hdChMKV07XHJcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgJCBmcm9tIFwianF1ZXJ5XCI7XHJcbmltcG9ydCBmdWxsQ2FsZW5kYXIgZnJvbSBcImZ1bGxjYWxlbmRhclwiO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcblxyXG5jbGFzcyBGdWxsY2FsZW5kYXJPYmplY3RNYXBwZXJ7XHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHJcblx0fVxyXG5cclxuXHRnZXRTZXR0aW5ncyhwcm9wZXJ0aWVzKXtcclxuXHRcdGxldCBuZXdTZXR0aW5ncyA9IHt9O1xyXG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gcHJvcGVydGllcykge1xyXG4gICAgICBcdFx0aWYgKHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgIFx0XHRuZXdTZXR0aW5nc1trZXldID0gcHJvcGVydGllc1trZXldO1xyXG4gICAgICBcdFx0fVxyXG4gICAgXHR9XHJcbiAgICBcdHJldHVybiBuZXdTZXR0aW5ncztcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZ1bGxDYWxlbmRhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMuanEgPSAkLm5vQ29uZmxpY3QoKTtcclxuXHRcdHRoaXMuZnVsbGNhbGVuZGFyT2JqZWN0TWFwcGVyID0gbmV3IEZ1bGxjYWxlbmRhck9iamVjdE1hcHBlcigpO1xyXG5cdFx0dGhpcy5pbnN0YW5jZSA9IG51bGw7XHJcblx0XHR0aGlzLmRhdGUgPSBuZXcgRGF0ZSgpO1xyXG5cdH1cclxuXHJcblx0Y29tcG9uZW50RGlkTW91bnQoKXtcclxuXHRcdHRoaXMucHJvcHMub25GdWxsQ2FsZW5kYXJSZW5kZXIodGhpcy5lbCk7XHJcblx0XHRjb25zdCBvYmplY3RNYXBwZXJTZXR0aW5ncyA9IHRoaXMuZnVsbGNhbGVuZGFyT2JqZWN0TWFwcGVyLmdldFNldHRpbmdzKHRoaXMucHJvcHMpO1xyXG5cdFx0dGhpcy5pbnN0YW5jZSA9IHRoaXMuanEodGhpcy5lbCkuZnVsbENhbGVuZGFyKG9iamVjdE1hcHBlclNldHRpbmdzKTtcclxuXHR9XHJcblxyXG4gIFx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xyXG5cdFx0ICBcclxuXHR9XHJcblxyXG5cdHJlbmRlcigpe1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgaWQ9J2NhbGVuZGFyJyByZWY9eyBlbCA9PiB0aGlzLmVsID0gZWwgfT48L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9FdmVudFBvcG92ZXIuY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL0V2ZW50UG9wb3Zlci5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL0V2ZW50UG9wb3Zlci5jc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgJy4vRXZlbnRQb3BvdmVyLmNzcyc7XHJcbmltcG9ydCBQb3BwZXIgZnJvbSAncG9wcGVyLmpzJztcclxuaW1wb3J0IFBvcG92ZXJUaXRsZUlucHV0IGZyb20gJy4vUG9wb3ZlclRpdGxlSW5wdXQnO1xyXG5pbXBvcnQgUG9wb3ZlclRvb2xiYXIgZnJvbSAnLi9Qb3BvdmVyVG9vbGJhcic7XHJcbmltcG9ydCBFdmVudEhhbmRsZXMgZnJvbSAnLi4vLi4vbW9kZWxzL0V2ZW50SGFuZGxlcyc7XHJcbmltcG9ydCB7IEZvcm0sIEdseXBoaWNvbiB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcbmltcG9ydCBEYXRlVGltZVBpY2tlckdyb3VwIGZyb20gJy4uL0Zvcm0vRGF0ZVRpbWVQaWNrZXJHcm91cCc7XHJcbmltcG9ydCBDb2xvclBpY2tlckdyb3VwIGZyb20gJy4uL0Zvcm0vQ29sb3JQaWNrZXJHcm91cCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudFBvcG92ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5wb3BwZXJOb2RlID0gbnVsbDtcclxuICAgICAgICB0aGlzLnBvcHBlckluc3RhbmNlID0gbnVsbDtcclxuICAgICAgICB0aGlzLmV2ZW50SGFuZGxlcyA9IG5ldyBFdmVudEhhbmRsZXMoKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIG5ld0V2ZW50RGF0YToge31cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g57uR5a6a5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5hdXRvSGlkZSA9IHRoaXMuYXV0b0hpZGUuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZURhdGVUaW1lQ2hhbmdlID0gdGhpcy5oYW5kbGVEYXRlVGltZUNoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlVGl0bGVDaGFuZ2UgPSB0aGlzLmhhbmRsZVRpdGxlQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVDb2xvckNoYW5nZSA9IHRoaXMuaGFuZGxlQ29sb3JDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUJ0bkNsaWNrID0gdGhpcy5oYW5kbGVCdG5DbGljay5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOWKqOeUu+aViOaenFxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgYXV0b0hpZGUoZSkge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgLy8g5LiN5piv5pel5Y6G5LqL5Lu25YWD57SgXHJcbiAgICAgICAgICAgICEkKHRoaXMucHJvcHMucmVmZXJlbmNlKS5pcyhlLnRhcmdldCkgJiZcclxuICAgICAgICAgICAgLy8g5Lmf5LiN5piv5a2Q5YWD57SgXHJcbiAgICAgICAgICAgICQodGhpcy5wcm9wcy5yZWZlcmVuY2UpLmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwICYmXHJcbiAgICAgICAgICAgIC8vIOS4jeaYr3BvcHBlcuWFg+e0oFxyXG4gICAgICAgICAgICAhJCh0aGlzLnBvcHBlck5vZGUpLmlzKGUudGFyZ2V0KSAmJlxyXG4gICAgICAgICAgICAvLyDkuZ/kuI3mmK/lrZDlhYPntKBcclxuICAgICAgICAgICAgJCh0aGlzLnBvcHBlck5vZGUpLmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoaWRlKCkge1xyXG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xyXG4gICAgICAgICAgICAkKHRoYXQucG9wcGVyTm9kZSkuaGlkZSgwLCBudWxsLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgdGhhdC5wcm9wcy5vblBvcG92ZXJIaWRlKCk7IC8vVE9ETzog5Lqk55Sx54i25YWD57Sg5Y246L296K+l57uE5Lu25a6e5L6L77yM5oSf6KeJ6L+Z6YeM5LiN5aalXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc2hvdygpIHtcclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcclxuICAgICAgICAgICAgJCh0aGF0LnBvcHBlck5vZGUpLmZhZGVJbigzNTAsIG51bGwsIHJlc29sdmUpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8g5LqL5Lu25Y+l5p+EXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICBoYW5kbGVUaXRsZUNoYW5nZShlKSB7XHJcbiAgICAgICAgLy/lgqjlrZjliLDlsIbmlrDnmoTlgLzlgqjlrZhuZXdFdmVudERhdGHph4zvvIzlvZPkv53lrZjml7bmo4DntKJuZXdFdmVudERhdGHliJfooahcclxuICAgICAgICBjb25zdCBuZXdUaXRsZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoZnVuY3Rpb24ocHJldlN0YXRlLCBwcm9wcykge1xyXG4gICAgICAgICAgICAvL+aLt+i0neWJjeS4gOS4quWvueixoVxyXG4gICAgICAgICAgICBjb25zdCBuZXdFdmVudERhdGEgPSBPYmplY3QuY3JlYXRlKHByZXZTdGF0ZS5uZXdFdmVudERhdGEpO1xyXG4gICAgICAgICAgICBuZXdFdmVudERhdGEudGl0bGUgPSBuZXdUaXRsZTtcclxuICAgICAgICAgICAgcmV0dXJuIHsgbmV3RXZlbnREYXRhIH07XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDb2xvckNoYW5nZShjb2xvclZhbHVlKSB7XHJcbiAgICAgICAgY29uc3QgbmV3Q29sb3IgPSBjb2xvclZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoZnVuY3Rpb24ocHJldlN0YXRlLCBwcm9wcykge1xyXG4gICAgICAgICAgICAvL+aLt+i0neWJjeS4gOS4quWvueixoVxyXG4gICAgICAgICAgICBjb25zdCBuZXdFdmVudERhdGEgPSBPYmplY3QuY3JlYXRlKHByZXZTdGF0ZS5uZXdFdmVudERhdGEpO1xyXG4gICAgICAgICAgICBuZXdFdmVudERhdGEuYmFja2dyb3VuZENvbG9yID0gbmV3Q29sb3I7XHJcbiAgICAgICAgICAgIHJldHVybiB7IG5ld0V2ZW50RGF0YSB9O1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlRGF0ZVRpbWVDaGFuZ2UoZSkge1xyXG4gICAgICAgIC8v5pqC5pe25LiN5YWB6K645pu05pS5XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQnRuQ2xpY2soZSkge1xyXG4gICAgICAgIGNvbnN0IGlkID0gZS50YXJnZXQuaWQ7XHJcbiAgICAgICAgY29uc3QgYnRuVHlwZSA9IGlkLnNwbGl0KCctJylbMl07XHJcbiAgICAgICAgY29uc3QgaGFuZGxlTmFtZSA9IGBvbiR7YnRuVHlwZX1CdG5DbGlja2BcclxuICAgICAgICB0aGlzLmhpZGUoKS50aGVuKCAocmV0KSA9PiB7XHJcbiAgICAgICAgICAgIHN3aXRjaChoYW5kbGVOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdvbkVkaXRCdG5DbGljayc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkVkaXRCdG5DbGljayh0aGlzLnByb3BzLmV2ZW50KTsgLy/kuqTnlLHniLblhYPntKBcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudEhhbmRsZXNbaGFuZGxlTmFtZV0odGhpcy5wcm9wcy5ldmVudCwgdGhpcy5zdGF0ZS5uZXdFdmVudERhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyDnlJ/lkb3lkajmnJ9cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIC8vIOWIneWni+WMlue7hOS7tlxyXG4gICAgICAgIHRoaXMucG9wcGVySW5zdGFuY2UgPSBuZXcgUG9wcGVyKHRoaXMucHJvcHMucmVmZXJlbmNlLCB0aGlzLnBvcHBlck5vZGUsIHtcclxuXHRcdFx0cGxhY2VtZW50OiAnYXV0bycsXHJcblx0XHRcdG1vZGlmaWVyczoge1xyXG5cdFx0XHRcdGFycm93OiB7XHJcblx0XHRcdFx0ICBlbGVtZW50OiAnLmFycm93J1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdH0pO1xyXG4gICAgICAgIC8vIOiuvue9ruiHquWKqOmakOiXj1xyXG4gICAgICAgICQoZG9jdW1lbnQpLm9mZignY2xpY2snLCB0aGlzLmF1dG9IaWRlKS5vbignY2xpY2snLCB0aGlzLmF1dG9IaWRlKTtcclxuICAgICAgICAvLyDmmL7npLpcclxuICAgICAgICB0aGlzLnNob3coKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUsIHNuYXBzaG90KSB7XHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLnNob3coKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcclxuICAgICAgICAvLyDlvZPmm7TmlrDlsZ7mgKfml7bmiY3op6blj5HliqjnlLvmlYjmnpxcclxuICAgICAgICBpZiAoIG5leHRQcm9wcyAhPSB0aGlzLnByb3BzICkge1xyXG4gICAgICAgICAgICAvLyDorr7nva7mm7TmlrDml7bnmoTliqjnlLtcclxuICAgICAgICAgICAgdGhpcy5oaWRlKCkudGhlbiggKHJldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy/mm7TmlrDlrprkvY1cclxuICAgICAgICAgICAgICAgIHRoaXMucG9wcGVySW5zdGFuY2UucmVmZXJlbmNlID0gbmV4dFByb3BzLnJlZmVyZW5jZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9wcGVySW5zdGFuY2UudXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ2NsaWNrJywgdGhpcy5hdXRvSGlkZSk7XHJcbiAgICAgICAgdGhpcy5wb3BwZXJJbnN0YW5jZS5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IGV2ZW50U3RhcnQgPSB0aGlzLnByb3BzLmV2ZW50LnN0YXJ0LmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG4gICAgICAgIGNvbnN0IGNvbG9yVmFsdWUgPSB0aGlzLnByb3BzLmV2ZW50LmJhY2tncm91bmRDb2xvcjtcclxuICAgICAgICBjb25zdCBlbmFibGVTYXZlQnRuID0gISF0aGlzLnN0YXRlLm5ld0V2ZW50RGF0YS50aXRsZSB8fCAhIXRoaXMuc3RhdGUubmV3RXZlbnREYXRhLmJhY2tncm91bmRDb2xvcjtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRjLXBvcG92ZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7ZGlzcGxheTogJ25vbmUnfX1cclxuICAgICAgICAgICAgICAgICAgICByZWY9eyhkaXYpID0+IHRoaXMucG9wcGVyTm9kZSA9IGRpdn0gPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhcnJvd1wiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0Yy1wb3BvdmVyLWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxQb3BvdmVyVGl0bGVJbnB1dCBcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXt0aGlzLnByb3BzLmV2ZW50LmlkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudFRpdGxlPXt0aGlzLnByb3BzLmV2ZW50LnRpdGxlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvblRpdGxlQ2hhbmdlPXt0aGlzLmhhbmRsZVRpdGxlQ2hhbmdlfSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Rm9ybT0ndGMtcG9wb3Zlci1ldmVudC1lZGl0Rm9ybScgLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0Yy1wb3BvdmVyLWJvZHlcIj5cclxuICAgICAgICAgICAgICAgICAgICA8Rm9ybSBob3Jpem9udGFsIGlkPSd0Yy1wb3BvdmVyLWV2ZW50LWVkaXRGb3JtJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPERhdGVUaW1lUGlja2VyR3JvdXAgaG9yaXpvbnRhbCByZWFkT25seSBpZCA9ICd0Yy1lZGl0cG9wcGVyLWV2ZW50ZGF0ZScgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD17PGkgY2xhc3NOYW1lPSdmYXIgZmEtY2FsZW5kYXItYWx0IGZhLWxnJyAvPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtldmVudFN0YXJ0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25EYXRlVGltZUNoYW5nZT17dGhpcy5oYW5kbGVEYXRlVGltZUNoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbG9yUGlja2VyR3JvdXAgaG9yaXpvbnRhbCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17dGhpcy5wcm9wcy5ldmVudC5pZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPSd0Yy1lZGl0cG9wcGVyLWV2ZW50Y29sb3InIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9ezxpIGNsYXNzTmFtZT0nZmFzIGZhLXBhaW50LWJydXNoIGZhLWxnJyAvPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtjb2xvclZhbHVlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Db2xvckNoYW5nZT17dGhpcy5oYW5kbGVDb2xvckNoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L0Zvcm0+XHJcbiAgICAgICAgICAgICAgICAgICAgPFBvcG92ZXJUb29sYmFyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlPXt0aGlzLnByb3BzLmV2ZW50LmNvbXBsZXRlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVTYXZlQnRuPXtlbmFibGVTYXZlQnRufVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkJ0bkNsaWNrPXt0aGlzLmhhbmRsZUJ0bkNsaWNrfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL1BvcG92ZXJUaXRsZUlucHV0LmNzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9Qb3BvdmVyVGl0bGVJbnB1dC5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL1BvcG92ZXJUaXRsZUlucHV0LmNzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAnLi9Qb3BvdmVyVGl0bGVJbnB1dC5jc3MnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRUaXRsZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICAvL+WIneWni+WMlueKtuaAgVxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLmV2ZW50VGl0bGVcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZSA9IHRoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQ2hhbmdlKGUpIHtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBlLnRhcmdldC52YWx1ZX0pXHJcbiAgICAgICAgLy/lsIbkuovku7bkvKDpgJLkuIrljrtcclxuICAgICAgICB0aGlzLnByb3BzLm9uVGl0bGVDaGFuZ2UoZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwidGMtZWRpdHBvcHBlci1ldmVudHRpdGxlXCIgXHJcbiAgICAgICAgICAgICAgICBodG1sRm9yPXt0aGlzLnByb3BzLnRhcmdldEZvcm19XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9J2V2ZW50dGl0bGUnXHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCB7IEJ1dHRvbiwgQnV0dG9uR3JvdXAsIEJ1dHRvblRvb2xiYXIsIFNwbGl0QnV0dG9uLCBEcm9wZG93bkJ1dHRvbiwgTWVudUl0ZW0gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wb3ZlclRvb2xiYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxCdXR0b25Ub29sYmFyPlxyXG4gICAgICAgICAgICAgICAgPEJ1dHRvbkdyb3VwPlxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b24gaWQ9J3RjLWVkaXRwb3BwZXItU2F2ZScgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25CdG5DbGlja31cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyF0aGlzLnByb3BzLmVuYWJsZVNhdmVCdG59PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICDkv53lrZhcclxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGlkPSd0Yy1lZGl0cG9wcGVyLUNvbXBsZXRlJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQnRuQ2xpY2t9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7cGFyc2VJbnQodGhpcy5wcm9wcy5jb21wbGV0ZSkgPT0gNSA/ICfmgaLlpI0nIDogJ+WujOaIkCd9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBpZD0ndGMtZWRpdHBvcHBlci1FZGl0J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQnRuQ2xpY2t9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICDnvJbovpFcclxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8U3BsaXRCdXR0b24gcHVsbFJpZ2h0IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT0n5Yig6ZmkJyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ9J3RjLWVkaXRwb3BwZXItRGVsZXRlRGF0YScgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25CdG5DbGlja30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxNZW51SXRlbSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50S2V5PVwiMVwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9J3RjLWVkaXRwb3BwZXItT3BlbkRvYydcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25CdG5DbGlja30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICDmiZPlvIDmupDmlofmoaNcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9NZW51SXRlbT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPE1lbnVJdGVtIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRLZXk9XCIyXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD0ndGMtZWRpdHBvcHBlci1EZWxldGVEb2MnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQnRuQ2xpY2t9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAg5Yig6Zmk5rqQ5paH5qGjXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTWVudUl0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9TcGxpdEJ1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvQnV0dG9uR3JvdXA+XHJcbiAgICAgICAgICAgIDwvQnV0dG9uVG9vbGJhcj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIENvbnRyb2xMYWJlbCwgQ29sfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXV0b0Zvcm1Hcm91cCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IGlzSG9yaXpvbnRhbCA9IHRoaXMucHJvcHMuaG9yaXpvbnRhbDtcclxuICAgICAgICBpZiAoaXNIb3Jpem9udGFsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8Rm9ybUdyb3VwIGNvbnRyb2xJZD17dGhpcy5wcm9wcy5jb250cm9sSWR9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxDb2wgY29tcG9uZW50Q2xhc3M9e0NvbnRyb2xMYWJlbH0gc209ezJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJlbH1cclxuICAgICAgICAgICAgICAgICAgICA8L0NvbD5cclxuICAgICAgICAgICAgICAgICAgICA8Q29sIHNtPXsxMH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG4gICAgICAgICAgICAgICAgICAgIDwvQ29sPlxyXG4gICAgICAgICAgICAgICAgPC9Gb3JtR3JvdXA+XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPEZvcm1Hcm91cCBjb250cm9sSWQ9e3RoaXMucHJvcHMuY29udHJvbElkfT5cclxuICAgICAgICAgICAgICAgICAgICA8Q29udHJvbExhYmVsPnt0aGlzLnByb3BzLmxhYmVsfTwvQ29udHJvbExhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG4gICAgICAgICAgICAgICAgPC9Gb3JtR3JvdXA+ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBBdXRvRm9ybUdyb3VwIGZyb20gJy4vQXV0b0Zvcm1Hcm91cCc7XHJcbmNvbnN0IEh1ZWJlZSA9IHJlcXVpcmUoJ2h1ZWJlZS9kaXN0L2h1ZWJlZS5wa2dkJyk7IFxyXG5pbXBvcnQgJ2h1ZWJlZS9kaXN0L2h1ZWJlZS5jc3MnO1xyXG5cclxuY2xhc3MgQ29sb3JJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5wcm9wcy52YWx1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZSA9IHRoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQ2hhbmdlKGpzRXZlbnRPclZhbHVlKSB7XHJcbiAgICAgICAgbGV0IG5ld0NvbG9yVmFsdWU7XHJcbiAgICAgICAgaWYgKCB0eXBlb2YganNFdmVudE9yVmFsdWUgPT0gJ29iamVjdCcgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBqc0V2ZW50T3JWYWx1ZS50YXJnZXQudmFsdWV9KTtcclxuICAgICAgICAgICAgbmV3Q29sb3JWYWx1ZSA9IGpzRXZlbnRPclZhbHVlLnRhcmdldC52YWx1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKCB0eXBlb2YganNFdmVudE9yVmFsdWUgPT0gJ3N0cmluZycgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBqc0V2ZW50T3JWYWx1ZX0pO1xyXG4gICAgICAgICAgICBuZXdDb2xvclZhbHVlID0ganNFdmVudE9yVmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucHJvcHMub25Db2xvckNoYW5nZShuZXdDb2xvclZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvL1RPRE86IOagueaNrumlseWSjOW6puiuoeeul+Wtl+S9k+minOiJslxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIC8vIOWIneWni+WMlue7hOS7tlxyXG4gICAgICAgIHRoaXMuaHVlYmVlSW5zdGFuY2UgPSBuZXcgSHVlYmVlKHRoaXMuZWwsIHtcclxuICAgICAgICAgICAgc3RhdGljT3BlbjogZmFsc2UsIC8vIERpc3BsYXlzIG9wZW4gYW5kIHN0YXlzIG9wZW4uIFxyXG4gICAgICAgICAgICBzZXRUZXh0OiB0cnVlLCAvLyBTZXRzIGVsZW1lbnRz4oCZIHRleHQgdG8gY29sb3IuIOWwhuWOn+Wni+eahOaWh+acrOiuvue9ruiuvue9ruaIkOminOiJsuWAvC5cclxuICAgICAgICAgICAgc2V0QkdDb2xvcjogdHJ1ZSwgLy8gU2V0cyBlbGVtZW50c+KAmSBiYWNrZ3JvdW5kIGNvbG9yIHRvIGNvbG9yLlxyXG4gICAgICAgICAgICBodWVzOiAxMiwgLy8gTnVtYmVyIG9mIGh1ZXMgb2YgdGhlIGNvbG9yIGdyaWQuIEh1ZXMgYXJlIHNsaWNlcyBvZiB0aGUgY29sb3Igd2hlZWwuXHJcbiAgICAgICAgICAgIGh1ZTA6IDAsIC8vIFRoZSBmaXJzdCBodWUgb2YgdGhlIGNvbG9yIGdyaWQuIFxyXG4gICAgICAgICAgICBzaGFkZXM6IDUsIC8vIE51bWJlciBvZiBzaGFkZXMgb2YgY29sb3JzIGFuZCBzaGFkZXMgb2YgZ3JheSBiZXR3ZWVuIHdoaXRlIGFuZCBibGFjay4gXHJcbiAgICAgICAgICAgIHNhdHVyYXRpb25zOiAyLCAvLyBOdW1iZXIgb2Ygc2V0cyBvZiBzYXR1cmF0aW9uIG9mIHRoZSBjb2xvciBncmlkLlxyXG4gICAgICAgICAgICBub3RhdGlvbjogJ2hleCcsIC8vIFRleHQgc3ludGF4IG9mIGNvbG9ycyB2YWx1ZXMuXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZTogbnVsbCwgLy8gQ2xhc3MgYWRkZWQgdG8gSHVlYmVlIGVsZW1lbnQuIFVzZWZ1bCBmb3IgQ1NTLlxyXG4gICAgICAgICAgICBjdXN0b21Db2xvcnM6IFsgXHJcbiAgICAgICAgICAgICAgICAnIzMyQ0QzMicsICcjNTQ4NEVEJywgJyNBNEJERkUnLCBcclxuICAgICAgICAgICAgICAgICcjNDZENkRCJywgJyM3QUU3QkYnLCAnIzUxQjc0OScsXHJcbiAgICAgICAgICAgICAgICAnI0ZCRDc1QicsICcjRkZCODc4JywgJyNGRjg4N0MnLCBcclxuICAgICAgICAgICAgICAgICcjREMyMTI3JywgJyNEQkFERkYnLCAnI0UxRTFFMSdcdFxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy/liJ3lp4vljJbpopzoibJcclxuICAgICAgICB0aGlzLmh1ZWJlZUluc3RhbmNlLnNldENvbG9yKHRoaXMucHJvcHMudmFsdWUpO1xyXG4gICAgICAgIC8v55uR5ZCsaHVlYmVl6aKc6Imy6YCJ5oupXHJcbiAgICAgICAgdGhpcy5odWViZWVJbnN0YW5jZS5vbiggJ2NoYW5nZScsIHRoaXMuaGFuZGxlQ2hhbmdlKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcclxuICAgICAgICAvLyDmiYvliqjmm7TmlrB2YWx1ZVxyXG4gICAgICAgIHRoaXMuaHVlYmVlSW5zdGFuY2Uuc2V0Q29sb3IodGhpcy5zdGF0ZS52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgLy/ms6jmhI/vvIxodWViZWXmsqHmnIlkZXN0cm9555qE5pa55rOVXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9J2Zvcm0tY29udHJvbCcgXHJcbiAgICAgICAgICAgICAgICByZWY9e2VsID0+IHRoaXMuZWwgPSBlbH1cclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX0gLy/nm5HlkKzplK7nm5jovpPlhaVcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICApXHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xvclBpY2tlckdyb3VwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlID0gdGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDaGFuZ2UoY29sb3JWYWx1ZSkge1xyXG4gICAgICAgIC8v5ZCR5LiK5Lyg6YCSXHJcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNvbG9yQ2hhbmdlKGNvbG9yVmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8QXV0b0Zvcm1Hcm91cCB7Li4udGhpcy5wcm9wc30+XHJcbiAgICAgICAgICAgICAgICA8Q29sb3JJbnB1dCB7Li4udGhpcy5wcm9wc30vPlxyXG4gICAgICAgICAgICA8L0F1dG9Gb3JtR3JvdXA+XHJcbiAgICAgICAgKVxyXG5cclxuICAgIH1cclxufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIENvbnRyb2xMYWJlbCwgQ29sLCBGb3JtQ29udHJvbCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcbmltcG9ydCBBdXRvRm9ybUdyb3VwIGZyb20gJy4vQXV0b0Zvcm1Hcm91cCc7XHJcbmltcG9ydCAnbW9tZW50JztcclxuaW1wb3J0ICdib290c3RyYXAvanMvY29sbGFwc2UnO1xyXG5pbXBvcnQgJ2Jvb3RzdHJhcC9qcy90cmFuc2l0aW9uJztcclxuaW1wb3J0ICdlb25hc2Rhbi1ib290c3RyYXAtZGF0ZXRpbWVwaWNrZXInO1xyXG5pbXBvcnQgJ2VvbmFzZGFuLWJvb3RzdHJhcC1kYXRldGltZXBpY2tlci9idWlsZC9jc3MvYm9vdHN0cmFwLWRhdGV0aW1lcGlja2VyLmNzcyc7XHJcblxyXG5jbGFzcyBEYXRlVGltZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLnZhbHVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlID0gdGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDaGFuZ2UoZSkgeyBcclxuICAgICAgICBjb25zdCBuZXdEYXRlVmFsdWUgPSBlLmRhdGUuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJylcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogbmV3RGF0ZVZhbHVlfSk7XHJcbiAgICAgICAgLy8g5Lyg6YCSXHJcbiAgICAgICAgdGhpcy5wcm9wcy5vbkRhdGVUaW1lQ2hhbmdlKG5ld0RhdGVWYWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgLy8g5Yid5aeL5YyW57uE5Lu2XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucmVhZE9ubHkpIHRoaXMuZWwucmVhZE9ubHkgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuJGVsID0gJCh0aGlzLmVsKS5kYXRldGltZXBpY2tlcih7XHJcbiAgICAgICAgICAgIHNob3dUb2RheUJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgbG9jYWxlOiAnemgtY24nLFxyXG4gICAgICAgICAgICBmb3JtYXQ6ICdZWVlZLU1NLUREIEhIOm1tOnNzJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZSA9IHRoaXMuJGVsLmRhdGEoXCJEYXRlVGltZVBpY2tlclwiKTtcclxuICAgICAgICAvLyDliJ3lp4vljJblgLxcclxuICAgICAgICB0aGlzLmluc3RhbmNlLmRhdGUodGhpcy5wcm9wcy52YWx1ZSk7XHJcbiAgICAgICAgLy8g57uR5a6aY2hhbmdl5LqL5Lu2XHJcbiAgICAgICAgLy8g5pS+5Zyo5Yid5aeL5YyW5ZCO6L+b6KGM57uR5a6a77yM6YG/5YWN5Yid5aeL5YyW6L+H56iL6Kem5Y+RY2hhbmdl5LqL5Lu2XHJcbiAgICAgICAgdGhpcy4kZWwub24oXCJkcC5jaGFuZ2VcIiwgdGhpcy5oYW5kbGVDaGFuZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcclxuICAgICAgICAvLyDmiYvliqjmm7TmlrB2YWx1ZVxyXG4gICAgICAgIHRoaXMuaW5zdGFuY2UuZGF0ZSh0aGlzLnN0YXRlLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICAvLyBkZXN0cm95XHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5kZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy4kZWwub2ZmKFwiZHAuY2hhbmdlXCIsIHRoaXMuaGFuZGxlQ2hhbmdlKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0nZm9ybS1jb250cm9sJyBcclxuICAgICAgICAgICAgICAgIHJlZj17ZWwgPT4gdGhpcy5lbCA9IGVsfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgIClcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGVUaW1lUGlja2VyR3JvdXAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxBdXRvRm9ybUdyb3VwIHsuLi50aGlzLnByb3BzfT5cclxuICAgICAgICAgICAgICAgIDxEYXRlVGltZUlucHV0IHsuLi50aGlzLnByb3BzfSAvPlxyXG4gICAgICAgICAgICA8L0F1dG9Gb3JtR3JvdXA+ICAgICAgICAgICAgXHJcbiAgICAgICAgKVxyXG5cclxuICAgIH1cclxufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFJvdywgQ29sLCBGb3JtLCBGb3JtR3JvdXAsIEZvcm1Db250cm9sLCBDb250cm9sTGFiZWwgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5pbXBvcnQgVGl0bGVJbnB1dEdyb3VwIGZyb20gJy4vVGl0bGVJbnB1dEdyb3VwJztcclxuaW1wb3J0IERhdGVUaW1lUGlja2VyR3JvdXAgZnJvbSAnLi9EYXRlVGltZVBpY2tlckdyb3VwJztcclxuaW1wb3J0IENvbG9yUGlja2VyR3JvdXAgZnJvbSAnLi9Db2xvclBpY2tlckdyb3VwJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50RGV0YWlsRm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgLy/nlLHniLbnu4Tku7botJ/otKPlpITnkIbmlbDmja5cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgaGFuZGxlVGl0bGVDaGFuZ2UgPSB0aGlzLnByb3BzLm9uVGl0bGVDaGFuZ2U7XHJcbiAgICAgICAgY29uc3QgaGFuZGxlU3RhcnRDaGFuZ2UgPSB0aGlzLnByb3BzLm9uU3RhcnRDaGFuZ2U7XHJcbiAgICAgICAgY29uc3QgaGFuZGxlRW5kQ2hhbmdlID0gdGhpcy5wcm9wcy5vbkVuZENoYW5nZTtcclxuICAgICAgICBjb25zdCBoYW5kbGVDb2xvckNoYW5nZSA9IHRoaXMucHJvcHMub25Db2xvcmNoYW5nZTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8Rm9ybT5cclxuICAgICAgICAgICAgICAgIDxUaXRsZUlucHV0R3JvdXAgXHJcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbElkPVwidGMtY3JlYXRlcGFnZS1ldmVudHRpdGxlXCJcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5ldmVudFRpdGxlfSBcclxuICAgICAgICAgICAgICAgICAgICBvblRpdGxlQ2hhbmdlPXtoYW5kbGVUaXRsZUNoYW5nZX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8Um93PlxyXG4gICAgICAgICAgICAgICAgICAgIDxDb2wgc209ezZ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8RGF0ZVRpbWVQaWNrZXJHcm91cCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xJZD1cInRjLWNyZWF0ZXBhZ2UtZXZlbnRzdGFydFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIuW8gOWni+aXpeacn1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5zdGFydH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRGF0ZVRpbWVDaGFuZ2U9e2hhbmRsZVN0YXJ0Q2hhbmdlfSAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L0NvbD5cclxuICAgICAgICAgICAgICAgICAgICA8Q29sIHNtPXs2fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPERhdGVUaW1lUGlja2VyR3JvdXAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sSWQ9XCJ0Yy1jcmVhdGVwYWdlLWV2ZW50ZW5kXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwi57uT5p2f5pel5pyfXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLmVuZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRGF0ZVRpbWVDaGFuZ2U9e2hhbmRsZUVuZENoYW5nZX0gIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9Db2w+XHJcbiAgICAgICAgICAgICAgICA8L1Jvdz5cclxuICAgICAgICAgICAgICAgIDxSb3c+XHJcbiAgICAgICAgICAgICAgICAgICAgPENvbCBzbT17Nn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxDb2xvclBpY2tlckdyb3VwIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbElkPVwidGMtY3JlYXRlcGFnZS1ldmVudGNvbG9yXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwi6Imy5b2pXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPVwiXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29sb3JDaGFuZ2U9e2hhbmRsZUNvbG9yQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvQ29sPlxyXG4gICAgICAgICAgICAgICAgICAgIDxDb2wgc209ezZ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUdyb3VwIGNvbnRyb2xJZD1cInRjLWNyZWF0ZXBhZ2UtZXZlbnR0YWdzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q29udHJvbExhYmVsPuagh+etvjwvQ29udHJvbExhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvRm9ybUdyb3VwPiAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgPC9Db2w+XHJcbiAgICAgICAgICAgICAgICA8L1Jvdz5cclxuICAgICAgICAgICAgICAgIDxGb3JtR3JvdXAgY29udHJvbElkPVwidGMtY3JlYXRlcGFnZS1ldmVudHJlbWFya1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxDb250cm9sTGFiZWw+5aSH5rOoPC9Db250cm9sTGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sIGNvbXBvbmVudENsYXNzPVwidGV4dGFyZWFcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9Gb3JtR3JvdXA+XHJcbiAgICAgICAgICAgIDwvRm9ybT5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5pbXBvcnQgQXV0b0Zvcm1Hcm91cCBmcm9tICcuL0F1dG9Gb3JtR3JvdXAnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGl0bGVJbnB1dEdyb3VwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLnZhbHVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2UgPSB0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNoYW5nZShlKSB7XHJcbiAgICAgICAgY29uc3QgbmV3VGl0bGUgPSBlLnRhcmdldC52YWx1ZTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgdmFsdWU6IG5ld1RpdGxlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblRpdGxlQ2hhbmdlKG5ld1RpdGxlKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEF1dG9Gb3JtR3JvdXAgbGFiZWw9XCLmoIfpophcIiB7Li4udGhpcy5wcm9wc30+XHJcbiAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xcclxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9XHJcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCLor7fovpPlhaXmoIfpophcIlxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvQXV0b0Zvcm1Hcm91cD5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgTW9kYWwsIE5hdiwgTmF2SXRlbSwgVGFicywgVGFiLCBCdXR0b24sIFJvdywgQ29sLCBDbG9zZUJ1dHRvbiB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcbmltcG9ydCBFdmVudERldGFpbEZyb20gZnJvbSAnLi4vRm9ybS9FdmVudERldGFpbEZvcm0nO1xyXG5pbXBvcnQgRXZlbnRNb2RhbCBmcm9tICcuL0V2ZW50TW9kYWwnXHJcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50Q3JlYXRlTW9kYWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLmhhbmRsZVRpdGxlQ2hhbmdlID0gdGhpcy5oYW5kbGVUaXRsZUNoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlU3RhcnRDaGFuZ2UgPSB0aGlzLmhhbmRsZVN0YXJ0Q2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVFbmRDaGFuZ2UgPSB0aGlzLmhhbmRsZUVuZENoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQ29sb3JDaGFuZ2UgPSB0aGlzLmhhbmRsZUNvbG9yQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlVGl0bGVDaGFuZ2UobmV3VGl0bGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhuZXdUaXRsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlU3RhcnRDaGFuZ2UobmV3RGF0ZVZhbHVlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cobmV3RGF0ZVZhbHVlKVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUVuZENoYW5nZShuZXdEYXRlVmFsdWUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhuZXdEYXRlVmFsdWUpXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQ29sb3JDaGFuZ2UobmV3Q29sb3JWYWx1ZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG5ld0NvbG9yVmFsdWUpXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkUmFuZ2UgPSB0aGlzLnByb3BzLnNlbGVjdGVkUmFuZ2U7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEV2ZW50TW9kYWwgey4uLnRoaXMucHJvcHN9PlxyXG4gICAgICAgICAgICAgICAgPEV2ZW50TW9kYWwuTmF2SGVhZGVyIHsuLi50aGlzLnByb3BzfT5cclxuICAgICAgICAgICAgICAgICAgICA8TmF2SXRlbSBldmVudEtleT1cIjFcIiBocmVmPVwiI3RjLXJlcGVhdGZvcm1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAg5pel56iL57yW6L6RXHJcbiAgICAgICAgICAgICAgICAgICAgPC9OYXZJdGVtPlxyXG4gICAgICAgICAgICAgICAgICAgIDxOYXZJdGVtIGV2ZW50S2V5PVwiMlwiIGhyZWY9XCIjdGMtcmVwZWF0Zm9ybVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICDph43lpI3op4TliJlcclxuICAgICAgICAgICAgICAgICAgICA8L05hdkl0ZW0+XHJcbiAgICAgICAgICAgICAgICA8L0V2ZW50TW9kYWwuTmF2SGVhZGVyPlxyXG4gICAgICAgICAgICAgICAgPEV2ZW50TW9kYWwuVGFiQm9keSB7Li4udGhpcy5wcm9wc30+XHJcbiAgICAgICAgICAgICAgICAgICAgPFRhYi5QYW5lIGV2ZW50S2V5PVwiMVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8RXZlbnREZXRhaWxGcm9tIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCl9IC8v5q+P5qyhc2VsZWN06YO96YeN5paw5riy5p+TXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudFRpdGxlPVwiXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0PXtzZWxlY3RlZFJhbmdlLnN0YXJ0LmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kPXtzZWxlY3RlZFJhbmdlLmVuZC5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uVGl0bGVDaGFuZ2U9e3RoaXMuaGFuZGxlVGl0bGVDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblN0YXJ0Q2hhbmdlPXt0aGlzLmhhbmRsZVN0YXJ0Q2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25FbmRDaGFuZ2U9e3RoaXMuaGFuZGxlRW5kQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Db2xvcmNoYW5nZT17dGhpcy5oYW5kbGVDb2xvckNoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L1RhYi5QYW5lPlxyXG4gICAgICAgICAgICAgICAgICAgIDxUYWIuUGFuZSBldmVudEtleT1cIjJcIj5UYWIgMSBjb250ZW50PC9UYWIuUGFuZT5cclxuICAgICAgICAgICAgICAgIDwvRXZlbnRNb2RhbC5UYWJCb2R5PlxyXG4gICAgICAgICAgICAgICAgPEV2ZW50TW9kYWwuVG9vbGJhckZvb3Rlcj5cclxuICAgICAgICAgICAgICAgICAgICDov5nph4zmmK90b29sYmFyXHJcbiAgICAgICAgICAgICAgICA8L0V2ZW50TW9kYWwuVG9vbGJhckZvb3Rlcj5cclxuICAgICAgICAgICAgPC9FdmVudE1vZGFsPlxyXG4gICAgICAgIClcclxuICAgIH1cclxufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IE1vZGFsLCBOYXYsIE5hdkl0ZW0sIFRhYnMsIFRhYiwgQnV0dG9uLCBSb3csIENvbCwgQ2xvc2VCdXR0b24gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5pbXBvcnQgRXZlbnREZXRhaWxGcm9tIGZyb20gJy4uL0Zvcm0vRXZlbnREZXRhaWxGb3JtJztcclxuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5cclxuY2xhc3MgTmF2SGVhZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIC8vdGhpcy5wcm9wcy5jaGlsZHJlbiDmjqXlj5cgPE5hdkl0ZW0gLz5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8TW9kYWwuSGVhZGVyXHJcbiAgICAgICAgICAgICAgICBzdHlsZT17e2JvcmRlckJvdHRvbTogJ25vbmUnLCBwYWRkaW5nOiAnMCd9fT5cclxuICAgICAgICAgICAgICAgIDxOYXYgYnNTdHlsZT1cInRhYnNcIlxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7cGFkZGluZzogJzE1cHggMTVweCAwIDE1cHgnfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPENsb3NlQnV0dG9uIG9uQ2xpY2s9e3RoaXMucHJvcHMub25Nb2RhbENsb3NlfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG4gICAgICAgICAgICAgICAgPC9OYXY+XHJcbiAgICAgICAgICAgIDwvTW9kYWwuSGVhZGVyPlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgVGFiQm9keSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICAvL3RoaXMucHJvcHMuY2hpbGRyZW4g5o6l5Y+XIDxUYWIuUGFuZSAvPlxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxNb2RhbC5Cb2R5PlxyXG4gICAgICAgICAgICAgICAgPFRhYi5Db250ZW50IGFuaW1hdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuICAgICAgICAgICAgICAgIDwvVGFiLkNvbnRlbnQ+XHJcbiAgICAgICAgICAgIDwvTW9kYWwuQm9keT4gICAgICAgICAgICBcclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFRvb2xiYXJGb290ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxNb2RhbC5Gb290ZXI+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuICAgICAgICAgICAgPC9Nb2RhbC5Gb290ZXI+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBFdmVudE1vZGFsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgTmF2SGVhZGVyLCBUYWJCb2R5LCBUb29sYmFyRm9vdGVyO1xyXG4gICAgICAgIFJlYWN0LkNoaWxkcmVuLmZvckVhY2godGhpcy5wcm9wcy5jaGlsZHJlbiwgKHRoaXNBcmcpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IHRoaXNBcmcudHlwZS5uYW1lO1xyXG4gICAgICAgICAgICBpZiAoIG5hbWUgPT0gJ05hdkhlYWRlcicgKSB7XHJcbiAgICAgICAgICAgICAgICBOYXZIZWFkZXIgPSB0aGlzQXJnO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBuYW1lID09ICdUYWJCb2R5JyApIHtcclxuICAgICAgICAgICAgICAgIFRhYkJvZHkgPSB0aGlzQXJnO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBuYW1lID09ICdUb29sYmFyRm9vdGVyJyApIHtcclxuICAgICAgICAgICAgICAgIFRvb2xiYXJGb290ZXIgPSB0aGlzQXJnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPE1vZGFsIHNob3c9e3RoaXMucHJvcHMuc2hvd30gb25IaWRlPXt0aGlzLnByb3BzLm9uTW9kYWxDbG9zZX0+IFxyXG4gICAgICAgICAgICAgICAgPFRhYi5Db250YWluZXIgaWQ9XCJ0YWJzLXdpdGgtZHJvcGRvd25cIiBkZWZhdWx0QWN0aXZlS2V5PVwiMVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxSb3cgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbCBzbT17MTJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBOYXZIZWFkZXIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBUYWJCb2R5IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9Db2w+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9Sb3c+XHJcbiAgICAgICAgICAgICAgICA8L1RhYi5Db250YWluZXI+XHJcbiAgICAgICAgICAgICAgICB7IFRvb2xiYXJGb290ZXIgfVxyXG4gICAgICAgICAgICA8L01vZGFsPlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuRXZlbnRNb2RhbC5OYXZIZWFkZXIgPSBOYXZIZWFkZXI7XHJcbkV2ZW50TW9kYWwuVGFiQm9keSA9IFRhYkJvZHk7XHJcbkV2ZW50TW9kYWwuVG9vbGJhckZvb3RlciA9IFRvb2xiYXJGb290ZXI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFdmVudE1vZGFsOyIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL2luZGV4LmNzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9pbmRleC5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL2luZGV4LmNzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgJ2Z1bGxjYWxlbmRhci1yZWFjdHdyYXBwZXIvZGlzdC9jc3MvZnVsbGNhbGVuZGFyLm1pbi5jc3MnXHJcbmltcG9ydCAnYm9vdHN0cmFwL2Rpc3QvY3NzL2Jvb3RzdHJhcC5jc3MnO1xyXG5pbXBvcnQgJ2Jvb3RzdHJhcC9kaXN0L2Nzcy9ib290c3RyYXAtdGhlbWUuY3NzJztcclxuaW1wb3J0ICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtZnJlZS9jc3MvYWxsLmNzcydcclxuaW1wb3J0IEFwcCBmcm9tICcuL0FwcCc7XHJcbmltcG9ydCAnLi9pbmRleC5jc3MnO1xyXG5cclxuUmVhY3RET00ucmVuZGVyKDxBcHAgLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JykpO1xyXG5cclxuLypcclxuJChmdW5jdGlvbigpe1xyXG4gICAgLy8g5a6a5LmJ5Y+Y6YePXHJcblx0Y29uc3QgZGF0YUxvYWRlciA9IG5ldyBXaXpFdmVudERhdGFMb2FkZXIoKTtcclxuXHRsZXQgZ19lZGl0UG9wcGVyLCBnX2NyZWF0ZU1vZGFsLCBnX2VkaXRNb2RhbDtcclxuXHJcbiAgICBjb25zdCBjYWxlbmRhciA9ICQoJyNjYWxlbmRhcicpLmZ1bGxDYWxlbmRhcih7XHJcblx0XHR0aGVtZVN5c3RlbTogJ3N0YW5kYXJkJyxcclxuXHRcdGhlaWdodDogJ3BhcmVudCcsXHJcblx0XHRoZWFkZXI6IHtcclxuXHRcdFx0bGVmdDogJ3ByZXYsbmV4dCx0b2RheScsXHJcblx0XHRcdGNlbnRlcjogJ3RpdGxlJyxcclxuXHRcdFx0cmlnaHQ6ICdtb250aCxhZ2VuZGFXZWVrLGFnZW5kYURheSxsaXN0V2VlaydcclxuXHRcdH0sXHJcblx0XHR2aWV3czoge1xyXG5cdFx0XHRtb250aDoge1xyXG5cdFx0XHRcdC8vdGl0bGVGb3JtYXQ6IGdfbG9jX3RpdGxlZm9ybWF0X21vbnRoLCAvL3ZhciBnX2xvY190aXRsZWZvcm1hdF9tb250aCA9IFwiTU1NTSB5eXl5XCI7XHJcblx0XHRcdH0sXHJcblx0XHRcdGFnZW5kYToge1xyXG5cdFx0XHRcdG1pblRpbWU6IFwiMDg6MDA6MDBcIixcclxuXHRcdFx0XHRzbG90TGFiZWxGb3JtYXQ6ICdoKDptbSkgYSdcclxuXHRcdFx0fSxcclxuXHRcdFx0bGlzdFdlZWs6IHtcclxuXHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRuYXZMaW5rczogdHJ1ZSxcclxuXHRcdGFsbERheURlZmF1bHQ6IGZhbHNlLFxyXG5cdFx0ZGVmYXVsdFZpZXc6ICdhZ2VuZGFXZWVrJyxcclxuXHRcdGV2ZW50TGltaXQ6IHRydWUsXHJcblx0XHRidXR0b25UZXh0OiB7XHJcblx0XHRcdHRvZGF5OiAn5LuK5aSpJyxcclxuXHRcdFx0bW9udGg6ICfmnIgnLFxyXG5cdFx0XHR3ZWVrOiAn5ZGoJyxcclxuXHRcdFx0ZGF5OiAn5pelJyxcclxuXHRcdFx0bGlzdDogJ+ihqCdcclxuICAgICAgICB9LFxyXG5cdFx0bW9udGhOYW1lczogW1xyXG4gICAgICAgICAgICAnMeaciCcsICcy5pyIJywgJzPmnIgnLCAnNOaciCcsIFxyXG4gICAgICAgICAgICAnNeaciCcsICc25pyIJywgJzfmnIgnLCAnOOaciCcsIFxyXG4gICAgICAgICAgICAnOeaciCcsICcxMOaciCcsICcxMeaciCcsICcxMuaciCdcclxuICAgICAgICBdLFxyXG5cdFx0bW9udGhOYW1lc1Nob3J0OiBbXHJcbiAgICAgICAgICAgICcx5pyIJywgJzLmnIgnLCAnM+aciCcsICc05pyIJywgXHJcbiAgICAgICAgICAgICc15pyIJywgJzbmnIgnLCAnN+aciCcsICc45pyIJywgXHJcbiAgICAgICAgICAgICc55pyIJywgJzEw5pyIJywgJzEx5pyIJywgJzEy5pyIJ1xyXG4gICAgICAgIF0sXHJcblx0XHRkYXlOYW1lczogW1xyXG4gICAgICAgICAgICAn5ZGo5pelJywgJ+WRqOS4gCcsICflkajkuownLCAn5ZGo5LiJJywgJ+WRqOWbmycsICflkajkupQnLCAn5ZGo5YWtJ1xyXG4gICAgICAgIF0sXHJcblx0XHRkYXlOYW1lc1Nob3J0OiBbXHJcbiAgICAgICAgICAgICflkajml6UnLCAn5ZGo5LiAJywgJ+WRqOS6jCcsICflkajkuIknLCAn5ZGo5ZubJywgJ+WRqOS6lCcsICflkajlha0nXHJcbiAgICAgICAgXSxcclxuXHRcdHNlbGVjdGFibGU6IHRydWUsXHJcblx0XHRzZWxlY3RIZWxwZXI6IHRydWUsXHJcblx0XHR1bnNlbGVjdENhbmNlbDogJy5tb2RhbCAqJyxcclxuXHRcdGFsbERheVRleHQ6ICflhajlpKknLFxyXG5cdFx0bm93SW5kaWNhdG9yOiB0cnVlLFxyXG5cdFx0Zm9yY2VFdmVudER1cmF0aW9uOiB0cnVlLFxyXG5cdFx0Zmlyc3REYXk6IDEsIC8vIOesrOS4gOWkqeaYr+WRqOS4gOi/mOaYr+WRqOWkqe+8jOS4jmRhdGVwaWNrZXLlv4Xpobvnm7jlkIxcclxuXHRcdGRyYWdPcGFjaXR5OiB7XHJcblx0XHRcdFwibW9udGhcIjogLjUsXHJcblx0XHRcdFwiYWdlbmRhV2Vla1wiOiAxLFxyXG5cdFx0XHRcImFnZW5kYURheVwiOiAxXHJcblx0XHR9LFxyXG5cdFx0ZWRpdGFibGU6IHRydWUsXHJcblxyXG5cdFx0Ly8g5Yi35paw6KeG5Zu+77yM6YeN5paw6I635Y+W5pel5Y6G5LqL5Lu2XHJcblx0XHR2aWV3UmVuZGVyOiBmdW5jdGlvbiggdmlldywgZWxlbWVudCApIHtcclxuXHRcdFx0Ly9UT0RPOiDmhJ/op4nov5nmoLfpgKDmiJDmgKfog73kuIrnmoTmjZ/lpLHvvIzmmK/lkKbmnInmm7Tlpb3nmoTmlrnms5XvvJ9cclxuXHRcdFx0Y29uc3QgY2FsZW5kYXIgPSAkKCcjY2FsZW5kYXInKTtcclxuXHRcdFx0Y29uc3QgZXZlbnRTb3VyY2VzID0gZGF0YUxvYWRlci5nZXRFdmVudFNvdXJjZXMoIHZpZXcsIGVsZW1lbnQgKTtcclxuXHRcdFx0Y2FsZW5kYXIuZnVsbENhbGVuZGFyKCdyZW1vdmVFdmVudHMnKTtcclxuXHRcdFx0Zm9yIChsZXQgaT0wIDsgaSA8IGV2ZW50U291cmNlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGNhbGVuZGFyLmZ1bGxDYWxlbmRhcignYWRkRXZlbnRTb3VyY2UnLCBldmVudFNvdXJjZXNbaV0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0fSxcclxuXHJcblx0XHQvLyDpgInmi6nliqjkvZzop6blj5HnmoTkuovku7blj6Xmn4TvvIzlrprkuYnkuobkuIDkuKpjYWxsYmFja1xyXG5cdFx0c2VsZWN0OiBmdW5jdGlvbihzdGFydCwgZW5kLCBqc0V2ZW50LCB2aWV3KXtcclxuXHRcdFx0Ly8g5by55Ye64oCc5Yib5bu65pel5Y6G5LqL5Lu24oCd56qX5Y+jXHJcblx0XHRcdC8vIOWIpOaWreaYr+WQpua4suafk1xyXG5cdFx0XHQvL1RPRE86IOaDs+WKnuazleS4jeimgeeUqOWFqOWxgOWPmOmHj1xyXG5cdFx0XHRpZiAoICF3aW5kb3cuZ19jcmVhdGVNb2RhbCApIG5ldyBFdmVudENyZWF0ZU1vZGFsKHtzdGFydCwgZW5kLCBqc0V2ZW50LCB2aWV3fSk7XHJcblx0XHRcdC8vIOS8oOmAkuWPguaVsFxyXG5cdFx0XHR3aW5kb3cuZ19jcmVhdGVNb2RhbC51cGRhdGUoe3N0YXJ0LCBlbmQsIGpzRXZlbnQsIHZpZXd9KTtcclxuXHRcdFx0d2luZG93LmdfY3JlYXRlTW9kYWwuc2hvdygpO1xyXG5cdFx0fSxcclxuXHJcblx0XHRldmVudERyYWdTdGFydDogZnVuY3Rpb24oIGV2ZW50LCBqc0V2ZW50LCB1aSwgdmlldyApIHsgfSxcclxuXHRcdGV2ZW50RHJhZ1N0b3A6IGZ1bmN0aW9uKCBldmVudCwganNFdmVudCwgdWksIHZpZXcgKSB7IH0sXHJcblxyXG5cdFx0Ly8g5pel5Y6G5LqL5Lu25ouW5YqoIGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXdcclxuXHRcdGV2ZW50RHJvcDogZnVuY3Rpb24oZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldyl7XHJcblx0XHRcdGlmIChldmVudC5pZCl7XHJcblx0XHRcdFx0ZGF0YUxvYWRlci51cGRhdGVFdmVudERhdGFPbkRyb3AoZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldylcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXZlcnRGdW5jKCk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8g5pel5Y6G5LqL5Lu25pel5pyf6IyD5Zu06YeN572uXHJcblx0XHRldmVudFJlc2l6ZTogZnVuY3Rpb24oZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldyl7XHJcblx0XHRcdGlmIChldmVudC5pZCl7XHJcblx0XHRcdFx0ZGF0YUxvYWRlci51cGRhdGVFdmVudERhdGFPblJlc2l6ZShldmVudCwgZGVsdGEsIHJldmVydEZ1bmMsIGpzRXZlbnQsIHVpLCB2aWV3KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXZlcnRGdW5jKCk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblxyXG5cdFx0ZXZlbnRSZW5kZXI6IGZ1bmN0aW9uKGV2ZW50T2JqLCAkZWwpIHtcclxuXHRcdFx0Ly8g5YWD57Sg5bey57uP5riy5p+T77yM5Y+v5L+u5pS55YWD57SgXHJcblx0XHRcdGNvbnN0IGlzQ29tcGxldGUgPSBwYXJzZUludChldmVudE9iai5jb21wbGV0ZSkgPT0gNTtcclxuXHRcdFx0aWYgKCBpc0NvbXBsZXRlICkge1xyXG5cdFx0XHRcdC8vIOagt+W8j1xyXG5cdFx0XHRcdCRlbC5hZGRDbGFzcygndGMtY29tcGxldGUnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8g5pel5Y6G5LqL5Lu254K55Ye75ZCO5LqL5Lu25Y+l5p+EXHJcblx0XHRldmVudENsaWNrOiBmdW5jdGlvbiggZXZlbnQsIGpzRXZlbnQsIHZpZXcgKSB7XHJcblx0XHRcdC8vIHRoaXMg5oyH5ZCR5YyF6KO55LqL5Lu255qEPGE+5YWD57SgXHJcblxyXG5cdFx0XHQvLyDliKTmlq3mmK/lkKblt7Lnu4/muLLmn5PlvLnnqpdcclxuXHRcdFx0aWYgKCAhZ19lZGl0UG9wcGVyICkge1xyXG5cdFx0XHRcdGdfZWRpdFBvcHBlciA9IHJlbmRlckVkaXRQb3BwZXIoe1xyXG5cdFx0XHRcdFx0J2V2ZW50JzogZXZlbnQsXHJcblx0XHRcdFx0XHQnanNFdmVudCc6IGpzRXZlbnQsXHJcblx0XHRcdFx0XHQndmlldyc6IHZpZXdcclxuXHRcdFx0XHR9LCB0aGlzKS5FdmVudFBvcG92ZXIoJ3Nob3cnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyDmm7TmlrByZWZlcmVuY2VcclxuXHRcdFx0XHRnX2VkaXRQb3BwZXIuRXZlbnRQb3BvdmVyKCdvcHRpb24nLCB7XHJcblx0XHRcdFx0XHRhcmdzOiB7XHJcblx0XHRcdFx0XHRcdCdldmVudCc6IGV2ZW50LFxyXG5cdFx0XHRcdFx0XHQnanNFdmVudCc6IGpzRXZlbnQsXHJcblx0XHRcdFx0XHRcdCd2aWV3Jzogdmlld1xyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHRpdGxlOiBldmVudC50aXRsZSxcclxuXHRcdFx0XHRcdHJlZmVyZW5jZTogdGhpc1xyXG5cdFx0XHRcdH0pLkV2ZW50UG9wb3ZlcigndXBkYXRlJykuRXZlbnRQb3BvdmVyKCdzaG93Jyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblx0XHRcclxuXHR9KVxyXG59KVxyXG4qLyIsImltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuaW1wb3J0ICdmdWxsY2FsZW5kYXInO1xyXG5pbXBvcnQgeyBXaXpEYXRhYmFzZSBhcyBnX2RiLCBXaXpDb21tb25VSSBhcyBnX2Ntbn0gZnJvbSAnLi4vdXRpbHMvV2l6SW50ZXJmYWNlJztcclxuaW1wb3J0IENvbmZpZyBmcm9tICcuLi91dGlscy9Db25maWcnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FsZW5kYXJFdmVudCB7XHJcblx0LyoqXHJcbiAgICAgKiDliJvlu7rkuIDkuKrpgJrnlKjml6XnqIsuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IGRhdGEg5Y6f5aeL5pWw5o2u57G75Z6L77yM5Y+v5Lul5pivIFdpekV2ZW50LCBGdWxsQ2FsZW5kYXJFdmVudCDku6Xlj4ogR1VJRC5cclxuICAgICAqL1xyXG5cdGNvbnN0cnVjdG9yKCBkYXRhLCBjYWxlbmRhciApIHtcclxuXHRcdGlmICghZ19kYikgdGhyb3cgbmV3IEVycm9yKCdJV2l6RGF0YWJhc2UgaXMgbm90IHZhbGlkLicpO1xyXG5cdFx0dGhpcy4kY2FsZW5kYXIgPSBjYWxlbmRhciA/ICQoY2FsZW5kYXIpIDogJCgnI2NhbGVuZGFyJyk7XHJcblx0XHRjb25zdCB0eXBlID0gdGhpcy5fY2hlY2tEYXRhVHlwZShkYXRhKTtcclxuXHRcdHN3aXRjaCAoIHR5cGUgKSB7XHJcblx0XHRcdGNhc2UgXCJXaXpFdmVudFwiOlxyXG5cdFx0XHRjYXNlIFwiRnVsbENhbGVuZGFyRXZlbnRcIjpcclxuXHRcdFx0XHR0aGlzLl9jcmVhdGUoZGF0YSwgdHlwZSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgXCJHVUlEXCI6XHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdC8vVE9ETzog6I635b6XV2l6RXZlbnTmlbDmja7vvIzlubbliJvlu7rlr7nosaFcclxuXHRcdFx0XHRcdGNvbnN0IGRvYyA9IGdfZGIuRG9jdW1lbnRGcm9tR1VJRChkYXRhKTtcclxuXHRcdFx0XHRcdGNvbnN0IG5ld0V2ZW50RGF0YSA9IHtcclxuXHRcdFx0XHRcdFx0XCJDQUxFTkRBUl9FTkRcIiA6IGRvYy5HZXRQYXJhbVZhbHVlKCdDQUxFTkRBUl9FTkQnKSxcclxuXHRcdFx0XHRcdFx0XCJDQUxFTkRBUl9JTkZPXCIgOiBkb2MuR2V0UGFyYW1WYWx1ZSgnQ0FMRU5EQVJfSU5GTycpLFxyXG5cdFx0XHRcdFx0XHRcIkNBTEVOREFSX0VYVFJBSU5GT1wiIDogZG9jLkdldFBhcmFtVmFsdWUoJ0NBTEVOREFSX0VYVFJBSU5GTycpLFxyXG5cdFx0XHRcdFx0XHRcIkNBTEVOREFSX1NUQVJUXCIgOiBkb2MuR2V0UGFyYW1WYWx1ZSgnQ0FMRU5EQVJfU1RBUlQnKSxcclxuXHRcdFx0XHRcdFx0XCJDQUxFTkRBUl9SRUNVUlJFTkNFXCIgOiBkb2MuR2V0UGFyYW1WYWx1ZSgnQ0FMRU5EQVJfUkVDVVJSRU5DRScpLFxyXG5cdFx0XHRcdFx0XHRcIkNBTEVOREFSX0VORFJFQ1VSUkVOQ0VcIiA6IGRvYy5HZXRQYXJhbVZhbHVlKCdDQUxFTkRBUl9FTkRSRUNVUlJFTkNFJyksXHJcblx0XHRcdFx0XHRcdFwiY3JlYXRlZFwiIDogbW9tZW50KGRvYy5EYXRlQ3JlYXRlZCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyksXHJcblx0XHRcdFx0XHRcdFwiZ3VpZFwiIDogZG9jLkdVSUQsXHJcblx0XHRcdFx0XHRcdFwidGl0bGVcIiA6IGRvYy5UaXRsZSxcclxuXHRcdFx0XHRcdFx0XCJ1cGRhdGVkXCIgOiBtb21lbnQoZG9jLkRhdGVNb2RpZmllZCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJylcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHRoaXMuX2NyZWF0ZShuZXdFdmVudERhdGEsICdXaXpFdmVudCcpO1xyXG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHsgY29uc29sZS5lcnJvcihlKTsgfVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdF9jcmVhdGUoZGF0YSwgdHlwZSkge1xyXG5cdFx0bGV0IHN0YXJ0LCBlbmQsIGlkLCBia0NvbG9yLCBhbGxEYXksIGNvbXBsZXRlLCBkYXRlQ29tcGxldGVkLCBycHRSdWxlLCBycHRFbmQ7XHJcblx0XHRzd2l0Y2ggKHR5cGUpIHtcclxuXHRcdFx0Y2FzZSBcIkdVSURcIjpcclxuXHRcdFx0Y2FzZSBcIldpekV2ZW50XCI6XHJcblx0XHRcdFx0dGhpcy5fSW5mbyA9IHRoaXMuX3BhcnNlSW5mbyhkYXRhLkNBTEVOREFSX0lORk8pO1xyXG5cdFx0XHRcdHRoaXMuX0V4dHJhSW5mbyA9IGRhdGEuQ0FMRU5EQVJfRVhUUkFJTkZPID8gdGhpcy5fcGFyc2VJbmZvKGRhdGEuQ0FMRU5EQVJfRVhUUkFJTkZPKSA6IHRoaXMuX2dldERlZmF1bHRFeHRyYUluZm8oKTtcclxuXHRcdFx0XHQvLyDnu5/kuIDlj5jph49cclxuXHRcdFx0XHRpZCA9IGRhdGEuZ3VpZDtcclxuXHRcdFx0XHRzdGFydCA9IGRhdGEuQ0FMRU5EQVJfU1RBUlQ7XHJcblx0XHRcdFx0ZW5kID0gZGF0YS5DQUxFTkRBUl9FTkQ7XHJcblx0XHRcdFx0Ly8g5Yik5pat5piv5ZCm55So5oi36Ieq5a6a5LmJ6IOM5pmv6Imy77yM5ZCR5LiL5YW85a655Y6f54mI5pel5Y6GXHJcblx0XHRcdFx0YmtDb2xvciA9IHRoaXMuX0luZm8uY2kgPyAoIHBhcnNlSW50KHRoaXMuX0luZm8uY2kpID09IDAgPyB0aGlzLl9JbmZvLmIgOiBDb25maWcuY29sb3JJdGVtc1t0aGlzLl9JbmZvLmNpXS5jb2xvclZhbHVlICkgOiB0aGlzLl9JbmZvLmI7XHJcblx0XHRcdFx0YWxsRGF5ID0gZGF0YS5DQUxFTkRBUl9FTkQuaW5kZXhPZihcIjIzOjU5OjU5XCIpICE9IC0xID8gdHJ1ZSA6IGZhbHNlO1xyXG5cdFx0XHRcdGNvbXBsZXRlID0gdGhpcy5fRXh0cmFJbmZvLkNvbXBsZXRlO1xyXG5cdFx0XHRcdGRhdGVDb21wbGV0ZWQgPSB0aGlzLl9FeHRyYUluZm8uRGF0ZUNvbXBsZXRlZDtcclxuXHRcdFx0XHQvLyDph43lpI3kuovku7ZcclxuXHRcdFx0XHRycHRSdWxlID0gZGF0YS5DQUxFTkRBUl9SRUNVUlJFTkNFO1xyXG5cdFx0XHRcdHJwdEVuZCA9IGRhdGEuQ0FMRU5EQVJfRU5EUkVDVVJSRU5DRTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBcIkZ1bGxDYWxlbmRhckV2ZW50XCI6XHJcblx0XHRcdFx0aWQgPSBkYXRhLmlkO1xyXG5cdFx0XHRcdHN0YXJ0ID0gZGF0YS5zdGFydDtcclxuXHRcdFx0XHRlbmQgPSBkYXRhLmVuZDtcclxuXHRcdFx0XHRia0NvbG9yID0gZGF0YS5iYWNrZ3JvdW5kQ29sb3I7XHJcblx0XHRcdFx0YWxsRGF5ID0gZGF0YS5hbGxEYXkgPyBkYXRhLmFsbERheSA6ICEkLmZ1bGxDYWxlbmRhci5tb21lbnQoZGF0YS5zdGFydCkuaGFzVGltZSgpO1xyXG5cdFx0XHRcdGNvbXBsZXRlID0gZGF0YS5jb21wbGV0ZSB8fCAwO1xyXG5cdFx0XHRcdGRhdGVDb21wbGV0ZWQgPSBkYXRhLmRhdGVDb21wbGV0ZWQgfHwgJyc7XHJcblx0XHRcdFx0cnB0UnVsZSA9IGRhdGEucnB0UnVsZTtcclxuXHRcdFx0XHRycHRFbmQgPSBkYXRhLnJwdEVuZFxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignQ2FuIG5vdCBpZGVudGlmeSBkYXRhIHR5cGUuJyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0XHQvLyDln7rmnKzkv6Hmga9cclxuXHRcdHRoaXMuaWQgPSBpZDtcclxuXHRcdHRoaXMudGl0bGUgPSBkYXRhLnRpdGxlO1xyXG5cdFx0Ly8g5pe26Ze05L+h5oGvXHJcblx0XHR0aGlzLmFsbERheSA9IGFsbERheTtcclxuXHRcdC8vIOazqOaEj++8gXN0YXJ0L2VuZCDlj6/og73mmK9tb21lbnTlr7nosaHmiJbogIVzdHLvvIzmiYDku6XkuIDlvovlhYjovazmjaLmiJBtb21lbnTlho3moLzlvI/ljJbovpPlh7pcclxuXHRcdHRoaXMuc3RhcnQgPSBhbGxEYXkgPyBtb21lbnQoc3RhcnQpLmZvcm1hdChcIllZWVktTU0tRERcIikgOiBtb21lbnQoc3RhcnQpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0dGhpcy5lbmQgPSBhbGxEYXkgPyBtb21lbnQoZW5kKS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpIDogbW9tZW50KGVuZCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHR0aGlzLmNyZWF0ZWQgPSBkYXRhLmNyZWF0ZWQgPyBkYXRhLmNyZWF0ZWQgOiBtb21lbnQoc3RhcnQpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0dGhpcy51cGRhdGVkID0gZGF0YS51cGRhdGVkID8gZGF0YS51cGRhdGVkIDogbW9tZW50KCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHQvLyDorr7nva7kv6Hmga9cclxuXHRcdHRoaXMudGV4dENvbG9yID0gJ2JsYWNrJztcclxuXHRcdHRoaXMuYmFja2dyb3VuZENvbG9yID0gYmtDb2xvcjtcclxuXHRcdHRoaXMuY29tcGxldGUgPSBjb21wbGV0ZTtcclxuXHRcdHRoaXMuZGF0ZUNvbXBsZXRlZCA9IGRhdGVDb21wbGV0ZWQ7XHJcblx0XHQvLyDph43lpI3kuovku7ZcclxuXHRcdHRoaXMucnB0UnVsZSA9IHJwdFJ1bGU7XHJcblx0XHR0aGlzLnJwdEVuZCA9IHJwdEVuZDtcclxuXHRcdC8vXHJcblx0XHR0aGlzLl91cGRhdGUoKTtcclxuXHR9XHJcblxyXG5cdF9jaGVja0RhdGFUeXBlKGRhdGEpIHtcclxuXHRcdGNvbnN0IG9iakNsYXNzID0gZGF0YS5jb25zdHJ1Y3RvcjtcclxuICAgICAgICBjb25zdCBHVUlEX1JlZ0V4ciA9IC9eWzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtNV1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn0kL2k7XHJcbiAgICAgICAgbGV0IHR5cGU7XHJcbiAgICAgICAgc3dpdGNoIChvYmpDbGFzcykge1xyXG4gICAgICAgICAgICBjYXNlIFN0cmluZzpcclxuICAgICAgICAgICAgICAgIGlmICggR1VJRF9SZWdFeHIudGVzdChkYXRhKSApIHR5cGUgPSBcIkdVSURcIjtcclxuICAgICAgICAgICAgICAgIGVsc2UgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGRhdGEsIGNhbm5vdCBjcmVhdGUgQ2FsZW5kYXJFdmVudCBvYmplY3QuJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBPYmplY3Q6XHJcblx0XHRcdFx0aWYgKCBkYXRhLkNBTEVOREFSX0lORk8gJiYgZGF0YS50aXRsZSApIHsgXHJcblx0XHRcdFx0XHR0eXBlID0gJ1dpekV2ZW50JztcclxuXHRcdFx0XHR9IGVsc2UgaWYgKCBkYXRhLnN0YXJ0ICYmIGRhdGEudGl0bGUgKSB7XHJcblx0XHRcdFx0XHR0eXBlID0gJ0Z1bGxDYWxlbmRhckV2ZW50JztcclxuXHRcdFx0XHR9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHR5cGU7XHJcblx0fTtcclxuXHJcblx0X3BhcnNlSW5mbyhJbmZvU3RyaW5nKSB7XHJcblx0XHRjb25zdCBJbmZvT2JqZWN0ID0ge307XHJcblx0XHQvLyDmi4bop6NDQUxFTkRBUl9JTkZPXHJcblx0XHRjb25zdCBJbmZvQXJyYXkgPSBJbmZvU3RyaW5nLnNwbGl0KCcvJyk7XHJcblx0XHRJbmZvQXJyYXkuZm9yRWFjaChmdW5jdGlvbihpdGVtLCBpbmRleCwgYXJyKXtcclxuXHRcdFx0Y29uc3QgcGFpciA9IGl0ZW0uc3BsaXQoJz0nKTtcclxuXHRcdFx0SW5mb09iamVjdFtwYWlyWzBdXSA9IHBhaXJbMV07XHJcblx0XHR9KTtcclxuXHRcdC8vIOWkhOeQhuminOiJsuWAvFxyXG5cdFx0aWYgKCBJbmZvT2JqZWN0LmIgKSBJbmZvT2JqZWN0LmIgPSAnIycgKyBJbmZvT2JqZWN0LmI7XHJcblxyXG5cdFx0cmV0dXJuIEluZm9PYmplY3Q7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcbiAgICAgKiDlsIYgSW5mbyDlr7nosaHluo/liJfljJYuXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gW0luZm9PYmplY3Q9XSDmj5DkvpsgSW5mbyDlr7nosaHvvIzpu5jorqTkuLpgdGhpcy5fSW5mb2AuXHJcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IOi/lOWbnueUqOS6jkluZm/lr7nosaHlrZfnrKbkuLIuXHJcbiAgICAgKi9cclxuXHRfc3RyaW5naWZ5SW5mbyggSW5mb09iamVjdCA9IHRoaXMuX0luZm8gKSB7XHJcblx0XHRpZiAoICFJbmZvT2JqZWN0ICkgcmV0dXJuICcnO1xyXG5cdFx0Y29uc3QgSW5mb0FycmF5ID0gW107XHJcblx0XHRjb25zdCBJbmZvT2JqZWN0S2V5c0FycmF5ID0gT2JqZWN0LmtleXMoSW5mb09iamVjdCk7XHJcblx0XHRJbmZvT2JqZWN0S2V5c0FycmF5LmZvckVhY2goZnVuY3Rpb24oaXRlbSwgaW5kZXgsIGFycil7XHJcblx0XHRcdGNvbnN0IHNpbmdsZUluZm8gPSBgJHtpdGVtfT0ke0luZm9PYmplY3RbaXRlbV19YDtcclxuXHRcdFx0SW5mb0FycmF5LnB1c2goc2luZ2xlSW5mbyk7XHJcblx0XHR9KTtcclxuXHRcdHJldHVybiBJbmZvQXJyYXkuam9pbignLycpLnJlcGxhY2UoJyMnLCAnJyk7XHJcblx0fTtcclxuXHJcblx0X3VwZGF0ZSgpIHtcclxuXHRcdHRoaXMuX3VwZGF0ZUluZm8oKTtcclxuXHRcdHRoaXMuX3VwZGF0ZUV4dHJhSW5mbygpO1xyXG5cdH07XHJcblxyXG5cdF91cGRhdGVJbmZvKCkge1xyXG5cdFx0Y29uc3QgdGhhdCA9IHRoaXM7XHJcblx0XHRjb25zdCBJbmZvT2JqZWN0ID0ge1xyXG5cdFx0XHQnYic6IG51bGwsIC8v6IOM5pmv6ImyaGV45YC8XHJcblx0XHRcdCdyJzogJy0xJywgLy/mj5DphpLmlrnlvI9cclxuXHRcdFx0J2MnOiAnMCcsIC8v57uT5p2f5o+Q6YaS5L+h5oGvXHJcblx0XHRcdCdjaSc6IDAgLy/og4zmma/oibJJRO+8jOm7mOiupCAwIOihqOekuuiDjOaZr+S4uueUqOaIt+iHquWumuS5iVxyXG5cdFx0fTtcclxuXHRcdC8vIOabtOaWsOiDjOaZr+iJsidiJ1xyXG5cdFx0SW5mb09iamVjdFsnYiddID0gdGhpcy5iYWNrZ3JvdW5kQ29sb3IucmVwbGFjZSgnIycsICcnKTtcclxuXHRcdC8vIOabtOaWsOminOiJsuaMh+aVsCdjaSdcclxuXHRcdENvbmZpZy5jb2xvckl0ZW1zLmZvckVhY2goZnVuY3Rpb24oaXRlbSwgaW5kZXgsIGFycil7XHJcblx0XHRcdGlmICggaXRlbS5jb2xvclZhbHVlID09ICB0aGF0LmJhY2tncm91bmRDb2xvciApIHtcclxuXHRcdFx0XHQvLyDlvZPml6XnqIvog4zmma/oibLkuI7oibLooajljLnphY3ml7bliJnnlKggY29sb3IgaWRleCDmnaXlgqjlrZjvvIjlhbzlrrnljp/niYjml6Xljobmj5Lku7bvvIlcclxuXHRcdFx0XHRJbmZvT2JqZWN0WydjaSddID0gaW5kZXg7XHJcblx0XHRcdH07XHJcblx0XHR9KTtcclxuXHRcdC8vIOW6lOeUqOabtOaWsFxyXG5cdFx0dGhpcy5fSW5mbyA9IEluZm9PYmplY3Q7XHJcblx0fTtcclxuXHJcblx0X2dldERlZmF1bHRFeHRyYUluZm8oKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHQnQ29tcGxldGUnOiAwLCAvL1xyXG5cdFx0XHQnRGF0ZUNvbXBsZXRlZCc6ICcnLCAvLyBJU08g5qCH5YeG5pel5pyf5a2X56ym5LiyIFlZWVktTU0tREQgMDA6MDA6MDBcclxuXHRcdFx0J1ByaW9yJzogMFxyXG5cdFx0fTtcclxuXHR9O1xyXG5cclxuXHRfdXBkYXRlRXh0cmFJbmZvKCkge1xyXG5cdFx0Y29uc3QgRXh0cmFJbmZvT2JqZWN0ID0ge1xyXG5cdFx0XHQnQ29tcGxldGUnOiAwLFxyXG5cdFx0XHQnRGF0ZUNvbXBsZXRlZCc6ICcnLFxyXG5cdFx0XHQnUHJpb3InOiAwXHJcblx0XHR9O1xyXG5cdFx0RXh0cmFJbmZvT2JqZWN0WydDb21wbGV0ZSddID0gdGhpcy5jb21wbGV0ZTtcclxuXHRcdEV4dHJhSW5mb09iamVjdFsnRGF0ZUNvbXBsZXRlZCddID0gdGhpcy5kYXRlQ29tcGxldGVkO1xyXG5cdFx0dGhpcy5fRXh0cmFJbmZvID0gRXh0cmFJbmZvT2JqZWN0O1xyXG5cdH07XHJcblxyXG5cdF9nZXRFdmVudEh0bWwodGl0bGUgPSB0aGlzLnRpdGxlLCBjb250ZW50ID0gJycpe1xyXG5cdFx0Y29uc3QgaHRtbFRleHQgPSBcclxuXHRcdFx0YDxodG1sPlxyXG5cdFx0XHRcdDxoZWFkPlxyXG5cdFx0XHRcdFx0PG1ldGEgaHR0cC1lcXVpdj1cIkNvbnRlbnQtVHlwZVwiIGNvbnRlbnQ9XCJ0ZXh0L2h0bWw7IGNoYXJzZXQ9dW5pY29kZVwiPlxyXG5cdFx0XHRcdFx0PHRpdGxlPiR7dGl0bGV9PC90aXRsZT4gXHJcblx0XHRcdFx0PC9oZWFkPlxyXG5cdFx0XHRcdDxib2R5PlxyXG5cdFx0XHRcdFx0PCEtLVdpekh0bWxDb250ZW50QmVnaW4tLT5cclxuXHRcdFx0XHRcdDxkaXY+JHtjb250ZW50fTwvZGl2PlxyXG5cdFx0XHRcdFx0PCEtLVdpekh0bWxDb250ZW50RW5kLS0+XHJcblx0XHRcdFx0PC9ib2R5PlxyXG5cdFx0XHQ8L2h0bWw+YDtcclxuXHRcclxuXHRcdCAgcmV0dXJuIGh0bWxUZXh0XHJcblx0fTtcclxuXHJcblx0LyoqXHJcbiAgICAgKiDmoLnmja7ml6XnqIvnmoTph43lpI3op4TliJnnlJ/miJAgRnVsbENhbGVuZGFyIGV2ZW50U291cmNlLlxyXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBzdGFydCDmn6Xor6Lotbflp4vvvIxJU08g5qCH5YeG5pel5pyf5a2X56ym5LiyLlxyXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBlbmQg5p+l6K+i57uT5p2f77yMSVNPIOagh+WHhuaXpeacn+Wtl+espuS4si5cclxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IGV2ZW50U291cmNlLlxyXG4gICAgICovXHJcblx0Z2VuZXJhdGVSZXBlYXRFdmVudHMoc3RhcnQsIGVuZCkge1xyXG5cdFx0aWYgKCAhdGhpcy5ycHRSdWxlICkgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgZmluZCBDYWxlbmRhckV2ZW50IHJlcGVhdCBydWxlLicpO1xyXG5cdFx0Y29uc3QgZXZlbnRTb3VyY2UgPSB7XHJcblx0XHRcdGlkOiB0aGlzLmlkLFxyXG5cdFx0XHRldmVudHM6IFtdXHJcblx0XHR9XHJcblx0XHQvL+agueaNrnJwdFJ1bGXnlJ/miJDph43lpI3ml6XmnJ/vvIzlubbnlJ/miJDkuovku7ZcclxuXHRcdGNvbnN0IGRheUFycmF5ID0gdGhpcy5fZ2V0UmVuZGVyUmVwZWF0RGF5KHN0YXJ0LCBlbmQpO1xyXG5cdFx0Zm9yICggbGV0IGRheSBvZiBkYXlBcnJheSApIHtcclxuXHRcdFx0Ly8gZGF5IOaYr+S4gOS4qk1vbWVudOaXpeacn+WvueixoVxyXG5cdFx0XHRjb25zdCBuZXdFdmVudCA9IHRoaXMudG9GdWxsQ2FsZW5kYXJFdmVudCgpO1xyXG5cdFx0XHRuZXdFdmVudC5zdGFydCA9IGRheS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0bmV3RXZlbnQuZW5kID0gbW9tZW50KG5ld0V2ZW50LmVuZCkuYWRkKCBkYXkuZGlmZiggbW9tZW50KHRoaXMuc3RhcnQpICkgKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0ZXZlbnRTb3VyY2UuZXZlbnRzLnB1c2gobmV3RXZlbnQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBldmVudFNvdXJjZTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuICAgICAqIOagueaNruinhOWImeeUn+aIkOaXpeacn+aVsOe7hFxyXG4gICAgICogQHJldHVybnMge09iamVjdFtdfSDljIXlkKvkuIDns7vliJdgTW9tZW50YOaXpeacn+WvueixoeeahOaVsOe7hC5cclxuICAgICAqL1xyXG5cdF9nZXRSZW5kZXJSZXBlYXREYXkoc3RhcnQsIGVuZCkge1xyXG5cdFx0Y29uc3QgcnB0UnVsZSA9IHRoaXMucnB0UnVsZTtcclxuXHRcdGxldCBkYXlBcnJheTtcclxuXHRcdGxldCByZWdleDtcclxuXHRcdGNvbnNvbGUuY291bnQocnB0UnVsZSk7XHJcblx0XHRpZiAoIChyZWdleCA9IC9eRXZlcnkoXFxkKT9XZWVrcz8oXFxkKikkLykudGVzdChycHRSdWxlKSApIHtcclxuXHRcdFx0Ly8g5q+PWzEyMzRd5ZGoWzcxMjM0NTZdXHJcblx0XHRcdGNvbnN0IGN1cldlZWtEYXkgPSBtb21lbnQodGhpcy5zdGFydCkuZGF5KCk7XHJcblx0XHRcdGNvbnN0IHJlc3VsdHMgPSByZWdleC5leGVjKHJwdFJ1bGUpO1xyXG5cdFx0XHRjb25zdCBpbnRlcldlZWsgPSByZXN1bHRzWzFdO1xyXG5cdFx0XHRjb25zdCBudW1iZXIgPSByZXN1bHRzWzJdIHx8IGAke2N1cldlZWtEYXl9YDtcclxuXHRcdFx0ZGF5QXJyYXkgPSB0aGlzLl9nZXRXZWVrbHlSZXBlYXREYXkobnVtYmVyLCBzdGFydCwgZW5kLCBpbnRlcldlZWspO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoIChyZWdleCA9IC9eRXZlcnlXZWVrZGF5KFxcZCopJC8pLnRlc3QocnB0UnVsZSkgKSB7XHJcblx0XHRcdC8vIOavj+S4quW3peS9nOaXpUV2ZXJ5V2Vla2RheTEzNVxyXG5cdFx0XHRjb25zdCByZXN1bHRzID0gcmVnZXguZXhlYyhycHRSdWxlKTtcclxuXHRcdFx0Y29uc3QgbnVtYmVyID0gcmVzdWx0c1sxXSB8fCAnMTIzNDUnO1xyXG5cdFx0XHRkYXlBcnJheSA9IHRoaXMuX2dldFdlZWtseVJlcGVhdERheShudW1iZXIsIHN0YXJ0LCBlbmQpO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoIChyZWdleCA9IC9EYWlseXxXZWVrbHl8TW9udGhseXxZZWFybHkvKS50ZXN0KHJwdFJ1bGUpICkge1xyXG5cdFx0XHQvLyBEYWlseXxXZWVrbHl8TW9udGhseXxZZWFybHlcclxuXHRcdFx0Y29uc3QgcGVyUnVsZSA9IHJlZ2V4LmV4ZWMocnB0UnVsZSlbMF1cclxuXHRcdFx0ZGF5QXJyYXkgPSB0aGlzLl9nZXRQZXJSZXBlYXREYXlzKHN0YXJ0LCBlbmQsIHBlclJ1bGUpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZGF5QXJyYXk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcbiAgICAgKiDmoLnmja7mr4/lkajop4TliJnnlJ/miJDml6XmnJ/mlbDnu4RcclxuXHQgKiBAcGFyYW0ge1N0cmluZ30gbnVtYmVyIOaVtOaVsOWtl+espuS4suihqOekuueahOinhOWIme+8m1xyXG4gICAgICogQHJldHVybnMge09iamVjdFtdfSDljIXlkKvkuIDns7vliJdNb21lbnTml6XmnJ/lr7nosaHnmoTmlbDnu4QuXHJcbiAgICAgKi9cclxuXHRfZ2V0V2Vla2x5UmVwZWF0RGF5KG51bWJlciwgc3RhcnQsIGVuZCwgaW50ZXJXZWVrcyA9ICcxJykge1xyXG5cdFx0Ly/ov5Tlm55be3N0YXJ0LCBlbmR9LCB7c3RhcnQsIGVuZH0sIHtzdGFydCwgZW5kfV1cclxuXHRcdC8v6ICD6JmR5riy5p+T6IyD5Zu077yM5Lul5Y+K57uT5p2f5b6q546v55qE5pel5pyfXHJcblx0XHRjb25zdCB2aWV3U3RhcnQgPSBtb21lbnQodGhpcy5zdGFydCk7XHJcblx0XHRjb25zdCB2aWV3RW5kID0gbW9tZW50KGVuZCk7XHJcblx0XHRjb25zdCBycHRFbmQgPSB0aGlzLnJwdEVuZCA/IG1vbWVudCh0aGlzLnJwdEVuZCkgOiB2aWV3RW5kO1xyXG5cdFx0bGV0IGRheUFycmF5ID0gW107XHJcblx0XHRjb25zdCBpbnRlcnZhbFdlZWtzID0gaW50ZXJXZWVrcyA/IHBhcnNlSW50KGludGVyV2Vla3MpIDogMTtcclxuXHRcdGNvbnN0IHdlZWtkYXlzID0gbnVtYmVyLnJlcGxhY2UoJzcnLCAnMCcpLnNwbGl0KCcnKTsgLy/lkajml6Uwfjblkajlha1cclxuXHRcdGZvciAoIGxldCBkYXkgb2Ygd2Vla2RheXMgKSB7XHJcblx0XHRcdC8vXHJcblx0XHRcdGxldCBjdXJXZWVrRGF5ID0gcGFyc2VJbnQoZGF5KSwgbmV3RXZlbnRTdGFydERhdGUgPSBtb21lbnQodmlld1N0YXJ0KTtcclxuXHRcdFx0ZG8ge1xyXG5cdFx0XHRcdC8vIOWIm+W7uuaWsE1vbWVudOWvueixoVxyXG5cdFx0XHRcdG5ld0V2ZW50U3RhcnREYXRlID0gbW9tZW50KHZpZXdTdGFydCkuZGF5KGN1cldlZWtEYXkpO1xyXG5cdFx0XHRcdC8vIOagueaNruaXpeeoi+iuvue9rnRpbWUgcGFydFxyXG5cdFx0XHRcdGNvbnN0IGV2ZW50U3RhcnQgPSBtb21lbnQodGhpcy5zdGFydClcclxuXHRcdFx0XHRuZXdFdmVudFN0YXJ0RGF0ZS5zZXQoe1xyXG5cdFx0XHRcdFx0J2hvdXInOiBldmVudFN0YXJ0LmdldCgnaG91cicpLFxyXG5cdFx0XHRcdFx0J21pbnV0ZSc6IGV2ZW50U3RhcnQuZ2V0KCdtaW51dGUnKSxcclxuXHRcdFx0XHRcdCdzZWNvbmQnOiBldmVudFN0YXJ0LmdldCgnc2Vjb25kJylcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC8vIOmBv+WFjeWIneWni+mHjeWkjea4suafk1xyXG5cdFx0XHRcdGlmICggIW5ld0V2ZW50U3RhcnREYXRlLmlzU2FtZSggZXZlbnRTdGFydCApICkgZGF5QXJyYXkucHVzaCggbW9tZW50KG5ld0V2ZW50U3RhcnREYXRlKSApO1xyXG5cdFx0XHRcdC8vIOmalOWkmuWwkeWRqOmHjeWkjVxyXG5cdFx0XHRcdGN1cldlZWtEYXkgKz0gNyppbnRlcnZhbFdlZWtzO1xyXG5cdFx0XHRcdC8vY29uc29sZS5sb2coIG1vbWVudChuZXdFdmVudFN0YXJ0RGF0ZSkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJykgKTtcclxuXHRcdFx0fSB3aGlsZSAoIG1vbWVudCh2aWV3U3RhcnQpLmRheShjdXJXZWVrRGF5ICsgNyApLmlzQmVmb3JlKCB2aWV3RW5kICkgXHJcblx0XHRcdFx0XHRcdCYmIG1vbWVudCh2aWV3U3RhcnQpLmRheShjdXJXZWVrRGF5ICsgNyApLmlzQmVmb3JlKCBycHRFbmQgKSAgKVxyXG5cdFx0XHRcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIGRheUFycmF5O1xyXG5cdH07XHJcblxyXG5cdF9nZXRQZXJSZXBlYXREYXlzKHN0YXJ0LCBlbmQsIHBlclJ1bGUpIHtcclxuXHRcdGNvbnN0IHBlclJ1bGVNYXAgPSB7XHJcblx0XHRcdCdEYWlseSc6ICdkYXlzJyxcclxuXHRcdFx0J1dlZWtseScgOiAnd2Vla3MnLFxyXG5cdFx0XHQnTW9udGhseScgOiAnbW9udGhzJyxcclxuXHRcdFx0J1llYXJseScgOiAneWVhcnMnXHJcblx0XHR9O1xyXG5cdFx0Y29uc3Qgdmlld1N0YXJ0ID0gbW9tZW50KHRoaXMuc3RhcnQpO1xyXG5cdFx0Y29uc3Qgdmlld0VuZCA9IG1vbWVudChlbmQpO1xyXG5cdFx0Y29uc3QgcnB0RW5kID0gdGhpcy5ycHRFbmQgPyBtb21lbnQodGhpcy5ycHRFbmQpIDogdmlld0VuZDtcclxuXHRcdGxldCBkYXlBcnJheSA9IFtdO1xyXG5cdFx0Y29uc3QgZXZlbnRTdGFydCA9IG1vbWVudCh0aGlzLnN0YXJ0KVxyXG5cdFx0ZG8ge1xyXG5cdFx0XHQvLyDlop7liqDkuIDkuKrmnIhcclxuXHRcdFx0ZXZlbnRTdGFydC5hZGQoMSwgcGVyUnVsZU1hcFtwZXJSdWxlXSk7XHJcblx0XHRcdGRheUFycmF5LnB1c2goIG1vbWVudChldmVudFN0YXJ0KSApO1xyXG5cdFx0fSB3aGlsZSAoIGV2ZW50U3RhcnQuaXNCZWZvcmUoIHZpZXdFbmQgKSAmJiBldmVudFN0YXJ0LmlzQmVmb3JlKCBycHRFbmQgKSApO1xyXG5cclxuXHRcdHJldHVybiBkYXlBcnJheTtcclxuXHR9XHJcblxyXG5cdHRvRnVsbENhbGVuZGFyRXZlbnQoKSB7XHJcblx0XHQvLyDms6jmhI/mlrnms5Xov5Tlm57nmoTlj6rmmK9GdWxsQ2FsZW5kYXJFdmVudOeahOaVsOaNruexu+Wei++8jOW5tuS4jeaYr2V2ZW505a+56LGhXHJcblx0XHRjb25zdCB0aGF0ID0gdGhpcztcclxuXHRcdGNvbnN0IG5ld0V2ZW50ID0ge307XHJcblx0XHRjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGhpcyk7XHJcblx0XHQvLyDljrvpmaTpnZ7lv4XopoHlsZ7mgKdcclxuXHRcdGtleXMuc3BsaWNlKCBrZXlzLmZpbmRJbmRleCggKGkpID0+IGkgPT0gJ19JbmZvJyApLCAxKTtcclxuXHRcdGtleXMuc3BsaWNlKCBrZXlzLmZpbmRJbmRleCggKGkpID0+IGkgPT0gJ19FeHRyYUluZm8nICksIDEpO1xyXG5cdFx0Ly8g5rWF5ou36LSdLCDkuI3ov4fkuLvopoHlsZ7mgKfpg73mmK/ln7rmnKzmlbDmja7nsbvlnovvvIzmiYDku6XkuI3lrZjlnKjlvJXnlKjpl67pophcclxuXHRcdGtleXMuZm9yRWFjaChmdW5jdGlvbihpdGVtLCBpbmRleCwgYXJyKXtcclxuXHRcdFx0bmV3RXZlbnRbaXRlbV0gPSB0aGF0W2l0ZW1dO1xyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gbmV3RXZlbnQ7XHJcblx0fTtcclxuXHJcblx0dG9XaXpFdmVudERhdGEoKSB7XHJcblx0XHR0aGlzLl91cGRhdGUoKTtcclxuXHRcdGNvbnN0IG5ld0V2ZW50ID0ge307XHJcblx0XHRuZXdFdmVudC50aXRsZSA9IHRoaXMudGl0bGU7XHJcblx0XHRuZXdFdmVudC5ndWlkID0gdGhpcy5pZDtcclxuXHRcdG5ld0V2ZW50LkNBTEVOREFSX1NUQVJUID0gdGhpcy5hbGxEYXkgPyBtb21lbnQodGhpcy5zdGFydCkuZm9ybWF0KCdZWVlZLU1NLUREIDAwOjAwOjAwJykgOiB0aGlzLnN0YXJ0O1xyXG5cdFx0bmV3RXZlbnQuQ0FMRU5EQVJfRU5EID0gdGhpcy5hbGxEYXkgPyBtb21lbnQodGhpcy5lbmQpLmZvcm1hdCgnWVlZWS1NTS1ERCAyMzo1OTo1OScpIDogdGhpcy5lbmQ7XHJcblx0XHRuZXdFdmVudC5DQUxFTkRBUl9JTkZPID0gdGhpcy5fc3RyaW5naWZ5SW5mbyh0aGlzLl9JbmZvKTtcclxuXHRcdG5ld0V2ZW50LkNBTEVOREFSX0VYVFJBSU5GTyA9IHRoaXMuX3N0cmluZ2lmeUluZm8odGhpcy5fRXh0cmFJbmZvKTtcclxuXHRcdG5ld0V2ZW50LmNyZWF0ZWQgPSB0aGlzLmNyZWF0ZWQ7XHJcblx0XHRuZXdFdmVudC51cGRhdGVkID0gdGhpcy51cGRhdGVkO1xyXG5cdFx0cmV0dXJuIG5ld0V2ZW50O1xyXG5cdH07XHJcblxyXG5cdGFkZFRvRnVsbENhbGVuZGFyKCkge1xyXG5cdFx0Ly9UT0RPOiDlsIboh6rouqvmt7vliqDliLBGdWxsQ2FsZW5kYXJcclxuXHRcdHRoaXMuJGNhbGVuZGFyLmZ1bGxDYWxlbmRhciggJ2FkZEV2ZW50U291cmNlJywge1xyXG5cdFx0XHRldmVudHM6IFtcclxuXHRcdFx0XHR0aGlzLnRvRnVsbENhbGVuZGFyRXZlbnQoKVxyXG5cdFx0XHRdXHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRfc2F2ZUFsbFByb3AoKSB7XHJcblx0XHQvL1RPRE86IOS/neWtmOWFqOmDqOaVsOaNruWMheaLrFRpdGxlXHJcblx0XHQvLyDmm7TmlrDkuovku7bmlofmoaPmlbDmja5cclxuXHRcdGNvbnN0IGRvYyA9IGdfZGIuRG9jdW1lbnRGcm9tR1VJRCh0aGlzLmlkKTtcclxuXHRcdC8vIOS/neWtmOagh+mimFxyXG5cdFx0ZG9jLlRpdGxlID0gdGhpcy50aXRsZTtcclxuXHRcdC8vIOS/neWtmOaXtumXtOaVsOaNrlxyXG5cdFx0aWYgKCB0aGlzLmFsbERheSApIHtcclxuXHRcdFx0bGV0IHN0YXJ0U3RyID0gbW9tZW50KHRoaXMuc3RhcnQpLnNldCh7J2gnOiAwLCAnbSc6IDAsICdzJzogMH0pLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHRsZXQgZW5kU3RyID0gbW9tZW50KHRoaXMuZW5kKS5zZXQoeydoJzogMjMsICdtJzogNTksICdzJzogNTl9KS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfU1RBUlRcIiwgc3RhcnRTdHIpO1xyXG5cdFx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9FTkRcIiwgZW5kU3RyKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGxldCBzdGFydFN0ciA9IG1vbWVudCh0aGlzLnN0YXJ0KS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0bGV0IGVuZFN0ciA9IG1vbWVudCh0aGlzLmVuZCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX1NUQVJUXCIsIHN0YXJ0U3RyKTtcclxuXHRcdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfRU5EXCIsIGVuZFN0cik7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8g5L+d5a2YIENBTEVOREFSX0lORk9cclxuXHRcdHRoaXMuX3VwZGF0ZSgpO1xyXG5cdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfSU5GT1wiLCB0aGlzLl9zdHJpbmdpZnlJbmZvKHRoaXMuX0luZm8pKTtcclxuXHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX0VYVFJBSU5GT1wiLCB0aGlzLl9zdHJpbmdpZnlJbmZvKHRoaXMuX0V4dHJhSW5mbykpO1xyXG5cdH07XHJcblxyXG5cdC8vIOiuvue9ruaWh+aho+WxnuaAp+WAvFxyXG5cdF9zZXRQYXJhbVZhbHVlKGRvYywga2V5LCB2YWx1ZSkge1xyXG5cdFx0aWYgKCFkb2MpIHJldHVybiBmYWxzZTtcclxuXHRcdGRvYy5TZXRQYXJhbVZhbHVlKGtleSwgdmFsdWUpO1xyXG5cdH07XHJcblxyXG5cdF9jcmVhdGVXaXpFdmVudERvYygpIHtcclxuXHRcdC8vVE9ETzog5L+d5a2Y5YWo6YOo5pWw5o2u5YyF5ousVGl0bGVcclxuXHRcdC8vIOWIm+W7uldpekRvY1xyXG5cdFx0Y29uc3QgbG9jYXRpb24gPSBgTXkgRXZlbnRzLyR7IG1vbWVudCh0aGlzLnN0YXJ0KS5mb3JtYXQoJ1lZWVktTU0nKSB9L2A7XHJcblx0XHRjb25zdCBvYmpGb2xkZXIgPSBnX2RiLkdldEZvbGRlckJ5TG9jYXRpb24obG9jYXRpb24sIHRydWUpO1xyXG5cdFx0Y29uc3QgdGVtcEh0bWwgPSBnX2Ntbi5HZXRBVGVtcEZpbGVOYW1lKCcuaHRtbCcpO1xyXG5cdFx0Y29uc3QgaHRtbFRleHQgPSB0aGlzLl9nZXRFdmVudEh0bWwodGhpcy50aXRsZSwgJycpO1xyXG5cdFx0Z19jbW4uU2F2ZVRleHRUb0ZpbGUodGVtcEh0bWwsIGh0bWxUZXh0LCAndW5pY29kZScpO1xyXG5cdFx0Y29uc3QgZG9jID0gb2JqRm9sZGVyLkNyZWF0ZURvY3VtZW50Mih0aGlzLnRpdGxlLCBcIlwiKTtcclxuXHRcdGRvYy5DaGFuZ2VUaXRsZUFuZEZpbGVOYW1lKHRoaXMudGl0bGUpO1xyXG5cdFx0ZG9jLlVwZGF0ZURvY3VtZW50Nih0ZW1wSHRtbCwgdGVtcEh0bWwsIDB4MjIpO1xyXG5cdFx0Ly8g6K6+572u5qCH562+XHJcblx0XHQvL2lmICggdGFncyApIGRvYy5TZXRUYWdzVGV4dDIodGFncywgXCJDYWxlbmRhclwiKTtcclxuXHRcdC8vIOWwhuS/oeaBr+e8lueggeWIsFdpekRvY+WxnuaAp+S4reWOu1xyXG5cdFx0Y29uc3QgbmV3RXZlbnQgPSB0aGlzLnRvV2l6RXZlbnREYXRhKCk7XHJcblx0XHRkb2MuQWRkVG9DYWxlbmRhcihuZXdFdmVudC5DQUxFTkRBUl9TVEFSVCwgbmV3RXZlbnQuQ0FMRU5EQVJfRU5ELCBuZXdFdmVudC5DQUxFTkRBUl9JTkZPKTtcclxuXHRcdC8vIGNoYW5nZSBkYXRhYmFzZVxyXG5cdFx0ZG9jLnR5cGUgPSBcImV2ZW50XCI7XHJcblx0XHQvL1xyXG5cdFx0dGhpcy5pZCA9IGRvYy5HVUlEO1xyXG5cdH1cclxuXHJcblx0c2F2ZVRvV2l6RXZlbnREb2MoIHByb3AgPSAnYWxsJyApIHtcclxuXHRcdGlmICghZ19kYiB8fCAhZ19jbW4pIHRocm93IG5ldyBFcnJvcignSVdpekRhdGFiYXNlIG9yIElXaXpDb21tb25VSSBpcyBub3QgdmFsaWQuJyk7XHJcblx0XHQvL+ajgOafpeaWh+aho+aYr+WQpuWtmOWcqFxyXG5cdFx0Y29uc3QgZ3VpZFJlZ2V4ID0gL15bMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfSQvaTtcclxuXHRcdGNvbnN0IGlzV2l6RG9jRXhpc3QgPSBndWlkUmVnZXgudGVzdCh0aGlzLmlkKTtcclxuXHRcdC8vIOWIm+W7uuaIluiAheabtOaWsOaWh+aho1xyXG5cdFx0aWYgKCBpc1dpekRvY0V4aXN0ICkge1xyXG5cdFx0XHQvLyDmoLnmja7mjIfku6Tmm7TmlrDlhoXlrrlcclxuXHRcdFx0dGhpcy5fc2F2ZUFsbFByb3AoKTtcclxuXHRcdFx0Ly8g5pu05pawRnVsbENhbGVuZGFyXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQvLyDliJvlu7rmlrDnmoTkuovku7bmlofmoaNcclxuXHRcdFx0dGhpcy5fY3JlYXRlV2l6RXZlbnREb2MoKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdH07XHJcblxyXG5cdGRlbGV0ZUV2ZW50RGF0YSggaXNEZWxldGVEb2MgPSBmYWxzZSApe1xyXG5cdFx0bGV0IGRvYyA9IGdfZGIuRG9jdW1lbnRGcm9tR1VJRCh0aGlzLmlkKTtcclxuXHRcdGlmICghZG9jKSB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgZmluZCBFdmVudCByZWxhdGVkIFdpekRvY3VtZW50LicpXHJcblx0XHQvLyDnp7vpmaRGdWxsQ2FsZW5kYXLkuovku7ZcclxuXHRcdHRoaXMuJGNhbGVuZGFyLmZ1bGxDYWxlbmRhcigncmVtb3ZlRXZlbnRzJywgdGhpcy5pZCk7XHJcblx0XHQvLyDnp7vpmaTml6XljobmlbDmja5cclxuXHRcdGRvYy5SZW1vdmVGcm9tQ2FsZW5kYXIoKTtcclxuXHRcdC8vIOWIoOmZpOaWh+aho1xyXG5cdFx0aWYgKCBpc0RlbGV0ZURvYyApIGRvYy5EZWxldGUoKTtcclxuXHR9XHJcblxyXG5cdHJlZmV0Y2hEYXRhKCkge1xyXG5cdFx0Ly9UT0RPOiDph43mlbDmja7lupPph43mlrDojrflj5bmlbDmja7mm7TmlrDlrp7kvotcclxuXHR9O1xyXG5cclxuXHRyZWZyZXNoRXZlbnQoZXZlbnQpIHtcclxuXHRcdC8vVE9ETzog5bqU6K+l6Ieq5Yqo6YGN5Y6G5bm25L+u5pS55bGe5oCnXHJcblx0XHRpZiAoIGV2ZW50ICkge1xyXG5cdFx0XHQvLyDph43mlrDmuLLmn5NGdWxsQ2FsZW5kYXLkuovku7ZcclxuXHRcdFx0ZXZlbnQudGl0bGUgPSB0aGlzLnRpdGxlO1xyXG5cdFx0XHRldmVudC5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmJhY2tncm91bmRDb2xvcjtcclxuXHRcdFx0dGhpcy4kY2FsZW5kYXIuZnVsbENhbGVuZGFyKCd1cGRhdGVFdmVudCcsIGV2ZW50KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdC8v55SoLmZ1bGxDYWxlbmRhcigg4oCYY2xpZW50RXZlbnRz4oCZIFssIGlkT3JGaWx0ZXIgXSApIC0+IEFycmF5IOiOt+WPlua6kOaVsOaNruS7juiAjOabtOaWsFxyXG5cdFx0XHQvL1RPRE86IOmBjeWOhuW5tuWvu+aJvkdVSUTljLnphY3nmoTkuovku7ZcclxuXHRcdH1cclxuXHR9XHJcblxyXG59IiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcclxuaW1wb3J0IFdpekV2ZW50RGF0YUxvYWRlciBmcm9tICcuL1dpekV2ZW50RGF0YUxvYWRlcic7XHJcbmltcG9ydCBDYWxlbmRhckV2ZW50IGZyb20gJy4vQ2FsZW5kYXJFdmVudCc7XHJcbmltcG9ydCB7IFdpekNvbmZpcm0sIFdpekNvbW1vblVJIGFzIG9iakNvbW1vbiwgV2l6RGF0YWJhc2UgYXMgb2JqRGF0YWJhc2UsIFdpekV4cGxvcmVyV2luZG93IGFzIG9ialdpbmRvdyB9IGZyb20gJy4uL3V0aWxzL1dpekludGVyZmFjZSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtSGFuZGxlcyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLiRjYWxlbmRhciA9ICQoJyNjYWxlbmRhcicpXHJcbiAgICB9O1xyXG5cclxuICAgIG9uQ3JlYXRlQnRuQ2xpY2soc3RhcnQsIGVuZCwganNFdmVudCwgdmlldywgZm9ybU5vZGUpIHtcclxuICAgICAgICBjb25zdCB0aXRsZSA9ICQoZm9ybU5vZGUpLmZpbmQoJyN0Yy1jcmVhdGVwYWdlLWV2ZW50dGl0bGUnKS52YWwoKTtcclxuICAgICAgICBjb25zdCBjb2xvciA9ICQoZm9ybU5vZGUpLmZpbmQoJyN0Yy1jcmVhdGVwYWdlLWV2ZW50Y29sb3InKS52YWwoKTtcclxuICAgICAgICBuZXcgV2l6RXZlbnREYXRhTG9hZGVyKCkuY3JlYXRlRXZlbnQoe3N0YXJ0LCBlbmQsIGpzRXZlbnQsIHZpZXd9LCB7dGl0bGUsIGNvbG9yfSk7IC8vIOi/meS4gOatpeiAl+aXtlxyXG4gICAgICAgICQoZm9ybU5vZGUpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgJCgnI2NhbGVuZGFyJykuZnVsbENhbGVuZGFyKCd1bnNlbGVjdCcpO1xyXG4gICAgfTtcclxuXHJcbiAgICBvblNhdmVCdG5DbGljayhldmVudCwgbmV3RXZlbnREYXRhKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBwcm9wIGluIG5ld0V2ZW50RGF0YSkge1xyXG4gICAgICAgICAgICBldmVudFtwcm9wXSA9IG5ld0V2ZW50RGF0YVtwcm9wXVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDph43mlrDmuLLmn5NcclxuICAgICAgICB0aGlzLiRjYWxlbmRhci5mdWxsQ2FsZW5kYXIoICd1cGRhdGVFdmVudCcsIGV2ZW50ICk7XHJcbiAgICAgICAgLy8g5L+u5pS55rqQ5pWw5o2uXHJcbiAgICAgICAgY29uc3QgbmV3RXZlbnQgPSBuZXcgQ2FsZW5kYXJFdmVudChldmVudCk7XHJcbiAgICAgICAgbmV3RXZlbnQuc2F2ZVRvV2l6RXZlbnREb2MoKTtcclxuICAgIH07XHJcblxyXG4gICAgb25Db21wbGV0ZUJ0bkNsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgLy8g5L+u5pS55pWw5o2uXHJcbiAgICAgICAgY29uc3QgaXNDb21wbGV0ZSA9IHBhcnNlSW50KGV2ZW50LmNvbXBsZXRlKSA9PSA1O1xyXG4gICAgICAgIGlmICggaXNDb21wbGV0ZSApIHtcclxuICAgICAgICAgICAgZXZlbnQuY29tcGxldGUgPSAnMCc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZXZlbnQuY29tcGxldGUgPSAnNSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOS/neWtmOaVsOaNrlxyXG4gICAgICAgIGNvbnN0IG5ld0V2ZW50ID0gbmV3IENhbGVuZGFyRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgIG5ld0V2ZW50LnNhdmVUb1dpekV2ZW50RG9jKCk7XHJcbiAgICAgICAgLy8g6YeN5paw5riy5p+TXHJcbiAgICAgICAgdGhpcy4kY2FsZW5kYXIuZnVsbENhbGVuZGFyKCAndXBkYXRlRXZlbnQnLCBldmVudCApO1xyXG4gICAgfTtcclxuXHJcbiAgICBvbkRlbGV0ZURhdGFCdG5DbGljayhldmVudCkge1xyXG4gICAgICAgIGlmICggV2l6Q29uZmlybShcIuehruWumuimgeWIoOmZpOivpeaXpeeoi++8n1wiLCAn55Wq6IyE5Yqp55CGJykgKSB7XHJcbiAgICAgICAgICAgIC8vIOWIoOmZpOaXpeeoi1xyXG4gICAgICAgICAgICBsZXQgbmV3RXZlbnQgPSBuZXcgQ2FsZW5kYXJFdmVudChldmVudCk7XHJcbiAgICAgICAgICAgIG5ld0V2ZW50LmRlbGV0ZUV2ZW50RGF0YShmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBvbkRlbGV0ZURvY0J0bkNsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCBXaXpDb25maXJtKFwi56Gu5a6a6KaB5Yig6Zmk6K+l5pel56iL5rqQ5paH5qGj77yfXFxu44CM56Gu5a6a44CN5bCG5Lya5a+86Ie055u45YWz56yU6K6w6KKr5Yig6Zmk77yBXCIsICfnlarojITliqnnkIYnKSApIHtcclxuICAgICAgICAgICAgbGV0IG5ld0V2ZW50ID0gbmV3IENhbGVuZGFyRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgICAgICBuZXdFdmVudC5kZWxldGVFdmVudERhdGEodHJ1ZSk7XHJcbiAgICAgICAgfVx0XHJcbiAgICB9O1xyXG5cclxuICAgIG9uRWRpdE9yaWdpbkJ0bkNsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgY29uc3QgZG9jID0gb2JqRGF0YWJhc2UuRG9jdW1lbnRGcm9tR1VJRChldmVudC5pZCk7XHJcbiAgICAgICAgb2JqQ29tbW9uLkVkaXRDYWxlbmRhckV2ZW50KGRvYyk7XHJcbiAgICB9O1xyXG5cclxuICAgIG9uT3BlbkRvY0J0bkNsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgY29uc3QgZG9jID0gb2JqRGF0YWJhc2UuRG9jdW1lbnRGcm9tR1VJRChldmVudC5pZCk7XHJcbiAgICAgICAgb2JqV2luZG93LlZpZXdEb2N1bWVudChkb2MsIHRydWUpO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IFdpekRhdGFiYXNlIGFzIG9iakRhdGFiYXNlIH0gZnJvbSAnLi4vdXRpbHMvV2l6SW50ZXJmYWNlJztcclxuaW1wb3J0IENhbGVuZGFyRXZlbnQgZnJvbSAnLi9DYWxlbmRhckV2ZW50JztcclxuXHJcbi8qIOaVsOaNruiOt+WPllxyXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcbi8qKiDor6XnsbvkuI5XaXpub3Rl55qEV2l6RGF0YWJhc2XmjqXlj6PkuqTmjaLkv6Hmga/vvIzojrflj5bmlbDmja4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2l6RXZlbnREYXRhTG9hZGVyIHtcclxuXHQvKipcclxuICAgICAqIOWIm+mAoOS4gOS4quS6i+S7tuaVsOaNruWKoOi9veWZqC5cclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gc3RhcnQg5p+l6K+i6LW35aeL5pel5pyf77yMSVNP5qCH5YeG5pel5pyf5a2X56ym5LiyLlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBlbmQg5p+l6K+i5oiq6Iez5pel5pyf77yMSVNP5qCH5YeG5pel5pyf5a2X56ym5LiyLlxyXG4gICAgICovXHJcblx0Y29uc3RydWN0b3IoY2FsZW5kYXIpIHtcclxuXHRcdGlmICghb2JqRGF0YWJhc2UpIHRocm93IG5ldyBFcnJvcignV2l6RGF0YWJhc2Ugbm90IHZhbGlkICEnKTtcclxuXHRcdHRoaXMuRGF0YWJhc2UgPSBvYmpEYXRhYmFzZTtcclxuXHRcdHRoaXMudXNlck5hbWUgPSBvYmpEYXRhYmFzZS5Vc2VyTmFtZTtcclxuXHRcdHRoaXMuJGNhbGVuZGFyID0gJChjYWxlbmRhcik7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcbiAgICAgKiDojrflvpfmuLLmn5PlkI7nmoTmiYDmnIlGdWxsQ2FsZW5kYXLkuovku7YuXHJcblx0ICogQHBhcmFtIHtvYmplY3R9IHZpZXcgaXMgdGhlIFZpZXcgT2JqZWN0IG9mIEZ1bGxDYWxlbmRhciBmb3IgdGhlIG5ldyB2aWV3LlxyXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBlbGVtZW50IGlzIGEgalF1ZXJ5IGVsZW1lbnQgZm9yIHRoZSBjb250YWluZXIgb2YgdGhlIG5ldyB2aWV3LlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0W119IOi/lOWbnueUqOS6jkZ1bGxDYWxlbmRhciDmuLLmn5PnmoQgZXZlbnRTb3VyY2VzIOaVsOe7hC5cclxuICAgICAqL1xyXG5cdGdldEV2ZW50U291cmNlcyggdmlldywgZWxlbWVudCApe1xyXG5cdFx0Y29uc3Qgdmlld1N0YXJ0ID0gdmlldy5zdGFydC5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdGNvbnN0IHZpZXdFbmQgPSB2aWV3LmVuZC5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdGxldCBldmVudFNvdXJjZXMgPSBbXTtcclxuXHRcdC8v6I635Y+W5pmu6YCa5pel56iLXHJcblx0XHRjb25zdCBnZW5lcmFsRXZlbnRTb3VyY2UgPSB7XHJcblx0XHRcdHR5cGU6ICdnZW5lcmFsRXZlbnRzJyxcclxuXHRcdFx0Ly9ldmVudHM6IHRoaXMuX2dldEFsbE9yaWdpbmFsRXZlbnQoW10sIHRoaXMuX2QycyhjdXJyZW50Vmlldy5zdGFydC50b0RhdGUoKSksIHRoaXMuX2QycyhjdXJyZW50Vmlldy5lbmQudG9EYXRlKCkpKVxyXG5cdFx0XHRldmVudHM6IHRoaXMuX2dldEFsbE9yaWdpbmFsRXZlbnQodmlld1N0YXJ0LCB2aWV3RW5kKVxyXG5cdFx0fVxyXG5cdFx0ZXZlbnRTb3VyY2VzLnB1c2goZ2VuZXJhbEV2ZW50U291cmNlKTtcclxuXHRcdFxyXG5cdFx0Ly9UT0RPOiDojrflj5bph43lpI3ml6XnqItcclxuXHRcdGNvbnN0IHJlcGVhdEV2ZW50U291cmNlcyA9IHRoaXMuX2dldEFsbFJlcGVhdEV2ZW50KHZpZXdTdGFydCwgdmlld0VuZCk7XHJcblx0XHRldmVudFNvdXJjZXMgPSBldmVudFNvdXJjZXMuY29uY2F0KHJlcGVhdEV2ZW50U291cmNlcyk7XHJcblx0XHQvL1xyXG5cdFx0cmV0dXJuIGV2ZW50U291cmNlcztcclxuXHR9O1xyXG5cclxuXHQvKipcclxuICAgICAqIOS7jldpekRhdGFiYXNl5Lit6I635Y+W5omA5pyJ5pWw5o2u5paH5qGjLlxyXG5cdCAqIEBwYXJhbSB7YXJyYXl9IGV2ZW50cyDliJ3lp4vkuovku7bmlbDnu4QuXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHN0YXJ0IElTT+agh+WHhuaXpeacn+Wtl+espuS4si5cclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZW5kIElTT+agh+WHhuaXpeacn+Wtl+espuS4si5cclxuICAgICAqIEByZXR1cm4ge09iamVjdFtdfSDov5Tlm57nlKjkuo5GdWxsQ2FsZW5kYXLmuLLmn5PnmoTkuovku7bmlbDnu4QuXHJcbiAgICAgKi9cclxuXHRfZ2V0QWxsT3JpZ2luYWxFdmVudChzdGFydCwgZW5kKXtcclxuXHRcdGNvbnN0IGV2ZW50cyA9IFtdO1xyXG5cdFx0bGV0IHNxbCA9IGBET0NVTUVOVF9MT0NBVElPTiBub3QgbGlrZSAnL0RlbGV0ZWQgSXRlbXMvJScgYW5kIChLQl9HVUlEIGlzIG51bGwgb3IgS0JfR1VJRCA9ICcnKWA7XHJcblx0XHRsZXQgYW5kMSA9IGAgYW5kIERPQ1VNRU5UX0dVSUQgaW4gKHNlbGVjdCBET0NVTUVOVF9HVUlEIGZyb20gV0laX0RPQ1VNRU5UX1BBUkFNIHdoZXJlIFBBUkFNX05BTUUgPSAnQ0FMRU5EQVJfU1RBUlQnICBhbmQgIFBBUkFNX1ZBTFVFIDw9ICcke2VuZH0nIClgO1xyXG5cdFx0bGV0IGFuZDIgPSBgIGFuZCBET0NVTUVOVF9HVUlEIGluIChzZWxlY3QgRE9DVU1FTlRfR1VJRCBmcm9tIFdJWl9ET0NVTUVOVF9QQVJBTSB3aGVyZSBQQVJBTV9OQU1FID0gJ0NBTEVOREFSX0VORCcgIGFuZCAgUEFSQU1fVkFMVUUgPj0gJyR7c3RhcnR9JyApYDtcclxuXHRcdGlmIChzdGFydCkgc3FsICs9IGFuZDI7XHJcblx0XHRpZiAoZW5kKSBzcWwgKz0gYW5kMTtcclxuXHRcdGlmIChvYmpEYXRhYmFzZS5Eb2N1bWVudHNEYXRhRnJvbVNRTCkge1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdGNvbnN0IGRhdGEgPSBvYmpEYXRhYmFzZS5Eb2N1bWVudHNEYXRhRnJvbVNRTChzcWwpO1xyXG5cdFx0XHRcdGlmICggIWRhdGEgKSByZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0Y29uc3Qgb2JqID0gSlNPTi5wYXJzZShkYXRhKTtcclxuXHRcdFx0XHRpZiAoICFvYmogfHwgIUFycmF5LmlzQXJyYXkob2JqKSApIHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkgKyspIHtcclxuXHRcdFx0XHRcdGV2ZW50cy5wdXNoKFxyXG5cdFx0XHRcdFx0XHRuZXcgQ2FsZW5kYXJFdmVudChvYmpbaV0sIHRoaXMuJGNhbGVuZGFyKS50b0Z1bGxDYWxlbmRhckV2ZW50KClcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdHJldHVybiBldmVudHM7XHJcblx0XHRcdH1cclxuXHRcdFx0Y2F0Y2goZXJyKSB7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcihlcnIpO1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcignRG9jdW1lbnRzRGF0YUZyb21TUUwgbWV0aG9kIG9mIFdpekRhdGFiYXNlIG5vdCBleGlzdCEnKTtcclxuXHRcdFx0LypcclxuXHRcdFx0bGV0IGRvY0NvbGxldGlvbiA9IG9iakRhdGFiYXNlLkRvY3VtZW50c0Zyb21TUUwoc3FsKTtcclxuXHRcdFx0Ly9cclxuXHRcdFx0aWYgKGRvY0NvbGxldGlvbiAmJiBkb2NDb2xsZXRpb24uQ291bnQpe1xyXG5cdFx0XHRcdGxldCBkb2M7XHJcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBkb2NDb2xsZXRpb24uQ291bnQ7ICsrIGkpe1xyXG5cdFx0XHRcdFx0ZG9jID0gZG9jQ29sbGV0aW9uLkl0ZW0oaSk7XHJcblx0XHRcdFx0XHRsZXQgZXZlbnRPYmogPSBfZXZlbnRPYmplY3QoX25ld1BzZXVkb0RvYyhkb2MpKTtcclxuXHRcdFx0XHRcdGlmIChldmVudE9iailcclxuXHRcdFx0XHRcdFx0ZXZlbnRzLnB1c2goZXZlbnRPYmopO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gZXZlbnRzO1xyXG5cdFx0XHR9XHJcblx0XHRcdCovXHRcdFxyXG5cdFx0fVxyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuICAgICAqIOS7jldpekRhdGFiYXNl5Lit6I635Y+W5omA5pyJ5b6q546v6YeN5aSN5LqL5Lu2LlxyXG5cdCAqIOS7juWIm+W7uuS6i+S7tueahOaXpeacn+W8gOWni+WIsEVORFJFQ1VSUkVOQ0Xnu5PmnZ9cclxuICAgICAqIEByZXR1cm4ge09iamVjdFtdfSDov5Tlm57nlKjkuo5GdWxsQ2FsZW5kYXLmuLLmn5PnmoQgZXZlbnRTb3VyY2Ug5pWw57uELlxyXG4gICAgICovXHJcblx0X2dldEFsbFJlcGVhdEV2ZW50KHN0YXJ0LCBlbmQpe1xyXG5cdFx0Y29uc3QgcmVwZWF0RXZlbnRzID0gW107XHJcblx0XHRjb25zdCBzcWwgPSBcIkRPQ1VNRU5UX0xPQ0FUSU9OIG5vdCBsaWtlICcvRGVsZXRlZCBJdGVtcy8lJyBhbmQgKEtCX0dVSUQgaXMgbnVsbCBvciBLQl9HVUlEID0gJycpIGFuZCBcIiArIFxyXG5cdFx0XHRcdFx0XCJET0NVTUVOVF9HVUlEIGluIChzZWxlY3QgRE9DVU1FTlRfR1VJRCBmcm9tIFdJWl9ET0NVTUVOVF9QQVJBTSB3aGVyZSBQQVJBTV9OQU1FPSdDQUxFTkRBUl9SRUNVUlJFTkNFJylcIjtcclxuXHJcblx0XHRjb25zdCBkYXRhID0gb2JqRGF0YWJhc2UuRG9jdW1lbnRzRGF0YUZyb21TUUwoc3FsKTtcclxuXHRcdGNvbnNvbGUubG9nKGRhdGEpXHJcblx0XHRpZiAoICFkYXRhICkgcmV0dXJuIGZhbHNlO1xyXG5cdFx0XHJcblx0XHRjb25zdCBvYmogPSBKU09OLnBhcnNlKGRhdGEpO1xyXG5cdFx0aWYgKCAhb2JqIHx8ICFBcnJheS5pc0FycmF5KG9iaikgKSByZXR1cm4gZmFsc2U7XHJcblx0XHRcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgaSArKykge1xyXG5cdFx0XHRyZXBlYXRFdmVudHMucHVzaChcclxuXHRcdFx0XHRuZXcgQ2FsZW5kYXJFdmVudChvYmpbaV0sIHRoaXMuJGNhbGVuZGFyKS5nZW5lcmF0ZVJlcGVhdEV2ZW50cyhzdGFydCwgZW5kKVxyXG5cdFx0XHQpXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVwZWF0RXZlbnRzO1xyXG5cdFx0XHJcblx0fTtcclxuXHJcblx0Ly8g5pel5Y6G5LqL5Lu25ouW5Yqo5ZCO5pu05paw5pWw5o2uXHJcblx0dXBkYXRlRXZlbnREYXRhT25Ecm9wKGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXcpe1xyXG5cdFx0Ly8gQ2FsbCBoYXNUaW1lIG9uIHRoZSBldmVudOKAmXMgc3RhcnQvZW5kIHRvIHNlZSBpZiBpdCBoYXMgYmVlbiBkcm9wcGVkIGluIGEgdGltZWQgb3IgYWxsLWRheSBhcmVhLlxyXG5cdFx0Y29uc3QgYWxsRGF5ID0gIWV2ZW50LnN0YXJ0Lmhhc1RpbWUoKTtcclxuXHRcdC8vIOiOt+WPluS6i+S7tuaWh+aho+aXtumXtOaVsOaNrlxyXG5cdFx0Y29uc3QgZG9jID0gb2JqRGF0YWJhc2UuRG9jdW1lbnRGcm9tR1VJRChldmVudC5pZCk7XHJcblx0XHQvLyDmm7TmlrDmlbDmja5cclxuXHRcdGlmICggYWxsRGF5ICkge1xyXG5cdFx0XHRjb25zdCBzdGFydFN0ciA9IGV2ZW50LnN0YXJ0LnNldCh7J2gnOiAwLCAnbSc6IDAsICdzJzogMH0pLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHRjb25zdCBlbmRTdHIgPSBldmVudC5lbmQuc2V0KHsnaCc6IDIzLCAnbSc6IDU5LCAncyc6IDU5fSkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX1NUQVJUXCIsIHN0YXJ0U3RyKTtcclxuXHRcdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfRU5EXCIsIGVuZFN0cik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb25zdCBzdGFydFN0ciA9IGV2ZW50LnN0YXJ0LmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHRjb25zdCBlbmRTdHIgPSBldmVudC5lbmQuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX1NUQVJUXCIsIHN0YXJ0U3RyKTtcclxuXHRcdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfRU5EXCIsIGVuZFN0cik7XHJcblx0XHR9XHJcblx0XHQvL1RPRE86IOabtOaWsENBTEVOREFSX1JFQ1VSUkVOQ0XmlbDmja5cclxuXHRcdC8vIFxyXG5cdFx0dGhpcy5fdXBkYXRlRG9jTW9kaWZ5RGF0ZShkb2MpO1xyXG5cdH07XHJcblxyXG5cdC8vIOiuvue9ruaWh+aho+WxnuaAp+WAvFxyXG5cdF9zZXRQYXJhbVZhbHVlKGRvYywga2V5LCB2YWx1ZSkge1xyXG5cdFx0aWYgKCFkb2MpIHJldHVybiBmYWxzZTtcclxuXHRcdGRvYy5TZXRQYXJhbVZhbHVlKGtleSwgdmFsdWUpO1xyXG5cdH07XHJcblxyXG5cdC8vIOabtOaWsFdpekRvY+S/ruaUueaXtumXtFxyXG5cdF91cGRhdGVEb2NNb2RpZnlEYXRlKGRvYyl7XHJcblx0XHRjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xyXG5cdFx0aWYgKCFkb2MpIHJldHVybiBmYWxzZTtcclxuXHRcdG5vdy5zZXRTZWNvbmRzKChub3cuZ2V0U2Vjb25kcygpICsgMSkgJSA2MCk7XHJcblx0XHRkb2MuRGF0ZU1vZGlmaWVkID0gdGhpcy5fZDJzKG5vdyk7XHJcblx0fTtcclxuXHJcblx0Ly8g5bCG5pel5pyf5a+56LGh6L2s5YyW5Li65a2X56ym5LiyXHJcblx0Ly9UT0RPOiDogIPomZHkvp3otZZtb21lbnTmnaXnroDljJbovazmjaLov4fnqItcclxuXHRfZDJzKGR0KXtcclxuXHRcdGNvbnN0IHJldCA9IGR0LmdldEZ1bGxZZWFyKCkgKyBcIi1cIiArIFxyXG5cdFx0XHRcdFx0Zm9ybWF0SW50VG9EYXRlU3RyaW5nKGR0LmdldE1vbnRoKCkgKyAxKSArIFwiLVwiICsgXHJcblx0XHRcdFx0XHRmb3JtYXRJbnRUb0RhdGVTdHJpbmcoZHQuZ2V0RGF0ZSgpKSArIFwiIFwiICsgXHJcblx0XHRcdFx0XHRmb3JtYXRJbnRUb0RhdGVTdHJpbmcoZHQuZ2V0SG91cnMoKSkrIFwiOlwiICsgXHJcblx0XHRcdFx0XHRmb3JtYXRJbnRUb0RhdGVTdHJpbmcoZHQuZ2V0TWludXRlcygpKSArIFwiOlwiICsgXHJcblx0XHRcdFx0XHRmb3JtYXRJbnRUb0RhdGVTdHJpbmcoZHQuZ2V0U2Vjb25kcygpKTtcclxuXHRcdHJldHVybiByZXQ7XHJcblx0fTtcclxuXHJcblx0Ly8g5pel5Y6G5pe26Ze06YeN572u5pe26Ze06IyD5Zu05ZCO5pu05paw5pWw5o2uXHJcblx0dXBkYXRlRXZlbnREYXRhT25SZXNpemUoZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldyl7XHJcblx0XHRjb25zdCBhbGxEYXkgPSBldmVudC5zdGFydC5oYXNUaW1lKCkgPyBmYWxzZSA6IHRydWU7XHJcblx0XHQvLyDojrflvpfkuovku7bmlofmoaPml7bpl7TmlbDmja5cclxuXHRcdGNvbnN0IGRvYyA9IG9iakRhdGFiYXNlLkRvY3VtZW50RnJvbUdVSUQoZXZlbnQuaWQpO1xyXG5cdFx0Ly8g6K6h566X5pu05pS55ZCO55qE57uT5p2f5pe26Ze0XHJcblx0XHRjb25zdCBldmVudEVuZFN0ciA9IGV2ZW50LmVuZC5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdC8vIOabtOaWsOaWh+aho+aVsOaNrlxyXG5cdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfRU5EXCIsIGV2ZW50RW5kU3RyKTtcclxuXHRcdHRoaXMuX3VwZGF0ZURvY01vZGlmeURhdGUoZG9jKTtcclxuXHR9O1xyXG5cclxuXHQvLyDliJvlu7rkuovku7Ygc3RhcnQsIGVuZCwganNFdmVudCwgdmlld1xyXG5cdC8qKlxyXG4gICAgICog5Yib5bu65LqL5Lu2LlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBzZWxlY3Rpb25EYXRhIEZ1bGxDYWxlbmRhciDkvKDlhaXnmoTmlbDmja4uXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IHNlbGVjdGlvbkRhdGEuc3RhcnQgTW9tZW50IOexu+aXpeacn+WvueixoS5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gc2VsZWN0aW9uRGF0YS5lbmQgTW9tZW50IOexu+aXpeacn+WvueixoS5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gc2VsZWN0aW9uRGF0YS5qc0V2ZW50IG5hdGl2ZSBKYXZhU2NyaXB0IOS6i+S7ti5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gc2VsZWN0aW9uRGF0YS52aWV3IEZ1bGxDYWxlbmRhciDop4blm77lr7nosaEuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IHVzZXJJbnB1dHMg55So5oi35Lyg5YWl55qE5YW25LuW5L+h5oGvLlxyXG4gICAgICogVE9ETzog6K+l5pa55rOV5Y+v5Lul5pS+572u5YiwQ2FsZW5kYXJFdmVudOeahOmdmeaAgeaWueazleS4ilxyXG4gICAgICovXHJcblx0Y3JlYXRlRXZlbnQoc2VsZWN0aW9uRGF0YSwgdXNlcklucHV0cyl7XHJcblx0XHR0cnkge1xyXG5cdFx0XHQvLyDojrflj5bnlKjmiLforr7nva5cclxuXHRcdFx0Y29uc3QgbmV3RXZlbnQgPSBuZXcgQ2FsZW5kYXJFdmVudCh7XHJcblx0XHRcdFx0dGl0bGU6IHVzZXJJbnB1dHMudGl0bGUgPyB1c2VySW5wdXRzLnRpdGxlIDogJ+aXoOagh+mimCcsXHJcblx0XHRcdFx0c3RhcnQ6IHNlbGVjdGlvbkRhdGEuc3RhcnQsXHJcblx0XHRcdFx0ZW5kOiBzZWxlY3Rpb25EYXRhLmVuZCxcclxuXHRcdFx0XHRhbGxEYXk6IHNlbGVjdGlvbkRhdGEuc3RhcnQuaGFzVGltZSgpICYmIHNlbGVjdGlvbkRhdGEuZW5kLmhhc1RpbWUoKSA/IGZhbHNlIDogdHJ1ZSxcclxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHVzZXJJbnB1dHMuY29sb3IgPyB1c2VySW5wdXRzLmNvbG9yIDogJyMzMkNEMzInLFxyXG5cdFx0XHR9LCB0aGlzLiRjYWxlbmRhcik7XHJcblx0XHRcdC8vIOS/neWtmOW5tua4suafk+S6i+S7tlxyXG5cdFx0XHRuZXdFdmVudC5zYXZlVG9XaXpFdmVudERvYygpO1xyXG5cdFx0XHRuZXdFdmVudC5yZWZldGNoRGF0YSgpO1xyXG5cdFx0XHRuZXdFdmVudC5hZGRUb0Z1bGxDYWxlbmRhcigpO1xyXG5cdFx0fSBjYXRjaCAoZSkge2NvbnNvbGUubG9nKGUpfVxyXG5cdH1cclxuXHJcbn1cclxuXHJcblxyXG4vLyBUT0RPOiDph43lhpnojrflj5bmlbDmja7nmoTmlrnlvI9cclxuZnVuY3Rpb24gX2dldFdpekV2ZW50KHN0YXJ0LCBlbmQpIHtcclxuXHQvL1RPRE86XHJcblx0bGV0IGV2ZW50cyA9IFtdO1xyXG5cdGxldCBFdmVudENvbGxlY3Rpb24gPSBvYmpEYXRhYmFzZS5HZXRDYWxlbmRhckV2ZW50czIoc3RhcnQsIGVuZCk7XHJcblx0cmV0dXJuIGV2ZW50c1xyXG59XHJcblxyXG4vLyDojrflvpfmuLLmn5PlkI7nmoTph43lpI3ml6XmnJ9cclxuZnVuY3Rpb24gZ2V0UmVuZGVyUmVwZWF0RGF5KCl7XHJcblx0dmFyIGRheUFycmF5ID0gbmV3IEFycmF5KCk7XHJcblx0dmFyIGV2ZW50U3RhcnQgPSBuZXcgRGF0ZShfczJkKGdfZXZlbnRTdGFydCkpO1xyXG5cdFx0XHJcblx0c3dpdGNoIChnX3JlcGVhdFJ1bGUpe1xyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnlXZWVrMVwiOlxyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnlXZWVrMlwiOlxyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnlXZWVrM1wiOlxyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnlXZWVrNFwiOlxyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnlXZWVrNVwiOlxyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnlXZWVrNlwiOlxyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnlXZWVrN1wiOlxyXG5cdFx0XHRcdGdldFdlZWtseVJlcGVhdERheShkYXlBcnJheSwgW2dfcmVwZWF0UnVsZS5jaGFyQXQoOSldKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnlXZWVrZGF5XCI6XHJcblx0XHRcdFx0Z2V0V2Vla2x5UmVwZWF0RGF5KGRheUFycmF5LCBbMSwgMiwgMywgNCwgNV0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJFdmVyeVdlZWtkYXkxMzVcIjpcclxuXHRcdFx0XHRnZXRXZWVrbHlSZXBlYXREYXkoZGF5QXJyYXksIFsxLCAzLCA1XSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJFdmVyeVdlZWtkYXkyNFwiOlxyXG5cdFx0XHRcdGdldFdlZWtseVJlcGVhdERheShkYXlBcnJheSwgWzIsIDRdKTtcclxuXHRcdFx0XHRicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2Vla2RheTY3XCI6XHJcblx0XHRcdFx0Z2V0V2Vla2x5UmVwZWF0RGF5KGRheUFycmF5LCBbNiwgN10pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiRGFpbHlcIjpcclxuXHRcdFx0XHRnZXRXZWVrbHlSZXBlYXREYXkoZGF5QXJyYXksIFsxLCAyLCAzLCA0LCA1LCA2LCA3XSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJXZWVrbHlcIjovLyDmr4/lkahcclxuXHRcdFx0XHRnZXRXZWVrbHlSZXBlYXREYXkoZGF5QXJyYXksIFtldmVudFN0YXJ0LmdldERheSgpXSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJFdmVyeTJXZWVrc1wiOlxyXG5cdFx0XHRcdGdldFdlZWtseVJlcGVhdERheShkYXlBcnJheSwgW2V2ZW50U3RhcnQuZ2V0RGF5KCldKTtcclxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRheUFycmF5Lmxlbmd0aDsgKysgaSl7XHJcblx0XHRcdFx0XHR2YXIgaW50ZXIgPSBfaW50ZXJEYXlzKF9kMnMoZXZlbnRTdGFydCksIF9kMnMoZGF5QXJyYXlbaV1bMF0pKTtcclxuXHRcdFx0XHRcdGlmICgocGFyc2VGbG9hdCgoaW50ZXItMSkvNy4wKSAlIDIpICE9IDAgKXtcclxuXHRcdFx0XHRcdFx0ZGF5QXJyYXkuc3BsaWNlKGksIDEpO1xyXG5cdFx0XHRcdFx0XHRpIC0tO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIk1vbnRobHlcIjpcclxuXHRcdFx0XHRnZXRNb250aGx5UmVwZWF0RGF5KGRheUFycmF5KTtcclxuXHRcdFx0XHRicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIlllYXJseVwiOlxyXG5cdFx0XHRcdGdldFllYXJseVJlcGVhdERheShkYXlBcnJheSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdC8vIFRPRE86IOaxieWtl+mcgOimgeiAg+iZkVxyXG4gICAgICAgICAgICBjYXNlIFwiQ2hpbmVzZU1vbnRobHlcIjpcclxuICAgICAgICAgICAgICAgIGdldENoaW5lc2VSZXBlYXREYXkoZGF5QXJyYXksICfmnIgnKTtcclxuXHRcdFx0XHRicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkNoaW5lc2VZZWFybHlcIjpcclxuICAgICAgICAgICAgICAgIGdldENoaW5lc2VSZXBlYXREYXkoZGF5QXJyYXksICfljoYnKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0ZGVmYXVsdDp7XHJcblx0XHRcdFx0aWYgKGdfcmVwZWF0UnVsZS5pbmRleE9mKFwiRXZlcnlXZWVrXCIpID09IDApe1xyXG5cdFx0XHRcdFx0dmFyIGRheXMgPSBnX3JlcGVhdFJ1bGUuc3Vic3RyKFwiRXZlcnlXZWVrXCIubGVuZ3RoKS5zcGxpdCgnJyk7XHJcblx0XHRcdFx0XHRnZXRXZWVrbHlSZXBlYXREYXkoZGF5QXJyYXksIGRheXMpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuXHRyZXR1cm4gZGF5QXJyYXk7XHJcbn1cclxuXHJcblxyXG4vKiDmlbDmja7ojrflj5ZcclxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG5cclxuLyog5p2C6aG55ZKM5bel5YW3XHJcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuLy8g5Yik5pat5YaF5qC4XHJcbmZ1bmN0aW9uIGlzQ2hyb21lKCkge1xyXG5cdGlmIChnX2lzQ2hyb21lKSByZXR1cm4gZ19pc0Nocm9tZTtcclxuXHQvL1xyXG5cdHZhciB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcclxuXHRnX2lzQ2hyb21lID0gdWEuaW5kZXhPZignY2hyb21lJykgIT0gLTE7XHJcblx0Ly9cclxuXHRyZXR1cm4gZ19pc0Nocm9tZTtcclxufVxyXG5cclxuLy8g5bCG5pW05pWw6L2s5o2i5oiQ5pel5pyf5a2X56ym5LiyXHJcbmZ1bmN0aW9uIGZvcm1hdEludFRvRGF0ZVN0cmluZyhuKXtcclxuXHRcdFxyXG5cdHJldHVybiBuIDwgMTAgPyAnMCcgKyBuIDogbjtcclxufVxyXG5cclxuLy8g5qOA5p+l5Y+K5aKe5Yqg5pWw5YC85a2X56ym5Liy6ZW/5bqm77yM5L6L5aaC77yaJzInIC0+ICcwMidcclxuZnVuY3Rpb24gY2hlY2tBbmRBZGRTdHJMZW5ndGgoc3RyKSB7XHJcblx0aWYgKHN0ci5sZW5ndGggPCAyKSB7XHJcblx0XHRyZXR1cm4gJzAnICsgc3RyO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRyZXR1cm4gc3RyO1xyXG5cdH1cclxufVxyXG5cclxuLy8g5bCG5a2X56ym5Liy6L2s5YyW5Li65pel5pyf5a+56LGhXHJcbmZ1bmN0aW9uIF9zMmQoc3RyKXtcclxuXHRpZiAoIXN0cilcclxuXHRcdHJldHVybiAnJztcclxuXHR2YXIgZGF0ZSA9IG5ldyBEYXRlKHN0ci5zdWJzdHIoMCwgNCksXHJcblx0XHRcdFx0XHRzdHIuc3Vic3RyKDUsIDIpIC0gMSxcclxuXHRcdFx0XHRcdHN0ci5zdWJzdHIoOCwgMyksXHJcblx0XHRcdFx0XHRzdHIuc3Vic3RyKDExLCAyKSxcclxuXHRcdFx0XHRcdHN0ci5zdWJzdHIoMTQsIDIpLFxyXG5cdFx0XHRcdFx0c3RyLnN1YnN0cigxNywgMilcclxuXHRcdFx0XHRcdCk7XHRcdFxyXG5cdHJldHVybiBkYXRlO1xyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGNvbG9yQ291bnQ6IDEyLFxyXG4gICAgY29sb3JJdGVtczogW1xyXG4gICAgICAgIHsgXCJjb2xvclZhbHVlXCI6IFwiIzMyQ0QzMlwiLCBcImNvbG9yTmFtZVwiOiAn5qmE5qaE57u/JyB9LFxyXG4gICAgICAgIHsgXCJjb2xvclZhbHVlXCI6IFwiIzU0ODRFRFwiLCBcImNvbG9yTmFtZVwiOiAn5a6d55+z6JOdJyB9LFxyXG4gICAgICAgIHsgXCJjb2xvclZhbHVlXCI6IFwiI0E0QkRGRVwiLCBcImNvbG9yTmFtZVwiOiAn6JOd6ImyJyB9LFxyXG4gICAgICAgIHsgXCJjb2xvclZhbHVlXCI6IFwiIzQ2RDZEQlwiLCBcImNvbG9yTmFtZVwiOiAn6Z2S57u/6ImyJyB9LFxyXG4gICAgICAgIHsgXCJjb2xvclZhbHVlXCI6IFwiIzdBRTdCRlwiLCBcImNvbG9yTmFtZVwiOiAn57u/6ImyJyB9LFxyXG4gICAgICAgIHsgXCJjb2xvclZhbHVlXCI6IFwiIzUxQjc0OVwiLCBcImNvbG9yTmFtZVwiOiAn5riF5paw57u/JyB9LFxyXG4gICAgICAgIHsgXCJjb2xvclZhbHVlXCI6IFwiI0ZCRDc1QlwiLCBcImNvbG9yTmFtZVwiOiAn6buE6ImyJyB9LFxyXG4gICAgICAgIHsgXCJjb2xvclZhbHVlXCI6IFwiI0ZGQjg3OFwiLCBcImNvbG9yTmFtZVwiOiAn5qmY6ImyJyB9LFxyXG4gICAgICAgIHsgXCJjb2xvclZhbHVlXCI6IFwiI0ZGODg3Q1wiLCBcImNvbG9yTmFtZVwiOiAn57qi6ImyJyB9LFxyXG4gICAgICAgIHsgXCJjb2xvclZhbHVlXCI6IFwiI0RDMjEyN1wiLCBcImNvbG9yTmFtZVwiOiAn5aWi5Y2O57qiJyB9LFxyXG4gICAgICAgIHsgXCJjb2xvclZhbHVlXCI6IFwiI0RCQURGRlwiLCBcImNvbG9yTmFtZVwiOiAn57Sr6ImyJyB9LFxyXG4gICAgICAgIHsgXCJjb2xvclZhbHVlXCI6IFwiI0UxRTFFMVwiLCBcImNvbG9yTmFtZVwiOiAn54Gw6ImyJyB9XHJcbiAgICBdLFxyXG5cclxufSIsIi8vVE9ETzog5Yik5patd2luZG93LmV4dGVybmFs5piv5ZCm5Li6V2l6SHRtbEVkaXRvckFwcFxyXG5jb25zdCBXaXpFeHBsb3JlckFwcCA9IHdpbmRvdy5leHRlcm5hbDtcclxuY29uc3QgV2l6RXhwbG9yZXJXaW5kb3cgPSBXaXpFeHBsb3JlckFwcC5XaW5kb3c7XHJcbmNvbnN0IFdpekRhdGFiYXNlID0gV2l6RXhwbG9yZXJBcHAuRGF0YWJhc2U7XHJcbmNvbnN0IFdpekNvbW1vblVJID0gV2l6RXhwbG9yZXJBcHAuQ3JlYXRlV2l6T2JqZWN0KFwiV2l6S01Db250cm9scy5XaXpDb21tb25VSVwiKTtcclxuXHJcbmZ1bmN0aW9uIFdpekNvbmZpcm0obXNnLCB0aXRsZSkge1xyXG4gICAgcmV0dXJuIFdpekV4cGxvcmVyV2luZG93LlNob3dNZXNzYWdlKG1zZywgdGl0bGUsIDB4MDAwMDAwMjAgfCAweDAwMDAwMDAxKSA9PSAxO1xyXG59XHJcblxyXG5mdW5jdGlvbiBXaXpBbGVydChtc2cpIHtcclxuICAgIFdpekV4cGxvcmVyV2luZG93LlNob3dNZXNzYWdlKG1zZywgXCJ7cH1cIiwgMHgwMDAwMDA0MCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIFdpekJ1YmJsZU1lc3NhZ2UodGl0bGUsIG1zZywgY29sb3IgPSAnI0ZGRkE5RCcsIGRlbGF5ID0gJzMnKSB7XHJcbiAgICBjb25zdCBhcHBQYXRoID0gV2l6Q29tbW9uVUkuR2V0U3BlY2lhbEZvbGRlcihcIkFwcFBhdGhcIik7XHJcbiAgICAvL1xyXG4gICAgY29uc3Qgd2l6U2hlbGxGaWxlTmFtZSA9IGFwcFBhdGggKyBcIldpei5leGVcIjtcclxuICAgIGNvbnN0IGRsbEZpbGVOYW1lID0gYXBwUGF0aCArIFwiV2l6VG9vbHMuZGxsXCI7XHJcbiAgICAvL1xyXG4gICAgY29uc3QgcGFyYW1zID0gYFwiJHtkbGxGaWxlTmFtZX1cIiBXaXpUb29sc1Nob3dCdWJibGVXaW5kb3cyRXggL1RpdGxlPSR7dGl0bGV9IC9MaW5rVGV4dD0ke21zZ30gL0xpbmtVUkw9QCAvQ29sb3I9JHtjb2xvcn0gL0RlbGF5PSR7ZGVsYXl9YDtcclxuICAgIC8vXHJcbiAgICBXaXpDb21tb25VSS5SdW5FeGUod2l6U2hlbGxGaWxlTmFtZSwgcGFyYW1zLCBmYWxzZSk7XHJcbn1cclxuXHJcbmNsYXNzIFdpelNoZWxsIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihkbGxGaWxlTmFtZSwgZGxsRXhwb3J0RnVuYywgcGFyYW1zKSB7XHJcbiAgICAgICAgLy/kvb/nlKhkbGzlr7zlh7rlh73mlbDvvIzlpKfpg6jliIblhaXlj4Lml7blkb3ku6TooYzmlrnlvI/vvIzlhbfkvZPlj4LmlbDmsqHmnInor7TmmI7vvIzmnInpnIDopoHogZTns7vlvIDlj5HkurrlkZhcclxuICAgICAgICBjb25zdCBhcHBQYXRoID0gV2l6Q29tbW9uVUkuR2V0U3BlY2lhbEZvbGRlcihcIkFwcFBhdGhcIik7XHJcbiAgICAgICAgdGhpcy5hcHBQYXRoID0gYXBwUGF0aFxyXG4gICAgICAgIHRoaXMud2l6RXhlID0gYXBwUGF0aCArIFwiV2l6LmV4ZVwiO1xyXG4gICAgICAgIHRoaXMuZGxsRmlsZU5hbWUgPSBkbGxGaWxlTmFtZSA/IGFwcFBhdGggKyBkbGxGaWxlTmFtZSA6IGFwcFBhdGggKyAnV2l6S01Db250cm9scy5kbGwnO1xyXG4gICAgICAgIHRoaXMuZGxsRXhwb3J0RnVuYyA9IGRsbEV4cG9ydEZ1bmMgfHwgJ1dpektNUnVuU2NyaXB0JztcclxuICAgICAgICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcclxuICAgIH1cclxuXHJcbiAgICBydW5TY3JpcHRGaWxlKHNjcmlwdEZpbGVOYW1lLCBzY3JpcHRQYXJhbXMpIHtcclxuICAgICAgICBjb25zdCBwYXJhbXMgPSBgXCIke3RoaXMuYXBwUGF0aCArICdXaXpLTUNvbnRyb2xzLmRsbCd9XCIgV2l6S01SdW5TY3JpcHQgL1NjcmlwdEZpbGVOYW1lPSR7c2NyaXB0RmlsZU5hbWV9ICR7c2NyaXB0UGFyYW1zfWA7XHJcbiAgICAgICAgV2l6Q29tbW9uVUkuUnVuRXhlKHRoaXMud2l6RXhlLCBwYXJhbXMsIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICB3aXpCdWJibGVNZXNzYWdlKHRpdGxlLCBtc2csIGNvbG9yID0gJyNGRkZBOUQnLCBkZWxheSA9ICczJykge1xyXG4gICAgICAgIFdpekJ1YmJsZU1lc3NhZ2UodGl0bGUsIG1zZywgY29sb3IsIGRlbGF5KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0V2l6SW50ZXJmYWNlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFdpekV4cGxvcmVyQXBwLCBXaXpFeHBsb3JlcldpbmRvdywgV2l6RGF0YWJhc2UsIFdpekNvbW1vblVJXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBcclxuICAgIFdpekV4cGxvcmVyQXBwLCBcclxuICAgIFdpekV4cGxvcmVyV2luZG93LCBcclxuICAgIFdpekRhdGFiYXNlLCBcclxuICAgIFdpekNvbW1vblVJLCBcclxuICAgIFdpekNvbmZpcm0sIFxyXG4gICAgV2l6QWxlcnQsIFxyXG4gICAgV2l6QnViYmxlTWVzc2FnZSwgXHJcbiAgICBXaXpTaGVsbCBcclxufTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==