import { Injectable } from '@angular/core';
import { PoDynamicFormField } from '@po-ui/ng-components';


@Injectable({
  providedIn: 'root'
})
export class DynamicviewService {

  constructor() { }

  getDynamicFipeFields() :PoDynamicFormField[] {
    return [
      {
        property: "Marca",
        label: "Marca do Veículo",
        order: 1,
        gridColumns: 4,
        disabled: true,
        divider:"Dados do Veículo"
      },
      {
        property:"Modelo",
        label: "Modelo do Veículo",
        order: 2,
        gridColumns: 4,
        disabled: true
      
      },
      {
        property:"CodigoFipe",
        label:"Codigo da Fipe",
        order: 3,
        gridColumns: 4,
        disabled: true
      },
      {
        property:"AnoModelo",
        label:"Ano do Veículo",
        order: 4,
        gridColumns: 4,
        disabled: true,
      },
      {
        property:"Combustivel",
        label: "Tipo do Combustível",
        order: 5,
        gridColumns: 4,
        disabled: true
      },
      {
        property: "Valor",
        label: "Valor do Veículo",
        order: 6,
        gridColumns: 4,
        disabled: true,
      }
    ]
  }
}
