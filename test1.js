let clock;
let fish;
let tree;
let sn;
let ansArr;
let cnv;
let offset = 784;

const clock_nunber=1;
const fish_number=2;
const tree_number=3;


function preload()
{
  clock=loadBytes("../clock.bin");
  fish=loadBytes("../fish.bin");
  tree=loadBytes("../tree.bin");
}


function setup()
{
  cnv=createCanvas(840,840);
  background(0);
  sn=new Synaptic_Networks(offset,Math.floor(offset/2),3);
}



function train()
{
  
  let tree_datset=getTreedata();
  let fish_dataset=getFishdata();
  let clock_dataset=getClockdata();
  
  
  let inputArr=[].concat(tree_datset,fish_dataset,clock_dataset);
  
  //console.log(inputArr[3]);
  

  
  
  for(let i=0;i<100;i++)
  {
    let r=Math.floor(Math.random(0,inputArr.length)*1000);
    
    
    if(r<=500)
    { 
       ansArr=[1,0,0];
      
    }
    else if(r>500 && r<=1000)
    { 
       ansArr=[0,1,0];
      
    }
    else if(r>1000 && r<=1500)
    {
       ansArr=[0,0,1];
      
    }
    
    sn.train(inputArr[i],ansArr);
    
  }
  
  console.log("training successful!!!");
  
  
}


function getClockdata()
{
;
  let dataset = [];
  for (let i = 0; i < clock.bytes.length; i += offset)
  {
    dataset.push(clock.bytes.subarray(i, i + offset));
  }
 // console.log(dataset.length);
  
  return dataset;
}


function getFishdata()
{
  let offset = 784;
  let dataset = [];
  for (let i = 0; i < clock.bytes.length; i += offset)
  {
    dataset.push(clock.bytes.subarray(i, i + offset));
  }
//  console.log(dataset.length);

  return dataset;
}


function getTreedata()
{
  let offset = 784;
  let dataset = [];
  for (let i = 0; i < clock.bytes.length; i += offset)
  {
    dataset.push(clock.bytes.subarray(i, i + offset));
  }
 // console.log(dataset.length);

  return dataset;
}






function draw()
{
  strokeWeight(8);
  stroke(255);
  
  line(pmouseX,pmouseY,mouseX,mouseY);
  
  
}



function test()
{
  let img=cnv.get();
  img.resize(28,28);
  img.loadPixels();
  let testArr=[];
  //console.log(testArr.length);
  for(let i=0;i<img.pixels.length;i+=4)
  {
    let brightness=img.pixels[i];
    testArr.push(brightness/255.0);
  }
 // console.log(testArr);
 
 let mostFinalResult= sn.feedforward(testArr);
 console.log(mostFinalResult.weighted_sum_hidden_outputs)
 
 decide(mostFinalResult.weighted_sum_hidden_outputs);
 
 
}


function decide(value)
{
  let maximum = 0;
  let index = -1;
  for (let i = 0; i < value.length; i++)
  {
    if (value[i] > maximum)
    {
      maximum = value[i];
      index = i;
    }
  }

  let box = document.getElementById('results');

  if (index === 0)
  {
  
    box.innerText = "Its tree with a accuracy of " + value[index] * 100 + "%";
  }
  else if (index === 1)
  {
    
    box.innerText = "Its fish with a accuracy of " + value[index] * 100 + "%";
  }
  else
  {
    
    box.innerText = "Its clock with a accuracy of " + value[index] * 100 + "%";
  }
}