/******************************************************************************
 *  Purpose:  Model performs CRUD operations with database
 *
 *  @file    label.model
 *  @author  Anuja Shette
 *  @version 1.0
 *  @since   07-08-2019
 *
 ******************************************************************************/

const mongoose = require('mongoose')
const log = require('../logfile/logger')

const labelSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: [true, 'User Id required'],
        ref: 'userSchema'
    },
    label: {
        type : String
    }
},{
    timestamps : true
})

const label = mongoose.model('labels', labelSchema)

function Label(){ }

/****************************************************************************************************
 * @param addField contains userId and label name
 * @description Create label in database using userId 
 ****************************************************************************************************
 */
Label.prototype.createLabel=async(addField)=>{
    try {
        console.log('Create label Model ===>', addField)
            let addLabel = new label({
                userId : addField.userId,
                label : addField.label
            })

            saveLabel = await addLabel.save()
            return saveLabel
    }
    catch (err) {
        log.logger.error('Create label error==>', err)
        error = { error: 'Label not created' }
        return error
    }
}

/*****************************************************************************************************
 * @param getField
 * @description Read Labels from database using userID
 ***************************************************************************************************** 
 */
Label.prototype.readLabel=async(getField)=>{
    try{
        console.log('Read label model===>',getField);
        readData = await label.find({'userId': getField.userId})
        if (readData != '') {
            data = { readData: readData }
            return data
        }
        else {
            error = { error: 'Label is not found to read' }
            return error
        }
    }
    catch(err){
        log.logger.error('Read label error==>', err)
        error = { error: 'Label Id is not found to read' }
        return error
    }
}

/*****************************************************************************************************
 * @param updateField
 * @description Update label into database using labelId
 *****************************************************************************************************
 */
Label.prototype.updateLabel=async(updateField)=>{
    try {
        console.log('Update label Model ===>', updateField)

        updateData = await label.findByIdAndUpdate({ '_id':updateField.labelId }, updateField.field)

        if (!updateData) {
            error = { error: 'Label is not updated' }
            return error
        }
        else {
            return updateData
        }
    }
    catch (err) {
        log.logger.error('Update label error==>', err)
        error = { error: 'Label Id is not found to update' }
        return error
    }
}


/*****************************************************************************************************
 * @param deleteField
 * @description delete label from database using labelId
 *****************************************************************************************************
 */
Label.prototype.deleteLabel=async(deleteField)=>{

    try {
        console.log('Delete label Model ===>', deleteField)
        let deletedData = label.findByIdAndRemove(
            { '_id': deleteField.labelId }
        )
        console.log('Deleted data===>', deletedData)
        if (deletedData != '') {
            return deletedData
        }
        else {
            error = { error: 'Label is not deleted' }
            return error
        }
    }
    catch (err) {
        log.logger.error('Delete Note error==>', err)
        error = { error: 'Note Id is not found to delete' }
        return error
    }

}

const labelModelObj = new Label()
module.exports = labelModelObj
