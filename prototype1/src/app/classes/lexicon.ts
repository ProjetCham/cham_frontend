export class Lexicon {
    name : string;
    id: string;
    gloss: string[];
    definitions: string[];
    examplesFR: string[];
    examplesCHAM: string[];
    cognate: string;
    pic_path: string[];
    variants? : string[];
    dialect? : string


    constructor(name : string, id : string, gloss : string[], definitions : string[], examplesFR : string[], examplesCHAMS : string[], cognate : string, pic_path : string[] ,variants? : string[], dialect? : string){
        this.name= name;
        this.id = id;
        this.gloss = gloss;
        this.definitions = definitions;
        this.examplesFR = examplesFR;
        this.examplesCHAM = examplesCHAMS;
        this.cognate = cognate;
        this.pic_path = pic_path;
        this.variants = variants;
        this.dialect = dialect;
    }
}
