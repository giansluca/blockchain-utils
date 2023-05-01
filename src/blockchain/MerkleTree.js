class MerkleTree {
    constructor(leaves, concat) {
        this.leaves = leaves;
        this.concat = concat;
    }

    getRoot() {
        return this._getRoot(this.leaves);
    }

    _getRoot(currentLayer) {
        if (currentLayer.length == 1) return currentLayer[0];

        const nextLayer = [];
        for (let i = 0; i < currentLayer.length; i += 2) {
            if (i + 1 == currentLayer.length) break;

            const newNode = this.concat(currentLayer[i], currentLayer[i + 1]);
            nextLayer.push(newNode);
        }

        return this._getRoot(nextLayer);
    }
}

module.exports = MerkleTree;
