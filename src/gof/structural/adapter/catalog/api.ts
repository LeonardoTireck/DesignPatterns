import GetProduct from "./getProduct";
import { ExpressAdapter, HapiAdapter } from "./httpServer";
import { ProductRepositoryMemory } from "./productRepository";

// const httpServer = new ExpressAdapter();
const httpServer = new HapiAdapter();
const productRepository = new ProductRepositoryMemory();
const getProduct = new GetProduct(productRepository);

httpServer.register("get", "/products/:{productId}", async function (req: any) {
  const productId = parseInt(req.params.productId);
  const product = await getProduct.execute(productId);
  return product;
});

httpServer.listen(3001);
