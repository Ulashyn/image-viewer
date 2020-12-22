
export interface IPicture {
  id: string;
  author: string;
  camera: string;
  tags: string;
  cropped_picture: string;
  full_picture: string;
}

export class ModelPicture implements IPicture {
  readonly id: string;
  readonly author: string;
  readonly camera: string;
  readonly tags: string;
  readonly cropped_picture: string;
  readonly full_picture: string;

  constructor({
    id = '',
    author = '',
    camera = '',
    tags = '',
    cropped_picture = '',
    full_picture = ''
  }: Partial<IPicture> = {}) {
    this.id = id;
    this.author = author;
    this.camera = camera;
    this.tags = tags;
    this.cropped_picture = cropped_picture;
    this.full_picture = full_picture;
  }

  serialize(): IPicture {
    return {
      id: this.id,
      author: this.author,
      camera: this.camera,
      tags: this.tags,
      cropped_picture: this.cropped_picture,
      full_picture: this.full_picture,
    };
  }

  clone(): ModelPicture {
    return new ModelPicture(this.serialize());
  }
}
