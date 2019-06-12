import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Word } from './word.model';
import { WordGrapheme } from "../word-grapheme/word-grapheme.model";
import { SoundService } from "../sound/sound.service";

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css']
})
export class WordComponent implements OnInit {

  @Input() word: Word;
  @Output() found: EventEmitter<Word> = new EventEmitter();

  constructor(private soundService: SoundService) { }

  ngOnInit() {
  }

  playAllPhonems(graphemeIndex = 0) {
    const self = this;
    const currentGrapheme = this.word.graphemes[graphemeIndex];
    if (currentGrapheme) {
      if (currentGrapheme.isMute) {
        return self.playAllPhonems(graphemeIndex + 1);
      }
      return this.soundService
        .playSound(`phonems/${currentGrapheme.phonems[0]}`)
        .then(() => self.playAllPhonems(graphemeIndex + 1))
        .catch(e => console.error(e));
    }
  }

  onFound(grapheme: WordGrapheme) {
    if (this.word.isFound()) {
      this.soundService
        .playSound("mot_juste")
        .then(() => {
          return this.playAllPhonems();
        })
        .then(() => {
          return this.soundService.playSound(`words/${this.word.fileName}`);
        })
        .then(() => {
          this.found.emit(this.word);
        })
        .catch(e => console.error(e));
    }
  }
}
