let canvasSize;
let UNIT;
const GRID_COLS = 36;
const GRID_ROWS = 36;

const BG     = "#ffffffff";
const YELLOW = "#f4d31f";
const RED    = "#d1372a";
const BLUE   = "#2956a4";
const GREY   = "#d5cfc5";

//lines and blocks

// YELLOW_VERTICAL_LINES [x, y, w, h]
const YELLOW_VERTICAL_LINES = [
  
];

// YELLOW_HORIZONTAL_LINES [x, y, w, h]
const YELLOW_HORIZONTAL_LINES = [
  
];

// segement [ dx, dy, color ]
const SEGMENTS = [
  
];

// big red and blue blocks [x, y, w, h]
const RED_BLOCKS = [

];

const BLUE_BLOCKS = [

];

// red block with white block and yellow segments inside it
const NESTED_A = {
 
};

const NESTED_B = {

};

// grey dots [x, y]
const GREY_DOTS = [
  
];




// class
class Mondrian {
  constructor() {
    this.rects = [];
    this.build();
  }


  addRect(gx, gy, gw, gh, color) {
    this.rects.push({ gx, gy, gw, gh, color });
  }

  
  addBatch(list, color) {
    list.forEach(([x,y,w,h]) => this.addRect(x, y, w, h, color));
  }

  
  addOffsetPoints(baseX, baseY, points) {
    points.forEach(([dx,dy,color]) => {
      this.addRect(baseX + dx, baseY + dy, 1, 1, color);
    });
  }

  build() {
    this.buildYellow();
    this.buildSegments();
    this.buildBlocks();
    this.buildNested();
    this.buildGreys();
  }

  draw() {
    for (const r of this.rects) {
      fill(r.color);
      rect(r.gx * UNIT, r.gy * UNIT, r.gw * UNIT, r.gh * UNIT);
    }
  }

  // yellow lines
  buildYellow() {
    this.addBatch(YELLOW_VERTICAL_LINES,   YELLOW);
    this.addBatch(YELLOW_HORIZONTAL_LINES, YELLOW);
  }

  // red blue segment
  buildSegments() {
    SEGMENTS.forEach(([baseX, baseY, points]) => {
      this.addOffsetPoints(baseX, baseY, points);
    });
  }

  // big red blue blocks
  buildBlocks() {
    this.addBatch(RED_BLOCKS,  RED);
    this.addBatch(BLUE_BLOCKS, BLUE);
  }

  // red block with white block and yellow segments inside it
  buildNestedBlock(config) {
    const [bx, by] = config.base;
    const [ox, oy, ow, oh, outerColor] = config.outer;
    const [ix, iy, iw, ih, innerColor] = config.inner;
    const [ybx, yby] = config.yellowBaseOffset;

    this.addRect(bx + ox, by + oy, ow, oh, outerColor);
    
    this.addRect(bx + ix, by + iy, iw, ih, innerColor);
    
    config.yellowOffsets.forEach(([dx,dy]) => {
      this.addRect(bx + ybx + dx, by + yby + dy, 1, 1, YELLOW);
    });
  }

  buildNested() {
    this.buildNestedBlock(NESTED_A);
    this.buildNestedBlock(NESTED_B);
  }

  // grey dots
  buildGreys() {
    GREY_DOTS.forEach(([x,y]) => this.addRect(x, y, 1, 1, GREY));
  }
}





//main

let mondrian;

function setup() {
  rectMode(CORNER);
  noStroke();
  mondrian = new Mondrian();
  noLoop();
}

function draw() {
  background(BG);
  mondrian.draw();
}