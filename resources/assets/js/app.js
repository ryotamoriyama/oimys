const file = document.getElementById('file');
const canvas = document.getElementById('canvas');
const download = document.getElementById("download");
const name = document.querySelector('#js-name');
const inputWrapper = document.querySelector('.input-wrapper');

const canvasWidth = 1748;
const canvasHeight = 2472;
const imageMaskWidth = 1625;
const imageMaskHeight = 2004;

const img = new Image();
let fileData;
let uploadImgSrc = '';
let snsAccount = '';

let imageX = 0;
let imageY = 0;

const header = new Image();
const footer = new Image();
header.src = 'assets/images/header.png';
footer.src = 'assets/images/footer.png';

canvas.width = canvasWidth;
canvas.height = canvasHeight;

const ctx = canvas.getContext('2d');

name.addEventListener('click',()=>{
    if (inputWrapper.classList.contains('is-visible')) {
        inputWrapper.classList.remove('is-visible');
    } else {
        inputWrapper.classList.add('is-visible');
    }
});


const button = document.querySelector('.button');
button.addEventListener('click',(e)=>{
    e.preventDefault();
    snsAccount = document.form.name.value;
    inputWrapper.classList.remove('is-visible');
    canvasDraw();
})

function loadLocalImage(e) {
    fileData = e.target.files[0];
    if (!fileData.type.match('image.*')) {
        alert('Only image file allowed');
        return;
    }
    const reader = new FileReader();
    reader.onload = function () {
        uploadImgSrc = reader.result;
        canvasDraw();
    }
    reader.readAsDataURL(fileData);
}

file.addEventListener('change', loadLocalImage, false);

function canvasDraw() {

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.drawImage(header, 61, 131)
    ctx.drawImage(footer, 1290, 2320)

    ctx.rect(61, 286, imageMaskWidth, imageMaskHeight);
    ctx.clip();

    img.src = uploadImgSrc;
    img.onload = function () {
        const imgWidth = this.width;
        const imgHeight = this.height;
        if (imgWidth / imgHeight > 0.81) {
            imageX = (imageMaskWidth - ((imageMaskHeight / imgHeight) * imgWidth)) / 2;
            ctx.drawImage(img, 61 + imageX, 286, (imageMaskHeight / imgHeight) * imgWidth, imageMaskHeight);
        } else {
            imageY = (imageMaskHeight - ((imageMaskWidth / imgWidth) * imgHeight)) / 2;
            ctx.drawImage(img, 61 , 286 + imageY, imageMaskWidth, (imageMaskWidth / imgWidth) * imgHeight);
        }
        ctx.fillStyle = "white";
        ctx.font = "18px sans-serif";
        ctx.fillText("@"+snsAccount, 71, 2280);
    }
}

download.addEventListener('click', (e) => {
    if ( typeof fileData === "undefined" ) {
        e.preventDefault()
        alert('Choose image first.')
        return
    }
    if ( snsAccount === "" ) {
        e.preventDefault()
        alert('Set your sns account')
        return
    }
    const base64 = canvas.toDataURL("image/jpeg");
    document.getElementById("download").href = base64;
});