const images = ['a.jpg', 'b.jpg', 'c.jpg', 'd.jpg', 'e.jpg', 'f.jpg'];
const image = images[Math.floor(Math.random() * images.length)];

document.body.style.backgroundImage = `url('../image/${image}')`;
