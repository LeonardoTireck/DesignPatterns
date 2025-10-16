import CalculateCheckout from "../../../../../src/gof/structural/adapter/checkout/calculateCheckout";
import { CatalogGatewayHttp } from "../../../../../src/gof/structural/adapter/checkout/catalogGateway";
import {
  AxiosAdapter,
  FetchAdapter,
} from "../../../../../src/gof/structural/adapter/checkout/httpClient";

// const httpClient = new AxiosAdapter();
const httpClient = new FetchAdapter();
const catalogGateway = new CatalogGatewayHttp(httpClient);
const calculateCheckout = new CalculateCheckout(catalogGateway);

test("Deve calcular o checkout", async function () {
  const input = {
    items: [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 2 },
      { productId: 3, quantity: 3 },
    ],
  };
  const output = await calculateCheckout.execute(input);
  expect(output.total).toBe(1400);
});
