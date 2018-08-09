export class ImageAnnotation {
  constructor({id, name, color, x, y, width, height, selectedOptionPath=[], options }) {
		this.id = id;
    this.name = name;
    this.color = color;
		this.x = x;
    this.y = y;
		this.width = width;
		this.height = height;
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
