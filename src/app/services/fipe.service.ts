import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { IResponse } from '../models/response.model';
import { IModelos } from '../models/modelos.model';
import { IAnos } from '../models/ano.models';
import { ITabelaFipeRequest } from '../models/fipe.request.model';
import { IFipeResponse } from '../models/fipe.response.models';

@Injectable({
  providedIn: 'root'
})
export class FipeService {

  constructor(
    private _http: HttpClient
  ) { }

  private _url = environment.apiUrl;
  
  //fazer requisao http para api atraves de carro/marcas
  getMarcaCarro(){
    return this._http.get<IResponse>(`${this._url}/carros/marcas`)
  }

  getMarcaCaminhao(){
    return this._http.get<IResponse>(`${this._url}/caminhoes/marcas`)
  }

  getVeiculoPorTipo(tipoVeiculo: string){
    return this._http.get<IResponse>(`${this._url}/${tipoVeiculo}/marcas`)
  }

  getVeiculoModelo(tipoVeiculo: string, codigoMarcaVeiculo: string){
    return this._http.get<IModelos>(`${this._url}/${tipoVeiculo}/marcas/${codigoMarcaVeiculo}/modelos`)
  }

  getAnoVeiculo(tipoVeiculo: string, codigoMarcaVeiculo: string, codigoModeloVeiculo: string){
    return this._http.get<IAnos>(`${this._url}/${tipoVeiculo}/marcas/${codigoMarcaVeiculo}/modelos/${codigoModeloVeiculo}/anos`)
  }

  getFullFipe(veiculoFull: ITabelaFipeRequest){
    return this._http.get<IFipeResponse>(`${this._url}/${veiculoFull.tipoVeiculo}/marcas/${veiculoFull.codigoMarcaVeiculo}/modelos/${veiculoFull.codigoModeloVeiculo}/anos/${veiculoFull.anoVeiculo}`)
  }
}