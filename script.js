const message = document.querySelector('.status');
const itemInput = document.querySelector('#item');

const addButton = document.querySelector('#add');
addButton.addEventListener('click', addNewItem);

const listOfProducts = document.querySelector('.products');

const clearItemList = document.querySelector('#clear');
clearItemList.addEventListener('click', deleteItem);

let currentItem = 0;

function addNewItem(){
    const item = itemInput.value;
    if(item.length === 0){
        alertDiv('error', 'Please enter value');
    }else{
        const li = document.createElement('li');
        li.innerHTML = `<span id="name">${item}</span>
        <div class="controllers">
            <button id='edit'><i class="fas fa-edit"></i></button>
            <button id='delete'><i class="fas fa-trash"></i></button>
        </div>`;

        addProduct(li);
        listOfProducts.appendChild(li);

        alertDiv('added', 'Item added to the list!');

        updateInput();
    }
    alertMessage();

    clearItemList.style.visibility = 'visible';
}

function editItem(){
    currentItem.querySelector('#name').innerText = itemInput.value;
    addButton.innerText = 'Submit';
    alertDiv('added', 'Value changed');
    alertMessage();

    updateInput();
    addButton.removeEventListener('click', editItem);
    addButton.addEventListener('click', addNewItem);
}

function deleteItem(){
    listOfProducts.innerHTML = '';
    alertDiv('error', 'Empty list');
    alertMessage();
    
    clearItemList.style.visibility = 'hidden';
}

function addProduct(elem){
    elem.querySelector('#delete').addEventListener('click', () => {
        alertDiv('error', 'Item removed');
        alertMessage();

        elem.remove();
    });
    elem.querySelector('#edit').addEventListener('click', () => {
        currentItem = elem;
        addButton.removeEventListener('click', addNewItem);

        addButton.innerText = 'Edit';
        addButton.addEventListener('click', editItem);
    })
}


function alertMessage(){
    message.style.visibility = 'visible';
    setTimeout(() => {
        message.style.visibility = 'hidden';
        message.innerText = '';
    }, 3000);
}


function alertDiv(status, text){
    message.className = 'status';
    message.classList.add(status);
    message.innerText = text;
}

function updateInput(){
    itemInput.value = '';
}