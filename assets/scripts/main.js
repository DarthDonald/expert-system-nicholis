'use strict'


window.onload = () => {
    const question = document.getElementById('question')
    const answersElement = document.getElementById('answers')
    const answers = []
    var quiz = null
    
    require(['scripts/axios.min.js'], function (ax) {
        const axios = ax
        var index
    
        axios.get('/api/data').then(({data}) => {
            quiz = data;
            index = 0 
            run(data, index)
        }).catch(error => {
            console.log(error);
        });


        function run(data, i) {
            if (i < data.length) {
                quiz = quiz || data
                index = i
                question.innerText = quiz[index].name
                switch (quiz[index].type) {
                    case 'numbers': 
                        answersElement.innerHTML = `<div style="display:flex; text-align:center;"><label>Мінімум<input type="number" class="input" name="min" min="${quiz[index].variants[0]}" max="${quiz[index].variants[1] - 1}" placeholder="Мінімум">
                            </label><label>Максимум<input type="number" class="input" name="max" min="${quiz[index].variants[0] + 1}" max="${quiz[index].variants[1]}" placeholder="Максимум"></label></div>`
                        return;
                    case 'number':
                        answersElement.innerHTML = `<input type="number" class="input" min="${quiz[index].variants[0]}" max="${quiz[index].variants[1]}" placeholder="Введіть число">`
                        return;
                    case 'radio':
                        answersElement.innerHTML = ''
                        for (let i = 0; i < quiz[index].variants.length; i++) { 
                            answersElement.innerHTML += `<label class="radio"><input type="radio" name="foobar">${quiz[index].variants[i]}</label>`
                        }
                        return;
                    case 'checkBox':
                        answersElement.innerHTML = ''
                        for (let i = 0; i < quiz[index].variants.length; i++) {
                            answersElement.innerHTML += `<label class="checkbox"><input type="checkbox">${quiz[index].variants[i]}</label>`
                        }
                        return;
                    default:
                        return;
                }
            } else {
                finish()
            }
        }

        function finish() {
            var result = 0
            for (let i = 1; i < answers.length; i++) {
                for (let j = 0; j < answers[i].length; j++) {
                    if (typeof answers[i][j] !== 'boolean') {
                        result += parseInt(answers[i][j])
                    } else if (answers[i][j]) {
                        result += j + 1;
                    }
                }
            }
            result -= 15;
            result /= 2;
            result = Math.round(result)
            axios.post('/api/finish', {answers: result}).then(({data}) => {
                question.innerText = `Вам підійдуть ${data.name}`
                answersElement.innerHTML = `
                    <img src="${data.image}" alt="${data.name}" class="drums">
                    <p class="price">Їх ціна: $${data.price}<p>
                `
                document.getElementById('button').innerText = 'Почати заново'
            }).catch(error => {
                console.log(error);
            });
        }

        window.submit = () => {
            if (quiz.length > index) {
                var ans = []
                for (let i = 0; i < answersElement.elements.length; i++) {
                    if (answersElement.elements[i].value === 'on') {
                        ans.push(answersElement.elements[i].checked)
                    } else {
                        ans.push(answersElement.elements[i].value)
                    }
                }
                answers.push(ans)
    
                setTimeout(() => {
                    run(quiz, index + 1)
                }, 100)
            } else {
                window.location.reload()
            }
        }
    });
}

