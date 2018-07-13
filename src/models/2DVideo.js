export class VideoObject {
  constructor({id, name, color, trajectories, children = [], parent = ''}) {
		this.id = id;
    this.name = name;
    this.color = color;
		this.trajectories =  trajectories;
		this.children = children;
		this.parent = parent;
  }
}
export class Trajectory{
	constructor({x, y, width, height, time, status= SHOW}) {
    this.x = x;
    this.y = y;
		this.width = width;
		this.height = height;
		this.time = time;
		this.status = status;
  }
	static clearDuplicateTrajectory(trajectories, status){
		for (let i = trajectories.length - 1; i > 0; i--) {
	    if (trajectories[i].status === status && trajectories[i].status === trajectories[i-1].status) {
	        trajectories.splice(i, 1);
	    }
		}
	}
}

export const SHOW = 'Show'
export const HIDE = 'Hide'
export const SPLIT = 'Split'
