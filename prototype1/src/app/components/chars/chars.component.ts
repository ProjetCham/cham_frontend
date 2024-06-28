import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chars',
  templateUrl: './chars.component.html',
  styleUrls: ['./chars.component.css']
})
export class CharsComponent implements OnInit {
  @Input() field : string = '';
  @Input() visible : boolean = true;
  @Output() valueChange = new EventEmitter<string>();
  chars : string[]

  constructor() { 
    this.chars = "ĩ ằ ừ [ ā ữ ” ç ̣  ệ Ċ ù ò ô ḷ ở ĕ í ̄  œ Â + — ̈  É ầ ̆  ụ ' ’ ả ì ē ‘   ɪ ẵ ċ â î ! ị Ā ỉ ń ] ẫ ŭ ú ṭ ~ ṣ ê ự ơ Đ ̯ \
    ä ü ṁ ủ ̐  á ꝑ ë : ỏ đ ắ - ( ọ ớ ̇  ĭ ȫ ō ́  ấ Ê ö ḳ ể è ? ã é ̃  À ă ś Ṅ ḥ ố ṇ ṅ ồ , ) ī ề ŏ ẻ Æ ̀  ổ . ẩ ḅ ū ̂  ṃ æ Ñ Ç ó ʼ \
    ờ û ẹ ạ ; ư ứ Œ à ậ ï ñ ế ộ * _ ě = ḍ È".split(" ").filter(e => e !== "");
  }

  ngOnInit(): void {
  }

  updateField(char : string) : void {
    console.log(char)
    this.field += char;
    this.valueChange.emit(this.field);
  }

}
