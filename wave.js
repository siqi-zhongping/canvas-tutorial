import utils from './utils'
import * as dat from 'dat.gui'

const gui = new dat.GUI()
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
var innerWidth = window.innerWidth;
var innerHeight = window.innerHeight;
canvas.width = innerWidth
canvas.height = innerHeight
const wave = {
  y:canvas.height/2,
  length:0.01,
  amplitude:100,
  frequency:0.01
}

const strokeColor = {
  h:200,
  s:50,
  l:50
}

const backgroudColor = {
  r:0,
  g:0,
  b:0,
  a:0.01
}
const waveFolder = gui.addFolder("wave")
waveFolder.add(wave,'y',0,canvas.height)
waveFolder.add(wave,'length',-0.01,0.01)
waveFolder.add(wave,'amplitude',-300,300)
waveFolder.add(wave,'frequency',-0.01,1)
waveFolder.open()

const strokeFolder = gui.addFolder("strokeColor")
strokeFolder.add(strokeColor,'h',0,100)
strokeFolder.add(strokeColor,'s',0,100)
strokeFolder.add(strokeColor,'l',0,100)
strokeFolder.open()

const backgroudColorFolder = gui.addFolder("backgroudColor")
backgroudColorFolder.add(backgroudColor,'r',0,255)
backgroudColorFolder.add(backgroudColor,'g',0,255)
backgroudColorFolder.add(backgroudColor,'b',0,255)
backgroudColorFolder.add(backgroudColor,'a',0,1)
backgroudColorFolder.open()



let increment = wave.length;
function animate(){
  requestAnimationFrame(animate)
  c.fillStyle = `rgba(${backgroudColor.r},${backgroudColor.g},${backgroudColor.b},${backgroudColor.a})`;
  c.fillRect(0,0,canvas.width,canvas.height);
  //c.clearRect(0,0,canvas.width,canvas.height);
  c.beginPath();
  c.moveTo(0,innerHeight/2);
  var radianIncrease  = (Math.PI*2)/innerWidth;
  for(var i=0;i<innerWidth;i++){
    c.lineTo(i,wave.y+Math.sin(i*wave.length+increment)*wave.amplitude*Math.sin(increment));
  }
  c.strokeStyle = `hsl(${Math.abs(strokeColor.h*Math.sin(increment))},${strokeColor.s}%,${strokeColor.l}%)`
  c.stroke();
  c.closePath();
  increment = increment+wave.frequency
}
animate()

