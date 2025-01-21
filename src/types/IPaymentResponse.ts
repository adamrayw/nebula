export interface IPaymentResponse {
    data: midtrans
}

export interface midtrans {
    redirect_url: string;
    token: string;
}