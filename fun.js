// 1 function of js 

/*function sum() {
    console.log("hi abhishek")
}

sum();
*/
/*
function sum(x,y) {

    console.log(x+y)
    //return s;
}

sum(2,3);
*/

// Arrow function in js
// its way of sort written in main function
// sum function
/*
const arrowfun=(a,b)=>{
    //console.log(a+b);
   // return a+b;
};

arrowfun(2,3);
*/
// callback function
/*
let nums=[1,2,3,4];

let calsqure=(num)=>{
    console.log(num*num);
}
nums.forEach(calsqure);
*/
// map method in js
/*let nums=[1,2,3];
nums.map((val)=>{
    console.log(val);
});
   
let arr=[1,2,3,4,5,6,7];
let evenArr=arr.filter((val)=>{
    return val%2===0;
});

console.log(evenArr);
*/
//call back function : Here,it is a function to execute for each element in the array
// A callback function passed as an argument to another function.
// higher order function this is.
/*
let arr = ["pune","delhi","mumbai"];

arr.forEach((val,idx ,arr) => {
    console.log(val.toUpperCase(),idx,arr); //arr is it self
    
});
// new way to create callback function squre
let nums =[67,52,34];
let calsqure=(num)=>{
    console.log(num*num);
};

nums.forEach(calsqure);
*/

// you enter a number and insert a array function
/*
let n=prompt("enter a number:");
let arr=[];
for(let i=1;i<=n;i++){
    arr[i-1]=i;

}
console.log(arr);
let sum=arr.reduce((res,curr)=>{    
    return res+curr;
}); // Use the reduce method to calculate the sum of the array
console.log(sum);
*/

const student={
    fullname:"abhishek prajapati",
    marks:94.5,
    abc: function(){
        console.log("marks=",this.marks);
    }
} 



















