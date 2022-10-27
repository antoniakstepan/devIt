let Parser = require('rss-parser');
let parser = new Parser();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const ItemSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  },
  title: {type: String, require: true},
  description: {type: String, require: true},
  publishedDate: { type: Date, default: Date.now },
})

const Item = mongoose.model('Item', ItemSchema);

class ItemController {
  async getAll(req, res) {
    const { query } = req;

    try {
      // let feed = await parser.parseURL('https://daily-dev-tips.com/sitemap.xml');
      // let feed = await parser.parseURL('https://lifehacker.com/rss');
      
      await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true , useUnifiedTopology:true, useCreateIndex: true}, async(err) => {
        if (err) {
          return res.sendStatus(500)
        }
        if (query && query?.title) {
          console.log(query?.title, "res")
          const result = await Item.find({title: query.title})
          console.log(result, "result")
          return res.json(result)
        } 
        const result = await Item.find()
        return res.json(result)
      })
    } catch (e) {
      console.log(e, 'error')
    }
  }

  async createItem(req, res) {
    const { title, description } = req.body;
    try {
      await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true , useUnifiedTopology:true, useCreateIndex: true}, async(err) => {
        if (err) {
          console.log(err, 'error');
          return res.sendStatus(500)
        }
        const item = await new Item({title: title, description: description})
        await item.save((err, user) => {
          if(err) {
            console.log(err, 'error');
          return res.sendStatus(500)
          }
          console.log(item, 'item')
        })
      })
    } catch (e) {
      console.log(e, 'error')
    }
  }

  async deleteItem(req, res) {
    const { _id } = req.body;
    try {
      await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true , useUnifiedTopology:true, useCreateIndex: true}, async(err) => {
        if (err) {
          console.log(err, 'error');
          return res.sendStatus(500)
        }
        console.log(_id, '_id')
        const query = { _id: _id };

        const item = await Item.deleteOne(query)
        if (item.deletedCount === 1) {
          res.json({message: 'delete'})
          console.log("Successfully deleted one document.");
        } else {
          console.log("No documents matched the query. Deleted 0 documents.");
        }
      })
    } catch (e) {
      console.log(e, 'error')
    }
  }

  async updateItem(req, res) {
    const { id, title, description  } = req.body;
    try {
      await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true , useUnifiedTopology:true, useCreateIndex: true}, async(err) => {
        if (err) {
          console.log(err, 'error');
          return res.sendStatus(500)
        }
        const query = description ? {title: title, description: description}: {title: title}
        const item = await Item.findByIdAndUpdate(id, query)

        console.log(item, 'item')
        // if (item.deletedCount === 1) {
        //   res.json({message: 'delete'})
        //   console.log("Successfully deleted one document.");
        // } else {
        //   console.log("No documents matched the query. Deleted 0 documents.");
        // }
      })
    } catch (e) {
      console.log(e, 'error')
    }
  }
}

module.exports = new ItemController();