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
/******/ 	var hotCurrentHash = "03ef8dc384b8ef340bed"; // eslint-disable-line no-unused-vars
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
/******/ 		"app": 0
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

/***/ "./node_modules/css-loader/index.js!./src/Widget/EventPopover/EventPopover.css":
/*!****************************************************************************!*\
  !*** ./node_modules/css-loader!./src/Widget/EventPopover/EventPopover.css ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Popover 组件样式\r\n-------------------------------------------------------------------------*/\r\n\r\n/* Popover 容器及定位\r\n-------------------------------------*/\r\n\r\n.tc-popover {\r\n    position: absolute;\r\n    background: #FFF;\r\n    color: black;\r\n    width: auto;\r\n    border: 1px solid rgba(0, 0, 0, 0.2);\r\n    border-radius: 6px;\r\n    box-shadow: 0 2px 4px rgba(0, 0, 0, .2);\r\n    text-align: left;\r\n}\r\n\r\n.tc-popover .arrow {\r\n    position: absolute;\r\n    display: block;\r\n    width: 20px;\r\n    height: 10px;\r\n    margin: 0 6px;\r\n}\r\n\r\n.tc-popover .arrow::before, .tc-popover .arrow::after {\r\n    position: absolute;\r\n    display: block;\r\n    content: \"\";\r\n    border-color: transparent;\r\n    border-style: solid;\r\n}\r\n\r\n/* top 放置样式\r\n-------------------------------------*/\r\n\r\n.tc-popover[x-placement^=\"top\"] {\r\n    margin-bottom: 10px;\r\n}\r\n\r\n.tc-popover[x-placement^=\"top\"] .arrow {\r\n    bottom: calc((10px + 1px) * -1);\r\n}\r\n\r\n.tc-popover[x-placement^=\"top\"] .arrow::before,\r\n.tc-popover[x-placement^=\"top\"] .arrow::after {\r\n    border-width: 10px 10px 0;\r\n}\r\n\r\n.tc-popover[x-placement^=\"top\"] .arrow::before {\r\n    bottom: 0;\r\n    border-top-color: rgba(0, 0, 0, 0.25);\r\n}\r\n\r\n.tc-popover[x-placement^=\"top\"] .arrow::after {\r\n    bottom: 1px;\r\n    border-top-color: #fff;\r\n}\r\n\r\n/* right 放置样式\r\n-------------------------------------*/\r\n\r\n.tc-popover[x-placement^=\"right\"] {\r\n    margin-left: 10px;\r\n}\r\n\r\n.tc-popover[x-placement^=\"right\"] .arrow {\r\n    left: calc((10px + 1px) * -1);\r\n    width: 10px;\r\n    height: 20px;\r\n    margin: 6px 0;\r\n}\r\n\r\n.tc-popover[x-placement^=\"right\"] .arrow::before,\r\n.tc-popover[x-placement^=\"right\"] .arrow::after {\r\n    border-width: 10px 10px 10px 0;\r\n}\r\n\r\n.tc-popover[x-placement^=\"right\"] .arrow::before {\r\n    left: 0;\r\n    border-right-color: rgba(0, 0, 0, 0.25);\r\n}\r\n\r\n.tc-popover[x-placement^=\"right\"] .arrow::after {\r\n    left: 1px;\r\n    border-right-color: #fff;\r\n}\r\n\r\n/* bottom 放置样式\r\n-------------------------------------*/\r\n\r\n.tc-popover[x-placement^=\"bottom\"] {\r\n    margin-top: 10px;\r\n}\r\n\r\n.tc-popover[x-placement^=\"bottom\"] .arrow {\r\n    top: calc((10px + 1px) * -1);\r\n}\r\n\r\n.tc-popover[x-placement^=\"bottom\"] .arrow::before,\r\n.tc-popover[x-placement^=\"bottom\"] .arrow::after {\r\n    border-width: 0 10px 10px 10px;\r\n}\r\n\r\n.tc-popover[x-placement^=\"bottom\"] .arrow::before {\r\n    top: 0;\r\n    border-bottom-color: rgba(0, 0, 0, 0.25);\r\n}\r\n\r\n.tc-popover[x-placement^=\"bottom\"] .arrow::after {\r\n    top: 1px;\r\n    border-bottom-color: #f7f7f7; /*这里为了专门适配有标题背景的Popover*/\r\n}\r\n\r\n/* left 放置样式\r\n-------------------------------------*/\r\n\r\n.tc-popover[x-placement^=\"left\"] {\r\n    margin-right: 10px;\r\n}\r\n\r\n.tc-popover[x-placement^=\"left\"] .arrow {\r\n    right: calc((10px + 1px) * -1);\r\n    width: 10px;\r\n    height: 20px;\r\n    margin: 6px 0;\r\n}\r\n\r\n.tc-popover[x-placement^=\"left\"] .arrow::before,\r\n.tc-popover[x-placement^=\"left\"] .arrow::after {\r\n    border-width: 10px 0 10px 10px;\r\n}\r\n\r\n.tc-popover[x-placement^=\"left\"] .arrow::before {\r\n    right: 0;\r\n    border-left-color: rgba(0, 0, 0, 0.25);\r\n}\r\n\r\n.tc-popover[x-placement^=\"left\"] .arrow::after {\r\n    right: 1px;\r\n    border-left-color: #fff;\r\n}\r\n\r\n/* Content 标题和内容\r\n-------------------------------------*/\r\n\r\n.tc-popover-header {\r\n    padding: .5rem .75rem;\r\n    margin-bottom: 0;\r\n    font-size: 1rem;\r\n    color: inherit;\r\n    background-color: #f7f7f7;\r\n    border-bottom: 1px solid #ebebeb;\r\n    border-top-left-radius: 6px;\r\n    border-top-right-radius: 6px;\r\n}\r\n\r\n.tc-popover-body {\r\n    padding: 10px 15px;\r\n}\r\n\r\n#tc-editpopper-eventtitle {\r\n    border-width: 1px;\r\n    border-color: transparent;\r\n    background-color: transparent;\r\n    padding: 0;\r\n    margin: 0;\r\n    font-size: 1.2em;\r\n    font-weight: bold;\r\n}\r\n\r\n#tc-editpopper-eventtitle:focus,\r\n#tc-editpopper-eventtitle:hover {\r\n    outline: none;\r\n    border-bottom-color: black; \r\n}", ""]);

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
exports.push([module.i, "html, body {\r\n    overflow: hidden;\r\n    font-size: 14px;\r\n}\r\n\r\n:focus {\r\n    outline:none;\r\n}\r\n\r\n#calendar-container {\r\n    position: fixed;\r\n    top: 0;\r\n    left: 8px;\r\n    right: 8px;\r\n    bottom: 8px;\r\n}\r\n\r\n.fc-header-toolbar {\r\n    /*\r\n    the calendar will be butting up against the edges,\r\n    but let's scoot in the header's buttons\r\n    */\r\n    padding-top: 14px;\r\n    padding-left: 0;\r\n    padding-right: 0;\r\n}\r\n\r\n\r\n/* Fonts.css -- 跨平台中文字体解决方案\r\n-----------------------------------------------------------------*/\r\n.font-hei {font-family: -apple-system, \"Noto Sans\", \"Helvetica Neue\", Helvetica, \"Nimbus Sans L\", Arial, \"Liberation Sans\", \"PingFang SC\", \"Hiragino Sans GB\", \"Noto Sans CJK SC\", \"Source Han Sans SC\", \"Source Han Sans CN\", \"Microsoft YaHei\", \"Wenquanyi Micro Hei\", \"WenQuanYi Zen Hei\", \"ST Heiti\", SimHei, \"WenQuanYi Zen Hei Sharp\", sans-serif;}\r\n.font-kai {font-family: Baskerville, Georgia, \"Liberation Serif\", \"Kaiti SC\", STKaiti, \"AR PL UKai CN\", \"AR PL UKai HK\", \"AR PL UKai TW\", \"AR PL UKai TW MBE\", \"AR PL KaitiM GB\", KaiTi, KaiTi_GB2312, DFKai-SB, \"TW-Kai\", serif;}\r\n.font-song {font-family: Georgia, \"Nimbus Roman No9 L\", \"Songti SC\", \"Noto Serif CJK SC\", \"Source Han Serif SC\", \"Source Han Serif CN\", STSong, \"AR PL New Sung\", \"AR PL SungtiL GB\", NSimSun, SimSun, \"TW-Sung\", \"WenQuanYi Bitmap Song\", \"AR PL UMing CN\", \"AR PL UMing HK\", \"AR PL UMing TW\", \"AR PL UMing TW MBE\", PMingLiU, MingLiU, serif;}\r\n.font-fang-song {font-family: Baskerville, \"Times New Roman\", \"Liberation Serif\", STFangsong, FangSong, FangSong_GB2312, \"CWTEX-F\", serif;}\r\n\r\n/* 临时放置\r\n-------------------------------------*/\r\n\r\n.ui-button-icon-only.splitbutton-select {\r\n    width: 1em;\r\n}\r\n\r\na[data-goto] {\r\n    color: #000;\r\n}\r\n\r\n/* Bootstrap 4 组件样式\r\n-------------------------------------------------------------------------*/\r\n\r\n/* 表单\r\n-------------------------------------*/\r\n.col-form-label {\r\n    padding-top: calc(.375rem + 1px);\r\n    padding-bottom: calc(.375rem + 1px);\r\n    margin-bottom: 0;\r\n    font-size: inherit;\r\n    line-height: 1.5;\r\n}\r\n\r\n/* 事件渲染\r\n-------------------------------------------------------------------------*/\r\n.tc-complete {\r\n    opacity: 0.3;\r\n\r\n}\r\n\r\n.tc-complete > .fc-content {\r\n    text-decoration: line-through !important;\r\n}\r\n\r\n.tc-complete:hover {\r\n    opacity: 1;\r\n}", ""]);

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

/***/ "./src/CalendarEvent.js":
/*!******************************!*\
  !*** ./src/CalendarEvent.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CalendarEvent; });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fullcalendar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fullcalendar */ "./node_modules/fullcalendar/dist/fullcalendar.js");
/* harmony import */ var fullcalendar__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fullcalendar__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _WizInterface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WizInterface */ "./src/WizInterface.js");
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Config */ "./src/Config.js");





const g_cal = $('#calendar');

class CalendarEvent {
	/**
     * 创建一个通用日程.
	 * @param {Object} data 原始数据类型，可以是 WizEvent, FullCalendarEvent 以及 GUID.
     */
	constructor( data ) {
		if (!_WizInterface__WEBPACK_IMPORTED_MODULE_2__["WizDatabase"]) throw new Error('IWizDatabase is not valid.');
		const type = this._checkDataType(data);
		switch ( type ) {
			case "WizEvent":
			case "FullCalendarEvent":
				this._create(data, type);
				break;
			case "GUID":
				try {
					//TODO: 获得WizEvent数据，并创建对象
					const doc = _WizInterface__WEBPACK_IMPORTED_MODULE_2__["WizDatabase"].DocumentFromGUID(data);
					const newEventData = {
						"CALENDAR_END" : doc.GetParamValue('CALENDAR_END'),
						"CALENDAR_INFO" : doc.GetParamValue('CALENDAR_INFO'),
						"CALENDAR_EXTRAINFO" : doc.GetParamValue('CALENDAR_EXTRAINFO'),
						"CALENDAR_START" : doc.GetParamValue('CALENDAR_START'),
						"created" : moment__WEBPACK_IMPORTED_MODULE_0___default()(doc.DateCreated).format('YYYY-MM-DD HH:mm:ss'),
						"guid" : doc.GUID,
						"title" : doc.Title,
						"updated" : moment__WEBPACK_IMPORTED_MODULE_0___default()(doc.DateModified).format('YYYY-MM-DD HH:mm:ss')
					}
					this._create(newEventData, 'WizEvent');
				} catch (e) { console.error(e); }
				break;
		}
	};

	_create(data, type) {
		let start, end, id, bkColor, allDay, complete, dateCompleted, rptRule;
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
				bkColor = this._Info.ci ? ( parseInt(this._Info.ci) == 0 ? this._Info.b : _Config__WEBPACK_IMPORTED_MODULE_3__["default"].colorItems[this._Info.ci].colorValue ) : this._Info.b;
				allDay = data.CALENDAR_END.indexOf("23:59:59") != -1 ? true : false;
				complete = this._ExtraInfo.Complete;
				dateCompleted = this._ExtraInfo.DateCompleted;
				rptRule = data.CALENDAR_RECURRENCE;
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
		this.rptRule = rptRule;
		//
		this._update();
	}

	_checkDataType(data) {
		const objClass = data.constructor;
        const GUID_RegExr = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        let type;
        switch (objClass) {
            case String:
                if ( GUID_RegExr.test(data) ) type = "GUID";
                else throw new Error('Unknown data, cannot create CalendarEvent object.');
                break;
            case Object:
				if ( data.CALENDAR_INFO && data.title ) { 
					type = 'WizEvent';
				} else if ( data.start && data.title ) {
					type = 'FullCalendarEvent';
				}
                break;
        }
        return type;
	};

	_parseInfo(InfoString) {
		const InfoObject = {};
		// 拆解CALENDAR_INFO
		const InfoArray = InfoString.split('/');
		InfoArray.forEach(function(item, index, arr){
			const pair = item.split('=');
			InfoObject[pair[0]] = pair[1];
		});
		// 处理颜色值
		if ( InfoObject.b ) InfoObject.b = '#' + InfoObject.b;

		return InfoObject;
	};

	/**
     * 将 Info 对象序列化.
	 * @private
	 * @param {Object} [InfoObject=] 提供 Info 对象，默认为`this._Info`.
     * @return {String} 返回用于Info对象字符串.
     */
	_stringifyInfo( InfoObject = this._Info ) {
		if ( !InfoObject ) return '';
		const InfoArray = [];
		const InfoObjectKeysArray = Object.keys(InfoObject);
		InfoObjectKeysArray.forEach(function(item, index, arr){
			const singleInfo = `${item}=${InfoObject[item]}`;
			InfoArray.push(singleInfo);
		});
		return InfoArray.join('/').replace('#', '');
	};

	_update() {
		this._updateInfo();
		this._updateExtraInfo();
	};

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
		_Config__WEBPACK_IMPORTED_MODULE_3__["default"].colorItems.forEach(function(item, index, arr){
			if ( item.colorValue ==  that.backgroundColor ) {
				// 当日程背景色与色表匹配时则用 color idex 来储存（兼容原版日历插件）
				InfoObject['ci'] = index;
			};
		});
		// 应用更新
		this._Info = InfoObject;
	};

	_getDefaultExtraInfo() {
		return {
			'Complete': 0, //
			'DateCompleted': '', // ISO 标准日期字符串 YYYY-MM-DD 00:00:00
			'Prior': 0
		};
	};

	_updateExtraInfo() {
		const ExtraInfoObject = {
			'Complete': 0,
			'DateCompleted': '',
			'Prior': 0
		};
		ExtraInfoObject['Complete'] = this.complete;
		ExtraInfoObject['DateCompleted'] = this.dateCompleted;
		this._ExtraInfo = ExtraInfoObject;
	};

	_getEventHtml(title = this.title, content = ''){
		const htmlText = 
			`<html>
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
	
		  return htmlText
	};

	/**
     * 根据日程的重复规则生成 FullCalendar eventSource.
	 * @param {String} start 查询起始，ISO 标准日期字符串.
	 * @param {String} end 查询结束，ISO 标准日期字符串.
     * @returns {Object} eventSource.
     */
	generateRepeatEvents(start, end) {
		if ( !this.rptRule ) throw new Error('Cannot find CalendarEvent repeat rule.');
		const eventSource = {
			id: this.id,
			events: []
		}
		//根据rptRule生成重复日期，并生成事件
		const dayArray = this._getRenderRepeatDay(start, end);
		for ( let day of dayArray ) {
			// day 是一个Moment日期对象
			const newEvent = this.toFullCalendarEvent();
			newEvent.start = day.format('YYYY-MM-DD HH:mm:ss');
			newEvent.end = moment__WEBPACK_IMPORTED_MODULE_0___default()(newEvent.end).add( day.diff( moment__WEBPACK_IMPORTED_MODULE_0___default()(this.start) ) ).format('YYYY-MM-DD HH:mm:ss');
			eventSource.events.push(newEvent);
		}

		return eventSource;
	};

	/**
     * 根据规则生成日期数组
     * @returns {Object[]} 包含一系列`Moment`日期对象的数组.
     */
	_getRenderRepeatDay(start, end) {
		/*
		const rptRule = {
			"Daily": "Daily", //每日
			"EveryWeekday": "EveryWeekday135", //每个工作日135
			"EveryWeek": "EveryWeek7123456", //每周 日一二三四五六
			"Every2Weeks" : "Every2Weeks", //每两周
			"Monthly": "Monthly", //每月
			"Yearly": "Yearly", //每年
			"ChineseMonthly": "ChineseMonthly", //农历每月
			"ChineseYearly": "ChineseYearly", //农历每年
		};
		*/
		const rptRule = this.rptRule;
		let dayArray;
		console.log(rptRule)
		if (/^Every(|\d)Week(|day)(\d*)$/.test(rptRule) ) {
			// 每[1234]周[7123456]
			const results = /^Every(|\d)Week(|day)(\d*)$/.exec(rptRule);
			const interWeek = results[1]
			const number = results[3];
			dayArray = this._getWeeklyRepeatDay(number, start, end, interWeek);
		} else if ( /^EveryWeek|EveryWeekday$/.test(rptRule) ) {
			// 每个工作日
			dayArray = this._getWeeklyRepeatDay('12345', start, end);
		} else if ( "Daily" == rptRule ) {
			dayArray = this._getWeeklyRepeatDay('0123456', start, end);
		} else if ( "Weekly" == rptRule ) {
			const curWeekDay = moment__WEBPACK_IMPORTED_MODULE_0___default()(this.start).day();
			dayArray = this._getWeeklyRepeatDay(`${curWeekDay}`, start, end);
		}
		//TODO: 完成剩下的重复规则
		/*
		switch ( true ){
				// 每天，固定间隔
				case "Daily":
					getWeeklyRepeatDay(dayArray, [1, 2, 3, 4, 5, 6, 7]);
					break;
				// 每周，固定间隔
				case "Weekly":
					getWeeklyRepeatDay(dayArray, [eventStart.getDay()]);
					break;
				// 每两周，固定间隔
				case "Every2Weeks":
					getWeeklyRepeatDay(dayArray, [eventStart.getDay()]);
					for (var i = 0; i < dayArray.length; ++ i){
						var inter = _interDays(_d2s(eventStart), _d2s(dayArray[i][0]));
						if ((parseFloat((inter-1)/7.0) % 2) != 0 ){
							dayArray.splice(i, 1);
							i --;
						}
					}
					break;
				// 每月
				case "Monthly":
					getMonthlyRepeatDay(dayArray);
					break;
				// 每年
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
				default:{
					if (g_repeatRule.indexOf("EveryWeek") == 0){
						var days = g_repeatRule.substr("EveryWeek".length).split('');
						getWeeklyRepeatDay(dayArray, days);
					}
				}
				
			}
			*/
			return dayArray;
	};

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
		let dayArray = [];
		const intervalWeeks = interWeeks ? parseInt(interWeeks) : 1;
		const weekdays = number.replace('7', '0').split(''); //周日0~6周六
		for ( let day of weekdays ) {
			//
			let curWeekDay = parseInt(day), newEventStartDate = moment__WEBPACK_IMPORTED_MODULE_0___default()(viewStart)
			do {
				// 创建新Moment对象
				newEventStartDate = moment__WEBPACK_IMPORTED_MODULE_0___default()(viewStart).day(curWeekDay);
				// 根据日程设置time part
				const eventStart = moment__WEBPACK_IMPORTED_MODULE_0___default()(this.start)
				newEventStartDate.set({
					'hour': eventStart.get('hour'),
					'minute': eventStart.get('minute'),
					'second': eventStart.get('second')
				})
				// 避免初始重复渲染
				if ( !newEventStartDate.isSame( eventStart ) ) dayArray.push( moment__WEBPACK_IMPORTED_MODULE_0___default()(newEventStartDate) );
				// 隔多少周重复
				curWeekDay += 7*intervalWeeks;
				//console.log( moment(newEventStartDate).format('YYYY-MM-DD HH:mm:ss') );
			} while ( moment__WEBPACK_IMPORTED_MODULE_0___default()(viewStart).day(curWeekDay + 7 ).isBefore( viewEnd ) )
			
		}
		
		return dayArray;
	}

	toFullCalendarEvent() {
		// 注意方法返回的只是FullCalendarEvent的数据类型，并不是event对象
		const that = this;
		const newEvent = {};
		const keys = Object.keys(this);
		// 去除非必要属性
		keys.splice( keys.findIndex( (i) => i == '_Info' ), 1);
		keys.splice( keys.findIndex( (i) => i == '_ExtraInfo' ), 1);
		// 浅拷贝, 不过主要属性都是基本数据类型，所以不存在引用问题
		keys.forEach(function(item, index, arr){
			newEvent[item] = that[item];
		});
		return newEvent;
	};

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
	};

	addToFullCalendar() {
		//TODO: 将自身添加到FullCalendar
		if (!g_cal) throw new Error('Can not find FullCalendar Widget.')
		g_cal.fullCalendar( 'addEventSource', {
			events: [
				this.toFullCalendarEvent()
			]
		});
	};

	_saveAllProp() {
		//TODO: 保存全部数据包括Title
		// 更新事件文档数据
		const doc = _WizInterface__WEBPACK_IMPORTED_MODULE_2__["WizDatabase"].DocumentFromGUID(this.id);
		// 保存标题
		doc.Title = this.title;
		// 保存时间数据
		if ( this.allDay ) {
			let startStr = moment__WEBPACK_IMPORTED_MODULE_0___default()(this.start).set({'h': 0, 'm': 0, 's': 0}).format('YYYY-MM-DD HH:mm:ss');
			let endStr = moment__WEBPACK_IMPORTED_MODULE_0___default()(this.end).set({'h': 23, 'm': 59, 's': 59}).format('YYYY-MM-DD HH:mm:ss');
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
	};

	// 设置文档属性值
	_setParamValue(doc, key, value) {
		if (!doc) return false;
		doc.SetParamValue(key, value);
	};

	_createWizEventDoc() {
		//TODO: 保存全部数据包括Title
		// 创建WizDoc
		const location = `My Events/${ moment__WEBPACK_IMPORTED_MODULE_0___default()(this.start).format('YYYY-MM') }/`;
		const objFolder = _WizInterface__WEBPACK_IMPORTED_MODULE_2__["WizDatabase"].GetFolderByLocation(location, true);
		const tempHtml = _WizInterface__WEBPACK_IMPORTED_MODULE_2__["WizCommonUI"].GetATempFileName('.html');
		const htmlText = this._getEventHtml(this.title, '');
		_WizInterface__WEBPACK_IMPORTED_MODULE_2__["WizCommonUI"].SaveTextToFile(tempHtml, htmlText, 'unicode');
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

	saveToWizEventDoc( prop = 'all' ) {
		if (!_WizInterface__WEBPACK_IMPORTED_MODULE_2__["WizDatabase"] || !_WizInterface__WEBPACK_IMPORTED_MODULE_2__["WizCommonUI"]) throw new Error('IWizDatabase or IWizCommonUI is not valid.');
		//检查文档是否存在
		const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
		const isWizDocExist = guidRegex.test(this.id);
		// 创建或者更新文档
		if ( isWizDocExist ) {
			// 根据指令更新内容
			this._saveAllProp();
			// 更新FullCalendar
		} else {
			// 创建新的事件文档
			this._createWizEventDoc();
		}
		
	};

	deleteEventData( isDeleteDoc = false ){
		if (!g_cal) throw new Error('Can not find FullCalendar Widget.')
		let doc = _WizInterface__WEBPACK_IMPORTED_MODULE_2__["WizDatabase"].DocumentFromGUID(this.id);
		if (!doc) throw new Error('Can not find Event related WizDocument.')
		// 移除FullCalendar事件
		g_cal.fullCalendar('removeEvents', this.id);
		// 移除日历数据
		doc.RemoveFromCalendar();
		// 删除文档
		if ( isDeleteDoc ) doc.Delete();
	}

	refetchData() {
		//TODO: 重数据库重新获取数据更新实例
	};

	refreshEvent(event) {
		//TODO: 应该自动遍历并修改属性
		if ( event ) {
			// 重新渲染FullCalendar事件
			event.title = this.title;
			event.backgroundColor = this.backgroundColor;
			g_cal.fullCalendar('updateEvent', event);
		} else {
			//用.fullCalendar( ‘clientEvents’ [, idOrFilter ] ) -> Array 获取源数据从而更新
			//TODO: 遍历并寻找GUID匹配的事件
		}
	}

}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/Config.js":
/*!***********************!*\
  !*** ./src/Config.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
    colorCount: 12,
    colorItems: [
        { "colorValue": "#32CD32", "colorName": '橄榄绿' },
        { "colorValue": "#5484ED", "colorName": '宝石蓝' },
        { "colorValue": "#A4BDFE", "colorName": '蓝色' },
        { "colorValue": "#46D6DB", "colorName": '青绿色' },
        { "colorValue": "#7AE7BF", "colorName": '绿色' },
        { "colorValue": "#51B749", "colorName": '清新绿' },
        { "colorValue": "#FBD75B", "colorName": '黄色' },
        { "colorValue": "#FFB878", "colorName": '橘色' },
        { "colorValue": "#FF887C", "colorName": '红色' },
        { "colorValue": "#DC2127", "colorName": '奢华红' },
        { "colorValue": "#DBADFF", "colorName": '紫色' },
        { "colorValue": "#E1E1E1", "colorName": '灰色' }
    ],

});

/***/ }),

/***/ "./src/Modal/EventCreateModal.js":
/*!***************************************!*\
  !*** ./src/Modal/EventCreateModal.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventCreateModal; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bootstrap_js_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap/js/modal */ "./node_modules/bootstrap/js/modal.js");
/* harmony import */ var bootstrap_js_modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bootstrap_js_modal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utils_FormHandles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Utils/FormHandles */ "./src/Utils/FormHandles.js");
/* harmony import */ var _Widget_DateTimePicker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Widget/DateTimePicker */ "./src/Widget/DateTimePicker.js");
/* harmony import */ var _Widget_ColorPicker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Widget/ColorPicker */ "./src/Widget/ColorPicker.js");
/* harmony import */ var _EventModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./EventModal */ "./src/Modal/EventModal.js");








class EventCreateModal extends _EventModal__WEBPACK_IMPORTED_MODULE_5__["default"] {

    constructor(args) {
        super(args);
        //TODO: 想办法避免导出全局变量
        window.g_createModal = this;
    };

    update(args) {
        this.resetFormInput(this.modal, '#tc-createpage-eventstart,#tc-createpage-eventend');
        super.update(args);
    };

    renderTemplate() {
        // 渲染 DOM
        this.renderFormComponent(this.modal, [
            {
                node: this.modal,
                eventName: 'shown.bs.modal',
                handle: () => this.modal.find('#tc-createpage-eventtitle').focus(),
            },
            {
                node: '#tc-createpage-eventstart',
                value: this.args.start.format('YYYY-MM-DD HH:mm:ss'),
                renderer: _Widget_DateTimePicker__WEBPACK_IMPORTED_MODULE_3__["createDatetimePicker"]
            },
            {
                node: '#tc-createpage-eventend',
                value: this.args.end.format('YYYY-MM-DD HH:mm:ss'),
                renderer: _Widget_DateTimePicker__WEBPACK_IMPORTED_MODULE_3__["createDatetimePicker"]
            },
            {
                node: '#tc-createpage-eventcolor',
                value: '',
                renderer: _Widget_ColorPicker__WEBPACK_IMPORTED_MODULE_4__["createColorPicker"]
            },
            {
                node: '#tc-createpage-create',
                eventName: 'click',
                handle: () => new _Utils_FormHandles__WEBPACK_IMPORTED_MODULE_2__["default"]().onCreateBtnClick(this.args.start, this.args.end, this.args.jsEvent, this.args.view, this.modal),
            },
            {
                node: '#tc-createpage-cancel,#tc-createpage-close',
                eventName: 'click',
                handle: () => jquery__WEBPACK_IMPORTED_MODULE_0___default()('#calendar').fullCalendar('unselect')
            }
        ]);
    };

    get HtmlTemplate() {
        return `
            <div class="modal fade" tabindex="-1" role="dialog" id="tc-EventCreateModal" aria-labelledby="tc-createpage-dialogtitle">
                <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                    <button id='tc-createpage-close' type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id='tc-createpage-dialogtitle'>创建新的日程</h4>
                    </div> 
                    <div class="modal-body">
                    <form>
                        <div class="row">
                        <div class='form-group col-md-12'>
                            <label for="tc-createpage-eventtitle">标题</label>
                            <input type="text" class="form-control eventtitle" id="tc-createpage-eventtitle">
                        </div>
                        </div>
                        <div class="row">
                        <div class="form-group col-md-6">
                            <label for="tc-createpage-eventstart" class="col-form-label">开始日期</label>
                            <input type="text" class="form-control datetimepicker-input eventstart" id="tc-createpage-eventstart" data-toggle="datetimepicker" data-target="#tc-createpage-eventstart" readonly/>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="tc-createpage-eventend" class="col-form-label">结束日期</label>
                            <input type='text' class="form-control eventend" id='tc-createpage-eventend' readonly/>
                        </div>
                        </div>
                        <div class="row">
                        <div class="form-group col-md-6">
                            <label for="tc-createpage-eventcolor" class="col-form-label">色彩</label>
                            <input id="tc-createpage-eventcolor" class="form-control eventcolor" >
                        </div>
                        <div class="form-group col-md-6">
                            <label for="tc-createpage-eventtags" class="col-form-label">标签</label>
                            <input id="tc-createpage-eventtags" class="form-control eventtags" > 
                        </div>
                        </div>
                        <div class="row">
                        <div class='form-group col-md-12'>
                            <label for="tc-createpage-eventremark">备注</label>
                            <textarea class="form-control eventremark" id="tc-createpage-eventremark" rows="3"></textarea>
                        </div>
                        </div>
                    </form>
                    </div>
                    <div class="modal-footer">
                    <div class='row'>
                        <div class='col-xs-12' >
                            <button id='tc-createpage-create' class="btn btn-success" type="button">创建</button>      
                            <button id='tc-createpage-cancel' type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        `
    }
}

/***/ }),

/***/ "./src/Modal/EventEditModal.js":
/*!*************************************!*\
  !*** ./src/Modal/EventEditModal.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventEditModal; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bootstrap_js_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap/js/modal */ "./node_modules/bootstrap/js/modal.js");
/* harmony import */ var bootstrap_js_modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bootstrap_js_modal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utils_FormHandles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Utils/FormHandles */ "./src/Utils/FormHandles.js");
/* harmony import */ var _Widget_DateTimePicker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Widget/DateTimePicker */ "./src/Widget/DateTimePicker.js");
/* harmony import */ var _Widget_ColorPicker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Widget/ColorPicker */ "./src/Widget/ColorPicker.js");
/* harmony import */ var _EventModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./EventModal */ "./src/Modal/EventModal.js");







class EventEditModal extends _EventModal__WEBPACK_IMPORTED_MODULE_5__["default"] {

    constructor(args) {
        super(args);
        //TODO: 想办法避免全局变量
        window.g_editModal = this;
    };

    renderTemplate() {
        const that = this;
        const event = this.args.event;
        this.renderFormComponent(this.modal, [
            {//所有输入框
                node: 'input',
                eventName: 'change',
                handle: () => that.modal.find('#tc-editpage-save').attr('disabled', false)
            },
            {//标题
                node: '#tc-editpage-eventtitle',
                value: event.title,
            },
            {//开始日期
                node: '#tc-editpage-eventstart',
                value: event.start.format('YYYY-MM-DD HH:mm:ss'),
                renderer: _Widget_DateTimePicker__WEBPACK_IMPORTED_MODULE_3__["createDatetimePicker"],
                eventName: 'dp.change',
                handle: () => that.modal.find('#tc-editpage-save').attr('disabled', false)
            },
            {//结束日期
                node: '#tc-editpage-eventend',
                value: event.end.format('YYYY-MM-DD HH:mm:ss'),
                renderer: _Widget_DateTimePicker__WEBPACK_IMPORTED_MODULE_3__["createDatetimePicker"],
                eventName: 'dp.change',
                handle: () => that.modal.find('#tc-editpage-save').attr('disabled', false)
            },
            {//颜色
                node: '#tc-editpage-eventcolor',
                value: event.backgroundColor,
                renderer: (node) => {
                    jquery__WEBPACK_IMPORTED_MODULE_0___default()(node).css('background-color', event.backgroundColor);
                    Object(_Widget_ColorPicker__WEBPACK_IMPORTED_MODULE_4__["createColorPicker"])(node)
                }
            },
            {//保存按钮
                node: '#tc-editpage-save',
                renderer: (node) => jquery__WEBPACK_IMPORTED_MODULE_0___default()(node).attr('disabled', true),
                eventName: 'click',
                handle: () => {
                    new _Utils_FormHandles__WEBPACK_IMPORTED_MODULE_2__["default"]().onSaveBtnClick(event, that.modal);
                    that.hide()
                }
            },
			{// 完成按钮
				node: '#tc-editpage-finish',
				eventName: 'click',
				handle: () => {
					formHandles.onCompleteBtnClick(event);
					that.hide();
				}
			},
            {//删除按钮
                node: '#tc-editpage-delete',
                eventName: 'click',
                handle: () => {
                    new _Utils_FormHandles__WEBPACK_IMPORTED_MODULE_2__["default"]().onDeleteDataBtnClick(event);
                    that.hide();
                }
            },
            {//删除源文档
                node: '#tc-editpage-deleteEventDoc',
                eventName: 'click',
                handle: () => {
                    new _Utils_FormHandles__WEBPACK_IMPORTED_MODULE_2__["default"]().onDeleteDocBtnClick(event);
                    that.hide()
                }
            }
        ])
    };

    get HtmlTemplate() {
        return `
            <div class="modal fade" tabindex="-1" role="dialog" id='tc-EventEditModal'>
                <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">日程编辑</h4>
                    </div> 
                    <div class="modal-body">
                    <form>
                        <div class="row">
                        <div class='form-group col-md-12'>
                            <label for="tc-editpage-eventtitle">标题</label>
                            <input type="text" class="form-control eventtitle" id="tc-editpage-eventtitle">
                        </div>
                        </div>
                        <div class="row">
                        <div class="form-group col-md-6">
                            <label for="tc-editpage-eventstart" class="col-form-label">开始日期</label>
                            <input type="text" class="form-control datetimepicker-input eventstart" id="tc-editpage-eventstart" data-toggle="datetimepicker" data-target="#tc-editpage-eventstart"/>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="tc-editpage-eventend" class="col-form-label">结束日期</label>
                            <input type='text' class="form-control eventend" id='tc-editpage-eventend' />
                        </div>
                        </div>
                        <div class="row">
                        <div class="form-group col-md-6">
                            <label for="tc-editpage-eventcolor" class="col-form-label">色彩</label>
                            <input id="tc-editpage-eventcolor" class="form-control eventcolor" >
                        </div>
                        <div class="form-group col-md-6">
                            <label for="tc-editpage-eventtags" class="col-form-label">标签</label>
                            <input id="tc-editpage-eventtags" class="form-control eventtags" > 
                        </div>
                        </div>
                        <div class="row">
                        <div class='form-group col-md-12'>
                            <label for="tc-editpage-eventremark">备注</label>
                            <textarea class="form-control eventremark" id="tc-editpage-eventremark" rows="3"></textarea>
                        </div>
                        </div>
                    </form>
                    </div>
                    <div class="modal-footer">
                    <div class='row' style='text-align: left;'>
                        <div class='col-md-6'>
                        <div id="tc-editpage-buttongroup" class="btn-group" role="group">
                            <button id='tc-editpage-save' class="btn btn-danger" type="button" disabled>保存</button>
                            <button id='tc-editpage-finish' class="btn btn-default" type="button">完成</button>
                            <button id='tc-editpage-delete' class="btn btn-default" type="button">删除</button>
                            <button id='tc-editpage-deleteEventDoc' class="btn btn-default" type="button">删除源文档</button>
                        </div>
                        </div>
                        <div class='col-md-2 col-md-offset-4' style='text-align: right;'>
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        </div>
                    </div>

                    </div>
                </div>
                </div>
            </div>
        `
    }

}

/***/ }),

/***/ "./src/Modal/EventModal.js":
/*!*********************************!*\
  !*** ./src/Modal/EventModal.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventModal; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bootstrap_js_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap/js/modal */ "./node_modules/bootstrap/js/modal.js");
/* harmony import */ var bootstrap_js_modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bootstrap_js_modal__WEBPACK_IMPORTED_MODULE_1__);



class EventModal {

    constructor(args) {
        this.args = args;
        const html = this.HtmlTemplate;
        this.modal = jquery__WEBPACK_IMPORTED_MODULE_0___default()(html).modal({
            show: false
        });
        this.renderTemplate();
    };

    update(args) {
        this.args = args;
        this.renderTemplate();
    };

    show() {
        this.modal.modal('show');
    };

    hide() {
        this.modal.modal('hide');
    };

    /**
     * 写入HTML模板.
     */
    get HtmlTemplate() {
        return `
            <div class="modal fade" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Modal title</h4>
                </div>
                <div class="modal-body">
                    <p>One fine body&hellip;</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
            </div><!-- /.modal -->
        `
    };

    /**
     * 由子类定义渲染任务.
     */
    renderTemplate() { };

    /**
     * 渲染模态框表单组件.
     * @param {string|HTMLElement} modalNode - 表单或包含表单的块元素|CSS选择器.
     * @param {Object[]} tasks - 任务列表.
     * @param {string} tasks[].node - CSS选择器.
     * @param {string} tasks[].value - 需要填入的值.
     * @param {Function} tasks[].renderer - 组件渲染器.
     * @param {string} tasks[].eventName - 事件名称.
     * @param {Function} tasks[].handle - 句柄.
     */
    renderFormComponent(modalNode, tasks) {
        for (let task of tasks) {
            let $comps = jquery__WEBPACK_IMPORTED_MODULE_0___default()(modalNode).get(0) == jquery__WEBPACK_IMPORTED_MODULE_0___default()(task.node).get(0) ? jquery__WEBPACK_IMPORTED_MODULE_0___default()(task.node) : jquery__WEBPACK_IMPORTED_MODULE_0___default()(modalNode).find(task.node);
            // 渲染组件
            if ( task.value ) $comps.val(task.value);
            if ( typeof task.renderer == 'function' ) task.renderer($comps);
            // 绑定句柄
            if ( task.handle && typeof task.handle == 'function' && task.eventName ) {
                this.refreshEventHandle($comps, task.eventName, task.handle);
            }
        }
    };

    /**
     * 刷新事件句柄.
     * @param {string|HTMLElement} node - 元素或CSS选择器.
     * @param {string} jsEventName - 要刷新的事件名称.
     * @param {function} handle - 要绑定的句柄
     */
    refreshEventHandle(node, jsEventName, handle) {
        // 利用jQuery本身的类数组特性实现多个绑定；
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(node).off(jsEventName).on(jsEventName, handle);
        return jquery__WEBPACK_IMPORTED_MODULE_0___default()(node);
    }

    /**
     * 重置表单.
     * @param {string|HTMLElement} form - 表单或包含表单的块元素|CSS选择器.
     * @param {string} excludes - 用CSS选择器代表需要排除的元素.
     */
    resetFormInput(form, excludes) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(form).find('input').not(excludes).each(function(index,element){
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).css('background-color', '');
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).val('');
        })
    }
}

/***/ }),

/***/ "./src/Utils/FormHandles.js":
/*!**********************************!*\
  !*** ./src/Utils/FormHandles.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FormHandles; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _WizEventDataLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../WizEventDataLoader */ "./src/WizEventDataLoader.js");
/* harmony import */ var _CalendarEvent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CalendarEvent */ "./src/CalendarEvent.js");
/* harmony import */ var _WizInterface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../WizInterface */ "./src/WizInterface.js");





const g_cal = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#calendar');

class FormHandles {
    constructor() {

    };

    onCreateBtnClick(start, end, jsEvent, view, formNode) {
        const title = jquery__WEBPACK_IMPORTED_MODULE_0___default()(formNode).find('#tc-createpage-eventtitle').val();
        const color = jquery__WEBPACK_IMPORTED_MODULE_0___default()(formNode).find('#tc-createpage-eventcolor').val();
        new _WizEventDataLoader__WEBPACK_IMPORTED_MODULE_1__["default"]().createEvent({start, end, jsEvent, view}, {title, color}); // 这一步耗时
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(formNode).modal('hide');
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#calendar').fullCalendar('unselect');
    };

    onSaveBtnClick(event, formNode) {
        //TODO: 完成开始与结束时间变更
        //TODO: 通过在formNode搜索.eventtitle,.eventcolor等class来获取变量
        if (!g_cal) throw new Error('Can not find FullCalendar Widget.');
        // 保存数据
        const newEvent = new _CalendarEvent__WEBPACK_IMPORTED_MODULE_2__["default"](event.id);
        newEvent.title = formNode.find('.eventtitle').val();
        newEvent.backgroundColor = formNode.find('.eventcolor').val();
        console.log(newEvent)
        // 保存到数据文档
        newEvent.saveToWizEventDoc();
        newEvent.refreshEvent(event)
    };

    onCompleteBtnClick(event) {
        if (!g_cal) throw new Error('Can not find FullCalendar Widget.');
        // 修改数据
        const isComplete = parseInt(event.complete) == 5;
        if ( isComplete ) {
            event.complete = '0';
        } else {
            event.complete = '5';
        }
        // 保存数据
        const newEvent = new _CalendarEvent__WEBPACK_IMPORTED_MODULE_2__["default"](event);
        newEvent.saveToWizEventDoc();
        // 重新渲染
        g_cal.fullCalendar( 'updateEvent', event );
    };

    onDeleteDataBtnClick(event) {
        if (!g_cal) throw new Error('Can not find FullCalendar Widget.');
        if ( Object(_WizInterface__WEBPACK_IMPORTED_MODULE_3__["WizConfirm"])("确定要删除该日程？", '番茄助理') ) {
            // 删除日程
            let newEvent = new _CalendarEvent__WEBPACK_IMPORTED_MODULE_2__["default"](event);
            newEvent.deleteEventData(false);
        }
    };

    onDeleteDocBtnClick(event) {
        if (!g_cal) throw new Error('Can not find FullCalendar Widget.');
        if ( Object(_WizInterface__WEBPACK_IMPORTED_MODULE_3__["WizConfirm"])("确定要删除该日程源文档？\n「确定」将会导致相关笔记被删除！", '番茄助理') ) {
            let newEvent = new _CalendarEvent__WEBPACK_IMPORTED_MODULE_2__["default"](event);
            newEvent.deleteEventData(true);
        }	
    };

}

/***/ }),

/***/ "./src/Utils/FormUtils.js":
/*!********************************!*\
  !*** ./src/Utils/FormUtils.js ***!
  \********************************/
/*! exports provided: resetFormInput, renderFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetFormInput", function() { return resetFormInput; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderFormComponent", function() { return renderFormComponent; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);




/**
 * 刷新事件句柄.
 * @param {string|HTMLElement} node - 元素或CSS选择器.
 * @param {string} jsEventName - 要刷新的事件名称.
 * @param {function} handle - 要绑定的句柄
 */
function refreshEventHandle(node, jsEventName, handle) {
	// 利用jQuery本身的类数组特性实现多个绑定；
	jquery__WEBPACK_IMPORTED_MODULE_0___default()(node).off(jsEventName).on(jsEventName, handle);
	return jquery__WEBPACK_IMPORTED_MODULE_0___default()(node);
}

/**
 * 重置表单.
 * @param {string|HTMLElement} form - 表单或包含表单的块元素|CSS选择器.
 * @param {string} excludes - 用CSS选择器代表需要排除的元素.
 */
function resetFormInput(form, excludes) {
	jquery__WEBPACK_IMPORTED_MODULE_0___default()(form).find('input').not(excludes).each(function(index,element){
		jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).css('background-color', '');
		jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).val('');
	})
}

/**
 * 渲染模态框表单组件.
 * @param {string|HTMLElement} modalNode - 表单或包含表单的块元素|CSS选择器.
 * @param {Object[]} tasks - 任务列表.
 * @param {string} tasks[].node - CSS选择器.
 * @param {string} tasks[].value - 需要填入的值.
 * @param {Function} tasks[].renderer - 组件渲染器.
 * @param {string} tasks[].eventName - 事件名称.
 * @param {Function} tasks[].handle - 句柄.
 */
function renderFormComponent(modalNode, tasks) {
	for (let task of tasks) {
		let $comps = jquery__WEBPACK_IMPORTED_MODULE_0___default()(modalNode).get(0) == jquery__WEBPACK_IMPORTED_MODULE_0___default()(task.node).get(0) ? jquery__WEBPACK_IMPORTED_MODULE_0___default()(task.node) : jquery__WEBPACK_IMPORTED_MODULE_0___default()(modalNode).find(task.node);
		// 渲染组件
		if ( task.value ) $comps.val(task.value);
		if ( typeof task.renderer == 'function' ) task.renderer($comps);
		// 绑定句柄
		if ( task.handle && typeof task.handle == 'function' && task.eventName ) refreshEventHandle($comps, task.eventName, task.handle);
	}
}

/**
 * 绑定模态框按钮句柄, 通过 refreshEventHandler
 * @param {string|HTMLElement} modalNode - 表单或包含表单的块元素|CSS选择器.
 * @param {Object[]} tasks - 任务列表.
 * @param {string} tasks[].node - CSS选择器.
 * @param {string} tasks[].eventName - 事件名称.
 * @param {Function} tasks[].handle - 句柄.
 */
function bindModalHandle(modalNode, tasks) {
	//TODO: 是否可以将bindModalHandle与renderModalForm合二为一？
	for (let task of tasks) {
		// 判断是否绑定modalNode的句柄
		let $comps = jquery__WEBPACK_IMPORTED_MODULE_0___default()(modalNode).get(0) == jquery__WEBPACK_IMPORTED_MODULE_0___default()(task.node).get(0) ? jquery__WEBPACK_IMPORTED_MODULE_0___default()(task.node) : jquery__WEBPACK_IMPORTED_MODULE_0___default()(modalNode).find(task.node);
		if ( typeof task.handle == 'function' ) refreshEventHandle($comps, task.eventName, task.handle);
	}
}

/***/ }),

/***/ "./src/Widget/ColorPicker.js":
/*!***********************************!*\
  !*** ./src/Widget/ColorPicker.js ***!
  \***********************************/
/*! exports provided: createColorPicker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createColorPicker", function() { return createColorPicker; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jquery_ui_ui_widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery-ui/ui/widget */ "./node_modules/jquery-ui/ui/widget.js");
/* harmony import */ var jquery_ui_ui_widget__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery_ui_ui_widget__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var huebee_dist_huebee_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! huebee/dist/huebee.css */ "./node_modules/huebee/dist/huebee.css");
/* harmony import */ var huebee_dist_huebee_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(huebee_dist_huebee_css__WEBPACK_IMPORTED_MODULE_2__);


/* NPM 版本 Huebee 源代码中 pointerdown 事件在 Chrome 55 以后才实现
 * Wiznote 只能使用跨浏览器兼容版，所以导入打包版 */
const Huebee = __webpack_require__(/*! huebee/dist/huebee.pkgd */ "./node_modules/huebee/dist/huebee.pkgd.js"); 




jquery__WEBPACK_IMPORTED_MODULE_0___default.a.widget("tc.ColorPicker", {
	options: {
		staticOpen: false, // Displays open and stays open. 
		setText: true, // Sets elements’ text to color. 将原始的文本设置设置成颜色值.
		setBGColor: true, // Sets elements’ background color to color.
		hues: 12, // Number of hues of the color grid. Hues are slices of the color wheel.
		hue0: 0, // The first hue of the color grid. 
		shades: 5, // Number of shades of colors and shades of gray between white and black. 
		saturations: 3, // Number of sets of saturation of the color grid.
		customColors: null, // Custom colors added to the top of the grid. 
		notation: 'hex', // Text syntax of colors values.
		className: null, // Class added to Huebee element. Useful for CSS.
		onchange: null,
	},

	_create: function() {
		// 创建实例
		this.huebeeInstance = new Huebee(this.element.get(0), this.options);
		// 重写了该方法，判断input内容是否相同并触发 change 事件
		this.huebeeInstance.setTexts = function() {
			if ( !this.setTextElems ) {
				return;
			}
			  for ( var i=0; i < this.setTextElems.length; i++ ) {
				var elem = this.setTextElems[i];
				var property = elem.nodeName == 'INPUT' ? 'value' : 'textContent';
				// 触发change事件
				if ( elem.value != this.color ) {
					elem[ property ] = this.color;
					elem.dispatchEvent(new Event('change'));
				}
			}
		};
		this.huebeeInstance.on( 'change', this.options.onchange);
		
	}
})


/**
 * 创建颜色拾取器.
 * @param {string|HTMLElement} node - 元素或CSS选择器.
 */
function createColorPicker(node) {
	//TODO: 读取Config
	jquery__WEBPACK_IMPORTED_MODULE_0___default()(node).ColorPicker({
		saturations: 2,
		shades: 5,
		customColors: [ '#32CD32', '#5484ED', '#A4BDFE', 
		'#46D6DB', '#7AE7BF', '#51B749',
		'#FBD75B', '#FFB878', '#FF887C', 
		'#DC2127', '#DBADFF', '#E1E1E1'	],
		"staticOpen": false
	});

	return jquery__WEBPACK_IMPORTED_MODULE_0___default()(node);
}

/***/ }),

/***/ "./src/Widget/DateTimePicker.js":
/*!**************************************!*\
  !*** ./src/Widget/DateTimePicker.js ***!
  \**************************************/
/*! exports provided: createDatetimePicker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createDatetimePicker", function() { return createDatetimePicker; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var bootstrap_js_collapse__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bootstrap/js/collapse */ "./node_modules/bootstrap/js/collapse.js");
/* harmony import */ var bootstrap_js_collapse__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bootstrap_js_collapse__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var bootstrap_js_transition__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bootstrap/js/transition */ "./node_modules/bootstrap/js/transition.js");
/* harmony import */ var bootstrap_js_transition__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bootstrap_js_transition__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.css */ "./node_modules/bootstrap/dist/css/bootstrap.css");
/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var bootstrap_dist_css_bootstrap_theme_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap-theme.css */ "./node_modules/bootstrap/dist/css/bootstrap-theme.css");
/* harmony import */ var bootstrap_dist_css_bootstrap_theme_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_theme_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var eonasdan_bootstrap_datetimepicker__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! eonasdan-bootstrap-datetimepicker */ "./node_modules/eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js");
/* harmony import */ var eonasdan_bootstrap_datetimepicker__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(eonasdan_bootstrap_datetimepicker__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var eonasdan_bootstrap_datetimepicker_build_css_bootstrap_datetimepicker_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css */ "./node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css");
/* harmony import */ var eonasdan_bootstrap_datetimepicker_build_css_bootstrap_datetimepicker_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(eonasdan_bootstrap_datetimepicker_build_css_bootstrap_datetimepicker_css__WEBPACK_IMPORTED_MODULE_7__);









/**
 * 创建日期时间选择器.
 * @param {string|HTMLElement} node - 元素或CSS选择器.
 */
function createDatetimePicker(node) {
	//TOOD: 读取Config
	jquery__WEBPACK_IMPORTED_MODULE_0___default()(node).datetimepicker({
		format: 'YYYY-MM-DD HH:mm:ss'
	});

	return jquery__WEBPACK_IMPORTED_MODULE_0___default()(node);
}

/***/ }),

/***/ "./src/Widget/EventPopover/EventPopover.css":
/*!**************************************************!*\
  !*** ./src/Widget/EventPopover/EventPopover.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!./EventPopover.css */ "./node_modules/css-loader/index.js!./src/Widget/EventPopover/EventPopover.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader!./EventPopover.css */ "./node_modules/css-loader/index.js!./src/Widget/EventPopover/EventPopover.css", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!./EventPopover.css */ "./node_modules/css-loader/index.js!./src/Widget/EventPopover/EventPopover.css");

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

/***/ "./src/Widget/EventPopover/EventPopover.js":
/*!*************************************************!*\
  !*** ./src/Widget/EventPopover/EventPopover.js ***!
  \*************************************************/
/*! exports provided: renderEditPopper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderEditPopper", function() { return renderEditPopper; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jquery_ui_ui_widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery-ui/ui/widget */ "./node_modules/jquery-ui/ui/widget.js");
/* harmony import */ var jquery_ui_ui_widget__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery_ui_ui_widget__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.css */ "./node_modules/bootstrap/dist/css/bootstrap.css");
/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var bootstrap_dist_css_bootstrap_theme_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap-theme.css */ "./node_modules/bootstrap/dist/css/bootstrap-theme.css");
/* harmony import */ var bootstrap_dist_css_bootstrap_theme_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_theme_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var bootstrap_js_dropdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bootstrap/js/dropdown */ "./node_modules/bootstrap/js/dropdown.js");
/* harmony import */ var bootstrap_js_dropdown__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(bootstrap_js_dropdown__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _fortawesome_fontawesome_free_js_all__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/fontawesome-free/js/all */ "./node_modules/@fortawesome/fontawesome-free/js/all.js");
/* harmony import */ var _fortawesome_fontawesome_free_js_all__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_fontawesome_free_js_all__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var popper_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! popper.js */ "./node_modules/popper.js/dist/esm/popper.js");
/* harmony import */ var _EventPopover_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./EventPopover.css */ "./src/Widget/EventPopover/EventPopover.css");
/* harmony import */ var _EventPopover_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_EventPopover_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _Utils_FormUtils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../Utils/FormUtils */ "./src/Utils/FormUtils.js");
/* harmony import */ var _Utils_FormHandles__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../Utils/FormHandles */ "./src/Utils/FormHandles.js");
/* harmony import */ var _ColorPicker__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../ColorPicker */ "./src/Widget/ColorPicker.js");
/* harmony import */ var _Modal_EventEditModal__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../Modal/EventEditModal */ "./src/Modal/EventEditModal.js");















jquery__WEBPACK_IMPORTED_MODULE_0___default.a.widget("tc.EventPopover", {
	options: {
		title: 'No title !', //String
		template:
		`
		<div class="tc-popover" role="tooltip">
			<div class="arrow"></div>
			<div class="tc-popover-header">
				<input type="text" id="tc-editpopper-eventtitle"  form='tc-popover-event-editForm' class='eventtitle'>
			</div>
			<div class="tc-popover-body">
				<form id = 'tc-popover-event-editForm' class='form-horizontal'>
					<div class="form-group">
						<label for="tc-editpopper-eventdate" class="col-sm-2 col-form-label"><i class='far fa-calendar-alt fa-lg'></i></label>
						<div class="col-sm-10">
							<input type="text" readonly class="form-control eventdate" id="tc-editpopper-eventdate">
						</div>
					</div>
					<div class="form-group">
						<label for="tc-editpopper-eventcolor" class="col-sm-2 col-form-label"><i class="fas fa-paint-brush"></i></label>
						<div class="col-sm-10">
							<input id="tc-editpopper-eventcolor" class="form-control eventcolor" >
						</div>
					</div>
				</form>
				<div id="tc-editpopper-buttongroup" class="btn-group" role="group">
					<button id='tc-editpopper-save' class="btn btn-default" type="button">保存</button>
					<button id='tc-editpopper-finish' class="btn btn-default" type="button">完成</button>
					<button id='tc-editpopper-edit' class="btn btn-default" type="button">编辑</button>
					<button id='tc-editpopper-delete' class="btn btn-default" type="button">删除</button>
					<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						<span class="caret"></span>
					</button>
					<ul class="dropdown-menu dropdown-menu-right">
						<li>
							<a id='tc-editpopper-deleteEventDoc' href='javascript:void(0);'>删除源文档</a>
						</li>
					</ul>
				</div>

			</div>
		</div>
		`,
		placement: 'right',
		offset: '10px',
		autoShow: true,
		reference: null, // 用户输入时可以时jQuery或者HTMLElement
	},
	
	_create: function() {
		let that = this;
		let opts = this.options;
		
		// 检测是否提供reference，没有则设置为 this.element，统一格式化为jQuery对象；
		opts.reference = opts.reference ? jquery__WEBPACK_IMPORTED_MODULE_0___default()(opts.reference) : this.element;

		// 准备模板，有重复调用的bug
		this.$popperNode = this._processTemplate(opts.template);

		// 创建Popper实例(定位引擎)
		this.popperInstance = new popper_js__WEBPACK_IMPORTED_MODULE_6__["default"](opts.reference.get(0), this.$popperNode.get(0), {
			placement: opts.placement,
			modifiers: {
				arrow: {
				  element: '.arrow'
				}
			},
		});

		// 设置自动隐藏
		this._setAutoHide();

		//根据设置是否自动显示
		if ( opts.autoShow == true ) this.show();

	},

	_processTemplate: function(template) {
		const that = this;
		const opts = this.options;
		const event = opts.args.event;
		const $popper = jquery__WEBPACK_IMPORTED_MODULE_0___default()(template);
		const formHandles = new _Utils_FormHandles__WEBPACK_IMPORTED_MODULE_9__["default"]();

		Object(_Utils_FormUtils__WEBPACK_IMPORTED_MODULE_8__["renderFormComponent"])($popper, [
			{// 标题
				node: '#tc-editpopper-eventtitle',
				value: event.title,
				eventName: 'change',
				handle: () => $popper.find('#tc-editpopper-save').attr('disabled', false)
			},
			{// 日期
				node: '#tc-editpopper-eventdate',
				value: event.start.format('YYYY-MM-DD HH:mm:ss')
			},
			{// 颜色
				node: '#tc-editpopper-eventcolor',
				value: event.backgroundColor,
				renderer: (node) => {
					jquery__WEBPACK_IMPORTED_MODULE_0___default()(node).css('background-color', event.backgroundColor);
					Object(_ColorPicker__WEBPACK_IMPORTED_MODULE_10__["createColorPicker"])(node);
				},
				eventName: 'change',
				handle: () => $popper.find('#tc-editpopper-save').attr('disabled', false)
			},
			{// 保存按钮
				node: '#tc-editpopper-save',
				renderer: (node) => jquery__WEBPACK_IMPORTED_MODULE_0___default()(node).attr("disabled", true),
				eventName: 'click',
				handle: () => {
					formHandles.onSaveBtnClick(event, $popper);
					that.hide();
				}
			},
			{// 完成按钮
				node: '#tc-editpopper-finish',
				renderer: (node) => jquery__WEBPACK_IMPORTED_MODULE_0___default()(node).text(
					parseInt(event.complete) == 5 ? '恢复' : '完成'
				),
				eventName: 'click',
				handle: () => {
					formHandles.onCompleteBtnClick(event);
					that.hide();
				}
			},
			{// 编辑按钮
				node: '#tc-editpopper-edit',
				eventName: 'click',
				handle: () => {
					//TODO: 想办法不要用全局变量
					if ( !window.g_editModal ) new _Modal_EventEditModal__WEBPACK_IMPORTED_MODULE_11__["default"]({event});
					g_editModal.update({event});
					g_editModal.show();
				}
			},
			{// 删除日程数据按钮
				node: '#tc-editpopper-delete',
				eventName: 'click',
				handle: () => {
					formHandles.onDeleteDataBtnClick(event);
					that.hide();
				}
			},
			{// 删除源文档按钮
				node: '#tc-editpopper-deleteEventDoc',
				eventName: 'click',
				handle: () => {
					formHandles.onDeleteDocBtnClick(event);
					that.hide();
				}
			}
		])

		return $popper; // jQuery
	},

	_setAutoHide() {
		let opts = this.options;
		let that = this;

		// 先取消已有自动隐藏事件，方式反复添加句柄
		this._off(this.document, 'click');

		// 点击空白处自动隐藏
		this._on(this.document, {
			click: function(e) {
				if (
					// 不是日历事件元素
					!jquery__WEBPACK_IMPORTED_MODULE_0___default()(opts.reference).is(e.target) &&
					// 也不是子元素
					jquery__WEBPACK_IMPORTED_MODULE_0___default()(opts.reference).has(e.target).length === 0 &&
					// 不是popper元素
					 !that.$popperNode.is(e.target) &&
					// 也不是子元素
					that.$popperNode.has(e.target).length === 0
				) {
					that.hide();
				}
			}
		})
	},

	update: function() {
		// 根据Options更新popperInstance以及$popperNode
		let opts = this.options;
		// 设置自动隐藏
		this._setAutoHide();
		// 更新 $popperNode
		this.$popperNode = this._processTemplate(this.$popperNode); // 传入的是引用
		// 更新 popperInstance
		this.popperInstance.popper = this.$popperNode.get(0);
		this.popperInstance.reference = opts.reference ? jquery__WEBPACK_IMPORTED_MODULE_0___default()(opts.reference).get(0) : this.element.get(0);
		this.popperInstance.update();
	},

	show: function() {
		let opts = this.options;
		// 如果没有添加到DOM树则添加
		if( !jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.$popperNode).parent().is('body') ) jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.$popperNode).appendTo('body');
		// 显示$popperNode
		this._show(this.$popperNode);

	},

	hide: function() {
		//TODO: 隐藏Popover
		this._hide(this.$popperNode)
	},

	destroy: function() {
		this.popperInstance.destroy();
		jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.$popperNode).remove();
		this.$popperNode = null;
	}
})

/**
 * 渲染事件小弹窗.
 * @param {object} args 包含FullCalendar传入的参数.
 * @param {object} args.event FullCalendar事件.
 * @param {object} args.jsEvent native JavaScript 事件.
 * @param {object} args.view FullCalendar 视图.
 * @param {object} element is a jQuery element for the container of the new view.
 * @return {Object[]} 返回用于FullCalendar渲染的事件数组.
 */
function renderEditPopper(args, reference) {
	// 渲染弹窗
	const editPopper = jquery__WEBPACK_IMPORTED_MODULE_0___default()( '<div></div>' ).EventPopover({
		args: args,
		placement: 'auto',
		reference: reference,
	});

	return editPopper;
}

/***/ }),

/***/ "./src/WizEventDataLoader.js":
/*!***********************************!*\
  !*** ./src/WizEventDataLoader.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WizEventDataLoader; });
/* harmony import */ var _WizInterface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WizInterface */ "./src/WizInterface.js");
/* harmony import */ var _CalendarEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CalendarEvent */ "./src/CalendarEvent.js");



/* 数据获取
----------------------------------------------------------------------------------------------------------------------*/

/** 该类与Wiznote的WizDatabase接口交换信息，获取数据 */
class WizEventDataLoader {
	/**
     * 创造一个事件数据加载器.
	 * @param {string} start 查询起始日期，ISO标准日期字符串.
	 * @param {string} end 查询截至日期，ISO标准日期字符串.
     */
	constructor(start, end) {
		if (!_WizInterface__WEBPACK_IMPORTED_MODULE_0__["WizDatabase"]) throw new Error('WizDatabase not valid !');
		this.Database = _WizInterface__WEBPACK_IMPORTED_MODULE_0__["WizDatabase"];
		this.userName = _WizInterface__WEBPACK_IMPORTED_MODULE_0__["WizDatabase"].UserName;
		this.start = start;
		this.end = end;
	};

	/**
     * 获得渲染后的所有FullCalendar事件.
	 * @param {object} view is the View Object of FullCalendar for the new view.
	 * @param {object} element is a jQuery element for the container of the new view.
     * @return {Object[]} 返回用于FullCalendar 渲染的 eventSources 数组.
     */
	getEventSources( view, element ){
		const viewStart = view.start.format('YYYY-MM-DD HH:mm:ss');
		const viewEnd = view.end.format('YYYY-MM-DD HH:mm:ss');
		let eventSources = [];
		//获取普通日程
		const generalEventSource = {
			type: 'generalEvents',
			//events: this._getAllOriginalEvent([], this._d2s(currentView.start.toDate()), this._d2s(currentView.end.toDate()))
			events: this._getAllOriginalEvent(viewStart, viewEnd)
		}
		eventSources.push(generalEventSource);
		
		//TODO: 获取重复日程
		const repeatEventSources = this._getAllRepeatEvent(viewStart, viewEnd);
		eventSources = eventSources.concat(repeatEventSources);
		//
		return eventSources;
	};

	/**
     * 从WizDatabase中获取所有数据文档.
	 * @param {array} events 初始事件数组.
	 * @param {string} start ISO标准日期字符串.
	 * @param {string} end ISO标准日期字符串.
     * @return {Object[]} 返回用于FullCalendar渲染的事件数组.
     */
	_getAllOriginalEvent(start, end){
		const events = [];
		let sql = `DOCUMENT_LOCATION not like '/Deleted Items/%' and (KB_GUID is null or KB_GUID = '')`;
		let and1 = ` and DOCUMENT_GUID in (select DOCUMENT_GUID from WIZ_DOCUMENT_PARAM where PARAM_NAME = 'CALENDAR_START'  and  PARAM_VALUE <= '${end}' )`;
		let and2 = ` and DOCUMENT_GUID in (select DOCUMENT_GUID from WIZ_DOCUMENT_PARAM where PARAM_NAME = 'CALENDAR_END'  and  PARAM_VALUE >= '${start}' )`;
		if (start) sql += and2;
		if (end) sql += and1;
		if (_WizInterface__WEBPACK_IMPORTED_MODULE_0__["WizDatabase"].DocumentsDataFromSQL) {
			try {
				const data = _WizInterface__WEBPACK_IMPORTED_MODULE_0__["WizDatabase"].DocumentsDataFromSQL(sql);
				const obj = JSON.parse(data);
				if ( !obj || !Array.isArray(obj) ) return false;
				for (let i = 0; i < obj.length; i ++) {
					events.push(
						new _CalendarEvent__WEBPACK_IMPORTED_MODULE_1__["default"](obj[i]).toFullCalendarEvent()
					);
				}
				
				return events;
			}
			catch(err) {
				console.error(err);
				return false;
			}
		}
		else {
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

	};

	/**
     * 从WizDatabase中获取所有循环重复事件.
	 * 从创建事件的日期开始到ENDRECURRENCE结束
     * @return {Object[]} 返回用于FullCalendar渲染的 eventSource 数组.
     */
	_getAllRepeatEvent(start, end){
		const repeatEvents = [];
		const sql = "DOCUMENT_LOCATION not like '/Deleted Items/%' and (KB_GUID is null or KB_GUID = '') and " + 
					"DOCUMENT_GUID in (select DOCUMENT_GUID from WIZ_DOCUMENT_PARAM where PARAM_NAME='CALENDAR_RECURRENCE')";

		const data = _WizInterface__WEBPACK_IMPORTED_MODULE_0__["WizDatabase"].DocumentsDataFromSQL(sql);
		if ( !data ) return false;
		
		const obj = JSON.parse(data);
		if ( !obj || !Array.isArray(obj) ) return false;
		
		for (let i = 0; i < obj.length; i ++) {
			repeatEvents.push(
				new _CalendarEvent__WEBPACK_IMPORTED_MODULE_1__["default"](obj[i]).generateRepeatEvents(start, end)
			)
		}
		return repeatEvents;
		
	};

	// 日历事件拖动后更新数据
	updateEventDataOnDrop(event, delta, revertFunc, jsEvent, ui, view){
		// Call hasTime on the event’s start/end to see if it has been dropped in a timed or all-day area.
		const allDay = !event.start.hasTime();
		// 获取事件文档时间数据
		const doc = _WizInterface__WEBPACK_IMPORTED_MODULE_0__["WizDatabase"].DocumentFromGUID(event.id);
		// 更新数据
		if ( allDay ) {
			const startStr = event.start.set({'h': 0, 'm': 0, 's': 0}).format('YYYY-MM-DD HH:mm:ss');
			const endStr = event.end.set({'h': 23, 'm': 59, 's': 59}).format('YYYY-MM-DD HH:mm:ss');
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
	};

	// 设置文档属性值
	_setParamValue(doc, key, value) {
		if (!doc) return false;
		doc.SetParamValue(key, value);
	};

	// 更新WizDoc修改时间
	_updateDocModifyDate(doc){
		const now = new Date();
		if (!doc) return false;
		now.setSeconds((now.getSeconds() + 1) % 60);
		doc.DateModified = this._d2s(now);
	};

	// 将日期对象转化为字符串
	//TODO: 考虑依赖moment来简化转换过程
	_d2s(dt){
		const ret = dt.getFullYear() + "-" + 
					formatIntToDateString(dt.getMonth() + 1) + "-" + 
					formatIntToDateString(dt.getDate()) + " " + 
					formatIntToDateString(dt.getHours())+ ":" + 
					formatIntToDateString(dt.getMinutes()) + ":" + 
					formatIntToDateString(dt.getSeconds());
		return ret;
	};

	// 日历时间重置时间范围后更新数据
	updateEventDataOnResize(event, delta, revertFunc, jsEvent, ui, view){
		const allDay = event.start.hasTime() ? false : true;
		// 获得事件文档时间数据
		const doc = _WizInterface__WEBPACK_IMPORTED_MODULE_0__["WizDatabase"].DocumentFromGUID(event.id);
		// 计算更改后的结束时间
		const eventEndStr = event.end.format('YYYY-MM-DD HH:mm:ss');
		// 更新文档数据
		this._setParamValue(doc, "CALENDAR_END", eventEndStr);
		this._updateDocModifyDate(doc);
	};

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
	createEvent(selectionData, userInputs){
		try {
			// 获取用户设置
			const newEvent = new _CalendarEvent__WEBPACK_IMPORTED_MODULE_1__["default"]({
				title: userInputs.title ? userInputs.title : '无标题',
				start: selectionData.start,
				end: selectionData.end,
				allDay: selectionData.start.hasTime() && selectionData.end.hasTime() ? false : true,
				backgroundColor: userInputs.color ? userInputs.color : '#32CD32',
			});
			// 保存并渲染事件
			newEvent.saveToWizEventDoc();
			newEvent.refetchData();
			newEvent.addToFullCalendar();
		} catch (e) {console.log(e)}
	}

}


// TODO: 重写获取数据的方式
function _getWizEvent(start, end) {
	//TODO:
	let events = [];
	let EventCollection = _WizInterface__WEBPACK_IMPORTED_MODULE_0__["WizDatabase"].GetCalendarEvents2(start, end);
	return events
}

// 获得渲染后的重复日期
function getRenderRepeatDay(){
	var dayArray = new Array();
	var eventStart = new Date(_s2d(g_eventStart));
		
	switch (g_repeatRule){
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
            case "Weekly":// 每周
				getWeeklyRepeatDay(dayArray, [eventStart.getDay()]);
				break;
            case "Every2Weeks":
				getWeeklyRepeatDay(dayArray, [eventStart.getDay()]);
				for (var i = 0; i < dayArray.length; ++ i){
					var inter = _interDays(_d2s(eventStart), _d2s(dayArray[i][0]));
					if ((parseFloat((inter-1)/7.0) % 2) != 0 ){
						dayArray.splice(i, 1);
						i --;
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
			default:{
				if (g_repeatRule.indexOf("EveryWeek") == 0){
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
function formatIntToDateString(n){
		
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
function _s2d(str){
	if (!str)
		return '';
	var date = new Date(str.substr(0, 4),
					str.substr(5, 2) - 1,
					str.substr(8, 3),
					str.substr(11, 2),
					str.substr(14, 2),
					str.substr(17, 2)
					);		
	return date;
}


/***/ }),

/***/ "./src/WizInterface.js":
/*!*****************************!*\
  !*** ./src/WizInterface.js ***!
  \*****************************/
/*! exports provided: WizExplorerApp, WizExplorerWindow, WizDatabase, WizCommonUI, WizConfirm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WizExplorerApp", function() { return WizExplorerApp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WizExplorerWindow", function() { return WizExplorerWindow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WizDatabase", function() { return WizDatabase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WizCommonUI", function() { return WizCommonUI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WizConfirm", function() { return WizConfirm; });


//TODO: 判断window.external是否为WizHtmlEditorApp
const WizExplorerApp = window.external;
const WizExplorerWindow = WizExplorerApp.Window;
const WizDatabase = WizExplorerApp.Database;
const WizCommonUI = WizExplorerApp.CreateWizObject("WizKMControls.WizCommonUI");

function WizConfirm(msg, title) {
    return WizExplorerWindow.ShowMessage(msg, title, 0x00000020 | 0x00000001) == 1;
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
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fullcalendar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fullcalendar */ "./node_modules/fullcalendar/dist/fullcalendar.js");
/* harmony import */ var fullcalendar__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fullcalendar__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var fullcalendar_dist_fullcalendar_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fullcalendar/dist/fullcalendar.css */ "./node_modules/fullcalendar/dist/fullcalendar.css");
/* harmony import */ var fullcalendar_dist_fullcalendar_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fullcalendar_dist_fullcalendar_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _WizEventDataLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./WizEventDataLoader */ "./src/WizEventDataLoader.js");
/* harmony import */ var _Widget_EventPopover_EventPopover__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Widget/EventPopover/EventPopover */ "./src/Widget/EventPopover/EventPopover.js");
/* harmony import */ var _Modal_EventCreateModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Modal/EventCreateModal */ "./src/Modal/EventCreateModal.js");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./index.css */ "./src/index.css");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_6__);








$(function(){
    // 定义变量
	const dataLoader = new _WizEventDataLoader__WEBPACK_IMPORTED_MODULE_3__["default"]();
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
			if ( !window.g_createModal ) new _Modal_EventCreateModal__WEBPACK_IMPORTED_MODULE_5__["default"]({start, end, jsEvent, view});
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
				g_editPopper = Object(_Widget_EventPopover_EventPopover__WEBPACK_IMPORTED_MODULE_4__["renderEditPopper"])({
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL1dpZGdldC9FdmVudFBvcG92ZXIvRXZlbnRQb3BvdmVyLmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlIHN5bmMgXlxcLlxcLy4qJCIsIndlYnBhY2s6Ly8vLi9zcmMvQ2FsZW5kYXJFdmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29uZmlnLmpzIiwid2VicGFjazovLy8uL3NyYy9Nb2RhbC9FdmVudENyZWF0ZU1vZGFsLmpzIiwid2VicGFjazovLy8uL3NyYy9Nb2RhbC9FdmVudEVkaXRNb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvTW9kYWwvRXZlbnRNb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVXRpbHMvRm9ybUhhbmRsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1V0aWxzL0Zvcm1VdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvV2lkZ2V0L0NvbG9yUGlja2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9XaWRnZXQvRGF0ZVRpbWVQaWNrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1dpZGdldC9FdmVudFBvcG92ZXIvRXZlbnRQb3BvdmVyLmNzcz83OTAxIiwid2VicGFjazovLy8uL3NyYy9XaWRnZXQvRXZlbnRQb3BvdmVyL0V2ZW50UG9wb3Zlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvV2l6RXZlbnREYXRhTG9hZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9XaXpJbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmNzcz9kOGMzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBUSxvQkFBb0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBaUIsNEJBQTRCO0FBQzdDO0FBQ0E7QUFDQSwwQkFBa0IsMkJBQTJCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjs7QUFFQTtBQUNBLHNEQUE4QztBQUM5QztBQUNBO0FBQ0Esb0NBQTRCO0FBQzVCLHFDQUE2QjtBQUM3Qix5Q0FBaUM7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBNkI7QUFDN0IscUNBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSw2QkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQWtCLDhCQUE4QjtBQUNoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJ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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2RTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1UUE7QUFDQTtBQUNtRDtBQUNuRDs7QUFFQTs7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QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDOzs7Ozs7Ozs7Ozs7OztBQzFlQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLDhDQUE4QztBQUN2RCxTQUFTLDhDQUE4QztBQUN2RCxTQUFTLDZDQUE2QztBQUN0RCxTQUFTLDhDQUE4QztBQUN2RCxTQUFTLDZDQUE2QztBQUN0RCxTQUFTLDhDQUE4QztBQUN2RCxTQUFTLDZDQUE2QztBQUN0RCxTQUFTLDZDQUE2QztBQUN0RCxTQUFTLDZDQUE2QztBQUN0RCxTQUFTLDhDQUE4QztBQUN2RCxTQUFTLDZDQUE2QztBQUN0RCxTQUFTO0FBQ1Q7O0FBRUEsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pCQTtBQUNBO0FBQ0E7QUFDK0I7QUFDSDtBQUM1Qjs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5SkFBeUo7QUFDeko7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25IQTtBQUNBO0FBQ0E7QUFDK0I7QUFDSDtBQUM1Qjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnSUFBZ0k7QUFDaEk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZEO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1RkFBdUY7QUFDdkY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0EsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0EsQzs7Ozs7Ozs7Ozs7O0FDbkJBOztBQUVBOztBQUVBO0FBQ0E7Ozs7QUFJQSxlQUFlOztBQUVmO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0EsRUFBRTs7QUFFRixnQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQzhCO0FBQzlCO0FBQzRCO0FBQzVCOztBQUVROztBQUVSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxRUFBcUU7QUFDckU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFD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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9VUTs7QUFFUjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ1RBOztBQUVBOztBQUVBO0FBQ0E7Ozs7QUFJQSxlQUFlOztBQUVmO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0EsRUFBRTs7QUFFRixnQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUMyQjtBQUMzQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQix5QkFBeUI7QUFDMUM7QUFDQTs7QUFFQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxR0FBc0QsMEJBQTBCO0FBQ2hGO0FBQ0EsZ0NBQWdDLDBCQUEwQjtBQUMxRDtBQUNBLEdBQUc7O0FBRUgsd0RBQXdELEVBQUU7QUFDMUQsdURBQXVELEVBQUU7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7O0FBRUEsRUFBRTtBQUNGLENBQUMsQyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG4gXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gd2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHRcdGlmIChwYXJlbnRIb3RVcGRhdGVDYWxsYmFjaykgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0fSA7XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XG4gXHRcdDtcbiBcdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QocmVxdWVzdFRpbWVvdXQpIHtcbiBcdFx0cmVxdWVzdFRpbWVvdXQgPSByZXF1ZXN0VGltZW91dCB8fCAxMDAwMDtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QobmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0XCIpKTtcbiBcdFx0XHR9XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIjtcbiBcdFx0XHRcdHJlcXVlc3Qub3BlbihcIkdFVFwiLCByZXF1ZXN0UGF0aCwgdHJ1ZSk7XG4gXHRcdFx0XHRyZXF1ZXN0LnRpbWVvdXQgPSByZXF1ZXN0VGltZW91dDtcbiBcdFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHJldHVybjtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xuIFx0XHRcdFx0XHQvLyB0aW1lb3V0XG4gXHRcdFx0XHRcdHJlamVjdChcbiBcdFx0XHRcdFx0XHRuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpXG4gXHRcdFx0XHRcdCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcbiBcdFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuIFx0XHRcdFx0XHRyZXNvbHZlKCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xuIFx0XHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXG4gXHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdC8vIHN1Y2Nlc3NcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcbiBcdFx0XHRcdFx0XHRyZWplY3QoZSk7XG4gXHRcdFx0XHRcdFx0cmV0dXJuO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdHJlc29sdmUodXBkYXRlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCIwM2VmOGRjMzg0YjhlZjM0MGJlZFwiOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90UmVxdWVzdFRpbWVvdXQgPSAxMDAwMDtcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xuIFx0dmFyIGhvdEN1cnJlbnRDaGlsZE1vZHVsZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50c1RlbXAgPSBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmICghbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG4gXHRcdFx0XHRcdFx0cmVxdWVzdCArXG4gXHRcdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0KTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9LFxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fTtcbiBcdFx0Zm9yICh2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcImVcIiAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJ0XCJcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKSBob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0dGhyb3cgZXJyO1xuIFx0XHRcdH0pO1xuXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcbiBcdFx0XHRcdFx0aWYgKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH07XG4gXHRcdGZuLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRcdGlmIChtb2RlICYgMSkgdmFsdWUgPSBmbih2YWx1ZSk7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udCh2YWx1ZSwgbW9kZSAmIH4xKTtcbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBkZXAgPT09IFwidW5kZWZpbmVkXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdFx0ZWxzZSBob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGRlcCA9PT0gXCJ1bmRlZmluZWRcIikgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGlmICghbCkgcmV0dXJuIGhvdFN0YXR1cztcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cbiBcdFx0fTtcbiBcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xuIFx0XHRyZXR1cm4gaG90O1xuIFx0fVxuXG4gXHR2YXIgaG90U3RhdHVzSGFuZGxlcnMgPSBbXTtcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcblxuIFx0ZnVuY3Rpb24gaG90U2V0U3RhdHVzKG5ld1N0YXR1cykge1xuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XG4gXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaG90U3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xuIFx0fVxuXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XG4gXHR2YXIgaG90Q2h1bmtzTG9hZGluZyA9IDA7XG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RBdmFpbGFibGVGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdERlZmVycmVkO1xuXG4gXHQvLyBUaGUgdXBkYXRlIGluZm9cbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcbiBcdFx0dmFyIGlzTnVtYmVyID0gK2lkICsgXCJcIiA9PT0gaWQ7XG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSkge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcImlkbGVcIikge1xuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuIFx0XHR9XG4gXHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XG4gXHRcdHJldHVybiBob3REb3dubG9hZE1hbmlmZXN0KGhvdFJlcXVlc3RUaW1lb3V0KS50aGVuKGZ1bmN0aW9uKHVwZGF0ZSkge1xuIFx0XHRcdGlmICghdXBkYXRlKSB7XG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRcdFx0cmV0dXJuIG51bGw7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90QXZhaWxhYmxlRmlsZXNNYXAgPSB1cGRhdGUuYztcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdXBkYXRlLmg7XG5cbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRob3REZWZlcnJlZCA9IHtcbiBcdFx0XHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcbiBcdFx0XHRcdFx0cmVqZWN0OiByZWplY3RcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0aG90VXBkYXRlID0ge307XG4gXHRcdFx0Zm9yKHZhciBjaHVua0lkIGluIGluc3RhbGxlZENodW5rcylcbiBcdFx0XHR7XG4gXHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWxvbmUtYmxvY2tzXG4gXHRcdFx0XHQvKmdsb2JhbHMgY2h1bmtJZCAqL1xuIFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIgJiZcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiZcbiBcdFx0XHRcdGhvdFdhaXRpbmdGaWxlcyA9PT0gMFxuIFx0XHRcdCkge1xuIFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gcHJvbWlzZTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSB8fCAhaG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0pXG4gXHRcdFx0cmV0dXJuO1xuIFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IGZhbHNlO1xuIFx0XHRmb3IgKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYgKC0taG90V2FpdGluZ0ZpbGVzID09PSAwICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDApIHtcbiBcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzKys7XG4gXHRcdFx0aG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RVcGRhdGVEb3dubG9hZGVkKCkge1xuIFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcbiBcdFx0dmFyIGRlZmVycmVkID0gaG90RGVmZXJyZWQ7XG4gXHRcdGhvdERlZmVycmVkID0gbnVsbDtcbiBcdFx0aWYgKCFkZWZlcnJlZCkgcmV0dXJuO1xuIFx0XHRpZiAoaG90QXBwbHlPblVwZGF0ZSkge1xuIFx0XHRcdC8vIFdyYXAgZGVmZXJyZWQgb2JqZWN0IGluIFByb21pc2UgdG8gbWFyayBpdCBhcyBhIHdlbGwtaGFuZGxlZCBQcm9taXNlIHRvXG4gXHRcdFx0Ly8gYXZvaWQgdHJpZ2dlcmluZyB1bmNhdWdodCBleGNlcHRpb24gd2FybmluZyBpbiBDaHJvbWUuXG4gXHRcdFx0Ly8gU2VlIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ2NTY2NlxuIFx0XHRcdFByb21pc2UucmVzb2x2ZSgpXG4gXHRcdFx0XHQudGhlbihmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIGhvdEFwcGx5KGhvdEFwcGx5T25VcGRhdGUpO1xuIFx0XHRcdFx0fSlcbiBcdFx0XHRcdC50aGVuKFxuIFx0XHRcdFx0XHRmdW5jdGlvbihyZXN1bHQpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XG4gXHRcdFx0XHRcdH0sXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnIpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHQpO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2godG9Nb2R1bGVJZChpZCkpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucykge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcInJlYWR5XCIpXG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xuIFx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuIFx0XHR2YXIgY2I7XG4gXHRcdHZhciBpO1xuIFx0XHR2YXIgajtcbiBcdFx0dmFyIG1vZHVsZTtcbiBcdFx0dmFyIG1vZHVsZUlkO1xuXG4gXHRcdGZ1bmN0aW9uIGdldEFmZmVjdGVkU3R1ZmYodXBkYXRlTW9kdWxlSWQpIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW3VwZGF0ZU1vZHVsZUlkXTtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuIFx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpLm1hcChmdW5jdGlvbihpZCkge1xuIFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0Y2hhaW46IFtpZF0sXG4gXHRcdFx0XHRcdGlkOiBpZFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWVJdGVtLmlkO1xuIFx0XHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1kZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9tYWluKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRpZiAoIXBhcmVudCkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHRcdH07XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcbiBcdFx0XHRcdFx0cXVldWUucHVzaCh7XG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRpZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuXG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcbiBcdFx0XHRcdG1vZHVsZUlkOiB1cGRhdGVNb2R1bGVJZCxcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxuIFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXG4gXHRcdFx0fTtcbiBcdFx0fVxuXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcbiBcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdHZhciBpdGVtID0gYltpXTtcbiBcdFx0XHRcdGlmIChhLmluZGV4T2YoaXRlbSkgPT09IC0xKSBhLnB1c2goaXRlbSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxuIFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xuXG4gXHRcdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUoKSB7XG4gXHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCJcbiBcdFx0XHQpO1xuIFx0XHR9O1xuXG4gXHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XG4gXHRcdFx0XHQvKiogQHR5cGUge1RPRE99ICovXG4gXHRcdFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRcdFx0aWYgKGhvdFVwZGF0ZVtpZF0pIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGVJZCk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJkaXNwb3NlZFwiLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBpZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0LyoqIEB0eXBlIHtFcnJvcnxmYWxzZX0gKi9cbiBcdFx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XG4gXHRcdFx0XHRpZiAocmVzdWx0LmNoYWluKSB7XG4gXHRcdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcbiBcdFx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0XCIgaW4gXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wYXJlbnRJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uVW5hY2NlcHRlZCkgb3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25BY2NlcHRlZCkgb3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGlzcG9zZWQpIG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGRlZmF1bHQ6XG4gXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChhYm9ydEVycm9yKSB7XG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xuIFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoYWJvcnRFcnJvcik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9BcHBseSkge1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0Lm91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdFx0XHRcdGZvciAobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0XHRcdFx0aWYgKFxuIFx0XHRcdFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHRcdFx0XHQpXG4gXHRcdFx0XHRcdFx0KSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG4gXHRcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvRGlzcG9zZSkge1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSAmJlxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHQpXG4gXHRcdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XG4gXHRcdFx0XHRcdG1vZHVsZTogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdGVycm9ySGFuZGxlcjogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHRcdH0pO1xuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG4gXHRcdE9iamVjdC5rZXlzKGhvdEF2YWlsYWJsZUZpbGVzTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gPT09IGZhbHNlKSB7XG4gXHRcdFx0XHRob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHR9KTtcblxuIFx0XHR2YXIgaWR4O1xuIFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcbiBcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdGlmICghbW9kdWxlKSBjb250aW51ZTtcblxuIFx0XHRcdHZhciBkYXRhID0ge307XG5cbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xuIFx0XHRcdFx0Y2IoZGF0YSk7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XG5cbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XG5cbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG4gXHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuIFx0XHRcdFx0aWYgKCFjaGlsZCkgY29udGludWU7XG4gXHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cbiBcdFx0dmFyIGRlcGVuZGVuY3k7XG4gXHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcbiBcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcbiBcdFx0XHRcdFx0XHRpZiAoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdCBpbiBcImFwcGx5XCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiYXBwbHlcIik7XG5cbiBcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxuIFx0XHRmb3IgKG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFwcGxpZWRVcGRhdGUsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xuIFx0XHR2YXIgZXJyb3IgPSBudWxsO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XG4gXHRcdFx0XHRcdFx0Y2IgPSBtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcbiBcdFx0XHRcdFx0XHRpZiAoY2IpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFja3MuaW5kZXhPZihjYikgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGNiID0gY2FsbGJhY2tzW2ldO1xuIFx0XHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0XHRjYihtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XG4gXHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXSxcbiBcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcbiBcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyMjtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxuIFx0XHRpZiAoZXJyb3IpIHtcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gXHRcdH1cblxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuIFx0XHRcdHJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcImFwcFwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGhvdDogaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSxcbiBcdFx0XHRwYXJlbnRzOiAoaG90Q3VycmVudFBhcmVudHNUZW1wID0gaG90Q3VycmVudFBhcmVudHMsIGhvdEN1cnJlbnRQYXJlbnRzID0gW10sIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCksXG4gXHRcdFx0Y2hpbGRyZW46IFtdXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbXCIuL3NyYy9pbmRleC5qc1wiLFwidmVuZG9yXCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKiBQb3BvdmVyIOe7hOS7tuagt+W8j1xcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcblxcclxcbi8qIFBvcG92ZXIg5a655Zmo5Y+K5a6a5L2NXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuXFxyXFxuLnRjLXBvcG92ZXIge1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGJhY2tncm91bmQ6ICNGRkY7XFxyXFxuICAgIGNvbG9yOiBibGFjaztcXHJcXG4gICAgd2lkdGg6IGF1dG87XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4yKTtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNnB4O1xcclxcbiAgICBib3gtc2hhZG93OiAwIDJweCA0cHggcmdiYSgwLCAwLCAwLCAuMik7XFxyXFxuICAgIHRleHQtYWxpZ246IGxlZnQ7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyIC5hcnJvdyB7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICAgIHdpZHRoOiAyMHB4O1xcclxcbiAgICBoZWlnaHQ6IDEwcHg7XFxyXFxuICAgIG1hcmdpbjogMCA2cHg7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyIC5hcnJvdzo6YmVmb3JlLCAudGMtcG9wb3ZlciAuYXJyb3c6OmFmdGVyIHtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgY29udGVudDogXFxcIlxcXCI7XFxyXFxuICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XFxyXFxuICAgIGJvcmRlci1zdHlsZTogc29saWQ7XFxyXFxufVxcclxcblxcclxcbi8qIHRvcCDmlL7nva7moLflvI9cXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInRvcFxcXCJdIHtcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJ0b3BcXFwiXSAuYXJyb3cge1xcclxcbiAgICBib3R0b206IGNhbGMoKDEwcHggKyAxcHgpICogLTEpO1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInRvcFxcXCJdIC5hcnJvdzo6YmVmb3JlLFxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwidG9wXFxcIl0gLmFycm93OjphZnRlciB7XFxyXFxuICAgIGJvcmRlci13aWR0aDogMTBweCAxMHB4IDA7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwidG9wXFxcIl0gLmFycm93OjpiZWZvcmUge1xcclxcbiAgICBib3R0b206IDA7XFxyXFxuICAgIGJvcmRlci10b3AtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSk7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwidG9wXFxcIl0gLmFycm93OjphZnRlciB7XFxyXFxuICAgIGJvdHRvbTogMXB4O1xcclxcbiAgICBib3JkZXItdG9wLWNvbG9yOiAjZmZmO1xcclxcbn1cXHJcXG5cXHJcXG4vKiByaWdodCDmlL7nva7moLflvI9cXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInJpZ2h0XFxcIl0ge1xcclxcbiAgICBtYXJnaW4tbGVmdDogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJyaWdodFxcXCJdIC5hcnJvdyB7XFxyXFxuICAgIGxlZnQ6IGNhbGMoKDEwcHggKyAxcHgpICogLTEpO1xcclxcbiAgICB3aWR0aDogMTBweDtcXHJcXG4gICAgaGVpZ2h0OiAyMHB4O1xcclxcbiAgICBtYXJnaW46IDZweCAwO1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInJpZ2h0XFxcIl0gLmFycm93OjpiZWZvcmUsXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJyaWdodFxcXCJdIC5hcnJvdzo6YWZ0ZXIge1xcclxcbiAgICBib3JkZXItd2lkdGg6IDEwcHggMTBweCAxMHB4IDA7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwicmlnaHRcXFwiXSAuYXJyb3c6OmJlZm9yZSB7XFxyXFxuICAgIGxlZnQ6IDA7XFxyXFxuICAgIGJvcmRlci1yaWdodC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KTtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJyaWdodFxcXCJdIC5hcnJvdzo6YWZ0ZXIge1xcclxcbiAgICBsZWZ0OiAxcHg7XFxyXFxuICAgIGJvcmRlci1yaWdodC1jb2xvcjogI2ZmZjtcXHJcXG59XFxyXFxuXFxyXFxuLyogYm90dG9tIOaUvue9ruagt+W8j1xcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwiYm90dG9tXFxcIl0ge1xcclxcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImJvdHRvbVxcXCJdIC5hcnJvdyB7XFxyXFxuICAgIHRvcDogY2FsYygoMTBweCArIDFweCkgKiAtMSk7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwiYm90dG9tXFxcIl0gLmFycm93OjpiZWZvcmUsXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJib3R0b21cXFwiXSAuYXJyb3c6OmFmdGVyIHtcXHJcXG4gICAgYm9yZGVyLXdpZHRoOiAwIDEwcHggMTBweCAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImJvdHRvbVxcXCJdIC5hcnJvdzo6YmVmb3JlIHtcXHJcXG4gICAgdG9wOiAwO1xcclxcbiAgICBib3JkZXItYm90dG9tLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMjUpO1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImJvdHRvbVxcXCJdIC5hcnJvdzo6YWZ0ZXIge1xcclxcbiAgICB0b3A6IDFweDtcXHJcXG4gICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogI2Y3ZjdmNzsgLyrov5nph4zkuLrkuobkuJPpl6jpgILphY3mnInmoIfpopjog4zmma/nmoRQb3BvdmVyKi9cXHJcXG59XFxyXFxuXFxyXFxuLyogbGVmdCDmlL7nva7moLflvI9cXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImxlZnRcXFwiXSB7XFxyXFxuICAgIG1hcmdpbi1yaWdodDogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJsZWZ0XFxcIl0gLmFycm93IHtcXHJcXG4gICAgcmlnaHQ6IGNhbGMoKDEwcHggKyAxcHgpICogLTEpO1xcclxcbiAgICB3aWR0aDogMTBweDtcXHJcXG4gICAgaGVpZ2h0OiAyMHB4O1xcclxcbiAgICBtYXJnaW46IDZweCAwO1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImxlZnRcXFwiXSAuYXJyb3c6OmJlZm9yZSxcXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImxlZnRcXFwiXSAuYXJyb3c6OmFmdGVyIHtcXHJcXG4gICAgYm9yZGVyLXdpZHRoOiAxMHB4IDAgMTBweCAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImxlZnRcXFwiXSAuYXJyb3c6OmJlZm9yZSB7XFxyXFxuICAgIHJpZ2h0OiAwO1xcclxcbiAgICBib3JkZXItbGVmdC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KTtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJsZWZ0XFxcIl0gLmFycm93OjphZnRlciB7XFxyXFxuICAgIHJpZ2h0OiAxcHg7XFxyXFxuICAgIGJvcmRlci1sZWZ0LWNvbG9yOiAjZmZmO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBDb250ZW50IOagh+mimOWSjOWGheWuuVxcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcblxcclxcbi50Yy1wb3BvdmVyLWhlYWRlciB7XFxyXFxuICAgIHBhZGRpbmc6IC41cmVtIC43NXJlbTtcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogMDtcXHJcXG4gICAgZm9udC1zaXplOiAxcmVtO1xcclxcbiAgICBjb2xvcjogaW5oZXJpdDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y3ZjdmNztcXHJcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlYmViZWI7XFxyXFxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDZweDtcXHJcXG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDZweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXItYm9keSB7XFxyXFxuICAgIHBhZGRpbmc6IDEwcHggMTVweDtcXHJcXG59XFxyXFxuXFxyXFxuI3RjLWVkaXRwb3BwZXItZXZlbnR0aXRsZSB7XFxyXFxuICAgIGJvcmRlci13aWR0aDogMXB4O1xcclxcbiAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXHJcXG4gICAgcGFkZGluZzogMDtcXHJcXG4gICAgbWFyZ2luOiAwO1xcclxcbiAgICBmb250LXNpemU6IDEuMmVtO1xcclxcbiAgICBmb250LXdlaWdodDogYm9sZDtcXHJcXG59XFxyXFxuXFxyXFxuI3RjLWVkaXRwb3BwZXItZXZlbnR0aXRsZTpmb2N1cyxcXHJcXG4jdGMtZWRpdHBvcHBlci1ldmVudHRpdGxlOmhvdmVyIHtcXHJcXG4gICAgb3V0bGluZTogbm9uZTtcXHJcXG4gICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogYmxhY2s7IFxcclxcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcImh0bWwsIGJvZHkge1xcclxcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcclxcbiAgICBmb250LXNpemU6IDE0cHg7XFxyXFxufVxcclxcblxcclxcbjpmb2N1cyB7XFxyXFxuICAgIG91dGxpbmU6bm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuI2NhbGVuZGFyLWNvbnRhaW5lciB7XFxyXFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gICAgdG9wOiAwO1xcclxcbiAgICBsZWZ0OiA4cHg7XFxyXFxuICAgIHJpZ2h0OiA4cHg7XFxyXFxuICAgIGJvdHRvbTogOHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZmMtaGVhZGVyLXRvb2xiYXIge1xcclxcbiAgICAvKlxcclxcbiAgICB0aGUgY2FsZW5kYXIgd2lsbCBiZSBidXR0aW5nIHVwIGFnYWluc3QgdGhlIGVkZ2VzLFxcclxcbiAgICBidXQgbGV0J3Mgc2Nvb3QgaW4gdGhlIGhlYWRlcidzIGJ1dHRvbnNcXHJcXG4gICAgKi9cXHJcXG4gICAgcGFkZGluZy10b3A6IDE0cHg7XFxyXFxuICAgIHBhZGRpbmctbGVmdDogMDtcXHJcXG4gICAgcGFkZGluZy1yaWdodDogMDtcXHJcXG59XFxyXFxuXFxyXFxuXFxyXFxuLyogRm9udHMuY3NzIC0tIOi3qOW5s+WPsOS4reaWh+Wtl+S9k+ino+WGs+aWueahiFxcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG4uZm9udC1oZWkge2ZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBcXFwiTm90byBTYW5zXFxcIiwgXFxcIkhlbHZldGljYSBOZXVlXFxcIiwgSGVsdmV0aWNhLCBcXFwiTmltYnVzIFNhbnMgTFxcXCIsIEFyaWFsLCBcXFwiTGliZXJhdGlvbiBTYW5zXFxcIiwgXFxcIlBpbmdGYW5nIFNDXFxcIiwgXFxcIkhpcmFnaW5vIFNhbnMgR0JcXFwiLCBcXFwiTm90byBTYW5zIENKSyBTQ1xcXCIsIFxcXCJTb3VyY2UgSGFuIFNhbnMgU0NcXFwiLCBcXFwiU291cmNlIEhhbiBTYW5zIENOXFxcIiwgXFxcIk1pY3Jvc29mdCBZYUhlaVxcXCIsIFxcXCJXZW5xdWFueWkgTWljcm8gSGVpXFxcIiwgXFxcIldlblF1YW5ZaSBaZW4gSGVpXFxcIiwgXFxcIlNUIEhlaXRpXFxcIiwgU2ltSGVpLCBcXFwiV2VuUXVhbllpIFplbiBIZWkgU2hhcnBcXFwiLCBzYW5zLXNlcmlmO31cXHJcXG4uZm9udC1rYWkge2ZvbnQtZmFtaWx5OiBCYXNrZXJ2aWxsZSwgR2VvcmdpYSwgXFxcIkxpYmVyYXRpb24gU2VyaWZcXFwiLCBcXFwiS2FpdGkgU0NcXFwiLCBTVEthaXRpLCBcXFwiQVIgUEwgVUthaSBDTlxcXCIsIFxcXCJBUiBQTCBVS2FpIEhLXFxcIiwgXFxcIkFSIFBMIFVLYWkgVFdcXFwiLCBcXFwiQVIgUEwgVUthaSBUVyBNQkVcXFwiLCBcXFwiQVIgUEwgS2FpdGlNIEdCXFxcIiwgS2FpVGksIEthaVRpX0dCMjMxMiwgREZLYWktU0IsIFxcXCJUVy1LYWlcXFwiLCBzZXJpZjt9XFxyXFxuLmZvbnQtc29uZyB7Zm9udC1mYW1pbHk6IEdlb3JnaWEsIFxcXCJOaW1idXMgUm9tYW4gTm85IExcXFwiLCBcXFwiU29uZ3RpIFNDXFxcIiwgXFxcIk5vdG8gU2VyaWYgQ0pLIFNDXFxcIiwgXFxcIlNvdXJjZSBIYW4gU2VyaWYgU0NcXFwiLCBcXFwiU291cmNlIEhhbiBTZXJpZiBDTlxcXCIsIFNUU29uZywgXFxcIkFSIFBMIE5ldyBTdW5nXFxcIiwgXFxcIkFSIFBMIFN1bmd0aUwgR0JcXFwiLCBOU2ltU3VuLCBTaW1TdW4sIFxcXCJUVy1TdW5nXFxcIiwgXFxcIldlblF1YW5ZaSBCaXRtYXAgU29uZ1xcXCIsIFxcXCJBUiBQTCBVTWluZyBDTlxcXCIsIFxcXCJBUiBQTCBVTWluZyBIS1xcXCIsIFxcXCJBUiBQTCBVTWluZyBUV1xcXCIsIFxcXCJBUiBQTCBVTWluZyBUVyBNQkVcXFwiLCBQTWluZ0xpVSwgTWluZ0xpVSwgc2VyaWY7fVxcclxcbi5mb250LWZhbmctc29uZyB7Zm9udC1mYW1pbHk6IEJhc2tlcnZpbGxlLCBcXFwiVGltZXMgTmV3IFJvbWFuXFxcIiwgXFxcIkxpYmVyYXRpb24gU2VyaWZcXFwiLCBTVEZhbmdzb25nLCBGYW5nU29uZywgRmFuZ1NvbmdfR0IyMzEyLCBcXFwiQ1dURVgtRlxcXCIsIHNlcmlmO31cXHJcXG5cXHJcXG4vKiDkuLTml7bmlL7nva5cXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG5cXHJcXG4udWktYnV0dG9uLWljb24tb25seS5zcGxpdGJ1dHRvbi1zZWxlY3Qge1xcclxcbiAgICB3aWR0aDogMWVtO1xcclxcbn1cXHJcXG5cXHJcXG5hW2RhdGEtZ290b10ge1xcclxcbiAgICBjb2xvcjogIzAwMDtcXHJcXG59XFxyXFxuXFxyXFxuLyogQm9vdHN0cmFwIDQg57uE5Lu25qC35byPXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuXFxyXFxuLyog6KGo5Y2VXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuLmNvbC1mb3JtLWxhYmVsIHtcXHJcXG4gICAgcGFkZGluZy10b3A6IGNhbGMoLjM3NXJlbSArIDFweCk7XFxyXFxuICAgIHBhZGRpbmctYm90dG9tOiBjYWxjKC4zNzVyZW0gKyAxcHgpO1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xcclxcbiAgICBmb250LXNpemU6IGluaGVyaXQ7XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiAxLjU7XFxyXFxufVxcclxcblxcclxcbi8qIOS6i+S7tua4suafk1xcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcbi50Yy1jb21wbGV0ZSB7XFxyXFxuICAgIG9wYWNpdHk6IDAuMztcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuLnRjLWNvbXBsZXRlID4gLmZjLWNvbnRlbnQge1xcclxcbiAgICB0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaCAhaW1wb3J0YW50O1xcclxcbn1cXHJcXG5cXHJcXG4udGMtY29tcGxldGU6aG92ZXIge1xcclxcbiAgICBvcGFjaXR5OiAxO1xcclxcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJ2YXIgbWFwID0ge1xuXHRcIi4vYWZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FmLmpzXCIsXG5cdFwiLi9hZi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYWYuanNcIixcblx0XCIuL2FyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci5qc1wiLFxuXHRcIi4vYXItZHpcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWR6LmpzXCIsXG5cdFwiLi9hci1kei5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItZHouanNcIixcblx0XCIuL2FyLWt3XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1rdy5qc1wiLFxuXHRcIi4vYXIta3cuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWt3LmpzXCIsXG5cdFwiLi9hci1seVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItbHkuanNcIixcblx0XCIuL2FyLWx5LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1seS5qc1wiLFxuXHRcIi4vYXItbWFcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLW1hLmpzXCIsXG5cdFwiLi9hci1tYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItbWEuanNcIixcblx0XCIuL2FyLXNhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1zYS5qc1wiLFxuXHRcIi4vYXItc2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLXNhLmpzXCIsXG5cdFwiLi9hci10blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItdG4uanNcIixcblx0XCIuL2FyLXRuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci10bi5qc1wiLFxuXHRcIi4vYXIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLmpzXCIsXG5cdFwiLi9helwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXouanNcIixcblx0XCIuL2F6LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hei5qc1wiLFxuXHRcIi4vYmVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JlLmpzXCIsXG5cdFwiLi9iZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYmUuanNcIixcblx0XCIuL2JnXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iZy5qc1wiLFxuXHRcIi4vYmcuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JnLmpzXCIsXG5cdFwiLi9ibVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm0uanNcIixcblx0XCIuL2JtLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ibS5qc1wiLFxuXHRcIi4vYm5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JuLmpzXCIsXG5cdFwiLi9ibi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm4uanNcIixcblx0XCIuL2JvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iby5qc1wiLFxuXHRcIi4vYm8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JvLmpzXCIsXG5cdFwiLi9iclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYnIuanNcIixcblx0XCIuL2JyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ici5qc1wiLFxuXHRcIi4vYnNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JzLmpzXCIsXG5cdFwiLi9icy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYnMuanNcIixcblx0XCIuL2NhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jYS5qc1wiLFxuXHRcIi4vY2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2NhLmpzXCIsXG5cdFwiLi9jc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3MuanNcIixcblx0XCIuL2NzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jcy5qc1wiLFxuXHRcIi4vY3ZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2N2LmpzXCIsXG5cdFwiLi9jdi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3YuanNcIixcblx0XCIuL2N5XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jeS5qc1wiLFxuXHRcIi4vY3kuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2N5LmpzXCIsXG5cdFwiLi9kYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGEuanNcIixcblx0XCIuL2RhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kYS5qc1wiLFxuXHRcIi4vZGVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLmpzXCIsXG5cdFwiLi9kZS1hdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUtYXQuanNcIixcblx0XCIuL2RlLWF0LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS1hdC5qc1wiLFxuXHRcIi4vZGUtY2hcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLWNoLmpzXCIsXG5cdFwiLi9kZS1jaC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUtY2guanNcIixcblx0XCIuL2RlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS5qc1wiLFxuXHRcIi4vZHZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2R2LmpzXCIsXG5cdFwiLi9kdi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZHYuanNcIixcblx0XCIuL2VsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbC5qc1wiLFxuXHRcIi4vZWwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VsLmpzXCIsXG5cdFwiLi9lbi1hdVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tYXUuanNcIixcblx0XCIuL2VuLWF1LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1hdS5qc1wiLFxuXHRcIi4vZW4tY2FcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWNhLmpzXCIsXG5cdFwiLi9lbi1jYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tY2EuanNcIixcblx0XCIuL2VuLWdiXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1nYi5qc1wiLFxuXHRcIi4vZW4tZ2IuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWdiLmpzXCIsXG5cdFwiLi9lbi1pZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4taWUuanNcIixcblx0XCIuL2VuLWllLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1pZS5qc1wiLFxuXHRcIi4vZW4taWxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWlsLmpzXCIsXG5cdFwiLi9lbi1pbC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4taWwuanNcIixcblx0XCIuL2VuLW56XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1uei5qc1wiLFxuXHRcIi4vZW4tbnouanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLW56LmpzXCIsXG5cdFwiLi9lb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW8uanNcIixcblx0XCIuL2VvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lby5qc1wiLFxuXHRcIi4vZXNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLmpzXCIsXG5cdFwiLi9lcy1kb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMtZG8uanNcIixcblx0XCIuL2VzLWRvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy1kby5qc1wiLFxuXHRcIi4vZXMtdXNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLXVzLmpzXCIsXG5cdFwiLi9lcy11cy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMtdXMuanNcIixcblx0XCIuL2VzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy5qc1wiLFxuXHRcIi4vZXRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2V0LmpzXCIsXG5cdFwiLi9ldC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXQuanNcIixcblx0XCIuL2V1XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ldS5qc1wiLFxuXHRcIi4vZXUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2V1LmpzXCIsXG5cdFwiLi9mYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZmEuanNcIixcblx0XCIuL2ZhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mYS5qc1wiLFxuXHRcIi4vZmlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZpLmpzXCIsXG5cdFwiLi9maS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZmkuanNcIixcblx0XCIuL2ZvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mby5qc1wiLFxuXHRcIi4vZm8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZvLmpzXCIsXG5cdFwiLi9mclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnIuanNcIixcblx0XCIuL2ZyLWNhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci1jYS5qc1wiLFxuXHRcIi4vZnItY2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLWNhLmpzXCIsXG5cdFwiLi9mci1jaFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnItY2guanNcIixcblx0XCIuL2ZyLWNoLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci1jaC5qc1wiLFxuXHRcIi4vZnIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLmpzXCIsXG5cdFwiLi9meVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnkuanNcIixcblx0XCIuL2Z5LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9meS5qc1wiLFxuXHRcIi4vZ2RcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dkLmpzXCIsXG5cdFwiLi9nZC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ2QuanNcIixcblx0XCIuL2dsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nbC5qc1wiLFxuXHRcIi4vZ2wuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dsLmpzXCIsXG5cdFwiLi9nb20tbGF0blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ29tLWxhdG4uanNcIixcblx0XCIuL2dvbS1sYXRuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nb20tbGF0bi5qc1wiLFxuXHRcIi4vZ3VcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2d1LmpzXCIsXG5cdFwiLi9ndS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ3UuanNcIixcblx0XCIuL2hlXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oZS5qc1wiLFxuXHRcIi4vaGUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hlLmpzXCIsXG5cdFwiLi9oaVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaGkuanNcIixcblx0XCIuL2hpLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oaS5qc1wiLFxuXHRcIi4vaHJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hyLmpzXCIsXG5cdFwiLi9oci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHIuanNcIixcblx0XCIuL2h1XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9odS5qc1wiLFxuXHRcIi4vaHUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2h1LmpzXCIsXG5cdFwiLi9oeS1hbVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHktYW0uanNcIixcblx0XCIuL2h5LWFtLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oeS1hbS5qc1wiLFxuXHRcIi4vaWRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2lkLmpzXCIsXG5cdFwiLi9pZC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaWQuanNcIixcblx0XCIuL2lzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pcy5qc1wiLFxuXHRcIi4vaXMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2lzLmpzXCIsXG5cdFwiLi9pdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaXQuanNcIixcblx0XCIuL2l0LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pdC5qc1wiLFxuXHRcIi4vamFcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2phLmpzXCIsXG5cdFwiLi9qYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvamEuanNcIixcblx0XCIuL2p2XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9qdi5qc1wiLFxuXHRcIi4vanYuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2p2LmpzXCIsXG5cdFwiLi9rYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva2EuanNcIixcblx0XCIuL2thLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rYS5qc1wiLFxuXHRcIi4va2tcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2trLmpzXCIsXG5cdFwiLi9ray5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva2suanNcIixcblx0XCIuL2ttXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rbS5qc1wiLFxuXHRcIi4va20uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ttLmpzXCIsXG5cdFwiLi9rblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva24uanNcIixcblx0XCIuL2tuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rbi5qc1wiLFxuXHRcIi4va29cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2tvLmpzXCIsXG5cdFwiLi9rby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva28uanNcIixcblx0XCIuL2t5XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9reS5qc1wiLFxuXHRcIi4va3kuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2t5LmpzXCIsXG5cdFwiLi9sYlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbGIuanNcIixcblx0XCIuL2xiLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sYi5qc1wiLFxuXHRcIi4vbG9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2xvLmpzXCIsXG5cdFwiLi9sby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbG8uanNcIixcblx0XCIuL2x0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sdC5qc1wiLFxuXHRcIi4vbHQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2x0LmpzXCIsXG5cdFwiLi9sdlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbHYuanNcIixcblx0XCIuL2x2LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sdi5qc1wiLFxuXHRcIi4vbWVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21lLmpzXCIsXG5cdFwiLi9tZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWUuanNcIixcblx0XCIuL21pXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9taS5qc1wiLFxuXHRcIi4vbWkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21pLmpzXCIsXG5cdFwiLi9ta1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWsuanNcIixcblx0XCIuL21rLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tay5qc1wiLFxuXHRcIi4vbWxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21sLmpzXCIsXG5cdFwiLi9tbC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWwuanNcIixcblx0XCIuL21uXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tbi5qc1wiLFxuXHRcIi4vbW4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21uLmpzXCIsXG5cdFwiLi9tclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXIuanNcIixcblx0XCIuL21yLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tci5qc1wiLFxuXHRcIi4vbXNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21zLmpzXCIsXG5cdFwiLi9tcy1teVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXMtbXkuanNcIixcblx0XCIuL21zLW15LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tcy1teS5qc1wiLFxuXHRcIi4vbXMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21zLmpzXCIsXG5cdFwiLi9tdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXQuanNcIixcblx0XCIuL210LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tdC5qc1wiLFxuXHRcIi4vbXlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL215LmpzXCIsXG5cdFwiLi9teS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXkuanNcIixcblx0XCIuL25iXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9uYi5qc1wiLFxuXHRcIi4vbmIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25iLmpzXCIsXG5cdFwiLi9uZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmUuanNcIixcblx0XCIuL25lLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9uZS5qc1wiLFxuXHRcIi4vbmxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25sLmpzXCIsXG5cdFwiLi9ubC1iZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmwtYmUuanNcIixcblx0XCIuL25sLWJlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubC1iZS5qc1wiLFxuXHRcIi4vbmwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25sLmpzXCIsXG5cdFwiLi9ublwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbm4uanNcIixcblx0XCIuL25uLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubi5qc1wiLFxuXHRcIi4vcGEtaW5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3BhLWluLmpzXCIsXG5cdFwiLi9wYS1pbi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcGEtaW4uanNcIixcblx0XCIuL3BsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wbC5qc1wiLFxuXHRcIi4vcGwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3BsLmpzXCIsXG5cdFwiLi9wdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcHQuanNcIixcblx0XCIuL3B0LWJyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wdC1ici5qc1wiLFxuXHRcIi4vcHQtYnIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3B0LWJyLmpzXCIsXG5cdFwiLi9wdC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcHQuanNcIixcblx0XCIuL3JvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9yby5qc1wiLFxuXHRcIi4vcm8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3JvLmpzXCIsXG5cdFwiLi9ydVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcnUuanNcIixcblx0XCIuL3J1LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ydS5qc1wiLFxuXHRcIi4vc2RcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NkLmpzXCIsXG5cdFwiLi9zZC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2QuanNcIixcblx0XCIuL3NlXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zZS5qc1wiLFxuXHRcIi4vc2UuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NlLmpzXCIsXG5cdFwiLi9zaVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2kuanNcIixcblx0XCIuL3NpLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zaS5qc1wiLFxuXHRcIi4vc2tcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NrLmpzXCIsXG5cdFwiLi9zay5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2suanNcIixcblx0XCIuL3NsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zbC5qc1wiLFxuXHRcIi4vc2wuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NsLmpzXCIsXG5cdFwiLi9zcVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3EuanNcIixcblx0XCIuL3NxLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zcS5qc1wiLFxuXHRcIi4vc3JcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NyLmpzXCIsXG5cdFwiLi9zci1jeXJsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zci1jeXJsLmpzXCIsXG5cdFwiLi9zci1jeXJsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zci1jeXJsLmpzXCIsXG5cdFwiLi9zci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3IuanNcIixcblx0XCIuL3NzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zcy5qc1wiLFxuXHRcIi4vc3MuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NzLmpzXCIsXG5cdFwiLi9zdlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3YuanNcIixcblx0XCIuL3N2LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zdi5qc1wiLFxuXHRcIi4vc3dcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3N3LmpzXCIsXG5cdFwiLi9zdy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3cuanNcIixcblx0XCIuL3RhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90YS5qc1wiLFxuXHRcIi4vdGEuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RhLmpzXCIsXG5cdFwiLi90ZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGUuanNcIixcblx0XCIuL3RlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ZS5qc1wiLFxuXHRcIi4vdGV0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ZXQuanNcIixcblx0XCIuL3RldC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGV0LmpzXCIsXG5cdFwiLi90Z1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGcuanNcIixcblx0XCIuL3RnLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90Zy5qc1wiLFxuXHRcIi4vdGhcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RoLmpzXCIsXG5cdFwiLi90aC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGguanNcIixcblx0XCIuL3RsLXBoXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90bC1waC5qc1wiLFxuXHRcIi4vdGwtcGguanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RsLXBoLmpzXCIsXG5cdFwiLi90bGhcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RsaC5qc1wiLFxuXHRcIi4vdGxoLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90bGguanNcIixcblx0XCIuL3RyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ci5qc1wiLFxuXHRcIi4vdHIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RyLmpzXCIsXG5cdFwiLi90emxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3R6bC5qc1wiLFxuXHRcIi4vdHpsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90emwuanNcIixcblx0XCIuL3R6bVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHptLmpzXCIsXG5cdFwiLi90em0tbGF0blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHptLWxhdG4uanNcIixcblx0XCIuL3R6bS1sYXRuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90em0tbGF0bi5qc1wiLFxuXHRcIi4vdHptLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90em0uanNcIixcblx0XCIuL3VnLWNuXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91Zy1jbi5qc1wiLFxuXHRcIi4vdWctY24uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VnLWNuLmpzXCIsXG5cdFwiLi91a1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdWsuanNcIixcblx0XCIuL3VrLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ay5qc1wiLFxuXHRcIi4vdXJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VyLmpzXCIsXG5cdFwiLi91ci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXIuanNcIixcblx0XCIuL3V6XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ei5qc1wiLFxuXHRcIi4vdXotbGF0blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXotbGF0bi5qc1wiLFxuXHRcIi4vdXotbGF0bi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXotbGF0bi5qc1wiLFxuXHRcIi4vdXouanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3V6LmpzXCIsXG5cdFwiLi92aVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdmkuanNcIixcblx0XCIuL3ZpLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS92aS5qc1wiLFxuXHRcIi4veC1wc2V1ZG9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3gtcHNldWRvLmpzXCIsXG5cdFwiLi94LXBzZXVkby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUveC1wc2V1ZG8uanNcIixcblx0XCIuL3lvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS95by5qc1wiLFxuXHRcIi4veW8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3lvLmpzXCIsXG5cdFwiLi96aC1jblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtY24uanNcIixcblx0XCIuL3poLWNuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC1jbi5qc1wiLFxuXHRcIi4vemgtaGtcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLWhrLmpzXCIsXG5cdFwiLi96aC1oay5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtaGsuanNcIixcblx0XCIuL3poLXR3XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC10dy5qc1wiLFxuXHRcIi4vemgtdHcuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLXR3LmpzXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHZhciBpZCA9IG1hcFtyZXFdO1xuXHRpZighKGlkICsgMSkpIHsgLy8gY2hlY2sgZm9yIG51bWJlciBvciBzdHJpbmdcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIGlkO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZSBzeW5jIHJlY3Vyc2l2ZSBeXFxcXC5cXFxcLy4qJFwiOyIsImltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuaW1wb3J0ICdmdWxsY2FsZW5kYXInO1xyXG5pbXBvcnQgeyBXaXpEYXRhYmFzZSBhcyBnX2RiLCBXaXpDb21tb25VSSBhcyBnX2Ntbn0gZnJvbSAnLi9XaXpJbnRlcmZhY2UnO1xyXG5pbXBvcnQgQ29uZmlnIGZyb20gJy4vQ29uZmlnJztcclxuXHJcbmNvbnN0IGdfY2FsID0gJCgnI2NhbGVuZGFyJyk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYWxlbmRhckV2ZW50IHtcclxuXHQvKipcclxuICAgICAqIOWIm+W7uuS4gOS4qumAmueUqOaXpeeoiy5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gZGF0YSDljp/lp4vmlbDmja7nsbvlnovvvIzlj6/ku6XmmK8gV2l6RXZlbnQsIEZ1bGxDYWxlbmRhckV2ZW50IOS7peWPiiBHVUlELlxyXG4gICAgICovXHJcblx0Y29uc3RydWN0b3IoIGRhdGEgKSB7XHJcblx0XHRpZiAoIWdfZGIpIHRocm93IG5ldyBFcnJvcignSVdpekRhdGFiYXNlIGlzIG5vdCB2YWxpZC4nKTtcclxuXHRcdGNvbnN0IHR5cGUgPSB0aGlzLl9jaGVja0RhdGFUeXBlKGRhdGEpO1xyXG5cdFx0c3dpdGNoICggdHlwZSApIHtcclxuXHRcdFx0Y2FzZSBcIldpekV2ZW50XCI6XHJcblx0XHRcdGNhc2UgXCJGdWxsQ2FsZW5kYXJFdmVudFwiOlxyXG5cdFx0XHRcdHRoaXMuX2NyZWF0ZShkYXRhLCB0eXBlKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBcIkdVSURcIjpcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0Ly9UT0RPOiDojrflvpdXaXpFdmVudOaVsOaNru+8jOW5tuWIm+W7uuWvueixoVxyXG5cdFx0XHRcdFx0Y29uc3QgZG9jID0gZ19kYi5Eb2N1bWVudEZyb21HVUlEKGRhdGEpO1xyXG5cdFx0XHRcdFx0Y29uc3QgbmV3RXZlbnREYXRhID0ge1xyXG5cdFx0XHRcdFx0XHRcIkNBTEVOREFSX0VORFwiIDogZG9jLkdldFBhcmFtVmFsdWUoJ0NBTEVOREFSX0VORCcpLFxyXG5cdFx0XHRcdFx0XHRcIkNBTEVOREFSX0lORk9cIiA6IGRvYy5HZXRQYXJhbVZhbHVlKCdDQUxFTkRBUl9JTkZPJyksXHJcblx0XHRcdFx0XHRcdFwiQ0FMRU5EQVJfRVhUUkFJTkZPXCIgOiBkb2MuR2V0UGFyYW1WYWx1ZSgnQ0FMRU5EQVJfRVhUUkFJTkZPJyksXHJcblx0XHRcdFx0XHRcdFwiQ0FMRU5EQVJfU1RBUlRcIiA6IGRvYy5HZXRQYXJhbVZhbHVlKCdDQUxFTkRBUl9TVEFSVCcpLFxyXG5cdFx0XHRcdFx0XHRcImNyZWF0ZWRcIiA6IG1vbWVudChkb2MuRGF0ZUNyZWF0ZWQpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpLFxyXG5cdFx0XHRcdFx0XHRcImd1aWRcIiA6IGRvYy5HVUlELFxyXG5cdFx0XHRcdFx0XHRcInRpdGxlXCIgOiBkb2MuVGl0bGUsXHJcblx0XHRcdFx0XHRcdFwidXBkYXRlZFwiIDogbW9tZW50KGRvYy5EYXRlTW9kaWZpZWQpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR0aGlzLl9jcmVhdGUobmV3RXZlbnREYXRhLCAnV2l6RXZlbnQnKTtcclxuXHRcdFx0XHR9IGNhdGNoIChlKSB7IGNvbnNvbGUuZXJyb3IoZSk7IH1cclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRfY3JlYXRlKGRhdGEsIHR5cGUpIHtcclxuXHRcdGxldCBzdGFydCwgZW5kLCBpZCwgYmtDb2xvciwgYWxsRGF5LCBjb21wbGV0ZSwgZGF0ZUNvbXBsZXRlZCwgcnB0UnVsZTtcclxuXHRcdHN3aXRjaCAodHlwZSkge1xyXG5cdFx0XHRjYXNlIFwiR1VJRFwiOlxyXG5cdFx0XHRjYXNlIFwiV2l6RXZlbnRcIjpcclxuXHRcdFx0XHR0aGlzLl9JbmZvID0gdGhpcy5fcGFyc2VJbmZvKGRhdGEuQ0FMRU5EQVJfSU5GTyk7XHJcblx0XHRcdFx0dGhpcy5fRXh0cmFJbmZvID0gZGF0YS5DQUxFTkRBUl9FWFRSQUlORk8gPyB0aGlzLl9wYXJzZUluZm8oZGF0YS5DQUxFTkRBUl9FWFRSQUlORk8pIDogdGhpcy5fZ2V0RGVmYXVsdEV4dHJhSW5mbygpO1xyXG5cdFx0XHRcdC8vIOe7n+S4gOWPmOmHj1xyXG5cdFx0XHRcdGlkID0gZGF0YS5ndWlkO1xyXG5cdFx0XHRcdHN0YXJ0ID0gZGF0YS5DQUxFTkRBUl9TVEFSVDtcclxuXHRcdFx0XHRlbmQgPSBkYXRhLkNBTEVOREFSX0VORDtcclxuXHRcdFx0XHQvLyDliKTmlq3mmK/lkKbnlKjmiLfoh6rlrprkuYnog4zmma/oibLvvIzlkJHkuIvlhbzlrrnljp/niYjml6XljoZcclxuXHRcdFx0XHRia0NvbG9yID0gdGhpcy5fSW5mby5jaSA/ICggcGFyc2VJbnQodGhpcy5fSW5mby5jaSkgPT0gMCA/IHRoaXMuX0luZm8uYiA6IENvbmZpZy5jb2xvckl0ZW1zW3RoaXMuX0luZm8uY2ldLmNvbG9yVmFsdWUgKSA6IHRoaXMuX0luZm8uYjtcclxuXHRcdFx0XHRhbGxEYXkgPSBkYXRhLkNBTEVOREFSX0VORC5pbmRleE9mKFwiMjM6NTk6NTlcIikgIT0gLTEgPyB0cnVlIDogZmFsc2U7XHJcblx0XHRcdFx0Y29tcGxldGUgPSB0aGlzLl9FeHRyYUluZm8uQ29tcGxldGU7XHJcblx0XHRcdFx0ZGF0ZUNvbXBsZXRlZCA9IHRoaXMuX0V4dHJhSW5mby5EYXRlQ29tcGxldGVkO1xyXG5cdFx0XHRcdHJwdFJ1bGUgPSBkYXRhLkNBTEVOREFSX1JFQ1VSUkVOQ0U7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgXCJGdWxsQ2FsZW5kYXJFdmVudFwiOlxyXG5cdFx0XHRcdGlkID0gZGF0YS5pZDtcclxuXHRcdFx0XHRzdGFydCA9IGRhdGEuc3RhcnQ7XHJcblx0XHRcdFx0ZW5kID0gZGF0YS5lbmQ7XHJcblx0XHRcdFx0YmtDb2xvciA9IGRhdGEuYmFja2dyb3VuZENvbG9yO1xyXG5cdFx0XHRcdGFsbERheSA9IGRhdGEuYWxsRGF5ID8gZGF0YS5hbGxEYXkgOiAhJC5mdWxsQ2FsZW5kYXIubW9tZW50KGRhdGEuc3RhcnQpLmhhc1RpbWUoKTtcclxuXHRcdFx0XHRjb21wbGV0ZSA9IGRhdGEuY29tcGxldGUgfHwgMDtcclxuXHRcdFx0XHRkYXRlQ29tcGxldGVkID0gZGF0YS5kYXRlQ29tcGxldGVkIHx8ICcnO1xyXG5cdFx0XHRcdHJwdFJ1bGUgPSBkYXRhLnJwdFJ1bGU7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGlkZW50aWZ5IGRhdGEgdHlwZS4nKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHRcdC8vIOWfuuacrOS/oeaBr1xyXG5cdFx0dGhpcy5pZCA9IGlkO1xyXG5cdFx0dGhpcy50aXRsZSA9IGRhdGEudGl0bGU7XHJcblx0XHQvLyDml7bpl7Tkv6Hmga9cclxuXHRcdHRoaXMuYWxsRGF5ID0gYWxsRGF5O1xyXG5cdFx0Ly8g5rOo5oSP77yBc3RhcnQvZW5kIOWPr+iDveaYr21vbWVudOWvueixoeaIluiAhXN0cu+8jOaJgOS7peS4gOW+i+WFiOi9rOaNouaIkG1vbWVudOWGjeagvOW8j+WMlui+k+WHulxyXG5cdFx0dGhpcy5zdGFydCA9IGFsbERheSA/IG1vbWVudChzdGFydCkuZm9ybWF0KFwiWVlZWS1NTS1ERFwiKSA6IG1vbWVudChzdGFydCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHR0aGlzLmVuZCA9IGFsbERheSA/IG1vbWVudChlbmQpLmZvcm1hdChcIllZWVktTU0tRERcIikgOiBtb21lbnQoZW5kKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdHRoaXMuY3JlYXRlZCA9IGRhdGEuY3JlYXRlZCA/IGRhdGEuY3JlYXRlZCA6IG1vbWVudChzdGFydCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHR0aGlzLnVwZGF0ZWQgPSBkYXRhLnVwZGF0ZWQgPyBkYXRhLnVwZGF0ZWQgOiBtb21lbnQoKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdC8vIOiuvue9ruS/oeaBr1xyXG5cdFx0dGhpcy50ZXh0Q29sb3IgPSAnYmxhY2snO1xyXG5cdFx0dGhpcy5iYWNrZ3JvdW5kQ29sb3IgPSBia0NvbG9yO1xyXG5cdFx0dGhpcy5jb21wbGV0ZSA9IGNvbXBsZXRlO1xyXG5cdFx0dGhpcy5kYXRlQ29tcGxldGVkID0gZGF0ZUNvbXBsZXRlZDtcclxuXHRcdHRoaXMucnB0UnVsZSA9IHJwdFJ1bGU7XHJcblx0XHQvL1xyXG5cdFx0dGhpcy5fdXBkYXRlKCk7XHJcblx0fVxyXG5cclxuXHRfY2hlY2tEYXRhVHlwZShkYXRhKSB7XHJcblx0XHRjb25zdCBvYmpDbGFzcyA9IGRhdGEuY29uc3RydWN0b3I7XHJcbiAgICAgICAgY29uc3QgR1VJRF9SZWdFeHIgPSAvXlswLTlhLWZdezh9LVswLTlhLWZdezR9LVsxLTVdWzAtOWEtZl17M30tWzg5YWJdWzAtOWEtZl17M30tWzAtOWEtZl17MTJ9JC9pO1xyXG4gICAgICAgIGxldCB0eXBlO1xyXG4gICAgICAgIHN3aXRjaCAob2JqQ2xhc3MpIHtcclxuICAgICAgICAgICAgY2FzZSBTdHJpbmc6XHJcbiAgICAgICAgICAgICAgICBpZiAoIEdVSURfUmVnRXhyLnRlc3QoZGF0YSkgKSB0eXBlID0gXCJHVUlEXCI7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHRocm93IG5ldyBFcnJvcignVW5rbm93biBkYXRhLCBjYW5ub3QgY3JlYXRlIENhbGVuZGFyRXZlbnQgb2JqZWN0LicpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgT2JqZWN0OlxyXG5cdFx0XHRcdGlmICggZGF0YS5DQUxFTkRBUl9JTkZPICYmIGRhdGEudGl0bGUgKSB7IFxyXG5cdFx0XHRcdFx0dHlwZSA9ICdXaXpFdmVudCc7XHJcblx0XHRcdFx0fSBlbHNlIGlmICggZGF0YS5zdGFydCAmJiBkYXRhLnRpdGxlICkge1xyXG5cdFx0XHRcdFx0dHlwZSA9ICdGdWxsQ2FsZW5kYXJFdmVudCc7XHJcblx0XHRcdFx0fVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0eXBlO1xyXG5cdH07XHJcblxyXG5cdF9wYXJzZUluZm8oSW5mb1N0cmluZykge1xyXG5cdFx0Y29uc3QgSW5mb09iamVjdCA9IHt9O1xyXG5cdFx0Ly8g5ouG6KejQ0FMRU5EQVJfSU5GT1xyXG5cdFx0Y29uc3QgSW5mb0FycmF5ID0gSW5mb1N0cmluZy5zcGxpdCgnLycpO1xyXG5cdFx0SW5mb0FycmF5LmZvckVhY2goZnVuY3Rpb24oaXRlbSwgaW5kZXgsIGFycil7XHJcblx0XHRcdGNvbnN0IHBhaXIgPSBpdGVtLnNwbGl0KCc9Jyk7XHJcblx0XHRcdEluZm9PYmplY3RbcGFpclswXV0gPSBwYWlyWzFdO1xyXG5cdFx0fSk7XHJcblx0XHQvLyDlpITnkIbpopzoibLlgLxcclxuXHRcdGlmICggSW5mb09iamVjdC5iICkgSW5mb09iamVjdC5iID0gJyMnICsgSW5mb09iamVjdC5iO1xyXG5cclxuXHRcdHJldHVybiBJbmZvT2JqZWN0O1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG4gICAgICog5bCGIEluZm8g5a+56LGh5bqP5YiX5YyWLlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtJbmZvT2JqZWN0PV0g5o+Q5L6bIEluZm8g5a+56LGh77yM6buY6K6k5Li6YHRoaXMuX0luZm9gLlxyXG4gICAgICogQHJldHVybiB7U3RyaW5nfSDov5Tlm57nlKjkuo5JbmZv5a+56LGh5a2X56ym5LiyLlxyXG4gICAgICovXHJcblx0X3N0cmluZ2lmeUluZm8oIEluZm9PYmplY3QgPSB0aGlzLl9JbmZvICkge1xyXG5cdFx0aWYgKCAhSW5mb09iamVjdCApIHJldHVybiAnJztcclxuXHRcdGNvbnN0IEluZm9BcnJheSA9IFtdO1xyXG5cdFx0Y29uc3QgSW5mb09iamVjdEtleXNBcnJheSA9IE9iamVjdC5rZXlzKEluZm9PYmplY3QpO1xyXG5cdFx0SW5mb09iamVjdEtleXNBcnJheS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0sIGluZGV4LCBhcnIpe1xyXG5cdFx0XHRjb25zdCBzaW5nbGVJbmZvID0gYCR7aXRlbX09JHtJbmZvT2JqZWN0W2l0ZW1dfWA7XHJcblx0XHRcdEluZm9BcnJheS5wdXNoKHNpbmdsZUluZm8pO1xyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gSW5mb0FycmF5LmpvaW4oJy8nKS5yZXBsYWNlKCcjJywgJycpO1xyXG5cdH07XHJcblxyXG5cdF91cGRhdGUoKSB7XHJcblx0XHR0aGlzLl91cGRhdGVJbmZvKCk7XHJcblx0XHR0aGlzLl91cGRhdGVFeHRyYUluZm8oKTtcclxuXHR9O1xyXG5cclxuXHRfdXBkYXRlSW5mbygpIHtcclxuXHRcdGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cdFx0Y29uc3QgSW5mb09iamVjdCA9IHtcclxuXHRcdFx0J2InOiBudWxsLCAvL+iDjOaZr+iJsmhleOWAvFxyXG5cdFx0XHQncic6ICctMScsIC8v5o+Q6YaS5pa55byPXHJcblx0XHRcdCdjJzogJzAnLCAvL+e7k+adn+aPkOmGkuS/oeaBr1xyXG5cdFx0XHQnY2knOiAwIC8v6IOM5pmv6ImySUTvvIzpu5jorqQgMCDooajnpLrog4zmma/kuLrnlKjmiLfoh6rlrprkuYlcclxuXHRcdH07XHJcblx0XHQvLyDmm7TmlrDog4zmma/oibInYidcclxuXHRcdEluZm9PYmplY3RbJ2InXSA9IHRoaXMuYmFja2dyb3VuZENvbG9yLnJlcGxhY2UoJyMnLCAnJyk7XHJcblx0XHQvLyDmm7TmlrDpopzoibLmjIfmlbAnY2knXHJcblx0XHRDb25maWcuY29sb3JJdGVtcy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0sIGluZGV4LCBhcnIpe1xyXG5cdFx0XHRpZiAoIGl0ZW0uY29sb3JWYWx1ZSA9PSAgdGhhdC5iYWNrZ3JvdW5kQ29sb3IgKSB7XHJcblx0XHRcdFx0Ly8g5b2T5pel56iL6IOM5pmv6Imy5LiO6Imy6KGo5Yy56YWN5pe25YiZ55SoIGNvbG9yIGlkZXgg5p2l5YKo5a2Y77yI5YW85a655Y6f54mI5pel5Y6G5o+S5Lu277yJXHJcblx0XHRcdFx0SW5mb09iamVjdFsnY2knXSA9IGluZGV4O1xyXG5cdFx0XHR9O1xyXG5cdFx0fSk7XHJcblx0XHQvLyDlupTnlKjmm7TmlrBcclxuXHRcdHRoaXMuX0luZm8gPSBJbmZvT2JqZWN0O1xyXG5cdH07XHJcblxyXG5cdF9nZXREZWZhdWx0RXh0cmFJbmZvKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0J0NvbXBsZXRlJzogMCwgLy9cclxuXHRcdFx0J0RhdGVDb21wbGV0ZWQnOiAnJywgLy8gSVNPIOagh+WHhuaXpeacn+Wtl+espuS4siBZWVlZLU1NLUREIDAwOjAwOjAwXHJcblx0XHRcdCdQcmlvcic6IDBcclxuXHRcdH07XHJcblx0fTtcclxuXHJcblx0X3VwZGF0ZUV4dHJhSW5mbygpIHtcclxuXHRcdGNvbnN0IEV4dHJhSW5mb09iamVjdCA9IHtcclxuXHRcdFx0J0NvbXBsZXRlJzogMCxcclxuXHRcdFx0J0RhdGVDb21wbGV0ZWQnOiAnJyxcclxuXHRcdFx0J1ByaW9yJzogMFxyXG5cdFx0fTtcclxuXHRcdEV4dHJhSW5mb09iamVjdFsnQ29tcGxldGUnXSA9IHRoaXMuY29tcGxldGU7XHJcblx0XHRFeHRyYUluZm9PYmplY3RbJ0RhdGVDb21wbGV0ZWQnXSA9IHRoaXMuZGF0ZUNvbXBsZXRlZDtcclxuXHRcdHRoaXMuX0V4dHJhSW5mbyA9IEV4dHJhSW5mb09iamVjdDtcclxuXHR9O1xyXG5cclxuXHRfZ2V0RXZlbnRIdG1sKHRpdGxlID0gdGhpcy50aXRsZSwgY29udGVudCA9ICcnKXtcclxuXHRcdGNvbnN0IGh0bWxUZXh0ID0gXHJcblx0XHRcdGA8aHRtbD5cclxuXHRcdFx0XHQ8aGVhZD5cclxuXHRcdFx0XHRcdDxtZXRhIGh0dHAtZXF1aXY9XCJDb250ZW50LVR5cGVcIiBjb250ZW50PVwidGV4dC9odG1sOyBjaGFyc2V0PXVuaWNvZGVcIj5cclxuXHRcdFx0XHRcdDx0aXRsZT4ke3RpdGxlfTwvdGl0bGU+IFxyXG5cdFx0XHRcdDwvaGVhZD5cclxuXHRcdFx0XHQ8Ym9keT5cclxuXHRcdFx0XHRcdDwhLS1XaXpIdG1sQ29udGVudEJlZ2luLS0+XHJcblx0XHRcdFx0XHQ8ZGl2PiR7Y29udGVudH08L2Rpdj5cclxuXHRcdFx0XHRcdDwhLS1XaXpIdG1sQ29udGVudEVuZC0tPlxyXG5cdFx0XHRcdDwvYm9keT5cclxuXHRcdFx0PC9odG1sPmA7XHJcblx0XHJcblx0XHQgIHJldHVybiBodG1sVGV4dFxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG4gICAgICog5qC55o2u5pel56iL55qE6YeN5aSN6KeE5YiZ55Sf5oiQIEZ1bGxDYWxlbmRhciBldmVudFNvdXJjZS5cclxuXHQgKiBAcGFyYW0ge1N0cmluZ30gc3RhcnQg5p+l6K+i6LW35aeL77yMSVNPIOagh+WHhuaXpeacn+Wtl+espuS4si5cclxuXHQgKiBAcGFyYW0ge1N0cmluZ30gZW5kIOafpeivoue7k+adn++8jElTTyDmoIflh4bml6XmnJ/lrZfnrKbkuLIuXHJcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBldmVudFNvdXJjZS5cclxuICAgICAqL1xyXG5cdGdlbmVyYXRlUmVwZWF0RXZlbnRzKHN0YXJ0LCBlbmQpIHtcclxuXHRcdGlmICggIXRoaXMucnB0UnVsZSApIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGZpbmQgQ2FsZW5kYXJFdmVudCByZXBlYXQgcnVsZS4nKTtcclxuXHRcdGNvbnN0IGV2ZW50U291cmNlID0ge1xyXG5cdFx0XHRpZDogdGhpcy5pZCxcclxuXHRcdFx0ZXZlbnRzOiBbXVxyXG5cdFx0fVxyXG5cdFx0Ly/moLnmja5ycHRSdWxl55Sf5oiQ6YeN5aSN5pel5pyf77yM5bm255Sf5oiQ5LqL5Lu2XHJcblx0XHRjb25zdCBkYXlBcnJheSA9IHRoaXMuX2dldFJlbmRlclJlcGVhdERheShzdGFydCwgZW5kKTtcclxuXHRcdGZvciAoIGxldCBkYXkgb2YgZGF5QXJyYXkgKSB7XHJcblx0XHRcdC8vIGRheSDmmK/kuIDkuKpNb21lbnTml6XmnJ/lr7nosaFcclxuXHRcdFx0Y29uc3QgbmV3RXZlbnQgPSB0aGlzLnRvRnVsbENhbGVuZGFyRXZlbnQoKTtcclxuXHRcdFx0bmV3RXZlbnQuc3RhcnQgPSBkYXkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRcdG5ld0V2ZW50LmVuZCA9IG1vbWVudChuZXdFdmVudC5lbmQpLmFkZCggZGF5LmRpZmYoIG1vbWVudCh0aGlzLnN0YXJ0KSApICkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRcdGV2ZW50U291cmNlLmV2ZW50cy5wdXNoKG5ld0V2ZW50KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZXZlbnRTb3VyY2U7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcbiAgICAgKiDmoLnmja7op4TliJnnlJ/miJDml6XmnJ/mlbDnu4RcclxuICAgICAqIEByZXR1cm5zIHtPYmplY3RbXX0g5YyF5ZCr5LiA57O75YiXYE1vbWVudGDml6XmnJ/lr7nosaHnmoTmlbDnu4QuXHJcbiAgICAgKi9cclxuXHRfZ2V0UmVuZGVyUmVwZWF0RGF5KHN0YXJ0LCBlbmQpIHtcclxuXHRcdC8qXHJcblx0XHRjb25zdCBycHRSdWxlID0ge1xyXG5cdFx0XHRcIkRhaWx5XCI6IFwiRGFpbHlcIiwgLy/mr4/ml6VcclxuXHRcdFx0XCJFdmVyeVdlZWtkYXlcIjogXCJFdmVyeVdlZWtkYXkxMzVcIiwgLy/mr4/kuKrlt6XkvZzml6UxMzVcclxuXHRcdFx0XCJFdmVyeVdlZWtcIjogXCJFdmVyeVdlZWs3MTIzNDU2XCIsIC8v5q+P5ZGoIOaXpeS4gOS6jOS4ieWbm+S6lOWFrVxyXG5cdFx0XHRcIkV2ZXJ5MldlZWtzXCIgOiBcIkV2ZXJ5MldlZWtzXCIsIC8v5q+P5Lik5ZGoXHJcblx0XHRcdFwiTW9udGhseVwiOiBcIk1vbnRobHlcIiwgLy/mr4/mnIhcclxuXHRcdFx0XCJZZWFybHlcIjogXCJZZWFybHlcIiwgLy/mr4/lubRcclxuXHRcdFx0XCJDaGluZXNlTW9udGhseVwiOiBcIkNoaW5lc2VNb250aGx5XCIsIC8v5Yac5Y6G5q+P5pyIXHJcblx0XHRcdFwiQ2hpbmVzZVllYXJseVwiOiBcIkNoaW5lc2VZZWFybHlcIiwgLy/lhpzljobmr4/lubRcclxuXHRcdH07XHJcblx0XHQqL1xyXG5cdFx0Y29uc3QgcnB0UnVsZSA9IHRoaXMucnB0UnVsZTtcclxuXHRcdGxldCBkYXlBcnJheTtcclxuXHRcdGNvbnNvbGUubG9nKHJwdFJ1bGUpXHJcblx0XHRpZiAoL15FdmVyeSh8XFxkKVdlZWsofGRheSkoXFxkKikkLy50ZXN0KHJwdFJ1bGUpICkge1xyXG5cdFx0XHQvLyDmr49bMTIzNF3lkahbNzEyMzQ1Nl1cclxuXHRcdFx0Y29uc3QgcmVzdWx0cyA9IC9eRXZlcnkofFxcZClXZWVrKHxkYXkpKFxcZCopJC8uZXhlYyhycHRSdWxlKTtcclxuXHRcdFx0Y29uc3QgaW50ZXJXZWVrID0gcmVzdWx0c1sxXVxyXG5cdFx0XHRjb25zdCBudW1iZXIgPSByZXN1bHRzWzNdO1xyXG5cdFx0XHRkYXlBcnJheSA9IHRoaXMuX2dldFdlZWtseVJlcGVhdERheShudW1iZXIsIHN0YXJ0LCBlbmQsIGludGVyV2Vlayk7XHJcblx0XHR9IGVsc2UgaWYgKCAvXkV2ZXJ5V2Vla3xFdmVyeVdlZWtkYXkkLy50ZXN0KHJwdFJ1bGUpICkge1xyXG5cdFx0XHQvLyDmr4/kuKrlt6XkvZzml6VcclxuXHRcdFx0ZGF5QXJyYXkgPSB0aGlzLl9nZXRXZWVrbHlSZXBlYXREYXkoJzEyMzQ1Jywgc3RhcnQsIGVuZCk7XHJcblx0XHR9IGVsc2UgaWYgKCBcIkRhaWx5XCIgPT0gcnB0UnVsZSApIHtcclxuXHRcdFx0ZGF5QXJyYXkgPSB0aGlzLl9nZXRXZWVrbHlSZXBlYXREYXkoJzAxMjM0NTYnLCBzdGFydCwgZW5kKTtcclxuXHRcdH0gZWxzZSBpZiAoIFwiV2Vla2x5XCIgPT0gcnB0UnVsZSApIHtcclxuXHRcdFx0Y29uc3QgY3VyV2Vla0RheSA9IG1vbWVudCh0aGlzLnN0YXJ0KS5kYXkoKTtcclxuXHRcdFx0ZGF5QXJyYXkgPSB0aGlzLl9nZXRXZWVrbHlSZXBlYXREYXkoYCR7Y3VyV2Vla0RheX1gLCBzdGFydCwgZW5kKTtcclxuXHRcdH1cclxuXHRcdC8vVE9ETzog5a6M5oiQ5Ymp5LiL55qE6YeN5aSN6KeE5YiZXHJcblx0XHQvKlxyXG5cdFx0c3dpdGNoICggdHJ1ZSApe1xyXG5cdFx0XHRcdC8vIOavj+Wkqe+8jOWbuuWumumXtOmalFxyXG5cdFx0XHRcdGNhc2UgXCJEYWlseVwiOlxyXG5cdFx0XHRcdFx0Z2V0V2Vla2x5UmVwZWF0RGF5KGRheUFycmF5LCBbMSwgMiwgMywgNCwgNSwgNiwgN10pO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Ly8g5q+P5ZGo77yM5Zu65a6a6Ze06ZqUXHJcblx0XHRcdFx0Y2FzZSBcIldlZWtseVwiOlxyXG5cdFx0XHRcdFx0Z2V0V2Vla2x5UmVwZWF0RGF5KGRheUFycmF5LCBbZXZlbnRTdGFydC5nZXREYXkoKV0pO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Ly8g5q+P5Lik5ZGo77yM5Zu65a6a6Ze06ZqUXHJcblx0XHRcdFx0Y2FzZSBcIkV2ZXJ5MldlZWtzXCI6XHJcblx0XHRcdFx0XHRnZXRXZWVrbHlSZXBlYXREYXkoZGF5QXJyYXksIFtldmVudFN0YXJ0LmdldERheSgpXSk7XHJcblx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRheUFycmF5Lmxlbmd0aDsgKysgaSl7XHJcblx0XHRcdFx0XHRcdHZhciBpbnRlciA9IF9pbnRlckRheXMoX2QycyhldmVudFN0YXJ0KSwgX2QycyhkYXlBcnJheVtpXVswXSkpO1xyXG5cdFx0XHRcdFx0XHRpZiAoKHBhcnNlRmxvYXQoKGludGVyLTEpLzcuMCkgJSAyKSAhPSAwICl7XHJcblx0XHRcdFx0XHRcdFx0ZGF5QXJyYXkuc3BsaWNlKGksIDEpO1xyXG5cdFx0XHRcdFx0XHRcdGkgLS07XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdC8vIOavj+aciFxyXG5cdFx0XHRcdGNhc2UgXCJNb250aGx5XCI6XHJcblx0XHRcdFx0XHRnZXRNb250aGx5UmVwZWF0RGF5KGRheUFycmF5KTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdC8vIOavj+W5tFxyXG5cdFx0XHRcdGNhc2UgXCJZZWFybHlcIjpcclxuXHRcdFx0XHRcdGdldFllYXJseVJlcGVhdERheShkYXlBcnJheSk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHQvLyBUT0RPOiDmsYnlrZfpnIDopoHogIPomZFcclxuXHRcdFx0XHRjYXNlIFwiQ2hpbmVzZU1vbnRobHlcIjpcclxuXHRcdFx0XHRcdGdldENoaW5lc2VSZXBlYXREYXkoZGF5QXJyYXksICfmnIgnKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgXCJDaGluZXNlWWVhcmx5XCI6XHJcblx0XHRcdFx0XHRnZXRDaGluZXNlUmVwZWF0RGF5KGRheUFycmF5LCAn5Y6GJyk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRkZWZhdWx0OntcclxuXHRcdFx0XHRcdGlmIChnX3JlcGVhdFJ1bGUuaW5kZXhPZihcIkV2ZXJ5V2Vla1wiKSA9PSAwKXtcclxuXHRcdFx0XHRcdFx0dmFyIGRheXMgPSBnX3JlcGVhdFJ1bGUuc3Vic3RyKFwiRXZlcnlXZWVrXCIubGVuZ3RoKS5zcGxpdCgnJyk7XHJcblx0XHRcdFx0XHRcdGdldFdlZWtseVJlcGVhdERheShkYXlBcnJheSwgZGF5cyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdFxyXG5cdFx0XHR9XHJcblx0XHRcdCovXHJcblx0XHRcdHJldHVybiBkYXlBcnJheTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuICAgICAqIOagueaNruavj+WRqOinhOWImeeUn+aIkOaXpeacn+aVsOe7hFxyXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBudW1iZXIg5pW05pWw5a2X56ym5Liy6KGo56S655qE6KeE5YiZ77ybXHJcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0W119IOWMheWQq+S4gOezu+WIl01vbWVudOaXpeacn+WvueixoeeahOaVsOe7hC5cclxuICAgICAqL1xyXG5cdF9nZXRXZWVrbHlSZXBlYXREYXkobnVtYmVyLCBzdGFydCwgZW5kLCBpbnRlcldlZWtzID0gJzEnKSB7XHJcblx0XHQvL+i/lOWbnlt7c3RhcnQsIGVuZH0sIHtzdGFydCwgZW5kfSwge3N0YXJ0LCBlbmR9XVxyXG5cdFx0Ly/ogIPomZHmuLLmn5PojIPlm7TvvIzku6Xlj4rnu5PmnZ/lvqrnjq/nmoTml6XmnJ9cclxuXHRcdGNvbnN0IHZpZXdTdGFydCA9IG1vbWVudCh0aGlzLnN0YXJ0KTtcclxuXHRcdGNvbnN0IHZpZXdFbmQgPSBtb21lbnQoZW5kKTtcclxuXHRcdGxldCBkYXlBcnJheSA9IFtdO1xyXG5cdFx0Y29uc3QgaW50ZXJ2YWxXZWVrcyA9IGludGVyV2Vla3MgPyBwYXJzZUludChpbnRlcldlZWtzKSA6IDE7XHJcblx0XHRjb25zdCB3ZWVrZGF5cyA9IG51bWJlci5yZXBsYWNlKCc3JywgJzAnKS5zcGxpdCgnJyk7IC8v5ZGo5pelMH425ZGo5YWtXHJcblx0XHRmb3IgKCBsZXQgZGF5IG9mIHdlZWtkYXlzICkge1xyXG5cdFx0XHQvL1xyXG5cdFx0XHRsZXQgY3VyV2Vla0RheSA9IHBhcnNlSW50KGRheSksIG5ld0V2ZW50U3RhcnREYXRlID0gbW9tZW50KHZpZXdTdGFydClcclxuXHRcdFx0ZG8ge1xyXG5cdFx0XHRcdC8vIOWIm+W7uuaWsE1vbWVudOWvueixoVxyXG5cdFx0XHRcdG5ld0V2ZW50U3RhcnREYXRlID0gbW9tZW50KHZpZXdTdGFydCkuZGF5KGN1cldlZWtEYXkpO1xyXG5cdFx0XHRcdC8vIOagueaNruaXpeeoi+iuvue9rnRpbWUgcGFydFxyXG5cdFx0XHRcdGNvbnN0IGV2ZW50U3RhcnQgPSBtb21lbnQodGhpcy5zdGFydClcclxuXHRcdFx0XHRuZXdFdmVudFN0YXJ0RGF0ZS5zZXQoe1xyXG5cdFx0XHRcdFx0J2hvdXInOiBldmVudFN0YXJ0LmdldCgnaG91cicpLFxyXG5cdFx0XHRcdFx0J21pbnV0ZSc6IGV2ZW50U3RhcnQuZ2V0KCdtaW51dGUnKSxcclxuXHRcdFx0XHRcdCdzZWNvbmQnOiBldmVudFN0YXJ0LmdldCgnc2Vjb25kJylcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC8vIOmBv+WFjeWIneWni+mHjeWkjea4suafk1xyXG5cdFx0XHRcdGlmICggIW5ld0V2ZW50U3RhcnREYXRlLmlzU2FtZSggZXZlbnRTdGFydCApICkgZGF5QXJyYXkucHVzaCggbW9tZW50KG5ld0V2ZW50U3RhcnREYXRlKSApO1xyXG5cdFx0XHRcdC8vIOmalOWkmuWwkeWRqOmHjeWkjVxyXG5cdFx0XHRcdGN1cldlZWtEYXkgKz0gNyppbnRlcnZhbFdlZWtzO1xyXG5cdFx0XHRcdC8vY29uc29sZS5sb2coIG1vbWVudChuZXdFdmVudFN0YXJ0RGF0ZSkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJykgKTtcclxuXHRcdFx0fSB3aGlsZSAoIG1vbWVudCh2aWV3U3RhcnQpLmRheShjdXJXZWVrRGF5ICsgNyApLmlzQmVmb3JlKCB2aWV3RW5kICkgKVxyXG5cdFx0XHRcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIGRheUFycmF5O1xyXG5cdH1cclxuXHJcblx0dG9GdWxsQ2FsZW5kYXJFdmVudCgpIHtcclxuXHRcdC8vIOazqOaEj+aWueazlei/lOWbnueahOWPquaYr0Z1bGxDYWxlbmRhckV2ZW5055qE5pWw5o2u57G75Z6L77yM5bm25LiN5pivZXZlbnTlr7nosaFcclxuXHRcdGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cdFx0Y29uc3QgbmV3RXZlbnQgPSB7fTtcclxuXHRcdGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzKTtcclxuXHRcdC8vIOWOu+mZpOmdnuW/heimgeWxnuaAp1xyXG5cdFx0a2V5cy5zcGxpY2UoIGtleXMuZmluZEluZGV4KCAoaSkgPT4gaSA9PSAnX0luZm8nICksIDEpO1xyXG5cdFx0a2V5cy5zcGxpY2UoIGtleXMuZmluZEluZGV4KCAoaSkgPT4gaSA9PSAnX0V4dHJhSW5mbycgKSwgMSk7XHJcblx0XHQvLyDmtYXmi7fotJ0sIOS4jei/h+S4u+imgeWxnuaAp+mDveaYr+WfuuacrOaVsOaNruexu+Wei++8jOaJgOS7peS4jeWtmOWcqOW8leeUqOmXrumimFxyXG5cdFx0a2V5cy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0sIGluZGV4LCBhcnIpe1xyXG5cdFx0XHRuZXdFdmVudFtpdGVtXSA9IHRoYXRbaXRlbV07XHJcblx0XHR9KTtcclxuXHRcdHJldHVybiBuZXdFdmVudDtcclxuXHR9O1xyXG5cclxuXHR0b1dpekV2ZW50RGF0YSgpIHtcclxuXHRcdHRoaXMuX3VwZGF0ZSgpO1xyXG5cdFx0Y29uc3QgbmV3RXZlbnQgPSB7fTtcclxuXHRcdG5ld0V2ZW50LnRpdGxlID0gdGhpcy50aXRsZTtcclxuXHRcdG5ld0V2ZW50Lmd1aWQgPSB0aGlzLmlkO1xyXG5cdFx0bmV3RXZlbnQuQ0FMRU5EQVJfU1RBUlQgPSB0aGlzLmFsbERheSA/IG1vbWVudCh0aGlzLnN0YXJ0KS5mb3JtYXQoJ1lZWVktTU0tREQgMDA6MDA6MDAnKSA6IHRoaXMuc3RhcnQ7XHJcblx0XHRuZXdFdmVudC5DQUxFTkRBUl9FTkQgPSB0aGlzLmFsbERheSA/IG1vbWVudCh0aGlzLmVuZCkuZm9ybWF0KCdZWVlZLU1NLUREIDIzOjU5OjU5JykgOiB0aGlzLmVuZDtcclxuXHRcdG5ld0V2ZW50LkNBTEVOREFSX0lORk8gPSB0aGlzLl9zdHJpbmdpZnlJbmZvKHRoaXMuX0luZm8pO1xyXG5cdFx0bmV3RXZlbnQuQ0FMRU5EQVJfRVhUUkFJTkZPID0gdGhpcy5fc3RyaW5naWZ5SW5mbyh0aGlzLl9FeHRyYUluZm8pO1xyXG5cdFx0bmV3RXZlbnQuY3JlYXRlZCA9IHRoaXMuY3JlYXRlZDtcclxuXHRcdG5ld0V2ZW50LnVwZGF0ZWQgPSB0aGlzLnVwZGF0ZWQ7XHJcblx0XHRyZXR1cm4gbmV3RXZlbnQ7XHJcblx0fTtcclxuXHJcblx0YWRkVG9GdWxsQ2FsZW5kYXIoKSB7XHJcblx0XHQvL1RPRE86IOWwhuiHqui6q+a3u+WKoOWIsEZ1bGxDYWxlbmRhclxyXG5cdFx0aWYgKCFnX2NhbCkgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGZpbmQgRnVsbENhbGVuZGFyIFdpZGdldC4nKVxyXG5cdFx0Z19jYWwuZnVsbENhbGVuZGFyKCAnYWRkRXZlbnRTb3VyY2UnLCB7XHJcblx0XHRcdGV2ZW50czogW1xyXG5cdFx0XHRcdHRoaXMudG9GdWxsQ2FsZW5kYXJFdmVudCgpXHJcblx0XHRcdF1cclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdF9zYXZlQWxsUHJvcCgpIHtcclxuXHRcdC8vVE9ETzog5L+d5a2Y5YWo6YOo5pWw5o2u5YyF5ousVGl0bGVcclxuXHRcdC8vIOabtOaWsOS6i+S7tuaWh+aho+aVsOaNrlxyXG5cdFx0Y29uc3QgZG9jID0gZ19kYi5Eb2N1bWVudEZyb21HVUlEKHRoaXMuaWQpO1xyXG5cdFx0Ly8g5L+d5a2Y5qCH6aKYXHJcblx0XHRkb2MuVGl0bGUgPSB0aGlzLnRpdGxlO1xyXG5cdFx0Ly8g5L+d5a2Y5pe26Ze05pWw5o2uXHJcblx0XHRpZiAoIHRoaXMuYWxsRGF5ICkge1xyXG5cdFx0XHRsZXQgc3RhcnRTdHIgPSBtb21lbnQodGhpcy5zdGFydCkuc2V0KHsnaCc6IDAsICdtJzogMCwgJ3MnOiAwfSkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRcdGxldCBlbmRTdHIgPSBtb21lbnQodGhpcy5lbmQpLnNldCh7J2gnOiAyMywgJ20nOiA1OSwgJ3MnOiA1OX0pLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9TVEFSVFwiLCBzdGFydFN0cik7XHJcblx0XHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX0VORFwiLCBlbmRTdHIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bGV0IHN0YXJ0U3RyID0gbW9tZW50KHRoaXMuc3RhcnQpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHRsZXQgZW5kU3RyID0gbW9tZW50KHRoaXMuZW5kKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfU1RBUlRcIiwgc3RhcnRTdHIpO1xyXG5cdFx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9FTkRcIiwgZW5kU3RyKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyDkv53lrZggQ0FMRU5EQVJfSU5GT1xyXG5cdFx0dGhpcy5fdXBkYXRlKCk7XHJcblx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9JTkZPXCIsIHRoaXMuX3N0cmluZ2lmeUluZm8odGhpcy5fSW5mbykpO1xyXG5cdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfRVhUUkFJTkZPXCIsIHRoaXMuX3N0cmluZ2lmeUluZm8odGhpcy5fRXh0cmFJbmZvKSk7XHJcblx0fTtcclxuXHJcblx0Ly8g6K6+572u5paH5qGj5bGe5oCn5YC8XHJcblx0X3NldFBhcmFtVmFsdWUoZG9jLCBrZXksIHZhbHVlKSB7XHJcblx0XHRpZiAoIWRvYykgcmV0dXJuIGZhbHNlO1xyXG5cdFx0ZG9jLlNldFBhcmFtVmFsdWUoa2V5LCB2YWx1ZSk7XHJcblx0fTtcclxuXHJcblx0X2NyZWF0ZVdpekV2ZW50RG9jKCkge1xyXG5cdFx0Ly9UT0RPOiDkv53lrZjlhajpg6jmlbDmja7ljIXmi6xUaXRsZVxyXG5cdFx0Ly8g5Yib5bu6V2l6RG9jXHJcblx0XHRjb25zdCBsb2NhdGlvbiA9IGBNeSBFdmVudHMvJHsgbW9tZW50KHRoaXMuc3RhcnQpLmZvcm1hdCgnWVlZWS1NTScpIH0vYDtcclxuXHRcdGNvbnN0IG9iakZvbGRlciA9IGdfZGIuR2V0Rm9sZGVyQnlMb2NhdGlvbihsb2NhdGlvbiwgdHJ1ZSk7XHJcblx0XHRjb25zdCB0ZW1wSHRtbCA9IGdfY21uLkdldEFUZW1wRmlsZU5hbWUoJy5odG1sJyk7XHJcblx0XHRjb25zdCBodG1sVGV4dCA9IHRoaXMuX2dldEV2ZW50SHRtbCh0aGlzLnRpdGxlLCAnJyk7XHJcblx0XHRnX2Ntbi5TYXZlVGV4dFRvRmlsZSh0ZW1wSHRtbCwgaHRtbFRleHQsICd1bmljb2RlJyk7XHJcblx0XHRjb25zdCBkb2MgPSBvYmpGb2xkZXIuQ3JlYXRlRG9jdW1lbnQyKHRoaXMudGl0bGUsIFwiXCIpO1xyXG5cdFx0ZG9jLkNoYW5nZVRpdGxlQW5kRmlsZU5hbWUodGhpcy50aXRsZSk7XHJcblx0XHRkb2MuVXBkYXRlRG9jdW1lbnQ2KHRlbXBIdG1sLCB0ZW1wSHRtbCwgMHgyMik7XHJcblx0XHQvLyDorr7nva7moIfnrb5cclxuXHRcdC8vaWYgKCB0YWdzICkgZG9jLlNldFRhZ3NUZXh0Mih0YWdzLCBcIkNhbGVuZGFyXCIpO1xyXG5cdFx0Ly8g5bCG5L+h5oGv57yW56CB5YiwV2l6RG9j5bGe5oCn5Lit5Y67XHJcblx0XHRjb25zdCBuZXdFdmVudCA9IHRoaXMudG9XaXpFdmVudERhdGEoKTtcclxuXHRcdGRvYy5BZGRUb0NhbGVuZGFyKG5ld0V2ZW50LkNBTEVOREFSX1NUQVJULCBuZXdFdmVudC5DQUxFTkRBUl9FTkQsIG5ld0V2ZW50LkNBTEVOREFSX0lORk8pO1xyXG5cdFx0Ly8gY2hhbmdlIGRhdGFiYXNlXHJcblx0XHRkb2MudHlwZSA9IFwiZXZlbnRcIjtcclxuXHRcdC8vXHJcblx0XHR0aGlzLmlkID0gZG9jLkdVSUQ7XHJcblx0fVxyXG5cclxuXHRzYXZlVG9XaXpFdmVudERvYyggcHJvcCA9ICdhbGwnICkge1xyXG5cdFx0aWYgKCFnX2RiIHx8ICFnX2NtbikgdGhyb3cgbmV3IEVycm9yKCdJV2l6RGF0YWJhc2Ugb3IgSVdpekNvbW1vblVJIGlzIG5vdCB2YWxpZC4nKTtcclxuXHRcdC8v5qOA5p+l5paH5qGj5piv5ZCm5a2Y5ZyoXHJcblx0XHRjb25zdCBndWlkUmVnZXggPSAvXlswLTlhLWZdezh9LVswLTlhLWZdezR9LVsxLTVdWzAtOWEtZl17M30tWzg5YWJdWzAtOWEtZl17M30tWzAtOWEtZl17MTJ9JC9pO1xyXG5cdFx0Y29uc3QgaXNXaXpEb2NFeGlzdCA9IGd1aWRSZWdleC50ZXN0KHRoaXMuaWQpO1xyXG5cdFx0Ly8g5Yib5bu65oiW6ICF5pu05paw5paH5qGjXHJcblx0XHRpZiAoIGlzV2l6RG9jRXhpc3QgKSB7XHJcblx0XHRcdC8vIOagueaNruaMh+S7pOabtOaWsOWGheWuuVxyXG5cdFx0XHR0aGlzLl9zYXZlQWxsUHJvcCgpO1xyXG5cdFx0XHQvLyDmm7TmlrBGdWxsQ2FsZW5kYXJcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdC8vIOWIm+W7uuaWsOeahOS6i+S7tuaWh+aho1xyXG5cdFx0XHR0aGlzLl9jcmVhdGVXaXpFdmVudERvYygpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0fTtcclxuXHJcblx0ZGVsZXRlRXZlbnREYXRhKCBpc0RlbGV0ZURvYyA9IGZhbHNlICl7XHJcblx0XHRpZiAoIWdfY2FsKSB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgZmluZCBGdWxsQ2FsZW5kYXIgV2lkZ2V0LicpXHJcblx0XHRsZXQgZG9jID0gZ19kYi5Eb2N1bWVudEZyb21HVUlEKHRoaXMuaWQpO1xyXG5cdFx0aWYgKCFkb2MpIHRocm93IG5ldyBFcnJvcignQ2FuIG5vdCBmaW5kIEV2ZW50IHJlbGF0ZWQgV2l6RG9jdW1lbnQuJylcclxuXHRcdC8vIOenu+mZpEZ1bGxDYWxlbmRhcuS6i+S7tlxyXG5cdFx0Z19jYWwuZnVsbENhbGVuZGFyKCdyZW1vdmVFdmVudHMnLCB0aGlzLmlkKTtcclxuXHRcdC8vIOenu+mZpOaXpeWOhuaVsOaNrlxyXG5cdFx0ZG9jLlJlbW92ZUZyb21DYWxlbmRhcigpO1xyXG5cdFx0Ly8g5Yig6Zmk5paH5qGjXHJcblx0XHRpZiAoIGlzRGVsZXRlRG9jICkgZG9jLkRlbGV0ZSgpO1xyXG5cdH1cclxuXHJcblx0cmVmZXRjaERhdGEoKSB7XHJcblx0XHQvL1RPRE86IOmHjeaVsOaNruW6k+mHjeaWsOiOt+WPluaVsOaNruabtOaWsOWunuS+i1xyXG5cdH07XHJcblxyXG5cdHJlZnJlc2hFdmVudChldmVudCkge1xyXG5cdFx0Ly9UT0RPOiDlupTor6Xoh6rliqjpgY3ljoblubbkv67mlLnlsZ7mgKdcclxuXHRcdGlmICggZXZlbnQgKSB7XHJcblx0XHRcdC8vIOmHjeaWsOa4suafk0Z1bGxDYWxlbmRhcuS6i+S7tlxyXG5cdFx0XHRldmVudC50aXRsZSA9IHRoaXMudGl0bGU7XHJcblx0XHRcdGV2ZW50LmJhY2tncm91bmRDb2xvciA9IHRoaXMuYmFja2dyb3VuZENvbG9yO1xyXG5cdFx0XHRnX2NhbC5mdWxsQ2FsZW5kYXIoJ3VwZGF0ZUV2ZW50JywgZXZlbnQpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Ly/nlKguZnVsbENhbGVuZGFyKCDigJhjbGllbnRFdmVudHPigJkgWywgaWRPckZpbHRlciBdICkgLT4gQXJyYXkg6I635Y+W5rqQ5pWw5o2u5LuO6ICM5pu05pawXHJcblx0XHRcdC8vVE9ETzog6YGN5Y6G5bm25a+75om+R1VJROWMuemFjeeahOS6i+S7tlxyXG5cdFx0fVxyXG5cdH1cclxuXHJcbn0iLCJleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBjb2xvckNvdW50OiAxMixcclxuICAgIGNvbG9ySXRlbXM6IFtcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiMzMkNEMzJcIiwgXCJjb2xvck5hbWVcIjogJ+aphOamhOe7vycgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiM1NDg0RURcIiwgXCJjb2xvck5hbWVcIjogJ+Wuneefs+iTnScgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNBNEJERkVcIiwgXCJjb2xvck5hbWVcIjogJ+iTneiJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiM0NkQ2REJcIiwgXCJjb2xvck5hbWVcIjogJ+mdkue7v+iJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiM3QUU3QkZcIiwgXCJjb2xvck5hbWVcIjogJ+e7v+iJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiM1MUI3NDlcIiwgXCJjb2xvck5hbWVcIjogJ+a4heaWsOe7vycgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNGQkQ3NUJcIiwgXCJjb2xvck5hbWVcIjogJ+m7hOiJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNGRkI4NzhcIiwgXCJjb2xvck5hbWVcIjogJ+apmOiJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNGRjg4N0NcIiwgXCJjb2xvck5hbWVcIjogJ+e6ouiJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNEQzIxMjdcIiwgXCJjb2xvck5hbWVcIjogJ+WlouWNjue6oicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNEQkFERkZcIiwgXCJjb2xvck5hbWVcIjogJ+e0q+iJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNFMUUxRTFcIiwgXCJjb2xvck5hbWVcIjogJ+eBsOiJsicgfVxyXG4gICAgXSxcclxuXHJcbn0iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xyXG5pbXBvcnQgJ2Jvb3RzdHJhcC9qcy9tb2RhbCc7XHJcbmltcG9ydCBGb3JtSGFuZGxlcyBmcm9tICcuLi9VdGlscy9Gb3JtSGFuZGxlcyc7XHJcbmltcG9ydCB7IGNyZWF0ZURhdGV0aW1lUGlja2VyIH0gZnJvbSAnLi4vV2lkZ2V0L0RhdGVUaW1lUGlja2VyJztcclxuaW1wb3J0IHsgY3JlYXRlQ29sb3JQaWNrZXIgfSBmcm9tICcuLi9XaWRnZXQvQ29sb3JQaWNrZXInO1xyXG5pbXBvcnQgRXZlbnRNb2RhbCBmcm9tICcuL0V2ZW50TW9kYWwnO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50Q3JlYXRlTW9kYWwgZXh0ZW5kcyBFdmVudE1vZGFsIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhcmdzKSB7XHJcbiAgICAgICAgc3VwZXIoYXJncyk7XHJcbiAgICAgICAgLy9UT0RPOiDmg7Plip7ms5Xpgb/lhY3lr7zlh7rlhajlsYDlj5jph49cclxuICAgICAgICB3aW5kb3cuZ19jcmVhdGVNb2RhbCA9IHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIHVwZGF0ZShhcmdzKSB7XHJcbiAgICAgICAgdGhpcy5yZXNldEZvcm1JbnB1dCh0aGlzLm1vZGFsLCAnI3RjLWNyZWF0ZXBhZ2UtZXZlbnRzdGFydCwjdGMtY3JlYXRlcGFnZS1ldmVudGVuZCcpO1xyXG4gICAgICAgIHN1cGVyLnVwZGF0ZShhcmdzKTtcclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyVGVtcGxhdGUoKSB7XHJcbiAgICAgICAgLy8g5riy5p+TIERPTVxyXG4gICAgICAgIHRoaXMucmVuZGVyRm9ybUNvbXBvbmVudCh0aGlzLm1vZGFsLCBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5vZGU6IHRoaXMubW9kYWwsXHJcbiAgICAgICAgICAgICAgICBldmVudE5hbWU6ICdzaG93bi5icy5tb2RhbCcsXHJcbiAgICAgICAgICAgICAgICBoYW5kbGU6ICgpID0+IHRoaXMubW9kYWwuZmluZCgnI3RjLWNyZWF0ZXBhZ2UtZXZlbnR0aXRsZScpLmZvY3VzKCksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5vZGU6ICcjdGMtY3JlYXRlcGFnZS1ldmVudHN0YXJ0JyxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLmFyZ3Muc3RhcnQuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyksXHJcbiAgICAgICAgICAgICAgICByZW5kZXJlcjogY3JlYXRlRGF0ZXRpbWVQaWNrZXJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbm9kZTogJyN0Yy1jcmVhdGVwYWdlLWV2ZW50ZW5kJyxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLmFyZ3MuZW5kLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpLFxyXG4gICAgICAgICAgICAgICAgcmVuZGVyZXI6IGNyZWF0ZURhdGV0aW1lUGlja2VyXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5vZGU6ICcjdGMtY3JlYXRlcGFnZS1ldmVudGNvbG9yJyxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiAnJyxcclxuICAgICAgICAgICAgICAgIHJlbmRlcmVyOiBjcmVhdGVDb2xvclBpY2tlclxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBub2RlOiAnI3RjLWNyZWF0ZXBhZ2UtY3JlYXRlJyxcclxuICAgICAgICAgICAgICAgIGV2ZW50TmFtZTogJ2NsaWNrJyxcclxuICAgICAgICAgICAgICAgIGhhbmRsZTogKCkgPT4gbmV3IEZvcm1IYW5kbGVzKCkub25DcmVhdGVCdG5DbGljayh0aGlzLmFyZ3Muc3RhcnQsIHRoaXMuYXJncy5lbmQsIHRoaXMuYXJncy5qc0V2ZW50LCB0aGlzLmFyZ3MudmlldywgdGhpcy5tb2RhbCksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5vZGU6ICcjdGMtY3JlYXRlcGFnZS1jYW5jZWwsI3RjLWNyZWF0ZXBhZ2UtY2xvc2UnLFxyXG4gICAgICAgICAgICAgICAgZXZlbnROYW1lOiAnY2xpY2snLFxyXG4gICAgICAgICAgICAgICAgaGFuZGxlOiAoKSA9PiAkKCcjY2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoJ3Vuc2VsZWN0JylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBnZXQgSHRtbFRlbXBsYXRlKCkge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbCBmYWRlXCIgdGFiaW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIiBpZD1cInRjLUV2ZW50Q3JlYXRlTW9kYWxcIiBhcmlhLWxhYmVsbGVkYnk9XCJ0Yy1jcmVhdGVwYWdlLWRpYWxvZ3RpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZGlhbG9nIG1vZGFsLWRpYWxvZy1jZW50ZXJlZFwiIHJvbGU9XCJkb2N1bWVudFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD0ndGMtY3JlYXRlcGFnZS1jbG9zZScgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPjxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwibW9kYWwtdGl0bGVcIiBpZD0ndGMtY3JlYXRlcGFnZS1kaWFsb2d0aXRsZSc+5Yib5bu65paw55qE5pel56iLPC9oND5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHlcIj5cclxuICAgICAgICAgICAgICAgICAgICA8Zm9ybT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdmb3JtLWdyb3VwIGNvbC1tZC0xMic+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwidGMtY3JlYXRlcGFnZS1ldmVudHRpdGxlXCI+5qCH6aKYPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sIGV2ZW50dGl0bGVcIiBpZD1cInRjLWNyZWF0ZXBhZ2UtZXZlbnR0aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgY29sLW1kLTZcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJ0Yy1jcmVhdGVwYWdlLWV2ZW50c3RhcnRcIiBjbGFzcz1cImNvbC1mb3JtLWxhYmVsXCI+5byA5aeL5pel5pyfPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sIGRhdGV0aW1lcGlja2VyLWlucHV0IGV2ZW50c3RhcnRcIiBpZD1cInRjLWNyZWF0ZXBhZ2UtZXZlbnRzdGFydFwiIGRhdGEtdG9nZ2xlPVwiZGF0ZXRpbWVwaWNrZXJcIiBkYXRhLXRhcmdldD1cIiN0Yy1jcmVhdGVwYWdlLWV2ZW50c3RhcnRcIiByZWFkb25seS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBjb2wtbWQtNlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInRjLWNyZWF0ZXBhZ2UtZXZlbnRlbmRcIiBjbGFzcz1cImNvbC1mb3JtLWxhYmVsXCI+57uT5p2f5pel5pyfPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBjbGFzcz1cImZvcm0tY29udHJvbCBldmVudGVuZFwiIGlkPSd0Yy1jcmVhdGVwYWdlLWV2ZW50ZW5kJyByZWFkb25seS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBjb2wtbWQtNlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInRjLWNyZWF0ZXBhZ2UtZXZlbnRjb2xvclwiIGNsYXNzPVwiY29sLWZvcm0tbGFiZWxcIj7oibLlvak8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVwidGMtY3JlYXRlcGFnZS1ldmVudGNvbG9yXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZXZlbnRjb2xvclwiID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGNvbC1tZC02XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwidGMtY3JlYXRlcGFnZS1ldmVudHRhZ3NcIiBjbGFzcz1cImNvbC1mb3JtLWxhYmVsXCI+5qCH562+PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cInRjLWNyZWF0ZXBhZ2UtZXZlbnR0YWdzXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZXZlbnR0YWdzXCIgPiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2Zvcm0tZ3JvdXAgY29sLW1kLTEyJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJ0Yy1jcmVhdGVwYWdlLWV2ZW50cmVtYXJrXCI+5aSH5rOoPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cImZvcm0tY29udHJvbCBldmVudHJlbWFya1wiIGlkPVwidGMtY3JlYXRlcGFnZS1ldmVudHJlbWFya1wiIHJvd3M9XCIzXCI+PC90ZXh0YXJlYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0ncm93Jz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nY29sLXhzLTEyJyA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPSd0Yy1jcmVhdGVwYWdlLWNyZWF0ZScgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3NcIiB0eXBlPVwiYnV0dG9uXCI+5Yib5bu6PC9idXR0b24+ICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPSd0Yy1jcmVhdGVwYWdlLWNhbmNlbCcgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj7lj5bmtog8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xyXG5pbXBvcnQgJ2Jvb3RzdHJhcC9qcy9tb2RhbCc7XHJcbmltcG9ydCBGb3JtSGFuZGxlcyBmcm9tICcuLi9VdGlscy9Gb3JtSGFuZGxlcyc7XHJcbmltcG9ydCB7IGNyZWF0ZURhdGV0aW1lUGlja2VyIH0gZnJvbSAnLi4vV2lkZ2V0L0RhdGVUaW1lUGlja2VyJztcclxuaW1wb3J0IHsgY3JlYXRlQ29sb3JQaWNrZXIgfSBmcm9tICcuLi9XaWRnZXQvQ29sb3JQaWNrZXInO1xyXG5pbXBvcnQgRXZlbnRNb2RhbCBmcm9tICcuL0V2ZW50TW9kYWwnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRFZGl0TW9kYWwgZXh0ZW5kcyBFdmVudE1vZGFsIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhcmdzKSB7XHJcbiAgICAgICAgc3VwZXIoYXJncyk7XHJcbiAgICAgICAgLy9UT0RPOiDmg7Plip7ms5Xpgb/lhY3lhajlsYDlj5jph49cclxuICAgICAgICB3aW5kb3cuZ19lZGl0TW9kYWwgPSB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXJUZW1wbGF0ZSgpIHtcclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICBjb25zdCBldmVudCA9IHRoaXMuYXJncy5ldmVudDtcclxuICAgICAgICB0aGlzLnJlbmRlckZvcm1Db21wb25lbnQodGhpcy5tb2RhbCwgW1xyXG4gICAgICAgICAgICB7Ly/miYDmnInovpPlhaXmoYZcclxuICAgICAgICAgICAgICAgIG5vZGU6ICdpbnB1dCcsXHJcbiAgICAgICAgICAgICAgICBldmVudE5hbWU6ICdjaGFuZ2UnLFxyXG4gICAgICAgICAgICAgICAgaGFuZGxlOiAoKSA9PiB0aGF0Lm1vZGFsLmZpbmQoJyN0Yy1lZGl0cGFnZS1zYXZlJykuYXR0cignZGlzYWJsZWQnLCBmYWxzZSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgey8v5qCH6aKYXHJcbiAgICAgICAgICAgICAgICBub2RlOiAnI3RjLWVkaXRwYWdlLWV2ZW50dGl0bGUnLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IGV2ZW50LnRpdGxlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7Ly/lvIDlp4vml6XmnJ9cclxuICAgICAgICAgICAgICAgIG5vZGU6ICcjdGMtZWRpdHBhZ2UtZXZlbnRzdGFydCcsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogZXZlbnQuc3RhcnQuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyksXHJcbiAgICAgICAgICAgICAgICByZW5kZXJlcjogY3JlYXRlRGF0ZXRpbWVQaWNrZXIsXHJcbiAgICAgICAgICAgICAgICBldmVudE5hbWU6ICdkcC5jaGFuZ2UnLFxyXG4gICAgICAgICAgICAgICAgaGFuZGxlOiAoKSA9PiB0aGF0Lm1vZGFsLmZpbmQoJyN0Yy1lZGl0cGFnZS1zYXZlJykuYXR0cignZGlzYWJsZWQnLCBmYWxzZSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgey8v57uT5p2f5pel5pyfXHJcbiAgICAgICAgICAgICAgICBub2RlOiAnI3RjLWVkaXRwYWdlLWV2ZW50ZW5kJyxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBldmVudC5lbmQuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyksXHJcbiAgICAgICAgICAgICAgICByZW5kZXJlcjogY3JlYXRlRGF0ZXRpbWVQaWNrZXIsXHJcbiAgICAgICAgICAgICAgICBldmVudE5hbWU6ICdkcC5jaGFuZ2UnLFxyXG4gICAgICAgICAgICAgICAgaGFuZGxlOiAoKSA9PiB0aGF0Lm1vZGFsLmZpbmQoJyN0Yy1lZGl0cGFnZS1zYXZlJykuYXR0cignZGlzYWJsZWQnLCBmYWxzZSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgey8v6aKc6ImyXHJcbiAgICAgICAgICAgICAgICBub2RlOiAnI3RjLWVkaXRwYWdlLWV2ZW50Y29sb3InLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IGV2ZW50LmJhY2tncm91bmRDb2xvcixcclxuICAgICAgICAgICAgICAgIHJlbmRlcmVyOiAobm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICQobm9kZSkuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgZXZlbnQuYmFja2dyb3VuZENvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVDb2xvclBpY2tlcihub2RlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7Ly/kv53lrZjmjInpkq5cclxuICAgICAgICAgICAgICAgIG5vZGU6ICcjdGMtZWRpdHBhZ2Utc2F2ZScsXHJcbiAgICAgICAgICAgICAgICByZW5kZXJlcjogKG5vZGUpID0+ICQobm9kZSkuYXR0cignZGlzYWJsZWQnLCB0cnVlKSxcclxuICAgICAgICAgICAgICAgIGV2ZW50TmFtZTogJ2NsaWNrJyxcclxuICAgICAgICAgICAgICAgIGhhbmRsZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBGb3JtSGFuZGxlcygpLm9uU2F2ZUJ0bkNsaWNrKGV2ZW50LCB0aGF0Lm1vZGFsKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmhpZGUoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG5cdFx0XHR7Ly8g5a6M5oiQ5oyJ6ZKuXHJcblx0XHRcdFx0bm9kZTogJyN0Yy1lZGl0cGFnZS1maW5pc2gnLFxyXG5cdFx0XHRcdGV2ZW50TmFtZTogJ2NsaWNrJyxcclxuXHRcdFx0XHRoYW5kbGU6ICgpID0+IHtcclxuXHRcdFx0XHRcdGZvcm1IYW5kbGVzLm9uQ29tcGxldGVCdG5DbGljayhldmVudCk7XHJcblx0XHRcdFx0XHR0aGF0LmhpZGUoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcbiAgICAgICAgICAgIHsvL+WIoOmZpOaMiemSrlxyXG4gICAgICAgICAgICAgICAgbm9kZTogJyN0Yy1lZGl0cGFnZS1kZWxldGUnLFxyXG4gICAgICAgICAgICAgICAgZXZlbnROYW1lOiAnY2xpY2snLFxyXG4gICAgICAgICAgICAgICAgaGFuZGxlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IEZvcm1IYW5kbGVzKCkub25EZWxldGVEYXRhQnRuQ2xpY2soZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7Ly/liKDpmaTmupDmlofmoaNcclxuICAgICAgICAgICAgICAgIG5vZGU6ICcjdGMtZWRpdHBhZ2UtZGVsZXRlRXZlbnREb2MnLFxyXG4gICAgICAgICAgICAgICAgZXZlbnROYW1lOiAnY2xpY2snLFxyXG4gICAgICAgICAgICAgICAgaGFuZGxlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IEZvcm1IYW5kbGVzKCkub25EZWxldGVEb2NCdG5DbGljayhldmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5oaWRlKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF0pXHJcbiAgICB9O1xyXG5cclxuICAgIGdldCBIdG1sVGVtcGxhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsIGZhZGVcIiB0YWJpbmRleD1cIi0xXCIgcm9sZT1cImRpYWxvZ1wiIGlkPSd0Yy1FdmVudEVkaXRNb2RhbCc+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZGlhbG9nIG1vZGFsLWRpYWxvZy1jZW50ZXJlZFwiIHJvbGU9XCJkb2N1bWVudFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+PHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj48L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3M9XCJtb2RhbC10aXRsZVwiPuaXpeeoi+e8lui+kTwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+IFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGZvcm0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nZm9ybS1ncm91cCBjb2wtbWQtMTInPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInRjLWVkaXRwYWdlLWV2ZW50dGl0bGVcIj7moIfpopg8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZXZlbnR0aXRsZVwiIGlkPVwidGMtZWRpdHBhZ2UtZXZlbnR0aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgY29sLW1kLTZcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJ0Yy1lZGl0cGFnZS1ldmVudHN0YXJ0XCIgY2xhc3M9XCJjb2wtZm9ybS1sYWJlbFwiPuW8gOWni+aXpeacnzwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbCBkYXRldGltZXBpY2tlci1pbnB1dCBldmVudHN0YXJ0XCIgaWQ9XCJ0Yy1lZGl0cGFnZS1ldmVudHN0YXJ0XCIgZGF0YS10b2dnbGU9XCJkYXRldGltZXBpY2tlclwiIGRhdGEtdGFyZ2V0PVwiI3RjLWVkaXRwYWdlLWV2ZW50c3RhcnRcIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBjb2wtbWQtNlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInRjLWVkaXRwYWdlLWV2ZW50ZW5kXCIgY2xhc3M9XCJjb2wtZm9ybS1sYWJlbFwiPue7k+adn+aXpeacnzwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZXZlbnRlbmRcIiBpZD0ndGMtZWRpdHBhZ2UtZXZlbnRlbmQnIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBjb2wtbWQtNlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInRjLWVkaXRwYWdlLWV2ZW50Y29sb3JcIiBjbGFzcz1cImNvbC1mb3JtLWxhYmVsXCI+6Imy5b2pPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cInRjLWVkaXRwYWdlLWV2ZW50Y29sb3JcIiBjbGFzcz1cImZvcm0tY29udHJvbCBldmVudGNvbG9yXCIgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgY29sLW1kLTZcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJ0Yy1lZGl0cGFnZS1ldmVudHRhZ3NcIiBjbGFzcz1cImNvbC1mb3JtLWxhYmVsXCI+5qCH562+PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cInRjLWVkaXRwYWdlLWV2ZW50dGFnc1wiIGNsYXNzPVwiZm9ybS1jb250cm9sIGV2ZW50dGFnc1wiID4gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdmb3JtLWdyb3VwIGNvbC1tZC0xMic+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwidGMtZWRpdHBhZ2UtZXZlbnRyZW1hcmtcIj7lpIfms6g8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwiZm9ybS1jb250cm9sIGV2ZW50cmVtYXJrXCIgaWQ9XCJ0Yy1lZGl0cGFnZS1ldmVudHJlbWFya1wiIHJvd3M9XCIzXCI+PC90ZXh0YXJlYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0ncm93JyBzdHlsZT0ndGV4dC1hbGlnbjogbGVmdDsnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdjb2wtbWQtNic+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJ0Yy1lZGl0cGFnZS1idXR0b25ncm91cFwiIGNsYXNzPVwiYnRuLWdyb3VwXCIgcm9sZT1cImdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPSd0Yy1lZGl0cGFnZS1zYXZlJyBjbGFzcz1cImJ0biBidG4tZGFuZ2VyXCIgdHlwZT1cImJ1dHRvblwiIGRpc2FibGVkPuS/neWtmDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD0ndGMtZWRpdHBhZ2UtZmluaXNoJyBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIHR5cGU9XCJidXR0b25cIj7lrozmiJA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9J3RjLWVkaXRwYWdlLWRlbGV0ZScgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiB0eXBlPVwiYnV0dG9uXCI+5Yig6ZmkPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPSd0Yy1lZGl0cGFnZS1kZWxldGVFdmVudERvYycgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiB0eXBlPVwiYnV0dG9uXCI+5Yig6Zmk5rqQ5paH5qGjPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nY29sLW1kLTIgY29sLW1kLW9mZnNldC00JyBzdHlsZT0ndGV4dC1hbGlnbjogcmlnaHQ7Jz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPuWPlua2iDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgXHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcclxuaW1wb3J0ICdib290c3RyYXAvanMvbW9kYWwnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRNb2RhbCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYXJncykge1xyXG4gICAgICAgIHRoaXMuYXJncyA9IGFyZ3M7XHJcbiAgICAgICAgY29uc3QgaHRtbCA9IHRoaXMuSHRtbFRlbXBsYXRlO1xyXG4gICAgICAgIHRoaXMubW9kYWwgPSAkKGh0bWwpLm1vZGFsKHtcclxuICAgICAgICAgICAgc2hvdzogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnJlbmRlclRlbXBsYXRlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHVwZGF0ZShhcmdzKSB7XHJcbiAgICAgICAgdGhpcy5hcmdzID0gYXJncztcclxuICAgICAgICB0aGlzLnJlbmRlclRlbXBsYXRlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHNob3coKSB7XHJcbiAgICAgICAgdGhpcy5tb2RhbC5tb2RhbCgnc2hvdycpO1xyXG4gICAgfTtcclxuXHJcbiAgICBoaWRlKCkge1xyXG4gICAgICAgIHRoaXMubW9kYWwubW9kYWwoJ2hpZGUnKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlhpnlhaVIVE1M5qih5p2/LlxyXG4gICAgICovXHJcbiAgICBnZXQgSHRtbFRlbXBsYXRlKCkge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbCBmYWRlXCIgdGFiaW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWRpYWxvZ1wiIHJvbGU9XCJkb2N1bWVudFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj48c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cIm1vZGFsLXRpdGxlXCI+TW9kYWwgdGl0bGU8L2g0PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPk9uZSBmaW5lIGJvZHkmaGVsbGlwOzwvcD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DbG9zZTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCI+U2F2ZSBjaGFuZ2VzPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PjwhLS0gLy5tb2RhbC1jb250ZW50IC0tPlxyXG4gICAgICAgICAgICA8L2Rpdj48IS0tIC8ubW9kYWwtZGlhbG9nIC0tPlxyXG4gICAgICAgICAgICA8L2Rpdj48IS0tIC8ubW9kYWwgLS0+XHJcbiAgICAgICAgYFxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOeUseWtkOexu+WumuS5iea4suafk+S7u+WKoS5cclxuICAgICAqL1xyXG4gICAgcmVuZGVyVGVtcGxhdGUoKSB7IH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuLLmn5PmqKHmgIHmoYbooajljZXnu4Tku7YuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xIVE1MRWxlbWVudH0gbW9kYWxOb2RlIC0g6KGo5Y2V5oiW5YyF5ZCr6KGo5Y2V55qE5Z2X5YWD57SgfENTU+mAieaLqeWZqC5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0W119IHRhc2tzIC0g5Lu75Yqh5YiX6KGoLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRhc2tzW10ubm9kZSAtIENTU+mAieaLqeWZqC5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0YXNrc1tdLnZhbHVlIC0g6ZyA6KaB5aGr5YWl55qE5YC8LlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gdGFza3NbXS5yZW5kZXJlciAtIOe7hOS7tua4suafk+WZqC5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0YXNrc1tdLmV2ZW50TmFtZSAtIOS6i+S7tuWQjeensC5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHRhc2tzW10uaGFuZGxlIC0g5Y+l5p+ELlxyXG4gICAgICovXHJcbiAgICByZW5kZXJGb3JtQ29tcG9uZW50KG1vZGFsTm9kZSwgdGFza3MpIHtcclxuICAgICAgICBmb3IgKGxldCB0YXNrIG9mIHRhc2tzKSB7XHJcbiAgICAgICAgICAgIGxldCAkY29tcHMgPSAkKG1vZGFsTm9kZSkuZ2V0KDApID09ICQodGFzay5ub2RlKS5nZXQoMCkgPyAkKHRhc2subm9kZSkgOiAkKG1vZGFsTm9kZSkuZmluZCh0YXNrLm5vZGUpO1xyXG4gICAgICAgICAgICAvLyDmuLLmn5Pnu4Tku7ZcclxuICAgICAgICAgICAgaWYgKCB0YXNrLnZhbHVlICkgJGNvbXBzLnZhbCh0YXNrLnZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKCB0eXBlb2YgdGFzay5yZW5kZXJlciA9PSAnZnVuY3Rpb24nICkgdGFzay5yZW5kZXJlcigkY29tcHMpO1xyXG4gICAgICAgICAgICAvLyDnu5Hlrprlj6Xmn4RcclxuICAgICAgICAgICAgaWYgKCB0YXNrLmhhbmRsZSAmJiB0eXBlb2YgdGFzay5oYW5kbGUgPT0gJ2Z1bmN0aW9uJyAmJiB0YXNrLmV2ZW50TmFtZSApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaEV2ZW50SGFuZGxlKCRjb21wcywgdGFzay5ldmVudE5hbWUsIHRhc2suaGFuZGxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliLfmlrDkuovku7blj6Xmn4QuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xIVE1MRWxlbWVudH0gbm9kZSAtIOWFg+e0oOaIlkNTU+mAieaLqeWZqC5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBqc0V2ZW50TmFtZSAtIOimgeWIt+aWsOeahOS6i+S7tuWQjeensC5cclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGhhbmRsZSAtIOimgee7keWumueahOWPpeafhFxyXG4gICAgICovXHJcbiAgICByZWZyZXNoRXZlbnRIYW5kbGUobm9kZSwganNFdmVudE5hbWUsIGhhbmRsZSkge1xyXG4gICAgICAgIC8vIOWIqeeUqGpRdWVyeeacrOi6q+eahOexu+aVsOe7hOeJueaAp+WunueOsOWkmuS4que7keWumu+8m1xyXG4gICAgICAgICQobm9kZSkub2ZmKGpzRXZlbnROYW1lKS5vbihqc0V2ZW50TmFtZSwgaGFuZGxlKTtcclxuICAgICAgICByZXR1cm4gJChub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmHjee9ruihqOWNlS5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfEhUTUxFbGVtZW50fSBmb3JtIC0g6KGo5Y2V5oiW5YyF5ZCr6KGo5Y2V55qE5Z2X5YWD57SgfENTU+mAieaLqeWZqC5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBleGNsdWRlcyAtIOeUqENTU+mAieaLqeWZqOS7o+ihqOmcgOimgeaOkumZpOeahOWFg+e0oC5cclxuICAgICAqL1xyXG4gICAgcmVzZXRGb3JtSW5wdXQoZm9ybSwgZXhjbHVkZXMpIHtcclxuICAgICAgICAkKGZvcm0pLmZpbmQoJ2lucHV0Jykubm90KGV4Y2x1ZGVzKS5lYWNoKGZ1bmN0aW9uKGluZGV4LGVsZW1lbnQpe1xyXG4gICAgICAgICAgICAkKGVsZW1lbnQpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsICcnKTtcclxuICAgICAgICAgICAgJChlbGVtZW50KS52YWwoJycpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xyXG5pbXBvcnQgV2l6RXZlbnREYXRhTG9hZGVyIGZyb20gJy4uL1dpekV2ZW50RGF0YUxvYWRlcic7XHJcbmltcG9ydCBDYWxlbmRhckV2ZW50IGZyb20gJy4uL0NhbGVuZGFyRXZlbnQnO1xyXG5pbXBvcnQgeyBXaXpDb25maXJtIH0gZnJvbSAnLi4vV2l6SW50ZXJmYWNlJztcclxuXHJcbmNvbnN0IGdfY2FsID0gJCgnI2NhbGVuZGFyJyk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtSGFuZGxlcyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIG9uQ3JlYXRlQnRuQ2xpY2soc3RhcnQsIGVuZCwganNFdmVudCwgdmlldywgZm9ybU5vZGUpIHtcclxuICAgICAgICBjb25zdCB0aXRsZSA9ICQoZm9ybU5vZGUpLmZpbmQoJyN0Yy1jcmVhdGVwYWdlLWV2ZW50dGl0bGUnKS52YWwoKTtcclxuICAgICAgICBjb25zdCBjb2xvciA9ICQoZm9ybU5vZGUpLmZpbmQoJyN0Yy1jcmVhdGVwYWdlLWV2ZW50Y29sb3InKS52YWwoKTtcclxuICAgICAgICBuZXcgV2l6RXZlbnREYXRhTG9hZGVyKCkuY3JlYXRlRXZlbnQoe3N0YXJ0LCBlbmQsIGpzRXZlbnQsIHZpZXd9LCB7dGl0bGUsIGNvbG9yfSk7IC8vIOi/meS4gOatpeiAl+aXtlxyXG4gICAgICAgICQoZm9ybU5vZGUpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgJCgnI2NhbGVuZGFyJykuZnVsbENhbGVuZGFyKCd1bnNlbGVjdCcpO1xyXG4gICAgfTtcclxuXHJcbiAgICBvblNhdmVCdG5DbGljayhldmVudCwgZm9ybU5vZGUpIHtcclxuICAgICAgICAvL1RPRE86IOWujOaIkOW8gOWni+S4jue7k+adn+aXtumXtOWPmOabtFxyXG4gICAgICAgIC8vVE9ETzog6YCa6L+H5ZyoZm9ybU5vZGXmkJzntKIuZXZlbnR0aXRsZSwuZXZlbnRjb2xvcuetiWNsYXNz5p2l6I635Y+W5Y+Y6YePXHJcbiAgICAgICAgaWYgKCFnX2NhbCkgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGZpbmQgRnVsbENhbGVuZGFyIFdpZGdldC4nKTtcclxuICAgICAgICAvLyDkv53lrZjmlbDmja5cclxuICAgICAgICBjb25zdCBuZXdFdmVudCA9IG5ldyBDYWxlbmRhckV2ZW50KGV2ZW50LmlkKTtcclxuICAgICAgICBuZXdFdmVudC50aXRsZSA9IGZvcm1Ob2RlLmZpbmQoJy5ldmVudHRpdGxlJykudmFsKCk7XHJcbiAgICAgICAgbmV3RXZlbnQuYmFja2dyb3VuZENvbG9yID0gZm9ybU5vZGUuZmluZCgnLmV2ZW50Y29sb3InKS52YWwoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhuZXdFdmVudClcclxuICAgICAgICAvLyDkv53lrZjliLDmlbDmja7mlofmoaNcclxuICAgICAgICBuZXdFdmVudC5zYXZlVG9XaXpFdmVudERvYygpO1xyXG4gICAgICAgIG5ld0V2ZW50LnJlZnJlc2hFdmVudChldmVudClcclxuICAgIH07XHJcblxyXG4gICAgb25Db21wbGV0ZUJ0bkNsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCFnX2NhbCkgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGZpbmQgRnVsbENhbGVuZGFyIFdpZGdldC4nKTtcclxuICAgICAgICAvLyDkv67mlLnmlbDmja5cclxuICAgICAgICBjb25zdCBpc0NvbXBsZXRlID0gcGFyc2VJbnQoZXZlbnQuY29tcGxldGUpID09IDU7XHJcbiAgICAgICAgaWYgKCBpc0NvbXBsZXRlICkge1xyXG4gICAgICAgICAgICBldmVudC5jb21wbGV0ZSA9ICcwJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBldmVudC5jb21wbGV0ZSA9ICc1JztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5L+d5a2Y5pWw5o2uXHJcbiAgICAgICAgY29uc3QgbmV3RXZlbnQgPSBuZXcgQ2FsZW5kYXJFdmVudChldmVudCk7XHJcbiAgICAgICAgbmV3RXZlbnQuc2F2ZVRvV2l6RXZlbnREb2MoKTtcclxuICAgICAgICAvLyDph43mlrDmuLLmn5NcclxuICAgICAgICBnX2NhbC5mdWxsQ2FsZW5kYXIoICd1cGRhdGVFdmVudCcsIGV2ZW50ICk7XHJcbiAgICB9O1xyXG5cclxuICAgIG9uRGVsZXRlRGF0YUJ0bkNsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCFnX2NhbCkgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGZpbmQgRnVsbENhbGVuZGFyIFdpZGdldC4nKTtcclxuICAgICAgICBpZiAoIFdpekNvbmZpcm0oXCLnoa7lrpropoHliKDpmaTor6Xml6XnqIvvvJ9cIiwgJ+eVquiMhOWKqeeQhicpICkge1xyXG4gICAgICAgICAgICAvLyDliKDpmaTml6XnqItcclxuICAgICAgICAgICAgbGV0IG5ld0V2ZW50ID0gbmV3IENhbGVuZGFyRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgICAgICBuZXdFdmVudC5kZWxldGVFdmVudERhdGEoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgb25EZWxldGVEb2NCdG5DbGljayhldmVudCkge1xyXG4gICAgICAgIGlmICghZ19jYWwpIHRocm93IG5ldyBFcnJvcignQ2FuIG5vdCBmaW5kIEZ1bGxDYWxlbmRhciBXaWRnZXQuJyk7XHJcbiAgICAgICAgaWYgKCBXaXpDb25maXJtKFwi56Gu5a6a6KaB5Yig6Zmk6K+l5pel56iL5rqQ5paH5qGj77yfXFxu44CM56Gu5a6a44CN5bCG5Lya5a+86Ie055u45YWz56yU6K6w6KKr5Yig6Zmk77yBXCIsICfnlarojITliqnnkIYnKSApIHtcclxuICAgICAgICAgICAgbGV0IG5ld0V2ZW50ID0gbmV3IENhbGVuZGFyRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgICAgICBuZXdFdmVudC5kZWxldGVFdmVudERhdGEodHJ1ZSk7XHJcbiAgICAgICAgfVx0XHJcbiAgICB9O1xyXG5cclxufSIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XHJcblxyXG5leHBvcnQge1xyXG5cdHJlc2V0Rm9ybUlucHV0LFxyXG5cdHJlbmRlckZvcm1Db21wb25lbnQsXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDliLfmlrDkuovku7blj6Xmn4QuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfEhUTUxFbGVtZW50fSBub2RlIC0g5YWD57Sg5oiWQ1NT6YCJ5oup5ZmoLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30ganNFdmVudE5hbWUgLSDopoHliLfmlrDnmoTkuovku7blkI3np7AuXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGhhbmRsZSAtIOimgee7keWumueahOWPpeafhFxyXG4gKi9cclxuZnVuY3Rpb24gcmVmcmVzaEV2ZW50SGFuZGxlKG5vZGUsIGpzRXZlbnROYW1lLCBoYW5kbGUpIHtcclxuXHQvLyDliKnnlKhqUXVlcnnmnKzouqvnmoTnsbvmlbDnu4TnibnmgKflrp7njrDlpJrkuKrnu5HlrprvvJtcclxuXHQkKG5vZGUpLm9mZihqc0V2ZW50TmFtZSkub24oanNFdmVudE5hbWUsIGhhbmRsZSk7XHJcblx0cmV0dXJuICQobm9kZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDph43nva7ooajljZUuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfEhUTUxFbGVtZW50fSBmb3JtIC0g6KGo5Y2V5oiW5YyF5ZCr6KGo5Y2V55qE5Z2X5YWD57SgfENTU+mAieaLqeWZqC5cclxuICogQHBhcmFtIHtzdHJpbmd9IGV4Y2x1ZGVzIC0g55SoQ1NT6YCJ5oup5Zmo5Luj6KGo6ZyA6KaB5o6S6Zmk55qE5YWD57SgLlxyXG4gKi9cclxuZnVuY3Rpb24gcmVzZXRGb3JtSW5wdXQoZm9ybSwgZXhjbHVkZXMpIHtcclxuXHQkKGZvcm0pLmZpbmQoJ2lucHV0Jykubm90KGV4Y2x1ZGVzKS5lYWNoKGZ1bmN0aW9uKGluZGV4LGVsZW1lbnQpe1xyXG5cdFx0JChlbGVtZW50KS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAnJyk7XHJcblx0XHQkKGVsZW1lbnQpLnZhbCgnJyk7XHJcblx0fSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOa4suafk+aooeaAgeahhuihqOWNlee7hOS7ti5cclxuICogQHBhcmFtIHtzdHJpbmd8SFRNTEVsZW1lbnR9IG1vZGFsTm9kZSAtIOihqOWNleaIluWMheWQq+ihqOWNleeahOWdl+WFg+e0oHxDU1PpgInmi6nlmaguXHJcbiAqIEBwYXJhbSB7T2JqZWN0W119IHRhc2tzIC0g5Lu75Yqh5YiX6KGoLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFza3NbXS5ub2RlIC0gQ1NT6YCJ5oup5ZmoLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFza3NbXS52YWx1ZSAtIOmcgOimgeWhq+WFpeeahOWAvC5cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gdGFza3NbXS5yZW5kZXJlciAtIOe7hOS7tua4suafk+WZqC5cclxuICogQHBhcmFtIHtzdHJpbmd9IHRhc2tzW10uZXZlbnROYW1lIC0g5LqL5Lu25ZCN56ewLlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0YXNrc1tdLmhhbmRsZSAtIOWPpeafhC5cclxuICovXHJcbmZ1bmN0aW9uIHJlbmRlckZvcm1Db21wb25lbnQobW9kYWxOb2RlLCB0YXNrcykge1xyXG5cdGZvciAobGV0IHRhc2sgb2YgdGFza3MpIHtcclxuXHRcdGxldCAkY29tcHMgPSAkKG1vZGFsTm9kZSkuZ2V0KDApID09ICQodGFzay5ub2RlKS5nZXQoMCkgPyAkKHRhc2subm9kZSkgOiAkKG1vZGFsTm9kZSkuZmluZCh0YXNrLm5vZGUpO1xyXG5cdFx0Ly8g5riy5p+T57uE5Lu2XHJcblx0XHRpZiAoIHRhc2sudmFsdWUgKSAkY29tcHMudmFsKHRhc2sudmFsdWUpO1xyXG5cdFx0aWYgKCB0eXBlb2YgdGFzay5yZW5kZXJlciA9PSAnZnVuY3Rpb24nICkgdGFzay5yZW5kZXJlcigkY29tcHMpO1xyXG5cdFx0Ly8g57uR5a6a5Y+l5p+EXHJcblx0XHRpZiAoIHRhc2suaGFuZGxlICYmIHR5cGVvZiB0YXNrLmhhbmRsZSA9PSAnZnVuY3Rpb24nICYmIHRhc2suZXZlbnROYW1lICkgcmVmcmVzaEV2ZW50SGFuZGxlKCRjb21wcywgdGFzay5ldmVudE5hbWUsIHRhc2suaGFuZGxlKTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDnu5HlrprmqKHmgIHmoYbmjInpkq7lj6Xmn4QsIOmAmui/hyByZWZyZXNoRXZlbnRIYW5kbGVyXHJcbiAqIEBwYXJhbSB7c3RyaW5nfEhUTUxFbGVtZW50fSBtb2RhbE5vZGUgLSDooajljZXmiJbljIXlkKvooajljZXnmoTlnZflhYPntKB8Q1NT6YCJ5oup5ZmoLlxyXG4gKiBAcGFyYW0ge09iamVjdFtdfSB0YXNrcyAtIOS7u+WKoeWIl+ihqC5cclxuICogQHBhcmFtIHtzdHJpbmd9IHRhc2tzW10ubm9kZSAtIENTU+mAieaLqeWZqC5cclxuICogQHBhcmFtIHtzdHJpbmd9IHRhc2tzW10uZXZlbnROYW1lIC0g5LqL5Lu25ZCN56ewLlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0YXNrc1tdLmhhbmRsZSAtIOWPpeafhC5cclxuICovXHJcbmZ1bmN0aW9uIGJpbmRNb2RhbEhhbmRsZShtb2RhbE5vZGUsIHRhc2tzKSB7XHJcblx0Ly9UT0RPOiDmmK/lkKblj6/ku6XlsIZiaW5kTW9kYWxIYW5kbGXkuI5yZW5kZXJNb2RhbEZvcm3lkIjkuozkuLrkuIDvvJ9cclxuXHRmb3IgKGxldCB0YXNrIG9mIHRhc2tzKSB7XHJcblx0XHQvLyDliKTmlq3mmK/lkKbnu5Hlrpptb2RhbE5vZGXnmoTlj6Xmn4RcclxuXHRcdGxldCAkY29tcHMgPSAkKG1vZGFsTm9kZSkuZ2V0KDApID09ICQodGFzay5ub2RlKS5nZXQoMCkgPyAkKHRhc2subm9kZSkgOiAkKG1vZGFsTm9kZSkuZmluZCh0YXNrLm5vZGUpO1xyXG5cdFx0aWYgKCB0eXBlb2YgdGFzay5oYW5kbGUgPT0gJ2Z1bmN0aW9uJyApIHJlZnJlc2hFdmVudEhhbmRsZSgkY29tcHMsIHRhc2suZXZlbnROYW1lLCB0YXNrLmhhbmRsZSk7XHJcblx0fVxyXG59IiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcclxuaW1wb3J0ICdqcXVlcnktdWkvdWkvd2lkZ2V0JztcclxuLyogTlBNIOeJiOacrCBIdWViZWUg5rqQ5Luj56CB5LitIHBvaW50ZXJkb3duIOS6i+S7tuWcqCBDaHJvbWUgNTUg5Lul5ZCO5omN5a6e546wXHJcbiAqIFdpem5vdGUg5Y+q6IO95L2/55So6Leo5rWP6KeI5Zmo5YW85a6554mI77yM5omA5Lul5a+85YWl5omT5YyF54mIICovXHJcbmNvbnN0IEh1ZWJlZSA9IHJlcXVpcmUoJ2h1ZWJlZS9kaXN0L2h1ZWJlZS5wa2dkJyk7IFxyXG5pbXBvcnQgJ2h1ZWJlZS9kaXN0L2h1ZWJlZS5jc3MnO1xyXG5cclxuZXhwb3J0IHsgY3JlYXRlQ29sb3JQaWNrZXIgfTtcclxuXHJcbiQud2lkZ2V0KFwidGMuQ29sb3JQaWNrZXJcIiwge1xyXG5cdG9wdGlvbnM6IHtcclxuXHRcdHN0YXRpY09wZW46IGZhbHNlLCAvLyBEaXNwbGF5cyBvcGVuIGFuZCBzdGF5cyBvcGVuLiBcclxuXHRcdHNldFRleHQ6IHRydWUsIC8vIFNldHMgZWxlbWVudHPigJkgdGV4dCB0byBjb2xvci4g5bCG5Y6f5aeL55qE5paH5pys6K6+572u6K6+572u5oiQ6aKc6Imy5YC8LlxyXG5cdFx0c2V0QkdDb2xvcjogdHJ1ZSwgLy8gU2V0cyBlbGVtZW50c+KAmSBiYWNrZ3JvdW5kIGNvbG9yIHRvIGNvbG9yLlxyXG5cdFx0aHVlczogMTIsIC8vIE51bWJlciBvZiBodWVzIG9mIHRoZSBjb2xvciBncmlkLiBIdWVzIGFyZSBzbGljZXMgb2YgdGhlIGNvbG9yIHdoZWVsLlxyXG5cdFx0aHVlMDogMCwgLy8gVGhlIGZpcnN0IGh1ZSBvZiB0aGUgY29sb3IgZ3JpZC4gXHJcblx0XHRzaGFkZXM6IDUsIC8vIE51bWJlciBvZiBzaGFkZXMgb2YgY29sb3JzIGFuZCBzaGFkZXMgb2YgZ3JheSBiZXR3ZWVuIHdoaXRlIGFuZCBibGFjay4gXHJcblx0XHRzYXR1cmF0aW9uczogMywgLy8gTnVtYmVyIG9mIHNldHMgb2Ygc2F0dXJhdGlvbiBvZiB0aGUgY29sb3IgZ3JpZC5cclxuXHRcdGN1c3RvbUNvbG9yczogbnVsbCwgLy8gQ3VzdG9tIGNvbG9ycyBhZGRlZCB0byB0aGUgdG9wIG9mIHRoZSBncmlkLiBcclxuXHRcdG5vdGF0aW9uOiAnaGV4JywgLy8gVGV4dCBzeW50YXggb2YgY29sb3JzIHZhbHVlcy5cclxuXHRcdGNsYXNzTmFtZTogbnVsbCwgLy8gQ2xhc3MgYWRkZWQgdG8gSHVlYmVlIGVsZW1lbnQuIFVzZWZ1bCBmb3IgQ1NTLlxyXG5cdFx0b25jaGFuZ2U6IG51bGwsXHJcblx0fSxcclxuXHJcblx0X2NyZWF0ZTogZnVuY3Rpb24oKSB7XHJcblx0XHQvLyDliJvlu7rlrp7kvotcclxuXHRcdHRoaXMuaHVlYmVlSW5zdGFuY2UgPSBuZXcgSHVlYmVlKHRoaXMuZWxlbWVudC5nZXQoMCksIHRoaXMub3B0aW9ucyk7XHJcblx0XHQvLyDph43lhpnkuobor6Xmlrnms5XvvIzliKTmlq1pbnB1dOWGheWuueaYr+WQpuebuOWQjOW5tuinpuWPkSBjaGFuZ2Ug5LqL5Lu2XHJcblx0XHR0aGlzLmh1ZWJlZUluc3RhbmNlLnNldFRleHRzID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdGlmICggIXRoaXMuc2V0VGV4dEVsZW1zICkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHQgIGZvciAoIHZhciBpPTA7IGkgPCB0aGlzLnNldFRleHRFbGVtcy5sZW5ndGg7IGkrKyApIHtcclxuXHRcdFx0XHR2YXIgZWxlbSA9IHRoaXMuc2V0VGV4dEVsZW1zW2ldO1xyXG5cdFx0XHRcdHZhciBwcm9wZXJ0eSA9IGVsZW0ubm9kZU5hbWUgPT0gJ0lOUFVUJyA/ICd2YWx1ZScgOiAndGV4dENvbnRlbnQnO1xyXG5cdFx0XHRcdC8vIOinpuWPkWNoYW5nZeS6i+S7tlxyXG5cdFx0XHRcdGlmICggZWxlbS52YWx1ZSAhPSB0aGlzLmNvbG9yICkge1xyXG5cdFx0XHRcdFx0ZWxlbVsgcHJvcGVydHkgXSA9IHRoaXMuY29sb3I7XHJcblx0XHRcdFx0XHRlbGVtLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjaGFuZ2UnKSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdFx0dGhpcy5odWViZWVJbnN0YW5jZS5vbiggJ2NoYW5nZScsIHRoaXMub3B0aW9ucy5vbmNoYW5nZSk7XHJcblx0XHRcclxuXHR9XHJcbn0pXHJcblxyXG5cclxuLyoqXHJcbiAqIOWIm+W7uuminOiJsuaLvuWPluWZqC5cclxuICogQHBhcmFtIHtzdHJpbmd8SFRNTEVsZW1lbnR9IG5vZGUgLSDlhYPntKDmiJZDU1PpgInmi6nlmaguXHJcbiAqL1xyXG5mdW5jdGlvbiBjcmVhdGVDb2xvclBpY2tlcihub2RlKSB7XHJcblx0Ly9UT0RPOiDor7vlj5ZDb25maWdcclxuXHQkKG5vZGUpLkNvbG9yUGlja2VyKHtcclxuXHRcdHNhdHVyYXRpb25zOiAyLFxyXG5cdFx0c2hhZGVzOiA1LFxyXG5cdFx0Y3VzdG9tQ29sb3JzOiBbICcjMzJDRDMyJywgJyM1NDg0RUQnLCAnI0E0QkRGRScsIFxyXG5cdFx0JyM0NkQ2REInLCAnIzdBRTdCRicsICcjNTFCNzQ5JyxcclxuXHRcdCcjRkJENzVCJywgJyNGRkI4NzgnLCAnI0ZGODg3QycsIFxyXG5cdFx0JyNEQzIxMjcnLCAnI0RCQURGRicsICcjRTFFMUUxJ1x0XSxcclxuXHRcdFwic3RhdGljT3BlblwiOiBmYWxzZVxyXG5cdH0pO1xyXG5cclxuXHRyZXR1cm4gJChub2RlKTtcclxufSIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XHJcbmltcG9ydCAnbW9tZW50JztcclxuaW1wb3J0ICdib290c3RyYXAvanMvY29sbGFwc2UnO1xyXG5pbXBvcnQgJ2Jvb3RzdHJhcC9qcy90cmFuc2l0aW9uJztcclxuaW1wb3J0ICdib290c3RyYXAvZGlzdC9jc3MvYm9vdHN0cmFwLmNzcyc7XHJcbmltcG9ydCAnYm9vdHN0cmFwL2Rpc3QvY3NzL2Jvb3RzdHJhcC10aGVtZS5jc3MnO1xyXG5pbXBvcnQgJ2VvbmFzZGFuLWJvb3RzdHJhcC1kYXRldGltZXBpY2tlcic7XHJcbmltcG9ydCAnZW9uYXNkYW4tYm9vdHN0cmFwLWRhdGV0aW1lcGlja2VyL2J1aWxkL2Nzcy9ib290c3RyYXAtZGF0ZXRpbWVwaWNrZXIuY3NzJztcclxuXHJcbi8qKlxyXG4gKiDliJvlu7rml6XmnJ/ml7bpl7TpgInmi6nlmaguXHJcbiAqIEBwYXJhbSB7c3RyaW5nfEhUTUxFbGVtZW50fSBub2RlIC0g5YWD57Sg5oiWQ1NT6YCJ5oup5ZmoLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURhdGV0aW1lUGlja2VyKG5vZGUpIHtcclxuXHQvL1RPT0Q6IOivu+WPlkNvbmZpZ1xyXG5cdCQobm9kZSkuZGF0ZXRpbWVwaWNrZXIoe1xyXG5cdFx0Zm9ybWF0OiAnWVlZWS1NTS1ERCBISDptbTpzcydcclxuXHR9KTtcclxuXHJcblx0cmV0dXJuICQobm9kZSk7XHJcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9FdmVudFBvcG92ZXIuY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL0V2ZW50UG9wb3Zlci5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL0V2ZW50UG9wb3Zlci5jc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xyXG5pbXBvcnQgJ2pxdWVyeS11aS91aS93aWRnZXQnO1xyXG5pbXBvcnQgJ2Jvb3RzdHJhcC9kaXN0L2Nzcy9ib290c3RyYXAuY3NzJztcclxuaW1wb3J0ICdib290c3RyYXAvZGlzdC9jc3MvYm9vdHN0cmFwLXRoZW1lLmNzcyc7XHJcbmltcG9ydCAnYm9vdHN0cmFwL2pzL2Ryb3Bkb3duJztcclxuaW1wb3J0ICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtZnJlZS9qcy9hbGwnO1xyXG5pbXBvcnQgUG9wcGVyIGZyb20gJ3BvcHBlci5qcyc7XHJcbmltcG9ydCAnLi9FdmVudFBvcG92ZXIuY3NzJztcclxuaW1wb3J0IHsgcmVuZGVyRm9ybUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL1V0aWxzL0Zvcm1VdGlscyc7XHJcbmltcG9ydCBGb3JtSGFuZGxlcyBmcm9tICcuLi8uLi9VdGlscy9Gb3JtSGFuZGxlcyc7XHJcbmltcG9ydCB7IGNyZWF0ZUNvbG9yUGlja2VyIH0gZnJvbSAnLi4vQ29sb3JQaWNrZXInO1xyXG5pbXBvcnQgRXZlbnRFZGl0TW9kYWwgZnJvbSAnLi4vLi4vTW9kYWwvRXZlbnRFZGl0TW9kYWwnXHJcblxyXG5leHBvcnQgeyByZW5kZXJFZGl0UG9wcGVyIH07XHJcblxyXG4kLndpZGdldChcInRjLkV2ZW50UG9wb3ZlclwiLCB7XHJcblx0b3B0aW9uczoge1xyXG5cdFx0dGl0bGU6ICdObyB0aXRsZSAhJywgLy9TdHJpbmdcclxuXHRcdHRlbXBsYXRlOlxyXG5cdFx0YFxyXG5cdFx0PGRpdiBjbGFzcz1cInRjLXBvcG92ZXJcIiByb2xlPVwidG9vbHRpcFwiPlxyXG5cdFx0XHQ8ZGl2IGNsYXNzPVwiYXJyb3dcIj48L2Rpdj5cclxuXHRcdFx0PGRpdiBjbGFzcz1cInRjLXBvcG92ZXItaGVhZGVyXCI+XHJcblx0XHRcdFx0PGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJ0Yy1lZGl0cG9wcGVyLWV2ZW50dGl0bGVcIiAgZm9ybT0ndGMtcG9wb3Zlci1ldmVudC1lZGl0Rm9ybScgY2xhc3M9J2V2ZW50dGl0bGUnPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PGRpdiBjbGFzcz1cInRjLXBvcG92ZXItYm9keVwiPlxyXG5cdFx0XHRcdDxmb3JtIGlkID0gJ3RjLXBvcG92ZXItZXZlbnQtZWRpdEZvcm0nIGNsYXNzPSdmb3JtLWhvcml6b250YWwnPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cclxuXHRcdFx0XHRcdFx0PGxhYmVsIGZvcj1cInRjLWVkaXRwb3BwZXItZXZlbnRkYXRlXCIgY2xhc3M9XCJjb2wtc20tMiBjb2wtZm9ybS1sYWJlbFwiPjxpIGNsYXNzPSdmYXIgZmEtY2FsZW5kYXItYWx0IGZhLWxnJz48L2k+PC9sYWJlbD5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImNvbC1zbS0xMFwiPlxyXG5cdFx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwidGV4dFwiIHJlYWRvbmx5IGNsYXNzPVwiZm9ybS1jb250cm9sIGV2ZW50ZGF0ZVwiIGlkPVwidGMtZWRpdHBvcHBlci1ldmVudGRhdGVcIj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcblx0XHRcdFx0XHRcdDxsYWJlbCBmb3I9XCJ0Yy1lZGl0cG9wcGVyLWV2ZW50Y29sb3JcIiBjbGFzcz1cImNvbC1zbS0yIGNvbC1mb3JtLWxhYmVsXCI+PGkgY2xhc3M9XCJmYXMgZmEtcGFpbnQtYnJ1c2hcIj48L2k+PC9sYWJlbD5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImNvbC1zbS0xMFwiPlxyXG5cdFx0XHRcdFx0XHRcdDxpbnB1dCBpZD1cInRjLWVkaXRwb3BwZXItZXZlbnRjb2xvclwiIGNsYXNzPVwiZm9ybS1jb250cm9sIGV2ZW50Y29sb3JcIiA+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9mb3JtPlxyXG5cdFx0XHRcdDxkaXYgaWQ9XCJ0Yy1lZGl0cG9wcGVyLWJ1dHRvbmdyb3VwXCIgY2xhc3M9XCJidG4tZ3JvdXBcIiByb2xlPVwiZ3JvdXBcIj5cclxuXHRcdFx0XHRcdDxidXR0b24gaWQ9J3RjLWVkaXRwb3BwZXItc2F2ZScgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiB0eXBlPVwiYnV0dG9uXCI+5L+d5a2YPC9idXR0b24+XHJcblx0XHRcdFx0XHQ8YnV0dG9uIGlkPSd0Yy1lZGl0cG9wcGVyLWZpbmlzaCcgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiB0eXBlPVwiYnV0dG9uXCI+5a6M5oiQPC9idXR0b24+XHJcblx0XHRcdFx0XHQ8YnV0dG9uIGlkPSd0Yy1lZGl0cG9wcGVyLWVkaXQnIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgdHlwZT1cImJ1dHRvblwiPue8lui+kTwvYnV0dG9uPlxyXG5cdFx0XHRcdFx0PGJ1dHRvbiBpZD0ndGMtZWRpdHBvcHBlci1kZWxldGUnIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgdHlwZT1cImJ1dHRvblwiPuWIoOmZpDwvYnV0dG9uPlxyXG5cdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgZHJvcGRvd24tdG9nZ2xlXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCI+XHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiY2FyZXRcIj48L3NwYW4+XHJcblx0XHRcdFx0XHQ8L2J1dHRvbj5cclxuXHRcdFx0XHRcdDx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnUgZHJvcGRvd24tbWVudS1yaWdodFwiPlxyXG5cdFx0XHRcdFx0XHQ8bGk+XHJcblx0XHRcdFx0XHRcdFx0PGEgaWQ9J3RjLWVkaXRwb3BwZXItZGVsZXRlRXZlbnREb2MnIGhyZWY9J2phdmFzY3JpcHQ6dm9pZCgwKTsnPuWIoOmZpOa6kOaWh+ahozwvYT5cclxuXHRcdFx0XHRcdFx0PC9saT5cclxuXHRcdFx0XHRcdDwvdWw+XHJcblx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdDwvZGl2PlxyXG5cdFx0YCxcclxuXHRcdHBsYWNlbWVudDogJ3JpZ2h0JyxcclxuXHRcdG9mZnNldDogJzEwcHgnLFxyXG5cdFx0YXV0b1Nob3c6IHRydWUsXHJcblx0XHRyZWZlcmVuY2U6IG51bGwsIC8vIOeUqOaIt+i+k+WFpeaXtuWPr+S7peaXtmpRdWVyeeaIluiAhUhUTUxFbGVtZW50XHJcblx0fSxcclxuXHRcclxuXHRfY3JlYXRlOiBmdW5jdGlvbigpIHtcclxuXHRcdGxldCB0aGF0ID0gdGhpcztcclxuXHRcdGxldCBvcHRzID0gdGhpcy5vcHRpb25zO1xyXG5cdFx0XHJcblx0XHQvLyDmo4DmtYvmmK/lkKbmj5DkvptyZWZlcmVuY2XvvIzmsqHmnInliJnorr7nva7kuLogdGhpcy5lbGVtZW5077yM57uf5LiA5qC85byP5YyW5Li6alF1ZXJ55a+56LGh77ybXHJcblx0XHRvcHRzLnJlZmVyZW5jZSA9IG9wdHMucmVmZXJlbmNlID8gJChvcHRzLnJlZmVyZW5jZSkgOiB0aGlzLmVsZW1lbnQ7XHJcblxyXG5cdFx0Ly8g5YeG5aSH5qih5p2/77yM5pyJ6YeN5aSN6LCD55So55qEYnVnXHJcblx0XHR0aGlzLiRwb3BwZXJOb2RlID0gdGhpcy5fcHJvY2Vzc1RlbXBsYXRlKG9wdHMudGVtcGxhdGUpO1xyXG5cclxuXHRcdC8vIOWIm+W7ulBvcHBlcuWunuS+iyjlrprkvY3lvJXmk44pXHJcblx0XHR0aGlzLnBvcHBlckluc3RhbmNlID0gbmV3IFBvcHBlcihvcHRzLnJlZmVyZW5jZS5nZXQoMCksIHRoaXMuJHBvcHBlck5vZGUuZ2V0KDApLCB7XHJcblx0XHRcdHBsYWNlbWVudDogb3B0cy5wbGFjZW1lbnQsXHJcblx0XHRcdG1vZGlmaWVyczoge1xyXG5cdFx0XHRcdGFycm93OiB7XHJcblx0XHRcdFx0ICBlbGVtZW50OiAnLmFycm93J1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIOiuvue9ruiHquWKqOmakOiXj1xyXG5cdFx0dGhpcy5fc2V0QXV0b0hpZGUoKTtcclxuXHJcblx0XHQvL+agueaNruiuvue9ruaYr+WQpuiHquWKqOaYvuekulxyXG5cdFx0aWYgKCBvcHRzLmF1dG9TaG93ID09IHRydWUgKSB0aGlzLnNob3coKTtcclxuXHJcblx0fSxcclxuXHJcblx0X3Byb2Nlc3NUZW1wbGF0ZTogZnVuY3Rpb24odGVtcGxhdGUpIHtcclxuXHRcdGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cdFx0Y29uc3Qgb3B0cyA9IHRoaXMub3B0aW9ucztcclxuXHRcdGNvbnN0IGV2ZW50ID0gb3B0cy5hcmdzLmV2ZW50O1xyXG5cdFx0Y29uc3QgJHBvcHBlciA9ICQodGVtcGxhdGUpO1xyXG5cdFx0Y29uc3QgZm9ybUhhbmRsZXMgPSBuZXcgRm9ybUhhbmRsZXMoKTtcclxuXHJcblx0XHRyZW5kZXJGb3JtQ29tcG9uZW50KCRwb3BwZXIsIFtcclxuXHRcdFx0ey8vIOagh+mimFxyXG5cdFx0XHRcdG5vZGU6ICcjdGMtZWRpdHBvcHBlci1ldmVudHRpdGxlJyxcclxuXHRcdFx0XHR2YWx1ZTogZXZlbnQudGl0bGUsXHJcblx0XHRcdFx0ZXZlbnROYW1lOiAnY2hhbmdlJyxcclxuXHRcdFx0XHRoYW5kbGU6ICgpID0+ICRwb3BwZXIuZmluZCgnI3RjLWVkaXRwb3BwZXItc2F2ZScpLmF0dHIoJ2Rpc2FibGVkJywgZmFsc2UpXHJcblx0XHRcdH0sXHJcblx0XHRcdHsvLyDml6XmnJ9cclxuXHRcdFx0XHRub2RlOiAnI3RjLWVkaXRwb3BwZXItZXZlbnRkYXRlJyxcclxuXHRcdFx0XHR2YWx1ZTogZXZlbnQuc3RhcnQuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJylcclxuXHRcdFx0fSxcclxuXHRcdFx0ey8vIOminOiJslxyXG5cdFx0XHRcdG5vZGU6ICcjdGMtZWRpdHBvcHBlci1ldmVudGNvbG9yJyxcclxuXHRcdFx0XHR2YWx1ZTogZXZlbnQuYmFja2dyb3VuZENvbG9yLFxyXG5cdFx0XHRcdHJlbmRlcmVyOiAobm9kZSkgPT4ge1xyXG5cdFx0XHRcdFx0JChub2RlKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBldmVudC5iYWNrZ3JvdW5kQ29sb3IpO1xyXG5cdFx0XHRcdFx0Y3JlYXRlQ29sb3JQaWNrZXIobm9kZSk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRldmVudE5hbWU6ICdjaGFuZ2UnLFxyXG5cdFx0XHRcdGhhbmRsZTogKCkgPT4gJHBvcHBlci5maW5kKCcjdGMtZWRpdHBvcHBlci1zYXZlJykuYXR0cignZGlzYWJsZWQnLCBmYWxzZSlcclxuXHRcdFx0fSxcclxuXHRcdFx0ey8vIOS/neWtmOaMiemSrlxyXG5cdFx0XHRcdG5vZGU6ICcjdGMtZWRpdHBvcHBlci1zYXZlJyxcclxuXHRcdFx0XHRyZW5kZXJlcjogKG5vZGUpID0+ICQobm9kZSkuYXR0cihcImRpc2FibGVkXCIsIHRydWUpLFxyXG5cdFx0XHRcdGV2ZW50TmFtZTogJ2NsaWNrJyxcclxuXHRcdFx0XHRoYW5kbGU6ICgpID0+IHtcclxuXHRcdFx0XHRcdGZvcm1IYW5kbGVzLm9uU2F2ZUJ0bkNsaWNrKGV2ZW50LCAkcG9wcGVyKTtcclxuXHRcdFx0XHRcdHRoYXQuaGlkZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0ey8vIOWujOaIkOaMiemSrlxyXG5cdFx0XHRcdG5vZGU6ICcjdGMtZWRpdHBvcHBlci1maW5pc2gnLFxyXG5cdFx0XHRcdHJlbmRlcmVyOiAobm9kZSkgPT4gJChub2RlKS50ZXh0KFxyXG5cdFx0XHRcdFx0cGFyc2VJbnQoZXZlbnQuY29tcGxldGUpID09IDUgPyAn5oGi5aSNJyA6ICflrozmiJAnXHJcblx0XHRcdFx0KSxcclxuXHRcdFx0XHRldmVudE5hbWU6ICdjbGljaycsXHJcblx0XHRcdFx0aGFuZGxlOiAoKSA9PiB7XHJcblx0XHRcdFx0XHRmb3JtSGFuZGxlcy5vbkNvbXBsZXRlQnRuQ2xpY2soZXZlbnQpO1xyXG5cdFx0XHRcdFx0dGhhdC5oaWRlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7Ly8g57yW6L6R5oyJ6ZKuXHJcblx0XHRcdFx0bm9kZTogJyN0Yy1lZGl0cG9wcGVyLWVkaXQnLFxyXG5cdFx0XHRcdGV2ZW50TmFtZTogJ2NsaWNrJyxcclxuXHRcdFx0XHRoYW5kbGU6ICgpID0+IHtcclxuXHRcdFx0XHRcdC8vVE9ETzog5oOz5Yqe5rOV5LiN6KaB55So5YWo5bGA5Y+Y6YePXHJcblx0XHRcdFx0XHRpZiAoICF3aW5kb3cuZ19lZGl0TW9kYWwgKSBuZXcgRXZlbnRFZGl0TW9kYWwoe2V2ZW50fSk7XHJcblx0XHRcdFx0XHRnX2VkaXRNb2RhbC51cGRhdGUoe2V2ZW50fSk7XHJcblx0XHRcdFx0XHRnX2VkaXRNb2RhbC5zaG93KCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7Ly8g5Yig6Zmk5pel56iL5pWw5o2u5oyJ6ZKuXHJcblx0XHRcdFx0bm9kZTogJyN0Yy1lZGl0cG9wcGVyLWRlbGV0ZScsXHJcblx0XHRcdFx0ZXZlbnROYW1lOiAnY2xpY2snLFxyXG5cdFx0XHRcdGhhbmRsZTogKCkgPT4ge1xyXG5cdFx0XHRcdFx0Zm9ybUhhbmRsZXMub25EZWxldGVEYXRhQnRuQ2xpY2soZXZlbnQpO1xyXG5cdFx0XHRcdFx0dGhhdC5oaWRlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7Ly8g5Yig6Zmk5rqQ5paH5qGj5oyJ6ZKuXHJcblx0XHRcdFx0bm9kZTogJyN0Yy1lZGl0cG9wcGVyLWRlbGV0ZUV2ZW50RG9jJyxcclxuXHRcdFx0XHRldmVudE5hbWU6ICdjbGljaycsXHJcblx0XHRcdFx0aGFuZGxlOiAoKSA9PiB7XHJcblx0XHRcdFx0XHRmb3JtSGFuZGxlcy5vbkRlbGV0ZURvY0J0bkNsaWNrKGV2ZW50KTtcclxuXHRcdFx0XHRcdHRoYXQuaGlkZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XSlcclxuXHJcblx0XHRyZXR1cm4gJHBvcHBlcjsgLy8galF1ZXJ5XHJcblx0fSxcclxuXHJcblx0X3NldEF1dG9IaWRlKCkge1xyXG5cdFx0bGV0IG9wdHMgPSB0aGlzLm9wdGlvbnM7XHJcblx0XHRsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG5cdFx0Ly8g5YWI5Y+W5raI5bey5pyJ6Ieq5Yqo6ZqQ6JeP5LqL5Lu277yM5pa55byP5Y+N5aSN5re75Yqg5Y+l5p+EXHJcblx0XHR0aGlzLl9vZmYodGhpcy5kb2N1bWVudCwgJ2NsaWNrJyk7XHJcblxyXG5cdFx0Ly8g54K55Ye756m655m95aSE6Ieq5Yqo6ZqQ6JePXHJcblx0XHR0aGlzLl9vbih0aGlzLmRvY3VtZW50LCB7XHJcblx0XHRcdGNsaWNrOiBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0aWYgKFxyXG5cdFx0XHRcdFx0Ly8g5LiN5piv5pel5Y6G5LqL5Lu25YWD57SgXHJcblx0XHRcdFx0XHQhJChvcHRzLnJlZmVyZW5jZSkuaXMoZS50YXJnZXQpICYmXHJcblx0XHRcdFx0XHQvLyDkuZ/kuI3mmK/lrZDlhYPntKBcclxuXHRcdFx0XHRcdCQob3B0cy5yZWZlcmVuY2UpLmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwICYmXHJcblx0XHRcdFx0XHQvLyDkuI3mmK9wb3BwZXLlhYPntKBcclxuXHRcdFx0XHRcdCAhdGhhdC4kcG9wcGVyTm9kZS5pcyhlLnRhcmdldCkgJiZcclxuXHRcdFx0XHRcdC8vIOS5n+S4jeaYr+WtkOWFg+e0oFxyXG5cdFx0XHRcdFx0dGhhdC4kcG9wcGVyTm9kZS5oYXMoZS50YXJnZXQpLmxlbmd0aCA9PT0gMFxyXG5cdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0dGhhdC5oaWRlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH0sXHJcblxyXG5cdHVwZGF0ZTogZnVuY3Rpb24oKSB7XHJcblx0XHQvLyDmoLnmja5PcHRpb25z5pu05pawcG9wcGVySW5zdGFuY2Xku6Xlj4okcG9wcGVyTm9kZVxyXG5cdFx0bGV0IG9wdHMgPSB0aGlzLm9wdGlvbnM7XHJcblx0XHQvLyDorr7nva7oh6rliqjpmpDol49cclxuXHRcdHRoaXMuX3NldEF1dG9IaWRlKCk7XHJcblx0XHQvLyDmm7TmlrAgJHBvcHBlck5vZGVcclxuXHRcdHRoaXMuJHBvcHBlck5vZGUgPSB0aGlzLl9wcm9jZXNzVGVtcGxhdGUodGhpcy4kcG9wcGVyTm9kZSk7IC8vIOS8oOWFpeeahOaYr+W8leeUqFxyXG5cdFx0Ly8g5pu05pawIHBvcHBlckluc3RhbmNlXHJcblx0XHR0aGlzLnBvcHBlckluc3RhbmNlLnBvcHBlciA9IHRoaXMuJHBvcHBlck5vZGUuZ2V0KDApO1xyXG5cdFx0dGhpcy5wb3BwZXJJbnN0YW5jZS5yZWZlcmVuY2UgPSBvcHRzLnJlZmVyZW5jZSA/ICQob3B0cy5yZWZlcmVuY2UpLmdldCgwKSA6IHRoaXMuZWxlbWVudC5nZXQoMCk7XHJcblx0XHR0aGlzLnBvcHBlckluc3RhbmNlLnVwZGF0ZSgpO1xyXG5cdH0sXHJcblxyXG5cdHNob3c6IGZ1bmN0aW9uKCkge1xyXG5cdFx0bGV0IG9wdHMgPSB0aGlzLm9wdGlvbnM7XHJcblx0XHQvLyDlpoLmnpzmsqHmnInmt7vliqDliLBET03moJHliJnmt7vliqBcclxuXHRcdGlmKCAhJCh0aGlzLiRwb3BwZXJOb2RlKS5wYXJlbnQoKS5pcygnYm9keScpICkgJCh0aGlzLiRwb3BwZXJOb2RlKS5hcHBlbmRUbygnYm9keScpO1xyXG5cdFx0Ly8g5pi+56S6JHBvcHBlck5vZGVcclxuXHRcdHRoaXMuX3Nob3codGhpcy4kcG9wcGVyTm9kZSk7XHJcblxyXG5cdH0sXHJcblxyXG5cdGhpZGU6IGZ1bmN0aW9uKCkge1xyXG5cdFx0Ly9UT0RPOiDpmpDol49Qb3BvdmVyXHJcblx0XHR0aGlzLl9oaWRlKHRoaXMuJHBvcHBlck5vZGUpXHJcblx0fSxcclxuXHJcblx0ZGVzdHJveTogZnVuY3Rpb24oKSB7XHJcblx0XHR0aGlzLnBvcHBlckluc3RhbmNlLmRlc3Ryb3koKTtcclxuXHRcdCQodGhpcy4kcG9wcGVyTm9kZSkucmVtb3ZlKCk7XHJcblx0XHR0aGlzLiRwb3BwZXJOb2RlID0gbnVsbDtcclxuXHR9XHJcbn0pXHJcblxyXG4vKipcclxuICog5riy5p+T5LqL5Lu25bCP5by556qXLlxyXG4gKiBAcGFyYW0ge29iamVjdH0gYXJncyDljIXlkKtGdWxsQ2FsZW5kYXLkvKDlhaXnmoTlj4LmlbAuXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBhcmdzLmV2ZW50IEZ1bGxDYWxlbmRhcuS6i+S7ti5cclxuICogQHBhcmFtIHtvYmplY3R9IGFyZ3MuanNFdmVudCBuYXRpdmUgSmF2YVNjcmlwdCDkuovku7YuXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBhcmdzLnZpZXcgRnVsbENhbGVuZGFyIOinhuWbvi5cclxuICogQHBhcmFtIHtvYmplY3R9IGVsZW1lbnQgaXMgYSBqUXVlcnkgZWxlbWVudCBmb3IgdGhlIGNvbnRhaW5lciBvZiB0aGUgbmV3IHZpZXcuXHJcbiAqIEByZXR1cm4ge09iamVjdFtdfSDov5Tlm57nlKjkuo5GdWxsQ2FsZW5kYXLmuLLmn5PnmoTkuovku7bmlbDnu4QuXHJcbiAqL1xyXG5mdW5jdGlvbiByZW5kZXJFZGl0UG9wcGVyKGFyZ3MsIHJlZmVyZW5jZSkge1xyXG5cdC8vIOa4suafk+W8ueeql1xyXG5cdGNvbnN0IGVkaXRQb3BwZXIgPSAkKCAnPGRpdj48L2Rpdj4nICkuRXZlbnRQb3BvdmVyKHtcclxuXHRcdGFyZ3M6IGFyZ3MsXHJcblx0XHRwbGFjZW1lbnQ6ICdhdXRvJyxcclxuXHRcdHJlZmVyZW5jZTogcmVmZXJlbmNlLFxyXG5cdH0pO1xyXG5cclxuXHRyZXR1cm4gZWRpdFBvcHBlcjtcclxufSIsImltcG9ydCB7IFdpekRhdGFiYXNlIGFzIG9iakRhdGFiYXNlIH0gZnJvbSAnLi9XaXpJbnRlcmZhY2UnO1xyXG5pbXBvcnQgQ2FsZW5kYXJFdmVudCBmcm9tICcuL0NhbGVuZGFyRXZlbnQnO1xyXG5cclxuLyog5pWw5o2u6I635Y+WXHJcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuLyoqIOivpeexu+S4jldpem5vdGXnmoRXaXpEYXRhYmFzZeaOpeWPo+S6pOaNouS/oeaBr++8jOiOt+WPluaVsOaNriAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXaXpFdmVudERhdGFMb2FkZXIge1xyXG5cdC8qKlxyXG4gICAgICog5Yib6YCg5LiA5Liq5LqL5Lu25pWw5o2u5Yqg6L295ZmoLlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBzdGFydCDmn6Xor6Lotbflp4vml6XmnJ/vvIxJU0/moIflh4bml6XmnJ/lrZfnrKbkuLIuXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGVuZCDmn6Xor6LmiKroh7Pml6XmnJ/vvIxJU0/moIflh4bml6XmnJ/lrZfnrKbkuLIuXHJcbiAgICAgKi9cclxuXHRjb25zdHJ1Y3RvcihzdGFydCwgZW5kKSB7XHJcblx0XHRpZiAoIW9iakRhdGFiYXNlKSB0aHJvdyBuZXcgRXJyb3IoJ1dpekRhdGFiYXNlIG5vdCB2YWxpZCAhJyk7XHJcblx0XHR0aGlzLkRhdGFiYXNlID0gb2JqRGF0YWJhc2U7XHJcblx0XHR0aGlzLnVzZXJOYW1lID0gb2JqRGF0YWJhc2UuVXNlck5hbWU7XHJcblx0XHR0aGlzLnN0YXJ0ID0gc3RhcnQ7XHJcblx0XHR0aGlzLmVuZCA9IGVuZDtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuICAgICAqIOiOt+W+l+a4suafk+WQjueahOaJgOaciUZ1bGxDYWxlbmRhcuS6i+S7ti5cclxuXHQgKiBAcGFyYW0ge29iamVjdH0gdmlldyBpcyB0aGUgVmlldyBPYmplY3Qgb2YgRnVsbENhbGVuZGFyIGZvciB0aGUgbmV3IHZpZXcuXHJcblx0ICogQHBhcmFtIHtvYmplY3R9IGVsZW1lbnQgaXMgYSBqUXVlcnkgZWxlbWVudCBmb3IgdGhlIGNvbnRhaW5lciBvZiB0aGUgbmV3IHZpZXcuXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3RbXX0g6L+U5Zue55So5LqORnVsbENhbGVuZGFyIOa4suafk+eahCBldmVudFNvdXJjZXMg5pWw57uELlxyXG4gICAgICovXHJcblx0Z2V0RXZlbnRTb3VyY2VzKCB2aWV3LCBlbGVtZW50ICl7XHJcblx0XHRjb25zdCB2aWV3U3RhcnQgPSB2aWV3LnN0YXJ0LmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0Y29uc3Qgdmlld0VuZCA9IHZpZXcuZW5kLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0bGV0IGV2ZW50U291cmNlcyA9IFtdO1xyXG5cdFx0Ly/ojrflj5bmma7pgJrml6XnqItcclxuXHRcdGNvbnN0IGdlbmVyYWxFdmVudFNvdXJjZSA9IHtcclxuXHRcdFx0dHlwZTogJ2dlbmVyYWxFdmVudHMnLFxyXG5cdFx0XHQvL2V2ZW50czogdGhpcy5fZ2V0QWxsT3JpZ2luYWxFdmVudChbXSwgdGhpcy5fZDJzKGN1cnJlbnRWaWV3LnN0YXJ0LnRvRGF0ZSgpKSwgdGhpcy5fZDJzKGN1cnJlbnRWaWV3LmVuZC50b0RhdGUoKSkpXHJcblx0XHRcdGV2ZW50czogdGhpcy5fZ2V0QWxsT3JpZ2luYWxFdmVudCh2aWV3U3RhcnQsIHZpZXdFbmQpXHJcblx0XHR9XHJcblx0XHRldmVudFNvdXJjZXMucHVzaChnZW5lcmFsRXZlbnRTb3VyY2UpO1xyXG5cdFx0XHJcblx0XHQvL1RPRE86IOiOt+WPlumHjeWkjeaXpeeoi1xyXG5cdFx0Y29uc3QgcmVwZWF0RXZlbnRTb3VyY2VzID0gdGhpcy5fZ2V0QWxsUmVwZWF0RXZlbnQodmlld1N0YXJ0LCB2aWV3RW5kKTtcclxuXHRcdGV2ZW50U291cmNlcyA9IGV2ZW50U291cmNlcy5jb25jYXQocmVwZWF0RXZlbnRTb3VyY2VzKTtcclxuXHRcdC8vXHJcblx0XHRyZXR1cm4gZXZlbnRTb3VyY2VzO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG4gICAgICog5LuOV2l6RGF0YWJhc2XkuK3ojrflj5bmiYDmnInmlbDmja7mlofmoaMuXHJcblx0ICogQHBhcmFtIHthcnJheX0gZXZlbnRzIOWIneWni+S6i+S7tuaVsOe7hC5cclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gc3RhcnQgSVNP5qCH5YeG5pel5pyf5a2X56ym5LiyLlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBlbmQgSVNP5qCH5YeG5pel5pyf5a2X56ym5LiyLlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0W119IOi/lOWbnueUqOS6jkZ1bGxDYWxlbmRhcua4suafk+eahOS6i+S7tuaVsOe7hC5cclxuICAgICAqL1xyXG5cdF9nZXRBbGxPcmlnaW5hbEV2ZW50KHN0YXJ0LCBlbmQpe1xyXG5cdFx0Y29uc3QgZXZlbnRzID0gW107XHJcblx0XHRsZXQgc3FsID0gYERPQ1VNRU5UX0xPQ0FUSU9OIG5vdCBsaWtlICcvRGVsZXRlZCBJdGVtcy8lJyBhbmQgKEtCX0dVSUQgaXMgbnVsbCBvciBLQl9HVUlEID0gJycpYDtcclxuXHRcdGxldCBhbmQxID0gYCBhbmQgRE9DVU1FTlRfR1VJRCBpbiAoc2VsZWN0IERPQ1VNRU5UX0dVSUQgZnJvbSBXSVpfRE9DVU1FTlRfUEFSQU0gd2hlcmUgUEFSQU1fTkFNRSA9ICdDQUxFTkRBUl9TVEFSVCcgIGFuZCAgUEFSQU1fVkFMVUUgPD0gJyR7ZW5kfScgKWA7XHJcblx0XHRsZXQgYW5kMiA9IGAgYW5kIERPQ1VNRU5UX0dVSUQgaW4gKHNlbGVjdCBET0NVTUVOVF9HVUlEIGZyb20gV0laX0RPQ1VNRU5UX1BBUkFNIHdoZXJlIFBBUkFNX05BTUUgPSAnQ0FMRU5EQVJfRU5EJyAgYW5kICBQQVJBTV9WQUxVRSA+PSAnJHtzdGFydH0nIClgO1xyXG5cdFx0aWYgKHN0YXJ0KSBzcWwgKz0gYW5kMjtcclxuXHRcdGlmIChlbmQpIHNxbCArPSBhbmQxO1xyXG5cdFx0aWYgKG9iakRhdGFiYXNlLkRvY3VtZW50c0RhdGFGcm9tU1FMKSB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0Y29uc3QgZGF0YSA9IG9iakRhdGFiYXNlLkRvY3VtZW50c0RhdGFGcm9tU1FMKHNxbCk7XHJcblx0XHRcdFx0Y29uc3Qgb2JqID0gSlNPTi5wYXJzZShkYXRhKTtcclxuXHRcdFx0XHRpZiAoICFvYmogfHwgIUFycmF5LmlzQXJyYXkob2JqKSApIHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkgKyspIHtcclxuXHRcdFx0XHRcdGV2ZW50cy5wdXNoKFxyXG5cdFx0XHRcdFx0XHRuZXcgQ2FsZW5kYXJFdmVudChvYmpbaV0pLnRvRnVsbENhbGVuZGFyRXZlbnQoKVxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0cmV0dXJuIGV2ZW50cztcclxuXHRcdFx0fVxyXG5cdFx0XHRjYXRjaChlcnIpIHtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKGVycik7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdEb2N1bWVudHNEYXRhRnJvbVNRTCBtZXRob2Qgb2YgV2l6RGF0YWJhc2Ugbm90IGV4aXN0IScpO1xyXG5cdFx0XHQvKlxyXG5cdFx0XHRsZXQgZG9jQ29sbGV0aW9uID0gb2JqRGF0YWJhc2UuRG9jdW1lbnRzRnJvbVNRTChzcWwpO1xyXG5cdFx0XHQvL1xyXG5cdFx0XHRpZiAoZG9jQ29sbGV0aW9uICYmIGRvY0NvbGxldGlvbi5Db3VudCl7XHJcblx0XHRcdFx0bGV0IGRvYztcclxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGRvY0NvbGxldGlvbi5Db3VudDsgKysgaSl7XHJcblx0XHRcdFx0XHRkb2MgPSBkb2NDb2xsZXRpb24uSXRlbShpKTtcclxuXHRcdFx0XHRcdGxldCBldmVudE9iaiA9IF9ldmVudE9iamVjdChfbmV3UHNldWRvRG9jKGRvYykpO1xyXG5cdFx0XHRcdFx0aWYgKGV2ZW50T2JqKVxyXG5cdFx0XHRcdFx0XHRldmVudHMucHVzaChldmVudE9iaik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBldmVudHM7XHJcblx0XHRcdH1cclxuXHRcdFx0Ki9cdFx0XHJcblx0XHR9XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG4gICAgICog5LuOV2l6RGF0YWJhc2XkuK3ojrflj5bmiYDmnInlvqrnjq/ph43lpI3kuovku7YuXHJcblx0ICog5LuO5Yib5bu65LqL5Lu255qE5pel5pyf5byA5aeL5YiwRU5EUkVDVVJSRU5DRee7k+adn1xyXG4gICAgICogQHJldHVybiB7T2JqZWN0W119IOi/lOWbnueUqOS6jkZ1bGxDYWxlbmRhcua4suafk+eahCBldmVudFNvdXJjZSDmlbDnu4QuXHJcbiAgICAgKi9cclxuXHRfZ2V0QWxsUmVwZWF0RXZlbnQoc3RhcnQsIGVuZCl7XHJcblx0XHRjb25zdCByZXBlYXRFdmVudHMgPSBbXTtcclxuXHRcdGNvbnN0IHNxbCA9IFwiRE9DVU1FTlRfTE9DQVRJT04gbm90IGxpa2UgJy9EZWxldGVkIEl0ZW1zLyUnIGFuZCAoS0JfR1VJRCBpcyBudWxsIG9yIEtCX0dVSUQgPSAnJykgYW5kIFwiICsgXHJcblx0XHRcdFx0XHRcIkRPQ1VNRU5UX0dVSUQgaW4gKHNlbGVjdCBET0NVTUVOVF9HVUlEIGZyb20gV0laX0RPQ1VNRU5UX1BBUkFNIHdoZXJlIFBBUkFNX05BTUU9J0NBTEVOREFSX1JFQ1VSUkVOQ0UnKVwiO1xyXG5cclxuXHRcdGNvbnN0IGRhdGEgPSBvYmpEYXRhYmFzZS5Eb2N1bWVudHNEYXRhRnJvbVNRTChzcWwpO1xyXG5cdFx0aWYgKCAhZGF0YSApIHJldHVybiBmYWxzZTtcclxuXHRcdFxyXG5cdFx0Y29uc3Qgb2JqID0gSlNPTi5wYXJzZShkYXRhKTtcclxuXHRcdGlmICggIW9iaiB8fCAhQXJyYXkuaXNBcnJheShvYmopICkgcmV0dXJuIGZhbHNlO1xyXG5cdFx0XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkgKyspIHtcclxuXHRcdFx0cmVwZWF0RXZlbnRzLnB1c2goXHJcblx0XHRcdFx0bmV3IENhbGVuZGFyRXZlbnQob2JqW2ldKS5nZW5lcmF0ZVJlcGVhdEV2ZW50cyhzdGFydCwgZW5kKVxyXG5cdFx0XHQpXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVwZWF0RXZlbnRzO1xyXG5cdFx0XHJcblx0fTtcclxuXHJcblx0Ly8g5pel5Y6G5LqL5Lu25ouW5Yqo5ZCO5pu05paw5pWw5o2uXHJcblx0dXBkYXRlRXZlbnREYXRhT25Ecm9wKGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXcpe1xyXG5cdFx0Ly8gQ2FsbCBoYXNUaW1lIG9uIHRoZSBldmVudOKAmXMgc3RhcnQvZW5kIHRvIHNlZSBpZiBpdCBoYXMgYmVlbiBkcm9wcGVkIGluIGEgdGltZWQgb3IgYWxsLWRheSBhcmVhLlxyXG5cdFx0Y29uc3QgYWxsRGF5ID0gIWV2ZW50LnN0YXJ0Lmhhc1RpbWUoKTtcclxuXHRcdC8vIOiOt+WPluS6i+S7tuaWh+aho+aXtumXtOaVsOaNrlxyXG5cdFx0Y29uc3QgZG9jID0gb2JqRGF0YWJhc2UuRG9jdW1lbnRGcm9tR1VJRChldmVudC5pZCk7XHJcblx0XHQvLyDmm7TmlrDmlbDmja5cclxuXHRcdGlmICggYWxsRGF5ICkge1xyXG5cdFx0XHRjb25zdCBzdGFydFN0ciA9IGV2ZW50LnN0YXJ0LnNldCh7J2gnOiAwLCAnbSc6IDAsICdzJzogMH0pLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHRjb25zdCBlbmRTdHIgPSBldmVudC5lbmQuc2V0KHsnaCc6IDIzLCAnbSc6IDU5LCAncyc6IDU5fSkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX1NUQVJUXCIsIHN0YXJ0U3RyKTtcclxuXHRcdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfRU5EXCIsIGVuZFN0cik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb25zdCBzdGFydFN0ciA9IGV2ZW50LnN0YXJ0LmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHRjb25zdCBlbmRTdHIgPSBldmVudC5lbmQuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX1NUQVJUXCIsIHN0YXJ0U3RyKTtcclxuXHRcdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfRU5EXCIsIGVuZFN0cik7XHJcblx0XHR9XHJcblx0XHQvL1RPRE86IOabtOaWsENBTEVOREFSX1JFQ1VSUkVOQ0XmlbDmja5cclxuXHRcdC8vIFxyXG5cdFx0dGhpcy5fdXBkYXRlRG9jTW9kaWZ5RGF0ZShkb2MpO1xyXG5cdH07XHJcblxyXG5cdC8vIOiuvue9ruaWh+aho+WxnuaAp+WAvFxyXG5cdF9zZXRQYXJhbVZhbHVlKGRvYywga2V5LCB2YWx1ZSkge1xyXG5cdFx0aWYgKCFkb2MpIHJldHVybiBmYWxzZTtcclxuXHRcdGRvYy5TZXRQYXJhbVZhbHVlKGtleSwgdmFsdWUpO1xyXG5cdH07XHJcblxyXG5cdC8vIOabtOaWsFdpekRvY+S/ruaUueaXtumXtFxyXG5cdF91cGRhdGVEb2NNb2RpZnlEYXRlKGRvYyl7XHJcblx0XHRjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xyXG5cdFx0aWYgKCFkb2MpIHJldHVybiBmYWxzZTtcclxuXHRcdG5vdy5zZXRTZWNvbmRzKChub3cuZ2V0U2Vjb25kcygpICsgMSkgJSA2MCk7XHJcblx0XHRkb2MuRGF0ZU1vZGlmaWVkID0gdGhpcy5fZDJzKG5vdyk7XHJcblx0fTtcclxuXHJcblx0Ly8g5bCG5pel5pyf5a+56LGh6L2s5YyW5Li65a2X56ym5LiyXHJcblx0Ly9UT0RPOiDogIPomZHkvp3otZZtb21lbnTmnaXnroDljJbovazmjaLov4fnqItcclxuXHRfZDJzKGR0KXtcclxuXHRcdGNvbnN0IHJldCA9IGR0LmdldEZ1bGxZZWFyKCkgKyBcIi1cIiArIFxyXG5cdFx0XHRcdFx0Zm9ybWF0SW50VG9EYXRlU3RyaW5nKGR0LmdldE1vbnRoKCkgKyAxKSArIFwiLVwiICsgXHJcblx0XHRcdFx0XHRmb3JtYXRJbnRUb0RhdGVTdHJpbmcoZHQuZ2V0RGF0ZSgpKSArIFwiIFwiICsgXHJcblx0XHRcdFx0XHRmb3JtYXRJbnRUb0RhdGVTdHJpbmcoZHQuZ2V0SG91cnMoKSkrIFwiOlwiICsgXHJcblx0XHRcdFx0XHRmb3JtYXRJbnRUb0RhdGVTdHJpbmcoZHQuZ2V0TWludXRlcygpKSArIFwiOlwiICsgXHJcblx0XHRcdFx0XHRmb3JtYXRJbnRUb0RhdGVTdHJpbmcoZHQuZ2V0U2Vjb25kcygpKTtcclxuXHRcdHJldHVybiByZXQ7XHJcblx0fTtcclxuXHJcblx0Ly8g5pel5Y6G5pe26Ze06YeN572u5pe26Ze06IyD5Zu05ZCO5pu05paw5pWw5o2uXHJcblx0dXBkYXRlRXZlbnREYXRhT25SZXNpemUoZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldyl7XHJcblx0XHRjb25zdCBhbGxEYXkgPSBldmVudC5zdGFydC5oYXNUaW1lKCkgPyBmYWxzZSA6IHRydWU7XHJcblx0XHQvLyDojrflvpfkuovku7bmlofmoaPml7bpl7TmlbDmja5cclxuXHRcdGNvbnN0IGRvYyA9IG9iakRhdGFiYXNlLkRvY3VtZW50RnJvbUdVSUQoZXZlbnQuaWQpO1xyXG5cdFx0Ly8g6K6h566X5pu05pS55ZCO55qE57uT5p2f5pe26Ze0XHJcblx0XHRjb25zdCBldmVudEVuZFN0ciA9IGV2ZW50LmVuZC5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdC8vIOabtOaWsOaWh+aho+aVsOaNrlxyXG5cdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfRU5EXCIsIGV2ZW50RW5kU3RyKTtcclxuXHRcdHRoaXMuX3VwZGF0ZURvY01vZGlmeURhdGUoZG9jKTtcclxuXHR9O1xyXG5cclxuXHQvLyDliJvlu7rkuovku7Ygc3RhcnQsIGVuZCwganNFdmVudCwgdmlld1xyXG5cdC8qKlxyXG4gICAgICog5Yib5bu65LqL5Lu2LlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBzZWxlY3Rpb25EYXRhIEZ1bGxDYWxlbmRhciDkvKDlhaXnmoTmlbDmja4uXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IHNlbGVjdGlvbkRhdGEuc3RhcnQgTW9tZW50IOexu+aXpeacn+WvueixoS5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gc2VsZWN0aW9uRGF0YS5lbmQgTW9tZW50IOexu+aXpeacn+WvueixoS5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gc2VsZWN0aW9uRGF0YS5qc0V2ZW50IG5hdGl2ZSBKYXZhU2NyaXB0IOS6i+S7ti5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gc2VsZWN0aW9uRGF0YS52aWV3IEZ1bGxDYWxlbmRhciDop4blm77lr7nosaEuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IHVzZXJJbnB1dHMg55So5oi35Lyg5YWl55qE5YW25LuW5L+h5oGvLlxyXG4gICAgICogVE9ETzog6K+l5pa55rOV5Y+v5Lul5pS+572u5YiwQ2FsZW5kYXJFdmVudOeahOmdmeaAgeaWueazleS4ilxyXG4gICAgICovXHJcblx0Y3JlYXRlRXZlbnQoc2VsZWN0aW9uRGF0YSwgdXNlcklucHV0cyl7XHJcblx0XHR0cnkge1xyXG5cdFx0XHQvLyDojrflj5bnlKjmiLforr7nva5cclxuXHRcdFx0Y29uc3QgbmV3RXZlbnQgPSBuZXcgQ2FsZW5kYXJFdmVudCh7XHJcblx0XHRcdFx0dGl0bGU6IHVzZXJJbnB1dHMudGl0bGUgPyB1c2VySW5wdXRzLnRpdGxlIDogJ+aXoOagh+mimCcsXHJcblx0XHRcdFx0c3RhcnQ6IHNlbGVjdGlvbkRhdGEuc3RhcnQsXHJcblx0XHRcdFx0ZW5kOiBzZWxlY3Rpb25EYXRhLmVuZCxcclxuXHRcdFx0XHRhbGxEYXk6IHNlbGVjdGlvbkRhdGEuc3RhcnQuaGFzVGltZSgpICYmIHNlbGVjdGlvbkRhdGEuZW5kLmhhc1RpbWUoKSA/IGZhbHNlIDogdHJ1ZSxcclxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHVzZXJJbnB1dHMuY29sb3IgPyB1c2VySW5wdXRzLmNvbG9yIDogJyMzMkNEMzInLFxyXG5cdFx0XHR9KTtcclxuXHRcdFx0Ly8g5L+d5a2Y5bm25riy5p+T5LqL5Lu2XHJcblx0XHRcdG5ld0V2ZW50LnNhdmVUb1dpekV2ZW50RG9jKCk7XHJcblx0XHRcdG5ld0V2ZW50LnJlZmV0Y2hEYXRhKCk7XHJcblx0XHRcdG5ld0V2ZW50LmFkZFRvRnVsbENhbGVuZGFyKCk7XHJcblx0XHR9IGNhdGNoIChlKSB7Y29uc29sZS5sb2coZSl9XHJcblx0fVxyXG5cclxufVxyXG5cclxuXHJcbi8vIFRPRE86IOmHjeWGmeiOt+WPluaVsOaNrueahOaWueW8j1xyXG5mdW5jdGlvbiBfZ2V0V2l6RXZlbnQoc3RhcnQsIGVuZCkge1xyXG5cdC8vVE9ETzpcclxuXHRsZXQgZXZlbnRzID0gW107XHJcblx0bGV0IEV2ZW50Q29sbGVjdGlvbiA9IG9iakRhdGFiYXNlLkdldENhbGVuZGFyRXZlbnRzMihzdGFydCwgZW5kKTtcclxuXHRyZXR1cm4gZXZlbnRzXHJcbn1cclxuXHJcbi8vIOiOt+W+l+a4suafk+WQjueahOmHjeWkjeaXpeacn1xyXG5mdW5jdGlvbiBnZXRSZW5kZXJSZXBlYXREYXkoKXtcclxuXHR2YXIgZGF5QXJyYXkgPSBuZXcgQXJyYXkoKTtcclxuXHR2YXIgZXZlbnRTdGFydCA9IG5ldyBEYXRlKF9zMmQoZ19ldmVudFN0YXJ0KSk7XHJcblx0XHRcclxuXHRzd2l0Y2ggKGdfcmVwZWF0UnVsZSl7XHJcbiAgICAgICAgICAgIGNhc2UgXCJFdmVyeVdlZWsxXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJFdmVyeVdlZWsyXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJFdmVyeVdlZWszXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJFdmVyeVdlZWs0XCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJFdmVyeVdlZWs1XCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJFdmVyeVdlZWs2XCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJFdmVyeVdlZWs3XCI6XHJcblx0XHRcdFx0Z2V0V2Vla2x5UmVwZWF0RGF5KGRheUFycmF5LCBbZ19yZXBlYXRSdWxlLmNoYXJBdCg5KV0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJFdmVyeVdlZWtkYXlcIjpcclxuXHRcdFx0XHRnZXRXZWVrbHlSZXBlYXREYXkoZGF5QXJyYXksIFsxLCAyLCAzLCA0LCA1XSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2Vla2RheTEzNVwiOlxyXG5cdFx0XHRcdGdldFdlZWtseVJlcGVhdERheShkYXlBcnJheSwgWzEsIDMsIDVdKTtcclxuXHRcdFx0XHRicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2Vla2RheTI0XCI6XHJcblx0XHRcdFx0Z2V0V2Vla2x5UmVwZWF0RGF5KGRheUFycmF5LCBbMiwgNF0pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnlXZWVrZGF5NjdcIjpcclxuXHRcdFx0XHRnZXRXZWVrbHlSZXBlYXREYXkoZGF5QXJyYXksIFs2LCA3XSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJEYWlseVwiOlxyXG5cdFx0XHRcdGdldFdlZWtseVJlcGVhdERheShkYXlBcnJheSwgWzEsIDIsIDMsIDQsIDUsIDYsIDddKTtcclxuXHRcdFx0XHRicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIldlZWtseVwiOi8vIOavj+WRqFxyXG5cdFx0XHRcdGdldFdlZWtseVJlcGVhdERheShkYXlBcnJheSwgW2V2ZW50U3RhcnQuZ2V0RGF5KCldKTtcclxuXHRcdFx0XHRicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5MldlZWtzXCI6XHJcblx0XHRcdFx0Z2V0V2Vla2x5UmVwZWF0RGF5KGRheUFycmF5LCBbZXZlbnRTdGFydC5nZXREYXkoKV0pO1xyXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGF5QXJyYXkubGVuZ3RoOyArKyBpKXtcclxuXHRcdFx0XHRcdHZhciBpbnRlciA9IF9pbnRlckRheXMoX2QycyhldmVudFN0YXJ0KSwgX2QycyhkYXlBcnJheVtpXVswXSkpO1xyXG5cdFx0XHRcdFx0aWYgKChwYXJzZUZsb2F0KChpbnRlci0xKS83LjApICUgMikgIT0gMCApe1xyXG5cdFx0XHRcdFx0XHRkYXlBcnJheS5zcGxpY2UoaSwgMSk7XHJcblx0XHRcdFx0XHRcdGkgLS07XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiTW9udGhseVwiOlxyXG5cdFx0XHRcdGdldE1vbnRobHlSZXBlYXREYXkoZGF5QXJyYXkpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiWWVhcmx5XCI6XHJcblx0XHRcdFx0Z2V0WWVhcmx5UmVwZWF0RGF5KGRheUFycmF5KTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Ly8gVE9ETzog5rGJ5a2X6ZyA6KaB6ICD6JmRXHJcbiAgICAgICAgICAgIGNhc2UgXCJDaGluZXNlTW9udGhseVwiOlxyXG4gICAgICAgICAgICAgICAgZ2V0Q2hpbmVzZVJlcGVhdERheShkYXlBcnJheSwgJ+aciCcpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiQ2hpbmVzZVllYXJseVwiOlxyXG4gICAgICAgICAgICAgICAgZ2V0Q2hpbmVzZVJlcGVhdERheShkYXlBcnJheSwgJ+WOhicpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0OntcclxuXHRcdFx0XHRpZiAoZ19yZXBlYXRSdWxlLmluZGV4T2YoXCJFdmVyeVdlZWtcIikgPT0gMCl7XHJcblx0XHRcdFx0XHR2YXIgZGF5cyA9IGdfcmVwZWF0UnVsZS5zdWJzdHIoXCJFdmVyeVdlZWtcIi5sZW5ndGgpLnNwbGl0KCcnKTtcclxuXHRcdFx0XHRcdGdldFdlZWtseVJlcGVhdERheShkYXlBcnJheSwgZGF5cyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG5cdHJldHVybiBkYXlBcnJheTtcclxufVxyXG5cclxuXHJcbi8qIOaVsOaNruiOt+WPllxyXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcblxyXG4vKiDmnYLpobnlkozlt6XlhbdcclxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG4vLyDliKTmlq3lhoXmoLhcclxuZnVuY3Rpb24gaXNDaHJvbWUoKSB7XHJcblx0aWYgKGdfaXNDaHJvbWUpIHJldHVybiBnX2lzQ2hyb21lO1xyXG5cdC8vXHJcblx0dmFyIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xyXG5cdGdfaXNDaHJvbWUgPSB1YS5pbmRleE9mKCdjaHJvbWUnKSAhPSAtMTtcclxuXHQvL1xyXG5cdHJldHVybiBnX2lzQ2hyb21lO1xyXG59XHJcblxyXG4vLyDlsIbmlbTmlbDovazmjaLmiJDml6XmnJ/lrZfnrKbkuLJcclxuZnVuY3Rpb24gZm9ybWF0SW50VG9EYXRlU3RyaW5nKG4pe1xyXG5cdFx0XHJcblx0cmV0dXJuIG4gPCAxMCA/ICcwJyArIG4gOiBuO1xyXG59XHJcblxyXG4vLyDmo4Dmn6Xlj4rlop7liqDmlbDlgLzlrZfnrKbkuLLplb/luqbvvIzkvovlpoLvvJonMicgLT4gJzAyJ1xyXG5mdW5jdGlvbiBjaGVja0FuZEFkZFN0ckxlbmd0aChzdHIpIHtcclxuXHRpZiAoc3RyLmxlbmd0aCA8IDIpIHtcclxuXHRcdHJldHVybiAnMCcgKyBzdHI7XHJcblx0fSBlbHNlIHtcclxuXHRcdHJldHVybiBzdHI7XHJcblx0fVxyXG59XHJcblxyXG4vLyDlsIblrZfnrKbkuLLovazljJbkuLrml6XmnJ/lr7nosaFcclxuZnVuY3Rpb24gX3MyZChzdHIpe1xyXG5cdGlmICghc3RyKVxyXG5cdFx0cmV0dXJuICcnO1xyXG5cdHZhciBkYXRlID0gbmV3IERhdGUoc3RyLnN1YnN0cigwLCA0KSxcclxuXHRcdFx0XHRcdHN0ci5zdWJzdHIoNSwgMikgLSAxLFxyXG5cdFx0XHRcdFx0c3RyLnN1YnN0cig4LCAzKSxcclxuXHRcdFx0XHRcdHN0ci5zdWJzdHIoMTEsIDIpLFxyXG5cdFx0XHRcdFx0c3RyLnN1YnN0cigxNCwgMiksXHJcblx0XHRcdFx0XHRzdHIuc3Vic3RyKDE3LCAyKVxyXG5cdFx0XHRcdFx0KTtcdFx0XHJcblx0cmV0dXJuIGRhdGU7XHJcbn1cclxuIiwiZXhwb3J0IHsgV2l6RXhwbG9yZXJBcHAsIFdpekV4cGxvcmVyV2luZG93LCBXaXpEYXRhYmFzZSwgV2l6Q29tbW9uVUksIFdpekNvbmZpcm0gfTtcclxuXHJcbi8vVE9ETzog5Yik5patd2luZG93LmV4dGVybmFs5piv5ZCm5Li6V2l6SHRtbEVkaXRvckFwcFxyXG5jb25zdCBXaXpFeHBsb3JlckFwcCA9IHdpbmRvdy5leHRlcm5hbDtcclxuY29uc3QgV2l6RXhwbG9yZXJXaW5kb3cgPSBXaXpFeHBsb3JlckFwcC5XaW5kb3c7XHJcbmNvbnN0IFdpekRhdGFiYXNlID0gV2l6RXhwbG9yZXJBcHAuRGF0YWJhc2U7XHJcbmNvbnN0IFdpekNvbW1vblVJID0gV2l6RXhwbG9yZXJBcHAuQ3JlYXRlV2l6T2JqZWN0KFwiV2l6S01Db250cm9scy5XaXpDb21tb25VSVwiKTtcclxuXHJcbmZ1bmN0aW9uIFdpekNvbmZpcm0obXNnLCB0aXRsZSkge1xyXG4gICAgcmV0dXJuIFdpekV4cGxvcmVyV2luZG93LlNob3dNZXNzYWdlKG1zZywgdGl0bGUsIDB4MDAwMDAwMjAgfCAweDAwMDAwMDAxKSA9PSAxO1xyXG59XHJcbiIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL2luZGV4LmNzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9pbmRleC5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL2luZGV4LmNzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsImltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuaW1wb3J0ICdmdWxsY2FsZW5kYXInO1xyXG5pbXBvcnQgJ2Z1bGxjYWxlbmRhci9kaXN0L2Z1bGxjYWxlbmRhci5jc3MnO1xyXG5pbXBvcnQgV2l6RXZlbnREYXRhTG9hZGVyIGZyb20gJy4vV2l6RXZlbnREYXRhTG9hZGVyJztcclxuaW1wb3J0IHsgcmVuZGVyRWRpdFBvcHBlciB9IGZyb20gJy4vV2lkZ2V0L0V2ZW50UG9wb3Zlci9FdmVudFBvcG92ZXInO1xyXG5pbXBvcnQgRXZlbnRDcmVhdGVNb2RhbCBmcm9tICcuL01vZGFsL0V2ZW50Q3JlYXRlTW9kYWwnXHJcbmltcG9ydCAnLi9pbmRleC5jc3MnO1xyXG5cclxuJChmdW5jdGlvbigpe1xyXG4gICAgLy8g5a6a5LmJ5Y+Y6YePXHJcblx0Y29uc3QgZGF0YUxvYWRlciA9IG5ldyBXaXpFdmVudERhdGFMb2FkZXIoKTtcclxuXHRsZXQgZ19lZGl0UG9wcGVyLCBnX2NyZWF0ZU1vZGFsLCBnX2VkaXRNb2RhbDtcclxuXHJcbiAgICBjb25zdCBjYWxlbmRhciA9ICQoJyNjYWxlbmRhcicpLmZ1bGxDYWxlbmRhcih7XHJcblx0XHR0aGVtZVN5c3RlbTogJ3N0YW5kYXJkJyxcclxuXHRcdGhlaWdodDogJ3BhcmVudCcsXHJcblx0XHRoZWFkZXI6IHtcclxuXHRcdFx0bGVmdDogJ3ByZXYsbmV4dCx0b2RheScsXHJcblx0XHRcdGNlbnRlcjogJ3RpdGxlJyxcclxuXHRcdFx0cmlnaHQ6ICdtb250aCxhZ2VuZGFXZWVrLGFnZW5kYURheSxsaXN0V2VlaydcclxuXHRcdH0sXHJcblx0XHR2aWV3czoge1xyXG5cdFx0XHRtb250aDoge1xyXG5cdFx0XHRcdC8vdGl0bGVGb3JtYXQ6IGdfbG9jX3RpdGxlZm9ybWF0X21vbnRoLCAvL3ZhciBnX2xvY190aXRsZWZvcm1hdF9tb250aCA9IFwiTU1NTSB5eXl5XCI7XHJcblx0XHRcdH0sXHJcblx0XHRcdGFnZW5kYToge1xyXG5cdFx0XHRcdG1pblRpbWU6IFwiMDg6MDA6MDBcIixcclxuXHRcdFx0XHRzbG90TGFiZWxGb3JtYXQ6ICdoKDptbSkgYSdcclxuXHRcdFx0fSxcclxuXHRcdFx0bGlzdFdlZWs6IHtcclxuXHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRuYXZMaW5rczogdHJ1ZSxcclxuXHRcdGFsbERheURlZmF1bHQ6IGZhbHNlLFxyXG5cdFx0ZGVmYXVsdFZpZXc6ICdhZ2VuZGFXZWVrJyxcclxuXHRcdGV2ZW50TGltaXQ6IHRydWUsXHJcblx0XHRidXR0b25UZXh0OiB7XHJcblx0XHRcdHRvZGF5OiAn5LuK5aSpJyxcclxuXHRcdFx0bW9udGg6ICfmnIgnLFxyXG5cdFx0XHR3ZWVrOiAn5ZGoJyxcclxuXHRcdFx0ZGF5OiAn5pelJyxcclxuXHRcdFx0bGlzdDogJ+ihqCdcclxuICAgICAgICB9LFxyXG5cdFx0bW9udGhOYW1lczogW1xyXG4gICAgICAgICAgICAnMeaciCcsICcy5pyIJywgJzPmnIgnLCAnNOaciCcsIFxyXG4gICAgICAgICAgICAnNeaciCcsICc25pyIJywgJzfmnIgnLCAnOOaciCcsIFxyXG4gICAgICAgICAgICAnOeaciCcsICcxMOaciCcsICcxMeaciCcsICcxMuaciCdcclxuICAgICAgICBdLFxyXG5cdFx0bW9udGhOYW1lc1Nob3J0OiBbXHJcbiAgICAgICAgICAgICcx5pyIJywgJzLmnIgnLCAnM+aciCcsICc05pyIJywgXHJcbiAgICAgICAgICAgICc15pyIJywgJzbmnIgnLCAnN+aciCcsICc45pyIJywgXHJcbiAgICAgICAgICAgICc55pyIJywgJzEw5pyIJywgJzEx5pyIJywgJzEy5pyIJ1xyXG4gICAgICAgIF0sXHJcblx0XHRkYXlOYW1lczogW1xyXG4gICAgICAgICAgICAn5ZGo5pelJywgJ+WRqOS4gCcsICflkajkuownLCAn5ZGo5LiJJywgJ+WRqOWbmycsICflkajkupQnLCAn5ZGo5YWtJ1xyXG4gICAgICAgIF0sXHJcblx0XHRkYXlOYW1lc1Nob3J0OiBbXHJcbiAgICAgICAgICAgICflkajml6UnLCAn5ZGo5LiAJywgJ+WRqOS6jCcsICflkajkuIknLCAn5ZGo5ZubJywgJ+WRqOS6lCcsICflkajlha0nXHJcbiAgICAgICAgXSxcclxuXHRcdHNlbGVjdGFibGU6IHRydWUsXHJcblx0XHRzZWxlY3RIZWxwZXI6IHRydWUsXHJcblx0XHR1bnNlbGVjdENhbmNlbDogJy5tb2RhbCAqJyxcclxuXHRcdGFsbERheVRleHQ6ICflhajlpKknLFxyXG5cdFx0bm93SW5kaWNhdG9yOiB0cnVlLFxyXG5cdFx0Zm9yY2VFdmVudER1cmF0aW9uOiB0cnVlLFxyXG5cdFx0Zmlyc3REYXk6IDEsIC8vIOesrOS4gOWkqeaYr+WRqOS4gOi/mOaYr+WRqOWkqe+8jOS4jmRhdGVwaWNrZXLlv4Xpobvnm7jlkIxcclxuXHRcdGRyYWdPcGFjaXR5OiB7XHJcblx0XHRcdFwibW9udGhcIjogLjUsXHJcblx0XHRcdFwiYWdlbmRhV2Vla1wiOiAxLFxyXG5cdFx0XHRcImFnZW5kYURheVwiOiAxXHJcblx0XHR9LFxyXG5cdFx0ZWRpdGFibGU6IHRydWUsXHJcblxyXG5cdFx0Ly8g5Yi35paw6KeG5Zu+77yM6YeN5paw6I635Y+W5pel5Y6G5LqL5Lu2XHJcblx0XHR2aWV3UmVuZGVyOiBmdW5jdGlvbiggdmlldywgZWxlbWVudCApIHtcclxuXHRcdFx0Ly9UT0RPOiDmhJ/op4nov5nmoLfpgKDmiJDmgKfog73kuIrnmoTmjZ/lpLHvvIzmmK/lkKbmnInmm7Tlpb3nmoTmlrnms5XvvJ9cclxuXHRcdFx0Y29uc3QgY2FsZW5kYXIgPSAkKCcjY2FsZW5kYXInKTtcclxuXHRcdFx0Y29uc3QgZXZlbnRTb3VyY2VzID0gZGF0YUxvYWRlci5nZXRFdmVudFNvdXJjZXMoIHZpZXcsIGVsZW1lbnQgKTtcclxuXHRcdFx0Y2FsZW5kYXIuZnVsbENhbGVuZGFyKCdyZW1vdmVFdmVudHMnKTtcclxuXHRcdFx0Zm9yIChsZXQgaT0wIDsgaSA8IGV2ZW50U291cmNlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGNhbGVuZGFyLmZ1bGxDYWxlbmRhcignYWRkRXZlbnRTb3VyY2UnLCBldmVudFNvdXJjZXNbaV0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0fSxcclxuXHJcblx0XHQvLyDpgInmi6nliqjkvZzop6blj5HnmoTkuovku7blj6Xmn4TvvIzlrprkuYnkuobkuIDkuKpjYWxsYmFja1xyXG5cdFx0c2VsZWN0OiBmdW5jdGlvbihzdGFydCwgZW5kLCBqc0V2ZW50LCB2aWV3KXtcclxuXHRcdFx0Ly8g5by55Ye64oCc5Yib5bu65pel5Y6G5LqL5Lu24oCd56qX5Y+jXHJcblx0XHRcdC8vIOWIpOaWreaYr+WQpua4suafk1xyXG5cdFx0XHQvL1RPRE86IOaDs+WKnuazleS4jeimgeeUqOWFqOWxgOWPmOmHj1xyXG5cdFx0XHRpZiAoICF3aW5kb3cuZ19jcmVhdGVNb2RhbCApIG5ldyBFdmVudENyZWF0ZU1vZGFsKHtzdGFydCwgZW5kLCBqc0V2ZW50LCB2aWV3fSk7XHJcblx0XHRcdC8vIOS8oOmAkuWPguaVsFxyXG5cdFx0XHR3aW5kb3cuZ19jcmVhdGVNb2RhbC51cGRhdGUoe3N0YXJ0LCBlbmQsIGpzRXZlbnQsIHZpZXd9KTtcclxuXHRcdFx0d2luZG93LmdfY3JlYXRlTW9kYWwuc2hvdygpO1xyXG5cdFx0fSxcclxuXHJcblx0XHRldmVudERyYWdTdGFydDogZnVuY3Rpb24oIGV2ZW50LCBqc0V2ZW50LCB1aSwgdmlldyApIHsgfSxcclxuXHRcdGV2ZW50RHJhZ1N0b3A6IGZ1bmN0aW9uKCBldmVudCwganNFdmVudCwgdWksIHZpZXcgKSB7IH0sXHJcblxyXG5cdFx0Ly8g5pel5Y6G5LqL5Lu25ouW5YqoIGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXdcclxuXHRcdGV2ZW50RHJvcDogZnVuY3Rpb24oZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldyl7XHJcblx0XHRcdGlmIChldmVudC5pZCl7XHJcblx0XHRcdFx0ZGF0YUxvYWRlci51cGRhdGVFdmVudERhdGFPbkRyb3AoZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldylcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXZlcnRGdW5jKCk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8g5pel5Y6G5LqL5Lu25pel5pyf6IyD5Zu06YeN572uXHJcblx0XHRldmVudFJlc2l6ZTogZnVuY3Rpb24oZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldyl7XHJcblx0XHRcdGlmIChldmVudC5pZCl7XHJcblx0XHRcdFx0ZGF0YUxvYWRlci51cGRhdGVFdmVudERhdGFPblJlc2l6ZShldmVudCwgZGVsdGEsIHJldmVydEZ1bmMsIGpzRXZlbnQsIHVpLCB2aWV3KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXZlcnRGdW5jKCk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblxyXG5cdFx0ZXZlbnRSZW5kZXI6IGZ1bmN0aW9uKGV2ZW50T2JqLCAkZWwpIHtcclxuXHRcdFx0Ly8g5YWD57Sg5bey57uP5riy5p+T77yM5Y+v5L+u5pS55YWD57SgXHJcblx0XHRcdGNvbnN0IGlzQ29tcGxldGUgPSBwYXJzZUludChldmVudE9iai5jb21wbGV0ZSkgPT0gNTtcclxuXHRcdFx0aWYgKCBpc0NvbXBsZXRlICkge1xyXG5cdFx0XHRcdC8vIOagt+W8j1xyXG5cdFx0XHRcdCRlbC5hZGRDbGFzcygndGMtY29tcGxldGUnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8g5pel5Y6G5LqL5Lu254K55Ye75ZCO5LqL5Lu25Y+l5p+EXHJcblx0XHRldmVudENsaWNrOiBmdW5jdGlvbiggZXZlbnQsIGpzRXZlbnQsIHZpZXcgKSB7XHJcblx0XHRcdC8vIHRoaXMg5oyH5ZCR5YyF6KO55LqL5Lu255qEPGE+5YWD57SgXHJcblxyXG5cdFx0XHQvLyDliKTmlq3mmK/lkKblt7Lnu4/muLLmn5PlvLnnqpdcclxuXHRcdFx0aWYgKCAhZ19lZGl0UG9wcGVyICkge1xyXG5cdFx0XHRcdGdfZWRpdFBvcHBlciA9IHJlbmRlckVkaXRQb3BwZXIoe1xyXG5cdFx0XHRcdFx0J2V2ZW50JzogZXZlbnQsXHJcblx0XHRcdFx0XHQnanNFdmVudCc6IGpzRXZlbnQsXHJcblx0XHRcdFx0XHQndmlldyc6IHZpZXdcclxuXHRcdFx0XHR9LCB0aGlzKS5FdmVudFBvcG92ZXIoJ3Nob3cnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyDmm7TmlrByZWZlcmVuY2VcclxuXHRcdFx0XHRnX2VkaXRQb3BwZXIuRXZlbnRQb3BvdmVyKCdvcHRpb24nLCB7XHJcblx0XHRcdFx0XHRhcmdzOiB7XHJcblx0XHRcdFx0XHRcdCdldmVudCc6IGV2ZW50LFxyXG5cdFx0XHRcdFx0XHQnanNFdmVudCc6IGpzRXZlbnQsXHJcblx0XHRcdFx0XHRcdCd2aWV3Jzogdmlld1xyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHRpdGxlOiBldmVudC50aXRsZSxcclxuXHRcdFx0XHRcdHJlZmVyZW5jZTogdGhpc1xyXG5cdFx0XHRcdH0pLkV2ZW50UG9wb3ZlcigndXBkYXRlJykuRXZlbnRQb3BvdmVyKCdzaG93Jyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblx0XHRcclxuXHR9KVxyXG59KSJdLCJzb3VyY2VSb290IjoiIn0=