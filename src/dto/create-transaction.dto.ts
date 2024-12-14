/* eslint-disable prettier/prettier */
export class CreateTransactionDto {
    user: string;
    type: string;
    amount: number;
    status?: string; // Optional as 'pending' is the default
}
