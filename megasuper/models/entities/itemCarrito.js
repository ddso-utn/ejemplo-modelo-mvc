export class ItemCarrito {
  constructor(producto, cantidad) {
    this.producto = producto
    this.cantidad = cantidad
    this.descuentos = []
  }

  agregarDescuento(nuevoDescuento) {
    this.descuentos.push(nuevoDescuento)
  }

  precioFinal() {
    const precioBaseTotal = this.producto.precioBase * this.cantidad
    const precioFinal = this.descuentos.reduce(
      (precioAnterior, descuento) =>
        precioAnterior -
        descuento.valorDescontado(this.precioBase, this.cantidad),
      precioBaseTotal,
    )
    return Math.max(0, precioFinal)
  }

  get precioBase() {
    return this.producto.precioBase
  }
}
