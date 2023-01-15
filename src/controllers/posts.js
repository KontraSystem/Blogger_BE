const jwt = require('jsonwebtoken');
const moment = require('moment')
const client = require('../postgres');

exports.getAllPosts = async (req, res) => {
	const query = await client.query(`
		SELECT p.id, p.title, p.description, u.username, p.modified_at FROM public.posts p 
			LEFT JOIN public.users u ON u.id=p.created_by 
			ORDER BY p.id DESC;
	`)
	res.send(query.rows)
}

exports.newPost = async (req, res) => {
	const query = await client.query("INSERT INTO public.posts(title, description, full_text, created_by) VALUES($1, $2, $3, $4)", 
		[
			req.body.title, 
			req.body.description, 
			req.body.full_text, 
			req.body.user_id
		]
	)
	res.send({
		success: true
	})
}

exports.getAllUserPosts = async (req, res) => {
	const query = await client.query(`
		SELECT id, title, description, created_at FROM public.posts p 
			WHERE p.created_by=$1 ORDER BY p.id DESC
	`, [req.query.id])
	res.send(query.rows)
}

exports.getPostDetails = async (req, res) => {
	const id = req.query.id

	if(id) {
		const query = await client.query(`
			SELECT p.id, p.title, p.full_text, p.description, u.username, p.modified_at FROM public.posts p 
				LEFT JOIN public.users u ON u.id=p.created_by
				WHERE p.id = $1
			`, [id])
		res.send(query.rows[0])
	}
}

exports.editPost = async (req, res) => {
	const query = await client.query("UPDATE public.posts p SET title=$1, description=$2, full_text=$3, modified_at=$4 WHERE p.id=$5", [
		req.body.title,
		req.body.description,
		req.body.full_text,
		moment(),
		req.body.id
	])
	res.send({
		success: true
	})
}

exports.deletePost = async (req, res) => {
	const id = req.query.id
	const query = await client.query("DELETE FROM public.posts p WHERE p.id=$1", [id])
	res.end()
}

exports.testDelete = async (req, res) => {
	const id = req.query.id
	res.end()
}