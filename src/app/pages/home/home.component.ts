import { Component, OnInit } from '@angular/core';
import { IMarcas } from '../../models/marcas.model';
import { CardComponent } from '../../components/card/card.component';
import { MarcasService } from '../../services/marcas.service';
import { Subscription, catchError, subscribeOn } from 'rxjs';
import { PoFieldModule, PoLoadingModule, PoMenuModule, PoPageModule, PoSelectOption, PoToolbarModule } from '@po-ui/ng-components';
import { veiculosOptions } from '../../shared/veiculos-options/veiculos.options';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardComponent,
    PoFieldModule,
    PoLoadingModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  marcasVeiculos: IMarcas[] = [];
  marcasVeiculosBackup: IMarcas[] = [];
  opcoesMarcas: PoSelectOption[] = [];
  opcoesVeiculos: PoSelectOption[] = [];
  tipoVeiculoSelecionado: any;
  marcaSelecionada: any;
  mostrarLoading: boolean = false;
  selectedItem: PoSelectOption = {value: '', label: ''};
  

  //injetando o a service MarcasServices em _marcaCarrosService
  constructor(private _marcaCarrosService: MarcasService){}


  //criando a variavel que observa 
  private marcaCarrosSubscription: Subscription | undefined;

  //toda vez que inicializa o projeto ele faz esse role
  ngOnInit(): void {
    this.opcoesVeiculos = veiculosOptions;   
  }

  //metodo/função que lista o carro
  listarMarcasVeiculos(tipoVeiculo: string){
    this.mostrarLoading = true;
    //o marcaCarrosSubscription fica observando
    //faz a requisição pra API
    this.marcaCarrosSubscription = this._marcaCarrosService.getVeiculoPorTipo(tipoVeiculo).pipe(
      //tratamento de erro
      catchError(error => {
        console.error(error)
        this.mostrarLoading = false;
        return[];
      })
      //metodo subscrive para se inscrever 
      // ser der certo ele res vai ser do TIPO IMarcas
      ).subscribe((res: IMarcas) => {
        console.log(res);
        if(this.marcasVeiculos.length == 0){
          this.marcasVeiculos = this.marcasVeiculos.concat(res);
          this.mostrarLoading = false;
          
        }else{
          this.marcasVeiculos.length = 0;
          this.marcasVeiculos = this.marcasVeiculos.concat(res);
          this.mostrarLoading = false;
        }
        

        //se tiver marcasCarro ele vai alimentar a variavel
        // this.marcasVeiculos = this.marcasVeiculos(res);
        this.marcasVeiculosBackup = this.marcasVeiculos;
        if(this.marcasVeiculos.length > 0){
          this.popularSelect();
        }
    } )
  }
    
  popularSelect(){
    this.opcoesMarcas = this.marcasVeiculos.map((x) => {
      return ({label: x.nome , value: x.codigo})

    })
    // 
  }

  getOpcao(event: any){
    let opcaoEscolhida = event;
    
    this.marcasVeiculos = this.marcasVeiculosBackup.filter((x) => {
      return x.codigo == opcaoEscolhida
      
    })
    
  }

  getTipoVeiculo(event: any){
    this.listarMarcasVeiculos(event);
  }
  


  //funcionabilidade canonica que recarrega a pagina
  recarregarPagina(){
    window.location.reload();
    this.mostrarLoading = true;
    
  }

}
