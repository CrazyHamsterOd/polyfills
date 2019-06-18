Object.create = function (obj, props) {
    if (typeof obj !== 'object') {
        throw TypeError('first parametr is not an object!');
    }

    function NewObj() { };
    NewObj.prototype = obj;

    var newObj = new NewObj();

    if (typeof props === 'object') {
        for (prop in props) {
            if (props.hasOwnProperty(prop)) {
                newObj[prop] = props[prop];
            }
        }
    }

    return newObj;
}

Object.keys = function (obj) {
    if (typeof obj !== 'object' && typeof obj !== 'funciton' && obj === null) {
        throw TypeError('incorrect object!')
    }

    var arr = [];
    var counter = 0;

    for (prop in obj) {
        arr[i] = prop;
        counter++;
    }

    return arr;
}

Array.prototype.pop = function () {
    if (this.length === 0) {
        return undefined;
    }

    var lastIndex = this.length - 1;
    var element = this[lastIndex];

    this.length = lastIndex;

    return element;
}

Array.prototype.push = function () {
    if (arguments.length > 0) {
        for (arg in arguments) {
            this[this.length] = arguments[arg];
        }
    }

    return this.length;
}

Array.prototype.shift = function () {
    if (this.length === 0) {
        return undefined;
    }

    var element = this[0];

    for (var i = 0; i < this.length - 1; i++) {
        this[i] = this[i + 1];
    }
    this.length = this.length - 1;

    return element;
}

Array.prototype.unshift = function () {
    if (arguments.length = 0) {
        return this.length;
    }

    for (arg in arguments) {
        for (var i = this.length; i > 0; i--) {
            this[i] = this[i - 1];
        }
        this[0] = arguments[arg];
    }

    return this.length;
}

Array.prototype.map = function (callback, thisArg) {
    if (typeof callback !== 'function') {
        throw TypeError('callback is not a function');
    }

    var result = [];

    if (thisArg === undefined) {
        thisArg = this;
    }

    for (var i = 0; i < thisArg.length; i++) {
        result[result.length] = callback(thisArg[i], i, thisArg);
    }

    return result;
}

Array.prototype.forEach = function (callback, thisArg) {
    if (typeof callback !== 'function') {
        throw TypeError('callback is not a function');
    }

    if (thisArg === undefined) {
        thisArg = this;
    }

    for (var i = 0; i < thisArg.length; i++) {
        callback(thisArg[i], i, thisArg);
    }
}

Array.prototype.filter = function (callback, thisArg) {
    if (typeof callback !== 'function') {
        throw TypeError('callback is not a function');
    }

    var result = [];

    if (thisArg === undefined) {
        thisArg = this;
    }

    for (var i = 0; i < thisArg.length; i++) {
        if (callback(thisArg[i], i, thisArg)) {
            result[result.length] = thisArg[i];
        }
    }

    return result;
}

Array.prototype.reverse = function () {
    //-- ver. 1--//
    // var tempArr = [];
    // for (var i = 0; i < this.length; i++) {
    //     tempArr[i] = this[this.length - i - 1];
    // }

    // for (i = 0; i < tempArr.length; i++) {
    //     this[i] = tempArr[i];
    // }

    // return this;

    //-- ver. 2--//
    var temp;

    for (var i = 0; i < Math.ceil(this.length / 2); i++) {
        temp = this[i];
        this[i] = this[this.length - i - 1]
        this[this.length - i - 1] = temp;
    }

    return this;
}

Array.prototype.join = function (separator) {
    var str = '';

    if (separator === undefined) separator = ',';

    for (var i = 0; i < this.length; i++) {
        str = str + this[i] + ((i === this.length - 1) ? '' : separator);
    }

    return str;
}

Array.prototype.reduce = function (callback, initialValue) {
    if (typeof callback !== 'function') {
        throw TypeError('callback is not a function');
    }

    var accumulator = (initialValue === undefined) ? 0 : initialValue;

    for (var i = 0; i < this.length; i++) {
        accumulator = callback(accumulator, this[i], i, this);
    }

    return accumulator;
}

Array.prototype.sort = function (callback) {
    if (callback !== undefined && typeof callback !== 'function') {
        throw TypeError('callback is not a function');
    }

    var sorted = false;
    var temp;

    function replase(arr, position) {
        temp = arr[position];
        arr[position] = arr[position + 1];
        arr[position + 1] = temp;
    }

    while (!sorted) {
        sorted = true;

        for (var i = 0; i < this.length - 1; i++) {
            if ((callback === undefined && (this[i].toString() > this[i + 1].toString()))) {
                sorted = false;
                replase(this, i);
            }
            if (callback !== undefined && callback(this[i], this[i + 1]) !== 0) {
                sorted = false;
                replase(this, i);
            }
        }
    }
}

Function.prototype.bind = function (thisArg) {

    var args = [];
    var self = this;

    for (var i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i];
    }

    return function () {
        var offset = (args.length > 0) ? args.length : 0;
        for (var i = 0; i < arguments.length; i++) {
            args[i + offset] = arguments[i];
        }
        return self.apply(thisArg === undefined ? this : thisArg, args);
    }

}

Object.freeze = function (obj) {
    var props = [];
    var counter = 0;

    for (key in obj) {
        props[counter] = key;
        counter++;
    }

    for (var i = 0; i < props.length; i++) {
        var desc = Object.getOwnPropertyDescriptor(obj, props[i]);

        if ("value" in desc) {
            desc.writable = false;
        }

        desc.configurable = false;
        Object.defineProperty(obj, props[i], desc);
    }

    return Object.preventExtensions(obj);
}

Array.prototype.some = function (callback, thisArg) {
    if (typeof callback !== 'function') {
        throw TypeError('callback is not a function');
    }

    if (thisArg === undefined) {
        thisArg = this;
    }

    if(thisArg.length === 0){
        return false;
    }

    for (var i = 0; i < thisArg.length; i++) {
        if (callback(thisArg[i], i, thisArg)) {
            return true;
        }
    }

    return false;
}

Array.prototype.every = function (callback, thisArg) {
    if (typeof callback !== 'function') {
        throw TypeError('callback is not a function');
    }

    if (thisArg === undefined) {
        thisArg = this;
    }

    if(thisArg.length === 0){
        return true;
    }

    for (var i = 0; i < thisArg.length; i++) {
        if (!callback(thisArg[i], i, thisArg)) {
            return false;
        }
    }

    return true;
}