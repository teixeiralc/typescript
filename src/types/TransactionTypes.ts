declare global {
  type TPaymentMethods = 'Cartão de Crédito' | 'Boleto';
  type TTransactionStatus =
    | 'Paga'
    | 'Recusada pela operadora de cartão'
    | 'Aguardando pagamento'
    | 'Estornada';
  interface ITransactionAPI {
    Nome: string;
    ID: number;
    Status: TTransactionStatus;
    Data: string;
    Email: string;
    ['Valor (R$)']: string;
    ['Cliente Novo']: number;
    ['Forma de Pagamento']: TPaymentMethods;
  }
  interface ITransaction {
    nome: string;
    id: number;
    status: TTransactionStatus;
    data: Date;
    email: string;
    moeda: string;
    valor: number | null;
    clienteNovo: boolean;
    formaDePagamento: TPaymentMethods;
  }
}

export {};
