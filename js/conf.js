// As funcionalidades deverão ser implementadas neste arquivo
function getUserApi(name) {
    const url = "https://api.github.com/users/"+name;
    return $.getJSON(url);
}

$(document).ready(() => {

    $('#btnSearchUser').click(() => {
        $('#info').css({
            "display": "block"
        })
        $('#lblErrorMsg').css({
            "display": "none"
        })
        $('#label').css({
            "display": "none"
        })
        $('#profile-info').css({
            "display": "none"
        })
        const name = $('#search').val();
        const response = getUserApi(name);
        response.then((data)=>{
            $('#info').css({
                "display": "none"
            })
            setProfile(data);
        })
        response.fail((jqXHR)=>{
            $('#info').css({
                "display": "none"
            })
            $('#lblErrorMsg').css({
                "display": "block"
            })
            $('#lblErrorMsg').text('');
            $('#lblErrorMsg').text( `Opss... ocorreu um erro com a requisição. Mensagem de Status: ${jqXHR.responseJSON['message']}`)
        })
    });
})
// PedroLucasBastos
function setProfile(resp) {
    $('#label').css({
        "display": "block"
    })
    $('#profile-info').css({
        "display": "flex"
    })
    $('#imgAvatar').attr('src', resp['avatar_url']);
    $('#name').text(' ' + resp['name']);
    $('#login').text(' ' + resp['login']);
    $('#url').text(' ' + resp['url']);
    $('#url').attr('href', resp['url']);
    $('#location').text(' ' + resp['location']);
    $('#public-repos').text(' ' + resp['public_repos']);

    let created_at = new Date(resp['created_at']);
    let updated_at = new Date(resp['updated_at']);
   
    let createdDay = ("0" + created_at.getDate()).slice(-2);
    let createdMonth = ("0" + (created_at.getMonth() + 1)).slice(-2);
    let createdYear = created_at.getFullYear();
    
    let updatedDay = ("0" + updated_at.getDate()).slice(-2);
    let updatedMonth = ("0" + (updated_at.getMonth() + 1)).slice(-2);
    let updatedYear = updated_at.getFullYear();

    $('#created-at').text(' '+createdDay+'/'+createdMonth+'/'+createdYear);
    $('#updated-at').text(' '+updatedDay+'/'+updatedMonth+'/'+updatedYear);
}   
