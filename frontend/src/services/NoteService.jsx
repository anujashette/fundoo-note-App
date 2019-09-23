import axios from 'axios'
const url = 'http://localhost:6006'
let loginToken = localStorage.getItem('LoginToken')

export function createNote(noteInput) {
    console.log("user data", noteInput)
    return axios.post(url + `/note/addnote`, noteInput,
        {
            headers: {
                token: loginToken
            }
        })
}

export function getAllNote() {
    console.log("note data", loginToken)
    return axios.post(url + `/note/readnote?pageNo=${1}&size=${20}`,{},
        {
            headers: {
                token: loginToken
            }
        })
}

export function getANote(data) {
    console.log("note data", loginToken)
    return axios.post(url + `/note/readnote?pageNo=${1}&size=${20}`,data,
        {
            headers: {
                token: loginToken
            }
        })
}


export function getLatestNote() {
    console.log("latest note data", loginToken)
    return axios.post(url + `/note/latestnotes`,{},
        {
            headers: {
                token: loginToken
            }
        })
}

export function getNoteCount() {
    console.log("note count")
    return axios.post(url + `/note/countnotes`,{},
        {
            headers: {
                token: loginToken
            }
        })
}

export function getSearchNote(searchData) {
    console.log("note search", loginToken)
    return axios.post(url + `/note/searchnotes?pageNo=${1}&size=${20}`,searchData,
        {
            headers: {
                token: loginToken
            }
        })
}

export function getArchive() {
    console.log("archive note data", loginToken)
    return axios.get(url + `/note/readarchivenotes?pageNo=${1}&size=${20}`,
    {
        headers: {
            token: loginToken
        }
    })
}

export function getTrash() {
    console.log("trash note data", loginToken)
    return axios.get(url + `/note/readtrashnotes?pageNo=${1}&size=${20}`,
    {
        headers: {
            token: loginToken
        }
    })
}

export function getReminder() {
    console.log("reminder note data", loginToken)
    return axios.get(url + `/note/readremindernotes?pageNo=${1}&size=${20}`,
    {
        headers: {
            token: loginToken
        }
    })
}


export function updateTitle(titleInput) {
    console.log("user data", titleInput)
    return axios.put(url + `/note/updatetitle`, titleInput,
        {
            headers: {
                token: loginToken
            }
        })
}

export function updateDescription(DescriptionInput) {
    console.log("user data", DescriptionInput)
    return axios.put(url + `/note/updatedesc`, DescriptionInput,
        {
            headers: {
                token: loginToken
            }
        })
}

export function updateArchive(archiveInput) {
    console.log("user data", archiveInput)
    return axios.put(url + `/note/updatearchive`, archiveInput,
        {
            headers: {
                token: loginToken
            }
        })
}

export function updateTrash(trashInput) {
    console.log("note deleted", trashInput)
    return axios.put(url + `/note/updatetrash`, trashInput,
        {
            headers: {
                token: loginToken
            }
        })
}

export function updateColor(colorInput) {
    console.log("note color", colorInput)
    return axios.put(url + `/note/updatecolor`, colorInput,
        {
            headers: {
                token: loginToken
            }
        })
}

export function updateReminder(date) {
    console.log('update label', date)
    let response = {}
    axios.put(url + `/note/updatereminder`, date, {
        headers: {
            token: loginToken
        }
    }).then((reminderRes) => {
        console.log('update label', reminderRes)
        response = reminderRes;
    })
        .catch((error) => {
            response = error;
        })
    return response
}

export function deleteRemind(date) {
    console.log('delete label', date)
    let response = {}
    axios.put(url + `/note/deletereminder`, date, {
        headers: {
            token: loginToken
        }
    }).then((reminderRes) => {
        console.log('update label', reminderRes)
        response = reminderRes;
    })
        .catch((error) => {
            response = error;
        })
    return response
}

export function updateNoteLabel(data) {
    console.log('update label', data)
    let response = {}
    axios.put(url + `/note/updatenotelabel`, data, {
        headers: {
            token: loginToken
        }
    }).then((updateLabelRes) => {
        console.log('update label', updateLabelRes)
        response = updateLabelRes;
    })
        .catch((error) => {
            response = error;
        })
    return response
}

export function deleteNoteLabel(data) {
    console.log('delete label', data)
    let response = {}
    axios.put(url + `/note/deletenotelabel`, data, {
        headers: {
            token: loginToken
        }
    }).then((deleteLabelRes) => {
        console.log('delete label', deleteLabelRes)
        response = deleteLabelRes;
    })
        .catch((error) => {
            response = error;
        })
    return response
}

export function deleteNote(deleteId) {
    console.log('delete note', deleteId)
    let response = {}
    axios.post(url + `/note/deletenote`, deleteId, {
        headers: {
            token: loginToken
        }
    }).then((deleteRes) => {
        console.log('delete note', deleteRes)
        response = deleteRes;
    })
        .catch((error) => {
            response = error;
        })
    return response
}

export function addLabel(labelData) {
    console.log('add label', labelData)
    return axios.post(url + `/label/createlabel`, labelData, {
        headers: {
            token: loginToken
        }
    })
}

export function getAllLabel() {
    console.log("label data", loginToken)
    return axios.get(url + `/label/readlabel`,
        {
            headers: {
                token: loginToken
            }
        })
}


export function updateLabel(labelId) {
    console.log('add label', labelId)
    let response = {}
    axios.put(url + `/label/updatelabel`, labelId, {
        headers: {
            token: loginToken
        }
    }).then((updateLabelRes) => {
        console.log('add label', updateLabelRes)
        response = updateLabelRes;
    })
        .catch((error) => {
            response = error;
        })
    return response
}

export function deleteLabel(labelId) {
    console.log('add label', labelId)
    let response = {}
    axios.post(url + `/label/deletelabel`, labelId, {
        headers: {
            token: loginToken
        }
    }).then((deleteLabelRes) => {
        console.log('add label', deleteLabelRes)
        response = deleteLabelRes;
    })
        .catch((error) => {
            response = error;
        })
    return response
}

export function firebaseToken(noteId){
    axios.put(url+`/user/notificationlink`,noteId,
    {
        headers:{
            token:loginToken
        }
    })
    .then((response)=>{
        console.log("response from notify token",response);
    })
    .catch((error)=>{
        console.log("response from notify token",error);
    })
}