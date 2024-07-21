import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm, NgModel} from "@angular/forms";
import {Contrat, TypeContrat} from '../contrats'
import {contratService} from '../contrat.service';
import { jsPDF } from 'jspdf';
import {ClientService} from "../ClientService";
import {ListToDoAgentComponent} from "../list-to-do-agent/list-to-do-agent.component";
import {client, Role} from "../client";

@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styleUrls: ['./contrat.component.css']
})
export class ContratComponent implements OnInit{
  clients: client[] = [];


  constructor(
    private contratService :contratService,
    private route: ActivatedRoute,
    private router : Router,
    private clientService: ClientService,
  ) {
    const Client1 = new client();
    Client1.id = 5;
    Client1.firstName = 'TEST';
    Client1.lastName = 'Naffeti';
    Client1.email = 'zaouidoa9@gmail.com';
    Client1.role = Role.Client;
    this.clients.push(Client1);

    const Client2 = new client();
    Client2.id = 3;
    Client2.firstName = 'Douaa';
    Client2.lastName = 'ZAOUI';
    Client2.email = 'zaouidoa9@gmail.com';
    Client2.role = Role.Proprietaire;
    this.clients.push(Client2);
  }


  submitform!: NgForm;
  //private baseURL = "http://localhost:8080/api/v1/contrat";


  checkDateFinValidity(dateFin: NgModel): void {
    const dateDebut = new Date(this.contrat.dateDebut);
    const dateFinValue = new Date(this.contrat.dateFin);
    const diff = Math.abs(dateFinValue.getTime() - dateDebut.getTime());
    const days = Math.ceil(diff / (1000 * 3600 * 24))+1;

      if (days <= 3) {
      dateFin.control.setErrors({ minDays: true });
      setTimeout(() => {
        dateFin.control.setErrors(null);
      }, 5000);
    } else {
      dateFin.control.setErrors(null);
    }

  }

  contrat: Contrat = new Contrat();
  paragraphs: any = {
    vente: {
      paragraph1: false,
      paragraph2: false
    },
    location: {
      paragraph1: false
    },
    general: {
      paragraph1: false,
      paragraph2: false
    }
  };

  PropertyID : number =0;
  CLientID :number= 0 ;
  ProprietaireID :number = 0;
  ContratTYPE !: TypeContrat;

  ngOnInit(): void {
    this.contrat.id = this.route.snapshot.params['id'];

    this.contratService.getContratById(this.contrat.id).subscribe(data => {
      this.contrat = data;
    }, error => console.log(error));

    this.PropertyID = this.route.snapshot.params['id'];
    this.CLientID = this.route.snapshot.params['clientId'];
    this.ProprietaireID = this.route.snapshot.params['proprietaireId'];
    this.ContratTYPE = this.route.snapshot.params['contratType'];
    if((this.ContratTYPE == 'Vente') || (this.ContratTYPE == 'Location')){
      this.contrat.typeContrat = this.ContratTYPE;
    }
  }

  onSubmit() {
    console.log(this.contrat);

    if(this.contrat.typeContrat == 'Vente'){
      this.contrat.dateFin = null!;
    }

    this.saveContrat();
  }

  onSelectChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.SelectAll();
    } else {
      this.UnselectAll(); // or whatever function you want to call when unchecked
    }
  }

  SelectAll() {
    for (const type in this.paragraphs) {
      for (const paragraph in this.paragraphs[type]) {
        this.paragraphs[type][paragraph] = true;
      }
    }
  }

  UnselectAll() {
    for (const type in this.paragraphs) {
      for (const paragraph in this.paragraphs[type]) {
        this.paragraphs[type][paragraph] = false;
      }
    }
  }
  saveContrat() {
    this.contratService.addContrat(this.contrat).subscribe(data => {
      console.log(data);
      console.log('goToContratList...');
      this.goToContratList();
      this.generatePdf(data); // Pass the saved contract data to generatePdf
    }, error => console.log(error));
  }

  goToContratList() {
    this.router.navigate(['/show-all-contrats']);
    console.log('gIn ContratList...');
   // this.generatePdf(contrat : Contrat);
  }

  generatePdf(contratSave : any): void {

    console.log('Generating PDF...');
    const clientId = this.CLientID;
    const proprietaireId = this.ProprietaireID;
    const client = this.clients.find(c => c.id === clientId);
    const proprietaire = this.clients.find(c => c.id === proprietaireId);
    console.log(`clientId ${clientId}`);
    console.log(`client ${client}`);
    if (window.confirm('Are you sure you want to generate the PDF?')) {
      let Y !: number;
      let X !: number;
      const doc = new jsPDF();

      // Add title
      doc.setFont('helvetica', 'bolditalic');
      doc.setFontSize(24);
      doc.text(`CONTRACT DE ${this.contrat.typeContrat}`.toUpperCase(), 50, 20);

      /*Date de creation*/
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text('Tunis le : ', 5, 5);
      const formattedDate = this.contrat.createdDate.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).replace(/\//g, '-');
      doc.text(` ${formattedDate}`, 20, 5);
      // Add contract details in two columns
      const columnWidth = 90;
      const columnMargin = 10;
      const leftColumnX = 20;
      const rightColumnX = leftColumnX + columnWidth + columnMargin;

      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Entre les signataires ci-dessous (nom, prénom et numéro d'identification) :`, 20, 40);

      if(proprietaire) {

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`${proprietaire.firstName} ${proprietaire.lastName} `, 30, 60);
      }
      else {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`${this.contrat.proprietaire} `, 30, 50);
      }

      if(client){
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`${client.firstName} ${client.lastName} `, 30, 60);
      }
      else {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`${this.contrat.client} `, 30, 60);
      }
      // Section 1 : M.(s)
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bolditalic');
      doc.text('Section 1 : ', leftColumnX, 70);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`M.(s) ${this.contrat.proprietaire.toUpperCase()}`, 30, 80);

      if (this.contrat.typeContrat == 'Location') {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`pour le locataire : M.(s) ${this.contrat.client.toUpperCase()}`, 30, 90);

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`situé à ${this.contrat.adresse.toUpperCase()}`, 30, 100);

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`composé de ${this.contrat.compose.toUpperCase()}`, 30, 110);

        //Section 2
        let dateDebut = new Date(this.contrat.dateDebut);
        let dateFin = new Date(this.contrat.dateFin);
        let timeDifference = Math.abs(dateDebut.getTime() - dateFin.getTime());
        let dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1;


        doc.setFontSize(18);
        doc.setFont('helvetica', 'bolditalic');
        doc.text(`Section 2 : `, leftColumnX, 120);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Cette autorisation a été accordée pour une période de ${dayDifference} jours`, 30, 130);
        doc.text(`Commence à ${this.contrat.dateDebut} et se terminant à ${this.contrat.dateFin}`, 30, 140);
        doc.text(`afin d'utiliser dans le but de ${this.contrat.but.toUpperCase()}`, 30, 150);


        //Section 3
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bolditalic');
        doc.text(`Section 3 : `, leftColumnX, 160);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Le montant de ce loyer est de ${this.contrat.montant}.DT pour toute la période mentionnée `, 30, 170);
        doc.text(`Paiement du loyer par ....`, 30, 180);

        //Section 4
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bolditalic');
        doc.text(`Section 4 : `, leftColumnX, 190);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Le présent contrat est résilié dès l'expiration de la période imposée, sans préavis`, 30, 200);
        doc.text(`de l'une des parties à l'autre.`, 30, 210);

        doc.setFontSize(18);
        doc.setFont('helvetica', 'bolditalic');
        doc.text(`Section 5 : `, leftColumnX, 220);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Les honoraires des affaires sont à la charge du bénéficiaire, ainsi que toutes les `, 30, 230);
        doc.text(`prestations municipales, à l'exception de la prestation de l'employé sur le montant`, 30, 240);
        doc.text(`de de l'autorisation imposée au propriétaire.`, 30, 250);

        doc.addPage();

        if (this.paragraphs.location.paragraph1) {
          //Section 5
          doc.setFontSize(18);
          doc.setFont('helvetica', 'bolditalic');
          doc.text(`Section 6 : `, leftColumnX, 10);
          doc.setFontSize(12);
          doc.setFont('helvetica', 'normal');
          doc.text(`Le propriétaire n'est pas responsable des dommages et pertes causés par l'eau qui`, 30, 20);
          doc.text(`s'écoule des toits ou de l'étage supérieur du bâtiment.`, 30, 30);

          Y = 40;
          X = 7;

        }
        else{
          Y = 10;
          X = 6 ;

        }

        //Section 7
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bolditalic');
        doc.text(`Section ${X} : `, leftColumnX, Y);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Toutes les réparations et améliorations faites par l'emprunteur dans le magasin pendant`, 30, Y+10);
        doc.text(`la durée de sa résidence restent la propriété du propriétaire sans aucune indemnité`, 30, Y+20);
        doc.text(`Toute modification du magasin sans l'accord écrit du propriétaire est interdite.`, 30, Y+30);

        //Section 8
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bolditalic');
        doc.text(`Section ${X+1} : `, leftColumnX, Y+40);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Il est strictement interdit d'introduire dans le magasin des substances inflammables`, 30, Y+50);
        doc.text(`ou explosives,ainsi que des objets qui créent un danger pour le propriétaire ou les voisins.`, 30, Y+60);

        //Section 9
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bolditalic');
        doc.text(`Section ${X+2} : `, leftColumnX, Y+70);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Il est interdit pour quelque raison que ce soit de prêter le magasin à autrui ou de le`, 30, Y+80);
        doc.text(`prêter à autrui, même temporairement et sur la base de la bienveillance.`, 30, Y+90);

        //Section 10
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bolditalic');
        doc.text(`Section ${X+3} : `, leftColumnX, Y+100);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Il est strictement interdit d'utiliser les toits pour déposer des marchandises ou d'autre`, 30, Y+110);
        doc.text(`choses, sauf pour étendre des vêtements Le commerçant doit réparer et indemniser de ses`, 30, Y+120);
        doc.text(`propres deniers les dommages causés par la violation de cette condition.`, 30, Y+130);

        //Adresse
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bolditalic');
        doc.text(`Tunis le ${formattedDate}`, leftColumnX, Y+200);

        //Signature 1
        doc.setFontSize(15);
        doc.setFont('helvetica', 'bolditalic');
        doc.text(`Signature de Propriétaire`, leftColumnX, Y+220);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`(Nom ,Prenom et Date)`, 25, Y+230);

        //Signature 2
        doc.setFontSize(15);
        doc.setFont('helvetica', 'bolditalic');
        doc.text(`Signature de Locataire`, rightColumnX, Y+220);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`(Nom ,Prenom et Date)`, rightColumnX + 5, Y+230);
      }

      if (this.contrat.typeContrat == 'Vente') {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`pour l'acheteur : M.(s) ${this.contrat.client.toUpperCase()}`, 30, 90);

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`situé à ${this.contrat.adresse.toUpperCase()}`, 30, 100);

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`composé de ${this.contrat.compose.toUpperCase()}`, 30, 110);

        //Section 2

        doc.setFontSize(18);
        doc.setFont('helvetica', 'bolditalic');
        doc.text(`Section 2 : `, leftColumnX, 120);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`La vente est réalisée le ${this.contrat.dateDebut} pour un prix de ${this.contrat.montant}.DT .`, 30, 130);


        doc.setFontSize(18);
        doc.setFont('helvetica', 'bolditalic');
        doc.text(`Section 3 : `, leftColumnX, 140);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Le paiement du prix de vente sera effectué par virement bancaire.`, 30, 150);
        doc.text(`Le vendeur s'engage à remettre le bien immobilier à l'acheteur à la date de signature`, 30, 160);
        doc.text(`du présent contrat.`, 30, 170);

        doc.setFontSize(18);
        doc.setFont('helvetica', 'bolditalic');
        doc.text(`Section 4 : `, leftColumnX, 180);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Le présent contrat est résilié dès l'expiration de la période imposée, sans préavis`, 30, 190);
        doc.text(`de l'une des parties à l'autre.`, 30, 200);

        doc.setFontSize(18);
        doc.setFont('helvetica', 'bolditalic');
        doc.text(`Section 5 : `, leftColumnX, 210);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Les honoraires des affaires sont à la charge du bénéficiaire, ainsi que toutes les `, 30, 220);
        doc.text(`prestations municipales, à l'exception de la prestation de l'employé sur le montant`, 30, 230);
        doc.text(`de de l'autorisation imposée au propriétaire.`, 30, 240);



        if(this.paragraphs.vente.paragraph1){
          doc.setFontSize(18);
          doc.setFont('helvetica', 'bolditalic');
          doc.text(`Section 6 : `, leftColumnX, 250);
          doc.setFontSize(12);
          doc.setFont('helvetica', 'normal');
          doc.text(`Un article de cette promesse doit prévoir une clause qui permet de récupérer toute ou`, 30, 260);
          doc.text(`partie des sommes versées lors de la promesse de vente en cas de refus du Gouverneur`, 30, 270);
          doc.text(`(Le refus est exceptionnel).`, 30, 280);


          Y = 10;
          X = 7;
          doc.addPage();
        }
        else{
          Y = 250;
          X = 6;
        }

        doc.setFontSize(18);
        doc.setFont('helvetica', 'bolditalic');
        doc.text(`Section ${X} : `, leftColumnX, Y);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Le vendeur s'engage dans la promesse de vente à ne pas vendre son bien immobilier à une`, 30, Y+10);
        doc.text(`autre personne que l'acheteur étranger tant que l'autorisation n'est pas délivrée, il va`, 30, Y+20);
        doc.text(`donc perdre des opportunités de vente et il peut demander de garder une somme définie sur`, 30, Y+30);
        doc.text(`l'acompte versé.`, 30, Y+40);

        if(Y == 250)
        {
          Y = -40;
          doc.addPage();
        }

        doc.setFontSize(18);
        doc.setFont('helvetica', 'bolditalic');
        doc.text(`Section ${X+1} : `, leftColumnX, Y+50);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`L'acheteur reconnaît avoir visité et inspecté le bien immobilier avant la signature du présent`, 30, Y+60);
        doc.text(`contrat et déclare être satisfait de son état. Le vendeur ne sera pas tenu responsable pour tout`, 30, Y+70);
        doc.text(`défaut ou vice caché qui pourrait être découvert après la signature du contrat.`, 30, Y+80);

        doc.setFontSize(18);
        doc.setFont('helvetica', 'bolditalic');
        doc.text(`Section ${X+2} : `, leftColumnX, Y+90);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Le présent contrat sera régi et interprété conformément aux lois de la République Tunisienne.`, 30, Y+100);
        doc.text(`Tout litige ou différend découlant du présent contrat sera soumis à la juridiction compétente`, 30, Y+110);
        doc.text(`du Tribunal de Tunis.`, 30, Y+120);

        doc.setFontSize(11);
        doc.setFont('helvetica', 'bolditalic');
        doc.text(`Les parties ont lu et compris les termes du présent contrat et l'acceptent en signant ci-dessous. `, leftColumnX, Y+140);


        //Adresse
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bolditalic');
        doc.text(`Tunis le ${formattedDate}`, leftColumnX, Y+160);

        //Signature 1
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bolditalic');
        doc.text(`Signature du vendeur`, leftColumnX, Y+180);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`(Nom ,Prenom et Date)`, 25, Y+190);

        //Signature 2
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bolditalic');
        doc.text(`Signature de l'acheteur`, rightColumnX, Y+180);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`(Nom ,Prenom et Date)`, rightColumnX + 5, Y+190);

      }
      // Generate the PDF blob
      const pdfBlob = doc.output('blob');
      // Create a URL for the PDF blob
      const pdfUrl = URL.createObjectURL(pdfBlob);
      // Create a link to download the PDF file
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `Contract-${contratSave.typeContrat.substring(0,1)}-${contratSave.id}.pdf`;
      link.click();
      // Clean up
      URL.revokeObjectURL(pdfUrl);

    }

  }

  protected readonly Contrat = Contrat;
  protected readonly TypeContrat = TypeContrat;
}
