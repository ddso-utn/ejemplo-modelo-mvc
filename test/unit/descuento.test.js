import {
  DescuentoFijo,
  DescuentoPorcentual,
  DescuentoPorCantidad,
} from "../../megasuper/models/entities/descuento.js"

describe("Descuento fijo", () => {
  test("El valor descontado de un descuento fijo", () => {
    const descuentoFijo = new DescuentoFijo(20)

    expect(descuentoFijo.valor).toBe(20)
  })

  test("No se puede instanciar un descuento fijo con un valor negativo", () => {
    expect(() => {
      new DescuentoFijo(-20)
    }).toThrow("El valor del descuento no puede ser negativo")
  })
})

describe("Descuento porcentual", () => {
  test("El valor descontado de un descuento porcentual", () => {
    const descuentoPorcentual = new DescuentoPorcentual(20)

    expect(descuentoPorcentual.valorDescontado(100, 2)).toBe(40)
  })
})

describe("Descuento por cantidad", () => {
  test("El valor descontado de un descuento por cantidad", () => {
    const descuentoPorCantidad = new DescuentoPorCantidad(2, 20)

    expect(descuentoPorCantidad.valorDescontado(100, 5)).toBe(40)
  })

  test("El valor descontado de un descuento por cantidad con cantidad menor a la minima", () => {
    const descuentoPorCantidad = new DescuentoPorCantidad(2, 100)

    expect(descuentoPorCantidad.valorDescontado(100, 1)).toBe(0)
  })
})
