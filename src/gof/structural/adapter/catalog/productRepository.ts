import Product from "./product";

export default interface ProductRepository {
  save(product: Product): Promise<void>;
  getById(productId: number): Promise<Product>;
}

export class ProductRepositoryMemory implements ProductRepository {
  products: Product[] = [
    {
      productId: 1,
      description: "A",
      price: 100,
    },
    {
      productId: 2,
      description: "B",
      price: 200,
    },
    {
      productId: 3,
      description: "C",
      price: 300,
    },
  ];

  async save(product: Product): Promise<void> {
    this.products.push(product);
  }
  async getById(productId: number): Promise<Product> {
    const product = this.products.find((p) => p.productId === productId);
    if (!product) throw new Error("Product not found");
    return product;
  }
}
