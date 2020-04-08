const posts = require("./data/db");
const express = require("express");
const router = express.Router();


//POST -creates a post
router.post("/", (req, res) => {
    console.log(req.body)
    const {title, contents} = req.body;
    !title || !contents
    ? res.status(400).json({message: "Please enter title and contents"})
    :posts.insert(req.body)
    .then(posts => {
        res.status(201).json(req.body);
    })
    .catch(err => {
        res.status(500).json({message: "server error"})
    })
})

//POST - creates a comment for the post with that specific id
router.post("/:id/comments", (req, res) => {
    const {text} = req.body;
    const post_id= req.params.id;

    !text ? 
        res.status(400).json({message: "please enter text"})
    : posts.findById(post_id)
    .then(post => {
        if(!post) { res.status(404).json({error: "not found"})
    } else {
        let newComment = {
            text: text,
            post_id: post_id
        }
        posts.insertComment(newComment)
            .then(({id}) => {
        posts.findCommentById(id)
            .then(comment => {
                res.status(201).json(comment)
            });
        })
        .catch(err => {
            console.log(error);
            res.status(500).json({errorMessage: "ERROR ERROR ERROR"})
        })
    }
    })
});

//GET -returns an array of all post object
router.get('/', (req, res) => {
    posts.find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({message: "505 error"})
    })
})

//GET - returns the post with the specified id
router.get("/:id", (req, res) => {
    console.log(req.params)
    const { id } = req.params;
    !id ? res.status(404).json({message: "not found"})
    :posts.findById(id)
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({message: "error 505"})
    })
})

//GET - returns an array of all the comments for the specific post id
router.get("/:id/comments", (req, res) => {
    console.log(req.paramms)
    const {id} = req.params;
    posts.findPostComments(id)
    .then(data => {
        data ? res.status(200).json(data) : res.status(404).json({message: "not found, sorry"})
    })
    .catch(err => {
        res.status(500).json({message: "505 error, server error"})
    })
})

//DELETE 
router.delete("/:id", (req, res) => {
    const {id} = req.params;
    posts.remove(id)
    .then(deleted => {
        if (deleted) {
            res.status(200).json({message: `deleted`, deleted})
        } else {
            res.status(404).json({message: `the id was not found`})
        }
    })  
        .catch (err => {
            res.status(500).json({message: "server errorrrr"})
        })
})

//PUT updates posts with spec. id

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const body = req.body;
    if (!id) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    } else if (!body.title || !body.contents) {
      res
        .status(400)
        .json({
          errorMessage: "Please provide title and contents for the post."
        });
    } else {
      posts.update(id, body)
        .then(re => {
          res.status(200).json(re);
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: "The post information could not be modified." });
        });
    }
  });

module.exports = router;