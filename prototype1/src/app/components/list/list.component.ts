import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { Lexicon } from 'src/app/classes/lexicon';
import { LexiconService } from 'src/app/services/lexicon.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';



interface CustomEvent extends Event {
  data: Lexicon; 
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})



export class ListComponent implements OnInit {

  lexicons : Lexicon[];
  selectedEntry : Lexicon
  dialogVisible : boolean
  variantsVisible : boolean
  definitionsVisible : boolean
  dialectVisible : boolean
  cognateVisible : boolean
  picturesVisible : boolean
  removeDiacritics : any
  keyboardVisible : boolean
  searchInput: string
  


  constructor(private router : Router, private lexiconService : LexiconService) {
    this.lexicons = [];
    this.selectedEntry = new Lexicon("", "", [], [], [], [], "", [], [], "")
    this.dialogVisible = false;
    this.variantsVisible = true;
    this.definitionsVisible = false;
    this.dialectVisible = false;
    this.cognateVisible = false;
    this.picturesVisible = false
    this.removeDiacritics = require('diacritics').remove;
    this.keyboardVisible = false;
    this.searchInput = ""

   }

  ngOnInit(): void {
    // this.lexicons = this.lexiconService.getLexicons();
    this.lexiconService.getAllEntries().then((data) =>{
      this.lexicons = data.filter(entry => entry.id !== undefined)
    })
  }

  customSort(event: any) {
    event.data?.sort((data1 : any, data2 : any) => {
      let value1 = data1[event.field!];
      let value2 = data2[event.field!];
      let result = null;

      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      //else if (typeof value1 === 'string' && typeof value2 === 'string')
        //result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return event.order! * result;
    });
  }

  showMore(event: CustomEvent) {
    this.lexiconService.getLexiconById(event.data.id).then((data) => {
      this.selectedEntry = data
      console.log(this.selectedEntry)
      this.dialogVisible = true;
    })
  }

  clear(table: Table) {
    table.clear();
}

goToVariant(variantID: any, originID: string, originLexeme: string) {

  this.lexiconService.getLexiconById(variantID).then((data) => {
    if (data !== null){
      this.selectedEntry = data
      if (!this.selectedEntry.variants?.includes(originID)){
        this.lexiconService.fixVariantLinksById(variantID, originID, originLexeme).then((newData) => {
          if ( newData!== null){
            this.selectedEntry = newData
          }
        })

      }
    }
  })

}


  removeBadCharsFromString(str: string): string {
    return str.replace(/[\d*]+/g, '');
  }

  showKeyboard(){
    this.keyboardVisible=true;
  }

  handleValueChange(event : any){
    console.log(event)
    if (event.target){
      this.searchInput = event.target.value;
    }
  }

}
