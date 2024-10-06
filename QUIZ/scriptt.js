const quizData = [
    {
        question: 'Apa itu multimedia?',
        options: ['Jenis seni', 'Menggunakan banyak media', 'Konten hanya berbasis teks', 'Bentuk pemrograman'],
        answer: 'Menggunakan banyak media',
    },
    {
        question: 'Elemen mana yang BUKAN elemen multimedia?',
        options: ['Teks', 'Audio', 'Video', 'Compiler'],
        answer: 'Compiler',
    },
    {
        question: 'Apa yang dimaksud dengan "multimedia interaktif"?',
        options: ['Konsumsi media secara pasif', 'Interaksi pengguna dengan elemen media', 'Hanya menonton video', 'Hanya membaca teks'],
        answer: 'Interaksi pengguna dengan elemen media',
    },
    {
        question: 'Software mana yang biasa digunakan untuk presentasi multimedia?',
        options: ['Microsoft Word', 'PowerPoint', 'Excel', 'Notepad'],
        answer: 'PowerPoint',
    },
    {
        question: 'Karakteristik utama multimedia adalah?',
        options: ['Konten statis', 'Interaksi non-linear', 'Hanya teks', 'Hanya satu jenis media'],
        answer: 'Interaksi non-linear',
    }
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayQuestion() {
    const questionData = quizData[currentQuestion];

    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';

    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);

    for (let i = 0; i < shuffledOptions.length; i++) {
        const option = document.createElement('label');
        option.className = 'option';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'quiz';
        radio.value = shuffledOptions[i];

        const optionText = document.createTextNode(shuffledOptions[i]);

        option.appendChild(radio);
        option.appendChild(optionText);
        optionsElement.appendChild(option);
    }

    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
        const answer = selectedOption.value;

        if (answer === quizData[currentQuestion].answer) {
            score++;
        } else {
            const explanation = getExplanation(currentQuestion);
            incorrectAnswers.push({
                question: quizData[currentQuestion].question,
                incorrectAnswer: answer,
                correctAnswer: quizData[currentQuestion].answer,
                explanation: explanation
            });
        }

        currentQuestion++;
        setTimeout(() => {
            if (currentQuestion < quizData.length) {
                displayQuestion();
            } else {
                displayResult();
            }
        }, 1000);
    }
}

function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';

    let resultHtml = `<p>Anda mendapatkan <strong>${score}</strong> dari <strong>${quizData.length}</strong>!</p>`;
    if (incorrectAnswers.length > 0) {
        resultHtml += `<p>Anda melakukan beberapa kesalahan. Berikut adalah tinjauan jawaban yang salah:</p>`;
        incorrectAnswers.forEach(ans => {
            resultHtml += `
            <div class="answer-box">
                <p><strong>Pertanyaan:</strong> ${ans.question}</p>
                <p><strong>Jawaban Anda:</strong> ${ans.incorrectAnswer}</p>
                <p><strong>Jawaban Benar:</strong> ${ans.correctAnswer}</p>
                <p><em>Penjelasan:</em> ${ans.explanation}</p>
            </div>`;
        });
    } else {
        resultHtml += `<p>Kerja bagus! Anda menjawab semua pertanyaan dengan benar!</p>`;
    }

    resultContainer.innerHTML = resultHtml;
}

function getExplanation(index) {
    switch (index) {
        case 0:
            return 'Multimedia mengacu pada penggunaan kombinasi media, seperti teks, gambar, dan video.';
        case 1:
            return 'Compiler bukanlah elemen multimedia; itu digunakan untuk pemrograman.';
        case 2:
            return 'Multimedia interaktif memungkinkan pengguna untuk berinteraksi dengan berbagai elemen media, berbeda dengan media pasif.';
        case 3:
            return 'PowerPoint adalah alat umum yang digunakan untuk membuat presentasi multimedia.';
        case 4:
            return 'Multimedia biasanya melibatkan interaksi non-linear, berbeda dari konten statis.';
        default:
            return 'Tidak ada penjelasan tersedia.';
    }
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
});

// Memulai kuis dengan menampilkan pertanyaan pertama
displayQuestion();

