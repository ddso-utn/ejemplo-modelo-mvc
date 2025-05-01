export class DescuentoFijo {
  constructor(valor) {
    if (valor < 0) {
      throw new Error("El valor del descuento no puede ser negativo")
    }
    this.valor = valor
  }

  valorDescontado(_precioBase, _cantidad) {
    return this.valor
  }
}

export class DescuentoPorcentual {
  constructor(porcentaje) {
    this.porcentaje = porcentaje
  }

  valorDescontado(precioBase, cantidad) {
    return (cantidad * precioBase * this.porcentaje) / 100
  }
}

export class DescuentoPorCantidad {
  constructor(cantidadMinima, porcentaje) {
    this.cantidadMinima = cantidadMinima
    this.porcentaje = porcentaje
  }

  valorDescontado(precioBase, cantidad) {
    const vecesRepetido = Math.floor(cantidad / this.cantidadMinima)
    let valorDescontado = 0
    valorDescontado = precioBase * (this.porcentaje / 100) * vecesRepetido
    return Math.min(valorDescontado, precioBase * cantidad)
  }
}
