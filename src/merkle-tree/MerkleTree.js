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

        // Since our merkle tree is a binary tree, each layer combines its pairs,
        // resulting in half the number of nodes.
        // This means we should cut our index in half and round down.
        const nextLayer = this._getNextLayer(currentLayer);
        const nextIndex = Math.floor(currentIndex / 2);

        const currentNodeIsFinalSolitary = this._isFinalSolitaryNode(currentLayer, currentIndex);
        if (!currentNodeIsFinalSolitary) {
            const currentNodeIsLeft = this._isEvenIndex(currentIndex);
            const proofNode = currentNodeIsLeft ? currentLayer[currentIndex + 1] : currentLayer[currentIndex - 1];
            const proofNodeIsLeft = !currentNodeIsLeft;

            proof.push({ data: proofNode, left: proofNodeIsLeft });
        }

        this._getProof(nextLayer, nextIndex, proof);
    }

    _getNextLayer(currentLayer) {
        const nextLayer = [];

        for (let i = 0; i < currentLayer.length; i += 2) {
            const left = currentLayer[i];
            const right = currentLayer[i + 1];

            if (right) {
                nextLayer.push(this.concat(left, right));
            } else {
                nextLayer.push(left);
            }
        }

        return nextLayer;
    }

    _isFinalSolitaryNode(currentLayer, index) {
        if (index + 1 == currentLayer.length && this._isEvenIndex(index)) return true;
        else return false;
    }

    _isEvenIndex(index) {
        if (index % 2 == 0) return true;
        else return false;
    }
}

function verifyProof(proof, node, root, concat) {
    let data = node;

    for (let i = 0; i < proof.length; i++) {
        const nodePair = proof[i].left ? [proof[i].data, data] : [data, proof[i].data];
        data = concat(nodePair[0], nodePair[1]);
    }

    return root === data ? true : false;
}

module.exports = {
    MerkleTree: MerkleTree,
    verifyProof: verifyProof,
};
