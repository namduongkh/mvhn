'use strict'

import fs from 'fs'
import path from 'path'
import async from 'async'
import Promise from 'bluebird'
import { exec } from 'child_process'

const extract = (filePath, unzipPath) => {
	return new Promise((resolve, reject) => {
		let cmd
		if (process.platform == 'win32') {
			// Work on powershell on windows
			cmd = `powershell.exe -nologo -noprofile -command "& { Add-Type -A 'System.IO.Compression.FileSystem'; [IO.Compression.ZipFile]::ExtractToDirectory('${filePath}', '${unzipPath}'); }"`
		} else {
			cmd = `unzip ${filePath} -d ${unzipPath}`
		}

		exec(cmd, { maxBuffer : 1000000 * 1024 }, (err, stdout, stderr) => {
			// console.log('stdout: ', stdout)
			// console.log('stderr: ', stderr)

			if (err) {
				// console.log(err)
				reject(err)
			} else {
				resolve(true)
			}
		})
	})
}

const getContent = filePath => {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, 'utf8', (err, content) => {
			if (err) {
				reject(err)
			}

			resolve(content)
		});
	})
}

const deleteFile = filePath => {
	return new Promise((resolve, reject) => {
		fs.unlink(filePath, err => {
			if (err) {
				reject(err)
			} else {
				resolve(true)
			}
		})
	})
}

const deleteDirectory = (dir) => {
	return new Promise((resolve, reject) => {
		let cmd
		if (process.platform == 'win32') {
			// Work on windows
			cmd = `rmdir ${dir} /s /q`
		} else {
			cmd = `rm -rf ${dir}`
		}

		exec(cmd, { maxBuffer : 1000000 * 1024 }, (err, stdout, stderr) => {
			// console.log('stdout: ', stdout)
			// console.log('stderr: ', stderr)

			if (err) {
				// console.log(err)
				reject(err)
			} else {
				resolve(true)
			}
		})
	})
}

const deleteDirectories = (dirs) => {
	return new Promise((resolve, reject) => {
		async.each(dirs, (dir, callback) => {
			deleteDirectory(dir)
			.then(done => {
				callback()
			})
			.catch(err => {
				callback(err)
			})
		}, err => {
			if (err) {
				reject(err)
			} else {
				resolve(true)
			}
		})
	})
}

export default {
	extract,
	getContent,
	deleteFile,
	deleteDirectory,
	deleteDirectories
}