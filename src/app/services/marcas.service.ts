import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { IMarcas } from '../models/marcas.model';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {

  constructor(
    private _http: HttpClient
  ) { }

  private _url = environment.apiUrl;
  
  //fazer requisao http para api atraves de carro/marcas
  getMarcaCarro(){
    return this._http.get<IMarcas>(`${this._url}/carros/marcas`)
  }

  getMarcaCaminhao(){
    return this._http.get<IMarcas>(`${this._url}/caminhoes/marcas`)
  }

  getVeiculoPorTipo(tipoVeiculo: string){
    return this._http.get<IMarcas>(`${this._url}/${tipoVeiculo}/marcas`)
  }

}