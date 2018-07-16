import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { ButtonGroup, Button, Collapse } from 'reactstrap';
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import MdAdd from 'react-icons/lib/md/add';
import MdCallSplit from 'react-icons/lib/md/call-split';
import IoEyeDisabled from 'react-icons/lib/io/eye-disabled';
import IoEye from 'react-icons/lib/io/eye';
import MdDelete from 'react-icons/lib/md/delete';
import FaChevronDown from 'react-icons/lib/fa/chevron-down';
import MdRedo from 'react-icons/lib/md/redo';
import MdUndo from 'react-icons/lib/md/undo';

import './Instructions.css';
import {SPLIT, HIDE, SHOW} from '../../models/2DVideo.js';


class Instructions extends Component {

	constructor(props){
		super(props)
		this.state = { collapse: true };
	}

	toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  }

	render(){
		return(
				<div>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
							<CardTitle>Task</CardTitle>
							<CardText className="mb-5">Your task is to use bounding box to annotate and track biological cells showed on a given video precisely.</CardText>
							<CardTitle className="mb-3">How to?</CardTitle>
							<CardSubtitle className="mb-1 text-uppercase font-weight-bold">Step 1: Add bouding box </CardSubtitle>
							<CardText className="d-flex align-items-center mb-3">Click <Button disabled style={{opacity: 1}} outline color="primary" className="d-flex align-items-center instruc-button"><MdAdd/> Add Box</Button>to add a new bounding box. Then, click and drag on the video to bound cells.</CardText>
							<CardSubtitle className="mb-1 text-uppercase font-weight-bold">Step 2: Track cells and bound the cells precisely</CardSubtitle>
							<CardText className="mb-3">Go through the video. Move and resize boxes to make sure the cells are bound precisely.</CardText>
							<CardSubtitle className="mb-1 text-uppercase font-weight-bold">Step 3: Split the bounding box </CardSubtitle>
							<CardText className="d-flex align-items-center mb-3">If the tracked cell split into two cells, use <Button disabled style={{opacity: 1}} outline className="d-flex align-items-center instruc-button"><MdCallSplit/> {SPLIT} this box</Button> to split the parent bounding box.</CardText>
							<CardSubtitle className="mb-1 text-uppercase font-weight-bold">Step 4: Hide or show the bounding box if the cells leave or obscured</CardSubtitle>
							<CardText className="d-flex align-items-center mb-3">If cells leave or obscured by other objects, use <Button disabled style={{opacity: 1}} outline className="d-flex align-items-center instruc-button"><IoEyeDisabled/> {HIDE} this box</Button> to hide their boxes. Instead, use <Button disabled style={{opacity: 1}} outline className="d-flex align-items-center instruc-button"><IoEye/> {SHOW} this box</Button> to show the bounding boxes.</CardText>
							<CardSubtitle className="mb-1 text-uppercase font-weight-bold">Step 5: Submit the task</CardSubtitle>
							<CardText className="d-flex align-items-center mb-5">Click <Button disabled style={{opacity: 1}} className="d-flex align-items-center instruc-button" >I finished the task</Button> to submit.</CardText>
							<CardTitle>Others</CardTitle>
							<dl className="row">
							  <dt className="col-sm-2"><ButtonGroup><Button disabled style={{opacity: 1}} outline className="d-flex align-items-center"><MdUndo/></Button><Button disabled style={{opacity: 1}} outline className="d-flex align-items-center"><MdRedo/></Button></ButtonGroup></dt>
							  <dd className="col-sm-10">used to redo and undo.</dd>
								<dt className="col-sm-2 d-flex align-items-center"><Button disabled style={{opacity: 1}} outline className="d-flex align-items-center instruc-delete-button"><MdDelete/></Button></dt>
							  <dd className="col-sm-10">used to delete bounding boxes or trajectories.</dd>
								<dt className="col-sm-2 d-flex align-items-center">Trajectories <FaChevronDown/></dt>
							  <dd className="col-sm-10">used to track the trajectories you made.</dd>
							</dl>
						</CardBody>
          </Card>
        </Collapse>
				<Button outline block color="secondary" onClick={this.toggle}>{this.state.collapse? "Fold": "Unfold" } Instructions</Button>
				</div>
	)}
}

export default Instructions;
