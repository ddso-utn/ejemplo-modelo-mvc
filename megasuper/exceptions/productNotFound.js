export class ProductNotFoundError extends Error {
    constructor(productId) {
        super()
        this.productId = productId
        this.message = `Product with ID ${this.productId} not found`
    }
}
