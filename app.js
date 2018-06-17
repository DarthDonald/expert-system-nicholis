'use strict';

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

const app = express()
const uristring = process.env.MONGODB_URI || 'mongodb://localhost/ExpertSystem';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/assets'))


mongoose.connect(uristring, (err, res) => {
    if (err) {
        console.log('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log('Succeeded connected to: ' + uristring);
    }
});

const quizSchema = new mongoose.Schema({
    name: String,
    type: String,
    variants: Array
});

const resultSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    answers: Number
});

const PQuiz = mongoose.model('PowerQuiz', quizSchema);
const PResult = mongoose.model('PowerResult', resultSchema);

const options = {
    host: 'localhost',
    port: 8080
}

// Create a server with a host and port
app.listen(options.port, () => console.log(`Example app listening on port ${options.port}!`))


// request is made to the homepage
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html')
})

// request is made to the systempage
app.get('/system', function (req, res) {
    res.sendFile(__dirname + '/views/system.html')
})


// request is made to the data
app.get('/api/data', function (req, res) {
    PQuiz.find().exec((err, result) => {
        if (!err) {
            res.send(result)
        } else {
            res.send({
                message: 'Щось пішло не так'
            })
        }
    })
})

// request is made to the finish
app.post('/api/finish', function (req, res) {
    
    console.log(req.body.answers)

    PResult.findOne({answers: req.body.answers}, (err, obj) => {
        if (!err) {
            res.send(obj)
        } else {
            res.send({
                message: 'Щось пішло не так'
            })
        }
    })
})













// const quiz = {
//     price: {
//         name: 'Ціна установки',
//         type: 'numbers',
//         variants: [
//             250,
//             5000
//         ]
//     },
//     destiny: {
//         name: 'Яке основне призначення ударної установки?',
//         type: 'checkBox',
//         variants: [
//             'навчання',
//             'виступи',
//             'виступи на великій сцені'
//         ]
//     },
//     level: {
//         name: 'Який ваш рівень гри на ударній установці?',
//         type: 'radio',
//         variants: [
//             'початківець',
//             'середній рівень',
//             'продвинутий',
//             'професіонал'
//         ]
//     },
//     time: {
//         name: 'Як давно ви граєте на ударних?',
//         type: 'radio',
//         variants: [
//             'меньше року',
//             '1-2 роки',
//             '3-5 років',
//             '5-10 років',
//             '10 і більше років'
//         ]
//     },
//     quality: {
//         name: 'Оцініть від 1 до 10 на скільки важлива якість звучання?',
//         type: 'number',
//         variants: [
//             1,
//             10
//         ]
//     },
//     bass: {
//         name: 'На скільки важливі у вашій грі низькі звуки?',
//         type: 'checkBox',
//         variants: [
//             'не важливі',
//             'відносно важливі',
//             'важливі'
//         ]
//     },
//     hiHat: {
//         name: 'На скільки добре ви вмієте тримати один ритм на протязі гри?',
//         type: 'radio',
//         variants: [
//             'погано',
//             'задовільно',
//             'добре'
//         ]
//     },
//     crash: {
//         name: 'Як часто вы граете з ясквраво вираженими акцентами?',
//         type: 'radio',
//         variants: [
//             'рідко',
//             'інколи',
//             'завжди'
//         ]
//     },
//     ride: {
//         name: 'Як часто ви граєте ритмічну канву?',
//         type: 'radio',
//         variants: [
//             'рідко',
//             'інколи',
//             'завжди'
//         ]
//     },
//     stands: {
//         name: 'Тарілки якої якості ви бажаєте?',
//         type: 'radio',
//         variants: [
//             'низької',
//             'задовільної',
//             'високої'
//         ]
//     },
//     rimShot: {
//         name: 'Як часто ви використовуєте rimshots?',
//         type: 'radio',
//         variants: [
//             'ніколи',
//             'інколи',
//             'завжди'
//         ]
//     },
//     plastic: {
//         name: 'Як часто ви плануєте грати на придбаних барабанах?',
//         type: 'radio',
//         variants: [
//             'рідко',
//             'інколи',
//             'завжди'
//         ]
//     },
//     support: {
//         name: 'Чи вмієте ви доглядати за барабанами самостійно?',
//         type: 'radio',
//         variants: [
//             'ні',
//             'трохи',
//             'абсолютно так'
//         ]
//     },
//     forWho: {
//         name: 'Чи буде ударна установка використовуватися іншими людьми?',
//         type: 'radio',
//         variants: [
//             'ні',
//             'іноді',
//             'так'
//         ]
//     },
//     forWhoTime: {
//         name: 'Як часто інші люди будуть грати на ударній установці?',
//         type: 'radio',
//         variants: [
//             'іноді',
//             'періодично',
//             'завжди'
//         ]
//     }
// }




// const result = {
//     MXC307: {
//         name: 'MAXTONE MXC307',
//         price: 150,
//         image: 'https://jam.ua/files/images/items/MXC307-red-maxtone.jpg',
//         answers: 1
//     },
//     HM33BK: {
//         name: 'Hayman HM-33-BK',
//         price: 158,
//         image: 'https://i1.rozetka.ua/goods/2121923/copy_hayman_18_3_17_4_598413e44f8bc_images_2121923034.jpg',
//         answers: 2
//     },
//     MXC3005: {
//         name: 'MAXTONE MXC3005',
//         price: 402,
//         image: 'https://jam.ua/files/images/items/MXC3005-1.jpg',
//         answers: 3
//     },
//     RYDEEN: {
//         name: 'YAMAHA RYDEEN',
//         price: 505,
//         image: 'https://jam.ua/files/images/items/RDP2F5-MY-main-yamaha.jpg',
//         answers: 4
//     },
//     PDZ522KT: {
//         name: 'PDP PDZ522KT Z5 SERIES',
//         price: 525,
//         image: 'https://jam.ua/files/images/items/PDP%20PDZ522KT%20Z5%20Series%20Aqua%20Blue%20%D0%B1%D0%B0%D1%80%D0%B0%D0%B1%D0%B0%D0%BD%D1%8B.jpg',
//         answers: 5
//     },
//     PeaceProdigyDP109CH22: {
//         name: 'Sonor SMF Stage 1 Set 13004',
//         price: 585,
//         image: 'https://i1.rozetka.ua/goods/1388579/peace_prodigy_dp_109ch_22_18_3_11_33_images_1388579235.jpg',
//         answers: 6
//     },
//     SonorSMFStage1Set13004: {
//         name: 'Sonor SMF Stage 1 Set 13004',
//         price: 631,
//         image: 'https://i1.rozetka.ua/goods/11344/sonor_smf_stage_1_set_13004_images_11344055.jpg',
//         answers: 7
//     },
//     PremierAPK6429925CBW: {
//         name: 'Premier APK 64299-25CBW Stage 20',
//         price: 738,
//         image: 'https://i2.rozetka.ua/goods/1389587/premier_apk_64299_25cbw_stage_20_images_1389587385.jpg',
//         answers: 8
//     },
//     PDNY1804: {
//         name: 'PDP PDNY1804 NEW YORKER',
//         price: 788,
//         image: 'https://jam.ua/files/images/items/pdp-new-yorker-diamond-spar.jpg',
//         answers: 9
//     },
//     PDMA2215BZ8: {
//         name: 'PDP PDMA2215BZ8 MAINSTAGE SERIES',
//         price: 940,
//         image: 'https://jam.ua/files/images/items/PDP%20PDMA2215BZ8%20Mainstage%20Bronze.jpg',
//         answers: 10
//     },
//     Genista4329944PSF: {
//         name: 'Premier Genista 43299-44PSF SE Birch Modern Rock 22',
//         price: 1063,
//         image: 'https://i2.rozetka.ua/goods/1389582/premier_genista_43299_44psf_18_3_14_100_images_1389582627.jpg',
//         answers: 11
//     },
//     ROCKTOUR: {
//         name: 'YAMAHA ROCK TOUR',
//         price: 1140,
//         image: 'https://jam.ua/files/images/items/RockTour%20TR.jpg',
//         answers: 12
//     },
//     STAGECUSTOMBIRCH: {
//         name: 'YAMAHA STAGE CUSTOM BIRCH 2014',
//         price: 1162,
//         image: 'https://jam.ua/files/images/items/sbp2f5-rb-stagecustom-yamafa.jpg',
//         answers: 13
//     },
//     PDCB2215NC: {
//         name: 'PDP PDCB2215NC CONCEPT SERIES BIRCH',
//         price: 1165,
//         image: 'https://jam.ua/files/images/items/PDP%20PDCB2215NC%20Concept%20Series%20Natural%20to%20Charcoal%20Fade.jpg',
//         answers: 14
//     },
//     PDCM2215TC: {
//         name: 'PDP PDCM2215TC CONCEPT SERIES MAPLE',
//         price: 1260,
//         image: 'https://jam.ua/files/images/items/PDP%20PDCM2215TC%20Concept%20Series%20Transparent%20Cherry.jpg',
//         answers: 15
//     },
//     PDCM2215TC: {
//         name: 'PDP PDCM2215TC CONCEPT SERIES MAPLE',
//         price: 1260,
//         image: 'https://jam.ua/files/images/items/PDP%20PDCM2215TC%20Concept%20Series%20Transparent%20Cherry.jpg',
//         answers: 16
//     },
//     YAMAHASTAGECUSTOMBIRCH: {
//         name: 'YAMAHA STAGE CUSTOM BIRCH',
//         price: 1750,
//         image: 'https://jam.ua/files/images/items/Stage%20Custom%20Birch%20CR.jpg',
//         answers: 17
//     },
//     DWDESIGNSERIES5_PIECESHELLPACK: {
//         name: 'DW DESIGN SERIES 5-PIECE SHELL PACK',
//         price: 2400,
//         image: 'https://jam.ua/files/images/items/DDLG2215CS-xlarge.jpg',
//         answers: 18
//     },
//     DWPERFORMANCESERIES5_PIECESHELLPACKMAPLESNARE: {
//         name: 'DW DESIGN SERIES 5-PIECE SHELL PACK',
//         price: 3770,
//         image: 'https://jam.ua/files/images/items/5981632_800.jpg',
//         answers: 19
//     },
//     YAMAHAMAPLECUSTOMABSOLUTE :{
//         name: 'YAMAHA MAPLE CUSTOM ABSOLUTE',
//         price: 4375,
//         image: 'https://jam.ua/files/images/items/yamaha_maple_custom_absolut_vn.jpg',
//         answers: 20
//     }
// }