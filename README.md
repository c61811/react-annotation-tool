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



#### Config Props

| Prop             | Description   | Format | Default |
| -------------    | ------------- | ------------- | -------------| 
| url              | Source of annotated image |               |
| annotationWidth  | Set the width of image    |               |
| dynamicOptions       | Enable annotators to add/delete options |       false        |
| disabledOptionLevels | The levels which can't be selected. Start from "1". e.g., [1, 2] means level 1, 2 can't be selected||
| category  | Category of this image |""|
| categoryOptions  | Content Cell  |                 |
| Content Cell  | Content Cell  |                  |


#### Callback props

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


