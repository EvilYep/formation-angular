import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { GraphemeComponent } from "../grapheme/grapheme.component";
import { WordGrapheme } from './word-grapheme.model';
import { ConfigComponent } from '../config/config.component';
import { Config } from '../config/config.model';

@Component({
  selector: 'app-word-grapheme',
  templateUrl: './word-grapheme.component.html',
  styleUrls: ['./word-grapheme.component.css', "../grapheme/grapheme.component.css"]
})
export class WordGraphemeComponent extends GraphemeComponent implements OnInit {

  @Input() grapheme: WordGrapheme;
  @Input() config: Config;

  @Output() found: EventEmitter<WordGrapheme> = new EventEmitter();

  ngOnChanges() {
    if (this.config.areComplexGraphemesDisplayed && this.grapheme.representation.length > 1 && !this.grapheme.representation.includes("_")) {
      this.grapheme.setIsFound(true);
    }
  }

  ngOnInit() {
  }

  playPhonemSound() {
    if (!this.grapheme.isMute) {
      return super.playPhonemSound();
    }
    return Promise.resolve({});
  }

  onDrop(droppedGrapheme: any, wordGrapheme: WordGrapheme) {
    if (droppedGrapheme._representation === wordGrapheme.representation) {
      wordGrapheme.setIsFound(true);
      this.soundService.playSound("juste").then(() => {
        this.found.emit(wordGrapheme);
      });
    } else {
      this.soundService.playSound("faux");
    }
  }
}
