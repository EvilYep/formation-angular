import { WordGrapheme } from "../word-grapheme/word-grapheme.model";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

export class Word {
  _fileName: string;
  _imageFile: string;
  _hasImage: boolean;
  constructor(private _graphemes: WordGrapheme[]) {
    this._fileName = this._graphemes.reduce(
      (fileName, g) => `${fileName}${g.representation}`,
      ""
    );
    this._imageFile = "assets/img/" + this._fileName + ".jpg";
  }

  get graphemes() {
    return this._graphemes;
  }

  get fileName() {
    return this._fileName;
  }

  get hasImage() {
    return this._hasImage;
  }

  isFound() {
    return this._graphemes.every(g => g.isFound);
  }
}