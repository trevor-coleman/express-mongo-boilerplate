import express from 'express';
import debug from 'debug';

const log = debug('app:route:home')
const router = express.Router();

router.get('/', ((req, res) => {
    res.render('index', {
        title: "The Home Page",
        message: "This is the home page",
        itemOne: "item one",
        itemTwo: "item two",
        itemThree: "item three"
    })
}))

export default router;