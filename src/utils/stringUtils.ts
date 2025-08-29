function upperCase(text: string) {
    if (!text) return;

    return text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function sanitize(text: string){
    if(!text) return '';
    return text.replace(/[\n\f]/g, ' ').replace(/[é]/g, 'E');
}

export {
    sanitize, upperCase
};

