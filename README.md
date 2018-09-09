# react-annotation-tool
A react based video & image annotating tool


 [![NPM Version](https://img.shields.io/npm/v/react-annotation-tool.svg?branch=master)](https://www.npmjs.com/package/react-annotation-tool) 

## Quick start

Installation
```
npm i react-annotation-tool --save
```

Usage
```
import {ImageTool} from "react-annotation-tool"
```

## Image Annotation

### Config props

| Prop             | Description   | Format | Default |
| -------------    | ------------- | ------------- | -------------| 
| `url`              | Source of annotated image |String||
| `annotationWidth`  | Set the width of image|Number||
| `dynamicOptions`       | Enable annotators to add/delete menu options |Boolean|`false`|
| `disabledOptionLevels` | The levels which can't be selected. Start from "1". [Detail](#disabledOptionLevels)|[String]||
| `category`  | Category of the image |String|
| `categoryOptions`  |  Options for categories. [Detail](#categoryOptions)| [String]||
| `menu` | A set of options for tagging the image. [Detail](#menu)|Object||
| `annotations` | Default annotations. [Detail](#annotations)|[Object]||

#### `disabledOptionLevels`
Array of Integer. Start from "1". e.g,
```
[1, 2]
```
#### `categoryOptions`
Array of String. e.g,
```
["No Objects", "No Image"]
```
#### `menu`
Nested array of object. Each object has `id`, `value` and `options` properties. Must start from object with "root" `value`. e.g,
```
{id: "0", value: "root", options: [
   {id: "1", value: "Electronic", options: [
      {id: "1-1", value: "Laptop", options: [
         {id: "1-1-1", value: "Apple", options: []},         
         {id: "1-1-2", value: "Asus", options: []}  
      ]}, 
      {id: "1-2", value: "Charger", options: []},
      {id: "1-3", value: "Watch", options: []}]},
   {id: "2", value: "Stationery", options: [
      {id: "2-1", value: "Pen", options: []},
      {id: "2-2", value: "Eraser", options: []}]}]}
```
#### `annotations`
```
[{id: "jlhbb0cr", name: "jlhbb0cr", type: "Polygon", color: "rgba(227,0,255,1)", vertices:
    [{id: "jlhbb0cr", name: "jlhbb0cr", x: 228.8125, y: 126}, 
     {id: "jlhbb0ng", name: "jlhbb0ng", x: 254.5, y: 131}, 
     {id: "jlhbb0uh", name: "jlhbb0uh", x: 269.5, y: 145}, 
     {id: "jlhbb11f", name: "jlhbb11f", x: 280.5, y: 173},
     {id: "jlhbb17w", name: "jlhbb17w", x: 286.5, y: 215}, 
     {id: "jlhbb1dw", name: "jlhbb1dw", x: 287.5, y: 249},
     {id: "jlhbb360", name: "jlhbb360", x: 220.5, y: 141}],
  selected:[{id: "0", value: "root"}, {id: "1", value: "Electronic"}, {id: "1-1", value: "Laptop"}]},
 {id: "jlhbb6tx", name: "jlhbb6tx", type: "Polygon", color: "rgba(255,219,0,1)", vertices:    
    [{id: "jlhbb6tx", name: "jlhbb6tx", x: 103.5, y: 345}, 
     {id: "jlhbb7hm", name: "jlhbb7hm", x: 354.5, y: 306},   
     {id: "jlhbb80e", name: "jlhbb80e", x: 385.5, y: 452}, 
     {id: "jlhbb8st", name: "jlhbb8st", x: 116.5, y: 479}],
  selected:[{id: "2", value: "Stationery"}, {id: "2-1", value: "Pen"}]}]
```


### Callback props

| Prop           | Description   |
| -------------  | ------------- | 
| `onNextClick`    | Called when Next button is Clicked |  
| `onPreviousClick`| Called when Previous button is Clicked|        
| `onSkipClick`    | Called when Skip button is Clicked|        


#### Output


| Prop           | Description | Default |
| ------------- | ------------- | ------------- |
| Content Cell  | Content Cell  | |
| Content Cell  | Content Cell  | | 


## Video Annotation

coming soone in Dec 2018


