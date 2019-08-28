/******************************************************************************
 *  Purpose:  Controller is created to handle request and response note data
 *
 *  @file    Note.Controller
 *  @author  Anuja Shette
 *  @version 1.0
 *  @since  06-08-2019
 *
 ******************************************************************************/

const noteServObj = require('../services/note.service')
const log = require('../logfile/logger')
const pageListObj = require('../middleware/pagination')


function NoteController() { }

/****************************************************************************************************
 * @param req get note details
 * @param res send response to user
 * @description addNoteController passing data to services and send response to user
 ****************************************************************************************************
 */
NoteController.prototype.addNoteController = async (req, res) => {
    try {
        req.check('title').not().isEmpty().withMessage('unique Title is required')
        // req.check('description').not().isEmpty().withMessage('Description is required')
        error = req.validationErrors()

        if (error) {
            res.status(400).json({ 'message': error })
        }
        else {
            let addParam = {
                note: req.body,
                userId: req.token.payload.id
            }
            console.log('Create Note Contrller ===>',addParam.note)
            /**
             * @param addParam contains note data and userId
             */
            let addNoteRes = await noteServObj.addNoteServ(addParam)
            return res.status(addNoteRes.status ? 200 : 422).send(addNoteRes)
        }
    }
    catch (err) {
        log.logger.error('Create Note==>', err)
        return res.status(400).json({ 'error': err })
    }
}

/****************************************************************************************************
 * @param req get size, noteId, search keyword
 * @param res send response to user
 * @description readNoteController passing data to services and send response to user
 ****************************************************************************************************
 */
NoteController.prototype.readNoteController = async (req, res) => {
    try {
        let query = pageListObj.pageList(req, res)
        console.log('read Note Contrller ===>')
        let param = {
            query: query,
            size: req.query.size,
            noteId: req.body.noteId,
            userId: req.token.payload.id,
            searchKey: req.body.searchKey
        }
        /**
        * @param param contains query, size of records, noteId, userId, search keyword
        */
        let readNoteRes = await noteServObj.readNoteServ(param)
        return res.status(200) .send(readNoteRes)
    }
    catch (err) {
        log.logger.error('read Note==>', err)
        return res.status(400).json({ 'error': err })
    }
}

/****************************************************************************************************
 * @param req get title to update and noteId
 * @param res send response to user
 * @description updateTitleController passing data to services and send response to user
 ****************************************************************************************************
 */
NoteController.prototype.updateTitleController = async (req, res) => {
    try {
        req.check('title').not().isEmpty().withMessage('Unique Title is required')
        error = req.validationErrors()

        if (error) {
            res.status(400).json({ 'message': error })
        }
        else {
            console.log('Update Title Contrller ===>')
            let titleParam = {
                title: req.body.title,
                noteId: req.body.noteId
            }
            let updateTitleRes = await noteServObj.updateTitleServ(titleParam)
            return res.status(updateTitleRes.status ? 200 : 422).send(updateTitleRes)
        }
    }
    catch (err) {
        log.logger.error('Update Title==>', err)
        return res.status(400).json({ 'error': err })
    }
}

/****************************************************************************************************
 * @param req get description to update, and noteId
 * @param res send response to user
 * @description updateDescController passing data to services and send response to user
 ****************************************************************************************************
 */
NoteController.prototype.updateDescController = async (req, res) => {
    try {
        console.log('Update Description Contrller ===>')
        let descParam = {
            description: req.body.description,
            noteId: req.body.noteId
        }
        let updateDescRes = await noteServObj.updateDescServ(descParam)
        return res.status(updateDescRes.status ? 200 : 422).send(updateDescRes)
    }
    catch (err) {
        log.logger.error('Update Description==>', err)
        return res.status(400).json({ 'error': err })
    }
}

/****************************************************************************************************
 * @param req get color to update and noteId
 * @param res send response to user
 * @description updateColorController passing data to services and send response to user
 ****************************************************************************************************
 */
NoteController.prototype.updateColorController = async (req, res) => {
    try {
        console.log('Update Color Contrller ===>')
        let colorParam = {
            notecolor: req.body.notecolor,
            noteId: req.body.noteId
        }
        let updateColorRes = await noteServObj.updateColorServ(colorParam)
        return res.status(updateColorRes.status ? 200 : 422).send(updateColorRes)
    }
    catch (err) {
        log.logger.error('Update Color==>', err)
        return res.status(400).json({ 'error': err })
    }
}

/****************************************************************************************************
 * @param req get reminder to update and noteId
 * @param res send response to user
 * @description updateRemindController passing data to services and send response to user
 ****************************************************************************************************
 */
NoteController.prototype.updateRemindController = async (req, res) => {
    try {
        console.log('Update reminder Contrller ===>')
        let remindParam = {
            reminder: req.body.reminder,
            noteId: req.body.noteId
        }
        let updateRemindRes = await noteServObj.updateRemindServ(remindParam)
        return res.status(updateRemindRes.status ? 200 : 422).send(updateRemindRes)
    }
    catch (err) {
        log.logger.error('Update reminder==>', err)
        return res.status(400).json({ 'error': err })
    }
}

/****************************************************************************************************
 * @param req get noteId
 * @param res send response to user
 * @description deleteRemindController passing data to services and send response to user
 ****************************************************************************************************
 */
NoteController.prototype.deleteRemindController = async (req, res) => {
    try {
        console.log('Delete reminder Contrller ===>')
        let delRemindParam = {
            noteId: req.body.noteId
        }
        let deleteRemindRes = await noteServObj.deleteRemindServ(delRemindParam)
        return res.status(deleteRemindRes.status ? 200 : 422).send(deleteRemindRes)
    }
    catch (err) {
        log.logger.error('Delete reminder==>', err)
        return res.status(400).json({ 'error': err })
    }
}

/****************************************************************************************************
 * @param req get archive to update
 * @param res send response to user
 * @description updateArchiveController passing data to services and send response to user
 ****************************************************************************************************
 */
NoteController.prototype.updateArchiveController = async (req, res) => {
    try {
        let param = {
            noteId: req.body.noteId,
        }
        console.log('Update Archive Contrller ===>')
        let updateArchiveRes = await noteServObj.updateArchiveServ(param)
        console.log('updated archive')
        return res.status(updateArchiveRes.status ? 200 : 422).send(updateArchiveRes)
    }
    catch (err) {
        log.logger.error('Update Archive==>', err)
        return res.status(400).json({ 'error': err })
    }
}

/****************************************************************************************************
 * @param req get trash to update
 * @param res send response to user
 * @description updateTrashController passing data to services and send response to user
 ****************************************************************************************************
 */
NoteController.prototype.updateTrashController = async (req, res) => {
    try {
        console.log('Update trash Contrller ===>')
        let param = {
            noteId: req.body.noteId,
        }
        let updateTrashRes = await noteServObj.updateTrashServ(param)
        return res.status(updateTrashRes.status ? 200 : 422).send(updateTrashRes)
    }
    catch (err) {
        log.logger.error('Update Trash==>', err)
        return res.status(400).json({ 'error': err })
    }
}

/****************************************************************************************************
 * @param req get NoteId
 * @param res send response to user
 * @description deleteNoteController passing data to services and send response to user
 ****************************************************************************************************
 */
NoteController.prototype.deleteNoteController = async (req, res) => {
    try {
        console.log('Delete Note Contrller ===>')
        let delParam = {
            noteId: req.body.noteId
        }
        let deleteNoteRes = await noteServObj.deleteNoteServ(delParam)
        return res.status(deleteNoteRes.status ? 200 : 422).send(deleteNoteRes)
    }
    catch (err) {
        log.logger.error('Delete Note==>', err)
        return res.status(400).json({ 'error': err })
    }
}

/****************************************************************************************************
 * @param req get userId, query, size to read notes
 * @param res send response to user
 * @description readArchiveController passing data to services and send response to user
 ****************************************************************************************************
 */
NoteController.prototype.readArchiveController = async (req, res) => {
    try {
        let query = pageListObj.pageList(req, res)
        console.log('Archive read Notes Contrller ===>',query)
        let archiveParam = {
            query: query,
            size: req.query.size,
            userId: req.token.payload.id
        }
        let archiveNoteRes = await noteServObj.readArchiveServ(archiveParam)
        return res.status(200).send(archiveNoteRes)
    }
    catch (err) {
        log.logger.error('Archive read Notes==>', err)
        return res.status(400).json({ 'error': err })
    }
}

/****************************************************************************************************
 * @param req get userId, query, size to read notes
 * @param res send response to user
 * @description readTrashController passing data to services and send response to user
 ****************************************************************************************************
 */
NoteController.prototype.readTrashController = async (req, res) => {
    try {
        let query = pageListObj.pageList(req, res)
        console.log('Trash read Notes Contrller ===>',query)
        let trashParam = {
            query: query,
            size: req.query.size,
            userId: req.token.payload.id
        }
        let trashNoteRes = await noteServObj.readTrashServ(trashParam)
        return res.status( 200 ).send(trashNoteRes)
    }
    catch (err) {
        log.logger.error('Trash read Notes==>', err)
        return res.status(400).json({ 'error': err })
    }
}

/****************************************************************************************************
 * @param req get userId, query, size to read notes
 * @param res send response to user
 * @description readRemindController passing data to services and send response to user
 ****************************************************************************************************
 */
NoteController.prototype.readRemindController = async (req, res) => {
    try {
        let query = pageListObj.pageList(req, res)
        console.log('Reminder read Notes Contrller ===>',query)
        let remindParam = {
            query: query,
            size: req.query.size,
            userId: req.token.payload.id
        }
        let remindNoteRes = await noteServObj.readRemindServ(remindParam)
        return res.status(200 ).send(remindNoteRes)
    }
    catch (err) {
        log.logger.error('Reminder read Notes==>', err)
        return res.status(400).json({ 'error': err })
    }
}


/****************************************************************************************************
 * @param req get labelId, noteId
 * @param res send response to user
 * @description addLabelToNoteController passing data to services and send response to user
 ****************************************************************************************************
 */
NoteController.prototype.addLabelNoteController = async (req, res) => {
    try {
        console.log('add Label To Note Controller Contrller ===>',)
        let labelParam = {
            labelId : req.body.labelId,
            noteId: req.body.noteId
        }
        console.log('note label===>',labelParam)
        let labelNoteRes = await noteServObj.updateLabelServ(labelParam)
        return res.status(labelNoteRes.status ? 200 : 422).send(labelNoteRes)
    }
    catch (err) {
        log.logger.error('Add labels to Notes==>', err)
        return res.status(400).json({ 'error': err })
    }
}

/****************************************************************************************************
 * @param req get labelId, noteId
 * @param res send response to user
 * @description deleteLabelNoteController passing data to services and send response to user
 ****************************************************************************************************
 */
NoteController.prototype.deleteLabelNoteController = async (req, res) => {
    try {
        console.log('add Label To Note Controller Contrller ===>',)
        let labelParam = {
            labelId : req.body.labelId,
            noteId: req.body.noteId
        }
        console.log('delete note label===>',labelParam)
        let labelNoteRes = await noteServObj.deleteLabelServ(labelParam)
        return res.status(labelNoteRes.status ? 200 : 422).send(labelNoteRes)
    }
    catch (err) {
        log.logger.error('Delete labels to Notes==>', err)
        return res.status(400).json({ 'error': err })
    }
}

/****************************************************************************************************
 * @description NoteController object created and exports to router
 ****************************************************************************************************
 */
let noteControllerObj = new NoteController()
module.exports = noteControllerObj