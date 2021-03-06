const yup = require('yup')

class Validations implements ValidationsMethods {

	"whichSchema": WhichSchema
	"payload": any
	"addMoveSchema": any
	"AddGuestSchema": any

	constructor(payload: any) {
		this.payload 			= payload
		this.addMoveSchema = this.getAddMoveSchema
		this.AddGuestSchema = this.getAddGuestSchema
	}

	public get createRoomSchema() {
		return yup.object().shape({
			"cnn_session_id": yup.string().required(),
			"type": yup.string().required(),
			"_id": yup.string().required(),
			"host_id": yup.string().required(),
		})
	}
	
	public get getRoomStateSchema() {
		return yup.object().shape({
			"cnn_session_id": yup.string().required(),
			"type": yup.string().required(),
			"room_id": yup.string().required(),
			"user_id": yup.string().required()
		})
	}

	public get getAddMoveSchema() {
		return yup.object().shape({
			"cnn_session_id": yup.string().required(),
			"mover_id": yup.string().required(),
			"a1": yup.number().positive().integer(), 
			"a2": yup.number().positive().integer(), 
			"a3": yup.number().positive().integer(),
			"b1": yup.number().positive().integer(), 
			"b2": yup.number().positive().integer(), 
			"b3": yup.number().positive().integer(),
			"c1": yup.number().positive().integer(), 
			"c2": yup.number().positive().integer(), 
			"c3": yup.number().positive().integer(),
		})
	}

	public get getAddGuestSchema() {
		return yup.object().shape({
			"cnn_session_id": yup.string().required(),
			"type": yup.string().required(),
			"room_id": yup.string().required(),
			"guest_id": yup.string().required()
		})
	}

	public validateCreateRoom(payload: any) {
		return this.createRoomSchema.isValid(payload)
	}

	public validateGetRoomState(payload: any) {
		return this.getRoomStateSchema.isValid(payload)
	}

	public validateAddMove(payload: addMovePayload) {
		return this.addMoveSchema.isValid(payload)
	}

	public validateAddGuest(payload: addGuestPayload) {
		return this.AddGuestSchema.isValid(payload)
	}

	public validate() {
		if (this.payload.type === 'create_room') {
			return this.validateCreateRoom(this.payload)
		}
		if (this.payload.type === 'get_room_state') {
			return this.validateGetRoomState(this.payload)
		}
		if (this.payload.type === 'add_move') {
			return this.validateAddMove(this.payload)
		}
		if (this.payload.type === 'add_guest') {
			return this.validateAddGuest(this.payload)
		}
	}
}

export default Validations