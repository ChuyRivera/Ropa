const express = require('express');
const router = express.Router();

const pool = require('../database'); //conexion a la base de datos
const { isLoggedIn } = require('../lib/auth');

// Ruta de la pantalla para añadir enlaces
router.get('/add', isLoggedIn, (req, res)=>{  
    res.render('links/add');
});

// Ruta encargada de recibir los datos del formulario
router.post('/add', isLoggedIn, async (req, res)=>{  
    //console.log(req.body); //ver en consola los datos que se estan recibiendo del formularo
    const { title, url, description } = req.body;
    const newLink = { //se crea un objeto con los datos que recibe el req.body
        title,
        url,
        description,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO links set ?', [newLink]);
    req.flash('success', 'Link guardado correctamente');
    res.redirect('/links');
});

// Ruta donde se mostraran los enlaces guardados
router.get('/', isLoggedIn, async (req, res) =>{
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
    res.render('links/list', {links: links});
});

// Ruta para eliminar alguno d elos links guardados
router.get('/delete/:id', isLoggedIn, async (req, res) =>{
    //console.log(req.params.id); //mostrar por consola el dato del id que se quiere eliminar
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE id = ?', [id]);
    req.flash('success', 'Link removido con éxito');
    res.redirect('/links');
});

// Ruta para editar los enlaces guardados con un formulario
router.get('/edit/:id', isLoggedIn, async (req, res) =>{
    const { id } = req.params;
    //console.log(id);
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    //console.log(links[0]);
    res.render('links/edit', {link : links[0]})
});

// Ruta que actuailiza la base de datos con los datos del formulario cuando presionas save
router.post('/edit/:id', isLoggedIn, async (req,res) =>{
    const { id } = req.params;
    const { title, description, url } = req.body;
    const newLink = {
        title,
        description,
        url
    };
    await pool.query('UPDATE links set ? WHERE id = ?' , [newLink, id]);
    req.flash('success', 'Link actualizado con éxito');
    res.redirect('/links');
});


module.exports = router;