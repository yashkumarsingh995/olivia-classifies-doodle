"use strict"

/* LIST OF OPERATIONS :-
    1)constructor 
    2)randomize
    3)addition {scalar and elementwise}
    4)static addition
    5)subtraction
    6)static subtraction
    7)multiplication (scalar and matrix multiplication)
    8)static elementwise matrix multipcation
    9)static transpose
   10)map
   11)static map
   12)static fromArray
   13)static toArray
   14)static print.
*/
   
   
class Synaptic_Matrix
{
  //constructor function
  constructor(rows,cols)
  {
    this.rows=rows;
    this.cols=cols;
    
    this.matrix=[];
  
    for(let i=0;i<this.rows;i++)
      {
        this.matrix[i]=[];
        
        for(let j=0;j<this.cols;j++)
          {
               this.matrix[i][j]=0;
          }
      }
  }
  
  
  //randomize function
  randomize()
  {
    for(let i=0;i<this.rows;i++)
    {
      for(let j=0;j<this.cols;j++)
        {
           this.matrix[i][j]=Math.random(-1,1)*2-1;
        }
    }
  }
  

//scalar addition function || elementwise addition function (depending on the inputs)

  addition(n)
  {
     if(n instanceof Synaptic_Matrix)
       {
         for(let i=0;i<this.rows;i++)
           {
             for(let j=0;j<this.cols;j++)
                {
                   this.matrix[i][j]+=n.matrix[i][j];
                }
           }
        }
      else
        {
          for (let i = 0; i < this.rows; i++)
            {
             for (let j = 0; j < this.cols; j++)
               {
                  this.matrix[i][j] += n;
               }
            }
        }
  }
  
  
  //static function for scalar and element wise addition

 static addition(m,n)
  { 
    let arr= new Synaptic_Matrix(m.rows,m.cols);
    
  
    if (n instanceof Synaptic_Matrix)
    { 
      for (let i = 0; i < m.rows; i++)
      {
        for (let j = 0; j < m.cols; j++)
        {
           arr.matrix[i][j]= m.matrix[i][j] + n.matrix[i][j];
        }
      }
    }
    else
    {
      for (let i = 0; i < m.rows; i++)
      {
        for (let j = 0; j < m.cols; j++)
        {
          arr.matrix[i][j] = m.matrix[i][j]+n;
        }
      }
    }
    return arr;
  }

  
  
  subtraction(n)
  {
     if(n instanceof Synaptic_Matrix)
       {
         for(let i=0;i<this.rows;i++)
           {
             for(let j=0;j<this.cols;j++)
                {
                   this.matrix[i][j]-=n.matrix[i][j];
                }
           }
        }
      else
        {
          for (let i = 0; i < this.rows; i++)
            {
             for (let j = 0; j < this.cols; j++)
               {
                  this.matrix[i][j] -= n;
               }
            }
        }
  }
  
  
  //static function for scalar and element wise subtraction

 static subtraction(m,n)
  { 
    let arr= new Synaptic_Matrix(m.rows,m.cols);
   
  
    if (n instanceof Synaptic_Matrix)
    { 
      for (let i = 0; i < m.rows; i++)
      {
        for (let j = 0; j < m.cols; j++)
        {
           arr.matrix[i][j]= m.matrix[i][j] - n.matrix[i][j];
        }
      }
    }
    else
    {
      for (let i = 0; i < m.rows; i++)
      {
        for (let j = 0; j < m.cols; j++)
        {
          arr.matrix[i][j] = m.matrix[i][j]-n;
        }
      }
    }
    return arr;
  }

  //matrix multiplication function.
  
  
  multiplication(n)
{
  if(n instanceof Synaptic_Matrix)
  {
    //vector multiplication done
    if(this.cols!==n.rows)
    { 
      console.error("Columns of A must be equal to rows if B");
      return undefined;
    }
    
    let a = this;
    let b = n;
    
    let result= new Synaptic_Matrix(a.rows,b.cols);
    
    for(let i=0;i<result.rows;i++)
    { 
      for(let j=0;j<result.cols;j++)
      { 
        let sum=0;
        for(let k=0;k<a.cols;k++)
        { 
       //   console.log(b.matrix[k][j]);
          
          sum += a.matrix[i][k]*b.matrix[k][j];
        }
   
        result.matrix[i][j]=sum;
      }
    }
   
    return result;
    
  }
  else
  { 
    //scalar multiplication done 
  for (let i = 0; i < this.rows; i++)
  {
    for (let j = 0; j < this.cols; j++)
    {
      this.matrix[i][j] *= n;
    }
  }
  }
}


  // static hadamard elementwise multiplication in an array.
  
  static multiplicationElementwise(m,n)
  { 
    let newArr= new Synaptic_Matrix(m.rows,m.cols);
    
    if(n instanceof Synaptic_Matrix)
  {
    for(let i=0;i<m.rows;i++)
    {
      for(let j=0;j<m.cols;j++)
      {
        newArr.matrix[i][j]=m.matrix[i][j]*n.matrix[i][j]; 
      }
    }
  }
  else
  {
    for (let i = 0; i < m.rows; i++)
    {
      for (let j = 0; j < m.cols; j++)
      {
        newArr.matrix[i][j] = m.matrix[i][j] * n;
      }
    }
  }
  
    return newArr;
  }
  
  
 //transpose function
static transpose(arr)
{ 
  var result= new Synaptic_Matrix(arr.cols,arr.rows);
  for (let i = 0; i < arr.rows; i++)
  {
    for (let j = 0; j < arr.cols; j++)
    {
      result.matrix[j][i]=arr.matrix[i][j];
    }
  }
  return result;
}


//mapping a function
map(func)
{
  for (let i = 0; i < this.rows; i++)
  {
    for (let j = 0; j < this.cols; j++)
    {
      let t= this.matrix[i][j] ;
      this.matrix[i][j]=func(t);
    }
  }
}



//static map function.
static map(arr,func)
{ 
  
  let newArr=new Synaptic_Matrix(arr.rows,arr.cols);
  for (let i = 0; i < arr.rows; i++)
  {
    for (let j = 0; j < arr.cols; j++)
    {
      let t = arr.matrix[i][j];
      newArr.matrix[i][j] = func(t);
    }
  }
  return newArr;
}


//converting an array to a matrix.
static fromArray(arr)
{
  let m= new Synaptic_Matrix(arr.length,1);
  
  for(let i=0;i<arr.length;i++)
  {
    m.matrix[i][0]=arr[i];
  }
  
  return m;
}



//converting  a matrix to  an array
static toArray(mat)
{
  let arr=[];
  
  for(let i=0;i<mat.rows;i++)
  {
    for(let j=0;j<mat.cols;j++)
    {
      arr.push(mat.matrix[i][j]);
    }
  }
  return arr;
}



// static function for printing the array 
 static print(arr)
{
  console.log(arr.matrix);
  console.log(arr.rows);
  console.log(arr.cols);
  
}

 
  
}