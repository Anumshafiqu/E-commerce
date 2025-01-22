export interface Iproduct {
  productId: number
  productSku: string
  productName: string
  productPrice: number
  productShortName: string
  productDescription: string
  createdDate: string
  deliveryTimeSpan: string
  categoryId: number
  productImageUrl: string
  categoryName: string
}


export interface APIresponseModel {
  message: string,
  result: boolean,
  data: any,
}
export interface CategoryModel {
  categoryId: number,
  categoryName: string,
  parentCategoryId: number,
  userId: number,
}
export class cartClass {
  CartId: number;
  CustId: number;
  ProductId: number;
  Quantity: number;
  AddedDate: Date;
  constructor() {
    this.AddedDate = new Date();
    this.CartId = 0;
    this.CustId = 2147483647;
    this.ProductId = 2147483647;
    this.Quantity = 0;

  }
}
