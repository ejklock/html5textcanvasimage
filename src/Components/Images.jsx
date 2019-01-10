import img1 from '../assets/imgs/img1.png';
import img2 from '../assets/imgs/img2.png';

let imgs = {
    img1,
    img2
};

let getImage = (key) => imgs[key];

export default getImage;