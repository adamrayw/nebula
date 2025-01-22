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

export interface IPaymentResponse {
    data: midtrans
}

export interface midtrans {
    midtrans: midtrans_data;
}

export interface midtrans_data {
    redirect_url: string;
    token: string; 
}