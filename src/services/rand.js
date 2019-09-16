const rand = (min, max) => {
    let rand = Math.floor(min + Math.random() * (max + 1 - min));
    return rand;
}

export default rand;