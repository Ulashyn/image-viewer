import { PicturesService } from './_services/pictures.service';
import { Component } from '@angular/core';
import { AuthService, IToken } from './_services/auth.service';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IThumbnails } from './_models/thumbnails.model';
import { IThumbnailsList } from './_models/thumbnails-list.model';
import { MessageService } from 'primeng/api';
import { IPicture, ModelPicture } from './_models/picture.model';
import { PreloaderService } from './_services/preloader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]
})
export class AppComponent {
  thumbnails!: IThumbnails;
  thumbnailsList: IThumbnailsList[] = [];
  picture!: IPicture;
  page = 0;
  rowItems = 9;
  pageCount = 0;
  responsiveOptions: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
  ];
  displayCustom = false;
  activeIndex = 0;
  imgLoader = false;
  isCaption = false;
  isError = false;

  constructor(
    private authService: AuthService,
    private pictureService: PicturesService,
    private messageService: MessageService,
    private preloader: PreloaderService,
  ) {}

  ngOnInit(): void {
    this.getAuthorizationToken();
  }

  getAuthorizationToken(): void {
    this.isError = false;
    this.preloader.show();
    this.authService.queryToken()
      .pipe(
        catchError((e) => {
          console.error(e);
          this.showFetchError(e);
          this.isError = true;
          this.preloader.hide();
          return EMPTY;
        })
      )
      .subscribe((data: IToken) => {
        localStorage.setItem('apiObject', JSON.stringify(data));
        this.queryThumbnails(this.page, this.rowItems);
        this.preloader.hide();
      });
  }

  queryThumbnails(page: number, limits: number): void {
    this.preloader.show();
    this.pictureService.getThumbnails(page + 1, limits)
    .pipe(
      catchError((e) => {
        console.error(e);
        if (e.status === 401) {
          this.showFetchError(e);
        }
        this.isError = true;
        this.preloader.hide();
        return EMPTY;
      })
    )
    .subscribe((data: IThumbnails) => {
      this.page = data.page;
      this.pageCount = data.pageCount;
      this.thumbnailsList = data.pictures;
      this.preloader.hide();
    });
  }

  queryPicture(id: string): void {
    this.imgLoader = true;
    this.pictureService.getPicture(id)
    .pipe(
      catchError((e) => {
        console.error(e);
        this.showFetchError(e);
        this.imgLoader = false;
        return EMPTY;
      })
    )
    .subscribe((data: IPicture) => {
      this.picture = data;
      this.imgLoader = false;
    });
  }

  showMore(index: number, id: string): void {
    this.activeIndex = index;
    this.displayCustom = true;
    this.picture = new ModelPicture();
    this.queryPicture(id);
  }

  onImageChange(event: any): void {
    const pictureId = this.thumbnailsList[event].id;
    this.queryPicture(pictureId);
  }

  showFetchError(e: Error): void {
    this.messageService.add({severity: 'error', summary: 'Error', detail: e.message});
  }
  showError(message: string): void {
    this.messageService.add({severity: 'error', summary: 'Error', detail: message});
  }
  showSuccess(message: string): void {
    this.messageService.add({severity: 'success', summary: 'Success', detail: message});
}

  paginate(event: any): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    this.picture = new ModelPicture();
    this.queryThumbnails(event.page, event.rows);
  }

  showCaption(): void {
    this.isCaption = true;
  }

  copyLink(url: any): void {
    navigator.clipboard.writeText(url).then(() => {
      this.showSuccess('Url copied to clipboard');
    }, () => {
      this.showError('Url copy failed');
    });
  }
}
