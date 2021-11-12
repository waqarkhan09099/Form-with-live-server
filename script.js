
const form = document.getElementById('form')


form.addEventListener('submit', (e) => {
    e.preventDefault()
    const userName = document.getElementById('user_name').value
    const userEmail = document.getElementById('user_email').value
    const userAddress = document.getElementById('user_address').value
    const userPassword = document.getElementById('user_password').value

    axios.post('https://waqar-server-mongodb.herokuapp.com/api/user', {
        name: userName,
        email: userEmail,
        address: userAddress,
        password: userPassword
    }).then(
        console.log('User created')
    ).catch(err => alert(err))
    document.getElementById('alertcontainer').innerHTML = `<div class="alert alert-success" role="alert">
            A simple success alert—check it out!
         </div>`

  
})

function getPost() {
    axios.get('https://waqar-server-mongodb.herokuapp.com/api/users').then(responce => {
        console.log(responce)
        document.getElementById('data_row').innerHTML = responce.data.map((data, index) => `
            <tr>
                      <th scope="row">${index === 0 ? '1' : index + 1}</th>
                      <td>${data.name}</td>
                      <td>${data.email}</td>
                      <td>${data.address}</td>
                      <td>
                        <button type="button" onclick='editUser()' class="btn btn-primary"><i class="far fa-eye"></i></button>
                        <button type="button" onclick='deleteUser()' class="btn btn-danger"><i class="far fa-trash-alt"></i></button>
                      </td>
                    </tr>
            `)

    })

}

getPost()
