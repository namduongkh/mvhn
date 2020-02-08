'use strict';

/**
* Module dependencies.
*/

import mongoose from 'mongoose'
import slug from 'slug'
var Schema = mongoose.Schema;

/**
*  Batchlog Schema
*/
var BatchlogSchema = new Schema({
	name: {
		type: String
	},
	model: {
		type: String
	},
	object: {
		type: Schema.ObjectId
	},
	progress: {
		type: Number,
		default: 0
	},
	logs: [{
		type: String
	}],
	options: {
		type: Object
	},
	type: {
		type: String,
	},
	status: {
		type: Number,
		default: 1
	},
	outputFiles: [{
		type: String
	}],
	processStatus: {
		type: String,
		enum: ['pending', 'running', 'success', 'error'],
		default: 'pending'
	}
}, { collection: 'batchlogs', timestamps: true });

BatchlogSchema.methods = {
	log(message) {
		this.logs = this.logs.concat([message]);
	},
	setStatus(status) {
		this.processStatus = status;
	}
}

export default mongoose.model('Batchlog', BatchlogSchema);
