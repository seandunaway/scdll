#!/usr/bin/env node

import {createSocket} from 'node:dgram'
import {parseArgs} from 'node:util'
import {exit} from 'node:process'

let args = parseArgs({
	options: {
		address: {short: 'a', type: 'string', default: 'localhost'},
		port: {short: 'p', type: 'string', default: '22903'}
	},
	strict: false,
})
let address = /** @type {string} */ (args.values.address)
let port = parseInt(/** @type {string} */ (args.values.port))
let command = args.positionals[0]

let message = ''
switch (command) {
	case 'deny':
		message = 'RELEASE_ALL_DLLS'
		break
	case 'allow':
		message = 'ALLOW_LOAD_ALL_DLLS'
		break
	default:
		console.info('usage: [-p <port>] <deny | allow>')
		exit(1)
}

let socket = createSocket('udp4')
socket.send(message, port, address, function (error) {
	if (error) throw error
	socket.close()
})
