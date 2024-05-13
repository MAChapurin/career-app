export = getter;
/**
 * @param {HashableObject} obj object with updateHash method
 * @param {string | HashConstructor} hashFunction the hash function to use
 * @returns {LazyHashedEtag} etag
 */
declare function getter(obj: HashableObject, hashFunction?: string | HashConstructor): LazyHashedEtag;
declare namespace getter {
    export { Hash, HashConstructor, HashableObject };
}
type HashableObject = {
    updateHash: (arg0: Hash) => void;
};
type HashConstructor = any;
/** @typedef {any} Hash */
/** @typedef {any} HashConstructor */
/**
 * @typedef {Object} HashableObject
 * @property {function(Hash): void} updateHash
 */
declare class LazyHashedEtag {
    /**
     * @param {HashableObject} obj object with updateHash method
     * @param {string | HashConstructor} hashFunction the hash function to use
     */
    constructor(obj: HashableObject, hashFunction?: string | HashConstructor);
    _obj: HashableObject;
    _hash: string | undefined;
    _hashFunction: any;
    /**
     * @returns {string} hash of object
     */
    toString(): string;
}
type Hash = any;
