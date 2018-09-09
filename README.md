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
| url              | Source of annotated image |String||
| annotationWidth  | Set the width of image|Number||
| dynamicOptions       | Enable annotators to add/delete menu options |Boolean|false|
| disabledOptionLevels | The levels which can't be selected. Start from "1". [Detail](#disabledOptionLevels)|[String]||
| category  | Category of the image |String|
| categoryOptions  |  Options for categories. [Detail](#categoryOptions)| [String]||
| menu | A set of options for tagging the image. [Detail](#menu)|Object||
| annotations | Default annotations. [Detail](#annotations)|[Object]||

#### disabledOptionLevels
Array of Integer. Start from 1
```
[1, 2] means level 1, 2 can't be selected
```
#### categoryOptions
Array of String
```
["No Objects", "No Image"]
```
#### menu
Nested array of object. Each object has "id", "value" and "options" properties. Must start from object with "root" value.

```
{id: "0", value: "root", options: [
   {id: "1", value: "Electronic", options: [
      {id: "1-1", value: "Laptop", options: [
         {id: "1-1-1", value: "Apple", options: []},         
         {id: "1-1-2", value: "Asus", options: []}  
         ]}, 
      {id: "1-2", value: "Charger", options: []},
      {id: "1-3", value: "Watch", options: []}
      ]},
   {id: "2", value: "Stationery", options: [
      {id: "2-1", value: "Pen", options: []},
      {id: "2-2", value: "Eraser", options: []}
      ]}
   ]}
```
#### annotations



### Callback props

| Prop           | Description   |
| -------------  | ------------- | 
| onNextClick    | Called when Next button is Clicked |  
| onPreviousClick| Called when Previous button is Clicked|        
| onSkipClick    | Called when Skip button is Clicked|        


#### Output


| Prop           | Description | Default |
| ------------- | ------------- | ------------- |
| Content Cell  | Content Cell  | |
| Content Cell  | Content Cell  | | 


## Video Annotation

coming soone in Dec 2018


