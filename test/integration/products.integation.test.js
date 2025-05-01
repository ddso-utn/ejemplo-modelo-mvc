import request from "supertest"
import { buildTestServer } from "./utils/server.js"
import { ProductService } from "../../megasuper/services/productService.js"
import { ProductController } from "../../megasuper/controllers/productController.js"
import productRoutes from "../../megasuper/routes/productRoutes.js"
import { describe, expect, jest, test } from "@jest/globals"
import { Producto } from "../../megasuper/models/entities/producto.js"

const server = buildTestServer()

server.addRoute(productRoutes)
server.configureRoutes()

const productRepository = {
  findByPage: jest.fn().mockResolvedValue([
    {
      id: 1,
      nombre: "Producto 1",
      precioBase: 100,
      descripcion: "Descripcion 1",
    },
    {
      id: 2,
      nombre: "Producto 2",
      precioBase: 200,
      descripcion: "Descripcion 2",
    },
  ]),
  countAll: jest.fn().mockResolvedValue(2),
}
const productService = new ProductService(productRepository)
const productController = new ProductController(productService)

server.setController(ProductController, productController)

describe("GET /products", () => {
  test("debe retornar un estado 200 y 2 productos", async () => {
    const response = await request(server.app).get("/products")

    expect(response.status).toBe(200)
    expect(response.body.page).toBe(1)
    expect(response.body.per_page).toBe(10)
    expect(response.body.total).toBe(2)
    expect(response.body.total_pages).toBe(1)
    expect(response.body.data.length).toBe(2)
  })

  test("debe retornar un estado 200 y un producto por pagina", async () => {
    productRepository.findByPage = jest.fn().mockResolvedValue([
      {
        id: 1,
        nombre: "Producto 1",
        precioBase: 100,
        descripcion: "Descripcion 1",
      },
    ])

    const response = await request(server.app).get("/products?page=1&limit=1")

    expect(response.status).toBe(200)
    expect(response.body.page).toBe(1)
    expect(response.body.per_page).toBe(1)
    expect(response.body.total).toBe(2)
    expect(response.body.total_pages).toBe(2)
    expect(response.body.data.length).toBe(1)
  })

  test("debe retornar un estado 200 y 10 productos por defecto", async () => {
    productRepository.countAll.mockResolvedValue(100)

    productRepository.findByPage.mockResolvedValue([
      {
        id: 1,
        nombre: "Producto 1",
        precioBase: 100,
        descripcion: "Descripcion 1",
      },
      {
        id: 2,
        nombre: "Producto 2",
        precioBase: 200,
        descripcion: "Descripcion 2",
      },
      {
        id: 3,
        nombre: "Producto 3",
        precioBase: 300,
        descripcion: "Descripcion 3",
      },
      {
        id: 4,
        nombre: "Producto 4",
        precioBase: 400,
        descripcion: "Descripcion 4",
      },
      {
        id: 5,
        nombre: "Producto 5",
        precioBase: 500,
        descripcion: "Descripcion 5",
      },
      {
        id: 6,
        nombre: "Producto 6",
        precioBase: 600,
        descripcion: "Descripcion 6",
      },
      {
        id: 7,
        nombre: "Producto 7",
        precioBase: 700,
        descripcion: "Descripcion 7",
      },
      {
        id: 8,
        nombre: "Producto 8",
        precioBase: 800,
        descripcion: "Descripcion 8",
      },
      {
        id: 9,
        nombre: "Producto 9",
        precioBase: 900,
        descripcion: "Descripcion 9",
      },
      {
        id: 10,
        nombre: "Producto 10",
        precioBase: 1000,
        descripcion: "Descripcion 10",
      },
    ])

    const response = await request(server.app).get("/products")

    expect(response.status).toBe(200)
    expect(response.body.page).toBe(1)
    expect(response.body.per_page).toBe(10)
    expect(response.body.total).toBe(100)
    expect(response.body.total_pages).toBe(10)
    expect(response.body.data.length).toBe(10)
  })
})

describe("POST /products", () => {
  test("debe retornar un estado 201 y el producto creado", async () => {
    const newProduct = {
      nombre: "Producto 1",
      precioBase: 100,
      descripcion: "Descripcion 1",
    }

    productRepository.findByName = jest.fn().mockResolvedValue(null)

    productRepository.save = jest.fn()

    const response = await request(server.app)
      .post("/products")
      .send(newProduct)

    expect(response.status).toBe(201)
    expect(productRepository.save).toHaveBeenCalled()
    expect(productRepository.save).toHaveBeenCalledWith(expect.any(Producto))
  })

  test("debe retornar un estado 400 si falta el nombre", async () => {
    const newProduct = {
      precioBase: 100,
      descripcion: "Descripcion 1",
    }

    const response = await request(server.app)
      .post("/products")
      .send(newProduct)

    expect(response.status).toBe(400)
    expect(response.body.error).not.toBeUndefined()
  })

  test("debe retornar un estado 400 si falta el precio base", async () => {
    const newProduct = {
      nombre: "Producto 1",
      descripcion: "Descripcion 1",
    }

    const response = await request(server.app)
      .post("/products")
      .send(newProduct)

    expect(response.status).toBe(400)
    expect(response.body.error).not.toBeUndefined()
  })

  test("debe retornar un estado 400 si el precio base no es un numero", async () => {
    const newProduct = {
      nombre: "Producto 1",
      precioBase: "no es un numero",
      descripcion: "Descripcion 1",
    }

    const response = await request(server.app)
      .post("/products")
      .send(newProduct)

    expect(response.status).toBe(400)
    expect(response.body.error).not.toBeUndefined()
  })
})
