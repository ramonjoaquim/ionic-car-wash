import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListasService {

  public static cliente: Array<string>;
  public static veiculo: Array<string>;
  
  constructor() {
    ListasService.cliente = [];
    ListasService.veiculo = [];
   }

  setListaCliente(listaCliente:string) {

    ListasService.cliente.push(listaCliente);
  }

  getListaCliente() {
    return ListasService.cliente;
  }

  setListaVeiculo(listaVeiculo:string) {

    ListasService.veiculo.push(listaVeiculo);
  }

  getListaVeiculo() {
    return ListasService.veiculo;
  }


}


