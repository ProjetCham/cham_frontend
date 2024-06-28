import { Component, OnInit } from '@angular/core';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { Lexicon } from 'src/app/classes/lexicon';
import { LexiconService } from 'src/app/services/lexicon.service';
import { DropdownModule } from 'primeng/dropdown';

interface Text {
  page: string;
  line: number;
  body: string;
  words: string;
  confirmed?: boolean[];
}

interface Occurence{
  page : string;
  context : string;
}

interface confirmedData{
  line : Text;
  index : number
}

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {
  lexicons: Lexicon[]
  text: string;
  inputVisible: boolean;
  texts: Text[];
  wordToSearch: string;
  showDialog: boolean;
  dataToDisplay : Occurence[];
  confirmed : confirmedData[][];
  showConfirmBatch: boolean;
  showUnconfirmBatch: boolean;
  optionsToTranslate : string[];
  selectedValueToTranslate : string;

  constructor(private lexiconService: LexiconService) {
    this.lexicons = [];
    this.text = "";
    this.inputVisible = true;
    this.texts = [];
    this.wordToSearch = "";
    this.showDialog = false;
    this.dataToDisplay = [];
    this.confirmed = [];
    this.showConfirmBatch = false;
    this.showUnconfirmBatch = false;
    this.optionsToTranslate = [];
    this.selectedValueToTranslate = ""
    
  }

  ngOnInit(): void {
    this.lexicons = this.lexiconService.getLexicons();
  }



  //text eval
  parse() {
    const lines = this.text.split('\n');
    const texts: Text[] = [];

    let currentPage = '';
    lines.forEach((currentLine) => {
      const matches = currentLine.match(/^(\d+[a-z])\s+line\s+(\d+)\s+(.*)$/);
      if (matches) {
        const [, page, lineNum, body] = matches;
        currentPage = page;
        const textObject: Text = {
          page: currentPage,
          line: parseInt(lineNum, 10),
          body: body.trim(),
          words: "",
        };
        textObject.words = this.translate(textObject.body.split(/\s+/));
        textObject.confirmed = Array(textObject.words.split(/\s+/).length).fill(false);
        texts.push(textObject);
      } else if (currentPage && currentLine.trim() !== '') {

        // If no explicit page is given, use the last page
        const textObject: Text = {
          page: currentPage,
          line: texts[texts.length - 1].line + 1,
          body: currentLine.replace(`line ${texts[texts.length - 1].line + 1}`, '').trim(), // Exclude "line" + number from the body,
          words: ""
        };
        textObject.words = this.translate(textObject.body.split(/\s+/));
        textObject.confirmed = Array(textObject.words.split(/\s+/).length).fill(false);
        texts.push(textObject);
      }
    });

    this.texts = texts;
    this.inputVisible = false;

    let set : Set<string> = new Set();
    
    texts.forEach(text => {
      text.body.split(/\s+/).forEach(word =>{
        set.add(word.toLowerCase());
      })
    })

    this.optionsToTranslate = [...set];
  }



  translate(words: string[]): string {
    let translatedWords: string[] = [];
    words.forEach(word => {
      if (this.lexicons.find(lexicon => lexicon.name === word)) {
        translatedWords.push(this.lexicons.find(lexicon => lexicon.name === word)!.gloss[0]);
      }
      else {
        translatedWords.push("_");
      }
    })

    return translatedWords.join(" ");
  }

  getOptionsToTranslate(index: number, body: string): string[] {
    let wordToTranslate = body.split(' ')[index];
    let returnArray: string[] = [];
    let fullEntries = this.lexicons.filter(entry => entry.name == wordToTranslate)
    fullEntries.forEach(entry => entry.gloss.forEach(gloss => returnArray.push(gloss)));
    return returnArray;
  }

  confirm(line : Text , index : number){
    line.confirmed![index] = true;
    const data : confirmedData = {
      line : line,
      index : index
    }
    this.confirmed.push([data]);
    console.log(line.confirmed![index]);
  }

  confirmBatch(batch : confirmedData[]){
    this.confirmed.push(batch)
  }

  unconfirmBatch(batch : confirmedData[]){
    let temp = this.confirmed;
    temp.forEach(confirmedArray =>{
      batch.forEach(occurence =>{
        confirmedArray.splice(confirmedArray.indexOf(occurence), 1);
      })
    })
    console.log(temp === this.confirmed)
  }

  findOccurrences(data : string){
    let occurences : Occurence[] = [];
    let wordsToFind : string[] = [data];
    this.lexicons.forEach(entry => {
      if (entry.name == data || entry.variants?.includes(data)){
        wordsToFind.push(entry.name)
        if (entry.variants){
          wordsToFind.push(...entry.variants!)
        }
      }
    })
    console.log(wordsToFind)
    this.texts.forEach(text =>{
      let currentLine = text.body.split(/\s+/)
      currentLine.forEach(word =>{
        let index = wordsToFind.indexOf(word)
        if (index != -1){	
          let occurence : Occurence = {page : `page: ${text.page}, line : ${text.line} `, context :  `${currentLine[currentLine.indexOf(wordsToFind[index])]}`}
          occurences.push(occurence)
        }
      })
    })
    this.dataToDisplay = occurences;
    this.showDialog = true;
  }

  undo(){
    this.confirmed[this.confirmed.length -1].forEach(item =>{
      item.line.confirmed![item.index] = false;
    })

  }

  showTranslateDialog(){
    this.showConfirmBatch = true;
  }

  showUnconfirmDialog(){
    this.showUnconfirmBatch = true;
  }
}
