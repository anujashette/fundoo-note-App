import axios from 'axios'
const url = 'http://localhost:6006'
let loginToken = localStorage.getItem('LoginToken')

export function createNote(noteInput){
    console.log("user data",noteInput)
    return axios.post( url+ `/note/addnote`,noteInput,
    {
        headers:{
            token:loginToken
        }
    })
}

export function getAllNote(){
    console.log("note data",loginToken)
    return axios.get( url+ `/note/readnote?pageNo=${1}&size=${20}`,
    {
        headers:{
            token:loginToken
        }
    })
}