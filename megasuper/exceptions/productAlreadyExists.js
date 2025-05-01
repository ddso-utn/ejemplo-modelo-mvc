export class ProductAlreadyExistsError extends Error {
  constructor(nombre) {
    super()
    this.message = `Poducto con nombre ${nombre} ya existe`
  }
}
