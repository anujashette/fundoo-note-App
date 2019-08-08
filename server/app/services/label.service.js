/******************************************************************************
 *  Purpose:  Service is created to send data to note.model to perform CRUD 
 *            operations and write business logic.
 *
 *  @file    note.service
 *  @author  Anuja Shette
 *  @version 1.0
 *  @since   06-08-2019
 *
 ******************************************************************************/
const labelModelObj = require('../model/label.model')

function LabelService() { }

/****************************************************************************************************
 * @param addField
 * @description pass label data to model after callback service receives added data or error and send
 * back to addNoteController
 ****************************************************************************************************
 */
LabelService.prototype.addLabelServ = async (addField) => {
    console.log('Label add Service ===>', addField)

    let CreatResponse = {}
    let createdLabel = await labelModelObj.createLabel(addField)

    if (createdLabel.error) {
        CreatResponse.status = false
        CreatResponse.error = createdLabel.error
        return CreatResponse
    }

    CreatResponse.status = true
    CreatResponse.message = 'Label created successfully'
    CreatResponse.data = createdLabel

    return CreatResponse
}


/****************************************************************************************************
 * @param readField
 * @description pass userId to model after callback service receives updated data or error and send
 * back to readLabelController
 ****************************************************************************************************
 */
LabelService.prototype.readLabelServ = async (readField) => {
    console.log('Read label Service ===>',readField)

    let readResponse = {}
    let getLabel = await labelModelObj.readLabel(readField)

    if (getLabel.error) {
        readResponse.status = false
        readResponse.error = getLabel.error
        return readResponse
    }
    console.log('data read ===>', getLabel)
    readResponse.status = true
    readResponse.message = 'Label read successfully'
    readResponse.data = getLabel.readData
    return readResponse
}

/****************************************************************************************************
 * @param updateField
 * @description pass label name and label id to model after callback service receives updated data or
 * error and send back to updateLabelController
 ****************************************************************************************************
 */
LabelService.prototype.updateLabelServ=async (updateField) =>{
    console.log('Update label Service ===>', updateField)

    updateField.field = { label: updateField.label }
    let updateLabelRes = {}
    let updatedLabel = await labelModelObj.updateLabel(updateField)

    if (updatedLabel.error) {
        updateLabelRes.status = false
        updateLabelRes.error = updatedLabel.error
        return updateLabelRes
    }
    console.log('data ===>', updatedLabel)
    updateLabelRes.status = true
    updateLabelRes.message = 'Label updated successfully'
    updateLabelRes.data = updatedLabel

    return updateLabelRes
}
/****************************************************************************************************
 * @param deleteField
 * @description pass label id to model after callback service receives deleted data or
 * error and send back to deleteLabelServ
 ****************************************************************************************************
 */
LabelService.prototype.deleteLabelServ=async (deleteField) =>{
    console.log('Update label Service ===>', deleteField)

    let deleteLabelRes = {}
    let deletedLabel = await labelModelObj.deleteLabel(deleteField)

    if (deletedLabel.error) {
        deleteLabelRes.status = false
        deleteLabelRes.error = deletedLabel.error
        return deleteLabelRes
    }
    console.log('data ===>', deletedLabel)
    deleteLabelRes.status = true
    deleteLabelRes.message = 'Label deleted successfully'
    deleteLabelRes.data = deletedLabel

    return deleteLabelRes
}
/****************************************************************************************************
 * @description LabelService object created and exports to controller
 ****************************************************************************************************
 */
let labelServObj = new LabelService()
module.exports = labelServObj