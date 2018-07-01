const {productModel ,subscriptionplanModel} = require('../../models')
const randomname = () =>{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < 8; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
  const randonumber = () =>{
    var text = "";
    var possible = "0123456789";

    for (var i = 0; i < 3; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
module.exports = {
    showCheckout : (req,res)=> {
    //     if( !req.isAuthenticated()
    //     && typeof req.session.passport === 'undefined'
    //     && !req.session.passport){
    //     res.redirect('/auth/login');
    //   }
            res.render('cart/tiffincheckout');
    },
    showIndex : async (req,res) => {
        const city  = req.params.city;
        const state = req.params.state;
// testing purpose
          //        await new productModel({
        //     name : "pizza",
        //     description : "pizza Paneer with cheezz Jeera Rice",
        //     _vendorID : "5b349f64bd7c837905ed3b8e",
        //     location  : city+","+state,
        //     isSubscripable : true,
        //     isNonVeg : false,
        //     rating : 0
        // }).save(async(err,newproduct) => {
        //     // console.log('newproduct :', newproduct);
        //     await new subscriptionplanModel({
        //         _productID : newproduct._id,
        //         cost_per_day : 120,
        //         number_of_days : 1,
        //         total_cost : 1*120,
        //         _vendorID : "5b349f64bd7c837905ed3b8e",
        //         location  : newproduct.location,
        //         service_time : "dinner"
        //     }).save((err,subscriptionplan) => {
        //         // console.log('subscriptionplan :', subscriptionplan);
        //     })
        // });
       await subscriptionplanModel.find().
        populate('_productID').
        exec((err,product) => {
            if(err) {

                res.send("ERROR!! PLEASE TRY TO ACCESS AGAIN");
            }else{
                console.log('product :', product);
                res.render('tiffin',{
                    city,
                    state,
                    product
                });
            }
        })

    },
    show : async (req,res) => {
        const city  = req.params.city;
        const state = req.params.state;

        // Chennai , Tamil Nadu 600003
        const location  = city + "," + state;
        console.log('location :'+location);
        const product = await subscriptionplanModel.find({
            location : new RegExp('('+city+'|'+state+')','g')
        }).exec();
        console.log('product :', product);
        res.render('tiffin',{
            city,
            state,
            count : product.length
        })
    },
    seed : async (req,res) => {
        const city  = req.params.city;
        const state = req.params.state;
           await new productModel({
            name : randomname(),
            description : randomname()+" " + randomname()+" "+randomname()+" "+randomname()+" "+randomname(),
            _vendorID : "5b349f64bd7c837905ed3b8e",
            location  : city+","+state,
            isSubscripable : true,
            isNonVeg : true,
            rating : 0
        }).save(async(err,newproduct) => {
            // console.log('newproduct :', newproduct);
            console.log("savinng");
            await new subscriptionplanModel({
                _productID : newproduct._id,
                cost_per_day : 10,
                number_of_days : 1,
                total_cost : randonumber(),
                _vendorID : "5b349f64bd7c837905ed3b8e",
                location  : newproduct.location,
                service_time : "lunch"
            }).save((err,subscriptionplan) => {
                // console.log('subscriptionplan :', subscriptionplan);
            })
        });

        const location  = city + "," + state;
        console.log('location :'+location);
        const product = await subscriptionplanModel.find().populate('_productID').exec();
        console.log('product :', product);
        // res.render('tiffin',{
        //     city,
        //     state,
        //     count : product.length
        // })
        res.json(product);
    },
    fetch : async (req,res)=>{
        const city  = req.params.city;
        const state = req.params.state;
        var limit = req.params.limit;
        limit = parseInt(limit);
        console.log('limit :', limit);
        const product = await subscriptionplanModel.find({
            location : new RegExp('('+city+'|'+state+')','g')
        }).
        populate('_productID')
        .skip(limit + 3)
        .limit(limit)
        .exec();
        var output = '';
        product.forEach((pro,i) => {
            var isNonVegClassDesign = '';
            if(pro._productID.isNonVeg) {
                isNonVegClassDesign = 'non-veg';
            }else{
                isNonVegClassDesign = 'veg';
            }
            output = output + `
            <div class="col-md-3 ">
                <a href="/tiffin/checkout/` + pro._id +`/` + pro._productID._id +`">
                    <div class="product-details">
                        <div class="img-container">
                            <img  src="/images/veg_sandwich.jpg" alt="">
                        </div>
                        <div class="row product-meta-data">
                            <div class="col-md-12">
                                <p class="description t">` + pro._productID.description +`</p>
                            </div>
                            <div class="col-md-12">
                                <h3 class="sub-heading t compact">` + pro._productID.name +`</h3>
                            </div>
                            <div class="col-md-12">
                                <span class="small-para">` + pro._productID.location +`</span>
                            </div>

                            <div class="col-md-12">

                                 <div class=" box-compact">
                                    <div class="cost">
                                        <span class="small-para" style="font-size:15px;">&#9733;</span>
                                        <span class="small-para" >` + pro._productID.rating +`</span>
                                    </div>
                                </div>
                                <div class=" box-compact">
                                    <div class="cost">
                                        <span class="`+isNonVegClassDesign+`">&#x25C9;</span>
                                    </div>
                                </div>
                                 <div class=" box-compact">
                                    <div class="cost">
                                       <img class="icon-svg sh" src="/images/icon/rupee-indian.svg" alt="">
                                    </div>
                                </div>
                                <div class=" box-compact">
                                    <div class="cost">

                                        <span class="small-para">` + pro.total_cost +`</span>
                                    </div>
                                </div>
                                <div class=" box-compact">
                                    <div class="cost">
                                        <span class="small-para">` + pro.service_time +`</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">

                                <a class="pro-btn"
                                 href="/tiffin/checkout/` + pro._id +`/` + pro._productID._id +`"
                                 >
                                  subscibe
                                 </a>
                            </div>

                        </div>




                    </div>
                    </a>
                    </div>

            `;
        });
        res.send(output);
    }
}