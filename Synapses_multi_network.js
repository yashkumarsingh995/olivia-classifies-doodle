class Activation
{
  static sigmoid(x)
  {
    return (1 / (1 + Math.exp(-x)));
  }
}

class Activation_Derevative
{
  static derevative_sigmoid(y)
  {
    return y * (1 - y);
  }

}





class Synaptic_Multi_Layer{
  
 constructor(input_nodes,output_nodes,hidden_nodes_array)
{
  
  this.input_nodes=input_nodes;
  this.output_nodes=output_nodes;
  
  
  this.hidden_nodes=new Array(hidden_nodes_array.length);
  
  for(let i=0;i<hidden_nodes_array.length;i++)
  {
    this.hidden_nodes[i]=hidden_nodes_array[i];
  }
  
  
  this.weighted_hidden_layer=new Array(hidden_nodes_array.length+1);
  
  var input=input_nodes;
  var hidden;
  
  for(let k=0;k<=hidden_nodes_array.length;k++)
  { 
    if(k===hidden_nodes_array.length)
    {
      hidden=this.output_nodes;
    }
    else
    {
      hidden=this.hidden_nodes[k];
    }
    
     let weighted_edges=new Synaptic_Matrix(hidden,input);
    
     weighted_edges.randomize();
    
     this.weighted_hidden_layer[k]=weighted_edges;
    
    input=hidden;
    
   // console.warn(this.weighted_hidden_layer.length);
    
    //Synaptic_Matrix.print(this.weighted_hidden_layer[k]);
  }
  
  
  
  this.layered_bias=new Array(hidden_nodes_array.length+1);
  
  let bias_hidden;
  
  for(let k=0;k<=hidden_nodes_array.length;k++)
  { 
    if(k===hidden_nodes_array.length)
    {
      bias_hidden=this.output_nodes;
    }
    else
    {
      bias_hidden=this.hidden_nodes[k];
   //   console.log(bias_hidden);
    }
    
    let bias=new Synaptic_Matrix(bias_hidden,1);
    
    bias.randomize();
   
    
    this.layered_bias[k]=bias;
    
    
 //   Synaptic_Matrix.print(this.layered_bias[k]);
  }
  
  this.learning_rate=0.1;
 
  
}



//feedforwrad algorithm for multilayer


feedforward(input_array)
{
  
  
  
  let inputs=Synaptic_Matrix.fromArray(input_array);
//  Synaptic_Matrix.print(inputs);
  
  let layered_weighted_sum=new Array(this.hidden_nodes.length+1);
  
  let input=inputs;
  let hidden;
  let front_layer;
  
  for(let i=0;i<layered_weighted_sum.length;i++)
  {
    
    front_layer=this.weighted_hidden_layer[i];
    
    let weighted_sum=front_layer.multiplication(input);
    weighted_sum.addition(this.layered_bias[i]);
    weighted_sum.map(Activation.sigmoid)
    

    layered_weighted_sum[i]=weighted_sum;
    
    input=layered_weighted_sum[i];
    
 //   Synaptic_Matrix.print(this.weighted_hidden_layer[i]);
  }
  
  for(let i=0;i<layered_weighted_sum.length;i++)
  {
   // Synaptic_Matrix.print(layered_weighted_sum[i]);
    
    layered_weighted_sum[i]=Synaptic_Matrix.toArray(layered_weighted_sum[i]);
    
   // console.log(layered_weighted_sum[i]);
  }
  //console.table(layered_weighted_sum);
  
  return layered_weighted_sum;
  

  
  
}




train(input_array,answer_array)
{
  
  let input=Synaptic_Matrix.fromArray(input_array);
  
  let inputs_transposed=Synaptic_Matrix.transpose(input);
  
  
  let right_output=Synaptic_Matrix.fromArray(answer_array);
  
  //Synaptic_Matrix.print(right_output);
  
  
  
  let feedforward=this.feedforward(input_array);
  
 // console.table(feedforward);
  for (let i = 0; i < feedforward.length; i++)
  {
   feedforward[i] = Synaptic_Matrix.fromArray(feedforward[i]);
   
   
  // Synaptic_Matrix.print(feedforward[i]);
  }
  
  
  let weighted_hidden_layer_transposed=new Array(this.weighted_hidden_layer.length);
  
  for(let i=0;i<this.weighted_hidden_layer.length;i++)
  {
    weighted_hidden_layer_transposed[i]=Synaptic_Matrix.transpose(this.weighted_hidden_layer[i]);
    
   // Synaptic_Matrix.print(weighted_hidden_layer_transposed[i]);
    
  }
  
  let feedforward_transposed=new Array(feedforward.length);
  
  for (let i = 0; i < feedforward.length; i++)
  {
    feedforward_transposed[i] = Synaptic_Matrix.transpose(feedforward[i]);
  
    // Synaptic_Matrix.print(feedforward_transposed[i]);
  
  }
  
 
 
  let arbitrary_output=feedforward[feedforward.length-1];
// console.log(arbitrary_output);
 //arbitrary_output=Synaptic_Matrix.fromArray(arbitrary_output);
 
 
 let error_in_output=Synaptic_Matrix.subtraction(right_output,arbitrary_output);

/*
 if(arbitrary_output instanceof(Synaptic_Matrix))
 {
   console.warn("hii")
 }
 else
 {
   console.log("bye")
 }*/
//Synaptic_Matrix.print(error_in_output);
//Synaptic_Matrix.print(error_in_output);
 
 
  
 let layered_errors=new Array(this.hidden_nodes.length+1);
 
 //console.log(layered_errors.length);
 
  
  layered_errors[this.hidden_nodes.length]=error_in_output;
  
  
  //Synaptic_Matrix.print(layered_errors[layered_errors.length-1]);
  
  
  
  let error=error_in_output;
  
 // Synaptic_Matrix.print(error);
  
  for(let i=this.hidden_nodes.length-1;i>=0;i--)
  {
  //  Synaptic_Matrix.print(weighted_hidden_layer_transposed[i]);
   
   let layer_erorr=weighted_hidden_layer_transposed[i+1].multiplication(error);
   
   //Synaptic_Matrix.print(layer_erorr);
    
    layered_errors[i]=layer_erorr;
    
    error=layered_errors[i];
    
  // Synaptic_Matrix.print(layered_errors[i]);
  }
  
  
  
  
  
  //gradient part
  
  let layered_gradient=new Array(layered_errors.length);
  
  let delta_weights=new Array(layered_errors.length);
  
  for(let i=this.hidden_nodes.length;i>=0;i--)
  {
    
    layered_gradient[i]=Synaptic_Matrix.map(feedforward[i],Activation_Derevative.derevative_sigmoid);
    
   // Synaptic_Matrix.print(layered_gradient[i]);
    
    layered_gradient[i].multiplication(this.learning_rate);
    
  // Synaptic_Matrix.print(layered_errors[i]);
    
    layered_gradient[i]=Synaptic_Matrix.multiplicationElementwise(layered_gradient[i],layered_errors[i]);
    
  //  Synaptic_Matrix.print(layered_gradient[i]);
    
    this.layered_bias[i].addition(layered_gradient[i]);
    
  //Synaptic_Matrix.print(this.layered_gradient[i]);
  //Synaptic_Matrix.print(inputs_transposed);
    
    
    if(i===0)
    {
      delta_weights[i]=layered_gradient[i].multiplication(inputs_transposed);
    }
    else
    {
    delta_weights[i]=layered_gradient[i].multiplication(feedforward_transposed[i-1]);
    }
  
  //Synaptic_Matrix.print(delta_weights[i]);
    //this.weighted_hidden_layer[i]);
 
  
  this.weighted_hidden_layer[i] = Synaptic_Matrix.addition(this.weighted_hidden_layer[i],delta_weights[i]);
    
    
  // Synaptic_Matrix.print(this.weighted_hidden_layer[i]);
    
  }
  
 /* 
  */
  
  
}






}