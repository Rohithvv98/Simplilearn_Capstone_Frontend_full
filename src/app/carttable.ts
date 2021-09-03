export class CartTable{
    cartid:number;
    productName: string;
    price :number;
    quantity :number;
    total: number;

    constructor(cartid:number,productName: string,price:number,quantity:number,total:number)
    {
        this.cartid=cartid;
        this.productName=productName;
        this.price=price;
        this.quantity=quantity;
        this.total=total;
    }

}