/******************************************************************************
 *  Purpose:  Model performs CRUD operations with database
 *
 *  @file    note.model
 *  @author  Anuja Shette
 *  @version 1.0
 *  @since   06-08-2019
 *
 ******************************************************************************/
const mongoose = require('mongoose')
const log = require('../logfile/logger')

/**
 * Note Schema is created to store data in database
 */
const noteSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: [true, 'User Id required'],
        ref: 'user'
    },
    title: {
        type: String,
        require: [true, 'title required']
    },
    description: {
        type: String,
        require: [true, 'description required']
    },
    reminder: [
        String
    ],
    notecolor: {
        type: String
    },
    archive: {
        type: Boolean,
        default: false
    },
    trash: {
        type: Boolean,
        default: false
    },
    notelabel: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'labels'
    }]
},
    {
        timestamps: true
    }
);
/**
  * Note Schema object
  */
const note = mongoose.model('notes', noteSchema)

function Note() { }

/****************************************************************************************************
 * @param addField
 * @param userId
 * @description Create note in database using userId 
 ****************************************************************************************************
 */
Note.prototype.createNote = async (addField, userId) => {
    try {
        console.log('Create Note Model ===>', addField)
        // data = await note.find({ 'title': addField.title })

        let addNote = new note({
            userId: userId,
            title: addField.title,
            description: addField.description,
            reminder: addField.reminder,
            notecolor: addField.notecolor,
            archive: addField.archive,
            notelabel: addField.notelabel
        })

        saveNote = await addNote.save()
        // await client.set('note' + saveNote.id, JSON.stringify(saveNote), redis.print)

        return saveNote
    }
    catch (err) {
        log.logger.error('Create Note error==>', err)
        error = { error: 'Note already created' }
        return error
    }
}

/*****************************************************************************************************
 * @param param
 * @description Read note from database using noteId/search by title,description,color,reminder/userID
 ***************************************************************************************************** 
 */
Note.prototype.readNote = async (param) => {
    try {
        console.log('Read Note Model ===>', param)
        if (param.noteId !== undefined) {
            readData = await note.find({ '_id': param.noteId }).populate('notelabel')
            // await client.set('readBynote' + param.noteId, JSON.stringify(readData), redis.print)
        }
        else if (param.searchKey) {
            readData = await note.find
                ({
                    $or:
                        [
                            { 'title': { $regex: param.searchKey, $options: 'i' } },
                            { 'description': { $regex: param.searchKey, $options: 'i' } },
                            { 'notecolor': { $regex: param.searchKey, $options: 'i' } },
                            { 'reminder': { $regex: param.searchKey, $options: 'i' } },
                        ]
                }).populate('notelabel')
        }
        else {
            console.log('userId===>', param)
            totalCount = await note.countDocuments({ $and: [{ "userId": param.userId }, param.field] })
            readData = await note.find({ $and: [{ "userId": param.userId }, param.field] }, {}, param.query).populate('notelabel')
            console.log('read stringify in model====================================', JSON.stringify(param.field))

            await client.set('readAllBy'+JSON.stringify(param.field), JSON.stringify(readData), redis.print)
            var totalPages = parseInt(Math.ceil(totalCount / parseInt(param.size)))
        }
        if (readData != '') {
            data = { readData: readData, totalPages: totalPages }
            return data
        }
        else {
            error = { error: 'Note is not found to read' }
            return error
        }
    }
    catch (err) {
        log.logger.error('Read Note error==>', err)
        error = { error: 'Note Id is not found to read' }
        return error
    }
}

/*****************************************************************************************************
 * @param updateField
 * @param noteId
 * @description Update note in database using noteId
 *****************************************************************************************************
 */
Note.prototype.updateNote = async (updateField, noteId) => {
    try {
        console.log('Update note Model ===>', updateField, noteId)
        client.flushdb( function (err, succeeded) {
            console.log(succeeded); // will be true if successfull
        });
        
        updateData = await note.findOneAndUpdate({ '_id': noteId }, updateField)
        await client.set('updateAllBy'+JSON.stringify(updateField), JSON.stringify(updateData), redis.print)

        if (!updateData) {
            error = { error: 'Note is not updated' }
            return error
        }
        else {
            return updateData
        }
    }
    catch (err) {
        log.logger.error('Update Note error==>', err)
        error = { error: 'Note Id is not found to update' }
        return error
    }
}

/*****************************************************************************************************
 * @param noteId
 * @description Delete note in database using noteId
 *****************************************************************************************************
 */
Note.prototype.deleteNote = async (noteId) => {
    try {
        console.log('Delete note Model ===>', noteId)
        let deletedData = note.findByIdAndRemove(
            { '_id': noteId }
        )
        console.log('Deleted data===>', deletedData)
        if (deletedData != '') {
            return deletedData
        }
        else {
            error = { error: 'Note is not deleted' }
            return error
        }
    }
    catch (err) {
        log.logger.error('Delete Note error==>', err)
        error = { error: 'Note Id is not found to delete' }
        return error
    }
}

const noteModelObj = new Note()
module.exports = noteModelObj
