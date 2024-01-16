const fs = require('fs');
//importacon de modulo fs para poder leer y escribir archivos

class ProductManager {
  // constructor recibe el path del archivo
  constructor(filePath) {
    this.path = filePath;
    // ruta del archivo json
    this.products = this.readFromFile();
    // lee el archivo y lo guarda en products
    this.productIdCounter = this.products.length > 0 ? Math.max(...this.products.map(product => product.id)) + 1 : 1;
    // si hay productos, el contador de id es el maximo id + 1, sino es 1
  }

  readFromFile() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      // lee el archivo y lo guarda en data
      return JSON.parse(data);
      // parsea el archivo a json
    } catch (error) {
      console.error("Error al leer el archivo:", error.message);
      throw error; // Lanza la excepción para manejarla en otro lu
    }
  }
// Estos métodos readFromFile y writeToFile manejan la lectura y escritura de
  // los productos desde y hacia un archivo JSON.
  writeToFile() {
    const data = JSON.stringify(this.products, null, 2);
    // convierte el array de productos a json
    fs.writeFileSync(this.path, data, 'utf8');
    // escribe el json en el archivo
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    // si alguno de los campos esta vacio, no se agrega el producto
    if (!title || !description || isNaN(price) || !thumbnail || !code || isNaN(stock)) {
      console.error("Campos inválidos o faltantes.");
      return; 
    // si el precio o el stock no son numeros, no se agrega el producto
    }


    if (this.products.some(product => product.code === code)) {
      // si el codigo ya existe, no se agrega el producto
      console.error("Producto existente.");
      return;
    }

    const newProduct = {
      id: this.productIdCounter++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    };

    this.products.push(newProduct);
    this.writeToFile();
    console.log("Producto agregado:", newProduct);
  }

  getProducts() {
    return this.products;
    // devuelve todos los productos
  }

  getProductById(id) {
    const foundProduct = this.products.find(product => product.id === id);
    // busca el producto por id
    if (foundProduct) {
      return foundProduct;
    } else {
      console.error("No se encontró el producto.");
    }
  }

  updateProduct(id, updatedFields) {
    const index = this.products.findIndex(product => product.id === id);
    // busca el producto por id y devuelve el indice

    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedFields };
      this.writeToFile();
      console.log("Producto actualizado:", this.products[index]);
    } else {
      console.error("No se encontró el producto para actualizar.");
    }
  }

  deleteProduct(id) {
    const index = this.products.findIndex(product => product.id === id);

    if (index !== -1) {
      const deletedProduct = this.products.splice(index, 1)[0];
      this.writeToFile();
      console.log("Producto eliminado:", deletedProduct);
    } else {
      console.error("No se encontró el producto para eliminar.");
    }
  }
}

const productManager = new ProductManager('productos.json');
// crea una instancia de ProductManager

productManager.addProduct("Producto 1", "Descripción 1", 10.55, "imagen1.jpg", "P001", 100);
productManager.addProduct("Producto 2", "Descripción 2", 17.99, "imagen2.jpg", "P002", 50);
productManager.updateProduct(1, { price: 15.99, stock: 90 });
productManager.deleteProduct(2);
// agrega, actualiza y elimina productos

const allProducts = productManager.getProducts();
console.log("Productos totales:", allProducts);

const productIdToFind = 1;
const foundProduct = productManager.getProductById(productIdToFind);
console.log("Producto encontrado por ID:", foundProduct);

const nonExistentProductId = 999;
const nonExistentProduct = productManager.getProductById(nonExistentProductId);
console.log("Producto no encontrado por ID:", nonExistentProduct);
