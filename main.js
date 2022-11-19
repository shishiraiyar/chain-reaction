// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getDatabase, ref, child, get, set } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGNBQOwrxLch7J6YI3dQ-AEYyyT6wp3DE",
  authDomain: "chainreaction-edd51.firebaseapp.com",
  databaseURL: "https://chainreaction-edd51-default-rtdb.firebaseio.com",
  projectId: "chainreaction-edd51",
  storageBucket: "chainreaction-edd51.appspot.com",
  messagingSenderId: "930712506321",
  appId: "1:930712506321:web:641921bdde2c9715199af0",
  measurementId: "G-JNC36F04JX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const dbRef = ref(getDatabase());


function clearDb(){
  for (let i=0; i<36; i++){
    var instability = 0;
    if(parseInt(i/6)==0 || parseInt(i/6)==5){
      instability++;
    }
    if(i%6==0||i%6==5){
      instability++;
    }
    set(ref(database, "/grid/"+i), {
      colour:0, value:0, maxValue : 4 - instability
  })

  }

}

//clearDb();

function drawGrid(){
  var htmlString = ""

  console.log("idk")
  get(child(dbRef, '/')).then((snapshot) => {
    console.log("ik")

    var grid = snapshot.val()["grid"]

    for(let i=0; i<grid.length; i++){
      //console.log(grid[i], i)
      
      var imgFile = ""
      if (grid[i]["value"] != 0) {
        imgFile += 'images/' + grid[i]["colour"] + grid[i]["value"] + '.png';
        htmlString += '<div class="square fullImg" id="' + i + '"><img src="' + imgFile + '"/></div>'
      }
      else{
        htmlString += '<div class="square fullImg" id="'+ i +'"><img "/></div>'     /////// remove img tag
      } 
    }
    document.getElementsByClassName("grid")[0].innerHTML = htmlString;


    var gridElements = document.getElementsByClassName("square");

    for (let i=0; i< gridElements.length; i++){
      gridElements[i].addEventListener("click", function(){

        console.log(gridElements[i].id)
        console.log("max", grid[gridElements[i].id]["maxValue"])

        isClicked(i)
        // currentPlayer = (currentPlayer+1)%3
        // console.log("p",currentPlayer)

    }
    )
  }

   })
  }

function isClicked(i){
  console.log("juskik")


  get(child(dbRef, '/')).then((snapshot) => {
    
    var data = snapshot.val()
    var currentPlayer = data["currentPlayer"]
    var grid = data["grid"]
    console.log("kok", grid[0])
    

    if (grid[i]["value"]!=0  && grid[i]["colour"] != currentPlayer){
      return;
    }
    
    grid[i].value +=1;

    check(i, grid)

   
    //cur play ++
  })


  console.log("lol", i)
}

// drawGrid() ////////////////////

window.onload(drawGrid())

function check(i, grid){
  console.log("abab")
//Write to fb
set(ref(database, "/grid"), grid)

//delay

drawGrid()
// for(let time=0;time<300;time++){}
//delay
  if (grid[i]["value"] == grid[i]["maxValue"] ){
    grid[i]["value"] = 0;

    if (parseInt(i/6) !=0){
      grid[i-6]["colour"] = grid[i]["colour"]
      grid[i-6]["value"]+=1;
      check(i-6,grid);
    }

    if (parseInt(i/6) !=5){
      grid[i+6]["colour"] = grid[i]["colour"]
      grid[i+6]["value"] += 1;
      check(i+6,grid);
    }

    if (i%6!=0){
      grid[i-1]["colour"] = grid[i]["colour"]
      grid[i-1]["value"] += 1;
      check(i-1,grid);
    }

    if (i%6 != 5 ){
      grid[i+1]["colour"] = grid[i]["colour"]
      grid[i+1]["value"] += 1;
      check(i+1,grid);
    }
  }

  //check if more than max value
  //  set this to 0
  //  set neighbour colours to this
  //  add 1 to neighbours
  
  //  check(neighbours)

  

}


// var htmlthingy = "";
// for (let i=0; i<36;i++){
//     htmlthingy += '<div class="square fullImg"><img src="images/blue 1.png" /></div>'

// }

// document.getElementsByClassName("grid")[0].innerHTML = htmlthingy;


get(child(dbRef, '/')).then((snapshot) => {
   
  })

// set(ref(database, "/grid/2"), {
//     colour:0, value:2
// })



// var lol;
// get(child(dbRef, '/')).then((snapshot) => {
//   lol = snapshot.val()
  
   
// })
// console.log(lol)











/* 
<div class="square fullImg"><img src="images/01.png" /></div>
        <div class="square fullImg"><img src="images/11.png" /></div>
        <div class="square fullImg"><img src="images/12.png" /></div>
        <div class="square fullImg"><img src="images/03.png" /></div>
        <div class="square fullImg"><img src="images/13.png" /></div>
        <div class="square fullImg"><img src="images/23.png" /></div>
        <div class="square fullImg"><img src="images/21.png" /></div>
        <div class="square fullImg"><img src="images/11.png" /></div>
        <div class="square fullImg"><img src="images/02.png" /></div>
        <div class="square fullImg"><img src="images/01.png" /></div>
        <div class="square fullImg"><img src="images/11.png" /></div>
        <div class="square fullImg"><img src="images/03.png" /></div>
        <div class="square fullImg"><img src="images/01.png" /></div>
        <div class="square fullImg"><img src="images/11.png" /></div>
        <div class="square fullImg"><img src="images/02.png" /></div>
        <div class="square fullImg"><img src="images/01.png" /></div>
        <div class="square fullImg"><img src="images/11.png" /></div>
        <div class="square fullImg"><img src="images/02.png" /></div>
        <div class="square fullImg"><img src="images/01.png" /></div>
        <div class="square fullImg"><img src="images/11.png" /></div>
        <div class="square fullImg"><img src="images/02.png" /></div>
        <div class="square fullImg"><img src="images/01.png" /></div>
        <div class="square fullImg"><img src="images/11.png" /></div>
        <div class="square fullImg"><img src="images/02.png" /></div>
        <div class="square fullImg"><img src="images/01.png" /></div>
        <div class="square fullImg"><img src="images/11.png" /></div>
        <div class="square fullImg"><img src="images/02.png" /></div>
        <div class="square fullImg"><img src="images/01.png" /></div>
        <div class="square fullImg"><img src="images/11.png" /></div>
        <div class="square fullImg"><img src="images/02.png" /></div>
        <div class="square fullImg"><img src="images/01.png" /></div>
        <div class="square fullImg"><img src="images/11.png" /></div>
        <div class="square fullImg"><img src="images/02.png" /></div>
        <div class="square fullImg"><img src="images/01.png" /></div>
        <div class="square fullImg"><img src="images/11.png" /></div>
        <div class="square fullImg"><img src="images/02.png" /></div>
*/