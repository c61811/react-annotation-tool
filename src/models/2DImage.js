export class ImageAnnotation {
  constructor({id, name, type, color, x, y, width, height, vertices, selected=[] }) {
		this.id = id;
    this.name = name;
		this.type = type;
    this.color = color;
		//box
		this.x = x;
    this.y = y;
		this.width = width;
		this.height = height;
		//poly
		this.vertices = vertices;
		//option
		this.selected = selected
  }
}

export const POLYGON = 'Polygon'
export const BOX = 'Box'
