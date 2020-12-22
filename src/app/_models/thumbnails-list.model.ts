export interface IThumbnailsList {
  id: string;
  cropped_picture: string;
}

export class ModelThumbnailsList implements IThumbnailsList {
  readonly id: string;
  readonly cropped_picture: string;

  constructor({
    id = '',
    cropped_picture = ''
  }: Partial<IThumbnailsList> = {}) {
    this.id = id;
    this.cropped_picture = cropped_picture;
  }

  serialize(): IThumbnailsList {
    return {
      id: this.id,
      cropped_picture: this.cropped_picture
    };
  }

  clone(): ModelThumbnailsList {
    return new ModelThumbnailsList(this.serialize());
  }
}
