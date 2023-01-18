let mood = document.querySelector(".mood")

let moodSpan = document.querySelector(".mood span")

let bookName = document.getElementById("book-name")

let bookId = document.getElementById("book-id")

let submit = document.querySelector("button[type='submit']")

let bookAuthor = document.getElementById("book-author")

let booksContainer = document.querySelector(".books-container")

let moodTheme = true

mood.addEventListener("click",()=>{

    moodSpan.classList.toggle("active")

    changeMood()
 
})


function changeMood(){

    if(moodTheme==true){

        document.body.style.setProperty("--main-color" , "rgb(63, 61, 61)")

        document.body.style.setProperty("--color-text" , "white")

        moodTheme =false

    }else{
        document.body.style.setProperty("--main-color" , "white")

        document.body.style.setProperty("--color-text" , "black")
        
        moodTheme=true
    }
}


document.querySelector("form").addEventListener("submit" , addBookFunction)

window.onload = function(){
    JSON.parse(localStorage.getItem("books")).forEach(book=>[

        drawBooks(book.id)
    ])


}

function drawBooks(id){

    booksContainer.innerHTML = ""

    let books= localStorage.getItem("books")?

    JSON.parse(localStorage.getItem("books")):[]

    books.forEach(book => {

    let div = document.createElement("div")

    div.className = "created-div"

    let span = document.createElement("span")
    let span2 = document.createElement("span")
    span2.appendChild(document.createTextNode(`Id : ${book.id} `))

    span.className = "created-span"

    span.setAttribute("id" , id)

    span.appendChild(document.createTextNode("Remove"))

    div.appendChild(span)
    div.appendChild(span2)

    div.appendChild(document.createTextNode(`BookName : ${book.name} `))

    booksContainer.appendChild(div)
        
    });
}

let added = localStorage.getItem("books") ?

JSON.parse(localStorage.getItem("books")) : []

function addBookFunction(e){

    e.preventDefault()

    let name = bookName.value.trim()

    let id = bookId.value

    let author = bookAuthor.value.trim()

    if(name==""|| id==""|| author ==""){

        alert("please Enter Data")

    }else{

        let newBook = {
    
            name:name ,
            
            id : id , 
    
            author :author
        }
    
        let here = added.find(item=>item.name == name)
    
        let sameId= added.find(item=>item.id==id)
    
        if(here){
    
            alert("This Book name is Already here")
    
        }else if(sameId){

            alert("same id")
            
        }
        else{
            
            added = [...added , newBook]
        
            localStorage.setItem("id" , id)

            localStorage.setItem("books" , JSON.stringify(added))
        
            drawBooks(id)
    
            bookName.value   = ""
        
            bookId.value     = ""
        
            bookAuthor.value = ""
        }
    }

    
}


     booksContainer.addEventListener("click" , removeItem)

     function removeItem(e){

     let books = JSON.parse(localStorage.getItem("books"))

    
     if(e.target.classList.contains("created-span")){

        e.target.parentElement.remove()  
        
    }


}

// ////////Remove All Function/////////////////////

let removeAll = document.querySelector(".remove-all")

removeAll.addEventListener("click",removeAllfunction)

function removeAllfunction(){

    document.querySelectorAll(".created-div").forEach(item=>{

        item.remove()

    })
}