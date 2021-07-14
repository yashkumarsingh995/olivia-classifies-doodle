class Activation
{
  static sigmoid(x)
  {
    return (1/(1+Math.exp(-x)));
  }
}

class Activation_Derevative
{
  static derevative_sigmoid(y)
  {
    return y*(1-y);
  }
  
}


class Synaptic_Networks
{
  // constructor function 
  constructor(input_nodes,hidden_nodes,output_nodes)
  { 
    //nunber of input nodes 
    this.input_nodes=input_nodes;
    //number of hidden nodes
    this.hidden_nodes=hidden_nodes;
    //number of output nodes
    this.output_nodes=output_nodes;
    
    
    //weight matrix for input-hidden layer.
    this.weight_input_hidden=new Synaptic_Matrix(this.hidden_nodes,this.input_nodes);
    //initialised with random values.
    this.weight_input_hidden.randomize();
    
    //weight matrix for hidden-output layer.
    this.weight_hidden_output=new Synaptic_Matrix(this.output_nodes,this.hidden_nodes);
    //initialised with randim values.
    this.weight_hidden_output.randomize();
    
    
    //initialisation of biases
    //1)bias for hidden layer.
    this.bias_hidden=new Synaptic_Matrix(hidden_nodes,1);
    this.bias_hidden.randomize();
    
    //2)bias for output layer.
    this.bias_output=new Synaptic_Matrix(output_nodes,1);
    this.bias_output.randomize();
    
    this.learning_rate= 0.1;
    
  }
  
  
  
  //feedforward algorithm
  
  feedforward(input_array)
  {
    //1)converting the input array into a column matrix 
    let inputs= Synaptic_Matrix.fromArray(input_array);
    
    
    //matrix multiplication on weight of inoput hidden layer and inputs
    
    let weighted_sum_input_hidden=this.weight_input_hidden.multiplication(inputs);
    
    //addition of biases with the weighted sum done here.
    
    weighted_sum_input_hidden.addition(this.bias_hidden);
    
    //applying activation function on the value    [W*I +B] of hiddwn layer.
    
    weighted_sum_input_hidden.map(Activation.sigmoid);
   
    /**********************************/
    
    /*********************************/
    
    //weighted sum for hidden-output layer.
    
    let weighted_sum_hidden_output=this.weight_hidden_output.multiplication(weighted_sum_input_hidden);
    
    //addition of bias of output layer 
    weighted_sum_hidden_output.addition(this.bias_output);
    //applying activation function on the output from the previous step.
    weighted_sum_hidden_output.map(Activation.sigmoid);
    
    let weighted_sum_hidden_output_array=Synaptic_Matrix.toArray(weighted_sum_hidden_output);
    
    
    let weighted_sum_input_hidden_array=Synaptic_Matrix.toArray(weighted_sum_input_hidden);
    
    
    return { weighted_sum_hidden_outputs: weighted_sum_hidden_output_array,weighted_sum_input_hiddens:weighted_sum_input_hidden_array}
    
  }
  
  
  
  //training the neural network
  
  train(inputs,ans)
  { 
    let input=Synaptic_Matrix.fromArray(inputs);
    
    let feedforward=this.feedforward(inputs);
    
    let right_answer=Synaptic_Matrix.fromArray(ans);
    
    let feedforward_ho_result=Synaptic_Matrix.fromArray(feedforward.weighted_sum_hidden_outputs);
    
    let feedforward_ih_result=Synaptic_Matrix.fromArray(feedforward.weighted_sum_input_hiddens);
    
    
    let error_in_output=Synaptic_Matrix.subtraction(right_answer,feedforward_ho_result);
    
    let weight_hidden_output_transposed=Synaptic_Matrix.transpose(this.weight_hidden_output);
    
    
    let error_in_hidden=weight_hidden_output_transposed.multiplication(error_in_output);
    
    
    let gradient_hidden_output = Synaptic_Matrix.map(feedforward_ho_result,Activation_Derevative.derevative_sigmoid);
    
    
    gradient_hidden_output.multiplication(this.learning_rate);
    
    let gradient_with_output_error=Synaptic_Matrix.multiplicationElementwise(gradient_hidden_output,error_in_output);
    
  //  Synaptic_Matrix.print(gradient_with_output_error);
  
    //this is delta bias 
    
    this.bias_output.addition(gradient_with_output_error);
   
 
  //  gradient_with_output_error.addition(this.bias_output);
    
  
    
    
    let hidden_transpose=Synaptic_Matrix.transpose(feedforward_ih_result);
    
    let delta_weight_hidden_output=gradient_with_output_error.multiplication(hidden_transpose);
    
    
    this.weight_hidden_output.addition(delta_weight_hidden_output);
    
    
    
 
    let gradient_input_hidden = Synaptic_Matrix.map(feedforward_ih_result,Activation_Derevative.derevative_sigmoid);
    
    
    gradient_input_hidden.multiplication(this.learning_rate);
    
    let gradient_with_hidden_error=Synaptic_Matrix.multiplicationElementwise(gradient_input_hidden,error_in_hidden);
    
    
  //  Synaptic_Matrix.print(gradient_with_hidden_error);
    
    this.bias_hidden.addition(gradient_with_hidden_error);
  //gradient_with_hidden_error.addition(this.bias_hidden);
    
    let input_transpose=Synaptic_Matrix.transpose(input);
    
    let delta_weight_input_hidden=gradient_with_hidden_error.multiplication(input_transpose);
    
    
    
    this.weight_input_hidden.addition(delta_weight_input_hidden);
    
    
    
    
  }
  
  
}