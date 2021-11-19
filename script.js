const form = document.getElementById('form')



let users;
function getPost() {
    axios.get('https://waqar-server-mongodb.herokuapp.com/api/users').then(responce => {
        console.log(responce)
        users = responce.data
        document.getElementById('data_row').innerHTML = responce.data.map((data, index) => `
            <tr id="${data._id}">
              <th scope="row">${index === 0 ? '1' : index + 1}</th>
              <td class="userName">${data.name}</td>
              <td>${data.email}</td>
              <td>${data.address}</td>
              <td class="buttons" id="buttons">
                <button type="button" id="edit" onclick="editUser('${data._id}',${index})" class="btn btn-primary"><i class="fas fa-user-edit"></i></button>
                <button type="button" onclick="deleteUser('${data._id}')" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
              </td>
            </tr>
            `).join('')
    })

}

function editUser(id, index) {
    console.log("update checked")
    let userObj = users[index]
    document.getElementById(`${id}`).innerHTML = `
    <tr id="${id}">
        <th scope="row">${id}</th>
        <td class="userName"><input type="text" id="${id}_Username" placeholder="${userObj.name}" class="form-control" ></td>
        <td><input type="email" placeholder="${userObj.email}"  class="form-control" id="${id}_Useremail" ></td>
        <td><input type="text" id="${id}_Useraddress" placeholder="${userObj.address}" class="form-control" ></td>
        <td class="buttons" id="buttons">
        <button type="button" id="update" onclick="updateUser('${id}')" class="btn btn-success">Update</button>
        </td>
    </tr>
    `
}

function updateUser(id) {
    console.log(id)
    console.log(document.getElementById(`${id}_Username`))

    const name = document.getElementById(`${id}_Username`).value
    const email = document.getElementById(`${id}_Useremail`).value
    const address = document.getElementById(`${id}_Useraddress`).value

    // console.log(updateName,updateEmail,updateAddress)
    confirm("Are You Sure!! You wanna Update Your Information.")
    axios.put(`https://waqar-server-mongodb.herokuapp.com/api/user/${id}`, {
        name,
        email,
        address
    }).then(() => {
        document.getElementById('alertcontainer').innerHTML = `<div class="alert alert-success" role="alert">
        User Are Updated!!!
        </div>`
        console.log(`update Call ${getPost()}`)
        alert(`User Updated!!!!`)
    }).catch(err => {
        alert(err)
    })
}


function deleteUser(id) {
    confirm("Are You Sure! User will permenantly delete")
    axios.delete(`https://waqar-server-mongodb.herokuapp.com/api/user/${id}`).then((e) => {
        // getPost()
        document.getElementById('alertcontainer').innerHTML = `<div class="alert alert-success" role="alert">
            User Are Deleted!!!
            </div>`
        getPost()
        alert(`User Deleted!!!!`)
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    let userName = document.getElementById('user_name').value
    let userEmail = document.getElementById('user_email').value
    let userAddress = document.getElementById('user_address').value
    let userPassword = document.getElementById('user_password').value

    axios.post('https://waqar-server-mongodb.herokuapp.com/api/user', {
        name: userName,
        email: userEmail,
        address: userAddress,
        password: userPassword
    }).then(() => {
        document.getElementById('alertcontainer').innerHTML = `<div class="alert alert-success" role="alert">
            Thank You! New User Was Created....
            </div>`
        setTimeout(() => {
            document.getElementById('alertcontainer').innerHTML = ''
        }, 3000)
        document.getElementById('user_name').value = ''
        document.getElementById('user_email').value = ''
        document.getElementById('user_address').value = ''
        document.getElementById('user_password').value = ''
        getPost()
        console.log('User created')
    }
    ).catch(error => {
        if (!userName || !userEmail || !userAddress || !userPassword) {
            document.getElementById('alertcontainer').innerHTML = `<div class="alert alert-danger" role="alert">
                Please fill out the Required fields....
                 Error Type : ${error}
                </div>`
        }
        setTimeout(() => {
            document.getElementById('alertcontainer').innerHTML = ''
        }, 3000)
    })



})


getPost()
