import { ProductDTO } from "./catalogGateway";
import Item from "./item";

export default class Order {
  items: Item[] = [];

  constructor() {}

  addProduct(product: ProductDTO, quantity: number) {
    this.items.push(new Item(product.productId, product.price, quantity));
  }

  getTotal() {
    let total = 0;
    for (const item of this.items) {
      total += item.getTotal();
    }
    return total;
  }
}
