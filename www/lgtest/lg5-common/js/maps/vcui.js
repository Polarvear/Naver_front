/*!
 * VinylC Core Library 
 * description VinylC Core Library 
 * author VinylC UID Group 
 * version 1.1.1
 * date : 2020.09.10
 * 1.1.1  
 * $('...').tabs('option', {startIndex : 2}); 옵션추가시 오프젝트도 받을수 있도록 수정.
 * vcui.date.equalsYMD each => core.each 오류수정 * 
 */

/*
var vinylcMessageStyle="font-size:18px; font-weight:200; letter-spacing:0.2em; line-height:1.4em; font-family:helvetica,arial; color:rgba(0,0,25,0.5);";
var vcuiVersion = '1.1.1';
console.log("%cVINYLC UI Library "+vcuiVersion, vinylcMessageStyle);
*/

if (!window.console) {
    // 콘솔을 지원하지 않는 브라우저를 위해 출력요소를 생성
    (function (global) {
        global.console = {};
        var consoleMethods = ['log', 'info', 'warn', 'error', 'assert', 'dir', 'clear', 'profile', 'profileEnd', 'trace'];
        for (var i = -1, method; method = consoleMethods[++i];) {
            global.console[method] = function () {
            };
        }
    })(window);
}

if (typeof Object.create !== "function") {
    Object.create = function (prototype, properties) {
        if (typeof prototype !== "object") { throw TypeError();}
        function Ctor() {}
        Ctor.prototype = prototype;
        var o = new Ctor();
        if (prototype) { o.constructor = Ctor; }
        if (properties !== undefined) {
            if (properties !== Object(properties)) {
                throw TypeError();
            }
            Object.defineProperties(o, properties);
        }
        return o;
    };
}

if (!Function.prototype.bind) {
    Function.prototype.bind = function (o) {
        if (typeof this !== 'function') {
            throw TypeError("Bind must be called on a function");
        }

        var args = Array.prototype.slice.call(arguments, 1),
            self = this,
            nop = function () {
            },
            bound = function () {
                return self.apply(this instanceof nop ? this : o,
                    args.concat(Array.prototype.slice.call(arguments)));
            };

        if (this.prototype)
            nop.prototype = this.prototype;
        bound.prototype = new nop();
        return bound;
    };
}

if (!Date.now) {
    /*
     * 함수내의 컨텐스트를 지정
     * @param {object} context 컨텍스트
     * @param {*} ... 두번째 인자부터는 실제로 싱행될 콜백함수로 전달된다.
     * @return {function(context=, ...} 주어진 객체가 켄텍스트로 적용된 함수
     * @example
     * function Test() {
         *      alert(this.name);
         * }.bind({name: 'axl rose'});
     *
     * Test(); -> alert('axl rose');
     */
    Date.now = function () {
        return new Date().getTime();
    };
}

if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return String(this).replace(/^\s+/, '').replace(/\s+$/, '');
    };
}

if (!window.JSON) {
    window['JSON'] = {
        parse: function (sJSON) {
            return eval('(' + sJSON + ')');
        },
        stringify: (function () {
            var toString = Object.prototype.toString;
            var isArray = Array.isArray || function (a) {
                return toString.call(a) === '[object Array]';
            };
            var escMap = {'"': '\\"', '\\': '\\\\', '\b': '\\b', '\f': '\\f', '\n': '\\n', '\r': '\\r', '\t': '\\t'};
            var escFunc = function (m) {
                return escMap[m] || '\\u' + (m.charCodeAt(0) + 0x10000).toString(16).substr(1);
            };
            var escRE = /[\\"\u0000-\u001F\u2028\u2029]/g;
            return function stringify(value) {
                if (value == null) {
                    return 'null';
                } else if (typeof value === 'number') {
                    return isFinite(value) ? value.toString() : 'null';
                } else if (typeof value === 'boolean') {
                    return value.toString();
                } else if (typeof value === 'object') {
                    if (typeof value.toJSON === 'function') {
                        return stringify(value.toJSON());
                    } else if (isArray(value)) {
                        var res = '[';
                        for (var i = 0; i < value.length; i++)
                            res += (i ? ', ' : '') + stringify(value[i]);
                        return res + ']';
                    } else if (toString.call(value) === '[object Object]') {
                        var tmp = [];
                        for (var k in value) {
                            if (value.hasOwnProperty(k))
                                tmp.push(stringify(k) + ': ' + stringify(value[k]));
                        }
                        return '{' + tmp.join(', ') + '}';
                    }
                }
                return '"' + value.toString().replace(escRE, escFunc) + '"';
            };
        })()
    };
}

;(function () {
    if (typeof vcuirequire !== 'undefined') {
        return;
    }


    /** vim: et:ts=4:sw=4:sts=4
     * @license RequireJS 2.3.6 Copyright jQuery Foundation and other contributors.
     * Released under MIT license, https://github.com/requirejs/requirejs/blob/master/LICENSE
     */
    //Not using strict: uneven strict support in browsers, #392, and causes
    //problems with requirejs.exec()/transpiler plugins that may not be strict.
    /*jslint regexp: true, nomen: true, sloppy: true */
    /*global window, navigator, document, importScripts, setTimeout, opera */

    var requirejs, require, define;
    (function (global, setTimeout) {
        var req, s, head, baseElement, dataMain, src,
            interactiveScript, currentlyAddingScript, mainScript, subPath,
            version = '2.3.6',
            commentRegExp = /\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/mg,
            cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
            jsSuffixRegExp = /\.js$/,
            currDirRegExp = /^\.\//,
            op = Object.prototype,
            ostring = op.toString,
            hasOwn = op.hasOwnProperty,
            isBrowser = !!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document),
            isWebWorker = !isBrowser && typeof importScripts !== 'undefined',
            //PS3 indicates loaded and complete, but need to wait for complete
            //specifically. Sequence is 'loading', 'loaded', execution,
            // then 'complete'. The UA check is unfortunate, but not sure how
            //to feature test w/o causing perf issues.
            readyRegExp = isBrowser && navigator.platform === 'PLAYSTATION 3' ?
                        /^complete$/ : /^(complete|loaded)$/,
            defContextName = '_',
            //Oh the tragedy, detecting opera. See the usage of isOpera for reason.
            isOpera = typeof opera !== 'undefined' && opera.toString() === '[object Opera]',
            contexts = {},
            cfg = {},
            globalDefQueue = [],
            useInteractive = false;

        //Could match something like ')//comment', do not lose the prefix to comment.
        function commentReplace(match, singlePrefix) {
            return singlePrefix || '';
        }

        function isFunction(it) {
            return ostring.call(it) === '[object Function]';
        }

        function isArray(it) {
            return ostring.call(it) === '[object Array]';
        }

        /**
         * Helper function for iterating over an array. If the func returns
         * a true value, it will break out of the loop.
         */
        function each(ary, func) {
            if (ary) {
                var i;
                for (i = 0; i < ary.length; i += 1) {
                    if (ary[i] && func(ary[i], i, ary)) {
                        break;
                    }
                }
            }
        }

        /**
         * Helper function for iterating over an array backwards. If the func
         * returns a true value, it will break out of the loop.
         */
        function eachReverse(ary, func) {
            if (ary) {
                var i;
                for (i = ary.length - 1; i > -1; i -= 1) {
                    if (ary[i] && func(ary[i], i, ary)) {
                        break;
                    }
                }
            }
        }

        function hasProp(obj, prop) {
            return hasOwn.call(obj, prop);
        }

        function getOwn(obj, prop) {
            return hasProp(obj, prop) && obj[prop];
        }

        /**
         * Cycles over properties in an object and calls a function for each
         * property value. If the function returns a truthy value, then the
         * iteration is stopped.
         */
        function eachProp(obj, func) {
            var prop;
            for (prop in obj) {
                if (hasProp(obj, prop)) {
                    if (func(obj[prop], prop)) {
                        break;
                    }
                }
            }
        }

        /**
         * Simple function to mix in properties from source into target,
         * but only if target does not already have a property of the same name.
         */
        function mixin(target, source, force, deepStringMixin) {
            if (source) {
                eachProp(source, function (value, prop) {
                    if (force || !hasProp(target, prop)) {
                        if (deepStringMixin && typeof value === 'object' && value &&
                            !isArray(value) && !isFunction(value) &&
                            !(value instanceof RegExp)) {

                            if (!target[prop]) {
                                target[prop] = {};
                            }
                            mixin(target[prop], value, force, deepStringMixin);
                        } else {
                            target[prop] = value;
                        }
                    }
                });
            }
            return target;
        }

        //Similar to Function.prototype.bind, but the 'this' object is specified
        //first, since it is easier to read/figure out what 'this' will be.
        function bind(obj, fn) {
            return function () {
                return fn.apply(obj, arguments);
            };
        }

        function scripts() {
            return document.getElementsByTagName('script');
        }

        function defaultOnError(err) {
            throw err;
        }

        //Allow getting a global that is expressed in
        //dot notation, like 'a.b.c'.
        function getGlobal(value) {
            if (!value) {
                return value;
            }
            var g = global;
            each(value.split('.'), function (part) {
                g = g[part];
            });
            return g;
        }

        /**
         * Constructs an error with a pointer to an URL with more information.
         * @param {String} id the error ID that maps to an ID on a web page.
         * @param {String} message human readable error.
         * @param {Error} [err] the original error, if there is one.
         *
         * @returns {Error}
         */
        function makeError(id, msg, err, requireModules) {
            var e = new Error(msg + '\nhttps://requirejs.org/docs/errors.html#' + id);
            e.requireType = id;
            e.requireModules = requireModules;
            if (err) {
                e.originalError = err;
            }
            return e;
        }

        if (typeof define !== 'undefined') {
            //If a define is already in play via another AMD loader,
            //do not overwrite.
            return;
        }

        if (typeof requirejs !== 'undefined') {
            if (isFunction(requirejs)) {
                //Do not overwrite an existing requirejs instance.
                return;
            }
            cfg = requirejs;
            requirejs = undefined;
        }

        //Allow for a require config object
        if (typeof require !== 'undefined' && !isFunction(require)) {
            //assume it is a config object.
            cfg = require;
            require = undefined;
        }

        function newContext(contextName) {
            var inCheckLoaded, Module, context, handlers,
                checkLoadedTimeoutId,
                config = {
                    //Defaults. Do not set a default for map
                    //config to speed up normalize(), which
                    //will run faster if there is no default.
                    waitSeconds: 7,
                    baseUrl: './',
                    paths: {},
                    bundles: {},
                    pkgs: {},
                    shim: {},
                    config: {}
                },
                registry = {},
                //registry of just enabled modules, to speed
                //cycle breaking code when lots of modules
                //are registered, but not activated.
                enabledRegistry = {},
                undefEvents = {},
                defQueue = [],
                defined = {},
                urlFetched = {},
                bundlesMap = {},
                requireCounter = 1,
                unnormalizedCounter = 1;

            /**
             * Trims the . and .. from an array of path segments.
             * It will keep a leading path segment if a .. will become
             * the first path segment, to help with module name lookups,
             * which act like paths, but can be remapped. But the end result,
             * all paths that use this function should look normalized.
             * NOTE: this method MODIFIES the input array.
             * @param {Array} ary the array of path segments.
             */
            function trimDots(ary) {
                var i, part;
                for (i = 0; i < ary.length; i++) {
                    part = ary[i];
                    if (part === '.') {
                        ary.splice(i, 1);
                        i -= 1;
                    } else if (part === '..') {
                        // If at the start, or previous value is still ..,
                        // keep them so that when converted to a path it may
                        // still work when converted to a path, even though
                        // as an ID it is less than ideal. In larger point
                        // releases, may be better to just kick out an error.
                        if (i === 0 || (i === 1 && ary[2] === '..') || ary[i - 1] === '..') {
                            continue;
                        } else if (i > 0) {
                            ary.splice(i - 1, 2);
                            i -= 2;
                        }
                    }
                }
            }

            /**
             * Given a relative module name, like ./something, normalize it to
             * a real name that can be mapped to a path.
             * @param {String} name the relative name
             * @param {String} baseName a real name that the name arg is relative
             * to.
             * @param {Boolean} applyMap apply the map config to the value. Should
             * only be done if this normalization is for a dependency ID.
             * @returns {String} normalized name
             */
            function normalize(name, baseName, applyMap) {
                var pkgMain, mapValue, nameParts, i, j, nameSegment, lastIndex,
                    foundMap, foundI, foundStarMap, starI, normalizedBaseParts,
                    baseParts = (baseName && baseName.split('/')),
                    map = config.map,
                    starMap = map && map['*'];

                //Adjust any relative paths.
                if (name) {
                    name = name.split('/');
                    lastIndex = name.length - 1;

                    // If wanting node ID compatibility, strip .js from end
                    // of IDs. Have to do this here, and not in nameToUrl
                    // because node allows either .js or non .js to map
                    // to same file.
                    if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                        name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                    }

                    // Starts with a '.' so need the baseName
                    if (name[0].charAt(0) === '.' && baseParts) {
                        //Convert baseName to array, and lop off the last part,
                        //so that . matches that 'directory' and not name of the baseName's
                        //module. For instance, baseName of 'one/two/three', maps to
                        //'one/two/three.js', but we want the directory, 'one/two' for
                        //this normalization.
                        normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                        name = normalizedBaseParts.concat(name);
                    }

                    trimDots(name);
                    name = name.join('/');
                }

                //Apply map config if available.
                if (applyMap && map && (baseParts || starMap)) {
                    nameParts = name.split('/');

                    outerLoop: for (i = nameParts.length; i > 0; i -= 1) {
                        nameSegment = nameParts.slice(0, i).join('/');

                        if (baseParts) {
                            //Find the longest baseName segment match in the config.
                            //So, do joins on the biggest to smallest lengths of baseParts.
                            for (j = baseParts.length; j > 0; j -= 1) {
                                mapValue = getOwn(map, baseParts.slice(0, j).join('/'));

                                //baseName segment has config, find if it has one for
                                //this name.
                                if (mapValue) {
                                    mapValue = getOwn(mapValue, nameSegment);
                                    if (mapValue) {
                                        //Match, update name to the new value.
                                        foundMap = mapValue;
                                        foundI = i;
                                        break outerLoop;
                                    }
                                }
                            }
                        }

                        //Check for a star map match, but just hold on to it,
                        //if there is a shorter segment match later in a matching
                        //config, then favor over this star map.
                        if (!foundStarMap && starMap && getOwn(starMap, nameSegment)) {
                            foundStarMap = getOwn(starMap, nameSegment);
                            starI = i;
                        }
                    }

                    if (!foundMap && foundStarMap) {
                        foundMap = foundStarMap;
                        foundI = starI;
                    }

                    if (foundMap) {
                        nameParts.splice(0, foundI, foundMap);
                        name = nameParts.join('/');
                    }
                }

                // If the name points to a package's name, use
                // the package main instead.
                pkgMain = getOwn(config.pkgs, name);

                return pkgMain ? pkgMain : name;
            }

            function removeScript(name) {
                if (isBrowser) {
                    each(scripts(), function (scriptNode) {
                        if (scriptNode.getAttribute('data-requiremodule') === name &&
                                scriptNode.getAttribute('data-requirecontext') === context.contextName) {
                            scriptNode.parentNode.removeChild(scriptNode);
                            return true;
                        }
                    });
                }
            }

            function hasPathFallback(id) {
                var pathConfig = getOwn(config.paths, id);
                if (pathConfig && isArray(pathConfig) && pathConfig.length > 1) {
                    //Pop off the first array value, since it failed, and
                    //retry
                    pathConfig.shift();
                    context.require.undef(id);

                    //Custom require that does not do map translation, since
                    //ID is "absolute", already mapped/resolved.
                    context.makeRequire(null, {
                        skipMap: true
                    })([id]);

                    return true;
                }
            }

            //Turns a plugin!resource to [plugin, resource]
            //with the plugin being undefined if the name
            //did not have a plugin prefix.
            function splitPrefix(name) {
                var prefix,
                    index = name ? name.indexOf('!') : -1;
                if (index > -1) {
                    prefix = name.substring(0, index);
                    name = name.substring(index + 1, name.length);
                }
                return [prefix, name];
            }

            /**
             * Creates a module mapping that includes plugin prefix, module
             * name, and path. If parentModuleMap is provided it will
             * also normalize the name via require.normalize()
             *
             * @param {String} name the module name
             * @param {String} [parentModuleMap] parent module map
             * for the module name, used to resolve relative names.
             * @param {Boolean} isNormalized: is the ID already normalized.
             * This is true if this call is done for a define() module ID.
             * @param {Boolean} applyMap: apply the map config to the ID.
             * Should only be true if this map is for a dependency.
             *
             * @returns {Object}
             */
            function makeModuleMap(name, parentModuleMap, isNormalized, applyMap) {
                var url, pluginModule, suffix, nameParts,
                    prefix = null,
                    parentName = parentModuleMap ? parentModuleMap.name : null,
                    originalName = name,
                    isDefine = true,
                    normalizedName = '';

                //If no name, then it means it is a require call, generate an
                //internal name.
                if (!name) {
                    isDefine = false;
                    name = '_@r' + (requireCounter += 1);
                }

                nameParts = splitPrefix(name);
                prefix = nameParts[0];
                name = nameParts[1];

                if (prefix) {
                    prefix = normalize(prefix, parentName, applyMap);
                    pluginModule = getOwn(defined, prefix);
                }

                //Account for relative paths if there is a base name.
                if (name) {
                    if (prefix) {
                        if (isNormalized) {
                            normalizedName = name;
                        } else if (pluginModule && pluginModule.normalize) {
                            //Plugin is loaded, use its normalize method.
                            normalizedName = pluginModule.normalize(name, function (name) {
                                return normalize(name, parentName, applyMap);
                            });
                        } else {
                            // If nested plugin references, then do not try to
                            // normalize, as it will not normalize correctly. This
                            // places a restriction on resourceIds, and the longer
                            // term solution is not to normalize until plugins are
                            // loaded and all normalizations to allow for async
                            // loading of a loader plugin. But for now, fixes the
                            // common uses. Details in #1131
                            normalizedName = name.indexOf('!') === -1 ?
                                            normalize(name, parentName, applyMap) :
                                            name;
                        }
                    } else {
                        //A regular module.
                        normalizedName = normalize(name, parentName, applyMap);

                        //Normalized name may be a plugin ID due to map config
                        //application in normalize. The map config values must
                        //already be normalized, so do not need to redo that part.
                        nameParts = splitPrefix(normalizedName);
                        prefix = nameParts[0];
                        normalizedName = nameParts[1];
                        isNormalized = true;

                        url = context.nameToUrl(normalizedName);
                    }
                }

                //If the id is a plugin id that cannot be determined if it needs
                //normalization, stamp it with a unique ID so two matching relative
                //ids that may conflict can be separate.
                suffix = prefix && !pluginModule && !isNormalized ?
                        '_unnormalized' + (unnormalizedCounter += 1) :
                        '';

                return {
                    prefix: prefix,
                    name: normalizedName,
                    parentMap: parentModuleMap,
                    unnormalized: !!suffix,
                    url: url,
                    originalName: originalName,
                    isDefine: isDefine,
                    id: (prefix ?
                            prefix + '!' + normalizedName :
                            normalizedName) + suffix
                };
            }

            function getModule(depMap) {
                var id = depMap.id,
                    mod = getOwn(registry, id);

                if (!mod) {
                    mod = registry[id] = new context.Module(depMap);
                }

                return mod;
            }

            function on(depMap, name, fn) {
                var id = depMap.id,
                    mod = getOwn(registry, id);

                if (hasProp(defined, id) &&
                        (!mod || mod.defineEmitComplete)) {
                    if (name === 'defined') {
                        fn(defined[id]);
                    }
                } else {
                    mod = getModule(depMap);
                    if (mod.error && name === 'error') {
                        fn(mod.error);
                    } else {
                        mod.on(name, fn);
                    }
                }
            }

            function onError(err, errback) {
                var ids = err.requireModules,
                    notified = false;

                if (errback) {
                    errback(err);
                } else {
                    each(ids, function (id) {
                        var mod = getOwn(registry, id);
                        if (mod) {
                            //Set error on module, so it skips timeout checks.
                            mod.error = err;
                            if (mod.events.error) {
                                notified = true;
                                mod.emit('error', err);
                            }
                        }
                    });

                    if (!notified) {
                        req.onError(err);
                    }
                }
            }

            /**
             * Internal method to transfer globalQueue items to this context's
             * defQueue.
             */
            function takeGlobalQueue() {
                //Push all the globalDefQueue items into the context's defQueue
                if (globalDefQueue.length) {
                    each(globalDefQueue, function(queueItem) {
                        var id = queueItem[0];
                        if (typeof id === 'string') {
                            context.defQueueMap[id] = true;
                        }
                        defQueue.push(queueItem);
                    });
                    globalDefQueue = [];
                }
            }

            handlers = {
                'require': function (mod) {
                    if (mod.require) {
                        return mod.require;
                    } else {
                        return (mod.require = context.makeRequire(mod.map));
                    }
                },
                'exports': function (mod) {
                    mod.usingExports = true;
                    if (mod.map.isDefine) {
                        if (mod.exports) {
                            return (defined[mod.map.id] = mod.exports);
                        } else {
                            return (mod.exports = defined[mod.map.id] = {});
                        }
                    }
                },
                'module': function (mod) {
                    if (mod.module) {
                        return mod.module;
                    } else {
                        return (mod.module = {
                            id: mod.map.id,
                            uri: mod.map.url,
                            config: function () {
                                return getOwn(config.config, mod.map.id) || {};
                            },
                            exports: mod.exports || (mod.exports = {})
                        });
                    }
                }
            };

            function cleanRegistry(id) {
                //Clean up machinery used for waiting modules.
                delete registry[id];
                delete enabledRegistry[id];
            }

            function breakCycle(mod, traced, processed) {
                var id = mod.map.id;

                if (mod.error) {
                    mod.emit('error', mod.error);
                } else {
                    traced[id] = true;
                    each(mod.depMaps, function (depMap, i) {
                        var depId = depMap.id,
                            dep = getOwn(registry, depId);

                        //Only force things that have not completed
                        //being defined, so still in the registry,
                        //and only if it has not been matched up
                        //in the module already.
                        if (dep && !mod.depMatched[i] && !processed[depId]) {
                            if (getOwn(traced, depId)) {
                                mod.defineDep(i, defined[depId]);
                                mod.check(); //pass false?
                            } else {
                                breakCycle(dep, traced, processed);
                            }
                        }
                    });
                    processed[id] = true;
                }
            }

            function checkLoaded() {
                var err, usingPathFallback,
                    waitInterval = config.waitSeconds * 1000,
                    //It is possible to disable the wait interval by using waitSeconds of 0.
                    expired = waitInterval && (context.startTime + waitInterval) < new Date().getTime(),
                    noLoads = [],
                    reqCalls = [],
                    stillLoading = false,
                    needCycleCheck = true;

                //Do not bother if this call was a result of a cycle break.
                if (inCheckLoaded) {
                    return;
                }

                inCheckLoaded = true;

                //Figure out the state of all the modules.
                eachProp(enabledRegistry, function (mod) {
                    var map = mod.map,
                        modId = map.id;

                    //Skip things that are not enabled or in error state.
                    if (!mod.enabled) {
                        return;
                    }

                    if (!map.isDefine) {
                        reqCalls.push(mod);
                    }

                    if (!mod.error) {
                        //If the module should be executed, and it has not
                        //been inited and time is up, remember it.
                        if (!mod.inited && expired) {
                            if (hasPathFallback(modId)) {
                                usingPathFallback = true;
                                stillLoading = true;
                            } else {
                                noLoads.push(modId);
                                removeScript(modId);
                            }
                        } else if (!mod.inited && mod.fetched && map.isDefine) {
                            stillLoading = true;
                            if (!map.prefix) {
                                //No reason to keep looking for unfinished
                                //loading. If the only stillLoading is a
                                //plugin resource though, keep going,
                                //because it may be that a plugin resource
                                //is waiting on a non-plugin cycle.
                                return (needCycleCheck = false);
                            }
                        }
                    }
                });

                if (expired && noLoads.length) {
                    //If wait time expired, throw error of unloaded modules.
                    err = makeError('timeout', 'Load timeout for modules: ' + noLoads, null, noLoads);
                    err.contextName = context.contextName;
                    return onError(err);
                }

                //Not expired, check for a cycle.
                if (needCycleCheck) {
                    each(reqCalls, function (mod) {
                        breakCycle(mod, {}, {});
                    });
                }

                //If still waiting on loads, and the waiting load is something
                //other than a plugin resource, or there are still outstanding
                //scripts, then just try back later.
                if ((!expired || usingPathFallback) && stillLoading) {
                    //Something is still waiting to load. Wait for it, but only
                    //if a timeout is not already in effect.
                    if ((isBrowser || isWebWorker) && !checkLoadedTimeoutId) {
                        checkLoadedTimeoutId = setTimeout(function () {
                            checkLoadedTimeoutId = 0;
                            checkLoaded();
                        }, 50);
                    }
                }

                inCheckLoaded = false;
            }

            Module = function (map) {
                this.events = getOwn(undefEvents, map.id) || {};
                this.map = map;
                this.shim = getOwn(config.shim, map.id);
                this.depExports = [];
                this.depMaps = [];
                this.depMatched = [];
                this.pluginMaps = {};
                this.depCount = 0;

                /* this.exports this.factory
                this.depMaps = [],
                this.enabled, this.fetched
                */
            };

            Module.prototype = {
                init: function (depMaps, factory, errback, options) {
                    options = options || {};

                    //Do not do more inits if already done. Can happen if there
                    //are multiple define calls for the same module. That is not
                    //a normal, common case, but it is also not unexpected.
                    if (this.inited) {
                        return;
                    }

                    this.factory = factory;

                    if (errback) {
                        //Register for errors on this module.
                        this.on('error', errback);
                    } else if (this.events.error) {
                        //If no errback already, but there are error listeners
                        //on this module, set up an errback to pass to the deps.
                        errback = bind(this, function (err) {
                            this.emit('error', err);
                        });
                    }

                    //Do a copy of the dependency array, so that
                    //source inputs are not modified. For example
                    //"shim" deps are passed in here directly, and
                    //doing a direct modification of the depMaps array
                    //would affect that config.
                    this.depMaps = depMaps && depMaps.slice(0);

                    this.errback = errback;

                    //Indicate this module has be initialized
                    this.inited = true;

                    this.ignore = options.ignore;

                    //Could have option to init this module in enabled mode,
                    //or could have been previously marked as enabled. However,
                    //the dependencies are not known until init is called. So
                    //if enabled previously, now trigger dependencies as enabled.
                    if (options.enabled || this.enabled) {
                        //Enable this module and dependencies.
                        //Will call this.check()
                        this.enable();
                    } else {
                        this.check();
                    }
                },

                defineDep: function (i, depExports) {
                    //Because of cycles, defined callback for a given
                    //export can be called more than once.
                    if (!this.depMatched[i]) {
                        this.depMatched[i] = true;
                        this.depCount -= 1;
                        this.depExports[i] = depExports;
                    }
                },

                fetch: function () {
                    if (this.fetched) {
                        return;
                    }
                    this.fetched = true;

                    context.startTime = (new Date()).getTime();

                    var map = this.map;

                    //If the manager is for a plugin managed resource,
                    //ask the plugin to load it now.
                    if (this.shim) {
                        context.makeRequire(this.map, {
                            enableBuildCallback: true
                        })(this.shim.deps || [], bind(this, function () {
                            return map.prefix ? this.callPlugin() : this.load();
                        }));
                    } else {
                        //Regular dependency.
                        return map.prefix ? this.callPlugin() : this.load();
                    }
                },

                load: function () {
                    var url = this.map.url;

                    //Regular dependency.
                    if (!urlFetched[url]) {
                        urlFetched[url] = true;
                        context.load(this.map.id, url);
                    }
                },

                /**
                 * Checks if the module is ready to define itself, and if so,
                 * define it.
                 */
                check: function () {
                    if (!this.enabled || this.enabling) {
                        return;
                    }

                    var err, cjsModule,
                        id = this.map.id,
                        depExports = this.depExports,
                        exports = this.exports,
                        factory = this.factory;

                    if (!this.inited) {
                        // Only fetch if not already in the defQueue.
                        if (!hasProp(context.defQueueMap, id)) {
                            this.fetch();
                        }
                    } else if (this.error) {
                        this.emit('error', this.error);
                    } else if (!this.defining) {
                        //The factory could trigger another require call
                        //that would result in checking this module to
                        //define itself again. If already in the process
                        //of doing that, skip this work.
                        this.defining = true;

                        if (this.depCount < 1 && !this.defined) {
                            if (isFunction(factory)) {
                                //If there is an error listener, favor passing
                                //to that instead of throwing an error. However,
                                //only do it for define()'d  modules. require
                                //errbacks should not be called for failures in
                                //their callbacks (#699). However if a global
                                //onError is set, use that.
                                if ((this.events.error && this.map.isDefine) ||
                                    req.onError !== defaultOnError) {
                                    try {
                                        exports = context.execCb(id, factory, depExports, exports);
                                    } catch (e) {
                                        err = e;
                                    }
                                } else {
                                    exports = context.execCb(id, factory, depExports, exports);
                                }

                                // Favor return value over exports. If node/cjs in play,
                                // then will not have a return value anyway. Favor
                                // module.exports assignment over exports object.
                                if (this.map.isDefine && exports === undefined) {
                                    cjsModule = this.module;
                                    if (cjsModule) {
                                        exports = cjsModule.exports;
                                    } else if (this.usingExports) {
                                        //exports already set the defined value.
                                        exports = this.exports;
                                    }
                                }

                                if (err) {
                                    err.requireMap = this.map;
                                    err.requireModules = this.map.isDefine ? [this.map.id] : null;
                                    err.requireType = this.map.isDefine ? 'define' : 'require';
                                    return onError((this.error = err));
                                }

                            } else {
                                //Just a literal value
                                exports = factory;
                            }

                            this.exports = exports;

                            if (this.map.isDefine && !this.ignore) {
                                defined[id] = exports;

                                if (req.onResourceLoad) {
                                    var resLoadMaps = [];
                                    each(this.depMaps, function (depMap) {
                                        resLoadMaps.push(depMap.normalizedMap || depMap);
                                    });
                                    req.onResourceLoad(context, this.map, resLoadMaps);
                                }
                            }

                            //Clean up
                            cleanRegistry(id);

                            this.defined = true;
                        }

                        //Finished the define stage. Allow calling check again
                        //to allow define notifications below in the case of a
                        //cycle.
                        this.defining = false;

                        if (this.defined && !this.defineEmitted) {
                            this.defineEmitted = true;
                            this.emit('defined', this.exports);
                            this.defineEmitComplete = true;
                        }

                    }
                },

                callPlugin: function () {
                    var map = this.map,
                        id = map.id,
                        //Map already normalized the prefix.
                        pluginMap = makeModuleMap(map.prefix);

                    //Mark this as a dependency for this plugin, so it
                    //can be traced for cycles.
                    this.depMaps.push(pluginMap);

                    on(pluginMap, 'defined', bind(this, function (plugin) {
                        var load, normalizedMap, normalizedMod,
                            bundleId = getOwn(bundlesMap, this.map.id),
                            name = this.map.name,
                            parentName = this.map.parentMap ? this.map.parentMap.name : null,
                            localRequire = context.makeRequire(map.parentMap, {
                                enableBuildCallback: true
                            });

                        //If current map is not normalized, wait for that
                        //normalized name to load instead of continuing.
                        if (this.map.unnormalized) {
                            //Normalize the ID if the plugin allows it.
                            if (plugin.normalize) {
                                name = plugin.normalize(name, function (name) {
                                    return normalize(name, parentName, true);
                                }) || '';
                            }

                            //prefix and name should already be normalized, no need
                            //for applying map config again either.
                            normalizedMap = makeModuleMap(map.prefix + '!' + name,
                                                        this.map.parentMap,
                                                        true);
                            on(normalizedMap,
                                'defined', bind(this, function (value) {
                                    this.map.normalizedMap = normalizedMap;
                                    this.init([], function () { return value; }, null, {
                                        enabled: true,
                                        ignore: true
                                    });
                                }));

                            normalizedMod = getOwn(registry, normalizedMap.id);
                            if (normalizedMod) {
                                //Mark this as a dependency for this plugin, so it
                                //can be traced for cycles.
                                this.depMaps.push(normalizedMap);

                                if (this.events.error) {
                                    normalizedMod.on('error', bind(this, function (err) {
                                        this.emit('error', err);
                                    }));
                                }
                                normalizedMod.enable();
                            }

                            return;
                        }

                        //If a paths config, then just load that file instead to
                        //resolve the plugin, as it is built into that paths layer.
                        if (bundleId) {
                            this.map.url = context.nameToUrl(bundleId);
                            this.load();
                            return;
                        }

                        load = bind(this, function (value) {
                            this.init([], function () { return value; }, null, {
                                enabled: true
                            });
                        });

                        load.error = bind(this, function (err) {
                            this.inited = true;
                            this.error = err;
                            err.requireModules = [id];

                            //Remove temp unnormalized modules for this module,
                            //since they will never be resolved otherwise now.
                            eachProp(registry, function (mod) {
                                if (mod.map.id.indexOf(id + '_unnormalized') === 0) {
                                    cleanRegistry(mod.map.id);
                                }
                            });

                            onError(err);
                        });

                        //Allow plugins to load other code without having to know the
                        //context or how to 'complete' the load.
                        load.fromText = bind(this, function (text, textAlt) {
                            /*jslint evil: true */
                            var moduleName = map.name,
                                moduleMap = makeModuleMap(moduleName),
                                hasInteractive = useInteractive;

                            //As of 2.1.0, support just passing the text, to reinforce
                            //fromText only being called once per resource. Still
                            //support old style of passing moduleName but discard
                            //that moduleName in favor of the internal ref.
                            if (textAlt) {
                                text = textAlt;
                            }

                            //Turn off interactive script matching for IE for any define
                            //calls in the text, then turn it back on at the end.
                            if (hasInteractive) {
                                useInteractive = false;
                            }

                            //Prime the system by creating a module instance for
                            //it.
                            getModule(moduleMap);

                            //Transfer any config to this other module.
                            if (hasProp(config.config, id)) {
                                config.config[moduleName] = config.config[id];
                            }

                            try {
                                req.exec(text);
                            } catch (e) {
                                return onError(makeError('fromtexteval',
                                                'fromText eval for ' + id +
                                                ' failed: ' + e,
                                                e,
                                                [id]));
                            }

                            if (hasInteractive) {
                                useInteractive = true;
                            }

                            //Mark this as a dependency for the plugin
                            //resource
                            this.depMaps.push(moduleMap);

                            //Support anonymous modules.
                            context.completeLoad(moduleName);

                            //Bind the value of that module to the value for this
                            //resource ID.
                            localRequire([moduleName], load);
                        });

                        //Use parentName here since the plugin's name is not reliable,
                        //could be some weird string with no path that actually wants to
                        //reference the parentName's path.
                        plugin.load(map.name, localRequire, load, config);
                    }));

                    context.enable(pluginMap, this);
                    this.pluginMaps[pluginMap.id] = pluginMap;
                },

                enable: function () {
                    enabledRegistry[this.map.id] = this;
                    this.enabled = true;

                    //Set flag mentioning that the module is enabling,
                    //so that immediate calls to the defined callbacks
                    //for dependencies do not trigger inadvertent load
                    //with the depCount still being zero.
                    this.enabling = true;

                    //Enable each dependency
                    each(this.depMaps, bind(this, function (depMap, i) {
                        var id, mod, handler;

                        if (typeof depMap === 'string') {
                            //Dependency needs to be converted to a depMap
                            //and wired up to this module.
                            depMap = makeModuleMap(depMap,
                                                (this.map.isDefine ? this.map : this.map.parentMap),
                                                false,
                                                !this.skipMap);
                            this.depMaps[i] = depMap;

                            handler = getOwn(handlers, depMap.id);

                            if (handler) {
                                this.depExports[i] = handler(this);
                                return;
                            }

                            this.depCount += 1;

                            on(depMap, 'defined', bind(this, function (depExports) {
                                if (this.undefed) {
                                    return;
                                }
                                this.defineDep(i, depExports);
                                this.check();
                            }));

                            if (this.errback) {
                                on(depMap, 'error', bind(this, this.errback));
                            } else if (this.events.error) {
                                // No direct errback on this module, but something
                                // else is listening for errors, so be sure to
                                // propagate the error correctly.
                                on(depMap, 'error', bind(this, function(err) {
                                    this.emit('error', err);
                                }));
                            }
                        }

                        id = depMap.id;
                        mod = registry[id];

                        //Skip special modules like 'require', 'exports', 'module'
                        //Also, don't call enable if it is already enabled,
                        //important in circular dependency cases.
                        if (!hasProp(handlers, id) && mod && !mod.enabled) {
                            context.enable(depMap, this);
                        }
                    }));

                    //Enable each plugin that is used in
                    //a dependency
                    eachProp(this.pluginMaps, bind(this, function (pluginMap) {
                        var mod = getOwn(registry, pluginMap.id);
                        if (mod && !mod.enabled) {
                            context.enable(pluginMap, this);
                        }
                    }));

                    this.enabling = false;

                    this.check();
                },

                on: function (name, cb) {
                    var cbs = this.events[name];
                    if (!cbs) {
                        cbs = this.events[name] = [];
                    }
                    cbs.push(cb);
                },

                emit: function (name, evt) {
                    each(this.events[name], function (cb) {
                        cb(evt);
                    });
                    if (name === 'error') {
                        //Now that the error handler was triggered, remove
                        //the listeners, since this broken Module instance
                        //can stay around for a while in the registry.
                        delete this.events[name];
                    }
                }
            };

            function callGetModule(args) {
                //Skip modules already defined.
                if (!hasProp(defined, args[0])) {
                    getModule(makeModuleMap(args[0], null, true)).init(args[1], args[2]);
                }
            }

            function removeListener(node, func, name, ieName) {
                //Favor detachEvent because of IE9
                //issue, see attachEvent/addEventListener comment elsewhere
                //in this file.
                if (node.detachEvent && !isOpera) {
                    //Probably IE. If not it will throw an error, which will be
                    //useful to know.
                    if (ieName) {
                        node.detachEvent(ieName, func);
                    }
                } else {
                    node.removeEventListener(name, func, false);
                }
            }

            /**
             * Given an event from a script node, get the requirejs info from it,
             * and then removes the event listeners on the node.
             * @param {Event} evt
             * @returns {Object}
             */
            function getScriptData(evt) {
                //Using currentTarget instead of target for Firefox 2.0's sake. Not
                //all old browsers will be supported, but this one was easy enough
                //to support and still makes sense.
                var node = evt.currentTarget || evt.srcElement;

                //Remove the listeners once here.
                removeListener(node, context.onScriptLoad, 'load', 'onreadystatechange');
                removeListener(node, context.onScriptError, 'error');

                return {
                    node: node,
                    id: node && node.getAttribute('data-requiremodule')
                };
            }

            function intakeDefines() {
                var args;

                //Any defined modules in the global queue, intake them now.
                takeGlobalQueue();

                //Make sure any remaining defQueue items get properly processed.
                while (defQueue.length) {
                    args = defQueue.shift();
                    if (args[0] === null) {
                        return onError(makeError('mismatch', 'Mismatched anonymous define() module: ' +
                            args[args.length - 1]));
                    } else {
                        //args are id, deps, factory. Should be normalized by the
                        //define() function.
                        callGetModule(args);
                    }
                }
                context.defQueueMap = {};
            }

            context = {
                config: config,
                contextName: contextName,
                registry: registry,
                defined: defined,
                urlFetched: urlFetched,
                defQueue: defQueue,
                defQueueMap: {},
                Module: Module,
                makeModuleMap: makeModuleMap,
                nextTick: req.nextTick,
                onError: onError,

                /**
                 * Set a configuration for the context.
                 * @param {Object} cfg config object to integrate.
                 */
                configure: function (cfg) {
                    //Make sure the baseUrl ends in a slash.
                    if (cfg.baseUrl) {
                        if (cfg.baseUrl.charAt(cfg.baseUrl.length - 1) !== '/') {
                            cfg.baseUrl += '/';
                        }
                    }

                    // Convert old style urlArgs string to a function.
                    if (typeof cfg.urlArgs === 'string') {
                        var urlArgs = cfg.urlArgs;
                        cfg.urlArgs = function(id, url) {
                            return (url.indexOf('?') === -1 ? '?' : '&') + urlArgs;
                        };
                    }

                    //Save off the paths since they require special processing,
                    //they are additive.
                    var shim = config.shim,
                        objs = {
                            paths: true,
                            bundles: true,
                            config: true,
                            map: true
                        };

                    eachProp(cfg, function (value, prop) {
                        if (objs[prop]) {
                            if (!config[prop]) {
                                config[prop] = {};
                            }
                            mixin(config[prop], value, true, true);
                        } else {
                            config[prop] = value;
                        }
                    });

                    //Reverse map the bundles
                    if (cfg.bundles) {
                        eachProp(cfg.bundles, function (value, prop) {
                            each(value, function (v) {
                                if (v !== prop) {
                                    bundlesMap[v] = prop;
                                }
                            });
                        });
                    }

                    //Merge shim
                    if (cfg.shim) {
                        eachProp(cfg.shim, function (value, id) {
                            //Normalize the structure
                            if (isArray(value)) {
                                value = {
                                    deps: value
                                };
                            }
                            if ((value.exports || value.init) && !value.exportsFn) {
                                value.exportsFn = context.makeShimExports(value);
                            }
                            shim[id] = value;
                        });
                        config.shim = shim;
                    }

                    //Adjust packages if necessary.
                    if (cfg.packages) {
                        each(cfg.packages, function (pkgObj) {
                            var location, name;

                            pkgObj = typeof pkgObj === 'string' ? {name: pkgObj} : pkgObj;

                            name = pkgObj.name;
                            location = pkgObj.location;
                            if (location) {
                                config.paths[name] = pkgObj.location;
                            }

                            //Save pointer to main module ID for pkg name.
                            //Remove leading dot in main, so main paths are normalized,
                            //and remove any trailing .js, since different package
                            //envs have different conventions: some use a module name,
                            //some use a file name.
                            config.pkgs[name] = pkgObj.name + '/' + (pkgObj.main || 'main')
                                        .replace(currDirRegExp, '')
                                        .replace(jsSuffixRegExp, '');
                        });
                    }

                    //If there are any "waiting to execute" modules in the registry,
                    //update the maps for them, since their info, like URLs to load,
                    //may have changed.
                    eachProp(registry, function (mod, id) {
                        //If module already has init called, since it is too
                        //late to modify them, and ignore unnormalized ones
                        //since they are transient.
                        if (!mod.inited && !mod.map.unnormalized) {
                            mod.map = makeModuleMap(id, null, true);
                        }
                    });

                    //If a deps array or a config callback is specified, then call
                    //require with those args. This is useful when require is defined as a
                    //config object before require.js is loaded.
                    if (cfg.deps || cfg.callback) {
                        context.require(cfg.deps || [], cfg.callback);
                    }
                },

                makeShimExports: function (value) {
                    function fn() {
                        var ret;
                        if (value.init) {
                            ret = value.init.apply(global, arguments);
                        }
                        return ret || (value.exports && getGlobal(value.exports));
                    }
                    return fn;
                },

                makeRequire: function (relMap, options) {
                    options = options || {};

                    function localRequire(deps, callback, errback) {
                        var id, map, requireMod;

                        if (options.enableBuildCallback && callback && isFunction(callback)) {
                            callback.__requireJsBuild = true;
                        }

                        if (typeof deps === 'string') {
                            if (isFunction(callback)) {
                                //Invalid call
                                return onError(makeError('requireargs', 'Invalid require call'), errback);
                            }

                            //If require|exports|module are requested, get the
                            //value for them from the special handlers. Caveat:
                            //this only works while module is being defined.
                            if (relMap && hasProp(handlers, deps)) {
                                return handlers[deps](registry[relMap.id]);
                            }

                            //Synchronous access to one module. If require.get is
                            //available (as in the Node adapter), prefer that.
                            if (req.get) {
                                return req.get(context, deps, relMap, localRequire);
                            }

                            //Normalize module name, if it contains . or ..
                            map = makeModuleMap(deps, relMap, false, true);
                            id = map.id;

                            if (!hasProp(defined, id)) {
                                return onError(makeError('notloaded', 'Module name "' +
                                            id +
                                            '" has not been loaded yet for context: ' +
                                            contextName +
                                            (relMap ? '' : '. Use require([])')));
                            }
                            return defined[id];
                        }

                        //Grab defines waiting in the global queue.
                        intakeDefines();

                        //Mark all the dependencies as needing to be loaded.
                        context.nextTick(function () {
                            //Some defines could have been added since the
                            //require call, collect them.
                            intakeDefines();

                            requireMod = getModule(makeModuleMap(null, relMap));

                            //Store if map config should be applied to this require
                            //call for dependencies.
                            requireMod.skipMap = options.skipMap;

                            requireMod.init(deps, callback, errback, {
                                enabled: true
                            });

                            checkLoaded();
                        });

                        return localRequire;
                    }

                    mixin(localRequire, {
                        isBrowser: isBrowser,

                        /**
                         * Converts a module name + .extension into an URL path.
                         * *Requires* the use of a module name. It does not support using
                         * plain URLs like nameToUrl.
                         */
                        toUrl: function (moduleNamePlusExt) {
                            var ext,
                                index = moduleNamePlusExt.lastIndexOf('.'),
                                segment = moduleNamePlusExt.split('/')[0],
                                isRelative = segment === '.' || segment === '..';

                            //Have a file extension alias, and it is not the
                            //dots from a relative path.
                            if (index !== -1 && (!isRelative || index > 1)) {
                                ext = moduleNamePlusExt.substring(index, moduleNamePlusExt.length);
                                moduleNamePlusExt = moduleNamePlusExt.substring(0, index);
                            }

                            return context.nameToUrl(normalize(moduleNamePlusExt,
                                                    relMap && relMap.id, true), ext,  true);
                        },

                        defined: function (id) {
                            return hasProp(defined, makeModuleMap(id, relMap, false, true).id);
                        },

                        specified: function (id) {
                            id = makeModuleMap(id, relMap, false, true).id;
                            return hasProp(defined, id) || hasProp(registry, id);
                        }
                    });

                    //Only allow undef on top level require calls
                    if (!relMap) {
                        localRequire.undef = function (id) {
                            //Bind any waiting define() calls to this context,
                            //fix for #408
                            takeGlobalQueue();

                            var map = makeModuleMap(id, relMap, true),
                                mod = getOwn(registry, id);

                            mod.undefed = true;
                            removeScript(id);

                            delete defined[id];
                            delete urlFetched[map.url];
                            delete undefEvents[id];

                            //Clean queued defines too. Go backwards
                            //in array so that the splices do not
                            //mess up the iteration.
                            eachReverse(defQueue, function(args, i) {
                                if (args[0] === id) {
                                    defQueue.splice(i, 1);
                                }
                            });
                            delete context.defQueueMap[id];

                            if (mod) {
                                //Hold on to listeners in case the
                                //module will be attempted to be reloaded
                                //using a different config.
                                if (mod.events.defined) {
                                    undefEvents[id] = mod.events;
                                }

                                cleanRegistry(id);
                            }
                        };
                    }

                    return localRequire;
                },

                /**
                 * Called to enable a module if it is still in the registry
                 * awaiting enablement. A second arg, parent, the parent module,
                 * is passed in for context, when this method is overridden by
                 * the optimizer. Not shown here to keep code compact.
                 */
                enable: function (depMap) {
                    var mod = getOwn(registry, depMap.id);
                    if (mod) {
                        getModule(depMap).enable();
                    }
                },

                /**
                 * Internal method used by environment adapters to complete a load event.
                 * A load event could be a script load or just a load pass from a synchronous
                 * load call.
                 * @param {String} moduleName the name of the module to potentially complete.
                 */
                completeLoad: function (moduleName) {
                    var found, args, mod,
                        shim = getOwn(config.shim, moduleName) || {},
                        shExports = shim.exports;

                    takeGlobalQueue();

                    while (defQueue.length) {
                        args = defQueue.shift();
                        if (args[0] === null) {
                            args[0] = moduleName;
                            //If already found an anonymous module and bound it
                            //to this name, then this is some other anon module
                            //waiting for its completeLoad to fire.
                            if (found) {
                                break;
                            }
                            found = true;
                        } else if (args[0] === moduleName) {
                            //Found matching define call for this script!
                            found = true;
                        }

                        callGetModule(args);
                    }
                    context.defQueueMap = {};

                    //Do this after the cycle of callGetModule in case the result
                    //of those calls/init calls changes the registry.
                    mod = getOwn(registry, moduleName);

                    if (!found && !hasProp(defined, moduleName) && mod && !mod.inited) {
                        if (config.enforceDefine && (!shExports || !getGlobal(shExports))) {
                            if (hasPathFallback(moduleName)) {
                                return;
                            } else {
                                return onError(makeError('nodefine',
                                                'No define call for ' + moduleName,
                                                null,
                                                [moduleName]));
                            }
                        } else {
                            //A script that does not call define(), so just simulate
                            //the call for it.
                            callGetModule([moduleName, (shim.deps || []), shim.exportsFn]);
                        }
                    }

                    checkLoaded();
                },

                /**
                 * Converts a module name to a file path. Supports cases where
                 * moduleName may actually be just an URL.
                 * Note that it **does not** call normalize on the moduleName,
                 * it is assumed to have already been normalized. This is an
                 * internal API, not a public one. Use toUrl for the public API.
                 */
                nameToUrl: function (moduleName, ext, skipExt) {
                    var paths, syms, i, parentModule, url,
                        parentPath, bundleId,
                        pkgMain = getOwn(config.pkgs, moduleName);

                    if (pkgMain) {
                        moduleName = pkgMain;
                    }

                    bundleId = getOwn(bundlesMap, moduleName);

                    if (bundleId) {
                        return context.nameToUrl(bundleId, ext, skipExt);
                    }

                    //If a colon is in the URL, it indicates a protocol is used and it is just
                    //an URL to a file, or if it starts with a slash, contains a query arg (i.e. ?)
                    //or ends with .js, then assume the user meant to use an url and not a module id.
                    //The slash is important for protocol-less URLs as well as full paths.
                    if (req.jsExtRegExp.test(moduleName)) {
                        //Just a plain path, not module name lookup, so just return it.
                        //Add extension if it is included. This is a bit wonky, only non-.js things pass
                        //an extension, this method probably needs to be reworked.
                        url = moduleName + (ext || '');
                    } else {
                        //A module that needs to be converted to a path.
                        paths = config.paths;

                        syms = moduleName.split('/');
                        //For each module name segment, see if there is a path
                        //registered for it. Start with most specific name
                        //and work up from it.
                        for (i = syms.length; i > 0; i -= 1) {
                            parentModule = syms.slice(0, i).join('/');

                            parentPath = getOwn(paths, parentModule);
                            if (parentPath) {
                                //If an array, it means there are a few choices,
                                //Choose the one that is desired
                                if (isArray(parentPath)) {
                                    parentPath = parentPath[0];
                                }
                                syms.splice(0, i, parentPath);
                                break;
                            }
                        }

                        //Join the path parts together, then figure out if baseUrl is needed.
                        url = syms.join('/');
                        url += (ext || (/^data\:|^blob\:|\?/.test(url) || skipExt ? '' : '.js'));
                        url = (url.charAt(0) === '/' || url.match(/^[\w\+\.\-]+:/) ? '' : config.baseUrl) + url;
                    }

                    return config.urlArgs && !/^blob\:/.test(url) ?
                        url + config.urlArgs(moduleName, url) : url;
                },

                //Delegates to req.load. Broken out as a separate function to
                //allow overriding in the optimizer.
                load: function (id, url) {
                    req.load(context, id, url);
                },

                /**
                 * Executes a module callback function. Broken out as a separate function
                 * solely to allow the build system to sequence the files in the built
                 * layer in the right sequence.
                 *
                 * @private
                 */
                execCb: function (name, callback, args, exports) {
                    return callback.apply(exports, args);
                },

                /**
                 * callback for script loads, used to check status of loading.
                 *
                 * @param {Event} evt the event from the browser for the script
                 * that was loaded.
                 */
                onScriptLoad: function (evt) {
                    //Using currentTarget instead of target for Firefox 2.0's sake. Not
                    //all old browsers will be supported, but this one was easy enough
                    //to support and still makes sense.
                    if (evt.type === 'load' ||
                            (readyRegExp.test((evt.currentTarget || evt.srcElement).readyState))) {
                        //Reset interactive script so a script node is not held onto for
                        //to long.
                        interactiveScript = null;

                        //Pull out the name of the module and the context.
                        var data = getScriptData(evt);
                        context.completeLoad(data.id);
                    }
                },

                /**
                 * Callback for script errors.
                 */
                onScriptError: function (evt) {
                    var data = getScriptData(evt);
                    if (!hasPathFallback(data.id)) {
                        var parents = [];
                        eachProp(registry, function(value, key) {
                            if (key.indexOf('_@r') !== 0) {
                                each(value.depMaps, function(depMap) {
                                    if (depMap.id === data.id) {
                                        parents.push(key);
                                        return true;
                                    }
                                });
                            }
                        });
                        return onError(makeError('scripterror', 'Script error for "' + data.id +
                                                (parents.length ?
                                                '", needed by: ' + parents.join(', ') :
                                                '"'), evt, [data.id]));
                    }
                }
            };

            context.require = context.makeRequire();
            return context;
        }

        /**
         * Main entry point.
         *
         * If the only argument to require is a string, then the module that
         * is represented by that string is fetched for the appropriate context.
         *
         * If the first argument is an array, then it will be treated as an array
         * of dependency string names to fetch. An optional function callback can
         * be specified to execute when all of those dependencies are available.
         *
         * Make a local req variable to help Caja compliance (it assumes things
         * on a require that are not standardized), and to give a short
         * name for minification/local scope use.
         */
        req = requirejs = function (deps, callback, errback, optional) {

            //Find the right context, use default
            var context, config,
                contextName = defContextName;

            // Determine if have config object in the call.
            if (!isArray(deps) && typeof deps !== 'string') {
                // deps is a config object
                config = deps;
                if (isArray(callback)) {
                    // Adjust args if there are dependencies
                    deps = callback;
                    callback = errback;
                    errback = optional;
                } else {
                    deps = [];
                }
            }

            if (config && config.context) {
                contextName = config.context;
            }

            context = getOwn(contexts, contextName);
            if (!context) {
                context = contexts[contextName] = req.s.newContext(contextName);
            }

            if (config) {
                context.configure(config);
            }

            return context.require(deps, callback, errback);
        };

        /**
         * Support require.config() to make it easier to cooperate with other
         * AMD loaders on globally agreed names.
         */
        req.config = function (config) {
            return req(config);
        };

        /**
         * Execute something after the current tick
         * of the event loop. Override for other envs
         * that have a better solution than setTimeout.
         * @param  {Function} fn function to execute later.
         */
        req.nextTick = typeof setTimeout !== 'undefined' ? function (fn) {
            setTimeout(fn, 4);
        } : function (fn) { fn(); };

        /**
         * Export require as a global, but only if it does not already exist.
         */
        if (!require) {
            require = req;
        }

        req.version = version;

        //Used to filter out dependencies that are already paths.
        req.jsExtRegExp = /^\/|:|\?|\.js$/;
        req.isBrowser = isBrowser;
        s = req.s = {
            contexts: contexts,
            newContext: newContext
        };

        //Create default context.
        req({});

        //Exports some context-sensitive methods on global require.
        each([
            'toUrl',
            'undef',
            'defined',
            'specified'
        ], function (prop) {
            //Reference from contexts instead of early binding to default context,
            //so that during builds, the latest instance of the default context
            //with its config gets used.
            req[prop] = function () {
                var ctx = contexts[defContextName];
                return ctx.require[prop].apply(ctx, arguments);
            };
        });

        if (isBrowser) {
            head = s.head = document.getElementsByTagName('head')[0];
            //If BASE tag is in play, using appendChild is a problem for IE6.
            //When that browser dies, this can be removed. Details in this jQuery bug:
            //http://dev.jquery.com/ticket/2709
            baseElement = document.getElementsByTagName('base')[0];
            if (baseElement) {
                head = s.head = baseElement.parentNode;
            }
        }

        /**
         * Any errors that require explicitly generates will be passed to this
         * function. Intercept/override it if you want custom error handling.
         * @param {Error} err the error object.
         */
        req.onError = defaultOnError;

        /**
         * Creates the node for the load command. Only used in browser envs.
         */
        req.createNode = function (config, moduleName, url) {
            var node = config.xhtml ?
                    document.createElementNS('http://www.w3.org/1999/xhtml', 'html:script') :
                    document.createElement('script');
            node.type = config.scriptType || 'text/javascript';
            node.charset = 'utf-8';
            node.async = true;
            return node;
        };

        /**
         * Does the request to load a module for the browser case.
         * Make this a separate function to allow other environments
         * to override it.
         *
         * @param {Object} context the require context to find state.
         * @param {String} moduleName the name of the module.
         * @param {Object} url the URL to the module.
         */
        req.load = function (context, moduleName, url) {
            var config = (context && context.config) || {},
                node;
            if (isBrowser) {
                //In the browser so use a script tag
                node = req.createNode(config, moduleName, url);

                node.setAttribute('data-requirecontext', context.contextName);
                node.setAttribute('data-requiremodule', moduleName);

                //Set up load listener. Test attachEvent first because IE9 has
                //a subtle issue in its addEventListener and script onload firings
                //that do not match the behavior of all other browsers with
                //addEventListener support, which fire the onload event for a
                //script right after the script execution. See:
                //https://connect.microsoft.com/IE/feedback/details/648057/script-onload-event-is-not-fired-immediately-after-script-execution
                //UNFORTUNATELY Opera implements attachEvent but does not follow the script
                //script execution mode.
                if (node.attachEvent &&
                        //Check if node.attachEvent is artificially added by custom script or
                        //natively supported by browser
                        //read https://github.com/requirejs/requirejs/issues/187
                        //if we can NOT find [native code] then it must NOT natively supported.
                        //in IE8, node.attachEvent does not have toString()
                        //Note the test for "[native code" with no closing brace, see:
                        //https://github.com/requirejs/requirejs/issues/273
                        !(node.attachEvent.toString && node.attachEvent.toString().indexOf('[native code') < 0) &&
                        !isOpera) {
                    //Probably IE. IE (at least 6-8) do not fire
                    //script onload right after executing the script, so
                    //we cannot tie the anonymous define call to a name.
                    //However, IE reports the script as being in 'interactive'
                    //readyState at the time of the define call.
                    useInteractive = true;

                    node.attachEvent('onreadystatechange', context.onScriptLoad);
                    //It would be great to add an error handler here to catch
                    //404s in IE9+. However, onreadystatechange will fire before
                    //the error handler, so that does not help. If addEventListener
                    //is used, then IE will fire error before load, but we cannot
                    //use that pathway given the connect.microsoft.com issue
                    //mentioned above about not doing the 'script execute,
                    //then fire the script load event listener before execute
                    //next script' that other browsers do.
                    //Best hope: IE10 fixes the issues,
                    //and then destroys all installs of IE 6-9.
                    //node.attachEvent('onerror', context.onScriptError);
                } else {
                    node.addEventListener('load', context.onScriptLoad, false);
                    node.addEventListener('error', context.onScriptError, false);
                }
                node.src = url;

                //Calling onNodeCreated after all properties on the node have been
                //set, but before it is placed in the DOM.
                if (config.onNodeCreated) {
                    config.onNodeCreated(node, config, moduleName, url);
                }

                //For some cache cases in IE 6-8, the script executes before the end
                //of the appendChild execution, so to tie an anonymous define
                //call to the module name (which is stored on the node), hold on
                //to a reference to this node, but clear after the DOM insertion.
                currentlyAddingScript = node;
                if (baseElement) {
                    head.insertBefore(node, baseElement);
                } else {
                    head.appendChild(node);
                }
                currentlyAddingScript = null;

                return node;
            } else if (isWebWorker) {
                try {
                    //In a web worker, use importScripts. This is not a very
                    //efficient use of importScripts, importScripts will block until
                    //its script is downloaded and evaluated. However, if web workers
                    //are in play, the expectation is that a build has been done so
                    //that only one script needs to be loaded anyway. This may need
                    //to be reevaluated if other use cases become common.

                    // Post a task to the event loop to work around a bug in WebKit
                    // where the worker gets garbage-collected after calling
                    // importScripts(): https://webkit.org/b/153317
                    setTimeout(function() {}, 0);
                    importScripts(url);

                    //Account for anonymous modules
                    context.completeLoad(moduleName);
                } catch (e) {
                    context.onError(makeError('importscripts',
                                    'importScripts failed for ' +
                                        moduleName + ' at ' + url,
                                    e,
                                    [moduleName]));
                }
            }
        };

        function getInteractiveScript() {
            if (interactiveScript && interactiveScript.readyState === 'interactive') {
                return interactiveScript;
            }

            eachReverse(scripts(), function (script) {
                if (script.readyState === 'interactive') {
                    return (interactiveScript = script);
                }
            });
            return interactiveScript;
        }

        //Look for a data-main script attribute, which could also adjust the baseUrl.
        if (isBrowser && !cfg.skipDataMain) {
            //Figure out baseUrl. Get it from the script tag with require.js in it.
            eachReverse(scripts(), function (script) {
                //Set the 'head' where we can append children by
                //using the script's parent.
                if (!head) {
                    head = script.parentNode;
                }

                //Look for a data-main attribute to set main script for the page
                //to load. If it is there, the path to data main becomes the
                //baseUrl, if it is not already set.
                dataMain = script.getAttribute('data-main');
                if (dataMain) {
                    //Preserve dataMain in case it is a path (i.e. contains '?')
                    mainScript = dataMain;

                    //Set final baseUrl if there is not already an explicit one,
                    //but only do so if the data-main value is not a loader plugin
                    //module ID.
                    if (!cfg.baseUrl && mainScript.indexOf('!') === -1) {
                        //Pull off the directory of data-main for use as the
                        //baseUrl.
                        src = mainScript.split('/');
                        mainScript = src.pop();
                        subPath = src.length ? src.join('/')  + '/' : './';

                        cfg.baseUrl = subPath;
                    }

                    //Strip off any trailing .js since mainScript is now
                    //like a module name.
                    mainScript = mainScript.replace(jsSuffixRegExp, '');

                    //If mainScript is still a path, fall back to dataMain
                    if (req.jsExtRegExp.test(mainScript)) {
                        mainScript = dataMain;
                    }

                    //Put the data-main script in the files to load.
                    cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript];

                    return true;
                }
            });
        }

        /**
         * The function that handles definitions of modules. Differs from
         * require() in that a string for the module should be the first argument,
         * and the function to execute after dependencies are loaded should
         * return a value to define the module corresponding to the first argument's
         * name.
         */
        define = function (name, deps, callback) {
            var node, context;

            //Allow for anonymous modules
            if (typeof name !== 'string') {
                //Adjust args appropriately
                callback = deps;
                deps = name;
                name = null;
            }

            //This module may not have dependencies
            if (!isArray(deps)) {
                callback = deps;
                deps = null;
            }

            //If no name, and callback is a function, then figure out if it a
            //CommonJS thing with dependencies.
            if (!deps && isFunction(callback)) {
                deps = [];
                //Remove comments from the callback string,
                //look for require calls, and pull them into the dependencies,
                //but only if there are function args.
                if (callback.length) {
                    callback
                        .toString()
                        .replace(commentRegExp, commentReplace)
                        .replace(cjsRequireRegExp, function (match, dep) {
                            deps.push(dep);
                        });

                    //May be a CommonJS thing even without require calls, but still
                    //could use exports, and module. Avoid doing exports and module
                    //work though if it just needs require.
                    //REQUIRES the function to expect the CommonJS variables in the
                    //order listed below.
                    deps = (callback.length === 1 ? ['require'] : ['require', 'exports', 'module']).concat(deps);
                }
            }

            //If in IE 6-8 and hit an anonymous define() call, do the interactive
            //work.
            if (useInteractive) {
                node = currentlyAddingScript || getInteractiveScript();
                if (node) {
                    if (!name) {
                        name = node.getAttribute('data-requiremodule');
                    }
                    context = contexts[node.getAttribute('data-requirecontext')];
                }
            }

            //Always save off evaluating the def call until the script onload handler.
            //This allows multiple modules to be in a file without prematurely
            //tracing dependencies, and allows for anonymous module support,
            //where the module name is not known until the script onload event
            //occurs. If no context, use the global queue, and get it processed
            //in the onscript load callback.
            if (context) {
                context.defQueue.push([name, deps, callback]);
                context.defQueueMap[name] = true;
            } else {
                globalDefQueue.push([name, deps, callback]);
            }
        };

        define.amd = {
            jQuery: true
        };

        /**
         * Executes the text. Normally just uses eval, but can be modified
         * to use a better, environment-specific call. Only used for transpiling
         * loader plugins, not for plain JS modules.
         * @param {String} text the text to execute/evaluate.
         */
        req.exec = function (text) {
            /*jslint evil: true */
            return eval(text);
        };

        //Set up with config info.
        req(cfg);
    }(this, (typeof setTimeout === 'undefined' ? undefined : setTimeout)));

    window.vcuirequire = require;
    window.vcuidefine = define;
    window.vcuirequirejs = requirejs;
})();
/*!
 * @author 바이널씨
 * @description 바이널씨 코어 라이브러리
 * @license MIT License
 */
;(function (global, undefined) {
    "use strict";
    /* jshint expr: true, validthis: true */
    /* global vcui, alert, escape, unescape */

    /**
     * @callback arrayCallback
     * @param  {*} item - 배열의 요소
     *
     * @param  {number} index   - 배열의 인덱스
     * @param  {array}  Array   - 배열 자신
     * @return {boolean} false를 반환하면 반복을 멈춘다.
     */

    /**
     * 이벤트헨들러
     *
     * @callback eventCallback
     * @param {$.Event} e 이벤트 객체
     * @param {object} [data] 데이타
     */

    if (!jQuery) {
        throw new Error("This library requires jQuery");
    }


    var _configs = typeof vcuiConfigs === 'undefined' ? {} : vcuiConfigs;

    window.LIB_NAME = _configs.name || 'vcui';
    window.IS_DEBUG = _configs.debug || location.href.indexOf('debug=true') >= 0;

    // 프레임웍 이름
    var /** @const */LIB_NAME = global.LIB_NAME || 'vcui';
    if (global[LIB_NAME]) {
        return;
    }

    


    /**
     * @namespace
     * @name vcui
     * @description vinylc javascript library
     */
    var core = global[LIB_NAME] || (global[LIB_NAME] = {});

    if (!('importBasePath' in _configs)) {
        (function () {    // import 할 baseUrl이 설정안돼있을 경우 vcui.js경로를 알아내 설정해준다.
            var scripts = document.getElementsByTagName('script');
            var regex = /(.*)vcui\.(min\.)?js.*/i;
            var m;

            for (var i = -1, item; item = scripts[++i];) {
                if (item.src && (m = item.src.match(regex))) {
                    _configs.importBasePath = m[1];
                    return;
                }
            }
        })();
    }

    ///// require js setting //////////////////////////////////////
    var requireConfig = {
        baseUrl: _configs.importBasePath,
        skipDataMain: true,
        waitSeconds: 100,
        shim: {
            jquery: {
                exports: 'jQuery'
            }
        }
    };

    vcuirequire.config(requireConfig);
    core.require = vcuirequire;
    core.requirejs = vcuirequirejs;
    core.define = vcuidefine;

    core.define('jquery', function () {
        return window.$;
    });
    core.define('vcui', function () {
        return core;
    });

    // end require js config /////////////////////////////////////

    var root = global.document.documentElement,
        doc = global.document,
        $win = $(global),
        tmpInput = doc.createElement('input'),
        isTouch = ('ontouchstart' in global),
        isMobile = ('orientation' in global) || global.IS_MOBILE === true,
        supportPlaceholder = ('placeholder' in tmpInput),
        arrayProto = Array.prototype,
        objectProto = Object.prototype,
        toString = objectProto.toString,
        hasOwn = objectProto.hasOwnProperty,
        arraySlice = arrayProto.slice,
        globalStyle = '';

    // detect
    globalStyle += ' js';
    isTouch && (globalStyle += ' touch');
    isMobile && (globalStyle += ' mobile');
    root.className += globalStyle;

    var isPlainObject = (function () {
            var o = '[object Object]';

            return (toString.call(null) === o) ? function (value) {
                return value !== null
                    && value !== undefined
                    && toString.call(value) === o
                    && value.ownerDocument === undefined;
            } : function (value) {
                return toString.call(value) === o;
            }
        })(),

        // 타입 체크
        isType = function (value, typeName) {
            var isGet = arguments.length === 1;

            function result(name) {
                return isGet ? name : typeName === name;
            }

            if (value === null) {
                return result('null');
            }

            if (typeof value === undefined) {
                return 'undefined'
            }

            if (value && value.nodeType) {
                if (value.nodeType === 1 || value.nodeType === 9) {
                    return result('element');
                } else if (value && value.nodeType === 3 && value.nodeName === '#text') {
                    return result('textnode');
                }
            }

            if (typeName === 'object' || typeName === 'json') {
                return isGet ? 'object' : isPlainObject(value);
            }

            var s = toString.call(value),
                type = s.match(/\[object (.*?)\]/)[1].toLowerCase();

            if (type === 'number') {
                if (isNaN(value)) {
                    return result('nan');
                }
                if (!isFinite(value)) {
                    return result('infinity');
                }
                return result('number');
            }

            return isGet ? type : type === typeName;
        },

        hasItems = function (obj) {
            var has = false;
            each(obj, function (v) {
                return has = true, false;
            });
            return has;
        },

        isEmpty = function (value, allowEmptyString) {
            return (value === null)
                || (value === undefined)
                || (value === 0)
                || (isType(value, 'string') && !allowEmptyString ? value === '' : false)
                || (isType(value, 'array') && value.length === 0)
                || (isType(value, 'object') && !hasItems(value));
        },

        /**
         * 반복 함수
         * @function
         * @name vcui.each
         * @param {Array|Object} obj 배열 및 json객체
         * @param {arrayCallback} iterater 콜백함수
         * @param {*} [ctx] 컨텍스트
         * @return {*}
         * @example
         * vcui.each({'a': '에이', 'b': '비', 'c': '씨'}, function(value, key) {
         *     alert('key:'+key+', value:'+value);
         *     if(key === 'b') {
         *         return false; // false 를 반환하면 순환을 멈춘다.
         *     }
         * });
         */
        each = function (obj, iterater, ctx) {
            if (!obj) {
                return obj;
            }
            var i = 0,
                len = 0,
                isArr = isArray(obj);

            if (isArr) {
                // 배열
                for (i = 0, len = obj.length; i < len; i++) {
                    if (iterater.call(ctx || obj, obj[i], i, obj) === false) {
                        break;
                    }
                }
            } else {
                // 객체체
                for (i in obj) {
                    if (hasOwn.call(obj, i)) {
                        if (iterater.call(ctx || obj, obj[i], i, obj) === false) {
                            break;
                        }
                    }
                }
            }
            return obj;
        },
        /**
         * 역순 반복 함수(배열만 유효)
         * @function
         * @name vcui.eachReverse
         * @param {array} obj 배열
         * @param {arrayCallback} iterater 콜백함수
         * @param {*} [ctx] 컨텍스트
         * @return {jQuery}
         * @example
         * vcui.eachReverse(['a', '에이', 'b', '비', 'c', '씨'], function(value, key) {
         *     alert('key:'+key+', value:'+value);
         *     if(key === 'b') {
         *         return false; // false 를 반환하면 순환을 멈춘다.
         *     }
         * });
         */
        eachReverse = function (obj, iterater, ctx) {
            if (!obj) {
                return obj;
            }
            var i = 0,
                isArr = isArray(obj);

            if (isArr) {
                for (i = obj.length - 1; i >= 0; i--) {
                    if (iterater.call(ctx || obj, obj[i], i, obj) === false) {
                        break;
                    }
                }
            } else {
                throw new Error('eachReverse 함수는 배열에만 사용할 수 있습니다.');
            }
            return obj;
        },
        /**
         * 객체 확장 함수
         * @function
         * @name vcui.extend
         * @param {object} obj...
         * @return {jQuery}
         * @example
         * var ori = {"a": 'A', "b": [1, 2, 3]};
         * vcui.extend(ori, {
         *    "c": "C"
         * }); // {"a": 'A', "b": [1, 2, 3], "c": "C"}
         */
        /*extend = function (deep, target) {
            var objs;
            if (typeof deep === 'boolean') {
                objs = [].slice.call(arguments, 2);
            } else {
                objs = [].slice.call(arguments, 1);
                target = deep;
                deep = false;
            }

            each(objs, function (obj) {
                if (!obj || (!isPlainObject(obj) && !isType(obj, 'array'))) { return; }
                each(obj, function (val, key) {
                    var isArr = isType(val, 'array');
                    if (deep === true && (isArr || isPlainObject(val)) && !isEmpty(val)) {
                        target[key] = extend(deep, target[key] || (target[key] = isArr ? [] : {}), val);
                    } else {
                        target[key] = val;
                    }
                });
            });
            return target;
        },*/
        extend = $.extend,
        /**
         * 객체 복제 함수
         * @function
         * @name vcui.clone
         * @param {object} obj 배열 및 json객체
         * @return {jQuery}
         * @example
         * var ori = {"a": 'A', "b": [1, 2, 3]};
         * var clone = vcui.clone(ori); // {"a": 'A', "b": [1, 2, 3]};
         * // ori 복제본, ori를 변경하여도 clone은 변하지 않는다.
         */
        clone = function (obj) {
            if (null === obj || "object" != typeof obj) return obj;

            var copy;

            if (obj instanceof Date) {
                copy = new Date();
                copy.setTime(obj.getTime());
                return copy;
            }

            if (obj instanceof Array) {
                copy = [];
                for (var i = 0, len = obj.length; i < len; i++) {
                    copy[i] = clone(obj[i]);
                }
                return copy;
            }

            if (obj instanceof Object) {
                copy = {};
                for (var attr in obj) {
                    if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
                }
                return copy;
            }
            throw new Error('oops!! clone is fail');
        },
        _bindType = function (name) {
            return function (val) {
                return isType(val, name);
            };
        },

        // 배열 여부
        isArray = _bindType('array');

    extend(core, {
        name: LIB_NAME,             // 프렘웍 이름
        version: '1.1.1',//vcuiVersion,       // 버전
        debug: false,               // 디버깅 여부
        noop: function () {
        },
        UI_PREFIX: 'vc',            // ui 모듈의 PREFIX
        IS_DEBUG: !!(_configs.debug || global.IS_DEBUG),
        configs: extend(_configs, {
            importBasePath: _configs.importBasePath || '',
            loadMinify: !!_configs.loadMinify
        }),
        each: each,                 // 반복함수
        eachReverse: eachReverse,   // 역순 반복함수
        extend: extend,             // 객체 병합함수
        clone: clone,               // 객체 복제함수
        emptyFn: function () {      // 빈함수
        },
        /**
         * 특정속성을 지원하는지 체크하기 위한 엘리먼트
         * @member
         * @name vcui.tmpInput
         * @example
         * if('placeholder' in vcui.tmpInput) {
         *     alert('placeholder를 지원합니다.');
         * }
         */
        tmpInput: tmpInput,
        /**
         * 특정 css스타일을 지원하는지 체크하기 위한 엘리먼트
         * @member
         * @name vcui.tmpNode
         * @example
         * if('transform' in vcui.tmpNode.style) {
         *     alert('transform를 지원합니다.');
         * }
         */
        tmpNode: doc.createElement('div'),

        /**
         * 타입 체크
         * @function
         * @name vcui.isType
         * @param {*} o 타입을 체크할 값
         * @param {string=} typeName 타입명(null, Number, String, element, nan, infinity, date, Array)
         * @return {boolean|string} typeName이 안넘오면 타입값을 반환해준다.
         * @example
         * vcui.isType('aaaa', 'string'); // true
         * vcui.isType(new Date(), 'date'); // true
         * vcui.isType(1, 'number'); // true
         * vcui.isType(/[a-z]/, 'regexp'); // true
         * vcui.isType(document.getElementById('box'), 'element'); // true
         * vcui.isType({a:'a'}, 'object'); // true
         * vcui.isType([], 'array'); // true
         * vcui.isType(NaN, 'nan'); // true
         * vcui.isType(null, 'null'); // true
         * // 파라미터를 하나만 넘기면 타입명을 반환받을 수 있다.
         * vcui.isType('') // "string"
         * vcui.isType(null) //"null"
         * vcui.isType(1) //"number"
         * vcui.isType({}) //"object"
         * vcui.isType([]) // "array"
         * vcui.isType(undefined) // "undefined"
         * vcui.isType(new Date()) // "date"
         * vcui.isType(/[a-z]/) // "regexp"
         * vcui.isType(document.body) //"element"
         */
        isType: isType,
        /**
         * 타입 체크 vcui.isType의 별칭
         * @function
         * @name vcui.type
         * @param {*} o 타입을 체크할 값
         * @param {String=} typeName 타입명(null, Number, String, element, nan, infinity, date, Array)
         * @return {string|boolean}
         */
        type: isType,

        /**
         * 주어진 값이 함수형인가
         * @function
         * @name vcui.isFunction
         * @param val {function}
         * @return {boolean}
         */
        isFunction: _bindType('function'),

        /**
         * 주어진 값이 JSON인가
         * @function
         * @name vcui.isPlainObject
         * @param val {function}
         * @return {boolean}
         */
        isPlainObject: isPlainObject,

        /**
         * 주어진 값이 문자형인가
         * @function
         * @name vcui.isStrinng
         * @param val {string}
         * @return {boolean}
         */
        isString: _bindType('string'),

        /**
         * 주어진 값이 배열형인가
         * @function
         * @name vcui.isArray
         * @param val {array}
         * @return {boolean}
         */
        isArray: _bindType('array'),

        /**
         * 주어진 값이 숫자형인가
         * @function
         * @name vcui.isNumber
         * @param val {*}
         * @return {boolean}
         */
        isNumber: _bindType('number'),

        /**
         * 문자열이든 숫자든 상관없이 숫자만 있는지 체크
         * @param val
         * @returns {boolean}
         */
        isNumeric: function (val) {
            return !isNaN(parseFloat(val)) && isFinite(val);
        },


        /**
         * 주어진 값이 객체형인가
         * @function
         * @name vcui.isObject
         * @param val {*}
         * @return {boolean}
         */
        isObject: _bindType('object'),

        /**
         * undefined 여부 체크
         * @function
         * @name vcui.isUndefined
         * @param value {*}
         * @return {boolean}
         */
        isUndefined: function (value) {
            return typeof value === 'undefined';
        },

        /**
         * 주어진 인자가 빈값인지 체크
         * @function
         * @name vcui.isEmpty
         * @param {*} value 체크할 값(문자열, 객체 등등)
         * @param {boolean} [allowEmptyString = false] 빈문자를 허용할 것인지 여부
         * @return {boolean}
         * @example
         * vcui.isEmpty(null); // true
         * vcui.isEmpty(undefined); // true
         * vcui.isEmpty(''); // true
         * vcui.isEmpty(0); // true
         * vcui.isEmpty(null); // true
         * vcui.isEmpty([]); // true
         * vcui.isEmpty({}); // true
         */
        isEmpty: isEmpty,

        /**
         * 객체 자체에 주어진 이름의 속성이 있는지 조회
         * @function
         * @name vcui.hasOwn
         * @param {object} obj 객체
         * @param {string} name 키 이름
         * @return {boolean} 키의 존재 여부
         * @example
         * var obj = {"a": "A"}
         * if(vcui.hasOwn(obj, 'a')){
         *     alert('obj객체에 a가 존재합니다.');
         * }
         */
        hasOwn: function (obj, name) {
            return hasOwn.call(obj, name);
        },

        /**
         * 네임스페이스 공간을 생성하고 객체를 설정<br>
         * .를 구분자로 하여 하위 네임스페이스가 생성된다.
         *
         * @function
         * @name vcui.namespace
         *
         * @param {string} name 네임스페이스명
         * @param {Object=} [obj] 지정된 네임스페이스에 등록할 객체, 함수 등
         * @return {object} 생성된 새로운 네임스페이스
         *
         * @example
         * vcui.namesapce('vcui.widget.Tabcontrol', TabControl)
         * // 를 native로 풀면,
         * var vcui = {
         *     widget: {
         *         Tabcontrol: TabControl
         *     }
         * };
         *
         */
        namespace: function (name, obj, ctx) {
            if (typeof name !== 'string') {
                obj && (name = obj);
                return name;
            }

            var root = ctx || global,
                names = name.split('.'),
                i, item;

            if (names[0] === LIB_NAME) {
                names = names.slice(1);
            }

            for (i = -1; item = names[++i];) {
                root = root[item] || (root[item] = {});
            }

            return extend(root, obj || {});
        },

        /**
         * vcui 하위에 name에 해당하는 네임스페이스를 생성하여 object를 설정해주는 함수
         *
         * @function
         * @name vcui.addon
         *
         * @param {string} name .를 구분자로 해서 vcui을 시작으로 하위 네임스페이스를 생성. name이 없으면 vcui에 추가된다.
         * @param {Object|Function} obj
         *
         * @example
         * vcui.addon('urls', {
         *    store: 'Store',
         *    company: 'Company'
         * });
         *
         * alert(vcui.urls.store);
         * alert(vcui.urls.company);
         */
        addon: function (name, object, isExecFn) {
            if (typeof name !== 'string') {
                object = name;
                name = '';
            }

            var root = core,
                names = name ? name.split('.') : [],
                ln = names.length - 1,
                leaf = names[ln];

            if (isExecFn !== false && typeof object === 'function' && !hasOwn.call(object, 'superClass')) {
                object = object.call(root);
            }

            for (var i = 0; i < ln; i++) {
                root = root[names[i]] || (root[names[i]] = {});
            }

            return (leaf && (root[leaf] ? extend(root[leaf], object) : (root[leaf] = object))) || extend(root, object), object;
        },

        /**
         * 브라우저의 Detect 정보: 되도록이면 Modernizr 라이브러리를 사용할 것을 권함
         * @readonly
         * @name vcui.detect
         * @enum {*}
         * @property {boolean} isTouch // 터치디바이스 여부
         * @property {boolean} isRetina // 레티나 여부
         * @property {boolean} isMobile // orientation 작동여부로 판단
         * @property {boolean} isMac // 맥OS
         * @property {boolean} isLinux // 리눅스
         * @property {boolean} isWin // 윈도우즈
         * @property {boolean} is64Bit // 64비트 플랫폼
         * @property {boolean} isIE // IE
         * @property {boolean} ieVersion // IE의 버전
         * @property {boolean} isOpera // 오페라
         * @property {boolean} isChrome // 크롬
         * @property {boolean} isSafari // 사파리
         * @property {boolean} isWebKit // 웹킷
         * @property {boolean} isGecko // 파이어폭스
         * @property {boolean} isIETri4 // IE엔진
         * @property {boolean} isAir // 어도비 에어
         * @property {boolean} isIOS // 아이폰, 아이패드
         * @property {boolean} isAndroid // 안드로이드
         * @property {number} iosVersion // ios 버전 : [8, 1, 0] -> [major, minor, revision]
         * @property {number} androidVersion // android 버전 : [4, 1, 0] -> [major, minor, revision]
         * @example
         * if(vcui.browser.isIE && vcui.browser.isVersion < 9) {
         *     alert('구버전을 사용하고 있습니다.');
         * }
         */
        detect: (function () {
            // 아 정리하고 싶당..
            var detect = {},
                win = global,
                na = win.navigator,
                ua = na.userAgent,
                lua = ua.toLowerCase(),
                match;

            detect.placeholder = supportPlaceholder;
            detect.isStrict = (typeof global == 'undefined');

            detect.isRetina = 'devicePixelRatio' in global && global.devicePixelRatio > 1;
            detect.isAndroid = lua.indexOf('android') !== -1;
            detect.isBadAndroid = /Android /.test(na.appVersion) && !(/Chrome\/\d/.test(na.appVersion));
            detect.isOpera = !!(win.opera && win.opera.buildNumber);
            detect.isWebKit = /WebKit/.test(ua);
            detect.isTouch = !!('ontouchstart' in global);         

            match = /(msie) ([\w.]+)/.exec(lua) || /(trident)(?:.*rv.?([\w.]+))?/.exec(lua) || ['', null, -1];
            detect.isIE = !detect.isWebKit && !detect.isOpera && match[1] !== null;
            detect.version = detect.ieVersion = parseInt(match[2], 10);
            detect.isOldIE = detect.isIE && detect.version < 9;

            detect.isWin = (na.appVersion.indexOf("Win") != -1);
            detect.isMac = (ua.indexOf('Mac') !== -1);
            detect.isLinux = (na.appVersion.indexOf("Linux") != -1);
            detect.is64Bit = (lua.indexOf('wow64') > -1 || (na.platform === 'Win64' && lua.indexOf('x64') > -1));

            detect.isChrome = (ua.indexOf('Chrome') !== -1);
            detect.isGecko = (ua.indexOf('Firefox') !== -1);
            detect.isAir = ((/adobeair/i).test(ua));
            detect.isIOS = /(iPad|iPhone)/.test(ua);
            detect.isSafari = !detect.isChrome && (/Safari/).test(ua);
            detect.isIETri4 = (detect.isIE && ua.indexOf('Trident/4.0') !== -1);
            detect.isGalaxy = (ua.indexOf(' SHV-') !== -1);

            detect.msPointer = !!(na.msPointerEnabled && na.msMaxTouchPoints && !win.PointerEvent);
            detect.pointer = !!((win.PointerEvent && na.pointerEnabled && na.maxTouchPoints) || detect.msPointer);

            // detect.isMobileDevice = ('ontouchstart' in win) || win.DocumentTouch && document instanceof DocumentTouch || na.msMaxTouchPoints;
            detect.isMobileDevice = detect.isIOS || detect.isAndroid; // 터치 기반 일반 PC? 어떻게 처리?


            if (detect.isAndroid) {
                detect.androidVersion = function () {
                    var v = ua.match(/[a|A]ndroid[^\d]*(\d+).?(\d+)?.?(\d+)?/);
                    if (!v) {
                        return -1;
                    }
                    return [parseInt(v[1] | 0, 10), parseInt(v[2] | 0, 10), parseInt(v[3] | 0, 10)];
                }();
            } else if (detect.isIOS) {
                detect.iosVersion = function () {
                    var v = ua.match(/OS (\d+)_?(\d+)?_?(\d+)?/);
                    return [parseInt(v[1] | 0, 10), parseInt(v[2] | 0, 10), parseInt(v[3] | 0, 10)];
                }();
            }

            detect.isMobile = isMobile || detect.isIOS || detect.isAndroid;
            return detect;
        }()),


        /**
         * 주어진 시간내에 호출이 되면 무시되고, 초과했을 때만 비로소 fn를 실행시켜주는 함수
         * @param {Function} fn 콜백함수
         * @param {number} time 딜레이시간
         * @param {*} scope 컨텍스트
         * @returns {Function}
         * @example
         * // 리사이징 중일 때는 #box의 크기를 변경하지 않다가,
         * // 리사이징이 끝나고 0.5초가 지난 후에 #box사이즈를 변경하고자 할 경우에 사용.
         * $(window).on('resize', vcui.delayRun(function(){
         *
        $('#box').css('width', $(window).width());
         *  }, 500));
         */
        delayRun: function (fn, time, scope) {
            time || (time = 250);
            var timeout = null;
            var runner = function () {
                var args = [].slice.call(arguments),
                    self = this;

                runner.cancel();
                timeout = setTimeout(function () {
                    fn.apply(scope || self, args);
                    timeout = null;
                }, time);
            };
            runner.cancel = function () {
                clearTimeout(timeout);
                timeout = null;
            };

            return runner;
        },

        /**
         * 주어진 시간내에 호출이 되면 무시되고, 초과했을 때만 비로소 fn를 실행시켜주는 함수
         * @function
         * @name vcui.throttle
         * @param {function} fn 콜백함수
         * @param {number} time 딜레이시간
         * @param {*} scope 컨텍스트
         * @returns {function}
         * @example
         * // 리사이징 중일 때는 #box의 크기를 변경하지 않다가,
         * // 리사이징이 끝나고 0.5초가 지난 후에 #box사이즈를 변경하고자 할 경우에 사용.
         * $(window).on('resize', vcui.throttle(function(){
		 *		$('#box').css('width', $(window).width());
		 *  }, 500));
         */
        throttle: function (fn, time, scope) {
            time || (time = 250);
            var lastCall = 0;
            return function () {
                var now = +new Date();
                if (now - lastCall < time) {
                    return;
                }
                lastCall = now;
                fn.apply(scope || this, arguments);
            };
        },

        /**
         * 주어진 값을 배열로 변환
         * @function
         * @name vcui.toArray
         * @param {*} value 배열로 변환하고자 하는 값
         * @return {array}
         *
         * @example
         * vcui.toArray('abcd"); // ["a", "b", "c", "d"]
         * vcui.toArray(arguments);  // arguments를 객체를 array로 변환하여 Array에서 지원하는 유틸함수(slice, reverse ...)를 쓸수 있다.
         */
        toArray: function (value) {
            try {
                return arraySlice.apply(value, arraySlice.call(arguments, 1));
            } catch (e) {
            }

            var ret = [];
            try {
                for (var i = 0, len = value.length; i < len; i++) {
                    ret.push(value[i]);
                }
            } catch (e) {
            }
            return ret;
        },

        /**
         * 15자의 영문, 숫자로 이루어진 유니크한 값 생성
         * @function
         * @name vcui.getUniqId
         * @return {string}
         */
        getUniqId: function (len) {
            len = len || 32;
            var rdmString = "";
            for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2)) ;
            return rdmString.substr(0, len);
        },

        /**
         * 순번으로 유니크값 을 생성해서 반환
         * @function
         * @name vcui.nextSeq
         * @return {number}
         */
        nextSeq: (function () {
            var seq = 0;
            return function (prefix) {
                return (prefix || '') + (seq += 1);
            };
        }()),

        /**
         * 키 이름
         * @name vcui.keyCode
         * @readonly
         * @enum {number}
         * @property {number} BACKSPACE 스페이스
         * @property {number} DELETE 딜리트
         * @property {number} DOWN 다운
         * @property {number} END 엔드
         * @property {number} ENTER 엔터
         * @property {number} ESCAPE ESC
         * @property {number} HOME 홈
         * @property {number} LEFT 왼쪽
         * @property {number} PAGE_DOWN 페이지다운
         * @property {number} PAGE_UP 페이지업
         * @property {number} RIGHT 오른쪽
         * @property {number} SPACE 스페이스
         * @property {number} TAB 탭
         * @property {number} UP 업
         * @example
         * $('#userid').on('keypress', function(e) {
         *     if(e.which === vcui.keyCode.DOWN) {
         *         alert('다운키 입력');
         *     }
         * });
         */
        keyCode: {
            ESCAPE: 27,
            TAB: 9,
            BACKSPACE: 8,
            ENTER: 13,
            DELETE: 46,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            HOME: 36,
            END: 35,
            SPACE: 32
        }
    });
    core.is = core.isType;


    // 커스텀 이벤트 생성
    core.customWindowEvents = {
        delayTime: 200,
        build: function () {
            var self = this;
            $win.on(function () {
                var bindGlobalEvent = function (type) {
                    var data = {};
                    return function () {
                        if (!data[type + 'Start']) {
                            $win.triggerHandler(type + 'start');
                            data[type + 'Start'] = true;
                        }
                        data[type + 'Timer'] && clearTimeout(data[type + 'Timer']);
                        data[type + 'Timer'] = setTimeout(function () {
                            $win.triggerHandler(type + 'end');
                            data[type + 'Start'] = false;
                        }, self.delayTime);
                    };
                };
                /**
                 * @fires window#scrollstart
                 * @fires window#scrollend
                 * @fires window#resizestart
                 * @fires window#resizeend
                 */
                /**
                 * 스크롤 시작시에 호출
                 * @event window#scrollstart
                 * @type {Object}
                 */
                /**
                 * 스크롤 종료시에 호출
                 * @event window#scrollend
                 * @type {Object}
                 */
                /**
                 * 리사이징 시작시에 호출
                 * @event window#resizestart
                 * @type {Object}
                 */
                /**
                 * 리사이징 종료시에 호출
                 * @event window#resizeend
                 * @type {Object}
                 */
                return {
                    'scroll': bindGlobalEvent('scroll'),
                    'resize': bindGlobalEvent('resize')
                };
            }());
        },
        start: function (delayTime) {
            if (this.isBuilt) {
                return;
            }
            this.isBuilt = true;
            if (delayTime !== undefined) {
                this.delayTime = delayTime;
            }
            this.build();
        }
    };

    core.customWindowEvents.start();

})(window);

;(function (core, global, undefined) {
/////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * 숫자관련 유틸함수 모음
     *
     * @namespace
     * @name vcui.number
     */
    core.addon('number', /** @lends vcui.number */{
        /**
         * 주어진 수를 자릿수만큼 앞자리에 0을 채워서 반환
         *
         * @param {string} value
         * @param {Number=} [size = 2]
         * @param {String=} [ch = '0']
         * @return {string}
         *
         * @example
         * vcui.number.zeroPad(2, 3); // "002 01 02 03 "
         */
        zeroPad: function (value, size, ch) {
            var sign = value < 0 ? '-' : '',
                result = String(Math.abs(value));

            ch || (ch = "0");
            size || (size = 2);

            if (result.length >= size) {
                return sign + result.slice(-size);
            }

            while (result.length < size) {
                result = ch + result;
            }
            return sign + result;
        },

        /**
         * 세자리마다 ,를 삽입, .comma로 해도 됨
         *
         * @function
         * @param {number} value
         * @return {string}
         *
         * @example
         * vcui.number.addComma(21342); // "21,342"
         * // or
         * vcui.number.comma(21342); // 21,342
         */
        addComma: (function () {
            var regComma = /(\d+)(\d{3})/;
            return function (value) {
                value += '';
                var x = value.split('.'),
                    x1 = x[0],
                    x2 = x.length > 1 ? '.' + x[1] : '';

                while (regComma.test(x1)) {
                    x1 = x1.replace(regComma, '$1' + ',' + '$2');
                }
                return x1 + x2;
            };
        })(),

        /**
         * 숫자를 하이픈이 들어간 폰넘버로 변환
         */
        phoneNumber: function (str) {
            return str.replace(/(\d{2,3})(\d{3,4})(\d{4})/gi,'$1-$2-$3');
        },

        /**
         * 숫자를 하이픈이 들어간 4-4-4-4 카드넘버로 변환
         */
        cardNumber: function (str) {
            return str.replace(/(\d{4})(\d{4})(\d{4})(\d+)/gi,'$1-$2-$3-$4');
        },

        /**
         * min ~ max사이의 랜덤값 반환
         *
         * @param {number} min 최소값
         * @param {Number=} max 최대값
         * @return {number} 랜덤값
         */
        random: function (min, max) {
            if (!max) {
                max = min;
                min = 0;
            }
            return min + Math.floor(Math.random() * (max - min + 1));
        },

        /**
         * 상하한값을 반환. value가 min보다 작을 경우 min을, max보다 클 경우 max를 반환
         *
         * @param {number} value
         * @param {number} min 최소값
         * @param {number} max 최대값
         * @return {number}
         */
        limit: function (value, min, max) {
            if (value < min) {
                return min;
            }
            else if (value > max) {
                return max;
            }
            return value;
        },

        /**
         * 어떠한 경우에도 숫자로 변환(뒤에 있는 숫자외의 문자를 제거한 후 숫자만 추출)
         * @param {*} value
         * @return {number}
         */
        parse: function (value) {
            value = (value || '').toString().replace(/[^-0-9\.]+/g, '');
            value = value * 1;
            return isNaN(value) ? 0 : value;
        },
        /**
         * 2진수로 변환
         * @param {number} d 숫자값
         * @param {number} bits=8 비트길이 (4 or 8)
         * @return {string}
         */
        toBinary: function (d, bits) {
            var b = [];
            if (!bits) {
                bits = 8;
            }
            while (d > 0) {
                b.unshift(d % 2);
                d >>= 1;
            }
            if (bits) {
                while (b.length < bits) {
                    b.unshift(0);
                }
            }
            return b.join("");
        },
        /**
         * 2진수를 10진수로 변환
         * @param {string} b
         * @return {number}
         */
        fromBinary: function (b) {
            var ba = (b || '').split(""),
                len = ba.length,
                n = 1,
                r = 0;
            for (var i = len - 1; i >= 0; i--) {
                r += n * ba[i];
                n *= 2;
            }
            return r;
        },
        /**
         * 수를 한글로 변환
         * @param {number} num
         * @return {string}
         * @example
         * vcui.number.toKorean(123456); // 십이만삼천사백오십육
         */
        toKorean: function (_num) {
            var i, num, nums, sign, korName, subUnit, unit, subPos, pos, result, ch, decimal, tmp;
            if (_num == null) {
                return '';
            }

            num = _num.toString();

            if (num === '0') {
                return '영';
            }

            if (num.substr(0, 1) === '-') {
                sign = '마이너스 ';
                num = num.substr(1);
            } else {
                sign = '';
            }

            if ((tmp = num.indexOf('.')) > -1) {
                decimal = num.substr(tmp + 1);
                num = num.substr(0, tmp);
            } else {
                decimal = '';
            }

            nums = num.split('');
            korName = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
            unit = ['', '만', '억', '조', '경', '해'];
            subUnit = ['', '십', '백', '천'];
            pos = 0;
            subPos = 0;
            result = '';
            ch = '';

            for (i = nums.length - 1; i >= 0; i--, subPos++) {
                if (subPos > 0 && subPos % 4 === 0) {
                    pos++;
                }
                if (!(ch = korName[nums[i]])) {
                    continue;
                }
                if (subPos % 4 === 0) {
                    result = unit[pos] + result; // 만, 억, 조, 경, 해
                    if (ch === '일' && (i === 0 && pos <= 1)) {
                        ch = '';
                    }
                } else {
                    if (ch === '일') {
                        ch = '';
                    }
                }
                if (ch += subUnit[subPos % 4]) {
                    result = ch + result;
                }
            }

            if (decimal) {
                result += ' 점 ';
            }

            for (i = 0; i < decimal.length; i++) {
                result += korName[decimal[i]];
            }
            return sign + result;
        },
        /**
         * 바이트단위를 사이즈단위로 변환
         * @param {number} bytes 값
         * @param {number} decimals 소수점 갯수
         * @param {string} sizes 단위 배열
         * @returns {*}
         */
        bytesToSize: function (bytes, decimals, sizes) {
            sizes = sizes || ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            if (!bytes) return '0' + sizes[0];
            var i = Math.floor(Math.log(bytes) / Math.log(1024));
            return parseFloat(bytes / Math.pow(1024, i)).toFixed(decimals || 0) + '' + sizes[i];
        },
        /**
         * Percentage 변환 함수
         * @param {number} value 값
         * @param {number} total 전체
         * @return {number}
         */
        percent: function (value, total, fixLength) {
            if (!total) {
                return 0;
            }
            var result = (value / total) * 100;

            if (typeof fixLength === 'number') {
                return result.toFixed(fixLength);
            }
            return result;
        }
    });
    /**
     * vcui.number.zeroPad의 별칭
     * @function
     * @static
     * @name vcui.number.pad
     */
    core.number.pad = core.number.zeroPad;
    /**
     * vcui.number.addComma 별칭
     * @function
     * @static
     * @name vcui.comma
     */
    core.comma = core.number.addComma;
/////////////////////////////////////////////////////////////////////////////////////////////////
})(window[LIB_NAME], window);


;(function (core, global, undefined) {
    /**
     * 문자열 관련 유틸 함수 모음
     *
     * @namespace
     * @name vcui.string
     */
    core.addon('string', function () {
        var escapeChars = {
                '&': '&amp;',
                '>': '&gt;',
                '<': '&lt;',
                '"': '&quot;',
                "'": '&#39;'
            },
            unescapeChars = (function (escapeChars) {
                var results = {};
                core.each(escapeChars, function (v, k) {
                    results[v] = k;
                });
                return results;
            })(escapeChars),
            escapeRegexp = /[&><'"]/g,
            unescapeRegexp = /\&[^;]+;/g, // /(&amp;|&gt;|&lt;|&quot;|&#39;|&#[0-9]{1,5};)/g,
            // tagRegexp = /<\/?[^>]+>/gi,
            tagRegexp = /(\"?\'?\/?<([^>]+)>\"?\'?)/gi,

            
            scriptRegexp = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/ig,
            hexRegexp = /^\&#x([\da-fA-F]+);$/;

        return /** @lends vcui.string */{
            /**
             * 앞뒤 빈문자열을 제거
             * @param {string} value
             * @return {string}
             * @example
             * vcui.string.trim(" abc "); // 'abc'
             */
            trim: function (value) {
                return value ? value.replace(/^\s+|\s+$/g, "") : value;
            },
            /**
             * 정규식이나 검색문자열을 사용하여 문자열에서 텍스트를 교체
             *
             * @param {string} value 교체를 수행할 문자열
             * @param {RegExp|String} find 검색할 문자열이나 정규식 패턴
             * @param {string} rep 대체할 문자열
             * @param {boolean} isCaseIgnore 대소문자 무시할 것인가
             * @return {string} 대체된 결과 문자열
             *
             * @example
             * vcui.string.replaceAll("a,b,c,d", ',', ''); // "abcd"
             */
            replaceAll: function (value, find, rep, isCaseIgnore) {
                if(!value) return "";
                if (find.constructor === RegExp) {
                    return value.replace(new RegExp(find.toString().replace(/^\/|\/$/gi, ""), "g" + (isCaseIgnore ? "i" : "")), rep);
                }
                return value.split(find).join(rep);
            },

            /**
             * 주어진 문자열의 바이트길이 반환
             *
             * @param {string} value 길이를 계산할 문자열
             * @return {number}
             *
             * @example
             * vcui.string.byteLength("동해물과"); // euckr:8byte, utf8:12byte
             */
            byteLength: function (value) {
                if (!value) {
                    return 0;
                }
                return encodeURIComponent(value).replace(/%[A-F\d]{2}/g, 'U').length; // 역시 native가 빨라...ㅋㅋ
            },

            /**
             * 주어진 path에서 확장자를 추출
             * @param {string} fname path문자열
             * @return {string} 확장자
             * @example
             * vcui.string.getFileExt('etc/bin/jslib.js'); // 'js'
             */
            getFileExt: function (fname) {
                fname || (fname = '');
                return fname.substr((~-fname.lastIndexOf(".") >>> 0) + 2);
            },

            /**
             * 주어진 path에서 파일명을 추출
             * @param {string} str path경로
             * @return {string} 경로가 제거된 파일명
             * @example
             * vcui.string.getFileName('etc/bin/jslib.js'); // 'jslib.js'
             */
            getFileName: function (str) {
                var paths = str.split(/\/|\\/g);
                return paths[paths.length - 1];
            },

            /**
             * 주어진 문자열을 지정된 길이만큼 자른 후, 꼬리글을 덧붙여 반환
             *
             * @param {string} value 문자열
             * @param {number} length 잘라낼 길이
             * @param {string} [truncation = '...'] 꼬리글
             * @return {string} 결과 문자열
             *
             * @example
             * vcui.string.cut("동해물과", 3, "..."); // "동..."
             */
            cut: function (value, length, truncation) {
                var str = value;

                truncation || (truncation = '');
                if (str.length > length) {
                    return str.substring(0, length) + truncation;
                }
                return str;
            },

            /**
             * 주어진 문자열을 지정된 길이(바이트)만큼 자른 후, 꼬리글을 덧붙여 반환
             *
             * @param {string} value 문자열
             * @param {number} length 잘라낼 길이
             * @param {string} [truncation = '...'] 꼬리글
             * @return {string} 결과 문자열
             *
             * @example
             * vcui.string.cutByByte("동해물과", 3, "..."); // "동..."
             */
            cutByByte: function (value, length, truncation) {
                var str = value,
                    chars = this.indexByByte(value, length);

                truncation || (truncation = '');
                if (str.length > chars) {
                    return str.substring(0, chars) + truncation;
                }
                return str;
            },

            /**
             * 주어진 바이트길이에 해당하는 char index 반환(UTF-8 상에서 한글은 3바이드로 3바이트로 계산됩니다.)
             *
             * @param {string} value 문자열
             * @param {number} length 제한 문자수
             * @return {number} chars index
             * @example
             * vcui.string.indexByByte("동해물과", 3); // 2
             */
            indexByByte: function (value, length) {
                var len, i, c;
                if (typeof value !== 'string') {
                    return 0;
                }
                for (len = i = 0; c = value.charCodeAt(i++);) {
                    len += c >> 11 ? 3 : c >> 7 ? 2 : 1;
                    if (len > length) {
                        return i > 0 ? i - 1 : 0;
                    }
                }
                return i;
            },

            /**
             * 첫글자를 대문자로 변환하고 이후의 문자들은 소문자로 변환
             *
             * @param {string} value 문자열
             * @return {string} 결과 문자열
             *
             * @example
             * vcui.string.capitalize("abCdEfg"); // "Abcdefg"
             */
            capitalize: function (value) {
                return value ? value.charAt(0).toUpperCase() + value.substring(1) : value;
            },

            /**
             * 카멜 형식으로 변환
             *
             * @param {string} value 문자열
             * @return {string} 결과 문자열
             *
             * @example
             * vcui.string.capitalize("ab-cd-efg"); // "abCdEfg"
             */
            camelize: function (value) {
                return value ? value.replace(/(\-|_|\s)+(.)?/g, function (a, b, c) {
                    return (c ? c.toUpperCase() : '');
                }) : value
            },

            /**
             * 대쉬 형식으로 변환
             *
             * @param {string} value 문자열
             * @return {string} 결과 문자열
             *
             * @example
             * vcui.string.dasherize("abCdEfg"); // "ab-cd-efg"
             */
            dasherize: function (value) {
                return value ? value.replace(/[_\s]+/g, '-').replace(/([A-Z])/g, '-$1').replace(/-+/g, '-').toLowerCase() : value;
            },

            /**
             * 첫글자를 소문자로 변환
             * @param {string} value 문자열
             * @returns {string} 결과 문자열
             * @example
             * vcui.string.toFirstLower("Welcome"); // 'welcome'
             */
            toFirstLower: function (value) {
                return value ? value.substr(0, 1).toLowerCase() + value.substr(1) : value;
            },

            /**
             * 첫글자를 대문자로 변환
             * @param {string} value 문자열
             * @returns {string} 결과 문자열
             * @example
             * vcui.string.toFirstUpper("welcome"); // 'Welcome'
             */
            toFirstUpper: function (value) {
                return value ? value.substr(0, 1).toUpperCase() + value.substr(1) : value;
            },

            /**
             * 주어진 문자열을 지정한 수만큼 반복하여 조합
             *
             * @param {string} value 문자열
             * @param {number} cnt 반복 횟수
             * @return {string} 결과 문자열
             *
             * @example
             * vcui.string.repeat("ab", 4); // "abababab"
             */
            repeat: function (value, cnt, sep) {
                sep || (sep = '');
                var result = [];

                for (var i = 0; i < cnt; i++) {
                    result.push(value);
                }
                return result.join(sep);
            },

            /**
             * 특수기호를 HTML ENTITY로 변환
             *
             * @param {string} value 특수기호
             * @return {string} 결과 문자열
             *
             * @example
             * vcui.string.escapeHTML('<div><a href="#">링크</a></div>'); // "&lt;div&gt;&lt;a href=&quot;#&quot;&gt;링크&lt;/a&gt;&lt;/div&gt;"
             */
            escapeHTML: function (value) {
                return value ? (value + "").replace(escapeRegexp, function (m) {
                    return escapeChars[m];
                }) : value;
            },

            /**
             * HTML ENTITY로 변환된 문자열을 원래 기호로 변환
             *
             * @param {string} value 문자열
             * @return {string} 결과 문자열
             *
             * @example
             * vcui.string.unescapeHTML('&lt;div&gt;&lt;a href=&quot;#&quot;&gt;링크&lt;/a&gt;&lt;/div&gt;');  // '<div><a href="#">링크</a></div>'
             */
            unescapeHTML: (function () {
                //var temp = document.createElement('div');
                return function (value) {
                    var temp = document.createElement('div');
                    temp.innerHTML = value;
                    var result = '';
                    for (var i = -1, item; item = temp.childNodes[++i];) {
                        result += item.nodeValue;
                    }
                    temp = null;
                    return result;
                };
            })(),
            /*
             // 윗방식이 훨씬 퍼포먼스가 나음....
             unescapeHTML: function (value) {
             return !value ? '' : String(value).replace(unescapeRegexp, function (entityCode) {
             var match;
             if (entityCode in unescapeChars) {
             return unescapeChars[entityCode];
             } else if (match = entityCode.match(hexRegexp)) {
             return String.fromCharCode(parseInt(match[1], 16));
             } else if (match = entityCode.match(/^\&#(\d+)$/)) {
             return String.fromCharCode(~~match[1]);
             } else {
             return entityCode;
             }
             });
             },*/
            /*
             unescapeHTML: function (value) {
             return value ? (value + "").replace(unescapeRegexp, function (m) {
             return unescapeChars[m];
             }) : value;
             },*/

            /**
             * value === these이면 other를,  value !== these 이면 value를 반환
             *
             * @param {string} value 현재 상태값
             * @param {string} these 첫번째 상태값
             * @param {string} other 두번째 상태값
             * @return {string}
             *
             * @example
             * // 정렬버튼에 이용
             * vcui.string.toggle('ASC", "ASC", "DESC"); // "DESC"
             * vcui.string.toggle('DESC", "ASC", "DESC"); // "ASC"
             */
            toggle: function (value, these, other) {
                return these === value ? other : value;
            },

            /**
             * 주어진 문자열에 있는 {인덱스} 부분을 주어진 인수에 해당하는 값으로 치환 후 반환
             *
             * @param {string} format 문자열
             * @param {String|Object} ... 대체할 문자열
             * @return {string} 결과 문자열
             *
             * @example
             * vcui.string.format("{{0}}:{{1}}:{{2}} {{0}}", "a", "b", "c");  // "a:b:c a"
             * vcui.string.format("{{a}}:{{b}}:{{c}} {{d}}", {a:"a", b:"b", c:"c", d: "d"});  // "a:b:c a"
             */
            format: function (format, val) {
                var args = core.toArray(arguments).slice(1),
                    isJson = core.type(val, 'object');

                return format.replace(/\{\{([0-9a-z_]+)\}\}/ig, function (m, i) {
                    return isJson ? val[i] : args[i] || '';
                });
            },

            /**
             * 문자열을 HTML ENTITIES로 변환
             * @param value
             * @return {string}
             */
            toEntities: function (value) {
                var buffer = [];
                for (var i = 0, len = value.length; i < len; i++) {
                    buffer.push("&#", value.charCodeAt(i).toString(), ";");
                }
                return buffer.join("");
            },

            /**
             * 랜덤문자열 생성
             * @param {number} 길이
             * @return {string} 랜덤문자열
             */
            random: function (len) {
                var keystr = '', x;
                for (var i = 0; i < len; i++) {
                    x = Math.floor((Math.random() * 36));
                    if (x < 10) {
                        keystr += String(x);
                    } else {
                        keystr += String.fromCharCode(x + 87);
                    }
                }
                return keystr;
            },

            /**
             * 주어진 문자열에서 HTML를 제거
             *
             * @param {string} value 문자열
             * @return {string} 태그가 제거된 문자열
             * @example
             * vcui.string.stripTags('welcome to <b>the</b> jungle'); // 'welcome to the jungle'
             */
            stripTags: function (value) {
                return (value || '').toString().replace(tagRegexp, '');
            },

            /**
             * 주어진 문자열에서 스크립트를 제거
             *
             * @param {string} value 문자열
             * @return {string} 스크립트가 제거된 문자열
             * @example
             * vcui.string.stripScripts('welcome <s'+'cript>alert('hello');</s'+'cript> to the jungle'); // 'welcome to the jungle'
             */
            stripScripts: function (value) {
                return (value || '').toString().replace(scriptRegexp, '');
            },

            /**
             * 형식문자열을 주어진 인자값으로 치환하여 반환
             * @function
             * @name vcui.string.sprintf
             * @param {string} str 형식문자열(%d, %f, %s)
             * @param {*=} ... 형식문자열에 지정된 형식에 대치되는 값
             * @example
             * var ret = vcui.string.sprintf('%02d %s', 2, 'abc'); // => '02 abc'
             */
            sprintf: (function () {
                var re = /%%|%(?:(\d+)[\$#])?([+-])?('.|0| )?(\d*)(?:\.(\d+))?([bcdfosuxXhH])/g,
                    core = core;

                // 형식문자열을 파싱
                var s = function () {
                    var args = [].slice.call(arguments, 1);
                    var val = arguments[0];
                    var index = 0;

                    var x;
                    var ins;

                    return val.replace(re, function () {
                        if (arguments[0] == "%%") {
                            return "%";
                        }

                        x = [];
                        for (var i = 0; i < arguments.length; i++) {
                            x[i] = arguments[i] || '';
                        }
                        x[3] = x[3].slice(-1) || ' ';

                        ins = args[+x[1] ? x[1] - 1 : index++];

                        return s[x[6]](ins, x);
                    });
                };

                var pad = function (value, size, ch) {
                    var sign = value < 0 ? '-' : '',
                        result = String(Math.abs(value));

                    ch || (ch = "0");
                    size || (size = 2);

                    if (result.length >= size) {
                        return sign + result.slice(-size);
                    }

                    while (result.length < size) {
                        result = ch + result;
                    }
                    return sign + result;
                };

                // %d 처리
                s.d = s.u = function (ins, x) {
                    return pad(Number(ins).toString(0x0A), x[2] + x[4], x[3]);
                };

                // %f 처리
                s.f = function (ins, x) {
                    var ins = Number(ins);

                    if (x[5]) {
                        ins = ins.toFixed(x[5]);
                    } else if (x[4]) {
                        ins = ins.toExponential(x[4]);
                    } else {
                        ins = ins.toExponential();
                    }

                    x[2] = x[2] == "-" ? "+" : "-";
                    return pad(ins, x[2] + x[4], x[3]);
                };

                // %s 처리
                s.s = function (ins, x) {
                    return ins;
                };

                return s;
            })()

        };
    });
//core.String.bytes = core.String.byteLength;

})(window[LIB_NAME], window);


;(function (core, global, undefined) {
    var arrayProto = Array.prototype;
    var arraySlice = arrayProto.slice;
    var each = core.each;

// 네이티브에 f가 존재하지 않으면 false 반환
    function nativeCall(f) {
        return f ? function (obj) {
            return f.apply(obj, arrayProto.slice.call(arguments, 1));
        } : false;
    }

    /**
     * 배열관련 유틸함수
     * @namespace
     * @name vcui.array
     */
    core.addon('array', /** @lends vcui.array# */{
        /**
         * @deprecated use vcui.array.merge
         * 배열 병합
         * @param {array} arr 원본 배열
         * @param {...*} var_args 합칠 요소들
         * @return {array} 모두 합쳐진 배열
         * @exmaple
         * var newArray = vcui.array.append([1,2,3], [4,5,6], [6, 7, 8]); // [1,2,3,4,5,6,7,8]
         */
        append: function (arr) {
            var args = arraySlice.call(arguments),
                isUnique = args[args.length - 1] === true,
                result;

            if (isUnique) {
                args.pop();
                result = this.unique(arrayProto.concat.apply([], args));
            } else {
                result = arrayProto.concat.apply([], args);
            }
            return result;
        },

        /**
         * 배열 병합
         * @param {array} arr 원본 배열
         * @param {...*} var_args 합칠 요소들
         * @return {array} 모두 합쳐진 배열
         * @exmaple
         * var newArray = vcui.array.merge([1,2,3], [4,5,6], [6, 7, 8]); // [1,2,3,4,5,6,7,8]
         */
        merge: function () {
            var result = [], arrays = [].slice.call(arguments);
            for (var i = 0, ilen = arrays.length; i < ilen; i++) {
                if (core.isArray(arrays[i])) {
                    for (var j = 0, jlen = arrays[i].length; j < jlen; j++) {
                        result.push(arrays[i][j]);
                    }
                } else {
                    result.push(arrays[i]);
                }
            }
            return result;
        },

        /**
         * 중복되는 배열 요소 제거
         * @param {array} arr 원본 배열
         * @return {array} 중복되는 요소가 제거된 배열
         * @exmaple
         * var arr = vcui.array.unique([1,1,2,2,3,3,4,5]); // [1,2,3,4,5]
         */
        unique: function (arr, fn) {
            if (!core.isArray(arr)) {
                return arr;
            }

            var result = [], flags = [], value;
            for (var i = 0, len = arr.length; i < len; i++) {
                value = (fn && fn(arr[i])) || arr[i];
                if (this.indexOf(flags, value) < 0) {
                    flags.push(value);
                    result.push(arr[i]);
                }
            }
            value = null;
            return result;
        },

        /**
         * 설명하기 어려움 - 인터넷 참조바람
         * @function
         * @name vcui.array.reduce
         * @param {array} arr 원본 배열
         * @param {function} callback} 반복자
         * @param {*} initialValue} 초기값
         * @return {*} 초기값
         * @exmaple
         * var arr = vcui.array.reduce([1,2,3], function (prev, cur) {
         *  prev.push(cur);
         *  return prev;
         * }, {}); // [0, 1, 2, 3]
         */
        reduce: function (arr, callback, initialValue) {
            if (!core.isArray(arr)) {
                return initialValue;
            }

            if (!core.isFunction(callback)) {
                throw new TypeError(callback + ' is not a function');
            }

            var t = Object(arr), len = t.length >>> 0, k = 0, value;
            if (arguments.length === 3) {
                value = arguments[2];
            } else {
                while (k < len && !(k in t)) {
                    k++;
                }
                if (k >= len) {
                    throw new TypeError('Reduce of empty array with no initial value');
                }
                value = t[k++];
            }
            for (; k < len; k++) {
                if (k in t) {
                    value = callback(value, t[k], k, t);
                }
            }
            return value;
        },

        /**
         * 콜백함수로 하여금 요소를 가공하는 함수
         *
         * @name vcui.array.map
         * @function
         * @param {array} arr 배열
         * @param {arrayCallback} callback 콜백함수
         * @param {object} (optional) 컨텍스트
         * @return {array} 기공된 배열
         *
         * @example
         * vcui.array.map([1, 2, 3], function(item, index) {
		 *		return {age:item};
		 * })
         * // [{x:1}, {x:2}, 30]
         */
        map: function (arr, callback, ctx) {
            var results = [];

            if (!core.isFunction(callback)) {
                return results;
            }

            arr = core.toArray(arr);
            // vanilla js~
            for (var i = 0, len = arr.length; i < len; i++) {
                results[results.length] = callback.call(ctx || arr, arr[i], i, arr);
            }
            return results;
        },

        /**
         * 반복자함수의 반환값이 true가 아닐 때까지 반복
         *
         * @name vcui.array.every
         * @function
         * @param {array} arr 배열
         * @param {arrayCallback} callback 함수
         * @return {boolean} 최종 결과
         * @example
         * vcui.array.every([1, 3, 5, 7], function(val) {
         *     return val > 5;
         * });
         * // false
         *
         * vcui.array.every([1, 3, 5, 7], function(val) {
         *     return val > 0;
         * });
         * // true
         */
        every: function (arr, callback, ctx) {
            if (!core.isFunction(callback)) {
                return true;
            }

            arr = core.toArray(arr);
            for (var i = 0, len = arr.length; i < len; i++) {
                if (callback.call(ctx || arr, arr[i], i, arr) !== true) {
                    return false;
                }
            }
            return true;
        },

        /**
         * 반복자함수의 반환값이 true일 때까지 반복
         *
         * @name vcui.array.any
         * @function
         * @param {array} arr 배열
         * @param {arrayCallback} callback 함수
         * @return {boolean} 최종 결과
         * @example
         * vcui.array.any([1, 3, 5, 7], function(val) {
         *     return val < 5;
         * });
         * // true
         *
         * vcui.array.any([1, 3, 5, 7], function(val) {
         *     return val < 0;
         * });
         * // false
         */
        any: function (arr, callback, ctx) {
            if (!core.isFunction(callback)) {
                return false;
            }

            arr = core.toArray(arr);
            for (var i = 0, len = arr.length; i < len; i++) {
                if (callback.call(ctx || arr, arr[i], i, arr) === true) {
                    return true;
                }
            }
            return false;
        },

        /**
         * callback에 부합되는 요소 하나만 반환
         * @param arr
         * @param callback
         * @return {*}
         */
        filterOne: function (arr, callback, ctx) {
            if (!core.isFunction(callback)) {
                return null;
            }

            arr = core.toArray(arr);
            for (var i = 0, len = arr.length; i < len; i++) {
                if (callback.call(ctx || arr, arr[i], i, arr) === true) {
                    return arr[i];
                }
            }
            return null;
        },

        /**
         * 배열 요소의 순서를 섞어주는 함수
         *
         * @param {array} arr 배열
         * @return {array} 순서가 섞인 새로운 배열
         * @example
         * vcui.array.shuffle([1, 3, 4, 6, 7, 8]); // [6, 3, 8, 4, 1, 7]
         */
        shuffle: function (arr) {
            var rand,
                index = 0,
                shuffled = [],
                number = core.number;

            for (var i = 0, len = arr.length; i < len; i++) {
                rand = number.random(index++);
                shuffled[index - 1] = shuffled[rand];
                shuffled[rand] = arr[i];
            }
            return shuffled;
        },

        /**
         * 콜백함수로 하여금 요소를 걸려내는 함수
         * @function
         * @name vcui.array.filter
         * @param {array} arr 배열
         * @param {function(value, index)} callback 콜백함수
         * @param {*=} (optional) 컨텍스트
         * @returns {array}
         *
         * @example
         * vcui.array.filter([1, '일', 2, '이', 3, '삼'], function(item, index) {
		 *		return typeof item === 'String';
		 * });
         * // ['일','이','삼']
         */
        filter: function (arr, callback, ctx) {
            var results = [];

            if (!core.isFunction(callback)) {
                return results;
            }

            arr = core.toArray(arr);
            for (var i = 0, len = arr.length; i < len; i++) {
                callback.call(ctx || arr, arr[i], i, arr) && (results.push(arr[i]));
            }
            return results;
        },

        /**
         * 주어진 배열에 지정된 값이 존재하는지 체크
         * @function
         * @name vcui.array.include
         * @param {array} arr 배열
         * @param {*} value 찾을 값
         * @return {boolean}
         *
         * @example
         * vcui.array.include([1, '일', 2, '이', 3, '삼'], '삼');  // true
         */
        include: function (arr, value, b) {
            if (!core.type(arr, 'array')) {
                return false;
            }

            arr = core.toArray(arr);
            if (core.isFunction(value)) {
                for (var i = 0; i < arr.length; i++) {
                    if (value(arr[i], i) === true) {
                        return true;
                    }
                }
                return false;
            }
            return core.array.indexOf(arr, value, b) > -1;
        },

        /**
         * 주어진 배열에 지정된 값이 존재하는지 체크
         * @function
         * @name vcui.array.has
         * @param {array} arr 배열
         * @param {*} value 찾을 값
         * @return {boolean}
         *
         * @example
         * vcui.array.has([1, '일', 2, '이', 3, '삼'], '삼');  // true
         */
        has: function () {
            return this.include.apply(this, arguments);
        },

        /**
         * 주어진 인덱스의 요소를 반환
         * @function
         * @name vcui.array.indexOf
         * @param {array} obj 배열
         * @param {*} value 찾을 값
         * @return {number}
         *
         * @example
         * vcui.array.indexOf([1, '일', 2, '이', 3, '삼'], '일');  // 1
         */
        indexOf: function (arr, value, b) {
            for (var i = 0, len = arr.length; i < len; i++) {
                if (typeof value === 'function') {
                    if (value.apply(arr, [arr[i], i]) === true) {
                        return i;
                    }
                }

                if ((b !== false && arr[i] === value) || (b === false && arr[i] == value)) {
                    return i;
                }
            }
            return -1;
        },

        /**
         * 주어진 배열에서 index에 해당하는 요소를 삭제
         *
         * @param {array} arr 배열
         * @param {number} index 삭제할 인덱스 or 요소
         * @return {array} 지정한 요소가 삭제된 배열
         * @example
         * vcui.array.removeAt([1, 2, 3, 4], 1); // [1, 3, 4]
         */
        removeAt: function (arr, index) {
            if (!core.type(arr, 'array')) {
                return arr;
            }
            arr.splice(index, 1);
            return arr;
        },


        /**
         * 주어진 배열에서 해당하는 요소를 삭제
         *
         * @param {array} arr 배열
         * @param {*|function(value, index)} iter 요소 및 필터콜백
         * @return {array} 지정한 요소가 삭제된 배열
         * @example
         * vcui.array.remove(['a', 'b', 'c'], 'b'); // ['a', 'c']
         *
         * vcui.array.remove(['a', 'b', 'c'], function(value){
         *     return value === 'b';
         * }); // ['a', 'c']
         */
        remove: function (arr, iter) {
            if (!core.isArray(arr)) {
                return arr;
            }

            if (core.isFunction(iter)) {
                for (var i = arr.length, item; item = arr[--i];) {
                    if (iter(item, i) === true) {
                        arr = this.removeAt(arr, i);
                    }
                }
                return arr;
            } else {
                var index = this.indexOf(arr, iter);
                if (index < 0) {
                    return arr;
                }
                return this.removeAt(arr, index);
            }
        },

        /**
         * 주어진 배열에서 가장 큰 요소를 반환
         *
         * @param {array} arr 배열
         * @param {function} callback
         * @return {number} 최대값
         * @example
         * vcui.array.max([2, 1, 3, 5, 2, 8]); // 8
         * vcui.array.max([{value:1}, {value:2}], function (item) {
         *   return item.value;
         * }); // 2
         */
        max: function (arr, callback) {
            if (callback) {
                arr = core.array.map(arr, callback);
            }
            return Math.max.apply(Math, arr);
        },

        /**
         * 주어진 배열에서 가장 작은 요소를 반환
         *
         * @param {array} arr 배열
         * @param {function} callback
         * @return {number} 최소값
         * @example
         * vcui.array.min([2, 1, 3, 5, 2, 8]); // 1
         * vcui.array.max([{value:1}, {value:2}], function (item) {
         *   return item.value;
         * }); // 1
         */
        min: function (arr, callback) {
            if (callback) {
                arr = core.array.map(arr, callback);
            }
            return Math.min.apply(Math, arr);
        },

        /**
         * 배열의 요소를 역순으로 재배치
         *
         * @name reverse
         * @param {array} arr 배열
         * @return {array} 역순으로 정렬된 새로운 배열
         * @example
         * vcui.array.reverse([1, 2, 3]); // [3, 2, 1]
         */
        reverse: function (arr) {
            var tmp = null, first, last;
            var length = arr.length;

            for (first = 0, last = length - 1; first < length / 2; first++, last--) {
                tmp = arr[first];
                arr[first] = arr[last];
                arr[last] = tmp;
            }

            return arr;
        },

        /**
         * 두 배열의 차집합을 반환
         * @param {array} arr1 배열1
         * @param {array} arr2 배열2
         * @returns {array} 차집합 배열
         * @example
         * vcui.array.different([1, 2, 3, 4, 5], [3, 4, 5, 6, 7]); // [1, 2, 6, 7]
         */
        different: function (arr1, arr2) {
            var newArr = [], iof = core.array.indexOf;
            core.each(arr1, function (value) {
                if (iof(arr2, value) < 0) {
                    newArr.push(value);
                }
            });

            core.each(arr2, function (value) {
                if (iof(arr1, value) < 0) {
                    newArr.push(value);
                }
            });
            return newArr;
        },

        /**
         * 배열요소들의 합을 반환
         * @param {array} arr
         * @return {number}
         */
        sum: function (arr) {
            var total = 0;
            for (var i = 0, len = arr.length; i < len; i++) {
                total += (arr[i] | 0);
            }
            return total;
        }
    });

})(window[LIB_NAME], window);


;(function (core, global, undefined) {
    /**
     * 날짜관련 유틸함수
     * @namespace
     * @name vcui.date
     */
    core.addon('date', function () {
        var months = "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
            fullMonths = "January,Febrary,March,April,May,June,July,Augst,September,October,November,December".split(",");


        function compare(d1, d2) {
            if (!(d1 instanceof Date)) {
                d1 = core.date.parse(d1);
            }
            if (!(d2 instanceof Date)) {
                d2 = core.date.parse(d2);
            }

            return d1.getTime() > d2.getTime() ? -1 : (d1.getTime() === d2.getTime() ? 0 : 1);
        }

        return /** @lends vcui.date */{
            MONTHS_NAME: months,
            MONTHS_FULLNAME: fullMonths,
            FORMAT: 'yyyy-MM-dd',

            /**
             * 날짜형식을 지정한 포맷의 문자열로 변환
             *
             * @param {date} formatDate
             * @param {string} formatString} 포맷 문자열
             * @return {string} 변환된 문자열
             *
             * @example
             * // ex) 2015-04-07 15:03:45
             * // yyyy: 2015
             * // yy: 15
             * // M: 4
             * // MM: 04
             * // MMM: Apr
             * // MMMMM: April
             * // d: 7
             * // dd: 07
             * // h: 15
             * // hh: 15
             * // H: 3
             * // m: 3
             * // mm: 03
             * // s: 45
             * // ss: 45
             * // x: PM
             *
             * vcui.date.format(new Date(), "yy/MM/dd");
             * // '15/01/05'
             */
            format: function (formatDate, formatString) {
                if (formatDate === '' || formatDate === null) return '';
                formatString || (formatString = this.FORMAT);
                if (core.type(formatDate, 'number')) {
                    formatDate = new Date(formatDate);
                } else if (core.type(formatDate, 'string')) {
                    formatDate = this.parse(formatDate);
                }
                if (formatDate instanceof Date) {
                    var yyyy = formatDate.getFullYear(),
                        yy = yyyy.toString().substring(2),
                        M = formatDate.getMonth() + 1,
                        MM = M < 10 ? "0" + M : M,
                        MMM = this.MONTHS_NAME[M - 1],
                        MMMM = this.MONTHS_FULLNAME[M - 1],
                        d = formatDate.getDate(),
                        dd = d < 10 ? "0" + d : d,
                        h = formatDate.getHours(),
                        hh = h < 10 ? "0" + h : h,
                        m = formatDate.getMinutes(),
                        mm = m < 10 ? "0" + m : m,
                        s = formatDate.getSeconds(),
                        ss = s < 10 ? "0" + s : s,
                        x = h > 11 ? "PM" : "AM",
                        H = h % 12;

                    if (H === 0) {
                        H = 12;
                    }
                    return formatString.replace(/yyyy/g, yyyy)
                        .replace(/yy/g, yy)
                        .replace(/MMMM/g, MMMM)
                        .replace(/MMM/g, MMM)
                        .replace(/MM/g, MM)
                        .replace(/M/g, M)
                        .replace(/dd/g, dd)
                        .replace(/d/g, d)
                        .replace(/hh/g, hh)
                        .replace(/h/g, h)
                        .replace(/mm/g, mm)
                        .replace(/m/g, m)
                        .replace(/ss/g, ss)
                        .replace(/s/g, s)
                        .replace(/!!!!/g, MMMM)
                        .replace(/!!!/g, MMM)
                        .replace(/H/g, H)
                        .replace(/x/g, x);
                } else {
                    return "";
                }
            },

            /**
             * 주어진 날자가 유효한지 체크
             * @param {string} date 날짜 문자열
             * @returns {boolean} 유효한 날자인지 여부
             * @example
             * vcui.date.isValid('2014-13-23'); // false
             * vcui.date.isValid('2014-11-23'); // true
             */
            isValid: function (date) {
                try {
                    return !isNaN(this.parse(date).getTime());
                } catch (e) {
                    return false;
                }
            },

            /**
             * date가 start와 end사이인지 여부
             *
             * @param {date} date 날짜
             * @param {date} start 시작일시
             * @param {date} end 만료일시
             * @return {boolean} 두날짜 사이에 있는지 여부
             * @example
             * vcui.date.between('2014-09-12', '2014-09-11', '2014=09-12'); // true
             * vcui.date.between('2014-09-12', '2014-09-11', '2014=09-11') // false
             */
            between: function (date, start, end) {
                if (!date.getDate) {
                    date = core.date.parse(date);
                }
                if (!start.getDate) {
                    start = core.date.parse(start);
                }
                if (!end.getDate) {
                    end = core.date.parse(end);
                }
                return date.getTime() >= start.getTime() && date.getTime() <= end.getTime();
            },

            /**
             * 날짜 비교
             *
             * @function
             * @name vcui.date.compare
             * @param {date} date1 날짜1
             * @param {date} date2 날짜2
             * @return {number} -1: date1가 이후, 0: 동일, 1:date2가 이후
             * @example
             * var d1 = new Date(2014, 11, 23);
             * var d2 = new Date(2014, 09, 23);
             *
             * vcui.date.compare(d1, d2); // -1
             * vcui.date.compare(d1, d1); // 0
             * vcui.date.compare(d2, d1); // 1
             */
            compare: compare,

            /**
             * 년월일이 동일한가
             *
             * @param {date|String} date1 날짜1
             * @param {date|String} date2 날짜2
             * @return {boolean} 두 날짜의 년월일이 동일한지 여부
             * @example
             * vcui.date.equalsYMD('2014-12-23 11:12:23', '2014-12-23 09:00:21'); // true
             */
            equalsYMD: function (a, b) {
                var ret = true;
                if (!a || !b) {
                    return false;
                }
                if (!a.getDate) {
                    a = this.parse(a);
                }
                if (!b.getDate) {
                    b = this.parse(b);
                }
                core.each(['getFullYear', 'getMonth', 'getDate'], function (fn) {
                    ret = ret && (a[fn]() === b[fn]());
                    if (!ret) {
                        return false;
                    }
                });
                return ret;
            },


            /**
             * 주어진 날짜를 기준으로 type만큼 가감된 날짜를 format형태로 반환
             * @param {date} date 기준날짜
             * @param {string} type -2d, -3d, 4M, 2y ..
             * @param {string} format 포맷
             * @returns {date|String} format지정값에 따라 결과를 날짜형 또는 문자열로 변환해서 반환
             * @example
             * vcui.date.calcDate('2014-12-23', '-3m'); // 2014-09-23(Date)
             * vcui.date.calcDate('2014-12-23', '-3m', 'yyyy/MM/dd'); // '2014/09/23'(String)
             *
             * vcui.date.calcDate('2014-12-23', '-10d'); // 2014-12-13(Date)
             */
            calcDate: function (date, type, format) {
                date = this.parse(date);
                if (!date) {
                    return null;
                }

                var m = type.match(/([-+]*)([0-9]*)([a-z]+)/i),
                    g = m[1] === '-' ? -1 : 1,
                    d = (m[2] | 0) * g;

                switch (m[3]) {
                    case 'd':
                        date.setDate(date.getDate() + d);
                        break;
                    case 'w':
                        date.setDate(date.getDate() + (d * 7));
                        break;
                    case 'M':
                        date.setMonth(date.getMonth() + d);
                        break;
                    case 'y':
                        date.setFullYear(date.getFullYear() + d);
                        break;
                }
                if (format) {
                    return this.format(date, format === 'format' ? this.FORMAT : format);
                }
                return date;
            },

            calc: function () {
                return this.calcDate.apply(this, [].slice.call(arguments));
            },

            /**
             * 주어진 날짜 형식의 문자열을 Date객체로 변환
             *
             * @function
             * @name vcui.date.parse
             * @param {string} dateStringInRange 날짜 형식의 문자열
             * @return {date} 주어진 날짜문자열을 파싱한 값을 Date형으로 반환
             * @example
             * vcui.date.parse('2014-11-12');
             * // Wed Nov 12 2014 00:00:00 GMT+0900 (대한민국 표준시)
             *
             * vcui.date.parse('20141112');
             * // Wed Nov 12 2014 00:00:00 GMT+0900 (대한민국 표준시)
             */
            parse: (function () {
                var isoExp = /^\s*(\d{4})(\d{2})(\d{2})(\d{2})?(\d{2})?(\d{2})?\s*$/;
                return function (dateStringInRange) {
                    var date, month, parts;

                    if (dateStringInRange instanceof Date) {
                        return core.clone(dateStringInRange);
                    }

                    dateStringInRange = (dateStringInRange + '').replace(/[^\d]+/g, '');
                    if (dateStringInRange.length !== 8 && dateStringInRange.length !== 14) {
                        return new Date(NaN);
                    }
                    if (dateStringInRange.length === 14) {
                        date = new Date(dateStringInRange.substr(0, 4) | 0,
                            (dateStringInRange.substr(4, 2) | 0) - 1,
                            dateStringInRange.substr(6, 2) | 0,
                            dateStringInRange.substr(8, 2) | 0,
                            dateStringInRange.substr(10, 2) | 0,
                            dateStringInRange.substr(12, 2) | 0
                        );
                        if (!isNaN(date)) {
                            return date;
                        }
                    }
                    date = new Date(dateStringInRange);
                    if (!isNaN(date)) {
                        return date;
                    }

                    date = new Date(NaN);
                    parts = isoExp.exec(dateStringInRange);

                    if (parts) {
                        month = +parts[2];
                        date.setFullYear(parts[1] | 0, month - 1, parts[3] | 0);
                        date.setHours(parts[4] | 0);
                        date.setMinutes(parts[5] | 0);
                        date.setSeconds(parts[6] | 0);
                        if (month != date.getMonth() + 1) {
                            date.setTime(NaN);
                        }
                        return date;
                    }
                    return date;
                };
            })(),

            /**
             * 두 날짜의 월 간격
             * @param {date} d1 날짜 1
             * @param {date} d2 날짜 2
             * @return {number} 두날짜의 월차
             * vcui.date.monthDiff('2011-02-12', '2014-11-23'); // 44
             */
            monthDiff: function (d1, d2) {
                d1 = this.parse(d1);
                d2 = this.parse(d2);

                var months;
                months = (d2.getFullYear() - d1.getFullYear()) * 12;
                months -= d1.getMonth();
                months += d2.getMonth();
                return months;
            },

            /**
             * 주어진 년월의 일수를 반환
             *
             * @param {number} year 년도
             * @param {number} month 월
             * @return {date} 주어진 년월이 마지막 날짜
             * @example
             * vcui.date.daysInMonth(2014, 2); // 28
             */
            daysInMonth: function (year, month) {
                var dd = new Date(year | 0, month | 0, 0);
                return dd.getDate();
            },

            /**
             * 밀리초를 시,분,초로 변환
             * @param amount 밀리초값
             * @return {object} dates 변환된 시간 값
             * @return {number} dates.days 일 수
             * @return {number} dates.hours 시간 수
             * @return {number} dates.mins 분 수
             * @return {number} dates.secs 초 수
             * @example
             * vcui.date.splits(2134000);
             * // {days: 0, hours: 0, mins: 35, secs: 34}
             */
            splits: function (amount) {
                var days, hours, mins, secs;

                amount = amount / 1000;
                days = Math.floor(amount / 86400), amount = amount % 86400;
                hours = Math.floor(amount / 3600), amount = amount % 3600;
                mins = Math.floor(amount / 60), amount = amount % 60;
                secs = Math.floor(amount);

                return {
                    days: days,
                    hours: hours,
                    mins: mins,
                    secs: secs
                };
            },

            /**
             * 주어진 두 날짜의 간견을 시, 분, 초로 반환
             *
             * @param {date} t1 기준 시간
             * @param {date} t2 비교할 시간
             * @return {object} dates 시간차 값들이 들어있는 객체
             * @return {number} dates.ms 밀리초
             * @return {number} dates.secs 초
             * @return {number} dates.mins 분
             * @return {number} dates.hours 시
             * @return {number} dates.days 일
             * @return {number} dates.weeks 주
             * @return {number} dates.diff
             *
             * @example
             * vcui.date.diff(new Date, new Date(new Date() - 51811));
             * // {ms: 811, secs: 51, mins: 0, hours: 0, days: 0, weeks: 0, diff: 51811}
             */
            diff: function (t1, t2) {
                if (!core.type(t1, 'date')) {
                    t1 = new Date(t1);
                }

                if (!core.type(t2, 'date')) {
                    t2 = new Date(t2);
                }

                var diff = t1.getTime() - t2.getTime(),
                    ddiff = diff;

                diff = Math.abs(diff);

                var ms = diff % 1000;
                diff /= 1000;

                var s = Math.floor(diff % 60);
                diff /= 60;

                var m = Math.floor(diff % 60);
                diff /= 60;

                var h = Math.floor(diff % 24);
                diff /= 24;

                var d = Math.floor(diff);

                var w = Math.floor(diff / 7);

                return {
                    ms: ms,
                    secs: s,
                    mins: m,
                    hours: h,
                    days: d,
                    weeks: w,
                    diff: ddiff
                };
            },

            /**
             * 주어진 날짜가 몇번째 주인가
             * @function
             * @param {date} date 날짜
             * @return {number}
             * @example
             * vcui.date.weekOfYear(new Date); // 2 // 2015-01-05를 기준으로 했을 때
             */
            weekOfYear: (function () {
                var ms1d = 1000 * 60 * 60 * 24,
                    ms7d = 7 * ms1d;

                return function (date) {
                    var DC3 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 3) / ms1d,
                        AWN = Math.floor(DC3 / 7),
                        Wyr = new Date(AWN * ms7d).getUTCFullYear();

                    return AWN - Math.floor(Date.UTC(Wyr, 0, 7) / ms7d) + 1;
                };
            }()),

            /**
             * 윤년인가
             * @param {number} y 년도
             * @return {boolean}
             * @example
             * vcui.date.isLeapYear(2014); // false
             */
            isLeapYear: function (y) {
                if (toString.call(y) === '[object Date]') {
                    y = y.getUTCFullYear();
                }
                return (( y % 4 === 0 ) && ( y % 100 !== 0 )) || ( y % 400 === 0 );
            },

            /**
             * 날짜 가감함수
             * @param {date} date 날짜
             * @param {string} interval 가감타입(ms, s, m, h, d, M, y)
             * @param {number} value 가감 크기
             * @return {date} 가감된 날짜의 Date객체
             * @example
             * // 2014-06-10에서 y(년도)를 -4 한 값을 계산
             * var d = vcui.date.add(new Date(2014, 5, 10), 'y', -4); // 2010-06-10
             */
            add: function (date, interval, value) {
                var d = new Date(date.getTime());
                if (!interval || value === 0) {
                    return d;
                }

                switch (interval) {
                    case "ms":
                        d.setMilliseconds(d.getMilliseconds() + value);
                        break;
                    case "s":
                        d.setSeconds(d.getSeconds() + value);
                        break;
                    case "m":
                        d.setMinutes(d.getMinutes() + value);
                        break;
                    case "h":
                        d.setHours(d.getHours() + value);
                        break;
                    case "d":
                        d.setDate(d.getDate() + value);
                        break;
                    case "M":
                        d.setMonth(d.getMonth() + value);
                        break;
                    case "y":
                        d.setFullYear(d.getFullYear() + value);
                        break;
                }
                return d;
            },

            /**
             * 주어진 두 날짜 중에서 큰값 반환
             * @param {date} a
             * @param {date} b
             * @return {date}
             */
            max: function (a, b) {
                return new Date(Math.max(this.parse(a), this.parse(b)));
            },

            /**
             * 주어진 두 날짜 중에서 작은값 반환
             * @param {date} a
             * @param {date} b
             * @return {date}
             */
            min: function (a, b) {
                return new Date(Math.min(this.parse(a), this.parse(b)));
            },

            /**
             * 시분초 normalize화 처리
             * @param {number} h 시
             * @param {number} M 분
             * @param {number} s 초
             * @param {number} ms 밀리초
             * @return {object} dates 시간정보가 담긴 객체
             * @return {number} dates.day 일
             * @return {number} dates.hour 시
             * @return {number} dates.min 분
             * @return {number} dates.sec 초
             * @return {number} dates.ms 밀리초
             * @example
             * vcui.date.normalize(0, 0, 120, 0) // {day:0, hour: 0, min: 2, sec: 0, ms: 0} // 즉, 120초가 2분으로 변환
             */
            normalize: function (h, M, s, ms) {
                h = h || 0;
                M = M || 0;
                s = s || 0;
                ms = ms || 0;

                var d = 0;

                if (ms > 1000) {
                    s += Math.floor(ms / 1000);
                    ms = ms % 1000;
                }

                if (s > 60) {
                    M += Math.floor(s / 60);
                    s = s % 60;
                }

                if (M > 60) {
                    h += Math.floor(M / 60);
                    M = M % 60;
                }

                if (h > 24) {
                    d += Math.floor(h / 24);
                    h = h % 24;
                }

                return {
                    day: d,
                    hour: h,
                    min: M,
                    sec: s,
                    ms: ms
                }
            }
        };
    });
})(window[LIB_NAME], window);

;(function (core, global, undefined) {
    /**
     * JSON객체 관련 유틸함수
     * @namespace
     * @name vcui.object
     */
    core.addon('object', /** @lends vcui.object */{

        /**
         * 개체의 열거가능한 속성 및 메서드 이름을 배열로 반환
         * @name vcui.object.keys
         * @function
         * @param {object} obj 리터럴 객체
         * @return {array} 객체의 열거가능한 속성의 이름이 포함된 배열
         *
         * @example
         * vcui.object.keys({"name": "Axl rose", "age": 50}); // ["name", "age"]
         */
        keys: Object.keys || function (obj) {
            var results = [];
            each(obj, function (v, k) {
                results.push(k);
            });
            return results;
        },

        /**
         * 개체의 열거가능한 속성의 값을 배열로 반환
         * @function
         * @name vcui.object.values
         * @param {object} obj 리터럴 객체
         * @return {array} 객체의 열거가능한 속성의 값들이 포함된 배열
         *
         * @example
         * vcui.object.values({"name": "Axl rose", "age": 50}); // ["Axl rose", 50]
         */
        values: Object.values || function (obj) {
            var results = [];
            each(obj, function (v) {
                results.push(v);
            });
            return results;
        },

        /**
         * 콜백함수로 바탕으로 각 요소를 가공하는 함수
         *
         * @param {object} obj 객체
         * @param {function(value, index)} callback 콜백함수
         * @return {object}
         *
         * @example
         * vcui.object.map({1; 'one', 2: 'two', 3: 'three'}, function(item, key) {
		 *		return item + '__';
		 * });
         * // {1: 'one__', 2: 'two__', 3: 'three__'}
         */
        map: function (obj, callback) {
            if (!core.type(obj, 'object') || !core.type(callback, 'function')) {
                return obj;
            }
            var results = {};
            core.each(obj, function (v, k) {
                results[k] = callback(obj[k], k, obj);
            });
            return results;
        },

        /**
         * 요소가 있는 json객체인지 체크
         *
         * @param {object} obj json객체
         * @return {boolean} 요소가 하나라도 있는지 여부
         * @example
         * var obj1 = {};
         * var obj2 = {"a": "A"}
         * vcui.object.hasItems(obj1); // false
         * vcui.object.hasItems(obj2); // true
         */
        hasItems: function (obj) {
            if (!core.type(obj, 'object')) {
                return false;
            }

            var has = false;
            core.each(obj, function (v) {
                return has = true, false;
            });
            return has;
        },


        /**
         * 객체를 쿼리스크링으로 변환
         *
         * @param {object} obj json객체
         * @param {boolean} [isEncode = true] URL 인코딩할지 여부
         * @return {string} 결과 문자열
         *
         * @example
         * vcui.object.toQueryString({"a":1, "b": 2, "c": {"d": 4}}); // "a=1&b=2&c[d]=4"
         */
        toQueryString: function (params, isEncode) {
            if (typeof params === 'string') {
                return params;
            }
            var queryString = '',
                encode = isEncode === false ? function (v) {
                    return v;
                } : encodeURIComponent;

            core.each(params, function (value, key) {
                if (typeof (value) === 'object') {
                    core.each(value, function (innerValue, innerKey) {
                        if (queryString !== '') {
                            queryString += '&';
                        }
                        queryString += encode(key) + '[' + encode(innerKey) + ']=' + encode(innerValue);
                    });
                } else if (typeof (value) !== 'undefined') {
                    if (queryString !== '') {
                        queryString += '&';
                    }
                    queryString += encode(key) + '=' + encode(value);
                }
            });
            return queryString;
        },

        /**
         * 주어진 json를 키와 요소를 맞바꿔주는 함수
         *
         * @param {object} obj 배열
         * @return {object}
         *
         * @example
         * vcui.object.travere({1:'a', 2:'b', 3:'c', 4:'d'});
         * // {a:1, b:2, c:3, d:4}
         */
        traverse: function (obj) {
            var result = {};
            core.each(obj, function (item, index) {
                result[item] = index;
            });
            return result;
        },

        /**
         * 주어진 리터럴에서 key에 해당하는 요소를 삭제
         *
         * @param {object} value 리터럴
         * @param {string} key 삭제할 키
         * @return 지정한 요소가 삭제된 리터럴
         * @example
         * var obj = {"a": "A", "b": "B"}
         * vcui.object.remove(obj, 'b'); // {"a":"A"} // delete obj.b;로 하는게 더 낫겠네..ㅎ
         */
        remove: function (value, key) {
            if (!core.type(value, 'object')) {
                return value;
            }
            value[key] = null;
            delete value[key];
            return value;
        },

        /**
         * json를 문자열로 변환(JSON을 지원하는 브라우저에서는 JSON.stringify를 사용한다.)
         * @name vcui.object.stringify
         * @param {object} val json 객체
         * @param {object} [opts]
         * @param {boolean} [opts.singleQuotes = false] 문자열을 '로 감쌀것인가
         * @param {string} [opts.indent = '']  들여쓰기 문자(\t or 스페이스)
         * @param {string} [opts.nr = ''] 줄바꿈 문자(\n or 스페이스)
         * @param {string} [pad = ''] 기호와 문자간의 간격
         * @return {string}
         * @example
         * vcui.object.stringify({"a": "A"
         */
        stringify: global.JSON ? JSON.stringify : function (val, opts, pad) {
            var cache = [];
            return (function stringify(val, opts, pad) {
                var objKeys;
                opts = core.extend({}, {
                    singleQuotes: false,
                    indent: '', // '\t'
                    nr: '' // '\n'
                }, opts);
                pad = pad || '';

                if (typeof val === 'number' ||
                    typeof val === 'boolean' ||
                    val === null ||
                    val === undefined) {
                    return val;
                }

                if (typeof val === 'string') {
                    return '"' + val + '"';
                }

                if (val instanceof Date) {
                    return "new Date('" + val.toISOString() + "')";
                }

                if ($.isArray(val)) {
                    if (core.isEmpty(val)) {
                        return '[]';
                    }

                    return '[' + opts.nr + core.array.map(val, function (el, i) {
                        var eol = val.length - 1 === i ? opts.nr : ', ' + opts.nr;
                        return pad + opts.indent + stringify(el, opts, pad + opts.indent) + eol;
                    }).join('') + pad + ']';
                }

                if (core.isPlainObject(val)) {
                    if (core.array.indexOf(cache, val) !== -1) {
                        return null;
                    }

                    if (core.isEmpty(val)) {
                        return '{}';
                    }

                    cache.push(val);

                    objKeys = core.object.keys(val);

                    return '{' + opts.nr + core.array.map(objKeys, function (el, i) {
                        var eol = objKeys.length - 1 === i ? opts.nr : ', ' + opts.nr;
                        var key = /^[^a-z_]|\W+/ig.test(el) && el[0] !== '$' ? stringify(el, opts) : el;
                        return pad + opts.indent + '"' + key + '": ' + stringify(val[el], opts, pad + opts.indent) + eol;
                    }).join('') + pad + '}';
                }

                if (opts.singleQuotes === false) {
                    return '"' + (val + '').replace(/"/g, '\\\"') + '"';
                } else {
                    return "'" + (val + '').replace(/'/g, "\\\'") + "'";
                }
            })(val, opts, pad);
        }
    });
    core.object.has = core.object.hasItems;
    core.json = core.object;

})(window[LIB_NAME], window);


;(function ($, core, global, undefined) {
    "use strict";
    /**
     * 수학 유틸함수들이 들어있는 객체이다.
     * @namespace
     * @name vcui.math
     */
    core.addon('math', /** @lends vcui.math */{
        /**
         * 두 포인터간의 각도 계산
         * @param {{x: (*|Number), y: (*|Number)}} startPoint 시작점
         * @param {{x: (*|Number), y: (*|Number)}} endPoint 끝점
         * @return {number} 각도
         */
        getAngle: function (startPoint, endPoint) {
            var x = startPoint.x - endPoint.x;
            var y = endPoint.y - startPoint.y;
            var r = Math.atan2(y, x); //radians
            var angle = Math.round(r * 180 / Math.PI); //degrees

            if (angle < 0) {
                angle = 360 - Math.abs(angle);
            }

            return angle;
        },

        /**
         * 두 포인터의 간격을 계산
         * @param {{x: (*|Number), y: (*|Number)}} a
         * @param {{x: (*|Number), y: (*|Number)}} b
         * @return {{x: Number, y: Number}}
         */
        getDiff: function (a, b) {
            return {
                x: a.x - b.x,
                y: a.y - b.y
            };
        },

        /**
         * 시작점과 끝점을 비교해서 이동한 방향을 반환
         * @param {{x: (*|Number), y: (*|Number)}} startPoint 시작점
         * @param {{x: (*|Number), y: (*|Number)}} endPoint 끝점
         * @param {string} direction
         * @returns {string} left, right, down, up
         */
        getDirection: function (startPoint, endPoint, direction) {
            var angle,
                isHoriz = !direction || direction === 'horizontal' || direction === 'both',
                isVert = !direction || direction === 'vertical' || direction === 'both';

            if (isHoriz != isVert) {
                if (isHoriz) {
                    if (startPoint.x > endPoint.x) {
                        return 'left';
                    }
                    else if (startPoint.x == endPoint.x) {
                        return '';
                    }
                    else {
                        return 'right';
                    }
                } else {
                    if (startPoint.y > endPoint.y) {
                        return 'down';
                    }
                    else if (startPoint.y == endPoint.y) {
                        return '';
                    }
                    else {
                        return 'up';
                    }
                }
            }

            angle = this.getAngle(startPoint, endPoint);
            if ((angle <= 45) && (angle >= 0)) {
                return 'left';
            } else if ((angle <= 360) && (angle >= 315)) {
                return 'left';
            } else if ((angle >= 135) && (angle <= 225)) {
                return 'right';
            } else if ((angle > 45) && (angle < 135)) {
                return 'down';
            } else {
                return 'up';
            }
        },

        /**
         * 평균
         * @param arr
         * @returns {number}
         */
        average: function (arr) {
            return this.sum(arr) / arr.length;
        },

        /**
         * 경사
         * @param x
         * @param y
         * @returns {number}
         */
        slope: function (x, y) {
            return (y[1] - x[1]) / (y[0] - x[0]);
        },

        /**
         * 배열요소들의 합계 구하기
         * @param arr
         * @returns {number}
         */
        sum: function (arr, fn) {
            var val = 0;
            for (var i = 0, len = arr.length; i < len; i++)
                val += (fn ? fn(arr[i], i, arr) : (arr[i] - 0));
            return val;
        }
    })
})(jQuery, window[LIB_NAME], window);


;(function (core, global, undefined) {

    /**
     * @namespace
     * @name vcui.uri
     */
    core.addon('uri', /** @lends vcui.uri */{
        /**
         * 현재 페이지의 호스트주소를 반환
         * @returns {string}
         * @example
         * alert(vcui.uri.getHost());
         */
        getHost: function () {
            var loc = document.location;
            return loc.protocol + '//' + loc.host;
        },
        /**
         * 현재 url 반환(쿼리스트링, # 제외)
         * @returns {string}
         * @example
         * alert(vcui.uri.getPageUrl());
         */
        getPageUrl: function () {
            var loc = document.location;
            return loc.protocol + '//' + loc.host + loc.pathname;
        },

        /**
         * 주어진 url에 쿼리스츠링을 조합
         *
         * @param {string} url
         * @param {String:Object} String
         * @return {string}
         *
         * @example
         * vcui.uri.addParam("board.do", {"a":1, "b": 2, "c": {"d": 4}}); // "board.do?a=1&b=2&c[d]=4"
         * vcui.uri.addParam("board.do?id=123", {"a":1, "b": 2, "c": {"d": 4}}); // "board.do?id=123&a=1&b=2&c[d]=4"
         */
        addParam: function (url, string) {
            if (core.type(string, 'object')) {
                string = core.object.toQueryString(string);
            }
            if (!core.isEmpty(string)) {
                return url + (url.indexOf('?') === -1 ? '?' : '&') + string;
            }

            return url;
        },


        updateQueryParam: function(uri, key, value) {

            var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
            var separator = uri.indexOf('?') !== -1 ? "&" : "?";
            if (uri.match(re)) {
                return uri.replace(re, '$1' + key + "=" + value + '$2');
            } else {
                return uri + separator + key + "=" + value;
            }
        },

        /**
         * 쿼리스트링을 객체로 변환
         *
         * @param {string} query 쿼리스트링 문자열
         * @return {object}
         *
         * @example
         * vcui.uri.parseQuery("a=1&b=2"); // {"a": 1, "b": 2}
         */
        parseQuery: function (query) {
            if (!query) {
                return {};
            }
            if (query.length > 0 && query.charAt(0) === '?') {
                query = query.substr(1);
            }

            var params = (query + '').split('&'),
                obj = {},
                params_length = params.length,
                tmp = '',
                i;

            for (i = 0; i < params_length; i++) {
                tmp = params[i].split('=');
                obj[decodeURIComponent(tmp[0])] = decodeURIComponent(tmp[1]).replace(/[+]/g, ' ');
            }
            return obj;
        },

        /**
         * url를 파싱하여 host, port, protocol 등을 추출
         *
         * @function
         * @param {string} str url 문자열
         * @return {object}
         *
         * @example
         * vcui.uri.parseUrl("http://www.vcui.com:8080/list.do?a=1&b=2#comment");
         * // {scheme: "http", host: "www.vcui.com", port: "8080", path: "/list.do", query: "a=1&b=2"…}
         */
        parseUrl: (function () {
            var o = {
                strictMode: false,
                key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
                q: {
                    name: "queryKey",
                    parser: /(?:^|&)([^&=]*)=?([^&]*)/g
                },
                parser: {
                    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                    loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
                }
            };

            return function (str) {
                if (str.length > 2 && str[0] === '/' && str[1] === '/') {
                    str = context.location.protocol + str;
                }
                var m = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
                    uri = {}, i = 14;
                while (i--) {
                    uri[o.key[i]] = m[i] || "";
                }
                return uri;
            };
        })(),

        /**
         * 주어진 url에서 해쉬문자열 제거
         *
         * @param {string} url url 문자열
         * @return {string} 결과 문자열
         *
         * @example
         * vcui.uri.removeHash("list.do#comment"); // "list.do"
         */
        removeHash: function (url) {
            return url ? url.replace(/#.*$/, '') : url;
        },

        /**
         * name에 대한 url 파라미터 값 반환
         * @param name
         * @returns {*}
         */
        getParam: function (name) {
            if (this.currentSearch === location.search && this.params && (name in this.params)) {
                return this.params[name];
            }
            this.currentSearch = location.search;

            var search = location.search;
            if (!search || search.indexOf(name) < 0) {
                return '';
            }

            this.params = this.parseQuery(search);
            return this.params[name] || '';
        }
    });

})(window[LIB_NAME], window);


;(function (core, global, undefined) {
    var doc = global.document;

    /**
     * css3관련 유틸함수들이 들어있는 객체이다.
     * @namespace
     * @name vcui.css3
     */
    core.addon('css3', function () {

        var _tmpDiv = core.tmpNode,
            _prefixes = ['Webkit', 'Moz', 'O', 'ms', ''],
            _style = _tmpDiv.style,
            _noReg = /^([0-9]+)[px]+$/,
            _vendor = (function () {
                var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
                    transform,
                    i = 0,
                    l = vendors.length;

                for (; i < l; i++) {
                    if (vendors[i] + 'ransitionDuration' in _style && vendors[i] + 'ransform' in _style) {
                        return vendors[i].substr(0, vendors[i].length - 1);
                    }
                }

                return false;
            })(),
            string = core.string;

        function prefixStyle(name, isHyppen) {
            if (_vendor === false) return isHyppen ? name.toLowerCase() : name;
            if (_vendor === '') return isHyppen ? name.toLowerCase() : name;
            if (isHyppen) {
                return '-' + _vendor.toLowerCase() + '-' + name[0].toLowerCase() + string.dasherize(name.substr(1));
            }
            return _vendor + string.capitalize(name);
        }

        return /** @lends vcui.css3 */{
            /**
             * css3 지원여부
             * @var {boolean}
             * @example
             * if(vcui.css3.support) {
             * // css3 지원
             * }
             */
            support: _vendor !== false,
            /**
             * 3d style 지원여부
             * @var {boolean}
             * @example
             * if(vcui.css3.support3D) {
             * // 3d css3 지원
             * }
             */
            support3D: (function () {
                return false; // 자주 사용하지 않을 것 같아서 임시로 뺌
                /*var body = doc.body,
                    docEl = doc.documentElement,
                    docOverflow;
                if (!body) {
                    body = doc.createElement('body');
                    body.fake = true;
                    body.style.background = '';
                    body.style.overflow = 'hidden';
                    body.style.padding = '0 0 0 0';
                    docEl.appendChild(body);
                }
                docOverflow = docEl.style.overflow;
                docEl.style.overflow = 'hidden';

                var parent = doc.createElement('div'),
                    div = doc.createElement('div'),
                    cssTranslate3dSupported;

                div.style.position = 'absolute';
                parent.appendChild(div);
                body.appendChild(parent);

                div.style[prefixStyle('transform')] = 'translate3d(20px, 0, 0)';
                cssTranslate3dSupported = ($(div).position().left - div.offsetLeft == 20);
                if (body.fake) {
                    body.parentNode.removeChild(body);
                    docEl.offsetHeight;
                    body = null;
                } else {
                    parent.parentNode.removeChild(parent);
                }
                docEl.style.overflow = docOverflow;
                return cssTranslate3dSupported;*/
            })(),

            /**
             * 현재 브라우저의 css prefix명 (webkit or Moz or ms or O)
             * @var {string}
             * @example
             * $('div').css(vcui.css.vender+'Transform', 'translate(10px 0)');
             */
            vendor: _vendor,
            /**
             * 주어진 css속성을 지원하는지 체크
             *
             * @param {string} cssName 체크하고자 하는 css명
             * @return {boolean} 지원여부
             * @example
             * if(vcui.css3.has('transform')) { ...
             */
            has: function (name) {
                var a = _prefixes.length;
                if (name in _style) {
                    return true;
                }
                name = string.capitalize(name);
                while (a--) {
                    if (_prefixes[a] + name in _style) {
                        return true;
                    }
                }
                return false;
            },

            /**
             * $el요소의 현재 위치를 반환
             * @name vcui.css3.position
             * @function
             * @param {jQuery} $el
             * @return {object} data
             * @return {number} data.x
             * @return {number} data.y
             */
            position: (function () {
                var support = _vendor !== false;
                var transform = prefixStyle('transform');
                return support ? function ($el) {
                    var el = $el[0] || $el;
                    var matrix = global.getComputedStyle ? global.getComputedStyle(el, null) : el.currentStyle,
                        x, y;

                    if (!matrix[transform] || matrix[transform] === 'none') {
                        return {x: 0, y: 0, left: 0, top: 0};
                    }
                    matrix = matrix[transform].split(')')[0].split(', ');
                    x = +(matrix[12] || matrix[4] || 0);
                    y = +(matrix[13] || matrix[5] || 0);
                    return {x: x, y: y, left: x, top: y};
                } : function ($el) {
                    var el = $el[0] || $el;
                    var matrix = el.style, x, y;
                    x = +matrix.left.replace(/[^-\d.]/g, '');
                    y = +matrix.top.replace(/[^-\d.]/g, '');
                    return {x: x, y: y, left: x, top: y};
                };
            })(),

            getTranslateXY: function ($el) {
                return this.position($el);
            },

            transform: prefixStyle('transform'),
            transitionTimingFunction: prefixStyle('transitionTimingFunction'),
            transitionDuration: prefixStyle('transitionDuration'),
            transitionDelay: prefixStyle('transitionDelay'),
            transformOrigin: prefixStyle('transformOrigin'),
            transition: prefixStyle('transition'),
            translateZ: prefixStyle('perspective') in _style ? ' translateZ(0)' : '',
            transitionEnd: (function () {
                var names = {
                    WebkitTransition: 'webkitTransitionEnd',
                    MozTransition: 'transitionend',
                    transition: 'transitionend'
                };
                for (var name in names) {
                    if (core.tmpNode.style[name] !== undefined) {
                        return names[name];
                    }
                }
                return 'transitionend';
            })(),
            // 이름을 transitionStyle으로 바꾸면 안될려나
            style: function ($el, motion, dur, easing) {
                $el.css(this.transition, motion);
                $el.css(this.transitionDuration, dur + 's');
                $el.css(this.transitionTimingFunction, easing);
            },
            /**
             * 주어진 css명 앞에 현재 브라우저에 해당하는 벤더prefix를 붙여준다.
             *
             * @function
             * @param {string} cssName css명
             * @return {string}
             * @example
             * vcui.css3.prefix('transition'); // // webkitTransition
             */
            prefix: prefixStyle
        };
    });
    /////////////////////////////////////////////////////////////////////////////////////////////////

})(window[LIB_NAME], window);


;(function (core, global, undefined) {
    "use strict";


    core.addon('Env', /** @lends vcui.Env */{
        configs: {},

        /**
         * 설정값을 꺼내오는 함수
         *
         * @param {string} name 설정명. `.`를 구분값으로 단계별로 값을 가져올 수 있다.
         * @param {*} [def] 설정된 값이 없을 경우 사용할 기본값
         * @return {*} 설정값
         * @example
         * vcui.Env.get('siteTitle'); // '바이널'
         */
        get: function (name, def) {
            var root = this.configs,
                names = name.split('.'),
                pair = root;

            for (var i = 0, len = names.length; i < len; i++) {
                if (!(pair = pair[names[i]])) {
                    return def;
                }
            }
            return pair;
        },

        /**
         * 설정값을 지정하는 함수
         *
         * @param {string} name 설정명. `.`를 구분값으로 단계를 내려가서 설정할 수 있다.
         * @param {*} value 설정값
         * @return {*} 설정값
         * @example
         * vcui.Env.set('siteTitle', '바이널');
         */
        set: function (name, value) {
            var root = this.configs,
                names = name.split('.'),
                len = names.length,
                last = len - 1,
                pair = root;

            for (var i = 0; i < last; i++) {
                pair = pair[names[i]] || (pair[names[i]] = {});
            }
            return (pair[names[last]] = value);
        }
    });
})(window[LIB_NAME], window);


;(function (core, global, undefined) {

    /**
     * 루트클래스로서, vcui.BaseClass나 vcui.Class를 이용해서 클래스를 구현할 경우 vcui.BaseClass를 상속받게 된다.
     * @class
     * @name vcui.BaseClass
     * @example
     * var Person = vcui.BaseClass.extend({  // 또는 var Person = vcui.Class({ 으로 구현해도 동일하다.
	*	$singleton: true, // 싱글톤 여부
	*	$statics: { // 클래스 속성 및 함수
	*		live: function() {} // Person.live(); 으로 호출
	*	},
	*	$mixins: [Animal, Robot], // 특정 클래스에서 메소드들을 빌려오고자 할 때 해당 클래스를 지정(다중으로도 가능),
	*	initialize: function(name) {
	*		this.name = name;
	*	},
	*	say: function(job) {
	*		alert("I'm Person: " + job);
	*	},
	*	run: function() {
	*		alert("i'm running...");
	*	}
	*`});
     *
	 * // Person에서 상속받아 Man클래스를 구현하는 경우
     * var Man = Person.extend({
	*	initialize: function(name, age) {
	*		this.supr(name);  // Person(부모클래스)의 initialize메소드를 호출 or this.suprMethod('initialize', name);
	*		this.age = age;
	*	},
	*	// say를 오버라이딩함
	*	say: function(job) {
	*		this.suprMethod('say', 'programer'); // 부모클래스의 say 메소드 호출 - 첫번째인자는 메소드명, 두번째부터는 해당 메소드로 전달될 인자

	*		alert("I'm Man: "+ job);
	*	}
	* });
     * var man = new Man('kim', 20);
     * man.say('freeman');  // 결과: alert("I'm Person: programer"); alert("I'm Man: freeman");
     * man.run(); // 결과: alert("i'm running...");
     */


    var arraySlice = Array.prototype.slice,
        F = function () {
        },
        ignoreNames = ['superClass', 'members', 'statics', 'hooks'];

    // 부모클래스의 함수에 접근할 수 있도록 .supr 속성에 부모함수를 래핑하여 설정
    function wrap(k, fn, supr) {
        return function () {
            var tmp = this.supr, ret;

            this.supr = supr.prototype[k];
            ret = undefined;
            try {
                ret = fn.apply(this, arguments);
            } catch (e) {
                // console.error(e);
            } finally {
                this.supr = tmp;
            }
            return ret;
        };
    }

    // 속성 중에 부모클래스에 똑같은 이름의 함수가 있을 경우 래핑처리
    function inherits(what, o, supr) {
        core.each(o, function (v, k) {
            what[k] = core.isFunction(v) && core.isFunction(supr.prototype[k]) ? wrap(k, v, supr) : v;
        });
    }

    var classSyntax = {};

    function classExtend(name, attr, parentClass) {
        var supr = parentClass || this,
            statics, mixins, singleton, instance, hooks, requires, name, strFunc;

        if (!core.type(name, 'string')) {
            attr = name;
            name = undefined;
        }

        if (core.type(attr, 'function')) {
            attr = attr();
        }

        singleton = attr.$singleton || false;
        statics = attr.$statics || false;
        mixins = attr.$mixins || false;
        hooks = attr.$hooks || false;
        requires = attr.$requires || false;
        name = name || attr.$name || 'BaseClass';

        !attr.initialize && (attr.initialize = supr.prototype.initialize || function () {
        });

        function constructor() {
            if (singleton && instance) {
                return instance;
            } else {
                instance = this;
            }

            var args = arraySlice.call(arguments),
                self = this,
                ctr = self.constructor;

            if (self.initialize) {
                self.initialize.apply(this, args);
            } else {
                supr.prototype.initialize && supr.prototype.initialize.apply(self, args);
            }

            /**if (constructor.hooks) {
                // 페이지상에서 한번만 실행
                if (!ctr.hooks.inited) {
                    ctr.hooks.init && core.each(ctr.hooks.init, function (fn) {
                        fn.call(me);
                    });
                    ctr.hooks.inited = true;
                }

                // 생성때마다 실행
                ctr.hooks.create && core.each(ctr.hooks.create, function (fn) {
                    fn.call(me);
                });
            }**/
        }

        if (!singleton) {
            strFunc = "return function " + name + "() { constructor.apply(this, arguments); }";
        } else {
            strFunc = "return function " + name + "() { if(instance) { return instance; } else { instance = this; } constructor.apply(this, arguments); }";
        }

        classSyntax[name] = new Function("constructor", "instance",
            strFunc
        )(constructor, instance);

        F.prototype = supr.prototype;
        classSyntax[name].superClass = supr.prototype;
        classSyntax[name].prototype = new F;
        /**
         * 해당 클래스에서 상속된 새로운 자식클래스를 생성해주는 함수
         * @function
         * @name vcui.BaseClass.extend
         * @param {object} memthods 메소드모음
         * @return {vcui.BaseClass} 새로운 클래스
         * @example
         * var Child = vcui.BaseClass.extend({
             *     show: function(){
             *         alert('hello');
             *     }
             * });
         *
         * new Child().show();
         */
        classSyntax[name].extend = classExtend;
        core.extend(classSyntax[name].prototype, {
            constructor: classSyntax[name],
            destroy: function () {
            },
            proxy: function (fn) {
                var self = this;
                if (typeof fn === 'string') {
                    fn = self[fn];
                }
                return function () {
                    return fn.apply(self, arguments);
                };
            },
            /**
             * 메소드내부에서 부모클레스의 메소드를 명시적으로 호출하고자 할 때 사용
             * @function
             * @name vcui.BaseClass#suprByName
             * @return {*} 해당 부모함수의 반환값
             * @example
             * var Parent = vcui.BaseClass.extend({
             *     show: function(){
             *         alert('parent.show');
             *     }
             * });
             * var Child = Parent.extend({
             *     // override
             *     show: function(){
             *         this.supr(); // Parent#show()가 호출됨
             *         alert('child.show');
             *     },
             *     display: function(){
             *         this.suprByName('show'); // 특정 부모함수를 명명해서 호출할 수 도 있음
             *     }
             * });
             * var child = new Child();
             * child.show(); // alert('parent.show'); alert('child.show');
             * child.display(); // alert('parent.show');
             */
            suprByName: function (name) {
                var args = arraySlice.call(arguments, 1);
                return supr.prototype[name].apply(this, args);
            }
        });

        if (singleton) {
            /**
             * 싱클톤 클래스의 객체를 반환
             * @function
             * @name vcui.BaseClass.getInstance
             * @return {vcui.BaseClass}
             * @example
             * var Child = vcui.BaseClass.extend({
                 *    $singleton: true,
                 *    show: function(){
                 *        alert('hello');
                 *    }
                 * });
             * Child.getInstance().show();
             * Child.getInstance().show();
             */
            classSyntax[name].getInstance = function () {
                var arg = arguments,
                    len = arg.length;
                if (!instance) {
                    switch (true) {
                        case !len:
                            instance = new classSyntax[name];
                            break;
                        case len === 1:
                            instance = new classSyntax[name](arg[0]);
                            break;
                        case len === 2:
                            instance = new classSyntax[name](arg[0], arg[1]);
                            break;
                        default:
                            instance = new classSyntax[name](arg[0], arg[1], arg[2]);
                            break;
                    }
                }
                return instance;
            };
        }

        /**
         * 해당 클래스의 객체가 생성될 때 hook를 등록하는 클래스함수
         * @function
         * @name vcui.BaseClass.hooks
         * @param {string} name 훅 이름('init' 는 처음에 한번만 실행, 'create' 는 객체가 생성될 때마다 실행)
         * @param {function} func 실행할 훅 함수
         * @example
         * var Child = vcui.BaseClass.extend({
             *     show: function(){
             *         alert('hello');
             *     }
             * });
         * Child.hooks('init', function(){
             *     alert('초기화');
             * });
         * Child.hooks('create', function(){
             *     alert('객체생성');
             * });
         *
         * new Child(); // alert('초기화'); alert('객체생성');
         * new Child(); // alert('객체생성');
         */
        classSyntax[name].hooks = {init: [], initialize: []};
        core.extend(true, classSyntax[name].hooks, supr.hooks);
        hooks && core.each(hooks, function (name, fn) {
            classSyntax[name].hooks(name, fn);
        });


        classSyntax[name].mixins = function (o) {
            var self = this;
            if (!o.push) {
                o = [o];
            }
            var proto = self.prototype;
            core.each(o, function (mixObj, i) {
                if (!mixObj) {
                    return;
                }
                core.each(mixObj, function (fn, key) {
                    if (key === 'build' && self.hooks) {
                        self.hooks.init.push(fn);
                    } else if (key === 'create' && self.hooks) {
                        self.hooks.create.push(fn);
                    } else {
                        proto[key] = fn;
                    }
                });
            });
        };
        mixins && classSyntax[name].mixins.call(classSyntax[name], mixins);

        /**
         * 이미 존재하는 클래스에 메소드 추가
         * @function
         * @name vcui.BaseClass.members
         * @param o {object} methods 메소드 모음 객체
         * @example
         * var Parent = vcui.BaseClass.extend({});
         * Parent.members({
             *     show: function(){
             *         alert('hello');
             *     }
             * });
         * new Parent().show();
         */
        classSyntax[name].members = function (o) {
            inherits(this.prototype, o, supr);
        };
        attr && classSyntax[name].members.call(classSyntax[name], attr);

        /**
         * 이미 존재하는 클래스에 정적메소드 추가
         * @function
         * @name vcui.BaseClass.members
         * @param o {object} methods 메소드 모음 객체
         * @example
         * var Parent = vcui.BaseClass.extend({});
         * Parent.statics({
             *     show: function(){
             *         alert('hello');
             *     }
             * });
         * Parent.show();
         */
        classSyntax[name].statics = function (o) {
            o = o || {};
            for (var k in o) {
                if (core.array.indexOf(ignoreNames, k) < 0) {
                    this[k] = o[k];
                }
            }
            return this;
        };
        classSyntax[name].statics.call(classSyntax[name], supr);
        statics && classSyntax[name].statics.call(classSyntax[name], statics);

        return classSyntax[name];
    }

    var BaseClass = function () {
    };
    BaseClass.extend = classExtend;
    core.extend(BaseClass.prototype, {
        constructor: BaseClass,
        initialize: function () {
        },
        destroy: function () {
        },
        release: function () {
            this.destroy();
        },
        proxy: function (fn) {
            return fn.bind(this);
        }
    });
    core.BaseClass = BaseClass;


    /**
     * 클래스를 생성해주는 함수(vcui.BaseClass.extend 별칭)
     * @param {object} attr 메소드 모음 객체
     * @returns {vcui.BaseClass} 새로운 객체
     * @example
     * var Parent = vcui.Class({
         *     show: function(){
         *         alert('parent.show');
         *     }
         * });
     * var Child = vcui.Class({
         *     $extend: Parent, // 부모클래스
         *     run: function(){
         *          alert('child.run');
         *     }
         * });
     * new Child().show();
     * new Child().run();
     */
    core.Class = function (attr) {
        return classExtend(attr.name || attr.$name || 'unknown', attr, attr.$extend || BaseClass);
    };

})(window[LIB_NAME], window);


;(function ($, core, global, undefined) {
    /**
     }
     * benchmark 모듈
     */
    core.addon(/** @lends vcui */{
        /**
         * timeStart("name")로 name값을 키로하는 타이머가 시작되며, timeEnd("name")로 해당 name값의 지난 시간을 로그에 출력해준다.
         *
         * @param {string} name 타이머의 키값
         * @param {boolean} reset=false 리셋(초기화) 여부
         *
         * @example
         * vcui.timeStart('animate');
         * ...
         * vcui.timeEnd('animate'); -> animate: 10203ms
         */
        timeStart: function (name, reset) {
            if (!name) {
                return;
            }
            var time = +new Date,
                key = "KEY" + name.toString();

            this.timeCounters || (this.timeCounters = {});
            if (!reset && this.timeCounters[key]) {
                return;
            }
            this.timeCounters[key] = time;
        },

        /**
         * timeStart("name")에서 지정한 해당 name값의 지난 시간을 로그에 출력해준다.
         *
         * @param {string} name 타이머의 키값
         * @return {number} 걸린 시간
         *
         * @example
         * vcui.timeStart('animate');
         * ...
         * vcui.timeEnd('animate'); -> animate: 10203ms
         */
        timeEnd: function (name) {
            if (!this.timeCounters) {
                return null;
            }

            var time = +new Date,
                key = "KEY" + name.toString(),
                timeCounter = this.timeCounters[key],
                diff;

            if (timeCounter) {
                diff = time - timeCounter;
                // 이 콘솔은 디버깅을 위한 것이므로 지우지 말것.
                //console.log('[' + name + '] ' + diff + 'ms');
                delete this.timeCounters[key];
            }
            return diff;
        }
    });

})(jQuery, window[LIB_NAME], window)
/**
 * vcui.importJs
 */
;(function ($, core, global, undefined) {
    // benchmark: https://github.com/malko/l.js/blob/master/l.js

    var isA = function (a, b) {
            return a instanceof (b || Array);
        },
        doc = document,
        bd = doc.getElementsByTagName("body")[0] || doc.documentElement,
        appendElmt = function (type, attrs, callback) {
            var e = doc.createElement(type), i;
            if (callback && isA(callback, Function)) {
                if (e.readyState) {
                    e.onreadystatechange = function () {
                        if (e.readyState === "loaded" || e.readyState === "complete") {
                            e.onreadystatechange = null;
                            callback();
                        }
                    };
                } else {
                    e.onload = callback;
                }
            }
            for (i in attrs) {
                attrs[i] && (e.setAttribute(i, attrs[i]));
            }
            bd.appendChild(e);
        };

    core.loadJs = core.importJs = function (url, callback) {
        if (!isA(url)) {
            url = [url];
        }
        var len = url.length,
            oriLen = len,
            loaded = 0;

        while (len--) {
            appendElmt('script', {
                'type': 'text/javascript',
                'data-import': 'true',
                'src': url
            }, function () {
                loaded += 1;
                if (loaded === oriLen) {
                    callback && callback();
                }
            });
        }
    };

    ////////////////////////////////////////////////////
})(jQuery, window[LIB_NAME], window);


;(function (core, global, undefined) {
    var doc = document;


    function convertDate (val) {
        if (val instanceof Date) {
            return val.toGMTString()
        } else if (typeof val === 'string' && /^[-+]*\d+[a-z]?$/.test(val)) {
            return core.date.calc(new Date(), val).toGMTString();
        } else if (!isNaN(val)) {
            return core.date.calc(new Date(), '+' + val + 'd').toGMTString();
        } else {
            return "";
        }
    }

    /**
     * @namespace
     * @name vcui.Cookie
     */
    core.addon('Cookie', /** @lends vcui.Cookie */ {
        defaults: {
            // domain: location.host,
            path: ''
        },

        /**
         * 쿠키를 설정
         *
         * @param {string} name 쿠키명
         * @param {string} value 쿠키값
         * @param {object} [options]
         * @param {date} [options.expires] 만료시간
         * @param {string} [options.path] 쿠키의 유효경로
         * @param {string} [options.domain] 쿠키의 유효 도메인
         * @param {boolean} [options.secure] https에서만 쿠키 설정이 가능하도록 하는 속성
         * @example
         * vcui.Cookie.set('userid', 'vcui');
         * // or
         * vcui.Cookie.set({
         *              'userid': 'vcui',
         *              'name': '바이널'
         *              });
         */
        set: function (name, value, options) {
            if (!core.type(name, 'string')) {
                core.each(name, function (val, key) {
                    this.set(key, value, value);
                }.bind(this));
                return;
            }

            options = core.extend({}, this.defaults, options || {});
            var curCookie = name + "=" + encodeURIComponent(value) +
                ((options.expires) ? "; expires=" + convertDate(options.expires) : "") +
                ((options.path) ? "; path=" + options.path : '') +
                ((options.domain) ? "; domain=" + options.domain : '') +
                ((options.secure) ? "; secure" : "");

            doc.cookie = curCookie;
        },

        /**
         * 쿠키를 설정
         *
         * @param {string} name 쿠키명
         * @return  {string} 쿠키값
         * @example
         * vcui.Cookie.get('userid'); // 'vcui'
         */
        get: function (name) {
            var j, g, h, f;
            j = ";" + doc.cookie.replace(/ /g, "") + ";";
            g = ";" + name + "=";
            h = j.indexOf(g);

            if (h !== -1) {
                h += g.length;
                f = j.indexOf(";", h);
                return decodeURIComponent(j.substr(h, f - h));
            }
            return "";
        },

        /**
         * 쿠키 삭제
         *
         * @param {string} name 쿠키명
         * @example
         * core.Cookie.remove('userid');
         * // or
         * core.Cookie.remove(['userid', 'name']);
         */
        remove: function (name) {
            if (core.type(name, 'string')) {
                doc.cookie = name + "=;expires=Fri, 31 Dec 1987 23:59:59 GMT;";
            } else {
                core.each(name, function (val, key) {
                    this.remove(key);
                }.bind(this))
            }
        },

        /**
         * sep를 구분자로 하여 문자열로 조합하여 쿠키에 셋팅
         * @param {string} name 쿠키명
         * @param {string} val 값
         * @param {string} sep 구분자
         * @example
         * vcui.Cookie.setItem('arr', 'a');
         * vcui.Cookie.setItem('arr', 'b');  // arr:a|b
         */
        setItem: function (name, val, sep) {
            sep = sep || '|';
            val = val + '';

            var value = this.get(name),
                values = value ? value.split(sep) : [];

            if (!core.array.include(values, val)) {
                values.push(val);
            }

            this.set.apply(this, [name, values.join(sep)].concat(arguments));
        },

        getItems: function (name) {
            var val = this.get(name) || '';
            if (!$.trim(val)) {
                return [];
            }
            return val.split('|');
        },

        /**
         * name에 셋팅되어 있던 조합문자열에서 val를 제거
         * @param {string} name 쿠키명
         * @param {string} val 값
         * @param {string} sep
         * @example
         * vcui.Cookie.setItem('arr', 'a');
         * vcui.Cookie.setItem('arr', 'b');  // arr='a|b'
         * vcui.Cookie.removeItem('arr', 'b'); // arr='a'
         */
        removeItem: function (name, val, sep) {
            sep = sep || '|';
            val = val + '';

            var value = this.get(name),
                values = value ? value.split(sep) : [];

            values = core.array.remove(values, val);

            this.set.apply(this, [name, values.join(sep)].concat(arguments));
        }
    });

})(window[LIB_NAME], window);


;(function ($, core, global, undefined) {
    /**
     * @namespace
     * @name vcui.util
     */
    core.addon('util', function () {
        return /** @lends vcui.util */{
            /**
             * 이미지가  wrap에 맞춰 자동 조절 되도록
             * @param images
             * @returns {*}
             */
            imageCover: function (images) {
                $(images).each(function () {
                    var ir = this.width / this.height,
                        $wrap = $(this).css('visibility', '').parent(),
                        er = $wrap.width() / $wrap.height();

                    if (ir < er) {
                        $(this).addClass('portrait');
                    } else {
                        $(this).removeClass('portrait');
                    }
                });
            },

            /**
             * 팝업을 띄우는 함수. (vcui.openPopup으로도 사용가능)
             * @param {string} url 주소
             * @param {Number=} width 너비. 또는 옵션
             * @param {Number=} height 높이.
             * @param {opts=} 팝업 창 모양 제어 옵션.(커스텀옵션: name(팝업이름), align(=center, 부모창의 가운데에 띄울것인가),
             * @example
             * vcui.openPopup('http://google.com', 500, 400, {name: 'notice', align: null, scrollbars: 'no'});
             * //or
             * vcui.openPopup('http://google.com', {name: 'notice', width: 500, height: 400, scrollbars: 'no'});
             */
            openPopup: function (url, width, height, opts) {
                if (arguments.length === 2 && core.type(width, 'json')) {
                    opts = width;
                    width = opts.width || 600;
                    height = opts.height || 400;
                }

                opts = core.extend({
                    name: 'popupWin',
                    width: width || 600,
                    height: height || 400,
                    align: 'center',
                    resizable: 'no',
                    scrollbars: 'no'
                }, opts);

                var target = opts.target || opts.name || 'popupWin',
                    feature = 'app_, ',
                    tmp = [],
                    winCoords;

                if (opts.align === 'center') {
                    winCoords = core.util.popupCoords(opts.width, opts.height);
                    opts.left = winCoords.left;
                    opts.top = winCoords.top;
                }
                delete opts.name;
                delete opts.target;
                delete opts.align;

                core.detect.isSafari && tmp.push('location=yes');
                core.each(opts, function (val, key) {
                    tmp.push(key + '=' + val);
                });
                feature += tmp.join(', ');

                var popupWin = window.open(url, target, feature);
                /*if (!popupWin || popupWin.outerWidth === 0 || popupWin.outerHeight === 0) {
                 alert("팝업 차단 기능이 설정되어 있습니다\n\n차단 기능을 해제(팝업허용) 한 후 다시 이용해 주세요.");
                 return false;
                 }

                 if (popupWin.location.href === 'about:blank') {
                 popupWin.location.href = url;
                 }*/

                return popupWin;
            },

            /**
             * 팝업을 띄운 후에 주어진 콜백함수를 호출
             * @param {string} url 주소
             * @param {object} feature 팝업 모양 (커스텀옵션: name(팝업이름), align(=center: 부모창의 가운데에 띄울것인가),
             * @param {function()} (Optional) callback 띄워진 후에 실행할 콜백함수
             * @example
             * vcui.util.openPopupAndExec('http://google.com', {name: 'notice', width: 500, height:400, align: 'nw'}, function(popup){
             *     alert('팝업이 정상적으로 띄워졌습니다.');
             *     popup.close(); // 열자마자 닫아버림....:-b
             * });
             */
            openPopupAndExec: function (url, feature, callback) {
                feature || (feature = {});

                var popupWin;

                if ((popupWin = this.openPopup(url, feature.width, feature.height, feature)) === false) {
                    return;
                }
                if (!callback) {
                    return;
                }

                var limit = 0, // 5초 이내에 팝업이 로딩안되면 콜백함수 무시해버림
                    fn = function () {
                        if (limit++ > 50) {
                            return;
                        }
                        if (!popupWin.document.body) {
                            setTimeout(fn, 100);
                            return;
                        }
                        callback && callback(popupWin);
                        popupWin.focus();
                    };

                if (!popupWin.document.body) {
                    setTimeout(fn, 100);
                } else {
                    fn();
                }
            },


            /**
             * 컨텐츠 사이즈에 맞게 창사이즈를 조절
             * @example
             * vcui.util.resizeToContent(); // 팝업에서만 사용
             */
            resizeToContent: function () {
                var innerX, innerY,
                    pageX, pageY,
                    win = window,
                    doc = win.document;

                if (win.innerHeight) {
                    innerX = win.innerWidth;
                    innerY = win.innerHeight;
                } else if (doc.documentElement && doc.documentElement.clientHeight) {
                    innerX = doc.documentElement.clientWidth;
                    innerY = doc.documentElement.clientHeight;
                } else if (doc.body) {
                    innerX = doc.body.clientWidth;
                    innerY = doc.body.clientHeight;
                }

                pageX = doc.body.offsetWidth;
                pageY = doc.body.offsetHeight;

                win.resizeBy(pageX - innerX, pageY - innerY);
            },

            /**
             * 팝업의 사이즈에 따른 화면상의 중앙 위치좌표를 반환
             * @param {number} w 너비.
             * @param {number} h 높이.
             * @return {{left:Number, top:Number}} {left: 값, top: 값}
             */
            popupCoords: function (w, h) {
                w = w || 400;
                h = h || 300;

                var dualScreenLeft = 'screenLeft' in window ? window.screenLeft : screen.left,
                    dualScreenTop = 'screenTop' in window ? window.screenTop : screen.top,
                    width = window.innerWidth || document.documentElement.clientWidth || screen.width,
                    height = window.innerHeight || document.documentElement.clientHeight || screen.height,
                    left = ((width / 2) - (w / 2)) + dualScreenLeft,
                    top = ((height / 2) - (h / 2)) + dualScreenTop;

                return {
                    left: left,
                    top: top
                };
            },

            /**
             * ios에서 보이스오버가 켜져있을 때 .focus()가 안 먹는 경우가 있을 때 사용
             * @param el
             */
            setVoiceOverFocus: function (el) {
                var focusInterval = 10; // ms, time between function calls
                var focusTotalRepetitions = 10; // number of repetitions

                el.setAttribute('tabindex', '0');
                el.blur();

                var focusRepetitions = 0;
                var interval = window.setInterval(function () {
                    el.focus();
                    focusRepetitions++;
                    if (focusRepetitions >= focusTotalRepetitions) {
                        window.clearInterval(interval);
                    }
                }, focusInterval);
            },

            /**
             * data-src속성에 있는 이미지url를 src에 설정하여 로드시키는 함수
             * @param {string} target 이미지 요소
             * @return {promise} promise
             * @example
             * vcui.util.loadImages('img[data-src]').done(function(){
             *     alert('모든 이미지 로딩 완료');
             * });
             */
            loadImages: function (target, allowError) {
                var $imgs = $(target),
                    len = $imgs.length,
                    idx = len,
                    def = $.Deferred();

                function loaded(e) {
                    if (e.type === 'error' && !allowError) {
                        def.reject(e.target);
                        return;
                    }
                    var $target;
                    // 이미지가 아닐 경우 배경으로 깐다.
                    if ($target = $(this).data('target')) {
                        $target.css('background', 'url(' + this.src + ')');
                    }
                    idx--;
                    def.notify(this, (len - idx) / len * 100);
                    if (!idx) {
                        def.resolve();
                    }
                }

                if (!len) {
                    def.resolve();
                } else {
                    $imgs.each(function (i) {
                        var $img = $imgs.eq(i);
                        // 이미지가 아닐 경우
                        if (!$img.is('img')) {
                            $img = $('<img>').data({
                                'target': $img[0],
                                'src': $img.attr('data-src')
                            });
                        }
                        $img.one("load.lazyload error.lazyload", loaded);
                        var src = $img.attr("data-src");
                        if (src) {
                            $img.attr("src", src);
                        } else if (this.complete) {
                            $img.trigger("load");
                        }
                    });
                }
                return def.promise();
            },

            /**
             * 정확한 사이즈계산을 위해 내부에 있는 이미지를 다 불러올 때까지 기다린다.
             * @param {jQuery} $imgs 이미지 요소들
             * @param {boolean} allowError 에러 허용여부(true이면 중간에 에러가 나도 다음 이미지를 대기)
             * @return {promise}
             * @example
             * vcui.util.waitImageLoad('img[data-src]').done(function(){
             *     alert('모든 이미지 로딩 완료');
             * });
             */
            waitImageLoad: function (imgs, allowError) {
                if (core.type(imgs, 'string')) {
                    imgs = $(imgs);
                }
                var self = this,
                    defer = $.Deferred(),
                    count = imgs.length,
                    total = count,
                    loaded = function () {
                        count -= 1;

                        var percent = 100 - (count / total) * 100;
                        defer.notify(percent, count, total);
                        if (count <= 0) {
                            defer.resolve(imgs);
                        }
                    };
                if (count === 0) {
                    defer.resolve();
                } else {
                    setTimeout(function () {
                        imgs.each(function (i) {
                            if (this.complete || this.naturalWidth >= 0) {
                                loaded.call(this);
                            } else {
                                var fakeImg = new Image();
                                fakeImg.onload = function () {
                                    loaded.call(this);
                                    fakeImg.onload = null;
                                    fakeImg = null;
                                };
                                if (allowError) {
                                    fakeImg.onerror = function () {
                                        loaded.call(this);
                                        fakeImg = null;
                                    }
                                }
                                fakeImg.src = this.src;
                            }
                        });
                    });
                }

                return defer.promise();
            },

            /**
             * 이미지의 원래 사이즈 구하기
             * @param src
             * @param callback
             */
            getImageSize: function (src, callback) {
                var img;
                img = new Image();
                img.onload = function () {
                    callback(this.width + " " + this.height);
                };
                img.src = src;
            },

            /**
             * 어떤 요소의 자식들의 총 너비를 구하는 함수
             * @param {jQuery|NodeCollection} items 자식요소들
             * @return {number}
             */
            getItemsWidth: function (items) {
                var width = 0;
                $(items).each(function () {
                    width += $(this).width();
                });
                return width;
            },
            /**
             * 디바이스의 방향 체크
             * @returns {string}
             */
            getDeviceOrientation: function () {
                var orientation = "portrait";
                if ($win.width() > $win.height()) {
                    orientation = "landscape";
                }
                return orientation;
            },

            /**
             * 스크롤이벤트 무효화
             * @param $el
             */
            disableScroll: function ($el) {
                $el = $el || $win;

                var scrollTop = $el.scrollTop();
                $el.on("scroll.disableScroll mousewheel.disableScroll DOMMouseScroll.disableScroll touchmove.disableScroll", function (event) {
                    event.preventDefault();
                    $el.scrollTop(scrollTop);
                });
            },

            /**
             * 스크롤이벤트 무효화 취소
             * @param $el
             */
            enableScroll: function ($el) {
                $el = $el || $win;

                $el.off(".disableScroll");
            },
            /**
             * json 문자 파싱(eval 이용)
             * @param str
             * @returns {*}
             */
            parse: function (str) {
                return (new Function('return (' + str + ')'))();
            },

            /**
             * 풀스크린 모드 전환
             * @param el
             */
            requestFullScreen: function (el) {
                if (typeof el === 'string') {
                    el = document.getElementById(el);
                }
                if (el.requestFullscreen) {
                    el.requestFullscreen();
                } else if (el.webkitRequestFullscreen) {
                    el.webkitRequestFullscreen();
                } else if (el.mozRequestFullScreen) {
                    el.mozRequestFullScreen();
                } else if (el.msRequestFullscreen) {
                    el.msRequestFullscreen();
                }
            },

            stackEvent: (function () {
                var stack = [];

                return function (name, handler) {
                    $(window).on(name, function (e) {
                        handler.call(this, e, function () {
                            $(window).off(name, handler);
                        });
                    })
                };
            })()
        };
    });

})(jQuery, window[LIB_NAME], window);


;(function ($, core, global, undefined) {
    "use strict";

    function getDocSize(name) {
        var doc = document,
            bd = doc.body,
            de = doc.documentElement;

        return Math.max(
            Math.max(bd['scroll' + name], de['scroll' + name]),
            Math.max(bd['offset' + name], (de['offset' + name] - (de['offset' + name] - de['client' + name]))),
            Math.max(bd['client' + name], de['client' + name])
        );
    }

    function getWinSize(name) {
        var w = 0,
            self = global;

        if (self['inner' + name]) {
            w = self['inner' + name];
        } else if (document.documentElement && document.documentElement['client' + name]) {
            w = document.documentElement['client' + name];
        } else if (document.body) {
            w = document.body['client' + name];
        }
        return w;
    }

    var prefixNames = [
        'webkit',
        'moz',
        'ms',
        ''
    ];

    function getPrefix(name, callback) {
        var val;
        for (var i = -1, item; item = prefixNames[++i];) {
            if (item) {
                val = item + core.string.toFirstUpper(name);
            } else {
                val = name;
            }
            if (callback(val)) {
                return val;
            }
        }
        return name;
    }

    /**
     * @namespace
     * @name vcui.dom
     */
    core.addon('dom', /** @lends vcui.dom */{
        /**
         * css3 support
         * @var {boolean}
         */
        css3: core.css3.support,
        /**
         * css3d support
         * @var {boolean}
         */
        css3D: core.css3.support3D,
        /**
         * transitionend event name
         * @var {string}
         */
        transitionEnd: core.css3.transitionEnd,
        /**
         * transform name
         * @var {string}
         */
        transform: core.css3.transform,
        /**
         * ransformOrigin name
         * @var {string}
         */
        transformOrigin: core.css3.transformOrigin,
        /**
         * translateZ name
         * @var {string}
         */
        translateZ: core.css3.translateZ,
        /**
         * transition name
         * @var {string}
         */
        transition: core.css3.transition,
        /**
         * transitionDelay name
         * @var {string}
         */
        transitionDelay: core.css3.transitionDelay,
        /**
         * transitionDuration name
         * @var {string}
         */
        transitionDuration: core.css3.transitionDuration,
        /**
         * transitionTimingFunction name
         * @var {string}
         */
        transitionTimingFunction: core.css3.transitionTimingFunction,
        /**
         * translate 위치 반환
         * @function
         * @return {{x: (*|number), y: (*|number)}}
         */
        getTranslateXY: core.css3.getTranslateXY,
        /**
         * 주어진 스타일에 해당 vendor prefix 추가(브라우저에서 지원되는거면 아무것도 안붙임)
         * @param name
         * @return {string} name에 벤더 prefix를 붙여서 반환
         */
        getVendorStyle: function (name) {
            return getPrefix(name, function (name) {
                return core.tmpNode.style[name] !== undefined;
            });
        },
        /**
         * 주어진 속성에 해당 vendor prefix 추가(브라우저에서 지원되는거면 아무것도 안붙임)
         * @param name
         * @return {string} name에 벤더 prefix를 붙여서 반환
         */
        getVendorAttr: function (name) {
            return getPrefix(name, function (name) {
                return core.tmpNode[name] !== undefined;
            });
        },
        /**
         * 주어진 이벤트에 해당 vendor prefix 추가(브라우저에서 지원되는거면 아무것도 안붙임)
         * @param name
         * @return {string} name에 벤더 prefix를 붙여서 반환
         */
        getVendorEvent: function (name) {
            return getPrefix(name, function (name) {
                return core.tmpNode[name] !== undefined;
            });
        },
        /**
         * 이벤트의 좌표 추출
         * @param ev 이벤트 객체
         * @param {string} type mouseend나 touchend 이벤트일때 'end'를 넘겨주면 좀더 정확한 값이 반환된다.
         * @return {{x: (*|number), y: (*|number)}}
         */
        getEventPoint: function (ev, type) {
            var e = ev.originalEvent || ev;
            if (type === 'end' || ev.type === 'touchend') {
                e = e.changedTouches && e.changedTouches[0] || e;
            } else {
                e = e.touches && e.touches[0] || e;
            }
            return {
                x: e.pageX || e.clientX,
                y: e.pageY || e.clientY
            };
        },
        /**
         *  캐럿 위치 반환
         *  @param {element} el 인풋 엘리먼트
         *  @return {{begin:(number), end:(number)}}
         */
        getCaretPos: function (el) {
            if (core.type(el.selectionStart, 'number')) {
                return {
                    begin: el.selectionStart,
                    end: el.selectionEnd
                };
            }

            var range = document.selection.createRange();
            if (range && range.parentElement() === el) {
                var inputRange = el.createTextRange(), endRange = el.createTextRange(), length = el.value.length;
                inputRange.moveToBookmark(range.getBookmark());
                endRange.collapse(false);

                if (inputRange.compareEndPoints('StartToEnd', endRange) > -1) {
                    return {
                        begin: length,
                        end: length
                    };
                }

                return {
                    begin: -inputRange.moveStart('character', -length),
                    end: -inputRange.moveEnd('character', -length)
                };
            }

            return {
                begin: 0,
                end: 0
            };
        },
        /**
         * 캐럿 위치 설정
         *
         * @param {element} el 엘리먼트
         * @param {object|number} pos 위치시키고자 하는 begin & end
         * @param {number} pos.begin
         * @param {number} pos.end
         */
        setCaretPos: function (el, pos) {
            if (!core.type(pos, 'object')) {
                pos = {
                    begin: pos,
                    end: pos
                };
            }

            if (el.setSelectionRange) {
                //el.focus();
                el.setSelectionRange(pos.begin, pos.end);
            } else if (el.createTextRange) {
                var range = el.createTextRange();
                range.collapse(true);
                range.moveEnd('character', pos.end);
                range.moveStart('character', pos.begin);
                range.select();
            }
        },
        /**
         * $el요소의 현재 위치를 반환
         * @param {element} $el
         * @return {{x: (*|number), y: (*|number)}}
         */
        position: function () {
            return core.css3.position.apply(core.css3, [].slice.call(arguments, 0));
        },

        /**
         * @function
         *
         * css3가 지원되면 transition으로, 아닌 곳에서는 left으로 el를 움직여준다.
         * @param {element} $el 대상 엘리먼트
         * @param {number} x x축 이동 크기
         * @param {number} y y축 이동 크기
         * @param {number} duration 애니메이션 시간
         * @param {function} [callback] 이동이 완료됐을 때 실행되는 콜백함수
         */
        move: core.css3.support ? function () {
            core.css3.move.apply(core.css3, [].slice.call(arguments, 0));
        } : function ($el, x, y, duration, callback) {
            var css = {};
            if (typeof x !== 'undefined') {
                css.left = x;
            }
            if (typeof y !== 'undfined') {
                css.top = y;
            }

            if (!duration) {
                $el.css(css);
                callback && callback();
            } else {
                $el.stop(false, true).animate(css, duration, function () {
                    callback && callback.apply(this, [].slice.call(arguments, 0));
                });
            }
        },
        /**
         * 주어진 el이 container 내부에 속한 엘리먼트인가
         * @param {element} container 컨테이너 엘리먼트
         * @param {element} el 엘리먼드
         * @param {boolean} [isIncludeSelf=true] 컨테이너 자신도 체크대상에 포함시킬 것인가
         * @returns {boolean}
         */
        contains: function (container, el, isIncludeSelf) {
            if (!container || !el) {
                return false;
            }
            if ('contains' in container) {
                return (container !== el && container.contains(el)) || (isIncludeSelf === true && container === el);
            } else {
                return (container.compareDocumentPosition(el) % 16) || (isIncludeSelf === true && container === el);
            }
        },

        /**
         * 눌러진 마우스 버튼 반환
         * @param {jquery.event} e
         * @return {string} [left|middle|right]
         */
        getMouseButton: function (e) {
            var type = '';
            if (e.which == null) {
                type = (e.button < 2) ? 'left' : ((e.button == 4) ? 'middle' : 'right');
            } else {
                type = (e.which < 2) ? 'left' : ((e.which == 2) ? 'middle' : 'right');
            }
            return type;
        },

        /**
         * 도큐먼트의 높이를 반환
         * @return {number}
         * @example
         * alert(vcui.dom.getDocHeight());
         */
        getDocHeight: function () {
            return getDocSize('Height');
        },

        /**
         * 도큐먼트의 너비를 반환
         * @return {number}
         * @example
         * alert(vcui.dom.getDocWidth());
         */
        getDocWidth: function () {
            return getDocSize('Width')
        },

        /**
         * 창의 너비를 반환
         * @return {number}
         * @example
         * alert(vcui.dom.getWinWidth());
         */
        getWinWidth: function () {
            return getWinSize('Width');
        },

        /**
         * 창의 높이를 반환
         * @return {number}
         * @example
         * alert(vcui.dom.getWinHeight());
         */
        getWinHeight: function () {
            return getWinSize('Height');
        },

        /**
         * 주어진 요소의 사이즈 & 위치를 반환
         * @param {element} elem
         * @return {{width:Number, height:Number, offset:{top:Number, left:Number}}} {width: 너비, height: 높이, offset: { top: 탑위치, left: 레프트위치}}
         *
         * @example
         * var dims = vcui.dom.getDimensions('#box');
         * console.log(dims.left, dims.top, dims.width, dims.height);
         */
        getDimensions: function (elem) {
            var rect = this.getRect(elem);

            rect.left = rect.left - this.getScrollLeft();
            rect.top = rect.top - this.getScrollTop();
            rect.right = rect.left + rect.width;
            rect.bottom = rect.top + rect.height;

            return rect;
        },

        /**
         * 주어진 요소의 사이즈 & 위치를 반환(스크롤 위치 무시)
         * @param {element} elem
         * @return {{width:Number, height:Number, offset:{top:Number, left:Number}}} {width: 너비, height: 높이, offset: { top: 탑위치, left: 레프트위치}}
         *
         * @example
         * var dims = vcui.dom.getRect('#box');
         * console.log(dims.left, dims.top, dims.width, dims.height);
         */
        getRect: function (elem) {
            elem = $(elem);

            var width, height;
            var offset = elem.offset();

            width = elem.outerWidth();
            height = elem.outerHeight();

            return {
                width: width,
                height: height,
                top: offset.top,
                left: offset.left,
                bottom: offset.top + height,
                right: offset.left + width
            };
        },

        /**
         * 해당브라우저의 휠이벤트,명 반환
         * @function
         * @return {string} 휠이벤트명
         */
        mouseWheel: ( 'onwheel' in document || document.documentMode >= 9 ) ? 'wheel' : 'mousewheel DomMouseScroll MozMousePixelScroll',

        /**
         * 휠이벤트의 deltaY 추출(위로: 1, 아래로: -1)
         * @param {jQuery#Event}
         * @return {number} deltaY
         * @example
         * $el.on('mousewheel DOMMouseScroll wheel', function (e) {
             *     var deltaY = vcui.dom.getDeltaY(e);
             * });
         */
        getDeltaY: function (e) {
            return this.getWheelDelta(e).y;
        },

        /**
         * 휠이벤트의 deltaX 추출(우: 1, 좌: -1)
         * @param {jQuery#Event}
         * @example
         * $el.on('mousewheel DOMMouseScroll wheel', function (e) {
             *     var deltaX = vcui.dom.getDeltaX(e);
             * });
         */
        getDeltaX: function (e) {
            return this.getWheelDelta(e).x;
        },

        /**
         * 휠이벤트의 deltaX, deltaY 추출(상: 1, 하: -1, 우: 1, 좌: -1)
         * @param {jQuery#Event}
         * @return {{x:Number, y:Number}}
         * @example
         * $el.on('mousewheel DOMMouseScroll wheel', function (e) {
             *     var delta = vcui.dom.getWheelDelta(e);
             *     // delta.x;
             *     // delta.y;
             * });
         */
        getWheelDelta: function (e) {
            var wheelDeltaX, wheelDeltaY;

            e = e.originalEvent || e;
            if ('deltaX' in e) {
                if (e.deltaMode === 1) {
                    wheelDeltaX = -e.deltaX;
                    wheelDeltaY = -e.deltaY;
                } else {
                    wheelDeltaX = -e.deltaX;
                    wheelDeltaY = -e.deltaY;
                }
            } else if ('wheelDeltaX' in e) {
                wheelDeltaX = e.wheelDeltaX;
                wheelDeltaY = e.wheelDeltaY;
            } else if ('wheelDelta' in e) {
                wheelDeltaX = wheelDeltaY = e.wheelDelta;
            } else if ('detail' in e) {
                wheelDeltaX = wheelDeltaY = -e.detail;
            } else {
                wheelDeltaX = wheelDeltaY = 0;
            }
            return {
                x: wheelDeltaX === 0 ? 0 : (wheelDeltaX > 0 ? 1 : -1),
                y: wheelDeltaY === 0 ? 0 : (wheelDeltaY > 0 ? 1 : -1)
            };
        },

        /**
         * 글자 사이즈(영역) 계산
         *
         * @param text {string}
         * @param parent {HTMLElement} 텍스트를 둘러싸고 있는 엘리먼트(이게 있어야 정확한 계산이 가능함)
         * @return {number}
         */
        getMeasureText: function (text, parent) {
            if (!text) {
                return 0;
            }

            var parent = parent || document.body,
                container = document.createElement("div");

            container.style.position = "absolute";
            container.style.visibility = "hidden";
            container.style.height = "auto";
            container.style.width = "auto";
            container.style.padding = "0";
            container.style.whiteSpace = "nowrap";
            container.textContent = text;

            parent.appendChild(container);
            var width = container.clientWidth;
            var height = container.clientHeight;
            parent.removeChild(container);

            return {
                width: width,
                height: height
            };
        },

        /**
         * 스타일 태그 동적으로 생성하기
         * @param css css 문자열
         * @returns {function}
         * @example
         * var detach = vcui.dom.createStyle('.tab-nav { display: none; }');
         * // 만약 생성한 스타일을 지우고자 할 경우, 위와 같이 반환값을 갖고 있다가 실행해주면 된다.
         * detach();
         */
        createStyle: function (css) {
            var head = document.head || document.getElementsByTagName('head')[0],
                style = document.createElement('style');

            style.type = 'text/css';
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }

            head.appendChild(style);
            return function () {
                head.removeChild(style);
            };
        },

        /**
         * 클립보드에 복사하기
         * @param txt
         * @example
         * vcui.dom.copyToClipboard('복사할 문자열');
         */
        copyToClipboard: function (txt, options) {

            //if (core.detect.isIE)
            // return window.prompt("Press Ctrl+C (or CMD+C on Mac) to copy the text", txt);
            //console.log(window.clipboardData.setData);
            options = core.extend({}, options);
            if (window.clipboardData && window.clipboardData.setData) {
                clipboardData.setData("Text", txt);
                options.onSuccess && options.onSuccess();
                return;
            }

            var result,
                txtNode = document.createElement("textarea");

            options.container = options.container || document.body;

            txtNode.style.position = "fixed";
            txtNode.style.top = "1px";
            txtNode.style.zIndex = "-9999";
            txtNode.style.opacity = "0.1";
            txtNode.readOnly = true;
            txtNode.value = txt;
            txtNode.setAttribute("id", "someFakeId");
            options.container.appendChild(txtNode);
            if (core.detect.isIOS) {
                var range = document.createRange();
                range.selectNodeContents(txtNode);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
                txtNode.setSelectionRange(0, 999999);
            } else {
                txtNode.select();
            }

            try {
                result = document.execCommand("copy");
            } catch (e) {
                result = false;
            }

            if (result) {
                options.onSuccess && options.onSuccess();
            } else {
                options.onError && options.onError();
            }

            return options.container.removeChild(txtNode),
                txtNode = null,
                result;
        },
        /**
         * 스크롤탑 반환
         * @return {number}
         */
        getScrollTop: function () {
            return Math.round((window.pageYOffset || document.scrollTop) - (document.clientTop || 0) || 0);
        },
        /**
         * 스크롤left 반환
         * @return {number}
         */
        getScrollLeft: function () {
            return Math.round((window.pageXOffset || document.scrollLeft) - (document.clientLeft || 0) || 0);
        },
        /**
         * 아이폰의 튕김 스크롤 영역인지 체크
         * @param currentScrollY
         * @return {boolean}
         */
        isOutOfBounds: function (currentScrollY) {
            var pastTop = currentScrollY < 0,
                pastBottom = currentScrollY + this.getWinHeight() > this.getDocHeight();

            return pastTop || pastBottom;
        }

    });
})(jQuery, window[LIB_NAME], window);


;(function ($, core, global, undefined) {
    "use strict";

    core.template =
        /**
         * 템플릿 생성
         * @function
         * @name vcui.template
         * @param {string} text 템플릿 문자열
         * @param {object} data 템플릿 문자열에서 변환될 데이타
         * @param {object} settings 옵션
         * @return {function} tempalte 함수
         *
         * @example
         * {{#set 변수명=값}} : 지역변수 생성
         * {{#if expression}} ... {{#elsif expression}} ... {{#else}} ... {{/if}}
         * {{#each (item, index) in list}} ... {{/each}}
         * {{#each item in list}} ... {{$index}} ... {{/each}}
         * {{#template('템플릿태그 id', {key: value})}}
         * {{#raw name}} : escape html 처리를 하지 않은 값을 출력
         * {{# 표현식 #}}
         * {{$rootData.title}} : 어느 스코프에서든 루트에 있는 데이타를 가져올 수 있다.
         *
         * <script type="text/template" id="t0">
         *   :: {{subtitle}}
         *   </script>
         *   <script type="text/template" id="t2">
         *   {{title}}<br>
         *   {{#template('#t4', $root)}}
         *   </script>
         *   <script type="text/template" id="item">
         *   {{index + 1}} 점수: {{no > 2 ? "a" : "b"}} - 제목 : (escaped: {{item.title}}):(raw: {{#raw item.title}}), 내용 : {{item.desc}}!!<hr>
         *   </script>
         *   <script type="text/template" id="t4">
         *   {{#template('#t0', $rootData)}}<br><br>
         *   {{#each (item, index) in list}}
         *   {{#set no = index + 1}}
         *   {{#template('#item', {index:index, item: item, no: no})}}
         *   {{# if (index > 0) { #}}
        *       하하하하하<br>
        *   {{# } #}}
         *   {{/each}}
         *   {{#each item in list}}
         *   {{#set no = $index + 1}}
         *   {{$index + 1}}- 제목 : (escaped: {{item.title}}).<br>
         *   {{/each}}
         *   </script>
         *   <script>
         *   $('#box').html(vcui.template('#t2', {
      *      title: '리스트 제목',
      *      subtitle: '소 제목',
      *      list: [
      *          {title: "글제목 1", desc: '글내용 1'},
      *          {title: "글제목 2", desc: '글내용 2'},
      *          {title: "글제목 3", desc: '글내용 3'},
      *          {title: "<a>aa</a>", desc: '글내용 4'},
      *      ]
      *  }));
         *   </script>
         *
         */
        function (string, data) {
            if (!string) {
                return '';
            }
            if (string.substr(0, 1) === '#') {
                string = $(string).html() || '';
            }

            if (!/{{/.test(string)) {
                return !data ? function () {
                    return string;
                } : string;
            }

            string = string.replace(/\n/g, '').replace(/\s{2}/g, '');
            var fn = (function() {
                var body = (
                    "var me = this, $rootData = me.stash, $root = me.stash, ret = ''; try { " +
                    "with (me.stash) { " +
                    "ret += '" +
                    string
                        .replace(/{{({*)/g, '\x11$1')
                        .replace(/(}*)}}/g, '$1\x13')
                        .replace(/'(?![^\x11\x13]+?\x13)/g, '\\x27')
                        .replace(/\x11#template\(['"]?([^'|"]+)['"]?,?\s*([^\)]*)\)\x13/g, function(str, item, data) {
                            return "'; ret += me.template('" + item + "', " + (data || '{}') + "); ret += '";
                        })
                        .replace(/^\s*|\s*$/g, '')
                        .replace(/\x11#raw\s+([^\x13]+?)\x13/ig, "' + ($1) + '") //???
                        .replace(/\x11\{\s*([^\}]+?)\}\x13/ig, "' +  ($1 || '') + '")
                        .replace(/\x11=\s*([^\x13]+?)\x13/ig, "' + ($1 || '') + '")
                        .replace(/\x11#each\s+\(?([\w\.]+)[, ]*([\w\.]+)?\)?\s+in\s+([^\x13]+)\x13/gi, function(str, item, index, items) {
                            var key = (index ? index : '$index');
                            return "'; me.each(" + items + ", function(" + item + ", " + key + "){ " +
                                item + ".$index = " + key + "; ret += '";
                        })
                        .replace(/\x11\/each\x13/ig, function(str, item) {
                            return "';}); ret += '";
                        })
                        .replace(/\x11#if ([^\x13]+)\x13/g, function(str, item) {
                            item = item.replace(/'/g, '"');
                            return "'; if (" + item + "){ ret += '";
                        })
                        .replace(/\x11#elsif ([^\x13]+)\x13/g, function(str, item) {
                            item = item.replace(/'/g, '"');
                            return "';} else if (" + item + "){ ret += '";
                        })
                        .replace(/\x11#else\x13/g, function(str, item) {
                            return "';} else { ret += '";
                        })
                        .replace(/\x11\/if\x13/ig, function(str, item) {
                            return "';} ret += '";
                        })
                        .replace(/\x11#set ([^\x13]+)\x13/ig, function(str, item) {
                            return "'; var " + item + "; ret += '";
                        })
                        .replace(/\x11#\s+([^#]+?)\s+#\x13/ig, "'; \n$1 \nret += '") //!!!
                        .replace(/\x11([^\x13]+?)\x13/ig, "' + me.escapeHTML($1 || '') + '")
                    //.replace(/\x11(.+?)\x13/g, "'; $1; ret += '") +
                    +
                    "'; } return ret;" +
                    "} catch (e) { throw e; }"
                );

                try {
                    var func = new Function(body);
                } catch (e) {
                    console.error(body);
                    throw new Error('템플릿 문법에 오류가 있습니다.')
                }
                return function(stash) {
                    return func.call({
                        escapeHTML: core.string.escapeHTML,
                        each: core.each,
                        isEmpty: core.isEmpty,
                        rand: core.number.random,
                        ret: '',
                        blank: function(val) {
                            if (val == null) {
                                return '';
                            } else {
                                return val;
                            }
                        },
                        stash: stash
                    })
                };
            })();

            return data ? fn(data) : fn;
        };

})(jQuery, window[LIB_NAME], window);


;(function ($, core, global, undefined) {
    /**
     * @namespace
     * @name vcui.PubSub
     * @description 발행/구독 객체: 상태변화를 관찰하는 옵저버(핸들러)를 등록하여, 상태변화가 있을 때마다 옵저버를 발행(실행)
     * 하도록 하는 객체이다..
     * @example
     * // 옵저버 등록
     * vcui.PubSub.on('customevent', function() {
	 *	 alert('안녕하세요');
	 * });
     *
     * // 등록된 옵저버 실행
     * vcui.PubSub.trigger('customevent');
     */
    core.addon('PubSub', function () {

        var PubSub = $(global);

        var tmp = /** @lends vcui.PubSub */{
            /**
             * 이벤트 바인딩
             * @function
             * @param {string} name 이벤트명
             * @param {eventCallback} handler 핸들러
             * @return {vcui.PubSub}
             */
            on: function (name, handler) {
                return this;
            },

            /**
             * 이벤트 언바인딩
             * @param {string} name 이벤트명
             * @param {function} [handler] 핸들러
             * @return {vcui.PubSub}
             */
            off: function (name, handler) {
                return this;
            },

            /**
             * 이벤트 트리거
             * @param {string} name 이벤트명
             * @param {object} [data] 핸들러
             * @return {vcui.PubSub}
             */
            trigger: function (name, data) {
                return this;
            }
        };


        return PubSub;
    });

})(jQuery, window[LIB_NAME], window);


;(function (core, global, undefiend) {
    "use strict";

    /**
     * @function
     * @description helper 생성 함수
     * @name vcui.helper
     * @param {string} name 헬퍼 이름
     * @param {object} props class 속성
     * @returns {vcui.Class}
     */
    vcui.helper = function helper(name, props) {
        return core.helper[name] = props;
    };

})(window[LIB_NAME], window);

;(function ($, core, global, undefined) {
    var arraySlice = Array.prototype.slice;
    var doc = global.document;
    var $doc = $(doc);
    var $win = $(global);

    

// obj가 객체가 아닌 함수형일 때 함수를 실행한 값을 반환
    var execObject = function (obj, ctx) {
        return core.type(obj, 'function') ? obj.call(ctx) : obj;
    };

//
    function eventHandling(inst, type, isNorm, args) {
        if (!inst.$el) {
            return inst;
        }

        isNorm && (args[0] = inst._generateEventNS(args[0]));
        inst.$el[type].apply(inst.$el, args);

        return inst;
    }

    function ignoreUIData(data) {
        var result = {};
        core.each(data, function (val, name) {
            if (name.indexOf('ui_') !== 0) {
                result[name] = val;
            }
        });
        return result;
    }

    /**
     * 모든 UI요소 클래스의 최상위 클래스로써, UI클래스를 작성함에 있어서 편리한 기능을 제공해준다.
     * @class
     * @name vcui.ui.View
     * @extends vcui.BaseClass
     *
     * @example
     * // 상속받음으로써 자식클래스에서 할 수 있는 작업들
     * // 1. 윈도우 이벤트의 네임스페이스 자동관리
     * this.winOn('resize', function () { });
     * this.winOff('resize'); // 자신이 등록한 이벤트만 해제
     * // 2. document 이벤트의 네임스페이스 자동관리
     * this.docOn('mousemove', function () { });
     * this.docOff('mousemove'); // 자신이 등록한 이벤트만 해제
     * // 3. 빌드된 UI컴포넌트의 인스턴스 얻기
     * $('.ui_tab').vcTab();
     * var tab = $('.ui_tab').vcTab('instance');
     * tab.select(2);
     * // 4. 하위에서 엘리먼트 찾기
     * var $box = this.$('.box')
     * // 5. selectors속성에 지정된 셀렉터로 다시 조회할 수 있도록 함수 제공
     * this.updateSelectors();
     * // 6. 옵션 변경
     * this.option('selectIndex', 1); // set
     * var selectIndex = this.option('selectIndex'); // get
     */
    var View = core.BaseClass.extend(/** @lends vcui.ui.View# */{
        $name: 'View',
        $statics: {
            _instances: [] // 모든 인스턴스를 갖고 있는다..
        },

        /**
         * this.$el 를 root로 하여 하위에 존재하는 엘리먼트를 검색
         * @param {string} selector 셀렉터
         * @param {string} [parent] 상위요소
         * @returns {jQuery} this.$el 하위에서 selector에 해당하는 엘리먼트들
         * @example
         * var $btn = this.$('button');
         */
        $: function (selector, parent) {
            if (!this.$el) {
                return $();
            }
            return this.$el.find.apply(this.$el, arguments);
        },

        /**
         * 해당 엘리먼트에 빌드된 클래스 인스턴스를 반환
         * @return {klass} 해당 인스턴스
         * @example
         * var tab = $('div').Tabs('instance');
         */
        instance: function () {
            return this;
        },

        /**
         * 해당 클래스의 소속 엘리먼트를 반환
         * @return {jQuery} 해당 DOM 엘리먼트
         * @example
         * var tab = new Tab('#tab');
         * tab.getElement().hide();
         */
        getElement: function () {
            return this.$el;
        },


        /**
         * 생성자
         * @param {String|Element|jQuery} el 해당 엘리먼트(노드, id, jQuery 어떤 형식이든 상관없다)
         * @param {object} options 옵션값
         * @return {Object|boolean} false 가 반환되면, 이미 해당 엘리먼트에 해당 모듈이 빌드되어 있거나 disabled 상태임을 의미한다.
         */
        initialize: function (el, options) {
            options || (options = {});

            var self = this,
                moduleName;

            self.name = self.name || self.$name;
            if (!self.name) {
                throw new Error('[ui.View] 클래스의 이름이 없습니다');
            }

            moduleName = self.moduleName = core.string.toFirstLower(self.name);
            self.$el = el instanceof $ ? el : $(el);

            if (!el) {
                return false;
            }

            // dom 에 존재하는가
            var el = self.$el[0];
            if (el !== window && el !== doc && !$.contains(doc, el)) {
                return false;
            }

            if (self.$el.data('ui_' + self.moduleName)) {
                return false;
            }

            View._instances.push(self);
            self.el = self.$el[0]; // 원래 엘리먼트도 변수에 설정
            self.options = core.extend(true, {}, self.constructor.superClass.defaults, self.defaults, ignoreUIData(self.$el.data()), options); // 옵션 병합
            self.cuid = core.nextSeq();
            self.cid = moduleName + '_' + self.cuid; // 객체 고유 키
            self.eventNS = '.' + self.cid;
            self.$el.data('ui_' + self.moduleName, self);

            if (self.selectors && self.selectors.auto !== false) {
                self.updateSelectors();
            }
            self._renderTemplate();
            self._bindEventsByOption();
            self._setUIName();
        },

        /**
         * 빌드된 컴포넌트를 data-ui속성에 설정한다.
         * @private
         */
        _setUIName: function () {
            var self = this;

            //if (core.isDebug) {
            var ui = self.$el.attr('ui-modules');
            var uis = ui ? ui.split(',') : [];
            uis.push(self.name);

            self.$el.attr('ui-modules', uis.join(','));
            //}
        },

        _unsetUIName: function () {
            var self = this;
            var ui = self.$el.attr('ui-modules');
            var uis = ui ? ui.split(',') : [];

            uis = core.array.remove(uis, self.name);

            self.$el.attr('ui-modules', uis.join(','));
        },

        /**
         * 템플릿 렌더
         * @private
         */
        _renderTemplate: function () {
            var self = this;

            //self.templated = {};
            self._tmplCached = {};
            self.templates = core.extend({}, self.constructor.superClass.templates, self.templates, self.options.templates);

            /*if (core.isEmpty(self.templates)) { return; }
            core.each(self.templates, function (template, name) {
                self.templated[name] = core.template(template);
            });*/
            /*core.each(self.templates, function (item) {
                var tmpl = core.tmpl(item.value)(item.data||{});
                core.each(['append', 'prepend', 'insertBefore', 'insertAfter', 'html'], function (method) {
                    if (method in item) {
                        self.$(item[method])[method](tmpl);
                        return false;
                    }
                });
            });*/
        },

        /**
         * 옵션으로 넘어온 이벤트들을 바인딩함
         * @private
         */
        _bindEventsByOption: function () {
            var self = this,
                eventPattern = /^([^\s|\$]+) *([^$]*)$/i;

            // events 속성 처리
            // events: {
            //	'click ul>li.item': 'onItemClick', //=> this.$el.on('click', 'ul>li.item', this.onItemClick); 으로 변환
            // }
            self.options.events = core.extend(true, {},
                execObject(self.events, self),
                execObject(self.options.events, self));

            core.each(self.options.events, function (value, key) {
                var m;
                if (!(m = key.match(eventPattern))) {
                    return false;
                }

                var name = m[1],
                    selector = m[2] || '',
                    args = [name],
                    func = core.type(value, 'function') ? value : (core.type(self[value], 'function') ? self[value] : core.emptyFn);

                if (selector) {
                    args[args.length] = $.trim(selector);
                }

                // this를 UI클래스의 인스턴스로 설정
                args[args.length] = function () {
                    func.apply(self, arguments);
                };
                self.on.apply(self, args);
            });

            // options.on에 지정한 이벤트들을 클래스에 바인딩
            self.options.on && core.each(self.options.on, function (value, key) {
                // this는 이벤트가 발생한 엘리먼트이다
                self.on(key, value);
            });
        },

        /**
         * this.selectors를 기반으로 엘리먼트를 조회해서 멤버변수에 셋팅
         * @returns {vcui.ui.View}
         * @example
         * var Tab = vcui.ui.View.extend({
         *     selectors: { // 객체가 생성될 때 주어진 요소를 검색해서 멤버변수로 셋팅해주는 옵션
         *        btns: '>li>a',
         *        contents: '>li>div'
         *     },
         *     // ...         *
         * });
         * var tab = new Tab('#js-tab');
         * // 객체가 생성된 다음에 DOM이 동적으로 변경되었다면
         * tab.updateSelectors(); // 를 호출해줌으로써 다시 찾은 다음 멤버변수에 셋팅해준다.
         */
        updateSelectors: function () {
            var self = this;
            // selectors 속성 처리
            self.selectors = core.extend({},
                execObject(self.constructor.superClass.selectors, self),
                execObject(self.selectors, self),
                execObject(self.options.selectors, self));

            delete self.selectors.auto;
            core.each(self.selectors, function (value, key) {
                //if (!value) { return; }

                if (typeof value === 'string') {
                    self['$' + key] = self.$el.find(value);
                } else if (value instanceof $) {
                    self['$' + key] = value;
                } else {
                    self['$' + key] = $(value);
                }
                // me.ui[key] = me['$' + key];
            });

            return self;
        },

        /**
         * 옵션 설정함수
         *
         * @param {string} name 옵션명
         * @param {*} value 옵션값
         * @returns {vcui.ui.View} chaining
         * @fires vcui.ui.View#optionchange
         * @example
         * var tab = new Tab('#tab');
         * tab.on('optionchange', function(e, data){
         *     alert('옵션이 변경됨(옵션명:'+data.name+', 옵션값:'+data.value);
         * });
         *
         * tab.setOption('selectedIndex', 2); // alert('옵션이 변경됨(옵션명: selectedIndex, 옵션값: 2);
         */
        setOption: function (name, value) {
            this.options[name] = value;
            /**
             * 옵션이 변경됐을 때 발생
             * @event vcui.ui.View#optionchange
             * @type {object}
             * @property {string} name 옵션명
             * @property {*} value 옵션명
             */
            this.triggerHandler('optionchange', {name: name, value: value});
            return this;
        },

        /**
         * 옵션값 반환함수
         *
         * @param {string} name 옵션명
         * @param {*} def 옵션값이 없을 경우 기본값
         * @return {*} 옵션값
         * @example
         * var tab = new Tab('#tab');
         * tab.getOption('selectedIndex'); // 2
         */
        getOption: function (name, def) {
            var o = this.options[name];
            if (typeof o === 'undefined') {
                return def;
            }
            return o;
        },

        /**
         * 인자수에 따라 옵션값을 설정하거나 반환해주는 함수
         *
         * @param {string} name 옵션명
         * @param {*} [value] 옵션값: 없을 경우 name에 해당하는 값을 반환
         * @return {*}
         * @example
         * $('...').tabs('option', 'startIndex', 2); // set
         * $('...').tabs('option', {startIndex : 2}); // set object
         * $('...').tabs('option', 'startIndex'); // get // 2
         */
        option: function (name, value) {
            if (arguments.length === 1) {
                if(vcui.isObject(name)){
                    this.options = vcui.extend(this.options, name);
                    this.triggerHandler('optionchange', name);
                }else{
                    return this.getOption(name);
                }                
            } else {
                this.setOption(name, value);
            }
        },

        /**
         * 이벤트명에 현재 클래스 고유의 네임스페이스를 붙여서 반환 (ex: 'click mousedown' -> 'click.MyClassName mousedown.MyClassName')
         * @private
         * @param {String|$.Event} en 네임스페이스가 없는 이벤트명
         * @return {string} 네임스페이스가 붙어진 이벤트명
         */
        _generateEventNS: function (en) {
            if (en instanceof $.Event && en.type.indexOf('.') === -1) {
                en.type = en.type + this.eventNS;
                return en;
            }

            var self = this,
                m = (en || "").split(/\s/);
            if (!m || !m.length) {
                return en;
            }

            var name, tmp = [], i;
            for (i = -1; name = m[++i];) {
                if (name.indexOf('.') === -1) {
                    tmp.push(name + self.eventNS);
                } else {
                    tmp.push(name);
                }
            }
            return tmp.join(' ');
        },

        /**
         * 현재 클래스의 이벤트네임스페이스를 반환
         * @param {string} [eventName] 이벤트명
         * @return {string} 이벤트 네임스페이스
         * @example
         * var en = tab.makeEventNS('click mousedown');
         */
        makeEventNS: function (en) {
            if (en) {
                var pairs = en.split(' '),
                    tmp = [];
                for (var i = -1, pair; pair = pairs[++i];) {
                    if (pair.indexOf('.') > -1) {
                        tmp.push(pair);
                    } else {
                        tmp.push(pair + this.eventNS);
                    }
                }
                return tmp.join(' ');
            }
            return this.eventNS;
        },

        getEventNS: function () {
            return this.eventNS;
        },

        _trigger: function () {
            var args = arraySlice.call(arguments),
                prefix = this.moduleName.toLowerCase();
            if (typeof args[0] === 'string') {
                args[0] = prefix + args[0];
            } else {
                args[0].type = prefix + args[0].type;
            }
            return this.$el.trigger.apply(this.$el, args);
        },

        _triggerHandler: function () {
            var args = arraySlice.call(arguments),
                prefix = this.moduleName.toLowerCase();
            if (typeof args[0] === 'string') {
                args[0] = prefix + args[0];
            } else {
                args[0].type = prefix + args[0].type;
            }
            return this.$el.triggerHandler.apply(this.$el, args);
        },

        /**
         * me.$el에 이벤트 핸들러를 바인딩
         * @param {string} name 이벤트명
         * @param {string} [selector] 타겟
         * @param {eventCallback} handler 핸들러
         * @returns {vcui.ui.View} chaining
         * @example
         * var tab = new Tab('#tab');
         * tab.on('tabchanged', function(e, data){
         *     alert(data.selectedIndex);
         * });
         */
        on: function () {
            return eventHandling(this, 'on', true, arraySlice.call(arguments));
        },

        /**
         * me.$el에 등록된 이벤트 핸들러를 언바인딩
         * @param {string} name 이벤트명
         * @param {eventCallback} [handler] 핸들러
         * @returns {vcui.ui.View} chaining
         * @example
         * var tab = new Tab('#tab');
         * tab.off('tabchanged');
         */
        off: function () {
            return eventHandling(this, 'off', false, arraySlice.call(arguments));
        },

        /**
         * me.$el에 일회용 이벤트 핸들러를 바인딩
         * @param {string} name 이벤트명
         * @param {string} [selector] 타겟
         * @param {eventCallback} handler 핸들러
         * @returns {vcui.ui.View} chaining
         * @example
         * var tab = new Tab('#tab');
         * tab.one('tabchanged', function(e, data){
         *     alert(data.selectedIndex);
         * });
         */
        one: function () {
            return eventHandling(this, 'one', true, arraySlice.call(arguments));
        },

        /**
         * me.$el에 등록된 이벤트를 실행
         * @param {string} name 이벤트명
         * @param {*} data 데이타
         * @return {vcui.ui.View} chaining
         * @example
         * var tab = new Tab('#tab');
         * tab.trigger('tabchanged', {selectedIndex: 1});
         */
        trigger: function () {
            return eventHandling(this, 'trigger', false, arraySlice.call(arguments));
        },

        /**
         * 커스텀 이벤트 발생기(주어진 이벤트명 앞에 모듈명이 자동으로 붙는다)<br>
         *     this.customTrigger('expand'); // this.trigger('accordionexpand') 으로 변환
         * @param {string} name 이벤트명
         * @param {*} data 데이타
         * @return {vcui.ui.View} chaining
         * @example
         * var tab = new Tab('#tab');
         * tab.customTrigger('changed', {selectedIndex: 1});
         */
        customTrigger: function () {
            var args = arraySlice.call(arguments);
            args[0] = this.name + args[0];
            return this.trigger(this, 'trigger', false, args);
        },

        /**
         * me.$el에 등록된 이벤트 핸들러를 실행(실제 이벤트는 발생안하고 핸들러 함수만 실행)
         * @param {string} name 이벤트명
         * @param {*} data 데이타
         * @return {vcui.ui.View} chaining
         * @example
         * var tab = new Tab('#tab');
         * tab.triggerHandler('tabchanged', {selectedIndex: 1});
         */
        triggerHandler: function () {
            return eventHandling(this, 'triggerHandler', false, arraySlice.call(arguments));
        },

        uiTrigger: function () {
            var args = arraySlice.call(arguments);
            if (args[0].indexOf(this.name) < 0) {
                args[0] = this.name.toLowerCase() + args[0];
            }
            return eventHandling(this, 'trigger', false, args);
        },

        uiTriggerHandler: function () {
            var args = arraySlice.call(arguments);
            if (args[0].indexOf(this.name) < 0) {
                args[0] = this.name.toLowerCase() + args[0];
            }
            return eventHandling(this, 'triggerHandler', false, args);
        },

        /**
         * templates 속성에 등록된 템플릿문자열을 파싱하여 data를 적용하여 반환해준다.
         * @param id
         * @param data
         * @returns {*}
         */
        tmpl: function (id, data) {
            if (!this.templates || !this.templates[id]) { return ''; }
            if (!this._tmplCached[id]) { this._tmplCached[id] = core.template(this.templates[id]); }

            if (data !== false) {
                return this._tmplCached[id](data || {});
            } else {
                return this._tmplCached[id];
            }
        },

        /**
         * 해당컴포넌트와 관련하여 document에 이벤트를 등록하고자 할 경우 네임스페이스를 자동으로 붙여준다.
         * @param eventName
         * @returns {vcui.ui.View}
         * @example
         * var Tab = core.ui('Tab', {
         * :
         * _bindEvents: function () {
         *   // 아랫코드는 $(document).on('click.tab_1 mouseup.tab_1', function (){}) 와 동일하다.
         *   // 네임스페이스는 생성된 컴포넌트마다 자동생성되는 고유문자열이다.
         *   this.docOn('click mouseup', function (e) {
         *       ...
         *   });
         * }
         * :
         */
        docOn: function (eventName) {
            eventName = this.makeEventNS(eventName);
            $doc.on.apply($doc, [eventName].concat([].slice.call(arguments, 1)));
            return this;
        },

        /**
         * 해당컴포넌트와 관련하여 document에 일회용 이벤트를 등록하고자 할 경우 네임스페이스를 자동으로 붙여준다.
         * @param eventName
         * @returns {vcui.ui.View}
         * @example
         * var Tab = core.ui('Tab', {
         * :
         * _bindEvents: function () {
         *   // 아랫코드는 $(document).on('click.tab_1 mouseup.tab_1', function (){}) 와 동일하다.
         *   // 네임스페이스는 생성된 컴포넌트마다 자동생성되는 고유문자열이다.
         *   this.docOne('click mouseup', function (e) {
         *       ...
         *   });
         * }
         * :
         */
        docOne: function (eventName) {
            eventName = this.makeEventNS(eventName);
            $doc.one.apply($doc, [eventName].concat([].slice.call(arguments, 1)));
            return this;
        },

        /**
         * 해당컴포넌트와 관련하여 등록된 document 이벤트를 제거해준다.
         * @param eventName
         * @returns {vcui.ui.View}
         *
         * this.docOff(); // $(document).off('.tab_1'); 와 동일
         * this.docOff('click mouseup'); // $(document).off('click.tab_1 mouseup.tab_1'); 와 동일
         */
        docOff: function (eventName) {
            eventName = eventName ? this.makeEventNS(eventName) : this.getEventNS();
            //console.log(eventName);
            $doc.off.apply($doc, [eventName].concat([].slice.call(arguments, 1)));
            return this;
        },

        /**
         * 해당컴포넌트와 관련하여 window에 이벤트를 등록하고자 할 경우 네임스페이스를 자동으로 붙여준다.
         * @param eventName
         * @returns {vcui.ui.View}
         * @example
         * var Tab = core.ui('Tab', {
         * :
         * _bindEvents: function () {
         *   // 아랫코드는 $(window).on('click.tab_1 mouseup.tab_1', function (){}) 와 동일하다.
         *   // 네임스페이스는 생성된 컴포넌트마다 자동생성되는 고유문자열이다.
         *   this.winOn('click mouseup', function (e) {
         *       ...
         *   });
         * }
         * :
         */
        winOn: function (eventName) {
            $win.on.apply($win, [this.makeEventNS(eventName)].concat([].slice.call(arguments, 1)));
            return this;
        },

        /**
         * 해당컴포넌트와 관련하여 window에 일회용 이벤트를 등록하고자 할 경우 네임스페이스를 자동으로 붙여준다.
         * @param eventName
         * @returns {vcui.ui.View}
         * @example
         * var Tab = core.ui('Tab', {
         * :
         * _bindEvents: function () {
         *   // 아랫코드는 $(window).on('click.tab_1 mouseup.tab_1', function (){}) 와 동일하다.
         *   // 네임스페이스는 생성된 컴포넌트마다 자동생성되는 고유문자열이다.
         *   this.winOne('click mouseup', function (e) {
         *       ...
         *   });
         * }
         * :
         */
        winOne: function (eventName) {
            $win.one.apply($win, [this.makeEventNS(eventName)].concat([].slice.call(arguments, 1)));
            return this;
        },

        /**
         * 해당컴포넌트와 관련하여 등록된 window이벤트를 제거해준다.
         * @param eventName
         * @returns {vcui.ui.View}
         *
         * this.winOff(); // $(window).off('.tab_1'); 와 동일
         * this.winOff('click mouseup'); // $(window).off('click.tab_1 mouseup.tab_1'); 와 동일
         */
        winOff: function (eventName) {
            $win.off.apply($win, [eventName ? this.makeEventNS(eventName) : this.getEventNS()].concat([].slice.call(arguments, 1)));
            return this;
        },

        /**
         * 파괴자
         */
        destroy: function () {
            var self = this;

            self.triggerHandler('destroy');
            self._unsetUIName();

            self.$el.off(self.eventNS).removeData('ui_' + self.moduleName);
            self.winOff();
            self.docOff();

            // me에 등록된 엘리먼트들의 연결고리를 해제(메모리 해제대상)
            core.each(self, function (item, key) {
                if (key.substr(0, 1) === '$') {
                    self[key] = null;
                    delete self[key];
                }
            });
            self.el = null;

            core.array.remove(core.ui.View._instances, self);
        }
    });

    /**
     * @function
     * @description ui 모듈 생성 함수
     * @name vcui.ui
     * @param {string} name UI 모듈명
     * @param {vcui.Class} [supr] 부모 클래스
     * @param {object} props 클래스 속성
     * @return {vcui.Class}
     */
    var ui = core.ui = function (name, supr, attr) {
        var bindName,
            cls = {}; // 에러가 났을 때 클래스이름이 표시되도록 하기 위함

        if (core.ui[name]) {
            return core.ui[name];
        }

        if (!attr) {
            attr = supr;
            supr = View;
        }

        if (typeof supr === 'string') {
            supr = ui[supr];
        } else if (attr.$extend) {
            supr = attr.$extend
        }

        if (core.type(attr, 'function')) {
            if (!core.type(attr = attr(supr), 'function')) {
                bindName = attr.bindjQuery;
                cls[name] = supr.extend(name, attr);
            } else {
                cls[name] = attr;
            }
        } else {
            bindName = attr.bindjQuery;
            cls[name] = supr.extend(name, attr);
        }

        // 외부에서 디폴트 옵션을 설정한 경우 이를 defaults에 머지해준다.
        if (ui._templDefaults[name]) {
            attr.defaults || (attr.defaults = {});
            core.extend(true, attr.defaults, ui._templDefaults[name]);
            delete ui._templDefaults[name];
        }

        cls[name].prototype.name = name;
        ui[name] = cls[name];
        if (bindName) { // jquery plugin 방식으로 사용할 수 있도록 설정해준다.
            if (bindName === true) {
                bindName = core.string.toFirstLower(name);
            } else {
                bindName = core.string.toFirstLower(bindName);
            }
            ui.bindjQuery(cls[name], bindName, core.UI_PREFIX);
        }
        return cls[name];
    };

    ui.View = View;

// 삭제된 고아 엘리먼트에 빌드된 모듈을 메모리에서 해제
    ui.clearUIGarbage = function (all) {
        if (!ui.View) {
            return;
        }
        var items = ui.View._instances;
        for (var i = items.length, view; i--;) {
            view = items[i];
            if (all === true || (view.$el && !$.contains(document, view.$el[0]))) {
                try {
                    view.destroy();
                    view = null;

                    //items[i] = view = null;
                    //items.splice(i, 1);
                } catch (e) {
                    console.error('error remove', e);
                }
            }
        }
    };

    var garbageCallback;
    // 20초마다 엘리먼트 삭제여부를 체크하여 메모리상에 남아있는 객체를 제거한다.
    setTimeout(garbageCallback = function () {
        ui.clearUIGarbage();
        setTimeout(garbageCallback, 20000);
    }, 20000);

    /**
     * 작성된 UI모듈을 jQuery의 플러그인으로 사용할 수 있도록 바인딩시켜 주는 함수
     *
     * @function
     * @name vcui.ui.bindjQuery
     * @param {vcui.ui.View} Klass 클래스
     * @param {string} name 플러그인명
     *
     * @example
     * // 클래스 정의
     * var Slider = vcui.ui.View({
     *   initialize: function(el, options) { // 생성자의 형식을 반드시 지킬 것..(첫번째 인수: 대상 엘리먼트, 두번째
     *   인수: 옵션값들)
     *   ...
     *   },
     *   ...
     * });
     * vcui.ui.bindjQuery(Slider, 'slider');
     * // 실제 사용시
     * $('#slider').vcSlider({count: 10});
     *
     * // 객체 가져오기 : instance 키워드 사용
     * var slider = $('#slider').vcSlider('instance');
     * slider.move(2); // $('#slider').vcSlider('move', 2); 와 동일
     *
     * // 객체 해제하기 : destroy 키워드 사용
     * $('#slider').vcSlider('destroy');
     *
     * // 옵션 변경하기
     * $('#slider').option('effect', 'fade'); // 이때 optionchange 라는 이벤트가 발생된다.
     */
    ui.bindjQuery = function (Klass, name, prefix) {
        if (!prefix && prefix !== false) {
            prefix = core.UI_PREFIX;
        }
        var pluginName = prefix ? prefix + name.substr(0, 1).toUpperCase() + name.substr(1) : name,
            old = $.fn[pluginName];

        $.fn[pluginName] = function (options, isCreate) {
            var a = arguments,
                args = arraySlice.call(a, 1),
                isMethodCall = typeof options === 'string',
                returnValue = this;

            if (options === 'instance' && !this.length) {
                returnValue = null;
            }

            this.each(function () {
                var $this = $(this),
                    methodValue,
                    instance = $this.data('ui_' + name);

                if (instance) {
                    if (isMethodCall) {
                        switch (options) {
                            case 'destroy':
                                try {
                                    instance.destroy();
                                    instance = null;
                                } catch (e) {
                                }
                                //$this.removeData('ui_' + name);
                                return;
                            case 'instance':
                                returnValue = instance;
                                return false;
                        }
                    } else {
                        return;
                    }
                } else {
                    if (options === 'destroy') {
                        return;
                    } else if (options === 'instance' && isCreate === false) {
                        returnValue = null;
                        return false;
                    }
                }

                if (!instance || (a.length === 1 && typeof options !== 'string')) {
                    instance && (instance.destroy(), $this.removeData('ui_' + name));
                    instance = new Klass(this, core.extend({}, ignoreUIData($this.data()), options));
                }

                if (isMethodCall && typeof instance[options] === 'function') {
                    if (options.substr(0, 1) === '_') {
                        throw new Error('[bindjQuery] private 메소드는 호출할 수 없습니다.');
                    }

                    try {
                        methodValue = instance[options].apply(instance, args);
                    } catch (e) {
                        //console.error('[' + name + '.' + options + ' error] ' + e);
                    }

                    if (methodValue !== instance && methodValue !== undefined) {
                        returnValue = methodValue;
                        return false;
                    }
                }
            });

            return returnValue;
        };

        // 기존의 모듈로 복구
        $.fn[pluginName].noConflict = function () {
            $.fn[pluginName] = old;
            return this;
        };
    };

    /**
     * UI모듈의 기본옵션을 변경
     * @function
     * @name vcui.ui.setDefaults
     * @param {string} name ui모듈명(네임스페이스 제외)
     * @param {*} opts 옵션값들
     * @example
     * vcui.ui.setDefaults('Tab', {
     *     selectedIndex: 2
     * });
     */
    ui.setDefaults = function (name, opts) {
        if (core.ui[name]) {
            core.extend(true, core.ui[name].prototype.defaults, opts);
        } else {
            ui._templDefaults[name] = opts;
        }
    };
    ui._templDefaults = {};

})(jQuery, window[LIB_NAME], window);


;(function ($, core) {

    core.i18n = function (id, values, def) {
        var pairs = id.split('.');
        var node = core.i18n.entities || {};

        debugger
        if (!core.isPlainObject(values)) {
            def = values;
            values = {};
        }

        for (var i = -1, item; (item = pairs[++i]) && node[item];) {
            node = node[item] || null
        }

        if (!node || !core.isString(node)) {
            node = def || id;
        }
        if (node.indexOf('{{') > -1) {
            node = core.string.format(node, values)
        }
        return node || def || '';
    };

    core.i18n.localeEntities = {
        ko: {},
        en: {},
        jp: {},
        cn: {}
    };
    core.i18n.options = {
        locale: 'ko',
        fallback: 'en'
    };

    core.i18n.config = function (options) {
        if (arguments.length > 0) {
        core.extend(this.options, options)
        } else {
            return this.options;
        }
    };
    core.i18n.locale = function (locale) {
        if (arguments.length > 0) {
        this.config({
            locale: locale
        });
            this.entities = this.localeEntities[locale] || {};
        } else {
            return this.options.locale;
        }
    };
    core.i18n.set = function (node) {
        this.entities = $.extend(true, this.entities, node);
    };

    core.i18n.locale(navigator.language || navigator.userLanguage || 'ko');
})(jQuery, window[LIB_NAME]);

/**
 * jQuery 확장
 */
;(function ($, core, context, undefined) {
    "use strict";

    $.extend(jQuery.expr[':'], {
        focusable: function (el, index, selector) {
            // 160112 password type 추가
            return $(el).is('a, button, input[type=password], input[type=text], input[type=file], input[type=checkbox], input[type=radio], select, textarea, [tabindex]');
        }
    });

    /**
     * jQuery 객체
     * @class
     * @name $
     */
        // TODO: 뺄 것
    var oldOff = $.fn.off;
    /**
     * name 이벤트 언바인딩
     * @function
     * @name $#off
     * @return {jQuery}
     */
    /*$.fn.unbind = $.fn.off = function (name) {
        if ((this[0] === context || this[0] === document)
            && name !== 'ready' && name.indexOf('.') < 0) {
            throw new Error('[' + name + '] window, document에서 이벤트를 off할 때는 네임스페이스를 꼭 넣어주셔야 합니다.');
        }
        if (IS_DEBUG) {
            console.log('off', name);
            console.trace();
        }
        return oldOff.apply(this, arguments);
    };*/

    // TODO 테스트용
    /*if (IS_DEBUG) {
        var oldOn = $.fn.on;
        $.fn.on = function (name) {
            if (this[0] === context || this[0] === document) {
                console.log('on', name);
                console.trace();

            }
            return oldOn.apply(this, arguments);
        };
    }*/

    /**
     * value값의 앞뒤 빈문자 제거
     * @param {string} value 문자열 값
     * @param {string} value 문자열 값
     * @return {string} 빈값이 제거된 문자열
     */
    $.fn.trimVal = function (value) {
        if (arguments.length === 0) {
            return $.trim(this.val());
        } else {
            return this.val($.trim(value));
        }
    };

    /**
     * value값을 URI인코딩하여 반환
     * @function
     * @name $#encodeURI
     * @return {string} 인코딩된 문자열
     */
    $.fn.encodeURI = function (value) {
        if (arguments.length === 0) {
            return encodeURIComponent($.trim(this.val()));
        } else {
            return this.val(encodeURIComponent(value));
        }
    };

    /**
     * 클래스 치환
     * @function
     * @name $#replaceClass
     * @param {string} old 대상클래스
     * @param {string} newCls 치환클래스
     * @return {jQuery}
     */
    $.fn.replaceClass = function (old, newCls) {
        return this.each(function () {
            $(this).removeClass(old).addClass(newCls);
        });
    };

    /**
     * 아무것도 안하는 빈함수
     * @function
     * @name $#noop
     * @return {jQuery}
     * @example
     * $(this)[ isDone ? 'show' : 'noop' ](); // isDone이 true에 show하되 false일때는 아무것도 안함.
     */
    $.fn.noop = function () {
        return this;
    };

    /**
     * 체크된 항목의 값을 배열에 담아서 반환
     * @function
     * @name $#checkedValues
     * @return {array}
     */
    $.fn.checkedValues = function () {
        var results = [];
        this.each(function () {
            if ((this.type === 'checkbox' || this.type === 'radio') && !this.disabled && this.checked === true) {
                results.push(this.value);
            }
        });
        return results;
    };

    /**
     * 같은 레벨에 있는 다른 row에서 on를 제거하고 현재 row에 on 추가
     * @function
     * @name $#activeItem
     * @param {string} className='on' 활성 클래스명
     * @return {jQuery}
     */
    $.fn.activeItem = function (className, isActive) {
        className = className || 'on';
        if (typeof isActive === 'undefined') {
            isActive = true;
        }
        return this.toggleClass(className, isActive).siblings().toggleClass(className, !isActive).end();
    };

    /**
     * 해당 이미지가 로드됐을 때 콜백함수 실행
     * @function
     * @name $#onImgLoaded
     * @param {function(width:Number, height:Number)} callback width, height 인자를 갖는 콜백함수
     * @return {jQuery}
     */
    $.fn.onImgLoaded = function (callback) {
        core.util.waitImageLoad(this).done(callback);
        return this;
    };

    /**
     * 비동기 방식으로 이미지 사이즈를 계산해서 콜백함수로 넘겨준다.
     * @function
     * @name $#getImgSize
     * @param {function(width:Number, height:Number)} cb width, height 인자를 갖는 콜백함수
     * @return {jQuery}
     */
    $.fn.getImgSize = function (cb) {
        var $img = this.eq(0);
        $img.onImgLoaded(function () {
            cb && cb.call($img[0], $img.css('width', '').width(), $img.css('height', '').height());
        });
        return this;
    };


    $.fn.debounce = function (event, fn, time) {
        var timer;
        return this.on(event, function (e) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn(e);
            }, time || 250);
        });
    };

})(jQuery, window[LIB_NAME], window);

;(function ($, core){

    /*	This work is licensed under Creative Commons GNU LGPL License.

        License: http://creativecommons.org/licenses/LGPL/2.1/
        Version: 0.9
        Author:  Stefan Goessner/2006
        Web:     http://goessner.net/ 
    */

    core.xml2json = function (xml, tab) {
        var tab = tab? tab : '';
        var X = {
        toObj: function(xml) {
            var o = {};
            if (xml.nodeType==1) {   // element node ..
                if (xml.attributes.length)   // element with attributes  ..
                    for (var i=0; i<xml.attributes.length; i++)
                    o["@"+xml.attributes[i].nodeName] = (xml.attributes[i].nodeValue||"").toString();
                if (xml.firstChild) { // element has child nodes ..
                    var textChild=0, cdataChild=0, hasElementChild=false;
                    for (var n=xml.firstChild; n; n=n.nextSibling) {
                    if (n.nodeType==1) hasElementChild = true;
                    else if (n.nodeType==3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) textChild++; // non-whitespace text
                    else if (n.nodeType==4) cdataChild++; // cdata section node
                    }
                    if (hasElementChild) {
                    if (textChild < 2 && cdataChild < 2) { // structured element with evtl. a single text or/and cdata node ..
                        X.removeWhite(xml);
                        for (var n=xml.firstChild; n; n=n.nextSibling) {
                            if (n.nodeType == 3)  // text node
                                o["#text"] = X.escape(n.nodeValue);
                            else if (n.nodeType == 4)  // cdata node
                                o["#cdata"] = X.escape(n.nodeValue);
                            else if (o[n.nodeName]) {  // multiple occurence of element ..
                                if (o[n.nodeName] instanceof Array)
                                o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
                                else
                                o[n.nodeName] = [o[n.nodeName], X.toObj(n)];
                            }
                            else  // first occurence of element..
                                o[n.nodeName] = X.toObj(n);
                        }
                    }
                    else { // mixed content
                        if (!xml.attributes.length)
                            o = X.escape(X.innerXml(xml));
                        else
                            o["#text"] = X.escape(X.innerXml(xml));
                    }
                    }
                    else if (textChild) { // pure text
                    if (!xml.attributes.length)
                        o = X.escape(X.innerXml(xml));
                    else
                        o["#text"] = X.escape(X.innerXml(xml));
                    }
                    else if (cdataChild) { // cdata
                    if (cdataChild > 1)
                        o = X.escape(X.innerXml(xml));
                    else
                        for (var n=xml.firstChild; n; n=n.nextSibling)
                            o["#cdata"] = X.escape(n.nodeValue);
                    }
                }
                if (!xml.attributes.length && !xml.firstChild) o = null;
            }
            else if (xml.nodeType==9) { // document.node
                o = X.toObj(xml.documentElement);
            }
            else
                alert("unhandled node type: " + xml.nodeType);
            return o;
        },
        toJson: function(o, name, ind) {
            var json = name ? ("\""+name+"\"") : "";
            if (o instanceof Array) {
                for (var i=0,n=o.length; i<n; i++)
                    o[i] = X.toJson(o[i], "", ind+"\t");
                json += (name?":[":"[") + (o.length > 1 ? ("\n"+ind+"\t"+o.join(",\n"+ind+"\t")+"\n"+ind) : o.join("")) + "]";
            }
            else if (o == null)
                json += (name&&":") + "null";
            else if (typeof(o) == "object") {
                var arr = [];
                for (var m in o)
                    arr[arr.length] = X.toJson(o[m], m, ind+"\t");
                json += (name?":{":"{") + (arr.length > 1 ? ("\n"+ind+"\t"+arr.join(",\n"+ind+"\t")+"\n"+ind) : arr.join("")) + "}";
            }
            else if (typeof(o) == "string")
                json += (name&&":") + "\"" + o.toString() + "\"";
            else
                json += (name&&":") + o.toString();
            return json;
        },
        innerXml: function(node) {
            var s = ""
            if ("innerHTML" in node)
                s = node.innerHTML;
            else {
                var asXml = function(n) {
                    var s = "";
                    if (n.nodeType == 1) {
                    s += "<" + n.nodeName;
                    for (var i=0; i<n.attributes.length;i++)
                        s += " " + n.attributes[i].nodeName + "=\"" + (n.attributes[i].nodeValue||"").toString() + "\"";
                    if (n.firstChild) {
                        s += ">";
                        for (var c=n.firstChild; c; c=c.nextSibling)
                            s += asXml(c);
                        s += "</"+n.nodeName+">";
                    }
                    else
                        s += "/>";
                    }
                    else if (n.nodeType == 3)
                    s += n.nodeValue;
                    else if (n.nodeType == 4)
                    s += "<![CDATA[" + n.nodeValue + "]]>";
                    return s;
                };
                for (var c=node.firstChild; c; c=c.nextSibling)
                    s += asXml(c);
            }
            return s;
        },
        escape: function(txt) {
            return txt.replace(/[\\]/g, "\\\\")
                        .replace(/[\"]/g, '\\"')
                        .replace(/[\n]/g, '\\n')
                        .replace(/[\r]/g, '\\r');
        },
        removeWhite: function(e) {
            e.normalize();
            for (var n = e.firstChild; n; ) {
                if (n.nodeType == 3) {  // text node
                    if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) { // pure whitespace text node
                    var nxt = n.nextSibling;
                    e.removeChild(n);
                    n = nxt;
                    }
                    else
                    n = n.nextSibling;
                }
                else if (n.nodeType == 1) {  // element node
                    X.removeWhite(n);
                    n = n.nextSibling;
                }
                else                      // any other node
                    n = n.nextSibling;
            }
            return e;
        }
        };
        if (xml.nodeType == 9) // document node
        xml = xml.documentElement;
        var json = X.toJson(X.toObj(X.removeWhite(xml)), xml.nodeName, "\t");
        return "{\n" + tab + (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, "")) + "\n}";
    }


})(jQuery, window[LIB_NAME]);
