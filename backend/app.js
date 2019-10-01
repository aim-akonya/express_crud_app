const express = require('express');
const bodyParser = require('body-parser');
const Recipe = require('./models/recipe');

const app = express();

app.use( (req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
//add new recipe to the database
app.post('/api/recipes', (req, res, next)=>{
    const recipe = new Recipe({
        title: req.body.title,
        description: req.body.description,
        instructions: req.body.instructions,
        difficulty: req.body.difficulty,
        time: req.body.time
    });

    recipe.save()
        .then(()=>{
            res.status(201).json({
                message: 'Post saved successfully'
            })
        })
        .catch( (error)=>{
            console.log(error)
            res.status(400).json({
                error: error
            });
        });

});

//return the recipe with a given id from the database
app.get('/api/recipes/:id', (req, res, next)=>{
  Recipe.findOne({
    _id: req.params.id
  })
  .then( (recipe)=>{
    res.status(200).json(recipe);
  })
  .catch( (error)=>{
    res.status(400).json({error:error});
  });
});

//modify the recipe with the provided id
app.put('/api/recipes/:id', (req, res, next)=>{
  const recipe = new Recipe({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    instructions: req.body.instructions,
    difficulty: req.body.difficulty,
    time: req.body.time
  });
  Recipe.updateOne({_id: req.params.id}, recipe)
    .then( ()=>{
      res.status(201).json({
        message: 'Recipe Updated Successfully'
      });
    })
    .catch( (error)=>{
      res.status(400).json({error:error})
    });
});

//delete recipe with a specific id
app.delete('/api/recipe/:id', (req, res, next)=>{
  Recipe.deleteOne({_id: req.params.id})
    .then( ()=>{
      res.status(200).json({message:'Thing Deleted Successfully'});
    })
    .catch(  (error)=>{
      res.status(400).json({error:error});
    });
});

// return all recipes in the database
app.use('/api/recipes', (req, res, next)=>{
  Recipe.find()
        .then( (recipes)=>{
            res.status(200).json(recipes);
        })
        .catch( (error)=>{
            res.status(400).json({
                error:error
            })
        })
})





module.exports = app;
