import { Component, OnInit, model, Injectable } from '@angular/core';
import { IResponse } from '../../models/response.model';
import { CardComponent } from '../../components/card/card.component';
import { FipeService } from '../../services/fipe.service';
import { Subscription, catchError, subscribeOn } from 'rxjs';
import { PoDynamicFormField, PoDynamicModule, PoFieldModule, PoLoadingModule, PoMenuModule, PoPageModule, PoSelectOption, PoToolbarModule } from '@po-ui/ng-components';
import { veiculosOptions } from '../../shared/veiculos-options/veiculos.options';
import { IModelos } from '../../models/modelos.model';
import { IAnos } from '../../models/ano.models';
import { ITabelaFipeRequest } from '../../models/fipe.request.model';
import { IFipeResponse } from '../../models/fipe.response.models';
import { DynamicviewService } from '../../services/dynamicview.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardComponent,
    PoFieldModule,
    PoLoadingModule,
    PoDynamicModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  tipoVeiculoSelecionado: any;
  opcoesVeiculos: PoSelectOption[] = [];
  tipoVeiculos: IResponse[] = [];
  marcasVeiculosBackup: IResponse[] = [];
  opcoesMarcas: PoSelectOption[] = [];
  marcaSelecionada: any;
  opcoesModelos: PoSelectOption[] = [];
  tipoModelosVeiculos: IModelos[] = [];
  modelosVeiculos: IModelos[] = [];
  modeloVeiculosBackup: IModelos[] = [];
  modeloVeiculoSelecionado: any;
  marcaVeiculoSelecionada: any;
  anoVeiculo: IResponse[] = [];
  anoVeiculoBackup: IAnos[] = [];
  opcoesAno: PoSelectOption[] = [];
  mostrarLoading: boolean = false;
  fullFipe?: IFipeResponse;
  selectedItem: PoSelectOption = {value: '', label: ''};
  formFipeFields: PoDynamicFormField[] = [];
  
  constructor( 
    private _FipeService: FipeService,
    private _DynamicForm: DynamicviewService
  ){}

  private tipoSubscription: Subscription | undefined;
  private modeloSubscription: Subscription | undefined;
  private anoSubscription: Subscription | undefined;
  private fipeSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.opcoesVeiculos = veiculosOptions;   
    this.formFipeFields = this._DynamicForm.getDynamicFipeFields();
  }

  //metodo/função que lista o carro
  listarMarcasVeiculos(tipoVeiculo: string){
    this.mostrarLoading = true;
    //o marcaCarrosSubscription fica observando
    //faz a requisição pra API
    this.tipoSubscription = this._FipeService.getVeiculoPorTipo(tipoVeiculo).pipe(
      //tratamento de erro
      catchError(error => {
        console.error(error)
        this.mostrarLoading = false;
        return[];
      })
      //metodo subscrive para se inscrever 
      // ser der certo ele res vai ser do TIPO IMarcas
      ).subscribe((res: IResponse) => { 
        if(this.tipoVeiculos.length == 0){
          this.tipoVeiculos = this.tipoVeiculos.concat(res);
          this.mostrarLoading = false;
          
        }else{
          this.tipoVeiculos.length = 0;
          this.tipoVeiculos = this.tipoVeiculos.concat(res);
          this.mostrarLoading = false;
        }
        //se tiver marcasCarro ele vai alimentar a variavel
        // this.marcasVeiculos = this.marcasVeiculos(res);
        this.marcasVeiculosBackup = this.tipoVeiculos;

        if(this.tipoVeiculos.length > 0){
          this.popularSelect();
        }
    } )
  }


  listarModelos(codigoModeloVeiculo: string){
    this.mostrarLoading = true;
    this.marcaVeiculoSelecionada = codigoModeloVeiculo;

    this.modeloSubscription = this._FipeService.getVeiculoModelo(this.tipoVeiculoSelecionado, codigoModeloVeiculo).pipe(
      catchError(error => {
        console.error(error)
        this.mostrarLoading = false;
        return[];
      })
    ).subscribe((res: IModelos) => {
      if(this.tipoModelosVeiculos.length == 0){
        this.tipoModelosVeiculos = this.tipoModelosVeiculos.concat(res);
        this.mostrarLoading = false;
      }else{
        this.tipoModelosVeiculos.length = 0;
        this.tipoModelosVeiculos = this.tipoModelosVeiculos.concat(res);
        this.mostrarLoading = false;
      }
      this.modeloVeiculosBackup = this.tipoModelosVeiculos;

      if(this.tipoModelosVeiculos.length > 0){
        this.popularSelectModelo();
      }
    })
  };

  listarAno(modeloVeiculo: string){
    this.modeloVeiculoSelecionado = modeloVeiculo;
    this.mostrarLoading = true;
    this.anoSubscription =  this._FipeService.getAnoVeiculo( this.tipoVeiculoSelecionado, this.marcaVeiculoSelecionada, modeloVeiculo).pipe(
      catchError(error => {
        this.mostrarLoading = false;
        return[];
      })
    ).subscribe((res: IResponse) => {
      console.log("resultado do res", res);
      this.anoVeiculo = this.anoVeiculo.concat(res);

      if(this.anoVeiculo.length == 0 ){
        this.anoVeiculo = this.anoVeiculo.concat(res);
        this.mostrarLoading = false;
      }else{
        this.anoVeiculo.length = 0;
        this.anoVeiculo = this.anoVeiculo.concat(res);
        this.mostrarLoading = false;
      }

      this.anoVeiculoBackup = this.anoVeiculo;

      if(this.anoVeiculo.length > 0){
        this.popularSelectAno();
      }
      console.log("ano veiculo" , this.anoVeiculo);
      this.mostrarLoading = false;
    })
  };

  popularSelect(){
    this.opcoesMarcas = this.tipoVeiculos.map((x) => {
      return ({label: x.nome , value: x.codigo})
    }) 
  };

  popularSelectModelo(){
    let modelos = this.modeloVeiculosBackup.flatMap((x) => {
      return x.modelos;
    });

    this.opcoesModelos = modelos.map( (y) => {
      return ({label: y.nome, value: y.codigo});
    })
  };

  popularSelectAno(){
    this.opcoesAno = this.anoVeiculo.map((x) => {
      return ({label: x.nome , value: x.codigo})
    })
  };

  getTipoVeiculo(event: any){
    this.tipoVeiculoSelecionado = event;
    this.listarMarcasVeiculos(event);
  };

  getOpcaoModelo(event: any){
    let opcaoEscolhida = event;
    this.listarAno(event);
  }

  listarFipe(event: any){
    this.mostrarLoading = true;
    let fipeRequest: ITabelaFipeRequest = {
      tipoVeiculo: this.tipoVeiculoSelecionado,
      codigoMarcaVeiculo: this.marcaVeiculoSelecionada,
      codigoModeloVeiculo: this.modeloVeiculoSelecionado,
      anoVeiculo: event
    }
    this.fipeSubscription = this._FipeService.getFullFipe(fipeRequest).pipe(
      catchError(error => {
        this.mostrarLoading = false;
        return[];
      })
    ).subscribe((res: IFipeResponse) => {
      this.fullFipe = res;
      this.mostrarLoading = false;
    })

  }

  
  //funcionabilidade canonica que recarrega a pagina
  recarregarPagina(){
    window.location.reload();
    this.mostrarLoading = true;
  }
}
