let screenV;
function screenfun() {
  let widthv = document.body.clientWidth;
  if(widthv < 1366 || widthv == 1366){
    screenV = true;
  }else{
    screenV = false;
  }
  return screenV;
}
export default {
  screenfun
}