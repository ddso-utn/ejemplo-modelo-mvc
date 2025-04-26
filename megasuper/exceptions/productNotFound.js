export class ProductNotFoundError extends Error {
    constructor(productId) {
        this.productId = productId
        const message = `Poduct with ID ${this.productId} not found`
    }
}
