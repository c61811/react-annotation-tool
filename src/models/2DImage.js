export class ImageAnnotation {
  constructor({id, name, type, color, x, y, width, height, vertices, selectedOptionPath=[], options }) {
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
		this.selectedOptionPath = selectedOptionPath
		this.optionInputValues = {}
  }
	/*
	static initOptionInputValues = (options, optionInputValues) => {
		if(Object.keys(options).length==0)
			return;
		for(let key in options){
				optionInputValues[options[key].id] = "";
				ImageAnnotation.initOptionInputValues(options[key].children, optionInputValues);
		}
	}
	*/
}

export const POLYGON = 'Polygon'
export const BOX = 'Box'
