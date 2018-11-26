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
import MdArrowForward from 'react-icons/lib/md/arrow-forward';
import cellBoundBefore from './images/cellBoundBefore.png';
import cellBoundAfter from './images/cellBoundAfter.png';
import cellBoundAfterMoving from './images/cellBoundAfterMoving.png';
import cellSplitAfter from './images/cellSplitAfter.png';
import cellSplitBefore from './images/cellSplitBefore.png';
import cellHideAfter from './images/cellHideAfter.png';
import cellHideBefore from './images/cellHideBefore.png';

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

							<CardTitle>Motivations</CardTitle>
							<CardText className="mb-5">
							The larger goal of your work is to contribute to discoveries and innovations that,
							for example, treat diseases, prevent diseases, lead to new bio-inspired technology, and answer
							basic science questions about fundamental biological processes.
							The focus for this proposed work will be on designing methods that (1) follow each cell over
							time (i.e., tracking) and (2) recognize the time point at which each cell transitions to a new stage
							of life (i.e., classification). Such a system will empower researchers to measure the duration cells
							stay in different life cycle phases, an important precursor for many desired applications (e.g., drug
							discovery, biomaterial creation, and tissue/organ generation).
							</CardText>
							<CardTitle>Task</CardTitle>
							<CardText className="mb-3">Your task is to use bounding box to annotate and track biological cells showed on a given video precisely.</CardText>
							<div className="mb-5 d-flex align-items-center">
								<figure className="figure">
								  <img src={cellBoundBefore} className="figure-img img-fluid rounded cell-bound-img"  />
								  <figcaption className="figure-caption">Cell example.</figcaption>
								</figure>
								<MdArrowForward style={{margin: "0px 10px 30px 10px"}} />
								<figure className="figure">
								  <img src={cellBoundAfter} className="figure-img img-fluid rounded cell-bound-img" />
								  <figcaption className="figure-caption">Bound with a bounding box.</figcaption>
								</figure>
								<MdArrowForward style={{margin: "0px 10px 30px 10px"}} />
								<figure className="figure">
								  <img src={cellBoundAfterMoving} className="figure-img img-fluid rounded cell-bound-img" />
								  <figcaption className="figure-caption">Track and adjust the box.</figcaption>
								</figure>
							</div>
							<CardTitle className="mb-4">How to?</CardTitle>
							<CardSubtitle className="font-weight-bold">Step 1: Add bounding box </CardSubtitle>
							<CardText className="mb-4 d-flex align-items-center">Click <Button disabled style={{opacity: 1}} outline color="primary" className="d-flex align-items-center instruc-button"><MdAdd/> Add Annotation</Button>to add a new bounding box. Then, click and drag on the video to bound cells.</CardText>
							<CardSubtitle className="font-weight-bold">Step 2: Track cells and bound the cells precisely</CardSubtitle>
							<CardText className="mb-4">Go through the video. Move and resize boxes to make sure the cells are bound precisely.</CardText>
							<CardSubtitle className="font-weight-bold">Step 3a: Split the bounding box </CardSubtitle>
							<div className="d-flex align-items-center" style={{marginBottom: 5}}>If the tracked cell split into two cells, use <Button disabled style={{opacity: 1}} outline className="d-flex align-items-center instruc-button"><MdCallSplit/> {SPLIT} this box</Button> to split the parent bounding box.</div>
							<div className="mb-2 d-flex align-items-center">
								<figure className="figure">
								  <img src={cellSplitBefore} className="figure-img img-fluid rounded cell-split-img" />
								  <figcaption className="figure-caption">Before split.</figcaption>
								</figure>
								<MdArrowForward style={{margin: "0px 10px 30px 10px"}} />
								<figure className="figure">
								  <img src={cellSplitAfter} className="figure-img img-fluid rounded cell-split-img" />
								  <figcaption className="figure-caption">After split.</figcaption>
								</figure>
							</div>
							<CardSubtitle className="font-weight-bold">Step 3b: Hide or show the bounding box if the cells leave or obscured</CardSubtitle>
							<div className="d-flex align-items-center" style={{marginBottom: 5}}>If cells leave or obscured by other objects, use <Button disabled style={{opacity: 1}} outline className="d-flex align-items-center instruc-button"><IoEyeDisabled/> {HIDE} this box</Button> to hide their boxes. Instead, use <Button disabled style={{opacity: 1}} outline className="d-flex align-items-center instruc-button"><IoEye/> {SHOW} this box</Button> to show the bounding boxes.</div>
							<div className="mb-2 d-flex align-items-center">
									<figure className="figure">
									  <img src={cellHideBefore} className="figure-img img-fluid rounded cell-hide-img" />
									  <figcaption className="figure-caption">Cell leaving</figcaption>
									</figure>
									<MdArrowForward style={{margin: "0px 10px 30px 10px"}} />
									<figure className="figure">
									  <img src={cellHideAfter} className="figure-img img-fluid rounded cell-hide-img" />
									  <figcaption className="figure-caption">Cell left</figcaption>
									</figure>
							</div>
							<CardSubtitle className="font-weight-bold">Step 5: Submit the task</CardSubtitle>
							<CardText className="d-flex align-items-center mb-5">Click <Button disabled style={{opacity: 1}} className="d-flex align-items-center instruc-button" >I finished the task</Button> to submit.</CardText>

							<CardTitle className="pt-3">Others</CardTitle>
							<dl className="row">
							  <dt className="col-sm-3 text-right"><ButtonGroup><Button disabled style={{opacity: 1}} outline className="d-flex align-items-center"><MdUndo/></Button><Button disabled style={{opacity: 1}} outline className="d-flex align-items-center"><MdRedo/></Button></ButtonGroup> :</dt>
							  <dd className="col-sm-9 d-flex align-items-center" style={{marginBottom: 0}}>used to redo and undo.</dd>
								<dt className="col-sm-3 text-right"><Button disabled style={{opacity: 1}} outline className="instruc-delete-button"><MdDelete/></Button> :</dt>
							  <dd className="col-sm-9 d-flex align-items-center" style={{marginBottom: 0}}>used to delete bounding boxes or trajectories.</dd>
								<dt className="col-sm-3 text-right">Trajectories <FaChevronDown/> :</dt>
							  <dd className="col-sm-9 d-flex align-items-center" style={{marginBottom: 0}}>used to track the trajectories you made.</dd>
							</dl>
						</CardBody>
          </Card>
        </Collapse>
				<Button outline block color="secondary" onClick={this.toggle}>{this.state.collapse? "Fold": "Unfold" } Instructions</Button>
				</div>
	)}
}

export default Instructions;
