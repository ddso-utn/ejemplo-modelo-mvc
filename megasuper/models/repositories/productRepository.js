export class ProductRepository {
    constructor() {
      this.productos = [];
      this.nextId = 1;
    }
  
    findAll() {
      return this.productos;
    }

    findByPage(pageNum, limitNum) {
      const offset = (pageNum - 1) * limitNum;
      return this.productos.slice(offset, offset + limitNum);
    }
    
    countAll() {
      return this.productos.length;
    }
  
    findById(id) {
      return this.productos.find(p => p.id === id);
    }
  
    findByName(nombre) {
      return this.productos.find(p => p.nombre === nombre);
    }
  
    save(producto) {
      producto.id = this.nextId++;
      this.productos.push(producto);
      return producto;
    }
  
    deleteById(id) {
      const index = this.productos.findIndex(p => p.id === id);
      if (index === -1) return false;
      this.productos.splice(index, 1);
      return true;
    }
  
    update(producto) {
      const index = this.productos.findIndex(p => p.id === producto.id);
      if (index === -1) return null;
      this.productos[index] = producto;
      return producto;
    }
  }
  