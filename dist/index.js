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
/******/ 	var hotCurrentHash = "7498c1868e4d9e1ecf04"; // eslint-disable-line no-unused-vars
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
            clickedEvent: null
        };
        this.handleEventClick = this.handleEventClick.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
    }

    handleEventClick(event, jsEvent, view) {
        //console.log(event.title, event, jsEvent, view)
        this.setState({
            clickedEventArgs: { event, jsEvent, view }
        });
    }

    handleSelect(start, end, jsEvent, view) {
        this.setState({
            show: true
        });
    }

    handleModalClose() {
        this.setState({
            show: false
        });
    }

    render() {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'div',
            { id: 'wiz-tomato-calendar' },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Calendar_Calendar__WEBPACK_IMPORTED_MODULE_1__["default"], { onEventClick: this.handleEventClick, onSelect: this.handleSelect }),
            this.state.clickedEventArgs && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_EventPopover_EventPopover__WEBPACK_IMPORTED_MODULE_2__["default"], {
                event: this.state.clickedEventArgs.event,
                reference: this.state.clickedEventArgs.jsEvent.target
            }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Modal_EventModal__WEBPACK_IMPORTED_MODULE_3__["default"], { show: this.state.show, onModalClose: this.handleModalClose })
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
        this.onEventDrop = this.onEventDrop.bind(this);
        this.onEventResize = this.onEventResize.bind(this);
    }

    // 事件句柄
    // ------------------------------------------------------------
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
/* harmony import */ var _PopoverToolbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PopoverToolbar */ "./src/components/EventPopover/PopoverToolbar.js");
/* harmony import */ var _models_EventHandles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../models/EventHandles */ "./src/models/EventHandles.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/_react-bootstrap@0.32.1@react-bootstrap/es/index.js");
/* harmony import */ var _Form_DateTimePicker__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Form/DateTimePicker */ "./src/components/Form/DateTimePicker.js");
/* harmony import */ var _Form_ColorPicker__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Form/ColorPicker */ "./src/components/Form/ColorPicker.js");










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
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
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

    handleColorChange(e) {
        const newColor = e.target.value;
        console.log(newColor);
    }

    handleInputChange(e) {}
    //


    //TODO: 写一个通用方法计算BtnClick调用，以免代码重复

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
        const eventStart = this.props.event.start.format('YYYY-MM-DD HH:mm:ss');
        const colorValue = this.props.event.backgroundColor;
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
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Form_DateTimePicker__WEBPACK_IMPORTED_MODULE_7__["default"], { horizontal: true, readOnly: true, id: 'tc-editpopper-eventdate',
                        label: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('i', { className: 'far fa-calendar-alt fa-lg' }),
                        value: eventStart,
                        onInputChange: this.handleInputChange
                    }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Form_ColorPicker__WEBPACK_IMPORTED_MODULE_8__["default"], { horizontal: true, id: 'tc-editpopper-eventcolor',
                        label: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('i', { className: 'fas fa-paint-brush fa-lg' }),
                        value: colorValue,
                        onColorChange: this.handleColorChange
                    })
                ),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PopoverToolbar__WEBPACK_IMPORTED_MODULE_4__["default"], {
                    enableSaveBtn: !!this.state.newEventData.title,
                    onSaveBtnClick: this.handleSaveBtnClick,
                    onCompleteBtnClick: this.handleCompleteBtnClick,
                    onOpenDocBtnClick: this.handleOpenDocBtnClick,
                    onDeleteDataBtnClick: this.handleDeleteDataBtnClick,
                    onDeleteDocBtnClick: this.handleDeleteDocBtnClick
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
        const isHorizontal = this.props.horizontal;
        const colorFormControl = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["FormControl"], { type: 'text',
            ref: instance => this.inputFormControl = instance,
            value: this.props.value //hex色彩值
            , style: { //改变颜色
                backgroundColor: `${this.props.value}`
            },
            readOnly: this.props.readOnly,
            onChange: e => console.log(e)
        });
        if (isHorizontal) {
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
                    colorFormControl
                )
            );
        } else {
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["FormGroup"],
                { controlId: this.props.id },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["ControlLabel"],
                    null,
                    this.props.label
                ),
                colorFormControl
            );
        }
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
        const isHorizontal = this.props.horizontal;
        const dateFormControl = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["FormControl"], { type: 'text',
            ref: instance => this.inputFormControl = instance,
            value: this.props.value,
            readOnly: this.props.readOnly,
            onChange: this.props.onInputChange
        });
        if (isHorizontal) {
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
                    dateFormControl
                )
            );
        } else {
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["FormGroup"],
                { controlId: this.props.id },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                    react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["ControlLabel"],
                    null,
                    this.props.label
                ),
                dateFormControl
            );
        }
    }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

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
                                    'Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQ2FsZW5kYXIvQ2FsZW5kYXIuY3NzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0V2ZW50UG9wb3Zlci9FdmVudFBvcG92ZXIuY3NzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0V2ZW50UG9wb3Zlci9Qb3BvdmVyVGl0bGVJbnB1dC5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZSBzeW5jIF5cXC5cXC8uKiQiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9DYWxlbmRhci9DYWxlbmRhci5jc3M/Y2ExNCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9DYWxlbmRhci9DYWxlbmRhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9DYWxlbmRhci9GdWxsQ2FsZW5kYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRXZlbnRQb3BvdmVyL0V2ZW50UG9wb3Zlci5jc3M/NTg1ZiIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9FdmVudFBvcG92ZXIvRXZlbnRQb3BvdmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0V2ZW50UG9wb3Zlci9Qb3BvdmVyVGl0bGVJbnB1dC5jc3M/M2UzNiIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9FdmVudFBvcG92ZXIvUG9wb3ZlclRpdGxlSW5wdXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRXZlbnRQb3BvdmVyL1BvcG92ZXJUb29sYmFyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0Zvcm0vQ29sb3JQaWNrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRm9ybS9EYXRlVGltZVBpY2tlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Nb2RhbC9FdmVudE1vZGFsLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5jc3M/ZDhjMyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVscy9DYWxlbmRhckV2ZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9tb2RlbHMvRXZlbnRIYW5kbGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9tb2RlbHMvV2l6RXZlbnREYXRhTG9hZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9Db25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL1dpekludGVyZmFjZS5qcyJdLCJuYW1lcyI6WyJBcHAiLCJSZWFjdCIsIkNvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJzdGF0ZSIsImNsaWNrZWRFdmVudCIsImhhbmRsZUV2ZW50Q2xpY2siLCJiaW5kIiwiaGFuZGxlU2VsZWN0IiwiaGFuZGxlTW9kYWxDbG9zZSIsImV2ZW50IiwianNFdmVudCIsInZpZXciLCJzZXRTdGF0ZSIsImNsaWNrZWRFdmVudEFyZ3MiLCJzdGFydCIsImVuZCIsInNob3ciLCJyZW5kZXIiLCJ0YXJnZXQiLCJDYWxlbmRhciIsImV2ZW50cyIsImRhdGFMb2FkZXIiLCJjYWxlbmRhciIsIm9uQ2FsZW5kYXJSZW5kZXIiLCJvblZpZXdSZW5kZXIiLCJvbkV2ZW50UmVuZGVyIiwib25FdmVudERyb3AiLCJvbkV2ZW50UmVzaXplIiwiZWwiLCJlbGVtZW50IiwiJGNhbGVuZGFyIiwiJCIsImV2ZW50U291cmNlcyIsImdldEV2ZW50U291cmNlcyIsImZ1bGxDYWxlbmRhciIsImkiLCJsZW5ndGgiLCJkZWx0YSIsInJldmVydEZ1bmMiLCJ1aSIsImlkIiwidXBkYXRlRXZlbnREYXRhT25Ecm9wIiwidXBkYXRlRXZlbnREYXRhT25SZXNpemUiLCJldmVudE9iaiIsIiRlbCIsImlzQ29tcGxldGUiLCJwYXJzZUludCIsImNvbXBsZXRlIiwiYWRkQ2xhc3MiLCJjb21wb25lbnREaWRNb3VudCIsImxlZnQiLCJjZW50ZXIiLCJyaWdodCIsInRvZGF5IiwibW9udGgiLCJ3ZWVrIiwiZGF5IiwibGlzdCIsImFnZW5kYSIsIm1pblRpbWUiLCJzbG90TGFiZWxGb3JtYXQiLCJvblNlbGVjdCIsIm9uRXZlbnRDbGljayIsIkZ1bGxjYWxlbmRhck9iamVjdE1hcHBlciIsImdldFNldHRpbmdzIiwicHJvcGVydGllcyIsIm5ld1NldHRpbmdzIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJGdWxsQ2FsZW5kYXIiLCJqcSIsIm5vQ29uZmxpY3QiLCJmdWxsY2FsZW5kYXJPYmplY3RNYXBwZXIiLCJyb290IiwiaW5zdGFuY2UiLCJkYXRlIiwiRGF0ZSIsIm9iamVjdE1hcHBlclNldHRpbmdzIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIm5leHRQcm9wcyIsImdldFRpbWUiLCJjYWxlbmRhclJlZiIsIkV2ZW50UG9wb3ZlciIsInBvcHBlck5vZGUiLCJwb3BwZXJJbnN0YW5jZSIsImV2ZW50SGFuZGxlcyIsIm5ld0V2ZW50RGF0YSIsImF1dG9IaWRlIiwiaGFuZGxlVGl0bGVDaGFuZ2UiLCJoYW5kbGVDb2xvckNoYW5nZSIsImhhbmRsZVNhdmVCdG5DbGljayIsImhhbmRsZUNvbXBsZXRlQnRuQ2xpY2siLCJoYW5kbGVPcGVuRG9jQnRuQ2xpY2siLCJoYW5kbGVEZWxldGVEYXRhQnRuQ2xpY2siLCJoYW5kbGVEZWxldGVEb2NCdG5DbGljayIsImUiLCJyZWZlcmVuY2UiLCJpcyIsImhhcyIsImhpZGUiLCJ0aGF0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJmYWRlSW4iLCJuZXdUaXRsZSIsInZhbHVlIiwicHJldlN0YXRlIiwiT2JqZWN0IiwiY3JlYXRlIiwidGl0bGUiLCJuZXdDb2xvciIsImNvbnNvbGUiLCJsb2ciLCJoYW5kbGVJbnB1dENoYW5nZSIsInRoZW4iLCJyZXQiLCJvblNhdmVCdG5DbGljayIsIm9uQ29tcGxldGVCdG5DbGljayIsIm9uT3BlbkRvY0J0bkNsaWNrIiwib25EZWxldGVEYXRhQnRuQ2xpY2siLCJvbkRlbGV0ZURvY0J0bkNsaWNrIiwicGxhY2VtZW50IiwibW9kaWZpZXJzIiwiYXJyb3ciLCJkb2N1bWVudCIsIm9mZiIsIm9uIiwiY29tcG9uZW50RGlkVXBkYXRlIiwicHJldlByb3BzIiwic25hcHNob3QiLCJzaG91bGRDb21wb25lbnRVcGRhdGUiLCJuZXh0U3RhdGUiLCJ1cGRhdGUiLCJldmVudFN0YXJ0IiwiZm9ybWF0IiwiY29sb3JWYWx1ZSIsImJhY2tncm91bmRDb2xvciIsImRpc3BsYXkiLCJkaXYiLCJFdmVudFRpdGxlSW5wdXQiLCJldmVudFRpdGxlIiwiaGFuZGxlQ2hhbmdlIiwib25UaXRsZUNoYW5nZSIsInRhcmdldEZvcm0iLCJQb3BvdmVyVG9vbGJhciIsImVuYWJsZVNhdmVCdG4iLCJIdWViZWUiLCJyZXF1aXJlIiwicHJvdG90eXBlIiwic2V0VGV4dHMiLCJzZXRUZXh0RWxlbXMiLCJlbGVtIiwicHJvcGVydHkiLCJub2RlTmFtZSIsImNvbG9yIiwiZGlzcGF0Y2hFdmVudCIsIkV2ZW50IiwiQ29sb3JQaWNrZXIiLCJpbnB1dCIsIlJlYWN0RE9NIiwiZmluZERPTU5vZGUiLCJpbnB1dEZvcm1Db250cm9sIiwiaHVlYmVlSW5zdGFuY2UiLCJzdGF0aWNPcGVuIiwic2V0VGV4dCIsInNldEJHQ29sb3IiLCJodWVzIiwiaHVlMCIsInNoYWRlcyIsInNhdHVyYXRpb25zIiwibm90YXRpb24iLCJjbGFzc05hbWUiLCJjdXN0b21Db2xvcnMiLCJpc0hvcml6b250YWwiLCJob3Jpem9udGFsIiwiY29sb3JGb3JtQ29udHJvbCIsInJlYWRPbmx5IiwibGFiZWwiLCJEYXRlVGltZVBpY2tlciIsImRhdGV0aW1lcGlja2VyIiwiZGF0ZUZvcm1Db250cm9sIiwib25JbnB1dENoYW5nZSIsIkV2ZW50TW9kYWwiLCJvbk1vZGFsQ2xvc2UiLCJib3JkZXJCb3R0b20iLCJwYWRkaW5nIiwiZ2V0RWxlbWVudEJ5SWQiLCJDYWxlbmRhckV2ZW50IiwiZGF0YSIsIkVycm9yIiwidHlwZSIsIl9jaGVja0RhdGFUeXBlIiwiX2NyZWF0ZSIsImRvYyIsImdfZGIiLCJEb2N1bWVudEZyb21HVUlEIiwiR2V0UGFyYW1WYWx1ZSIsIm1vbWVudCIsIkRhdGVDcmVhdGVkIiwiR1VJRCIsIlRpdGxlIiwiRGF0ZU1vZGlmaWVkIiwiZXJyb3IiLCJia0NvbG9yIiwiYWxsRGF5IiwiZGF0ZUNvbXBsZXRlZCIsInJwdFJ1bGUiLCJycHRFbmQiLCJfSW5mbyIsIl9wYXJzZUluZm8iLCJDQUxFTkRBUl9JTkZPIiwiX0V4dHJhSW5mbyIsIkNBTEVOREFSX0VYVFJBSU5GTyIsIl9nZXREZWZhdWx0RXh0cmFJbmZvIiwiZ3VpZCIsIkNBTEVOREFSX1NUQVJUIiwiQ0FMRU5EQVJfRU5EIiwiY2kiLCJiIiwiQ29uZmlnIiwiY29sb3JJdGVtcyIsImluZGV4T2YiLCJDb21wbGV0ZSIsIkRhdGVDb21wbGV0ZWQiLCJDQUxFTkRBUl9SRUNVUlJFTkNFIiwiQ0FMRU5EQVJfRU5EUkVDVVJSRU5DRSIsImhhc1RpbWUiLCJjcmVhdGVkIiwidXBkYXRlZCIsInRleHRDb2xvciIsIl91cGRhdGUiLCJvYmpDbGFzcyIsIkdVSURfUmVnRXhyIiwiU3RyaW5nIiwidGVzdCIsIkluZm9TdHJpbmciLCJJbmZvT2JqZWN0IiwiSW5mb0FycmF5Iiwic3BsaXQiLCJmb3JFYWNoIiwiaXRlbSIsImluZGV4IiwiYXJyIiwicGFpciIsIl9zdHJpbmdpZnlJbmZvIiwiSW5mb09iamVjdEtleXNBcnJheSIsImtleXMiLCJzaW5nbGVJbmZvIiwicHVzaCIsImpvaW4iLCJyZXBsYWNlIiwiX3VwZGF0ZUluZm8iLCJfdXBkYXRlRXh0cmFJbmZvIiwiRXh0cmFJbmZvT2JqZWN0IiwiX2dldEV2ZW50SHRtbCIsImNvbnRlbnQiLCJodG1sVGV4dCIsImdlbmVyYXRlUmVwZWF0RXZlbnRzIiwiZXZlbnRTb3VyY2UiLCJkYXlBcnJheSIsIl9nZXRSZW5kZXJSZXBlYXREYXkiLCJuZXdFdmVudCIsInRvRnVsbENhbGVuZGFyRXZlbnQiLCJhZGQiLCJkaWZmIiwicmVnZXgiLCJjb3VudCIsImN1cldlZWtEYXkiLCJyZXN1bHRzIiwiZXhlYyIsImludGVyV2VlayIsIm51bWJlciIsIl9nZXRXZWVrbHlSZXBlYXREYXkiLCJwZXJSdWxlIiwiX2dldFBlclJlcGVhdERheXMiLCJpbnRlcldlZWtzIiwidmlld1N0YXJ0Iiwidmlld0VuZCIsImludGVydmFsV2Vla3MiLCJ3ZWVrZGF5cyIsIm5ld0V2ZW50U3RhcnREYXRlIiwic2V0IiwiZ2V0IiwiaXNTYW1lIiwiaXNCZWZvcmUiLCJwZXJSdWxlTWFwIiwic3BsaWNlIiwiZmluZEluZGV4IiwidG9XaXpFdmVudERhdGEiLCJhZGRUb0Z1bGxDYWxlbmRhciIsIl9zYXZlQWxsUHJvcCIsInN0YXJ0U3RyIiwiZW5kU3RyIiwiX3NldFBhcmFtVmFsdWUiLCJTZXRQYXJhbVZhbHVlIiwiX2NyZWF0ZVdpekV2ZW50RG9jIiwibG9jYXRpb24iLCJvYmpGb2xkZXIiLCJHZXRGb2xkZXJCeUxvY2F0aW9uIiwidGVtcEh0bWwiLCJnX2NtbiIsIkdldEFUZW1wRmlsZU5hbWUiLCJTYXZlVGV4dFRvRmlsZSIsIkNyZWF0ZURvY3VtZW50MiIsIkNoYW5nZVRpdGxlQW5kRmlsZU5hbWUiLCJVcGRhdGVEb2N1bWVudDYiLCJBZGRUb0NhbGVuZGFyIiwic2F2ZVRvV2l6RXZlbnREb2MiLCJwcm9wIiwiZ3VpZFJlZ2V4IiwiaXNXaXpEb2NFeGlzdCIsImRlbGV0ZUV2ZW50RGF0YSIsImlzRGVsZXRlRG9jIiwiUmVtb3ZlRnJvbUNhbGVuZGFyIiwiRGVsZXRlIiwicmVmZXRjaERhdGEiLCJyZWZyZXNoRXZlbnQiLCJGb3JtSGFuZGxlcyIsIm9uQ3JlYXRlQnRuQ2xpY2siLCJmb3JtTm9kZSIsImZpbmQiLCJ2YWwiLCJjcmVhdGVFdmVudCIsIm1vZGFsIiwiV2l6Q29uZmlybSIsIm9uRWRpdE9yaWdpbkJ0bkNsaWNrIiwib2JqRGF0YWJhc2UiLCJvYmpDb21tb24iLCJFZGl0Q2FsZW5kYXJFdmVudCIsIm9ialdpbmRvdyIsIlZpZXdEb2N1bWVudCIsIldpekV2ZW50RGF0YUxvYWRlciIsIkRhdGFiYXNlIiwidXNlck5hbWUiLCJVc2VyTmFtZSIsImdlbmVyYWxFdmVudFNvdXJjZSIsIl9nZXRBbGxPcmlnaW5hbEV2ZW50IiwicmVwZWF0RXZlbnRTb3VyY2VzIiwiX2dldEFsbFJlcGVhdEV2ZW50IiwiY29uY2F0Iiwic3FsIiwiYW5kMSIsImFuZDIiLCJEb2N1bWVudHNEYXRhRnJvbVNRTCIsIm9iaiIsIkpTT04iLCJwYXJzZSIsIkFycmF5IiwiaXNBcnJheSIsImVyciIsInJlcGVhdEV2ZW50cyIsIl91cGRhdGVEb2NNb2RpZnlEYXRlIiwibm93Iiwic2V0U2Vjb25kcyIsImdldFNlY29uZHMiLCJfZDJzIiwiZHQiLCJnZXRGdWxsWWVhciIsImZvcm1hdEludFRvRGF0ZVN0cmluZyIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsImdldEhvdXJzIiwiZ2V0TWludXRlcyIsImV2ZW50RW5kU3RyIiwic2VsZWN0aW9uRGF0YSIsInVzZXJJbnB1dHMiLCJfZ2V0V2l6RXZlbnQiLCJFdmVudENvbGxlY3Rpb24iLCJHZXRDYWxlbmRhckV2ZW50czIiLCJnZXRSZW5kZXJSZXBlYXREYXkiLCJfczJkIiwiZ19ldmVudFN0YXJ0IiwiZ19yZXBlYXRSdWxlIiwiZ2V0V2Vla2x5UmVwZWF0RGF5IiwiY2hhckF0IiwiZ2V0RGF5IiwiaW50ZXIiLCJfaW50ZXJEYXlzIiwicGFyc2VGbG9hdCIsImdldE1vbnRobHlSZXBlYXREYXkiLCJnZXRZZWFybHlSZXBlYXREYXkiLCJnZXRDaGluZXNlUmVwZWF0RGF5IiwiZGF5cyIsInN1YnN0ciIsImlzQ2hyb21lIiwiZ19pc0Nocm9tZSIsInVhIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwidG9Mb3dlckNhc2UiLCJuIiwiY2hlY2tBbmRBZGRTdHJMZW5ndGgiLCJzdHIiLCJjb2xvckNvdW50IiwiV2l6RXhwbG9yZXJBcHAiLCJ3aW5kb3ciLCJleHRlcm5hbCIsIldpekV4cGxvcmVyV2luZG93IiwiV2luZG93IiwiV2l6RGF0YWJhc2UiLCJXaXpDb21tb25VSSIsIkNyZWF0ZVdpek9iamVjdCIsIm1zZyIsIlNob3dNZXNzYWdlIiwiV2l6QWxlcnQiLCJXaXpCdWJibGVNZXNzYWdlIiwiZGVsYXkiLCJhcHBQYXRoIiwiR2V0U3BlY2lhbEZvbGRlciIsIndpelNoZWxsRmlsZU5hbWUiLCJkbGxGaWxlTmFtZSIsInBhcmFtcyIsIlJ1bkV4ZSIsIldpelNoZWxsIiwiZGxsRXhwb3J0RnVuYyIsIndpekV4ZSIsInJ1blNjcmlwdEZpbGUiLCJzY3JpcHRGaWxlTmFtZSIsInNjcmlwdFBhcmFtcyIsIndpekJ1YmJsZU1lc3NhZ2UiLCJnZXRXaXpJbnRlcmZhY2UiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFRLG9CQUFvQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUFpQiw0QkFBNEI7QUFDN0M7QUFDQTtBQUNBLDBCQUFrQiwyQkFBMkI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNO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NEMseUJBQXlCLDJCQUEyQix5QkFBeUIsS0FBSyw0QkFBNEIsMkJBQTJCLDRCQUE0QixLQUFLLG9DQUFvQyw2QkFBNkIsS0FBSyxtQ0FBbUMsOEJBQThCLEtBQUs7O0FBRXZsRTs7Ozs7Ozs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2RTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVRQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZSxNQUFNQSxHQUFOLFNBQWtCLDRDQUFBQyxDQUFNQyxTQUF4QixDQUFrQztBQUM3Q0MsZ0JBQVlDLEtBQVosRUFBbUI7QUFDZixjQUFNQSxLQUFOO0FBQ0EsYUFBS0MsS0FBTCxHQUFhO0FBQ1RDLDBCQUFjO0FBREwsU0FBYjtBQUdBLGFBQUtDLGdCQUFMLEdBQXdCLEtBQUtBLGdCQUFMLENBQXNCQyxJQUF0QixDQUEyQixJQUEzQixDQUF4QjtBQUNBLGFBQUtDLFlBQUwsR0FBb0IsS0FBS0EsWUFBTCxDQUFrQkQsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBcEI7QUFDQSxhQUFLRSxnQkFBTCxHQUF3QixLQUFLQSxnQkFBTCxDQUFzQkYsSUFBdEIsQ0FBMkIsSUFBM0IsQ0FBeEI7QUFDSDs7QUFFREQscUJBQWtCSSxLQUFsQixFQUF5QkMsT0FBekIsRUFBa0NDLElBQWxDLEVBQXlDO0FBQ3JDO0FBQ0EsYUFBS0MsUUFBTCxDQUFjO0FBQ1ZDLDhCQUFrQixFQUFFSixLQUFGLEVBQVNDLE9BQVQsRUFBa0JDLElBQWxCO0FBRFIsU0FBZDtBQUdIOztBQUVESixpQkFBY08sS0FBZCxFQUFxQkMsR0FBckIsRUFBMEJMLE9BQTFCLEVBQW1DQyxJQUFuQyxFQUEwQztBQUN0QyxhQUFLQyxRQUFMLENBQWM7QUFDVkksa0JBQU07QUFESSxTQUFkO0FBR0g7O0FBRURSLHVCQUFtQjtBQUNmLGFBQUtJLFFBQUwsQ0FBYztBQUNWSSxrQkFBTTtBQURJLFNBQWQ7QUFHSDs7QUFFREMsYUFBUztBQUNMLGVBQ0k7QUFBQTtBQUFBLGNBQUssSUFBRyxxQkFBUjtBQUNJLHVFQUFDLHFFQUFELElBQVUsY0FBZ0IsS0FBS1osZ0JBQS9CLEVBQWlELFVBQVUsS0FBS0UsWUFBaEUsR0FESjtBQUdRLGlCQUFLSixLQUFMLENBQVdVLGdCQUFYLElBQ0ksMkRBQUMsNkVBQUQ7QUFDSSx1QkFBUyxLQUFLVixLQUFMLENBQVdVLGdCQUFYLENBQTRCSixLQUR6QztBQUVJLDJCQUFhLEtBQUtOLEtBQUwsQ0FBV1UsZ0JBQVgsQ0FBNEJILE9BQTVCLENBQW9DUTtBQUZyRCxjQUpaO0FBVVEsdUVBQUMsb0VBQUQsSUFBWSxNQUFNLEtBQUtmLEtBQUwsQ0FBV2EsSUFBN0IsRUFBbUMsY0FBYyxLQUFLUixnQkFBdEQ7QUFWUixTQURKO0FBZUg7QUE5QzRDLEM7Ozs7Ozs7Ozs7OztBQ0pqRDs7QUFFQTs7QUFFQTtBQUNBOzs7O0FBSUEsZUFBZTs7QUFFZjtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBLEVBQUU7O0FBRUYsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlLE1BQU1XLFFBQU4sU0FBdUIsNENBQUFwQixDQUFNQyxTQUE3QixDQUF1QztBQUNsREMsZ0JBQVlDLEtBQVosRUFBbUI7QUFDZixjQUFNQSxLQUFOO0FBQ0EsYUFBS0MsS0FBTCxHQUFhO0FBQ1RpQixvQkFBUTtBQURDLFNBQWI7QUFHQSxhQUFLQyxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsYUFBS0MsUUFBTCxHQUFnQixJQUFoQjtBQUNBO0FBQ0EsYUFBS0MsZ0JBQUwsR0FBd0IsS0FBS0EsZ0JBQUwsQ0FBc0JqQixJQUF0QixDQUEyQixJQUEzQixDQUF4QjtBQUNBLGFBQUtrQixZQUFMLEdBQW9CLEtBQUtBLFlBQUwsQ0FBa0JsQixJQUFsQixDQUF1QixJQUF2QixDQUFwQjtBQUNBLGFBQUttQixhQUFMLEdBQXFCLEtBQUtBLGFBQUwsQ0FBbUJuQixJQUFuQixDQUF3QixJQUF4QixDQUFyQjtBQUNBLGFBQUtvQixXQUFMLEdBQW1CLEtBQUtBLFdBQUwsQ0FBaUJwQixJQUFqQixDQUFzQixJQUF0QixDQUFuQjtBQUNBLGFBQUtxQixhQUFMLEdBQXFCLEtBQUtBLGFBQUwsQ0FBbUJyQixJQUFuQixDQUF3QixJQUF4QixDQUFyQjtBQUNIOztBQUVEO0FBQ0E7QUFDQWlCLHFCQUFpQkssRUFBakIsRUFBcUI7QUFDakIsYUFBS04sUUFBTCxHQUFnQk0sRUFBaEI7QUFDQSxhQUFLUCxVQUFMLEdBQWtCLElBQUksa0VBQUosQ0FBdUIsS0FBS0MsUUFBNUIsQ0FBbEI7QUFDSDs7QUFFREUsaUJBQWNiLElBQWQsRUFBb0JrQixPQUFwQixFQUE4QjtBQUMxQjtBQUNBLGNBQU1DLFlBQVlDLEVBQUUsS0FBS1QsUUFBUCxDQUFsQjtBQUNBLGNBQU1VLGVBQWUsS0FBS1gsVUFBTCxDQUFnQlksZUFBaEIsQ0FBaUN0QixJQUFqQyxFQUF1Q2tCLE9BQXZDLENBQXJCO0FBQ0FDLGtCQUFVSSxZQUFWLENBQXVCLGNBQXZCO0FBQ0EsYUFBSyxJQUFJQyxJQUFFLENBQVgsRUFBZUEsSUFBSUgsYUFBYUksTUFBaEMsRUFBd0NELEdBQXhDLEVBQTZDO0FBQ3pDTCxzQkFBVUksWUFBVixDQUF1QixnQkFBdkIsRUFBeUNGLGFBQWFHLENBQWIsQ0FBekM7QUFDSDtBQUNKOztBQUVEVCxnQkFBYWpCLEtBQWIsRUFBb0I0QixLQUFwQixFQUEyQkMsVUFBM0IsRUFBdUM1QixPQUF2QyxFQUFnRDZCLEVBQWhELEVBQW9ENUIsSUFBcEQsRUFBMkQ7QUFDdkQsWUFBSUYsTUFBTStCLEVBQVYsRUFBYTtBQUNULGlCQUFLbkIsVUFBTCxDQUFnQm9CLHFCQUFoQixDQUFzQ2hDLEtBQXRDLEVBQTZDNEIsS0FBN0MsRUFBb0RDLFVBQXBELEVBQWdFNUIsT0FBaEUsRUFBeUU2QixFQUF6RSxFQUE2RTVCLElBQTdFO0FBQ0gsU0FGRCxNQUVPO0FBQ0gyQjtBQUNIO0FBQ0o7O0FBRURYLGtCQUFlbEIsS0FBZixFQUFzQjRCLEtBQXRCLEVBQTZCQyxVQUE3QixFQUF5QzVCLE9BQXpDLEVBQWtENkIsRUFBbEQsRUFBc0Q1QixJQUF0RCxFQUE2RDtBQUN6RCxZQUFJRixNQUFNK0IsRUFBVixFQUFhO0FBQ1QsaUJBQUtuQixVQUFMLENBQWdCcUIsdUJBQWhCLENBQXdDakMsS0FBeEMsRUFBK0M0QixLQUEvQyxFQUFzREMsVUFBdEQsRUFBa0U1QixPQUFsRSxFQUEyRTZCLEVBQTNFLEVBQStFNUIsSUFBL0U7QUFDSCxTQUZELE1BRU87QUFDSDJCO0FBQ0g7QUFDSjs7QUFFRGIsa0JBQWVrQixRQUFmLEVBQXlCQyxHQUF6QixFQUErQjtBQUMzQjtBQUNBLGNBQU1DLGFBQWFDLFNBQVNILFNBQVNJLFFBQWxCLEtBQStCLENBQWxEO0FBQ0EsWUFBS0YsVUFBTCxFQUFrQjtBQUNkO0FBQ0FELGdCQUFJSSxRQUFKLENBQWEsYUFBYjtBQUNIO0FBQ0o7O0FBRURDLHdCQUFvQixDQUVuQjs7QUFFRGhDLGFBQVM7QUFDTDs7Ozs7O0FBTUEsZUFDSTtBQUFBO0FBQUEsY0FBSyxJQUFHLG9CQUFSO0FBQ0ksdUVBQUMscURBQUQsSUFBYyxhQUFhLEtBQUtNO0FBQzVCO0FBREosa0JBRUksSUFBSyxVQUZUO0FBR0ksNkJBQWMsVUFIbEI7QUFJSSx3QkFBUyxRQUpiO0FBS0ksd0JBQVU7QUFDTjJCLDBCQUFNLGlCQURBO0FBRU5DLDRCQUFRLE9BRkY7QUFHTkMsMkJBQU87QUFIRDtBQUtWO0FBVkosa0JBV0ksWUFBYztBQUNWQywyQkFBTyxJQURHO0FBRVZDLDJCQUFPLEdBRkc7QUFHVkMsMEJBQU0sR0FISTtBQUlWQyx5QkFBSyxHQUpLO0FBS1ZDLDBCQUFNO0FBTEksaUJBWGxCO0FBa0JJLDRCQUFjLENBQ1YsSUFEVSxFQUNKLElBREksRUFDRSxJQURGLEVBQ1EsSUFEUixFQUVWLElBRlUsRUFFSixJQUZJLEVBRUUsSUFGRixFQUVRLElBRlIsRUFHVixJQUhVLEVBR0osS0FISSxFQUdHLEtBSEgsRUFHVSxLQUhWLENBbEJsQjtBQXVCSSxpQ0FBbUIsQ0FDZixJQURlLEVBQ1QsSUFEUyxFQUNILElBREcsRUFDRyxJQURILEVBRWYsSUFGZSxFQUVULElBRlMsRUFFSCxJQUZHLEVBRUcsSUFGSCxFQUdmLElBSGUsRUFHVCxLQUhTLEVBR0YsS0FIRSxFQUdLLEtBSEwsQ0F2QnZCO0FBNEJJLDBCQUFZLENBQ1IsSUFEUSxFQUNGLElBREUsRUFDSSxJQURKLEVBQ1UsSUFEVixFQUNnQixJQURoQixFQUNzQixJQUR0QixFQUM0QixJQUQ1QixDQTVCaEI7QUErQkksK0JBQWlCLENBQ2IsSUFEYSxFQUNQLElBRE8sRUFDRCxJQURDLEVBQ0ssSUFETCxFQUNXLElBRFgsRUFDaUIsSUFEakIsRUFDdUIsSUFEdkIsQ0EvQnJCO0FBa0NJLDRCQUFhO0FBQ2I7QUFuQ0osa0JBb0NJLGFBQWMsWUFwQ2xCO0FBcUNJLDhCQUFnQixJQXJDcEI7QUFzQ0ksMEJBQVksQ0F0Q2hCO0FBdUNJLHVCQUFTO0FBQ0xDLDRCQUFRO0FBQ0pDLGlDQUFTLFVBREw7QUFFSkMseUNBQWlCO0FBRmI7QUFESCxpQkF2Q2I7QUE2Q0ksMEJBQVcsSUE3Q2Y7QUE4Q0ksK0JBQWlCLEtBOUNyQjtBQStDSSw0QkFBYTtBQUNiO0FBaERKLGtCQWlESSxZQUFjLElBakRsQjtBQWtESSw4QkFBZ0IsSUFsRHBCO0FBbURJLDBCQUFZLElBbkRoQjtBQW9ESSxvQ0FBc0I7QUFDdEI7QUFyREosa0JBc0RJLGdCQUFpQixVQXREckI7QUF1REksNkJBQWU7QUFDWCw2QkFBUyxFQURFO0FBRVgsa0NBQWMsQ0FGSDtBQUdYLGlDQUFhO0FBSEY7QUFLZjtBQTVESixrQkE2REksUUFBVSxLQUFLMUQsS0FBTCxDQUFXMkQsUUE3RHpCO0FBOERJLDRCQUFjLEtBQUtyQyxZQTlEdkI7QUErREksNkJBQWUsS0FBS0MsYUEvRHhCO0FBZ0VJLDRCQUFjLEtBQUt2QixLQUFMLENBQVc0RCxZQWhFN0I7QUFpRUksMkJBQWEsS0FBS3BDLFdBakV0QjtBQWtFSSw2QkFBZSxLQUFLQztBQWxFeEI7QUFESixTQURKO0FBd0VIO0FBN0lpRCxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1B0RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFNb0Msd0JBQU4sQ0FBOEI7QUFDN0I5RCxlQUFhLENBRVo7O0FBRUQrRCxhQUFZQyxVQUFaLEVBQXVCO0FBQ3RCLE1BQUlDLGNBQWMsRUFBbEI7QUFDQSxPQUFLLE1BQU1DLEdBQVgsSUFBa0JGLFVBQWxCLEVBQThCO0FBQ3hCLE9BQUlBLFdBQVdHLGNBQVgsQ0FBMEJELEdBQTFCLENBQUosRUFBb0M7QUFDbENELGdCQUFZQyxHQUFaLElBQW1CRixXQUFXRSxHQUFYLENBQW5CO0FBQ0Q7QUFDSDtBQUNELFNBQU9ELFdBQVA7QUFDSDtBQWI0Qjs7QUFnQmYsTUFBTUcsWUFBTixTQUEyQiw0Q0FBQXRFLENBQU1DLFNBQWpDLENBQTBDO0FBQ3hEQyxlQUFhO0FBQ1o7QUFDQSxPQUFLcUUsRUFBTCxHQUFVLDZDQUFBdkMsQ0FBRXdDLFVBQUYsRUFBVjtBQUNBLE9BQUtDLHdCQUFMLEdBQWdDLElBQUlULHdCQUFKLEVBQWhDO0FBQ0EsT0FBS1UsSUFBTCxHQUFZLElBQVo7QUFDQSxPQUFLQyxRQUFMLEdBQWdCLElBQWhCO0FBQ0EsT0FBS0MsSUFBTCxHQUFZLElBQUlDLElBQUosRUFBWjtBQUNBOztBQUVEM0IscUJBQW1CO0FBQ2xCLFFBQU00Qix1QkFBdUIsS0FBS0wsd0JBQUwsQ0FBOEJSLFdBQTlCLENBQTBDLEtBQUs5RCxLQUEvQyxDQUE3QjtBQUNBLE9BQUt3RSxRQUFMLEdBQWdCLEtBQUtKLEVBQUwsQ0FBUyxJQUFHLEtBQUtHLElBQUssRUFBdEIsRUFBeUJ2QyxZQUF6QixDQUFzQzJDLG9CQUF0QyxDQUFoQjtBQUNBOztBQUVDQywyQkFBMEJDLFNBQTFCLEVBQW9DO0FBQ3JDOzs7OztBQUtBOztBQUVEOUQsVUFBUTtBQUNQLE9BQUt3RCxJQUFMLEdBQVksS0FBS3ZFLEtBQUwsQ0FBV3NDLEVBQVgsSUFBaUIsT0FBTyxLQUFLbUMsSUFBTCxDQUFVSyxPQUFWLEVBQXBDO0FBQ0EsU0FDQyxvRUFBSyxJQUFJLEtBQUtQLElBQWQsRUFBb0IsS0FBSyxLQUFLdkUsS0FBTCxDQUFXK0UsV0FBcEMsR0FERDtBQUdBO0FBNUJ1RCxDOzs7Ozs7Ozs7Ozs7QUNwQnpEOztBQUVBOztBQUVBO0FBQ0E7Ozs7QUFJQSxlQUFlOztBQUVmO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0EsRUFBRTs7QUFFRixnQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlLE1BQU1DLFlBQU4sU0FBMkIsNENBQUFuRixDQUFNQyxTQUFqQyxDQUEyQztBQUN0REMsZ0JBQVlDLEtBQVosRUFBbUI7QUFDZixjQUFNQSxLQUFOO0FBQ0EsYUFBS2lGLFVBQUwsR0FBa0IsSUFBbEI7QUFDQSxhQUFLQyxjQUFMLEdBQXNCLElBQXRCO0FBQ0EsYUFBS0MsWUFBTCxHQUFvQixJQUFJLDREQUFKLEVBQXBCO0FBQ0E7QUFDQSxhQUFLbEYsS0FBTCxHQUFhO0FBQ1RtRiwwQkFBYztBQUVsQjtBQUhhLFNBQWIsQ0FJQSxLQUFLQyxRQUFMLEdBQWdCLEtBQUtBLFFBQUwsQ0FBY2pGLElBQWQsQ0FBbUIsSUFBbkIsQ0FBaEI7QUFDQSxhQUFLa0YsaUJBQUwsR0FBeUIsS0FBS0EsaUJBQUwsQ0FBdUJsRixJQUF2QixDQUE0QixJQUE1QixDQUF6QjtBQUNBLGFBQUttRixpQkFBTCxHQUF5QixLQUFLQSxpQkFBTCxDQUF1Qm5GLElBQXZCLENBQTRCLElBQTVCLENBQXpCO0FBQ0EsYUFBS29GLGtCQUFMLEdBQTBCLEtBQUtBLGtCQUFMLENBQXdCcEYsSUFBeEIsQ0FBNkIsSUFBN0IsQ0FBMUI7QUFDQSxhQUFLcUYsc0JBQUwsR0FBOEIsS0FBS0Esc0JBQUwsQ0FBNEJyRixJQUE1QixDQUFpQyxJQUFqQyxDQUE5QjtBQUNBLGFBQUtzRixxQkFBTCxHQUE2QixLQUFLQSxxQkFBTCxDQUEyQnRGLElBQTNCLENBQWdDLElBQWhDLENBQTdCO0FBQ0EsYUFBS3VGLHdCQUFMLEdBQWdDLEtBQUtBLHdCQUFMLENBQThCdkYsSUFBOUIsQ0FBbUMsSUFBbkMsQ0FBaEM7QUFDQSxhQUFLd0YsdUJBQUwsR0FBK0IsS0FBS0EsdUJBQUwsQ0FBNkJ4RixJQUE3QixDQUFrQyxJQUFsQyxDQUEvQjtBQUNIOztBQUVEO0FBQ0E7O0FBRUFpRixhQUFTUSxDQUFULEVBQVk7QUFDUjtBQUNJO0FBQ0EsU0FBQ2hFLEVBQUUsS0FBSzdCLEtBQUwsQ0FBVzhGLFNBQWIsRUFBd0JDLEVBQXhCLENBQTJCRixFQUFFN0UsTUFBN0IsQ0FBRDtBQUNBO0FBQ0FhLFVBQUUsS0FBSzdCLEtBQUwsQ0FBVzhGLFNBQWIsRUFBd0JFLEdBQXhCLENBQTRCSCxFQUFFN0UsTUFBOUIsRUFBc0NrQixNQUF0QyxLQUFpRCxDQUZqRDtBQUdBO0FBQ0EsU0FBQ0wsRUFBRSxLQUFLb0QsVUFBUCxFQUFtQmMsRUFBbkIsQ0FBc0JGLEVBQUU3RSxNQUF4QixDQUpEO0FBS0E7QUFDQWEsVUFBRSxLQUFLb0QsVUFBUCxFQUFtQmUsR0FBbkIsQ0FBdUJILEVBQUU3RSxNQUF6QixFQUFpQ2tCLE1BQWpDLEtBQTRDLENBUmhELEVBU0U7QUFDRSxpQkFBSytELElBQUw7QUFDSDtBQUNKOztBQUVEQSxXQUFPO0FBQ0gsY0FBTUMsT0FBTyxJQUFiO0FBQ0EsZUFBTyxJQUFJQyxPQUFKLENBQVksVUFBU0MsT0FBVCxFQUFrQkMsTUFBbEIsRUFBeUI7QUFDeEN4RSxjQUFFcUUsS0FBS2pCLFVBQVAsRUFBbUJnQixJQUFuQixDQUF3QixDQUF4QixFQUEyQixJQUEzQixFQUFpQ0csT0FBakM7QUFDSCxTQUZNLENBQVA7QUFJSDs7QUFFRHRGLFdBQU87QUFDSCxjQUFNb0YsT0FBTyxJQUFiO0FBQ0EsZUFBTyxJQUFJQyxPQUFKLENBQVksVUFBU0MsT0FBVCxFQUFrQkMsTUFBbEIsRUFBeUI7QUFDeEN4RSxjQUFFcUUsS0FBS2pCLFVBQVAsRUFBbUJxQixNQUFuQixDQUEwQixHQUExQixFQUErQixJQUEvQixFQUFxQ0YsT0FBckM7QUFDSCxTQUZNLENBQVA7QUFHSDs7QUFFRDtBQUNBOztBQUVBZCxzQkFBa0JPLENBQWxCLEVBQXFCO0FBQ2pCO0FBQ0EsY0FBTVUsV0FBV1YsRUFBRTdFLE1BQUYsQ0FBU3dGLEtBQTFCO0FBQ0EsYUFBSzlGLFFBQUwsQ0FBYyxVQUFTK0YsU0FBVCxFQUFvQnpHLEtBQXBCLEVBQTJCO0FBQ3JDO0FBQ0Esa0JBQU1vRixlQUFlc0IsT0FBT0MsTUFBUCxDQUFjRixVQUFVckIsWUFBeEIsQ0FBckI7QUFDQUEseUJBQWF3QixLQUFiLEdBQXFCTCxRQUFyQjtBQUNBLG1CQUFPLEVBQUVuQixZQUFGLEVBQVA7QUFDSCxTQUxEO0FBTUg7O0FBRURHLHNCQUFrQk0sQ0FBbEIsRUFBcUI7QUFDakIsY0FBTWdCLFdBQVdoQixFQUFFN0UsTUFBRixDQUFTd0YsS0FBMUI7QUFDQU0sZ0JBQVFDLEdBQVIsQ0FBWUYsUUFBWjtBQUNIOztBQUVERyxzQkFBa0JuQixDQUFsQixFQUFxQixDQUVwQjtBQURHOzs7QUFHSjs7QUFFQUwsdUJBQW1CSyxDQUFuQixFQUFzQjtBQUNsQixhQUFLSSxJQUFMLEdBQVlnQixJQUFaLENBQ0tDLEdBQUQsSUFBUyxLQUFLL0IsWUFBTCxDQUFrQmdDLGNBQWxCLENBQWlDLEtBQUtuSCxLQUFMLENBQVdPLEtBQTVDLEVBQW1ELEtBQUtOLEtBQUwsQ0FBV21GLFlBQTlELENBRGI7QUFHSDs7QUFFREssMkJBQXVCSSxDQUF2QixFQUEwQjtBQUN0QixhQUFLSSxJQUFMLEdBQVlnQixJQUFaLENBQ0tDLEdBQUQsSUFBUyxLQUFLL0IsWUFBTCxDQUFrQmlDLGtCQUFsQixDQUFxQyxLQUFLcEgsS0FBTCxDQUFXTyxLQUFoRCxDQURiO0FBR0g7O0FBRURtRiwwQkFBc0JHLENBQXRCLEVBQXlCO0FBQ3JCLGFBQUtJLElBQUwsR0FBWWdCLElBQVosQ0FDS0MsR0FBRCxJQUFTLEtBQUsvQixZQUFMLENBQWtCa0MsaUJBQWxCLENBQW9DLEtBQUtySCxLQUFMLENBQVdPLEtBQS9DLENBRGI7QUFHSDs7QUFFRG9GLDZCQUF5QkUsQ0FBekIsRUFBNEI7QUFDeEIsYUFBS0ksSUFBTCxHQUFZZ0IsSUFBWixDQUNLQyxHQUFELElBQVMsS0FBSy9CLFlBQUwsQ0FBa0JtQyxvQkFBbEIsQ0FBdUMsS0FBS3RILEtBQUwsQ0FBV08sS0FBbEQsQ0FEYjtBQUdIOztBQUVEcUYsNEJBQXdCQyxDQUF4QixFQUEyQjtBQUN2QixhQUFLSSxJQUFMLEdBQVlnQixJQUFaLENBQ0tDLEdBQUQsSUFBUyxLQUFLL0IsWUFBTCxDQUFrQm9DLG1CQUFsQixDQUFzQyxLQUFLdkgsS0FBTCxDQUFXTyxLQUFqRCxDQURiO0FBR0g7O0FBRUQ7QUFDQTs7QUFFQXdDLHdCQUFvQjtBQUNoQjtBQUNBLGFBQUttQyxjQUFMLEdBQXNCLElBQUksaURBQUosQ0FBVyxLQUFLbEYsS0FBTCxDQUFXOEYsU0FBdEIsRUFBaUMsS0FBS2IsVUFBdEMsRUFBa0Q7QUFDN0V1Qyx1QkFBVyxNQURrRTtBQUU3RUMsdUJBQVc7QUFDVkMsdUJBQU87QUFDTC9GLDZCQUFTO0FBREo7QUFERztBQUZrRSxTQUFsRCxDQUF0QjtBQVFBO0FBQ0FFLFVBQUU4RixRQUFGLEVBQVlDLEdBQVosQ0FBZ0IsT0FBaEIsRUFBeUIsS0FBS3ZDLFFBQTlCLEVBQXdDd0MsRUFBeEMsQ0FBMkMsT0FBM0MsRUFBb0QsS0FBS3hDLFFBQXpEO0FBQ0E7QUFDQSxhQUFLdkUsSUFBTDtBQUVIOztBQUVEZ0gsdUJBQW1CQyxTQUFuQixFQUE4QnRCLFNBQTlCLEVBQXlDdUIsUUFBekMsRUFBbUQ7QUFDL0M7QUFDQSxhQUFLbEgsSUFBTDtBQUNIOztBQUVEbUgsMEJBQXNCcEQsU0FBdEIsRUFBaUNxRCxTQUFqQyxFQUE0QztBQUN4QztBQUNBLFlBQUtyRCxhQUFhLEtBQUs3RSxLQUF2QixFQUErQjtBQUMzQjtBQUNBLGlCQUFLaUcsSUFBTCxHQUFZZ0IsSUFBWixDQUFtQkMsR0FBRCxJQUFTO0FBQ3ZCO0FBQ0EscUJBQUtoQyxjQUFMLENBQW9CWSxTQUFwQixHQUFnQ2pCLFVBQVVpQixTQUExQztBQUNBLHFCQUFLWixjQUFMLENBQW9CaUQsTUFBcEI7QUFDSCxhQUpEO0FBS0EsaUJBQUtySCxJQUFMO0FBQ0g7O0FBRUQ7QUFDQSxlQUFPLElBQVA7QUFDSDs7QUFFREMsYUFBUztBQUNMLGNBQU1xSCxhQUFhLEtBQUtwSSxLQUFMLENBQVdPLEtBQVgsQ0FBaUJLLEtBQWpCLENBQXVCeUgsTUFBdkIsQ0FBOEIscUJBQTlCLENBQW5CO0FBQ0EsY0FBTUMsYUFBYSxLQUFLdEksS0FBTCxDQUFXTyxLQUFYLENBQWlCZ0ksZUFBcEM7QUFDQSxlQUNJO0FBQUE7QUFBQSxjQUFLLFdBQVUsWUFBZjtBQUNRLHVCQUFPLEVBQUNDLFNBQVMsTUFBVixFQURmO0FBRVEscUJBQU1DLEdBQUQsSUFBUyxLQUFLeEQsVUFBTCxHQUFrQndELEdBRnhDO0FBR0ksZ0ZBQUssV0FBVSxPQUFmLEdBSEo7QUFJSTtBQUFBO0FBQUEsa0JBQUssV0FBVSxtQkFBZjtBQUNJLDJFQUFDLDBEQUFEO0FBQ0kseUJBQUssS0FBS3pJLEtBQUwsQ0FBV08sS0FBWCxDQUFpQitCLEVBRDFCO0FBRUksZ0NBQVksS0FBS3RDLEtBQUwsQ0FBV08sS0FBWCxDQUFpQnFHLEtBRmpDO0FBR0ksbUNBQWUsS0FBS3RCLGlCQUh4QjtBQUlJLGdDQUFXLDJCQUpmO0FBREosYUFKSjtBQVdJO0FBQUE7QUFBQSxrQkFBSyxXQUFVLGlCQUFmO0FBQ0k7QUFBQyx3RUFBRDtBQUFBLHNCQUFNLGdCQUFOLEVBQWlCLElBQUcsMkJBQXBCO0FBQ0ksK0VBQUMsNERBQUQsSUFBZ0IsZ0JBQWhCLEVBQTJCLGNBQTNCLEVBQW9DLElBQUsseUJBQXpDO0FBQ0ksK0JBQU8sa0VBQUcsV0FBVSwyQkFBYixHQURYO0FBRUksK0JBQU84QyxVQUZYO0FBR0ksdUNBQWUsS0FBS3BCO0FBSHhCLHNCQURKO0FBTUksK0VBQUMseURBQUQsSUFBYSxnQkFBYixFQUF3QixJQUFLLDBCQUE3QjtBQUNJLCtCQUFPLGtFQUFHLFdBQVUsMEJBQWIsR0FEWDtBQUVJLCtCQUFPc0IsVUFGWDtBQUdJLHVDQUFlLEtBQUsvQztBQUh4QjtBQU5KLGlCQURKO0FBYUksMkVBQUMsdURBQUQ7QUFDSSxtQ0FBZSxDQUFDLENBQUMsS0FBS3RGLEtBQUwsQ0FBV21GLFlBQVgsQ0FBd0J3QixLQUQ3QztBQUVJLG9DQUFnQixLQUFLcEIsa0JBRnpCO0FBR0ksd0NBQW9CLEtBQUtDLHNCQUg3QjtBQUlJLHVDQUFtQixLQUFLQyxxQkFKNUI7QUFLSSwwQ0FBc0IsS0FBS0Msd0JBTC9CO0FBTUkseUNBQXFCLEtBQUtDO0FBTjlCO0FBYko7QUFYSixTQURKO0FBb0NIO0FBN0xxRCxDOzs7Ozs7Ozs7Ozs7O0FDVDFEOztBQUVBOztBQUVBO0FBQ0E7Ozs7QUFJQSxlQUFlOztBQUVmO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0EsRUFBRTs7QUFFRixnQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVDQTtBQUNBOztBQUVlLE1BQU04QyxlQUFOLFNBQThCLDRDQUFBN0ksQ0FBTUMsU0FBcEMsQ0FBOEM7O0FBRXpEQyxnQkFBWUMsS0FBWixFQUFtQjtBQUNmLGNBQU1BLEtBQU47QUFDQTtBQUNBLGFBQUtDLEtBQUwsR0FBYTtBQUNUdUcsbUJBQU8sS0FBS3hHLEtBQUwsQ0FBVzJJO0FBRXRCO0FBSGEsU0FBYixDQUlBLEtBQUtDLFlBQUwsR0FBb0IsS0FBS0EsWUFBTCxDQUFrQnhJLElBQWxCLENBQXVCLElBQXZCLENBQXBCO0FBQ0g7O0FBRUR3SSxpQkFBYS9DLENBQWIsRUFBZ0I7QUFDWjtBQUNBLGFBQUtuRixRQUFMLENBQWMsRUFBQzhGLE9BQU9YLEVBQUU3RSxNQUFGLENBQVN3RixLQUFqQixFQUFkO0FBQ0E7QUFDQSxhQUFLeEcsS0FBTCxDQUFXNkksYUFBWCxDQUF5QmhELENBQXpCO0FBQ0g7O0FBRUQ5RSxhQUFTO0FBQ0wsZUFDSSxzRUFBTyxNQUFLLE1BQVosRUFBbUIsSUFBRywwQkFBdEI7QUFDSSxxQkFBUyxLQUFLZixLQUFMLENBQVc4SSxVQUR4QjtBQUVJLHVCQUFVLFlBRmQ7QUFHSSxtQkFBTyxLQUFLN0ksS0FBTCxDQUFXdUcsS0FIdEI7QUFJSSxzQkFBVSxLQUFLb0M7QUFKbkIsVUFESjtBQVFIOztBQTVCd0QsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0g3RDtBQUNBO0FBQ0E7O0FBRWUsTUFBTUcsY0FBTixTQUE2Qiw0Q0FBQWxKLENBQU1DLFNBQW5DLENBQTZDOztBQUV4RGlCLGFBQVM7QUFDTDtBQUNBLGVBQ0k7QUFBQyx5RUFBRDtBQUFBO0FBQ0k7QUFBQywyRUFBRDtBQUFBO0FBQ0k7QUFBQywwRUFBRDtBQUFBLHNCQUFRLElBQUcsb0JBQVg7QUFDSSxpQ0FBUyxLQUFLZixLQUFMLENBQVdtSCxjQUR4QjtBQUVJLGtDQUFVLENBQUMsS0FBS25ILEtBQUwsQ0FBV2dKLGFBRjFCO0FBQUE7QUFBQSxpQkFESjtBQU1JO0FBQUMsMEVBQUQ7QUFBQSxzQkFBUSxJQUFHLHNCQUFYO0FBQ0ksaUNBQVMsS0FBS2hKLEtBQUwsQ0FBV29ILGtCQUR4QjtBQUFBO0FBQUEsaUJBTko7QUFVSTtBQUFDLDBFQUFEO0FBQUEsc0JBQVEsSUFBRyxvQkFBWDtBQUFBO0FBQUEsaUJBVko7QUFhSTtBQUFDLCtFQUFEO0FBQUEsc0JBQWEsZUFBYjtBQUNJLCtCQUFNLGNBRFY7QUFFSSw0QkFBRyxzQkFGUDtBQUdJLGlDQUFTLEtBQUtwSCxLQUFMLENBQVdzSCxvQkFIeEI7QUFJSTtBQUFDLGdGQUFEO0FBQUE7QUFDSSxzQ0FBUyxHQURiO0FBRUksZ0NBQUcsNEJBRlA7QUFHSSxxQ0FBUyxLQUFLdEgsS0FBTCxDQUFXcUgsaUJBSHhCO0FBQUE7QUFBQSxxQkFKSjtBQVVJO0FBQUMsZ0ZBQUQ7QUFBQTtBQUNJLHNDQUFTLEdBRGI7QUFFSSxnQ0FBRyw4QkFGUDtBQUdJLHFDQUFTLEtBQUtySCxLQUFMLENBQVd1SCxtQkFIeEI7QUFBQTtBQUFBO0FBVko7QUFiSjtBQURKLFNBREo7QUFtQ0g7QUF2Q3VELEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0o1RDtBQUNBO0FBQ0E7QUFDQSxNQUFNMEIsU0FBUyxtQkFBQUMsQ0FBUSwwRUFBUixDQUFmO0FBQ0E7O0FBRUE7QUFDQUQsT0FBT0UsU0FBUCxDQUFpQkMsUUFBakIsR0FBNEIsWUFBVztBQUNuQyxRQUFLLENBQUMsS0FBS0MsWUFBWCxFQUEwQjtBQUN0QjtBQUNIO0FBQ0QsU0FBTSxJQUFJcEgsSUFBRSxDQUFaLEVBQWVBLElBQUksS0FBS29ILFlBQUwsQ0FBa0JuSCxNQUFyQyxFQUE2Q0QsR0FBN0MsRUFBbUQ7QUFDL0MsWUFBSXFILE9BQU8sS0FBS0QsWUFBTCxDQUFrQnBILENBQWxCLENBQVg7QUFDQSxZQUFJc0gsV0FBV0QsS0FBS0UsUUFBTCxJQUFpQixPQUFqQixHQUEyQixPQUEzQixHQUFxQyxhQUFwRDtBQUNBO0FBQ0EsWUFBS0YsS0FBSzlDLEtBQUwsSUFBYyxLQUFLaUQsS0FBeEIsRUFBZ0M7QUFDNUJILGlCQUFNQyxRQUFOLElBQW1CLEtBQUtFLEtBQXhCO0FBQ0FILGlCQUFLSSxhQUFMLENBQW1CLElBQUlDLEtBQUosQ0FBVSxRQUFWLENBQW5CO0FBQ0g7QUFDSjtBQUNKLENBYkQ7O0FBZWUsTUFBTUMsV0FBTixTQUEwQiw0Q0FBQS9KLENBQU1DLFNBQWhDLENBQTBDO0FBQ3JEQyxnQkFBWUMsS0FBWixFQUFtQjtBQUNmLGNBQU1BLEtBQU47QUFDSDs7QUFFRDs7QUFFQStDLHdCQUFvQjtBQUNoQjtBQUNBLGFBQUs4RyxLQUFMLEdBQWEsZ0RBQUFDLENBQVNDLFdBQVQsQ0FBcUIsS0FBS0MsZ0JBQTFCLENBQWI7QUFDQSxhQUFLQyxjQUFMLEdBQXNCLElBQUloQixNQUFKLENBQVcsS0FBS1ksS0FBaEIsRUFBdUI7QUFDekNLLHdCQUFZLEtBRDZCLEVBQ3RCO0FBQ25CQyxxQkFBUyxJQUZnQyxFQUUxQjtBQUNmQyx3QkFBWSxJQUg2QixFQUd2QjtBQUNsQkMsa0JBQU0sRUFKbUMsRUFJL0I7QUFDVkMsa0JBQU0sQ0FMbUMsRUFLaEM7QUFDVEMsb0JBQVEsQ0FOaUMsRUFNOUI7QUFDWEMseUJBQWEsQ0FQNEIsRUFPekI7QUFDaEJDLHNCQUFVLEtBUitCLEVBUXhCO0FBQ2pCQyx1QkFBVyxJQVQ4QixFQVN4QjtBQUNqQkMsMEJBQWMsQ0FDVixTQURVLEVBQ0MsU0FERCxFQUNZLFNBRFosRUFFVixTQUZVLEVBRUMsU0FGRCxFQUVZLFNBRlosRUFHVixTQUhVLEVBR0MsU0FIRCxFQUdZLFNBSFosRUFJVixTQUpVLEVBSUMsU0FKRCxFQUlZLFNBSlo7QUFWMkIsU0FBdkIsQ0FBdEI7QUFpQkg7O0FBRUQ1SixhQUFTO0FBQ0w7QUFDQSxjQUFNNkosZUFBZSxLQUFLNUssS0FBTCxDQUFXNkssVUFBaEM7QUFDQSxjQUFNQyxtQkFDRiwyREFBQywyREFBRCxJQUFhLE1BQUssTUFBbEI7QUFDSSxpQkFBTXRHLFFBQUQsSUFBYyxLQUFLd0YsZ0JBQUwsR0FBd0J4RixRQUQvQztBQUVJLG1CQUFPLEtBQUt4RSxLQUFMLENBQVd3RyxLQUZ0QixDQUU2QjtBQUY3QixjQUdJLE9BQU8sRUFBRTtBQUNMK0IsaUNBQWtCLEdBQUUsS0FBS3ZJLEtBQUwsQ0FBV3dHLEtBQU07QUFEbEMsYUFIWDtBQU1JLHNCQUFVLEtBQUt4RyxLQUFMLENBQVcrSyxRQU56QjtBQU9JLHNCQUFXbEYsQ0FBRCxJQUFLaUIsUUFBUUMsR0FBUixDQUFZbEIsQ0FBWjtBQVBuQixVQURKO0FBV0EsWUFBSStFLFlBQUosRUFBa0I7QUFDZCxtQkFDSTtBQUFDLHlFQUFEO0FBQUEsa0JBQVcsV0FBVyxLQUFLNUssS0FBTCxDQUFXc0MsRUFBakM7QUFDSTtBQUFDLHVFQUFEO0FBQUEsc0JBQUssZ0JBQWdCLDREQUFyQixFQUFtQyxJQUFJLENBQXZDO0FBQ0sseUJBQUt0QyxLQUFMLENBQVdnTDtBQURoQixpQkFESjtBQUlJO0FBQUMsdUVBQUQ7QUFBQSxzQkFBSyxJQUFJLEVBQVQ7QUFDS0Y7QUFETDtBQUpKLGFBREo7QUFVSCxTQVhELE1BV087QUFDSCxtQkFDSTtBQUFDLHlFQUFEO0FBQUEsa0JBQVcsV0FBVyxLQUFLOUssS0FBTCxDQUFXc0MsRUFBakM7QUFDSTtBQUFDLGdGQUFEO0FBQUE7QUFBZSx5QkFBS3RDLEtBQUwsQ0FBV2dMO0FBQTFCLGlCQURKO0FBRUtGO0FBRkwsYUFESjtBQU1IO0FBRUo7QUEvRG9ELEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEJ6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlLE1BQU1HLGNBQU4sU0FBNkIsNENBQUFwTCxDQUFNQyxTQUFuQyxDQUE2QztBQUN4REMsZ0JBQVlDLEtBQVosRUFBbUI7QUFDZixjQUFNQSxLQUFOO0FBQ0g7O0FBRUQrQyx3QkFBb0I7QUFDaEI7QUFDQSxhQUFLOEcsS0FBTCxHQUFhLGdEQUFBQyxDQUFTQyxXQUFULENBQXFCLEtBQUtDLGdCQUExQixDQUFiO0FBQ0FuSSxVQUFFLEtBQUtnSSxLQUFQLEVBQWNxQixjQUFkLENBQTZCO0FBQ3pCN0Msb0JBQVE7QUFEaUIsU0FBN0I7QUFHSDs7QUFFRHRILGFBQVM7QUFDTCxjQUFNNkosZUFBZSxLQUFLNUssS0FBTCxDQUFXNkssVUFBaEM7QUFDQSxjQUFNTSxrQkFDRiwyREFBQywyREFBRCxJQUFhLE1BQUssTUFBbEI7QUFDSSxpQkFBTTNHLFFBQUQsSUFBYyxLQUFLd0YsZ0JBQUwsR0FBd0J4RixRQUQvQztBQUVJLG1CQUFPLEtBQUt4RSxLQUFMLENBQVd3RyxLQUZ0QjtBQUdJLHNCQUFVLEtBQUt4RyxLQUFMLENBQVcrSyxRQUh6QjtBQUlJLHNCQUFVLEtBQUsvSyxLQUFMLENBQVdvTDtBQUp6QixVQURKO0FBUUEsWUFBSVIsWUFBSixFQUFrQjtBQUNkLG1CQUNJO0FBQUMseUVBQUQ7QUFBQSxrQkFBVyxXQUFXLEtBQUs1SyxLQUFMLENBQVdzQyxFQUFqQztBQUNJO0FBQUMsdUVBQUQ7QUFBQSxzQkFBSyxnQkFBZ0IsNERBQXJCLEVBQW1DLElBQUksQ0FBdkM7QUFDSyx5QkFBS3RDLEtBQUwsQ0FBV2dMO0FBRGhCLGlCQURKO0FBSUk7QUFBQyx1RUFBRDtBQUFBLHNCQUFLLElBQUksRUFBVDtBQUNLRztBQURMO0FBSkosYUFESjtBQVVILFNBWEQsTUFXTztBQUNILG1CQUNJO0FBQUMseUVBQUQ7QUFBQSxrQkFBVyxXQUFXLEtBQUtuTCxLQUFMLENBQVdzQyxFQUFqQztBQUNJO0FBQUMsZ0ZBQUQ7QUFBQTtBQUFlLHlCQUFLdEMsS0FBTCxDQUFXZ0w7QUFBMUIsaUJBREo7QUFFS0c7QUFGTCxhQURKO0FBTUg7QUFFSjtBQTNDdUQsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVDVEO0FBQ0E7O0FBRWUsTUFBTUUsVUFBTixTQUF5Qiw0Q0FBQXhMLENBQU1DLFNBQS9CLENBQXlDOztBQUVwRGlCLGFBQVM7QUFDTCxlQUNJO0FBQUMsaUVBQUQ7QUFBQSxjQUFPLE1BQU0sS0FBS2YsS0FBTCxDQUFXYyxJQUF4QixFQUE4QixRQUFRLEtBQUtkLEtBQUwsQ0FBV3NMLFlBQWpEO0FBQ0k7QUFBQyxtRUFBRCxDQUFLLFNBQUw7QUFBQSxrQkFBZSxJQUFHLG9CQUFsQixFQUF1QyxrQkFBaUIsR0FBeEQ7QUFDSTtBQUFDLHVFQUFEO0FBQUEsc0JBQUssV0FBVSxVQUFmO0FBQ0k7QUFBQywyRUFBRDtBQUFBLDBCQUFLLElBQUksRUFBVDtBQUNJO0FBQUMsaUZBQUQsQ0FBTyxNQUFQO0FBQUE7QUFDSSx1Q0FBTyxFQUFDQyxjQUFjLE1BQWYsRUFBdUJDLFNBQVMsR0FBaEMsRUFEWDtBQUVJO0FBQUMsbUZBQUQ7QUFBQSxrQ0FBSyxTQUFRLE1BQWI7QUFDSSwyQ0FBTyxFQUFDQSxTQUFTLGtCQUFWLEVBRFg7QUFFSSwyRkFBQywyREFBRDtBQUNJLDZDQUFTLEtBQUt4TCxLQUFMLENBQVdzTDtBQUR4QixrQ0FGSjtBQUtJO0FBQUMsMkZBQUQ7QUFBQSxzQ0FBUyxVQUFTLEdBQWxCLEVBQXNCLE1BQUssZ0JBQTNCO0FBQUE7QUFBQSxpQ0FMSjtBQVFJO0FBQUMsMkZBQUQ7QUFBQSxzQ0FBUyxVQUFTLEdBQWxCLEVBQXNCLE1BQUssZ0JBQTNCO0FBQUE7QUFBQTtBQVJKO0FBRkoseUJBREo7QUFnQkk7QUFBQyxpRkFBRCxDQUFPLElBQVA7QUFBQTtBQUNJO0FBQUMsbUZBQUQsQ0FBSyxPQUFMO0FBQUEsa0NBQWEsZUFBYjtBQUNJO0FBQUMsdUZBQUQsQ0FBSyxJQUFMO0FBQUEsc0NBQVUsVUFBUyxHQUFuQjtBQUFBO0FBQUEsaUNBREo7QUFNSTtBQUFDLHVGQUFELENBQUssSUFBTDtBQUFBLHNDQUFVLFVBQVMsR0FBbkI7QUFBQTtBQUFBO0FBTko7QUFESjtBQWhCSjtBQURKO0FBREosYUFESjtBQW9DSTtBQUFDLHFFQUFELENBQU8sTUFBUDtBQUFBO0FBQ0k7QUFBQywwRUFBRDtBQUFBO0FBQUE7QUFBQTtBQURKO0FBcENKLFNBREo7QUEwQ0g7QUE3Q21ELEM7Ozs7Ozs7Ozs7OztBQ0Z4RDs7QUFFQTs7QUFFQTtBQUNBOzs7O0FBSUEsZUFBZTs7QUFFZjtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBLEVBQUU7O0FBRUYsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0RBQUF4QixDQUFTL0ksTUFBVCxDQUFnQiwyREFBQyw0Q0FBRCxPQUFoQixFQUF5QjRHLFNBQVM4RCxjQUFULENBQXdCLE1BQXhCLENBQXpCOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsTUFBTUMsYUFBTixDQUFvQjtBQUNsQzs7OztBQUlBM0wsYUFBYTRMLElBQWIsRUFBbUJ2SyxRQUFuQixFQUE4QjtBQUM3QixNQUFJLENBQUMsK0RBQUwsRUFBVyxNQUFNLElBQUl3SyxLQUFKLENBQVUsNEJBQVYsQ0FBTjtBQUNYLE9BQUtoSyxTQUFMLEdBQWlCUixXQUFXUyxFQUFFVCxRQUFGLENBQVgsR0FBeUJTLEVBQUUsV0FBRixDQUExQztBQUNBLFFBQU1nSyxPQUFPLEtBQUtDLGNBQUwsQ0FBb0JILElBQXBCLENBQWI7QUFDQSxVQUFTRSxJQUFUO0FBQ0MsUUFBSyxVQUFMO0FBQ0EsUUFBSyxtQkFBTDtBQUNDLFNBQUtFLE9BQUwsQ0FBYUosSUFBYixFQUFtQkUsSUFBbkI7QUFDQTtBQUNELFFBQUssTUFBTDtBQUNDLFFBQUk7QUFDSDtBQUNBLFdBQU1HLE1BQU0sK0RBQUFDLENBQUtDLGdCQUFMLENBQXNCUCxJQUF0QixDQUFaO0FBQ0EsV0FBTXZHLGVBQWU7QUFDcEIsc0JBQWlCNEcsSUFBSUcsYUFBSixDQUFrQixjQUFsQixDQURHO0FBRXBCLHVCQUFrQkgsSUFBSUcsYUFBSixDQUFrQixlQUFsQixDQUZFO0FBR3BCLDRCQUF1QkgsSUFBSUcsYUFBSixDQUFrQixvQkFBbEIsQ0FISDtBQUlwQix3QkFBbUJILElBQUlHLGFBQUosQ0FBa0IsZ0JBQWxCLENBSkM7QUFLcEIsNkJBQXdCSCxJQUFJRyxhQUFKLENBQWtCLHFCQUFsQixDQUxKO0FBTXBCLGdDQUEyQkgsSUFBSUcsYUFBSixDQUFrQix3QkFBbEIsQ0FOUDtBQU9wQixpQkFBWSw2Q0FBQUMsQ0FBT0osSUFBSUssV0FBWCxFQUF3QmhFLE1BQXhCLENBQStCLHFCQUEvQixDQVBRO0FBUXBCLGNBQVMyRCxJQUFJTSxJQVJPO0FBU3BCLGVBQVVOLElBQUlPLEtBVE07QUFVcEIsaUJBQVksNkNBQUFILENBQU9KLElBQUlRLFlBQVgsRUFBeUJuRSxNQUF6QixDQUFnQyxxQkFBaEM7QUFWUSxNQUFyQjtBQVlBLFVBQUswRCxPQUFMLENBQWEzRyxZQUFiLEVBQTJCLFVBQTNCO0FBQ0EsS0FoQkQsQ0FnQkUsT0FBT1MsQ0FBUCxFQUFVO0FBQUVpQixhQUFRMkYsS0FBUixDQUFjNUcsQ0FBZDtBQUFtQjtBQUNqQztBQXZCRjtBQXlCQTs7QUFFRGtHLFNBQVFKLElBQVIsRUFBY0UsSUFBZCxFQUFvQjtBQUNuQixNQUFJakwsS0FBSixFQUFXQyxHQUFYLEVBQWdCeUIsRUFBaEIsRUFBb0JvSyxPQUFwQixFQUE2QkMsTUFBN0IsRUFBcUM5SixRQUFyQyxFQUErQytKLGFBQS9DLEVBQThEQyxPQUE5RCxFQUF1RUMsTUFBdkU7QUFDQSxVQUFRakIsSUFBUjtBQUNDLFFBQUssTUFBTDtBQUNBLFFBQUssVUFBTDtBQUNDLFNBQUtrQixLQUFMLEdBQWEsS0FBS0MsVUFBTCxDQUFnQnJCLEtBQUtzQixhQUFyQixDQUFiO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQnZCLEtBQUt3QixrQkFBTCxHQUEwQixLQUFLSCxVQUFMLENBQWdCckIsS0FBS3dCLGtCQUFyQixDQUExQixHQUFxRSxLQUFLQyxvQkFBTCxFQUF2RjtBQUNBO0FBQ0E5SyxTQUFLcUosS0FBSzBCLElBQVY7QUFDQXpNLFlBQVErSyxLQUFLMkIsY0FBYjtBQUNBek0sVUFBTThLLEtBQUs0QixZQUFYO0FBQ0E7QUFDQWIsY0FBVSxLQUFLSyxLQUFMLENBQVdTLEVBQVgsR0FBa0I1SyxTQUFTLEtBQUttSyxLQUFMLENBQVdTLEVBQXBCLEtBQTJCLENBQTNCLEdBQStCLEtBQUtULEtBQUwsQ0FBV1UsQ0FBMUMsR0FBOEMscURBQUFDLENBQU9DLFVBQVAsQ0FBa0IsS0FBS1osS0FBTCxDQUFXUyxFQUE3QixFQUFpQ2xGLFVBQWpHLEdBQWdILEtBQUt5RSxLQUFMLENBQVdVLENBQXJJO0FBQ0FkLGFBQVNoQixLQUFLNEIsWUFBTCxDQUFrQkssT0FBbEIsQ0FBMEIsVUFBMUIsS0FBeUMsQ0FBQyxDQUExQyxHQUE4QyxJQUE5QyxHQUFxRCxLQUE5RDtBQUNBL0ssZUFBVyxLQUFLcUssVUFBTCxDQUFnQlcsUUFBM0I7QUFDQWpCLG9CQUFnQixLQUFLTSxVQUFMLENBQWdCWSxhQUFoQztBQUNBO0FBQ0FqQixjQUFVbEIsS0FBS29DLG1CQUFmO0FBQ0FqQixhQUFTbkIsS0FBS3FDLHNCQUFkO0FBQ0E7QUFDRCxRQUFLLG1CQUFMO0FBQ0MxTCxTQUFLcUosS0FBS3JKLEVBQVY7QUFDQTFCLFlBQVErSyxLQUFLL0ssS0FBYjtBQUNBQyxVQUFNOEssS0FBSzlLLEdBQVg7QUFDQTZMLGNBQVVmLEtBQUtwRCxlQUFmO0FBQ0FvRSxhQUFTaEIsS0FBS2dCLE1BQUwsR0FBY2hCLEtBQUtnQixNQUFuQixHQUE0QixDQUFDOUssRUFBRUcsWUFBRixDQUFlb0ssTUFBZixDQUFzQlQsS0FBSy9LLEtBQTNCLEVBQWtDcU4sT0FBbEMsRUFBdEM7QUFDQXBMLGVBQVc4SSxLQUFLOUksUUFBTCxJQUFpQixDQUE1QjtBQUNBK0osb0JBQWdCakIsS0FBS2lCLGFBQUwsSUFBc0IsRUFBdEM7QUFDQUMsY0FBVWxCLEtBQUtrQixPQUFmO0FBQ0FDLGFBQVNuQixLQUFLbUIsTUFBZDtBQUNBO0FBQ0Q7QUFDQyxVQUFNLElBQUlsQixLQUFKLENBQVUsNkJBQVYsQ0FBTjtBQUNBO0FBL0JGO0FBaUNBO0FBQ0EsT0FBS3RKLEVBQUwsR0FBVUEsRUFBVjtBQUNBLE9BQUtzRSxLQUFMLEdBQWErRSxLQUFLL0UsS0FBbEI7QUFDQTtBQUNBLE9BQUsrRixNQUFMLEdBQWNBLE1BQWQ7QUFDQTtBQUNBLE9BQUsvTCxLQUFMLEdBQWErTCxTQUFTLDZDQUFBUCxDQUFPeEwsS0FBUCxFQUFjeUgsTUFBZCxDQUFxQixZQUFyQixDQUFULEdBQThDLDZDQUFBK0QsQ0FBT3hMLEtBQVAsRUFBY3lILE1BQWQsQ0FBcUIscUJBQXJCLENBQTNEO0FBQ0EsT0FBS3hILEdBQUwsR0FBVzhMLFNBQVMsNkNBQUFQLENBQU92TCxHQUFQLEVBQVl3SCxNQUFaLENBQW1CLFlBQW5CLENBQVQsR0FBNEMsNkNBQUErRCxDQUFPdkwsR0FBUCxFQUFZd0gsTUFBWixDQUFtQixxQkFBbkIsQ0FBdkQ7QUFDQSxPQUFLNkYsT0FBTCxHQUFldkMsS0FBS3VDLE9BQUwsR0FBZXZDLEtBQUt1QyxPQUFwQixHQUE4Qiw2Q0FBQTlCLENBQU94TCxLQUFQLEVBQWN5SCxNQUFkLENBQXFCLHFCQUFyQixDQUE3QztBQUNBLE9BQUs4RixPQUFMLEdBQWV4QyxLQUFLd0MsT0FBTCxHQUFleEMsS0FBS3dDLE9BQXBCLEdBQThCLDZDQUFBL0IsR0FBUy9ELE1BQVQsQ0FBZ0IscUJBQWhCLENBQTdDO0FBQ0E7QUFDQSxPQUFLK0YsU0FBTCxHQUFpQixPQUFqQjtBQUNBLE9BQUs3RixlQUFMLEdBQXVCbUUsT0FBdkI7QUFDQSxPQUFLN0osUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxPQUFLK0osYUFBTCxHQUFxQkEsYUFBckI7QUFDQTtBQUNBLE9BQUtDLE9BQUwsR0FBZUEsT0FBZjtBQUNBLE9BQUtDLE1BQUwsR0FBY0EsTUFBZDtBQUNBO0FBQ0EsT0FBS3VCLE9BQUw7QUFDQTs7QUFFRHZDLGdCQUFlSCxJQUFmLEVBQXFCO0FBQ3BCLFFBQU0yQyxXQUFXM0MsS0FBSzVMLFdBQXRCO0FBQ00sUUFBTXdPLGNBQWMsNEVBQXBCO0FBQ0EsTUFBSTFDLElBQUo7QUFDQSxVQUFReUMsUUFBUjtBQUNJLFFBQUtFLE1BQUw7QUFDSSxRQUFLRCxZQUFZRSxJQUFaLENBQWlCOUMsSUFBakIsQ0FBTCxFQUE4QkUsT0FBTyxNQUFQLENBQTlCLEtBQ0ssTUFBTSxJQUFJRCxLQUFKLENBQVUsbURBQVYsQ0FBTjtBQUNMO0FBQ0osUUFBS2xGLE1BQUw7QUFDUixRQUFLaUYsS0FBS3NCLGFBQUwsSUFBc0J0QixLQUFLL0UsS0FBaEMsRUFBd0M7QUFDdkNpRixZQUFPLFVBQVA7QUFDQSxLQUZELE1BRU8sSUFBS0YsS0FBSy9LLEtBQUwsSUFBYytLLEtBQUsvRSxLQUF4QixFQUFnQztBQUN0Q2lGLFlBQU8sbUJBQVA7QUFDQTtBQUNXO0FBWFI7QUFhQSxTQUFPQSxJQUFQO0FBQ047O0FBRURtQixZQUFXMEIsVUFBWCxFQUF1QjtBQUN0QixRQUFNQyxhQUFhLEVBQW5CO0FBQ0E7QUFDQSxRQUFNQyxZQUFZRixXQUFXRyxLQUFYLENBQWlCLEdBQWpCLENBQWxCO0FBQ0FELFlBQVVFLE9BQVYsQ0FBa0IsVUFBU0MsSUFBVCxFQUFlQyxLQUFmLEVBQXNCQyxHQUF0QixFQUEwQjtBQUMzQyxTQUFNQyxPQUFPSCxLQUFLRixLQUFMLENBQVcsR0FBWCxDQUFiO0FBQ0FGLGNBQVdPLEtBQUssQ0FBTCxDQUFYLElBQXNCQSxLQUFLLENBQUwsQ0FBdEI7QUFDQSxHQUhEO0FBSUE7QUFDQSxNQUFLUCxXQUFXbEIsQ0FBaEIsRUFBb0JrQixXQUFXbEIsQ0FBWCxHQUFlLE1BQU1rQixXQUFXbEIsQ0FBaEM7O0FBRXBCLFNBQU9rQixVQUFQO0FBQ0E7O0FBRUQ7Ozs7OztBQU1BUSxnQkFBZ0JSLGFBQWEsS0FBSzVCLEtBQWxDLEVBQTBDO0FBQ3pDLE1BQUssQ0FBQzRCLFVBQU4sRUFBbUIsT0FBTyxFQUFQO0FBQ25CLFFBQU1DLFlBQVksRUFBbEI7QUFDQSxRQUFNUSxzQkFBc0IxSSxPQUFPMkksSUFBUCxDQUFZVixVQUFaLENBQTVCO0FBQ0FTLHNCQUFvQk4sT0FBcEIsQ0FBNEIsVUFBU0MsSUFBVCxFQUFlQyxLQUFmLEVBQXNCQyxHQUF0QixFQUEwQjtBQUNyRCxTQUFNSyxhQUFjLEdBQUVQLElBQUssSUFBR0osV0FBV0ksSUFBWCxDQUFpQixFQUEvQztBQUNBSCxhQUFVVyxJQUFWLENBQWVELFVBQWY7QUFDQSxHQUhEO0FBSUEsU0FBT1YsVUFBVVksSUFBVixDQUFlLEdBQWYsRUFBb0JDLE9BQXBCLENBQTRCLEdBQTVCLEVBQWlDLEVBQWpDLENBQVA7QUFDQTs7QUFFRHBCLFdBQVU7QUFDVCxPQUFLcUIsV0FBTDtBQUNBLE9BQUtDLGdCQUFMO0FBQ0E7O0FBRURELGVBQWM7QUFDYixRQUFNeEosT0FBTyxJQUFiO0FBQ0EsUUFBTXlJLGFBQWE7QUFDbEIsUUFBSyxJQURhLEVBQ1A7QUFDWCxRQUFLLElBRmEsRUFFUDtBQUNYLFFBQUssR0FIYSxFQUdSO0FBQ1YsU0FBTSxDQUpZLENBSVY7QUFKVSxHQUFuQjtBQU1BO0FBQ0FBLGFBQVcsR0FBWCxJQUFrQixLQUFLcEcsZUFBTCxDQUFxQmtILE9BQXJCLENBQTZCLEdBQTdCLEVBQWtDLEVBQWxDLENBQWxCO0FBQ0E7QUFDQS9CLEVBQUEscURBQUFBLENBQU9DLFVBQVAsQ0FBa0JtQixPQUFsQixDQUEwQixVQUFTQyxJQUFULEVBQWVDLEtBQWYsRUFBc0JDLEdBQXRCLEVBQTBCO0FBQ25ELE9BQUtGLEtBQUt6RyxVQUFMLElBQW9CcEMsS0FBS3FDLGVBQTlCLEVBQWdEO0FBQy9DO0FBQ0FvRyxlQUFXLElBQVgsSUFBbUJLLEtBQW5CO0FBQ0E7QUFDRCxHQUxEO0FBTUE7QUFDQSxPQUFLakMsS0FBTCxHQUFhNEIsVUFBYjtBQUNBOztBQUVEdkIsd0JBQXVCO0FBQ3RCLFNBQU87QUFDTixlQUFZLENBRE4sRUFDUztBQUNmLG9CQUFpQixFQUZYLEVBRWU7QUFDckIsWUFBUztBQUhILEdBQVA7QUFLQTs7QUFFRHVDLG9CQUFtQjtBQUNsQixRQUFNQyxrQkFBa0I7QUFDdkIsZUFBWSxDQURXO0FBRXZCLG9CQUFpQixFQUZNO0FBR3ZCLFlBQVM7QUFIYyxHQUF4QjtBQUtBQSxrQkFBZ0IsVUFBaEIsSUFBOEIsS0FBSy9NLFFBQW5DO0FBQ0ErTSxrQkFBZ0IsZUFBaEIsSUFBbUMsS0FBS2hELGFBQXhDO0FBQ0EsT0FBS00sVUFBTCxHQUFrQjBDLGVBQWxCO0FBQ0E7O0FBRURDLGVBQWNqSixRQUFRLEtBQUtBLEtBQTNCLEVBQWtDa0osVUFBVSxFQUE1QyxFQUErQztBQUM5QyxRQUFNQyxXQUNKOzs7Y0FHVW5KLEtBQU07Ozs7WUFJUmtKLE9BQVE7OztXQVJsQjs7QUFhRSxTQUFPQyxRQUFQO0FBQ0Y7O0FBRUQ7Ozs7OztBQU1BQyxzQkFBcUJwUCxLQUFyQixFQUE0QkMsR0FBNUIsRUFBaUM7QUFDaEMsTUFBSyxDQUFDLEtBQUtnTSxPQUFYLEVBQXFCLE1BQU0sSUFBSWpCLEtBQUosQ0FBVSx3Q0FBVixDQUFOO0FBQ3JCLFFBQU1xRSxjQUFjO0FBQ25CM04sT0FBSSxLQUFLQSxFQURVO0FBRW5CcEIsV0FBUTtBQUVUO0FBSm9CLEdBQXBCLENBS0EsTUFBTWdQLFdBQVcsS0FBS0MsbUJBQUwsQ0FBeUJ2UCxLQUF6QixFQUFnQ0MsR0FBaEMsQ0FBakI7QUFDQSxPQUFNLElBQUl5QyxHQUFWLElBQWlCNE0sUUFBakIsRUFBNEI7QUFDM0I7QUFDQSxTQUFNRSxXQUFXLEtBQUtDLG1CQUFMLEVBQWpCO0FBQ0FELFlBQVN4UCxLQUFULEdBQWlCMEMsSUFBSStFLE1BQUosQ0FBVyxxQkFBWCxDQUFqQjtBQUNBK0gsWUFBU3ZQLEdBQVQsR0FBZSw2Q0FBQXVMLENBQU9nRSxTQUFTdlAsR0FBaEIsRUFBcUJ5UCxHQUFyQixDQUEwQmhOLElBQUlpTixJQUFKLENBQVUsNkNBQUFuRSxDQUFPLEtBQUt4TCxLQUFaLENBQVYsQ0FBMUIsRUFBMkR5SCxNQUEzRCxDQUFrRSxxQkFBbEUsQ0FBZjtBQUNBNEgsZUFBWS9PLE1BQVosQ0FBbUJxTyxJQUFuQixDQUF3QmEsUUFBeEI7QUFDQTs7QUFFRCxTQUFPSCxXQUFQO0FBQ0E7O0FBRUQ7Ozs7QUFJQUUscUJBQW9CdlAsS0FBcEIsRUFBMkJDLEdBQTNCLEVBQWdDO0FBQy9CLFFBQU1nTSxVQUFVLEtBQUtBLE9BQXJCO0FBQ0EsTUFBSXFELFFBQUo7QUFDQSxNQUFJTSxLQUFKO0FBQ0ExSixVQUFRMkosS0FBUixDQUFjNUQsT0FBZDtBQUNBLE1BQUssQ0FBQzJELFFBQVEseUJBQVQsRUFBb0MvQixJQUFwQyxDQUF5QzVCLE9BQXpDLENBQUwsRUFBeUQ7QUFDeEQ7QUFDQSxTQUFNNkQsYUFBYSw2Q0FBQXRFLENBQU8sS0FBS3hMLEtBQVosRUFBbUIwQyxHQUFuQixFQUFuQjtBQUNBLFNBQU1xTixVQUFVSCxNQUFNSSxJQUFOLENBQVcvRCxPQUFYLENBQWhCO0FBQ0EsU0FBTWdFLFlBQVlGLFFBQVEsQ0FBUixDQUFsQjtBQUNBLFNBQU1HLFNBQVNILFFBQVEsQ0FBUixLQUFlLEdBQUVELFVBQVcsRUFBM0M7QUFDQVIsY0FBVyxLQUFLYSxtQkFBTCxDQUF5QkQsTUFBekIsRUFBaUNsUSxLQUFqQyxFQUF3Q0MsR0FBeEMsRUFBNkNnUSxTQUE3QyxDQUFYO0FBRUEsR0FSRCxNQVFPLElBQUssQ0FBQ0wsUUFBUSxxQkFBVCxFQUFnQy9CLElBQWhDLENBQXFDNUIsT0FBckMsQ0FBTCxFQUFxRDtBQUMzRDtBQUNBLFNBQU04RCxVQUFVSCxNQUFNSSxJQUFOLENBQVcvRCxPQUFYLENBQWhCO0FBQ0EsU0FBTWlFLFNBQVNILFFBQVEsQ0FBUixLQUFjLE9BQTdCO0FBQ0FULGNBQVcsS0FBS2EsbUJBQUwsQ0FBeUJELE1BQXpCLEVBQWlDbFEsS0FBakMsRUFBd0NDLEdBQXhDLENBQVg7QUFFQSxHQU5NLE1BTUEsSUFBSyxDQUFDMlAsUUFBUSw2QkFBVCxFQUF3Qy9CLElBQXhDLENBQTZDNUIsT0FBN0MsQ0FBTCxFQUE2RDtBQUNuRTtBQUNBLFNBQU1tRSxVQUFVUixNQUFNSSxJQUFOLENBQVcvRCxPQUFYLEVBQW9CLENBQXBCLENBQWhCO0FBQ0FxRCxjQUFXLEtBQUtlLGlCQUFMLENBQXVCclEsS0FBdkIsRUFBOEJDLEdBQTlCLEVBQW1DbVEsT0FBbkMsQ0FBWDtBQUVBOztBQUVELFNBQU9kLFFBQVA7QUFDQTs7QUFFRDs7Ozs7QUFLQWEscUJBQW9CRCxNQUFwQixFQUE0QmxRLEtBQTVCLEVBQW1DQyxHQUFuQyxFQUF3Q3FRLGFBQWEsR0FBckQsRUFBMEQ7QUFDekQ7QUFDQTtBQUNBLFFBQU1DLFlBQVksNkNBQUEvRSxDQUFPLEtBQUt4TCxLQUFaLENBQWxCO0FBQ0EsUUFBTXdRLFVBQVUsNkNBQUFoRixDQUFPdkwsR0FBUCxDQUFoQjtBQUNBLFFBQU1pTSxTQUFTLEtBQUtBLE1BQUwsR0FBYyw2Q0FBQVYsQ0FBTyxLQUFLVSxNQUFaLENBQWQsR0FBb0NzRSxPQUFuRDtBQUNBLE1BQUlsQixXQUFXLEVBQWY7QUFDQSxRQUFNbUIsZ0JBQWdCSCxhQUFhdE8sU0FBU3NPLFVBQVQsQ0FBYixHQUFvQyxDQUExRDtBQUNBLFFBQU1JLFdBQVdSLE9BQU9yQixPQUFQLENBQWUsR0FBZixFQUFvQixHQUFwQixFQUF5QlosS0FBekIsQ0FBK0IsRUFBL0IsQ0FBakIsQ0FSeUQsQ0FRSjtBQUNyRCxPQUFNLElBQUl2TCxHQUFWLElBQWlCZ08sUUFBakIsRUFBNEI7QUFDM0I7QUFDQSxPQUFJWixhQUFhOU4sU0FBU1UsR0FBVCxDQUFqQjtBQUFBLE9BQWdDaU8sb0JBQW9CLDZDQUFBbkYsQ0FBTytFLFNBQVAsQ0FBcEQ7QUFDQSxNQUFHO0FBQ0Y7QUFDQUksd0JBQW9CLDZDQUFBbkYsQ0FBTytFLFNBQVAsRUFBa0I3TixHQUFsQixDQUFzQm9OLFVBQXRCLENBQXBCO0FBQ0E7QUFDQSxVQUFNdEksYUFBYSw2Q0FBQWdFLENBQU8sS0FBS3hMLEtBQVosQ0FBbkI7QUFDQTJRLHNCQUFrQkMsR0FBbEIsQ0FBc0I7QUFDckIsYUFBUXBKLFdBQVdxSixHQUFYLENBQWUsTUFBZixDQURhO0FBRXJCLGVBQVVySixXQUFXcUosR0FBWCxDQUFlLFFBQWYsQ0FGVztBQUdyQixlQUFVckosV0FBV3FKLEdBQVgsQ0FBZSxRQUFmO0FBSFcsS0FBdEI7QUFLQTtBQUNBLFFBQUssQ0FBQ0Ysa0JBQWtCRyxNQUFsQixDQUEwQnRKLFVBQTFCLENBQU4sRUFBK0M4SCxTQUFTWCxJQUFULENBQWUsNkNBQUFuRCxDQUFPbUYsaUJBQVAsQ0FBZjtBQUMvQztBQUNBYixrQkFBYyxJQUFFVyxhQUFoQjtBQUNBO0FBQ0EsSUFmRCxRQWVVLDZDQUFBakYsQ0FBTytFLFNBQVAsRUFBa0I3TixHQUFsQixDQUFzQm9OLGFBQWEsQ0FBbkMsRUFBdUNpQixRQUF2QyxDQUFpRFAsT0FBakQsS0FDSiw2Q0FBQWhGLENBQU8rRSxTQUFQLEVBQWtCN04sR0FBbEIsQ0FBc0JvTixhQUFhLENBQW5DLEVBQXVDaUIsUUFBdkMsQ0FBaUQ3RSxNQUFqRCxDQWhCTjtBQWtCQTs7QUFFRCxTQUFPb0QsUUFBUDtBQUNBOztBQUVEZSxtQkFBa0JyUSxLQUFsQixFQUF5QkMsR0FBekIsRUFBOEJtUSxPQUE5QixFQUF1QztBQUN0QyxRQUFNWSxhQUFhO0FBQ2xCLFlBQVMsTUFEUztBQUVsQixhQUFXLE9BRk87QUFHbEIsY0FBWSxRQUhNO0FBSWxCLGFBQVc7QUFKTyxHQUFuQjtBQU1BLFFBQU1ULFlBQVksNkNBQUEvRSxDQUFPLEtBQUt4TCxLQUFaLENBQWxCO0FBQ0EsUUFBTXdRLFVBQVUsNkNBQUFoRixDQUFPdkwsR0FBUCxDQUFoQjtBQUNBLFFBQU1pTSxTQUFTLEtBQUtBLE1BQUwsR0FBYyw2Q0FBQVYsQ0FBTyxLQUFLVSxNQUFaLENBQWQsR0FBb0NzRSxPQUFuRDtBQUNBLE1BQUlsQixXQUFXLEVBQWY7QUFDQSxRQUFNOUgsYUFBYSw2Q0FBQWdFLENBQU8sS0FBS3hMLEtBQVosQ0FBbkI7QUFDQSxLQUFHO0FBQ0Y7QUFDQXdILGNBQVdrSSxHQUFYLENBQWUsQ0FBZixFQUFrQnNCLFdBQVdaLE9BQVgsQ0FBbEI7QUFDQWQsWUFBU1gsSUFBVCxDQUFlLDZDQUFBbkQsQ0FBT2hFLFVBQVAsQ0FBZjtBQUNBLEdBSkQsUUFJVUEsV0FBV3VKLFFBQVgsQ0FBcUJQLE9BQXJCLEtBQWtDaEosV0FBV3VKLFFBQVgsQ0FBcUI3RSxNQUFyQixDQUo1Qzs7QUFNQSxTQUFPb0QsUUFBUDtBQUNBOztBQUVERyx1QkFBc0I7QUFDckI7QUFDQSxRQUFNbkssT0FBTyxJQUFiO0FBQ0EsUUFBTWtLLFdBQVcsRUFBakI7QUFDQSxRQUFNZixPQUFPM0ksT0FBTzJJLElBQVAsQ0FBWSxJQUFaLENBQWI7QUFDQTtBQUNBQSxPQUFLd0MsTUFBTCxDQUFheEMsS0FBS3lDLFNBQUwsQ0FBaUI3UCxDQUFELElBQU9BLEtBQUssT0FBNUIsQ0FBYixFQUFvRCxDQUFwRDtBQUNBb04sT0FBS3dDLE1BQUwsQ0FBYXhDLEtBQUt5QyxTQUFMLENBQWlCN1AsQ0FBRCxJQUFPQSxLQUFLLFlBQTVCLENBQWIsRUFBeUQsQ0FBekQ7QUFDQTtBQUNBb04sT0FBS1AsT0FBTCxDQUFhLFVBQVNDLElBQVQsRUFBZUMsS0FBZixFQUFzQkMsR0FBdEIsRUFBMEI7QUFDdENtQixZQUFTckIsSUFBVCxJQUFpQjdJLEtBQUs2SSxJQUFMLENBQWpCO0FBQ0EsR0FGRDtBQUdBLFNBQU9xQixRQUFQO0FBQ0E7O0FBRUQyQixrQkFBaUI7QUFDaEIsT0FBSzFELE9BQUw7QUFDQSxRQUFNK0IsV0FBVyxFQUFqQjtBQUNBQSxXQUFTeEosS0FBVCxHQUFpQixLQUFLQSxLQUF0QjtBQUNBd0osV0FBUy9DLElBQVQsR0FBZ0IsS0FBSy9LLEVBQXJCO0FBQ0E4TixXQUFTOUMsY0FBVCxHQUEwQixLQUFLWCxNQUFMLEdBQWMsNkNBQUFQLENBQU8sS0FBS3hMLEtBQVosRUFBbUJ5SCxNQUFuQixDQUEwQixxQkFBMUIsQ0FBZCxHQUFpRSxLQUFLekgsS0FBaEc7QUFDQXdQLFdBQVM3QyxZQUFULEdBQXdCLEtBQUtaLE1BQUwsR0FBYyw2Q0FBQVAsQ0FBTyxLQUFLdkwsR0FBWixFQUFpQndILE1BQWpCLENBQXdCLHFCQUF4QixDQUFkLEdBQStELEtBQUt4SCxHQUE1RjtBQUNBdVAsV0FBU25ELGFBQVQsR0FBeUIsS0FBS2tDLGNBQUwsQ0FBb0IsS0FBS3BDLEtBQXpCLENBQXpCO0FBQ0FxRCxXQUFTakQsa0JBQVQsR0FBOEIsS0FBS2dDLGNBQUwsQ0FBb0IsS0FBS2pDLFVBQXpCLENBQTlCO0FBQ0FrRCxXQUFTbEMsT0FBVCxHQUFtQixLQUFLQSxPQUF4QjtBQUNBa0MsV0FBU2pDLE9BQVQsR0FBbUIsS0FBS0EsT0FBeEI7QUFDQSxTQUFPaUMsUUFBUDtBQUNBOztBQUVENEIscUJBQW9CO0FBQ25CO0FBQ0EsT0FBS3BRLFNBQUwsQ0FBZUksWUFBZixDQUE2QixnQkFBN0IsRUFBK0M7QUFDOUNkLFdBQVEsQ0FDUCxLQUFLbVAsbUJBQUwsRUFETztBQURzQyxHQUEvQztBQUtBOztBQUVENEIsZ0JBQWU7QUFDZDtBQUNBO0FBQ0EsUUFBTWpHLE1BQU0sK0RBQUFDLENBQUtDLGdCQUFMLENBQXNCLEtBQUs1SixFQUEzQixDQUFaO0FBQ0E7QUFDQTBKLE1BQUlPLEtBQUosR0FBWSxLQUFLM0YsS0FBakI7QUFDQTtBQUNBLE1BQUssS0FBSytGLE1BQVYsRUFBbUI7QUFDbEIsT0FBSXVGLFdBQVcsNkNBQUE5RixDQUFPLEtBQUt4TCxLQUFaLEVBQW1CNFEsR0FBbkIsQ0FBdUIsRUFBQyxLQUFLLENBQU4sRUFBUyxLQUFLLENBQWQsRUFBaUIsS0FBSyxDQUF0QixFQUF2QixFQUFpRG5KLE1BQWpELENBQXdELHFCQUF4RCxDQUFmO0FBQ0EsT0FBSThKLFNBQVMsNkNBQUEvRixDQUFPLEtBQUt2TCxHQUFaLEVBQWlCMlEsR0FBakIsQ0FBcUIsRUFBQyxLQUFLLEVBQU4sRUFBVSxLQUFLLEVBQWYsRUFBbUIsS0FBSyxFQUF4QixFQUFyQixFQUFrRG5KLE1BQWxELENBQXlELHFCQUF6RCxDQUFiO0FBQ0EsUUFBSytKLGNBQUwsQ0FBb0JwRyxHQUFwQixFQUF5QixnQkFBekIsRUFBMkNrRyxRQUEzQztBQUNBLFFBQUtFLGNBQUwsQ0FBb0JwRyxHQUFwQixFQUF5QixjQUF6QixFQUF5Q21HLE1BQXpDO0FBQ0EsR0FMRCxNQUtPO0FBQ04sT0FBSUQsV0FBVyw2Q0FBQTlGLENBQU8sS0FBS3hMLEtBQVosRUFBbUJ5SCxNQUFuQixDQUEwQixxQkFBMUIsQ0FBZjtBQUNBLE9BQUk4SixTQUFTLDZDQUFBL0YsQ0FBTyxLQUFLdkwsR0FBWixFQUFpQndILE1BQWpCLENBQXdCLHFCQUF4QixDQUFiO0FBQ0EsUUFBSytKLGNBQUwsQ0FBb0JwRyxHQUFwQixFQUF5QixnQkFBekIsRUFBMkNrRyxRQUEzQztBQUNBLFFBQUtFLGNBQUwsQ0FBb0JwRyxHQUFwQixFQUF5QixjQUF6QixFQUF5Q21HLE1BQXpDO0FBQ0E7O0FBRUQ7QUFDQSxPQUFLOUQsT0FBTDtBQUNBLE9BQUsrRCxjQUFMLENBQW9CcEcsR0FBcEIsRUFBeUIsZUFBekIsRUFBMEMsS0FBS21ELGNBQUwsQ0FBb0IsS0FBS3BDLEtBQXpCLENBQTFDO0FBQ0EsT0FBS3FGLGNBQUwsQ0FBb0JwRyxHQUFwQixFQUF5QixvQkFBekIsRUFBK0MsS0FBS21ELGNBQUwsQ0FBb0IsS0FBS2pDLFVBQXpCLENBQS9DO0FBQ0E7O0FBRUQ7QUFDQWtGLGdCQUFlcEcsR0FBZixFQUFvQi9ILEdBQXBCLEVBQXlCdUMsS0FBekIsRUFBZ0M7QUFDL0IsTUFBSSxDQUFDd0YsR0FBTCxFQUFVLE9BQU8sS0FBUDtBQUNWQSxNQUFJcUcsYUFBSixDQUFrQnBPLEdBQWxCLEVBQXVCdUMsS0FBdkI7QUFDQTs7QUFFRDhMLHNCQUFxQjtBQUNwQjtBQUNBO0FBQ0EsUUFBTUMsV0FBWSxhQUFhLDZDQUFBbkcsQ0FBTyxLQUFLeEwsS0FBWixFQUFtQnlILE1BQW5CLENBQTBCLFNBQTFCLENBQXNDLEdBQXJFO0FBQ0EsUUFBTW1LLFlBQVksK0RBQUF2RyxDQUFLd0csbUJBQUwsQ0FBeUJGLFFBQXpCLEVBQW1DLElBQW5DLENBQWxCO0FBQ0EsUUFBTUcsV0FBVywrREFBQUMsQ0FBTUMsZ0JBQU4sQ0FBdUIsT0FBdkIsQ0FBakI7QUFDQSxRQUFNN0MsV0FBVyxLQUFLRixhQUFMLENBQW1CLEtBQUtqSixLQUF4QixFQUErQixFQUEvQixDQUFqQjtBQUNBK0wsRUFBQSwrREFBQUEsQ0FBTUUsY0FBTixDQUFxQkgsUUFBckIsRUFBK0IzQyxRQUEvQixFQUF5QyxTQUF6QztBQUNBLFFBQU0vRCxNQUFNd0csVUFBVU0sZUFBVixDQUEwQixLQUFLbE0sS0FBL0IsRUFBc0MsRUFBdEMsQ0FBWjtBQUNBb0YsTUFBSStHLHNCQUFKLENBQTJCLEtBQUtuTSxLQUFoQztBQUNBb0YsTUFBSWdILGVBQUosQ0FBb0JOLFFBQXBCLEVBQThCQSxRQUE5QixFQUF3QyxJQUF4QztBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU10QyxXQUFXLEtBQUsyQixjQUFMLEVBQWpCO0FBQ0EvRixNQUFJaUgsYUFBSixDQUFrQjdDLFNBQVM5QyxjQUEzQixFQUEyQzhDLFNBQVM3QyxZQUFwRCxFQUFrRTZDLFNBQVNuRCxhQUEzRTtBQUNBO0FBQ0FqQixNQUFJSCxJQUFKLEdBQVcsT0FBWDtBQUNBO0FBQ0EsT0FBS3ZKLEVBQUwsR0FBVTBKLElBQUlNLElBQWQ7QUFDQTs7QUFFRDRHLG1CQUFtQkMsT0FBTyxLQUExQixFQUFrQztBQUNqQyxNQUFJLENBQUMsK0RBQUQsSUFBUyxDQUFDLCtEQUFkLEVBQXFCLE1BQU0sSUFBSXZILEtBQUosQ0FBVSw0Q0FBVixDQUFOO0FBQ3JCO0FBQ0EsUUFBTXdILFlBQVksNEVBQWxCO0FBQ0EsUUFBTUMsZ0JBQWdCRCxVQUFVM0UsSUFBVixDQUFlLEtBQUtuTSxFQUFwQixDQUF0QjtBQUNBO0FBQ0EsTUFBSytRLGFBQUwsRUFBcUI7QUFDcEI7QUFDQSxRQUFLcEIsWUFBTDtBQUNBO0FBQ0EsR0FKRCxNQUlPO0FBQ047QUFDQSxRQUFLSyxrQkFBTDtBQUNBO0FBRUQ7O0FBRURnQixpQkFBaUJDLGNBQWMsS0FBL0IsRUFBc0M7QUFDckMsTUFBSXZILE1BQU0sK0RBQUFDLENBQUtDLGdCQUFMLENBQXNCLEtBQUs1SixFQUEzQixDQUFWO0FBQ0EsTUFBSSxDQUFDMEosR0FBTCxFQUFVLE1BQU0sSUFBSUosS0FBSixDQUFVLHlDQUFWLENBQU47QUFDVjtBQUNBLE9BQUtoSyxTQUFMLENBQWVJLFlBQWYsQ0FBNEIsY0FBNUIsRUFBNEMsS0FBS00sRUFBakQ7QUFDQTtBQUNBMEosTUFBSXdILGtCQUFKO0FBQ0E7QUFDQSxNQUFLRCxXQUFMLEVBQW1CdkgsSUFBSXlILE1BQUo7QUFDbkI7O0FBRURDLGVBQWM7QUFDYjtBQUNBOztBQUVEQyxjQUFhcFQsS0FBYixFQUFvQjtBQUNuQjtBQUNBLE1BQUtBLEtBQUwsRUFBYTtBQUNaO0FBQ0FBLFNBQU1xRyxLQUFOLEdBQWMsS0FBS0EsS0FBbkI7QUFDQXJHLFNBQU1nSSxlQUFOLEdBQXdCLEtBQUtBLGVBQTdCO0FBQ0EsUUFBSzNHLFNBQUwsQ0FBZUksWUFBZixDQUE0QixhQUE1QixFQUEyQ3pCLEtBQTNDO0FBQ0EsR0FMRCxNQUtPO0FBQ047QUFDQTtBQUNBO0FBQ0Q7O0FBM2NpQyxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0xuQztBQUNBO0FBQ0E7QUFDQTs7QUFFZSxNQUFNcVQsV0FBTixDQUFrQjtBQUM3QjdULGtCQUFjO0FBQ1YsYUFBSzZCLFNBQUwsR0FBaUIsNkNBQUFDLENBQUUsV0FBRixDQUFqQjtBQUNIOztBQUVEZ1MscUJBQWlCalQsS0FBakIsRUFBd0JDLEdBQXhCLEVBQTZCTCxPQUE3QixFQUFzQ0MsSUFBdEMsRUFBNENxVCxRQUE1QyxFQUFzRDtBQUNsRCxjQUFNbE4sUUFBUSw2Q0FBQS9FLENBQUVpUyxRQUFGLEVBQVlDLElBQVosQ0FBaUIsMkJBQWpCLEVBQThDQyxHQUE5QyxFQUFkO0FBQ0EsY0FBTXZLLFFBQVEsNkNBQUE1SCxDQUFFaVMsUUFBRixFQUFZQyxJQUFaLENBQWlCLDJCQUFqQixFQUE4Q0MsR0FBOUMsRUFBZDtBQUNBLFlBQUksMkRBQUosR0FBeUJDLFdBQXpCLENBQXFDLEVBQUNyVCxLQUFELEVBQVFDLEdBQVIsRUFBYUwsT0FBYixFQUFzQkMsSUFBdEIsRUFBckMsRUFBa0UsRUFBQ21HLEtBQUQsRUFBUTZDLEtBQVIsRUFBbEUsRUFIa0QsQ0FHaUM7QUFDbkY1SCxRQUFBLDZDQUFBQSxDQUFFaVMsUUFBRixFQUFZSSxLQUFaLENBQWtCLE1BQWxCO0FBQ0FyUyxRQUFBLDZDQUFBQSxDQUFFLFdBQUYsRUFBZUcsWUFBZixDQUE0QixVQUE1QjtBQUNIOztBQUVEbUYsbUJBQWU1RyxLQUFmLEVBQXNCNkUsWUFBdEIsRUFBb0M7QUFDaEMsYUFBSyxNQUFNK04sSUFBWCxJQUFtQi9OLFlBQW5CLEVBQWlDO0FBQzdCN0Usa0JBQU00UyxJQUFOLElBQWMvTixhQUFhK04sSUFBYixDQUFkO0FBQ0g7QUFDRDtBQUNBLGFBQUt2UixTQUFMLENBQWVJLFlBQWYsQ0FBNkIsYUFBN0IsRUFBNEN6QixLQUE1QztBQUNBO0FBQ0EsY0FBTTZQLFdBQVcsSUFBSSxzREFBSixDQUFrQjdQLEtBQWxCLENBQWpCO0FBQ0E2UCxpQkFBUzhDLGlCQUFUO0FBQ0g7O0FBRUQ5TCx1QkFBbUI3RyxLQUFuQixFQUEwQjtBQUN0QjtBQUNBLGNBQU1vQyxhQUFhQyxTQUFTckMsTUFBTXNDLFFBQWYsS0FBNEIsQ0FBL0M7QUFDQSxZQUFLRixVQUFMLEVBQWtCO0FBQ2RwQyxrQkFBTXNDLFFBQU4sR0FBaUIsR0FBakI7QUFDSCxTQUZELE1BRU87QUFDSHRDLGtCQUFNc0MsUUFBTixHQUFpQixHQUFqQjtBQUNIO0FBQ0Q7QUFDQSxjQUFNdU4sV0FBVyxJQUFJLHNEQUFKLENBQWtCN1AsS0FBbEIsQ0FBakI7QUFDQTZQLGlCQUFTOEMsaUJBQVQ7QUFDQTtBQUNBLGFBQUt0UixTQUFMLENBQWVJLFlBQWYsQ0FBNkIsYUFBN0IsRUFBNEN6QixLQUE1QztBQUNIOztBQUVEK0cseUJBQXFCL0csS0FBckIsRUFBNEI7QUFDeEIsWUFBSyxzRUFBQTRULENBQVcsV0FBWCxFQUF3QixNQUF4QixDQUFMLEVBQXVDO0FBQ25DO0FBQ0EsZ0JBQUkvRCxXQUFXLElBQUksc0RBQUosQ0FBa0I3UCxLQUFsQixDQUFmO0FBQ0E2UCxxQkFBU2tELGVBQVQsQ0FBeUIsS0FBekI7QUFDSDtBQUNKOztBQUVEL0wsd0JBQW9CaEgsS0FBcEIsRUFBMkI7QUFDdkIsWUFBSyxzRUFBQTRULENBQVcsZ0NBQVgsRUFBNkMsTUFBN0MsQ0FBTCxFQUE0RDtBQUN4RCxnQkFBSS9ELFdBQVcsSUFBSSxzREFBSixDQUFrQjdQLEtBQWxCLENBQWY7QUFDQTZQLHFCQUFTa0QsZUFBVCxDQUF5QixJQUF6QjtBQUNIO0FBQ0o7O0FBRURjLHlCQUFxQjdULEtBQXJCLEVBQTRCO0FBQ3hCLGNBQU15TCxNQUFNLCtEQUFBcUksQ0FBWW5JLGdCQUFaLENBQTZCM0wsTUFBTStCLEVBQW5DLENBQVo7QUFDQWdTLFFBQUEsK0RBQUFBLENBQVVDLGlCQUFWLENBQTRCdkksR0FBNUI7QUFDSDs7QUFFRDNFLHNCQUFrQjlHLEtBQWxCLEVBQXlCO0FBQ3JCLGNBQU15TCxNQUFNLCtEQUFBcUksQ0FBWW5JLGdCQUFaLENBQTZCM0wsTUFBTStCLEVBQW5DLENBQVo7QUFDQWtTLFFBQUEscUVBQUFBLENBQVVDLFlBQVYsQ0FBdUJ6SSxHQUF2QixFQUE0QixJQUE1QjtBQUNIOztBQTlENEIsQzs7Ozs7Ozs7Ozs7Ozs7OztBQ0xqQztBQUNBOztBQUVBOzs7QUFHQTtBQUNlLE1BQU0wSSxrQkFBTixDQUF5QjtBQUN2Qzs7Ozs7QUFLQTNVLGFBQVlxQixRQUFaLEVBQXNCO0FBQ3JCLE1BQUksQ0FBQywrREFBTCxFQUFrQixNQUFNLElBQUl3SyxLQUFKLENBQVUseUJBQVYsQ0FBTjtBQUNsQixPQUFLK0ksUUFBTCxHQUFnQiwrREFBaEI7QUFDQSxPQUFLQyxRQUFMLEdBQWdCLCtEQUFBUCxDQUFZUSxRQUE1QjtBQUNBLE9BQUtqVCxTQUFMLEdBQWlCQyxFQUFFVCxRQUFGLENBQWpCO0FBQ0E7O0FBRUQ7Ozs7OztBQU1BVyxpQkFBaUJ0QixJQUFqQixFQUF1QmtCLE9BQXZCLEVBQWdDO0FBQy9CLFFBQU13UCxZQUFZMVEsS0FBS0csS0FBTCxDQUFXeUgsTUFBWCxDQUFrQixxQkFBbEIsQ0FBbEI7QUFDQSxRQUFNK0ksVUFBVTNRLEtBQUtJLEdBQUwsQ0FBU3dILE1BQVQsQ0FBZ0IscUJBQWhCLENBQWhCO0FBQ0EsTUFBSXZHLGVBQWUsRUFBbkI7QUFDQTtBQUNBLFFBQU1nVCxxQkFBcUI7QUFDMUJqSixTQUFNLGVBRG9CO0FBRTFCO0FBQ0EzSyxXQUFRLEtBQUs2VCxvQkFBTCxDQUEwQjVELFNBQTFCLEVBQXFDQyxPQUFyQztBQUhrQixHQUEzQjtBQUtBdFAsZUFBYXlOLElBQWIsQ0FBa0J1RixrQkFBbEI7O0FBRUE7QUFDQSxRQUFNRSxxQkFBcUIsS0FBS0Msa0JBQUwsQ0FBd0I5RCxTQUF4QixFQUFtQ0MsT0FBbkMsQ0FBM0I7QUFDQXRQLGlCQUFlQSxhQUFhb1QsTUFBYixDQUFvQkYsa0JBQXBCLENBQWY7QUFDQTtBQUNBLFNBQU9sVCxZQUFQO0FBQ0E7O0FBRUQ7Ozs7Ozs7QUFPQWlULHNCQUFxQm5VLEtBQXJCLEVBQTRCQyxHQUE1QixFQUFnQztBQUMvQixRQUFNSyxTQUFTLEVBQWY7QUFDQSxNQUFJaVUsTUFBTyxxRkFBWDtBQUNBLE1BQUlDLE9BQVEsaUlBQWdJdlUsR0FBSSxLQUFoSjtBQUNBLE1BQUl3VSxPQUFRLCtIQUE4SHpVLEtBQU0sS0FBaEo7QUFDQSxNQUFJQSxLQUFKLEVBQVd1VSxPQUFPRSxJQUFQO0FBQ1gsTUFBSXhVLEdBQUosRUFBU3NVLE9BQU9DLElBQVA7QUFDVCxNQUFJLCtEQUFBZixDQUFZaUIsb0JBQWhCLEVBQXNDO0FBQ3JDLE9BQUk7QUFDSCxVQUFNM0osT0FBTywrREFBQTBJLENBQVlpQixvQkFBWixDQUFpQ0gsR0FBakMsQ0FBYjtBQUNBLFFBQUssQ0FBQ3hKLElBQU4sRUFBYSxPQUFPLEtBQVA7QUFDYixVQUFNNEosTUFBTUMsS0FBS0MsS0FBTCxDQUFXOUosSUFBWCxDQUFaO0FBQ0EsUUFBSyxDQUFDNEosR0FBRCxJQUFRLENBQUNHLE1BQU1DLE9BQU4sQ0FBY0osR0FBZCxDQUFkLEVBQW1DLE9BQU8sS0FBUDtBQUNuQyxTQUFLLElBQUl0VCxJQUFJLENBQWIsRUFBZ0JBLElBQUlzVCxJQUFJclQsTUFBeEIsRUFBZ0NELEdBQWhDLEVBQXNDO0FBQ3JDZixZQUFPcU8sSUFBUCxDQUNDLElBQUksc0RBQUosQ0FBa0JnRyxJQUFJdFQsQ0FBSixDQUFsQixFQUEwQixLQUFLTCxTQUEvQixFQUEwQ3lPLG1CQUExQyxFQUREO0FBR0E7O0FBRUQsV0FBT25QLE1BQVA7QUFDQSxJQVpELENBYUEsT0FBTTBVLEdBQU4sRUFBVztBQUNWOU8sWUFBUTJGLEtBQVIsQ0FBY21KLEdBQWQ7QUFDQSxXQUFPLEtBQVA7QUFDQTtBQUNELEdBbEJELE1BbUJLO0FBQ0osU0FBTSxJQUFJaEssS0FBSixDQUFVLHVEQUFWLENBQU47QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFjQTtBQUVEOztBQUVEOzs7OztBQUtBcUosb0JBQW1CclUsS0FBbkIsRUFBMEJDLEdBQTFCLEVBQThCO0FBQzdCLFFBQU1nVixlQUFlLEVBQXJCO0FBQ0EsUUFBTVYsTUFBTSw2RkFDVCx3R0FESDs7QUFHQSxRQUFNeEosT0FBTywrREFBQTBJLENBQVlpQixvQkFBWixDQUFpQ0gsR0FBakMsQ0FBYjtBQUNBck8sVUFBUUMsR0FBUixDQUFZNEUsSUFBWjtBQUNBLE1BQUssQ0FBQ0EsSUFBTixFQUFhLE9BQU8sS0FBUDs7QUFFYixRQUFNNEosTUFBTUMsS0FBS0MsS0FBTCxDQUFXOUosSUFBWCxDQUFaO0FBQ0EsTUFBSyxDQUFDNEosR0FBRCxJQUFRLENBQUNHLE1BQU1DLE9BQU4sQ0FBY0osR0FBZCxDQUFkLEVBQW1DLE9BQU8sS0FBUDs7QUFFbkMsT0FBSyxJQUFJdFQsSUFBSSxDQUFiLEVBQWdCQSxJQUFJc1QsSUFBSXJULE1BQXhCLEVBQWdDRCxHQUFoQyxFQUFzQztBQUNyQzRULGdCQUFhdEcsSUFBYixDQUNDLElBQUksc0RBQUosQ0FBa0JnRyxJQUFJdFQsQ0FBSixDQUFsQixFQUEwQixLQUFLTCxTQUEvQixFQUEwQ29PLG9CQUExQyxDQUErRHBQLEtBQS9ELEVBQXNFQyxHQUF0RSxDQUREO0FBR0E7QUFDRCxTQUFPZ1YsWUFBUDtBQUVBOztBQUVEO0FBQ0F0VCx1QkFBc0JoQyxLQUF0QixFQUE2QjRCLEtBQTdCLEVBQW9DQyxVQUFwQyxFQUFnRDVCLE9BQWhELEVBQXlENkIsRUFBekQsRUFBNkQ1QixJQUE3RCxFQUFrRTtBQUNqRTtBQUNBLFFBQU1rTSxTQUFTLENBQUNwTSxNQUFNSyxLQUFOLENBQVlxTixPQUFaLEVBQWhCO0FBQ0E7QUFDQSxRQUFNakMsTUFBTSwrREFBQXFJLENBQVluSSxnQkFBWixDQUE2QjNMLE1BQU0rQixFQUFuQyxDQUFaO0FBQ0E7QUFDQSxNQUFLcUssTUFBTCxFQUFjO0FBQ2IsU0FBTXVGLFdBQVczUixNQUFNSyxLQUFOLENBQVk0USxHQUFaLENBQWdCLEVBQUMsS0FBSyxDQUFOLEVBQVMsS0FBSyxDQUFkLEVBQWlCLEtBQUssQ0FBdEIsRUFBaEIsRUFBMENuSixNQUExQyxDQUFpRCxxQkFBakQsQ0FBakI7QUFDQSxTQUFNOEosU0FBUzVSLE1BQU1NLEdBQU4sQ0FBVTJRLEdBQVYsQ0FBYyxFQUFDLEtBQUssRUFBTixFQUFVLEtBQUssRUFBZixFQUFtQixLQUFLLEVBQXhCLEVBQWQsRUFBMkNuSixNQUEzQyxDQUFrRCxxQkFBbEQsQ0FBZjtBQUNBLFFBQUsrSixjQUFMLENBQW9CcEcsR0FBcEIsRUFBeUIsZ0JBQXpCLEVBQTJDa0csUUFBM0M7QUFDQSxRQUFLRSxjQUFMLENBQW9CcEcsR0FBcEIsRUFBeUIsY0FBekIsRUFBeUNtRyxNQUF6QztBQUNBLEdBTEQsTUFLTztBQUNOLFNBQU1ELFdBQVczUixNQUFNSyxLQUFOLENBQVl5SCxNQUFaLENBQW1CLHFCQUFuQixDQUFqQjtBQUNBLFNBQU04SixTQUFTNVIsTUFBTU0sR0FBTixDQUFVd0gsTUFBVixDQUFpQixxQkFBakIsQ0FBZjtBQUNBLFFBQUsrSixjQUFMLENBQW9CcEcsR0FBcEIsRUFBeUIsZ0JBQXpCLEVBQTJDa0csUUFBM0M7QUFDQSxRQUFLRSxjQUFMLENBQW9CcEcsR0FBcEIsRUFBeUIsY0FBekIsRUFBeUNtRyxNQUF6QztBQUNBO0FBQ0Q7QUFDQTtBQUNBLE9BQUsyRCxvQkFBTCxDQUEwQjlKLEdBQTFCO0FBQ0E7O0FBRUQ7QUFDQW9HLGdCQUFlcEcsR0FBZixFQUFvQi9ILEdBQXBCLEVBQXlCdUMsS0FBekIsRUFBZ0M7QUFDL0IsTUFBSSxDQUFDd0YsR0FBTCxFQUFVLE9BQU8sS0FBUDtBQUNWQSxNQUFJcUcsYUFBSixDQUFrQnBPLEdBQWxCLEVBQXVCdUMsS0FBdkI7QUFDQTs7QUFFRDtBQUNBc1Asc0JBQXFCOUosR0FBckIsRUFBeUI7QUFDeEIsUUFBTStKLE1BQU0sSUFBSXJSLElBQUosRUFBWjtBQUNBLE1BQUksQ0FBQ3NILEdBQUwsRUFBVSxPQUFPLEtBQVA7QUFDVitKLE1BQUlDLFVBQUosQ0FBZSxDQUFDRCxJQUFJRSxVQUFKLEtBQW1CLENBQXBCLElBQXlCLEVBQXhDO0FBQ0FqSyxNQUFJUSxZQUFKLEdBQW1CLEtBQUswSixJQUFMLENBQVVILEdBQVYsQ0FBbkI7QUFDQTs7QUFFRDtBQUNBO0FBQ0FHLE1BQUtDLEVBQUwsRUFBUTtBQUNQLFFBQU1qUCxNQUFNaVAsR0FBR0MsV0FBSCxLQUFtQixHQUFuQixHQUNUQyxzQkFBc0JGLEdBQUdHLFFBQUgsS0FBZ0IsQ0FBdEMsQ0FEUyxHQUNrQyxHQURsQyxHQUVURCxzQkFBc0JGLEdBQUdJLE9BQUgsRUFBdEIsQ0FGUyxHQUU2QixHQUY3QixHQUdURixzQkFBc0JGLEdBQUdLLFFBQUgsRUFBdEIsQ0FIUyxHQUc2QixHQUg3QixHQUlUSCxzQkFBc0JGLEdBQUdNLFVBQUgsRUFBdEIsQ0FKUyxHQUlnQyxHQUpoQyxHQUtUSixzQkFBc0JGLEdBQUdGLFVBQUgsRUFBdEIsQ0FMSDtBQU1BLFNBQU8vTyxHQUFQO0FBQ0E7O0FBRUQ7QUFDQTFFLHlCQUF3QmpDLEtBQXhCLEVBQStCNEIsS0FBL0IsRUFBc0NDLFVBQXRDLEVBQWtENUIsT0FBbEQsRUFBMkQ2QixFQUEzRCxFQUErRDVCLElBQS9ELEVBQW9FO0FBQ25FLFFBQU1rTSxTQUFTcE0sTUFBTUssS0FBTixDQUFZcU4sT0FBWixLQUF3QixLQUF4QixHQUFnQyxJQUEvQztBQUNBO0FBQ0EsUUFBTWpDLE1BQU0sK0RBQUFxSSxDQUFZbkksZ0JBQVosQ0FBNkIzTCxNQUFNK0IsRUFBbkMsQ0FBWjtBQUNBO0FBQ0EsUUFBTW9VLGNBQWNuVyxNQUFNTSxHQUFOLENBQVV3SCxNQUFWLENBQWlCLHFCQUFqQixDQUFwQjtBQUNBO0FBQ0EsT0FBSytKLGNBQUwsQ0FBb0JwRyxHQUFwQixFQUF5QixjQUF6QixFQUF5QzBLLFdBQXpDO0FBQ0EsT0FBS1osb0JBQUwsQ0FBMEI5SixHQUExQjtBQUNBOztBQUVEO0FBQ0E7Ozs7Ozs7Ozs7QUFVQWlJLGFBQVkwQyxhQUFaLEVBQTJCQyxVQUEzQixFQUFzQztBQUNyQyxNQUFJO0FBQ0g7QUFDQSxTQUFNeEcsV0FBVyxJQUFJLHNEQUFKLENBQWtCO0FBQ2xDeEosV0FBT2dRLFdBQVdoUSxLQUFYLEdBQW1CZ1EsV0FBV2hRLEtBQTlCLEdBQXNDLEtBRFg7QUFFbENoRyxXQUFPK1YsY0FBYy9WLEtBRmE7QUFHbENDLFNBQUs4VixjQUFjOVYsR0FIZTtBQUlsQzhMLFlBQVFnSyxjQUFjL1YsS0FBZCxDQUFvQnFOLE9BQXBCLE1BQWlDMEksY0FBYzlWLEdBQWQsQ0FBa0JvTixPQUFsQixFQUFqQyxHQUErRCxLQUEvRCxHQUF1RSxJQUo3QztBQUtsQzFGLHFCQUFpQnFPLFdBQVduTixLQUFYLEdBQW1CbU4sV0FBV25OLEtBQTlCLEdBQXNDO0FBTHJCLElBQWxCLEVBTWQsS0FBSzdILFNBTlMsQ0FBakI7QUFPQTtBQUNBd08sWUFBUzhDLGlCQUFUO0FBQ0E5QyxZQUFTc0QsV0FBVDtBQUNBdEQsWUFBUzRCLGlCQUFUO0FBQ0EsR0FiRCxDQWFFLE9BQU9uTSxDQUFQLEVBQVU7QUFBQ2lCLFdBQVFDLEdBQVIsQ0FBWWxCLENBQVo7QUFBZTtBQUM1Qjs7QUE1TXNDOztBQWlOeEM7QUFDQSxTQUFTZ1IsWUFBVCxDQUFzQmpXLEtBQXRCLEVBQTZCQyxHQUE3QixFQUFrQztBQUNqQztBQUNBLEtBQUlLLFNBQVMsRUFBYjtBQUNBLEtBQUk0VixrQkFBa0IsK0RBQUF6QyxDQUFZMEMsa0JBQVosQ0FBK0JuVyxLQUEvQixFQUFzQ0MsR0FBdEMsQ0FBdEI7QUFDQSxRQUFPSyxNQUFQO0FBQ0E7O0FBRUQ7QUFDQSxTQUFTOFYsa0JBQVQsR0FBNkI7QUFDNUIsS0FBSTlHLFdBQVcsSUFBSXdGLEtBQUosRUFBZjtBQUNBLEtBQUl0TixhQUFhLElBQUkxRCxJQUFKLENBQVN1UyxLQUFLQyxZQUFMLENBQVQsQ0FBakI7O0FBRUEsU0FBUUMsWUFBUjtBQUNXLE9BQUssWUFBTDtBQUNBLE9BQUssWUFBTDtBQUNBLE9BQUssWUFBTDtBQUNBLE9BQUssWUFBTDtBQUNBLE9BQUssWUFBTDtBQUNBLE9BQUssWUFBTDtBQUNBLE9BQUssWUFBTDtBQUNSQyxzQkFBbUJsSCxRQUFuQixFQUE2QixDQUFDaUgsYUFBYUUsTUFBYixDQUFvQixDQUFwQixDQUFELENBQTdCO0FBQ1k7QUFDSixPQUFLLGNBQUw7QUFDUkQsc0JBQW1CbEgsUUFBbkIsRUFBNkIsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixDQUE3QjtBQUNZO0FBQ0osT0FBSyxpQkFBTDtBQUNSa0gsc0JBQW1CbEgsUUFBbkIsRUFBNkIsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsQ0FBN0I7QUFDQTtBQUNRLE9BQUssZ0JBQUw7QUFDUmtILHNCQUFtQmxILFFBQW5CLEVBQTZCLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBN0I7QUFDQTtBQUNRLE9BQUssZ0JBQUw7QUFDUmtILHNCQUFtQmxILFFBQW5CLEVBQTZCLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBN0I7QUFDQTtBQUNRLE9BQUssT0FBTDtBQUNSa0gsc0JBQW1CbEgsUUFBbkIsRUFBNkIsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixDQUE3QjtBQUNBO0FBQ1EsT0FBSyxRQUFMO0FBQWM7QUFDdEJrSCxzQkFBbUJsSCxRQUFuQixFQUE2QixDQUFDOUgsV0FBV2tQLE1BQVgsRUFBRCxDQUE3QjtBQUNBO0FBQ1EsT0FBSyxhQUFMO0FBQ1JGLHNCQUFtQmxILFFBQW5CLEVBQTZCLENBQUM5SCxXQUFXa1AsTUFBWCxFQUFELENBQTdCO0FBQ0EsUUFBSyxJQUFJclYsSUFBSSxDQUFiLEVBQWdCQSxJQUFJaU8sU0FBU2hPLE1BQTdCLEVBQXFDLEVBQUdELENBQXhDLEVBQTBDO0FBQ3pDLFFBQUlzVixRQUFRQyxXQUFXdEIsS0FBSzlOLFVBQUwsQ0FBWCxFQUE2QjhOLEtBQUtoRyxTQUFTak8sQ0FBVCxFQUFZLENBQVosQ0FBTCxDQUE3QixDQUFaO0FBQ0EsUUFBS3dWLFdBQVcsQ0FBQ0YsUUFBTSxDQUFQLElBQVUsR0FBckIsSUFBNEIsQ0FBN0IsSUFBbUMsQ0FBdkMsRUFBMEM7QUFDekNySCxjQUFTMkIsTUFBVCxDQUFnQjVQLENBQWhCLEVBQW1CLENBQW5CO0FBQ0FBO0FBQ0E7QUFDRDtBQUNEO0FBQ1EsT0FBSyxTQUFMO0FBQ1J5Vix1QkFBb0J4SCxRQUFwQjtBQUNBO0FBQ1EsT0FBSyxRQUFMO0FBQ1J5SCxzQkFBbUJ6SCxRQUFuQjtBQUNBO0FBQ0Q7QUFDUyxPQUFLLGdCQUFMO0FBQ0kwSCx1QkFBb0IxSCxRQUFwQixFQUE4QixHQUE5QjtBQUNaO0FBQ1EsT0FBSyxlQUFMO0FBQ0kwSCx1QkFBb0IxSCxRQUFwQixFQUE4QixHQUE5QjtBQUNaO0FBQ0Q7QUFBUTtBQUNQLFFBQUlpSCxhQUFhdkosT0FBYixDQUFxQixXQUFyQixLQUFxQyxDQUF6QyxFQUEyQztBQUMxQyxTQUFJaUssT0FBT1YsYUFBYVcsTUFBYixDQUFvQixZQUFZNVYsTUFBaEMsRUFBd0MyTSxLQUF4QyxDQUE4QyxFQUE5QyxDQUFYO0FBQ0F1SSx3QkFBbUJsSCxRQUFuQixFQUE2QjJILElBQTdCO0FBQ0E7QUFDRDtBQXhESDs7QUEyREEsUUFBTzNILFFBQVA7QUFDQTs7QUFHRDs7O0FBSUE7OztBQUdBO0FBQ0EsU0FBUzZILFFBQVQsR0FBb0I7QUFDbkIsS0FBSUMsVUFBSixFQUFnQixPQUFPQSxVQUFQO0FBQ2hCO0FBQ0EsS0FBSUMsS0FBS0MsVUFBVUMsU0FBVixDQUFvQkMsV0FBcEIsRUFBVDtBQUNBSixjQUFhQyxHQUFHckssT0FBSCxDQUFXLFFBQVgsS0FBd0IsQ0FBQyxDQUF0QztBQUNBO0FBQ0EsUUFBT29LLFVBQVA7QUFDQTs7QUFFRDtBQUNBLFNBQVMzQixxQkFBVCxDQUErQmdDLENBQS9CLEVBQWlDOztBQUVoQyxRQUFPQSxJQUFJLEVBQUosR0FBUyxNQUFNQSxDQUFmLEdBQW1CQSxDQUExQjtBQUNBOztBQUVEO0FBQ0EsU0FBU0Msb0JBQVQsQ0FBOEJDLEdBQTlCLEVBQW1DO0FBQ2xDLEtBQUlBLElBQUlyVyxNQUFKLEdBQWEsQ0FBakIsRUFBb0I7QUFDbkIsU0FBTyxNQUFNcVcsR0FBYjtBQUNBLEVBRkQsTUFFTztBQUNOLFNBQU9BLEdBQVA7QUFDQTtBQUNEOztBQUVEO0FBQ0EsU0FBU3RCLElBQVQsQ0FBY3NCLEdBQWQsRUFBa0I7QUFDakIsS0FBSSxDQUFDQSxHQUFMLEVBQ0MsT0FBTyxFQUFQO0FBQ0QsS0FBSTlULE9BQU8sSUFBSUMsSUFBSixDQUFTNlQsSUFBSVQsTUFBSixDQUFXLENBQVgsRUFBYyxDQUFkLENBQVQsRUFDUFMsSUFBSVQsTUFBSixDQUFXLENBQVgsRUFBYyxDQUFkLElBQW1CLENBRFosRUFFUFMsSUFBSVQsTUFBSixDQUFXLENBQVgsRUFBYyxDQUFkLENBRk8sRUFHUFMsSUFBSVQsTUFBSixDQUFXLEVBQVgsRUFBZSxDQUFmLENBSE8sRUFJUFMsSUFBSVQsTUFBSixDQUFXLEVBQVgsRUFBZSxDQUFmLENBSk8sRUFLUFMsSUFBSVQsTUFBSixDQUFXLEVBQVgsRUFBZSxDQUFmLENBTE8sQ0FBWDtBQU9BLFFBQU9yVCxJQUFQO0FBQ0EsQzs7Ozs7Ozs7Ozs7Ozs7QUNoVkQsK0RBQWU7QUFDWCtULGdCQUFZLEVBREQ7QUFFWDdLLGdCQUFZLENBQ1IsRUFBRSxjQUFjLFNBQWhCLEVBQTJCLGFBQWEsS0FBeEMsRUFEUSxFQUVSLEVBQUUsY0FBYyxTQUFoQixFQUEyQixhQUFhLEtBQXhDLEVBRlEsRUFHUixFQUFFLGNBQWMsU0FBaEIsRUFBMkIsYUFBYSxJQUF4QyxFQUhRLEVBSVIsRUFBRSxjQUFjLFNBQWhCLEVBQTJCLGFBQWEsS0FBeEMsRUFKUSxFQUtSLEVBQUUsY0FBYyxTQUFoQixFQUEyQixhQUFhLElBQXhDLEVBTFEsRUFNUixFQUFFLGNBQWMsU0FBaEIsRUFBMkIsYUFBYSxLQUF4QyxFQU5RLEVBT1IsRUFBRSxjQUFjLFNBQWhCLEVBQTJCLGFBQWEsSUFBeEMsRUFQUSxFQVFSLEVBQUUsY0FBYyxTQUFoQixFQUEyQixhQUFhLElBQXhDLEVBUlEsRUFTUixFQUFFLGNBQWMsU0FBaEIsRUFBMkIsYUFBYSxJQUF4QyxFQVRRLEVBVVIsRUFBRSxjQUFjLFNBQWhCLEVBQTJCLGFBQWEsS0FBeEMsRUFWUSxFQVdSLEVBQUUsY0FBYyxTQUFoQixFQUEyQixhQUFhLElBQXhDLEVBWFEsRUFZUixFQUFFLGNBQWMsU0FBaEIsRUFBMkIsYUFBYSxJQUF4QyxFQVpROztBQUZELENBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUFBO0FBQ0EsTUFBTThLLGlCQUFpQkMsT0FBT0MsUUFBOUI7QUFDQSxNQUFNQyxvQkFBb0JILGVBQWVJLE1BQXpDO0FBQ0EsTUFBTUMsY0FBY0wsZUFBZTlELFFBQW5DO0FBQ0EsTUFBTW9FLGNBQWNOLGVBQWVPLGVBQWYsQ0FBK0IsMkJBQS9CLENBQXBCOztBQUVBLFNBQVM3RSxVQUFULENBQW9COEUsR0FBcEIsRUFBeUJyUyxLQUF6QixFQUFnQztBQUM1QixXQUFPZ1Msa0JBQWtCTSxXQUFsQixDQUE4QkQsR0FBOUIsRUFBbUNyUyxLQUFuQyxFQUEwQyxhQUFhLFVBQXZELEtBQXNFLENBQTdFO0FBQ0g7O0FBRUQsU0FBU3VTLFFBQVQsQ0FBa0JGLEdBQWxCLEVBQXVCO0FBQ25CTCxzQkFBa0JNLFdBQWxCLENBQThCRCxHQUE5QixFQUFtQyxLQUFuQyxFQUEwQyxVQUExQztBQUNIOztBQUVELFNBQVNHLGdCQUFULENBQTBCeFMsS0FBMUIsRUFBaUNxUyxHQUFqQyxFQUFzQ3hQLFFBQVEsU0FBOUMsRUFBeUQ0UCxRQUFRLEdBQWpFLEVBQXNFO0FBQ2xFLFVBQU1DLFVBQVVQLFlBQVlRLGdCQUFaLENBQTZCLFNBQTdCLENBQWhCO0FBQ0E7QUFDQSxVQUFNQyxtQkFBbUJGLFVBQVUsU0FBbkM7QUFDQSxVQUFNRyxjQUFjSCxVQUFVLGNBQTlCO0FBQ0E7QUFDQSxVQUFNSSxTQUFVLElBQUdELFdBQVksd0NBQXVDN1MsS0FBTSxjQUFhcVMsR0FBSSxzQkFBcUJ4UCxLQUFNLFdBQVU0UCxLQUFNLEVBQXhJO0FBQ0E7QUFDQU4sZ0JBQVlZLE1BQVosQ0FBbUJILGdCQUFuQixFQUFxQ0UsTUFBckMsRUFBNkMsS0FBN0M7QUFDSDs7QUFFRCxNQUFNRSxRQUFOLENBQWU7O0FBRVg3WixnQkFBWTBaLFdBQVosRUFBeUJJLGFBQXpCLEVBQXdDSCxNQUF4QyxFQUFnRDtBQUM1QztBQUNBLGNBQU1KLFVBQVVQLFlBQVlRLGdCQUFaLENBQTZCLFNBQTdCLENBQWhCO0FBQ0EsYUFBS0QsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsYUFBS1EsTUFBTCxHQUFjUixVQUFVLFNBQXhCO0FBQ0EsYUFBS0csV0FBTCxHQUFtQkEsY0FBY0gsVUFBVUcsV0FBeEIsR0FBc0NILFVBQVUsbUJBQW5FO0FBQ0EsYUFBS08sYUFBTCxHQUFxQkEsaUJBQWlCLGdCQUF0QztBQUNBLGFBQUtILE1BQUwsR0FBY0EsTUFBZDtBQUNIOztBQUVESyxrQkFBY0MsY0FBZCxFQUE4QkMsWUFBOUIsRUFBNEM7QUFDeEMsY0FBTVAsU0FBVSxJQUFHLEtBQUtKLE9BQUwsR0FBZSxtQkFBb0Isb0NBQW1DVSxjQUFlLElBQUdDLFlBQWEsRUFBeEg7QUFDQWxCLG9CQUFZWSxNQUFaLENBQW1CLEtBQUtHLE1BQXhCLEVBQWdDSixNQUFoQyxFQUF3QyxLQUF4QztBQUNIOztBQUVEUSxxQkFBaUJ0VCxLQUFqQixFQUF3QnFTLEdBQXhCLEVBQTZCeFAsUUFBUSxTQUFyQyxFQUFnRDRQLFFBQVEsR0FBeEQsRUFBNkQ7QUFDekRELHlCQUFpQnhTLEtBQWpCLEVBQXdCcVMsR0FBeEIsRUFBNkJ4UCxLQUE3QixFQUFvQzRQLEtBQXBDO0FBQ0g7O0FBRUQsV0FBT2MsZUFBUCxHQUF5QjtBQUNyQixlQUFPO0FBQ0gxQiwwQkFERyxFQUNhRyxpQkFEYixFQUNnQ0UsV0FEaEMsRUFDNkNDO0FBRDdDLFNBQVA7QUFHSDtBQXpCVSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cbiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7XG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHR9XG4gXHR2YXIgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2sgPSB3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdO1xuIFx0d2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXSA9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gd2VicGFja0hvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdFx0aWYgKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHR9IDtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XG4gXHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuIFx0XHRzY3JpcHQuY2hhcnNldCA9IFwidXRmLThcIjtcbiBcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIjtcbiBcdFx0O1xuIFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdChyZXF1ZXN0VGltZW91dCkge1xuIFx0XHRyZXF1ZXN0VGltZW91dCA9IHJlcXVlc3RUaW1lb3V0IHx8IDEwMDAwO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0aWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xuIFx0XHRcdH1cbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiBcdFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xuIFx0XHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcbiBcdFx0XHRcdHJlcXVlc3QudGltZW91dCA9IHJlcXVlc3RUaW1lb3V0O1xuIFx0XHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuIFx0XHRcdFx0aWYgKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XG4gXHRcdFx0XHRcdC8vIHRpbWVvdXRcbiBcdFx0XHRcdFx0cmVqZWN0KFxuIFx0XHRcdFx0XHRcdG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIHRpbWVkIG91dC5cIilcbiBcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xuIFx0XHRcdFx0XHQvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG4gXHRcdFx0XHRcdHJlc29sdmUoKTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XG4gXHRcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcbiBcdFx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIGZhaWxlZC5cIikpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0Ly8gc3VjY2Vzc1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuIFx0XHRcdFx0XHRcdHJlamVjdChlKTtcbiBcdFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0cmVzb2x2ZSh1cGRhdGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcIjc0OThjMTg2OGU0ZDllMWVjZjA0XCI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0aWYgKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiBcdFx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuIFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcbiBcdFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuIFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcbiBcdFx0XHRcdFx0XHRyZXF1ZXN0ICtcbiBcdFx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuIFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHQpO1xuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XG4gXHRcdH07XG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH0sXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9O1xuIFx0XHRmb3IgKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwiZVwiICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcInRcIlxuIFx0XHRcdCkge1xuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInJlYWR5XCIpIGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR0aHJvdyBlcnI7XG4gXHRcdFx0fSk7XG5cbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XG4gXHRcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xuIFx0XHRcdFx0XHRpZiAoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdFx0Zm4udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdFx0aWYgKG1vZGUgJiAxKSB2YWx1ZSA9IGZuKHZhbHVlKTtcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy50KHZhbHVlLCBtb2RlICYgfjEpO1xuIFx0XHR9O1xuIFx0XHRyZXR1cm4gZm47XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBob3QgPSB7XG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcblxuIFx0XHRcdC8vIE1vZHVsZSBBUElcbiBcdFx0XHRhY3RpdmU6IHRydWUsXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGRlcCA9PT0gXCJ1bmRlZmluZWRcIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0XHRlbHNlIGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0fSxcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgZGVwID09PSBcInVuZGVmaW5lZFwiKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAraWQgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdH1cbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XG4gXHRcdFx0aWYgKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHRmb3IodmFyIGNodW5rSWQgaW4gaW5zdGFsbGVkQ2h1bmtzKVxuIFx0XHRcdHtcbiBcdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbG9uZS1ibG9ja3NcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCkubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmICghbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCkgY29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdClcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm90IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwiaW5kZXhcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goW1wiLi9zcmMvaW5kZXguanNcIixcInZlbmRvclwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxyXFxuLyog5pel5Y6G5pW05L2T5qC35byPXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuI2NhbGVuZGFyLWNvbnRhaW5lciB7XFxyXFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gICAgdG9wOiAwO1xcclxcbiAgICBsZWZ0OiA4cHg7XFxyXFxuICAgIHJpZ2h0OiA4cHg7XFxyXFxuICAgIGJvdHRvbTogOHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZmMtaGVhZGVyLXRvb2xiYXIge1xcclxcbiAgICAvKlxcclxcbiAgICB0aGUgY2FsZW5kYXIgd2lsbCBiZSBidXR0aW5nIHVwIGFnYWluc3QgdGhlIGVkZ2VzLFxcclxcbiAgICBidXQgbGV0J3Mgc2Nvb3QgaW4gdGhlIGhlYWRlcidzIGJ1dHRvbnNcXHJcXG4gICAgKi9cXHJcXG4gICAgcGFkZGluZy10b3A6IDE0cHg7XFxyXFxuICAgIHBhZGRpbmctbGVmdDogMDtcXHJcXG4gICAgcGFkZGluZy1yaWdodDogMDtcXHJcXG59XFxyXFxuXFxyXFxuLyog5LqL5Lu25riy5p+TXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuLnRjLWNvbXBsZXRlIHtcXHJcXG4gICAgb3BhY2l0eTogMC4zO1xcclxcblxcclxcbn1cXHJcXG5cXHJcXG4udGMtY29tcGxldGUgPiAuZmMtY29udGVudCB7XFxyXFxuICAgIHRleHQtZGVjb3JhdGlvbjogbGluZS10aHJvdWdoICFpbXBvcnRhbnQ7XFxyXFxufVxcclxcblxcclxcbi50Yy1jb21wbGV0ZTpob3ZlciB7XFxyXFxuICAgIG9wYWNpdHk6IDE7XFxyXFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLyogUG9wb3ZlciDnu4Tku7bmoLflvI9cXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG5cXHJcXG4vKiBQb3BvdmVyIOWuueWZqOWPiuWumuS9jVxcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcblxcclxcbi50Yy1wb3BvdmVyIHtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICBiYWNrZ3JvdW5kOiAjRkZGO1xcclxcbiAgICBjb2xvcjogYmxhY2s7XFxyXFxuICAgIHdpZHRoOiBhdXRvO1xcclxcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMik7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcXHJcXG4gICAgYm94LXNoYWRvdzogMCAycHggNHB4IHJnYmEoMCwgMCwgMCwgLjIpO1xcclxcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3ZlciAuYXJyb3cge1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgICB3aWR0aDogMjBweDtcXHJcXG4gICAgaGVpZ2h0OiAxMHB4O1xcclxcbiAgICBtYXJnaW46IDAgNnB4O1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3ZlciAuYXJyb3c6OmJlZm9yZSwgLnRjLXBvcG92ZXIgLmFycm93OjphZnRlciB7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcclxcbiAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xcclxcbiAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xcclxcbn1cXHJcXG5cXHJcXG4vKiB0b3Ag5pS+572u5qC35byPXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJ0b3BcXFwiXSB7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwidG9wXFxcIl0gLmFycm93IHtcXHJcXG4gICAgYm90dG9tOiBjYWxjKCgxMHB4ICsgMXB4KSAqIC0xKTtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJ0b3BcXFwiXSAuYXJyb3c6OmJlZm9yZSxcXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInRvcFxcXCJdIC5hcnJvdzo6YWZ0ZXIge1xcclxcbiAgICBib3JkZXItd2lkdGg6IDEwcHggMTBweCAwO1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInRvcFxcXCJdIC5hcnJvdzo6YmVmb3JlIHtcXHJcXG4gICAgYm90dG9tOiAwO1xcclxcbiAgICBib3JkZXItdG9wLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMjUpO1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInRvcFxcXCJdIC5hcnJvdzo6YWZ0ZXIge1xcclxcbiAgICBib3R0b206IDFweDtcXHJcXG4gICAgYm9yZGVyLXRvcC1jb2xvcjogI2ZmZjtcXHJcXG59XFxyXFxuXFxyXFxuLyogcmlnaHQg5pS+572u5qC35byPXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJyaWdodFxcXCJdIHtcXHJcXG4gICAgbWFyZ2luLWxlZnQ6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwicmlnaHRcXFwiXSAuYXJyb3cge1xcclxcbiAgICBsZWZ0OiBjYWxjKCgxMHB4ICsgMXB4KSAqIC0xKTtcXHJcXG4gICAgd2lkdGg6IDEwcHg7XFxyXFxuICAgIGhlaWdodDogMjBweDtcXHJcXG4gICAgbWFyZ2luOiA2cHggMDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJyaWdodFxcXCJdIC5hcnJvdzo6YmVmb3JlLFxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwicmlnaHRcXFwiXSAuYXJyb3c6OmFmdGVyIHtcXHJcXG4gICAgYm9yZGVyLXdpZHRoOiAxMHB4IDEwcHggMTBweCAwO1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInJpZ2h0XFxcIl0gLmFycm93OjpiZWZvcmUge1xcclxcbiAgICBsZWZ0OiAwO1xcclxcbiAgICBib3JkZXItcmlnaHQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSk7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwicmlnaHRcXFwiXSAuYXJyb3c6OmFmdGVyIHtcXHJcXG4gICAgbGVmdDogMXB4O1xcclxcbiAgICBib3JkZXItcmlnaHQtY29sb3I6ICNmZmY7XFxyXFxufVxcclxcblxcclxcbi8qIGJvdHRvbSDmlL7nva7moLflvI9cXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImJvdHRvbVxcXCJdIHtcXHJcXG4gICAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJib3R0b21cXFwiXSAuYXJyb3cge1xcclxcbiAgICB0b3A6IGNhbGMoKDEwcHggKyAxcHgpICogLTEpO1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImJvdHRvbVxcXCJdIC5hcnJvdzo6YmVmb3JlLFxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwiYm90dG9tXFxcIl0gLmFycm93OjphZnRlciB7XFxyXFxuICAgIGJvcmRlci13aWR0aDogMCAxMHB4IDEwcHggMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJib3R0b21cXFwiXSAuYXJyb3c6OmJlZm9yZSB7XFxyXFxuICAgIHRvcDogMDtcXHJcXG4gICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KTtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJib3R0b21cXFwiXSAuYXJyb3c6OmFmdGVyIHtcXHJcXG4gICAgdG9wOiAxcHg7XFxyXFxuICAgIGJvcmRlci1ib3R0b20tY29sb3I6ICNmN2Y3Zjc7IC8q6L+Z6YeM5Li65LqG5LiT6Zeo6YCC6YWN5pyJ5qCH6aKY6IOM5pmv55qEUG9wb3ZlciovXFxyXFxufVxcclxcblxcclxcbi8qIGxlZnQg5pS+572u5qC35byPXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJsZWZ0XFxcIl0ge1xcclxcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwibGVmdFxcXCJdIC5hcnJvdyB7XFxyXFxuICAgIHJpZ2h0OiBjYWxjKCgxMHB4ICsgMXB4KSAqIC0xKTtcXHJcXG4gICAgd2lkdGg6IDEwcHg7XFxyXFxuICAgIGhlaWdodDogMjBweDtcXHJcXG4gICAgbWFyZ2luOiA2cHggMDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJsZWZ0XFxcIl0gLmFycm93OjpiZWZvcmUsXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJsZWZ0XFxcIl0gLmFycm93OjphZnRlciB7XFxyXFxuICAgIGJvcmRlci13aWR0aDogMTBweCAwIDEwcHggMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJsZWZ0XFxcIl0gLmFycm93OjpiZWZvcmUge1xcclxcbiAgICByaWdodDogMDtcXHJcXG4gICAgYm9yZGVyLWxlZnQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSk7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwibGVmdFxcXCJdIC5hcnJvdzo6YWZ0ZXIge1xcclxcbiAgICByaWdodDogMXB4O1xcclxcbiAgICBib3JkZXItbGVmdC1jb2xvcjogI2ZmZjtcXHJcXG59XFxyXFxuXFxyXFxuLyogQ29udGVudCDmoIfpopjlkozlhoXlrrlcXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG5cXHJcXG4udGMtcG9wb3Zlci1oZWFkZXIge1xcclxcbiAgICBwYWRkaW5nOiAuNXJlbSAuNzVyZW07XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IDA7XFxyXFxuICAgIGZvbnQtc2l6ZTogMXJlbTtcXHJcXG4gICAgY29sb3I6IGluaGVyaXQ7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmN2Y3Zjc7XFxyXFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZWJlYmViO1xcclxcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA2cHg7XFxyXFxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA2cHg7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyLWJvZHkge1xcclxcbiAgICBwYWRkaW5nOiAxMHB4IDE1cHg7XFxyXFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiI3RjLWVkaXRwb3BwZXItZXZlbnR0aXRsZSB7XFxyXFxuICAgIGJvcmRlci13aWR0aDogMXB4O1xcclxcbiAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXHJcXG4gICAgcGFkZGluZzogMDtcXHJcXG4gICAgbWFyZ2luOiAwO1xcclxcbiAgICBmb250LXNpemU6IDEuMmVtO1xcclxcbiAgICBmb250LXdlaWdodDogYm9sZDtcXHJcXG59XFxyXFxuXFxyXFxuI3RjLWVkaXRwb3BwZXItZXZlbnR0aXRsZTpmb2N1cyxcXHJcXG4jdGMtZWRpdHBvcHBlci1ldmVudHRpdGxlOmhvdmVyIHtcXHJcXG4gICAgb3V0bGluZTogbm9uZTtcXHJcXG4gICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogYmxhY2s7IFxcclxcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcImh0bWwsIGJvZHkge1xcclxcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcclxcbiAgICBmb250LXNpemU6IDE0cHg7XFxyXFxufVxcclxcblxcclxcbjpmb2N1cyB7XFxyXFxuICAgIG91dGxpbmU6bm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLyogRm9udHMuY3NzIC0tIOi3qOW5s+WPsOS4reaWh+Wtl+S9k+ino+WGs+aWueahiFxcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG4uZm9udC1oZWkge2ZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBcXFwiTm90byBTYW5zXFxcIiwgXFxcIkhlbHZldGljYSBOZXVlXFxcIiwgSGVsdmV0aWNhLCBcXFwiTmltYnVzIFNhbnMgTFxcXCIsIEFyaWFsLCBcXFwiTGliZXJhdGlvbiBTYW5zXFxcIiwgXFxcIlBpbmdGYW5nIFNDXFxcIiwgXFxcIkhpcmFnaW5vIFNhbnMgR0JcXFwiLCBcXFwiTm90byBTYW5zIENKSyBTQ1xcXCIsIFxcXCJTb3VyY2UgSGFuIFNhbnMgU0NcXFwiLCBcXFwiU291cmNlIEhhbiBTYW5zIENOXFxcIiwgXFxcIk1pY3Jvc29mdCBZYUhlaVxcXCIsIFxcXCJXZW5xdWFueWkgTWljcm8gSGVpXFxcIiwgXFxcIldlblF1YW5ZaSBaZW4gSGVpXFxcIiwgXFxcIlNUIEhlaXRpXFxcIiwgU2ltSGVpLCBcXFwiV2VuUXVhbllpIFplbiBIZWkgU2hhcnBcXFwiLCBzYW5zLXNlcmlmO31cXHJcXG4uZm9udC1rYWkge2ZvbnQtZmFtaWx5OiBCYXNrZXJ2aWxsZSwgR2VvcmdpYSwgXFxcIkxpYmVyYXRpb24gU2VyaWZcXFwiLCBcXFwiS2FpdGkgU0NcXFwiLCBTVEthaXRpLCBcXFwiQVIgUEwgVUthaSBDTlxcXCIsIFxcXCJBUiBQTCBVS2FpIEhLXFxcIiwgXFxcIkFSIFBMIFVLYWkgVFdcXFwiLCBcXFwiQVIgUEwgVUthaSBUVyBNQkVcXFwiLCBcXFwiQVIgUEwgS2FpdGlNIEdCXFxcIiwgS2FpVGksIEthaVRpX0dCMjMxMiwgREZLYWktU0IsIFxcXCJUVy1LYWlcXFwiLCBzZXJpZjt9XFxyXFxuLmZvbnQtc29uZyB7Zm9udC1mYW1pbHk6IEdlb3JnaWEsIFxcXCJOaW1idXMgUm9tYW4gTm85IExcXFwiLCBcXFwiU29uZ3RpIFNDXFxcIiwgXFxcIk5vdG8gU2VyaWYgQ0pLIFNDXFxcIiwgXFxcIlNvdXJjZSBIYW4gU2VyaWYgU0NcXFwiLCBcXFwiU291cmNlIEhhbiBTZXJpZiBDTlxcXCIsIFNUU29uZywgXFxcIkFSIFBMIE5ldyBTdW5nXFxcIiwgXFxcIkFSIFBMIFN1bmd0aUwgR0JcXFwiLCBOU2ltU3VuLCBTaW1TdW4sIFxcXCJUVy1TdW5nXFxcIiwgXFxcIldlblF1YW5ZaSBCaXRtYXAgU29uZ1xcXCIsIFxcXCJBUiBQTCBVTWluZyBDTlxcXCIsIFxcXCJBUiBQTCBVTWluZyBIS1xcXCIsIFxcXCJBUiBQTCBVTWluZyBUV1xcXCIsIFxcXCJBUiBQTCBVTWluZyBUVyBNQkVcXFwiLCBQTWluZ0xpVSwgTWluZ0xpVSwgc2VyaWY7fVxcclxcbi5mb250LWZhbmctc29uZyB7Zm9udC1mYW1pbHk6IEJhc2tlcnZpbGxlLCBcXFwiVGltZXMgTmV3IFJvbWFuXFxcIiwgXFxcIkxpYmVyYXRpb24gU2VyaWZcXFwiLCBTVEZhbmdzb25nLCBGYW5nU29uZywgRmFuZ1NvbmdfR0IyMzEyLCBcXFwiQ1dURVgtRlxcXCIsIHNlcmlmO31cXHJcXG5cXHJcXG4vKiDkuLTml7bmlL7nva5cXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG5cXHJcXG4udWktYnV0dG9uLWljb24tb25seS5zcGxpdGJ1dHRvbi1zZWxlY3Qge1xcclxcbiAgICB3aWR0aDogMWVtO1xcclxcbn1cXHJcXG5cXHJcXG5hW2RhdGEtZ290b10ge1xcclxcbiAgICBjb2xvcjogIzAwMDtcXHJcXG59XFxyXFxuXFxyXFxuLyogQm9vdHN0cmFwIDQg57uE5Lu25qC35byPXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuXFxyXFxuLyog6KGo5Y2VXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuLmNvbC1mb3JtLWxhYmVsIHtcXHJcXG4gICAgcGFkZGluZy10b3A6IGNhbGMoLjM3NXJlbSArIDFweCk7XFxyXFxuICAgIHBhZGRpbmctYm90dG9tOiBjYWxjKC4zNzVyZW0gKyAxcHgpO1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xcclxcbiAgICBmb250LXNpemU6IGluaGVyaXQ7XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiAxLjU7XFxyXFxufVxcclxcblxcclxcbi5pbnB1dC1ncm91cC1hZGRvbiB7XFxyXFxuICBib3JkZXItbGVmdC13aWR0aDogMDtcXHJcXG4gIGJvcmRlci1yaWdodC13aWR0aDogMDtcXHJcXG59XFxyXFxuLmlucHV0LWdyb3VwLWFkZG9uOmZpcnN0LWNoaWxkIHtcXHJcXG4gIGJvcmRlci1sZWZ0LXdpZHRoOiAxcHg7XFxyXFxufVxcclxcbi5pbnB1dC1ncm91cC1hZGRvbjpsYXN0LWNoaWxkIHtcXHJcXG4gIGJvcmRlci1yaWdodC13aWR0aDogMXB4O1xcclxcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJ2YXIgbWFwID0ge1xuXHRcIi4vYWZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FmLmpzXCIsXG5cdFwiLi9hZi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYWYuanNcIixcblx0XCIuL2FyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci5qc1wiLFxuXHRcIi4vYXItZHpcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWR6LmpzXCIsXG5cdFwiLi9hci1kei5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItZHouanNcIixcblx0XCIuL2FyLWt3XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1rdy5qc1wiLFxuXHRcIi4vYXIta3cuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWt3LmpzXCIsXG5cdFwiLi9hci1seVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItbHkuanNcIixcblx0XCIuL2FyLWx5LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1seS5qc1wiLFxuXHRcIi4vYXItbWFcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLW1hLmpzXCIsXG5cdFwiLi9hci1tYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItbWEuanNcIixcblx0XCIuL2FyLXNhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1zYS5qc1wiLFxuXHRcIi4vYXItc2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLXNhLmpzXCIsXG5cdFwiLi9hci10blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItdG4uanNcIixcblx0XCIuL2FyLXRuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci10bi5qc1wiLFxuXHRcIi4vYXIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLmpzXCIsXG5cdFwiLi9helwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXouanNcIixcblx0XCIuL2F6LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hei5qc1wiLFxuXHRcIi4vYmVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JlLmpzXCIsXG5cdFwiLi9iZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYmUuanNcIixcblx0XCIuL2JnXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iZy5qc1wiLFxuXHRcIi4vYmcuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JnLmpzXCIsXG5cdFwiLi9ibVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm0uanNcIixcblx0XCIuL2JtLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ibS5qc1wiLFxuXHRcIi4vYm5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JuLmpzXCIsXG5cdFwiLi9ibi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm4uanNcIixcblx0XCIuL2JvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iby5qc1wiLFxuXHRcIi4vYm8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JvLmpzXCIsXG5cdFwiLi9iclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYnIuanNcIixcblx0XCIuL2JyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ici5qc1wiLFxuXHRcIi4vYnNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JzLmpzXCIsXG5cdFwiLi9icy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYnMuanNcIixcblx0XCIuL2NhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jYS5qc1wiLFxuXHRcIi4vY2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2NhLmpzXCIsXG5cdFwiLi9jc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3MuanNcIixcblx0XCIuL2NzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jcy5qc1wiLFxuXHRcIi4vY3ZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2N2LmpzXCIsXG5cdFwiLi9jdi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3YuanNcIixcblx0XCIuL2N5XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jeS5qc1wiLFxuXHRcIi4vY3kuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2N5LmpzXCIsXG5cdFwiLi9kYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGEuanNcIixcblx0XCIuL2RhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kYS5qc1wiLFxuXHRcIi4vZGVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLmpzXCIsXG5cdFwiLi9kZS1hdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUtYXQuanNcIixcblx0XCIuL2RlLWF0LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS1hdC5qc1wiLFxuXHRcIi4vZGUtY2hcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLWNoLmpzXCIsXG5cdFwiLi9kZS1jaC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUtY2guanNcIixcblx0XCIuL2RlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS5qc1wiLFxuXHRcIi4vZHZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2R2LmpzXCIsXG5cdFwiLi9kdi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZHYuanNcIixcblx0XCIuL2VsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbC5qc1wiLFxuXHRcIi4vZWwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VsLmpzXCIsXG5cdFwiLi9lbi1hdVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tYXUuanNcIixcblx0XCIuL2VuLWF1LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1hdS5qc1wiLFxuXHRcIi4vZW4tY2FcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWNhLmpzXCIsXG5cdFwiLi9lbi1jYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tY2EuanNcIixcblx0XCIuL2VuLWdiXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1nYi5qc1wiLFxuXHRcIi4vZW4tZ2IuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWdiLmpzXCIsXG5cdFwiLi9lbi1pZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4taWUuanNcIixcblx0XCIuL2VuLWllLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1pZS5qc1wiLFxuXHRcIi4vZW4taWxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWlsLmpzXCIsXG5cdFwiLi9lbi1pbC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4taWwuanNcIixcblx0XCIuL2VuLW56XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1uei5qc1wiLFxuXHRcIi4vZW4tbnouanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLW56LmpzXCIsXG5cdFwiLi9lb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW8uanNcIixcblx0XCIuL2VvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lby5qc1wiLFxuXHRcIi4vZXNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLmpzXCIsXG5cdFwiLi9lcy1kb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMtZG8uanNcIixcblx0XCIuL2VzLWRvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy1kby5qc1wiLFxuXHRcIi4vZXMtdXNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLXVzLmpzXCIsXG5cdFwiLi9lcy11cy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMtdXMuanNcIixcblx0XCIuL2VzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy5qc1wiLFxuXHRcIi4vZXRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2V0LmpzXCIsXG5cdFwiLi9ldC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXQuanNcIixcblx0XCIuL2V1XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ldS5qc1wiLFxuXHRcIi4vZXUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2V1LmpzXCIsXG5cdFwiLi9mYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZmEuanNcIixcblx0XCIuL2ZhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mYS5qc1wiLFxuXHRcIi4vZmlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZpLmpzXCIsXG5cdFwiLi9maS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZmkuanNcIixcblx0XCIuL2ZvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mby5qc1wiLFxuXHRcIi4vZm8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZvLmpzXCIsXG5cdFwiLi9mclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnIuanNcIixcblx0XCIuL2ZyLWNhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci1jYS5qc1wiLFxuXHRcIi4vZnItY2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLWNhLmpzXCIsXG5cdFwiLi9mci1jaFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnItY2guanNcIixcblx0XCIuL2ZyLWNoLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci1jaC5qc1wiLFxuXHRcIi4vZnIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLmpzXCIsXG5cdFwiLi9meVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnkuanNcIixcblx0XCIuL2Z5LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9meS5qc1wiLFxuXHRcIi4vZ2RcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dkLmpzXCIsXG5cdFwiLi9nZC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ2QuanNcIixcblx0XCIuL2dsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nbC5qc1wiLFxuXHRcIi4vZ2wuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dsLmpzXCIsXG5cdFwiLi9nb20tbGF0blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ29tLWxhdG4uanNcIixcblx0XCIuL2dvbS1sYXRuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nb20tbGF0bi5qc1wiLFxuXHRcIi4vZ3VcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2d1LmpzXCIsXG5cdFwiLi9ndS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ3UuanNcIixcblx0XCIuL2hlXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oZS5qc1wiLFxuXHRcIi4vaGUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hlLmpzXCIsXG5cdFwiLi9oaVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaGkuanNcIixcblx0XCIuL2hpLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oaS5qc1wiLFxuXHRcIi4vaHJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hyLmpzXCIsXG5cdFwiLi9oci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHIuanNcIixcblx0XCIuL2h1XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9odS5qc1wiLFxuXHRcIi4vaHUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2h1LmpzXCIsXG5cdFwiLi9oeS1hbVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHktYW0uanNcIixcblx0XCIuL2h5LWFtLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oeS1hbS5qc1wiLFxuXHRcIi4vaWRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2lkLmpzXCIsXG5cdFwiLi9pZC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaWQuanNcIixcblx0XCIuL2lzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pcy5qc1wiLFxuXHRcIi4vaXMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2lzLmpzXCIsXG5cdFwiLi9pdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaXQuanNcIixcblx0XCIuL2l0LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pdC5qc1wiLFxuXHRcIi4vamFcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2phLmpzXCIsXG5cdFwiLi9qYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvamEuanNcIixcblx0XCIuL2p2XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9qdi5qc1wiLFxuXHRcIi4vanYuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2p2LmpzXCIsXG5cdFwiLi9rYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva2EuanNcIixcblx0XCIuL2thLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rYS5qc1wiLFxuXHRcIi4va2tcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2trLmpzXCIsXG5cdFwiLi9ray5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva2suanNcIixcblx0XCIuL2ttXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rbS5qc1wiLFxuXHRcIi4va20uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ttLmpzXCIsXG5cdFwiLi9rblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva24uanNcIixcblx0XCIuL2tuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rbi5qc1wiLFxuXHRcIi4va29cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2tvLmpzXCIsXG5cdFwiLi9rby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva28uanNcIixcblx0XCIuL2t5XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9reS5qc1wiLFxuXHRcIi4va3kuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2t5LmpzXCIsXG5cdFwiLi9sYlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbGIuanNcIixcblx0XCIuL2xiLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sYi5qc1wiLFxuXHRcIi4vbG9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2xvLmpzXCIsXG5cdFwiLi9sby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbG8uanNcIixcblx0XCIuL2x0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sdC5qc1wiLFxuXHRcIi4vbHQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2x0LmpzXCIsXG5cdFwiLi9sdlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbHYuanNcIixcblx0XCIuL2x2LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sdi5qc1wiLFxuXHRcIi4vbWVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21lLmpzXCIsXG5cdFwiLi9tZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWUuanNcIixcblx0XCIuL21pXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9taS5qc1wiLFxuXHRcIi4vbWkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21pLmpzXCIsXG5cdFwiLi9ta1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWsuanNcIixcblx0XCIuL21rLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tay5qc1wiLFxuXHRcIi4vbWxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21sLmpzXCIsXG5cdFwiLi9tbC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWwuanNcIixcblx0XCIuL21uXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tbi5qc1wiLFxuXHRcIi4vbW4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21uLmpzXCIsXG5cdFwiLi9tclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXIuanNcIixcblx0XCIuL21yLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tci5qc1wiLFxuXHRcIi4vbXNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21zLmpzXCIsXG5cdFwiLi9tcy1teVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXMtbXkuanNcIixcblx0XCIuL21zLW15LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tcy1teS5qc1wiLFxuXHRcIi4vbXMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21zLmpzXCIsXG5cdFwiLi9tdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXQuanNcIixcblx0XCIuL210LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tdC5qc1wiLFxuXHRcIi4vbXlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL215LmpzXCIsXG5cdFwiLi9teS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXkuanNcIixcblx0XCIuL25iXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9uYi5qc1wiLFxuXHRcIi4vbmIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25iLmpzXCIsXG5cdFwiLi9uZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmUuanNcIixcblx0XCIuL25lLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9uZS5qc1wiLFxuXHRcIi4vbmxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25sLmpzXCIsXG5cdFwiLi9ubC1iZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmwtYmUuanNcIixcblx0XCIuL25sLWJlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubC1iZS5qc1wiLFxuXHRcIi4vbmwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25sLmpzXCIsXG5cdFwiLi9ublwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbm4uanNcIixcblx0XCIuL25uLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubi5qc1wiLFxuXHRcIi4vcGEtaW5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3BhLWluLmpzXCIsXG5cdFwiLi9wYS1pbi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcGEtaW4uanNcIixcblx0XCIuL3BsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wbC5qc1wiLFxuXHRcIi4vcGwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3BsLmpzXCIsXG5cdFwiLi9wdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcHQuanNcIixcblx0XCIuL3B0LWJyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wdC1ici5qc1wiLFxuXHRcIi4vcHQtYnIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3B0LWJyLmpzXCIsXG5cdFwiLi9wdC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcHQuanNcIixcblx0XCIuL3JvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9yby5qc1wiLFxuXHRcIi4vcm8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3JvLmpzXCIsXG5cdFwiLi9ydVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcnUuanNcIixcblx0XCIuL3J1LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ydS5qc1wiLFxuXHRcIi4vc2RcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NkLmpzXCIsXG5cdFwiLi9zZC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2QuanNcIixcblx0XCIuL3NlXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zZS5qc1wiLFxuXHRcIi4vc2UuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NlLmpzXCIsXG5cdFwiLi9zaVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2kuanNcIixcblx0XCIuL3NpLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zaS5qc1wiLFxuXHRcIi4vc2tcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NrLmpzXCIsXG5cdFwiLi9zay5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2suanNcIixcblx0XCIuL3NsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zbC5qc1wiLFxuXHRcIi4vc2wuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NsLmpzXCIsXG5cdFwiLi9zcVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3EuanNcIixcblx0XCIuL3NxLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zcS5qc1wiLFxuXHRcIi4vc3JcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NyLmpzXCIsXG5cdFwiLi9zci1jeXJsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zci1jeXJsLmpzXCIsXG5cdFwiLi9zci1jeXJsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zci1jeXJsLmpzXCIsXG5cdFwiLi9zci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3IuanNcIixcblx0XCIuL3NzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zcy5qc1wiLFxuXHRcIi4vc3MuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NzLmpzXCIsXG5cdFwiLi9zdlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3YuanNcIixcblx0XCIuL3N2LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zdi5qc1wiLFxuXHRcIi4vc3dcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3N3LmpzXCIsXG5cdFwiLi9zdy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3cuanNcIixcblx0XCIuL3RhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90YS5qc1wiLFxuXHRcIi4vdGEuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RhLmpzXCIsXG5cdFwiLi90ZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGUuanNcIixcblx0XCIuL3RlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ZS5qc1wiLFxuXHRcIi4vdGV0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ZXQuanNcIixcblx0XCIuL3RldC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGV0LmpzXCIsXG5cdFwiLi90Z1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGcuanNcIixcblx0XCIuL3RnLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90Zy5qc1wiLFxuXHRcIi4vdGhcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RoLmpzXCIsXG5cdFwiLi90aC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGguanNcIixcblx0XCIuL3RsLXBoXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90bC1waC5qc1wiLFxuXHRcIi4vdGwtcGguanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RsLXBoLmpzXCIsXG5cdFwiLi90bGhcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RsaC5qc1wiLFxuXHRcIi4vdGxoLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90bGguanNcIixcblx0XCIuL3RyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ci5qc1wiLFxuXHRcIi4vdHIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RyLmpzXCIsXG5cdFwiLi90emxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3R6bC5qc1wiLFxuXHRcIi4vdHpsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90emwuanNcIixcblx0XCIuL3R6bVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHptLmpzXCIsXG5cdFwiLi90em0tbGF0blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHptLWxhdG4uanNcIixcblx0XCIuL3R6bS1sYXRuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90em0tbGF0bi5qc1wiLFxuXHRcIi4vdHptLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90em0uanNcIixcblx0XCIuL3VnLWNuXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91Zy1jbi5qc1wiLFxuXHRcIi4vdWctY24uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VnLWNuLmpzXCIsXG5cdFwiLi91a1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdWsuanNcIixcblx0XCIuL3VrLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ay5qc1wiLFxuXHRcIi4vdXJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VyLmpzXCIsXG5cdFwiLi91ci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXIuanNcIixcblx0XCIuL3V6XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ei5qc1wiLFxuXHRcIi4vdXotbGF0blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXotbGF0bi5qc1wiLFxuXHRcIi4vdXotbGF0bi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXotbGF0bi5qc1wiLFxuXHRcIi4vdXouanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3V6LmpzXCIsXG5cdFwiLi92aVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdmkuanNcIixcblx0XCIuL3ZpLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS92aS5qc1wiLFxuXHRcIi4veC1wc2V1ZG9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3gtcHNldWRvLmpzXCIsXG5cdFwiLi94LXBzZXVkby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUveC1wc2V1ZG8uanNcIixcblx0XCIuL3lvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS95by5qc1wiLFxuXHRcIi4veW8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3lvLmpzXCIsXG5cdFwiLi96aC1jblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtY24uanNcIixcblx0XCIuL3poLWNuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC1jbi5qc1wiLFxuXHRcIi4vemgtaGtcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLWhrLmpzXCIsXG5cdFwiLi96aC1oay5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtaGsuanNcIixcblx0XCIuL3poLXR3XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC10dy5qc1wiLFxuXHRcIi4vemgtdHcuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLXR3LmpzXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHZhciBpZCA9IG1hcFtyZXFdO1xuXHRpZighKGlkICsgMSkpIHsgLy8gY2hlY2sgZm9yIG51bWJlciBvciBzdHJpbmdcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIGlkO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZSBzeW5jIHJlY3Vyc2l2ZSBeXFxcXC5cXFxcLy4qJFwiOyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBDYWxlbmRhciBmcm9tICcuL2NvbXBvbmVudHMvQ2FsZW5kYXIvQ2FsZW5kYXInO1xyXG5pbXBvcnQgRXZlbnRQb3BvdmVyIGZyb20gJy4vY29tcG9uZW50cy9FdmVudFBvcG92ZXIvRXZlbnRQb3BvdmVyJztcclxuaW1wb3J0IEV2ZW50TW9kYWwgZnJvbSAnLi9jb21wb25lbnRzL01vZGFsL0V2ZW50TW9kYWwnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgY2xpY2tlZEV2ZW50OiBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaGFuZGxlRXZlbnRDbGljayA9IHRoaXMuaGFuZGxlRXZlbnRDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlU2VsZWN0ID0gdGhpcy5oYW5kbGVTZWxlY3QuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZU1vZGFsQ2xvc2UgPSB0aGlzLmhhbmRsZU1vZGFsQ2xvc2UuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVFdmVudENsaWNrKCBldmVudCwganNFdmVudCwgdmlldyApIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGV2ZW50LnRpdGxlLCBldmVudCwganNFdmVudCwgdmlldylcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgY2xpY2tlZEV2ZW50QXJnczogeyBldmVudCwganNFdmVudCwgdmlldyB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVTZWxlY3QoIHN0YXJ0LCBlbmQsIGpzRXZlbnQsIHZpZXcgKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIHNob3c6IHRydWVcclxuICAgICAgICB9KSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlTW9kYWxDbG9zZSgpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgXHJcbiAgICAgICAgICAgIHNob3c6IGZhbHNlIFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGlkPSd3aXotdG9tYXRvLWNhbGVuZGFyJyA+XHJcbiAgICAgICAgICAgICAgICA8Q2FsZW5kYXIgb25FdmVudENsaWNrID0ge3RoaXMuaGFuZGxlRXZlbnRDbGlja30gb25TZWxlY3Q9e3RoaXMuaGFuZGxlU2VsZWN0fS8+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5jbGlja2VkRXZlbnRBcmdzICYmIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8RXZlbnRQb3BvdmVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudCA9IHt0aGlzLnN0YXRlLmNsaWNrZWRFdmVudEFyZ3MuZXZlbnR9IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmZXJlbmNlID0ge3RoaXMuc3RhdGUuY2xpY2tlZEV2ZW50QXJncy5qc0V2ZW50LnRhcmdldH0gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+IFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIDxFdmVudE1vZGFsIHNob3c9e3RoaXMuc3RhdGUuc2hvd30gb25Nb2RhbENsb3NlPXt0aGlzLmhhbmRsZU1vZGFsQ2xvc2V9Lz5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL0NhbGVuZGFyLmNzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9DYWxlbmRhci5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL0NhbGVuZGFyLmNzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgRnVsbENhbGVuZGFyIGZyb20gJy4vRnVsbENhbGVuZGFyJztcclxuaW1wb3J0ICdmdWxsY2FsZW5kYXItcmVhY3R3cmFwcGVyL2Rpc3QvY3NzL2Z1bGxjYWxlbmRhci5taW4uY3NzJztcclxuaW1wb3J0ICcuL0NhbGVuZGFyLmNzcyc7XHJcbmltcG9ydCBXaXpFdmVudERhdGFMb2FkZXIgZnJvbSAnLi4vLi4vbW9kZWxzL1dpekV2ZW50RGF0YUxvYWRlcidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbGVuZGFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGV2ZW50czogW11cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kYXRhTG9hZGVyID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNhbGVuZGFyID0gbnVsbDtcclxuICAgICAgICAvL+e7keWumuWPpeafhFxyXG4gICAgICAgIHRoaXMub25DYWxlbmRhclJlbmRlciA9IHRoaXMub25DYWxlbmRhclJlbmRlci5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMub25WaWV3UmVuZGVyID0gdGhpcy5vblZpZXdSZW5kZXIuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLm9uRXZlbnRSZW5kZXIgPSB0aGlzLm9uRXZlbnRSZW5kZXIuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLm9uRXZlbnREcm9wID0gdGhpcy5vbkV2ZW50RHJvcC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMub25FdmVudFJlc2l6ZSA9IHRoaXMub25FdmVudFJlc2l6ZS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOS6i+S7tuWPpeafhFxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBvbkNhbGVuZGFyUmVuZGVyKGVsKSB7XHJcbiAgICAgICAgdGhpcy5jYWxlbmRhciA9IGVsO1xyXG4gICAgICAgIHRoaXMuZGF0YUxvYWRlciA9IG5ldyBXaXpFdmVudERhdGFMb2FkZXIodGhpcy5jYWxlbmRhcik7XHJcbiAgICB9XHJcblxyXG4gICAgb25WaWV3UmVuZGVyKCB2aWV3LCBlbGVtZW50ICkge1xyXG4gICAgICAgIC8vIOWIt+aWsOinhuWbvu+8jOmHjeaWsOiOt+WPluaXpeWOhuS6i+S7tlxyXG4gICAgICAgIGNvbnN0ICRjYWxlbmRhciA9ICQodGhpcy5jYWxlbmRhcik7XHJcbiAgICAgICAgY29uc3QgZXZlbnRTb3VyY2VzID0gdGhpcy5kYXRhTG9hZGVyLmdldEV2ZW50U291cmNlcyggdmlldywgZWxlbWVudCApO1xyXG4gICAgICAgICRjYWxlbmRhci5mdWxsQ2FsZW5kYXIoJ3JlbW92ZUV2ZW50cycpO1xyXG4gICAgICAgIGZvciAobGV0IGk9MCA7IGkgPCBldmVudFNvdXJjZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgJGNhbGVuZGFyLmZ1bGxDYWxlbmRhcignYWRkRXZlbnRTb3VyY2UnLCBldmVudFNvdXJjZXNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkV2ZW50RHJvcCggZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldyApIHtcclxuICAgICAgICBpZiAoZXZlbnQuaWQpe1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFMb2FkZXIudXBkYXRlRXZlbnREYXRhT25Ecm9wKGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXcpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV2ZXJ0RnVuYygpO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG9uRXZlbnRSZXNpemUoIGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXcgKSB7XHJcbiAgICAgICAgaWYgKGV2ZW50LmlkKXtcclxuICAgICAgICAgICAgdGhpcy5kYXRhTG9hZGVyLnVwZGF0ZUV2ZW50RGF0YU9uUmVzaXplKGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldmVydEZ1bmMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25FdmVudFJlbmRlciggZXZlbnRPYmosICRlbCApIHtcclxuICAgICAgICAvLyDlhYPntKDlt7Lnu4/muLLmn5PvvIzlj6/kv67mlLnlhYPntKBcclxuICAgICAgICBjb25zdCBpc0NvbXBsZXRlID0gcGFyc2VJbnQoZXZlbnRPYmouY29tcGxldGUpID09IDU7XHJcbiAgICAgICAgaWYgKCBpc0NvbXBsZXRlICkge1xyXG4gICAgICAgICAgICAvLyDmoLflvI9cclxuICAgICAgICAgICAgJGVsLmFkZENsYXNzKCd0Yy1jb21wbGV0ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICBcclxuICAgIH1cclxuIFxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiuvue9ruS6i+S7tuWPpeafhFxyXG4gICAgICAgICAqIOWboOS4umZ1bGxjYWxlbmRhci1yZWFjdFdyYXBwZXLnmoTlrp7njrDmmK/nm7TmjqXov5Tlm548ZGl2IGlkPSdmdWxsY2FsZW5kYXInPjwvZGl2PlxyXG4gICAgICAgICAqIOW5tuS4lOiwg+eUqCQoJyNmdWxsY2FsZW5kYXInKS5mdWxsY2FsZW5kYXIodGhpcy5wcm9wcynov5vooYzmnoTlu7rvvIzlm6DmraRSZWFjdOW5tuayoeaciVxyXG4gICAgICAgICAqIOeuoeeQhkZ1bGxDYWxlbmRhcueKtuaAgeWSjOa4suafk+eahOiDveWKm+OAguaJgOS7peebtOaOpeWcqOiuvue9ruS4reWBmuWlvWNhbGxiYWNr77yM6K6p5o+S5Lu26Ieq5oiR566h55CG44CCXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBpZD1cImNhbGVuZGFyLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgPEZ1bGxDYWxlbmRhciBjYWxlbmRhclJlZj17dGhpcy5vbkNhbGVuZGFyUmVuZGVyfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWfuuacrOmFjee9rlxyXG4gICAgICAgICAgICAgICAgICAgIGlkID0gXCJjYWxlbmRhclwiXHJcbiAgICAgICAgICAgICAgICAgICAgdGhlbWVTeXN0ZW0gPSAnc3RhbmRhcmQnXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0ID0gJ3BhcmVudCdcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXIgPSB7e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAncHJldixuZXh0LHRvZGF5JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2VudGVyOiAndGl0bGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodDogJ21vbnRoLGFnZW5kYVdlZWssYWdlbmRhRGF5LGxpc3RXZWVrJ1xyXG4gICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5Lit5paH5YyWXHJcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uVGV4dCA9IHt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvZGF5OiAn5LuK5aSpJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9udGg6ICfmnIgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWVrOiAn5ZGoJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF5OiAn5pelJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdDogJ+ihqCdcclxuICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgIG1vbnRoTmFtZXMgPSB7W1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnMeaciCcsICcy5pyIJywgJzPmnIgnLCAnNOaciCcsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnNeaciCcsICc25pyIJywgJzfmnIgnLCAnOOaciCcsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnOeaciCcsICcxMOaciCcsICcxMeaciCcsICcxMuaciCdcclxuICAgICAgICAgICAgICAgICAgICBdfVxyXG4gICAgICAgICAgICAgICAgICAgIG1vbnRoTmFtZXNTaG9ydCA9IHtbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcx5pyIJywgJzLmnIgnLCAnM+aciCcsICc05pyIJywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc15pyIJywgJzbmnIgnLCAnN+aciCcsICc45pyIJywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc55pyIJywgJzEw5pyIJywgJzEx5pyIJywgJzEy5pyIJ1xyXG4gICAgICAgICAgICAgICAgICAgIF19XHJcbiAgICAgICAgICAgICAgICAgICAgZGF5TmFtZXMgPSB7W1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAn5ZGo5pelJywgJ+WRqOS4gCcsICflkajkuownLCAn5ZGo5LiJJywgJ+WRqOWbmycsICflkajkupQnLCAn5ZGo5YWtJ1xyXG4gICAgICAgICAgICAgICAgICAgIF19XHJcbiAgICAgICAgICAgICAgICAgICAgZGF5TmFtZXNTaG9ydCA9IHtbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICflkajml6UnLCAn5ZGo5LiAJywgJ+WRqOS6jCcsICflkajkuIknLCAn5ZGo5ZubJywgJ+WRqOS6lCcsICflkajlha0nXHJcbiAgICAgICAgICAgICAgICAgICAgXX1cclxuICAgICAgICAgICAgICAgICAgICBhbGxEYXlUZXh0ID0gJ+WFqOWkqSdcclxuICAgICAgICAgICAgICAgICAgICAvLyDorr7nva7op4blm75cclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmlldyA9ICdhZ2VuZGFXZWVrJ1xyXG4gICAgICAgICAgICAgICAgICAgIG5vd0luZGljYXRvciA9IHt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0RGF5ID0gezF9XHJcbiAgICAgICAgICAgICAgICAgICAgdmlld3MgPSB7e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZ2VuZGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pblRpbWU6IFwiMDg6MDA6MDBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsb3RMYWJlbEZvcm1hdDogJ2goOm1tKSBhJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgIG5hdkxpbmtzPSB7dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICBhbGxEYXlEZWZhdWx0ID0ge2ZhbHNlfVxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50TGltaXQ9IHt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOiuvue9ruS6i+S7tlxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGFibGUgPSB7dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RIZWxwZXIgPSB7dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICBlZGl0YWJsZSA9IHt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgIGZvcmNlRXZlbnREdXJhdGlvbiA9IHt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOiuvue9rlVJXHJcbiAgICAgICAgICAgICAgICAgICAgdW5zZWxlY3RDYW5jZWwgPSAnLm1vZGFsIConXHJcbiAgICAgICAgICAgICAgICAgICAgZHJhZ09wYWNpdHkgPSB7e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm1vbnRoXCI6IC41LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFnZW5kYVdlZWtcIjogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhZ2VuZGFEYXlcIjogMVxyXG4gICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6K6+572u5Y+l5p+EXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ID0ge3RoaXMucHJvcHMub25TZWxlY3R9XHJcbiAgICAgICAgICAgICAgICAgICAgdmlld1JlbmRlciA9IHt0aGlzLm9uVmlld1JlbmRlcn1cclxuICAgICAgICAgICAgICAgICAgICBldmVudFJlbmRlciA9IHt0aGlzLm9uRXZlbnRSZW5kZXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRDbGljayA9IHt0aGlzLnByb3BzLm9uRXZlbnRDbGlja31cclxuICAgICAgICAgICAgICAgICAgICBldmVudERyb3AgPSB7dGhpcy5vbkV2ZW50RHJvcH1cclxuICAgICAgICAgICAgICAgICAgICBldmVudFJlc2l6ZSA9IHt0aGlzLm9uRXZlbnRSZXNpemV9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICQgZnJvbSBcImpxdWVyeVwiO1xyXG5pbXBvcnQgZnVsbENhbGVuZGFyIGZyb20gXCJmdWxsY2FsZW5kYXJcIjtcclxuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5cclxuY2xhc3MgRnVsbGNhbGVuZGFyT2JqZWN0TWFwcGVye1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblxyXG5cdH1cclxuXHJcblx0Z2V0U2V0dGluZ3MocHJvcGVydGllcyl7XHJcblx0XHRsZXQgbmV3U2V0dGluZ3MgPSB7fTtcclxuXHRcdGZvciAoY29uc3Qga2V5IGluIHByb3BlcnRpZXMpIHtcclxuICAgICAgXHRcdGlmIChwcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICBcdFx0bmV3U2V0dGluZ3Nba2V5XSA9IHByb3BlcnRpZXNba2V5XTtcclxuICAgICAgXHRcdH1cclxuICAgIFx0fVxyXG4gICAgXHRyZXR1cm4gbmV3U2V0dGluZ3M7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGdWxsQ2FsZW5kYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLmpxID0gJC5ub0NvbmZsaWN0KCk7XHJcblx0XHR0aGlzLmZ1bGxjYWxlbmRhck9iamVjdE1hcHBlciA9IG5ldyBGdWxsY2FsZW5kYXJPYmplY3RNYXBwZXIoKTtcclxuXHRcdHRoaXMucm9vdCA9IG51bGw7XHJcblx0XHR0aGlzLmluc3RhbmNlID0gbnVsbDtcclxuXHRcdHRoaXMuZGF0ZSA9IG5ldyBEYXRlKCk7XHJcblx0fVxyXG5cclxuXHRjb21wb25lbnREaWRNb3VudCgpe1xyXG5cdFx0Y29uc3Qgb2JqZWN0TWFwcGVyU2V0dGluZ3MgPSB0aGlzLmZ1bGxjYWxlbmRhck9iamVjdE1hcHBlci5nZXRTZXR0aW5ncyh0aGlzLnByb3BzKTtcclxuXHRcdHRoaXMuaW5zdGFuY2UgPSB0aGlzLmpxKGAjJHt0aGlzLnJvb3R9YCkuZnVsbENhbGVuZGFyKG9iamVjdE1hcHBlclNldHRpbmdzKTtcclxuXHR9XHJcblxyXG4gIFx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xyXG5cdFx0LypcclxuICBcdFx0dGhpcy5qcShgIyR7dGhpcy5yb290fWApLmZ1bGxDYWxlbmRhcignZGVzdHJveScpO1xyXG4gIFx0XHRjb25zdCBvYmplY3RNYXBwZXJTZXR0aW5ncyA9IHRoaXMuZnVsbGNhbGVuZGFyT2JqZWN0TWFwcGVyLmdldFNldHRpbmdzKG5leHRQcm9wcyk7XHJcbiAgICBcdHRoaXMuaW5zdGFuY2UgPSB0aGlzLmpxKGAjJHt0aGlzLnJvb3R9YCkuZnVsbENhbGVuZGFyKG9iamVjdE1hcHBlclNldHRpbmdzKTtcclxuXHRcdCovXHJcblx0fVxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdHRoaXMucm9vdCA9IHRoaXMucHJvcHMuaWQgfHwgJ0lEJyArIHRoaXMuZGF0ZS5nZXRUaW1lKCk7IFxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBpZD17dGhpcy5yb290fSByZWY9e3RoaXMucHJvcHMuY2FsZW5kYXJSZWZ9PjwvZGl2PlxyXG5cdFx0KVxyXG5cdH1cclxufSIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL0V2ZW50UG9wb3Zlci5jc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vRXZlbnRQb3BvdmVyLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vRXZlbnRQb3BvdmVyLmNzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAnLi9FdmVudFBvcG92ZXIuY3NzJztcclxuaW1wb3J0IFBvcHBlciBmcm9tICdwb3BwZXIuanMnO1xyXG5pbXBvcnQgUG9wb3ZlclRpdGxlSW5wdXQgZnJvbSAnLi9Qb3BvdmVyVGl0bGVJbnB1dCc7XHJcbmltcG9ydCBQb3BvdmVyVG9vbGJhciBmcm9tICcuL1BvcG92ZXJUb29sYmFyJztcclxuaW1wb3J0IEV2ZW50SGFuZGxlcyBmcm9tICcuLi8uLi9tb2RlbHMvRXZlbnRIYW5kbGVzJztcclxuaW1wb3J0IHsgRm9ybSwgR2x5cGhpY29uIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcclxuaW1wb3J0IERhdGVUaW1lUGlja2VyIGZyb20gJy4uL0Zvcm0vRGF0ZVRpbWVQaWNrZXInO1xyXG5pbXBvcnQgQ29sb3JQaWNrZXIgZnJvbSAnLi4vRm9ybS9Db2xvclBpY2tlcic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudFBvcG92ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5wb3BwZXJOb2RlID0gbnVsbDtcclxuICAgICAgICB0aGlzLnBvcHBlckluc3RhbmNlID0gbnVsbDtcclxuICAgICAgICB0aGlzLmV2ZW50SGFuZGxlcyA9IG5ldyBFdmVudEhhbmRsZXMoKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIG5ld0V2ZW50RGF0YToge31cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g57uR5a6a5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5hdXRvSGlkZSA9IHRoaXMuYXV0b0hpZGUuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZVRpdGxlQ2hhbmdlID0gdGhpcy5oYW5kbGVUaXRsZUNoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQ29sb3JDaGFuZ2UgPSB0aGlzLmhhbmRsZUNvbG9yQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVTYXZlQnRuQ2xpY2sgPSB0aGlzLmhhbmRsZVNhdmVCdG5DbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQ29tcGxldGVCdG5DbGljayA9IHRoaXMuaGFuZGxlQ29tcGxldGVCdG5DbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlT3BlbkRvY0J0bkNsaWNrID0gdGhpcy5oYW5kbGVPcGVuRG9jQnRuQ2xpY2suYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZURlbGV0ZURhdGFCdG5DbGljayA9IHRoaXMuaGFuZGxlRGVsZXRlRGF0YUJ0bkNsaWNrLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVEZWxldGVEb2NCdG5DbGljayA9IHRoaXMuaGFuZGxlRGVsZXRlRG9jQnRuQ2xpY2suYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDliqjnlLvmlYjmnpxcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIGF1dG9IaWRlKGUpIHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIC8vIOS4jeaYr+aXpeWOhuS6i+S7tuWFg+e0oFxyXG4gICAgICAgICAgICAhJCh0aGlzLnByb3BzLnJlZmVyZW5jZSkuaXMoZS50YXJnZXQpICYmXHJcbiAgICAgICAgICAgIC8vIOS5n+S4jeaYr+WtkOWFg+e0oFxyXG4gICAgICAgICAgICAkKHRoaXMucHJvcHMucmVmZXJlbmNlKS5oYXMoZS50YXJnZXQpLmxlbmd0aCA9PT0gMCAmJlxyXG4gICAgICAgICAgICAvLyDkuI3mmK9wb3BwZXLlhYPntKBcclxuICAgICAgICAgICAgISQodGhpcy5wb3BwZXJOb2RlKS5pcyhlLnRhcmdldCkgJiZcclxuICAgICAgICAgICAgLy8g5Lmf5LiN5piv5a2Q5YWD57SgXHJcbiAgICAgICAgICAgICQodGhpcy5wb3BwZXJOb2RlKS5oYXMoZS50YXJnZXQpLmxlbmd0aCA9PT0gMFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZSgpIHtcclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcclxuICAgICAgICAgICAgJCh0aGF0LnBvcHBlck5vZGUpLmhpZGUoMCwgbnVsbCwgcmVzb2x2ZSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzaG93KCkge1xyXG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xyXG4gICAgICAgICAgICAkKHRoYXQucG9wcGVyTm9kZSkuZmFkZUluKDM1MCwgbnVsbCwgcmVzb2x2ZSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyDkuovku7blj6Xmn4RcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIGhhbmRsZVRpdGxlQ2hhbmdlKGUpIHtcclxuICAgICAgICAvL+WCqOWtmOWIsOWwhuaWsOeahOWAvOWCqOWtmG5ld0V2ZW50RGF0YemHjO+8jOW9k+S/neWtmOaXtuajgOe0om5ld0V2ZW50RGF0YeWIl+ihqFxyXG4gICAgICAgIGNvbnN0IG5ld1RpdGxlID0gZS50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShmdW5jdGlvbihwcmV2U3RhdGUsIHByb3BzKSB7XHJcbiAgICAgICAgICAgIC8v5ou36LSd5YmN5LiA5Liq5a+56LGhXHJcbiAgICAgICAgICAgIGNvbnN0IG5ld0V2ZW50RGF0YSA9IE9iamVjdC5jcmVhdGUocHJldlN0YXRlLm5ld0V2ZW50RGF0YSk7XHJcbiAgICAgICAgICAgIG5ld0V2ZW50RGF0YS50aXRsZSA9IG5ld1RpdGxlO1xyXG4gICAgICAgICAgICByZXR1cm4geyBuZXdFdmVudERhdGEgfTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNvbG9yQ2hhbmdlKGUpIHtcclxuICAgICAgICBjb25zdCBuZXdDb2xvciA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG5ld0NvbG9yKVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUlucHV0Q2hhbmdlKGUpIHtcclxuICAgICAgICAvL1xyXG4gICAgfVxyXG5cclxuICAgIC8vVE9ETzog5YaZ5LiA5Liq6YCa55So5pa55rOV6K6h566XQnRuQ2xpY2vosIPnlKjvvIzku6XlhY3ku6PnoIHph43lpI1cclxuXHJcbiAgICBoYW5kbGVTYXZlQnRuQ2xpY2soZSkge1xyXG4gICAgICAgIHRoaXMuaGlkZSgpLnRoZW4oIFxyXG4gICAgICAgICAgICAocmV0KSA9PiB0aGlzLmV2ZW50SGFuZGxlcy5vblNhdmVCdG5DbGljayh0aGlzLnByb3BzLmV2ZW50LCB0aGlzLnN0YXRlLm5ld0V2ZW50RGF0YSkgXHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNvbXBsZXRlQnRuQ2xpY2soZSkge1xyXG4gICAgICAgIHRoaXMuaGlkZSgpLnRoZW4oXHJcbiAgICAgICAgICAgIChyZXQpID0+IHRoaXMuZXZlbnRIYW5kbGVzLm9uQ29tcGxldGVCdG5DbGljayh0aGlzLnByb3BzLmV2ZW50KSBcclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlT3BlbkRvY0J0bkNsaWNrKGUpIHtcclxuICAgICAgICB0aGlzLmhpZGUoKS50aGVuKFxyXG4gICAgICAgICAgICAocmV0KSA9PiB0aGlzLmV2ZW50SGFuZGxlcy5vbk9wZW5Eb2NCdG5DbGljayh0aGlzLnByb3BzLmV2ZW50KSBcclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlRGVsZXRlRGF0YUJ0bkNsaWNrKGUpIHtcclxuICAgICAgICB0aGlzLmhpZGUoKS50aGVuKFxyXG4gICAgICAgICAgICAocmV0KSA9PiB0aGlzLmV2ZW50SGFuZGxlcy5vbkRlbGV0ZURhdGFCdG5DbGljayh0aGlzLnByb3BzLmV2ZW50KSBcclxuICAgICAgICApICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVEZWxldGVEb2NCdG5DbGljayhlKSB7XHJcbiAgICAgICAgdGhpcy5oaWRlKCkudGhlbihcclxuICAgICAgICAgICAgKHJldCkgPT4gdGhpcy5ldmVudEhhbmRsZXMub25EZWxldGVEb2NCdG5DbGljayh0aGlzLnByb3BzLmV2ZW50KSBcclxuICAgICAgICApICBcclxuICAgIH1cclxuXHJcbiAgICAvLyDnlJ/lkb3lkajmnJ9cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIC8vIOWIneWni+WMlue7hOS7tlxyXG4gICAgICAgIHRoaXMucG9wcGVySW5zdGFuY2UgPSBuZXcgUG9wcGVyKHRoaXMucHJvcHMucmVmZXJlbmNlLCB0aGlzLnBvcHBlck5vZGUsIHtcclxuXHRcdFx0cGxhY2VtZW50OiAnYXV0bycsXHJcblx0XHRcdG1vZGlmaWVyczoge1xyXG5cdFx0XHRcdGFycm93OiB7XHJcblx0XHRcdFx0ICBlbGVtZW50OiAnLmFycm93J1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdH0pO1xyXG4gICAgICAgIC8vIOiuvue9ruiHquWKqOmakOiXj1xyXG4gICAgICAgICQoZG9jdW1lbnQpLm9mZignY2xpY2snLCB0aGlzLmF1dG9IaWRlKS5vbignY2xpY2snLCB0aGlzLmF1dG9IaWRlKTtcclxuICAgICAgICAvLyDmmL7npLpcclxuICAgICAgICB0aGlzLnNob3coKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUsIHNuYXBzaG90KSB7XHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLnNob3coKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcclxuICAgICAgICAvLyDlvZPmm7TmlrDlsZ7mgKfml7bmiY3op6blj5HliqjnlLvmlYjmnpxcclxuICAgICAgICBpZiAoIG5leHRQcm9wcyAhPSB0aGlzLnByb3BzICkge1xyXG4gICAgICAgICAgICAvLyDorr7nva7mm7TmlrDml7bnmoTliqjnlLtcclxuICAgICAgICAgICAgdGhpcy5oaWRlKCkudGhlbiggKHJldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy/mm7TmlrDlrprkvY1cclxuICAgICAgICAgICAgICAgIHRoaXMucG9wcGVySW5zdGFuY2UucmVmZXJlbmNlID0gbmV4dFByb3BzLnJlZmVyZW5jZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9wcGVySW5zdGFuY2UudXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgZXZlbnRTdGFydCA9IHRoaXMucHJvcHMuZXZlbnQuc3RhcnQuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcbiAgICAgICAgY29uc3QgY29sb3JWYWx1ZSA9IHRoaXMucHJvcHMuZXZlbnQuYmFja2dyb3VuZENvbG9yXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0Yy1wb3BvdmVyXCJcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e2Rpc3BsYXk6ICdub25lJ319XHJcbiAgICAgICAgICAgICAgICAgICAgcmVmPXsoZGl2KSA9PiB0aGlzLnBvcHBlck5vZGUgPSBkaXZ9ID5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXJyb3dcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGMtcG9wb3Zlci1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8UG9wb3ZlclRpdGxlSW5wdXQgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleT17dGhpcy5wcm9wcy5ldmVudC5pZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRUaXRsZT17dGhpcy5wcm9wcy5ldmVudC50aXRsZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25UaXRsZUNoYW5nZT17dGhpcy5oYW5kbGVUaXRsZUNoYW5nZX0gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEZvcm09J3RjLXBvcG92ZXItZXZlbnQtZWRpdEZvcm0nIC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGMtcG9wb3Zlci1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm0gaG9yaXpvbnRhbCBpZD0ndGMtcG9wb3Zlci1ldmVudC1lZGl0Rm9ybSc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxEYXRlVGltZVBpY2tlciBob3Jpem9udGFsIHJlYWRPbmx5IGlkID0gJ3RjLWVkaXRwb3BwZXItZXZlbnRkYXRlJyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPXs8aSBjbGFzc05hbWU9J2ZhciBmYS1jYWxlbmRhci1hbHQgZmEtbGcnIC8+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2V2ZW50U3RhcnR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbklucHV0Q2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0Q2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q29sb3JQaWNrZXIgaG9yaXpvbnRhbCBpZCA9ICd0Yy1lZGl0cG9wcGVyLWV2ZW50Y29sb3InIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9ezxpIGNsYXNzTmFtZT0nZmFzIGZhLXBhaW50LWJydXNoIGZhLWxnJyAvPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtjb2xvclZhbHVlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Db2xvckNoYW5nZT17dGhpcy5oYW5kbGVDb2xvckNoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L0Zvcm0+XHJcbiAgICAgICAgICAgICAgICAgICAgPFBvcG92ZXJUb29sYmFyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZVNhdmVCdG49eyEhdGhpcy5zdGF0ZS5uZXdFdmVudERhdGEudGl0bGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uU2F2ZUJ0bkNsaWNrPXt0aGlzLmhhbmRsZVNhdmVCdG5DbGlja31cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZUJ0bkNsaWNrPXt0aGlzLmhhbmRsZUNvbXBsZXRlQnRuQ2xpY2t9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uT3BlbkRvY0J0bkNsaWNrPXt0aGlzLmhhbmRsZU9wZW5Eb2NCdG5DbGlja31cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25EZWxldGVEYXRhQnRuQ2xpY2s9e3RoaXMuaGFuZGxlRGVsZXRlRGF0YUJ0bkNsaWNrfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkRlbGV0ZURvY0J0bkNsaWNrPXt0aGlzLmhhbmRsZURlbGV0ZURvY0J0bkNsaWNrfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL1BvcG92ZXJUaXRsZUlucHV0LmNzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9Qb3BvdmVyVGl0bGVJbnB1dC5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL1BvcG92ZXJUaXRsZUlucHV0LmNzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAnLi9Qb3BvdmVyVGl0bGVJbnB1dC5jc3MnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRUaXRsZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICAvL+WIneWni+WMlueKtuaAgVxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLmV2ZW50VGl0bGVcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZSA9IHRoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQ2hhbmdlKGUpIHtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBlLnRhcmdldC52YWx1ZX0pXHJcbiAgICAgICAgLy/lsIbkuovku7bkvKDpgJLkuIrljrtcclxuICAgICAgICB0aGlzLnByb3BzLm9uVGl0bGVDaGFuZ2UoZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwidGMtZWRpdHBvcHBlci1ldmVudHRpdGxlXCIgXHJcbiAgICAgICAgICAgICAgICBodG1sRm9yPXt0aGlzLnByb3BzLnRhcmdldEZvcm19XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9J2V2ZW50dGl0bGUnXHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCB7IEJ1dHRvbiwgQnV0dG9uR3JvdXAsIEJ1dHRvblRvb2xiYXIsIFNwbGl0QnV0dG9uLCBEcm9wZG93bkJ1dHRvbiwgTWVudUl0ZW0gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wb3ZlclRvb2xiYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxCdXR0b25Ub29sYmFyPlxyXG4gICAgICAgICAgICAgICAgPEJ1dHRvbkdyb3VwPlxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b24gaWQ9J3RjLWVkaXRwb3BwZXItc2F2ZScgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25TYXZlQnRuQ2xpY2t9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshdGhpcy5wcm9wcy5lbmFibGVTYXZlQnRufT5cclxuICAgICAgICAgICAgICAgICAgICAgICAg5L+d5a2YXHJcbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBpZD0ndGMtZWRpdHBvcHBlci1maW5pc2gnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25Db21wbGV0ZUJ0bkNsaWNrfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAg5a6M5oiQXHJcbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBpZD0ndGMtZWRpdHBvcHBlci1lZGl0Jz5cclxuICAgICAgICAgICAgICAgICAgICAgICAg57yW6L6RXHJcbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPFNwbGl0QnV0dG9uIHB1bGxSaWdodCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9J+WIoOmZpCcgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkPSd0Yy1lZGl0cG9wcGVyLWRlbGV0ZScgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25EZWxldGVEYXRhQnRuQ2xpY2t9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8TWVudUl0ZW0gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudEtleT1cIjFcIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPSd0Yy1lZGl0cG9wcGVyLW9wZW5FdmVudERvYydcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25PcGVuRG9jQnRuQ2xpY2t9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAg5omT5byA5rqQ5paH5qGjXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTWVudUl0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxNZW51SXRlbSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50S2V5PVwiMlwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9J3RjLWVkaXRwb3BwZXItZGVsZXRlRXZlbnREb2MnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLm9uRGVsZXRlRG9jQnRuQ2xpY2t9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAg5Yig6Zmk5rqQ5paH5qGjXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTWVudUl0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9TcGxpdEJ1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvQnV0dG9uR3JvdXA+XHJcbiAgICAgICAgICAgIDwvQnV0dG9uVG9vbGJhcj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IHsgRm9ybUdyb3VwLCBDb250cm9sTGFiZWwsIENvbCwgRm9ybUNvbnRyb2wgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5jb25zdCBIdWViZWUgPSByZXF1aXJlKCdodWViZWUvZGlzdC9odWViZWUucGtnZCcpOyBcclxuaW1wb3J0ICdodWViZWUvZGlzdC9odWViZWUuY3NzJztcclxuXHJcbi8vIOmHjeWGmeaWueazleS7peinpuWPkWNoYW5nZeS6i+S7tlxyXG5IdWViZWUucHJvdG90eXBlLnNldFRleHRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAoICF0aGlzLnNldFRleHRFbGVtcyApIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBmb3IgKCB2YXIgaT0wOyBpIDwgdGhpcy5zZXRUZXh0RWxlbXMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgdmFyIGVsZW0gPSB0aGlzLnNldFRleHRFbGVtc1tpXTtcclxuICAgICAgICB2YXIgcHJvcGVydHkgPSBlbGVtLm5vZGVOYW1lID09ICdJTlBVVCcgPyAndmFsdWUnIDogJ3RleHRDb250ZW50JztcclxuICAgICAgICAvLyDop6blj5FjaGFuZ2Xkuovku7ZcclxuICAgICAgICBpZiAoIGVsZW0udmFsdWUgIT0gdGhpcy5jb2xvciApIHtcclxuICAgICAgICAgICAgZWxlbVsgcHJvcGVydHkgXSA9IHRoaXMuY29sb3I7XHJcbiAgICAgICAgICAgIGVsZW0uZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2NoYW5nZScpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xvclBpY2tlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgIH1cclxuXHJcbiAgICAvL1RPRE86IOagueaNrumlseWSjOW6puiuoeeul+Wtl+S9k+minOiJslxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIC8vIOWIneWni+WMlue7hOS7tlxyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLmlucHV0Rm9ybUNvbnRyb2wpO1xyXG4gICAgICAgIHRoaXMuaHVlYmVlSW5zdGFuY2UgPSBuZXcgSHVlYmVlKHRoaXMuaW5wdXQsIHtcclxuICAgICAgICAgICAgc3RhdGljT3BlbjogZmFsc2UsIC8vIERpc3BsYXlzIG9wZW4gYW5kIHN0YXlzIG9wZW4uIFxyXG4gICAgICAgICAgICBzZXRUZXh0OiB0cnVlLCAvLyBTZXRzIGVsZW1lbnRz4oCZIHRleHQgdG8gY29sb3IuIOWwhuWOn+Wni+eahOaWh+acrOiuvue9ruiuvue9ruaIkOminOiJsuWAvC5cclxuICAgICAgICAgICAgc2V0QkdDb2xvcjogdHJ1ZSwgLy8gU2V0cyBlbGVtZW50c+KAmSBiYWNrZ3JvdW5kIGNvbG9yIHRvIGNvbG9yLlxyXG4gICAgICAgICAgICBodWVzOiAxMiwgLy8gTnVtYmVyIG9mIGh1ZXMgb2YgdGhlIGNvbG9yIGdyaWQuIEh1ZXMgYXJlIHNsaWNlcyBvZiB0aGUgY29sb3Igd2hlZWwuXHJcbiAgICAgICAgICAgIGh1ZTA6IDAsIC8vIFRoZSBmaXJzdCBodWUgb2YgdGhlIGNvbG9yIGdyaWQuIFxyXG4gICAgICAgICAgICBzaGFkZXM6IDUsIC8vIE51bWJlciBvZiBzaGFkZXMgb2YgY29sb3JzIGFuZCBzaGFkZXMgb2YgZ3JheSBiZXR3ZWVuIHdoaXRlIGFuZCBibGFjay4gXHJcbiAgICAgICAgICAgIHNhdHVyYXRpb25zOiAyLCAvLyBOdW1iZXIgb2Ygc2V0cyBvZiBzYXR1cmF0aW9uIG9mIHRoZSBjb2xvciBncmlkLlxyXG4gICAgICAgICAgICBub3RhdGlvbjogJ2hleCcsIC8vIFRleHQgc3ludGF4IG9mIGNvbG9ycyB2YWx1ZXMuXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZTogbnVsbCwgLy8gQ2xhc3MgYWRkZWQgdG8gSHVlYmVlIGVsZW1lbnQuIFVzZWZ1bCBmb3IgQ1NTLlxyXG4gICAgICAgICAgICBjdXN0b21Db2xvcnM6IFsgXHJcbiAgICAgICAgICAgICAgICAnIzMyQ0QzMicsICcjNTQ4NEVEJywgJyNBNEJERkUnLCBcclxuICAgICAgICAgICAgICAgICcjNDZENkRCJywgJyM3QUU3QkYnLCAnIzUxQjc0OScsXHJcbiAgICAgICAgICAgICAgICAnI0ZCRDc1QicsICcjRkZCODc4JywgJyNGRjg4N0MnLCBcclxuICAgICAgICAgICAgICAgICcjREMyMTI3JywgJyNEQkFERkYnLCAnI0UxRTFFMSdcdFxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIC8vVE9ETzog6K+75Y+W54i25YWD57SgaG9yaXpvbnRhbOWxnuaAp++8jOWGs+WumuadoeS7tua4suafk1xyXG4gICAgICAgIGNvbnN0IGlzSG9yaXpvbnRhbCA9IHRoaXMucHJvcHMuaG9yaXpvbnRhbDtcclxuICAgICAgICBjb25zdCBjb2xvckZvcm1Db250cm9sID0gKFxyXG4gICAgICAgICAgICA8Rm9ybUNvbnRyb2wgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgICAgcmVmPXsoaW5zdGFuY2UpID0+IHRoaXMuaW5wdXRGb3JtQ29udHJvbCA9IGluc3RhbmNlfVxyXG4gICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMudmFsdWV9IC8vaGV46Imy5b2p5YC8XHJcbiAgICAgICAgICAgICAgICBzdHlsZT17eyAvL+aUueWPmOminOiJslxyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogYCR7dGhpcy5wcm9wcy52YWx1ZX1gXHJcbiAgICAgICAgICAgICAgICB9fSBcclxuICAgICAgICAgICAgICAgIHJlYWRPbmx5PXt0aGlzLnByb3BzLnJlYWRPbmx5fVxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKT0+Y29uc29sZS5sb2coZSl9XHJcbiAgICAgICAgICAgIC8+ICAgICAgICAgICAgXHJcbiAgICAgICAgKVxyXG4gICAgICAgIGlmIChpc0hvcml6b250YWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxGb3JtR3JvdXAgY29udHJvbElkPXt0aGlzLnByb3BzLmlkfT5cclxuICAgICAgICAgICAgICAgICAgICA8Q29sIGNvbXBvbmVudENsYXNzPXtDb250cm9sTGFiZWx9IHNtPXsyfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMubGFiZWx9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9Db2w+XHJcbiAgICAgICAgICAgICAgICAgICAgPENvbCBzbT17MTB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7Y29sb3JGb3JtQ29udHJvbH1cclxuICAgICAgICAgICAgICAgICAgICA8L0NvbD5cclxuICAgICAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxGb3JtR3JvdXAgY29udHJvbElkPXt0aGlzLnByb3BzLmlkfT5cclxuICAgICAgICAgICAgICAgICAgICA8Q29udHJvbExhYmVsPnt0aGlzLnByb3BzLmxhYmVsfTwvQ29udHJvbExhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIHtjb2xvckZvcm1Db250cm9sfVxyXG4gICAgICAgICAgICAgICAgPC9Gb3JtR3JvdXA+ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIENvbnRyb2xMYWJlbCwgQ29sLCBGb3JtQ29udHJvbCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcbmltcG9ydCAnbW9tZW50JztcclxuaW1wb3J0ICdib290c3RyYXAvanMvY29sbGFwc2UnO1xyXG5pbXBvcnQgJ2Jvb3RzdHJhcC9qcy90cmFuc2l0aW9uJztcclxuaW1wb3J0ICdlb25hc2Rhbi1ib290c3RyYXAtZGF0ZXRpbWVwaWNrZXInO1xyXG5pbXBvcnQgJ2VvbmFzZGFuLWJvb3RzdHJhcC1kYXRldGltZXBpY2tlci9idWlsZC9jc3MvYm9vdHN0cmFwLWRhdGV0aW1lcGlja2VyLmNzcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRlVGltZVBpY2tlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICAvLyDliJ3lp4vljJbnu4Tku7ZcclxuICAgICAgICB0aGlzLmlucHV0ID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5pbnB1dEZvcm1Db250cm9sKTtcclxuICAgICAgICAkKHRoaXMuaW5wdXQpLmRhdGV0aW1lcGlja2VyKHtcclxuICAgICAgICAgICAgZm9ybWF0OiAnWVlZWS1NTS1ERCBISDptbTpzcydcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgaXNIb3Jpem9udGFsID0gdGhpcy5wcm9wcy5ob3Jpem9udGFsO1xyXG4gICAgICAgIGNvbnN0IGRhdGVGb3JtQ29udHJvbCA9IChcclxuICAgICAgICAgICAgPEZvcm1Db250cm9sIHR5cGU9XCJ0ZXh0XCIgXHJcbiAgICAgICAgICAgICAgICByZWY9eyhpbnN0YW5jZSkgPT4gdGhpcy5pbnB1dEZvcm1Db250cm9sID0gaW5zdGFuY2V9XHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy52YWx1ZX1cclxuICAgICAgICAgICAgICAgIHJlYWRPbmx5PXt0aGlzLnByb3BzLnJlYWRPbmx5fVxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMucHJvcHMub25JbnB1dENoYW5nZX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICApXHJcbiAgICAgICAgaWYgKGlzSG9yaXpvbnRhbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPEZvcm1Hcm91cCBjb250cm9sSWQ9e3RoaXMucHJvcHMuaWR9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxDb2wgY29tcG9uZW50Q2xhc3M9e0NvbnRyb2xMYWJlbH0gc209ezJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJlbH1cclxuICAgICAgICAgICAgICAgICAgICA8L0NvbD5cclxuICAgICAgICAgICAgICAgICAgICA8Q29sIHNtPXsxMH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtkYXRlRm9ybUNvbnRyb2x9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9Db2w+XHJcbiAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8Rm9ybUdyb3VwIGNvbnRyb2xJZD17dGhpcy5wcm9wcy5pZH0+XHJcbiAgICAgICAgICAgICAgICAgICAgPENvbnRyb2xMYWJlbD57dGhpcy5wcm9wcy5sYWJlbH08L0NvbnRyb2xMYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICB7ZGF0ZUZvcm1Db250cm9sfVxyXG4gICAgICAgICAgICAgICAgPC9Gb3JtR3JvdXA+ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IE1vZGFsLCBOYXYsIE5hdkl0ZW0sIFRhYnMsIFRhYiwgQnV0dG9uLCBSb3csIENvbCwgQ2xvc2VCdXR0b24gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRNb2RhbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxNb2RhbCBzaG93PXt0aGlzLnByb3BzLnNob3d9IG9uSGlkZT17dGhpcy5wcm9wcy5vbk1vZGFsQ2xvc2V9PlxyXG4gICAgICAgICAgICAgICAgPFRhYi5Db250YWluZXIgaWQ9XCJ0YWJzLXdpdGgtZHJvcGRvd25cIiBkZWZhdWx0QWN0aXZlS2V5PVwiMVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxSb3cgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbCBzbT17MTJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPE1vZGFsLkhlYWRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7Ym9yZGVyQm90dG9tOiAnbm9uZScsIHBhZGRpbmc6ICcwJ319PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxOYXYgYnNTdHlsZT1cInRhYnNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e3BhZGRpbmc6ICcxNXB4IDE1cHggMCAxNXB4J319PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2xvc2VCdXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25Nb2RhbENsb3NlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TmF2SXRlbSBldmVudEtleT1cIjFcIiBocmVmPVwiI3RjLXJlcGVhdGZvcm1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOaXpeeoi+e8lui+kVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hdkl0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxOYXZJdGVtIGV2ZW50S2V5PVwiMlwiIGhyZWY9XCIjdGMtcmVwZWF0Zm9ybVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg6YeN5aSN6KeE5YiZXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmF2SXRlbT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hdj4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Nb2RhbC5IZWFkZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TW9kYWwuQm9keT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGFiLkNvbnRlbnQgYW5pbWF0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGFiLlBhbmUgZXZlbnRLZXk9XCIxXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDcmFzIG1hdHRpcyBjb25zZWN0ZXR1ciBwdXJ1cyBzaXQgYW1ldCBmZXJtZW50dW0uIENyYXMganVzdG8gb2RpbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhcGlidXMgYWMgZmFjaWxpc2lzIGluLCBlZ2VzdGFzIGVnZXQgcXVhbS4gTW9yYmkgbGVvIHJpc3VzLCBwb3J0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWMgY29uc2VjdGV0dXIgYWMsIHZlc3RpYnVsdW0gYXQgZXJvcy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9UYWIuUGFuZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRhYi5QYW5lIGV2ZW50S2V5PVwiMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQWVuZWFuIGxhY2luaWEgYmliZW5kdW0gbnVsbGEgc2VkIGNvbnNlY3RldHVyLiBQcmFlc2VudCBjb21tb2RvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzdXMgbWFnbmEsIHZlbCBzY2VsZXJpc3F1ZSBuaXNsIGNvbnNlY3RldHVyIGV0LiBEb25lYyBzZWQgb2Rpb1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVpLiBEb25lYyB1bGxhbWNvcnBlciBudWxsYSBub24gbWV0dXMgYXVjdG9yIGZyaW5naWxsYS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9UYWIuUGFuZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1RhYi5Db250ZW50PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Nb2RhbC5Cb2R5PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0NvbD5cclxuICAgICAgICAgICAgICAgICAgICA8L1Jvdz5cclxuICAgICAgICAgICAgICAgIDwvVGFiLkNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgIDxNb2RhbC5Gb290ZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiA+6L+Z5piv5LiA5Liq5oyJ6ZKuPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L01vZGFsLkZvb3Rlcj5cclxuICAgICAgICAgICAgPC9Nb2RhbD5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9pbmRleC5jc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vaW5kZXguY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9pbmRleC5jc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0ICdmdWxsY2FsZW5kYXItcmVhY3R3cmFwcGVyL2Rpc3QvY3NzL2Z1bGxjYWxlbmRhci5taW4uY3NzJ1xyXG5pbXBvcnQgJ2Jvb3RzdHJhcC9kaXN0L2Nzcy9ib290c3RyYXAuY3NzJztcclxuaW1wb3J0ICdib290c3RyYXAvZGlzdC9jc3MvYm9vdHN0cmFwLXRoZW1lLmNzcyc7XHJcbmltcG9ydCAnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLWZyZWUvY3NzL2FsbC5jc3MnXHJcbmltcG9ydCBBcHAgZnJvbSAnLi9BcHAnO1xyXG5pbXBvcnQgJy4vaW5kZXguY3NzJztcclxuXHJcblJlYWN0RE9NLnJlbmRlcig8QXBwIC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpKTtcclxuXHJcbi8qXHJcbiQoZnVuY3Rpb24oKXtcclxuICAgIC8vIOWumuS5ieWPmOmHj1xyXG5cdGNvbnN0IGRhdGFMb2FkZXIgPSBuZXcgV2l6RXZlbnREYXRhTG9hZGVyKCk7XHJcblx0bGV0IGdfZWRpdFBvcHBlciwgZ19jcmVhdGVNb2RhbCwgZ19lZGl0TW9kYWw7XHJcblxyXG4gICAgY29uc3QgY2FsZW5kYXIgPSAkKCcjY2FsZW5kYXInKS5mdWxsQ2FsZW5kYXIoe1xyXG5cdFx0dGhlbWVTeXN0ZW06ICdzdGFuZGFyZCcsXHJcblx0XHRoZWlnaHQ6ICdwYXJlbnQnLFxyXG5cdFx0aGVhZGVyOiB7XHJcblx0XHRcdGxlZnQ6ICdwcmV2LG5leHQsdG9kYXknLFxyXG5cdFx0XHRjZW50ZXI6ICd0aXRsZScsXHJcblx0XHRcdHJpZ2h0OiAnbW9udGgsYWdlbmRhV2VlayxhZ2VuZGFEYXksbGlzdFdlZWsnXHJcblx0XHR9LFxyXG5cdFx0dmlld3M6IHtcclxuXHRcdFx0bW9udGg6IHtcclxuXHRcdFx0XHQvL3RpdGxlRm9ybWF0OiBnX2xvY190aXRsZWZvcm1hdF9tb250aCwgLy92YXIgZ19sb2NfdGl0bGVmb3JtYXRfbW9udGggPSBcIk1NTU0geXl5eVwiO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRhZ2VuZGE6IHtcclxuXHRcdFx0XHRtaW5UaW1lOiBcIjA4OjAwOjAwXCIsXHJcblx0XHRcdFx0c2xvdExhYmVsRm9ybWF0OiAnaCg6bW0pIGEnXHJcblx0XHRcdH0sXHJcblx0XHRcdGxpc3RXZWVrOiB7XHJcblxyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0bmF2TGlua3M6IHRydWUsXHJcblx0XHRhbGxEYXlEZWZhdWx0OiBmYWxzZSxcclxuXHRcdGRlZmF1bHRWaWV3OiAnYWdlbmRhV2VlaycsXHJcblx0XHRldmVudExpbWl0OiB0cnVlLFxyXG5cdFx0YnV0dG9uVGV4dDoge1xyXG5cdFx0XHR0b2RheTogJ+S7iuWkqScsXHJcblx0XHRcdG1vbnRoOiAn5pyIJyxcclxuXHRcdFx0d2VlazogJ+WRqCcsXHJcblx0XHRcdGRheTogJ+aXpScsXHJcblx0XHRcdGxpc3Q6ICfooagnXHJcbiAgICAgICAgfSxcclxuXHRcdG1vbnRoTmFtZXM6IFtcclxuICAgICAgICAgICAgJzHmnIgnLCAnMuaciCcsICcz5pyIJywgJzTmnIgnLCBcclxuICAgICAgICAgICAgJzXmnIgnLCAnNuaciCcsICc35pyIJywgJzjmnIgnLCBcclxuICAgICAgICAgICAgJznmnIgnLCAnMTDmnIgnLCAnMTHmnIgnLCAnMTLmnIgnXHJcbiAgICAgICAgXSxcclxuXHRcdG1vbnRoTmFtZXNTaG9ydDogW1xyXG4gICAgICAgICAgICAnMeaciCcsICcy5pyIJywgJzPmnIgnLCAnNOaciCcsIFxyXG4gICAgICAgICAgICAnNeaciCcsICc25pyIJywgJzfmnIgnLCAnOOaciCcsIFxyXG4gICAgICAgICAgICAnOeaciCcsICcxMOaciCcsICcxMeaciCcsICcxMuaciCdcclxuICAgICAgICBdLFxyXG5cdFx0ZGF5TmFtZXM6IFtcclxuICAgICAgICAgICAgJ+WRqOaXpScsICflkajkuIAnLCAn5ZGo5LqMJywgJ+WRqOS4iScsICflkajlm5snLCAn5ZGo5LqUJywgJ+WRqOWFrSdcclxuICAgICAgICBdLFxyXG5cdFx0ZGF5TmFtZXNTaG9ydDogW1xyXG4gICAgICAgICAgICAn5ZGo5pelJywgJ+WRqOS4gCcsICflkajkuownLCAn5ZGo5LiJJywgJ+WRqOWbmycsICflkajkupQnLCAn5ZGo5YWtJ1xyXG4gICAgICAgIF0sXHJcblx0XHRzZWxlY3RhYmxlOiB0cnVlLFxyXG5cdFx0c2VsZWN0SGVscGVyOiB0cnVlLFxyXG5cdFx0dW5zZWxlY3RDYW5jZWw6ICcubW9kYWwgKicsXHJcblx0XHRhbGxEYXlUZXh0OiAn5YWo5aSpJyxcclxuXHRcdG5vd0luZGljYXRvcjogdHJ1ZSxcclxuXHRcdGZvcmNlRXZlbnREdXJhdGlvbjogdHJ1ZSxcclxuXHRcdGZpcnN0RGF5OiAxLCAvLyDnrKzkuIDlpKnmmK/lkajkuIDov5jmmK/lkajlpKnvvIzkuI5kYXRlcGlja2Vy5b+F6aG755u45ZCMXHJcblx0XHRkcmFnT3BhY2l0eToge1xyXG5cdFx0XHRcIm1vbnRoXCI6IC41LFxyXG5cdFx0XHRcImFnZW5kYVdlZWtcIjogMSxcclxuXHRcdFx0XCJhZ2VuZGFEYXlcIjogMVxyXG5cdFx0fSxcclxuXHRcdGVkaXRhYmxlOiB0cnVlLFxyXG5cclxuXHRcdC8vIOWIt+aWsOinhuWbvu+8jOmHjeaWsOiOt+WPluaXpeWOhuS6i+S7tlxyXG5cdFx0dmlld1JlbmRlcjogZnVuY3Rpb24oIHZpZXcsIGVsZW1lbnQgKSB7XHJcblx0XHRcdC8vVE9ETzog5oSf6KeJ6L+Z5qC36YCg5oiQ5oCn6IO95LiK55qE5o2f5aSx77yM5piv5ZCm5pyJ5pu05aW955qE5pa55rOV77yfXHJcblx0XHRcdGNvbnN0IGNhbGVuZGFyID0gJCgnI2NhbGVuZGFyJyk7XHJcblx0XHRcdGNvbnN0IGV2ZW50U291cmNlcyA9IGRhdGFMb2FkZXIuZ2V0RXZlbnRTb3VyY2VzKCB2aWV3LCBlbGVtZW50ICk7XHJcblx0XHRcdGNhbGVuZGFyLmZ1bGxDYWxlbmRhcigncmVtb3ZlRXZlbnRzJyk7XHJcblx0XHRcdGZvciAobGV0IGk9MCA7IGkgPCBldmVudFNvdXJjZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRjYWxlbmRhci5mdWxsQ2FsZW5kYXIoJ2FkZEV2ZW50U291cmNlJywgZXZlbnRTb3VyY2VzW2ldKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8g6YCJ5oup5Yqo5L2c6Kem5Y+R55qE5LqL5Lu25Y+l5p+E77yM5a6a5LmJ5LqG5LiA5LiqY2FsbGJhY2tcclxuXHRcdHNlbGVjdDogZnVuY3Rpb24oc3RhcnQsIGVuZCwganNFdmVudCwgdmlldyl7XHJcblx0XHRcdC8vIOW8ueWHuuKAnOWIm+W7uuaXpeWOhuS6i+S7tuKAneeql+WPo1xyXG5cdFx0XHQvLyDliKTmlq3mmK/lkKbmuLLmn5NcclxuXHRcdFx0Ly9UT0RPOiDmg7Plip7ms5XkuI3opoHnlKjlhajlsYDlj5jph49cclxuXHRcdFx0aWYgKCAhd2luZG93LmdfY3JlYXRlTW9kYWwgKSBuZXcgRXZlbnRDcmVhdGVNb2RhbCh7c3RhcnQsIGVuZCwganNFdmVudCwgdmlld30pO1xyXG5cdFx0XHQvLyDkvKDpgJLlj4LmlbBcclxuXHRcdFx0d2luZG93LmdfY3JlYXRlTW9kYWwudXBkYXRlKHtzdGFydCwgZW5kLCBqc0V2ZW50LCB2aWV3fSk7XHJcblx0XHRcdHdpbmRvdy5nX2NyZWF0ZU1vZGFsLnNob3coKTtcclxuXHRcdH0sXHJcblxyXG5cdFx0ZXZlbnREcmFnU3RhcnQ6IGZ1bmN0aW9uKCBldmVudCwganNFdmVudCwgdWksIHZpZXcgKSB7IH0sXHJcblx0XHRldmVudERyYWdTdG9wOiBmdW5jdGlvbiggZXZlbnQsIGpzRXZlbnQsIHVpLCB2aWV3ICkgeyB9LFxyXG5cclxuXHRcdC8vIOaXpeWOhuS6i+S7tuaLluWKqCBldmVudCwgZGVsdGEsIHJldmVydEZ1bmMsIGpzRXZlbnQsIHVpLCB2aWV3XHJcblx0XHRldmVudERyb3A6IGZ1bmN0aW9uKGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXcpe1xyXG5cdFx0XHRpZiAoZXZlbnQuaWQpe1xyXG5cdFx0XHRcdGRhdGFMb2FkZXIudXBkYXRlRXZlbnREYXRhT25Ecm9wKGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXcpXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV2ZXJ0RnVuYygpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cclxuXHRcdC8vIOaXpeWOhuS6i+S7tuaXpeacn+iMg+WbtOmHjee9rlxyXG5cdFx0ZXZlbnRSZXNpemU6IGZ1bmN0aW9uKGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXcpe1xyXG5cdFx0XHRpZiAoZXZlbnQuaWQpe1xyXG5cdFx0XHRcdGRhdGFMb2FkZXIudXBkYXRlRXZlbnREYXRhT25SZXNpemUoZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV2ZXJ0RnVuYygpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cclxuXHRcdGV2ZW50UmVuZGVyOiBmdW5jdGlvbihldmVudE9iaiwgJGVsKSB7XHJcblx0XHRcdC8vIOWFg+e0oOW3sue7j+a4suafk++8jOWPr+S/ruaUueWFg+e0oFxyXG5cdFx0XHRjb25zdCBpc0NvbXBsZXRlID0gcGFyc2VJbnQoZXZlbnRPYmouY29tcGxldGUpID09IDU7XHJcblx0XHRcdGlmICggaXNDb21wbGV0ZSApIHtcclxuXHRcdFx0XHQvLyDmoLflvI9cclxuXHRcdFx0XHQkZWwuYWRkQ2xhc3MoJ3RjLWNvbXBsZXRlJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHR9LFxyXG5cclxuXHRcdC8vIOaXpeWOhuS6i+S7tueCueWHu+WQjuS6i+S7tuWPpeafhFxyXG5cdFx0ZXZlbnRDbGljazogZnVuY3Rpb24oIGV2ZW50LCBqc0V2ZW50LCB2aWV3ICkge1xyXG5cdFx0XHQvLyB0aGlzIOaMh+WQkeWMheijueS6i+S7tueahDxhPuWFg+e0oFxyXG5cclxuXHRcdFx0Ly8g5Yik5pat5piv5ZCm5bey57uP5riy5p+T5by556qXXHJcblx0XHRcdGlmICggIWdfZWRpdFBvcHBlciApIHtcclxuXHRcdFx0XHRnX2VkaXRQb3BwZXIgPSByZW5kZXJFZGl0UG9wcGVyKHtcclxuXHRcdFx0XHRcdCdldmVudCc6IGV2ZW50LFxyXG5cdFx0XHRcdFx0J2pzRXZlbnQnOiBqc0V2ZW50LFxyXG5cdFx0XHRcdFx0J3ZpZXcnOiB2aWV3XHJcblx0XHRcdFx0fSwgdGhpcykuRXZlbnRQb3BvdmVyKCdzaG93Jyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Ly8g5pu05pawcmVmZXJlbmNlXHJcblx0XHRcdFx0Z19lZGl0UG9wcGVyLkV2ZW50UG9wb3Zlcignb3B0aW9uJywge1xyXG5cdFx0XHRcdFx0YXJnczoge1xyXG5cdFx0XHRcdFx0XHQnZXZlbnQnOiBldmVudCxcclxuXHRcdFx0XHRcdFx0J2pzRXZlbnQnOiBqc0V2ZW50LFxyXG5cdFx0XHRcdFx0XHQndmlldyc6IHZpZXdcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR0aXRsZTogZXZlbnQudGl0bGUsXHJcblx0XHRcdFx0XHRyZWZlcmVuY2U6IHRoaXNcclxuXHRcdFx0XHR9KS5FdmVudFBvcG92ZXIoJ3VwZGF0ZScpLkV2ZW50UG9wb3Zlcignc2hvdycpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cdFx0XHJcblx0fSlcclxufSlcclxuKi8iLCJpbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcbmltcG9ydCAnZnVsbGNhbGVuZGFyJztcclxuaW1wb3J0IHsgV2l6RGF0YWJhc2UgYXMgZ19kYiwgV2l6Q29tbW9uVUkgYXMgZ19jbW59IGZyb20gJy4uL3V0aWxzL1dpekludGVyZmFjZSc7XHJcbmltcG9ydCBDb25maWcgZnJvbSAnLi4vdXRpbHMvQ29uZmlnJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbGVuZGFyRXZlbnQge1xyXG5cdC8qKlxyXG4gICAgICog5Yib5bu65LiA5Liq6YCa55So5pel56iLLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIOWOn+Wni+aVsOaNruexu+Wei++8jOWPr+S7peaYryBXaXpFdmVudCwgRnVsbENhbGVuZGFyRXZlbnQg5Lul5Y+KIEdVSUQuXHJcbiAgICAgKi9cclxuXHRjb25zdHJ1Y3RvciggZGF0YSwgY2FsZW5kYXIgKSB7XHJcblx0XHRpZiAoIWdfZGIpIHRocm93IG5ldyBFcnJvcignSVdpekRhdGFiYXNlIGlzIG5vdCB2YWxpZC4nKTtcclxuXHRcdHRoaXMuJGNhbGVuZGFyID0gY2FsZW5kYXIgPyAkKGNhbGVuZGFyKSA6ICQoJyNjYWxlbmRhcicpO1xyXG5cdFx0Y29uc3QgdHlwZSA9IHRoaXMuX2NoZWNrRGF0YVR5cGUoZGF0YSk7XHJcblx0XHRzd2l0Y2ggKCB0eXBlICkge1xyXG5cdFx0XHRjYXNlIFwiV2l6RXZlbnRcIjpcclxuXHRcdFx0Y2FzZSBcIkZ1bGxDYWxlbmRhckV2ZW50XCI6XHJcblx0XHRcdFx0dGhpcy5fY3JlYXRlKGRhdGEsIHR5cGUpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIFwiR1VJRFwiOlxyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHQvL1RPRE86IOiOt+W+l1dpekV2ZW505pWw5o2u77yM5bm25Yib5bu65a+56LGhXHJcblx0XHRcdFx0XHRjb25zdCBkb2MgPSBnX2RiLkRvY3VtZW50RnJvbUdVSUQoZGF0YSk7XHJcblx0XHRcdFx0XHRjb25zdCBuZXdFdmVudERhdGEgPSB7XHJcblx0XHRcdFx0XHRcdFwiQ0FMRU5EQVJfRU5EXCIgOiBkb2MuR2V0UGFyYW1WYWx1ZSgnQ0FMRU5EQVJfRU5EJyksXHJcblx0XHRcdFx0XHRcdFwiQ0FMRU5EQVJfSU5GT1wiIDogZG9jLkdldFBhcmFtVmFsdWUoJ0NBTEVOREFSX0lORk8nKSxcclxuXHRcdFx0XHRcdFx0XCJDQUxFTkRBUl9FWFRSQUlORk9cIiA6IGRvYy5HZXRQYXJhbVZhbHVlKCdDQUxFTkRBUl9FWFRSQUlORk8nKSxcclxuXHRcdFx0XHRcdFx0XCJDQUxFTkRBUl9TVEFSVFwiIDogZG9jLkdldFBhcmFtVmFsdWUoJ0NBTEVOREFSX1NUQVJUJyksXHJcblx0XHRcdFx0XHRcdFwiQ0FMRU5EQVJfUkVDVVJSRU5DRVwiIDogZG9jLkdldFBhcmFtVmFsdWUoJ0NBTEVOREFSX1JFQ1VSUkVOQ0UnKSxcclxuXHRcdFx0XHRcdFx0XCJDQUxFTkRBUl9FTkRSRUNVUlJFTkNFXCIgOiBkb2MuR2V0UGFyYW1WYWx1ZSgnQ0FMRU5EQVJfRU5EUkVDVVJSRU5DRScpLFxyXG5cdFx0XHRcdFx0XHRcImNyZWF0ZWRcIiA6IG1vbWVudChkb2MuRGF0ZUNyZWF0ZWQpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpLFxyXG5cdFx0XHRcdFx0XHRcImd1aWRcIiA6IGRvYy5HVUlELFxyXG5cdFx0XHRcdFx0XHRcInRpdGxlXCIgOiBkb2MuVGl0bGUsXHJcblx0XHRcdFx0XHRcdFwidXBkYXRlZFwiIDogbW9tZW50KGRvYy5EYXRlTW9kaWZpZWQpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR0aGlzLl9jcmVhdGUobmV3RXZlbnREYXRhLCAnV2l6RXZlbnQnKTtcclxuXHRcdFx0XHR9IGNhdGNoIChlKSB7IGNvbnNvbGUuZXJyb3IoZSk7IH1cclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRfY3JlYXRlKGRhdGEsIHR5cGUpIHtcclxuXHRcdGxldCBzdGFydCwgZW5kLCBpZCwgYmtDb2xvciwgYWxsRGF5LCBjb21wbGV0ZSwgZGF0ZUNvbXBsZXRlZCwgcnB0UnVsZSwgcnB0RW5kO1xyXG5cdFx0c3dpdGNoICh0eXBlKSB7XHJcblx0XHRcdGNhc2UgXCJHVUlEXCI6XHJcblx0XHRcdGNhc2UgXCJXaXpFdmVudFwiOlxyXG5cdFx0XHRcdHRoaXMuX0luZm8gPSB0aGlzLl9wYXJzZUluZm8oZGF0YS5DQUxFTkRBUl9JTkZPKTtcclxuXHRcdFx0XHR0aGlzLl9FeHRyYUluZm8gPSBkYXRhLkNBTEVOREFSX0VYVFJBSU5GTyA/IHRoaXMuX3BhcnNlSW5mbyhkYXRhLkNBTEVOREFSX0VYVFJBSU5GTykgOiB0aGlzLl9nZXREZWZhdWx0RXh0cmFJbmZvKCk7XHJcblx0XHRcdFx0Ly8g57uf5LiA5Y+Y6YePXHJcblx0XHRcdFx0aWQgPSBkYXRhLmd1aWQ7XHJcblx0XHRcdFx0c3RhcnQgPSBkYXRhLkNBTEVOREFSX1NUQVJUO1xyXG5cdFx0XHRcdGVuZCA9IGRhdGEuQ0FMRU5EQVJfRU5EO1xyXG5cdFx0XHRcdC8vIOWIpOaWreaYr+WQpueUqOaIt+iHquWumuS5ieiDjOaZr+iJsu+8jOWQkeS4i+WFvOWuueWOn+eJiOaXpeWOhlxyXG5cdFx0XHRcdGJrQ29sb3IgPSB0aGlzLl9JbmZvLmNpID8gKCBwYXJzZUludCh0aGlzLl9JbmZvLmNpKSA9PSAwID8gdGhpcy5fSW5mby5iIDogQ29uZmlnLmNvbG9ySXRlbXNbdGhpcy5fSW5mby5jaV0uY29sb3JWYWx1ZSApIDogdGhpcy5fSW5mby5iO1xyXG5cdFx0XHRcdGFsbERheSA9IGRhdGEuQ0FMRU5EQVJfRU5ELmluZGV4T2YoXCIyMzo1OTo1OVwiKSAhPSAtMSA/IHRydWUgOiBmYWxzZTtcclxuXHRcdFx0XHRjb21wbGV0ZSA9IHRoaXMuX0V4dHJhSW5mby5Db21wbGV0ZTtcclxuXHRcdFx0XHRkYXRlQ29tcGxldGVkID0gdGhpcy5fRXh0cmFJbmZvLkRhdGVDb21wbGV0ZWQ7XHJcblx0XHRcdFx0Ly8g6YeN5aSN5LqL5Lu2XHJcblx0XHRcdFx0cnB0UnVsZSA9IGRhdGEuQ0FMRU5EQVJfUkVDVVJSRU5DRTtcclxuXHRcdFx0XHRycHRFbmQgPSBkYXRhLkNBTEVOREFSX0VORFJFQ1VSUkVOQ0U7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgXCJGdWxsQ2FsZW5kYXJFdmVudFwiOlxyXG5cdFx0XHRcdGlkID0gZGF0YS5pZDtcclxuXHRcdFx0XHRzdGFydCA9IGRhdGEuc3RhcnQ7XHJcblx0XHRcdFx0ZW5kID0gZGF0YS5lbmQ7XHJcblx0XHRcdFx0YmtDb2xvciA9IGRhdGEuYmFja2dyb3VuZENvbG9yO1xyXG5cdFx0XHRcdGFsbERheSA9IGRhdGEuYWxsRGF5ID8gZGF0YS5hbGxEYXkgOiAhJC5mdWxsQ2FsZW5kYXIubW9tZW50KGRhdGEuc3RhcnQpLmhhc1RpbWUoKTtcclxuXHRcdFx0XHRjb21wbGV0ZSA9IGRhdGEuY29tcGxldGUgfHwgMDtcclxuXHRcdFx0XHRkYXRlQ29tcGxldGVkID0gZGF0YS5kYXRlQ29tcGxldGVkIHx8ICcnO1xyXG5cdFx0XHRcdHJwdFJ1bGUgPSBkYXRhLnJwdFJ1bGU7XHJcblx0XHRcdFx0cnB0RW5kID0gZGF0YS5ycHRFbmRcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgaWRlbnRpZnkgZGF0YSB0eXBlLicpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdFx0Ly8g5Z+65pys5L+h5oGvXHJcblx0XHR0aGlzLmlkID0gaWQ7XHJcblx0XHR0aGlzLnRpdGxlID0gZGF0YS50aXRsZTtcclxuXHRcdC8vIOaXtumXtOS/oeaBr1xyXG5cdFx0dGhpcy5hbGxEYXkgPSBhbGxEYXk7XHJcblx0XHQvLyDms6jmhI/vvIFzdGFydC9lbmQg5Y+v6IO95pivbW9tZW505a+56LGh5oiW6ICFc3Ry77yM5omA5Lul5LiA5b6L5YWI6L2s5o2i5oiQbW9tZW505YaN5qC85byP5YyW6L6T5Ye6XHJcblx0XHR0aGlzLnN0YXJ0ID0gYWxsRGF5ID8gbW9tZW50KHN0YXJ0KS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpIDogbW9tZW50KHN0YXJ0KS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdHRoaXMuZW5kID0gYWxsRGF5ID8gbW9tZW50KGVuZCkuZm9ybWF0KFwiWVlZWS1NTS1ERFwiKSA6IG1vbWVudChlbmQpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0dGhpcy5jcmVhdGVkID0gZGF0YS5jcmVhdGVkID8gZGF0YS5jcmVhdGVkIDogbW9tZW50KHN0YXJ0KS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdHRoaXMudXBkYXRlZCA9IGRhdGEudXBkYXRlZCA/IGRhdGEudXBkYXRlZCA6IG1vbWVudCgpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0Ly8g6K6+572u5L+h5oGvXHJcblx0XHR0aGlzLnRleHRDb2xvciA9ICdibGFjayc7XHJcblx0XHR0aGlzLmJhY2tncm91bmRDb2xvciA9IGJrQ29sb3I7XHJcblx0XHR0aGlzLmNvbXBsZXRlID0gY29tcGxldGU7XHJcblx0XHR0aGlzLmRhdGVDb21wbGV0ZWQgPSBkYXRlQ29tcGxldGVkO1xyXG5cdFx0Ly8g6YeN5aSN5LqL5Lu2XHJcblx0XHR0aGlzLnJwdFJ1bGUgPSBycHRSdWxlO1xyXG5cdFx0dGhpcy5ycHRFbmQgPSBycHRFbmQ7XHJcblx0XHQvL1xyXG5cdFx0dGhpcy5fdXBkYXRlKCk7XHJcblx0fVxyXG5cclxuXHRfY2hlY2tEYXRhVHlwZShkYXRhKSB7XHJcblx0XHRjb25zdCBvYmpDbGFzcyA9IGRhdGEuY29uc3RydWN0b3I7XHJcbiAgICAgICAgY29uc3QgR1VJRF9SZWdFeHIgPSAvXlswLTlhLWZdezh9LVswLTlhLWZdezR9LVsxLTVdWzAtOWEtZl17M30tWzg5YWJdWzAtOWEtZl17M30tWzAtOWEtZl17MTJ9JC9pO1xyXG4gICAgICAgIGxldCB0eXBlO1xyXG4gICAgICAgIHN3aXRjaCAob2JqQ2xhc3MpIHtcclxuICAgICAgICAgICAgY2FzZSBTdHJpbmc6XHJcbiAgICAgICAgICAgICAgICBpZiAoIEdVSURfUmVnRXhyLnRlc3QoZGF0YSkgKSB0eXBlID0gXCJHVUlEXCI7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHRocm93IG5ldyBFcnJvcignVW5rbm93biBkYXRhLCBjYW5ub3QgY3JlYXRlIENhbGVuZGFyRXZlbnQgb2JqZWN0LicpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgT2JqZWN0OlxyXG5cdFx0XHRcdGlmICggZGF0YS5DQUxFTkRBUl9JTkZPICYmIGRhdGEudGl0bGUgKSB7IFxyXG5cdFx0XHRcdFx0dHlwZSA9ICdXaXpFdmVudCc7XHJcblx0XHRcdFx0fSBlbHNlIGlmICggZGF0YS5zdGFydCAmJiBkYXRhLnRpdGxlICkge1xyXG5cdFx0XHRcdFx0dHlwZSA9ICdGdWxsQ2FsZW5kYXJFdmVudCc7XHJcblx0XHRcdFx0fVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0eXBlO1xyXG5cdH07XHJcblxyXG5cdF9wYXJzZUluZm8oSW5mb1N0cmluZykge1xyXG5cdFx0Y29uc3QgSW5mb09iamVjdCA9IHt9O1xyXG5cdFx0Ly8g5ouG6KejQ0FMRU5EQVJfSU5GT1xyXG5cdFx0Y29uc3QgSW5mb0FycmF5ID0gSW5mb1N0cmluZy5zcGxpdCgnLycpO1xyXG5cdFx0SW5mb0FycmF5LmZvckVhY2goZnVuY3Rpb24oaXRlbSwgaW5kZXgsIGFycil7XHJcblx0XHRcdGNvbnN0IHBhaXIgPSBpdGVtLnNwbGl0KCc9Jyk7XHJcblx0XHRcdEluZm9PYmplY3RbcGFpclswXV0gPSBwYWlyWzFdO1xyXG5cdFx0fSk7XHJcblx0XHQvLyDlpITnkIbpopzoibLlgLxcclxuXHRcdGlmICggSW5mb09iamVjdC5iICkgSW5mb09iamVjdC5iID0gJyMnICsgSW5mb09iamVjdC5iO1xyXG5cclxuXHRcdHJldHVybiBJbmZvT2JqZWN0O1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG4gICAgICog5bCGIEluZm8g5a+56LGh5bqP5YiX5YyWLlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtJbmZvT2JqZWN0PV0g5o+Q5L6bIEluZm8g5a+56LGh77yM6buY6K6k5Li6YHRoaXMuX0luZm9gLlxyXG4gICAgICogQHJldHVybiB7U3RyaW5nfSDov5Tlm57nlKjkuo5JbmZv5a+56LGh5a2X56ym5LiyLlxyXG4gICAgICovXHJcblx0X3N0cmluZ2lmeUluZm8oIEluZm9PYmplY3QgPSB0aGlzLl9JbmZvICkge1xyXG5cdFx0aWYgKCAhSW5mb09iamVjdCApIHJldHVybiAnJztcclxuXHRcdGNvbnN0IEluZm9BcnJheSA9IFtdO1xyXG5cdFx0Y29uc3QgSW5mb09iamVjdEtleXNBcnJheSA9IE9iamVjdC5rZXlzKEluZm9PYmplY3QpO1xyXG5cdFx0SW5mb09iamVjdEtleXNBcnJheS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0sIGluZGV4LCBhcnIpe1xyXG5cdFx0XHRjb25zdCBzaW5nbGVJbmZvID0gYCR7aXRlbX09JHtJbmZvT2JqZWN0W2l0ZW1dfWA7XHJcblx0XHRcdEluZm9BcnJheS5wdXNoKHNpbmdsZUluZm8pO1xyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gSW5mb0FycmF5LmpvaW4oJy8nKS5yZXBsYWNlKCcjJywgJycpO1xyXG5cdH07XHJcblxyXG5cdF91cGRhdGUoKSB7XHJcblx0XHR0aGlzLl91cGRhdGVJbmZvKCk7XHJcblx0XHR0aGlzLl91cGRhdGVFeHRyYUluZm8oKTtcclxuXHR9O1xyXG5cclxuXHRfdXBkYXRlSW5mbygpIHtcclxuXHRcdGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cdFx0Y29uc3QgSW5mb09iamVjdCA9IHtcclxuXHRcdFx0J2InOiBudWxsLCAvL+iDjOaZr+iJsmhleOWAvFxyXG5cdFx0XHQncic6ICctMScsIC8v5o+Q6YaS5pa55byPXHJcblx0XHRcdCdjJzogJzAnLCAvL+e7k+adn+aPkOmGkuS/oeaBr1xyXG5cdFx0XHQnY2knOiAwIC8v6IOM5pmv6ImySUTvvIzpu5jorqQgMCDooajnpLrog4zmma/kuLrnlKjmiLfoh6rlrprkuYlcclxuXHRcdH07XHJcblx0XHQvLyDmm7TmlrDog4zmma/oibInYidcclxuXHRcdEluZm9PYmplY3RbJ2InXSA9IHRoaXMuYmFja2dyb3VuZENvbG9yLnJlcGxhY2UoJyMnLCAnJyk7XHJcblx0XHQvLyDmm7TmlrDpopzoibLmjIfmlbAnY2knXHJcblx0XHRDb25maWcuY29sb3JJdGVtcy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0sIGluZGV4LCBhcnIpe1xyXG5cdFx0XHRpZiAoIGl0ZW0uY29sb3JWYWx1ZSA9PSAgdGhhdC5iYWNrZ3JvdW5kQ29sb3IgKSB7XHJcblx0XHRcdFx0Ly8g5b2T5pel56iL6IOM5pmv6Imy5LiO6Imy6KGo5Yy56YWN5pe25YiZ55SoIGNvbG9yIGlkZXgg5p2l5YKo5a2Y77yI5YW85a655Y6f54mI5pel5Y6G5o+S5Lu277yJXHJcblx0XHRcdFx0SW5mb09iamVjdFsnY2knXSA9IGluZGV4O1xyXG5cdFx0XHR9O1xyXG5cdFx0fSk7XHJcblx0XHQvLyDlupTnlKjmm7TmlrBcclxuXHRcdHRoaXMuX0luZm8gPSBJbmZvT2JqZWN0O1xyXG5cdH07XHJcblxyXG5cdF9nZXREZWZhdWx0RXh0cmFJbmZvKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0J0NvbXBsZXRlJzogMCwgLy9cclxuXHRcdFx0J0RhdGVDb21wbGV0ZWQnOiAnJywgLy8gSVNPIOagh+WHhuaXpeacn+Wtl+espuS4siBZWVlZLU1NLUREIDAwOjAwOjAwXHJcblx0XHRcdCdQcmlvcic6IDBcclxuXHRcdH07XHJcblx0fTtcclxuXHJcblx0X3VwZGF0ZUV4dHJhSW5mbygpIHtcclxuXHRcdGNvbnN0IEV4dHJhSW5mb09iamVjdCA9IHtcclxuXHRcdFx0J0NvbXBsZXRlJzogMCxcclxuXHRcdFx0J0RhdGVDb21wbGV0ZWQnOiAnJyxcclxuXHRcdFx0J1ByaW9yJzogMFxyXG5cdFx0fTtcclxuXHRcdEV4dHJhSW5mb09iamVjdFsnQ29tcGxldGUnXSA9IHRoaXMuY29tcGxldGU7XHJcblx0XHRFeHRyYUluZm9PYmplY3RbJ0RhdGVDb21wbGV0ZWQnXSA9IHRoaXMuZGF0ZUNvbXBsZXRlZDtcclxuXHRcdHRoaXMuX0V4dHJhSW5mbyA9IEV4dHJhSW5mb09iamVjdDtcclxuXHR9O1xyXG5cclxuXHRfZ2V0RXZlbnRIdG1sKHRpdGxlID0gdGhpcy50aXRsZSwgY29udGVudCA9ICcnKXtcclxuXHRcdGNvbnN0IGh0bWxUZXh0ID0gXHJcblx0XHRcdGA8aHRtbD5cclxuXHRcdFx0XHQ8aGVhZD5cclxuXHRcdFx0XHRcdDxtZXRhIGh0dHAtZXF1aXY9XCJDb250ZW50LVR5cGVcIiBjb250ZW50PVwidGV4dC9odG1sOyBjaGFyc2V0PXVuaWNvZGVcIj5cclxuXHRcdFx0XHRcdDx0aXRsZT4ke3RpdGxlfTwvdGl0bGU+IFxyXG5cdFx0XHRcdDwvaGVhZD5cclxuXHRcdFx0XHQ8Ym9keT5cclxuXHRcdFx0XHRcdDwhLS1XaXpIdG1sQ29udGVudEJlZ2luLS0+XHJcblx0XHRcdFx0XHQ8ZGl2PiR7Y29udGVudH08L2Rpdj5cclxuXHRcdFx0XHRcdDwhLS1XaXpIdG1sQ29udGVudEVuZC0tPlxyXG5cdFx0XHRcdDwvYm9keT5cclxuXHRcdFx0PC9odG1sPmA7XHJcblx0XHJcblx0XHQgIHJldHVybiBodG1sVGV4dFxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG4gICAgICog5qC55o2u5pel56iL55qE6YeN5aSN6KeE5YiZ55Sf5oiQIEZ1bGxDYWxlbmRhciBldmVudFNvdXJjZS5cclxuXHQgKiBAcGFyYW0ge1N0cmluZ30gc3RhcnQg5p+l6K+i6LW35aeL77yMSVNPIOagh+WHhuaXpeacn+Wtl+espuS4si5cclxuXHQgKiBAcGFyYW0ge1N0cmluZ30gZW5kIOafpeivoue7k+adn++8jElTTyDmoIflh4bml6XmnJ/lrZfnrKbkuLIuXHJcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBldmVudFNvdXJjZS5cclxuICAgICAqL1xyXG5cdGdlbmVyYXRlUmVwZWF0RXZlbnRzKHN0YXJ0LCBlbmQpIHtcclxuXHRcdGlmICggIXRoaXMucnB0UnVsZSApIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGZpbmQgQ2FsZW5kYXJFdmVudCByZXBlYXQgcnVsZS4nKTtcclxuXHRcdGNvbnN0IGV2ZW50U291cmNlID0ge1xyXG5cdFx0XHRpZDogdGhpcy5pZCxcclxuXHRcdFx0ZXZlbnRzOiBbXVxyXG5cdFx0fVxyXG5cdFx0Ly/moLnmja5ycHRSdWxl55Sf5oiQ6YeN5aSN5pel5pyf77yM5bm255Sf5oiQ5LqL5Lu2XHJcblx0XHRjb25zdCBkYXlBcnJheSA9IHRoaXMuX2dldFJlbmRlclJlcGVhdERheShzdGFydCwgZW5kKTtcclxuXHRcdGZvciAoIGxldCBkYXkgb2YgZGF5QXJyYXkgKSB7XHJcblx0XHRcdC8vIGRheSDmmK/kuIDkuKpNb21lbnTml6XmnJ/lr7nosaFcclxuXHRcdFx0Y29uc3QgbmV3RXZlbnQgPSB0aGlzLnRvRnVsbENhbGVuZGFyRXZlbnQoKTtcclxuXHRcdFx0bmV3RXZlbnQuc3RhcnQgPSBkYXkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRcdG5ld0V2ZW50LmVuZCA9IG1vbWVudChuZXdFdmVudC5lbmQpLmFkZCggZGF5LmRpZmYoIG1vbWVudCh0aGlzLnN0YXJ0KSApICkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRcdGV2ZW50U291cmNlLmV2ZW50cy5wdXNoKG5ld0V2ZW50KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZXZlbnRTb3VyY2U7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcbiAgICAgKiDmoLnmja7op4TliJnnlJ/miJDml6XmnJ/mlbDnu4RcclxuICAgICAqIEByZXR1cm5zIHtPYmplY3RbXX0g5YyF5ZCr5LiA57O75YiXYE1vbWVudGDml6XmnJ/lr7nosaHnmoTmlbDnu4QuXHJcbiAgICAgKi9cclxuXHRfZ2V0UmVuZGVyUmVwZWF0RGF5KHN0YXJ0LCBlbmQpIHtcclxuXHRcdGNvbnN0IHJwdFJ1bGUgPSB0aGlzLnJwdFJ1bGU7XHJcblx0XHRsZXQgZGF5QXJyYXk7XHJcblx0XHRsZXQgcmVnZXg7XHJcblx0XHRjb25zb2xlLmNvdW50KHJwdFJ1bGUpO1xyXG5cdFx0aWYgKCAocmVnZXggPSAvXkV2ZXJ5KFxcZCk/V2Vla3M/KFxcZCopJC8pLnRlc3QocnB0UnVsZSkgKSB7XHJcblx0XHRcdC8vIOavj1sxMjM0XeWRqFs3MTIzNDU2XVxyXG5cdFx0XHRjb25zdCBjdXJXZWVrRGF5ID0gbW9tZW50KHRoaXMuc3RhcnQpLmRheSgpO1xyXG5cdFx0XHRjb25zdCByZXN1bHRzID0gcmVnZXguZXhlYyhycHRSdWxlKTtcclxuXHRcdFx0Y29uc3QgaW50ZXJXZWVrID0gcmVzdWx0c1sxXTtcclxuXHRcdFx0Y29uc3QgbnVtYmVyID0gcmVzdWx0c1syXSB8fCBgJHtjdXJXZWVrRGF5fWA7XHJcblx0XHRcdGRheUFycmF5ID0gdGhpcy5fZ2V0V2Vla2x5UmVwZWF0RGF5KG51bWJlciwgc3RhcnQsIGVuZCwgaW50ZXJXZWVrKTtcclxuXHJcblx0XHR9IGVsc2UgaWYgKCAocmVnZXggPSAvXkV2ZXJ5V2Vla2RheShcXGQqKSQvKS50ZXN0KHJwdFJ1bGUpICkge1xyXG5cdFx0XHQvLyDmr4/kuKrlt6XkvZzml6VFdmVyeVdlZWtkYXkxMzVcclxuXHRcdFx0Y29uc3QgcmVzdWx0cyA9IHJlZ2V4LmV4ZWMocnB0UnVsZSk7XHJcblx0XHRcdGNvbnN0IG51bWJlciA9IHJlc3VsdHNbMV0gfHwgJzEyMzQ1JztcclxuXHRcdFx0ZGF5QXJyYXkgPSB0aGlzLl9nZXRXZWVrbHlSZXBlYXREYXkobnVtYmVyLCBzdGFydCwgZW5kKTtcclxuXHJcblx0XHR9IGVsc2UgaWYgKCAocmVnZXggPSAvRGFpbHl8V2Vla2x5fE1vbnRobHl8WWVhcmx5LykudGVzdChycHRSdWxlKSApIHtcclxuXHRcdFx0Ly8gRGFpbHl8V2Vla2x5fE1vbnRobHl8WWVhcmx5XHJcblx0XHRcdGNvbnN0IHBlclJ1bGUgPSByZWdleC5leGVjKHJwdFJ1bGUpWzBdXHJcblx0XHRcdGRheUFycmF5ID0gdGhpcy5fZ2V0UGVyUmVwZWF0RGF5cyhzdGFydCwgZW5kLCBwZXJSdWxlKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGRheUFycmF5O1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG4gICAgICog5qC55o2u5q+P5ZGo6KeE5YiZ55Sf5oiQ5pel5pyf5pWw57uEXHJcblx0ICogQHBhcmFtIHtTdHJpbmd9IG51bWJlciDmlbTmlbDlrZfnrKbkuLLooajnpLrnmoTop4TliJnvvJtcclxuICAgICAqIEByZXR1cm5zIHtPYmplY3RbXX0g5YyF5ZCr5LiA57O75YiXTW9tZW505pel5pyf5a+56LGh55qE5pWw57uELlxyXG4gICAgICovXHJcblx0X2dldFdlZWtseVJlcGVhdERheShudW1iZXIsIHN0YXJ0LCBlbmQsIGludGVyV2Vla3MgPSAnMScpIHtcclxuXHRcdC8v6L+U5ZueW3tzdGFydCwgZW5kfSwge3N0YXJ0LCBlbmR9LCB7c3RhcnQsIGVuZH1dXHJcblx0XHQvL+iAg+iZkea4suafk+iMg+WbtO+8jOS7peWPiue7k+adn+W+queOr+eahOaXpeacn1xyXG5cdFx0Y29uc3Qgdmlld1N0YXJ0ID0gbW9tZW50KHRoaXMuc3RhcnQpO1xyXG5cdFx0Y29uc3Qgdmlld0VuZCA9IG1vbWVudChlbmQpO1xyXG5cdFx0Y29uc3QgcnB0RW5kID0gdGhpcy5ycHRFbmQgPyBtb21lbnQodGhpcy5ycHRFbmQpIDogdmlld0VuZDtcclxuXHRcdGxldCBkYXlBcnJheSA9IFtdO1xyXG5cdFx0Y29uc3QgaW50ZXJ2YWxXZWVrcyA9IGludGVyV2Vla3MgPyBwYXJzZUludChpbnRlcldlZWtzKSA6IDE7XHJcblx0XHRjb25zdCB3ZWVrZGF5cyA9IG51bWJlci5yZXBsYWNlKCc3JywgJzAnKS5zcGxpdCgnJyk7IC8v5ZGo5pelMH425ZGo5YWtXHJcblx0XHRmb3IgKCBsZXQgZGF5IG9mIHdlZWtkYXlzICkge1xyXG5cdFx0XHQvL1xyXG5cdFx0XHRsZXQgY3VyV2Vla0RheSA9IHBhcnNlSW50KGRheSksIG5ld0V2ZW50U3RhcnREYXRlID0gbW9tZW50KHZpZXdTdGFydCk7XHJcblx0XHRcdGRvIHtcclxuXHRcdFx0XHQvLyDliJvlu7rmlrBNb21lbnTlr7nosaFcclxuXHRcdFx0XHRuZXdFdmVudFN0YXJ0RGF0ZSA9IG1vbWVudCh2aWV3U3RhcnQpLmRheShjdXJXZWVrRGF5KTtcclxuXHRcdFx0XHQvLyDmoLnmja7ml6XnqIvorr7nva50aW1lIHBhcnRcclxuXHRcdFx0XHRjb25zdCBldmVudFN0YXJ0ID0gbW9tZW50KHRoaXMuc3RhcnQpXHJcblx0XHRcdFx0bmV3RXZlbnRTdGFydERhdGUuc2V0KHtcclxuXHRcdFx0XHRcdCdob3VyJzogZXZlbnRTdGFydC5nZXQoJ2hvdXInKSxcclxuXHRcdFx0XHRcdCdtaW51dGUnOiBldmVudFN0YXJ0LmdldCgnbWludXRlJyksXHJcblx0XHRcdFx0XHQnc2Vjb25kJzogZXZlbnRTdGFydC5nZXQoJ3NlY29uZCcpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQvLyDpgb/lhY3liJ3lp4vph43lpI3muLLmn5NcclxuXHRcdFx0XHRpZiAoICFuZXdFdmVudFN0YXJ0RGF0ZS5pc1NhbWUoIGV2ZW50U3RhcnQgKSApIGRheUFycmF5LnB1c2goIG1vbWVudChuZXdFdmVudFN0YXJ0RGF0ZSkgKTtcclxuXHRcdFx0XHQvLyDpmpTlpJrlsJHlkajph43lpI1cclxuXHRcdFx0XHRjdXJXZWVrRGF5ICs9IDcqaW50ZXJ2YWxXZWVrcztcclxuXHRcdFx0XHQvL2NvbnNvbGUubG9nKCBtb21lbnQobmV3RXZlbnRTdGFydERhdGUpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpICk7XHJcblx0XHRcdH0gd2hpbGUgKCBtb21lbnQodmlld1N0YXJ0KS5kYXkoY3VyV2Vla0RheSArIDcgKS5pc0JlZm9yZSggdmlld0VuZCApIFxyXG5cdFx0XHRcdFx0XHQmJiBtb21lbnQodmlld1N0YXJ0KS5kYXkoY3VyV2Vla0RheSArIDcgKS5pc0JlZm9yZSggcnB0RW5kICkgIClcclxuXHRcdFx0XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiBkYXlBcnJheTtcclxuXHR9O1xyXG5cclxuXHRfZ2V0UGVyUmVwZWF0RGF5cyhzdGFydCwgZW5kLCBwZXJSdWxlKSB7XHJcblx0XHRjb25zdCBwZXJSdWxlTWFwID0ge1xyXG5cdFx0XHQnRGFpbHknOiAnZGF5cycsXHJcblx0XHRcdCdXZWVrbHknIDogJ3dlZWtzJyxcclxuXHRcdFx0J01vbnRobHknIDogJ21vbnRocycsXHJcblx0XHRcdCdZZWFybHknIDogJ3llYXJzJ1xyXG5cdFx0fTtcclxuXHRcdGNvbnN0IHZpZXdTdGFydCA9IG1vbWVudCh0aGlzLnN0YXJ0KTtcclxuXHRcdGNvbnN0IHZpZXdFbmQgPSBtb21lbnQoZW5kKTtcclxuXHRcdGNvbnN0IHJwdEVuZCA9IHRoaXMucnB0RW5kID8gbW9tZW50KHRoaXMucnB0RW5kKSA6IHZpZXdFbmQ7XHJcblx0XHRsZXQgZGF5QXJyYXkgPSBbXTtcclxuXHRcdGNvbnN0IGV2ZW50U3RhcnQgPSBtb21lbnQodGhpcy5zdGFydClcclxuXHRcdGRvIHtcclxuXHRcdFx0Ly8g5aKe5Yqg5LiA5Liq5pyIXHJcblx0XHRcdGV2ZW50U3RhcnQuYWRkKDEsIHBlclJ1bGVNYXBbcGVyUnVsZV0pO1xyXG5cdFx0XHRkYXlBcnJheS5wdXNoKCBtb21lbnQoZXZlbnRTdGFydCkgKTtcclxuXHRcdH0gd2hpbGUgKCBldmVudFN0YXJ0LmlzQmVmb3JlKCB2aWV3RW5kICkgJiYgZXZlbnRTdGFydC5pc0JlZm9yZSggcnB0RW5kICkgKTtcclxuXHJcblx0XHRyZXR1cm4gZGF5QXJyYXk7XHJcblx0fVxyXG5cclxuXHR0b0Z1bGxDYWxlbmRhckV2ZW50KCkge1xyXG5cdFx0Ly8g5rOo5oSP5pa55rOV6L+U5Zue55qE5Y+q5pivRnVsbENhbGVuZGFyRXZlbnTnmoTmlbDmja7nsbvlnovvvIzlubbkuI3mmK9ldmVudOWvueixoVxyXG5cdFx0Y29uc3QgdGhhdCA9IHRoaXM7XHJcblx0XHRjb25zdCBuZXdFdmVudCA9IHt9O1xyXG5cdFx0Y29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMpO1xyXG5cdFx0Ly8g5Y676Zmk6Z2e5b+F6KaB5bGe5oCnXHJcblx0XHRrZXlzLnNwbGljZSgga2V5cy5maW5kSW5kZXgoIChpKSA9PiBpID09ICdfSW5mbycgKSwgMSk7XHJcblx0XHRrZXlzLnNwbGljZSgga2V5cy5maW5kSW5kZXgoIChpKSA9PiBpID09ICdfRXh0cmFJbmZvJyApLCAxKTtcclxuXHRcdC8vIOa1heaLt+i0nSwg5LiN6L+H5Li76KaB5bGe5oCn6YO95piv5Z+65pys5pWw5o2u57G75Z6L77yM5omA5Lul5LiN5a2Y5Zyo5byV55So6Zeu6aKYXHJcblx0XHRrZXlzLmZvckVhY2goZnVuY3Rpb24oaXRlbSwgaW5kZXgsIGFycil7XHJcblx0XHRcdG5ld0V2ZW50W2l0ZW1dID0gdGhhdFtpdGVtXTtcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIG5ld0V2ZW50O1xyXG5cdH07XHJcblxyXG5cdHRvV2l6RXZlbnREYXRhKCkge1xyXG5cdFx0dGhpcy5fdXBkYXRlKCk7XHJcblx0XHRjb25zdCBuZXdFdmVudCA9IHt9O1xyXG5cdFx0bmV3RXZlbnQudGl0bGUgPSB0aGlzLnRpdGxlO1xyXG5cdFx0bmV3RXZlbnQuZ3VpZCA9IHRoaXMuaWQ7XHJcblx0XHRuZXdFdmVudC5DQUxFTkRBUl9TVEFSVCA9IHRoaXMuYWxsRGF5ID8gbW9tZW50KHRoaXMuc3RhcnQpLmZvcm1hdCgnWVlZWS1NTS1ERCAwMDowMDowMCcpIDogdGhpcy5zdGFydDtcclxuXHRcdG5ld0V2ZW50LkNBTEVOREFSX0VORCA9IHRoaXMuYWxsRGF5ID8gbW9tZW50KHRoaXMuZW5kKS5mb3JtYXQoJ1lZWVktTU0tREQgMjM6NTk6NTknKSA6IHRoaXMuZW5kO1xyXG5cdFx0bmV3RXZlbnQuQ0FMRU5EQVJfSU5GTyA9IHRoaXMuX3N0cmluZ2lmeUluZm8odGhpcy5fSW5mbyk7XHJcblx0XHRuZXdFdmVudC5DQUxFTkRBUl9FWFRSQUlORk8gPSB0aGlzLl9zdHJpbmdpZnlJbmZvKHRoaXMuX0V4dHJhSW5mbyk7XHJcblx0XHRuZXdFdmVudC5jcmVhdGVkID0gdGhpcy5jcmVhdGVkO1xyXG5cdFx0bmV3RXZlbnQudXBkYXRlZCA9IHRoaXMudXBkYXRlZDtcclxuXHRcdHJldHVybiBuZXdFdmVudDtcclxuXHR9O1xyXG5cclxuXHRhZGRUb0Z1bGxDYWxlbmRhcigpIHtcclxuXHRcdC8vVE9ETzog5bCG6Ieq6Lqr5re75Yqg5YiwRnVsbENhbGVuZGFyXHJcblx0XHR0aGlzLiRjYWxlbmRhci5mdWxsQ2FsZW5kYXIoICdhZGRFdmVudFNvdXJjZScsIHtcclxuXHRcdFx0ZXZlbnRzOiBbXHJcblx0XHRcdFx0dGhpcy50b0Z1bGxDYWxlbmRhckV2ZW50KClcclxuXHRcdFx0XVxyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0X3NhdmVBbGxQcm9wKCkge1xyXG5cdFx0Ly9UT0RPOiDkv53lrZjlhajpg6jmlbDmja7ljIXmi6xUaXRsZVxyXG5cdFx0Ly8g5pu05paw5LqL5Lu25paH5qGj5pWw5o2uXHJcblx0XHRjb25zdCBkb2MgPSBnX2RiLkRvY3VtZW50RnJvbUdVSUQodGhpcy5pZCk7XHJcblx0XHQvLyDkv53lrZjmoIfpophcclxuXHRcdGRvYy5UaXRsZSA9IHRoaXMudGl0bGU7XHJcblx0XHQvLyDkv53lrZjml7bpl7TmlbDmja5cclxuXHRcdGlmICggdGhpcy5hbGxEYXkgKSB7XHJcblx0XHRcdGxldCBzdGFydFN0ciA9IG1vbWVudCh0aGlzLnN0YXJ0KS5zZXQoeydoJzogMCwgJ20nOiAwLCAncyc6IDB9KS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0bGV0IGVuZFN0ciA9IG1vbWVudCh0aGlzLmVuZCkuc2V0KHsnaCc6IDIzLCAnbSc6IDU5LCAncyc6IDU5fSkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX1NUQVJUXCIsIHN0YXJ0U3RyKTtcclxuXHRcdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfRU5EXCIsIGVuZFN0cik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRsZXQgc3RhcnRTdHIgPSBtb21lbnQodGhpcy5zdGFydCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRcdGxldCBlbmRTdHIgPSBtb21lbnQodGhpcy5lbmQpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9TVEFSVFwiLCBzdGFydFN0cik7XHJcblx0XHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX0VORFwiLCBlbmRTdHIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIOS/neWtmCBDQUxFTkRBUl9JTkZPXHJcblx0XHR0aGlzLl91cGRhdGUoKTtcclxuXHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX0lORk9cIiwgdGhpcy5fc3RyaW5naWZ5SW5mbyh0aGlzLl9JbmZvKSk7XHJcblx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9FWFRSQUlORk9cIiwgdGhpcy5fc3RyaW5naWZ5SW5mbyh0aGlzLl9FeHRyYUluZm8pKTtcclxuXHR9O1xyXG5cclxuXHQvLyDorr7nva7mlofmoaPlsZ7mgKflgLxcclxuXHRfc2V0UGFyYW1WYWx1ZShkb2MsIGtleSwgdmFsdWUpIHtcclxuXHRcdGlmICghZG9jKSByZXR1cm4gZmFsc2U7XHJcblx0XHRkb2MuU2V0UGFyYW1WYWx1ZShrZXksIHZhbHVlKTtcclxuXHR9O1xyXG5cclxuXHRfY3JlYXRlV2l6RXZlbnREb2MoKSB7XHJcblx0XHQvL1RPRE86IOS/neWtmOWFqOmDqOaVsOaNruWMheaLrFRpdGxlXHJcblx0XHQvLyDliJvlu7pXaXpEb2NcclxuXHRcdGNvbnN0IGxvY2F0aW9uID0gYE15IEV2ZW50cy8keyBtb21lbnQodGhpcy5zdGFydCkuZm9ybWF0KCdZWVlZLU1NJykgfS9gO1xyXG5cdFx0Y29uc3Qgb2JqRm9sZGVyID0gZ19kYi5HZXRGb2xkZXJCeUxvY2F0aW9uKGxvY2F0aW9uLCB0cnVlKTtcclxuXHRcdGNvbnN0IHRlbXBIdG1sID0gZ19jbW4uR2V0QVRlbXBGaWxlTmFtZSgnLmh0bWwnKTtcclxuXHRcdGNvbnN0IGh0bWxUZXh0ID0gdGhpcy5fZ2V0RXZlbnRIdG1sKHRoaXMudGl0bGUsICcnKTtcclxuXHRcdGdfY21uLlNhdmVUZXh0VG9GaWxlKHRlbXBIdG1sLCBodG1sVGV4dCwgJ3VuaWNvZGUnKTtcclxuXHRcdGNvbnN0IGRvYyA9IG9iakZvbGRlci5DcmVhdGVEb2N1bWVudDIodGhpcy50aXRsZSwgXCJcIik7XHJcblx0XHRkb2MuQ2hhbmdlVGl0bGVBbmRGaWxlTmFtZSh0aGlzLnRpdGxlKTtcclxuXHRcdGRvYy5VcGRhdGVEb2N1bWVudDYodGVtcEh0bWwsIHRlbXBIdG1sLCAweDIyKTtcclxuXHRcdC8vIOiuvue9ruagh+etvlxyXG5cdFx0Ly9pZiAoIHRhZ3MgKSBkb2MuU2V0VGFnc1RleHQyKHRhZ3MsIFwiQ2FsZW5kYXJcIik7XHJcblx0XHQvLyDlsIbkv6Hmga/nvJbnoIHliLBXaXpEb2PlsZ7mgKfkuK3ljrtcclxuXHRcdGNvbnN0IG5ld0V2ZW50ID0gdGhpcy50b1dpekV2ZW50RGF0YSgpO1xyXG5cdFx0ZG9jLkFkZFRvQ2FsZW5kYXIobmV3RXZlbnQuQ0FMRU5EQVJfU1RBUlQsIG5ld0V2ZW50LkNBTEVOREFSX0VORCwgbmV3RXZlbnQuQ0FMRU5EQVJfSU5GTyk7XHJcblx0XHQvLyBjaGFuZ2UgZGF0YWJhc2VcclxuXHRcdGRvYy50eXBlID0gXCJldmVudFwiO1xyXG5cdFx0Ly9cclxuXHRcdHRoaXMuaWQgPSBkb2MuR1VJRDtcclxuXHR9XHJcblxyXG5cdHNhdmVUb1dpekV2ZW50RG9jKCBwcm9wID0gJ2FsbCcgKSB7XHJcblx0XHRpZiAoIWdfZGIgfHwgIWdfY21uKSB0aHJvdyBuZXcgRXJyb3IoJ0lXaXpEYXRhYmFzZSBvciBJV2l6Q29tbW9uVUkgaXMgbm90IHZhbGlkLicpO1xyXG5cdFx0Ly/mo4Dmn6XmlofmoaPmmK/lkKblrZjlnKhcclxuXHRcdGNvbnN0IGd1aWRSZWdleCA9IC9eWzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtNV1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn0kL2k7XHJcblx0XHRjb25zdCBpc1dpekRvY0V4aXN0ID0gZ3VpZFJlZ2V4LnRlc3QodGhpcy5pZCk7XHJcblx0XHQvLyDliJvlu7rmiJbogIXmm7TmlrDmlofmoaNcclxuXHRcdGlmICggaXNXaXpEb2NFeGlzdCApIHtcclxuXHRcdFx0Ly8g5qC55o2u5oyH5Luk5pu05paw5YaF5a65XHJcblx0XHRcdHRoaXMuX3NhdmVBbGxQcm9wKCk7XHJcblx0XHRcdC8vIOabtOaWsEZ1bGxDYWxlbmRhclxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Ly8g5Yib5bu65paw55qE5LqL5Lu25paH5qGjXHJcblx0XHRcdHRoaXMuX2NyZWF0ZVdpekV2ZW50RG9jKCk7XHJcblx0XHR9XHJcblx0XHRcclxuXHR9O1xyXG5cclxuXHRkZWxldGVFdmVudERhdGEoIGlzRGVsZXRlRG9jID0gZmFsc2UgKXtcclxuXHRcdGxldCBkb2MgPSBnX2RiLkRvY3VtZW50RnJvbUdVSUQodGhpcy5pZCk7XHJcblx0XHRpZiAoIWRvYykgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGZpbmQgRXZlbnQgcmVsYXRlZCBXaXpEb2N1bWVudC4nKVxyXG5cdFx0Ly8g56e76ZmkRnVsbENhbGVuZGFy5LqL5Lu2XHJcblx0XHR0aGlzLiRjYWxlbmRhci5mdWxsQ2FsZW5kYXIoJ3JlbW92ZUV2ZW50cycsIHRoaXMuaWQpO1xyXG5cdFx0Ly8g56e76Zmk5pel5Y6G5pWw5o2uXHJcblx0XHRkb2MuUmVtb3ZlRnJvbUNhbGVuZGFyKCk7XHJcblx0XHQvLyDliKDpmaTmlofmoaNcclxuXHRcdGlmICggaXNEZWxldGVEb2MgKSBkb2MuRGVsZXRlKCk7XHJcblx0fVxyXG5cclxuXHRyZWZldGNoRGF0YSgpIHtcclxuXHRcdC8vVE9ETzog6YeN5pWw5o2u5bqT6YeN5paw6I635Y+W5pWw5o2u5pu05paw5a6e5L6LXHJcblx0fTtcclxuXHJcblx0cmVmcmVzaEV2ZW50KGV2ZW50KSB7XHJcblx0XHQvL1RPRE86IOW6lOivpeiHquWKqOmBjeWOhuW5tuS/ruaUueWxnuaAp1xyXG5cdFx0aWYgKCBldmVudCApIHtcclxuXHRcdFx0Ly8g6YeN5paw5riy5p+TRnVsbENhbGVuZGFy5LqL5Lu2XHJcblx0XHRcdGV2ZW50LnRpdGxlID0gdGhpcy50aXRsZTtcclxuXHRcdFx0ZXZlbnQuYmFja2dyb3VuZENvbG9yID0gdGhpcy5iYWNrZ3JvdW5kQ29sb3I7XHJcblx0XHRcdHRoaXMuJGNhbGVuZGFyLmZ1bGxDYWxlbmRhcigndXBkYXRlRXZlbnQnLCBldmVudCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQvL+eUqC5mdWxsQ2FsZW5kYXIoIOKAmGNsaWVudEV2ZW50c+KAmSBbLCBpZE9yRmlsdGVyIF0gKSAtPiBBcnJheSDojrflj5bmupDmlbDmja7ku47ogIzmm7TmlrBcclxuXHRcdFx0Ly9UT0RPOiDpgY3ljoblubblr7vmib5HVUlE5Yy56YWN55qE5LqL5Lu2XHJcblx0XHR9XHJcblx0fVxyXG5cclxufSIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XHJcbmltcG9ydCBXaXpFdmVudERhdGFMb2FkZXIgZnJvbSAnLi9XaXpFdmVudERhdGFMb2FkZXInO1xyXG5pbXBvcnQgQ2FsZW5kYXJFdmVudCBmcm9tICcuL0NhbGVuZGFyRXZlbnQnO1xyXG5pbXBvcnQgeyBXaXpDb25maXJtLCBXaXpDb21tb25VSSBhcyBvYmpDb21tb24sIFdpekRhdGFiYXNlIGFzIG9iakRhdGFiYXNlLCBXaXpFeHBsb3JlcldpbmRvdyBhcyBvYmpXaW5kb3cgfSBmcm9tICcuLi91dGlscy9XaXpJbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybUhhbmRsZXMge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy4kY2FsZW5kYXIgPSAkKCcjY2FsZW5kYXInKVxyXG4gICAgfTtcclxuXHJcbiAgICBvbkNyZWF0ZUJ0bkNsaWNrKHN0YXJ0LCBlbmQsIGpzRXZlbnQsIHZpZXcsIGZvcm1Ob2RlKSB7XHJcbiAgICAgICAgY29uc3QgdGl0bGUgPSAkKGZvcm1Ob2RlKS5maW5kKCcjdGMtY3JlYXRlcGFnZS1ldmVudHRpdGxlJykudmFsKCk7XHJcbiAgICAgICAgY29uc3QgY29sb3IgPSAkKGZvcm1Ob2RlKS5maW5kKCcjdGMtY3JlYXRlcGFnZS1ldmVudGNvbG9yJykudmFsKCk7XHJcbiAgICAgICAgbmV3IFdpekV2ZW50RGF0YUxvYWRlcigpLmNyZWF0ZUV2ZW50KHtzdGFydCwgZW5kLCBqc0V2ZW50LCB2aWV3fSwge3RpdGxlLCBjb2xvcn0pOyAvLyDov5nkuIDmraXogJfml7ZcclxuICAgICAgICAkKGZvcm1Ob2RlKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICQoJyNjYWxlbmRhcicpLmZ1bGxDYWxlbmRhcigndW5zZWxlY3QnKTtcclxuICAgIH07XHJcblxyXG4gICAgb25TYXZlQnRuQ2xpY2soZXZlbnQsIG5ld0V2ZW50RGF0YSkge1xyXG4gICAgICAgIGZvciAoY29uc3QgcHJvcCBpbiBuZXdFdmVudERhdGEpIHtcclxuICAgICAgICAgICAgZXZlbnRbcHJvcF0gPSBuZXdFdmVudERhdGFbcHJvcF1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g6YeN5paw5riy5p+TXHJcbiAgICAgICAgdGhpcy4kY2FsZW5kYXIuZnVsbENhbGVuZGFyKCAndXBkYXRlRXZlbnQnLCBldmVudCApO1xyXG4gICAgICAgIC8vIOS/ruaUuea6kOaVsOaNrlxyXG4gICAgICAgIGNvbnN0IG5ld0V2ZW50ID0gbmV3IENhbGVuZGFyRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgIG5ld0V2ZW50LnNhdmVUb1dpekV2ZW50RG9jKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIG9uQ29tcGxldGVCdG5DbGljayhldmVudCkge1xyXG4gICAgICAgIC8vIOS/ruaUueaVsOaNrlxyXG4gICAgICAgIGNvbnN0IGlzQ29tcGxldGUgPSBwYXJzZUludChldmVudC5jb21wbGV0ZSkgPT0gNTtcclxuICAgICAgICBpZiAoIGlzQ29tcGxldGUgKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LmNvbXBsZXRlID0gJzAnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGV2ZW50LmNvbXBsZXRlID0gJzUnO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDkv53lrZjmlbDmja5cclxuICAgICAgICBjb25zdCBuZXdFdmVudCA9IG5ldyBDYWxlbmRhckV2ZW50KGV2ZW50KTtcclxuICAgICAgICBuZXdFdmVudC5zYXZlVG9XaXpFdmVudERvYygpO1xyXG4gICAgICAgIC8vIOmHjeaWsOa4suafk1xyXG4gICAgICAgIHRoaXMuJGNhbGVuZGFyLmZ1bGxDYWxlbmRhciggJ3VwZGF0ZUV2ZW50JywgZXZlbnQgKTtcclxuICAgIH07XHJcblxyXG4gICAgb25EZWxldGVEYXRhQnRuQ2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoIFdpekNvbmZpcm0oXCLnoa7lrpropoHliKDpmaTor6Xml6XnqIvvvJ9cIiwgJ+eVquiMhOWKqeeQhicpICkge1xyXG4gICAgICAgICAgICAvLyDliKDpmaTml6XnqItcclxuICAgICAgICAgICAgbGV0IG5ld0V2ZW50ID0gbmV3IENhbGVuZGFyRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgICAgICBuZXdFdmVudC5kZWxldGVFdmVudERhdGEoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgb25EZWxldGVEb2NCdG5DbGljayhldmVudCkge1xyXG4gICAgICAgIGlmICggV2l6Q29uZmlybShcIuehruWumuimgeWIoOmZpOivpeaXpeeoi+a6kOaWh+aho++8n1xcbuOAjOehruWumuOAjeWwhuS8muWvvOiHtOebuOWFs+eslOiusOiiq+WIoOmZpO+8gVwiLCAn55Wq6IyE5Yqp55CGJykgKSB7XHJcbiAgICAgICAgICAgIGxldCBuZXdFdmVudCA9IG5ldyBDYWxlbmRhckV2ZW50KGV2ZW50KTtcclxuICAgICAgICAgICAgbmV3RXZlbnQuZGVsZXRlRXZlbnREYXRhKHRydWUpO1xyXG4gICAgICAgIH1cdFxyXG4gICAgfTtcclxuXHJcbiAgICBvbkVkaXRPcmlnaW5CdG5DbGljayhldmVudCkge1xyXG4gICAgICAgIGNvbnN0IGRvYyA9IG9iakRhdGFiYXNlLkRvY3VtZW50RnJvbUdVSUQoZXZlbnQuaWQpO1xyXG4gICAgICAgIG9iakNvbW1vbi5FZGl0Q2FsZW5kYXJFdmVudChkb2MpO1xyXG4gICAgfTtcclxuXHJcbiAgICBvbk9wZW5Eb2NCdG5DbGljayhldmVudCkge1xyXG4gICAgICAgIGNvbnN0IGRvYyA9IG9iakRhdGFiYXNlLkRvY3VtZW50RnJvbUdVSUQoZXZlbnQuaWQpO1xyXG4gICAgICAgIG9ialdpbmRvdy5WaWV3RG9jdW1lbnQoZG9jLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBXaXpEYXRhYmFzZSBhcyBvYmpEYXRhYmFzZSB9IGZyb20gJy4uL3V0aWxzL1dpekludGVyZmFjZSc7XHJcbmltcG9ydCBDYWxlbmRhckV2ZW50IGZyb20gJy4vQ2FsZW5kYXJFdmVudCc7XHJcblxyXG4vKiDmlbDmja7ojrflj5ZcclxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG4vKiog6K+l57G75LiOV2l6bm90ZeeahFdpekRhdGFiYXNl5o6l5Y+j5Lqk5o2i5L+h5oGv77yM6I635Y+W5pWw5o2uICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdpekV2ZW50RGF0YUxvYWRlciB7XHJcblx0LyoqXHJcbiAgICAgKiDliJvpgKDkuIDkuKrkuovku7bmlbDmja7liqDovb3lmaguXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHN0YXJ0IOafpeivoui1t+Wni+aXpeacn++8jElTT+agh+WHhuaXpeacn+Wtl+espuS4si5cclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZW5kIOafpeivouaIquiHs+aXpeacn++8jElTT+agh+WHhuaXpeacn+Wtl+espuS4si5cclxuICAgICAqL1xyXG5cdGNvbnN0cnVjdG9yKGNhbGVuZGFyKSB7XHJcblx0XHRpZiAoIW9iakRhdGFiYXNlKSB0aHJvdyBuZXcgRXJyb3IoJ1dpekRhdGFiYXNlIG5vdCB2YWxpZCAhJyk7XHJcblx0XHR0aGlzLkRhdGFiYXNlID0gb2JqRGF0YWJhc2U7XHJcblx0XHR0aGlzLnVzZXJOYW1lID0gb2JqRGF0YWJhc2UuVXNlck5hbWU7XHJcblx0XHR0aGlzLiRjYWxlbmRhciA9ICQoY2FsZW5kYXIpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG4gICAgICog6I635b6X5riy5p+T5ZCO55qE5omA5pyJRnVsbENhbGVuZGFy5LqL5Lu2LlxyXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSB2aWV3IGlzIHRoZSBWaWV3IE9iamVjdCBvZiBGdWxsQ2FsZW5kYXIgZm9yIHRoZSBuZXcgdmlldy5cclxuXHQgKiBAcGFyYW0ge29iamVjdH0gZWxlbWVudCBpcyBhIGpRdWVyeSBlbGVtZW50IGZvciB0aGUgY29udGFpbmVyIG9mIHRoZSBuZXcgdmlldy5cclxuICAgICAqIEByZXR1cm4ge09iamVjdFtdfSDov5Tlm57nlKjkuo5GdWxsQ2FsZW5kYXIg5riy5p+T55qEIGV2ZW50U291cmNlcyDmlbDnu4QuXHJcbiAgICAgKi9cclxuXHRnZXRFdmVudFNvdXJjZXMoIHZpZXcsIGVsZW1lbnQgKXtcclxuXHRcdGNvbnN0IHZpZXdTdGFydCA9IHZpZXcuc3RhcnQuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRjb25zdCB2aWV3RW5kID0gdmlldy5lbmQuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRsZXQgZXZlbnRTb3VyY2VzID0gW107XHJcblx0XHQvL+iOt+WPluaZrumAmuaXpeeoi1xyXG5cdFx0Y29uc3QgZ2VuZXJhbEV2ZW50U291cmNlID0ge1xyXG5cdFx0XHR0eXBlOiAnZ2VuZXJhbEV2ZW50cycsXHJcblx0XHRcdC8vZXZlbnRzOiB0aGlzLl9nZXRBbGxPcmlnaW5hbEV2ZW50KFtdLCB0aGlzLl9kMnMoY3VycmVudFZpZXcuc3RhcnQudG9EYXRlKCkpLCB0aGlzLl9kMnMoY3VycmVudFZpZXcuZW5kLnRvRGF0ZSgpKSlcclxuXHRcdFx0ZXZlbnRzOiB0aGlzLl9nZXRBbGxPcmlnaW5hbEV2ZW50KHZpZXdTdGFydCwgdmlld0VuZClcclxuXHRcdH1cclxuXHRcdGV2ZW50U291cmNlcy5wdXNoKGdlbmVyYWxFdmVudFNvdXJjZSk7XHJcblx0XHRcclxuXHRcdC8vVE9ETzog6I635Y+W6YeN5aSN5pel56iLXHJcblx0XHRjb25zdCByZXBlYXRFdmVudFNvdXJjZXMgPSB0aGlzLl9nZXRBbGxSZXBlYXRFdmVudCh2aWV3U3RhcnQsIHZpZXdFbmQpO1xyXG5cdFx0ZXZlbnRTb3VyY2VzID0gZXZlbnRTb3VyY2VzLmNvbmNhdChyZXBlYXRFdmVudFNvdXJjZXMpO1xyXG5cdFx0Ly9cclxuXHRcdHJldHVybiBldmVudFNvdXJjZXM7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcbiAgICAgKiDku45XaXpEYXRhYmFzZeS4reiOt+WPluaJgOacieaVsOaNruaWh+ahoy5cclxuXHQgKiBAcGFyYW0ge2FycmF5fSBldmVudHMg5Yid5aeL5LqL5Lu25pWw57uELlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBzdGFydCBJU0/moIflh4bml6XmnJ/lrZfnrKbkuLIuXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGVuZCBJU0/moIflh4bml6XmnJ/lrZfnrKbkuLIuXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3RbXX0g6L+U5Zue55So5LqORnVsbENhbGVuZGFy5riy5p+T55qE5LqL5Lu25pWw57uELlxyXG4gICAgICovXHJcblx0X2dldEFsbE9yaWdpbmFsRXZlbnQoc3RhcnQsIGVuZCl7XHJcblx0XHRjb25zdCBldmVudHMgPSBbXTtcclxuXHRcdGxldCBzcWwgPSBgRE9DVU1FTlRfTE9DQVRJT04gbm90IGxpa2UgJy9EZWxldGVkIEl0ZW1zLyUnIGFuZCAoS0JfR1VJRCBpcyBudWxsIG9yIEtCX0dVSUQgPSAnJylgO1xyXG5cdFx0bGV0IGFuZDEgPSBgIGFuZCBET0NVTUVOVF9HVUlEIGluIChzZWxlY3QgRE9DVU1FTlRfR1VJRCBmcm9tIFdJWl9ET0NVTUVOVF9QQVJBTSB3aGVyZSBQQVJBTV9OQU1FID0gJ0NBTEVOREFSX1NUQVJUJyAgYW5kICBQQVJBTV9WQUxVRSA8PSAnJHtlbmR9JyApYDtcclxuXHRcdGxldCBhbmQyID0gYCBhbmQgRE9DVU1FTlRfR1VJRCBpbiAoc2VsZWN0IERPQ1VNRU5UX0dVSUQgZnJvbSBXSVpfRE9DVU1FTlRfUEFSQU0gd2hlcmUgUEFSQU1fTkFNRSA9ICdDQUxFTkRBUl9FTkQnICBhbmQgIFBBUkFNX1ZBTFVFID49ICcke3N0YXJ0fScgKWA7XHJcblx0XHRpZiAoc3RhcnQpIHNxbCArPSBhbmQyO1xyXG5cdFx0aWYgKGVuZCkgc3FsICs9IGFuZDE7XHJcblx0XHRpZiAob2JqRGF0YWJhc2UuRG9jdW1lbnRzRGF0YUZyb21TUUwpIHtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRjb25zdCBkYXRhID0gb2JqRGF0YWJhc2UuRG9jdW1lbnRzRGF0YUZyb21TUUwoc3FsKTtcclxuXHRcdFx0XHRpZiAoICFkYXRhICkgcmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdGNvbnN0IG9iaiA9IEpTT04ucGFyc2UoZGF0YSk7XHJcblx0XHRcdFx0aWYgKCAhb2JqIHx8ICFBcnJheS5pc0FycmF5KG9iaikgKSByZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpICsrKSB7XHJcblx0XHRcdFx0XHRldmVudHMucHVzaChcclxuXHRcdFx0XHRcdFx0bmV3IENhbGVuZGFyRXZlbnQob2JqW2ldLCB0aGlzLiRjYWxlbmRhcikudG9GdWxsQ2FsZW5kYXJFdmVudCgpXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRcclxuXHRcdFx0XHRyZXR1cm4gZXZlbnRzO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNhdGNoKGVycikge1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0RvY3VtZW50c0RhdGFGcm9tU1FMIG1ldGhvZCBvZiBXaXpEYXRhYmFzZSBub3QgZXhpc3QhJyk7XHJcblx0XHRcdC8qXHJcblx0XHRcdGxldCBkb2NDb2xsZXRpb24gPSBvYmpEYXRhYmFzZS5Eb2N1bWVudHNGcm9tU1FMKHNxbCk7XHJcblx0XHRcdC8vXHJcblx0XHRcdGlmIChkb2NDb2xsZXRpb24gJiYgZG9jQ29sbGV0aW9uLkNvdW50KXtcclxuXHRcdFx0XHRsZXQgZG9jO1xyXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZG9jQ29sbGV0aW9uLkNvdW50OyArKyBpKXtcclxuXHRcdFx0XHRcdGRvYyA9IGRvY0NvbGxldGlvbi5JdGVtKGkpO1xyXG5cdFx0XHRcdFx0bGV0IGV2ZW50T2JqID0gX2V2ZW50T2JqZWN0KF9uZXdQc2V1ZG9Eb2MoZG9jKSk7XHJcblx0XHRcdFx0XHRpZiAoZXZlbnRPYmopXHJcblx0XHRcdFx0XHRcdGV2ZW50cy5wdXNoKGV2ZW50T2JqKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIGV2ZW50cztcclxuXHRcdFx0fVxyXG5cdFx0XHQqL1x0XHRcclxuXHRcdH1cclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcbiAgICAgKiDku45XaXpEYXRhYmFzZeS4reiOt+WPluaJgOacieW+queOr+mHjeWkjeS6i+S7ti5cclxuXHQgKiDku47liJvlu7rkuovku7bnmoTml6XmnJ/lvIDlp4vliLBFTkRSRUNVUlJFTkNF57uT5p2fXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3RbXX0g6L+U5Zue55So5LqORnVsbENhbGVuZGFy5riy5p+T55qEIGV2ZW50U291cmNlIOaVsOe7hC5cclxuICAgICAqL1xyXG5cdF9nZXRBbGxSZXBlYXRFdmVudChzdGFydCwgZW5kKXtcclxuXHRcdGNvbnN0IHJlcGVhdEV2ZW50cyA9IFtdO1xyXG5cdFx0Y29uc3Qgc3FsID0gXCJET0NVTUVOVF9MT0NBVElPTiBub3QgbGlrZSAnL0RlbGV0ZWQgSXRlbXMvJScgYW5kIChLQl9HVUlEIGlzIG51bGwgb3IgS0JfR1VJRCA9ICcnKSBhbmQgXCIgKyBcclxuXHRcdFx0XHRcdFwiRE9DVU1FTlRfR1VJRCBpbiAoc2VsZWN0IERPQ1VNRU5UX0dVSUQgZnJvbSBXSVpfRE9DVU1FTlRfUEFSQU0gd2hlcmUgUEFSQU1fTkFNRT0nQ0FMRU5EQVJfUkVDVVJSRU5DRScpXCI7XHJcblxyXG5cdFx0Y29uc3QgZGF0YSA9IG9iakRhdGFiYXNlLkRvY3VtZW50c0RhdGFGcm9tU1FMKHNxbCk7XHJcblx0XHRjb25zb2xlLmxvZyhkYXRhKVxyXG5cdFx0aWYgKCAhZGF0YSApIHJldHVybiBmYWxzZTtcclxuXHRcdFxyXG5cdFx0Y29uc3Qgb2JqID0gSlNPTi5wYXJzZShkYXRhKTtcclxuXHRcdGlmICggIW9iaiB8fCAhQXJyYXkuaXNBcnJheShvYmopICkgcmV0dXJuIGZhbHNlO1xyXG5cdFx0XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkgKyspIHtcclxuXHRcdFx0cmVwZWF0RXZlbnRzLnB1c2goXHJcblx0XHRcdFx0bmV3IENhbGVuZGFyRXZlbnQob2JqW2ldLCB0aGlzLiRjYWxlbmRhcikuZ2VuZXJhdGVSZXBlYXRFdmVudHMoc3RhcnQsIGVuZClcclxuXHRcdFx0KVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlcGVhdEV2ZW50cztcclxuXHRcdFxyXG5cdH07XHJcblxyXG5cdC8vIOaXpeWOhuS6i+S7tuaLluWKqOWQjuabtOaWsOaVsOaNrlxyXG5cdHVwZGF0ZUV2ZW50RGF0YU9uRHJvcChldmVudCwgZGVsdGEsIHJldmVydEZ1bmMsIGpzRXZlbnQsIHVpLCB2aWV3KXtcclxuXHRcdC8vIENhbGwgaGFzVGltZSBvbiB0aGUgZXZlbnTigJlzIHN0YXJ0L2VuZCB0byBzZWUgaWYgaXQgaGFzIGJlZW4gZHJvcHBlZCBpbiBhIHRpbWVkIG9yIGFsbC1kYXkgYXJlYS5cclxuXHRcdGNvbnN0IGFsbERheSA9ICFldmVudC5zdGFydC5oYXNUaW1lKCk7XHJcblx0XHQvLyDojrflj5bkuovku7bmlofmoaPml7bpl7TmlbDmja5cclxuXHRcdGNvbnN0IGRvYyA9IG9iakRhdGFiYXNlLkRvY3VtZW50RnJvbUdVSUQoZXZlbnQuaWQpO1xyXG5cdFx0Ly8g5pu05paw5pWw5o2uXHJcblx0XHRpZiAoIGFsbERheSApIHtcclxuXHRcdFx0Y29uc3Qgc3RhcnRTdHIgPSBldmVudC5zdGFydC5zZXQoeydoJzogMCwgJ20nOiAwLCAncyc6IDB9KS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0Y29uc3QgZW5kU3RyID0gZXZlbnQuZW5kLnNldCh7J2gnOiAyMywgJ20nOiA1OSwgJ3MnOiA1OX0pLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9TVEFSVFwiLCBzdGFydFN0cik7XHJcblx0XHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX0VORFwiLCBlbmRTdHIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc3Qgc3RhcnRTdHIgPSBldmVudC5zdGFydC5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0Y29uc3QgZW5kU3RyID0gZXZlbnQuZW5kLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9TVEFSVFwiLCBzdGFydFN0cik7XHJcblx0XHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX0VORFwiLCBlbmRTdHIpO1xyXG5cdFx0fVxyXG5cdFx0Ly9UT0RPOiDmm7TmlrBDQUxFTkRBUl9SRUNVUlJFTkNF5pWw5o2uXHJcblx0XHQvLyBcclxuXHRcdHRoaXMuX3VwZGF0ZURvY01vZGlmeURhdGUoZG9jKTtcclxuXHR9O1xyXG5cclxuXHQvLyDorr7nva7mlofmoaPlsZ7mgKflgLxcclxuXHRfc2V0UGFyYW1WYWx1ZShkb2MsIGtleSwgdmFsdWUpIHtcclxuXHRcdGlmICghZG9jKSByZXR1cm4gZmFsc2U7XHJcblx0XHRkb2MuU2V0UGFyYW1WYWx1ZShrZXksIHZhbHVlKTtcclxuXHR9O1xyXG5cclxuXHQvLyDmm7TmlrBXaXpEb2Pkv67mlLnml7bpl7RcclxuXHRfdXBkYXRlRG9jTW9kaWZ5RGF0ZShkb2Mpe1xyXG5cdFx0Y29uc3Qgbm93ID0gbmV3IERhdGUoKTtcclxuXHRcdGlmICghZG9jKSByZXR1cm4gZmFsc2U7XHJcblx0XHRub3cuc2V0U2Vjb25kcygobm93LmdldFNlY29uZHMoKSArIDEpICUgNjApO1xyXG5cdFx0ZG9jLkRhdGVNb2RpZmllZCA9IHRoaXMuX2Qycyhub3cpO1xyXG5cdH07XHJcblxyXG5cdC8vIOWwhuaXpeacn+Wvueixoei9rOWMluS4uuWtl+espuS4slxyXG5cdC8vVE9ETzog6ICD6JmR5L6d6LWWbW9tZW505p2l566A5YyW6L2s5o2i6L+H56iLXHJcblx0X2QycyhkdCl7XHJcblx0XHRjb25zdCByZXQgPSBkdC5nZXRGdWxsWWVhcigpICsgXCItXCIgKyBcclxuXHRcdFx0XHRcdGZvcm1hdEludFRvRGF0ZVN0cmluZyhkdC5nZXRNb250aCgpICsgMSkgKyBcIi1cIiArIFxyXG5cdFx0XHRcdFx0Zm9ybWF0SW50VG9EYXRlU3RyaW5nKGR0LmdldERhdGUoKSkgKyBcIiBcIiArIFxyXG5cdFx0XHRcdFx0Zm9ybWF0SW50VG9EYXRlU3RyaW5nKGR0LmdldEhvdXJzKCkpKyBcIjpcIiArIFxyXG5cdFx0XHRcdFx0Zm9ybWF0SW50VG9EYXRlU3RyaW5nKGR0LmdldE1pbnV0ZXMoKSkgKyBcIjpcIiArIFxyXG5cdFx0XHRcdFx0Zm9ybWF0SW50VG9EYXRlU3RyaW5nKGR0LmdldFNlY29uZHMoKSk7XHJcblx0XHRyZXR1cm4gcmV0O1xyXG5cdH07XHJcblxyXG5cdC8vIOaXpeWOhuaXtumXtOmHjee9ruaXtumXtOiMg+WbtOWQjuabtOaWsOaVsOaNrlxyXG5cdHVwZGF0ZUV2ZW50RGF0YU9uUmVzaXplKGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXcpe1xyXG5cdFx0Y29uc3QgYWxsRGF5ID0gZXZlbnQuc3RhcnQuaGFzVGltZSgpID8gZmFsc2UgOiB0cnVlO1xyXG5cdFx0Ly8g6I635b6X5LqL5Lu25paH5qGj5pe26Ze05pWw5o2uXHJcblx0XHRjb25zdCBkb2MgPSBvYmpEYXRhYmFzZS5Eb2N1bWVudEZyb21HVUlEKGV2ZW50LmlkKTtcclxuXHRcdC8vIOiuoeeul+abtOaUueWQjueahOe7k+adn+aXtumXtFxyXG5cdFx0Y29uc3QgZXZlbnRFbmRTdHIgPSBldmVudC5lbmQuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHQvLyDmm7TmlrDmlofmoaPmlbDmja5cclxuXHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX0VORFwiLCBldmVudEVuZFN0cik7XHJcblx0XHR0aGlzLl91cGRhdGVEb2NNb2RpZnlEYXRlKGRvYyk7XHJcblx0fTtcclxuXHJcblx0Ly8g5Yib5bu65LqL5Lu2IHN0YXJ0LCBlbmQsIGpzRXZlbnQsIHZpZXdcclxuXHQvKipcclxuICAgICAqIOWIm+W7uuS6i+S7ti5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gc2VsZWN0aW9uRGF0YSBGdWxsQ2FsZW5kYXIg5Lyg5YWl55qE5pWw5o2uLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBzZWxlY3Rpb25EYXRhLnN0YXJ0IE1vbWVudCDnsbvml6XmnJ/lr7nosaEuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IHNlbGVjdGlvbkRhdGEuZW5kIE1vbWVudCDnsbvml6XmnJ/lr7nosaEuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IHNlbGVjdGlvbkRhdGEuanNFdmVudCBuYXRpdmUgSmF2YVNjcmlwdCDkuovku7YuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IHNlbGVjdGlvbkRhdGEudmlldyBGdWxsQ2FsZW5kYXIg6KeG5Zu+5a+56LGhLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSB1c2VySW5wdXRzIOeUqOaIt+S8oOWFpeeahOWFtuS7luS/oeaBry5cclxuICAgICAqIFRPRE86IOivpeaWueazleWPr+S7peaUvue9ruWIsENhbGVuZGFyRXZlbnTnmoTpnZnmgIHmlrnms5XkuIpcclxuICAgICAqL1xyXG5cdGNyZWF0ZUV2ZW50KHNlbGVjdGlvbkRhdGEsIHVzZXJJbnB1dHMpe1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Ly8g6I635Y+W55So5oi36K6+572uXHJcblx0XHRcdGNvbnN0IG5ld0V2ZW50ID0gbmV3IENhbGVuZGFyRXZlbnQoe1xyXG5cdFx0XHRcdHRpdGxlOiB1c2VySW5wdXRzLnRpdGxlID8gdXNlcklucHV0cy50aXRsZSA6ICfml6DmoIfpopgnLFxyXG5cdFx0XHRcdHN0YXJ0OiBzZWxlY3Rpb25EYXRhLnN0YXJ0LFxyXG5cdFx0XHRcdGVuZDogc2VsZWN0aW9uRGF0YS5lbmQsXHJcblx0XHRcdFx0YWxsRGF5OiBzZWxlY3Rpb25EYXRhLnN0YXJ0Lmhhc1RpbWUoKSAmJiBzZWxlY3Rpb25EYXRhLmVuZC5oYXNUaW1lKCkgPyBmYWxzZSA6IHRydWUsXHJcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiB1c2VySW5wdXRzLmNvbG9yID8gdXNlcklucHV0cy5jb2xvciA6ICcjMzJDRDMyJyxcclxuXHRcdFx0fSwgdGhpcy4kY2FsZW5kYXIpO1xyXG5cdFx0XHQvLyDkv53lrZjlubbmuLLmn5Pkuovku7ZcclxuXHRcdFx0bmV3RXZlbnQuc2F2ZVRvV2l6RXZlbnREb2MoKTtcclxuXHRcdFx0bmV3RXZlbnQucmVmZXRjaERhdGEoKTtcclxuXHRcdFx0bmV3RXZlbnQuYWRkVG9GdWxsQ2FsZW5kYXIoKTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtjb25zb2xlLmxvZyhlKX1cclxuXHR9XHJcblxyXG59XHJcblxyXG5cclxuLy8gVE9ETzog6YeN5YaZ6I635Y+W5pWw5o2u55qE5pa55byPXHJcbmZ1bmN0aW9uIF9nZXRXaXpFdmVudChzdGFydCwgZW5kKSB7XHJcblx0Ly9UT0RPOlxyXG5cdGxldCBldmVudHMgPSBbXTtcclxuXHRsZXQgRXZlbnRDb2xsZWN0aW9uID0gb2JqRGF0YWJhc2UuR2V0Q2FsZW5kYXJFdmVudHMyKHN0YXJ0LCBlbmQpO1xyXG5cdHJldHVybiBldmVudHNcclxufVxyXG5cclxuLy8g6I635b6X5riy5p+T5ZCO55qE6YeN5aSN5pel5pyfXHJcbmZ1bmN0aW9uIGdldFJlbmRlclJlcGVhdERheSgpe1xyXG5cdHZhciBkYXlBcnJheSA9IG5ldyBBcnJheSgpO1xyXG5cdHZhciBldmVudFN0YXJ0ID0gbmV3IERhdGUoX3MyZChnX2V2ZW50U3RhcnQpKTtcclxuXHRcdFxyXG5cdHN3aXRjaCAoZ19yZXBlYXRSdWxlKXtcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazFcIjpcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazJcIjpcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazNcIjpcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazRcIjpcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazVcIjpcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazZcIjpcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazdcIjpcclxuXHRcdFx0XHRnZXRXZWVrbHlSZXBlYXREYXkoZGF5QXJyYXksIFtnX3JlcGVhdFJ1bGUuY2hhckF0KDkpXSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2Vla2RheVwiOlxyXG5cdFx0XHRcdGdldFdlZWtseVJlcGVhdERheShkYXlBcnJheSwgWzEsIDIsIDMsIDQsIDVdKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnlXZWVrZGF5MTM1XCI6XHJcblx0XHRcdFx0Z2V0V2Vla2x5UmVwZWF0RGF5KGRheUFycmF5LCBbMSwgMywgNV0pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnlXZWVrZGF5MjRcIjpcclxuXHRcdFx0XHRnZXRXZWVrbHlSZXBlYXREYXkoZGF5QXJyYXksIFsyLCA0XSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJFdmVyeVdlZWtkYXk2N1wiOlxyXG5cdFx0XHRcdGdldFdlZWtseVJlcGVhdERheShkYXlBcnJheSwgWzYsIDddKTtcclxuXHRcdFx0XHRicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkRhaWx5XCI6XHJcblx0XHRcdFx0Z2V0V2Vla2x5UmVwZWF0RGF5KGRheUFycmF5LCBbMSwgMiwgMywgNCwgNSwgNiwgN10pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiV2Vla2x5XCI6Ly8g5q+P5ZGoXHJcblx0XHRcdFx0Z2V0V2Vla2x5UmVwZWF0RGF5KGRheUFycmF5LCBbZXZlbnRTdGFydC5nZXREYXkoKV0pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnkyV2Vla3NcIjpcclxuXHRcdFx0XHRnZXRXZWVrbHlSZXBlYXREYXkoZGF5QXJyYXksIFtldmVudFN0YXJ0LmdldERheSgpXSk7XHJcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkYXlBcnJheS5sZW5ndGg7ICsrIGkpe1xyXG5cdFx0XHRcdFx0dmFyIGludGVyID0gX2ludGVyRGF5cyhfZDJzKGV2ZW50U3RhcnQpLCBfZDJzKGRheUFycmF5W2ldWzBdKSk7XHJcblx0XHRcdFx0XHRpZiAoKHBhcnNlRmxvYXQoKGludGVyLTEpLzcuMCkgJSAyKSAhPSAwICl7XHJcblx0XHRcdFx0XHRcdGRheUFycmF5LnNwbGljZShpLCAxKTtcclxuXHRcdFx0XHRcdFx0aSAtLTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJNb250aGx5XCI6XHJcblx0XHRcdFx0Z2V0TW9udGhseVJlcGVhdERheShkYXlBcnJheSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJZZWFybHlcIjpcclxuXHRcdFx0XHRnZXRZZWFybHlSZXBlYXREYXkoZGF5QXJyYXkpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHQvLyBUT0RPOiDmsYnlrZfpnIDopoHogIPomZFcclxuICAgICAgICAgICAgY2FzZSBcIkNoaW5lc2VNb250aGx5XCI6XHJcbiAgICAgICAgICAgICAgICBnZXRDaGluZXNlUmVwZWF0RGF5KGRheUFycmF5LCAn5pyIJyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJDaGluZXNlWWVhcmx5XCI6XHJcbiAgICAgICAgICAgICAgICBnZXRDaGluZXNlUmVwZWF0RGF5KGRheUFycmF5LCAn5Y6GJyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGRlZmF1bHQ6e1xyXG5cdFx0XHRcdGlmIChnX3JlcGVhdFJ1bGUuaW5kZXhPZihcIkV2ZXJ5V2Vla1wiKSA9PSAwKXtcclxuXHRcdFx0XHRcdHZhciBkYXlzID0gZ19yZXBlYXRSdWxlLnN1YnN0cihcIkV2ZXJ5V2Vla1wiLmxlbmd0aCkuc3BsaXQoJycpO1xyXG5cdFx0XHRcdFx0Z2V0V2Vla2x5UmVwZWF0RGF5KGRheUFycmF5LCBkYXlzKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcblx0cmV0dXJuIGRheUFycmF5O1xyXG59XHJcblxyXG5cclxuLyog5pWw5o2u6I635Y+WXHJcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuXHJcbi8qIOadgumhueWSjOW3peWFt1xyXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcbi8vIOWIpOaWreWGheaguFxyXG5mdW5jdGlvbiBpc0Nocm9tZSgpIHtcclxuXHRpZiAoZ19pc0Nocm9tZSkgcmV0dXJuIGdfaXNDaHJvbWU7XHJcblx0Ly9cclxuXHR2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7XHJcblx0Z19pc0Nocm9tZSA9IHVhLmluZGV4T2YoJ2Nocm9tZScpICE9IC0xO1xyXG5cdC8vXHJcblx0cmV0dXJuIGdfaXNDaHJvbWU7XHJcbn1cclxuXHJcbi8vIOWwhuaVtOaVsOi9rOaNouaIkOaXpeacn+Wtl+espuS4slxyXG5mdW5jdGlvbiBmb3JtYXRJbnRUb0RhdGVTdHJpbmcobil7XHJcblx0XHRcclxuXHRyZXR1cm4gbiA8IDEwID8gJzAnICsgbiA6IG47XHJcbn1cclxuXHJcbi8vIOajgOafpeWPiuWinuWKoOaVsOWAvOWtl+espuS4sumVv+W6pu+8jOS+i+Wmgu+8micyJyAtPiAnMDInXHJcbmZ1bmN0aW9uIGNoZWNrQW5kQWRkU3RyTGVuZ3RoKHN0cikge1xyXG5cdGlmIChzdHIubGVuZ3RoIDwgMikge1xyXG5cdFx0cmV0dXJuICcwJyArIHN0cjtcclxuXHR9IGVsc2Uge1xyXG5cdFx0cmV0dXJuIHN0cjtcclxuXHR9XHJcbn1cclxuXHJcbi8vIOWwhuWtl+espuS4sui9rOWMluS4uuaXpeacn+WvueixoVxyXG5mdW5jdGlvbiBfczJkKHN0cil7XHJcblx0aWYgKCFzdHIpXHJcblx0XHRyZXR1cm4gJyc7XHJcblx0dmFyIGRhdGUgPSBuZXcgRGF0ZShzdHIuc3Vic3RyKDAsIDQpLFxyXG5cdFx0XHRcdFx0c3RyLnN1YnN0cig1LCAyKSAtIDEsXHJcblx0XHRcdFx0XHRzdHIuc3Vic3RyKDgsIDMpLFxyXG5cdFx0XHRcdFx0c3RyLnN1YnN0cigxMSwgMiksXHJcblx0XHRcdFx0XHRzdHIuc3Vic3RyKDE0LCAyKSxcclxuXHRcdFx0XHRcdHN0ci5zdWJzdHIoMTcsIDIpXHJcblx0XHRcdFx0XHQpO1x0XHRcclxuXHRyZXR1cm4gZGF0ZTtcclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBjb2xvckNvdW50OiAxMixcclxuICAgIGNvbG9ySXRlbXM6IFtcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiMzMkNEMzJcIiwgXCJjb2xvck5hbWVcIjogJ+aphOamhOe7vycgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiM1NDg0RURcIiwgXCJjb2xvck5hbWVcIjogJ+Wuneefs+iTnScgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNBNEJERkVcIiwgXCJjb2xvck5hbWVcIjogJ+iTneiJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiM0NkQ2REJcIiwgXCJjb2xvck5hbWVcIjogJ+mdkue7v+iJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiM3QUU3QkZcIiwgXCJjb2xvck5hbWVcIjogJ+e7v+iJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiM1MUI3NDlcIiwgXCJjb2xvck5hbWVcIjogJ+a4heaWsOe7vycgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNGQkQ3NUJcIiwgXCJjb2xvck5hbWVcIjogJ+m7hOiJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNGRkI4NzhcIiwgXCJjb2xvck5hbWVcIjogJ+apmOiJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNGRjg4N0NcIiwgXCJjb2xvck5hbWVcIjogJ+e6ouiJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNEQzIxMjdcIiwgXCJjb2xvck5hbWVcIjogJ+WlouWNjue6oicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNEQkFERkZcIiwgXCJjb2xvck5hbWVcIjogJ+e0q+iJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNFMUUxRTFcIiwgXCJjb2xvck5hbWVcIjogJ+eBsOiJsicgfVxyXG4gICAgXSxcclxuXHJcbn0iLCIvL1RPRE86IOWIpOaWrXdpbmRvdy5leHRlcm5hbOaYr+WQpuS4uldpekh0bWxFZGl0b3JBcHBcclxuY29uc3QgV2l6RXhwbG9yZXJBcHAgPSB3aW5kb3cuZXh0ZXJuYWw7XHJcbmNvbnN0IFdpekV4cGxvcmVyV2luZG93ID0gV2l6RXhwbG9yZXJBcHAuV2luZG93O1xyXG5jb25zdCBXaXpEYXRhYmFzZSA9IFdpekV4cGxvcmVyQXBwLkRhdGFiYXNlO1xyXG5jb25zdCBXaXpDb21tb25VSSA9IFdpekV4cGxvcmVyQXBwLkNyZWF0ZVdpek9iamVjdChcIldpektNQ29udHJvbHMuV2l6Q29tbW9uVUlcIik7XHJcblxyXG5mdW5jdGlvbiBXaXpDb25maXJtKG1zZywgdGl0bGUpIHtcclxuICAgIHJldHVybiBXaXpFeHBsb3JlcldpbmRvdy5TaG93TWVzc2FnZShtc2csIHRpdGxlLCAweDAwMDAwMDIwIHwgMHgwMDAwMDAwMSkgPT0gMTtcclxufVxyXG5cclxuZnVuY3Rpb24gV2l6QWxlcnQobXNnKSB7XHJcbiAgICBXaXpFeHBsb3JlcldpbmRvdy5TaG93TWVzc2FnZShtc2csIFwie3B9XCIsIDB4MDAwMDAwNDApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBXaXpCdWJibGVNZXNzYWdlKHRpdGxlLCBtc2csIGNvbG9yID0gJyNGRkZBOUQnLCBkZWxheSA9ICczJykge1xyXG4gICAgY29uc3QgYXBwUGF0aCA9IFdpekNvbW1vblVJLkdldFNwZWNpYWxGb2xkZXIoXCJBcHBQYXRoXCIpO1xyXG4gICAgLy9cclxuICAgIGNvbnN0IHdpelNoZWxsRmlsZU5hbWUgPSBhcHBQYXRoICsgXCJXaXouZXhlXCI7XHJcbiAgICBjb25zdCBkbGxGaWxlTmFtZSA9IGFwcFBhdGggKyBcIldpelRvb2xzLmRsbFwiO1xyXG4gICAgLy9cclxuICAgIGNvbnN0IHBhcmFtcyA9IGBcIiR7ZGxsRmlsZU5hbWV9XCIgV2l6VG9vbHNTaG93QnViYmxlV2luZG93MkV4IC9UaXRsZT0ke3RpdGxlfSAvTGlua1RleHQ9JHttc2d9IC9MaW5rVVJMPUAgL0NvbG9yPSR7Y29sb3J9IC9EZWxheT0ke2RlbGF5fWA7XHJcbiAgICAvL1xyXG4gICAgV2l6Q29tbW9uVUkuUnVuRXhlKHdpelNoZWxsRmlsZU5hbWUsIHBhcmFtcywgZmFsc2UpO1xyXG59XHJcblxyXG5jbGFzcyBXaXpTaGVsbCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZGxsRmlsZU5hbWUsIGRsbEV4cG9ydEZ1bmMsIHBhcmFtcykge1xyXG4gICAgICAgIC8v5L2/55SoZGxs5a+85Ye65Ye95pWw77yM5aSn6YOo5YiG5YWl5Y+C5pe25ZG95Luk6KGM5pa55byP77yM5YW35L2T5Y+C5pWw5rKh5pyJ6K+05piO77yM5pyJ6ZyA6KaB6IGU57O75byA5Y+R5Lq65ZGYXHJcbiAgICAgICAgY29uc3QgYXBwUGF0aCA9IFdpekNvbW1vblVJLkdldFNwZWNpYWxGb2xkZXIoXCJBcHBQYXRoXCIpO1xyXG4gICAgICAgIHRoaXMuYXBwUGF0aCA9IGFwcFBhdGhcclxuICAgICAgICB0aGlzLndpekV4ZSA9IGFwcFBhdGggKyBcIldpei5leGVcIjtcclxuICAgICAgICB0aGlzLmRsbEZpbGVOYW1lID0gZGxsRmlsZU5hbWUgPyBhcHBQYXRoICsgZGxsRmlsZU5hbWUgOiBhcHBQYXRoICsgJ1dpektNQ29udHJvbHMuZGxsJztcclxuICAgICAgICB0aGlzLmRsbEV4cG9ydEZ1bmMgPSBkbGxFeHBvcnRGdW5jIHx8ICdXaXpLTVJ1blNjcmlwdCc7XHJcbiAgICAgICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7XHJcbiAgICB9XHJcblxyXG4gICAgcnVuU2NyaXB0RmlsZShzY3JpcHRGaWxlTmFtZSwgc2NyaXB0UGFyYW1zKSB7XHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0gYFwiJHt0aGlzLmFwcFBhdGggKyAnV2l6S01Db250cm9scy5kbGwnfVwiIFdpektNUnVuU2NyaXB0IC9TY3JpcHRGaWxlTmFtZT0ke3NjcmlwdEZpbGVOYW1lfSAke3NjcmlwdFBhcmFtc31gO1xyXG4gICAgICAgIFdpekNvbW1vblVJLlJ1bkV4ZSh0aGlzLndpekV4ZSwgcGFyYW1zLCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgd2l6QnViYmxlTWVzc2FnZSh0aXRsZSwgbXNnLCBjb2xvciA9ICcjRkZGQTlEJywgZGVsYXkgPSAnMycpIHtcclxuICAgICAgICBXaXpCdWJibGVNZXNzYWdlKHRpdGxlLCBtc2csIGNvbG9yLCBkZWxheSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldFdpekludGVyZmFjZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBXaXpFeHBsb3JlckFwcCwgV2l6RXhwbG9yZXJXaW5kb3csIFdpekRhdGFiYXNlLCBXaXpDb21tb25VSVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgXHJcbiAgICBXaXpFeHBsb3JlckFwcCwgXHJcbiAgICBXaXpFeHBsb3JlcldpbmRvdywgXHJcbiAgICBXaXpEYXRhYmFzZSwgXHJcbiAgICBXaXpDb21tb25VSSwgXHJcbiAgICBXaXpDb25maXJtLCBcclxuICAgIFdpekFsZXJ0LCBcclxuICAgIFdpekJ1YmJsZU1lc3NhZ2UsIFxyXG4gICAgV2l6U2hlbGwgXHJcbn07XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=