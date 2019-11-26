import { Component,OnInit } from '@angular/core';
import { LoadingController, ToastController, AlertController, NavController } from "@ionic/angular";
import { ListasService } from '../listas.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{


  private nome : string;
  private cpf : string;
  private msg : Array<string>;
 
  private static listaClientes : Array<string>;

  constructor(
    private loadingController : LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
    private ListasService: ListasService)
    
    {
    this.nome = "";
    this.cpf = "";
    this.msg = [];
    Tab3Page.listaClientes = [];
  }

  ngOnInit() {
  }

  salvar(){
    if(this.nome===""){
      this.showAlert("Nome");
      return;
    }
    
    if(this.cpf==="" || this.cpf.length != 14){
      this.validaCpf();
      return;
    }

    this.setMensagem(this.nome,this.cpf);

    this.nome = "";
    this.cpf = ""; 
    this.msg = [];
    setTimeout(() => {
        this.showLoading();               
        },100);

        
  }

  setMensagem(nome : string, cpf : string) {
    let teste: string= "N: "+nome+", CPF: " + cpf;
    Tab3Page.listaClientes.push(teste);

    if (nome != ""){
      this.ListasService.setListaCliente(nome);
    }
  }
  

  showLoading() {
    this.loadingController
      .create({
        message: 'Salvando...',
        spinner: "dots"
      })
      .then((loading) => {
        loading.present();
        setTimeout(() => loading.dismiss(), 2000);
        setTimeout(() => this.showToast(), 2000);
        setTimeout(() => this.msg = Tab3Page.listaClientes, 2500);
                
      });
  }

  showToast() {
    this.toastController
      .create({
        message: 'Cliente salvo com sucesso!',
        duration: 3000,
        color: "success",
        showCloseButton: false,
        position: 'bottom'
      })
      .then(toast => toast.present());
  }

  showAlert(msg : string) {
    this.alertController
      .create({ header: `Preecha o campo ${msg}!`,
      buttons: [{
        text: 'OK'
      }]    
    })
      .then(a => a.present());
      
  }

  validaCpf() {
    this.alertController
      .create({ header: `CPF inválido!`,
      buttons: [{
        text: 'OK'
      }]    
    })
      .then(a => a.present());
      
  }

}
