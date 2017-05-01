'use strict';
const
    express = require('express'),
    router = express.Router(),
    mongojs = require('mongojs'),
    db = mongojs("mongodb://jmajor:sup0rt&ftp@ds125481.mlab.com:25481/moviesapp", ['series']);

    //Get All Series
    router.get('/series' , (req, res, next) =>{
        db.series.find((err, series) => {
            if(err) res.send(err);
            else res.json(series)
        })
    });

    //Get Single Serie
    router.get('/serie/:id', (req, res, next) => {
        db.series.findOne({
            _id : mongojs.ObjectId(req.params.id)
        }, (err, serie) => {
            if(err) res.send(err);
            else res.json(serie)
        })
    });

    //Insert a Serie
    router.post('/serie', (req, res, next) => {
        const serie = req.body;
        if(!serie.title || !serie.category){
           res.status(400);
           res.json({"error": "Invalid Data"});     
        }else{
            db.series.save(serie, (err, result)=> {
                  if(err) res.send(err);
                  else res.json(result)
            });
        }
    });

    //Update a serie
    router.put('/serie/:id', (req, res, next) => {
        const serie = req.body;
        let updObj = {};

        if(serie.isCompleted) updObj.isCompleted = serie.isCompleted;
        if(serie.title) updObj.title = serie.title;


        if(!updObj){
           res.status(400);
           res.json({"error": "Invalid Data"});     
        }else{
            db.series.update({
                _id: mongojs.ObjectId(req.params.id)
            }, updObj, {}, (err, result) => {
                if(err) res.send(err);
                else res.json(result)
            });
        }
    });

    //Detele a serie
    router.delete('/serie/:id', (req, res, next) => {
        db.todos.remove({
            _id: mongojs.ObjectId(req.params.id)
        }, '', (err, result) => {
            if(err) res.send(err);
            else res.json(result)
        });
    })


    module.exports = router;