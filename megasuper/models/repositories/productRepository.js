import path from "node:path"
import fs from "node:fs/promises"
import { Producto } from "../entities/producto.js"

export class ProductRepository {
  static productsPath = path.join("data", "productos.json")

  async findAll() {
    const data = await fs.readFile(ProductRepository.productsPath)
    const dataObjects = JSON.parse(data)
    const productos = mapToProducts(dataObjects)
    return productos
  }

  async findByPage(pageNum, limitNum) {
    const productos = await this.findAll()
    const offset = (pageNum - 1) * limitNum
    return productos.slice(offset, offset + limitNum)
  }

  async countAll() {
    const prods = await this.findAll()
    return prods.length
  }

  async findById(id) {
    const prods = await this.findAll()
    const producto = prods.find(p => p.id === id)
    return producto
  }

  async findByName(nombre) {
    const prods = await this.findAll()
    const producto = prods.find(p => p.nombre === nombre)
    return producto
  }

  async save(producto) {
    const prods = await this.findAll()
    producto.id = prods.length +1
    prods.push(producto)
    const dataObjects = mapToDataObjects(prods)
    await fs.writeFile(ProductRepository.productsPath, JSON.stringify(dataObjects))
    return producto
  }

  async deleteById(id) {
    const productos = await this.findAll()
    const index = productos.findIndex(p => p.id === id)
    if (index === -1) return false
    productos.splice(index, 1)
    const dataObjects = mapToDataObjects(productos)
    await fs.writeFile(ProductRepository.productsPath, JSON.stringify(dataObjects))
    return true
  }

  async update(producto) {
    const productos = await this.findAll() 
    const index = productos.findIndex(p => p.id === producto.id)
    if (index === -1) return null
    productos[index] = producto
    const dataObjects = mapToDataObjects(productos)
    await fs.writeFile(ProductRepository.productsPath, JSON.stringify(dataObjects))
    return producto
  }
}

function mapToProducts(dataObjects) {
  return dataObjects.map(mapToProduct)
}

function mapToProduct(dataObject) {
  const { nombre, descripcion, precioBase } = dataObject
  const prod = new Producto(nombre, precioBase, descripcion)
  prod.id = dataObject.id
  return prod
}

function mapToDataObject(producto) {
  const { nombre, descripcion, precioBase } = producto
  return {
    id: producto.id,
    nombre,
    descripcion,
    precioBase
  }
}

function mapToDataObjects(productos) {
  return productos.map(mapToDataObject)
}
