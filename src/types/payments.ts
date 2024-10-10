export interface InvoiceI {
    paidBy: string;
    amount: number;
    amount_captured: number;
    billing_details: object;
    status: string;
}