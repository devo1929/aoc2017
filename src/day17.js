const input = 355;

((input) => {
    let buffer = [0];
    let position = 0;
    for(let i = 1; i <= 2017; i++) {
        position = (position + input % i + 1) % i;
        buffer.splice(position, 0, i);
    }
    console.log('value after 2017:', buffer[buffer.indexOf(2017) + 1]);
})(input);

((input) => {
    let position = 0;
    let value = 1;
    for (let i = 1; i <= 50000000; i++) {
        position = (position + input % i + 1) % i;
        if (position === 0) {
            value = i;
        }
    }
    console.log('value after 0: ', value);
})(input);