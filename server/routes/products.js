const Product = require.main.require('./models/product');
const Category = require.main.require('./models/category');
const San_Function = require.main.require('./functions');
const config = require.main.require('./custom_config');
var ObjectId = require('mongodb').ObjectID;
module.exports = (app) => {
    app.post('/api/get_products', (req, res, next) => {
        let query = {};
        if(req.body.qry){
            query = { 'name': new RegExp(req.body.qry, 'i') };
        }
        Product.find(query)
        .exec()
        .then((products) => res.json(products))
        .catch((err) => next(err));
    });

    app.post('/api/add_product', (req, res, next) => {
        let base64Data = req.body.images;
        var multiarray = [];
        San_Function.uploadBase64Image(base64Data,function(image_name){
            console.log(image_name)
            let prod = new Product();
            prod.user_id = 1;
            prod.name = req.body.product_name;
            prod.product_image = image_name;
            prod.category = req.body.category;
            prod.price = req.body.price;
            prod.description = req.body.description;
            if (image_name && image_name !='') {
                // multiarray.push(image_name);
                prod.product_image = image_name;
            }
            prod.qty = 1;
            prod.color = 'blue';
            console.log(prod);
            if (req.body.edit_id) {
                prod._id = req.body.edit_id;
            }else{
                prod.save();
            }
          // data._id
          San_Function.sanGenerateBarCode(req.body.barcode, function(qrcode){
            if (qrcode && qrcode !='') {
                prod.qrcode = qrcode;
            }
            // data.save();
            Product.findByIdAndUpdate(ObjectId(prod._id), prod, {new: true}, function (err, product) {
                if (err) return res.status(500).send("There was a problem updating the user.");
                res.status(200).send(product);
            });
        });
      });
    });

    app.delete('/api/product/:id', (req, res, next) => {
        Product.findOneAndRemove({_id: ObjectId(req.params.id)})
        .exec()
        .then((product) => {
          var fs = require('fs');
          // if ( typeof product.images !== 'undefined' && product.images[0] ){
          //   fs.unlink(config.directory+'/uploads/products/'+product.images[0]);
          // }
          // if ( typeof product.qrcode !== 'undefined' && product.qrcode ){
          //   fs.unlink(config.directory+'/uploads/qrcodes/'+product.qrcode);
          // }
          res.json(product);
        })
        .catch((err) => next(err));
    });

    app.post('/api/add_category', (req, res, next) => {
        let cat = new Category();
        cat.name = req.body.name;
        cat.description = req.body.description;
        cat.save();
        res.status(200).send(cat);
    });

    app.get('/api/category/:id', (req, res, next) => {
        Category.findOne({_id: ObjectId(req.params.id)})
        .exec()
        .then((category) => {
          res.json(category);
        })
        .catch((err) => next(err));
    });

    app.delete('/api/category/:id', (req, res, next) => {
        Category.findOneAndRemove({_id: ObjectId(req.params.id)})
        .exec()
        .then((category) => {
          res.json(category);
        })
        .catch((err) => next(err));
    });

    app.post('/api/get_categories', (req, res, next) => {
        let query = {};
        if(req.body.qry){
            query = { 'name': new RegExp(req.body.qry, 'i') };
        }
        Category.find(query)
        .exec()
        .then((categories) => res.json(categories))
        .catch((err) => next(err));
    });

    app.get('/api/product/:id', (req, res, next) => {
        Product.findOne({_id: ObjectId(req.params.id)})
        .exec()
        .then((product) => {
          res.json(product);
        })
        .catch((err) => next(err));
    });

    app.put('/api/product/:id', (req, res, next) => {
        Product.findById(ObjectId(req.params.id))
        .exec()
        .then((product) => {
            product.save()
            .then(() => res.json(product))
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    });

    app.get('/files/:type/:img_name', function(req,res){
        var filename = req.params.img_name;
        var type = req.params.type;
        var ext  = filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
        if (!ext) {
          ext = 'jpg';
        }
        if (ext == 'svg') {
          ext = 'svg+xml';
        }
          var fs = require('fs');
          var imageDir = config.directory+'/uploads/'+type+'/';
               fs.readFile(imageDir + filename, function (err, content) {
                    if (err) {
                        res.writeHead(400, {'Content-type':'text/html'})
                        res.end("No such image");
                    } else {
                        //specify the content type in the response will be an image
                        res.writeHead(200,{'Content-type':'image/'+ext});
                        res.end(content);
                    }
                });
      });
};
