const input = document.querySelectorAll('input');
const button = document.querySelector('button');
const bookContainer = document.querySelector('.booklist-container');

// checking localStorage
let websites = [];
if(localStorage.getItem('sites') !== null){
    websites = JSON.parse(localStorage.getItem('sites'));
}
button.addEventListener('click', addingSite);
displayData();

function addingSite(){
    let val1 = input[0].value;
    let val2 = input[1].value;
console.log(websites);
    if(val1 === "" || val2 === ""){
        alert('please fill in all fields');
    }else{
        if(websites.filter(web => web.name === val1).length > 0 || websites.filter(web => web.url === val2).length > 0){
            alert('this website already exists in the book marker');
            console.log("exists");
        }else{
            websites.push({
                name : val1,
                url : val2
            });
            localStorage.setItem('sites', JSON.stringify(websites));
            bookContainer.innerHTML = "";
            displayData();

        }

    }
}


function displayData(){
for(let i = 0; i < websites.length; i++){
    let box = document.createElement('div');
    box.className = "box";
    let p = document.createElement('p');
    p.textContent = websites[i].name;
    let button1 = document.createElement('button');
    button1.dataset.url = websites[i].url;
    button1.textContent = "Visit";
    let button2 = document.createElement('button');
    button2.textContent = "Delete";
    box.appendChild(p);
    box.append(button1)
    box.append(button2)
    bookContainer.appendChild(box);
}
}

// deleting website
bookContainer.addEventListener('click', deleteVisitBox);

function deleteVisitBox(e){
    if(e.target.innerHTML.toLowerCase() === "delete"){
        let content = e.target.previousSibling.previousSibling.innerHTML;
        websites = websites.filter(a => a.name !== content);
        localStorage.setItem('sites', JSON.stringify(websites));
        bookContainer.innerHTML = "";
        displayData();
    }
    if(e.target.innerHTML.toLowerCase() === "visit"){
        let url = e.target.dataset.url.includes('http://');
        if(url){
        window.open(e.target.dataset.url)
        }else{
            window.open("http://"+e.target.dataset.url)
        }
    }
        console.log(url)
    }
