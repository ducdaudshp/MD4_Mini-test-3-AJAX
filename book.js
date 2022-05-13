function showAllBook(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/books/list",
        success : function (book){
            let content ="";
            for (let i=0;i<book.length;i++){
                content +=`<tr>
            <th scope="row">${i+1}</th>
            <td>${book[i].name}</td>
            <td>${book[i].price}</td>
            <td>${book[i].author}</td>
            <td>${book[i].category.name}</td>
            <td><img src="${'http://localhost:8080/avatar/' + book[i].avatar}" width="100px"></td>
            <td><button type="button" onclick="deleteBook(${book[i].id})">Delete</button></td>
           <td><button type="button" data-toggle="modal" data-target="#myModal" onclick="showEditForm(${book[i].id})">Edit</button>
           </td>
            </tr>`
            }
            $("#list-book").html(content);
        }
    })
}
showAllBook();

function showCategory(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/books/category",
        success:function (category){
            let content="";
            for (let i=0; i<category.length; i++){
                content+=`<option value="${category[i].id}">${category[i].name}</option>`
            }
            $("#category").html(content);
            $("#newCategory").html(content);
        }
    })
}
showCategory();

function createBook(){
    //lay du lieu
    let name=$("#name").val();
    let price=$("#price").val();
    let author=$("#author").val();
    let category=$("#category").val();
    let avatar=$("#avatar");



    let bookForm = new FormData();

    bookForm.append('name',name);
    bookForm.append('price',price);
    bookForm.append('author',author);
    bookForm.append('category',category);
    bookForm.append('avatar',avatar.prop('files')[0]);
    //chuyen du lieu sang Json
    //goi api tao moi
    $.ajax({

        type:"POST",
        enctype:'multipart/form-data',
        processData:false,
        contentType:false,
        //du lieu gui len
        data: bookForm,
        //ten API
        url:"http://localhost:8080/books",
        success:showAllBook
    });
    //chan su kien mac dinh cua the de k load lai trang
    event.preventDefault();
}

function updateBook(id){
//lay du lieu
    let name = $(`#newName`).val();
    let price = $(`#newPrice`).val();
    let author = $(`#newAuthor`).val();
    let category = $(`#newCategory`).val();
    let avatar = $(`#newAvatar`);
    let bookForm = new FormData();

        //tao doi tuong
    bookForm.append('name',name);
    bookForm.append('price',price);
    bookForm.append('author',author);
    bookForm.append('category',category);
    bookForm.append('avatar',avatar.prop('files')[0]);
    if (avatar.prop('files')[0]===undefined){
        let file = new File([""],"filename.jpg")
        bookForm.append('avatar',file);
    }else {
        bookForm.append('avatar',avatar.prop('files')[0]);
    }


    $.ajax({

        type:"POST",
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        //du lieu gui len
        data: bookForm,
        //ten API
        url:`http://localhost:8080/books/${id}`,
        success:function (){
            alert("sua thanh cong");
            showAllBook();
        }
    })
    //chan su kien mac dinh cua the de k load lai trang
}

function deleteBook(id){
    $.ajax({
        type:"DELETE",
        url:`http://localhost:8080/books/${id}`,
        success:showAllBook
    })
}
function showEditForm(id){
    $.ajax({
        type:"GET",
        url:`http://localhost:8080/books/${id}`,
        success:function (book){
            $(`#newName`).val(book.name)
            $(`#newPrice`).val(book.price)
            $(`#newAuthor`).val(book.author)
            $(`#newCategory`).val(book.category.name)
            let img = `<img src="${'http://localhost:8080/avatar/' + book.avatar}" width="100px">`
            $(`#showAvatar`).html(img)
            let update = `<button onclick="updateBook(${book.id})" data-bs-toggle="modal" data-bs-target="#myModal">Update</button>`
            $(`#update`).html(update)
        }
    })
    // showCategory();
}
$(document).ready(showAllBook())


