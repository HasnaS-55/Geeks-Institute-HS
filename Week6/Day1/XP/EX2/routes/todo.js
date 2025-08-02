import express from 'express'


let todos = [];

const router = express.Router()

router.get("/", (req, res) => {
    try {
        res.json(todos)
    } catch (err) {
        res.json(err)
    }
})
router.get("/:id", (req, res) => {
    try {
        let id = parseInt(req.params.id)
        const todo = todos.find(item => item.id === id);
        
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        
        res.status(200).json(todo);
        
    } catch (err) {
        res.json(err)
    }
})

router.post("/", (req, res) => {
    try {
        let id = todos.length + 1
        let {title, content} = req.body
        if (!title ||!content) {
            res.json({message: "No title or no content"})
        }

        let item = {
            id: id,
            title: title,
            content: content
        }

        todos.push(item)
        res.json({message: "list successfully added", list: item})
    } catch (err) {
        res.json(err)
    }
})


router.put("/:id", (req, res) => {
    try {
        let id = parseInt(req.params.id)
        let {title, content} = req.body
        if (!title ||!content) {
            res.json({message: "No title or no content"})
        }
        let index = todos.findIndex(item => item.id === id )
        todos[index].title = title
        todos[index].content = content
        res.json({message: "list successfully updated"})
    } catch (err) {
        res.json(err)
    }
})



router.delete("/:id", (req, res) => {
    try {
        let id = parseInt(req.params.id)
        
        
        todos= todos.filter(item => item.id !== id )
        
        res.json({message: "list successfully daleted"})
    } catch (err) {
        res.json(err)
    }
})

export default router