const jwt = require('jsonwebtoken');
const moment = require('moment');
const client = require('../postgres');

exports.getUserData = async(req, res) => {
	const id = req.query.id
	const query = await client.query('SELECT id, username, email, created_at FROM public.users u WHERE u.id=$1', [id])
	console.log(query.rows, id)
	res.send(query.rows[0])
}

exports.resetPassword = async (req, res) => {
	console.log(req)
	const query = await client.query(
		"UPDATE public.users u SET password_hash=encode(digest(concat(u.password_salt, '"+req.body.pass+"'), 'sha256'), 'hex') WHERE u.id=$1",
		[req.body.id]
	)
	res.send({
		success: true
	})

}

exports.updateUser = async (req, res) => {
	const query = await client.query("UPDATE public.users u SET username=$1, email=$2 WHERE u.id=$3", [req.body.username, req.body.email, req.body.id])
	
	console.log(query.rows)
	res.send({
		success: true
	})
}

exports.register =  async (req, res) => {

	const query = await client.query('SELECT public.f_create_user($1, $2, $3)', [req.body.username, req.body.password, req.body.email])
	//console.log(req)
	const { success, data } = query.rows[0].f_create_user
	const user = await client.query("SELECT id, username, email from public.users WHERE")
	console.log(query.rows[0].f_create_user)
	if (success) { 
		const token = jwt.sign({ id, email }, process.env.JWT)
		
		res.send({
			success: true,
			data: data,
			token: token
		});
	}
	else { 
	}
}

exports.login = async (req, res) => {
	const query = await client.query('SELECT public.f_get_user_by_login($1, $2)', [req.body.email, req.body.password])
	const { success, data } = query.rows[0].f_get_user_by_login
	console.log("loginIS", data, req.body.email, req.body.password)
	if(success) {
		const { id, email } = data
		const token = jwt.sign({ id, email }, process.env.JWT)
		res.send({
			success: true,
			data: data,
			token: token
		})
	} else {
		res.send({
			success: false
		})
	}
}