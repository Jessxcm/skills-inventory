import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appUpload]',
})
export class UploadDirective {
  @Output() initHover: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() initFileDropped: EventEmitter<File> = new EventEmitter<File>();

  constructor() {}

  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.initHover.emit(true);
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.initHover.emit(false);
  }

  @HostListener('drop', ['$event']) onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.initHover.emit(false);

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      this.initFileDropped.emit(file);
    }
  }
}
