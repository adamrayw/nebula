export interface IPayment {
    userId: string;
    paymentUrl: string;
    transaksiId: string;
    type: string;
    price: number;
    status: string;
    createdAt: string;
}

export interface ICreatePayment {
    userId: string;
    price: number;
    type: string;
}

export interface IPaymentResponse extends IPayment {
    data: midtrans
}

export interface midtrans {
    payment: midtrans_data;
}

export interface midtrans_data {
    paymentUrl: string;
    token: string; 
}