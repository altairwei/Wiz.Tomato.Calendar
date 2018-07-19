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
/******/ 	var hotCurrentHash = "e379ce2f59a1c7ecd43e"; // eslint-disable-line no-unused-vars
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

var _EventPopover = __webpack_require__(/*! ./components/EventPopover/EventPopover */ "./src/components/EventPopover/EventPopover.js");

var _EventPopover2 = _interopRequireDefault(_EventPopover);

var _EventModal = __webpack_require__(/*! ./components/Modal/EventModal */ "./src/components/Modal/EventModal.js");

var _EventModal2 = _interopRequireDefault(_EventModal);

var _EventCreateModal = __webpack_require__(/*! ./components/Modal/EventCreateModal */ "./src/components/Modal/EventCreateModal.js");

var _EventCreateModal2 = _interopRequireDefault(_EventCreateModal);

var _EventEditModal = __webpack_require__(/*! ./components/Modal/EventEditModal */ "./src/components/Modal/EventEditModal.js");

var _EventEditModal2 = _interopRequireDefault(_EventEditModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        //
        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

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
        _this.handlePopoverHide = _this.handlePopoverHide.bind(_this);
        _this.handleSelect = _this.handleSelect.bind(_this);
        _this.handleModalClose = _this.handleModalClose.bind(_this);
        _this.handleEventEdit = _this.handleEventEdit.bind(_this);
        return _this;
    }

    _createClass(App, [{
        key: 'handleCalendarRender',
        value: function handleCalendarRender(el) {
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
        key: 'handlePopoverHide',
        value: function handlePopoverHide() {
            //每次出现都渲染一个新的Popover
            this.setState({
                isShowingEvent: false
            });
        }
    }, {
        key: 'handleSelect',
        value: function handleSelect(start, end, jsEvent, view) {
            var args = { start: start, end: end, jsEvent: jsEvent, view: view };
            this.setState({
                isCreatingEvent: true,
                selectedRange: args
            });
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
    }, {
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                'div',
                { id: 'wiz-tomato-calendar' },
                _react2.default.createElement(_Calendar2.default, {
                    onEventClick: this.handleEventClick,
                    onSelect: this.handleSelect,
                    onCalendarRender: this.handleCalendarRender
                }),
                !!this.state.selectedRange && _react2.default.createElement(_EventCreateModal2.default, {
                    key: 'create' + this.state.selectedRange.jsEvent.pageX,
                    show: this.state.isCreatingEvent,
                    onModalClose: this.handleModalClose,
                    isCreatingEvent: this.state.isCreatingEvent,
                    selectedRange: this.state.selectedRange
                }),
                !!this.state.editingEvent && _react2.default.createElement(_EventEditModal2.default, {
                    key: 'edit' + this.state.editingEvent.id,
                    show: this.state.isEditingEvent,
                    onModalClose: this.handleModalClose,
                    editingEvent: this.state.editingEvent
                }),
                !!this.state.isShowingEvent && _react2.default.createElement(_EventPopover2.default, {
                    key: 'popover' + this.state.clickedArgs.event.id,
                    event: this.state.clickedArgs.event,
                    reference: this.state.clickedArgs.jsEvent.target,
                    onEditBtnClick: this.handleEventEdit,
                    onPopoverHide: this.handlePopoverHide
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
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");

var _reactDom2 = _interopRequireDefault(_reactDom);

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
        _this.dataLoader = null;
        _this.calendar = null;
        //绑定句柄
        _this.handleFullCalendarRender = _this.handleFullCalendarRender.bind(_this);
        _this.onViewRender = _this.onViewRender.bind(_this);
        _this.onEventRender = _this.onEventRender.bind(_this);
        _this.onEventDrop = _this.onEventDrop.bind(_this);
        _this.onEventResize = _this.onEventResize.bind(_this);
        return _this;
    }

    // 事件句柄
    // ------------------------------------------------------------

    _createClass(Calendar, [{
        key: 'handleFullCalendarRender',
        value: function handleFullCalendarRender(el) {
            // FullCalendar 渲染之前执行此句柄，传入DOM
            this.calendar = el;
            this.dataLoader = new _WizEventDataLoader2.default(this.calendar);
            this.props.onCalendarRender(el);
        }
    }, {
        key: 'onViewRender',
        value: function onViewRender(view, element) {
            // 刷新视图，重新获取日历事件
            var $calendar = $(this.calendar);
            var eventSources = this.dataLoader.getEventSources(view, element);
            $calendar.fullCalendar('removeEvents');
            for (var i = 0; i < eventSources.length; i++) {
                $calendar.fullCalendar('addEventSource', eventSources[i]);
            }
        }
    }, {
        key: 'onEventDrop',
        value: function onEventDrop(event, delta, revertFunc, jsEvent, ui, view) {
            if (event.id) {
                this.dataLoader.updateEventDataOnDrop(event, delta, revertFunc, jsEvent, ui, view);
            } else {
                revertFunc();
            }
        }
    }, {
        key: 'onEventResize',
        value: function onEventResize(event, delta, revertFunc, jsEvent, ui, view) {
            if (event.id) {
                this.dataLoader.updateEventDataOnResize(event, delta, revertFunc, jsEvent, ui, view);
            } else {
                revertFunc();
            }
        }
    }, {
        key: 'onEventRender',
        value: function onEventRender(eventObj, $el) {
            // 设置文本颜色
            var rgbString = $el.css('background-color');
            var rgbArray = /^rgb\((\d*), (\d*), (\d*)\)$/.exec(rgbString);
            if (rgbArray) {
                var hsl = rgb2hsl(rgbArray[1], rgbArray[2], rgbArray[3]);
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
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {}
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
                    viewRender: this.onViewRender,
                    eventRender: this.onEventRender,
                    eventClick: this.props.onEventClick,
                    eventDrop: this.onEventDrop,
                    eventResize: this.onEventResize
                })
            );
        }
    }]);

    return Calendar;
}(_react2.default.Component);

exports.default = Calendar;


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
		_this.instance = null;
		_this.date = new Date();
		return _this;
	}

	_createClass(FullCalendar, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			this.props.onFullCalendarRender(this.el);
			var objectMapperSettings = this.fullcalendarObjectMapper.getSettings(this.props);
			this.instance = this.jq(this.el).fullCalendar(objectMapperSettings);
		}
	}, {
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(nextProps) {}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			return _react2.default.createElement("div", { id: "calendar", ref: function ref(el) {
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

var _EventHandles = __webpack_require__(/*! ../../models/EventHandles */ "./src/models/EventHandles.js");

var _EventHandles2 = _interopRequireDefault(_EventHandles);

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
        _this.eventHandles = new _EventHandles2.default();
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
            var handleName = 'on' + btnType + 'BtnClick';
            this.hide().then(function (ret) {
                switch (handleName) {
                    case 'onEditBtnClick':
                        _this2.props.onEditBtnClick(_this2.props.event); //交由父元素
                        break;
                    default:
                        _this2.eventHandles[handleName](_this2.props.event, _this2.state.newEventData);
                        break;
                }
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
                        _reactBootstrap.SplitButton,
                        { pullRight: true,
                            title: '\u5220\u9664',
                            id: 'tc-editpopper-DeleteData',
                            onClick: this.props.onBtnClick },
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventDetailForm = function (_React$Component) {
    _inherits(EventDetailForm, _React$Component);

    function EventDetailForm(props) {
        _classCallCheck(this, EventDetailForm);

        return _possibleConstructorReturn(this, (EventDetailForm.__proto__ || Object.getPrototypeOf(EventDetailForm)).call(this, props));
        //由父组件负责处理数据
    }

    _createClass(EventDetailForm, [{
        key: 'render',
        value: function render() {
            var handleTitleChange = this.props.onTitleChange;
            var handleStartChange = this.props.onStartChange;
            var handleEndChange = this.props.onEndChange;
            var handleColorChange = this.props.onColorchange;
            return _react2.default.createElement(
                _reactBootstrap.Form,
                null,
                _react2.default.createElement(_TitleInputGroup2.default, {
                    autoFocus: true,
                    controlId: 'tc-createpage-eventtitle',
                    label: '\u6807\u9898',
                    value: this.props.eventTitle,
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
                            value: this.props.start,
                            onDateTimeChange: handleStartChange })
                    ),
                    _react2.default.createElement(
                        _reactBootstrap.Col,
                        { sm: 6 },
                        _react2.default.createElement(_DateTimePickerGroup2.default, {
                            controlId: 'tc-createpage-eventend',
                            label: '\u7ED3\u675F\u65E5\u671F',
                            value: this.props.end,
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
                            value: this.props.backgroundColor,
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
    }]);

    return EventDetailForm;
}(_react2.default.Component);

exports.default = EventDetailForm;

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


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");

var _EventDetailForm = __webpack_require__(/*! ../Form/EventDetailForm */ "./src/components/Form/EventDetailForm.js");

var _EventDetailForm2 = _interopRequireDefault(_EventDetailForm);

var _EventModal = __webpack_require__(/*! ./EventModal */ "./src/components/Modal/EventModal.js");

var _EventModal2 = _interopRequireDefault(_EventModal);

var _moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");

var _moment2 = _interopRequireDefault(_moment);

var _EventHandles = __webpack_require__(/*! ../../models/EventHandles */ "./src/models/EventHandles.js");

var _EventHandles2 = _interopRequireDefault(_EventHandles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventCreateModal = function (_React$Component) {
    _inherits(EventCreateModal, _React$Component);

    function EventCreateModal(props) {
        _classCallCheck(this, EventCreateModal);

        var _this = _possibleConstructorReturn(this, (EventCreateModal.__proto__ || Object.getPrototypeOf(EventCreateModal)).call(this, props));

        _this.eventHandles = new _EventHandles2.default();
        //
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
        key: 'handleEventCreate',
        value: function handleEventCreate() {
            this.eventHandles.onCreateBtnClick(this.state);
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
                        'Tab 1 content'
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

var _EventModal = __webpack_require__(/*! ./EventModal */ "./src/components/Modal/EventModal.js");

var _EventModal2 = _interopRequireDefault(_EventModal);

var _moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");

var _moment2 = _interopRequireDefault(_moment);

var _EventHandles = __webpack_require__(/*! ../../models/EventHandles */ "./src/models/EventHandles.js");

var _EventHandles2 = _interopRequireDefault(_EventHandles);

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
                            _reactBootstrap.SplitButton,
                            { pullRight: true,
                                title: '\u5220\u9664\u6E90\u6587\u6863',
                                id: 'tc-editpage-DeleteDoc',
                                onClick: this.props.onBtnClick },
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
                                    id: 'tc-editpage-openEventDoc',
                                    onClick: this.props.onBtnClick },
                                '\u7F16\u8F91\u6E90\u6570\u636E'
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

        var _this2 = _possibleConstructorReturn(this, (EventEditModal.__proto__ || Object.getPrototypeOf(EventEditModal)).call(this, props));

        _this2.eventHandles = new _EventHandles2.default();
        //
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
            //
            var newEventData = $.extend({}, this.state.newEventData);
            //
            var id = e.target.id;
            var btnType = id.split('-')[2];
            var handleName = 'on' + btnType + 'BtnClick';
            this.eventHandles[handleName](this.props.editingEvent, newEventData);
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
                        'Tab 1 content'
                    )
                ),
                _react2.default.createElement(
                    _EventModal2.default.ToolbarFooter,
                    null,
                    _react2.default.createElement(ModalToolbar, {
                        enableSaveBtn: enableSaveBtn,
                        complete: this.state.complete,
                        onBtnClick: this.handleBtnClick })
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
		this.$calendar = calendar ? $(calendar) : $('#calendar');
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
			this.$calendar.fullCalendar('addEventSource', {
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
			this.$calendar.fullCalendar('removeEvents', this.id);
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
				this.$calendar.fullCalendar('updateEvent', event);
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

/***/ "./src/models/EventHandles.js":
/*!************************************!*\
  !*** ./src/models/EventHandles.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

var _jquery2 = _interopRequireDefault(_jquery);

var _WizEventDataLoader = __webpack_require__(/*! ./WizEventDataLoader */ "./src/models/WizEventDataLoader.js");

var _WizEventDataLoader2 = _interopRequireDefault(_WizEventDataLoader);

var _CalendarEvent = __webpack_require__(/*! ./CalendarEvent */ "./src/models/CalendarEvent.js");

var _CalendarEvent2 = _interopRequireDefault(_CalendarEvent);

var _WizInterface = __webpack_require__(/*! ../utils/WizInterface */ "./src/utils/WizInterface.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FormHandles = function () {
    function FormHandles() {
        _classCallCheck(this, FormHandles);

        this.$calendar = (0, _jquery2.default)('#calendar');
    }

    _createClass(FormHandles, [{
        key: 'onCreateBtnClick',
        value: function onCreateBtnClick(_ref) {
            var start = _ref.start,
                end = _ref.end,
                title = _ref.title,
                backgroundColor = _ref.backgroundColor;

            var fullCalendar = this.$calendar.fullCalendar('getCalendar');
            var moment = fullCalendar.moment.bind(fullCalendar);
            var startMoment = moment(start);
            var endMoment = moment(end);
            var newEvent = new _CalendarEvent2.default({
                title: title || '无标题',
                start: startMoment,
                end: endMoment,
                allDay: startMoment.hasTime() && endMoment.hasTime() ? false : true,
                backgroundColor: backgroundColor ? backgroundColor : '#32CD32'
            }, this.$calendar);
            // 保存并渲染事件
            newEvent.saveToWizEventDoc();
            newEvent.refetchData();
            newEvent.addToFullCalendar();
        }
    }, {
        key: 'onSaveBtnClick',
        value: function onSaveBtnClick(event, newEventData) {
            for (var prop in newEventData) {
                event[prop] = newEventData[prop];
            }
            // 重新渲染
            this.$calendar.fullCalendar('updateEvent', event);
            // 修改源数据
            var newEvent = new _CalendarEvent2.default(event);
            newEvent.saveToWizEventDoc();
        }
    }, {
        key: 'onCompleteBtnClick',
        value: function onCompleteBtnClick(event) {
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
            // 重新渲染
            this.$calendar.fullCalendar('updateEvent', event);
        }
    }, {
        key: 'onDeleteDataBtnClick',
        value: function onDeleteDataBtnClick(event) {
            if ((0, _WizInterface.WizConfirm)("确定要删除该日程？", '番茄助理')) {
                // 删除日程
                var newEvent = new _CalendarEvent2.default(event);
                newEvent.deleteEventData(false);
            }
        }
    }, {
        key: 'onDeleteDocBtnClick',
        value: function onDeleteDocBtnClick(event) {
            if ((0, _WizInterface.WizConfirm)("确定要删除该日程源文档？\n「确定」将会导致相关笔记被删除！", '番茄助理')) {
                var newEvent = new _CalendarEvent2.default(event);
                newEvent.deleteEventData(true);
            }
        }
    }, {
        key: 'onEditOriginBtnClick',
        value: function onEditOriginBtnClick(event) {
            var doc = _WizInterface.WizDatabase.DocumentFromGUID(event.id);
            _WizInterface.WizCommonUI.EditCalendarEvent(doc);
        }
    }, {
        key: 'onOpenDocBtnClick',
        value: function onOpenDocBtnClick(event) {
            var doc = _WizInterface.WizDatabase.DocumentFromGUID(event.id);
            _WizInterface.WizExplorerWindow.ViewDocument(doc, true);
        }
    }]);

    return FormHandles;
}();

exports.default = FormHandles;

/***/ }),

/***/ "./src/models/WizEventDataLoader.js":
/*!******************************************!*\
  !*** ./src/models/WizEventDataLoader.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

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
	function WizEventDataLoader(calendar) {
		_classCallCheck(this, WizEventDataLoader);

		if (!_WizInterface.WizDatabase) throw new Error('WizDatabase not valid !');
		this.Database = _WizInterface.WizDatabase;
		this.userName = _WizInterface.WizDatabase.UserName;
		this.$calendar = $(calendar);
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
						events.push(new _CalendarEvent2.default(obj[i], this.$calendar).toFullCalendarEvent());
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
				repeatEvents.push(new _CalendarEvent2.default(obj[i], this.$calendar).generateRepeatEvents(start, end));
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
				}, this.$calendar);
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQ2FsZW5kYXIvQ2FsZW5kYXIuY3NzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0V2ZW50UG9wb3Zlci9FdmVudFBvcG92ZXIuY3NzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0V2ZW50UG9wb3Zlci9Qb3BvdmVyVGl0bGVJbnB1dC5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZSBzeW5jIF5cXC5cXC8uKiQiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9DYWxlbmRhci9DYWxlbmRhci5jc3M/Y2ExNCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9DYWxlbmRhci9DYWxlbmRhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9DYWxlbmRhci9GdWxsQ2FsZW5kYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRXZlbnRQb3BvdmVyL0V2ZW50UG9wb3Zlci5jc3M/NTg1ZiIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9FdmVudFBvcG92ZXIvRXZlbnRQb3BvdmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0V2ZW50UG9wb3Zlci9Qb3BvdmVyVGl0bGVJbnB1dC5jc3M/M2UzNiIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9FdmVudFBvcG92ZXIvUG9wb3ZlclRpdGxlSW5wdXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRXZlbnRQb3BvdmVyL1BvcG92ZXJUb29sYmFyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0Zvcm0vQXV0b0Zvcm1Hcm91cC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Gb3JtL0NvbG9yUGlja2VyR3JvdXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRm9ybS9EYXRlVGltZVBpY2tlckdyb3VwLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0Zvcm0vRXZlbnREZXRhaWxGb3JtLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0Zvcm0vVGl0bGVJbnB1dEdyb3VwLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL01vZGFsL0V2ZW50Q3JlYXRlTW9kYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvTW9kYWwvRXZlbnRFZGl0TW9kYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvTW9kYWwvRXZlbnRNb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguY3NzP2Q4YzMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9tb2RlbHMvQ2FsZW5kYXJFdmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWxzL0V2ZW50SGFuZGxlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWxzL1dpekV2ZW50RGF0YUxvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvQ29uZmlnLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9XaXpJbnRlcmZhY2UuanMiXSwibmFtZXMiOlsiQXBwIiwicHJvcHMiLCJzdGF0ZSIsImlzU2hvd2luZ0V2ZW50IiwiaXNFZGl0aW5nRXZlbnQiLCJpc0NyZWF0aW5nRXZlbnQiLCJjbGlja2VkQXJncyIsImVkaXRpbmdFdmVudCIsInNlbGVjdGVkUmFuZ2UiLCJoYW5kbGVDYWxlbmRhclJlbmRlciIsImJpbmQiLCJoYW5kbGVFdmVudENsaWNrIiwiaGFuZGxlUG9wb3ZlckhpZGUiLCJoYW5kbGVTZWxlY3QiLCJoYW5kbGVNb2RhbENsb3NlIiwiaGFuZGxlRXZlbnRFZGl0IiwiZWwiLCJjYWxlbmRhciIsImV2ZW50IiwianNFdmVudCIsInZpZXciLCJhcmdzIiwic2V0U3RhdGUiLCJzdGFydCIsImVuZCIsIiRjYWxlbmRhciIsIiQiLCJmdWxsQ2FsZW5kYXIiLCJwYWdlWCIsImlkIiwidGFyZ2V0IiwiUmVhY3QiLCJDb21wb25lbnQiLCJDYWxlbmRhciIsImV2ZW50cyIsImRhdGFMb2FkZXIiLCJoYW5kbGVGdWxsQ2FsZW5kYXJSZW5kZXIiLCJvblZpZXdSZW5kZXIiLCJvbkV2ZW50UmVuZGVyIiwib25FdmVudERyb3AiLCJvbkV2ZW50UmVzaXplIiwiV2l6RXZlbnREYXRhTG9hZGVyIiwib25DYWxlbmRhclJlbmRlciIsImVsZW1lbnQiLCJldmVudFNvdXJjZXMiLCJnZXRFdmVudFNvdXJjZXMiLCJpIiwibGVuZ3RoIiwiZGVsdGEiLCJyZXZlcnRGdW5jIiwidWkiLCJ1cGRhdGVFdmVudERhdGFPbkRyb3AiLCJ1cGRhdGVFdmVudERhdGFPblJlc2l6ZSIsImV2ZW50T2JqIiwiJGVsIiwicmdiU3RyaW5nIiwiY3NzIiwicmdiQXJyYXkiLCJleGVjIiwiaHNsIiwicmdiMmhzbCIsImxpZ2h0bmVzcyIsIk1hdGgiLCJjb3MiLCJQSSIsInRleHRDb2xvciIsImlzQ29tcGxldGUiLCJwYXJzZUludCIsImNvbXBsZXRlIiwiYWRkQ2xhc3MiLCJsZWZ0IiwiY2VudGVyIiwicmlnaHQiLCJ0b2RheSIsIm1vbnRoIiwid2VlayIsImRheSIsImxpc3QiLCJhZ2VuZGEiLCJtaW5UaW1lIiwic2xvdExhYmVsRm9ybWF0Iiwib25TZWxlY3QiLCJvbkV2ZW50Q2xpY2siLCJyIiwiZyIsImIiLCJNIiwibWF4IiwibSIsIm1pbiIsIkMiLCJMIiwiUyIsImFicyIsImgiLCJIIiwicGFyc2VGbG9hdCIsIkZ1bGxjYWxlbmRhck9iamVjdE1hcHBlciIsInByb3BlcnRpZXMiLCJuZXdTZXR0aW5ncyIsImtleSIsImhhc093blByb3BlcnR5IiwiRnVsbENhbGVuZGFyIiwianEiLCJub0NvbmZsaWN0IiwiZnVsbGNhbGVuZGFyT2JqZWN0TWFwcGVyIiwiaW5zdGFuY2UiLCJkYXRlIiwiRGF0ZSIsIm9uRnVsbENhbGVuZGFyUmVuZGVyIiwib2JqZWN0TWFwcGVyU2V0dGluZ3MiLCJnZXRTZXR0aW5ncyIsIm5leHRQcm9wcyIsIkV2ZW50UG9wb3ZlciIsInBvcHBlck5vZGUiLCJwb3BwZXJJbnN0YW5jZSIsImV2ZW50SGFuZGxlcyIsIkV2ZW50SGFuZGxlcyIsIm5ld0V2ZW50RGF0YSIsImF1dG9IaWRlIiwiaGFuZGxlRGF0ZVRpbWVDaGFuZ2UiLCJoYW5kbGVUaXRsZUNoYW5nZSIsImhhbmRsZUNvbG9yQ2hhbmdlIiwiaGFuZGxlQnRuQ2xpY2siLCJlIiwicmVmZXJlbmNlIiwiaXMiLCJoYXMiLCJoaWRlIiwidGhhdCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwib25Qb3BvdmVySGlkZSIsImZhZGVJbiIsIm5ld1RpdGxlIiwidmFsdWUiLCJwcmV2U3RhdGUiLCJleHRlbmQiLCJ0aXRsZSIsImNvbG9yVmFsdWUiLCJuZXdDb2xvciIsImJhY2tncm91bmRDb2xvciIsImJ0blR5cGUiLCJzcGxpdCIsImhhbmRsZU5hbWUiLCJ0aGVuIiwicmV0Iiwib25FZGl0QnRuQ2xpY2siLCJQb3BwZXIiLCJwbGFjZW1lbnQiLCJtb2RpZmllcnMiLCJhcnJvdyIsImRvY3VtZW50Iiwib2ZmIiwib24iLCJzaG93IiwicHJldlByb3BzIiwic25hcHNob3QiLCJuZXh0U3RhdGUiLCJ1cGRhdGUiLCJkZXN0cm95IiwiZXZlbnRTdGFydCIsImZvcm1hdCIsImVuYWJsZVNhdmVCdG4iLCJkaXNwbGF5IiwiZGl2IiwiRXZlbnRUaXRsZUlucHV0IiwiZXZlbnRUaXRsZSIsImhhbmRsZUNoYW5nZSIsIm9uVGl0bGVDaGFuZ2UiLCJ0YXJnZXRGb3JtIiwiUG9wb3ZlclRvb2xiYXIiLCJvbkJ0bkNsaWNrIiwiQXV0b0Zvcm1Hcm91cCIsImlzSG9yaXpvbnRhbCIsImhvcml6b250YWwiLCJjb250cm9sSWQiLCJDb250cm9sTGFiZWwiLCJsYWJlbCIsImNoaWxkcmVuIiwiSHVlYmVlIiwicmVxdWlyZSIsIkNvbG9ySW5wdXQiLCJqc0V2ZW50T3JWYWx1ZSIsIm5ld0NvbG9yVmFsdWUiLCJvbkNvbG9yQ2hhbmdlIiwiaHVlYmVlSW5zdGFuY2UiLCJzdGF0aWNPcGVuIiwic2V0VGV4dCIsInNldEJHQ29sb3IiLCJodWVzIiwiaHVlMCIsInNoYWRlcyIsInNhdHVyYXRpb25zIiwibm90YXRpb24iLCJjbGFzc05hbWUiLCJjdXN0b21Db2xvcnMiLCJzZXRDb2xvciIsIkNvbG9yUGlja2VyR3JvdXAiLCJEYXRlVGltZUlucHV0IiwibmV3RGF0ZVZhbHVlIiwib25EYXRlVGltZUNoYW5nZSIsInJlYWRPbmx5IiwiZGF0ZXRpbWVwaWNrZXIiLCJzaG93VG9kYXlCdXR0b24iLCJsb2NhbGUiLCJkYXRhIiwiRGF0ZVRpbWVQaWNrZXJHcm91cCIsIkV2ZW50RGV0YWlsRm9ybSIsImhhbmRsZVN0YXJ0Q2hhbmdlIiwib25TdGFydENoYW5nZSIsImhhbmRsZUVuZENoYW5nZSIsIm9uRW5kQ2hhbmdlIiwib25Db2xvcmNoYW5nZSIsIlRpdGxlSW5wdXRHcm91cCIsImF1dG9Gb2N1cyIsIkV2ZW50Q3JlYXRlTW9kYWwiLCJoYW5kbGVFdmVudENyZWF0ZSIsIm9uQ3JlYXRlQnRuQ2xpY2siLCJvbk1vZGFsQ2xvc2UiLCJNb2RhbFRvb2xiYXIiLCJ0ZXh0QWxpZ24iLCJFdmVudEVkaXRNb2RhbCIsImlzRW1wdHlPYmplY3QiLCJOYXZIZWFkZXIiLCJib3JkZXJCb3R0b20iLCJwYWRkaW5nIiwiVGFiQm9keSIsIlRvb2xiYXJGb290ZXIiLCJFdmVudE1vZGFsIiwiQ2hpbGRyZW4iLCJmb3JFYWNoIiwidGhpc0FyZyIsIm5hbWUiLCJ0eXBlIiwiUmVhY3RET00iLCJyZW5kZXIiLCJnZXRFbGVtZW50QnlJZCIsIkNhbGVuZGFyRXZlbnQiLCJnX2RiIiwiRXJyb3IiLCJfY2hlY2tEYXRhVHlwZSIsIl9jcmVhdGUiLCJkb2MiLCJEb2N1bWVudEZyb21HVUlEIiwiR2V0UGFyYW1WYWx1ZSIsIkRhdGVDcmVhdGVkIiwiR1VJRCIsIlRpdGxlIiwiRGF0ZU1vZGlmaWVkIiwiY29uc29sZSIsImVycm9yIiwiYmtDb2xvciIsImFsbERheSIsImRhdGVDb21wbGV0ZWQiLCJycHRSdWxlIiwicnB0RW5kIiwiX0luZm8iLCJfcGFyc2VJbmZvIiwiQ0FMRU5EQVJfSU5GTyIsIl9FeHRyYUluZm8iLCJDQUxFTkRBUl9FWFRSQUlORk8iLCJfZ2V0RGVmYXVsdEV4dHJhSW5mbyIsImd1aWQiLCJDQUxFTkRBUl9TVEFSVCIsIkNBTEVOREFSX0VORCIsImNpIiwiQ29uZmlnIiwiY29sb3JJdGVtcyIsImluZGV4T2YiLCJDb21wbGV0ZSIsIkRhdGVDb21wbGV0ZWQiLCJDQUxFTkRBUl9SRUNVUlJFTkNFIiwiQ0FMRU5EQVJfRU5EUkVDVVJSRU5DRSIsIm1vbWVudCIsImhhc1RpbWUiLCJjcmVhdGVkIiwidXBkYXRlZCIsIl91cGRhdGUiLCJvYmpDbGFzcyIsImNvbnN0cnVjdG9yIiwiR1VJRF9SZWdFeHIiLCJTdHJpbmciLCJ0ZXN0IiwiT2JqZWN0IiwiSW5mb1N0cmluZyIsIkluZm9PYmplY3QiLCJJbmZvQXJyYXkiLCJpdGVtIiwiaW5kZXgiLCJhcnIiLCJwYWlyIiwiSW5mb09iamVjdEtleXNBcnJheSIsImtleXMiLCJzaW5nbGVJbmZvIiwicHVzaCIsImpvaW4iLCJyZXBsYWNlIiwiX3VwZGF0ZUluZm8iLCJfdXBkYXRlRXh0cmFJbmZvIiwiRXh0cmFJbmZvT2JqZWN0IiwiY29udGVudCIsImh0bWxUZXh0IiwiZXZlbnRTb3VyY2UiLCJkYXlBcnJheSIsIl9nZXRSZW5kZXJSZXBlYXREYXkiLCJuZXdFdmVudCIsInRvRnVsbENhbGVuZGFyRXZlbnQiLCJhZGQiLCJkaWZmIiwicmVnZXgiLCJjb3VudCIsImN1cldlZWtEYXkiLCJyZXN1bHRzIiwiaW50ZXJXZWVrIiwibnVtYmVyIiwiX2dldFdlZWtseVJlcGVhdERheSIsInBlclJ1bGUiLCJfZ2V0UGVyUmVwZWF0RGF5cyIsImludGVyV2Vla3MiLCJ2aWV3U3RhcnQiLCJ2aWV3RW5kIiwiaW50ZXJ2YWxXZWVrcyIsIndlZWtkYXlzIiwibmV3RXZlbnRTdGFydERhdGUiLCJzZXQiLCJnZXQiLCJpc1NhbWUiLCJpc0JlZm9yZSIsInBlclJ1bGVNYXAiLCJzcGxpY2UiLCJmaW5kSW5kZXgiLCJfc3RyaW5naWZ5SW5mbyIsInN0YXJ0U3RyIiwiZW5kU3RyIiwiX3NldFBhcmFtVmFsdWUiLCJTZXRQYXJhbVZhbHVlIiwibG9jYXRpb24iLCJvYmpGb2xkZXIiLCJHZXRGb2xkZXJCeUxvY2F0aW9uIiwidGVtcEh0bWwiLCJnX2NtbiIsIkdldEFUZW1wRmlsZU5hbWUiLCJfZ2V0RXZlbnRIdG1sIiwiU2F2ZVRleHRUb0ZpbGUiLCJDcmVhdGVEb2N1bWVudDIiLCJDaGFuZ2VUaXRsZUFuZEZpbGVOYW1lIiwiVXBkYXRlRG9jdW1lbnQ2IiwidG9XaXpFdmVudERhdGEiLCJBZGRUb0NhbGVuZGFyIiwicHJvcCIsImd1aWRSZWdleCIsImlzV2l6RG9jRXhpc3QiLCJfc2F2ZUFsbFByb3AiLCJfY3JlYXRlV2l6RXZlbnREb2MiLCJpc0RlbGV0ZURvYyIsIlJlbW92ZUZyb21DYWxlbmRhciIsIkRlbGV0ZSIsIkZvcm1IYW5kbGVzIiwic3RhcnRNb21lbnQiLCJlbmRNb21lbnQiLCJzYXZlVG9XaXpFdmVudERvYyIsInJlZmV0Y2hEYXRhIiwiYWRkVG9GdWxsQ2FsZW5kYXIiLCJkZWxldGVFdmVudERhdGEiLCJvYmpEYXRhYmFzZSIsIm9iakNvbW1vbiIsIkVkaXRDYWxlbmRhckV2ZW50Iiwib2JqV2luZG93IiwiVmlld0RvY3VtZW50IiwiRGF0YWJhc2UiLCJ1c2VyTmFtZSIsIlVzZXJOYW1lIiwiZ2VuZXJhbEV2ZW50U291cmNlIiwiX2dldEFsbE9yaWdpbmFsRXZlbnQiLCJyZXBlYXRFdmVudFNvdXJjZXMiLCJfZ2V0QWxsUmVwZWF0RXZlbnQiLCJjb25jYXQiLCJzcWwiLCJhbmQxIiwiYW5kMiIsIkRvY3VtZW50c0RhdGFGcm9tU1FMIiwib2JqIiwiSlNPTiIsInBhcnNlIiwiQXJyYXkiLCJpc0FycmF5IiwiZXJyIiwicmVwZWF0RXZlbnRzIiwibG9nIiwiZ2VuZXJhdGVSZXBlYXRFdmVudHMiLCJfdXBkYXRlRG9jTW9kaWZ5RGF0ZSIsIm5vdyIsInNldFNlY29uZHMiLCJnZXRTZWNvbmRzIiwiX2QycyIsImR0IiwiZ2V0RnVsbFllYXIiLCJmb3JtYXRJbnRUb0RhdGVTdHJpbmciLCJnZXRNb250aCIsImdldERhdGUiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJldmVudEVuZFN0ciIsInNlbGVjdGlvbkRhdGEiLCJ1c2VySW5wdXRzIiwiY29sb3IiLCJfZ2V0V2l6RXZlbnQiLCJFdmVudENvbGxlY3Rpb24iLCJHZXRDYWxlbmRhckV2ZW50czIiLCJnZXRSZW5kZXJSZXBlYXREYXkiLCJfczJkIiwiZ19ldmVudFN0YXJ0IiwiZ19yZXBlYXRSdWxlIiwiZ2V0V2Vla2x5UmVwZWF0RGF5IiwiY2hhckF0IiwiZ2V0RGF5IiwiaW50ZXIiLCJfaW50ZXJEYXlzIiwiZ2V0TW9udGhseVJlcGVhdERheSIsImdldFllYXJseVJlcGVhdERheSIsImdldENoaW5lc2VSZXBlYXREYXkiLCJkYXlzIiwic3Vic3RyIiwiaXNDaHJvbWUiLCJnX2lzQ2hyb21lIiwidWEiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJ0b0xvd2VyQ2FzZSIsIm4iLCJjaGVja0FuZEFkZFN0ckxlbmd0aCIsInN0ciIsImNvbG9yQ291bnQiLCJXaXpFeHBsb3JlckFwcCIsIndpbmRvdyIsImV4dGVybmFsIiwiV2l6RXhwbG9yZXJXaW5kb3ciLCJXaW5kb3ciLCJXaXpEYXRhYmFzZSIsIldpekNvbW1vblVJIiwiQ3JlYXRlV2l6T2JqZWN0IiwiV2l6Q29uZmlybSIsIm1zZyIsIlNob3dNZXNzYWdlIiwiV2l6QWxlcnQiLCJXaXpCdWJibGVNZXNzYWdlIiwiZGVsYXkiLCJhcHBQYXRoIiwiR2V0U3BlY2lhbEZvbGRlciIsIndpelNoZWxsRmlsZU5hbWUiLCJkbGxGaWxlTmFtZSIsInBhcmFtcyIsIlJ1bkV4ZSIsIldpelNoZWxsIiwiZGxsRXhwb3J0RnVuYyIsIndpekV4ZSIsInNjcmlwdEZpbGVOYW1lIiwic2NyaXB0UGFyYW1zIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBUSxvQkFBb0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBaUIsNEJBQTRCO0FBQzdDO0FBQ0E7QUFDQSwwQkFBa0IsMkJBQTJCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjs7QUFFQTtBQUNBLHNEQUE4QztBQUM5QztBQUNBO0FBQ0Esb0NBQTRCO0FBQzVCLHFDQUE2QjtBQUM3Qix5Q0FBaUM7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBNkI7QUFDN0IscUNBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSw2QkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQWtCLDhCQUE4QjtBQUNoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBb0IsMkJBQTJCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUFtQixjQUFjO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBZ0IsS0FBSztBQUNyQjtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUFnQixZQUFZO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQWMsNEJBQTRCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHVCQUFlLDRCQUE0QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHVCQUFlLDRCQUE0QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQWlCLHVDQUF1QztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUFDSDs7OzBDQUV3QjtBQUNyQixtQkFBTztBQUNIYiw4Q0FERyxFQUNhRyxvQ0FEYixFQUNnQ0Usd0JBRGhDLEVBQzZDQztBQUQ3QyxhQUFQO0FBR0g7Ozs7OztRQUlETixjLEdBQUFBLGM7UUFDQUcsaUIsR0FBQUEsaUI7UUFDQUUsVyxHQUFBQSxXO1FBQ0FDLFcsR0FBQUEsVztRQUNBRSxVLEdBQUFBLFU7UUFDQUcsUSxHQUFBQSxRO1FBQ0FDLGdCLEdBQUFBLGdCO1FBQ0FRLFEsR0FBQUEsUSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cbiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7XG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHR9XG4gXHR2YXIgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2sgPSB3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdO1xuIFx0d2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXSA9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gd2VicGFja0hvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdFx0aWYgKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHR9IDtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XG4gXHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuIFx0XHRzY3JpcHQuY2hhcnNldCA9IFwidXRmLThcIjtcbiBcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIjtcbiBcdFx0O1xuIFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdChyZXF1ZXN0VGltZW91dCkge1xuIFx0XHRyZXF1ZXN0VGltZW91dCA9IHJlcXVlc3RUaW1lb3V0IHx8IDEwMDAwO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0aWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xuIFx0XHRcdH1cbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiBcdFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xuIFx0XHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcbiBcdFx0XHRcdHJlcXVlc3QudGltZW91dCA9IHJlcXVlc3RUaW1lb3V0O1xuIFx0XHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuIFx0XHRcdFx0aWYgKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XG4gXHRcdFx0XHRcdC8vIHRpbWVvdXRcbiBcdFx0XHRcdFx0cmVqZWN0KFxuIFx0XHRcdFx0XHRcdG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIHRpbWVkIG91dC5cIilcbiBcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xuIFx0XHRcdFx0XHQvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG4gXHRcdFx0XHRcdHJlc29sdmUoKTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XG4gXHRcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcbiBcdFx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIGZhaWxlZC5cIikpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0Ly8gc3VjY2Vzc1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuIFx0XHRcdFx0XHRcdHJlamVjdChlKTtcbiBcdFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0cmVzb2x2ZSh1cGRhdGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcImUzNzljZTJmNTlhMWM3ZWNkNDNlXCI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0aWYgKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiBcdFx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuIFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcbiBcdFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuIFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcbiBcdFx0XHRcdFx0XHRyZXF1ZXN0ICtcbiBcdFx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuIFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHQpO1xuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XG4gXHRcdH07XG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH0sXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9O1xuIFx0XHRmb3IgKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwiZVwiICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcInRcIlxuIFx0XHRcdCkge1xuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInJlYWR5XCIpIGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR0aHJvdyBlcnI7XG4gXHRcdFx0fSk7XG5cbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XG4gXHRcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xuIFx0XHRcdFx0XHRpZiAoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdFx0Zm4udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdFx0aWYgKG1vZGUgJiAxKSB2YWx1ZSA9IGZuKHZhbHVlKTtcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy50KHZhbHVlLCBtb2RlICYgfjEpO1xuIFx0XHR9O1xuIFx0XHRyZXR1cm4gZm47XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBob3QgPSB7XG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcblxuIFx0XHRcdC8vIE1vZHVsZSBBUElcbiBcdFx0XHRhY3RpdmU6IHRydWUsXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGRlcCA9PT0gXCJ1bmRlZmluZWRcIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0XHRlbHNlIGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0fSxcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgZGVwID09PSBcInVuZGVmaW5lZFwiKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAraWQgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdH1cbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XG4gXHRcdFx0aWYgKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHRmb3IodmFyIGNodW5rSWQgaW4gaW5zdGFsbGVkQ2h1bmtzKVxuIFx0XHRcdHtcbiBcdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbG9uZS1ibG9ja3NcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCkubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmICghbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCkgY29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdClcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm90IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwiaW5kZXhcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goW1wiLi9zcmMvaW5kZXguanNcIixcInZlbmRvclwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxyXFxuLyog5pel5Y6G5pW05L2T5qC35byPXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuI2NhbGVuZGFyLWNvbnRhaW5lciB7XFxyXFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gICAgdG9wOiAwO1xcclxcbiAgICBsZWZ0OiA4cHg7XFxyXFxuICAgIHJpZ2h0OiA4cHg7XFxyXFxuICAgIGJvdHRvbTogOHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZmMtaGVhZGVyLXRvb2xiYXIge1xcclxcbiAgICAvKlxcclxcbiAgICB0aGUgY2FsZW5kYXIgd2lsbCBiZSBidXR0aW5nIHVwIGFnYWluc3QgdGhlIGVkZ2VzLFxcclxcbiAgICBidXQgbGV0J3Mgc2Nvb3QgaW4gdGhlIGhlYWRlcidzIGJ1dHRvbnNcXHJcXG4gICAgKi9cXHJcXG4gICAgcGFkZGluZy10b3A6IDE0cHg7XFxyXFxuICAgIHBhZGRpbmctbGVmdDogMDtcXHJcXG4gICAgcGFkZGluZy1yaWdodDogMDtcXHJcXG59XFxyXFxuXFxyXFxuLyog5LqL5Lu25riy5p+TXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuLnRjLWNvbXBsZXRlIHtcXHJcXG4gICAgb3BhY2l0eTogMC4zO1xcclxcblxcclxcbn1cXHJcXG5cXHJcXG4udGMtY29tcGxldGUgPiAuZmMtY29udGVudCB7XFxyXFxuICAgIHRleHQtZGVjb3JhdGlvbjogbGluZS10aHJvdWdoICFpbXBvcnRhbnQ7XFxyXFxufVxcclxcblxcclxcbi50Yy1jb21wbGV0ZTpob3ZlciB7XFxyXFxuICAgIG9wYWNpdHk6IDE7XFxyXFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLyogUG9wb3ZlciDnu4Tku7bmoLflvI9cXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG5cXHJcXG4vKiBQb3BvdmVyIOWuueWZqOWPiuWumuS9jVxcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xcclxcblxcclxcbi50Yy1wb3BvdmVyIHtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICBiYWNrZ3JvdW5kOiAjRkZGO1xcclxcbiAgICBjb2xvcjogYmxhY2s7XFxyXFxuICAgIHdpZHRoOiBhdXRvO1xcclxcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMik7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcXHJcXG4gICAgYm94LXNoYWRvdzogMCAycHggNHB4IHJnYmEoMCwgMCwgMCwgLjIpO1xcclxcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3ZlciAuYXJyb3cge1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgICB3aWR0aDogMjBweDtcXHJcXG4gICAgaGVpZ2h0OiAxMHB4O1xcclxcbiAgICBtYXJnaW46IDAgNnB4O1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3ZlciAuYXJyb3c6OmJlZm9yZSwgLnRjLXBvcG92ZXIgLmFycm93OjphZnRlciB7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcclxcbiAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xcclxcbiAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xcclxcbn1cXHJcXG5cXHJcXG4vKiB0b3Ag5pS+572u5qC35byPXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJ0b3BcXFwiXSB7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwidG9wXFxcIl0gLmFycm93IHtcXHJcXG4gICAgYm90dG9tOiBjYWxjKCgxMHB4ICsgMXB4KSAqIC0xKTtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJ0b3BcXFwiXSAuYXJyb3c6OmJlZm9yZSxcXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInRvcFxcXCJdIC5hcnJvdzo6YWZ0ZXIge1xcclxcbiAgICBib3JkZXItd2lkdGg6IDEwcHggMTBweCAwO1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInRvcFxcXCJdIC5hcnJvdzo6YmVmb3JlIHtcXHJcXG4gICAgYm90dG9tOiAwO1xcclxcbiAgICBib3JkZXItdG9wLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMjUpO1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInRvcFxcXCJdIC5hcnJvdzo6YWZ0ZXIge1xcclxcbiAgICBib3R0b206IDFweDtcXHJcXG4gICAgYm9yZGVyLXRvcC1jb2xvcjogI2ZmZjtcXHJcXG59XFxyXFxuXFxyXFxuLyogcmlnaHQg5pS+572u5qC35byPXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJyaWdodFxcXCJdIHtcXHJcXG4gICAgbWFyZ2luLWxlZnQ6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwicmlnaHRcXFwiXSAuYXJyb3cge1xcclxcbiAgICBsZWZ0OiBjYWxjKCgxMHB4ICsgMXB4KSAqIC0xKTtcXHJcXG4gICAgd2lkdGg6IDEwcHg7XFxyXFxuICAgIGhlaWdodDogMjBweDtcXHJcXG4gICAgbWFyZ2luOiA2cHggMDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJyaWdodFxcXCJdIC5hcnJvdzo6YmVmb3JlLFxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwicmlnaHRcXFwiXSAuYXJyb3c6OmFmdGVyIHtcXHJcXG4gICAgYm9yZGVyLXdpZHRoOiAxMHB4IDEwcHggMTBweCAwO1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcInJpZ2h0XFxcIl0gLmFycm93OjpiZWZvcmUge1xcclxcbiAgICBsZWZ0OiAwO1xcclxcbiAgICBib3JkZXItcmlnaHQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSk7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwicmlnaHRcXFwiXSAuYXJyb3c6OmFmdGVyIHtcXHJcXG4gICAgbGVmdDogMXB4O1xcclxcbiAgICBib3JkZXItcmlnaHQtY29sb3I6ICNmZmY7XFxyXFxufVxcclxcblxcclxcbi8qIGJvdHRvbSDmlL7nva7moLflvI9cXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImJvdHRvbVxcXCJdIHtcXHJcXG4gICAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJib3R0b21cXFwiXSAuYXJyb3cge1xcclxcbiAgICB0b3A6IGNhbGMoKDEwcHggKyAxcHgpICogLTEpO1xcclxcbn1cXHJcXG5cXHJcXG4udGMtcG9wb3Zlclt4LXBsYWNlbWVudF49XFxcImJvdHRvbVxcXCJdIC5hcnJvdzo6YmVmb3JlLFxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwiYm90dG9tXFxcIl0gLmFycm93OjphZnRlciB7XFxyXFxuICAgIGJvcmRlci13aWR0aDogMCAxMHB4IDEwcHggMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJib3R0b21cXFwiXSAuYXJyb3c6OmJlZm9yZSB7XFxyXFxuICAgIHRvcDogMDtcXHJcXG4gICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KTtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJib3R0b21cXFwiXSAuYXJyb3c6OmFmdGVyIHtcXHJcXG4gICAgdG9wOiAxcHg7XFxyXFxuICAgIGJvcmRlci1ib3R0b20tY29sb3I6ICNmN2Y3Zjc7IC8q6L+Z6YeM5Li65LqG5LiT6Zeo6YCC6YWN5pyJ5qCH6aKY6IOM5pmv55qEUG9wb3ZlciovXFxyXFxufVxcclxcblxcclxcbi8qIGxlZnQg5pS+572u5qC35byPXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJsZWZ0XFxcIl0ge1xcclxcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwibGVmdFxcXCJdIC5hcnJvdyB7XFxyXFxuICAgIHJpZ2h0OiBjYWxjKCgxMHB4ICsgMXB4KSAqIC0xKTtcXHJcXG4gICAgd2lkdGg6IDEwcHg7XFxyXFxuICAgIGhlaWdodDogMjBweDtcXHJcXG4gICAgbWFyZ2luOiA2cHggMDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJsZWZ0XFxcIl0gLmFycm93OjpiZWZvcmUsXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJsZWZ0XFxcIl0gLmFycm93OjphZnRlciB7XFxyXFxuICAgIGJvcmRlci13aWR0aDogMTBweCAwIDEwcHggMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRjLXBvcG92ZXJbeC1wbGFjZW1lbnRePVxcXCJsZWZ0XFxcIl0gLmFycm93OjpiZWZvcmUge1xcclxcbiAgICByaWdodDogMDtcXHJcXG4gICAgYm9yZGVyLWxlZnQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSk7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyW3gtcGxhY2VtZW50Xj1cXFwibGVmdFxcXCJdIC5hcnJvdzo6YWZ0ZXIge1xcclxcbiAgICByaWdodDogMXB4O1xcclxcbiAgICBib3JkZXItbGVmdC1jb2xvcjogI2ZmZjtcXHJcXG59XFxyXFxuXFxyXFxuLyogQ29udGVudCDmoIfpopjlkozlhoXlrrlcXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG5cXHJcXG4udGMtcG9wb3Zlci1oZWFkZXIge1xcclxcbiAgICBwYWRkaW5nOiAuNXJlbSAuNzVyZW07XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IDA7XFxyXFxuICAgIGZvbnQtc2l6ZTogMXJlbTtcXHJcXG4gICAgY29sb3I6IGluaGVyaXQ7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmN2Y3Zjc7XFxyXFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZWJlYmViO1xcclxcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA2cHg7XFxyXFxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA2cHg7XFxyXFxufVxcclxcblxcclxcbi50Yy1wb3BvdmVyLWJvZHkge1xcclxcbiAgICBwYWRkaW5nOiAxMHB4IDE1cHg7XFxyXFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiI3RjLWVkaXRwb3BwZXItZXZlbnR0aXRsZSB7XFxyXFxuICAgIGJvcmRlci13aWR0aDogMXB4O1xcclxcbiAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXHJcXG4gICAgcGFkZGluZzogMDtcXHJcXG4gICAgbWFyZ2luOiAwO1xcclxcbiAgICBmb250LXNpemU6IDEuMmVtO1xcclxcbiAgICBmb250LXdlaWdodDogYm9sZDtcXHJcXG59XFxyXFxuXFxyXFxuI3RjLWVkaXRwb3BwZXItZXZlbnR0aXRsZTpmb2N1cyxcXHJcXG4jdGMtZWRpdHBvcHBlci1ldmVudHRpdGxlOmhvdmVyIHtcXHJcXG4gICAgb3V0bGluZTogbm9uZTtcXHJcXG4gICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogYmxhY2s7IFxcclxcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcImh0bWwsIGJvZHkge1xcclxcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcclxcbiAgICBmb250LXNpemU6IDE0cHg7XFxyXFxufVxcclxcblxcclxcbjpmb2N1cyB7XFxyXFxuICAgIG91dGxpbmU6bm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLyogRm9udHMuY3NzIC0tIOi3qOW5s+WPsOS4reaWh+Wtl+S9k+ino+WGs+aWueahiFxcclxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG4uZm9udC1oZWkge2ZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBcXFwiTm90byBTYW5zXFxcIiwgXFxcIkhlbHZldGljYSBOZXVlXFxcIiwgSGVsdmV0aWNhLCBcXFwiTmltYnVzIFNhbnMgTFxcXCIsIEFyaWFsLCBcXFwiTGliZXJhdGlvbiBTYW5zXFxcIiwgXFxcIlBpbmdGYW5nIFNDXFxcIiwgXFxcIkhpcmFnaW5vIFNhbnMgR0JcXFwiLCBcXFwiTm90byBTYW5zIENKSyBTQ1xcXCIsIFxcXCJTb3VyY2UgSGFuIFNhbnMgU0NcXFwiLCBcXFwiU291cmNlIEhhbiBTYW5zIENOXFxcIiwgXFxcIk1pY3Jvc29mdCBZYUhlaVxcXCIsIFxcXCJXZW5xdWFueWkgTWljcm8gSGVpXFxcIiwgXFxcIldlblF1YW5ZaSBaZW4gSGVpXFxcIiwgXFxcIlNUIEhlaXRpXFxcIiwgU2ltSGVpLCBcXFwiV2VuUXVhbllpIFplbiBIZWkgU2hhcnBcXFwiLCBzYW5zLXNlcmlmO31cXHJcXG4uZm9udC1rYWkge2ZvbnQtZmFtaWx5OiBCYXNrZXJ2aWxsZSwgR2VvcmdpYSwgXFxcIkxpYmVyYXRpb24gU2VyaWZcXFwiLCBcXFwiS2FpdGkgU0NcXFwiLCBTVEthaXRpLCBcXFwiQVIgUEwgVUthaSBDTlxcXCIsIFxcXCJBUiBQTCBVS2FpIEhLXFxcIiwgXFxcIkFSIFBMIFVLYWkgVFdcXFwiLCBcXFwiQVIgUEwgVUthaSBUVyBNQkVcXFwiLCBcXFwiQVIgUEwgS2FpdGlNIEdCXFxcIiwgS2FpVGksIEthaVRpX0dCMjMxMiwgREZLYWktU0IsIFxcXCJUVy1LYWlcXFwiLCBzZXJpZjt9XFxyXFxuLmZvbnQtc29uZyB7Zm9udC1mYW1pbHk6IEdlb3JnaWEsIFxcXCJOaW1idXMgUm9tYW4gTm85IExcXFwiLCBcXFwiU29uZ3RpIFNDXFxcIiwgXFxcIk5vdG8gU2VyaWYgQ0pLIFNDXFxcIiwgXFxcIlNvdXJjZSBIYW4gU2VyaWYgU0NcXFwiLCBcXFwiU291cmNlIEhhbiBTZXJpZiBDTlxcXCIsIFNUU29uZywgXFxcIkFSIFBMIE5ldyBTdW5nXFxcIiwgXFxcIkFSIFBMIFN1bmd0aUwgR0JcXFwiLCBOU2ltU3VuLCBTaW1TdW4sIFxcXCJUVy1TdW5nXFxcIiwgXFxcIldlblF1YW5ZaSBCaXRtYXAgU29uZ1xcXCIsIFxcXCJBUiBQTCBVTWluZyBDTlxcXCIsIFxcXCJBUiBQTCBVTWluZyBIS1xcXCIsIFxcXCJBUiBQTCBVTWluZyBUV1xcXCIsIFxcXCJBUiBQTCBVTWluZyBUVyBNQkVcXFwiLCBQTWluZ0xpVSwgTWluZ0xpVSwgc2VyaWY7fVxcclxcbi5mb250LWZhbmctc29uZyB7Zm9udC1mYW1pbHk6IEJhc2tlcnZpbGxlLCBcXFwiVGltZXMgTmV3IFJvbWFuXFxcIiwgXFxcIkxpYmVyYXRpb24gU2VyaWZcXFwiLCBTVEZhbmdzb25nLCBGYW5nU29uZywgRmFuZ1NvbmdfR0IyMzEyLCBcXFwiQ1dURVgtRlxcXCIsIHNlcmlmO31cXHJcXG5cXHJcXG4vKiDkuLTml7bmlL7nva5cXHJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cXHJcXG5cXHJcXG4udWktYnV0dG9uLWljb24tb25seS5zcGxpdGJ1dHRvbi1zZWxlY3Qge1xcclxcbiAgICB3aWR0aDogMWVtO1xcclxcbn1cXHJcXG5cXHJcXG5hW2RhdGEtZ290b10ge1xcclxcbiAgICBjb2xvcjogIzAwMDtcXHJcXG59XFxyXFxuXFxyXFxuLyogQm9vdHN0cmFwIDQg57uE5Lu25qC35byPXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuXFxyXFxuLyog6KGo5Y2VXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXFxyXFxuLmNvbC1mb3JtLWxhYmVsIHtcXHJcXG4gICAgcGFkZGluZy10b3A6IGNhbGMoLjM3NXJlbSArIDFweCk7XFxyXFxuICAgIHBhZGRpbmctYm90dG9tOiBjYWxjKC4zNzVyZW0gKyAxcHgpO1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xcclxcbiAgICBmb250LXNpemU6IGluaGVyaXQ7XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiAxLjU7XFxyXFxufVxcclxcblxcclxcbi5pbnB1dC1ncm91cC1hZGRvbiB7XFxyXFxuICBib3JkZXItbGVmdC13aWR0aDogMDtcXHJcXG4gIGJvcmRlci1yaWdodC13aWR0aDogMDtcXHJcXG59XFxyXFxuLmlucHV0LWdyb3VwLWFkZG9uOmZpcnN0LWNoaWxkIHtcXHJcXG4gIGJvcmRlci1sZWZ0LXdpZHRoOiAxcHg7XFxyXFxufVxcclxcbi5pbnB1dC1ncm91cC1hZGRvbjpsYXN0LWNoaWxkIHtcXHJcXG4gIGJvcmRlci1yaWdodC13aWR0aDogMXB4O1xcclxcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJ2YXIgbWFwID0ge1xuXHRcIi4vYWZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FmLmpzXCIsXG5cdFwiLi9hZi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYWYuanNcIixcblx0XCIuL2FyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci5qc1wiLFxuXHRcIi4vYXItZHpcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWR6LmpzXCIsXG5cdFwiLi9hci1kei5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItZHouanNcIixcblx0XCIuL2FyLWt3XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1rdy5qc1wiLFxuXHRcIi4vYXIta3cuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWt3LmpzXCIsXG5cdFwiLi9hci1seVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItbHkuanNcIixcblx0XCIuL2FyLWx5LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1seS5qc1wiLFxuXHRcIi4vYXItbWFcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLW1hLmpzXCIsXG5cdFwiLi9hci1tYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItbWEuanNcIixcblx0XCIuL2FyLXNhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1zYS5qc1wiLFxuXHRcIi4vYXItc2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLXNhLmpzXCIsXG5cdFwiLi9hci10blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItdG4uanNcIixcblx0XCIuL2FyLXRuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci10bi5qc1wiLFxuXHRcIi4vYXIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLmpzXCIsXG5cdFwiLi9helwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXouanNcIixcblx0XCIuL2F6LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hei5qc1wiLFxuXHRcIi4vYmVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JlLmpzXCIsXG5cdFwiLi9iZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYmUuanNcIixcblx0XCIuL2JnXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iZy5qc1wiLFxuXHRcIi4vYmcuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JnLmpzXCIsXG5cdFwiLi9ibVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm0uanNcIixcblx0XCIuL2JtLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ibS5qc1wiLFxuXHRcIi4vYm5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JuLmpzXCIsXG5cdFwiLi9ibi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm4uanNcIixcblx0XCIuL2JvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iby5qc1wiLFxuXHRcIi4vYm8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JvLmpzXCIsXG5cdFwiLi9iclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYnIuanNcIixcblx0XCIuL2JyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ici5qc1wiLFxuXHRcIi4vYnNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JzLmpzXCIsXG5cdFwiLi9icy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYnMuanNcIixcblx0XCIuL2NhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jYS5qc1wiLFxuXHRcIi4vY2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2NhLmpzXCIsXG5cdFwiLi9jc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3MuanNcIixcblx0XCIuL2NzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jcy5qc1wiLFxuXHRcIi4vY3ZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2N2LmpzXCIsXG5cdFwiLi9jdi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3YuanNcIixcblx0XCIuL2N5XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jeS5qc1wiLFxuXHRcIi4vY3kuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2N5LmpzXCIsXG5cdFwiLi9kYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGEuanNcIixcblx0XCIuL2RhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kYS5qc1wiLFxuXHRcIi4vZGVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLmpzXCIsXG5cdFwiLi9kZS1hdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUtYXQuanNcIixcblx0XCIuL2RlLWF0LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS1hdC5qc1wiLFxuXHRcIi4vZGUtY2hcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLWNoLmpzXCIsXG5cdFwiLi9kZS1jaC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUtY2guanNcIixcblx0XCIuL2RlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS5qc1wiLFxuXHRcIi4vZHZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2R2LmpzXCIsXG5cdFwiLi9kdi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZHYuanNcIixcblx0XCIuL2VsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbC5qc1wiLFxuXHRcIi4vZWwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VsLmpzXCIsXG5cdFwiLi9lbi1hdVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tYXUuanNcIixcblx0XCIuL2VuLWF1LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1hdS5qc1wiLFxuXHRcIi4vZW4tY2FcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWNhLmpzXCIsXG5cdFwiLi9lbi1jYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tY2EuanNcIixcblx0XCIuL2VuLWdiXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1nYi5qc1wiLFxuXHRcIi4vZW4tZ2IuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWdiLmpzXCIsXG5cdFwiLi9lbi1pZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4taWUuanNcIixcblx0XCIuL2VuLWllLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1pZS5qc1wiLFxuXHRcIi4vZW4taWxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWlsLmpzXCIsXG5cdFwiLi9lbi1pbC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4taWwuanNcIixcblx0XCIuL2VuLW56XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1uei5qc1wiLFxuXHRcIi4vZW4tbnouanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLW56LmpzXCIsXG5cdFwiLi9lb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW8uanNcIixcblx0XCIuL2VvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lby5qc1wiLFxuXHRcIi4vZXNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLmpzXCIsXG5cdFwiLi9lcy1kb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMtZG8uanNcIixcblx0XCIuL2VzLWRvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy1kby5qc1wiLFxuXHRcIi4vZXMtdXNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLXVzLmpzXCIsXG5cdFwiLi9lcy11cy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMtdXMuanNcIixcblx0XCIuL2VzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy5qc1wiLFxuXHRcIi4vZXRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2V0LmpzXCIsXG5cdFwiLi9ldC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXQuanNcIixcblx0XCIuL2V1XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ldS5qc1wiLFxuXHRcIi4vZXUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2V1LmpzXCIsXG5cdFwiLi9mYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZmEuanNcIixcblx0XCIuL2ZhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mYS5qc1wiLFxuXHRcIi4vZmlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZpLmpzXCIsXG5cdFwiLi9maS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZmkuanNcIixcblx0XCIuL2ZvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mby5qc1wiLFxuXHRcIi4vZm8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZvLmpzXCIsXG5cdFwiLi9mclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnIuanNcIixcblx0XCIuL2ZyLWNhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci1jYS5qc1wiLFxuXHRcIi4vZnItY2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLWNhLmpzXCIsXG5cdFwiLi9mci1jaFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnItY2guanNcIixcblx0XCIuL2ZyLWNoLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci1jaC5qc1wiLFxuXHRcIi4vZnIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLmpzXCIsXG5cdFwiLi9meVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnkuanNcIixcblx0XCIuL2Z5LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9meS5qc1wiLFxuXHRcIi4vZ2RcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dkLmpzXCIsXG5cdFwiLi9nZC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ2QuanNcIixcblx0XCIuL2dsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nbC5qc1wiLFxuXHRcIi4vZ2wuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dsLmpzXCIsXG5cdFwiLi9nb20tbGF0blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ29tLWxhdG4uanNcIixcblx0XCIuL2dvbS1sYXRuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nb20tbGF0bi5qc1wiLFxuXHRcIi4vZ3VcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2d1LmpzXCIsXG5cdFwiLi9ndS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ3UuanNcIixcblx0XCIuL2hlXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oZS5qc1wiLFxuXHRcIi4vaGUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hlLmpzXCIsXG5cdFwiLi9oaVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaGkuanNcIixcblx0XCIuL2hpLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oaS5qc1wiLFxuXHRcIi4vaHJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hyLmpzXCIsXG5cdFwiLi9oci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHIuanNcIixcblx0XCIuL2h1XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9odS5qc1wiLFxuXHRcIi4vaHUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2h1LmpzXCIsXG5cdFwiLi9oeS1hbVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHktYW0uanNcIixcblx0XCIuL2h5LWFtLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oeS1hbS5qc1wiLFxuXHRcIi4vaWRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2lkLmpzXCIsXG5cdFwiLi9pZC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaWQuanNcIixcblx0XCIuL2lzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pcy5qc1wiLFxuXHRcIi4vaXMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2lzLmpzXCIsXG5cdFwiLi9pdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaXQuanNcIixcblx0XCIuL2l0LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pdC5qc1wiLFxuXHRcIi4vamFcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2phLmpzXCIsXG5cdFwiLi9qYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvamEuanNcIixcblx0XCIuL2p2XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9qdi5qc1wiLFxuXHRcIi4vanYuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2p2LmpzXCIsXG5cdFwiLi9rYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva2EuanNcIixcblx0XCIuL2thLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rYS5qc1wiLFxuXHRcIi4va2tcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2trLmpzXCIsXG5cdFwiLi9ray5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva2suanNcIixcblx0XCIuL2ttXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rbS5qc1wiLFxuXHRcIi4va20uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ttLmpzXCIsXG5cdFwiLi9rblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva24uanNcIixcblx0XCIuL2tuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rbi5qc1wiLFxuXHRcIi4va29cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2tvLmpzXCIsXG5cdFwiLi9rby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva28uanNcIixcblx0XCIuL2t5XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9reS5qc1wiLFxuXHRcIi4va3kuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2t5LmpzXCIsXG5cdFwiLi9sYlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbGIuanNcIixcblx0XCIuL2xiLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sYi5qc1wiLFxuXHRcIi4vbG9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2xvLmpzXCIsXG5cdFwiLi9sby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbG8uanNcIixcblx0XCIuL2x0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sdC5qc1wiLFxuXHRcIi4vbHQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2x0LmpzXCIsXG5cdFwiLi9sdlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbHYuanNcIixcblx0XCIuL2x2LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sdi5qc1wiLFxuXHRcIi4vbWVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21lLmpzXCIsXG5cdFwiLi9tZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWUuanNcIixcblx0XCIuL21pXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9taS5qc1wiLFxuXHRcIi4vbWkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21pLmpzXCIsXG5cdFwiLi9ta1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWsuanNcIixcblx0XCIuL21rLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tay5qc1wiLFxuXHRcIi4vbWxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21sLmpzXCIsXG5cdFwiLi9tbC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWwuanNcIixcblx0XCIuL21uXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tbi5qc1wiLFxuXHRcIi4vbW4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21uLmpzXCIsXG5cdFwiLi9tclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXIuanNcIixcblx0XCIuL21yLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tci5qc1wiLFxuXHRcIi4vbXNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21zLmpzXCIsXG5cdFwiLi9tcy1teVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXMtbXkuanNcIixcblx0XCIuL21zLW15LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tcy1teS5qc1wiLFxuXHRcIi4vbXMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21zLmpzXCIsXG5cdFwiLi9tdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXQuanNcIixcblx0XCIuL210LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tdC5qc1wiLFxuXHRcIi4vbXlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL215LmpzXCIsXG5cdFwiLi9teS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXkuanNcIixcblx0XCIuL25iXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9uYi5qc1wiLFxuXHRcIi4vbmIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25iLmpzXCIsXG5cdFwiLi9uZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmUuanNcIixcblx0XCIuL25lLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9uZS5qc1wiLFxuXHRcIi4vbmxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25sLmpzXCIsXG5cdFwiLi9ubC1iZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmwtYmUuanNcIixcblx0XCIuL25sLWJlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubC1iZS5qc1wiLFxuXHRcIi4vbmwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25sLmpzXCIsXG5cdFwiLi9ublwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbm4uanNcIixcblx0XCIuL25uLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubi5qc1wiLFxuXHRcIi4vcGEtaW5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3BhLWluLmpzXCIsXG5cdFwiLi9wYS1pbi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcGEtaW4uanNcIixcblx0XCIuL3BsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wbC5qc1wiLFxuXHRcIi4vcGwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3BsLmpzXCIsXG5cdFwiLi9wdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcHQuanNcIixcblx0XCIuL3B0LWJyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wdC1ici5qc1wiLFxuXHRcIi4vcHQtYnIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3B0LWJyLmpzXCIsXG5cdFwiLi9wdC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcHQuanNcIixcblx0XCIuL3JvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9yby5qc1wiLFxuXHRcIi4vcm8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3JvLmpzXCIsXG5cdFwiLi9ydVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcnUuanNcIixcblx0XCIuL3J1LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ydS5qc1wiLFxuXHRcIi4vc2RcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NkLmpzXCIsXG5cdFwiLi9zZC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2QuanNcIixcblx0XCIuL3NlXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zZS5qc1wiLFxuXHRcIi4vc2UuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NlLmpzXCIsXG5cdFwiLi9zaVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2kuanNcIixcblx0XCIuL3NpLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zaS5qc1wiLFxuXHRcIi4vc2tcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NrLmpzXCIsXG5cdFwiLi9zay5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2suanNcIixcblx0XCIuL3NsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zbC5qc1wiLFxuXHRcIi4vc2wuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NsLmpzXCIsXG5cdFwiLi9zcVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3EuanNcIixcblx0XCIuL3NxLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zcS5qc1wiLFxuXHRcIi4vc3JcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NyLmpzXCIsXG5cdFwiLi9zci1jeXJsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zci1jeXJsLmpzXCIsXG5cdFwiLi9zci1jeXJsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zci1jeXJsLmpzXCIsXG5cdFwiLi9zci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3IuanNcIixcblx0XCIuL3NzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zcy5qc1wiLFxuXHRcIi4vc3MuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NzLmpzXCIsXG5cdFwiLi9zdlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3YuanNcIixcblx0XCIuL3N2LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zdi5qc1wiLFxuXHRcIi4vc3dcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3N3LmpzXCIsXG5cdFwiLi9zdy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3cuanNcIixcblx0XCIuL3RhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90YS5qc1wiLFxuXHRcIi4vdGEuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RhLmpzXCIsXG5cdFwiLi90ZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGUuanNcIixcblx0XCIuL3RlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ZS5qc1wiLFxuXHRcIi4vdGV0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ZXQuanNcIixcblx0XCIuL3RldC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGV0LmpzXCIsXG5cdFwiLi90Z1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGcuanNcIixcblx0XCIuL3RnLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90Zy5qc1wiLFxuXHRcIi4vdGhcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RoLmpzXCIsXG5cdFwiLi90aC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGguanNcIixcblx0XCIuL3RsLXBoXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90bC1waC5qc1wiLFxuXHRcIi4vdGwtcGguanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RsLXBoLmpzXCIsXG5cdFwiLi90bGhcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RsaC5qc1wiLFxuXHRcIi4vdGxoLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90bGguanNcIixcblx0XCIuL3RyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ci5qc1wiLFxuXHRcIi4vdHIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RyLmpzXCIsXG5cdFwiLi90emxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3R6bC5qc1wiLFxuXHRcIi4vdHpsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90emwuanNcIixcblx0XCIuL3R6bVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHptLmpzXCIsXG5cdFwiLi90em0tbGF0blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHptLWxhdG4uanNcIixcblx0XCIuL3R6bS1sYXRuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90em0tbGF0bi5qc1wiLFxuXHRcIi4vdHptLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90em0uanNcIixcblx0XCIuL3VnLWNuXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91Zy1jbi5qc1wiLFxuXHRcIi4vdWctY24uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VnLWNuLmpzXCIsXG5cdFwiLi91a1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdWsuanNcIixcblx0XCIuL3VrLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ay5qc1wiLFxuXHRcIi4vdXJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VyLmpzXCIsXG5cdFwiLi91ci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXIuanNcIixcblx0XCIuL3V6XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ei5qc1wiLFxuXHRcIi4vdXotbGF0blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXotbGF0bi5qc1wiLFxuXHRcIi4vdXotbGF0bi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXotbGF0bi5qc1wiLFxuXHRcIi4vdXouanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3V6LmpzXCIsXG5cdFwiLi92aVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdmkuanNcIixcblx0XCIuL3ZpLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS92aS5qc1wiLFxuXHRcIi4veC1wc2V1ZG9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3gtcHNldWRvLmpzXCIsXG5cdFwiLi94LXBzZXVkby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUveC1wc2V1ZG8uanNcIixcblx0XCIuL3lvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS95by5qc1wiLFxuXHRcIi4veW8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3lvLmpzXCIsXG5cdFwiLi96aC1jblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtY24uanNcIixcblx0XCIuL3poLWNuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC1jbi5qc1wiLFxuXHRcIi4vemgtaGtcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLWhrLmpzXCIsXG5cdFwiLi96aC1oay5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtaGsuanNcIixcblx0XCIuL3poLXR3XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC10dy5qc1wiLFxuXHRcIi4vemgtdHcuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLXR3LmpzXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHZhciBpZCA9IG1hcFtyZXFdO1xuXHRpZighKGlkICsgMSkpIHsgLy8gY2hlY2sgZm9yIG51bWJlciBvciBzdHJpbmdcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIGlkO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZSBzeW5jIHJlY3Vyc2l2ZSBeXFxcXC5cXFxcLy4qJFwiOyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBDYWxlbmRhciBmcm9tICcuL2NvbXBvbmVudHMvQ2FsZW5kYXIvQ2FsZW5kYXInO1xyXG5pbXBvcnQgRXZlbnRQb3BvdmVyIGZyb20gJy4vY29tcG9uZW50cy9FdmVudFBvcG92ZXIvRXZlbnRQb3BvdmVyJztcclxuaW1wb3J0IEV2ZW50TW9kYWwgZnJvbSAnLi9jb21wb25lbnRzL01vZGFsL0V2ZW50TW9kYWwnO1xyXG5pbXBvcnQgRXZlbnRDcmVhdGVNb2RhbCBmcm9tICcuL2NvbXBvbmVudHMvTW9kYWwvRXZlbnRDcmVhdGVNb2RhbCc7XHJcbmltcG9ydCBFdmVudEVkaXRNb2RhbCBmcm9tICcuL2NvbXBvbmVudHMvTW9kYWwvRXZlbnRFZGl0TW9kYWwnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgaXNTaG93aW5nRXZlbnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBpc0VkaXRpbmdFdmVudDogZmFsc2UsXHJcbiAgICAgICAgICAgIGlzQ3JlYXRpbmdFdmVudDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNsaWNrZWRBcmdzOiBudWxsLFxyXG4gICAgICAgICAgICBlZGl0aW5nRXZlbnQ6IG51bGwsXHJcbiAgICAgICAgICAgIHNlbGVjdGVkUmFuZ2U6IG51bGxcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLmhhbmRsZUNhbGVuZGFyUmVuZGVyID0gdGhpcy5oYW5kbGVDYWxlbmRhclJlbmRlci5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlRXZlbnRDbGljayA9IHRoaXMuaGFuZGxlRXZlbnRDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlUG9wb3ZlckhpZGUgPSB0aGlzLmhhbmRsZVBvcG92ZXJIaWRlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVTZWxlY3QgPSB0aGlzLmhhbmRsZVNlbGVjdC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlTW9kYWxDbG9zZSA9IHRoaXMuaGFuZGxlTW9kYWxDbG9zZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlRXZlbnRFZGl0ID0gdGhpcy5oYW5kbGVFdmVudEVkaXQuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDYWxlbmRhclJlbmRlcihlbCkge1xyXG4gICAgICAgIHRoaXMuY2FsZW5kYXIgPSBlbDtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVFdmVudENsaWNrKCBldmVudCwganNFdmVudCwgdmlldyApIHtcclxuICAgICAgICBjb25zdCBhcmdzID0geyBldmVudCwganNFdmVudCwgdmlldyB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGlzU2hvd2luZ0V2ZW50OiB0cnVlLFxyXG4gICAgICAgICAgICBjbGlja2VkQXJnczogYXJnc1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlUG9wb3ZlckhpZGUoKSB7XHJcbiAgICAgICAgLy/mr4/mrKHlh7rnjrDpg73muLLmn5PkuIDkuKrmlrDnmoRQb3BvdmVyXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGlzU2hvd2luZ0V2ZW50OiBmYWxzZVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlU2VsZWN0KCBzdGFydCwgZW5kLCBqc0V2ZW50LCB2aWV3ICkge1xyXG4gICAgICAgIGNvbnN0IGFyZ3MgPSB7c3RhcnQsIGVuZCwganNFdmVudCwgdmlld307XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGlzQ3JlYXRpbmdFdmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgc2VsZWN0ZWRSYW5nZTogYXJnc1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlRXZlbnRFZGl0KGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGlzRWRpdGluZ0V2ZW50OiB0cnVlLFxyXG4gICAgICAgICAgICBlZGl0aW5nRXZlbnQ6IGV2ZW50XHJcbiAgICAgICAgfSkgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZU1vZGFsQ2xvc2UoKSB7XHJcbiAgICAgICAgY29uc3QgJGNhbGVuZGFyID0gJCh0aGlzLmNhbGVuZGFyKTtcclxuICAgICAgICAkY2FsZW5kYXIuZnVsbENhbGVuZGFyKCd1bnNlbGVjdCcpXHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgaXNFZGl0aW5nRXZlbnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBpc0NyZWF0aW5nRXZlbnQ6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGlkPSd3aXotdG9tYXRvLWNhbGVuZGFyJyA+XHJcbiAgICAgICAgICAgICAgICA8Q2FsZW5kYXIgXHJcbiAgICAgICAgICAgICAgICAgICAgb25FdmVudENsaWNrPXt0aGlzLmhhbmRsZUV2ZW50Q2xpY2t9IFxyXG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLmhhbmRsZVNlbGVjdH1cclxuICAgICAgICAgICAgICAgICAgICBvbkNhbGVuZGFyUmVuZGVyPXt0aGlzLmhhbmRsZUNhbGVuZGFyUmVuZGVyfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAhIXRoaXMuc3RhdGUuc2VsZWN0ZWRSYW5nZSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8RXZlbnRDcmVhdGVNb2RhbCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17J2NyZWF0ZScgKyB0aGlzLnN0YXRlLnNlbGVjdGVkUmFuZ2UuanNFdmVudC5wYWdlWH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3c9e3RoaXMuc3RhdGUuaXNDcmVhdGluZ0V2ZW50fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Nb2RhbENsb3NlPXt0aGlzLmhhbmRsZU1vZGFsQ2xvc2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0NyZWF0aW5nRXZlbnQ9e3RoaXMuc3RhdGUuaXNDcmVhdGluZ0V2ZW50fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRSYW5nZT17dGhpcy5zdGF0ZS5zZWxlY3RlZFJhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICEhdGhpcy5zdGF0ZS5lZGl0aW5nRXZlbnQgJiYgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxFdmVudEVkaXRNb2RhbCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17J2VkaXQnICsgdGhpcy5zdGF0ZS5lZGl0aW5nRXZlbnQuaWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93PXt0aGlzLnN0YXRlLmlzRWRpdGluZ0V2ZW50fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Nb2RhbENsb3NlPXt0aGlzLmhhbmRsZU1vZGFsQ2xvc2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0aW5nRXZlbnQ9e3RoaXMuc3RhdGUuZWRpdGluZ0V2ZW50fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICEhdGhpcy5zdGF0ZS5pc1Nob3dpbmdFdmVudCAmJiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgPEV2ZW50UG9wb3ZlciBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17J3BvcG92ZXInICsgdGhpcy5zdGF0ZS5jbGlja2VkQXJncy5ldmVudC5pZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50PXt0aGlzLnN0YXRlLmNsaWNrZWRBcmdzLmV2ZW50fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmZXJlbmNlPXt0aGlzLnN0YXRlLmNsaWNrZWRBcmdzLmpzRXZlbnQudGFyZ2V0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25FZGl0QnRuQ2xpY2s9e3RoaXMuaGFuZGxlRXZlbnRFZGl0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Qb3BvdmVySGlkZT17dGhpcy5oYW5kbGVQb3BvdmVySGlkZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz4gXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9DYWxlbmRhci5jc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vQ2FsZW5kYXIuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9DYWxlbmRhci5jc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IEZ1bGxDYWxlbmRhciBmcm9tICcuL0Z1bGxDYWxlbmRhcic7XHJcbmltcG9ydCAnZnVsbGNhbGVuZGFyLXJlYWN0d3JhcHBlci9kaXN0L2Nzcy9mdWxsY2FsZW5kYXIubWluLmNzcyc7XHJcbmltcG9ydCAnLi9DYWxlbmRhci5jc3MnO1xyXG5pbXBvcnQgV2l6RXZlbnREYXRhTG9hZGVyIGZyb20gJy4uLy4uL21vZGVscy9XaXpFdmVudERhdGFMb2FkZXInXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYWxlbmRhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBldmVudHM6IFtdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGF0YUxvYWRlciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jYWxlbmRhciA9IG51bGw7XHJcbiAgICAgICAgLy/nu5Hlrprlj6Xmn4RcclxuICAgICAgICB0aGlzLmhhbmRsZUZ1bGxDYWxlbmRhclJlbmRlciA9IHRoaXMuaGFuZGxlRnVsbENhbGVuZGFyUmVuZGVyLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5vblZpZXdSZW5kZXIgPSB0aGlzLm9uVmlld1JlbmRlci5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMub25FdmVudFJlbmRlciA9IHRoaXMub25FdmVudFJlbmRlci5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMub25FdmVudERyb3AgPSB0aGlzLm9uRXZlbnREcm9wLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5vbkV2ZW50UmVzaXplID0gdGhpcy5vbkV2ZW50UmVzaXplLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5LqL5Lu25Y+l5p+EXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICBoYW5kbGVGdWxsQ2FsZW5kYXJSZW5kZXIoZWwpIHtcclxuICAgICAgICAvLyBGdWxsQ2FsZW5kYXIg5riy5p+T5LmL5YmN5omn6KGM5q2k5Y+l5p+E77yM5Lyg5YWlRE9NXHJcbiAgICAgICAgdGhpcy5jYWxlbmRhciA9IGVsO1xyXG4gICAgICAgIHRoaXMuZGF0YUxvYWRlciA9IG5ldyBXaXpFdmVudERhdGFMb2FkZXIodGhpcy5jYWxlbmRhcik7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNhbGVuZGFyUmVuZGVyKGVsKTtcclxuICAgIH1cclxuXHJcbiAgICBvblZpZXdSZW5kZXIoIHZpZXcsIGVsZW1lbnQgKSB7XHJcbiAgICAgICAgLy8g5Yi35paw6KeG5Zu+77yM6YeN5paw6I635Y+W5pel5Y6G5LqL5Lu2XHJcbiAgICAgICAgY29uc3QgJGNhbGVuZGFyID0gJCh0aGlzLmNhbGVuZGFyKTtcclxuICAgICAgICBjb25zdCBldmVudFNvdXJjZXMgPSB0aGlzLmRhdGFMb2FkZXIuZ2V0RXZlbnRTb3VyY2VzKCB2aWV3LCBlbGVtZW50ICk7XHJcbiAgICAgICAgJGNhbGVuZGFyLmZ1bGxDYWxlbmRhcigncmVtb3ZlRXZlbnRzJyk7XHJcbiAgICAgICAgZm9yIChsZXQgaT0wIDsgaSA8IGV2ZW50U291cmNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAkY2FsZW5kYXIuZnVsbENhbGVuZGFyKCdhZGRFdmVudFNvdXJjZScsIGV2ZW50U291cmNlc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRXZlbnREcm9wKCBldmVudCwgZGVsdGEsIHJldmVydEZ1bmMsIGpzRXZlbnQsIHVpLCB2aWV3ICkge1xyXG4gICAgICAgIGlmIChldmVudC5pZCl7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YUxvYWRlci51cGRhdGVFdmVudERhdGFPbkRyb3AoZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXZlcnRGdW5jKCk7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgb25FdmVudFJlc2l6ZSggZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldyApIHtcclxuICAgICAgICBpZiAoZXZlbnQuaWQpe1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFMb2FkZXIudXBkYXRlRXZlbnREYXRhT25SZXNpemUoZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV2ZXJ0RnVuYygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkV2ZW50UmVuZGVyKCBldmVudE9iaiwgJGVsICkge1xyXG4gICAgICAgIC8vIOiuvue9ruaWh+acrOminOiJslxyXG4gICAgICAgIGNvbnN0IHJnYlN0cmluZyA9ICRlbC5jc3MoJ2JhY2tncm91bmQtY29sb3InKTtcclxuICAgICAgICBjb25zdCByZ2JBcnJheSA9IC9ecmdiXFwoKFxcZCopLCAoXFxkKiksIChcXGQqKVxcKSQvLmV4ZWMocmdiU3RyaW5nKTtcclxuICAgICAgICBpZiAocmdiQXJyYXkpIHtcclxuICAgICAgICAgICAgY29uc3QgaHNsID0gcmdiMmhzbChyZ2JBcnJheVsxXSwgcmdiQXJyYXlbMl0sIHJnYkFycmF5WzNdKTtcclxuICAgICAgICAgICAgY29uc3QgbGlnaHRuZXNzID0gaHNsWzJdIC0gTWF0aC5jb3MoIChoc2xbMF0rNzApIC8gMTgwKk1hdGguUEkgKSAqIDAuMTU7XHJcbiAgICAgICAgICAgIGNvbnN0IHRleHRDb2xvciA9IGxpZ2h0bmVzcyA+IDAuNSA/ICcjMjIyJyA6ICd3aGl0ZSc7XHJcbiAgICAgICAgICAgICRlbC5jc3MoJ2NvbG9yJywgdGV4dENvbG9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5YWD57Sg5bey57uP5riy5p+T77yM5Y+v5L+u5pS55YWD57SgXHJcbiAgICAgICAgY29uc3QgaXNDb21wbGV0ZSA9IHBhcnNlSW50KGV2ZW50T2JqLmNvbXBsZXRlKSA9PSA1O1xyXG4gICAgICAgIGlmICggaXNDb21wbGV0ZSApIHtcclxuICAgICAgICAgICAgLy8g5qC35byPXHJcbiAgICAgICAgICAgICRlbC5hZGRDbGFzcygndGMtY29tcGxldGUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiBcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDorr7nva7kuovku7blj6Xmn4RcclxuICAgICAgICAgKiDlm6DkuLpmdWxsY2FsZW5kYXItcmVhY3RXcmFwcGVy55qE5a6e546w5piv55u05o6l6L+U5ZuePGRpdiBpZD0nZnVsbGNhbGVuZGFyJz48L2Rpdj5cclxuICAgICAgICAgKiDlubbkuJTosIPnlKgkKCcjZnVsbGNhbGVuZGFyJykuZnVsbGNhbGVuZGFyKHRoaXMucHJvcHMp6L+b6KGM5p6E5bu677yM5Zug5q2kUmVhY3TlubbmsqHmnIlcclxuICAgICAgICAgKiDnrqHnkIZGdWxsQ2FsZW5kYXLnirbmgIHlkozmuLLmn5PnmoTog73lipvjgILmiYDku6Xnm7TmjqXlnKjorr7nva7kuK3lgZrlpb1jYWxsYmFja++8jOiuqeaPkuS7tuiHquaIkeeuoeeQhuOAglxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJjYWxlbmRhci1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgIDxGdWxsQ2FsZW5kYXIgb25GdWxsQ2FsZW5kYXJSZW5kZXIgPSB7dGhpcy5oYW5kbGVGdWxsQ2FsZW5kYXJSZW5kZXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5Z+65pys6YWN572uXHJcbiAgICAgICAgICAgICAgICAgICAgaWQgPSBcImNhbGVuZGFyXCJcclxuICAgICAgICAgICAgICAgICAgICB0aGVtZVN5c3RlbSA9ICdzdGFuZGFyZCdcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQgPSAncGFyZW50J1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlciA9IHt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6ICdwcmV2LG5leHQsdG9kYXknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjZW50ZXI6ICd0aXRsZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAnbW9udGgsYWdlbmRhV2VlayxhZ2VuZGFEYXksbGlzdFdlZWsnXHJcbiAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAvLyDkuK3mlofljJZcclxuICAgICAgICAgICAgICAgICAgICBidXR0b25UZXh0ID0ge3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9kYXk6ICfku4rlpKknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aDogJ+aciCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlZWs6ICflkagnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXk6ICfml6UnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0OiAn6KGoJ1xyXG4gICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgbW9udGhOYW1lcyA9IHtbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcx5pyIJywgJzLmnIgnLCAnM+aciCcsICc05pyIJywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc15pyIJywgJzbmnIgnLCAnN+aciCcsICc45pyIJywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc55pyIJywgJzEw5pyIJywgJzEx5pyIJywgJzEy5pyIJ1xyXG4gICAgICAgICAgICAgICAgICAgIF19XHJcbiAgICAgICAgICAgICAgICAgICAgbW9udGhOYW1lc1Nob3J0ID0ge1tcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzHmnIgnLCAnMuaciCcsICcz5pyIJywgJzTmnIgnLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzXmnIgnLCAnNuaciCcsICc35pyIJywgJzjmnIgnLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgJznmnIgnLCAnMTDmnIgnLCAnMTHmnIgnLCAnMTLmnIgnXHJcbiAgICAgICAgICAgICAgICAgICAgXX1cclxuICAgICAgICAgICAgICAgICAgICBkYXlOYW1lcyA9IHtbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICflkajml6UnLCAn5ZGo5LiAJywgJ+WRqOS6jCcsICflkajkuIknLCAn5ZGo5ZubJywgJ+WRqOS6lCcsICflkajlha0nXHJcbiAgICAgICAgICAgICAgICAgICAgXX1cclxuICAgICAgICAgICAgICAgICAgICBkYXlOYW1lc1Nob3J0ID0ge1tcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ+WRqOaXpScsICflkajkuIAnLCAn5ZGo5LqMJywgJ+WRqOS4iScsICflkajlm5snLCAn5ZGo5LqUJywgJ+WRqOWFrSdcclxuICAgICAgICAgICAgICAgICAgICBdfVxyXG4gICAgICAgICAgICAgICAgICAgIGFsbERheVRleHQgPSAn5YWo5aSpJ1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOiuvue9ruinhuWbvlxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWaWV3ID0gJ2FnZW5kYVdlZWsnXHJcbiAgICAgICAgICAgICAgICAgICAgbm93SW5kaWNhdG9yID0ge3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3REYXkgPSB7MX1cclxuICAgICAgICAgICAgICAgICAgICB2aWV3cyA9IHt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFnZW5kYToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluVGltZTogXCIwODowMDowMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xvdExhYmVsRm9ybWF0OiAnaCg6bW0pIGEnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgbmF2TGlua3M9IHt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgIGFsbERheURlZmF1bHQgPSB7ZmFsc2V9XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRMaW1pdD0ge3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6K6+572u5LqL5Lu2XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0YWJsZSA9IHt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdEhlbHBlciA9IHt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRhYmxlID0ge3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yY2VFdmVudER1cmF0aW9uID0ge3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6K6+572uVUlcclxuICAgICAgICAgICAgICAgICAgICB1bnNlbGVjdENhbmNlbCA9ICcubW9kYWwgKidcclxuICAgICAgICAgICAgICAgICAgICBkcmFnT3BhY2l0eSA9IHt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibW9udGhcIjogLjUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWdlbmRhV2Vla1wiOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFnZW5kYURheVwiOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAvLyDorr7nva7lj6Xmn4RcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3QgPSB7dGhpcy5wcm9wcy5vblNlbGVjdH1cclxuICAgICAgICAgICAgICAgICAgICB2aWV3UmVuZGVyID0ge3RoaXMub25WaWV3UmVuZGVyfVxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50UmVuZGVyID0ge3RoaXMub25FdmVudFJlbmRlcn1cclxuICAgICAgICAgICAgICAgICAgICBldmVudENsaWNrID0ge3RoaXMucHJvcHMub25FdmVudENsaWNrfVxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50RHJvcCA9IHt0aGlzLm9uRXZlbnREcm9wfVxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50UmVzaXplID0ge3RoaXMub25FdmVudFJlc2l6ZX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJnYjJoc2wociwgZywgYikge1xyXG4gICAgciAvPSAyNTU7IGcgLz0gMjU1OyBiIC89IDI1NTtcclxuXHJcbiAgICB2YXIgTSA9IE1hdGgubWF4KHIsIGcsIGIpO1xyXG4gICAgdmFyIG0gPSBNYXRoLm1pbihyLCBnLCBiKTtcclxuICAgIHZhciBDID0gTSAtIG07XHJcbiAgICB2YXIgTCA9IDAuNSooTSArIG0pO1xyXG4gICAgdmFyIFMgPSAoQyA9PT0gMCkgPyAwIDogQy8oMS1NYXRoLmFicygyKkwtMSkpO1xyXG5cclxuICAgIHZhciBoO1xyXG4gICAgaWYgKEMgPT09IDApIGggPSAwOyAvLyBzcGVjJ2QgYXMgdW5kZWZpbmVkLCBidXQgdXN1YWxseSBzZXQgdG8gMFxyXG4gICAgZWxzZSBpZiAoTSA9PT0gcikgaCA9ICgoZy1iKS9DKSAlIDY7XHJcbiAgICBlbHNlIGlmIChNID09PSBnKSBoID0gKChiLXIpL0MpICsgMjtcclxuICAgIGVsc2UgaWYgKE0gPT09IGIpIGggPSAoKHItZykvQykgKyA0O1xyXG5cclxuICAgIHZhciBIID0gNjAgKiBoO1xyXG5cclxuICAgIC8vIOWIhuWIq+aYr2h1ZSwgc2F0LCBsdW1cclxuICAgIHJldHVybiBbSCwgcGFyc2VGbG9hdChTKSwgcGFyc2VGbG9hdChMKV07XHJcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgJCBmcm9tIFwianF1ZXJ5XCI7XHJcbmltcG9ydCBmdWxsQ2FsZW5kYXIgZnJvbSBcImZ1bGxjYWxlbmRhclwiO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcblxyXG5jbGFzcyBGdWxsY2FsZW5kYXJPYmplY3RNYXBwZXJ7XHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHJcblx0fVxyXG5cclxuXHRnZXRTZXR0aW5ncyhwcm9wZXJ0aWVzKXtcclxuXHRcdGxldCBuZXdTZXR0aW5ncyA9IHt9O1xyXG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gcHJvcGVydGllcykge1xyXG4gICAgICBcdFx0aWYgKHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgIFx0XHRuZXdTZXR0aW5nc1trZXldID0gcHJvcGVydGllc1trZXldO1xyXG4gICAgICBcdFx0fVxyXG4gICAgXHR9XHJcbiAgICBcdHJldHVybiBuZXdTZXR0aW5ncztcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZ1bGxDYWxlbmRhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMuanEgPSAkLm5vQ29uZmxpY3QoKTtcclxuXHRcdHRoaXMuZnVsbGNhbGVuZGFyT2JqZWN0TWFwcGVyID0gbmV3IEZ1bGxjYWxlbmRhck9iamVjdE1hcHBlcigpO1xyXG5cdFx0dGhpcy5pbnN0YW5jZSA9IG51bGw7XHJcblx0XHR0aGlzLmRhdGUgPSBuZXcgRGF0ZSgpO1xyXG5cdH1cclxuXHJcblx0Y29tcG9uZW50RGlkTW91bnQoKXtcclxuXHRcdHRoaXMucHJvcHMub25GdWxsQ2FsZW5kYXJSZW5kZXIodGhpcy5lbCk7XHJcblx0XHRjb25zdCBvYmplY3RNYXBwZXJTZXR0aW5ncyA9IHRoaXMuZnVsbGNhbGVuZGFyT2JqZWN0TWFwcGVyLmdldFNldHRpbmdzKHRoaXMucHJvcHMpO1xyXG5cdFx0dGhpcy5pbnN0YW5jZSA9IHRoaXMuanEodGhpcy5lbCkuZnVsbENhbGVuZGFyKG9iamVjdE1hcHBlclNldHRpbmdzKTtcclxuXHR9XHJcblxyXG4gIFx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xyXG5cdFx0ICBcclxuXHR9XHJcblxyXG5cdHJlbmRlcigpe1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgaWQ9J2NhbGVuZGFyJyByZWY9eyBlbCA9PiB0aGlzLmVsID0gZWwgfT48L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcbn0iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9FdmVudFBvcG92ZXIuY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL0V2ZW50UG9wb3Zlci5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL0V2ZW50UG9wb3Zlci5jc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgJy4vRXZlbnRQb3BvdmVyLmNzcyc7XHJcbmltcG9ydCBQb3BwZXIgZnJvbSAncG9wcGVyLmpzJztcclxuaW1wb3J0IFBvcG92ZXJUaXRsZUlucHV0IGZyb20gJy4vUG9wb3ZlclRpdGxlSW5wdXQnO1xyXG5pbXBvcnQgUG9wb3ZlclRvb2xiYXIgZnJvbSAnLi9Qb3BvdmVyVG9vbGJhcic7XHJcbmltcG9ydCBFdmVudEhhbmRsZXMgZnJvbSAnLi4vLi4vbW9kZWxzL0V2ZW50SGFuZGxlcyc7XHJcbmltcG9ydCB7IEZvcm0sIEdseXBoaWNvbiB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcbmltcG9ydCBEYXRlVGltZVBpY2tlckdyb3VwIGZyb20gJy4uL0Zvcm0vRGF0ZVRpbWVQaWNrZXJHcm91cCc7XHJcbmltcG9ydCBDb2xvclBpY2tlckdyb3VwIGZyb20gJy4uL0Zvcm0vQ29sb3JQaWNrZXJHcm91cCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudFBvcG92ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5wb3BwZXJOb2RlID0gbnVsbDtcclxuICAgICAgICB0aGlzLnBvcHBlckluc3RhbmNlID0gbnVsbDtcclxuICAgICAgICB0aGlzLmV2ZW50SGFuZGxlcyA9IG5ldyBFdmVudEhhbmRsZXMoKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIG5ld0V2ZW50RGF0YToge31cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g57uR5a6a5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5hdXRvSGlkZSA9IHRoaXMuYXV0b0hpZGUuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZURhdGVUaW1lQ2hhbmdlID0gdGhpcy5oYW5kbGVEYXRlVGltZUNoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlVGl0bGVDaGFuZ2UgPSB0aGlzLmhhbmRsZVRpdGxlQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVDb2xvckNoYW5nZSA9IHRoaXMuaGFuZGxlQ29sb3JDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUJ0bkNsaWNrID0gdGhpcy5oYW5kbGVCdG5DbGljay5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOWKqOeUu+aViOaenFxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgYXV0b0hpZGUoZSkge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgLy8g5LiN5piv5pel5Y6G5LqL5Lu25YWD57SgXHJcbiAgICAgICAgICAgICEkKHRoaXMucHJvcHMucmVmZXJlbmNlKS5pcyhlLnRhcmdldCkgJiZcclxuICAgICAgICAgICAgLy8g5Lmf5LiN5piv5a2Q5YWD57SgXHJcbiAgICAgICAgICAgICQodGhpcy5wcm9wcy5yZWZlcmVuY2UpLmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwICYmXHJcbiAgICAgICAgICAgIC8vIOS4jeaYr3BvcHBlcuWFg+e0oFxyXG4gICAgICAgICAgICAhJCh0aGlzLnBvcHBlck5vZGUpLmlzKGUudGFyZ2V0KSAmJlxyXG4gICAgICAgICAgICAvLyDkuZ/kuI3mmK/lrZDlhYPntKBcclxuICAgICAgICAgICAgJCh0aGlzLnBvcHBlck5vZGUpLmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoaWRlKCkge1xyXG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xyXG4gICAgICAgICAgICAkKHRoYXQucG9wcGVyTm9kZSkuaGlkZSgwLCBudWxsLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgdGhhdC5wcm9wcy5vblBvcG92ZXJIaWRlKCk7IC8vVE9ETzog5Lqk55Sx54i25YWD57Sg5Y246L296K+l57uE5Lu25a6e5L6L77yM5oSf6KeJ6L+Z6YeM5LiN5aalXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc2hvdygpIHtcclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcclxuICAgICAgICAgICAgJCh0aGF0LnBvcHBlck5vZGUpLmZhZGVJbigzNTAsIG51bGwsIHJlc29sdmUpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8g5LqL5Lu25Y+l5p+EXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICBoYW5kbGVUaXRsZUNoYW5nZShlKSB7XHJcbiAgICAgICAgLy/lgqjlrZjliLDlsIbmlrDnmoTlgLzlgqjlrZhuZXdFdmVudERhdGHph4zvvIzlvZPkv53lrZjml7bmo4DntKJuZXdFdmVudERhdGHliJfooahcclxuICAgICAgICBjb25zdCBuZXdUaXRsZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoZnVuY3Rpb24ocHJldlN0YXRlLCBwcm9wcykge1xyXG4gICAgICAgICAgICAvL+aLt+i0neWJjeS4gOS4quWvueixoVxyXG4gICAgICAgICAgICBjb25zdCBuZXdFdmVudERhdGEgPSAkLmV4dGVuZCh7fSwgcHJldlN0YXRlLm5ld0V2ZW50RGF0YSlcclxuICAgICAgICAgICAgbmV3RXZlbnREYXRhLnRpdGxlID0gbmV3VGl0bGU7XHJcbiAgICAgICAgICAgIHJldHVybiB7IG5ld0V2ZW50RGF0YSB9O1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQ29sb3JDaGFuZ2UoY29sb3JWYWx1ZSkge1xyXG4gICAgICAgIGNvbnN0IG5ld0NvbG9yID0gY29sb3JWYWx1ZTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKGZ1bmN0aW9uKHByZXZTdGF0ZSwgcHJvcHMpIHtcclxuICAgICAgICAgICAgLy/mi7fotJ3liY3kuIDkuKrlr7nosaFcclxuICAgICAgICAgICAgY29uc3QgbmV3RXZlbnREYXRhID0gJC5leHRlbmQoe30sIHByZXZTdGF0ZS5uZXdFdmVudERhdGEpXHJcbiAgICAgICAgICAgIG5ld0V2ZW50RGF0YS5iYWNrZ3JvdW5kQ29sb3IgPSBuZXdDb2xvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHsgbmV3RXZlbnREYXRhIH07XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVEYXRlVGltZUNoYW5nZShlKSB7XHJcbiAgICAgICAgLy/mmoLml7bkuI3lhYHorrjmm7TmlLlcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVCdG5DbGljayhlKSB7XHJcbiAgICAgICAgY29uc3QgaWQgPSBlLnRhcmdldC5pZDtcclxuICAgICAgICBjb25zdCBidG5UeXBlID0gaWQuc3BsaXQoJy0nKVsyXTtcclxuICAgICAgICBjb25zdCBoYW5kbGVOYW1lID0gYG9uJHtidG5UeXBlfUJ0bkNsaWNrYFxyXG4gICAgICAgIHRoaXMuaGlkZSgpLnRoZW4oIChyZXQpID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoKGhhbmRsZU5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ29uRWRpdEJ0bkNsaWNrJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uRWRpdEJ0bkNsaWNrKHRoaXMucHJvcHMuZXZlbnQpOyAvL+S6pOeUseeItuWFg+e0oFxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50SGFuZGxlc1toYW5kbGVOYW1lXSh0aGlzLnByb3BzLmV2ZW50LCB0aGlzLnN0YXRlLm5ld0V2ZW50RGF0YSlcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOeUn+WRveWRqOacn1xyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgLy8g5Yid5aeL5YyW57uE5Lu2XHJcbiAgICAgICAgdGhpcy5wb3BwZXJJbnN0YW5jZSA9IG5ldyBQb3BwZXIodGhpcy5wcm9wcy5yZWZlcmVuY2UsIHRoaXMucG9wcGVyTm9kZSwge1xyXG5cdFx0XHRwbGFjZW1lbnQ6ICdhdXRvJyxcclxuXHRcdFx0bW9kaWZpZXJzOiB7XHJcblx0XHRcdFx0YXJyb3c6IHtcclxuXHRcdFx0XHQgIGVsZW1lbnQ6ICcuYXJyb3cnXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0fSk7XHJcbiAgICAgICAgLy8g6K6+572u6Ieq5Yqo6ZqQ6JePXHJcbiAgICAgICAgJChkb2N1bWVudCkub2ZmKCdjbGljaycsIHRoaXMuYXV0b0hpZGUpLm9uKCdjbGljaycsIHRoaXMuYXV0b0hpZGUpO1xyXG4gICAgICAgIC8vIOaYvuekulxyXG4gICAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSwgc25hcHNob3QpIHtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xyXG4gICAgICAgIC8vIOW9k+abtOaWsOWxnuaAp+aXtuaJjeinpuWPkeWKqOeUu+aViOaenFxyXG4gICAgICAgIGlmICggbmV4dFByb3BzICE9IHRoaXMucHJvcHMgKSB7XHJcbiAgICAgICAgICAgIC8vIOiuvue9ruabtOaWsOaXtueahOWKqOeUu1xyXG4gICAgICAgICAgICB0aGlzLmhpZGUoKS50aGVuKCAocmV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL+abtOaWsOWumuS9jVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3BwZXJJbnN0YW5jZS5yZWZlcmVuY2UgPSBuZXh0UHJvcHMucmVmZXJlbmNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3BwZXJJbnN0YW5jZS51cGRhdGUoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5zaG93KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgICQoZG9jdW1lbnQpLm9mZignY2xpY2snLCB0aGlzLmF1dG9IaWRlKTtcclxuICAgICAgICB0aGlzLnBvcHBlckluc3RhbmNlLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgZXZlbnRTdGFydCA9IHRoaXMucHJvcHMuZXZlbnQuc3RhcnQuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcbiAgICAgICAgY29uc3QgY29sb3JWYWx1ZSA9IHRoaXMucHJvcHMuZXZlbnQuYmFja2dyb3VuZENvbG9yO1xyXG4gICAgICAgIGNvbnN0IGVuYWJsZVNhdmVCdG4gPSAhIXRoaXMuc3RhdGUubmV3RXZlbnREYXRhLnRpdGxlIHx8ICEhdGhpcy5zdGF0ZS5uZXdFdmVudERhdGEuYmFja2dyb3VuZENvbG9yO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGMtcG9wb3ZlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tkaXNwbGF5OiAnbm9uZSd9fVxyXG4gICAgICAgICAgICAgICAgICAgIHJlZj17KGRpdikgPT4gdGhpcy5wb3BwZXJOb2RlID0gZGl2fSA+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFycm93XCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRjLXBvcG92ZXItaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPFBvcG92ZXJUaXRsZUlucHV0IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9eyd0aXRsZScgKyB0aGlzLnByb3BzLmV2ZW50LmlkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudFRpdGxlPXt0aGlzLnByb3BzLmV2ZW50LnRpdGxlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvblRpdGxlQ2hhbmdlPXt0aGlzLmhhbmRsZVRpdGxlQ2hhbmdlfSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Rm9ybT0ndGMtcG9wb3Zlci1ldmVudC1lZGl0Rm9ybScgLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0Yy1wb3BvdmVyLWJvZHlcIj5cclxuICAgICAgICAgICAgICAgICAgICA8Rm9ybSBob3Jpem9udGFsIGlkPSd0Yy1wb3BvdmVyLWV2ZW50LWVkaXRGb3JtJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPERhdGVUaW1lUGlja2VyR3JvdXAgaG9yaXpvbnRhbCByZWFkT25seSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xJZD0gJ3RjLWVkaXRwb3BwZXItZXZlbnRkYXRlJyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPXs8aSBjbGFzc05hbWU9J2ZhciBmYS1jYWxlbmRhci1hbHQgZmEtbGcnIC8+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2V2ZW50U3RhcnR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRhdGVUaW1lQ2hhbmdlPXt0aGlzLmhhbmRsZURhdGVUaW1lQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q29sb3JQaWNrZXJHcm91cCBob3Jpem9udGFsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXsnYmFja2dyb3VuZENvbG9yJyArIHRoaXMucHJvcHMuZXZlbnQuaWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sSWQ9J3RjLWVkaXRwb3BwZXItZXZlbnRjb2xvcicgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD17PGkgY2xhc3NOYW1lPSdmYXMgZmEtcGFpbnQtYnJ1c2ggZmEtbGcnIC8+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2NvbG9yVmFsdWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNvbG9yQ2hhbmdlPXt0aGlzLmhhbmRsZUNvbG9yQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvRm9ybT5cclxuICAgICAgICAgICAgICAgICAgICA8UG9wb3ZlclRvb2xiYXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGU9e3RoaXMucHJvcHMuZXZlbnQuY29tcGxldGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZVNhdmVCdG49e2VuYWJsZVNhdmVCdG59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQnRuQ2xpY2s9e3RoaXMuaGFuZGxlQnRuQ2xpY2t9XHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vUG9wb3ZlclRpdGxlSW5wdXQuY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL1BvcG92ZXJUaXRsZUlucHV0LmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vUG9wb3ZlclRpdGxlSW5wdXQuY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICcuL1BvcG92ZXJUaXRsZUlucHV0LmNzcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudFRpdGxlSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIC8v5Yid5aeL5YyW54q25oCBXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMucHJvcHMuZXZlbnRUaXRsZVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlID0gdGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDaGFuZ2UoZSkge1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IGUudGFyZ2V0LnZhbHVlfSlcclxuICAgICAgICAvL+WwhuS6i+S7tuS8oOmAkuS4iuWOu1xyXG4gICAgICAgIHRoaXMucHJvcHMub25UaXRsZUNoYW5nZShlKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJ0Yy1lZGl0cG9wcGVyLWV2ZW50dGl0bGVcIiBcclxuICAgICAgICAgICAgICAgIGh0bWxGb3I9e3RoaXMucHJvcHMudGFyZ2V0Rm9ybX1cclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0nZXZlbnR0aXRsZSdcclxuICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfVxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IHsgQnV0dG9uLCBCdXR0b25Hcm91cCwgQnV0dG9uVG9vbGJhciwgU3BsaXRCdXR0b24sIERyb3Bkb3duQnV0dG9uLCBNZW51SXRlbSB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3BvdmVyVG9vbGJhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEJ1dHRvblRvb2xiYXI+XHJcbiAgICAgICAgICAgICAgICA8QnV0dG9uR3JvdXA+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBpZD0ndGMtZWRpdHBvcHBlci1TYXZlJyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5vbkJ0bkNsaWNrfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IXRoaXMucHJvcHMuZW5hYmxlU2F2ZUJ0bn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIOS/neWtmFxyXG4gICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b24gaWQ9J3RjLWVkaXRwb3BwZXItQ29tcGxldGUnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25CdG5DbGlja30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtwYXJzZUludCh0aGlzLnByb3BzLmNvbXBsZXRlKSA9PSA1ID8gJ+aBouWkjScgOiAn5a6M5oiQJ31cclxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGlkPSd0Yy1lZGl0cG9wcGVyLUVkaXQnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25CdG5DbGlja30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIOe8lui+kVxyXG4gICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxTcGxpdEJ1dHRvbiBwdWxsUmlnaHQgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPSfliKDpmaQnIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZD0ndGMtZWRpdHBvcHBlci1EZWxldGVEYXRhJyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5vbkJ0bkNsaWNrfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPE1lbnVJdGVtIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRLZXk9XCIxXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD0ndGMtZWRpdHBvcHBlci1PcGVuRG9jJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5vbkJ0bkNsaWNrfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIOaJk+W8gOa6kOaWh+aho1xyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L01lbnVJdGVtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8TWVudUl0ZW0gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudEtleT1cIjJcIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPSd0Yy1lZGl0cG9wcGVyLURlbGV0ZURvYydcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25CdG5DbGlja30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICDliKDpmaTmupDmlofmoaNcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9NZW51SXRlbT5cclxuICAgICAgICAgICAgICAgICAgICA8L1NwbGl0QnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9CdXR0b25Hcm91cD5cclxuICAgICAgICAgICAgPC9CdXR0b25Ub29sYmFyPlxyXG4gICAgICAgIClcclxuICAgIH1cclxufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCwgQ29udHJvbExhYmVsLCBDb2x9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdXRvRm9ybUdyb3VwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgaXNIb3Jpem9udGFsID0gdGhpcy5wcm9wcy5ob3Jpem9udGFsO1xyXG4gICAgICAgIGlmIChpc0hvcml6b250YWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxGb3JtR3JvdXAgY29udHJvbElkPXt0aGlzLnByb3BzLmNvbnRyb2xJZH0+XHJcbiAgICAgICAgICAgICAgICAgICAgPENvbCBjb21wb25lbnRDbGFzcz17Q29udHJvbExhYmVsfSBzbT17Mn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxhYmVsfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvQ29sPlxyXG4gICAgICAgICAgICAgICAgICAgIDxDb2wgc209ezEwfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XHJcbiAgICAgICAgICAgICAgICAgICAgPC9Db2w+XHJcbiAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8Rm9ybUdyb3VwIGNvbnRyb2xJZD17dGhpcy5wcm9wcy5jb250cm9sSWR9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxDb250cm9sTGFiZWw+e3RoaXMucHJvcHMubGFiZWx9PC9Db250cm9sTGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XHJcbiAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEF1dG9Gb3JtR3JvdXAgZnJvbSAnLi9BdXRvRm9ybUdyb3VwJztcclxuY29uc3QgSHVlYmVlID0gcmVxdWlyZSgnaHVlYmVlL2Rpc3QvaHVlYmVlLnBrZ2QnKTsgXHJcbmltcG9ydCAnaHVlYmVlL2Rpc3QvaHVlYmVlLmNzcyc7XHJcblxyXG5jbGFzcyBDb2xvcklucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLnZhbHVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlID0gdGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDaGFuZ2UoanNFdmVudE9yVmFsdWUpIHtcclxuICAgICAgICBsZXQgbmV3Q29sb3JWYWx1ZTtcclxuICAgICAgICBpZiAoIHR5cGVvZiBqc0V2ZW50T3JWYWx1ZSA9PSAnb2JqZWN0JyApIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IGpzRXZlbnRPclZhbHVlLnRhcmdldC52YWx1ZX0pO1xyXG4gICAgICAgICAgICBuZXdDb2xvclZhbHVlID0ganNFdmVudE9yVmFsdWUudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIHR5cGVvZiBqc0V2ZW50T3JWYWx1ZSA9PSAnc3RyaW5nJyApIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IGpzRXZlbnRPclZhbHVlfSk7XHJcbiAgICAgICAgICAgIG5ld0NvbG9yVmFsdWUgPSBqc0V2ZW50T3JWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNvbG9yQ2hhbmdlKG5ld0NvbG9yVmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vVE9ETzog5qC55o2u6aWx5ZKM5bqm6K6h566X5a2X5L2T6aKc6ImyXHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgLy8g5Yid5aeL5YyW57uE5Lu2XHJcbiAgICAgICAgdGhpcy5odWViZWVJbnN0YW5jZSA9IG5ldyBIdWViZWUodGhpcy5lbCwge1xyXG4gICAgICAgICAgICBzdGF0aWNPcGVuOiBmYWxzZSwgLy8gRGlzcGxheXMgb3BlbiBhbmQgc3RheXMgb3Blbi4gXHJcbiAgICAgICAgICAgIHNldFRleHQ6IHRydWUsIC8vIFNldHMgZWxlbWVudHPigJkgdGV4dCB0byBjb2xvci4g5bCG5Y6f5aeL55qE5paH5pys6K6+572u6K6+572u5oiQ6aKc6Imy5YC8LlxyXG4gICAgICAgICAgICBzZXRCR0NvbG9yOiB0cnVlLCAvLyBTZXRzIGVsZW1lbnRz4oCZIGJhY2tncm91bmQgY29sb3IgdG8gY29sb3IuXHJcbiAgICAgICAgICAgIGh1ZXM6IDEyLCAvLyBOdW1iZXIgb2YgaHVlcyBvZiB0aGUgY29sb3IgZ3JpZC4gSHVlcyBhcmUgc2xpY2VzIG9mIHRoZSBjb2xvciB3aGVlbC5cclxuICAgICAgICAgICAgaHVlMDogMCwgLy8gVGhlIGZpcnN0IGh1ZSBvZiB0aGUgY29sb3IgZ3JpZC4gXHJcbiAgICAgICAgICAgIHNoYWRlczogNSwgLy8gTnVtYmVyIG9mIHNoYWRlcyBvZiBjb2xvcnMgYW5kIHNoYWRlcyBvZiBncmF5IGJldHdlZW4gd2hpdGUgYW5kIGJsYWNrLiBcclxuICAgICAgICAgICAgc2F0dXJhdGlvbnM6IDIsIC8vIE51bWJlciBvZiBzZXRzIG9mIHNhdHVyYXRpb24gb2YgdGhlIGNvbG9yIGdyaWQuXHJcbiAgICAgICAgICAgIG5vdGF0aW9uOiAnaGV4JywgLy8gVGV4dCBzeW50YXggb2YgY29sb3JzIHZhbHVlcy5cclxuICAgICAgICAgICAgY2xhc3NOYW1lOiBudWxsLCAvLyBDbGFzcyBhZGRlZCB0byBIdWViZWUgZWxlbWVudC4gVXNlZnVsIGZvciBDU1MuXHJcbiAgICAgICAgICAgIGN1c3RvbUNvbG9yczogWyBcclxuICAgICAgICAgICAgICAgICcjMzJDRDMyJywgJyM1NDg0RUQnLCAnI0E0QkRGRScsIFxyXG4gICAgICAgICAgICAgICAgJyM0NkQ2REInLCAnIzdBRTdCRicsICcjNTFCNzQ5JyxcclxuICAgICAgICAgICAgICAgICcjRkJENzVCJywgJyNGRkI4NzgnLCAnI0ZGODg3QycsIFxyXG4gICAgICAgICAgICAgICAgJyNEQzIxMjcnLCAnI0RCQURGRicsICcjRTFFMUUxJ1x0XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvL+WIneWni+WMluminOiJslxyXG4gICAgICAgIHRoaXMuaHVlYmVlSW5zdGFuY2Uuc2V0Q29sb3IodGhpcy5wcm9wcy52YWx1ZSk7XHJcbiAgICAgICAgLy/nm5HlkKxodWViZWXpopzoibLpgInmi6lcclxuICAgICAgICB0aGlzLmh1ZWJlZUluc3RhbmNlLm9uKCAnY2hhbmdlJywgdGhpcy5oYW5kbGVDaGFuZ2UpXHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xyXG4gICAgICAgIC8vIOaJi+WKqOabtOaWsHZhbHVlXHJcbiAgICAgICAgdGhpcy5odWViZWVJbnN0YW5jZS5zZXRDb2xvcih0aGlzLnN0YXRlLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICAvL+azqOaEj++8jGh1ZWJlZeayoeaciWRlc3Ryb3nnmoTmlrnms5VcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0nZm9ybS1jb250cm9sJyBcclxuICAgICAgICAgICAgICAgIHJlZj17ZWwgPT4gdGhpcy5lbCA9IGVsfVxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfSAvL+ebkeWQrOmUruebmOi+k+WFpVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgIClcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbG9yUGlja2VyR3JvdXAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2UgPSB0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNoYW5nZShjb2xvclZhbHVlKSB7XHJcbiAgICAgICAgLy/lkJHkuIrkvKDpgJJcclxuICAgICAgICB0aGlzLnByb3BzLm9uQ29sb3JDaGFuZ2UoY29sb3JWYWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHsgaG9yaXpvbnRhbCwgY29udHJvbElkLCBsYWJlbH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxBdXRvRm9ybUdyb3VwIHsuLi57IGhvcml6b250YWwsIGNvbnRyb2xJZCwgbGFiZWwgfX0+XHJcbiAgICAgICAgICAgICAgICA8Q29sb3JJbnB1dCB7Li4udGhpcy5wcm9wc30vPlxyXG4gICAgICAgICAgICA8L0F1dG9Gb3JtR3JvdXA+XHJcbiAgICAgICAgKVxyXG5cclxuICAgIH1cclxufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIENvbnRyb2xMYWJlbCwgQ29sLCBGb3JtQ29udHJvbCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcbmltcG9ydCBBdXRvRm9ybUdyb3VwIGZyb20gJy4vQXV0b0Zvcm1Hcm91cCc7XHJcbmltcG9ydCAnbW9tZW50JztcclxuaW1wb3J0ICdib290c3RyYXAvanMvY29sbGFwc2UnO1xyXG5pbXBvcnQgJ2Jvb3RzdHJhcC9qcy90cmFuc2l0aW9uJztcclxuaW1wb3J0ICdlb25hc2Rhbi1ib290c3RyYXAtZGF0ZXRpbWVwaWNrZXInO1xyXG5pbXBvcnQgJ2VvbmFzZGFuLWJvb3RzdHJhcC1kYXRldGltZXBpY2tlci9idWlsZC9jc3MvYm9vdHN0cmFwLWRhdGV0aW1lcGlja2VyLmNzcyc7XHJcblxyXG5jbGFzcyBEYXRlVGltZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLnZhbHVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlID0gdGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDaGFuZ2UoZSkgeyBcclxuICAgICAgICBjb25zdCBuZXdEYXRlVmFsdWUgPSBlLmRhdGUuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJylcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogbmV3RGF0ZVZhbHVlfSk7XHJcbiAgICAgICAgLy8g5Lyg6YCSXHJcbiAgICAgICAgdGhpcy5wcm9wcy5vbkRhdGVUaW1lQ2hhbmdlKG5ld0RhdGVWYWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgLy8g5Yid5aeL5YyW57uE5Lu2XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucmVhZE9ubHkpIHRoaXMuZWwucmVhZE9ubHkgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuJGVsID0gJCh0aGlzLmVsKS5kYXRldGltZXBpY2tlcih7XHJcbiAgICAgICAgICAgIHNob3dUb2RheUJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgbG9jYWxlOiAnemgtY24nLFxyXG4gICAgICAgICAgICBmb3JtYXQ6ICdZWVlZLU1NLUREIEhIOm1tOnNzJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZSA9IHRoaXMuJGVsLmRhdGEoXCJEYXRlVGltZVBpY2tlclwiKTtcclxuICAgICAgICAvLyDliJ3lp4vljJblgLxcclxuICAgICAgICB0aGlzLmluc3RhbmNlLmRhdGUodGhpcy5wcm9wcy52YWx1ZSk7XHJcbiAgICAgICAgLy8g57uR5a6aY2hhbmdl5LqL5Lu2XHJcbiAgICAgICAgLy8g5pS+5Zyo5Yid5aeL5YyW5ZCO6L+b6KGM57uR5a6a77yM6YG/5YWN5Yid5aeL5YyW6L+H56iL6Kem5Y+RY2hhbmdl5LqL5Lu2XHJcbiAgICAgICAgdGhpcy4kZWwub24oXCJkcC5jaGFuZ2VcIiwgdGhpcy5oYW5kbGVDaGFuZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcclxuICAgICAgICAvLyDmiYvliqjmm7TmlrB2YWx1ZVxyXG4gICAgICAgIHRoaXMuaW5zdGFuY2UuZGF0ZSh0aGlzLnN0YXRlLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICAvLyBkZXN0cm95XHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5kZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy4kZWwub2ZmKFwiZHAuY2hhbmdlXCIsIHRoaXMuaGFuZGxlQ2hhbmdlKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0nZm9ybS1jb250cm9sJyBcclxuICAgICAgICAgICAgICAgIHJlZj17ZWwgPT4gdGhpcy5lbCA9IGVsfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgIClcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGVUaW1lUGlja2VyR3JvdXAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHsgaG9yaXpvbnRhbCwgY29udHJvbElkLCBsYWJlbH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxBdXRvRm9ybUdyb3VwIHsuLi57IGhvcml6b250YWwsIGNvbnRyb2xJZCwgbGFiZWwgfX0+XHJcbiAgICAgICAgICAgICAgICA8RGF0ZVRpbWVJbnB1dCB7Li4udGhpcy5wcm9wc30gLz5cclxuICAgICAgICAgICAgPC9BdXRvRm9ybUdyb3VwPiAgICAgICAgICAgIFxyXG4gICAgICAgIClcclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBSb3csIENvbCwgRm9ybSwgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgQ29udHJvbExhYmVsIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcclxuaW1wb3J0IFRpdGxlSW5wdXRHcm91cCBmcm9tICcuL1RpdGxlSW5wdXRHcm91cCc7XHJcbmltcG9ydCBEYXRlVGltZVBpY2tlckdyb3VwIGZyb20gJy4vRGF0ZVRpbWVQaWNrZXJHcm91cCc7XHJcbmltcG9ydCBDb2xvclBpY2tlckdyb3VwIGZyb20gJy4vQ29sb3JQaWNrZXJHcm91cCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudERldGFpbEZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIC8v55Sx54i257uE5Lu26LSf6LSj5aSE55CG5pWw5o2uXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IGhhbmRsZVRpdGxlQ2hhbmdlID0gdGhpcy5wcm9wcy5vblRpdGxlQ2hhbmdlO1xyXG4gICAgICAgIGNvbnN0IGhhbmRsZVN0YXJ0Q2hhbmdlID0gdGhpcy5wcm9wcy5vblN0YXJ0Q2hhbmdlO1xyXG4gICAgICAgIGNvbnN0IGhhbmRsZUVuZENoYW5nZSA9IHRoaXMucHJvcHMub25FbmRDaGFuZ2U7XHJcbiAgICAgICAgY29uc3QgaGFuZGxlQ29sb3JDaGFuZ2UgPSB0aGlzLnByb3BzLm9uQ29sb3JjaGFuZ2U7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEZvcm0+XHJcbiAgICAgICAgICAgICAgICA8VGl0bGVJbnB1dEdyb3VwIFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Gb2N1c1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xJZD1cInRjLWNyZWF0ZXBhZ2UtZXZlbnR0aXRsZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCLmoIfpophcIlxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLmV2ZW50VGl0bGV9IFxyXG4gICAgICAgICAgICAgICAgICAgIG9uVGl0bGVDaGFuZ2U9e2hhbmRsZVRpdGxlQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDxSb3c+XHJcbiAgICAgICAgICAgICAgICAgICAgPENvbCBzbT17Nn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxEYXRlVGltZVBpY2tlckdyb3VwIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbElkPVwidGMtY3JlYXRlcGFnZS1ldmVudHN0YXJ0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwi5byA5aeL5pel5pyfXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLnN0YXJ0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25EYXRlVGltZUNoYW5nZT17aGFuZGxlU3RhcnRDaGFuZ2V9ICAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvQ29sPlxyXG4gICAgICAgICAgICAgICAgICAgIDxDb2wgc209ezZ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8RGF0ZVRpbWVQaWNrZXJHcm91cCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xJZD1cInRjLWNyZWF0ZXBhZ2UtZXZlbnRlbmRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCLnu5PmnZ/ml6XmnJ9cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMuZW5kfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25EYXRlVGltZUNoYW5nZT17aGFuZGxlRW5kQ2hhbmdlfSAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L0NvbD5cclxuICAgICAgICAgICAgICAgIDwvUm93PlxyXG4gICAgICAgICAgICAgICAgPFJvdz5cclxuICAgICAgICAgICAgICAgICAgICA8Q29sIHNtPXs2fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbG9yUGlja2VyR3JvdXAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sSWQ9XCJ0Yy1jcmVhdGVwYWdlLWV2ZW50Y29sb3JcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCLoibLlvalcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMuYmFja2dyb3VuZENvbG9yfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Db2xvckNoYW5nZT17aGFuZGxlQ29sb3JDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9Db2w+XHJcbiAgICAgICAgICAgICAgICAgICAgPENvbCBzbT17Nn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtR3JvdXAgY29udHJvbElkPVwidGMtY3JlYXRlcGFnZS1ldmVudHRhZ3NcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDb250cm9sTGFiZWw+5qCH562+PC9Db250cm9sTGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2wgcmVhZE9ubHkvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD4gICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIDwvQ29sPlxyXG4gICAgICAgICAgICAgICAgPC9Sb3c+XHJcbiAgICAgICAgICAgICAgICA8Rm9ybUdyb3VwIGNvbnRyb2xJZD1cInRjLWNyZWF0ZXBhZ2UtZXZlbnRyZW1hcmtcIj5cclxuICAgICAgICAgICAgICAgICAgICA8Q29udHJvbExhYmVsPuWkh+azqDwvQ29udHJvbExhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbCByZWFkT25seSBjb21wb25lbnRDbGFzcz1cInRleHRhcmVhXCIgLz5cclxuICAgICAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxyXG4gICAgICAgICAgICA8L0Zvcm0+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcclxuaW1wb3J0IEF1dG9Gb3JtR3JvdXAgZnJvbSAnLi9BdXRvRm9ybUdyb3VwJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpdGxlSW5wdXRHcm91cCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5wcm9wcy52YWx1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlID0gdGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDaGFuZ2UoZSkge1xyXG4gICAgICAgIGNvbnN0IG5ld1RpdGxlID0gZS50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIHZhbHVlOiBuZXdUaXRsZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucHJvcHMub25UaXRsZUNoYW5nZShuZXdUaXRsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHsgaG9yaXpvbnRhbCwgY29udHJvbElkLCBsYWJlbH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxBdXRvRm9ybUdyb3VwIHsuLi57IGhvcml6b250YWwsIGNvbnRyb2xJZCwgbGFiZWwgfX0+XHJcbiAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2xcclxuICAgICAgICAgICAgICAgICAgICBhdXRvRm9jdXM9e3RoaXMucHJvcHMuYXV0b0ZvY3VzfVxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cclxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIuivt+i+k+WFpeagh+mimFwiXHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9BdXRvRm9ybUdyb3VwPlxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBOYXZJdGVtLCBUYWIsIEJ1dHRvbiB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcbmltcG9ydCBFdmVudERldGFpbEZyb20gZnJvbSAnLi4vRm9ybS9FdmVudERldGFpbEZvcm0nO1xyXG5pbXBvcnQgRXZlbnRNb2RhbCBmcm9tICcuL0V2ZW50TW9kYWwnXHJcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuaW1wb3J0IEV2ZW50SGFuZGxlcyBmcm9tICcuLi8uLi9tb2RlbHMvRXZlbnRIYW5kbGVzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRDcmVhdGVNb2RhbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5ldmVudEhhbmRsZXMgPSBuZXcgRXZlbnRIYW5kbGVzKCk7XHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICB0aXRsZTogJycsXHJcbiAgICAgICAgICAgIHN0YXJ0OiB0aGlzLnByb3BzLnNlbGVjdGVkUmFuZ2Uuc3RhcnQuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyksXHJcbiAgICAgICAgICAgIGVuZDogdGhpcy5wcm9wcy5zZWxlY3RlZFJhbmdlLmVuZC5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKSxcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnJ1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuaGFuZGxlVGl0bGVDaGFuZ2UgPSB0aGlzLmhhbmRsZVRpdGxlQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVTdGFydENoYW5nZSA9IHRoaXMuaGFuZGxlU3RhcnRDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUVuZENoYW5nZSA9IHRoaXMuaGFuZGxlRW5kQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVDb2xvckNoYW5nZSA9IHRoaXMuaGFuZGxlQ29sb3JDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUV2ZW50Q3JlYXRlID0gdGhpcy5oYW5kbGVFdmVudENyZWF0ZS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVRpdGxlQ2hhbmdlKG5ld1RpdGxlKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIHRpdGxlOiBuZXdUaXRsZVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlU3RhcnRDaGFuZ2UobmV3RGF0ZVZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIHN0YXJ0OiBuZXdEYXRlVmFsdWVcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUVuZENoYW5nZShuZXdEYXRlVmFsdWUpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgZW5kOiBuZXdEYXRlVmFsdWVcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNvbG9yQ2hhbmdlKG5ld0NvbG9yVmFsdWUpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBuZXdDb2xvclZhbHVlXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVFdmVudENyZWF0ZSgpIHtcclxuICAgICAgICB0aGlzLmV2ZW50SGFuZGxlcy5vbkNyZWF0ZUJ0bkNsaWNrKHRoaXMuc3RhdGUpO1xyXG4gICAgICAgIHRoaXMucHJvcHMub25Nb2RhbENsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHsgc2hvdywgb25Nb2RhbENsb3NlIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiAoIFxyXG4gICAgICAgICAgICA8RXZlbnRNb2RhbCB7Li4ue3Nob3csIG9uTW9kYWxDbG9zZX19PlxyXG4gICAgICAgICAgICAgICAgPEV2ZW50TW9kYWwuTmF2SGVhZGVyIHsuLi57b25Nb2RhbENsb3NlfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPE5hdkl0ZW0gZXZlbnRLZXk9XCIxXCIgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICDml6XnqIvnvJbovpFcclxuICAgICAgICAgICAgICAgICAgICA8L05hdkl0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgPE5hdkl0ZW0gZXZlbnRLZXk9XCIyXCIgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICDph43lpI3op4TliJlcclxuICAgICAgICAgICAgICAgICAgICA8L05hdkl0ZW0+XHJcbiAgICAgICAgICAgICAgICA8L0V2ZW50TW9kYWwuTmF2SGVhZGVyPlxyXG4gICAgICAgICAgICAgICAgPEV2ZW50TW9kYWwuVGFiQm9keT5cclxuICAgICAgICAgICAgICAgICAgICA8VGFiLlBhbmUgZXZlbnRLZXk9XCIxXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxFdmVudERldGFpbEZyb20gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudFRpdGxlPXt0aGlzLnN0YXRlLnRpdGxlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ9e3RoaXMuc3RhdGUuc3RhcnR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQ9e3RoaXMuc3RhdGUuZW5kfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yPXt0aGlzLnN0YXRlLmJhY2tncm91bmRDb2xvcn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5LqL5Lu25Y+l5p+EXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblRpdGxlQ2hhbmdlPXt0aGlzLmhhbmRsZVRpdGxlQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TdGFydENoYW5nZT17dGhpcy5oYW5kbGVTdGFydENoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRW5kQ2hhbmdlPXt0aGlzLmhhbmRsZUVuZENoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29sb3JjaGFuZ2U9e3RoaXMuaGFuZGxlQ29sb3JDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9UYWIuUGFuZT5cclxuICAgICAgICAgICAgICAgICAgICA8VGFiLlBhbmUgZXZlbnRLZXk9XCIyXCI+VGFiIDEgY29udGVudDwvVGFiLlBhbmU+XHJcbiAgICAgICAgICAgICAgICA8L0V2ZW50TW9kYWwuVGFiQm9keT5cclxuICAgICAgICAgICAgICAgIDxFdmVudE1vZGFsLlRvb2xiYXJGb290ZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnNTdHlsZT1cInN1Y2Nlc3NcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUV2ZW50Q3JlYXRlfVxyXG4gICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAg5Yib5bu6XHJcbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXt0aGlzLnByb3BzLm9uTW9kYWxDbG9zZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIOWPlua2iFxyXG4gICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9FdmVudE1vZGFsLlRvb2xiYXJGb290ZXI+XHJcbiAgICAgICAgICAgIDwvRXZlbnRNb2RhbD5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBOYXZJdGVtLCBUYWIsIEJ1dHRvbiwgQnV0dG9uR3JvdXAsIFNwbGl0QnV0dG9uLCBNZW51SXRlbSwgUm93LCBDb2wgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5pbXBvcnQgRXZlbnREZXRhaWxGcm9tIGZyb20gJy4uL0Zvcm0vRXZlbnREZXRhaWxGb3JtJztcclxuaW1wb3J0IEV2ZW50TW9kYWwgZnJvbSAnLi9FdmVudE1vZGFsJ1xyXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcbmltcG9ydCBFdmVudEhhbmRsZXMgZnJvbSAnLi4vLi4vbW9kZWxzL0V2ZW50SGFuZGxlcyc7XHJcblxyXG5jbGFzcyBNb2RhbFRvb2xiYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8Um93PlxyXG4gICAgICAgICAgICAgICAgPENvbCBzbT17N30gc3R5bGU9e3t0ZXh0QWxpZ246ICdsZWZ0J319PlxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b25Hcm91cD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBpZD0ndGMtZWRpdHBhZ2UtU2F2ZScgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBic1N0eWxlPVwiZGFuZ2VyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25CdG5DbGlja31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshdGhpcy5wcm9wcy5lbmFibGVTYXZlQnRufT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIOS/neWtmFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBpZD0ndGMtZWRpdHBhZ2UtQ29tcGxldGUnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQnRuQ2xpY2t9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3BhcnNlSW50KHRoaXMucHJvcHMuY29tcGxldGUpID09IDUgPyAn5oGi5aSNJyA6ICflrozmiJAnfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPSd0Yy1lZGl0cGFnZS1EZWxldGVEYXRhJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5vbkJ0bkNsaWNrfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIOWIoOmZpFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPFNwbGl0QnV0dG9uIHB1bGxSaWdodCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPSfliKDpmaTmupDmlofmoaMnIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9J3RjLWVkaXRwYWdlLURlbGV0ZURvYycgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQnRuQ2xpY2t9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPE1lbnVJdGVtIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50S2V5PVwiMVwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPSd0Yy1lZGl0cGFnZS1PcGVuRG9jJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25CdG5DbGlja30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg5omT5byA5rqQ5paH5qGjXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L01lbnVJdGVtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPE1lbnVJdGVtIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50S2V5PVwiMlwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPSd0Yy1lZGl0cGFnZS1vcGVuRXZlbnREb2MnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5vbkJ0bkNsaWNrfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDnvJbovpHmupDmlbDmja5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTWVudUl0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvU3BsaXRCdXR0b24+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbkdyb3VwPlxyXG4gICAgICAgICAgICAgICAgPC9Db2w+XHJcbiAgICAgICAgICAgICAgICA8Q29sIHNtPXsyfSBzbU9mZnNldD17M30+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXt0aGlzLnByb3BzLm9uTW9kYWxDbG9zZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIOWPlua2iFxyXG4gICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9Db2w+XHJcbiAgICAgICAgICAgIDwvUm93PlxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50RWRpdE1vZGFsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRIYW5kbGVzID0gbmV3IEV2ZW50SGFuZGxlcygpO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgbmV3RXZlbnREYXRhOiB7fVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuaGFuZGxlVGl0bGVDaGFuZ2UgPSB0aGlzLmhhbmRsZVRpdGxlQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVTdGFydENoYW5nZSA9IHRoaXMuaGFuZGxlU3RhcnRDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUVuZENoYW5nZSA9IHRoaXMuaGFuZGxlRW5kQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVDb2xvckNoYW5nZSA9IHRoaXMuaGFuZGxlQ29sb3JDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUJ0bkNsaWNrID0gdGhpcy5oYW5kbGVCdG5DbGljay5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVRpdGxlQ2hhbmdlKG5ld1RpdGxlKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShmdW5jdGlvbihwcmV2U3RhdGUsIHByb3BzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld0V2ZW50RGF0YSA9ICQuZXh0ZW5kKHt9LCBwcmV2U3RhdGUubmV3RXZlbnREYXRhKVxyXG4gICAgICAgICAgICBuZXdFdmVudERhdGEudGl0bGUgPSBuZXdUaXRsZTtcclxuICAgICAgICAgICAgcmV0dXJuIHsgbmV3RXZlbnREYXRhIH07XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVTdGFydENoYW5nZShuZXdEYXRlVmFsdWUpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKGZ1bmN0aW9uKHByZXZTdGF0ZSwgcHJvcHMpIHtcclxuICAgICAgICAgICAgY29uc3QgbmV3RXZlbnREYXRhID0gJC5leHRlbmQoe30sIHByZXZTdGF0ZS5uZXdFdmVudERhdGEpXHJcbiAgICAgICAgICAgIG5ld0V2ZW50RGF0YS5zdGFydCA9IG5ld0RhdGVWYWx1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIHsgbmV3RXZlbnREYXRhIH07XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVFbmRDaGFuZ2UobmV3RGF0ZVZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShmdW5jdGlvbihwcmV2U3RhdGUsIHByb3BzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld0V2ZW50RGF0YSA9ICQuZXh0ZW5kKHt9LCBwcmV2U3RhdGUubmV3RXZlbnREYXRhKVxyXG4gICAgICAgICAgICBuZXdFdmVudERhdGEuZW5kID0gbmV3RGF0ZVZhbHVlO1xyXG4gICAgICAgICAgICByZXR1cm4geyBuZXdFdmVudERhdGEgfTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNvbG9yQ2hhbmdlKG5ld0NvbG9yVmFsdWUpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKGZ1bmN0aW9uKHByZXZTdGF0ZSwgcHJvcHMpIHtcclxuICAgICAgICAgICAgY29uc3QgbmV3RXZlbnREYXRhID0gJC5leHRlbmQoe30sIHByZXZTdGF0ZS5uZXdFdmVudERhdGEpXHJcbiAgICAgICAgICAgIG5ld0V2ZW50RGF0YS5iYWNrZ3JvdW5kQ29sb3IgPSBuZXdDb2xvclZhbHVlO1xyXG4gICAgICAgICAgICByZXR1cm4geyBuZXdFdmVudERhdGEgfTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUJ0bkNsaWNrKGUpIHtcclxuICAgICAgICAvL1xyXG4gICAgICAgIGNvbnN0IG5ld0V2ZW50RGF0YSA9ICQuZXh0ZW5kKHt9LCB0aGlzLnN0YXRlLm5ld0V2ZW50RGF0YSlcclxuICAgICAgICAvL1xyXG4gICAgICAgIGNvbnN0IGlkID0gZS50YXJnZXQuaWQ7XHJcbiAgICAgICAgY29uc3QgYnRuVHlwZSA9IGlkLnNwbGl0KCctJylbMl07XHJcbiAgICAgICAgY29uc3QgaGFuZGxlTmFtZSA9IGBvbiR7YnRuVHlwZX1CdG5DbGlja2A7XHJcbiAgICAgICAgdGhpcy5ldmVudEhhbmRsZXNbaGFuZGxlTmFtZV0odGhpcy5wcm9wcy5lZGl0aW5nRXZlbnQsIG5ld0V2ZW50RGF0YSlcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMucHJvcHMub25Nb2RhbENsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHsgc2hvdywgb25Nb2RhbENsb3NlIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IGV2ZW50ID0gdGhpcy5wcm9wcy5lZGl0aW5nRXZlbnQ7XHJcbiAgICAgICAgY29uc3QgZW5hYmxlU2F2ZUJ0biA9ICEkLmlzRW1wdHlPYmplY3QodGhpcy5zdGF0ZS5uZXdFdmVudERhdGEpO1xyXG4gICAgICAgIHJldHVybiAoIFxyXG4gICAgICAgICAgICA8RXZlbnRNb2RhbCB7Li4ue3Nob3csIG9uTW9kYWxDbG9zZX19PlxyXG4gICAgICAgICAgICAgICAgPEV2ZW50TW9kYWwuTmF2SGVhZGVyIHsuLi57b25Nb2RhbENsb3NlfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPE5hdkl0ZW0gZXZlbnRLZXk9XCIxXCIgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICDml6XnqIvnvJbovpFcclxuICAgICAgICAgICAgICAgICAgICA8L05hdkl0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgPE5hdkl0ZW0gZXZlbnRLZXk9XCIyXCIgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICDph43lpI3op4TliJlcclxuICAgICAgICAgICAgICAgICAgICA8L05hdkl0ZW0+XHJcbiAgICAgICAgICAgICAgICA8L0V2ZW50TW9kYWwuTmF2SGVhZGVyPlxyXG4gICAgICAgICAgICAgICAgPEV2ZW50TW9kYWwuVGFiQm9keT5cclxuICAgICAgICAgICAgICAgICAgICA8VGFiLlBhbmUgZXZlbnRLZXk9XCIxXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxFdmVudERldGFpbEZyb20gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+S8oOWFpeaXpeeoi+WxnuaAp1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXsnZWRpdCcgKyBldmVudC5pZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50VGl0bGU9e2V2ZW50LnRpdGxlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ9e2V2ZW50LnN0YXJ0LmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kPXtldmVudC5lbmQuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I9e2V2ZW50LmJhY2tncm91bmRDb2xvcn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlPXtldmVudC5jb21wbGV0ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5LqL5Lu25Y+l5p+EXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblRpdGxlQ2hhbmdlPXt0aGlzLmhhbmRsZVRpdGxlQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TdGFydENoYW5nZT17dGhpcy5oYW5kbGVTdGFydENoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRW5kQ2hhbmdlPXt0aGlzLmhhbmRsZUVuZENoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29sb3JjaGFuZ2U9e3RoaXMuaGFuZGxlQ29sb3JDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9UYWIuUGFuZT5cclxuICAgICAgICAgICAgICAgICAgICA8VGFiLlBhbmUgZXZlbnRLZXk9XCIyXCI+VGFiIDEgY29udGVudDwvVGFiLlBhbmU+XHJcbiAgICAgICAgICAgICAgICA8L0V2ZW50TW9kYWwuVGFiQm9keT5cclxuICAgICAgICAgICAgICAgIDxFdmVudE1vZGFsLlRvb2xiYXJGb290ZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgPE1vZGFsVG9vbGJhclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVTYXZlQnRuPXtlbmFibGVTYXZlQnRufVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZT17dGhpcy5zdGF0ZS5jb21wbGV0ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25CdG5DbGljaz17dGhpcy5oYW5kbGVCdG5DbGlja30vPlxyXG4gICAgICAgICAgICAgICAgPC9FdmVudE1vZGFsLlRvb2xiYXJGb290ZXI+XHJcbiAgICAgICAgICAgIDwvRXZlbnRNb2RhbD5cclxuICAgICAgICApXHJcbiAgICB9ICAgIFxyXG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgTW9kYWwsIE5hdiwgVGFiLCBSb3csIENvbCwgQ2xvc2VCdXR0b24gfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5cclxuY2xhc3MgTmF2SGVhZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIC8vdGhpcy5wcm9wcy5jaGlsZHJlbiDmjqXlj5cgPE5hdkl0ZW0gLz5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8TW9kYWwuSGVhZGVyXHJcbiAgICAgICAgICAgICAgICBzdHlsZT17e2JvcmRlckJvdHRvbTogJ25vbmUnLCBwYWRkaW5nOiAnMCd9fT5cclxuICAgICAgICAgICAgICAgIDxOYXYgYnNTdHlsZT1cInRhYnNcIlxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7cGFkZGluZzogJzE1cHggMTVweCAwIDE1cHgnfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPENsb3NlQnV0dG9uIG9uQ2xpY2s9e3RoaXMucHJvcHMub25Nb2RhbENsb3NlfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG4gICAgICAgICAgICAgICAgPC9OYXY+XHJcbiAgICAgICAgICAgIDwvTW9kYWwuSGVhZGVyPlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgVGFiQm9keSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICAvL3RoaXMucHJvcHMuY2hpbGRyZW4g5o6l5Y+XIDxUYWIuUGFuZSAvPlxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxNb2RhbC5Cb2R5PlxyXG4gICAgICAgICAgICAgICAgPFRhYi5Db250ZW50IGFuaW1hdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuICAgICAgICAgICAgICAgIDwvVGFiLkNvbnRlbnQ+XHJcbiAgICAgICAgICAgIDwvTW9kYWwuQm9keT4gICAgICAgICAgICBcclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFRvb2xiYXJGb290ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxNb2RhbC5Gb290ZXI+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuICAgICAgICAgICAgPC9Nb2RhbC5Gb290ZXI+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBFdmVudE1vZGFsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgTmF2SGVhZGVyLCBUYWJCb2R5LCBUb29sYmFyRm9vdGVyO1xyXG4gICAgICAgIFJlYWN0LkNoaWxkcmVuLmZvckVhY2godGhpcy5wcm9wcy5jaGlsZHJlbiwgKHRoaXNBcmcpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IHRoaXNBcmcudHlwZS5uYW1lO1xyXG4gICAgICAgICAgICBpZiAoIG5hbWUgPT0gJ05hdkhlYWRlcicgKSB7XHJcbiAgICAgICAgICAgICAgICBOYXZIZWFkZXIgPSB0aGlzQXJnO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBuYW1lID09ICdUYWJCb2R5JyApIHtcclxuICAgICAgICAgICAgICAgIFRhYkJvZHkgPSB0aGlzQXJnO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBuYW1lID09ICdUb29sYmFyRm9vdGVyJyApIHtcclxuICAgICAgICAgICAgICAgIFRvb2xiYXJGb290ZXIgPSB0aGlzQXJnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPE1vZGFsIHNob3c9e3RoaXMucHJvcHMuc2hvd30gb25IaWRlPXt0aGlzLnByb3BzLm9uTW9kYWxDbG9zZX0+IFxyXG4gICAgICAgICAgICAgICAgPFRhYi5Db250YWluZXIgaWQ9XCJ0YWJzLXdpdGgtZHJvcGRvd25cIiBkZWZhdWx0QWN0aXZlS2V5PVwiMVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxSb3cgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbCBzbT17MTJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBOYXZIZWFkZXIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBUYWJCb2R5IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9Db2w+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9Sb3c+XHJcbiAgICAgICAgICAgICAgICA8L1RhYi5Db250YWluZXI+XHJcbiAgICAgICAgICAgICAgICB7IFRvb2xiYXJGb290ZXIgfVxyXG4gICAgICAgICAgICA8L01vZGFsPlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuRXZlbnRNb2RhbC5OYXZIZWFkZXIgPSBOYXZIZWFkZXI7XHJcbkV2ZW50TW9kYWwuVGFiQm9keSA9IFRhYkJvZHk7XHJcbkV2ZW50TW9kYWwuVG9vbGJhckZvb3RlciA9IFRvb2xiYXJGb290ZXI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFdmVudE1vZGFsOyIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL2luZGV4LmNzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9pbmRleC5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL2luZGV4LmNzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgJ2Z1bGxjYWxlbmRhci1yZWFjdHdyYXBwZXIvZGlzdC9jc3MvZnVsbGNhbGVuZGFyLm1pbi5jc3MnXHJcbmltcG9ydCAnYm9vdHN0cmFwL2Rpc3QvY3NzL2Jvb3RzdHJhcC5jc3MnO1xyXG5pbXBvcnQgJ2Jvb3RzdHJhcC9kaXN0L2Nzcy9ib290c3RyYXAtdGhlbWUuY3NzJztcclxuaW1wb3J0ICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtZnJlZS9jc3MvYWxsLmNzcydcclxuaW1wb3J0IEFwcCBmcm9tICcuL0FwcCc7XHJcbmltcG9ydCAnLi9pbmRleC5jc3MnO1xyXG5cclxuUmVhY3RET00ucmVuZGVyKDxBcHAgLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JykpO1xyXG5cclxuLypcclxuJChmdW5jdGlvbigpe1xyXG4gICAgLy8g5a6a5LmJ5Y+Y6YePXHJcblx0Y29uc3QgZGF0YUxvYWRlciA9IG5ldyBXaXpFdmVudERhdGFMb2FkZXIoKTtcclxuXHRsZXQgZ19lZGl0UG9wcGVyLCBnX2NyZWF0ZU1vZGFsLCBnX2VkaXRNb2RhbDtcclxuXHJcbiAgICBjb25zdCBjYWxlbmRhciA9ICQoJyNjYWxlbmRhcicpLmZ1bGxDYWxlbmRhcih7XHJcblx0XHR0aGVtZVN5c3RlbTogJ3N0YW5kYXJkJyxcclxuXHRcdGhlaWdodDogJ3BhcmVudCcsXHJcblx0XHRoZWFkZXI6IHtcclxuXHRcdFx0bGVmdDogJ3ByZXYsbmV4dCx0b2RheScsXHJcblx0XHRcdGNlbnRlcjogJ3RpdGxlJyxcclxuXHRcdFx0cmlnaHQ6ICdtb250aCxhZ2VuZGFXZWVrLGFnZW5kYURheSxsaXN0V2VlaydcclxuXHRcdH0sXHJcblx0XHR2aWV3czoge1xyXG5cdFx0XHRtb250aDoge1xyXG5cdFx0XHRcdC8vdGl0bGVGb3JtYXQ6IGdfbG9jX3RpdGxlZm9ybWF0X21vbnRoLCAvL3ZhciBnX2xvY190aXRsZWZvcm1hdF9tb250aCA9IFwiTU1NTSB5eXl5XCI7XHJcblx0XHRcdH0sXHJcblx0XHRcdGFnZW5kYToge1xyXG5cdFx0XHRcdG1pblRpbWU6IFwiMDg6MDA6MDBcIixcclxuXHRcdFx0XHRzbG90TGFiZWxGb3JtYXQ6ICdoKDptbSkgYSdcclxuXHRcdFx0fSxcclxuXHRcdFx0bGlzdFdlZWs6IHtcclxuXHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRuYXZMaW5rczogdHJ1ZSxcclxuXHRcdGFsbERheURlZmF1bHQ6IGZhbHNlLFxyXG5cdFx0ZGVmYXVsdFZpZXc6ICdhZ2VuZGFXZWVrJyxcclxuXHRcdGV2ZW50TGltaXQ6IHRydWUsXHJcblx0XHRidXR0b25UZXh0OiB7XHJcblx0XHRcdHRvZGF5OiAn5LuK5aSpJyxcclxuXHRcdFx0bW9udGg6ICfmnIgnLFxyXG5cdFx0XHR3ZWVrOiAn5ZGoJyxcclxuXHRcdFx0ZGF5OiAn5pelJyxcclxuXHRcdFx0bGlzdDogJ+ihqCdcclxuICAgICAgICB9LFxyXG5cdFx0bW9udGhOYW1lczogW1xyXG4gICAgICAgICAgICAnMeaciCcsICcy5pyIJywgJzPmnIgnLCAnNOaciCcsIFxyXG4gICAgICAgICAgICAnNeaciCcsICc25pyIJywgJzfmnIgnLCAnOOaciCcsIFxyXG4gICAgICAgICAgICAnOeaciCcsICcxMOaciCcsICcxMeaciCcsICcxMuaciCdcclxuICAgICAgICBdLFxyXG5cdFx0bW9udGhOYW1lc1Nob3J0OiBbXHJcbiAgICAgICAgICAgICcx5pyIJywgJzLmnIgnLCAnM+aciCcsICc05pyIJywgXHJcbiAgICAgICAgICAgICc15pyIJywgJzbmnIgnLCAnN+aciCcsICc45pyIJywgXHJcbiAgICAgICAgICAgICc55pyIJywgJzEw5pyIJywgJzEx5pyIJywgJzEy5pyIJ1xyXG4gICAgICAgIF0sXHJcblx0XHRkYXlOYW1lczogW1xyXG4gICAgICAgICAgICAn5ZGo5pelJywgJ+WRqOS4gCcsICflkajkuownLCAn5ZGo5LiJJywgJ+WRqOWbmycsICflkajkupQnLCAn5ZGo5YWtJ1xyXG4gICAgICAgIF0sXHJcblx0XHRkYXlOYW1lc1Nob3J0OiBbXHJcbiAgICAgICAgICAgICflkajml6UnLCAn5ZGo5LiAJywgJ+WRqOS6jCcsICflkajkuIknLCAn5ZGo5ZubJywgJ+WRqOS6lCcsICflkajlha0nXHJcbiAgICAgICAgXSxcclxuXHRcdHNlbGVjdGFibGU6IHRydWUsXHJcblx0XHRzZWxlY3RIZWxwZXI6IHRydWUsXHJcblx0XHR1bnNlbGVjdENhbmNlbDogJy5tb2RhbCAqJyxcclxuXHRcdGFsbERheVRleHQ6ICflhajlpKknLFxyXG5cdFx0bm93SW5kaWNhdG9yOiB0cnVlLFxyXG5cdFx0Zm9yY2VFdmVudER1cmF0aW9uOiB0cnVlLFxyXG5cdFx0Zmlyc3REYXk6IDEsIC8vIOesrOS4gOWkqeaYr+WRqOS4gOi/mOaYr+WRqOWkqe+8jOS4jmRhdGVwaWNrZXLlv4Xpobvnm7jlkIxcclxuXHRcdGRyYWdPcGFjaXR5OiB7XHJcblx0XHRcdFwibW9udGhcIjogLjUsXHJcblx0XHRcdFwiYWdlbmRhV2Vla1wiOiAxLFxyXG5cdFx0XHRcImFnZW5kYURheVwiOiAxXHJcblx0XHR9LFxyXG5cdFx0ZWRpdGFibGU6IHRydWUsXHJcblxyXG5cdFx0Ly8g5Yi35paw6KeG5Zu+77yM6YeN5paw6I635Y+W5pel5Y6G5LqL5Lu2XHJcblx0XHR2aWV3UmVuZGVyOiBmdW5jdGlvbiggdmlldywgZWxlbWVudCApIHtcclxuXHRcdFx0Ly9UT0RPOiDmhJ/op4nov5nmoLfpgKDmiJDmgKfog73kuIrnmoTmjZ/lpLHvvIzmmK/lkKbmnInmm7Tlpb3nmoTmlrnms5XvvJ9cclxuXHRcdFx0Y29uc3QgY2FsZW5kYXIgPSAkKCcjY2FsZW5kYXInKTtcclxuXHRcdFx0Y29uc3QgZXZlbnRTb3VyY2VzID0gZGF0YUxvYWRlci5nZXRFdmVudFNvdXJjZXMoIHZpZXcsIGVsZW1lbnQgKTtcclxuXHRcdFx0Y2FsZW5kYXIuZnVsbENhbGVuZGFyKCdyZW1vdmVFdmVudHMnKTtcclxuXHRcdFx0Zm9yIChsZXQgaT0wIDsgaSA8IGV2ZW50U291cmNlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGNhbGVuZGFyLmZ1bGxDYWxlbmRhcignYWRkRXZlbnRTb3VyY2UnLCBldmVudFNvdXJjZXNbaV0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0fSxcclxuXHJcblx0XHQvLyDpgInmi6nliqjkvZzop6blj5HnmoTkuovku7blj6Xmn4TvvIzlrprkuYnkuobkuIDkuKpjYWxsYmFja1xyXG5cdFx0c2VsZWN0OiBmdW5jdGlvbihzdGFydCwgZW5kLCBqc0V2ZW50LCB2aWV3KXtcclxuXHRcdFx0Ly8g5by55Ye64oCc5Yib5bu65pel5Y6G5LqL5Lu24oCd56qX5Y+jXHJcblx0XHRcdC8vIOWIpOaWreaYr+WQpua4suafk1xyXG5cdFx0XHQvL1RPRE86IOaDs+WKnuazleS4jeimgeeUqOWFqOWxgOWPmOmHj1xyXG5cdFx0XHRpZiAoICF3aW5kb3cuZ19jcmVhdGVNb2RhbCApIG5ldyBFdmVudENyZWF0ZU1vZGFsKHtzdGFydCwgZW5kLCBqc0V2ZW50LCB2aWV3fSk7XHJcblx0XHRcdC8vIOS8oOmAkuWPguaVsFxyXG5cdFx0XHR3aW5kb3cuZ19jcmVhdGVNb2RhbC51cGRhdGUoe3N0YXJ0LCBlbmQsIGpzRXZlbnQsIHZpZXd9KTtcclxuXHRcdFx0d2luZG93LmdfY3JlYXRlTW9kYWwuc2hvdygpO1xyXG5cdFx0fSxcclxuXHJcblx0XHRldmVudERyYWdTdGFydDogZnVuY3Rpb24oIGV2ZW50LCBqc0V2ZW50LCB1aSwgdmlldyApIHsgfSxcclxuXHRcdGV2ZW50RHJhZ1N0b3A6IGZ1bmN0aW9uKCBldmVudCwganNFdmVudCwgdWksIHZpZXcgKSB7IH0sXHJcblxyXG5cdFx0Ly8g5pel5Y6G5LqL5Lu25ouW5YqoIGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXdcclxuXHRcdGV2ZW50RHJvcDogZnVuY3Rpb24oZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldyl7XHJcblx0XHRcdGlmIChldmVudC5pZCl7XHJcblx0XHRcdFx0ZGF0YUxvYWRlci51cGRhdGVFdmVudERhdGFPbkRyb3AoZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldylcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXZlcnRGdW5jKCk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8g5pel5Y6G5LqL5Lu25pel5pyf6IyD5Zu06YeN572uXHJcblx0XHRldmVudFJlc2l6ZTogZnVuY3Rpb24oZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldyl7XHJcblx0XHRcdGlmIChldmVudC5pZCl7XHJcblx0XHRcdFx0ZGF0YUxvYWRlci51cGRhdGVFdmVudERhdGFPblJlc2l6ZShldmVudCwgZGVsdGEsIHJldmVydEZ1bmMsIGpzRXZlbnQsIHVpLCB2aWV3KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXZlcnRGdW5jKCk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblxyXG5cdFx0ZXZlbnRSZW5kZXI6IGZ1bmN0aW9uKGV2ZW50T2JqLCAkZWwpIHtcclxuXHRcdFx0Ly8g5YWD57Sg5bey57uP5riy5p+T77yM5Y+v5L+u5pS55YWD57SgXHJcblx0XHRcdGNvbnN0IGlzQ29tcGxldGUgPSBwYXJzZUludChldmVudE9iai5jb21wbGV0ZSkgPT0gNTtcclxuXHRcdFx0aWYgKCBpc0NvbXBsZXRlICkge1xyXG5cdFx0XHRcdC8vIOagt+W8j1xyXG5cdFx0XHRcdCRlbC5hZGRDbGFzcygndGMtY29tcGxldGUnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8g5pel5Y6G5LqL5Lu254K55Ye75ZCO5LqL5Lu25Y+l5p+EXHJcblx0XHRldmVudENsaWNrOiBmdW5jdGlvbiggZXZlbnQsIGpzRXZlbnQsIHZpZXcgKSB7XHJcblx0XHRcdC8vIHRoaXMg5oyH5ZCR5YyF6KO55LqL5Lu255qEPGE+5YWD57SgXHJcblxyXG5cdFx0XHQvLyDliKTmlq3mmK/lkKblt7Lnu4/muLLmn5PlvLnnqpdcclxuXHRcdFx0aWYgKCAhZ19lZGl0UG9wcGVyICkge1xyXG5cdFx0XHRcdGdfZWRpdFBvcHBlciA9IHJlbmRlckVkaXRQb3BwZXIoe1xyXG5cdFx0XHRcdFx0J2V2ZW50JzogZXZlbnQsXHJcblx0XHRcdFx0XHQnanNFdmVudCc6IGpzRXZlbnQsXHJcblx0XHRcdFx0XHQndmlldyc6IHZpZXdcclxuXHRcdFx0XHR9LCB0aGlzKS5FdmVudFBvcG92ZXIoJ3Nob3cnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyDmm7TmlrByZWZlcmVuY2VcclxuXHRcdFx0XHRnX2VkaXRQb3BwZXIuRXZlbnRQb3BvdmVyKCdvcHRpb24nLCB7XHJcblx0XHRcdFx0XHRhcmdzOiB7XHJcblx0XHRcdFx0XHRcdCdldmVudCc6IGV2ZW50LFxyXG5cdFx0XHRcdFx0XHQnanNFdmVudCc6IGpzRXZlbnQsXHJcblx0XHRcdFx0XHRcdCd2aWV3Jzogdmlld1xyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHRpdGxlOiBldmVudC50aXRsZSxcclxuXHRcdFx0XHRcdHJlZmVyZW5jZTogdGhpc1xyXG5cdFx0XHRcdH0pLkV2ZW50UG9wb3ZlcigndXBkYXRlJykuRXZlbnRQb3BvdmVyKCdzaG93Jyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblx0XHRcclxuXHR9KVxyXG59KVxyXG4qLyIsImltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuaW1wb3J0ICdmdWxsY2FsZW5kYXInO1xyXG5pbXBvcnQgeyBXaXpEYXRhYmFzZSBhcyBnX2RiLCBXaXpDb21tb25VSSBhcyBnX2Ntbn0gZnJvbSAnLi4vdXRpbHMvV2l6SW50ZXJmYWNlJztcclxuaW1wb3J0IENvbmZpZyBmcm9tICcuLi91dGlscy9Db25maWcnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FsZW5kYXJFdmVudCB7XHJcblx0LyoqXHJcbiAgICAgKiDliJvlu7rkuIDkuKrpgJrnlKjml6XnqIsuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IGRhdGEg5Y6f5aeL5pWw5o2u57G75Z6L77yM5Y+v5Lul5pivIFdpekV2ZW50LCBGdWxsQ2FsZW5kYXJFdmVudCDku6Xlj4ogR1VJRC5cclxuICAgICAqL1xyXG5cdGNvbnN0cnVjdG9yKCBkYXRhLCBjYWxlbmRhciApIHtcclxuXHRcdGlmICghZ19kYikgdGhyb3cgbmV3IEVycm9yKCdJV2l6RGF0YWJhc2UgaXMgbm90IHZhbGlkLicpO1xyXG5cdFx0dGhpcy4kY2FsZW5kYXIgPSBjYWxlbmRhciA/ICQoY2FsZW5kYXIpIDogJCgnI2NhbGVuZGFyJyk7XHJcblx0XHRjb25zdCB0eXBlID0gdGhpcy5fY2hlY2tEYXRhVHlwZShkYXRhKTtcclxuXHRcdHN3aXRjaCAoIHR5cGUgKSB7XHJcblx0XHRcdGNhc2UgXCJXaXpFdmVudFwiOlxyXG5cdFx0XHRjYXNlIFwiRnVsbENhbGVuZGFyRXZlbnRcIjpcclxuXHRcdFx0XHR0aGlzLl9jcmVhdGUoZGF0YSwgdHlwZSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgXCJHVUlEXCI6XHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdC8vVE9ETzog6I635b6XV2l6RXZlbnTmlbDmja7vvIzlubbliJvlu7rlr7nosaFcclxuXHRcdFx0XHRcdGNvbnN0IGRvYyA9IGdfZGIuRG9jdW1lbnRGcm9tR1VJRChkYXRhKTtcclxuXHRcdFx0XHRcdGNvbnN0IG5ld0V2ZW50RGF0YSA9IHtcclxuXHRcdFx0XHRcdFx0XCJDQUxFTkRBUl9FTkRcIiA6IGRvYy5HZXRQYXJhbVZhbHVlKCdDQUxFTkRBUl9FTkQnKSxcclxuXHRcdFx0XHRcdFx0XCJDQUxFTkRBUl9JTkZPXCIgOiBkb2MuR2V0UGFyYW1WYWx1ZSgnQ0FMRU5EQVJfSU5GTycpLFxyXG5cdFx0XHRcdFx0XHRcIkNBTEVOREFSX0VYVFJBSU5GT1wiIDogZG9jLkdldFBhcmFtVmFsdWUoJ0NBTEVOREFSX0VYVFJBSU5GTycpLFxyXG5cdFx0XHRcdFx0XHRcIkNBTEVOREFSX1NUQVJUXCIgOiBkb2MuR2V0UGFyYW1WYWx1ZSgnQ0FMRU5EQVJfU1RBUlQnKSxcclxuXHRcdFx0XHRcdFx0XCJDQUxFTkRBUl9SRUNVUlJFTkNFXCIgOiBkb2MuR2V0UGFyYW1WYWx1ZSgnQ0FMRU5EQVJfUkVDVVJSRU5DRScpLFxyXG5cdFx0XHRcdFx0XHRcIkNBTEVOREFSX0VORFJFQ1VSUkVOQ0VcIiA6IGRvYy5HZXRQYXJhbVZhbHVlKCdDQUxFTkRBUl9FTkRSRUNVUlJFTkNFJyksXHJcblx0XHRcdFx0XHRcdFwiY3JlYXRlZFwiIDogbW9tZW50KGRvYy5EYXRlQ3JlYXRlZCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyksXHJcblx0XHRcdFx0XHRcdFwiZ3VpZFwiIDogZG9jLkdVSUQsXHJcblx0XHRcdFx0XHRcdFwidGl0bGVcIiA6IGRvYy5UaXRsZSxcclxuXHRcdFx0XHRcdFx0XCJ1cGRhdGVkXCIgOiBtb21lbnQoZG9jLkRhdGVNb2RpZmllZCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJylcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHRoaXMuX2NyZWF0ZShuZXdFdmVudERhdGEsICdXaXpFdmVudCcpO1xyXG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHsgY29uc29sZS5lcnJvcihlKTsgfVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdF9jcmVhdGUoZGF0YSwgdHlwZSkge1xyXG5cdFx0bGV0IHN0YXJ0LCBlbmQsIGlkLCBia0NvbG9yLCBhbGxEYXksIGNvbXBsZXRlLCBkYXRlQ29tcGxldGVkLCBycHRSdWxlLCBycHRFbmQ7XHJcblx0XHRzd2l0Y2ggKHR5cGUpIHtcclxuXHRcdFx0Y2FzZSBcIkdVSURcIjpcclxuXHRcdFx0Y2FzZSBcIldpekV2ZW50XCI6XHJcblx0XHRcdFx0dGhpcy5fSW5mbyA9IHRoaXMuX3BhcnNlSW5mbyhkYXRhLkNBTEVOREFSX0lORk8pO1xyXG5cdFx0XHRcdHRoaXMuX0V4dHJhSW5mbyA9IGRhdGEuQ0FMRU5EQVJfRVhUUkFJTkZPID8gdGhpcy5fcGFyc2VJbmZvKGRhdGEuQ0FMRU5EQVJfRVhUUkFJTkZPKSA6IHRoaXMuX2dldERlZmF1bHRFeHRyYUluZm8oKTtcclxuXHRcdFx0XHQvLyDnu5/kuIDlj5jph49cclxuXHRcdFx0XHRpZCA9IGRhdGEuZ3VpZDtcclxuXHRcdFx0XHRzdGFydCA9IGRhdGEuQ0FMRU5EQVJfU1RBUlQ7XHJcblx0XHRcdFx0ZW5kID0gZGF0YS5DQUxFTkRBUl9FTkQ7XHJcblx0XHRcdFx0Ly8g5Yik5pat5piv5ZCm55So5oi36Ieq5a6a5LmJ6IOM5pmv6Imy77yM5ZCR5LiL5YW85a655Y6f54mI5pel5Y6GXHJcblx0XHRcdFx0YmtDb2xvciA9IHRoaXMuX0luZm8uY2kgPyAoIHBhcnNlSW50KHRoaXMuX0luZm8uY2kpID09IDAgPyB0aGlzLl9JbmZvLmIgOiBDb25maWcuY29sb3JJdGVtc1t0aGlzLl9JbmZvLmNpXS5jb2xvclZhbHVlICkgOiB0aGlzLl9JbmZvLmI7XHJcblx0XHRcdFx0YWxsRGF5ID0gZGF0YS5DQUxFTkRBUl9FTkQuaW5kZXhPZihcIjIzOjU5OjU5XCIpICE9IC0xID8gdHJ1ZSA6IGZhbHNlO1xyXG5cdFx0XHRcdGNvbXBsZXRlID0gdGhpcy5fRXh0cmFJbmZvLkNvbXBsZXRlO1xyXG5cdFx0XHRcdGRhdGVDb21wbGV0ZWQgPSB0aGlzLl9FeHRyYUluZm8uRGF0ZUNvbXBsZXRlZDtcclxuXHRcdFx0XHQvLyDph43lpI3kuovku7ZcclxuXHRcdFx0XHRycHRSdWxlID0gZGF0YS5DQUxFTkRBUl9SRUNVUlJFTkNFO1xyXG5cdFx0XHRcdHJwdEVuZCA9IGRhdGEuQ0FMRU5EQVJfRU5EUkVDVVJSRU5DRTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBcIkZ1bGxDYWxlbmRhckV2ZW50XCI6XHJcblx0XHRcdFx0aWQgPSBkYXRhLmlkO1xyXG5cdFx0XHRcdHN0YXJ0ID0gZGF0YS5zdGFydDtcclxuXHRcdFx0XHRlbmQgPSBkYXRhLmVuZDtcclxuXHRcdFx0XHRia0NvbG9yID0gZGF0YS5iYWNrZ3JvdW5kQ29sb3I7XHJcblx0XHRcdFx0YWxsRGF5ID0gZGF0YS5hbGxEYXkgPyBkYXRhLmFsbERheSA6ICEkLmZ1bGxDYWxlbmRhci5tb21lbnQoZGF0YS5zdGFydCkuaGFzVGltZSgpO1xyXG5cdFx0XHRcdGNvbXBsZXRlID0gZGF0YS5jb21wbGV0ZSB8fCAwO1xyXG5cdFx0XHRcdGRhdGVDb21wbGV0ZWQgPSBkYXRhLmRhdGVDb21wbGV0ZWQgfHwgJyc7XHJcblx0XHRcdFx0cnB0UnVsZSA9IGRhdGEucnB0UnVsZTtcclxuXHRcdFx0XHRycHRFbmQgPSBkYXRhLnJwdEVuZFxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignQ2FuIG5vdCBpZGVudGlmeSBkYXRhIHR5cGUuJyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0XHQvLyDln7rmnKzkv6Hmga9cclxuXHRcdHRoaXMuaWQgPSBpZDtcclxuXHRcdHRoaXMudGl0bGUgPSBkYXRhLnRpdGxlO1xyXG5cdFx0Ly8g5pe26Ze05L+h5oGvXHJcblx0XHR0aGlzLmFsbERheSA9IGFsbERheTtcclxuXHRcdC8vIOazqOaEj++8gXN0YXJ0L2VuZCDlj6/og73mmK9tb21lbnTlr7nosaHmiJbogIVzdHLvvIzmiYDku6XkuIDlvovlhYjovazmjaLmiJBtb21lbnTlho3moLzlvI/ljJbovpPlh7pcclxuXHRcdHRoaXMuc3RhcnQgPSBhbGxEYXkgPyBtb21lbnQoc3RhcnQpLmZvcm1hdChcIllZWVktTU0tRERcIikgOiBtb21lbnQoc3RhcnQpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0dGhpcy5lbmQgPSBhbGxEYXkgPyBtb21lbnQoZW5kKS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpIDogbW9tZW50KGVuZCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHR0aGlzLmNyZWF0ZWQgPSBkYXRhLmNyZWF0ZWQgPyBkYXRhLmNyZWF0ZWQgOiBtb21lbnQoc3RhcnQpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0dGhpcy51cGRhdGVkID0gZGF0YS51cGRhdGVkID8gZGF0YS51cGRhdGVkIDogbW9tZW50KCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHQvLyDorr7nva7kv6Hmga9cclxuXHRcdHRoaXMudGV4dENvbG9yID0gJ2JsYWNrJztcclxuXHRcdHRoaXMuYmFja2dyb3VuZENvbG9yID0gYmtDb2xvcjtcclxuXHRcdHRoaXMuY29tcGxldGUgPSBjb21wbGV0ZTtcclxuXHRcdHRoaXMuZGF0ZUNvbXBsZXRlZCA9IGRhdGVDb21wbGV0ZWQ7XHJcblx0XHQvLyDph43lpI3kuovku7ZcclxuXHRcdHRoaXMucnB0UnVsZSA9IHJwdFJ1bGU7XHJcblx0XHR0aGlzLnJwdEVuZCA9IHJwdEVuZDtcclxuXHRcdC8vXHJcblx0XHR0aGlzLl91cGRhdGUoKTtcclxuXHR9XHJcblxyXG5cdF9jaGVja0RhdGFUeXBlKGRhdGEpIHtcclxuXHRcdGNvbnN0IG9iakNsYXNzID0gZGF0YS5jb25zdHJ1Y3RvcjtcclxuICAgICAgICBjb25zdCBHVUlEX1JlZ0V4ciA9IC9eWzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtNV1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn0kL2k7XHJcbiAgICAgICAgbGV0IHR5cGU7XHJcbiAgICAgICAgc3dpdGNoIChvYmpDbGFzcykge1xyXG4gICAgICAgICAgICBjYXNlIFN0cmluZzpcclxuICAgICAgICAgICAgICAgIGlmICggR1VJRF9SZWdFeHIudGVzdChkYXRhKSApIHR5cGUgPSBcIkdVSURcIjtcclxuICAgICAgICAgICAgICAgIGVsc2UgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGRhdGEsIGNhbm5vdCBjcmVhdGUgQ2FsZW5kYXJFdmVudCBvYmplY3QuJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBPYmplY3Q6XHJcblx0XHRcdFx0aWYgKCBkYXRhLkNBTEVOREFSX0lORk8gJiYgZGF0YS50aXRsZSApIHsgXHJcblx0XHRcdFx0XHR0eXBlID0gJ1dpekV2ZW50JztcclxuXHRcdFx0XHR9IGVsc2UgaWYgKCBkYXRhLnN0YXJ0ICYmIGRhdGEudGl0bGUgKSB7XHJcblx0XHRcdFx0XHR0eXBlID0gJ0Z1bGxDYWxlbmRhckV2ZW50JztcclxuXHRcdFx0XHR9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHR5cGU7XHJcblx0fTtcclxuXHJcblx0X3BhcnNlSW5mbyhJbmZvU3RyaW5nKSB7XHJcblx0XHRjb25zdCBJbmZvT2JqZWN0ID0ge307XHJcblx0XHQvLyDmi4bop6NDQUxFTkRBUl9JTkZPXHJcblx0XHRjb25zdCBJbmZvQXJyYXkgPSBJbmZvU3RyaW5nLnNwbGl0KCcvJyk7XHJcblx0XHRJbmZvQXJyYXkuZm9yRWFjaChmdW5jdGlvbihpdGVtLCBpbmRleCwgYXJyKXtcclxuXHRcdFx0Y29uc3QgcGFpciA9IGl0ZW0uc3BsaXQoJz0nKTtcclxuXHRcdFx0SW5mb09iamVjdFtwYWlyWzBdXSA9IHBhaXJbMV07XHJcblx0XHR9KTtcclxuXHRcdC8vIOWkhOeQhuminOiJsuWAvFxyXG5cdFx0aWYgKCBJbmZvT2JqZWN0LmIgKSBJbmZvT2JqZWN0LmIgPSAnIycgKyBJbmZvT2JqZWN0LmI7XHJcblxyXG5cdFx0cmV0dXJuIEluZm9PYmplY3Q7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcbiAgICAgKiDlsIYgSW5mbyDlr7nosaHluo/liJfljJYuXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gW0luZm9PYmplY3Q9XSDmj5DkvpsgSW5mbyDlr7nosaHvvIzpu5jorqTkuLpgdGhpcy5fSW5mb2AuXHJcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IOi/lOWbnueUqOS6jkluZm/lr7nosaHlrZfnrKbkuLIuXHJcbiAgICAgKi9cclxuXHRfc3RyaW5naWZ5SW5mbyggSW5mb09iamVjdCA9IHRoaXMuX0luZm8gKSB7XHJcblx0XHRpZiAoICFJbmZvT2JqZWN0ICkgcmV0dXJuICcnO1xyXG5cdFx0Y29uc3QgSW5mb0FycmF5ID0gW107XHJcblx0XHRjb25zdCBJbmZvT2JqZWN0S2V5c0FycmF5ID0gT2JqZWN0LmtleXMoSW5mb09iamVjdCk7XHJcblx0XHRJbmZvT2JqZWN0S2V5c0FycmF5LmZvckVhY2goZnVuY3Rpb24oaXRlbSwgaW5kZXgsIGFycil7XHJcblx0XHRcdGNvbnN0IHNpbmdsZUluZm8gPSBgJHtpdGVtfT0ke0luZm9PYmplY3RbaXRlbV19YDtcclxuXHRcdFx0SW5mb0FycmF5LnB1c2goc2luZ2xlSW5mbyk7XHJcblx0XHR9KTtcclxuXHRcdHJldHVybiBJbmZvQXJyYXkuam9pbignLycpLnJlcGxhY2UoJyMnLCAnJyk7XHJcblx0fTtcclxuXHJcblx0X3VwZGF0ZSgpIHtcclxuXHRcdHRoaXMuX3VwZGF0ZUluZm8oKTtcclxuXHRcdHRoaXMuX3VwZGF0ZUV4dHJhSW5mbygpO1xyXG5cdH07XHJcblxyXG5cdF91cGRhdGVJbmZvKCkge1xyXG5cdFx0Y29uc3QgdGhhdCA9IHRoaXM7XHJcblx0XHRjb25zdCBJbmZvT2JqZWN0ID0ge1xyXG5cdFx0XHQnYic6IG51bGwsIC8v6IOM5pmv6ImyaGV45YC8XHJcblx0XHRcdCdyJzogJy0xJywgLy/mj5DphpLmlrnlvI9cclxuXHRcdFx0J2MnOiAnMCcsIC8v57uT5p2f5o+Q6YaS5L+h5oGvXHJcblx0XHRcdCdjaSc6IDAgLy/og4zmma/oibJJRO+8jOm7mOiupCAwIOihqOekuuiDjOaZr+S4uueUqOaIt+iHquWumuS5iVxyXG5cdFx0fTtcclxuXHRcdC8vIOabtOaWsOiDjOaZr+iJsidiJ1xyXG5cdFx0SW5mb09iamVjdFsnYiddID0gdGhpcy5iYWNrZ3JvdW5kQ29sb3IucmVwbGFjZSgnIycsICcnKTtcclxuXHRcdC8vIOabtOaWsOminOiJsuaMh+aVsCdjaSdcclxuXHRcdENvbmZpZy5jb2xvckl0ZW1zLmZvckVhY2goZnVuY3Rpb24oaXRlbSwgaW5kZXgsIGFycil7XHJcblx0XHRcdGlmICggaXRlbS5jb2xvclZhbHVlID09ICB0aGF0LmJhY2tncm91bmRDb2xvciApIHtcclxuXHRcdFx0XHQvLyDlvZPml6XnqIvog4zmma/oibLkuI7oibLooajljLnphY3ml7bliJnnlKggY29sb3IgaWRleCDmnaXlgqjlrZjvvIjlhbzlrrnljp/niYjml6Xljobmj5Lku7bvvIlcclxuXHRcdFx0XHRJbmZvT2JqZWN0WydjaSddID0gaW5kZXg7XHJcblx0XHRcdH07XHJcblx0XHR9KTtcclxuXHRcdC8vIOW6lOeUqOabtOaWsFxyXG5cdFx0dGhpcy5fSW5mbyA9IEluZm9PYmplY3Q7XHJcblx0fTtcclxuXHJcblx0X2dldERlZmF1bHRFeHRyYUluZm8oKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHQnQ29tcGxldGUnOiAwLCAvL1xyXG5cdFx0XHQnRGF0ZUNvbXBsZXRlZCc6ICcnLCAvLyBJU08g5qCH5YeG5pel5pyf5a2X56ym5LiyIFlZWVktTU0tREQgMDA6MDA6MDBcclxuXHRcdFx0J1ByaW9yJzogMFxyXG5cdFx0fTtcclxuXHR9O1xyXG5cclxuXHRfdXBkYXRlRXh0cmFJbmZvKCkge1xyXG5cdFx0Y29uc3QgRXh0cmFJbmZvT2JqZWN0ID0ge1xyXG5cdFx0XHQnQ29tcGxldGUnOiAwLFxyXG5cdFx0XHQnRGF0ZUNvbXBsZXRlZCc6ICcnLFxyXG5cdFx0XHQnUHJpb3InOiAwXHJcblx0XHR9O1xyXG5cdFx0RXh0cmFJbmZvT2JqZWN0WydDb21wbGV0ZSddID0gdGhpcy5jb21wbGV0ZTtcclxuXHRcdEV4dHJhSW5mb09iamVjdFsnRGF0ZUNvbXBsZXRlZCddID0gdGhpcy5kYXRlQ29tcGxldGVkO1xyXG5cdFx0dGhpcy5fRXh0cmFJbmZvID0gRXh0cmFJbmZvT2JqZWN0O1xyXG5cdH07XHJcblxyXG5cdF9nZXRFdmVudEh0bWwodGl0bGUgPSB0aGlzLnRpdGxlLCBjb250ZW50ID0gJycpe1xyXG5cdFx0Y29uc3QgaHRtbFRleHQgPSBcclxuXHRcdFx0YDxodG1sPlxyXG5cdFx0XHRcdDxoZWFkPlxyXG5cdFx0XHRcdFx0PG1ldGEgaHR0cC1lcXVpdj1cIkNvbnRlbnQtVHlwZVwiIGNvbnRlbnQ9XCJ0ZXh0L2h0bWw7IGNoYXJzZXQ9dW5pY29kZVwiPlxyXG5cdFx0XHRcdFx0PHRpdGxlPiR7dGl0bGV9PC90aXRsZT4gXHJcblx0XHRcdFx0PC9oZWFkPlxyXG5cdFx0XHRcdDxib2R5PlxyXG5cdFx0XHRcdFx0PCEtLVdpekh0bWxDb250ZW50QmVnaW4tLT5cclxuXHRcdFx0XHRcdDxkaXY+JHtjb250ZW50fTwvZGl2PlxyXG5cdFx0XHRcdFx0PCEtLVdpekh0bWxDb250ZW50RW5kLS0+XHJcblx0XHRcdFx0PC9ib2R5PlxyXG5cdFx0XHQ8L2h0bWw+YDtcclxuXHRcclxuXHRcdCAgcmV0dXJuIGh0bWxUZXh0XHJcblx0fTtcclxuXHJcblx0LyoqXHJcbiAgICAgKiDmoLnmja7ml6XnqIvnmoTph43lpI3op4TliJnnlJ/miJAgRnVsbENhbGVuZGFyIGV2ZW50U291cmNlLlxyXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBzdGFydCDmn6Xor6Lotbflp4vvvIxJU08g5qCH5YeG5pel5pyf5a2X56ym5LiyLlxyXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBlbmQg5p+l6K+i57uT5p2f77yMSVNPIOagh+WHhuaXpeacn+Wtl+espuS4si5cclxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IGV2ZW50U291cmNlLlxyXG4gICAgICovXHJcblx0Z2VuZXJhdGVSZXBlYXRFdmVudHMoc3RhcnQsIGVuZCkge1xyXG5cdFx0aWYgKCAhdGhpcy5ycHRSdWxlICkgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgZmluZCBDYWxlbmRhckV2ZW50IHJlcGVhdCBydWxlLicpO1xyXG5cdFx0Y29uc3QgZXZlbnRTb3VyY2UgPSB7XHJcblx0XHRcdGlkOiB0aGlzLmlkLFxyXG5cdFx0XHRldmVudHM6IFtdXHJcblx0XHR9XHJcblx0XHQvL+agueaNrnJwdFJ1bGXnlJ/miJDph43lpI3ml6XmnJ/vvIzlubbnlJ/miJDkuovku7ZcclxuXHRcdGNvbnN0IGRheUFycmF5ID0gdGhpcy5fZ2V0UmVuZGVyUmVwZWF0RGF5KHN0YXJ0LCBlbmQpO1xyXG5cdFx0Zm9yICggbGV0IGRheSBvZiBkYXlBcnJheSApIHtcclxuXHRcdFx0Ly8gZGF5IOaYr+S4gOS4qk1vbWVudOaXpeacn+WvueixoVxyXG5cdFx0XHRjb25zdCBuZXdFdmVudCA9IHRoaXMudG9GdWxsQ2FsZW5kYXJFdmVudCgpO1xyXG5cdFx0XHRuZXdFdmVudC5zdGFydCA9IGRheS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0bmV3RXZlbnQuZW5kID0gbW9tZW50KG5ld0V2ZW50LmVuZCkuYWRkKCBkYXkuZGlmZiggbW9tZW50KHRoaXMuc3RhcnQpICkgKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0ZXZlbnRTb3VyY2UuZXZlbnRzLnB1c2gobmV3RXZlbnQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBldmVudFNvdXJjZTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuICAgICAqIOagueaNruinhOWImeeUn+aIkOaXpeacn+aVsOe7hFxyXG4gICAgICogQHJldHVybnMge09iamVjdFtdfSDljIXlkKvkuIDns7vliJdgTW9tZW50YOaXpeacn+WvueixoeeahOaVsOe7hC5cclxuICAgICAqL1xyXG5cdF9nZXRSZW5kZXJSZXBlYXREYXkoc3RhcnQsIGVuZCkge1xyXG5cdFx0Y29uc3QgcnB0UnVsZSA9IHRoaXMucnB0UnVsZTtcclxuXHRcdGxldCBkYXlBcnJheTtcclxuXHRcdGxldCByZWdleDtcclxuXHRcdGNvbnNvbGUuY291bnQocnB0UnVsZSk7XHJcblx0XHRpZiAoIChyZWdleCA9IC9eRXZlcnkoXFxkKT9XZWVrcz8oXFxkKikkLykudGVzdChycHRSdWxlKSApIHtcclxuXHRcdFx0Ly8g5q+PWzEyMzRd5ZGoWzcxMjM0NTZdXHJcblx0XHRcdGNvbnN0IGN1cldlZWtEYXkgPSBtb21lbnQodGhpcy5zdGFydCkuZGF5KCk7XHJcblx0XHRcdGNvbnN0IHJlc3VsdHMgPSByZWdleC5leGVjKHJwdFJ1bGUpO1xyXG5cdFx0XHRjb25zdCBpbnRlcldlZWsgPSByZXN1bHRzWzFdO1xyXG5cdFx0XHRjb25zdCBudW1iZXIgPSByZXN1bHRzWzJdIHx8IGAke2N1cldlZWtEYXl9YDtcclxuXHRcdFx0ZGF5QXJyYXkgPSB0aGlzLl9nZXRXZWVrbHlSZXBlYXREYXkobnVtYmVyLCBzdGFydCwgZW5kLCBpbnRlcldlZWspO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoIChyZWdleCA9IC9eRXZlcnlXZWVrZGF5KFxcZCopJC8pLnRlc3QocnB0UnVsZSkgKSB7XHJcblx0XHRcdC8vIOavj+S4quW3peS9nOaXpUV2ZXJ5V2Vla2RheTEzNVxyXG5cdFx0XHRjb25zdCByZXN1bHRzID0gcmVnZXguZXhlYyhycHRSdWxlKTtcclxuXHRcdFx0Y29uc3QgbnVtYmVyID0gcmVzdWx0c1sxXSB8fCAnMTIzNDUnO1xyXG5cdFx0XHRkYXlBcnJheSA9IHRoaXMuX2dldFdlZWtseVJlcGVhdERheShudW1iZXIsIHN0YXJ0LCBlbmQpO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoIChyZWdleCA9IC9EYWlseXxXZWVrbHl8TW9udGhseXxZZWFybHkvKS50ZXN0KHJwdFJ1bGUpICkge1xyXG5cdFx0XHQvLyBEYWlseXxXZWVrbHl8TW9udGhseXxZZWFybHlcclxuXHRcdFx0Y29uc3QgcGVyUnVsZSA9IHJlZ2V4LmV4ZWMocnB0UnVsZSlbMF1cclxuXHRcdFx0ZGF5QXJyYXkgPSB0aGlzLl9nZXRQZXJSZXBlYXREYXlzKHN0YXJ0LCBlbmQsIHBlclJ1bGUpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZGF5QXJyYXk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcbiAgICAgKiDmoLnmja7mr4/lkajop4TliJnnlJ/miJDml6XmnJ/mlbDnu4RcclxuXHQgKiBAcGFyYW0ge1N0cmluZ30gbnVtYmVyIOaVtOaVsOWtl+espuS4suihqOekuueahOinhOWIme+8m1xyXG4gICAgICogQHJldHVybnMge09iamVjdFtdfSDljIXlkKvkuIDns7vliJdNb21lbnTml6XmnJ/lr7nosaHnmoTmlbDnu4QuXHJcbiAgICAgKi9cclxuXHRfZ2V0V2Vla2x5UmVwZWF0RGF5KG51bWJlciwgc3RhcnQsIGVuZCwgaW50ZXJXZWVrcyA9ICcxJykge1xyXG5cdFx0Ly/ov5Tlm55be3N0YXJ0LCBlbmR9LCB7c3RhcnQsIGVuZH0sIHtzdGFydCwgZW5kfV1cclxuXHRcdC8v6ICD6JmR5riy5p+T6IyD5Zu077yM5Lul5Y+K57uT5p2f5b6q546v55qE5pel5pyfXHJcblx0XHRjb25zdCB2aWV3U3RhcnQgPSBtb21lbnQodGhpcy5zdGFydCk7XHJcblx0XHRjb25zdCB2aWV3RW5kID0gbW9tZW50KGVuZCk7XHJcblx0XHRjb25zdCBycHRFbmQgPSB0aGlzLnJwdEVuZCA/IG1vbWVudCh0aGlzLnJwdEVuZCkgOiB2aWV3RW5kO1xyXG5cdFx0bGV0IGRheUFycmF5ID0gW107XHJcblx0XHRjb25zdCBpbnRlcnZhbFdlZWtzID0gaW50ZXJXZWVrcyA/IHBhcnNlSW50KGludGVyV2Vla3MpIDogMTtcclxuXHRcdGNvbnN0IHdlZWtkYXlzID0gbnVtYmVyLnJlcGxhY2UoJzcnLCAnMCcpLnNwbGl0KCcnKTsgLy/lkajml6Uwfjblkajlha1cclxuXHRcdGZvciAoIGxldCBkYXkgb2Ygd2Vla2RheXMgKSB7XHJcblx0XHRcdC8vXHJcblx0XHRcdGxldCBjdXJXZWVrRGF5ID0gcGFyc2VJbnQoZGF5KSwgbmV3RXZlbnRTdGFydERhdGUgPSBtb21lbnQodmlld1N0YXJ0KTtcclxuXHRcdFx0ZG8ge1xyXG5cdFx0XHRcdC8vIOWIm+W7uuaWsE1vbWVudOWvueixoVxyXG5cdFx0XHRcdG5ld0V2ZW50U3RhcnREYXRlID0gbW9tZW50KHZpZXdTdGFydCkuZGF5KGN1cldlZWtEYXkpO1xyXG5cdFx0XHRcdC8vIOagueaNruaXpeeoi+iuvue9rnRpbWUgcGFydFxyXG5cdFx0XHRcdGNvbnN0IGV2ZW50U3RhcnQgPSBtb21lbnQodGhpcy5zdGFydClcclxuXHRcdFx0XHRuZXdFdmVudFN0YXJ0RGF0ZS5zZXQoe1xyXG5cdFx0XHRcdFx0J2hvdXInOiBldmVudFN0YXJ0LmdldCgnaG91cicpLFxyXG5cdFx0XHRcdFx0J21pbnV0ZSc6IGV2ZW50U3RhcnQuZ2V0KCdtaW51dGUnKSxcclxuXHRcdFx0XHRcdCdzZWNvbmQnOiBldmVudFN0YXJ0LmdldCgnc2Vjb25kJylcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC8vIOmBv+WFjeWIneWni+mHjeWkjea4suafk1xyXG5cdFx0XHRcdGlmICggIW5ld0V2ZW50U3RhcnREYXRlLmlzU2FtZSggZXZlbnRTdGFydCApICkgZGF5QXJyYXkucHVzaCggbW9tZW50KG5ld0V2ZW50U3RhcnREYXRlKSApO1xyXG5cdFx0XHRcdC8vIOmalOWkmuWwkeWRqOmHjeWkjVxyXG5cdFx0XHRcdGN1cldlZWtEYXkgKz0gNyppbnRlcnZhbFdlZWtzO1xyXG5cdFx0XHRcdC8vY29uc29sZS5sb2coIG1vbWVudChuZXdFdmVudFN0YXJ0RGF0ZSkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJykgKTtcclxuXHRcdFx0fSB3aGlsZSAoIG1vbWVudCh2aWV3U3RhcnQpLmRheShjdXJXZWVrRGF5ICsgNyApLmlzQmVmb3JlKCB2aWV3RW5kICkgXHJcblx0XHRcdFx0XHRcdCYmIG1vbWVudCh2aWV3U3RhcnQpLmRheShjdXJXZWVrRGF5ICsgNyApLmlzQmVmb3JlKCBycHRFbmQgKSAgKVxyXG5cdFx0XHRcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIGRheUFycmF5O1xyXG5cdH07XHJcblxyXG5cdF9nZXRQZXJSZXBlYXREYXlzKHN0YXJ0LCBlbmQsIHBlclJ1bGUpIHtcclxuXHRcdGNvbnN0IHBlclJ1bGVNYXAgPSB7XHJcblx0XHRcdCdEYWlseSc6ICdkYXlzJyxcclxuXHRcdFx0J1dlZWtseScgOiAnd2Vla3MnLFxyXG5cdFx0XHQnTW9udGhseScgOiAnbW9udGhzJyxcclxuXHRcdFx0J1llYXJseScgOiAneWVhcnMnXHJcblx0XHR9O1xyXG5cdFx0Y29uc3Qgdmlld1N0YXJ0ID0gbW9tZW50KHRoaXMuc3RhcnQpO1xyXG5cdFx0Y29uc3Qgdmlld0VuZCA9IG1vbWVudChlbmQpO1xyXG5cdFx0Y29uc3QgcnB0RW5kID0gdGhpcy5ycHRFbmQgPyBtb21lbnQodGhpcy5ycHRFbmQpIDogdmlld0VuZDtcclxuXHRcdGxldCBkYXlBcnJheSA9IFtdO1xyXG5cdFx0Y29uc3QgZXZlbnRTdGFydCA9IG1vbWVudCh0aGlzLnN0YXJ0KVxyXG5cdFx0ZG8ge1xyXG5cdFx0XHQvLyDlop7liqDkuIDkuKrmnIhcclxuXHRcdFx0ZXZlbnRTdGFydC5hZGQoMSwgcGVyUnVsZU1hcFtwZXJSdWxlXSk7XHJcblx0XHRcdGRheUFycmF5LnB1c2goIG1vbWVudChldmVudFN0YXJ0KSApO1xyXG5cdFx0fSB3aGlsZSAoIGV2ZW50U3RhcnQuaXNCZWZvcmUoIHZpZXdFbmQgKSAmJiBldmVudFN0YXJ0LmlzQmVmb3JlKCBycHRFbmQgKSApO1xyXG5cclxuXHRcdHJldHVybiBkYXlBcnJheTtcclxuXHR9XHJcblxyXG5cdHRvRnVsbENhbGVuZGFyRXZlbnQoKSB7XHJcblx0XHQvLyDms6jmhI/mlrnms5Xov5Tlm57nmoTlj6rmmK9GdWxsQ2FsZW5kYXJFdmVudOeahOaVsOaNruexu+Wei++8jOW5tuS4jeaYr2V2ZW505a+56LGhXHJcblx0XHRjb25zdCB0aGF0ID0gdGhpcztcclxuXHRcdGNvbnN0IG5ld0V2ZW50ID0ge307XHJcblx0XHRjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGhpcyk7XHJcblx0XHQvLyDljrvpmaTpnZ7lv4XopoHlsZ7mgKdcclxuXHRcdGtleXMuc3BsaWNlKCBrZXlzLmZpbmRJbmRleCggKGkpID0+IGkgPT0gJ19JbmZvJyApLCAxKTtcclxuXHRcdGtleXMuc3BsaWNlKCBrZXlzLmZpbmRJbmRleCggKGkpID0+IGkgPT0gJ19FeHRyYUluZm8nICksIDEpO1xyXG5cdFx0Ly8g5rWF5ou36LSdLCDkuI3ov4fkuLvopoHlsZ7mgKfpg73mmK/ln7rmnKzmlbDmja7nsbvlnovvvIzmiYDku6XkuI3lrZjlnKjlvJXnlKjpl67pophcclxuXHRcdGtleXMuZm9yRWFjaChmdW5jdGlvbihpdGVtLCBpbmRleCwgYXJyKXtcclxuXHRcdFx0bmV3RXZlbnRbaXRlbV0gPSB0aGF0W2l0ZW1dO1xyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gbmV3RXZlbnQ7XHJcblx0fTtcclxuXHJcblx0dG9XaXpFdmVudERhdGEoKSB7XHJcblx0XHR0aGlzLl91cGRhdGUoKTtcclxuXHRcdGNvbnN0IG5ld0V2ZW50ID0ge307XHJcblx0XHRuZXdFdmVudC50aXRsZSA9IHRoaXMudGl0bGU7XHJcblx0XHRuZXdFdmVudC5ndWlkID0gdGhpcy5pZDtcclxuXHRcdG5ld0V2ZW50LkNBTEVOREFSX1NUQVJUID0gdGhpcy5hbGxEYXkgPyBtb21lbnQodGhpcy5zdGFydCkuZm9ybWF0KCdZWVlZLU1NLUREIDAwOjAwOjAwJykgOiB0aGlzLnN0YXJ0O1xyXG5cdFx0bmV3RXZlbnQuQ0FMRU5EQVJfRU5EID0gdGhpcy5hbGxEYXkgPyBtb21lbnQodGhpcy5lbmQpLmZvcm1hdCgnWVlZWS1NTS1ERCAyMzo1OTo1OScpIDogdGhpcy5lbmQ7XHJcblx0XHRuZXdFdmVudC5DQUxFTkRBUl9JTkZPID0gdGhpcy5fc3RyaW5naWZ5SW5mbyh0aGlzLl9JbmZvKTtcclxuXHRcdG5ld0V2ZW50LkNBTEVOREFSX0VYVFJBSU5GTyA9IHRoaXMuX3N0cmluZ2lmeUluZm8odGhpcy5fRXh0cmFJbmZvKTtcclxuXHRcdG5ld0V2ZW50LmNyZWF0ZWQgPSB0aGlzLmNyZWF0ZWQ7XHJcblx0XHRuZXdFdmVudC51cGRhdGVkID0gdGhpcy51cGRhdGVkO1xyXG5cdFx0cmV0dXJuIG5ld0V2ZW50O1xyXG5cdH07XHJcblxyXG5cdGFkZFRvRnVsbENhbGVuZGFyKCkge1xyXG5cdFx0Ly9UT0RPOiDlsIboh6rouqvmt7vliqDliLBGdWxsQ2FsZW5kYXJcclxuXHRcdHRoaXMuJGNhbGVuZGFyLmZ1bGxDYWxlbmRhciggJ2FkZEV2ZW50U291cmNlJywge1xyXG5cdFx0XHRldmVudHM6IFtcclxuXHRcdFx0XHR0aGlzLnRvRnVsbENhbGVuZGFyRXZlbnQoKVxyXG5cdFx0XHRdXHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRfc2F2ZUFsbFByb3AoKSB7XHJcblx0XHQvL1RPRE86IOS/neWtmOWFqOmDqOaVsOaNruWMheaLrFRpdGxlXHJcblx0XHQvLyDmm7TmlrDkuovku7bmlofmoaPmlbDmja5cclxuXHRcdGNvbnN0IGRvYyA9IGdfZGIuRG9jdW1lbnRGcm9tR1VJRCh0aGlzLmlkKTtcclxuXHRcdC8vIOS/neWtmOagh+mimFxyXG5cdFx0ZG9jLlRpdGxlID0gdGhpcy50aXRsZTtcclxuXHRcdC8vIOS/neWtmOaXtumXtOaVsOaNrlxyXG5cdFx0aWYgKCB0aGlzLmFsbERheSApIHtcclxuXHRcdFx0bGV0IHN0YXJ0U3RyID0gbW9tZW50KHRoaXMuc3RhcnQpLnNldCh7J2gnOiAwLCAnbSc6IDAsICdzJzogMH0pLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHRsZXQgZW5kU3RyID0gbW9tZW50KHRoaXMuZW5kKS5zZXQoeydoJzogMjMsICdtJzogNTksICdzJzogNTl9KS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfU1RBUlRcIiwgc3RhcnRTdHIpO1xyXG5cdFx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9FTkRcIiwgZW5kU3RyKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGxldCBzdGFydFN0ciA9IG1vbWVudCh0aGlzLnN0YXJ0KS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0bGV0IGVuZFN0ciA9IG1vbWVudCh0aGlzLmVuZCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX1NUQVJUXCIsIHN0YXJ0U3RyKTtcclxuXHRcdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfRU5EXCIsIGVuZFN0cik7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8g5L+d5a2YIENBTEVOREFSX0lORk9cclxuXHRcdHRoaXMuX3VwZGF0ZSgpO1xyXG5cdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfSU5GT1wiLCB0aGlzLl9zdHJpbmdpZnlJbmZvKHRoaXMuX0luZm8pKTtcclxuXHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX0VYVFJBSU5GT1wiLCB0aGlzLl9zdHJpbmdpZnlJbmZvKHRoaXMuX0V4dHJhSW5mbykpO1xyXG5cdH07XHJcblxyXG5cdC8vIOiuvue9ruaWh+aho+WxnuaAp+WAvFxyXG5cdF9zZXRQYXJhbVZhbHVlKGRvYywga2V5LCB2YWx1ZSkge1xyXG5cdFx0aWYgKCFkb2MpIHJldHVybiBmYWxzZTtcclxuXHRcdGRvYy5TZXRQYXJhbVZhbHVlKGtleSwgdmFsdWUpO1xyXG5cdH07XHJcblxyXG5cdF9jcmVhdGVXaXpFdmVudERvYygpIHtcclxuXHRcdC8vVE9ETzog5L+d5a2Y5YWo6YOo5pWw5o2u5YyF5ousVGl0bGVcclxuXHRcdC8vIOWIm+W7uldpekRvY1xyXG5cdFx0Y29uc3QgbG9jYXRpb24gPSBgTXkgRXZlbnRzLyR7IG1vbWVudCh0aGlzLnN0YXJ0KS5mb3JtYXQoJ1lZWVktTU0nKSB9L2A7XHJcblx0XHRjb25zdCBvYmpGb2xkZXIgPSBnX2RiLkdldEZvbGRlckJ5TG9jYXRpb24obG9jYXRpb24sIHRydWUpO1xyXG5cdFx0Y29uc3QgdGVtcEh0bWwgPSBnX2Ntbi5HZXRBVGVtcEZpbGVOYW1lKCcuaHRtbCcpO1xyXG5cdFx0Y29uc3QgaHRtbFRleHQgPSB0aGlzLl9nZXRFdmVudEh0bWwodGhpcy50aXRsZSwgJycpO1xyXG5cdFx0Z19jbW4uU2F2ZVRleHRUb0ZpbGUodGVtcEh0bWwsIGh0bWxUZXh0LCAndW5pY29kZScpO1xyXG5cdFx0Y29uc3QgZG9jID0gb2JqRm9sZGVyLkNyZWF0ZURvY3VtZW50Mih0aGlzLnRpdGxlLCBcIlwiKTtcclxuXHRcdGRvYy5DaGFuZ2VUaXRsZUFuZEZpbGVOYW1lKHRoaXMudGl0bGUpO1xyXG5cdFx0ZG9jLlVwZGF0ZURvY3VtZW50Nih0ZW1wSHRtbCwgdGVtcEh0bWwsIDB4MjIpO1xyXG5cdFx0Ly8g6K6+572u5qCH562+XHJcblx0XHQvL2lmICggdGFncyApIGRvYy5TZXRUYWdzVGV4dDIodGFncywgXCJDYWxlbmRhclwiKTtcclxuXHRcdC8vIOWwhuS/oeaBr+e8lueggeWIsFdpekRvY+WxnuaAp+S4reWOu1xyXG5cdFx0Y29uc3QgbmV3RXZlbnQgPSB0aGlzLnRvV2l6RXZlbnREYXRhKCk7XHJcblx0XHRkb2MuQWRkVG9DYWxlbmRhcihuZXdFdmVudC5DQUxFTkRBUl9TVEFSVCwgbmV3RXZlbnQuQ0FMRU5EQVJfRU5ELCBuZXdFdmVudC5DQUxFTkRBUl9JTkZPKTtcclxuXHRcdC8vIGNoYW5nZSBkYXRhYmFzZVxyXG5cdFx0ZG9jLnR5cGUgPSBcImV2ZW50XCI7XHJcblx0XHQvL1xyXG5cdFx0dGhpcy5pZCA9IGRvYy5HVUlEO1xyXG5cdH1cclxuXHJcblx0c2F2ZVRvV2l6RXZlbnREb2MoIHByb3AgPSAnYWxsJyApIHtcclxuXHRcdGlmICghZ19kYiB8fCAhZ19jbW4pIHRocm93IG5ldyBFcnJvcignSVdpekRhdGFiYXNlIG9yIElXaXpDb21tb25VSSBpcyBub3QgdmFsaWQuJyk7XHJcblx0XHQvL+ajgOafpeaWh+aho+aYr+WQpuWtmOWcqFxyXG5cdFx0Y29uc3QgZ3VpZFJlZ2V4ID0gL15bMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfSQvaTtcclxuXHRcdGNvbnN0IGlzV2l6RG9jRXhpc3QgPSBndWlkUmVnZXgudGVzdCh0aGlzLmlkKTtcclxuXHRcdC8vIOWIm+W7uuaIluiAheabtOaWsOaWh+aho1xyXG5cdFx0aWYgKCBpc1dpekRvY0V4aXN0ICkge1xyXG5cdFx0XHQvLyDmoLnmja7mjIfku6Tmm7TmlrDlhoXlrrlcclxuXHRcdFx0dGhpcy5fc2F2ZUFsbFByb3AoKTtcclxuXHRcdFx0Ly8g5pu05pawRnVsbENhbGVuZGFyXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQvLyDliJvlu7rmlrDnmoTkuovku7bmlofmoaNcclxuXHRcdFx0dGhpcy5fY3JlYXRlV2l6RXZlbnREb2MoKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdH07XHJcblxyXG5cdGRlbGV0ZUV2ZW50RGF0YSggaXNEZWxldGVEb2MgPSBmYWxzZSApe1xyXG5cdFx0bGV0IGRvYyA9IGdfZGIuRG9jdW1lbnRGcm9tR1VJRCh0aGlzLmlkKTtcclxuXHRcdGlmICghZG9jKSB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgZmluZCBFdmVudCByZWxhdGVkIFdpekRvY3VtZW50LicpXHJcblx0XHQvLyDnp7vpmaRGdWxsQ2FsZW5kYXLkuovku7ZcclxuXHRcdHRoaXMuJGNhbGVuZGFyLmZ1bGxDYWxlbmRhcigncmVtb3ZlRXZlbnRzJywgdGhpcy5pZCk7XHJcblx0XHQvLyDnp7vpmaTml6XljobmlbDmja5cclxuXHRcdGRvYy5SZW1vdmVGcm9tQ2FsZW5kYXIoKTtcclxuXHRcdC8vIOWIoOmZpOaWh+aho1xyXG5cdFx0aWYgKCBpc0RlbGV0ZURvYyApIGRvYy5EZWxldGUoKTtcclxuXHR9XHJcblxyXG5cdHJlZmV0Y2hEYXRhKCkge1xyXG5cdFx0Ly9UT0RPOiDph43mlbDmja7lupPph43mlrDojrflj5bmlbDmja7mm7TmlrDlrp7kvotcclxuXHR9O1xyXG5cclxuXHRyZWZyZXNoRXZlbnQoZXZlbnQpIHtcclxuXHRcdC8vVE9ETzog5bqU6K+l6Ieq5Yqo6YGN5Y6G5bm25L+u5pS55bGe5oCnXHJcblx0XHRpZiAoIGV2ZW50ICkge1xyXG5cdFx0XHQvLyDph43mlrDmuLLmn5NGdWxsQ2FsZW5kYXLkuovku7ZcclxuXHRcdFx0ZXZlbnQudGl0bGUgPSB0aGlzLnRpdGxlO1xyXG5cdFx0XHRldmVudC5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmJhY2tncm91bmRDb2xvcjtcclxuXHRcdFx0dGhpcy4kY2FsZW5kYXIuZnVsbENhbGVuZGFyKCd1cGRhdGVFdmVudCcsIGV2ZW50KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdC8v55SoLmZ1bGxDYWxlbmRhcigg4oCYY2xpZW50RXZlbnRz4oCZIFssIGlkT3JGaWx0ZXIgXSApIC0+IEFycmF5IOiOt+WPlua6kOaVsOaNruS7juiAjOabtOaWsFxyXG5cdFx0XHQvL1RPRE86IOmBjeWOhuW5tuWvu+aJvkdVSUTljLnphY3nmoTkuovku7ZcclxuXHRcdH1cclxuXHR9XHJcblxyXG59IiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcclxuaW1wb3J0IFdpekV2ZW50RGF0YUxvYWRlciBmcm9tICcuL1dpekV2ZW50RGF0YUxvYWRlcic7XHJcbmltcG9ydCBDYWxlbmRhckV2ZW50IGZyb20gJy4vQ2FsZW5kYXJFdmVudCc7XHJcbmltcG9ydCB7IFdpekNvbmZpcm0sIFdpekNvbW1vblVJIGFzIG9iakNvbW1vbiwgV2l6RGF0YWJhc2UgYXMgb2JqRGF0YWJhc2UsIFdpekV4cGxvcmVyV2luZG93IGFzIG9ialdpbmRvdyB9IGZyb20gJy4uL3V0aWxzL1dpekludGVyZmFjZSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtSGFuZGxlcyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLiRjYWxlbmRhciA9ICQoJyNjYWxlbmRhcicpXHJcbiAgICB9O1xyXG5cclxuICAgIG9uQ3JlYXRlQnRuQ2xpY2soeyBzdGFydCwgZW5kLCB0aXRsZSwgYmFja2dyb3VuZENvbG9yIH0pIHtcclxuICAgICAgICBjb25zdCBmdWxsQ2FsZW5kYXIgPSB0aGlzLiRjYWxlbmRhci5mdWxsQ2FsZW5kYXIoJ2dldENhbGVuZGFyJyk7XHJcbiAgICAgICAgY29uc3QgbW9tZW50ID0gZnVsbENhbGVuZGFyLm1vbWVudC5iaW5kKGZ1bGxDYWxlbmRhcik7XHJcbiAgICAgICAgY29uc3Qgc3RhcnRNb21lbnQgPSBtb21lbnQoc3RhcnQpO1xyXG4gICAgICAgIGNvbnN0IGVuZE1vbWVudCA9IG1vbWVudChlbmQpO1xyXG4gICAgICAgIGNvbnN0IG5ld0V2ZW50ID0gbmV3IENhbGVuZGFyRXZlbnQoe1xyXG4gICAgICAgICAgICB0aXRsZTogdGl0bGUgfHwgJ+aXoOagh+mimCcsXHJcbiAgICAgICAgICAgIHN0YXJ0OiBzdGFydE1vbWVudCxcclxuICAgICAgICAgICAgZW5kOiBlbmRNb21lbnQsXHJcbiAgICAgICAgICAgIGFsbERheTogc3RhcnRNb21lbnQuaGFzVGltZSgpICYmIGVuZE1vbWVudC5oYXNUaW1lKCkgPyBmYWxzZSA6IHRydWUsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogYmFja2dyb3VuZENvbG9yID8gYmFja2dyb3VuZENvbG9yIDogJyMzMkNEMzInLFxyXG4gICAgICAgIH0sIHRoaXMuJGNhbGVuZGFyKTtcclxuICAgICAgICAvLyDkv53lrZjlubbmuLLmn5Pkuovku7ZcclxuICAgICAgICBuZXdFdmVudC5zYXZlVG9XaXpFdmVudERvYygpO1xyXG4gICAgICAgIG5ld0V2ZW50LnJlZmV0Y2hEYXRhKCk7XHJcbiAgICAgICAgbmV3RXZlbnQuYWRkVG9GdWxsQ2FsZW5kYXIoKTtcclxuICAgIH07XHJcblxyXG4gICAgb25TYXZlQnRuQ2xpY2soZXZlbnQsIG5ld0V2ZW50RGF0YSkge1xyXG4gICAgICAgIGZvciAoY29uc3QgcHJvcCBpbiBuZXdFdmVudERhdGEpIHtcclxuICAgICAgICAgICAgZXZlbnRbcHJvcF0gPSBuZXdFdmVudERhdGFbcHJvcF1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g6YeN5paw5riy5p+TXHJcbiAgICAgICAgdGhpcy4kY2FsZW5kYXIuZnVsbENhbGVuZGFyKCAndXBkYXRlRXZlbnQnLCBldmVudCApO1xyXG4gICAgICAgIC8vIOS/ruaUuea6kOaVsOaNrlxyXG4gICAgICAgIGNvbnN0IG5ld0V2ZW50ID0gbmV3IENhbGVuZGFyRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgIG5ld0V2ZW50LnNhdmVUb1dpekV2ZW50RG9jKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIG9uQ29tcGxldGVCdG5DbGljayhldmVudCkge1xyXG4gICAgICAgIC8vIOS/ruaUueaVsOaNrlxyXG4gICAgICAgIGNvbnN0IGlzQ29tcGxldGUgPSBwYXJzZUludChldmVudC5jb21wbGV0ZSkgPT0gNTtcclxuICAgICAgICBpZiAoIGlzQ29tcGxldGUgKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LmNvbXBsZXRlID0gJzAnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGV2ZW50LmNvbXBsZXRlID0gJzUnO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDkv53lrZjmlbDmja5cclxuICAgICAgICBjb25zdCBuZXdFdmVudCA9IG5ldyBDYWxlbmRhckV2ZW50KGV2ZW50KTtcclxuICAgICAgICBuZXdFdmVudC5zYXZlVG9XaXpFdmVudERvYygpO1xyXG4gICAgICAgIC8vIOmHjeaWsOa4suafk1xyXG4gICAgICAgIHRoaXMuJGNhbGVuZGFyLmZ1bGxDYWxlbmRhciggJ3VwZGF0ZUV2ZW50JywgZXZlbnQgKTtcclxuICAgIH07XHJcblxyXG4gICAgb25EZWxldGVEYXRhQnRuQ2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoIFdpekNvbmZpcm0oXCLnoa7lrpropoHliKDpmaTor6Xml6XnqIvvvJ9cIiwgJ+eVquiMhOWKqeeQhicpICkge1xyXG4gICAgICAgICAgICAvLyDliKDpmaTml6XnqItcclxuICAgICAgICAgICAgbGV0IG5ld0V2ZW50ID0gbmV3IENhbGVuZGFyRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgICAgICBuZXdFdmVudC5kZWxldGVFdmVudERhdGEoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgb25EZWxldGVEb2NCdG5DbGljayhldmVudCkge1xyXG4gICAgICAgIGlmICggV2l6Q29uZmlybShcIuehruWumuimgeWIoOmZpOivpeaXpeeoi+a6kOaWh+aho++8n1xcbuOAjOehruWumuOAjeWwhuS8muWvvOiHtOebuOWFs+eslOiusOiiq+WIoOmZpO+8gVwiLCAn55Wq6IyE5Yqp55CGJykgKSB7XHJcbiAgICAgICAgICAgIGxldCBuZXdFdmVudCA9IG5ldyBDYWxlbmRhckV2ZW50KGV2ZW50KTtcclxuICAgICAgICAgICAgbmV3RXZlbnQuZGVsZXRlRXZlbnREYXRhKHRydWUpO1xyXG4gICAgICAgIH1cdFxyXG4gICAgfTtcclxuXHJcbiAgICBvbkVkaXRPcmlnaW5CdG5DbGljayhldmVudCkge1xyXG4gICAgICAgIGNvbnN0IGRvYyA9IG9iakRhdGFiYXNlLkRvY3VtZW50RnJvbUdVSUQoZXZlbnQuaWQpO1xyXG4gICAgICAgIG9iakNvbW1vbi5FZGl0Q2FsZW5kYXJFdmVudChkb2MpO1xyXG4gICAgfTtcclxuXHJcbiAgICBvbk9wZW5Eb2NCdG5DbGljayhldmVudCkge1xyXG4gICAgICAgIGNvbnN0IGRvYyA9IG9iakRhdGFiYXNlLkRvY3VtZW50RnJvbUdVSUQoZXZlbnQuaWQpO1xyXG4gICAgICAgIG9ialdpbmRvdy5WaWV3RG9jdW1lbnQoZG9jLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBXaXpEYXRhYmFzZSBhcyBvYmpEYXRhYmFzZSB9IGZyb20gJy4uL3V0aWxzL1dpekludGVyZmFjZSc7XHJcbmltcG9ydCBDYWxlbmRhckV2ZW50IGZyb20gJy4vQ2FsZW5kYXJFdmVudCc7XHJcblxyXG4vKiDmlbDmja7ojrflj5ZcclxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG4vKiog6K+l57G75LiOV2l6bm90ZeeahFdpekRhdGFiYXNl5o6l5Y+j5Lqk5o2i5L+h5oGv77yM6I635Y+W5pWw5o2uICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdpekV2ZW50RGF0YUxvYWRlciB7XHJcblx0LyoqXHJcbiAgICAgKiDliJvpgKDkuIDkuKrkuovku7bmlbDmja7liqDovb3lmaguXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHN0YXJ0IOafpeivoui1t+Wni+aXpeacn++8jElTT+agh+WHhuaXpeacn+Wtl+espuS4si5cclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZW5kIOafpeivouaIquiHs+aXpeacn++8jElTT+agh+WHhuaXpeacn+Wtl+espuS4si5cclxuICAgICAqL1xyXG5cdGNvbnN0cnVjdG9yKGNhbGVuZGFyKSB7XHJcblx0XHRpZiAoIW9iakRhdGFiYXNlKSB0aHJvdyBuZXcgRXJyb3IoJ1dpekRhdGFiYXNlIG5vdCB2YWxpZCAhJyk7XHJcblx0XHR0aGlzLkRhdGFiYXNlID0gb2JqRGF0YWJhc2U7XHJcblx0XHR0aGlzLnVzZXJOYW1lID0gb2JqRGF0YWJhc2UuVXNlck5hbWU7XHJcblx0XHR0aGlzLiRjYWxlbmRhciA9ICQoY2FsZW5kYXIpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG4gICAgICog6I635b6X5riy5p+T5ZCO55qE5omA5pyJRnVsbENhbGVuZGFy5LqL5Lu2LlxyXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSB2aWV3IGlzIHRoZSBWaWV3IE9iamVjdCBvZiBGdWxsQ2FsZW5kYXIgZm9yIHRoZSBuZXcgdmlldy5cclxuXHQgKiBAcGFyYW0ge29iamVjdH0gZWxlbWVudCBpcyBhIGpRdWVyeSBlbGVtZW50IGZvciB0aGUgY29udGFpbmVyIG9mIHRoZSBuZXcgdmlldy5cclxuICAgICAqIEByZXR1cm4ge09iamVjdFtdfSDov5Tlm57nlKjkuo5GdWxsQ2FsZW5kYXIg5riy5p+T55qEIGV2ZW50U291cmNlcyDmlbDnu4QuXHJcbiAgICAgKi9cclxuXHRnZXRFdmVudFNvdXJjZXMoIHZpZXcsIGVsZW1lbnQgKXtcclxuXHRcdGNvbnN0IHZpZXdTdGFydCA9IHZpZXcuc3RhcnQuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRjb25zdCB2aWV3RW5kID0gdmlldy5lbmQuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRsZXQgZXZlbnRTb3VyY2VzID0gW107XHJcblx0XHQvL+iOt+WPluaZrumAmuaXpeeoi1xyXG5cdFx0Y29uc3QgZ2VuZXJhbEV2ZW50U291cmNlID0ge1xyXG5cdFx0XHR0eXBlOiAnZ2VuZXJhbEV2ZW50cycsXHJcblx0XHRcdC8vZXZlbnRzOiB0aGlzLl9nZXRBbGxPcmlnaW5hbEV2ZW50KFtdLCB0aGlzLl9kMnMoY3VycmVudFZpZXcuc3RhcnQudG9EYXRlKCkpLCB0aGlzLl9kMnMoY3VycmVudFZpZXcuZW5kLnRvRGF0ZSgpKSlcclxuXHRcdFx0ZXZlbnRzOiB0aGlzLl9nZXRBbGxPcmlnaW5hbEV2ZW50KHZpZXdTdGFydCwgdmlld0VuZClcclxuXHRcdH1cclxuXHRcdGV2ZW50U291cmNlcy5wdXNoKGdlbmVyYWxFdmVudFNvdXJjZSk7XHJcblx0XHRcclxuXHRcdC8vVE9ETzog6I635Y+W6YeN5aSN5pel56iLXHJcblx0XHRjb25zdCByZXBlYXRFdmVudFNvdXJjZXMgPSB0aGlzLl9nZXRBbGxSZXBlYXRFdmVudCh2aWV3U3RhcnQsIHZpZXdFbmQpO1xyXG5cdFx0ZXZlbnRTb3VyY2VzID0gZXZlbnRTb3VyY2VzLmNvbmNhdChyZXBlYXRFdmVudFNvdXJjZXMpO1xyXG5cdFx0Ly9cclxuXHRcdHJldHVybiBldmVudFNvdXJjZXM7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcbiAgICAgKiDku45XaXpEYXRhYmFzZeS4reiOt+WPluaJgOacieaVsOaNruaWh+ahoy5cclxuXHQgKiBAcGFyYW0ge2FycmF5fSBldmVudHMg5Yid5aeL5LqL5Lu25pWw57uELlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBzdGFydCBJU0/moIflh4bml6XmnJ/lrZfnrKbkuLIuXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGVuZCBJU0/moIflh4bml6XmnJ/lrZfnrKbkuLIuXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3RbXX0g6L+U5Zue55So5LqORnVsbENhbGVuZGFy5riy5p+T55qE5LqL5Lu25pWw57uELlxyXG4gICAgICovXHJcblx0X2dldEFsbE9yaWdpbmFsRXZlbnQoc3RhcnQsIGVuZCl7XHJcblx0XHRjb25zdCBldmVudHMgPSBbXTtcclxuXHRcdGxldCBzcWwgPSBgRE9DVU1FTlRfTE9DQVRJT04gbm90IGxpa2UgJy9EZWxldGVkIEl0ZW1zLyUnIGFuZCAoS0JfR1VJRCBpcyBudWxsIG9yIEtCX0dVSUQgPSAnJylgO1xyXG5cdFx0bGV0IGFuZDEgPSBgIGFuZCBET0NVTUVOVF9HVUlEIGluIChzZWxlY3QgRE9DVU1FTlRfR1VJRCBmcm9tIFdJWl9ET0NVTUVOVF9QQVJBTSB3aGVyZSBQQVJBTV9OQU1FID0gJ0NBTEVOREFSX1NUQVJUJyAgYW5kICBQQVJBTV9WQUxVRSA8PSAnJHtlbmR9JyApYDtcclxuXHRcdGxldCBhbmQyID0gYCBhbmQgRE9DVU1FTlRfR1VJRCBpbiAoc2VsZWN0IERPQ1VNRU5UX0dVSUQgZnJvbSBXSVpfRE9DVU1FTlRfUEFSQU0gd2hlcmUgUEFSQU1fTkFNRSA9ICdDQUxFTkRBUl9FTkQnICBhbmQgIFBBUkFNX1ZBTFVFID49ICcke3N0YXJ0fScgKWA7XHJcblx0XHRpZiAoc3RhcnQpIHNxbCArPSBhbmQyO1xyXG5cdFx0aWYgKGVuZCkgc3FsICs9IGFuZDE7XHJcblx0XHRpZiAob2JqRGF0YWJhc2UuRG9jdW1lbnRzRGF0YUZyb21TUUwpIHtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRjb25zdCBkYXRhID0gb2JqRGF0YWJhc2UuRG9jdW1lbnRzRGF0YUZyb21TUUwoc3FsKTtcclxuXHRcdFx0XHRpZiAoICFkYXRhICkgcmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdGNvbnN0IG9iaiA9IEpTT04ucGFyc2UoZGF0YSk7XHJcblx0XHRcdFx0aWYgKCAhb2JqIHx8ICFBcnJheS5pc0FycmF5KG9iaikgKSByZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpICsrKSB7XHJcblx0XHRcdFx0XHRldmVudHMucHVzaChcclxuXHRcdFx0XHRcdFx0bmV3IENhbGVuZGFyRXZlbnQob2JqW2ldLCB0aGlzLiRjYWxlbmRhcikudG9GdWxsQ2FsZW5kYXJFdmVudCgpXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRcclxuXHRcdFx0XHRyZXR1cm4gZXZlbnRzO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNhdGNoKGVycikge1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0RvY3VtZW50c0RhdGFGcm9tU1FMIG1ldGhvZCBvZiBXaXpEYXRhYmFzZSBub3QgZXhpc3QhJyk7XHJcblx0XHRcdC8qXHJcblx0XHRcdGxldCBkb2NDb2xsZXRpb24gPSBvYmpEYXRhYmFzZS5Eb2N1bWVudHNGcm9tU1FMKHNxbCk7XHJcblx0XHRcdC8vXHJcblx0XHRcdGlmIChkb2NDb2xsZXRpb24gJiYgZG9jQ29sbGV0aW9uLkNvdW50KXtcclxuXHRcdFx0XHRsZXQgZG9jO1xyXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZG9jQ29sbGV0aW9uLkNvdW50OyArKyBpKXtcclxuXHRcdFx0XHRcdGRvYyA9IGRvY0NvbGxldGlvbi5JdGVtKGkpO1xyXG5cdFx0XHRcdFx0bGV0IGV2ZW50T2JqID0gX2V2ZW50T2JqZWN0KF9uZXdQc2V1ZG9Eb2MoZG9jKSk7XHJcblx0XHRcdFx0XHRpZiAoZXZlbnRPYmopXHJcblx0XHRcdFx0XHRcdGV2ZW50cy5wdXNoKGV2ZW50T2JqKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIGV2ZW50cztcclxuXHRcdFx0fVxyXG5cdFx0XHQqL1x0XHRcclxuXHRcdH1cclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcbiAgICAgKiDku45XaXpEYXRhYmFzZeS4reiOt+WPluaJgOacieW+queOr+mHjeWkjeS6i+S7ti5cclxuXHQgKiDku47liJvlu7rkuovku7bnmoTml6XmnJ/lvIDlp4vliLBFTkRSRUNVUlJFTkNF57uT5p2fXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3RbXX0g6L+U5Zue55So5LqORnVsbENhbGVuZGFy5riy5p+T55qEIGV2ZW50U291cmNlIOaVsOe7hC5cclxuICAgICAqL1xyXG5cdF9nZXRBbGxSZXBlYXRFdmVudChzdGFydCwgZW5kKXtcclxuXHRcdGNvbnN0IHJlcGVhdEV2ZW50cyA9IFtdO1xyXG5cdFx0Y29uc3Qgc3FsID0gXCJET0NVTUVOVF9MT0NBVElPTiBub3QgbGlrZSAnL0RlbGV0ZWQgSXRlbXMvJScgYW5kIChLQl9HVUlEIGlzIG51bGwgb3IgS0JfR1VJRCA9ICcnKSBhbmQgXCIgKyBcclxuXHRcdFx0XHRcdFwiRE9DVU1FTlRfR1VJRCBpbiAoc2VsZWN0IERPQ1VNRU5UX0dVSUQgZnJvbSBXSVpfRE9DVU1FTlRfUEFSQU0gd2hlcmUgUEFSQU1fTkFNRT0nQ0FMRU5EQVJfUkVDVVJSRU5DRScpXCI7XHJcblxyXG5cdFx0Y29uc3QgZGF0YSA9IG9iakRhdGFiYXNlLkRvY3VtZW50c0RhdGFGcm9tU1FMKHNxbCk7XHJcblx0XHRjb25zb2xlLmxvZyhkYXRhKVxyXG5cdFx0aWYgKCAhZGF0YSApIHJldHVybiBmYWxzZTtcclxuXHRcdFxyXG5cdFx0Y29uc3Qgb2JqID0gSlNPTi5wYXJzZShkYXRhKTtcclxuXHRcdGlmICggIW9iaiB8fCAhQXJyYXkuaXNBcnJheShvYmopICkgcmV0dXJuIGZhbHNlO1xyXG5cdFx0XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkgKyspIHtcclxuXHRcdFx0cmVwZWF0RXZlbnRzLnB1c2goXHJcblx0XHRcdFx0bmV3IENhbGVuZGFyRXZlbnQob2JqW2ldLCB0aGlzLiRjYWxlbmRhcikuZ2VuZXJhdGVSZXBlYXRFdmVudHMoc3RhcnQsIGVuZClcclxuXHRcdFx0KVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlcGVhdEV2ZW50cztcclxuXHRcdFxyXG5cdH07XHJcblxyXG5cdC8vIOaXpeWOhuS6i+S7tuaLluWKqOWQjuabtOaWsOaVsOaNrlxyXG5cdHVwZGF0ZUV2ZW50RGF0YU9uRHJvcChldmVudCwgZGVsdGEsIHJldmVydEZ1bmMsIGpzRXZlbnQsIHVpLCB2aWV3KXtcclxuXHRcdC8vIENhbGwgaGFzVGltZSBvbiB0aGUgZXZlbnTigJlzIHN0YXJ0L2VuZCB0byBzZWUgaWYgaXQgaGFzIGJlZW4gZHJvcHBlZCBpbiBhIHRpbWVkIG9yIGFsbC1kYXkgYXJlYS5cclxuXHRcdGNvbnN0IGFsbERheSA9ICFldmVudC5zdGFydC5oYXNUaW1lKCk7XHJcblx0XHQvLyDojrflj5bkuovku7bmlofmoaPml7bpl7TmlbDmja5cclxuXHRcdGNvbnN0IGRvYyA9IG9iakRhdGFiYXNlLkRvY3VtZW50RnJvbUdVSUQoZXZlbnQuaWQpO1xyXG5cdFx0Ly8g5pu05paw5pWw5o2uXHJcblx0XHRpZiAoIGFsbERheSApIHtcclxuXHRcdFx0Y29uc3Qgc3RhcnRTdHIgPSBldmVudC5zdGFydC5zZXQoeydoJzogMCwgJ20nOiAwLCAncyc6IDB9KS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0Y29uc3QgZW5kU3RyID0gZXZlbnQuZW5kLnNldCh7J2gnOiAyMywgJ20nOiA1OSwgJ3MnOiA1OX0pLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9TVEFSVFwiLCBzdGFydFN0cik7XHJcblx0XHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX0VORFwiLCBlbmRTdHIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc3Qgc3RhcnRTdHIgPSBldmVudC5zdGFydC5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0Y29uc3QgZW5kU3RyID0gZXZlbnQuZW5kLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9TVEFSVFwiLCBzdGFydFN0cik7XHJcblx0XHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX0VORFwiLCBlbmRTdHIpO1xyXG5cdFx0fVxyXG5cdFx0Ly9UT0RPOiDmm7TmlrBDQUxFTkRBUl9SRUNVUlJFTkNF5pWw5o2uXHJcblx0XHQvLyBcclxuXHRcdHRoaXMuX3VwZGF0ZURvY01vZGlmeURhdGUoZG9jKTtcclxuXHR9O1xyXG5cclxuXHQvLyDorr7nva7mlofmoaPlsZ7mgKflgLxcclxuXHRfc2V0UGFyYW1WYWx1ZShkb2MsIGtleSwgdmFsdWUpIHtcclxuXHRcdGlmICghZG9jKSByZXR1cm4gZmFsc2U7XHJcblx0XHRkb2MuU2V0UGFyYW1WYWx1ZShrZXksIHZhbHVlKTtcclxuXHR9O1xyXG5cclxuXHQvLyDmm7TmlrBXaXpEb2Pkv67mlLnml7bpl7RcclxuXHRfdXBkYXRlRG9jTW9kaWZ5RGF0ZShkb2Mpe1xyXG5cdFx0Y29uc3Qgbm93ID0gbmV3IERhdGUoKTtcclxuXHRcdGlmICghZG9jKSByZXR1cm4gZmFsc2U7XHJcblx0XHRub3cuc2V0U2Vjb25kcygobm93LmdldFNlY29uZHMoKSArIDEpICUgNjApO1xyXG5cdFx0ZG9jLkRhdGVNb2RpZmllZCA9IHRoaXMuX2Qycyhub3cpO1xyXG5cdH07XHJcblxyXG5cdC8vIOWwhuaXpeacn+Wvueixoei9rOWMluS4uuWtl+espuS4slxyXG5cdC8vVE9ETzog6ICD6JmR5L6d6LWWbW9tZW505p2l566A5YyW6L2s5o2i6L+H56iLXHJcblx0X2QycyhkdCl7XHJcblx0XHRjb25zdCByZXQgPSBkdC5nZXRGdWxsWWVhcigpICsgXCItXCIgKyBcclxuXHRcdFx0XHRcdGZvcm1hdEludFRvRGF0ZVN0cmluZyhkdC5nZXRNb250aCgpICsgMSkgKyBcIi1cIiArIFxyXG5cdFx0XHRcdFx0Zm9ybWF0SW50VG9EYXRlU3RyaW5nKGR0LmdldERhdGUoKSkgKyBcIiBcIiArIFxyXG5cdFx0XHRcdFx0Zm9ybWF0SW50VG9EYXRlU3RyaW5nKGR0LmdldEhvdXJzKCkpKyBcIjpcIiArIFxyXG5cdFx0XHRcdFx0Zm9ybWF0SW50VG9EYXRlU3RyaW5nKGR0LmdldE1pbnV0ZXMoKSkgKyBcIjpcIiArIFxyXG5cdFx0XHRcdFx0Zm9ybWF0SW50VG9EYXRlU3RyaW5nKGR0LmdldFNlY29uZHMoKSk7XHJcblx0XHRyZXR1cm4gcmV0O1xyXG5cdH07XHJcblxyXG5cdC8vIOaXpeWOhuaXtumXtOmHjee9ruaXtumXtOiMg+WbtOWQjuabtOaWsOaVsOaNrlxyXG5cdHVwZGF0ZUV2ZW50RGF0YU9uUmVzaXplKGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXcpe1xyXG5cdFx0Y29uc3QgYWxsRGF5ID0gZXZlbnQuc3RhcnQuaGFzVGltZSgpID8gZmFsc2UgOiB0cnVlO1xyXG5cdFx0Ly8g6I635b6X5LqL5Lu25paH5qGj5pe26Ze05pWw5o2uXHJcblx0XHRjb25zdCBkb2MgPSBvYmpEYXRhYmFzZS5Eb2N1bWVudEZyb21HVUlEKGV2ZW50LmlkKTtcclxuXHRcdC8vIOiuoeeul+abtOaUueWQjueahOe7k+adn+aXtumXtFxyXG5cdFx0Y29uc3QgZXZlbnRFbmRTdHIgPSBldmVudC5lbmQuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHQvLyDmm7TmlrDmlofmoaPmlbDmja5cclxuXHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX0VORFwiLCBldmVudEVuZFN0cik7XHJcblx0XHR0aGlzLl91cGRhdGVEb2NNb2RpZnlEYXRlKGRvYyk7XHJcblx0fTtcclxuXHJcblx0Ly8g5Yib5bu65LqL5Lu2IHN0YXJ0LCBlbmQsIGpzRXZlbnQsIHZpZXdcclxuXHQvKipcclxuICAgICAqIOWIm+W7uuS6i+S7ti5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gc2VsZWN0aW9uRGF0YSBGdWxsQ2FsZW5kYXIg5Lyg5YWl55qE5pWw5o2uLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBzZWxlY3Rpb25EYXRhLnN0YXJ0IE1vbWVudCDnsbvml6XmnJ/lr7nosaEuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IHNlbGVjdGlvbkRhdGEuZW5kIE1vbWVudCDnsbvml6XmnJ/lr7nosaEuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IHNlbGVjdGlvbkRhdGEuanNFdmVudCBuYXRpdmUgSmF2YVNjcmlwdCDkuovku7YuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IHNlbGVjdGlvbkRhdGEudmlldyBGdWxsQ2FsZW5kYXIg6KeG5Zu+5a+56LGhLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSB1c2VySW5wdXRzIOeUqOaIt+S8oOWFpeeahOWFtuS7luS/oeaBry5cclxuICAgICAqIFRPRE86IOivpeaWueazleWPr+S7peaUvue9ruWIsENhbGVuZGFyRXZlbnTnmoTpnZnmgIHmlrnms5XkuIpcclxuICAgICAqL1xyXG5cdGNyZWF0ZUV2ZW50KHNlbGVjdGlvbkRhdGEsIHVzZXJJbnB1dHMpe1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Ly8g6I635Y+W55So5oi36K6+572uXHJcblx0XHRcdGNvbnN0IG5ld0V2ZW50ID0gbmV3IENhbGVuZGFyRXZlbnQoe1xyXG5cdFx0XHRcdHRpdGxlOiB1c2VySW5wdXRzLnRpdGxlID8gdXNlcklucHV0cy50aXRsZSA6ICfml6DmoIfpopgnLFxyXG5cdFx0XHRcdHN0YXJ0OiBzZWxlY3Rpb25EYXRhLnN0YXJ0LFxyXG5cdFx0XHRcdGVuZDogc2VsZWN0aW9uRGF0YS5lbmQsXHJcblx0XHRcdFx0YWxsRGF5OiBzZWxlY3Rpb25EYXRhLnN0YXJ0Lmhhc1RpbWUoKSAmJiBzZWxlY3Rpb25EYXRhLmVuZC5oYXNUaW1lKCkgPyBmYWxzZSA6IHRydWUsXHJcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiB1c2VySW5wdXRzLmNvbG9yID8gdXNlcklucHV0cy5jb2xvciA6ICcjMzJDRDMyJyxcclxuXHRcdFx0fSwgdGhpcy4kY2FsZW5kYXIpO1xyXG5cdFx0XHQvLyDkv53lrZjlubbmuLLmn5Pkuovku7ZcclxuXHRcdFx0bmV3RXZlbnQuc2F2ZVRvV2l6RXZlbnREb2MoKTtcclxuXHRcdFx0bmV3RXZlbnQucmVmZXRjaERhdGEoKTtcclxuXHRcdFx0bmV3RXZlbnQuYWRkVG9GdWxsQ2FsZW5kYXIoKTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtjb25zb2xlLmxvZyhlKX1cclxuXHR9XHJcblxyXG59XHJcblxyXG5cclxuLy8gVE9ETzog6YeN5YaZ6I635Y+W5pWw5o2u55qE5pa55byPXHJcbmZ1bmN0aW9uIF9nZXRXaXpFdmVudChzdGFydCwgZW5kKSB7XHJcblx0Ly9UT0RPOlxyXG5cdGxldCBldmVudHMgPSBbXTtcclxuXHRsZXQgRXZlbnRDb2xsZWN0aW9uID0gb2JqRGF0YWJhc2UuR2V0Q2FsZW5kYXJFdmVudHMyKHN0YXJ0LCBlbmQpO1xyXG5cdHJldHVybiBldmVudHNcclxufVxyXG5cclxuLy8g6I635b6X5riy5p+T5ZCO55qE6YeN5aSN5pel5pyfXHJcbmZ1bmN0aW9uIGdldFJlbmRlclJlcGVhdERheSgpe1xyXG5cdHZhciBkYXlBcnJheSA9IG5ldyBBcnJheSgpO1xyXG5cdHZhciBldmVudFN0YXJ0ID0gbmV3IERhdGUoX3MyZChnX2V2ZW50U3RhcnQpKTtcclxuXHRcdFxyXG5cdHN3aXRjaCAoZ19yZXBlYXRSdWxlKXtcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazFcIjpcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazJcIjpcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazNcIjpcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazRcIjpcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazVcIjpcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazZcIjpcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2VlazdcIjpcclxuXHRcdFx0XHRnZXRXZWVrbHlSZXBlYXREYXkoZGF5QXJyYXksIFtnX3JlcGVhdFJ1bGUuY2hhckF0KDkpXSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkV2ZXJ5V2Vla2RheVwiOlxyXG5cdFx0XHRcdGdldFdlZWtseVJlcGVhdERheShkYXlBcnJheSwgWzEsIDIsIDMsIDQsIDVdKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnlXZWVrZGF5MTM1XCI6XHJcblx0XHRcdFx0Z2V0V2Vla2x5UmVwZWF0RGF5KGRheUFycmF5LCBbMSwgMywgNV0pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnlXZWVrZGF5MjRcIjpcclxuXHRcdFx0XHRnZXRXZWVrbHlSZXBlYXREYXkoZGF5QXJyYXksIFsyLCA0XSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJFdmVyeVdlZWtkYXk2N1wiOlxyXG5cdFx0XHRcdGdldFdlZWtseVJlcGVhdERheShkYXlBcnJheSwgWzYsIDddKTtcclxuXHRcdFx0XHRicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkRhaWx5XCI6XHJcblx0XHRcdFx0Z2V0V2Vla2x5UmVwZWF0RGF5KGRheUFycmF5LCBbMSwgMiwgMywgNCwgNSwgNiwgN10pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiV2Vla2x5XCI6Ly8g5q+P5ZGoXHJcblx0XHRcdFx0Z2V0V2Vla2x5UmVwZWF0RGF5KGRheUFycmF5LCBbZXZlbnRTdGFydC5nZXREYXkoKV0pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiRXZlcnkyV2Vla3NcIjpcclxuXHRcdFx0XHRnZXRXZWVrbHlSZXBlYXREYXkoZGF5QXJyYXksIFtldmVudFN0YXJ0LmdldERheSgpXSk7XHJcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkYXlBcnJheS5sZW5ndGg7ICsrIGkpe1xyXG5cdFx0XHRcdFx0dmFyIGludGVyID0gX2ludGVyRGF5cyhfZDJzKGV2ZW50U3RhcnQpLCBfZDJzKGRheUFycmF5W2ldWzBdKSk7XHJcblx0XHRcdFx0XHRpZiAoKHBhcnNlRmxvYXQoKGludGVyLTEpLzcuMCkgJSAyKSAhPSAwICl7XHJcblx0XHRcdFx0XHRcdGRheUFycmF5LnNwbGljZShpLCAxKTtcclxuXHRcdFx0XHRcdFx0aSAtLTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJNb250aGx5XCI6XHJcblx0XHRcdFx0Z2V0TW9udGhseVJlcGVhdERheShkYXlBcnJheSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJZZWFybHlcIjpcclxuXHRcdFx0XHRnZXRZZWFybHlSZXBlYXREYXkoZGF5QXJyYXkpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHQvLyBUT0RPOiDmsYnlrZfpnIDopoHogIPomZFcclxuICAgICAgICAgICAgY2FzZSBcIkNoaW5lc2VNb250aGx5XCI6XHJcbiAgICAgICAgICAgICAgICBnZXRDaGluZXNlUmVwZWF0RGF5KGRheUFycmF5LCAn5pyIJyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJDaGluZXNlWWVhcmx5XCI6XHJcbiAgICAgICAgICAgICAgICBnZXRDaGluZXNlUmVwZWF0RGF5KGRheUFycmF5LCAn5Y6GJyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGRlZmF1bHQ6e1xyXG5cdFx0XHRcdGlmIChnX3JlcGVhdFJ1bGUuaW5kZXhPZihcIkV2ZXJ5V2Vla1wiKSA9PSAwKXtcclxuXHRcdFx0XHRcdHZhciBkYXlzID0gZ19yZXBlYXRSdWxlLnN1YnN0cihcIkV2ZXJ5V2Vla1wiLmxlbmd0aCkuc3BsaXQoJycpO1xyXG5cdFx0XHRcdFx0Z2V0V2Vla2x5UmVwZWF0RGF5KGRheUFycmF5LCBkYXlzKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcblx0cmV0dXJuIGRheUFycmF5O1xyXG59XHJcblxyXG5cclxuLyog5pWw5o2u6I635Y+WXHJcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuXHJcbi8qIOadgumhueWSjOW3peWFt1xyXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcbi8vIOWIpOaWreWGheaguFxyXG5mdW5jdGlvbiBpc0Nocm9tZSgpIHtcclxuXHRpZiAoZ19pc0Nocm9tZSkgcmV0dXJuIGdfaXNDaHJvbWU7XHJcblx0Ly9cclxuXHR2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7XHJcblx0Z19pc0Nocm9tZSA9IHVhLmluZGV4T2YoJ2Nocm9tZScpICE9IC0xO1xyXG5cdC8vXHJcblx0cmV0dXJuIGdfaXNDaHJvbWU7XHJcbn1cclxuXHJcbi8vIOWwhuaVtOaVsOi9rOaNouaIkOaXpeacn+Wtl+espuS4slxyXG5mdW5jdGlvbiBmb3JtYXRJbnRUb0RhdGVTdHJpbmcobil7XHJcblx0XHRcclxuXHRyZXR1cm4gbiA8IDEwID8gJzAnICsgbiA6IG47XHJcbn1cclxuXHJcbi8vIOajgOafpeWPiuWinuWKoOaVsOWAvOWtl+espuS4sumVv+W6pu+8jOS+i+Wmgu+8micyJyAtPiAnMDInXHJcbmZ1bmN0aW9uIGNoZWNrQW5kQWRkU3RyTGVuZ3RoKHN0cikge1xyXG5cdGlmIChzdHIubGVuZ3RoIDwgMikge1xyXG5cdFx0cmV0dXJuICcwJyArIHN0cjtcclxuXHR9IGVsc2Uge1xyXG5cdFx0cmV0dXJuIHN0cjtcclxuXHR9XHJcbn1cclxuXHJcbi8vIOWwhuWtl+espuS4sui9rOWMluS4uuaXpeacn+WvueixoVxyXG5mdW5jdGlvbiBfczJkKHN0cil7XHJcblx0aWYgKCFzdHIpXHJcblx0XHRyZXR1cm4gJyc7XHJcblx0dmFyIGRhdGUgPSBuZXcgRGF0ZShzdHIuc3Vic3RyKDAsIDQpLFxyXG5cdFx0XHRcdFx0c3RyLnN1YnN0cig1LCAyKSAtIDEsXHJcblx0XHRcdFx0XHRzdHIuc3Vic3RyKDgsIDMpLFxyXG5cdFx0XHRcdFx0c3RyLnN1YnN0cigxMSwgMiksXHJcblx0XHRcdFx0XHRzdHIuc3Vic3RyKDE0LCAyKSxcclxuXHRcdFx0XHRcdHN0ci5zdWJzdHIoMTcsIDIpXHJcblx0XHRcdFx0XHQpO1x0XHRcclxuXHRyZXR1cm4gZGF0ZTtcclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBjb2xvckNvdW50OiAxMixcclxuICAgIGNvbG9ySXRlbXM6IFtcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiMzMkNEMzJcIiwgXCJjb2xvck5hbWVcIjogJ+aphOamhOe7vycgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiM1NDg0RURcIiwgXCJjb2xvck5hbWVcIjogJ+Wuneefs+iTnScgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNBNEJERkVcIiwgXCJjb2xvck5hbWVcIjogJ+iTneiJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiM0NkQ2REJcIiwgXCJjb2xvck5hbWVcIjogJ+mdkue7v+iJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiM3QUU3QkZcIiwgXCJjb2xvck5hbWVcIjogJ+e7v+iJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiM1MUI3NDlcIiwgXCJjb2xvck5hbWVcIjogJ+a4heaWsOe7vycgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNGQkQ3NUJcIiwgXCJjb2xvck5hbWVcIjogJ+m7hOiJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNGRkI4NzhcIiwgXCJjb2xvck5hbWVcIjogJ+apmOiJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNGRjg4N0NcIiwgXCJjb2xvck5hbWVcIjogJ+e6ouiJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNEQzIxMjdcIiwgXCJjb2xvck5hbWVcIjogJ+WlouWNjue6oicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNEQkFERkZcIiwgXCJjb2xvck5hbWVcIjogJ+e0q+iJsicgfSxcclxuICAgICAgICB7IFwiY29sb3JWYWx1ZVwiOiBcIiNFMUUxRTFcIiwgXCJjb2xvck5hbWVcIjogJ+eBsOiJsicgfVxyXG4gICAgXSxcclxuXHJcbn0iLCIvL1RPRE86IOWIpOaWrXdpbmRvdy5leHRlcm5hbOaYr+WQpuS4uldpekh0bWxFZGl0b3JBcHBcclxuY29uc3QgV2l6RXhwbG9yZXJBcHAgPSB3aW5kb3cuZXh0ZXJuYWw7XHJcbmNvbnN0IFdpekV4cGxvcmVyV2luZG93ID0gV2l6RXhwbG9yZXJBcHAuV2luZG93O1xyXG5jb25zdCBXaXpEYXRhYmFzZSA9IFdpekV4cGxvcmVyQXBwLkRhdGFiYXNlO1xyXG5jb25zdCBXaXpDb21tb25VSSA9IFdpekV4cGxvcmVyQXBwLkNyZWF0ZVdpek9iamVjdChcIldpektNQ29udHJvbHMuV2l6Q29tbW9uVUlcIik7XHJcblxyXG5mdW5jdGlvbiBXaXpDb25maXJtKG1zZywgdGl0bGUpIHtcclxuICAgIHJldHVybiBXaXpFeHBsb3JlcldpbmRvdy5TaG93TWVzc2FnZShtc2csIHRpdGxlLCAweDAwMDAwMDIwIHwgMHgwMDAwMDAwMSkgPT0gMTtcclxufVxyXG5cclxuZnVuY3Rpb24gV2l6QWxlcnQobXNnKSB7XHJcbiAgICBXaXpFeHBsb3JlcldpbmRvdy5TaG93TWVzc2FnZShtc2csIFwie3B9XCIsIDB4MDAwMDAwNDApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBXaXpCdWJibGVNZXNzYWdlKHRpdGxlLCBtc2csIGNvbG9yID0gJyNGRkZBOUQnLCBkZWxheSA9ICczJykge1xyXG4gICAgY29uc3QgYXBwUGF0aCA9IFdpekNvbW1vblVJLkdldFNwZWNpYWxGb2xkZXIoXCJBcHBQYXRoXCIpO1xyXG4gICAgLy9cclxuICAgIGNvbnN0IHdpelNoZWxsRmlsZU5hbWUgPSBhcHBQYXRoICsgXCJXaXouZXhlXCI7XHJcbiAgICBjb25zdCBkbGxGaWxlTmFtZSA9IGFwcFBhdGggKyBcIldpelRvb2xzLmRsbFwiO1xyXG4gICAgLy9cclxuICAgIGNvbnN0IHBhcmFtcyA9IGBcIiR7ZGxsRmlsZU5hbWV9XCIgV2l6VG9vbHNTaG93QnViYmxlV2luZG93MkV4IC9UaXRsZT0ke3RpdGxlfSAvTGlua1RleHQ9JHttc2d9IC9MaW5rVVJMPUAgL0NvbG9yPSR7Y29sb3J9IC9EZWxheT0ke2RlbGF5fWA7XHJcbiAgICAvL1xyXG4gICAgV2l6Q29tbW9uVUkuUnVuRXhlKHdpelNoZWxsRmlsZU5hbWUsIHBhcmFtcywgZmFsc2UpO1xyXG59XHJcblxyXG5jbGFzcyBXaXpTaGVsbCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZGxsRmlsZU5hbWUsIGRsbEV4cG9ydEZ1bmMsIHBhcmFtcykge1xyXG4gICAgICAgIC8v5L2/55SoZGxs5a+85Ye65Ye95pWw77yM5aSn6YOo5YiG5YWl5Y+C5pe25ZG95Luk6KGM5pa55byP77yM5YW35L2T5Y+C5pWw5rKh5pyJ6K+05piO77yM5pyJ6ZyA6KaB6IGU57O75byA5Y+R5Lq65ZGYXHJcbiAgICAgICAgY29uc3QgYXBwUGF0aCA9IFdpekNvbW1vblVJLkdldFNwZWNpYWxGb2xkZXIoXCJBcHBQYXRoXCIpO1xyXG4gICAgICAgIHRoaXMuYXBwUGF0aCA9IGFwcFBhdGhcclxuICAgICAgICB0aGlzLndpekV4ZSA9IGFwcFBhdGggKyBcIldpei5leGVcIjtcclxuICAgICAgICB0aGlzLmRsbEZpbGVOYW1lID0gZGxsRmlsZU5hbWUgPyBhcHBQYXRoICsgZGxsRmlsZU5hbWUgOiBhcHBQYXRoICsgJ1dpektNQ29udHJvbHMuZGxsJztcclxuICAgICAgICB0aGlzLmRsbEV4cG9ydEZ1bmMgPSBkbGxFeHBvcnRGdW5jIHx8ICdXaXpLTVJ1blNjcmlwdCc7XHJcbiAgICAgICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7XHJcbiAgICB9XHJcblxyXG4gICAgcnVuU2NyaXB0RmlsZShzY3JpcHRGaWxlTmFtZSwgc2NyaXB0UGFyYW1zKSB7XHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0gYFwiJHt0aGlzLmFwcFBhdGggKyAnV2l6S01Db250cm9scy5kbGwnfVwiIFdpektNUnVuU2NyaXB0IC9TY3JpcHRGaWxlTmFtZT0ke3NjcmlwdEZpbGVOYW1lfSAke3NjcmlwdFBhcmFtc31gO1xyXG4gICAgICAgIFdpekNvbW1vblVJLlJ1bkV4ZSh0aGlzLndpekV4ZSwgcGFyYW1zLCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgd2l6QnViYmxlTWVzc2FnZSh0aXRsZSwgbXNnLCBjb2xvciA9ICcjRkZGQTlEJywgZGVsYXkgPSAnMycpIHtcclxuICAgICAgICBXaXpCdWJibGVNZXNzYWdlKHRpdGxlLCBtc2csIGNvbG9yLCBkZWxheSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldFdpekludGVyZmFjZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBXaXpFeHBsb3JlckFwcCwgV2l6RXhwbG9yZXJXaW5kb3csIFdpekRhdGFiYXNlLCBXaXpDb21tb25VSVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgXHJcbiAgICBXaXpFeHBsb3JlckFwcCwgXHJcbiAgICBXaXpFeHBsb3JlcldpbmRvdywgXHJcbiAgICBXaXpEYXRhYmFzZSwgXHJcbiAgICBXaXpDb21tb25VSSwgXHJcbiAgICBXaXpDb25maXJtLCBcclxuICAgIFdpekFsZXJ0LCBcclxuICAgIFdpekJ1YmJsZU1lc3NhZ2UsIFxyXG4gICAgV2l6U2hlbGwgXHJcbn07XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=