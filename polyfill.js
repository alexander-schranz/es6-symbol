'use strict';

var d = require('d')

  , create = Object.create, defineProperties = Object.defineProperties
  , generateName, Symbol, HiddenSymbol;

generateName = (function () {
	var created = create(null);
	return function (desc) {
		var postfix = 0;
		while (created[desc + (postfix || '')]) ++postfix;
		desc += (postfix || '');
		created[desc] = true;
		return '@@' + desc;
	};
}());

HiddenSymbol = function Symbol(description) {
	if (this instanceof HiddenSymbol) throw new TypeError('TypeError: Symbol is not a constructor');
	return Symbol(description);
};
module.exports = Symbol = function Symbol(description) {
	var symbol;
	if (this instanceof Symbol) throw new TypeError('TypeError: Symbol is not a constructor');
	symbol = create(HiddenSymbol.prototype);
	description = (description === undefined ? '' : String(description));
	return defineProperties(symbol, {
		__description__: d('', description),
		__name__: d('', generateName(description))
	});
};
defineProperties(Symbol, {
	create: d('', Symbol('create')),
	hasInstance: d('', Symbol('hasInstance')),
	isConcatSpreadable: d('', Symbol('isConcatSpreadable')),
	isRegExp: d('', Symbol('isRegExp')),
	iterator: d('', Symbol('iterator')),
	toPrimitive: d('', Symbol('toPrimitive')),
	toStringTag: d('', Symbol('toStringTag')),
	unscopables: d('', Symbol('unscopables'))
});
defineProperties(HiddenSymbol.prototype, {
	constructor: d(Symbol),
	toString: d('', function () { return this.__name__; })
});

Object.defineProperty(Symbol.prototype, 'toString',
	d(function () { return 'Symbol (' + this.__description__ + ')'; }));
Object.defineProperty(Symbol.prototype, Symbol.toPrimitive, d('',
	function (hint) { throw new TypeError("Conversion of symbol objects is not allowed"); }));
Object.defineProperty(Symbol.prototype, Symbol.toStringTag, d('c', 'Symbol'));

Object.defineProperty(HiddenSymbol.prototype, Symbol.toPrimitive,
	d('c', Symbol.prototype[Symbol.toPrimitive]));
Object.defineProperty(HiddenSymbol.prototype, Symbol.toStringTag,
	d('c', Symbol.prototype[Symbol.toStringTag]));
