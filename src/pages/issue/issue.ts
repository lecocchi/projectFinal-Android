import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {NavController, NavParams, TextInput} from 'ionic-angular';
import {StateProvider} from "../../providers/state/state";
import {VersionsProvider} from "../../providers/versions/versions";
import {PhaseProvider} from "../../providers/phase/phase";
import {LabelProvider} from "../../providers/label/label";
import {PrioritiesProvider} from "../../providers/priority/priority";
import {IssueProvider} from "../../providers/issue/issue";
import {UtilsProvider} from "../../providers/utils/utils";


@Component({
  selector: 'page-issue',
  templateUrl: 'issue.html',
})
export class IssuePage implements OnInit{

  issueId:string;title:string;description:string;
  accordionExpanded = false;
  titleNavBar:string;

  @ViewChild("cc") cardContent: any;
  @ViewChild("ccp") cardContentPeople: any;
  @ViewChild("ccd") cardContentDate: any;
  @ViewChild("ccc") cardContentComment: any;
  @ViewChild("titleInput") titleInput:TextInput;


  priorityModel:any; labelModel:any;phaseModel:any;stateModel:any;versionModel:any;reporterModel:any;assigneeModel:any;watcherModel:any;issue:any;
  update:boolean; backlog:boolean;
  priorities:any = [];labels:any = [];phases:any = [];states:any = [];versions: any = [];  reporters: string[] = [];assignees:string[] = [];watchers:string [] = [];
  createdModel:any; updatedModel:string; resolvedModel:string;
  users:string[] = [
    "Leandro Cocchi",
    "Julieta Medved",
    "Lucas Lando",
    "Uriel Bonano",
    "Nicolas Molina"
  ];


  comments:any[] = [
    {
      author: "Leandro Cocchi",
      description: "Comentario realizado por Leandro Cocchi",
      date: new Date().toDateString()
    },
    {
      author: "Leandro Cocchi",
      description: "Comentario realizado por Leandro Cocchi",
      date: new Date().toDateString()
    },
    {
      author: "Leandro Cocchi",
      description: "Comentario realizado por Leandro Cocchi",
      date: new Date().toDateString()
    }

  ];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public renderer:Renderer2, public priorityProvider: PrioritiesProvider,
              public labelsProvider: LabelProvider,
              public phasesProvider: PhaseProvider,
              public statesProvider: StateProvider,
              public versionsProvider: VersionsProvider,
              public issueProvider: IssueProvider,
              public utils: UtilsProvider) {


    this.update = this.navParams.get('update');
    this.backlog = this.navParams.get('backlog');

    this.priorityProvider.getAllPriority()
      .subscribe(data => {
        this.priorities = data;
      });

    this.labelsProvider.getAllLabel()
      .subscribe( data =>{
        this.labels = data;
      });

    this.phasesProvider.getAllPhase()
      .subscribe( data =>{
        this.phases = data;
      });

    this.statesProvider.getAllState()
      .subscribe(data =>{
        this.states = data;
      });

    this.versionsProvider.getAllVersion()
      .subscribe( data =>{
        this.versions = data;
      });

    this.reporters = this.users;
    this.assignees = this.users;
    this.watchers = this.users;



    if (this.update){
      this.issue = this.navParams.get('issue');

      //Seteamos los datos
      this.title = this.issue.title;
      this.description = this.issue.description;
      this.priorityModel = this.issue.priority;
      this.labelModel = this.issue.label;
      this.phaseModel = this.issue.phase;
      this.stateModel = this.issue.state;
      this.versionModel = this.issue.version;
      this.assigneeModel = this.issue.assignee;
      this.reporterModel = this.issue.reporter;
      this.watcherModel = this.issue.watcher;
      this.titleNavBar = 'SID-' + this.issue.id;
      this.createdModel = new Date(this.issue.created).toISOString();
      this.updatedModel = new Date(this.issue.updated).toISOString();

      if (this.issue.resolved !== null)
        this.resolvedModel = new Date(this.issue.resolved).toISOString();

    }else{
      this.titleNavBar = 'Crear un nuevo Issue';
      this.reporterModel = "Leandro Cocchi";
      this.createdModel = new Date().toISOString();
      this.updatedModel = new Date().toISOString();
    }
  }

  ngOnInit(){
    this.renderer.setStyle( this.cardContent.nativeElement,"webkitTransition", "max-height 800ms" );
    this.renderer.setStyle( this.cardContent.nativeElement,"webkitTransition", "padding 300ms" );
    this.renderer.setStyle( this.cardContentPeople.nativeElement,"webkitTransition", "max-height 800ms" );
    this.renderer.setStyle( this.cardContentPeople.nativeElement,"webkitTransition", "padding 300ms" );
    this.renderer.setStyle( this.cardContentDate.nativeElement,"webkitTransition", "max-height 800ms" );
    this.renderer.setStyle( this.cardContentDate.nativeElement,"webkitTransition", "padding 300ms" );
    this.renderer.setStyle( this.cardContentComment.nativeElement,"webkitTransition", "max-height 800ms" );
    this.renderer.setStyle( this.cardContentComment.nativeElement,"webkitTransition", "padding 300ms" );
  }

  toggleAccordionDetail(){

    if(this.accordionExpanded){
      this.renderer.setStyle(this.cardContent.nativeElement, "max-height", "0px");
      this.renderer.setStyle(this.cardContent.nativeElement, "padding", "0px 16px");
    } else{
      this.renderer.setStyle(this.cardContent.nativeElement, "max-height","500px");
      this.renderer.setStyle(this.cardContent.nativeElement, "padding" , "13px 16px");
    }


    this.accordionExpanded = !this.accordionExpanded;

  }

  toggleAccordionPeople(){

    if(this.accordionExpanded){
      this.renderer.setStyle(this.cardContentPeople.nativeElement, "max-height", "0px");
      this.renderer.setStyle(this.cardContentPeople.nativeElement, "padding", "0px 16px");
    } else{
      this.renderer.setStyle(this.cardContentPeople.nativeElement, "max-height","500px");
      this.renderer.setStyle(this.cardContentPeople.nativeElement, "padding" , "13px 16px");
    }


    this.accordionExpanded = !this.accordionExpanded;

  }

  toggleAccordionDate(){

    if(this.accordionExpanded){
      this.renderer.setStyle(this.cardContentDate.nativeElement, "max-height", "0px");
      this.renderer.setStyle(this.cardContentDate.nativeElement, "padding", "0px 16px");
    } else{
      this.renderer.setStyle(this.cardContentDate.nativeElement, "max-height","500px");
      this.renderer.setStyle(this.cardContentDate.nativeElement, "padding" , "13px 16px");
    }


    this.accordionExpanded = !this.accordionExpanded;

  }

  toggleAccordionComment(){

    if(this.accordionExpanded){
      this.renderer.setStyle(this.cardContentComment.nativeElement, "max-height", "0px");
      this.renderer.setStyle(this.cardContentComment.nativeElement, "padding", "0px 16px");
    } else{
      this.renderer.setStyle(this.cardContentComment.nativeElement, "max-height","500px");
      this.renderer.setStyle(this.cardContentComment.nativeElement, "padding" , "13px 16px");
    }

    this.accordionExpanded = !this.accordionExpanded;
  }

  accept(){
    let issue:any = {
      title:this.title,
      avatar:"https://picsum.photos/300/300?image=0",
      description:this.description,
      priority:this.priorityModel,
      label:this.labelModel,
      phase:this.phaseModel,
      state:this.stateModel,
      version:this.versionModel,
      assignee:this.assigneeModel,
      reporter:this.reporterModel,
      whatcher:null,
      estimated:null,
      remaining:null,
      sprint:null,
      backlog:this.backlog,
      enabled:true
    };

    if (this.update){
      this.issueProvider.updateIssue(issue, this.issue.id)
        .subscribe(data =>{
          this.utils.presentToast(`Se modificó el issue SID- ${this.issue.id} con éxito`);
        });
    } else{
      this.issueProvider.createNewIssue(issue)
        .subscribe(data =>{
          this.utils.presentToast(`Se creó el issue con éxito`);
        });
    }

    this.navCtrl.pop();
  }
}
