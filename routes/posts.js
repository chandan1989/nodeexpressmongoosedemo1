const express = require('express');
const router = express.Router();
const Post = require('../models/posts');
const bodyParser = require('body-parser');
const { response } = require('express');

const user = 'chandan';

router.use(bodyParser.json());
// router.use('/posts', () => {
//     console.log('entered posts');
// }
// );
router.post('/', async (req, res) => {
    console.log(req.body);
    const postObj = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try {
        const postData = await postObj.save();
        console.log("data saved successfully ,  " + postData);
        res.json(postData);

    } catch (err) {
        res.json({ message: err });
    }

    // postObj.save()
    //     .then(data => {
    //         res.json(data);
    //         console.log('Data saved successfully , Data: ' + data);
    //     })
    //     .catch(err => {
    //         res.json({ message: err });
    //         console.log('Err -> ' + err);

    //     })

});
router.get('/', async (req, res) => {
    // res.send('welcome to get1');
    //const postObj = new Post();
    try {
        const posts = await Post.find();
        console.log(posts);
        // res.setHeader("header1","1111");
        // res.setHeader("header")
        res.json(posts);
        // res.send();
    } catch (err) {
        console.log(err);
        res.json({ message: err });
    }

    // Post.find()
    //     .then(post1 => res.json(post1))
    //     .catch(err => {
    //         console.log(err);
    //         res.status(400).json({ success: false });
    //         res.setHeader("error",err);
    //     });

});
router.get('/:postId', async (req, res) => {
    try {

        const id = req.params.postId;
        console.log(id);

        const postObj = await Post.findById(id);
        console.log(postObj);
        res.status(200).json({ success: true, postObj });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err });
    }
});

router.delete('/:postId', async (req, res) => {

    try {
        const removePost = await Post.remove({ _id : req.params.postId});
        res.status(200).send({success: true, removePost});
    }catch(err){
        console.log(err);
        res.status(500).send({success: Error, message: err});
    }
    
});
router.patch('/:postId', async (req,res)=>{
    try{
        console.log(req.body.title);
        const updatePost = await Post.updateOne(
            {_id: req.params.postId},
            {$set: {title: req.body.title}}
        );
        console.log(updatePost);
        res.json(updatePost);
    }catch(err){
        console.log(err);
        res.status(500).send({success: Error, message: err}); 
    }
});

router.delete('/userAddress', (req, res) => {
    res.send('welcome to posts for user address');
});

module.exports = router;


