import { Component, OnInit, Input } from '@angular/core';
import { Word } from '../word/word.model';
import { ImageService } from '../image/image.service';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent implements OnInit {

  @Input() word: Word;
  selectedFile: ImageSnippet;

  constructor(private imageService: ImageService) { }

  ngOnInit() {
  }

  onSubmit(word) {
    let inputs = document.getElementsByClassName("input") as unknown as HTMLInputElement[];
    let file: File;
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value) {
        file = inputs[i].files[0];
      }
    }
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.imageService.uploadImage(this.selectedFile.file, word).subscribe(
        (res) => {
          console.log('OK');
        },
        (err) => {
          console.log('error uploadImg');
        }
      )
    });
    reader.readAsDataURL(file);
  }

  checkFiles() {
    this.imageService.validateImages();
  }

}
