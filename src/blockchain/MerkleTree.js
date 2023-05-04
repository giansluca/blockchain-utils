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

        const nextLayer = this._getNextLayer(currentLayer);
        return this._getRoot(nextLayer);
    }

    getProof(index) {
        const proof = [];
        this._getProof(this.leaves, index, proof);

        return proof;
    }

    _getProof(currentLayer, currentIndex, proof) {
        if (currentLayer.length == 1) return;

        const currentNodeIsOdd = this._isOddNode(currentLayer, currentIndex);
        if (!currentNodeIsOdd) {
            const currentNodeIsLeft = this._isEvenIndex(currentIndex);
            const proofNode = currentNodeIsLeft ? currentLayer[currentIndex + 1] : currentLayer[currentIndex - 1];
            const proofNodeIsLeft = !currentNodeIsLeft;

            proof.push({ data: proofNode, left: proofNodeIsLeft });
        }

        // Since our merkle tree is a binary tree, each layer combines its pairs resulting in half the number of nodes.
        // This means we should cut our index in half and round down.

        const nextLayer = this._getNextLayer(currentLayer);
        const nextIndex = Math.floor(currentIndex / 2);
        this._getProof(nextLayer, nextIndex, proof);
    }

    _getNextLayer(currentLayer) {
        const nextLayer = [];
        for (let i = 0; i < currentLayer.length; i += 2) {
            if (this._isOddNode(currentLayer, i)) {
                const oddNode = currentLayer[i];
                nextLayer.push(oddNode);
                break;
            }

            const newNode = this.concat(currentLayer[i], currentLayer[i + 1]);
            nextLayer.push(newNode);
        }

        return nextLayer;
    }

    _isOddNode(currentLayer, index) {
        if (index + 1 == currentLayer.length && this._isEvenIndex(index)) return true;
        else return false;
    }

    _isEvenIndex(number) {
        if (number % 2 == 0) return true;
        else return false;
    }
}

module.exports = MerkleTree;
