/******************************************************************************
 *  Purpose:  Controller is created to handle request and response note data
 *
 *  @file    Label.Controller
 *  @author  Anuja Shette
 *  @version 1.0
 *  @since  07-08-2019
 *
 ******************************************************************************/

const labelServObj = require('../services/label.service')
const log = require('../logfile/logger')

function LabelController() { }

/****************************************************************************************************
 * @param req get label name
 * @param res send response to user
 * @description addLabelController passing data to services and send added label response to user
 ****************************************************************************************************
 */
LabelController.prototype.addLabelController = async (req, res) => {
    try {
            addParam = {
                label: req.body.label,
                userId: req.token.payload.id
            }
            console.log('Create label Contrller ===>')
            /**
             * @param addParam contains label name and userId
             */
            let addLabelRes = await labelServObj.addLabelServ(addParam)
            return res.status(addLabelRes.status ? 200 : 422).send(addLabelRes)
    }
    catch (err) {
        log.logger.error('Create label==>', err)
        return res.status(400).json({ 'error': err })
    }
}

/****************************************************************************************************
 * @param req get userId
 * @param res send response to user
 * @description readLabelController passing data to services and send all labels response to user
 ****************************************************************************************************
 */
LabelController.prototype.readLabelController = async (req, res) => {
    try {
            readParam = {
                userId: req.token.payload.id
            }
            console.log('Read label Contrller ===>')
            /**
             * @param addParam contains userId to find labels
             */
            let readLabelRes = await labelServObj.readLabelServ(readParam)
            return res.status(readLabelRes.status ? 200 : 422).send(readLabelRes)
    }
    catch (err) {
        log.logger.error('Read label==>', err)
        return res.status(400).json({ 'error': err })
    }
}

/****************************************************************************************************
 * @param req get labelId, label name
 * @param res send response to user
 * @description updateLabelController passing data to services and send updated label response to user
 ****************************************************************************************************
 */
LabelController.prototype.updateLabelController = async (req, res) => {
    try {
            updateParam = {
                labelId : req.body.labelId,
                label : req.body.label
            }
            console.log('Update label Contrller ===>')
            /**
             * @param updateParam contains labelId to update label
             */
            let updateLabelRes = await labelServObj.updateLabelServ(updateParam)
            return res.status(updateLabelRes.status ? 200 : 422).send(updateLabelRes)
    }
    catch (err) {
        log.logger.error('update label==>', err)
        return res.status(400).json({ 'error': err })
    }
}

/****************************************************************************************************
 * @param req get labelId
 * @param res send response to user
 * @description deleteLabelController passing data to services and send deleted label response to user
 ****************************************************************************************************
 */
LabelController.prototype.deleteLabelController = async (req, res) => {
    try {
            deleteParam = {
                labelId : req.body.labelId
            }
            console.log('Delete label Contrller ===>')
            /**
             * @param deleteParam contains labelId to delete label
             */
            let deleteLabelRes = await labelServObj.deleteLabelServ(deleteParam)
            return res.status(deleteLabelRes.status ? 200 : 422).send(deleteLabelRes)
    }
    catch (err) {
        log.logger.error('delete label==>', err)
        return res.status(400).json({ 'error': err })
    }
}
/****************************************************************************************************
 * @description LabelController object created and exports to router
 ****************************************************************************************************
 */
let labelControllerObj = new LabelController()
module.exports = labelControllerObj