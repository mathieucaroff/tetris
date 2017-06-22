jst.scoreCode = jst.pushModuleCode(function () {
var score = jst.score = {};
  
score.value = 0;
score.increment = new Hook();
score.increment.core = function () {
  score.value++;
};
score.increment.after.push(crd.board.rend.run);
ld && ld.deleteLine.execution.push(score.increment.run);
jst.debug && tris.fall.collision.execution.push(score.increment.run);


var cscore = score.cscore = {};
{// crd: cscore
  // cscore.getPointPositionsFromNumber:
  let n = null;
  cscore.predefienedPositions = [0,0, 1,0, 0,1, 0,2, 2,0, 2,1, 1,2, 1,1, 2,2];
  cscore.solePosition = [n,n, 1,1, n,n, 1,1, n,n, 1,1, n,n, 1,1, n,n];
  cscore.pointsPerGroup = Math.floor(cscore.predefienedPositions.length/2);
  cscore.xOffsetPerGroup = 0;
  cscore.yOffsetPerGroup = 3;
  
  // cscore.getPointPositionsFromNumber
  cscore.fillColor = '#FFFFFF';
  cscore.strokeColor = '#BBBBBB';
  cscore.positionRatioPX = 0.25 / crd.board.width;
  cscore.positionRatioPY = 2 / crd.board.height;
  cscore.handleResize = new Hook();
  cscore.handleResize.core = function () {
    cscore.spacing = crd.pps * 1;
    cscore.pxPadding = crd.pps * 1;
    cscore.pyPadding = crd.pps * 1;
    cscore.pointRadius = crd.pps/3;
    cscore.lineWidth = crd.pps/6;
  }
  cscore.handleResize.core()
  crd.handleResize.execution.push(cscore.handleResize.run);


  /**
   * cscore.getPointPositionsFromNumber
   * @param pointnumber {int} Score value, to be attributed a positionarray.
   * @return positionarray {array: int} Array of (x and y) integer positionarray of each of the `pointnumber` points.
   * @process
   *   (1) First deal with the whole groups that can be made. (`cscore.pointsPerGroup`)
   *   (2) Then, deal with the last group, by copying from cscore.predefienedPositions
   *   (3) At last, if needed, modify the last point to match the one from solePosition
   */
  cscore.getPointPositionsFromNumber = function (pointnumber) {
    let positionarray = Array(2 * pointnumber);
    // (1) Whole groups //
    let ppg = cscore.pointsPerGroup;
    let wholeGroupCount = Math.floor(pointnumber/ppg);
    let wholeCount = wholeGroupCount * ppg;
    
    let pfiller = new cscore.positionFiller();
    pfiller.destPosArray = positionarray;
    pfiller.srcPosArray = cscore.predefienedPositions;
    pfiller.skipCount = 0;
    pfiller.pointCount = wholeCount;
    pfiller.pointPerGroup = ppg;
    pfiller.xOffsetPerGroup = 0;
    pfiller.yOffsetPerGroup = cscore.yOffsetPerGroup;
    pfiller.doFill();
    
    // (2&3) Last group //
    let remainingCount = pointnumber - wholeCount;
    
    // (2) Adding the remaining points //
    pfiller.srcPosArray = cscore.predefienedPositions;
    pfiller.skipCount = wholeCount;
    pfiller.pointCount = remainingCount;
    pfiller.doFill();
    
    // (3) Changing the last point if needed //
    /* Uncomment the code below when ereasing score board is ready. */
    /**/
    if (cscore.solePosition[2 * remainingCount - 1] !== null) {
      pfiller.srcPosArray = cscore.solePosition;
      pfiller.skipCount = pointnumber - 1;
      pfiller.pointCount = 1;
      pfiller.doFill();
    }
    /**/
    return positionarray;
  };
  
  /**
   * cscore.positionFiller
   * Used to fill position array
   */
  cscore.positionFiller = class {
    /**
     * doFill
     * Fills one array repeating another one, but incrementing an offset per group of values
     * @attr destPosArray {posArray: int}
     * @attr srcPosArray {posArray: int}
     * @attr skipCount {int} number of points skipped in the destination array before starting copying from the source array
     * @attr pointCount {int} number of points to copy before stopping.
     * @attr pointPerGroup {int} number of points in each group
     * @attr xOffsetPerGroup {int} offset to add between each group while copying to destination.
     * @attr xOffsetPerGroup {int} {@see @attr $above}
     */
    doFill () {
      let ppg = this.pointPerGroup;
      for (let i of range(this.skipCount, this.skipCount + this.pointCount)) {
        let groupIndex = Math.floor(i/ppg);
        let xOffset = this.xOffsetPerGroup * groupIndex;
        let yOffset = this.yOffsetPerGroup * groupIndex;
        this.destPosArray[2*i]   = xOffset + this.srcPosArray[2*(i%ppg)];
        this.destPosArray[2*i+1] = yOffset + this.srcPosArray[2*(i%ppg)+1];
      }
    }
  }
  
  /**
   * cscore.drawScore
   * Draws the pattern corresponding to the score
   */
  cscore.drawScore = function () {
    let positionarray = cscore.getPointPositionsFromNumber(score.value);
    let staticPXoffset = crd.board.pxoff + cscore.positionRatioPX * crd.board.pwidth + cscore.pxPadding;
    let staticPYoffset = crd.board.pyoff + cscore.positionRatioPY * crd.board.pheight + cscore.pyPadding;
    crd.ctx.fillStyle = cscore.fillColor;
    crd.ctx.strokeStyle = cscore.strokeColor;
    crd.ctx.lineWidth = cscore.lineWidth;
    for (let i of range(0, positionarray.length, 2)) {
      crd.drawCircle(staticPXoffset + cscore.spacing * positionarray[i],
                     staticPYoffset + cscore.spacing * positionarray[i+1],
                     cscore.pointRadius);
      crd.ctx.fill();
      crd.ctx.stroke();
    }
  };
  crd.board.rend.after.push(cscore.drawScore);
  //cscore.handleResize.after.push(cscore.drawScore);
  //score.increment.after.push(cscore.drawScore);
}
  
});