import { Component, OnInit } from '@angular/core';
import { IMarcas } from '../../models/marcas.model';
import { CardComponent } from '../../components/card/card.component';
import { MarcasService } from '../../services/marcas.service';
import { Subscription, catchError, subscribeOn } from 'rxjs';
import { PoFieldModule, PoSelectOption } from '@po-ui/ng-components';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardComponent,
    PoFieldModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  marcasCarro: IMarcas[] = [];
  marcasCarroBackup: IMarcas[] = [];
  opcoesMarcas: PoSelectOption[] = [];
  

  //injetando o a service MarcasServices em _marcaCarrosService
  constructor(private _marcaCarrosService: MarcasService){}


  //criando a variavel que observa 
  private marcaCarrosSubscription: Subscription | undefined;

  //toda vez que inicializa o projeto ele faz esse role
  ngOnInit(): void {
   this.listarMarcaCarro();
   
  }

  //metodo/função que lista o carro
  listarMarcaCarro(){
    //o marcaCarrosSubscription fica observando
    //faz a requisição pra API
    this.marcaCarrosSubscription = this._marcaCarrosService.getMarcaCarro().pipe(
      //tratamento de erro
      catchError(error => {
        return[];
      })
      //metodo subscrive para se inscrever 
      // ser der certo ele res vai ser do TIPO IMarcas
      ).subscribe((res: IMarcas ) => {
        //se tiver marcasCarro ele vai alimentar a variavel
        this.marcasCarro = this.marcasCarro.concat(res);
        this.marcasCarroBackup = this.marcasCarro;
        if(this.marcasCarro.length > 0){
          this.popularSelect();
        }
    } )
  }
    
  popularSelect(){
    this.opcoesMarcas = this.marcasCarro.map((x) => {
      return ({label: x.nome , value: x.codigo})

    })
    // 
  }

  getOpcao(event: any){
    console.log(event);
    let opcaoEscolhida = event;

    this.marcasCarro = this.marcasCarroBackup.filter((x) => {
      return x.codigo == opcaoEscolhida
    })
    
  }
}
