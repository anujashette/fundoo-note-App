import axios from 'axios'
const url = 'http://localhost:6006'

export function register(userInput){
    console.log("user data",userInput)
    return axios.post( url+ `/user/register`,userInput )
}

export function login(userInput){
    return axios.post( url+ `/user/login`,userInput )
}

export function forgot(userInput){
    console.log("user data in forgot",userInput)
    return axios.post( url+ `/user/forgetpass`,userInput)
}

export function reset(token,userInput){
    return axios.put( url+ `/user/resetpass`,userInput,
    {
        headers:{
            token:token
        }
    })
}

export function profileChange(formData,config){
    return axios.put(url+"/api/file/upload",formData,config)
}
