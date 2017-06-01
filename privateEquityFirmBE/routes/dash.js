var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const User = require('../model/user');
const Investment = require('../model/investment');
const Fund = require('../model/fund');
const Report = require('../model/report');
const upload = require('../config/multer');
const passport = require('../config/passport');


/* GET home page. */


router.get('/', (req, res, next) => {
  console.log(' inside get')
  User.find({
      "role": "INVESTOR"
    })
    .exec((err, Users) => {
      console.log('en error');
      if (err) {
        return res.send(err);
      }
      console.log(Users);
      return res.json(Users);
    });
});

router.get('/fund', (req, res, next) => {
  console.log(' inside get')

Fund.find()
    .populate("investments")
    .exec((err, Funds) => {
      console.log('en error');
      if (err) {
        return res.send(err);
      }
      console.log('inside get all funds', Funds);
      return res.json(Funds);
    });
});









//   Investment.aggregate([
//     // { $unwind: '$investments'},

//     {
//       $group: {
//         _id: '$investor',
//         total: {
//           $sum: '$totalInvestment'
//         }
//         }
//       }
//   ])
// .exec(function(err, funds) {
//         // Don't forget your error handling
//         // The callback with your transactions
//         // Assuming you are having a Tag model
//         console.log('before populate', funds)
//         Fund.populate(funds, {path: '_id'}, function(err, funds) {
//           console.log(funds)
//             // Your populated translactions are inside populatedTransactions
//         });
//     });
// });

//delete
// Transaction.aggregate([
//   { $unwind: '$tags' },
//   {
//     $group: {
//       _id: '$tags',
//       amount: {
//         $sum: '$amount'
//       }
//     }
//   }
// ])
// .exec(function(err, transactions) {
//         // Don't forget your error handling
//         // The callback with your transactions
//         // Assuming you are having a Tag model
//         Tag.populate(transactions, {path: '_id'}, function(err, populatedTransactions) {
//             // Your populated translactions are inside populatedTransactions
//         });
//     });
//delete

// Fund.find()
//     .populate("investments")
//     .exec((err, Funds) => {
//       console.log('en error');
//       if (err) {
//         return res.send(err);
//       }
//       console.log('inside get all funds', Funds);
//       return res.json(Funds);
//     });
// });
// .populate("investments")
//     .exec((err, Funds) => {
//       console.log('en error');
//       if (err) {
//         return res.send(err);
//       }
//       console.log('inside get all funds', Funds);
//       return res.json(Funds);
//     });
// });









router.post("/fund", (req, res, next) => {
  console.log(req.body);
  var fundName = req.body.fundName;
  var openDate = req.body.openDate;
  var totalInvestment = req.body.totalInvestment;

  var newFund = Fund({
    fundName,
    openDate,
    totalInvestment
  });

  console.log('before save', newFund);

  newFund.save((err, fund) => {
    console.log('post inside express', fund);
    if (err) {
      res.status(400).json({
        message: err
      });
    } else {
      res.status(200).json({
        message: "ok"
      });
      // res.status(200).json(user);
    }
  });
});

router.get('/fund/fund', (req, res, next) => {
  console.log(' inside get')
   Investment.aggregate([
    // { $unwind: '$investments'},

    {
      $group: {
        _id: '$fund',
        fund: {$first: "$fund"},
        raisedAmount: {
          $sum: '$totalInvestment'
        }
        }
      }
  ])

.exec(function(err, funds) {
        // Don't forget your error handling
        // The callback with your transactions
        // Assuming you are having a Tag model
        console.log('before populate', funds)
        Investment.populate(funds, {path: 'fund'}, function(err, Funds) {
          console.log('en error');
          if (err) {
            return res.send(err);
          }
          console.log('inside get all funds', Funds);
          return res.json(Funds);
        });
    });
});


router.get('/fund/:id', (req, res, next) => {
  console.log(' inside get')
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {

        return res.status(400).json({
          message: 'Specified id is not valid'
        });
      }
  Fund.findById(req.params.id, (err, Funds) => {
      console.log('en error');
      if (err) {
        return res.send(err);
      }
      console.log(Funds);
      return res.json(Funds);
    });
});

router.put('/fund/:id', (req, res) => {
            console.log('inside router put', req.params)
            console.log('inside router put body', req.body)
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
              return res.status(400).json({
                message: 'Specified id is not valid'
              });
            }

            Fund.findByIdAndUpdate(req.params.id, {
              fundName: req.body.fundName,
              openDate: req.body.openDate,
              totalInvestment: req.body.totalInvestment,
            }, (err) => {
              if (err) {
                return res.send(err);
              }
              return res.json({
                message: 'Fund updated successfully'
              });
            });
          })

router.get('/report/:id', (req, res) => {
      console.log('inside report get', req.params.id)
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {

        return res.status(400).json({
          message: 'Specified id is not valid'
        });
      }

      User.findById(req.params.id, (err, user) => {
            if (err) {
              return res.send(err)
            } else {
              User.findOne({
                  _id: req.params.id
                })
                .populate("reports")
                .exec((err, Users) => {
                  console.log('inside get report, user find', Users)
                  if (err) {
                    next(err);
                    return;
                  }
                  return res.json(Users);
                });
            }});
});

          router.post('/report/:id', upload.single('file'), function (req, res) {
            console.log('inside report id');
            const report = new Report({
              reportDate: req.body.reportDate,
              reportName: req.body.reportName,
              reportFile: `http://localhost:3000/uploads/${req.file.filename}`,
              userid: req.params.id
            });

            console.log('report post', report)
            report.save((err, report) => {
              if (err) {
                res.status(400).json({
                  message: err
                });
              } else {
                console.log('inside else', report.userid);
                User.findByIdAndUpdate(report.userid, {
                  $push: {
                    reports: report._id
                  }
                }, (err) => {
                  if (err) {
                    return res.send(err);
                  } else {
                    console.log('final else');
                    res.json({
                      message: 'New Report created!'
                    });
                  }
                });
              }
            });
          });

          router.post("/investment/:id", (req, res, next) => {
            console.log(req.body);
            var fund = req.body.fund;
            var investmentDate = req.body.investmentDate;
            var totalInvestment = req.body.totalInvestment;
            var investor = req.params.id;

            var newInvestment = Investment({
              fund,
              investmentDate,
              totalInvestment,
              investor
            });

            console.log('before save', newInvestment);

            newInvestment.save((err, investment) => {
              if (err) {
                res.status(400).json({
                  message: err
                });
              } else {
                User.findByIdAndUpdate(investor, {
                  $push: {
                    investments: investment._id
                  }
                }, (err) => {
                  if (err) {
                    return res.send(err);
                  } else {
                    Fund.findByIdAndUpdate({
                        fund
                      }, {
                        $push: {
                          investments: investment._id
                        }
                      }, {
                        new: true
                      },
                      (err, fund) => {
                        if (err) {
                          return res.send(err);
                        } else {
                          console.log("investment", investment)
                          console.log("fund", fund)
                        }
                      })
                  };
                });
              }
            });
          });



          router.get('/:id', (req, res) => {
            console.log('inside get id, req params id', req.params.id)
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {

              return res.status(400).json({
                message: 'Specified id is not valid'
              });
            }

            User.findById(req.params.id, {
              password: 0
            }, (err, Users) => {
              if (err) {
                return res.send(err);
              }

              return res.json(Users);
            });
          });

          router.put('/:id', (req, res) => {
            console.log('inside router put', req.params)
            console.log('inside router put body', req.body)
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
              return res.status(400).json({
                message: 'Specified id is not valid'
              });
            }

            User.findByIdAndUpdate(req.params.id, {
              company: req.body.company,
              contactName: req.body.contactName,
              username: req.body.username,
              contactPhone: req.body.contactPhone,
              address: req.body.address,
              city: req.body.city,
              state: req.body.state,
              country: req.body.country,
            }, (err) => {
              if (err) {
                return res.send(err);
              }
              return res.json({
                message: 'Investor updated successfully'
              });
            });
          })

          /* DELETE a Phone. */
          router.delete('/:id', (req, res) => {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
              return res.status(400).json({
                message: 'Specified id is not valid'
              });
            }

            User.remove({
              _id: req.params.id
            }, (err) => {
              if (err) {
                return res.send(err);
              }

              return res.json({
                message: 'Investor has been removed!'
              });
            })
          });









          module.exports = router;