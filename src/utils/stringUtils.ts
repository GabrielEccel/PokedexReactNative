function upperCase(text: string) {
    if (!text) return '';

    return text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function sanitize(text: string){
    if(!text) return '';
    return text.replace(/[\n\f]/g, ' ').replace(/[é]/g, 'E');
}

function formatName(text: string){
    if(!text) return '';

    return text.toLowerCase().trim()
}

function formatGender(text: string){
    if(!text) return '';

    return text //.replace(/-m/g, ' Macho').replace(/-f/g, ' Fêmea')
}

export { formatGender, formatName, sanitize, upperCase };

