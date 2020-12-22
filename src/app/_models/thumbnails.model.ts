import { IThumbnailsList, ModelThumbnailsList } from './thumbnails-list.model';

export interface IThumbnails {
  pictures: ModelThumbnailsList[] | IThumbnailsList[];
  page: number;
  pageCount: number;
  hasMore: boolean;
}

export class ModelThumbnails implements IThumbnails {
  readonly pictures: ModelThumbnailsList[];
  readonly page: number;
  readonly pageCount: number;
  readonly hasMore: boolean;

  constructor({
    pictures = [],
    page = 1,
    pageCount = 0,
    hasMore = false
  }: Partial<IThumbnails> = {}) {
    if (this.isThumbnailsListArray(pictures)) {
      this.pictures = pictures;
    } else {
      this.pictures = pictures.length ? pictures.map(a => new ModelThumbnailsList(a)) : [];
    }
    this.page = page;
    this.pageCount = pageCount;
    this.hasMore = hasMore;
  }

  serialize(): IThumbnails {
    return {
      pictures: this.pictures.map(a => a.serialize()),
      page: this.page,
      pageCount: this.pageCount,
      hasMore: this.hasMore
    };
  }

  clone(): ModelThumbnails {
    return new ModelThumbnails(this.serialize());
  }

  isThumbnailsListArray(arr: IThumbnailsList[] | ModelThumbnailsList[]): arr is ModelThumbnailsList[] {
    return arr[0] instanceof ModelThumbnailsList;
  }
}
