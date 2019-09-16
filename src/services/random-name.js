import rand from './rand'

const randomName = (length = 10) => {
    let name = '';
    for (let i = 0; i < length; i++) {
        name += String.fromCharCode(rand(97, 122));
    }

    return name;
}

export default randomName;