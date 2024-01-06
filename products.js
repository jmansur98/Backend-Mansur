class ProductManager {
    constructor() {
      this.products = [];
      this.productIdCounter = 1;
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error("todos los campos son obligatorios.");
        return;
      }
  
      if (this.products.some(product => product.code === code)) {
        console.error("producto existente.");
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
      console.log("producto agregado:", newProduct);
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const foundProduct = this.products.find(product => product.id === id);
  
      if (foundProduct) {
        return foundProduct;
      } else {
        console.error("no se encontro el producto.");
      }
    }
  }
  
const productManager = new ProductManager();

productManager.addProduct("Producto 1", "Descripción 1", 10.55, "imagen1.jpg", "P001", 100);

const allProducts1 = productManager.getProducts();
console.log("productos totales (primera vez):", allProducts1);

productManager.addProduct("Producto 2", "Descripción 2", 17.99, "imagen2.jpg", "P002", 50);

const allProducts2 = productManager.getProducts();
console.log("productos totales (segunda vez):", allProducts2);

productManager.addProduct("Producto 3", "Descripción 3", 23.561, "imagen3.jpg", "P001", 75);

const allProducts3 = productManager.getProducts();
console.log("productos totales después de intento de código repetido:", allProducts3);

const productIdToFind = 1;
const foundProduct = productManager.getProductById(productIdToFind);
console.log("producto encontrado por ID:", foundProduct);

const nonExistentProductId = 999;
const nonExistentProduct = productManager.getProductById(nonExistentProductId);

  